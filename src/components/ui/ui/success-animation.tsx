import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuccessAnimationProps {
  message?: string;
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

export const SuccessAnimation = ({
  message = 'Success!',
  duration = 2000,
  onComplete,
  className,
}: SuccessAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm',
        'animate-in fade-in duration-200',
        className
      )}
    >
      <div className="bg-card border-2 border-elec-yellow/60 rounded-xl p-8 shadow-2xl shadow-elec-yellow/20 animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-elec-yellow/20 rounded-full blur-xl animate-pulse" />
            <CheckCircle2 className="relative h-16 w-16 text-elec-yellow animate-in zoom-in duration-500" />
          </div>
          <p className="text-xl font-semibold text-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
};

interface InlineSuccessProps {
  message: string;
  className?: string;
}

export const InlineSuccess = ({ message, className }: InlineSuccessProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 p-3 bg-elec-yellow/10 border border-elec-yellow/40 rounded-lg',
        'animate-in slide-in-from-top-2 duration-300',
        className
      )}
    >
      <CheckCircle2 className="h-5 w-5 text-elec-yellow flex-shrink-0" />
      <p className="text-sm text-foreground font-medium">{message}</p>
    </div>
  );
};
