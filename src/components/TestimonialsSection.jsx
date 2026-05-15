import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { fadeInUp, staggerContainer } from '../utils/animations';

const TestimonialsSection = () => {
  return (
    <section className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50">
      <motion.div 
        className="flex flex-col items-center text-center mb-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4"
          variants={fadeInUp}
        >
          <span className="text-purple-500 font-semibold text-xs tracking-widest uppercase">
            Testimonials
          </span>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          variants={fadeInUp}
        >
          What People <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 italic">Say</span>
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-lg relative h-full"
          >
            <div className="absolute top-8 right-8 text-primary opacity-20">
              <span className="material-icons text-4xl">format_quote</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20"
              />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{testimonial.role}</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed mb-6">
              "{testimonial.content}"
            </p>

            <div className="flex gap-1 text-yellow-500">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="material-icons text-sm">star</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;