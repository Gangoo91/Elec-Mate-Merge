import React, { useMemo } from 'react';
import { useResolvedPath } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import {
  CourseRow,
  orderOf,
  startedUnder,
  useIsNext,
  useListItem,
} from '@/components/study-centre/course-kit';

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
  /**
   * The word before the number in the eyebrow. Defaults to "Section". The Welsh
   * Level 3 splits a unit by the handbook's learning outcomes, so it passes
   * "Outcome" — the word that unit's own criteria are numbered against.
   */
  label?: string;
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
  label = 'Section',
}) => {
  const { allProgress } = useCourseProgress();
  // Exactly where the link goes. (The hand-rolled version dropped a path
  // segment on nested routes — /level2/module1 + section1 became
  // /level2/section1 — so Level 2 progress never showed.)
  const resolvedPath = useResolvedPath(to).pathname;

  const autoCompleted = useMemo(() => {
    if (!allProgress.length) return false;

    // Canonical matcher tolerates every historical key format (ELE-1045).
    // Opened it (a visit row) or did a check in it: either way, started.
    return startedUnder(allProgress, resolvedPath);
  }, [allProgress, resolvedPath]);

  // A completed check or quiz inside it = started. Only the page can say done.
  const isCompleted = isCompletedProp;
  const started = autoCompleted && !isCompleted;
  const eyebrow = `${label} ${sectionNumber}`;

  // Tell the page header (progress bar, Continue button) about this one.
  useListItem({
    key: to,
    to,
    order: orderOf(sectionNumber),
    label: eyebrow,
    title,
    done: isCompleted,
    started,
    tracked: true,
  });
  const isNext = useIsNext(to) && !isCompleted;

  // 2026-10-10: a numbered row (course-kit) — ticks when done, "Next up" on
  // the one the header's button points at. Volt still only where it says
  // something: the next one, never all six.
  return (
    <CourseRow
      to={to}
      number={String(sectionNumber)}
      icon={Icon}
      eyebrow={eyebrow}
      title={title}
      description={description}
      done={isCompleted}
      started={started}
      next={isNext}
    />
  );
};

export default SectionCard;
