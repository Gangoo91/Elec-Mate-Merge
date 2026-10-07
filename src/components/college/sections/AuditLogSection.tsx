import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { rowsToCsv, downloadCsv } from '@/lib/csv';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { inputCn, labelCn, selectTriggerCn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import { VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import { BarList, ChartEmpty } from '@/components/college/quality/QualityKit';
import { useAuditLog, type AuditFilters, type AuditRow } from '@/components/college/quality/useAuditLog';

/* ==========================================================================
   AuditLogSection — read-only view of college_activity.

   "Who did what, when, on which entity." HoD / admin / IQA filter by person,
   action, record type and dates, and download a CSV for the inspection
   "prove it" pack. The log is append-only: nothing here deletes a row.
   Content only; CollegeDashboard draws the masthead.
   ========================================================================== */

/* The keys that reach college_activity today are the second group; the
   first group was written for writers that never landed, kept so they label
   correctly if they do. Anything else falls back to the key in words. */
const FRIENDLY_ACTIONS: Record<string, string> = {
  cohort_broadcast_sent: 'Cohort broadcast sent',
  sar_generated: 'SAR generated',
  sar_approved: 'SAR approved',
  qip_action_created: 'QIP action created',
  iqa_otj_sample_recorded: 'IQA off-the-job sample recorded',
  ac_signoff_decided: 'Criteria sign-off decided',
  resource_gold_standard_set: 'Resource marked gold standard',
  student_added: 'Learner added',
  student_withdrawn: 'Learner withdrawn',
  ilp_updated: 'Learning plan updated',
  reviewed_ilp: 'Learning plan reviewed',
  recorded_attendance: 'Attendance recorded',
  approved_lesson_plan: 'Lesson plan approved',
  created_lesson_plan: 'Lesson plan created',
  updated_epa_status: 'EPA status updated',
  graded_assessment: 'Assessment graded',
  // ELE-1898: every staff role and duty change, written by a database trigger.
  staff_added: 'Staff member added',
  staff_removed: 'Staff member removed',
  staff_role_changed: 'Staff role changed',
  staff_duties_changed: 'Safeguarding or quality duties changed',
  staff_status_changed: 'Staff status changed',
  staff_account_linked: 'Staff account linked',
  viewed_learner_as_support: 'Learner record opened by support',
  eqa_visit_set: 'EQA visit date set',
};

const ENTITY_LABEL: Record<string, string> = {
  staff: 'Staff member',
  college: 'College',
  student: 'Learner',
  cohort: 'Cohort',
  lesson_plan: 'Lesson plan',
};

const actionLabel = (a: string) => FRIENDLY_ACTIONS[a] ?? a.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
const entityLabel = (e: string | null) =>
  e ? (ENTITY_LABEL[e] ?? e.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase())) : null;

const HELP: PageHelpContent = {
  id: 'college-audit-log',
  title: 'Audit log',
  what: 'A permanent record of the sensitive things staff do in the College Hub: who did it, when, and to which record. Inspectors and awarding bodies can ask you to prove an action happened; this is where you show them.',
  steps: [
    { title: 'Narrow it down', body: 'Search by name, or pick an action, a record type and a date range.' },
    { title: 'Read an entry', body: 'Each line says what happened, who did it and when. Extra detail recorded with the action shows underneath.' },
    { title: 'Download the evidence', body: 'Download CSV saves exactly what is on screen, ready to attach to an audit or inspection pack.' },
  ],
  notes: [
    { title: 'Nothing can be deleted', body: 'The log is append-only. No one, including admins, can edit or remove an entry.' },
    { title: 'Who can see it', body: 'Admins, heads of department, IQAs and quality nominees at your college.' },
    { title: 'Dates', body: 'Entries are grouped by UK date (Europe/London), so an action just after midnight in summer time sits on the right day.' },
  ],
};

// Group by the UK calendar day, not the UTC one (en-CA gives YYYY-MM-DD).
const LONDON_DAY = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' });
const dayKey = (iso: string) => LONDON_DAY.format(new Date(iso));
const monthKey = (iso: string) => dayKey(iso).slice(0, 7);
const fmtDay = (key: string) =>
  new Date(`${key}T12:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

function Details({ details }: { details: Record<string, unknown> }) {
  const entries = Object.entries(details).filter(([, v]) => v !== null && v !== undefined && v !== '');
  if (entries.length === 0) return null;
  return (
    <dl className="mt-1.5 grid grid-cols-1 gap-x-4 gap-y-0.5 sm:grid-cols-2">
      {entries.slice(0, 8).map(([k, v]) => (
        <div key={k} className="flex min-w-0 gap-1.5 text-[12px] leading-snug">
          <dt className="shrink-0 text-white">{k.replace(/_/g, ' ')}:</dt>
          <dd className="min-w-0 truncate font-medium text-white">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</dd>
        </div>
      ))}
    </dl>
  );
}

export function AuditLogSection() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [filterAction, setFilterAction] = useState<string | null>(null);
  const [filterEntity, setFilterEntity] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filters: AuditFilters = useMemo(
    () => ({
      action: filterAction,
      entityType: filterEntity,
      startDate: startDate ? new Date(`${startDate}T00:00:00`).toISOString() : null,
      endDate: endDate ? new Date(`${endDate}T23:59:59`).toISOString() : null,
    }),
    [filterAction, filterEntity, startDate, endDate]
  );

  const { rows, loading, error, canRead } = useAuditLog(filters);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter(
      (r) =>
        (r.actor_name ?? '').toLowerCase().includes(q) ||
        r.action.toLowerCase().includes(q) ||
        actionLabel(r.action).toLowerCase().includes(q) ||
        (r.entity_type ?? '').toLowerCase().includes(q)
    );
  }, [rows, search]);

  // Options come from the loaded rows so only real actions are offered.
  const actionOptions = useMemo(() => Array.from(new Set(rows.map((r) => r.action))).sort(), [rows]);
  const entityOptions = useMemo(
    () => Array.from(new Set(rows.map((r) => r.entity_type).filter((e): e is string => !!e))).sort(),
    [rows]
  );

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 86400_000;
    const people = new Set(filtered.map((r) => r.actor_id ?? 'unknown'));
    const byAction = new Map<string, number>();
    for (const r of filtered) byAction.set(r.action, (byAction.get(r.action) ?? 0) + 1);
    const top = [...byAction.entries()].sort((a, b) => b[1] - a[1]);
    return {
      week: filtered.filter((r) => new Date(r.created_at).getTime() >= weekAgo).length,
      people: people.size,
      byAction: top,
      last: filtered[0]?.created_at ?? null,
    };
  }, [filtered]);

  // Last 12 months, one bar per month: the log is sparse, so days would
  // mostly be empty.
  const monthly = useMemo(() => {
    const out: Array<{ key: string; label: string; n: number }> = [];
    const now = new Date();
    for (let i = 11; i >= 0; i -= 1) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 15);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      out.push({ key, label: d.toLocaleDateString('en-GB', { month: 'short' }), n: 0 });
    }
    for (const r of filtered) {
      const m = out.find((x) => x.key === monthKey(r.created_at));
      if (m) m.n += 1;
    }
    return out;
  }, [filtered]);
  const monthlyTotal = monthly.reduce((s, d) => s + d.n, 0);

  const grouped = useMemo(() => {
    const m = new Map<string, AuditRow[]>();
    for (const r of filtered) {
      const k = dayKey(r.created_at);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(r);
    }
    return [...m.entries()];
  }, [filtered]);

  const anyFilter = !!(search || filterAction || filterEntity || startDate || endDate);
  const clearFilters = () => {
    setSearch('');
    setFilterAction(null);
    setFilterEntity(null);
    setStartDate('');
    setEndDate('');
  };

  const handleExport = () => {
    if (filtered.length === 0) {
      toast({ title: 'Nothing to export', variant: 'destructive' });
      return;
    }
    const csv = rowsToCsv(
      filtered.map((r) => ({
        date: new Date(r.created_at).toISOString(),
        actor: r.actor_name ?? 'Unknown',
        action: actionLabel(r.action),
        entity_type: entityLabel(r.entity_type) ?? '',
        entity_id: r.entity_id ?? '',
        details: r.details ? JSON.stringify(r.details) : '',
      })),
      [
        { key: 'date', header: 'Date' },
        { key: 'actor', header: 'Who' },
        { key: 'action', header: 'Action' },
        { key: 'entity_type', header: 'Record type' },
        { key: 'entity_id', header: 'Record ID' },
        { key: 'details', header: 'Details' },
      ]
    );
    downloadCsv(csv, `audit-log-${new Date().toISOString().slice(0, 10)}`);
    toast({ title: 'CSV downloaded' });
  };

  if (canRead === false) {
    return (
      <div className="space-y-8 sm:space-y-10">
        <CollegePageHeader
          eyebrow="Quality & compliance"
          title="Audit log"
          description="Every sensitive action in the College Hub: who did it, when and to which record. Nothing here can be edited or deleted."
          help={HELP}
        />
        <CollegeEmpty
          title="For admins and quality staff"
          body="The audit log is open to admins, heads of department, IQAs and quality nominees. If you need it for an audit or inspection, ask one of them to download the CSV, or ask an admin to change your role."
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="Quality & compliance"
        title="Audit log"
        description="Every sensitive action in the College Hub: who did it, when and to which record. Nothing here can be edited or deleted."
        help={HELP}
        actions={
          <button type="button" onClick={handleExport} disabled={filtered.length === 0} className={COLLEGE_BTN_PRIMARY}>
            Download CSV{filtered.length > 0 ? ` (${filtered.length})` : ''}
          </button>
        }
      />

      <CollegeStats
        items={[
          { label: 'Entries', value: loading ? '…' : String(filtered.length), sub: anyFilter ? 'Matching your filters' : 'Most recent 500' },
          { label: 'Last 7 days', value: loading ? '…' : String(stats.week), sub: 'Actions recorded' },
          { label: 'People', value: loading ? '…' : String(stats.people), sub: 'Staff who appear' },
          {
            label: 'Last entry',
            value: loading ? '…' : stats.last ? new Date(stats.last).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'Europe/London' }) : 'None',
            sub: stats.last ? new Date(stats.last).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }) : 'Nothing logged yet',
          },
        ]}
      />

      {/* Charts: when, and what. */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
      >
        <motion.div variants={itemVariants} className={VIS_CARD}>
          <VisHead title="Activity, last 12 months" sub={`${monthlyTotal} ${monthlyTotal === 1 ? 'action' : 'actions'} in the last 12 months`} />
          <div className="mt-4 h-40">
            {monthlyTotal === 0 ? (
              <ChartEmpty text="Nothing recorded in the last 12 months" className="h-40" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                  <XAxis dataKey="label" tick={{ fill: 'white', fontSize: 11 }} tickLine={false} axisLine={false} interval={0} />
                  <YAxis allowDecimals={false} tick={{ fill: 'white', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: 'hsl(0 0% 8%)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '0.75rem', fontSize: 12 }}
                    labelStyle={{ color: 'white' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(v: number) => [v, 'Actions']}
                  />
                  <Bar dataKey="n" fill="hsl(47 100% 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className={VIS_CARD}>
          <VisHead title="What was done" sub="Tap one to show only that action" />
          <div className="mt-4">
            {stats.byAction.length === 0 ? (
              <ChartEmpty text="No actions yet" />
            ) : (
              <BarList
                rows={stats.byAction.slice(0, 6).map(([a, n]) => ({
                  label: actionLabel(a),
                  n,
                  tone: filterAction === a ? 'good' : 'volt',
                  onClick: () => setFilterAction(filterAction === a ? null : a),
                }))}
              />
            )}
          </div>
        </motion.div>
      </motion.section>

      {/* Filters */}
      <section className="space-y-3">
        <CollegeSectionTitle
          title="Filter"
          sub="Search and filters change the list, the figures and the download."
          action={
            anyFilter ? (
              <button type="button" onClick={clearFilters} className="h-11 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation">
                Clear filters
              </button>
            ) : undefined
          }
        />
        <div className={cn(COLLEGE_CARD, 'space-y-4')}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, action or record type"
            aria-label="Search the audit log"
            className={inputCn}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <label htmlFor="audit-action" className={labelCn}>
                Action
              </label>
              <select
                id="audit-action"
                value={filterAction ?? ''}
                onChange={(e) => setFilterAction(e.target.value || null)}
                className={cn(selectTriggerCn, 'w-full')}
              >
                <option value="">All actions</option>
                {actionOptions.map((a) => (
                  <option key={a} value={a}>
                    {actionLabel(a)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="audit-entity" className={labelCn}>
                Record type
              </label>
              <select
                id="audit-entity"
                value={filterEntity ?? ''}
                onChange={(e) => setFilterEntity(e.target.value || null)}
                className={cn(selectTriggerCn, 'w-full')}
              >
                <option value="">All record types</option>
                {entityOptions.map((e) => (
                  <option key={e} value={e}>
                    {entityLabel(e)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="audit-from" className={labelCn}>
                From
              </label>
              <input id="audit-from" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputCn} />
            </div>
            <div>
              <label htmlFor="audit-to" className={labelCn}>
                To
              </label>
              <input id="audit-to" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputCn} />
            </div>
          </div>
        </div>
      </section>

      {/* Entries, grouped by day */}
      <section className="space-y-3">
        <CollegeSectionTitle
          title="Entries"
          sub={loading ? 'Loading…' : filtered.length === 0 ? 'None' : `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'}, newest first`}
        />

        {error && (
          <div className={cn(COLLEGE_CARD, 'border-red-400/40 text-[13px] text-white')}>
            The audit log could not be loaded: {error}
          </div>
        )}

        {loading ? (
          <div className={cn(COLLEGE_CARD, 'flex items-center justify-center py-12')}>
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <CollegeEmpty
            title={rows.length === 0 ? 'Nothing logged yet' : 'No entries match'}
            body={
              rows.length === 0
                ? 'Sensitive actions are recorded here as they happen: approving a lesson plan, recording attendance, grading, changing EPA status and more.'
                : 'Try a wider date range or clear the filters.'
            }
            action={
              rows.length > 0 ? (
                <button type="button" onClick={clearFilters} className={COLLEGE_BTN}>
                  Clear filters
                </button>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-5">
            {grouped.map(([day, items]) => (
              <div key={day} className="space-y-2">
                <p className="px-1 text-[12.5px] font-semibold text-white">{fmtDay(day)}</p>
                <ul className={COLLEGE_LIST}>
                  {items.map((row) => (
                    <li key={row.id} className="flex items-start gap-3 px-5 py-3.5 sm:px-6">
                      <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-elec-yellow" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14px] font-semibold leading-tight text-white">{actionLabel(row.action)}</span>
                        <span className="mt-0.5 block text-[12.5px] leading-tight text-white">
                          {[row.actor_name ?? 'Unknown person', entityLabel(row.entity_type)].filter(Boolean).join(' · ')}
                        </span>
                        {row.details && <Details details={row.details} />}
                      </span>
                      <span className="shrink-0 text-right text-[12px] tabular-nums text-white">
                        {new Date(row.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
