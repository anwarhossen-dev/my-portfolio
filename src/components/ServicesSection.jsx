import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { GlassCard } from './GlassCard';

const ServicesSection = () => {
  return (
    <section className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50" id="services">
      <motion.div 
        className="flex flex-col items-center text-center mb-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4"
          variants={fadeInUp}
        >
          <span className="text-cyan-500 font-semibold text-xs tracking-widest uppercase">
            What I Offer
          </span>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          variants={fadeInUp}
        >
          My Special <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 italic">Services</span>
        </motion.h2>

        <motion.p 
          className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg leading-relaxed"
          variants={fadeInUp}
        >
          Providing comprehensive digital solutions tailored to your business needs, from architecture to deployment.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
          >
            <GlassCard
              index={index}
              badge={service.badge}
              icon={service.icon}
              color={service.color}
              title={service.title}
              description={service.description}
              features={service.features}
              metrics={service.metrics}
              ctaText={service.ctaText ? service.ctaText : undefined}
              ctaHref={service.ctaHref}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;