import { useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useToast } from '@/hooks/use-toast';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { LeaveOutSheet } from '@/components/college/otj/LeaveOutSheet';
import {
  approveAppLearning,
  undoAppLearningDecision,
  fetchLearnerAppDays,
  fetchOtjStatementLink,
  otjStatementLink,
  prepareOtjHoursStatement,
  useAppLearningBreakdown,
  useOtjHoursStatement,
  useOtjSummary,
  type AppLearningDay,
  type OtjHoursStatement,
  type OtjSummary,
} from '@/hooks/useOtjSummary';

/* ==========================================================================
   OtjStaffOverview — the top of Student 360's off-the-job section.

   The same figures the learner and employer see (get_otj_summary), the time
   the app recorded while they learned (by area, with one-tap approval), and
   the planned-versus-actual statement the funding rules require when fewer
   hours were delivered than planned (paras 92–94).

   Replaces a "Logged this week" ring judged against "the 6h weekly minimum"
   (not the rule since August 2025) and a totals card that counted every
   entry whatever its status.
   ========================================================================== */

const CARD = cn('overflow-hidden -mx-4 border-y border-white/[0.08] sm:mx-0 sm:rounded-3xl sm:border-x', CARD_SURFACE);

const fmtH = (h: number | null | undefined) => {
  const v = Number(h ?? 0);
  if (!Number.isFinite(v) || v <= 0) return '0h';
  if (v < 1) return `${Math.round(v * 60)}m`;
  return v < 10
    ? `${v.toFixed(1).replace(/\.0$/, '')}h`
    : `${Math.round(v).toLocaleString('en-GB')}h`;
};
const fmtMins = (m: number) =>
  m < 60 ? `${m}m` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ''}`;
const fmtDay = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
const fmtDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

export function OtjStaffOverview({ userId, studentName }: { userId: string; studentName: string }) {
  const { toast } = useToast();
  const { data: s, refresh: refreshSummary } = useOtjSummary(userId);
  const { data: breakdown, refresh: refreshBreakdown } = useAppLearningBreakdown(userId, 30);
  const { data: statement, refresh: refreshStatement } = useOtjHoursStatement(userId);
  const [days, setDays] = useState<AppLearningDay[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [showDays, setShowDays] = useState(false);
  const [statementOpen, setStatementOpen] = useState(false);
  const [leaveOut, setLeaveOut] = useState<AppLearningDay | null>(null);
  const first = studentName.split(' ')[0] || 'This learner';

  const loadDays = useCallback(async () => {
    try {
      setDays(await fetchLearnerAppDays(userId));
    } catch {
      setDays([]);
    }
  }, [userId]);
  useEffect(() => {
    void loadDays();
  }, [loadDays]);

  const waitingMinutes = days.reduce((n, d) => n + d.minutes, 0);
  const required = s?.required_hours ?? 0;
  const pct = required > 0 ? Math.min(100, ((s?.counted_hours ?? 0) / required) * 100) : 0;
  const plannedPct =
    required > 0 && s?.planned_to_date_hours != null
      ? Math.min(100, (s.planned_to_date_hours / required) * 100)
      : null;
  const areas = (breakdown?.areas ?? []).filter((a) => a.minutes > 0);
  const maxArea = Math.max(1, ...areas.map((a) => a.minutes));

  const approve = async (key: string, ids?: string[]) => {
    setBusy(key);
    const res = await approveAppLearning([userId], ids);
    setBusy(null);
    if (res.error || !res.success) {
      toast({
        title: 'Not approved',
        description: res.error ?? 'Try again.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: `${fmtH(res.hours)} approved`,
      description: `${first}'s app learning is now verified with your name.`,
      duration: 8000,
      action: res.entry_ids?.length
        ? {
            label: 'Undo',
            onClick: () => {
              void undoAppLearningDecision(res.entry_ids ?? []).then((ok) => {
                if (ok) void Promise.all([refreshSummary(), refreshBreakdown(), loadDays()]);
              });
            },
          }
        : undefined,
    });
    void Promise.all([refreshSummary(), refreshBreakdown(), loadDays()]);
  };

  const riskWord =
    s?.risk === 'on_track'
      ? 'On track'
      : s?.risk === 'slightly_behind'
        ? 'Just behind'
        : s?.risk === 'behind'
          ? 'Behind'
          : 'No programme dates';

  return (
    <div className="space-y-3">
      {/* Figures */}
      <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-white">Counted towards the standard</p>
            <p className="mt-1 text-[28px] font-bold leading-none tabular-nums text-white">
              {fmtH(s?.counted_hours)}
              <span className="ml-1.5 text-[14px] font-medium">
                of {Math.round(required).toLocaleString('en-GB')}h
              </span>
            </p>
          </div>
          <span
            className={cn(
              'text-[12.5px] font-semibold',
              s?.risk === 'behind'
                ? 'text-red-300'
                : s?.risk === 'on_track'
                  ? 'text-elec-yellow'
                  : 'text-white'
            )}
          >
            {riskWord}
          </span>
        </div>
        <div className="relative mt-4">
          <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.10]">
            <div className="h-full rounded-full bg-elec-yellow" style={{ width: `${pct}%` }} />
          </div>
          {plannedPct != null && plannedPct > 0 && (
            <div
              className="absolute -top-1 h-[18px] w-[2px] rounded bg-white"
              style={{ left: `calc(${plannedPct}% - 1px)` }}
            />
          )}
        </div>
        <p className="mt-2 text-[12px] text-white">
          {s?.planned_to_date_hours != null
            ? `Planned by today: ${fmtH(s.planned_to_date_hours)}`
            : 'Add programme dates to see the planned line'}
          {s?.forecast_at_end_hours != null && s.end_date
            ? ` · On this pace ${fmtH(s.forecast_at_end_hours)} by ${fmtDate(s.end_date)}`
            : ''}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            ['Approved or verified', fmtH(s?.verified_hours)],
            ['App learning to approve', fmtH(s?.app_learning_hours)],
            ['Waiting in sign-off inbox', fmtH(s?.pending_hours)],
            ['App learning this week', fmtH(s?.app_learning_this_week_hours)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/[0.12] p-3">
              <p className="text-[11.5px] text-white">{label}</p>
              <p className="mt-1 text-[17px] font-semibold tabular-nums text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* App learning */}
      <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-white">
              Learning in the app, last 30 days
            </p>
            <p className="mt-0.5 text-[12px] text-white">
              Recorded automatically and counting. Approving it marks it verified with your name.
            </p>
          </div>
          <p className="shrink-0 text-[17px] font-semibold tabular-nums text-elec-yellow">
            {fmtMins(breakdown?.total_minutes ?? 0)}
          </p>
        </div>
        {(breakdown?.quiz_minutes ?? 0) > 0 && (
          <p className="mt-2 text-[12px] leading-snug text-white">
            Includes {fmtMins(breakdown?.quiz_minutes ?? 0)} of quizzes and mocks, timed per
            attempt. These reach the hours only when the learner confirms them, then come to you
            to verify.
          </p>
        )}
        {areas.length === 0 ? (
          <p className="mt-3 text-[13px] text-white">No app learning in the last 30 days.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {areas.map((a) => (
              <li key={a.area} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-[12.5px] text-white">{a.area}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                  <span
                    className="block h-full rounded-full bg-elec-yellow"
                    style={{ width: `${(a.minutes / maxArea) * 100}%` }}
                  />
                </span>
                <span className="w-14 shrink-0 text-right text-[12.5px] font-semibold tabular-nums text-white">
                  {fmtMins(a.minutes)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.10] pt-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setShowDays((v) => !v)}
            disabled={days.length === 0}
            className="h-11 text-left text-[12.5px] font-semibold text-white touch-manipulation disabled:opacity-60"
          >
            {days.length === 0
              ? 'Nothing waiting for approval'
              : showDays
                ? 'Hide days'
                : `${days.length} ${days.length === 1 ? 'day' : 'days'} waiting · ${fmtMins(waitingMinutes)}`}
          </button>
          {days.length > 0 && (
            <button
              type="button"
              // Exactly the days listed (the last 90), so the button's figure
              // is what gets approved.
              onClick={() =>
                approve(
                  'all',
                  days.flatMap((d) => d.time_entry_ids)
                )
              }
              disabled={busy !== null}
              className={cn(buttonPrimaryCn, 'h-11 sm:w-auto sm:px-5')}
            >
              {busy === 'all' ? 'Approving…' : `Approve ${fmtMins(waitingMinutes)}`}
            </button>
          )}
        </div>
        {showDays && days.length > 0 && (
          <ul className="mt-2 divide-y divide-white/[0.10] rounded-xl border border-white/[0.12]">
            {days.map((d) => (
              <li key={d.day} className="flex items-start gap-3 px-3.5 py-3">
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between gap-3">
                    <span className="text-[13.5px] font-semibold text-white">{fmtDay(d.day)}</span>
                    <span className="text-[13px] font-semibold tabular-nums text-white">
                      {fmtMins(d.minutes)}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-white">
                    {d.activities
                      .slice(0, 4)
                      .map((a) => `${a.activity} · ${fmtMins(a.minutes)}`)
                      .join('  ·  ')}
                  </span>
                </span>
                <span className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setLeaveOut(d)}
                    disabled={busy !== null}
                    className="h-11 rounded-xl px-2.5 text-[12.5px] font-semibold text-white touch-manipulation disabled:opacity-60"
                  >
                    Leave out
                  </button>
                  <button
                    type="button"
                    onClick={() => approve(d.day, d.time_entry_ids)}
                    disabled={busy !== null}
                    className="h-11 rounded-xl border border-white/[0.14] px-3 text-[12.5px] font-semibold text-white touch-manipulation disabled:opacity-60"
                  >
                    {busy === d.day ? '…' : 'Approve'}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Planned-versus-actual statement */}
      <StatementCard
        statement={statement}
        summary={s}
        first={first}
        onPrepare={() => setStatementOpen(true)}
      />

      <LeaveOutSheet
        open={!!leaveOut}
        onOpenChange={(o) => !o && setLeaveOut(null)}
        userId={userId}
        learnerName={first}
        dayLabel={leaveOut ? fmtDay(leaveOut.day) : ''}
        minutesLabel={leaveOut ? fmtMins(leaveOut.minutes) : ''}
        timeEntryIds={leaveOut?.time_entry_ids ?? []}
        onDone={() => void Promise.all([refreshSummary(), refreshBreakdown(), loadDays()])}
      />

      <PrepareStatementSheet
        open={statementOpen}
        onOpenChange={setStatementOpen}
        userId={userId}
        summary={s}
        first={first}
        onPrepared={() => void refreshStatement()}
      />
    </div>
  );
}

function StatementCard({
  statement,
  summary,
  first,
  onPrepare,
}: {
  statement: OtjHoursStatement | null;
  summary: OtjSummary | null;
  first: string;
  onPrepare: () => void;
}) {
  const { toast } = useToast();
  const copy = async () => {
    if (!statement) return;
    const link = await fetchOtjStatementLink(statement.id);
    if (!link) {
      toast({ title: 'Could not get the link', description: 'Try again.', variant: 'destructive' });
      return;
    }
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: 'Employer link copied',
        description: 'Send it to their employer to read and sign.',
      });
    } catch {
      toast({ title: 'Employer link', description: link });
    }
  };
  const done = !!statement?.learner_signed_at && !!statement?.employer_signed_at;
  // The statement as a PDFMonkey document for the evidence pack (ELE-2017).
  const [pdfBusy, setPdfBusy] = useState(false);
  const downloadPdf = async () => {
    if (!statement || pdfBusy) return;
    setPdfBusy(true);
    try {
      await downloadLearnerDocument({ kind: 'otj_statement', statementId: statement.id });
    } catch (e) {
      toast({ title: 'Could not make the PDF', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-semibold text-white">
            Planned versus actual hours statement
          </p>
          <p className="mt-0.5 text-[12px] leading-snug text-white">
            Needed when fewer hours are delivered than were planned. Signed by {first} and their
            employer, in the evidence pack within 12 weeks of completion (funding rules 92 to 94).
          </p>
        </div>
      </div>
      {statement ? (
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              ['Planned', fmtH(statement.planned_hours)],
              ['Delivered', fmtH(statement.actual_hours)],
              ['Minimum', statement.minimum_hours != null ? fmtH(statement.minimum_hours) : '—'],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl border border-white/[0.12] p-2.5">
                <p className="text-[11.5px] text-white">{l}</p>
                <p className="text-[15px] font-semibold tabular-nums text-white">{v}</p>
              </div>
            ))}
          </div>
          <p className="text-[12.5px] text-white">
            {statement.minimum_met ? 'Minimum met.' : 'Minimum not met yet.'} Prepared by{' '}
            {statement.prepared_by_name} on {fmtDate(statement.prepared_at)}.
          </p>
          <p className="text-[12.5px] text-white">
            {first}:{' '}
            {statement.learner_signed_at
              ? `signed ${fmtDate(statement.learner_signed_at)}`
              : 'not signed yet'}{' '}
            · Employer:{' '}
            {statement.employer_signed_at
              ? `signed by ${statement.employer_signed_name}, ${statement.employer_company}`
              : 'not signed yet'}
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={copy}
              disabled={done}
              className={cn(buttonSecondaryCn, 'h-11')}
            >
              Copy employer link
            </button>
            <button type="button" onClick={onPrepare} className={cn(buttonSecondaryCn, 'h-11')}>
              Prepare a new one
            </button>
            <button
              type="button"
              onClick={downloadPdf}
              disabled={pdfBusy}
              className={cn(buttonSecondaryCn, 'col-span-2 h-11')}
            >
              {pdfBusy ? 'Making the PDF…' : 'Download statement (PDF)'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-[12.5px] text-white">
            {summary?.required_hours
              ? `${fmtH(summary.counted_hours)} delivered so far.`
              : 'No statement yet.'}
          </p>
          <button
            type="button"
            onClick={onPrepare}
            className={cn(buttonSecondaryCn, 'h-11 w-auto px-4')}
          >
            Prepare statement
          </button>
        </div>
      )}
    </div>
  );
}

function PrepareStatementSheet({
  open,
  onOpenChange,
  userId,
  summary,
  first,
  onPrepared,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  userId: string;
  summary: OtjSummary | null;
  first: string;
  onPrepared: () => void;
}) {
  const { toast } = useToast();
  const [planned, setPlanned] = useState('');
  const [rpl, setRpl] = useState('0');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setPlanned(summary?.required_hours ? String(Math.round(summary.required_hours)) : '');
      setRpl('0');
      setReason('');
    }
  }, [open, summary?.required_hours]);

  const actual = summary?.counted_hours ?? 0;
  const minimum = useMemo(() => {
    const req = summary?.required_hours;
    if (!req) return null;
    return Math.max(187, req - (Number(rpl) || 0));
  }, [summary?.required_hours, rpl]);
  const plannedNum = Number(planned) || 0;
  const valid = plannedNum > 0 && reason.trim().length >= 10;

  const submit = async () => {
    if (!valid || saving) return;
    setSaving(true);
    const res = await prepareOtjHoursStatement(userId, plannedNum, reason.trim(), Number(rpl) || 0);
    setSaving(false);
    if (res.error || !res.success) {
      toast({
        title: 'Not prepared',
        description: res.error ?? 'Try again.',
        variant: 'destructive',
      });
      return;
    }
    if (res.employer_token) {
      try {
        await navigator.clipboard.writeText(otjStatementLink(res.employer_token));
      } catch {
        /* the card offers the copy button too */
      }
    }
    toast({
      title: 'Statement prepared',
      description: `${first} has been asked to sign it. The employer link is copied, ready to send.`,
    });
    onPrepared();
    onOpenChange(false);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Funding rules 92 to 94"
      title="Planned versus actual hours"
      description={`Uses ${first}'s figures as they stand today. Once prepared it cannot be edited; prepare a new one if anything changes.`}
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
            onClick={submit}
            disabled={!valid || saving}
            className={buttonPrimaryCn}
          >
            {saving ? 'Preparing…' : 'Prepare and copy link'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            ['Delivered', fmtH(actual)],
            ['Minimum', minimum != null ? fmtH(minimum) : '—'],
            ['Minimum met', minimum != null ? (actual >= minimum ? 'Yes' : 'No') : '—'],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-white/[0.12] p-3">
              <p className="text-[11.5px] text-white">{l}</p>
              <p className="mt-1 text-[16px] font-semibold tabular-nums text-white">{v}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCn} htmlFor="stmt-planned">
              Planned hours agreed with the employer
            </label>
            <input
              id="stmt-planned"
              type="number"
              inputMode="numeric"
              value={planned}
              onChange={(e) => setPlanned(e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="stmt-rpl">
              Prior learning hours (if any)
            </label>
            <input
              id="stmt-rpl"
              type="number"
              inputMode="numeric"
              value={rpl}
              onChange={(e) => setRpl(e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        <div>
          <label className={labelCn} htmlFor="stmt-reason">
            Why fewer hours were delivered than planned
          </label>
          <textarea
            id="stmt-reason"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Competent earlier than planned after strong progress in year two, agreed at the March progress review."
            className={cn(textareaCn, 'w-full resize-none')}
          />
        </div>
        <p className="text-[12.5px] leading-relaxed text-white">
          The minimum is the standard&apos;s published hours less any evidenced prior learning, and
          never below 187 hours.
        </p>
      </div>
    </FormSheet>
  );
}
