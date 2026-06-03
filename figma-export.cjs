const fs = require("fs");
const path = require("path");

const shots = [
  {
    title: "01 Home Landing",
    file: "C:/Users/Administrator/Downloads/footweartrends_ui_01_home_landing.png",
    width: 1920,
    height: 680,
  },
  {
    title: "02 Questionnaire",
    file: "C:/Users/Administrator/Downloads/footweartrends_ui_02_questionnaire.png",
    width: 1600,
    height: 900,
  },
  {
    title: "03 Growth Report",
    file: "C:/Users/Administrator/Downloads/footweartrends_ui_03_growth_report.png",
    width: 1600,
    height: 900,
  },
];

const gap = 120;
const margin = 80;
const labelHeight = 42;
const totalWidth = Math.max(...shots.map((shot) => shot.width)) + margin * 2;
const totalHeight = shots.reduce((sum, shot) => sum + labelHeight + shot.height, margin * 2 + gap * (shots.length - 1));

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

let y = margin;
const body = shots
  .map((shot) => {
    const bytes = fs.readFileSync(shot.file).toString("base64");
    const x = margin;
    const label = `<text x="${x}" y="${y + 24}" fill="#111111" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', Arial, sans-serif" font-size="24" font-weight="700">${esc(shot.title)}</text>`;
    const frameY = y + labelHeight;
    const frame = [
      `<rect x="${x}" y="${frameY}" width="${shot.width}" height="${shot.height}" rx="20" fill="#f6f7f6" stroke="rgba(0,0,0,.08)" filter="url(#shadow)"/>`,
      `<image x="${x}" y="${frameY}" width="${shot.width}" height="${shot.height}" href="data:image/png;base64,${bytes}" preserveAspectRatio="xMidYMid meet"/>`,
    ].join("\n");
    y += labelHeight + shot.height + gap;
    return `${label}\n${frame}`;
  })
  .join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <filter id="shadow" x="-4%" y="-4%" width="108%" height="112%">
    <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#111111" flood-opacity=".10"/>
  </filter>
</defs>
<rect width="${totalWidth}" height="${totalHeight}" fill="#eef0ef"/>
${body}
</svg>`;

fs.writeFileSync(path.join(__dirname, "figma-import.svg"), svg, "utf8");
console.log("figma-import.svg");
