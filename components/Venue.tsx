'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { weddingConfig } from '@/config/invite';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const VENUE_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAARABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQGA//EACgQAAEEAQICCwAAAAAAAAAAAAEAAgMRBAUhEsETIjEyM0Fhc4Ohsv/EABYBAQEBAAAAAAAAAAAAAAAAAAQCA//EABkRAAIDAQAAAAAAAAAAAAAAAAABAgMxMv/aAAwDAQACEQMRAD8An8TQRjzznLYMiBsZPm03Y7Ejq2lNxXRyYwldBICesL4fSwquLop3mNkxDq3ret0y1zG5LI+KxdBp5fSNGyWsQ61gvpXhn2W8lvP3vkP5QhZrkt9H/9k=';

export default function Venue() {
  const prefersReduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (prefersReduced || hasEntered) return;
    const node = frameRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      return;
    }

    let cleanupTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsAnimating(true);
          setHasEntered(true);
          observer.disconnect();
          cleanupTimer = setTimeout(() => {
            setIsAnimating(false);
          }, 2700);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (cleanupTimer) clearTimeout(cleanupTimer);
    };
  }, [prefersReduced, hasEntered]);

  const isVisible = prefersReduced || hasEntered;

  return (
    <section className="relative w-full py-16 px-4 bg-card flex flex-col items-center text-center">
      <div className="max-w-[520px] w-full flex flex-col items-center">
        {/* 1. Small Label */}
        <span className="label-small tracking-[0.14em] text-soft mb-2">
          THE WEDDING AT
        </span>

        {/* 2. Section Title */}
        <h2 className="font-script text-[46px] text-ink leading-tight">
          The Venue
        </h2>

        {/* 3. Real Venue Photo inside Arch Frame */}
        <div className="venue-arch-wrap">
          <div
            ref={frameRef}
            className="venue-arch-frame"
            style={{
              opacity: isVisible ? 1 : 0,
            }}
          >
            <Image
              src={weddingConfig.venue.photo}
              alt="Kawatra's Elegance banquet entrance lit up at night with flowers and a carved jali tower"
              width={620}
              height={663}
              sizes="(max-width: 520px) 82vw, 300px"
              loading="lazy"
              placeholder="blur"
              blurDataURL={VENUE_BLUR_DATA_URL}
              className="venue-arch-img"
              style={{
                transform: isVisible ? 'scale(1)' : 'scale(1.18)',
                willChange: isAnimating && !prefersReduced ? 'transform' : 'auto',
              }}
              onTransitionEnd={(e) => {
                if (e.propertyName === 'transform') {
                  setIsAnimating(false);
                }
              }}
            />
          </div>
        </div>

        {/* 4. Venue Name in Pinyon Script (40px) */}
        <motion.h3
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.8, delay: prefersReduced ? 0 : 0.2 }}
          className="font-script text-[40px] text-ink leading-tight mb-2"
        >
          {weddingConfig.venue.name}
        </motion.h3>

        {/* 5. Address Line */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.8, delay: prefersReduced ? 0 : 0.3 }}
          className="font-serif text-[17px] sm:text-[18px] text-soft leading-relaxed max-w-[360px] mb-6"
        >
          {weddingConfig.venue.address}
        </motion.p>

        {/* 6. Outlined Pill Button "OPEN IN MAPS" */}
        <motion.a
          href={weddingConfig.venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.6, delay: prefersReduced ? 0 : 0.4 }}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-ink text-ink font-serif text-[15px] tracking-tracked hover:bg-wash active:bg-wash/80 transition-colors duration-[250ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 mb-10"
        >
          <MapPin className="w-4 h-4 text-ink" />
          <span>OPEN IN MAPS</span>
        </motion.a>

        {/* Function Locations Quick Guide */}
        <div className="w-full pt-6 border-t border-line/70 flex flex-col gap-3">
          <span className="label-small text-[12px] text-soft">ALL FUNCTION LOCATIONS</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left">
            {weddingConfig.venue.allVenues.slice(1).map((loc) => (
              <a
                key={loc.name}
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-line bg-card/80 hover:bg-wash/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-serif font-medium text-ink text-[15px]">{loc.name}</p>
                  <p className="font-serif italic text-soft text-[13px]">{loc.purpose}</p>
                </div>
                <Navigation className="w-4 h-4 text-soft shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
