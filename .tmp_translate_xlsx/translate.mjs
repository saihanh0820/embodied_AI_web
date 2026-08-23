import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/weimo/Desktop/新建 XLSX 工作表.xlsx";
const outputDir = "C:/Users/weimo/Desktop/weimou_web/outputs/translated_workbook";
const translations = [
  "Weimo Zhuofeng Robot Enters NMPA's Green Channel: End-to-End Compliance Validation Lays a Solid Foundation for Market Launch",
  "New Nature Medicine Study Revolutionizes Retinal Screening: Surgical Robots, Brain-Computer Vision Restoration, and Other Technologies Usher Ophthalmology into an Intelligent Era | Weimo Medical",
  "Weimo Medical Celebrates Two Milestones: Nearly RMB 100 Million Series A Financing and China's First Multicenter Randomized Controlled Registration Trial for an Ophthalmic Surgical Robot",
  "[Future Healthcare Top 100 + Sun Yat-sen University Alumni Event] Sharing Insights and Growing Together: Weimo Medical Advances Ophthalmic Care Through AI Innovation",
  "Bringing Together Global Expertise to Chart a New Blueprint for Retinal Diagnosis and Treatment | Weimo Medical Returns to the Retinal Disease Forum",
  "Exhibition Invitation | Weimo Medical Invites You to the 27th Retinal Disease Forum",
  "[May 1] Saluting Every Worker: May Endeavor and Well-Being Go Hand in Hand | Weimo Medical",
  "[About Us] Weimo Medical Company Profile (2026 Edition)",
  "[Clinical Edition] Weimo Zhuofeng Ophthalmic Surgical Robot | Weimo Medical",
  "Hollow Microneedle Product Introduction | Weimo Medical",
  "How Close Are Retinal Diseases? A Look at New Research and Breakthroughs in Precision Treatment | Weimo Medical",
  "[Industry Interview] How Can AI Empower Ophthalmic Surgical Robots? | Weimo Medical",
  "[Lantern Festival] Safeguarding a Clear Vision and Celebrating a Joyful Reunion | Weimo Medical",
  "[A New Beginning in 2026] Weimo Medical Looks Forward to Reaching New Heights with You",
  "APAO Brings Together Expertise from Guangdong, Hong Kong, and Macao: Weimo Zhuofeng Ophthalmic Surgical Robot Showcases Innovation",
  "2025 Retinal Research Breakthroughs: Innovations in Regenerative Medicine, Gene Therapy, and Drug Delivery | Weimo Medical",
  "Medical Insurance Pricing Initiative Takes Effect: Surgical Robot Commercialization Enters the Fast Lane | Weimo Medical",
  "Good News | Weimo Zhuofeng Ophthalmic Surgical Robot Named Among China's Top Ten Original Advances in Ophthalmology",
  "Welcoming New Year's Day | Weimo Medical",
  "[Weimo x Moore Threads] Domestic Computing Power Supports a New Ophthalmic Surgical Robot Healthcare Ecosystem",
  "In-Depth Analysis of the Draft Guidelines for Medical Service Pricing Items for Surgery and Treatment Assistance",
  "Weimo Medical Selected for the AI Medical Device Innovation Challenge List and the Rui 100 Excellence Program",
  "New Transformations in Ophthalmology Driven by Robotic Tools and 5G Technology | Weimo Medical",
  "World First | Weimo Zhuofeng Ophthalmic Surgical Robot Completes the First Remote Robotic Subretinal Injection Surgery, Clinically Delivering the Three-Step Remote Surgery Strategy",
  "Standard Setting | Weimo Medical Leads China's First Group Standard for Microsurgical Ophthalmic Robots, Advancing Industry Standardization",
  "Double Honor | Weimo Zhuofeng Ophthalmic Surgical Robot Wins the New Quality Award and the Golden Reed Award",
  "Celebrating Our Nation Together: Weimo Medical Extends National Day Wishes and Hopes for Reunion",
  "Focused on the Precision Medicine Conference: Weimo Zhuofeng Ophthalmic Surgical Robot Advances Precision Ophthalmology Through Innovation",
  "Weimo Zhuofeng Ophthalmic Surgical Robot Featured at Two High-Level Conferences, Advancing Smart Ophthalmic Care Through Clinical Adoption",
  "The 29th Chinese Medical Association Congress of Ophthalmology Concludes Successfully, Highlighting Retinal Disease Innovation | Weimo Medical",
  "[Ophthalmic Research] From Minimally Invasive to Micron-Level Precision: Surgical Robots and AI Drive a Precision Surgery Revolution",
  "Medical Expo Spotlight: Weimo Medical Demonstrates Breakthroughs in Ophthalmic Surgical Robot Technology",
  "Medical Expo Is About to Open | Weimo Medical Invites You to Visit the Ophthalmic Technology Exhibition Area",
  "Good News | Weimo Zhuofeng Ophthalmic Surgical Robot Wins the Berlin Design Award",
  "[Ophthalmic Research] Can Anti-VEGF Drugs and Gene Therapy Open a New Precision Path for Ophthalmic Disease Treatment? | Weimo Medical",
  "Weimo Medical at the China International SME Fair: Ophthalmic Surgical Robot Demonstrates Specialized Innovation Strength",
  "Exhibition Preview | Weimo Medical Invites You to the 20th China International SME Fair",
  "[Ophthalmic Research] Technological Innovation in Ophthalmic Gene Therapy and New Trends in Precision Delivery | Weimo Medical",
  "Frontier Discussion | Weimo Medical Returns to the International Academic Symposium on Robotics to Present Ophthalmic Surgical Robot Innovation",
  "A Brilliant Appearance | Weimo Zhuofeng Ophthalmic Surgical Robot Concludes Its Successful 2025 Retinal Disease Forum Journey",
  "Exhibition Invitation | Weimo Medical Invites You to the 26th Retinal Disease Forum",
  "Dragon Boat Festival Greetings: Weimo Medical Wishes You Health and Joy During the Holiday",
  "Good News | Weimo Medical's AI-Assisted Surgery Results Published at ICRA and Selected as a Best Paper Finalist",
  "[Ophthalmic Research] Advances and Treatment Innovation in Age-Related Macular Degeneration (AMD): From Drug Development to Precision Surgery",
  "International Event | Ophthalmic Surgical Robot Shines at ARVO 2025",
  "Weimo Medical Holds In-Depth Exchanges with HNA Group to Explore High-Quality Development in Ophthalmic Care",
  "[Ophthalmic Research] New Breakthrough: Novel Drug Treatment for Diabetic Macular Edema (DME) | Weimo Medical",
  "Chinese New Year Greetings | Weimo Medical Wishes You a Happy and Prosperous New Year!",
  "Interview with Robot Industry Magazine | Weimo Medical: Repeat Positioning Accuracy Below 10 um as Surgical Robots Enter the Retinal Frontier",
  "Honor | Weimo Medical Wins Third Prize in the National Final of the China Innovation and Entrepreneurship Competition",
  "Industrial Benchmark: CCTV's Spirit of Industry Interviews Weimo Medical on the New Future of AI + Ophthalmology",
  "At the China Hi-Tech Fair | Weimo Ophthalmic Surgical Robot Demonstrates Micron-Level Precision Control and Opens a New Chapter for AI + Ophthalmology",
  null,
  "[Academic Exchange] International Talent Gathers at the China Conference on International Exchange of Professionals and ARVOS Symposium; Weimo Medical Joins Global Scholars",
  null,
  "Honor | Weimo Medical Named Among China's Top 500 Maker Enterprises and Top 50 Biopharmaceutical Companies",
  "[Good News] Ophthalmic Surgical Robot Returns with Honors, Winning Two More Awards | Weimo Medical",
  "[CCTV Interview Preview] Ophthalmic Surgical Robot Safeguards the World of Vision | Weimo Medical",
  "[Forward-Looking Dialogue] Weimo Medical Invited to Join Forward Forum: AI in Ophthalmology",
  null,
  "[Cross-Border Conference] Weimo Founder Invited to the Intelligent Ophthalmology Conference; Weimo Wins Another Second Prize; Ophthalmic Surgical Robot Appears at the China Bioindustry Convention",
  "Driving Deeper Development | Clinical Experts Across Fields Visit for Exchanges, Bringing New Momentum to Weimo Surgical Robot Development",
  "In-Depth Collaboration | Expert Teams from the Technical University of Munich and Johns Hopkins University Visit Weimo Medical",
  "[Research Edition] High-Precision Microsurgical Ophthalmic Robot",
  "About Microneedles",
  "The 2024 Retinal Disease Academic Exchange Conference and International Retina Symposium Conclude Successfully | Weimo Medical",
  "[Clinical Edition] High-Precision Microsurgical Ophthalmic Robot",
  "[About Us] Weimo Medical Company Profile (2025 Edition)",
  "Frontier Discussion | Weimo Medical Invited to Present Its New Series of Ophthalmic Surgical Robots at the International Academic Symposium on Medical Robot Innovation Technology",
  null,
  "Named to the Future Healthcare Innovation Awards Surgical Robot Top 10 List | Weimo Medical",
  "Weimo Medical Invited to a Major Ophthalmic Gene Therapy Industry Event to Discuss the Future of Gene Therapy",
  "Major Release | Group Standard for Remote Control of Medical Devices Using Robotic Technology Officially Published; Weimo Medical Is a Drafting Organization",
  "[Science Popularization] With Ophthalmic Surgical Robots, Do We Still Need More Ophthalmologists?",
  "Another Honor | High-Precision Microsurgical Ophthalmic Robot Wins Second Prize at the First Youth Forum on Ophthalmic Equipment | Weimo Medical",
  "Steady Innovation and High-Quality Development: Weimo Advances Toward New Quality Productive Forces",
  "Year of the Dragon | Weimo Medical Looks Forward to Creating Brilliance with You in 2024",
  "Good News | Weimo Medical Receives Multiple Honors",
  "5G Remote Micron-Level Ophthalmic Surgical Robot Wins National Grand Prize | Weimo Medical",
  "Weimo Updates | Invited to Speak at the 16th APVRS Annual Meeting and Exchange Views with TowardPi Medical",
  "Good News! Weimo Medical's Micron-Level High-Precision Ophthalmic Surgical Robot Wins Another Innovation and Entrepreneurship Competition Award",
  "2023 Surgical Robot Industry Report: More Than 100 Financing Rounds in Four Years, Moving Toward Automation and Full-Process Coverage",
  "China's Independently Developed 5G Intelligent Ophthalmic Surgical Robot Wins First Prize in the National 5G Blooming Cup",
  "World First! Guangdong Research Team Independently Develops a 5G Robot for Remote Micron-Level Ophthalmic Surgery",
  "Video | 5G Robot Performs Remote Micron-Level Surgery",
  "Independently Developed 5G Robot Performs Remote Micron-Level Ophthalmic Surgery Across the Qiongzhou Strait!",
  "World First! Independently Developed High-Precision Ophthalmic Surgical Robot Successfully Completes Primate Surgery",
  "Repost | Professors Lin Haotian and Huang Kai Help Establish an Intelligent Ophthalmic Surgery Simulation Laboratory Selected for Guangdong University-Enterprise Joint Laboratory Construction",
  "Intelligent Ophthalmic Surgery Simulation Laboratory Selected for Guangdong University-Enterprise Joint Laboratory Construction",
  "Good News | Weimo Medical Named Among the Top 50 Biotechnology Innovation Enterprises in the Guangdong-Hong Kong-Macao Greater Bay Area",
  "Milestone | Weimo Ophthalmic Surgical Robot Receives an Inspection Report from the Guangdong Institute for Medical Device Quality Supervision and Testing",
  "Hengjian Investment, a Major Strategic Investment Platform, Visits Weimo Medical for Due Diligence",
  "Professor Li Zexiang and the Core Team of Songshan Lake Robotics Institute Visit Weimo Medical",
  "National Day Tribute: Moving Forward with Determination!",
  "Hard Technology in Action: Weimo Robot Solves the Challenge of Precision Gene Drug Delivery",
  "Demonstration Experiment: Fosun Health Capital, Intuitive Fosun, and Cyagen Observe Animal Experiments in Retinal Microsurgical Injection",
  "New-Generation AI Demonstration Applications: Intelligent Diagnosis and Treatment Hold Great Promise",
  "The Olive Branch from Investment Institutions: AI Applications in Healthcare",
  "Second Prize Winner! 2022 Guangdong-Hong Kong-Macao Greater Bay Area Medical Device Innovation and Entrepreneurship Competition",
  "First of Its Kind! DRG Exclusion Payment Policy Introduced, Bringing Potential Benefits to Medical Device Companies",
  "Medical AI Enables Assisted Diagnosis and Treatment",
  "Weimo Ophthalmic Surgical Robot Appears at the 11th Wu Wenjun AI Science and Technology Award Ceremony and the 2021 China AI Industry Annual Conference",
  "Weimo: A Leader in Intelligent Ophthalmic Surgery"
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
await output.save(`${outputDir}/Weimo_Medical_English.xlsx`);

const check = await workbook.inspect({ kind: "table", range: "Sheet1!A1:A99", include: "values,formulas", tableMaxRows: 100, tableMaxCols: 2 });
console.log(check.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "formula error scan" });
console.log(errors.ndjson);
for (const range of ["A1:A33", "A34:A66", "A67:A99"]) {
  const preview = await workbook.render({ sheetName: "Sheet1", range, scale: 1, format: "png" });
  await fs.writeFile(`${outputDir}/Sheet1_${range.replace(":", "-")}_preview.png`, new Uint8Array(await preview.arrayBuffer()));
}
