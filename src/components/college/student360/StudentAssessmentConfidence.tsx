import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  useAssessorStandardisation,
  type AssessorStandardisation,
} from '@/hooks/useAssessorStandardisation';

/**
 * Connects the assessor-standardisation signal to the learner record: flags when
 * a learner's ACs were signed off by an assessor who drifts from the agreed
 * standard (a real IQA confidence lens). Reads the same useAssessorStandardisation
 * signal as the calibration view, looking assessors up by college_staff.id —
 * because student_ac_coverage.assessor_id FKs to college_staff.id, not the user_id.
 *
 * Renders nothing unless there's enough calibration history AND at least one of
 * this learner's assessors is flagged, so it stays invisible until it matters.
 * (Deliberate — this is a warning strip between sections, not a section of its
 * own, so an empty state would be a card saying "no warning".)
 */
export function StudentAssessmentConfidence({ studentId }: { studentId: string }) {
  const { byStaffId, hasEnoughData } = useAssessorStandardisation();
  const [assessorStaffIds, setAssessorStaffIds] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data } = await supabase
        .from('student_ac_coverage')
        .select('assessor_id')
        .eq('student_id', studentId)
        .not('assessor_id', 'is', null);
      if (cancelled) return;
      const ids = Array.from(
        new Set(((data ?? []) as Array<{ assessor_id: string }>).map((r) => r.assessor_id))
      );
      setAssessorStaffIds(ids);
    })();
    return () => {
      cancelled = true;
    };
  }, [studentId]);

  if (!hasEnoughData) return null;

  const flagged = assessorStaffIds
    .map((id) => byStaffId.get(id))
    .filter((a): a is AssessorStandardisation => !!a && a.isOutlier);
  if (flagged.length === 0) return null;

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/70', CARD_SURFACE)}>
      <div className="px-4 py-3 sm:px-5">
        <div className="text-[13px] font-semibold text-elec-yellow">Assessment confidence</div>
        <p className="mt-1 text-[12.5px] leading-snug text-white">
          Some of this learner&apos;s ACs were signed off by{' '}
          {flagged.length > 1 ? 'assessors' : 'an assessor'} who drift
          {flagged.length > 1 ? '' : 's'} from the agreed standard. Consider IQA sampling their
          sign-offs.
        </p>
      </div>
      <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
        {flagged.map((a) => (
          <li
            key={a.assessorId}
            className="flex items-center justify-between gap-3 px-4 py-2.5 text-[12.5px] sm:px-5"
          >
            <span className="min-w-0 truncate text-white">
              {a.assessorName ?? 'Unknown assessor'}
            </span>
            <span className="shrink-0 font-semibold capitalize tabular-nums text-white">
              {a.driftLabel === 'aligned'
                ? 'Off consensus'
                : `${a.driftLabel} +${Math.abs(a.avgSignedDrift).toFixed(1)}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
