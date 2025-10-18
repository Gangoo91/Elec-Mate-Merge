import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface GenerationTimerProps {
  isRunning: boolean;
  onTimeUpdate?: (seconds: number) => void;
}

export const GenerationTimer: React.FC<GenerationTimerProps> = ({ isRunning, onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => {
        const newValue = prev + 1;
        onTimeUpdate?.(newValue);
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRunning && seconds === 0) return null;

  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow animate-pulse" />
      <span className="font-mono font-bold text-sm sm:text-base text-elec-yellow tabular-nums tracking-tight">
        {formatTime(seconds)}
      </span>
    </div>
  );
};
