# FootwearTrends UI Replica

This folder contains a local reproduction of the supplied FootwearTrends.cn UI references.

## Files

- `index.html` - home landing page matching `footweartrends_ui_01_home_landing.png`.
- `questionnaire.html` - questionnaire flow matching `footweartrends_ui_02_questionnaire.png`.
- `solution.html` - service package / solution page with six interactive solution cards.
- `insights.html` - black-and-white brand insights page with burst brands, growth models, opportunity map, and toolkit CTA.
- `about.html` - about-us page with team, mission, methodology, contact, and booking sections.
- `report.html` - growth report dashboard matching `footweartrends_ui_03_growth_report.png`.
- `styles.css` - responsive visual styling for all pages.
- `app.js` - interactive questionnaire state, motion feedback, generated report data, solution card selection, insights card focus, and share/download button feedback.
- `visuals/brand-tree-hero.png` - embedded hero tree artwork from the reference page.
- `server.cjs` - small local static server.
- `figma-export.cjs` - generator for the Figma import artifact.
- `figma-import.svg` - self-contained three-board Figma import artifact based on the supplied screenshots.

## Preview

```powershell
node server.cjs 4181
```

Open:

```text
http://127.0.0.1:4181/
```

Interactive flow:

1. Open the home page.
2. Click `开始免费诊断`.
3. Select answers through the five-step questionnaire.
4. Click `生成报告` to view a report generated from the saved answers.

## Figma Import

`figma-import.svg` is designed as a fallback Figma handoff artifact when direct Figma MCP access is unavailable.

To use it:

1. Open Figma.
2. Create or open a design file.
3. Drag `figma-import.svg` onto the canvas.

The SVG includes three labeled boards: Home Landing, Questionnaire, and Growth Report.

Regenerate the SVG after changing the page artwork or export script:

```powershell
node figma-export.cjs
```
