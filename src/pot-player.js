const LANGUAGE_OPTIONS = [
  ["en", "English"],
  ["ja", "日本語"],
  ["ko", "한국어"],
  ["fr", "Français"],
  ["de", "Deutsch"],
  ["es", "Español"]
];
const translationCache = new Map();
const MAX_TRANSLATION_CACHE_ENTRIES = 300;

const text = (zh, en) => document.documentElement.lang === "en" ? en : zh;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const remaining = Math.floor(seconds % 60).toString().padStart(2, "0");
  return hours ? `${hours}:${minutes.toString().padStart(2, "0")}:${remaining}` : `${minutes}:${remaining}`;
};

function icon(name) {
  const icons = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3v14H7zm7 0h3v14h-3z" fill="currentColor"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 7 6 12l5 5M18 6v12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>',
    forward: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 7 5 5-5 5M6 6v12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>',
    volume: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6l-5 4H4Zm12.2.3a3 3 0 0 1 0 3.4M18.4 8a6.2 6.2 0 0 1 0 8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"/></svg>',
    mute: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6l-5 4H4Zm12-1 5 6m0-6-5 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"/></svg>',
    pip: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="12.5" y="12" width="5" height="4" rx=".6" fill="currentColor"/></svg>',
    fullscreen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4v5m11-5h5v5M9 20H4v-5m16 0v5h-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.7" fill="currentColor"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/><circle cx="19" cy="12" r="1.7" fill="currentColor"/></svg>'
  };
  return icons[name] || name;
}

function button(className, label, iconName) {
  const element = document.createElement("button");
  element.type = "button";
  element.className = `pp-button ${className}`;
  element.setAttribute("aria-label", label);
  element.title = label;
  element.innerHTML = icon(iconName);
  return element;
}

function popoverButton(label, value, active, onSelect) {
  const option = document.createElement("button");
  option.type = "button";
  option.className = "pp-menu-option";
  option.textContent = label;
  option.dataset.active = String(active);
  option.onclick = onSelect;
  return option;
}

async function translateCaption(sourceText, targetLanguage) {
  const key = `${targetLanguage}:${sourceText}`;
  const cached = translationCache.get(key);
  if (cached) return cached;
  const request = fetch("/api/translate-captions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sourceText, sourceLanguage: "zh", targetLanguage })
  }).then(async (response) => {
    const body = await response.json().catch(() => ({}));
    if (!response.ok || !body.translation) throw new Error(body.message || "Translation is unavailable");
    return body.translation;
  });
  translationCache.set(key, request);
  if (translationCache.size > MAX_TRANSLATION_CACHE_ENTRIES) {
    translationCache.delete(translationCache.keys().next().value);
  }
  try {
    return await request;
  } catch (error) {
    translationCache.delete(key);
    throw error;
  }
}

function getCueText(video) {
  const track = Array.from(video.textTracks || []).find((item) => item.mode === "showing" || item.mode === "hidden");
  const cue = track?.activeCues?.[0];
  return cue?.text?.replace(/<[^>]*>/g, "").trim() || "";
}

function getQualitySources(video) {
  try {
    const sources = JSON.parse(video.dataset.qualitySources || "[]");
    if (Array.isArray(sources) && sources.every((source) => source && typeof source.src === "string" && typeof source.label === "string")) {
      return sources;
    }
  } catch {}
  return [];
}

function createPlayer(video) {
  if (video.dataset.potPlayerReady) return () => {};
  video.dataset.potPlayerReady = "true";
  video.controls = false;
  video.preload = video.preload || "metadata";
  video.playsInline = true;

  const shell = document.createElement("section");
  shell.className = "pp-player pp-controls-visible";
  shell.setAttribute("aria-label", video.getAttribute("aria-label") || text("视频播放器", "Video player"));
  video.parentNode.insertBefore(shell, video);
  shell.append(video);

  const header = document.createElement("div");
  header.className = "pp-header";
  header.innerHTML = `<div class="pp-media-label"><span></span><b>WEIMOU PLAYER</b><em>${video.getAttribute("aria-label") || text("企业视频", "Company video")}</em></div>`;
  shell.append(header);

  const subtitle = document.createElement("div");
  subtitle.className = "pp-ai-subtitle";
  subtitle.setAttribute("aria-live", "polite");
  shell.append(subtitle);

  const controls = document.createElement("div");
  controls.className = "pp-controls";
  const timeline = document.createElement("input");
  timeline.type = "range";
  timeline.className = "pp-timeline";
  timeline.min = "0";
  timeline.max = "1000";
  timeline.value = "0";
  timeline.step = "1";
  timeline.setAttribute("aria-label", text("播放进度", "Seek video"));
  const time = document.createElement("output");
  time.className = "pp-time";
  const volume = document.createElement("input");
  volume.type = "range";
  volume.className = "pp-volume-range";
  volume.min = "0";
  volume.max = "1";
  volume.step = "0.05";
  volume.value = String(video.volume);
  volume.setAttribute("aria-label", text("音量", "Volume"));

  const play = button("pp-play", text("播放", "Play"), "play");
  const back = button("pp-back", text("后退 10 秒", "Back 10 seconds"), "back");
  const forward = button("pp-forward", text("前进 10 秒", "Forward 10 seconds"), "forward");
  const mute = button("pp-mute", text("静音", "Mute"), "volume");
  const captions = button("pp-captions", text("字幕", "Captions"), "captions");
  const quality = button("pp-quality", text("清晰度", "Quality"), "HD");
  const speed = button("pp-speed", text("播放速度", "Playback speed"), "speed");
  const translate = button("pp-translate", text("AI 翻译", "AI translation"), "translate");
  const pip = button("pp-pip", text("画中画", "Picture in picture"), "pip");
  const fullscreen = button("pp-fullscreen", text("全屏", "Fullscreen"), "fullscreen");

  const primary = document.createElement("div");
  primary.className = "pp-control-group pp-primary";
  primary.append(play, back, forward, time);
  const secondary = document.createElement("div");
  secondary.className = "pp-control-group pp-secondary";
  secondary.append(mute, volume, captions, quality, speed, translate, pip, fullscreen);
  const controlBar = document.createElement("div");
  controlBar.className = "pp-control-bar";
  controlBar.append(primary, secondary);
  controls.append(timeline, controlBar);
  shell.append(controls);

  const menu = document.createElement("div");
  menu.className = "pp-menu";
  menu.hidden = true;
  shell.append(menu);
  let openMenu = "";
  let translationLanguage = "";
  let translatedCue = "";
  let latestRequest = 0;
  let selectedQuality = "";
  const qualitySources = getQualitySources(video);
  const initialSource = video.currentSrc || video.src;
  let controlsTimer = 0;
  let controlsFrame = 0;

  const hideControls = () => {
    if (video.paused || menu.hidden === false) return;
    shell.classList.remove("pp-controls-visible");
    shell.classList.add("pp-controls-idle");
  };
  const scheduleControlsHide = () => {
    window.clearTimeout(controlsTimer);
    if (!video.paused) controlsTimer = window.setTimeout(hideControls, 2000);
  };
  const showControls = () => {
    shell.classList.add("pp-controls-visible");
    shell.classList.remove("pp-controls-idle");
    scheduleControlsHide();
  };

  const closeMenu = () => {
    openMenu = "";
    menu.hidden = true;
    menu.replaceChildren();
    scheduleControlsHide();
  };
  const openMenuFor = (kind) => {
    if (openMenu === kind) return closeMenu();
    openMenu = kind;
    menu.hidden = false;
    window.clearTimeout(controlsTimer);
    menu.replaceChildren();
    if (kind === "speed") {
      menu.append(...[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => popoverButton(`${rate}×`, String(rate), video.playbackRate === rate, () => {
        video.playbackRate = rate;
        closeMenu();
      })));
      return;
    }
    if (kind === "quality") {
      const activeSource = video.currentSrc || video.src;
      menu.append(popoverButton(text("自动", "Auto"), "auto", !selectedQuality, () => {
        if (selectedQuality && initialSource) {
          const currentTime = video.currentTime;
          const resume = !video.paused;
          video.src = initialSource;
          video.addEventListener("loadedmetadata", () => {
            video.currentTime = Math.min(currentTime, video.duration || currentTime);
            if (resume) video.play().catch(() => {});
          }, { once: true });
        }
        selectedQuality = "";
        quality.textContent = "HD";
        closeMenu();
      }));
      qualitySources.forEach((source) => menu.append(popoverButton(source.label, source.src, selectedQuality === source.src || (!selectedQuality && source.src === activeSource), () => {
        const currentTime = video.currentTime;
        const resume = !video.paused;
        selectedQuality = source.src;
        quality.textContent = source.label;
        video.src = source.src;
        video.addEventListener("loadedmetadata", () => {
          video.currentTime = Math.min(currentTime, video.duration || currentTime);
          if (resume) video.play().catch(() => {});
        }, { once: true });
        closeMenu();
      })));
      if (!qualitySources.length) menu.append(Object.assign(document.createElement("p"), { className: "pp-menu-note", textContent: text("请配置 HLS/DASH 或多码率源后启用手动清晰度。", "Configure HLS/DASH or multiple bitrate sources to enable manual quality.") }));
      return;
    }
    if (kind === "captions") {
      const tracks = Array.from(video.textTracks || []).filter((track) => track.kind === "subtitles" || track.kind === "captions");
      menu.append(popoverButton(text("关闭字幕", "Captions off"), "off", !tracks.some((track) => track.mode === "showing"), () => {
        tracks.forEach((track) => { track.mode = "disabled"; });
        closeMenu();
      }));
      tracks.forEach((track) => menu.append(popoverButton(track.label || track.language || text("字幕", "Captions"), track.language, track.mode === "showing", () => {
        tracks.forEach((item) => { item.mode = item === track ? "showing" : "disabled"; });
        closeMenu();
      })));
      if (!tracks.length) menu.append(Object.assign(document.createElement("p"), { className: "pp-menu-note", textContent: text("暂未配置审核字幕文件", "No reviewed caption track is configured") }));
      return;
    }
    menu.append(Object.assign(document.createElement("p"), { className: "pp-menu-title", textContent: text("AI 字幕翻译", "AI caption translation") }));
    menu.append(...LANGUAGE_OPTIONS.map(([code, label]) => popoverButton(label, code, translationLanguage === code, () => {
      translationLanguage = translationLanguage === code ? "" : code;
      translatedCue = "";
      subtitle.textContent = "";
      closeMenu();
      updateSubtitle();
    })));
    menu.append(Object.assign(document.createElement("p"), { className: "pp-menu-note", textContent: text("翻译仅处理已审核的原始字幕，并会缓存结果。", "Only reviewed source captions are translated; results are cached.") }));
  };

  const updateControls = () => {
    play.innerHTML = icon(video.paused ? "play" : "pause");
    play.setAttribute("aria-label", video.paused ? text("播放", "Play") : text("暂停", "Pause"));
    const ratio = video.duration ? (video.currentTime / video.duration) * 1000 : 0;
    timeline.value = String(clamp(ratio, 0, 1000));
    timeline.style.setProperty("--pp-progress", `${ratio / 10}%`);
    time.value = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    mute.innerHTML = icon(video.muted || !video.volume ? "mute" : "volume");
    volume.style.setProperty("--pp-volume", String(video.muted ? 0 : video.volume));
  };
  const scheduleControlsUpdate = () => {
    if (controlsFrame) return;
    controlsFrame = requestAnimationFrame(() => {
      controlsFrame = 0;
      updateControls();
    });
  };
  const updateSubtitle = async () => {
    const cueText = getCueText(video);
    if (!translationLanguage || !cueText) {
      subtitle.textContent = "";
      return;
    }
    if (cueText === translatedCue) return;
    const requestId = ++latestRequest;
    subtitle.textContent = text("正在翻译字幕…", "Translating caption…");
    try {
      const result = await translateCaption(cueText, translationLanguage);
      if (requestId !== latestRequest) return;
      translatedCue = cueText;
      subtitle.textContent = result;
    } catch {
      if (requestId === latestRequest) subtitle.textContent = text("AI 翻译暂不可用", "AI translation is unavailable");
    }
  };
  const togglePlay = () => video.paused ? video.play().catch(() => {}) : video.pause();

  play.onclick = togglePlay;
  video.onclick = togglePlay;
  back.onclick = () => { video.currentTime = Math.max(0, video.currentTime - 10); };
  forward.onclick = () => { video.currentTime = Math.min(video.duration || Infinity, video.currentTime + 10); };
  timeline.oninput = () => { if (video.duration) video.currentTime = (Number(timeline.value) / 1000) * video.duration; };
  mute.onclick = () => { video.muted = !video.muted; updateControls(); };
  volume.oninput = () => { video.volume = Number(volume.value); video.muted = video.volume === 0; updateControls(); };
  captions.onclick = () => openMenuFor("captions");
  quality.onclick = () => openMenuFor("quality");
  speed.onclick = () => openMenuFor("speed");
  translate.onclick = () => openMenuFor("translate");
  pip.onclick = async () => { if (document.pictureInPictureElement) await document.exitPictureInPicture(); else if (document.pictureInPictureEnabled) await video.requestPictureInPicture(); };
  fullscreen.onclick = () => { if (document.fullscreenElement) document.exitFullscreen(); else shell.requestFullscreen?.(); };
  shell.addEventListener("pointermove", showControls);
  shell.addEventListener("pointerenter", showControls);
  shell.addEventListener("pointerleave", () => {
    closeMenu();
    scheduleControlsHide();
  });
  shell.addEventListener("focusin", showControls);
  shell.addEventListener("keydown", showControls);
  controls.addEventListener("pointermove", showControls);
  video.addEventListener("play", scheduleControlsHide);
  video.addEventListener("pause", () => {
    window.clearTimeout(controlsTimer);
    shell.classList.add("pp-controls-visible");
    shell.classList.remove("pp-controls-idle");
  });
  video.addEventListener("ended", () => {
    window.clearTimeout(controlsTimer);
    shell.classList.add("pp-controls-visible");
    shell.classList.remove("pp-controls-idle");
  });
  ["loadedmetadata", "timeupdate", "play", "pause", "volumechange", "ratechange"].forEach((eventName) => video.addEventListener(eventName, scheduleControlsUpdate));
  video.addEventListener("seeked", updateSubtitle);
  video.textTracks && Array.from(video.textTracks).forEach((track) => track.addEventListener("cuechange", updateSubtitle));
  updateControls();
  return () => {
    window.clearTimeout(controlsTimer);
    cancelAnimationFrame(controlsFrame);
    video.controls = true;
    video.dataset.potPlayerReady = "";
    shell.replaceWith(video);
  };
}

export function enhancePotPlayers(root = document) {
  const cleanups = Array.from(root.querySelectorAll("video[data-pot-player]")).map(createPlayer);
  const observerTarget = root.body || root;
  const observer = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (!(node instanceof Element)) return;
      if (node.matches("video[data-pot-player]")) cleanups.push(createPlayer(node));
      node.querySelectorAll?.("video[data-pot-player]").forEach((video) => cleanups.push(createPlayer(video)));
    }));
  });
  observer.observe(observerTarget, { childList: true, subtree: true });
  cleanups.stop = () => observer.disconnect();
  return cleanups;
}
