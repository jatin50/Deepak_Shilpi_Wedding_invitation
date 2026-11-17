'use client';

import React from 'react';
import { weddingConfig } from '@/config/invite';

export default function Footer() {
  return (
    <footer className="w-full bg-card py-16 px-4 flex flex-col items-center text-center pb-[calc(4rem+env(safe-area-inset-bottom))]">
      <div className="max-w-[420px] w-full flex flex-col items-center">
        {/* Small roses-line divider */}
        <div className="w-full flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] flex-1 max-w-[80px] bg-line" />
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-rose opacity-80"
          >
            {/* Center Rose */}
            <circle cx="12" cy="9" r="4.5" fill="currentColor" opacity="0.8" />
            <circle cx="11" cy="8" r="2.5" fill="#fff" opacity="0.5" />
            {/* Leaves */}
            <path d="M 6 9 C 8 7, 10 9, 7 11 Z" fill="var(--color-sage)" opacity="0.85" />
            <path d="M 18 9 C 16 7, 14 9, 17 11 Z" fill="var(--color-sage)" opacity="0.85" />
          </svg>
          <div className="h-[1px] flex-1 max-w-[80px] bg-line" />
        </div>

        {/* Script text: Deepak & Shilpi */}
        <h3 className="font-script text-[42px] sm:text-[48px] text-ink leading-tight mb-2">
          {weddingConfig.couple.groomShort} & {weddingConfig.couple.brideShort}
        </h3>

        {/* Italic line: "Your presence is the only gift we are hoping for." */}
        <p className="font-serif italic text-[17px] sm:text-[18px] text-soft max-w-[320px]">
          Your presence is the only gift we are hoping for.
        </p>
      </div>
    </footer>
  );
}
