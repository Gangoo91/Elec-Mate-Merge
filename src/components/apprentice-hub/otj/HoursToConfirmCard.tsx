/**
 * HoursToConfirmCard — ELE-1876 "hours stamped once".
 *
 * Off-the-job time the app already knows about, waiting for the apprentice
 * to say yes: a register marked Present, a day marked "College" in the site
 * diary, site diary training that never reached the hours record. Each row
 * says where it came from ("From your register on Tue 6 Oct, 3h"). Confirm
 * (one tap when nothing needs asking), change the length, or turn it down
 * with a reason. Nothing is counted until the apprentice confirms.
 *
 * Renders nothing when there is nothing to confirm and nothing answered
 * recently, so the hours page stays short for most apprentices.
 */
import { LC_FRAME } from '@/components/apprentice-hub/college-hub/learnerUi';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import {
  confirmOtjProposal,
  fmtProposalMinutes,
  proposalProvenance,
  rejectOtjProposal,
  reopenOtjProposal,
  type OtjProposal,
} from '@/hooks/useOtjProposals';

const cardCn = cn(LC_FRAME, 'p-4 sm:p-5');

const rowCn =
  'flex h-full flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4';

type HoursAnswer = 'in' | 'outside_paid' | 'outside_unpaid';

const REJECT_REASONS = [
  "I wasn't there",
  'I already logged it',
  'Wrong day',
  'It was not training',
];

/** One tap is safe when the server will not need to ask anything. */
function oneTap(p: OtjProposal): boolean {
  return p.source === 'register' && !!p.proposed_minutes;
}

function entryStatusLine(p: OtjProposal): { text: string; tone: 'good' | 'wait' | 'bad' } {
  if (p.status === 'rejected')
    return { text: `You turned this down: ${p.reject_reason ?? ''}`.trim(), tone: 'bad' };
  switch (p.entry_status) {
    case 'verified':
    case 'verified_by_employer':
      return { text: 'Counted', tone: 'good' };
    case 'rejected':
      return { text: 'Sent back by your tutor, fix it below', tone: 'bad' };
    default:
      return { text: 'Waiting for your tutor to sign off', tone: 'wait' };
  }
}

export function HoursToConfirmCard({
  proposals,
  loading,
  onChanged,
}: {
  proposals: OtjProposal[];
  loading?: boolean;
  /** Called after any answer, so the page can refresh its figures. */
  onChanged: () => void;
}) {
  const { toast } = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [sheet, setSheet] = useState<{ p: OtjProposal; mode: 'confirm' | 'reject' } | null>(null);
  const [showAnswered, setShowAnswered] = useState(false);

  const open = useMemo(() => proposals.filter((p) => p.status === 'proposed'), [proposals]);
  const answered = useMemo(() => proposals.filter((p) => p.status !== 'proposed'), [proposals]);
  const openMinutes = open.reduce((n, p) => n + (p.proposed_minutes ?? 0), 0);

  // /apprentice/ojt-hub#confirm (the to-do item) scrolls here.
  useEffect(() => {
    if (loading || open.length === 0) return;
    if (window.location.hash === '#confirm') {
      document.getElementById('confirm')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loading, open.length]);

  if (loading || proposals.length === 0) return null;

  const quickConfirm = async (p: OtjProposal) => {
    setBusy(p.id);
    const res = await confirmOtjProposal({ id: p.id });
    setBusy(null);
    if (res.error) {
      toast({ title: 'Not saved', description: res.error, variant: 'destructive' });
      return;
    }
    toast({
      title: res.verified
        ? `${fmtProposalMinutes(res.minutes)} added and counted`
        : 'Sent to your tutor',
      description: res.verified
        ? 'Your tutor marked the register, so it counts straight away.'
        : 'It counts once your tutor signs it off.',
    });
    onChanged();
  };

  const putBack = async (p: OtjProposal) => {
    setBusy(p.id);
    const res = await reopenOtjProposal(p.id);
    setBusy(null);
    if (res.error) {
      toast({ title: 'Not saved', description: res.error, variant: 'destructive' });
      return;
    }
    onChanged();
  };

  return (
    <section id="confirm" className={cn(cardCn, 'scroll-mt-24')} aria-label="Hours to confirm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-[17px] font-semibold tracking-tight text-white">Hours to confirm</h2>
          <p className="mt-1 text-[13px] leading-snug text-white">
            {open.length > 0
              ? 'Your register, site diary, quizzes and mocks already know about this time. Check each one: it goes on your hours when you confirm.'
              : 'All caught up. New college days, diary training, quizzes and mocks will show here.'}
          </p>
        </div>
        {open.length > 0 && (
          <div className="shrink-0 text-right">
            <p className="text-[22px] font-semibold tabular-nums text-white">
              {openMinutes > 0 ? fmtProposalMinutes(openMinutes) : open.length}
            </p>
            <p className="text-[12px] text-white">
              {openMinutes > 0 ? `${open.length} to check` : 'to check'}
            </p>
          </div>
        )}
      </div>

      {open.length > 0 && (
        <ul className="mt-4 grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2">
          {open.map((p) => (
            <li key={p.id}>
              <div className={rowCn}>
                <div className="min-w-0 space-y-1">
                  <p className="text-[14px] font-semibold leading-snug text-white">{p.title}</p>
                  <p className="text-[13px] font-medium leading-snug text-white">
                    {proposalProvenance(p)}
                  </p>
                  {p.detail && <p className="text-[12.5px] leading-snug text-white">{p.detail}</p>}
                  {!p.proposed_minutes && (
                    <p className="text-[12.5px] leading-snug text-white">
                      We don't know how long it was. Add the hours when you confirm.
                    </p>
                  )}
                  {p.same_day_minutes > 0 && (
                    <p className="rounded-xl border border-orange-400/60 px-3 py-2 text-[12.5px] leading-snug text-orange-300">
                      You already have {fmtProposalMinutes(p.same_day_minutes)} logged on this day.
                      Only confirm if this is different time.
                    </p>
                  )}
                </div>
                <div className="mt-auto grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    disabled={busy === p.id}
                    onClick={() =>
                      oneTap(p) ? void quickConfirm(p) : setSheet({ p, mode: 'confirm' })
                    }
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-elec-yellow px-2 text-[13px] font-semibold text-elec-yellow transition-colors touch-manipulation hover:bg-elec-yellow hover:text-black disabled:opacity-40"
                  >
                    {busy === p.id ? 'Saving…' : 'Confirm'}
                  </button>
                  <button
                    type="button"
                    disabled={busy === p.id}
                    onClick={() => setSheet({ p, mode: 'confirm' })}
                    className={cn(buttonSecondaryCn, 'h-11 px-2 text-[13px]')}
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    disabled={busy === p.id}
                    onClick={() => setSheet({ p, mode: 'reject' })}
                    className={cn(buttonSecondaryCn, 'h-11 px-2 text-[13px]')}
                  >
                    Not right
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {answered.length > 0 && (
        <div className="mt-4 border-t border-white/[0.1] pt-3">
          <button
            type="button"
            onClick={() => setShowAnswered((s) => !s)}
            aria-expanded={showAnswered}
            className="flex min-h-11 w-full items-center justify-between text-left text-[13px] font-semibold text-white touch-manipulation"
          >
            <span>Answered recently ({answered.length})</span>
            <span>{showAnswered ? 'Hide' : 'Show'}</span>
          </button>
          {showAnswered && (
            <ul className="mt-1 grid grid-cols-1 gap-x-6 lg:grid-cols-2">
              {answered.map((p) => {
                const s = entryStatusLine(p);
                return (
                  <li
                    key={p.id}
                    className="flex items-start justify-between gap-3 border-b border-white/[0.08] py-3 last:border-b-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] font-semibold text-white">{p.title}</p>
                      <p className="text-[12.5px] leading-snug text-white">
                        {proposalProvenance(p)}
                      </p>
                      <p
                        className={cn(
                          'mt-0.5 text-[12.5px] font-medium leading-snug',
                          s.tone === 'good' && 'text-emerald-400',
                          s.tone === 'wait' && 'text-sky-300',
                          s.tone === 'bad' && 'text-orange-300'
                        )}
                      >
                        {s.text}
                      </p>
                    </div>
                    {p.status === 'rejected' && (
                      <button
                        type="button"
                        disabled={busy === p.id}
                        onClick={() => void putBack(p)}
                        className={cn(buttonSecondaryCn, 'h-11 w-auto shrink-0 px-3 text-[12.5px]')}
                      >
                        Put back
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      <ProposalSheet
        state={sheet}
        onOpenChange={(o) => !o && setSheet(null)}
        onDone={() => {
          setSheet(null);
          onChanged();
        }}
      />
    </section>
  );
}

function ProposalSheet({
  state,
  onOpenChange,
  onDone,
}: {
  state: { p: OtjProposal; mode: 'confirm' | 'reject' } | null;
  onOpenChange: (o: boolean) => void;
  onDone: () => void;
}) {
  const { toast } = useToast();
  const p = state?.p ?? null;
  const [mode, setMode] = useState<'confirm' | 'reject'>('confirm');
  const [hours, setHours] = useState('');
  const [answer, setAnswer] = useState<HoursAnswer | null>(null);
  const [note, setNote] = useState('');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!state) return;
    setMode(state.mode);
    setHours(state.p.proposed_minutes ? String(+(state.p.proposed_minutes / 60).toFixed(2)) : '');
    // College is day release in paid hours; anything else, the apprentice says.
    setAnswer(state.p.source === 'register' ? 'in' : null);
    setNote('');
    setReason('');
  }, [state]);

  if (!p) return null;

  const minutes = Math.round(parseFloat(hours || '0') * 60);
  const validMinutes = minutes >= 1 && minutes <= 1440;
  const countsNow =
    p.source === 'register' &&
    !!p.proposed_minutes &&
    validMinutes &&
    minutes <= p.proposed_minutes;
  const presets = Array.from(
    new Set([p.proposed_minutes ? p.proposed_minutes / 60 : null, 1, 2, 3, 6, 7.5].filter(Boolean))
  ) as number[];

  const save = async () => {
    if (!p) return;
    setSaving(true);
    const res =
      mode === 'reject'
        ? await rejectOtjProposal(p.id, reason)
        : await confirmOtjProposal({
            id: p.id,
            minutes,
            inWorkingHours: answer === 'in',
            outsideHoursCompensated: answer === 'outside_paid',
            note: note.trim() || null,
          });
    setSaving(false);
    if (res.error) {
      toast({ title: 'Not saved', description: res.error, variant: 'destructive' });
      return;
    }
    toast(
      mode === 'reject'
        ? { title: 'Turned down', description: 'It stays out of your hours. You can put it back.' }
        : res.verified
          ? {
              title: `${fmtProposalMinutes(res.minutes)} added and counted`,
              description: 'Your tutor marked the register, so it counts straight away.',
            }
          : { title: 'Sent to your tutor', description: 'It counts once your tutor signs it off.' }
    );
    onDone();
  };

  const canSave =
    mode === 'reject'
      ? reason.trim().length >= 3
      : validMinutes && (answer === 'in' || answer === 'outside_paid');

  return (
    <FormSheet
      width="wide"
      open={!!state}
      onOpenChange={onOpenChange}
      eyebrow={mode === 'reject' ? 'Not right' : 'Confirm hours'}
      title={p.title}
      description={proposalProvenance(p)}
      bodyClassName="lg:grid lg:grid-cols-[1fr_380px] lg:gap-8 lg:space-y-0"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving || !canSave}
            className={buttonPrimaryCn}
          >
            {saving ? 'Saving…' : mode === 'reject' ? 'Turn down' : 'Confirm'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2">
          {(['confirm', 'reject'] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                chipBase,
                'inline-flex h-11 items-center justify-center',
                mode === m ? chipOn : chipOff
              )}
            >
              {m === 'confirm' ? 'It happened' : 'Not right'}
            </button>
          ))}
        </div>

        {mode === 'confirm' ? (
          <>
            <div>
              <label className={labelCn} htmlFor="otj-proposal-hours">
                How long was it? (hours)
              </label>
              <div className="mb-2 flex flex-wrap gap-2">
                {presets.map((h) => {
                  const on = Math.round(h * 60) === minutes;
                  return (
                    <button
                      key={h}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setHours(String(h))}
                      className={cn(
                        chipBase,
                        'inline-flex h-11 items-center px-4',
                        on ? chipOn : chipOff
                      )}
                    >
                      {fmtProposalMinutes(Math.round(h * 60))}
                    </button>
                  );
                })}
              </div>
              <input
                id="otj-proposal-hours"
                type="number"
                inputMode="decimal"
                min={0.25}
                max={24}
                step={0.25}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g. 3"
                className={inputCn}
              />
            </div>

            <div>
              <p className={labelCn}>When was it?</p>
              <div className="space-y-2">
                {(
                  [
                    ['in', 'In my normal paid working hours'],
                    [
                      'outside_paid',
                      'Outside my hours, agreed with my employer and paid back (time off or extra pay)',
                    ],
                    ['outside_unpaid', 'In my own time, not paid back'],
                  ] as Array<[HoursAnswer, string]>
                ).map(([value, label]) => {
                  const on = answer === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setAnswer(value)}
                      className={cn(
                        'flex min-h-11 w-full items-center rounded-xl border px-3.5 py-2.5 text-left text-[13px] leading-snug touch-manipulation',
                        on
                          ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                          : 'border-white/[0.12] bg-white/[0.06] text-white'
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
                {answer === 'outside_unpaid' && (
                  <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-2.5 text-[13px] leading-snug text-orange-300">
                    Training in your own time that you were not paid back for does not count as
                    off-the-job training. Talk to your employer: if they agree to give you time off
                    in lieu or extra pay, it can count.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className={labelCn} htmlFor="otj-proposal-note">
                Anything your tutor should know? (optional)
              </label>
              <textarea
                id="otj-proposal-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={1000}
                placeholder="e.g. Left at 2pm for a site visit"
                className={textareaCn}
              />
            </div>
          </>
        ) : (
          <div>
            <p className={labelCn}>Why is it not right?</p>
            <div className="mb-3 flex flex-wrap gap-2">
              {REJECT_REASONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  aria-pressed={reason === r}
                  onClick={() => setReason(r)}
                  className={cn(
                    chipBase,
                    'inline-flex h-11 items-center px-4',
                    reason === r ? chipOn : chipOff
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Say why, in a few words"
              aria-label="Reason"
              className={textareaCn}
            />
          </div>
        )}
      </div>

      <aside className="mt-5 space-y-3 rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 lg:mt-0">
        <p className="text-[13px] font-semibold text-white">Where this came from</p>
        <p className="text-[13px] font-medium leading-snug text-white">{proposalProvenance(p)}</p>
        {p.detail && <p className="text-[12.5px] leading-snug text-white">{p.detail}</p>}
        <div className="border-t border-white/[0.1] pt-3 text-[12.5px] leading-snug text-white">
          {mode === 'reject'
            ? 'Turning it down keeps it out of your hours. Your tutor sees your reason. You can put it back later.'
            : countsNow
              ? 'Counts straight away: your tutor marked the register, so that is the proof.'
              : p.source === 'register' && p.proposed_minutes && validMinutes
                ? 'More than the lesson length, so it goes to your tutor to sign off first.'
                : 'Goes to your tutor to sign off. It counts once they do.'}
        </div>
      </aside>
    </FormSheet>
  );
}
