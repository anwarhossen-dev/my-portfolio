import { motion } from 'framer-motion';
import { useState } from 'react';
import Terminal from './Terminal.jsx';
import { useScrollReveal, useStaggerAnimation } from '../hooks/useAnimations';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  scaleIn,
  cardHover,
  textReveal
} from '../utils/animations';

const AboutSection = () => {
  const aboutCards = [
    {
      title: "Who I Am",
      content: "Full Stack & MERN Stack Developer based in Bangladesh, passionate about engineering scalable, high-performance web systems.",
      icon: "person",
      gradient: "from-cyan-500 to-blue-500",
      delay: 0
    },
    {
      title: "What I Do",
      content: "Building full-stack web applications with React, Next.js, Node.js, Express, MongoDB, and ASP.NET Core APIs.",
      icon: "code",
      gradient: "from-purple-500 to-pink-500",
      delay: 150
    },
    {
      title: "My Goals",
      content: "Crafting clean, maintainable code with scalable architecture, microservices, and exceptional user experiences.",
      icon: "emoji_events",
      gradient: "from-emerald-500 to-teal-500",
      delay: 300
    },
    {
      title: "My Passions",
      content: "Exploring AI integrations, automation workflows, open-source contribution, and continuous tech advancement.",
      icon: "auto_awesome",
      gradient: "from-orange-500 to-amber-500",
      delay: 450
    }
  ];

  const stats = [
    { number: "2+", label: "Years Experience", icon: "work_history" },
    { number: "15+", label: "Projects Completed", icon: "assignment_turned_in" },
    { number: "10+", label: "Modern Technologies", icon: "code" },
    { number: "100%", label: "Clean Code Standard", icon: "verified" }
  ];

  return (
    <motion.section
      className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full flex flex-col justify-center relative z-10 border-t border-slate-200/50 dark:border-slate-800/50" 
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {/* Section Header */}
      <motion.div 
        className="flex flex-col items-center text-center mb-16" 
        variants={staggerContainer}
      >
        <motion.div 
          className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-purple-600 dark:text-purple-400 font-semibold text-xs tracking-widest uppercase">
            Get to know me
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          variants={fadeInUp}
        >
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Me
          </span>
        </motion.h2>
        
        <motion.div 
          className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        <motion.p 
          className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mt-6 leading-relaxed"
          variants={textReveal}
        >
          I'm a passionate MERN Stack Developer with a love for creating innovative web solutions. 
          My journey in tech is driven by curiosity and a desire to build meaningful digital experiences.
        </motion.p>
      </motion.div>

      {/* About Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        variants={staggerContainer}
      >
        {aboutCards.map((card, index) => (
          <motion.div key={card.title} variants={fadeInUp} custom={index}>
            <motion.div
              className="bg-white dark:bg-surface-dark rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 h-full flex flex-col justify-between"
              variants={cardHover}
              initial="rest"
              whileHover="hover"
            >
              <div>
                <motion.div 
                  className={`w-11 h-11 rounded-xl bg-gradient-to-r ${aboutCards[index].gradient} flex items-center justify-center text-white shadow-md mb-4`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span 
                    className="material-icons-outlined text-xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {card.icon}
                  </motion.span>
                </motion.div>
                
                <motion.h3 
                  className="text-lg font-bold text-slate-900 dark:text-white mb-2"
                  variants={staggerItem}
                >
                  {card.title}
                </motion.h3>
                
                <motion.p 
                  className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed"
                  variants={staggerItem}
                >
                  {card.content}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        variants={staggerContainer}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center p-6 bg-white dark:bg-surface-dark rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            variants={staggerItem}
            custom={index}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white mx-auto mb-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="material-icons-outlined text-xl">{stat.icon}</span>
            </motion.div>
            
            <motion.div 
              className="text-3xl font-bold text-slate-900 dark:text-white mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {stat.number}
            </motion.div>
            
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>



      {/* Interactive Coding Terminal */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12"
      >
        <Terminal />
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-10 right-10 text-purple-400/20 text-4xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        { }
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-10 text-cyan-400/20 text-5xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, 20, 0],
          x: [0, 10, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        &lt;/&gt;
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;