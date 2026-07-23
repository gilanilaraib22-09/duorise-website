import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronUp, ChevronDown, Calendar, Clock, Phone, Mail, 
  User, Check, CheckCircle2, Gift, Globe, ArrowRight, ShieldCheck 
} from 'lucide-react';
import Logo from './Logo';

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRevenue?: number;
}

const COUNTRY_CODES = [
  { code: '+1', flag: '🇺🇸', name: 'US/Canada' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
];

const QualificationModal: React.FC<QualificationModalProps> = ({ isOpen, onClose, initialRevenue = 85000 }) => {
  const [step, setStep] = useState<number>(1);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const safeRevenue = typeof initialRevenue === 'number' && !isNaN(initialRevenue) ? initialRevenue : 85000;

  // Form State
  const [formData, setFormData] = useState({
    revenueOption: safeRevenue > 0 ? `$${safeRevenue.toLocaleString()} / mo sales` : '$25,000 – $250,000 / month (FBA Accelerator)',
    timeframe: '',
    firstName: '',
    lastName: '',
    countryCode: '+1',
    phone: '',
    email: '',
    creditScore: '',
    investment: '',
    mainGoal: '',
    commitment: '',
    selectedDate: '2026-07-25',
    selectedTime: '04:00 AM',
    timeZone: 'GMT+05:00 Asia/Karachi (GMT+5)'
  });

  const [errorMsg, setErrorMsg] = useState<string>('');

  // Synchronize revenue if passed in
  useEffect(() => {
    if (typeof initialRevenue === 'number' && !isNaN(initialRevenue) && initialRevenue > 0) {
      setFormData(prev => ({
        ...prev,
        revenueOption: `$${initialRevenue.toLocaleString()} / mo sales`
      }));
    }
  }, [initialRevenue]);

  // Reset modal state on close
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setIsBooked(false);
      setErrorMsg('');
    }, 300);
  };

  if (!isOpen) return null;

  const totalSteps = 8; // Steps 1 through 8 are questions, Step 9 is calendar booking

  const validateStep = (currentStep: number): boolean => {
    setErrorMsg('');
    if (currentStep === 1 && !formData.revenueOption) {
      setErrorMsg('Please select your current revenue tier.');
      return false;
    }
    if (currentStep === 2 && !formData.timeframe) {
      setErrorMsg('Please select when you want to get started.');
      return false;
    }
    if (currentStep === 3) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setErrorMsg('Please enter both your first and last name.');
        return false;
      }
    }
    if (currentStep === 4) {
      if (!formData.phone.trim() || !formData.email.trim()) {
        setErrorMsg('Please provide a valid phone number and email address.');
        return false;
      }
      if (!formData.email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return false;
      }
    }
    if (currentStep === 5 && !formData.creditScore) {
      setErrorMsg('Please select your estimated credit score range.');
      return false;
    }
    if (currentStep === 6 && !formData.investment) {
      setErrorMsg('Please select your prepared investment capital.');
      return false;
    }
    if (currentStep === 7 && !formData.mainGoal.trim()) {
      setErrorMsg('Please briefly state your main goal.');
      return false;
    }
    if (currentStep === 8 && !formData.commitment) {
      setErrorMsg('Please confirm your attendance commitment.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 9) {
        setStep(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setErrorMsg('');
      setStep(prev => prev - 1);
    }
  };

  const handleSelectAndAdvance = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrorMsg('');
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 200);
  };

  const handleCalendarBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  // Calculate percentage progress
  const progressPercent = Math.min(100, Math.round((step / 9) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25 }}
        className="bg-[#0b0d14] border border-white/15 rounded-2xl sm:rounded-[32px] w-full max-w-4xl min-h-[580px] relative shadow-[0_0_80px_rgba(0,163,224,0.2)] flex flex-col justify-between overflow-hidden my-auto"
      >
        {/* Top Progress Line */}
        <div className="w-full h-1.5 bg-white/10 relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-cyan-300"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Ambient Backlight Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-10 h-10 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer z-30"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Main Content Area */}
        <div className="p-6 sm:p-12 flex-1 flex flex-col justify-center relative z-20">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Current Revenue / Business Stage */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-2xl mx-auto w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-white/10 border border-white/20 text-white font-black text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
                    Select Your Amazon FBA Stage
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  What is your current monthly Amazon store gross revenue?*
                </h2>

                <p className="text-xs sm:text-sm text-gray-400">
                  Select the tier that best describes your current store or target roadmap:
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { id: 'A', label: '$10,000 – $25,000 / month (FBA Launchpad)' },
                    { id: 'B', label: '$25,000 – $250,000 / month (FBA Accelerator)' },
                    { id: 'C', label: '$250,000+ / month (Brand Empire)' },
                    { id: 'D', label: 'I haven\'t launched my Amazon store yet' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAndAdvance('revenueOption', opt.label)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 group cursor-pointer ${
                        formData.revenueOption === opt.label 
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,163,224,0.2)]' 
                          : 'bg-white/[0.03] border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center flex-shrink-0 font-mono transition-colors ${
                        formData.revenueOption === opt.label 
                          ? 'bg-cyan-500 text-black border-cyan-400' 
                          : 'bg-white/5 border-white/15 text-gray-300 group-hover:border-white/30'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-[#00A3E0] hover:bg-[#008CC2] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,163,224,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Timeframe */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-2xl mx-auto w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-white/10 border border-white/20 text-white font-black text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Timing</span>
                </div>

                <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  If everything makes sense, when would you realistically want to get started?*
                </h2>

                <div className="space-y-3 pt-2">
                  {[
                    { id: 'A', label: 'Immediately' },
                    { id: 'B', label: 'Within 30 days' },
                    { id: 'C', label: 'Within 60–90 days' },
                    { id: 'D', label: 'Just researching for now' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAndAdvance('timeframe', opt.label)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 group cursor-pointer ${
                        formData.timeframe === opt.label 
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,163,224,0.2)]' 
                          : 'bg-white/[0.03] border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center flex-shrink-0 font-mono transition-colors ${
                        formData.timeframe === opt.label 
                          ? 'bg-cyan-500 text-black border-cyan-400' 
                          : 'bg-white/5 border-white/15 text-gray-300 group-hover:border-white/30'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-[#00A3E0] hover:bg-[#008CC2] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,163,224,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: First & Last Name */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-2xl mx-auto w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-white/10 border border-white/20 text-white font-black text-xs flex items-center justify-center font-mono">
                    3
                  </span>
                  <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Qualification</span>
                </div>

                <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Based on your answers, you may be a great fit to work with our team. What is your name?*
                </h2>

                <div className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-300 block">First name *</label>
                    <input
                      type="text"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#00A3E0] text-white text-lg py-2 focus:outline-none transition-colors placeholder-gray-600"
                      autoFocus
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-gray-300 block">Last name *</label>
                    <input
                      type="text"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#00A3E0] text-white text-lg py-2 focus:outline-none transition-colors placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="pt-6 flex items-center gap-3">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-[#00A3E0] hover:bg-[#008CC2] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,163,224,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Phone & Email */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-2xl mx-auto w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-white/10 border border-white/20 text-white font-black text-xs flex items-center justify-center font-mono">
                    4
                  </span>
                  <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Contact Information</span>
                </div>

                <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  And {formData.firstName || 'partner'}, where should we contact you with your qualification results?*
                </h2>

                <div className="space-y-6 pt-4">
                  {/* Phone Input with Country Code */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-300 block">Phone number *</label>
                    <div className="flex items-center gap-3 border-b-2 border-white/20 focus-within:border-[#00A3E0] transition-colors pb-1">
                      <select
                        value={formData.countryCode}
                        onChange={e => setFormData({ ...formData, countryCode: e.target.value })}
                        className="bg-transparent text-white text-base focus:outline-none cursor-pointer py-1"
                      >
                        {COUNTRY_CODES.map(c => (
                          <option key={c.code} value={c.code} className="bg-[#0b0d14] text-white">
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder="(201) 555-0123"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent text-white text-lg focus:outline-none placeholder-gray-600"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-300 block">Email *</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#00A3E0] text-white text-lg py-2 focus:outline-none transition-colors placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="pt-6 flex items-center gap-3">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-[#00A3E0] hover:bg-[#008CC2] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,163,224,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Credit Score */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-2xl mx-auto w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-white/10 border border-white/20 text-white font-black text-xs flex items-center justify-center font-mono">
                    5
                  </span>
                  <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Financing Options</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    Some of our partners choose to leverage credit or financing to accelerate business growth. Where would you roughly place your credit score?*
                  </h2>
                  <p className="text-xs text-gray-400">
                    (No impact on approval — just helps us understand your options)
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { id: 'A', label: '700+ (Excellent)' },
                    { id: 'B', label: '650–700 (Good)' },
                    { id: 'C', label: '600–650 (Fair)' },
                    { id: 'D', label: 'Below 600' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAndAdvance('creditScore', opt.label)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 group cursor-pointer ${
                        formData.creditScore === opt.label 
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,163,224,0.2)]' 
                          : 'bg-white/[0.03] border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center flex-shrink-0 font-mono transition-colors ${
                        formData.creditScore === opt.label 
                          ? 'bg-cyan-500 text-black border-cyan-400' 
                          : 'bg-white/5 border-white/15 text-gray-300 group-hover:border-white/30'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-[#00A3E0] hover:bg-[#008CC2] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,163,224,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: Investment Preparedness */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-2xl mx-auto w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-white/10 border border-white/20 text-white font-black text-xs flex items-center justify-center font-mono">
                    6
                  </span>
                  <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Capital & Investment</span>
                </div>

                <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  How much are you realistically prepared to invest into building a new business?*
                </h2>

                <div className="space-y-3 pt-2">
                  {[
                    { id: 'A', label: '$50,000+ (Ready to invest and scale)' },
                    { id: 'B', label: '$25,000 - $50,000 (Ready to get started)' },
                    { id: 'C', label: '$10,000 - $25,000 (Open to financing / preparing funds)' },
                    { id: 'D', label: 'Less than $10,000 (Not ready at this time)' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAndAdvance('investment', opt.label)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 group cursor-pointer ${
                        formData.investment === opt.label 
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,163,224,0.2)]' 
                          : 'bg-white/[0.03] border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center flex-shrink-0 font-mono transition-colors ${
                        formData.investment === opt.label 
                          ? 'bg-cyan-500 text-black border-cyan-400' 
                          : 'bg-white/5 border-white/15 text-gray-300 group-hover:border-white/30'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-[#00A3E0] hover:bg-[#008CC2] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,163,224,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 7: Main Goal */}
            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-2xl mx-auto w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-white/10 border border-white/20 text-white font-black text-xs flex items-center justify-center font-mono">
                    7
                  </span>
                  <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Primary Business Objective</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    Quick final question before we continue {formData.firstName || ''}: What’s your main goal with starting this Amazon business?*
                  </h2>
                  <p className="text-xs text-gray-400">(1-5 words is perfect)</p>
                </div>

                <div className="pt-4">
                  <input
                    type="text"
                    placeholder="Type your answer here..."
                    value={formData.mainGoal}
                    onChange={e => setFormData({ ...formData, mainGoal: e.target.value })}
                    onKeyDown={e => { if (e.key === 'Enter') handleNext(); }}
                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#00A3E0] text-white text-xl py-3 focus:outline-none transition-colors placeholder-gray-600"
                    autoFocus
                  />
                </div>

                <div className="pt-6 flex items-center gap-3">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-[#00A3E0] hover:bg-[#008CC2] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,163,224,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 8: Commitment */}
            {step === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-2xl mx-auto w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-white/10 border border-white/20 text-white font-black text-xs flex items-center justify-center font-mono">
                    8
                  </span>
                  <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Call Commitment</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  On the next page you'll book a short call with our team. Do you commit to showing up on time?
                </h2>

                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs sm:text-sm leading-relaxed space-y-1">
                  <p className="font-semibold flex items-center gap-2">
                    <Gift size={16} className="text-cyan-400 flex-shrink-0" />
                    As a thank you for attending, we'll send you a personalized Amazon Revenue Roadmap custom built around your goals, capital and timeline.
                  </p>
                  <p className="text-[11px] text-gray-400 italic">Note: no-shows will not be rescheduled.</p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { id: 'A', label: 'YES! I\'ll be there' },
                    { id: 'B', label: 'No, I can\'t commit to this opportunity right now.' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAndAdvance('commitment', opt.label)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 group cursor-pointer ${
                        formData.commitment === opt.label 
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,163,224,0.2)]' 
                          : 'bg-white/[0.03] border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center flex-shrink-0 font-mono transition-colors ${
                        formData.commitment === opt.label 
                          ? 'bg-cyan-500 text-black border-cyan-400' 
                          : 'bg-white/5 border-white/15 text-gray-300 group-hover:border-white/30'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-lg bg-[#00A3E0] hover:bg-[#008CC2] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,163,224,0.4)] flex items-center gap-2 cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 9: Calendar Booking Page */}
            {step === 9 && !isBooked && (
              <motion.div
                key="step9"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="space-y-8 w-full max-w-3xl mx-auto"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Select A Time For Your <span className="text-cyan-400">15 Minute Phone Call</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Simple, no-obligation call to see if this is the right fit for you
                  </p>
                </div>

                {/* Card Layout */}
                <div className="bg-[#0e111a] border border-white/15 rounded-2xl p-5 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 shadow-2xl items-start">
                  
                  {/* Left Column: Call Info */}
                  <div className="md:col-span-5 space-y-5 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                    <div className="flex items-center gap-2">
                      <Logo size="sm" />
                      <span className="text-xs font-bold text-gray-300 tracking-wider uppercase">DuoRise</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white leading-snug">
                        Discovery Call | DuoRise
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock size={14} className="text-cyan-400" />
                        <span>30 min</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar size={14} className="text-cyan-400" />
                        <span>Sat, Jul 25, 2026</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed pt-2 border-t border-white/5">
                      During this <strong>10-15 minute call</strong>, we'll map out your goals for creating a successful Amazon business and see if you qualify for our step-by-step program. If there's a fit, we'll schedule you with a senior advisor who can show you exactly how the process works. 
                    </p>

                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-[11px] text-cyan-300">
                      We will call you from <strong>(949) 438-2022</strong> at {formData.countryCode} {formData.phone || 'your phone'}.
                    </div>
                  </div>

                  {/* Right Column: Calendar & Time Slots */}
                  <div className="md:col-span-7 space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Select Date & Time</h4>
                      <span className="text-xs text-cyan-400 font-semibold">July 2026</span>
                    </div>

                    {/* Date Picker Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-gray-400">
                      <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                      {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = day === 25;
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => setFormData({ ...formData, selectedDate: `2026-07-${day < 10 ? '0' + day : day}` })}
                            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-cyan-500 text-black font-black shadow-[0_0_12px_rgba(0,163,224,0.6)]' 
                                : 'text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    {/* Available Slots */}
                    <div className="space-y-2">
                      <span className="text-[11px] text-gray-400 block font-semibold">Available Time Slots:</span>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                        {[
                          '12:30 AM', '02:30 AM', '03:30 AM', 
                          '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 PM'
                        ].map(timeSlot => (
                          <button
                            key={timeSlot}
                            type="button"
                            onClick={() => setFormData({ ...formData, selectedTime: timeSlot })}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                              formData.selectedTime === timeSlot 
                                ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-md' 
                                : 'bg-white/5 border-white/10 text-cyan-300 hover:bg-cyan-500/20'
                            }`}
                          >
                            {timeSlot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timezone Selector */}
                    <div className="space-y-1 pt-2 border-t border-white/5">
                      <label className="text-[10px] uppercase font-bold text-gray-500 block">Time zone</label>
                      <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 border border-white/10 p-2.5 rounded-lg">
                        <Globe size={14} className="text-cyan-400" />
                        <select 
                          value={formData.timeZone}
                          onChange={e => setFormData({ ...formData, timeZone: e.target.value })}
                          className="bg-transparent w-full focus:outline-none text-xs text-white"
                        >
                          <option className="bg-[#0e111a]" value="GMT+05:00 Asia/Karachi (GMT+5)">GMT+05:00 Asia/Karachi (GMT+5)</option>
                          <option className="bg-[#0e111a]" value="GMT-05:00 Eastern Time (US & Canada)">GMT-05:00 Eastern Time (US & Canada)</option>
                          <option className="bg-[#0e111a]" value="GMT+00:00 Greenwich Mean Time">GMT+00:00 Greenwich Mean Time</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleCalendarBook}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-[#008CC2] hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Confirm Call Schedule for {formData.selectedTime}
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Confirmation Screen */}
            {step === 9 && isBooked && (
              <motion.div
                key="booked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto text-center space-y-6 py-8"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce">
                  <CheckCircle2 size={44} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Call Confirmed!</h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Thank you, <strong>{formData.firstName}</strong>. Your 15-minute Amazon Strategy Call has been locked for <strong>{formData.selectedDate} at {formData.selectedTime}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs space-y-2 text-gray-300">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Contact:</span>
                    <span className="font-semibold text-white">{formData.countryCode} {formData.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-semibold text-white">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bonus Roadmap:</span>
                    <span className="font-semibold text-emerald-400">Amazon Revenue Roadmap</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Validation Error Message */}
          {errorMsg && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center animate-shake">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Bottom Bar Controls: Navigation Arrows */}
        {step <= 8 && (
          <div className="p-4 sm:px-12 border-t border-white/10 bg-[#08090f]/80 flex items-center justify-between relative z-20">
            <span className="text-xs text-gray-500 font-mono">
              Step {step} of {totalSteps}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className="w-9 h-9 rounded-lg bg-[#00A3E0] hover:bg-[#008CC2] disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer shadow-[0_0_10px_rgba(0,163,224,0.3)]"
                aria-label="Previous step"
              >
                <ChevronUp size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={step === 9}
                className="w-9 h-9 rounded-lg bg-[#00A3E0] hover:bg-[#008CC2] disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer shadow-[0_0_10px_rgba(0,163,224,0.3)]"
                aria-label="Next step"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default QualificationModal;
