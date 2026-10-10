import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useActingControls } from '@/hooks/college/useCollegeAccess';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';
import { SupportViewAsPanel } from '@/components/college/support/SupportViewAsPanel';

/* ==========================================================================
   Hub colleges: pilot access + founder pilot console (ELE-1965).

   Per college: access status and days left, people (staff invited vs signed
   in, learners on the roster vs joined, covered by access), what moved since
   the pilot started and this week, last tutor activity, and a "needs a nudge"
   flag with an email DRAFT to the lead (mailto or preview; never sent).
   Actions: start pilot, extend, contracted until a date, mark lapsed, open as
   this college (white-glove). Plus the monthly count of learners with access
   for invoicing, and pilots ending in the next 14 days.

   Everything comes from admin_college_pilot_console and is changed through
   admin_set_college_access; both refuse anyone but a platform admin.
   Fixture accounts and admin_bulk profiles are left out of every count.
   ========================================================================== */

export interface ConsoleCollege {
  id: string;
  name: string;
  code: string;
  notes: string | null;
  access_status: 'none' | 'pilot' | 'contracted' | 'lapsed';
  phase: 'none' | 'upcoming' | 'active' | 'ending_soon' | 'grace' | 'ended';
  has_access: boolean;
  pilot_started_at: string | null;
  pilot_ends_at: string | null;
  contract_until: string | null;
  ends_on: string | null;
  grace_until: string | null;
  days_left: number | null;
  since: string;
  staff_invited: number;
  staff_signed_in: number;
  staff_with_access: number;
  learners_roster: number;
  learners_joined: number;
  learners_with_access: number;
  active_7d: number;
  evidence: number;
  evidence_7d: number;
  decisions: number;
  decisions_7d: number;
  hours_logged: number;
  hours_verified: number;
  hours_7d: number;
  quizzes_set: number;
  messages: number;
  messages_7d: number;
  registers: number;
  registers_7d: number;
  last_tutor_activity: string | null;
  last_movement: string | null;
  needs_nudge: boolean;
  lead: { name: string | null; email: string | null } | null;
}

export interface ConsoleMonth {
  month: string;
  college_id: string;
  college_name: string;
  learners: number;
  staff: number;
}

export interface ConsoleData {
  colleges: ConsoleCollege[];
  monthly: ConsoleMonth[];
  history: Array<{
    college_id: string;
    action: string;
    access_status: string;
    starts_on: string | null;
    ends_on: string | null;
    notes: string | null;
    created_at: string;
    by: string | null;
  }>;
}

const dayMonth = (iso: string | null | undefined) =>
  iso
    ? new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
const longDate = (iso: string | null | undefined) =>
  iso
    ? new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : '';
const monthLabel = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });
const todayIso = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
const addDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};
function ago(iso: string | null): string {
  if (!iso) return 'never';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 14) return `${days} days ago`;
  return dayMonth(iso);
}

export async function loadConsole(): Promise<ConsoleData> {
  const { data, error } = await supabase.rpc('admin_college_pilot_console' as never);
  if (error) throw error;
  return data as unknown as ConsoleData;
}

/* ── Status line ────────────────────────────────────────────────────── */

export function accessLabel(c: ConsoleCollege): { text: string; tone: 'good' | 'warn' | 'plain' } {
  const left = c.days_left ?? 0;
  switch (c.phase) {
    case 'none':
      return { text: 'Access not set', tone: 'plain' };
    case 'upcoming':
      return { text: `Pilot starts ${dayMonth(c.pilot_started_at)}`, tone: 'plain' };
    case 'active':
      return {
        text:
          c.access_status === 'pilot'
            ? `Pilot · ${left} days left`
            : `Contracted to ${dayMonth(c.contract_until)}`,
        tone: 'good',
      };
    case 'ending_soon':
      return {
        text: `${c.access_status === 'pilot' ? 'Pilot ends' : 'Contract ends'} ${dayMonth(c.ends_on)} · ${left} ${left === 1 ? 'day' : 'days'} left`,
        tone: 'warn',
      };
    case 'grace':
      return { text: `In grace until ${dayMonth(c.grace_until)}`, tone: 'warn' };
    default:
      return {
        text: c.access_status === 'lapsed' ? 'Lapsed' : `Ended ${dayMonth(c.grace_until)}`,
        tone: 'plain',
      };
  }
}

/* ── Summary across colleges ────────────────────────────────────────── */

export function ConsoleSummary({ data }: { data: ConsoleData }) {
  const live = data.colleges.filter((c) => c.has_access);
  const ending = data.colleges.filter((c) => c.phase === 'ending_soon' || c.phase === 'grace');
  const nudge = data.colleges.filter((c) => c.needs_nudge);
  const learners = live.reduce((n, c) => n + c.learners_with_access, 0);
  const tiles: Array<{ label: string; value: string; warn?: boolean }> = [
    { label: 'Colleges with access', value: String(live.length) },
    { label: 'Learners with access now', value: String(learners) },
    {
      label: 'Ending in 14 days or in grace',
      value: String(ending.length),
      warn: ending.length > 0,
    },
    { label: 'Need a nudge', value: String(nudge.length), warn: nudge.length > 0 },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {tiles.map((t) => (
        <div
          key={t.label}
          className={cn(
            'rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-4 py-3.5',
            t.warn && 'border-orange-400/40'
          )}
        >
          <dt className="text-[12.5px] font-medium text-white">{t.label}</dt>
          <dd
            className={cn(
              'mt-1.5 text-[26px] font-bold leading-none tabular-nums',
              t.warn ? 'text-orange-400' : 'text-white'
            )}
          >
            {t.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function EndingSoonList({ data }: { data: ConsoleData }) {
  const rows = data.colleges
    .filter((c) => c.access_status !== 'none' && (c.phase === 'ending_soon' || c.phase === 'grace'))
    .sort((a, b) => (a.days_left ?? 0) - (b.days_left ?? 0));
  return (
    <section className="space-y-2.5">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        Pilots ending in the next 14 days
      </h3>
      {rows.length === 0 ? (
        <p className="text-[13px] text-white">None. Nothing ends in the next two weeks.</p>
      ) : (
        <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
          {rows.map((c) => (
            <li
              key={c.id}
              className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3"
            >
              <span className="text-[14px] font-semibold text-white">{c.name}</span>
              <span className="text-[12.5px] text-orange-300">{accessLabel(c).text}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ── Monthly count for invoicing ────────────────────────────────────── */

export function MonthlyAccessList({ data }: { data: ConsoleData }) {
  const months = useMemo(() => {
    const by = new Map<string, ConsoleMonth[]>();
    for (const m of data.monthly) {
      const list = by.get(m.month) ?? [];
      list.push(m);
      by.set(m.month, list);
    }
    return [...by.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [data.monthly]);
  return (
    <section className="space-y-2.5">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        Learners with access, by month
      </h3>
      <p className="text-[12.5px] leading-relaxed text-white">
        Everyone covered by a college at any point in the month, counted once. Use it for the
        invoice. Test and fixture accounts are left out.
      </p>
      {months.length === 0 ? (
        <p className="text-[13px] text-white">No college has had access yet.</p>
      ) : (
        <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
          {months.map(([month, rows]) => (
            <li key={month} className="px-4 py-3">
              <p className="text-[13px] font-semibold text-white">{monthLabel(month)}</p>
              <ul className="mt-1 space-y-0.5">
                {rows.map((r) => (
                  <li
                    key={r.college_id}
                    className="flex justify-between gap-3 text-[12.5px] tabular-nums text-white"
                  >
                    <span className="min-w-0 truncate">{r.college_name}</span>
                    <span className="shrink-0">
                      {r.learners} {r.learners === 1 ? 'learner' : 'learners'} · {r.staff} staff
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ── One college ────────────────────────────────────────────────────── */

type Panel = null | 'start' | 'extend' | 'contract' | 'lapse' | 'nudge' | 'viewas';

function Figure({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[12px] font-medium text-white">{label}</dt>
      <dd className="mt-0.5 text-[17px] font-semibold leading-tight tabular-nums text-white">
        {value}
      </dd>
      {sub && <dd className="text-[12px] leading-snug text-white">{sub}</dd>}
    </div>
  );
}

function nudgeDraft(c: ConsoleCollege) {
  const first = (c.lead?.name ?? '').trim().split(/\s+/)[0] || 'there';
  const subject = `${c.name}: how the College Hub pilot is going`;
  const lines = [
    `Hi ${first},`,
    '',
    `Things have been quiet on ${c.name}'s College Hub this past week, so I wanted to check in.`,
    '',
    `So far ${c.learners_joined} of ${c.learners_roster} learners have joined, ${c.staff_signed_in} of ${c.staff_invited} staff have signed in, and learners have logged ${c.evidence} pieces of evidence and ${c.hours_logged} off-the-job hours.`,
    '',
    'Is anything getting in the way? I am happy to set up cohorts or learners for you, walk a tutor through registers and marking, or jump on a 15 minute call.',
  ];
  if (c.ends_on)
    lines.push(
      '',
      `${c.access_status === 'pilot' ? 'Your pilot runs' : 'Your access runs'} until ${longDate(c.ends_on)}.`
    );
  lines.push('', 'Best wishes,', 'Andrew', 'Elec-Mate');
  const body = lines.join('\n');
  const to = c.lead?.email ?? '';
  return {
    to,
    subject,
    body,
    href: `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

export function CollegeAccessCard({
  c,
  onChanged,
  children,
}: {
  c: ConsoleCollege;
  onChanged: () => void;
  /** The discount-code editor, kept from the original sheet. */
  children?: ReactNode;
}) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { startActing } = useActingControls();
  const [panel, setPanel] = useState<Panel>(null);
  const [busy, setBusy] = useState(false);
  const [start, setStart] = useState(todayIso());
  const [end, setEnd] = useState(addDays(todayIso(), 42));
  const [extendTo, setExtendTo] = useState(
    c.pilot_ends_at ? addDays(c.pilot_ends_at, 14) : addDays(todayIso(), 42)
  );
  const [contractTo, setContractTo] = useState(c.contract_until ?? addDays(todayIso(), 365));
  const [notes, setNotes] = useState('');
  const label = accessLabel(c);
  const draft = nudgeDraft(c);

  const act = async (action: string, date: string | null, startOn?: string) => {
    setBusy(true);
    const { error } = await supabase.rpc(
      'admin_set_college_access' as never,
      {
        p_college: c.id,
        p_action: action,
        p_date: date,
        p_notes: notes.trim() || null,
        p_start: startOn ?? null,
      } as never
    );
    setBusy(false);
    if (error) {
      toast({ title: 'Not changed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({
      title: 'Access updated',
      description: `${c.name}: learners and staff were updated straight away.`,
    });
    setPanel(null);
    setNotes('');
    onChanged();
  };

  const openAs = async () => {
    setBusy(true);
    try {
      await startActing(c.id, 'White-glove set-up from Admin → Colleges');
      navigate('/college');
    } catch (e) {
      toast({
        title: 'Could not open',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
      setBusy(false);
    }
  };

  const toggle = (p: Panel) => setPanel((x) => (x === p ? null : p));
  const isPilot = c.access_status === 'pilot';

  return (
    <li className="space-y-4 px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-white">
            {c.name} <span className="font-mono text-[12px] font-normal">{c.code}</span>
          </p>
          <p
            className={cn(
              'mt-0.5 text-[12.5px] font-medium',
              label.tone === 'good'
                ? 'text-emerald-300'
                : label.tone === 'warn'
                  ? 'text-orange-300'
                  : 'text-white'
            )}
          >
            {label.text}
            {c.needs_nudge && <span className="ml-2 text-orange-300">· Needs a nudge</span>}
          </p>
        </div>
        <p className="text-[12px] text-white">
          Last tutor activity {ago(c.last_tutor_activity)}
          {c.last_movement && c.last_movement !== c.last_tutor_activity
            ? ` · last movement ${ago(c.last_movement)}`
            : ''}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4 xl:grid-cols-6">
        <Figure
          label="Staff signed in"
          value={`${c.staff_signed_in} of ${c.staff_invited}`}
          sub={`${c.staff_with_access} covered`}
        />
        <Figure
          label="Learners joined"
          value={`${c.learners_joined} of ${c.learners_roster}`}
          sub={`${c.learners_with_access} covered`}
        />
        <Figure label="Active this week" value={c.active_7d} sub="learners" />
        <Figure label="Evidence" value={c.evidence} sub={`${c.evidence_7d} this week`} />
        <Figure label="Decisions" value={c.decisions} sub={`${c.decisions_7d} this week`} />
        <Figure label="Hours logged" value={c.hours_logged} sub={`${c.hours_verified} verified`} />
        <Figure label="Registers" value={c.registers} sub={`${c.registers_7d} this week`} />
        <Figure label="Quizzes set" value={c.quizzes_set} />
        <Figure label="Messages" value={c.messages} sub={`${c.messages_7d} this week`} />
      </dl>

      <div className="flex flex-wrap gap-2">
        {(c.access_status === 'none' || c.access_status === 'lapsed' || c.phase === 'ended') && (
          <button type="button" onClick={() => toggle('start')} className={COLLEGE_BTN}>
            Start pilot
          </button>
        )}
        {isPilot && (
          <button type="button" onClick={() => toggle('extend')} className={COLLEGE_BTN}>
            Extend pilot
          </button>
        )}
        {c.access_status !== 'none' && (
          <button type="button" onClick={() => toggle('contract')} className={COLLEGE_BTN}>
            {c.access_status === 'contracted' ? 'Change contract date' : 'Mark contracted'}
          </button>
        )}
        {(c.access_status === 'pilot' || c.access_status === 'contracted') && (
          <button type="button" onClick={() => toggle('lapse')} className={COLLEGE_BTN}>
            Mark lapsed
          </button>
        )}
        {c.needs_nudge && (
          <button type="button" onClick={() => toggle('nudge')} className={COLLEGE_BTN}>
            Draft a nudge
          </button>
        )}
        {/* ELE-1966: support view-as, read only, with the college's consent. */}
        <button type="button" onClick={() => toggle('viewas')} className={COLLEGE_BTN}>
          View as a staff member
        </button>
        <button
          type="button"
          onClick={() => void openAs()}
          disabled={busy}
          className={COLLEGE_BTN_PRIMARY}
        >
          Open as this college
        </button>
      </div>

      {panel === 'viewas' && (
        <div className="rounded-2xl border border-white/[0.08] p-4">
          <SupportViewAsPanel collegeId={c.id} collegeName={c.name} />
        </div>
      )}

      {panel === 'start' && (
        <div className="grid gap-3 rounded-2xl border border-white/[0.08] p-4 sm:grid-cols-[1fr_1fr_2fr_auto] sm:items-end">
          <div>
            <label htmlFor={`ps-${c.id}`} className={labelCn}>
              Starts
            </label>
            <input
              id={`ps-${c.id}`}
              type="date"
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
                setEnd(addDays(e.target.value, 42));
              }}
              className={inputCn}
            />
          </div>
          <div>
            <label htmlFor={`pe-${c.id}`} className={labelCn}>
              Ends (6 weeks)
            </label>
            <input
              id={`pe-${c.id}`}
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label htmlFor={`pn-${c.id}`} className={labelCn}>
              Note (optional)
            </label>
            <input
              id={`pn-${c.id}`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Who agreed it, anything to remember"
              className={inputCn}
            />
          </div>
          <button
            type="button"
            disabled={busy || !start || !end}
            onClick={() => void act('start_pilot', end, start)}
            className={COLLEGE_BTN_PRIMARY}
          >
            Start
          </button>
          <p className="text-[12px] leading-relaxed text-white sm:col-span-4">
            Every linked learner (Active or On Break) and staff member gets the full app free until
            14 days after the end date. Anyone who already pays or has another free grant is left as
            they are.
          </p>
        </div>
      )}

      {panel === 'extend' && (
        <div className="grid gap-3 rounded-2xl border border-white/[0.08] p-4 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
          <div>
            <label htmlFor={`px-${c.id}`} className={labelCn}>
              New end date
            </label>
            <input
              id={`px-${c.id}`}
              type="date"
              value={extendTo}
              onChange={(e) => setExtendTo(e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label htmlFor={`pxn-${c.id}`} className={labelCn}>
              Note (optional)
            </label>
            <input
              id={`pxn-${c.id}`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Why it was extended"
              className={inputCn}
            />
          </div>
          <button
            type="button"
            disabled={busy || !extendTo}
            onClick={() => void act('extend_pilot', extendTo)}
            className={COLLEGE_BTN_PRIMARY}
          >
            Extend
          </button>
        </div>
      )}

      {panel === 'contract' && (
        <div className="grid gap-3 rounded-2xl border border-white/[0.08] p-4 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
          <div>
            <label htmlFor={`ct-${c.id}`} className={labelCn}>
              Contracted until
            </label>
            <input
              id={`ct-${c.id}`}
              type="date"
              value={contractTo}
              onChange={(e) => setContractTo(e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label htmlFor={`ctn-${c.id}`} className={labelCn}>
              Note (optional)
            </label>
            <input
              id={`ctn-${c.id}`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Order or invoice reference"
              className={inputCn}
            />
          </div>
          <button
            type="button"
            disabled={busy || !contractTo}
            onClick={() => void act('contract', contractTo)}
            className={COLLEGE_BTN_PRIMARY}
          >
            Save
          </button>
          <p className="text-[12px] leading-relaxed text-white sm:col-span-3">
            Invoiced by Elec-Mate, off Stripe. Access runs to this date plus 14 days grace.
          </p>
        </div>
      )}

      {panel === 'lapse' && (
        <div className="space-y-3 rounded-2xl border border-orange-400/40 p-4">
          <p className="text-[13px] leading-relaxed text-white">
            Mark {c.name} as lapsed? Access ends now, with no grace: {c.learners_with_access}{' '}
            learners and {c.staff_with_access} staff lose the free app. Nothing is deleted, and
            starting a pilot or contract again restores it.
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-[14rem] flex-1">
              <label htmlFor={`ln-${c.id}`} className={labelCn}>
                Note (optional)
              </label>
              <input
                id={`ln-${c.id}`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Why"
                className={inputCn}
              />
            </div>
            <button type="button" onClick={() => setPanel(null)} className={COLLEGE_BTN}>
              Keep access
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void act('lapse', null)}
              className={COLLEGE_BTN_PRIMARY}
            >
              Mark lapsed
            </button>
          </div>
        </div>
      )}

      {panel === 'nudge' && (
        <div className="space-y-3 rounded-2xl border border-white/[0.08] p-4">
          <p className="text-[12.5px] text-white">
            A draft only. Nothing is sent from here: it opens in your email app for you to edit and
            send.
          </p>
          <div className="space-y-1 text-[13px] text-white">
            <p>
              <span className="font-semibold">To:</span>{' '}
              {draft.to || 'No lead email on the staff list'}
            </p>
            <p>
              <span className="font-semibold">Subject:</span> {draft.subject}
            </p>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-white/[0.04] p-3 font-sans text-[13px] leading-relaxed text-white">
            {draft.body}
          </pre>
          <div className="flex flex-wrap gap-2">
            <a href={draft.href} className={COLLEGE_BTN_PRIMARY}>
              Open in email
            </a>
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard
                  ?.writeText(draft.body)
                  .then(() => toast({ title: 'Draft copied' }));
              }}
              className={COLLEGE_BTN}
            >
              Copy text
            </button>
          </div>
        </div>
      )}

      {c.notes && <p className="text-[12.5px] leading-relaxed text-white">Note: {c.notes}</p>}
      {children}
    </li>
  );
}
