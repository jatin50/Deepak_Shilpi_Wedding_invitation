'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import IntroGate from '@/components/IntroGate';
import Hero from '@/components/Hero';
import Blessing from '@/components/Blessing';
import SaveTheDate from '@/components/SaveTheDate';
import Celebrations from '@/components/Celebrations';
import Venue from '@/components/Venue';
import QuoteBand from '@/components/QuoteBand';
import RSVP from '@/components/RSVP';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';

function WeddingContent() {
  const [isGateOpened, setIsGateOpened] = useState(false);
  const searchParams = useSearchParams();
  const guestName = searchParams?.get('to') || searchParams?.get('guest') || null;

  const handleOpenGate = () => {
    setIsGateOpened(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-wash/25 flex justify-center items-center">
      {/* 1. Intro Gate (Full viewport overlay with satin bow seal) */}
      <IntroGate onOpen={handleOpenGate} />

      {/* Main Luxury Invitation Container: Centered Column (max ~520px on desktop) */}
      <main className="w-full max-w-[520px] bg-bg min-h-screen relative shadow-[0_0_60px_rgba(217,160,168,0.2)] flex flex-col overflow-x-hidden border-x border-line/30">
        {/* 2. Hero Section */}
        <Hero isGateOpened={isGateOpened} />

        {/* 3. Blessing Section */}
        <Blessing guestName={guestName} />

        {/* 4. Calendar and Countdown */}
        <SaveTheDate />

        {/* 5. The Celebrations */}
        <Celebrations />

        {/* 6. The Venue */}
        <Venue />

        {/* 7. Quote Band */}
        <QuoteBand />

        {/* 8. RSVP */}
        <RSVP />

        {/* 9. Footer */}
        <Footer />
      </main>

      {/* Floating Background Music Controller */}
      <AudioPlayer shouldStart={isGateOpened} />
    </div>
  );
}

export default function WeddingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-bg">
          <span className="font-serif italic text-soft text-lg animate-pulse">
            Loading invitation...
          </span>
        </div>
      }
    >
      <WeddingContent />
    </Suspense>
  );
}
