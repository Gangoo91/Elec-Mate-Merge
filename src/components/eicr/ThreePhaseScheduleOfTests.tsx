import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TestResult } from '@/types/testResult';
import {
  calculatePhaseBalance,
  calculateNeutralCurrent,
  detectThreePhaseGroups,
  suggestRebalance,
  PhaseLoadData,
  PhaseBalanceBand,
  RebalanceCircuit,
  ThreePhaseCircuitGroup,
} from '@/utils/threePhaseCalculations';
import { useOrientation } from '@/hooks/useOrientation';
import { isDeviceRow } from '@/utils/circuitNumbering';

// Recipe class constants — chrome styling only.
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

// Dark table-cell input — matches the EnhancedValidatedInput idiom used by the
// shared board tables (transparent bg, volt focus border, no ring).
const cellInputCn =
  'h-8 w-full rounded border border-transparent bg-transparent px-2 text-sm text-center text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:bg-white/[0.04] focus:border-elec-yellow focus:bg-transparent focus:outline-none focus:ring-0 focus:shadow-none touch-manipulation';

// Neutral chip (way / rating markers)
const chipCn =
  'inline-flex items-center rounded-md border border-white/[0.12] bg-white/[0.06] px-1.5 py-0.5 text-xs font-semibold text-white';

// ---------------------------------------------------------------------------
// Band presentation. Imbalance bands are guidance only (≤5% balanced ·
// 5–15% review · >15% high) — BS 7671 sets no numeric imbalance limit, so
// none of this wording claims compliance.
// ---------------------------------------------------------------------------

const bandWord: Record<PhaseBalanceBand, string> = {
  balanced: 'Balanced',
  review: 'Review',
  high: 'High',
};

const bandText: Record<PhaseBalanceBand, string> = {
  balanced: 'text-green-400',
  review: 'text-amber-300',
  high: 'text-red-400',
};

const bandBorder: Record<PhaseBalanceBand, string> = {
  balanced: 'border-green-500/30',
  review: 'border-amber-500/30',
  high: 'border-red-500/30',
};

// Solid chips — no translucent washes.
const bandChip: Record<PhaseBalanceBand, string> = {
  balanced: 'bg-green-600 text-white',
  review: 'bg-amber-500 text-black',
  high: 'bg-red-600 text-white',
};

const bandTooltip: Record<PhaseBalanceBand, string> = {
  balanced: 'Balanced — within 5% of the phase average',
  review: 'Review — 5–15% max deviation from average (guidance)',
  high: 'High — over 15% max deviation from average (guidance)',
};

// Recognised UK phase colours (R/Y/B for L1/L2/L3). Identity is never
// colour-alone: every bar carries its phase label and value.
const phaseBarCn: Record<'L1' | 'L2' | 'L3', string> = {
  L1: 'bg-red-500',
  L2: 'bg-elec-yellow',
  L3: 'bg-blue-500',
};

const formatAmps = (value: number): string =>
  (Math.round(value * 10) / 10).toString();

/** "16A" when the rating parses to a positive number, "—" otherwise — never "0A" or a bare "A". */
const formatRating = (rating: string | number | null | undefined): string => {
  const parsed = typeof rating === 'number' ? rating : parseFloat(rating || '');
  return Number.isFinite(parsed) && parsed > 0 ? `${formatAmps(parsed)}A` : '—';
};

/** Way-span caption: "Way 7" · contiguous "Ways 7–9" · scattered "Ways 7, 8, 12". */
const formatWaySpan = (positions: number[]): string => {
  const ways = [...new Set(positions)].sort((a, b) => a - b);
  if (ways.length === 0) return '';
  if (ways.length === 1) return `Way ${ways[0]}`;
  const contiguous = ways.every((w, idx) => idx === 0 || w === ways[idx - 1] + 1);
  return contiguous ? `Ways ${ways[0]}–${ways[ways.length - 1]}` : `Ways ${ways.join(', ')}`;
};

/** Board way for a row — "7.2" (3P sibling) and "7" both resolve to way 7. */
const wayOfRow = (r: TestResult): number => parseInt(r.circuitNumber || '0') || 0;

/**
 * Phase letter for an expanded 3P sibling row: explicit assignment first,
 * then the scanner's ".1/.2/.3" suffix convention (L1/L2/L3).
 */
const phaseOfRow = (r: TestResult): 'L1' | 'L2' | 'L3' | null => {
  const explicit = r.phaseAssignment;
  if (explicit === 'L1' || explicit === 'L2' || explicit === 'L3') return explicit;
  const suffix = (r.circuitNumber || '').split('.')[1];
  if (suffix === '1') return 'L1';
  if (suffix === '2') return 'L2';
  if (suffix === '3') return 'L3';
  return null;
};

/** Mirrors the totals loop: explicit phase assignment, else round-robin. */
const effectivePhase = (r: TestResult): 'L1' | 'L2' | 'L3' => {
  const explicit = r.phaseAssignment;
  if (explicit === 'L1' || explicit === 'L2' || explicit === 'L3') return explicit;
  const circuitNum = parseInt(r.circuitNumber || '0');
  const phaseIndex = (circuitNum - 1) % 3;
  if (phaseIndex === 0) return 'L1';
  if (phaseIndex === 1) return 'L2';
  return 'L3';
};

interface ThreePhaseScheduleOfTestsProps {
  /** All test results from the schedule */
  testResults: TestResult[];
  /** Callback when a test result is updated */
  onUpdateResult: (id: string, field: keyof TestResult, value: string) => void;
  /** Show in compact mode */
  compact?: boolean;
  /** Enable auto-detection of three-phase groups */
  autoDetect?: boolean;
}

/**
 * Enhanced Schedule of Tests view for three-phase installations
 * Groups 3-pole MCBs together and calculates phase balance
 */
export const ThreePhaseScheduleOfTests: React.FC<ThreePhaseScheduleOfTestsProps> = ({
  testResults,
  onUpdateResult,
  compact = false,
  autoDetect = true,
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [showChart, setShowChart] = useState(true);
  const [editingCircuit, setEditingCircuit] = useState<TestResult | null>(null);
  const orientation = useOrientation();

  // Mobile view when in portrait mode on mobile device
  const useMobileView = orientation.isMobile && !orientation.isLandscape;

  // Detect three-phase circuit groups
  const threePhaseGroups = useMemo(() => {
    if (!autoDetect) return [];

    // Convert TestResults to format expected by detectThreePhaseGroups
    // Device rows are excluded: their number is a dash, so the `idx + 1`
    // fallback would invent a position that collides with a real way and
    // could fabricate a three-pole group. Index is taken from the original
    // array so the remaining fallbacks are unaffected.
    const circuits = testResults
      .map((r, idx) =>
        isDeviceRow(r)
          ? null
          : {
              position: parseInt(r.circuitNumber || String(idx + 1)) || idx + 1,
              rating: r.protectiveDeviceRating ? parseInt(r.protectiveDeviceRating) : null,
              device: r.protectiveDeviceType || '',
              label: r.circuitDescription || r.circuitDesignation || '',
              phase: r.phaseType as '1P' | '3P' | undefined,
            }
      )
      .filter((c): c is NonNullable<typeof c> => c !== null);

    return detectThreePhaseGroups(circuits);
  }, [testResults, autoDetect]);

  // Separate single-phase and three-phase circuits
  const { singlePhaseCircuits, threePhaseCircuits } = useMemo(() => {
    const threePhasePositions = new Set(threePhaseGroups.flatMap((g) => g.positions));

    const single: TestResult[] = [];
    const threep: TestResult[] = [];

    testResults.forEach((r) => {
      const pos = wayOfRow(r);
      if (r.phaseType === '3P' || threePhasePositions.has(pos)) {
        threep.push(r);
      } else {
        single.push(r);
      }
    });

    return { singlePhaseCircuits: single, threePhaseCircuits: threep };
  }, [testResults, threePhaseGroups]);

  // Calculate total phase loads from all circuits
  const totalPhaseLoads = useMemo((): PhaseLoadData => {
    let L1 = 0,
      L2 = 0,
      L3 = 0;

    testResults.forEach((r) => {
      // A device row (incoming RCD, SPD, main switch) carries a rating but is
      // not a load — an 80 A incoming RCD is not 40 A hanging off a phase.
      // Its number is a dash, so it would also fall through effectivePhase's
      // NaN path and land on L3. See ELE-1484.
      if (isDeviceRow(r)) return;

      if (r.phaseType === '3P') {
        L1 += parseFloat(r.phaseBalanceL1 || '0') || 0;
        L2 += parseFloat(r.phaseBalanceL2 || '0') || 0;
        L3 += parseFloat(r.phaseBalanceL3 || '0') || 0;
        return;
      }

      const load = parseFloat(r.protectiveDeviceRating || '0') || 0;
      const estLoad = load * 0.5; // 50% loading assumption

      // Prefer the explicit phase assignment from the scanner / designer.
      // Fall back to round-robin only when no assignment is present (fresh
      // hand-built schedules without scanner data).
      const phase = effectivePhase(r);
      if (phase === 'L1') L1 += estLoad;
      else if (phase === 'L2') L2 += estLoad;
      else L3 += estLoad;
    });

    return { L1, L2, L3 };
  }, [testResults]);

  // Calculate overall balance
  const overallBalance = useMemo(() => {
    if (totalPhaseLoads.L1 === 0 && totalPhaseLoads.L2 === 0 && totalPhaseLoads.L3 === 0) {
      return null;
    }
    return calculatePhaseBalance(totalPhaseLoads);
  }, [totalPhaseLoads]);

  const neutralCurrent = useMemo(() => {
    if (totalPhaseLoads.L1 === 0 && totalPhaseLoads.L2 === 0 && totalPhaseLoads.L3 === 0) {
      return null;
    }
    return calculateNeutralCurrent(totalPhaseLoads);
  }, [totalPhaseLoads]);

  // Rebalancing suggestion — which single-phase circuits to move between
  // phases. Uses the same basis as the totals above (device rating × 50%),
  // with three-phase loads and grouped ways held fixed.
  const rebalance = useMemo(() => {
    if (!overallBalance || overallBalance.band === 'balanced') return null;

    const groupPositions = new Set(threePhaseGroups.flatMap((g) => g.positions));
    const movable: RebalanceCircuit[] = [];
    const baseLoads: PhaseLoadData = { L1: 0, L2: 0, L3: 0 };

    testResults.forEach((r) => {
      if (isDeviceRow(r)) return; // not a load — mirrors the totals loop above

      if (r.phaseType === '3P') {
        baseLoads.L1 += parseFloat(r.phaseBalanceL1 || '0') || 0;
        baseLoads.L2 += parseFloat(r.phaseBalanceL2 || '0') || 0;
        baseLoads.L3 += parseFloat(r.phaseBalanceL3 || '0') || 0;
        return;
      }

      const rating = parseFloat(r.protectiveDeviceRating || '0') || 0;
      const phase = effectivePhase(r);
      const pos = parseInt(r.circuitNumber || '0');

      // Ways inside a detected 3-pole group can't be re-phased individually —
      // keep their load fixed on the phase the totals already assign them.
      if (rating <= 0 || groupPositions.has(pos)) {
        baseLoads[phase] += rating * 0.5;
        return;
      }

      movable.push({
        way: r.circuitNumber || '?',
        label: r.circuitDescription || r.circuitDesignation || `Way ${r.circuitNumber || '?'}`,
        rating,
        phase,
      });
    });

    return suggestRebalance(movable, { loadFactor: 0.5, baseLoads });
  }, [testResults, threePhaseGroups, overallBalance]);

  // Toggle group expansion
  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  // Check if installation is three-phase
  const isThreePhaseInstallation = threePhaseCircuits.length > 0 || threePhaseGroups.length > 0;

  if (!isThreePhaseInstallation) {
    return (
      <div className={cn(cardCn, 'text-center')}>
        <p className="text-sm font-medium text-white">No three-phase circuits detected</p>
        <p className="!mt-1 text-[12px] text-white/80">
          Mark circuits as "3P" to enable three-phase analysis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Phase balance overview */}
      <div className={cardCn}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">
              Three-phase installation analysis
            </h2>
            <p className="mt-0.5 text-[12px] text-white/80">
              Estimated from device ratings — not measured load
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowChart(!showChart)}
            className="h-11 shrink-0 px-2 text-[13px] font-semibold text-elec-yellow transition-colors hover:text-elec-yellow/80 touch-manipulation"
          >
            {showChart ? 'Hide chart' : 'Show chart'}
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Total 3P circuits" value={threePhaseCircuits.length} />
          <StatCard label="3-pole groups" value={threePhaseGroups.length} />
          <StatCard
            label="Est. neutral"
            value={neutralCurrent ? `${neutralCurrent.estimatedAmps}A` : '—'}
          />
          <StatCard
            label="Balance status"
            value={overallBalance ? bandWord[overallBalance.band] : '—'}
            valueClassName={overallBalance ? bandText[overallBalance.band] : undefined}
          />
        </div>

        {overallBalance && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-white">Overall imbalance</span>
            <span
              className={cn(
                'inline-flex h-6 items-center rounded-full px-2.5 text-[13px] font-semibold tabular-nums',
                bandChip[overallBalance.band]
              )}
            >
              {overallBalance.imbalancePercent}%
            </span>
            <span className="text-[12px] text-white/80">max deviation from average</span>
          </div>
        )}

        {/* Phase load chart */}
        {showChart && <PhaseLoadChart loads={totalPhaseLoads} />}

        {/* Guidance — single block, band-coloured border */}
        {overallBalance && (
          <div
            className={cn(
              'space-y-3 rounded-xl border bg-white/[0.05] p-4',
              bandBorder[overallBalance.band]
            )}
          >
            {overallBalance.band === 'balanced' ? (
              <p className="text-sm text-white">
                Phases are well balanced (within 5% of the average) — no redistribution needed.
                Balanced loading keeps neutral current and voltage imbalance low.
              </p>
            ) : (
              <>
                <p className="text-sm text-white">
                  Uneven phase loading raises neutral current and voltage imbalance — guidance,
                  not a BS 7671 limit.
                </p>

                <div className="border-t border-white/[0.1] pt-3">
                  <h3 className="text-sm font-semibold text-white">What to do</h3>
                  {rebalance && rebalance.moves.length > 0 ? (
                    <>
                      <ol className="mt-2 space-y-2">
                        {rebalance.moves.map((move, index) => (
                          <li
                            key={`${move.way}-${move.from}-${move.to}`}
                            className="flex items-start gap-2.5 text-sm text-white"
                          >
                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/[0.2] text-[11px] font-semibold tabular-nums text-white">
                              {index + 1}
                            </span>
                            <span>
                              Move Way {move.way} — {move.label} ({move.rating}A) from{' '}
                              <span className="font-semibold">{move.from}</span> →{' '}
                              <span className="font-semibold">{move.to}</span>
                            </span>
                          </li>
                        ))}
                      </ol>
                      <p className="mt-3 text-sm font-medium text-white">
                        Projected after moves:{' '}
                        <span className="tabular-nums">
                          {rebalance.projectedImbalancePercent}%
                        </span>{' '}
                        imbalance · ~
                        <span className="tabular-nums">{rebalance.projectedNeutralAmps}A</span>{' '}
                        neutral
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 text-sm text-white">
                      The imbalance comes from three-phase groups or fixed loads that cannot be
                      re-phased individually — verify the true loading with clamp measurements
                      before redistributing.
                    </p>
                  )}
                </div>

                {neutralCurrent?.warning && (
                  <p className="text-[12px] text-white/80">{neutralCurrent.warning}</p>
                )}

                <p className="border-t border-white/[0.1] pt-3 text-[12px] text-white/80">
                  Confirm moves are practical before rewiring — clamp readings beat estimates
                  from device ratings.
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Three-phase circuit groups */}
      {threePhaseGroups.length > 0 && (
        <div className={cardCn}>
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Detected 3-pole MCB groups
          </h2>
          <div className="space-y-2">
            {threePhaseGroups.map((group) => (
              <ThreePhaseGroupRow
                key={group.id}
                group={group}
                circuits={testResults
                  .filter((r) => group.positions.includes(wayOfRow(r)))
                  .sort(
                    (a, b) =>
                      (parseFloat(a.circuitNumber || '0') || 0) -
                      (parseFloat(b.circuitNumber || '0') || 0)
                  )}
                isExpanded={expandedGroups.has(group.id)}
                onToggle={() => toggleGroup(group.id)}
                onUpdateResult={onUpdateResult}
              />
            ))}
          </div>
        </div>
      )}

      {/* Individual three-phase circuits — mobile card view or desktop table */}
      {threePhaseCircuits.length > 0 && (
        <div className={cardCn}>
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Three-phase circuit test results
          </h2>
          {useMobileView ? (
            /* Mobile card view */
            <div className="space-y-3">
              {threePhaseCircuits.map((circuit) => (
                <MobileThreePhaseCard
                  key={circuit.id}
                  circuit={circuit}
                  onEdit={() => setEditingCircuit(circuit)}
                />
              ))}
            </div>
          ) : (
            /* Desktop table view */
            <div className="sot-table-wrapper overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="sot-header-labels border-0 hover:bg-transparent">
                    <TableHead className="sot-header-cell w-16">Way</TableHead>
                    <TableHead className="sot-header-cell !text-left">Description</TableHead>
                    <TableHead className="sot-header-cell w-20">Rating</TableHead>
                    <TableHead className="sot-header-cell w-24">L1 (A)</TableHead>
                    <TableHead className="sot-header-cell w-24">L2 (A)</TableHead>
                    <TableHead className="sot-header-cell w-24">L3 (A)</TableHead>
                    <TableHead className="sot-header-cell w-28">Balance</TableHead>
                    <TableHead className="sot-header-cell w-24">Rotation</TableHead>
                    <TableHead className="sot-header-cell w-24">Zs (Ω)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {threePhaseCircuits.map((circuit) => (
                    <ThreePhaseCircuitRow
                      key={circuit.id}
                      circuit={circuit}
                      onUpdate={onUpdateResult}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}

      {/* Mobile edit bottom sheet */}
      <MobileEditDrawer
        circuit={editingCircuit}
        onClose={() => setEditingCircuit(null)}
        onUpdate={onUpdateResult}
      />
    </div>
  );
};

/**
 * Stat tile for overview section — neutral surface, white type
 */
const StatCard: React.FC<{
  label: string;
  value: string | number;
  valueClassName?: string;
}> = ({ label, value, valueClassName }) => (
  <div className="rounded-xl border border-white/[0.12] bg-white/[0.06] p-3">
    <p className="text-[12px] font-medium text-white">{label}</p>
    <p className={cn('mt-0.5 text-lg font-semibold tabular-nums text-white', valueClassName)}>
      {value}
    </p>
  </div>
);

/**
 * Full-width phase load chart — custom divs, no chart library.
 * Bars carry the recognised R/Y/B phase colours with direct labels (value on
 * the bar, phase + deviation caption below), plus a dashed average line.
 */
const PhaseLoadChart: React.FC<{ loads: PhaseLoadData }> = ({ loads }) => {
  const phases = ['L1', 'L2', 'L3'] as const;
  const average = (loads.L1 + loads.L2 + loads.L3) / 3;
  const maxValue = Math.max(loads.L1, loads.L2, loads.L3, 1);
  // Headroom above the tallest bar so its value label never clips
  const scale = maxValue * 1.15;
  const averagePct = (average / scale) * 100;

  return (
    // Centred cluster — full-width justify-around scattered the three bars
    // with dead space between them and let the average label collide with
    // L3's value (Andrew). Fixed bar widths + consistent gaps compose it.
    <div className="mx-auto w-full max-w-md">
      <div className="relative h-44 w-full">
        {/* Dashed average line — label sits ON the line as a chip so it can
            never collide with a bar's value label */}
        <div
          className="pointer-events-none absolute inset-x-0 z-10"
          style={{ bottom: `${averagePct}%` }}
        >
          <div className="border-t border-dashed border-white/50" />
          <span className="absolute right-0 top-0 -translate-y-1/2 rounded bg-[hsl(0_0%_10%)] px-1.5 py-0.5 text-[10.5px] font-medium tabular-nums text-white">
            avg {formatAmps(average)}A
          </span>
        </div>

        {/* Bars */}
        <div className="flex h-full items-end justify-center gap-8 sm:gap-12">
          {phases.map((phase) => {
            const value = loads[phase];
            const heightPct = (value / scale) * 100;
            return (
              <div
                key={phase}
                className="flex h-full w-16 flex-col items-center justify-end sm:w-20"
              >
                <span className="mb-1 text-sm font-semibold tabular-nums text-white">
                  {formatAmps(value)}A
                </span>
                <div
                  className={cn('w-full rounded-t', phaseBarCn[phase])}
                  style={{ height: `${Math.max(heightPct, 1)}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Baseline + per-phase captions */}
      <div className="flex justify-center gap-8 border-t border-white/[0.2] pt-2 sm:gap-12">
        {phases.map((phase) => {
          const value = loads[phase];
          const deviationPct = average > 0 ? ((value - average) / average) * 100 : 0;
          const sign = deviationPct >= 0 ? '+' : '-';
          return (
            <div key={phase} className="w-16 text-center sm:w-20">
              <p className="text-[12px] font-semibold text-white">{phase}</p>
              <p className="text-[11px] tabular-nums text-white/80">
                {sign}
                {Math.abs(deviationPct).toFixed(0)}% vs avg
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Expandable row for 3-pole MCB groups
 */
const ThreePhaseGroupRow: React.FC<{
  group: ThreePhaseCircuitGroup;
  circuits: TestResult[];
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateResult: (id: string, field: keyof TestResult, value: string) => void;
}> = ({ group, circuits, isExpanded, onToggle, onUpdateResult }) => {
  // Calculate group phase balance
  const groupLoads = useMemo((): PhaseLoadData => {
    let L1 = 0,
      L2 = 0,
      L3 = 0;
    circuits.forEach((c) => {
      L1 += parseFloat(c.phaseBalanceL1 || '0') || 0;
      L2 += parseFloat(c.phaseBalanceL2 || '0') || 0;
      L3 += parseFloat(c.phaseBalanceL3 || '0') || 0;
    });
    return { L1, L2, L3 };
  }, [circuits]);

  const hasLoads = groupLoads.L1 > 0 || groupLoads.L2 > 0 || groupLoads.L3 > 0;
  const groupBalance = hasLoads ? calculatePhaseBalance(groupLoads) : null;
  const groupNeutral = hasLoads ? calculateNeutralCurrent(groupLoads) : null;

  const hasRating = group.rating !== null && group.rating > 0;

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03]">
      {/* Group header — chevron-expand idiom */}
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[44px] w-full items-center justify-between gap-3 p-3 text-left transition-colors hover:bg-white/[0.04] touch-manipulation"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-white" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0 text-white" />
          )}
          <span className={chipCn}>3P</span>
          <div className="min-w-0">
            <span className="block truncate text-sm font-medium text-white">{group.label}</span>
            <span className="block font-mono text-[11px] tabular-nums text-white/80">
              {formatWaySpan(group.positions)}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {hasRating && <span className={chipCn}>{group.rating}A</span>}
          {groupBalance && (
            <span
              className={cn(
                'text-sm font-semibold tabular-nums',
                bandText[groupBalance.band]
              )}
            >
              {groupBalance.imbalancePercent}%
            </span>
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-white/[0.1] p-3">
          <div className="mb-3 grid gap-2 sm:grid-cols-3">
            {circuits.map((circuit, idx) => (
              <div
                key={circuit.id}
                className="rounded-lg border border-white/[0.1] bg-white/[0.05] p-2"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className={chipCn}>{phaseOfRow(circuit) || group.phases[idx]}</span>
                  <span className="font-mono text-sm tabular-nums text-white">
                    Way {wayOfRow(circuit) || circuit.circuitNumber}
                  </span>
                </div>
                <p className="truncate text-[12px] text-white/80">
                  {circuit.circuitDescription || 'No description'}
                </p>
              </div>
            ))}
          </div>

          {groupBalance && (
            <div
              className={cn(
                'space-y-1 rounded-lg border bg-white/[0.05] p-3',
                bandBorder[groupBalance.band]
              )}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-white">Group balance</span>
                <span
                  className={cn('font-semibold tabular-nums', bandText[groupBalance.band])}
                >
                  {groupBalance.imbalancePercent}% · {bandWord[groupBalance.band]}
                </span>
              </div>
              <p className="text-[12px] text-white/80">
                Max deviation from average
                {groupNeutral ? ` · est. neutral ${groupNeutral.estimatedAmps}A` : ''}
              </p>
              {groupBalance.recommendation && (
                <p className="text-[12px] text-white/80">{groupBalance.recommendation}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Individual three-phase circuit row
 */
const ThreePhaseCircuitRow: React.FC<{
  circuit: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}> = ({ circuit, onUpdate }) => {
  const loads: PhaseLoadData = {
    L1: parseFloat(circuit.phaseBalanceL1 || '0') || 0,
    L2: parseFloat(circuit.phaseBalanceL2 || '0') || 0,
    L3: parseFloat(circuit.phaseBalanceL3 || '0') || 0,
  };

  const hasLoads = loads.L1 > 0 || loads.L2 > 0 || loads.L3 > 0;
  const balance = hasLoads ? calculatePhaseBalance(loads) : null;

  const way = wayOfRow(circuit);
  const phase = phaseOfRow(circuit);

  return (
    <TableRow className="sot-row border-0">
      {/* Stacked lead cell: way number over phase letter */}
      <TableCell className="px-2 py-1.5 text-center align-middle">
        <span className="block text-sm font-semibold tabular-nums text-white">
          {way || circuit.circuitNumber || '—'}
        </span>
        {phase && (
          <span className="block text-[10px] font-medium tracking-wide text-white/80">
            {phase}
          </span>
        )}
      </TableCell>
      <TableCell className="max-w-[200px] truncate px-2 py-1 text-sm text-white">
        {circuit.circuitDescription || '—'}
      </TableCell>
      <TableCell className="px-2 py-1 text-center text-sm tabular-nums text-white">
        {formatRating(circuit.protectiveDeviceRating)}
      </TableCell>
      <TableCell className="p-0.5 align-middle">
        <input
          type="text"
          inputMode="decimal"
          value={circuit.phaseBalanceL1 || ''}
          onChange={(e) => onUpdate(circuit.id, 'phaseBalanceL1', e.target.value)}
          className={cellInputCn}
          placeholder="—"
        />
      </TableCell>
      <TableCell className="p-0.5 align-middle">
        <input
          type="text"
          inputMode="decimal"
          value={circuit.phaseBalanceL2 || ''}
          onChange={(e) => onUpdate(circuit.id, 'phaseBalanceL2', e.target.value)}
          className={cellInputCn}
          placeholder="—"
        />
      </TableCell>
      <TableCell className="p-0.5 align-middle">
        <input
          type="text"
          inputMode="decimal"
          value={circuit.phaseBalanceL3 || ''}
          onChange={(e) => onUpdate(circuit.id, 'phaseBalanceL3', e.target.value)}
          className={cellInputCn}
          placeholder="—"
        />
      </TableCell>
      <TableCell className="px-2 py-1 text-center">
        {balance ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    'cursor-help text-sm font-semibold tabular-nums',
                    bandText[balance.band]
                  )}
                >
                  {balance.imbalancePercent}%
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{bandTooltip[balance.band]}</p>
                {balance.recommendation && (
                  <p className="mt-1 text-xs text-amber-300">{balance.recommendation}</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="text-sm text-white/80">—</span>
        )}
      </TableCell>
      <TableCell className="px-2 py-1 text-center text-sm text-white">
        {circuit.phaseRotation || '—'}
      </TableCell>
      <TableCell className="px-2 py-1 text-center text-sm tabular-nums text-white">
        {circuit.zs || '—'}
      </TableCell>
    </TableRow>
  );
};

/**
 * Mobile-optimized card for three-phase circuits
 * Touch-friendly with large tap targets
 */
const MobileThreePhaseCard: React.FC<{
  circuit: TestResult;
  onEdit: () => void;
}> = ({ circuit, onEdit }) => {
  const loads: PhaseLoadData = {
    L1: parseFloat(circuit.phaseBalanceL1 || '0') || 0,
    L2: parseFloat(circuit.phaseBalanceL2 || '0') || 0,
    L3: parseFloat(circuit.phaseBalanceL3 || '0') || 0,
  };

  const hasLoads = loads.L1 > 0 || loads.L2 > 0 || loads.L3 > 0;
  const balance = hasLoads ? calculatePhaseBalance(loads) : null;

  return (
    <button
      type="button"
      onClick={onEdit}
      className="w-full rounded-xl border border-white/[0.12] bg-white/[0.05] p-4 text-left transition-transform active:scale-[0.98] touch-manipulation"
    >
      {/* Header row */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className={chipCn}>{circuit.circuitDesignation || circuit.circuitNumber}</span>
          <span className="max-w-[150px] truncate text-sm font-medium text-white">
            {circuit.circuitDescription || 'Three-phase circuit'}
          </span>
        </div>
        <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">Edit</span>
      </div>

      {/* Phase values row — "—" when no reading entered, never "0A" */}
      <div className="mb-3 grid grid-cols-3 gap-2">
        {(['L1', 'L2', 'L3'] as const).map((phase) => (
          <div
            key={phase}
            className="rounded-lg border border-white/[0.1] bg-white/[0.05] p-2 text-center"
          >
            <p className="text-[12px] font-medium text-white">{phase}</p>
            <p className="text-lg font-semibold tabular-nums text-white">
              {loads[phase] > 0 ? `${formatAmps(loads[phase])}A` : '—'}
            </p>
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-white/80">Rating:</span>
          <span className="font-medium tabular-nums text-white">
            {formatRating(circuit.protectiveDeviceRating)}
          </span>
        </div>
        {balance && (
          <span
            className={cn('text-sm font-semibold tabular-nums', bandText[balance.band])}
          >
            {balance.imbalancePercent}%
          </span>
        )}
      </div>
    </button>
  );
};

/**
 * Mobile bottom sheet drawer for editing circuit values
 * Touch-friendly with large inputs
 */
const MobileEditDrawer: React.FC<{
  circuit: TestResult | null;
  onClose: () => void;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}> = ({ circuit, onClose, onUpdate }) => {
  const [localValues, setLocalValues] = useState({
    phaseBalanceL1: '',
    phaseBalanceL2: '',
    phaseBalanceL3: '',
    phaseRotation: '',
    lineToLineVoltage: '',
  });

  // Sync local values when circuit changes
  React.useEffect(() => {
    if (circuit) {
      setLocalValues({
        phaseBalanceL1: circuit.phaseBalanceL1 || '',
        phaseBalanceL2: circuit.phaseBalanceL2 || '',
        phaseBalanceL3: circuit.phaseBalanceL3 || '',
        phaseRotation: circuit.phaseRotation || '',
        lineToLineVoltage: circuit.lineToLineVoltage || '',
      });
    }
  }, [circuit]);

  const handleSave = () => {
    if (!circuit) return;
    Object.entries(localValues).forEach(([field, value]) => {
      onUpdate(circuit.id, field as keyof TestResult, value);
    });
    onClose();
  };

  const loads: PhaseLoadData = {
    L1: parseFloat(localValues.phaseBalanceL1 || '0') || 0,
    L2: parseFloat(localValues.phaseBalanceL2 || '0') || 0,
    L3: parseFloat(localValues.phaseBalanceL3 || '0') || 0,
  };

  const hasLoads = loads.L1 > 0 || loads.L2 > 0 || loads.L3 > 0;
  const balance = hasLoads ? calculatePhaseBalance(loads) : null;

  return (
    <Drawer open={!!circuit} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-white/[0.1]">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-base font-semibold text-white">
              {circuit?.circuitDesignation || 'Edit circuit'}
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/[0.06] touch-manipulation"
              >
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </div>
          {circuit?.circuitDescription && (
            <p className="text-sm text-white/80">{circuit.circuitDescription}</p>
          )}
        </DrawerHeader>

        <div className="space-y-4 overflow-y-auto p-4">
          {/* Phase load inputs */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Phase loads (A)</h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCn}>L1</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={localValues.phaseBalanceL1}
                  onChange={(e) =>
                    setLocalValues((prev) => ({ ...prev, phaseBalanceL1: e.target.value }))
                  }
                  placeholder="0"
                  className={cn(inputCn, 'text-center')}
                />
              </div>
              <div>
                <label className={labelCn}>L2</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={localValues.phaseBalanceL2}
                  onChange={(e) =>
                    setLocalValues((prev) => ({ ...prev, phaseBalanceL2: e.target.value }))
                  }
                  placeholder="0"
                  className={cn(inputCn, 'text-center')}
                />
              </div>
              <div>
                <label className={labelCn}>L3</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={localValues.phaseBalanceL3}
                  onChange={(e) =>
                    setLocalValues((prev) => ({ ...prev, phaseBalanceL3: e.target.value }))
                  }
                  placeholder="0"
                  className={cn(inputCn, 'text-center')}
                />
              </div>
            </div>
          </div>

          {/* Live balance indicator */}
          {balance && (
            <div
              className={cn('rounded-xl border bg-white/[0.05] p-3', bandBorder[balance.band])}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Phase balance</span>
                <span
                  className={cn('font-semibold tabular-nums', bandText[balance.band])}
                >
                  {balance.imbalancePercent}% · {bandWord[balance.band]}
                </span>
              </div>
              {balance.recommendation && (
                <p className="mt-1 text-[12px] text-white/80">{balance.recommendation}</p>
              )}
            </div>
          )}

          {/* Phase rotation */}
          <div>
            <label className={labelCn}>Phase rotation</label>
            <div className="grid grid-cols-2 gap-2">
              {['✓', '✗', 'L1-L2-L3', 'N/A'].map((option) => {
                const selected = localValues.phaseRotation === option;
                const selectedCn =
                  option === '✓'
                    ? 'bg-green-500 border-green-500 text-black font-semibold'
                    : option === '✗'
                      ? 'bg-red-500 border-red-500 text-white font-semibold'
                      : 'bg-elec-yellow border-elec-yellow text-black font-semibold';
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLocalValues((prev) => ({ ...prev, phaseRotation: option }))}
                    className={cn(
                      'h-12 rounded-lg border text-sm transition-colors touch-manipulation',
                      selected
                        ? selectedCn
                        : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
                    )}
                  >
                    {option === '✓' ? '✓ Correct' : option === '✗' ? '✗ Incorrect' : option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Line-to-line voltage */}
          <div>
            <label className={labelCn}>Line-to-line voltage</label>
            <div className="flex items-end gap-2">
              <Input
                type="number"
                inputMode="decimal"
                value={localValues.lineToLineVoltage}
                onChange={(e) =>
                  setLocalValues((prev) => ({ ...prev, lineToLineVoltage: e.target.value }))
                }
                placeholder="400"
                className={cn(inputCn, 'flex-1')}
              />
              <span className="pb-2.5 text-sm font-medium text-white/80">V</span>
            </div>
            <p className="mt-1 text-[12px] text-white/80">Nominal: 400V (360-440V acceptable)</p>
          </div>
        </div>

        {/* Save button */}
        <div className="border-t border-white/[0.1] p-4">
          <Button
            onClick={handleSave}
            className="h-12 w-full bg-elec-yellow text-base font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
          >
            Save changes
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ThreePhaseScheduleOfTests;
