import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { useScrollReveal } from '../hooks/useAnimations';
import { fadeInUp, staggerContainer } from '../utils/animations';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 dark:border-slate-800"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-6 md:p-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <motion.h3 
                  className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight"
                >
                  {project.title}
                </motion.h3>
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  {project.category}
                </div>
              </div>
              <motion.button 
                onClick={onClose}
                className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-primary transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="material-icons-outlined">close</span>
              </motion.button>
            </div>

            {/* Project Preview */}
            <motion.div 
              className="relative aspect-video mb-8 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {project.videoUrl ? (
                <video src={project.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              )}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-icons-outlined text-primary">description</span>
                  Project Summary
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {project.description}
                </p>
                
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-icons-outlined text-primary">terminal</span>
                  Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold border border-slate-200 dark:border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">Links</h5>
                  <div className="flex flex-col gap-3">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:brightness-110 transition-all">
                      <span className="material-icons-outlined text-sm">launch</span>
                      Live Site
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                      <i className="fab fa-github"></i>
                      Codebase
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, onViewMore }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  // 3D Tilt Effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * -20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    if (videoRef.current) videoRef.current.pause();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-200 ease-out"
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title}
          animate={{ scale: isHovered ? 1.1 : 1, opacity: isHovered && project.videoUrl ? 0 : 1 }}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        {project.videoUrl && (
          <motion.div className="absolute inset-0 z-10" initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }}>
            <video ref={videoRef} src={project.videoUrl} loop muted playsInline className="w-full h-full object-cover" />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-20" />
        <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
          {project.category}
        </div>
      </div>

      <div className="p-8 space-y-4">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
          {project.shortDescription}
        </p>
        <div className="flex items-center gap-4 pt-4">
          <button onClick={() => onViewMore(project)} className="flex-1 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-lg">
            Details
          </button>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary transition-all">
            <span className="material-icons-outlined">launch</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(PROJECTS.map(p => p.category))];
    return cats;
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === filter);
  }, [filter]);

  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="px-6 lg:px-16 py-32 max-w-7xl mx-auto w-full relative" id="projects">
      <motion.div className="flex flex-col items-center text-center mb-16" variants={fadeInUp}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest">Portfolio</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-10">
          Smart <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-secondary italic">Work Gallery</span>
        </h2>

        {/* Smart Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 p-2 bg-slate-100 dark:bg-slate-800/50 rounded-[2rem] border border-slate-200 dark:border-slate-700 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                filter === cat ? 'text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {filter === cat && (
                <motion.div layoutId="filter-pill" className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/30" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onViewMore={setSelectedProject} />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default ProjectsSection;