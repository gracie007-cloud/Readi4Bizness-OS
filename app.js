(function () {
  "use strict";

  const STORAGE_KEY = "readi4bizness-os:v1";

  const state = loadState();

  const elements = {
    modeTabs: Array.from(document.querySelectorAll(".mode-tab")),
    navItems: Array.from(document.querySelectorAll(".nav-item")),
    screens: Array.from(document.querySelectorAll(".screen")),
    workspaceModeLabel: document.getElementById("workspaceModeLabel"),
    readinessScore: document.getElementById("readinessScore"),
    readinessBar: document.getElementById("readinessBar"),
    readinessMini: document.getElementById("readinessMini"),
    readinessMiniBar: document.getElementById("readinessMiniBar"),
    snapshotStatus: document.getElementById("snapshotStatus"),
    stageLabel: document.getElementById("stageLabel"),
    channelLabel: document.getElementById("channelLabel"),
    nextMoveLabel: document.getElementById("nextMoveLabel"),
    nextAction: document.getElementById("nextAction"),
    outputDocument: document.getElementById("outputDocument"),
    promiseMatch: document.getElementById("promiseMatch"),
    monetizationFit: document.getElementById("monetizationFit"),
    viabilityScore: document.getElementById("viabilityScore"),
    viabilityVerdict: document.getElementById("viabilityVerdict"),
    viabilityBar: document.getElementById("viabilityBar"),
    loginModal: document.getElementById("loginModal")
  };

  const fields = {
    objective: document.getElementById("objective"),
    skillLevel: document.getElementById("skillLevel"),
    domain: document.getElementById("domain"),
    revenueIntent: document.getElementById("revenueIntent"),
    salesChannel: document.getElementById("salesChannel"),
    promotionMix: document.getElementById("promotionMix"),
    researchNotes: document.getElementById("researchNotes"),
    productFormat: document.getElementById("productFormat"),
    buyerPain: document.getElementById("buyerPain"),
    transformation: document.getElementById("transformation")
  };

  function loadState() {
    try {
      return Object.assign(
        {
          mode: "internal",
          section: "dashboard",
          generated: false,
          viability: 78,
          platform: "YouTube",
          contentPlan: null,
          productKit: null,
          promotionPlan: null
        },
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
      );
    } catch (error) {
      return {
        mode: "internal",
        section: "dashboard",
        generated: false,
        viability: 78,
        platform: "YouTube",
        contentPlan: null,
        productKit: null,
        promotionPlan: null
      };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function readInputs() {
    return Object.fromEntries(
      Object.entries(fields).map(([key, element]) => [key, element.value.trim()])
    );
  }

  function readiness() {
    const data = readInputs();
    const checks = [
      data.objective.length > 10,
      Boolean(data.skillLevel),
      Boolean(data.domain),
      Boolean(data.revenueIntent),
      Boolean(data.salesChannel),
      Boolean(data.promotionMix),
      data.researchNotes.length > 20,
      data.buyerPain.length > 20,
      data.transformation.length > 20,
      state.generated,
      Boolean(state.productKit),
      Boolean(state.contentPlan),
      Boolean(state.promotionPlan)
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }

  function setSection(section) {
    state.section = section;
    saveState();
    render();
  }

  function setMode(mode) {
    state.mode = mode;
    if (mode === "canvas") state.section = "canvas";
    if (mode === "external") state.section = "promotion";
    saveState();
    render();
  }

  function render() {
    document.body.dataset.mode = state.mode;

    elements.modeTabs.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === state.mode);
    });

    elements.navItems.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.section === state.section);
    });

    elements.screens.forEach((screen) => {
      screen.classList.toggle("is-active", screen.id === state.section);
    });

    const modeLabels = {
      internal: "Operational control",
      canvas: "Deep creation mode",
      external: "Public launch view"
    };
    elements.workspaceModeLabel.textContent = modeLabels[state.mode];

    const score = readiness();
    elements.readinessScore.textContent = `${score}%`;
    elements.readinessMini.textContent = `${score}%`;
    elements.readinessBar.style.width = `${score}%`;
    elements.readinessMiniBar.style.width = `${score}%`;

    elements.snapshotStatus.textContent = score >= 80 ? "Launch plan forming" : "Needs source material";
    elements.stageLabel.textContent = score >= 75 ? "Packaging" : "Discovery";
    elements.channelLabel.textContent = fields.promotionMix.value || "YouTube";
    elements.nextMoveLabel.textContent = nextMove(score);
    elements.nextAction.textContent = nextAction(score);
    elements.viabilityScore.textContent = state.viability;
    elements.viabilityBar.style.width = `${state.viability}%`;
    elements.viabilityVerdict.textContent = viabilityVerdict(state.viability);
    elements.promiseMatch.textContent = fields.transformation.value ? "Promise is explicit" : "Needs product promise";
    elements.monetizationFit.textContent = `${fields.salesChannel.value || "Landing page"} path`;

    if (state.generated) renderOutput();
  }

  function nextMove(score) {
    if (!state.generated) return "Generate the blueprint";
    if (!state.productKit) return "Package the product kit";
    if (!state.contentPlan) return "Create the education plan";
    if (!state.promotionPlan) return "Plan ads and affiliates";
    if (score >= 90) return "Prepare external launch page";
    return "Tighten buyer proof";
  }

  function nextAction(score) {
    if (!state.generated) return "Define the product objective and generate the first blueprint.";
    if (!state.productKit) return "Use Product Maker to turn the strategy into a paid asset.";
    if (!state.contentPlan) return "Generate a blog, course, and lead magnet plan for the offer.";
    if (!state.promotionPlan) return "Choose the primary promotion platform and affiliate angle.";
    if (score >= 90) return "Export the blueprint and use it as your launch checklist.";
    return "Strengthen the product promise, source notes, and promotion channel fit.";
  }

  function viabilityVerdict(score) {
    if (score >= 86) return "High confidence. Build a focused version and publish a lead magnet quickly.";
    if (score >= 70) return "Promising if positioned around a clear buyer pain and fast output.";
    if (score >= 55) return "Needs sharper differentiation and proof before launch.";
    return "Do not build yet. Narrow the audience and validate the job-to-be-done first.";
  }

  function generateBlueprint() {
    state.generated = true;
    state.section = "canvas";
    state.mode = "canvas";
    saveState();
    render();
  }

  function runResearch() {
    const selectedFactors = Array.from(document.querySelectorAll(".research-factor:checked")).length;
    const notes = fields.researchNotes.value.trim();
    const base = 48 + selectedFactors * 8 + Math.min(18, Math.floor(notes.length / 60));
    state.viability = Math.max(42, Math.min(96, base));
    saveState();
    render();
  }

  function generateProductKit() {
    const data = readInputs();
    state.productKit = {
      name: offerName(data),
      format: data.productFormat,
      modules: [
        "Offer clarity worksheet",
        "Buyer pain to product promise map",
        "Lesson and asset checklist",
        "Launch page copy blocks",
        "Repurposing plan for YouTube, blog, and email"
      ],
      price: data.productFormat.includes("course") ? "$47 starter / $97 complete" : "$19 starter / $49 complete"
    };
    state.generated = true;
    state.section = "canvas";
    state.mode = "canvas";
    saveState();
    render();
  }

  function generateContentPlan() {
    const data = readInputs();
    state.contentPlan = {
      blog: `How to solve "${sentenceCase(data.buyerPain)}" with a ${data.productFormat.toLowerCase()}`,
      course: [
        "Lesson 1: Define the buyer job-to-be-done",
        "Lesson 2: Build the product promise",
        "Lesson 3: Assemble the digital asset",
        "Lesson 4: Publish the landing page",
        "Lesson 5: Turn the offer into content"
      ],
      leadMagnet: "Digital product viability checklist"
    };
    document.getElementById("blogIdea").textContent = state.contentPlan.blog;
    document.getElementById("courseIdea").textContent = state.contentPlan.course.join(", ");
    document.getElementById("leadMagnetIdea").textContent = state.contentPlan.leadMagnet;
    state.generated = true;
    state.section = "canvas";
    state.mode = "canvas";
    saveState();
    render();
  }

  function generatePromotionPlan() {
    const data = readInputs();
    state.promotionPlan = {
      platform: state.platform,
      adFormat: platformFormat(state.platform, data.productFormat),
      affiliateAngle: "Recruit micro-creators who already teach the same buyer pain and give them a named coupon code.",
      disclosure: "Use clear affiliate disclosure on landing pages, emails, video descriptions, and social posts."
    };
    state.generated = true;
    state.section = "canvas";
    state.mode = "canvas";
    saveState();
    render();
  }

  function offerName(data) {
    const domain = data.domain.replace(/ and /gi, " ").split(" ").filter(Boolean).slice(0, 2).join(" ");
    const format = data.productFormat.replace("Mini digital ", "").replace("Fillable PDF ", "");
    return `${domain} ${format} Toolkit`;
  }

  function platformFormat(platform, productFormat) {
    const map = {
      YouTube: "Long-form tutorial plus three Shorts cutdowns that demonstrate the final asset.",
      Gumroad: "Simple product page with proof images, outcome bullets, and a launch discount.",
      TikTok: "UGC-style problem-first demo showing the before and after in under 45 seconds.",
      Pinterest: "Visual pins showing the template pages, workbook spreads, or course framework."
    };
    if (productFormat.includes("Canva")) return `${map[platform]} Emphasize visual before-and-after examples.`;
    return map[platform];
  }

  function renderOutput() {
    const data = readInputs();
    const product = state.productKit || {
      name: offerName(data),
      format: data.productFormat,
      modules: ["Product promise", "Core asset", "Launch page", "Promotion plan"],
      price: "Starter price to validate demand"
    };
    const content = state.contentPlan || {
      blog: "Buyer-intent article tied to the product pain",
      course: ["Problem", "Framework", "Asset build", "Launch"],
      leadMagnet: "One-page validation checklist"
    };
    const promo = state.promotionPlan || {
      platform: data.promotionMix || "YouTube",
      adFormat: "Educational demo that shows the product solving the buyer pain.",
      affiliateAngle: "Invite trusted niche creators with aligned audiences.",
      disclosure: "Disclose affiliate and AI-assisted content clearly."
    };

    elements.outputDocument.innerHTML = `
      <section>
        <h2>Executive Summary</h2>
        <p><strong>${escapeHtml(product.name)}</strong> is designed for ${escapeHtml(data.domain.toLowerCase())} buyers who need a practical path from idea to monetizable output. The business intent is to ${escapeHtml(data.revenueIntent.toLowerCase())} through a ${escapeHtml(data.salesChannel.toLowerCase())} with ${escapeHtml(data.promotionMix.toLowerCase())} as the first acquisition channel.</p>
      </section>
      <section>
        <h2>Business Blueprint</h2>
        <ul>
          <li><strong>Objective:</strong> ${escapeHtml(data.objective)}</li>
          <li><strong>Audience state:</strong> ${escapeHtml(data.skillLevel)} creator or operator who wants a guided digital product build.</li>
          <li><strong>Primary promise:</strong> ${escapeHtml(data.transformation)}</li>
          <li><strong>Buyer pain:</strong> ${escapeHtml(data.buyerPain)}</li>
        </ul>
      </section>
      <section>
        <h2>Product Kit</h2>
        <p>Format: ${escapeHtml(product.format)}. Suggested validation price: ${escapeHtml(product.price)}.</p>
        <ul>${product.modules.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section>
        <h2>Research Verdict</h2>
        <p>Build viability is <strong>${state.viability}/100</strong>. ${escapeHtml(viabilityVerdict(state.viability))}</p>
      </section>
      <section>
        <h2>Content Plan</h2>
        <ul>
          <li><strong>Blog:</strong> ${escapeHtml(content.blog)}</li>
          <li><strong>Course:</strong> ${content.course.map(escapeHtml).join("; ")}</li>
          <li><strong>Lead magnet:</strong> ${escapeHtml(content.leadMagnet)}</li>
        </ul>
      </section>
      <section>
        <h2>Promotion Plan</h2>
        <ul>
          <li><strong>Primary platform:</strong> ${escapeHtml(promo.platform)}</li>
          <li><strong>Best-fit ad format:</strong> ${escapeHtml(promo.adFormat)}</li>
          <li><strong>Affiliate angle:</strong> ${escapeHtml(promo.affiliateAngle)}</li>
          <li><strong>Governance:</strong> ${escapeHtml(promo.disclosure)}</li>
        </ul>
      </section>
    `;
  }

  function sentenceCase(text) {
    if (!text) return "the core buyer problem";
    return text.charAt(0).toLowerCase() + text.slice(1).replace(/[.?!]$/, "");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function exportBlueprint() {
    if (!state.generated) generateBlueprint();
    const text = elements.outputDocument.innerText.trim();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "readi4bizness-blueprint.txt";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function resetWorkspace() {
    localStorage.removeItem(STORAGE_KEY);
    state.mode = "internal";
    state.section = "dashboard";
    state.generated = false;
    state.viability = 78;
    state.platform = "YouTube";
    state.contentPlan = null;
    state.productKit = null;
    state.promotionPlan = null;
    elements.outputDocument.innerHTML = "<h2>Executive Summary</h2><p>Complete the Business Blueprint and run the generators to create your first Readi4Bizness plan.</p>";
    render();
  }

  elements.modeTabs.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });

  elements.navItems.forEach((button) => {
    button.addEventListener("click", () => setSection(button.dataset.section));
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => setSection(button.dataset.jump));
  });

  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      saveState();
      render();
    });
  });

  document.getElementById("generateBlueprint").addEventListener("click", generateBlueprint);
  document.getElementById("runResearch").addEventListener("click", runResearch);
  document.getElementById("generateProduct").addEventListener("click", generateProductKit);
  document.getElementById("generateContent").addEventListener("click", generateContentPlan);
  document.getElementById("generatePromotion").addEventListener("click", generatePromotionPlan);
  document.getElementById("exportPlan").addEventListener("click", exportBlueprint);
  document.getElementById("resetWorkspace").addEventListener("click", resetWorkspace);

  document.querySelectorAll(".platform-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".platform-card").forEach((item) => item.classList.remove("is-selected"));
      card.classList.add("is-selected");
      state.platform = card.dataset.platform;
      saveState();
      render();
    });
  });

  document.getElementById("openLogin").addEventListener("click", () => {
    if (typeof elements.loginModal.showModal === "function") {
      elements.loginModal.showModal();
    }
  });

  render();
}());
