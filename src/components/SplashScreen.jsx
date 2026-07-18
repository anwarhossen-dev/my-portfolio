import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const SplashScreen = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timeout = setTimeout(() => {
      setIsMounted(false);
      setTimeout(() => {
        document.body.style.overflow = 'unset';
        finishLoading();
      }, 1500); // Exiting duration (slow fade into the site)
    }, 5500); // Full cinematic duration

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = 'unset';
    };
  }, [finishLoading]);

  const name = "MD. ANWAR HOSSEN";

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#010105] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.15,
            filter: "blur(20px)", 
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
          }}
        >
          {/* Ambient Cosmic Background Core */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.15 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 blur-[100px]"
            />
          </div>

          {/* Majestic SVG Geometry (Right Angle + Orbit/Moon) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <svg className="w-full h-full max-w-[800px] max-h-[800px] absolute" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="purpleGlow" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="15" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* The Right Angle (Cosmic Frame) */}
              <motion.path
                d="M 200,600 L 200,200 L 600,200"
                stroke="url(#cyanGlow)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: [0.6, 0.01, -0.05, 0.95] }}
              />

              {/* The Moon/Orbit (Crescent Intersection) */}
              <motion.circle
                cx="500"
                cy="500"
                r="180"
                stroke="url(#purpleGlow)"
                strokeWidth="2"
                strokeDasharray="400 200"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
                animate={{ pathLength: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 3, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.5 }}
                style={{ transformOrigin: "500px 500px" }}
              />
              
              {/* Star Core Flash */}
              <motion.circle
                cx="600"
                cy="200"
                r="4"
                fill="#fff"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2, 1], opacity: [0, 1, 0.8] }}
                transition={{ duration: 2, delay: 2, ease: "easeOut" }}
              />
            </svg>
          </div>

          {/* Floating Stardust Particles */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ 
                  opacity: [0, Math.random() * 0.8 + 0.2, 0],
                  scale: [0, Math.random() * 1.5 + 0.5, 0],
                  y: -50 - Math.random() * 100
                }}
                transition={{
                  duration: Math.random() * 3 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Cinematic Typography */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
            
            <motion.div
              className="relative overflow-hidden px-10 py-6"
              initial="hidden"
              animate="visible"
            >
              {/* Shimmer Light Sweep */}
              <motion.div 
                className="absolute top-0 left-0 w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 skew-x-[-30deg]"
                initial={{ x: "-200%" }}
                animate={{ x: "300%" }}
                transition={{ duration: 2.5, delay: 2.5, ease: "easeInOut" }}
                style={{ zIndex: 30 }}
              />

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] font-display flex gap-x-6 md:gap-x-10">
                {name.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="flex">
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ 
                          duration: 1.2, 
                          delay: 1.2 + (wordIndex * 0.3) + (charIndex * 0.08), 
                          ease: [0.22, 1, 0.36, 1] // Apple-like ultra-smooth easing
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>
            </motion.div>

            {/* Premium Divider */}
            <motion.div
              className="relative w-full max-w-[200px] md:max-w-[400px] h-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 3.2 }}
              />
              {/* Glint dot moving on the line */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]"
                initial={{ left: "0%", opacity: 0, scale: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
                transition={{ duration: 2, ease: "easeInOut", delay: 3.5 }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.6em" }}
              transition={{ duration: 2, delay: 3.8, ease: "easeOut" }}
              className="mt-8 text-xs md:text-sm text-indigo-200/80 uppercase font-medium"
            >
              Creative Developer
            </motion.p>

          </div>
          
          {/* Exit Flash - Creates a 'Hyperdrive' transition out */}
          <motion.div 
            className="absolute inset-0 bg-white z-[99999] pointer-events-none"
            initial={{ opacity: 0 }}
            exit={{ opacity: [0, 1, 0], transition: { duration: 1.5, ease: "easeInOut" } }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
};

SplashScreen.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default SplashScreen;
