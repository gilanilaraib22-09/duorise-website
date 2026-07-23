
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import PricingCalculator from './components/PricingCalculator';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import QualificationModal from './components/QualificationModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRevenue, setSelectedRevenue] = useState<number>(85000);

  const handleBookCall = (revenue?: number | React.SyntheticEvent) => {
    if (typeof revenue === 'number' && !isNaN(revenue)) {
      setSelectedRevenue(revenue);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050508] text-white">
      {/* Background Grid & Glow Effects */}
      <div className="fixed inset-0 grid-pattern pointer-events-none opacity-30"></div>
      <div className="fixed inset-0 glow-bg pointer-events-none"></div>

      {/* Ambient Gradient Orbs */}
      <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[200px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-sky-600/10 blur-[200px] rounded-full pointer-events-none"></div>

      {/* Navigation Bar */}
      <Navbar onBookCall={handleBookCall} />

      <main className="relative z-10 pt-20 sm:pt-32 space-y-12 sm:space-y-28 pb-12">
        {/* Hero Section */}
        <Hero onBookCall={handleBookCall} />

        {/* Stats & Trusted Logos */}
        <Stats />

        {/* 11 Services Section */}
        <ServicesSection onBookCall={handleBookCall} />

        {/* 6 Step Process Section */}
        <ProcessSection onBookCall={handleBookCall} />

        {/* Real Brand Case Studies */}
        <CaseStudiesSection onBookCall={handleBookCall} />

        {/* ROI & Pricing Calculator */}
        <div className="max-w-7xl mx-auto px-4">
          <PricingCalculator onBookCall={handleBookCall} />
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4">
          <FaqSection />
        </div>
      </main>

      {/* Footer */}
      <Footer onBookCall={handleBookCall} />

      {/* Interactive Step-by-Step Qualification & Strategy Booking Modal */}
      <QualificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialRevenue={selectedRevenue}
      />

      {/* Bottom accent glow */}
      <div className="fixed bottom-0 left-0 h-1 bg-gradient-to-r from-[#00A3E0] via-blue-500 to-transparent w-full opacity-30"></div>
    </div>
  );
};

export default App;
