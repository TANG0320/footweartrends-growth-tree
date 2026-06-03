const STORAGE_KEY = "footweartrends-diagnosis";
const GROWTH_STAGES = [
  { title: "种子阶段", range: "0-1", label: "种子正在发芽", score: 18 },
  { title: "孵化阶段", range: "1-10", label: "根系正在展开", score: 38 },
  { title: "成长阶段", range: "10-50", label: "枝干快速生长", score: 58 },
  { title: "成熟阶段", range: "50+", label: "树冠开始成形", score: 78 },
  { title: "上市阶段", range: "IPO", label: "品牌飞升增长", score: 92 },
];

const questions = [
  {
    id: "stage",
    step: 0,
    eyebrow: "1.1 品牌基础",
    title: "你的品牌目前所处阶段是？",
    desc: "这将帮助我们判断你的品牌在创业链路中的初始位置。",
    options: [
      ["种子阶段（0-1）", "概念验证、品牌雏形，初步探索", 42],
      ["孵化阶段（1-10）", "产品打磨、用户测试、商业模式形成", 58],
      ["成长阶段（10-50）", "稳定增长、团队扩张、市场拓展", 72],
      ["成熟阶段（50+）", "品牌优势、多渠道布局、组织优化", 84],
      ["上市阶段", "商业上升阶段已进入上市流程", 92],
    ],
  },
  {
    id: "product",
    step: 1,
    eyebrow: "2.1 市场与产品",
    title: "你的首款鞋与市场机会现在有多明确？",
    desc: "我们会把产品成熟度和市场机会放在同一层判断，避免只看设计、不看需求。",
    options: [
      ["只有概念方向", "有参考与灵感，但用户、价格带和鞋型尚未收敛", 48],
      ["已锁定鞋型方向", "目标人群、使用场景和核心鞋型初步明确", 66],
      ["已有样鞋或样品", "完成一轮打样，正在验证舒适度、成本和反馈", 79],
      ["准备首发 Drop", "产品、定价、内容与首发场景基本就绪", 88],
    ],
  },
  {
    id: "operation",
    step: 2,
    eyebrow: "3.1 运营与组织",
    title: "你最担心上市前哪一类问题？",
    desc: "风险会影响报告里的关键提示和推荐路径。",
    options: [
      ["容易和竞品相似", "担心做出来像别人，缺少可记忆识别点", 58],
      ["工厂落地不确定", "材料、结构、开模、起订量都有不确定性", 61],
      ["内容卖点不清楚", "有产品但不知道怎么讲、怎么卖", 63],
      ["团队执行节奏慢", "设计、供应链、内容、渠道协同不足", 57],
    ],
  },
  {
    id: "capital",
    step: 3,
    eyebrow: "4.1 财务与资本",
    title: "你现在的预算与资源准备处于什么状态？",
    desc: "财务与资源准备会影响打样深度、首发规模和上市节奏。",
    options: [
      ["预算还不确定", "需要先判断方向与投入边界，避免过早消耗资源", 46],
      ["可支持小规模打样", "能推进样鞋、基础视觉和初步内容验证", 62],
      ["可支持首发测试", "能覆盖打样、拍摄、内容与一轮渠道试投", 76],
      ["可支持系统上市", "已有较明确预算、团队分工和供应链协同", 88],
    ],
  },
  {
    id: "priority",
    step: 4,
    eyebrow: "5.1 未来规划",
    title: "你希望诊断之后优先得到什么？",
    desc: "最终报告会把你的答案转成下一步服务路径。",
    options: [
      ["第一双鞋成长 Brief", "明确鞋型、目标用户、购买理由和反同质化细节", 82],
      ["趋势与竞品判断", "判断哪些趋势适合做，哪些应该放弃", 76],
      ["打样与供应链建议", "提前识别结构、材料、成本和量产风险", 74],
      ["上市内容节奏", "把鞋款方向转成详情页、短视频和首发动作", 78],
    ],
  },
];

function getState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function initHome() {
  if (!document.body.classList.contains("page-home")) return;
  const tree = document.querySelector(".hero-tree img");
  window.addEventListener("mousemove", (event) => {
    if (!tree || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    tree.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}

function initQuestionnaire() {
  if (!document.body.classList.contains("page-questionnaire")) return;

  const state = getState();
  const answers = state.answers || {};
  let current = Number.isInteger(state.currentQuestion) ? state.currentQuestion : 0;
  current = Math.min(questions.length - 1, Math.max(0, current));

  const els = {
    steps: [...document.querySelectorAll("[data-flow-steps] span")],
    stageItems: [...document.querySelectorAll("[data-stage-list] li")],
    image: document.querySelector("[data-tree-image]"),
    hudScore: document.querySelector("[data-hud-score]"),
    hudLabel: document.querySelector("[data-hud-label]"),
    progress: document.querySelector("[data-progress-bar]"),
    eyebrow: document.querySelector("[data-question-eyebrow]"),
    title: document.querySelector("[data-question-title]"),
    desc: document.querySelector("[data-question-desc]"),
    list: document.querySelector("[data-answer-list]"),
    prev: document.querySelector("[data-prev]"),
    next: document.querySelector("[data-next]"),
    counter: document.querySelector("[data-counter]"),
  };

  function render() {
    const q = questions[current];
    const selected = answers[q.id] ?? 0;
    const stageIndex = Math.min(GROWTH_STAGES.length - 1, Math.max(0, answers.stage ?? 0));
    const stage = GROWTH_STAGES[stageIndex];
    const activeStageDomIndex = GROWTH_STAGES.length - 1 - stageIndex;
    const progress = ((current + 1) / questions.length) * 100;

    els.eyebrow.textContent = q.eyebrow;
    els.title.textContent = q.title;
    els.desc.textContent = q.desc;
    els.counter.textContent = `问卷 ${current + 1}/${questions.length}`;
    els.progress.style.width = `${progress}%`;
    els.hudScore.textContent = `${stage.score}%`;
    els.hudLabel.textContent = stage.label;
    els.image.style.setProperty("--tree-scale", 0.88 + stage.score / 250);
    els.image.style.setProperty("--tree-brightness", 0.9 + stage.score / 520);
    els.image.dataset.growthStage = String(stageIndex + 1);
    document.body.dataset.growthStage = String(stageIndex + 1);

    els.steps.forEach((item, index) => {
      item.classList.toggle("active", index === q.step);
      item.classList.toggle("done", index < q.step);
    });
    els.stageItems.forEach((item, index) => {
      const stageOptionIndex = GROWTH_STAGES.length - 1 - index;
      item.dataset.stageOption = String(stageOptionIndex);
      item.classList.toggle("active", index === activeStageDomIndex);
      item.classList.toggle("lit", index > activeStageDomIndex);
    });

    els.list.innerHTML = q.options
      .map((option, index) => {
        const isSelected = index === selected;
        return `
          <label class="choice ${isSelected ? "selected" : ""}">
            <input type="radio" name="${q.id}" ${isSelected ? "checked" : ""} data-option="${index}" />
            <span><strong>${option[0]}</strong><small>${option[1]}</small></span>
          </label>
        `;
      })
      .join("");

    els.prev.disabled = current === 0;
    els.next.textContent = current === questions.length - 1 ? "生成报告" : "下一步 ›";

    els.list.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", () => {
        answers[q.id] = Number(input.dataset.option);
        saveState({ answers, currentQuestion: current });
        pulseTree();
        render();
      });
    });

    els.list.querySelectorAll(".choice").forEach((choice) => {
      choice.addEventListener("click", () => {
        const input = choice.querySelector("input");
        if (!input) return;
        answers[q.id] = Number(input.dataset.option);
        saveState({ answers, currentQuestion: current });
        pulseTree();
        render();
      });
    });
  }

  function pulseTree() {
    const visual = els.image.closest(".tree-stage-visual");
    visual?.classList.remove("is-changing");
    requestAnimationFrame(() => {
      visual?.classList.add("is-changing");
    });
  }

  els.stageItems.forEach((item) => {
    item.addEventListener("click", () => {
      const stageOption = Number(item.dataset.stageOption);
      if (!Number.isInteger(stageOption)) return;
      answers.stage = stageOption;
      current = 0;
      saveState({ answers, currentQuestion: current });
      pulseTree();
      render();
    });
  });

  els.prev.addEventListener("click", () => {
    current = Math.max(0, current - 1);
    saveState({ answers, currentQuestion: current });
    render();
  });

  els.next.addEventListener("click", () => {
    const q = questions[current];
    if (answers[q.id] === undefined) answers[q.id] = 0;
    if (current === questions.length - 1) {
      saveState({ answers, currentQuestion: current, completedAt: new Date().toISOString() });
      window.location.href = "./report.html";
      return;
    }
    current += 1;
    saveState({ answers, currentQuestion: current });
    render();
  });

  render();
}

function getAverageScore(answers) {
  const selectedScores = questions.map((q) => {
    const selected = answers[q.id] ?? 0;
    return q.options[selected][2];
  });
  return selectedScores.reduce((sum, score) => sum + score, 0) / selectedScores.length;
}

function initReport() {
  if (!document.body.classList.contains("page-report")) return;
  const state = getState();
  const answers = state.answers || {};
  const score = Math.round(getAverageScore(answers));
  const grade = score >= 86 ? "A" : score >= 76 ? "B+" : score >= 66 ? "B" : "C+";

  const stageIndex = answers.stage ?? 2;
  const stageLabels = ["种子阶段（0-1）", "孵化阶段（1-10）", "成长阶段（10-50）", "成熟阶段（50+）", "上市阶段"];
  const currentStage = stageLabels[stageIndex] || "成长阶段（10-50）";
  const nextStage = stageLabels[Math.min(stageIndex + 1, stageLabels.length - 1)] || "成熟阶段（50+）";

  const dimensions = buildDimensions(answers, score);
  const risks = buildRisks(answers);
  const solution = buildSolution(answers);

  setText("[data-score]", score);
  setText("[data-grade]", grade);
  setText("[data-current-stage]", currentStage);
  setText("[data-next-stage]", nextStage);
  setText("[data-report-date]", `诊断完成于 ${formatDate(state.completedAt)}`);
  setText("[data-summary-title]", score >= 78 ? "表现良好，具备上市潜力" : "方向可见，仍需补强关键链路");
  setText("[data-summary-copy]", score >= 78 ? "品牌定位与产品方向较清晰，建议强化供应链与内容上市节奏。" : "建议优先完成首款鞋 Brief、竞品筛选和打样可行性判断。");
  setText("[data-stage-copy]", `距离 ${nextStage}，建议重点提升 ${risks.length} 个维度`);
  setText("[data-solution-title]", solution.title);
  setText("[data-solution-copy]", solution.copy);
  setText("[data-solution-tags]", solution.tags);

  const list = document.querySelector("[data-radar-list]");
  list.innerHTML = dimensions.map((item) => `<li><span>${item.name}</span><b>${item.value}</b></li>`).join("");
  document.querySelector("[data-radar-polygon]").setAttribute("points", radarPoints(dimensions.map((item) => item.value)));

  document.querySelector("[data-risk-list]").innerHTML = risks
    .map((risk) => `<div class="risk-row"><i class="${risk.className}">${risk.level}</i><span><strong>${risk.title}</strong><small>${risk.copy}</small></span></div>`)
    .join("");

  document.querySelectorAll("[data-stage-track] i").forEach((dot, index) => {
    dot.classList.toggle("active", index <= Math.min(3, Math.max(0, stageIndex - 1)));
  });

  document.querySelectorAll("[data-report-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const original = button.textContent;
      if (button.dataset.reportAction === "share" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        button.textContent = "已复制链接";
      } else {
        button.textContent = "报告已准备";
      }
      setTimeout(() => {
        button.textContent = original;
      }, 1400);
    });
  });
}

function initSolution() {
  if (!document.body.classList.contains("page-solution")) return;
  const cards = [...document.querySelectorAll(".package-card")];
  const cta = document.querySelector(".solution-cta span");
  const ctaButton = document.querySelector(".solution-cta [data-plan]");

  function selectPlan(plan) {
    cards.forEach((card) => {
      const button = card.querySelector("[data-plan]");
      card.classList.toggle("is-selected", button?.dataset.plan === plan);
    });
    if (cta) cta.textContent = `已选择「${plan}」。预约 30 分钟品牌策略沟通，我们帮你确认下一步服务边界。`;
    if (ctaButton) ctaButton.textContent = `预约「${plan}」`;
  }

  cards.forEach((card) => {
    const button = card.querySelector("[data-plan]");
    card.addEventListener("click", () => selectPlan(button.dataset.plan));
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectPlan(button.dataset.plan);
    });
  });
}

function initInsightsV2() {
  if (!document.body.classList.contains("page-insights-v2")) return;

  const hotCards = [...document.querySelectorAll(".hot-card")];
  hotCards.forEach((card) => {
    card.addEventListener("click", () => {
      hotCards.forEach((item) => item.classList.remove("is-focused"));
      card.classList.add("is-focused");
    });
  });

  const form = document.querySelector(".subscribe-form");
  const button = form?.querySelector("button");
  button?.addEventListener("click", () => {
    const input = form.querySelector("input");
    const original = button.textContent;
    button.textContent = input?.value ? "已订阅" : "请填写邮箱";
    setTimeout(() => {
      button.textContent = original;
    }, 1500);
  });
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function formatDate(value) {
  const date = value ? new Date(value) : new Date();
  return date.toISOString().slice(0, 10);
}

function buildDimensions(answers, score) {
  return [
    { name: "品牌力", value: Math.min(95, score + ((answers.stage ?? 1) - 1) * 5) },
    { name: "产品力", value: Math.min(96, score + ((answers.product ?? 1) - 1) * 6) },
    { name: "运营力", value: Math.max(52, score - ((answers.operation ?? 1) + 1) * 3) },
    { name: "组织力", value: Math.max(50, score - 4 + (answers.stage ?? 2) * 2) },
    { name: "资本力", value: Math.max(48, score - 2 + (answers.capital ?? 1) * 4) },
  ].map((item) => ({ ...item, value: Math.round(item.value) }));
}

function buildRisks(answers) {
  const riskMap = [
    ["中", "risk-mid", "同质化风险", "参考款过多会稀释原创识别，建议建立长期可延展的品牌暗号。"],
    ["弱", "risk-low", "工厂落地风险", "材料、结构、起订量和成本仍需提前验证。"],
    ["中", "risk-mid", "内容转译不足", "产品卖点需要转化为详情页、短视频和首发 Drop 节奏。"],
    ["弱", "risk-low", "执行协同风险", "设计、供应链、内容和渠道需要统一成一张上市排期表。"],
  ];
  const preferred = answers.operation ?? 0;
  const top = riskMap[preferred];
  return [
    { level: top[0], className: top[1], title: top[2], copy: top[3] },
    { level: "稳", className: "risk-good", title: "首款鞋方向可收敛", copy: "已有足够线索形成第一双鞋 Brief，可进入趋势筛选和打样评估。" },
    { level: "弱", className: "risk-low", title: "上市节奏需要压缩", copy: "建议把内容资产、样鞋复盘和首发渠道同步推进。" },
  ];
}

function buildSolution(answers) {
  const options = [
    ["第一双鞋 Brief 工作坊", "把品牌定位、目标用户、鞋型角色和反同质化细节整理成可执行 Brief。", "品牌定位 · 鞋型定义 · CMF 语言"],
    ["趋势与竞品筛选", "从流行趋势中筛出适合你的价格带、用户和供应链条件的方向。", "趋势判断 · 竞品拆解 · 视觉暗号"],
    ["打样可行性评估", "提前识别材料、结构、开模、首批数量和量产风险。", "材料结构 · 成本预判 · 工厂沟通"],
    ["首发 Drop 上市计划", "把鞋款方向转成详情页、内容节奏和首发转化动作。", "详情页策略 · 内容脚本 · 首发节奏"],
  ];
  const index = answers.priority ?? 0;
  const selected = options[index];
  return { title: selected[0], copy: selected[1], tags: selected[2] };
}

function radarPoints(values) {
  const center = { x: 110, y: 92 };
  const radius = 78;
  return values
    .map((value, index) => {
      const angle = -Math.PI / 2 + index * ((Math.PI * 2) / 5);
      const r = radius * (value / 100);
      return `${Math.round(center.x + Math.cos(angle) * r)},${Math.round(center.y + Math.sin(angle) * r)}`;
    })
    .join(" ");
}

initHome();
initQuestionnaire();
initReport();
initSolution();
initInsightsV2();
