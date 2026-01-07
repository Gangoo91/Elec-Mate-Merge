import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface AM2ContentCardProps {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * AM2ContentCard - iOS-style glassmorphism card component
 * Features backdrop blur, subtle border, and pressable interaction.
 * Optional accent variant adds an elec-yellow top border.
 */
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
        // Base glassmorphism styling
        'bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10',
        // Subtle shadow for depth
        'shadow-[0_2px_16px_rgba(0,0,0,0.2)]',
        // Padding
        'p-4 sm:p-5',
        // Accent variant - yellow top border
        accent && 'border-t-2 border-t-elec-yellow',
        // Interactive state with iOS pressable effect
        isInteractive && [
          'cursor-pointer',
          'ios-pressable',
          'hover:bg-white/[0.07] hover:border-white/15',
          'transition-all duration-ios-normal ease-ios-ease',
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
      {children}
    </div>
  );
});

export default AM2ContentCard;
