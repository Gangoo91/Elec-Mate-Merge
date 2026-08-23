/**
 * Where an exam's "Back"/"Exit" should return to.
 *
 * Every in-app paper has TWO points of access: its own course module page, and
 * the Mock Exams index at /study-centre/mock-exams. The papers only ever knew
 * about the first, so a learner who came from the index was dropped into a
 * course they had not been browsing.
 *
 * Callers pass their origin in router state; the paper falls back to its
 * course path when there is none (a direct link, a refresh, or an entry point
 * that has not been updated).
 */
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface ExamExit {
  to: string;
  /** Reads as "Back to {label}". */
  label: string;
}

/** Readable name for a path, so a caller only has to pass the route. */
function labelForPath(path: string): string {
  if (path.startsWith('/study-centre/mock-exams')) return 'mock exams';
  if (path.startsWith('/study-centre/apprentice')) return 'course';
  if (path.startsWith('/study-centre')) return 'Study Centre';
  if (path.startsWith('/apprentice/today')) return 'Today';
  if (path.startsWith('/apprentice')) return 'Apprentice Hub';
  return 'course';
}

export function useExamExit(fallbackTo: string, fallbackLabel = 'course'): ExamExit {
  const location = useLocation();
  return useMemo(() => {
    const state = location.state as { from?: string; label?: string } | null;
    if (state?.from) {
      return { to: state.from, label: state.label ?? labelForPath(state.from) };
    }
    return { to: fallbackTo, label: fallbackLabel };
  }, [location.state, fallbackTo, fallbackLabel]);
}
