import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
import fs from "node:fs/promises";

const input = await FileBlob.load("C:/Users/weimo/Downloads/软件使用合规信息收集表.xlsx");
const workbook = await SpreadsheetFile.importXlsx(input);
const preview = await workbook.render({ sheetName: "填写表", range: "A1:AB12", scale: 1.2, format: "png" });
await fs.writeFile("C:/Users/weimo/Desktop/weimou_web/.codex_sheet_check/original-fill-sheet.png", new Uint8Array(await preview.arrayBuffer()));
const summary = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 12000,
  tableMaxRows: 20,
  tableMaxCols: 20,
  tableMaxCellChars: 150,
});
console.log(summary.ndjson);
for (const name of ["填写说明", "填写示例", "选项字典", "填写表"]) {
  const item = await workbook.inspect({ kind: "table", sheetId: name, range: "A1:Z40", maxChars: 12000, tableMaxRows: 40, tableMaxCols: 26, tableMaxCellChars: 150 });
  console.log(`---${name}---`);
  console.log(item.ndjson);
}
