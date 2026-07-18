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
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * maxDepth,
        size: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.8 ? '#a855f7' : (Math.random() > 0.5 ? '#06b6d4' : '#ffffff'),
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
        size: Math.random() * 4 + 3,
        speedY: Math.random() * 1 + 0.5,
        speedX: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        color: Math.random() > 0.5 ? '#ff4d4d' : '#ffb3b3' // Red/Pink for roses/hibiscus
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

    // Helper: Draw stylized flower
    const drawFlower = (x, y, radius, color, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      
      // Petals
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.8;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.ellipse(0, radius, radius * 0.8, radius * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.rotate((72 * Math.PI) / 180);
      }
      // Center
      ctx.fillStyle = '#fbbf24'; // Yellow center
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    // Helper: Draw floral branch
    const drawBranch = (startX, startY, isLeft) => {
      ctx.save();
      ctx.strokeStyle = '#064e3b'; // Dark green
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.7;

      const direction = isLeft ? 1 : -1;
      
      // Main vine
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(startX + (direction * 150), startY + 200, startX + (direction * 50), startY + 400);
      ctx.quadraticCurveTo(startX + (direction * 200), startY + 600, startX + (direction * 100), startY + 800);
      ctx.stroke();

      // Flowers on the vine
      const timeOffset = Math.sin(time * 2) * 5; // gentle sway
      drawFlower(startX + (direction * 100) + timeOffset, startY + 250, 15, '#e11d48', time * 20); // Rose red
      drawFlower(startX + (direction * 120) + timeOffset, startY + 550, 12, '#f43f5e', -time * 15); // Pink
      drawFlower(startX + (direction * 60) + timeOffset, startY + 750, 18, '#be123c', time * 10); // Deep rose
      
      ctx.restore();
    };

    const render = () => {
      time += 0.01;
      scrollY += (targetScrollY - scrollY) * 0.1;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 1. Draw Space Background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#020008'); 
      gradient.addColorStop(1, '#0f172a'); 
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Nebulas
      const drawNebula = (x, y, radius, r, g, b, alpha) => {
        const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        grd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };

      drawNebula(cx + Math.sin(time) * 200, cy + Math.cos(time * 0.8) * 150, 600, 34, 211, 238, 0.1); 
      drawNebula(cx - Math.cos(time * 1.2) * 300, cy - Math.sin(time) * 200, 700, 168, 85, 247, 0.08); 

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
          const opacity = Math.min(1, Math.max(0, 1 - (star.z / maxDepth)));
          ctx.fillStyle = star.color;
          ctx.globalAlpha = opacity;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // 3. Render Side Floral Borders
      // Adjust startY based on scroll parallax to make vines move slightly
      const vineScrollOffset = -(scrollY * 0.2);
      drawBranch(-50, -100 + vineScrollOffset, true); // Left branch
      drawBranch(-20, 300 + vineScrollOffset, true); // Lower left branch
      
      drawBranch(canvas.width + 50, -50 + vineScrollOffset, false); // Right branch
      drawBranch(canvas.width + 20, 400 + vineScrollOffset, false); // Lower right branch

      // 4. Render Falling Petals
      petals.forEach(petal => {
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(time + petal.y * 0.01) * 0.5; // Drift effect
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height + 20) {
          petal.y = -20;
          petal.x = Math.random() * canvas.width;
        }
        if (petal.x > canvas.width + 20) petal.x = -20;
        if (petal.x < -20) petal.x = canvas.width + 20;

        ctx.save();
        ctx.translate(petal.x, petal.y - (scrollY * 0.3)); // Slight parallax for petals
        ctx.rotate((petal.rotation * Math.PI) / 180);
        ctx.fillStyle = petal.color;
        ctx.globalAlpha = 0.6;
        
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size, petal.size * 1.5, 0, 0, Math.PI * 2);
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
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020008]">
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full opacity-100"
      />
      
      {/* 
        Ultra Premium Glassmorphism Overlay:
        This ensures that despite the complex background (Stars + Flowers), 
        the portfolio text in the center remains 100% perfectly readable.
      */}
      <div className="absolute inset-0 bg-white/60 dark:bg-[#020008]/70 backdrop-blur-sm z-[1] transition-colors duration-500" />
    </div>
  );
};

export default CosmicBackground;
