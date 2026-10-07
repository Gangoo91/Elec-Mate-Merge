import { useState } from 'react';
import { motion } from 'framer-motion';
import { useResourceAnalytics, setResourceGoldStandard } from '@/hooks/useResourceAnalytics';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import { TeachingLoading, TeachingScreen } from '@/components/college/teaching/TeachingKit';

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

const HELP: PageHelpContent = {
  id: 'college-resource-analytics',
  title: 'Resource use',
  what: 'Which teaching resources learners actually open and download, so you know what is working and what to replace.',
  steps: [
    { title: 'See what is used', body: 'The chart shows the most-used resources. Change the measure with the chips: views, unique viewers or downloads.' },
    { title: 'Mark the best', body: 'Mark a resource as gold standard so other tutors know it is the one to use.' },
    { title: 'Replace what is not', body: 'Resources nobody opens are worth replacing or removing from Teaching resources.' },
  ],
  legend: [{ swatch: 'bg-elec-yellow', label: 'Yellow', body: 'gold standard' }],
};

const metric = (r: { views_count: number; view_count_30d: number; unique_viewers_30d: number; downloads_count: number }, k: SortKey) =>
  k === 'views_total' ? r.views_count : k === 'views_30d' ? r.view_count_30d : k === 'unique_30d' ? r.unique_viewers_30d : r.downloads_count;

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

  if (loading) return <TeachingLoading />;

  const top = sorted.slice(0, 8);
  const max = Math.max(1, ...top.map((r) => metric(r, sort)));
  const sortLabel = SORTS.find((x) => x.key === sort)?.label ?? '';

  return (
    <TeachingScreen>
      <CollegePageHeader
        eyebrow="Resources"
        title="Resource use"
        description="What learners open and download, and which resources to mark as the gold standard."
        help={HELP}
      />

      {error && <div className="rounded-2xl border border-orange-400/40 px-4 py-3 text-[13.5px] text-white">{error}</div>}

      {rows.length > 0 && (
        <CollegeStats
          items={[
            { label: 'Views', value: String(totals.views30d), sub: `last 30 days · ${totals.viewsAll} all time` },
            { label: 'Unique viewers', value: String(totals.unique30d), sub: 'last 30 days' },
            { label: 'Downloads', value: String(totals.downloads), sub: 'all time' },
            { label: 'Gold standard', value: String(totals.gold), sub: totals.gold > 0 ? 'flagged for tutors' : 'none flagged yet' },
          ]}
        />
      )}

      {rows.length === 0 ? (
        <CollegeEmpty
          title="No resource activity yet"
          body="Once learners start opening and downloading your resources, usage shows up here."
        />
      ) : (
        <>
          <motion.div variants={itemVariants} className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {SORTS.map((x) => (
              <button key={x.key} type="button" onClick={() => setSort(x.key)} className={chipCn(sort === x.key)}>
                {x.label}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <motion.section variants={itemVariants} className={VIS_CARD}>
              <VisHead title="Most used" sub={sortLabel} />
              <ul className="mt-5 space-y-3.5">
                {top.map((r) => {
                  const v = metric(r, sort);
                  return (
                    <li key={r.resource_id}>
                      <div className="flex items-baseline justify-between gap-3 text-[12.5px] text-white">
                        <span className="truncate font-medium">{r.title || 'Untitled resource'}</span>
                        <span className="shrink-0 font-semibold tabular-nums">{v}</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                        <div
                          className={cn('h-full rounded-full', r.gold_standard ? 'bg-elec-yellow' : 'bg-white/70')}
                          style={{ width: `${Math.max(2, (v / max) * 100)}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.section>

            <section className="space-y-4">
              <CollegeSectionTitle title="All resources" sub={`${rows.length} on file, top 25 shown`} />
              <motion.ul variants={itemVariants} className={COLLEGE_LIST}>
                {sorted.slice(0, 25).map((r) => {
                  const busy = busyId === r.resource_id;
                  return (
                    <li key={r.resource_id} className="flex min-h-[64px] items-center gap-3 px-5 py-3 sm:px-6">
                      <span
                        aria-hidden="true"
                        className={cn('h-9 w-1 shrink-0 rounded-full', r.gold_standard ? 'bg-elec-yellow' : 'bg-white/[0.14]')}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14.5px] font-semibold leading-tight text-white">
                          {r.title || 'Untitled resource'}
                          {r.gold_standard && <span className="ml-2 text-[11.5px] font-semibold text-elec-yellow">Gold standard</span>}
                        </span>
                        <span className="mt-1 block truncate text-[12.5px] leading-tight tabular-nums text-white">
                          {[
                            `${r.view_count_30d} views (30 days)`,
                            `${r.unique_viewers_30d} unique`,
                            `${r.views_count} all time`,
                            `${r.downloads_count} downloads`,
                            r.last_viewed_at ? `last ${new Date(r.last_viewed_at).toLocaleDateString('en-GB')}` : null,
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
                          'flex h-11 shrink-0 items-center rounded-xl border px-3 text-[12.5px] font-semibold transition-colors touch-manipulation disabled:opacity-40',
                          r.gold_standard ? 'border-white/[0.14] text-white' : 'border-elec-yellow text-elec-yellow'
                        )}
                      >
                        {busy ? '…' : r.gold_standard ? 'Remove gold' : 'Mark gold'}
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            </section>
          </div>
        </>
      )}
    </TeachingScreen>
  );
}
