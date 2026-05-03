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
const SINGLE_PHASE_LOAD_LIMIT_W = 23000; // ~100A @ 230V
const HIGH_CURRENT_THRESHOLD_A = 63;

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
      'General circuits not assigned to a specific zone. Phase 4c (floor-plan upload) will replace this catch-all with explicit room/zone tags.',
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
      'General circuits not assigned to a process area. Phase 4c (floor-plan upload) will tag circuits to specific production areas.',
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

export function recommendBoardLayout(design: any): BoardLayoutResult {
  const circuits: any[] = design?.circuits ?? [];
  const totalDiversified = Number(design?.diversifiedLoad ?? 0);
  const userSpecifiedVoltage = Number(design?.supply?.voltage ?? 230);
  const userSpecifiedPhases = String(design?.supply?.phases ?? 'single');
  const installType = String(
    design?.installationType ?? design?.projectInfo?.installationType ?? 'domestic'
  );

  const warnings: CoherenceWarning[] = [];

  // Decide whether the design needs three-phase.
  // If the user picked single-phase but the load demands three-phase, we DESIGN AS
  // THREE-PHASE — phase-balanced board, 400V submain calcs, the lot — and surface
  // a single "supply upgrade" action so the user knows to confirm with the DNO.
  const needsThreePhase =
    userSpecifiedPhases === 'single' &&
    (totalDiversified > SINGLE_PHASE_LOAD_LIMIT_W ||
      circuits.some(
        (c) =>
          Number(c?.calculations?.Ib ?? 0) > HIGH_CURRENT_THRESHOLD_A ||
          Number(c?.calculations?.Id ?? 0) > HIGH_CURRENT_THRESHOLD_A
      ));

  // Effective supply for the rest of the recommender — overridden to 3φ if needed.
  const supplyPhases = needsThreePhase ? 'three' : userSpecifiedPhases;
  const supplyVoltage = needsThreePhase ? 400 : userSpecifiedVoltage;

  // Single legitimate human-action flag: supply upgrade.
  // We've already DESIGNED as three-phase — the message tells the user the design
  // is on three-phase basis and they need to involve the DNO if the property
  // currently has single-phase service.
  if (needsThreePhase) {
    const kw = (totalDiversified / 1000).toFixed(1);
    const ib3ph = (totalDiversified / (Math.sqrt(3) * 400)).toFixed(0);
    warnings.push({
      kind: 'three-phase',
      severity: 'warn',
      title: 'Three-phase service needed',
      detail:
        `Diversified load ${kw} kW exceeds single-phase practical capacity (~23 kW @ 100 A · 230 V). ` +
        `This design has been computed on a three-phase basis — 400 V line-to-line, balanced across L1/L2/L3 (board feed ~${ib3ph} A per phase). ` +
        `If the property is currently on a single-phase service, contact your DNO to upgrade before installation. The board layout, submain sizing and load balancing below assume three-phase.`,
      reg: '525 / Section A1',
    });
  }

  const totalWays = circuits.length;

  // Multi-board fires when zone classification produces multiple zones OR when any
  // single zone exceeds MAX_WAYS_PER_BOARD. A 20-circuit domestic with everything
  // tagged 'main' stays a single board; a vet practice with reception + treatment +
  // plant naturally splits into 3 boards.
  const zoneDefsCheck = zonesFor(installType);
  const zoneIdsPresent = new Set(circuits.map((c) => classifyZone(c, zoneDefsCheck)));
  const needsMultiBoard =
    zoneIdsPresent.size > 1 || totalWays > MAX_WAYS_PER_BOARD;

  // Note: multi-board, SPD, phase imbalance, Zs corrections, high-current circuits
  // are resolved IN the design — no flagging.

  // ── Board grouping ─────────────────────────────────────────────────────
  if (!needsMultiBoard) {
    const allIndices = circuits.map((_, i) => i);
    const boardLoad = sumDiversifiedLoad(circuits, allIndices);
    const boardCurrent = needsThreePhase
      ? boardLoad / (Math.sqrt(3) * supplyVoltage)
      : boardLoad / supplyVoltage;
    // If we auto-converted to 3φ, the user's main switch rating no longer applies.
    const initialMain = needsThreePhase
      ? sizeBoardMainSwitch(boardCurrent)
      : Number(design?.consumerUnit?.mainSwitchRating ?? 100);
    const phaseBalance =
      supplyPhases === 'three' ? balancePhases(circuits, allIndices, supplyVoltage) : undefined;
    const spd = assessSPD(installType, circuits, allIndices, true);
    const { resolvedMainSwitch, discrimination } = resolveDiscrimination(
      initialMain,
      circuits,
      allIndices
    );

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

  // Bucket by zone (geographic / functional area), not by archetype.
  // Each zone holds ALL its circuits — lighting + sockets + heat + special.
  const zoneDefs = zonesFor(installType);
  const bucketsMap: Record<string, number[]> = {};
  circuits.forEach((c, i) => {
    const k = classifyZone(c, zoneDefs);
    if (!bucketsMap[k]) bucketsMap[k] = [];
    bucketsMap[k].push(i);
  });

  // Order zones by their definition order, with 'main' always first (origin).
  const orderedZones = zoneDefs
    .map((z) => z.id)
    .filter((id) => bucketsMap[id] && bucketsMap[id].length > 0)
    .sort((a) => (a === 'main' ? -1 : 1));

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
      // When we've auto-converted to 3φ, recompute the user's main rating too — their
      // original 100 A was a single-phase assumption and won't apply at 400 V 3φ.
      let boardMainSwitch: number;
      if (isOrigin) {
        if (needsThreePhase) {
          const installationCurrent = totalDiversified / (Math.sqrt(3) * 400);
          boardMainSwitch = sizeBoardMainSwitch(installationCurrent);
        } else {
          boardMainSwitch = mainRating;
        }
      } else {
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
        supplyPhases === 'three' ? balancePhases(circuits, chunk, supplyVoltage) : undefined;
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

function sizeBoardMainSwitch(currentA: number): number {
  if (currentA <= 32) return 40;
  if (currentA <= 50) return 63;
  if (currentA <= 80) return 100;
  if (currentA <= 100) return 125;
  if (currentA <= 125) return 160;
  if (currentA <= 160) return 200;
  if (currentA <= 200) return 250;
  return Math.ceil(currentA / 10) * 10;
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
    rationale:
      `Submain to ${args.childBoardName} · ${loadKW} kW ${phaseDescriptor} = ${designCurrentA.toFixed(1)} A. ` +
      `${protectionRating}A ${protectionType}${protectionCurve ? ` Type ${protectionCurve}` : ''} ` +
      `${protectionKa} kA at parent feeds ${parallelDesc}${chosen.size} mm² ${coreCount} SWA over ~${lengthEstimate} m · ` +
      `Iz ${chosen.iz * parallelRuns} A · Vd ${vdPercent.toFixed(2)}% (Tables 4D4A / 4D4B).`,
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
 * Returns aggregate phase loads + per-circuit phase assignments so the
 * board schedule can label each way.
 */
function balancePhases(circuits: any[], indices: number[], voltage: number): PhaseBalance {
  const phases = { L1_W: 0, L2_W: 0, L3_W: 0 };
  const assignments: Record<number, 'L1' | 'L2' | 'L3' | 'L1L2L3'> = {};
  // Sort by load DESC for greedy LPT (longest processing time) balancing
  const sorted = [...indices].sort(
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
      // Pick the least-loaded phase
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
 *   3φ parent + child has any 3φ load  →  TP+N
 *   3φ parent + child < 11.5 kW + only 1φ loads  →  L+N (single-phase submain)
 *                                                    saves cable cost vs 4-core SWA
 *   3φ parent + child ≥ 11.5 kW  →  TP+N (lets you balance internally)
 */
function decideSubmainPhases(
  parentSupplyPhases: string,
  childCircuits: any[],
  childIndices: number[],
  childDiversifiedW: number
): 'three' | 'single' {
  if (parentSupplyPhases !== 'three') return 'single';
  const hasThreePhaseChild = childIndices.some((i) => childCircuits[i]?.phases === 'three');
  if (hasThreePhaseChild) return 'three';
  if (childDiversifiedW > 11500) return 'three';
  return 'single';
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
