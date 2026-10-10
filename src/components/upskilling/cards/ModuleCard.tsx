import React, { useMemo } from 'react';
import { useResolvedPath } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { completedSectionsForCourse } from '@/lib/courseProgressMatch';
import {
  CourseRow,
  orderOf,
  startedUnder,
  useIsNext,
  useListItem,
} from '@/components/study-centre/course-kit';

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
  /**
   * The word before the number in the eyebrow. Defaults to "Module", which is
   * what every C&G-shaped course calls one. The Welsh Level 3 is organised by
   * the qualification's own units, so it passes "Unit" — a learner there should
   * see "Unit 304E", the code their tutor and their handbook use.
   */
  label?: string;
  /** Replaces the whole eyebrow — e.g. "Reference" for the glossary card, which is not a module. */
  eyebrow?: string;
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
  eyebrow: eyebrowOverride,
  title,
  description,
  duration,
  icon: Icon,
  isExam = false,
  isCompleted: isCompletedProp = false,
  progress: progressProp,
  index: _index = 0,
  label = 'Module',
}) => {
  const { allProgress } = useCourseProgress();
  // Exactly where the link goes. (The hand-rolled version dropped a path
  // segment on nested routes — /level2/module1 + section1 became
  // /level2/section1 — so Level 2 progress never showed.)
  const resolvedPath = useResolvedPath(to).pathname;

  // Sections finished in this module. (The old "completed" flag went true as
  // soon as ANY section was done, so a module looked finished after one.)
  const doneCount = useMemo(() => {
    if (!allProgress.length) return 0;
    // Canonical matcher tolerates every historical key format (ELE-1045).
    return completedSectionsForCourse(allProgress, resolvedPath);
  }, [allProgress, resolvedPath]);

  // Opened at all (a page visit is recorded at 50%, never "complete").
  const visited = useMemo(
    () => startedUnder(allProgress, resolvedPath),
    [allProgress, resolvedPath]
  );
  const eyebrow = eyebrowOverride ?? (isExam ? 'Final assessment' : `${label} ${moduleNumber}`);
  useListItem({
    key: to,
    to,
    order: isExam ? 999 : orderOf(moduleNumber),
    label: eyebrow,
    title,
    done: isCompletedProp,
    doneCount,
    started: visited,
    // The final assessment isn't a module of study: not in "2 of 8 started".
    tracked: !isExam,
  });
  const isNext = useIsNext(to);
  void progressProp;

  return (
    <CourseRow
      to={to}
      number={String(moduleNumber)}
      icon={Icon}
      eyebrow={duration ? `${eyebrow} · ${duration}` : eyebrow}
      title={title}
      description={description}
      status={
        isCompletedProp
          ? 'Done'
          : doneCount > 0
            ? `${doneCount} ${doneCount === 1 ? 'section' : 'sections'} done`
            : undefined
      }
      done={isCompletedProp}
      started={doneCount > 0 || visited}
      next={isNext && (doneCount > 0 || visited)}
      exam={isExam}
    />
  );
};

export default ModuleCard;
