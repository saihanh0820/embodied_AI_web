const LEAFLET_SCRIPT_ID = "leaflet-map-script";
const LEAFLET_STYLE_ID = "leaflet-map-style";
const LEAFLET_SCRIPT_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const LEAFLET_STYLE_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const AMAP_TILE_URL = "https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
const MAP_PRELOAD_ZOOM = 16;
const MAP_PRELOAD_RADIUS = 1;
const preloadedTiles = new Map();

// Fixed coordinates keep this map deterministic and avoid a runtime geocoder/API key.
// The marker is the Yuexiu office shown in the contact details. AMap tiles use
// GCJ-02, so convert the WGS-84 source coordinate before placing the marker.
const OFFICE = {
  title: "微眸医疗（越秀办公室）",
  address: "广州市越秀区先烈中路65号东山广场附楼10楼",
  position: [23.139040,113.288813]
};

// This location is added as an additional marker only. The contact map keeps
// the Yuexiu office as its initial view when the page opens.
const NANSHA_OFFICE = {
  title: "微眸医疗（南沙办公室）",
  address: "广州市南沙区珠江街南江二路6号自编8栋(9#楼)8层803",
  // Supplied AMap/GCJ-02 coordinate: [latitude, longitude].
  position: [22.726913, 113.529233]
};

function outOfChina(latitude, longitude) {
  return longitude < 72.004 || longitude > 137.8347 || latitude < 0.8293 || latitude > 55.8271;
}

function transformLatitude(x, y) {
  let result = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  result += (20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2 / 3;
  result += (20 * Math.sin(y * Math.PI) + 40 * Math.sin(y / 3 * Math.PI)) * 2 / 3;
  result += (160 * Math.sin(y / 12 * Math.PI) + 320 * Math.sin(y * Math.PI / 30)) * 2 / 3;
  return result;
}

function transformLongitude(x, y) {
  let result = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  result += (20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2 / 3;
  result += (20 * Math.sin(x * Math.PI) + 40 * Math.sin(x / 3 * Math.PI)) * 2 / 3;
  result += (150 * Math.sin(x / 12 * Math.PI) + 300 * Math.sin(x / 30 * Math.PI)) * 2 / 3;
  return result;
}

function toGcj02([latitude, longitude]) {
  if (outOfChina(latitude, longitude)) return [latitude, longitude];
  const dLat = transformLatitude(longitude - 105, latitude - 35);
  const dLon = transformLongitude(longitude - 105, latitude - 35);
  const radLat = latitude / 180 * Math.PI;
  const magic = 1 - 0.006693421622965943 * Math.sin(radLat) ** 2;
  const sqrtMagic = Math.sqrt(magic);
  return [latitude + dLat * 180 / (6378245 * (1 - 0.006693421622965943) / (magic * sqrtMagic) * Math.PI), longitude + dLon * 180 / (6378245 / sqrtMagic * Math.cos(radLat) * Math.PI)];
}

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  return new Promise((resolve, reject) => {
    let script = document.getElementById(LEAFLET_SCRIPT_ID);
    if (!script) {
      script = document.createElement("script");
      script.id = LEAFLET_SCRIPT_ID;
      script.src = LEAFLET_SCRIPT_URL;
      script.async = true;
      document.head.append(script);
    }
    const finish = () => window.L ? resolve(window.L) : reject(new Error("Leaflet unavailable"));
    script.addEventListener("load", finish, { once: true });
    script.addEventListener("error", () => reject(new Error("Leaflet failed to load")), { once: true });
  });
}

function loadLeafletStyle() {
  if (document.getElementById(LEAFLET_STYLE_ID)) return;
  const link = document.createElement("link");
  link.id = LEAFLET_STYLE_ID;
  link.rel = "stylesheet";
  link.href = LEAFLET_STYLE_URL;
  document.head.append(link);
}

function canPreloadMapResources() {
  if (navigator.onLine === false) return false;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType);
}

function tileCoordinate([latitude, longitude], zoom) {
  const scale = 2 ** zoom;
  const x = Math.floor((longitude + 180) / 360 * scale);
  const latitudeRadians = latitude * Math.PI / 180;
  const y = Math.floor((1 - Math.asinh(Math.tan(latitudeRadians)) / Math.PI) / 2 * scale);
  return [x, y];
}

function preloadMapTiles() {
  const [centerX, centerY] = tileCoordinate(toGcj02(OFFICE.position), MAP_PRELOAD_ZOOM);
  const worldSize = 2 ** MAP_PRELOAD_ZOOM;
  for (let y = centerY - MAP_PRELOAD_RADIUS; y <= centerY + MAP_PRELOAD_RADIUS; y += 1) {
    for (let x = centerX - MAP_PRELOAD_RADIUS; x <= centerX + MAP_PRELOAD_RADIUS; x += 1) {
      const tileX = (x + worldSize) % worldSize;
      const url = AMAP_TILE_URL
        .replace("{s}", String((tileX + y) % 4 + 1))
        .replace("{x}", tileX)
        .replace("{y}", y)
        .replace("{z}", MAP_PRELOAD_ZOOM);
      if (preloadedTiles.has(url)) continue;
      const image = new Image();
      image.decoding = "async";
      image.src = url;
      preloadedTiles.set(url, image);
    }
  }
}

export function preloadLeafletMapResources() {
  if (!canPreloadMapResources()) return;
  loadLeafletStyle();
  void loadLeaflet().catch(() => {});
  preloadMapTiles();
}

export function initializeLeafletMap() {
  const container = document.querySelector("[data-leaflet-map]");
  const status = container?.querySelector("[data-leaflet-map-status]");
  if (!container) return undefined;
  let active = true;
  let map;
  loadLeafletStyle();
  loadLeaflet().then((L) => {
    if (!active) return;
    const mapPosition = toGcj02(OFFICE.position);
    map = L.map(container, { zoomControl: true, scrollWheelZoom: false, attributionControl: true })
      .setView(mapPosition, 16);
    L.tileLayer(AMAP_TILE_URL, {
      maxZoom: 19,
      subdomains: "1234",
      attribution: '© <a href="https://ditu.amap.com/" target="_blank" rel="noreferrer">高德地图</a>'
    }).addTo(map);
    const markers = [
      { ...OFFICE, position: mapPosition },
      NANSHA_OFFICE
    ];
    markers.forEach((office) => {
      const marker = L.marker(office.position).addTo(map);
      marker.bindPopup(`<strong>${office.title}</strong><br>${office.address}`);
    });
    status?.remove();
    requestAnimationFrame(() => map?.invalidateSize());
  }).catch(() => {
    if (active && status) status.textContent = "地图暂时无法加载，可使用下方地址打开导航。";
  });
  return () => {
    active = false;
    map?.remove();
  };
}
