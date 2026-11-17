'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '@/config/invite';

interface AudioPlayerProps {
  shouldStart: boolean;
}

const TARGET_VOLUME = 0.48;

export default function AudioPlayer({ shouldStart }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeIn = (audio: HTMLAudioElement) => {
    clearFade();
    audio.volume = 0;
    const step = TARGET_VOLUME / 12; // ~600ms warm fade-in so flute starts promptly
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume + step >= TARGET_VOLUME) {
        audio.volume = TARGET_VOLUME;
        clearFade();
      } else {
        audio.volume = Math.min(TARGET_VOLUME, audio.volume + step);
      }
    }, 50);
  };

  const fadeOutAndPause = (audio: HTMLAudioElement) => {
    clearFade();
    const step = audio.volume / 10; // ~300ms gentle fade-out
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume - step <= 0.01) {
        audio.volume = 0;
        audio.pause();
        clearFade();
      } else {
        audio.volume = Math.max(0, audio.volume - step);
      }
    }, 30);
  };

  useEffect(() => {
    const audio = new Audio(weddingConfig.music.src);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      clearFade();
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Start playing with prompt warm fade-in after intro gate tap
  useEffect(() => {
    if (shouldStart && audioRef.current && !isPlaying) {
      const audio = audioRef.current;
      try {
        if (audio.currentTime < 1.5 && audio.readyState >= 1) {
          audio.currentTime = 1.5;
        }
      } catch {
        // Ignore seek errors before metadata loads
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeIn(audio);
        })
        .catch((err) => {
          console.warn('Audio play prevented by browser policy:', err);
        });
    }
  }, [shouldStart]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setIsPlaying(false);
      fadeOutAndPause(audio);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeIn(audio);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] z-40">
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute wedding instrumental music' : 'Play wedding instrumental music'}
        title={isPlaying ? 'Mute instrumental music' : 'Play instrumental music'}
        className="w-10 h-10 rounded-full border border-rose bg-card/90 backdrop-blur-md shadow-rose-subtle flex items-center justify-center text-ink hover:text-soft hover:bg-wash/50 transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-ink animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-soft" />
        )}
      </button>
    </div>
  );
}
