import React from 'react';

const MarqueeText = ({ 
  children, 
  speed = 30, 
  direction = 'left', 
  pauseOnHover = true,
  className = '',
  gradient = true 
}) => {
  const duration = `${1200 / speed}s`;

  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ '--duration': duration }}
    >
      {/* Gradient Overlays */}
      {gradient && (
        <>
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-gray-50 dark:from-background-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-gray-50 dark:from-background-dark to-transparent z-10 pointer-events-none" />
        </>
      )}
      
      {/* Marquee Content Wrapper */}
      <div 
        className={`flex w-max ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        } ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
      >
        {/* Original Content */}
        <div className="flex items-center">
          {children}
        </div>
        
        {/* Duplicate Content for Seamless Loop */}
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;