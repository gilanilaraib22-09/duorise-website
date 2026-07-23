import React from 'react';
import { motion } from 'framer-motion';
import { Search, Factory, Palette, FileText, Rocket, TrendingUp, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onBookCall?: () => void;
}

const steps = [
  {
    number: "01",
    title: "Research",
    subtitle: "Data-Driven Discovery",
    description: "Helium 10 & Jungle Scout keyword validation. We analyze profit margins, patents, and demand before spending $1.",
    icon: <Search className="text-cyan-400" size={22} />,
  },
  {
    number: "02",
    title: "Sourcing",
    subtitle: "Supplier & Freight QC",
    description: "Direct manufacturer negotiation, pre-shipment quality control, custom packaging & DDP freight directly to Amazon FCs.",
    icon: <Factory className="text-blue-400" size={22} />,
  },
  {
    number: "03",
    title: "Branding",
    subtitle: "Identity & Packaging",
    description: "A brand that commands premium pricing — custom logo, packaging, insert cards, and Brand Registry IP protection.",
    icon: <Palette className="text-sky-400" size={22} />,
  },
  {
    number: "04",
    title: "Listing",
    subtitle: "SEO & High Conversion",
    description: "Persuasive copywriting, indexed backend keywords, CTR hero images, and conversion-focused A+ Content.",
    icon: <FileText className="text-cyan-300" size={22} />,
  },
  {
    number: "05",
    title: "Launch",
    subtitle: "Page One Trajectory",
    description: "Amazon Vine review seeding, Google & Meta external traffic funnels, and algorithm-compliant keyword velocity.",
    icon: <Rocket className="text-blue-300" size={22} />,
  },
  {
    number: "06",
    title: "Scale",
    subtitle: "Automation & Growth",
    description: "Daily PPC bidding optimization, TACoS target caps, 24/7 FBA refund audits, and catalog line expansion.",
    icon: <TrendingUp className="text-cyan-400" size={22} />,
  },
];

const ProcessSection: React.FC<ProcessSectionProps> = ({ onBookCall }) => {
  const [selectedStep, setSelectedStep] = React.useState<typeof steps[0] | null>(null);

  return (
    <section id="process-section" className="relative py-8 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-bold uppercase tracking-widest">
          OUR PROCESS
        </div>
        <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
          From idea to full automation <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
            in 6 proven steps.
          </span>
        </h2>
        <p className="text-gray-300 text-xs sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
          Our systematic playbook crafted across 800+ successful Amazon brand launches. Click any step to inspect the playbook.
        </p>
      </div>

      {/* 6 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            onClick={() => setSelectedStep(step)}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-[28px] bg-[#0c0d12] border border-white/10 hover:border-cyan-500/50 hover:bg-[#10131f] hover:shadow-[0_10px_30px_rgba(0,163,224,0.18)] transition-all duration-300 group relative space-y-3 sm:space-y-4 overflow-hidden cursor-pointer"
          >
            {/* Top Right Ambient Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/0 group-hover:bg-cyan-500/15 blur-2xl rounded-full transition-all duration-500 pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-3xl font-black font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                {step.number}
              </span>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all duration-300">
                {step.icon}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {step.title}
              </h3>
              <span className="text-xs font-semibold text-gray-400 group-hover:text-cyan-400 transition-colors block mt-0.5">
                {step.subtitle}
              </span>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm font-normal leading-relaxed group-hover:text-gray-300 transition-colors">
              {step.description}
            </p>

            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>View Step Playbook</span>
              <ArrowRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Process CTA */}
      <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-cyan-500/10 via-blue-600/5 to-sky-500/10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white">Ready to take step 1 for your Amazon business?</h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">Book a 1-on-1 strategy call with our Amazon experts today.</p>
        </div>

        <button
          onClick={onBookCall}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00A3E0] to-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:from-[#0090FF] hover:to-blue-700 transition-all shadow-[0_0_25px_rgba(0,163,224,0.4)] flex items-center gap-2 flex-shrink-0"
        >
          <span>Book Strategy Call</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Step Detail Modal */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c0d14] border border-white/15 rounded-[32px] p-6 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedStep(null)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-black font-mono text-cyan-400">{selectedStep.number}</span>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">{selectedStep.subtitle}</span>
                <h3 className="text-2xl font-bold text-white">{selectedStep.title} Phase</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {selectedStep.description}
            </p>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">Key Deliverables</span>
              <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                <li>Dedicated Amazon Senior Strategist assigned</li>
                <li>Full algorithmic compliance & SP-API tracking</li>
                <li>Weekly report & transparent KPI milestones</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedStep(null);
                  if (onBookCall) onBookCall();
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-[#0090FF] hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,163,224,0.4)] flex items-center justify-center gap-2"
              >
                <span>Book Strategy Call For {selectedStep.title}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ProcessSection;
