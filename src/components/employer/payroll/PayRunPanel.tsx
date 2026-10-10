/**
 * The one pay run (gap #4). Finance > Accounting > Send to payroll, and the
 * Timesheets "Pay run" button opens it.
 *
 * Approved hours, overtime, holiday hours and pay (12.07% accrual for
 * irregular-hours staff, rolled-up pay where set), SSP days and pay, mileage
 * and expenses, checked against the minimum wage for each person's age or
 * apprentice status, then laid out for the firm's payroll software.
 *
 * Sending is one database call (send_pay_run): it re-checks the minimum wage
 * on the rows sent, stamps them so nothing goes twice, and writes the 6-year
 * holiday record in the same transaction.
 *
 * Subcontractors never go in this file. SubbiesPanel shows them separately,
 * paid by self-bill statement with CIS, with their own CIS file.
 *
 * Money: owner/admin only (can_see_firm_money, enforced in SQL). Office
 * managers send an hours-only file and never see a rate or a £.
 */
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  differenceInCalendarDays,
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { CheckCircle2, ExternalLink, FileSpreadsheet, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  PrimaryButton,
  SecondaryButton,
  StatStrip,
  textareaClass,
} from '@/components/employer/editorial';
import {
  KeyValue,
  PanelHead,
  Row,
  StatusPill,
  panel,
  rowsClass,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { FormSheet } from '@/components/forms/FormSheet';
import { chipBase, chipOn, chipOff } from '@/components/forms/fieldStyles';
import { Switch } from '@/components/ui/switch';
import { PayPeriodSheet } from '@/components/employer/timesheets/PayPeriodSheet';
import { useFirmPaySettings } from '@/hooks/useFirmPaySettings';
import { fetchPayrollExport, usePayrollRun, type FirmAccounting } from '@/hooks/useFirmAccounting';
import {
  payRunErrorMessage,
  useRunHolidayLines,
  useRunPresets,
  useSendPayRun,
  useUndoPayRun,
} from '@/hooks/usePayRun';
import { usePayProfiles, useStatutoryRates } from '@/hooks/usePayLaw';
import { useEmployees } from '@/hooks/useEmployees';
import { useSubcontractorRun, cisLabel } from '@/hooks/useSubcontractors';
import { usePayrollLaw } from '@/components/employer/payLaw/usePayrollLaw';
import {
  buildPayrollLines,
  sendableLines,
  type PayrollRun,
  type PayrollRunExport,
} from '@/services/payrollRun';
import {
  HOURS_PRESET,
  afterEarlierRuns,
  PAY_PRESETS,
  PRESET_BASIS_LABEL,
  cisCsv,
  cisFilename,
  holidayRows,
  payRunCsv,
  payRunFilename,
  payRunTotals,
  presetById,
  presetForKind,
  wageCheck,
  withPayLaw,
  type PayPresetId,
  type PayRunLine,
  type WageCheckStatus,
} from '@/services/payRun';
import { saveCSVFile } from '@/services/accountingService';
import {
  formatPeriodRange,
  payPeriodContaining,
  previousPayPeriod,
  isPaySettingsComplete,
} from '@/utils/payPeriods';
import { shortPayday } from '@/utils/expensePayroll';
import type { PayrollExtras } from '@/lib/payLaw';

const gbp = (n: number | null | undefined) =>
  n == null
    ? 'None'
    : `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const hrs = (n: number) => `${n.toLocaleString('en-GB', { maximumFractionDigits: 2 })} h`;
const iso = (d: Date) => format(d, 'yyyy-MM-dd');
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

const CHECK_PILL: Record<WageCheckStatus, { tone: PillTone; label: string }> = {
  ok: { tone: 'green', label: 'Minimum wage OK' },
  below: { tone: 'red', label: 'Below minimum' },
  no_birth_date: { tone: 'neutral', label: 'No date of birth' },
  salary_check: { tone: 'neutral', label: 'Check salary' },
  no_rate: { tone: 'red', label: 'No rate' },
  not_checked: { tone: 'neutral', label: 'Not checked' },
};

type PeriodChoice = 'this' | 'last';

/* ── The run, with pay law on every line ─────────────────────────────── */

function useEnrich(opts: {
  money: boolean;
  start: string;
  end: string;
  /** Pay-law figures for one person, less what runs before `before` carried. */
  extrasAt: (
    id: string,
    before: string | null,
    window: { start: string; end: string }
  ) => PayrollExtras | null;
  payrollIdFor: (id: string) => string | null;
}) {
  const { money, start, end, extrasAt, payrollIdFor } = opts;
  const rates = useStatutoryRates();
  const { data: profiles } = usePayProfiles(money);
  const { data: employees = [] } = useEmployees();
  return useMemo(
    () =>
      (run: PayrollRun, withExpenses: boolean, before: string | null = null): PayRunLine[] => {
        const base = sendableLines(buildPayrollLines(run), withExpenses);
        return base.map((l) => {
          const w = run.workers.find((x) => x.employee_id === l.employeeId);
          const days = (w?.days ?? []).map((d) => ({ date: d.date, hours: Number(d.hours) || 0 }));
          const emp = employees.find((e) => e.id === l.employeeId);
          const prof = profiles?.get(l.employeeId);
          const check = money
            ? wageCheck(
                rates,
                {
                  payType: l.payType,
                  rate: l.rate,
                  totalHours: l.totalHours,
                  dates: days.filter((d) => d.hours > 0).map((d) => d.date.slice(0, 10)),
                },
                {
                  dateOfBirth: prof?.dateOfBirth ?? null,
                  apprenticeshipStart: prof?.apprenticeshipStart ?? null,
                  apprenticeshipEnd: prof?.apprenticeshipEnd ?? null,
                  annualSalary: emp?.annual_salary ? Number(emp.annual_salary) : null,
                  teamRole: emp?.team_role ?? null,
                },
                { start: run.period_start, end: run.period_end }
              )
            : null;
          return withPayLaw(l, {
            days,
            overtimeThreshold: Number(w?.overtime_threshold) || 8,
            extras: extrasAt(l.employeeId, before, {
              start: run.period_start,
              end: run.period_end,
            }),
            payrollId: payrollIdFor(l.employeeId),
            check,
            money,
          });
        });
      },
    // start/end keep the memo honest when the window moves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [money, rates, profiles, employees, extrasAt, payrollIdFor, start, end]
  );
}

/* ── Panel ─────────────────────────────────────────────────────────────── */

export function PayRunPanel({
  firmId,
  data,
  onPeriodChange,
}: {
  firmId: string;
  data: FirmAccounting;
  /** Tells the page which period is showing, so the subcontractor panel follows it. */
  onPeriodChange?: (start: string, end: string) => void;
}) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const money = data.money_visible;
  const { data: settings } = useFirmPaySettings(firmId);
  const [periodOpen, setPeriodOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reason, setReason] = useState('');

  const today = useMemo(() => new Date(), []);
  const periods = useMemo(() => {
    if (isPaySettingsComplete(settings)) {
      const cur = payPeriodContaining(settings, today)!;
      const prev = previousPayPeriod(settings, cur)!;
      return {
        this: { start: cur.start, end: cur.end },
        last: { start: prev.start, end: prev.end },
        firm: true,
      };
    }
    const lastMonth = subMonths(today, 1);
    return {
      this: { start: startOfMonth(today), end: endOfMonth(today) },
      last: { start: startOfMonth(lastMonth), end: endOfMonth(lastMonth) },
      firm: false,
    };
  }, [settings, today]);
  // Early in a period, the one to send is the one that just ended.
  const [choice, setChoice] = useState<PeriodChoice | null>(null);
  const effective: PeriodChoice =
    choice ?? (differenceInCalendarDays(today, periods.this.start) < 7 ? 'last' : 'this');
  const period = periods[effective];
  const start = iso(period.start);
  const end = iso(period.end);
  useEffect(() => {
    onPeriodChange?.(start, end);
  }, [start, end, onPeriodChange]);

  const run = usePayrollRun(firmId, start, end);
  const law = usePayrollLaw({
    enabled: true,
    canSeeMoney: money,
    windowStart: start,
    windowEnd: end,
    firmId,
  });
  // Earlier runs in this period (late approvals make a second run): holiday
  // pay, SSP and rolled-up pay they carried are not carried again.
  const exportsHere = useMemo(() => run.data?.exports ?? [], [run.data]);
  const runIds = useMemo(() => exportsHere.map((x) => x.id), [exportsHere]);
  const presets = useRunPresets(runIds);
  const earlierLines = useRunHolidayLines(runIds, money);
  const extrasFor = law.extrasFor;
  const extrasAt = useCallback(
    (id: string, before: string | null, window: { start: string; end: string }) => {
      // Figures are worked out for the period on screen only.
      if (window.start !== start || window.end !== end) return null;
      const metas = [...(presets.data?.entries() ?? [])].filter(
        ([, m]) =>
          m.periodStart === start &&
          m.periodEnd === end &&
          (before == null || m.exportedAt < before)
      );
      const ids = new Set(metas.map(([k]) => k));
      return afterEarlierRuns(
        extrasFor(id),
        {
          records: (earlierLines.data ?? []).filter(
            (r) => r.employeeId === id && ids.has(r.sourceId)
          ),
          sspDays: metas.reduce((sum, [, m]) => sum + Number(m.ssp?.[id] ?? 0), 0),
        },
        { start, end }
      );
    },
    [start, end, presets.data, earlierLines.data, extrasFor]
  );
  const enrich = useEnrich({
    money,
    start,
    end,
    extrasAt,
    payrollIdFor: law.payrollIdFor,
  });
  const earlierReady =
    runIds.length === 0 || (!presets.isLoading && !(money && earlierLines.isLoading));
  const lawReady = law.ready && earlierReady;

  const connected = data.connections.find((c) => c.state === 'connected')?.provider;
  const defaultPreset: PayPresetId =
    connected === 'xero' || connected === 'quickbooks' || connected === 'sage'
      ? connected
      : 'generic';
  const [presetChoice, setPresetChoice] = useState<PayPresetId | null>(null);
  const preset = money ? presetById(presetChoice ?? defaultPreset) : HOURS_PRESET;
  const [includeExpenses, setIncludeExpenses] = useState(true);
  const withExpenses = money && includeExpenses;

  const all = useMemo(() => (run.data ? buildPayrollLines(run.data) : []), [run.data]);
  const lines = useMemo(
    () => (run.data ? enrich(run.data, withExpenses) : []),
    [run.data, enrich, withExpenses]
  );
  const totals = useMemo(
    () => payRunTotals(lines, withExpenses, money),
    [lines, withExpenses, money]
  );
  const timesheets = lines.reduce((s, l) => s + l.timesheetIds.length, 0);
  const expenses = withExpenses ? lines.reduce((s, l) => s + l.expenseIds.length, 0) : 0;
  const awaiting = all.reduce((s, l) => s + l.awaitingCount, 0);
  const noRate = money ? lines.filter((l) => l.noRate).map((l) => l.name) : [];
  const nothingNew = timesheets + expenses === 0;
  const blockedByRate = noRate.length > 0;
  const needsReason = totals.below.length > 0;
  const reasonOk = reason.trim().length >= 10;

  const send = useSendPayRun();
  const undo = useUndoPayRun();
  const [sentId, setSentId] = useState<string | null>(null);

  const saveExportFile = async (x: { id: string; kind: string }, as?: PayPresetId) => {
    const past = await fetchPayrollExport(firmId, x.id);
    const stored = presets.data?.get(x.id)?.preset ?? null;
    const p: PayPresetId = !past.money_visible
      ? 'hours'
      : (as ?? ((stored as PayPresetId | null) || presetForKind(x.kind)));
    const withExp = past.money_visible && p !== 'hours';
    const pastLines = enrich(past, withExp, presets.data?.get(x.id)?.exportedAt ?? null);
    const csv = payRunCsv(p, pastLines, past.period_start, past.period_end, withExp);
    return saveCSVFile(csv, payRunFilename(p, past.period_start, past.period_end));
  };

  const doSend = async () => {
    if (nothingNew || blockedByRate || !lawReady) return;
    if (needsReason && !reasonOk) return;
    try {
      const r = await send.mutateAsync({
        firmId,
        start,
        end,
        preset: preset.id,
        timesheetIds: lines.flatMap((l) => l.timesheetIds),
        expenseIds: withExpenses ? lines.flatMap((l) => l.expenseIds) : [],
        holidayRows: holidayRows(lines, (id) => extrasAt(id, null, { start, end }), money),
        payCheck: {
          no_birth_date: totals.noBirthDate.length,
          override_reason: needsReason ? reason.trim() : null,
          ssp: Object.fromEntries(
            lines.filter((l) => l.sspDays > 0).map((l) => [l.employeeId, l.sspDays])
          ),
        },
      });
      setReviewOpen(false);
      setReason('');
      setSentId(r.export_id);
      const held = r.holiday_rows
        ? ` ${plural(r.holiday_rows, 'line')} added to the holiday record.`
        : '';
      try {
        const saved = await saveExportFile({ id: r.export_id, kind: preset.kind }, preset.id);
        toast.success('Sent to payroll', {
          description: saved.cancelled
            ? `Logged.${held} Tap Save the file below when you are ready.`
            : `${saved.filename} ${saved.method === 'share-sheet' ? 'is ready to share' : 'is in your downloads'}.${held}`,
        });
      } catch {
        toast.success('Sent to payroll', {
          description: `Logged.${held} Tap Save the file below.`,
        });
      }
    } catch (e) {
      toast.error('Not sent', { description: payRunErrorMessage(e) });
      qc.invalidateQueries({ queryKey: ['payroll-run'] });
    }
  };

  const doUndo = (x: PayrollRunExport) =>
    undo.mutate(x.id, {
      onSuccess: (r) => {
        if (sentId === x.id) setSentId(null);
        toast.success('Run put back', {
          description: `${plural(r.timesheets, 'entry', 'entries')}${r.expenses ? ` and ${plural(r.expenses, 'claim')}` : ''} can be sent again.${r.holiday_removed ? ` ${plural(r.holiday_removed, 'holiday record line')} it wrote ${r.holiday_removed === 1 ? 'was' : 'were'} taken back.` : ''}`,
        });
      },
      onError: (e) => toast.error('Could not put it back', { description: payRunErrorMessage(e) }),
    });

  const justSent = sentId ? exportsHere.find((x) => x.id === sentId) : undefined;
  const lawLine = [
    totals.holidayHours > 0 ? `${hrs(totals.holidayHours)} holiday` : null,
    totals.accruedHours > 0 ? `${hrs(totals.accruedHours)} built up` : null,
    totals.sspDays > 0 ? plural(totals.sspDays, 'SSP day') : null,
  ].filter(Boolean);

  return (
    <section className={cn(panel, 'scroll-mt-24 overflow-hidden')} data-help="accounting.payrun">
      <PanelHead
        title="Send to payroll"
        meta={
          <span className="truncate text-[12.5px] text-white">
            {money ? 'Hours, holiday, sick pay, expenses' : 'Hours only'}
          </span>
        }
      />

      <div className="space-y-5 px-4 py-5 sm:px-5">
        {/* Period */}
        <div className="space-y-2">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Pay period"
            data-help="accounting.periods"
          >
            {(['last', 'this'] as const).map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={effective === c}
                onClick={() => setChoice(c)}
                className={cn(
                  chipBase,
                  'rounded-full px-4 text-[13.5px]',
                  effective === c ? chipOn : chipOff
                )}
              >
                {c === 'last'
                  ? periods.firm
                    ? 'Last period'
                    : 'Last month'
                  : periods.firm
                    ? 'This period'
                    : 'This month'}
                <span className="ml-1.5 font-normal">
                  {formatPeriodRange(periods[c].start, periods[c].end)}
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-3">
            <p className="text-[12.5px] leading-relaxed text-white">
              {periods.firm
                ? 'Your firm’s pay period.'
                : 'Your firm has not set a pay period, so this uses calendar months.'}
            </p>
            {data.can_manage && (
              <button
                type="button"
                data-help="accounting.pay-period"
                onClick={() => setPeriodOpen(true)}
                className="inline-flex h-11 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
              >
                {periods.firm ? 'Change pay period' : 'Set pay period'}
              </button>
            )}
          </div>
        </div>

        {run.isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        ) : run.error ? (
          <p className="text-[14px] text-white">{payRunErrorMessage(run.error)}</p>
        ) : (
          <>
            <div className="divide-y divide-white/[0.07] overflow-hidden rounded-xl border border-white/[0.08]">
              <KeyValue label="People" value={totals.people} />
              <KeyValue
                label="Hours to send"
                value={
                  totals.overtime > 0
                    ? `${hrs(totals.hours)} · ${hrs(totals.overtime)} overtime`
                    : hrs(totals.hours)
                }
              />
              <KeyValue
                label="Holiday and sick"
                value={!lawReady ? 'Working out' : lawLine.length ? lawLine.join(' · ') : 'None'}
              />
              {money ? (
                <KeyValue
                  label="Pay before tax"
                  value={nothingNew ? 'None' : gbp(totals.totalPay)}
                />
              ) : (
                <KeyValue
                  label="Waiting for approval"
                  value={awaiting}
                  tone={awaiting > 0 ? 'yellow' : undefined}
                />
              )}
              {money && (
                <KeyValue
                  label="Expenses and mileage"
                  value={
                    !withExpenses
                      ? 'Left out'
                      : expenses === 0
                        ? 'None'
                        : totals.miles > 0
                          ? `${gbp(totals.reimbursement)} · ${totals.miles.toLocaleString('en-GB', { maximumFractionDigits: 1 })} miles`
                          : gbp(totals.reimbursement)
                  }
                />
              )}
            </div>

            <Warnings
              money={money}
              below={totals.below}
              noBirthDate={totals.noBirthDate}
              salaryChecks={totals.checks}
              estimates={totals.estimates}
              awaiting={awaiting}
              noRate={noRate}
              lines={all}
              hiddenExpenses={run.data?.hidden_expense_count ?? 0}
              exports={exportsHere}
              onTeam={() => navigate('/employer?section=team')}
              onApprove={() => navigate('/employer?section=timesheets&tab=pending')}
            />

            {justSent && (
              <SentBanner
                x={justSent}
                presetId={(presets.data?.get(justSent.id)?.preset as PayPresetId) ?? preset.id}
                holidayRows={presets.data?.get(justSent.id)?.holidayRows ?? null}
                money={money}
                onSave={(as) =>
                  saveExportFile(justSent, as).catch(() =>
                    toast.error('Could not save the file. Try again.')
                  )
                }
                onUndo={() => doUndo(justSent)}
                undoing={undo.isPending}
              />
            )}

            {money ? (
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-[13px] font-semibold text-white">Your payroll software</p>
                  <div
                    className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                    data-help="accounting.preset"
                  >
                    {PAY_PRESETS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        aria-pressed={preset.id === p.id}
                        onClick={() => setPresetChoice(p.id)}
                        className={cn(
                          chipBase,
                          'px-3 text-[13.5px]',
                          preset.id === p.id ? chipOn : chipOff
                        )}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                  <PresetNote presetId={preset.id} />
                </div>
                <label className="flex min-h-11 items-center justify-between gap-4 rounded-xl border border-white/[0.1] bg-white/[0.03] px-3.5 py-2.5">
                  <span className="text-[13.5px] leading-snug text-white">
                    Include approved expenses and mileage
                  </span>
                  <Switch
                    checked={includeExpenses}
                    onCheckedChange={setIncludeExpenses}
                    aria-label="Include approved expenses and mileage"
                  />
                </label>
              </div>
            ) : (
              <p className="text-[13px] leading-relaxed text-white">
                You will get an hours-only file with holiday hours and SSP days. Pay, expenses and
                mileage are sent by the owner or an admin.
              </p>
            )}

            {lines.length > 0 && (
              <PeopleRows lines={lines} money={money} withExpenses={withExpenses} />
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <PrimaryButton
                size="lg"
                data-help="accounting.send"
                onClick={() => setReviewOpen(true)}
                disabled={nothingNew || blockedByRate || send.isPending || !lawReady}
                className="h-12 w-full sm:w-auto"
              >
                <Send className="mr-2 h-4 w-4" />
                {nothingNew
                  ? 'Nothing new to send'
                  : !lawReady
                    ? 'Working out holiday and sick pay'
                    : `Check and send · ${plural(totals.people, 'person', 'people')}`}
              </PrimaryButton>
              <p className="text-[12.5px] leading-relaxed text-white sm:ml-3">
                You check the minimum wage and holiday first. Then it makes the {preset.name} file
                and marks it all as sent.
              </p>
            </div>

            {exportsHere.length > 0 && (
              <ExportsList
                exports={exportsHere}
                presetOf={(id) => presets.data?.get(id)?.preset ?? null}
                onSave={(x) =>
                  saveExportFile(x).catch(() => toast.error('Could not save the file. Try again.'))
                }
                onUndo={doUndo}
                undoing={undo.isPending}
              />
            )}
          </>
        )}
      </div>

      <FormSheet
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        width="wide"
        eyebrow="Check before sending"
        title={formatPeriodRange(period.start, period.end)}
        description={`${preset.name} file. Everything below is marked as sent, and each person sees it on their Timesheet.`}
        bodyClassName="grid gap-6 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8 lg:items-start"
        footer={
          <div className="flex flex-wrap items-center justify-end gap-2">
            {needsReason && !reasonOk && (
              <p className="w-full text-[13px] text-white sm:mr-auto sm:w-auto">
                Give a reason to send with someone below the minimum.
              </p>
            )}
            <SecondaryButton
              onClick={() => setReviewOpen(false)}
              className="h-12 flex-1 px-5 sm:flex-none"
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={doSend}
              disabled={send.isPending || (needsReason && !reasonOk)}
              className="h-12 flex-[2] px-5 sm:flex-none"
            >
              {send.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileSpreadsheet className="mr-2 h-4 w-4" />
              )}
              {needsReason ? 'Send anyway and save' : 'Send and save the file'}
            </PrimaryButton>
          </div>
        }
      >
        <div className="space-y-5">
          <StatStrip
            columns={4}
            stats={[
              { label: 'People', value: totals.people },
              {
                label: 'Hours',
                value: hrs(totals.hours),
                sub: plural(timesheets, 'entry', 'entries'),
              },
              money
                ? { label: 'Pay before tax', value: gbp(totals.totalPay) }
                : { label: 'Overtime', value: hrs(totals.overtime) },
              money
                ? {
                    label: 'Repaid',
                    value: withExpenses ? gbp(totals.reimbursement) : 'Left out',
                    sub: withExpenses ? plural(expenses, 'claim') : undefined,
                  }
                : { label: 'SSP days', value: totals.sspDays },
            ]}
          />
          {money ? (
            <ReviewChecks
              lines={lines}
              below={totals.below}
              reason={reason}
              onReason={setReason}
              onTeam={() => {
                setReviewOpen(false);
                navigate('/employer?section=team');
              }}
            />
          ) : (
            <p className="text-[13.5px] leading-relaxed text-white">
              The owner or an admin checks pay against the minimum wage. If anyone in this run is
              paid below it, sending stops and asks them to look.
            </p>
          )}
        </div>
        <div className="space-y-5">
          <ReviewHoliday lines={lines} money={money} />
          <div className={cn(panel, 'space-y-2 px-4 py-4 sm:px-5')}>
            <h3 className="text-[15px] font-semibold text-white">What goes in the file</h3>
            <p className="text-[13.5px] leading-relaxed text-white">{preset.how}</p>
            {preset.keyIn && (
              <p className="text-[13.5px] leading-relaxed text-white">{preset.keyIn}</p>
            )}
            <p className="text-[13.5px] leading-relaxed text-white">
              Subcontractors are not in it. They are paid by self-bill statement with CIS.
            </p>
            {withExpenses && expenses > 0 && run.data?.payday ? (
              <p className="text-[13.5px] leading-relaxed text-white">
                {run.data.payday_source === 'settings'
                  ? `Expenses are repaid with pay on ${format(parseISO(run.data.payday), 'EEE d MMM')}, and marked paid that morning.`
                  : `No payday set, so expenses count as repaid on the period end, ${format(parseISO(run.data.payday), 'EEE d MMM')}.`}
              </p>
            ) : null}
            {awaiting > 0 && (
              <p className="text-[13.5px] leading-relaxed text-white">
                {plural(awaiting, 'entry', 'entries')} still waiting for approval{' '}
                {awaiting === 1 ? 'is' : 'are'} not in this run.
              </p>
            )}
          </div>
        </div>
      </FormSheet>

      <PayPeriodSheet open={periodOpen} onOpenChange={setPeriodOpen} />
    </section>
  );
}

/* ── Pieces ────────────────────────────────────────────────────────────── */

function PresetNote({ presetId }: { presetId: PayPresetId }) {
  const p = presetById(presetId);
  return (
    <div className="mt-2 space-y-1">
      <p className="text-[12.5px] leading-relaxed text-white">
        <span className="font-semibold">{PRESET_BASIS_LABEL[p.basis]}.</span> {p.how}
      </p>
      {p.source && (
        <a
          href={p.source.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-1.5 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
        >
          {p.source.label}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      )}
    </div>
  );
}

function Warnings(p: {
  money: boolean;
  below: string[];
  noBirthDate: string[];
  salaryChecks: string[];
  estimates: number;
  awaiting: number;
  noRate: string[];
  lines: Array<{ sentHours: number; earlierHours: number }>;
  hiddenExpenses: number;
  exports: PayrollRunExport[];
  onTeam: () => void;
  onApprove: () => void;
}) {
  const sentHours = p.lines.reduce((s, l) => s + l.sentHours, 0);
  const late = p.lines.reduce((s, l) => s + l.earlierHours, 0);
  const items: Array<{
    tone: 'red' | 'amber' | 'neutral';
    body: ReactNode;
    action?: { label: string; go: () => void };
  }> = [];
  const names = (n: string[]) =>
    n.length > 3 ? `${n.slice(0, 3).join(', ')} and ${n.length - 3} more` : n.join(', ');
  if (p.below.length > 0)
    items.push({
      tone: 'red',
      body: `${names(p.below)} ${p.below.length === 1 ? 'is' : 'are'} paid below the legal minimum for their age or apprenticeship. Fix the rate in Team before sending.`,
      action: { label: 'Open Team', go: p.onTeam },
    });
  if (p.noRate.length > 0)
    items.push({
      tone: 'red',
      body: `${names(p.noRate)} ${p.noRate.length === 1 ? 'has' : 'have'} no hourly rate, so the pay file cannot be priced. Add the rate in Team.`,
      action: { label: 'Open Team', go: p.onTeam },
    });
  if (p.noBirthDate.length > 0)
    items.push({
      tone: 'amber',
      body: `${names(p.noBirthDate)}: no date of birth, so their minimum wage cannot be checked. Add it on their pay and holiday rules.`,
      action: { label: 'Open Team', go: p.onTeam },
    });
  if (p.salaryChecks.length > 0)
    items.push({
      tone: 'amber',
      body: `${names(p.salaryChecks)}: salary looks low for these hours. Salaried pay is checked over the year, so check it.`,
    });
  if (p.awaiting > 0)
    items.push({
      tone: 'amber',
      body: `${plural(p.awaiting, 'entry is', 'entries are')} waiting for approval in this period. Approve them first, or they go in the next run.`,
      action: { label: 'Approve hours', go: p.onApprove },
    });
  if (p.estimates > 0)
    items.push({
      tone: 'neutral',
      body: `${plural(p.estimates, 'person has', 'people have')} holiday or sick pay marked Estimate. The check shows why.`,
    });
  if (sentHours > 0 && p.exports.length > 0)
    items.push({
      tone: 'neutral',
      body: `${hrs(sentHours)} in this period already went to payroll and are not sent again.`,
    });
  if (late > 0)
    items.push({
      tone: 'neutral',
      body: `${hrs(late)} were approved late from before this period. They are included so they get paid.`,
    });
  if (!p.money && p.hiddenExpenses > 0)
    items.push({
      tone: 'neutral',
      body: `${plural(p.hiddenExpenses, 'approved expense claim is', 'approved expense claims are')} left for the owner or an admin to send.`,
    });
  if (items.length === 0) return null;
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li
          key={i}
          className={cn(
            'flex flex-col gap-2 rounded-xl border p-3.5 sm:flex-row sm:items-center sm:justify-between',
            it.tone === 'red'
              ? 'border-red-500/40 bg-red-500/10'
              : it.tone === 'amber'
                ? 'border-amber-500/40 bg-white/[0.04]'
                : 'border-white/[0.1] bg-white/[0.03]'
          )}
        >
          <p className="text-[13.5px] leading-relaxed text-white">{it.body}</p>
          {it.action && (
            <button
              type="button"
              onClick={it.action.go}
              className="inline-flex h-11 shrink-0 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              {it.action.label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

function lawBits(l: PayRunLine, money: boolean): string[] {
  return [
    l.holidayDays > 0
      ? `Holiday ${l.holidayHours != null ? hrs(l.holidayHours) : plural(l.holidayDays, 'day')}${money && l.holidayPay ? ` ${gbp(l.holidayPay)}` : ''}`
      : null,
    l.accruedHours ? `${hrs(l.accruedHours)} holiday built up` : null,
    money && l.rolledUpPay ? `Rolled-up holiday ${gbp(l.rolledUpPay)}` : null,
    l.sspDays > 0
      ? `SSP ${plural(l.sspDays, 'day')}${money && l.sspPay != null ? ` ${gbp(l.sspPay)}` : ''}`
      : null,
  ].filter(Boolean) as string[];
}

function PeopleRows({
  lines,
  money,
  withExpenses,
}: {
  lines: PayRunLine[];
  money: boolean;
  withExpenses: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08]">
      <div className={rowsClass}>
        {lines.map((l) => {
          const work =
            l.totalHours > 0
              ? `${hrs(l.totalHours)}${l.overtimeHours > 0 ? ` (${hrs(l.overtimeHours)} overtime)` : ''}`
              : 'No new hours';
          const detail = [work, ...lawBits(l, money)].join(' · ');
          const pill = l.check ? CHECK_PILL[l.check.status] : null;
          return (
            <Row
              key={l.employeeId}
              title={l.name}
              detail={detail}
              wrapDetail
              meta={
                money && withExpenses && (l.reimbursement ?? 0) > 0
                  ? `Repaid ${gbp(l.reimbursement)}${l.mileageMiles > 0 ? ` · ${l.mileageMiles.toLocaleString('en-GB', { maximumFractionDigits: 1 })} miles` : ''}`
                  : undefined
              }
              amount={money ? (l.noRate ? 'No rate' : gbp(l.totalPay)) : undefined}
              status={
                pill && pill.tone !== 'green' ? (
                  <StatusPill tone={pill.tone}>{pill.label}</StatusPill>
                ) : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function ReviewChecks({
  lines,
  below,
  reason,
  onReason,
  onTeam,
}: {
  lines: PayRunLine[];
  below: string[];
  reason: string;
  onReason: (v: string) => void;
  onTeam: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-white">Minimum wage</h3>
        <span className="text-[12.5px] text-white">For their age, or the apprentice rate</span>
      </div>
      <div className={cn(panel, 'overflow-hidden')}>
        <div className={rowsClass}>
          {lines.map((l) => {
            const c = l.check;
            const pill = c ? CHECK_PILL[c.status] : CHECK_PILL.not_checked;
            return (
              <Row
                key={l.employeeId}
                title={`${l.name}${c?.apprentice ? ' · apprentice' : ''}`}
                detail={c?.text ?? 'Not checked'}
                wrapDetail
                status={<StatusPill tone={pill.tone}>{pill.label}</StatusPill>}
              />
            );
          })}
        </div>
      </div>
      {below.length > 0 && (
        <div className="space-y-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4">
          <p className="text-[13.5px] leading-relaxed text-white">
            Arrears must be paid straight away, with a fine, and the firm can be named. Fix the rate
            in Team and come back. If the rate is already corrected in your payroll software, say so
            below and the reason is kept with the run.
          </p>
          <textarea
            value={reason}
            onChange={(e) => onReason(e.target.value)}
            maxLength={300}
            rows={2}
            aria-label="Reason to send anyway"
            placeholder="For example: rate already raised to £12.71 in BrightPay from 1 Oct"
            className={textareaClass}
          />
          <button
            type="button"
            onClick={onTeam}
            className="inline-flex h-11 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Fix the rate in Team
          </button>
        </div>
      )}
      <p className="text-[12.5px] leading-relaxed text-white">
        The basic hourly rate is checked against the minimum on each day worked. Overtime premium,
        holiday pay, SSP and repaid expenses never count towards minimum wage pay.
      </p>
    </div>
  );
}

function ReviewHoliday({ lines, money }: { lines: PayRunLine[]; money: boolean }) {
  const withLaw = lines.filter((l) => lawBits(l, money).length > 0 || l.notes.length > 0);
  return (
    <div className="space-y-3">
      <h3 className="text-[15px] font-semibold text-white">Holiday and sick pay</h3>
      {withLaw.length === 0 ? (
        <p className="text-[13.5px] leading-relaxed text-white">
          No holiday, holiday built up or sick days in this run.
        </p>
      ) : (
        <div className={cn(panel, 'overflow-hidden')}>
          <div className={rowsClass}>
            {withLaw.map((l) => (
              <Row
                key={l.employeeId}
                title={l.name}
                detail={lawBits(l, money).join(' · ') || 'Nothing this period'}
                meta={l.notes.length ? l.notes.join('. ') : undefined}
                wrapDetail
                status={l.estimate ? <StatusPill>Estimate</StatusPill> : undefined}
              />
            ))}
          </div>
        </div>
      )}
      <p className="text-[12.5px] leading-relaxed text-white">
        Accrual, holiday pay and rolled-up pay are written to the holiday record as the run is sent.
        It is kept for 6 years.
      </p>
    </div>
  );
}

function SentBanner({
  x,
  presetId,
  holidayRows: held,
  money,
  onSave,
  onUndo,
  undoing,
}: {
  x: PayrollRunExport;
  presetId: PayPresetId;
  holidayRows: number | null;
  money: boolean;
  onSave: (as?: PayPresetId) => void;
  onUndo: () => void;
  undoing: boolean;
}) {
  const p = presetById(presetId);
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
        <p className="text-[14px] leading-relaxed text-white">
          Sent to payroll. {plural(x.timesheet_count, 'entry', 'entries')}
          {x.expense_count ? ` and ${plural(x.expense_count, 'claim')}` : ''} for{' '}
          {plural(x.people, 'person', 'people')}.
          {held ? ` ${plural(held, 'line')} added to the holiday record.` : ''}
          {x.expense_count > 0 && x.payday
            ? x.expenses_paid
              ? ` Expenses paid on ${shortPayday(x.payday)}.`
              : ` Expenses are marked paid on ${shortPayday(x.payday)}.`
            : ''}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <SecondaryButton onClick={() => onSave()} className="h-11 flex-1 sm:flex-none">
          Save {p.name} file
        </SecondaryButton>
        {money && p.id !== 'generic' && (
          <SecondaryButton onClick={() => onSave('generic')} className="h-11 flex-1 sm:flex-none">
            Summary file
          </SecondaryButton>
        )}
        {x.can_undo && (
          <SecondaryButton onClick={onUndo} disabled={undoing} className="h-11 flex-1 sm:flex-none">
            Undo
          </SecondaryButton>
        )}
      </div>
    </div>
  );
}

function ExportsList({
  exports,
  presetOf,
  onSave,
  onUndo,
  undoing,
}: {
  exports: PayrollRunExport[];
  presetOf: (id: string) => string | null;
  onSave: (x: PayrollRunExport) => void;
  onUndo: (x: PayrollRunExport) => void;
  undoing: boolean;
}) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-semibold text-white">Already sent for this period</p>
      <div className="overflow-hidden rounded-xl border border-white/[0.08]">
        <div className={rowsClass}>
          {exports.map((x) => {
            const name = presetById(presetOf(x.id) ?? presetForKind(x.kind)).name;
            return (
              <div
                key={x.id}
                className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-white">
                    {format(parseISO(x.exported_at), 'EEE d MMM, HH:mm')} by{' '}
                    {x.mine ? 'you' : x.by_name}
                  </p>
                  <p className="mt-0.5 text-[13px] text-white">
                    {[
                      plural(x.timesheet_count, 'entry', 'entries'),
                      x.expense_count ? plural(x.expense_count, 'claim') : null,
                      Number(x.total_hours) > 0 ? hrs(Number(x.total_hours)) : null,
                      `${name} file`,
                      x.expense_count > 0 && x.payday
                        ? x.expenses_paid
                          ? `expenses paid ${shortPayday(x.payday)}`
                          : `expenses due ${shortPayday(x.payday)}`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {x.timesheet_count + x.expense_count > 0 && (
                    <SecondaryButton
                      onClick={() => onSave(x)}
                      className="h-11 flex-1 px-4 sm:flex-none"
                    >
                      Save again
                    </SecondaryButton>
                  )}
                  {x.can_undo && (
                    <SecondaryButton
                      onClick={() => onUndo(x)}
                      disabled={undoing}
                      className="h-11 flex-1 px-4 sm:flex-none"
                    >
                      Undo
                    </SecondaryButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-white">
        Undo is open for 48 hours, and only before payday for a run with expenses. It puts the
        entries back so they can be sent again.
      </p>
    </div>
  );
}

/* ── Subcontractors: CIS, never in the PAYE file ──────────────────────── */

export function SubbiesPanel({
  start,
  end,
  money,
}: {
  start: string;
  end: string;
  money: boolean;
}) {
  const navigate = useNavigate();
  const run = useSubcontractorRun(start, end);
  const subs = (run.data?.subcontractors ?? []).filter((s) => s.day_count > 0 || s.billed_days > 0);
  const statements = (run.data?.statements ?? []).filter((s) => !s.voided_at);
  const unbilled = subs.filter((s) => s.timesheet_ids.length > 0);
  const net = statements.reduce((s, x) => s + Number(x.net_payable ?? 0), 0);
  const cis = statements.reduce((s, x) => s + Number(x.cis_deduction ?? 0), 0);

  const saveCis = () =>
    saveCSVFile(cisCsv(statements), cisFilename(start, end))
      .then((r) => {
        if (!r.cancelled) toast.success('CIS file saved', { description: r.filename });
      })
      .catch(() => toast.error('Could not save the file. Try again.'));

  return (
    <section className={cn(panel, 'overflow-hidden')} data-help="accounting.subbies">
      <PanelHead
        title="Subcontractors"
        meta={<span className="text-[12.5px] text-white">Paid with CIS, not payroll</span>}
        action="Open"
        onAction={() => navigate('/employer?section=subcontractors')}
      />
      {run.isLoading ? (
        <div className="px-4 py-5 sm:px-5">
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        </div>
      ) : subs.length === 0 && statements.length === 0 ? (
        <p className="px-4 py-5 text-[13.5px] leading-relaxed text-white sm:px-5">
          No subcontractor days in this period. Subcontractors are paid by self-bill statement with
          CIS, so they never go in the payroll file.
        </p>
      ) : (
        <>
          <div className={rowsClass}>
            {statements.map((s) => (
              <Row
                key={s.id}
                title={s.name ?? 'Subcontractor'}
                detail={
                  money
                    ? `${s.statement_number} · gross ${gbp(Number(s.gross_amount ?? 0))} · CIS ${gbp(Number(s.cis_deduction ?? 0))} · ${cisLabel(s.cis_status)}`
                    : `${s.statement_number} · ${s.day_count} days`
                }
                wrapDetail
                amount={money ? gbp(Number(s.net_payable ?? 0)) : undefined}
                status={<StatusPill tone="green">Statement issued</StatusPill>}
              />
            ))}
            {unbilled.map((s) => (
              <Row
                key={s.roster_id}
                title={s.name}
                detail={`${s.day_count} approved day${s.day_count === 1 ? '' : 's'} not on a statement yet`}
                status={<StatusPill>To bill</StatusPill>}
                onClick={() => navigate('/employer?section=subcontractors')}
              />
            ))}
          </div>
          <div className="space-y-3 border-t border-white/[0.07] px-4 py-4 sm:px-5">
            {money && statements.length > 0 && (
              <p className="text-[13.5px] text-white">
                Net to pay {gbp(net)}. CIS to pay HMRC {gbp(cis)}.
              </p>
            )}
            {money && statements.length > 0 && (
              <SecondaryButton onClick={saveCis} className="h-11 w-full sm:w-auto">
                Save the CIS file
              </SecondaryButton>
            )}
            <p className="text-[12.5px] leading-relaxed text-white">
              The CIS file lists each statement with UTR, verification number, labour, materials,
              CIS deducted and net paid. Your monthly CIS return is filed with HMRC separately.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
