import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, DollarSign, Award, Star, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

const caseStudies = [
  {
    brand: "Lumina Home & Kitchen",
    niche: "Home Decor & Culinary Gadgets",
    marketplace: "Amazon US & Canada",
    growth: "+320% Revenue Growth",
    initialRevenue: "$22,000/mo",
    scaledRevenue: "$148,000/mo",
    acos: "16.2% PPC ACOS",
    units: "12,400+ Units/Mo",
    summary: "From a single low-performing listing to a top 3 category bestseller in under 8 months using Duorise listing SEO & PPC TACoS management.",
    bullets: [
      "Full listing re-copywriting & 3D render conversion images",
      "Vine Voice program enrolment (60+ 5-star reviews in 30 days)",
      "Daily PPC keyword harvesting & bid automation",
      "FBA inventory rebalancing across ONT8 & FTW1"
    ]
  },
  {
    brand: "Aura Beauty & Wellness",
    niche: "Skincare & Personal Care",
    marketplace: "Amazon US & UK",
    growth: "+450% ROI Multiplier",
    initialRevenue: "$15,000/mo",
    scaledRevenue: "$112,000/mo",
    acos: "14.8% PPC ACOS",
    units: "9,800+ Units/Mo",
    summary: "Transformed an unbranded cosmetic line into a registered Amazon Brand Storefront with custom A+ Content and external Meta ads funnel.",
    bullets: [
      "Custom Amazon Brand Storefront & Brand Story modules",
      "Google & Meta traffic funnels with Amazon Attribution tracking",
      "24/7 FBA refund audit agent recovered $14,200 in 60 days",
      "Subscription Subscribe & Save retention setup"
    ]
  },
  {
    brand: "Apex Fitness & Gear",
    niche: "Sports & Outdoor Accessories",
    marketplace: "Amazon Global (US, CA, EU)",
    growth: "+280% Year-over-Year",
    initialRevenue: "$45,000/mo",
    scaledRevenue: "$210,000/mo",
    acos: "18.1% PPC ACOS",
    units: "18,900+ Units/Mo",
    summary: "Scaled to 7-figure international marketplace coverage with automated multi-currency inventory management and SP-API sync.",
    bullets: [
      "EU & UK PAN-Amazon FBA expansion with VAT compliance",
      "Category Keyword Rank-and-Hold launch playbook",
      "Sponsored Brands & Video Ads campaign dominance",
      "Buy Box repricing protection against unauthorized hijackers"
    ]
  }
];

interface CaseStudiesSectionProps {
  onBookCall?: () => void;
}

const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onBookCall }) => {
  const [activeCase, setActiveCase] = useState(0);

  const current = caseStudies[activeCase];

  return (
    <section id="case-studies-section" className="relative py-8 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-bold uppercase tracking-widest">
          PROOF OF PERFORMANCE
        </div>
        <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
          Real Amazon brands. <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
            Real 7-figure results.
          </span>
        </h2>
        <p className="text-gray-300 text-xs sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
          See how Duorise scales Amazon sellers from stagnant monthly revenue to multi-million dollar brand valuations.
        </p>
      </div>

      {/* Case Study Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
        {caseStudies.map((cs, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCase(idx)}
            className={`px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeCase === idx
                ? 'bg-gradient-to-r from-[#00A3E0] to-blue-600 text-white shadow-[0_0_20px_rgba(0,163,224,0.4)]'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cs.brand}
          </button>
        ))}
      </div>

      {/* Active Case Details Card */}
      <motion.div
        key={activeCase}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-5 sm:p-10 rounded-2xl sm:rounded-[32px] bg-[#0c0d14] border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
      >
        {/* Left Stats & Description (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
              {current.niche}
            </span>
            <span className="text-xs text-gray-500 font-mono">• {current.marketplace}</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {current.brand} <span className="text-emerald-400 text-xl sm:text-2xl font-bold ml-2">({current.growth})</span>
          </h3>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {current.summary}
          </p>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Execution Highlights:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
              {current.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ShieldCheck size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onBookCall}
            className="px-6 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#00A3E0] hover:text-white transition-all shadow-lg flex items-center gap-2"
          >
            <span>Get similar results for your store</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Right Metrics Panel (lg:col-span-5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4">
          <div className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-white/10 pb-3 flex justify-between items-center">
            <span>Verified SP-API Growth</span>
            <span className="text-emerald-400 font-bold">100% AUDITED</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Starting Rev</span>
              <div className="text-lg font-bold text-gray-400 line-through mt-0.5">{current.initialRevenue}</div>
            </div>

            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">Scaled Revenue</span>
              <div className="text-xl font-black text-emerald-400 mt-0.5">{current.scaledRevenue}</div>
            </div>

            <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">PPC Efficiency</span>
              <div className="text-lg font-bold text-white mt-0.5">{current.acos}</div>
            </div>

            <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Monthly Volume</span>
              <div className="text-lg font-bold text-white mt-0.5">{current.units}</div>
            </div>
          </div>

          {/* Mini Sparkline Bar Chart */}
          <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
            <div className="flex justify-between text-[10px] text-gray-400">
              <span className="font-mono">8-Month Trajectory</span>
              <span className="text-emerald-400 font-bold">{current.growth}</span>
            </div>
            <div className="h-14 flex items-end gap-1.5 pt-1">
              {[18, 25, 38, 52, 68, 85, 110, 140].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }}
                  animate={{ height: `${(h/140)*100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex-1 bg-gradient-to-t from-blue-600 via-cyan-500 to-sky-300 rounded-t shadow-[0_0_8px_rgba(0,163,224,0.3)] hover:brightness-125 transition-all" 
                />
              ))}
            </div>
          </div>
        </div>

      </motion.div>

    </section>
  );
};

export default CaseStudiesSection;
