'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
  color: string;
}

export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = true;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 14-16 realistic organic rose petals
    const petalCount = 16;
    const petals: Petal[] = [];
    const colors = [
      'rgba(217, 160, 168, 0.55)', // #d9a0a8 at 55%
      'rgba(228, 154, 168, 0.52)',
      'rgba(240, 185, 194, 0.58)',
      'rgba(217, 132, 148, 0.50)',
    ];

    for (let i = 0; i < petalCount; i++) {
      const height = canvas.height || 800;
      // random fall duration between 9s and 17s
      const fallDuration = 9 + Math.random() * 8; // seconds
      const speedY = (height / (fallDuration * 60)); // px per frame at 60fps

      petals.push({
        x: Math.random() * (canvas.width || 400),
        y: Math.random() * height,
        size: 11 + Math.random() * 5, // 10-16px
        speedY: speedY,
        speedX: -0.4 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.02,
        opacity: 0.45 + Math.random() * 0.2,
        color: colors[i % colors.length],
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      // Gentle 3D perspective flip along Y-axis via scaleX
      const scaleX = Math.cos(p.wobble);
      ctx.scale(scaleX, 1);

      ctx.fillStyle = p.color;
      ctx.beginPath();
      const length = p.size;
      const width = p.size * 0.65;

      // Realistic leaf/petal shape
      ctx.moveTo(0, -length / 2);
      ctx.bezierCurveTo(width, -length / 4, width, length / 4, 0, length / 2);
      ctx.bezierCurveTo(-width, length / 4, -width, -length / 4, 0, -length / 2);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      if (isTabVisible && canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];

          p.y += p.speedY;
          p.wobble += p.wobbleSpeed;
          p.x += p.speedX + Math.sin(p.wobble) * 0.7;
          p.rotation += p.rotSpeed;

          // Recycle petal when it moves past bottom or sides
          if (p.y > canvas.height + 20) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -20) p.x = canvas.width + 10;
          if (p.x > canvas.width + 20) p.x = -10;

          drawPetal(p);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
