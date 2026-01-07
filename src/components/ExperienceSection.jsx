import { motion } from 'framer-motion';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { useState } from 'react';
import { useScrollReveal, useStaggerAnimation } from '../hooks/useAnimations';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  cardHover,
  scaleIn
} from '../utils/animations';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const experienceData = [
    {
      position: "Jr. Programmer",
      company: "Genuine Technology & Research Ltd.",
      duration: "Jan 2024 - Present",
      type: "Full-time",
      location: "On-site",
      description: "Developing and maintaining database systems using SQL and modern database technologies. Collaborating with cross-functional teams to deliver high-quality data solutions and optimize database performance.",
      responsibilities: [
        "Designed and optimized 20+ database schemas for improved performance",
        "Improved query performance by 50% through advanced SQL optimization techniques",
        "Collaborated with development teams to implement efficient data access patterns",
        "Mentored junior developers in SQL best practices and database design"
      ],
      technologies: ["SQL Server", "MySQL", "PostgreSQL", "T-SQL", "Database Design", "Performance Tuning"],
      icon: "work"
    },
    {
      position: "Web Developer Intern",
      company: "Genuine Technology & Research Ltd.",
      duration: "Sep 2024 - Dec 2024",
      type: "Internship",
      location: "On-site",
      description: "Gained hands-on experience in full-stack web development, working on client projects and learning industry best practices in both frontend and backend technologies.",
      responsibilities: [
        "Developed 5+ client websites using HTML, CSS, and JavaScript",
        "Assisted in ASP.NET application development and maintenance",
        "Participated in code reviews and team meetings",
        "Learned version control with Git and project management tools"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "ASP.NET", "PHP", "Git"],
      icon: "business_center"
    }
  ];

  // GSAP scroll reveal
  const sectionRef = useScrollReveal({
    from: { opacity: 0 },
    to: { opacity: 1 },
    scrollTrigger: {
      onEnter: () => setIsVisible(true),
      start: "top 80%"
    }
  });

  const timelineRef = useStaggerAnimation('.experience-card', {
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0 },
    scrollTrigger: { start: "top 85%" }
  });

  // Trail animation for experience cards
  const trail = useTrail(experienceData.length, {
    from: { opacity: 0, transform: 'translateX(-100px)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translateX(0px)' : 'translateX(-100px)' 
    },
    config: { tension: 280, friction: 60 },
  });

  return (
    <motion.section 
      ref={sectionRef}
      className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50" 
      id="experience"
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
          className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-orange-500 font-semibold text-xs tracking-widest uppercase">
            My Journey
          </span>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          variants={staggerItem}
        >
          Work <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
            Experience
          </span>
        </motion.h2>
        
        <motion.div 
          className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Experience Timeline */}
      <motion.div 
        ref={timelineRef}
        className="relative"
        variants={staggerContainer}
      >
        {/* Timeline Line */}
        <motion.div 
          className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        <div className="space-y-12">
          {trail.map((style, index) => (
            <animated.div key={index} style={style}>
              <motion.div 
                className={`experience-card flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                variants={staggerItem}
                custom={index}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-4 border-white dark:border-background-dark shadow-lg z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.2 }}
                />

                {/* Content Card */}
                <motion.div 
                  className="flex-1 ml-16 md:ml-0 group"
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                >
                  <motion.div 
                    className="relative p-8 bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
                    whileHover={{ y: -10 }}
                  >
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div 
                        className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 flex-shrink-0"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="material-icons-outlined text-2xl">
                          {experienceData[index].icon}
                        </span>
                      </motion.div>
                      
                      <div className="flex-1">
                        <motion.h3 
                          className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {experienceData[index].position}
                        </motion.h3>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                          <motion.span 
                            className="text-primary font-semibold"
                            whileHover={{ scale: 1.05 }}
                          >
                            {experienceData[index].company}
                          </motion.span>
                          <span className="hidden sm:inline text-slate-400">•</span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {experienceData[index].duration}
                          </span>
                        </div>
                        
                        <div className="flex gap-2 mb-4">
                          <motion.span 
                            className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold"
                            whileHover={{ scale: 1.05 }}
                          >
                            {experienceData[index].type}
                          </motion.span>
                          <motion.span 
                            className="inline-block px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                            whileHover={{ scale: 1.05 }}
                          >
                            {experienceData[index].location}
                          </motion.span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <motion.p 
                      className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6"
                      variants={staggerItem}
                    >
                      {experienceData[index].description}
                    </motion.p>

                    {/* Responsibilities */}
                    <div className="mb-6">
                      <motion.h4 
                        className="text-slate-900 dark:text-white font-semibold mb-3"
                        variants={staggerItem}
                      >
                        Key Responsibilities:
                      </motion.h4>
                      <motion.ul 
                        className="space-y-2"
                        variants={staggerContainer}
                      >
                        {experienceData[index].responsibilities.map((responsibility, idx) => (
                          <motion.li 
                            key={idx}
                            className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm"
                            variants={staggerItem}
                            custom={idx}
                            whileHover={{ x: 5 }}
                          >
                            <motion.span 
                              className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"
                              whileHover={{ scale: 1.5 }}
                            />
                            {responsibility}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <motion.h4 
                        className="text-slate-900 dark:text-white font-semibold mb-3"
                        variants={staggerItem}
                      >
                        Technologies Used:
                      </motion.h4>
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        variants={staggerContainer}
                      >
                        {experienceData[index].technologies.map((tech, idx) => (
                          <motion.span 
                            key={idx}
                            className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                            variants={staggerItem}
                            custom={idx}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            </animated.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 right-10 text-orange-400/20 text-5xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        💼
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 left-10 text-red-400/20 text-4xl font-bold select-none pointer-events-none"
        animate={{ 
          y: [0, 25, 0],
          x: [0, 15, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        🚀
      </motion.div>
    </motion.section>
  );
};

export default ExperienceSection;