import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { moduleProgress } from '@/lib/courseProgressMatch';
import { CARD_BASE, CARD_NEUTRAL, CARD_PRIMARY } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  to: string;
  moduleNumber: number | string;
  title: string;
  description?: string;
  duration?: string;
  /** Lucide icons are ForwardRefExoticComponent — see SectionCard. */
  icon: LucideIcon;
  isExam?: boolean;
  isCompleted?: boolean;
  progress?: number;
  index?: number;
}

/**
 * The module card. Matched to the Study Centre dashboard card in
 * `BrowseCoursesPage` — see the note in SectionCard for the shared rules,
 * including the important one: volt appears only where there is real progress.
 *
 * Two things are specific to this card.
 *
 * THE EXAM CARD IS THE PRIMARY CARD. It used to be flagged by a
 * `bg-elec-yellow/15` icon chip — a translucent volt FILL, which the recipe
 * bans outright because a wash of gold over near-black goes muddy brown. The
 * final assessment genuinely is the one action in a module grid that outranks
 * the others, which is what CARD_PRIMARY is for: a solid volt face with black
 * ink. Stronger signal than the chip ever was, and compliant.
 *
 * THE SIX-COLOUR ACCENT IS GONE. `from-blue-500/70 via-violet-400/70` was the
 * only blue and violet in the Study Centre and belonged to no palette — a
 * decorative gradient standing in for depth.
 */
export const ModuleCard: React.FC<ModuleCardProps> = ({
  to,
  moduleNumber,
  title,
  description,
  duration,
  icon: Icon,
  isExam = false,
  isCompleted: isCompletedProp = false,
  progress: progressProp,
  index: _index = 0,
}) => {
  const { allProgress } = useCourseProgress();
  const location = useLocation();

  const autoProgress = useMemo(() => {
    if (!allProgress.length) return { completed: false, pct: 0 };

    const basePath = location.pathname.replace(/\/[^/]*$/, '');
    const resolvedPath = to.startsWith('../')
      ? basePath.replace(/\/[^/]*$/, '') + '/' + to.replace('../', '')
      : to.startsWith('/')
        ? to
        : basePath + '/' + to;

    // Canonical matcher tolerates every historical key format (ELE-1045).
    return moduleProgress(allProgress, resolvedPath);
  }, [allProgress, to, location.pathname]);

  const isCompleted = isCompletedProp || autoProgress.completed;
  const progress =
    progressProp ?? (autoProgress.pct > 0 && autoProgress.pct < 100 ? autoProgress.pct : undefined);

  const ModuleIcon = isExam ? GraduationCap : Icon;
  const eyebrow = isExam ? 'Final assessment' : `Module ${moduleNumber}`;

  // On the volt face everything sits in black; on the neutral face, white.
  const ink = isExam ? 'text-black' : 'text-white';
  const hasProgress = isCompleted || (progress !== undefined && progress > 0);

  return (
    <Link
      to={to}
      className={cn(
        CARD_BASE,
        isExam ? CARD_PRIMARY : CARD_NEUTRAL,
        'relative overflow-hidden px-4 py-3.5 sm:p-5 lg:hover:-translate-y-0.5'
      )}
    >
      {/* A 1px volt line, not a volt surface — the same treatment HubKpi uses.
          A translucent volt FILL goes muddy brown on this ground; a hairline
          stays yellow because there is nothing behind it to muddy. */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 to-elec-yellow/0',
          isExam ? 'via-black/30' : hasProgress ? 'via-elec-yellow/90' : 'via-elec-yellow/55'
        )}
      />

      <span
        className={cn(
          'flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em]',
          isExam ? 'text-black/80' : 'text-white'
        )}
      >
        <ModuleIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} aria-hidden />
        {eyebrow}
        {duration && (
          <>
            <span
              className={cn('h-2.5 w-px', isExam ? 'bg-black/25' : 'bg-white/20')}
              aria-hidden
            />
            {duration}
          </>
        )}
      </span>

      <span className={cn('mt-1.5 text-[15px] font-semibold leading-tight tracking-tight', ink)}>
        {title}
      </span>

      {description && (
        <span
          className={cn(
            'mt-1.5 line-clamp-2 text-[12.5px] leading-snug',
            isExam ? 'text-black/70' : 'text-white'
          )}
        >
          {description}
        </span>
      )}

      <span className="mt-3 flex items-center justify-between gap-2 text-[11.5px]">
        <span className={cn(isExam ? 'text-black/70' : 'text-white')}>
          {isCompleted ? 'Completed' : progress !== undefined ? `${progress}% done` : 'Not started'}
        </span>
        {/* Volt only where there is progress — an accent on every card means nothing. */}
        <span
          className={cn(
            'font-semibold tabular-nums',
            isExam ? 'text-black' : hasProgress ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {isCompleted ? 'Review' : isExam ? 'Open exam' : 'Open'}
        </span>
      </span>
    </Link>
  );
};

export default ModuleCard;
