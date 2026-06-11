const STORAGE_KEY = "footweartrends-diagnosis";
const LEAD_FORM_ENDPOINT = "";
const GROWTH_STAGES = [
  { title: "种子阶段", range: "0-1", label: "种子正在发芽", score: 18 },
  { title: "孵化阶段", range: "1-10", label: "根系正在展开", score: 38 },
  { title: "成长阶段", range: "10-50", label: "枝干快速生长", score: 58 },
  { title: "成熟阶段", range: "50+", label: "树冠开始成形", score: 78 },
  { title: "上市阶段", range: "IPO", label: "品牌飞升增长", score: 92 },
];

const questions = [
  {
    id: "painPoint",
    step: 0,
    eyebrow: "1.1 当前卡点",
    title: "你现在最卡在哪里？",
    desc: "先定位当下最需要拆解的问题，后面的判断会围绕这个卡点展开。",
    options: [
      ["不知道第一双鞋该做什么", "鞋型、用户、价格带还没有收敛", 48],
      ["有想法但怕和竞品太像", "缺少能被记住的产品暗号与品牌识别", 54],
      ["样鞋做出来但不确定能不能卖", "需要评审舒适度、卖点、成本和上市风险", 66],
      ["准备上新但内容与渠道没理顺", "需要首发节奏、详情页逻辑和传播资产", 76],
      ["已经卖起来但增长变慢", "需要复盘爆款机制、扩品路径与品牌资产", 82],
    ],
  },
  {
    id: "stage",
    step: 1,
    eyebrow: "2.1 品牌阶段",
    title: "你的鞋品牌目前处于哪个阶段？",
    desc: "这会决定成长树的位置，也会影响最终的服务建议。",
    options: [
      ["种子阶段（0-1）", "概念验证、品牌雏形，初步探索", 42],
      ["孵化阶段（1-10）", "产品打磨、用户测试、商业模式形成", 58],
      ["成长阶段（10-50）", "稳定增长、团队扩张、市场拓展", 72],
      ["成熟阶段（50+）", "品牌优势、多渠道布局、组织优化", 84],
      ["上市阶段", "商业上升阶段已进入上市流程", 92],
    ],
  },
  {
    id: "scene",
    step: 2,
    eyebrow: "3.1 用户场景",
    title: "你最想切入哪类穿着场景？",
    desc: "鞋类机会往往先来自场景，而不只是一个好看的造型。",
    options: [
      ["城市通勤", "日常高频、舒适耐穿、风格克制", 68],
      ["轻户外 / 徒步", "功能外观、抓地支撑、生活方式内容", 74],
      ["复古运动", "经典轮廓、低饱和配色、穿搭适配", 70],
      ["女性厚底 / 增高", "脚感、比例、搭配效率与社媒传播", 72],
      ["小众圈层风格", "强识别、强态度、先圈层再破圈", 66],
    ],
  },
  {
    id: "firstShoe",
    step: 3,
    eyebrow: "4.1 第一双鞋",
    title: "第一双鞋现在推进到哪一步？",
    desc: "我们会把产品确定性、样鞋成熟度和上市准备拆开判断。",
    options: [
      ["只有灵感与参考图", "还没有明确用户、鞋型角色和价格带", 46],
      ["已有产品 Brief", "目标用户、鞋型、核心卖点基本明确", 62],
      ["正在打样", "已进入材料、结构、楦型或工厂沟通", 72],
      ["已有样鞋", "需要评审脚感、卖点、成本和量产风险", 80],
      ["准备首发", "产品、内容、渠道和库存节奏正在合并", 88],
    ],
  },
  {
    id: "priceBand",
    step: 4,
    eyebrow: "5.1 鞋型价格",
    title: "你计划主推的价格带是？",
    desc: "价格带会影响材料、工艺、内容质感和渠道打法。",
    options: [
      ["199-399 元", "入门价格带，重视供应链效率与基础卖点", 58],
      ["399-699 元", "大众可接受，适合用风格和舒适度做差异", 68],
      ["699-999 元", "需要更强材料、设计语言和品牌叙事", 76],
      ["1000 元以上", "需要完整品牌资产、工艺理由和稀缺感", 84],
      ["还不确定", "需要先判断鞋型角色、成本结构和目标用户", 52],
    ],
  },
  {
    id: "designReady",
    step: 5,
    eyebrow: "6.1 设计 CMF",
    title: "你的设计语言现在有多清晰？",
    desc: "鞋类品牌的差异通常体现在轮廓、材料、配色和细节暗号。",
    options: [
      ["只有参考图", "还没有形成可延展的设计规则", 48],
      ["有初步风格方向", "能描述调性，但细节系统还不稳定", 62],
      ["已有 CMF / 结构规则", "材质、配色、部件和符号有明确原则", 78],
      ["已能形成系列化", "单品之间有统一识别，并能持续扩展", 88],
    ],
  },
  {
    id: "trendSource",
    step: 6,
    eyebrow: "7.1 趋势参考",
    title: "你主要靠什么判断趋势？",
    desc: "我们会判断你的机会识别是基于灵感、竞品还是可验证信号。",
    multiple: true,
    options: [
      ["小红书 / 抖音热度", "看内容平台上的穿搭与种草趋势", 62],
      ["竞品上新与销量", "观察同价位品牌的 SKU 和反馈", 70],
      ["买手店 / 线下渠道", "参考真实陈列、试穿和销售反馈", 76],
      ["海外品牌与展会", "关注国际趋势、材料与设计语言", 74],
      ["内部用户访谈", "直接从目标用户和老客中提炼机会", 82],
    ],
  },
  {
    id: "sampleStatus",
    step: 7,
    eyebrow: "8.1 供应链样鞋",
    title: "供应链与样鞋风险现在如何？",
    desc: "鞋类从设计到量产，中间最容易卡在材料、开模、脚感与起订量。",
    options: [
      ["还没有工厂资源", "需要先评估可行工艺和供应链路径", 46],
      ["有工厂但沟通不顺", "设计意图、成本和样鞋反馈难以对齐", 58],
      ["已完成一轮样鞋", "需要系统评审脚感、结构和卖点", 72],
      ["量产条件基本明确", "成本、交期、质检和首批数量可控", 84],
    ],
  },
  {
    id: "launchNeed",
    step: 8,
    eyebrow: "9.1 上市需求",
    title: "你最需要哪类上市支持？",
    desc: "这会影响结果页推荐的服务路径。",
    options: [
      ["第一双鞋定位清单", "先把产品角色、购买理由和差异化讲清楚", 78],
      ["趋势与竞品判断", "判断哪些机会适合做，哪些不该追", 76],
      ["样鞋评审与优化", "提前识别脚感、成本、量产和卖点风险", 74],
      ["首发 Drop 作战室", "把详情页、短视频、达人和首发节奏统一", 82],
      ["月度鞋品顾问", "持续陪跑扩品、复盘和关键决策", 80],
    ],
  },
  {
    id: "contact",
    step: 9,
    eyebrow: "10.1 联系方式",
    title: "留下联系方式，生成你的诊断报告",
    desc: "我们只会将信息用于本次诊断结果回访与方案沟通。",
    contact: true,
    options: [],
  },
];

function getState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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
    const selected = answers[q.id];
    const stageAnswered = answers.stage !== undefined;
    const stageIndex = stageAnswered ? Math.min(GROWTH_STAGES.length - 1, Math.max(0, answers.stage)) : 0;
    const stage = GROWTH_STAGES[stageIndex];
    const activeStageDomIndex = stageAnswered ? GROWTH_STAGES.length - 1 - stageIndex : -1;
    const progress = ((current + 1) / questions.length) * 100;

    els.eyebrow.textContent = q.eyebrow;
    els.title.textContent = q.title;
    els.desc.textContent = q.desc;
    els.counter.textContent = `问卷 ${current + 1}/${questions.length}`;
    els.progress.style.width = `${progress}%`;
    els.hudScore.textContent = stageAnswered ? `${stage.score}%` : "--";
    els.hudLabel.textContent = stageAnswered ? stage.label : "等待选择成长阶段";
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
      item.classList.toggle("active", stageAnswered && index === activeStageDomIndex);
      item.classList.toggle("lit", stageAnswered && index > activeStageDomIndex);
    });

    if (q.contact) {
      const contact = answers.contact || {};
      els.list.innerHTML = `
        <div class="contact-grid">
          <label>品牌 / 项目名<input type="text" name="brandName" value="${escapeHtml(contact.brandName || "")}" placeholder="例如：城市轻户外鞋品牌" /></label>
          <label>你的称呼<input type="text" name="name" value="${escapeHtml(contact.name || "")}" placeholder="例如：张先生" /></label>
          <label>微信号<input type="text" name="wechat" value="${escapeHtml(contact.wechat || "")}" placeholder="用于发送诊断结果" /></label>
          <label>手机号<input type="tel" name="phone" value="${escapeHtml(contact.phone || "")}" placeholder="选填" /></label>
          <label class="full">邮箱<input type="email" name="email" value="${escapeHtml(contact.email || "")}" placeholder="选填，用于接收报告备份" /></label>
        </div>
        <label class="privacy-choice ${contact.privacy ? "selected" : ""}">
          <input type="checkbox" name="privacy" ${contact.privacy ? "checked" : ""} />
          <span>我同意 FootwearTrends.cn 为本次诊断与方案沟通处理以上信息，并已阅读 <a href="./privacy.html" target="_blank" rel="noopener">隐私说明</a>。</span>
        </label>
        <p class="form-message" data-form-message></p>
      `;
    } else {
      const selectedValues = Array.isArray(selected) ? selected : [];
      els.list.innerHTML = q.options
        .map((option, index) => {
          const isSelected = q.multiple ? selectedValues.includes(index) : index === selected;
          const inputType = q.multiple ? "checkbox" : "radio";
          return `
            <label class="choice ${isSelected ? "selected" : ""}">
              <input type="${inputType}" name="${q.id}" ${isSelected ? "checked" : ""} data-option="${index}" />
              <span><strong>${option[0]}</strong><small>${option[1]}</small></span>
            </label>
          `;
        })
        .join("");
    }

    els.prev.hidden = current === 0;
    els.next.textContent = current === questions.length - 1 ? "生成报告" : "下一步 ›";

    els.list.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", (event) => {
        if (q.contact) {
          answers.contact = readContactForm();
        } else if (q.multiple) {
          const currentValues = new Set(Array.isArray(answers[q.id]) ? answers[q.id] : []);
          const option = Number(input.dataset.option);
          event.target.checked ? currentValues.add(option) : currentValues.delete(option);
          answers[q.id] = [...currentValues];
        } else {
          answers[q.id] = Number(input.dataset.option);
        }
        saveState({ answers, currentQuestion: current });
        pulseTree();
        render();
      });
    });

    els.list.querySelectorAll(".choice").forEach((choice) => {
      choice.addEventListener("click", () => {
        const input = choice.querySelector("input");
        if (!input) return;
        if (q.multiple) return;
        answers[q.id] = Number(input.dataset.option);
        saveState({ answers, currentQuestion: current });
        pulseTree();
        render();
      });
    });
  }

  function readContactForm() {
    const data = answers.contact || {};
    els.list.querySelectorAll("input").forEach((input) => {
      data[input.name] = input.type === "checkbox" ? input.checked : input.value.trim();
    });
    return data;
  }

  function validateQuestion(q) {
    if (q.contact) {
      const contact = readContactForm();
      answers.contact = contact;
      const message = els.list.querySelector("[data-form-message]");
      const hasContact = contact.wechat || contact.phone || contact.email;
      const emailOk = !contact.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
      const phoneOk = !contact.phone || /^[\d+\-\s]{7,20}$/.test(contact.phone);
      let error = "";
      if (!contact.brandName || !contact.name) error = "请填写品牌/项目名和你的称呼。";
      else if (!hasContact) error = "请至少留下微信、手机号或邮箱中的一种联系方式。";
      else if (!emailOk) error = "邮箱格式看起来不正确。";
      else if (!phoneOk) error = "手机号格式看起来不正确。";
      else if (!contact.privacy) error = "请先勾选隐私说明同意项。";
      if (message) message.textContent = error;
      return !error;
    }
    const value = answers[q.id];
    if (q.multiple) return Array.isArray(value) && value.length > 0;
    return value !== undefined;
  }

  async function submitLead() {
    const payload = { answers, completedAt: new Date().toISOString(), source: window.location.href };
    if (!LEAD_FORM_ENDPOINT) return { ok: true, offline: true, payload };
    const response = await fetch(LEAD_FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: response.ok, offline: false };
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

  els.next.addEventListener("click", async () => {
    const q = questions[current];
    if (!validateQuestion(q)) return;
    if (current === questions.length - 1) {
      els.next.disabled = true;
      els.next.textContent = "生成中...";
      const submitted = await submitLead();
      if (!submitted.ok) {
        els.next.disabled = false;
        els.next.textContent = "生成报告";
        const message = els.list.querySelector("[data-form-message]");
        if (message) message.textContent = "提交失败，请稍后再试或直接联系顾问。";
        return;
      }
      saveState({ answers, currentQuestion: current, completedAt: new Date().toISOString(), leadSaved: !submitted.offline });
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
  const selectedScores = questions.filter((q) => !q.contact).map((q) => {
    const selected = answers[q.id];
    if (q.multiple) {
      const indexes = Array.isArray(selected) && selected.length ? selected : [0];
      return indexes.reduce((sum, index) => sum + q.options[index][2], 0) / indexes.length;
    }
    return q.options[selected ?? 0][2];
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

  const toolTemplates = {
    burst: {
      title: "品牌爆发判断框架",
      body: "1. 产品识别：第一眼能否看出鞋型角色和独特细节？\n2. 场景需求：是否对应高频穿着场景或明确圈层？\n3. 内容表达：卖点是否能被 3 条短视频讲清楚？\n4. 供应链可行：材料、楦型、起订量、成本是否可控？\n5. 首发机制：是否具备限量、联名、社群或预售触发点？",
    },
    trend: {
      title: "趋势机会评估模型",
      body: "Step 1 观察信号：内容平台热度、品牌上新、买手店陈列、用户反馈。\nStep 2 判断匹配：目标用户、价格带、供应链能力、品牌调性是否一致。\nStep 3 决定动作：跟进、改造、观望或放弃，并记录原因。",
    },
    brief: {
      title: "第一双鞋定位清单",
      body: "目标用户是谁？\n用户穿它去哪里？\n它解决什么穿着问题？\n主推鞋型是什么？\n价格带为什么合理？\n和 3 个竞品差在哪里？\n第一眼记忆点是什么？\n样鞋最需要验证什么？\n首发内容先讲哪 3 件事？",
    },
    difference: {
      title: "品牌差异化思考模板",
      body: "用户差异：为谁做，不为谁做。\n场景差异：解决哪种具体穿着情境。\n结构差异：鞋底、鞋面、楦型、支撑点。\n视觉差异：颜色、材料、比例、品牌暗号。\n叙事差异：为什么现在需要这双鞋。",
    },
  };
  const modal = document.querySelector("[data-tool-modal]");
  const title = document.querySelector("[data-tool-title]");
  const content = document.querySelector("[data-tool-content]");
  document.querySelectorAll("[data-tool]").forEach((tool) => {
    tool.addEventListener("click", () => {
      const selected = toolTemplates[tool.dataset.tool];
      title.textContent = selected.title;
      content.textContent = selected.body;
      modal?.showModal();
    });
  });
  document.querySelector("[data-close-tool]")?.addEventListener("click", () => modal?.close());
  document.querySelector("[data-copy-tool]")?.addEventListener("click", async (event) => {
    await navigator.clipboard?.writeText(content.textContent);
    const original = event.currentTarget.textContent;
    event.currentTarget.textContent = "已复制";
    setTimeout(() => {
      event.currentTarget.textContent = original;
    }, 1200);
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
  const trendStrength = Array.isArray(answers.trendSource) ? answers.trendSource.length * 3 : 0;
  return [
    { name: "品牌力", value: Math.min(95, score + ((answers.stage ?? 1) - 1) * 4) },
    { name: "产品力", value: Math.min(96, score + ((answers.firstShoe ?? 1) - 1) * 5) },
    { name: "趋势力", value: Math.min(94, score - 2 + trendStrength) },
    { name: "供应力", value: Math.max(48, score - 8 + (answers.sampleStatus ?? 1) * 6) },
    { name: "上市力", value: Math.max(48, score - 5 + (answers.launchNeed ?? 1) * 4) },
  ].map((item) => ({ ...item, value: Math.round(item.value) }));
}

function buildRisks(answers) {
  const painRisks = [
    ["中", "risk-mid", "第一双鞋方向未收敛", "建议先定义目标用户、鞋型角色、价格带和购买理由，再进入设计。"],
    ["中", "risk-mid", "同质化风险", "参考款过多会稀释原创识别，建议建立长期可延展的品牌暗号。"],
    ["弱", "risk-low", "样鞋评审不足", "脚感、结构、成本与量产条件需要在首发前集中复盘。"],
    ["中", "risk-mid", "内容转译不足", "产品卖点需要转化为详情页、短视频和首发 Drop 节奏。"],
    ["弱", "risk-low", "增长复盘缺口", "需要把已售数据、用户反馈和扩品路径合并成下一季策略。"],
  ];
  const top = painRisks[answers.painPoint ?? 0];
  return [
    { level: top[0], className: top[1], title: top[2], copy: top[3] },
    { level: "稳", className: "risk-good", title: "鞋类机会可以被拆解", copy: "当前答案已经足够生成第一轮鞋型、场景、价格带和供应链判断。" },
    { level: "弱", className: "risk-low", title: "上市节奏需要前置", copy: "建议把内容资产、样鞋复盘和首发渠道同步推进，减少临上线返工。" },
  ];
}

function buildSolution(answers) {
  const options = [
    ["第一双鞋 Brief 工作坊", "把品牌定位、目标用户、鞋型角色和反同质化细节整理成可执行 Brief。", "品牌定位 · 鞋型定义 · CMF 语言"],
    ["趋势与竞品筛选", "从流行趋势中筛出适合你的价格带、用户和供应链条件的方向。", "趋势判断 · 竞品拆解 · 视觉暗号"],
    ["打样可行性评估", "提前识别材料、结构、开模、首批数量和量产风险。", "材料结构 · 成本预判 · 工厂沟通"],
    ["首发 Drop 上市计划", "把鞋款方向转成详情页、内容节奏和首发转化动作。", "详情页策略 · 内容脚本 · 首发节奏"],
    ["月度鞋品顾问", "围绕扩品、复盘、渠道和季度节奏持续陪跑。", "增长复盘 · 扩品策略 · 月度评审"],
  ];
  const index = answers.launchNeed ?? Math.min(options.length - 1, answers.painPoint ?? 0);
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
