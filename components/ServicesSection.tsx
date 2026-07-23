import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Factory, 
  Palette, 
  FileText, 
  Store, 
  Sparkles, 
  Target, 
  Zap, 
  DollarSign, 
  ShieldCheck, 
  Star,
  ArrowRight,
  X,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  bullets: string[];
  icon: React.ReactNode;
  badge?: string;
  metrics?: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'product-research',
    title: 'Product Research',
    category: 'Discovery & Analytics',
    description: 'Data-driven product discovery, profit-validated before you spend a single dollar.',
    bullets: [
      'Helium 10 & Jungle Scout high-demand validation',
      'Net ROI > 35% and profit margin > $12/unit requirement',
      'Patents, trademark & regulatory compliance clearance',
      'Supplier cost estimation & Amazon fee breakdowns'
    ],
    icon: <Search className="text-cyan-400" size={24} />,
    badge: 'Popular',
    metrics: '98.4% Win Rate'
  },
  {
    id: 'product-sourcing',
    title: 'Product Sourcing',
    category: 'Supply Chain & Logistics',
    description: 'Vetted suppliers, inspected quality, freight handled end-to-end.',
    bullets: [
      'Direct manufacturer negotiation in China, Vietnam & India',
      'Third-party pre-shipment quality control inspection',
      'Custom packaging, inserts & FNSKU barcode labeling',
      'DDP Freight forwarding directly into Amazon FBA FCs'
    ],
    icon: <Factory className="text-blue-400" size={24} />,
    metrics: 'Top Suppliers'
  },
  {
    id: 'branding',
    title: 'Branding',
    category: 'Brand Experience',
    description: 'A brand that commands premium price — logo, packaging, inserts, identity.',
    bullets: [
      '3D photo-realistic product rendering & mockups',
      'Unboxing packaging design & custom insert cards',
      'Brand style guide: typography, palette & tone of voice',
      'Amazon Brand Registry setup & IP protection'
    ],
    icon: <Palette className="text-sky-400" size={24} />,
    metrics: 'Brand Loyalty'
  },
  {
    id: 'listing-optimization',
    title: 'Listing Optimization',
    category: 'SEO & Copywriting',
    description: 'Rank higher, convert more — SEO title, bullets, keywords and backend.',
    bullets: [
      'Indexed backend search terms & short-tail + long-tail keywords',
      'High-converting persuasive bullet points & descriptions',
      'CTR-optimized main hero images & infographic overlays',
      'A/B split testing for title & main image conversion'
    ],
    icon: <FileText className="text-cyan-300" size={24} />,
    badge: 'Essential',
    metrics: '+45% CTR'
  },
  {
    id: 'amazon-storefront',
    title: 'Amazon Storefront',
    category: 'Design & Cross-Sell',
    description: 'A branded storefront customers actually explore — designed for cross-sell.',
    bullets: [
      'Custom multi-page brand store architecture',
      'Shoppable product tiles, video banners & hero grids',
      'Seasonal promotional tabs & bundle highlight pages',
      'Amazon Store Posts & Brand Follow strategy'
    ],
    icon: <Store className="text-blue-400" size={24} />,
    metrics: 'Higher AOV'
  },
  {
    id: 'aplus-content',
    title: 'A+ Content',
    category: 'Conversion Design',
    description: 'Premium modules that tell your product story and lift conversion 10–20%.',
    bullets: [
      'Custom graphic modules & comparison charts',
      'Mobile-first layout optimization for Amazon app',
      'Alt-text keyword indexing for Google SEO visibility',
      'Brand Story carousel integration'
    ],
    icon: <Sparkles className="text-sky-400" size={24} />,
    metrics: '+20% Conv. Lift'
  },
  {
    id: 'ppc-management',
    title: 'PPC Management',
    category: 'Paid Advertising',
    description: 'Lower ACOS, higher ROAS — campaigns optimized daily by category experts.',
    bullets: [
      'Sponsored Products, Sponsored Brands & Display video ads',
      'Dayparting, negative keyword pruning & placement bidding',
      'TACoS target cap control & organic rank protection',
      'Amazon DSP retargeting campaigns'
    ],
    icon: <Target className="text-cyan-400" size={24} />,
    badge: 'High ROI',
    metrics: '18.6% Avg ACOS'
  },
  {
    id: 'product-launch',
    title: 'Product Launch',
    category: 'Growth & Velocity',
    description: 'First-page rank in weeks with our external + internal launch stack.',
    bullets: [
      'Google Ads & Meta Ads traffic funnels directly to Amazon',
      'Vine Voice review seeding & early reviewer velocity',
      'Keyword ranking trajectory tracking via SP-API',
      'Algorithm-compliant velocity acceleration'
    ],
    icon: <Zap className="text-blue-300" size={24} />,
    metrics: 'Page 1 Rank'
  },
  {
    id: 'fba-reimbursements',
    title: 'FBA Reimbursements',
    category: 'Profit Recovery',
    description: '24/7 audit agent claiming back 3-5% lost inventory refunds.',
    bullets: [
      'Lost & damaged inventory reconciliation across all FCs',
      'Customer return audit (unreturned items refund claims)',
      'Inbound shipment discrepancy filing with carrier proof',
      '100% compliant manual & automated case filing'
    ],
    icon: <DollarSign className="text-emerald-400" size={24} />,
    badge: 'Automated',
    metrics: '3-5% Recovered'
  },
  {
    id: 'account-management',
    title: 'Account Management',
    category: 'Full Service Execution',
    description: 'Complete health protection, Buy Box repricing & inventory management.',
    bullets: [
      '24/7 Account health monitoring & policy warning removal',
      'Dynamic automated repricing & Buy Box protection',
      'Inbound FBA shipping plan creation & 3PL coordination',
      'Monthly profit & loss reporting with dedicated account director'
    ],
    icon: <ShieldCheck className="text-cyan-400" size={24} />,
    badge: 'Full Service',
    metrics: '100% Health'
  },
  {
    id: 'review-strategy',
    title: 'Review & Rating Strategy',
    category: 'Reputation Management',
    description: 'Compliant customer feedback loops to build 5-star brand authority.',
    bullets: [
      'Automated Request a Review API trigger sequencing',
      'Insert card QR code funneling for brand community',
      'Negative feedback mitigation & buyer communication',
      'Amazon Vine Program enrollment & management'
    ],
    icon: <Star className="text-[#00A3E0]" size={24} />,
    metrics: '4.8+ Star Avg'
  }
];

interface ServicesSectionProps {
  onBookCall?: () => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookCall }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services-section" className="relative py-8 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-bold uppercase tracking-widest">
          OUR SERVICES
        </div>
        <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
          Eleven premium services. <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
            One dedicated team.
          </span>
        </h2>
        <p className="text-gray-300 text-xs sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
          Everything you need to launch, scale and automate your Amazon business with total peace of mind.
        </p>
      </div>

      {/* Services 11-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {servicesData.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.04 }}
            onClick={() => setSelectedService(service)}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-[28px] bg-[#0c0d12] border border-white/10 hover:border-cyan-500/50 hover:bg-[#10131f] hover:shadow-[0_10px_30px_rgba(0,163,224,0.18)] transition-all duration-300 cursor-pointer group relative flex flex-col justify-between overflow-hidden"
          >
            {/* Top Hover Gradient Light */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/0 group-hover:bg-cyan-500/15 blur-2xl rounded-full transition-all duration-500 pointer-events-none" />

            <div>
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all duration-300">
                  {service.icon}
                </div>
                {service.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full shadow-sm">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Service Title & Category */}
              <div className="space-y-1 mb-3">
                <span className="text-[10px] font-mono text-gray-400 group-hover:text-cyan-400 transition-colors uppercase tracking-widest block">
                  {service.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm font-normal leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                {service.description}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400 group-hover:text-cyan-300 transition-colors font-mono text-[10px] font-semibold">
                {service.metrics}
              </span>
              <div className="flex items-center gap-1 font-bold text-cyan-400 group-hover:translate-x-1.5 transition-transform duration-200">
                <span>Explore</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0c0d14] border border-white/15 rounded-[32px] p-6 sm:p-8 max-w-xl w-full relative shadow-2xl space-y-6 overflow-hidden"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  {selectedService.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                    {selectedService.category}
                  </span>
                  <h3 className="text-2xl font-black text-white">{selectedService.title}</h3>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedService.description}
              </p>

              <div className="space-y-3 bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">What's Included in this execution:</h4>
                <div className="space-y-2">
                  {selectedService.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    if (onBookCall) onBookCall();
                  }}
                  className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-[#0090FF] hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,163,224,0.4)] flex items-center justify-center gap-2"
                >
                  <Calendar size={15} />
                  Book Strategy Call for {selectedService.title}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ServicesSection;
