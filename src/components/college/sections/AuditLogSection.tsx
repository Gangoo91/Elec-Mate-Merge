import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { rowsToCsv, downloadCsv } from '@/lib/csv';
import { useCollegeActivity, type ActivityFilters } from '@/hooks/useCollegeActivity';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { buttonPrimaryCn, inputCn, labelCn, selectTriggerCn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';

/* ==========================================================================
   AuditLogSection — read-only view of college_activity.

   "Who did what, when, on which entity." HoD / admin / IQA can filter by
   actor name, action type, entity type, date range. CSV export for the
   Ofsted "prove it" pack. The audit log itself is append-only — UI does
   not delete rows.

   Content only — CollegeDashboard draws the masthead. Download is the one
   solid volt control; the filters are underline fields; rows are white.
   ========================================================================== */

/* The action keys that actually reach `college_activity` today are the
   second group (reviewed_ilp, recorded_attendance, …). The first group was
   written for a set of writers that never landed; kept so they label
   correctly if they do. Anything else falls back to the raw key with
   underscores replaced. */
const FRIENDLY_ACTIONS: Record<string, string> = {
  cohort_broadcast_sent: 'Cohort broadcast sent',
  sar_generated: 'SAR generated',
  sar_approved: 'SAR approved',
  qip_action_created: 'QIP action created',
  iqa_otj_sample_recorded: 'IQA · OTJ sample recorded',
  ac_signoff_decided: 'AC sign-off decided',
  resource_gold_standard_set: 'Resource marked gold standard',
  student_added: 'Student added',
  student_withdrawn: 'Student withdrawn',
  ilp_updated: 'Learning plan updated',
  reviewed_ilp: 'Learning plan reviewed',
  recorded_attendance: 'Attendance recorded',
  approved_lesson_plan: 'Lesson plan approved',
  created_lesson_plan: 'Lesson plan created',
  updated_epa_status: 'EPA status updated',
  graded_assessment: 'Assessment graded',
};

function actionLabel(a: string): string {
  return FRIENDLY_ACTIONS[a] ?? a.replace(/_/g, ' ');
}

export function AuditLogSection() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [filterAction, setFilterAction] = useState<string | null>(null);
  const [filterEntity, setFilterEntity] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filters: ActivityFilters = useMemo(
    () => ({
      action: filterAction,
      entityType: filterEntity,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: endDate ? new Date(`${endDate}T23:59:59`).toISOString() : null,
    }),
    [filterAction, filterEntity, startDate, endDate]
  );

  const { rows, loading, error } = useCollegeActivity(filters);

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

  // Derived filter options from the loaded rows so the UI only shows
  // actions that actually exist in this college's history.
  const actionOptions = useMemo(
    () => Array.from(new Set(rows.map((r) => r.action))).sort(),
    [rows]
  );
  const entityOptions = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.entity_type).filter((e): e is string => !!e))).sort(),
    [rows]
  );

  const handleExport = () => {
    if (filtered.length === 0) {
      toast({ title: 'Nothing to export', variant: 'destructive' });
      return;
    }
    const csv = rowsToCsv(
      filtered.map((r) => ({
        date: new Date(r.created_at).toISOString(),
        actor: r.actor_name ?? '—',
        action: actionLabel(r.action),
        entity_type: r.entity_type ?? '—',
        entity_id: r.entity_id ?? '—',
        details: r.details ? JSON.stringify(r.details) : '',
      })),
      [
        { key: 'date', header: 'Date' },
        { key: 'actor', header: 'Actor' },
        { key: 'action', header: 'Action' },
        { key: 'entity_type', header: 'Entity' },
        { key: 'entity_id', header: 'Entity ID' },
        { key: 'details', header: 'Details' },
      ]
    );
    downloadCsv(csv, `audit-log-${new Date().toISOString().slice(0, 10)}`);
    toast({ title: 'CSV downloaded' });
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Filters. Underline fields, one card. */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Filter</HubSectionHeading>
        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 space-y-4 border-y border-elec-yellow/35 px-4 py-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5',
            CARD_SURFACE
          )}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by actor, action or entity…"
            aria-label="Search the audit log"
            className={inputCn}
          />
          <div className="grid gap-4 sm:grid-cols-4">
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
                Entity
              </label>
              <select
                id="audit-entity"
                value={filterEntity ?? ''}
                onChange={(e) => setFilterEntity(e.target.value || null)}
                className={cn(selectTriggerCn, 'w-full')}
              >
                <option value="">All entities</option>
                {entityOptions.map((e) => (
                  <option key={e} value={e}>
                    {e.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="audit-from" className={labelCn}>
                From
              </label>
              <input
                id="audit-from"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <label htmlFor="audit-to" className={labelCn}>
                To
              </label>
              <input
                id="audit-to"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleExport}
            disabled={filtered.length === 0}
            className={cn(buttonPrimaryCn, 'w-full px-5 sm:w-auto')}
          >
            Download CSV{filtered.length > 0 ? ` (${filtered.length})` : ''}
          </button>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Entries</HubSectionHeading>
          {!loading && (
            <span className="text-[11px] font-semibold tabular-nums text-white">
              {filtered.length === 0
                ? 'None'
                : `${filtered.length} entr${filtered.length === 1 ? 'y' : 'ies'}`}
            </span>
          )}
        </motion.div>

        {error && (
          <div className="rounded-2xl border border-red-400/40 px-4 py-3 text-[13px] text-white">
            {error}
          </div>
        )}

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
              {rows.length === 0
                ? 'Nothing logged yet. Sensitive actions are recorded here as they happen.'
                : 'No entries match the current filters.'}
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {filtered.map((row) => (
                <li key={row.id} className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                      {actionLabel(row.action)}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                      {[row.actor_name ?? 'Unknown actor', row.entity_type?.replace(/_/g, ' ')]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                    {row.details && Object.keys(row.details).length > 0 && (
                      <span className="mt-1.5 block whitespace-pre-wrap break-words font-mono text-[11px] leading-snug text-white">
                        {JSON.stringify(row.details)}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-right text-[11.5px] leading-snug tabular-nums text-white">
                    {new Date(row.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    <br />
                    {new Date(row.created_at).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.section>
    </div>
  );
}
