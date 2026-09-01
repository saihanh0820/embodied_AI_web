const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const staticRoot = fs.existsSync(path.join(root, "dist", "index.html"))
  ? path.join(root, "dist")
  : root;
loadEnv(path.join(root, ".env"));
const port = Number(process.env.API_PORT || 8787);
const httpsEnabled = /^true$/i.test(String(process.env.HTTPS_ENABLED || "false").trim());
const httpsOptions = getHttpsOptions();
const configuredHonorCacheDir = process.env.FEISHU_HONORS_CACHE_DIR || path.join("data", "honors");
const honorCacheDir = path.resolve(root, configuredHonorCacheDir);
const honorImagesDir = path.join(honorCacheDir, "images");
const honorCacheFile = path.join(honorCacheDir, "honors.json");
const configuredHonorSyncIntervalMs = Number(process.env.FEISHU_HONORS_SYNC_INTERVAL_MS || 300_000);
const honorSyncIntervalMs = Number.isFinite(configuredHonorSyncIntervalMs)
  ? Math.max(30_000, configuredHonorSyncIntervalMs)
  : 300_000;
// Polling recovers changes when Feishu event callbacks are delayed or unavailable.
// Set FEISHU_HONORS_POLLING_ENABLED=false to opt out explicitly.
const honorPollingEnabled = /^true$/i.test(String(process.env.FEISHU_HONORS_POLLING_ENABLED || "true").trim());
const configuredNewsCacheDir = process.env.FEISHU_NEWS_CACHE_DIR || path.join("data", "news");
const newsCacheDir = path.resolve(root, configuredNewsCacheDir);
const newsImagesDir = path.join(newsCacheDir, "images");
const newsCacheFile = path.join(newsCacheDir, "news.json");
const configuredNewsSyncIntervalMs = Number(process.env.FEISHU_NEWS_SYNC_INTERVAL_MS || 300_000);
const newsSyncIntervalMs = Number.isFinite(configuredNewsSyncIntervalMs)
  ? Math.max(30_000, configuredNewsSyncIntervalMs)
  : 300_000;
// Keep the local cache fresh when Feishu event callbacks are unavailable.
// Set FEISHU_NEWS_POLLING_ENABLED=false to opt out explicitly.
const newsPollingEnabled = /^true$/i.test(String(process.env.FEISHU_NEWS_POLLING_ENABLED || "true").trim());
const wechatSyncEnabled = /^true$/i.test(String(process.env.WECHAT_NEWS_SYNC_ENABLED || "false").trim());
const configuredWechatSyncIntervalMs = Number(process.env.WECHAT_NEWS_SYNC_INTERVAL_MS || 300_000);
const wechatSyncIntervalMs = Number.isFinite(configuredWechatSyncIntervalMs)
  ? Math.max(60_000, configuredWechatSyncIntervalMs)
  : 300_000;
let tokenCache = { value: "", expiresAt: 0 };
let wechatTokenCache = { value: "", expiresAt: 0 };
const translationRequests = new Map();
const leadRateLimitWindowMs = readPositiveIntegerEnv("LEAD_RATE_LIMIT_WINDOW_MS", 60_000, 1_000);
const leadRateLimitMax = readPositiveIntegerEnv("LEAD_RATE_LIMIT_MAX", 5, 1);
const leadBurstWindowMs = readPositiveIntegerEnv("LEAD_BURST_WINDOW_MS", 10_000, 1_000);
const leadBurstMax = readPositiveIntegerEnv("LEAD_BURST_LIMIT_MAX", 2, 1);
const leadMaxConcurrent = readPositiveIntegerEnv("LEAD_MAX_CONCURRENT", 8, 1);
const leadDuplicateWindowMs = readPositiveIntegerEnv("LEAD_DUPLICATE_WINDOW_MS", 120_000, 10_000);
const leadBodyMaxBytes = readPositiveIntegerEnv("LEAD_BODY_MAX_BYTES", 8 * 1024, 1_024);
const trustProxy = /^true$/i.test(String(process.env.TRUST_PROXY || "false").trim());
const leadRateBuckets = new Map();
const leadDuplicateRequests = new Map();
const leadInFlight = new Map();
let activeLeadRequests = 0;
const leadLimitCleanup = setInterval(() => pruneLeadState(Date.now()), 60_000);
leadLimitCleanup.unref?.();
const translationLimitCleanup = setInterval(() => {
  const cutoff = Date.now() - 60_000;
  for (const [client, stamps] of translationRequests) {
    const recent = stamps.filter((stamp) => stamp > cutoff);
    if (recent.length) translationRequests.set(client, recent);
    else translationRequests.delete(client);
  }
}, 60_000);
translationLimitCleanup.unref?.();
let honorCache = readHonorCache();
let honorSyncPromise = null;
let honorSyncDebounceTimer = null;
let newsCache = readNewsCache();
let newsSyncPromise = null;
let newsSyncDebounceTimer = null;
let wechatSyncPromise = null;
let wechatLastSync = null;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".ico": "image/x-icon"
};

const server = (httpsEnabled ? https : http).createServer(httpsOptions, async (request, response) => {
  if (request.method === "GET" && request.url.split("?")[0] === "/api/health") {
    sendJson(response, 200, { ok: true });
    return;
  }
  if (request.method === "POST" && request.url.split("?")[0] === "/api/leads") {
    await handleLead(request, response);
    return;
  }
  if (request.method === "POST" && request.url.split("?")[0] === "/api/translate-captions") {
    await handleCaptionTranslation(request, response);
    return;
  }
  if (request.method === "GET" && request.url.split("?")[0] === "/api/honors") {
    await handleHonors(request, response);
    return;
  }
  if (request.method === "GET" && request.url.split("?")[0] === "/api/honors/image") {
    await handleHonorImage(request, response);
    return;
  }
  if (request.method === "POST" && request.url.split("?")[0] === "/api/feishu/events") {
    await handleFeishuEvent(request, response);
    return;
  }
  if (request.method === "GET" && request.url.split("?")[0] === "/api/wechat/callback") {
    await handleWechatCallback(request, response);
    return;
  }
  if (request.method === "POST" && request.url.split("?")[0] === "/api/wechat/sync") {
    await handleWechatSyncTrigger(request, response);
    return;
  }
  if (request.method === "GET" && request.url.split("?")[0] === "/api/wechat/status") {
    await handleWechatStatus(request, response);
    return;
  }
  if (request.method === "GET" && request.url.split("?")[0] === "/api/news") {
    await handleNews(request, response);
    return;
  }
  if (request.method === "GET" && request.url.split("?")[0] === "/api/news/image") {
    await handleNewsImage(request, response);
    return;
  }
  const clean = decodeURIComponent(request.url.split("?")[0]);
  const requested = clean === "/" ? "/index.html" : clean;
  const filePath = path.normalize(path.join(staticRoot, requested));

  if (!filePath.startsWith(staticRoot)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (error, stat) => {
    if (error) {
      fs.readFile(path.join(staticRoot, "index.html"), (fallbackError, fallback) => {
        if (fallbackError) {
          response.writeHead(404);
          response.end("Not found");
          return;
        }
        response.writeHead(200, { "Content-Type": types[".html"] });
        response.end(fallback);
      });
      return;
    }

    if (!stat.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    serveStaticFile(request, response, filePath, stat);
  });
});

// Keep slow or abandoned HTTP connections from occupying the API process indefinitely.
server.headersTimeout = 15_000;
server.requestTimeout = 15_000;
server.keepAliveTimeout = 5_000;

server.listen(port, "0.0.0.0", () => {
  const protocol = httpsEnabled ? "https" : "http";
  console.log(`Lead API: ${protocol}://127.0.0.1:${port}/api/leads`);
  const missingLeadConfig = getMissingLeadConfig();
  if (missingLeadConfig.length) {
    console.warn(`Lead submissions are disabled until these settings are configured: ${missingLeadConfig.join(", ")}`);
  }
  bootstrapHonorCache();
  bootstrapNewsCache();
  bootstrapWechatNewsSync();
});

function getHttpsOptions() {
  if (!httpsEnabled) return undefined;

  const keyPath = process.env.HTTPS_KEY_PATH && path.resolve(root, process.env.HTTPS_KEY_PATH);
  const certPath = process.env.HTTPS_CERT_PATH && path.resolve(root, process.env.HTTPS_CERT_PATH);
  if (!keyPath || !certPath) {
    throw new Error("HTTPS_ENABLED=true requires HTTPS_KEY_PATH and HTTPS_CERT_PATH.");
  }
  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    throw new Error("HTTPS certificate or key file was not found.");
  }

  return { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) };
}

function serveStaticFile(request, response, filePath, stat) {
  const extension = path.extname(filePath).toLowerCase();
  const headers = {
    "Content-Type": types[extension] || "application/octet-stream",
    "Accept-Ranges": "bytes",
    "Cache-Control": staticCacheControl(extension, request.url)
  };
  const range = request.headers.range;
  if (!range || extension !== ".mp4") {
    headers["Content-Length"] = stat.size;
    response.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(response);
    return;
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match) {
    response.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
    response.end();
    return;
  }
  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= stat.size) {
    response.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
    response.end();
    return;
  }

  headers["Content-Range"] = `bytes ${start}-${end}/${stat.size}`;
  headers["Content-Length"] = end - start + 1;
  response.writeHead(206, headers);
  fs.createReadStream(filePath, { start, end }).pipe(response);
}

function staticCacheControl(extension, requestUrl) {
  if (extension === ".mp4") return "public, max-age=86400";
  if (requestUrl.includes("/assets/")) return "public, max-age=86400, stale-while-revalidate=604800";
  return "no-cache";
}

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  fs.readFileSync(filePath, "utf8").split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) return;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  });
}

function readPositiveIntegerEnv(name, fallback, minimum) {
  const value = Number(process.env[name]);
  return Number.isInteger(value) && value >= minimum ? value : fallback;
}

function sendJson(response, status, body, extraHeaders = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...extraHeaders
  });
  response.end(JSON.stringify(body));
}

function readJson(request, maximumBytes = 16 * 1024) {
  return new Promise((resolve, reject) => {
    const contentLength = Number(request.headers["content-length"]);
    if (Number.isFinite(contentLength) && contentLength > maximumBytes) {
      const error = new Error("Request body is too large");
      error.code = "REQUEST_BODY_TOO_LARGE";
      reject(error);
      request.resume();
      return;
    }

    let body = "";
    let bodyBytes = 0;
    let rejected = false;
    request.on("data", (chunk) => {
      if (rejected) return;
      bodyBytes += Buffer.byteLength(chunk);
      if (bodyBytes > maximumBytes) {
        rejected = true;
        const error = new Error("Request body is too large");
        error.code = "REQUEST_BODY_TOO_LARGE";
        reject(error);
        request.resume();
        return;
      }
      body += chunk.toString("utf8");
    });
    request.on("end", () => {
      if (rejected) return;
      try { resolve(JSON.parse(body || "{}")); } catch { reject(new Error("Invalid JSON")); }
    });
    request.on("error", reject);
  });
}

function cleanText(value, maximum) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function getClientAddress(request) {
  if (trustProxy) {
    const forwardedFor = String(request.headers["x-forwarded-for"] || "")
      .split(",")
      .map((value) => value.trim())
      .find(Boolean);
    if (forwardedFor) return forwardedFor.slice(0, 128);
  }
  return String(request.socket.remoteAddress || "unknown").slice(0, 128);
}

function pruneLeadState(now) {
  for (const [client, stamps] of leadRateBuckets) {
    const recent = stamps.filter((stamp) => stamp > now - leadRateLimitWindowMs);
    if (recent.length) leadRateBuckets.set(client, recent);
    else leadRateBuckets.delete(client);
  }
  for (const [key, stamp] of leadDuplicateRequests) {
    if (stamp <= now - leadDuplicateWindowMs) leadDuplicateRequests.delete(key);
  }
}

function checkLeadRateLimit(client, now) {
  const recent = (leadRateBuckets.get(client) || [])
    .filter((stamp) => stamp > now - leadRateLimitWindowMs);
  const burst = recent.filter((stamp) => stamp > now - leadBurstWindowMs);
  const retryAt = recent[0] || now;
  if (recent.length >= leadRateLimitMax || burst.length >= leadBurstMax) {
    const window = burst.length >= leadBurstMax ? leadBurstWindowMs : leadRateLimitWindowMs;
    const firstInWindow = burst.length >= leadBurstMax ? burst[0] : retryAt;
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((firstInWindow + window - now) / 1000)) };
  }
  recent.push(now);
  leadRateBuckets.set(client, recent);
  while (leadRateBuckets.size > 10_000) leadRateBuckets.delete(leadRateBuckets.keys().next().value);
  return { allowed: true };
}

function enterLeadRequest(client) {
  if (activeLeadRequests >= leadMaxConcurrent || (leadInFlight.get(client) || 0) >= 1) return false;
  activeLeadRequests += 1;
  leadInFlight.set(client, (leadInFlight.get(client) || 0) + 1);
  return true;
}

function leaveLeadRequest(client) {
  activeLeadRequests = Math.max(0, activeLeadRequests - 1);
  const remaining = (leadInFlight.get(client) || 1) - 1;
  if (remaining > 0) leadInFlight.set(client, remaining);
  else leadInFlight.delete(client);
}

function rememberLeadSubmission(client, idempotencyKey, fields, now) {
  const fingerprint = crypto.createHash("sha256")
    .update(JSON.stringify(fields))
    .digest("hex");
  const keys = [
    idempotencyKey ? `${client}:idempotency:${idempotencyKey}` : "",
    `${client}:payload:${fingerprint}`
  ].filter(Boolean);
  if (keys.some((key) => {
    const previous = leadDuplicateRequests.get(key);
    return previous && previous > now - leadDuplicateWindowMs;
  })) return false;
  keys.forEach((key) => leadDuplicateRequests.set(key, now));
  return true;
}

async function handleLead(request, response) {
  const client = getClientAddress(request);
  const rate = checkLeadRateLimit(client, Date.now());
  if (!rate.allowed) {
    sendJson(response, 429, { message: "提交过于频繁，请稍后再试" }, { "Retry-After": String(rate.retryAfter) });
    return;
  }
  if (!enterLeadRequest(client)) {
    sendJson(response, 429, { message: "当前提交较多，请稍后再试" }, { "Retry-After": "5" });
    return;
  }

  try {
    const contentType = String(request.headers["content-type"] || "").toLowerCase();
    if (!contentType.startsWith("application/json")) {
      return sendJson(response, 415, { message: "请求格式不受支持" });
    }
    const lead = await readJson(request, leadBodyMaxBytes);
    if (!lead || typeof lead !== "object" || Array.isArray(lead)) {
      return sendJson(response, 400, { message: "提交内容无效" });
    }
    if (typeof lead.website === "string" && lead.website.trim()) {
      return sendJson(response, 400, { message: "提交内容无效" });
    }
    const fieldLimits = { name: 100, phone: 40, company: 200, email: 200, message: 2000 };
    const oversized = Object.entries(fieldLimits).find(([key, maximum]) => (
      typeof lead[key] !== "undefined" && (typeof lead[key] !== "string" || lead[key].trim().length > maximum)
    ));
    if (oversized) return sendJson(response, 400, { message: "提交内容长度不符合要求" });
    const fields = {
      name: cleanText(lead.name, 100), phone: cleanText(lead.phone, 40),
      company: cleanText(lead.company, 200), email: cleanText(lead.email, 200),
      message: cleanText(lead.message, 2000)
    };
    if (!fields.name || !fields.phone || !fields.company || !fields.email) {
      return sendJson(response, 400, { message: "姓名、电话、公司名称和邮箱不能为空" });
    }
    if (!/^[0-9+()\s-]{6,20}$/.test(fields.phone)) return sendJson(response, 400, { message: "电话格式不正确" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return sendJson(response, 400, { message: "邮箱格式不正确" });
    const idempotencyKey = String(request.headers["x-idempotency-key"] || "").trim();
    if (idempotencyKey && !/^[a-zA-Z0-9._:-]{16,128}$/.test(idempotencyKey)) {
      return sendJson(response, 400, { message: "提交标识无效" });
    }
    if (!rememberLeadSubmission(client, idempotencyKey, fields, Date.now())) {
      return sendJson(response, 409, { message: "请勿重复提交相同内容" });
    }
    const record = await createFeishuRecord(fields);
    sendJson(response, 201, { ok: true, recordId: record.record_id });
  } catch (error) {
    console.error("Lead submission failed:", error.message);
    if (error.code === "REQUEST_BODY_TOO_LARGE") {
      sendJson(response, 413, { message: "提交内容过大" });
    } else if (error.message === "Invalid JSON") {
      sendJson(response, 400, { message: "提交内容无效" });
    } else {
      sendJson(response, 500, { message: "暂时无法提交，请稍后重试" });
    }
  } finally {
    leaveLeadRequest(client);
  }
}

async function handleCaptionTranslation(request, response) {
  const client = getClientAddress(request);
  const now = Date.now();
  const requestLog = (translationRequests.get(client) || []).filter((stamp) => stamp > now - 60_000);
  if (requestLog.length >= 30) {
    sendJson(response, 429, { message: "Translation request limit reached" });
    return;
  }
  requestLog.push(now);
  translationRequests.set(client, requestLog);

  try {
    const input = await readJson(request);
    const sourceText = cleanText(input.sourceText, 1200);
    const sourceLanguage = cleanText(input.sourceLanguage, 12) || "zh";
    const targetLanguage = cleanText(input.targetLanguage, 12);
    if (!sourceText || !targetLanguage || !/^[a-z-]{2,12}$/i.test(sourceLanguage) || !/^[a-z-]{2,12}$/i.test(targetLanguage)) {
      sendJson(response, 400, { message: "Invalid caption translation request" });
      return;
    }
    const translation = await translateCaption(sourceText, sourceLanguage, targetLanguage);
    response.setHeader("Cache-Control", "private, max-age=86400");
    sendJson(response, 200, { translation });
  } catch (error) {
    console.error("Caption translation failed:", error.message);
    sendJson(response, 503, { message: "AI translation is temporarily unavailable" });
  }
}

async function translateCaption(sourceText, sourceLanguage, targetLanguage) {
  const endpoint = process.env.AI_TRANSLATION_URL;
  if (!endpoint) throw new Error("Missing configuration: AI_TRANSLATION_URL");
  const headers = { "Content-Type": "application/json" };
  if (process.env.AI_TRANSLATION_TOKEN) headers.Authorization = `Bearer ${process.env.AI_TRANSLATION_TOKEN}`;
  const translationResponse = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ sourceText, sourceLanguage, targetLanguage, format: "text" })
  });
  const result = await translationResponse.json().catch(() => ({}));
  const translation = cleanText(result.translation || result.translatedText || result.text, 1600);
  if (!translationResponse.ok || !translation) throw new Error(result.message || `Translation provider returned ${translationResponse.status}`);
  return translation;
}

async function handleHonors(request, response) {
  const cache = honorCache || readHonorCache();
  response.setHeader("Cache-Control", "no-store");
  sendJson(response, 200, {
    honors: cache?.honors || [],
    syncedAt: cache?.syncedAt || null,
    source: "local-cache",
    stale: !cache
  });
}

async function handleHonorImage(request, response) {
  await handleCachedImage(request, response, honorImagesDir, "honor");
}

async function handleNewsImage(request, response) {
  await handleCachedImage(request, response, newsImagesDir, "news");
}

async function handleCachedImage(request, response, imagesDir, label) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const fileName = url.searchParams.get("file") || "";
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,240}$/.test(fileName) || path.basename(fileName) !== fileName) {
    sendJson(response, 400, { message: "Invalid honor image" });
    return;
  }

  try {
    const filePath = path.resolve(imagesDir, fileName);
    if (path.dirname(filePath) !== path.resolve(imagesDir)) {
      sendJson(response, 400, { message: "Invalid honor image" });
      return;
    }
    const stat = await fs.promises.stat(filePath);
    if (!stat.isFile()) throw new Error("Honor image is not a file");
    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Content-Length": stat.size,
      "Cache-Control": "public, max-age=86400"
    });
    fs.createReadStream(filePath).pipe(response);
  } catch (error) {
    console.error(`${label} image fetch failed:`, error.message);
    sendJson(response, 404, { message: `${label} image is unavailable` });
  }
}

async function handleFeishuEvent(request, response) {
  try {
    const payload = await readJson(request);
    const eventToken = payload.token || payload.header?.token || payload.event?.token || "";
    if (!process.env.FEISHU_EVENT_VERIFICATION_TOKEN || eventToken !== process.env.FEISHU_EVENT_VERIFICATION_TOKEN) {
      sendJson(response, 403, { message: "Invalid Feishu event token" });
      return;
    }

    if (payload.type === "url_verification" && payload.challenge) {
      sendJson(response, 200, { challenge: payload.challenge });
      return;
    }

    const eventAppId = String(payload.header?.app_id || payload.app_id || "");
    if (eventAppId && process.env.FEISHU_APP_ID && eventAppId !== process.env.FEISHU_APP_ID) {
      sendJson(response, 403, { message: "Invalid Feishu event app" });
      return;
    }

    const eventType = String(payload.header?.event_type || payload.event_type || "");
    if (eventType.startsWith("bitable.app_table_")) {
      const eventTableId = String(
        payload.event?.table_id || payload.event?.tableId || payload.event?.table?.table_id || ""
      );
      const honorTableMatched = !eventTableId || eventTableId === process.env.FEISHU_HONORS_TABLE_ID;
      const newsTableMatched = !eventTableId || eventTableId === process.env.FEISHU_NEWS_TABLE_ID;
      if (honorTableMatched && process.env.FEISHU_HONORS_TABLE_ID) scheduleHonorCacheSync(eventType);
      if (newsTableMatched && process.env.FEISHU_NEWS_TABLE_ID) scheduleNewsCacheSync(eventType);
    }

    sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error("Feishu event handling failed:", error.message);
    sendJson(response, 400, { message: "Invalid Feishu event" });
  }
}

async function handleWechatCallback(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const signature = url.searchParams.get("signature") || "";
  const timestamp = url.searchParams.get("timestamp") || "";
  const nonce = url.searchParams.get("nonce") || "";
  const echostr = url.searchParams.get("echostr") || "";
  const callbackToken = process.env.WECHAT_CALLBACK_TOKEN || "";
  if (!callbackToken || !signature || !timestamp || !nonce) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Invalid WeChat callback configuration");
    return;
  }
  const expected = crypto.createHash("sha1")
    .update([callbackToken, timestamp, nonce].sort().join(""))
    .digest("hex");
  if (expected !== signature) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Invalid WeChat callback signature");
    return;
  }
  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(echostr);
}

async function handleWechatSyncTrigger(request, response) {
  const triggerToken = process.env.WECHAT_SYNC_TRIGGER_TOKEN || "";
  if (!triggerToken || request.headers["x-wechat-sync-token"] !== triggerToken) {
    sendJson(response, 403, { message: "Invalid WeChat sync token" });
    return;
  }
  try {
    const result = await syncWechatNewsToFeishu();
    sendJson(response, 200, result);
  } catch (error) {
    console.error("Manual WeChat sync failed:", error.message);
    sendJson(response, 502, { message: error.message });
  }
}

async function handleWechatStatus(request, response) {
  sendJson(response, 200, {
    enabled: wechatSyncEnabled,
    configured: isWechatSyncConfigured(),
    lastSync: wechatLastSync
  });
}

function bootstrapWechatNewsSync() {
  if (!wechatSyncEnabled) {
    console.log("WeChat article sync is disabled.");
    return;
  }
  if (!isWechatSyncConfigured()) {
    console.warn("WeChat article sync is enabled but not fully configured.");
    return;
  }
  syncWechatNewsToFeishu().catch((error) => {
    console.error("Initial WeChat article sync failed:", error.message);
  });
  const timer = setInterval(() => {
    syncWechatNewsToFeishu().catch((error) => {
      console.error("WeChat article sync failed:", error.message);
    });
  }, wechatSyncIntervalMs);
  timer.unref?.();
  console.log(`WeChat article sync enabled; polling every ${wechatSyncIntervalMs} ms.`);
}

function isWechatSyncConfigured() {
  return Boolean(
    process.env.WECHAT_MP_APP_ID &&
    process.env.WECHAT_MP_APP_SECRET &&
    process.env.FEISHU_APP_ID &&
    process.env.FEISHU_APP_SECRET &&
    (process.env.FEISHU_NEWS_APP_TOKEN || process.env.FEISHU_BITABLE_APP_TOKEN) &&
    process.env.FEISHU_NEWS_TABLE_ID
  );
}

function scheduleHonorCacheSync(eventType) {
  if (honorSyncDebounceTimer) clearTimeout(honorSyncDebounceTimer);
  honorSyncDebounceTimer = setTimeout(() => {
    honorSyncDebounceTimer = null;
    syncHonorsCache().catch((error) => {
      console.error(`Honor cache sync failed after ${eventType}:`, error.message);
    });
  }, 300);
  honorSyncDebounceTimer.unref?.();
}

function scheduleNewsCacheSync(eventType) {
  if (newsSyncDebounceTimer) clearTimeout(newsSyncDebounceTimer);
  newsSyncDebounceTimer = setTimeout(() => {
    newsSyncDebounceTimer = null;
    syncNewsCache().catch((error) => {
      console.error(`News cache sync failed after ${eventType}:`, error.message);
    });
  }, 300);
  newsSyncDebounceTimer.unref?.();
}

function bootstrapHonorCache() {
  if (!isHonorSyncConfigured()) {
    console.warn(`Honor cache is local-only; configure Feishu honor fields to enable sync: ${honorCacheFile}`);
    return;
  }
  syncHonorsCache().catch((error) => {
    console.error("Initial honor cache sync failed; keeping the previous local cache:", error.message);
  });
  if (!honorPollingEnabled) {
    console.log("Honor cache uses Feishu CRUD events; periodic polling is disabled.");
    return;
  }
  const timer = setInterval(() => {
    syncHonorsCache().catch((error) => {
      console.error("Honor cache sync failed; keeping the previous local cache:", error.message);
    });
  }, honorSyncIntervalMs);
  timer.unref?.();
  console.log(`Honor cache sync enabled; polling every ${honorSyncIntervalMs} ms.`);
}

function isHonorSyncConfigured() {
  return Boolean(
    process.env.FEISHU_HONORS_SYNC_ENABLED !== "false" &&
    process.env.FEISHU_APP_ID &&
    process.env.FEISHU_APP_SECRET &&
    (process.env.FEISHU_HONORS_APP_TOKEN || process.env.FEISHU_BITABLE_APP_TOKEN) &&
    process.env.FEISHU_HONORS_TABLE_ID
  );
}

function readHonorCache() {
  try {
    const cached = JSON.parse(fs.readFileSync(honorCacheFile, "utf8"));
    if (!cached || !Array.isArray(cached.honors)) return null;
    return cached;
  } catch {
    return null;
  }
}

async function syncHonorsCache() {
  if (honorSyncPromise) return honorSyncPromise;
  honorSyncPromise = (async () => {
    const previousCache = honorCache || readHonorCache();
    const previousById = new Map((previousCache?.honors || []).map((honor) => [honor.id, honor]));
    const remoteHonors = await listFeishuHonors();
    if (remoteHonors.length === 0 && previousCache?.honors?.length) {
      throw new Error("Feishu returned no honor records; preserving the previous local cache");
    }
    const honors = [];

    for (const honor of remoteHonors) {
      let imageFile = await cacheHonorImage(honor);
      if (!imageFile) {
        const previous = previousById.get(honor.id);
        if (previous?.imageFile && isSafeHonorFileName(previous.imageFile)) imageFile = previous.imageFile;
      }
      if (!imageFile) continue;
      honors.push({
        id: honor.id,
        category: honor.category,
        title: honor.title,
        order: honor.order,
        imageFile,
        imageUrl: `/api/honors/image?file=${encodeURIComponent(imageFile)}`
      });
    }

    if (remoteHonors.length > 0 && honors.length === 0 && previousCache?.honors?.length) {
      throw new Error("No honor images could be cached; preserving the previous local cache");
    }

    const nextCache = {
      version: 1,
      syncedAt: new Date().toISOString(),
      honors
    };
    await writeHonorCache(nextCache);
    honorCache = nextCache;
    console.log(`Honor cache synced: ${honors.length} records -> ${honorCacheFile}`);
    return nextCache;
  })().finally(() => {
    honorSyncPromise = null;
  });
  return honorSyncPromise;
}

async function cacheHonorImage(honor) {
  return cacheRemoteImage(honor, honorImagesDir, "honor");
}

async function cacheRemoteImage(honor, imagesDir, label) {
  const sourceKey = honor.imageToken || honor.sourceImageUrl;
  if (!sourceKey) return "";
  const digest = crypto.createHash("sha256").update(sourceKey).digest("hex").slice(0, 16);
  const extension = extensionForContentType(honor.imageContentType) || extensionForUrl(honor.sourceImageUrl) || ".bin";
  try {
    await fs.promises.mkdir(imagesDir, { recursive: true });
    const prefix = `${safeHonorFilePart(honor.id)}-${digest}`;
    const existingFile = (await fs.promises.readdir(imagesDir))
      .find((name) => name.startsWith(`${prefix}.`) && isSafeHonorFileName(name));
    if (existingFile) {
      const existing = await fs.promises.stat(path.join(imagesDir, existingFile));
      if (existing.isFile() && existing.size > 0) return existingFile;
    }

    const image = await fetchHonorImage(honor);
    const contentType = image.headers.get("content-type") || "application/octet-stream";
    const data = Buffer.from(await image.arrayBuffer());
    const maxBytes = Math.max(1_024_000, Number(process.env.FEISHU_HONORS_MAX_IMAGE_BYTES || 20 * 1024 * 1024));
    if (data.length > maxBytes) throw new Error(`Honor image exceeds ${maxBytes} bytes`);
    const actualExtension = extensionForContentType(contentType) || extension;
    const actualFileName = `${safeHonorFilePart(honor.id)}-${digest}${actualExtension}`;
    const actualTargetPath = path.join(imagesDir, actualFileName);
    await writeFileAtomically(actualTargetPath, data);
    return actualFileName;
  } catch (error) {
    console.error(`Could not cache ${label} image ${honor.id}:`, error.message);
    return "";
  }
}

async function fetchHonorImage(honor) {
  if (honor.imageToken) {
    const token = await getTenantAccessToken();
    const response = await fetch(`https://open.feishu.cn/open-apis/drive/v1/medias/${encodeURIComponent(honor.imageToken)}/download`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error(`Feishu returned ${response.status}`);
    return response;
  }
  if (!/^https?:\/\//i.test(honor.sourceImageUrl || "")) throw new Error("Honor image has no downloadable URL");
  const response = await fetch(honor.sourceImageUrl);
  if (!response.ok) throw new Error(`Image source returned ${response.status}`);
  return response;
}

function safeHonorFilePart(value) {
  return String(value || "honor").replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 80) || "honor";
}

function isSafeHonorFileName(value) {
  return typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9._-]{0,240}$/.test(value) && path.basename(value) === value;
}

function extensionForUrl(value) {
  try {
    const extension = path.extname(new URL(value).pathname).toLowerCase();
    return /^\.(png|jpe?g|webp|gif|svg)$/.test(extension) ? extension : "";
  } catch {
    return "";
  }
}

function extensionForContentType(value) {
  const contentType = String(value || "").split(";", 1)[0].toLowerCase();
  return ({
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/svg+xml": ".svg"
  })[contentType] || "";
}

async function writeHonorCache(cache) {
  await fs.promises.mkdir(honorCacheDir, { recursive: true });
  await writeFileAtomically(honorCacheFile, `${JSON.stringify(cache, null, 2)}\n`);
}

async function writeFileAtomically(filePath, data) {
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  try {
    await fs.promises.writeFile(tempPath, data);
    try {
      await fs.promises.rename(tempPath, filePath);
    } catch (error) {
      if (!/^(EEXIST|EPERM)$/.test(error.code || "")) throw error;
      await fs.promises.rm(filePath, { force: true });
      await fs.promises.rename(tempPath, filePath);
    }
  } finally {
    await fs.promises.rm(tempPath, { force: true }).catch(() => {});
  }
}

async function handleNews(request, response) {
  const cache = newsCache || readNewsCache();
  sendJson(response, 200, {
    news: cache?.news || [],
    syncedAt: cache?.syncedAt || null,
    source: "local-cache",
    stale: !cache
  }, { "Cache-Control": "public, max-age=30, stale-while-revalidate=300" });
}

function bootstrapNewsCache() {
  if (!isNewsSyncConfigured()) {
    console.warn(`News cache is local-only; configure Feishu news fields to enable sync: ${newsCacheFile}`);
    return;
  }
  syncNewsCache().catch((error) => {
    console.error("Initial news cache sync failed; keeping the previous local cache:", error.message);
  });
  if (!newsPollingEnabled) {
    console.log("News cache uses Feishu CRUD events; periodic polling is disabled.");
    return;
  }
  const timer = setInterval(() => {
    syncNewsCache().catch((error) => {
      console.error("News cache sync failed; keeping the previous local cache:", error.message);
    });
  }, newsSyncIntervalMs);
  timer.unref?.();
  console.log(`News cache sync enabled; polling every ${newsSyncIntervalMs} ms.`);
}

function isNewsSyncConfigured() {
  return Boolean(
    process.env.FEISHU_NEWS_SYNC_ENABLED !== "false" &&
    process.env.FEISHU_APP_ID &&
    process.env.FEISHU_APP_SECRET &&
    (process.env.FEISHU_NEWS_APP_TOKEN || process.env.FEISHU_BITABLE_APP_TOKEN) &&
    process.env.FEISHU_NEWS_TABLE_ID
  );
}

function readNewsCache() {
  try {
    const cached = JSON.parse(fs.readFileSync(newsCacheFile, "utf8"));
    if (!cached || !Array.isArray(cached.news)) return null;
    return cached;
  } catch {
    return null;
  }
}

async function syncNewsCache() {
  if (newsSyncPromise) return newsSyncPromise;
  newsSyncPromise = (async () => {
    const previousCache = newsCache || readNewsCache();
    const previousById = new Map((previousCache?.news || []).map((item) => [item.id, item]));
    const remoteNews = await listFeishuNews();
    const news = [];

    for (const item of remoteNews) {
      const previous = previousById.get(item.id);
      let imageFile = "";
      if (item.imageToken || item.sourceImageUrl) imageFile = await cacheRemoteImage(item, newsImagesDir, "news");
      if (!imageFile && (item.imageToken || item.sourceImageUrl)) {
        if (previous?.imageFile && isSafeHonorFileName(previous.imageFile)) imageFile = previous.imageFile;
      }
      let homeImageFile = "";
      if (item.homeImageToken || item.homeSourceImageUrl) {
        homeImageFile = await cacheRemoteImage({
          id: `${item.id}-home`,
          imageToken: item.homeImageToken,
          sourceImageUrl: item.homeSourceImageUrl
        }, newsImagesDir, "home news");
      }
      if (!homeImageFile && (item.homeImageToken || item.homeSourceImageUrl)) {
        if (previous?.homeImageFile && isSafeHonorFileName(previous.homeImageFile)) homeImageFile = previous.homeImageFile;
      }
      const titleEn = await resolveNewsTranslation(item.title, item.titleEn, previous?.title === item.title ? previous.titleEn : "");
      const summaryEn = await resolveNewsTranslation(item.summary, item.summaryEn, previous?.summary === item.summary ? previous.summaryEn : "");
      news.push({
        id: item.id,
        title: item.title,
        titleEn,
        date: item.date,
        category: item.category,
        tag: item.tag,
        summary: item.summary,
        summaryEn,
        featured: item.featured,
        order: item.order,
        link: item.link,
        imageFile,
        imageUrl: imageFile ? `/api/news/image?file=${encodeURIComponent(imageFile)}` : "",
        homeImageFile,
        homeImageUrl: homeImageFile ? `/api/news/image?file=${encodeURIComponent(homeImageFile)}` : ""
      });
    }

    if (remoteNews.length > 0 && news.length === 0 && previousCache?.news?.length) {
      throw new Error("No news images could be cached; preserving the previous local cache");
    }

    const nextCache = {
      version: 1,
      syncedAt: new Date().toISOString(),
      news
    };
    await fs.promises.mkdir(newsCacheDir, { recursive: true });
    await writeFileAtomically(newsCacheFile, `${JSON.stringify(nextCache, null, 2)}\n`);
    newsCache = nextCache;
    console.log(`News cache synced: ${news.length} records -> ${newsCacheFile}`);
    return nextCache;
  })().finally(() => {
    newsSyncPromise = null;
  });
  return newsSyncPromise;
}

function isNewsAutoTranslationEnabled() {
  return Boolean(process.env.AI_TRANSLATION_URL) && process.env.FEISHU_NEWS_AUTO_TRANSLATE !== "false";
}

async function resolveNewsTranslation(sourceText, suppliedTranslation, cachedTranslation) {
  if (suppliedTranslation) return suppliedTranslation;
  if (cachedTranslation) return cachedTranslation;
  if (!sourceText || !isNewsAutoTranslationEnabled()) return "";
  try {
    return await translateCaption(sourceText, "zh", "en");
  } catch (error) {
    console.error("News translation failed; retaining the source text:", error.message);
    return "";
  }
}

async function listFeishuNews() {
  const tableId = process.env.FEISHU_NEWS_TABLE_ID;
  if (!tableId) throw new Error("Missing configuration: FEISHU_NEWS_TABLE_ID");
  const appToken = process.env.FEISHU_NEWS_APP_TOKEN || process.env.FEISHU_BITABLE_APP_TOKEN;
  const config = ["FEISHU_APP_ID", "FEISHU_APP_SECRET"];
  if (!appToken) config.push("FEISHU_NEWS_APP_TOKEN or FEISHU_BITABLE_APP_TOKEN");
  const missing = config.filter((key) => !process.env[key]);
  if (missing.length) throw new Error(`Missing configuration: ${missing.join(", ")}`);

  const token = await getTenantAccessToken();
  const records = await listAllFeishuRecords(appToken, tableId, token);

  const fieldNames = {
    titleEn: process.env.FEISHU_NEWS_FIELD_TITLE_EN || "英文标题",
    summaryEn: process.env.FEISHU_NEWS_FIELD_SUMMARY_EN || "",
    title: process.env.FEISHU_NEWS_FIELD_TITLE || "标题",
    date: process.env.FEISHU_NEWS_FIELD_DATE || "发布日期",
    category: process.env.FEISHU_NEWS_FIELD_CATEGORY || "分类",
    tag: process.env.FEISHU_NEWS_FIELD_TAG || "标签",
    summary: process.env.FEISHU_NEWS_FIELD_SUMMARY || "摘要",
    image: process.env.FEISHU_NEWS_FIELD_IMAGE || "封面图",
    homeImage: process.env.FEISHU_NEWS_FIELD_HOME_IMAGE || "首页底栏新闻信息图",
    order: process.env.FEISHU_NEWS_FIELD_ORDER || "排序",
    featured: process.env.FEISHU_NEWS_FIELD_FEATURED || "首页推荐",
    published: process.env.FEISHU_NEWS_FIELD_PUBLISHED || "官网展示",
    link: process.env.FEISHU_NEWS_FIELD_LINK || "详情链接"
  };
  return records
    .filter((record) => isPublished(record.fields?.[fieldNames.published]))
    .map((record) => mapNewsRecord(record, fieldNames))
    .filter((item) => item.title && hasNewsYear(item.date))
    .sort((left, right) => left.order - right.order || right.date.localeCompare(left.date, "zh-CN"));
}

function getNewsFieldNames() {
  return {
    titleEn: process.env.FEISHU_NEWS_FIELD_TITLE_EN || "英文标题",
    summaryEn: process.env.FEISHU_NEWS_FIELD_SUMMARY_EN || "",
    title: process.env.FEISHU_NEWS_FIELD_TITLE || "标题",
    date: process.env.FEISHU_NEWS_FIELD_DATE || "发布日期",
    category: process.env.FEISHU_NEWS_FIELD_CATEGORY || "分类",
    tag: process.env.FEISHU_NEWS_FIELD_TAG || "标签",
    summary: process.env.FEISHU_NEWS_FIELD_SUMMARY || "摘要",
    image: process.env.FEISHU_NEWS_FIELD_IMAGE || "封面图",
    homeImage: process.env.FEISHU_NEWS_FIELD_HOME_IMAGE || "首页底栏新闻信息图",
    order: process.env.FEISHU_NEWS_FIELD_ORDER || "排序",
    featured: process.env.FEISHU_NEWS_FIELD_FEATURED || "首页推荐",
    published: process.env.FEISHU_NEWS_FIELD_PUBLISHED || "官网展示",
    link: process.env.FEISHU_NEWS_FIELD_LINK || "详情链接"
  };
}

/*
  return {
    title: process.env.FEISHU_NEWS_FIELD_TITLE || "标题",
    date: process.env.FEISHU_NEWS_FIELD_DATE || "发布日期",
    category: process.env.FEISHU_NEWS_FIELD_CATEGORY || "分类",
    tag: process.env.FEISHU_NEWS_FIELD_TAG || "标签",
    summary: process.env.FEISHU_NEWS_FIELD_SUMMARY || "摘要",
    image: process.env.FEISHU_NEWS_FIELD_IMAGE || "封面图",
    order: process.env.FEISHU_NEWS_FIELD_ORDER || "排序",
    featured: process.env.FEISHU_NEWS_FIELD_FEATURED || "首页推荐",
    published: process.env.FEISHU_NEWS_FIELD_PUBLISHED || "官网展示",
    link: process.env.FEISHU_NEWS_FIELD_LINK || "详情链接"
  };
}
*/

async function listAllFeishuRecords(appToken, tableId, token) {
  const records = [];
  let pageToken = "";
  do {
    const query = new URLSearchParams({ page_size: "100" });
    if (pageToken) query.set("page_token", pageToken);
    const result = await feishuFetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records?${query}`,
      token
    );
    records.push(...(result.data.items || []));
    pageToken = result.data.has_more ? result.data.page_token : "";
  } while (pageToken);
  return records;
}

async function syncWechatNewsToFeishu() {
  if (wechatSyncPromise) return wechatSyncPromise;
  wechatSyncPromise = (async () => {
    if (!isWechatSyncConfigured()) throw new Error("Missing WeChat or Feishu sync configuration");
    const appToken = process.env.FEISHU_NEWS_APP_TOKEN || process.env.FEISHU_BITABLE_APP_TOKEN;
    const tableId = process.env.FEISHU_NEWS_TABLE_ID;
    const feishuToken = await getTenantAccessToken();
    const records = await listAllFeishuRecords(appToken, tableId, feishuToken);
    const fieldNames = getNewsFieldNames();
    const articles = await listWechatPublishedArticles();
    const byLink = new Map();
    for (const record of records) {
      const link = normalizeNewsLink(readFieldText(record.fields?.[fieldNames.link]));
      if (link) byLink.set(link, record);
    }

    const result = { fetched: articles.length, created: 0, updated: 0, skipped: 0, failed: 0, errors: [] };
    for (const article of articles) {
      const existing = byLink.get(article.link);
      try {
        let imageToken = "";
        if (!existing || /^true$/i.test(String(process.env.WECHAT_SYNC_UPDATE_EXISTING || "true"))) {
          imageToken = await uploadWechatCoverToFeishu(article, appToken, feishuToken);
        }
        const fields = buildWechatNewsFields(article, fieldNames, imageToken, existing);
        if (existing) {
          if (!/^true$/i.test(String(process.env.WECHAT_SYNC_UPDATE_EXISTING || "true"))) {
            result.skipped += 1;
            continue;
          }
          await updateFeishuNewsRecord(appToken, tableId, existing.record_id, fields, feishuToken);
          result.updated += 1;
        } else {
          const created = await createFeishuNewsRecord(appToken, tableId, fields, feishuToken);
          byLink.set(article.link, created);
          result.created += 1;
        }
      } catch (error) {
        result.failed += 1;
        result.errors.push({ title: article.title, message: error.message });
        console.error(`Could not sync WeChat article ${article.title}:`, error.message);
      }
    }
    wechatLastSync = { at: new Date().toISOString(), ...result };
    console.log(`WeChat articles synced: ${result.created} created, ${result.updated} updated, ${result.failed} failed.`);
    return result;
  })().finally(() => {
    wechatSyncPromise = null;
  });
  return wechatSyncPromise;
}

async function listWechatPublishedArticles() {
  const token = await getWechatAccessToken();
  const articles = [];
  const batchSize = Math.min(20, Math.max(1, Number(process.env.WECHAT_NEWS_BATCH_SIZE || 20)));
  const maxArticles = Math.max(batchSize, Number(process.env.WECHAT_NEWS_MAX_ARTICLES || 100));
  let offset = 0;
  while (articles.length < maxArticles) {
    const result = await wechatFetch(
      `https://api.weixin.qq.com/cgi-bin/freepublish/batchget?access_token=${encodeURIComponent(token)}`,
      { method: "POST", body: { offset, count: Math.min(batchSize, maxArticles - articles.length), no_content: 1 } }
    );
    const items = Array.isArray(result.item) ? result.item : [];
    for (const item of items) articles.push(...extractWechatNewsItems(item));
    if (!items.length || items.length < batchSize) break;
    offset += items.length;
  }
  return articles.filter((article) => article.title && article.link).slice(0, maxArticles);
}

function extractWechatNewsItems(item) {
  const content = item?.content || item || {};
  const list = Array.isArray(content.news_item)
    ? content.news_item
    : Array.isArray(item?.news_item) ? item.news_item : [content];
  return list.map((newsItem) => ({
    articleId: String(item?.article_id || newsItem?.article_id || ""),
    title: readWechatText(newsItem?.title),
    digest: readWechatText(newsItem?.digest || ""),
    link: normalizeNewsLink(readWechatText(newsItem?.url || newsItem?.content_source_url)),
    coverMediaId: readWechatText(newsItem?.thumb_media_id),
    publishTime: Number(item?.update_time || item?.create_time || newsItem?.update_time || 0)
  }));
}

function readWechatText(value) {
  return value == null ? "" : String(value).trim();
}

function buildWechatNewsFields(article, fieldNames, imageToken, existing) {
  const fields = {
    [fieldNames.title]: article.title,
    [fieldNames.date]: article.publishTime > 0 ? article.publishTime * 1000 : Date.now(),
    [fieldNames.category]: process.env.WECHAT_NEWS_CATEGORY || "company",
    [fieldNames.tag]: process.env.WECHAT_NEWS_TAG || "微信公众号",
    [fieldNames.summary]: article.digest.slice(0, 1000),
    [fieldNames.link]: article.link,
    [fieldNames.published]: true
  };
  const configuredOrder = Number(process.env.WECHAT_NEWS_ORDER);
  if (process.env.WECHAT_NEWS_ORDER !== undefined && Number.isFinite(configuredOrder)) {
    fields[fieldNames.order] = configuredOrder;
  }
  if (imageToken) fields[fieldNames.image] = [{ file_token: imageToken }];
  else if (existing?.fields?.[fieldNames.image]) fields[fieldNames.image] = existing.fields[fieldNames.image];
  return fields;
}

async function createFeishuNewsRecord(appToken, tableId, fields, token) {
  const result = await feishuFetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`,
    token,
    { method: "POST", body: { fields } }
  );
  return result.data.record;
}

async function updateFeishuNewsRecord(appToken, tableId, recordId, fields, token) {
  return feishuFetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records/${encodeURIComponent(recordId)}`,
    token,
    { method: "PUT", body: { fields } }
  );
}

async function uploadWechatCoverToFeishu(article, appToken, feishuToken) {
  if (!article.coverMediaId) return "";
  const wechatToken = await getWechatAccessToken();
  const image = await fetchWechatMedia(wechatToken, article.coverMediaId);
  const contentType = image.headers.get("content-type") || "image/jpeg";
  const data = Buffer.from(await image.arrayBuffer());
  const maxBytes = Math.max(1_024_000, Number(process.env.WECHAT_NEWS_MAX_IMAGE_BYTES || 20 * 1024 * 1024));
  if (data.length > maxBytes) throw new Error(`WeChat cover exceeds ${maxBytes} bytes`);
  return uploadFileToFeishu(appToken, feishuToken, data, contentType, `${safeHonorFilePart(article.title)}.jpg`);
}

async function fetchWechatMedia(token, mediaId) {
  const response = await fetch(
    `https://api.weixin.qq.com/cgi-bin/material/get?access_token=${encodeURIComponent(token)}&media_id=${encodeURIComponent(mediaId)}`
  );
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok) throw new Error(`WeChat media returned ${response.status}`);
  if (contentType.includes("application/json")) {
    const result = await response.json();
    throw new Error(result.errmsg || "Could not download WeChat cover");
  }
  return response;
}

async function uploadFileToFeishu(appToken, token, data, contentType, fileName) {
  const form = new FormData();
  const blob = new Blob([data], { type: contentType });
  form.append("file_name", fileName);
  form.append("parent_type", "bitable_file");
  form.append("parent_node", appToken);
  form.append("size", String(data.length));
  form.append("file", blob, fileName);
  const response = await fetch("https://open.feishu.cn/open-apis/drive/v1/medias/upload_all", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form
  });
  const result = await response.json();
  if (!response.ok || result.code) throw new Error(result.msg || "Could not upload file to Feishu");
  return result.data?.file_token || "";
}

function mapNewsRecord(record, fieldNames) {
  const fields = record.fields || {};
  const imageValue = fields[fieldNames.image];
  const image = Array.isArray(imageValue) ? imageValue[0] : imageValue && typeof imageValue === "object" ? imageValue : null;
  const homeImageValue = fields[fieldNames.homeImage];
  const homeImage = Array.isArray(homeImageValue) ? homeImageValue[0] : homeImageValue && typeof homeImageValue === "object" ? homeImageValue : null;
  const orderText = readFieldText(fields[fieldNames.order]);
  const order = Number(orderText);
  const categoryText = readFieldText(fields[fieldNames.category]);
  const titleEn = fieldNames.titleEn ? readFieldText(fields[fieldNames.titleEn]) : "";
  const summaryEn = fieldNames.summaryEn ? readFieldText(fields[fieldNames.summaryEn]) : "";
  return {
    id: record.record_id,
    titleEn,
    title: readFieldText(fields[fieldNames.title]),
    date: normalizeNewsDate(fields[fieldNames.date]),
    category: normalizeNewsCategory(categoryText),
    tag: readFieldText(fields[fieldNames.tag]) || categoryText || "行业新闻",
    summary: readFieldText(fields[fieldNames.summary]),
    summaryEn,
    featured: isFeaturedNews(fields[fieldNames.featured]),
    order: orderText && Number.isFinite(order) ? order : Number.POSITIVE_INFINITY,
    link: normalizeNewsLink(readFieldText(fields[fieldNames.link])),
    imageToken: image?.file_token || image?.fileToken || "",
    sourceImageUrl: image?.tmp_url || image?.url || "",
    homeImageToken: homeImage?.file_token || homeImage?.fileToken || "",
    homeSourceImageUrl: homeImage?.tmp_url || homeImage?.url || ""
  };
}

function normalizeNewsDate(value) {
  const text = readFieldText(value);
  if (!text) return "";
  if (/^\d{10,13}$/.test(text)) {
    const date = new Date(Number(text.length === 10 ? `${text}000` : text));
    if (!Number.isNaN(date.getTime())) {
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        .map((part, index) => index === 0 ? String(part) : String(part).padStart(2, "0"))
        .join(".");
    }
  }
  const match = text.match(/(\d{4})[./-](\d{1,2})[./-](\d{1,2})/);
  if (match) return `${match[1]}.${match[2].padStart(2, "0")}.${match[3].padStart(2, "0")}`;
  return text;
}

function hasNewsYear(value) {
  return /\d{4}/.test(String(value || ""));
}

function normalizeNewsCategory(value) {
  const category = String(value || "").trim().toLowerCase();
  if (["company", "企业新闻", "具身智能社团动态", "公司新闻"].includes(category)) return "company";
  if (["knowledge", "知识科普", "科普文章"].includes(category)) return "knowledge";
  if (["media", "媒体报道", "行业资讯", "行业新闻"].includes(category)) return "media";
  return "media";
}

function isFeaturedNews(value) {
  if (value === undefined || value === null || value === "") return false;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  return ["true", "1", "yes", "是", "推荐", "首页推荐"].includes(readFieldText(value).toLowerCase());
}

function normalizeNewsLink(value) {
  return /^https?:\/\//i.test(value) ? value : "";
}

async function createFeishuRecord(lead) {
  const missing = getMissingLeadConfig();
  if (missing.length) throw new Error(`Missing configuration: ${missing.join(", ")}`);
  const token = await getTenantAccessToken();
  const fieldNames = {
    name: process.env.FEISHU_FIELD_NAME || "姓名", phone: process.env.FEISHU_FIELD_PHONE || "电话",
    company: process.env.FEISHU_FIELD_COMPANY || "公司名称", email: process.env.FEISHU_FIELD_EMAIL || "邮箱",
    message: process.env.FEISHU_FIELD_MESSAGE || "留言内容"
  };
  const fields = Object.fromEntries(Object.entries(lead).filter(([, value]) => value).map(([key, value]) => [fieldNames[key], value]));
  const result = await feishuFetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BITABLE_APP_TOKEN}/tables/${process.env.FEISHU_BITABLE_TABLE_ID}/records`, token, { method: "POST", body: { fields } });
  return result.data.record;
}

function getMissingLeadConfig() {
  return ["FEISHU_APP_ID", "FEISHU_APP_SECRET", "FEISHU_BITABLE_APP_TOKEN", "FEISHU_BITABLE_TABLE_ID"]
    .filter((key) => !process.env[key]);
}

async function listFeishuHonors() {
  const tableId = process.env.FEISHU_HONORS_TABLE_ID;
  if (!tableId) throw new Error("Missing configuration: FEISHU_HONORS_TABLE_ID");
  const appToken = process.env.FEISHU_HONORS_APP_TOKEN || process.env.FEISHU_BITABLE_APP_TOKEN;
  const config = ["FEISHU_APP_ID", "FEISHU_APP_SECRET"];
  if (!appToken) config.push("FEISHU_HONORS_APP_TOKEN or FEISHU_BITABLE_APP_TOKEN");
  const missing = config.filter((key) => !process.env[key]);
  if (missing.length) throw new Error(`Missing configuration: ${missing.join(", ")}`);

  const token = await getTenantAccessToken();
  const records = [];
  let pageToken = "";
  do {
    const query = new URLSearchParams({ page_size: "100" });
    if (pageToken) query.set("page_token", pageToken);
    const result = await feishuFetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records?${query}`, token);
    records.push(...(result.data.items || []));
    pageToken = result.data.has_more ? result.data.page_token : "";
  } while (pageToken);

  const fieldNames = {
    category: process.env.FEISHU_HONORS_FIELD_CATEGORY || "分类",
    title: process.env.FEISHU_HONORS_FIELD_TITLE || "荣誉名称",
    image: process.env.FEISHU_HONORS_FIELD_IMAGE || "图片",
    order: process.env.FEISHU_HONORS_FIELD_ORDER || "排序",
    published: process.env.FEISHU_HONORS_FIELD_PUBLISHED || "官网展示"
  };
  return records
    .filter((record) => isPublished(record.fields[fieldNames.published]))
    .map((record) => mapHonorRecord(record, fieldNames))
    .filter((honor) => honor.imageToken || honor.sourceImageUrl)
    .sort((left, right) => left.order - right.order || left.title.localeCompare(right.title, "zh-CN"));
}

function mapHonorRecord(record, fieldNames) {
  const fields = record.fields || {};
  const imageValue = fields[fieldNames.image];
  const image = Array.isArray(imageValue) ? imageValue[0] : imageValue && typeof imageValue === "object" ? imageValue : null;
  const imageToken = image?.file_token || image?.fileToken || "";
  const orderText = readFieldText(fields[fieldNames.order]);
  const order = Number(orderText);
  return {
    id: record.record_id,
    category: normalizeHonorCategory(readFieldText(fields[fieldNames.category])),
    title: readFieldText(fields[fieldNames.title]) || "企业荣誉",
    imageToken,
    sourceImageUrl: image?.tmp_url || image?.url || "",
    order: orderText && Number.isFinite(order) ? order : Number.POSITIVE_INFINITY
  };
}

function readFieldText(value) {
  if (Array.isArray(value)) return value.map(readFieldText).filter(Boolean).join(" ");
  if (value && typeof value === "object") return value.text || value.name || "";
  return value == null ? "" : String(value).trim();
}

function isPublished(value) {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  const text = readFieldText(value).toLowerCase();
  return !["false", "0", "no", "否", "不展示"].includes(text);
}

function normalizeHonorCategory(value) {
  const category = value.toLowerCase();
  if (["patent", "发明专利", "专利"].includes(category)) return "patent";
  if (["academic", "学术成果", "学术"].includes(category)) return "academic";
  return "award";
}

async function getTenantAccessToken() {
  if (tokenCache.value && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.value;
  const response = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: process.env.FEISHU_APP_ID, app_secret: process.env.FEISHU_APP_SECRET })
  });
  const result = await response.json();
  if (!response.ok || result.code) throw new Error(result.msg || "Could not get Feishu access token");
  tokenCache = { value: result.tenant_access_token, expiresAt: Date.now() + result.expire * 1000 };
  return tokenCache.value;
}

async function getWechatAccessToken() {
  if (wechatTokenCache.value && wechatTokenCache.expiresAt > Date.now() + 60_000) return wechatTokenCache.value;
  const appId = process.env.WECHAT_MP_APP_ID;
  const appSecret = process.env.WECHAT_MP_APP_SECRET;
  if (!appId || !appSecret) throw new Error("Missing configuration: WECHAT_MP_APP_ID, WECHAT_MP_APP_SECRET");
  const response = await fetch(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${encodeURIComponent(appId)}&secret=${encodeURIComponent(appSecret)}`
  );
  const result = await response.json();
  if (!response.ok || result.errcode) throw new Error(result.errmsg || "Could not get WeChat access token");
  wechatTokenCache = { value: result.access_token, expiresAt: Date.now() + Number(result.expires_in || 7200) * 1000 };
  return wechatTokenCache.value;
}

async function wechatFetch(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const result = await response.json();
  if (!response.ok || result.errcode) throw new Error(result.errmsg || "Could not complete WeChat request");
  return result;
}

async function feishuFetch(url, token, options = {}) {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const result = await response.json();
  if (!response.ok || result.code) throw new Error(result.msg || "Could not complete Feishu request");
  return result;
}
