import "./compat.js";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { bindInteractions, footer, header, homePage, pages, route } from "../weimou_web_app.js";
import { applyLocale, readLocale } from "../weimou_web_i18n.js";
import { enhancePotPlayers } from "./weimou_web_pot-player.js";
import { initializeLeafletMap } from "./weimou_web_leaflet-map.js";
import "../weimou_web_styles.css";

const PRODUCT_ROUTES = ["research", "ois", "v3", "v4", "consumables"];

function Markup({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function Header({ locale }) {
  return <header id="site-header"><Markup key={locale} html={header()} /></header>;
}

function PageContent({ page, locale }) {
  const renderPage = pages[page] || homePage;
  return <main id="app"><Markup key={`${page}-${locale}`} html={renderPage()} /></main>;
}

function Footer({ locale }) {
  return <footer id="site-footer"><Markup key={locale} html={footer()} /></footer>;
}

function App() {
  const [page, setPage] = useState(route);
  const [locale, setLocale] = useState(readLocale);
  const previousPage = useRef(page);
  const isInitialPageLoad = useRef(true);

  useEffect(() => {
    const restoreOnInitialLoad = isInitialPageLoad.current;
    isInitialPageLoad.current = false;
    const storageKey = `oculotronics:scroll:${page}`;
    const readSavedPosition = () => {
      try { return Number(sessionStorage.getItem(storageKey)) || 0; } catch { return 0; }
    };
    const restoreSavedPosition = () => {
      const position = readSavedPosition();
      if (position <= 0) return;
      // News sections are inserted asynchronously. Wait for their layout, then
      // restore the saved offset after the document has regained its height.
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, position)));
    };
    const savePosition = () => {
      try { sessionStorage.setItem(storageKey, String(window.scrollY)); } catch {}
    };
    const onContentReady = (event) => {
      if (restoreOnInitialLoad && event.detail?.page === page) restoreSavedPosition();
    };

    window.addEventListener("pagehide", savePosition);
    window.addEventListener("oculotronics:content-ready", onContentReady);
    if (restoreOnInitialLoad && page !== "news") restoreSavedPosition();
    return () => {
      savePosition();
      window.removeEventListener("pagehide", savePosition);
      window.removeEventListener("oculotronics:content-ready", onContentReady);
    };
  }, [page]);

  useEffect(() => {
    const handleRoute = () => setPage(route());
    window.addEventListener("hashchange", handleRoute);
    return () => window.removeEventListener("hashchange", handleRoute);
  }, []);

  useEffect(() => {
    const handleLocale = (event) => setLocale(event.detail === "en" ? "en" : "zh-CN");
    window.addEventListener("oculotronics:language-change", handleLocale);
    return () => window.removeEventListener("oculotronics:language-change", handleLocale);
  }, []);

  useLayoutEffect(() => {
    document.body.dataset.page = page;
    applyLocale(locale);
    const languageSwitch = document.querySelector("[data-language]");
    if (languageSwitch) {
      languageSwitch.textContent = locale === "en" ? "中文" : "EN";
      languageSwitch.setAttribute("aria-label", locale === "en" ? "Switch to Simplified Chinese" : "Switch to English");
    }
    document.querySelectorAll("[data-route]").forEach((link) => {
      const active = link.dataset.route === page
        || (link.dataset.route === "products" && PRODUCT_ROUTES.includes(page));
      link.classList.toggle("active", active);
    });
    // Keep the browser's scroll restoration on a page reload. Only navigation
    // to another route should begin at the top of that route.
    if (previousPage.current !== page) {
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      } else {
        window.scrollTo(0, 0);
      }
    }
    previousPage.current = page;
  }, [page, locale]);

  // Let the new route paint first. Interaction binding performs a broad DOM
  // scan and should not block the first frame after a navigation.
  useEffect(() => {
    const interactionCleanup = bindInteractions();
    const playerCleanups = enhancePotPlayers();
    const mapCleanup = page === "contact" ? initializeLeafletMap() : undefined;
    return () => {
      mapCleanup?.();
      playerCleanups.stop?.();
      playerCleanups.forEach((cleanup) => cleanup());
      interactionCleanup?.();
    };
  }, [page, locale]);

  return (
    <>
      <Header locale={locale} />
      <PageContent page={page} locale={locale} />
      <Footer locale={locale} />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
