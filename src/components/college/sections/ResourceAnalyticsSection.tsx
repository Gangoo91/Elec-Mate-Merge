import { useState } from 'react';
import { motion } from 'framer-motion';
import { useResourceAnalytics, setResourceGoldStandard } from '@/hooks/useResourceAnalytics';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { chipBase, chipOff, chipOn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';

/* ==========================================================================
   ResourceAnalyticsSection — tutor analytics panel.
   ELE-905 (B10). Shows top resources, view trend, gold-standard toggle.

   Content only — CollegeDashboard draws the masthead. Four KPIs, one sort
   row of 44px chips, one list. "Gold" is volt text on the row, and the
   toggle is a quiet text control — there is nothing to START on this page,
   so it has no solid volt button.
   ========================================================================== */

type SortKey = 'views_total' | 'views_30d' | 'unique_30d' | 'downloads';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'views_30d', label: 'Views (30 days)' },
  { key: 'unique_30d', label: 'Unique viewers (30 days)' },
  { key: 'views_total', label: 'Views (all time)' },
  { key: 'downloads', label: 'Downloads' },
];

export function ResourceAnalyticsSection() {
  const { rows, loading, error, refetch } = useResourceAnalytics();
  const { toast } = useToast();
  const [sort, setSort] = useState<SortKey>('views_30d');
  const [busyId, setBusyId] = useState<string | null>(null);

  const sorted = [...rows].sort((a, b) => {
    switch (sort) {
      case 'views_total':
        return b.views_count - a.views_count;
      case 'views_30d':
        return b.view_count_30d - a.view_count_30d;
      case 'unique_30d':
        return b.unique_viewers_30d - a.unique_viewers_30d;
      case 'downloads':
        return b.downloads_count - a.downloads_count;
    }
  });

  const totals = rows.reduce(
    (acc, r) => {
      acc.views30d += r.view_count_30d;
      acc.unique30d += r.unique_viewers_30d;
      acc.viewsAll += r.views_count;
      acc.downloads += r.downloads_count;
      if (r.gold_standard) acc.gold += 1;
      return acc;
    },
    { views30d: 0, unique30d: 0, viewsAll: 0, downloads: 0, gold: 0 }
  );

  const toggleGold = async (resourceId: string, next: boolean) => {
    setBusyId(resourceId);
    try {
      await setResourceGoldStandard(resourceId, next);
      toast({ title: next ? 'Marked as gold standard' : 'Removed gold standard' });
      await refetch();
    } catch (e) {
      toast({
        title: 'Could not update',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {error && (
        <div className="rounded-2xl border border-red-400/40 px-4 py-3 text-[13px] text-white">
          {error}
        </div>
      )}

      {rows.length > 0 && (
        <HubKpiRow>
          <HubKpi
            accent
            label="Views"
            value={String(totals.views30d)}
            verdict="Last 30 days"
            context={`${totals.viewsAll} all time`}
          />
          <HubKpi
            label="Unique viewers"
            value={String(totals.unique30d)}
            verdict="Last 30 days"
          />
          <HubKpi
            label="Downloads"
            value={String(totals.downloads)}
            verdict="All time"
          />
          <HubKpi
            label="Gold standard"
            value={String(totals.gold)}
            verdict={totals.gold > 0 ? 'Flagged for the cohort' : 'None flagged yet'}
          />
        </HubKpiRow>
      )}

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Resources</HubSectionHeading>
          {rows.length > 0 && (
            <span className="text-[11px] font-semibold tabular-nums text-white">
              {rows.length} on file
            </span>
          )}
        </motion.div>

        {rows.length > 0 && (
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSort(s.key)}
                className={cn(chipBase, 'px-4 text-[12.5px]', sort === s.key ? chipOn : chipOff)}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {sorted.length === 0 ? (
            <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
              No resource activity yet. Once learners start opening and downloading your
              resources, usage shows up here.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {sorted.slice(0, 25).map((r) => {
                const busy = busyId === r.resource_id;
                return (
                  <li
                    key={r.resource_id}
                    className="flex items-center gap-3 px-4 py-2.5 sm:px-5"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-8 w-[3px] shrink-0 rounded-full',
                        r.gold_standard ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                        {r.title || 'Untitled resource'}
                        {r.gold_standard && (
                          <span className="ml-2 text-[11px] font-semibold text-elec-yellow">
                            Gold standard
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] leading-tight tabular-nums text-white">
                        {[
                          `${r.view_count_30d} views (30d)`,
                          `${r.unique_viewers_30d} unique`,
                          `${r.views_count} all time`,
                          `${r.downloads_count} downloads`,
                          r.last_viewed_at
                            ? `last ${new Date(r.last_viewed_at).toLocaleDateString('en-GB')}`
                            : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </span>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => toggleGold(r.resource_id, !r.gold_standard)}
                      className={cn(
                        '-mr-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold transition-colors touch-manipulation disabled:text-white',
                        r.gold_standard ? 'text-white' : 'text-elec-yellow'
                      )}
                    >
                      {busy ? '…' : r.gold_standard ? 'Remove gold' : 'Mark gold'}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.section>
    </div>
  );
}
