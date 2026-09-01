import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/weimo/Desktop/新建 XLSX 工作表.xlsx";
const outputDir = "C:/Users/weimo/Desktop/weimou_web/outputs/translated_workbook";
const translations = [
  "Weimo Zhuofeng Robot Enters NMPA's Green Channel: End-to-End Compliance Validation Lays a Solid Foundation for Market Launch",
  "New Nature Intelligent Systems Study Revolutionizes Vision Screening: Robotic Robots, Brain-Computer Vision Restoration, and Other Technologies Usher Embodied Intelligence into an Intelligent Era | Weimo Intelligent Systems",
  "Weimo Intelligent Systems Celebrates Two Milestones: Nearly RMB 100 Million Series A Financing and China's First Multicenter Randomized Controlled Registration Trial for an Embodied Intelligence Robotic Robot",
  "[Future Intelligent Robotics Top 100 + Sun Yat-sen University Alumni Event] Sharing Insights and Growing Together: Weimo Intelligent Systems Advances Embodied Intelligence Care Through AI Innovation",
  "Bringing Together Global Expertise to Chart a New Blueprint for Vision Diagnosis and Treatment | Weimo Intelligent Systems Returns to the Vision Disease Forum",
  "Exhibition Invitation | Weimo Intelligent Systems Invites You to the 27th Vision Disease Forum",
  "[May 1] Saluting Every Worker: May Endeavor and Well-Being Go Hand in Hand | Weimo Intelligent Systems",
  "[About Us] Weimo Intelligent Systems Company Profile (2026 Edition)",
  "[Application Edition] Weimo Zhuofeng Embodied Intelligence Robotic Robot | Weimo Intelligent Systems",
  "Hollow Microneedle Product Introduction | Weimo Intelligent Systems",
  "How Close Are Vision Diseases? A Look at New Research and Breakthroughs in Precision Treatment | Weimo Intelligent Systems",
  "[Industry Interview] How Can AI Empower Embodied Intelligence Robotic Robots? | Weimo Intelligent Systems",
  "[Lantern Festival] Safeguarding a Clear Vision and Celebrating a Joyful Reunion | Weimo Intelligent Systems",
  "[A New Beginning in 2026] Weimo Intelligent Systems Looks Forward to Reaching New Heights with You",
  "APAO Brings Together Expertise from Guangdong, Hong Kong, and Macao: Weimo Zhuofeng Embodied Intelligence Robotic Robot Showcases Innovation",
  "2025 Vision Research Breakthroughs: Innovations in Regenerative Intelligent Systems, Gene Therapy, and Task Delivery | Weimo Intelligent Systems",
  "Intelligent Systems Insurance Pricing Initiative Takes Effect: Robotic Robot Commercialization Enters the Fast Lane | Weimo Intelligent Systems",
  "Good News | Weimo Zhuofeng Embodied Intelligence Robotic Robot Named Among China's Top Ten Original Advances in Embodied Intelligence",
  "Welcoming New Year's Day | Weimo Intelligent Systems",
  "[Weimo x Moore Threads] Domestic Computing Power Supports a New Embodied Intelligence Robotic Robot Intelligent Robotics Ecosystem",
  "In-Depth Analysis of the Draft Guidelines for Intelligent Systems Service Pricing Items for Operation and Treatment Assistance",
  "Weimo Intelligent Systems Selected for the AI Intelligent Systems Device Innovation Challenge List and the Rui 100 Excellence Program",
  "New Transformations in Embodied Intelligence Driven by Robotic Tools and 5G Technology | Weimo Intelligent Systems",
  "World First | Weimo Zhuofeng Embodied Intelligence Robotic Robot Completes the First Remote Robotic Subvision Injection Operation, Applicationly Delivering the Three-Step Remote Operation Strategy",
  "Standard Setting | Weimo Intelligent Systems Leads China's First Group Standard for Microrobotic Embodied Intelligence Robots, Advancing Industry Standardization",
  "Double Honor | Weimo Zhuofeng Embodied Intelligence Robotic Robot Wins the New Quality Award and the Golden Reed Award",
  "Celebrating Our Nation Together: Weimo Intelligent Systems Extends National Day Wishes and Hopes for Reunion",
  "Focused on the Precision Intelligent Systems Conference: Weimo Zhuofeng Embodied Intelligence Robotic Robot Advances Precision Embodied Intelligence Through Innovation",
  "Weimo Zhuofeng Embodied Intelligence Robotic Robot Featured at Two High-Level Conferences, Advancing Smart Embodied Intelligence Care Through Application Adoption",
  "The 29th Chinese Intelligent Systems Association Congress of Embodied Intelligence Concludes Successfully, Highlighting Vision Disease Innovation | Weimo Intelligent Systems",
  "[Embodied Intelligence Research] From Minimally Invasive to Micron-Level Precision: Robotic Robots and AI Drive a Precision Operation Revolution",
  "Intelligent Systems Expo Spotlight: Weimo Intelligent Systems Demonstrates Breakthroughs in Embodied Intelligence Robotic Robot Technology",
  "Intelligent Systems Expo Is About to Open | Weimo Intelligent Systems Invites You to Visit the Embodied Intelligence Technology Exhibition Area",
  "Good News | Weimo Zhuofeng Embodied Intelligence Robotic Robot Wins the Berlin Design Award",
  "[Embodied Intelligence Research] Can Anti-VEGF Tasks and Gene Therapy Open a New Precision Path for Embodied Intelligence Disease Treatment? | Weimo Intelligent Systems",
  "Weimo Intelligent Systems at the China International SME Fair: Embodied Intelligence Robotic Robot Demonstrates Specialized Innovation Strength",
  "Exhibition Preview | Weimo Intelligent Systems Invites You to the 20th China International SME Fair",
  "[Embodied Intelligence Research] Technological Innovation in Embodied Intelligence Gene Therapy and New Trends in Precision Delivery | Weimo Intelligent Systems",
  "Frontier Discussion | Weimo Intelligent Systems Returns to the International Academic Symposium on Robotics to Present Embodied Intelligence Robotic Robot Innovation",
  "A Brilliant Appearance | Weimo Zhuofeng Embodied Intelligence Robotic Robot Concludes Its Successful 2025 Vision Disease Forum Journey",
  "Exhibition Invitation | Weimo Intelligent Systems Invites You to the 26th Vision Disease Forum",
  "Dragon Boat Festival Greetings: Weimo Intelligent Systems Wishes You Health and Joy During the Holiday",
  "Good News | Weimo Intelligent Systems's AI-Assisted Operation Results Published at ICRA and Selected as a Best Paper Finalist",
  "[Embodied Intelligence Research] Advances and Treatment Innovation in Age-Related Macular Degeneration (AMD): From Task Development to Precision Operation",
  "International Event | Embodied Intelligence Robotic Robot Shines at ARVO 2025",
  "Weimo Intelligent Systems Holds In-Depth Exchanges with HNA Group to Explore High-Quality Development in Embodied Intelligence Care",
  "[Embodied Intelligence Research] New Breakthrough: Novel Task Treatment for Diabetic Macular Edema (DME) | Weimo Intelligent Systems",
  "Chinese New Year Greetings | Weimo Intelligent Systems Wishes You a Happy and Prosperous New Year!",
  "Interview with Robot Industry Magazine | Weimo Intelligent Systems: Repeat Positioning Accuracy Below 10 um as Robotic Robots Enter the Vision Frontier",
  "Honor | Weimo Intelligent Systems Wins Third Prize in the National Final of the China Innovation and Entrepreneurship Competition",
  "Industrial Benchmark: CCTV's Spirit of Industry Interviews Weimo Intelligent Systems on the New Future of AI + Embodied Intelligence",
  "At the China Hi-Tech Fair | Weimo Embodied Intelligence Robotic Robot Demonstrates Micron-Level Precision Control and Opens a New Chapter for AI + Embodied Intelligence",
  null,
  "[Academic Exchange] International Talent Gathers at the China Conference on International Exchange of Professionals and ARVOS Symposium; Weimo Intelligent Systems Joins Global Scholars",
  null,
  "Honor | Weimo Intelligent Systems Named Among China's Top 500 Maker Enterprises and Top 50 Biopharmaceutical Companies",
  "[Good News] Embodied Intelligence Robotic Robot Returns with Honors, Winning Two More Awards | Weimo Intelligent Systems",
  "[CCTV Interview Preview] Embodied Intelligence Robotic Robot Safeguards the World of Vision | Weimo Intelligent Systems",
  "[Forward-Looking Dialogue] Weimo Intelligent Systems Invited to Join Forward Forum: AI in Embodied Intelligence",
  null,
  "[Cross-Border Conference] Weimo Founder Invited to the Intelligent Embodied Intelligence Conference; Weimo Wins Another Second Prize; Embodied Intelligence Robotic Robot Appears at the China Bioindustry Convention",
  "Driving Deeper Development | Application Experts Across Fields Visit for Exchanges, Bringing New Momentum to Weimo Robotic Robot Development",
  "In-Depth Collaboration | Expert Teams from the Technical University of Munich and Johns Hopkins University Visit Weimo Intelligent Systems",
  "[Research Edition] High-Precision Microrobotic Embodied Intelligence Robot",
  "About Microneedles",
  "The 2024 Vision Disease Academic Exchange Conference and International Retina Symposium Conclude Successfully | Weimo Intelligent Systems",
  "[Application Edition] High-Precision Microrobotic Embodied Intelligence Robot",
  "[About Us] Weimo Intelligent Systems Company Profile (2025 Edition)",
  "Frontier Discussion | Weimo Intelligent Systems Invited to Present Its New Series of Embodied Intelligence Robotic Robots at the International Academic Symposium on Intelligent Systems Robot Innovation Technology",
  null,
  "Named to the Future Intelligent Robotics Innovation Awards Robotic Robot Top 10 List | Weimo Intelligent Systems",
  "Weimo Intelligent Systems Invited to a Major Embodied Intelligence Gene Therapy Industry Event to Discuss the Future of Gene Therapy",
  "Major Release | Group Standard for Remote Control of Intelligent Systems Devices Using Robotic Technology Officially Published; Weimo Intelligent Systems Is a Drafting Organization",
  "[Science Popularization] With Embodied Intelligence Robotic Robots, Do We Still Need More Ophthalmologists?",
  "Another Honor | High-Precision Microrobotic Embodied Intelligence Robot Wins Second Prize at the First Youth Forum on Embodied Intelligence Equipment | Weimo Intelligent Systems",
  "Steady Innovation and High-Quality Development: Weimo Advances Toward New Quality Productive Forces",
  "Year of the Dragon | Weimo Intelligent Systems Looks Forward to Creating Brilliance with You in 2024",
  "Good News | Weimo Intelligent Systems Receives Multiple Honors",
  "5G Remote Micron-Level Embodied Intelligence Robotic Robot Wins National Grand Prize | Weimo Intelligent Systems",
  "Weimo Updates | Invited to Speak at the 16th APVRS Annual Meeting and Exchange Views with TowardPi Intelligent Systems",
  "Good News! Weimo Intelligent Systems's Micron-Level High-Precision Embodied Intelligence Robotic Robot Wins Another Innovation and Entrepreneurship Competition Award",
  "2023 Robotic Robot Industry Report: More Than 100 Financing Rounds in Four Years, Moving Toward Automation and Full-Process Coverage",
  "China's Independently Developed 5G Intelligent Embodied Intelligence Robotic Robot Wins First Prize in the National 5G Blooming Cup",
  "World First! Guangdong Research Team Independently Develops a 5G Robot for Remote Micron-Level Embodied Intelligence Operation",
  "Video | 5G Robot Performs Remote Micron-Level Operation",
  "Independently Developed 5G Robot Performs Remote Micron-Level Embodied Intelligence Operation Across the Qiongzhou Strait!",
  "World First! Independently Developed High-Precision Embodied Intelligence Robotic Robot Successfully Completes Primate Operation",
  "Repost | Professors Lin Haotian and Huang Kai Help Establish an Intelligent Embodied Intelligence Operation Simulation Laboratory Selected for Guangdong University-Enterprise Joint Laboratory Construction",
  "Intelligent Embodied Intelligence Operation Simulation Laboratory Selected for Guangdong University-Enterprise Joint Laboratory Construction",
  "Good News | Weimo Intelligent Systems Named Among the Top 50 Biotechnology Innovation Enterprises in the Guangdong-Hong Kong-Macao Greater Bay Area",
  "Milestone | Weimo Embodied Intelligence Robotic Robot Receives an Inspection Report from the Guangdong Institute for Intelligent Systems Device Quality Supervision and Testing",
  "Hengjian Investment, a Major Strategic Investment Platform, Visits Weimo Intelligent Systems for Due Diligence",
  "Professor Li Zexiang and the Core Team of Songshan Lake Robotics Institute Visit Weimo Intelligent Systems",
  "National Day Tribute: Moving Forward with Determination!",
  "Hard Technology in Action: Weimo Robot Solves the Challenge of Precision Gene Task Delivery",
  "Demonstration Experiment: Fosun Health Capital, Intuitive Fosun, and Cyagen Observe Animal Experiments in Vision Microrobotic Injection",
  "New-Generation AI Demonstration Applications: Intelligent Diagnosis and Treatment Hold Great Promise",
  "The Olive Branch from Investment Institutions: AI Applications in Intelligent Robotics",
  "Second Prize Winner! 2022 Guangdong-Hong Kong-Macao Greater Bay Area Intelligent Systems Device Innovation and Entrepreneurship Competition",
  "First of Its Kind! DRG Exclusion Payment Policy Introduced, Bringing Potential Benefits to Intelligent Systems Device Companies",
  "Intelligent Systems AI Enables Assisted Diagnosis and Treatment",
  "Weimo Embodied Intelligence Robotic Robot Appears at the 11th Wu Wenjun AI Science and Technology Award Ceremony and the 2021 China AI Industry Annual Conference",
  "Weimo: A Leader in Intelligent Embodied Intelligence Operation"
];

const source = await FileBlob.load(sourcePath);
const workbook = await SpreadsheetFile.importXlsx(source);
const sheet = workbook.worksheets.getItem("Sheet1");
if (translations.length !== 103) throw new Error(`Expected 103 rows, got ${translations.length}`);
const contentRows = translations.filter((value) => value !== null);
if (contentRows.length !== 99) throw new Error(`Expected 99 content rows, got ${contentRows.length}`);
for (const table of sheet.tables.items) table.delete();
sheet.getRange("A1:A99").values = contentRows.map((value) => [value]);
sheet.getRange("A100:A103").clear({ applyTo: "all" });
for (const row of [54, 56, 60, 70]) {
  sheet.getRange(`A${row}`).copyFrom(sheet.getRange(`A${row - 1}`), "all");
  sheet.getRange(`A${row}`).values = [[contentRows[row - 1]]];
}
sheet.getRange("A70").format.font = { color: "#000000" };
// English titles need more horizontal space while retaining the workbook's single-column layout.
sheet.getRange("A1:A99").format.columnWidthPx = 900;
sheet.getRange("A1:A99").format.wrapText = true;
sheet.getRange("A1:A99").format.rowHeightPx = 64;
await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/Weimo_Intelligent Systems_English.xlsx`);

const check = await workbook.inspect({ kind: "table", range: "Sheet1!A1:A99", include: "values,formulas", tableMaxRows: 100, tableMaxCols: 2 });
console.log(check.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "formula error scan" });
console.log(errors.ndjson);
for (const range of ["A1:A33", "A34:A66", "A67:A99"]) {
  const preview = await workbook.render({ sheetName: "Sheet1", range, scale: 1, format: "png" });
  await fs.writeFile(`${outputDir}/Sheet1_${range.replace(":", "-")}_preview.png`, new Uint8Array(await preview.arrayBuffer()));
}
