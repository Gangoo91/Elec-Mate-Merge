import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type CourseLevel =
  | 'Essential'
  | 'Foundation'
  | 'Intermediate'
  | 'Advanced'
  | 'Specialist'
  | 'Expert';

interface CourseCardProps {
  to: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  level: CourseLevel;
  duration: string;
  index?: number;
  comingSoon?: boolean;
}

const LEVEL_ACCENT: Record<CourseLevel, string> = {
  Essential: 'from-elec-yellow/70 via-amber-400/70 to-orange-400/70',
  Foundation: 'from-emerald-500/70 via-emerald-400/70 to-green-400/70',
  Intermediate: 'from-blue-500/70 via-blue-400/70 to-cyan-400/70',
  Advanced: 'from-purple-500/70 via-violet-400/70 to-indigo-400/70',
  Specialist: 'from-orange-500/70 via-amber-400/70 to-yellow-400/70',
  Expert: 'from-red-500/70 via-rose-400/70 to-pink-400/70',
};

export const CourseCard: React.FC<CourseCardProps> = ({
  to,
  title,
  description,
  icon: Icon,
  level,
  duration,
  index: _index = 0,
  comingSoon = false,
}) => {
  const accent = LEVEL_ACCENT[level];

  const inner = (
    <div
      className={cn(
        'group relative h-full min-h-[170px] sm:min-h-[190px]',
        'bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors',
        'rounded-2xl overflow-hidden',
        'p-5 flex flex-col text-left',
        comingSoon ? 'opacity-60 cursor-default' : 'active:scale-[0.99] touch-manipulation'
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity',
          accent
        )}
      />

      <div className="flex items-start justify-between gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {level}
        </span>
        {comingSoon && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Soon
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start gap-3">
        <div className="shrink-0 h-9 w-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
          <Icon className="h-4 w-4 text-white" strokeWidth={1.8} />
        </div>
        <h3 className="text-[15px] sm:text-base font-semibold text-white leading-snug tracking-tight line-clamp-2 flex-1 min-w-0">
          {title}
        </h3>
      </div>

      <p className="mt-2.5 text-[12.5px] text-white leading-relaxed line-clamp-2">{description}</p>

      <div className="flex-grow" />

      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <span className="text-[11px] text-white">{duration}</span>
        {comingSoon ? (
          <span className="text-[12px] text-amber-300/80 font-medium">Coming soon</span>
        ) : (
          <span className="text-[12px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
            Open →
          </span>
        )}
      </div>
    </div>
  );

  if (comingSoon) {
    return <div className="block h-full">{inner}</div>;
  }

  return (
    <Link to={to} className="block h-full" aria-label={`View ${title} course`}>
      {inner}
    </Link>
  );
};

export default CourseCard;
