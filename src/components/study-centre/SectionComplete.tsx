/**
 * SectionComplete — auto-records course progress when visible in viewport.
 *
 * Place at the bottom of any study centre content page.
 * When the user scrolls to it, it marks that section as complete.
 * Uses IntersectionObserver for performance — no scroll event listeners.
 *
 * Usage:
 *   <SectionComplete courseKey="fire-safety" sectionKey="module-1-section-3" />
 */

import { useEffect, useRef, useState } from 'react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { CheckCircle } from 'lucide-react';

interface SectionCompleteProps {
  courseKey: string;
  sectionKey: string;
  /** Optional: show a visible "Section completed" indicator */
  showIndicator?: boolean;
}

export function SectionComplete({ courseKey, sectionKey, showIndicator = true }: SectionCompleteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { recordProgress, getProgress } = useCourseProgress();
  const [recorded, setRecorded] = useState(false);

  // Check if already completed
  const existing = getProgress(courseKey);
  const alreadyDone = existing?.completed || false;

  useEffect(() => {
    if (recorded || alreadyDone) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !recorded) {
          setRecorded(true);
          recordProgress(courseKey, sectionKey, 100, true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [courseKey, sectionKey, recorded, alreadyDone, recordProgress]);

  if (!showIndicator) {
    return <div ref={ref} className="h-1" />;
  }

  return (
    <div ref={ref} className="flex items-center justify-center gap-2 py-6 mt-4">
      {(recorded || alreadyDone) && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-green-400">Section completed</span>
        </div>
      )}
    </div>
  );
}

export default SectionComplete;
