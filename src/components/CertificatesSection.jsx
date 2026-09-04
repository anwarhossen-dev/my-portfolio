import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATES } from '../constants';
import { fadeInUp, staggerContainer } from '../utils/animations';
import MarqueeText from './MarqueeText';

const CertificatesSection = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto w-full relative overflow-hidden" id="certificates">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 px-6">
          <motion.div 
            variants={fadeInUp} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="material-icons-outlined text-xs">verified</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Verified Credentials</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Certifications & <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 font-extrabold italic drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">Awards</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-slate-600 dark:text-slate-400 max-w-2xl text-base sm:text-lg">
            Some courses I actually completed instead of just bookmarking them – fancy certificates!
          </motion.p>
        </div>

        {/* Single-Line Continuous Marquee Slider */}
        <div className="w-full">
          <MarqueeText speed={25} pauseOnHover={true} gradient={true} className="py-4">
            <div className="flex items-center gap-6 pr-6">
              {CERTIFICATES.map((cert, index) => (
                <div
                  key={index}
                  className="group relative w-[340px] sm:w-[400px] h-[220px] sm:h-[250px] rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl flex-shrink-0 cursor-pointer"
                >
                  {/* Background Certificate Preview Image (100% Full Card Fit) */}
                  <img
                    src={cert.image}
                    alt={cert.title}
                    onError={(e) => {
                      if (!e.currentTarget.dataset.triedFallback) {
                        e.currentTarget.dataset.triedFallback = 'true';
                        e.currentTarget.src = cert.image.includes('cert_') 
                          ? cert.image.replace('cert_', 'anwar_') 
                          : '/certificates/anwar_phero.png';
                      }
                    }}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Status Badge Overlay */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-slate-900/90 text-cyan-400 text-[10px] font-bold uppercase tracking-widest border border-cyan-500/30 backdrop-blur-md shadow-md">
                      {cert.statusLabel || 'Verified'}
                    </span>
                  </div>

                  {/* Hover Overlay Box */}
                  <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-semibold text-cyan-400 mb-2">
                        {cert.issuer} • {cert.date}
                      </p>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>

                    {/* Bottom Verify Action Button */}
                    <div className="pt-2">
                      <a
                        href={cert.credentialUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
                      >
                        <span>Verify</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MarqueeText>
        </div>
      </motion.div>
    </section>
  );
};

export default CertificatesSection;
