'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();
  const speedRef = useRef<number>(0.5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numStars = 200;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    const getRandomColor = () => {
      const colors = ['#00ffff', '#ff00ff', '#8a2be2', '#ffffff', '#00ff88'];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const createStars = () => {
      starsRef.current = [];
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: (Math.random() - 0.5) * 4000,
          y: (Math.random() - 0.5) * 4000,
          z: Math.random() * 1000 + 1,
          color: getRandomColor(),
          size: Math.random() * 2 + 0.5
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      starsRef.current.forEach((star) => {
        // Move star towards viewer
        star.z -= speedRef.current;

        // Reset star when it gets too close
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 4000;
          star.y = (Math.random() - 0.5) * 4000;
          star.z = 1000;
          star.color = getRandomColor();
        }

        // 3D to 2D projection
        const perspective = 200;
        const x = (star.x / star.z) * perspective + centerX;
        const y = (star.y / star.z) * perspective + centerY;

        // Calculate size based on distance
        const size = Math.max(0.1, star.size * (1000 - star.z) / 1000 * 3);
        const opacity = Math.max(0.1, (1000 - star.z) / 1000);

        // Only draw if star is on screen
        if (x >= -50 && x <= canvas.width + 50 && 
            y >= -50 && y <= canvas.height + 50) {
          
          // Draw star with glow
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = star.color;
          ctx.shadowBlur = size * 4;
          ctx.shadowColor = star.color;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const hyperspace = () => {
      speedRef.current = 4;
      setTimeout(() => {
        speedRef.current = 0.5;
      }, 3000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        hyperspace();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('keydown', handleKeyDown);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('keydown', handleKeyDown);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)'
      }}
    />
  );
}
