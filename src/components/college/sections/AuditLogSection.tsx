import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { rowsToCsv, downloadCsv } from '@/lib/csv';
import {
  useCollegeActivity,
  type ActivityFilters,
} from '@/hooks/useCollegeActivity';
import {
  PageFrame,
  PageHero,
  Pill,
  SecondaryButton,
  itemVariants,
} from '@/components/college/primitives';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

/* ==========================================================================
   AuditLogSection — read-only view of college_activity.

   "Who did what, when, on which entity." HoD / admin / IQA can filter by
   actor name, action type, entity type, date range. CSV export for the
   Ofsted "prove it" pack. The audit log itself is append-only — UI does
   not delete rows.
   ========================================================================== */

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
      endDate: endDate
        ? new Date(`${endDate}T23:59:59`).toISOString()
        : null,
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
      Array.from(
        new Set(rows.map((r) => r.entity_type).filter((e): e is string => !!e))
      ).sort(),
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
    <PageFrame>
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <PageHero
          eyebrow="Audit log"
          title="Who did what, when"
          description="Append-only record of every sensitive action across the college: cohort broadcasts, SAR approvals, IQA samples, AC sign-offs. Built for Ofsted + funding audits."
          tone="amber"
          actions={
            <SecondaryButton onClick={handleExport} disabled={filtered.length === 0}>
              Download CSV ({filtered.length})
            </SecondaryButton>
          }
        />
      </motion.div>

      <div className="px-4 pb-16 space-y-4">
        {/* Filter strip */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3"
        >
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by actor, action or entity…"
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
          />
          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-white/50">Action</label>
              <select
                value={filterAction ?? ''}
                onChange={(e) => setFilterAction(e.target.value || null)}
                className="mt-1 h-11 w-full rounded-md bg-elec-gray border border-white/30 px-3 text-sm text-white touch-manipulation"
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
              <label className="text-[10px] uppercase tracking-wider text-white/50">Entity</label>
              <select
                value={filterEntity ?? ''}
                onChange={(e) => setFilterEntity(e.target.value || null)}
                className="mt-1 h-11 w-full rounded-md bg-elec-gray border border-white/30 px-3 text-sm text-white touch-manipulation"
              >
                <option value="">All entities</option>
                {entityOptions.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-white/50">From</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-white/50">To</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
              />
            </div>
          </div>
        </motion.div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {loading && <div className="text-sm text-white/60">Loading audit log…</div>}

        {!loading && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-white/70">
            No audit entries match the current filters.
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <ul className="divide-y divide-white/[0.06] rounded-2xl border border-white/10 bg-white/5">
            {filtered.map((row) => (
              <li
                key={row.id}
                className={cn(
                  'px-4 py-3 flex items-start justify-between gap-3'
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Pill tone="blue">{actionLabel(row.action)}</Pill>
                    {row.entity_type && (
                      <span className="text-[10px] uppercase tracking-wider text-white/50">
                        {row.entity_type}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 text-sm text-white">
                    {row.actor_name ?? 'Unknown actor'}
                  </div>
                  {row.details && Object.keys(row.details).length > 0 && (
                    <div className="mt-1 text-[11px] text-white/50 font-mono whitespace-pre-wrap break-words">
                      {JSON.stringify(row.details)}
                    </div>
                  )}
                </div>
                <div className="text-[11px] tabular-nums text-white/70 shrink-0">
                  {new Date(row.created_at).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageFrame>
  );
}
