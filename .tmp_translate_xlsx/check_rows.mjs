import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const input = await FileBlob.load("C:/Users/weimo/Desktop/weimou_web/outputs/translated_workbook/Weimo_Intelligent Systems_English.xlsx");
const workbook = await SpreadsheetFile.importXlsx(input);
console.log(JSON.stringify(workbook.worksheets.getItem("Sheet1").getRange("A67:A72").values));
