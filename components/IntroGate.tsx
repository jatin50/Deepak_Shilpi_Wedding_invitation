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
          style={{ backgroundColor: '#21494e' }}
        >
          {/* Dense overlapping emerald & sage floral wall pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-90 overflow-hidden">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 400 800"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="sageGrad1" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#e3f2ee" />
                  <stop offset="60%" stopColor="#8fae9b" />
                  <stop offset="100%" stopColor="#437175" />
                </radialGradient>
                <radialGradient id="sageGrad2" cx="45%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="30%" stopColor="#d5ece5" />
                  <stop offset="85%" stopColor="#76a89e" />
                  <stop offset="100%" stopColor="#2c5a60" />
                </radialGradient>
                <radialGradient id="sageGrad3" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#e3f2ee" />
                  <stop offset="50%" stopColor="#5d8e8a" />
                  <stop offset="100%" stopColor="#1e4448" />
                </radialGradient>
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background tonal field */}
              <rect width="100%" height="100%" fill="#21494e" />

              {/* Grid of organic overlapping roses across the screen */}
              {Array.from({ length: 48 }).map((_, idx) => {
                const col = idx % 6;
                const row = Math.floor(idx / 6);
                const cx = col * 70 + (row % 2 === 0 ? 0 : 35) + 15;
                const cy = row * 105 + 20;
                const size = 38 + ((idx * 7) % 22);
                const rot = (idx * 53) % 360;
                const gradId = idx % 3 === 0 ? 'sageGrad1' : idx % 3 === 1 ? 'sageGrad2' : 'sageGrad3';

                return (
                  <g
                    key={idx}
                    transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${size / 50})`}
                    opacity="0.88"
                  >
                    {/* Outer petals */}
                    <path
                      d="M 0 -35 C 20 -35, 35 -20, 35 0 C 35 20, 20 35, 0 35 C -20 35, -35 20, -35 0 C -35 -20, -20 -35, 0 -35 Z"
                      fill={`url(#${gradId})`}
                      stroke="#ffffff"
                      strokeWidth="0.8"
                      strokeOpacity="0.4"
                    />
                    {/* Mid petals */}
                    <path
                      d="M -15 -25 C 0 -32, 25 -20, 20 5 C 15 25, -15 22, -22 5 C -25 -10, -10 -22, -15 -25 Z"
                      fill={`url(#${gradId})`}
                      opacity="0.9"
                      stroke="#ffffff"
                      strokeWidth="0.6"
                      strokeOpacity="0.5"
                    />
                    <path
                      d="M 12 -18 C 24 -5, 18 18, 0 20 C -18 18, -15 -10, 5 -15 Z"
                      fill="#eaf5f2"
                      opacity="0.8"
                    />
                    {/* Inner spiral bud */}
                    <path
                      d="M -5 -6 C 5 -12, 10 0, 4 8 C -4 10, -8 0, 0 -4 Z"
                      fill="#1a3d42"
                      opacity="0.8"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Champagne Gold Satin Bow Seal */}
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
              className="relative w-[210px] h-[210px] flex items-center justify-center filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
            >
              {/* Handcrafted Golden Satin Bow SVG */}
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)]"
              >
                <defs>
                  <linearGradient id="goldSatinGrad" x1="20" y1="20" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="20%" stopColor="#fff2cf" />
                    <stop offset="55%" stopColor="#e5c16b" />
                    <stop offset="85%" stopColor="#c5a059" />
                    <stop offset="100%" stopColor="#96742d" />
                  </linearGradient>
                  <linearGradient id="foldShadowGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#735518" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#735518" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="knotGlowGold" cx="45%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#ffefc9" />
                    <stop offset="85%" stopColor="#d6ab4e" />
                    <stop offset="100%" stopColor="#96742d" />
                  </radialGradient>
                </defs>

                {/* Left Ribbon Tail */}
                <path
                  d="M 103 118 C 94 150, 75 182, 58 210 C 74 199, 88 199, 96 206 C 103 178, 108 148, 110 120 Z"
                  fill="url(#goldSatinGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <path
                  d="M 103 124 C 95 155, 78 185, 66 206"
                  stroke="url(#foldShadowGold)"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Right Ribbon Tail */}
                <path
                  d="M 117 118 C 126 150, 145 182, 162 210 C 146 199, 132 199, 124 206 C 117 178, 112 148, 110 120 Z"
                  fill="url(#goldSatinGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <path
                  d="M 117 124 C 125 155, 142 185, 154 206"
                  stroke="url(#foldShadowGold)"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Left Loop of Bow */}
                <path
                  d="M 110 105 C 76 56, 16 54, 14 96 C 12 134, 72 128, 106 113 C 98 94, 94 78, 110 105 Z"
                  fill="url(#goldSatinGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                />
                <path
                  d="M 105 108 C 72 101, 38 98, 32 88 C 42 68, 80 72, 104 102"
                  stroke="url(#foldShadowGold)"
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
                  fill="url(#goldSatinGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                />
                <path
                  d="M 115 108 C 148 101, 182 98, 188 88 C 178 68, 140 72, 116 102"
                  stroke="url(#foldShadowGold)"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M 115 106 C 148 99, 180 96, 186 88"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  fill="none"
                />

                {/* Center Knot */}
                <ellipse
                  cx="110"
                  cy="108"
                  rx="18"
                  ry="20"
                  fill="url(#knotGlowGold)"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                />

                {/* Wax seal ring inside the knot */}
                <circle cx="110" cy="108" r="14" fill="#1b3f44" stroke="#d4af37" strokeWidth="1.2" />
                <text
                  x="110"
                  y="112"
                  textAnchor="middle"
                  fill="#ffd782"
                  fontSize="10"
                  fontFamily="var(--font-cormorant), Georgia, serif"
                  fontWeight="600"
                  letterSpacing="1"
                >
                  D&S
                </text>
              </svg>
            </motion.div>

            {/* Instruction Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                isOpening
                  ? { opacity: 0, y: -10, transition: { duration: 0.3 } }
                  : { opacity: 1, y: 0, transition: { delay: prefersReduced ? 0 : 0.8, duration: 0.6 } }
              }
              className="mt-6 flex flex-col items-center"
            >
              <div className="px-5 py-2 rounded-full border border-line/60 bg-card/90 shadow-[0_8px_20px_rgba(0,0,0,0.3)] backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose animate-ping" />
                <span className="label-small text-[12.5px] tracking-[0.18em] text-ink font-semibold">
                  TAP TO OPEN
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
