import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import { useScrollReveal, useStaggerAnimation } from '../hooks/useAnimations';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover
} from '../utils/animations';

// Function to get appropriate icon for each skill
const getSkillIcon = (skill) => {
  const skillIcons = {
    // Programming & Development
    'React.js': 'code',
    'Node.js': 'dns',
    'MongoDB': 'storage',
    'Express.js': 'api',
    'JavaScript ES6+': 'javascript',
    'REST APIs': 'cloud_sync',
    'Programming': 'code',
    'Data Structures': 'account_tree',
    'Algorithms': 'psychology',
    'Web Development': 'web',
    'Database Management': 'storage',
    'Software Engineering': 'engineering',
    
    // Business & Commerce
    'Accounting': 'calculate',
    'Finance & Banking': 'account_balance_wallet',
    'Business Studies': 'business',
    'Economics': 'trending_up',
    'Mathematics': 'functions',
    'Basic Accounting': 'receipt',
    'General Science': 'science',
    'English': 'translate',
    
    // Default
    'default': 'star'
  };
  
  return skillIcons[skill] || skillIcons['default'];
};

const EducationSection = () => {

  return (
    <motion.section 
      className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50" 
      id="education"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {/* Section Header */}
      <motion.div 
        className="flex flex-col items-center text-center mb-16"
        variants={fadeInUp}
      >
        <motion.div 
          className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-green-500 font-semibold text-xs tracking-widest uppercase">
            My Education
          </span>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          variants={staggerItem}
        >
          Educational <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
            Background
          </span>
        </motion.h2>
        
        <motion.div 
          className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Education Timeline */}
      <motion.div 
        className="relative"
        variants={staggerContainer}
      >
        {/* Central Timeline Line */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-500 to-blue-500 rounded-full hidden md:block"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        
        <div className="space-y-8 md:space-y-12">
          {EDUCATION.map((edu, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <motion.div 
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                variants={staggerItem}
                custom={index}
              >
                {/* Content Card */}
                <motion.div 
                  className="flex-1 w-full group"
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                >
                  <motion.div 
                    className="relative p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${edu.bgColor} flex items-center justify-center ${edu.textColor} flex-shrink-0 border ${edu.borderColor}`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="material-icons-outlined text-2xl">
                          {edu.icon}
                        </span>
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                            {edu.degree}
                          </h3>
                          <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                            {edu.year}
                          </span>
                        </div>
                        
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
                          {edu.institution}
                        </p>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
                          <span className="material-icons-outlined text-xs">school</span>
                          <span>Field: {edu.field}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Timeline Dot */}
                <motion.div 
                  className="hidden md:flex w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 border-4 border-white dark:border-slate-950 shadow-lg flex-shrink-0 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.2 }}
                />

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 right-10 text-green-400/20 text-5xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🎓
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 left-10 text-blue-400/20 text-4xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, 25, 0],
          x: [0, 15, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        📚
      </motion.div>

      <motion.div 
        className="absolute top-1/2 left-5 text-purple-400/20 text-3xl font-bold select-none pointer-events-none"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        💡
      </motion.div>

      <motion.div 
        className="absolute bottom-1/3 right-5 text-orange-400/20 text-3xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, -15, 0],
          x: [0, -10, 0]
        }}
        transition={{ duration: 4.5, repeat: Infinity }}
      >
        🏆
      </motion.div>
    </motion.section>
  );
};

export default EducationSection;