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
      starColors: ['#ffffff', '#e0f2fe', '#c084fc'],
      vineColor: 'rgba(56, 189, 248, 0.3)', // Soft glowing cyan line
      flowerColors: ['#38bdf8', '#a855f7', '#818cf8', '#e879f9'], // Bioluminescent orchids/lotus
      petalColors: ['#38bdf8', '#c084fc', '#e0f2fe']
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

    // --- 2. Falling Petals Setup ---
    const numPetals = 40;
    const petals = [];
    for (let i = 0; i < numPetals; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        color: palette.petalColors[Math.floor(Math.random() * palette.petalColors.length)]
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

    // Helper: Draw elegant glowing lotus/crystal flower
    const drawFlower = (x, y, radius, color, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      
      // Outer glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7;
      
      // Pointed, elegant petals
      const numPetals = 6;
      for (let i = 0; i < numPetals; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(radius * 0.5, radius * 0.5, radius * 0.5, radius * 1.5, 0, radius * 2);
        ctx.bezierCurveTo(-radius * 0.5, radius * 1.5, -radius * 0.5, radius * 0.5, 0, 0);
        ctx.fill();
        ctx.rotate(( (360 / numPetals) * Math.PI) / 180);
      }
      
      // Glowing Center
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    // Helper: Draw ethereal glowing branch
    const drawBranch = (startX, startY, isLeft) => {
      ctx.save();
      ctx.strokeStyle = palette.vineColor;
      ctx.shadowBlur = 10;
      ctx.shadowColor = palette.flowerColors[0];
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      const direction = isLeft ? 1 : -1;
      
      // Main ethereal vine
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(startX + (direction * 100), startY + 200, startX + (direction * 40), startY + 400);
      ctx.quadraticCurveTo(startX + (direction * 150), startY + 600, startX + (direction * 80), startY + 800);
      ctx.stroke();

      // Flowers on the vine
      const timeOffset = Math.sin(time * 1.5) * 8; // gentle sway
      drawFlower(startX + (direction * 80) + timeOffset, startY + 250, 10, palette.flowerColors[0], time * 10); 
      drawFlower(startX + (direction * 90) + timeOffset, startY + 550, 8, palette.flowerColors[1], -time * 8); 
      drawFlower(startX + (direction * 50) + timeOffset, startY + 750, 12, palette.flowerColors[2], time * 12); 
      
      ctx.restore();
    };

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

      // 3. Render Ethereal Side Floral Borders
      const vineScrollOffset = -(scrollY * 0.15); // Smoother, slower parallax for vines
      drawBranch(-30, -50 + vineScrollOffset, true); // Left branch
      drawBranch(-10, 400 + vineScrollOffset, true); // Lower left branch
      
      drawBranch(canvas.width + 30, -20 + vineScrollOffset, false); // Right branch
      drawBranch(canvas.width + 10, 500 + vineScrollOffset, false); // Lower right branch

      // 4. Render Glowing Petals
      petals.forEach(petal => {
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(time + petal.y * 0.01) * 0.5; // Smooth drift
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height + 20) {
          petal.y = -20;
          petal.x = Math.random() * canvas.width;
        }
        if (petal.x > canvas.width + 20) petal.x = -20;
        if (petal.x < -20) petal.x = canvas.width + 20;

        ctx.save();
        ctx.translate(petal.x, petal.y - (scrollY * 0.2));
        ctx.rotate((petal.rotation * Math.PI) / 180);
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = petal.color;
        ctx.fillStyle = petal.color;
        ctx.globalAlpha = 0.5 + Math.sin(time * 2 + petal.x) * 0.2; // Pulsing opacity
        
        ctx.beginPath();
        // Pointed petal shape
        ctx.moveTo(0, -petal.size);
        ctx.quadraticCurveTo(petal.size, 0, 0, petal.size);
        ctx.quadraticCurveTo(-petal.size, 0, 0, -petal.size);
        ctx.fill();
        ctx.restore();
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
