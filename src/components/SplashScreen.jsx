import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { PERSONAL_INFO } from '../constants';

const SplashScreen = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(false);
      setTimeout(() => {
        finishLoading();
      }, 250);
    }, 800);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  const name = "MD. ANWAR HOSSEN";

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#02040a] overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(12px)", 
            transition: { duration: 0.3, ease: "easeInOut" } 
          }}
        >
          {/* Ambient Glowing Gradient Orbs */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.3 }}
              transition={{ duration: 1 }}
              className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 blur-3xl"
            />
          </div>

          {/* Centered Content Container */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto">
            
            {/* Smart Rotating Circle Avatar Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              className="relative mb-6 flex items-center justify-center"
            >
              {/* Outer Glowing Rotating Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 blur-md opacity-80"
              />

              {/* Counter-rotating Dashed Circle */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border-2 border-dashed border-cyan-400/60 pointer-events-none" 
              />

              {/* Avatar Container */}
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full p-1.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_50px_rgba(6,182,212,0.7)] z-10">
                <img 
                  src={PERSONAL_INFO.anwarImage || PERSONAL_INFO.profileImage} 
                  alt="MD. Anwar Hossen Profile" 
                  className="w-full h-full object-cover rounded-full border-2 border-slate-950"
                />
              </div>
            </motion.div>

            {/* Centered Main Name Typography */}
            <motion.div
              className="relative overflow-hidden py-1 mb-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-100 to-purple-300 drop-shadow-[0_0_35px_rgba(6,182,212,0.7)] font-sans">
                {name}
              </h1>
            </motion.div>

            {/* Glowing Accent Line */}
            <motion.div
              className="w-32 md:w-48 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-[0_0_20px_rgba(34,211,238,0.9)] my-3"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />

            {/* Subtitle Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-2 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                Full Stack & Next.js Software Engineer
              </span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

SplashScreen.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default SplashScreen;
