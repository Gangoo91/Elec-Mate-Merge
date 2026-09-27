import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { classifyJobText, countJobTypes, OTHER_JOB_TYPE } from './lib/jobTaxonomy';
import { regionFromPostcode } from './lib/postcodeRegion';
import { useLivePricingBenchmarks } from './hooks/useLivePricing';
import RangeBar from './ui/RangeBar';

const gbp = (value: number) => `£${Math.round(value).toLocaleString('en-GB')}`;

interface MarketBenchmarkHintProps {
  /** Free text describing the job (title + description + item text). */
  jobText: string;
  /** Client postcode, if known — upgrades the figure to the region where data allows. */
  postcode?: string;
  /** Current quote total — when set (> £20), shows where this quote sits vs the range. */
  currentTotal?: number;
  /** Line-item descriptions — used to detect a bundled (multi-job-type) quote. */
  itemTexts?: (string | undefined)[];
  className?: string;
}

/**
 * Inline market-rate card for the quote builder: classifies the job text with
 * the shared Live Pricing taxonomy and shows the real median + typical range.
 * Renders nothing when the job doesn't classify or has no benchmark yet.
 * Deliberately not a link — never pulls the user out of the wizard mid-quote.
 */
const MarketBenchmarkHint = ({
  jobText,
  postcode,
  currentTotal,
  itemTexts,
  className,
}: MarketBenchmarkHintProps) => {
  const { data: benchmarks } = useLivePricingBenchmarks();

  const jobType = useMemo(() => classifyJobText(jobText), [jobText]);

  const { shown, national, regional, region } = useMemo(() => {
    const reg = postcode ? regionFromPostcode(postcode) : null;
    const nat = benchmarks?.find((b) => b.scope === 'national' && b.job_type === jobType);
    const regRow = reg
      ? benchmarks?.find(
          (b) => b.scope === 'regional' && b.job_type === jobType && b.region === reg
        )
      : undefined;
    return { shown: regRow ?? nat, national: nat, regional: regRow, region: reg };
  }, [benchmarks, jobType, postcode]);

  if (jobType === OTHER_JOB_TYPE || !shown || !national) return null;

  const hasTotal = typeof currentTotal === 'number' && currentTotal >= 20;
  // A quote spanning 2+ job types shouldn't be judged against the solo-job
  // range — benchmarks separate the two because bundles price differently.
  const isBundled = countJobTypes(itemTexts ?? []) >= 2;
  /*
   * A quote can be ABOUT sockets without BEING a sockets job.
   *
   * `isBundled` catches a quote spanning two classified job types. It does not
   * catch the commoner shape: a quote whose value is mostly generic labour
   * with a couple of classifiable materials on it. Seen live on quote
   * 2026/038 — six labour lines totalling £11,006 plus £23 of sockets. Only
   * "sockets" classifies, so it counted as a single-job quote and the panel
   * announced:
   *
   *   "This quote (£11,029) is above the typical range £91–£444"
   *
   * Technically true and completely useless: £11,029 against a £444 p75 is
   * 25× — that is not a dear sockets job, it is not a sockets job at all.
   * Printing a verdict there teaches the electrician the panel is noise, and
   * the panel's whole value is being believed when it says something real.
   *
   * So the verdict is withheld beyond a sane multiple. A genuinely expensive
   * job of the right type lands at 2–3× p75 and still gets told; a category
   * error does not get a verdict it cannot support. The market rate itself
   * still shows — that part is useful context either way.
   */
  const OUT_OF_SCALE = 5;
  const outOfScale = hasTotal && currentTotal > shown.p75_price * OUT_OF_SCALE;

  const position =
    hasTotal && !isBundled && !outOfScale
      ? currentTotal < shown.p25_price
        ? 'below'
        : currentTotal > shown.p75_price
          ? 'above'
          : 'within'
      : null;

  return (
    <div
      className={cn(
        'w-full p-4 rounded-2xl text-left',
        'bg-white/[0.04] border border-elec-yellow/25',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
            Market rate · {regional ? region : 'UK'}
          </p>
          <p className="text-sm font-bold text-white truncate mt-0.5">{jobType}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xl font-black text-white tabular-nums leading-tight">
            {gbp(shown.median_price)}
          </p>
          <p className="text-[11px] text-white">median</p>
        </div>
      </div>

      <RangeBar
        p25={shown.p25_price}
        median={shown.median_price}
        p75={shown.p75_price}
        className="mt-3"
      />

      <p className="text-[11px] text-white mt-1.5">
        {regional
          ? `${regional.sample_size} real quotes in ${region} · UK median ${gbp(national.median_price)}`
          : `${national.sample_size} real quotes from UK electricians`}
      </p>

      {position && (
        <p
          className={cn(
            'text-[11px] font-medium mt-2 pt-2 border-t border-white/10 tabular-nums',
            position === 'within' ? 'text-green-400' : 'text-amber-400'
          )}
        >
          {position === 'within'
            ? `This quote (${gbp(currentTotal!)}) is within the typical range for the job on its own`
            : `This quote (${gbp(currentTotal!)}) is ${position} the typical range ${gbp(shown.p25_price)}–${gbp(shown.p75_price)} for the job on its own`}
        </p>
      )}

      {/* Say why there is no verdict. The bundled branch below explains
          itself, and staying silent here just leaves the electrician to make
          the bad comparison in their head. */}
      {hasTotal && !isBundled && outOfScale && (
        <p className="text-[11px] font-medium text-white mt-2 pt-2 border-t border-white/10">
          This quote covers more than {jobType.toLowerCase()} on their own, so it is not
          compared against the range above
        </p>
      )}

      {hasTotal && isBundled && (
        <p className="text-[11px] font-medium text-white mt-2 pt-2 border-t border-white/10 tabular-nums">
          This quote covers more than one job type
          {national.bundled_median != null
            ? ` — bundled ${jobType.toLowerCase()} quotes run higher: median ${gbp(national.bundled_median)} (${national.bundled_count} quotes)`
            : ' — the range above is for the job on its own'}
        </p>
      )}
    </div>
  );
};

export default MarketBenchmarkHint;
