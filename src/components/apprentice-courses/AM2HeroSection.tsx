import React, { memo } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AM2HeroSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

export const AM2HeroSection = memo(function AM2HeroSection({
  icon: Icon,
  title,
  description,
  badge,
  className,
}: AM2HeroSectionProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-6 sm:p-8',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />

      <div className="flex items-start gap-4">
        <div className="shrink-0 h-11 w-11 rounded-xl bg-elec-yellow/15 border border-elec-yellow/30 flex items-center justify-center">
          <Icon className="h-5 w-5 text-elec-yellow" strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          {badge && (
            <span className="inline-flex items-center text-[10.5px] font-medium uppercase tracking-[0.18em] text-white">
              {badge}
            </span>
          )}
          <h1 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.1]">
            {title}
          </h1>
          <p className="mt-3 text-[13px] sm:text-[14px] text-white leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
});

export default AM2HeroSection;
