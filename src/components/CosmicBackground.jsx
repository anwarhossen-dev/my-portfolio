import React from 'react';

const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#fafafa] dark:bg-[#03030a] transition-colors duration-500">
      {/* 
        This is a much more performant background. It uses a simple CSS gradient
        and removes the expensive canvas and backdrop-filter.
      */}
      <div className="absolute inset-0 bg-white dark:bg-gradient-to-b dark:from-[#03030a] dark:to-[#0a0a1a] z-[1] transition-colors duration-500" />
    </div>
  );
};

export default CosmicBackground;
