import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
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
    <div className="rounded-xl border border-amber-400/30 bg-amber-500/[0.06] px-4 py-3 space-y-2">
      <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-amber-200/90">
        Assessment confidence
      </div>
      <p className="text-[11.5px] text-white/60 leading-snug">
        Some of this learner&apos;s ACs were signed off by assessor{flagged.length > 1 ? 's' : ''} who
        drift from the agreed standard. Consider IQA sampling their sign-offs.
      </p>
      <ul className="space-y-1">
        {flagged.map((a) => (
          <li
            key={a.assessorId}
            className="flex items-center justify-between gap-3 text-[11.5px]"
          >
            <span className="text-white/85 truncate">{a.assessorName ?? 'Unknown assessor'}</span>
            <span
              className={cn(
                'shrink-0 inline-flex items-center h-5 px-1.5 rounded-md text-[9.5px] font-semibold uppercase tracking-[0.05em]',
                a.driftLabel === 'lenient' && 'bg-amber-500/15 border border-amber-400/40 text-amber-200',
                a.driftLabel === 'harsh' && 'bg-sky-500/15 border border-sky-400/40 text-sky-200',
                a.driftLabel === 'aligned' && 'bg-white/[0.05] border border-white/10 text-white/50'
              )}
            >
              {a.driftLabel === 'aligned'
                ? 'off-consensus'
                : `${a.driftLabel} +${Math.abs(a.avgSignedDrift).toFixed(1)}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
