import { motion } from 'framer-motion';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { useState, useEffect } from 'react';
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

  const cardsRef = useStaggerAnimation('.about-card', {
    from: { opacity: 0, y: 50, scale: 0.9 },
    to: { opacity: 1, y: 0, scale: 1 },
    scrollTrigger: { start: "top 85%" }
  });

  // React Spring animations
  const titleSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
    config: { tension: 280, friction: 60 },
    delay: 200,
  });

  const aboutCards = [
    {
      title: "My Programming Journey",
      content: "Started my coding journey in 2020 during my diploma studies. What began as curiosity about how websites work has evolved into a passion for creating digital solutions that make a difference.",
      icon: "code",
      gradient: "from-cyan-500 to-blue-500",
      delay: 0
    },
    {
      title: "What I Love Doing",
      content: "I enjoy turning complex problems into simple, beautiful designs. Whether it's a sleek user interface or a robust backend system, I love the challenge of bringing ideas to life through code.",
      icon: "favorite",
      gradient: "from-purple-500 to-pink-500",
      delay: 200
    },
    {
      title: "Beyond Coding",
      content: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and growth.",
      icon: "explore",
      gradient: "from-green-500 to-emerald-500",
      delay: 400
    }
  ];

  // Trail animation for cards
  const trail = useTrail(aboutCards.length, {
    from: { opacity: 0, transform: 'translateY(50px) scale(0.9)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.9)' 
    },
    config: { tension: 300, friction: 20 },
  });

  const stats = [
    { number: "2+", label: "Years Experience", icon: "work_history" },
    { number: "15+", label: "Projects Completed", icon: "assignment_turned_in" },
    { number: "5+", label: "Technologies", icon: "code" },
    { number: "100%", label: "Client Satisfaction", icon: "sentiment_very_satisfied" }
  ];

  return (
    <motion.section 
      ref={sectionRef}
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
        variants={fadeInUp}
      >
        <motion.div 
          className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-purple-500 font-semibold text-xs tracking-widest uppercase">
            Get to know me
          </span>
        </motion.div>
        
        <animated.h2 
          style={titleSpring}
          className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
        >
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Me
          </span>
        </animated.h2>
        
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
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        variants={staggerContainer}
      >
        {trail.map((style, index) => (
          <animated.div key={aboutCards[index].title} style={style}>
            <motion.div
              className="about-card bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full"
              variants={cardHover}
              initial="rest"
              whileHover="hover"
            >
              <motion.div 
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${aboutCards[index].gradient} flex items-center justify-center text-white shadow-lg mb-6`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span 
                  className="material-icons-outlined text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {aboutCards[index].icon}
                </motion.span>
              </motion.div>
              
              <motion.h3 
                className="text-xl font-bold text-slate-900 dark:text-white mb-4"
                variants={textReveal}
              >
                {aboutCards[index].title}
              </motion.h3>
              
              <motion.p 
                className="text-slate-600 dark:text-slate-400 leading-relaxed"
                variants={textReveal}
              >
                {aboutCards[index].content}
              </motion.p>
            </motion.div>
          </animated.div>
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

      {/* Personal Quote */}
      <motion.div 
        className="text-center max-w-4xl mx-auto"
        variants={fadeInUp}
      >
        <motion.div 
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl p-8 border border-cyan-500/20"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="text-6xl text-cyan-500/30 mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 italic leading-relaxed mb-4"
            variants={textReveal}
          >
            Code is like humor. When you have to explain it, it's bad.
          </motion.p>
          
          <motion.p 
            className="text-slate-500 dark:text-slate-400 font-medium"
            variants={textReveal}
          >
            - Cory House
          </motion.p>
        </motion.div>
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