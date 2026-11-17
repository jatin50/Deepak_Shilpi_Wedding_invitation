import { useState, useEffect } from 'react';

export interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isComplete: boolean;
  hasMounted: boolean;
}

export function useCountdown(targetIsoDate: string): CountdownState {
  const [state, setState] = useState<CountdownState>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isComplete: false,
    hasMounted: false,
  });

  useEffect(() => {
    const targetTime = new Date(targetIsoDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setState({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          isComplete: true,
          hasMounted: true,
        });
        return true; // completed
      }

      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setState({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
        isComplete: false,
        hasMounted: true,
      });

      return false;
    };

    // Calculate immediately on mount
    const done = calculateTime();
    if (done) return;

    const interval = setInterval(() => {
      const finished = calculateTime();
      if (finished) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetIsoDate]);

  return state;
}
