
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Users, 
  ShoppingBag, 
  Star,
  Zap,
  BarChart2,
  Calendar,
  Sparkles,
  Clock,
  Tv
} from 'lucide-react';

interface HeroProps {
  onBookCall?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookCall }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const chapters = [
    { title: "Product Research & Validation", time: "0:00", percent: 0 },
    { title: "Supplier Sourcing & Inspection", time: "1:20", percent: 25 },
    { title: "High-Converting Listing SEO", time: "2:45", percent: 55 },
    { title: "PPC Scaling & Page 1 Velocity", time: "4:10", percent: 85 }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleChapterClick = (index: number) => {
    setActiveChapter(index);
    if (!isPlaying) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const scrollToCaseStudies = () => {
    const el = document.getElementById('case-studies-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-6 pb-12 md:py-12 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        {/* Left Column: Headline, Copy & CTAs (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
            <span className="font-bold text-cyan-300">AMAZON FBA & FBM EXPERTS</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] sm:leading-[1.05] text-white"
          >
            Launch, Scale & <br className="hidden sm:block" />
            Automate Your <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Amazon
            </span> Business
          </motion.h1>



          {/* 4 Stat Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2"
          >
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-xs flex-shrink-0">
                <TrendingUp size={14} />
              </div>
              <div>
                <div className="text-xs font-black text-white">$50M+</div>
                <div className="text-[10px] text-gray-400 leading-tight">Revenue Generated</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-xs flex-shrink-0">
                <ShoppingBag size={14} />
              </div>
              <div>
                <div className="text-xs font-black text-white">800+</div>
                <div className="text-[10px] text-gray-400 leading-tight">Products Launched</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black text-xs flex-shrink-0">
                <Users size={14} />
              </div>
              <div>
                <div className="text-xs font-black text-white">Highly</div>
                <div className="text-[10px] text-gray-400 leading-tight">Expert Team</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xs flex-shrink-0">
                <Award size={14} />
              </div>
              <div>
                <div className="text-xs font-black text-white">7+</div>
                <div className="text-[10px] text-gray-400 leading-tight">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <button 
              onClick={onBookCall}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-[#0090FF] hover:to-blue-700 text-white font-bold text-sm transition-all shadow-[0_0_30px_rgba(0,163,224,0.4)] flex items-center justify-center gap-2 group"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={scrollToCaseStudies}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all flex items-center justify-center gap-2.5"
            >
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center pl-0.5">
                <Play size={10} fill="currentColor" />
              </div>
              <span>View Case Studies</span>
            </button>
          </motion.div>

          {/* Trust Badge Below CTAs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-2 text-xs text-gray-400 font-medium pt-1"
          >
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Trusted by 300+ Amazon Sellers Worldwide</span>
          </motion.div>

        </div>

        {/* Right Column: Interactive Video Showcase (lg:col-span-6) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          {/* Main Video Chassis Panel */}
          <div className="bg-[#0b0c10]/95 border border-white/10 rounded-[32px] p-4 sm:p-6 shadow-[0_0_80px_rgba(0,163,224,0.22)] relative z-10 overflow-hidden space-y-4">
            
            {/* Video Screen Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video group shadow-2xl">
              
              {/* Background Video Simulation / HTML5 Video */}
              <video
                ref={videoRef}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                loop
                playsInline
              />

              {/* Video Dark Overlay Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-30 hover:opacity-90' : 'opacity-80'}`} />

              {/* Play/Pause Large Center Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  onClick={togglePlay}
                  className="pointer-events-auto relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#00A3E0] to-blue-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(0,163,224,0.6)] hover:scale-105 transition-all group-hover:shadow-[0_0_60px_rgba(0,163,224,0.8)]"
                >
                  {/* Glowing Pulse Rings */}
                  <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
                  {isPlaying ? (
                    <Pause size={28} className="relative z-10" />
                  ) : (
                    <Play size={28} fill="currentColor" className="relative z-10 ml-1" />
                  )}
                </button>
              </div>

              {/* Top Banner on Video Screen */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                  <Sparkles size={12} className="text-cyan-400" />
                  <span>Duorise FBA Playbook</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[10px] font-bold text-gray-300">
                  <Clock size={12} className="text-cyan-400" />
                  <span>5:30 min</span>
                </div>
              </div>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10 flex flex-col gap-2">
                
                {/* Video Title on Screen */}
                <div className="text-xs sm:text-sm font-bold text-white drop-shadow-md">
                  How We Scale Amazon Stores to $100k+/Month
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group/bar">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
                    style={{ width: isPlaying ? '65%' : `${chapters[activeChapter].percent}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-xs text-white pt-1">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={togglePlay}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                    </button>

                    <button 
                      onClick={toggleMute}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>

                    <span className="text-[10px] font-mono text-gray-300">
                      {isPlaying ? '03:24' : chapters[activeChapter].time} / 05:30
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                      4K Ultra HD
                    </span>
                    <button 
                      onClick={togglePlay}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      <Maximize size={15} />
                    </button>
                  </div>
                </div>

              </div>
            </div>




            {/* Bottom Verification Note */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400 font-medium border-t border-white/5">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                Amazon SPN Certified Agency
              </span>
              <span className="text-[10px] text-gray-500 font-mono">DUORISE OS v4.2</span>
            </div>

          </div>



        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
