import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Loader2, MapPin, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { getCurrentPosition } from '@/utils/geolocation';
import { jobTypeMeta, OTHER_JOB_TYPE } from '../lib/jobTaxonomy';
import { regionFromPostcode } from '../lib/postcodeRegion';
import {
  PricingBenchmarkRow,
  useLivePricingBenchmarks,
  useLivePricingInsights,
} from '../hooks/useLivePricing';
import { SearchResultsSkeleton } from '../ui/PricingSkeleton';
import RangeBar from '../ui/RangeBar';
import ItemRatesSection from './ItemRatesSection';

const gbp = (value: number) => `£${Math.round(value).toLocaleString('en-GB')}`;

interface BenchmarkExplorerProps {
  onSubmitPrice: () => void;
}

const BenchmarkExplorer = ({ onSubmitPrice }: BenchmarkExplorerProps) => {
  const navigate = useNavigate();
  const { data: benchmarks, isLoading, error } = useLivePricingBenchmarks();
  const { data: insights } = useLivePricingInsights();

  const [postcodeInput, setPostcodeInput] = useState('');
  const [postcodeError, setPostcodeError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [resolvedPostcode, setResolvedPostcode] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [detailJob, setDetailJob] = useState<string | null>(null);
  const regionChipRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // A postcode search can select a region whose chip sits off-screen in the
  // scroll row — bring it into view so the selection is visible.
  useEffect(() => {
    if (!selectedRegion) return;
    regionChipRefs.current
      .get(selectedRegion)
      ?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [selectedRegion]);

  const nationalRows = useMemo(() => {
    const rows = (benchmarks ?? []).filter((b) => b.scope === 'national');
    return rows.sort((a, b) => {
      if (a.job_type === OTHER_JOB_TYPE) return 1;
      if (b.job_type === OTHER_JOB_TYPE) return -1;
      return b.sample_size - a.sample_size;
    });
  }, [benchmarks]);

  const regionalRows = useMemo(() => {
    const map = new Map<string, PricingBenchmarkRow[]>();
    for (const row of benchmarks ?? []) {
      if (row.scope !== 'regional') continue;
      const list = map.get(row.job_type) ?? [];
      list.push(row);
      map.set(row.job_type, list);
    }
    for (const list of map.values()) list.sort((a, b) => b.sample_size - a.sample_size);
    return map;
  }, [benchmarks]);

  const regionsWithData = insights?.region_coverage ?? [];

  const applyRegion = (region: string | null, fromPostcode: string | null = null) => {
    setSelectedRegion(region);
    setResolvedPostcode(fromPostcode);
    setPostcodeError(null);
    if (!fromPostcode) setPostcodeInput('');
  };

  const handlePostcodeSearch = () => {
    const trimmed = postcodeInput.trim().toUpperCase();
    if (!trimmed) return;
    const region = regionFromPostcode(trimmed);
    if (region) {
      applyRegion(region, trimmed.split(' ')[0]);
    } else {
      setPostcodeError('Enter a UK postcode or district, e.g. M1 or SW1A 1AA');
    }
  };

  const handleLocate = async () => {
    setIsLocating(true);
    setPostcodeError(null);
    try {
      const position = await getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
      const response = await fetch(
        `https://api.postcodes.io/postcodes?lon=${position.longitude}&lat=${position.latitude}&limit=1`
      );
      const data = await response.json();
      const postcode: string | undefined = data.result?.[0]?.postcode;
      const region = postcode ? regionFromPostcode(postcode) : null;
      if (region && postcode) {
        setPostcodeInput(postcode);
        applyRegion(region, postcode.split(' ')[0]);
      } else {
        setPostcodeError('Could not resolve your location to a UK region');
      }
    } catch {
      setPostcodeError('Location unavailable — enter a postcode instead');
    } finally {
      setIsLocating(false);
    }
  };

  const detailNational = detailJob ? nationalRows.find((r) => r.job_type === detailJob) : null;
  const detailRegional = detailJob ? (regionalRows.get(detailJob) ?? []) : [];

  if (error) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-bold text-white mb-2">Could not load benchmarks</h3>
        <p className="text-white text-sm">Check your connection and pull to refresh.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Data pool header */}
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          Live benchmarks
        </p>
        <p className="text-sm text-white mt-0.5">
          Real quotes from UK electricians — anonymised, updated as quotes are created
        </p>
      </div>

      {/* Region search */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-elec-yellow pointer-events-none" />
            <input
              value={postcodeInput}
              onChange={(e) => {
                setPostcodeInput(e.target.value.toUpperCase());
                setPostcodeError(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handlePostcodeSearch()}
              placeholder="Postcode"
              className={cn(
                'w-full h-12 pl-12 pr-4 rounded-xl',
                'bg-neutral-800 border-2 border-white/10',
                'text-base font-semibold text-white placeholder:text-white/80',
                'focus:outline-none focus:border-elec-yellow/50',
                'touch-manipulation'
              )}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="characters"
              spellCheck={false}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLocate}
            disabled={isLocating}
            className="h-12 w-12 rounded-xl flex-shrink-0 bg-white/5 border border-white/10 touch-manipulation active:scale-95"
          >
            {isLocating ? (
              <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
            ) : (
              <MapPin className="h-5 w-5 text-elec-yellow" />
            )}
          </Button>
          <Button
            onClick={handlePostcodeSearch}
            disabled={!postcodeInput.trim()}
            className="h-12 px-4 rounded-xl flex-shrink-0 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold touch-manipulation active:scale-95 disabled:opacity-40"
          >
            Go
          </Button>
        </div>
        {postcodeError && <p className="text-sm text-orange-300">{postcodeError}</p>}

        {/* Region chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          <button
            onClick={() => applyRegion(null)}
            className={cn(
              'h-11 px-4 rounded-xl text-sm font-semibold whitespace-nowrap flex-shrink-0 border touch-manipulation transition-colors',
              !selectedRegion
                ? 'bg-elec-yellow text-black border-elec-yellow'
                : 'bg-white/5 text-white border-white/10 active:bg-white/10'
            )}
          >
            UK-wide
          </button>
          {regionsWithData.map((r) => (
            <button
              key={r.region}
              ref={(el) => {
                if (el) regionChipRefs.current.set(r.region, el);
                else regionChipRefs.current.delete(r.region);
              }}
              onClick={() => applyRegion(r.region)}
              className={cn(
                'h-11 px-4 rounded-xl text-sm font-semibold whitespace-nowrap flex-shrink-0 border touch-manipulation transition-colors',
                selectedRegion === r.region
                  ? 'bg-elec-yellow text-black border-elec-yellow'
                  : 'bg-white/5 text-white border-white/10 active:bg-white/10'
              )}
            >
              {r.region}
              <span className={selectedRegion === r.region ? 'text-black/60' : 'text-white/60'}>
                {' '}
                · {r.n}
              </span>
            </button>
          ))}
        </div>

        {selectedRegion && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold">
              <MapPin className="h-3.5 w-3.5" />
              {resolvedPostcode ? `${resolvedPostcode} · ${selectedRegion}` : selectedRegion}
            </span>
            <button
              onClick={() => applyRegion(null)}
              className="h-11 w-11 flex items-center justify-center rounded-full bg-white/5 text-white touch-manipulation active:bg-white/10"
              aria-label="Clear region"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Hourly rate stat tile */}
      {insights?.labour_rate?.median != null && (
        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 mb-1.5">
            Going hourly rate
          </p>
          <p className="text-4xl font-black text-white tabular-nums">
            {gbp(insights.labour_rate.median)}
            <span className="text-lg font-semibold text-white/80">/hr</span>
          </p>
          <p className="text-sm text-white mt-1">
            Typical {gbp(insights.labour_rate.p25 ?? 0)}–{gbp(insights.labour_rate.p75 ?? 0)} ·
            from {insights.labour_rate.n} priced labour lines
            {selectedRegion ? ' · UK-wide' : ''}
          </p>
        </div>
      )}

      {/* Benchmark cards */}
      {isLoading ? (
        <SearchResultsSkeleton />
      ) : (
        <div className="space-y-3">
          <div className="flex items-baseline justify-between pt-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
              Job benchmarks{selectedRegion ? ` · ${selectedRegion}` : ''}
            </p>
            <span className="text-[11px] text-white/70">{nationalRows.length} job types</span>
          </div>
          {nationalRows.map((row) => {
            const regional = selectedRegion
              ? regionalRows.get(row.job_type)?.find((r) => r.region === selectedRegion)
              : undefined;
            const shown = regional ?? row;
            const meta = jobTypeMeta(row.job_type);
            return (
              <button
                key={row.job_type}
                onClick={() => setDetailJob(row.job_type)}
                className={cn(
                  'w-full p-4 rounded-2xl text-left transition-all touch-manipulation active:scale-[0.99]',
                  'bg-white/[0.04] border border-white/10',
                  'active:border-elec-yellow/30 active:bg-white/[0.07]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white line-clamp-2">{row.job_type}</p>
                    <p className="text-xs text-white/80 truncate">{meta.blurb}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl sm:text-2xl font-black text-white tabular-nums leading-tight">
                      {gbp(shown.median_price)}
                    </p>
                    <p className="text-[10px] text-white/70 uppercase tracking-wider">
                      {regional ? `${selectedRegion} median` : 'UK median'}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
                </div>

                <RangeBar
                  p25={shown.p25_price}
                  median={shown.median_price}
                  p75={shown.p75_price}
                  className="mt-4"
                />

                <p className="text-[11px] text-white/70 mt-2.5">
                  {regional
                    ? `${regional.sample_size} quotes in ${selectedRegion} · this job only`
                    : `${row.sample_size} quotes · this job only`}
                  {row.win_rate != null && (
                    <>
                      {' · '}
                      <span className="text-green-400 font-medium">
                        {Math.round(row.win_rate * 100)}% accepted
                      </span>
                    </>
                  )}
                  {selectedRegion && !regional && (
                    <> · UK figure — not enough {selectedRegion} data yet</>
                  )}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* Per-item going rates */}
      <ItemRatesSection />

      {/* Methodology note */}
      <p className="text-xs text-white/70 leading-relaxed">
        Figures are for the job priced on its own — quotes that bundle several job types are
        shown separately, so ranges stay meaningful. Computed live from real Elec-Mate quotes,
        anonymised and aggregated; figures only appear where enough data exists (5+ quotes
        UK-wide, 3+ from 2+ electricians per region).
      </p>

      {/* Detail bottom sheet */}
      <Sheet open={!!detailJob} onOpenChange={(open) => !open && setDetailJob(null)}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          {detailNational && (
            <div className="flex flex-col h-full bg-background">
              <div className="px-5 pt-5 pb-4 border-b border-white/10">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                  Market benchmark
                </p>
                <h2 className="text-xl font-bold text-white truncate mt-0.5">
                  {detailNational.job_type}
                </h2>
                <p className="text-xs text-white/80">
                  {jobTypeMeta(detailNational.job_type).blurb}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                {/* Headline stats */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                      UK median
                    </p>
                    <p className="text-xs text-white/70">typical range</p>
                  </div>
                  <p className="text-4xl font-black text-white tabular-nums">
                    {gbp(detailNational.median_price)}
                  </p>
                  <RangeBar
                    p25={detailNational.p25_price}
                    median={detailNational.median_price}
                    p75={detailNational.p75_price}
                    className="mt-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-3xl font-black text-white tabular-nums">
                      {detailNational.sample_size}
                    </p>
                    <p className="text-xs text-white mt-1">real quotes analysed</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-3xl font-black text-white tabular-nums">
                      {detailNational.win_rate != null
                        ? `${Math.round(detailNational.win_rate * 100)}%`
                        : '—'}
                    </p>
                    <p className="text-xs text-white mt-1">
                      {detailNational.win_rate != null
                        ? `of ${detailNational.decided_count} decided quotes accepted`
                        : 'win rate needs more data'}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-white/70">
                  Latest quote{' '}
                  {new Date(detailNational.latest_activity).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>

                {/* Price distribution */}
                {detailNational.histogram && detailNational.histogram.length > 0 && (
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 border-b border-white/10 pb-2 mb-3">
                      Where {detailNational.sample_size} quotes landed
                    </p>
                    <div className="flex items-end gap-1 h-24 border-b border-white/15">
                      {detailNational.histogram.map((bucket, idx) => {
                        const maxN = Math.max(...detailNational.histogram!.map((b) => b.n), 1);
                        return (
                          <div key={idx} className="flex-1 h-full flex flex-col justify-end">
                            <div
                              className="w-full rounded-t-[4px] bg-gradient-to-t from-elec-yellow/60 to-elec-yellow"
                              style={{ height: `${Math.max((bucket.n / maxN) * 96, 2)}%` }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[10px] text-white/70 tabular-nums">
                        {gbp(detailNational.histogram[0].lo)}
                      </span>
                      <span className="text-[10px] text-white/70 tabular-nums">
                        {gbp(detailNational.histogram[detailNational.histogram.length - 1].hi)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Bundled context */}
                {detailNational.bundled_median != null && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-sm text-white">
                      <span className="font-semibold">Quoted with other work:</span> median{' '}
                      <span className="font-bold tabular-nums">
                        {gbp(detailNational.bundled_median)}
                      </span>{' '}
                      across {detailNational.bundled_count} bundled quotes
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      The headline figures above are for this job priced on its own.
                    </p>
                  </div>
                )}

                {/* Regional table */}
                {detailRegional.length > 0 && (
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 border-b border-white/10 pb-2 mb-3">
                      By region
                    </p>
                    <div className="space-y-2">
                      {detailRegional.map((r) => {
                        const deltaPct = Math.round(
                          ((r.median_price - detailNational.median_price) /
                            detailNational.median_price) *
                            100
                        );
                        return (
                          <div
                            key={r.region}
                            className={cn(
                              'flex items-center justify-between p-3 rounded-xl border',
                              r.region === selectedRegion
                                ? 'bg-elec-yellow/10 border-elec-yellow/30'
                                : 'bg-white/5 border-white/10'
                            )}
                          >
                            <div>
                              <p className="text-sm font-semibold text-white">{r.region}</p>
                              <p className="text-xs text-white/90">
                                {r.sample_size} quotes · {r.contributors} electricians
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-white tabular-nums">
                                {gbp(r.median_price)}
                              </p>
                              <p
                                className={cn(
                                  'text-xs font-medium tabular-nums',
                                  Math.abs(deltaPct) <= 5
                                    ? 'text-white/80'
                                    : deltaPct > 0
                                      ? 'text-amber-400'
                                      : 'text-sky-400'
                                )}
                              >
                                {Math.abs(deltaPct) <= 5
                                  ? 'on UK median'
                                  : `${deltaPct > 0 ? '+' : ''}${deltaPct}% vs UK`}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-white/70 mt-2">
                      Regional medians are indicative — small samples move around as more quotes
                      arrive.
                    </p>
                  </div>
                )}

                <p className="text-xs text-white/70 leading-relaxed">
                  Prices vary with job scope, property and access. Use the range, not just the
                  median, when pricing.
                </p>
              </div>

              {/* CTAs */}
              <div className="px-5 py-4 border-t border-white/10 space-y-2 pb-safe">
                <Button
                  onClick={() => navigate('/electrician/quote-builder/create')}
                  className="w-full h-12 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold touch-manipulation"
                >
                  Price a job like this
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDetailJob(null);
                    onSubmitPrice();
                  }}
                  className="w-full h-12 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white font-semibold touch-manipulation"
                >
                  Add what you charge
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BenchmarkExplorer;
