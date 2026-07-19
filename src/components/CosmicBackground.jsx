import React, { useEffect, useRef } from 'react';

const CosmicBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // --- 1. 3D Stars Setup ---
    const numStars = 250; 
    const stars = [];
    const maxDepth = 1000;
    
    // Premium Color Palette
    const palette = {
      spaceBgTop: '#03030a',
      spaceBgBot: '#0a0a1a',
      starColors: ['#ffffff', '#e0f2fe', '#c084fc']
    };

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * maxDepth,
        size: Math.random() * 1.5 + 0.5,
        color: palette.starColors[Math.floor(Math.random() * palette.starColors.length)],
        baseSpeed: Math.random() * 0.8 + 0.2
      });
    }

    // Scroll & Mouse Interaction
    let scrollY = 0;
    let targetScrollY = 0;
    const handleScroll = () => { targetScrollY = window.scrollY; };
    window.addEventListener('scroll', handleScroll);

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.01;
      scrollY += (targetScrollY - scrollY) * 0.1;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const isDark = document.documentElement.classList.contains('dark');

      // 1. Clear the canvas to keep it transparent so the underlay is visible
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Premium subtle nebulas
      const drawNebula = (x, y, radius, r, g, b, alpha) => {
        const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        grd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };

      // Soft Azure and Deep Violet nebulas (adjusted for light/dark mode)
      if (isDark) {
        drawNebula(cx + Math.sin(time) * 150, cy + Math.cos(time * 0.6) * 150, 700, 14, 165, 233, 0.08); 
        drawNebula(cx - Math.cos(time * 0.8) * 200, cy - Math.sin(time) * 150, 800, 109, 40, 217, 0.06); 
      } else {
        drawNebula(cx + Math.sin(time) * 150, cy + Math.cos(time * 0.6) * 150, 700, 14, 165, 233, 0.04); 
        drawNebula(cx - Math.cos(time * 0.8) * 200, cy - Math.sin(time) * 150, 800, 109, 40, 217, 0.03); 
      }

      // 2. Render 3D Stars
      stars.forEach(star => {
        star.z -= star.baseSpeed;
        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        const offsetX = star.x + mouseX * (maxDepth / star.z);
        const offsetY = star.y + mouseY * (maxDepth / star.z) - (scrollY * 0.5 * (1000 / star.z));
        const scale = 800 / star.z;
        const x2d = cx + offsetX * scale;
        const y2d = cy + offsetY * scale;

        if (x2d > 0 && x2d < canvas.width && y2d > 0 && y2d < canvas.height) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, star.size * scale * 0.5, 0, Math.PI * 2);
          
          // Determine color based on active theme
          let starColor = star.color;
          if (!isDark) {
            if (starColor === '#ffffff' || starColor === '#e0f2fe') {
              starColor = '#0284c7'; // Vibrant sky blue in light mode
            }
          }

          if (star.z < 250) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = starColor;
          } else {
            ctx.shadowBlur = 0;
          }

          const opacity = Math.min(1, Math.max(0, 1 - (star.z / maxDepth)));
          ctx.fillStyle = starColor;
          ctx.globalAlpha = opacity;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#fafafa] dark:bg-[#03030a] transition-colors duration-500">
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full opacity-100 relative z-[2]"
      />
      
      {/* 
        Ultra Premium Glassmorphism Overlay:
        Perfect contrast balance. Text readability is fully preserved.
      */}
      <div className="absolute inset-0 bg-white/70 dark:bg-[#03030a]/80 backdrop-blur-[4px] z-[1] transition-colors duration-500" />
    </div>
  );
};

export default CosmicBackground;
