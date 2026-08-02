/**
 * BoardScannerStream — editorial, streaming board scanner review.
 *
 * Replaces CircuitReviewSheet. Takes captured image URLs, calls the
 * `board-read-stream` edge function, consumes SSE events, and renders an
 * editorial review experience as the model produces results.
 *
 * Design language matches the cert sheets (BoardScannerOverlay / MWTestingTab):
 * - Sheet header: bold title + text-[12px] white/60 subline, no gradient bars
 * - Recipe sub-headings (border-t + h3), sentence case, no numbered markers
 * - Neutral chips, coloured text for flags, tabular-nums for figures
 * - Streaming rows keep their skeleton + motion enter animations
 * - Inline editing per row
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Loader2 } from 'lucide-react';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { useHaptic } from '@/hooks/useHaptic';
import {
  supabase,
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
} from '@/integrations/supabase/client';
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
// Correction capture — fire-and-forget telemetry on user edits
// ────────────────────────────────────────────────────────

/** Normalise a value for diffing/storage: empty → null, everything → string. */
const normCorrectionValue = (v: unknown): string | null =>
  v === null || v === undefined || v === '' ? null : String(v);

const CORRECTION_FIELDS: Array<[string, (c: ConfirmedCircuit) => unknown]> = [
  ['device', (c) => c.device],
  ['rating', (c) => c.rating],
  ['curve', (c) => c.curve],
  ['label', (c) => c.label],
  ['rcdType', (c) => c.rcdType],
  ['iDeltaNmA', (c) => c.iDeltaNmA],
  ['phaseDesignation', (c) => c.phaseDesignation],
];

/**
 * Diffs the user's saved row against the ORIGINAL AI-detected circuit and
 * inserts one `board_scan_corrections` row per changed field. Strictly
 * fire-and-forget: the table may not exist yet (migration pending) and a
 * failure must never break saving — hence `.then(noop, noop)`, never
 * `.catch()` (the Supabase builder is a thenable, not a Promise: `.catch()`
 * both throws and silently never sends the request).
 */
function recordScanCorrections(
  original: ConfirmedCircuit | undefined,
  next: ConfirmedCircuit,
  board: BoardData | null
) {
  try {
    if (!original) return;
    const changed = CORRECTION_FIELDS.filter(
      ([, get]) => normCorrectionValue(get(original)) !== normCorrectionValue(get(next))
    );
    if (changed.length === 0) return;

    supabase.auth
      .getUser()
      .then(({ data }) => {
        const userId = data.user?.id;
        if (!userId) return;
        const rows = changed.map(([field, get]) => ({
          user_id: userId,
          position: original.position,
          field,
          ai_value: normCorrectionValue(get(original)),
          user_value: normCorrectionValue(get(next)),
          ai_confidence: original.confidence ?? null,
          board_brand: board?.brand ?? null,
          board_model: board?.model ?? null,
        }));
        // Untyped table access — types regenerate once the migration lands.
        (
          supabase as unknown as {
            from: (t: string) => {
              insert: (r: unknown[]) => PromiseLike<unknown>;
            };
          }
        )
          .from('board_scan_corrections')
          .insert(rows)
          .then(
            () => {},
            () => {}
          );
      })
      .then(
        () => {},
        () => {}
      );
  } catch {
    // Correction telemetry must never break the save path.
  }
}

// ────────────────────────────────────────────────────────
// Streaming hook — owns the SSE connection
// ────────────────────────────────────────────────────────

function useBoardStream(
  open: boolean,
  imageUrls: string[],
  hints: BoardScannerStreamProps['hints'],
  /**
   * Read at scan start (never a dependency — changing it mid-stream must not
   * restart the scan). Carries the user's optional expected-ways hint into
   * the NEXT scan's request body.
   */
  expectedWaysRef: MutableRefObject<number | null>
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
        // Merge the session's expected-ways hint (if the user set one) into
        // the request. Read once at scan start via ref so mid-stream chip
        // taps only affect the NEXT scan.
        const mergedHints = {
          ...(hints ?? {}),
          ...(expectedWaysRef.current ? { expected_ways: expectedWaysRef.current } : {}),
        };

        const response = await fetch(`${SUPABASE_URL}/functions/v1/board-read-stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ images: imageUrls, hints: mergedHints }),
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
  }, [open, imageUrls, hints, expectedWaysRef]);

  return { board, circuits, status, phase, error };
}

// ────────────────────────────────────────────────────────
// Atoms
// ────────────────────────────────────────────────────────

/** One row of the board definition grid — label left, value left-adjacent.
 *  Each fact slides in as the board data streams in. */
const BoardFact = ({ label, value }: { label: string; value: string }) => (
  <>
    <motion.span variants={itemVariants} className="text-[12px] font-medium text-white leading-6">
      {label}
    </motion.span>
    <motion.span variants={itemVariants} className="text-sm text-white tabular-nums leading-6">
      {value}
    </motion.span>
  </>
);

/** Compact neutral chip for device / rating / curve facts. */
const Chip = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center rounded-md border border-white/[0.12] bg-white/[0.06] px-2 py-0.5 text-[12px] font-medium text-white tabular-nums">
    {children}
  </span>
);

/** Sentence-case field label for the per-circuit edit block. */
const FieldLabel = ({ children }: { children: ReactNode }) => (
  <div className="mb-1.5 text-[12px] font-medium text-white">{children}</div>
);

/** Small volt pulse dot — the streaming heartbeat. */
const PulseDot = () => (
  <span className="relative inline-flex h-1.5 w-1.5 flex-shrink-0">
    <span className="absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-75 animate-ping" />
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-elec-yellow" />
  </span>
);

/**
 * Photo hero — the captured board photo the AI is reading. While the stream
 * is live a volt scan-line sweeps the image top-to-bottom (reuses the global
 * `scan` keyframes from index.css); when the read completes a volt chip
 * fades in. Additional captures render as a horizontal snap row beneath.
 */
const PhotoHero = ({
  imageUrls,
  isStreaming,
  isDone,
}: {
  imageUrls: string[];
  isStreaming: boolean;
  isDone: boolean;
}) => {
  if (imageUrls.length === 0) return null;
  return (
    <div className="pt-4">
      <div className="relative overflow-hidden rounded-xl border border-white/[0.14] bg-black/50">
        {/* object-CONTAIN — the whole board must be visible (cover cropped it
            to a letterbox slice, Andrew). The dark backdrop fills the bars. */}
        <img
          src={imageUrls[0]}
          alt="Captured board photo"
          className="mx-auto max-h-64 w-full object-contain sm:max-h-80"
        />
        {isStreaming && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Subtle dimming so the volt line reads against bright photos */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/25" />
            {/* Volt scan-line — sweeps top → bottom on loop */}
            <div className="absolute inset-x-0 h-[2px] bg-elec-yellow shadow-[0_0_16px_3px_hsl(var(--elec-yellow)/0.55)] motion-safe:animate-[scan_2.2s_ease-in-out_infinite]" />
          </div>
        )}
        <AnimatePresence>
          {isDone && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute right-2.5 top-2.5 rounded-md bg-elec-yellow px-2 py-1 text-[11px] font-semibold text-black"
            >
              Read complete
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {imageUrls.length > 1 && (
        <div className="mt-2 -mx-1 flex gap-2 overflow-x-auto snap-x snap-mandatory px-1 pb-1">
          {imageUrls.slice(1).map((url, i) => (
            <img
              key={url}
              src={url}
              alt={`Board photo ${i + 2}`}
              className="h-16 w-24 flex-shrink-0 snap-start rounded-lg border border-white/[0.14] object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};

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
          'h-11 text-[15px] text-white tabular-nums px-0',
          'hover:border-white/25 focus:border-elec-yellow focus:outline-none',
          'data-[state=open]:border-elec-yellow transition-colors touch-manipulation'
        )}
      >
        <SelectPrimitive.Value>
          {stringValue ? (
            <span className="text-white">
              {stringValue}
              {suffix && <span className="text-white/80 ml-0.5">{suffix}</span>}
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
                  'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2',
                  'before:h-5 before:w-[2px] before:rounded-full before:bg-transparent',
                  'data-[state=checked]:before:bg-elec-yellow',
                  'transition-colors touch-manipulation'
                )}
              >
                <SelectPrimitive.ItemText>
                  {String(o)}
                  {suffix && <span className="text-white/80 ml-0.5">{suffix}</span>}
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
      <div className="rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <PulseDot />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentPhase.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-sm font-medium text-white truncate"
              >
                {currentPhase.label}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[12px] font-medium text-elec-yellow tabular-nums whitespace-nowrap">
            {elapsedSec}s
          </span>
        </div>

        {/* Indeterminate progress sweep */}
        <div className="mt-4 h-[2px] w-full rounded-full bg-white/[0.1] overflow-hidden">
          <motion.div
            className="h-full w-1/3 rounded-full bg-elec-yellow"
            initial={{ x: '-100%' }}
            animate={{ x: '300%' }}
            transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>
      </div>

      {/* Skeleton shimmer rows — bright enough to read, staggered so the
          list breathes while the model warms up */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-xl border border-white/[0.1] bg-white/[0.08]"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        >
          <div className="px-4 sm:px-5 py-4 sm:py-5 flex items-center gap-3 sm:gap-4">
            <span className="flex-shrink-0 w-7 sm:w-8 text-sm font-medium text-white/45 tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="h-3 flex-1 max-w-[180px] rounded-full bg-white/[0.14] animate-pulse" />
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
  deleteMode,
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
  /**
   * 'remove' — the row is genuinely deleted (manual ways).
   * 'spare' — streamed rows are converted to a Spare that stays in the list;
   * the control is labelled honestly so it never claims to destroy scan data.
   */
  deleteMode: 'remove' | 'spare';
  onSave: (next: ConfirmedCircuit) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(circuit);
  const [dragX, setDragX] = useState(0);
  const haptic = useHaptic();

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
  const deleteLabel = deleteMode === 'spare' ? 'Mark spare' : 'Delete';

  // Swipe-to-delete config — left swipe past 35% reveals delete; past 65%
  // commits the delete with a fly-out animation.
  const SWIPE_REVEAL = -88;
  const SWIPE_COMMIT = -180;

  const handleSave = () => {
    haptic.light();
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
      <motion.li variants={itemVariants} layout className="relative lg:col-span-2">
        <div className="rounded-xl border border-dashed border-white/[0.14] bg-white/[0.04]">
          <div className="px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-3 sm:gap-4">
            <span className="flex-shrink-0 w-7 sm:w-8 text-sm font-medium text-white/45 tabular-nums">
              —
            </span>
            <div className="flex-1 min-w-0 flex items-baseline justify-between gap-3">
              <div className="text-[12px] font-medium text-white">
                {circuit.device === 'RCD' ? 'Upstream RCD' : 'Main switch'}
              </div>
              <span className="text-[13px] text-white/85 tabular-nums truncate">
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
      className={cn('relative flex flex-col', editing && 'lg:col-span-2')}
    >
      {/* Delete affordance behind the card — revealed by left-swipe */}
      <motion.button
        type="button"
        onClick={() => {
          haptic.medium();
          onDelete();
        }}
        animate={{
          opacity: dragX < -16 ? 1 : 0,
          scale: dragX < SWIPE_REVEAL ? 1 : 0.92,
        }}
        transition={{ duration: 0.15 }}
        className={cn(
          'absolute inset-y-0 right-0 w-[88px] flex items-center justify-center',
          'rounded-xl bg-white/[0.06] text-red-400 text-[12px] font-semibold',
          'pointer-events-none'
        )}
      >
        {deleteLabel}
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
            haptic.medium();
            onDelete();
          } else {
            setDragX(0);
          }
        }}
        animate={{ x: dragX < SWIPE_REVEAL ? SWIPE_REVEAL : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        className={cn(
          // flex-1 — every card in a grid row stretches to the row's height,
          // so a chip-less Spare matches its 3P neighbour (Andrew).
          'relative flex-1 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14]',
          'transition-colors duration-150 touch-pan-y',
          editing && 'border-white/[0.22]'
        )}
      >
      <div className="flex h-full items-start gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-3.5">
        <span className="flex-shrink-0 text-sm font-medium text-white/85 tabular-nums leading-tight pt-1 whitespace-nowrap">
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
                <div className="text-[15px] sm:text-base font-semibold text-white leading-snug truncate">
                  {circuit.label || (isSpare ? 'Spare' : 'Unlabelled')}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {isThreePhase && circuit.phaseDesignation && (
                    <span className="text-[12px] font-medium text-elec-yellow tabular-nums whitespace-nowrap">
                      {circuit.phase === '3P' || circuit.phaseDesignation.includes(',')
                        ? 'L1·L2·L3'
                        : circuit.phaseDesignation}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      setEditing(true);
                    }}
                    className={cn(
                      // 44px hit area — padding grows the target, negative
                      // margins keep the row layout unchanged.
                      'px-3 -mx-3 py-3.5 -my-3.5 text-[12px] font-semibold',
                      'transition-colors duration-150 touch-manipulation whitespace-nowrap',
                      showWarning
                        ? 'text-orange-300 hover:text-orange-200'
                        : 'text-elec-yellow hover:text-elec-yellow/85'
                    )}
                  >
                    {showWarning ? 'Review' : 'Edit'}
                  </button>
                </div>
              </div>

              {!isSpare && (
                <div className="mt-1.5 flex flex-wrap gap-1.5 items-center">
                  <Chip>{circuit.device}</Chip>
                  {circuit.curve && circuit.rating !== null && (
                    <Chip>{`${circuit.curve}${circuit.rating}`}</Chip>
                  )}
                  {!circuit.curve && circuit.rating !== null && <Chip>{`${circuit.rating}A`}</Chip>}
                  {circuit.rcdType && <Chip>Type {circuit.rcdType}</Chip>}
                  {circuit.iDeltaNmA !== null && circuit.iDeltaNmA !== undefined && (
                    <Chip>{circuit.iDeltaNmA}mA</Chip>
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
                    <p className="mt-2.5 text-[12px] text-orange-300 leading-relaxed">
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
                <div className="text-[15px] sm:text-base font-semibold text-white">
                  Way {displayNumber ?? '—'}
                </div>
                {/* 44px hit areas via padding + negative margin so the header
                    row keeps its compact visual height */}
                <div className="flex items-center gap-2 text-[12px] font-semibold">
                  <button
                    type="button"
                    onClick={onMoveUp}
                    disabled={!canMoveUp}
                    aria-label="Move up"
                    className={cn(
                      'px-3 py-3 -my-3 text-[14px] tabular-nums leading-none touch-manipulation transition-colors',
                      canMoveUp
                        ? 'text-white/85 hover:text-white'
                        : 'text-white/20 cursor-not-allowed'
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
                      'px-3 py-3 -my-3 text-[14px] tabular-nums leading-none touch-manipulation transition-colors',
                      canMoveDown
                        ? 'text-white/85 hover:text-white'
                        : 'text-white/20 cursor-not-allowed'
                    )}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-2.5 py-3.5 -my-3.5 text-white/80 hover:text-white touch-manipulation"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-2.5 py-3.5 -my-3.5 text-elec-yellow hover:text-elec-yellow/85 touch-manipulation"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <FieldLabel>Device</FieldLabel>
                  <InlineSelect
                    value={draft.device || 'MCB'}
                    options={DEVICE_OPTIONS}
                    onChange={(v) => setDraft({ ...draft, device: v })}
                  />
                </div>

                {draft.device !== 'Spare' && (
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <div>
                      <FieldLabel>Curve</FieldLabel>
                      <InlineSelect
                        value={draft.curve as 'B' | 'C' | 'D' | null}
                        options={CURVE_OPTIONS}
                        onChange={(v) => setDraft({ ...draft, curve: v })}
                      />
                    </div>
                    <div>
                      <FieldLabel>Rating</FieldLabel>
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
                          <FieldLabel>RCD type</FieldLabel>
                          <InlineSelect
                            value={draft.rcdType as 'AC' | 'A' | 'F' | 'B' | null}
                            options={RCD_TYPE_OPTIONS}
                            onChange={(v) => setDraft({ ...draft, rcdType: v })}
                          />
                        </div>
                        <div>
                          <FieldLabel>I∆n</FieldLabel>
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
                        <FieldLabel>Phase</FieldLabel>
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
                  <FieldLabel>Label</FieldLabel>
                  <Input
                    value={draft.label}
                    onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                    className={cn(
                      'bg-transparent border-0 border-b border-white/[0.15] rounded-none',
                      'h-11 text-[15px] text-white px-0 caret-elec-yellow',
                      'hover:border-white/[0.3] focus:border-elec-yellow',
                      'focus-visible:ring-0 focus:ring-0 focus:outline-none',
                      'transition-colors duration-150 touch-manipulation'
                    )}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      haptic.medium();
                      onDelete();
                    }}
                    className="min-h-[44px] px-3 -mx-3 flex items-center text-[12px] font-semibold text-red-400 hover:text-red-300 transition-colors duration-150 touch-manipulation"
                  >
                    {deleteMode === 'spare' ? 'Mark row spare' : 'Delete row'}
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

/** Quick-pick options for the expected-ways hint. */
const WAYS_PRESETS = [6, 8, 10, 12, 16, 24] as const;

/**
 * Session-scoped memory for the expected-ways hint. The stream view unmounts
 * on rescan (the overlay clears its imageUrls), so component state alone
 * would lose the hint exactly when it is needed — module scope survives
 * remounts within the session.
 */
let sessionExpectedWays: number | null = null;

export const BoardScannerStream = ({
  open,
  onOpenChange,
  imageUrls,
  hints,
  onConfirm,
  onRescan,
}: BoardScannerStreamProps) => {
  const expectedWaysRef = useRef<number | null>(sessionExpectedWays);
  const { board, circuits, status, phase, error } = useBoardStream(
    open,
    imageUrls,
    hints,
    expectedWaysRef
  );
  const haptic = useHaptic();
  const [expectedWays, setExpectedWays] = useState<number | null>(sessionExpectedWays);
  const [showOtherWays, setShowOtherWays] = useState<boolean>(
    () =>
      sessionExpectedWays !== null &&
      !(WAYS_PRESETS as readonly number[]).includes(sessionExpectedWays)
  );

  const applyExpectedWays = useCallback((n: number | null) => {
    setExpectedWays(n);
    expectedWaysRef.current = n;
    sessionExpectedWays = n;
  }, []);
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

  // Live elapsed-time counter while the warmup skeleton is visible. The
  // skeleton only clears when the first CIRCUITS land (not board metadata),
  // so keep counting until then — otherwise the seconds freeze mid-count.
  const hasCircuitRows = circuits.length > 0;
  useEffect(() => {
    if (!open) return;
    if (hasCircuitRows) return; // rows landed, skeleton gone — stop counting
    setElapsedSec(0);
    const t = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [open, hasCircuitRows]);

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
      // Correction capture — diff against the ORIGINAL AI-detected circuit
      // (not a previous edit) so the log reflects what the model got wrong.
      recordScanCorrections(
        circuits.find((c) => c.position === next.position),
        next,
        board
      );
      setEdited((prev) => ({ ...prev, [next.position]: next }));
    },
    [circuits, board]
  );

  const handleDeleteRow = useCallback(
    (position: number) => {
      // If this is a manual user-added way, drop it from manualWays. Otherwise
      // turn the streamed row into a Spare via the edited override (the control
      // is labelled 'Mark spare' for streamed rows).
      const isManual = manualWays.some((w) => w.position === position);
      if (isManual) {
        setManualWays((prev) => prev.filter((w) => w.position !== position));
        return;
      }
      // Correction capture — marking a streamed row spare is itself a signal
      // the model read a device where there was none.
      const original = circuits.find((c) => c.position === position);
      if (original && original.device !== 'Spare') {
        recordScanCorrections(original, { ...original, device: 'Spare' }, board);
      }
      // Preserve phase/spansWays: a mis-scanned 3P row still occupies its
      // physical DIN positions, so marking it spare must not collapse 3 ways
      // to 1 and shift every later way number.
      setEdited((prev) => {
        const source = prev[position] ?? circuits.find((c) => c.position === position);
        return {
          ...prev,
          [position]: {
            id: `c-${position}`,
            position,
            label: 'Spare',
            device: 'Spare',
            rating: null,
            curve: null,
            confidence: 'high',
            phase: source?.phase,
            spansWays: source?.spansWays,
          },
        };
      });
    },
    [manualWays, circuits, board]
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

  const wayCount = merged.filter((c) => !c.isInfrastructure).length;

  // Live subline under the sheet title — crossfades as the stream progresses.
  const subline = useMemo(() => {
    if (error) return 'The scan could not be completed.';
    if (phase === 'connecting') return 'Reading the board…';
    if (board && phase === 'analyzing') {
      const ways = board.estimated_total_ways;
      const seen = circuits.length;
      if (ways && seen > 0) return `Reading the board — ${seen} of ${ways} read…`;
      return 'Reading the board…';
    }
    if (phase === 'validating') return 'Checking the results…';
    if (isDone) {
      return flaggedCount > 0
        ? `Scan complete — ${flaggedCount} to review, then apply`
        : 'Scan complete — review and apply';
    }
    return status;
  }, [phase, error, board, circuits.length, isDone, flaggedCount, status]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/10 outline-none focus:outline-none focus-visible:outline-none"
      >
        <SheetTitle className="sr-only">Board scanner — review detected circuits</SheetTitle>
        <SheetDescription className="sr-only">
          Live results from the board scan. Edit any row before applying to the schedule of tests.
        </SheetDescription>
        <div className="flex flex-col h-full bg-background">
          {/* Sticky header — cert sheet language */}
          <div className="flex-shrink-0 sticky top-0 z-10 border-b border-white/[0.08] backdrop-blur-xl bg-background/95">
            <div className="px-5 sm:px-8 pt-5 pb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {wayCount > 0 ? (
                    <>
                      Board scan — <span className="tabular-nums">{wayCount}</span>{' '}
                      {wayCount === 1 ? 'way' : 'ways'}
                    </>
                  ) : (
                    'Board scan'
                  )}
                </h2>
                {isStreaming && <PulseDot />}
              </div>

              <div className="mt-0.5 min-h-[1.125rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={subline}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="text-[12px] text-white/85 truncate tabular-nums"
                  >
                    {subline}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Live volt progress bar — determinate once the board reports its
                way count, indeterminate sweep before that */}
            {isStreaming && (
              <div className="h-[3px] w-full overflow-hidden bg-white/[0.08]">
                {board?.estimated_total_ways ? (
                  <div
                    className="h-full bg-elec-yellow transition-[width] duration-500 ease-out"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round((circuits.length / board.estimated_total_ways) * 100)
                      )}%`,
                    }}
                  />
                ) : (
                  <motion.div
                    className="h-full w-1/3 bg-elec-yellow"
                    initial={{ x: '-100%' }}
                    animate={{ x: '300%' }}
                    transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="px-5 sm:px-8 pt-2 pb-32">
              {/* The photo the AI is reading — always visible so the scan has
                  a subject, with a live scan-line while streaming */}
              <PhotoHero imageUrls={imageUrls} isStreaming={isStreaming && !error} isDone={isDone} />

              {error ? (
                <div className="py-8">
                  <div className="rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] px-4 sm:px-5 py-4">
                    <p className="text-sm font-semibold text-red-400">Couldn’t read the board</p>
                    <p className="mt-1 text-[12px] text-white/85 leading-relaxed">{error}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      onRescan();
                    }}
                    className="mt-4 h-12 px-5 rounded-xl text-sm font-medium bg-white/[0.06] border border-white/[0.12] text-white hover:bg-white/[0.1] active:scale-[0.98] transition-all duration-150 touch-manipulation"
                  >
                    Rescan
                  </button>
                </div>
              ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  {/* Board */}
                  <section className="pt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm font-semibold text-white">Board</h3>
                      {!board && (
                        <span className="flex items-center gap-2 text-[12px] text-white/85">
                          <PulseDot />
                          Reading…
                        </span>
                      )}
                    </div>

                    <AnimatePresence>
                      {board && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 sm:px-5 py-4"
                        >
                          <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-[auto,1fr] gap-x-6 gap-y-2 max-w-md"
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>

                  {/* Circuits */}
                  <section className="mt-8 border-t border-white/[0.1] pt-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm font-semibold text-white">Circuits</h3>

                      {merged.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            haptic.selection();
                            setReversed((r) => !r);
                            setReverseTouchedByUser(true);
                            // Manual ↑/↓ moves write an explicit rank for every
                            // row, which would otherwise pin the order and make
                            // this toggle a no-op. Reversing is a fresh base
                            // ordering — clear the overrides so it always takes.
                            setOrderOverride({});
                          }}
                          className={cn(
                            // 44px hit area without shifting the header layout:
                            // padding grows the target, negative margins absorb it.
                            'flex-shrink-0 px-3 -mx-3 py-3.5 -my-3.5 text-[12px] font-semibold',
                            'transition-colors duration-150 touch-manipulation whitespace-nowrap',
                            reversed
                              ? 'text-elec-yellow hover:text-elec-yellow/85'
                              : 'text-white/85 hover:text-white'
                          )}
                        >
                          {reversed ? 'Reversed ✓' : 'Reverse'}
                        </button>
                      )}
                    </div>

                    <div className="mt-1 min-h-[1.125rem]">
                      {merged.length > 0 ? (
                        <p className="text-[12px] text-white/85 tabular-nums">
                          {totalWays && totalWays > merged.length
                            ? `${wayCount} of ${totalWays} ways read`
                            : `${wayCount} way${wayCount === 1 ? '' : 's'}`}
                        </p>
                      ) : (
                        <span className="flex items-center gap-2 text-[12px] text-white/85">
                          <PulseDot />
                          Reading…
                        </span>
                      )}
                    </div>

                    {board?.main_switch_side === 'right' && reversed && (
                      <p className="mt-2 text-[12px] text-white/85">
                        Main switch detected on the right — circuit numbering reversed automatically.
                      </p>
                    )}

                    {/* Expected-ways hint — only useful before circuits land.
                        The choice persists for the session and is sent as
                        hints.expected_ways on the next scan (rescan path). */}
                    {circuits.length === 0 && !error && (
                      <div className="mt-4 rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 sm:px-5 py-4">
                        <p className="text-[12px] font-medium text-white">
                          How many ways? (optional)
                        </p>
                        <p className="mt-0.5 text-[12px] text-white/80">
                          Applied as a hint on your next scan so no position is missed.
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {WAYS_PRESETS.map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => {
                                haptic.selection();
                                setShowOtherWays(false);
                                applyExpectedWays(expectedWays === n ? null : n);
                              }}
                              className={cn(
                                'h-9 min-w-[44px] rounded-lg border px-3 text-[13px] tabular-nums',
                                'transition-colors touch-manipulation',
                                expectedWays === n
                                  ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                                  : 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:bg-white/[0.1]'
                              )}
                            >
                              {n}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              haptic.selection();
                              setShowOtherWays((s) => !s);
                            }}
                            className={cn(
                              'h-9 rounded-lg border px-3 text-[13px]',
                              'transition-colors touch-manipulation',
                              showOtherWays
                                ? 'border-elec-yellow/60 bg-white/[0.06] text-white font-medium'
                                : 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:bg-white/[0.1]'
                            )}
                          >
                            Other
                          </button>
                          {showOtherWays && (
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              autoFocus
                              value={expectedWays ?? ''}
                              onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, '').slice(0, 3);
                                const parsed = digits ? parseInt(digits, 10) : NaN;
                                applyExpectedWays(
                                  Number.isFinite(parsed) && parsed > 0 ? parsed : null
                                );
                              }}
                              placeholder="Ways"
                              aria-label="Expected number of ways"
                              className={cn(
                                'h-9 w-20 rounded-none border-0 border-b border-white/[0.15]',
                                'bg-transparent px-1 text-[14px] text-white tabular-nums',
                                'placeholder:text-white/25 caret-elec-yellow',
                                'focus:border-elec-yellow focus:outline-none focus:ring-0',
                                'touch-manipulation'
                              )}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {displayed.length > 0 ? (
                      /* 2-up on desktop — single-column full-width rows left a
                         sea of void at 1600px. A row being edited spans both
                         columns for room. */
                      <motion.ul className="mt-5 grid grid-cols-1 gap-2.5 lg:grid-cols-2 lg:gap-3">
                        {displayed.map(({ row, displayNumber }, idx) => (
                          <CircuitRow
                            key={row.id}
                            circuit={row}
                            displayNumber={displayNumber}
                            isThreePhase={isThreePhase}
                            warning={warningMap[row.position] ?? null}
                            canMoveUp={idx > 0}
                            canMoveDown={idx < displayed.length - 1}
                            deleteMode={
                              manualWays.some((w) => w.position === row.position)
                                ? 'remove'
                                : 'spare'
                            }
                            onSave={handleSaveRow}
                            onDelete={() => handleDeleteRow(row.position)}
                            onMoveUp={() => handleMoveRow(row.position, -1)}
                            onMoveDown={() => handleMoveRow(row.position, 1)}
                          />
                        ))}

                        {isStreaming && totalWays > merged.length && (
                          <motion.li
                            className="rounded-xl border border-white/[0.1] bg-white/[0.08]"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-3 sm:gap-4">
                              <span className="flex-shrink-0 w-7 sm:w-8 text-sm font-medium text-white/45 tabular-nums">
                                {String(merged.length + 1).padStart(2, '0')}
                              </span>
                              <span className="flex items-center gap-2 text-[13px] text-white/85">
                                <PulseDot />
                                <span>
                                  Reading way{' '}
                                  <span className="tabular-nums text-white">
                                    {merged.length + 1}
                                  </span>{' '}
                                  of <span className="tabular-nums text-white">{totalWays}</span>
                                </span>
                              </span>
                            </div>
                          </motion.li>
                        )}

                        {/* Add way — appears once the stream is done so the user
                            can append a missing way (e.g. a spare the AI didn't catch). */}
                        {isDone && (
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                haptic.light();
                                handleAddWay();
                              }}
                              className={cn(
                                'w-full rounded-xl border border-dashed border-white/[0.14]',
                                'hover:border-elec-yellow/60 active:scale-[0.99]',
                                'transition-all duration-150 touch-manipulation',
                                'px-4 sm:px-5 py-4 sm:py-5 flex items-center gap-3 sm:gap-4'
                              )}
                            >
                              <span className="flex-shrink-0 w-7 sm:w-8 text-sm font-medium text-elec-yellow tabular-nums">
                                +
                              </span>
                              <span className="text-sm font-medium text-white/85">
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

                  {/* Three phase, only if relevant */}
                  {isThreePhase && (
                    <section className="mt-8 border-t border-white/[0.1] pt-4">
                      <h3 className="text-sm font-semibold text-white">Three phase</h3>
                      <p className="mt-1 text-[12px] text-white/85">
                        {board?.main_switch_poles
                          ? `${board.main_switch_poles} main switch`
                          : 'Three phase board'}
                      </p>

                      {board?.circuits_per_phase && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <Chip>L1 · {board.circuits_per_phase.L1 ?? 0}</Chip>
                          <Chip>L2 · {board.circuits_per_phase.L2 ?? 0}</Chip>
                          <Chip>L3 · {board.circuits_per_phase.L3 ?? 0}</Chip>
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
              <div className="px-5 sm:px-8 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onRescan();
                  }}
                  className="h-12 px-5 rounded-xl text-sm font-medium bg-white/[0.06] border border-white/[0.12] text-white hover:bg-white/[0.1] active:scale-[0.98] transition-all duration-150 touch-manipulation"
                >
                  Rescan
                </button>

                <button
                  type="button"
                  disabled={!isDone || merged.length === 0}
                  onClick={() => {
                    haptic.success();
                    handleApply();
                  }}
                  className={cn(
                    'h-12 flex-1 px-5 rounded-xl text-sm font-semibold',
                    'active:scale-[0.98] transition-all duration-150 touch-manipulation',
                    isDone && merged.length === 0
                      ? 'bg-white/[0.06] border border-white/[0.12] text-white disabled:opacity-40'
                      : // Busy volt — while streaming the CTA stays SOLID volt
                        // with a black spinner, never a washed-out brown bar.
                        'bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:bg-elec-yellow disabled:text-black disabled:opacity-100 disabled:cursor-not-allowed'
                  )}
                >
                  {isDone ? (
                    `Apply to schedule (${wayCount})`
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                      Reading…
                    </span>
                  )}
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
