/**
 * Pay and holiday on the person sheet (ELE-2062, ELE-2063). Owner and admins
 * only: date of birth, apprenticeship start, the legal minimum pay for them
 * today and the next time it changes, under-18 working-time limits, and how
 * their holiday works (fixed days, or 12.07% of hours for irregular-hours and
 * part-year workers, optionally rolled up).
 */
import { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import FormSheet from '@/components/forms/FormSheet';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import { KeyValue, rowBtnSecondary, rowsClass } from '@/components/employer/pageParts/PageParts';
import { Field, checkboxClass, inputClass } from '@/components/employer/editorial';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useEmployees } from '@/hooks/useEmployees';
import {
  BAND_LABEL,
  HOLIDAY_BASIS_LABEL,
  ageOn,
  apprenticeRateEnds,
  checkPay,
  type HolidayBasis,
} from '@/lib/payLaw';
import { usePayProfiles, useSavePayProfile, useStatutoryRates } from '@/hooks/usePayLaw';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chip = 'h-11 rounded-full border px-4 text-[13px] touch-manipulation';

const nice = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM yyyy') : '');
const money = (n: number) => `£${n.toFixed(2)}`;
const todayIso = () => format(new Date(), 'yyyy-MM-dd');

export function PersonPayLawCard({
  person,
}: {
  person: { id: string; name: string; teamRole?: string | null };
}) {
  const { data: profiles, isLoading } = usePayProfiles();
  const { data: employees = [] } = useEmployees();
  const rates = useStatutoryRates();
  const [editOpen, setEditOpen] = useState(false);
  const profile = profiles?.get(person.id);
  const emp = employees.find((e) => e.id === person.id);
  const first = person.name.split(' ')[0] || 'They';
  const isApprentice = person.teamRole === 'Apprentice' || !!profile?.apprenticeshipStart;
  const today = todayIso();

  const hourly =
    emp && emp.pay_type === 'hourly' && Number(emp.hourly_rate) > 0
      ? Number(emp.hourly_rate)
      : null;
  const pay = useMemo(
    () =>
      checkPay(
        rates,
        hourly,
        profile?.dateOfBirth,
        profile?.apprenticeshipStart,
        today,
        30,
        profile?.apprenticeshipEnd
      ),
    [
      rates,
      hourly,
      profile?.dateOfBirth,
      profile?.apprenticeshipStart,
      profile?.apprenticeshipEnd,
      today,
    ]
  );
  const age = profile?.dateOfBirth ? ageOn(profile.dateOfBirth, today) : null;
  const rateEnds =
    profile?.dateOfBirth && profile.apprenticeshipStart
      ? apprenticeRateEnds(
          profile.dateOfBirth,
          profile.apprenticeshipStart,
          profile.apprenticeshipEnd
        )
      : null;
  const under18 = age !== null && age < 18;

  const meta = pay.belowNow ? (
    <span className="text-[12px] font-semibold text-red-400">Below the minimum</span>
  ) : pay.riseDue ? (
    <span className="text-[12px] font-semibold text-elec-yellow">Pay rise due</span>
  ) : undefined;

  return (
    <section data-help="people.pay-law">
      <PanelTitle
        title="Pay and holiday rules"
        meta={meta}
        action="Edit"
        onAction={() => setEditOpen(true)}
      />
      <div className={cn(panel, 'overflow-hidden')}>
        {isLoading ? (
          <div className="flex h-[96px] items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          </div>
        ) : (
          <div className={rowsClass}>
            <KeyValue
              label="Date of birth"
              value={profile?.dateOfBirth ? `${nice(profile.dateOfBirth)} (${age})` : 'Not set'}
              onClick={() => setEditOpen(true)}
            />
            {isApprentice && (
              <KeyValue
                label="Apprenticeship start"
                value={profile?.apprenticeshipStart ? nice(profile.apprenticeshipStart) : 'Not set'}
                onClick={() => setEditOpen(true)}
              />
            )}
            {profile?.apprenticeshipEnd && (
              <KeyValue
                label={
                  profile.apprenticeshipEnd >= today
                    ? 'Apprenticeship ends'
                    : 'Apprenticeship ended'
                }
                value={nice(profile.apprenticeshipEnd)}
                onClick={() => setEditOpen(true)}
              />
            )}
            <KeyValue
              label={
                pay.today
                  ? `Legal minimum today (${BAND_LABEL[pay.today.band].toLowerCase()})`
                  : 'Legal minimum today'
              }
              value={pay.today ? `${money(pay.today.rate)} an hour` : 'Add date of birth'}
              tone={pay.belowNow ? 'red' : undefined}
            />
            {hourly !== null && pay.today && (
              <KeyValue
                label="Their rate"
                value={`${money(hourly)} an hour`}
                tone={pay.belowNow ? 'red' : 'green'}
              />
            )}
            {pay.riseDue && (
              <KeyValue
                label={`From ${nice(pay.riseDue.on)}`}
                value={`${money(pay.riseDue.min.rate)} minimum`}
                tone="yellow"
              />
            )}
            {rateEnds && (
              <KeyValue
                label={rateEnds > today ? 'Apprentice rate ends' : 'Apprentice rate ended'}
                value={nice(rateEnds)}
              />
            )}
            {under18 && (
              <div className="px-4 py-3 text-[13px] leading-snug text-white sm:px-5">
                Under 18 until{' '}
                {nice(profile?.dateOfBirth ? addYearsIso(profile.dateOfBirth, 18) : null)}: no more
                than 8 hours a day or 40 a week, and a 30 minute break after 4.5 hours. Timesheets
                and the diary warn you.
              </div>
            )}
            <KeyValue
              label="Holiday"
              value={
                profile
                  ? `${HOLIDAY_BASIS_LABEL[profile.holidayBasis]}${profile.rolledUp ? ', rolled up' : ''}`
                  : HOLIDAY_BASIS_LABEL.fixed
              }
              onClick={() => setEditOpen(true)}
            />
            <KeyValue
              label="Payroll ID"
              value={profile?.payrollId || 'Not set'}
              onClick={() => setEditOpen(true)}
            />
          </div>
        )}
      </div>
      <PayProfileSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        person={person}
        firstName={first}
        isApprentice={isApprentice}
      />
    </section>
  );
}

function addYearsIso(iso: string, years: number): string {
  const d = parseISO(iso);
  return format(new Date(d.getFullYear() + years, d.getMonth(), d.getDate()), 'yyyy-MM-dd');
}

export function PayProfileSheet({
  open,
  onOpenChange,
  person,
  firstName,
  isApprentice,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  person: { id: string; name: string };
  firstName: string;
  isApprentice: boolean;
}) {
  const { data: profiles } = usePayProfiles();
  const save = useSavePayProfile();
  const profile = profiles?.get(person.id);
  const [dob, setDob] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [basis, setBasis] = useState<HolidayBasis>('fixed');
  const [rolledUp, setRolledUp] = useState(false);
  const [careLeaver, setCareLeaver] = useState(false);
  const [ehcp, setEhcp] = useState(false);
  const [payrollId, setPayrollId] = useState('');

  useEffect(() => {
    if (!open) return;
    setDob(profile?.dateOfBirth ?? '');
    setStart(profile?.apprenticeshipStart ?? '');
    setEnd(profile?.apprenticeshipEnd ?? '');
    setBasis(profile?.holidayBasis ?? 'fixed');
    setRolledUp(profile?.rolledUp ?? false);
    setCareLeaver(profile?.careLeaver ?? false);
    setEhcp(profile?.ehcp ?? false);
    setPayrollId(profile?.payrollId ?? '');
  }, [open, profile]);

  const today = todayIso();
  const dobBad = !!dob && (dob > today || dob < '1930-01-01');
  const endBad = !!end && !!start && end < start;
  const onSave = async () => {
    if (dobBad) {
      toast({ title: 'Check the date of birth', variant: 'destructive' });
      return;
    }
    if (endBad) {
      toast({ title: 'The apprenticeship cannot end before it starts', variant: 'destructive' });
      return;
    }
    try {
      await save.mutateAsync({
        employeeId: person.id,
        dateOfBirth: dob || null,
        apprenticeshipStart: start || null,
        apprenticeshipEnd: start ? end || null : null,
        holidayBasis: basis,
        rolledUp: basis === 'fixed' ? false : rolledUp,
        careLeaver,
        ehcp,
        payrollId: payrollId.trim() || null,
      });
      toast({
        title: 'Saved',
        description: `${firstName}'s pay and holiday rules are up to date.`,
      });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      title={`${firstName}'s pay and holiday rules`}
      description="Only the owner and admins see this. It drives the minimum wage check, the under-18 limits, holiday accrual and the funding the firm can claim."
      footer={
        <div className="flex w-full justify-end gap-2">
          <button type="button" className={rowBtnSecondary} onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={save.isPending}
            className="inline-flex h-11 items-center justify-center rounded-full bg-elec-yellow px-8 text-[14px] font-semibold text-black touch-manipulation disabled:opacity-60"
          >
            {save.isPending ? 'Saving…' : 'Save'}
          </button>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <h3 className="text-[15px] font-semibold text-white">About them</h3>
          <Field
            label="Date of birth"
            hint="Sets their minimum wage band and the under-18 working time limits."
          >
            <input
              type="date"
              value={dob}
              max={today}
              onChange={(e) => setDob(e.target.value)}
              className={inputClass}
            />
          </Field>
          {dobBad && <p className="text-[13px] text-red-400">That date of birth is not right.</p>}
          <Field
            label="Payroll ID"
            hint="Their works number or employee reference in your payroll software. The pay run file uses it so each line lands on the right person."
          >
            <input
              type="text"
              value={payrollId}
              maxLength={40}
              autoComplete="off"
              onChange={(e) => setPayrollId(e.target.value)}
              className={inputClass}
            />
          </Field>
          {(isApprentice || !!start) && (
            <>
              <Field
                label="Apprenticeship start date"
                hint="The practical period start on their apprenticeship agreement. The apprentice rate runs for the first year, or until 19 if later."
              >
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field
                label="Apprenticeship end date"
                hint="Leave blank while they are on it. Once it ends the apprentice rate stops, whatever their age, and their age band applies from the next pay period."
              >
                <input
                  type="date"
                  value={end}
                  min={start || undefined}
                  onChange={(e) => setEnd(e.target.value)}
                  className={inputClass}
                />
              </Field>
              {endBad && (
                <p className="text-[13px] text-red-400">The end date is before the start date.</p>
              )}
              <div className="space-y-3">
                <p className="text-[13px] leading-snug text-white">
                  Only tick these if {firstName} chose to tell you. A 19 to 24 year old with an EHC
                  plan or who has been in care can still get the £1,000 incentive.
                </p>
                <label className="flex min-h-[44px] items-center gap-3 touch-manipulation">
                  <Checkbox
                    className={checkboxClass}
                    checked={careLeaver}
                    onCheckedChange={(c) => setCareLeaver(c === true)}
                  />
                  <span className="text-[14px] text-white">Care leaver</span>
                </label>
                <label className="flex min-h-[44px] items-center gap-3 touch-manipulation">
                  <Checkbox
                    className={checkboxClass}
                    checked={ehcp}
                    onCheckedChange={(c) => setEhcp(c === true)}
                  />
                  <span className="text-[14px] text-white">Has an EHC plan</span>
                </label>
              </div>
            </>
          )}
        </div>

        <div className="space-y-5">
          <h3 className="text-[15px] font-semibold text-white">How their holiday works</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {(['fixed', 'irregular', 'part_year'] as HolidayBasis[]).map((b) => (
              <button
                key={b}
                type="button"
                aria-pressed={basis === b}
                onClick={() => setBasis(b)}
                className={cn(chip, basis === b ? chipOn : chipOff)}
              >
                {HOLIDAY_BASIS_LABEL[b]}
              </button>
            ))}
          </div>
          <p className="text-[13px] leading-snug text-white">
            {basis === 'fixed'
              ? 'Set days each year: 5.6 weeks, pro rata for part-time. Set the days on the Leave page.'
              : basis === 'irregular'
                ? 'Hours change week to week. They build up 12.07% of the hours on their approved timesheets, worked out at the end of each pay period.'
                : 'They only work part of the year, with unpaid weeks off. They build up 12.07% of the hours on their approved timesheets.'}
          </p>
          {basis !== 'fixed' && (
            <div className="space-y-2">
              <p className="text-[12px] font-medium text-white">Pay holiday as it is earned?</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  aria-pressed={!rolledUp}
                  onClick={() => setRolledUp(false)}
                  className={cn(chip, !rolledUp ? chipOn : chipOff)}
                >
                  No, when taken
                </button>
                <button
                  type="button"
                  aria-pressed={rolledUp}
                  onClick={() => setRolledUp(true)}
                  className={cn(chip, rolledUp ? chipOn : chipOff)}
                >
                  Yes, rolled up
                </button>
              </div>
              <p className="text-[13px] leading-snug text-white">
                {rolledUp
                  ? 'Rolled-up holiday pay adds 12.07% to their pay every period. It must show as its own line on the payslip. They still take time off, unpaid at the time.'
                  : 'Holiday is paid when they take it, at their average pay over the last 52 paid weeks.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </FormSheet>
  );
}
