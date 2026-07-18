import React from 'react';
import { motion } from 'framer-motion';

const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-500 bg-gray-50 dark:bg-[#010105]">
      {/* Ambient Cosmic Background Core (Only visible in Dark Mode) */}
      <div className="absolute inset-0 z-0 hidden dark:flex items-center justify-center opacity-40">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.1 }}
          animate={{ scale: 1.2, opacity: 0.3 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-r from-cyan-900/40 via-indigo-900/20 to-purple-900/40 blur-[120px]"
        />
        <motion.div
          initial={{ scale: 1.2, opacity: 0.3 }}
          animate={{ scale: 0.8, opacity: 0.1 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-l from-blue-900/30 via-purple-900/20 to-pink-900/30 blur-[120px]"
        />
      </div>

      {/* Floating Stardust Particles (Dark Mode) */}
      <div className="absolute inset-0 z-0 hidden dark:block">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`dark-${i}`}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ 
              opacity: [0.1, 0.5, 0.1],
              scale: [0.5, 1.2, 0.5],
              y: [0, -30, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Elegant Ambient Glow for Light Mode */}
      <div className="absolute inset-0 z-0 flex dark:hidden items-center justify-center opacity-60">
        <motion.div
          initial={{ scale: 0.9, opacity: 0.4 }}
          animate={{ scale: 1.1, opacity: 0.7 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-cyan-100 to-transparent blur-[100px]"
        />
        <motion.div
          initial={{ scale: 1.1, opacity: 0.7 }}
          animate={{ scale: 0.9, opacity: 0.4 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-purple-100 to-transparent blur-[100px]"
        />
      </div>
      
      {/* Light Mode subtle particles */}
      <div className="absolute inset-0 z-0 block dark:hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="absolute w-1 h-1 bg-cyan-500/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.5, 0.8],
              y: [0, -20, 0]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default CosmicBackground;
