/**
 * Deterministic board layout recommender for the Circuit Designer results page.
 *
 * Phase 4a interim — runs purely on the AI's output (no extra backend round-trip).
 * Phase 4b will replace this with an LLM-rationalised recommender that retrieves
 * BS 7671 facets (314.1 dispersal, 537 isolation, 132.6 economy/safety) and
 * produces full per-board reasoning with reg cites.
 *
 * Heuristics applied here:
 *   - Hard cap of 12 ways per board (practical real-world board sizes top at ~18,
 *     but 12 leaves headroom for 25% spare ways per BS 7671 514.9.1 / Best Practice).
 *   - Group circuits by archetype so each board has coherent loading.
 *   - Recommend three-phase when diversified load exceeds single-phase service capacity
 *     (~23 kW @ 100A 230V) or any single circuit exceeds 63A.
 */

export interface SubmainFeed {
  parentBoardId: string;
  childBoardId: string;
  childBoardName: string;
  diversifiedLoadW: number;
  designCurrentA: number;
  // Phase configuration — TP+N (three-phase + neutral) or L+N (single-phase + neutral)
  feedPhases: 'three' | 'single';
  feedPhaseLabel: 'TP+N' | 'L+N';
  // For L+N feeds off a 3φ origin: which phase the L conductor lives on
  feedSourcePhase?: 'L1' | 'L2' | 'L3';
  // Protection at the parent board
  protectionType: 'MCB' | 'MCCB' | 'BS88';
  protectionRating: number;
  protectionCurve?: string;
  protectionKa: number;
  // Submain cable
  cableSize: number;
  cableType: string;
  cableLengthEstimateM: number;
  // Voltage drop verification
  voltageDropVolts: number;
  voltageDropPercent: number;
  voltageDropOk: boolean;
  cableSizingNote: string;
  rationale: string;
  /**
   * Earth-fault loop impedance contributed by this feed (Ω). Adds to the
   * parent board's Zdb to give the child board's Zdb. Computed from cable
   * loop resistance at 70°C × length, divided by parallel runs.
   */
  feedLoopOhms: number;
}

export interface SPDRecommendation {
  required: boolean;
  type: 'Type 1' | 'Type 2' | 'Type 1+2' | 'Type 3';
  rationale: string;
  reg: string;
}

export interface PhaseBalance {
  L1_W: number;
  L2_W: number;
  L3_W: number;
  imbalancePercent: number;
  flag?: 'balanced' | 'mild-imbalance' | 'severe-imbalance';
  // Per-circuit phase assignment so each way can be labelled L1/L2/L3/3φ on the schedule
  assignments: Record<number, 'L1' | 'L2' | 'L3' | 'L1L2L3'>;
}

export interface DiscriminationCheck {
  ok: boolean;
  ratio: number;
  parentRating: number;
  largestChildRating: number;
  note: string;
}

export interface BoardRecommendation {
  id: string;
  name: string;
  location: string;
  rationale: string;
  circuitIndices: number[];
  mainSwitchRating: number;
  rcdGrouping: 'split-load' | 'high-integrity' | 'rcbo-per-way';
  isOrigin: boolean;
  // Aggregates
  diversifiedLoadW: number;
  designCurrentA: number;
  /**
   * Earth-fault loop impedance at this board's busbar (Ω) — propagated from
   * the supply Ze through every upstream submain feed. Origin board: Zdb = Ze.
   * Submain: Zdb = parent.zdb + feedFromParent.feedLoopOhms.
   *
   * Final-circuit Zs = boardZdb + (R1 + R2 of the final-circuit cable). Without
   * propagating the chain, submain circuits report falsely low Zs values.
   */
  zdb: number;
  /**
   * Prospective fault current at this board's busbar (kA) = U₀ / Zdb.
   * Drives the breaking-capacity (Icn) selection for protective devices on
   * this board. Drops as you go further into the chain (longer feeds = higher
   * Zdb = lower PSCC), so submain devices can often be a smaller Icn than the
   * origin's.
   */
  psccKa: number;
  /**
   * Earthing conductor at this board (mm² Cu equivalent) per BS 7671
   * Table 54.7 / 543.1. For the origin this is the MAIN earthing conductor
   * (MET to means of earthing). For submains it's the cpc/armour returning
   * to the parent board's earth bar.
   */
  earthingConductorMm2: number;
  /**
   * Main protective bonding conductor (mm² Cu) per Table 54.8 / 544.1.1.
   * Only populated on the ORIGIN board — bonding lives at the MET, not at
   * submains. PME systems get the larger A2-onwards values.
   */
  mainBondingMm2?: number;
  // Designer outputs (full BS 7671 treatment)
  feedFromParent?: SubmainFeed;
  spd?: SPDRecommendation;
  phaseBalance?: PhaseBalance;
  discrimination?: DiscriminationCheck;
}

export interface CoherenceWarning {
  kind: 'multi-board' | 'three-phase' | 'high-current-circuit' | 'mixed-premises' | 'zs-corrected';
  severity: 'info' | 'warn';
  title: string;
  detail: string;
  reg?: string;
}

export interface BoardLayoutResult {
  boards: BoardRecommendation[];
  submainFeeds: SubmainFeed[];
  warnings: CoherenceWarning[];
  needsThreePhase: boolean;
  needsMultiBoard: boolean;
  totalCircuits: number;
  totalDiversifiedKW: number;
}

const MAX_WAYS_PER_BOARD = 18; // Wylex / MK / Hager 22-way is real-world max; 18 leaves spare ways

/**
 * Single-phase supply thresholds (W diversified).
 *
 * UK standard cut-out is 100 A @ 230 V = 23 kW. That's the SUPPLY ceiling,
 * not a "needs three-phase" trigger — most properties under 23 kW happily
 * stay single-phase. Going TO three-phase is one option above that ceiling;
 * upgrading the single-phase service to 125 A is another. Both are common.
 *
 * We deliberately separate three thresholds:
 *   NEAR_LIMIT  →  warn (approaching supply ceiling)
 *   AT_LIMIT    →  warn harder (DNO call for upgrade options)
 *   FORCE_3PH   →  auto-design as three-phase (single-phase impractical)
 *
 * Domestic bar is higher because measured After-Diversity Maximum Demand
 * (ADMD) for UK 4-bed all-electric homes with EV is typically 8–15 kW —
 * paper diversity always overstates. Commercial / industrial bar matches
 * the supply ceiling because those systems usually need 3φ anyway.
 */
const NEAR_SUPPLY_LIMIT_W = 20000; // ~87 A — domestic warning
const AT_SUPPLY_LIMIT_W = 23000; // 100 A — DNO upgrade conversation
const FORCE_3PH_DOMESTIC_W = 35000; // beyond reasonable 1φ even with 125 A
const FORCE_3PH_NON_DOMESTIC_W = 23000; // commercial/industrial flips at supply ceiling

/** Single circuit with Ib above this clearly needs three-phase. */
const FORCE_3PH_CIRCUIT_A = 100;

/**
 * A circuit with Ib above this is "hard-justified" for keeping its own board
 * even when the bucket would otherwise consolidate — high-current circuits
 * benefit from local isolation and their own protection. Lower than the
 * three-phase trigger because a 63A radial doesn't need 3φ but does deserve
 * its own submain in many layouts.
 */
const HIGH_CURRENT_THRESHOLD_A = 63;

// ── Consolidation thresholds ─────────────────────────────────────────────────
// A submain has to earn its existence — enclosure + main switch + SWA feed +
// glands + protection at parent costs ~£300+ in materials and ~half a day
// labour. Below MIN_SUBMAIN_WAYS the cost isn't justified vs running the
// circuits directly off the origin CU. Structural zones (geographic
// separation, regulatory difference, high-current) earn their existence at a
// lower bar because there's a *reason* beyond grouping.
const MIN_SUBMAIN_WAYS = 5;
const MIN_STRUCTURAL_SUBMAIN_WAYS = 2;
// Domestic ≤ this many circuits → force everything onto a single CU.
// A real 18-way 22-module CU handles 14 circuits with 4 spare ways. 90% of
// UK domestic jobs sit here.
const SINGLE_BOARD_DOMESTIC_THRESHOLD = 14;

// Zones that earn a separate submain even with few circuits — geographic
// separation, regulatory difference, or high-current isolation.
const STRUCTURAL_ZONE_IDS: Record<string, Set<string>> = {
  domestic: new Set(['outbuilding']),
  commercial: new Set(['medical', 'external', 'plant-room']),
  industrial: new Set(['process-a', 'process-b', 'external', 'plant']),
};

// Zone-based grouping (mirrors how electricians actually lay out boards in practice).
// Each zone holds *all* its circuits — lighting + sockets + heat + special — not split
// by archetype. Zones detected from naming patterns; Phase 4c (floor-plan vision) will
// replace this heuristic with explicit room/zone tags from the upload.

interface ZoneDefinition {
  id: string;
  name: string;
  location: string;
  pattern: RegExp;
  rationale: string;
}

const DOMESTIC_ZONES: ZoneDefinition[] = [
  {
    id: 'outbuilding',
    name: 'Outbuilding Submain',
    location: 'External / outbuilding',
    pattern: /\b(garage|outhouse|annex(e)?|granny|workshop|barn|shed|outbuilding|garden room|studio)\b/i,
    rationale:
      'Geographic separation — outbuilding gets a dedicated submain so an issue at the main does not isolate the outbuilding (and vice-versa). Submain typically runs underground SWA or buried Method E.',
  },
  {
    id: 'main',
    name: 'Main CU',
    location: 'Main dwelling',
    pattern: /.*/,
    rationale:
      'All dwelling circuits on a single board — typical UK domestic layout (split-load or RCBO-per-way). Lighting, sockets, kitchen, heating, EV all live together at the main.',
  },
];

const COMMERCIAL_ZONES: ZoneDefinition[] = [
  {
    id: 'plant-room',
    name: 'Plant Room CU',
    location: 'Plant room',
    pattern: /\b(plant|hvac|boiler|compressor|chiller|extraction|ventilation|aircon|air handling)\b/i,
    rationale:
      'Plant equipment grouped at the plant room — high-current motors and HVAC loads stay close to source, isolated from front-of-house tripping.',
  },
  {
    id: 'kitchen',
    name: 'Kitchen CU',
    location: 'Kitchen',
    pattern: /\b(kitchen|food|catering|cook|chef|prep|hob|oven|grill|fryer|refrigeration|fridge|freezer|chiller(?! room))\b/i,
    rationale:
      'Kitchen has heavy diversified loading (cookers, hobs, refrigeration, prep equipment) that benefits from local distribution. Reduces voltage drop on long socket runs and isolates kitchen tripping.',
  },
  {
    id: 'medical',
    name: 'Clinical / Medical CU',
    location: 'Clinical area',
    pattern: /\b(x-?ray|sterilis|laborator|lab equipment|operating|theatre|patient|ward|consult(ation)?|examination|treatment|surgery|dental|imaging|scanner)\b/i,
    rationale:
      'Clinical / medical equipment grouped per Section 710 considerations — Group 1/2 medical locations require dedicated supplies, IT systems where applicable, and integrated UPS provisions.',
  },
  {
    id: 'reception',
    name: 'Reception / Front of House CU',
    location: 'Reception area',
    pattern: /\b(reception|lobby|front|entrance|waiting|foyer|atrium|epos|till|cashier|sales)\b/i,
    rationale:
      'Front-of-house grouping — reception, waiting, sales counter circuits at one CU. Separate isolation so a back-of-house issue does not affect customer-facing operation.',
  },
  {
    id: 'office',
    name: 'Office / Admin CU',
    location: 'Office area',
    pattern: /\b(office|admin|workstation|desk|meeting|conference|breakout|boardroom)\b/i,
    rationale:
      'Office/admin areas grouped — typical mix of socket circuits, lighting, IT power. Decoupled from operational areas for continuity.',
  },
  {
    id: 'retail',
    name: 'Retail / Shop Floor CU',
    location: 'Shop floor',
    pattern: /\b(shop floor|display|aisle|shelving|gondola|cabinet display|signage|chilled display)\b/i,
    rationale:
      'Retail / shop floor grouped — display lighting, signage, refrigeration in one zone for proximity and isolated tripping.',
  },
  {
    id: 'staff',
    name: 'Staff Area CU',
    location: 'Staff facilities',
    pattern: /\b(staff|breakroom|locker|toilet|wc|wash|kitchenette|rest)\b/i,
    rationale:
      'Staff facilities grouped at one CU — kept distinct from operational/customer-facing circuits.',
  },
  {
    id: 'external',
    name: 'External Submain',
    location: 'External',
    pattern: /\b(external|outdoor|garden|car park|carpark|forecourt|driveway|external lighting|external signage|ev charger|fence)\b/i,
    rationale:
      'External circuits on a dedicated submain — protects outdoor circuits with local isolation and reduces voltage drop on long external runs.',
  },
  {
    id: 'storage',
    name: 'Storage CU',
    location: 'Storage / stockroom',
    pattern: /\b(storage|stockroom|warehouse|stores|stockroom|loading bay)\b/i,
    rationale:
      'Storage / stockroom grouped — typically lower-load lighting and basic sockets, isolated from operational areas.',
  },
  {
    id: 'main',
    name: 'Main CU',
    location: 'Origin',
    pattern: /.*/,
    rationale:
      'Origin consumer unit at the cut-out — circuits without a specific zone match land here as the main board feeding any submains.',
  },
];

const INDUSTRIAL_ZONES: ZoneDefinition[] = [
  {
    id: 'process-a',
    name: 'Process Line A CU',
    location: 'Production area A',
    pattern: /\b(line\s*a|production\s*line\s*a|process\s*a|conveyor\s*a|cell\s*a)\b/i,
    rationale:
      'Process line A grouped at a dedicated submain — production line isolation, fault-tolerance, and discrimination from other process areas.',
  },
  {
    id: 'process-b',
    name: 'Process Line B CU',
    location: 'Production area B',
    pattern: /\b(line\s*b|production\s*line\s*b|process\s*b|conveyor\s*b|cell\s*b)\b/i,
    rationale:
      'Process line B grouped at a dedicated submain — independent of line A so a fault on one line does not down both.',
  },
  {
    id: 'workshop',
    name: 'Workshop CU',
    location: 'Workshop',
    pattern: /\b(workshop|machine tool|machining|cnc|lathe|mill|drill|press|welding|welder|fabrication)\b/i,
    rationale:
      'Workshop circuits grouped — high-current machinery with starting transients on dedicated CU prevents nuisance tripping at the main.',
  },
  {
    id: 'plant',
    name: 'Plant CU',
    location: 'Plant room',
    pattern: /\b(plant|compressor|chiller|hvac|extraction|dust extraction|ventilation|cooling tower)\b/i,
    rationale:
      'Plant equipment grouped — large continuous loads, often three-phase, kept on dedicated submain.',
  },
  {
    id: 'office',
    name: 'Office CU',
    location: 'Office',
    pattern: /\b(office|admin|workstation|reception|meeting)\b/i,
    rationale:
      'Office / admin block grouped at its own CU — clean power for IT, isolated from production transients.',
  },
  {
    id: 'external',
    name: 'External / Yard CU',
    location: 'External',
    pattern: /\b(external|yard|gate|car park|fence|external lighting|security)\b/i,
    rationale:
      'External / yard circuits on dedicated submain — long runs, weather exposure, isolated tripping.',
  },
  {
    id: 'main',
    name: 'Main CU',
    location: 'Origin',
    pattern: /.*/,
    rationale:
      'Origin consumer unit at the cut-out — general circuits and any not assigned to a specific process area sit on the main board feeding the submains.',
  },
];

function zonesFor(installType: string): ZoneDefinition[] {
  if (installType === 'commercial') return COMMERCIAL_ZONES;
  if (installType === 'industrial') return INDUSTRIAL_ZONES;
  return DOMESTIC_ZONES;
}

function classifyZone(circuit: any, zones: ZoneDefinition[]): string {
  const haystack = `${circuit?.name ?? ''} ${circuit?.loadType ?? ''}`;
  for (const z of zones) {
    if (z.pattern.test(haystack)) return z.id;
  }
  return 'main';
}

/**
 * Whether a circuit, on its own, justifies keeping a board separate even when
 * the bucket falls below the merge threshold. 3φ loads, high-current circuits
 * (Ib > 63 A) and special-location circuits all need either dedicated
 * protection or different regs — keeping them on their own submain is
 * sensible engineering, not just nice-to-have grouping.
 */
function circuitHasHardReason(c: any): boolean {
  if (c?.phases === 'three') return true;
  const ib = Number(c?.calculations?.Ib ?? c?.calculations?.Id ?? 0);
  if (ib > HIGH_CURRENT_THRESHOLD_A) return true;
  // Section 7xx special locations whose protection rules diverge from the
  // main installation (medical, swimming, agricultural, marina).
  const loc = String(c?.specialLocation ?? '').toLowerCase();
  if (/medical|swimming|sauna|agricultural|marina|caravan/.test(loc)) return true;
  return false;
}

/**
 * Post-process the zone-bucketed map to produce a *realistic* board count.
 *
 *   1. Domestic ≤ SINGLE_BOARD_DOMESTIC_THRESHOLD circuits → everything on one CU.
 *   2. Each non-structural bucket is checked against MIN_SUBMAIN_WAYS. Buckets
 *      below threshold without a hard-justified circuit are flagged for
 *      consolidation (NOT immediately merged into main).
 *   3. Structural buckets (outbuilding / medical / plant / external) keep
 *      their separation if they have at least MIN_STRUCTURAL_SUBMAIN_WAYS.
 *   4. **Consolidation pass** — undersized buckets are combined into a single
 *      'auxiliary' submain when their combined size ≥ MIN_SUBMAIN_WAYS. This
 *      is what a real electrician does: rather than stretch the main CU AND
 *      sprinkle 1-2 circuits across multiple tiny submains, you bundle the
 *      small bits into one shared "Auxiliary / Services" board with its own
 *      enclosure + main switch + submain feed. Saves materials and labour
 *      vs the per-zone fragmentation, while keeping isolation that the main
 *      doesn't get burdened with.
 *   5. If consolidated combined size < MIN_SUBMAIN_WAYS (or only one
 *      undersized bucket exists), they fall back into main.
 *
 * Returns: consolidated buckets + any synthetic zone definitions for
 * boards created during consolidation (so downstream lookups work).
 */
function consolidateBuckets(
  bucketsMap: Record<string, number[]>,
  circuits: any[],
  installType: string,
  zoneDefs: ZoneDefinition[]
): {
  buckets: Record<string, number[]>;
  syntheticZones: ZoneDefinition[];
} {
  const totalCircuits = circuits.length;

  // Single-board preference for small domestic jobs — a 14-circuit dwelling
  // belongs on one 18-way CU, full stop. Don't fragment it just because the
  // garage circuits matched the outbuilding pattern.
  if (
    installType === 'domestic' &&
    totalCircuits <= SINGLE_BOARD_DOMESTIC_THRESHOLD
  ) {
    return {
      buckets: { main: circuits.map((_, i) => i) },
      syntheticZones: [],
    };
  }

  const structural = STRUCTURAL_ZONE_IDS[installType] ?? new Set<string>();
  const result: Record<string, number[]> = {};
  const undersized: { zoneId: string; indices: number[]; name: string }[] = [];

  for (const [zoneId, indices] of Object.entries(bucketsMap)) {
    if (zoneId === 'main') {
      result.main = [...(result.main ?? []), ...indices];
      continue;
    }

    const isStructural = structural.has(zoneId);
    const minRequired = isStructural ? MIN_STRUCTURAL_SUBMAIN_WAYS : MIN_SUBMAIN_WAYS;
    const hasHardReason = indices.some((i) => circuitHasHardReason(circuits[i]));

    if (indices.length >= minRequired || hasHardReason) {
      // Earns its existence — keep as a submain.
      result[zoneId] = indices;
    } else {
      // Hold for consolidation pass.
      const zoneName = zoneDefs.find((z) => z.id === zoneId)?.name ?? zoneId;
      undersized.push({ zoneId, indices, name: zoneName });
    }
  }

  // ── Consolidation pass ────────────────────────────────────────────────
  const syntheticZones: ZoneDefinition[] = [];
  if (undersized.length === 0) {
    // Nothing to consolidate.
  } else if (undersized.length === 1) {
    // Single small bucket — not worth a consolidated submain on its own.
    // Drop into main (which the user can override later via rename / split).
    result.main = [
      ...(result.main ?? []),
      ...undersized[0].indices,
    ].sort((a, b) => a - b);
  } else {
    const combined = undersized
      .flatMap((u) => u.indices)
      .sort((a, b) => a - b);

    if (combined.length >= MIN_SUBMAIN_WAYS) {
      // Multiple small buckets → consolidate into one shared submain.
      // This is the "happy medium" — neither stretching the main nor
      // sprinkling tiny CUs everywhere.
      const auxId = 'auxiliary';
      result[auxId] = combined;
      const includedNames = undersized.map((u) => u.name).join(' + ');
      syntheticZones.push({
        id: auxId,
        name: 'Auxiliary CU',
        location: 'Combined services',
        pattern: /(?!.*)/, // never matches — synthetic, populated by consolidation only
        rationale: `Consolidated submain housing ${includedNames} — each group was below the threshold to justify its own CU, but together they earn a shared submain. Saves enclosure + main switch + duplicated SWA feed costs vs running each as a separate board.`,
      });
    } else {
      // Combined still too small → fall through to main.
      result.main = [...(result.main ?? []), ...combined].sort((a, b) => a - b);
    }
  }

  return { buckets: result, syntheticZones };
}

export interface RecommenderOptions {
  /** Per-circuit phase overrides (1φ circuits only) — pins the phase regardless of balance. */
  phaseOverrides?: Record<number, 'L1' | 'L2' | 'L3'>;
  /**
   * User-created boards added manually. Allows the user to split a board
   * (create a new one + move circuits) or build a layout the heuristic
   * recommender wouldn't have produced. These board ids must NOT collide
   * with any zone def ids ('main', 'outbuilding', etc.).
   */
  userCreatedBoards?: Array<{ id: string; name: string; location: string }>;
  /**
   * Per-circuit board overrides. Circuit index → board id. Overrides whatever
   * board the zone classifier would have placed it in. The target board id
   * can be a zone id, a user-created board id, or any board id that ends up
   * in the layout (we filter empties at the end).
   */
  circuitBoardOverrides?: Record<number, string>;
}

export function recommendBoardLayout(
  design: any,
  options: RecommenderOptions = {}
): BoardLayoutResult {
  const circuits: any[] = design?.circuits ?? [];
  const totalDiversified = Number(design?.diversifiedLoad ?? 0);
  const userSpecifiedVoltage = Number(design?.supply?.voltage ?? 230);
  const userSpecifiedPhases = String(design?.supply?.phases ?? 'single');
  const installType = String(
    design?.installationType ?? design?.projectInfo?.installationType ?? 'domestic'
  );

  const warnings: CoherenceWarning[] = [];

  // Decide whether the design needs three-phase. The user's explicit choice is
  // respected unless the load CLEARLY can't fit on a single-phase service.
  //
  //   1. Any 3φ circuit on the design → 3φ board (the AI can't supply a 3φ
  //      load from a 1φ board).
  //   2. Any single circuit with Ib > FORCE_3PH_CIRCUIT_A → 3φ board.
  //   3. Total diversified load above the install-type's hard threshold:
  //        domestic: 35 kW (way beyond a 100 A or 125 A single-phase service)
  //        commercial / industrial: 23 kW (these systems normally need 3φ)
  //
  // Lower-band excedances (20–23 kW domestic, 23–35 kW domestic) emit
  // *warnings* about supply upgrade options — they don't auto-flip. A real
  // designer doesn't push a small house to 3-phase just because the paper
  // diversity figure crept above 23 kW.
  const force3phLimit =
    installType === 'domestic' ? FORCE_3PH_DOMESTIC_W : FORCE_3PH_NON_DOMESTIC_W;
  const hasThreePhaseCircuit = circuits.some((c) => c?.phases === 'three');
  const hasHighCurrentCircuit = circuits.some(
    (c) =>
      Number(c?.calculations?.Ib ?? 0) > FORCE_3PH_CIRCUIT_A ||
      Number(c?.calculations?.Id ?? 0) > FORCE_3PH_CIRCUIT_A
  );
  const needsThreePhase =
    userSpecifiedPhases === 'single' &&
    (hasThreePhaseCircuit ||
      hasHighCurrentCircuit ||
      totalDiversified > force3phLimit);

  // Effective supply for the rest of the recommender — overridden to 3φ if needed.
  const supplyPhases = needsThreePhase ? 'three' : userSpecifiedPhases;
  const supplyVoltage = needsThreePhase ? 400 : userSpecifiedVoltage;

  // Three-phase auto-flip warning — fires only when we ACTUALLY designed as 3φ.
  if (needsThreePhase) {
    const kw = (totalDiversified / 1000).toFixed(1);
    const ib3ph = (totalDiversified / (Math.sqrt(3) * 400)).toFixed(0);
    let reason: string;
    if (hasThreePhaseCircuit) {
      reason = 'Design contains a three-phase circuit (motor, large EV charger, heat pump or similar) which can\'t be supplied from a single-phase board.';
    } else if (hasHighCurrentCircuit) {
      reason = `Design contains a circuit with design current > ${FORCE_3PH_CIRCUIT_A} A — beyond practical single-phase final-circuit territory.`;
    } else {
      reason =
        installType === 'domestic'
          ? `Diversified load ${kw} kW exceeds practical single-phase capacity even on a 125 A service (limit ${(FORCE_3PH_DOMESTIC_W / 1000).toFixed(0)} kW).`
          : `Diversified load ${kw} kW exceeds 100 A single-phase service capacity.`;
    }
    warnings.push({
      kind: 'three-phase',
      severity: 'warn',
      title: 'Three-phase service needed',
      detail:
        `${reason} ` +
        `This design has been computed on a three-phase basis — 400 V line-to-line, balanced across L1/L2/L3 (board feed ~${ib3ph} A per phase). ` +
        `Contact your DNO to confirm three-phase availability before installation.`,
      reg: '525 / Section A1',
    });
  } else if (
    userSpecifiedPhases === 'single' &&
    totalDiversified > NEAR_SUPPLY_LIMIT_W
  ) {
    // Near or at supply ceiling but NOT auto-flipped — surface the options
    // so the designer can make a real call (DNO upgrade vs 3φ vs load-shift).
    const kw = (totalDiversified / 1000).toFixed(1);
    const aboveCeiling = totalDiversified > AT_SUPPLY_LIMIT_W;
    warnings.push({
      kind: 'three-phase',
      severity: aboveCeiling ? 'warn' : 'info',
      title: aboveCeiling
        ? 'Supply upgrade needed'
        : 'Approaching single-phase supply limit',
      detail: aboveCeiling
        ? `Diversified load ${kw} kW exceeds the standard 100 A single-phase service (23 kW). Options: (a) request a 125 A single-phase service from the DNO if available, (b) upgrade to three-phase, or (c) reduce peak load with smart EV charging / load management. Design left as single-phase — flip this in the Supply step if you confirm three-phase.`
        : `Diversified load ${kw} kW is close to the 100 A single-phase ceiling (23 kW). Stays single-phase for now, but worth a load-management plan (smart EV charging, time-of-use shifting) so peak demand doesn't trip the cut-out.`,
      reg: 'BS 7671 Section A',
    });
  }

  const totalWays = circuits.length;

  // Bucket by zone first, then run the consolidation pass — this is what
  // turns "8 boards with 1-3 ckts each" into a realistic 1-3 board layout.
  // Consolidation may also synthesise an "auxiliary" zone that combines
  // multiple undersized buckets into one shared submain.
  const baseZoneDefs = zonesFor(installType);
  const rawBucketsMap: Record<string, number[]> = {};
  circuits.forEach((c, i) => {
    const k = classifyZone(c, baseZoneDefs);
    if (!rawBucketsMap[k]) rawBucketsMap[k] = [];
    rawBucketsMap[k].push(i);
  });
  const consolidation = consolidateBuckets(
    rawBucketsMap,
    circuits,
    installType,
    baseZoneDefs
  );
  let bucketsMap = consolidation.buckets;
  // Resolved zone defs = base zone list + any synthesised by consolidation.
  // 'auxiliary' goes at the end (after 'main' but before structural zones).
  let zoneDefs: ZoneDefinition[] = [
    ...baseZoneDefs,
    ...consolidation.syntheticZones,
  ];

  // ── User overrides pass ─────────────────────────────────────────────
  // Manual moves / new boards / merges. The user's intent always wins
  // over the heuristic — they have project knowledge the regex doesn't.
  const userBoards = options.userCreatedBoards ?? [];
  const circuitOverrides = options.circuitBoardOverrides ?? {};
  if (userBoards.length > 0 || Object.keys(circuitOverrides).length > 0) {
    // 1. Strip overridden circuits from their current buckets.
    const overriddenIndices = new Set(
      Object.keys(circuitOverrides).map((s) => Number(s))
    );
    const stripped: Record<string, number[]> = {};
    for (const [zoneId, indices] of Object.entries(bucketsMap)) {
      const kept = indices.filter((i) => !overriddenIndices.has(i));
      if (kept.length > 0) stripped[zoneId] = kept;
    }
    // 2. Re-add to overridden destinations.
    for (const [idxStr, targetId] of Object.entries(circuitOverrides)) {
      const i = Number(idxStr);
      if (!stripped[targetId]) stripped[targetId] = [];
      stripped[targetId].push(i);
    }
    // 3. Sort each bucket back into circuit-index order.
    for (const id of Object.keys(stripped)) {
      stripped[id].sort((a, b) => a - b);
    }
    // 4. Drop empty buckets EXCEPT 'main' (always survives) and any
    //    user-created boards the user explicitly added (might be empty
    //    placeholders awaiting circuits).
    const userBoardIds = new Set(userBoards.map((b) => b.id));
    for (const id of Object.keys(stripped)) {
      if (
        stripped[id].length === 0 &&
        id !== 'main' &&
        !userBoardIds.has(id)
      ) {
        delete stripped[id];
      }
    }
    bucketsMap = stripped;

    // 5. Synthesise zone defs for user-created boards not already known.
    const knownIds = new Set(zoneDefs.map((z) => z.id));
    const userZones: ZoneDefinition[] = userBoards
      .filter((b) => !knownIds.has(b.id))
      .map((b) => ({
        id: b.id,
        name: b.name,
        location: b.location,
        pattern: /(?!.*)/, // synthetic — only populated through overrides
        rationale:
          'User-defined submain — added manually to suit project layout the recommender did not surface.',
      }));
    zoneDefs = [...zoneDefs, ...userZones];
  }

  // Multi-board fires when consolidation still produces multiple zones OR when
  // any single zone exceeds MAX_WAYS_PER_BOARD.
  const survivingZones = Object.keys(bucketsMap).filter(
    (id) => bucketsMap[id] && bucketsMap[id].length > 0
  );
  const needsMultiBoard =
    survivingZones.length > 1 || totalWays > MAX_WAYS_PER_BOARD;

  // Note: multi-board, SPD, phase imbalance, Zs corrections, high-current circuits
  // are resolved IN the design — no flagging.

  // ── Board grouping ─────────────────────────────────────────────────────
  if (!needsMultiBoard) {
    const allIndices = circuits.map((_, i) => i);
    const boardLoad = sumDiversifiedLoad(circuits, allIndices);
    const boardCurrent = needsThreePhase
      ? boardLoad / (Math.sqrt(3) * supplyVoltage)
      : boardLoad / supplyVoltage;
    // ELE-969 — auto-size when user hasn't explicitly entered a rating, so
    // commercial / industrial installs don't end up stuck on the 100 A
    // default with downstream MEC + bonding miscalc. If the user did enter
    // a rating we honour it, but bump up if it's smaller than the load needs.
    const userMainExplicit =
      design?.consumerUnit?.mainSwitchRating != null &&
      Number(design.consumerUnit.mainSwitchRating) > 0;
    const userMain = Number(design?.consumerUnit?.mainSwitchRating ?? 0);
    const initialMain = userMainExplicit
      ? Math.max(userMain, sizeOriginMainSwitch(boardCurrent))
      : sizeOriginMainSwitch(boardCurrent);
    const phaseBalance =
      supplyPhases === 'three'
        ? balancePhases(circuits, allIndices, supplyVoltage, options.phaseOverrides)
        : undefined;
    const spd = assessSPD(installType, circuits, allIndices, true);
    const { resolvedMainSwitch, discrimination } = resolveDiscrimination(
      initialMain,
      circuits,
      allIndices
    );

    const supplyZe = Number(design?.consumerUnit?.incomingSupply?.Ze ?? 0.35);
    const earthingSystem = String(
      design?.consumerUnit?.incomingSupply?.earthingSystem ?? 'TN-C-S'
    );
    const servicePhase = estimateServicePhaseSize(resolvedMainSwitch);
    return {
      boards: [
        {
          id: 'main',
          name: 'Main CU',
          location: design?.location || 'Origin',
          rationale: 'Single board accommodates all circuits within practical way limits.',
          circuitIndices: allIndices,
          mainSwitchRating: resolvedMainSwitch,
          rcdGrouping: 'rcbo-per-way',
          isOrigin: true,
          diversifiedLoadW: boardLoad,
          designCurrentA: boardCurrent,
          zdb: supplyZe, // Origin board sees the supply Ze directly.
          psccKa: pscckAAtBoard(supplyZe),
          earthingConductorMm2: sizeEarthingConductor(servicePhase, earthingSystem),
          mainBondingMm2: sizeMainBonding(servicePhase, earthingSystem),
          phaseBalance,
          spd,
          discrimination,
        },
      ],
      submainFeeds: [],
      warnings,
      needsThreePhase,
      needsMultiBoard,
      totalCircuits: totalWays,
      totalDiversifiedKW: totalDiversified / 1000,
    };
  }

  // bucketsMap was already built + consolidated above. Use it directly.

  // Order zones by their definition order, with 'main' always first (origin).
  // The comparator must be a proper (a, b) function — single-arg comparators
  // give engine-dependent behaviour and don't reliably pull 'main' to the top.
  const orderedZones = zoneDefs
    .map((z) => z.id)
    .filter((id) => bucketsMap[id] && bucketsMap[id].length > 0)
    .sort((a, b) => {
      if (a === 'main' && b !== 'main') return -1;
      if (b === 'main' && a !== 'main') return 1;
      return 0;
    });

  // If a single zone has > MAX_WAYS, we still split that zone into A/B/C — but
  // this is rare in zone-based grouping (a single zone rarely exceeds 18 ways).
  const boards: BoardRecommendation[] = [];
  const submainFeeds: SubmainFeed[] = [];
  let boardIndex = 0;
  const mainRating = Number(design?.consumerUnit?.mainSwitchRating ?? 100);

  orderedZones.forEach((zoneId) => {
    const indices = bucketsMap[zoneId];
    const zoneDef = zoneDefs.find((z) => z.id === zoneId)!;
    const label = { name: zoneDef.name, location: zoneDef.location };
    const archetype = zoneId; // keep variable name for downstream reuse

    // Split if exceeds max ways
    const chunks: number[][] = [];
    for (let i = 0; i < indices.length; i += MAX_WAYS_PER_BOARD) {
      chunks.push(indices.slice(i, i + MAX_WAYS_PER_BOARD));
    }

    chunks.forEach((chunk, chunkIdx) => {
      const isOrigin = boardIndex === 0;
      const suffix = chunks.length > 1 ? ` ${String.fromCharCode(65 + chunkIdx)}` : '';
      const boardName = `${label.name}${suffix}`;
      const boardId = `${archetype}${suffix.trim()}`.toLowerCase().replace(/\s/g, '-');

      const boardLoadW = sumDiversifiedLoad(circuits, chunk);
      // Three-phase design current uses line-line × √3; single-phase uses voltage directly.
      const boardCurrentA = needsThreePhase
        ? boardLoadW / (Math.sqrt(3) * supplyVoltage)
        : boardLoadW / supplyVoltage;

      // Origin's main switch must carry the whole installation (origin circuits + all
      // submains), not just its own circuits. We size from the *total* installation load.
      // ELE-969 — auto-size whenever the user hasn't explicitly supplied a main
      // switch rating. Previously we only auto-sized on auto-3φ conversion, so a
      // 165 kW design with no user-entered main switch was getting stuck on the
      // 100 A default → MEC and bonding showed 16 mm² / 10 mm² instead of the
      // correct 50 mm² / 25 mm² for a 250 A service.
      let boardMainSwitch: number;
      if (isOrigin) {
        const userMainExplicit =
          design?.consumerUnit?.mainSwitchRating != null &&
          Number(design.consumerUnit.mainSwitchRating) > 0;
        const installationCurrent = needsThreePhase
          ? totalDiversified / (Math.sqrt(3) * 400)
          : boardCurrentA;
        boardMainSwitch = userMainExplicit
          ? Math.max(mainRating, sizeOriginMainSwitch(installationCurrent))
          : sizeOriginMainSwitch(installationCurrent);
      } else {
        // Submains: size purely from the load (no 100 A floor) — small
        // submains feeding a few circuits should land on a small main.
        boardMainSwitch = sizeBoardMainSwitch(boardCurrentA);
      }

      let feedFromParent: SubmainFeed | undefined;
      if (!isOrigin) {
        const feedPhases = decideSubmainPhases(
          supplyPhases,
          circuits,
          chunk,
          boardLoadW
        );
        // For L+N feeds off a 3φ origin: pick the least-loaded phase based on
        // submain feeds already issued (round-robin starting with L1).
        const lnPhaseAssign = (() => {
          if (feedPhases !== 'single' || supplyPhases !== 'three') return undefined;
          const lnFeeds = submainFeeds.filter((f) => f.feedPhases === 'single');
          const counts = { L1: 0, L2: 0, L3: 0 } as Record<'L1' | 'L2' | 'L3', number>;
          lnFeeds.forEach((f) => {
            if (f.feedSourcePhase) counts[f.feedSourcePhase]++;
          });
          return counts.L1 <= counts.L2 && counts.L1 <= counts.L3
            ? 'L1'
            : counts.L2 <= counts.L3
              ? 'L2'
              : 'L3';
        })();

        feedFromParent = computeSubmainFeed({
          parentBoardId: 'main',
          childBoardId: boardId,
          childBoardName: boardName,
          archetype,
          location: label.location,
          diversifiedLoadW: boardLoadW,
          designCurrentA: boardCurrentA,
          supplyVoltage,
          feedPhases,
          feedSourcePhase: lnPhaseAssign as 'L1' | 'L2' | 'L3' | undefined,
        });
        submainFeeds.push(feedFromParent);
      }

      const phaseBalance =
        supplyPhases === 'three'
          ? balancePhases(circuits, chunk, supplyVoltage, options.phaseOverrides)
          : undefined;
      const spd = assessSPD(installType, circuits, chunk, isOrigin);
      // Auto-resolve discrimination by upsizing the parent if the ratio is below
      // the rule-of-thumb threshold. This is the "design properly, don't flag" approach.
      const { resolvedMainSwitch, discrimination } = resolveDiscrimination(
        boardMainSwitch,
        circuits,
        chunk
      );

      // If we upsized to fix discrimination, also re-derive submain feed protection
      let resolvedFeed = feedFromParent;
      if (!isOrigin && resolvedMainSwitch !== boardMainSwitch && resolvedFeed) {
        resolvedFeed = computeSubmainFeed({
          parentBoardId: 'main',
          childBoardId: boardId,
          childBoardName: boardName,
          archetype,
          location: label.location,
          diversifiedLoadW: boardLoadW,
          designCurrentA: Math.max(boardCurrentA, resolvedMainSwitch * 0.85),
          supplyVoltage,
          feedPhases: feedFromParent.feedPhases,
          feedSourcePhase: feedFromParent.feedSourcePhase,
        });
        // Replace the earlier-pushed feed entry
        const existing = submainFeeds.findIndex((f) => f.childBoardId === boardId);
        if (existing >= 0) submainFeeds[existing] = resolvedFeed;
        else submainFeeds.push(resolvedFeed);
      }

      boards.push({
        id: boardId,
        name: boardName,
        location: label.location,
        rationale: zoneDef.rationale,
        circuitIndices: chunk,
        mainSwitchRating: resolvedMainSwitch,
        rcdGrouping: 'rcbo-per-way',
        isOrigin,
        diversifiedLoadW: boardLoadW,
        designCurrentA: boardCurrentA,
        zdb: 0, // Set by the propagation pass below.
        psccKa: 0, // Set after Zdb propagation.
        earthingConductorMm2: 0, // Set after submain feed is finalised.
        feedFromParent: resolvedFeed,
        phaseBalance,
        spd,
        discrimination,
      });

      boardIndex++;
    });
  });

  // Mark the origin board with a "main" id so submain feeds can reference it
  if (boards.length > 0) boards[0].id = 'main';
  // Re-link parent ids on every submain feed (they default to 'main' already)

  // ── Zdb propagation + PFC + earthing/bonding sizing ─────────────────
  // Walk boards in topological order (origin → submains). Origin sees Ze
  // directly; each submain inherits its parent's Zdb plus the loop ohms its
  // feed contributes. This is what makes Zs values on submain circuits
  // honest — without propagation they'd silently use Ze and pass when the
  // real Zs (with the submain feed in series) would fail Table 41.3.
  const supplyZe = Number(design?.consumerUnit?.incomingSupply?.Ze ?? 0.35);
  const earthingSystem = String(
    design?.consumerUnit?.incomingSupply?.earthingSystem ?? 'TN-C-S'
  );
  const boardById = new Map(boards.map((b) => [b.id, b]));
  // Origin first
  boards.forEach((b) => {
    if (b.isOrigin) b.zdb = supplyZe;
  });
  // Iterate until all boards have a zdb (handles N-deep submain chains).
  // Cap iterations defensively in case of a malformed graph.
  for (let iter = 0; iter < boards.length + 2; iter++) {
    let progressed = false;
    for (const b of boards) {
      if (b.zdb > 0 || b.isOrigin) continue;
      if (!b.feedFromParent) continue;
      const parent = boardById.get(b.feedFromParent.parentBoardId);
      if (parent && (parent.zdb > 0 || parent.isOrigin)) {
        b.zdb = (parent.zdb || supplyZe) + b.feedFromParent.feedLoopOhms;
        progressed = true;
      }
    }
    if (!progressed) break;
  }
  // Fallback: any board still missing zdb (orphan) gets supplyZe so Zs calcs
  // don't divide-by-zero or pass falsely. Real fix would be to re-parent it.
  boards.forEach((b) => {
    if (!b.zdb) b.zdb = supplyZe;
  });

  // PFC and earthing/bonding sizes — derived once Zdb is final.
  boards.forEach((b) => {
    b.psccKa = pscckAAtBoard(b.zdb);
    if (b.isOrigin) {
      const servicePhase = estimateServicePhaseSize(b.mainSwitchRating);
      b.earthingConductorMm2 = sizeEarthingConductor(servicePhase, earthingSystem);
      b.mainBondingMm2 = sizeMainBonding(servicePhase, earthingSystem);
    } else if (b.feedFromParent) {
      // Submain earthing conductor sized from the feed's phase conductor.
      b.earthingConductorMm2 = sizeEarthingConductor(
        b.feedFromParent.cableSize,
        earthingSystem
      );
    } else {
      b.earthingConductorMm2 = 0;
    }
  });

  return {
    boards,
    submainFeeds,
    warnings,
    needsThreePhase,
    needsMultiBoard,
    totalCircuits: totalWays,
    totalDiversifiedKW: totalDiversified / 1000,
  };
}

// ── Submain sizing (deterministic, conservative) ──────────────────────────────
// Phase 4a: assume 25m typical run, SWA 4-core 90°C XLPE clipped direct (Method E
// equivalent), ambient 30°C. Phase 4b will let user enter actual run length and
// the AI will perform a proper voltage-drop verified sizing.

/**
 * Round a current up to the next standard IEC main switch / MCCB / ACB rating.
 * Covers from a 40A consumer-unit through to a 1600A switchgear breaker so
 * commercial and industrial designs land on real catalogue values, not
 * `Math.ceil(currentA/10)*10` gibberish.
 *
 * Source: IEC 60898 / 60947-2 standard rating series.
 */
function sizeBoardMainSwitch(currentA: number): number {
  // BS 7671 433.1: Ib ≤ In ≤ Iz — round the design current up to the next
  // standard rating. No extra headroom factor; the next-standard step is the
  // headroom. Caller decides any minimum floor (e.g. origin floored at 100 A
  // to match a typical UK service).
  const STANDARD_RATINGS = [
    40, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600,
  ];
  for (const r of STANDARD_RATINGS) {
    if (currentA <= r) return r;
  }
  return 1600;
}

/**
 * Origin-board main switch — floors at 100 A (typical UK service rating)
 * even for small loads. ELE-969 noted that auto-sizing a 5 kW domestic to
 * a 40 A main silently under-specs the MEC as if the actual service were
 * also 40 A. The user can override by entering a smaller rating in the
 * supply step (we honour explicit user input).
 */
function sizeOriginMainSwitch(currentA: number): number {
  return Math.max(100, sizeBoardMainSwitch(currentA));
}

// SWA 4-core XLPE 90°C, Method E (clipped). BS 7671 Table 4D4A current capacity
// + Table 4D4B mV/A/m volt-drop factor. Three-phase factor applies for 3-core/4-core.
const SWA_4C_XLPE: Array<{ size: number; iz: number; mvAmM_3ph: number; mvAmM_1ph: number }> = [
  { size: 4, iz: 27, mvAmM_3ph: 9.5, mvAmM_1ph: 11 },
  { size: 6, iz: 37, mvAmM_3ph: 6.4, mvAmM_1ph: 7.3 },
  { size: 10, iz: 51, mvAmM_3ph: 3.8, mvAmM_1ph: 4.4 },
  { size: 16, iz: 68, mvAmM_3ph: 2.4, mvAmM_1ph: 2.8 },
  { size: 25, iz: 89, mvAmM_3ph: 1.5, mvAmM_1ph: 1.75 },
  { size: 35, iz: 110, mvAmM_3ph: 1.1, mvAmM_1ph: 1.25 },
  { size: 50, iz: 134, mvAmM_3ph: 0.81, mvAmM_1ph: 0.93 },
  { size: 70, iz: 171, mvAmM_3ph: 0.57, mvAmM_1ph: 0.65 },
  { size: 95, iz: 207, mvAmM_3ph: 0.43, mvAmM_1ph: 0.50 },
  { size: 120, iz: 239, mvAmM_3ph: 0.36, mvAmM_1ph: 0.41 },
  { size: 150, iz: 275, mvAmM_3ph: 0.30, mvAmM_1ph: 0.34 },
  { size: 185, iz: 314, mvAmM_3ph: 0.25, mvAmM_1ph: 0.28 },
  { size: 240, iz: 369, mvAmM_3ph: 0.22, mvAmM_1ph: 0.24 },
];

const SUBMAIN_VD_TARGET_PERCENT = 2.0; // leave 3% headroom for final circuits (BS 7671 limits 5% total)

/**
 * Earth-fault loop resistance for a single conductor, copper @ 70°C, in
 * mΩ per metre. Source: BS 7671 Appendix I, Table I1 (resistance per metre
 * at 70°C). Used for Zs chain propagation: a submain feed contributes
 * ~2× this × length (phase + cpc / armour return path) to the loop.
 */
const CU_70C_R_PER_M_MOHM: Record<number, number> = {
  1: 21.4,
  1.5: 14.5,
  2.5: 8.71,
  4: 5.45,
  6: 3.64,
  10: 2.16,
  16: 1.36,
  25: 0.863,
  35: 0.617,
  50: 0.456,
  70: 0.316,
  95: 0.228,
  120: 0.181,
  150: 0.147,
  185: 0.118,
  240: 0.0904,
  300: 0.0723,
  400: 0.0566,
};

/**
 * Loop impedance contribution (Ω) of a submain feed: 2× single-conductor
 * resistance × length / parallel runs.
 *
 * The factor of 2 conservatively models the earth-fault return path: phase
 * conductor going + return path back (SWA armour or separate cpc). Real
 * armour resistance varies 1.0–1.6× phase R for typical SWA gauges; using
 * 2× phase R rounds up to a safe value rather than under-stating Zs (which
 * would otherwise let the AI sign off circuits that are actually borderline).
 */
function feedLoopOhmsFor(
  cableSizeMm2: number,
  lengthM: number,
  parallelRuns: number
): number {
  // Find the closest tabulated size — round UP for safety (smaller cable = higher R).
  const sizes = Object.keys(CU_70C_R_PER_M_MOHM).map(Number).sort((a, b) => a - b);
  const exact = CU_70C_R_PER_M_MOHM[cableSizeMm2];
  const rPerM_mOhm =
    exact ??
    CU_70C_R_PER_M_MOHM[sizes.find((s) => s >= cableSizeMm2) ?? sizes[sizes.length - 1]] ??
    0;
  const totalLoopR = (2 * rPerM_mOhm * lengthM) / 1000; // mΩ → Ω
  return totalLoopR / Math.max(1, parallelRuns);
}

/**
 * Earthing conductor sizing per BS 7671 Table 54.7 (copper, same insulation
 * as the phase conductor). Used for the main earthing conductor at the
 * origin and submain earthing conductors that feed each board.
 *
 *   ≤ 16 mm²: same as phase
 *   16 < phase ≤ 35: 16 mm²
 *   > 35 mm²: phase / 2 (rounded up to next standard size)
 *
 * For SWA where the armour is the cpc, the armour itself is taken as
 * sufficient (verified by manufacturer data); we still report a Cu
 * equivalent here so the schedule has a value.
 *
 * For TT systems, BS 7671 542.1.5 + practical Approved Document advice
 * recommends a 16 mm² Cu minimum on the main earthing conductor (or 25 mm² Cu
 * if buried), because the earth electrode resistance is the dominant Zs
 * contributor and you want to minimise voltage rise on the conductor itself.
 */
function sizeEarthingConductor(
  phaseSizeMm2: number,
  earthingSystem?: string
): number {
  const sys = String(earthingSystem ?? '').toUpperCase();
  const isTT = sys === 'TT';
  let size: number;
  if (phaseSizeMm2 <= 16) size = phaseSizeMm2;
  else if (phaseSizeMm2 <= 35) size = 16;
  else {
    const half = phaseSizeMm2 / 2;
    size =
      STANDARD_CABLE_SIZES_FOR_EARTHING.find((s) => s >= half) ?? Math.ceil(half);
  }
  // TT bump — minimum 16 mm² Cu for the main earthing conductor.
  if (isTT && size < 16) size = 16;
  return size;
}

const STANDARD_CABLE_SIZES_FOR_EARTHING = [
  16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400,
];

/**
 * Main protective bonding conductor sizing per BS 7671 544.1.1 / Table 54.8.
 *
 *   TN-C-S (PME) — Table 54.8 (more onerous due to neutral-current loading):
 *     phase ≤ 35 mm²        → 10 mm² Cu (was 6 mm² pre-A2)
 *     35 < phase ≤ 50       → 16 mm²
 *     50 < phase ≤ 95       → 25 mm²
 *     95 < phase ≤ 150      → 35 mm²
 *     > 150 mm²             → 50 mm²
 *
 *   TN-S / TT — half the phase size, with a 6 mm² minimum.
 *
 * A4:2026 reaffirms these for PME services and clarifies the 25 mm² minimum
 * for the supplementary bonding in special locations (Section 7xx).
 */
function sizeMainBonding(
  servicePhaseMm2: number,
  earthingSystem: string
): number {
  const sys = String(earthingSystem ?? '').toUpperCase();
  if (sys === 'TN-C-S' || sys === 'PME') {
    if (servicePhaseMm2 <= 35) return 10;
    if (servicePhaseMm2 <= 50) return 16;
    if (servicePhaseMm2 <= 95) return 25;
    if (servicePhaseMm2 <= 150) return 35;
    return 50;
  }
  // TN-S / TT default
  return Math.max(6, Math.ceil(servicePhaseMm2 / 2));
}

/**
 * Estimate the service phase conductor size from the main switch rating —
 * used when the user hasn't supplied a service cable size. Conservative:
 * matches typical UK DNO service cable sizes (waveform / Wavecon / Aluminium
 * mains) for given main fuse / switch ratings per ENA TS 43-125 and ESQCR.
 *
 * Above 250A the service is typically a separate metered LV connection with
 * 185 / 240 / 300 mm² conductors — those values are needed for commercial
 * and industrial supplies (ELE-969).
 */
function estimateServicePhaseSize(mainSwitchA: number): number {
  if (mainSwitchA <= 80) return 16;
  if (mainSwitchA <= 100) return 25;
  if (mainSwitchA <= 125) return 35;
  if (mainSwitchA <= 160) return 50;
  if (mainSwitchA <= 200) return 70;
  if (mainSwitchA <= 250) return 95;
  if (mainSwitchA <= 315) return 120;
  if (mainSwitchA <= 400) return 185;
  if (mainSwitchA <= 500) return 240;
  if (mainSwitchA <= 630) return 300;
  // 630A+ services use parallel cables or ducted busbar — fall back to the
  // largest single conductor we model.
  return 300;
}

/**
 * Prospective fault current (kA) at a board's busbar, derived from Zdb.
 *
 * The fault we care about for breaking-capacity (Icn) selection is the
 * phase-to-earth fault — single-phase MCBs / RCBOs see U₀ across the loop,
 * NOT line-line voltage. UK supplies have U₀ = 230 V regardless of whether
 * the system is single-phase 230 V or three-phase 400 V (line-line).
 *
 *   PSCC_pe = U₀ / Zdb       where U₀ ≈ 230 V (phase-to-earth)
 *
 * The line-line PSCC for 3φ faults is ~√3× higher but isn't the relevant
 * figure for selecting single-phase device breaking capacity. We use the
 * earth-fault PSCC and the user verifies on-site with the actual measurement.
 */
function pscckAAtBoard(zdbOhms: number): number {
  if (zdbOhms <= 0) return 0;
  const phaseToEarthVoltage = 230;
  return phaseToEarthVoltage / zdbOhms / 1000;
}

function computeSubmainFeed(args: {
  parentBoardId: string;
  childBoardId: string;
  childBoardName: string;
  archetype: string;
  location: string;
  diversifiedLoadW: number;
  designCurrentA: number;
  supplyVoltage: number;
  feedPhases: 'three' | 'single';
  feedSourcePhase?: 'L1' | 'L2' | 'L3';
}): SubmainFeed {
  const { designCurrentA, diversifiedLoadW, supplyVoltage, feedPhases } = args;
  // Use feedPhases to determine Vd formula + cable type (4-core vs 3-core)
  const supplyPhases = feedPhases;

  // Protection at parent
  let protectionType: 'MCB' | 'MCCB' | 'BS88';
  let protectionCurve: string | undefined;
  let protectionRating: number;
  let protectionKa: number;

  if (designCurrentA <= 63) {
    protectionType = 'MCB';
    protectionCurve = 'C'; // C absorbs submain inrush better than B
    protectionRating = standardMCBRating(designCurrentA);
    protectionKa = 10;
  } else {
    protectionType = 'MCCB';
    protectionCurve = undefined;
    protectionRating = standardMCCBRating(designCurrentA);
    protectionKa = 25;
  }

  const lengthEstimate = 25;
  const isThreePhase = supplyPhases === 'three';

  // Voltage drop calc:
  //   1φ: Vd = 2 × mV/A/m × I × L × 1e-3 (the table mV/A/m is for both go+return)
  //   3φ: Vd = mV/A/m × I × L × 1e-3 (line-to-line)
  // Then compare to U₀ for percentage.
  const vdReferenceVoltage = isThreePhase ? 400 : 230;

  // Pick smallest cable that satisfies BOTH capacity (Iz ≥ In) and volt drop (≤ 2%).
  // Single-cable pass first — then if even the largest cable fails Vd, fall back to
  // parallel runs (two cables in parallel halves Vd and doubles Iz).
  let chosen: typeof SWA_4C_XLPE[number] | undefined;
  let parallelRuns = 1;
  let vdNote = '';
  for (const c of SWA_4C_XLPE) {
    if (c.iz < protectionRating) continue;
    const mvAmM = isThreePhase ? c.mvAmM_3ph : c.mvAmM_1ph;
    const vd_volts = (mvAmM * designCurrentA * lengthEstimate) / 1000;
    const vd_pct = (vd_volts / vdReferenceVoltage) * 100;
    if (vd_pct <= SUBMAIN_VD_TARGET_PERCENT) {
      chosen = c;
      vdNote = `Iz ${c.iz} A ≥ ${protectionRating} A · Vd ${vd_pct.toFixed(2)}% ≤ ${SUBMAIN_VD_TARGET_PERCENT}% target.`;
      break;
    }
  }
  if (!chosen) {
    // Single-cable Vd failure — design two cables in parallel.
    // Two parallel runs halve effective mV/A/m + double Iz.
    const largest = SWA_4C_XLPE[SWA_4C_XLPE.length - 1];
    chosen = largest;
    parallelRuns = 2;
    const mvAmM = isThreePhase ? largest.mvAmM_3ph : largest.mvAmM_1ph;
    const vd_volts_parallel = (mvAmM * designCurrentA * lengthEstimate) / 1000 / 2;
    const vd_pct_parallel = (vd_volts_parallel / vdReferenceVoltage) * 100;
    if (vd_pct_parallel <= SUBMAIN_VD_TARGET_PERCENT) {
      vdNote = `Single-run Vd at ${largest.size} mm² exceeds 2% target. Designed as 2× parallel ${largest.size} mm² runs · effective Vd ${vd_pct_parallel.toFixed(2)}%.`;
    } else {
      // Even parallel can't get Vd low enough — surface as cable note (still a deliverable),
      // upstream "supply upgrade" warning will catch this elsewhere.
      vdNote = `Length ${lengthEstimate} m at ${designCurrentA.toFixed(1)} A makes 2% Vd target unattainable. Recommend three-phase service or shorter run.`;
    }
  }

  const mvAmMfinal = isThreePhase ? chosen.mvAmM_3ph : chosen.mvAmM_1ph;
  const vdVoltsRaw = (mvAmMfinal * designCurrentA * lengthEstimate) / 1000;
  const vdVolts = vdVoltsRaw / parallelRuns;
  const vdPercent = (vdVolts / vdReferenceVoltage) * 100;
  const loadKW = (diversifiedLoadW / 1000).toFixed(1);
  const phaseDesc = isThreePhase ? '3φ' : '1φ';

  const parallelDesc = parallelRuns > 1 ? `${parallelRuns}× parallel ` : '';
  const coreCount = isThreePhase ? '4-core' : '3-core';
  const cableTypeFull = `${parallelDesc}SWA ${coreCount} 90°C XLPE`;
  const feedPhaseLabel: 'TP+N' | 'L+N' = isThreePhase ? 'TP+N' : 'L+N';

  const phaseDescriptor = isThreePhase
    ? 'TP+N'
    : args.feedSourcePhase
      ? `L+N (off ${args.feedSourcePhase})`
      : 'L+N';

  // Earth-fault loop impedance contributed by THIS feed.
  const feedLoopOhms = feedLoopOhmsFor(chosen.size, lengthEstimate, parallelRuns);

  return {
    parentBoardId: args.parentBoardId,
    childBoardId: args.childBoardId,
    childBoardName: args.childBoardName,
    diversifiedLoadW,
    designCurrentA,
    feedPhases: isThreePhase ? 'three' : 'single',
    feedPhaseLabel,
    feedSourcePhase: args.feedSourcePhase,
    protectionType,
    protectionRating,
    protectionCurve,
    protectionKa,
    cableSize: chosen.size,
    cableType: cableTypeFull,
    cableLengthEstimateM: lengthEstimate,
    voltageDropVolts: vdVolts,
    voltageDropPercent: vdPercent,
    voltageDropOk: vdPercent <= SUBMAIN_VD_TARGET_PERCENT,
    cableSizingNote: vdNote,
    feedLoopOhms,
    rationale:
      `Submain to ${args.childBoardName} · ${loadKW} kW ${phaseDescriptor} = ${designCurrentA.toFixed(1)} A. ` +
      `${protectionRating}A ${protectionType}${protectionCurve ? ` Type ${protectionCurve}` : ''} ` +
      `${protectionKa} kA at parent feeds ${parallelDesc}${chosen.size} mm² ${coreCount} SWA over ~${lengthEstimate} m · ` +
      `Iz ${chosen.iz * parallelRuns} A · Vd ${vdPercent.toFixed(2)}% (Tables 4D4A / 4D4B). ` +
      `Loop Z added: ${feedLoopOhms.toFixed(3)} Ω → propagates to child Zdb.`,
  };
}

// ── Per-board engineering helpers ─────────────────────────────────────────────

function sumDiversifiedLoad(circuits: any[], indices: number[]): number {
  return indices.reduce((sum, i) => {
    const c = circuits[i];
    return sum + Number(c?.calculations?.diversifiedLoad ?? c?.loadPower ?? 0);
  }, 0);
}

/**
 * Greedy three-phase load balancing.
 * Each single-phase circuit assigns to the currently least-loaded phase.
 * Three-phase circuits land across L1/L2/L3 simultaneously.
 *
 * User overrides (e.g. "force this 1φ circuit onto L2") are honoured first,
 * then the greedy LPT algorithm balances the remaining circuits around them.
 *
 * Returns aggregate phase loads + per-circuit phase assignments so the
 * board schedule can label each way.
 */
function balancePhases(
  circuits: any[],
  indices: number[],
  voltage: number,
  overrides?: Record<number, 'L1' | 'L2' | 'L3'>
): PhaseBalance {
  const phases = { L1_W: 0, L2_W: 0, L3_W: 0 };
  const assignments: Record<number, 'L1' | 'L2' | 'L3' | 'L1L2L3'> = {};

  // Apply user overrides first — they pin where they belong regardless of balance
  const overriddenIndices = new Set<number>();
  if (overrides) {
    for (const idx of indices) {
      const c = circuits[idx];
      if (c?.phases === 'three') continue; // 3φ circuits cannot be overridden
      const override = overrides[idx];
      if (override === 'L1' || override === 'L2' || override === 'L3') {
        const load = Number(c?.calculations?.diversifiedLoad ?? c?.loadPower ?? 0);
        phases[`${override}_W` as keyof typeof phases] += load;
        assignments[idx] = override;
        overriddenIndices.add(idx);
      }
    }
  }

  // Sort the rest by load DESC for greedy LPT (longest processing time) balancing
  const remaining = indices.filter((i) => !overriddenIndices.has(i));
  const sorted = remaining.sort(
    (a, b) => Number(circuits[b]?.loadPower ?? 0) - Number(circuits[a]?.loadPower ?? 0)
  );
  for (const idx of sorted) {
    const c = circuits[idx];
    const load = Number(c?.calculations?.diversifiedLoad ?? c?.loadPower ?? 0);
    if (c?.phases === 'three') {
      const per = load / 3;
      phases.L1_W += per;
      phases.L2_W += per;
      phases.L3_W += per;
      assignments[idx] = 'L1L2L3';
    } else {
      const least =
        phases.L1_W <= phases.L2_W && phases.L1_W <= phases.L3_W
          ? 'L1'
          : phases.L2_W <= phases.L3_W
            ? 'L2'
            : 'L3';
      phases[`${least}_W` as keyof typeof phases] += load;
      assignments[idx] = least;
    }
  }
  void voltage;
  const max = Math.max(phases.L1_W, phases.L2_W, phases.L3_W);
  const min = Math.min(phases.L1_W, phases.L2_W, phases.L3_W);
  const imbalancePercent = max > 0 ? ((max - min) / max) * 100 : 0;
  let flag: 'balanced' | 'mild-imbalance' | 'severe-imbalance' = 'balanced';
  if (imbalancePercent > 30) flag = 'severe-imbalance';
  else if (imbalancePercent > 15) flag = 'mild-imbalance';
  return { ...phases, imbalancePercent, flag, assignments };
}

/**
 * Decide the phase configuration for a submain feed.
 *
 *   1φ parent  →  always 1φ submain (no choice)
 *   3φ parent  →  TP+N submain (consistent + future-proof)
 *
 * Why default TP+N rather than mix L+N for small loads:
 *   - The whole installation has been designed on a 3φ basis (either user
 *     chose 3φ explicitly, or we auto-converted because total load demanded
 *     it). Mixing L+N for small submains introduces phase-balancing decisions
 *     the user didn't ask for, and silently surprises them when the schedule
 *     shows L+N where they expected TP+N.
 *   - Cable-cost saving (3-core vs 4-core SWA) is a real trade-off, but the
 *     user can opt into it manually per submain in a future pass — the safe
 *     default is uniform TP+N.
 *   - Future-proofs each child board for any future 3φ load (heat pump, EV
 *     upgrade, etc.) without re-running the cable.
 */
function decideSubmainPhases(
  parentSupplyPhases: string,
  childCircuits: any[],
  childIndices: number[],
  childDiversifiedW: number
): 'three' | 'single' {
  if (parentSupplyPhases !== 'three') return 'single';
  void childCircuits;
  void childIndices;
  void childDiversifiedW;
  return 'three';
}

/**
 * SPD assessment per BS 7671 443.4 (A4 amendment).
 * Risk-based: premises type + criticality of loads on this board.
 */
function assessSPD(
  installType: string,
  circuits: any[],
  indices: number[],
  isOrigin: boolean
): SPDRecommendation {
  // Critical loads detection
  const boardCircuits = indices.map((i) => circuits[i]).filter(Boolean);
  const hasCritical = boardCircuits.some((c) => {
    const lt = String(c?.loadType ?? '').toLowerCase();
    const n = String(c?.name ?? '').toLowerCase();
    return (
      /fire-alarm|emergency-lighting|server-room|data-cabinet|access-control|cctv/i.test(lt) ||
      /fire alarm|emergency|server|data|cctv|access control|theatre|x-ray|sterilisation|life support/i.test(n)
    );
  });
  const hasElectronics = boardCircuits.some((c) => {
    const lt = String(c?.loadType ?? '').toLowerCase();
    return /office-sockets|server-room|data-cabinet|hvac|three-phase-motor|machine-tool/i.test(lt);
  });

  // BS 7671 443.4 (A4) — for typical UK domestic on overhead supply, Type 2 is now
  // the default expectation. Critical loads (medical, fire, server) push to Type 1+2.
  if (hasCritical) {
    return {
      required: true,
      type: 'Type 1+2',
      rationale:
        'Critical loads on this board (fire alarm, server, theatre or similar) — combined Type 1+2 SPD recommended at the origin to handle direct strike + transient overvoltage.',
      reg: '443.4 (A4)',
    };
  }
  if (installType === 'industrial' || hasElectronics || isOrigin) {
    return {
      required: true,
      type: 'Type 2',
      rationale: isOrigin
        ? 'Origin board — Type 2 SPD recommended at the supply origin per 443.4 risk assessment (default unless CRL is very low).'
        : 'Electronic / motor loads on this board — Type 2 SPD recommended to protect downstream equipment from switching transients.',
      reg: '443.4 (A4)',
    };
  }
  return {
    required: false,
    type: 'Type 2',
    rationale:
      'No critical loads identified on this board; SPD optional. Origin SPD provides upstream protection.',
    reg: '443.4 (A4)',
  };
}

/**
 * Resolve discrimination by upsizing the parent device until the rule-of-thumb
 * ratio is satisfied (3:1 for MCB territory, 1.6:1 for MCCB).
 *
 * Returns the resolved main switch rating + the final discrimination check.
 * No warning is emitted — the design just lands at a working state.
 *
 * BS 7671 536.4 — proper discrimination requires let-through-energy curves,
 * but the ratio rule is the standard sizing heuristic in the absence of those.
 */
function resolveDiscrimination(
  parentRating: number,
  circuits: any[],
  indices: number[]
): { resolvedMainSwitch: number; discrimination: DiscriminationCheck } {
  const childRatings = indices
    .map((i) => Number(circuits[i]?.protectionDevice?.rating ?? 0))
    .filter((r) => r > 0);

  if (childRatings.length === 0) {
    return {
      resolvedMainSwitch: parentRating,
      discrimination: {
        ok: true,
        ratio: 1,
        parentRating,
        largestChildRating: 0,
        note: 'No child devices to evaluate.',
      },
    };
  }

  const largest = Math.max(...childRatings);

  const standardSizes = [
    40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000,
  ];
  const thresholdFor = (rating: number) => (rating > 63 ? 1.6 : 3);

  // Walk up the standard sizes until ratio satisfied
  let chosen = parentRating;
  while (chosen / largest < thresholdFor(chosen)) {
    const next = standardSizes.find((s) => s > chosen);
    if (next == null) break; // ran out of sizes
    chosen = next;
  }

  const ratio = chosen / largest;
  const threshold = thresholdFor(chosen);
  const ok = ratio >= threshold;
  const upsized = chosen !== parentRating;
  const note = upsized
    ? `Parent upsized to ${chosen} A so ratio (${ratio.toFixed(1)}:1) discriminates with largest child ${largest} A.`
    : `Parent ${chosen} A discriminates with largest child ${largest} A · ratio ${ratio.toFixed(1)}:1.`;

  return {
    resolvedMainSwitch: chosen,
    discrimination: {
      ok,
      ratio,
      parentRating: chosen,
      largestChildRating: largest,
      note,
    },
  };
}

const STANDARD_MCB_RATINGS = [6, 10, 16, 20, 25, 32, 40, 50, 63];
const STANDARD_MCCB_RATINGS = [80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000];

function standardMCBRating(currentA: number): number {
  return STANDARD_MCB_RATINGS.find((r) => r >= currentA) ?? 63;
}
function standardMCCBRating(currentA: number): number {
  return STANDARD_MCCB_RATINGS.find((r) => r >= currentA) ?? 1000;
}
