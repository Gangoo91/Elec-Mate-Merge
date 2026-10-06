import { useEmployerApprenticeReviews, fmtReviewDate } from '@/hooks/useTripartiteReviews';

/* ==========================================================================
   EmployerReviewAction — the employer's part in an apprentice's progress
   review, inside the Employer Hub (ELE-1879 / ELE-1880).

   The college books the review and the employer gets a link; an employer
   with an Elec-Mate account sees the same step here: add their view before
   the review, sign the summary after it. Both open the same /review/:token
   page the email links to, so there is one place the employer's answers and
   signature are recorded (funding rules para 97.2).
   ========================================================================== */

export function EmployerReviewAction({ studentUserId }: { studentUserId: string }) {
  const { rows, loading } = useEmployerApprenticeReviews();
  if (loading) return null;
  const row = rows.find((r) => r.student_user_id === studentUserId);
  const r = row?.review;
  if (!r) return null;

  const needsView = !r.locked && !r.employer_input;
  const needsSign = r.locked && !r.employer_signed;
  if (!needsView && !needsSign && r.locked) return null;

  const title = needsSign
    ? 'Read and sign the review summary'
    : needsView
      ? 'Add your view before the review'
      : 'Change your view';
  const detail = needsSign
    ? `Held ${fmtReviewDate(r.held_on)}`
    : r.scheduled_at
      ? `Booked ${fmtReviewDate(r.scheduled_at, true)}`
      : 'Being arranged by the college';

  return (
    <div className="border-t border-white/[0.06] px-5 py-4">
      <a
        href={`/review/${r.token}`}
        className={
          needsView || needsSign
            ? 'flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow text-[13px] font-semibold text-black touch-manipulation'
            : 'flex h-11 w-full items-center justify-center rounded-full border border-white/[0.15] text-[13px] font-semibold text-white touch-manipulation'
        }
      >
        {title}
      </a>
      <p className="mt-2 text-center text-[12px] text-white">{detail}</p>
    </div>
  );
}
