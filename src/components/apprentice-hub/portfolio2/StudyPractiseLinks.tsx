/**
 * "Study" and "Practise" for one criterion (ELE-1904).
 *
 * Study opens the Study Centre lesson whose author mapped it to this
 * criterion; Practise opens a short paper on that lesson's section. Nothing
 * shows when no lesson is mapped: a missing link is better than a wrong one.
 */
import { BookOpen, ListChecks } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  practiseLabel,
  practisePath,
  studyLabel,
  type CriterionLinks,
} from '@/hooks/college/useStudyLinks';

const CHIP =
  'inline-flex h-11 items-center gap-1.5 rounded-full border border-white/[0.22] px-3.5 text-[12.5px] font-semibold text-white touch-manipulation hover:border-elec-yellow';

export function StudyPractiseLinks({
  unit,
  ac,
  links,
  className,
}: {
  unit: string;
  ac: string;
  links: CriterionLinks | undefined;
  className?: string;
}) {
  const navigate = useNavigate();
  if (!links || (!links.study && !links.practise)) return null;
  const { study, practise } = links;
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)} data-testid="study-practise">
      {study && (
        <button
          type="button"
          className={CHIP}
          aria-label={`${studyLabel(study)}: ${study.title ?? 'lesson'}`}
          title={study.title ?? undefined}
          onClick={() => navigate(study.route)}
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          {studyLabel(study)}
        </button>
      )}
      {practise && (
        <button
          type="button"
          className={CHIP}
          aria-label={`${practiseLabel(practise)} on this lesson's section`}
          onClick={() => navigate(practisePath(practise, unit, ac))}
        >
          <ListChecks className="h-3.5 w-3.5" aria-hidden />
          {practiseLabel(practise)}
        </button>
      )}
    </div>
  );
}

export default StudyPractiseLinks;
