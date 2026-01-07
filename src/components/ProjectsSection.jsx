import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrail, animated } from '@react-spring/web';
import { PROJECTS } from '../constants';
import { useScrollReveal, useStaggerAnimation } from '../hooks/useAnimations';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover,
  buttonHover
} from '../utils/animations';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-white dark:bg-surface-dark rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <motion.h3 
                className="text-2xl font-bold text-slate-900 dark:text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {project.title}
              </motion.h3>
              <motion.button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="material-icons-outlined">close</span>
              </motion.button>
            </div>

            {/* Project Image */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 object-cover rounded-2xl"
              />
            </motion.div>

            {/* Technology Stack */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <motion.span 
                    key={index} 
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Project Description</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.description}</p>
            </motion.div>

            {/* Links */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="material-icons-outlined text-sm">launch</span>
                Live Demo
              </motion.a>
              <motion.a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-github"></i>
                GitHub
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, onViewMore, index }) => {
  return (
    <motion.div 
      className="group relative bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        
        {/* Featured Badge */}
        {project.featured && (
          <motion.div 
            className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            Featured
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors"
          whileHover={{ x: 5 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4"
          variants={staggerItem}
        >
          {project.shortDescription}
        </motion.p>

        {/* Technologies */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-6"
          variants={staggerContainer}
        >
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <motion.span 
              key={techIndex} 
              className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
              variants={staggerItem}
              custom={techIndex}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <motion.span 
              className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              +{project.technologies.length - 3} more
            </motion.span>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button 
            onClick={() => onViewMore(project)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
            variants={buttonHover}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <span className="material-icons-outlined text-sm">visibility</span>
            View Details
          </motion.button>
          
          <motion.a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="material-icons-outlined text-sm">launch</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const projectsRef = useStaggerAnimation('.project-card', {
    from: { opacity: 0, y: 60, scale: 0.9 },
    to: { opacity: 1, y: 0, scale: 1 },
    scrollTrigger: { start: "top 85%" }
  });

  // Trail animation for projects
  const trail = useTrail(PROJECTS.length, {
    from: { opacity: 0, transform: 'translateY(60px) scale(0.9)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(60px) scale(0.9)' 
    },
    config: { tension: 280, friction: 60 },
  });

  const handleViewMore = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <motion.section 
        ref={sectionRef}
        className="px-6 lg:px-16 py-24 max-w-7xl mx-auto w-full relative z-10 border-t border-slate-200/50 dark:border-slate-800/50" 
        id="projects"
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
              My Work
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
            variants={staggerItem}
          >
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Projects
            </span>
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mt-6"
            variants={staggerItem}
          >
            Here are some of my recent projects that showcase my skills and experience
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {trail.map((style, index) => (
            <animated.div key={PROJECTS[index].id} style={style}>
              <div className="project-card">
                <ProjectCard 
                  project={PROJECTS[index]} 
                  onViewMore={handleViewMore}
                  index={index}
                />
              </div>
            </animated.div>
          ))}
        </motion.div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 right-10 text-purple-400/20 text-5xl font-bold select-none pointer-events-none"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          💻
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 left-10 text-pink-400/20 text-4xl font-bold select-none pointer-events-none"
          animate={{ 
            y: [0, 25, 0],
            x: [0, 15, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          🚀
        </motion.div>
      </motion.section>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsSection;