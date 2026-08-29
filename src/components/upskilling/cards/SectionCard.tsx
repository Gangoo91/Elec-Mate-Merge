import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { sectionCompleted } from '@/lib/courseProgressMatch';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  to: string;
  sectionNumber: number | string;
  title: string;
  description?: string;
  /**
   * Every caller passes a lucide icon, which is a ForwardRefExoticComponent
   * and so was NOT assignable to a plain ComponentType — one type error per
   * course index page, across dozens of them. `LucideIcon` is the type the
   * icons actually have.
   */
  icon: LucideIcon;
  isCompleted?: boolean;
  index?: number;
}

/**
 * The section card — 324 course pages render this.
 *
 * Rebuilt 2026-08-28 against the Study Centre hub — `HubKpi` in
 * `HubPrimitives`, which is what the hub cards are actually made of. Matched:
 * `CARD_SURFACE` via `CARD_NEUTRAL`, a volt border at /35, `px-4 py-3.5` on
 * phones and `sm:p-5` on desktop, the desktop-only hover lift, and the 1px
 * volt hairline along the top edge.
 *
 * Type rhythm (`mt-1.5` between eyebrow, title and description; footer at
 * `mt-3`) comes from the dashboard card in `BrowseCoursesPage`, which is the
 * same language at a denser scale.
 *
 * ⚠️ An earlier pass matched `BrowseCoursesPage` alone and came out cramped:
 * `p-4` with no hairline reads as a flat tile beside the hub's cards. The
 * dashboard grid is a dense search result; a module index is not. Take the
 * padding and the hairline from `HubKpi`, the type scale from the dashboard.
 *
 * 🔴 THE RULE THAT IS EASY TO MISS, and which an earlier pass at this file got
 * wrong: **volt appears only when there is something to say.** The dashboard
 * card keeps its footer white and turns it gold only where real progress
 * exists — "an accent on every card means nothing". A gold CTA on all six
 * sections of a module is decoration; a gold one on the two you have finished
 * is information.
 *
 * What went, and why:
 *   - `bg-[hsl(0_0%_12%)]` with no border — a flat fill on a near-black page,
 *     the "wall of grey rectangles" the recipe exists to stop.
 *   - A `from-elec-yellow/70 via-amber-400/70 to-orange-400/70` strip along the
 *     top. The hairline itself was right and is kept — what was wrong is that
 *     it ran through three hues. `HubKpi` uses one colour and varies only the
 *     alpha, /55 normally and /90 when the card has something to report.
 *   - `border-white/[0.08]` icon chip and a `border-white/[0.06]` footer rule.
 *     White borders read as grey outlines on this ground; the icon now sits
 *     inline and the footer has no divider at all.
 */
export const SectionCard: React.FC<SectionCardProps> = ({
  to,
  sectionNumber,
  title,
  description,
  icon: Icon,
  isCompleted: isCompletedProp = false,
  index: _index = 0,
}) => {
  const { allProgress } = useCourseProgress();
  const location = useLocation();

  const autoCompleted = useMemo(() => {
    if (!allProgress.length) return false;

    const basePath = location.pathname.replace(/\/[^/]*$/, '');
    const resolvedPath = to.startsWith('../')
      ? basePath.replace(/\/[^/]*$/, '') + '/' + to.replace('../', '')
      : to.startsWith('/')
        ? to
        : basePath + '/' + to;

    // Canonical matcher tolerates every historical key format (ELE-1045).
    return sectionCompleted(allProgress, resolvedPath);
  }, [allProgress, to, location.pathname]);

  const isCompleted = isCompletedProp || autoCompleted;

  return (
    <Link
      to={to}
      className={cn(
        CARD_BASE,
        CARD_NEUTRAL,
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
          isCompleted ? 'via-elec-yellow/90' : 'via-elec-yellow/55'
        )}
      />

      <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
        <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} aria-hidden />
        Section {sectionNumber}
      </span>

      <span className="mt-1.5 text-[15px] font-semibold leading-tight tracking-tight text-white">
        {title}
      </span>

      {description && (
        <span className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-white">
          {description}
        </span>
      )}

      <span className="mt-3 flex items-center justify-between gap-2 text-[11.5px]">
        <span className="text-white">{isCompleted ? 'Completed' : 'Not started'}</span>
        {/* Volt only where there is progress — see the note above. */}
        <span className={cn('font-semibold', isCompleted ? 'text-elec-yellow' : 'text-white')}>
          {isCompleted ? 'Review' : 'Start'}
        </span>
      </span>
    </Link>
  );
};

export default SectionCard;
