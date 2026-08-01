import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  useLivePricingBenchmarks,
  useLivePricingInsights,
  useMyPricingStats,
} from '../hooks/useLivePricing';
import { OTHER_JOB_TYPE } from '../lib/jobTaxonomy';
import { InsightsSkeleton } from '../ui/PricingSkeleton';

const gbp = (value: number) => `£${Math.round(value).toLocaleString('en-GB')}`;

// Large totals in compact form so they fit stat tiles on narrow phones.
const gbpCompact = (value: number) =>
  value >= 1_000_000
    ? `£${(value / 1_000_000).toFixed(2)}m`
    : value >= 100_000
      ? `£${Math.round(value / 1_000)}k`
      : gbp(value);

const monthLabel = (yyyyMm: string) => {
  const [year, month] = yyyyMm.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString('en-GB', { month: 'short' });
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
    {children}
  </p>
);

/** Baseline-anchored horizontal bar — rounded only at the data end. */
const HBar = ({ pct }: { pct: number }) => (
  <div className="flex-1 h-3 border-l border-white/15">
    <div
      className="h-full rounded-r-[4px] bg-gradient-to-r from-elec-yellow/60 to-elec-yellow"
      style={{ width: `${Math.max(Math.min(pct, 100), 1.5)}%` }}
    />
  </div>
);

const InsightsDashboard = ({ className }: { className?: string }) => {
  const { data: insights, isLoading } = useLivePricingInsights();
  const { data: benchmarks } = useLivePricingBenchmarks();
  const { data: myStats } = useMyPricingStats();

  const nationalByJob = useMemo(() => {
    const map = new Map<string, { median: number; sample: number }>();
    for (const row of benchmarks ?? []) {
      if (row.scope === 'national') {
        map.set(row.job_type, { median: row.median_price, sample: row.sample_size });
      }
    }
    return map;
  }, [benchmarks]);

  const youVsMarket = useMemo(() => {
    if (!myStats) return [];
    return myStats.jobTypes
      .filter((t) => t.jobType !== OTHER_JOB_TYPE && t.count >= 3 && nationalByJob.has(t.jobType))
      .map((t) => {
        const market = nationalByJob.get(t.jobType)!;
        const deltaPct = Math.round(((t.medianPrice - market.median) / market.median) * 100);
        return { ...t, marketMedian: market.median, marketSample: market.sample, deltaPct };
      })
      .slice(0, 6);
  }, [myStats, nationalByJob]);

  if (isLoading || !insights) {
    return <InsightsSkeleton />;
  }

  const {
    totals,
    top_job_types: topJobs,
    monthly_trend: trend,
    region_coverage: regions,
    pricing_power: pricingPower,
  } = insights;
  const maxTrendN = Math.max(...trend.map((m) => m.n), 1);
  const maxJobN = Math.max(...topJobs.map((j) => j.n), 1);
  const maxRegionN = Math.max(...regions.map((r) => r.n), 1);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Market Insights</h2>
        <p className="text-sm text-white/80 mt-1">
          Computed live from real quotes created in Elec-Mate
        </p>
      </div>

      {/* Market pulse tiles */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">
            Quotes analysed
          </p>
          <p className="text-2xl sm:text-3xl font-black text-white tabular-nums mt-1.5">
            {totals.quotes.toLocaleString('en-GB')}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">
            Job types benchmarked
          </p>
          <p className="text-2xl sm:text-3xl font-black text-white tabular-nums mt-1.5">
            {(benchmarks ?? []).filter((b) => b.scope === 'national').length || '—'}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">
            Work quoted to date
          </p>
          <p className="text-2xl sm:text-3xl font-black text-white tabular-nums mt-1.5">
            {gbpCompact(totals.total_value)}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">
            Quotes · last 90 days
          </p>
          <p className="text-2xl sm:text-3xl font-black text-white tabular-nums mt-1.5">
            {totals.quotes_90d.toLocaleString('en-GB')}
          </p>
        </div>
      </div>

      {/* Quote volume trend */}
      {trend.length >= 3 && (
        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
          <Eyebrow>Market activity</Eyebrow>
          <p className="text-xs text-white/70 mt-0.5 mb-4">Quotes created per month</p>
          <div className="flex gap-2 h-32 border-b border-white/15">
            {trend.map((m, idx) => {
              const isEndpoint = idx === 0 || idx === trend.length - 1;
              const isPeak = m.n === maxTrendN;
              return (
                <div
                  key={m.month}
                  className="flex-1 h-full flex flex-col items-center justify-end gap-1 min-w-0"
                >
                  {(isEndpoint || isPeak) && (
                    <span className="text-xs font-semibold text-white tabular-nums">{m.n}</span>
                  )}
                  <div
                    className="w-full max-w-10 rounded-t-[4px] bg-gradient-to-t from-elec-yellow/60 to-elec-yellow"
                    style={{ height: `${Math.max((m.n / maxTrendN) * 78, 2)}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 mt-1.5">
            {trend.map((m) => (
              <span key={m.month} className="flex-1 text-center text-[10px] text-white/70">
                {monthLabel(m.month)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Most quoted job types */}
      <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
        <Eyebrow>Most quoted jobs</Eyebrow>
        <p className="text-xs text-white/70 mt-0.5 mb-4">
          UK median for the job on its own · acceptance rate
        </p>
        <div className="space-y-3">
          {topJobs.map((job) => (
            <div key={job.job_type}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-medium text-white truncate">{job.job_type}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm font-bold text-white tabular-nums">
                    {gbp(job.median)}
                  </span>
                  {job.win_rate != null && (
                    <span className="text-xs text-green-400 font-medium tabular-nums">
                      {Math.round(job.win_rate * 100)}% won
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <HBar pct={(job.n / maxJobN) * 100} />
                <span className="text-[10px] text-white/70 w-14 text-right tabular-nums">
                  {job.n} quotes
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing power */}
      {pricingPower && pricingPower.length > 0 && (
        <div className="p-5 rounded-2xl bg-white/[0.04] border border-elec-yellow/25">
          <Eyebrow>Pricing power</Eyebrow>
          <p className="text-xs text-white/70 mt-0.5 mb-4">
            Win rate by where the quote sat against the going rate for that job
          </p>
          <div className="space-y-3">
            {pricingPower.map((row) => (
              <div key={row.bucket}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white">{row.bucket}</span>
                  <span className="text-sm font-bold text-white tabular-nums">
                    {Math.round(row.win_rate * 100)}% won
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HBar pct={row.win_rate * 100} />
                  <span className="text-[10px] text-white/70 w-16 text-right tabular-nums">
                    {row.n} quotes
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/70 mt-4 leading-relaxed">
            Pricing above the going rate barely dents acceptance — quoting well above the median
            still won{' '}
            {Math.round((pricingPower[pricingPower.length - 1]?.win_rate ?? 0) * 100)}% of the
            time. Underpricing doesn't win more work; it just costs margin.
          </p>
        </div>
      )}

      {/* You vs the market */}
      <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
        <Eyebrow>You vs the market</Eyebrow>
        {youVsMarket.length > 0 ? (
          <>
            <p className="text-xs text-white/70 mt-0.5 mb-4">
              Your median quote against the UK median, for jobs you've quoted 3+ times
            </p>
            <div className="space-y-2">
              {youVsMarket.map((row) => (
                <div
                  key={row.jobType}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{row.jobType}</p>
                    <p className="text-xs text-white/80 tabular-nums">
                      You {gbp(row.medianPrice)} · UK {gbp(row.marketMedian)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 tabular-nums',
                      Math.abs(row.deltaPct) <= 5
                        ? 'bg-white/10 text-white'
                        : row.deltaPct > 0
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-sky-500/15 text-sky-400'
                    )}
                  >
                    {Math.abs(row.deltaPct) <= 5
                      ? 'On market'
                      : `${row.deltaPct > 0 ? '+' : ''}${row.deltaPct}% vs UK`}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-white mt-2 leading-relaxed">
            Quote 3+ jobs of the same type in Elec-Mate and we'll show how your pricing compares
            with the UK market — automatically and privately.
          </p>
        )}
      </div>

      {/* Regional coverage */}
      <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
        <Eyebrow>Data by region</Eyebrow>
        <p className="text-xs text-white/70 mt-0.5 mb-4">Quotes with a location, by UK region</p>
        <div className="space-y-2">
          {regions.map((r) => (
            <div key={r.region} className="flex items-center gap-3">
              <span className="text-sm text-white w-28 sm:w-36 flex-shrink-0 truncate">
                {r.region}
              </span>
              <HBar pct={(r.n / maxRegionN) * 100} />
              <span className="text-xs text-white/70 w-8 text-right tabular-nums">{r.n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How this works */}
      <p className="text-xs text-white/70 leading-relaxed">
        Every stat on this page is an anonymised aggregate of real quotes created by Elec-Mate
        electricians
        {myStats && myStats.quoteCount > 0 ? ` — including your ${myStats.quoteCount}` : ''}.
        Individual quotes and client details are never shown to anyone else.
      </p>
    </div>
  );
};

export default InsightsDashboard;
