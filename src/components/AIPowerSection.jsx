import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { GlassCard } from './GlassCard';

const AIPowerSection = () => {
  return (
    <section className="px-6 lg:px-16 py-32 max-w-7xl mx-auto w-full relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20 mb-6">
            <span className="material-icons-outlined text-xs">auto_awesome</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Intelligent Ecosystem</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Claude-Driven <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-600 italic">Engineering</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            Harnessing the power of <span className="text-purple-600 font-bold border-b-2 border-purple-500/30">Claude 3.5 Sonnet</span> and Gemini CLI to architect high-performance, self-optimizing applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.ai.map((tool, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
            >
              <GlassCard
                index={index}
                icon={tool.icon}
                color="from-purple-500 to-indigo-500"
                title={tool.name}
                description={`Integrating ${tool.name} into the development lifecycle for code optimization and architectural design.`}
                metrics={[
                  { label: 'Mastery', value: `${tool.level}%` }
                ]}
              />
            </motion.div>
          ))}
        </div>

        {/* AI Integration Banner */}
        <motion.div 
          variants={fadeInUp}
          className="mt-20 p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-black mb-4">The Future is <span className="text-primary italic">Automated</span></h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                "AI doesn't replace developers, it gives them superpowers. I specialize in bridging the gap between traditional engineering and modern AI capabilities."
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center animate-pulse">
                <span className="material-icons-outlined text-primary text-3xl">auto_awesome</span>
              </div>
              <div className="w-20 h-20 rounded-full border-2 border-purple-500/30 flex items-center justify-center animate-pulse [animation-delay:0.5s]">
                <span className="material-icons-outlined text-purple-500 text-3xl">hub</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AIPowerSection;