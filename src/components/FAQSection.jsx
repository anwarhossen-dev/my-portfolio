import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../constants';
import { fadeInUp, staggerContainer } from '../utils/animations';

const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="mb-4">
      <button
        onClick={toggle}
        className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between ${
          isOpen 
            ? 'bg-primary/5 border-primary/30 shadow-lg' 
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary/50'
        }`}
      >
        <span className="font-bold text-slate-900 dark:text-white text-lg">{faq.question}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="material-icons-outlined text-primary"
        >
          expand_more
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 text-slate-600 dark:text-slate-400 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-6 lg:px-16 py-24 max-w-4xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50">
      <motion.div 
        className="flex flex-col items-center text-center mb-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4"
          variants={fadeInUp}
        >
          <span className="text-orange-500 font-semibold text-xs tracking-widest uppercase">
            Questions?
          </span>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          variants={fadeInUp}
        >
          Common <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 italic">Queries</span>
        </motion.h2>
      </motion.div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <FAQItem 
            key={index} 
            faq={faq} 
            isOpen={openIndex === index} 
            toggle={() => setOpenIndex(openIndex === index ? -1 : index)} 
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;