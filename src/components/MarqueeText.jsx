import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MarqueeText = ({ 
  children, 
  speed = 50, 
  direction = 'left', 
  pauseOnHover = true,
  className = '',
  gradient = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const updateWidths = () => {
      const container = document.getElementById('marquee-container');
      const content = document.getElementById('marquee-content');
      if (container && content) {
        setContainerWidth(container.offsetWidth);
        setContentWidth(content.scrollWidth);
      }
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, [children]);

  const animationDuration = contentWidth / speed;
  const translateX = direction === 'left' ? -contentWidth : contentWidth;

  return (
    <div 
      id="marquee-container"
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      {/* Gradient Overlays */}
      {gradient && (
        <>
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        </>
      )}
      
      {/* Marquee Content */}
      <motion.div
        id="marquee-content"
        className="flex whitespace-nowrap"
        animate={{
          x: isHovered ? 0 : translateX,
        }}
        transition={{
          duration: isHovered ? 0.5 : animationDuration,
          ease: isHovered ? "easeOut" : "linear",
          repeat: isHovered ? 0 : Infinity,
        }}
      >
        {/* Original Content */}
        <div className="flex items-center">
          {children}
        </div>
        
        {/* Duplicate Content for Seamless Loop */}
        <div className="flex items-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default MarqueeText;