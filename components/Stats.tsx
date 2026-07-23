import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Rocket, HeartHandshake, Globe2, Award, Star, CheckCircle2 } from 'lucide-react';

const Stats: React.FC = () => {
  const statsList = [
    {
      metric: "$50M+",
      label: "Revenue generated",
      sublabel: "Across Amazon FBA & FBM client stores",
      icon: <TrendingUp className="text-cyan-400" size={22} />,
      color: "from-cyan-500/20 to-blue-600/5",
    },
    {
      metric: "800+",
      label: "Products launched",
      sublabel: "Profitable Niche & Private Label Launches",
      icon: <Rocket className="text-blue-400" size={22} />,
      color: "from-blue-500/20 to-indigo-500/5",
    },
    {
      metric: "96%",
      label: "Client satisfaction",
      sublabel: "5-Star Ratings on Upwork & Fiverr",
      icon: <HeartHandshake className="text-sky-400" size={22} />,
      color: "from-sky-500/20 to-cyan-500/5",
    },
    {
      metric: "15+",
      label: "Countries served",
      sublabel: "US, UK, CA, EU, UAE & Global Markets",
      icon: <Globe2 className="text-emerald-400" size={22} />,
      color: "from-emerald-500/20 to-teal-500/5",
    },
  ];

  const trustedLogos = [
    { name: "Google", tag: "Certified Partner" },
    { name: "Forbes", tag: "Featured In" },
    { name: "Yahoo! Finance", tag: "Media Coverage" },
    { name: "Amazon SPN", tag: "Service Provider Network" },
    { name: "Upwork", tag: "Top Rated Plus" },
    { name: "Fiverr Pro", tag: "Top Rated Seller" },
    { name: "Clutch", tag: "Top Agency 2024" },
    { name: "Trustpilot", tag: "4.9/5 Excellent" },
  ];

  return (
    <section id="stats-section" className="relative py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
      
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`p-6 sm:p-8 rounded-[28px] bg-gradient-to-b ${item.color} border border-white/10 hover:border-white/20 transition-all shadow-xl group relative overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                VERIFIED
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
              {item.metric}
            </div>
            
            <div className="text-sm font-bold text-gray-200 mb-1">
              {item.label}
            </div>

            <div className="text-xs text-gray-400 font-normal leading-relaxed">
              {item.sublabel}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FEATURED & TRUSTED ON TICKER */}
      <div className="space-y-6 text-center overflow-hidden">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
            FEATURED & TRUSTED ON
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Infinite Moving Logo Ticker */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Side Fade Gradients */}
          <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#08090d] via-[#08090d]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#08090d] via-[#08090d]/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex items-center gap-4 w-max"
          >
            {[...trustedLogos, ...trustedLogos, ...trustedLogos, ...trustedLogos].map((logo, index) => (
              <div
                key={index}
                className="w-40 sm:w-48 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all flex flex-col items-center justify-center text-center space-y-1 group flex-shrink-0 cursor-pointer"
              >
                <span className="text-sm font-black text-gray-200 group-hover:text-cyan-300 transition-colors">
                  {logo.name}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 group-hover:text-cyan-400 transition-colors">
                  {logo.tag}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Stats;
