import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, PhoneCall, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface NavbarProps {
  onBookCall?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookCall }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section tracker
      const sections = ['stats-section', 'services-section', 'process-section', 'case-studies-section', 'footer-section'];
      const scrollPos = window.scrollY + 200;

      if (window.scrollY < 200) {
        setActiveSection('home');
        return;
      }

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'stats-section', label: 'About' },
    { id: 'services-section', label: 'Services' },
    { id: 'process-section', label: 'Process' },
    { id: 'case-studies-section', label: 'Case Studies' },
    { id: 'footer-section', label: 'Contact' },
  ];

  return (
    <>
      {/* Main Floating Glass Navbar */}
      <header className={`fixed top-0 sm:top-3 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6`}>
        <div className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
          scrolled 
            ? 'bg-[#08090d]/90 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,163,224,0.15)]' 
            : 'bg-[#08090d]/60 backdrop-blur-lg border border-white/10 shadow-lg'
        }`}>
          
          {/* Logo */}
          <div onClick={() => handleNavClick('home')}>
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Pill Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={onBookCall}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-[#0090FF] hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(0,163,224,0.4)] flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar size={14} className="text-white animate-pulse" />
              <span>Book Call</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-xs font-bold"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Glass Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[70px] z-40 bg-[#08090d]/98 border border-white/15 rounded-3xl p-6 backdrop-blur-3xl lg:hidden space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">DUORISE NAVIGATION</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>

            <nav className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between p-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-left ${
                      isActive 
                        ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300' 
                        : 'bg-white/[0.02] border border-white/5 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={14} className={isActive ? 'text-cyan-400' : 'text-gray-600'} />
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => { setMobileMenuOpen(false); if (onBookCall) onBookCall(); }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00A3E0] to-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:from-[#0090FF] hover:to-blue-700 shadow-[0_0_20px_rgba(0,163,224,0.4)] flex items-center justify-center gap-2"
              >
                <Calendar size={15} />
                <span>Book Strategy Call</span>
              </button>
            </div>

            <div className="pt-2 text-center text-[10px] text-gray-400 font-mono">
              Amazon SPN Partner • Full-Service FBA Growth
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

