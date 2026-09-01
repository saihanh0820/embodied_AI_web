const { spawn } = require("child_process");
const http = require("http");

const port = 8793;
const child = spawn(process.execPath, ["server.js"], {
  env: { ...process.env, API_PORT: String(port) },
  stdio: "ignore"
});

function finish(code) {
  child.kill();
  process.exit(code);
}

setTimeout(() => {
  const request = http.request({
    host: "127.0.0.1",
    port,
    path: encodeURI("/assets/raw/WMOX-22001-视频介绍.mp4"),
    headers: { Range: "bytes=0-1023" }
  }, (response) => {
    const passed = response.statusCode === 206
      && response.headers["content-length"] === "1024"
      && response.headers["content-range"]?.startsWith("bytes 0-1023/")
      && response.headers["accept-ranges"] === "bytes";
    console.log(JSON.stringify({
      status: response.statusCode,
      contentRange: response.headers["content-range"],
      contentLength: response.headers["content-length"],
      acceptRanges: response.headers["accept-ranges"]
    }));
    response.resume();
    response.on("end", () => finish(passed ? 0 : 1));
  });
  request.on("error", (error) => {
    console.error(error.message);
    finish(1);
  });
  request.end();
}, 600);

setTimeout(() => finish(1), 5000);
