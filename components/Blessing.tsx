'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/invite';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import GaneshaIcon from '@/components/icons/GaneshaIcon';

interface BlessingProps {
  guestName?: string | null;
}

export default function Blessing({ guestName }: BlessingProps) {
  const prefersReduced = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative w-full bg-card pt-14 pb-10 px-5 flex flex-col items-center text-center overflow-hidden">
      {/* Hanging Floral Tassels / Scalloped Garland Border in Champagne Gold & Sage */}
      <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden pointer-events-none flex justify-center z-10">
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  rotate: [-1.2, 1.2, -1.2],
                  transition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
          }
          style={{ transformOrigin: 'top center' }}
          className="w-[120%] max-w-[620px] flex justify-around"
        >
          <svg
            className="w-full h-12 text-rose"
            viewBox="0 0 500 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 0 C 30 18, 55 18, 83 0 C 113 18, 138 18, 166 0 C 196 18, 221 18, 250 0 C 279 18, 304 18, 333 0 C 363 18, 388 18, 416 0 C 446 18, 471 18, 500 0"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeOpacity="0.65"
              fill="none"
            />
            {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460].map((cx, i) => (
              <g key={i} opacity="0.75">
                <line x1={cx} y1="4" x2={cx} y2={i % 2 === 0 ? '26' : '20'} stroke="currentColor" strokeWidth="0.8" />
                <circle cx={cx} cy={i % 2 === 0 ? '28' : '22'} r="3" fill="currentColor" />
                <circle cx={cx} cy={i % 2 === 0 ? '35' : '27'} r="1.8" fill="var(--color-sage)" />
              </g>
            ))}
          </svg>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="relative z-10 max-w-[460px] w-full flex flex-col items-center"
      >
        {/* Auspicious Ganesha Invocation */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-4">
          <GaneshaIcon className="w-14 h-14 text-rose mb-1.5" />
          <p
            lang="hi"
            style={{ fontFamily: 'var(--font-devanagari), serif' }}
            className="text-[16px] sm:text-[17px] font-medium text-ink tracking-[0.05em]"
          >
            {weddingConfig.blessings.invocation}
          </p>
        </motion.div>

        {/* Guest Personalisation (?to=Name) */}
        {guestName && (
          <motion.div variants={itemVariants} className="mb-3">
            <p className="font-script text-3xl sm:text-4xl text-ink">
              Dear {guestName},
            </p>
          </motion.div>
        )}

        {/* Elders Blessing */}
        <motion.div variants={itemVariants} className="max-w-[420px] mb-3 px-2">
          <p className="font-serif italic text-[16px] sm:text-[17px] text-soft leading-relaxed">
            {weddingConfig.blessings.elders}
          </p>
        </motion.div>

        {/* "we cordially invite you to the wedding ceremony of our Loving Daughter" */}
        <motion.p
          variants={itemVariants}
          className="font-serif text-[17px] sm:text-[18px] text-ink max-w-[360px] leading-relaxed mb-4"
        >
          {weddingConfig.blessings.invitationNote}
        </motion.p>

        {/* Bride & Lineage */}
        <motion.div variants={itemVariants} className="flex flex-col items-center my-1">
          <span className="font-script text-5xl sm:text-6xl text-ink leading-[1]">
            {weddingConfig.couple.brideShort}
          </span>
          <span className="font-serif text-[14px] sm:text-[15px] text-soft mt-1">
            ({weddingConfig.couple.brideLineage})
          </span>
        </motion.div>

        {/* "with" */}
        <motion.span
          variants={itemVariants}
          className="font-serif italic text-base text-rose my-2"
        >
          with
        </motion.span>

        {/* Groom & Lineage */}
        <motion.div variants={itemVariants} className="flex flex-col items-center my-1">
          <span className="font-script text-5xl sm:text-6xl text-ink leading-[1]">
            {weddingConfig.couple.groomShort}
          </span>
          <span className="font-serif text-[14px] sm:text-[15px] text-soft mt-1">
            ({weddingConfig.couple.groomLineage})
          </span>
        </motion.div>

        {/* Save the Date Transition Heading */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center">
          <span className="label-small mb-1 text-soft tracking-[0.2em]">KINDLY</span>
          <h2 className="font-script text-4xl sm:text-5xl text-ink">
            Save the Date
          </h2>
        </motion.div>
      </motion.div>
    </section>
  );
}
