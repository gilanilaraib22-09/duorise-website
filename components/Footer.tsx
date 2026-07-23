import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, MessageCircle, Send, ArrowUp, Check, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onBookCall?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onBookCall }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setJoined(true);
    setNewsletterEmail('');
    setTimeout(() => setJoined(false), 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer id="footer-section" className="bg-[#06070a] border-t border-white/10 pt-12 pb-6 px-4 sm:px-8 text-gray-300 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Info & Action Buttons (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="focus:outline-none text-left">
              <Logo size="md" />
            </button>

            <p className="text-gray-400 text-xs sm:text-sm font-normal leading-relaxed max-w-sm">
              Duorise is a full-service Amazon FBA & FBM growth agency helping sellers launch, automate, and scale profitable Amazon businesses.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBookCall}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-[#0090FF] hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,163,224,0.35)] flex items-center gap-2"
              >
                <Calendar size={14} />
                <span>Book Strategy Call</span>
              </button>

              <button
                onClick={onBookCall}
                className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Mail size={14} className="text-cyan-400" />
                <span>Email Us</span>
              </button>
            </div>
          </div>

          {/* Quick Links Column (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-black tracking-[0.2em] uppercase text-white block">
              QUICK LINKS
            </span>
            <ul className="space-y-2.5 text-xs font-medium text-gray-400">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('stats-section')} className="hover:text-cyan-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services-section')} className="hover:text-cyan-400 transition-colors">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('process-section')} className="hover:text-cyan-400 transition-colors">
                  Our Process
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('case-studies-section')} className="hover:text-cyan-400 transition-colors">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('footer-section')} className="hover:text-cyan-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-black tracking-[0.2em] uppercase text-white block">
              SERVICES
            </span>
            <ul className="space-y-2.5 text-xs font-medium text-gray-400">
              <li>
                <button onClick={() => scrollToSection('services-section')} className="hover:text-cyan-400 transition-colors">
                  Product Research
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services-section')} className="hover:text-cyan-400 transition-colors">
                  Product Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services-section')} className="hover:text-cyan-400 transition-colors">
                  Listing Optimization
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services-section')} className="hover:text-cyan-400 transition-colors">
                  PPC Management
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services-section')} className="hover:text-cyan-400 transition-colors">
                  Full Account Management
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services-section')} className="hover:text-cyan-400 transition-colors">
                  FBA Reimbursements
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Chat Column (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-black tracking-[0.2em] uppercase text-white block">
              NEWSLETTER
            </span>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Stay ahead with weekly Amazon FBA growth strategies, algorithm updates, and PPC tips.
            </p>

            <form onSubmit={handleJoin} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A3E0] to-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:from-[#0090FF] hover:to-blue-700 transition-all flex items-center justify-center gap-1 flex-shrink-0"
                >
                  {joined ? <Check size={14} /> : <span>Join</span>}
                </button>
              </div>
              {joined && (
                <p className="text-[10px] text-emerald-400 font-medium">✓ You're subscribed to Duorise Newsletter!</p>
              )}
            </form>

            <div className="pt-2">
              <button
                onClick={onBookCall}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={15} />
                <span>Live Chat with Growth Specialist</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2024 Duorise FBA. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setPolicyModal('privacy')} className="hover:text-gray-300 transition-colors">Privacy Policy</button>
            <button onClick={() => setPolicyModal('terms')} className="hover:text-gray-300 transition-colors">Terms of Service</button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold transition-colors ml-2"
            >
              <span>Back to top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Policy Modal */}
      {policyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c0d14] border border-white/15 rounded-[32px] p-6 sm:p-8 max-w-xl w-full relative shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setPolicyModal(null)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">DUORISE LEGAL & COMPLIANCE</span>
              <h3 className="text-2xl font-bold text-white">
                {policyModal === 'privacy' ? 'Privacy Policy & SP-API Security' : 'Terms of Service & SLA'}
              </h3>
            </div>

            <div className="text-xs text-gray-300 space-y-3 leading-relaxed border-t border-white/10 pt-4">
              {policyModal === 'privacy' ? (
                <>
                  <p>Duorise FBA adheres strictly to Amazon Selling Partner API (SP-API) Security Conventions and Data Protection Policies.</p>
                  <p><strong>1. Data Encryption:</strong> All account tokens, sales records, and inventory metrics are encrypted at rest using AES-256 and transmitted exclusively via TLS 1.3.</p>
                  <p><strong>2. Account Safety:</strong> We never request or store your Amazon Seller Central login credentials. Authorization is conducted strictly via Amazon LWA OAuth 2.0.</p>
                  <p><strong>3. Third-Party Sharing:</strong> Your store metrics and confidential financial data are never sold, traded, or transferred to outside parties.</p>
                </>
              ) : (
                <>
                  <p>By using Duorise Amazon Growth Services, you agree to our standard service terms and growth performance guarantees.</p>
                  <p><strong>1. Scope of Services:</strong> Duorise provides Amazon FBA/FBM account optimization, PPC management, product research, sourcing, and automated reimbursement claims.</p>
                  <p><strong>2. Performance Commitment:</strong> Dedicated account managers review campaigns continuously to maintain target ACoS/ROAS parameters established during onboarding.</p>
                  <p><strong>3. Cancellation:</strong> Services are offered month-to-month with flexible cancellation options and no locked long-term contracts.</p>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPolicyModal(null)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
