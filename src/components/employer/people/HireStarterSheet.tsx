/**
 * Make offer and Hire (ELE-2091).
 *
 * One sheet, two steps of the same flow:
 *  - offer: pay, start date, role and job title, prefilled from the advert and
 *    the applicant's Elec-ID. Saved on the application, then the candidate is
 *    moved to Offered (which sends them the usual push).
 *  - hire:  the offer again (editable), plus date of birth and apprentice
 *    start for the pay profile, and the app invite. One call puts them on the
 *    roster with that pay and start date, records probation from the firm's HR
 *    settings and opens their starter checklist.
 *
 * Owner and admins only: an offer carries pay.
 */
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { addDays, addMonths, format, nextMonday, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import FormSheet from '@/components/forms/FormSheet';
import { supabase } from '@/integrations/supabase/client';
import { panel } from '@/components/employer/overview/HomeSections';
import { KeyValue, PanelTitle, rowsClass } from '@/components/employer/pageParts/PageParts';
import { Field, inputClass, PrimaryButton, SecondaryButton } from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import { TEAM_ROLES, TEAM_ROLE_HINT, type TeamRole } from '@/lib/teamRoles';
import { ecsCardPhrase, jobTitleText } from '@/data/uk-electrician-constants';
import { useEmploymentLaw, useHrSettings } from '@/hooks/useRightToWork';
import { qualifyingDate } from '@/hooks/useHrRecords';
import { useStatutoryRates } from '@/hooks/usePayLaw';
import { BAND_LABEL, minimumWageOn } from '@/lib/payLaw';
import { useHireOffer, type HireInput, type OfferInput } from '@/hooks/useStarters';
import type { Vacancy, VacancyApplication } from '@/services/vacancyService';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chip = 'h-11 rounded-full border px-4 text-[13px] touch-manipulation';
const nice = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM yyyy') : '');
const money = (n: number, dp = 2) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: n % 1 ? dp : 0, maximumFractionDigits: dp })}`;

/** Roles offered on a hire, in the order a firm hires them. */
const HIRE_ROLES: TeamRole[] = [
  'Operative',
  'Apprentice',
  'Supervisor',
  'Project Manager',
  'QS',
  'Apprentice Co-ordinator',
  'Subcontractor',
].filter((r): r is TeamRole => (TEAM_ROLES as readonly string[]).includes(r));

const ROLE_LABEL: Partial<Record<TeamRole, string>> = { Operative: 'Electrician' };

/** A saved team_role the chips don't offer ("Electrician", "manager", an old
 *  value) falls back to the nearest chip so one is always selected. */
function hireRole(saved: string | null | undefined, fallback: TeamRole): TeamRole {
  if (!saved) return fallback;
  const hit = HIRE_ROLES.find((r) => r.toLowerCase() === saved.trim().toLowerCase());
  if (hit) return hit;
  if (/apprentice/i.test(saved)) return 'Apprentice';
  if (/sub ?contract/i.test(saved)) return 'Subcontractor';
  if (/supervis|foreman|charge ?hand/i.test(saved)) return 'Supervisor';
  if (/electrician|operative|mate|improver/i.test(saved)) return 'Operative';
  return fallback;
}

/** Money in the box as money: 19.5 reads 19.50. */
const rateText = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

export type HireSheetMode = 'offer' | 'hire';

export interface HireSheetSubmit {
  mode: HireSheetMode;
  details: HireInput;
  invite: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: HireSheetMode;
  application: VacancyApplication | null;
  vacancy: Vacancy | null;
  busy: boolean;
  onSubmit: (v: HireSheetSubmit) => void;
}

function defaultStart(vacancyStart: string | null | undefined): string {
  const today = format(new Date(), 'yyyy-MM-dd');
  if (vacancyStart && vacancyStart > today) return vacancyStart;
  return format(nextMonday(addDays(new Date(), 6)), 'yyyy-MM-dd');
}

export function HireStarterSheet({
  open,
  onOpenChange,
  mode,
  application,
  vacancy,
  busy,
  onSubmit,
}: Props) {
  const { data: offer, isLoading: offerLoading } = useHireOffer(application?.id, open);
  const { data: hr } = useHrSettings();
  const { data: lawInfo } = useEmploymentLaw();
  const rates = useStatutoryRates();

  // The Elec-ID they applied with: trade and cards, read under the hiring firm's RLS.
  const profileId = application?.applicant_profile_id ?? null;
  const { data: elecId, isFetched: elecIdFetched } = useQuery({
    queryKey: ['hire-elec-id', profileId],
    enabled: open && !!profileId,
    queryFn: async () => {
      const [{ data: p }, { data: q }] = await Promise.all([
        supabase
          .from('employer_elec_id_profiles')
          .select('job_title, ecs_card_type, ecs_expiry_date')
          .eq('id', profileId!)
          .maybeSingle(),
        supabase.from('employer_elec_id_qualifications').select('id').eq('profile_id', profileId!),
      ]);
      return {
        jobTitle: (p?.job_title as string | null) ?? null,
        ecsCard: (p?.ecs_card_type as string | null) ?? null,
        ecsExpiry: (p?.ecs_expiry_date as string | null) ?? null,
        qualifications: q?.length ?? 0,
      };
    },
  });

  const [payType, setPayType] = useState<'hourly' | 'annual'>('hourly');
  const [rate, setRate] = useState('');
  const [salary, setSalary] = useState('');
  const [startDate, setStartDate] = useState('');
  const [teamRole, setTeamRole] = useState<TeamRole>('Operative');
  const [jobTitle, setJobTitle] = useState('');
  const [dob, setDob] = useState('');
  const [apprenticeStart, setApprenticeStart] = useState('');
  const [invite, setInvite] = useState(true);
  const [seeded, setSeeded] = useState<string | null>(null);

  // Prefill once per opening: the saved offer first, then the advert and the Elec-ID.
  useEffect(() => {
    if (!open) {
      setSeeded(null);
      return;
    }
    if (!application || offerLoading || seeded === application.id) return;
    if (profileId && !elecIdFetched) return;
    const trade = elecId?.jobTitle ?? null;
    const isApprentice = /^apprentice/i.test(trade ?? '') || vacancy?.type === 'Apprenticeship';
    const period = (vacancy?.salary_period ?? '').toLowerCase();
    const advertHourly = period.startsWith('hour');
    setPayType(offer?.pay_type ?? (vacancy?.salary_min && !advertHourly ? 'annual' : 'hourly'));
    setRate(
      offer?.hourly_rate != null
        ? rateText(Number(offer.hourly_rate))
        : advertHourly && vacancy?.salary_min
          ? rateText(Number(vacancy.salary_min))
          : ''
    );
    setSalary(
      offer?.annual_salary != null
        ? String(offer.annual_salary)
        : !advertHourly && vacancy?.salary_min
          ? String(vacancy.salary_min)
          : ''
    );
    setStartDate(offer?.start_date ?? defaultStart(vacancy?.start_date));
    setTeamRole(hireRole(offer?.team_role, isApprentice ? 'Apprentice' : 'Operative'));
    setJobTitle(offer?.job_title ?? (trade ? jobTitleText(trade) : (vacancy?.title ?? '')));
    setDob('');
    setApprenticeStart('');
    setInvite(!!application.applicant_email);
    setSeeded(application.id);
  }, [open, application, offer, offerLoading, elecId, elecIdFetched, profileId, vacancy, seeded]);

  const first = application?.applicant_name.split(' ')[0] || 'They';
  const isSub = teamRole === 'Subcontractor';
  const isApprentice = teamRole === 'Apprentice';
  const rateNum = Number(rate);
  const salaryNum = Number(salary);
  const payOk = payType === 'hourly' ? rate !== '' && rateNum > 0 && rateNum < 1000 : salaryNum > 0;

  const months = hr?.default_probation_months ?? 6;
  const probationEnd =
    startDate && !isSub && months > 0
      ? format(addMonths(parseISO(startDate), months), 'yyyy-MM-dd')
      : null;
  const law = lawInfo?.law ?? null;
  const protectedFrom = !isSub ? qualifyingDate(startDate || null, law) : null;

  const minWage = useMemo(() => {
    if (!startDate || isSub || payType !== 'hourly') return null;
    return minimumWageOn(
      rates,
      dob || null,
      isApprentice ? apprenticeStart || startDate : null,
      startDate
    );
  }, [rates, dob, isApprentice, apprenticeStart, startDate, isSub, payType]);
  const belowMin = !!minWage && rateNum > 0 && rateNum < minWage.rate;

  const advert =
    vacancy?.salary_min || vacancy?.salary_max
      ? `The advert says ${[vacancy.salary_min, vacancy.salary_max]
          .filter((n): n is number => !!n)
          .map((n) => money(n, 2))
          .join(' to ')}${vacancy.salary_period ? ` a ${vacancy.salary_period}` : ''}.`
      : undefined;

  const cardsLine = [
    elecId?.ecsCard && elecId.ecsCard.toLowerCase() !== 'none'
      ? ecsCardPhrase(elecId.ecsCard)
      : null,
    elecId?.qualifications
      ? `${elecId.qualifications} ${elecId.qualifications === 1 ? 'qualification' : 'qualifications'}`
      : null,
  ]
    .filter(Boolean)
    .join(' and ');

  const ready = !!application && payOk && !!startDate && !belowMin && !busy;

  const submit = () => {
    if (!ready) return;
    const details: HireInput = {
      pay_type: payType,
      hourly_rate: rate,
      annual_salary: salary,
      start_date: startDate,
      team_role: teamRole,
      job_title: jobTitle.trim(),
      date_of_birth: mode === 'hire' && !isSub ? dob : '',
      apprentice_start_date: mode === 'hire' && isApprentice ? apprenticeStart || startDate : '',
    };
    onSubmit({
      mode,
      details,
      invite: mode === 'hire' && invite && !!application?.applicant_email,
    });
  };

  const title =
    mode === 'offer'
      ? `Offer for ${application?.applicant_name ?? 'the candidate'}`
      : `Hire ${application?.applicant_name ?? 'the candidate'}`;
  const description =
    mode === 'offer'
      ? `Record what you are offering. It goes onto their team record when you hire, so nobody types it again.`
      : `${first} joins your team with this pay and start date, and their starter checklist opens.`;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={vacancy?.title ?? (mode === 'offer' ? 'Make offer' : 'Hire')}
      title={title}
      description={description}
      footer={
        <div className="flex items-center justify-end gap-2">
          <SecondaryButton
            onClick={() => onOpenChange(false)}
            className="h-12 flex-1 px-5 sm:flex-none"
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            disabled={!ready}
            onClick={submit}
            className="h-12 flex-[2] px-5 sm:flex-none"
          >
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'offer' ? 'Save offer' : `Hire ${first}`}
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <div className="min-w-0 space-y-5">
          <Field label="Pay">
            <div className="flex flex-wrap gap-2">
              {(['hourly', 'annual'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={payType === p}
                  onClick={() => setPayType(p)}
                  className={cn(chip, payType === p ? chipOn : chipOff)}
                >
                  {p === 'hourly' ? 'Hourly rate' : 'Salary'}
                </button>
              ))}
            </div>
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            {payType === 'hourly' ? (
              <Field label="Hourly rate (£)" required hint={advert}>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  className={inputClass}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  onBlur={() => {
                    const n = Number(rate);
                    if (rate !== '' && Number.isFinite(n) && n > 0) setRate(rateText(n));
                  }}
                  placeholder="18.50"
                />
              </Field>
            ) : (
              <Field label="Salary a year (£)" required hint={advert}>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="100"
                  className={inputClass}
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="34000"
                />
              </Field>
            )}
            <Field label="Start date" required>
              <input
                type="date"
                className={inputClass}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Field>
          </div>
          {belowMin && minWage && (
            <p className="text-[13px] font-semibold leading-snug text-red-400">
              {money(rateNum)} is below the minimum wage on their start date ({money(minWage.rate)}{' '}
              an hour, {BAND_LABEL[minWage.band].toLowerCase()} band).
            </p>
          )}

          <Field label="Role on the team" hint={TEAM_ROLE_HINT[teamRole]}>
            <div className="flex flex-wrap gap-2">
              {HIRE_ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  aria-pressed={teamRole === r}
                  onClick={() => setTeamRole(r)}
                  className={cn(chip, teamRole === r ? chipOn : chipOff)}
                >
                  {ROLE_LABEL[r] ?? r}
                </button>
              ))}
            </div>
          </Field>
          <Field
            label="Job title"
            hint={
              elecId?.jobTitle
                ? 'From their Elec-ID. Goes on the contract.'
                : 'Goes on the contract.'
            }
          >
            <input
              className={inputClass}
              value={jobTitle}
              maxLength={80}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Approved electrician"
            />
          </Field>

          {mode === 'hire' && !isSub && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Date of birth"
                hint="Sets their minimum wage band. Leave it if you don't know. Their right-to-work details can fill it later."
              >
                <input
                  type="date"
                  className={inputClass}
                  value={dob}
                  max={format(addDays(new Date(), -365 * 13), 'yyyy-MM-dd')}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Field>
              {isApprentice && (
                <Field label="Apprenticeship started" hint="Leave it for a new apprenticeship.">
                  <input
                    type="date"
                    className={inputClass}
                    value={apprenticeStart || startDate}
                    onChange={(e) => setApprenticeStart(e.target.value)}
                  />
                </Field>
              )}
            </div>
          )}

          {mode === 'hire' && (
            <Field label="App invite">
              {application?.applicant_email ? (
                <div className="flex flex-wrap gap-2">
                  {[true, false].map((v) => (
                    <button
                      key={String(v)}
                      type="button"
                      aria-pressed={invite === v}
                      onClick={() => setInvite(v)}
                      className={cn(chip, invite === v ? chipOn : chipOff)}
                    >
                      {v ? `Email ${application.applicant_email}` : 'Not yet'}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] leading-snug text-white">
                  No email on the application. Add one on their team record to send the invite.
                </p>
              )}
            </Field>
          )}
        </div>

        <div className="min-w-0 space-y-3">
          <PanelTitle title={mode === 'offer' ? 'Goes onto their record' : 'When you hire'} />
          <div className={cn(panel, 'overflow-hidden')}>
            <div className={rowsClass}>
              <KeyValue
                label="Pay"
                value={
                  payOk
                    ? payType === 'hourly'
                      ? `${money(rateNum)} an hour`
                      : `${money(salaryNum, 0)} a year`
                    : 'Not set'
                }
                tone={payOk ? undefined : 'yellow'}
              />
              <KeyValue label="Starts" value={nice(startDate) || 'Not set'} />
              {!isSub && (
                <KeyValue
                  label={`Probation (${months} months)`}
                  value={probationEnd ? `To ${nice(probationEnd)}` : 'Not set'}
                />
              )}
              {protectedFrom && (
                <KeyValue
                  label="Unfair dismissal protection"
                  value={`From ${nice(protectedFrom)}`}
                />
              )}
              <KeyValue label="Cards" value={cardsLine || 'None on their Elec-ID'} />
              {mode === 'hire' && (
                <KeyValue label="Right to work" value="Check before day one" tone="yellow" />
              )}
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-white">
            {mode === 'offer'
              ? `${first} is told they have an offer. Nothing is added to your team until you hire.`
              : `Next on the checklist: the right-to-work check, the contract (filled in with this pay and start date) and their first job. ${
                  isSub
                    ? 'Subcontractors have no probation or pay profile.'
                    : 'Probation comes from your HR settings.'
                }`}
          </p>
        </div>
      </div>
    </FormSheet>
  );
}
