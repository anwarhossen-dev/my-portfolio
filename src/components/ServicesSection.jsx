import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { fadeInUp, staggerContainer, cardHover } from '../utils/animations';

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
            <motion.div
              className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
              variants={cardHover}
              whileHover="hover"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <span className="material-icons-outlined text-3xl">{service.icon}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-cyan-500 transition-colors">
                {service.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                      <span className="material-icons text-[12px]">done</span>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;