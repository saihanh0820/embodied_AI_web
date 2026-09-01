import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { get } from "node:https";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const environment = loadProjectEnv();
const apiPort = environment.API_PORT || "8787";
const httpsEnabled = /^true$/i.test(environment.HTTPS_ENABLED || "false");
const apiUrl = `${httpsEnabled ? "https" : "http"}://127.0.0.1:${apiPort}/api/health`;
let apiProcess;
let viteProcess;
let stopping = false;

async function apiIsRunning() {
  try {
    if (httpsEnabled) return await checkHttpsApi();
    const response = await fetch(apiUrl, { signal: AbortSignal.timeout(1_000) });
    return response.ok;
  } catch {
    return false;
  }
}

function loadProjectEnv() {
  const values = {};
  for (const fileName of [".env"]) {
    const filePath = resolve(root, fileName);
    if (!existsSync(filePath)) continue;
    for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match) values[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }
  }
  return { ...values, ...process.env };
}

function checkHttpsApi() {
  return new Promise((resolve) => {
    const request = get(apiUrl, { rejectUnauthorized: false, timeout: 1_000 }, (response) => {
      response.resume();
      resolve(response.statusCode === 200);
    });
    request.on("timeout", () => request.destroy());
    request.on("error", () => resolve(false));
  });
}

function start(command, args, label) {
  const process = spawn(command, args, { cwd: root, stdio: "inherit" });
  process.on("error", (error) => stop(`${label} could not start: ${error.message}`, 1));
  return process;
}

function stop(message, exitCode = 0) {
  if (stopping) return;
  stopping = true;
  if (message) console.log(`\n${message}`);
  viteProcess?.kill();
  apiProcess?.kill();
  process.exit(exitCode);
}

if (await apiIsRunning()) {
  console.log(`API is already running at ${apiUrl}.`);
} else {
  apiProcess = start(process.execPath, [resolve(root, "server.js")], "API");
  apiProcess.on("exit", (code) => {
    if (!stopping) stop(`API exited unexpectedly (code ${code ?? "unknown"}).`, 1);
  });
}

const viteBin = resolve(root, "node_modules", "vite", "bin", "vite.js");
viteProcess = start(process.execPath, [viteBin, "--host", "0.0.0.0", "--port", "4175", ...process.argv.slice(2)], "Vite");
viteProcess.on("exit", (code) => {
  if (!stopping) stop(`Vite exited (code ${code ?? "unknown"}).`, code || 0);
});

process.on("SIGINT", () => stop("Stopping development services."));
process.on("SIGTERM", () => stop("Stopping development services."));
