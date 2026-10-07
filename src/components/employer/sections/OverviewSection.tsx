/**
 * Employer Hub Overview — the boss's morning briefing.
 *
 * Rebuilt 7 Oct 2026 (Andrew: "all this needs to be completely redesigned").
 * It read like a settings page: an "In development" banner, a big Mate card,
 * a big quote-page card, then four stat tiles that showed 0 to co-admins.
 *
 * Now, in order (ELE-1939): a verdict headline, one To do queue where every
 * row has its own action, who's where today, the money (owner and admins
 * only), the week ahead, then the quote page and Mate as small things.
 * A brand-new firm sees a first-five-minutes checklist instead of empty
 * tiles (ELE-1819).
 *
 * Every figure comes from one firm-scoped call, get_employer_home(p_firm),
 * live on realtime and on focus. Money fields arrive null for an office
 * manager and the Money panel is not drawn at all.
 */
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, parseISO, differenceInCalendarDays } from 'date-fns';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton, LoadingBlocks } from '@/components/employer/editorial';
import { CommandTrigger } from '@/components/employer/EmployerCommandPalette';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { FirstJobGuide, type FirstJobStage } from '@/components/employer/overview/FirstJobGuide';
import { supabase } from '@/integrations/supabase/client';
import type { Job } from '@/services/jobService';
import { useEmployerHome, type EmployerHome } from '@/hooks/useEmployerHome';
import { useKitAttention } from '@/hooks/useKit';
import { buildKitTodo } from '@/components/employer/kit/kitTodo';
import { useFirmRenewals, certLabel, type FirmRenewal } from '@/hooks/useFirmRecurring';
import { OverviewClientMessages } from '@/components/employer/client-portal/OverviewClientMessages';
import { HubAreas } from '@/components/employer/overview/HubAreas';
import { buildHubAreas } from '@/components/employer/overview/hubAreasModel';
import { useClientMessageInbox } from '@/hooks/useCustomerPortal';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from '@/hooks/use-toast';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  HomeHero,
  HeroButton,
  PanelTitle,
  TodoList,
  TodayPanel,
  MoneyStrip,
  WeekAhead,
  QuotePageCard,
  AskMateBar,
  SetupChecklist,
  type HomeTodo,
  type Params,
  type SetupStep,
  type Tile,
  type TodayRow,
  type WeekItem,
} from '@/components/employer/overview/HomeSections';

interface OverviewSectionProps {
  onNavigate: (section: Section) => void;
  onOpenMate?: () => void;
  onOpenCommand?: () => void;
}

const HELP: PageHelpContent = {
  id: 'employer-overview',
  title: 'Your morning briefing',
  what: 'Everything in the firm that needs you today, on one screen. Open it first thing and work down the To do list.',
  steps: [
    {
      title: 'Work the To do list',
      body: 'Most urgent first: safety, then jobs with nobody booked, then approvals and expiring tickets. Each row has one button that takes you straight to it.',
    },
    {
      title: "Check who's where",
      body: "Today shows who is on which job, who has clocked in and who is on leave. Tap a person to open their job.",
    },
    {
      title: 'Look at the week',
      body: 'Jobs starting in the next seven days, anything with nobody booked, and leave coming up.',
    },
    {
      title: 'Jump to any part of the hub',
      body: 'Your hub has a card for People, Jobs, Finance, Safety, Clients and Smart Docs. Tap the card for that area, or one of the screens listed under it. A number shows where something is waiting for you.',
    },
  ],
  notes: [
    {
      title: 'Who sees the money',
      body: 'The owner and admins see Money. Office managers see everything else on this page, without the figures.',
    },
    {
      title: 'Live numbers',
      body: 'The page updates as your team clocks in, books leave or sends timesheets, and again whenever you come back to it.',
    },
  ],
};

const SHARED_KEY = 'employer-quote-page-shared';
const SETUP_HIDDEN_KEY = 'employer-setup-hidden';
const readFlag = (k: string) => {
  try {
    return window.localStorage.getItem(k) === '1';
  } catch {
    return false;
  }
};
const writeFlag = (k: string) => {
  try {
    window.localStorage.setItem(k, '1');
  } catch {
    /* private mode: remembered for this visit only */
  }
};

const gbp = (n: number) => {
  const v = Math.round(Math.abs(n));
  return `${n < 0 ? '−' : ''}£${v.toLocaleString('en-GB')}`;
};
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const shortDate = (iso: string) => format(parseISO(iso), 'EEE d MMM');
const firstName = (name: string) => name.split(' ')[0] || name;
const initialsOf = (name: string, given?: string | null) =>
  (given ||
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
  ).toUpperCase();

/* ── The To do queue, built from the one RPC ─────────────────────────── */

function buildTodo(h: EmployerHome): (HomeTodo & { hero: string })[] {
  const t: (HomeTodo & { hero: string })[] = [];
  const today = parseISO(h.today);
  const { safety: s, approvals: a, jobs: j, expiring: x, team } = h;

  if (s.riddor_due > 0) {
    const due = s.riddor_next?.due;
    t.push({
      key: 'riddor',
      kind: 'Safety',
      badge: 'RD',
      urgent: true,
      rank: 0,
      title: s.riddor_due === 1 ? 'RIDDOR report not made' : `${s.riddor_due} RIDDOR reports not made`,
      detail: s.riddor_next?.title ?? 'A reportable incident has not gone to the HSE',
      meta: due ? `HSE deadline ${shortDate(due)}` : 'Report on diagnosis',
      action: 'Report',
      hero: 'Make the RIDDOR report',
      section: 'incidents',
      params: s.riddor_next ? { incident: s.riddor_next.id } : undefined,
    });
  }
  if (s.incidents_unseen > 0) {
    t.push({
      key: 'incidents',
      kind: 'Safety',
      badge: 'IN',
      urgent: true,
      rank: 1,
      title:
        s.incidents_unseen === 1 ? 'New safety report' : `${s.incidents_unseen} new safety reports`,
      detail:
        s.incidents_unseen === 1 && s.incident_first
          ? `${s.incident_first.title}. The reporter is told once you open it`
          : 'Nobody has opened these yet',
      action: 'Open',
      hero: 'Open the safety report',
      section: 'incidents',
      params: s.incidents_unseen === 1 && s.incident_first ? { incident: s.incident_first.id } : undefined,
    });
  }
  if (s.actions_overdue > 0) {
    t.push({
      key: 'safety-actions',
      kind: 'Safety',
      badge: 'SA',
      urgent: true,
      rank: 2,
      title: `${plural(s.actions_overdue, 'safety action')} overdue`,
      detail: `${s.actions_open} open in total. Fixes promised after a report`,
      action: 'Review',
      hero: 'Review overdue safety actions',
      section: 'incidents',
    });
  }
  if (j.unstaffed_today > 0) {
    const one = j.unstaffed_today === 1 && j.unstaffed_today_first;
    t.push({
      key: 'unstaffed-today',
      kind: 'Jobs',
      badge: 'JB',
      urgent: true,
      rank: 10,
      title:
        j.unstaffed_today === 1
          ? 'A job on today has nobody booked'
          : `${j.unstaffed_today} jobs on today have nobody booked`,
      detail: one ? one.title : 'Book someone so it shows in their Worker Tools',
      action: 'Book',
      hero: 'Book someone on today’s job',
      section: one ? 'jobs' : 'diary',
      params: one ? { job: one.id } : undefined,
    });
  }
  if (a.timesheets_open_old > 0) {
    t.push({
      key: 'open-shifts',
      kind: 'People',
      badge: 'CL',
      rank: 11,
      title: `${plural(a.timesheets_open_old, 'shift')} never clocked out`,
      detail: 'Fix the finish time so the hours are right',
      action: 'Fix',
      hero: 'Fix open shifts',
      section: 'timesheets',
    });
  }
  const weekOnly = Math.max(0, j.unstaffed_week - j.unstaffed_today);
  if (weekOnly > 0) {
    t.push({
      key: 'unstaffed-week',
      kind: 'Jobs',
      badge: 'WK',
      rank: 12,
      title: `${plural(weekOnly, 'job')} this week with nobody booked`,
      detail: j.unstaffed_week_list
        .filter((u) => u.start_date && u.start_date > h.today)
        .slice(0, 2)
        .map((u) => u.title)
        .join(' · ') || 'Book the crew in the diary',
      action: 'Book',
      hero: 'Book this week’s jobs',
      section: 'diary',
    });
  }
  if (a.qs > 0) {
    t.push({
      key: 'qs',
      kind: 'Approvals',
      badge: 'QS',
      rank: 20,
      title: `${plural(a.qs, 'certificate')} waiting for QS sign-off`,
      detail: 'Review, then countersign or send back',
      action: 'Review',
      hero: 'Review certificates',
      section: 'qsreviews',
    });
  }
  if (a.timesheets > 0) {
    const waited = a.timesheets_oldest ? differenceInCalendarDays(today, parseISO(a.timesheets_oldest)) : 0;
    t.push({
      key: 'timesheets',
      kind: 'Approvals',
      badge: 'TS',
      rank: 21,
      title: `${plural(a.timesheets, 'timesheet')} to approve`,
      detail: `From ${plural(a.timesheets_people, 'person', 'people')}`,
      meta: a.timesheets_oldest ? `Oldest from ${shortDate(a.timesheets_oldest)}` : undefined,
      urgent: waited >= 7,
      action: 'Approve',
      hero: `Approve ${plural(a.timesheets, 'timesheet')}`,
      section: 'timesheets',
      params: { tab: 'pending' },
    });
  }
  if (a.leave > 0) {
    const f = a.leave_first;
    t.push({
      key: 'leave',
      kind: 'Approvals',
      badge: 'LV',
      rank: 22,
      title: `${plural(a.leave, 'leave request')} to decide`,
      detail: f
        ? `${firstName(f.name)}${f.type ? `, ${f.type.toLowerCase()}` : ''} from ${shortDate(f.start_date)}`
        : 'Check the diary, then approve or decline',
      action: 'Decide',
      hero: 'Decide on leave',
      section: 'leave',
    });
  }
  if (a.expenses > 0) {
    t.push({
      key: 'expenses',
      kind: 'Approvals',
      badge: 'EX',
      rank: 23,
      title: `${plural(a.expenses, 'expense claim')} to review`,
      detail: a.expenses_total != null ? `${gbp(a.expenses_total)} claimed` : 'Waiting on your approval',
      action: 'Review',
      hero: 'Review expenses',
      section: 'expenses',
    });
  }
  if (a.otj > 0) {
    t.push({
      key: 'otj',
      kind: 'Approvals',
      badge: 'OT',
      rank: 24,
      title: `${a.otj} apprentice training ${a.otj === 1 ? 'entry' : 'entries'} to confirm`,
      detail: 'Off-the-job hours your apprentices logged',
      action: 'Confirm',
      hero: 'Confirm training hours',
      section: 'apprentices',
    });
  }
  if (x.credentials > 0) {
    const c = x.credential_items[0];
    const expired = c && c.expiry_date < h.today;
    t.push({
      key: 'credentials',
      kind: 'Expiring',
      badge: 'CR',
      urgent: x.credentials_expired > 0,
      rank: 30,
      title:
        x.credentials_expired > 0
          ? `${plural(x.credentials, 'ticket')} expired or expiring`
          : `${plural(x.credentials, 'ticket')} expiring in 30 days`,
      detail: c ? `${c.name}: ${c.qualification}` : 'Team credentials',
      meta: c ? `${expired ? 'Expired' : 'Expires'} ${shortDate(c.expiry_date)}` : undefined,
      action: 'Renew',
      hero: 'Renew expiring tickets',
      section: 'elecid',
      params: c && x.credentials === 1 ? { member: c.employee_id } : undefined,
    });
  }
  x.firm_docs.forEach((d, i) => {
    const expired = d.expiry < h.today;
    t.push({
      key: `firm-doc-${i}`,
      kind: 'Expiring',
      badge: 'FD',
      urgent: expired,
      rank: 31,
      title: `${d.label} ${expired ? 'has expired' : 'is due'}`,
      detail: 'Customers and main contractors ask for it',
      meta: `${expired ? 'Expired' : 'Expires'} ${shortDate(d.expiry)}`,
      action: 'Update',
      hero: `Update ${d.label.toLowerCase()}`,
      section: 'settings',
    });
  });
  if ((s.vehicle_defects ?? 0) > 0 && s.vehicle_defect_first) {
    // ELE-1984: a driver found a problem on the walk-round.
    const d = s.vehicle_defect_first;
    const n = s.vehicle_defects ?? 0;
    t.push({
      key: 'vehicle-defects',
      kind: 'Safety',
      badge: 'VD',
      urgent: d.off_road,
      rank: 3,
      title: n === 1 ? 'Vehicle problem reported' : `${n} vehicles have problems reported`,
      detail: `${d.registration ?? 'Vehicle'}${d.off_road ? ': off the road' : ': still on the road'}`,
      meta: `Reported ${shortDate(d.reported.slice(0, 10))}`,
      action: 'Look',
      hero: 'Look at the vehicle problem',
      section: 'fleet',
      params: n === 1 ? { vehicle: d.id } : undefined,
    });
  }
  if (x.vehicles > 0 && x.vehicle_first) {
    const v = x.vehicle_first;
    t.push({
      key: 'vehicles',
      kind: 'Expiring',
      badge: 'VH',
      urgent: v.expiry < h.today,
      rank: 32,
      // MOT, road tax, insurance and service, 30 days ahead (ELE-1984).
      title: x.vehicles === 1 ? `${v.label} due` : `${x.vehicles} vehicle dates due`,
      detail: `${v.registration ?? 'Vehicle'}: ${v.label}`,
      meta: `${v.expiry < h.today ? 'Overdue since' : 'Due'} ${shortDate(v.expiry)}`,
      action: 'Open',
      hero: 'Book the vehicle in',
      section: 'fleet',
      params: x.vehicles === 1 && v.id ? { vehicle: v.id } : undefined,
    });
  }
  if (s.signatures_waiting > 0) {
    t.push({
      key: 'packs',
      kind: 'Paperwork',
      badge: 'PK',
      rank: 40,
      title: `${plural(s.signatures_waiting, 'signature')} missing on job packs`,
      detail: s.pack_first ? s.pack_first.title : 'The crew has not signed the RAMS',
      action: 'Chase',
      hero: 'Chase pack signatures',
      section: 'jobpacks',
    });
  }
  if (s.rams_pending > 0) {
    t.push({
      key: 'rams',
      kind: 'Paperwork',
      badge: 'RA',
      rank: 41,
      title: `${plural(s.rams_pending, 'RAMS', 'RAMS')} awaiting sign-off`,
      detail: 'Check them before the crew goes to site',
      action: 'Review',
      hero: 'Review RAMS',
      section: 'rams',
    });
  }
  if (j.diary_unsent > 0) {
    t.push({
      key: 'diary-unsent',
      kind: 'Jobs',
      badge: 'DY',
      rank: 42,
      title: 'Diary changes not sent',
      detail: `Your crew hasn't been told about ${plural(j.diary_unsent, 'change')}`,
      action: 'Send',
      hero: 'Send diary changes',
      section: 'diary',
    });
  }
  if (team.not_joined > 0) {
    const first = team.to_chase[0];
    t.push({
      key: 'invites',
      kind: 'People',
      badge: 'IV',
      rank: 43,
      title:
        team.not_joined === 1 && first
          ? `${first.name} hasn't joined yet`
          : `${team.not_joined} people haven't joined yet`,
      detail: first?.last_chased_at
        ? `Last chased ${shortDate(first.last_chased_at)}`
        : 'Invited but never signed in',
      action: 'Chase',
      hero: 'Chase team invites',
      section: 'team',
      params: { tab: 'invited' },
    });
  }
  if (h.money && h.money.overdue_count > 0) {
    t.push({
      key: 'overdue',
      kind: 'Money',
      badge: '£',
      urgent: true,
      rank: 25,
      title: `${gbp(h.money.overdue)} overdue`,
      detail: `${plural(h.money.overdue_count, 'invoice')} past the due date`,
      action: 'Chase',
      hero: 'Chase overdue invoices',
      section: 'quotes',
      params: { tab: 'overdue' },
    });
  }
  return t.sort((p, q) => p.rank - q.rank);
}

function buildRenewalTodo(list?: FirmRenewal[]): (HomeTodo & { hero: string })[] {
  const open = (list ?? []).filter((r) => !r.employer_job_id);
  if (!open.length) return [];
  const overdue = open.filter((r) => r.overdue).length;
  const first = open[0];
  return [
    {
      key: 'renewals',
      kind: 'Jobs',
      badge: 'RT',
      urgent: overdue > 0,
      rank: overdue > 0 ? 30 : 44,
      title:
        open.length === 1
          ? `${certLabel(first.report_type)} re-test ${first.overdue ? 'overdue' : 'due'}`
          : `${open.length} certificate re-tests ${overdue ? `due, ${overdue} overdue` : 'due in 14 days'}`,
      detail: [first.client_name, first.installation_address].filter(Boolean).join(', ') || 'Book it as a job',
      meta: `${first.overdue ? 'Was due' : 'Due'} ${shortDate(first.expiry_date)}`,
      action: 'Book',
      hero: 'Book certificate re-tests',
      section: 'recurring',
      params: { tab: 'renewals' },
    },
  ];
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export function OverviewSection({ onNavigate, onOpenMate, onOpenCommand }: OverviewSectionProps) {
  const [, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const { data: h, isLoading, error, refetch, isFetching } = useEmployerHome();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(() => readFlag(SHARED_KEY));
  const [setupHidden, setSetupHidden] = useState(() => readFlag(SETUP_HIDDEN_KEY));
  // Already loaded by the client messages block below; shared cache, no extra call.
  const { data: inbox = [] } = useClientMessageInbox();
  // ELE-1819: the guided first job (create, book someone, what next).
  const [firstJob, setFirstJob] = useState<{ stage: FirstJobStage; job: Job | null } | null>(null);
  const startBooking = async () => {
    // "Book someone on it": the firm's most recent real job.
    if (!h) return;
    const { data } = await supabase
      .from('employer_jobs')
      .select('*')
      .eq('user_id', h.firm.id)
      .is('archived_at', null)
      .or('is_template.is.null,is_template.eq.false')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) setFirstJob({ stage: 'book', job: data as unknown as Job });
    else setFirstJob({ stage: 'job', job: null });
  };

  const go = (section: string, params?: Params) =>
    params ? setSearchParams({ section, ...params }) : onNavigate(section as Section);

  // Kit register and van stock rows (ELE-1829) come from their own RPC.
  const { data: kitAttention } = useKitAttention(h?.firm.id);
  // Certificate re-tests due within 14 days and not yet booked (ELE-1821).
  const { data: renewals } = useFirmRenewals(14);
  const todo = useMemo(
    () =>
      h
        ? [...buildTodo(h), ...buildKitTodo(kitAttention, h.today), ...buildRenewalTodo(renewals)].sort(
            (p, q) => p.rank - q.rank
          )
        : [],
    [h, kitAttention, renewals]
  );

  const quoteUrl = h?.grow.slug ? `https://elec-mate.com/q/${h.grow.slug}` : null;
  const markShared = () => {
    writeFlag(SHARED_KEY);
    setShared(true);
  };
  const copyLink = async () => {
    if (!quoteUrl) return;
    const ok = await copyToClipboard(quoteUrl);
    if (ok) {
      markShared();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      toast({ title: 'Link copied', description: 'Put it on invoices, your van and your Google profile.' });
    } else {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };
  const shareLink = async () => {
    if (!quoteUrl) return go('quotepage');
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Get a quote', text: 'Request a quote from us', url: quoteUrl });
        markShared();
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    void copyLink();
  };

  const tools = (
    <>
      {/* Phones open the full-screen search sheet, wider screens the palette. */}
      {onOpenCommand && <CommandTrigger onOpen={onOpenCommand} />}
      <PageHelpButton help={HELP} />
      {/* The page is live (realtime, focus, every minute); on a phone the
          spare room goes to the firm name and date instead. */}
      <span className="hidden sm:inline-flex">
        <IconButton onClick={() => void refetch()} aria-label="Refresh">
          <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
        </IconButton>
      </span>
    </>
  );

  if (isLoading || (!h && !error)) {
    return (
      <div className="mx-auto max-w-7xl pt-6 pb-24">
        <LoadingBlocks />
      </div>
    );
  }

  if (!h) {
    return (
      <div className="mx-auto max-w-7xl pt-8 pb-24 space-y-4">
        <h1 className="text-[28px] font-semibold tracking-tight text-white">Couldn&apos;t load your briefing</h1>
        <p className="text-[14px] text-white">{(error as Error)?.message ?? 'Something went wrong.'}</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black touch-manipulation"
        >
          Try again
        </button>
      </div>
    );
  }

  const today = parseISO(h.today);
  const firm = h.firm.name ?? 'Your firm';
  const people = h.people_today;
  const out = people.filter((p) => p.state !== 'leave');
  const onClock = people.filter((p) => p.state === 'clocked_in').length;
  const onLeave = people.filter((p) => p.state === 'leave');
  const notBooked = Math.max(0, h.team.active - people.length);

  /* Setup: the first five minutes. */
  const st = h.setup;
  const steps: SetupStep[] = [
    {
      key: 'company',
      label: 'Company profile and logo',
      sub: 'Your name and logo go on every quote, invoice and certificate',
      done: st.company && st.logo,
      action: 'Set up',
      onGo: () => go('settings'),
    },
    {
      key: 'team',
      label: 'Add your team',
      sub: 'They get an invite and link up when they sign in',
      done: st.team,
      action: 'Add',
      onGo: () => go('team'),
    },
    {
      key: 'job',
      label: 'Create your first job',
      sub: 'Client, site and dates. Three short steps, we fill in what we can',
      done: st.job,
      action: 'Start',
      onGo: () => setFirstJob({ stage: 'job', job: null }),
    },
    {
      key: 'crew',
      label: 'Book someone on it',
      sub: 'It shows in their Worker Tools straight away',
      done: st.crew_booked,
      action: 'Book',
      onGo: () => (st.job ? void startBooking() : setFirstJob({ stage: 'job', job: null })),
    },
    {
      key: 'card',
      label: 'Turn on card payments',
      sub: 'Customers pay invoices by card and the money lands in your bank',
      done: st.card_payments,
      action: 'Turn on',
      onGo: () => go('settings'),
    },
    {
      key: 'share',
      label: 'Share your quote page',
      sub: 'Customers ask for quotes straight into your Leads',
      done: st.quote_page_lead || shared,
      action: 'Share',
      onGo: () => (quoteUrl ? void shareLink() : go('quotepage')),
    },
  ];
  const setupLeft = steps.filter((s) => !s.done);
  const isNewFirm = !st.team || !st.job;

  /* Hero. */
  const headline = isNewFirm
    ? `Let's get ${firm} running`
    : todo.length === 0
      ? 'All clear for today'
      : todo.length === 1
        ? '1 thing needs you today'
        : `${todo.length} things need you today`;

  const summaryParts: string[] = [];
  if (isNewFirm) {
    summaryParts.push(
      `${steps.length - setupLeft.length} of ${steps.length} set up. Five minutes and your team can see their jobs.`
    );
  } else {
    summaryParts.push(
      h.jobs.today === 0 ? 'No jobs on today.' : `${plural(h.jobs.today, 'job')} on today.`
    );
    if (out.length > 0)
      summaryParts.push(
        `${plural(out.length, 'person', 'people')} out${onClock > 0 ? `, ${onClock} on the clock` : ''}.`
      );
    if (onLeave.length > 0)
      summaryParts.push(
        onLeave.length === 1 ? `${firstName(onLeave[0].name)} is on leave.` : `${onLeave.length} on leave.`
      );
    if (h.jobs.starting_week_count > 0)
      summaryParts.push(`${plural(h.jobs.starting_week_count, 'more job')} start this week.`);
  }

  const top = todo[0];
  const primary = isNewFirm
    ? setupLeft[0]
      ? { label: setupLeft[0].label, run: setupLeft[0].onGo }
      : { label: 'New job', run: () => go('jobs') }
    : top
      ? { label: top.hero, run: () => go(top.section, top.params) }
      : { label: 'New job', run: () => go('jobs') };

  /* Today. */
  const todayRows: TodayRow[] = people.slice(0, 7).map((p) => {
    const place = [p.postcode, p.job_title].filter(Boolean).join(' · ');
    if (p.state === 'leave') {
      return {
        id: p.employee_id,
        name: p.name,
        initials: initialsOf(p.name, p.initials),
        where: `${p.leave_type ?? 'Leave'}${p.leave_until && p.leave_until !== h.today ? `, back after ${shortDate(p.leave_until)}` : ', today only'}`,
        status: 'On leave',
        tone: 'away',
      };
    }
    return {
      id: p.employee_id,
      name: p.name,
      initials: initialsOf(p.name, p.initials),
      where: place || 'Clocked in, no job picked',
      status:
        p.state === 'clocked_in' && p.clocked_in_at
          ? `In ${format(parseISO(p.clocked_in_at), 'HH:mm')}`
          : p.start_time
            ? `Booked ${p.start_time}`
            : 'Not clocked in',
      tone: p.state === 'clocked_in' ? 'live' : 'booked',
      onOpen: p.job_id ? () => go('jobs', { job: p.job_id! }) : undefined,
    };
  });
  const todayFooter =
    people.length > 7 || notBooked > 0 ? (
      <button
        type="button"
        onClick={() => go('diary')}
        className="h-11 w-full flex items-center justify-between text-[13px] font-semibold text-white touch-manipulation"
      >
        <span>
          {[
            people.length > 7 ? `${people.length - 7} more` : null,
            notBooked > 0 ? `${plural(notBooked, 'person', 'people')} not booked today` : null,
          ]
            .filter(Boolean)
            .join(' · ')}
        </span>
        <span className="text-elec-yellow">Diary</span>
      </button>
    ) : undefined;

  /* Week ahead. */
  const weekItems: WeekItem[] = [
    ...h.jobs.starting_week.map((jb) => ({
      key: `job-${jb.id}`,
      date: jb.start_date!,
      title: jb.title,
      detail: [jb.client, jb.location].filter(Boolean).join(' · ') || 'No site added',
      flag: jb.crew ? `${jb.crew} booked` : 'No crew',
      urgent: !jb.crew,
      onOpen: () => go('jobs', { job: jb.id }),
    })),
    ...h.leave_coming.map((l, i) => ({
      key: `leave-${i}`,
      date: l.start_date,
      title: `${l.name} on leave`,
      detail: `${l.type ?? 'Leave'}${l.end_date !== l.start_date ? ` until ${shortDate(l.end_date)}` : ''}`,
      flag: 'Leave',
      onOpen: () => go('leave'),
    })),
  ]
    .sort((p, q) => p.date.localeCompare(q.date))
    .slice(0, 6);

  /* Money (owner and admins only). */
  const m = h.money;
  const monthName = format(today, 'MMMM');
  const moneyTiles: Tile[] = m
    ? [
        {
          label: 'Owed to you',
          value: m.outstanding_count > 0 ? gbp(m.outstanding) : 'None',
          sub:
            m.overdue_count > 0
              ? `${gbp(m.overdue)} overdue on ${plural(m.overdue_count, 'invoice')}`
              : m.outstanding_count > 0
                ? `${plural(m.outstanding_count, 'invoice')}, none overdue`
                : 'No unpaid invoices',
          tone: m.overdue_count > 0 ? 'red' : undefined,
          onOpen: () => go('quotes', { tab: m.overdue_count > 0 ? 'overdue' : 'invoices' }),
        },
        {
          label: 'Paid this month',
          value: m.paid_month_count > 0 ? gbp(m.paid_month) : 'None yet',
          sub:
            m.paid_month_count > 0
              ? `${plural(m.paid_month_count, 'invoice')} paid in ${monthName}`
              : 'Nothing paid in yet',
          tone: m.paid_month_count > 0 ? 'green' : undefined,
          onOpen: () => go('quotes', { tab: 'invoices' }),
        },
        {
          label: 'Quotes waiting',
          value: m.quotes_waiting > 0 ? String(m.quotes_waiting) : 'None',
          sub:
            m.quotes_waiting > 0
              ? `${gbp(m.quotes_waiting_value)} waiting on a yes`
              : 'No quotes out for a decision',
          tone: m.quotes_waiting > 0 ? 'volt' : undefined,
          onOpen: () => go('quotes', { tab: 'quotes' }),
        },
        {
          label: 'Gross profit',
          value:
            m.invoiced_month_count === 0 && m.costs_month === 0 ? 'None yet' : gbp(m.gross_profit_month),
          sub:
            m.invoiced_month_count === 0
              ? m.costs_month > 0
                ? `${gbp(m.costs_month)} costs, nothing invoiced yet`
                : `Nothing invoiced in ${monthName} yet`
              : `${m.margin_pct != null ? `${m.margin_pct}% margin on ` : 'On '}${gbp(m.invoiced_month)} invoiced`,
          tone: m.gross_profit_month < 0 ? 'red' : m.gross_profit_month > 0 ? 'green' : undefined,
          onOpen: () => go('accounts'),
        },
      ]
    : [];

  const moneyStrip = m ? (
    <MoneyStrip
      title="Money"
      meta={`${monthName} so far`}
      tiles={moneyTiles}
      onTitle={() => go('financehub')}
    />
  ) : null;

  /* Your hub: one card per area, figures from the same call. */
  const clientUnread = inbox.reduce((n, t) => n + (t.unread ?? 0), 0);
  const areas = buildHubAreas(h, clientUnread);
  const settingsMissing = [
    !st.company ? 'company name' : null,
    !st.logo ? 'logo' : null,
    !st.card_payments ? 'card payments' : null,
  ].filter(Boolean) as string[];
  const settingsInfo = {
    left: settingsMissing.length,
    line:
      settingsMissing.length > 0
        ? `Still to add: ${settingsMissing.join(', ')}`
        : 'Company profile, branding, payments and QS sign-off',
  };

  const growPanel = (
    <section>
      <PanelTitle title="Grow" />
      <QuotePageCard
        url={quoteUrl}
        leadsWeek={h.grow.quote_page_leads_week}
        newLeads={h.grow.new_leads}
        copied={copied}
        onCopy={() => void copyLink()}
        onShare={() => void shareLink()}
        onQr={() => go('quotepage')}
        onLeads={() => go('leads')}
        onSetUp={() => go('quotepage')}
      />
    </section>
  );

  const matePanel = onOpenMate ? <AskMateBar onOpen={onOpenMate} /> : null;

  const setupPanel =
    setupLeft.length > 0 && (isNewFirm || !setupHidden) ? (
      <section>
        <SetupChecklist
          title={isNewFirm ? 'Your first five minutes' : 'Finish setting up'}
          steps={isNewFirm ? steps : setupLeft}
          done={steps.length - setupLeft.length}
          total={steps.length}
          onHide={
            isNewFirm
              ? undefined
              : () => {
                  writeFlag(SETUP_HIDDEN_KEY);
                  setSetupHidden(true);
                }
          }
        />
      </section>
    ) : null;

  const todaySection = !isNewFirm ? (
    <section>
      <PanelTitle
        title="Today"
        meta={h.jobs.today > 0 ? plural(h.jobs.today, 'job') : undefined}
        action="Diary"
        onAction={() => go('diary')}
      />
      <TodayPanel
        rows={todayRows}
        footer={todayFooter}
        empty={
          <div className="flex items-center gap-3">
            <p className="min-w-0 flex-1 text-[14px] text-white">
              {h.jobs.today > 0
                ? `${plural(h.jobs.today, 'job')} on today and nobody booked on ${h.jobs.today === 1 ? 'it' : 'them'}.`
                : 'Nobody is booked on a job today.'}
            </p>
            <button
              type="button"
              onClick={() => go('diary')}
              className="h-11 shrink-0 rounded-xl border border-white/[0.18] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation"
            >
              Open diary
            </button>
          </div>
        }
      />
    </section>
  ) : null;

  return (
    <div className="mx-auto max-w-7xl pb-28 space-y-6 sm:space-y-8">
      <HomeHero
        eyebrow={`${firm} · ${format(today, 'EEE d MMM')}`}
        headline={headline}
        summary={summaryParts.join(' ')}
        tools={tools}
        aside={!isNewFirm ? moneyStrip : null}
        actions={
          <>
            <HeroButton primary onClick={primary.run}>
              {primary.label}
            </HeroButton>
            {primary.label !== 'New job' && <HeroButton onClick={() => go('jobs')}>New job</HeroButton>}
            <HeroButton onClick={() => go('diary')}>Diary</HeroButton>
          </>
        }
      />

      <FirstJobGuide
        stage={firstJob?.stage ?? null}
        existingJob={firstJob?.job ?? null}
        onClose={() => setFirstJob(null)}
      />

      {/* A brand-new firm starts with its checklist; the hub follows. */}
      {isNewFirm && setupPanel}

      <HubAreas areas={areas} settings={settingsInfo} onGo={go} />

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
        <div className="space-y-6 sm:space-y-8 min-w-0">
          {(!isNewFirm || todo.length > 0) && (
            <section>
              <PanelTitle title="To do" meta={todo.length > 0 ? `${todo.length}` : undefined} />
              <TodoList items={todo} onGo={go} />
            </section>
          )}

          {/* ELE-1996: clients waiting on a reply (renders nothing otherwise). */}
          {!isNewFirm && <OverviewClientMessages />}

          {/* Phone and tablet: Today straight after the To do list, then Money. */}
          {todaySection && <div className="lg:hidden">{todaySection}</div>}
          {!isNewFirm && moneyStrip && <div className="lg:hidden">{moneyStrip}</div>}

          {!isNewFirm && (
            <section>
              <PanelTitle
                title="The week ahead"
                meta={
                  h.jobs.starting_week_count > 0
                    ? `${h.jobs.starting_week_count} starting`
                    : undefined
                }
              />
              <WeekAhead
                items={weekItems}
                empty={
                  <div className="flex items-center gap-3">
                    <p className="min-w-0 flex-1 text-[14px] text-white">
                      No new jobs start in the next seven days and nobody is off.
                    </p>
                    <button
                      type="button"
                      onClick={() => go('jobs')}
                      className="h-11 shrink-0 rounded-xl border border-white/[0.18] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation"
                    >
                      New job
                    </button>
                  </div>
                }
              />
            </section>
          )}
        </div>

        <div className="space-y-6 sm:space-y-8 min-w-0">
          {todaySection && <div className="hidden lg:block">{todaySection}</div>}
          {!isNewFirm && setupPanel}
          {growPanel}
          {matePanel}
        </div>
      </div>

      <p className="text-[13px] text-white">
        The Employer Hub is new and still growing. Something wrong or missing?{' '}
        <a
          href="mailto:founder@elec-mate.com?subject=Employer%20Hub%20feedback"
          className="inline-flex h-11 items-center font-semibold text-elec-yellow underline underline-offset-4 touch-manipulation"
        >
          Tell Andrew
        </a>
      </p>
    </div>
  );
}
