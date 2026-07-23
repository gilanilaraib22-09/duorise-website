import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  TrendingUp, 
  Truck, 
  PackageCheck, 
  BarChart3, 
  Search, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Layers, 
  Globe2, 
  DollarSign
} from 'lucide-react';

interface Integration {
  name: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

const integrations: Integration[] = [
  { name: 'Amazon SP-API Direct', icon: <ShoppingBag size={18} />, color: 'text-cyan-400', bg: 'hover:bg-cyan-500/10' },
  { name: 'Amazon Ads (PPC)', icon: <TrendingUp size={18} />, color: 'text-blue-400', bg: 'hover:bg-blue-400/10' },
  { name: 'Helium 10 API', icon: <Search size={18} />, color: 'text-sky-400', bg: 'hover:bg-sky-400/10' },
  { name: 'Keepa Historicals', icon: <BarChart3 size={18} />, color: 'text-emerald-400', bg: 'hover:bg-emerald-400/10' },
  { name: 'ShipBob 3PL Sync', icon: <Truck size={18} />, color: 'text-cyan-300', bg: 'hover:bg-cyan-300/10' },
  { name: 'InventoryLab FNSKU', icon: <PackageCheck size={18} />, color: 'text-teal-400', bg: 'hover:bg-teal-400/10' },
  { name: 'Jungle Scout Data', icon: <Layers size={18} />, color: 'text-blue-500', bg: 'hover:bg-blue-500/10' },
  { name: 'FBA Reimbursement Engine', icon: <DollarSign size={18} />, color: 'text-emerald-500', bg: 'hover:bg-emerald-500/10' },
  { name: 'Global Marketplace (US/EU/UAE)', icon: <Globe2 size={18} />, color: 'text-sky-400', bg: 'hover:bg-sky-400/10' },
  { name: 'Sellerboard Ledger', icon: <CreditCard size={18} />, color: 'text-cyan-400', bg: 'hover:bg-cyan-400/10' },
  { name: 'Buy Box Guard', icon: <ShieldCheck size={18} />, color: 'text-blue-400', bg: 'hover:bg-blue-400/10' },
];

const IntegrationTicker: React.FC = () => {
  // Duplicate list to ensure seamless looping
  const duplicatedList = [...integrations, ...integrations, ...integrations];

  return (
    <div className="relative py-12 overflow-hidden w-full border-y border-white/5 bg-black/20 backdrop-blur-md">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[11px] font-black tracking-[0.25em] uppercase text-cyan-400">
          DUORISE FBA ECOSYSTEM CONNECTIVITY
        </span>
        <span className="text-xs text-gray-500 font-medium">
          Zero-latency SP-API connectors with over 30+ Amazon seller tools & 3PL logistics networks
        </span>
      </div>

      <div className="flex select-none">
        <motion.div 
          animate={{ x: [0, -1600] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          className="flex gap-4 pr-4 flex-nowrap"
        >
          {duplicatedList.map((item, index) => (
            <div 
              key={`${item.name}-${index}`}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/10 cursor-pointer transition-all duration-300 ${item.bg} group hover:border-white/25 hover:scale-[1.02]`}
            >
              <div className={`${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors tracking-wide">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default IntegrationTicker;
