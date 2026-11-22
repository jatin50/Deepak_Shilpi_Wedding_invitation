'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Image from 'next/image';

interface IntroGateProps {
  onOpen: () => void;
}

export default function IntroGate({ onOpen }: IntroGateProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    document.body.classList.add('scroll-locked');
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, []);

  const handleTap = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpen();
    setTimeout(() => {
      setIsRemoved(true);
      document.body.classList.remove('scroll-locked');
    }, prefersReduced ? 100 : 1300);
  };

  if (isRemoved) return null;

  return (
    <AnimatePresence>
      {!isRemoved && (
        <motion.div
          key="intro-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReduced ? 0.2 : 0.8,
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
          aria-label="Tap to open the royal wedding invitation of Shilpi & Deepak"
          className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer select-none overflow-hidden touch-manipulation bg-[#14282b]"
          style={{ perspective: 1200 }}
        >
          {/* Ambient Royal Palace Hall Background behind opening doors */}
          <div className="absolute inset-0 bg-radial from-[#1e4448] via-[#102326] to-[#0a1719] opacity-95" />

          {/* Golden Radiant Seam Glow */}
          <motion.div
            animate={{
              opacity: isOpening ? [1, 0] : [0.6, 1, 0.6],
              scaleY: isOpening ? 1.5 : [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: isOpening ? 0.6 : 2.4,
              repeat: isOpening ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-y-0 w-24 left-1/2 -translate-x-1/2 pointer-events-none z-10 bg-gradient-to-r from-transparent via-[#ffd782]/70 to-transparent blur-md"
          />

          {/* Left Palace Door */}
          <motion.div
            initial={{ x: 0, rotateY: 0 }}
            animate={
              isOpening
                ? {
                    x: prefersReduced ? 0 : '-105%',
                    rotateY: prefersReduced ? 0 : -35,
                    opacity: prefersReduced ? 0 : [1, 1, 0],
                    transition: { duration: prefersReduced ? 0.2 : 1.25, ease: [0.25, 1, 0.5, 1] },
                  }
                : { x: 0, rotateY: 0 }
            }
            className="absolute left-0 top-0 bottom-0 w-1/2 z-20 overflow-hidden shadow-[15px_0_35px_rgba(0,0,0,0.65)] origin-left"
          >
            <div className="relative w-full h-full">
              <Image
                src="/img/bride-door-left.jpg"
                alt="Peacock carved palace left door"
                fill
                priority
                sizes="50vw"
                className="object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Palace Door */}
          <motion.div
            initial={{ x: 0, rotateY: 0 }}
            animate={
              isOpening
                ? {
                    x: prefersReduced ? 0 : '105%',
                    rotateY: prefersReduced ? 0 : 35,
                    opacity: prefersReduced ? 0 : [1, 1, 0],
                    transition: { duration: prefersReduced ? 0.2 : 1.25, ease: [0.25, 1, 0.5, 1] },
                  }
                : { x: 0, rotateY: 0 }
            }
            className="absolute right-0 top-0 bottom-0 w-1/2 z-20 overflow-hidden shadow-[-15px_0_35px_rgba(0,0,0,0.65)] origin-right"
          >
            <div className="relative w-full h-full">
              <Image
                src="/img/bride-door-right.jpg"
                alt="Peacock carved palace right door"
                fill
                priority
                sizes="50vw"
                className="object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Center Medallion & Royal Clasp */}
          <motion.div
            initial={{ scale: prefersReduced ? 1 : 0.95, opacity: 0 }}
            animate={
              isOpening
                ? {
                    scale: prefersReduced ? 1 : 2.4,
                    opacity: 0,
                    transition: { duration: prefersReduced ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] },
                  }
                : {
                    scale: [1, 1.04, 1],
                    opacity: 1,
                    transition: {
                      scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                      opacity: { duration: 0.6 },
                    },
                  }
            }
            className="relative z-30 flex flex-col items-center pointer-events-none px-4"
          >
            {/* Auspicious Golden Carved Lotus Seal */}
            <div className="relative flex items-center justify-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#ffe7a3] via-[#d4af37] to-[#8a681d] p-[2.5px] shadow-[0_12px_45px_rgba(212,175,55,0.6)] backdrop-blur-sm">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#183438] via-[#0d2124] to-[#071314] flex flex-col items-center justify-center border border-[#ffd782]/40 text-center px-2">
                  <span className="font-serif text-[#ffd782] text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
                    ॥ श्री गणेशाय नमः ॥
                  </span>
                  <span className="font-serif text-white text-lg sm:text-xl font-bold tracking-wider mt-0.5">
                    S & D
                  </span>
                  <span className="font-serif text-[#d6b265] text-[10px] tracking-widest uppercase mt-0.5">
                    SHUBH VIVAH
                  </span>
                </div>
              </div>
            </div>

            {/* Instruction Pill */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-6 px-5 py-2 rounded-full bg-[#0c1f21]/90 border border-[#d4af37]/60 shadow-[0_6px_25px_rgba(0,0,0,0.5)] flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#ffd782] animate-ping" />
              <span className="font-serif text-[#ffe4a0] text-xs sm:text-sm tracking-[0.22em] uppercase font-medium">
                Tap to Open
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
