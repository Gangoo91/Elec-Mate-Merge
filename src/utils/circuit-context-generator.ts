/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Circuit context generator for the "send to other agent" handoff.
 *
 * Multi-board aware: when the design carries multiple boards (origin + submains)
 * and/or three-phase, the prompt is rendered as one section per board with an
 * explicit BOARD INFRASTRUCTURE block listing enclosures, main switches,
 * submain feed cables + protection at parent, and SPDs. This is what makes the
 * cost engineer (and others) estimate the *real* job, not a phantom single-CU
 * with N ways.
 */

import { InstallationDesign } from '@/types/installation-design';
import {
  recommendBoardLayout,
  type BoardLayoutResult,
  type SubmainFeed,
} from '@/components/electrician-tools/circuit-designer/board-recommender';

export interface BoardContextSummary {
  id: string;
  name: string;
  location: string;
  isOrigin: boolean;
  phases: 'single' | 'three';
  mainSwitchRating: number;
  rcdGrouping: string;
  totalWays: number;
  diversifiedKW: number;
  designCurrentA: number;
  spd?: { type: string; rationale: string };
  feedFromParent?: {
    parentBoardName: string;
    cableSize: number;
    cableType: string;
    lengthM: number;
    protectionType: string;
    protectionRating: number;
    feedPhaseLabel: string;
  };
  // Circuits assigned to this board (with their per-board way number + phase)
  circuits: {
    wayNumber: number;
    phaseAssignment?: 'L1' | 'L2' | 'L3' | 'L1L2L3';
    name: string;
    description: string;
    keySpecs: string;
    installationNotes: string;
  }[];
}

export interface CircuitContextSummary {
  projectOverview: string;
  systemDetails: string;
  // Multi-board structure
  boards: BoardContextSummary[];
  submainFeeds: {
    parentBoardName: string;
    childBoardName: string;
    cableSize: number;
    cableType: string;
    lengthM: number;
    protectionType: string;
    protectionRating: number;
    feedPhaseLabel: string;
  }[];
  // Flat circuit list — kept for callers that want the simple view
  circuitSummaries: {
    name: string;
    description: string;
    keySpecs: string;
    installationNotes: string;
  }[];
}

const oneLine = (s: string | undefined | null): string =>
  String(s ?? '')
    .trim()
    .replace(/\s+/g, ' ');

const formatCircuit = (c: any) => ({
  name: oneLine(c.name) || `Circuit ${c.circuitNumber ?? ''}`,
  description: `${oneLine(c.loadType) || 'load'} · ${Math.round(Number(c.loadPower ?? 0))}W`,
  keySpecs: `${c.cableSize ?? '?'}mm² ${oneLine(c.cableType) || 'T&E'}, ${
    c.protectionDevice?.rating ?? '?'
  }A ${oneLine(c.protectionDevice?.type) || 'MCB'}, ${c.cableLength ?? '?'}m run`,
  installationNotes: oneLine(c.installationMethod) || 'Standard installation',
});

const buildBoards = (
  design: InstallationDesign,
  layout: BoardLayoutResult,
  selectedSet: Set<number> | null
): BoardContextSummary[] => {
  const boardById = new Map(layout.boards.map((b) => [b.id, b]));

  // Count how many submain breakers each parent board originates — these
  // sit in the parent's way grid alongside its circuits.
  const originatingFeedsByParent = new Map<string, number>();
  layout.submainFeeds.forEach((f) => {
    originatingFeedsByParent.set(
      f.parentBoardId,
      (originatingFeedsByParent.get(f.parentBoardId) ?? 0) + 1
    );
  });

  return layout.boards.map((board) => {
    const indices = selectedSet
      ? board.circuitIndices.filter((i) => selectedSet.has(i))
      : board.circuitIndices;
    const originatingCount = originatingFeedsByParent.get(board.id) ?? 0;
    const totalWays =
      indices.length + (board.feedFromParent ? 1 : 0) + originatingCount;

    return {
      id: board.id,
      name: board.name,
      location: board.location,
      isOrigin: board.isOrigin,
      phases: board.phaseBalance ? 'three' : 'single',
      mainSwitchRating: board.mainSwitchRating,
      rcdGrouping: board.rcdGrouping,
      totalWays,
      diversifiedKW: board.diversifiedLoadW / 1000,
      designCurrentA: board.designCurrentA,
      spd: board.spd?.required
        ? { type: board.spd.type, rationale: board.spd.rationale }
        : undefined,
      feedFromParent: board.feedFromParent
        ? {
            parentBoardName:
              boardById.get(board.feedFromParent.parentBoardId)?.name ??
              board.feedFromParent.parentBoardId,
            cableSize: board.feedFromParent.cableSize,
            cableType: board.feedFromParent.cableType,
            lengthM: board.feedFromParent.cableLengthEstimateM,
            protectionType: board.feedFromParent.protectionType,
            protectionRating: board.feedFromParent.protectionRating,
            feedPhaseLabel: board.feedFromParent.feedPhaseLabel,
          }
        : undefined,
      circuits: indices.map((idx, wayIdx) => {
        const c = (design as any).circuits[idx];
        return {
          wayNumber: wayIdx + 1,
          phaseAssignment: board.phaseBalance?.assignments[idx],
          ...formatCircuit(c),
        };
      }),
    };
  });
};

export const generateCircuitContext = (
  design: InstallationDesign,
  selectedCircuitIndices?: number[]
): CircuitContextSummary => {
  // Compute layout deterministically from the design — same recommender the
  // results page uses, so the agent receives the exact structure the user saw.
  const layout = recommendBoardLayout(design as any);

  const selectedSet =
    selectedCircuitIndices && selectedCircuitIndices.length > 0
      ? new Set(selectedCircuitIndices)
      : null;

  const filteredCircuits = selectedSet
    ? (design as any).circuits.filter((_: any, i: number) => selectedSet.has(i))
    : (design as any).circuits;

  const boards = buildBoards(design, layout, selectedSet);

  const boardById = new Map(layout.boards.map((b) => [b.id, b]));
  const submainFeeds = layout.submainFeeds.map((f: SubmainFeed) => ({
    parentBoardName: boardById.get(f.parentBoardId)?.name ?? f.parentBoardId,
    childBoardName: f.childBoardName,
    cableSize: f.cableSize,
    cableType: f.cableType,
    lengthM: f.cableLengthEstimateM,
    protectionType: f.protectionType,
    protectionRating: f.protectionRating,
    feedPhaseLabel: f.feedPhaseLabel,
  }));

  const supplyVoltage = (design as any).consumerUnit?.incomingSupply?.voltage ?? 230;
  const earthing = (design as any).consumerUnit?.incomingSupply?.earthingSystem ?? 'TN-C-S';
  const ze = (design as any).consumerUnit?.incomingSupply?.Ze ?? 0.35;
  const totalKW = ((design as any).totalLoad ?? 0) / 1000;
  const diversifiedKW = ((design as any).diversifiedLoad ?? 0) / 1000;

  const projectOverview =
    `${design.projectName} at ${design.location}. ` +
    `${(design as any).installationType || 'Domestic'} installation. ` +
    `${filteredCircuits.length} circuit${filteredCircuits.length === 1 ? '' : 's'} across ` +
    `${layout.boards.length} board${layout.boards.length === 1 ? '' : 's'} ` +
    `(${layout.needsThreePhase ? 'three-phase TP+N' : 'single-phase'} supply, ${earthing}, ${supplyVoltage}V).`;

  const systemDetails =
    `Connected: ${totalKW.toFixed(1)} kW · Diversified: ${diversifiedKW.toFixed(1)} kW · ` +
    `Ze: ${ze} Ω · ${layout.needsMultiBoard ? 'Multi-board layout' : 'Single board'}.`;

  return {
    projectOverview,
    systemDetails,
    boards,
    submainFeeds,
    circuitSummaries: filteredCircuits.map(formatCircuit),
  };
};

export type AgentType = 'installer' | 'rams' | 'cost-engineer' | 'method-statement' | 'maintenance';

const AGENT_REQUESTS: Record<AgentType, string> = {
  installer: 'Generate detailed installation guidance for these circuits.',
  rams: 'Generate a RAMS document covering installation of these circuits.',
  'cost-engineer':
    'Estimate materials and labour for the FULL installation: every board ' +
    '(enclosures, main switches), every submain feed (cable + glands + protection at parent ' +
    'board), every circuit (cable + protection + accessories), and any SPDs listed. Do not ' +
    'collapse multiple boards into a single CU — each board needs its own materials lines.',
  'method-statement': 'Generate a method statement for installing these circuits.',
  maintenance: 'Provide maintenance instructions and schedules for these circuits.',
};

export const formatContextForAgent = (
  context: CircuitContextSummary,
  agentType: AgentType
): string => {
  const lines: string[] = [];

  // REQUEST first — downstream estimators truncate at ~6000 chars; the
  // steering instruction has to survive truncation, so it leads.
  lines.push('REQUEST');
  lines.push(AGENT_REQUESTS[agentType]);
  lines.push('');

  lines.push('PROJECT');
  lines.push(context.projectOverview);
  lines.push(context.systemDetails);
  lines.push('');

  // ── BOARD INFRASTRUCTURE ──────────────────────────────────────────────
  // Every board, every submain, every SPD — costed line items the cost
  // engineer must include in materials.
  lines.push(
    `BOARDS (${context.boards.length} — each needs its own enclosure + main switch)`
  );
  context.boards.forEach((b, i) => {
    const phaseTag = b.phases === 'three' ? 'TP+N 3φ' : 'L+N 1φ';
    const role = b.isOrigin ? 'Origin' : 'Submain';
    lines.push(
      `  ${i + 1}. ${b.name} (${b.location}) — ${role}, ${phaseTag}, ${b.mainSwitchRating}A main, ${b.totalWays} ways used, ${b.diversifiedKW.toFixed(1)}kW`
    );
    if (b.feedFromParent) {
      lines.push(
        `     ↳ Fed from ${b.feedFromParent.parentBoardName}: ${b.feedFromParent.cableSize}mm² ${b.feedFromParent.cableType} ~${b.feedFromParent.lengthM}m, ${b.feedFromParent.feedPhaseLabel}, ${b.feedFromParent.protectionRating}A ${b.feedFromParent.protectionType} at parent`
      );
    }
    if (b.spd) lines.push(`     ↳ SPD: ${b.spd.type}`);
  });
  lines.push('');

  if (context.submainFeeds.length > 0) {
    lines.push(`SUBMAIN FEEDS (${context.submainFeeds.length} — cable + glands + protection at parent)`);
    context.submainFeeds.forEach((f, i) => {
      lines.push(
        `  ${i + 1}. ${f.parentBoardName}→${f.childBoardName}: ${f.cableSize}mm² ${f.cableType} ~${f.lengthM}m, ${f.feedPhaseLabel}, ${f.protectionRating}A ${f.protectionType}`
      );
    });
    lines.push('');
  }

  // ── CIRCUITS GROUPED BY BOARD ─────────────────────────────────────────
  // One line per circuit — keeps the per-board structure visible without
  // burning prompt budget on prose.
  lines.push('CIRCUITS (grouped by board)');
  context.boards.forEach((b) => {
    if (b.circuits.length === 0) return;
    lines.push(`  [${b.name}] ${b.circuits.length} ckt${b.circuits.length === 1 ? '' : 's'}:`);
    b.circuits.forEach((c) => {
      const phaseTag = c.phaseAssignment
        ? ` [${c.phaseAssignment === 'L1L2L3' ? '3φ' : c.phaseAssignment}]`
        : '';
      lines.push(
        `    W${String(c.wayNumber).padStart(2, '0')}${phaseTag} ${c.name} — ${c.description}; ${c.keySpecs}; ${c.installationNotes}`
      );
    });
  });

  return lines.join('\n');
};

export interface StoredCircuitContext {
  context: CircuitContextSummary;
  formattedPrompt: string;
  sourceDesign: string;
  timestamp: string;
  agentType: AgentType;
}

export const storeContextForAgent = (
  design: InstallationDesign,
  selectedCircuitIndices: number[],
  agentType: AgentType
): void => {
  const context = generateCircuitContext(design, selectedCircuitIndices);
  const formattedPrompt = formatContextForAgent(context, agentType);

  const storedContext: StoredCircuitContext = {
    context,
    formattedPrompt,
    sourceDesign: design.projectName,
    timestamp: new Date().toISOString(),
    agentType,
  };

  sessionStorage.setItem('circuit-design-context', JSON.stringify(storedContext));
};

export const getStoredCircuitContext = (): StoredCircuitContext | null => {
  const stored = sessionStorage.getItem('circuit-design-context');
  if (!stored) return null;

  try {
    return JSON.parse(stored) as StoredCircuitContext;
  } catch {
    return null;
  }
};

export const clearStoredCircuitContext = (): void => {
  sessionStorage.removeItem('circuit-design-context');
};
