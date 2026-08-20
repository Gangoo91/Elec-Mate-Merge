/**
 * PerPointEstimator — instant per-point job estimate for
 * /guides/pricing-electrical-work-per-point.
 *
 * Pick region and property type, type the number of points, get the range.
 * Every figure is grounded in this page's own body copy — the 2026 regional
 * per-point table (9 regions, new build vs existing) and the consumer-unit
 * note (£450–£850 supply-and-fit domestic, priced separately, and its EIC
 * obligation under Reg 644.1). Do not add figures the page body does not
 * state.
 */
import { useMemo, useRef, useState } from 'react';
import { trackSeoToolUsed } from '@/lib/analytics-events';

interface Region {
  name: string;
  newBuild: [number, number];
  existing: [number, number];
}

// Mirrors the regional table rendered on the page — keep the two in step.
const REGIONS: Region[] = [
  { name: 'London', newBuild: [110, 140], existing: [130, 160] },
  { name: 'South East', newBuild: [100, 130], existing: [120, 150] },
  { name: 'South West', newBuild: [90, 115], existing: [105, 135] },
  { name: 'Midlands', newBuild: [85, 110], existing: [100, 130] },
  { name: 'North West', newBuild: [85, 105], existing: [95, 125] },
  { name: 'North East', newBuild: [80, 100], existing: [90, 120] },
  { name: 'Scotland', newBuild: [80, 105], existing: [95, 125] },
  { name: 'Wales', newBuild: [80, 100], existing: [90, 120] },
  { name: 'Northern Ireland', newBuild: [75, 95], existing: [85, 115] },
];

const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:border-white/30';

export default function PerPointEstimator() {
  const [regionIdx, setRegionIdx] = useState(0);
  const [existing, setExisting] = useState(true);
  const [raw, setRaw] = useState('');
  const usedRef = useRef(false);

  const markUsed = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    trackSeoToolUsed({ tool: 'per_point_estimator', page: window.location.pathname });
  };

  const points = useMemo(() => {
    const n = Number(raw);
    return Number.isInteger(n) && n > 0 && n <= 500 ? n : null;
  }, [raw]);

  const region = REGIONS[regionIdx];
  const [low, high] = existing ? region.existing : region.newBuild;

  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        Estimate a job at per-point rates
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-white">
        Pick the region and property type, enter the point count, and get the 2026 range.
      </p>

      <div
        className="mt-4 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Region"
      >
        {REGIONS.map((r, i) => (
          <button
            key={r.name}
            type="button"
            aria-pressed={regionIdx === i}
            onClick={() => {
              setRegionIdx(i);
              markUsed();
            }}
            className={`h-11 shrink-0 rounded-xl border px-3.5 text-sm transition-colors touch-manipulation ${
              regionIdx === i ? chipOn : chipOff
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Property type">
        <button
          type="button"
          aria-pressed={!existing}
          onClick={() => {
            setExisting(false);
            markUsed();
          }}
          className={`h-11 rounded-xl border px-2 text-sm transition-colors touch-manipulation ${
            !existing ? chipOn : chipOff
          }`}
        >
          New build
        </button>
        <button
          type="button"
          aria-pressed={existing}
          onClick={() => {
            setExisting(true);
            markUsed();
          }}
          className={`h-11 rounded-xl border px-2 text-sm transition-colors touch-manipulation ${
            existing ? chipOn : chipOff
          }`}
        >
          Existing property
        </button>
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block text-[12px] font-medium text-white">Number of points</span>
        <input
          type="text"
          inputMode="numeric"
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            markUsed();
          }}
          placeholder="e.g. 42"
          aria-label="Number of points"
          className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
        />
      </label>

      <div role="status" className="mt-4 rounded-xl border border-white/[0.14] bg-white/[0.04] p-4">
        <p className="text-sm font-medium text-white">
          {region.name} · {existing ? 'existing property' : 'new build'} ·{' '}
          {gbp(low)}–{gbp(high)} per point
        </p>
        {points !== null ? (
          <p className="mt-1 text-2xl font-bold text-elec-yellow">
            {gbp(points * low)}–{gbp(points * high)}
            <span className="text-base font-semibold text-white"> for {points} points</span>
          </p>
        ) : (
          <p className="mt-1 text-sm leading-relaxed text-white">
            Enter the number of points to see the job total.
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-white">
          The consumer unit is always priced separately — typically £450 to £850 supply-and-fit for
          domestic, and its replacement requires an Electrical Installation Certificate under
          Reg 644.1.
        </p>
      </div>
    </div>
  );
}
