'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { weddingConfig, WeddingEvent } from '@/config/invite';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const el = cardRef.current;
    const iconEl = iconRef.current;
    if (!el) return;

    // Scroll-scrubbed crossfade:
    // Starts at opacity 0, blur 8px, y: 16px.
    // Animates to sharp full opacity as it reaches middle of screen.
    // Fades back out as it scrolls past screen top.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: 0.6,
      },
    });

    // Enter phase: blur 8px -> 0px, opacity 0 -> 1, y 16 -> 0
    tl.fromTo(
      el,
      { opacity: 0, filter: 'blur(8px)', y: 16 },
      { opacity: 1, filter: 'blur(0px)', y: 0, ease: 'power2.out', duration: 1 }
    );

    // Mid sustain
    tl.to(el, { opacity: 1, filter: 'blur(0px)', duration: 0.8 });

    // Exit phase: softly blurs and fades back out as next arrives
    tl.to(el, {
      opacity: 0.2,
      filter: 'blur(5px)',
      y: -12,
      ease: 'power2.in',
      duration: 1,
    });

    // Icon slight 3-degree rotation as it enters
    if (iconEl) {
      gsap.fromTo(
        iconEl,
        { rotation: -3 },
        {
          rotation: 3,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'center 40%',
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, [prefersReduced]);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center text-center my-10 px-4 w-full max-w-[440px] will-change-transform"
      style={prefersReduced ? { opacity: 1, filter: 'none', transform: 'none' } : {}}
    >
      {/* Event Watercolor Icon (~120px) */}
      <div
        ref={iconRef}
        className="relative w-[120px] h-[120px] mb-4 flex items-center justify-center will-change-transform"
      >
        {!imgError ? (
          <div className="relative w-full h-full rounded-full overflow-hidden border border-line/50 shadow-rose-subtle bg-card/60">
            <Image
              src={event.iconSrc}
              alt={event.name}
              fill
              className="object-contain p-2"
              sizes="120px"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          /* Rose-shaped SVG fallback */
          <div className="w-[110px] h-[110px] rounded-full border border-line flex items-center justify-center bg-card shadow-rose-subtle">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="28" stroke="var(--color-rose)" strokeWidth="1" strokeDasharray="3 3" />
              <path
                d="M 32 18 C 38 18, 44 24, 42 32 C 40 40, 32 44, 26 40 C 20 36, 20 28, 26 22 C 30 18, 34 22, 36 26"
                stroke="var(--color-rose)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 28 28 C 30 26, 34 26, 34 30 C 34 34, 30 34, 29 32"
                stroke="var(--color-soft)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Event Name in Pinyon Script (44px) */}
      <h3 className="font-script text-[42px] sm:text-[46px] leading-[1.05] text-ink mb-2">
        {event.name}
      </h3>

      {/* Day label and Date */}
      <p className="label-small text-[12px] sm:text-[13px] text-soft tracking-[0.16em] mb-1">
        {event.dayLabel}
      </p>

      {/* Time */}
      <p className="font-serif text-[18px] sm:text-[19px] text-ink font-medium mb-1">
        {event.time}
      </p>

      {/* Venue line */}
      <p className="font-serif italic text-[16px] text-soft mb-2">
        {event.venue}
      </p>

      {/* Optional map direction link for this venue */}
      {event.mapUrl && (
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[13px] font-serif text-ink hover:text-soft underline underline-offset-4 mb-3"
        >
          <MapPin className="w-3.5 h-3.5 text-soft" />
          <span>View on Map</span>
        </a>
      )}

      {/* 60px hairline divider */}
      <div className="w-[60px] h-[1px] bg-line/80 mx-auto mt-4 mb-2" />
    </div>
  );
}

export default function Celebrations() {
  return (
    <section className="relative w-full py-16 px-4 bg-bg flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <span className="label-small tracking-[0.2em] mb-2">JOIN US FOR</span>
        <h2 className="font-script text-5xl sm:text-6xl text-ink">
          The Celebrations
        </h2>
      </div>

      {/* Vertical Sequence of Events */}
      <div className="w-full flex flex-col items-center">
        {weddingConfig.events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </section>
  );
}
