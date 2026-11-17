'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface IntroGateProps {
  onOpen: () => void;
}

export default function IntroGate({ onOpen }: IntroGateProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Lock body scroll on mount
    document.body.classList.add('scroll-locked');
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, []);

  const handleTap = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpen();
    // Remove from DOM after transition completes (1200ms)
    setTimeout(() => {
      setIsRemoved(true);
      document.body.classList.remove('scroll-locked');
    }, prefersReduced ? 100 : 1200);
  };

  if (isRemoved) return null;

  return (
    <AnimatePresence>
      {!isRemoved && (
        <motion.div
          key="intro-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpening ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReduced ? 0.2 : 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={handleTap}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTap();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Tap to open the wedding invitation"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden touch-manipulation"
          style={{ backgroundColor: '#e9b5bd' }}
        >
          {/* Dense overlapping rose wall pattern background */}
          <div className="absolute inset-0 pointer-events-none opacity-90 overflow-hidden">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 400 800"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="roseGrad1" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#f7d2d6" />
                  <stop offset="60%" stopColor="#e49aa8" />
                  <stop offset="100%" stopColor="#d98494" />
                </radialGradient>
                <radialGradient id="roseGrad2" cx="45%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="30%" stopColor="#f0b9c2" />
                  <stop offset="85%" stopColor="#e49aa8" />
                  <stop offset="100%" stopColor="#bf6c7c" />
                </radialGradient>
                <radialGradient id="roseGrad3" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#f7d2d6" />
                  <stop offset="50%" stopColor="#d98494" />
                  <stop offset="100%" stopColor="#aa5264" />
                </radialGradient>
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background tonal field */}
              <rect width="100%" height="100%" fill="#e9b5bd" />

              {/* Grid of organic overlapping roses across the screen */}
              {Array.from({ length: 48 }).map((_, idx) => {
                const col = idx % 6;
                const row = Math.floor(idx / 6);
                const cx = (col * 70) + (row % 2 === 0 ? 0 : 35) + 15;
                const cy = (row * 105) + 20;
                const size = 38 + ((idx * 7) % 22);
                const rot = (idx * 53) % 360;
                const gradId = idx % 3 === 0 ? 'roseGrad1' : idx % 3 === 1 ? 'roseGrad2' : 'roseGrad3';

                return (
                  <g
                    key={idx}
                    transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${size / 50})`}
                    opacity="0.85"
                  >
                    {/* Outer petals */}
                    <path
                      d="M 0 -35 C 20 -35, 35 -20, 35 0 C 35 20, 20 35, 0 35 C -20 35, -35 20, -35 0 C -35 -20, -20 -35, 0 -35 Z"
                      fill={`url(#${gradId})`}
                      stroke="#fff"
                      strokeWidth="0.8"
                      strokeOpacity="0.4"
                    />
                    {/* Mid petals */}
                    <path
                      d="M -15 -25 C 0 -32, 25 -20, 20 5 C 15 25, -15 22, -22 5 C -25 -10, -10 -22, -15 -25 Z"
                      fill={`url(#${gradId})`}
                      opacity="0.9"
                      stroke="#fff"
                      strokeWidth="0.6"
                      strokeOpacity="0.5"
                    />
                    <path
                      d="M 12 -18 C 24 -5, 18 18, 0 20 C -18 18, -15 -10, 5 -15 Z"
                      fill="#fcebee"
                      opacity="0.8"
                    />
                    {/* Inner spiral bud */}
                    <path
                      d="M -5 -6 C 5 -12, 10 0, 4 8 C -4 10, -8 0, 0 -4 Z"
                      fill="#ba5c6e"
                      opacity="0.75"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Satin Bow Seal */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: prefersReduced ? 1 : 0.9, opacity: 0 }}
              animate={
                isOpening
                  ? {
                      scale: prefersReduced ? 1 : 1.8,
                      opacity: 0,
                      transition: { duration: prefersReduced ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] },
                    }
                  : {
                      scale: [1, 1.04, 1],
                      opacity: 1,
                      transition: {
                        scale: {
                          repeat: Infinity,
                          duration: 3,
                          ease: 'easeInOut',
                        },
                        opacity: { duration: 1.2 },
                      },
                    }
              }
              className="relative w-[210px] h-[210px] flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(138,85,96,0.35)]"
            >
              {/* Handcrafted Satin Bow SVG */}
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_16px_32px_rgba(138,85,96,0.4)]"
              >
                <defs>
                  <linearGradient id="satinGrad" x1="20" y1="20" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="20%" stopColor="#fdf2f4" />
                    <stop offset="55%" stopColor="#f5c7cf" />
                    <stop offset="85%" stopColor="#e399a5" />
                    <stop offset="100%" stopColor="#d17f8e" />
                  </linearGradient>
                  <linearGradient id="foldShadow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#b35a6b" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#b35a6b" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="knotGlow" cx="45%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#fbe6ea" />
                    <stop offset="85%" stopColor="#e197a4" />
                    <stop offset="100%" stopColor="#bd6475" />
                  </radialGradient>
                </defs>

                {/* Left Ribbon Tail */}
                <path
                  d="M 103 118 C 94 150, 75 182, 58 210 C 74 199, 88 199, 96 206 C 103 178, 108 148, 110 120 Z"
                  fill="url(#satinGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <path
                  d="M 103 124 C 95 155, 78 185, 66 206"
                  stroke="url(#foldShadow)"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Right Ribbon Tail */}
                <path
                  d="M 117 118 C 126 150, 145 182, 162 210 C 146 199, 132 199, 124 206 C 117 178, 112 148, 110 120 Z"
                  fill="url(#satinGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <path
                  d="M 117 124 C 125 155, 142 185, 154 206"
                  stroke="url(#foldShadow)"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Left Loop of Bow */}
                <path
                  d="M 110 105 C 76 56, 16 54, 14 96 C 12 134, 72 128, 106 113 C 98 94, 94 78, 110 105 Z"
                  fill="url(#satinGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                />
                {/* Left Inner Crease / Shading */}
                <path
                  d="M 105 108 C 72 101, 38 98, 32 88 C 42 68, 80 72, 104 102"
                  stroke="url(#foldShadow)"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M 105 106 C 72 99, 40 96, 34 88"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  fill="none"
                />

                {/* Right Loop of Bow */}
                <path
                  d="M 110 105 C 144 56, 204 54, 206 96 C 208 134, 148 128, 114 113 C 122 94, 126 78, 110 105 Z"
                  fill="url(#satinGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                />
                {/* Right Inner Crease / Shading */}
                <path
                  d="M 115 108 C 148 101, 182 98, 188 88 C 178 68, 140 72, 116 102"
                  stroke="url(#foldShadow)"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M 115 106 C 148 99, 180 96, 186 88"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  fill="none"
                />

                {/* Center Knot (Round Knot with Highlights) */}
                <ellipse
                  cx="110"
                  cy="108"
                  rx="18"
                  ry="20"
                  fill="url(#knotGlow)"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                />
                <path
                  d="M 100 100 C 105 94, 115 94, 120 100"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* "Tap to open" text below bow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -8 : 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 flex flex-col items-center gap-1.5"
            >
              <p className="text-white font-serif italic text-2xl tracking-widest text-center font-medium drop-shadow-[0_2px_12px_rgba(110,45,58,0.85)]">
                Tap to open
              </p>
              <div className="w-8 h-[1px] bg-white/70 shadow-sm" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
