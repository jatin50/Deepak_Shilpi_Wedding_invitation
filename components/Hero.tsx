'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PetalCanvas from './PetalCanvas';
import { weddingConfig } from '@/config/invite';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroProps {
  isGateOpened: boolean;
}

export default function Hero({ isGateOpened }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      if (archRef.current && heroRef.current) {
        gsap.to(archRef.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const easeBezier = [0.2, 0.7, 0.2, 1];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-between pt-10 pb-6 px-4 bg-gradient-to-b from-card via-card to-wash overflow-hidden select-none"
    >
      {/* Falling Rose Petals Canvas */}
      <PetalCanvas />

      {/* Top Details & Monogram */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-[480px] w-full">
        {/* Monogram Crest "D&S" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isGateOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: prefersReduced ? 0 : 0.1 }}
          className="w-16 h-16 rounded-full border border-soft flex items-center justify-center bg-card/80 shadow-rose-subtle backdrop-blur-sm mb-4"
        >
          <span className="font-script text-2xl text-ink tracking-wide">
            {weddingConfig.couple.monogram}
          </span>
        </motion.div>

        {/* Small uppercase label */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={isGateOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, delay: prefersReduced ? 0 : 0.2 }}
          className="label-small mb-3"
        >
          TOGETHER WITH THEIR FAMILIES
        </motion.p>

        {/* Names Stacked with Left-to-Right Clip-Path Mask Reveal */}
        <div className="flex flex-col items-center my-1">
          {/* Groom Name */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={isGateOpened ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: prefersReduced ? 0.3 : 0.9, delay: prefersReduced ? 0 : 0.35, ease: easeBezier }}
              className="font-script text-[64px] sm:text-[76px] leading-[0.95] text-ink"
            >
              {weddingConfig.couple.groomShort}
            </motion.h1>
          </div>

          {/* "and" */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isGateOpened ? { opacity: 0.75 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: prefersReduced ? 0 : 0.5 }}
            className="font-serif italic text-base text-soft my-[-2px]"
          >
            and
          </motion.span>

          {/* Bride Name */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={isGateOpened ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: prefersReduced ? 0.3 : 0.9, delay: prefersReduced ? 0 : 0.6, ease: easeBezier }}
              className="font-script text-[64px] sm:text-[76px] leading-[0.95] text-ink"
            >
              {weddingConfig.couple.brideShort}
            </motion.h1>
          </div>
        </div>

        {/* Label: ARE GETTING MARRIED */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={isGateOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, delay: prefersReduced ? 0 : 0.75 }}
          className="label-small mt-3 mb-1"
        >
          ARE GETTING MARRIED
        </motion.p>

        {/* Date: 12 · 12 · 2026 */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isGateOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: prefersReduced ? 0 : 0.9 }}
          className="font-serif text-2xl text-ink tracking-wide mt-1"
        >
          12 · 12 · 2026
        </motion.p>
      </div>

      {/* Tall Arched Illustration with GSAP Parallax */}
      <motion.div
        ref={archRef}
        initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
        animate={isGateOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 24 }}
        transition={{ duration: prefersReduced ? 0.3 : 1.4, delay: prefersReduced ? 0 : 1.05 }}
        className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] h-[360px] sm:h-[400px] mt-4 mb-2 flex items-center justify-center will-change-transform"
      >
        {!imgError ? (
          <div className="relative w-full h-full arch-hero overflow-hidden border border-line/70 shadow-rose-glow bg-card/60">
            <Image
              src="/img/arch.webp"
              alt="Deepak and Shilpi Wedding Floral Archway"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 520px) 100vw, 380px"
              onError={() => setImgError(true)}
            />
            {/* Subtle inner highlight overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-wash/40 via-transparent to-transparent" />
          </div>
        ) : (
          /* SVG Arch Outline Fallback: Three nested arches in blush/peach with roses and sage leaves */
          <div className="w-full h-full arch-hero flex items-center justify-center p-4 border border-line bg-card/80">
            <svg
              viewBox="0 0 300 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Nested Arches */}
              <path
                d="M 20 380 V 160 C 20 75, 75 20, 150 20 C 225 20, 280 75, 280 160 V 380"
                stroke="var(--color-rose)"
                strokeWidth="1.5"
                opacity="0.75"
              />
              <path
                d="M 35 380 V 165 C 35 90, 85 40, 150 40 C 215 40, 265 90, 265 165 V 380"
                stroke="var(--color-line)"
                strokeWidth="1"
              />
              <path
                d="M 50 380 V 170 C 50 105, 95 60, 150 60 C 205 60, 250 105, 250 170 V 380"
                stroke="var(--color-rose)"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />

              {/* Decorative Floral Garland along curve */}
              {[-60, -35, -15, 0, 15, 35, 60].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const cx = 150 + 130 * Math.sin(rad);
                const cy = 160 - 130 * Math.cos(rad);
                return (
                  <g key={i} transform={`translate(${cx}, ${cy})`}>
                    {/* Sage leaf */}
                    <path
                      d="M -6 4 C -12 2, -14 -6, -4 -8 C 4 -10, 8 -2, 6 6 Z"
                      fill="var(--color-sage)"
                      opacity="0.7"
                    />
                    {/* Blush Rose */}
                    <circle cx="0" cy="0" r="7" fill="var(--color-rose)" opacity="0.9" />
                    <circle cx="-1" cy="-1" r="4" fill="#ffffff" opacity="0.4" />
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </motion.div>

      {/* Scroll indicator with pulsing line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isGateOpened ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: prefersReduced ? 0 : 1.3 }}
        className="relative z-20 flex flex-col items-center mt-auto"
      >
        <span className="label-small text-[12px] tracking-[0.25em] text-soft">SCROLL</span>
        <div className="w-[1px] h-6 bg-line overflow-hidden mt-1.5 relative">
          <div className="w-full h-full bg-ink/70 animate-pulse-line origin-top" />
        </div>
      </motion.div>
    </section>
  );
}
