import { motion } from 'framer-motion';
import { useTrail, animated } from '@react-spring/web';
import { useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);

  // GSAP scroll reveal
  const sectionRef = useScrollReveal({
    from: { opacity: 0 },
    to: { opacity: 1 },
    scrollTrigger: {
      onEnter: () => setIsVisible(true),
      start: "top 80%"
    }
  });

  const timelineRef = useStaggerAnimation('.education-card', {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    scrollTrigger: { start: "top 85%" }
  });

  // Trail animation for education cards
  const trail = useTrail(EDUCATION.length, {
    from: { opacity: 0, transform: 'translateY(60px)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translateY(0px)' : 'translateY(60px)' 
    },
    config: { tension: 280, friction: 60 },
  });

  return (
    <motion.section 
      ref={sectionRef}
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
        ref={timelineRef}
        className="relative"
        variants={staggerContainer}
      >
        {/* Timeline Line */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-500 to-blue-500 rounded-full hidden md:block"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        
        <div className="space-y-12">
          {trail.map((style, index) => (
            <animated.div key={index} style={style}>
              <motion.div 
                className={`education-card flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                variants={staggerItem}
                custom={index}
              >
                {/* Content Card */}
                <motion.div 
                  className="flex-1 group"
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                >
                  <motion.div 
                    className="relative p-8 bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300"
                    whileHover={{ y: -10 }}
                  >
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${EDUCATION[index].bgColor} flex items-center justify-center ${EDUCATION[index].textColor} flex-shrink-0 border ${EDUCATION[index].borderColor}`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="material-icons-outlined text-2xl">
                          {EDUCATION[index].icon}
                        </span>
                      </motion.div>
                      
                      <div className="flex-1">
                        <motion.h3 
                          className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-green-500 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {EDUCATION[index].degree}
                        </motion.h3>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                          <motion.span 
                            className="text-primary font-semibold"
                            whileHover={{ scale: 1.05 }}
                          >
                            {EDUCATION[index].institution}
                          </motion.span>
                          <span className="hidden sm:inline text-slate-400">•</span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {EDUCATION[index].year}
                          </span>
                          {EDUCATION[index].board && (
                            <>
                              <span className="hidden sm:inline text-slate-400">•</span>
                              <span className="text-slate-500 dark:text-slate-400 text-sm">
                                {EDUCATION[index].board}
                              </span>
                            </>
                          )}
                        </div>
                        
                        {EDUCATION[index].period && (
                          <div className="mb-3 flex items-center gap-2">
                            <span className="material-icons-outlined text-sm text-slate-500">schedule</span>
                            <span className="text-slate-500 dark:text-slate-400 text-sm">
                              Duration: {EDUCATION[index].period}
                            </span>
                          </div>
                        )}
                        
                        {EDUCATION[index].board && (
                          <div className="mb-3 flex items-center gap-2">
                            <span className="material-icons-outlined text-sm text-slate-500">verified</span>
                            <span className="text-slate-500 dark:text-slate-400 text-sm">
                              Board: {EDUCATION[index].board}
                            </span>
                          </div>
                        )}
                        
                        <motion.div 
                          className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${EDUCATION[index].bgColor} ${EDUCATION[index].textColor} text-sm font-semibold mb-4 flex items-center gap-2`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="material-icons-outlined text-sm">grade</span>
                          {EDUCATION[index].grade}
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <motion.p 
                      className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4"
                      variants={staggerItem}
                    >
                      {EDUCATION[index].description}
                    </motion.p>

                    {/* Skills/Subjects */}
                    {EDUCATION[index].skills && (
                      <div>
                        <motion.h4 
                          className="text-slate-900 dark:text-white font-semibold mb-3 text-sm flex items-center gap-2"
                          variants={staggerItem}
                        >
                          <span className="material-icons-outlined text-sm text-green-500">auto_awesome</span>
                          Key Subjects & Skills:
                        </motion.h4>
                        <motion.div 
                          className="flex flex-wrap gap-2"
                          variants={staggerContainer}
                        >
                          {EDUCATION[index].skills.map((skill, skillIndex) => (
                            <motion.span 
                              key={skillIndex}
                              className={`px-3 py-1 rounded-full bg-gradient-to-r ${EDUCATION[index].bgColor} ${EDUCATION[index].textColor} text-xs font-medium border ${EDUCATION[index].borderColor} flex items-center gap-1`}
                              variants={staggerItem}
                              custom={skillIndex}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="material-icons-outlined text-xs">
                                {getSkillIcon(skill)}
                              </span>
                              {skill}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>

                {/* Timeline Dot */}
                <motion.div 
                  className="hidden md:flex w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 border-4 border-white dark:border-background-dark shadow-lg flex-shrink-0 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.2 }}
                />

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            </animated.div>
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