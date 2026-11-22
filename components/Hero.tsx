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
          y: 35,
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
      {/* Falling Jasmine & Rose Petals Canvas */}
      <PetalCanvas />

      {/* Top Details & Monogram */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-[480px] w-full">
        {/* Monogram Crest "S&D" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isGateOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: prefersReduced ? 0 : 0.1 }}
          className="w-16 h-16 rounded-full border border-rose/80 flex items-center justify-center bg-card/90 shadow-[0_4px_20px_rgba(197,160,89,0.25)] backdrop-blur-sm mb-4"
        >
          <span className="font-script text-2xl text-ink tracking-wide font-medium">
            {weddingConfig.couple.monogram}
          </span>
        </motion.div>

        {/* Small uppercase label */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={isGateOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, delay: prefersReduced ? 0 : 0.2 }}
          className="label-small mb-3 text-soft tracking-[0.2em]"
        >
          TOGETHER WITH THEIR FAMILIES
        </motion.p>

        {/* Names Stacked: Shilpi & Deepak */}
        <div className="flex flex-col items-center my-1">
          {/* Bride Name First */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={isGateOpened ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: prefersReduced ? 0.3 : 0.9, delay: prefersReduced ? 0 : 0.35, ease: easeBezier }}
              className="font-script text-[64px] sm:text-[76px] leading-[0.95] text-ink"
            >
              {weddingConfig.couple.brideShort}
            </motion.h1>
          </div>

          {/* "with" */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isGateOpened ? { opacity: 0.85 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: prefersReduced ? 0 : 0.5 }}
            className="font-serif italic text-base text-rose my-[-2px]"
          >
            with
          </motion.span>

          {/* Groom Name */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={isGateOpened ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: prefersReduced ? 0.3 : 0.9, delay: prefersReduced ? 0 : 0.6, ease: easeBezier }}
              className="font-script text-[64px] sm:text-[76px] leading-[0.95] text-ink"
            >
              {weddingConfig.couple.groomShort}
            </motion.h1>
          </div>
        </div>

        {/* Label: ARE GETTING MARRIED */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={isGateOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, delay: prefersReduced ? 0 : 0.75 }}
          className="label-small mt-3 mb-1 text-soft tracking-[0.2em]"
        >
          ARE GETTING MARRIED
        </motion.p>

        {/* Date: 12 · 12 · 2026 */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isGateOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: prefersReduced ? 0 : 0.9 }}
          className="font-serif text-2xl text-ink tracking-wide mt-1 font-normal"
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
          <div className="relative w-full h-full arch-hero overflow-hidden border border-rose/60 shadow-[0_12px_40px_rgba(31,58,61,0.18)] bg-card/70">
            <Image
              src="/img/arch.webp"
              alt="Shilpi and Deepak Royal Peacock Wedding Arch"
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
          <div className="w-full h-full arch-hero flex items-center justify-center p-4 border border-line bg-card/80">
            <span className="font-serif italic text-soft">Shilpi & Deepak</span>
          </div>
        )}
      </motion.div>
    </section>
  );
}
