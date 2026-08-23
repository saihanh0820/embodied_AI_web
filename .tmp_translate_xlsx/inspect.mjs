import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/weimo/Desktop/新建 XLSX 工作表.xlsx";
const outputDir = "C:/Users/weimo/Desktop/weimou_web/.tmp_translate_xlsx";
const source = await FileBlob.load(sourcePath);
const workbook = await SpreadsheetFile.importXlsx(source);
const summary = await workbook.inspect({
  kind: "workbook,sheet,table,region",
  maxChars: 12000,
  tableMaxRows: 100,
  tableMaxCols: 30,
  tableMaxCellChars: 300,
});
console.log(summary.ndjson);
const sheets = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 3000 });
console.log(sheets.ndjson);
const result = JSON.parse(sheets.ndjson.split("\n").find((line) => line.includes("\"sheets\"")) || "{}");
for (const sheet of result.sheets || []) {
  const preview = await workbook.render({ sheetName: sheet.name, autoCrop: "all", scale: 1.5, format: "png" });
  await fs.writeFile(`${outputDir}/${sheet.name}.png`, new Uint8Array(await preview.arrayBuffer()));
}
