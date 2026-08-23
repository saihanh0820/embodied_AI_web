import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const routes = ["home", "about", "news", "support", "contact", "research", "ois", "v3", "v4", "consumables"];
const viewportWidth = Number(process.argv[2]) || 1440;
const chromePath = process.env.BROWSER_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const debugPort = 19000 + Math.floor(Math.random() * 10000);
const profile = path.join(process.cwd(), "output", `i18n-audit-${Date.now()}`);
const server = await createServer({ logLevel: "silent", server: { host: "127.0.0.1", port: 0 } });
await server.listen();
const baseUrl = server.resolvedUrls.local[0];
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  `--window-size=${viewportWidth},900`,
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profile}`,
  `${baseUrl}#/home`
], { stdio: "ignore" });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let targets = [];
for (let attempt = 0; attempt < 40; attempt += 1) {
  try {
    targets = await fetch(`http://127.0.0.1:${debugPort}/json`).then((response) => response.json());
    if (targets.length) break;
  } catch {}
  await wait(100);
}

const target = targets.find((item) => item.type === "page" && item.url.startsWith(baseUrl));
if (!target) throw new Error("Unable to connect to the audit browser");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let sequence = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const promise = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) promise.reject(new Error(message.error.message));
  else promise.resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};

await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: viewportWidth,
  height: 900,
  deviceScaleFactor: 1,
  mobile: viewportWidth <= 640
});

const openRoute = async (route, locale) => {
  await evaluate(`localStorage.setItem("oculotronics-locale", ${JSON.stringify(locale)})`);
  await evaluate(`location.hash = ${JSON.stringify(`/${route}`)}`);
  await evaluate("location.reload()");
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const ready = await evaluate(`document.body.dataset.page === ${JSON.stringify(route)} && document.documentElement.lang === ${JSON.stringify(locale)}`);
      if (ready) break;
    } catch {}
    await wait(100);
  }
  await evaluate("Promise.all([...document.images].map((image) => image.complete ? true : new Promise((resolve) => { image.addEventListener('load', resolve, { once: true }); image.addEventListener('error', resolve, { once: true }); })))");
  await wait(50);
};

const inspect = () => evaluate(`(() => {
  const visible = (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
  };
  const han = /[\\u3400-\\u9fff]/;
  const text = [];
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textNode = textWalker.nextNode();
  while (textNode) {
    const value = textNode.nodeValue.trim();
    if (value && han.test(value) && value !== "中文") text.push(value);
    textNode = textWalker.nextNode();
  }
  const attributes = [...document.querySelectorAll("[aria-label],[placeholder],[alt],[title]")]
    .flatMap((element) => ["aria-label", "placeholder", "alt", "title"].map((name) => ({ name, value: element.getAttribute(name) })))
    .filter(({ value }) => value && han.test(value));
  const sections = [...document.querySelectorAll("#app > div > section")].map((element, index) => {
    const rect = element.getBoundingClientRect();
    return { index, className: element.className, top: Math.round(rect.top + scrollY), width: Math.round(rect.width), height: Math.round(rect.height) };
  });
  const viewportWidth = document.documentElement.clientWidth;
  const overflowElements = [...document.querySelectorAll("body *")]
    .filter(visible)
    .map((element) => ({ element, rect: element.getBoundingClientRect() }))
    .filter(({ element, rect }) => rect.left < -1 || rect.right > viewportWidth + 1 || element.scrollWidth > element.clientWidth + 1)
    .map(({ element, rect }) => ({
      selector: element.tagName.toLowerCase() + (element.id ? "#" + element.id : "") + [...element.classList].map((name) => "." + name).join(""),
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width)
      , clientWidth: element.clientWidth
      , scrollWidth: element.scrollWidth
    }))
    .slice(-12);
  return {
    text: [...new Set(text)],
    attributes,
    sections,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    overflowElements
  };
})()`);

const report = {};
for (const route of routes) {
  await openRoute(route, "zh-CN");
  const zh = await inspect();
  await openRoute(route, "en");
  const en = await inspect();
  report[route] = {
    untranslatedText: en.text,
    untranslatedAttributes: en.attributes,
    overflow: { zh: zh.overflow, en: en.overflow, elements: en.overflowElements },
    sectionDeltas: en.sections.map((section, index) => ({
      className: section.className,
      zhTop: zh.sections[index]?.top,
      enTop: section.top,
      zhHeight: zh.sections[index]?.height,
      enHeight: section.height,
      top: section.top - (zh.sections[index]?.top ?? section.top),
      height: section.height - (zh.sections[index]?.height ?? section.height),
      width: section.width - (zh.sections[index]?.width ?? section.width)
    }))
  };
}

console.log(JSON.stringify(report, null, 2));
await send("Browser.close");
await new Promise((resolve) => chrome.once("exit", resolve));
await server.close();
rmSync(profile, { recursive: true, force: true });
