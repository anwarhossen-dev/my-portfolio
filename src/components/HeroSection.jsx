import { useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../constants';
import { scrollToElement } from '../utils';
import { Typewriter } from 'react-simple-typewriter';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaReact } from 'react-icons/fa';
import { SiNodedotjs } from 'react-icons/si';
import GithubStatus from './GithubStatus';

export const HeroSection = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleContactClick = (e) => {
    e.preventDefault();
    scrollToElement('contact', 100);
  };

  const handleScrollDown = (e) => {
    e.preventDefault();
    scrollToElement('about', 100);
  };

  const nameParts = PERSONAL_INFO.name.split(' ');
  const firstName = nameParts[0];
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 py-20 gap-12 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Background Decorative Auras */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. Content Section (Left) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 w-full text-left space-y-8 order-2 lg:order-1 relative z-10 lg:pt-10"
      >
        <div className="flex flex-wrap items-center gap-4"> 
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary-dark dark:text-primary border border-primary/20 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">Available for Projects</span> 
          </div>
          <GithubStatus username="anwarhossen-dev" />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1]">
            <span className="block text-slate-900 dark:text-white">
              Hi, I'm <span className="text-primary">{firstName}</span>
            </span>
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent italic">
              <Typewriter
                words={[nameParts.slice(1).join(' ')]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={80}
              />
            </span>
          </h1>

          <div className="flex items-center gap-4 text-xl lg:text-2xl font-bold text-slate-600 dark:text-slate-400">
            <div className="h-[2px] w-12 bg-primary/30" />
            <span className="text-primary font-mono">&lt;</span>
            <Typewriter
              words={["Full Stack Architect", "MERN Expert", "ASP.NET Core Dev"]}
              loop={0}
              cursor
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1500}
            />
            <span className="text-primary font-mono">/&gt;</span>
          </div>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
          Crafting <span className="text-slate-900 dark:text-white font-black underline decoration-primary/30">high-performance</span> digital experiences. Specialized in building scalable applications from vision to reality.
        </p>

        <div className="flex flex-wrap items-center gap-5 pt-4">
          <motion.button
            onClick={handleContactClick}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black shadow-2xl transition-all"
          >
            <span>Start a Project</span>
            <span className="material-icons-outlined text-sm">rocket_launch</span>
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-black hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <span className="material-icons-outlined text-xl">description</span>
            <span>Get Resume</span>
          </motion.a>
        </div>
      </motion.div>

      {/* 2. Profile Section (Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 w-full flex justify-center items-center relative order-1 lg:order-2"
      >
        <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] perspective-1000">
          {/* Animated Background Shapes */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[2px] border-dashed border-primary/30 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] pointer-events-none floating-shape"
          />

          {/* Image Container with 3D Interaction */}
          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative z-10 w-full h-full p-8 sm:p-12"
          >
            <div className="relative w-full h-full rounded-[3rem] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-2 border-white/20 dark:border-slate-800">
              <img
                className="w-full h-full object-cover object-[center_35%] grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                alt={`MD. Anwar Hossen - Full Stack Developer Profile Picture`}
                src={PERSONAL_INFO.profileImage}
                onError={(e) => { e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; }}
              />
              {/* Glossy Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* Smart Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 z-20 hidden sm:block">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="font-black text-lg">{PERSONAL_INFO.experience}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-70">Experience</p>
                  </div>
                  <div className="h-8 w-[1px] bg-white/20" />
                  <div>
                    <p className="font-black text-lg">15+</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-70">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Orbiting Icons */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 z-30"
          >
            <FaReact className="text-primary text-3xl" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 -left-8 w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 z-30"
          >
            <SiNodedotjs className="text-[#339933] text-2xl" />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Discover */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Scroll Down</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-slate-400 flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;