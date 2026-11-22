'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, CalendarPlus, Clock } from 'lucide-react';
import { weddingConfig, WeddingEvent } from '@/config/invite';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getGoogleCalendarUrl } from '@/lib/calendar';

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const googleCalUrl = getGoogleCalendarUrl(
    event,
    `${weddingConfig.couple.groomShort} & ${weddingConfig.couple.brideShort}`
  );

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: prefersReduced ? 0 : 0.7, delay: prefersReduced ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[460px] bg-card stationery-card rounded-2xl p-6 sm:p-8 shadow-rose-subtle my-5 flex flex-col items-center text-center border border-line/80"
    >
      {/* Top Ceremony Counter Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-wash/50 border border-line/70 mb-4">
        <span className="label-small text-[11px] sm:text-[12px] text-ink font-semibold tracking-[0.18em]">
          CEREMONY 0{index + 1}
        </span>
        <span className="text-line text-xs">·</span>
        <span className="label-small text-[11px] sm:text-[12px] text-soft">
          {event.dayLabel.split(' · ')[0]}
        </span>
      </div>

      {/* Prominent Watercolor Illustration (210px on mobile, 240px on desktop) */}
      <div className="relative w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] rounded-[36px] overflow-hidden border border-line/80 bg-gradient-to-b from-[#fffaf7] via-card to-wash/40 shadow-[0_10px_28px_-6px_rgba(217,160,168,0.22)] mb-5 group">
        {!imgError ? (
          <Image
            src={event.iconSrc}
            alt={event.name}
            fill
            className="object-contain p-2.5 sm:p-3 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 520px) 210px, 240px"
            priority={index === 0}
            loading={index === 0 ? undefined : 'lazy'}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <svg
              width="80"
              height="80"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-rose opacity-80"
            >
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
              <path
                d="M 32 18 C 38 18, 44 24, 42 32 C 40 40, 32 44, 26 40 C 20 36, 20 28, 26 22 C 30 18, 34 22, 36 26"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Ceremony Name in Pinyon Script */}
      <h3 className="font-script text-[42px] sm:text-[48px] leading-[1.05] text-ink mb-2">
        {event.name}
      </h3>

      {/* Ceremony Meaning & Warm Storytelling Description */}
      {event.description && (
        <p className="font-serif italic text-soft text-[15.5px] sm:text-[16.5px] leading-relaxed max-w-[360px] mb-4">
          {event.description}
        </p>
      )}

      {/* Date & Time Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-wash/45 border border-line/70 text-ink font-serif text-[15.5px] sm:text-[16.5px] font-medium mb-2.5">
        <Clock className="w-4 h-4 text-soft shrink-0" />
        <span>{event.time}</span>
      </div>

      {/* Full Date Line */}
      <p className="label-small text-[12px] sm:text-[13px] text-soft tracking-[0.16em] mb-2">
        {event.dayLabel}
      </p>

      {/* Venue line */}
      <div className="flex items-center justify-center gap-1.5 text-soft font-serif text-[15px] sm:text-[16px] mb-4 max-w-[340px]">
        <MapPin className="w-3.5 h-3.5 text-rose shrink-0" />
        <span>{event.venue}</span>
      </div>

      {/* Action Buttons: View on Map & 1-Click Add to Calendar */}
      <div className="flex items-center justify-center gap-2.5 flex-wrap pt-2 border-t border-line/60 w-full">
        {event.mapUrl && (
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-ink/70 text-ink font-serif text-[13px] tracking-tracked hover:bg-wash active:bg-wash/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <MapPin className="w-3 h-3 text-ink" />
            <span>VIEW ON MAP</span>
          </a>
        )}

        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-line text-soft hover:text-ink hover:border-ink/70 font-serif text-[13px] tracking-tracked hover:bg-wash/50 active:bg-wash transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <CalendarPlus className="w-3 h-3 text-soft" />
          <span>ADD TO CALENDAR</span>
        </a>
      </div>
    </motion.div>
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

      {/* Vertical Sequence of Luxury Event Cards */}
      <div className="w-full flex flex-col items-center">
        {weddingConfig.events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </section>
  );
}
