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
    <div className="flex items-center gap-2 text-xs text-elec-light/70">
      <Clock className="h-3.5 w-3.5" />
      <span className="font-mono font-medium">{formatTime(seconds)}</span>
    </div>
  );
};
