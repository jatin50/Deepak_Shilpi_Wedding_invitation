'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { weddingConfig } from '@/config/invite';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function QuoteBand() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax upward drift (0.5x speed)
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[70svh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden text-center select-none"
    >
      {/* Background Gradient & Parallax Lace Pattern */}
      <motion.div
        style={prefersReduced ? {} : { y: bgY }}
        className="absolute -inset-10 z-0 bg-gradient-to-b from-[#e8b4b4] via-[#dfa5af] to-[#d99aa3]"
      >
        {/* Seamless Lace Pattern Overlay */}
        <div
          className="w-full h-full opacity-35"
          style={{
            backgroundImage: `url('/img/lace.webp')`,
            backgroundRepeat: 'repeat',
            backgroundSize: '160px 160px',
          }}
        />

        {/* Delicate Vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
      </motion.div>

      {/* Quote Content with Soft Blur-to-Sharp Fade */}
      <div className="relative z-10 max-w-[480px] w-full flex flex-col items-center">
        {/* Line 1: Script Quote */}
        <motion.p
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)', y: 12 }}
          whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: prefersReduced ? 0.3 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-script text-[42px] sm:text-[56px] text-white leading-tight drop-shadow-[0_2px_10px_rgba(138,85,96,0.3)] mb-4"
        >
          “{weddingConfig.quote.text}”
        </motion.p>

        {/* Line 2: Monogram / Names Label */}
        <motion.span
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)', y: 8 }}
          whileInView={prefersReduced ? { opacity: 1 } : { opacity: 0.95, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: prefersReduced ? 0.3 : 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[14px] sm:text-[15px] tracking-[0.25em] uppercase text-white/95 font-medium drop-shadow-[0_1px_4px_rgba(138,85,96,0.25)]"
        >
          {weddingConfig.quote.subtext}
        </motion.span>
      </div>
    </section>
  );
}
