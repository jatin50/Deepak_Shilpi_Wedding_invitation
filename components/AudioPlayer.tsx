'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '@/config/invite';

interface AudioPlayerProps {
  shouldStart: boolean;
}

const TARGET_VOLUME = 0.42;

export default function AudioPlayer({ shouldStart }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Create single dedicated Audio instance
    const audio = new Audio();
    audio.src = weddingConfig.music.src;
    audio.loop = true;
    audio.preload = 'auto';

    // Synchronize React state directly with native audio events
    // This handles iOS control center, lock screen, bluetooth events, etc.
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      try {
        audio.pause();
        audio.src = '';
      } catch {}
      audioRef.current = null;
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Cue playback on intro gate unlock
  useEffect(() => {
    if (shouldStart && audioRef.current) {
      const audio = audioRef.current;
      if (!audio.paused) return;

      try {
        if (audio.currentTime < 1.5 && audio.readyState >= 1) {
          audio.currentTime = 1.5;
        }
      } catch {}

      // Set target volume safely (desktop & Android support this, iOS safely ignores)
      try {
        audio.volume = TARGET_VOLUME;
      } catch {}
      audio.muted = false;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowToast(true);
            toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3200);
          })
          .catch((err) => {
            console.warn('Audio play prevented by browser policy:', err);
            setIsPlaying(false);
          });
      }
    }
  }, [shouldStart]);

  // Synchronous, bulletproof toggle for iOS Safari, Android, and Desktop
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      // 100% IMMEDIATE STOP:
      // Mute and pause synchronously inside the user gesture event handler.
      // This eliminates the iOS bug where volume-fading loops failed to pause!
      audio.muted = true;
      try {
        audio.pause();
      } catch (err) {
        console.warn('Audio pause error:', err);
      }
      setIsPlaying(false);
    } else {
      audio.muted = false;
      try {
        audio.volume = TARGET_VOLUME;
      } catch {}

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Playback error:', err);
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-40 flex items-center gap-2">
      {/* Subtle toast indicator on initial playback */}
      {showToast && (
        <div className="hidden sm:flex items-center px-3.5 py-1.5 rounded-full bg-card/95 border border-line text-ink font-serif text-[13px] shadow-rose-subtle backdrop-blur-sm animate-fade-in">
          <span>♪ Playing Wedding Flute & Sitar</span>
        </div>
      )}

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute wedding instrumental music' : 'Play wedding instrumental music'}
        title={isPlaying ? 'Mute music' : 'Play music'}
        className={`w-12 h-12 rounded-full border border-rose/80 bg-card/95 backdrop-blur-md shadow-[0_6px_22px_-4px_rgba(217,160,168,0.38)] flex items-center justify-center text-ink hover:text-soft hover:bg-wash/50 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
          isPlaying ? 'ring-2 ring-rose/50' : ''
        }`}
      >
        {isPlaying ? (
          <div className="flex items-end justify-center gap-[2.5px] h-4">
            {/* Equalizer audio wave animation */}
            <span className="w-[2.5px] h-2.5 bg-ink rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-[2.5px] h-4 bg-ink rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.15s]" />
            <span className="w-[2.5px] h-3 bg-ink rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.3s]" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-soft" />
        )}
      </button>
    </div>
  );
}
