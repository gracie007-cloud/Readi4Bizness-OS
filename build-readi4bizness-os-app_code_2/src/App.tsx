import { useState, useEffect, useCallback } from 'react';

// Types
interface User {
  email: string;
  name: string;
}

interface BusinessBlueprint {
  id: string;
  name: string;
  mission: string;
  vision: string;
  targetAudience: string;
  valueProposition: string;
  revenueModel: string;
  createdAt: string;
}

interface ProductResearch {
  id: string;
  name: string;
  marketSize: string;
  competition: string;
  viabilityScore: number;
  opportunities: string[];
  risks: string[];
  createdAt: string;
}

interface ProductPackage {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: string;
  deliverables: string[];
  createdAt: string;
}

interface ContentPlan {
  id: string;
  title: string;
  type: 'blog' | 'course' | 'video';
  topic: string;
  outline: string[];
  status: 'planned' | 'in-progress' | 'published';
  createdAt: string;
}

interface AdPlan {
  id: string;
  name: string;
  platform: string;
  targetAudience: string;
  budget: string;
  goals: string[];
  affiliateLinks: string[];
  createdAt: string;
}

interface CanvasDoc {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

type View = 'dashboard' | 'blueprint' | 'research' | 'product' | 'content' | 'ads' | 'canvas';

// Storage keys
const STORAGE_KEYS = {
  USER: 'r4b_user',
  BLUEPRINTS: 'r4b_blueprints',
  RESEARCH: 'r4b_research',
  PRODUCTS: 'r4b_products',
  CONTENT: 'r4b_content',
  ADS: 'r4b_ads',
  CANVAS: 'r4b_canvas',
};

// Utility functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
  year: 'numeric', month: 'short', day: 'numeric'
});

// Icons as components
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Blueprint: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Research: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Product: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Content: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Ads: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  Canvas: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
};

// Login Modal Component
function LoginModal({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState('demo@readi4bizness.com');
  const [password, setPassword] = useState('readi-demo-2026');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'demo@readi4bizness.com' && password === 'readi-demo-2026') {
      onLogin({ email, name: 'Demo User' });
    } else {
      setError('Invalid credentials. Try demo@readi4bizness.com / readi-demo-2026');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-4">
            <Icons.Lock />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Readi4Bizness OS</h1>
          <p className="text-slate-500 mt-2">Business Operating System</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition"
              placeholder="demo@readi4bizness.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition"
              placeholder="readi-demo-2026"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-slate-400 mt-6">
          Demo: demo@readi4bizness.com / readi-demo-2026
        </p>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({
  blueprints,
  research,
  products,
  content,
  ads,
  canvas,
}: {
  blueprints: BusinessBlueprint[];
  research: ProductResearch[];
  products: ProductPackage[];
  content: ContentPlan[];
  ads: AdPlan[];
  canvas: CanvasDoc[];
}) {
  const stats = [
    { label: 'Business Blueprints', value: blueprints.length, color: 'from-blue-500 to-cyan-500' },
    { label: 'Product Research', value: research.length, color: 'from-purple-500 to-pink-500' },
    { label: 'Product Packages', value: products.length, color: 'from-orange-500 to-amber-500' },
    { label: 'Content Plans', value: content.length, color: 'from-green-500 to-emerald-500' },
    { label: 'Ad Campaigns', value: ads.length, color: 'from-red-500 to-rose-500' },
    { label: 'Canvas Docs', value: canvas.length, color: 'from-indigo-500 to-violet-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-500">Overview of your business operations</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-slate-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl p-8 text-white">
        <h3 className="text-xl font-semibold mb-2">Welcome to Readi4Bizness OS</h3>
        <p className="text-white/80 mb-4">Your complete business operating system for creating and scaling digital products.</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Blueprint Generator</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Product Research</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Content Planning</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Ad Campaigns</span>
        </div>
      </div>
    </div>
  );
}

// Business Blueprint Generator
function BlueprintGenerator({
  blueprints,
  onSave,
  onDelete,
}: {
  blueprints: BusinessBlueprint[];
  onSave: (b: BusinessBlueprint) => void;
  onDelete: (id: string) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    mission: '',
    vision: '',
    targetAudience: '',
    valueProposition: '',
    revenueModel: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: generateId(), createdAt: new Date().toISOString() });
    setFormData({ name: '', mission: '', vision: '', targetAudience: '', valueProposition: '', revenueModel: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Business Blueprint Generator</h2>
        <p className="text-slate-500">Create and manage your business blueprints</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
              placeholder="Enter business name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Revenue Model</label>
            <input
              type="text"
              value={formData.revenueModel}
              onChange={(e) => setFormData({ ...formData, revenueModel: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
              placeholder="e.g., Subscription, One-time purchase"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mission Statement</label>
          <textarea
            value={formData.mission}
            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
            rows={2}
            placeholder="What is your business mission?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Vision Statement</label>
          <textarea
            value={formData.vision}
            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
            rows={2}
            placeholder="Where do you see your business in 5 years?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
          <textarea
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
            rows={2}
            placeholder="Who are your ideal customers?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Value Proposition</label>
          <textarea
            value={formData.valueProposition}
            onChange={(e) => setFormData({ ...formData, valueProposition: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
            rows={2}
            placeholder="What unique value do you provide?"
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition">
          Create Blueprint
        </button>
      </form>
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-700">Your Blueprints</h3>
        {blueprints.length === 0 ? (
          <p className="text-slate-400 text-sm">No blueprints yet. Create your first one above!</p>
        ) : (
          blueprints.map((bp) => (
            <div key={bp.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-slate-900">{bp.name}</h4>
                <p className="text-sm text-slate-500 mt-1">{bp.mission}</p>
                <p className="text-xs text-slate-400 mt-2">{formatDate(bp.createdAt)}</p>
              </div>
              <button onClick={() => onDelete(bp.id)} className="text-red-400 hover:text-red-600">
                <Icons.Trash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Product Research Tool
function ProductResearch({
  research,
  onSave,
  onDelete,
}: {
  research: ProductResearch[];
  onSave: (r: ProductResearch) => void;
  onDelete: (id: string) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    marketSize: '',
    competition: '',
    opportunities: '',
    risks: '',
  });

  const calculateViability = () => {
    const factors = [
      formData.marketSize.length > 20 ? 20 : 10,
      formData.competition.length > 20 ? 20 : 10,
      formData.opportunities.length > 20 ? 30 : 15,
      formData.risks.length > 20 ? 30 : 15,
    ];
    return Math.min(100, factors.reduce((a, b) => a + b, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      viabilityScore: calculateViability(),
      opportunities: formData.opportunities.split('\n').filter(Boolean),
      risks: formData.risks.split('\n').filter(Boolean),
    });
    setFormData({ name: '', marketSize: '', competition: '', opportunities: '', risks: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Digital Product Research</h2>
        <p className="text-slate-500">Conduct viability scans for your digital products</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Market Size</label>
            <textarea
              value={formData.marketSize}
              onChange={(e) => setFormData({ ...formData, marketSize: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              rows={2}
              placeholder="Describe the market size and potential..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Competition Analysis</label>
            <textarea
              value={formData.competition}
              onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              rows={2}
              placeholder="Analyze your competition..."
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Opportunities (one per line)</label>
          <textarea
            value={formData.opportunities}
            onChange={(e) => setFormData({ ...formData, opportunities: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            rows={3}
            placeholder="List potential opportunities..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Risks (one per line)</label>
          <textarea
            value={formData.risks}
            onChange={(e) => setFormData({ ...formData, risks: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            rows={3}
            placeholder="List potential risks..."
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
          Run Viability Scan
        </button>
      </form>
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-700">Research Results</h3>
        {research.length === 0 ? (
          <p className="text-slate-400 text-sm">No research conducted yet.</p>
        ) : (
          research.map((r) => (
            <div key={r.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-slate-900">{r.name}</h4>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  r.viabilityScore >= 70 ? 'bg-green-100 text-green-700' :
                  r.viabilityScore >= 40 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  Viability: {r.viabilityScore}%
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Opportunities:</span>
                  <ul className="mt-1 space-y-1">
                    {r.opportunities.slice(0, 3).map((o, i) => (
                      <li key={i} className="text-slate-700">• {o}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-slate-500">Risks:</span>
                  <ul className="mt-1 space-y-1">
                    {r.risks.slice(0, 3).map((r, i) => (
                      <li key={i} className="text-slate-700">• {r}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-slate-400">{formatDate(r.createdAt)}</span>
                <button onClick={() => onDelete(r.id)} className="text-red-400 hover:text-red-600">
                  <Icons.Trash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Product Maker
function ProductMaker({
  products,
  onSave,
  onDelete,
}: {
  products: ProductPackage[];
  onSave: (p: ProductPackage) => void;
  onDelete: (id: string) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    features: '',
    pricing: '',
    deliverables: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      features: formData.features.split('\n').filter(Boolean),
      deliverables: formData.deliverables.split('\n').filter(Boolean),
    });
    setFormData({ name: '', description: '', features: '', pricing: '', deliverables: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Product Maker</h2>
        <p className="text-slate-500">Package and define your digital products</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="Enter product name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            rows={2}
            placeholder="Describe your product..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Features (one per line)</label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              rows={3}
              placeholder="List product features..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deliverables (one per line)</label>
            <textarea
              value={formData.deliverables}
              onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              rows={3}
              placeholder="List what customers receive..."
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Pricing</label>
          <input
            type="text"
            value={formData.pricing}
            onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="e.g., $97 one-time, $29/month"
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          Create Product Package
        </button>
      </form>
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-700">Your Products</h3>
        {products.length === 0 ? (
          <p className="text-slate-400 text-sm">No products created yet.</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-slate-900">{p.name}</h4>
                  <p className="text-sm text-slate-500 mt-1">{p.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">{p.pricing}</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">{p.features.length} features</span>
                  </div>
                </div>
                <button onClick={() => onDelete(p.id)} className="text-red-400 hover:text-red-600">
                  <Icons.Trash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Content Planner
function ContentPlanner({
  content,
  onSave,
  onDelete,
}: {
  content: ContentPlan[];
  onSave: (c: ContentPlan) => void;
  onDelete: (id: string) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'blog' as 'blog' | 'course' | 'video',
    topic: '',
    outline: '',
    status: 'planned' as 'planned' | 'in-progress' | 'published',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      outline: formData.outline.split('\n').filter(Boolean),
    });
    setFormData({ title: '', type: 'blog', topic: '', outline: '', status: 'planned' });
  };

  const statusColors = {
    planned: 'bg-slate-100 text-slate-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    published: 'bg-green-100 text-green-700',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Content Planner</h2>
        <p className="text-slate-500">Plan your blog posts, courses, and video content</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter content title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="blog">Blog Post</option>
              <option value="course">Course</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Topic</label>
          <textarea
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            rows={2}
            placeholder="What is this content about?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Outline (one point per line)</label>
          <textarea
            value={formData.outline}
            onChange={(e) => setFormData({ ...formData, outline: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            rows={4}
            placeholder="Create your content outline..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Add Content Plan
        </button>
      </form>
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-700">Content Calendar</h3>
        {content.length === 0 ? (
          <p className="text-slate-400 text-sm">No content planned yet.</p>
        ) : (
          content.map((c) => (
            <div key={c.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-900">{c.title}</h4>
                    <span className={`px-2 py-0.5 text-xs rounded ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{c.topic}</p>
                  <span className="text-xs text-slate-400 mt-2 block">{c.type} • {c.outline.length} points</span>
                </div>
                <button onClick={() => onDelete(c.id)} className="text-red-400 hover:text-red-600">
                  <Icons.Trash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Ads & Affiliate Planner
function AdsPlanner({
  ads,
  onSave,
  onDelete,
}: {
  ads: AdPlan[];
  onSave: (a: AdPlan) => void;
  onDelete: (id: string) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    targetAudience: '',
    budget: '',
    goals: '',
    affiliateLinks: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      goals: formData.goals.split('\n').filter(Boolean),
      affiliateLinks: formData.affiliateLinks.split('\n').filter(Boolean),
    });
    setFormData({ name: '', platform: '', targetAudience: '', budget: '', goals: '', affiliateLinks: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Ads & Affiliate Planner</h2>
        <p className="text-slate-500">Plan your ad campaigns and affiliate promotions</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Enter campaign name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Platform</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="">Select platform</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Google Ads">Google Ads</option>
              <option value="TikTok">TikTok</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="YouTube">YouTube</option>
              <option value="Email">Email</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
            <textarea
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              rows={2}
              placeholder="Describe your target audience..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Budget</label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="e.g., $500/month"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Goals (one per line)</label>
          <textarea
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            rows={3}
            placeholder="List your campaign goals..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Affiliate Links (one per line)</label>
          <textarea
            value={formData.affiliateLinks}
            onChange={(e) => setFormData({ ...formData, affiliateLinks: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            rows={2}
            placeholder="Add your affiliate links..."
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Create Ad Plan
        </button>
      </form>
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-700">Ad Campaigns</h3>
        {ads.length === 0 ? (
          <p className="text-slate-400 text-sm">No ad campaigns planned yet.</p>
        ) : (
          ads.map((a) => (
            <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-slate-900">{a.name}</h4>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">{a.platform}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded">{a.budget}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{a.targetAudience}</p>
                </div>
                <button onClick={() => onDelete(a.id)} className="text-red-400 hover:text-red-600">
                  <Icons.Trash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Canvas Document Editor
function CanvasEditor({
  canvas,
  onSave,
  onDelete,
}: {
  canvas: CanvasDoc[];
  onSave: (c: CanvasDoc) => void;
  onDelete: (id: string) => void;
}) {
  const [activeDoc, setActiveDoc] = useState<CanvasDoc | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createNew = () => {
    const newDoc: CanvasDoc = {
      id: generateId(),
      title: 'Untitled Document',
      content: '',
      createdAt: new Date().toISOString(),
    };
    onSave(newDoc);
    setActiveDoc(newDoc);
    setTitle(newDoc.title);
    setContent('');
  };

  const openDoc = (doc: CanvasDoc) => {
    setActiveDoc(doc);
    setTitle(doc.title);
    setContent(doc.content);
  };

  const saveCurrent = () => {
    if (activeDoc) {
      onSave({ ...activeDoc, title, content });
    }
  };

  const exportToText = () => {
    const text = `=== ${title} ===\n\n${content}\n\nCreated: ${activeDoc?.createdAt}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Canvas Document</h2>
        <p className="text-slate-500">Create and export your business documents</p>
      </div>
      <div className="flex gap-2">
        <button onClick={createNew} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition flex items-center gap-2">
          <Icons.Plus /> New Document
        </button>
        {activeDoc && (
          <>
            <button onClick={saveCurrent} className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition flex items-center gap-2">
              <Icons.Check /> Save
            </button>
            <button onClick={exportToText} className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition flex items-center gap-2">
              <Icons.Download /> Export
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <h3 className="font-semibold text-slate-700 mb-3">Documents</h3>
          {canvas.length === 0 ? (
            <p className="text-slate-400 text-sm">No documents yet.</p>
          ) : (
            canvas.map((doc) => (
              <div
                key={doc.id}
                onClick={() => openDoc(doc)}
                className={`p-3 rounded-lg cursor-pointer transition ${
                  activeDoc?.id === doc.id ? 'bg-indigo-100 border border-indigo-300' : 'bg-white hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium text-slate-900 truncate">{doc.title}</span>
                  <button onClick={(e) => { e.stopPropagation(); onDelete(doc.id); }} className="text-red-400 hover:text-red-600">
                    <Icons.Trash />
                  </button>
                </div>
                <span className="text-xs text-slate-400">{formatDate(doc.createdAt)}</span>
              </div>
            ))
          )}
        </div>
        <div className="lg:col-span-3">
          {activeDoc ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-b border-slate-100 font-semibold text-slate-900 focus:outline-none focus:border-indigo-300"
                placeholder="Document Title"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 h-96 resize-none focus:outline-none text-slate-700"
                placeholder="Start writing your document..."
              />
              <div className="px-4 py-2 bg-slate-50 text-xs text-slate-400">
                Last saved: {formatDate(activeDoc.createdAt)}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 text-center">
              <Icons.Canvas />
              <p className="text-slate-500 mt-4">Select a document or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('dashboard');
  const [blueprints, setBlueprints] = useState<BusinessBlueprint[]>([]);
  const [research, setResearch] = useState<ProductResearch[]>([]);
  const [products, setProducts] = useState<ProductPackage[]>([]);
  const [content, setContent] = useState<ContentPlan[]>([]);
  const [ads, setAds] = useState<AdPlan[]>([]);
  const [canvas, setCanvas] = useState<CanvasDoc[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) setUser(JSON.parse(savedUser));

    setBlueprints(JSON.parse(localStorage.getItem(STORAGE_KEYS.BLUEPRINTS) || '[]'));
    setResearch(JSON.parse(localStorage.getItem(STORAGE_KEYS.RESEARCH) || '[]'));
    setProducts(JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]'));
    setContent(JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTENT) || '[]'));
    setAds(JSON.parse(localStorage.getItem(STORAGE_KEYS.ADS) || '[]'));
    setCanvas(JSON.parse(localStorage.getItem(STORAGE_KEYS.CANVAS) || '[]'));
  }, []);

  // Save to localStorage
  const saveToStorage = useCallback((key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    saveToStorage(STORAGE_KEYS.USER, u);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  // CRUD handlers
  const saveBlueprint = (bp: BusinessBlueprint) => {
    const updated = [...blueprints, bp];
    setBlueprints(updated);
    saveToStorage(STORAGE_KEYS.BLUEPRINTS, updated);
  };
  const deleteBlueprint = (id: string) => {
    const updated = blueprints.filter(b => b.id !== id);
    setBlueprints(updated);
    saveToStorage(STORAGE_KEYS.BLUEPRINTS, updated);
  };

  const saveResearch = (r: ProductResearch) => {
    const updated = [...research, r];
    setResearch(updated);
    saveToStorage(STORAGE_KEYS.RESEARCH, updated);
  };
  const deleteResearch = (id: string) => {
    const updated = research.filter(r => r.id !== id);
    setResearch(updated);
    saveToStorage(STORAGE_KEYS.RESEARCH, updated);
  };

  const saveProduct = (p: ProductPackage) => {
    const updated = [...products, p];
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
  };
  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
  };

  const saveContent = (c: ContentPlan) => {
    const updated = [...content, c];
    setContent(updated);
    saveToStorage(STORAGE_KEYS.CONTENT, updated);
  };
  const deleteContent = (id: string) => {
    const updated = content.filter(c => c.id !== id);
    setContent(updated);
    saveToStorage(STORAGE_KEYS.CONTENT, updated);
  };

  const saveAd = (a: AdPlan) => {
    const updated = [...ads, a];
    setAds(updated);
    saveToStorage(STORAGE_KEYS.ADS, updated);
  };
  const deleteAd = (id: string) => {
    const updated = ads.filter(a => a.id !== id);
    setAds(updated);
    saveToStorage(STORAGE_KEYS.ADS, updated);
  };

  const saveCanvasDoc = (c: CanvasDoc) => {
    const existing = canvas.findIndex(d => d.id === c.id);
    let updated: CanvasDoc[];
    if (existing >= 0) {
      updated = [...canvas];
      updated[existing] = c;
    } else {
      updated = [...canvas, c];
    }
    setCanvas(updated);
    saveToStorage(STORAGE_KEYS.CANVAS, updated);
  };
  const deleteCanvasDoc = (id: string) => {
    const updated = canvas.filter(c => c.id !== id);
    setCanvas(updated);
    saveToStorage(STORAGE_KEYS.CANVAS, updated);
  };

  if (!user) {
    return <LoginModal onLogin={handleLogin} />;
  }

  const navItems: { id: View; label: string; icon: React.FC }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'blueprint', label: 'Blueprint', icon: Icons.Blueprint },
    { id: 'research', label: 'Research', icon: Icons.Research },
    { id: 'product', label: 'Products', icon: Icons.Product },
    { id: 'content', label: 'Content', icon: Icons.Content },
    { id: 'ads', label: 'Ads', icon: Icons.Ads },
    { id: 'canvas', label: 'Canvas', icon: Icons.Canvas },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-slate-900">Readi4Bizness OS</h1>
                <p className="text-xs text-slate-500">Business Operating System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">{user.name}</span>
              <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-500 transition">
                <Icons.Logout />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  view === item.id
                    ? 'bg-violet-50 text-violet-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {view === 'dashboard' && (
            <Dashboard blueprints={blueprints} research={research} products={products} content={content} ads={ads} canvas={canvas} />
          )}
          {view === 'blueprint' && (
            <BlueprintGenerator blueprints={blueprints} onSave={saveBlueprint} onDelete={deleteBlueprint} />
          )}
          {view === 'research' && (
            <ProductResearch research={research} onSave={saveResearch} onDelete={deleteResearch} />
          )}
          {view === 'product' && (
            <ProductMaker products={products} onSave={saveProduct} onDelete={deleteProduct} />
          )}
          {view === 'content' && (
            <ContentPlanner content={content} onSave={saveContent} onDelete={deleteContent} />
          )}
          {view === 'ads' && (
            <AdsPlanner ads={ads} onSave={saveAd} onDelete={deleteAd} />
          )}
          {view === 'canvas' && (
            <CanvasEditor canvas={canvas} onSave={saveCanvasDoc} onDelete={deleteCanvasDoc} />
          )}
        </main>
      </div>
    </div>
  );
}
