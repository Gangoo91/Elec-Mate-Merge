/**
 * Subsection row on a section page ("6.1 Passive design principles").
 *
 * 2026-10-10: a numbered row from the course kit, like every other list in the
 * courses. "Started" when a check or quiz inside it is done (the same matcher
 * the section cards use); never "done", which the data can't say.
 */
import { useMemo } from 'react';
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

interface ModuleCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  comingSoon?: boolean;
}

export function ModuleCard({
  number,
  title,
  description,
  icon,
  href,
  comingSoon,
}: ModuleCardProps) {
  const { allProgress } = useCourseProgress();
  // Exactly where the link goes.
  const resolvedPath = useResolvedPath(href ?? '.').pathname;
  const live = !!href && !comingSoon;
  const started = useMemo(
    // Opened it or did a check in it.
    () => live && startedUnder(allProgress, resolvedPath),
    [live, allProgress, resolvedPath]
  );

  useListItem(
    live
      ? {
          key: href!,
          to: href!,
          order: orderOf(number),
          label: number,
          title,
          done: false,
          started,
          tracked: true,
        }
      : null
  );
  const isNext = useIsNext(href ?? '') && live;

  return (
    <CourseRow
      to={live ? href : undefined}
      number={number}
      icon={icon}
      eyebrow={number}
      title={title}
      description={description}
      started={started}
      next={isNext}
      disabled={!live}
    />
  );
}
