import { motion } from 'framer-motion';
import { useState } from 'react';
import { SKILLS } from '../constants';
import MarqueeText from './MarqueeText';
import SmartTechIcon from './SmartTechIcon';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover
} from '../utils/animations';

const SkillBar = ({ skill, percentage, color = "primary", index }) => {
  const [isVisible, setIsVisible] = useState(false);

  const colorClasses = {
    primary: "from-primary to-blue-400",
    secondary: "from-purple-500 to-pink-500",
    success: "from-green-500 to-emerald-500",
    warning: "from-yellow-500 to-orange-500",
    info: "from-cyan-500 to-blue-500",
  };

  return (
    <motion.div 
      className="group"
      variants={staggerItem}
      custom={index}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-2">
        <motion.div 
          className="flex items-center gap-2.5"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <SmartTechIcon name={skill} className="text-xl" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
            {skill}
          </span>
        </motion.div>
        <motion.span 
          className="text-xs font-bold text-gray-600 dark:text-gray-400"
          animate={{ opacity: isVisible ? 1 : 1 }}
        >
          {percentage}%
        </motion.span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full relative overflow-hidden`}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills, color, delay = 0 }) => {
  return (
    <motion.div 
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
          <SmartTechIcon name={skills[0]?.name || title} className="text-2xl text-white" />
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
        {skills.map((skill, index) => (
          <motion.div key={skill.name} variants={staggerItem}>
            <SkillBar 
              skill={skills[index].name}
              percentage={skills[index].level}
              color={color.includes('cyan') ? 'info' : color.includes('purple') ? 'secondary' : 'primary'}
              index={index}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: SKILLS.frontend,
      color: "from-cyan-500 to-blue-500",
      delay: 0
    },
    {
      title: "Backend",
      skills: SKILLS.backend,
      color: "from-purple-500 to-pink-500",
      delay: 200
    },
    {
      title: "Database",
      skills: SKILLS.database,
      color: "from-orange-500 to-red-500",
      delay: 300
    },
    {
      title: "Tools & AI",
      skills: SKILLS.tools,
      color: "from-green-500 to-emerald-500",
      delay: 400
    }
  ];

  const aiAndToolsSkills = [...SKILLS.tools, ...(SKILLS.ai || [])];

  return (
    <motion.section 
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
            Technical Ecosystem
          </span>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          variants={staggerItem}
        >
          Smart <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Skills & Stack
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
          Comprehensive breakdown of frontend, backend, database, DevOps, and AI automation tools
        </motion.p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16"
        variants={staggerContainer}
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
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
            Interactive Tech Stack Marquee
          </motion.h3>
          <motion.p 
            className="text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Authentic brand icons & seamless scrolling ecosystem
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
                className="flex items-center gap-3.5 mx-4 px-6 py-3.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border border-slate-200/80 dark:border-slate-700/80 group transition-all duration-300"
                whileHover={{ scale: 1.08, y: -4 }}
              >
                <SmartTechIcon name={skill.name} className="text-2.5xl group-hover:scale-125 transition-transform duration-300" />
                <span className="font-bold text-sm text-slate-900 dark:text-white whitespace-nowrap">
                  {skill.name}
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  {skill.level}%
                </span>
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
                className="flex items-center gap-3.5 mx-4 px-6 py-3.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border border-purple-200/80 dark:border-purple-900/50 group transition-all duration-300"
                whileHover={{ scale: 1.08, y: -4 }}
              >
                <SmartTechIcon name={skill.name} className="text-2.5xl group-hover:scale-125 transition-transform duration-300" />
                <span className="font-bold text-sm text-slate-900 dark:text-white whitespace-nowrap">
                  {skill.name}
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
                  {skill.level}%
                </span>
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
                className="flex items-center gap-3.5 mx-4 px-6 py-3.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border border-orange-200/80 dark:border-orange-900/50 group transition-all duration-300"
                whileHover={{ scale: 1.08, y: -4 }}
              >
                <SmartTechIcon name={skill.name} className="text-2.5xl group-hover:scale-125 transition-transform duration-300" />
                <span className="font-bold text-sm text-slate-900 dark:text-white whitespace-nowrap">
                  {skill.name}
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  {skill.level}%
                </span>
              </motion.div>
            ))}
          </MarqueeText>
        </motion.div>

        {/* Tools, AI & DevOps Marquee */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <MarqueeText speed={40} className="py-4" direction="right">
            {aiAndToolsSkills.map((skill, index) => (
              <motion.div
                key={`tools-${index}`}
                className="flex items-center gap-3.5 mx-4 px-6 py-3.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border border-emerald-200/80 dark:border-emerald-900/50 group transition-all duration-300"
                whileHover={{ scale: 1.08, y: -4 }}
              >
                <SmartTechIcon name={skill.name} className="text-2.5xl group-hover:scale-125 transition-transform duration-300" />
                <span className="font-bold text-sm text-slate-900 dark:text-white whitespace-nowrap">
                  {skill.name}
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {skill.level}%
                </span>
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