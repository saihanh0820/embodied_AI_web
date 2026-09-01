import { defineConfig, loadEnv } from "vite";
import legacy from "@vitejs/plugin-legacy";
import { cpSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function readProjectEnv(fileName) {
  const filePath = resolve(fileName);
  if (!existsSync(filePath)) return {};
  return Object.fromEntries(readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map(([, name, value]) => [name, value.replace(/^['"]|['"]$/g, "")]));
}

const environment = {
  ...readProjectEnv(".env"),
  ...loadEnv(process.env.NODE_ENV || "development", process.cwd(), ""),
  ...process.env
};
const apiPort = environment.API_PORT || "8787";
const apiProtocol = /^true$/i.test(environment.HTTPS_ENABLED || "false") ? "https" : "http";

function getHttpsOptions() {
  if (!/^true$/i.test(environment.HTTPS_ENABLED || "false")) return undefined;

  const keyPath = environment.HTTPS_KEY_PATH && resolve(environment.HTTPS_KEY_PATH);
  const certPath = environment.HTTPS_CERT_PATH && resolve(environment.HTTPS_CERT_PATH);
  if (!keyPath || !certPath || !existsSync(keyPath) || !existsSync(certPath)) {
    throw new Error("HTTPS_ENABLED=true requires readable HTTPS_KEY_PATH and HTTPS_CERT_PATH files.");
  }

  return { key: readFileSync(keyPath), cert: readFileSync(certPath) };
}

const copyManagedAssets = () => ({
  name: "copy-managed-assets",
  closeBundle() {
    const destination = resolve("dist/assets");
    mkdirSync(destination, { recursive: true });
    cpSync(resolve("assets/raw"), resolve(destination, "raw"), { recursive: true });
    cpSync(resolve("assets/images"), resolve(destination, "images"), { recursive: true });
  }
});

export default defineConfig(({ command }) => {
  const httpsOptions = command === "serve" ? getHttpsOptions() : undefined;
  return {
    server: {
      https: httpsOptions,
      proxy: {
        "/api": {
          target: `${apiProtocol}://127.0.0.1:${apiPort}`,
          secure: false
        }
      }
    },
    preview: {
      https: httpsOptions
    },
    plugins: [
      copyManagedAssets(),
      legacy({
        targets: ["defaults", "not IE 11"],
        modernTargets: [
          "edge >= 79",
          "firefox >= 67",
          "chrome >= 64",
          "safari >= 14.1",
          "chromeAndroid >= 64",
          "iOS >= 14.5"
        ],
        polyfills: true,
        modernPolyfills: ["es.string.replace-all"]
      })
    ],
    build: {
      cssTarget: "safari12"
    }
  };
});
