import { useEffect, useMemo, useState } from "react";

type User = { email: string; name: string };

type Blueprint = {
  businessName: string;
  niche: string;
  audience: string;
  problem: string;
  solution: string;
  valueProp: string;
  revenueModel: string;
  differentiator: string;
  updatedAt: string;
};

type ResearchScan = {
  id: string;
  idea: string;
  niche: string;
  demand: number;
  competition: number;
  pricing: number;
  effort: number;
  score: number;
  verdict: string;
  notes: string;
  createdAt: string;
};

type ProductTier = { name: string; price: number; deliverables: string[] };
type Product = {
  id: string;
  name: string;
  type: string;
  promise: string;
  tiers: ProductTier[];
  bonuses: string[];
  guarantee: string;
  updatedAt: string;
};

type ContentItem = {
  id: string;
  title: string;
  type: "blog" | "course" | "video" | "email";
  pillar: string;
  status: "idea" | "draft" | "published";
  publishDate: string;
};

type Campaign = {
  id: string;
  name: string;
  channel: "meta" | "google" | "tiktok" | "affiliate" | "email";
  offer: string;
  budget: number;
  cpaTarget: number;
  status: "planned" | "live" | "paused";
};

type OSState = {
  blueprint: Blueprint;
  scans: ResearchScan[];
  products: Product[];
  content: ContentItem[];
  campaigns: Campaign[];
  kpis: { mrr: number; productsLive: number; emailList: number; monthlyTraffic: number };
};

const DEMO_EMAIL = "demo@readi4bizness.com";
const DEMO_PASS = "readi-demo-2026";
const LS_KEY = "readi4bizness-os-v1";

const defaultState: OSState = {
  blueprint: {
    businessName: "Readi4Bizness Digital",
    niche: "Digital product creators & solopreneurs",
    audience: "Coaches, creators, and consultants earning $2k–$20k/mo",
    problem: "Inconsistent product sales and scattered operations",
    solution: "A streamlined OS to research, package, and launch digital products",
    valueProp: "Launch profitable digital products in 14 days with proven templates",
    revenueModel: "Tiered products ($49–$497) + affiliate + coaching upsell",
    differentiator: "Done-with-you packaging + viability scoring before you build",
    updatedAt: new Date().toISOString(),
  },
  scans: [
    {
      id: "s1",
      idea: "Notion Business OS Template",
      niche: "Productivity for creators",
      demand: 8,
      competition: 6,
      pricing: 7,
      effort: 4,
      score: 76,
      verdict: "Build",
      notes: "High demand, medium competition. Price $49–$79.",
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: "s2",
      idea: "AI Content Repurposing Kit",
      niche: "AI for marketers",
      demand: 9,
      competition: 8,
      pricing: 8,
      effort: 6,
      score: 72,
      verdict: "Validate",
      notes: "Crowded but high willingness to pay. Need unique angle.",
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
  ],
  products: [
    {
      id: "p1",
      name: "Digital Product Starter Kit",
      type: "Template + Workshop",
      promise: "Ship your first $99 product in 14 days",
      tiers: [
        { name: "Core", price: 49, deliverables: ["Blueprint template", "Research scorecard", "Launch checklist"] },
        { name: "Pro", price: 149, deliverables: ["Everything in Core", "Product packaging workshop", "Sales page copy kit"] },
      ],
      bonuses: ["30 content prompts", "Affiliate swipe file"],
      guarantee: "14-day action-based guarantee",
      updatedAt: new Date().toISOString(),
    },
  ],
  content: [
    { id: "c1", title: "How to validate a digital product in 48 hours", type: "blog", pillar: "Research", status: "published", publishDate: "2026-01-10" },
    { id: "c2", title: "Packaging your expertise: 3-tier pricing", type: "video", pillar: "Product", status: "draft", publishDate: "2026-01-18" },
    { id: "c3", title: "Email #1: The viability score", type: "email", pillar: "Launch", status: "idea", publishDate: "2026-01-22" },
    { id: "c4", title: "Mini-course: Product Maker", type: "course", pillar: "Product", status: "idea", publishDate: "2026-02-01" },
  ],
  campaigns: [
    { id: "a1", name: "Starter Kit – Meta", channel: "meta", offer: "Core $49", budget: 30, cpaTarget: 18, status: "planned" },
    { id: "a2", name: "Affiliate launch", channel: "affiliate", offer: "Pro 40% commission", budget: 0, cpaTarget: 60, status: "planned" },
  ],
  kpis: { mrr: 2840, productsLive: 1, emailList: 1240, monthlyTraffic: 8450 },
};

function useLocalState() {
  const [user, setUser] = useState<User | null>(null);
  const [state, setState] = useState<OSState>(defaultState);

  useEffect(() => {
    const u = localStorage.getItem("r4b_user");
    const s = localStorage.getItem(LS_KEY);
    if (u) setUser(JSON.parse(u));
    if (s) setState(JSON.parse(s));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("r4b_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [state]);

  return { user, setUser, state, setState };
}

const fmt = new Intl.NumberFormat("en-US");
const currency = (n: number) => `$${fmt.format(n)}`;

export default function App() {
  const { user, setUser, state, setState } = useLocalState();
  const [tab, setTab] = useState<"dash" | "blueprint" | "research" | "maker" | "content" | "growth" | "canvas">("dash");
  const [showLogin, setShowLogin] = useState(!user);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const viabilityScore = (d: number, c: number, p: number, e: number) => {
    // weighted: demand 35%, competition inverse 30%, pricing 20%, effort inverse 15%
    const score = Math.round(d * 3.5 + (10 - c) * 3 + p * 2 + (10 - e) * 1.5);
    return Math.max(0, Math.min(100, score));
  };

  const verdict = (score: number) => (score >= 75 ? "Build" : score >= 60 ? "Validate" : "Kill");

  const exportCanvas = () => {
    const b = state.blueprint;
    const topScans = [...state.scans].sort((a, b) => b.score - a.score).slice(0, 3);
    const prod = state.products[0];
    const content = state.content.slice(0, 6);
    const camps = state.campaigns;

    const md = `# Readi4Bizness OS — Canvas
Generated: ${new Date().toLocaleString()}

## Business Blueprint
- **Business:** ${b.businessName}
- **Niche:** ${b.niche}
- **Audience:** ${b.audience}
- **Problem:** ${b.problem}
- **Solution:** ${b.solution}
- **Value Prop:** ${b.valueProp}
- **Revenue Model:** ${b.revenueModel}
- **Differentiator:** ${b.differentiator}

## Top Research Scans
${topScans.map(s => `- **${s.idea}** — Score ${s.score}/100 (${s.verdict})
  - Demand ${s.demand}/10, Competition ${s.competition}/10, Pricing ${s.pricing}/10, Effort ${s.effort}/10
  - Notes: ${s.notes}`).join("\n")}

## Product Packaging
**${prod?.name || "—"}** — ${prod?.type || ""}
Promise: ${prod?.promise || ""}
${(prod?.tiers || []).map(t => `- ${t.name}: $${t.price} — ${t.deliverables.join(", ")}`).join("\n")}
Bonuses: ${(prod?.bonuses || []).join(", ")}
Guarantee: ${prod?.guarantee || ""}

## Content Plan (next)
${content.map(c => `- [${c.status}] ${c.type.toUpperCase()} — ${c.title} (${c.pillar}) — ${c.publishDate}`).join("\n")}

## Growth Campaigns
${camps.map(c => `- ${c.name} — ${c.channel} — ${c.offer} — Budget $${c.budget}/day — CPA target $${c.cpaTarget} — ${c.status}`).join("\n")}

## KPIs
- MRR: $${state.kpis.mrr}
- Products Live: ${state.kpis.productsLive}
- Email List: ${state.kpis.emailList}
- Monthly Traffic: ${state.kpis.monthlyTraffic}
`;

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "readi4bizness-canvas.md";
    a.click();
    URL.revokeObjectURL(url);
    setToast("Canvas exported");
  };

  const NavItem = ({ id, label, icon }: { id: typeof tab; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setTab(id)}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
        tab === id
          ? "bg-indigo-600/15 text-white ring-1 ring-inset ring-indigo-500/30"
          : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100"
      }`}
    >
      <span className={`grid h-8 w-8 place-items-center rounded-lg ${tab === id ? "bg-indigo-500/20 text-indigo-300" : "bg-zinc-800 text-zinc-400 group-hover:text-zinc-200"}`}>
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-zinc-100">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(40%_30%_at_90%_20%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(30%_30%_at_10%_20%,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_0_30px_rgba(99,102,241,0.35)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M4 7h16M4 12h10M4 17h7" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold tracking-tight">Readi4Bizness OS</div>
              <div className="text-[11px] text-zinc-400 -mt-0.5">Digital Product Business Operating System</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportCanvas} className="hidden rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur hover:bg-white/10 sm:inline-flex">
              Export Canvas
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden text-right sm:block">
                  <div className="text-xs font-medium leading-tight">{user.name}</div>
                  <div className="text-[11px] text-zinc-400 leading-tight">{user.email}</div>
                </div>
                <div className="grid h-8 w-8 place-items-center rounded-full bg-zinc-800 text-xs font-semibold text-zinc-200 ring-1 ring-white/10">
                  {user.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
                </div>
                <button onClick={() => { localStorage.removeItem("r4b_user"); setUser(null); setShowLogin(true); }} className="rounded-lg px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-white/5 hover:text-zinc-200">Sign out</button>
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)} className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:bg-indigo-500">Sign in</button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-4 px-4 py-4 sm:px-6 sm:py-6">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
          <div className="sticky top-[72px] space-y-3">
            <div className="rounded-2xl border border-white/5 bg-zinc-900/60 p-3 backdrop-blur-xl">
              <div className="mb-2 px-2 text-[11px] uppercase tracking-wider text-zinc-500">Workspace</div>
              <nav className="space-y-1.5">
                <NavItem id="dash" label="Dashboard" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg>} />
                <NavItem id="blueprint" label="Business Blueprint" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"/></svg>} />
                <NavItem id="research" label="Research Lab" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>} />
                <NavItem id="maker" label="Product Maker" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7z"/></svg>} />
                <NavItem id="content" label="Content Studio" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5h16v4H4zM4 11h10v8H4zM18 11h2v8h-2z"/></svg>} />
                <NavItem id="growth" label="Growth Hub" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>} />
                <NavItem id="canvas" label="Canvas" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>} />
              </nav>
            </div>

            <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-900/40 p-4 backdrop-blur-xl">
              <div className="text-xs font-medium text-zinc-200">Operating Status</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                {[
                  { label: "MRR", value: currency(state.kpis.mrr) },
                  { label: "Products", value: String(state.kpis.productsLive) },
                  { label: "Email List", value: fmt.format(state.kpis.emailList) },
                  { label: "Traffic/mo", value: fmt.format(state.kpis.monthlyTraffic) },
                ].map((k) => (
                  <div key={k.label} className="rounded-xl border border-white/5 bg-black/20 p-2.5">
                    <div className="text-zinc-500">{k.label}</div>
                    <div className="mt-1 text-sm font-semibold text-zinc-100">{k.value}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setTab("canvas")} className="mt-3 w-full rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-zinc-200 ring-1 ring-inset ring-white/10 hover:bg-white/10">Open Canvas</button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-12 lg:col-span-9 xl:col-span-10">
          {tab === "dash" && (
            <div className="space-y-4">
              {/* Hero */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-8">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
                <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300 backdrop-blur">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live OS
                    </div>
                    <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Welcome back, operator.</h1>
                    <p className="mt-1.5 max-w-xl text-sm text-zinc-400">Your digital product business, organized. Research ideas, package offers, plan content, and launch campaigns — all in one static OS.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button onClick={() => setTab("blueprint")} className="rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-[0_8px_30px_rgba(99,102,241,0.35)] hover:bg-indigo-500">Build Blueprint</button>
                      <button onClick={() => setTab("research")} className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-zinc-200 backdrop-blur hover:bg-white/10">Run Viability Scan</button>
                      <button onClick={exportCanvas} className="rounded-xl border border-white/10 bg-transparent px-3.5 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5">Export</button>
                    </div>
                  </div>
                  <div className="grid w-full max-w-[360px] grid-cols-2 gap-2.5">
                    {[
                      { label: "Viability Score", value: "76/100", sub: "Top idea ready" },
                      { label: "Time to Launch", value: "14 days", sub: "Starter Kit" },
                      { label: "Content Planned", value: String(state.content.length), sub: "Next 30 days" },
                      { label: "Campaigns", value: String(state.campaigns.length), sub: "Planned" },
                    ].map((c) => (
                      <div key={c.label} className="rounded-2xl border border-white/10 bg-zinc-950/60 p-3.5 backdrop-blur">
                        <div className="text-[11px] text-zinc-500">{c.label}</div>
                        <div className="mt-1 text-xl font-semibold">{c.value}</div>
                        <div className="text-[11px] text-zinc-500">{c.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modules grid */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  { id: "blueprint", title: "Business Blueprint", desc: "Define niche, audience, value prop, and revenue model.", action: "Open generator" },
                  { id: "research", title: "Research Lab", desc: "Score ideas on demand, competition, pricing, effort.", action: "New scan" },
                  { id: "maker", title: "Product Maker", desc: "Package tiers, bonuses, guarantee, and sales outline.", action: "Package product" },
                  { id: "content", title: "Content Studio", desc: "Plan blogs, videos, emails, and course modules.", action: "Plan content" },
                  { id: "growth", title: "Growth Hub", desc: "Plan ads and affiliate outreach with CPA targets.", action: "Create campaign" },
                  { id: "canvas", title: "Canvas", desc: "Export your entire operating plan as markdown.", action: "View canvas" },
                ].map((m) => (
                  <div key={m.id} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/60 p-5 backdrop-blur-xl transition hover:bg-zinc-900/80">
                    <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-indigo-600/10 blur-2xl transition group-hover:bg-indigo-600/20" />
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-medium text-zinc-100">{m.title}</div>
                        <p className="mt-1 text-xs text-zinc-400">{m.desc}</p>
                      </div>
                    </div>
                    <button onClick={() => setTab(m.id as any)} className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/10">
                      {m.action}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Recent */}
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/5 bg-zinc-900/60 p-5 backdrop-blur-xl lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Recent Research</div>
                    <button onClick={() => setTab("research")} className="text-xs text-zinc-400 hover:text-zinc-200">View all</button>
                  </div>
                  <div className="mt-3 divide-y divide-white/5">
                    {state.scans.slice(0, 4).map(s => (
                      <div key={s.id} className="flex items-center justify-between py-3">
                        <div>
                          <div className="text-sm">{s.idea}</div>
                          <div className="text-[11px] text-zinc-500">{s.niche} • {new Date(s.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${s.verdict === "Build" ? "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20" : s.verdict === "Validate" ? "bg-amber-500/10 text-amber-300 ring-amber-500/20" : "bg-zinc-700/30 text-zinc-300 ring-white/10"}`}>{s.score} • {s.verdict}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-zinc-900/60 p-5 backdrop-blur-xl">
                  <div className="text-sm font-medium">Quick Actions</div>
                  <div className="mt-3 space-y-2">
                    {[
                      { label: "New viability scan", onClick: () => setTab("research") },
                      { label: "Add product tier", onClick: () => setTab("maker") },
                      { label: "Plan next 7 days content", onClick: () => setTab("content") },
                      { label: "Export canvas", onClick: exportCanvas },
                    ].map(a => (
                      <button key={a.label} onClick={a.onClick} className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-black/20 px-3 py-2.5 text-left text-sm hover:bg-black/30">
                        <span>{a.label}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "blueprint" && (
            <Section title="Business Blueprint" subtitle="Define your positioning in 5 minutes. Saved locally.">
              <div className="grid gap-4 lg:grid-cols-5">
                <div className="lg:col-span-3 space-y-3">
                  {([
                    ["businessName","Business Name"],
                    ["niche","Niche"],
                    ["audience","Target Audience"],
                    ["problem","Core Problem"],
                    ["solution","Your Solution"],
                    ["valueProp","Value Proposition"],
                    ["revenueModel","Revenue Model"],
                    ["differentiator","Differentiator"],
                  ] as const).map(([key,label])=>(
                    <div key={key}>
                      <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">{label}</label>
                      <input value={(state.blueprint as any)[key]} onChange={e=> setState(s=>({...s, blueprint:{...s.blueprint, [key]:e.target.value, updatedAt:new Date().toISOString()}}))} className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm outline-none ring-0 placeholder:text-zinc-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" placeholder={label}/>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-1">
                    <button onClick={()=> setToast("Blueprint saved")} className="rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Save</button>
                    <button onClick={()=> { const b=defaultState.blueprint; setState(s=>({...s, blueprint:{...b, updatedAt:new Date().toISOString()}})); setToast("Reset to demo");}} className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-zinc-200 hover:bg-white/10">Reset demo</button>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="sticky top-[88px] rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(99,102,241,0.12),rgba(99,102,241,0.04))] p-5">
                    <div className="text-xs font-medium uppercase tracking-wider text-indigo-300/80">One-liner</div>
                    <div className="mt-2 text-lg font-semibold leading-snug">{state.blueprint.valueProp || "—"}</div>
                    <div className="mt-4 grid gap-3 text-sm">
                      <div><span className="text-zinc-500">For</span> {state.blueprint.audience || "—"}</div>
                      <div><span className="text-zinc-500">Who struggle with</span> {state.blueprint.problem || "—"}</div>
                      <div><span className="text-zinc-500">We provide</span> {state.blueprint.solution || "—"}</div>
                      <div><span className="text-zinc-500">Unlike</span> alternatives, <span className="text-zinc-300">{state.blueprint.differentiator || "—"}</span></div>
                    </div>
                    <div className="mt-4 text-[11px] text-zinc-500">Updated {new Date(state.blueprint.updatedAt).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {tab === "research" && (
            <Section title="Research Lab" subtitle="Score ideas before you build. Local, instant, no APIs.">
              <ResearchView state={state} setState={setState} scoreFn={viabilityScore} verdictFn={verdict} setToast={setToast} />
            </Section>
          )}

          {tab === "maker" && (
            <Section title="Product Maker" subtitle="Package your offer into clear tiers with bonuses and guarantee.">
              <MakerView state={state} setState={setState} setToast={setToast} />
            </Section>
          )}

          {tab === "content" && (
            <Section title="Content Studio" subtitle="Plan blogs, videos, emails, and course modules.">
              <ContentView state={state} setState={setState} setToast={setToast} />
            </Section>
          )}

          {tab === "growth" && (
            <Section title="Growth Hub" subtitle="Plan paid ads and affiliate outreach with CPA targets.">
              <GrowthView state={state} setState={setState} setToast={setToast} />
            </Section>
          )}

          {tab === "canvas" && (
            <Section title="Canvas" subtitle="Your single source of truth. Export anytime.">
              <CanvasView state={state} exportCanvas={exportCanvas} />
            </Section>
          )}
        </main>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-[1px] shadow-2xl">
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(99,102,241,0.3),rgba(168,85,247,0.25),rgba(14,165,233,0.25),rgba(99,102,241,0.3))] opacity-40" />
            <div className="relative rounded-[22px] bg-zinc-950/90 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_0_30px_rgba(99,102,241,0.35)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 7h16M4 12h10M4 17h7"/></svg>
                </div>
                <div>
                  <div className="text-[17px] font-semibold leading-tight">Sign in to Readi4Bizness OS</div>
                  <div className="text-xs text-zinc-400">Static demo • Local storage only</div>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget as HTMLFormElement);
                  const email = String(fd.get("email") || "");
                  const pass = String(fd.get("password") || "");
                  if (email === DEMO_EMAIL && pass === DEMO_PASS) {
                    setUser({ email, name: "Demo Operator" });
                    setShowLogin(false);
                    setToast("Welcome to the OS");
                  } else {
                    setToast("Use demo@readi4bizness.com / readi-demo-2026");
                  }
                }}
                className="mt-5 space-y-3"
              >
                <div>
                  <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Email</label>
                  <input name="email" defaultValue={DEMO_EMAIL} className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-2.5 text-sm outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Password</label>
                  <input name="password" type="password" defaultValue={DEMO_PASS} className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-2.5 text-sm outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" placeholder="••••••••" />
                </div>
                <button className="mt-1 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-medium text-white shadow-[0_8px_30px_rgba(99,102,241,0.35)] hover:bg-indigo-500">Continue</button>
                <div className="text-center text-[11px] text-zinc-500">Demo credentials prefilled. No external services.</div>
              </form>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {["Blueprint", "Research", "Maker"].map(t => (
                  <div key={t} className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-center text-[11px] text-zinc-400">{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[200] -translate-x-1/2">
          <div className="rounded-full border border-white/10 bg-zinc-900/90 px-4 py-2 text-sm shadow-2xl backdrop-blur-xl">{toast}</div>
        </div>
      )}

      <footer className="border-t border-white/5 py-8 text-center text-[11px] text-zinc-600">© 2026 Readi4Bizness — Static OS build. Data stays in your browser.</footer>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>}
      </div>
      <div className="rounded-3xl border border-white/5 bg-zinc-900/50 p-4 backdrop-blur-xl sm:p-6">{children}</div>
    </div>
  );
}

function ResearchView({ state, setState, scoreFn, verdictFn, setToast }: { state: OSState; setState: React.Dispatch<React.SetStateAction<OSState>>; scoreFn: (d:number,c:number,p:number,e:number)=>number; verdictFn: (s:number)=>string; setToast: (s:string)=>void }) {
  const [idea, setIdea] = useState("AI proposal generator for freelancers");
  const [niche, setNiche] = useState("Freelance services");
  const [demand, setDemand] = useState(8);
  const [competition, setCompetition] = useState(6);
  const [pricing, setPricing] = useState(7);
  const [effort, setEffort] = useState(5);
  const [notes, setNotes] = useState("Validate with 5 interviews");

  const score = useMemo(() => scoreFn(demand, competition, pricing, effort), [demand, competition, pricing, effort, scoreFn]);
  const verdict = useMemo(() => verdictFn(score), [score, verdictFn]);

  const addScan = () => {
    const scan: ResearchScan = { id: Math.random().toString(36).slice(2), idea, niche, demand, competition, pricing, effort, score, verdict, notes, createdAt: new Date().toISOString() };
    setState(s => ({ ...s, scans: [scan, ...s.scans].slice(0, 50) }));
    setToast("Scan saved");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2 space-y-3">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Idea</label>
          <input value={idea} onChange={e=>setIdea(e.target.value)} className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Niche</label>
          <input value={niche} onChange={e=>setNiche(e.target.value)} className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label:"Demand (1-10)", value:demand, set:setDemand },
            { label:"Competition (1-10)", value:competition, set:setCompetition },
            { label:"Pricing power (1-10)", value:pricing, set:setPricing },
            { label:"Build effort (1-10)", value:effort, set:setEffort },
          ].map(s => (
            <div key={s.label}>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">{s.label}</label>
              <input type="range" min={1} max={10} value={s.value} onChange={e=>s.set(Number(e.target.value))} className="w-full accent-indigo-500" />
              <div className="mt-1 text-xs text-zinc-400">{s.value}/10</div>
            </div>
          ))}
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Notes</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
        </div>
        <div className="flex gap-2">
          <button onClick={addScan} className="rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Save scan</button>
          <div className={`grid place-items-center rounded-xl px-3 text-sm font-medium ring-1 ${verdict==="Build"?"bg-emerald-500/10 text-emerald-300 ring-emerald-500/20":verdict==="Validate"?"bg-amber-500/10 text-amber-300 ring-amber-500/20":"bg-zinc-700/30 text-zinc-300 ring-white/10"}`}>{score} • {verdict}</div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Recent scans</div>
        <div className="space-y-2.5">
          {state.scans.map(s => (
            <div key={s.id} className="flex items-start justify-between gap-3 rounded-2xl border border-white/5 bg-black/20 p-4">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{s.idea}</div>
                <div className="mt-0.5 text-[12px] text-zinc-400">{s.niche} • D{s.demand} C{s.competition} P{s.pricing} E{s.effort}</div>
                <div className="mt-1 text-[12px] text-zinc-500 line-clamp-2">{s.notes}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${s.verdict==="Build"?"bg-emerald-500/10 text-emerald-300 ring-emerald-500/20":s.verdict==="Validate"?"bg-amber-500/10 text-amber-300 ring-amber-500/20":"bg-zinc-700/30 text-zinc-300 ring-white/10"}`}>{s.score}</div>
                <div className="mt-1 text-[11px] text-zinc-500">{new Date(s.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
          {state.scans.length===0 && <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-zinc-500">No scans yet. Run your first viability scan.</div>}
        </div>
      </div>
    </div>
  );
}

function MakerView({ state, setState, setToast }: { state: OSState; setState: React.Dispatch<React.SetStateAction<OSState>>; setToast: (s:string)=>void }) {
  const product = state.products[0] || defaultState.products[0];
  const update = (patch: Partial<Product>) => setState(s => ({ ...s, products: [{ ...product, ...patch, updatedAt: new Date().toISOString() }, ...s.products.slice(1)] }));

  const addTier = () => update({ tiers: [...product.tiers, { name: "New Tier", price: 99, deliverables: ["Deliverable 1"] }] });
  const updateTier = (idx:number, patch: Partial<ProductTier>) => update({ tiers: product.tiers.map((t,i)=> i===idx?{...t,...patch}:t) });
  const removeTier = (idx:number) => update({ tiers: product.tiers.filter((_,i)=>i!==idx) });

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Product name" value={product.name} onChange={v=>update({name:v})}/>
          <Field label="Type" value={product.type} onChange={v=>update({type:v})}/>
        </div>
        <Field label="Promise / outcome" value={product.promise} onChange={v=>update({promise:v})}/>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-[11px] uppercase tracking-wider text-zinc-500">Tiers</label>
            <button onClick={addTier} className="text-[11px] text-indigo-300 hover:text-indigo-200">+ Add tier</button>
          </div>
          <div className="space-y-2.5">
            {product.tiers.map((t, i)=>(
              <div key={i} className="rounded-2xl border border-white/5 bg-black/20 p-3.5">
                <div className="grid gap-2.5 sm:grid-cols-3">
                  <input value={t.name} onChange={e=>updateTier(i,{name:e.target.value})} className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:border-indigo-500/50" placeholder="Tier name"/>
                  <input type="number" value={t.price} onChange={e=>updateTier(i,{price:Number(e.target.value)})} className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:border-indigo-500/50" placeholder="Price"/>
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={()=>removeTier(i)} className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-white/5">Remove</button>
                  </div>
                </div>
                <textarea value={t.deliverables.join("\n")} onChange={e=>updateTier(i,{deliverables:e.target.value.split("\n").filter(Boolean)})} rows={3} className="mt-2.5 w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:border-indigo-500/50" placeholder="One deliverable per line"/>
              </div>
            ))}
          </div>
        </div>
        <Field label="Bonuses (comma separated)" value={product.bonuses.join(", ")} onChange={v=>update({bonuses:v.split(",").map(s=>s.trim()).filter(Boolean)})}/>
        <Field label="Guarantee" value={product.guarantee} onChange={v=>update({guarantee:v})}/>
        <div className="flex gap-2 pt-1">
          <button onClick={()=>setToast("Product saved")} className="rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Save</button>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-[88px] space-y-3">
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500">Sales outline</div>
            <div className="mt-2 text-lg font-semibold">{product.name}</div>
            <div className="text-sm text-zinc-400">{product.type} — {product.promise}</div>
            <div className="mt-4 space-y-2">
              {product.tiers.map(t=>(
                <div key={t.name} className="flex items-start justify-between gap-3 rounded-xl border border-white/5 bg-black/30 p-3">
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <ul className="mt-1 list-disc pl-4 text-[12px] text-zinc-400">
                      {t.deliverables.map((d,i)=><li key={i}>{d}</li>)}
                    </ul>
                  </div>
                  <div className="text-sm font-semibold text-indigo-300">${t.price}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[12px] text-zinc-400">Bonuses: {product.bonuses.join(" • ") || "—"}</div>
            <div className="text-[12px] text-zinc-400">Guarantee: {product.guarantee || "—"}</div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-zinc-900/60 p-4">
            <div className="text-xs font-medium">Launch checklist</div>
            <ul className="mt-2 space-y-1.5 text-[12px] text-zinc-400">
              {["Define promise","Build 2 tiers","Add 2 bonuses","Write sales page","Create 3 emails","Setup checkout","Plan 2 ad creatives"].map(i=>(
                <li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-zinc-600"/>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentView({ state, setState, setToast }: { state: OSState; setState: React.Dispatch<React.SetStateAction<OSState>>; setToast: (s:string)=>void }) {
  const [title, setTitle] = useState("How I validated my product in 48h");
  const [type, setType] = useState<ContentItem["type"]>("blog");
  const [pillar, setPillar] = useState("Research");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));

  const add = () => {
    const item: ContentItem = { id: Math.random().toString(36).slice(2), title, type, pillar, status: "idea", publishDate: date };
    setState(s=>({...s, content:[item, ...s.content]}));
    setToast("Content added");
  };

  const setStatus = (id:string, status:ContentItem["status"]) => setState(s=>({...s, content:s.content.map(c=>c.id===id?{...c,status}:c)}));

  const pillars = ["Research","Product","Launch","Growth","Mindset"];

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2 space-y-3">
        <Field label="Title" value={title} onChange={setTitle}/>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Type</label>
            <select value={type} onChange={e=>setType(e.target.value as any)} className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm outline-none focus:border-indigo-500/50">
              <option value="blog">Blog</option>
              <option value="video">Video</option>
              <option value="email">Email</option>
              <option value="course">Course</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Pillar</label>
            <select value={pillar} onChange={e=>setPillar(e.target.value)} className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm outline-none focus:border-indigo-500/50">
              {pillars.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Publish date</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm outline-none focus:border-indigo-500/50"/>
        </div>
        <button onClick={add} className="rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Add to plan</button>

        <div className="rounded-2xl border border-white/5 bg-black/20 p-4">
          <div className="text-xs font-medium">Topic generator</div>
          <div className="mt-2 grid grid-cols-1 gap-1.5">
            {[
              "3 mistakes killing your digital product sales",
              "My 14-day launch playbook",
              "How to price your first $99 product",
              "From idea to checkout: the viability score",
            ].map(t=>(
              <button key={t} onClick={()=>setTitle(t)} className="truncate rounded-lg border border-white/5 bg-zinc-950/60 px-2.5 py-1.5 text-left text-[12px] hover:bg-zinc-900">{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="overflow-hidden rounded-2xl border border-white/5">
          <div className="grid grid-cols-12 border-b border-white/5 bg-white/[0.02] px-3 py-2 text-[11px] uppercase tracking-wider text-zinc-500">
            <div className="col-span-6">Title</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Pillar</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          <div className="divide-y divide-white/5">
            {state.content.map(c=>(
              <div key={c.id} className="grid grid-cols-12 items-center px-3 py-2.5 text-sm">
                <div className="col-span-6 truncate pr-2">{c.title} <span className="ml-1 text-[11px] text-zinc-500">{c.publishDate}</span></div>
                <div className="col-span-2 text-zinc-400">{c.type}</div>
                <div className="col-span-2 text-zinc-400">{c.pillar}</div>
                <div className="col-span-2 text-right">
                  <select value={c.status} onChange={e=>setStatus(c.id, e.target.value as any)} className="rounded-lg border border-white/10 bg-zinc-950/70 px-2 py-1 text-xs outline-none">
                    <option value="idea">idea</option>
                    <option value="draft">draft</option>
                    <option value="published">published</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GrowthView({ state, setState, setToast }: { state: OSState; setState: React.Dispatch<React.SetStateAction<OSState>>; setToast: (s:string)=>void }) {
  const [name, setName] = useState("Starter Kit – Prospecting");
  const [channel, setChannel] = useState<Campaign["channel"]>("meta");
  const [offer, setOffer] = useState("Core $49");
  const [budget, setBudget] = useState(30);
  const [cpa, setCpa] = useState(18);

  const add = () => {
    const camp: Campaign = { id: Math.random().toString(36).slice(2), name, channel, offer, budget, cpaTarget: cpa, status: "planned" };
    setState(s=>({...s, campaigns:[camp, ...s.campaigns]}));
    setToast("Campaign added");
  };

  const toggle = (id:string) => setState(s=>({...s, campaigns:s.campaigns.map(c=>c.id===id?{...c, status: c.status==="live"?"paused":"live"}:c)}));

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2 space-y-3">
        <Field label="Campaign name" value={name} onChange={setName}/>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Channel</label>
            <select value={channel} onChange={e=>setChannel(e.target.value as any)} className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm outline-none">
              <option value="meta">Meta</option>
              <option value="google">Google</option>
              <option value="tiktok">TikTok</option>
              <option value="affiliate">Affiliate</option>
              <option value="email">Email</option>
            </select>
          </div>
          <Field label="Offer" value={offer} onChange={setOffer}/>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Daily budget ($)" value={String(budget)} onChange={v=>setBudget(Number(v)||0)} />
          <Field label="CPA target ($)" value={String(cpa)} onChange={v=>setCpa(Number(v)||0)} />
        </div>
        <button onClick={add} className="rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Add campaign</button>

        <div className="rounded-2xl border border-white/5 bg-black/20 p-4">
          <div className="text-xs font-medium">Affiliate swipe</div>
          <textarea readOnly rows={4} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950/60 p-2.5 text-[12px] text-zinc-300" value={`Subject: Launching ${state.products[0]?.name || "our product"} — 40% commission\n\nHey partner,\n\nWe’re opening ${state.products[0]?.name || "the Starter Kit"} next week. Core is $49, Pro is $149. 40% commission, 60-day cookie.\n\nSwipe + assets: [link]\n\n— Team Readi4Bizness`}/>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="overflow-hidden rounded-2xl border border-white/5">
          <div className="grid grid-cols-12 border-b border-white/5 bg-white/[0.02] px-3 py-2 text-[11px] uppercase tracking-wider text-zinc-500">
            <div className="col-span-5">Campaign</div>
            <div className="col-span-2">Channel</div>
            <div className="col-span-2">Offer</div>
            <div className="col-span-2">Budget</div>
            <div className="col-span-1 text-right">Status</div>
          </div>
          <div className="divide-y divide-white/5">
            {state.campaigns.map(c=>(
              <div key={c.id} className="grid grid-cols-12 items-center px-3 py-2.5 text-sm">
                <div className="col-span-5 truncate pr-2">{c.name}</div>
                <div className="col-span-2 capitalize text-zinc-400">{c.channel}</div>
                <div className="col-span-2 text-zinc-400">{c.offer}</div>
                <div className="col-span-2 text-zinc-300">${c.budget}/d • CPA ${c.cpaTarget}</div>
                <div className="col-span-1 text-right">
                  <button onClick={()=>toggle(c.id)} className={`rounded-full px-2.5 py-1 text-[11px] ring-1 ${c.status==="live"?"bg-emerald-500/10 text-emerald-300 ring-emerald-500/20":"bg-zinc-700/30 text-zinc-300 ring-white/10"}`}>{c.status}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CanvasView({ state, exportCanvas }: { state: OSState; exportCanvas: ()=>void }) {
  const top = [...state.scans].sort((a,b)=>b.score-a.score)[0];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={exportCanvas} className="rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Export Markdown</button>
        <div className="text-xs text-zinc-500">Local export • No servers</div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-zinc-950/60 p-5 lg:col-span-2">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500">Business Blueprint</div>
          <div className="mt-2 text-xl font-semibold">{state.blueprint.businessName}</div>
          <div className="mt-3 grid gap-2 text-sm text-zinc-300">
            <div><span className="text-zinc-500">Niche:</span> {state.blueprint.niche}</div>
            <div><span className="text-zinc-500">Audience:</span> {state.blueprint.audience}</div>
            <div><span className="text-zinc-500">Value Prop:</span> {state.blueprint.valueProp}</div>
            <div><span className="text-zinc-500">Revenue:</span> {state.blueprint.revenueModel}</div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-zinc-950/60 p-5">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500">Top Research</div>
          {top ? (
            <>
              <div className="mt-2 text-lg font-semibold">{top.idea}</div>
              <div className="mt-1 text-sm text-zinc-400">{top.niche}</div>
              <div className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${top.verdict==="Build"?"bg-emerald-500/10 text-emerald-300 ring-emerald-500/20":top.verdict==="Validate"?"bg-amber-500/10 text-amber-300 ring-amber-500/20":"bg-zinc-700/30 text-zinc-300 ring-white/10"}`}>{top.score} • {top.verdict}</div>
            </>
          ) : <div className="mt-2 text-sm text-zinc-500">No scans yet</div>}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-zinc-950/60 p-5">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500">Product</div>
          <div className="mt-2 font-medium">{state.products[0]?.name}</div>
          <div className="text-sm text-zinc-400">{state.products[0]?.promise}</div>
          <div className="mt-3 space-y-1.5">
            {state.products[0]?.tiers.map(t=>(
              <div key={t.name} className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">{t.name}</span>
                <span className="text-indigo-300">${t.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-zinc-950/60 p-5">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500">Content (next)</div>
          <ul className="mt-2 space-y-1.5 text-sm">
            {state.content.slice(0,5).map(c=>(
              <li key={c.id} className="flex items-center justify-between">
                <span className="truncate pr-2 text-zinc-300">{c.title}</span>
                <span className="text-[11px] text-zinc-500">{c.publishDate}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/5 bg-zinc-950/60 p-5">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500">Growth</div>
          <ul className="mt-2 space-y-1.5 text-sm">
            {state.campaigns.map(c=>(
              <li key={c.id} className="flex items-center justify-between">
                <span className="truncate pr-2 text-zinc-300">{c.name}</span>
                <span className="text-[11px] text-zinc-500">${c.budget}/d</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label:string; value:string; onChange:(v:string)=>void }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">{label}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm outline-none placeholder:text-zinc-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
    </div>
  );
}