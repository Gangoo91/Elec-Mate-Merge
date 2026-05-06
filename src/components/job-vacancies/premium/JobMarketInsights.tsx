/**
 * JobMarketInsights — editorial market analytics view.
 *
 * Drops the per-stat colour gradients (blue/green/amber/purple) for
 * uniform editorial gradient surfaces. Regional list keeps a small
 * accent dot per region for scanning, but no flood-fill chips. Salary
 * distribution bars use elec-yellow only.
 */

import { Progress } from '@/components/ui/progress';
import { Loader2, BarChart3, TrendingUp, MapPin, Building2, Briefcase, PoundSterling, Calendar } from 'lucide-react';
import { useJobMarketAnalytics } from '@/hooks/job-vacancies/useJobMarketAnalytics';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

const surface =
  'rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]';

const formatCurrency = (amount: number): string =>
  amount >= 1000 ? `£${Math.round(amount / 1000)}k` : `£${amount}`;

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Regional accent — small coloured dots only, no flood backgrounds
const regionDot: Record<string, string> = {
  London: 'bg-blue-400',
  Manchester: 'bg-purple-400',
  Birmingham: 'bg-orange-400',
  Leeds: 'bg-emerald-400',
  Scotland: 'bg-cyan-400',
  Liverpool: 'bg-red-400',
  Bristol: 'bg-green-400',
  Sheffield: 'bg-amber-400',
  Newcastle: 'bg-indigo-400',
  Wales: 'bg-rose-400',
};

const JobMarketInsights = () => {
  const { data: analytics, isLoading, error } = useJobMarketAnalytics();

  if (isLoading) {
    return (
      <div className={cn(surface, 'flex flex-col items-center justify-center py-16')}>
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow mb-3" />
        <p className="text-[13px] text-white/85">Loading market data…</p>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className={cn(surface, 'text-center py-12 px-6')}>
        <BarChart3 className="h-10 w-10 mx-auto text-white/25 mb-4" aria-hidden />
        <h3 className="text-[20px] font-semibold tracking-tight text-white">Couldn't load data.</h3>
        <p className="mt-2 text-[13px] text-white/85">Try again in a moment.</p>
      </div>
    );
  }

  if (analytics.totalJobs === 0) {
    return (
      <div className={cn(surface, 'text-center py-12 px-6')}>
        <BarChart3 className="h-10 w-10 mx-auto text-white/25 mb-4" aria-hidden />
        <h3 className="text-[20px] font-semibold tracking-tight text-white">No data yet.</h3>
        <p className="mt-2 text-[13px] text-white/85">
          Market data appears once the job feed has cached.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header stat strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KeyStat icon={Briefcase} label="Total jobs" value={analytics.totalJobs} />
        <KeyStat
          icon={PoundSterling}
          label="Avg salary"
          value={formatCurrency(analytics.averageSalary)}
          accent
        />
        <KeyStat icon={TrendingUp} label="This week" value={analytics.newJobsThisWeek} />
        <KeyStat icon={Calendar} label="Today" value={analytics.newJobsToday} />
      </section>

      {/* Jobs by region */}
      <section className={cn(surface, 'p-5 sm:p-6')}>
        <div className="flex items-baseline gap-2">
          <MapPin className="h-3.5 w-3.5 text-elec-yellow self-center" aria-hidden />
          <Eyebrow>BY REGION</Eyebrow>
        </div>
        <div className="mt-4 space-y-3">
          {analytics.regionStats.slice(0, 6).map((region) => {
            const maxJobs = analytics.regionStats[0]?.jobCount || 1;
            const percentage = Math.round((region.jobCount / maxJobs) * 100);
            const dot = regionDot[region.region] || 'bg-white/30';
            return (
              <div key={region.region} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="inline-flex items-baseline gap-2 text-[13px] font-semibold text-white">
                    <span
                      className={cn('w-2 h-2 rounded-full self-center shrink-0', dot)}
                      aria-hidden
                    />
                    {region.region}
                  </span>
                  <span className="text-[11.5px] tabular-nums text-white/85">
                    <span className="text-white font-semibold">{region.jobCount}</span> jobs
                    {region.avgSalary > 0 && (
                      <>
                        <span className="text-white/40 mx-1.5">·</span>
                        <span className="text-elec-yellow font-semibold">
                          {formatCurrency(region.avgSalary)}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <Progress value={percentage} className="h-1.5" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Salary distribution */}
      <section className={cn(surface, 'p-5 sm:p-6')}>
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <PoundSterling className="h-3.5 w-3.5 text-elec-yellow self-center" aria-hidden />
            <Eyebrow>SALARY DISTRIBUTION</Eyebrow>
          </div>
          <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
            Median {formatCurrency(analytics.medianSalary)}
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {analytics.salaryBands.map((band) => (
            <div key={band.range} className="flex items-center gap-3">
              <span className="text-[11px] tabular-nums text-white/85 w-16 shrink-0">
                {band.range}
              </span>
              <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow rounded-full"
                  style={{ width: `${Math.max(band.percentage, 2)}%` }}
                />
              </div>
              <span className="text-[11px] tabular-nums text-white/85 w-10 text-right shrink-0">
                {band.percentage}%
              </span>
              <span className="text-[10.5px] tabular-nums text-white/65 w-10 text-right shrink-0">
                {band.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Job types */}
      <section className={cn(surface, 'p-5 sm:p-6')}>
        <div className="flex items-baseline gap-2">
          <Briefcase className="h-3.5 w-3.5 text-elec-yellow self-center" aria-hidden />
          <Eyebrow>JOB TYPES</Eyebrow>
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {analytics.jobTypeStats.map((type) => (
            <li
              key={type.type}
              className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.12em] font-semibold text-white/85 border border-white/15 rounded-full px-3 py-1.5"
            >
              {type.type}
              <span className="text-elec-yellow tabular-nums font-semibold">
                {type.percentage}%
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Top hiring */}
      <section className={cn(surface, 'p-5 sm:p-6')}>
        <div className="flex items-baseline gap-2">
          <Building2 className="h-3.5 w-3.5 text-elec-yellow self-center" aria-hidden />
          <Eyebrow>TOP HIRING</Eyebrow>
        </div>
        <ol className="mt-4 divide-y divide-white/[0.06]">
          {analytics.topCompanies.map((company, idx) => (
            <li
              key={company.company}
              className="flex items-baseline justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="inline-flex items-baseline gap-3 min-w-0">
                <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-[13.5px] text-white truncate">{company.company}</span>
              </div>
              <span className="text-[11px] tabular-nums text-white/85 shrink-0">
                <span className="text-white font-semibold">{company.jobCount}</span>{' '}
                {company.jobCount === 1 ? 'job' : 'jobs'}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Footer timestamp */}
      <p className="text-center text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums py-2">
        Updated {formatDate(analytics.lastUpdated)}
      </p>
    </div>
  );
};

const KeyStat = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  accent?: boolean;
}) => (
  <div className={cn(surface, 'p-4')}>
    <div className="flex items-baseline justify-between gap-2">
      <Icon
        className={cn('h-3.5 w-3.5', accent ? 'text-emerald-300' : 'text-elec-yellow')}
        aria-hidden
      />
      <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
        {label}
      </span>
    </div>
    <div
      className={cn(
        'mt-2 text-[22px] sm:text-[26px] font-semibold tabular-nums',
        accent ? 'text-emerald-300' : 'text-white'
      )}
    >
      {value}
    </div>
  </div>
);

export default JobMarketInsights;
