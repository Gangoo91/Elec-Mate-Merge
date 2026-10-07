/**
 * The College Hub home's "More detail" cards, redesigned 7 Oct 2026 (Andrew:
 * "all these in the dash need to be updated and designed better").
 *
 * One look for all of them: a title with one plain fact on the right, short
 * rows that say what is true in words, and one link out. No decorative bars,
 * no unexplained scores.
 *
 *   HomeGatewayCard    learners heading to EPA, read from the real gate
 *                      (get_gateway_readiness_many). The old countdown made
 *                      its percentages up from theory progress (skills = 0.9×,
 *                      portfolio = 0.7×), so it is not used here.
 *   HomeActivityCard   the last few things logged, one line each.
 *   HomeComplianceCard your documents, policies to sign and who to ask, in
 *                      one card instead of three.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useMyComplianceSummary } from '@/hooks/useMyComplianceSummary';
import { useMyPendingAcknowledgements } from '@/hooks/useMyPendingAcknowledgements';
import { useComplianceLeads, type LeadRoleKey } from '@/hooks/useComplianceLeads';

export const HOME_CARD =
  '-mx-4 flex flex-col overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x';
export const HOME_ROW =
  'flex min-h-[56px] w-full items-center gap-3 px-5 py-2.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]';
const HOME_FOOT =
  'mt-auto flex h-11 w-full items-center justify-center border-t border-white/[0.08] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.04]';

export function HomeCardHead({
  title,
  meta,
  warn,
}: {
  title: string;
  meta?: string;
  warn?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 px-5 pb-2 pt-4">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
      {meta && (
        <span
          className={cn(
            'shrink-0 text-[12px] font-semibold tabular-nums',
            warn ? 'text-orange-400' : 'text-white'
          )}
        >
          {meta}
        </span>
      )}
    </div>
  );
}

const DAY = 86_400_000;
const fmt = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'Europe/London' });

/* ── Heading to EPA ─────────────────────────────────────────────────────── */

interface GateItem {
  state: 'green' | 'amber' | 'red';
}

export function HomeGatewayCard({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const navigate = useNavigate();
  const { students, epaRecords, cohorts } = useCollegeSupabase();
  const [gates, setGates] = useState<Record<string, { items?: GateItem[] }> | null>(null);

  // Learners with a planned EPA (or end) date in the next six months, or past it.
  const due = useMemo(() => {
    const out: { id: string; userId: string | null; name: string; date: Date; days: number }[] = [];
    for (const s of students) {
      if (s.status !== 'Active') continue;
      const epa = epaRecords.find((e) => e.student_id === s.id);
      const cohort = cohorts.find((c) => c.id === s.cohort_id);
      const when =
        epa?.epa_date || epa?.gateway_date || s.expected_end_date || cohort?.end_date || null;
      if (!when) continue;
      const date = new Date(when);
      const days = Math.ceil((date.getTime() - Date.now()) / DAY);
      if (days > 183) continue;
      out.push({ id: s.id, userId: s.user_id ?? null, name: s.name, date, days });
    }
    return out.sort((a, b) => a.days - b.days);
  }, [students, epaRecords, cohorts]);

  useEffect(() => {
    const ids = due
      .map((d) => d.userId)
      .filter((x): x is string => !!x)
      .slice(0, 100);
    if (!ids.length) {
      setGates({});
      return;
    }
    let live = true;
    void supabase
      .rpc('get_gateway_readiness_many' as never, { p_learners: ids } as never)
      .then(({ data, error }) => {
        if (live) setGates(error ? {} : ((data ?? {}) as Record<string, { items?: GateItem[] }>));
      });
    return () => {
      live = false;
    };
  }, [due]);

  const rows = due.slice(0, 4);
  const overdue = due.filter((d) => d.days < 0).length;

  return (
    <section className={HOME_CARD}>
      <HomeCardHead
        title="Heading to EPA"
        meta={due.length ? `${due.length} in the next 6 months` : undefined}
        warn={overdue > 0}
      />
      {rows.length === 0 ? (
        <p className="px-5 pb-4 text-[13px] text-white">
          No learner has an EPA date in the next six months.
        </p>
      ) : (
        <ul className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
          {rows.map((r) => {
            const items = r.userId ? gates?.[r.userId]?.items : undefined;
            const met = items?.filter((i) => i.state === 'green').length;
            const when =
              r.days < 0
                ? `EPA date passed ${fmt(r.date)}`
                : r.days === 0
                  ? 'EPA date is today'
                  : `EPA ${fmt(r.date)}, in ${r.days} ${r.days === 1 ? 'day' : 'days'}`;
            return (
              <li key={r.id}>
                <button
                  type="button"
                  className={HOME_ROW}
                  onClick={() => navigate(`/college?section=student360&studentId=${r.id}#epa`)}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold text-white">
                      {r.name}
                    </span>
                    <span
                      className={cn(
                        'block truncate text-[12.5px]',
                        r.days < 0 ? 'text-orange-400' : 'text-white'
                      )}
                    >
                      {when}
                    </span>
                  </span>
                  <span className="shrink-0 text-right text-[12.5px] tabular-nums text-white">
                    {items ? (
                      <>
                        <span className="font-semibold">
                          {met} of {items.length}
                        </span>{' '}
                        met
                      </>
                    ) : gates === null ? (
                      '…'
                    ) : (
                      'No gate'
                    )}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <button type="button" className={HOME_FOOT} onClick={() => onNavigate?.('epatracking')}>
        All EPA tracking
      </button>
    </section>
  );
}

/* ── Recent activity ────────────────────────────────────────────────────── */

function ago(iso: string): string {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (mins < 60) return `${mins}m`;
  const h = Math.round(mins / 60);
  if (h < 24) return `${h}h`;
  return `${Math.round(h / 24)}d`;
}

export function HomeActivityCard({ max = 5 }: { max?: number }) {
  const { grades, attendance, students, staff } = useCollegeSupabase();
  const items = useMemo(() => {
    const out: { id: string; text: string; at: string }[] = [];
    for (const g of grades
      .filter((x) => x.status === 'graded' || x.status === 'Graded')
      .slice(0, 8)) {
      const who = students.find((s) => s.id === g.student_id)?.name ?? 'A learner';
      const by = staff.find((s) => s.id === g.assessed_by)?.name;
      out.push({
        id: `g-${g.id}`,
        text: `${who}: ${g.unit_name || 'an assessment'}${g.grade ? `, ${g.grade}` : ''}${by ? ` (${by})` : ''}`,
        at: g.assessed_at || g.created_at || new Date().toISOString(),
      });
    }
    for (const a of attendance.slice(0, 8)) {
      const who = students.find((s) => s.id === a.student_id)?.name ?? 'A learner';
      out.push({
        id: `a-${a.id}`,
        text: `${who} marked ${(a.status || 'present').toLowerCase()}`,
        at: a.date || a.created_at || new Date().toISOString(),
      });
    }
    return out.sort((x, y) => new Date(y.at).getTime() - new Date(x.at).getTime()).slice(0, max);
  }, [grades, attendance, students, staff, max]);

  return (
    <section className={HOME_CARD}>
      <HomeCardHead title="Recent activity" />
      {items.length === 0 ? (
        <p className="px-5 pb-4 text-[13px] text-white">
          Grades and attendance appear here as they are logged.
        </p>
      ) : (
        <ul className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
          {items.map((i) => (
            <li key={i.id} className="flex min-h-[44px] items-center gap-3 px-5 py-2">
              <span className="min-w-0 flex-1 truncate text-[13px] text-white">{i.text}</span>
              <span className="shrink-0 text-[12px] tabular-nums text-white">{ago(i.at)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ── Compliance: yours, policies, who to ask ────────────────────────────── */

const LEAD_ROLES: { key: LeadRoleKey; label: string }[] = [
  { key: 'is_dsl', label: 'Safeguarding lead' },
  { key: 'is_deputy_dsl', label: 'Deputy safeguarding lead' },
  { key: 'is_prevent_lead', label: 'Prevent lead' },
  { key: 'is_h_and_s_lead', label: 'Health and safety lead' },
  { key: 'is_mental_health_lead', label: 'Mental health lead' },
  { key: 'is_quality_nominee', label: 'Quality nominee' },
];

export function HomeComplianceCard({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const navigate = useNavigate();
  const { summary, linked } = useMyComplianceSummary();
  const { pending } = useMyPendingAcknowledgements();
  const { leads } = useComplianceLeads();

  const assigned = LEAD_ROLES.map((r) => ({ ...r, people: leads.filter((l) => l[r.key]) })).filter(
    (r) => r.people.length > 0
  );
  const unset = LEAD_ROLES.filter((r) => !leads.some((l) => l[r.key]));

  const t = summary?.totals;
  const docsLine = !linked
    ? 'Your staff record is not linked yet.'
    : !t || t.total === 0
      ? 'No documents on file yet.'
      : [
          `${summary?.inDate ?? 0} in date`,
          t.expiring ? `${t.expiring} expiring` : null,
          t.expired ? `${t.expired} expired` : null,
          t.missing ? `${t.missing} missing` : null,
          t.pending_verification ? `${t.pending_verification} waiting to be checked` : null,
        ]
          .filter(Boolean)
          .join(' · ');
  const docsWarn = !!t && (t.expired > 0 || t.missing > 0);

  return (
    <section className={HOME_CARD}>
      <HomeCardHead title="Compliance" />
      <ul className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
        <li>
          <button type="button" className={HOME_ROW} onClick={() => onNavigate?.('compliancedocs')}>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold text-white">Your documents</span>
              <span
                className={cn('block text-[12.5px]', docsWarn ? 'text-orange-400' : 'text-white')}
              >
                {docsLine}
              </span>
            </span>
            <span className="shrink-0 text-[12.5px] font-semibold text-elec-yellow">
              {docsWarn ? 'Fix' : 'Open'}
            </span>
          </button>
        </li>
        <li>
          <button type="button" className={HOME_ROW} onClick={() => onNavigate?.('compliancedocs')}>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold text-white">Policies to sign</span>
              <span
                className={cn(
                  'block text-[12.5px]',
                  pending.length ? 'text-orange-400' : 'text-white'
                )}
              >
                {pending.length
                  ? `${pending.length} waiting for you: ${pending
                      .slice(0, 2)
                      .map((p) => p.title)
                      .join(', ')}${pending.length > 2 ? ' and more' : ''}`
                  : 'Nothing to sign. You are up to date.'}
              </span>
            </span>
            {pending.length > 0 && (
              <span className="shrink-0 text-[12.5px] font-semibold text-elec-yellow">Sign</span>
            )}
          </button>
        </li>
        {assigned.map((r) => (
          <li key={r.key} className="flex min-h-[56px] items-center gap-3 px-5 py-2.5">
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold text-white">{r.label}</span>
              <span className="block truncate text-[12.5px] text-white">
                {r.people.map((p) => p.name).join(', ')}
              </span>
            </span>
            {r.people[0]?.email && (
              <a
                href={`mailto:${r.people[0].email}`}
                className="inline-flex h-11 shrink-0 items-center text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
              >
                Email
              </a>
            )}
          </li>
        ))}
        {unset.length > 0 && (
          <li>
            <button
              type="button"
              className={HOME_ROW}
              onClick={() => navigate('/college?section=tutors')}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold text-white">
                  {unset.length} {unset.length === 1 ? 'role has' : 'roles have'} nobody named
                </span>
                <span className="block truncate text-[12.5px] text-white">
                  {unset.map((r) => r.label).join(', ')}
                </span>
              </span>
              <span className="shrink-0 text-[12.5px] font-semibold text-elec-yellow">
                Name them
              </span>
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
