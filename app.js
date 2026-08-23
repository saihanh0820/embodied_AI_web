const RAW = "assets/raw/";
const ABOUT_VIDEO_SRC = `${RAW}关于我们-视频介绍.mp4`;
const RESEARCH_VIDEO_SRC = `${RAW}显微注射控制系统-观看视频.mp4`;
const V3_VIDEO_SRC = `${RAW}WMOX-22001-视频介绍.mp4`;
import { localeText } from "./i18n.js";
const ASSET = {
  logo: "d309189ca12c767a097fe943330196efaff60e85.png",
  footerLogo: "Oculotronics@3x.png",
  qr: "weimou-qr.png",
  homeHero: "19bca2b1a2728d88250335701993ade03f7fce6a.png",
  homeProduct: "2a944ad6bab39e6b1b06395f605ebc148ce58b5c.png",
  homeCarouselInjection: "images/home/home-carousel-injection.png",
  homeCarouselOis: "images/home/home-carousel-ois.png",
  homeCarouselConsumables: "images/home/home-carousel-consumables.png",
  homeCarouselBackground: "images/home/home-carousel-background.png",
  aboutHero: "about-hero-20260805.png",
  aboutVideo: "about-video-cover.jpg",
  directionControls: "direction-controls@2x.png",
  historyDecor: "82e1a9859b95430bc481105a902fe41c2f681f6a.png",
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
  relatedSurgery: "v3-related@2x.png",
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
  surgeryScene: "images/products/v3/lab-clinical-scene-tinted.png",
  v3RelatedInjection: "images/products/v3/micro-ophthalmic-injection-system@2x.png",
  v3RelatedConsumables: "images/products/v3/surgical-consumables@2x.png",
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
  injector: "images/consumables/retinal-injector.png",
  consumablesContactRings: "images/consumables/contact-rings.png",
  consumablesRelatedInjection: "images/consumables/related-injection-system@2x.png",
  consumablesRelatedOis: "images/consumables/related-ois@2x.png",
  instrumentForceps: "images/consumables/micro-forceps.png",
  instrumentPackaging: "images/consumables/micro-forceps-packaging.png",
  surgicalConsumablesKit: "images/consumables/surgical-consumables-kit@2x.png",
  handheldMicroinjectionKit: "images/consumables/handheld-microinjection-kit@2x.png",
  mouseFixture: "images/consumables/mouse-fixture@2x.png",
  mousePlatform: "images/consumables/mouse-platform@2x.png",
  guineaPigPlatform: "images/consumables/guinea-pig-platform@2x.png",
  pipetteFillingPlug: "images/consumables/pipette-filling-plug@2x.png",
  irrigator: "images/consumables/irrigator@2x.png",
  pipelineSurgery: "21be462bccb73ee0ec6c6be95b01896863a78356.png",
  pipelineInjection: "images/home/pipeline-injection-system.png",
  pipelineOis: "images/products/ois/ois-product-monitor.png",
  pipelineConsumables: "images/consumables/surgical-consumables-hero.png",
};

const CONTACT = {
  company: "广州市微眸医疗器械有限公司",
  addressA: "广州市南沙区珠江街南江二路6号自编8栋(9#楼)8层803",
  addressB: "广州市越秀区先烈中路65号东山广场附楼10楼",
  sales: "19120679708（销售专线）",
  phone: "020-22886136",
  email: "666666@66.com"
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
  ["import", "录入信息", "快速录入患者信息及图像", "快速导入眼科不同类别的多模态检查图像，统一归档病例。", "oisWorkflowImport", "oisTabMediaIcon"],
  ["process", "图像处理", "一体化处理", "在同一工作台内完成浏览、标注、对比、随访记录等常用操作。", "oisWorkflowProcess", "oisTabEditIcon"],
  ["archive", "患者档案", "病例管理", "整合患者档案、检查数据和手术记录，建立连续可追踪的诊疗信息流。", "oisWorkflowArchive", "oisArchiveIcon"]
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
      <a class="brand" href="#/home" aria-label="微眸医疗首页"><img src="${img("logo")}" alt="Oculotronics 微眸"></a>
      <button class="menu-toggle" type="button" aria-label="打开导航" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span></button>
      <nav class="main-nav" id="main-nav" aria-label="主导航">
        <a data-route="home" href="#/home">首页</a>
        <a data-route="about" href="#/about">关于我们</a>
        <div class="nav-products">
          <a data-route="products" href="#/research" aria-haspopup="true">产品中心</a>
          <div class="product-menu" aria-label="产品中心菜单">
            <a href="#/research">药物精准递送系统</a>
            <div class="product-menu-branch">
              <a href="#/v3" aria-haspopup="true">显微手术控制系统</a>
              <div class="product-submenu" aria-label="显微手术控制系统产品">
                <a href="#/v3">WMOX-22001</a>
                <a href="#/v4">WMOX-24001</a>
              </div>
            </div>
            <a href="#/ois">OIS眼科图像处理系统</a>
            <a href="#/consumables">手术耗材</a>
          </div>
        </div>
        <a data-route="news" href="#/news">新闻中心</a>
        <a data-route="support" href="#/support">服务支持</a>
        <a class="lang" href="#/home" data-language aria-label="当前语言：简体中文">CN</a>
        <a class="nav-cta" data-route="contact" href="#/contact">联系我们</a>
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
        <img src="${img("footerLogo")}" alt="Oculotronics">
        <p>${CONTACT.company}</p>
        <p>电话：${CONTACT.sales}</p>
        <p class="footer-phone-continuation"><span class="footer-address-label" aria-hidden="true"></span><span class="footer-address-value">${CONTACT.phone}</span></p>
        <p><span class="footer-address-label">地址：</span><span class="footer-address-value">${CONTACT.addressA}</span></p>
        <p><span class="footer-address-label" aria-hidden="true"></span><span class="footer-address-value">${CONTACT.addressB}</span></p>
      </div>
      <div class="footer-links">
        <strong>网站导航</strong>
        <a href="#/home">首页</a><a href="#/news">新闻信息</a>
        <a href="#/about">关于我们</a><a href="#/support">服务支持</a>
        <a href="#/research">产品中心</a><a href="#/contact">联系我们</a>
      </div>
      <div class="footer-qr">
        <img src="${img("qr")}" alt="微眸机器人二维码">
        <span>微眸机器人</span>
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
        <h3>联系我们，获取更多产品讯息</h3>
        <p class="band-copy">获取更多产品咨询</p>
      </div>
      ${button("获取方案", "#/contact")}
    </section>`;
}

/* 功能：生成相关产品区块。
 * 参数：exclude 当前页面产品键名。
 * 返回值：相关产品 HTML 字符串。
 */
function relatedProducts(exclude = "") {
  const catalog = [
    ["research", "homeProduct", "药物精准递送系统", "多自由度运动 / 微米级精度 / 高稳定性操作"],
    ["ois", "productConsumables", "OIS眼科图像处理系统", "全面兼容 / 安全可信 / 多维标注"],
    ["consumables", "v3RelatedConsumables", "手术耗材", "移液针 / 注射器械"],
    ["v3", "relatedSurgery", "显微眼科手术控制系统", "V3.0 / V4.0"]
  ];
  const v3CatalogOverrides = {
    research: ["research", "v3RelatedInjection", "药物精准递送系统", "基础版 / 旗舰版"],
    consumables: ["consumables", "v3RelatedConsumables", "手术耗材", "移液针 / 注射套装"]
  };
  const consumablesCatalogOverrides = {
    research: ["research", "consumablesRelatedInjection", "药物精准递送系统", "基础版 / 旗舰版"],
    ois: ["ois", "consumablesRelatedOis", "OIS眼科图像处理软件", "全面兼容 / 安全可信 / 多维标注"]
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
    { title: "显微手术控制系统", copy: "微米级精度　微量匀速注射　高稳定性", href: "#/v3", image: "pipelineSurgery" },
    { title: "药物精准递送系统", copy: "视网膜下精准注射　疾病模型精准构建", href: "#/research", image: "pipelineInjection" },
    { title: "OIS眼科图像处理系统", copy: "全面兼容　安全可信　多维标注", href: "#/ois", image: "pipelineOis" },
    { title: "手术耗材", copy: "耐用　长寿命　功能齐全", href: "#/consumables", image: "pipelineConsumables" }
  ];

  return `
    ${pageHero({
      image: "homeHero",
      eyebrow: "OCULOTRONICS",
      title: "引领眼科智慧医疗<br>守护全球健康视界",
      copy: "打破界限，让“智慧医疗”的光照进眼底，<br class=\"home-hero-copy-break\">让眼底手术机器人真正成为医生更亮的眼，更稳 、更长的手",
      className: "home-hero"
    })}
    <section class="home-feature" data-product-carousel data-carousel aria-label="产品展示轮播" tabindex="0">
      <div class="slider-dots" role="tablist" aria-label="选择产品">
        <button class="active" type="button" role="tab" aria-selected="true" aria-label="药物精准递送系统" data-carousel-dot="0"></button>
        <button type="button" role="tab" aria-selected="false" aria-label="OIS眼科图像处理系统" data-carousel-dot="1"></button>
        <button type="button" role="tab" aria-selected="false" aria-label="手术耗材" data-carousel-dot="2"></button>
      </div>
      <div class="carousel-stage">
        <article class="feature-slide home-slide machine-slide active" data-carousel-slide>
          <div class="content feature-split">
            <div class="slide-visual slide-machine">
              <img src="${img("homeCarouselInjection")}" alt="药物精准递送系统">
            </div>
            <div class="slide-copy">
              <h2>药物精准递送系统</h2>
              <p>视网膜下精准注射 / 疾病模型精准构建</p>
              ${button("了解更多", "#/research", false, false)}
            </div>
          </div>
        </article>
        <article class="feature-slide home-slide ois-slide" data-carousel-slide>
          <div class="content feature-split">
            <div class="slide-visual slide-monitor">
              ${lazyImg("homeCarouselOis", "OIS眼科图像处理系统", "ois-product-asset")}
            </div>
            <div class="slide-copy">
              <h2>OIS眼科图像处理系统</h2>
              <p>全面兼容 / 安全可信 / 多维标注</p>
              ${button("了解更多", "#/ois", false, false)}
            </div>
          </div>
        </article>
        <article class="feature-slide home-slide consumables-slide" data-carousel-slide>
          <div class="content feature-split">
            <div class="slide-visual slide-consumables">
              ${lazyImg("homeCarouselConsumables", "手术耗材")}
            </div>
            <div class="slide-copy">
              <h2>手术耗材</h2>
              <p>微针系列 / 注吸器 / 一次性无菌耗材</p>
              ${button("了解更多", "#/consumables", false, false)}
            </div>
          </div>
        </article>
      </div>
    </section>
    <section class="product-line section-pad">
      <div class="content">
        ${sectionTitle("产品管线")}
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
          <h2>关于微眸</h2>
          <div class="about-stats">
            <div class="about-stat">
              <div class="about-stat__value">15<span>年</span></div>
              <p>技术积累</p>
            </div>
            <div class="about-stat">
              <div class="about-stat__value">125<span>项</span></div>
              <p>知识产权</p>
            </div>
          </div>
        </div>
        <p>我们聚焦于眼科赛道，专注于高精度显微眼科手术机器人及其相关创新技术，致力于推动显微外科手术的革新，把眼科手术智能自动化带给每个医生、每个患者，造福人类，助力未来医疗全面智慧化。</p>
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
    ["2011年", "眼科手术机器人项目组正式成立。根据眼科手术应用场景和用户需求，提出并开发树形机器人概念，设计适合在显微镜下使用的具有自适应 RCM 和多自由度的柔性机器人，并进行了运动学、动力学分析，末端定位精度可达微米级。"],
    ["2015年", "完成样机的软件搭建和设计验证，证实眼科手术机器人具有足够的定位精度及力学性能。通过手从操作手术系统框架，在眼内空间的约束下实现视网膜表面的复杂运动，适合用于高难度复杂眼底手术。"],
    ["2016年", "与中山大学中山眼科中心展开紧密合作，实施完成30多例动物试验，发表会议论文及顶级期刊论文10余篇。"],
    ["2020年", "微眸医疗正式成立，与中山大学中山眼科中心签署战略协议，搭建5G网络模拟手术室。"],
    ["2021年", "工业样机定型，指标达到预期设计状态；完成核心专利转化。"],
    ["2022年", "全球首创由手术机器人协助的活体兔眼静脉插管注射试验；全球首创由手术机器人协助的灵长类动物视网膜下注射试验。建立欧洲研发中心，第二代眼科手术机器人取得广州市产业工程检验报告。"],
    ["2023年", "第二代眼科手术机器人完成型检。全球首例5G远程微米级眼科手术。中山大学中山眼科中心作为首个临床中心启动。"],
    ["2024年", "多个临床中心陆续启动，药物精准递送系统（科研版）正式启动销售（小动物版／大动物版本），手术耗材正式启动销售。"],
    ["2025年", "全球首例远程手术机器人视网膜下注射手术。牵头制定全国眼科手术机器人首个团体标准。AI辅助下手术成果发表机器人顶级盛会 ICRA，并入选 Best Paper Finalist。"],
    ["2026年", "微眸琢锋机器人进入国家药监审批“绿色通道”。微眸医疗圆满完成全国首个眼科手术机器人多中心随机对照临床试验。微眸琢锋机器人技术入选“眼科学十大原创进展”权威榜单。"]
  ];

  const culture = [
    ["价值观", "求真 务实 奋进 开放"],
    ["愿景使命", "引领眼科智慧医疗，守护全球健康视界"],
    ["业务目标", "聚焦眼科智能自动化解决方案，全力打造从研发孵化、生产到医疗服务的全链条产业垂直生态体系"]
  ];

  return `
    ${pageHero({ image: "aboutHero", title: "引领眼科智慧医疗<br>守护全球健康视界", className: "sub-hero about-hero" })}
    <section class="about-intro section-pad">
      <div class="content narrow reveal">
        ${sectionTitle("关于我们")}
        <div class="intro-copy">
          <p>微眸医疗成立于2020年，核心团队来自于德国慕尼黑工业大学、瑞士苏黎世理工大学、中山大学及中山大学中山眼科中心，通过微米级高精度眼科手术机器人赛道的统筹布局，打造从研发、孵化、生产到医疗服务的全链条产业垂直生态体系，已获得60多项自主发明专利及实用新型专利，在国际知名期刊发表20余篇论文。微眸医疗通过与医院、高校及产业链上下游协同联动，探索“共创”模式，推动“研-医-教-产”四位一体的医疗产业创新融合发展。</p>
          <p>公司以临床手术和药物科研需求为出发点，建立了显微手术控制系统（高精度显微眼科手术机器人）、药物精准递送系统、OIS眼科图像处理系统以及手术耗材(如微针、微型注射器、微型剪、微型镊等)四大产品管线，满足临床、科研和教学的需求。</p>
        </div>
        <div class="metric-row">
          <strong>2020<sup>年</sup><small>成立时间</small></strong>
          <strong>15<sup>年</sup><small>技术积累</small></strong>
          <strong>125<sup>项</sup><small>知识产权</small></strong>
        </div>
        <div class="video-cover">
          <video playsinline preload="metadata" poster="${img("aboutVideo")}" ${ABOUT_VIDEO_SRC ? `src="${ABOUT_VIDEO_SRC}"` : ""} aria-label="微眸医疗企业介绍" data-about-video data-pot-player>
            您的浏览器不支持视频播放。
          </video>
        </div>
      </div>
    </section>
    <section class="history section-pad" style="--history-decor: url('${img("historyDecor")}')">
      <div class="content">
        ${sectionTitle("发展历程")}
        <div class="timeline" data-timeline tabindex="0" role="region" aria-label="发展历程时间轴">
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
        ${sectionTitle("企业文化")}
        <div class="culture-grid">
          ${lazyImg("office", "微眸医疗办公环境", "reveal")}
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
    <section class="honor section-pad">
      <div class="content">
        ${sectionTitle("企业荣誉")}
        <div class="honor-tabs" role="tablist" aria-label="企业荣誉分类">
          <button class="active" type="button" role="tab" aria-selected="true" data-honor-tab="patent">发明专利</button>
          <button type="button" role="tab" aria-selected="false" data-honor-tab="award">相关荣誉</button>
          <button type="button" role="tab" aria-selected="false" data-honor-tab="academic">学术成果</button>
        </div>
        <div class="honor-carousel" data-honor-carousel aria-live="polite">
          <button class="honor-arrow prev" type="button" aria-label="上一项荣誉" data-honor-prev style="--direction-sprite:url('${img("directionControls")}')"></button>
          <div class="honor-grid" data-honor-grid>
          ${[0, 1, 2].map((index) => `
            <figure class="honor-card reveal" data-honor-card data-honor-index="${index}">
              ${lazyImg("patentCertificate", `微眸医疗发明专利证书 ${index + 1}`)}
            </figure>
          `).join("")}
          </div>
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
    { title: "模拟机培训", image: "simulatorTraining", focusImage: "simulatorTrainingFocus" },
    { title: "动物实验培训", image: "animalLabTraining", focusImage: "animalLabTrainingFocus" },
    { title: "人手培训", image: "handsOnTraining", focusImage: "handsOnTrainingFocus" }
  ];

  return `
    ${pageHero({ image: "newsHero", title: "服务支持", className: "sub-hero support-hero" })}
    <section class="support-courses section-pad">
      <div class="content">
        ${sectionTitle("培训课程")}
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
    </section>
    <section class="support-contact-wrap section-pad">
      <div class="content">
        ${sectionTitle("联系我们")}
        <div class="support-form-card reveal">
          <div class="support-contact-card">
            <div>
              <span>销售热线</span>
              <strong>19120679708（销售专线）</strong>
            </div>
            <div>
              <span>售后热线</span>
              <strong>020-22886136</strong>
            </div>
          </div>
          <form class="support-form-grid" data-lead-form novalidate>
            <label class="required-field"><input required name="name" maxlength="100" autocomplete="name" aria-label="姓名" placeholder="姓名"></label>
            <label class="required-field"><input required name="phone" type="tel" maxlength="40" inputmode="tel" autocomplete="tel" aria-label="电话" placeholder="电话"></label>
            <label class="required-field"><input required name="company" maxlength="200" autocomplete="organization" aria-label="公司名称" placeholder="公司名称"></label>
            <label class="required-field"><input required name="email" type="email" maxlength="200" autocomplete="email" aria-label="邮箱" placeholder="邮箱"></label>
            <label class="full"><textarea name="message" maxlength="2000" aria-label="留言内容" placeholder="留言内容"></textarea></label>
            <input class="visually-hidden" tabindex="-1" autocomplete="off" name="website" aria-hidden="true">
            <button class="button support-submit" type="submit">提交</button>
          </form>
        </div>
      </div>
    </section>`;
}

/* 功能：生成联系我们页面。
 * 参数：无。
 * 返回值：联系我们页面 HTML 字符串。
 */
function contactPage() {
  return `
    ${pageHero({ image: "aboutHero", title: "联系我们", className: "sub-hero contact-hero" })}
    <section class="contact-main section-pad">
      <div class="content">
        <div class="contact-panel reveal">
          <div class="contact-info">
            <dl>
              <dt>电话：</dt><dd>${CONTACT.sales}<br>${CONTACT.phone}</dd>
              <dt>地址：</dt><dd>${CONTACT.addressA}</dd>
              <dt aria-hidden="true"></dt><dd>${CONTACT.addressB}</dd>
            </dl>
          </div>
          <div class="contact-map">
            <div class="office-map" data-leaflet-map aria-label="微眸医疗办公地点地图" role="application">
              <p class="office-map__status" data-leaflet-map-status>正在加载地图…</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="message section-pad">
      <div class="content">
        <p class="message-copy">如果您对我们的产品感兴趣，诚挚希望您填写此表单，我们会及时与您取得联系</p>
        <form class="message-form reveal" data-lead-form novalidate>
          <label class="required-field"><input required name="name" maxlength="100" autocomplete="name" aria-label="姓名" placeholder="姓名"></label>
          <label class="required-field"><input required name="phone" type="tel" maxlength="40" inputmode="tel" autocomplete="tel" aria-label="电话" placeholder="电话"></label>
          <label class="required-field"><input required name="company" maxlength="200" autocomplete="organization" aria-label="公司名称" placeholder="公司名称"></label>
          <label class="required-field"><input required name="email" type="email" maxlength="200" autocomplete="email" aria-label="邮箱" placeholder="邮箱"></label>
          <textarea name="message" maxlength="2000" aria-label="留言内容" placeholder="留言内容"></textarea>
          <input class="visually-hidden" tabindex="-1" autocomplete="off" name="website" aria-hidden="true">
          <button class="button" type="submit">提交 <span>→</span></button>
        </form>
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
      title: "高水平科研利器",
      copy: "药物精准递送系统可实现微米级操作和微量匀速注射，消除术者手部震颤，<br class=\"research-hero-copy-break\">从而降低操作难度，提高科研试验成功率，节省科研经费和科研时间。",
      action: `<button class="hero-video-button" type="button" data-video-title="药物精准递送系统" data-video-poster="${img("researchHero")}" data-video-src="${RESEARCH_VIDEO_SRC}">观看视频<span aria-hidden="true">›</span></button>`,
      className: "product-hero hero-center research-hero"
    })}
    <section class="numbered-features section-pad">
      <div class="content">
        ${productFeature({ index: "01", title: "多自由度运动", copy: "自研独特的串并联构型，提供7自由度优于3微米的运动精度，实现灵巧运动，满足各类微创科研中对定位精度的极致要求。", image: "researchMotion", reverse: true, lineArt: "researchMachineOutline", splitText: true })}
        ${productFeature({ index: "02", title: "精准操作", copy: "结合“自适应RCM技术”，控制器可精准控制进针角度，支持极微量注射、穿刺及剥膜等精细操作，确保在不同实验对象解剖结构中实现精准定点操作。", image: "researchMachine", lineArt: "researchMouseOutline", splitText: true })}
      </div>
    </section>
    <section class="safety-strip" style="--bg:url('${img("researchScene")}')">
      <div class="content reveal">
        <div class="strip-heading">
          <span>03</span>
          <div>
            <h2 data-split-text>安全可靠</h2>
            <p data-split-text>将高难度显微操作转化为标准化、可重复的自动化流程，大幅缩短操作人员培训周期。配合直观的软件界面有效降低操作技术门槛，优化实验流程，提升科研实验的可靠性与效率。</p>
          </div>
        </div>
        <div class="safety-numbers">
          <b><span class="stat-number"><span class="stat-value">500</span><sup>+</sup></span><small>临床案例</small></b>
          <b><span class="stat-number"><span class="stat-value">100</span><sup>%</sup></span><small>成功率</small></b>
          <b><span class="stat-number"><span class="stat-value">9</span><sup>个</sup></span><small>合作中心</small></b>
        </div>
      </div>
    </section>
    <section class="applications section-pad">
      <div class="content">
        ${sectionTitle("适用范围", "", "left")}
        <div class="animal-grid">
          ${animals.map(([name, animalClass, image]) => `<article class="animal-card is-${animalClass} reveal" tabindex="0"><div class="animal-art">${lazyImg(image, `${name}实验动物`)}</div><span>${name}</span></article>`).join("")}
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
      title: "<span class='ois-title-accent'>OIS眼科</span><br>图像处理软件",
      copy: "OIS眼科图像处理软件集导入图像、图像处理与患者档案管理于一体，致力于为医生提供高效便捷的一站式解决方案，在确保医疗数据安全保密的同时，大幅提升临床诊断与随访效率。",
      className: "product-hero ois-hero"
    })}
    <section class="ois-workflow section-pad" data-ois-workflow="import">
      <div class="content">
        ${sectionTitle("<em>高效便携</em>进行眼科图像处理")}
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
        ${sectionTitle("<em>数据保密</em>，保护病人信息")}
        <img class="ois-security-screen reveal" src="${img("oisProcess")}" alt="OIS 图像处理界面">
        <div class="security-grid motion-reveal">
          <span><img src="${img("oisCompatibilityIcon")}" alt=""><b>全面兼容</b><small>支持OCT、眼底彩照等多源设备图像格式</small></span>
          <span><img src="${img("oisSecurityIcon")}" alt=""><b>安全可信</b><small>采用端到端加密与严格权限管控，确保患者数据100%私有，符合最高医疗隐私标准</small></span>
          <span><img src="${img("oisAnnotationIcon")}" alt=""><b>多样标注</b><small>支持在图像上进行多维度自由标注，极大提升诊断与交流效率</small></span>
          <span><img src="${img("oisArchiveIcon")}" alt=""><b>材料归档</b><small>患者所有影像、报告与历史数据自动关联归档，构建完整电子病历</small></span>
          <span><img src="${img("oisWorkflowIcon")}" alt=""><b>流程一体</b><small>图像上传、分析、报告生成全流程无缝衔接，彻底告别多系统切换，极大提升工作效率</small></span>
          <span><img src="${img("oisAnalysisIcon")}" alt=""><b>智能分析</b><small>基于前沿AI算法，自动识别病灶并量化关键指标，提供精准、可重复的辅助诊断依据</small></span>
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
    ["v3PrecisionIcon", "微米级高精度", "RCM控制及末端定位", [
      "空间定点5个自由度RCM运动",
      "精准完成眼部穿刺、注射、剥膜、夹取等动作",
      "可自由规划末端运动轨迹，精度达微米级"
    ]],
    ["v3ModularIcon", "模块化设计", "高度适配眼科手术场景", [
      "模块化设计，末端套管灵活适配多种手术工具",
      "适用多种眼科手术场景，满足临床与科研需求"
    ]],
    ["v3ArmIcon", "核心技术", "核心部件均自主研发", [
      "拥有七十多项产品核心专利",
      "可通过5G网络实现远程操控，推动优质医疗资源下沉"
    ]]
  ];

  return `
    ${pageHero({
      image: "v3Hero",
      eyebrow: "WMOX-22001",
      title: "高精度显微眼科手术机器人",
      copy: "微眸琢锋·眼科手术机器人设备末端精度达3-5微米，远心运动的精度在100微米以内，运动闭环控制周期小于30微秒，同时采用轻量化可移动设计，适配现有手术室环境，无需额外场地改造，落地门槛更低。其集成了机器人辅助手术、术前规划及术中定位导航等功能，让医生在眼球受限空间里看得更清楚，手术操作更稳，实现药物的微量化注射和可视化操作，提升注射药物的成功率，让眼科手术的创伤更小、治疗更为精准。",
      className: "product-hero v3-hero"
    })}
    <section class="v3-features section-pad">
      <div class="content">
        ${sectionTitle("开启<em>微米级</em>精度操作", "助力眼底高精度手术，填补我国眼科眼底手术机器人行业空白")}
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
          <video playsinline preload="metadata" poster="${img("v3Feature")}" ${V3_VIDEO_SRC ? `src="${V3_VIDEO_SRC}"` : ""} aria-label="眼科手术机器人案例视频" data-v3-video data-pot-player>
            您的浏览器不支持视频播放。
          </video>
        </div>
      </div>
    </section>
    <section class="clinical-strip" style="--bg:url('${img("surgeryScene")}')">
      <div class="content reveal">
        <div class="clinical-copy clinical-timeline">
          <p>2023年6月，完成全球首例跨海5G远程微米级动物眼科手术。</p>
          <p>2025年4月，完成了全国首例“显微眼科手术机器人系统辅助视网膜下注射平衡盐溶液治疗难治性糖尿病性黄斑水肿”。</p>
          <p>2025年11月，完成了全球首例远程机器人视网膜下注射手术。</p>
          <p>2026年6月，完成全国首个眼科手术机器人多中心随机对照注册临床试验。</p>
          <p>2026年7月，微眸琢锋机器人进入国家药监审批“绿色通道”。</p>
        </div>
        <div class="metric-row light">
          <strong><span>3-5<sup>μm</sup></span><small>末端精度</small></strong>
          <strong><span>100<sup>+</sup></span><small>临床案例</small></strong>
          <strong><span>10<sup>+</sup></span><small>临床中心</small></strong>
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
    title: "显微手术控制系统",
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
      title: "INCYTO（韩国进口）",
      category: "needle",
      mediaClass: "is-incyto",
      media: [["microNeedle", "product-main"]],
      specs: ["微针规格：38G-42G", "微针长度：S、L(1-6mm)", "管体规格：25G-27G", "管体长度：28mm"]
    },
    {
      title: "移液针",
      category: "needle",
      mediaClass: "is-metal",
      media: [["metalNeedle", "metal-needle"], ["metalPackage", "metal-package"]],
      specs: ["微针规格：33G-50G", "微针长度：S、M、L(1-6mm)", "管体规格：25G-28G", "管体长度：15-60mm"]
    },
    {
      title: "移液针",
      category: "needle",
      mediaClass: "is-plastic",
      media: [["pipettePackage", "plastic-package"], ["pipetteNeedle", "pipette-needle"]],
      specs: ["微针规格：33G-50G", "微针长度：S、M、L(1-6mm)", "管体规格：25G-28G", "管体长度：15-60mm"]
    },
    {
      title: "一次性使用无菌视网膜下注吸器",
      category: "needle",
      mediaClass: "is-injector",
      media: [["injector", "injector-main"], ["pipetteNeedle", "injector-needle"]],
      specs: ["微针规格：38G-42G", "微针长度：S、L(1-6mm)", "管体规格：25G-27G", "管体长度：28mm"]
    },
    {
      title: "显微镊",
      category: "instrument",
      mediaClass: "is-instrument",
      media: [["instrumentForceps", "instrument-forceps"], ["instrumentPackaging", "instrument-packaging"]],
      specs: ["用于夹持眼组织、眼内异物，剥除内界膜"]
    },
    {
      title: "显微剪",
      category: "instrument",
      mediaClass: "is-instrument",
      media: [["instrumentForceps", "instrument-forceps"], ["instrumentPackaging", "instrument-packaging"]],
      specs: ["用于剪切组织"]
    },
    {
      title: "一次性使用无菌显微镊",
      category: "instrument",
      mediaClass: "is-instrument",
      media: [["instrumentForceps", "instrument-forceps"], ["instrumentPackaging", "instrument-packaging"]],
      specs: ["用于夹持眼组织、眼内异物，剥除内界膜"]
    },
    {
      title: "一次性使用无菌显微剪",
      category: "instrument",
      mediaClass: "is-instrument",
      media: [["instrumentForceps", "instrument-forceps"], ["instrumentPackaging", "instrument-packaging"]],
      specs: ["用于剪切组织"]
    },
    {
      title: "手持式微量注射套装",
      category: "kit",
      mediaClass: "is-handheld-kit",
      media: [["handheldMicroinjectionKit", "handheld-kit"]],
      description: "主要应用于视网膜下注射",
      specs: ["适用实验对象：小鼠、豚鼠、兔子"]
    },
    {
      title: "眼科附件包",
      titleDetail: "（夹具、微量注射器、塞子）",
      category: "kit",
      mediaClass: "is-kit-bag",
      media: [["surgicalConsumablesKit", "kit-bag"]],
      description: "主要应用于视网膜手术、玻璃体手术等眼底手术",
      specs: ["配合显微眼科手术控制系统设备使用，应用于视网膜下注吸"]
    },
    {
      title: "眼科附件包",
      titleDetail: "（夹具、无菌罩、注射器、微针）",
      category: "kit",
      mediaClass: "is-kit-bag",
      media: [["surgicalConsumablesKit", "kit-bag"]],
      description: "主要应用于视网膜手术、玻璃体手术等眼底手术",
      specs: ["配合显微眼科手术控制系统设备使用，应用于视网膜下注吸"]
    },
    {
      title: "小鼠固定器",
      category: "experiment",
      mediaClass: "is-experiment is-mouse-fixture",
      media: [["mouseFixture", "experiment-product"]],
      description: "主要应用于角膜层穿刺，视神经注射等",
      specs: ["适用实验对象：小鼠"]
    },
    {
      title: "小鼠板",
      category: "experiment",
      mediaClass: "is-experiment is-mouse-platform",
      media: [["mousePlatform", "experiment-product"]],
      description: "主要应用于视网膜下注射",
      specs: ["适用实验对象：小鼠"]
    },
    {
      title: "豚鼠板",
      category: "experiment",
      mediaClass: "is-experiment is-guinea-pig-platform",
      media: [["guineaPigPlatform", "experiment-product"]],
      description: "主要应用于视网膜下注射",
      specs: ["适用实验对象：豚鼠"]
    },
    {
      title: "移液针填充塞",
      category: "other",
      mediaClass: "is-other is-filling-plug",
      media: [["pipetteFillingPlug", "other-product"]],
      description: "主要应用于微量注射",
      specs: ["移液针配件，用于降低注射损耗量"]
    },
    {
      title: "转换头",
      category: "other",
      mediaClass: "is-other is-irrigator",
      media: [["irrigator", "other-product"]],
      description: "主要应用于视网膜手术、玻璃体手术等眼底手术",
      specs: ["配合爱尔康玻切机灌注管路和注射器使用"]
    }
  ];

  return `
    <section class="page-hero consumables-hero hero-center">
      <div class="consumables-hero-art" aria-hidden="true">
        <img class="hero-replacement" src="${img("consumablesHeroReplacement")}" alt="">
      </div>
      <div class="hero-copy">
        <h1>手术耗材</h1>
        <p>覆盖微针、注吸器、手术器械及实验配件等产品，以精密工艺满足显微眼科手术与生命科学研究中的精细操作需求。</p>
      </div>
    </section>
    <section class="consumable-nav section-pad">
      <div class="content">
        <h2>以精密工艺守护手术<em>安全与信赖</em></h2>
        <div class="chip-row" aria-label="耗材分类">
          <button class="active" type="button" data-consumable-filter="needle" aria-pressed="true">微针系列</button>
          <button type="button" data-consumable-filter="instrument" aria-pressed="false">手术器械</button>
          <button type="button" data-consumable-filter="kit" aria-pressed="false">附件包</button>
          <button type="button" data-consumable-filter="experiment" aria-pressed="false">实验配件</button>
          <button type="button" data-consumable-filter="other" aria-pressed="false">其他配件</button>
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
              ${item.description === false ? "" : `<p class="consumable-description">${item.description || "主要应用于视网膜手术、玻璃体手术等眼底手术"}</p>`}
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
  contact: contactPage,
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

  // The V3 clinical scene is a 1920 × 800 artboard with text positioned on
  // that coordinate system. CSS transforms require a unitless scale value,
  // so calculate it from the rendered strip width instead of passing a `vw`
  // length to `scale()`, which browsers discard as invalid.
  const clinicalStrip = document.querySelector(".clinical-strip");
  if (clinicalStrip) {
    const updateClinicalSceneScale = () => {
      clinicalStrip.style.setProperty(
        "--clinical-scale",
        String(clinicalStrip.getBoundingClientRect().width / 1920)
      );
    };
    updateClinicalSceneScale();
    addEventListener("resize", updateClinicalSceneScale);
    cleanups.push(() => removeEventListener("resize", updateClinicalSceneScale));
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
          <div class="media-dialog-copy"><span>OCULOTRONICS</span><h2 id="media-dialog-title"></h2><p>视频内容正在准备中，您可以先浏览页面中的产品资料。</p></div>
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

  document.querySelectorAll("[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const required = [...form.querySelectorAll("[required]")];
      const missing = required.find((field) => !field.value.trim());
      const email = form.querySelector('input[type="email"]');
      const phone = form.querySelector('input[type="tel"]');
      form.querySelectorAll(".field-error").forEach((field) => field.classList.remove("field-error"));
      if (missing) {
        missing.classList.add("field-error");
        missing.focus();
        showToast(localeText(`请填写${missing.getAttribute("aria-label")}`, `Please enter ${missing.getAttribute("aria-label")}`), "error");
        return;
      }
      if (phone && !/^[0-9+()\s-]{6,20}$/.test(phone.value.trim())) {
        phone.classList.add("field-error");
        phone.focus();
        showToast(localeText("请输入有效的联系电话", "Please enter a valid phone number"), "error");
        return;
      }
      if (email?.value && !email.validity.valid) {
        email.classList.add("field-error");
        email.focus();
        showToast(localeText("请输入有效的邮箱地址", "Please enter a valid email address"), "error");
        return;
      }
      const submitButton = form.querySelector('[type="submit"]');
      submitButton.disabled = true;
      form.setAttribute("aria-busy", "true");
      try {
        const requestId = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Idempotency-Key": requestId },
          body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          const error = new Error(result.message || "提交失败");
          error.rateLimited = response.status === 429;
          throw error;
        }
        form.reset();
        showToast(localeText("提交成功，我们会尽快与您联系", "Submitted successfully. We will contact you shortly."));
      } catch (error) {
        showToast(error.rateLimited
          ? localeText("提交过于频繁，请稍后再试", "Too many submissions. Please try again later.")
          : localeText("提交失败，请稍后重试", "Submission failed. Please try again later."), "error");
      } finally {
        submitButton.disabled = false;
        form.removeAttribute("aria-busy");
      }
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
      if (!honors.length) return;
      latestHonors = honors;
      preloadHonorImages(honors);
      const selected = honors.filter((honor) => honor.category === activeHonorCategory);
      if (!selected.length) return;
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
        if (!response.ok) return;
        const payload = await response.json();
        if (Array.isArray(payload.honors)) renderHonors(payload.honors);
      } catch {
        // Keep the bundled certificate cards visible when the data source is unavailable.
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
