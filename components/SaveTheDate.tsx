'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/config/invite';
import { getCalendarGrid } from '@/lib/date';
import { useCountdown } from '@/hooks/useCountdown';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function FlipDigit({ value, label }: { value: string; label: string }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-3 px-1 border border-line bg-card/90 shadow-sm min-w-0">
      <div className="relative h-9 w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={prefersReduced ? { opacity: 0 } : { y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { y: -16, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[28px] sm:text-[30px] font-medium text-ink leading-none tabular-nums"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="label-small text-[11px] sm:text-[12px] tracking-[0.16em] text-soft mt-1">
        {label}
      </span>
    </div>
  );
}

export default function SaveTheDate() {
  const prefersReduced = useReducedMotion();
  const countdown = useCountdown(weddingConfig.weddingStart);

  const { year, month, day, monthName } = weddingConfig.calendarTarget;

  // Computed dynamically from date, not hardcoded!
  const calendar = useMemo(() => {
    return getCalendarGrid(year, month, monthName);
  }, [year, month, monthName]);

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="w-full max-w-[460px] mx-auto px-4 pb-16 flex flex-col items-center bg-card">
      {/* Square-cornered stationery calendar box */}
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full stationery-card p-6 sm:p-7 select-none"
      >
        {/* Month Header */}
        <h3 className="text-center font-serif text-[15px] sm:text-[16px] tracking-wide text-ink font-semibold mb-6">
          {calendar.monthName}
        </h3>

        {/* 7-column Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-3 sm:gap-y-4 text-center">
          {/* Day of week headers */}
          {daysOfWeek.map((d, i) => (
            <div key={i} className="label-small text-[13px] text-soft font-semibold">
              {d}
            </div>
          ))}

          {/* Month day numbers */}
          {calendar.weeks.map((week, wIdx) =>
            week.map((dateNum, dIdx) => {
              if (dateNum === null) {
                return <div key={`${wIdx}-${dIdx}`} className="h-9 w-9" />;
              }

              const isTargetDay = dateNum === day;

              return (
                <div
                  key={`${wIdx}-${dIdx}`}
                  className="relative h-9 w-9 mx-auto flex items-center justify-center font-serif text-[17px] text-ink"
                >
                  {isTargetDay ? (
                    <div className="relative flex items-center justify-center w-full h-full">
                      {/* Hand-drawn looking circle with wash fill and self-drawing ink outline */}
                      <svg
                        className="absolute inset-[-4px] w-[44px] h-[44px] pointer-events-none"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Soft wash fill */}
                        <motion.ellipse
                          cx="22"
                          cy="22"
                          rx="17"
                          ry="16"
                          fill="var(--color-wash)"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 0.9 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        />
                        {/* Hand-drawn organic SVG stroke with dashoffset animation */}
                        <motion.path
                          d="M 22 5 C 33 4, 40 12, 39 23 C 38 33, 31 39, 21 39 C 10 39, 4 31, 5 21 C 6 10, 14 5, 24 5 C 31 5, 38 9, 39 16"
                          stroke="var(--color-ink)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: prefersReduced ? 0.2 : 1.2, ease: 'easeInOut' }}
                        />
                      </svg>
                      <span className="relative z-10 font-bold text-ink">{dateNum}</span>
                    </div>
                  ) : (
                    <span>{dateNum}</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Countdown Section */}
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full mt-7"
      >
        {countdown.isComplete ? (
          <div className="text-center py-4">
            <p className="font-script text-4xl sm:text-5xl text-ink">
              Today is the day
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Four equal countdown boxes */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full">
              <FlipDigit value={countdown.days} label="DAYS" />
              <FlipDigit value={countdown.hours} label="HOURS" />
              <FlipDigit value={countdown.minutes} label="MINS" />
              <FlipDigit value={countdown.seconds} label="SECS" />
            </div>

            {/* Caption */}
            <p className="font-serif italic text-soft text-[17px] sm:text-[18px] mt-4 tracking-wide text-center">
              until we say “I do”
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
