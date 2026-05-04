/**
 * Indicative cost estimator for a designed circuit / board / installation.
 *
 * Three tiers:
 *   - Basic     · budget brand, basic enclosures, lower breaking capacity
 *   - Standard  · Wylex / MK 10 kA, normal accessories (default)
 *   - Premium   · Hager Volta / Schneider 25 kA, LSZH where allowed, generous spares
 *
 * Numbers are UK wholesale ballparks (NOT live prices). The display always
 * frames them as "indicative — verify with your supplier". For real prices
 * we'd hit a wholesaler API; that's a Phase 4d follow-up.
 */

export type CostTier = 'basic' | 'standard' | 'premium';

const TIER_MULTIPLIER: Record<CostTier, number> = {
  basic: 0.85,
  standard: 1.0,
  premium: 1.45,
};

// ─── Cable cost per metre (£), Standard tier baseline ────────────────────────

const CABLE_COST_PER_M_TE: Record<number, number> = {
  1.0: 0.95,
  1.5: 1.2,
  2.5: 1.85,
  4: 2.95,
  6: 4.4,
  10: 7.5,
  16: 11.5,
  25: 18.5,
  35: 26.0,
};

const CABLE_COST_PER_M_SWA: Record<number, number> = {
  2.5: 4.2,
  4: 5.5,
  6: 7.2,
  10: 9.8,
  16: 14.5,
  25: 22.0,
  35: 30.0,
  50: 42.0,
  70: 60.0,
  95: 82.0,
  120: 106.0,
};

const CABLE_COST_PER_M_FP200: Record<number, number> = {
  1.5: 4.5,
  2.5: 6.2,
  4: 9.0,
  6: 13.5,
};

const CABLE_COST_PER_M_LSZH_SINGLES: Record<number, number> = {
  1.5: 1.55,
  2.5: 2.4,
  4: 3.8,
  6: 5.7,
  10: 9.2,
  16: 14.0,
  25: 22.5,
};

function classifyCable(cableType: string): 'TE' | 'SWA' | 'FP200' | 'LSZH' | 'OTHER' {
  const t = String(cableType ?? '').toLowerCase();
  if (/fp200|fp400|micc/i.test(t)) return 'FP200';
  if (/swa|steel\s*wire\s*armoured/i.test(t)) return 'SWA';
  if (/lszh.*single|xlpe.*single/i.test(t)) return 'LSZH';
  if (/twin.*and.*earth|t\s*&\s*e|t\+e/i.test(t)) return 'TE';
  return 'OTHER';
}

function lookupCableCost(size: number, family: ReturnType<typeof classifyCable>): number {
  const table =
    family === 'SWA'
      ? CABLE_COST_PER_M_SWA
      : family === 'FP200'
        ? CABLE_COST_PER_M_FP200
        : family === 'LSZH'
          ? CABLE_COST_PER_M_LSZH_SINGLES
          : CABLE_COST_PER_M_TE;
  // Find closest size
  const sizes = Object.keys(table).map(Number).sort((a, b) => a - b);
  const exact = table[size];
  if (exact != null) return exact;
  const next = sizes.find((s) => s >= size) ?? sizes[sizes.length - 1];
  return table[next] ?? 0;
}

// ─── Protection device cost (£), Standard tier baseline ──────────────────────

function protectionCost(deviceType: string, rating: number): number {
  const t = String(deviceType ?? '').toUpperCase();
  // MCCB territory
  if (t === 'MCCB' || rating > 125) {
    if (rating <= 100) return 95;
    if (rating <= 160) return 130;
    if (rating <= 250) return 220;
    return 340;
  }
  // BS88 fuse
  if (t === 'BS88' || /BS\s?88/i.test(t)) {
    if (rating <= 32) return 18;
    if (rating <= 100) return 32;
    return 65;
  }
  // RCBO
  if (t === 'RCBO' || /RCBO/i.test(t)) {
    if (rating <= 32) return 18;
    if (rating <= 50) return 24;
    if (rating <= 100) return 36;
    return 55;
  }
  // MCB default
  if (rating <= 32) return 6;
  if (rating <= 50) return 9;
  if (rating <= 100) return 16;
  return 28;
}

// ─── Per-circuit fixed cost (connectors, glands, labour estimate baseline) ───

const PER_CIRCUIT_FIXED = 15; // wire + connectors + small materials baseline

// ─── Board enclosure cost (£), by way count, Standard tier baseline ──────────

function enclosureCost(wayCount: number, isThreePhase: boolean): number {
  if (isThreePhase) {
    // TP+N enclosures
    if (wayCount <= 4) return 220;
    if (wayCount <= 8) return 320;
    if (wayCount <= 12) return 460;
    return 620;
  }
  // 1φ split-load / RCBO-per-way
  if (wayCount <= 8) return 85;
  if (wayCount <= 14) return 110;
  if (wayCount <= 18) return 140;
  return 200;
}

// ─── Main switch / isolator cost ─────────────────────────────────────────────

function mainSwitchCost(rating: number, isThreePhase: boolean): number {
  if (isThreePhase) {
    if (rating <= 100) return 120;
    if (rating <= 200) return 220;
    return 380;
  }
  if (rating <= 100) return 25;
  if (rating <= 125) return 40;
  return 95; // MCCB territory for higher
}

// ─── Submain cost (added to parent board) ────────────────────────────────────

function submainCost(cableSize: number, lengthM: number, protectionRating: number): number {
  const cable = lookupCableCost(cableSize, 'SWA') * lengthM;
  const protection = protectionCost('MCCB', protectionRating);
  const glandsLugs = 35; // SWA glands + earthing kit + boxes
  return cable + protection + glandsLugs;
}

// ─── Aggregates ──────────────────────────────────────────────────────────────

export interface CircuitCost {
  cable: number;
  protection: number;
  fixed: number;
  total: number;
}

export interface BoardCost {
  enclosure: number;
  mainSwitch: number;
  submainFeed: number; // 0 for origin, the SWA + protection at parent for submains
  circuitsTotal: number;
  spdAllowance: number;
  total: number;
}

export interface InstallationCost {
  perCircuit: Record<number, CircuitCost>;
  perBoard: Record<string, BoardCost>;
  grandTotal: number;
  tier: CostTier;
}

export function computeCircuitCost(circuit: any, tier: CostTier): CircuitCost {
  const m = TIER_MULTIPLIER[tier];
  const family = classifyCable(circuit?.cableType ?? '');
  const size = Number(circuit?.cableSize ?? 0);
  const length = Number(circuit?.cableLength ?? 0);
  const cable = lookupCableCost(size, family) * length * m;
  const rating = Number(circuit?.protectionDevice?.rating ?? 0);
  const protection = protectionCost(circuit?.protectionDevice?.type ?? 'MCB', rating) * m;
  const fixed = PER_CIRCUIT_FIXED * m;
  return {
    cable: Math.round(cable * 100) / 100,
    protection: Math.round(protection * 100) / 100,
    fixed: Math.round(fixed * 100) / 100,
    total: Math.round((cable + protection + fixed) * 100) / 100,
  };
}

export function computeInstallationCost(
  design: any,
  layout: any,
  tier: CostTier
): InstallationCost {
  const m = TIER_MULTIPLIER[tier];
  const perCircuit: Record<number, CircuitCost> = {};
  const perBoard: Record<string, BoardCost> = {};

  const circuits = design?.circuits ?? [];
  circuits.forEach((c: any, i: number) => {
    perCircuit[i] = computeCircuitCost(c, tier);
  });

  const boards = layout?.boards ?? [];
  const submainFeeds = layout?.submainFeeds ?? [];
  const isThreePhase = boards.some((b: any) => b.phaseBalance != null);

  boards.forEach((board: any) => {
    const ways = board.circuitIndices.length;
    const enclosure = enclosureCost(ways + 4, isThreePhase) * m; // +4 spare
    const mainSwitch = mainSwitchCost(board.mainSwitchRating, isThreePhase) * m;

    let submainFeed = 0;
    if (!board.isOrigin && board.feedFromParent) {
      submainFeed =
        submainCost(
          board.feedFromParent.cableSize,
          board.feedFromParent.cableLengthEstimateM,
          board.feedFromParent.protectionRating
        ) * m;
    }

    const circuitsTotal = board.circuitIndices.reduce(
      (sum: number, idx: number) => sum + (perCircuit[idx]?.total ?? 0),
      0
    );

    // SPD if recommended
    const spdAllowance = board.spd?.required
      ? (board.spd.type === 'Type 1+2' ? 180 : 85) * m
      : 0;

    const total = enclosure + mainSwitch + submainFeed + circuitsTotal + spdAllowance;

    perBoard[board.id] = {
      enclosure: Math.round(enclosure * 100) / 100,
      mainSwitch: Math.round(mainSwitch * 100) / 100,
      submainFeed: Math.round(submainFeed * 100) / 100,
      circuitsTotal: Math.round(circuitsTotal * 100) / 100,
      spdAllowance: Math.round(spdAllowance * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  });

  void submainFeeds;

  const grandTotal = Object.values(perBoard).reduce((sum, b) => sum + b.total, 0);

  return {
    perCircuit,
    perBoard,
    grandTotal: Math.round(grandTotal * 100) / 100,
    tier,
  };
}

export const TIER_LABELS: Record<CostTier, { label: string; description: string }> = {
  basic: {
    label: 'Basic',
    description: 'Budget brand, 6 kA breaking capacity, T&E where allowed',
  },
  standard: {
    label: 'Standard',
    description: 'Wylex / MK · 10 kA · standard accessories',
  },
  premium: {
    label: 'Premium',
    description: 'Hager Volta / Schneider · 25 kA · LSZH + premium accessories',
  },
};
