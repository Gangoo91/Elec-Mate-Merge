/**
 * MoveCollegeSheet (ELE-1882)
 *
 * A learner changing college or provider moves in one step: the new college's
 * join code, a preview of exactly what happens, one tap. The record stays on
 * the learner (decisions, witness statements, hours, evidence, audit trail);
 * the old college's roll row is archived as Transferred and they can no longer
 * see the live record; the old college's assessors lose access; independent
 * assessors and share links carry on. move_to_new_college does it in one
 * transaction, so nothing half-happens.
 *
 * Opened from the join page when the code belongs to another college, and from
 * the learner's college card.
 */
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormSheet } from '@/components/forms/FormSheet';
import { cn } from '@/lib/utils';
import {
  cleanJoinCode,
  moveToNewCollege,
  previewCollegeMove,
  PENDING_INVITE_KEY,
  type CollegeMovePreview,
  type CollegeMoveResult,
} from '@/lib/collegeInvite';
import { storageRemoveSync } from '@/utils/storage';
import { invalidateMyCollegeContext } from '@/hooks/useMyCollegeContext';

const BTN_PRIMARY =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow px-4 text-[15px] font-semibold text-black touch-manipulation active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white';
const BTN =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.18] px-4 text-[15px] font-semibold text-white touch-manipulation hover:border-white/[0.4]';
const INPUT =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 font-mono text-[20px] uppercase tracking-[0.2em] text-white placeholder:text-white/70 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';
const LIST =
  '-mx-4 divide-y divide-white/[0.08] border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x';

const n = (v: number | undefined, one: string, many: string) =>
  `${v ?? 0} ${(v ?? 0) === 1 ? one : many}`;

export function MoveCollegeSheet({
  open,
  onOpenChange,
  initialCode,
  onMoved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** The new college's join code, when the learner arrived with one. */
  initialCode?: string;
  onMoved?: (res: CollegeMoveResult) => void;
}) {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'code' | 'preview' | 'done'>('code');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<CollegeMovePreview | null>(null);
  const [result, setResult] = useState<CollegeMoveResult | null>(null);

  const check = async (c: string) => {
    const clean = cleanJoinCode(c);
    if (clean.length < 4) {
      setError('Enter the code your new college gave you.');
      return;
    }
    setBusy(true);
    setError(null);
    const p = await previewCollegeMove(clean);
    setBusy(false);
    if (p.error) {
      setError(p.message ?? 'That code does not work. Check it with your new college.');
      setStep('code');
      return;
    }
    setPreview(p);
    setStep('preview');
  };

  useEffect(() => {
    if (!open) return;
    setResult(null);
    setPreview(null);
    setError(null);
    setStep('code');
    const c = cleanJoinCode(initialCode);
    setCode(c);
    if (c.length >= 4) void check(c);
  }, [open, initialCode]);

  const move = async () => {
    setBusy(true);
    setError(null);
    const res = await moveToNewCollege(code);
    setBusy(false);
    if (!res.success) {
      setError(res.message ?? 'The move did not go through. Nothing has changed.');
      return;
    }
    storageRemoveSync(PENDING_INVITE_KEY);
    invalidateMyCollegeContext();
    setResult(res);
    setStep('done');
    onMoved?.(res);
  };

  const from = preview?.from?.map((f) => f.college_name ?? 'your current college').join(' and ');
  const to = preview?.to_college_name ?? 'your new college';
  const c = preview?.carried;
  const ending = preview?.links_ending ?? [];

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Your college"
      title={
        step === 'done'
          ? `You are with ${result?.to_college_name ?? to}`
          : step === 'preview' && preview?.moving
            ? `Move to ${to}`
            : 'Moving college?'
      }
      description={
        step === 'done'
          ? 'Your whole record came with you.'
          : step === 'preview' && preview?.moving
            ? `From ${from}. Your record moves with you and nothing is deleted.`
            : 'Enter the join code from your new college. You see exactly what happens before anything changes.'
      }
      footer={
        step === 'code' ? (
          <button
            type="button"
            className={BTN_PRIMARY}
            disabled={busy}
            onClick={() => void check(code)}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Check the code
          </button>
        ) : step === 'preview' ? (
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <button type="button" className={BTN} onClick={() => setStep('code')} disabled={busy}>
              Back
            </button>
            <button
              type="button"
              className={BTN_PRIMARY}
              disabled={busy}
              onClick={() => void move()}
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {preview?.moving ? 'Move my record' : `Join ${to}`}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={BTN_PRIMARY}
            onClick={() => {
              onOpenChange(false);
              navigate('/apprentice/college-plan');
            }}
          >
            Open my college plan
          </button>
        )
      }
    >
      {step === 'code' && (
        <div className="grid grid-cols-1 gap-8 py-2 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-3">
            <label htmlFor="move-code" className="block text-[12px] font-medium text-white">
              New college's join code
            </label>
            <input
              id="move-code"
              className={INPUT}
              autoCapitalize="characters"
              autoComplete="off"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void check(code);
              }}
            />
            {error && (
              <p role="alert" className="text-[14px] text-red-300">
                {error}
              </p>
            )}
          </div>
          <div className="space-y-3 text-[14px] leading-snug text-white">
            <h3 className="text-[15px] font-semibold text-white">What moving does</h3>
            <p>
              Every decision, witness statement, hour and piece of evidence stays on your record and
              goes to the new college.
            </p>
            <p>
              Your current college stops seeing your record. Their copy of your place is kept as
              Transferred.
            </p>
            <p>
              College closed, or no new college yet? Your record is yours either way. You can invite
              an independent assessor from Progress and assessment.
            </p>
          </div>
        </div>
      )}

      {step === 'preview' && preview && (
        <div className="grid grid-cols-1 gap-8 py-2 lg:grid-cols-2 lg:gap-10">
          <section aria-labelledby="move-carried" className="space-y-3">
            <h3 id="move-carried" className="text-[15px] font-semibold text-white">
              Comes with you
            </h3>
            <ul className={LIST}>
              {[
                n(c?.decisions, 'assessor decision', 'assessor decisions'),
                n(c?.witness_statements, 'signed witness statement', 'signed witness statements'),
                `${n(c?.otj_entries, 'hours entry', 'hours entries')}, ${c?.otj_verified_hours ?? 0} verified hours`,
                n(c?.evidence_items, 'piece of evidence', 'pieces of evidence'),
                n(c?.audit_events, 'audit trail event', 'audit trail events'),
              ].map((line) => (
                <li key={line} className="px-4 py-3 text-[14px] text-white sm:px-5">
                  {line}
                </li>
              ))}
            </ul>
            {preview.moving && (
              <p className="text-[13px] leading-snug text-white">
                {to} sees each earlier decision marked with the college that made it.
              </p>
            )}
          </section>

          <section aria-labelledby="move-changes" className="space-y-3">
            <h3 id="move-changes" className="text-[15px] font-semibold text-white">
              What changes
            </h3>
            <ul className={LIST}>
              <li className="px-4 py-3 text-[14px] text-white sm:px-5">
                You join {to}
                {preview.to_cohort_name ? `, ${preview.to_cohort_name}` : ''}.
              </li>
              {preview.moving && (
                <li className="px-4 py-3 text-[14px] text-white sm:px-5">
                  {from} can no longer see your record. Your hours there are counted up to today.
                </li>
              )}
              {ending.length > 0 && (
                <li className="px-4 py-3 text-[14px] text-white sm:px-5">
                  {ending.length === 1 ? 'This assessor' : `These ${ending.length} assessors`} from{' '}
                  {from} {ending.length === 1 ? 'loses' : 'lose'} access:{' '}
                  {ending.map((l) => l.name ?? 'Assessor').join(', ')}.
                </li>
              )}
              {((preview.links_kept ?? 0) > 0 ||
                (preview.shares_kept ?? 0) > 0 ||
                (preview.witness_requests_kept ?? 0) > 0) && (
                <li className="px-4 py-3 text-[14px] text-white sm:px-5">
                  Still working:{' '}
                  {[
                    (preview.links_kept ?? 0) > 0 &&
                      n(preview.links_kept, 'independent assessor', 'independent assessors'),
                    (preview.shares_kept ?? 0) > 0 &&
                      n(preview.shares_kept, 'share link', 'share links'),
                    (preview.witness_requests_kept ?? 0) > 0 &&
                      n(preview.witness_requests_kept, 'witness request', 'witness requests'),
                  ]
                    .filter(Boolean)
                    .join(', ')}
                  .
                </li>
              )}
            </ul>
            {error && (
              <p role="alert" className="text-[14px] text-red-300">
                {error}
              </p>
            )}
          </section>
        </div>
      )}

      {step === 'done' && result && (
        <div className="space-y-3 py-2">
          <ul className={cn(LIST, 'max-w-xl')}>
            <li className="px-4 py-3 text-[14px] text-white sm:px-5">
              {[result.college_name ?? result.to_college_name, result.cohort_name]
                .filter(Boolean)
                .join(', ')}
              {result.tutor_name ? `. Tutor ${result.tutor_name}` : ''}
            </li>
            {result.moved && (
              <li className="px-4 py-3 text-[14px] text-white sm:px-5">
                {result.from_college_name ?? 'Your previous college'} no longer sees your record.
              </li>
            )}
            <li className="px-4 py-3 text-[14px] text-white sm:px-5">
              {n(result.carried?.decisions, 'decision', 'decisions')},{' '}
              {n(result.carried?.witness_statements, 'witness statement', 'witness statements')} and{' '}
              {result.carried?.otj_verified_hours ?? 0} verified hours came with you.
            </li>
          </ul>
        </div>
      )}
    </FormSheet>
  );
}

export default MoveCollegeSheet;
