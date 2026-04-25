import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface AM2ContentCardProps {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AM2ContentCard = memo(function AM2ContentCard({
  children,
  accent = false,
  className,
  onClick,
}: AM2ContentCardProps) {
  const isInteractive = !!onClick;

  return (
    <div
      className={cn(
        'relative bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 overflow-hidden',
        isInteractive && [
          'cursor-pointer touch-manipulation',
          'hover:bg-[hsl(0_0%_15%)] active:scale-[0.99] transition-colors',
        ],
        className
      )}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {accent && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />
      )}
      {children}
    </div>
  );
});

export default AM2ContentCard;
