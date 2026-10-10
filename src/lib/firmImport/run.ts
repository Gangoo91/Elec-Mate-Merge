/**
 * ELE-2067 — sending normalised records to the database in chunks, with
 * progress. The dry run calls the same function with p_dry_run, which does
 * the import for real and rolls it back, so the preview is exact per chunk.
 */
import { supabase } from '@/integrations/supabase/client';
import type {
  ChunkResult,
  ImportKind,
  KindSummary,
  MappedFile,
  NormalRow,
  SourceSystem,
} from './types';
import { KIND_ORDER } from './types';
import { dateSamples, detectDateOrder, normaliseFile, type DateOrder } from './normalise';

export type Payload = Partial<Record<ImportKind, NormalRow[]>>;

const CHUNK: Record<ImportKind, number> = {
  customers: 200,
  sites: 200,
  staff: 100,
  assets: 200,
  price_book: 250,
  jobs: 80,
  quotes: 40,
  invoices: 40,
};

export function chooseDateOrder(files: MappedFile[], fallback: DateOrder): DateOrder {
  const samples = files.flatMap((f) => (f.kind ? dateSamples(f.file, f.kind, f.map) : []));
  return detectDateOrder(samples, fallback);
}

/** Per invoices file: what its rows mean when the file says nothing about payment. */
export type InvoiceStatusAnswers = Record<string, 'paid' | 'unpaid'>;

export function buildPayload(
  files: MappedFile[],
  dateOrder: DateOrder,
  invoiceStatus: InvoiceStatusAnswers = {}
): Payload {
  const out: Payload = {};
  for (const f of files) {
    if (!f.kind) continue;
    const rows = normaliseFile(f.file, f.kind, f.map, {
      dateOrder,
      invoiceStatus: invoiceStatus[f.file.id],
    });
    out[f.kind] = [...(out[f.kind] ?? []), ...rows];
  }
  return out;
}

export function payloadTotal(p: Payload): number {
  return KIND_ORDER.reduce((s, k) => s + (p[k]?.length ?? 0), 0);
}

type Progress = (done: number, total: number, kind: ImportKind) => void;

async function callChunk(
  firm: string,
  source: SourceSystem,
  batch: string | null,
  kind: ImportKind,
  rows: NormalRow[],
  dryRun: boolean
): Promise<ChunkResult> {
  const { data, error } = await supabase.rpc(
    'import_firm_rows' as never,
    {
      p_firm: firm,
      p_source: source,
      p_batch: batch,
      p_kind: kind,
      p_rows: rows,
      p_dry_run: dryRun,
    } as never
  );
  if (error) throw new Error(error.message);
  return data as unknown as ChunkResult;
}

async function runAll(
  firm: string,
  source: SourceSystem,
  batch: string | null,
  payload: Payload,
  dryRun: boolean,
  onProgress?: Progress,
  shouldStop?: () => boolean
): Promise<KindSummary[]> {
  const total = payloadTotal(payload);
  let done = 0;
  const out: KindSummary[] = [];
  // A dry run rolls each chunk back, so a site that points at a customer in
  // the customers file (by its ID) finds nobody. That customer will be there
  // on the real run, so count the site as coming across.
  const customerRefs = new Set(
    (payload.customers ?? []).map((r) => r.ref).filter((r): r is string => typeof r === 'string')
  );
  const willHaveCustomer = (r: NormalRow | undefined) =>
    dryRun && typeof r?.customer_ref === 'string' && customerRefs.has(r.customer_ref);
  // New customers made by sites, jobs, quotes and invoices, counted once each.
  // A dry run rolls every chunk back, so the same customer comes up as new in
  // each chunk, and a customer from the customers file comes up as new too.
  const newCustomerKeys = new Set<string>();
  for (const kind of KIND_ORDER) {
    const rows = payload[kind];
    if (!rows?.length) continue;
    const sum: KindSummary = {
      kind,
      total: rows.length,
      created: 0,
      matched: 0,
      skipped: 0,
      newCustomers: 0,
      notes: [],
    };
    // A row whose reference came earlier in the same files is a repeat in
    // the export, not something brought in before: say so.
    const firstAt = new Map<string, number>();
    rows.forEach((r, n) => {
      const ref = typeof r.ref === 'string' ? r.ref : null;
      if (ref && !firstAt.has(ref)) firstAt.set(ref, n);
    });
    for (let i = 0; i < rows.length; i += CHUNK[kind]) {
      if (shouldStop?.()) break;
      const chunk = rows.slice(i, i + CHUNK[kind]);
      const res = await callChunk(firm, source, batch, kind, chunk, dryRun);
      sum.created += res.created;
      sum.matched += res.matched;
      sum.skipped += res.skipped;
      for (const r of res.results) {
        if (r.nc && !(dryRun && customerRefs.has(r.nc)) && !newCustomerKeys.has(r.nc)) {
          newCustomerKeys.add(r.nc);
          sum.newCustomers += 1;
        }
        if (
          kind === 'sites' &&
          r.action === 'skipped' &&
          r.reason === 'No customer to put it under' &&
          willHaveCustomer(chunk[r.i])
        ) {
          sum.skipped -= 1;
          sum.created += 1;
          continue;
        }
        if (r.action !== 'created' && r.reason && sum.notes.length < 40) {
          const ref = chunk[r.i]?.ref;
          const repeat =
            r.reason === 'Already imported' &&
            typeof ref === 'string' &&
            (firstAt.get(ref) ?? i + r.i) < i + r.i;
          sum.notes.push({
            row: i + r.i + 2,
            action: r.action,
            reason: repeat ? 'In your file twice' : r.reason,
          });
        }
      }
      done += chunk.length;
      onProgress?.(done, total, kind);
    }
    out.push(sum);
  }
  return out;
}

export function dryRunImport(
  firm: string,
  source: SourceSystem,
  payload: Payload,
  onProgress?: Progress
) {
  return runAll(firm, source, null, payload, true, onProgress);
}

export async function runImport(
  firm: string,
  source: SourceSystem,
  fileNames: string[],
  payload: Payload,
  onProgress?: Progress,
  shouldStop?: () => boolean
): Promise<{ batchId: string; summary: KindSummary[] }> {
  const { data: batchId, error } = await supabase.rpc(
    'start_firm_import' as never,
    {
      p_firm: firm,
      p_source: source,
      p_file_names: fileNames,
    } as never
  );
  if (error || !batchId) throw new Error(error?.message ?? 'Could not start the import.');
  const id = batchId as unknown as string;
  try {
    const summary = await runAll(firm, source, id, payload, false, onProgress, shouldStop);
    await supabase.rpc('finish_firm_import' as never, { p_batch: id, p_failed: false } as never);
    return { batchId: id, summary };
  } catch (e) {
    // Leave what got in recorded against the batch so it can still be undone.
    await supabase.rpc('finish_firm_import' as never, { p_batch: id, p_failed: true } as never);
    throw Object.assign(e instanceof Error ? e : new Error(String(e)), { batchId: id });
  }
}

export interface UndoResult {
  deleted: number;
  kept: number;
  keptRows: { kind: ImportKind; id: string; reason: string }[];
}

export async function undoImport(
  batchId: string,
  onProgress?: (deleted: number, remaining: number) => void
): Promise<UndoResult> {
  let deleted = 0;
  let kept = 0;
  const keptRows: UndoResult['keptRows'] = [];
  for (let guard = 0; guard < 500; guard++) {
    const { data, error } = await supabase.rpc(
      'undo_firm_import' as never,
      { p_batch: batchId, p_limit: 250 } as never
    );
    if (error) throw new Error(error.message);
    const r = data as unknown as {
      deleted: number;
      kept: number;
      remaining: number;
      kept_rows?: UndoResult['keptRows'];
    };
    deleted += r.deleted;
    kept += r.kept;
    keptRows.push(...(r.kept_rows ?? []));
    onProgress?.(deleted, r.remaining);
    if (r.remaining === 0) break;
  }
  return { deleted, kept, keptRows };
}
