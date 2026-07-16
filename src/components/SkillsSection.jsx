import { motion } from 'framer-motion';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { useState, useEffect } from 'react';
import { SKILLS } from '../constants';
import { useScrollReveal, useStaggerAnimation } from '../hooks/useAnimations';
import MarqueeText from './MarqueeText';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  scaleIn,
  progressBar,
  cardHover
} from '../utils/animations';

const SkillBar = ({ skill, percentage, icon, color = "primary", index }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // React Spring progress animation
  const progressSpring = useSpring({
    width: isVisible ? `${percentage}%` : '0%',
    config: { tension: 100, friction: 14 },
    delay: index * 100,
  });

  // GSAP scroll reveal
  const skillRef = useScrollReveal({
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
    scrollTrigger: {
      onEnter: () => setIsVisible(true),
      onLeave: () => setIsVisible(false),
      onEnterBack: () => setIsVisible(true),
    }
  });

  const colorClasses = {
    primary: "from-primary to-blue-400",
    secondary: "from-purple-500 to-pink-500",
    success: "from-green-500 to-emerald-500",
    warning: "from-yellow-500 to-orange-500",
    info: "from-cyan-500 to-blue-500",
  };

  return (
    <motion.div 
      ref={skillRef}
      className="group"
      variants={staggerItem}
      custom={index}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-2">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <motion.i 
            className={`${icon} text-lg text-gray-600 dark:text-gray-400`}
            whileHover={{ scale: 1.2, rotate: 15 }}
            transition={{ duration: 0.3 }}
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
            {skill}
          </span>
        </motion.div>
        <motion.span 
          className="text-sm font-semibold text-gray-600 dark:text-gray-400"
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <animated.div
          style={progressSpring}
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full relative overflow-hidden`}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </animated.div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills, icon, color, delay = 0 }) => {
  const categoryRef = useScrollReveal({
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    scrollTrigger: { start: "top 85%" }
  });

  // Trail animation for skills
  const trail = useTrail(skills.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 20 },
    delay: delay,
  });

  return (
    <motion.div 
      ref={categoryRef}
      className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
      variants={cardHover}
      initial="rest"
      whileHover="hover"
    >
      <motion.div 
        className="flex items-center gap-3 mb-6"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white shadow-lg`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <motion.i 
            className={`${icon} text-xl`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.h3 
          className="text-xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
      </motion.div>
      
      <div className="space-y-4">
        {trail.map((style, index) => (
          <animated.div key={skills[index].name} style={style}>
            <SkillBar 
              skill={skills[index].name}
              percentage={skills[index].level}
              icon={skills[index].icon}
              color={color.includes('cyan') ? 'info' : color.includes('purple') ? 'secondary' : 'primary'}
              index={index}
            />
          </animated.div>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const sectionRef = useStaggerAnimation('.skill-category', {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    scrollTrigger: { start: "top 80%" }
  });

  const skillCategories = [
    {
      title: "Frontend",
      skills: SKILLS.frontend,
      icon: "fas fa-palette",
      color: "from-cyan-500 to-blue-500",
      delay: 0
    },
    {
      title: "Backend",
      skills: SKILLS.backend,
      icon: "fas fa-server",
      color: "from-purple-500 to-pink-500",
      delay: 200
    },
    {
      title: "Database",
      skills: SKILLS.database,
      icon: "fas fa-database",
      color: "from-orange-500 to-red-500",
      delay: 300
    },
    {
      title: "Tools & Others",
      skills: SKILLS.tools,
      icon: "fas fa-tools",
      color: "from-green-500 to-emerald-500",
      delay: 400
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50" 
      id="skills"
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
          className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-cyan-500 font-semibold text-xs tracking-widest uppercase">
            Technical Skills
          </span>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          variants={staggerItem}
        >
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Expertise
          </span>
        </motion.h2>
        
        <motion.div 
          className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        <motion.p 
          className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mt-6"
          variants={staggerItem}
        >
          Here are the technologies and tools I work with to bring ideas to life
        </motion.p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        variants={staggerContainer}
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            className="skill-category"
            variants={staggerItem}
            custom={index}
          >
            <SkillCategory {...category} />
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Marquee Section */}
      <motion.div 
        className="mt-20 space-y-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <motion.h3 
            className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Technologies I Work With
          </motion.h3>
          <motion.p 
            className="text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Constantly learning and adapting to new technologies
          </motion.p>
        </div>

        {/* Frontend Technologies Marquee */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MarqueeText speed={30} className="py-4" direction="left">
            {SKILLS.frontend.map((skill, index) => (
              <motion.div
                key={`frontend-${index}`}
                className="flex items-center gap-3 mx-8 px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <i className={`${skill.icon} text-2xl text-cyan-500`} />
                <span className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                  {skill.name}
                </span>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              </motion.div>
            ))}
          </MarqueeText>
        </motion.div>

        {/* Backend Technologies Marquee */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MarqueeText speed={35} className="py-4" direction="right">
            {SKILLS.backend.map((skill, index) => (
              <motion.div
                key={`backend-${index}`}
                className="flex items-center gap-3 mx-8 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full shadow-lg border border-green-200 dark:border-green-700"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <i className={`${skill.icon} text-2xl text-green-500`} />
                <span className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                  {skill.name}
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </motion.div>
            ))}
          </MarqueeText>
        </motion.div>

        {/* Database Technologies Marquee */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MarqueeText speed={38} className="py-4" direction="left">
            {SKILLS.database.map((skill, index) => (
              <motion.div
                key={`database-${index}`}
                className="flex items-center gap-3 mx-8 px-6 py-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-full shadow-lg border border-orange-200 dark:border-orange-700"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <i className={`${skill.icon} text-2xl text-orange-500`} />
                <span className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                  {skill.name}
                </span>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              </motion.div>
            ))}
          </MarqueeText>
        </motion.div>

        {/* Tools & Others Marquee */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <MarqueeText speed={40} className="py-4" direction="right">
            {SKILLS.tools.map((skill, index) => (
              <motion.div
                key={`tools-${index}`}
                className="flex items-center gap-3 mx-8 px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full shadow-lg border border-purple-200 dark:border-purple-700"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <i className={`${skill.icon} text-2xl text-purple-500`} />
                <span className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                  {skill.name}
                </span>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              </motion.div>
            ))}
          </MarqueeText>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 text-cyan-400/20 text-6xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        &lt;/&gt;
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-10 text-purple-400/20 text-4xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        { }
      </motion.div>
    </motion.section>
  );
};

export default SkillsSection;