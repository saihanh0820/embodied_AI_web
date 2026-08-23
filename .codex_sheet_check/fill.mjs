import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/weimo/Downloads/软件使用合规信息收集表.xlsx";
const outputDir = "C:/Users/weimo/Desktop/weimou_web/outputs/software-compliance-filled";
await fs.mkdir(outputDir, { recursive: true });

const input = await FileBlob.load(sourcePath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheet = workbook.worksheets.getItem("填写表");

// 授权情况及开源合规字段（J:X）按用户要求留空；人员信息（Y:AA）未提供，亦留空。
const rows = [
  [1, "Node.js", "24.16.0", "开发工具", "网站本地 API、开发、构建与测试运行环境", "构建/部署环节使用（不随产品分发）", "无集成（独立使用）", "直接使用", "项目开发/部署环境"],
  [2, "npm", "11.13.0", "开发工具", "安装并管理前端项目依赖，执行开发、构建和测试脚本", "构建/部署环节使用（不随产品分发）", "无集成（独立使用）", "直接使用", "项目开发环境"],
  [3, "React", "19.2.4", "框架/运行时", "构建官网前端页面与交互界面", "集成到产品中（随产品分发）", "源码集成", "直接使用", "官网全部前端页面"],
  [4, "react-dom", "19.2.4", "第三方组件/SDK", "将 React 组件渲染到浏览器 DOM", "集成到产品中（随产品分发）", "源码集成", "直接使用", "官网全部前端页面"],
  [5, "Vite", "7.3.6", "开发工具", "前端开发服务器与生产构建", "构建/部署环节使用（不随产品分发）", "无集成（独立使用）", "直接使用", "项目开发与构建环境"],
  [6, "@vitejs/plugin-legacy", "7.2.1", "第三方组件/SDK", "为旧版浏览器生成兼容构建产物", "构建/部署环节使用（不随产品分发）", "无集成（独立使用）", "直接使用", "生产构建流程"],
  [7, "esbuild", "0.28.1", "开发工具", "支持前端依赖预构建与打包优化", "构建/部署环节使用（不随产品分发）", "无集成（独立使用）", "间接依赖（传递依赖）", "生产构建流程"],
  [8, "terser", "5.16.0", "开发工具", "压缩与优化前端 JavaScript 构建产物", "构建/部署环节使用（不随产品分发）", "无集成（独立使用）", "直接使用", "生产构建流程"],
  [9, "飞书开放平台多维表格 API", "未固定", "云服务/在线服务", "接收官网联系表单线索，并同步企业荣誉与新闻内容", "生产/运营工具（公司内部使用）", "云服务调用（不落地分发）", "直接使用", "官网生产环境"],
];

for (let index = 0; index < rows.length; index++) {
  const row = 3 + index;
  sheet.getRange(`A${row}:I${row}`).values = [rows[index]];
  sheet.getRange(`J${row}:X${row}`).clear({ applyTo: "contents" });
  sheet.getRange(`Y${row}:AA${row}`).clear({ applyTo: "contents" });
  sheet.getRange(`AB${row}`).values = [["2026-08-18"]];
}

const check = await workbook.inspect({ kind: "table", sheetId: "填写表", range: "A1:AB11", include: "values,formulas", tableMaxRows: 12, tableMaxCols: 28, maxChars: 9000 });
console.log(check.ndjson);
const preview = await workbook.render({ sheetName: "填写表", range: "A1:AB12", scale: 1.2, format: "png" });
await fs.writeFile(`${outputDir}/填写表预览.png`, new Uint8Array(await preview.arrayBuffer()));
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/软件使用合规信息收集表_已填写.xlsx`);
