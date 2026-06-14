import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  useResourceAnalytics,
  setResourceGoldStandard,
} from '@/hooks/useResourceAnalytics';
import { useToast } from '@/hooks/use-toast';
import {
  Pill,
  SectionHeader,
  StatStrip,
  ListCard,
  ListRow,
  EmptyState,
  LoadingState,
  SecondaryButton,
  itemVariants,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

/* ==========================================================================
   ResourceAnalyticsSection — tutor analytics panel.
   ELE-905 (B10). Shows top resources, view trend, gold-standard toggle.
   ========================================================================== */

type SortKey = 'views_total' | 'views_30d' | 'unique_30d' | 'downloads';

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

  // Aggregate totals for the stat strip.
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
      toast({
        title: next ? 'Marked as gold standard' : 'Removed gold standard',
      });
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

  return (
    <motion.section variants={itemVariants} initial="hidden" animate="visible" className="space-y-4">
      <SectionHeader eyebrow="Resources" title="Resource analytics" />
      <p className="text-[13px] text-white/70 leading-relaxed -mt-2">
        What's actually being used. Tag the top performers as gold standard for the rest of the cohort.
      </p>

      {!loading && !error && rows.length > 0 && (
        <StatStrip
          columns={4}
          stats={[
            { label: 'Views · 30d', value: totals.views30d, tone: 'blue' },
            { label: 'Unique · 30d', value: totals.unique30d, tone: 'cyan' },
            { label: 'Views · all', value: totals.viewsAll },
            { label: 'Gold standard', value: totals.gold, tone: 'yellow' },
          ]}
        />
      )}

      <div className="flex flex-wrap gap-2">
        {(
          [
            { key: 'views_30d', label: 'Views (30d)' },
            { key: 'unique_30d', label: 'Unique viewers (30d)' },
            { key: 'views_total', label: 'Views (all-time)' },
            { key: 'downloads', label: 'Downloads' },
          ] as { key: SortKey; label: string }[]
        ).map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setSort(s.key)}
            className={cn(
              'h-11 rounded-full border px-4 text-[12.5px] font-medium touch-manipulation transition-colors',
              sort === s.key
                ? 'border-elec-yellow bg-elec-yellow/10 text-elec-yellow'
                : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading && <LoadingState />}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && sorted.length === 0 && (
        <EmptyState
          title="No resource activity yet"
          description="Once learners start opening and downloading your resources, usage shows up here."
        />
      )}

      {!loading && sorted.length > 0 && (
        <ListCard>
          {sorted.slice(0, 25).map((r) => (
            <ListRow
              key={r.resource_id}
              title={
                <span className="flex items-center gap-2">
                  <span className="truncate">{r.title || 'Untitled resource'}</span>
                  {r.gold_standard && <Pill tone="yellow">Gold</Pill>}
                </span>
              }
              subtitle={
                <span className="flex flex-wrap gap-3 text-white/70">
                  <span>{r.view_count_30d} views (30d)</span>
                  <span>{r.unique_viewers_30d} unique (30d)</span>
                  <span>{r.views_count} all-time</span>
                  <span>{r.downloads_count} downloads</span>
                  {r.last_viewed_at && (
                    <span>last {new Date(r.last_viewed_at).toLocaleDateString('en-GB')}</span>
                  )}
                </span>
              }
              trailing={
                <SecondaryButton
                  size="md"
                  disabled={busyId === r.resource_id}
                  onClick={() => toggleGold(r.resource_id, !r.gold_standard)}
                  className={cn(
                    r.gold_standard &&
                      'border-elec-yellow/40 bg-elec-yellow/15 text-elec-yellow hover:bg-elec-yellow/20'
                  )}
                >
                  {busyId === r.resource_id
                    ? '…'
                    : r.gold_standard
                      ? 'Remove gold'
                      : 'Mark gold standard'}
                </SecondaryButton>
              }
            />
          ))}
        </ListCard>
      )}
    </motion.section>
  );
}
