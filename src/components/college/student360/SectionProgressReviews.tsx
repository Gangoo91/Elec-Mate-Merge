import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { cardCn } from '@/components/forms/fieldStyles';
import {
  ATTENDANCE_LABEL,
  daysUntil,
  fmtReviewDate,
  useStudentReviews,
} from '@/hooks/useTripartiteReviews';

/* ==========================================================================
   SectionProgressReviews — Student 360's view of a learner's tripartite
   progress reviews (funding rules para 97). When the next one is due, what
   is booked, who still has to sign, and how often the employer attended.
   Opens the review sheet; nothing is edited here.
   ========================================================================== */

export function useReviewDueBy(studentId: string | null | undefined) {
  const [dueBy, setDueBy] = useState<string | null>(null);
  useEffect(() => {
    if (!studentId) return;
    supabase
      .rpc('tripartite_due_by' as never, { p_student: studentId } as never)
      .then(({ data }) => setDueBy((data as unknown as string) ?? null));
  }, [studentId]);
  return dueBy;
}

export function SectionProgressReviews({
  id,
  studentId,
  studentName,
  onOpen,
}: {
  id: string;
  studentId: string;
  studentName: string;
  onOpen: () => void;
}) {
  const { reviews, loading } = useStudentReviews(studentId);
  const dueBy = useReviewDueBy(studentId);
  const days = daysUntil(dueBy);
  const upcoming = reviews.find((r) => !r.locked_at) ?? null;
  const toSign = reviews.find((r) => r.locked_at && (!r.signatures?.student_signed_at || !r.signatures?.employer_signed_at)) ?? null;
  const signed = reviews.filter((r) => r.locked_at);
  const attended = signed.filter((r) => r.employer_attendance === 'attended').length;
  const last = signed[0] ?? null;
  const overdue = days != null && days < 0;

  return (
    <section id={id} className={cn(cardCn, 'scroll-mt-20')}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Progress reviews</h2>
        <span className={cn('text-[12px] font-semibold', overdue ? 'text-orange-300' : 'text-white')}>
          {dueBy ? (overdue ? `Overdue since ${fmtReviewDate(dueBy)}` : `Next due by ${fmtReviewDate(dueBy)}`) : ''}
        </span>
      </div>

      {loading ? (
        <div className="h-16 animate-pulse rounded-xl bg-white/[0.05]" />
      ) : (
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <dt className="text-[12px] font-medium text-white">Booked</dt>
            <dd className="text-[14px] font-semibold text-white">
              {upcoming?.scheduled_at ? fmtReviewDate(upcoming.scheduled_at, true) : 'Nothing booked'}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium text-white">Last held</dt>
            <dd className="text-[14px] font-semibold text-white">{last ? fmtReviewDate(last.held_on) : 'None yet'}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium text-white">Employer attended</dt>
            <dd className="text-[14px] font-semibold text-white">
              {signed.length ? `${attended} of ${signed.length}` : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium text-white">Signatures</dt>
            <dd className="text-[14px] font-semibold text-white">
              {toSign
                ? !toSign.signatures?.student_signed_at
                  ? `${studentName.split(' ')[0]} to sign`
                  : 'Employer to sign'
                : signed.length
                  ? 'All signed'
                  : '—'}
            </dd>
          </div>
        </dl>
      )}

      {last?.employer_attendance && (
        <p className="text-[12.5px] text-white">
          Last time the employer {ATTENDANCE_LABEL[last.employer_attendance].toLowerCase()}.
        </p>
      )}

      <button
        type="button"
        onClick={onOpen}
        className={cn(
          'h-11 w-full rounded-xl text-[13px] font-semibold touch-manipulation',
          overdue || (!upcoming && days != null && days <= 21)
            ? 'bg-elec-yellow text-black'
            : 'border border-white/[0.14] bg-white/[0.06] text-white hover:bg-white/[0.1]'
        )}
      >
        {upcoming ? 'Open the booked review' : toSign ? 'Open the review' : 'Schedule a review'}
      </button>
    </section>
  );
}
