import { useMemo, useRef, useState } from 'react';
import { Camera, Check, ImagePlus, Loader2, TriangleAlert, X } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { TestResult } from '@/types/testResult';
import { validateTestResult } from '@/utils/testValidation';
import { isNativeApp, nativePickPhoto } from '@/utils/pickPhotos';
import {
  applyReadings,
  planReadings,
  scannableRows,
  readTestSheet,
  uploadSheet,
  COLUMN_LABEL,
  type MeasuredColumn,
  type PendingReading,
  type ScanResult,
} from '@/utils/testSheetScan';

/**
 * Review layer for the handwritten test-result scanner (ELE-1607).
 *
 * ── 🔴 NOTHING REACHES THE SCHEDULE UNTIL "APPLY" ─────────────────────────
 * Modelled on `BoardScannerStream`, which already does this for circuits. An
 * EICR is signed evidence, so the commit is one explicit act at the end.
 *
 * Three things make review fast enough that people will actually do it:
 *  1. **The crop.** Every value sits beside the bit of photo it was read from,
 *     so checking is a glance rather than a re-read of the sheet.
 *  2. **The expansion is stated.** A single mark like "all >200" writes to
 *     every circuit — one misread becoming eight wrong values is the worst
 *     outcome here, so it is shown as a count, not applied quietly.
 *  3. **The validators run before you commit.** A scanned Zs above its max is
 *     far more likely a misread than a real failure, and it says so.
 */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Only names a folder inside the user's own prefix — RLS keys on the user id. */
  reportId?: string;
  rows: TestResult[];
  /** 🔴 The board being scanned. Circuit numbers repeat across boards. */
  boardId?: string;
  /** Shown in the header so it is obvious which board this writes to. */
  boardName?: string;
  earthingArrangement?: string;
  onApply: (rows: TestResult[]) => void;
}

/**
 * Which `validateTestResult` result each scanned column is judged by.
 *
 * The names differ: `rcdOneX` is judged as `rcdTiming`, and `pfc` feeds both
 * PFC results. Columns with no matching validator (ring legs, test buttons)
 * are deliberately absent — better silent than mapped to the wrong verdict.
 */
const VALIDATOR_KEYS: Partial<Record<MeasuredColumn, string[]>> = {
  r1r2: ['r1r2'],
  insulationLiveNeutral: ['insulationLiveNeutral'],
  insulationLiveEarth: ['insulationLiveEarth'],
  polarity: ['polarity'],
  zs: ['zs'],
  rcdOneX: ['rcdTiming'],
};

/**
 * Crop of the sheet, positioned from Gemini's 0-1000 box.
 *
 * 🔴 THE WHOLE ROW, not just the number.
 *
 * A tight crop around "0.44" proves the digits were read correctly — but says
 * nothing about WHICH circuit it belongs to. A row-shift misattribution would
 * look perfect: "Circuit 4 · 0.44" beside a crop of 0.44 that is actually
 * circuit 3's. So the strip spans the full width of the sheet at that row's
 * height, putting the circuit number and description in view beside the value.
 * Attribution becomes checkable, which is the error this cannot otherwise catch.
 */
function Crop({ url, box }: { url: string; box: [number, number, number, number] | null }) {
  if (!box) return null;
  const [ymin, , ymax] = box;
  /* Vertical padding only — a row read tight to its own edge is hard to judge. */
  const pad = 1.4;
  const y0 = Math.max(0, ymin / 10 - pad);
  const h = Math.min(100 - y0, (ymax - ymin) / 10 + pad * 2);
  return (
    <div
      aria-hidden="true"
      className="h-14 w-full overflow-hidden rounded-lg border border-white/[0.16] bg-white"
      style={{
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        /* Full sheet width; scaled vertically so this row fills the strip. */
        backgroundSize: `100% ${(100 / h) * 100}%`,
        backgroundPosition: `0% ${h >= 100 ? 0 : (y0 / (100 - h)) * 100}%`,
      }}
    />
  );
}

export default function TestSheetScanSheet({
  open,
  onOpenChange,
  reportId,
  rows,
  boardId,
  boardName,
  earthingArrangement,
  onApply,
}: Props) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const libraryRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [pending, setPending] = useState<PendingReading[]>([]);

  const testable = useMemo(() => scannableRows(rows, boardId), [rows, boardId]);

  /*
   * 🔴 Camera and library must do DIFFERENT things — the same mistake was
   * shipped on the pre-purchase survey and Andrew hit it on device (ELE-1642).
   * Native goes through the Capacitor plugin; web falls through to the input
   * that carries `capture`.
   */
  const take = async (source: 'camera' | 'library') => {
    if (isNativeApp()) {
      const file = await nativePickPhoto(source);
      if (file) await ingest([file]);
      return;
    }
    (source === 'camera' ? cameraRef : libraryRef).current?.click();
  };

  const handlePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    /* Both sides of a sheet, or a two-page one — read together so a value on
       page 2 still lands against the circuit it belongs to. */
    const files = Array.from(e.target.files ?? []).slice(0, 4);
    e.target.value = '';
    if (!files.length) return;
    await ingest(files);
  };

  const ingest = async (files: File[]) => {

    if (!testable.length) {
      toast.error('Add the circuits first', {
        description: 'The scan matches your handwriting against circuits already on the schedule.',
      });
      return;
    }

    setBusy(true);
    try {
      const urls: string[] = [];
      for (const f of files) {
        const url = await uploadSheet(reportId || 'unfiled', f);
        if (url) urls.push(url);
      }
      if (!urls.length) throw new Error('Could not save those photos');
      const result = await readTestSheet(urls, testable);
      if (!result) throw new Error('Could not read that sheet');
      if (!result.sheetFound) {
        toast.error('That does not look like a test sheet');
        return;
      }
      if (!result.readings.length) {
        toast.error('Nothing readable on that photo', {
          description: 'Try again in better light, square-on to the page.',
        });
        return;
      }
      setScan(result);
      setPending(planReadings(result.readings, rows, boardId));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not read that sheet');
    } finally {
      setBusy(false);
    }
  };

  const setValue = (id: string, value: string) =>
    setPending((prev) => prev.map((p) => (p.id === id ? { ...p, value } : p)));
  const toggle = (id: string) =>
    setPending((prev) => prev.map((p) => (p.id === id ? { ...p, accepted: !p.accepted } : p)));

  /*
   * 🔴 Validate the RESULT, not the reading.
   *
   * The values only mean anything against the circuit they land on — a Zs is
   * judged against that circuit's max Zs, which the board scanner already
   * computed. So the rows are built as they would be applied, then checked.
   */
  const problems = useMemo(() => {
    if (!pending.length) return [];
    const next = applyReadings(rows, pending);

    /*
     * 🔴 Only judge what this scan is actually WRITING.
     *
     * Validating every scanned row surfaced 45 warnings against 39 values —
     * because `validateTestResult` also warns about EMPTY fields, and a
     * part-tested schedule is full of them. Reporting those makes it look like
     * the scan broke something it never touched, and a warning list nobody
     * believes is worse than no warning list.
     */
    const written = new Set<string>();
    for (const p of pending) {
      if (!p.accepted) continue;
      for (const key of VALIDATOR_KEYS[p.column] ?? []) {
        for (const id of p.targetIds) written.add(`${id}|${key}`);
      }
    }
    if (!written.size) return [];

    const out: { circuit: string; field: string; message: string }[] = [];
    for (const r of scannableRows(next, boardId)) {
      const v = validateTestResult(r, earthingArrangement);
      for (const [field, res] of Object.entries(v)) {
        if (!written.has(`${r.id}|${field}`)) continue;
        if (res && (res.level === 'fail' || res.level === 'warning')) {
          out.push({ circuit: r.circuitNumber || '?', field, message: res.message });
        }
      }
    }
    return out;
  }, [pending, rows, boardId, earthingArrangement]);

  const accepted = pending.filter((p) => p.accepted);
  const cellsWritten = accepted.reduce((n, p) => n + p.targetIds.length, 0);

  const commit = () => {
    onApply(applyReadings(rows, pending));
    toast.success(`${cellsWritten} value${cellsWritten === 1 ? '' : 's'} added to the schedule`);
    setScan(null);
    setPending([]);
    onOpenChange(false);
  };

  const reset = () => {
    setScan(null);
    setPending([]);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] px-4 py-3.5">
            <div className="min-w-0">
              <h2 className="text-[16px] font-semibold tracking-tight text-white">
                Scan test results
              </h2>
              <p className="mt-0.5 text-[12px] leading-snug text-white">
                {scan
                  ? 'Check each value against the photo, then add them.'
                  : 'Photograph your test sheet — both sides if it runs to two.'}
              </p>
              {/* 🔴 Named, because circuit numbers repeat across boards. */}
              <p className="mt-1 text-[12px] font-semibold text-white">
                {boardName || 'This board'} · {testable.length} circuit
                {testable.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {!scan ? (
              <div className="mx-auto max-w-md">
                <p className="text-[13px] leading-relaxed text-white">
                  It reads only the measured columns — R1+R2, insulation, polarity, Zs, RCD
                  times. Circuit names and devices come from the board scan, not the paper.
                </p>
                <p className="mt-3 border-l-2 border-elec-yellow pl-3 text-[13px] leading-snug text-white">
                  A value written once for the whole board, like “all &gt;200”, is added to
                  every circuit — and it will tell you when it does that. Anything you left
                  blank stays blank.
                </p>
                {!testable.length && (
                  <p className="mt-3 text-[13px] leading-snug text-orange-300">
                    Add the circuits to the schedule first — the scan matches your writing
                    against them.
                  </p>
                )}
                <div className="mt-6 flex flex-col gap-2">
                  <button
                    type="button"
                    disabled={busy || !testable.length}
                    onClick={() => take('camera')}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] disabled:opacity-50"
                  >
                    {busy ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Reading the sheet
                      </>
                    ) : (
                      <>
                        <Camera className="h-[18px] w-[18px]" />
                        Take a photo
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={busy || !testable.length}
                    onClick={() => take('library')}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.06] text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.98] disabled:opacity-50"
                  >
                    <ImagePlus className="h-[18px] w-[18px]" />
                    Choose from photos
                  </button>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-2xl space-y-3">
                {(scan.dropped > 0 || scan.unreadable.length > 0) && (
                  <p className="border-l-2 border-orange-400 pl-3 text-[13px] leading-snug text-white">
                    {scan.dropped > 0 &&
                      `${scan.dropped} mark${scan.dropped === 1 ? '' : 's'} were too unclear to read and have been left blank. `}
                    {scan.unreadable.join(' ')}
                  </p>
                )}

                {/*
                  🔴 Stated up front. Readings that would replace typed values
                  start switched OFF, and a user who does not notice would
                  otherwise think the scan simply missed them.
                */}
                {pending.some((p) => p.overwriteIds.length > 0 && !p.accepted) && (
                  <p className="border-l-2 border-orange-400 pl-3 text-[13px] leading-snug text-white">
                    {pending.filter((p) => p.overwriteIds.length > 0 && !p.accepted).length} reading
                    {pending.filter((p) => p.overwriteIds.length > 0 && !p.accepted).length === 1
                      ? ' is'
                      : 's are'}{' '}
                    switched off because {'they'} would replace values already in the schedule.
                    Switch one on if the sheet is the one to trust.
                  </p>
                )}

                {pending.map((p) => {
                  /*
                   * Keyed on SCOPE, not on how many rows it happens to hit.
                   * A board with one circuit still had "all >200" written once
                   * for the board, and labelling that "Circuit " with no number
                   * was both wrong and confusing.
                   */
                  const many = p.scope === 'all';
                  return (
                    <div
                      key={p.id}
                      className={cn(
                        'rounded-xl border p-3',
                        p.accepted
                          ? 'border-white/[0.14] bg-white/[0.04]'
                          : 'border-white/[0.08] bg-transparent opacity-55'
                      )}
                    >
                      <Crop url={scan.imageUrls[p.imageIndex] ?? scan.imageUrls[0]} box={p.box} />
                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-white">
                            {COLUMN_LABEL[p.column]}
                            {/*
                              🔴 Everything shown cleared the 0.75 floor, but a
                              0.76 read looks identical to a 0.99 one. The ones
                              it was least sure of are exactly the ones worth a
                              second look, so they say so.
                            */}
                            {p.confidence < 0.9 && (
                              <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-orange-300">
                                Less certain — check
                              </span>
                            )}
                          </p>
                          <input
                            value={p.value}
                            onChange={(e) => setValue(p.id, e.target.value)}
                            aria-label={`${COLUMN_LABEL[p.column]} value`}
                            className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-semibold text-white caret-elec-yellow transition-colors focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => toggle(p.id)}
                          aria-pressed={p.accepted}
                          aria-label={p.accepted ? 'Exclude this value' : 'Include this value'}
                          className={cn(
                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors touch-manipulation active:scale-[0.97]',
                            p.accepted
                              ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                              : 'border-white/[0.16] bg-white/[0.06] text-white'
                          )}
                        >
                          {p.accepted ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                        </button>
                      </div>

                      {/*
                       * 🔴 The expansion, stated. One mark writing to many rows
                       * is where a single misread becomes many wrong values.
                       */}
                      <p className="mt-2 text-[12px] leading-snug text-white">
                        {many
                          ? p.targetIds.length === 1
                            ? 'Written once for the whole board — this board has 1 circuit'
                            : `Written once for the whole board — goes into all ${p.targetIds.length} circuits`
                          : `Circuit ${p.circuitNumber}`}
                        {p.overwriteIds.length > 0 && (
                          <span className="text-orange-300">
                            {' '}
                            · would replace {p.overwriteIds.length} value
                            {p.overwriteIds.length === 1 ? '' : 's'} already typed in
                            {p.accepted ? '' : ' — switch on to allow that'}
                          </span>
                        )}
                      </p>
                    </div>
                  );
                })}

                {problems.length > 0 && (
                  <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3.5">
                    <p className="flex items-center gap-2 text-[13px] font-semibold text-orange-300">
                      <TriangleAlert className="h-4 w-4" />
                      {problems.length} value{problems.length === 1 ? '' : 's'} to look at
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-white">
                      A scanned value that fails a check is more often a misread than a real
                      failure. Worth comparing against the photo before you add it.
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {problems.slice(0, 8).map((pr, i) => (
                        <li key={i} className="text-[12px] leading-snug text-white">
                          <span className="font-semibold">Circuit {pr.circuit}</span> — {pr.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {scan && (
            <div className="border-t border-white/[0.08] px-4 py-3">
              <div className="mx-auto flex max-w-2xl gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="h-12 flex-1 rounded-xl border border-white/[0.16] bg-white/[0.06] text-[14px] font-semibold text-white touch-manipulation active:scale-[0.98]"
                >
                  Rescan
                </button>
                <button
                  type="button"
                  onClick={commit}
                  disabled={!accepted.length}
                  className="h-12 flex-[2] rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation active:scale-[0.98] disabled:opacity-40"
                >
                  Add {cellsWritten} value{cellsWritten === 1 ? '' : 's'}
                </button>
              </div>
            </div>
          )}

          {/* 🔴 No `capture` — the sheet is often photographed earlier, or scanned. */}
          {/* 🔴 `capture` on the camera input ONLY — on the library one it
              removes access to photos already on the device (iOS). */}
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handlePick} className="hidden" />
          <input ref={libraryRef} type="file" accept="image/*" multiple onChange={handlePick} className="hidden" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
