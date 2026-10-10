/**
 * Worker Tools → Leave (ELE-2062).
 *
 * - Irregular-hours and part-year workers see the holiday they have built up
 *   this year: 12.07% of the hours on their approved timesheets, worked out at
 *   the end of each pay period (WTR 1998 reg 15B). Rolled-up workers are told
 *   their holiday pay comes with every payslip.
 * - Anyone off sick more than 7 days in a row can send their fit note.
 */
import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ListBody, ListCard, ListCardHeader, Pill } from '@/components/employer/editorial';
import { useFirmPaySettings } from '@/hooks/useFirmPaySettings';
import { payPeriodContaining } from '@/utils/payPeriods';
import { accrueOverPeriods, calendarDaysOff, isoWeekOf } from '@/lib/payLaw';
import {
  useApprovedHours,
  useAttachMyFitNote,
  useMyHolidayBasis,
  useSicknessRecords,
} from '@/hooks/usePayLaw';

const iso = (d: Date) => format(d, 'yyyy-MM-dd');

interface MyLeave {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
}

export function MyHolidayAndSickness({
  employeeId,
  firmId,
  leaveRequests,
}: {
  employeeId: string | null | undefined;
  firmId: string | null | undefined;
  leaveRequests: MyLeave[];
}) {
  const { data: basis } = useMyHolidayBasis(employeeId);
  const irregular = !!basis && basis.basis !== 'fixed';
  const year = new Date().getFullYear();
  // Two years back: holiday built up while off sick uses the average week
  // over the 52 weeks before the sickness (WTR reg 15C).
  const { data: hoursMap, isLoading } = useApprovedHours({
    employeeId: employeeId ?? null,
    since: `${year - 2}-01-01`,
    enabled: irregular && !basis?.rolledUp,
  });
  const { data: settings } = useFirmPaySettings(firmId);
  const today = iso(new Date());

  const accrual = useMemo(() => {
    if (!irregular || !employeeId) return null;
    const periodOf = (date: string) => {
      const p = payPeriodContaining(settings ?? null, parseISO(date));
      return p ? { start: iso(p.start), end: iso(p.end) } : isoWeekOf(date);
    };
    const all = hoursMap?.get(employeeId) ?? [];
    const yearStart = `${year}-01-01`;
    const offSick = leaveRequests
      .filter((l) => l.type === 'sick' && (l.status || '').toLowerCase() === 'approved')
      .map((l) => ({ start: l.startDate, end: l.endDate }));
    return accrueOverPeriods(
      all.filter((e) => e.date >= yearStart),
      periodOf,
      today,
      undefined,
      { leave: offSick, history: all, from: yearStart }
    );
  }, [irregular, employeeId, hoursMap, settings, today, year, leaveRequests]);

  const sick = leaveRequests.filter(
    (l) =>
      l.type === 'sick' &&
      ['approved', 'pending'].includes((l.status || '').toLowerCase()) &&
      calendarDaysOff(l.startDate, l.endDate) > 7
  );

  if (!irregular && sick.length === 0) return null;

  return (
    <div className="space-y-4">
      {irregular && (
        <ListCard>
          <ListCardHeader
            title={`Built up in ${year}`}
            meta={
              <Pill tone="blue">
                {basis?.basis === 'part_year' ? 'Part-year' : 'Irregular hours'}
              </Pill>
            }
          />
          <div className="px-5 py-4 sm:px-6">
            {basis?.rolledUp ? (
              <p className="text-[14px] leading-snug text-white">
                Your holiday pay is rolled up: an extra 12.07% of your pay comes with every payslip,
                shown on its own line. When you take time off it is unpaid, because you have already
                been paid for it.
              </p>
            ) : isLoading || !accrual ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-[34px] font-semibold leading-none text-white tabular-nums">
                    {accrual.accruedHours}
                  </span>
                  <span className="text-[15px] text-white">hours</span>
                </div>
                <p className="mt-2 text-[13px] leading-snug text-white">
                  12.07% of the {accrual.workedHours} hours on your approved timesheets this year
                  {accrual.leaveWeeks > 0
                    ? `, plus ${accrual.leaveWeeks} week${accrual.leaveWeeks === 1 ? '' : 's'} off sick at your average week`
                    : ''}
                  , added at the end of each pay period. Family leave, such as maternity or
                  paternity leave, is not counted here: ask your employer.
                  {accrual.accruingNow > 0
                    ? ` This pay period adds about ${accrual.accruingNow} more when it ends.`
                    : ''}
                </p>
              </>
            )}
          </div>
        </ListCard>
      )}
      {sick.length > 0 && <MyFitNotes employeeId={employeeId} sick={sick} />}
    </div>
  );
}

function MyFitNotes({
  employeeId,
  sick,
}: {
  employeeId: string | null | undefined;
  sick: MyLeave[];
}) {
  const { data: records } = useSicknessRecords(!!employeeId);
  const attach = useAttachMyFitNote();
  const [params] = useSearchParams();
  const highlight = params.get('sick');
  const [busyId, setBusyId] = useState<string | null>(null);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  const send = async (leaveId: string, file: File | undefined) => {
    if (!file) return;
    setBusyId(leaveId);
    try {
      await attach.mutateAsync({ leaveRequestId: leaveId, file });
      toast.success('Fit note sent', { description: 'The office has it now.' });
    } catch (e) {
      toast.error('Fit note not sent', {
        description: e instanceof Error ? e.message : 'Try again.',
      });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <ListCard>
      <ListCardHeader title="Fit notes" />
      <ListBody>
        {sick.map((l) => {
          const rec = records?.get(l.id);
          const has = !!rec?.fitNotePath;
          return (
            <div
              key={l.id}
              className={cn(
                'flex items-center gap-3 px-5 py-3.5 sm:px-6',
                highlight === l.id && 'bg-white/[0.06]'
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-white">
                  Off sick from {format(parseISO(l.startDate), 'd MMM')}
                </p>
                <p className="mt-0.5 text-[12.5px] text-white">
                  {has
                    ? `Sent ${rec?.fitNoteUploadedAt ? format(parseISO(rec.fitNoteUploadedAt), 'd MMM') : ''}`
                    : 'More than 7 days, so the office needs a fit note from your GP or the hospital.'}
                </p>
              </div>
              <input
                ref={(el) => (inputs.current[l.id] = el)}
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
                onChange={(e) => {
                  void send(l.id, e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
              <button
                type="button"
                onClick={() => inputs.current[l.id]?.click()}
                disabled={busyId === l.id}
                className={cn(
                  'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold touch-manipulation',
                  has
                    ? 'border border-white/[0.14] bg-white/[0.05] text-white'
                    : 'bg-elec-yellow text-black'
                )}
              >
                {busyId === l.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {has ? 'Send a new one' : 'Send fit note'}
              </button>
            </div>
          );
        })}
      </ListBody>
    </ListCard>
  );
}
