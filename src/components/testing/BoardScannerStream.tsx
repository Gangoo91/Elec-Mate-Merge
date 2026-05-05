/**
 * BoardScannerStream — editorial, streaming board scanner review.
 *
 * Replaces CircuitReviewSheet. Takes captured image URLs, calls the
 * `board-read-stream` edge function, consumes SSE events, and renders an
 * editorial review experience as the model produces results.
 *
 * Design language matches Cost Engineer / Tips & Guidance / college primitives:
 * - Eyebrow + numbered sections, no icons
 * - Hairline dividers, mobile-flat
 * - Yellow accent only, tabular-nums for figures
 * - Headline ends in a full stop, status crossfades
 * - Inline editing per row
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { Eyebrow, Pill, containerVariants, itemVariants } from '@/components/college/primitives';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

// ────────────────────────────────────────────────────────
// Types — match the SSE schema from board-read-stream
// ────────────────────────────────────────────────────────

interface RawCircuit {
  index: number;
  spans_ways?: number;
  label_text?: string;
  device?: {
    category?: string;
    rating_amps?: number | null;
    curve?: string | null;
    type?: string;
    rcd_type?: string | null;
    i_delta_n_mA?: number | null;
  } | null;
  phase?: '1P' | '3P';
  phase_assignment?: string | string[];
  confidence?: 'high' | 'medium' | 'low';
  evidence?: string;
  source_model?: string;
  is_infrastructure?: boolean;
}

interface BoardData {
  brand?: string;
  model?: string | null;
  main_switch_rating?: number | null;
  main_switch_poles?: string;
  main_switch_side?: 'left' | 'right' | 'unknown';
  is_three_phase?: boolean;
  spd_status?: 'present' | 'not_present' | 'unknown';
  board_layout?: string;
  estimated_total_ways?: number;
  circuits_per_phase?: { L1?: number; L2?: number; L3?: number };
}

type StreamEvent =
  | { type: 'stage'; stage: string; message: string }
  | { type: 'board'; data: BoardData }
  | { type: 'circuits_batch'; circuits: RawCircuit[] }
  | { type: 'circuit_update'; index: number; updates: Partial<RawCircuit> & { phase?: string; spans_ways?: number; phase_assignment?: string | string[] } }
  | { type: 'circuit_remove'; index: number }
  | { type: 'warning'; message: string }
  | { type: 'decision'; message: string }
  | { type: 'complete'; metadata: Record<string, unknown> }
  | { type: 'error'; message: string };

// Shape we hand back to the parent (matches the legacy shape so the parent
// schedule-of-tests integration keeps working unchanged).
export interface ConfirmedCircuit {
  id: string;
  position: number;
  /** Number of physical DIN positions this circuit occupies (1 for 1P, 3 for 3P). */
  spansWays?: number;
  label: string;
  device: string;
  rating: number | null;
  curve: string | null;
  confidence: 'high' | 'medium' | 'low';
  phase?: '1P' | '3P';
  phaseDesignation?: string | null;
  evidence?: string;
  rcdType?: string | null;
  iDeltaNmA?: number | null;
  /**
   * Infrastructure position (upstream RCD, main switch, SPD) — visible in the
   * scan layout for confirmation but NOT a way. Excluded from the schedule of
   * tests; way numbering only applies to circuits + spares.
   */
  isInfrastructure?: boolean;
}

interface BoardScannerStreamProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrls: string[];
  hints?: {
    main_switch_side?: 'left' | 'right';
    expected_ways?: number;
    board_type?: 'domestic' | 'commercial' | 'industrial';
    is_three_phase?: boolean;
  };
  onConfirm: (circuits: ConfirmedCircuit[], board: BoardData) => void;
  onRescan: () => void;
}

// ────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────

const DEVICE_OPTIONS = [
  'MCB',
  'RCBO',
  'RCD',
  'AFDD',
  'MCCB',
  'ACB',
  'Isolator',
  'Fuse',
  'Starter',
  'Other',
  'Spare',
] as const;
const CURVE_OPTIONS = ['B', 'C', 'D'] as const;
const RATING_OPTIONS = [
  6, 10, 13, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100, 125, 160, 200, 250, 400, 630, 800, 1000,
  1250, 1600,
] as const;
const RCD_TYPE_OPTIONS = ['AC', 'A', 'F', 'B'] as const;
const I_DELTA_N_OPTIONS = [10, 30, 100, 300, 500] as const;

const formatLayout = (layout?: string, totalWays?: number, isThreePhase?: boolean) => {
  if (!layout) return '';
  const phase = isThreePhase ? 'Three phase' : 'Single phase';
  if (layout === '3P-vertical') return `${phase} · ${totalWays ?? '?'} way · vertical`;
  if (layout === '3P-horizontal') return `${phase} · ${totalWays ?? '?'} way · horizontal`;
  if (layout === 'dual_row') return `${phase} · ${totalWays ?? '?'} way · dual row`;
  return `${phase} · ${totalWays ?? '?'} way`;
};

const toConfirmedCircuit = (raw: RawCircuit): ConfirmedCircuit => {
  const dev = raw.device ?? null;
  const category = dev?.category || (dev ? '' : 'Spare');
  const rating = dev?.rating_amps ?? null;
  const curve = dev?.curve ?? null;

  // Normalise phase_assignment — array form (3P) becomes "L1,L2,L3", string
  // stays as-is. Force any 3P circuit to L1,L2,L3 even if the model only sent
  // a single-letter phase by mistake.
  let phaseAssign: string | null = null;
  if (Array.isArray(raw.phase_assignment)) {
    phaseAssign = raw.phase_assignment.length > 1 ? 'L1,L2,L3' : (raw.phase_assignment[0] ?? null);
  } else if (typeof raw.phase_assignment === 'string') {
    phaseAssign = raw.phase_assignment.includes(',')
      ? 'L1,L2,L3'
      : raw.phase_assignment;
  }
  if (raw.phase === '3P') phaseAssign = 'L1,L2,L3';

  // Three-pole circuits default to spans_ways = 3 if the model omitted it.
  const spansWays = raw.spans_ways ?? (raw.phase === '3P' ? 3 : 1);

  return {
    id: `c-${raw.index}`,
    position: raw.index,
    spansWays,
    label: raw.label_text || (category === 'Spare' ? 'Spare' : ''),
    device: category,
    rating,
    curve,
    confidence: raw.confidence ?? 'medium',
    phase: raw.phase,
    phaseDesignation: phaseAssign,
    evidence: raw.evidence,
    rcdType: dev?.rcd_type ?? null,
    iDeltaNmA: dev?.i_delta_n_mA ?? null,
    isInfrastructure: raw.is_infrastructure === true,
  };
};

// Cross-check engine — runs locally on circuits regardless of source model.
// Flags conflicts that the model should never output but sometimes does.
function crossCheck(c: ConfirmedCircuit, isThreePhase: boolean): string | null {
  const dev = c.device;
  const isRcdLike = dev === 'RCBO' || dev === 'RCD';

  // I∆n with MCB is the cardinal sin
  if (c.iDeltaNmA && dev === 'MCB') {
    return 'I∆n marking present — should be RCBO.';
  }

  // RCBO/RCD without I∆n is suspicious but allowed if curve/rating present
  if (isRcdLike && !c.iDeltaNmA && c.confidence === 'low') {
    return 'No I∆n value read — verify on device.';
  }

  // 3P phase but board is not three-phase
  if (c.phase === '3P' && !isThreePhase) {
    return 'Marked 3-pole on a single-phase board — verify.';
  }

  // 3-pole device should have rating ≥ 16A typically
  if (c.phase === '3P' && c.rating !== null && c.rating < 10) {
    return 'Unusually small 3-pole rating — verify.';
  }

  return null;
}

// ────────────────────────────────────────────────────────
// Streaming hook — owns the SSE connection
// ────────────────────────────────────────────────────────

function useBoardStream(
  open: boolean,
  imageUrls: string[],
  hints: BoardScannerStreamProps['hints']
) {
  const [board, setBoard] = useState<BoardData | null>(null);
  const [circuits, setCircuits] = useState<ConfirmedCircuit[]>([]);
  const [status, setStatus] = useState<string>('Connecting.');
  const [phase, setPhase] = useState<
    'idle' | 'connecting' | 'analyzing' | 'validating' | 'done' | 'error'
  >('idle');
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const startedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!open || imageUrls.length === 0) return;

    // De-dupe — only start once per set of URLs while the sheet is open.
    const fingerprint = imageUrls.join('|');
    if (startedRef.current === fingerprint) return;
    startedRef.current = fingerprint;

    setBoard(null);
    setCircuits([]);
    setError(null);
    setStatus('Reading board.');
    setPhase('connecting');

    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/board-read-stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ images: imageUrls, hints: hints ?? {} }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error(`Stream failed (${response.status})`);
        }

        setPhase('analyzing');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const data = line.startsWith('data: ') ? line.slice(6).trim() : null;
            if (!data) continue;

            let evt: StreamEvent;
            try {
              evt = JSON.parse(data);
            } catch {
              continue;
            }

            if (evt.type === 'stage') {
              setStatus(evt.message);
              if (evt.stage === 'validating') setPhase('validating');
            } else if (evt.type === 'decision') {
              setStatus(evt.message);
            } else if (evt.type === 'board') {
              setBoard(evt.data);
            } else if (evt.type === 'circuits_batch') {
              const incoming = evt.circuits.map(toConfirmedCircuit);
              setCircuits((prev) => {
                const existingIndices = new Set(prev.map((c) => c.position));
                const merged = [...prev];
                for (const c of incoming) {
                  if (!existingIndices.has(c.position)) merged.push(c);
                }
                merged.sort((a, b) => a.position - b.position);
                return merged;
              });
            } else if (evt.type === 'circuit_update') {
              setCircuits((prev) => {
                const next = [...prev];
                const idx = next.findIndex((c) => c.position === evt.index);
                if (idx >= 0) {
                  const current = next[idx];
                  const updates = evt.updates;
                  // Phase normalisation: 3P or array → 'L1,L2,L3'
                  let phaseAssign = current.phaseDesignation;
                  if (Array.isArray(updates.phase_assignment)) {
                    phaseAssign =
                      updates.phase_assignment.length > 1
                        ? 'L1,L2,L3'
                        : updates.phase_assignment[0] ?? null;
                  } else if (typeof updates.phase_assignment === 'string') {
                    phaseAssign = updates.phase_assignment.includes(',')
                      ? 'L1,L2,L3'
                      : updates.phase_assignment;
                  }
                  if (updates.phase === '3P') phaseAssign = 'L1,L2,L3';
                  const phase = (updates.phase as '1P' | '3P' | undefined) ?? current.phase;
                  const spansWays =
                    typeof updates.spans_ways === 'number'
                      ? updates.spans_ways
                      : phase === '3P'
                        ? 3
                        : current.spansWays;
                  next[idx] = {
                    ...current,
                    label:
                      typeof updates.label_text === 'string' ? updates.label_text : current.label,
                    device: updates.device?.category ?? current.device,
                    rating: updates.device?.rating_amps ?? current.rating,
                    curve: updates.device?.curve ?? current.curve,
                    confidence: updates.confidence ?? current.confidence,
                    rcdType: updates.device?.rcd_type ?? current.rcdType,
                    iDeltaNmA: updates.device?.i_delta_n_mA ?? current.iDeltaNmA,
                    evidence: updates.evidence ?? current.evidence,
                    phase,
                    phaseDesignation: phaseAssign,
                    spansWays,
                    isInfrastructure:
                      typeof (updates as { is_infrastructure?: boolean })
                        .is_infrastructure === 'boolean'
                        ? Boolean(
                            (updates as { is_infrastructure?: boolean }).is_infrastructure
                          )
                        : current.isInfrastructure,
                  };
                }
                return next;
              });
            } else if (evt.type === 'circuit_remove') {
              setCircuits((prev) => prev.filter((c) => c.position !== evt.index));
            } else if (evt.type === 'warning') {
              // soft, non-blocking — surfaced via the live status line briefly
              setStatus(evt.message);
            } else if (evt.type === 'complete') {
              setPhase('done');
              setStatus('Done.');
            } else if (evt.type === 'error') {
              setError(evt.message);
              setPhase('error');
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setError((err as Error).message || 'Stream failed');
        setPhase('error');
      }
    })();

    return () => {
      controller.abort();
      startedRef.current = null;
    };
  }, [open, imageUrls, hints]);

  return { board, circuits, status, phase, error };
}

// ────────────────────────────────────────────────────────
// Atoms
// ────────────────────────────────────────────────────────

const BoardFact = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between gap-4 py-2 border-b border-white/[0.06] last:border-b-0">
    <span className="text-[10.5px] uppercase tracking-[0.18em] font-medium text-white/55">
      {label}
    </span>
    <span className="text-[14px] sm:text-[15px] text-white tabular-nums text-right">{value}</span>
  </div>
);

/**
 * Editorial inline select — direct Radix primitives so we have full control
 * over the indicator. Trigger is an underlined text input with a chevron;
 * the active row is highlighted by a left yellow bar + yellow text — no tick.
 */
const InlineSelect = <T extends string | number>({
  value,
  options,
  onChange,
  suffix,
  minWidth = 64,
}: {
  value: T | null;
  options: readonly T[] | T[];
  onChange: (v: T) => void;
  suffix?: string;
  minWidth?: number;
}) => {
  const stringValue = value === null || value === undefined ? '' : String(value);

  return (
    <SelectPrimitive.Root
      value={stringValue}
      onValueChange={(raw) => {
        const opt = (options as (string | number)[]).find((o) => String(o) === raw);
        if (opt !== undefined) onChange(opt as T);
      }}
    >
      <SelectPrimitive.Trigger
        style={{ minWidth }}
        className={cn(
          'flex items-center justify-between gap-2',
          'bg-transparent border-0 border-b border-white/15 rounded-none',
          'h-9 text-[15px] text-white tabular-nums px-0',
          'hover:border-white/25 focus:border-elec-yellow/70 focus:outline-none',
          'data-[state=open]:border-elec-yellow/70 transition-colors touch-manipulation'
        )}
      >
        <SelectPrimitive.Value>
          {stringValue ? (
            <span className="text-white">
              {stringValue}
              {suffix && <span className="text-white/55 ml-0.5">{suffix}</span>}
            </span>
          ) : (
            <span className="text-white/35">—</span>
          )}
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-3.5 w-3.5 text-white/45 opacity-80" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className={cn(
            'z-[100] bg-background border border-white/[0.08]',
            'rounded-xl shadow-2xl shadow-black/50',
            'min-w-[120px] py-1.5 overflow-hidden',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
          )}
        >
          <SelectPrimitive.Viewport className="p-0">
            {options.map((o) => (
              <SelectPrimitive.Item
                key={String(o)}
                value={String(o)}
                className={cn(
                  'relative flex items-center select-none cursor-pointer',
                  'h-11 px-4 text-[15px] tabular-nums text-white',
                  'focus:outline-none focus:bg-white/[0.06]',
                  'data-[highlighted]:bg-white/[0.06]',
                  'data-[state=checked]:text-elec-yellow data-[state=checked]:font-medium',
                  'data-[state=checked]:bg-elec-yellow/[0.06]',
                  'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2',
                  'before:h-5 before:w-[2px] before:rounded-full before:bg-transparent',
                  'data-[state=checked]:before:bg-elec-yellow',
                  'transition-colors touch-manipulation'
                )}
              >
                <SelectPrimitive.ItemText>
                  {String(o)}
                  {suffix && <span className="text-white/45 ml-0.5">{suffix}</span>}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

// ────────────────────────────────────────────────────────
// Warmup skeleton — shown while we wait for the first chunk of data.
// Gives the user something live to watch during the 1.5–4s Gemini warmup.
// ────────────────────────────────────────────────────────

const WARMUP_PHASES: Array<{ atSec: number; label: string }> = [
  { atSec: 0, label: 'Uploading photo' },
  { atSec: 2, label: 'Reading labels' },
  { atSec: 5, label: 'Identifying devices' },
  { atSec: 9, label: 'Counting circuits' },
  { atSec: 14, label: 'Reading three-phase' },
  { atSec: 20, label: 'Almost there' },
];

const WarmupSkeleton = ({ elapsedSec }: { elapsedSec: number }) => {
  const currentPhase = useMemo(() => {
    let phase = WARMUP_PHASES[0];
    for (const p of WARMUP_PHASES) {
      if (elapsedSec >= p.atSec) phase = p;
    }
    return phase;
  }, [elapsedSec]);

  return (
    <div className="mt-6 space-y-2.5">
      {/* Live status card with elapsed time + phase label */}
      <div className="rounded-xl bg-white/[0.035] border border-white/[0.06] px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="relative inline-flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-elec-yellow" />
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentPhase.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-[14px] sm:text-[15px] text-white/85 truncate"
              >
                {currentPhase.label}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-elec-yellow tabular-nums whitespace-nowrap">
            {elapsedSec}s
          </span>
        </div>

        {/* Indeterminate progress sweep */}
        <div className="mt-4 h-[2px] w-full rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full w-1/3 rounded-full bg-elec-yellow"
            initial={{ x: '-100%' }}
            animate={{ x: '300%' }}
            transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>
      </div>

      {/* Three placeholder cards that subtly pulse */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-xl bg-white/[0.02] border border-white/[0.04]"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
        >
          <div className="px-4 sm:px-5 py-4 sm:py-5 flex items-center gap-3 sm:gap-4">
            <span className="flex-shrink-0 w-7 sm:w-8 text-[14px] sm:text-[15px] font-medium text-white/20 tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="h-3 flex-1 max-w-[180px] rounded-full bg-white/[0.06]" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ────────────────────────────────────────────────────────
// Circuit row — collapsed + expanded states in one component
// ────────────────────────────────────────────────────────

const CircuitRow = ({
  circuit,
  displayNumber,
  isThreePhase,
  warning,
  canMoveUp,
  canMoveDown,
  onSave,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  circuit: ConfirmedCircuit;
  displayNumber: number | null;
  isThreePhase: boolean;
  warning: string | null;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSave: (next: ConfirmedCircuit) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(circuit);
  const [dragX, setDragX] = useState(0);

  useEffect(() => {
    if (!editing) setDraft(circuit);
  }, [circuit, editing]);

  // Reset swipe offset whenever the row enters/leaves edit mode so a stale
  // half-swipe doesn't linger.
  useEffect(() => {
    setDragX(0);
  }, [editing]);

  const isSpare = circuit.device === 'Spare' || !circuit.device;
  const isInfra = circuit.isInfrastructure === true;
  const showWarning = !!warning && !editing && !isInfra;
  const dimmed = circuit.confidence === 'low' && !showWarning;

  // Swipe-to-delete config — left swipe past 35% reveals delete; past 65%
  // commits the delete with a fly-out animation.
  const SWIPE_REVEAL = -88;
  const SWIPE_COMMIT = -180;

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(circuit);
    setEditing(false);
  };

  // ── Infrastructure row (RCD / main switch / SPD) ──
  // Visible in the layout for confirmation but NOT a way. Faint, no way
  // number, no swipe-delete, no edit, no warnings. The cross-check can still
  // surface a soft note via `warning` if the model misclassified.
  if (isInfra) {
    const infraLabel =
      circuit.label ||
      (circuit.device === 'RCD'
        ? circuit.rating
          ? `${circuit.rating}A RCD`
          : 'RCD'
        : circuit.device === 'Isolator' || circuit.device === 'ACB'
          ? 'Main switch'
          : circuit.device || 'Infrastructure');
    return (
      <motion.li variants={itemVariants} layout className="relative">
        <div className="rounded-xl bg-white/[0.015] border border-white/[0.04] border-dashed">
          <div className="px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-3 sm:gap-4">
            <span className="flex-shrink-0 w-7 sm:w-8 text-[10.5px] uppercase tracking-[0.18em] font-semibold text-white/35">
              —
            </span>
            <div className="flex-1 min-w-0 flex items-baseline justify-between gap-3">
              <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-white/45">
                {circuit.device === 'RCD' ? 'Upstream RCD' : 'Main switch'}
              </div>
              <span className="text-[13px] sm:text-[14px] text-white/55 tabular-nums truncate">
                {infraLabel}
                {circuit.iDeltaNmA ? ` · ${circuit.iDeltaNmA}mA` : ''}
              </span>
            </div>
          </div>
        </div>
      </motion.li>
    );
  }

  return (
    <motion.li
      variants={itemVariants}
      layout
      className="relative"
    >
      {/* Delete affordance behind the card — revealed by left-swipe */}
      <motion.button
        type="button"
        onClick={onDelete}
        animate={{
          opacity: dragX < -16 ? 1 : 0,
          scale: dragX < SWIPE_REVEAL ? 1 : 0.92,
        }}
        transition={{ duration: 0.15 }}
        className={cn(
          'absolute inset-y-0 right-0 w-[88px] flex items-center justify-center',
          'rounded-xl bg-red-500/15 text-red-400 text-[11px] uppercase tracking-[0.18em] font-semibold',
          'pointer-events-none'
        )}
      >
        Delete
      </motion.button>

      <motion.div
        drag={editing ? false : 'x'}
        dragConstraints={{ left: SWIPE_COMMIT, right: 0 }}
        dragElastic={0.05}
        dragMomentum={false}
        onDrag={(_, info) => setDragX(info.offset.x)}
        onDragEnd={(_, info) => {
          if (info.offset.x < SWIPE_COMMIT * 0.7) {
            // Animate the row off-screen then commit deletion
            onDelete();
          } else {
            setDragX(0);
          }
        }}
        animate={{ x: dragX < SWIPE_REVEAL ? SWIPE_REVEAL : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        className={cn(
          'relative rounded-xl bg-white/[0.035] hover:bg-white/[0.05] border border-white/[0.06]',
          'transition-colors touch-pan-y',
          editing && 'bg-white/[0.06] border-white/[0.1]'
        )}
      >
      <div className="px-4 sm:px-5 py-4 sm:py-5 flex items-start gap-3 sm:gap-4">
        <span className="flex-shrink-0 text-[14px] sm:text-[15px] font-medium text-elec-yellow/70 tabular-nums leading-tight pt-1 whitespace-nowrap">
          {displayNumber === null
            ? '—'
            : circuit.spansWays && circuit.spansWays > 1
              ? `${String(displayNumber).padStart(2, '0')}–${String(displayNumber + circuit.spansWays - 1).padStart(2, '0')}`
              : String(displayNumber).padStart(2, '0')}
        </span>

        <div className={cn('flex-1 min-w-0', dimmed && 'opacity-60')}>
          {!editing ? (
            <>
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-[16px] sm:text-[17px] font-semibold text-white leading-snug truncate">
                  {circuit.label || (isSpare ? 'Spare' : 'Unlabelled')}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {isThreePhase && circuit.phaseDesignation && (
                    <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-amber-400 tabular-nums whitespace-nowrap">
                      {circuit.phase === '3P' || circuit.phaseDesignation.includes(',')
                        ? 'L1·L2·L3'
                        : circuit.phaseDesignation}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className={cn(
                      'text-[11px] uppercase tracking-[0.18em] font-semibold',
                      'transition-colors touch-manipulation whitespace-nowrap',
                      showWarning
                        ? 'text-amber-400 hover:text-amber-300'
                        : 'text-elec-yellow/80 hover:text-elec-yellow'
                    )}
                  >
                    {showWarning ? 'Review' : 'Edit'}
                  </button>
                </div>
              </div>

              {!isSpare && (
                <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                  <Pill tone={circuit.device === 'RCBO' ? 'yellow' : 'yellow'}>
                    {circuit.device}
                  </Pill>
                  {circuit.curve && circuit.rating !== null && (
                    <Pill>{`${circuit.curve}${circuit.rating}`}</Pill>
                  )}
                  {!circuit.curve && circuit.rating !== null && <Pill>{`${circuit.rating}A`}</Pill>}
                  {circuit.rcdType && <Pill>Type {circuit.rcdType}</Pill>}
                  {circuit.iDeltaNmA !== null && circuit.iDeltaNmA !== undefined && (
                    <Pill>{circuit.iDeltaNmA}mA</Pill>
                  )}
                </div>
              )}

              <AnimatePresence>
                {showWarning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-[13px] italic text-amber-400/85 leading-relaxed">
                      {warning}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-hidden"
            >
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <div className="text-[16px] sm:text-[17px] font-semibold text-white">
                  Way {displayNumber ?? '—'}
                </div>
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.18em] font-semibold">
                  <button
                    type="button"
                    onClick={onMoveUp}
                    disabled={!canMoveUp}
                    aria-label="Move up"
                    className={cn(
                      'text-[14px] tabular-nums leading-none touch-manipulation transition-colors',
                      canMoveUp
                        ? 'text-white/65 hover:text-white'
                        : 'text-white/15 cursor-not-allowed'
                    )}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={onMoveDown}
                    disabled={!canMoveDown}
                    aria-label="Move down"
                    className={cn(
                      'text-[14px] tabular-nums leading-none touch-manipulation transition-colors',
                      canMoveDown
                        ? 'text-white/65 hover:text-white'
                        : 'text-white/15 cursor-not-allowed'
                    )}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-white/55 hover:text-white touch-manipulation"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="text-elec-yellow hover:text-elec-yellow/85 touch-manipulation"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Eyebrow className="mb-1.5 text-white/55">Device</Eyebrow>
                  <InlineSelect
                    value={draft.device || 'MCB'}
                    options={DEVICE_OPTIONS}
                    onChange={(v) => setDraft({ ...draft, device: v })}
                  />
                </div>

                {draft.device !== 'Spare' && (
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <div>
                      <Eyebrow className="mb-1.5 text-white/55">Curve</Eyebrow>
                      <InlineSelect
                        value={draft.curve as 'B' | 'C' | 'D' | null}
                        options={CURVE_OPTIONS}
                        onChange={(v) => setDraft({ ...draft, curve: v })}
                      />
                    </div>
                    <div>
                      <Eyebrow className="mb-1.5 text-white/55">Rating</Eyebrow>
                      <InlineSelect
                        value={draft.rating}
                        options={RATING_OPTIONS}
                        onChange={(v) => setDraft({ ...draft, rating: v })}
                        suffix=" A"
                      />
                    </div>

                    {(draft.device === 'RCBO' || draft.device === 'RCD') && (
                      <>
                        <div>
                          <Eyebrow className="mb-1.5 text-white/55">RCD type</Eyebrow>
                          <InlineSelect
                            value={draft.rcdType as 'AC' | 'A' | 'F' | 'B' | null}
                            options={RCD_TYPE_OPTIONS}
                            onChange={(v) => setDraft({ ...draft, rcdType: v })}
                          />
                        </div>
                        <div>
                          <Eyebrow className="mb-1.5 text-white/55">I∆n</Eyebrow>
                          <InlineSelect
                            value={draft.iDeltaNmA}
                            options={I_DELTA_N_OPTIONS}
                            onChange={(v) => setDraft({ ...draft, iDeltaNmA: v })}
                            suffix=" mA"
                          />
                        </div>
                      </>
                    )}

                    {isThreePhase && (
                      <div>
                        <Eyebrow className="mb-1.5 text-white/55">Phase</Eyebrow>
                        <InlineSelect
                          value={(draft.phaseDesignation as string) || 'L1'}
                          options={['L1', 'L2', 'L3', 'L1,L2,L3']}
                          onChange={(v) =>
                            setDraft({
                              ...draft,
                              phaseDesignation: v,
                              phase: v === 'L1,L2,L3' ? '3P' : '1P',
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <Eyebrow className="mb-1.5 text-white/55">Label</Eyebrow>
                  <Input
                    value={draft.label}
                    onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                    className={cn(
                      'bg-transparent border-0 border-b border-white/15 rounded-none',
                      'h-9 text-[15px] text-white px-0',
                      'focus:border-elec-yellow/70 focus-visible:ring-0'
                    )}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onDelete}
                    className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/45 hover:text-red-400 transition-colors touch-manipulation"
                  >
                    Delete row
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      </motion.div>
    </motion.li>
  );
};

// ────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────

export const BoardScannerStream = ({
  open,
  onOpenChange,
  imageUrls,
  hints,
  onConfirm,
  onRescan,
}: BoardScannerStreamProps) => {
  const { board, circuits, status, phase, error } = useBoardStream(open, imageUrls, hints);
  const [edited, setEdited] = useState<Record<number, ConfirmedCircuit>>({});
  const [manualWays, setManualWays] = useState<ConfirmedCircuit[]>([]);
  const [reversed, setReversed] = useState(false);
  const [reverseTouchedByUser, setReverseTouchedByUser] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  /**
   * User-driven row reordering. Maps a circuit position → its sort rank.
   * If a position isn't in the map, it falls back to the natural index order.
   * Tracked separately from `circuits` so a re-stream doesn't lose user moves.
   */
  const [orderOverride, setOrderOverride] = useState<Record<number, number>>({});

  // Reset overrides when stream restarts
  useEffect(() => {
    if (!open) {
      setEdited({});
      setManualWays([]);
      setReversed(false);
      setReverseTouchedByUser(false);
      setElapsedSec(0);
      setOrderOverride({});
    }
  }, [open]);

  // Auto-reverse the moment the board lands and reports right-side main switch.
  useEffect(() => {
    if (board?.main_switch_side === 'right' && !reverseTouchedByUser) {
      setReversed(true);
    }
  }, [board?.main_switch_side, reverseTouchedByUser]);

  // Live elapsed-time counter while the first board info hasn't landed yet.
  // Gives the user something to look at during the 1.5–4s Gemini warmup.
  useEffect(() => {
    if (!open) return;
    if (board) return; // first data landed, stop counting
    setElapsedSec(0);
    const t = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [open, board]);

  // `merged` keeps original positions for stable editing keys.
  // `displayed` reverses the ordering when needed; numbering still reads 1, 2, 3
  // so the user sees a sensible schedule that matches physical ways from the
  // main switch outward.
  // Manual ways appended by the user (via "Add way") are merged in at the end
  // so they appear after all streamed rows.
  const merged = useMemo(() => {
    const streamed = circuits.map((c) => edited[c.position] ?? c);
    return [...streamed, ...manualWays];
  }, [circuits, edited, manualWays]);
  // Assign each row a `displayNumber` so circuits + spares get sequential
  // way numbers (1, 2, 3, ...). Infrastructure positions (RCDs, main switch)
  // get displayNumber: null and render in a faint inline style — they're
  // shown for layout confirmation but they are NOT ways.
  const displayed = useMemo(() => {
    const baseOrder = reversed ? [...merged].reverse() : merged;
    // Apply user reordering. Positions in orderOverride get the explicit rank;
    // anything else keeps its natural position in the baseOrder.
    const sorted = baseOrder
      .map((row, naturalIdx) => ({
        row,
        rank: orderOverride[row.position] ?? naturalIdx,
      }))
      .sort((a, b) => a.rank - b.rank)
      .map(({ row }) => row);

    let cursor = 1;
    return sorted.map((row) => {
      if (row.isInfrastructure) {
        return { row, displayNumber: null as number | null };
      }
      const start = cursor;
      cursor += Math.max(1, row.spansWays ?? 1);
      return { row, displayNumber: start };
    });
  }, [merged, reversed, orderOverride]);

  const isThreePhase = !!board?.is_three_phase;

  const warningMap = useMemo(() => {
    const map: Record<number, string | null> = {};
    for (const c of merged) {
      map[c.position] = crossCheck(c, isThreePhase);
    }
    return map;
  }, [merged, isThreePhase]);

  const flaggedCount = Object.values(warningMap).filter(Boolean).length;
  const totalWays = board?.estimated_total_ways || merged.length;
  const isStreaming = phase === 'connecting' || phase === 'analyzing' || phase === 'validating';
  const isDone = phase === 'done';

  const handleSaveRow = useCallback(
    (next: ConfirmedCircuit) => {
      setEdited((prev) => ({ ...prev, [next.position]: next }));
    },
    [setEdited]
  );

  const handleDeleteRow = useCallback(
    (position: number) => {
      // If this is a manual user-added way, drop it from manualWays. Otherwise
      // turn the streamed row into a Spare via the edited override.
      const isManual = manualWays.some((w) => w.position === position);
      if (isManual) {
        setManualWays((prev) => prev.filter((w) => w.position !== position));
        return;
      }
      setEdited((prev) => ({
        ...prev,
        [position]: {
          id: `c-${position}`,
          position,
          label: 'Spare',
          device: 'Spare',
          rating: null,
          curve: null,
          confidence: 'high',
        },
      }));
    },
    [manualWays]
  );

  const handleMoveRow = useCallback(
    (position: number, direction: -1 | 1) => {
      // Build the current order, swap the target with its neighbour, and
      // commit the resulting rank map.
      const current = displayed.map(({ row }) => row.position);
      const idx = current.indexOf(position);
      if (idx < 0) return;
      const swapIdx = idx + direction;
      if (swapIdx < 0 || swapIdx >= current.length) return;
      const next = [...current];
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      const ranks: Record<number, number> = {};
      next.forEach((pos, rank) => {
        ranks[pos] = rank;
      });
      setOrderOverride(ranks);
    },
    [displayed]
  );

  const handleAddWay = useCallback(() => {
    // Append a new Spare way at the end. Position is monotonically incremented
    // from the highest existing position so `displayed` numbering stays sensible.
    setManualWays((prev) => {
      const allPositions = [
        ...circuits.map((c) => c.position),
        ...prev.map((w) => w.position),
      ];
      const nextPos = allPositions.length > 0 ? Math.max(...allPositions) + 1 : 1;
      return [
        ...prev,
        {
          id: `manual-${nextPos}`,
          position: nextPos,
          label: 'Spare',
          device: 'Spare',
          rating: null,
          curve: null,
          confidence: 'high',
        },
      ];
    });
  }, [circuits]);

  const handleApply = () => {
    if (!board) return;
    // Schedule of tests = circuits + spares only. Drop infrastructure rows
    // (upstream RCDs, main switch). Renumber the remaining ways sequentially.
    // Three-pole circuits keep their spansWays so the cert can render the
    // "Ways 1–3 · L1·L2·L3" form. Spares ARE ways and stay in.
    const remapped = displayed
      .filter(({ row }) => !row.isInfrastructure)
      .map(({ row, displayNumber }, i) => {
        const finalDisplay = displayNumber ?? i + 1;
        return {
          ...row,
          position: finalDisplay,
          id: `c-${finalDisplay}`,
        };
      });
    onConfirm(remapped, board);
  };

  const headlineText = useMemo(() => {
    if (error) return 'Couldn’t read board.';
    if (phase === 'connecting') return 'Reading board.';
    if (board && phase === 'analyzing') {
      const brand = board.brand && board.brand !== 'Unknown' ? board.brand : '';
      const ways = board.estimated_total_ways;
      const seen = circuits.length;
      if (brand && ways) return `${brand}. ${seen} of ${ways} read.`;
      if (ways) return `${seen} of ${ways} read.`;
      return `${seen} read.`;
    }
    if (phase === 'validating') return `Verifying. ${circuits.length} read.`;
    if (isDone) {
      const brand = board?.brand && board.brand !== 'Unknown' ? board.brand : 'Board';
      const flagged = flaggedCount > 0 ? ` ${flaggedCount} to review.` : '';
      return `${brand}. ${merged.filter((c) => !c.isInfrastructure).length} ways.${flagged}`;
    }
    return status;
  }, [phase, error, board, circuits.length, isDone, flaggedCount, merged.length, status]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetTitle className="sr-only">Board scanner — review detected circuits</SheetTitle>
        <SheetDescription className="sr-only">
          Live results from the board scan. Edit any row before applying to the schedule of tests.
        </SheetDescription>
        <div className="flex flex-col h-full bg-background">
          {/* Sticky header */}
          <div className="flex-shrink-0 sticky top-0 z-10 backdrop-blur-xl bg-background/95">
            <div className="h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400" />

            <div className="px-5 sm:px-8 pt-6 pb-5">
              <div className="flex items-center justify-between gap-3">
                <Eyebrow className="text-elec-yellow">Board scanner</Eyebrow>
                {(isStreaming || flaggedCount > 0) && (
                  <Eyebrow
                    className={cn(
                      'tabular-nums',
                      flaggedCount > 0 ? 'text-amber-400' : 'text-elec-yellow/70'
                    )}
                  >
                    {flaggedCount > 0 ? `${flaggedCount} to review` : 'Reading'}
                  </Eyebrow>
                )}
              </div>

              <div className="mt-2 min-h-[1.5em]">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={headlineText}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="text-[24px] sm:text-[30px] leading-[1.05] font-semibold text-white tracking-tight"
                  >
                    {headlineText.split('. ').map((part, i, arr) => {
                      const isNumeric = /^\d+/.test(part) || /\d+ of \d+/.test(part);
                      return (
                        <span key={i}>
                          {isNumeric ? (
                            <span className="text-elec-yellow tabular-nums">{part}</span>
                          ) : (
                            part
                          )}
                          {i < arr.length - 1 && '. '}
                          {i === arr.length - 1 && headlineText.endsWith('.') ? '' : ''}
                        </span>
                      );
                    })}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="px-5 sm:px-8 pt-2 pb-32">
              {error ? (
                <div className="py-12">
                  <Eyebrow className="text-amber-400">Error</Eyebrow>
                  <p className="mt-3 text-[15px] text-white/75 leading-relaxed">{error}</p>
                  <button
                    type="button"
                    onClick={onRescan}
                    className="mt-6 text-[11px] uppercase tracking-[0.18em] font-semibold text-elec-yellow hover:text-elec-yellow/85"
                  >
                    Rescan →
                  </button>
                </div>
              ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  {/* 01 — Board */}
                  <section className="pt-8 sm:pt-10">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="text-[26px] sm:text-[30px] leading-none font-light text-elec-yellow/70 tabular-nums">
                        01
                      </span>
                      <div className="flex-1 min-w-0">
                        <Eyebrow className="text-elec-yellow">Board</Eyebrow>
                        <h3 className="mt-1 text-[18px] sm:text-[22px] leading-tight font-semibold text-white tracking-tight">
                          {board?.brand && board.brand !== 'Unknown' ? (
                            `${board.brand} ${board.model || ''}`.trim()
                          ) : (
                            <span className="inline-flex items-center gap-2">
                              <span className="relative inline-flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-75 animate-ping" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-elec-yellow" />
                              </span>
                              <span className="text-white/55 animate-pulse">Reading</span>
                            </span>
                          )}
                        </h3>
                      </div>
                    </div>

                    <AnimatePresence>
                      {board && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-5 max-w-md"
                        >
                          {board.brand && (
                            <BoardFact label="Brand" value={board.brand} />
                          )}
                          {board.model && <BoardFact label="Model" value={board.model} />}
                          {(board.estimated_total_ways || board.board_layout) && (
                            <BoardFact
                              label="Layout"
                              value={formatLayout(
                                board.board_layout,
                                board.estimated_total_ways,
                                board.is_three_phase
                              )}
                            />
                          )}
                          {board.main_switch_rating && (
                            <BoardFact
                              label="Main switch"
                              value={`${board.main_switch_rating}A · ${board.main_switch_poles ?? ''}`.trim()}
                            />
                          )}
                          {board.spd_status && board.spd_status !== 'unknown' && (
                            <BoardFact
                              label="Surge protection"
                              value={board.spd_status === 'present' ? 'Present' : 'Not present'}
                            />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>

                  {/* 02 — Circuits */}
                  <section className="pt-12 sm:pt-16">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="text-[26px] sm:text-[30px] leading-none font-light text-elec-yellow/70 tabular-nums">
                        02
                      </span>
                      <div className="flex-1 min-w-0 flex items-baseline justify-between gap-3">
                        <div>
                          <Eyebrow className="text-elec-yellow">Circuits</Eyebrow>
                          <h3 className="mt-1 text-[18px] sm:text-[22px] leading-tight font-semibold text-white tracking-tight">
                            {merged.length > 0 ? (
                              <>
                                <span className="text-elec-yellow tabular-nums">
                                  {merged.filter((c) => !c.isInfrastructure).length}
                                </span>
                                {totalWays && totalWays > merged.length ? (
                                  <>
                                    {' '}
                                    way{merged.filter((c) => !c.isInfrastructure).length === 1 ? '' : 's'} of{' '}
                                    <span className="text-elec-yellow tabular-nums">
                                      {totalWays}
                                    </span>
                                    .
                                  </>
                                ) : (
                                  ` way${merged.filter((c) => !c.isInfrastructure).length === 1 ? '' : 's'}.`
                                )}
                              </>
                            ) : (
                              <span className="inline-flex items-center gap-2">
                                <span className="relative inline-flex h-1.5 w-1.5">
                                  <span className="absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-75 animate-ping" />
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-elec-yellow" />
                                </span>
                                <span className="text-white/55 animate-pulse">Reading</span>
                              </span>
                            )}
                          </h3>
                        </div>

                        {merged.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setReversed((r) => !r);
                              setReverseTouchedByUser(true);
                            }}
                            className={cn(
                              'flex-shrink-0 text-[11px] uppercase tracking-[0.18em] font-semibold',
                              'transition-colors touch-manipulation whitespace-nowrap',
                              reversed
                                ? 'text-elec-yellow hover:text-elec-yellow/85'
                                : 'text-white/55 hover:text-white'
                            )}
                          >
                            {reversed ? 'Reversed ✓' : 'Reverse'}
                          </button>
                        )}
                      </div>
                    </div>

                    {board?.main_switch_side === 'right' && reversed && (
                      <p className="mt-3 ml-[calc(26px+1rem)] sm:ml-[calc(30px+1.5rem)] text-[13px] text-white/55">
                        Main switch detected on the right — circuit numbering reversed automatically.
                      </p>
                    )}

                    {displayed.length > 0 ? (
                      <motion.ul className="mt-6 space-y-2.5">
                        {displayed.map(({ row, displayNumber }, idx) => (
                          <CircuitRow
                            key={row.id}
                            circuit={row}
                            displayNumber={displayNumber}
                            isThreePhase={isThreePhase}
                            warning={warningMap[row.position] ?? null}
                            canMoveUp={idx > 0}
                            canMoveDown={idx < displayed.length - 1}
                            onSave={handleSaveRow}
                            onDelete={() => handleDeleteRow(row.position)}
                            onMoveUp={() => handleMoveRow(row.position, -1)}
                            onMoveDown={() => handleMoveRow(row.position, 1)}
                          />
                        ))}

                        {isStreaming && totalWays > merged.length && (
                          <li className="rounded-xl bg-white/[0.02] border border-white/[0.04] border-dashed">
                            <div className="px-4 sm:px-5 py-4 sm:py-5 flex items-center gap-3 sm:gap-4">
                              <span className="flex-shrink-0 w-7 sm:w-8 text-[14px] sm:text-[15px] font-medium text-white/30 tabular-nums">
                                {String(merged.length + 1).padStart(2, '0')}
                              </span>
                              <span className="flex items-center gap-2 text-[13px] sm:text-[14px] text-white/55">
                                <span className="relative inline-flex h-1.5 w-1.5">
                                  <span className="absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-75 animate-ping" />
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-elec-yellow" />
                                </span>
                                <span>
                                  Reading way{' '}
                                  <span className="tabular-nums text-white/85">
                                    {merged.length + 1}
                                  </span>{' '}
                                  of{' '}
                                  <span className="tabular-nums text-white/85">{totalWays}</span>
                                </span>
                              </span>
                            </div>
                          </li>
                        )}

                        {/* Add way — appears once the stream is done so the user
                            can append a missing way (e.g. a spare the AI didn't catch). */}
                        {isDone && (
                          <li>
                            <button
                              type="button"
                              onClick={handleAddWay}
                              className={cn(
                                'w-full rounded-xl border border-dashed border-white/[0.10]',
                                'hover:border-elec-yellow/40 hover:bg-elec-yellow/[0.03]',
                                'transition-colors touch-manipulation',
                                'px-4 sm:px-5 py-4 sm:py-5 flex items-center gap-3 sm:gap-4'
                              )}
                            >
                              <span className="flex-shrink-0 w-7 sm:w-8 text-[14px] sm:text-[15px] font-medium text-elec-yellow/70 tabular-nums">
                                +
                              </span>
                              <span className="text-[14px] sm:text-[15px] font-medium text-white/65 group-hover:text-white">
                                Add way
                              </span>
                            </button>
                          </li>
                        )}
                      </motion.ul>
                    ) : (
                      <WarmupSkeleton elapsedSec={elapsedSec} />
                    )}
                  </section>

                  {/* 03 — Three phase, only if relevant */}
                  {isThreePhase && (
                    <section className="pt-12 sm:pt-16">
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className="text-[26px] sm:text-[30px] leading-none font-light text-elec-yellow/70 tabular-nums">
                          03
                        </span>
                        <div className="flex-1 min-w-0">
                          <Eyebrow className="text-elec-yellow">Three phase</Eyebrow>
                          <h3 className="mt-1 text-[20px] sm:text-[24px] leading-tight font-semibold text-white tracking-tight">
                            {board?.main_switch_poles
                              ? `${board.main_switch_poles} main switch.`
                              : 'Three phase board.'}
                          </h3>
                        </div>
                      </div>

                      {board?.circuits_per_phase && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          <Pill tone="amber">L1 · {board.circuits_per_phase.L1 ?? 0}</Pill>
                          <Pill tone="amber">L2 · {board.circuits_per_phase.L2 ?? 0}</Pill>
                          <Pill tone="amber">L3 · {board.circuits_per_phase.L3 ?? 0}</Pill>
                        </div>
                      )}
                    </section>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Sticky footer */}
          {!error && (
            <div className="flex-shrink-0 sticky bottom-0 z-10 border-t border-white/[0.06] bg-background/95 backdrop-blur-xl">
              <div className="px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onRescan}
                  className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/65 hover:text-white touch-manipulation"
                >
                  Rescan
                </button>

                <button
                  type="button"
                  disabled={!isDone || merged.length === 0}
                  onClick={handleApply}
                  className={cn(
                    'h-12 px-6 rounded-xl text-[14px] font-semibold tracking-tight',
                    'transition-all touch-manipulation',
                    isDone && merged.length > 0
                      ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90 shadow-[0_8px_30px_-8px_rgba(252,196,25,0.45)]'
                      : 'bg-white/[0.04] text-white/35 cursor-not-allowed'
                  )}
                >
                  {isDone
                    ? `Apply to schedule (${merged.filter((c) => !c.isInfrastructure).length}) →`
                    : 'Reading…'}
                </button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BoardScannerStream;
