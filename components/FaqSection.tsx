import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles, ShoppingBag } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How does DuoRise FBA safely connect to my Amazon Seller Central account?",
    answer: "DuoRise FBA connects strictly via Amazon's official Selling Partner API (SP-API) using Login with Amazon (LWA) OAuth 2.0. We never ask for or store your Amazon account login credentials. All token handshakes are encrypted client-side and saved in hardware-isolated security vaults in compliance with Amazon Developer Policies."
  },
  {
    question: "How does the 24/7 FBA Refund & Reimbursement Recovery work?",
    answer: "Our automated auditing agent constantly monitors your Amazon FC inventory reports, inbound shipments, customer return logs, and damaged warehouse records. When a discrepancy occurs (e.g., lost inventory or unreturned customer refund beyond 45 days), DuoRise generates the required proof documents and files an official case with Amazon Seller Support—recovering 3% to 5% of your gross revenue automatically."
  },
  {
    question: "Will automated repricing and PPC bidding endanger my seller health metrics?",
    answer: "No. DuoRise operates strictly within Amazon Terms of Service (TOS) and includes built-in safety guardrails. You set min/max price limits and target ACoS thresholds. Our 12ms repricer prevents race-to-the-bottom pricing while maximizing Buy Box ownership, and our negative keyword harvester eliminates wasted PPC ad spend."
  },
  {
    question: "Which 3PL warehouses and prep centers are supported for FBA logistics?",
    answer: "DuoRise integrates out of the box with major 3PL providers like ShipBob, Deliverr, InventoryLab, and custom warehouse management systems. It automatically assigns FNSKU barcodes, carton labels, and pallet routing to destination Amazon Fulfillment Centers (e.g., ONT8, FTW1, IND9) and books CARP carrier appointments."
  },
  {
    question: "Can I scale multi-region (US, UK, EU, UAE, CA) from a single DuoRise portal?",
    answer: "Yes, DuoRise FBA is built for global sellers. You can manage multiple Amazon marketplaces (North America, Europe, Middle East, Asia Pacific) from a unified dashboard, convert currencies in real time, and route inventory across global fulfillment hubs."
  }
];

const FaqAccordionItem: React.FC<{ faq: FaqItem; index: number; isOpen: boolean; onToggle: () => void }> = ({ faq, index, isOpen, onToggle }) => {
  return (
    <div className="border-b border-white/5 py-5 first:pt-0 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left gap-4 py-3 text-white hover:text-cyan-400 transition-colors focus:outline-none group"
      >
        <span className="text-sm sm:text-base font-semibold tracking-tight">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-400 font-light leading-relaxed pr-10 pb-4 pt-1">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-section" className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-16 bg-[#080808]/60 border border-white/10 rounded-2xl sm:rounded-[40px] backdrop-blur-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col items-center text-center mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <HelpCircle size={12} />
          Amazon FBA FAQ
        </div>
        <h3 className="text-xl md:text-3xl font-bold tracking-tight text-white">
          Frequently Answered Telemetry
        </h3>
        <p className="text-xs md:text-sm text-gray-500 font-light max-w-md leading-relaxed">
          Everything you need to know about scaling your Amazon FBA business safely via SP-API.
        </p>
      </div>

      <div className="divide-y divide-white/5">
        {faqs.map((faq, index) => (
          <FaqAccordionItem
            key={index}
            faq={faq}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
