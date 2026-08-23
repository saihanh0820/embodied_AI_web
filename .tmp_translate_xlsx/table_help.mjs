import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const source = await FileBlob.load("C:/Users/weimo/Desktop/新建 XLSX 工作表.xlsx");
const workbook = await SpreadsheetFile.importXlsx(source);
console.log(workbook.help("table.resize", { include: "index,examples,notes", maxChars: 3000 }).ndjson);
