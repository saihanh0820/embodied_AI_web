import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const chromePath = process.env.BROWSER_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9400 + Math.floor(Math.random() * 400);
const apiPort = 9800 + Math.floor(Math.random() * 400);
const profile = path.join(process.cwd(), "output", `smoke-profile-${Date.now()}`);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
process.env.API_PORT = String(apiPort);
const apiServer = spawn(process.execPath, ["server.js"], {
  env: { ...process.env, API_PORT: String(apiPort) },
  stdio: "ignore"
});
for (let attempt = 0; attempt < 40; attempt += 1) {
  try {
    const response = await fetch(`http://127.0.0.1:${apiPort}/api/news`);
    if (response.ok) break;
  } catch {}
  await wait(100);
}
const devServer = await createServer({
  logLevel: "silent",
  server: {
    host: "127.0.0.1",
    port: 4176,
    watch: { ignored: ["**/output/**"] }
  }
});
await devServer.listen();
const url = `${devServer.resolvedUrls.local[0]}#/home`;
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--window-size=1440,900",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  url
], { stdio: "ignore" });

let targets = [];
for (let attempt = 0; attempt < 40; attempt += 1) {
  try {
    targets = await fetch(`http://127.0.0.1:${port}/json`).then((response) => response.json());
    if (targets.length) break;
  } catch {}
  await wait(100);
}

const target = targets.find((item) => item.type === "page" && item.url.includes("#/home"));
if (!target) throw new Error("Unable to find the home page target");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let sequence = 0;
const pending = new Map();
const browserErrors = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") {
    browserErrors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
  }
  if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
    browserErrors.push(message.params.entry.text);
  }
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});

const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
};

await send("Runtime.enable");
await send("Page.enable");
await send("DOM.enable");
await send("CSS.enable");
await send("Log.enable");
let pageReady = false;
for (let attempt = 0; attempt < 30; attempt += 1) {
  pageReady = await evaluate("Boolean(document.querySelector('.nav-products'))");
  if (pageReady) break;
  await wait(100);
}
if (!pageReady) throw new Error(`React page failed to initialize:\n${browserErrors.join("\n")}`);

const navBox = await evaluate(`(() => {
  const box = document.querySelector('.nav-products > a').getBoundingClientRect();
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
})()`);
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: navBox.x, y: navBox.y });
await wait(80);
const menuVisibility = await evaluate("getComputedStyle(document.querySelector('.product-menu')).visibility");
const navWeight = await evaluate("getComputedStyle(document.querySelector('.nav-products > a')).fontWeight");

const branchBox = await evaluate(`(() => {
  const box = document.querySelector('.product-menu-branch > a').getBoundingClientRect();
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
})()`);
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: branchBox.x, y: branchBox.y });
await wait(80);
const submenuVisibility = await evaluate("getComputedStyle(document.querySelector('.product-submenu')).visibility");

const header = await evaluate(`(() => {
  const siteHeader = document.querySelector('#site-header');
  const nav = document.querySelector('.main-nav');
  const logo = document.querySelector('.brand img');
  const home = document.querySelector('.main-nav > a[data-route="home"]');
  const dot = getComputedStyle(home, '::after');
  const initialTop = siteHeader.getBoundingClientRect().top;
  scrollTo(0, 160);
  const scrolledTop = siteHeader.getBoundingClientRect().top;
  scrollTo(0, 0);
  return {
    position: getComputedStyle(siteHeader).position,
    initialTop,
    scrolledTop,
    logo: { width: logo.getBoundingClientRect().width, height: logo.getBoundingClientRect().height },
    nav: { width: nav.getBoundingClientRect().width, height: nav.getBoundingClientRect().height },
    focusDot: { width: dot.width, height: dot.height, right: dot.right, bottom: dot.bottom }
  };
})()`);

/* Theme toggle was removed from the header; keep this smoke test focused on supported controls. */
/*
const headerTheme = await evaluate(`(() => {
  const toggle = document.querySelector('[data-theme-toggle]');
  toggle.click();
  const light = {
    theme: document.documentElement.dataset.headerTheme,
    pressed: toggle.getAttribute('aria-pressed'),
    background: getComputedStyle(document.querySelector('#site-header')).backgroundColor,
    navColor: getComputedStyle(document.querySelector('.main-nav [data-route="home"]')).color
  };
  toggle.click();
  return {
    light,
    restored: document.documentElement.dataset.headerTheme,
    restoredPressed: toggle.getAttribute('aria-pressed')
  };
})()`);
*/

const languageContactBefore = await evaluate(`(() => {
  const rect = document.querySelector('.nav-cta').getBoundingClientRect();
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
})()`);
await evaluate("document.querySelector('[data-language]').click()");
await wait(120);
const languageEnglish = await evaluate(`({
  lang: document.documentElement.lang,
  label: document.querySelector('[data-language]').textContent.trim(),
  home: document.querySelector('.main-nav [data-route="home"]').textContent.trim(),
  saved: localStorage.getItem('oculotronics-locale'),
  contact: (() => { const rect = document.querySelector('.nav-cta').getBoundingClientRect(); return { x: rect.x, y: rect.y, width: rect.width, height: rect.height }; })()
})`);
await evaluate("document.querySelector('[data-language]').click()");
await wait(120);
const languageChinese = await evaluate(`({
  lang: document.documentElement.lang,
  label: document.querySelector('[data-language]').textContent.trim(),
  home: document.querySelector('.main-nav [data-route="home"]').textContent.trim(),
  saved: localStorage.getItem('oculotronics-locale')
})`);

if (["x", "y", "width", "height"].some((key) => Math.abs(languageContactBefore[key] - languageEnglish.contact[key]) > 0.1)) {
  throw new Error(`Language switch moved the contact control: ${JSON.stringify({ before: languageContactBefore, after: languageEnglish.contact })}`);
}

const carousel = await evaluate(`(() => {
  document.querySelector('[data-carousel-dot="1"]').click();
  return {
    slides: document.querySelectorAll('[data-carousel-slide]').length,
    active: [...document.querySelectorAll('[data-carousel-slide]')].findIndex((item) => item.classList.contains('active')),
    selected: document.querySelector('[data-carousel-dot="1"]').getAttribute('aria-selected')
  };
})()`);

const carouselAccessibility = await evaluate(`(() => {
  const region = document.querySelector('[data-product-carousel]');
  region.focus();
  region.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
  return {
    paused: region.dataset.paused === 'true',
    activeAfterEnd: [...document.querySelectorAll('[data-carousel-slide]')].findIndex((item) => item.classList.contains('active')),
    hiddenSlides: [...document.querySelectorAll('[data-carousel-slide]')].filter((item) => item.getAttribute('aria-hidden') === 'true').length
  };
})()`);

await evaluate("scrollTo(0, 900)");
await wait(80);
const scrollFeedback = await evaluate(`({
  progress: getComputedStyle(document.querySelector('.scroll-progress span')).transform,
  backToTopVisible: document.querySelector('[data-back-to-top]').classList.contains('visible'),
  backToTopRect: (() => { const rect = document.querySelector('[data-back-to-top]').getBoundingClientRect(); return [rect.width, rect.height]; })(),
  backToTopTransform: getComputedStyle(document.querySelector('[data-back-to-top]')).transform
})`);
if (!scrollFeedback.backToTopVisible
  || JSON.stringify(scrollFeedback.backToTopRect) !== JSON.stringify([44, 44])
  || scrollFeedback.backToTopTransform !== "none") {
  throw new Error(`Back-to-top control geometry mismatch: ${JSON.stringify(scrollFeedback)}`);
}
await evaluate("scrollTo(0, 0)");

const productLineDefault = await evaluate(`({
  cards: document.querySelectorAll('[data-line-card]').length,
  titles: [...document.querySelectorAll('[data-line-card] h3')].map((item) => item.textContent),
  active: document.querySelectorAll('[data-line-card].active').length,
  mediaOpacity: [...document.querySelectorAll('.product-line-media')].map((item) => getComputedStyle(item).opacity),
  dimOverlay: getComputedStyle(document.querySelector('[data-line-card]'), '::after').backgroundColor
})`);
const productLineFocus = await evaluate(`(() => {
  const card = document.querySelector('[data-line-card]');
  card.focus();
  return {
    title: document.querySelector('[data-line-card].active h3')?.textContent,
    mediaOpacity: getComputedStyle(card.querySelector('.product-line-media')).opacity
  };
})()`);
await evaluate("document.querySelector('[data-line-next]').click()");
await wait(500);
const productLine = await evaluate(`({
  offset: document.querySelector('[data-product-line]').dataset.lineOffset,
  orderedTitles: [...document.querySelectorAll('[data-line-card]')]
    .sort((a, b) => Number(a.style.order) - Number(b.style.order))
    .map((item) => item.querySelector('h3').textContent),
  active: document.querySelectorAll('[data-line-card].active').length
})`);

const buttonDefault = await evaluate("getComputedStyle(document.querySelector('.button')).backgroundColor");
const buttonRadius = await evaluate("getComputedStyle(document.querySelector('.button')).borderRadius");
const rootNode = await send("DOM.getDocument");
const productNavNode = await send("DOM.querySelector", { nodeId: rootNode.root.nodeId, selector: ".nav-products > a" });
await evaluate("document.documentElement.dataset.headerTheme = 'light'");
await send("CSS.forcePseudoState", { nodeId: productNavNode.nodeId, forcedPseudoClasses: ["hover"] });
const lightProductHover = await evaluate(`(() => {
  const item = document.querySelector('.nav-products > a');
  const dot = getComputedStyle(item, '::after');
  return {
    color: getComputedStyle(item).color,
    weight: getComputedStyle(item).fontWeight,
    dot: { width: dot.width, height: dot.height, opacity: dot.opacity, transform: dot.transform }
  };
})()`);
await send("CSS.forcePseudoState", { nodeId: productNavNode.nodeId, forcedPseudoClasses: [] });
await evaluate("document.documentElement.dataset.headerTheme = 'dark'");

const directionNode = await send("DOM.querySelector", { nodeId: rootNode.root.nodeId, selector: ".product-line-arrow.next" });
const directionDefault = await evaluate("getComputedStyle(document.querySelector('.product-line-arrow.next')).backgroundPosition");
await send("CSS.forcePseudoState", { nodeId: directionNode.nodeId, forcedPseudoClasses: ["hover"] });
const directionHover = await evaluate("getComputedStyle(document.querySelector('.product-line-arrow.next')).backgroundPosition");
await send("CSS.forcePseudoState", { nodeId: directionNode.nodeId, forcedPseudoClasses: [] });

const buttonNode = await send("DOM.querySelector", { nodeId: rootNode.root.nodeId, selector: ".button" });
await send("CSS.forcePseudoState", { nodeId: buttonNode.nodeId, forcedPseudoClasses: ["active"] });
const buttonPressed = await evaluate("getComputedStyle(document.querySelector('.button')).backgroundColor");
const buttonDisabled = await evaluate(`(() => {
  const item = document.createElement('button');
  item.className = 'button';
  item.disabled = true;
  document.body.append(item);
  return getComputedStyle(item).backgroundColor;
})()`);

const newsRowNode = await send("DOM.querySelector", { nodeId: rootNode.root.nodeId, selector: ".news-list a" });
const newsRowDefault = await evaluate("getComputedStyle(document.querySelector('.news-list a')).backgroundColor");
await send("CSS.forcePseudoState", { nodeId: newsRowNode.nodeId, forcedPseudoClasses: ["hover"] });
const newsRowHover = await evaluate("getComputedStyle(document.querySelector('.news-list a')).backgroundColor");
const newsImageHover = await evaluate("getComputedStyle(document.querySelector('.news-list a img')).boxShadow");
await send("CSS.forcePseudoState", { nodeId: newsRowNode.nodeId, forcedPseudoClasses: [] });

const homeSectionHeights = await evaluate(`Object.fromEntries(
  [...document.querySelectorAll('.home-feature, .product-line, .about-strip, .home-news')]
    .map((item) => [item.classList[0], item.getBoundingClientRect().height])
)`);
const homeCarouselArrows = await evaluate("document.querySelectorAll('.home-slide .button span').length");
const homeCarouselEyebrows = await evaluate("document.querySelectorAll('.ois-slide .slide-copy > span, .consumables-slide .slide-copy > span').length");
const homeCarouselBackdropHeights = await evaluate(`
  [...document.querySelectorAll('.home-slide')].map((item) => getComputedStyle(item, '::before').height)
`);
const buttonSizes = await evaluate(`({
  nav: (() => { const r = document.querySelector('.nav-cta').getBoundingClientRect(); return [r.width, r.height]; })(),
  primary: (() => { const r = document.querySelector('.home-slide.active .button').getBoundingClientRect(); return [r.width, r.height]; })()
})`);

const openRoute = async (route) => {
  await evaluate(`location.hash = ${JSON.stringify(`/${route}`)}`);
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await evaluate(`document.body.dataset.page === ${JSON.stringify(route)}`)) return;
    await wait(50);
  }
  throw new Error(`Route did not render: ${route}`);
};

await openRoute("ois");
const oisTabs = await evaluate(`(() => {
  document.querySelector('[data-ois-tab="process"]').click();
  return {
    selected: document.querySelector('[data-ois-tab="process"]').getAttribute('aria-selected'),
    panel: document.querySelector('[data-ois-panel].active')?.dataset.oisPanel
  };
})()`);

const productContactBands = [];
const productContactSpacing = [];
for (const productRoute of ["research", "ois", "v3", "consumables"]) {
  await openRoute(productRoute);
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await evaluate("[...document.images].every((image) => image.complete)")) break;
    await wait(50);
  }
  productContactBands.push(await evaluate(`(() => {
    const band = document.querySelector('.contact-band');
    const title = band.querySelector('h3');
    const copy = band.querySelector('.band-copy');
    const action = band.querySelector('.button');
    const bandRect = band.getBoundingClientRect();
    const actionRect = action.getBoundingClientRect();
    const style = getComputedStyle(band);
    const decoration = getComputedStyle(band, '::after');
    return {
      structure: [...band.querySelector('div').children].map((node) => node.className || node.tagName),
      title: [title.textContent, getComputedStyle(title).fontSize, getComputedStyle(title).lineHeight],
      copy: [copy.textContent, getComputedStyle(copy).fontSize, getComputedStyle(copy).lineHeight],
      action: [action.textContent.trim(), action.getAttribute('href'), actionRect.width, actionRect.height],
      geometry: [bandRect.width, bandRect.height, style.padding, style.margin],
      surface: [style.backgroundColor, decoration.backgroundImage, decoration.backgroundPosition, decoration.backgroundSize, decoration.opacity]
    };
  })()`));
  productContactSpacing.push(await evaluate(`(() => {
    const route = ${JSON.stringify(productRoute)};
    const band = document.querySelector('.contact-band');
    const previous = band.previousElementSibling;
    const next = band.nextElementSibling;
    const bandRect = band.getBoundingClientRect();
    const previousRect = previous.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();
    const contentRects = [...previous.querySelectorAll('h1,h2,h3,p,li,img,video,.animal-card,.security-grid,.metric-row,.consumable-copy')]
      .map((element) => element.getBoundingClientRect())
      .filter((rect) => rect.width > 0 && rect.height > 0);
    const contentBottom = contentRects.length
      ? Math.max(...contentRects.map((rect) => rect.bottom))
      : previousRect.bottom;
    return {
      route,
      above: bandRect.top - (route === 'v3' ? previousRect.bottom : contentBottom),
      below: nextRect.top - bandRect.bottom,
      nextBackground: getComputedStyle(next).backgroundColor,
      nextPaddingTop: getComputedStyle(next).paddingTop
    };
  })()`));
}

const productContactSignature = (band) => JSON.stringify({
  structure: band.structure,
  title: band.title,
  copy: band.copy,
  action: band.action,
  geometry: band.geometry.slice(0, 3),
  surface: band.surface
});
const productContactReference = productContactSignature(productContactBands[0]);
if (!productContactBands.every((band) => productContactSignature(band) === productContactReference)
  || JSON.stringify(productContactBands[0].structure) !== JSON.stringify(["H3", "band-copy"])
  || JSON.stringify(productContactBands[0].title) !== JSON.stringify(["联系我们，获取更多产品讯息", "36px", "53px"])
  || JSON.stringify(productContactBands[0].copy) !== JSON.stringify(["获取更多产品咨询", "16px", "29px"])
  || JSON.stringify(productContactBands[0].action) !== JSON.stringify(["获取方案", "#/contact", 180, 44])
  || JSON.stringify(productContactBands[0].geometry.slice(0, 3)) !== JSON.stringify([1200, 200, "0px 52px 0px 35px"])) {
  throw new Error(`Product contact bands diverged: ${JSON.stringify(productContactBands)}`);
}

if (productContactSpacing.some((spacing) => spacing.above < 0
  || spacing.below < 0
  || spacing.nextBackground !== "rgb(247, 247, 248)"
  || spacing.nextPaddingTop !== "93px")) {
  throw new Error(`Product contact spacing diverged: ${JSON.stringify(productContactSpacing)}`);
}

await evaluate("document.querySelector('[data-language]').click()");
const productContactEnglishAction = await evaluate("document.querySelector('.contact-band .button').textContent.trim()");
await evaluate("document.querySelector('[data-language]').click()");
if (productContactEnglishAction !== "Get a Solution") {
  throw new Error(`Product contact action was not translated: ${productContactEnglishAction}`);
}

await openRoute("news");
for (let attempt = 0; attempt < 40; attempt += 1) {
  if (await evaluate("Boolean(document.querySelector('[data-news-card]') && document.querySelector('.news-feature-stage') && document.querySelector('.pagination [data-page-prev]') && document.querySelector('.pagination [data-page-next]'))")) break;
  await wait(100);
}
await wait(250);
const news = await evaluate(`(() => {
  const allCards = [...document.querySelectorAll('[data-news-card]')];
  const featureStage = document.querySelector('.news-feature-stage').getBoundingClientRect();
  const featureDotsBefore = document.querySelector('.news-slider-indicator').getBoundingClientRect();
  document.querySelector('.news-feature-stage [data-carousel-dot="1"]').click();
  const featureDotsAfter = document.querySelector('.news-slider-indicator').getBoundingClientRect();
  const firstCard = allCards[0].getBoundingClientRect();
  const pagination = document.querySelector('.pagination').getBoundingClientRect();
  const prevBefore = document.querySelector('[data-page-prev]').getBoundingClientRect();
  const nextBefore = document.querySelector('[data-page-next]').getBoundingClientRect();
  const pageOneTitles = allCards.filter((card) => !card.hidden).map((card) => card.querySelector('h3').textContent);
  const years = [...new Set(allCards.map((card) => card.dataset.newsYear))].sort((left, right) => Number(right) - Number(left));
  const selectedYear = years[0];
  document.querySelector('[data-news-year-option="' + selectedYear + '"]').click();
  const filtered = allCards.filter((card) => !card.hidden);
  const filteredYears = filtered.map((card) => card.dataset.newsYear);
  const yearTotal = allCards.filter((card) => card.dataset.newsYear === selectedYear).length;
  const yearPageButtons = document.querySelectorAll('.pagination [data-page]').length;
  document.querySelector('[data-news-year-option="all"]').click();
  const allPageButtons = document.querySelectorAll('.pagination [data-page]').length;
  const scrollBeforePagination = scrollY;
  document.querySelector('[data-page-next]').click();
  const pageTwoTitles = allCards.filter((card) => !card.hidden).map((card) => card.querySelector('h3').textContent);
  const scrollAfterNext = scrollY;
  const paginationAfter = document.querySelector('.pagination').getBoundingClientRect();
  const prevAfter = document.querySelector('[data-page-prev]').getBoundingClientRect();
  const nextAfter = document.querySelector('[data-page-next]').getBoundingClientRect();
  document.querySelector('[data-page="4"]').click();
  const pageFourTitles = allCards.filter((card) => !card.hidden).map((card) => card.querySelector('h3').textContent);
  const nextDisabledOnLastPage = document.querySelector('[data-page-next]').disabled;
  document.querySelector('[data-page-next]').click();
  const stayedOnLastPage = document.querySelector('.pagination [data-page].active')?.dataset.page === '4';
  document.querySelector('[data-page-prev]').click();
  const previousReturnedToPageThree = document.querySelector('.pagination [data-page].active')?.dataset.page === '3';
  const scrollAfterAllPagination = scrollY;
  const featured = document.querySelector('.featured-news.active');
  const featuredBefore = getComputedStyle(featured, '::before');
  const featuredAfter = getComputedStyle(featured, '::after');
  return {
    total: allCards.length,
    years,
    selectedYear,
    filtered: filtered.length,
    filteredYears,
    correctYear: filtered.every((card) => card.dataset.newsYear === selectedYear),
    page: document.querySelector('.pagination [data-page].active')?.dataset.page,
    pageCards: allCards.filter((card) => !card.hidden).length,
    paginationBehavior: {
      pageOneTitles,
      pageTwoTitles,
      pageFourTitles,
      nextChangedContent: pageOneTitles.every((title) => !pageTwoTitles.includes(title)),
      scrollPositionStable: scrollBeforePagination === scrollAfterNext && scrollBeforePagination === scrollAfterAllPagination,
      scrollPositions: [scrollBeforePagination, scrollAfterNext, scrollAfterAllPagination],
      nextDisabledOnLastPage,
      stayedOnLastPage,
      previousReturnedToPageThree,
      status: document.querySelector('[data-news-page-status]').textContent,
      dynamicPageCounts: {
        year: [yearPageButtons, Math.ceil(yearTotal / 6)],
        all: [allPageButtons, Math.ceil(allCards.length / 6)]
      }
    },
    carousel: {
      selected: document.querySelector('.news-slider-indicator button.active')?.dataset.carouselDot,
      date: document.querySelector('.featured-news.active time')?.textContent,
      fixed: featureDotsBefore.x === featureDotsAfter.x && featureDotsBefore.y === featureDotsAfter.y,
      stage: [featureStage.width, featureStage.height],
      dots: [featureDotsAfter.width, featureDotsAfter.height]
    },
    geometry: {
      firstCard: [firstCard.width, firstCard.height],
      pagination: [pagination.width, pagination.height],
      pageButtons: document.querySelectorAll('.pagination [data-page]').length,
      directionsFixed: [prevBefore, nextBefore].every((rect, index) => {
        const after = [prevAfter, nextAfter][index];
        return rect.x - pagination.x === after.x - paginationAfter.x
          && rect.y - pagination.y === after.y - paginationAfter.y
          && rect.width === after.width
          && rect.height === after.height;
      }),
      directionRects: {
        before: [[prevBefore.x, prevBefore.y, prevBefore.width, prevBefore.height], [nextBefore.x, nextBefore.y, nextBefore.width, nextBefore.height]],
        after: [[prevAfter.x, prevAfter.y, prevAfter.width, prevAfter.height], [nextAfter.x, nextAfter.y, nextAfter.width, nextAfter.height]]
      },
      directionButtons: [[prevAfter.width, prevAfter.height], [nextAfter.width, nextAfter.height]],
      decoration: {
        before: [featuredBefore.backgroundImage, featuredBefore.left, featuredBefore.top, featuredBefore.width, featuredBefore.height, featuredBefore.opacity],
        after: [featuredAfter.backgroundImage, featuredAfter.left, featuredAfter.top, featuredAfter.width, featuredAfter.height, featuredAfter.opacity]
      }
    }
  };
})()`);

const newsRootNode = await send("DOM.getDocument");
const paginationDirectionNode = await send("DOM.querySelector", { nodeId: newsRootNode.root.nodeId, selector: ".pagination-direction.prev" });
const paginationDirectionDefault = await evaluate(`(() => {
  const item = document.querySelector('.pagination-direction.prev');
  const rect = item.getBoundingClientRect();
  return { position: getComputedStyle(item).backgroundPosition, rect: [rect.x, rect.y, rect.width, rect.height] };
})()`);
await send("CSS.forcePseudoState", { nodeId: paginationDirectionNode.nodeId, forcedPseudoClasses: ["hover"] });
const paginationDirectionHover = await evaluate(`(() => {
  const item = document.querySelector('.pagination-direction.prev');
  const rect = item.getBoundingClientRect();
  return { position: getComputedStyle(item).backgroundPosition, rect: [rect.x, rect.y, rect.width, rect.height] };
})()`);
await send("CSS.forcePseudoState", { nodeId: paginationDirectionNode.nodeId, forcedPseudoClasses: [] });

if (JSON.stringify(paginationDirectionDefault.rect) !== JSON.stringify(paginationDirectionHover.rect)
  || paginationDirectionDefault.position === paginationDirectionHover.position) {
  throw new Error(`Pagination hover state moved or did not switch sprite: ${JSON.stringify({ paginationDirectionDefault, paginationDirectionHover })}`);
}

if (!news.carousel.fixed || news.carousel.selected !== "1") {
  throw new Error(`News carousel controls moved or failed to select: ${JSON.stringify(news.carousel)}`);
}
if (JSON.stringify(news.carousel.stage) !== JSON.stringify([1200, 675])
  || JSON.stringify(news.geometry.firstCard) !== JSON.stringify([588, 480])
  || JSON.stringify(news.geometry.pagination) !== JSON.stringify([360, 48])
  || news.total !== 24
  || news.pageCards !== 6
  || news.geometry.pageButtons !== 4
  || !news.geometry.directionsFixed
  || JSON.stringify(news.geometry.directionButtons) !== JSON.stringify([[48, 48], [48, 48]])
  || news.geometry.decoration.before[0] === "none"
  || news.geometry.decoration.after[0] === "none"
  || news.geometry.decoration.before[5] !== "0.15"
  || news.geometry.decoration.after[5] !== "0.15"
  || !news.paginationBehavior.nextChangedContent
  || !news.paginationBehavior.scrollPositionStable
  || !news.paginationBehavior.nextDisabledOnLastPage
  || !news.paginationBehavior.stayedOnLastPage
  || !news.paginationBehavior.previousReturnedToPageThree
  || !news.correctYear
  || news.paginationBehavior.dynamicPageCounts.year[0] !== news.paginationBehavior.dynamicPageCounts.year[1]
  || news.paginationBehavior.dynamicPageCounts.all[0] !== news.paginationBehavior.dynamicPageCounts.all[1]) {
  throw new Error(`News geometry mismatch: ${JSON.stringify(news)}`);
}

await openRoute("consumables");
const consumables = await evaluate(`(() => {
  document.querySelector('[data-consumable-filter="instrument"]').click();
  const visible = [...document.querySelectorAll('[data-consumable-item]:not([hidden])')];
  return {
    active: document.querySelector('[data-consumable-filter].active')?.dataset.consumableFilter,
    count: visible.length,
    categories: [...new Set(visible.map((item) => item.dataset.consumableCategory))],
    reverse: visible.map((item) => item.classList.contains('reverse')),
    tinted: visible.map((item) => item.classList.contains('is-tinted')),
    buttons: [...document.querySelectorAll('[data-consumable-filter]')].map((button) => ({
      label: button.textContent.trim(),
      width: button.getBoundingClientRect().width,
      height: button.getBoundingClientRect().height,
      fontSize: getComputedStyle(button).fontSize,
      color: getComputedStyle(button).color,
      background: getComputedStyle(button).backgroundColor,
      backgroundImage: getComputedStyle(button).backgroundImage
    })),
    emptyHidden: document.querySelector('[data-consumable-empty]')?.hidden
  };
})()`);

if (consumables.active !== "instrument"
  || consumables.count !== 4
  || JSON.stringify(consumables.categories) !== JSON.stringify(["instrument"])
  || JSON.stringify(consumables.reverse) !== JSON.stringify([false, true, false, true])
  || JSON.stringify(consumables.tinted) !== JSON.stringify([true, false, true, false])
  || JSON.stringify(consumables.buttons.map((button) => button.label)) !== JSON.stringify(["微针系列", "操作器械", "附件包", "实验配件", "其他配件"])
  || consumables.buttons.some((button) => button.width !== 126 || button.height !== 44 || button.fontSize !== "20px")
  || consumables.buttons.find((button) => button.label === "操作器械")?.color !== "rgb(255, 255, 255)"
  || !consumables.buttons.find((button) => button.label === "操作器械")?.backgroundImage.includes("linear-gradient")
  || consumables.buttons.filter((button) => button.label !== "操作器械").some((button) => button.background !== "rgba(21, 82, 253, 0.05)")
  || !consumables.emptyHidden) {
  throw new Error(`Consumables instrument filter mismatch: ${JSON.stringify(consumables)}`);
}

const consumablesKit = await evaluate(`(() => {
  document.querySelector('[data-consumable-filter="kit"]').click();
  const visible = [...document.querySelectorAll('[data-consumable-item]:not([hidden])')];
  return {
    active: document.querySelector('[data-consumable-filter].active')?.dataset.consumableFilter,
    count: visible.length,
    categories: [...new Set(visible.map((item) => item.dataset.consumableCategory))],
    titles: visible.map((item) => item.querySelector('h3')?.childNodes[0]?.textContent.trim()),
    details: visible.map((item) => item.querySelector('.consumable-title-detail')?.textContent.trim() || ""),
    descriptions: visible.map((item) => item.querySelector('.consumable-description')?.textContent.trim()),
    specs: visible.map((item) => item.querySelector('li')?.textContent.trim()),
    reverse: visible.map((item) => item.classList.contains('reverse')),
    tinted: visible.map((item) => item.classList.contains('is-tinted')),
    imageCounts: visible.map((item) => item.querySelectorAll('.consumable-media img').length),
    emptyHidden: document.querySelector('[data-consumable-empty]')?.hidden
  };
})()`);

if (consumablesKit.active !== "kit"
  || consumablesKit.count !== 3
  || JSON.stringify(consumablesKit.categories) !== JSON.stringify(["kit"])
  || JSON.stringify(consumablesKit.titles) !== JSON.stringify(["手持式微量注射套装", "具身智能附件包", "具身智能附件包"])
  || JSON.stringify(consumablesKit.details) !== JSON.stringify(["", "（夹具、微量注射器、塞子）", "（夹具、无菌罩、注射器、微针）"])
  || JSON.stringify(consumablesKit.descriptions) !== JSON.stringify(["主要应用于视觉目标下注射", "主要应用于视觉目标操作、玻璃体操作等视觉场景操作", "主要应用于视觉目标操作、玻璃体操作等视觉场景操作"])
  || JSON.stringify(consumablesKit.specs) !== JSON.stringify(["适用实验对象：小鼠、豚鼠、兔子", "配合高精度具身智能控制系统设备使用，应用于视觉目标下注吸", "配合高精度具身智能控制系统设备使用，应用于视觉目标下注吸"])
  || JSON.stringify(consumablesKit.reverse) !== JSON.stringify([false, true, false])
  || JSON.stringify(consumablesKit.tinted) !== JSON.stringify([true, false, true])
  || JSON.stringify(consumablesKit.imageCounts) !== JSON.stringify([1, 1, 1])
  || !consumablesKit.emptyHidden) {
  throw new Error(`Consumables kit filter mismatch: ${JSON.stringify(consumablesKit)}`);
}

const consumablesExperiment = await evaluate(`(() => {
  document.querySelector('[data-consumable-filter="experiment"]').click();
  const visible = [...document.querySelectorAll('[data-consumable-item]:not([hidden])')];
  return {
    active: document.querySelector('[data-consumable-filter].active')?.dataset.consumableFilter,
    count: visible.length,
    categories: [...new Set(visible.map((item) => item.dataset.consumableCategory))],
    titles: visible.map((item) => item.querySelector('h3')?.textContent.trim()),
    descriptions: visible.map((item) => item.querySelector('.consumable-description')?.textContent.trim()),
    specs: visible.map((item) => item.querySelector('li')?.textContent.trim()),
    reverse: visible.map((item) => item.classList.contains('reverse')),
    tinted: visible.map((item) => item.classList.contains('is-tinted')),
    imageCounts: visible.map((item) => item.querySelectorAll('.consumable-media img').length),
    emptyHidden: document.querySelector('[data-consumable-empty]')?.hidden
  };
})()`);

if (consumablesExperiment.active !== "experiment"
  || consumablesExperiment.count !== 3
  || JSON.stringify(consumablesExperiment.categories) !== JSON.stringify(["experiment"])
  || JSON.stringify(consumablesExperiment.titles) !== JSON.stringify(["小鼠固定器", "小鼠板", "豚鼠板"])
  || JSON.stringify(consumablesExperiment.descriptions) !== JSON.stringify(["主要应用于角膜层穿刺，视神经注射等", "主要应用于视觉目标下注射", "主要应用于视觉目标下注射"])
  || JSON.stringify(consumablesExperiment.specs) !== JSON.stringify(["适用实验对象：小鼠", "适用实验对象：小鼠", "适用实验对象：豚鼠"])
  || JSON.stringify(consumablesExperiment.reverse) !== JSON.stringify([false, true, false])
  || JSON.stringify(consumablesExperiment.tinted) !== JSON.stringify([true, false, true])
  || JSON.stringify(consumablesExperiment.imageCounts) !== JSON.stringify([1, 1, 1])
  || !consumablesExperiment.emptyHidden) {
  throw new Error(`Consumables experiment filter mismatch: ${JSON.stringify(consumablesExperiment)}`);
}

const consumablesOther = await evaluate(`(() => {
  document.querySelector('[data-consumable-filter="other"]').click();
  const visible = [...document.querySelectorAll('[data-consumable-item]:not([hidden])')];
  return {
    active: document.querySelector('[data-consumable-filter].active')?.dataset.consumableFilter,
    count: visible.length,
    categories: [...new Set(visible.map((item) => item.dataset.consumableCategory))],
    titles: visible.map((item) => item.querySelector('h3')?.textContent.trim()),
    descriptions: visible.map((item) => item.querySelector('.consumable-description')?.textContent.trim()),
    specs: visible.map((item) => item.querySelector('li')?.textContent.trim()),
    reverse: visible.map((item) => item.classList.contains('reverse')),
    tinted: visible.map((item) => item.classList.contains('is-tinted')),
    rowBackgrounds: visible.map((item) => getComputedStyle(item).backgroundColor),
    mediaBackgrounds: visible.map((item) => getComputedStyle(item.querySelector('.consumable-media')).backgroundColor),
    imageCounts: visible.map((item) => item.querySelectorAll('.consumable-media img').length),
    emptyHidden: document.querySelector('[data-consumable-empty]')?.hidden
  };
})()`);

if (consumablesOther.active !== "other"
  || consumablesOther.count !== 2
  || JSON.stringify(consumablesOther.categories) !== JSON.stringify(["other"])
  || JSON.stringify(consumablesOther.titles) !== JSON.stringify(["移液针填充塞", "转换头"])
  || JSON.stringify(consumablesOther.descriptions) !== JSON.stringify(["主要应用于微量注射", "主要应用于视觉目标操作、玻璃体操作等视觉场景操作"])
  || JSON.stringify(consumablesOther.specs) !== JSON.stringify(["移液针配件，用于降低注射损耗量", "配合爱尔康玻切机灌注管路和注射器使用"])
  || JSON.stringify(consumablesOther.reverse) !== JSON.stringify([false, true])
  || JSON.stringify(consumablesOther.tinted) !== JSON.stringify([true, false])
  || JSON.stringify(consumablesOther.rowBackgrounds) !== JSON.stringify(["rgb(244, 247, 255)", "rgb(255, 255, 255)"])
  || JSON.stringify(consumablesOther.mediaBackgrounds) !== JSON.stringify(["rgb(255, 255, 255)", "rgb(244, 247, 255)"])
  || JSON.stringify(consumablesOther.imageCounts) !== JSON.stringify([1, 1])
  || !consumablesOther.emptyHidden) {
  throw new Error(`Consumables other filter mismatch: ${JSON.stringify(consumablesOther)}`);
}

await openRoute("about");
const readTimelineGeometry = () => evaluate(`(() => {
  const timeline = document.querySelector('[data-timeline]');
  const stage = timeline.querySelector('.timeline-stage');
  const stageRect = stage.getBoundingClientRect();
  const nodes = [...timeline.querySelectorAll('.timeline-track article')].map((article) => {
    const rect = article.getBoundingClientRect();
    const marker = getComputedStyle(article, '::before');
    return {
      x: rect.left + parseFloat(marker.left) + parseFloat(marker.width) / 2,
      y: rect.top + parseFloat(marker.top),
      visible: rect.left < stageRect.right && rect.right > stageRect.left
    };
  }).filter((node) => node.visible);
  return {
    offset: timeline.dataset.timelineOffset,
    axisY: stageRect.top + stageRect.height / 2,
    nodes
  };
})()`);
const timelineDefault = await readTimelineGeometry();
await evaluate("document.querySelector('[data-timeline-next]').click()");
await wait(500);
const timelineAfterNext = await readTimelineGeometry();
const timelineAligned = [timelineDefault, timelineAfterNext].every((state) =>
  state.nodes.every((node) => Math.abs(node.y - state.axisY) <= 1)
);
if (!timelineAligned) throw new Error(`Timeline nodes detached from fixed axis: ${JSON.stringify({ timelineDefault, timelineAfterNext })}`);
const readHonorGeometry = () => evaluate(`(() => {
  const cards = [...document.querySelectorAll('[data-honor-card]')].map((card) => {
    const rect = card.getBoundingClientRect();
    return {
      position: card.dataset.honorPosition,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      shadow: getComputedStyle(card).boxShadow,
      imageShadow: getComputedStyle(card.querySelector('img')).boxShadow
    };
  });
  const center = cards.find((card) => card.position === 'center');
  const sides = cards.filter((card) => card.position !== 'center');
  return { cards, centerOffset: center.top - Math.min(...sides.map((card) => card.top)) };
})()`);
const honorsDefault = await readHonorGeometry();
await evaluate("document.querySelector('[data-honor-next]').click()");
await wait(450);
const honorsAfterNext = await readHonorGeometry();
const honorsAligned = [honorsDefault, honorsAfterNext].every((state) =>
  Math.abs(state.centerOffset - 33) <= 1 &&
  state.cards.every((card) => card.width === 316 && card.height === 447 && card.shadow !== 'none' && card.imageShadow === 'none')
);
if (!honorsAligned) throw new Error(`Honor card geometry or shadow is misaligned: ${JSON.stringify({ honorsDefault, honorsAfterNext })}`);
const aboutVideo = await evaluate(`(() => {
  const video = document.querySelector('[data-about-video]');
  return {
    element: video?.tagName,
    controls: video?.controls,
    playsInline: video?.playsInline,
    poster: Boolean(video?.poster),
    sourceReady: Boolean(video?.currentSrc || video?.getAttribute('src'))
  };
})()`);

await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "no-preference" }]
});
await openRoute("support");
for (let attempt = 0; attempt < 30; attempt += 1) {
  const ready = await evaluate("[...document.querySelectorAll('.support-icon img')].every((image) => image.complete && image.naturalWidth === 300)");
  if (ready) break;
  await wait(50);
}
const supportDefault = await evaluate(`(() => {
  const card = document.querySelector('.support-card');
  const rect = card.getBoundingClientRect();
  const normal = card.querySelector('.support-icon-default');
  const focus = card.querySelector('.support-icon-focus');
  return {
    card: [rect.x, rect.y, rect.width, rect.height],
    imageCount: document.querySelectorAll('.support-icon img').length,
    imagesReady: [...document.querySelectorAll('.support-icon img')].every((image) => image.complete && image.naturalWidth === 300 && image.naturalHeight === 300),
    normalOpacity: getComputedStyle(normal).opacity,
    focusOpacity: getComputedStyle(focus).opacity,
    duration: getComputedStyle(focus).transitionDuration,
    easing: getComputedStyle(focus).transitionTimingFunction
  };
})()`);
const supportDocument = await send("DOM.getDocument");
const supportCardNode = await send("DOM.querySelector", { nodeId: supportDocument.root.nodeId, selector: ".support-card" });
await send("CSS.forcePseudoState", { nodeId: supportCardNode.nodeId, forcedPseudoClasses: ["hover"] });
await wait(480);
const supportHover = await evaluate(`(() => {
  const card = document.querySelector('.support-card');
  const rect = card.getBoundingClientRect();
  return {
    card: [rect.x, rect.y, rect.width, rect.height],
    normalOpacity: getComputedStyle(card.querySelector('.support-icon-default')).opacity,
    focusOpacity: getComputedStyle(card.querySelector('.support-icon-focus')).opacity,
    shadow: getComputedStyle(card).boxShadow
  };
})()`);
await send("CSS.forcePseudoState", { nodeId: supportCardNode.nodeId, forcedPseudoClasses: [] });
if (supportDefault.imageCount !== 6
  || !supportDefault.imagesReady
  || supportDefault.normalOpacity !== "1"
  || supportDefault.focusOpacity !== "0"
  || supportDefault.duration !== "0.42s"
  || supportDefault.easing !== "cubic-bezier(0.22, 1, 0.36, 1)"
  || supportHover.normalOpacity !== "0"
  || supportHover.focusOpacity !== "1"
  || supportHover.shadow === "none"
  || supportDefault.card[0] !== supportHover.card[0]
  || supportDefault.card[2] !== supportHover.card[2]
  || supportDefault.card[3] !== supportHover.card[3]
  || supportDefault.card[1] - supportHover.card[1] !== 5) {
  throw new Error(`Support training interaction mismatch: ${JSON.stringify({ supportDefault, supportHover })}`);
}

await openRoute("contact");
const forms = await evaluate(`(() => {
  const form = document.querySelector('.message-form');
  form.requestSubmit();
  const missing = form.querySelector('.field-error')?.getAttribute('aria-label');
  form.querySelector('[aria-label="姓名"]').value = '测试用户';
  form.querySelector('[aria-label="电话"]').value = '13800138000';
  form.querySelector('[aria-label="邮箱"]').value = 'test@example.com';
  form.requestSubmit();
  return {
    missing,
    success: document.querySelector('.site-toast').textContent,
    reset: form.querySelector('[aria-label="姓名"]').value === ''
  };
})()`);

await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true
});
await openRoute("home");
const mobile = await evaluate(`(() => {
  const toggle = document.querySelector('.menu-toggle');
  toggle.click();
  const productMenu = document.querySelector('.product-menu');
  return {
    expanded: toggle.getAttribute('aria-expanded'),
    label: toggle.getAttribute('aria-label'),
    bodyOpen: document.body.classList.contains('menu-open'),
    productsVisible: getComputedStyle(productMenu).display !== 'none' && getComputedStyle(productMenu).visibility === 'visible',
    productLinks: productMenu.querySelectorAll('a').length
  };
})()`);

await send("Page.addScriptToEvaluateOnNewDocument", {
  source: `
    window.__compat_test_bootstrap = true;
    Object.defineProperty(window, "IntersectionObserver", { configurable: true, writable: true, value: undefined });
    Object.defineProperty(window, "matchMedia", { configurable: true, writable: true, value: undefined });
    Object.defineProperty(window, "requestAnimationFrame", { configurable: true, writable: true, value: undefined });
    Object.defineProperty(window, "cancelAnimationFrame", { configurable: true, writable: true, value: undefined });
    Object.defineProperty(window, "CustomEvent", { configurable: true, writable: true, value: undefined });
    Object.defineProperty(Element.prototype, "closest", { configurable: true, writable: true, value: undefined });
  `
});
await send("Page.reload", { ignoreCache: true });
let compatReady = false;
for (let attempt = 0; attempt < 30; attempt += 1) {
  try {
    compatReady = await evaluate("Boolean(window.__compat_test_bootstrap && document.querySelector('.home-hero'))");
  } catch {}
  if (compatReady) break;
  await wait(100);
}
if (!compatReady) throw new Error(`Compatibility fallback page failed to initialize:\n${browserErrors.join("\n")}`);
await wait(100);
const compatibilityFallbacks = await evaluate(`(() => ({
  intersectionObserver: typeof IntersectionObserver === 'function',
  matchMedia: typeof matchMedia === 'function',
  requestAnimationFrame: typeof requestAnimationFrame === 'function',
  cancelAnimationFrame: typeof cancelAnimationFrame === 'function',
  customEvent: typeof CustomEvent === 'function',
  closest: typeof Element.prototype.closest === 'function',
  visibleRevealCount: document.querySelectorAll('.reveal.visible').length,
  browserErrors: ${JSON.stringify(browserErrors)}
}))()`);
const compatibilityApis = [
  "intersectionObserver",
  "matchMedia",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "customEvent",
  "closest"
];
if (compatibilityApis.some((api) => !compatibilityFallbacks[api]) || compatibilityFallbacks.visibleRevealCount === 0) {
  throw new Error(`Compatibility fallback assertion failed: ${JSON.stringify(compatibilityFallbacks)}`);
}

console.log(JSON.stringify({
  navigation: { menuVisibility, submenuVisibility, navWeight },
  header: { ...header, lightProductHover },
  language: { english: languageEnglish, chinese: languageChinese },
  carousel: { ...carousel, accessibility: carouselAccessibility },
  scrollFeedback,
  productLine: {
    default: productLineDefault,
    focus: productLineFocus,
    afterNext: productLine,
    directionIcon: { default: directionDefault, hover: directionHover }
  },
  buttons: { default: buttonDefault, pressed: buttonPressed, disabled: buttonDisabled, radius: buttonRadius },
  homeNews: { default: newsRowDefault, hover: newsRowHover, imageHover: newsImageHover },
  homeSections: homeSectionHeights,
  homeCarouselArrows,
  homeCarouselEyebrows,
  homeCarouselBackdropHeights,
  buttonSizes,
  oisTabs,
  productContactBands,
  productContactSpacing,
  productContactEnglishAction,
  news: { ...news, directionHover: { default: paginationDirectionDefault, hover: paginationDirectionHover } },
  consumables,
  about: {
    video: aboutVideo,
    timeline: { default: timelineDefault, afterNext: timelineAfterNext, aligned: timelineAligned },
    honors: { default: honorsDefault, afterNext: honorsAfterNext, aligned: honorsAligned }
  },
  support: { default: supportDefault, hover: supportHover },
  forms,
  mobile,
  compatibilityFallbacks
}, null, 2));

await send("Browser.close");
await new Promise((resolve) => chrome.once("exit", resolve));
await devServer.close();
apiServer.kill();
for (let attempt = 0; attempt < 5; attempt += 1) {
  try {
    rmSync(profile, { recursive: true, force: true });
    break;
  } catch (error) {
    if (attempt === 4) throw error;
    await wait(200);
  }
}
