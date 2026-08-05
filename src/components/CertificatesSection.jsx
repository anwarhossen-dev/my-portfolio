import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATES } from '../constants';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { GlassCard } from './GlassCard';

const CertificatesSection = () => {
  return (
    <section className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative overflow-hidden" id="certificates">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            variants={fadeInUp} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="material-icons-outlined text-xs">verified_user</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Achievements & Credentials</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Certifications & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 italic">Awards</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            Professional specializations, coursework, and industry badges earned to refine and validate my engineering skill sets.
          </motion.p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
            >
              <GlassCard
                index={index}
                icon={cert.icon}
                color={cert.color}
                title={cert.title}
                description={cert.description}
                badge={cert.date}
                metrics={[
                  { label: 'Issuer', value: cert.issuer },
                  { label: 'Year', value: cert.date }
                ]}
                ctaText={cert.credentialUrl && cert.credentialUrl !== '#' ? `Verify ${cert.title}` : undefined}
                ctaHref={cert.credentialUrl}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CertificatesSection;
