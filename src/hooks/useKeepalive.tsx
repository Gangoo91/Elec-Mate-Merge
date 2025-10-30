import { useEffect, useRef, useState } from 'react';

interface UseKeepaliveOptions {
  isActive: boolean;
  callback: () => Promise<void>;
  intervalMs?: number;
}

export function useKeepalive({
  isActive,
  callback,
  intervalMs = 120000, // 2 minutes default
}: UseKeepaliveOptions) {
  const [isPaused, setIsPaused] = useState(false);
  const [secondsUntilNext, setSecondsUntilNext] = useState(intervalMs / 1000);
  const [lastPingTime, setLastPingTime] = useState<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  const startCountdown = () => {
    setSecondsUntilNext(intervalMs / 1000);
    if (countdownRef.current) clearInterval(countdownRef.current);
    
    countdownRef.current = setInterval(() => {
      setSecondsUntilNext(prev => Math.max(0, prev - 1));
    }, 1000);
  };

  const executePing = async () => {
    try {
      await callback();
      setLastPingTime(new Date());
      startCountdown();
    } catch (error) {
      console.error('Keepalive ping failed:', error);
    }
  };

  useEffect(() => {
    if (!isActive || isPaused) {
      clearTimers();
      return;
    }

    // Initial ping
    executePing();

    // Set up interval
    timerRef.current = setInterval(executePing, intervalMs);

    return () => clearTimers();
  }, [isActive, isPaused, intervalMs]);

  const pause = () => {
    setIsPaused(true);
    clearTimers();
  };

  const resume = () => {
    setIsPaused(false);
  };

  const pingNow = async () => {
    clearTimers();
    await executePing();
    if (isActive && !isPaused) {
      timerRef.current = setInterval(executePing, intervalMs);
    }
  };

  return {
    isPaused,
    pause,
    resume,
    pingNow,
    secondsUntilNext,
    lastPingTime,
  };
}
