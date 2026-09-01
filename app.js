const RAW = "assets/raw/";
const ABOUT_VIDEO_SRC = `${RAW}关于我们-视频介绍.mp4`;
const RESEARCH_VIDEO_SRC = `${RAW}精密操作控制系统-观看视频.mp4`;
const V3_VIDEO_SRC = `${RAW}WMOX-22001-视频介绍.mp4`;
import { localeText } from "./i18n.js";
const ASSET = {
  logo: "logo-embodied-intelligence.png",
  footerLogo: "logo-embodied-intelligence.png",
  qr: "weimou-qr.png",
  homeHero: "home-hero-club-event.jpg",
  homeProduct: "2a944ad6bab39e6b1b06395f605ebc148ce58b5c.png",
  homeCarouselInjection: "images/home/home-carousel-injection.png",
  homeCarouselOis: "images/home/home-carousel-ois.png",
  homeCarouselConsumables: "images/home/home-carousel-consumables.png",
  homeCarouselG1: "images/home/unitree-g1.png",
  homeCarouselAs2: "images/home/as2-replacement.png",
  homeCarouselH2: "images/home/robot_cutout.png",
  homeCarouselBackground: "images/home/home-carousel-background.png",
  aboutHero: "about-hero-20260805.png",
  aboutVideo: "about-video-cover.jpg",
  directionControls: "direction-controls@2x.png",
  office: "open-office@2x.png",
  meeting: "dfe972122455ff20913d4493d3ce87e0e2b2b6e8.png",
  patentCertificate: "ddd4daa1bb8c9c74ee73ad7d60bc266088a40305.png",
  simulatorTraining: "images/support/simulator-training.svg",
  simulatorTrainingFocus: "images/support/simulator-training-focus.svg",
  animalLabTraining: "images/support/animal-lab-training.svg",
  animalLabTrainingFocus: "images/support/animal-lab-training-focus.svg",
  handsOnTraining: "images/support/hands-on-training.svg",
  handsOnTrainingFocus: "images/support/hands-on-training-focus.svg",
  newsHero: "images/news/news-center-hero.png",
  newsCenterHero: "images/news/news-center-hero-20260805.png",
  supportHero: "images/support/support-hero-20260805.png",
  contactHero: "images/contact/contact-hero-20260805.png",
  newsFeaturedDecor: "images/news/featured-ring-decor.png",
  map: "c9ced05587f92f5d2d452a3634a4f3b809e0df00.png",
  researchHero: "5b1a33e378f9804bb06c9b5dc40aac3531f8c5b6.png",
  researchMotion: "images/products/research/multi-dof-motion.png",
  researchMachine: "images/products/research/precision-operation.jpg",
  researchMachineOutline: "images/products/research/research-machine-outline.svg",
  researchMouseOutline: "images/products/research/three-d-mouse-outline.svg",
  researchScene: "d43618ff10f44e8169c9cd6ff2c455653ce2dd67.png",
  animals: "69126876fe7d239d0d6ad2ea387d0e38e292a757.png",
  animalRabbit: "ff6b90c2390b1af81dfdbdc5cdeee195b0e6938f.png",
  animalMouseCrop: "animal-mouse.png",
  animalRabbitCrop: "animal-rabbit-cutout.png",
  animalMonkeyCrop: "animal-monkey-cutout.png",
  animalDogCrop: "animal-dog-cutout.png",
  animalSheepCrop: "animal-sheep.png",
  animalPigCrop: "animal-pig.png",
  relatedOperation: "v3-related@2x.png",
  productConsumables: "a2e2051da0c4b759f53a4167a1b2a62b7354ce95.png",
  oisHero: "f487753c4044538b70a096c3621898bab09b323d.png",
  oisTablet: "images/products/ois/tablet-frame@2x.png",
  oisArchive: "images/products/ois/ois-archive@2x.png",
  oisProcess: "images/products/ois/ois-process@2x.png",
  oisImport: "images/products/ois/ois-import@2x.png",
  oisWorkflowImport: "images/products/ois/ois-import-supplied.png",
  oisWorkflowProcess: "images/products/ois/ois-process-supplied.png",
  oisWorkflowArchive: "images/products/ois/ois-archive-supplied.png",
  oisCompatibilityIcon: "images/products/ois/compatibility.svg",
  oisSecurityIcon: "images/products/ois/security.svg",
  oisAnnotationIcon: "images/products/ois/annotation.svg",
  oisArchiveIcon: "images/products/ois/archive.svg",
  oisWorkflowIcon: "images/products/ois/workflow.svg",
  oisAnalysisIcon: "images/products/ois/analysis.svg",
  oisTabMediaIcon: "images/products/ois/tab-media.svg",
  oisTabEditIcon: "images/products/ois/tab-edit.svg",
  oisMonitorFrame: "d3c06b5cfd884683c6aafd6c8005edd26a6ce58f.png",
  oisProduct: "images/products/ois/ois-product-monitor.png",
  v3Hero: "ac3eeca5ffd682a37c2550529cb8e08496b1b8eb.png",
  v3Machine: "a404b6a8e593d2c5332624671fe3baa0b9343fa2.png",
  v3Feature: "v3-video-cover.jpg",
  v3PrecisionIcon: "images/products/v3/precision-icon.svg",
  v3ModularIcon: "images/products/v3/modular-icon.svg",
  v3ArmIcon: "images/products/v3/robot-arm-icon.svg",
  operationScene: "images/products/v3/lab-application-scene-tinted.png",
  v3RelatedInjection: "images/products/v3/micro-embodied intelligence-injection-system@2x.png",
  v3RelatedConsumables: "images/products/v3/robotic-consumables@2x.png",
  v4Hero: "ed05aaf4ddb997670d10f105b6f1fd8f40c477ca.png",
  consumablesHeroReplacement: "images/consumables/consumables-hero-replacement.png",
  consumablesHeroRadial: "images/consumables/hero-radial-blue.png",
  consumablesHeroPlatform: "images/consumables/hero-platform.png",
  consumablesHeroSet: "images/consumables/hero-product-set.png",
  consumablesHeroTray: "images/consumables/hero-blue-tray@2x.png",
  microNeedle: "images/consumables/incyto-needle.png",
  metalNeedle: "images/consumables/metal-needle.png",
  metalPackage: "images/consumables/metal-package@2x.png",
  pipettePackage: "images/consumables/plastic-package.png",
  pipetteNeedle: "images/consumables/pipette-needle.png",
  injector: "images/consumables/vision-injector.png",
  consumablesContactRings: "images/consumables/contact-rings.png",
  consumablesRelatedInjection: "images/consumables/related-injection-system@2x.png",
  consumablesRelatedOis: "images/consumables/related-ois@2x.png",
  instrumentForceps: "images/consumables/micro-forceps.png",
  instrumentPackaging: "images/consumables/micro-forceps-packaging.png",
  roboticConsumablesKit: "images/consumables/robotic-consumables-kit@2x.png",
  handheldMicroinjectionKit: "images/consumables/handheld-microinjection-kit@2x.png",
  mouseFixture: "images/consumables/mouse-fixture@2x.png",
  mousePlatform: "images/consumables/mouse-platform@2x.png",
  guineaPigPlatform: "images/consumables/guinea-pig-platform@2x.png",
  pipetteFillingPlug: "images/consumables/pipette-filling-plug@2x.png",
  irrigator: "images/consumables/irrigator@2x.png",
  pipelineOperation: "21be462bccb73ee0ec6c6be95b01896863a78356.png",
  pipelineInjection: "images/home/pipeline-injection-system.png",
  pipelineOis: "images/products/ois/ois-product-monitor.png",
  pipelineConsumables: "images/consumables/robotic-consumables-hero.png",
};

const CONTACT = {
  company: "宇树科技产业学院-具身智能社团",
  addressA: "青岛城市学院·宇树科技产业学院",
  addressB: "具身智能社团活动与实训中心",
  sales: "社团学生咨询（校内）",
  phone: "李莹莹主任 丁润霞老师"
};

const img = (key) => ASSET[key].includes("/") ? `assets/${ASSET[key]}` : RAW + ASSET[key];
const lazyImg = (key, alt = "", className = "") =>
  `<img${className ? ` class="${className}"` : ""} src="${img(key)}" alt="${alt}" loading="lazy" decoding="async">`;
export const route = () => (location.hash.replace(/^#\/?/, "") || "home").split("?")[0];

const NEWS_CACHE_TTL = 60_000;
let newsCache = null;
let newsRequest = null;

function loadNewsData({ force = false } = {}) {
  const fresh = newsCache && Date.now() - newsCache.loadedAt < NEWS_CACHE_TTL;
  if (!force && fresh) return Promise.resolve(newsCache.payload);
  if (newsRequest) return newsRequest;
  newsRequest = fetch("/api/news")
    .then((response) => response.ok ? response.json() : null)
    .then((payload) => {
      if (payload?.news?.length) newsCache = { payload, loadedAt: Date.now() };
      return payload;
    })
    .catch(() => null)
    .finally(() => {
      newsRequest = null;
    });
  return newsRequest;
}
function prefetchNewsData() {
  loadNewsData().catch(() => {});
}

const newsPayloadHasItems = (payload) => Array.isArray(payload?.news) && payload.news.length > 0;
const localizedNewsText = (item, field) => {
  const value = item?.[field] || "";
  if (document.documentElement.lang !== "en") return value;
  return item?.[`${field}En`] || value;
};
// Feishu's "首页推荐" flag controls both the news-center carousel and the
// three-item news strip on the home page. Keep the server's order within each
// group so the optional "排序" field remains authoritative.
const getFeaturedNews = (items, limit = 3) => {
  const selected = items.filter((item) => item.featured);
  return [...selected, ...items.filter((item) => !item.featured)].slice(0, limit);
};

const NEWS_PAGE_SIZE = 6;

const newsYearFromDate = (date) => String(date || "").match(/^\d{4}/)?.[0] || "";
const newsYearsFromDates = (dates) => [...new Set(dates.map(newsYearFromDate).filter(Boolean))]
  .sort((left, right) => Number(right) - Number(left));
const newsYearFilterOptions = (dates) => [
  `<button type="button" role="menuitemradio" aria-checked="true" data-news-year-option="all">${localeText("全部年份", "All Years")}</button>`,
  ...newsYearsFromDates(dates).map((year) => `<button type="button" role="menuitemradio" aria-checked="false" data-news-year-option="${year}">${year}</button>`)
].join("");

const oisTabs = [
  ["import", "项目录入", "快速建立项目", "录入任务目标、设备配置和成员分工，统一创建项目工作区。", "oisWorkflowImport", "oisTabMediaIcon"],
  ["process", "过程记录", "一体化协作", "在同一工作台内完成代码、数据、日志和测试结果的整理。", "oisWorkflowProcess", "oisTabEditIcon"],
  ["archive", "成果归档", "版本可追溯", "整合任务书、代码版本、演示视频和复盘记录，方便项目交接。", "oisWorkflowArchive", "oisArchiveIcon"]
];

const svgIcon = (kind) => {
  const common = "fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'";
  const icons = {
    simulator: `<svg viewBox='0 0 96 96' aria-hidden='true'><rect x='24' y='18' width='26' height='44' rx='2' ${common}/><path d='M36 18V10m20 24h16v18H56m-32 10h48m-36 0v10m24-10v10' ${common}/><circle cx='57' cy='26' r='4' ${common}/><path d='M32 70h32' ${common}/></svg>`,
    animal: `<svg viewBox='0 0 96 96' aria-hidden='true'><path d='M18 56c0-11 9-20 20-20 7 0 13 3 17 8l8 1c7 1 13 7 13 14v5H18z' ${common}/><circle cx='30' cy='42' r='3' ${common}/><path d='M26 36l4-8 8 7m34 15 8 8m-52 3-5 12m17-12v12m18-12v12' ${common}/></svg>`,
    manual: `<svg viewBox='0 0 96 96' aria-hidden='true'><path d='M22 63V45c0-4 6-4 6 0v10m0 0V33c0-4 6-4 6 0v22m0 0V29c0-4 6-4 6 0v26m0 0V35c0-4 6-4 6 0v20m0 0-1-11c0-4 6-5 7-1l3 13c1 6-1 12-5 17l-5 6H27l-5-8c-2-3-3-5-3-8z' ${common}/></svg>`,
    target: `<svg viewBox='0 0 96 96' aria-hidden='true'><circle cx='48' cy='48' r='22' ${common}/><circle cx='48' cy='48' r='10' ${common}/><path d='M48 18v8m0 44v8m30-30h-8M26 48h-8' ${common}/></svg>`,
    cluster: `<svg viewBox='0 0 96 96' aria-hidden='true'><circle cx='48' cy='28' r='9' ${common}/><circle cx='28' cy='60' r='9' ${common}/><circle cx='68' cy='60' r='9' ${common}/><path d='M42 35 34 51m20-16 8 16M38 60h20' ${common}/></svg>`,
    arm: `<svg viewBox='0 0 96 96' aria-hidden='true'><path d='M20 72h56M28 72l8-34 20-8 10 13-20 8-8 21' ${common}/><circle cx='36' cy='38' r='5' ${common}/><circle cx='56' cy='30' r='5' ${common}/></svg>`,
    shield: `<svg viewBox='0 0 96 96' aria-hidden='true'><path d='M48 16 72 24v18c0 17-10 28-24 38-14-10-24-21-24-38V24z' ${common}/><path d='m36 48 8 8 18-18' ${common}/></svg>`,
    pencil: `<svg viewBox='0 0 96 96' aria-hidden='true'><path d='M20 68 62 26l8 8-42 42-12 4zM56 20l8-8 12 12-8 8' ${common}/><path d='M20 76h24' ${common}/></svg>`,
    file: `<svg viewBox='0 0 96 96' aria-hidden='true'><path d='M30 16h26l10 10v50H30z' ${common}/><path d='M56 16v14h14M38 44h20M38 56h20M38 68h12' ${common}/></svg>`,
    flow: `<svg viewBox='0 0 96 96' aria-hidden='true'><path d='M18 30h26v16H18zM52 50h26v16H52zM52 18h26v16H52zM18 62h26v16H18z' ${common}/><path d='M44 38h10m-20 32h18M65 34v16M31 46v16' ${common}/></svg>`
  };
  return icons[kind] || icons.target;
};

/* 功能：生成通用按钮。
 * 参数：text 按钮文案；href 跳转地址；ghost 是否使用浅色样式。
 * 返回值：按钮 HTML 字符串。
 */
const button = (text = "了解更多", href = "#/research", ghost = false, arrow = false) =>
  `<a class="button button-sweep ${ghost ? "button-ghost" : ""}" href="${href}"><span class="button-label">${text}</span>${arrow ? "<span>→</span>" : ""}</a>`;

/* 功能：生成区块标题。
 * 参数：title 标题；copy 副文案；align 对齐方式。
 * 返回值：标题 HTML 字符串。
 */
const sectionTitle = (title, copy = "", align = "center") =>
  `<div class="section-heading ${align === "left" ? "is-left" : ""}"><h2>${title}</h2>${copy ? `<p>${copy}</p>` : ""}</div>`;

/* 功能：生成统一顶栏。
 * 参数：无。
 * 返回值：顶栏 HTML 字符串。
 */
export function header() {
  return `
    <div class="nav-shell">
      <a class="brand" href="#/home" aria-label="具身智能社团首页"><img src="${img("logo")}" alt="具身智能社团 Qingdao City University"></a>
      <button class="menu-toggle" type="button" aria-label="打开导航" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span></button>
      <nav class="main-nav" id="main-nav" aria-label="主导航">
        <a data-route="home" href="#/home">首页</a>
        <a data-route="about" href="#/about">关于我们</a>
        <div class="nav-products">
          <a data-route="products" href="#/research" aria-haspopup="true">产品中心</a>
          <div class="product-menu" aria-label="产品中心菜单">
            <a href="#/research">精准任务执行系统</a>
            <div class="product-menu-branch">
              <a href="#/v3" aria-haspopup="true">高精度动作控制系统</a>
              <div class="product-submenu" aria-label="高精度动作控制系统产品">
                <a href="#/v3">WMOX-22001</a>
                <a href="#/v4">WMOX-24001</a>
              </div>
            </div>
            <a href="#/ois">项目资料与代码协同平台</a>
            <a href="#/consumables">机器人组件</a>
          </div>
        </div>
        <a data-route="news" href="#/news">新闻中心</a>
        <a data-route="support" href="#/support">服务支持</a>
        <a class="lang" href="#/home" data-language aria-label="当前语言：简体中文">CN</a>
        <a class="nav-cta" data-footer-link href="#/home">联系我们</a>
      </nav>
    </div>`;
}

/* 功能：生成统一页脚。
 * 参数：无。
 * 返回值：页脚 HTML 字符串。
 */
export function footer() {
  return `
    <div class="footer-inner">
      <div class="footer-company">
        <img src="${img("footerLogo")}" alt="具身智能社团 Qingdao City University">
        <p>${CONTACT.company}</p>
        <p class="footer-contact-line"><span class="footer-contact-label">联系方式：</span><span class="footer-contact-value">${CONTACT.sales}</span></p>
        <p class="footer-contact-line"><span class="footer-contact-label" aria-hidden="true"></span><span class="footer-contact-value">${CONTACT.phone}</span></p>
        <p><span class="footer-address-label">地址：</span><span class="footer-address-value">${CONTACT.addressA}</span></p>
        <p><span class="footer-address-label" aria-hidden="true"></span><span class="footer-address-value">${CONTACT.addressB}</span></p>
      </div>
      <div class="footer-links">
        <strong>网站导航</strong>
        <a href="#/home">首页</a><a href="#/news">新闻信息</a>
        <a href="#/about">关于我们</a><a href="#/support">服务支持</a>
        <a href="#/research">产品中心</a><a data-footer-link href="#/home">联系我们</a>
      </div>
      <div class="footer-qr">
        <img src="${img("qr")}" alt="具身智能社团二维码">
        <span>具身智能社团</span>
      </div>
    </div>`;
}

/* 功能：生成统一横幅区域。
 * 参数：image 背景图资源键名；eyebrow 顶部眉题；title 主标题；copy 说明；className 自定义类名；align 文案对齐。
 * 返回值：横幅 HTML 字符串。
 */
function pageHero({ image, eyebrow = "", title, copy = "", action = "", className = "", align = "left" }) {
  const heroClassNames = className.split(/\s+/);
  const resolvedImage = heroClassNames.includes("news-hero")
    ? "newsCenterHero"
    : heroClassNames.includes("support-hero")
      ? "supportHero"
      : heroClassNames.includes("contact-hero")
        ? "contactHero"
        : image;
  return `
    <section class="page-hero ${className} hero-${align}" style="--hero:url('${img(resolvedImage)}')">
      <div class="hero-shade"></div>
      <div class="hero-copy">
        ${eyebrow ? `<span>${eyebrow}</span>` : ""}
        <h1>${title}</h1>
        ${copy ? `<p>${copy}</p>` : ""}
        ${action}
      </div>
    </section>`;
}

/* 功能：生成联系横幅。
 * 参数：无。
 * 返回值：联系横幅 HTML 字符串。
 */
function contactBand() {
  return `
    <section class="contact-band reveal">
      <div>
        <h3>加入社团，参与真实机器人项目</h3>
        <p class="band-copy">了解招新、实训和竞赛安排</p>
      </div>
      <a class="button button-sweep" data-footer-link href="#/home"><span class="button-label">加入社团</span></a>
    </section>`;
}

/* 功能：生成相关产品区块。
 * 参数：exclude 当前页面产品键名。
 * 返回值：相关产品 HTML 字符串。
 */
function relatedProducts(exclude = "") {
  const catalog = [
    ["research", "homeProduct", "机器人开发实训平台", "运动控制 / 感知交互 / 任务验收"],
    ["ois", "productConsumables", "项目资料与代码协同平台", "代码管理 / 日志记录 / 成果归档"],
    ["consumables", "v3RelatedConsumables", "机器人开发套件", "末端工具 / 连接组件"],
    ["v3", "relatedOperation", "高精度具身智能控制系统", "V3.0 / V4.0"]
  ];
  const v3CatalogOverrides = {
    research: ["research", "v3RelatedInjection", "机器人开发实训平台", "基础任务 / 进阶项目"],
    consumables: ["consumables", "v3RelatedConsumables", "机器人开发套件", "末端工具 / 实训套装"]
  };
  const consumablesCatalogOverrides = {
    research: ["research", "consumablesRelatedInjection", "机器人开发实训平台", "基础任务 / 进阶项目"],
    ois: ["ois", "consumablesRelatedOis", "项目资料与代码协同平台", "代码管理 / 日志记录 / 成果归档"]
  };
  const recommendationOrder = {
    research: ["consumables", "v3"],
    ois: ["consumables", "v3"],
    v3: ["consumables", "research"],
    consumables: ["research", "ois"]
  };
  const keys = recommendationOrder[exclude] || catalog.map(([key]) => key).filter((key) => key !== exclude).slice(0, 2);
  const products = keys.map((key) => (
    exclude === "consumables" && consumablesCatalogOverrides[key]
      ? consumablesCatalogOverrides[key]
      : exclude === "v3" && v3CatalogOverrides[key]
      ? v3CatalogOverrides[key]
      : catalog.find(([itemKey]) => itemKey === key)
  )).filter(Boolean);

  return `
    <section class="related section-pad">
      <div class="content">
        ${sectionTitle("相关产品", "", "left")}
        <div class="related-grid">
          ${products.map(([key, image, title, copy]) => `
            <a href="#/${key}" class="related-item motion-reveal">
              <div class="related-thumb">
                ${lazyImg(image, title, "related-base")}
              </div>
              <h3>${title}</h3>
              <p>${copy}</p>
            </a>
          `).join("")}
        </div>
      </div>
    </section>`;
}

/* 功能：生成产品能力区块。
 * 参数：index 序号；title 标题；copy 文案；image 图片键名；reverse 是否反转布局。
 * 返回值：能力区块 HTML 字符串。
 */
function productFeature({ index, title, copy, image, reverse = false, lineArt = "", splitText = false }) {
  return `
    <article class="feature-row ${reverse ? "reverse" : ""} reveal">
      <div class="feature-media" data-motion>
        ${lazyImg(image, title)}
      </div>
      <div class="feature-copy">
        <b class="feature-index">${index}</b>
        <h2${splitText ? " data-split-text" : ""}>${title}</h2>
        <p${splitText ? " data-split-text" : ""}>${copy}</p>
      </div>
      ${lineArt ? `<img class="feature-line-art" src="${img(lineArt)}" alt="" aria-hidden="true" loading="lazy" decoding="async">` : ""}
    </article>`;
}

/* 功能：生成首页。
 * 参数：无。
 * 返回值：首页 HTML 字符串。
 */
export function homePage() {
  const lineCards = [
    { title: "运动控制实训", copy: "关节控制　轨迹规划　现场调试", href: "#/v3", image: "pipelineOperation" },
    { title: "感知与交互", copy: "视觉感知　任务规划　人机协作", href: "#/research", image: "pipelineInjection" },
    { title: "项目资料平台", copy: "代码管理　数据记录　成果归档", href: "#/ois", image: "pipelineOis" },
    { title: "机器人开发套件", copy: "末端工具　结构件　实训配件", href: "#/consumables", image: "pipelineConsumables" }
  ];

  return `
    ${pageHero({
      image: "homeHero",
      eyebrow: "QINGDAO CITY UNIVERSITY × UNITREE",
      title: "把课堂连接到真实机器人<br>让每个想法都能跑起来",
      copy: "青岛城市学院-宇树科技产业学院具身智能社团，<br class=\"home-hero-copy-break\">围绕宇树机器人开展课程实践、项目实训与竞赛协作。",
      className: "home-hero"
    })}
    <section class="home-feature" data-product-carousel data-carousel aria-label="产品展示轮播" tabindex="0">
      <div class="slider-dots" role="tablist" aria-label="选择产品">
        <button class="active" type="button" role="tab" aria-selected="true" aria-label="G1" data-carousel-dot="0"></button>
        <button type="button" role="tab" aria-selected="false" aria-label="A2" data-carousel-dot="1"></button>
        <button type="button" role="tab" aria-selected="false" aria-label="H2" data-carousel-dot="2"></button>
      </div>
      <div class="carousel-stage">
        <article class="feature-slide home-slide machine-slide active" data-carousel-slide>
          <div class="content feature-split">
            <div class="slide-visual slide-robot">
              <img src="${img("homeCarouselG1")}" alt="G1 人形机器人">
            </div>
            <div class="slide-copy">
              <h2>G1</h2>
              <p>人形机器人平台，适合开展运动控制、视觉感知与人机交互等具身智能实验。</p>
              ${button("了解更多", "#/v3", false, false)}
            </div>
          </div>
        </article>
        <article class="feature-slide home-slide ois-slide" data-carousel-slide>
          <div class="content feature-split">
            <div class="slide-visual slide-robot">
              ${lazyImg("homeCarouselAs2", "A2 四足机器人", "robot-product-asset")}
            </div>
            <div class="slide-copy">
              <h2>A2</h2>
              <p>高性能四足机器人平台，适用于复杂地形运动、智能导航与自主巡检任务。</p>
              ${button("了解更多", "#/v3", false, false)}
            </div>
          </div>
        </article>
        <article class="feature-slide home-slide consumables-slide" data-carousel-slide>
          <div class="content feature-split">
            <div class="slide-visual slide-robot">
              ${lazyImg("homeCarouselH2", "H2 人形机器人", "robot-product-asset")}
            </div>
            <div class="slide-copy">
              <h2>H2</h2>
              <p>新一代人形机器人平台，支持全身协同、灵巧操作与综合任务开发。</p>
              ${button("了解更多", "#/v3", false, false)}
            </div>
          </div>
        </article>
      </div>
    </section>
    <section class="product-line section-pad">
      <div class="content">
        ${sectionTitle("实践模块")}
        <div class="product-line-carousel" data-product-line>
          <button class="product-line-arrow direction-control prev" type="button" aria-label="上一组产品" data-line-prev style="--direction-sprite:url('${img("directionControls")}')"></button>
          <div class="product-line-viewport">
            <div class="product-line-track">
              ${lineCards.map((item, index) => `
                <a href="${item.href}" class="product-line-card" data-line-card>
                  <h3>${item.title}</h3>
                  <p>${item.copy}</p>
                  <div class="product-line-media is-${item.image}">
                    ${lazyImg(item.image, item.title)}
                  </div>
                </a>
              `).join("")}
            </div>
          </div>
          <button class="product-line-arrow direction-control next" type="button" aria-label="下一组产品" data-line-next style="--direction-sprite:url('${img("directionControls")}')"></button>
        </div>
      </div>
    </section>
    <section class="about-strip" style="--bg:url('${img("meeting")}')">
      <div class="content reveal">
        <div class="about-strip-head">
          <h2>关于我们</h2>
          <div class="about-stats">
            <div class="about-stat">
              <div class="about-stat__value">4<span>类</span></div>
              <p>实践方向</p>
            </div>
            <div class="about-stat">
              <div class="about-stat__value">3<span>段</span></div>
              <p>成长路径</p>
            </div>
          </div>
        </div>
        <p>我们是青岛城市学院-宇树科技产业学院下属社团，依托宇树机器人平台开展具身智能学习与工程实践。社团把课程、实验室和竞赛项目串成一条可执行的成长路径：成员从基础控制开始，完成可验收的机器人任务，再把成果沉淀为代码、数据和演示作品。</p>
        ${button("了解更多", "#/about", false, false)}
      </div>
    </section>
    <section class="home-news section-pad">
      <div class="content">
        <div class="home-news-head">
          ${sectionTitle("新闻信息", "", "left")}
          ${button("了解更多", "#/news", false, false)}
        </div>
        <div class="news-list" data-home-news-list></div>
      </div>
    </section>`;
}

/* 功能：生成关于我们页面。
 * 参数：无。
 * 返回值：关于我们页面 HTML 字符串。
 */
function aboutPage() {
  const history = [
    ["共建背景", "青岛城市学院与宇树科技共建产业学院，导入宇树机器人平台、课程资源与工程师实践标准。"],
    ["课程模块", "围绕机器人结构、运动控制、感知与交互建立基础课程，配套可运行代码和调试任务。"],
    ["实验室实训", "成员在仿真与真实机器人上完成标定、遥操作、导航和安全停机等基础任务，按清单验收。"],
    ["项目制学习", "以小组为单位拆解真实需求，形成任务书、代码仓库、测试记录和现场演示，过程可追溯。"],
    ["竞赛协作", "围绕宇树机器人竞赛与校内创新项目组建梯队，进行周计划、评审和复盘，持续迭代作品。"],
    ["成果沉淀", "优秀项目进入社团案例库，为课程助教、企业实践和后续成员提供可复用的工程模板。"]
  ];

  const culture = [
    ["社团定位", "依托产业学院，把宇树机器人带进课堂、实验室和竞赛现场"],
    ["活动机制", "每周例会、分组实训、代码评审、现场验收，过程和结果都有记录"],
    ["成员成长", "基础控制 → 场景任务 → 项目协作，逐步形成可展示、可复用的工程能力"]
  ];

  return `
    ${pageHero({ image: "aboutHero", title: "引领具身智能具身智能<br>守护全球智能未来", className: "sub-hero about-hero" })}
    <section class="about-intro section-pad">
      <div class="content narrow reveal">
        ${sectionTitle("关于我们")}
        <div class="intro-copy">
          <p>具身智能社团是青岛城市学院计算与智能技术学院下属学生组织，面向在校生开放。社团依托宇树科技产业学院，把课堂知识转成可运行的机器人任务，重点覆盖运动控制、视觉感知、导航交互和系统调试。</p>
          <p>社团采用项目制协作：每个小组都有任务书、代码仓库、测试记录和演示节点；成员可从基础实训进入竞赛项目，也可在企业导师指导下完成面向真实场景的原型验证。</p>
        </div>
        <div class="metric-row">
            <strong>4<sup>类</sup><small>实践方向</small></strong>
            <strong>3<sup>段</sup><small>成长路径</small></strong>
            <strong>4<sup>套</sup><small>项目流程</small></strong>
        </div>
        <div class="video-cover">
          <video playsinline preload="metadata" poster="${img("aboutVideo")}" ${ABOUT_VIDEO_SRC ? `src="${ABOUT_VIDEO_SRC}"` : ""} aria-label="具身智能社团活动介绍" data-about-video data-pot-player>
            您的浏览器不支持视频播放。
          </video>
        </div>
      </div>
    </section>
    <section class="history practice-system section-pad">
      <div class="content">
        ${sectionTitle("实践体系")}
        <div class="timeline" data-timeline tabindex="0" role="region" aria-label="实践体系导航">
          <button class="timeline-arrow prev" type="button" aria-label="查看上一阶段" data-timeline-prev style="--direction-sprite:url('${img("directionControls")}')"></button>
          <div class="timeline-stage">
            <div class="timeline-track" data-timeline-track>
              ${history.map(([year, copy]) => `<article class="reveal"><b>${year}</b><p>${copy}</p></article>`).join("")}
            </div>
          </div>
          <button class="timeline-arrow next" type="button" aria-label="查看下一阶段" data-timeline-next style="--direction-sprite:url('${img("directionControls")}')"></button>
        </div>
      </div>
    </section>
    <section class="culture section-pad">
      <div class="content">
        ${sectionTitle("社团机制")}
        <div class="culture-grid">
          ${lazyImg("office", "具身智能社团活动与实训空间", "reveal")}
          <div class="culture-list">
            ${culture.map(([title, copy], index) => `
              <article class="reveal">
                <b>${String(index + 1).padStart(2, "0")}</b>
                <h3>${title}</h3>
                <p>${copy}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
    <section class="honor section-pad" hidden>
      <div class="content">
        ${sectionTitle("项目与竞赛成果")}
        <div class="honor-tabs" role="tablist" aria-label="企业荣誉分类">
          <button class="active" type="button" role="tab" aria-selected="true" data-honor-tab="patent">项目作品</button>
          <button type="button" role="tab" aria-selected="false" data-honor-tab="award">竞赛成果</button>
          <button type="button" role="tab" aria-selected="false" data-honor-tab="academic">研究分享</button>
        </div>
        <div class="honor-carousel" data-honor-carousel aria-live="polite">
          <button class="honor-arrow prev" type="button" aria-label="上一项荣誉" data-honor-prev style="--direction-sprite:url('${img("directionControls")}')"></button>
          <div class="honor-grid" data-honor-grid></div>
          <button class="honor-arrow next" type="button" aria-label="下一项荣誉" data-honor-next style="--direction-sprite:url('${img("directionControls")}')"></button>
        </div>
      </div>
    </section>`;
}

/* 功能：生成新闻信息页面。
 * 参数：无。
 * 返回值：新闻页面 HTML 字符串。
 */
function newsPage() {
  return `
    ${pageHero({ image: "newsHero", title: "新闻信息", className: "sub-hero news-hero" })}
    <section class="latest section-pad" data-news-latest hidden>
      <div class="content">
        ${sectionTitle("最新讯息", "", "left")}
        <div class="news-feature-stage" data-carousel data-news-feature-stage aria-label="最新讯息轮播" tabindex="0">
          ${Array.from({ length: 3 }, (_, index) => `
            <article class="featured-news ${index === 0 ? "active" : ""}" data-carousel-slide aria-hidden="${index !== 0}">
              <div class="featured-copy">
                <time></time>
                <h2 class="visually-hidden"></h2>
                <p></p>
                ${button("查看详情", "#/news")}
              </div>
              <img alt="" decoding="async">
            </article>
          `).join("")}
          <div class="news-copy-transition" aria-live="polite" aria-atomic="true">
            <div class="news-copy-transition-layer is-current" data-news-copy-layer>
              <time></time>
              <p></p>
            </div>
          </div>
          <div class="news-slider-indicator" role="tablist" aria-label="选择最新讯息">
            ${Array.from({ length: 3 }, (_, index) => `<button class="${index === 0 ? "active" : ""}" type="button" role="tab" aria-selected="${index === 0}" aria-label="" data-carousel-dot="${index}"></button>`).join("")}
          </div>
        </div>
      </div>
    </section>
    <section class="all-news section-pad" data-news-all hidden>
      <div class="content">
        <div class="all-news-head">
          ${sectionTitle("全部讯息", "", "left")}
          <div class="all-news-tools">
            <div class="news-filter-control" data-news-filter-control>
              <button class="news-filter-trigger" type="button" data-news-year-trigger aria-haspopup="menu" aria-expanded="false" aria-controls="news-filter-menu">
                <span data-news-year-label>全部年份</span>
                <span class="news-filter-chevron" aria-hidden="true"></span>
              </button>
              <div class="news-filter-menu" id="news-filter-menu" data-news-year-menu role="menu" aria-label="选择新闻年份" hidden>${newsYearFilterOptions([])}</div>
            </div>
            <label class="news-search">
              <span class="visually-hidden">搜索讯息</span>
              <input type="search" data-news-search placeholder="搜索" aria-label="搜索讯息">
              <span class="news-search-icon" aria-hidden="true"></span>
            </label>
          </div>
        </div>
        <div class="news-listing" data-news-grid></div>
        <p class="news-empty" data-news-empty hidden>暂未找到相关讯息</p>
        <div class="pagination" aria-label="新闻分页" style="--direction-sprite:url('${img("directionControls")}')">
          <button class="pagination-direction prev" type="button" data-page-prev aria-label="上一页"></button>
          <span class="pagination-pages" data-news-pages></span>
          <button class="pagination-direction next" type="button" data-page-next aria-label="下一页"></button>
          <span class="visually-hidden" data-news-page-status aria-live="polite"></span>
        </div>
      </div>
    </section>`;
}

/* 功能：生成服务支持页面。
 * 参数：无。
 * 返回值：服务支持页面 HTML 字符串。
 */
function supportPage() {
  const courses = [
    { title: "宇树机器人基础实训", image: "simulatorTraining", focusImage: "simulatorTrainingFocus" },
    { title: "仿真与现场调试", image: "animalLabTraining", focusImage: "animalLabTrainingFocus" },
    { title: "项目协作与竞赛", image: "handsOnTraining", focusImage: "handsOnTrainingFocus" }
  ];

  return `
    ${pageHero({ image: "newsHero", title: "服务支持", className: "sub-hero support-hero" })}
    <section class="support-courses section-pad">
      <div class="content">
        ${sectionTitle("训练课程")}
        <div class="support-grid">
          ${courses.map(({ title, image, focusImage }) => `
            <article class="support-card reveal" tabindex="0">
              <div class="support-icon" aria-hidden="true">
                ${lazyImg(image, "", "support-icon-default")}
                ${lazyImg(focusImage, "", "support-icon-focus")}
              </div>
              <h3>${title}</h3>
            </article>
          `).join("")}
        </div>
      </div>
    </section>`;
}

/* 功能：生成科研产品页面。
 * 参数：无。
 * 返回值：科研产品页面 HTML 字符串。
 */
function researchPage() {
  const animals = [
    ["鼠", "mouse", "animalMouseCrop"],
    ["兔", "rabbit", "animalRabbitCrop"],
    ["猴", "monkey", "animalMonkeyCrop"],
    ["犬", "dog", "animalDogCrop"],
    ["羊", "sheep", "animalSheepCrop"],
    ["猪", "pig", "animalPigCrop"]
  ];

  return `
    ${pageHero({
      image: "researchHero",
      title: "机器人开发实训平台",
      copy: "基于宇树机器人平台，把运动控制、感知算法和任务规划串成可验收的实训流程，<br class=\"research-hero-copy-break\">每个项目都留下代码、数据和现场演示记录。",
      action: `<button class="hero-video-button" type="button" data-video-title="机器人开发实训平台" data-video-poster="${img("researchHero")}" data-video-src="${RESEARCH_VIDEO_SRC}">查看实训<span aria-hidden="true">›</span></button>`,
      className: "product-hero hero-center research-hero"
    })}
    <section class="numbered-features section-pad">
      <div class="content">
        ${productFeature({ index: "01", title: "运动控制", copy: "从关节标定、坐标系设置到轨迹规划，成员在仿真与真实宇树机器人上完成可复现的控制任务。", image: "researchMotion", reverse: true, lineArt: "researchMachineOutline", splitText: true })}
        ${productFeature({ index: "02", title: "感知与交互", copy: "将相机、传感器和语音指令接入任务流程，完成目标识别、避障、抓取和人机协同等项目练习。", image: "researchMachine", lineArt: "researchMouseOutline", splitText: true })}
      </div>
    </section>
    <section class="safety-strip" style="--bg:url('${img("researchScene")}')">
      <div class="content reveal">
        <div class="strip-heading">
          <span>03</span>
          <div>
            <h2 data-split-text>安全可靠</h2>
            <p data-split-text>把复杂机器人任务拆成标准化步骤：环境检查、代码运行、日志记录、故障复盘和现场验收。新成员按清单练习，老成员通过代码评审和示范任务带教。</p>
          </div>
        </div>
        <div class="safety-numbers">
          <b><span class="stat-number"><span class="stat-value">4</span><sup>类</sup></span><small>实践方向</small></b>
          <b><span class="stat-number"><span class="stat-value">3</span><sup>步</sup></span><small>项目流程</small></b>
          <b><span class="stat-number"><span class="stat-value">1</span><sup>个</sup></span><small>共享平台</small></b>
        </div>
      </div>
    </section>
    <section class="applications section-pad">
      <div class="content">
        ${sectionTitle("实践方向", "", "left")}
        <div class="animal-grid">
          ${["运动控制", "视觉感知", "导航交互", "强化学习", "机械结构", "竞赛项目"].map((name, index) => `<article class="animal-card is-${animals[index][1]} reveal" tabindex="0"><div class="animal-art">${lazyImg(animals[index][2], `${name}实践`)}</div><span>${name}</span></article>`).join("")}
        </div>
      </div>
    </section>
    ${contactBand()}
    ${relatedProducts("research")}`;
}

/* 功能：生成 OIS 页面。
 * 参数：无。
 * 返回值：OIS 页面 HTML 字符串。
 */
function oisPage() {
  return `
    ${pageHero({
      image: "oisHero",
      title: "<span class='ois-title-accent'>项目资料</span><br>与代码协同平台",
      copy: "把代码、传感器数据、实验日志和项目文档放在同一工作台，方便社团成员复现任务、定位问题并交接项目。",
      className: "product-hero ois-hero"
    })}
    <section class="ois-workflow section-pad" data-ois-workflow="import">
      <div class="content">
        ${sectionTitle("<em>高效协作</em>管理机器人项目")}
        <div class="ois-layout">
          <div class="ois-tabs" role="tablist" aria-label="OIS 功能切换">
            ${oisTabs.map(([key, label, subtitle, , , icon], index) => `
              <button class="${index === 0 ? "active" : ""}" type="button" data-ois-tab="${key}" role="tab" aria-selected="${index === 0}">
                <i class="ois-tab-icon"><img src="${img(icon)}" alt="" aria-hidden="true"></i>
                <b>${label}</b>
                <span>${subtitle}</span>
              </button>
            `).join("")}
          </div>
          <div class="ois-panels">
            ${oisTabs.map(([key, label, subtitle, copy, image], index) => `
              <div class="ois-panel ${index === 0 ? "active" : ""}" data-ois-panel="${key}">
                <div class="ois-panel-copy">
                  <span>${subtitle}</span>
                  <h3>${label}</h3>
                  <p>${copy}</p>
                </div>
                <div class="ois-panel-media ois-panel-media--complete">
                  <img class="ois-panel-screen" src="${img(image)}" alt="${label}">
                  <img class="ois-panel-frame" src="${img("oisTablet")}" alt="" aria-hidden="true">
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
    <section class="ois-security section-pad">
      <div class="content">
        ${sectionTitle("<em>过程可追溯</em>，让项目交接更可靠")}
        <img class="ois-security-screen reveal" src="${img("oisProcess")}" alt="OIS 图像处理界面">
        <div class="security-grid motion-reveal">
          <span><img src="${img("oisCompatibilityIcon")}" alt=""><b>统一接入</b><small>代码、模型、传感器与演示视频按项目归集，减少资料散落</small></span>
          <span><img src="${img("oisSecurityIcon")}" alt=""><b>权限清晰</b><small>按小组和项目设置访问范围，保留修改记录，便于协作复盘</small></span>
          <span><img src="${img("oisAnnotationIcon")}" alt=""><b>任务标注</b><small>为数据片段和失败日志添加标签，快速定位待解决问题</small></span>
          <span><img src="${img("oisArchiveIcon")}" alt=""><b>成果归档</b><small>自动关联任务书、代码版本、测试结果和现场照片</small></span>
          <span><img src="${img("oisWorkflowIcon")}" alt=""><b>流程一体</b><small>从立项、开发、测试到演示统一记录，降低交接成本</small></span>
          <span><img src="${img("oisAnalysisIcon")}" alt=""><b>复盘分析</b><small>基于日志和指标复盘动作成功率，为下一轮迭代提供依据</small></span>
        </div>
      </div>
    </section>
    ${contactBand()}
    ${relatedProducts("ois")}`;
}

/* 功能：生成 V3 页面。
 * 参数：无。
 * 返回值：V3 页面 HTML 字符串。
 */
function v3Page() {
  const features = [
    ["v3PrecisionIcon", "动作控制", "关节控制及末端定位", [
      "完成关节标定、坐标系设置和末端定位",
      "支持行走、转向、抓取和放置等基础动作",
      "可规划末端运动轨迹并记录误差"
    ]],
    ["v3ModularIcon", "模块化设计", "适配课程与项目任务", [
      "按任务替换末端工具、传感器和控制模块",
      "同一套代码可在仿真与真实机器人上迭代"
    ]],
    ["v3ArmIcon", "工程规范", "从安全检查到现场验收", [
      "建立上电、急停、限位和日志检查清单",
      "支持局域网遥操作与现场协同调试"
    ]]
  ];

  return `
    ${pageHero({
      image: "v3Hero",
      eyebrow: "WMOX-22001",
      title: "宇树机器人项目实训",
      copy: "围绕宇树机器人开展从设备检查、SDK调用到任务演示的完整训练。成员需要提交代码、参数、日志和复盘记录，在指导教师或高年级成员评审通过后进入下一阶段。",
      className: "product-hero v3-hero"
    })}
    <section class="v3-features section-pad">
      <div class="content">
        ${sectionTitle("从<em>基础动作</em>到完整任务", "按统一清单完成标定、控制、感知、协作和演示，训练结果可复现、可交接")}
        <div class="icon-features motion-reveal">
          ${features.map(([icon, title, subtitle, details]) => `
            <article>
              <div class="icon-shell"><img src="${img(icon)}" alt=""></div>
              <h3>${title}</h3>
              <p class="feature-subtitle">${subtitle}</p>
              <ul>${details.map((detail) => `<li>${detail}</li>`).join("")}</ul>
            </article>
          `).join("")}
        </div>
        <div class="video-large reveal">
          <video playsinline preload="metadata" poster="${img("v3Feature")}" ${V3_VIDEO_SRC ? `src="${V3_VIDEO_SRC}"` : ""} aria-label="具身智能机器人案例视频" data-v3-video data-pot-player>
            您的浏览器不支持视频播放。
          </video>
        </div>
      </div>
    </section>
    <section class="application-strip" style="--bg:url('${img("operationScene")}')">
      <div class="content reveal">
        <div class="application-copy application-timeline">
          <p>阶段一：完成宇树机器人安全检查、上电、急停与基础遥操作。</p>
          <p>阶段二：完成关节标定、轨迹规划和视觉目标识别，提交可复现代码。</p>
          <p>阶段三：以小组为单位完成导航、抓取或人机协同任务，进行现场演示。</p>
          <p>阶段四：参加校内外竞赛或产业学院项目评审，依据反馈迭代版本。</p>
          <p>阶段五：将通过验收的代码、日志和文档沉淀为社团案例，供后续成员复用。</p>
        </div>
        <div class="metric-row light">
          <strong><span>3-5<sup>μm</sup></span><small>末端精度</small></strong>
          <strong><span>100<sup>+</sup></span><small>应用案例</small></strong>
          <strong><span>10<sup>+</sup></span><small>应用中心</small></strong>
        </div>
      </div>
    </section>
    ${contactBand()}
    ${relatedProducts("v3")}`;
}

/* 功能：生成 V4 页面。
 * 参数：无。
 * 返回值：V4 页面 HTML 字符串。
 */
function v4Page() {
  return pageHero({
    image: "v4Hero",
    eyebrow: "WMOX-24001",
    title: "高精度动作控制系统",
    copy: "敬请期待…",
    className: "v4-full"
  });
}

/* 功能：生成耗材页面。
 * 参数：无。
 * 返回值：耗材页面 HTML 字符串。
 */
function consumablesPage() {
  const items = [
    {
      title: "宇树机器人基础套件",
      category: "needle",
      mediaClass: "is-incyto",
      media: [["microNeedle", "product-main"]],
      specs: ["适合：入门控制练习", "内容：线缆、转接件与工具", "方式：按任务清单领用", "记录：归还前完成检查"]
    },
    {
      title: "末端执行器组件",
      category: "needle",
      mediaClass: "is-metal",
      media: [["metalNeedle", "metal-needle"], ["metalPackage", "metal-package"]],
      specs: ["适合：抓取与搬运任务", "内容：夹具与连接件", "方式：按项目配置", "记录：保留装配参数"]
    },
    {
      title: "传感器与连接组件",
      category: "needle",
      mediaClass: "is-plastic",
      media: [["pipettePackage", "plastic-package"], ["pipetteNeedle", "pipette-needle"]],
      specs: ["适合：视觉与姿态采集", "内容：相机、IMU与连接件", "方式：按实验方案接入", "记录：保存标定结果"]
    },
    {
      title: "安全防护与急停组件",
      category: "needle",
      mediaClass: "is-injector",
      media: [["injector", "injector-main"], ["pipetteNeedle", "injector-needle"]],
      specs: ["适合：上电与现场调试", "内容：急停、限位与警示件", "方式：实训前逐项检查", "记录：异常情况必须上报"]
    },
    {
      title: "抓取夹具",
      category: "instrument",
      mediaClass: "is-instrument",
      media: [["instrumentForceps", "instrument-forceps"], ["instrumentPackaging", "instrument-packaging"]],
      specs: ["用于抓取、搬运和放置不同尺寸物体"]
    },
    {
      title: "装配工具",
      category: "instrument",
      mediaClass: "is-instrument",
      media: [["instrumentForceps", "instrument-forceps"], ["instrumentPackaging", "instrument-packaging"]],
      specs: ["用于机器人装配、调平和日常维护"]
    },
    {
      title: "定位标记套件",
      category: "instrument",
      mediaClass: "is-instrument",
      media: [["instrumentForceps", "instrument-forceps"], ["instrumentPackaging", "instrument-packaging"]],
      specs: ["用于相机标定、场地定位和重复实验"]
    },
    {
      title: "维护与收纳套件",
      category: "instrument",
      mediaClass: "is-instrument",
      media: [["instrumentForceps", "instrument-forceps"], ["instrumentPackaging", "instrument-packaging"]],
      specs: ["用于实训后检查、清洁和分类收纳"]
    },
    {
      title: "遥操作控制套装",
      category: "kit",
      mediaClass: "is-handheld-kit",
      media: [["handheldMicroinjectionKit", "handheld-kit"]],
      description: "用于远程控制、示教和动作记录",
      specs: ["适用：基础动作与导航任务"]
    },
    {
      title: "仿真实训附件包",
      titleDetail: "（场地标记、夹具、连接件）",
      category: "kit",
      mediaClass: "is-kit-bag",
      media: [["roboticConsumablesKit", "kit-bag"]],
      description: "用于仿真环境搭建和任务复现",
      specs: ["配合宇树机器人平台完成训练任务"]
    },
    {
      title: "现场演示附件包",
      titleDetail: "（展示底座、夹具、传感器）",
      category: "kit",
      mediaClass: "is-kit-bag",
      media: [["roboticConsumablesKit", "kit-bag"]],
      description: "用于竞赛、开放日和项目答辩演示",
      specs: ["配合宇树机器人完成现场展示"]
    },
    {
      title: "移动底座",
      category: "experiment",
      mediaClass: "is-experiment is-mouse-fixture",
      media: [["mouseFixture", "experiment-product"]],
      description: "用于机器人移动、定位和场地复现",
      specs: ["适用：实验室与竞赛场地"]
    },
    {
      title: "任务标记板",
      category: "experiment",
      mediaClass: "is-experiment is-mouse-platform",
      media: [["mousePlatform", "experiment-product"]],
      description: "用于路线规划、目标定位和任务分区",
      specs: ["适用：导航与交互实训"]
    },
    {
      title: "交互场景板",
      category: "experiment",
      mediaClass: "is-experiment is-guinea-pig-platform",
      media: [["guineaPigPlatform", "experiment-product"]],
      description: "用于搭建人机协同与多机器人任务场景",
      specs: ["适用：团队项目演示"]
    },
    {
      title: "线缆与转接件",
      category: "other",
      mediaClass: "is-other is-filling-plug",
      media: [["pipetteFillingPlug", "other-product"]],
      description: "用于设备连接、线缆整理和快速更换",
      specs: ["按设备型号选择对应规格"]
    },
    {
      title: "工具转换头",
      category: "other",
      mediaClass: "is-other is-irrigator",
      media: [["irrigator", "other-product"]],
      description: "用于不同末端工具之间的快速转换",
      specs: ["配合宇树机器人末端接口使用"]
    }
  ];

  return `
    <section class="page-hero consumables-hero hero-center">
      <div class="consumables-hero-art" aria-hidden="true">
        <img class="hero-replacement" src="${img("consumablesHeroReplacement")}" alt="">
      </div>
      <div class="hero-copy">
        <h1>机器人组件</h1>
        <p>覆盖机器人本体、末端工具、传感器和实训配件，服务于宇树机器人课程、项目开发与竞赛演示。</p>
      </div>
    </section>
    <section class="consumable-nav section-pad">
      <div class="content">
        <h2>以精密工艺守护操作<em>安全与信赖</em></h2>
        <div class="chip-row" aria-label="组件分类">
          <button class="active" type="button" data-consumable-filter="needle" aria-pressed="true">基础套件</button>
          <button type="button" data-consumable-filter="instrument" aria-pressed="false">末端工具</button>
          <button type="button" data-consumable-filter="kit" aria-pressed="false">实训附件</button>
          <button type="button" data-consumable-filter="experiment" aria-pressed="false">场景配件</button>
          <button type="button" data-consumable-filter="other" aria-pressed="false">连接维护</button>
        </div>
      </div>
    </section>
    <section class="consumable-list" data-active-consumable-category="needle">
      ${items.map((item, index) => {
        const categoryIndex = items.slice(0, index).filter((candidate) => candidate.category === item.category).length;
        return `
        <article class="consumable-item ${categoryIndex % 2 ? "reverse" : "is-tinted"} reveal" data-consumable-item data-consumable-category="${item.category}" ${item.category !== "needle" ? "hidden" : ""}>
          <div class="content consumable-row">
            <div class="consumable-media ${item.mediaClass}" data-motion>
              ${item.media.map(([image, className], mediaIndex) => `<img class="${className}" src="${img(image)}" alt="${mediaIndex === 0 ? item.title : ""}">`).join("")}
            </div>
            <div class="consumable-copy">
              <h3>${item.title}${item.titleDetail ? `<span class="consumable-title-detail">${item.titleDetail}</span>` : ""}</h3>
              ${item.description === false ? "" : `<p class="consumable-description">${item.description || "用于宇树机器人课程实训、项目开发与竞赛演示"}</p>`}
              ${item.specs.length ? `<ul>${item.specs.map((spec) => `<li>${spec}</li>`).join("")}</ul>` : ""}
            </div>
          </div>
        </article>`;
      }).join("")}
      <p class="consumable-empty" data-consumable-empty hidden>暂无相关产品</p>
    </section>
    ${contactBand()}
    ${relatedProducts("consumables")}`;
}

export const pages = {
  home: homePage,
  about: aboutPage,
  news: newsPage,
  support: supportPage,
  research: researchPage,
  ois: oisPage,
  v3: v3Page,
  v4: v4Page,
  consumables: consumablesPage
};

/* 功能：绑定页面交互。
 * 参数：无。
 * 返回值：无。
 */
export function bindInteractions() {
  const cleanups = [];

  // The V3 application scene is a 1920 × 800 artboard with text positioned on
  // that coordinate system. CSS transforms require a unitless scale value,
  // so calculate it from the rendered strip width instead of passing a `vw`
  // length to `scale()`, which browsers discard as invalid.
  const applicationStrip = document.querySelector(".application-strip");
  if (applicationStrip) {
    const updateApplicationSceneScale = () => {
      applicationStrip.style.setProperty(
        "--application-scale",
        String(applicationStrip.getBoundingClientRect().width / 1920)
      );
    };
    updateApplicationSceneScale();
    addEventListener("resize", updateApplicationSceneScale);
    cleanups.push(() => removeEventListener("resize", updateApplicationSceneScale));
  }

  const toggle = document.querySelector(".menu-toggle");
  toggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? localeText("关闭导航", "Close navigation") : localeText("打开导航", "Open navigation"));
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", localeText("打开导航", "Open navigation"));
    });
  });

  document.querySelectorAll('a[href="#/news"]').forEach((link) => {
    link.addEventListener("pointerenter", prefetchNewsData, { passive: true });
    link.addEventListener("pointerdown", prefetchNewsData, { passive: true });
    link.addEventListener("focus", prefetchNewsData);
    cleanups.push(() => {
      link.removeEventListener("pointerenter", prefetchNewsData);
      link.removeEventListener("pointerdown", prefetchNewsData);
      link.removeEventListener("focus", prefetchNewsData);
    });
  });

  let feedback = document.querySelector("[data-feedback-ui]");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.dataset.feedbackUi = "";
    feedback.innerHTML = `
      <div class="scroll-progress" aria-hidden="true"><span></span></div>
      <button class="back-to-top" type="button" data-back-to-top aria-label="返回顶部"></button>
      <div class="site-toast" role="status" aria-live="polite"></div>
      <div class="media-dialog" role="dialog" aria-modal="true" aria-labelledby="media-dialog-title" hidden>
        <button class="media-dialog-backdrop" type="button" data-dialog-close aria-label="关闭视频预览"></button>
        <div class="media-dialog-panel">
          <button class="media-dialog-close" type="button" data-dialog-close aria-label="关闭">×</button>
          <div class="media-dialog-poster"></div>
          <div class="media-dialog-copy"><span>QINGDAO CITY UNIVERSITY</span><h2 id="media-dialog-title"></h2><p>视频内容正在准备中，您可以先浏览页面中的产品资料。</p></div>
        </div>
      </div>`;
    document.body.append(feedback);
  }

  const toast = feedback.querySelector(".site-toast");
  const dialog = feedback.querySelector(".media-dialog");
  const scrollProgress = feedback.querySelector(".scroll-progress span");
  const backToTop = feedback.querySelector("[data-back-to-top]");
  const pageHeroElement = document.querySelector(".page-hero");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  backToTop?.setAttribute("aria-label", localeText("返回顶部", "Back to top"));
  const onBackToTop = () => scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "auto" : "smooth" });
  backToTop?.addEventListener("click", onBackToTop);
  cleanups.push(() => backToTop?.removeEventListener("click", onBackToTop));
  feedback.querySelector(".media-dialog-backdrop")?.setAttribute("aria-label", localeText("关闭视频预览", "Close video preview"));
  feedback.querySelector(".media-dialog-close")?.setAttribute("aria-label", localeText("关闭", "Close"));
  const dialogDescription = feedback.querySelector(".media-dialog-copy p");
  if (dialogDescription) dialogDescription.textContent = localeText(
    "视频内容正在准备中，您可以先浏览页面中的产品资料。",
    "The video is being prepared. You can browse the product information on this page in the meantime."
  );
  let toastTimer = 0;
  let scrollFrame = 0;
  const updateScrollProgress = () => {
    scrollFrame = 0;
    document.documentElement.classList.toggle("header-past-top", scrollY > 8);
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    scrollProgress?.style.setProperty("--scroll-progress", String(Math.min(1, scrollY / max)));
    backToTop?.classList.toggle("visible", scrollY > Math.min(720, innerHeight * 0.75));
    if (pageHeroElement && !reducedMotion) {
      const heroProgress = Math.min(1, Math.max(0, scrollY / Math.max(1, pageHeroElement.offsetHeight)));
      pageHeroElement.style.setProperty("--hero-shift", `${heroProgress * 36}px`);
      pageHeroElement.style.setProperty("--hero-copy-shift", `${heroProgress * 54}px`);
      pageHeroElement.style.setProperty("--hero-copy-opacity", String(1 - heroProgress * 0.72));
    }
  };
  const onScrollProgress = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollProgress);
  };
  addEventListener("scroll", onScrollProgress, { passive: true });
  updateScrollProgress();
  cleanups.push(() => {
    removeEventListener("scroll", onScrollProgress);
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
  });

  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const surfaces = [...document.querySelectorAll(".product-line-card, .support-card, .honor-card, .related-item, .news-grid article, .news-list-row, .animal-card")];
  const responsiveControls = [...document.querySelectorAll(".button, .nav-cta, .chip-row button, .news-tags button, .news-slider-indicator button, .ois-tabs button")];
  surfaces.forEach((surface) => surface.classList.add("interaction-surface"));
  responsiveControls.forEach((control) => control.classList.add("responsive-control"));
  if (finePointer && !reducedMotion) {
    document.querySelectorAll(".button-sweep").forEach((control) => {
      let resetTimer;
      const cancelExitSweep = () => {
        clearTimeout(resetTimer);
        control.classList.remove("is-white-rebounding");
        control.classList.remove("is-blue-sweeping");
      };
      const runExitSweep = () => {
        cancelExitSweep();
        control.classList.add("is-white-rebounding");
        resetTimer = setTimeout(() => {
          control.classList.remove("is-white-rebounding");
          control.classList.add("is-blue-sweeping");
          resetTimer = setTimeout(() => control.classList.remove("is-blue-sweeping"), 580);
        }, 580);
      };
      control.addEventListener("pointerenter", cancelExitSweep);
      control.addEventListener("pointerleave", runExitSweep);
      cleanups.push(() => {
        clearTimeout(resetTimer);
        control.removeEventListener("pointerenter", cancelExitSweep);
        control.removeEventListener("pointerleave", runExitSweep);
      });
    });
  }
  const newsListing = document.querySelector("[data-news-grid]");
  if (finePointer && !reducedMotion && newsListing) {
    const onNewsPointerMove = (event) => {
      const row = event.target.closest(".news-list-row");
      if (!row || !newsListing.contains(row)) return;
      const bounds = row.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width;
      const py = (event.clientY - bounds.top) / bounds.height;
      row.style.setProperty("--surface-x", `${px * 100}%`);
      row.style.setProperty("--surface-y", `${py * 100}%`);
    };
    const onNewsPointerLeave = () => {
      newsListing.querySelectorAll(".news-list-row").forEach((row) => {
        row.style.setProperty("--surface-x", "50%");
        row.style.setProperty("--surface-y", "50%");
      });
    };
    newsListing.addEventListener("pointermove", onNewsPointerMove);
    newsListing.addEventListener("pointerleave", onNewsPointerLeave);
    cleanups.push(() => {
      newsListing.removeEventListener("pointermove", onNewsPointerMove);
      newsListing.removeEventListener("pointerleave", onNewsPointerLeave);
    });
  }
  if (finePointer && !reducedMotion) {
    surfaces.forEach((surface) => {
      const move = (event) => {
        const bounds = surface.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width;
        const py = (event.clientY - bounds.top) / bounds.height;
        surface.style.setProperty("--surface-x", `${px * 100}%`);
        surface.style.setProperty("--surface-y", `${py * 100}%`);
        surface.style.setProperty("--surface-rx", `${(0.5 - py) * 2.4}deg`);
        surface.style.setProperty("--surface-ry", `${(px - 0.5) * 3.2}deg`);
      };
      const leave = () => {
        surface.style.setProperty("--surface-rx", "0deg");
        surface.style.setProperty("--surface-ry", "0deg");
      };
      surface.addEventListener("pointermove", move);
      surface.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        surface.removeEventListener("pointermove", move);
        surface.removeEventListener("pointerleave", leave);
      });
    });

    responsiveControls.forEach((control) => {
      const move = (event) => {
        const bounds = control.getBoundingClientRect();
        control.style.setProperty("--control-x", `${event.clientX - bounds.left}px`);
        control.style.setProperty("--control-y", `${event.clientY - bounds.top}px`);
      };
      const down = (event) => {
        move(event);
        control.classList.add("is-pressing");
      };
      const up = () => control.classList.remove("is-pressing");
      control.addEventListener("pointermove", move);
      control.addEventListener("pointerdown", down);
      control.addEventListener("pointerup", up);
      control.addEventListener("pointercancel", up);
      control.addEventListener("pointerleave", up);
      cleanups.push(() => {
        control.removeEventListener("pointermove", move);
        control.removeEventListener("pointerdown", down);
        control.removeEventListener("pointerup", up);
        control.removeEventListener("pointercancel", up);
        control.removeEventListener("pointerleave", up);
      });
    });
  }

  const showToast = (message, tone = "success") => {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.dataset.tone = tone;
    toast.classList.add("visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
  };

  const closeMediaDialog = () => {
    const video = dialog.querySelector("video");
    video?.pause();
    dialog.querySelector(".media-dialog-poster").replaceChildren();
    dialog.classList.remove("has-video");
    dialog.hidden = true;
    document.body.classList.remove("dialog-open");
  };

  feedback.querySelectorAll("[data-dialog-close]").forEach((buttonItem) => {
    buttonItem.onclick = () => {
      closeMediaDialog();
    };
  });

  const closeOnEscape = (event) => {
    if (event.key === "Escape" && !dialog.hidden) {
      closeMediaDialog();
    }
  };
  document.addEventListener("keydown", closeOnEscape);
  cleanups.push(() => document.removeEventListener("keydown", closeOnEscape));

  document.querySelector("[data-language]")?.addEventListener("click", (event) => {
    event.preventDefault();
    const next = document.documentElement.lang === "en" ? "zh-CN" : "en";
    try { localStorage.setItem("oculotronics-locale", next); } catch {}
    window.dispatchEvent(new CustomEvent("oculotronics:language-change", { detail: next }));
  });

  document.querySelectorAll("[data-video-title]").forEach((buttonItem) => {
    const openMediaDialog = () => {
      const media = buttonItem.closest(".video-cover, .video-large");
      const poster = buttonItem.dataset.videoPoster || media?.querySelector("img")?.src;
      const videoSrc = buttonItem.dataset.videoSrc;
      const posterElement = dialog.querySelector(".media-dialog-poster");
      dialog.querySelector("h2").textContent = buttonItem.dataset.videoTitle;
      posterElement.replaceChildren();
      posterElement.style.backgroundImage = poster ? `url('${poster}')` : "none";
      dialog.classList.toggle("has-video", Boolean(videoSrc));
      if (videoSrc) {
        const video = document.createElement("video");
        video.src = videoSrc;
        video.controls = true;
        video.playsInline = true;
        video.preload = "metadata";
        if (poster) video.poster = poster;
        video.setAttribute("aria-label", buttonItem.dataset.videoTitle);
        video.setAttribute("data-pot-player", "");
        video.textContent = localeText("您的浏览器不支持视频播放。", "Your browser does not support video playback.");
        posterElement.append(video);
      }
      dialog.hidden = false;
      document.body.classList.add("dialog-open");
      dialog.querySelector(".media-dialog-close").focus();
    };
    buttonItem.addEventListener("click", openMediaDialog);
    buttonItem.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openMediaDialog();
    });
  });

  const newsGrid = document.querySelector("[data-news-grid]");
  let newsCards = [...document.querySelectorAll("[data-news-card]")];
  const newsFilterControl = document.querySelector("[data-news-filter-control]");
  const newsYearTrigger = document.querySelector("[data-news-year-trigger]");
  const newsYearMenu = document.querySelector("[data-news-year-menu]");
  const newsYearLabel = document.querySelector("[data-news-year-label]");
  let newsYearOptions = [...document.querySelectorAll("[data-news-year-option]")];
  const newsSearch = document.querySelector("[data-news-search]");
  const pageList = document.querySelector("[data-news-pages]");
  let pageButtons = [...document.querySelectorAll(".pagination [data-page]")];
  if (newsGrid) {
    let yearFilter = "all";
    let search = "";
    let page = 1;
    const pageStatus = document.querySelector("[data-news-page-status]");
    const emptyState = document.querySelector("[data-news-empty]");
    const getPaginationItems = (pageCount, currentPage) => {
      if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
      const candidates = new Set([1, pageCount, currentPage - 1, currentPage, currentPage + 1]);
      const pages = [...candidates].filter((pageNumber) => pageNumber > 0 && pageNumber <= pageCount).sort((left, right) => left - right);
      return pages.reduce((items, pageNumber, index) => {
        if (index > 0 && pageNumber - pages[index - 1] > 1) items.push("ellipsis");
        items.push(pageNumber);
        return items;
      }, []);
    };
    const rebuildPageButtons = (pageCount, currentPage) => {
      if (!pageList) return;
      const fragment = document.createDocumentFragment();
      getPaginationItems(pageCount, currentPage).forEach((item) => {
        if (item === "ellipsis") {
          const ellipsis = document.createElement("span");
          ellipsis.className = "pagination-ellipsis";
          ellipsis.setAttribute("aria-hidden", "true");
          ellipsis.textContent = "…";
          fragment.append(ellipsis);
          return;
        }
        const pageNumber = item;
        const buttonItem = document.createElement("button");
        buttonItem.className = "page-number";
        buttonItem.type = "button";
        buttonItem.dataset.page = String(pageNumber);
        buttonItem.setAttribute("aria-label", localeText(`第${pageNumber}页`, `Page ${pageNumber}`));
        buttonItem.textContent = String(pageNumber);
        fragment.append(buttonItem);
      });
      pageList.replaceChildren(fragment);
      pageButtons = [...pageList.querySelectorAll("[data-page]")];
    };
    const renderNews = ({ animate = false } = {}) => {
      newsCards = [...newsGrid.querySelectorAll("[data-news-card]")];
      const filtered = yearFilter === "all"
        ? newsCards
        : newsCards.filter((card) => card.dataset.newsYear === yearFilter);
      const searched = search
        ? filtered.filter((card) => (card.dataset.newsTitle || card.textContent).toLowerCase().includes(search))
        : filtered;
      const pageCount = Math.max(1, Math.ceil(searched.length / NEWS_PAGE_SIZE));
      page = Math.max(1, Math.min(page, pageCount));
      rebuildPageButtons(pageCount, page);
      newsCards.forEach((card) => { card.hidden = true; });
      const visible = searched.slice((page - 1) * NEWS_PAGE_SIZE, page * NEWS_PAGE_SIZE);
      visible.forEach((card) => { card.hidden = false; });
      if (animate) {
        newsGrid.classList.remove("is-page-changing");
        void newsGrid.offsetWidth;
        newsGrid.classList.add("is-page-changing");
        window.setTimeout(() => newsGrid.classList.remove("is-page-changing"), 420);
      }
      if (emptyState) emptyState.hidden = searched.length > 0;
      pageButtons.forEach((buttonItem) => {
        const pageNumber = Number(buttonItem.dataset.page);
        const current = pageNumber === page;
        buttonItem.classList.toggle("active", current);
        if (current) buttonItem.setAttribute("aria-current", "page");
        else buttonItem.removeAttribute("aria-current");
      });
      const previous = document.querySelector("[data-page-prev]");
      const next = document.querySelector("[data-page-next]");
      previous.disabled = page === 1;
      next.disabled = page === pageCount;
      if (pageStatus) pageStatus.textContent = localeText(`第 ${page} 页，共 ${pageCount} 页`, `Page ${page} of ${pageCount}`);
    };
    const scrollToNewsListing = () => {
      document.querySelector("[data-news-all]")?.scrollIntoView({
        block: "start",
        behavior: reducedMotion ? "auto" : "smooth"
      });
    };
    const closeNewsFilterMenu = (restoreFocus = false) => {
      if (!newsYearMenu || newsYearMenu.hidden) return;
      newsYearMenu.hidden = true;
      newsFilterControl?.classList.remove("is-open");
      newsYearTrigger?.setAttribute("aria-expanded", "false");
      if (restoreFocus) newsYearTrigger?.focus();
    };
    const openNewsFilterMenu = (focusValue = yearFilter) => {
      if (!newsYearMenu) return;
      newsYearMenu.hidden = false;
      newsFilterControl?.classList.add("is-open");
      newsYearTrigger?.setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => {
        newsYearOptions.find((option) => option.dataset.newsYearOption === focusValue)?.focus();
      });
    };
    const selectNewsYear = (nextYear) => {
      const selectedOption = newsYearOptions.find((option) => option.dataset.newsYearOption === nextYear);
      if (!selectedOption) return;
      yearFilter = nextYear;
      page = 1;
      if (newsYearLabel) newsYearLabel.textContent = nextYear === "all"
        ? localeText("全部年份", "All Years")
        : nextYear;
      newsYearOptions.forEach((option) => {
        option.setAttribute("aria-checked", String(option === selectedOption));
      });
      renderNews();
    };
    const rebuildNewsYearOptions = () => {
      newsCards = [...newsGrid.querySelectorAll("[data-news-card]")];
      const years = newsYearsFromDates(newsCards.map((card) => card.dataset.newsYear));
      if (yearFilter !== "all" && !years.includes(yearFilter)) yearFilter = "all";
      if (newsYearMenu) newsYearMenu.innerHTML = newsYearFilterOptions(years);
      newsYearOptions = [...document.querySelectorAll("[data-news-year-option]")];
      if (newsYearLabel) newsYearLabel.textContent = yearFilter === "all"
        ? localeText("全部年份", "All Years")
        : yearFilter;
    };
    newsYearTrigger?.addEventListener("click", () => {
      if (newsYearMenu?.hidden) openNewsFilterMenu();
      else closeNewsFilterMenu();
    });
    newsYearTrigger?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        openNewsFilterMenu(event.key === "ArrowDown" ? "all" : newsYearOptions.at(-1)?.dataset.newsYearOption);
      }
    });
    newsYearMenu?.addEventListener("keydown", (event) => {
      const currentIndex = newsYearOptions.indexOf(document.activeElement);
      if (event.key === "Escape") {
        event.preventDefault();
        closeNewsFilterMenu(true);
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const offset = event.key === "ArrowDown" ? 1 : -1;
        newsYearOptions[(currentIndex + offset + newsYearOptions.length) % newsYearOptions.length]?.focus();
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        newsYearOptions[event.key === "Home" ? 0 : newsYearOptions.length - 1]?.focus();
      }
    });
    newsYearMenu?.addEventListener("click", (event) => {
      const option = event.target.closest("[data-news-year-option]");
      if (!option || !newsYearMenu.contains(option)) return;
      selectNewsYear(option.dataset.newsYearOption);
      closeNewsFilterMenu(true);
    });
    const closeNewsFilterOnOutsideClick = (event) => {
      if (!newsFilterControl?.contains(event.target)) closeNewsFilterMenu();
    };
    document.addEventListener("pointerdown", closeNewsFilterOnOutsideClick);
    cleanups.push(() => document.removeEventListener("pointerdown", closeNewsFilterOnOutsideClick));
    newsSearch?.addEventListener("input", () => {
      search = newsSearch.value.trim().toLowerCase();
      page = 1;
      renderNews();
    });
    pageList?.addEventListener("click", (event) => {
      const buttonItem = event.target.closest("[data-page]");
      if (!buttonItem || !pageList.contains(buttonItem)) return;
      if (buttonItem.disabled) return;
      page = Number(buttonItem.dataset.page);
      renderNews({ animate: true });
      scrollToNewsListing();
    });
    document.querySelector("[data-page-prev]")?.addEventListener("click", () => {
      page -= 1;
      renderNews({ animate: true });
      scrollToNewsListing();
    });
    document.querySelector("[data-page-next]")?.addEventListener("click", () => {
      page += 1;
      renderNews({ animate: true });
      scrollToNewsListing();
    });
    renderNews();

    const createNewsCard = (item) => {
      const card = document.createElement("a");
      card.className = "news-list-row reveal interaction-surface";
      card.dataset.newsCard = "";
      card.dataset.newsYear = newsYearFromDate(item.date);
      card.dataset.newsTitle = localizedNewsText(item, "title");
      card.href = item.link || "#/news";

      const dateParts = String(item.date || "").split(".");
      const date = document.createElement("time");
      date.className = "news-list-date";
      date.dateTime = dateParts.length === 3 ? dateParts.join("-") : String(item.date || "");
      const day = document.createElement("strong");
      day.textContent = dateParts.length === 3
        ? `${dateParts[1]}-${dateParts[2]}`
        : newsYearFromDate(item.date) || item.date || "";
      const year = document.createElement("span");
      year.textContent = dateParts.length === 3 ? dateParts[0] : "";
      date.append(day, year);

      const divider = document.createElement("span");
      divider.className = "news-list-divider";
      divider.setAttribute("aria-hidden", "true");
      const copy = document.createElement("span");
      copy.className = "news-list-copy";
      const title = document.createElement("h3");
      title.textContent = localizedNewsText(item, "title");
      copy.append(title);
      const arrow = document.createElement("span");
      arrow.className = "news-list-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "→";
      card.append(date, divider, copy, arrow);
      return card;
    };

    const updateFeaturedNews = (items) => {
      const stage = document.querySelector("[data-news-feature-stage]");
      if (!stage) return;
      const featured = getFeaturedNews(items);
      const slides = [...stage.querySelectorAll("[data-carousel-slide]")];
      const dots = [...stage.querySelectorAll("[data-carousel-dot]")];
      slides.forEach((slide, index) => {
        const item = featured[index];
        if (!item) return;
        const time = slide.querySelector("time");
        const summary = slide.querySelector(".featured-copy p");
        const heading = slide.querySelector(".featured-copy h2");
        const image = slide.querySelector("img");
        const link = slide.querySelector(".button");
        if (time) time.textContent = item.date || "";
        if (summary) summary.textContent = localizedNewsText(item, item.summary ? "summary" : "title");
        if (heading) heading.textContent = localizedNewsText(item, "title");
        if (image && item.imageUrl) {
          image.src = item.imageUrl;
          image.alt = localizedNewsText(item, "title");
        }
        if (link) link.href = item.link || "#/news";
      });
      const currentCopy = stage.querySelector("[data-news-copy-layer]");
      const first = featured[0];
      if (currentCopy && first) {
        currentCopy.querySelector("time").textContent = first.date || "";
        currentCopy.querySelector("p").textContent = localizedNewsText(first, first.summary ? "summary" : "title");
      }
      dots.forEach((dot, index) => {
        if (featured[index]) dot.setAttribute("aria-label", localizedNewsText(featured[index], "title"));
      });
    };

    const loadNews = async () => {
      try {
        const payload = await loadNewsData();
        if (!newsPayloadHasItems(payload) || !newsGrid.isConnected) return;
        updateFeaturedNews(payload.news);
        newsGrid.replaceChildren(...payload.news.map(createNewsCard));
        document.querySelector("[data-news-latest]")?.removeAttribute("hidden");
        document.querySelector("[data-news-all]")?.removeAttribute("hidden");
        page = 1;
        rebuildNewsYearOptions();
        renderNews();
        window.dispatchEvent(new CustomEvent("oculotronics:content-ready", {
          detail: { page: "news" }
        }));
      } catch {}
    };
    loadNews();
  }

  const homeNewsList = document.querySelector("[data-home-news-list]");
  if (homeNewsList) {
    const loadHomeNews = async () => {
      try {
        const payload = await loadNewsData();
        if (!newsPayloadHasItems(payload) || !homeNewsList.isConnected) return;
        const cards = getFeaturedNews(payload.news).map((item) => {
          const link = document.createElement("a");
          link.className = "reveal";
          link.href = item.link || "#/news";
          const dateParts = String(item.date || "").split(".");
          const title = localizedNewsText(item, "title");
          link.innerHTML = `<time><b>${dateParts.length >= 3 ? `${dateParts[1]}-${dateParts[2]}` : item.date || ""}</b><span>${dateParts[0] || ""}</span></time><h3></h3><img alt="">`;
          link.querySelector("h3").textContent = title;
          const image = link.querySelector("img");
          image.src = item.homeImageUrl || item.imageUrl || "";
          image.alt = title;
          return link;
        });
        homeNewsList.replaceChildren(...cards);
      } catch {}
    };
    loadHomeNews();
  }

  const consumableFilters = [...document.querySelectorAll("[data-consumable-filter]")];
  const consumableItems = [...document.querySelectorAll("[data-consumable-item]")];
  const consumableEmpty = document.querySelector("[data-consumable-empty]");
  consumableFilters.forEach((buttonItem) => buttonItem.addEventListener("click", () => {
    const filter = buttonItem.dataset.consumableFilter;
    document.querySelector(".consumable-list")?.setAttribute("data-active-consumable-category", filter);
    consumableFilters.forEach((item) => {
      const active = item === buttonItem;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let visibleCount = 0;
    consumableItems.forEach((item) => {
      const visible = item.dataset.consumableCategory === filter;
      item.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (consumableEmpty) consumableEmpty.hidden = visibleCount > 0;
  }));

  const carousels = [...document.querySelectorAll("[data-carousel]")];
  carousels.forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
    const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
    const usesNewsImageTransition = carousel.matches("[data-news-feature-stage]");
    const usesProductImageTransition = carousel.matches("[data-product-carousel]");
    let current = 0;
    let timer = 0;
    let imageTransitionTimer = 0;
    let imageTransitionLayer = null;
    let productExitTimer = 0;
    let newsCopyTransitionTimer = 0;
    let paused = false;

    const clearImageTransition = () => {
      clearTimeout(imageTransitionTimer);
      imageTransitionLayer?.remove();
      imageTransitionLayer = null;
    };

    const transitionProductSlide = (fromSlide) => {
      clearTimeout(productExitTimer);
      slides.forEach((slide) => slide.classList.remove("is-product-exiting"));
      if (!fromSlide || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      fromSlide.classList.add("is-product-exiting");
      const clearExit = () => fromSlide.classList.remove("is-product-exiting");
      const outgoingVisual = fromSlide.querySelector(".slide-visual");
      outgoingVisual?.addEventListener("animationend", clearExit, { once: true });
      productExitTimer = window.setTimeout(clearExit, 520);
    };

    const transitionCarouselImage = (fromSlide, toSlide) => {
      if (!usesNewsImageTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const fromImage = fromSlide?.querySelector("img");
      const toImage = toSlide?.querySelector("img");
      if (!fromImage || !toImage) return;

      const stageRect = carousel.getBoundingClientRect();
      const imageRect = fromImage.getBoundingClientRect();
      if (!imageRect.width || !imageRect.height) return;

      clearImageTransition();
      imageTransitionLayer = document.createElement("div");
      imageTransitionLayer.className = "news-image-transition";
      imageTransitionLayer.style.setProperty("--news-image-x", `${imageRect.left - stageRect.left}px`);
      imageTransitionLayer.style.setProperty("--news-image-y", `${imageRect.top - stageRect.top}px`);
      imageTransitionLayer.style.setProperty("--news-image-width", `${imageRect.width}px`);
      imageTransitionLayer.style.setProperty("--news-image-height", `${imageRect.height}px`);

      const outgoing = fromImage.cloneNode();
      const incoming = toImage.cloneNode();
      outgoing.className = "news-image-transition-image is-outgoing";
      incoming.className = "news-image-transition-image is-incoming";
      outgoing.alt = "";
      incoming.alt = "";
      outgoing.setAttribute("aria-hidden", "true");
      incoming.setAttribute("aria-hidden", "true");
      imageTransitionLayer.append(outgoing, incoming);
      carousel.append(imageTransitionLayer);

      const layer = imageTransitionLayer;
      incoming.addEventListener("animationend", () => {
        if (imageTransitionLayer === layer) clearImageTransition();
      }, { once: true });
      requestAnimationFrame(() => layer.classList.add("is-playing"));
      imageTransitionTimer = window.setTimeout(clearImageTransition, 600);
    };

    const transitionNewsCopy = (toSlide) => {
      if (!usesNewsImageTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const copyTransition = carousel.querySelector(".news-copy-transition");
      const currentLayer = copyTransition?.querySelector(".news-copy-transition-layer.is-current");
      const nextTime = toSlide?.querySelector(".featured-copy time")?.textContent;
      const nextSummary = toSlide?.querySelector(".featured-copy p")?.textContent;
      if (!copyTransition || !currentLayer || !nextTime || !nextSummary) return;

      clearTimeout(newsCopyTransitionTimer);
      copyTransition.querySelectorAll(".news-copy-transition-layer:not(.is-current)").forEach((layer) => layer.remove());
      const incomingLayer = currentLayer.cloneNode(true);
      incomingLayer.className = "news-copy-transition-layer is-incoming";
      incomingLayer.querySelector("time").textContent = nextTime;
      incomingLayer.querySelector("p").textContent = nextSummary;
      copyTransition.append(incomingLayer);
      requestAnimationFrame(() => copyTransition.classList.add("is-transitioning"));
      newsCopyTransitionTimer = window.setTimeout(() => {
        currentLayer.remove();
        incomingLayer.className = "news-copy-transition-layer is-current";
        copyTransition.classList.remove("is-transitioning");
      }, 650);
    };

    const showSlide = (next) => {
      const previous = current;
      current = (next + slides.length) % slides.length;
      if (previous !== current) {
        if (usesProductImageTransition) transitionProductSlide(slides[previous]);
        else transitionCarouselImage(slides[previous], slides[current]);
        transitionNewsCopy(slides[current]);
      }
      slides.forEach((slide, index) => {
        const active = index === current;
        slide.classList.toggle("active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach((dot, index) => {
        const active = index === current;
        dot.classList.toggle("active", active);
        dot.setAttribute("aria-selected", String(active));
      });
    };

    const start = () => {
      clearInterval(timer);
      if (!paused && !document.hidden) timer = setInterval(() => showSlide(current + 1), 5000);
    };

    dots.forEach((dot, index) => dot.addEventListener("click", () => {
      showSlide(index);
      start();
    }));

    carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => {
      showSlide(current - 1);
      start();
    });

    carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => {
      showSlide(current + 1);
      start();
    });

    const pauseCarousel = () => {
      paused = true;
      clearInterval(timer);
      carousel.dataset.paused = "true";
    };
    const resumeCarousel = () => {
      paused = false;
      delete carousel.dataset.paused;
      start();
    };
    const onCarouselFocusOut = (event) => {
      if (!carousel.contains(event.relatedTarget)) resumeCarousel();
    };
    const onVisibilityChange = () => document.hidden ? clearInterval(timer) : start();
    carousel.addEventListener("mouseenter", pauseCarousel);
    carousel.addEventListener("mouseleave", resumeCarousel);
    carousel.addEventListener("focusin", pauseCarousel);
    carousel.addEventListener("focusout", onCarouselFocusOut);
    document.addEventListener("visibilitychange", onVisibilityChange);
    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") showSlide(current - 1);
      if (event.key === "ArrowRight") showSlide(current + 1);
      if (event.key === "Home") showSlide(0);
      if (event.key === "End") showSlide(slides.length - 1);
    });

    showSlide(0);
    start();
    cleanups.push(() => {
      clearInterval(timer);
      clearImageTransition();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    });
  });

  const productLine = document.querySelector("[data-product-line]");
  if (productLine) {
    const cards = [...productLine.querySelectorAll("[data-line-card]")];
    const previous = productLine.querySelector("[data-line-prev]");
    const next = productLine.querySelector("[data-line-next]");
    let offset = 0;

    const activate = (card) => {
      cards.forEach((item) => item.classList.toggle("active", item === card));
    };

    const updateLine = () => {
      cards.forEach((card, index) => {
        card.style.order = String((index - offset + cards.length) % cards.length);
      });
      productLine.dataset.lineOffset = String(offset);
      activate(null);
    };

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => activate(card));
      card.addEventListener("focus", () => activate(card));
      card.addEventListener("mouseleave", () => activate(null));
      card.addEventListener("blur", () => activate(null));
    });
    previous.addEventListener("click", () => {
      offset = (offset - 1 + cards.length) % cards.length;
      updateLine();
    });
    next.addEventListener("click", () => {
      offset = (offset + 1) % cards.length;
      updateLine();
    });
    updateLine();
  }

  const oisTabButtons = [...document.querySelectorAll("[data-ois-tab]")];
  const oisPanels = [...document.querySelectorAll("[data-ois-panel]")];
  oisTabButtons.forEach((buttonItem) => {
    buttonItem.addEventListener("click", () => {
      const key = buttonItem.dataset.oisTab;
      oisTabButtons.forEach((tab) => {
        const active = tab === buttonItem;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      oisPanels.forEach((panel) => {
        const active = panel.dataset.oisPanel === key;
        panel.classList.toggle("active", active);
      });
      document.querySelector("[data-ois-workflow]")?.setAttribute("data-ois-workflow", key);
    });
  });

  const honorTabs = [...document.querySelectorAll("[data-honor-tab]")];
  const honorGrid = document.querySelector("[data-honor-grid]");
  if (honorTabs.length && honorGrid) {
    const honorSection = honorGrid.closest(".honor");
    let honorOffset = 0;
    let activeHonorCategory = honorTabs.find((tab) => tab.classList.contains("active"))?.dataset.honorTab || "patent";
    let honorCards = [...honorGrid.querySelectorAll("[data-honor-card]")];
    let latestHonors = [];
    const preloadedHonorImages = new Map();
    const preloadHonorImages = (honors) => {
      honors.forEach((honor) => {
        if (!honor?.imageUrl || preloadedHonorImages.has(honor.imageUrl)) return;
        const image = new Image();
        image.decoding = "async";
        image.loading = "eager";
        image.src = honor.imageUrl;
        preloadedHonorImages.set(honor.imageUrl, image);
      });
    };
    const updateHonors = () => {
      if (!honorCards.length) return;
      const positions = honorCards.length === 1
        ? ["center"]
        : honorCards.length === 2
          ? ["center", "right"]
          : ["center", "right", "left"];
      honorCards.forEach((card, index) => {
        const position = (index - honorOffset + honorCards.length) % honorCards.length;
        card.dataset.honorPosition = positions[position] || "offscreen";
      });
    };
    const renderHonors = (honors) => {
      latestHonors = honors;
      preloadHonorImages(honors);
      const selected = honors.filter((honor) => honor.category === activeHonorCategory);
      honorSection.hidden = honors.length === 0;
      honorGrid.dataset.honorCategory = activeHonorCategory;
      honorGrid.replaceChildren(...selected.map((honor, index) => {
        const card = document.createElement("figure");
        const image = document.createElement("img");
        card.className = "honor-card reveal";
        card.dataset.honorCard = "";
        card.dataset.honorIndex = String(index);
        image.src = honor.imageUrl;
        image.alt = honor.title;
        image.loading = "eager";
        image.decoding = "async";
        if (index < 3) image.fetchPriority = "high";
        card.append(image);
        return card;
      }));
      honorCards = [...honorGrid.querySelectorAll("[data-honor-card]")];
      honorOffset = 0;
      updateHonors();
    };
    const loadHonors = async () => {
      try {
        const response = await fetch("/api/honors", { cache: "no-store" });
        if (!response.ok) throw new Error("Honor content request failed");
        const payload = await response.json();
        renderHonors(Array.isArray(payload.honors) ? payload.honors : []);
      } catch {
        renderHonors([]);
      }
    };
    honorTabs.forEach((buttonItem) => buttonItem.addEventListener("click", () => {
      honorTabs.forEach((tab) => {
        const active = tab === buttonItem;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      activeHonorCategory = buttonItem.dataset.honorTab || "patent";
      honorOffset = 0;
      if (latestHonors.length) renderHonors(latestHonors);
      else updateHonors();
      loadHonors();
    }));
    document.querySelector("[data-honor-prev]")?.addEventListener("click", () => {
      honorOffset = (honorOffset - 1 + honorCards.length) % honorCards.length;
      updateHonors();
    });
    document.querySelector("[data-honor-next]")?.addEventListener("click", () => {
      honorOffset = (honorOffset + 1) % honorCards.length;
      updateHonors();
    });
    updateHonors();
    loadHonors();
    const honorRefresh = setInterval(loadHonors, 30_000);
    cleanups.push(() => {
      clearInterval(honorRefresh);
      preloadedHonorImages.clear();
    });
  }

  const timeline = document.querySelector("[data-timeline]");
  const timelineTrack = timeline?.querySelector("[data-timeline-track]");
  const timelineCards = timelineTrack ? [...timelineTrack.children] : [];
  if (timeline && timelineTrack && timelineCards.length) {
    let timelineOffset = 0;
    // Desktop cards contain detailed milestone descriptions. Show three at a
    // time so each has sufficient room without colliding with its neighbour.
    const visibleCards = () => matchMedia("(max-width: 980px)").matches ? timelineCards.length : 3;
    const updateTimeline = () => {
      const cardWidth = timeline.querySelector(".timeline-stage")?.clientWidth / visibleCards() || 0;
      timelineTrack.style.transform = `translate3d(${-timelineOffset * cardWidth}px, 0, 0)`;
      timeline.dataset.timelineOffset = String(timelineOffset);
    };
    const moveTimeline = (direction) => {
      const maxOffset = Math.max(0, timelineCards.length - visibleCards());
      timelineOffset = direction > 0
        ? (timelineOffset >= maxOffset ? 0 : timelineOffset + 1)
        : (timelineOffset <= 0 ? maxOffset : timelineOffset - 1);
      updateTimeline();
    };
    const previous = () => moveTimeline(-1);
    const next = () => moveTimeline(1);
    const onTimelineKeydown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };
    const onTimelineResize = () => {
      timelineOffset = Math.min(timelineOffset, Math.max(0, timelineCards.length - visibleCards()));
      updateTimeline();
    };
    timeline.querySelector("[data-timeline-prev]")?.addEventListener("click", previous);
    timeline.querySelector("[data-timeline-next]")?.addEventListener("click", next);
    timeline.addEventListener("keydown", onTimelineKeydown);
    addEventListener("resize", onTimelineResize);
    cleanups.push(() => {
      timeline.querySelector("[data-timeline-prev]")?.removeEventListener("click", previous);
      timeline.querySelector("[data-timeline-next]")?.removeEventListener("click", next);
      timeline.removeEventListener("keydown", onTimelineKeydown);
      removeEventListener("resize", onTimelineResize);
    });
    updateTimeline();
  }

  const productPages = ["research", "ois", "v3", "v4", "consumables"];
  if (productPages.includes(document.body.dataset.page) && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const productHero = document.querySelector(".product-hero, .v4-full, .consumables-hero");
    productHero?.addEventListener("pointermove", (event) => {
      const bounds = productHero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
      productHero.style.setProperty("--motion-x", `${x}px`);
      productHero.style.setProperty("--motion-y", `${y}px`);
    });

    productHero?.addEventListener("pointerleave", () => {
      productHero.style.setProperty("--motion-x", "0px");
      productHero.style.setProperty("--motion-y", "0px");
    });

    document.querySelectorAll("[data-motion]").forEach((media) => {
      media.addEventListener("pointermove", (event) => {
        const bounds = media.getBoundingClientRect();
        const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4;
        const rotateX = -((event.clientY - bounds.top) / bounds.height - 0.5) * 4;
        media.style.setProperty("--tilt-x", `${rotateX}deg`);
        media.style.setProperty("--tilt-y", `${rotateY}deg`);
      });
      media.addEventListener("pointerleave", () => {
        media.style.setProperty("--tilt-x", "0deg");
        media.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  const splitTextElements = [...document.querySelectorAll("[data-split-text]")];
  const splitTextObserver = !matchMedia("(prefers-reduced-motion: reduce)").matches
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-split-visible");
          splitTextObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
    : null;

  splitTextElements.forEach((element) => {
    const content = element.textContent || "";
    if (!content) return;

    element.setAttribute("aria-label", content);
    const characters = document.createDocumentFragment();
    Array.from(content).forEach((character, index) => {
      const characterElement = document.createElement("span");
      characterElement.className = "split-text-character";
      characterElement.setAttribute("aria-hidden", "true");
      characterElement.style.setProperty("--split-index", index);
      // Inline-block characters collapse a normal space; use a non-breaking
      // space so English words retain their original spacing after splitting.
      characterElement.textContent = character === " " ? "\u00a0" : character;
      characters.append(characterElement);
    });
    element.replaceChildren(characters);
    splitTextObserver?.observe(element);
  });

  const staggerGroups = document.querySelectorAll(".timeline, .news-list, .news-grid, .support-grid, .honor-grid, .animal-grid, .security-grid, .icon-features");
  staggerGroups.forEach((group) => {
    [...group.children].forEach((item, index) => item.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`));
  });
  document.querySelectorAll(".section-heading").forEach((heading) => heading.classList.add("section-reveal"));
  document.querySelectorAll(".reveal, .motion-reveal, .feature-row, .section-reveal").forEach((item) => observer.observe(item));
  return () => {
    clearTimeout(toastTimer);
    cleanups.forEach((cleanup) => cleanup());
    observer.disconnect();
    splitTextObserver?.disconnect();
    document.body.classList.remove("menu-open");
    toggle?.setAttribute("aria-expanded", "false");
  };
}
