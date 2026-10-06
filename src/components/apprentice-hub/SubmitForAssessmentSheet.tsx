import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { usePortfolioDataWithQualifications } from '@/hooks/portfolio/usePortfolioDataWithQualifications';
import { useStudentSubmissions } from '@/hooks/college/usePortfolioSubmissions';
import { cn } from '@/lib/utils';

/* ==========================================================================
   SubmitForAssessmentSheet — the apprentice side of Journey 3
   (evidence → tutor/assessor review).

   Until now nothing in the hub let a learner SUBMIT a unit: the old
   PortfolioSubmissionPanel was never mounted anywhere, so
   portfolio_submissions only ever got rows from staff tooling. This sheet
   lists the units of the learner's chosen qualification that already carry
   evidence (portfolio_items.qualification_category_id), shows where each one
   is in the review cycle, and lets them pick ONE unit and send it with an
   optional note.

   Writes (via useStudentSubmissions().submitCategory):
     portfolio_submissions { user_id = auth uid, qualification_id,
       category_id, status 'submitted' | 'resubmitted', submitted_at,
       submission_count, submission_notes }
   The assessor's queue (useSubmissionQueue) reads the same table.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fires after a successful submit so the host card can refresh counts. */
  onSubmitted?: () => void;
}

type UnitStatus =
  'not_submitted' | 'submitted' | 'under_review' | 'feedback_given' | 'approved' | 'signed_off';

const STATUS_LABEL: Record<UnitStatus, string> = {
  not_submitted: 'Not submitted',
  submitted: 'Submitted',
  under_review: 'Under review',
  feedback_given: 'Feedback given',
  approved: 'Approved',
  signed_off: 'Signed off',
};

/** Collapse the raw portfolio_submissions.status vocabulary onto the six
    states the learner needs to tell apart. */
function normaliseStatus(raw: string | null | undefined): UnitStatus {
  switch (raw) {
    case 'submitted':
    case 'resubmitted':
      return 'submitted';
    case 'under_review':
    case 'in_review':
      return 'under_review';
    case 'feedback_given':
    case 'returned':
    case 'rejected':
      return 'feedback_given';
    case 'approved':
      return 'approved';
    case 'signed_off':
    case 'iqa_sampled':
    case 'iqa_verified':
      return 'signed_off';
    default:
      return 'not_submitted';
  }
}

/** A unit can go to the assessor when it has never gone, or when it came
    back with feedback. Anything already with the assessor, approved or
    signed off is locked. */
function canSubmit(status: UnitStatus): boolean {
  return status === 'not_submitted' || status === 'feedback_given';
}

interface UnitRow {
  id: string;
  name: string;
  evidenceCount: number;
  status: UnitStatus;
  submittedAt: string | null;
  feedback: string | null;
}

export function SubmitForAssessmentSheet({ open, onOpenChange, onSubmitted }: Props) {
  const { userSelection } = useQualifications();
  const qualificationId = userSelection?.qualification_id ?? null;
  const { categories, entries, isLoading: portfolioLoading } = usePortfolioDataWithQualifications();
  const { submissions, isLoading: submissionsLoading, submitCategory } = useStudentSubmissions();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);
  const [sentUnitName, setSentUnitName] = useState<string | null>(null);

  const loading = portfolioLoading || submissionsLoading;

  const units: UnitRow[] = useMemo(() => {
    type SubRow = {
      category_id: string | null;
      status: string | null;
      submitted_at: string | null;
      assessor_feedback: string | null;
    };
    const subByCategory = new Map<string, SubRow>();
    for (const s of (submissions ?? []) as SubRow[]) {
      if (s.category_id) subByCategory.set(s.category_id, s);
    }
    return categories
      .map((c) => {
        const evidenceCount = entries.filter((e) => e.category?.id === c.id).length;
        const sub = subByCategory.get(c.id);
        return {
          id: c.id,
          name: c.name,
          evidenceCount,
          status: normaliseStatus(sub?.status),
          submittedAt: sub?.submitted_at ?? null,
          feedback: sub?.assessor_feedback ?? null,
        };
      })
      .filter((u) => u.evidenceCount > 0);
  }, [categories, entries, submissions]);

  const selected = units.find((u) => u.id === selectedId) ?? null;
  const selectedIsResubmit = selected?.status === 'feedback_given';

  const reset = () => {
    setSelectedId(null);
    setNote('');
    setSentUnitName(null);
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  const handleSubmit = async () => {
    if (!selected || !qualificationId || !canSubmit(selected.status) || sending) return;
    setSending(true);
    try {
      await submitCategory.mutateAsync({
        qualificationId,
        categoryId: selected.id,
        note,
      });
      setSentUnitName(selected.name);
      onSubmitted?.();
    } catch {
      // submitCategory's onError already toasts; keep the sheet open so the
      // learner can try again.
    } finally {
      setSending(false);
    }
  };

  const footer = sentUnitName ? (
    <button
      type="button"
      onClick={() => handleOpenChange(false)}
      className={cn(buttonPrimaryCn, 'w-full')}
    >
      Done
    </button>
  ) : (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => handleOpenChange(false)}
        className={cn(buttonSecondaryCn, 'px-5')}
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!selected || !canSubmit(selected.status) || !qualificationId || sending}
        className={cn(buttonPrimaryCn, 'flex-1')}
      >
        {sending ? 'Sending…' : selectedIsResubmit ? 'Resubmit unit' : 'Submit for assessment'}
      </button>
    </div>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={handleOpenChange}
      eyebrow="Portfolio"
      title={sentUnitName ? 'Sent to your assessor' : 'Submit for assessment'}
      description={
        sentUnitName
          ? undefined
          : 'Pick one unit that has evidence. Your assessor reviews it and you see their decision here.'
      }
      footer={footer}
    >
      {sentUnitName ? (
        <Confirmation unitName={sentUnitName} />
      ) : loading ? (
        <p className="text-[13px] text-white">Loading your units…</p>
      ) : !qualificationId ? (
        <p className="text-[13px] leading-snug text-white">
          Choose your qualification in the portfolio first — submissions are made against its units.
        </p>
      ) : units.length === 0 ? (
        <p className="text-[13px] leading-snug text-white">
          None of your units have evidence yet. Add a piece of evidence to a unit and it will appear
          here, ready to send.
        </p>
      ) : (
        <>
          <div>
            <span className={labelCn}>Unit</span>
            <ul className="-mx-1 divide-y divide-white/[0.06]">
              {units.map((u) => {
                const isSelected = u.id === selectedId;
                const locked = !canSubmit(u.status);
                return (
                  <li key={u.id}>
                    <button
                      type="button"
                      onClick={() => !locked && setSelectedId(isSelected ? null : u.id)}
                      disabled={locked}
                      aria-pressed={isSelected}
                      className={cn(
                        'flex min-h-11 w-full items-start gap-3 px-1 py-3 text-left transition-colors touch-manipulation',
                        locked ? 'cursor-default' : 'hover:bg-white/[0.04]'
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                          isSelected
                            ? 'border-elec-yellow bg-elec-yellow text-black'
                            : 'border-white/[0.25]'
                        )}
                        aria-hidden
                      >
                        {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium text-white">
                          {u.name}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-white tabular-nums">
                          {u.evidenceCount} {u.evidenceCount === 1 ? 'item' : 'items'} of evidence
                          {u.submittedAt && u.status !== 'not_submitted'
                            ? ` · sent ${new Date(u.submittedAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                              })}`
                            : ''}
                        </span>
                        {u.status === 'feedback_given' && u.feedback && (
                          <span className="mt-1 block text-[12px] leading-snug text-white line-clamp-2">
                            Feedback: {u.feedback}
                          </span>
                        )}
                      </span>
                      <StatusChip status={u.status} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <label htmlFor="submit-assessment-note" className={labelCn}>
              Note to your assessor (optional)
            </label>
            <textarea
              id="submit-assessment-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Anything they should know about this evidence"
              className={cn(textareaCn, 'min-h-[80px] resize-none')}
            />
          </div>

          {selected && (
            <div className={cn('rounded-xl border border-white/[0.10] px-3.5 py-3', CARD_SURFACE)}>
              <p className="text-[12.5px] leading-snug text-white">
                {selectedIsResubmit
                  ? `You're resubmitting ${selected.name}. Their earlier feedback is kept on the record and they'll see what you changed.`
                  : `You're sending ${selected.name} with ${selected.evidenceCount} ${
                      selected.evidenceCount === 1 ? 'item' : 'items'
                    } of evidence. You can keep adding evidence while they review it.`}
              </p>
            </div>
          )}
        </>
      )}
    </FormSheet>
  );
}

function StatusChip({ status }: { status: UnitStatus }) {
  const tone =
    status === 'signed_off' || status === 'approved'
      ? 'border-emerald-500/40'
      : status === 'feedback_given'
        ? 'border-elec-yellow/60'
        : status === 'not_submitted'
          ? 'border-white/[0.15]'
          : 'border-white/[0.30]';
  return (
    <span
      className={cn(
        'mt-0.5 inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-md border px-2 text-[10.5px] font-medium text-white',
        tone
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function Confirmation({ unitName }: { unitName: string }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-elec-yellow text-black">
        <Check className="h-6 w-6" strokeWidth={3} />
      </span>
      <p className="text-[16px] font-semibold text-white">{unitName} is with your assessor</p>
      <p className="max-w-sm text-[13px] leading-snug text-white">
        Sent to your assessor. You'll see their decision and feedback here and in Comments &amp;
        sign-offs.
      </p>
    </div>
  );
}

export default SubmitForAssessmentSheet;
