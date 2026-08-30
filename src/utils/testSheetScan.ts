import { supabase } from '@/integrations/supabase/client';
import type { TestResult } from '@/types/testResult';
import { MAIN_BOARD_ID } from '@/types/distributionBoard';

/**
 * Client side of the handwritten test-result scanner (ELE-1607).
 *
 * Sean: *"Would it be possible to upload handwritten test results using the AI
 * scanner?"*
 *
 * ── 🔴 THIS PROPOSES, IT NEVER WRITES ────────────────────────────────────
 * `applyReadings` returns a NEW array for the caller to commit. Nothing here
 * touches the schedule or the report. An EICR is signed evidence and a
 * transcription error is a wrong certificate with a real name on it, so the
 * commit stays an explicit act by the electrician.
 */

/*
 * Its own bucket, not the survey's. Two unrelated features sharing one means a
 * policy change for either silently breaks the other.
 */
const BUCKET = 'test-sheets';

/** The columns this fills — exactly what the board scanner leaves blank. */
export type MeasuredColumn =
  | 'r1r2'
  | 'r2'
  | 'ringR1'
  | 'ringRn'
  | 'ringR2'
  | 'insulationLiveNeutral'
  | 'insulationLiveEarth'
  | 'polarity'
  | 'zs'
  | 'rcdOneX'
  | 'rcdTestButton'
  | 'afddTest';

export interface Reading {
  column: MeasuredColumn;
  /** `all` = one mark covering the board. `circuit` = belongs to one row. */
  scope: 'all' | 'circuit';
  circuitNumber: string;
  value: string;
  confidence: number;
  /** [ymin, xmin, ymax, xmax] normalised 0-1000 — Gemini's convention. */
  box: [number, number, number, number] | null;
  /** Which photo it was read from — a sheet often runs to two sides. */
  imageIndex: number;
}

export interface ScanResult {
  sheetFound: boolean;
  readings: Reading[];
  /** Readings discarded below the confidence floor — surfaced, never hidden. */
  dropped: number;
  unreadable: string[];
  /** Every photo, in the order sent — `Reading.imageIndex` points into this. */
  imageUrls: string[];
}

export const COLUMN_LABEL: Record<MeasuredColumn, string> = {
  r1r2: 'R1+R2',
  r2: 'R2',
  ringR1: 'Ring r1',
  ringRn: 'Ring rn',
  ringR2: 'Ring r2',
  insulationLiveNeutral: 'Insulation L-N',
  insulationLiveEarth: 'Insulation L-E',
  polarity: 'Polarity',
  zs: 'Zs',
  rcdOneX: 'RCD time',
  rcdTestButton: 'RCD button',
  afddTest: 'AFDD test',
};

/**
 * 1600px long edge, JPEG 0.85 — higher than evidence photos on purpose.
 *
 * This is a dense grid of small handwritten decimals. `pdf-to-pages.ts` records
 * that 1000px "loses the difference between 0.35 and 0.55", and on this sheet
 * that difference is whether the circuit passes.
 */
const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.85;

function compress(file: File): Promise<Blob | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve(null);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => resolve(null);
      img.onload = () => {
        const scale = Math.min(MAX_EDGE / Math.max(img.width, img.height), 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        /* White first — a transparent source flattened to JPEG comes out black. */
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/** Uploads the sheet and returns its URL. Never throws. */
export async function uploadSheet(reportId: string, file: File): Promise<string | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    const blob = await compress(file);
    if (!blob) return null;
    const path = `${user.id}/${reportId}/${crypto.randomUUID()}.jpg`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, blob, { contentType: 'image/jpeg', upsert: false });
    if (error) {
      console.warn('[testSheetScan] upload failed:', error.message);
      return null;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return publicUrl;
  } catch (err) {
    console.warn('[testSheetScan] upload skipped:', err);
    return null;
  }
}

/**
 * 🔴 Circuits are REQUIRED, and the edge function rejects the call without them.
 *
 * The safety case rests on matching marks to circuits we already hold. Reading
 * a sheet cold means inferring identity from paper, which is the version of
 * this that produces wrong certificates.
 */
export async function readTestSheet(
  imageUrls: string[],
  circuits: TestResult[]
): Promise<ScanResult | null> {
  try {
    const { data, error } = await supabase.functions.invoke('read-test-results', {
      body: {
        fileUrls: imageUrls,
        circuits: circuits
          .filter((c) => !c.isSpare && !c.isDeviceRow && c.circuitNumber)
          .map((c) => ({
            number: c.circuitNumber,
            description: c.circuitDescription || '',
            isRing: /ring/i.test(`${c.circuitDescription || ''} ${c.circuitType || ''}`),
          })),
      },
    });
    if (error || !data?.success) {
      console.warn('[testSheetScan] read failed:', error?.message || data?.error);
      return null;
    }
    return { ...(data as Omit<ScanResult, 'imageUrls'>), imageUrls };
  } catch (err) {
    console.warn('[testSheetScan] read skipped:', err);
    return null;
  }
}

/**
 * Tick-style columns, where the schedule's vocabulary is ✓ / ✗.
 *
 * On paper these are written a dozen ways — "OK", "P", "✔", "Y", a bare tick.
 * `validatePolarity` only accepts ✓ / correct / pass, so an unnormalised "OK"
 * would come back "Polarity result unclear" and make the validator — the whole
 * safety net — look wrong. Normalised here rather than server-side so the review
 * shows exactly what will be written.
 */
const TICK_COLUMNS: MeasuredColumn[] = ['polarity', 'rcdTestButton', 'afddTest'];
const TICK_YES = /^(ok|okay|p|y|yes|pass|passed|correct|good|✓|✔|√|tick)$/i;
const TICK_NO = /^(x|n|no|fail|failed|incorrect|✗|✘)$/i;

export function normaliseValue(column: MeasuredColumn, value: string): string {
  const v = value.trim();
  if (!TICK_COLUMNS.includes(column)) return v;
  if (TICK_YES.test(v)) return '✓';
  if (TICK_NO.test(v)) return '✗';
  /* Anything else — "N/A", "LIM", a note — is left exactly as written. */
  return v;
}

/**
 * 🔴 The rows a scan may touch — ALWAYS scoped to one board.
 *
 * Circuit numbers repeat across boards: of 84 live multi-board EICRs, 77 reuse
 * the same numbers on more than one board. Board-blind, a reading for "circuit
 * 1" would land on every board's circuit 1, and a `scope: 'all'` mark would
 * write across boards the electrician never scanned. The user opens this from a
 * specific board, so that board is the whole universe.
 */
export function scannableRows(rows: TestResult[], boardId?: string): TestResult[] {
  const usable = rows.filter((r) => !r.isSpare && !r.isDeviceRow);
  if (!boardId) return usable;
  return usable.filter((r) => (r.boardId || MAIN_BOARD_ID) === boardId);
}

/** A reading paired with the rows it would land on, once the user has vetted it. */
export interface PendingReading extends Reading {
  id: string;
  accepted: boolean;
  /** Row ids this writes to — several when `scope` is `all`. */
  targetIds: string[];
  /** Rows that already hold a value here, so an overwrite is never silent. */
  overwriteIds: string[];
}

/**
 * Works out what each reading would actually do, before anything is applied.
 *
 * 🔴 A `scope: 'all'` reading expands from ONE mark to many rows. That
 * expansion is the highest-leverage thing on the screen — one misread becomes
 * eight wrong values — so it is surfaced as a count the electrician confirms,
 * not applied quietly.
 */
export function planReadings(
  readings: Reading[],
  rows: TestResult[],
  boardId?: string
): PendingReading[] {
  const usable = scannableRows(rows, boardId);
  const held = (t: TestResult, col: MeasuredColumn) =>
    String((t as unknown as Record<string, unknown>)[col] ?? '').trim();
  return readings.map((r, i) => {
    /* Both branches draw from `usable`, which is already board-scoped. */
    const targets =
      r.scope === 'all' ? usable : usable.filter((c) => c.circuitNumber === r.circuitNumber);
    const overwriteIds = targets.filter((t) => held(t, r.column)).map((t) => t.id);
    return {
      ...r,
      value: normaliseValue(r.column, r.value),
      id: `${r.column}-${r.scope}-${r.circuitNumber}-${i}`,
      /*
       * Pre-accepted for BLANK cells, because the electrician is reviewing a
       * transcription of their own handwriting, not adjudicating a machine's
       * opinion — the work is spotting the one that is wrong.
       *
       * 🔴 But a reading that would REPLACE a value already in the schedule
       * starts OFF. That value was typed by hand, and a rescan quietly wiping
       * it is a worse outcome than a value not landing. Matches
       * `ScheduleColumnFill`, which also fills blanks by default and makes
       * overwrite a separate, labelled choice.
       */
      accepted: overwriteIds.length === 0,
      targetIds: targets.map((t) => t.id),
      overwriteIds,
    };
  });
}

/**
 * Returns a NEW rows array with the accepted readings written in.
 *
 * Pure — no state, no IO. The caller commits it, which keeps the one
 * irreversible step in the component the user is looking at.
 */
export function applyReadings(rows: TestResult[], pending: PendingReading[]): TestResult[] {
  const byId = new Map<string, Record<string, string>>();
  for (const p of pending) {
    if (!p.accepted) continue;
    for (const id of p.targetIds) {
      const patch = byId.get(id) ?? {};
      patch[p.column] = p.value;
      byId.set(id, patch);
    }
  }
  if (!byId.size) return rows;
  return rows.map((r) => (byId.has(r.id) ? { ...r, ...byId.get(r.id) } : r));
}
