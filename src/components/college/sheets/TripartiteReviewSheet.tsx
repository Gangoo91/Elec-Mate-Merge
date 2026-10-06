import { useEffect, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  inputCn,
  labelCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  MODE_LABEL,
  daysUntil,
  fmtReviewDate,
  useStudentReviews,
  type TripartiteReview,
} from '@/hooks/useTripartiteReviews';
import { ReviewWorkspaceSheet } from '@/components/college/reviews/ReviewWorkspaceSheet';

/* ==========================================================================
   TripartiteReviewSheet — one learner's progress reviews, from Student 360.

   Lists every review (upcoming first, then the signed record) with the date
   the next one is due under the funding rules (para 97). Tapping a review
   opens the workspace; "Schedule" starts a new one. The workspace replaced
   the ELE-930 form, which let the tutor tap "Sign" for the employer.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  collegeId: string;
  /** Open straight onto one review (deep link). */
  initialReviewId?: string | null;
}

export function TripartiteReviewSheet({
  open,
  onOpenChange,
  studentId,
  studentName,
  collegeId,
  initialReviewId,
}: Props) {
  const { reviews, loading, reload } = useStudentReviews(open ? studentId : null);
  const [dueBy, setDueBy] = useState<string | null>(null);
  // undefined = the list; null = schedule a new review; string = that review
  const [selected, setSelected] = useState<string | null | undefined>(undefined);

  const loadDue = () =>
    supabase
      .rpc('tripartite_due_by' as never, { p_student: studentId } as never)
      .then(({ data }) => setDueBy((data as unknown as string) ?? null));

  useEffect(() => {
    if (!open) return;
    setSelected(initialReviewId ?? undefined);
    void loadDue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, studentId, initialReviewId]);

  if (open && selected !== undefined) {
    return (
      <ReviewWorkspaceSheet
        open
        onOpenChange={(o) => {
          if (!o) {
            setSelected(undefined);
            void reload();
          }
        }}
        reviewId={selected}
        studentId={studentId}
        studentName={studentName}
        collegeId={collegeId}
        onChanged={() => void reload()}
      />
    );
  }

  const upcoming = reviews.filter((r) => !r.locked_at);
  const signed = reviews.filter((r) => r.locked_at);
  const days = daysUntil(dueBy);

  return (
    <FormSheet
      width="wide"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Progress reviews"
      title={studentName}
      description={
        dueBy
          ? days != null && days < 0
            ? `Overdue: the next review was due by ${fmtReviewDate(dueBy)}.`
            : `Next review due by ${fmtReviewDate(dueBy)}. Three-way, at least every 3 calendar months.`
          : 'Three-way reviews with the apprentice and employer, at least every 3 calendar months.'
      }
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Close
          </button>
          <button type="button" onClick={() => setSelected(null)} className={buttonPrimaryCn}>
            Schedule a review
          </button>
        </div>
      }
    >
      <FrequencyRow studentId={studentId} onChanged={() => void loadDue()} />

      {loading ? (
        <div className="space-y-2 animate-pulse">
          {[0, 1].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-white/[0.05]" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="py-8 text-center text-[14px] leading-relaxed text-white">
          No reviews yet. Schedule the first one; everything the record already knows is filled in for you.
        </p>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-2">
          {upcoming.length > 0 && (
            <ReviewGroup title="Coming up" reviews={upcoming} onOpen={setSelected} />
          )}
          {signed.length > 0 && <ReviewGroup title="Signed reviews" reviews={signed} onOpen={setSelected} />}
        </div>
      )}
    </FormSheet>
  );
}

function ReviewGroup({
  title,
  reviews,
  onOpen,
}: {
  title: string;
  reviews: TripartiteReview[];
  onOpen: (id: string) => void;
}) {
  return (
    <section>
      <h3 className="mb-2 text-[13px] font-semibold text-white">{title}</h3>
      <ul className="divide-y divide-white/[0.1] overflow-hidden rounded-2xl border border-white/[0.14]">
        {reviews.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              onClick={() => onOpen(r.id)}
              className="flex min-h-[64px] w-full items-center justify-between gap-3 px-4 py-3 text-left touch-manipulation hover:bg-white/[0.05]"
            >
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold text-white">
                  {r.locked_at
                    ? fmtReviewDate(r.held_on)
                    : r.scheduled_at
                      ? fmtReviewDate(r.scheduled_at, true)
                      : 'Not dated'}
                </span>
                <span className="block truncate text-[12.5px] text-white">
                  {r.mode ? MODE_LABEL[r.mode] : 'Mode not set'}
                  {r.employer_input ? ' · employer view in' : ''}
                  {r.learner_input ? ' · apprentice view in' : ''}
                </span>
              </span>
              <StatePill review={r} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatePill({ review }: { review: TripartiteReview }) {
  const s = review.signatures ?? {};
  const [label, tone] = !review.locked_at
    ? (['Open', 'neutral'] as const)
    : !s.student_signed_at
      ? (['Apprentice to sign', 'amber'] as const)
      : !s.employer_signed_at
        ? (['Employer to sign', 'amber'] as const)
        : (['Signed by all', 'green'] as const);
  return (
    <span
      className={cn(
        'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold',
        tone === 'green' ? 'bg-emerald-500 text-black' : tone === 'amber' ? 'bg-orange-500 text-black' : 'border border-white/[0.2] text-white'
      )}
    >
      {label}
    </span>
  );
}

/* Para 97.1: another review frequency only for an evidenced delivery reason,
   agreed with the employer. Stored on the learner; the due date follows it. */
const MONTH_OPTIONS = [1, 2, 3, 4, 6];

function FrequencyRow({ studentId, onChanged }: { studentId: string; onChanged: () => void }) {
  const { toast } = useToast();
  const [current, setCurrent] = useState<{ months: number | null; reason: string | null; agreed: string | null } | null>(null);
  const [editing, setEditing] = useState(false);
  const [months, setMonths] = useState(3);
  const [reason, setReason] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () =>
    supabase
      .from('college_students')
      .select('review_frequency_months, review_frequency_reason, review_frequency_agreed_at' as never)
      .eq('id', studentId)
      .maybeSingle()
      .then(({ data }) => {
        const d = data as unknown as {
          review_frequency_months: number | null;
          review_frequency_reason: string | null;
          review_frequency_agreed_at: string | null;
        } | null;
        setCurrent({
          months: d?.review_frequency_months ?? null,
          reason: d?.review_frequency_reason ?? null,
          agreed: d?.review_frequency_agreed_at ?? null,
        });
      });
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  const save = async (reset = false) => {
    setSaving(true);
    const patch = reset || months === 3
      ? { review_frequency_months: null, review_frequency_reason: null, review_frequency_agreed_at: null }
      : { review_frequency_months: months, review_frequency_reason: reason.trim(), review_frequency_agreed_at: new Date().toISOString() };
    const { error } = await supabase.from('college_students').update(patch as never).eq('id', studentId);
    setSaving(false);
    if (error) {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
      return;
    }
    setEditing(false);
    void load();
    onChanged();
  };

  if (!current) return null;
  const custom = current.months != null;
  const valid = months === 3 || (reason.trim().length >= 5 && agreed);

  if (!editing) {
    return (
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.1] pb-4">
        <p className="min-w-0 text-[13px] leading-snug text-white">
          {custom
            ? `Every ${current.months} ${current.months === 1 ? 'month' : 'months'}, agreed with the employer ${new Date(current.agreed as string).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}: ${current.reason}`
            : 'Every 3 calendar months, the funding rules default.'}
        </p>
        <button
          type="button"
          onClick={() => {
            setMonths(current.months ?? 3);
            setReason(current.reason ?? '');
            setAgreed(!!current.agreed);
            setEditing(true);
          }}
          className="h-11 shrink-0 rounded-xl px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          Change
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 border-b border-white/[0.1] pb-4">
      <div>
        <p className={labelCn}>Review every</p>
        <div className="grid grid-cols-5 gap-2">
          {MONTH_OPTIONS.map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={months === m}
              onClick={() => setMonths(m)}
              className={cn(chipBase, 'text-[13px]', months === m ? chipOn : chipOff)}
            >
              {m} mo
            </button>
          ))}
        </div>
      </div>
      {months !== 3 && (
        <>
          <div>
            <label className={labelCn} htmlFor="freq-reason">
              Delivery reason (for example, module length)
            </label>
            <input id="freq-reason" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCn} />
          </div>
          <button
            type="button"
            onClick={() => setAgreed((v) => !v)}
            aria-pressed={agreed}
            className={cn(
              'flex min-h-11 w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-[13.5px] text-white touch-manipulation',
              agreed ? 'border-elec-yellow' : 'border-white/[0.15]'
            )}
          >
            <span
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold',
                agreed ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
              )}
            >
              {agreed ? '✓' : ''}
            </span>
            The employer has agreed this frequency
          </button>
          <p className="text-[12px] leading-relaxed text-white">
            The funding rules allow another frequency only for an evidenced delivery reason agreed with the employer.
            Learning support must still be reviewed every 3 months.
          </p>
        </>
      )}
      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={() => setEditing(false)} className={cn(buttonSecondaryCn, 'h-11')}>
          Cancel
        </button>
        <button type="button" disabled={!valid || saving} onClick={() => void save()} className={cn(buttonPrimaryCn, 'h-11')}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
}
