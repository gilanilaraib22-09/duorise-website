import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Truck, 
  PackageCheck, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  BarChart3, 
  AlertTriangle,
  FileText,
  Boxes,
  Cpu
} from 'lucide-react';

interface FbaPreset {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  nodes: {
    id: string;
    label: string;
    status: string;
    details: string;
    tag: string;
  }[];
  payloadSample: string;
  outputMetric: string;
}

const presets: FbaPreset[] = [
  {
    id: 'product-research',
    title: 'AI ASIN & Keyword Harvester',
    subtitle: 'Automate product research with Helium10 & Keepa historical SP-API scans',
    icon: <Search size={18} />,
    nodes: [
      { id: 'n1', label: 'Helium10 BSR Scanner', status: 'Active', details: 'Filtering BSR < 5,000, Profit > 35%', tag: 'SP-API SCAN' },
      { id: 'n2', label: 'Keepa Price Volatility', status: 'Verified', details: 'Analyzing 90-day buy box stability', tag: 'KEEPA HIST' },
      { id: 'n3', label: 'Supplier Cost & FBA Fee', status: 'Calculated', details: 'Est. FBA Fee $4.20 • Net Margin 38.2%', tag: 'FBA CALC' },
      { id: 'n4', label: 'Listing Auto-Draft', status: 'Ready', details: 'SEO Bullet Points & A+ Content generated', tag: 'AI LISTING' },
    ],
    payloadSample: `{
  "asin": "B09X82PRTM",
  "product": "Stainless Vacuum Tumbler 32oz",
  "monthly_est_sales": "$42,800",
  "bsr_rank": 1420,
  "net_margin": "38.2%",
  "fba_fee": "$4.20",
  "competition_score": "Low (3 Sellers)"
}`,
    outputMetric: '$42.8K/mo Est. Revenue'
  },
  {
    id: 'fba-prep',
    title: 'Automated FBA Prep & 3PL Logistics',
    subtitle: 'Streamline FNSKU labeling, pallet routing & Amazon FC appointments',
    icon: <Truck size={18} />,
    nodes: [
      { id: 'n1', label: '3PL Inventory Pull', status: 'Dispatched', details: 'Receiving 2,500 units at ShipBob Hub', tag: '3PL SYNC' },
      { id: 'n2', label: 'FNSKU Barcode Print', status: 'Completed', details: 'Applied Amazon X0039201A labels', tag: 'BARCODE' },
      { id: 'n3', label: 'Carton & Pallet Routing', status: 'Assigned', details: 'Routed 12 Pallets to FC ONT8 & FTW1', tag: 'FC ALLOC' },
      { id: 'n4', label: 'CARP FC Appointment', status: 'Confirmed', details: 'Amazon Carrier Portal Slot: 14:00 EST', tag: 'CARP SLOT' },
    ],
    payloadSample: `{
  "shipment_id": "FBA1849204_ONT8",
  "total_units": 2500,
  "cartons": 100,
  "destination_fc": "ONT8 (Moreno Valley, CA)",
  "fnsku": "X0039201A",
  "carrier": "Amazon LTL Freight",
  "delivery_slot": "2026-07-24T14:00:00Z"
}`,
    outputMetric: '2,500 Units Prepped'
  },
  {
    id: 'ppc-defense',
    title: 'Smart PPC & Buy Box Defense Engine',
    subtitle: 'Maximize TACoS efficiency with automated bid adjustments & repricing',
    icon: <BarChart3 size={18} />,
    nodes: [
      { id: 'n1', label: 'Buy Box Guard', status: 'Monitoring', details: 'Repricing within 12ms to retain 99.8% Buy Box', tag: 'REPRICER' },
      { id: 'n2', label: 'Target ACoS Optimizer', status: 'Optimizing', details: 'Adjusted 140 bids for TACoS < 8.5%', tag: 'PPC BIDDER' },
      { id: 'n3', label: 'Negative KW Harvester', status: 'Pruned', details: 'Stripped 18 zero-conversion search terms', tag: 'NEG HARVEST' },
      { id: 'n4', label: 'Rank Tracker Sync', status: 'Top 3', details: 'Indexed #1 for "insulated water bottle"', tag: 'RANK TRACK' },
    ],
    payloadSample: `{
  "campaign": "PPC_TopSearch_Exact",
  "current_tacos": "8.2%",
  "buy_box_share": "99.8%",
  "bid_adjustments": 140,
  "wasted_spend_saved": "$1,420/mo",
  "rank_index": "Position #1"
}`,
    outputMetric: '8.2% TACoS Achieved'
  },
  {
    id: 'fba-reimbursement',
    title: 'Automated FBA Refund & Reimbursements',
    subtitle: 'Auto-audit lost/damaged inventory & claim 3-5% back from Amazon',
    icon: <DollarSign size={18} />,
    nodes: [
      { id: 'n1', label: 'FC Warehouse Audit', status: 'Auditing', details: 'Scanned 14,200 inventory movement logs', tag: 'FC AUDIT' },
      { id: 'n2', label: 'Discrepancy Matcher', status: 'Found 18', details: 'Detected 14 lost units & 4 customer unreturned', tag: 'DISCREPANCY' },
      { id: 'n3', label: 'SP-API Case Filer', status: 'Submitted', details: 'Auto-created Amazon Seller Case #149201948', tag: 'CASE FILE' },
      { id: 'n4', label: 'Payout Reconciliation', status: 'Approved', details: '$3,480.00 credited to Seller Central balance', tag: 'PAYOUT' },
    ],
    payloadSample: `{
  "audit_period": "Last 90 Days",
  "shipments_audited": 14200,
  "discrepancies_found": 18,
  "case_id": "149201948",
  "reimbursement_approved": "$3,480.00",
  "status": "Credited to Balance"
}`,
    outputMetric: '$3,480 Refund Claimed'
  }
];

const AutomationGraphic: React.FC = () => {
  const [activePreset, setActivePreset] = useState<FbaPreset>(presets[0]);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const runSimulation = () => {
    setIsRunning(true);
    setActiveNodeIndex(0);
    const interval = setInterval(() => {
      setActiveNodeIndex(prev => {
        if (prev >= activePreset.nodes.length - 1) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  return (
    <div id="orchestration-sandbox" className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 bg-black/30 border border-white/5 rounded-[28px] sm:rounded-[48px] backdrop-blur-3xl relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Cpu size={12} />
          Interactive FBA Orchestration Sandbox
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Automate your Amazon FBA Engine
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
          Experience real-time Amazon SP-API workflow orchestration. Test how DuoRise handles winning ASIN discovery, FBA prep routing, PPC bidding, and refund claims.
        </p>
      </div>

      {/* Preset Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-5xl mx-auto">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => {
              setActivePreset(preset);
              setActiveNodeIndex(0);
              setIsRunning(false);
            }}
            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
              activePreset.id === preset.id
                ? 'bg-gradient-to-br from-cyan-500/20 to-black border-cyan-500/50 shadow-[0_0_25px_rgba(0,163,224,0.2)]'
                : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 transition-colors ${
              activePreset.id === preset.id ? 'bg-[#00A3E0] text-white font-bold' : 'bg-white/5 text-gray-400'
            }`}>
              {preset.icon}
            </div>
            <div className="text-xs font-bold text-white mb-1 line-clamp-1">{preset.title}</div>
            <div className="text-[10px] text-gray-400 font-light line-clamp-2">{preset.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Interactive Flow Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto items-stretch">
        
        {/* Left Col: Step Nodes (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-[#0c0c0c]/90 border border-white/10 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div>
                <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">ACTIVE SP-API PIPELINE</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{activePreset.title}</h3>
              </div>

              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="px-4 py-2 bg-[#00A3E0] hover:bg-[#0090FF] text-white font-bold text-xs rounded-xl transition-all uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,163,224,0.3)] disabled:opacity-50"
              >
                <RefreshCw size={12} className={isRunning ? 'animate-spin' : ''} />
                {isRunning ? 'Orchestrating...' : 'Run Live Workflow'}
              </button>
            </div>

            {/* Nodes Pipeline */}
            <div className="space-y-3 relative">
              {activePreset.nodes.map((node, index) => {
                const isActive = index === activeNodeIndex;
                const isPassed = index < activeNodeIndex;

                return (
                  <motion.div
                    key={node.id}
                    onClick={() => setActiveNodeIndex(index)}
                    whileHover={{ scale: 1.01 }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isActive
                        ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_15px_rgba(0,163,224,0.15)]'
                        : isPassed
                        ? 'bg-white/[0.03] border-emerald-500/30'
                        : 'bg-white/[0.01] border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                        isActive
                          ? 'bg-[#00A3E0] text-white'
                          : isPassed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/5 text-gray-500'
                      }`}>
                        {isPassed ? <CheckCircle2 size={14} /> : `0${index + 1}`}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{node.label}</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 bg-white/5 text-gray-400 border border-white/10 rounded-full">
                            {node.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5 font-light">{node.details}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse'
                        : isPassed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/5 text-gray-500'
                    }`}>
                      {node.status}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
            <span>Result Output Metric:</span>
            <span className="text-cyan-400 font-black text-sm tracking-tight">{activePreset.outputMetric}</span>
          </div>
        </div>

        {/* Right Col: Live Payload Terminal (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-black border border-white/10 rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 flex flex-col justify-between font-mono relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] text-gray-400 uppercase tracking-widest mb-4">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                SP-API Payload Inspector
              </span>
              <span>TLS 1.3 JSON</span>
            </div>

            <div className="bg-[#080808] border border-white/5 p-4 rounded-xl text-xs text-gray-300 leading-relaxed overflow-x-auto">
              <pre className="text-cyan-300 font-mono text-[11px]">
                {activePreset.payloadSample}
              </pre>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 text-[11px]">
            <div className="flex justify-between text-gray-400">
              <span>API Gateway Status:</span>
              <span className="text-emerald-400 font-bold">200 OK (0.24ms)</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Amazon Market:</span>
              <span className="text-white font-bold">Amazon.com (US)</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>OAuth Authorization:</span>
              <span className="text-cyan-400 font-bold">SP-API Vault Verified</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AutomationGraphic;
