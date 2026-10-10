import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { notifyDoNextChanged } from '@/hooks/useMyDoNext';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import { cn } from '@/lib/utils';
import {
  MODE_LABEL,
  OWNER_LABEL,
  PROGRESS_LABEL,
  daysUntil,
  fmtReviewDate,
  signReviewAsLearner,
  submitLearnerReviewInput,
  useMyReviews,
  type MyReview,
  type ProgressView,
} from '@/hooks/useTripartiteReviews';
import { Chips, SignatureLine } from '@/components/college/reviews/reviewUi';
import { LC_CARD } from '@/components/apprentice-hub/college-hub/learnerUi';

/* ==========================================================================
   MyProgressReviewsCard — the apprentice's progress reviews on My college.

   Every three months the college, the apprentice and the employer review how
   it is going (funding rules para 97). Before a review the apprentice adds
   their view (the same three questions the employer answers); after it they
   read the summary and sign it (97.2.2 needs the provider's and the
   apprentice's signatures as a minimum). Actions agreed with them stay here
   until the next review checks them.
   ========================================================================== */

const PROGRESS_OPTIONS = (Object.keys(PROGRESS_LABEL) as ProgressView[]).map((v) => ({
  value: v,
  label: PROGRESS_LABEL[v],
}));
const CHECK: Record<string, string> = {
  done: 'Done',
  not_done: 'Not done',
  dropped: 'No longer needed',
};

export function MyProgressReviewsCard() {
  const { data, loading, reload } = useMyReviews();
  const [viewFor, setViewFor] = useState<MyReview | null>(null);
  const [readFor, setReadFor] = useState<MyReview | null>(null);

  // /apprentice/college-plan?review=<id> (from the "Sign your review"
  // notification, or the "Do next" list, ELE-1896): a written-up review opens
  // to read and sign; a booked one opens "Add your view".
  const { search } = useLocation();
  useEffect(() => {
    // Read the live URL (not `search`): after the replaceState below the
    // router's copy is stale, and a reload must not reopen the sheet.
    const params = new URLSearchParams(window.location.search);
    const id = params.get('review');
    const r = id ? data?.reviews.find((x) => x.id === id) : null;
    if (r) {
      if (r.locked) setReadFor(r);
      else setViewFor(r);
      // Opened once; signing reloads the list and must not reopen it.
      params.delete('review');
      const q = params.toString();
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${q ? `?${q}` : ''}`
      );
    }
  }, [data, search]);

  if (loading || !data) return null;
  // The next review: the earliest booked one not yet written up.
  const upcoming =
    data.reviews
      .filter((r) => !r.locked)
      .sort((a, b) => (a.scheduled_at ?? '9999').localeCompare(b.scheduled_at ?? '9999'))[0] ??
    null;
  const toSign = data.reviews.find((r) => r.locked && !r.signatures.student_signed_at) ?? null;
  const past = data.reviews.filter((r) => r.locked);
  const days = daysUntil(data.due_by);

  return (
    <section className={cn(LC_CARD, 'space-y-4')}>
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Progress reviews</h2>
          <p className="text-[12.5px] text-white">
            Every three months, with your tutor and employer
          </p>
        </div>
        {data.due_by && !upcoming && (
          <span
            className={cn(
              'text-[12px] font-semibold',
              days != null && days < 0 ? 'text-orange-300' : 'text-white'
            )}
          >
            Next due by {fmtReviewDate(data.due_by)}
          </span>
        )}
      </div>

      {toSign && (
        <button
          type="button"
          onClick={() => setReadFor(toSign)}
          className="flex min-h-[64px] w-full items-center justify-between gap-3 rounded-xl border border-orange-400/60 px-4 py-3 text-left text-white touch-manipulation transition-colors hover:border-orange-300"
        >
          <span>
            <span className="block text-[15px] font-semibold">Read and sign your review</span>
            <span className="block text-[12.5px] text-white">
              Held {fmtReviewDate(toSign.held_on)}
              {toSign.tutor_name ? ` with ${toSign.tutor_name}` : ''}
            </span>
          </span>
          <span className="text-[13px] font-semibold text-orange-300">Open</span>
        </button>
      )}

      {upcoming ? (
        <div className="space-y-3">
          <div>
            <p className="text-[15px] font-semibold text-white">
              {upcoming.scheduled_at
                ? fmtReviewDate(upcoming.scheduled_at, true)
                : 'Date to be set'}
            </p>
            <p className="text-[13px] text-white">
              {[
                upcoming.mode && MODE_LABEL[upcoming.mode],
                upcoming.location,
                upcoming.tutor_name && `with ${upcoming.tutor_name}`,
                'and your employer',
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setViewFor(upcoming)}
              className={cn(
                buttonSecondaryCn,
                'h-11 text-[13px]',
                !upcoming.meeting_url && 'col-span-2'
              )}
            >
              {upcoming.learner_input ? 'Change your view' : 'Add your view'}
            </button>
            {upcoming.meeting_url && (
              <a
                href={upcoming.meeting_url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonSecondaryCn,
                  'inline-flex h-11 items-center justify-center text-[13px]'
                )}
              >
                Join the call
              </a>
            )}
          </div>
          {!upcoming.learner_input && (
            <p className="text-[12.5px] leading-relaxed text-white">
              Three quick questions so your tutor knows how you think it is going before you meet.
            </p>
          )}
        </div>
      ) : (
        !toSign && (
          <p className="text-[13px] leading-relaxed text-white">
            Every three months you, your tutor and your employer review how your apprenticeship is
            going. Your tutor books it; it shows here.
          </p>
        )
      )}

      {data.open_actions.length > 0 && (
        <div className="border-t border-white/[0.1] pt-4">
          <h3 className="text-sm font-semibold text-white">Agreed at your last review</h3>
          <ul className="mt-2 divide-y divide-white/[0.1]">
            {data.open_actions.map((a, i) => (
              <li key={i} className="py-2.5">
                <p className="text-[14px] text-white">{a.action}</p>
                <p className="text-[12px] text-white">
                  {OWNER_LABEL[a.owner_party]}
                  {a.due_date ? ` · by ${fmtReviewDate(a.due_date)}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {past.length > 0 && (
        <div className="border-t border-white/[0.1] pt-4">
          <h3 className="text-sm font-semibold text-white">Past reviews</h3>
          <ul className="mt-1 divide-y divide-white/[0.1]">
            {past.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => setReadFor(r)}
                  className="flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left touch-manipulation"
                >
                  <span className="text-[14px] text-white">{fmtReviewDate(r.held_on)}</span>
                  <span className="text-[12px] font-semibold text-white">
                    {r.signatures.student_signed_at
                      ? r.signatures.employer_signed_at
                        ? 'Signed by all'
                        : 'Signed'
                      : 'To sign'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <MyViewSheet
        review={viewFor}
        onOpenChange={(o) => !o && setViewFor(null)}
        onSaved={() => {
          void reload();
          notifyDoNextChanged();
        }}
      />
      <ReadAndSignSheet
        review={readFor}
        onOpenChange={(o) => !o && setReadFor(null)}
        onSigned={() => {
          void reload();
          notifyDoNextChanged();
        }}
      />
    </section>
  );
}

function MyViewSheet({
  review,
  onOpenChange,
  onSaved,
}: {
  review: MyReview | null;
  onOpenChange: (o: boolean) => void;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [progress, setProgress] = useState<ProgressView | null>(null);
  const [well, setWell] = useState('');
  const [next, setNext] = useState('');
  const [concerns, setConcerns] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const i = review?.learner_input;
    setProgress(i?.progress ?? null);
    setWell(i?.going_well ?? '');
    setNext(i?.focus_next ?? '');
    setConcerns(i?.concerns ?? '');
  }, [review]);

  const save = async () => {
    if (!review || !progress || saving) return;
    setSaving(true);
    try {
      const res = await submitLearnerReviewInput(review.id, {
        progress,
        going_well: well,
        focus_next: next,
        concerns,
      });
      if (res.error || !res.success) throw new Error(res.error ?? 'Try again.');
      toast({ title: 'Sent to your tutor' });
      onSaved();
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Not sent', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormSheet
      width="wide"
      open={!!review}
      onOpenChange={onOpenChange}
      eyebrow="Progress review"
      title="Your view"
      description="Your tutor reads this before the review. Your employer does not see it."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!progress || saving}
            className={buttonPrimaryCn}
          >
            {saving ? 'Sending…' : 'Send'}
          </button>
        </div>
      }
    >
      <div>
        <p className={labelCn}>How do you think your apprenticeship is going?</p>
        <Chips<ProgressView>
          value={progress}
          options={PROGRESS_OPTIONS}
          onChange={setProgress}
          cols={3}
        />
      </div>
      <div>
        <label className={labelCn} htmlFor="mv-well">
          What is going well?
        </label>
        <textarea
          id="mv-well"
          rows={3}
          value={well}
          onChange={(e) => setWell(e.target.value)}
          className={textareaCn}
        />
      </div>
      <div>
        <label className={labelCn} htmlFor="mv-next">
          What do you want to get better at next?
        </label>
        <textarea
          id="mv-next"
          rows={3}
          value={next}
          onChange={(e) => setNext(e.target.value)}
          className={textareaCn}
        />
      </div>
      <div>
        <label className={labelCn} htmlFor="mv-con">
          Anything worrying you? (optional)
        </label>
        <textarea
          id="mv-con"
          rows={2}
          value={concerns}
          onChange={(e) => setConcerns(e.target.value)}
          className={textareaCn}
        />
      </div>
    </FormSheet>
  );
}

function ReadAndSignSheet({
  review,
  onOpenChange,
  onSigned,
}: {
  review: MyReview | null;
  onOpenChange: (o: boolean) => void;
  onSigned: () => void;
}) {
  const { toast } = useToast();
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => setConfirm(false), [review]);
  const s = review?.summary;
  const needsSign = !!review && !review.signatures.student_signed_at;

  const sign = async () => {
    if (!review || !confirm || saving) return;
    setSaving(true);
    try {
      const res = await signReviewAsLearner(review.id);
      if (res.error || !res.success) throw new Error(res.error ?? 'Try again.');
      toast({ title: 'Signed', description: 'Your review is complete.' });
      onSigned();
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Not signed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  // The signed-off record as a PDFMonkey document (ELE-2017).
  const [pdfBusy, setPdfBusy] = useState(false);
  const downloadPdf = async () => {
    if (!review || pdfBusy) return;
    setPdfBusy(true);
    try {
      await downloadLearnerDocument({ kind: 'review_record', reviewId: review.id });
    } catch (e) {
      toast({
        title: 'Could not make the PDF',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setPdfBusy(false);
    }
  };

  const rows: Array<[string, string | null | undefined]> = [
    ['Summary', s?.summary],
    ['Progress', s?.progress],
    ['Off-the-job training', s?.otj],
    ['Training plan', s?.plan_note],
    ['Concerns', s?.concerns],
  ];

  return (
    <FormSheet
      width="wide"
      open={!!review}
      onOpenChange={onOpenChange}
      eyebrow="Progress review"
      title={review ? `Held ${fmtReviewDate(review.held_on)}` : ''}
      footer={
        needsSign ? (
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
              Later
            </button>
            <button
              type="button"
              onClick={sign}
              disabled={!confirm || saving}
              className={buttonPrimaryCn}
            >
              {saving ? 'Signing…' : 'Sign'}
            </button>
          </div>
        ) : review ? (
          <button
            type="button"
            onClick={downloadPdf}
            disabled={pdfBusy}
            className={cn(buttonSecondaryCn, 'w-full')}
          >
            {pdfBusy ? 'Making the PDF…' : 'Download the review record (PDF)'}
          </button>
        ) : undefined
      }
    >
      <dl className="space-y-4">
        {rows
          .filter(([, v]) => v && v.trim())
          .map(([l, v]) => (
            <div key={l}>
              <dt className="text-[12px] font-medium text-white">{l}</dt>
              <dd className="mt-0.5 whitespace-pre-wrap text-[15px] leading-relaxed text-white">
                {v}
              </dd>
            </div>
          ))}
      </dl>

      {s?.checked_actions && s.checked_actions.length > 0 && (
        <div className="border-t border-white/[0.1] pt-4">
          <h3 className="text-sm font-semibold text-white">From the review before</h3>
          <ul className="mt-2 divide-y divide-white/[0.1]">
            {s.checked_actions.map((a, i) => (
              <li key={i} className="py-2.5">
                <p className="text-[14px] text-white">{a.action}</p>
                <p className="text-[12px] font-semibold text-white">
                  {CHECK[a.status] ?? a.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {s?.agreed_actions && s.agreed_actions.length > 0 && (
        <div className="border-t border-white/[0.1] pt-4">
          <h3 className="text-sm font-semibold text-white">Agreed for next time</h3>
          <ul className="mt-2 divide-y divide-white/[0.1]">
            {s.agreed_actions.map((a, i) => (
              <li key={i} className="py-2.5">
                <p className="text-[14px] font-semibold text-white">{a.action}</p>
                <p className="text-[12px] text-white">
                  {OWNER_LABEL[a.owner_party]}
                  {a.due_date ? ` · by ${fmtReviewDate(a.due_date)}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {review && (
        <div className="divide-y divide-white/[0.1] border-t border-white/[0.1]">
          <SignatureLine
            party="College"
            name={review.signatures.tutor_name}
            at={review.signatures.tutor_signed_at}
            waiting="Not signed"
          />
          <SignatureLine
            party="You"
            name="Signed"
            at={review.signatures.student_signed_at}
            waiting="Your signature"
          />
          <SignatureLine
            party="Employer"
            name={review.signatures.employer_name}
            at={review.signatures.employer_signed_at}
            waiting="Sent to your employer"
          />
        </div>
      )}

      {needsSign && (
        <button
          type="button"
          onClick={() => setConfirm((v) => !v)}
          aria-pressed={confirm}
          className={cn(
            'flex w-full items-start gap-3 rounded-xl border p-4 text-left text-[15px] leading-snug text-white touch-manipulation',
            confirm ? 'border-elec-yellow' : 'border-white/[0.15]'
          )}
        >
          <span
            className={cn(
              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold',
              confirm ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
            )}
          >
            {confirm ? '✓' : ''}
          </span>
          I have read this summary and agree it is what we discussed.
        </button>
      )}
    </FormSheet>
  );
}
