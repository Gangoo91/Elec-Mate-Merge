import React, { useEffect, useRef } from 'react';
import { Timer } from 'lucide-react';

interface CaptureTimerProps {
  isActive: boolean;
  initialSeconds: number;
  onTick: (seconds: number) => void;
}

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const CaptureTimer = ({ isActive, initialSeconds, onTick }: CaptureTimerProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(initialSeconds);

  useEffect(() => {
    secondsRef.current = initialSeconds;
  }, [initialSeconds]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        secondsRef.current += 1;
        onTick(secondsRef.current);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, onTick]);

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
      <Timer className="h-3 w-3 text-white" />
      <span className="text-xs font-mono tabular-nums text-white">
        {formatTime(initialSeconds)}
      </span>
    </div>
  );
};
