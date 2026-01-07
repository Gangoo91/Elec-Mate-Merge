import React, { memo } from 'react';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AM2HeroSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

/**
 * AM2HeroSection - Page hero component for AM2 content pages
 * Features animated icon with glow effect, iOS typography,
 * and optional module/section badge.
 */
export const AM2HeroSection = memo(function AM2HeroSection({
  icon: Icon,
  title,
  description,
  badge,
  className,
}: AM2HeroSectionProps) {
  return (
    <div className={cn('pb-6 sm:pb-8', className)}>
      {/* Icon with Glow Effect */}
      <div className="relative inline-block mb-4 ios-animate-in">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-elec-yellow/20 rounded-2xl blur-xl scale-150" />

        {/* Icon Container */}
        <div className={cn(
          'relative p-3 sm:p-4 rounded-2xl',
          'bg-gradient-to-br from-elec-yellow/20 to-amber-500/10',
          'border border-elec-yellow/30',
          'shadow-[0_0_30px_-5px_hsl(47_100%_50%/0.3)]'
        )}>
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-elec-yellow" />
        </div>
      </div>

      {/* Badge */}
      {badge && (
        <div className="mb-3 ios-animate-in" style={{ '--ios-delay': '50ms' } as React.CSSProperties}>
          <Badge className={cn(
            'bg-elec-yellow/15 text-elec-yellow border-elec-yellow/30',
            'text-ios-caption-1 font-medium px-2.5 py-1'
          )}>
            {badge}
          </Badge>
        </div>
      )}

      {/* Title */}
      <h1
        className={cn(
          'text-ios-title-1 text-white mb-3',
          'ios-animate-in'
        )}
        style={{ '--ios-delay': '100ms' } as React.CSSProperties}
      >
        {title}
      </h1>

      {/* Description */}
      <p
        className={cn(
          'text-ios-body text-white/70 leading-relaxed max-w-2xl',
          'ios-animate-in'
        )}
        style={{ '--ios-delay': '150ms' } as React.CSSProperties}
      >
        {description}
      </p>
    </div>
  );
});

export default AM2HeroSection;
