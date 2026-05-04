/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Editorial Design Results — Phase 4a rebuild.
 *
 * Replaces the icon-heavy, shadcn-card-stacked DesignReviewEditor with a
 * cohesive editorial surface that matches the wizard + streaming pages:
 * mobile-flat, no icons, full max-width with scaling gutters, numbered cells,
 * eyebrows, yellow + white headlines with periods, tabular nums, reg cite
 * chips, and a visual CU schedule.
 *
 * Surfaces A4:2026 features (AFDD, SPD, Open-PEN, Section 7xx) derived
 * from the regulation_refs the AI now cites for every circuit (Phase 3).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { storeContextForAgent, type AgentType } from '@/utils/circuit-context-generator';
import { generateEICSchedule } from '@/lib/eic/scheduleGenerator';
import { downloadEICPDF } from '@/lib/eic/pdfGenerator';
import { openOrDownloadPdf } from '@/utils/pdf-download';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { EditableField } from './EditableField';
import {
  validateCableSizeChange,
  validateProtectionRatingChange,
  validateProtectionCurveChange,
  validateLengthChange,
  validateNameChange,
  validateCableTypeChange,
  validateCpcSizeChange,
  validateInstallationMethodChange,
  validateDiversityFactorChange,
  validateSpecialLocationChange,
  validateNotesChange,
  getAllowedCableTypes,
  INSTALLATION_METHODS,
  SPECIAL_LOCATIONS,
  CABLE_SIZE_OPTIONS,
  CPC_SIZE_OPTIONS,
  PROTECTION_RATING_OPTIONS,
  checkTier4Lock,
  recomputeDerivedFields,
  attemptAutoFix,
  type EditHistory,
} from './circuit-edit-validator';
import {
  recommendBoardLayout,
  type BoardRecommendation,
  type CoherenceWarning,
  type SubmainFeed,
} from './board-recommender';
import {
  computeInstallationCost,
  TIER_LABELS,
  type CostTier,
  type InstallationCost,
} from './cost-calculator';

interface EditorialDesignResultsProps {
  design: any;
  onReset?: () => void;
}

type CircuitStatus = 'pass' | 'review';

const getCircuitStatus = (circuit: any): CircuitStatus => {
  if (!circuit) return 'pass';
  if (circuit?.compliance_pass === false) return 'review';
  if (Array.isArray(circuit?.ungrounded_choices) && circuit.ungrounded_choices.length > 0)
    return 'review';
  if (Array.isArray(circuit?.warnings) && circuit.warnings.length > 0) return 'review';
  if (circuit?.calculations?.voltageDrop?.compliant === false) return 'review';
  const zs = Number(circuit?.calculations?.zs ?? 0);
  const maxZs = Number(circuit?.calculations?.maxZs ?? Infinity);
  if (zs > 0 && maxZs > 0 && zs > maxZs) return 'review';
  return 'pass';
};

/**
 * Compliance score per circuit (0-100%). Derived from how thoroughly the
 * design is grounded vs how many concerns surfaced.
 *
 *   Start at 100.
 *   −15 per ungrounded_choice (honest signal — AI couldn't ground a choice)
 *   −10 per non-empty warning array
 *   −10 if voltageDrop.compliant === false
 *   −10 if Zs > maxZs
 *   −5  per tripwire correction that fired on this circuit (Zs / cable type / ring Vd / voltage)
 *   +5  per regulation_ref above the minimum 2 (capped at +15)
 *
 *   Floor at 35, cap at 100.
 */
function getComplianceScore(circuit: any, design: any): number {
  if (!circuit) return 100;
  let score = 100;

  const ungrounded = Array.isArray(circuit?.ungrounded_choices)
    ? circuit.ungrounded_choices.length
    : 0;
  score -= ungrounded * 15;

  const warnings = Array.isArray(circuit?.warnings) ? circuit.warnings.length : 0;
  if (warnings > 0) score -= 10;

  if (circuit?.calculations?.voltageDrop?.compliant === false) score -= 10;

  const zs = Number(circuit?.calculations?.zs ?? 0);
  const maxZs = Number(circuit?.calculations?.maxZs ?? Infinity);
  if (zs > 0 && maxZs > 0 && zs > maxZs) score -= 10;

  // Tripwire corrections — check by circuit name or number
  const cnum = circuit.circuitNumber;
  const cname = circuit.name;
  const matchesThis = (c: any): boolean =>
    (cnum != null && c?.circuitNumber === cnum) || (cname != null && c?.circuitName === cname);

  const tripwires = [
    Array.isArray(design?.zsCorrections) && design.zsCorrections.some(matchesThis),
    Array.isArray(design?.cableTypeCorrections) && design.cableTypeCorrections.some(matchesThis),
    Array.isArray(design?.ringVdCorrections) && design.ringVdCorrections.some(matchesThis),
    Array.isArray(design?.voltageCorrections) && design.voltageCorrections.some(matchesThis),
  ].filter(Boolean).length;
  score -= tripwires * 5;

  const regCount = Array.isArray(circuit?.regulation_refs) ? circuit.regulation_refs.length : 0;
  if (regCount > 2) score += Math.min(15, (regCount - 2) * 5);

  return Math.max(35, Math.min(100, Math.round(score)));
}

interface CircuitContext {
  boardName: string;
  boardId: string;
  wayNumber: number;          // local to its board (1-N), accounts for submain feeds
  phaseAssignment?: 'L1' | 'L2' | 'L3' | 'L1L2L3';
}

/** A slot in a board's way grid — either a real circuit, or a user-added spare. */
export type WayItem =
  | { kind: 'circuit'; circuitIdx: number; key: string }
  | { kind: 'spare'; spareId: string; key: string };

/**
 * Map a global circuit index to its board context — board name + local way
 * number within that board (resets to 1 per board, accounts for submain
 * feed slots that appear before circuits in the way grid).
 */
/**
 * Apply a flat dot-path edit map onto a circuit. Used both for rendering
 * (memoised circuits = base + edits) and for derived recomputation.
 */
function applyEditsToCircuit(base: any, edits: Record<string, unknown>): any {
  if (!edits || Object.keys(edits).length === 0) return base;
  const next = { ...base };
  for (const [key, val] of Object.entries(edits)) {
    if (key.includes('.')) {
      const parts = key.split('.');
      let target: any = next;
      for (let p = 0; p < parts.length - 1; p++) {
        target[parts[p]] = { ...(target[parts[p]] ?? {}) };
        target = target[parts[p]];
      }
      target[parts[parts.length - 1]] = val;
    } else {
      (next as any)[key] = val;
    }
  }
  return next;
}

function buildCircuitContextMap(
  boards: BoardRecommendation[],
  submainFeeds: SubmainFeed[],
  boardNameOverrides: Record<string, string> = {}
): Map<number, CircuitContext> {
  const ctx = new Map<number, CircuitContext>();
  const feedsByParent = new Map<string, number>();
  submainFeeds.forEach((f) => {
    feedsByParent.set(f.parentBoardId, (feedsByParent.get(f.parentBoardId) ?? 0) + 1);
  });

  boards.forEach((board) => {
    const feedSlotCount = feedsByParent.get(board.id) ?? 0;
    const displayName = boardNameOverrides[board.id] ?? board.name;
    board.circuitIndices.forEach((circuitIdx, localIdx) => {
      ctx.set(circuitIdx, {
        boardName: displayName,
        boardId: board.id,
        wayNumber: feedSlotCount + localIdx + 1,
        phaseAssignment: board.phaseBalance?.assignments[circuitIdx],
      });
    });
  });
  return ctx;
}

// Pull a compact list of cited regs from a circuit. Phase 3 schema guarantees
// regulation_refs[] with at least 2 items; fall back to scraping justification
// prose if the field is absent (older cached jobs).
const getRegRefs = (circuit: any): { reg: string; reason?: string }[] => {
  if (Array.isArray(circuit?.regulation_refs)) {
    return circuit.regulation_refs
      .filter((r: any) => r?.reg)
      .map((r: any) => ({ reg: String(r.reg), reason: r.reason }));
  }
  return [];
};

// A4 feature derivation from regulation_refs across all circuits.
const deriveA4Features = (circuits: any[]) => {
  const allRefs = circuits.flatMap((c) =>
    getRegRefs(c).map((r) => ({ ...r, circuit: c.name, idx: c.circuitNumber }))
  );

  const matches = (pattern: RegExp) => allRefs.filter((r) => pattern.test(r.reg));

  const afddRefs = matches(/^421\.1\.7/);
  const spdRefs = matches(/^443\./);
  const openPenRefs = matches(/^(411\.4\.5|722\.411\.4)/);
  const tnCsTtRcdRefs = matches(/^411\.5/);
  const evRefs = matches(/^722\./);
  const specialLocations = circuits
    .map((c) => c.specialLocation)
    .filter((s) => s && s !== 'none');
  const section7xx = matches(/^7\d{2}\./);

  return {
    afddCount: new Set(afddRefs.map((r) => r.idx)).size,
    spdRecommended: spdRefs.length > 0,
    openPenFlagged: openPenRefs.length > 0,
    ttRcdApplied: tnCsTtRcdRefs.length > 0,
    evCount: new Set(evRefs.map((r) => r.idx)).size,
    specialLocationsApplied: Array.from(new Set(specialLocations)),
    section7xxRefs: section7xx.length,
  };
};

const EditorialDesignResults = ({ design, onReset }: EditorialDesignResultsProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isSendingToEIC, setIsSendingToEIC] = useState(false);

  // User edits — applied on top of the AI design. Each entry is the diff
  // for one circuit. Audit trail kept in editHistory so the UI can show
  // edited indicators + "reset to AI design".
  const [edits, setEdits] = useState<Record<number, Record<string, unknown>>>({});
  const [editHistory, setEditHistory] = useState<EditHistory>({});

  // Structural overrides — way reorder per board, deletions, and spares.
  const [wayOrders, setWayOrders] = useState<Record<string, WayItem[]>>({});
  const [deletedCircuits, setDeletedCircuits] = useState<Set<number>>(new Set());
  const [spareWays, setSpareWays] = useState<Record<string, { id: string; name?: string }[]>>({});

  // User-supplied board references — e.g. rename "Main CU" → "DB-01".
  // Survives layout recomputation (keyed by stable board id).
  const [boardReferences, setBoardReferences] = useState<Record<string, string>>({});
  const setBoardReference = (boardId: string, ref: string) => {
    setBoardReferences((prev) => ({ ...prev, [boardId]: ref }));
  };
  const getBoardDisplayName = useCallback(
    (boardId: string, fallback: string) => boardReferences[boardId] ?? fallback,
    [boardReferences]
  );

  // ── Manual board overrides ─────────────────────────────────────────────
  // The recommender's heuristic is good but not infallible. Three primitives
  // give the user full control:
  //   • Add a new (empty) board → user can move circuits onto it (split).
  //   • Move a circuit between boards → reassigns directly.
  //   • Merge a board into main → moves all its circuits + drops the board.
  const [userCreatedBoards, setUserCreatedBoards] = useState<
    Array<{ id: string; name: string; location: string }>
  >([]);
  const [circuitBoardOverrides, setCircuitBoardOverrides] = useState<
    Record<number, string>
  >({});

  const addUserBoard = (name: string, location: string) => {
    const id = `user-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    setUserCreatedBoards((prev) => [...prev, { id, name, location }]);
    toast.success(`Board added: ${name}`, {
      description: 'Move circuits onto it from the schedule.',
    });
    return id;
  };

  const moveCircuitToBoard = (circuitIdx: number, targetBoardId: string) => {
    setCircuitBoardOverrides((prev) => ({ ...prev, [circuitIdx]: targetBoardId }));
  };

  const mergeBoardIntoMain = (boardId: string, circuitIndices: number[]) => {
    if (boardId === 'main') return;
    setCircuitBoardOverrides((prev) => {
      const next = { ...prev };
      circuitIndices.forEach((i) => {
        next[i] = 'main';
      });
      return next;
    });
    // If it was a user-created board, also strip it from the user list so it
    // doesn't survive as an empty placeholder.
    setUserCreatedBoards((prev) => prev.filter((b) => b.id !== boardId));
    toast.success('Board merged into main', { description: 'Tap undo to revert.' });
  };

  const hasManualBoardEdits =
    userCreatedBoards.length > 0 ||
    Object.keys(circuitBoardOverrides).length > 0;

  const baseCircuits = design?.circuits ?? [];
  const circuits = useMemo(
    () => baseCircuits.map((c: any, i: number) => applyEditsToCircuit(c, edits[i] ?? {})),
    [baseCircuits, edits]
  );
  const totalCircuits = circuits.length;
  const activeCircuit = circuits[selectedIdx] ?? circuits[0];

  /**
   * Apply an edit + record in history. After persisting the user's value,
   * recompute derived calculation fields (Iz, Vd, maxZs, In) so the visible
   * outputs stay coherent with the inputs the user just changed.
   */
  const applyEdit = (circuitIdx: number, field: string, after: unknown) => {
    setEdits((prev) => {
      const nextCircuitEdits = { ...(prev[circuitIdx] ?? {}), [field]: after };
      // Build a temporary merged circuit so recomputeDerivedFields can read
      // the post-edit state and emit fresh Iz / Vd / maxZs / In.
      const baseCircuit = baseCircuits[circuitIdx];
      const merged = applyEditsToCircuit(baseCircuit, nextCircuitEdits);
      const derivedPatch = recomputeDerivedFields(merged);
      return {
        ...prev,
        [circuitIdx]: { ...nextCircuitEdits, ...derivedPatch },
      };
    });
    setEditHistory((prev) => {
      const before = (() => {
        const c = baseCircuits[circuitIdx];
        if (!field.includes('.')) return (c as any)?.[field];
        return field.split('.').reduce((acc: any, p) => acc?.[p], c);
      })();
      return {
        ...prev,
        [circuitIdx]: [
          ...(prev[circuitIdx] ?? []),
          { field, before, after, editedAt: Date.now() },
        ],
      };
    });
  };

  const resetEdits = () => {
    setEdits({});
    setEditHistory({});
    setWayOrders({});
    setDeletedCircuits(new Set());
    setSpareWays({});
    setBoardReferences({});
    setUserCreatedBoards([]);
    setCircuitBoardOverrides({});
    toast.success('Reverted to AI design', {
      description: 'All your edits, deletions, reorders, and board overrides removed.',
    });
  };

  const totalEditedCircuits = Object.keys(edits).length;

  // ─── Structural mutations ────────────────────────────────────────────────

  /** Compute the effective way order for a board, given user overrides. */
  const getWayOrder = useCallback(
    (boardId: string, defaultIndices: number[]): WayItem[] => {
      if (wayOrders[boardId]) return wayOrders[boardId];
      // Build default: real circuits in AI order (skip deleted) + appended spares
      const items: WayItem[] = [];
      defaultIndices.forEach((idx) => {
        if (!deletedCircuits.has(idx)) {
          items.push({ kind: 'circuit', circuitIdx: idx, key: `c-${idx}` });
        }
      });
      (spareWays[boardId] ?? []).forEach((s) => {
        items.push({ kind: 'spare', spareId: s.id, key: `s-${s.id}` });
      });
      return items;
    },
    [wayOrders, deletedCircuits, spareWays]
  );

  /** User reordered ways within a board. Persist as override. */
  const setBoardWayOrder = (boardId: string, items: WayItem[]) => {
    setWayOrders((prev) => ({ ...prev, [boardId]: items }));
  };

  /** Append a spare way to a board. */
  const addSpareWay = (boardId: string) => {
    const id = `spare-${boardId}-${Date.now().toString(36)}`;
    setSpareWays((prev) => ({
      ...prev,
      [boardId]: [...(prev[boardId] ?? []), { id }],
    }));
    // If a custom order exists for this board, append the spare to it
    setWayOrders((prev) => {
      if (!prev[boardId]) return prev;
      return {
        ...prev,
        [boardId]: [...prev[boardId], { kind: 'spare', spareId: id, key: `s-${id}` }],
      };
    });
    toast.success('Spare way added', { description: 'Tap the spare to assign a circuit.' });
  };

  /** Delete a real circuit way (with undo via toast). */
  const deleteCircuit = (circuitIdx: number, circuitName: string) => {
    setDeletedCircuits((prev) => {
      const next = new Set(prev);
      next.add(circuitIdx);
      return next;
    });
    // Trim from any custom order
    setWayOrders((prev) => {
      const next = { ...prev };
      for (const [bid, items] of Object.entries(next)) {
        next[bid] = items.filter((it) => !(it.kind === 'circuit' && it.circuitIdx === circuitIdx));
      }
      return next;
    });
    toast(`${circuitName} deleted`, {
      description: 'Tap to undo within 5 s.',
      action: {
        label: 'Undo',
        onClick: () => {
          setDeletedCircuits((prev) => {
            const next = new Set(prev);
            next.delete(circuitIdx);
            return next;
          });
          // Restore by clearing custom orders for affected boards (so they default-rebuild)
          setWayOrders({});
          toast.success(`${circuitName} restored`);
        },
      },
      duration: 5000,
    });
  };

  /** Delete a spare way (no confirmation needed — it's empty). */
  const deleteSpare = (boardId: string, spareId: string) => {
    setSpareWays((prev) => ({
      ...prev,
      [boardId]: (prev[boardId] ?? []).filter((s) => s.id !== spareId),
    }));
    setWayOrders((prev) => {
      if (!prev[boardId]) return prev;
      return {
        ...prev,
        [boardId]: prev[boardId].filter((it) => !(it.kind === 'spare' && it.spareId === spareId)),
      };
    });
  };

  const hasStructuralEdits =
    Object.keys(wayOrders).length > 0 ||
    deletedCircuits.size > 0 ||
    Object.keys(spareWays).length > 0;

  const stats = useMemo(() => {
    const totalLoad = Number(design?.totalLoad ?? 0);
    const diversifiedLoad = Number(design?.diversifiedLoad ?? 0);
    const factor = Number(design?.diversityFactor ?? 0);
    const totalIb = circuits.reduce(
      (sum: number, c: any) => sum + Number(c?.calculations?.Ib ?? 0),
      0
    );
    const passCount = circuits.filter((c: any) => getCircuitStatus(c) === 'pass').length;
    return { totalLoad, diversifiedLoad, factor, totalIb, passCount };
  }, [design, circuits]);

  const a4 = useMemo(() => deriveA4Features(circuits), [circuits]);

  // Phase overrides — extracted from edits, threaded into the recommender so
  // user phase reassignments are honoured by the balancer.
  const phaseOverrides = useMemo(() => {
    const map: Record<number, 'L1' | 'L2' | 'L3'> = {};
    for (const [idx, e] of Object.entries(edits)) {
      const v = (e as any)?.phaseAssignment;
      if (v === 'L1' || v === 'L2' || v === 'L3') {
        map[Number(idx)] = v;
      }
    }
    return map;
  }, [edits]);

  const layout = useMemo(
    () =>
      recommendBoardLayout(design, {
        phaseOverrides,
        userCreatedBoards,
        circuitBoardOverrides,
      }),
    [design, phaseOverrides, userCreatedBoards, circuitBoardOverrides]
  );

  // ─── Cost tier ─────────────────────────────────────────────────────────
  // Indicative ballparks at three brand/quality tiers. Pure frontend —
  // re-runs on every tier flip without re-invoking the AI.
  const [costTier, setCostTier] = useState<CostTier>('standard');
  const cost = useMemo(
    () => computeInstallationCost({ ...design, circuits }, layout, costTier),
    [design, circuits, layout, costTier]
  );

  const supply = design?.supply || {};
  const installType = design?.installationType || design?.projectInfo?.installationType || 'domestic';
  const projectName = design?.projectName || design?.projectInfo?.projectName || 'Untitled';
  const location = design?.location || design?.projectInfo?.location || '—';

  const circuitContext = useMemo(
    () => buildCircuitContextMap(layout.boards, layout.submainFeeds, boardReferences),
    [layout, boardReferences]
  );

  // Sticky mini-header reveal — fires when the hero scrolls out of view.
  const [showMiniHeader, setShowMiniHeader] = useState(false);
  const heroSentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = heroSentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setShowMiniHeader(!entry.isIntersecting), {
      rootMargin: '-48px 0px 0px 0px',
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Mobile actions sheet
  const [actionsOpen, setActionsOpen] = useState(false);

  // Track which board is currently in view so the sticky switcher can highlight it.
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-board-id]');
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to top of viewport that's actively intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveBoardId(visible[0].target.getAttribute('data-board-id'));
      },
      { rootMargin: '-100px 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [layout.boards.length]);

  // ─────────── Action handlers (carried over from DesignReviewEditor) ───────────

  const handleExportPDF = async () => {
    setIsExporting(true);
    const loadingToast = toast.loading('Building PDF schedule…');
    try {
      const { data, error } = await supabase.functions.invoke('generate-circuit-design-pdf', {
        body: { design, userId: user?.id },
      });
      if (error) throw error;
      if (data?.url) {
        await openOrDownloadPdf(data.url, `${projectName} — Design Schedule.pdf`);
        toast.success('PDF downloaded', { id: loadingToast });
        return;
      }
      // Fallback: client-side jsPDF
      const schedule = generateEICSchedule(circuits, design, design?.projectInfo);
      downloadEICPDF(schedule, `${projectName} — Design Schedule.pdf`);
      toast.success('PDF downloaded (fallback)', { id: loadingToast });
    } catch (err: any) {
      try {
        const schedule = generateEICSchedule(circuits, design, design?.projectInfo);
        downloadEICPDF(schedule, `${projectName} — Design Schedule.pdf`);
        toast.success('PDF downloaded (offline build)', { id: loadingToast });
      } catch (fallbackErr) {
        toast.error('PDF generation failed', {
          id: loadingToast,
          description: err?.message ?? 'Please try again',
        });
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleSendToEIC = async () => {
    setIsSendingToEIC(true);
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) throw new Error('Not authenticated');
      const installationId = crypto.randomUUID();

      // Build distributionBoards in the shape the EIC certificate form already
      // understands (src/types/distributionBoard.ts). One entry per board in the
      // recommended layout: origin first (order 0), then submains.
      // Count submain breakers occupying ways on each PARENT board so the
      // total-ways figure includes the outgoing submain feeds too.
      const originatingFeedsByParent = new Map<string, number>();
      layout.submainFeeds.forEach((f) => {
        originatingFeedsByParent.set(
          f.parentBoardId,
          (originatingFeedsByParent.get(f.parentBoardId) ?? 0) + 1
        );
      });
      const distributionBoards = layout.boards.map((b, idx) => {
        const isThreePhase = !!b.phaseBalance;
        const submainPolesLabel = b.feedFromParent
          ? b.feedFromParent.feedPhases === 'three'
            ? 'TPN'
            : 'DP'
          : '';
        const originatingCount = originatingFeedsByParent.get(b.id) ?? 0;
        const effectiveName = boardReferences[b.id] ?? b.name;
        return {
          id: b.id,
          name: effectiveName,
          reference: effectiveName,
          location: b.location,
          order: idx,
          // Verification placeholders (filled on-site)
          zdb: '',
          ipf: '',
          confirmedCorrectPolarity: false,
          confirmedPhaseSequence: isThreePhase,
          ringFinalCircuitConfirmed: false,
          spdOperationalStatus: !!b.spd?.required,
          spdNA: !b.spd?.required,
          spdT1: b.spd?.required && b.spd.type.includes('1'),
          spdT2: b.spd?.required && b.spd.type.includes('2'),
          spdT3: b.spd?.required && b.spd.type.includes('3'),
          // Real ways used = own circuits + the feed coming IN (1 way) +
          // the feeds going OUT to submains (each costs a way on this board).
          // +4 spare per BS 7671 514.9.1 / Best Practice headroom.
          totalWays: b.circuitIndices.length + (b.feedFromParent ? 1 : 0) + originatingCount + 4,
          // Schedule headers — populated for submains
          suppliedFrom: b.feedFromParent ? b.feedFromParent.parentBoardId : undefined,
          incomingDeviceBsEn: b.feedFromParent
            ? b.feedFromParent.protectionType === 'MCCB'
              ? 'BS EN 60947-2'
              : b.feedFromParent.protectionType === 'BS88'
                ? 'BS 88'
                : 'BS EN 60898'
            : undefined,
          incomingDeviceType: b.feedFromParent?.protectionType,
          incomingDeviceRating: b.feedFromParent
            ? String(b.feedFromParent.protectionRating)
            : undefined,
          // Main switch on this board
          mainSwitchType: b.isOrigin ? 'Main Switch' : 'Isolator',
          mainSwitchRating: String(b.mainSwitchRating),
          mainSwitchPoles: isThreePhase ? 'TPN' : submainPolesLabel || 'DP',
        };
      });

      const scheduleOfTests = circuits.map((c: any, i: number) => {
        const ctx = circuitContext.get(i);
        return {
          id: `design-${i + 1}`,
          boardId: ctx?.boardId ?? layout.boards[0]?.id,
          wayNumber: ctx?.wayNumber ?? i + 1,
          phaseAssignment: ctx?.phaseAssignment ?? null,
          circuitNumber: c.circuitNumber ?? i + 1,
          circuitDescription: c.name,
          name: c.name,
          loadType: c.loadType,
          loadPower: c.loadPower,
          phases: c.phases,
          phaseType: c.phases === 'three' ? 'three-phase' : 'single-phase',
          voltage: c.voltage,
          cableSize: c.cableSize,
          liveSize: String(c.cableSize ?? ''),
          cpcSize: String(c.cpcSize ?? ''),
          cableType: c.cableType,
          cableLength: c.cableLength,
          referenceMethod: c.installationMethod ?? '',
          installationMethod: c.installationMethod,
          protectionDevice: c.protectionDevice,
          protectiveDeviceType: c.protectionDevice?.type,
          protectiveDeviceCurve: c.protectionDevice?.curve,
          protectiveDeviceRating: c.protectionDevice?.rating
            ? String(c.protectionDevice.rating)
            : undefined,
          protectiveDeviceKaRating: c.protectionDevice?.breakingCapacityKa
            ? String(c.protectionDevice.breakingCapacityKa)
            : undefined,
          bsStandard:
            c.protectionDevice?.type === 'RCBO'
              ? 'BS EN 61009'
              : c.protectionDevice?.type === 'MCCB'
                ? 'BS EN 60947-2'
                : c.protectionDevice?.type === 'BS88'
                  ? 'BS 88'
                  : 'BS EN 60898',
          // Expected calculation values (pre-fill, the inspector overrides on-site)
          r1r2: c.calculations?.r1r2,
          zs: c.calculations?.zs,
          maxZs: c.calculations?.maxZs,
          rcdRating: c.protectionDevice?.rcdRating,
          calculations: c.calculations,
          expectedTests: c.expectedTests,
          regulation_refs: c.regulation_refs,
          cable_table_ref: c.cable_table_ref,
          ungrounded_choices: c.ungrounded_choices,
          justifications: c.justifications,
          specialLocation: c.specialLocation,
          rcdProtected: c.rcdProtected,
        };
      });

      const scheduleData: any = {
        // ── Multi-board structure (NEW — preserves the layout sent from designer) ──
        distributionBoards,
        scheduleOfTests,
        boards: layout.boards,
        submainFeeds: layout.submainFeeds,
        // ── Legacy flat fields (kept so older readers still work) ──
        circuits: scheduleOfTests,
        supply,
        consumerUnit: design?.consumerUnit,
        projectInfo: design?.projectInfo,
        diversityBreakdown: design?.diversityBreakdown,
        totalLoad: stats.totalLoad,
        diversifiedLoad: stats.diversifiedLoad,
        diversityFactor: stats.factor,
        validationPassed: design?.validationPassed,
      };
      const { data: schedule, error } = await supabase
        .from('eic_schedules' as any)
        .insert({
          user_id: authData.user.id,
          installation_address: location || projectName,
          installation_id: installationId,
          designer_name: design?.electricianName || 'Circuit Designer AI',
          design_date: new Date().toISOString().split('T')[0],
          schedule_data: scheduleData,
          status: 'pending',
        })
        .select()
        .single();
      if (error) throw error;
      toast.success('Sent to EIC schedule', {
        description: `Reference ${(schedule as any)?.id?.slice(0, 8) ?? 'created'}`,
      });
    } catch (err: any) {
      toast.error('Failed to send to EIC', { description: err?.message ?? 'Please try again' });
    } finally {
      setIsSendingToEIC(false);
    }
  };

  const sendToAgent = (agentType: AgentType) => {
    try {
      const indices = circuits.map((_: any, i: number) => i);
      storeContextForAgent(design, indices, agentType);
      const routes: Record<AgentType, string> = {
        'cost-engineer': '/electrician/cost-engineer',
        rams: '/electrician/health-safety',
        'method-statement': '/electrician/method-statement',
        maintenance: '/electrician/maintenance',
        installer: '/electrician/installation-specialist',
      };
      navigate(routes[agentType]);
      toast.success(`Sent to ${agentType.replace('-', ' ')}`, {
        description: `${indices.length} circuit${indices.length === 1 ? '' : 's'} ready for processing`,
      });
    } catch (err: any) {
      toast.error('Failed to send context', { description: err?.message });
    }
  };

  // ─────────── Render ───────────

  return (
    <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky header — sits BELOW the main app header (ELE-869). Main
          header is fixed top-0 z-50; this sub-header sticks at
          var(--header-height) with a lower z-index so content scrolls
          cleanly under the banner. */}
      <div
        className="sticky z-30 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]"
        style={{ top: 'var(--header-height, 56px)' }}
      >
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-4 sm:gap-6">
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                aria-label="Start a new design"
                className="flex items-center gap-2 text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>New design</span>
              </button>
            )}
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white">
              <span
                className={cn(
                  'inline-block h-2 w-2 rounded-full',
                  totalEditedCircuits > 0 || hasStructuralEdits ? 'bg-elec-yellow' : 'bg-emerald-400'
                )}
              />
              {totalEditedCircuits > 0 || hasStructuralEdits
                ? totalEditedCircuits > 0
                  ? `${totalEditedCircuits} edit${totalEditedCircuits === 1 ? '' : 's'}`
                  : 'Modified'
                : 'Design complete'}
            </span>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.18em] text-white/75">
                Specialist
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                {projectName}
              </h1>
            </div>
            {(totalEditedCircuits > 0 || hasStructuralEdits) && (
              <button
                type="button"
                onClick={resetEdits}
                className="hidden sm:inline-flex items-center text-[11px] font-semibold text-white/75 hover:text-elec-yellow border border-white/15 hover:border-elec-yellow/40 rounded-full px-2.5 py-0.5 transition-colors touch-manipulation"
              >
                Reset to AI
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sticky board switcher — mobile, ≥3 boards. Sits directly below the main header. */}
      {layout.boards.length >= 3 && (
        <StickyBoardSwitcher
          boards={layout.boards}
          activeBoardId={activeBoardId}
          onJump={(boardId) => {
            const target = document.getElementById(`board-${boardId}`);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />
      )}

      {/* Sticky mini-header — reveals when scrolled past hero. Stacks below
          the board switcher on mobile when both visible. */}
      <StickyMiniHeader
        visible={showMiniHeader}
        circuit={activeCircuit}
        context={circuitContext.get(selectedIdx)}
        offsetWhenSwitcherPresent={layout.boards.length >= 3}
      />

      <main className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* COHERENCE BANNER — surfaces multi-board, three-phase, Zs corrections etc. */}
        <CoherenceBanner warnings={layout.warnings} />

        {/* DESIGN AUDIT — multi-pass critique loop output */}
        {design?.criticReview && <DesignAuditSection review={design.criticReview} />}

        {/* HERO */}
        <section className="space-y-3">
          <Eyebrow>RESULTS</Eyebrow>
          <h2 className="text-[40px] sm:text-[48px] lg:text-[60px] font-semibold tracking-tight leading-[1.05]">
            <span className="text-elec-yellow">Design</span>{' '}
            <span className="text-white">complete.</span>
          </h2>
          <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-white/85 max-w-2xl">
            {totalCircuits} circuit{totalCircuits === 1 ? '' : 's'} designed against BS 7671:2018+A4:2026.
            Every numeric choice is grounded in the regulations and Appendix 4 cable tables.
          </p>
          {/* Sentinel for sticky-header reveal */}
          <div ref={heroSentinelRef} className="h-px w-px" aria-hidden />
        </section>

        {/* PROJECT META STRIP */}
        <ProjectMetaStrip
          projectName={projectName}
          location={location}
          installType={installType}
          supply={supply}
          totalCircuits={totalCircuits}
        />

        {/* HEADLINE STATS */}
        <HeadlineStats stats={stats} totalCircuits={totalCircuits} cost={cost} />

        {/* COST TIER PICKER */}
        <CostTierPicker tier={costTier} onChange={setCostTier} cost={cost} />

        {/* A4:2026 FEATURES PANEL */}
        <A4FeaturesPanel a4={a4} earthingSystem={supply.earthingSystem} />

        {/* VISUAL CU SCHEDULE — multi-board recommendation */}
        <RecommendedBoardsView
          boards={layout.boards}
          submainFeeds={layout.submainFeeds}
          circuits={circuits}
          needsMultiBoard={layout.needsMultiBoard}
          cost={cost}
          getBoardDisplayName={getBoardDisplayName}
          onBoardReferenceChange={setBoardReference}
          onAddBoard={addUserBoard}
          onMergeBoardIntoMain={mergeBoardIntoMain}
        />

        {/* CIRCUIT NAV — grouped by board, per-board way numbering, reorderable */}
        <BoardGroupedNav
          boards={layout.boards}
          submainFeeds={layout.submainFeeds}
          circuits={circuits}
          selectedIdx={selectedIdx}
          onSelect={setSelectedIdx}
          context={circuitContext}
          totalPass={stats.passCount}
          totalCircuits={totalCircuits}
          getWayOrder={getWayOrder}
          setBoardWayOrder={setBoardWayOrder}
          onAddSpare={addSpareWay}
          onDeleteCircuit={deleteCircuit}
          onDeleteSpare={deleteSpare}
        />

        {/* ACTIVE CIRCUIT DETAIL */}
        <AnimatePresence mode="wait">
          {activeCircuit && (
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <CircuitDetail
                circuit={activeCircuit}
                circuitIndex={selectedIdx}
                totalCircuits={totalCircuits}
                context={circuitContext.get(selectedIdx)}
                editHistory={editHistory[selectedIdx] ?? []}
                onEdit={(field, value) => applyEdit(selectedIdx, field, value)}
                complianceScore={getComplianceScore(activeCircuit, design)}
                circuitCost={cost.perCircuit[selectedIdx]}
                allBoards={layout.boards.map((b) => ({
                  id: b.id,
                  name: getBoardDisplayName(b.id, b.name),
                }))}
                onMoveToBoard={(boardId) => moveCircuitToBoard(selectedIdx, boardId)}
                boardZdb={
                  layout.boards.find(
                    (b) => b.id === circuitContext.get(selectedIdx)?.boardId
                  )?.zdb
                }
                supplyZe={Number(supply.Ze ?? 0.35)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIONS — desktop inline grid */}
        <div className="hidden sm:block">
          <ActionStrip
            isExporting={isExporting}
            isSendingToEIC={isSendingToEIC}
            onExportPDF={handleExportPDF}
            onSendToEIC={handleSendToEIC}
            onSendTo={sendToAgent}
            onReset={onReset}
          />
        </div>
      </main>

      {/* Mobile FAB → bottom sheet */}
      <MobileActionsFAB onOpen={() => setActionsOpen(true)} />
      <Sheet open={actionsOpen} onOpenChange={setActionsOpen}>
        <SheetContent
          side="bottom"
          className="bg-elec-dark border-t border-white/[0.10] rounded-t-2xl p-0 max-h-[85vh] overflow-hidden"
        >
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-white/[0.06]">
            <SheetTitle className="text-left text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              ACTIONS
            </SheetTitle>
          </SheetHeader>
          <div
            className="overflow-y-auto p-3 space-y-2"
            style={{
              paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 0px) + 1.5rem)',
            }}
          >
            <SheetActionRow
              label={isExporting ? 'Building PDF…' : 'Download PDF'}
              detail="EIC schedule + per-circuit detail · ready for inspection"
              primary
              disabled={isExporting}
              onClick={() => {
                handleExportPDF();
                setActionsOpen(false);
              }}
            />
            <SheetActionRow
              label={isSendingToEIC ? 'Sending…' : 'Send to EIC schedule'}
              detail="Drop into pending EIC for your inspection app"
              disabled={isSendingToEIC}
              onClick={() => {
                handleSendToEIC();
                setActionsOpen(false);
              }}
            />
            <SheetActionRow
              label="Send to Cost Engineer"
              detail="Quote the bill of materials + labour"
              onClick={() => {
                sendToAgent('cost-engineer');
                setActionsOpen(false);
              }}
            />
            <SheetActionRow
              label="Send to RAMS / H&S"
              detail="Risk assessment + method statement"
              onClick={() => {
                sendToAgent('rams');
                setActionsOpen(false);
              }}
            />
            <SheetActionRow
              label="Send to Method Statement"
              detail="Step-by-step install method"
              onClick={() => {
                sendToAgent('method-statement');
                setActionsOpen(false);
              }}
            />
            <SheetActionRow
              label="Send to Maintenance"
              detail="Service + commissioning schedule"
              onClick={() => {
                sendToAgent('maintenance');
                setActionsOpen(false);
              }}
            />
            <SheetActionRow
              label="Send to Installer"
              detail="On-site execution package"
              onClick={() => {
                sendToAgent('installer');
                setActionsOpen(false);
              }}
            />
            {(totalEditedCircuits > 0 || hasStructuralEdits) && (
              <SheetActionRow
                label="Reset to AI design"
                detail={
                  totalEditedCircuits > 0
                    ? `${totalEditedCircuits} circuit${totalEditedCircuits === 1 ? '' : 's'} edited · revert all changes`
                    : 'Revert reorders, spares, and deletions'
                }
                onClick={() => {
                  resetEdits();
                  setActionsOpen(false);
                }}
              />
            )}
            {onReset && (
              <SheetActionRow
                label="Start a new design"
                detail="Reset and start over"
                onClick={() => {
                  onReset();
                  setActionsOpen(false);
                }}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────────
// Sub-components
// ───────────────────────────────────────────────────────────────────────────────

const ProjectMetaStrip = ({
  projectName,
  location,
  installType,
  supply,
  totalCircuits,
}: {
  projectName: string;
  location: string;
  installType: string;
  supply: any;
  totalCircuits: number;
}) => (
  <section className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
    <Cell label="Project" value={projectName} highlight />
    <Cell label="Location" value={location} />
    <Cell label="Install type" value={installType} capitalise />
    <Cell
      label="Supply"
      value={`${supply.voltage ?? 230}V ${supply.phases === 'three' ? '3φ' : '1φ'}`}
    />
    <Cell label="Earthing" value={supply.earthingSystem ?? 'TN-C-S'} />
    <Cell
      label="Circuits"
      value={String(totalCircuits)}
      tabular
      className="col-span-2 sm:col-span-5 sm:border-t sm:border-white/[0.08]"
    />
  </section>
);

const HeadlineStats = ({
  stats,
  totalCircuits,
  cost,
}: {
  stats: { totalLoad: number; diversifiedLoad: number; factor: number; totalIb: number; passCount: number };
  totalCircuits: number;
  cost: InstallationCost;
}) => (
  <section className="space-y-4">
    <Eyebrow>01 · HEADLINE</Eyebrow>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
      <BigStat label="Connected" value={(stats.totalLoad / 1000).toFixed(1)} unit="kW" />
      <BigStat
        label="Diversified"
        value={(stats.diversifiedLoad / 1000).toFixed(1)}
        unit="kW"
        accent
      />
      <BigStat
        label="Factor"
        value={stats.factor > 0 ? stats.factor.toFixed(2) : '—'}
        unit=""
      />
      <BigStat label="Total Ib" value={stats.totalIb.toFixed(1)} unit="A" />
      <BigStat
        label="Compliance"
        value={`${stats.passCount}`}
        unit={`/ ${totalCircuits}`}
      />
      <BigStat
        label="Indicative cost"
        value={formatGBP(cost.grandTotal, { compact: true })}
        unit=""
        accent
      />
    </div>
  </section>
);

/**
 * Format £ values: small = £1,234, large = £12.4k. Both at zero decimals.
 * Two-tier compact format keeps the headline strip readable on phones.
 */
function formatGBP(n: number, opts?: { compact?: boolean }): string {
  if (!Number.isFinite(n)) return '—';
  if (opts?.compact && n >= 10_000) {
    return `£${(n / 1000).toFixed(1)}k`;
  }
  return `£${Math.round(n).toLocaleString('en-GB')}`;
}

const CostTierPicker = ({
  tier,
  onChange,
  cost,
}: {
  tier: CostTier;
  onChange: (t: CostTier) => void;
  cost: InstallationCost;
}) => {
  const tiers: CostTier[] = ['basic', 'standard', 'premium'];
  const active = TIER_LABELS[tier];

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <Eyebrow>02 · INDICATIVE COST</Eyebrow>
        <span className="text-[11px] text-white/55 tabular-nums">
          Verify with your supplier · trade ex-VAT
        </span>
      </div>

      <div className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-4">
        {/* Segmented tier control */}
        <div
          role="tablist"
          aria-label="Cost tier"
          className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-xl border border-white/[0.06]"
        >
          {tiers.map((t) => {
            const isActive = t === tier;
            return (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => onChange(t)}
                className={cn(
                  'h-11 sm:h-10 rounded-lg text-[12.5px] font-semibold uppercase tracking-[0.14em] transition-colors touch-manipulation',
                  isActive
                    ? 'bg-elec-yellow text-black'
                    : 'text-white/65 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                {TIER_LABELS[t].label}
              </button>
            );
          })}
        </div>

        {/* Active tier description + total */}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <p className="text-[12.5px] leading-relaxed text-white/70 max-w-xl">
            {active.description}
          </p>
          <div className="text-right shrink-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Total install
            </div>
            <div className="text-[24px] sm:text-[28px] font-semibold tabular-nums text-elec-yellow leading-none">
              {formatGBP(cost.grandTotal)}
            </div>
          </div>
        </div>

        {/* Per-board breakdown row */}
        {Object.keys(cost.perBoard).length > 1 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-2 border-t border-white/[0.06]">
            {Object.entries(cost.perBoard).map(([boardId, b]) => (
              <span key={boardId} className="text-[11px] tabular-nums text-white/60">
                {boardId.replace(/^board-/, '').replace(/-/g, ' ')}:{' '}
                <span className="text-white/85 font-semibold">{formatGBP(b.total)}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const A4FeaturesPanel = ({
  a4,
  earthingSystem,
}: {
  a4: ReturnType<typeof deriveA4Features>;
  earthingSystem?: string;
}) => {
  const items: { title: string; detail: string; reg: string }[] = [];
  if (a4.afddCount > 0) {
    items.push({
      title: 'AFDD',
      detail: `Recommended on ${a4.afddCount} circuit${a4.afddCount === 1 ? '' : 's'}`,
      reg: '421.1.7',
    });
  }
  if (a4.spdRecommended) {
    items.push({
      title: 'Surge protection',
      detail: 'Risk assessment performed; SPD recommended',
      reg: '443.4',
    });
  }
  if (a4.openPenFlagged) {
    items.push({
      title: 'Open-PEN',
      detail: 'EVSE integral PEN fault detection required',
      reg: '411.4.5',
    });
  }
  if (a4.ttRcdApplied) {
    items.push({
      title: 'TT earthing',
      detail: '30 mA RCBO applied to every circuit',
      reg: '411.5',
    });
  }
  if (a4.evCount > 0) {
    items.push({
      title: 'EV charging',
      detail: `${a4.evCount} EV circuit${a4.evCount === 1 ? '' : 's'} · Type A/B RCBO`,
      reg: '722.531.2',
    });
  }
  if (a4.specialLocationsApplied.length > 0) {
    items.push({
      title: 'Special locations',
      detail: a4.specialLocationsApplied.map((s: string) => s.replace(/-/g, ' ')).join(', '),
      reg: a4.specialLocationsApplied.includes('bathroom') ? '701' : '7xx',
    });
  }

  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <Eyebrow>03 · BS 7671:2018+A4:2026 APPLIED</Eyebrow>
      <p className="text-[12.5px] leading-relaxed text-white/60 max-w-2xl">
        Auto-applied features based on your supply, install type and the circuits you specified.
        {earthingSystem === 'TT' && ' TT earthing demands 30 mA RCD on every circuit per 411.5.'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-[hsl(0_0%_10%)] border border-elec-yellow/[0.20] rounded-2xl p-4 sm:p-5"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                {item.title}
              </span>
              <span className="text-[10px] font-semibold tabular-nums text-elec-yellow/80 border border-elec-yellow/30 bg-elec-yellow/[0.06] rounded-md px-1.5 py-0.5">
                {item.reg}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-white/85">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const CoherenceBanner = ({ warnings }: { warnings: CoherenceWarning[] }) => {
  if (warnings.length === 0) return null;

  // Single warning → full-width hero-style banner with clear visual weight.
  // Multiple warnings → tight grid (rare in practice once design auto-resolves issues).
  if (warnings.length === 1) {
    const w = warnings[0];
    return (
      <section className="space-y-3">
        <Eyebrow>ACTION REQUIRED</Eyebrow>
        <div
          className={cn(
            'relative bg-[hsl(0_0%_10%)] border rounded-2xl px-5 py-5 sm:px-7 sm:py-7 lg:px-9 lg:py-8',
            w.severity === 'warn' ? 'border-amber-500/40' : 'border-white/[0.10]'
          )}
        >
          {/* Accent stripe */}
          <div
            className={cn(
              'absolute inset-y-0 left-0 w-[3px] rounded-l-2xl',
              w.severity === 'warn' ? 'bg-amber-400/60' : 'bg-white/20'
            )}
          />
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <h3
              className={cn(
                'text-[20px] sm:text-[24px] lg:text-[28px] font-semibold tracking-tight leading-[1.1]',
                w.severity === 'warn' ? 'text-amber-300' : 'text-white'
              )}
            >
              {w.title}.
            </h3>
            {w.reg && (
              <span className="text-[10.5px] font-semibold tabular-nums text-white/65 border border-white/15 bg-white/[0.04] rounded-md px-2 py-1 uppercase tracking-[0.16em]">
                BS 7671 · {w.reg}
              </span>
            )}
          </div>
          <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-[15px] leading-relaxed text-white/85 max-w-3xl">
            {w.detail}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <Eyebrow>ACTION REQUIRED</Eyebrow>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {warnings.map((w, i) => (
          <div
            key={i}
            className={cn(
              'bg-[hsl(0_0%_10%)] border rounded-2xl p-4 sm:p-5',
              w.severity === 'warn' ? 'border-amber-500/30' : 'border-white/[0.10]'
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span
                className={cn(
                  'text-[10.5px] font-semibold uppercase tracking-[0.18em]',
                  w.severity === 'warn' ? 'text-amber-300' : 'text-white/70'
                )}
              >
                {w.title}
              </span>
              {w.reg && (
                <span className="text-[10px] font-semibold tabular-nums text-white/60 border border-white/15 rounded-md px-1.5 py-0.5">
                  {w.reg}
                </span>
              )}
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/85">{w.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const RecommendedBoardsView = ({
  boards,
  submainFeeds,
  circuits,
  needsMultiBoard,
  cost,
  getBoardDisplayName,
  onBoardReferenceChange,
  onAddBoard,
  onMergeBoardIntoMain,
}: {
  boards: BoardRecommendation[];
  submainFeeds: SubmainFeed[];
  circuits: any[];
  needsMultiBoard: boolean;
  cost: InstallationCost;
  getBoardDisplayName: (boardId: string, fallback: string) => string;
  onBoardReferenceChange: (boardId: string, ref: string) => void;
  onAddBoard: (name: string, location: string) => string;
  onMergeBoardIntoMain: (boardId: string, circuitIndices: number[]) => void;
}) => {
  // For each board, gather the submain feeds it ORIGINATES (one feed = one way).
  const feedsByParent = new Map<string, SubmainFeed[]>();
  submainFeeds.forEach((f) => {
    const list = feedsByParent.get(f.parentBoardId) ?? [];
    list.push(f);
    feedsByParent.set(f.parentBoardId, list);
  });

  const [addBoardOpen, setAddBoardOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardLocation, setNewBoardLocation] = useState('');

  const handleAddBoardClick = () => {
    setNewBoardName('');
    setNewBoardLocation('');
    setAddBoardOpen(true);
  };

  const submitAddBoard = () => {
    const name = newBoardName.trim();
    if (!name) {
      toast.error('Board name is required');
      return;
    }
    const location = newBoardLocation.trim() || 'Submain';
    onAddBoard(name, location);
    setAddBoardOpen(false);
  };

  return (
    <section className="space-y-5">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <Eyebrow>04 · RECOMMENDED BOARD LAYOUT</Eyebrow>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-white/60 tabular-nums">
            {boards.length} board{boards.length === 1 ? '' : 's'}{' '}
            {submainFeeds.length > 0 && `· ${submainFeeds.length} submain feed${submainFeeds.length === 1 ? '' : 's'}`}
          </span>
          <button
            type="button"
            onClick={handleAddBoardClick}
            className="text-[11px] uppercase tracking-[0.14em] font-semibold tabular-nums text-elec-yellow border border-elec-yellow/40 hover:bg-elec-yellow/[0.08] active:bg-elec-yellow/[0.12] rounded-full px-3 py-1.5 min-h-[32px] touch-manipulation transition-colors"
            aria-label="Add a new board"
          >
            + Add board
          </button>
        </div>
      </div>

      {needsMultiBoard && (
        <p className="text-[12.5px] leading-relaxed text-white/65 max-w-3xl">
          Multi-board layout — circuits split across boards based on zone, load and BS 7671 314.1
          dispersal. Each submain is sized automatically (protection at the origin, cable and route
          pre-derived). Use the controls on each board card to rename, merge into main, or reassign
          circuits.
        </p>
      )}

      <div className="space-y-5">
        {boards.map((board, idx) => (
          <div
            key={board.id}
            id={`board-${board.id}`}
            data-board-id={board.id}
            className="scroll-mt-[96px] sm:scroll-mt-[64px]"
          >
            <BoardCard
              board={board}
              circuits={circuits}
              index={idx}
              originatingFeeds={feedsByParent.get(board.id) ?? []}
              boardCost={cost.perBoard[board.id]}
              displayName={getBoardDisplayName(board.id, board.name)}
              onRename={(ref) => onBoardReferenceChange(board.id, ref)}
              onMergeIntoMain={() =>
                onMergeBoardIntoMain(board.id, board.circuitIndices)
              }
            />
          </div>
        ))}
      </div>

      {/* Add board sheet — replaces the previous window.prompt UX. */}
      <Sheet open={addBoardOpen} onOpenChange={setAddBoardOpen}>
        <SheetContent
          side="bottom"
          className="bg-[hsl(0_0%_8%)] border-t border-white/[0.08] rounded-t-2xl px-4 sm:px-6 pb-6 pt-4 max-h-[85vh] overflow-y-auto"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="text-[20px] font-semibold tracking-tight text-white">
              Add a board
            </SheetTitle>
          </SheetHeader>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/65">
            Creates an empty submain board. Move circuits onto it from any
            circuit's `Board` picker. Useful when the recommender's grouping
            doesn't match how you'd actually wire the job.
          </p>
          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="new-board-name"
                className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-white/60 mb-1.5"
              >
                Board name *
              </label>
              <input
                id="new-board-name"
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder='e.g. "Garage CU", "DB-02", "Workshop"'
                autoFocus
                className="w-full bg-black/40 border border-white/[0.12] rounded-lg px-3 py-2.5 min-h-[44px] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                maxLength={40}
              />
            </div>
            <div>
              <label
                htmlFor="new-board-location"
                className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-white/60 mb-1.5"
              >
                Location
              </label>
              <input
                id="new-board-location"
                type="text"
                value={newBoardLocation}
                onChange={(e) => setNewBoardLocation(e.target.value)}
                placeholder='e.g. "Garage", "Workshop wall", "Plant room"'
                className="w-full bg-black/40 border border-white/[0.12] rounded-lg px-3 py-2.5 min-h-[44px] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                maxLength={60}
              />
              <p className="mt-1 text-[11px] text-white/50">
                Optional. Defaults to "Submain".
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAddBoardOpen(false)}
                className="flex-1 min-h-[44px] rounded-lg text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70 border border-white/15 hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitAddBoard}
                disabled={!newBoardName.trim()}
                className={cn(
                  'flex-1 min-h-[44px] rounded-lg text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors touch-manipulation',
                  newBoardName.trim()
                    ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90 active:bg-elec-yellow/85'
                    : 'bg-white/[0.04] text-white/40 cursor-not-allowed'
                )}
              >
                Add board
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

const BoardCard = ({
  board,
  circuits,
  index,
  originatingFeeds,
  boardCost,
  displayName,
  onRename,
  onMergeIntoMain,
}: {
  board: BoardRecommendation;
  circuits: any[];
  index: number;
  originatingFeeds: SubmainFeed[];
  boardCost?: InstallationCost['perBoard'][string];
  displayName: string;
  onRename: (next: string) => void;
  onMergeIntoMain: () => void;
}) => {
  const boardCircuits = board.circuitIndices.map((i) => ({ idx: i, circuit: circuits[i] }));
  const totalKW = boardCircuits.reduce(
    (s, { circuit }) => s + Number(circuit?.loadPower ?? 0) / 1000,
    0
  );
  const totalWays = boardCircuits.length + originatingFeeds.length;

  // Per-board compliance — count how many of THIS board's circuits pass.
  const passCount = boardCircuits.filter(({ circuit }) => getCircuitStatus(circuit) === 'pass').length;
  const reviewCount = boardCircuits.length - passCount;

  // Way utilisation — recommend a 14-way working capacity (18-way enclosure
  // less 25% spare per BS 7671 514.9.1). Lets us show used / spare / capacity.
  const waysUsed = totalWays;
  const recommendedCapacity = Math.max(waysUsed + 4, 14);
  const sparesAvailable = Math.max(0, recommendedCapacity - waysUsed);
  const utilisationPct = Math.min(100, Math.round((waysUsed / recommendedCapacity) * 100));
  const utilisationTone =
    utilisationPct >= 90 ? 'amber' : utilisationPct >= 75 ? 'yellow' : 'ok';

  return (
    <article className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl overflow-hidden">
      {/* Board header */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.06]">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/70">
                · {board.isOrigin ? 'ORIGIN' : 'SUBMAIN'}
              </span>
            </div>
            <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
              <EditableField
                kind="text"
                label="Board reference"
                value={displayName}
                edited={displayName !== board.name}
                validate={(v) => {
                  const trimmed = String(v ?? '').trim();
                  if (!trimmed) return { ok: false, error: 'Board reference cannot be empty' };
                  if (trimmed.length > 40)
                    return { ok: false, error: 'Keep reference under 40 characters' };
                  return { ok: true };
                }}
                onCommit={(v) => onRename(String(v).trim())}
                valueClassName="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white"
              />
            </h3>
            <p className="text-[12px] text-white/60">{board.location}</p>
          </div>
          <div className="flex flex-wrap gap-2 items-baseline">
            <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/[0.06] rounded-full px-2.5 py-0.5">
              {board.mainSwitchRating}A main
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-white border border-white/15 bg-white/[0.04] rounded-full px-2.5 py-0.5">
              {totalWays} ways
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-white/85 border border-white/15 bg-white/[0.04] rounded-full px-2.5 py-0.5">
              {totalKW.toFixed(1)} kW
            </span>
            {boardCost && (
              <span
                className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/[0.06] rounded-full px-2.5 py-0.5"
                title="Indicative — verify with your supplier"
              >
                {formatGBP(boardCost.total)}
              </span>
            )}
            {boardCircuits.length > 0 && (
              <span
                className={cn(
                  'text-[11px] uppercase tracking-[0.14em] tabular-nums rounded-full px-2.5 py-0.5 border',
                  reviewCount === 0
                    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/[0.06]'
                    : 'text-amber-400 border-amber-500/30 bg-amber-500/[0.06]'
                )}
                title={
                  reviewCount === 0
                    ? `All ${passCount} circuits pass`
                    : `${reviewCount} circuit${reviewCount === 1 ? '' : 's'} need review`
                }
              >
                {reviewCount === 0
                  ? `${passCount}/${boardCircuits.length} pass`
                  : `${reviewCount} review`}
              </span>
            )}
          </div>
        </div>
        <p className="mt-3 text-[12.5px] leading-relaxed text-white/75">{board.rationale}</p>

        {/* Way utilisation — small bar showing used vs recommended capacity. */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                utilisationTone === 'amber'
                  ? 'bg-amber-400'
                  : utilisationTone === 'yellow'
                    ? 'bg-elec-yellow'
                    : 'bg-emerald-400/80'
              )}
              style={{ width: `${utilisationPct}%` }}
              aria-label={`Way utilisation ${utilisationPct}%`}
            />
          </div>
          <span className="text-[10.5px] tabular-nums text-white/60 shrink-0">
            {waysUsed}/{recommendedCapacity} used · {sparesAvailable} spare
          </span>
        </div>

        {/* Cost breakdown — small, collapsed-style row */}
        {boardCost && (
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] tabular-nums text-white/55">
            <span>
              Enclosure <span className="text-white/85">{formatGBP(boardCost.enclosure)}</span>
            </span>
            <span>
              Main switch <span className="text-white/85">{formatGBP(boardCost.mainSwitch)}</span>
            </span>
            {boardCost.submainFeed > 0 && (
              <span>
                Submain feed <span className="text-white/85">{formatGBP(boardCost.submainFeed)}</span>
              </span>
            )}
            <span>
              Circuits <span className="text-white/85">{formatGBP(boardCost.circuitsTotal)}</span>
            </span>
            {boardCost.spdAllowance > 0 && (
              <span>
                SPD <span className="text-white/85">{formatGBP(boardCost.spdAllowance)}</span>
              </span>
            )}
          </div>
        )}

        {/* Manual override actions — only on non-origin submains */}
        {!board.isOrigin && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                const ckts = board.circuitIndices.length;
                const ok = window.confirm(
                  `Merge ${displayName} into Main CU?\n\n${ckts} circuit${ckts === 1 ? '' : 's'} will move to the origin board and this submain will be removed.`
                );
                if (ok) onMergeIntoMain();
              }}
              className="text-[10.5px] uppercase tracking-[0.14em] font-semibold tabular-nums text-white/70 border border-white/15 hover:bg-white/[0.04] active:bg-white/[0.08] rounded-md px-3 py-1.5 min-h-[32px] touch-manipulation transition-colors"
              aria-label={`Merge ${displayName} into the main CU`}
            >
              Merge into main
            </button>
          </div>
        )}

        {/* Feed-from-parent (on submain boards) */}
        {board.feedFromParent && (
          <div className="mt-4 border-t border-white/[0.06] pt-4 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Fed from parent
                </span>
                <PhaseBadge
                  label={board.feedFromParent.feedPhaseLabel}
                  sourcePhase={board.feedFromParent.feedSourcePhase}
                  accent
                />
              </div>
              <span
                className={cn(
                  'text-[10px] font-semibold tabular-nums px-2 py-0.5 rounded-md border',
                  board.feedFromParent.voltageDropOk
                    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/[0.06]'
                    : 'text-amber-400 border-amber-500/30 bg-amber-500/[0.06]'
                )}
              >
                Vd {board.feedFromParent.voltageDropPercent.toFixed(2)}%
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-2 text-[12.5px]">
              <FeedFact
                label="Protection"
                value={`${board.feedFromParent.protectionRating}A ${board.feedFromParent.protectionType}${
                  board.feedFromParent.protectionCurve
                    ? ` Type ${board.feedFromParent.protectionCurve}`
                    : ''
                }`}
              />
              <FeedFact label="Breaking" value={`${board.feedFromParent.protectionKa} kA`} />
              <FeedFact label="Cable" value={`${board.feedFromParent.cableSize} mm²`} />
              <FeedFact label="Type" value={board.feedFromParent.cableType} />
              <FeedFact
                label="Length"
                value={`~${board.feedFromParent.cableLengthEstimateM} m`}
              />
            </div>
            <p className="text-[11.5px] leading-relaxed text-white/55">
              ↳ {board.feedFromParent.rationale}
            </p>
            <p className="text-[11px] leading-relaxed text-white/45">
              {board.feedFromParent.cableSizingNote}
            </p>
          </div>
        )}

        {/* Per-board engineering: SPD, phases, discrimination */}
        <BoardEngineeringStrip board={board} />
      </div>

      {/* Way grid — TP+N column layout for 3φ boards, list for 1φ */}
      {board.phaseBalance ? (
        <ThreePhaseWayGrid
          board={board}
          boardCircuits={boardCircuits}
          originatingFeeds={originatingFeeds}
        />
      ) : (
        <SinglePhaseWayGrid
          boardCircuits={boardCircuits}
          originatingFeeds={originatingFeeds}
          totalWays={totalWays}
        />
      )}
    </article>
  );
};

/**
 * Three-phase board way grid — three phase columns (L1 / L2 / L3) with rows
 * being ways. Single-phase circuits occupy ONE column (the assigned phase).
 * Three-phase circuits + TP+N submain feeds span all three columns. L+N feeds
 * occupy their source phase column only.
 *
 * This mirrors the physical layout of a real TP+N board.
 */
const ThreePhaseWayGrid = ({
  board,
  boardCircuits,
  originatingFeeds,
}: {
  board: BoardRecommendation;
  boardCircuits: { idx: number; circuit: any }[];
  originatingFeeds: SubmainFeed[];
}) => {
  type Row =
    | { kind: 'feed'; feed: SubmainFeed; wayNum: number }
    | { kind: 'circuit'; circuit: any; circuitIdx: number; wayNum: number };

  const rows: Row[] = [
    ...originatingFeeds.map((feed, fi) => ({
      kind: 'feed' as const,
      feed,
      wayNum: fi + 1,
    })),
    ...boardCircuits.map(({ idx, circuit }, localIdx) => ({
      kind: 'circuit' as const,
      circuit,
      circuitIdx: idx,
      wayNum: originatingFeeds.length + localIdx + 1,
    })),
  ];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        {/* Phase header row */}
        <div className="grid grid-cols-[60px_1fr_1fr_1fr] border-b border-white/[0.06]">
          <div className="bg-[hsl(0_0%_8%)] px-3 py-2.5 border-r border-white/[0.06]">
            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
              Way
            </span>
          </div>
          <PhaseHeaderCell phase="L1" colour="bg-amber-700/60" />
          <PhaseHeaderCell phase="L2" colour="bg-zinc-800/70" />
          <PhaseHeaderCell phase="L3" colour="bg-slate-400/60" />
        </div>

        {/* Way rows */}
        <div className="divide-y divide-white/[0.04]">
          {rows.map((row, rowIdx) => {
            const wayLabel = String(row.wayNum).padStart(2, '0');
            if (row.kind === 'feed') {
              const feed = row.feed;
              const isThreePhaseFeed = feed.feedPhases === 'three';
              return (
                <div
                  key={`feed-${feed.childBoardId}`}
                  className="grid grid-cols-[60px_1fr_1fr_1fr] bg-elec-yellow/[0.04]"
                >
                  <WayLabelCell wayLabel={wayLabel} accent />
                  {isThreePhaseFeed ? (
                    <FeedSpanCell feed={feed} />
                  ) : (
                    <>
                      {(['L1', 'L2', 'L3'] as const).map((p) =>
                        feed.feedSourcePhase === p ? (
                          <FeedPhaseCell key={p} feed={feed} />
                        ) : (
                          <EmptyPhaseCell key={p} />
                        )
                      )}
                    </>
                  )}
                </div>
              );
            }

            const c = row.circuit;
            if (!c) return null;
            const status = getCircuitStatus(c);
            const phase = board.phaseBalance?.assignments[row.circuitIdx];

            return (
              <div
                key={`circ-${row.circuitIdx}-${rowIdx}`}
                className={cn(
                  'grid grid-cols-[60px_1fr_1fr_1fr]',
                  status === 'review' && 'bg-amber-500/[0.04]'
                )}
              >
                <WayLabelCell wayLabel={wayLabel} status={status} />
                {phase === 'L1L2L3' ? (
                  <CircuitSpanCell circuit={c} />
                ) : (
                  <>
                    {(['L1', 'L2', 'L3'] as const).map((p) =>
                      phase === p ? (
                        <CircuitPhaseCell key={p} circuit={c} />
                      ) : (
                        <EmptyPhaseCell key={p} />
                      )
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PHASE_COLOUR_NAMES: Record<string, string> = {
  L1: 'brown',
  L2: 'black',
  L3: 'grey',
};

const PhaseHeaderCell = ({ phase, colour }: { phase: string; colour: string }) => (
  <div
    className="bg-[hsl(0_0%_8%)] px-3 py-2.5 flex items-center gap-2 border-r border-white/[0.06] last:border-r-0"
    aria-label={`Phase ${phase} — ${PHASE_COLOUR_NAMES[phase] ?? ''}`}
  >
    <span
      className={cn('inline-block w-2 h-2 rounded-full', colour)}
      aria-hidden="true"
    />
    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 tabular-nums">
      {phase}
    </span>
  </div>
);

const WayLabelCell = ({
  wayLabel,
  status,
  accent,
}: {
  wayLabel: string;
  status?: CircuitStatus;
  accent?: boolean;
}) => (
  <div className="bg-[hsl(0_0%_8%)] px-3 py-3 flex flex-col items-start justify-center border-r border-white/[0.06]">
    <span
      className={cn(
        'text-[10.5px] font-semibold uppercase tracking-[0.16em] tabular-nums',
        accent ? 'text-elec-yellow' : status === 'review' ? 'text-amber-400' : 'text-elec-yellow'
      )}
    >
      {wayLabel}
    </span>
  </div>
);

const EmptyPhaseCell = () => (
  <div className="bg-[hsl(0_0%_5%)] px-3 py-3 border-r border-white/[0.04] last:border-r-0">
    <span className="text-[9.5px] uppercase tracking-[0.18em] text-white/15">—</span>
  </div>
);

const CircuitPhaseCell = ({ circuit }: { circuit: any }) => (
  <div className="bg-[hsl(0_0%_10%)] px-3 py-3 border-r border-white/[0.04] last:border-r-0 min-w-0">
    <div className="text-[10px] font-semibold tabular-nums text-white">
      {circuit.protectionDevice?.rating ?? '—'}A {circuit.protectionDevice?.curve ?? ''}
    </div>
    <div className="mt-0.5 text-[11.5px] font-semibold text-white truncate leading-tight">
      {circuit.name}
    </div>
    <div className="mt-0.5 text-[10px] text-white/55 tabular-nums truncate">
      {circuit.protectionDevice?.type ?? 'MCB'}
      {circuit.cableSize ? ` · ${circuit.cableSize} mm²` : ''}
    </div>
  </div>
);

const CircuitSpanCell = ({ circuit }: { circuit: any }) => (
  <div className="col-span-3 bg-[hsl(0_0%_10%)] px-3 py-3 relative">
    <div className="absolute inset-y-2 left-0 right-0 bg-gradient-to-r from-red-400/10 via-yellow-400/10 to-blue-400/10 pointer-events-none" />
    <div className="relative flex items-baseline justify-between gap-3 flex-wrap">
      <div className="min-w-0">
        <div className="text-[10px] font-semibold tabular-nums text-elec-yellow">
          {circuit.protectionDevice?.rating ?? '—'}A {circuit.protectionDevice?.curve ?? ''} · 3φ
        </div>
        <div className="mt-0.5 text-[12px] font-semibold text-white truncate leading-tight">
          {circuit.name}
        </div>
      </div>
      <span className="text-[10px] text-white/55 tabular-nums">
        {circuit.protectionDevice?.type ?? 'MCB'}
        {circuit.cableSize ? ` · ${circuit.cableSize} mm²` : ''}
      </span>
    </div>
  </div>
);

const FeedSpanCell = ({ feed }: { feed: SubmainFeed }) => (
  <div className="col-span-3 bg-elec-yellow/[0.06] px-3 py-3 relative">
    <div className="absolute inset-y-2 left-0 right-0 bg-gradient-to-r from-red-400/10 via-yellow-400/10 to-blue-400/10 pointer-events-none" />
    <div className="relative flex items-baseline justify-between gap-3 flex-wrap">
      <div className="min-w-0">
        <div className="text-[10px] font-semibold tabular-nums text-elec-yellow">
          {feed.protectionRating}A {feed.protectionType} · TP+N
        </div>
        <div className="mt-0.5 text-[12px] font-semibold text-white truncate leading-tight">
          → {feed.childBoardName}
        </div>
      </div>
      <span className="text-[10px] text-elec-yellow/85 tabular-nums">
        {feed.cableSize} mm² · {feed.cableType.split(' ').slice(0, 2).join(' ')}
      </span>
    </div>
  </div>
);

const FeedPhaseCell = ({ feed }: { feed: SubmainFeed }) => (
  <div className="bg-elec-yellow/[0.06] px-3 py-3 border-r border-white/[0.04] last:border-r-0 min-w-0">
    <div className="text-[10px] font-semibold tabular-nums text-elec-yellow">
      {feed.protectionRating}A {feed.protectionType}
    </div>
    <div className="mt-0.5 text-[11.5px] font-semibold text-white truncate leading-tight">
      → {feed.childBoardName}
    </div>
    <div className="mt-0.5 text-[10px] text-elec-yellow/85 tabular-nums truncate">
      L+N · {feed.cableSize} mm²
    </div>
  </div>
);

/**
 * Single-phase board way grid — simple horizontal-scroll list (existing layout).
 */
const SinglePhaseWayGrid = ({
  boardCircuits,
  originatingFeeds,
  totalWays,
}: {
  boardCircuits: { idx: number; circuit: any }[];
  originatingFeeds: SubmainFeed[];
  totalWays: number;
}) => (
  <div className="overflow-x-auto">
    <div className="min-w-[480px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/[0.04]">
        {originatingFeeds.map((feed, fi) => (
          <div
            key={`feed-${feed.childBoardId}`}
            className="bg-elec-yellow/[0.05] border-l-2 border-elec-yellow/40 px-3 py-3 flex flex-col gap-1 min-h-[76px]"
          >
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] tabular-nums text-elec-yellow">
                {String(fi + 1).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-semibold tabular-nums text-elec-yellow">
                {feed.protectionRating}A
              </span>
            </div>
            <div className="text-[11.5px] font-semibold text-white truncate leading-tight">
              → {feed.childBoardName}
            </div>
            <div className="text-[10px] text-white/55 tabular-nums truncate">
              {feed.feedPhaseLabel} · {feed.protectionType} · {feed.cableSize} mm²
            </div>
          </div>
        ))}

        {boardCircuits.map(({ idx: i, circuit: c }) => {
          const status = getCircuitStatus(c);
          if (!c) return null;
          const wayNumber = originatingFeeds.length + i + 1;
          return (
            <div
              key={i}
              className={cn(
                'bg-[hsl(0_0%_10%)] px-3 py-3 flex flex-col gap-1 min-h-[76px]',
                status === 'review' && 'bg-amber-500/[0.04]'
              )}
            >
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] tabular-nums text-elec-yellow">
                  {String(wayNumber).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-semibold tabular-nums text-white">
                  {c.protectionDevice?.rating ?? '—'}A
                </span>
              </div>
              <div className="text-[11.5px] font-semibold text-white truncate leading-tight">
                {c.name || `Circuit ${i + 1}`}
              </div>
              <div className="text-[10px] text-white/55 tabular-nums truncate">
                {c.protectionDevice?.type ?? 'MCB'} {c.protectionDevice?.curve ?? ''} ·{' '}
                {c.cableSize ? `${c.cableSize} mm²` : '—'}
              </div>
            </div>
          );
        })}

        {Array.from({ length: Math.max(0, 6 - (totalWays % 6)) % 6 }).map((_, i) => (
          <div
            key={`spare-${i}`}
            className="bg-[hsl(0_0%_6%)] px-3 py-3 flex flex-col gap-1 min-h-[76px]"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
              SPARE
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FeedFact = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/55">
      {label}
    </span>
    <span className="mt-0.5 text-[12.5px] font-semibold tabular-nums text-white">{value}</span>
  </div>
);

/**
 * Compact phase indicator chip.
 * For circuit ways: L1 / L2 / L3 / 3φ
 * For submain feeds: TP+N (three-phase) / L+N (single-phase, optionally with source phase)
 */
const PhaseBadge = ({
  label,
  sourcePhase,
  accent,
}: {
  label: string;
  sourcePhase?: 'L1' | 'L2' | 'L3';
  accent?: boolean;
}) => {
  const display = label === 'L1L2L3' ? '3φ' : sourcePhase ? `${label} · ${sourcePhase}` : label;
  return (
    <span
      className={cn(
        'inline-flex items-center text-[9.5px] font-semibold tabular-nums px-1.5 py-0.5 rounded border tracking-[0.05em]',
        accent
          ? 'border-elec-yellow/40 bg-elec-yellow/[0.10] text-elec-yellow'
          : 'border-white/15 bg-white/[0.04] text-white/85'
      )}
    >
      {display}
    </span>
  );
};

const BoardEngineeringStrip = ({ board }: { board: BoardRecommendation }) => {
  const items: Array<{
    title: string;
    value: string;
    detail?: string;
    reg?: string;
    accent: 'good' | 'warn' | 'info';
  }> = [];

  // Diversified load + design current
  items.push({
    title: 'Board load',
    value: `${(board.diversifiedLoadW / 1000).toFixed(1)} kW · ${board.designCurrentA.toFixed(1)} A`,
    detail: 'Sum of diversified circuit loads (Appendix A diversity factors).',
    accent: 'info',
  });

  // Earth-fault loop impedance at the board busbar (Zdb).
  // For the origin: Zdb = Ze. For submains: Zdb = parent.zdb + feed loop.
  // Final-circuit Zs values on this board start from this Zdb, NOT from Ze.
  if (typeof board.zdb === 'number' && board.zdb > 0) {
    items.push({
      title: 'Zdb (board busbar)',
      value: `${board.zdb.toFixed(3)} Ω`,
      detail: board.isOrigin
        ? 'Earth-fault loop impedance at the origin = supply Ze. Every final-circuit Zs on this board adds R1+R2 from here.'
        : `Propagated from supply through the submain feed (parent Zdb + feed loop). Each final-circuit Zs on this board starts from ${board.zdb.toFixed(3)} Ω, not from Ze.`,
      reg: '411.4',
      accent: 'info',
    });
  }

  // Prospective fault current at the busbar — drives breaking capacity (Icn)
  // selection. New PME services often see 16–25 kA at the cut-out; submains
  // will see lower because Zdb is higher.
  if (typeof board.psccKa === 'number' && board.psccKa > 0) {
    items.push({
      title: 'PSCC at busbar',
      value: `${board.psccKa.toFixed(2)} kA`,
      detail: board.isOrigin
        ? 'Prospective short-circuit current at the origin busbar (U₀ / Ze). All MCBs / RCBOs at this board need Icn ≥ this value.'
        : `Prospective short-circuit current at this submain (U₀ / Zdb). Lower than the origin because the feed adds loop impedance — devices here can have a smaller Icn than the origin's.`,
      reg: '434.5.1',
      accent: 'info',
    });
  }

  // Earthing conductor — Table 54.7 / 543.1.
  if (typeof board.earthingConductorMm2 === 'number' && board.earthingConductorMm2 > 0) {
    items.push({
      title: board.isOrigin ? 'Main earthing conductor' : 'Submain earth (cpc)',
      value: `${board.earthingConductorMm2} mm² Cu`,
      detail: board.isOrigin
        ? 'Sized per Table 54.7 from the service phase conductor — runs from the MET to the means of earthing.'
        : 'Sized per Table 54.7 from the submain phase conductor (or held within the SWA armour where applicable).',
      reg: '543.1',
      accent: 'info',
    });
  }

  // Main protective bonding — origin only, Table 54.8 / 544.1.1.
  // PME systems require larger bonding per A2:2022 onwards (10 mm² minimum).
  if (board.isOrigin && typeof board.mainBondingMm2 === 'number' && board.mainBondingMm2 > 0) {
    items.push({
      title: 'Main bonding',
      value: `${board.mainBondingMm2} mm² Cu`,
      detail:
        'Connects extraneous-conductive parts (water, gas, structural steel) to the MET. PME services use Table 54.8 (larger sizes than TN-S) due to neutral-current loading.',
      reg: '544.1.1',
      accent: 'info',
    });
  }

  // SPD
  if (board.spd) {
    items.push({
      title: 'SPD',
      value: board.spd.required ? board.spd.type : 'Optional',
      detail: board.spd.rationale,
      reg: board.spd.reg,
      accent: board.spd.required ? 'warn' : 'info',
    });
  }

  // Phase balance
  if (board.phaseBalance) {
    const pb = board.phaseBalance;
    const accent: 'good' | 'warn' | 'info' =
      pb.flag === 'severe-imbalance' ? 'warn' : pb.flag === 'balanced' ? 'good' : 'info';
    items.push({
      title: 'Phase balance',
      value: `L1 ${(pb.L1_W / 1000).toFixed(1)} · L2 ${(pb.L2_W / 1000).toFixed(1)} · L3 ${(pb.L3_W / 1000).toFixed(1)} kW`,
      detail: `${pb.imbalancePercent.toFixed(0)}% spread · ${pb.flag?.replace('-', ' ')}`,
      reg: '525.1.2',
      accent,
    });
  }

  // Discrimination
  if (board.discrimination && board.discrimination.largestChildRating > 0) {
    items.push({
      title: 'Discrimination',
      value: `${board.discrimination.ratio.toFixed(1)}:1`,
      detail: board.discrimination.note,
      reg: '536.4',
      accent: board.discrimination.ok ? 'good' : 'warn',
    });
  }

  if (items.length === 0) return null;

  return (
    <div className="mt-4 border-t border-white/[0.06] pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <div
            key={i}
            className={cn(
              'rounded-xl px-3.5 py-3 border',
              it.accent === 'warn'
                ? 'border-amber-500/30 bg-amber-500/[0.04]'
                : it.accent === 'good'
                  ? 'border-emerald-500/30 bg-emerald-500/[0.04]'
                  : 'border-white/[0.10] bg-[hsl(0_0%_8%)]'
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span
                className={cn(
                  'text-[9.5px] font-semibold uppercase tracking-[0.18em]',
                  it.accent === 'warn'
                    ? 'text-amber-300'
                    : it.accent === 'good'
                      ? 'text-emerald-400'
                      : 'text-white/65'
                )}
              >
                {it.title}
              </span>
              {it.reg && (
                <span className="text-[9.5px] font-semibold tabular-nums text-white/55 border border-white/10 rounded px-1.5 py-0.5">
                  {it.reg}
                </span>
              )}
            </div>
            <div className="mt-1 text-[12.5px] font-semibold tabular-nums text-white">
              {it.value}
            </div>
            {it.detail && (
              <p className="mt-1.5 text-[11px] leading-relaxed text-white/60">{it.detail}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CircuitDetail = ({
  circuit,
  circuitIndex,
  totalCircuits,
  context,
  editHistory,
  onEdit,
  complianceScore,
  circuitCost,
  allBoards,
  onMoveToBoard,
  boardZdb,
  supplyZe,
}: {
  circuit: any;
  circuitIndex: number;
  totalCircuits: number;
  context?: CircuitContext;
  editHistory: { field: string; before: unknown; after: unknown; editedAt: number }[];
  onEdit: (field: string, value: unknown) => void;
  complianceScore?: number;
  circuitCost?: InstallationCost['perCircuit'][number];
  allBoards: Array<{ id: string; name: string }>;
  onMoveToBoard: (boardId: string) => void;
  /** This circuit's parent board Zdb (Ω). Used to compute corrected Zs. */
  boardZdb?: number;
  /** Supply Ze (Ω) — the AI assumed this when calculating Zs. */
  supplyZe?: number;
}) => {
  const status = getCircuitStatus(circuit);
  const regs = getRegRefs(circuit);
  const vd = circuit?.calculations?.voltageDrop;
  const justification = circuit?.justifications?.designJustification ||
    circuit?.justifications?.cableSize ||
    circuit?.structuredOutput?.sections?.designJustification ||
    '';

  const boardLabel = context?.boardName ?? 'Circuit';
  const wayLabel = context ? `Way ${String(context.wayNumber).padStart(2, '0')}` : `${String(circuitIndex + 1).padStart(2, '0')} of ${totalCircuits}`;
  const phaseLabel = context?.phaseAssignment;

  const editedFields = new Set(editHistory.map((h) => h.field));
  const isEdited = (field: string) => editedFields.has(field);

  return (
    <section className="space-y-5">
      {/* Header — circuit name is editable (Tier 1 free).
          Mobile: stacked (title block on top, badges row below) so the
          eyebrow and load-type don't get squashed into a 1-word column.
          Desktop: side-by-side. */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:flex-wrap gap-2 sm:gap-3">
        <div className="space-y-1 min-w-0 sm:flex-1">
          <Eyebrow>
            {boardLabel.toUpperCase()} · {wayLabel.toUpperCase()}
            {phaseLabel ? ` · ${phaseLabel === 'L1L2L3' ? '3φ' : phaseLabel}` : ''}
          </Eyebrow>
          <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold tracking-tight leading-[1.1] text-white">
            <EditableField
              kind="text"
              label="Circuit name"
              value={circuit.name ?? ''}
              edited={isEdited('name')}
              validate={(v) => validateNameChange(circuit, v)}
              onCommit={(v) => onEdit('name', v)}
              valueClassName="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold tracking-tight leading-[1.1] text-white"
            />
          </h3>
          <p className="text-[12.5px] text-white/60 capitalize">
            {String(circuit.loadType ?? '').replace(/-/g, ' ')}
          </p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap">
          {circuitCost && (
            <span
              className="text-[11px] font-semibold tabular-nums px-2 py-0.5 rounded-md border text-elec-yellow border-elec-yellow/30 bg-elec-yellow/[0.06]"
              title={`Cable ${formatGBP(circuitCost.cable)} · Protection ${formatGBP(circuitCost.protection)} · Materials ${formatGBP(circuitCost.fixed)} (indicative)`}
            >
              {formatGBP(circuitCost.total)}
            </span>
          )}
          {complianceScore != null && (
            <span
              className={cn(
                'text-[11px] font-semibold tabular-nums px-2 py-0.5 rounded-md border',
                complianceScore >= 90
                  ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/[0.06]'
                  : complianceScore >= 75
                    ? 'text-elec-yellow border-elec-yellow/30 bg-elec-yellow/[0.06]'
                    : 'text-amber-400 border-amber-500/30 bg-amber-500/[0.06]'
              )}
              title="Compliance score — derived from regulation cites + tripwires + ungrounded choices"
            >
              {complianceScore}%
            </span>
          )}
          <span
            className={cn(
              'text-[10.5px] uppercase tracking-[0.18em] font-semibold whitespace-nowrap',
              status === 'pass' ? 'text-emerald-400' : 'text-amber-400'
            )}
          >
            {/* Short label on mobile, full on desktop */}
            <span className="sm:hidden">{status === 'pass' ? 'PASS' : 'REVIEW'}</span>
            <span className="hidden sm:inline">{status === 'pass' ? 'PASS' : 'REVIEW REQUIRED'}</span>
          </span>
          {status === 'review' && (
            <AutoFixButton
              circuit={circuit}
              onEdit={onEdit}
              boardZdbDelta={Math.max(0, Number(boardZdb ?? 0) - Number(supplyZe ?? 0.35))}
              supplyZe={Number(supplyZe ?? 0.35)}
            />
          )}
        </div>
      </div>

      {/* 01 · LOAD — diversity factor + special location editable */}
      <DetailSection number="01" title="LOAD">
        <DetailGrid>
          <DetailField label="Power" value={`${(circuit.loadPower / 1000).toFixed(2)} kW`} />
          <DetailField
            label="Design current (Ib)"
            value={`${Number(circuit?.calculations?.Ib ?? 0).toFixed(2)} A`}
          />
          <DetailField label="Phases" value={circuit.phases === 'three' ? 'Three' : 'Single'} />
          {/* Board assignment — pick which board this circuit lives on. The
              user can move circuits between boards to override the
              recommender's grouping (split a board, merge into another, etc).
              Picker shows current board as the value but lists OTHER boards
              as the move targets — selecting a different one fires the move. */}
          {allBoards.length > 1 && context?.boardId && (
            <EditableDetailField
              label="Board"
              isEdited={false}
              field={
                <EditableField
                  kind="select"
                  label="Board"
                  value={context.boardId}
                  options={allBoards.map((b) => ({
                    value: b.id,
                    label: b.id === context.boardId ? `${b.name} (current)` : `Move to ${b.name}`,
                  }))}
                  validate={() => ({ ok: true as const })}
                  onCommit={(v) => {
                    const target = String(v);
                    if (target !== context.boardId) onMoveToBoard(target);
                  }}
                />
              }
            />
          )}
          {/* Phase assignment — only editable for single-phase circuits on 3φ boards.
              The user's choice pins the phase; the recommender honours it and
              greedy-balances the remaining circuits around it. */}
          {context?.boardId &&
            circuit.phases !== 'three' &&
            (context?.phaseAssignment === 'L1' ||
              context?.phaseAssignment === 'L2' ||
              context?.phaseAssignment === 'L3') && (
              <EditableDetailField
                label="Phase assignment"
                isEdited={isEdited('phaseAssignment')}
                field={
                  <EditableField
                    kind="select"
                    label="Phase"
                    value={String(context.phaseAssignment)}
                    edited={isEdited('phaseAssignment')}
                    options={[
                      { value: 'L1', label: 'L1 (brown)' },
                      { value: 'L2', label: 'L2 (black)' },
                      { value: 'L3', label: 'L3 (grey)' },
                    ]}
                    validate={() => ({ ok: true as const })}
                    onCommit={(v) => onEdit('phaseAssignment', v)}
                  />
                }
              />
            )}
          <EditableDetailField
            label="Diversity factor"
            isEdited={isEdited('calculations.diversityFactor')}
            field={
              <EditableField
                kind="number"
                label="Diversity factor"
                value={Number(circuit?.calculations?.diversityFactor ?? 1)}
                step={0.05}
                edited={isEdited('calculations.diversityFactor')}
                validate={(v) => validateDiversityFactorChange(circuit, v)}
                onCommit={(v) => onEdit('calculations.diversityFactor', v)}
              />
            }
          />
          <EditableDetailField
            label="Special location"
            isEdited={isEdited('specialLocation')}
            field={
              <EditableField
                kind="select"
                label="Special location"
                value={String(circuit?.specialLocation ?? 'none')}
                edited={isEdited('specialLocation')}
                options={SPECIAL_LOCATIONS}
                validate={(v) => validateSpecialLocationChange(circuit, String(v))}
                onCommit={(v) => onEdit('specialLocation', v)}
              />
            }
          />
          {circuit?.calculations?.diversifiedLoad ? (
            <DetailField
              label="Diversified load"
              value={`${(circuit.calculations.diversifiedLoad / 1000).toFixed(2)} kW`}
            />
          ) : null}
          <DetailField
            label="Voltage"
            value={`${circuit.voltage ?? 230} V`}
          />
        </DetailGrid>
      </DetailSection>

      {/* 02 · CABLE — size + length editable, validated */}
      <DetailSection number="02" title="CABLE">
        <DetailGrid>
          <EditableDetailField
            label="Live conductor"
            isEdited={isEdited('cableSize')}
            lock={checkTier4Lock(circuit, 'cableSize')}
            field={
              <EditableField
                kind="select"
                label="Cable size"
                value={String(circuit.cableSize ?? '')}
                format={(v) => (v ? `${v} mm²` : '—')}
                edited={isEdited('cableSize')}
                lock={checkTier4Lock(circuit, 'cableSize')}
                options={CABLE_SIZE_OPTIONS}
                validate={(v) => validateCableSizeChange(circuit, Number(v))}
                onCommit={(v) => onEdit('cableSize', Number(v))}
              />
            }
          />
          <EditableDetailField
            label="CPC"
            isEdited={isEdited('cpcSize')}
            field={
              <EditableField
                kind="select"
                label="CPC size"
                value={String(circuit.cpcSize ?? '')}
                format={(v) => (v ? `${v} mm²` : '—')}
                edited={isEdited('cpcSize')}
                options={CPC_SIZE_OPTIONS}
                validate={(v) => validateCpcSizeChange(circuit, Number(v))}
                onCommit={(v) => onEdit('cpcSize', Number(v))}
              />
            }
          />
          <EditableDetailField
            label="Cable type"
            isEdited={isEdited('cableType')}
            lock={checkTier4Lock(circuit, 'cableType')}
            className="sm:col-span-2"
            field={
              <EditableField
                kind="select"
                label="Cable type"
                value={String(circuit.cableType ?? '')}
                edited={isEdited('cableType')}
                lock={checkTier4Lock(circuit, 'cableType')}
                options={getAllowedCableTypes(circuit).map((t) => ({ value: t, label: t }))}
                validate={(v) => validateCableTypeChange(circuit, String(v))}
                onCommit={(v) => onEdit('cableType', v)}
              />
            }
          />
          <EditableDetailField
            label="Length"
            isEdited={isEdited('cableLength')}
            field={
              <EditableField
                kind="number"
                label="Cable length"
                value={Number(circuit.cableLength ?? 0)}
                format={(v) => `${v} m`}
                edited={isEdited('cableLength')}
                step={1}
                validate={(v) => validateLengthChange(circuit, v)}
                onCommit={(v) => onEdit('cableLength', v)}
              />
            }
          />
          <EditableDetailField
            label="Method"
            isEdited={isEdited('installationMethod')}
            className="sm:col-span-2"
            field={
              <EditableField
                kind="select"
                label="Installation method"
                value={String(circuit.installationMethod ?? 'C')}
                format={(v) => {
                  // Match the saved value (which may be the full label) back to a short token
                  const code = String(v).match(/^[A-F]/)?.[0] ?? String(v)[0] ?? 'C';
                  return INSTALLATION_METHODS.find((m) => m.value === code)?.label ?? String(v);
                }}
                edited={isEdited('installationMethod')}
                options={INSTALLATION_METHODS}
                validate={(v) => validateInstallationMethodChange(circuit, String(v))}
                onCommit={(v) => onEdit('installationMethod', v)}
              />
            }
          />
          <DetailField
            label="Iz (current capacity)"
            value={
              circuit?.calculations?.Iz != null
                ? `${Number(circuit.calculations.Iz).toFixed(1)} A`
                : '—'
            }
          />
          {circuit.cable_table_ref ? (
            <DetailField
              label="Table"
              value={circuit.cable_table_ref}
              chip={circuit.cable_table_ref !== 'ungrounded'}
              warn={circuit.cable_table_ref === 'ungrounded'}
            />
          ) : null}
        </DetailGrid>
      </DetailSection>

      {/* 03 · PROTECTION — rating editable, validated */}
      <DetailSection number="03" title="PROTECTION">
        <DetailGrid>
          <DetailField label="Device" value={circuit.protectionDevice?.type ?? '—'} />
          <EditableDetailField
            label="Rating"
            isEdited={isEdited('protectionDevice.rating')}
            lock={checkTier4Lock(circuit, 'protectionRating')}
            field={
              <EditableField
                kind="select"
                label="Protection rating"
                value={String(circuit.protectionDevice?.rating ?? '')}
                format={(v) => (v ? `${v} A` : '—')}
                edited={isEdited('protectionDevice.rating')}
                lock={checkTier4Lock(circuit, 'protectionRating')}
                options={PROTECTION_RATING_OPTIONS}
                validate={(v) => validateProtectionRatingChange(circuit, Number(v))}
                onCommit={(v) => onEdit('protectionDevice.rating', Number(v))}
              />
            }
          />
          <EditableDetailField
            label="Curve"
            isEdited={isEdited('protectionDevice.curve')}
            field={
              <EditableField
                kind="select"
                label="Protection curve"
                value={String(circuit.protectionDevice?.curve ?? 'B')}
                edited={isEdited('protectionDevice.curve')}
                options={[
                  { value: 'B', label: 'B' },
                  { value: 'C', label: 'C' },
                  { value: 'D', label: 'D' },
                ]}
                validate={(v) => validateProtectionCurveChange(circuit, String(v))}
                onCommit={(v) => onEdit('protectionDevice.curve', v)}
              />
            }
          />
          <DetailField
            label="Breaking capacity"
            value={`${circuit.protectionDevice?.kaRating ?? '—'} kA`}
          />
          <DetailField
            label="RCD protected"
            value={circuit.rcdProtected ? 'Yes' : 'No'}
          />
        </DetailGrid>
      </DetailSection>

      {/* 04 · COMPLIANCE */}
      <DetailSection number="04" title="COMPLIANCE">
        <DetailGrid>
          {vd ? (
            <DetailField
              label="Voltage drop"
              value={`${Number(vd.percent ?? 0).toFixed(2)}% (${Number(vd.volts ?? 0).toFixed(2)} V)`}
              warn={vd.compliant === false}
            />
          ) : null}
          {vd ? (
            <DetailField
              label="VD limit"
              value={`${vd.limit ?? '—'}%`}
            />
          ) : null}
          {(() => {
            // The AI calculates Zs assuming supply Ze. For circuits on a
            // submain board, the real loop starts from the board's Zdb (Ze
            // PLUS the submain feed loop). Add the difference.
            const aiZs = Number(circuit?.calculations?.zs ?? NaN);
            const maxZs = Number(circuit?.calculations?.maxZs ?? NaN);
            const ze = Number(supplyZe ?? 0.35);
            const zdb = Number(boardZdb ?? ze);
            const correction = Math.max(0, zdb - ze);
            const correctedZs = Number.isFinite(aiZs) ? aiZs + correction : NaN;
            const isSubmain = correction > 0.01;
            const correctedFails =
              Number.isFinite(correctedZs) &&
              Number.isFinite(maxZs) &&
              correctedZs > maxZs;
            return (
              <>
                <DetailField
                  label={isSubmain ? 'Zs (corrected for submain chain)' : 'Zs (calculated)'}
                  value={Number.isFinite(correctedZs) ? `${correctedZs.toFixed(2)} Ω` : '—'}
                  warn={correctedFails}
                />
                {isSubmain && Number.isFinite(aiZs) && (
                  <DetailField
                    label="Zs as designed (Ze-based)"
                    value={`${aiZs.toFixed(2)} Ω · +${correction.toFixed(2)} Ω from submain chain`}
                  />
                )}
                <DetailField
                  label="Max Zs permitted"
                  value={Number.isFinite(maxZs) ? `${maxZs.toFixed(2)} Ω` : '—'}
                />
              </>
            );
          })()}
          <DetailField
            label="In (device rating)"
            value={`${circuit?.calculations?.In ?? '—'} A`}
          />
        </DetailGrid>
      </DetailSection>

      {/* 05 · TESTS */}
      <DetailSection number="05" title="TEST VALUES">
        <DetailGrid>
          <DetailField
            label="R1+R2 @ 20°C"
            value={
              circuit?.expectedTests?.r1r2?.at20C != null
                ? `${Number(circuit.expectedTests.r1r2.at20C).toFixed(3)} Ω`
                : '—'
            }
          />
          <DetailField
            label="R1+R2 @ 70°C"
            value={
              circuit?.expectedTests?.r1r2?.at70C != null
                ? `${Number(circuit.expectedTests.r1r2.at70C).toFixed(3)} Ω`
                : '—'
            }
          />
          <DetailField
            label="Insulation resistance"
            value={
              circuit?.expectedTests?.insulationResistance?.minResistance ??
              '≥1.0 MΩ @ 500 V DC'
            }
          />
          <DetailField
            label="RCD trip (1×)"
            value={circuit?.expectedTests?.rcdTest?.at1x ?? '—'}
          />
          <DetailField
            label="RCD trip (5×)"
            value={circuit?.expectedTests?.rcdTest?.at5x ?? '—'}
          />
          <DetailField
            label="Polarity"
            value={circuit?.expectedTests?.polarity ?? 'Verify all terminations'}
            className="sm:col-span-2 lg:col-span-3"
          />
        </DetailGrid>
      </DetailSection>

      {/* 06 · GROUNDING */}
      <DetailSection number="06" title="GROUNDING">
        <div className="space-y-4">
          {regs.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {regs.map((r, i) => (
                <span
                  key={i}
                  title={r.reason}
                  className="text-[11px] font-semibold tabular-nums px-2.5 py-1 rounded-md bg-elec-yellow/[0.08] text-elec-yellow border border-elec-yellow/25"
                >
                  {r.reg}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[12px] text-amber-400">
              No regulation refs cited — older job or fallback design. Newer designs cite at least 2 regs per circuit.
            </p>
          )}

          {Array.isArray(circuit.ungrounded_choices) && circuit.ungrounded_choices.length > 0 && (
            <div className="bg-amber-500/[0.06] border border-amber-500/30 rounded-xl p-4 space-y-2">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                Ungrounded choices · review
              </div>
              <ul className="space-y-1 text-[12.5px] text-white/85">
                {circuit.ungrounded_choices.map((u: string, i: number) => (
                  <li key={i}>· {u}</li>
                ))}
              </ul>
            </div>
          )}

          {justification && (
            <div className="bg-[hsl(0_0%_8%)] border border-white/[0.08] rounded-xl p-4 sm:p-5">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                Designer's reasoning
              </div>
              <p className="text-[13px] leading-relaxed text-white/85 whitespace-pre-wrap">
                {justification}
              </p>
            </div>
          )}
        </div>
      </DetailSection>

      {/* 07 · NOTES — free-text annotation */}
      <DetailSection number="07" title="NOTES">
        <div className="space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55 inline-flex items-center gap-1.5">
            Designer notes
            {isEdited('notes') && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-elec-yellow"
                aria-label="edited"
              />
            )}
          </span>
          <div className="text-[14px] font-medium text-white">
            <EditableField
              kind="text"
              label="Notes"
              value={String((circuit as any).notes ?? '')}
              edited={isEdited('notes')}
              format={(v) => (String(v).trim().length ? String(v) : 'Tap to add notes…')}
              validate={(v) => validateNotesChange(circuit, v)}
              onCommit={(v) => onEdit('notes', v)}
              valueClassName="text-[14px] font-medium text-white/85"
            />
          </div>
          <p className="text-[11px] leading-relaxed text-white/45">
            Notes appear on the EIC schedule and PDF export · max 500 characters.
          </p>
        </div>
      </DetailSection>
    </section>
  );
};

/**
 * Phase colour stripe — left-edge accent. L1 brown, L2 black, L3 grey,
 * 3φ gradient. BS 7671 harmonised colour conventions.
 */
const phaseStripeClass = (phase?: 'L1' | 'L2' | 'L3' | 'L1L2L3'): string => {
  if (phase === 'L1') return 'before:bg-amber-700/60';
  if (phase === 'L2') return 'before:bg-zinc-800/70';
  if (phase === 'L3') return 'before:bg-slate-400/60';
  if (phase === 'L1L2L3')
    return 'before:bg-gradient-to-b before:from-amber-700/60 before:via-zinc-800/60 before:to-slate-400/60';
  return 'before:bg-white/10';
};

const phaseLabel = (phase?: 'L1' | 'L2' | 'L3' | 'L1L2L3'): string =>
  phase === 'L1L2L3' ? '3φ' : phase ?? '';

/**
 * Circuits navigation — grouped by board, with each board's ways numbered
 * locally 01-N, phase colour stripes, and PASS/REVIEW status.
 */
/**
 * Circuit nav — board-grouped with structural editing.
 *
 * On 3φ boards, ways are laid out as the real CU does it: rows = ways,
 * columns = phases (L1 · L2 · L3). A 1φ circuit occupies one phase cell;
 * a 3φ circuit spans all three; empty phase cells render dimmed.
 *
 * On 1φ boards, the layout stays as a multi-column grid of way cards.
 *
 * Reorder is via explicit ↑/↓ buttons on each way (much more reliable than
 * drag-on-grid). Add spare row at bottom. Delete via ✕ icon (with 5s undo
 * toast for circuits).
 */
const BoardGroupedNav = ({
  boards,
  submainFeeds,
  circuits,
  selectedIdx,
  onSelect,
  context,
  totalPass,
  totalCircuits,
  getWayOrder,
  setBoardWayOrder,
  onAddSpare,
  onDeleteCircuit,
  onDeleteSpare,
}: {
  boards: BoardRecommendation[];
  submainFeeds: SubmainFeed[];
  circuits: any[];
  selectedIdx: number;
  onSelect: (i: number) => void;
  context: Map<number, CircuitContext>;
  totalPass: number;
  totalCircuits: number;
  getWayOrder: (boardId: string, defaultIndices: number[]) => WayItem[];
  setBoardWayOrder: (boardId: string, items: WayItem[]) => void;
  onAddSpare: (boardId: string) => void;
  onDeleteCircuit: (circuitIdx: number, name: string) => void;
  onDeleteSpare: (boardId: string, spareId: string) => void;
}) => {
  const feedsByParent = new Map<string, SubmainFeed[]>();
  submainFeeds.forEach((f) => {
    feedsByParent.set(f.parentBoardId, [...(feedsByParent.get(f.parentBoardId) ?? []), f]);
  });

  /** Move a way one position up/down within its board. */
  const moveWay = (boardId: string, items: WayItem[], from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = items.slice();
    const [picked] = next.splice(from, 1);
    next.splice(to, 0, picked);
    setBoardWayOrder(boardId, next);
  };

  return (
    <section className="space-y-5 sm:space-y-6">
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow>05 · CIRCUITS</Eyebrow>
        <span className="text-[11px] text-white/60 tabular-nums">
          {totalCircuits} total · {totalPass} pass
        </span>
      </div>

      <div className="space-y-6 sm:space-y-7">
        {boards.map((board) => {
          const originatingFeeds = feedsByParent.get(board.id) ?? [];
          const wayItems = getWayOrder(board.id, board.circuitIndices);
          const totalWays = originatingFeeds.length + wayItems.length;
          const isThreePhase = board.phaseBalance != null;

          return (
            <div key={board.id} className="space-y-3">
              {/* Board sub-header */}
              <div className="flex items-baseline justify-between gap-3 px-0.5">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                    {board.isOrigin ? 'ORIGIN' : 'SUBMAIN'}
                  </span>
                  <h4 className="text-[14px] sm:text-[15px] font-semibold tracking-tight text-white truncate">
                    {board.name}
                  </h4>
                </div>
                <span className="text-[10.5px] text-white/55 tabular-nums shrink-0">
                  {totalWays} ways · {board.mainSwitchRating}A
                </span>
              </div>

              {isThreePhase ? (
                <>
                  {/* Desktop: TP+N table with phase columns */}
                  <div className="hidden md:block">
                    <TPNCircuitsBoard
                      board={board}
                      originatingFeeds={originatingFeeds}
                      wayItems={wayItems}
                      circuits={circuits}
                      selectedIdx={selectedIdx}
                      onSelect={onSelect}
                      context={context}
                      onMove={(from, to) => moveWay(board.id, wayItems, from, to)}
                      onDeleteCircuit={onDeleteCircuit}
                      onDeleteSpare={(spareId) => onDeleteSpare(board.id, spareId)}
                    />
                  </div>
                  {/* Mobile: card list with phase colour stripe (avoids 4-col scroll) */}
                  <div className="md:hidden">
                    <SinglePhaseCircuitsBoard
                      board={board}
                      originatingFeeds={originatingFeeds}
                      wayItems={wayItems}
                      circuits={circuits}
                      selectedIdx={selectedIdx}
                      onSelect={onSelect}
                      context={context}
                      onMove={(from, to) => moveWay(board.id, wayItems, from, to)}
                      onDeleteCircuit={onDeleteCircuit}
                      onDeleteSpare={(spareId) => onDeleteSpare(board.id, spareId)}
                    />
                  </div>
                </>
              ) : (
                <SinglePhaseCircuitsBoard
                  board={board}
                  originatingFeeds={originatingFeeds}
                  wayItems={wayItems}
                  circuits={circuits}
                  selectedIdx={selectedIdx}
                  onSelect={onSelect}
                  context={context}
                  onMove={(from, to) => moveWay(board.id, wayItems, from, to)}
                  onDeleteCircuit={onDeleteCircuit}
                  onDeleteSpare={(spareId) => onDeleteSpare(board.id, spareId)}
                />
              )}

              {/* Add spare way */}
              <button
                type="button"
                onClick={() => onAddSpare(board.id)}
                className="w-full sm:w-auto text-[12px] font-semibold text-white/55 hover:text-elec-yellow border border-dashed border-white/15 hover:border-elec-yellow/40 rounded-xl px-4 py-2.5 transition-colors touch-manipulation"
              >
                + Add spare way
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ─── 3φ TP+N circuits board (rows = ways, columns = L1/L2/L3) ────────────────

const TPNCircuitsBoard = ({
  board,
  originatingFeeds,
  wayItems,
  circuits,
  selectedIdx,
  onSelect,
  context,
  onMove,
  onDeleteCircuit,
  onDeleteSpare,
}: {
  board: BoardRecommendation;
  originatingFeeds: SubmainFeed[];
  wayItems: WayItem[];
  circuits: any[];
  selectedIdx: number;
  onSelect: (i: number) => void;
  context: Map<number, CircuitContext>;
  onMove: (from: number, to: number) => void;
  onDeleteCircuit: (idx: number, name: string) => void;
  onDeleteSpare: (spareId: string) => void;
}) => (
  <div className="overflow-x-auto">
    <div className="min-w-[640px] bg-[hsl(0_0%_8%)] border border-white/[0.08] rounded-2xl overflow-hidden">
      {/* Header row: phase columns */}
      <div className="grid grid-cols-[72px_1fr_1fr_1fr_44px] border-b border-white/[0.06]">
        <div className="px-3 py-2.5 border-r border-white/[0.06]">
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
            Way
          </span>
        </div>
        <PhaseHeaderCell phase="L1" colour="bg-amber-700/60" />
        <PhaseHeaderCell phase="L2" colour="bg-zinc-800/70" />
        <PhaseHeaderCell phase="L3" colour="bg-slate-400/60" />
        <div className="border-r border-white/[0.06]" />
      </div>

      {/* Submain feed rows (locked, top) */}
      {originatingFeeds.map((feed, fi) => (
        <div
          key={`feed-${feed.childBoardId}`}
          className="grid grid-cols-[72px_1fr_1fr_1fr_44px] bg-elec-yellow/[0.04] border-b border-white/[0.04]"
        >
          <WayLabelCell wayLabel={String(fi + 1).padStart(2, '0')} accent />
          {feed.feedPhases === 'three' ? (
            <FeedSpanCell feed={feed} />
          ) : (
            <>
              {(['L1', 'L2', 'L3'] as const).map((p) =>
                feed.feedSourcePhase === p ? (
                  <FeedPhaseCell key={p} feed={feed} />
                ) : (
                  <EmptyPhaseCell key={p} />
                )
              )}
            </>
          )}
          <div className="border-r border-white/[0.06]" />
        </div>
      ))}

      {/* Way rows — circuits + spares */}
      {wayItems.map((item, localIdx) => {
        const wayNum = originatingFeeds.length + localIdx + 1;
        const wayLabel = String(wayNum).padStart(2, '0');

        if (item.kind === 'spare') {
          return (
            <div
              key={item.key}
              className="grid grid-cols-[72px_1fr_1fr_1fr_44px] border-b border-white/[0.04]"
            >
              <WayLabelMoveCell
                wayLabel={wayLabel}
                onUp={() => onMove(localIdx, localIdx - 1)}
                onDown={() => onMove(localIdx, localIdx + 1)}
                disableUp={localIdx === 0}
                disableDown={localIdx === wayItems.length - 1}
              />
              <div className="col-span-3 px-3 py-3 bg-[hsl(0_0%_5%)] border-r border-white/[0.04] flex items-center">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/30">
                  SPARE
                </span>
              </div>
              <DeleteCell onClick={() => onDeleteSpare(item.spareId)} />
            </div>
          );
        }

        const globalIdx = item.circuitIdx;
        const c = circuits[globalIdx];
        if (!c) return null;
        const ctx = context.get(globalIdx);
        const phase = ctx?.phaseAssignment;
        const status = getCircuitStatus(c);
        const selected = globalIdx === selectedIdx;

        return (
          <div
            key={item.key}
            className={cn(
              'grid grid-cols-[72px_1fr_1fr_1fr_44px] border-b border-white/[0.04]',
              status === 'review' && 'bg-amber-500/[0.04]',
              selected && 'bg-elec-yellow/[0.04]'
            )}
          >
            <WayLabelMoveCell
              wayLabel={wayLabel}
              status={status}
              onUp={() => onMove(localIdx, localIdx - 1)}
              onDown={() => onMove(localIdx, localIdx + 1)}
              disableUp={localIdx === 0}
              disableDown={localIdx === wayItems.length - 1}
            />
            {phase === 'L1L2L3' ? (
              <CircuitSelectableSpan
                circuit={c}
                onSelect={() => onSelect(globalIdx)}
                selected={selected}
              />
            ) : (
              <>
                {(['L1', 'L2', 'L3'] as const).map((p) =>
                  phase === p ? (
                    <CircuitSelectableCell
                      key={p}
                      circuit={c}
                      onSelect={() => onSelect(globalIdx)}
                      selected={selected}
                    />
                  ) : (
                    <EmptyPhaseCell key={p} />
                  )
                )}
              </>
            )}
            <DeleteCell
              onClick={() => onDeleteCircuit(globalIdx, c.name ?? `Circuit ${globalIdx + 1}`)}
            />
          </div>
        );
      })}
    </div>
  </div>
);

const WayLabelMoveCell = ({
  wayLabel,
  status,
  onUp,
  onDown,
  disableUp,
  disableDown,
}: {
  wayLabel: string;
  status?: CircuitStatus;
  onUp: () => void;
  onDown: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
}) => (
  <div className="bg-[hsl(0_0%_8%)] px-2 py-2 flex flex-col items-center justify-center gap-1 border-r border-white/[0.06]">
    <button
      type="button"
      onClick={onUp}
      disabled={disableUp}
      aria-label="Move way up"
      className="w-5 h-5 flex items-center justify-center text-white/40 hover:text-elec-yellow disabled:opacity-25 disabled:cursor-not-allowed touch-manipulation"
    >
      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 4 3 9l1 1 4-4 4 4 1-1Z" />
      </svg>
    </button>
    <span
      className={cn(
        'text-[10.5px] font-semibold uppercase tracking-[0.16em] tabular-nums',
        status === 'review' ? 'text-amber-400' : 'text-elec-yellow'
      )}
    >
      {wayLabel}
    </span>
    <button
      type="button"
      onClick={onDown}
      disabled={disableDown}
      aria-label="Move way down"
      className="w-5 h-5 flex items-center justify-center text-white/40 hover:text-elec-yellow disabled:opacity-25 disabled:cursor-not-allowed touch-manipulation"
    >
      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 12 3 7l1-1 4 4 4-4 1 1Z" />
      </svg>
    </button>
  </div>
);

const DeleteCell = ({ onClick }: { onClick: () => void }) => (
  <div className="bg-[hsl(0_0%_8%)] flex items-center justify-center border-r border-white/[0.06]">
    <button
      type="button"
      onClick={onClick}
      aria-label="Delete way"
      className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-amber-400 rounded touch-manipulation transition-colors"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11.5 4.5 8 8l3.5 3.5-1 1L7 9l-3.5 3.5-1-1L6 8 2.5 4.5l1-1L7 7l3.5-3.5 1 1Z" />
      </svg>
    </button>
  </div>
);

const CircuitSelectableCell = ({
  circuit,
  onSelect,
  selected,
}: {
  circuit: any;
  onSelect: () => void;
  selected: boolean;
}) => (
  <button
    type="button"
    onClick={onSelect}
    className={cn(
      'bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_12%)] px-3 py-3 border-r border-white/[0.04] last:border-r-0 min-w-0 text-left transition-colors touch-manipulation',
      selected && 'bg-elec-yellow/[0.06]'
    )}
  >
    <div
      className={cn(
        'text-[10px] font-semibold tabular-nums',
        selected ? 'text-elec-yellow' : 'text-white'
      )}
    >
      {circuit.protectionDevice?.rating ?? '—'}A {circuit.protectionDevice?.curve ?? ''}
    </div>
    <div className="mt-0.5 text-[11.5px] font-semibold text-white truncate leading-tight">
      {circuit.name}
    </div>
    <div className="mt-0.5 text-[10px] text-white/55 tabular-nums truncate">
      {circuit.protectionDevice?.type ?? 'MCB'}
      {circuit.cableSize ? ` · ${circuit.cableSize} mm²` : ''}
    </div>
  </button>
);

const CircuitSelectableSpan = ({
  circuit,
  onSelect,
  selected,
}: {
  circuit: any;
  onSelect: () => void;
  selected: boolean;
}) => (
  <button
    type="button"
    onClick={onSelect}
    className={cn(
      'col-span-3 bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_12%)] px-3 py-3 border-r border-white/[0.04] text-left transition-colors touch-manipulation relative',
      selected && 'bg-elec-yellow/[0.06]'
    )}
  >
    <div className="absolute inset-y-2 left-0 right-0 bg-gradient-to-r from-red-400/10 via-yellow-400/10 to-blue-400/10 pointer-events-none" />
    <div className="relative flex items-baseline justify-between gap-3 flex-wrap">
      <div className="min-w-0">
        <div
          className={cn(
            'text-[10px] font-semibold tabular-nums',
            selected ? 'text-elec-yellow' : 'text-elec-yellow'
          )}
        >
          {circuit.protectionDevice?.rating ?? '—'}A {circuit.protectionDevice?.curve ?? ''} · 3φ
        </div>
        <div className="mt-0.5 text-[12px] font-semibold text-white truncate leading-tight">
          {circuit.name}
        </div>
      </div>
      <span className="text-[10px] text-white/55 tabular-nums">
        {circuit.protectionDevice?.type ?? 'MCB'}
        {circuit.cableSize ? ` · ${circuit.cableSize} mm²` : ''}
      </span>
    </div>
  </button>
);

// ─── 1φ circuits board (multi-column grid of way cards) ──────────────────────

const SinglePhaseCircuitsBoard = ({
  board,
  originatingFeeds,
  wayItems,
  circuits,
  selectedIdx,
  onSelect,
  context,
  onMove,
  onDeleteCircuit,
  onDeleteSpare,
}: {
  board: BoardRecommendation;
  originatingFeeds: SubmainFeed[];
  wayItems: WayItem[];
  circuits: any[];
  selectedIdx: number;
  onSelect: (i: number) => void;
  context: Map<number, CircuitContext>;
  onMove: (from: number, to: number) => void;
  onDeleteCircuit: (idx: number, name: string) => void;
  onDeleteSpare: (spareId: string) => void;
}) => {
  void board;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
      {/* Submain feeds first */}
      {originatingFeeds.map((feed, fi) => (
        <div
          key={`feed-${feed.childBoardId}`}
          className={cn(
            'relative bg-elec-yellow/[0.04] border border-elec-yellow/30 rounded-xl px-3.5 py-3 min-h-[76px]',
            'before:absolute before:left-0 before:top-3 before:bottom-3 before:w-[3px] before:rounded-r-md before:bg-elec-yellow/60'
          )}
        >
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
              {String(fi + 1).padStart(2, '0')}
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.16em] font-semibold text-elec-yellow">
              {feed.feedPhaseLabel}
            </span>
          </div>
          <div className="mt-1.5 text-[13px] sm:text-[14px] font-semibold tracking-tight text-white truncate">
            → {feed.childBoardName}
          </div>
          <div className="mt-0.5 text-[11px] text-white/60 tabular-nums">
            {feed.protectionRating}A {feed.protectionType} · {feed.cableSize} mm²
          </div>
        </div>
      ))}

      {wayItems.map((item, localIdx) => {
        const wayNum = originatingFeeds.length + localIdx + 1;
        const wayLabel = String(wayNum).padStart(2, '0');

        if (item.kind === 'spare') {
          return (
            <div
              key={item.key}
              className="relative bg-[hsl(0_0%_6%)] border border-dashed border-white/15 rounded-xl px-3.5 py-3 min-h-[100px] flex flex-col"
            >
              <WayHeaderRow
                wayLabel={wayLabel}
                onUp={() => onMove(localIdx, localIdx - 1)}
                onDown={() => onMove(localIdx, localIdx + 1)}
                disableUp={localIdx === 0}
                disableDown={localIdx === wayItems.length - 1}
                onDelete={() => onDeleteSpare(item.spareId)}
                muted
              />
              <div className="mt-auto text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/30">
                SPARE
              </div>
            </div>
          );
        }

        const globalIdx = item.circuitIdx;
        const c = circuits[globalIdx];
        if (!c) return null;
        const ctx = context.get(globalIdx);
        const phase = ctx?.phaseAssignment;
        const status = getCircuitStatus(c);
        const selected = globalIdx === selectedIdx;

        return (
          <div
            key={item.key}
            className={cn(
              'relative bg-[hsl(0_0%_10%)] border rounded-xl px-3.5 py-3 min-h-[100px] flex flex-col transition-colors',
              'before:absolute before:left-0 before:top-3 before:bottom-3 before:w-[3px] before:rounded-r-md',
              phaseStripeClass(phase),
              selected
                ? 'border-elec-yellow/60 bg-gradient-to-br from-elec-yellow/[0.10] via-amber-500/[0.03] to-transparent'
                : 'border-white/[0.10] hover:border-white/20'
            )}
          >
            <WayHeaderRow
              wayLabel={wayLabel}
              status={status}
              onUp={() => onMove(localIdx, localIdx - 1)}
              onDown={() => onMove(localIdx, localIdx + 1)}
              disableUp={localIdx === 0}
              disableDown={localIdx === wayItems.length - 1}
              onDelete={() => onDeleteCircuit(globalIdx, c.name ?? `Circuit ${globalIdx + 1}`)}
            />
            <button
              type="button"
              onClick={() => onSelect(globalIdx)}
              className="text-left mt-1 flex-1 touch-manipulation rounded -mx-1 px-1 py-0.5 hover:bg-white/[0.02] transition-colors"
              aria-label={`Select ${c.name}`}
            >
              <div className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-white truncate leading-snug">
                {c.name || `Circuit ${globalIdx + 1}`}
              </div>
              <div className="mt-0.5 text-[11px] text-white/60 tabular-nums">
                {c.protectionDevice?.rating ?? '—'}A {c.protectionDevice?.curve ?? ''}{' '}
                {c.cableSize ? `· ${c.cableSize} mm²` : ''}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

const WayHeaderRow = ({
  wayLabel,
  status,
  onUp,
  onDown,
  disableUp,
  disableDown,
  onDelete,
  muted,
}: {
  wayLabel: string;
  status?: CircuitStatus;
  onUp: () => void;
  onDown: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
  onDelete: () => void;
  muted?: boolean;
}) => (
  <div className="flex items-center justify-between gap-1.5">
    <span
      className={cn(
        'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums',
        muted ? 'text-white/40' : status === 'review' ? 'text-amber-400' : 'text-elec-yellow'
      )}
    >
      {wayLabel}
    </span>
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onUp();
        }}
        disabled={disableUp}
        aria-label="Move way up"
        className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-elec-yellow disabled:opacity-25 disabled:cursor-not-allowed touch-manipulation rounded"
      >
        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4 3 9l1 1 4-4 4 4 1-1Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDown();
        }}
        disabled={disableDown}
        aria-label="Move way down"
        className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-elec-yellow disabled:opacity-25 disabled:cursor-not-allowed touch-manipulation rounded"
      >
        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 12 3 7l1-1 4 4 4-4 1 1Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        aria-label="Delete way"
        className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-amber-400 touch-manipulation rounded transition-colors"
      >
        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.5 4.5 8 8l3.5 3.5-1 1L7 9l-3.5 3.5-1-1L6 8 2.5 4.5l1-1L7 7l3.5-3.5 1 1Z" />
        </svg>
      </button>
    </div>
  </div>
);

const ActionStrip = ({
  isExporting,
  isSendingToEIC,
  onExportPDF,
  onSendToEIC,
  onSendTo,
  onReset,
}: {
  isExporting: boolean;
  isSendingToEIC: boolean;
  onExportPDF: () => void;
  onSendToEIC: () => void;
  onSendTo: (a: AgentType) => void;
  onReset?: () => void;
}) => (
  <section className="space-y-4">
    <Eyebrow>06 · NEXT</Eyebrow>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
      <ActionButton
        label={isExporting ? 'Building PDF…' : 'Download PDF'}
        primary
        disabled={isExporting}
        onClick={onExportPDF}
      />
      <ActionButton
        label={isSendingToEIC ? 'Sending…' : 'Send to EIC schedule'}
        disabled={isSendingToEIC}
        onClick={onSendToEIC}
      />
      <ActionButton label="Send to Cost Engineer" onClick={() => onSendTo('cost-engineer')} />
      <ActionButton label="Send to RAMS / H&S" onClick={() => onSendTo('rams')} />
      <ActionButton
        label="Send to Method Statement"
        onClick={() => onSendTo('method-statement')}
      />
      <ActionButton
        label="Send to Maintenance"
        onClick={() => onSendTo('maintenance')}
      />
      <ActionButton label="Send to Installer" onClick={() => onSendTo('installer')} />
      {onReset && <ActionButton label="New design" onClick={onReset} />}
    </div>
  </section>
);

// ───────────────────────────────────────────────────────────────────────────────
// Atoms
// ───────────────────────────────────────────────────────────────────────────────

const Cell = ({
  label,
  value,
  highlight,
  capitalise,
  tabular,
  className,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  capitalise?: boolean;
  tabular?: boolean;
  className?: string;
}) => (
  <div className={cn('bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-5 sm:py-4 min-w-0', className)}>
    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 truncate">
      {label}
    </div>
    <div
      className={cn(
        'mt-1 text-[13px] font-semibold truncate',
        highlight ? 'text-elec-yellow' : 'text-white',
        capitalise && 'capitalize',
        tabular && 'tabular-nums'
      )}
    >
      {value}
    </div>
  </div>
);

const BigStat = ({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  accent?: boolean;
}) => (
  <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
    <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
      {label}
    </div>
    <div
      className={cn(
        'mt-1.5 text-[20px] sm:text-[24px] lg:text-[28px] font-semibold tabular-nums leading-none',
        accent ? 'text-elec-yellow' : 'text-white'
      )}
    >
      {value}
      {unit && <span className="text-[14px] text-white/60 ml-1 font-medium">{unit}</span>}
    </div>
  </div>
);

const DetailSection = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <div className="flex items-baseline gap-2">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
        {number}
      </span>
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/85">
        · {title}
      </span>
    </div>
    <div className="sm:bg-[hsl(0_0%_10%)] sm:border sm:border-white/[0.08] sm:rounded-2xl sm:p-5 lg:p-6 py-2 border-y border-white/[0.06] sm:border-y">
      {children}
    </div>
  </div>
);

const DetailGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">{children}</div>
);

/**
 * EditableDetailField — same shape as DetailField but renders a custom inline
 * editor (an EditableField instance) instead of plain text. The label sits
 * above; the editor sits below.
 */
const EditableDetailField = ({
  label,
  field,
  isEdited,
  lock,
  className,
}: {
  label: string;
  field: React.ReactNode;
  isEdited?: boolean;
  lock?: { reason: string; reg: string } | null;
  className?: string;
}) => (
  <div className={cn('flex flex-col min-w-0', className)}>
    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55 inline-flex items-center gap-1.5">
      {label}
      {isEdited && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-elec-yellow" aria-label="edited" />
      )}
      {lock && (
        <svg className="w-3 h-3 text-white/30" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a3 3 0 0 0-3 3v3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3Zm-2 6V4a2 2 0 1 1 4 0v3H6Z" />
        </svg>
      )}
    </span>
    <span className="mt-1 text-[14px] font-semibold tabular-nums text-white">{field}</span>
  </div>
);

const DetailField = ({
  label,
  value,
  chip,
  warn,
  className,
}: {
  label: string;
  value: string;
  chip?: boolean;
  warn?: boolean;
  className?: string;
}) => (
  <div className={cn('flex flex-col min-w-0', className)}>
    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
      {label}
    </span>
    {chip ? (
      <span className="mt-1 text-[12px] font-semibold tabular-nums px-2.5 py-1 rounded-md bg-elec-yellow/[0.08] text-elec-yellow border border-elec-yellow/25 self-start">
        {value}
      </span>
    ) : (
      <span
        className={cn(
          'mt-1 text-[14px] font-semibold tabular-nums truncate',
          warn ? 'text-amber-400' : 'text-white'
        )}
      >
        {value}
      </span>
    )}
  </div>
);

const ActionButton = ({
  label,
  onClick,
  disabled,
  primary,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'h-12 px-4 text-[13px] font-semibold rounded-xl border transition-all touch-manipulation active:scale-[0.99] text-left',
      primary
        ? 'bg-elec-yellow text-black border-elec-yellow hover:bg-elec-yellow/90 disabled:opacity-50'
        : 'bg-[hsl(0_0%_10%)] text-white border-white/[0.10] hover:border-white/25 disabled:opacity-50',
      disabled && 'cursor-not-allowed'
    )}
  >
    {label}
  </button>
);

/**
 * AutoFixButton — for REVIEW circuits, runs the deterministic auto-fix path
 * (try cable upsize → curve relaxation → protection downsize) and applies the
 * suggested edits in sequence. Each edit goes through normal validation so we
 * never escape compliance.
 */
const AutoFixButton = ({
  circuit,
  onEdit,
  boardZdbDelta,
  supplyZe,
}: {
  circuit: any;
  onEdit: (field: string, value: unknown) => void;
  /** Zdb − Ze for the board this circuit sits on (Ω). Lets autofix close
   *  Zs gaps that come from a long submain chain. */
  boardZdbDelta?: number;
  /** Supply Ze (Ω) — distinguishes cable contribution from upstream Z. */
  supplyZe?: number;
}) => {
  const handleClick = () => {
    const fixes = attemptAutoFix(circuit, { boardZdbDelta, supplyZe });
    if (fixes.length === 0) {
      toast.info('No auto-fix available', {
        description:
          'This circuit needs a manual edit — try changing cable size, length, or protection rating.',
      });
      return;
    }
    fixes.forEach((f) => onEdit(f.field, f.value));
    toast.success(`Applied ${fixes.length} fix${fixes.length === 1 ? '' : 'es'}`, {
      description: fixes.map((f) => `· ${f.rationale}`).join('\n'),
      duration: 8000,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-[10.5px] uppercase tracking-[0.16em] font-semibold text-elec-yellow border border-elec-yellow/40 hover:border-elec-yellow hover:bg-elec-yellow/[0.06] rounded-md px-2 py-0.5 transition-colors touch-manipulation"
      title="Apply deterministic fixes for the most common review issues"
    >
      Auto-fix
    </button>
  );
};

// ─── Design audit section (multi-pass critique loop output) ─────────────────

interface CriticFinding {
  severity: 'info' | 'warn' | 'error';
  scope: 'system' | 'board' | 'circuit';
  circuitNumber?: number;
  circuitName?: string;
  boardName?: string;
  title: string;
  detail: string;
  reg?: string;
  recommendation?: string;
}

interface CriticReview {
  pass: 'design-audit-v1';
  findings: CriticFinding[];
  summary: string;
  durationMs: number;
}

const DesignAuditSection = ({ review }: { review: CriticReview }) => {
  const [expanded, setExpanded] = useState(false);
  const findings = review?.findings ?? [];
  if (findings.length === 0 && !review.summary) return null;

  const counts = findings.reduce(
    (acc, f) => {
      acc[f.severity] = (acc[f.severity] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const visible = expanded ? findings : findings.slice(0, 3);

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow>DESIGN AUDIT</Eyebrow>
        {findings.length > 0 && (
          <span className="text-[11px] text-white/60 tabular-nums">
            {counts.error ? `${counts.error} error · ` : ''}
            {counts.warn ? `${counts.warn} warn · ` : ''}
            {counts.info ? `${counts.info} info` : ''}
          </span>
        )}
      </div>

      <div className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl overflow-hidden">
        {/* Summary header */}
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <p className="text-[13.5px] leading-relaxed text-white/85">{review.summary}</p>
        </div>

        {/* Findings list */}
        {findings.length > 0 && (
          <div className="divide-y divide-white/[0.04]">
            {visible.map((f, i) => (
              <div key={i} className="px-5 py-4">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span
                      className={cn(
                        'text-[10px] font-semibold uppercase tracking-[0.18em] shrink-0',
                        f.severity === 'error'
                          ? 'text-red-400'
                          : f.severity === 'warn'
                            ? 'text-amber-400'
                            : 'text-white/55'
                      )}
                    >
                      {f.severity}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 shrink-0">
                      · {f.scope}
                      {f.boardName ? ` · ${f.boardName}` : ''}
                      {f.circuitName ? ` · ${f.circuitName}` : ''}
                    </span>
                  </div>
                  {f.reg && (
                    <span className="text-[10px] font-semibold tabular-nums text-white/55 border border-white/15 rounded-md px-1.5 py-0.5">
                      {f.reg}
                    </span>
                  )}
                </div>
                <h4 className="mt-1.5 text-[14px] font-semibold tracking-tight text-white">
                  {f.title}
                </h4>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/75">{f.detail}</p>
                {f.recommendation && (
                  <p className="mt-2 text-[11.5px] leading-relaxed text-elec-yellow/85">
                    ↳ {f.recommendation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {findings.length > 3 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="w-full text-[11.5px] font-semibold text-white/55 hover:text-elec-yellow border-t border-white/[0.06] py-3 transition-colors touch-manipulation"
          >
            {expanded ? 'Show less' : `Show ${findings.length - 3} more`}
          </button>
        )}
      </div>
    </section>
  );
};

// ─── Sticky mini-header ──────────────────────────────────────────────────────

const StickyMiniHeader = ({
  visible,
  circuit,
  context,
  offsetWhenSwitcherPresent,
}: {
  visible: boolean;
  circuit: any;
  context?: CircuitContext;
  offsetWhenSwitcherPresent?: boolean;
}) => {
  if (!circuit || !context) return null;
  const status = getCircuitStatus(circuit);
  // Sits BELOW the main app header AND the page's own sticky sub-header
  // (48 px tall). When the board switcher is also visible (mobile-only,
  // ~40 px), stack everything in order: app-header → page-header → switcher
  // → mini-header.
  const topStyle = offsetWhenSwitcherPresent
    ? { top: 'calc(var(--header-height, 56px) + 88px)' }
    : { top: 'calc(var(--header-height, 56px) + 48px)' };
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="sticky z-30 bg-elec-dark/95 backdrop-blur-md border-b border-white/[0.06]"
          style={topStyle}
        >
          <div className="px-4 sm:px-6 md:px-10 lg:px-16 h-10 flex items-center gap-2.5 text-[12px]">
            <span className="font-semibold text-elec-yellow tabular-nums shrink-0">
              {context.boardName} · Way {String(context.wayNumber).padStart(2, '0')}
            </span>
            <span className="text-white/30 shrink-0">·</span>
            <span className="font-medium text-white truncate flex-1 min-w-0">
              {circuit.name}
            </span>
            {context.phaseAssignment && (
              <span className="text-[10px] font-semibold tabular-nums text-white/55 border border-white/15 rounded px-1.5 py-0.5 shrink-0">
                {context.phaseAssignment === 'L1L2L3' ? '3φ' : context.phaseAssignment}
              </span>
            )}
            <span
              className={cn(
                'text-[10px] uppercase tracking-[0.16em] font-semibold shrink-0',
                status === 'pass' ? 'text-emerald-400' : 'text-amber-400'
              )}
            >
              {status === 'pass' ? 'PASS' : 'REVIEW'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Sticky board switcher ───────────────────────────────────────────────────

const StickyBoardSwitcher = ({
  boards,
  activeBoardId,
  onJump,
}: {
  boards: BoardRecommendation[];
  activeBoardId: string | null;
  onJump: (boardId: string) => void;
}) => (
  <div
    className="sticky z-30 bg-elec-dark/95 backdrop-blur-md border-b border-white/[0.06] sm:hidden"
    style={{ top: 'calc(var(--header-height, 56px) + 48px)' }}
  >
    <div className="px-4 py-2 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-1.5 w-max">
        {boards.map((board) => {
          const isActive = activeBoardId === board.id;
          return (
            <button
              key={board.id}
              type="button"
              onClick={() => onJump(board.id)}
              className={cn(
                'text-[11px] font-semibold tabular-nums rounded-full px-3 py-1.5 whitespace-nowrap touch-manipulation active:scale-[0.97] transition-all border',
                isActive
                  ? 'border-elec-yellow/60 bg-elec-yellow/[0.10] text-elec-yellow'
                  : 'border-white/[0.10] bg-[hsl(0_0%_10%)] text-white hover:border-white/30'
              )}
            >
              {board.name}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// ─── Mobile FAB → opens action sheet ─────────────────────────────────────────

const MobileActionsFAB = ({ onOpen }: { onOpen: () => void }) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label="Open actions"
    className="sm:hidden fixed right-5 z-50 h-14 px-5 rounded-full bg-elec-yellow text-black border border-elec-yellow shadow-2xl shadow-elec-yellow/20 flex items-center gap-2 text-[13px] font-semibold touch-manipulation active:scale-[0.97] transition-all"
    style={{ bottom: 'max(20px, env(safe-area-inset-bottom, 0px) + 8px)' }}
  >
    <span>Actions</span>
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
);

const SheetActionRow = ({
  label,
  detail,
  onClick,
  disabled,
  primary,
}: {
  label: string;
  detail: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'w-full text-left rounded-xl border transition-all touch-manipulation active:scale-[0.99] px-4 py-3.5 min-h-[60px]',
      primary
        ? 'bg-elec-yellow/[0.08] border-elec-yellow/30 hover:bg-elec-yellow/[0.12]'
        : 'bg-[hsl(0_0%_10%)] border-white/[0.10] hover:border-white/20',
      disabled && 'opacity-50 cursor-not-allowed'
    )}
  >
    <div
      className={cn(
        'text-[14px] font-semibold tracking-tight',
        primary ? 'text-elec-yellow' : 'text-white'
      )}
    >
      {label}
    </div>
    <div className="mt-0.5 text-[11.5px] text-white/55 leading-snug">{detail}</div>
  </button>
);

export default EditorialDesignResults;
