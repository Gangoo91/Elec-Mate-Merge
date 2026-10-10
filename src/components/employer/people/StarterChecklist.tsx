/**
 * The new starter checklist (ELE-2091): on the person sheet and on the People
 * hub. Every line is read live from the record it describes (starter_checklist),
 * so ticking happens where the work is done: recording the right-to-work check,
 * the contract being signed, the invite being accepted, the first job booked.
 *
 * Owner and admins only. The checklist RPC returns nothing to anyone else.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { addDays, addMonths, differenceInCalendarDays, format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  Initials,
  Row,
  RowList,
  StatusPill,
  rowsClass,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { ecsCardPhrase, jobTitleText } from '@/data/uk-electrician-constants';
import {
  invalidateStarters,
  useFinishStarter,
  useStarters,
  type Starter,
  type StarterItem,
  type StarterItemKey,
} from '@/hooks/useStarters';
import { useHrPeople, useSavePersonHr } from '@/hooks/useHrRecords';
import { usePayProfiles, useSavePayProfile } from '@/hooks/usePayLaw';
import { useHrSettings, useRtwStatusMap } from '@/hooks/useRightToWork';
import { usePersonContracts } from '@/hooks/usePersonContracts';
import { useChaseTeamInvite } from '@/hooks/useTeamInvites';
import { useEmployees } from '@/hooks/useEmployees';
import {
  SendContractSheet,
  type ContractPerson,
} from '@/components/employer/contracts/SendContractSheet';

const nice = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM yyyy') : '');
const short = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM') : '');
const money = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

const STARTER_ITEM_LABEL: Record<StarterItemKey, string> = {
  terms: 'Pay and start date',
  rtw: 'Right to work',
  contract: 'Contract',
  probation: 'Probation',
  pay_profile: 'Date of birth',
  app: 'Elec-Mate app',
  cards: 'Cards',
  policies: 'Policies',
  first_job: 'First job',
};

const NEXT_LABEL: Record<StarterItemKey, string> = {
  terms: 'pay and start date',
  rtw: 'right-to-work check',
  contract: 'contract',
  probation: 'probation',
  pay_profile: 'date of birth',
  app: 'app invite',
  cards: 'cards',
  policies: 'policies',
  first_job: 'first job',
};

/** Days until they start (negative once started), or null with no start date. */
const daysToStart = (s: Pick<Starter, 'start_date'>) =>
  s.start_date ? differenceInCalendarDays(parseISO(s.start_date), new Date()) : null;

/** The first thing left to do, for the hub row. */
function nextStep(s: Starter): StarterItem | null {
  // Details sent for a right-to-work check are waiting on the office, not on them.
  const needsYou = (i: StarterItem) =>
    i.state === 'todo' || (i.key === 'rtw' && i.state !== 'done' && !!i.submitted);
  return s.items.find(needsYou) ?? s.items.find((i) => i.state === 'waiting') ?? null;
}

function pill(item: StarterItem, s: Starter): { label: string; tone: PillTone } {
  if (item.state === 'done') return { label: 'Done', tone: 'green' };
  if (item.state === 'waiting') return { label: 'Waiting', tone: 'neutral' };
  const d = daysToStart(s);
  // Nobody works without a right-to-work check: red from a week out.
  if (item.key === 'rtw' && d !== null && d <= 7) return { label: 'To do', tone: 'red' };
  return { label: 'To do', tone: 'volt' };
}

export interface ChecklistPerson {
  id: string;
  name: string;
  email?: string | null;
  teamRole?: string | null;
  hourlyRate?: number | null;
  annualSalary?: number | null;
  joinDate?: string | null;
  linked?: boolean;
}

function detailFor(item: StarterItem, s: Starter, person: ChecklistPerson | null, first: string) {
  switch (item.key) {
    case 'terms': {
      if (item.state === 'done') {
        const pay =
          person?.annualSalary && person.annualSalary > 0
            ? `${money(person.annualSalary)} a year`
            : person?.hourlyRate && person.hourlyRate > 0
              ? `${money(person.hourlyRate)} an hour`
              : 'Pay set';
        return `${pay} from ${nice(item.start_date)}`;
      }
      return !item.pay_set && !item.start_date
        ? 'Add their pay and start date'
        : !item.pay_set
          ? 'Add their pay. Payroll needs it'
          : 'Add their start date';
    }
    case 'rtw':
      if (item.state === 'done')
        return item.status === 'not_required' ? 'Not required' : 'Checked and recorded';
      if (item.submitted) return `${first} sent their details. Check and record`;
      return s.items.find((i) => i.key === 'app')?.state === 'done'
        ? `${first} is asked on their phone`
        : 'Check and record it before day one';
    case 'contract':
      if (item.state === 'done')
        return item.countersigned ? 'Signed by both' : `${first} signed. Countersign it`;
      if (item.state === 'waiting')
        return item.status === 'Viewed'
          ? `${first} has opened it, not signed yet`
          : `Sent, waiting for ${first} to sign`;
      if (item.status === 'Declined') return `${first} declined it. Send a new one`;
      if (item.status === 'Expired') return 'The signing link expired. Send it again';
      return 'Pay and start date filled in for you';
    case 'probation':
      return item.state === 'done' ? `Ends ${nice(item.end_date)}` : 'Set it from your HR settings';
    case 'pay_profile':
      if (item.state === 'done') return 'On file for the minimum wage check';
      if (item.rtw_dob) return `${nice(item.rtw_dob)}, from their right-to-work details`;
      return 'Sets their minimum wage band';
    case 'app':
      if (item.state === 'done') return `${first} has joined`;
      if (item.state === 'waiting')
        return `Invite sent ${short(item.invite_sent_at)}, waiting for ${first}`;
      return item.has_email ? 'Send the invite email' : 'Add an email to send the invite';
    case 'cards': {
      const snap = item.snapshot ?? {};
      if (item.linked && item.state === 'done' && !snap.ecs_card_type)
        return 'Live from their Elec-ID';
      if (snap.ecs_card_type) {
        const card = ecsCardPhrase(snap.ecs_card_type);
        const to = snap.ecs_expiry_date
          ? ` to ${format(parseISO(snap.ecs_expiry_date), 'MMM yyyy')}`
          : '';
        return item.linked
          ? `${card}${to}, live from their Elec-ID`
          : `${card}${to}, from their Elec-ID`;
      }
      const q = snap.qualifications?.length ?? 0;
      if (q > 0)
        return `${q} ${q === 1 ? 'qualification' : 'qualifications'} from Elec-ID, no ECS card`;
      return 'No Elec-ID. Ask to see their ECS card';
    }
    case 'policies':
      if (item.state === 'done') return `Signed all ${item.total}`;
      if (item.state === 'waiting') return `${item.signed} of ${item.total} signed on their phone`;
      return `Signed on their phone once they join`;
    case 'first_job':
      return item.state === 'done'
        ? `On ${item.jobs} ${item.jobs === 1 ? 'job' : 'jobs'}`
        : 'The right-to-work check runs first';
  }
}

/** The record cards on the person sheet that a checklist row stands for. */
export type StarterCardKey = 'rtw' | 'contract' | 'probation' | 'pay_profile';
const CARD_KEYS: StarterItemKey[] = ['rtw', 'contract', 'probation', 'pay_profile'];

const btn =
  'h-11 shrink-0 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.1] disabled:opacity-60';

/* ── On the person ─────────────────────────────────────────────────────── */

export function StarterChecklistCard({
  person,
  onEdit,
  onAssignToJob,
  onOpenCard,
  onCheckCards,
}: {
  person: ChecklistPerson;
  onEdit?: () => void;
  onAssignToJob?: () => void;
  /** Opens the record card a row stands for (right to work, contract...). */
  onOpenCard?: (key: StarterCardKey) => void;
  /** Opens their credentials to check the cards. */
  onCheckCards?: () => void;
}) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data: rows = [], isLoading } = useStarters(person.id);
  // The rows read the same records as the cards below them (one source each),
  // so the checklist and a card can't disagree after either one saves.
  const { data: hrPeople } = useHrPeople();
  const { data: contracts } = usePersonContracts(person.id);
  const { data: payProfiles } = usePayProfiles();
  const { map: rtwMap, data: rtwRows } = useRtwStatusMap();
  const starter = useMemo(() => {
    const raw = rows[0] ?? null;
    if (!raw) return null;
    const hr = hrPeople?.find((h) => h.roster_id === person.id);
    const latest = contracts
      ? [...contracts].sort((a, b) => b.created_at.localeCompare(a.created_at))[0]
      : undefined;
    const rtw = rtwRows ? rtwMap.get(person.id) : undefined;
    const items = raw.items.map((i): StarterItem => {
      if (i.key === 'probation' && hrPeople) {
        const end = hr?.probation_end_date ?? null;
        return { ...i, state: end ? 'done' : 'todo', end_date: end };
      }
      if (i.key === 'contract' && contracts) {
        if (!latest) return { ...i, state: 'todo', status: null, on_file: false };
        const st = latest.sign_status ?? latest.status;
        return {
          ...i,
          on_file: true,
          status: st,
          countersigned: !!latest.employer_signed_at,
          state:
            st === 'Signed'
              ? 'done'
              : !st || st === 'Declined' || st === 'Expired'
                ? 'todo'
                : 'waiting',
        };
      }
      if (i.key === 'pay_profile' && payProfiles) {
        const dob = payProfiles.get(person.id)?.dateOfBirth ?? null;
        return dob ? { ...i, state: 'done', rtw_dob: null } : { ...i, state: 'todo' };
      }
      if (i.key === 'rtw' && rtw) {
        const done = ['checked', 'due', 'not_required'].includes(rtw.status);
        return {
          ...i,
          status: rtw.status,
          submitted: !!rtw.submitted_at,
          state: done ? 'done' : rtw.submitted_at ? 'waiting' : 'todo',
        };
      }
      return i;
    });
    return { ...raw, items, done: items.filter((i) => i.state === 'done').length };
  }, [rows, hrPeople, contracts, payProfiles, rtwMap, rtwRows, person.id]);
  // The roster row has the salary the person sheet doesn't carry.
  const { data: employees = [] } = useEmployees();
  const roster = employees.find((e) => e.id === person.id);
  const payPerson: ChecklistPerson = {
    ...person,
    hourlyRate: roster?.hourly_rate ?? person.hourlyRate,
    annualSalary:
      roster?.pay_type === 'annual' && roster.annual_salary ? Number(roster.annual_salary) : null,
  };
  const { data: hr } = useHrSettings();
  const savePersonHr = useSavePersonHr();
  const savePay = useSavePayProfile();
  const chase = useChaseTeamInvite();
  const finish = useFinishStarter();
  const [contractOpen, setContractOpen] = useState(false);
  const [inviting, setInviting] = useState(false);
  const first = person.name.split(' ')[0] || 'They';

  if (isLoading || !starter) return null;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const openCard = (key: StarterCardKey, id: string) =>
    onOpenCard ? onOpenCard(key) : scrollTo(id);

  const sendInvite = async () => {
    setInviting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-team-welcome', {
        body: { employeeId: person.id },
      });
      if (error || (data as { success?: boolean } | null)?.success === false) throw new Error();
      toast({ title: 'Invite sent', description: `${first} has an email to join the app.` });
    } catch {
      toast({
        title: 'The invite did not go',
        description: 'Try again in a minute.',
        variant: 'destructive',
      });
    } finally {
      setInviting(false);
      invalidateStarters(qc);
    }
  };

  const setProbation = async () => {
    const start = starter.start_date ?? person.joinDate;
    if (!start) return onEdit?.();
    const end = format(addMonths(parseISO(start), hr?.default_probation_months ?? 6), 'yyyy-MM-dd');
    try {
      await savePersonHr.mutateAsync({
        rosterId: person.id,
        start_date: start,
        probation_end_date: end,
        probation_review_date: format(addDays(parseISO(end), -14), 'yyyy-MM-dd'),
      });
      invalidateStarters(qc);
      toast({ title: 'Probation set', description: `Ends ${nice(end)}.` });
    } catch {
      toast({
        title: 'Probation not saved',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const applySentDob = async (dob: string) => {
    try {
      await savePay.mutateAsync({ employeeId: person.id, dateOfBirth: dob });
      invalidateStarters(qc);
      toast({ title: 'Date of birth saved' });
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const action = (item: StarterItem): { label: string; run: () => void; busy?: boolean } | null => {
    if (item.state === 'done') {
      if (item.key === 'contract' && !item.countersigned)
        return { label: 'Open', run: () => openCard('contract', 'person-contract') };
      return null;
    }
    switch (item.key) {
      case 'terms':
        return onEdit ? { label: 'Add', run: onEdit } : null;
      case 'rtw':
        return item.state === 'todo' || item.submitted
          ? { label: 'Record', run: () => openCard('rtw', 'person-rtw') }
          : null;
      case 'contract':
        return item.state === 'todo' ? { label: 'Send', run: () => setContractOpen(true) } : null;
      case 'probation':
        return { label: 'Set', run: setProbation, busy: savePersonHr.isPending };
      case 'pay_profile':
        return item.rtw_dob
          ? { label: 'Use it', run: () => applySentDob(item.rtw_dob!), busy: savePay.isPending }
          : { label: 'Add', run: () => openCard('pay_profile', 'person-pay') };
      case 'app':
        if (!item.has_email) return onEdit ? { label: 'Add email', run: onEdit } : null;
        return item.state === 'waiting'
          ? {
              label: 'Chase',
              busy: chase.isPending,
              run: () =>
                chase.mutate(person.id, {
                  onSuccess: () => {
                    invalidateStarters(qc);
                    toast({ title: 'Invite sent again' });
                  },
                  onError: (e) =>
                    toast({
                      title: 'Not sent',
                      description: e instanceof Error ? e.message : 'Please try again.',
                      variant: 'destructive',
                    }),
                }),
            }
          : { label: 'Send', run: sendInvite, busy: inviting };
      case 'policies':
        return { label: 'Policies', run: () => navigate('/employer?section=policies') };
      case 'cards':
        // Nothing to record here: look at their cards, then it is ticked
        // from their Elec-ID (or seen in person).
        return onCheckCards ? { label: 'Check', run: onCheckCards } : null;
      case 'first_job':
        return onAssignToJob ? { label: 'Assign', run: onAssignToJob } : null;
      default:
        return null;
    }
  };

  const allDone = starter.done === starter.total;
  const contractPerson: ContractPerson = {
    id: person.id,
    name: person.name,
    email: person.email,
    teamRole: person.teamRole,
    hourlyRate: payPerson.hourlyRate,
    annualSalary: payPerson.annualSalary,
    linked: person.linked,
    joinDate: starter.start_date ?? person.joinDate,
    jobTitle: starter.job_title ? jobTitleText(starter.job_title) : null,
  };

  return (
    <section>
      <PanelTitle
        title={starter.finished_at ? 'Onboarding' : 'Starting'}
        meta={`${starter.done} of ${starter.total} done`}
        action={starter.finished_at ? 'Reopen' : allDone ? 'Finish' : undefined}
        onAction={() =>
          finish.mutate(
            { rosterId: person.id, reopen: !!starter.finished_at },
            {
              onSuccess: () =>
                toast({
                  title: starter.finished_at ? 'Checklist reopened' : 'Onboarding finished',
                }),
            }
          )
        }
      />
      <div className={cn(panel, 'overflow-hidden')}>
        <div className="px-4 pt-3 sm:px-5">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={starter.total}
            aria-valuenow={starter.done}
            aria-label="Onboarding progress"
          >
            <div
              className="h-full rounded-full bg-emerald-400 transition-[width]"
              style={{ width: `${starter.total ? (starter.done / starter.total) * 100 : 0}%` }}
            />
          </div>
          <p className="mt-2 text-[13px] text-white">
            {starter.vacancy_title ? `Hired for ${starter.vacancy_title}` : 'Hired'}
            {starter.start_date
              ? (daysToStart(starter) ?? 0) > 0
                ? `. Starts ${nice(starter.start_date)}`
                : `. Started ${nice(starter.start_date)}`
              : ''}
          </p>
        </div>
        <div className={cn(rowsClass, 'mt-2 border-t border-white/[0.07]')}>
          {starter.items.map((item) => {
            const p = pill(item, starter);
            const a = action(item);
            // Rows with a record card open it, so the card isn't shown twice.
            const card = onOpenCard && CARD_KEYS.includes(item.key);
            return (
              <Row
                key={item.key}
                onClick={card ? () => onOpenCard!(item.key as StarterCardKey) : undefined}
                chevron={card ? !a : undefined}
                title={STARTER_ITEM_LABEL[item.key]}
                detail={detailFor(item, starter, payPerson, first)}
                trailing={
                  <>
                    {a && (
                      <button
                        type="button"
                        className={btn}
                        disabled={a.busy}
                        onClick={(e) => {
                          e.stopPropagation();
                          a.run();
                        }}
                      >
                        {a.busy ? <Loader2 className="h-4 w-4 animate-spin" /> : a.label}
                      </button>
                    )}
                    {!a && <StatusPill tone={p.tone}>{p.label}</StatusPill>}
                  </>
                }
              />
            );
          })}
        </div>
      </div>
      <SendContractSheet
        open={contractOpen}
        onOpenChange={(o) => {
          setContractOpen(o);
          if (!o) invalidateStarters(qc);
        }}
        person={contractPerson}
      />
    </section>
  );
}

/* ── On the People hub ─────────────────────────────────────────────────── */

export function StartersPanel() {
  const navigate = useNavigate();
  const { data: starters = [] } = useStarters(null);
  if (starters.length === 0) return null;

  return (
    <section>
      <PanelTitle title="New starters" meta={`${starters.length}`} />
      <RowList>
        {starters.map((s) => {
          const next = nextStep(s);
          const d = daysToStart(s);
          const when = !s.start_date
            ? 'No start date'
            : d! > 0
              ? `Starts ${short(s.start_date)}`
              : d === 0
                ? 'Starts today'
                : `Started ${short(s.start_date)}`;
          const rtwLate =
            d !== null && d <= 7 && s.items.some((i) => i.key === 'rtw' && i.state !== 'done');
          return (
            <Row
              key={s.roster_id}
              lead={<Initials name={s.name} />}
              title={s.name}
              detail={
                <>
                  {when}
                  {next && (
                    <>
                      {' · '}
                      <span className={rtwLate ? 'font-semibold text-red-400' : undefined}>
                        Next: {NEXT_LABEL[next.key]}
                      </span>
                    </>
                  )}
                </>
              }
              trailing={
                <StatusPill tone={s.done === s.total ? 'green' : 'neutral'}>
                  {s.done} of {s.total}
                </StatusPill>
              }
              onClick={() => navigate(`/employer?section=team&member=${s.roster_id}`)}
            />
          );
        })}
      </RowList>
    </section>
  );
}
