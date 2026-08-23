import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const routes = ["home", "about", "research", "v3", "v4", "ois", "consumables", "news", "support", "contact"];
const outputName = process.argv[2] || "react-visual";
const locale = process.argv[3] === "en" ? "en" : "zh-CN";
const output = path.join(process.cwd(), "output", outputName);
const profile = path.join(output, "chrome-profile");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const debuggingPort = 9800 + Math.floor(Math.random() * 100);

mkdirSync(output, { recursive: true });
const server = await createServer({ logLevel: "silent", server: { host: "127.0.0.1", port: 0 } });
await server.listen();
const baseUrl = server.resolvedUrls.local[0];
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--window-size=1920,1080",
  `--remote-debugging-port=${debuggingPort}`,
  `--user-data-dir=${profile}`,
  `${baseUrl}#/home`
], { stdio: "ignore" });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let targets = [];
for (let attempt = 0; attempt < 50; attempt += 1) {
  try {
    targets = await fetch(`http://127.0.0.1:${debuggingPort}/json`).then((response) => response.json());
    if (targets.length) break;
  } catch {}
  await wait(100);
}

const target = targets.find((item) => item.type === "page" && item.url.startsWith(baseUrl));
if (!target) throw new Error("Unable to locate the visual regression browser tab");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let id = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const handler = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) handler.reject(new Error(message.error.message));
  else handler.resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const callId = ++id;
  pending.set(callId, { resolve, reject });
  socket.send(JSON.stringify({ id: callId, method, params }));
});
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};

await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
  mobile: false
});
await evaluate(`localStorage.setItem("oculotronics-locale", ${JSON.stringify(locale)})`);
await evaluate("location.reload()");
for (let attempt = 0; attempt < 50; attempt += 1) {
  try {
    if (await evaluate(`document.documentElement.lang === ${JSON.stringify(locale)}`)) break;
  } catch {}
  await wait(100);
}

const report = [];
for (const route of routes) {
  await evaluate(`location.hash = ${JSON.stringify(`/${route}`)}`);
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const ready = await evaluate(`document.body.dataset.page === ${JSON.stringify(route)} && [...document.images].every((image) => image.complete)`);
    if (ready) break;
    await wait(100);
  }
  await wait(300);
  if (route === "home") {
    await evaluate("document.querySelector('[data-carousel-dot=\"0\"]')?.click()");
    await wait(100);
  }
  const metrics = await evaluate(`(() => {
    const hero = document.querySelector('.page-hero, .v4-full');
    const footer = document.querySelector('#site-footer');
    return {
      route: document.body.dataset.page,
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      headerHeight: document.querySelector('#site-header')?.getBoundingClientRect().height || 0,
      heroHeight: hero?.getBoundingClientRect().height || 0,
      footerHeight: footer?.getBoundingClientRect().height || 0,
      images: document.images.length,
      brokenImages: [...document.images].filter((image) => !image.naturalWidth).map((image) => image.src)
    };
  })()`);
  const layout = await send("Page.getLayoutMetrics");
  const height = Math.ceil(layout.cssContentSize.height);
  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: 1920, height, scale: 1 }
  });
  writeFileSync(path.join(output, `${route}.png`), Buffer.from(screenshot.data, "base64"));
  report.push(metrics);
}

writeFileSync(path.join(output, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

await Promise.race([
  send("Browser.close").catch(() => {}),
  wait(1500)
]);
await Promise.race([
  new Promise((resolve) => chrome.once("exit", resolve)),
  wait(2500).then(() => {
    if (chrome.exitCode === null) chrome.kill();
  })
]);
socket.close();
await server.close();
for (let attempt = 0; attempt < 5; attempt += 1) {
  try {
    rmSync(profile, { recursive: true, force: true });
    break;
  } catch (error) {
    if (attempt === 4) throw error;
    await wait(200);
  }
}
