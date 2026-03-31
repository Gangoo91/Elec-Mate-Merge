/**
 * CourseProgressWrapper — provides module progress data for course landing pages.
 *
 * Wraps around a course's module list and provides completion status
 * for each module. Uses render prop pattern for flexibility.
 *
 * Usage:
 *   <CourseProgressWrapper courseKey="fire-safety">
 *     {({ isModuleComplete, getModuleProgress, overallPct, resumePath }) => (
 *       <div>
 *         {modules.map(m => (
 *           <ModuleCard completed={isModuleComplete(m.key)} />
 *         ))}
 *       </div>
 *     )}
 *   </CourseProgressWrapper>
 */

import React from 'react';
import { useCourseProgress } from '@/hooks/useCourseProgress';

export interface ModuleProgressInfo {
  /** Is this specific module fully complete? */
  isModuleComplete: (moduleKey: string) => boolean;
  /** Get progress percentage for a module (0-100) */
  getModuleProgress: (moduleKey: string) => number;
  /** Overall course progress percentage */
  overallPct: number;
  /** Is the overall course complete? */
  courseComplete: boolean;
  /** Path to resume from (last accessed section) */
  resumePath: string | null;
  /** Is progress data still loading? */
  loading: boolean;
}

interface CourseProgressWrapperProps {
  courseKey: string;
  children: (progress: ModuleProgressInfo) => React.ReactNode;
}

export function CourseProgressWrapper({ courseKey, children }: CourseProgressWrapperProps) {
  const { allProgress, loading } = useCourseProgress();

  // Filter progress rows for this course
  const courseRows = allProgress.filter(
    (p) => p.course_key === courseKey || p.course_key.startsWith(`${courseKey}/`)
  );

  const isModuleComplete = (moduleKey: string): boolean => {
    const row = courseRows.find(
      (p) => p.course_key === `${courseKey}/${moduleKey}` || p.section_key === moduleKey
    );
    return row?.completed || false;
  };

  const getModuleProgress = (moduleKey: string): number => {
    const row = courseRows.find(
      (p) => p.course_key === `${courseKey}/${moduleKey}` || p.section_key === moduleKey
    );
    return row?.progress_pct || 0;
  };

  // Overall course progress
  const mainRow = courseRows.find((p) => p.course_key === courseKey);
  const overallPct = mainRow?.progress_pct || 0;
  const courseComplete = mainRow?.completed || false;

  // Resume from last accessed
  const sortedByAccess = [...courseRows].sort(
    (a, b) => new Date(b.last_accessed_at).getTime() - new Date(a.last_accessed_at).getTime()
  );
  const resumePath = sortedByAccess.length > 0 ? sortedByAccess[0].section_key : null;

  return <>{children({ isModuleComplete, getModuleProgress, overallPct, courseComplete, resumePath, loading })}</>;
}

export default CourseProgressWrapper;
