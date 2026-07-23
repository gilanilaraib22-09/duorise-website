import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  TrendingUp, 
  PackageCheck, 
  RefreshCw, 
  ShieldCheck, 
  DollarSign, 
  Truck, 
  BarChart3, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  ChevronRight,
  Zap
} from 'lucide-react';

const VideoPlayer: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'30d' | '7d' | '24h'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'pcc' | 'inventory' | 'reimbursements'>('overview');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  return (
    <div className="relative max-w-5xl mx-auto w-full px-2 sm:px-4">
      {/* Outer Dashboard Chassis */}
      <div className="relative w-full rounded-2xl md:rounded-3xl border border-white/10 bg-[#09090b]/95 overflow-hidden shadow-[0_0_60px_rgba(0,163,224,0.2)] transition-all duration-300">
        
        {/* Dynamic Backglow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 blur-[90px] rounded-full pointer-events-none"></div>

        {/* Top Command Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 bg-black/60 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShoppingBag size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-tight uppercase">DUORISE SP-API COMMAND CENTER</span>
                <span className="flex items-center gap-1 text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Sync
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-mono">Store ID: US_FBA_A3PRTMIS99X • Amazon US / CA / EU</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 text-[10px] font-mono text-gray-400">
              {(['24h', '7d', '30d'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 rounded-lg uppercase font-bold transition-all ${
                    timeframe === t ? 'bg-[#00A3E0] text-white shadow-sm' : 'hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button 
              onClick={handleSync}
              disabled={isSyncing}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Refresh SP-API Feed"
            >
              <RefreshCw size={14} className={isSyncing ? 'animate-spin text-cyan-400' : ''} />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-white/5 bg-black/30 overflow-x-auto no-scrollbar px-4 pt-2 gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          {[
            { id: 'overview', label: 'Sales & Profits', icon: <TrendingUp size={13} /> },
            { id: 'pcc', label: 'PPC TACoS Optimizer', icon: <BarChart3 size={13} /> },
            { id: 'inventory', label: 'FBA Inventory & 3PL', icon: <Truck size={13} /> },
            { id: 'reimbursements', label: 'FBA Refunds ($3,480)', icon: <DollarSign size={13} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-[#00A3E0] text-white bg-cyan-500/5' 
                  : 'border-transparent hover:text-gray-200'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-cyan-400' : 'text-gray-500'}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Active View Content */}
        <div className="p-4 sm:p-6 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Key Metrics Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1 relative overflow-hidden">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">FBA Gross Revenue</span>
                    <div className="text-xl sm:text-2xl font-black text-white tracking-tight">$148,920.00</div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                      <ArrowUpRight size={12} />
                      <span>+24.8% vs last month</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1 relative overflow-hidden">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Net Profit Margin</span>
                    <div className="text-xl sm:text-2xl font-black text-cyan-400 tracking-tight">32.4% ($48,250)</div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                      <CheckCircle2 size={12} />
                      <span>Target Margin Exceeded</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1 relative overflow-hidden">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Buy Box Share</span>
                    <div className="text-xl sm:text-2xl font-black text-white tracking-tight">99.4%</div>
                    <div className="text-[10px] text-gray-400 font-mono">Repricer Active (12ms)</div>
                  </div>

                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1 relative overflow-hidden">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">TACoS (Total Ad Spend)</span>
                    <div className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">8.2%</div>
                    <div className="text-[10px] text-gray-400 font-mono">Organic vs Paid: 78:22</div>
                  </div>
                </div>

                {/* Live Sales & Units Chart Graphic */}
                <div className="p-5 bg-black/40 border border-white/10 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Daily Amazon FBA Velocity & Unit Volume</h4>
                      <p className="text-[11px] text-gray-400">Automated SP-API Real-time Order Stream</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Sales ($)
                      </span>
                      <span className="flex items-center gap-1.5 text-blue-400">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> FBA Units (3,410)
                      </span>
                    </div>
                  </div>

                  {/* Simulated Visual Graph Columns */}
                  <div className="h-36 flex items-end justify-between gap-1.5 pt-6 px-2">
                    {[65, 72, 85, 90, 78, 95, 110, 105, 125, 140, 135, 160, 180, 195].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                        {/* Hover Tooltip */}
                        <div className="absolute -top-8 bg-black border border-white/20 text-[9px] font-mono text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          ${val * 82} • {val} units
                        </div>
                        <div 
                          className="w-full bg-gradient-to-t from-blue-600 via-cyan-500 to-sky-300 rounded-t group-hover:brightness-125 transition-all"
                          style={{ height: `${(val / 200) * 100}%` }}
                        />
                        <span className="text-[8px] font-mono text-gray-600">D{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'pcc' && (
              <motion.div
                key="pcc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-start gap-3">
                  <Zap size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">AI Autonomous PPC Bidding Protocol</h4>
                    <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                      Duorise harvesting agent discovered 42 high-converting longtail keywords and adjusted bids to maintain TACoS under 9.0%.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">Top Converting FBA Campaigns</span>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between items-center p-2 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-gray-300 font-semibold">Exact_Kitchen_Organizers</span>
                        <span className="text-emerald-400 font-bold">14.2% ACoS ($4,120)</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-gray-300 font-semibold">Broad_Stainless_Tumblers</span>
                        <span className="text-emerald-400 font-bold">18.5% ACoS ($3,890)</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-gray-300 font-semibold">Auto_Defense_Reprice</span>
                        <span className="text-cyan-400 font-bold">21.0% ACoS ($2,140)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">Automated Bidding Guardrails</span>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center text-gray-300 py-1 border-b border-white/5">
                        <span>Target ACoS Max Limit</span>
                        <span className="font-bold font-mono text-white">25.0%</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300 py-1 border-b border-white/5">
                        <span>Negative Keyword Harvester</span>
                        <span className="font-bold text-emerald-400">ENABLED (0 Waste)</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300 py-1 border-b border-white/5">
                        <span>Placement Boost (Top of Search)</span>
                        <span className="font-bold font-mono text-cyan-400">+45%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'inventory' && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">FBA FC Stock Available</span>
                    <div className="text-2xl font-black text-white">8,420 Units</div>
                    <p className="text-[10px] text-emerald-400">ONT8, FTW1, IND9 FCs</p>
                  </div>

                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">In-Transit / 3PL Prep</span>
                    <div className="text-2xl font-black text-cyan-400">2,500 Units</div>
                    <p className="text-[10px] text-gray-400">ShipBob 3PL Hub</p>
                  </div>

                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Days of Inventory Left</span>
                    <div className="text-2xl font-black text-emerald-400">42 Days</div>
                    <p className="text-[10px] text-gray-400 font-mono">Auto Restock Trigger: Day 14</p>
                  </div>
                </div>

                <div className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">Real-time FBA Shipments & FNSKU Barcodes</span>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <PackageCheck size={16} className="text-cyan-400" />
                        <div>
                          <div className="text-white font-bold">FBA1849204_ONT8</div>
                          <div className="text-[10px] text-gray-400">80 Cartons • FNSKU X0039201A</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                        FC Receiving
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck size={16} className="text-blue-400" />
                        <div>
                          <div className="text-white font-bold">FBA1849205_FTW1</div>
                          <div className="text-[10px] text-gray-400">12 Pallets • FNSKU X0091823B</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase">
                        In Transit
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reimbursements' && (
              <motion.div
                key="reimbursements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">24/7 FBA Reimbursement Recovery Agent</span>
                    <div className="text-2xl font-black text-white">$3,480.00 Recovered</div>
                    <p className="text-xs text-gray-300 mt-1">Audit agent scanned 1,420 FC warehouse shipments and identified 18 lost/damaged items.</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-500 text-black font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors uppercase tracking-wider">
                    Claim Payouts
                  </button>
                </div>

                <div className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">Active Amazon Reimbursement Cases</span>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">Case #149201948 - Lost FC Inbound</div>
                        <div className="text-[10px] text-gray-400">14 Units damaged at IND9 Warehouse</div>
                      </div>
                      <span className="text-emerald-400 font-bold">$1,240.00 Approved</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">Case #149201982 - Customer Return Not Restocked</div>
                        <div className="text-[10px] text-gray-400">8 Units unreturned beyond 45 days</div>
                      </div>
                      <span className="text-emerald-400 font-bold">$420.00 Approved</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Status Line */}
        <div className="px-6 py-3 border-t border-white/5 bg-black/80 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-cyan-400" />
            Amazon SP-API Encrypted OAuth Connection (TLS 1.3)
          </span>
          <span className="hidden sm:inline text-gray-400 font-semibold">Duorise FBA Engine v4.2</span>
        </div>

      </div>
    </div>
  );
};

export default VideoPlayer;
