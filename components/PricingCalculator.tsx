import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Shield, Cpu, HelpCircle, DollarSign, ShoppingBag } from 'lucide-react';

interface Tier {
  name: string;
  basePrice: number;
  maxVolume: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

interface PricingCalculatorProps {
  onBookCall?: (revenue?: number) => void;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onBookCall }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [revenueValue, setRevenueValue] = useState<number>(85000); // Slider value ($10,000 - $1,000,000)

  // Calculate estimated savings metrics
  const estimatedRefunds = Math.round(revenueValue * 0.022); // ~2.2% refund recovery
  const hoursSaved = Math.round(20 + (revenueValue / 10000) * 12); // Hours saved on PPC & prep

  // Deduce matched Tier based on slider value
  const getMatchedTier = (val: number): Tier => {
    if (val <= 25000) {
      return {
        name: 'FBA Launchpad',
        basePrice: 49,
        maxVolume: '$25,000 / mo sales',
        description: 'For growing FBA sellers launching their first private label or wholesale products.',
        features: [
          'Up to $25,000 monthly Amazon revenue',
          'Standard SP-API sync (hourly)',
          'Basic AI repricer & buy box guard',
          'Automated FBA reimbursement scanner',
          'Email support response within 24h'
        ],
        cta: 'Launch FBA Store',
        highlight: false
      };
    } else if (val <= 250000) {
      const multiplier = (val - 25000) / 225000;
      const calculatedPrice = Math.round(149 + multiplier * 180);
      return {
        name: 'FBA Accelerator',
        basePrice: calculatedPrice,
        maxVolume: `$${val.toLocaleString()} / mo sales`,
        description: 'For established FBA brands needing real-time repricing, 3PL prep routing, and PPC optimization.',
        features: [
          `Up to $${val.toLocaleString()} monthly revenue`,
          'Zero-latency SP-API gateway (12ms repricing)',
          '24/7 FBA refund & lost inventory claim agent',
          'Autonomous PPC TACoS bidding optimizer',
          'Dedicated FBA strategy manager SLA (2h)'
        ],
        cta: 'Accelerate FBA Brand',
        highlight: true
      };
    } else {
      const multiplier = (val - 250000) / 750000;
      const calculatedPrice = Math.round(499 + multiplier * 500);
      return {
        name: 'Brand Empire Protocol',
        basePrice: calculatedPrice,
        maxVolume: `$${val.toLocaleString()} / mo sales`,
        description: 'For 7-figure & 8-figure Amazon conglomerates, multi-account aggregates, and global sellers.',
        features: [
          `Unlimited Amazon store revenue`,
          'Multi-account & global SP-API endpoints (US/EU/UAE)',
          'Custom 3PL & CARP warehouse slot allocator',
          'Isolated private database & ZK-token vault',
          '24/7 VIP phone hotline to FBA logistics engineer'
        ],
        cta: 'Contact FBA Sales',
        highlight: false
      };
    }
  };

  const matchedTier = getMatchedTier(revenueValue);
  const displayPrice = billingPeriod === 'yearly' 
    ? Math.round(matchedTier.basePrice * 0.8) // 20% discount
    : matchedTier.basePrice;

  return (
    <div id="pricing-calculator" className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16 bg-black/20 border border-white/5 rounded-2xl sm:rounded-[48px] backdrop-blur-3xl relative overflow-hidden">
      <div className="absolute top-0 left-10 w-[250px] h-[250px] bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <ShoppingBag size={12} />
          Amazon FBA ROI & Growth Calculator
        </div>
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-white">
          Predictable, revenue-backed pricing
        </h2>
        <p className="text-gray-400 text-xs md:text-base max-w-xl mx-auto leading-relaxed">
          Slide the calculator to match your store's monthly Amazon FBA revenue and calculate custom profit savings instantly.
        </p>
      </div>

      {/* Billing Switcher */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
          Monthly Billing
        </span>
        <button 
          onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
          className="w-14 h-8 rounded-full bg-white/5 border border-white/10 relative p-1 transition-colors hover:border-white/20"
        >
          <motion.div 
            animate={{ x: billingPeriod === 'yearly' ? 24 : 0 }}
            className="w-6 h-6 rounded-full bg-[#00A3E0] shadow-md"
          />
        </button>
        <span className={`text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
          Yearly Billing
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/25 text-cyan-400 text-[9px] font-black uppercase">
            Save 20%
          </span>
        </span>
      </div>

      {/* Calculator Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
        
        {/* Left Side: Volume Slider & Scaling Output (cols 7) */}
        <div className="lg:col-span-7 bg-[#0c0c0c]/80 border border-white/10 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">STEP 1: SELECT STORE VOLUME</span>
                <h3 className="text-xl font-bold text-white mt-1">Monthly Amazon FBA Gross Revenue</h3>
              </div>
              <HelpCircle size={16} className="text-gray-600 hover:text-gray-400 transition-colors cursor-pointer" />
            </div>

            {/* Slider Component */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Store Revenue</span>
                <span className="text-3xl font-black text-white tracking-tight">
                  ${revenueValue.toLocaleString()} <span className="text-xs font-medium text-gray-500">/ month</span>
                </span>
              </div>
              <div className="relative pt-4">
                <input 
                  type="range" 
                  min="10000" 
                  max="1000000" 
                  step="5000"
                  value={revenueValue} 
                  onChange={(e) => setRevenueValue(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#00A3E0] focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #00A3E0 0%, #00A3E0 ${(revenueValue / 1000000) * 100}%, rgba(255,255,255,0.05) ${(revenueValue / 1000000) * 100}%, rgba(255,255,255,0.05) 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-gray-600 font-mono pt-3">
                  <span>$10K/MO</span>
                  <span>$250K</span>
                  <span>$500K</span>
                  <span>$1M+/MO</span>
                </div>
              </div>
            </div>

            {/* Dynamic ROI & Estimated Savings Outputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Est. FBA Refunds</span>
                <p className="text-lg font-black text-white mt-1">
                  +${estimatedRefunds.toLocaleString()} <span className="text-[10px] text-gray-400 font-normal">/ mo</span>
                </p>
              </div>
              <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">Hours Saved</span>
                <p className="text-lg font-black text-white mt-1">
                  {hoursSaved} hrs <span className="text-[10px] text-gray-400 font-normal">/ mo</span>
                </p>
              </div>
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Buy Box Guard</span>
                <p className="text-lg font-black text-white mt-1">
                  99.8% Share
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 items-center">
            <span className="text-xs text-gray-500 text-center md:text-left">
              Need multi-brand or agency white-label portals? Contact enterprise staff.
            </span>
            <button 
              onClick={() => onBookCall?.(revenueValue)}
              className="text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              Review custom SLAs
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Right Side: Matched Plan Details (cols 5) */}
        <div className={`lg:col-span-5 border rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
          matchedTier.highlight 
            ? 'bg-gradient-to-b from-[#003855]/40 to-black border-cyan-500/40 shadow-[0_0_40px_rgba(0,163,224,0.18)]' 
            : 'bg-[#0c0c0c]/80 border-white/10'
        }`}>
          {matchedTier.highlight && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-[#00A3E0] text-white font-black text-[9px] tracking-widest uppercase rounded-full shadow-md">
              RECOMMENDED
            </div>
          )}

          <div className="space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
                {matchedTier.name}
              </span>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                {matchedTier.description}
              </p>
            </div>

            {/* Pricing Tag */}
            <div className="flex items-baseline gap-1.5 py-4 border-y border-white/5">
              <span className="text-5xl font-black text-white tracking-tighter">
                ${displayPrice}
              </span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                / month
              </span>
            </div>

            {/* Feature Checklists */}
            <div className="space-y-3.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Included FBA Suite Features:</span>
              <div className="space-y-2.5">
                {matchedTier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mt-0.5 flex-shrink-0">
                      <Check size={10} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => onBookCall?.(revenueValue)}
            className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest mt-8 transition-all flex items-center justify-center gap-2 cursor-pointer ${
            matchedTier.highlight 
              ? 'bg-white text-[#06070a] hover:bg-[#00A3E0] hover:text-white hover:shadow-[0_0_20px_rgba(0,163,224,0.4)]' 
              : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
          }`}>
            {matchedTier.cta}
            <ArrowRight size={12} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default PricingCalculator;
