/**
 * ReferenceMethodCapacityChecker — "what does the reference method do to my
 * cable's rating?" for /guides/reference-methods-cable-installation.
 *
 * WHY
 * That page pulls 6,824 impressions at 0.32% CTR. Its head queries are about
 * the methods themselves ("reference methods bs7671", "clipped direct"), but
 * the long tail is entirely current ratings — "1.5mm2 cable current rating",
 * "1.5 swa current carrying capacity", "1.5 mm wire current capacity". People
 * arrive at reference methods *because* they are chasing a capacity figure, so
 * the page should hand them the figure and show what the method changes.
 *
 * The teaching point, which is what a SERP snippet cannot convey: the method
 * matters more than most people expect. The same 2.5 mm² T&E is 27 A clipped
 * direct (Method C) and 17 A above an insulated ceiling (Method 101) — a 10 A
 * swing that decides whether a 20 A or 25 A device is safe on that circuit.
 * That gap is exactly the ELE-1504 failure mode: methods 100–103 defaulting to
 * Method C overstated capacity on the circuits most at risk of overheating.
 *
 * DATA — NEVER hardcode Iz here.
 * Every figure comes from `@/lib/calculators/bs7671-data/appendix4CurrentCapacity`,
 * transcribed page-by-page from BS 7671:2018+A4:2026 Appendix 4 and re-verified
 * cell by cell (ELE-1256 / ELE-1504). Reuse that dataset; do not copy values
 * into this file, and do not add a cable type it does not cover.
 */
import { useMemo, useRef, useState } from 'react';
import { trackSeoToolUsed } from '@/lib/analytics-events';
import {
  capacityTables,
  METHOD_LABELS,
  type CableTypeKey,
} from '@/lib/calculators/bs7671-data/appendix4CurrentCapacity';
import { AlertTriangle } from 'lucide-react';

/** The cable types worth offering on a public guide — the common site cases. */
const CABLE_CHOICES: Array<{ key: CableTypeKey; short: string }> = [
  { key: 'twin-earth', short: 'Twin & Earth' },
  { key: 'swa-pvc', short: 'SWA (PVC)' },
  { key: 'pvc-single', short: 'Singles (PVC)' },
  { key: 'xlpe-multicore', short: 'XLPE multicore' },
];

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:border-white/30';
const chip = (active: boolean) =>
  `flex min-h-11 items-center justify-center rounded-xl border px-2 text-center text-[13px] leading-tight transition-colors touch-manipulation ${
    active ? chipOn : chipOff
  }`;

/** Full label with an en-dash, e.g. "Method C — Clipped direct". */
function shortMethod(key: string): string {
  return (METHOD_LABELS[key] ?? key).split(' - ').join(' — ');
}

export default function ReferenceMethodCapacityChecker() {
  const [cable, setCable] = useState<CableTypeKey>('twin-earth');
  const [method, setMethod] = useState<string>('method-c');
  const [size, setSize] = useState<string>('2.5');
  const usedRef = useRef(false);

  const markUsed = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    trackSeoToolUsed({ tool: 'reference_method_capacity', page: window.location.pathname });
  };

  const table = capacityTables[cable];

  /** Methods this cable's table actually publishes — never offer a blank. */
  const methods = useMemo(() => Object.keys(table.methods), [table]);
  const activeMethod = methods.includes(method) ? method : methods[0];

  /** Single-phase column is the domestic case; fall back to whatever exists.
   *  Memoised because a bare `a ?? b ?? {}` yields a fresh object every render,
   *  which would defeat the memo on `sizes` below. */
  const series = useMemo(() => {
    const column = table.methods[activeMethod];
    return column?.singlePhase ?? column?.threePhase ?? {};
  }, [table, activeMethod]);
  const sizes = useMemo(() => Object.keys(series), [series]);
  const activeSize = sizes.includes(size) ? size : sizes[0];
  const iz = activeSize ? series[activeSize] : undefined;

  /** Clipped direct is the reference people carry in their head — show the gap. */
  const clipped =
    table.methods['method-c']?.singlePhase?.[activeSize] ??
    table.methods['method-c']?.threePhase?.[activeSize];
  const showsGap =
    typeof iz === 'number' && typeof clipped === 'number' && activeMethod !== 'method-c';
  const gapPct =
    showsGap && clipped ? Math.round(((clipped - (iz as number)) / clipped) * 100) : 0;

  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5 lg:p-6">
      <h3 className="text-[15px] font-semibold tracking-tight text-white lg:text-[17px]">
        What is this cable actually rated at?
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-white">
        The reference method changes the current-carrying capacity more than most people expect.
        Pick the install and see the figure from Appendix 4.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        <div className="space-y-4">
          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">Cable</legend>
            <div className="grid grid-cols-2 gap-2">
              {CABLE_CHOICES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={cable === c.key}
                  onClick={() => {
                    setCable(c.key);
                    markUsed();
                  }}
                  className={chip(cable === c.key)}
                >
                  {c.short}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">Reference method</legend>
            <div className="grid grid-cols-2 gap-2">
              {methods.map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={activeMethod === m}
                  onClick={() => {
                    setMethod(m);
                    markUsed();
                  }}
                  className={chip(activeMethod === m)}
                >
                  {(METHOD_LABELS[m] ?? m).split(' - ')[0]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-[12px] font-medium text-white">
              Conductor size (mm²)
            </legend>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={activeSize === s}
                  onClick={() => {
                    setSize(s);
                    markUsed();
                  }}
                  className={chip(activeSize === s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div role="status" aria-live="polite" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-white/[0.14] bg-white/[0.04] p-4 lg:p-5">
            <p className="text-[12px] font-medium uppercase tracking-wider text-white">
              Current-carrying capacity (Iz)
            </p>
            <p className="mt-1 text-4xl font-bold text-elec-yellow">
              {typeof iz === 'number' ? `${iz} A` : '—'}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white">
              {activeSize} mm² {table.label} · {shortMethod(activeMethod)}
            </p>

            {showsGap && gapPct > 0 && (
              <div className="mt-4 rounded-xl border border-orange-500/30 bg-orange-500/10 p-3">
                <p className="flex items-start gap-2 text-[13px] leading-relaxed text-white">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden />
                  <span>
                    That is <strong>{gapPct}% below</strong> the {clipped} A the same cable carries
                    clipped direct. Assume clipped direct here and you would oversize the protective
                    device against a cable that cannot carry it.
                  </span>
                </p>
              </div>
            )}

            <div className="mt-4 space-y-2 border-t border-white/[0.08] pt-3">
              <p className="text-[13px] leading-relaxed text-white">
                <span className="font-semibold text-elec-yellow">Source: </span>
                BS 7671:2018+A4:2026 Appendix 4, {table.sourceTable}.
              </p>
              {table.note ? (
                <p className="text-[13px] leading-relaxed text-white">{table.note}</p>
              ) : null}
              <p className="text-[13px] leading-relaxed text-white">
                This is the tabulated figure only. The capacity you can actually use is It × the
                correction factors that apply — ambient temperature (Ca), grouping (Cg), thermal
                insulation (Ci) and any BS 3036 rewireable fuse (Cc). Apply those before choosing a
                device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
