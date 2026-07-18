import React, { useEffect, useRef } from 'react';

const CosmicBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Particle System (3D Starfield & Dust)
    const numStars = 400; // High density for video-like feel
    const stars = [];
    const maxDepth = 1000;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * maxDepth,
        size: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.8 ? '#a855f7' : (Math.random() > 0.5 ? '#06b6d4' : '#ffffff'),
        baseSpeed: Math.random() * 0.5 + 0.1
      });
    }

    let scrollY = 0;
    let targetScrollY = 0;

    // Scroll interaction
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Mouse interaction for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    // Animation Loop
    const render = () => {
      time += 0.002; // Slow continuous rotation

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.1;
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Dark, cinematic space background
      // Using an almost black gradient to simulate deep space
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#020008'); // Extremely dark purple/black
      gradient.addColorStop(1, '#050a1f'); // Deep dark blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Nebulas (Video-like fluid gradients)
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      const drawNebula = (x, y, radius, r, g, b, alpha) => {
        const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        grd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };

      // Moving nebulas based on time and scroll
      drawNebula(
        cx + Math.sin(time) * 300 - mouseX * 2, 
        cy + Math.cos(time * 0.8) * 200 - (scrollY * 0.2), 
        800, 
        34, 211, 238, 0.15 // Cyan
      );
      
      drawNebula(
        cx - Math.cos(time * 1.2) * 400 + mouseX * 2, 
        cy - Math.sin(time) * 300 - (scrollY * 0.15), 
        900, 
        168, 85, 247, 0.1 // Purple
      );

      // Render Stars (3D Projection)
      stars.forEach(star => {
        // Move star forward slowly (Cosmic drift)
        star.z -= star.baseSpeed;
        
        // Reset if it goes past the camera
        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        // Apply scroll and mouse parallax offsets
        const offsetX = star.x + mouseX * (maxDepth / star.z);
        const offsetY = star.y + mouseY * (maxDepth / star.z) - (scrollY * 0.5 * (1000 / star.z));

        // 3D to 2D Projection
        const scale = 800 / star.z;
        const x2d = cx + offsetX * scale;
        const y2d = cy + offsetY * scale;

        // Draw star if visible
        if (x2d > 0 && x2d < canvas.width && y2d > 0 && y2d < canvas.height) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, star.size * scale * 0.5, 0, Math.PI * 2);
          
          // Add glow to closer stars
          if (star.z < 300) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = star.color;
          } else {
            ctx.shadowBlur = 0;
          }
          
          // Fade based on depth
          const opacity = Math.min(1, Math.max(0, 1 - (star.z / maxDepth)));
          ctx.fillStyle = star.color;
          ctx.globalAlpha = opacity;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // Draw subtle shooting stars occasionally
      if (Math.random() > 0.98) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - 100, startY + 100);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

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
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020008]">
      {/* 
        This is a High-Performance HTML5 Canvas.
        It renders a true 3D fluid starfield and moving nebulas that react smoothly to scrolling.
      */}
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full opacity-100 dark:opacity-100 transition-opacity duration-1000"
      />
      
      {/* Light Mode Overlay (optional fallback to soften it in light mode, but user wanted a premium video background overall) */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-3xl block dark:hidden transition-opacity duration-500" />
    </div>
  );
};

export default CosmicBackground;
