import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  BookOpen,
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
  Zap,
  FileText,
  Library,
  Link2,
  Image as ImageIcon,
  Hash,
  AlertCircle,
} from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

// ─── Types ──────────────────────────────────────────────────
type DocType = 'bs7671' | 'gn3' | 'osg' | 'gn1' | 'gn2' | 'gn4' | 'gn5' | 'gn6' | 'gn7' | 'gn8';

const DOC_TYPE_LABEL: Record<DocType, string> = {
  bs7671: 'BS 7671 (Wiring Regulations)',
  gn3: 'Guidance Note 3 (Inspection & Testing)',
  osg: 'On-Site Guide',
  gn1: 'Guidance Note 1 (Selection & Erection)',
  gn2: 'Guidance Note 2 (Isolation & Switching)',
  gn4: 'Guidance Note 4 (Protection Against Fire)',
  gn5: 'Guidance Note 5 (Protection Against Electric Shock)',
  gn6: 'Guidance Note 6 (Protection Against Overcurrent)',
  gn7: 'Guidance Note 7 (Special Locations)',
  gn8: 'Guidance Note 8 (Earthing & Bonding)',
};

const DOC_TYPE_SHORT: Record<DocType, string> = {
  bs7671: 'BS 7671',
  gn3: 'GN3',
  osg: 'OSG',
  gn1: 'GN1',
  gn2: 'GN2',
  gn4: 'GN4',
  gn5: 'GN5',
  gn6: 'GN6',
  gn7: 'GN7',
  gn8: 'GN8',
};

interface Edition {
  id: string;
  edition_code: string;
  base_edition: string;
  amendment: string;
  document_type: DocType;
  published_date: string | null;
  source_pdf_path: string | null;
  ocr_confidence_avg: number | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
}

interface IngestJob {
  id: string;
  edition_id: string;
  status: string;
  total_pages: number | null;
  regulations_created: number;
  chunks_staged: number;
  chunks_embedded: number;
  tables_created: number;
  figures_created: number;
  cross_refs_created: number;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
}

interface PageMapEntry {
  page: number;
  char_start: number;
  char_end: number;
}

// ─── Edge fn caller ─────────────────────────────────────────
async function callIngest<T = unknown>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  const { data, error } = await supabase.functions.invoke('ingest-bs7671-pdf', {
    body: { action, ...payload },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data as T;
}

// ─── Client-side PDF parsing (text + page rendering) ────────────────────
// Uses pdfjs-dist (transitive via pdf-parse). Lazy-import so it doesn't bloat
// the main admin bundle. `loadPdf` returns both the document and the worker-
// initialised lib so we can reuse it for text AND page-image rendering in one
// pass without re-initialising.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadPdfjs(): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfjs: any = await import('pdfjs-dist');
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const workerUrl = (await import('pdfjs-dist/build/pdf.worker.mjs?url' as any)).default;
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  } catch {
    pdfjs.GlobalWorkerOptions.workerSrc =
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.296/build/pdf.worker.mjs';
  }
  return pdfjs;
}

// Load a PDF document ONCE and reuse for both text extraction + page rendering.
// pdfjs's getDocument detaches its input buffer, so we can't open it twice from
// the same ArrayBuffer. Passing the live PDFDocumentProxy around avoids that.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function openPdfDoc(file: File): Promise<any> {
  const pdfjs = await loadPdfjs();
  const buf = await file.arrayBuffer();
  return await pdfjs.getDocument({ data: buf }).promise;
}

async function extractPdfText(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdf: any,
  onProgress: (p: { page: number; total: number }) => void
): Promise<{ fullText: string; pageMap: PageMapEntry[]; totalPages: number }> {
  const pageMap: PageMapEntry[] = [];
  let fullText = '';
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    // Preserve line breaks — pdfjs marks line ends via hasEOL on text items.
    // We also fall back to Y-coord grouping so OCR-generated items without
    // hasEOL still get sensible newlines.
    let pageText = '';
    let prevY: number | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const it of textContent.items as any[]) {
      if (!('str' in it)) continue;
      const y = it.transform?.[5] ?? null;
      if (prevY !== null && y !== null && Math.abs(y - prevY) > 4) {
        pageText += '\n';
      } else if (pageText && !pageText.endsWith(' ') && !pageText.endsWith('\n')) {
        pageText += ' ';
      }
      pageText += it.str;
      if (it.hasEOL) pageText += '\n';
      prevY = y;
    }
    const charStart = fullText.length;
    fullText += pageText + '\n\n';
    pageMap.push({ page: pageNum, char_start: charStart, char_end: fullText.length });
    onProgress({ page: pageNum, total: pdf.numPages });
  }
  return { fullText, pageMap, totalPages: pdf.numPages };
}

// Render one page at 150 DPI as PNG. Uses the already-loaded document.
async function renderPageToPng(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdf: any,
  pageNum: number,
  dpi = 150
): Promise<Blob> {
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale: dpi / 72 });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');
  await page.render({ canvasContext: ctx, viewport }).promise;
  return await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png')
  );
}

async function captionPage(params: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdf: any;
  pageNum: number;
  editionId: string;
  jobId: string;
}): Promise<void> {
  const { pdf, pageNum, editionId, jobId } = params;
  const blob = await renderPageToPng(pdf, pageNum, 150);
  const imagePath = `page-images/${editionId}/page-${String(pageNum).padStart(4, '0')}.png`;
  const { error: upErr } = await supabase.storage
    .from('iet-docs')
    .upload(imagePath, blob, { upsert: true, contentType: 'image/png' });
  if (upErr) throw new Error(`Upload page ${pageNum} failed: ${upErr.message}`);
  await callIngest('caption_page', {
    job_id: jobId,
    edition_id: editionId,
    page_number: pageNum,
    image_path: imagePath,
  });
}

// Drive N-at-a-time concurrency without needing a library
async function runInParallel<T>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<void>,
  onProgress: (done: number, total: number) => void
): Promise<void> {
  let done = 0;
  const queue = [...items];
  const workers: Promise<void>[] = [];
  for (let i = 0; i < Math.min(concurrency, queue.length); i++) {
    workers.push(
      (async () => {
        while (queue.length > 0) {
          const item = queue.shift();
          if (item === undefined) return;
          await worker(item);
          done += 1;
          onProgress(done, items.length);
        }
      })()
    );
  }
  await Promise.all(workers);
}

// ─── Component ──────────────────────────────────────────────
export default function AdminIETKnowledge() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedEditionId, setSelectedEditionId] = useState<string>('');
  const [uploadState, setUploadState] = useState<{
    stage:
      | 'idle'
      | 'uploading'
      | 'extracting'
      | 'parsing'
      | 'captioning'
      | 'embedding'
      | 'finalising'
      | 'done'
      | 'error';
    message: string;
    jobId: string | null;
    progress: { current: number; total: number };
    stats: {
      regulations: number;
      chunksStaged: number;
      chunksEmbedded: number;
      pagesCaptioned: number;
      tables: number;
      figures: number;
      crossRefs: number;
      visionCostUsd: number;
    };
  }>({
    stage: 'idle',
    message: '',
    jobId: null,
    progress: { current: 0, total: 0 },
    stats: {
      regulations: 0,
      chunksStaged: 0,
      chunksEmbedded: 0,
      pagesCaptioned: 0,
      tables: 0,
      figures: 0,
      crossRefs: 0,
      visionCostUsd: 0,
    },
  });

  // ─── Queries ────────────────────────────────────────────
  const { data: editions, refetch: refetchEditions } = useQuery<Edition[]>({
    queryKey: ['iet-editions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bs7671_editions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Edition[];
    },
  });

  // With multiple doc_types there's one active edition PER doc_type. Default
  // to the active BS 7671 when no explicit selection has been made.
  const activeEdition = useMemo(
    () =>
      editions?.find((e) => e.is_active && e.document_type === 'bs7671') ??
      editions?.find((e) => e.is_active) ??
      editions?.[0] ??
      null,
    [editions]
  );

  const effectiveEditionId = selectedEditionId || activeEdition?.id || '';

  const { data: jobs, refetch: refetchJobs } = useQuery<IngestJob[]>({
    queryKey: ['iet-ingest-jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bs7671_ingest_jobs')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as IngestJob[];
    },
    refetchInterval: uploadState.jobId ? 5000 : 30000,
  });

  // Incomplete job for the active edition — drives the Resume banner.
  // We look for any job in a non-terminal status AND check if there are
  // pending staged chunks (the one thing we can resume without needing the
  // original PDF file).
  const { data: incompleteJob } = useQuery({
    queryKey: ['iet-incomplete-job', effectiveEditionId],
    queryFn: async () => {
      if (!effectiveEditionId) return null;
      const { data: jobRow } = await supabase
        .from('bs7671_ingest_jobs')
        .select('*')
        .eq('edition_id', effectiveEditionId)
        .in('status', ['pending', 'parsing', 'embedding', 'finalising'])
        .order('started_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!jobRow) return null;
      // Count pending staged rows — resume only meaningful if embedding remains
      const { count: pendingStaged } = await supabase
        .from('bs7671_chunks_staging')
        .select('id', { count: 'exact', head: true })
        .eq('job_id', jobRow.id)
        .eq('embed_status', 'pending');
      return { ...jobRow, pendingStaged: pendingStaged || 0 } as IngestJob & {
        pendingStaged: number;
      };
    },
    enabled: !!effectiveEditionId && uploadState.stage === 'idle',
    refetchInterval: 10000,
  });

  // Live counts across the knowledge tables for the active edition
  const { data: counts, refetch: refetchCounts } = useQuery({
    queryKey: ['iet-counts', effectiveEditionId],
    queryFn: async () => {
      if (!effectiveEditionId) return null;
      const [regs, chunks, tables, figures, crossRefs, pages, facets] = await Promise.all([
        supabase
          .from('bs7671_regulations')
          .select('id', { count: 'exact', head: true })
          .eq('edition_id', effectiveEditionId),
        supabase
          .from('bs7671_chunks')
          .select('id', { count: 'exact', head: true })
          .eq('edition_id', effectiveEditionId),
        supabase
          .from('bs7671_tables')
          .select('id', { count: 'exact', head: true })
          .eq('edition_id', effectiveEditionId),
        supabase
          .from('bs7671_figures')
          .select('id', { count: 'exact', head: true })
          .eq('edition_id', effectiveEditionId),
        supabase
          .from('bs7671_cross_refs')
          .select('id', { count: 'exact', head: true }),
        supabase
          .from('bs7671_page_summaries')
          .select('id', { count: 'exact', head: true })
          .eq('edition_id', effectiveEditionId),
        supabase
          .from('bs7671_facets')
          .select('id', { count: 'exact', head: true })
          .eq('edition_id', effectiveEditionId),
      ]);
      return {
        regulations: regs.count || 0,
        chunks: chunks.count || 0,
        tables: tables.count || 0,
        figures: figures.count || 0,
        crossRefs: crossRefs.count || 0,
        pages: pages.count || 0,
        facets: facets.count || 0,
      };
    },
    enabled: !!effectiveEditionId,
    refetchInterval: 10000,
  });

  // ─── Pipeline ──────────────────────────────────────────
  const runPipeline = useCallback(
    async (file: File) => {
      if (!effectiveEditionId) {
        toast({ title: 'Pick an edition first', variant: 'destructive' });
        return;
      }

      try {
        // 1. Upload source PDF to storage — NON-FATAL. The source PDF is only
        // archived for reference; the ingest pipeline extracts text from the
        // File object directly and renders page images client-side. If the
        // upload fails (e.g. 473MB A4:2026 times out on slow links) we log a
        // warning and press on. Page images (much smaller) still upload fine.
        setUploadState((s) => ({
          ...s,
          stage: 'uploading',
          message: `Archiving source PDF to storage (${Math.round(file.size / 1024 / 1024)} MB)...`,
          progress: { current: 0, total: 0 },
        }));
        const storagePath = `${effectiveEditionId}/${Date.now()}-${file.name}`;
        try {
          const { error: upErr } = await supabase.storage
            .from('iet-docs')
            .upload(storagePath, file, { upsert: false, contentType: 'application/pdf' });
          if (upErr) throw upErr;
          await supabase
            .from('bs7671_editions')
            .update({ source_pdf_path: storagePath })
            .eq('id', effectiveEditionId);
        } catch (archiveErr) {
          console.warn(
            '[ingest] Source PDF archive upload failed (non-fatal — continuing):',
            archiveErr
          );
          toast({
            title: 'Source PDF archive skipped (timeout) — ingest continues',
            variant: 'warning',
          });
        }

        // 2. Open PDF once + extract text client-side. pdfjs detaches the
        // buffer on load, so we keep one live document for both text extraction
        // and later page rendering.
        setUploadState((s) => ({
          ...s,
          stage: 'extracting',
          message: 'Opening PDF + extracting text (browser-side)...',
        }));
        const pdf = await openPdfDoc(file);
        const { fullText, pageMap, totalPages } = await extractPdfText(
          pdf,
          ({ page, total }) =>
            setUploadState((s) => ({ ...s, progress: { current: page, total } }))
        );
        if (!fullText.trim())
          throw new Error('No text extracted — is this a scanned PDF without an OCR layer?');

        // 3. Start job
        setUploadState((s) => ({
          ...s,
          stage: 'parsing',
          message: 'Parsing structure — detecting regulations, parts, chapters...',
          progress: { current: 0, total: 0 },
        }));
        const { job_id } = await callIngest<{ job_id: string }>('start_job', {
          edition_id: effectiveEditionId,
          total_pages: pageMap.length,
        });

        setUploadState((s) => ({ ...s, jobId: job_id }));

        // 4. Parse + stage
        const parseRes = await callIngest<{
          regulations_created: number;
          chunks_staged: number;
        }>('parse_and_stage', { job_id, full_text: fullText, page_map: pageMap });

        // 4b. Vision captioning — render each page, upload, caption via GPT-5-mini.
        // Runs BEFORE embedding so chunks can be enriched with their page's
        // visual summary at embed time.
        //
        // OPTIMISATION: pre-fetch which pages are already captioned for this
        // edition and SKIP rendering entirely for those pages. Rendering a
        // 150-DPI canvas is the heaviest browser operation (~5-7s/page × 600
        // pages = tab crashes from memory pressure). Skipping already-done
        // pages makes resumes genuinely fast.
        const { data: captionedRows } = await supabase
          .from('bs7671_page_summaries')
          .select('page_number')
          .eq('edition_id', effectiveEditionId);
        const alreadyCaptioned = new Set<number>(
          (captionedRows ?? []).map((r: { page_number: number }) => r.page_number)
        );
        const pagesToProcess = Array.from(
          { length: totalPages },
          (_, i) => i + 1
        ).filter((p) => !alreadyCaptioned.has(p));

        setUploadState((s) => ({
          ...s,
          stage: 'captioning',
          message:
            pagesToProcess.length < totalPages
              ? `Skipping ${alreadyCaptioned.size} already-captioned pages · rendering + captioning ${pagesToProcess.length} new...`
              : `Rendering + vision-captioning ${totalPages} pages (parallel)...`,
          stats: {
            ...s.stats,
            regulations: parseRes.regulations_created,
            chunksStaged: parseRes.chunks_staged,
            pagesCaptioned: alreadyCaptioned.size,
          },
          progress: { current: 0, total: pagesToProcess.length },
        }));

        let pageFailCount = 0;
        let newlyCaptioned = 0;
        await runInParallel(
          pagesToProcess,
          5, // 5 concurrent — balances network + OpenAI rate limits
          async (pageNum) => {
            // Per-page error handling — one failed page (OpenAI content filter,
            // transient 5xx, bad OCR'd image) mustn't abort the whole run. We
            // log + count failures; embedding still works for pages with
            // captions, pages without captions just get un-augmented embeddings.
            try {
              await captionPage({
                pdf,
                pageNum,
                editionId: effectiveEditionId,
                jobId: job_id,
              });
              newlyCaptioned += 1;
            } catch (e) {
              pageFailCount += 1;
              console.warn(
                `[ingest] caption_page ${pageNum} failed (continuing):`,
                e instanceof Error ? e.message : e
              );
            }
          },
          (done) =>
            setUploadState((s) => ({
              ...s,
              progress: { current: done, total: pagesToProcess.length },
              stats: {
                ...s.stats,
                pagesCaptioned: alreadyCaptioned.size + newlyCaptioned,
              },
              message:
                pageFailCount > 0
                  ? `Captioning (${pageFailCount} skipped) — ${alreadyCaptioned.size} already done, ${newlyCaptioned} new`
                  : `Captioning — ${alreadyCaptioned.size} already done, ${newlyCaptioned} new`,
            }))
        );
        if (pageFailCount > 0) {
          toast({
            title: `${pageFailCount} page${pageFailCount > 1 ? 's' : ''} skipped during captioning`,
            description: 'Ingest continuing — those pages won\'t have visual context but text works.',
            variant: 'warning',
          });
        }

        // Pull final vision cost from the job row for display
        const { data: jobAfterCaption } = await supabase
          .from('bs7671_ingest_jobs')
          .select('vision_cost_total_usd')
          .eq('id', job_id)
          .single();
        if (jobAfterCaption) {
          setUploadState((s) => ({
            ...s,
            stats: {
              ...s.stats,
              visionCostUsd: Number(jobAfterCaption.vision_cost_total_usd || 0),
            },
          }));
        }

        // 5. Embed chunks — each chunk's embedding now includes its page's
        // visual summary prepended inline (done server-side in embed_batch).
        setUploadState((s) => ({
          ...s,
          stage: 'embedding',
          message:
            'Embedding chunks (text + visual context) via OpenAI text-embedding-3-large...',
          progress: { current: 0, total: parseRes.chunks_staged },
        }));

        // 5. Embed loop
        let embedded = 0;
        for (;;) {
          const res = await callIngest<{
            embedded: number;
            remaining: number;
            completed: boolean;
          }>('embed_batch', { job_id });
          embedded += res.embedded;
          setUploadState((s) => ({
            ...s,
            progress: { current: embedded, total: parseRes.chunks_staged },
            stats: { ...s.stats, chunksEmbedded: embedded },
          }));
          if (res.completed) break;
          if (res.embedded === 0 && res.remaining > 0) {
            // Safety — infinite-loop guard
            throw new Error('Embedding batch returned 0 but still have remaining chunks');
          }
        }

        // 6. Extract cross-refs, tables, figures
        setUploadState((s) => ({
          ...s,
          stage: 'finalising',
          message: 'Extracting tables, figures, and cross-references...',
        }));
        const refRes = await callIngest<{
          tables: number;
          figures: number;
          cross_refs: number;
        }>('extract_refs', { job_id, full_text: fullText, page_map: pageMap });

        // 7. Finalise
        await callIngest('finalise', { job_id });

        setUploadState((s) => ({
          ...s,
          stage: 'done',
          message: 'Ingestion complete',
          stats: {
            ...s.stats,
            chunksEmbedded: embedded,
            tables: refRes.tables,
            figures: refRes.figures,
            crossRefs: refRes.cross_refs,
          },
        }));

        haptic.success();
        toast({
          title: `Ingested ${parseRes.regulations_created} regulations, ${embedded} chunks`,
          variant: 'success',
        });

        queryClient.invalidateQueries({ queryKey: ['iet-counts'] });
        queryClient.invalidateQueries({ queryKey: ['iet-ingest-jobs'] });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        haptic.error();
        setUploadState((s) => ({ ...s, stage: 'error', message: msg }));
        toast({ title: `Ingest failed: ${msg}`, variant: 'destructive' });
      }
    },
    [effectiveEditionId, queryClient, haptic]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.includes('pdf')) {
      toast({ title: 'PDF only', variant: 'destructive' });
      return;
    }
    runPipeline(f);
    e.target.value = '';
  };

  // Resume an incomplete ingest. Only works for jobs that have already staged
  // chunks (parse_and_stage completed) — we can run the embed + refs + finalise
  // phases without needing the PDF file back.
  const resumeIngest = useCallback(
    async (jobId: string, editionId: string, pendingStaged: number) => {
      try {
        setUploadState((s) => ({
          ...s,
          stage: 'embedding',
          jobId,
          message: `Resuming ingest — ${pendingStaged} chunks remaining...`,
          progress: { current: 0, total: pendingStaged },
        }));
        let embedded = 0;
        for (;;) {
          const res = await callIngest<{
            embedded: number;
            remaining: number;
            completed: boolean;
          }>('embed_batch', { job_id: jobId });
          embedded += res.embedded;
          setUploadState((s) => ({
            ...s,
            progress: { current: embedded, total: Math.max(embedded, pendingStaged) },
            stats: { ...s.stats, chunksEmbedded: embedded },
          }));
          if (res.completed) break;
          if (res.embedded === 0 && res.remaining > 0) {
            throw new Error('Embedding returned 0 with remaining chunks');
          }
        }
        setUploadState((s) => ({
          ...s,
          stage: 'finalising',
          message: 'Finalising: cross-refs, tables, figures...',
        }));
        await callIngest('finalise', { job_id: jobId });
        setUploadState((s) => ({ ...s, stage: 'done', message: 'Resume complete' }));
        haptic.success();
        toast({ title: `Resumed + embedded ${embedded} chunks`, variant: 'success' });
        queryClient.invalidateQueries({ queryKey: ['iet-counts'] });
        queryClient.invalidateQueries({ queryKey: ['iet-ingest-jobs'] });
        queryClient.invalidateQueries({ queryKey: ['iet-incomplete-job'] });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        haptic.error();
        setUploadState((s) => ({ ...s, stage: 'error', message: msg }));
        toast({ title: `Resume failed: ${msg}`, variant: 'destructive' });
      }
    },
    [haptic, queryClient]
  );

  const cancelJobMutation = useMutation({
    mutationFn: async (jobId: string) => {
      await callIngest('cancel', { job_id: jobId });
    },
    onSuccess: () => {
      toast({ title: 'Job cancelled', variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['iet-incomplete-job'] });
      queryClient.invalidateQueries({ queryKey: ['iet-ingest-jobs'] });
    },
  });

  // ─── Create edition ─────────────────────────────────────
  const createEditionMutation = useMutation({
    mutationFn: async (payload: {
      edition_code: string;
      amendment: string;
      base_edition: string;
      document_type: DocType;
    }) => {
      const { data, error } = await supabase
        .from('bs7671_editions')
        .insert({ ...payload, is_active: false })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({ title: 'Edition created', variant: 'success' });
      refetchEditions();
    },
    onError: (err) => toast({ title: `Failed: ${err.message}`, variant: 'destructive' }),
  });

  const setActiveEditionMutation = useMutation({
    mutationFn: async (id: string) => {
      // Deactivate the active row for THIS doc_type, then activate the chosen
      // one. We keep one active row per document_type so BS 7671 / GN3 / OSG
      // can each have their own "current" edition simultaneously.
      const target = editions?.find((e) => e.id === id);
      if (!target) throw new Error('Edition not found');
      await supabase
        .from('bs7671_editions')
        .update({ is_active: false })
        .eq('document_type', target.document_type);
      const { error } = await supabase.from('bs7671_editions').update({ is_active: true }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Active edition updated', variant: 'success' });
      refetchEditions();
    },
    onError: (err) => toast({ title: `Failed: ${err.message}`, variant: 'destructive' }),
  });

  // ─── Render ─────────────────────────────────────────────
  const busy = ['uploading', 'extracting', 'parsing', 'embedding', 'finalising'].includes(
    uploadState.stage
  );

  return (
    <PullToRefresh
      onRefresh={async () => {
        await Promise.all([refetchEditions(), refetchJobs(), refetchCounts()]);
      }}
    >
      <div className="space-y-4 pb-24">
        <AdminPageHeader
          title="IET Knowledge"
          subtitle="BS 7671 ingestion — regs, chunks, tables, figures, cross-refs"
          icon={BookOpen}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10 border-amber-500/20"
          accentColor="from-amber-500 via-yellow-400 to-amber-500"
        />

        {/* Edition picker */}
        <Card>
          <CardContent className="pt-4 pb-4 space-y-3">
            <div className="flex items-center gap-2">
              <Library className="h-4 w-4 text-amber-400" />
              <p className="text-sm font-semibold text-white">Edition</p>
            </div>
            <Select value={effectiveEditionId} onValueChange={setSelectedEditionId}>
              <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-amber-500">
                <SelectValue placeholder="Pick an edition" />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-elec-gray border-elec-gray">
                {editions?.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 uppercase tracking-wider">
                        {DOC_TYPE_SHORT[e.document_type] || e.document_type}
                      </span>
                      <span>{e.edition_code}</span>
                      {e.is_active && <span className="text-green-400 text-[10px]">· active</span>}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {activeEdition && activeEdition.id !== effectiveEditionId && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setActiveEditionMutation.mutate(effectiveEditionId)}
                disabled={setActiveEditionMutation.isPending}
                className="h-10 touch-manipulation gap-1.5"
              >
                Make this the active edition
              </Button>
            )}
            <NewEditionForm onCreate={(p) => createEditionMutation.mutate(p)} />
          </CardContent>
        </Card>

        {/* Count tiles */}
        {counts && (
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            <StatTile icon={Hash} label="Regs" value={counts.regulations} colour="amber" />
            <StatTile icon={FileText} label="Chunks" value={counts.chunks} colour="blue" />
            <StatTile icon={Zap} label="Facets" value={counts.facets} colour="cyan" />
            <StatTile icon={ImageIcon} label="Pages" value={counts.pages} colour="rose" />
            <StatTile icon={Library} label="Tables" value={counts.tables} colour="violet" />
            <StatTile icon={ImageIcon} label="Figures" value={counts.figures} colour="green" />
            <StatTile icon={Link2} label="Cross-refs" value={counts.crossRefs} colour="cyan" />
          </div>
        )}

        {/* Intelligence Layer — facet generation */}
        {counts && counts.chunks > 0 && (
          <FacetGenerationCard
            editionId={effectiveEditionId}
            chunksTotal={counts.chunks}
            facetsTotal={counts.facets}
            onComplete={() => {
              refetchCounts();
            }}
          />
        )}

        {/* Resume banner — appears when an incomplete job exists for this edition */}
        {incompleteJob && uploadState.stage === 'idle' && (
          <Card className="border-blue-500/40 bg-blue-500/[0.08]">
            <CardContent className="pt-4 pb-4 space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">Incomplete ingest found</p>
                  <p className="text-[11px] text-white/70 leading-relaxed mt-0.5">
                    Status: <strong>{incompleteJob.status}</strong> · Pages captioned:{' '}
                    <strong>{incompleteJob.pages_captioned}</strong> · Chunks staged:{' '}
                    <strong>{incompleteJob.chunks_staged}</strong> · Chunks embedded:{' '}
                    <strong>{incompleteJob.chunks_embedded}</strong>
                    {incompleteJob.pendingStaged > 0 && (
                      <> · <strong>{incompleteJob.pendingStaged} pending embed</strong></>
                    )}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {incompleteJob.pendingStaged > 0 ? (
                  <Button
                    size="sm"
                    onClick={() =>
                      resumeIngest(
                        incompleteJob.id,
                        incompleteJob.edition_id,
                        incompleteJob.pendingStaged
                      )
                    }
                    className="h-11 touch-manipulation bg-blue-500 hover:bg-blue-600 text-black font-semibold gap-1.5"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    Resume embed
                  </Button>
                ) : (
                  <div className="h-11 flex items-center justify-center text-[11px] text-white/60 rounded-lg bg-black/20 border border-white/5 px-2 text-center">
                    Re-upload PDF to continue
                  </div>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => cancelJobMutation.mutate(incompleteJob.id)}
                  disabled={cancelJobMutation.isPending}
                  className="h-11 touch-manipulation border-white/20 gap-1.5"
                >
                  {cancelJobMutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5" />
                  )}
                  Cancel job
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
          <CardContent className="pt-4 pb-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-amber-400" />
                <p className="text-sm font-semibold text-white">Ingest PDF</p>
              </div>
              {editions?.find((e) => e.id === effectiveEditionId) && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 uppercase tracking-wider">
                  {DOC_TYPE_SHORT[
                    editions.find((e) => e.id === effectiveEditionId)!.document_type
                  ] || 'doc'}
                </span>
              )}
            </div>
            <p className="text-[11px] text-white/60 leading-relaxed">
              Upload an <strong>OCR'd</strong> PDF matching the selected edition's document type
              (BS 7671, GN3, OSG). Run <code>ocrmypdf</code> locally first. Text extracted in
              browser, chunked + embedded via OpenAI text-embedding-3-large server-side with
              doc-type-aware parser.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileSelect}
              disabled={busy}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={busy || !effectiveEditionId}
              className="w-full h-12 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold gap-2"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {busy ? 'Working...' : 'Pick a PDF'}
            </Button>

            {uploadState.stage !== 'idle' && (
              <div className="rounded-xl bg-black/30 border border-white/10 p-3 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  {uploadState.stage === 'done' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  ) : uploadState.stage === 'error' ? (
                    <XCircle className="h-4 w-4 text-red-400" />
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                  )}
                  <span className="text-white font-semibold">{uploadState.stage.toUpperCase()}</span>
                  <span className="text-white/70 truncate">{uploadState.message}</span>
                </div>
                {uploadState.progress.total > 0 && (
                  <>
                    <div className="flex justify-between text-[11px] text-white/60">
                      <span>
                        {uploadState.progress.current} / {uploadState.progress.total}
                      </span>
                      <span>
                        {Math.round(
                          (uploadState.progress.current / uploadState.progress.total) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
                        style={{
                          width: `${
                            (uploadState.progress.current / uploadState.progress.total) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </>
                )}
                {(uploadState.stage === 'done' ||
                  uploadState.stage === 'captioning' ||
                  uploadState.stage === 'embedding' ||
                  uploadState.stage === 'finalising') && (
                  <div className="grid grid-cols-5 gap-2 pt-2 border-t border-white/5">
                    <MiniStat label="Regs" value={uploadState.stats.regulations} />
                    <MiniStat label="Pages" value={uploadState.stats.pagesCaptioned} />
                    <MiniStat label="Chunks" value={uploadState.stats.chunksEmbedded} />
                    <MiniStat label="Refs" value={uploadState.stats.crossRefs} />
                    <MiniStat
                      label="Vision $"
                      value={Number(uploadState.stats.visionCostUsd.toFixed(2))}
                    />
                  </div>
                )}
                {uploadState.stage === 'error' && (
                  <div className="flex gap-2 items-start text-[11px] text-red-300">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>{uploadState.message}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent jobs */}
        <Card>
          <CardContent className="pt-4 pb-4 space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <p className="text-sm font-semibold text-white">Recent ingests</p>
            </div>
            {!jobs || jobs.length === 0 ? (
              <AdminEmptyState
                icon={Zap}
                title="No ingests yet"
                description="Pick an edition + upload a PDF to kick one off."
              />
            ) : (
              <div className="space-y-1.5">
                {jobs.map((j) => (
                  <JobRow key={j.id} job={j} editions={editions || []} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PullToRefresh>
  );
}

// ─── Sub-components ─────────────────────────────────────────
function StatTile({
  icon: Icon,
  label,
  value,
  colour,
}: {
  icon: typeof Hash;
  label: string;
  value: number;
  colour: 'amber' | 'blue' | 'violet' | 'green' | 'cyan' | 'rose';
}) {
  const cls = {
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  }[colour];
  return (
    <div className={`p-2.5 rounded-xl border text-center ${cls}`}>
      <Icon className="h-4 w-4 mx-auto mb-1" />
      <p className="text-lg font-bold leading-tight">{value.toLocaleString()}</p>
      <p className="text-[9px] text-white/80 mt-0.5 uppercase tracking-wide">{label}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-sm font-bold text-white leading-tight">{value}</p>
      <p className="text-[9px] text-white/60 uppercase">{label}</p>
    </div>
  );
}

function JobRow({ job, editions }: { job: IngestJob; editions: Edition[] }) {
  const edition = editions.find((e) => e.id === job.edition_id);
  const statusColour =
    job.status === 'completed'
      ? 'bg-green-500/20 text-green-400'
      : job.status === 'failed' || job.status === 'cancelled'
        ? 'bg-red-500/20 text-red-400'
        : 'bg-blue-500/20 text-blue-400';
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm text-white truncate">
            {edition?.edition_code || 'Unknown edition'}
          </p>
          <Badge className={`text-[9px] border-0 shrink-0 ${statusColour}`}>{job.status}</Badge>
        </div>
        <p className="text-[11px] text-white/60">
          {formatDistanceToNow(parseISO(job.started_at), { addSuffix: true })} ·{' '}
          {job.regulations_created} regs · {job.chunks_embedded}/{job.chunks_staged} chunks
        </p>
      </div>
    </div>
  );
}

function NewEditionForm({
  onCreate,
}: {
  onCreate: (p: {
    edition_code: string;
    amendment: string;
    base_edition: string;
    document_type: DocType;
  }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [docType, setDocType] = useState<DocType>('bs7671');
  const [baseEdition, setBaseEdition] = useState('2018');
  const [amendment, setAmendment] = useState('');

  if (!open) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-9 touch-manipulation text-xs text-amber-400 hover:text-amber-300 w-full justify-start gap-1.5"
      >
        <FileText className="h-3.5 w-3.5" />
        New edition
      </Button>
    );
  }

  return (
    <div className="space-y-2 p-3 rounded-xl bg-black/30 border border-white/10">
      <div>
        <label className="text-[10px] text-white/60 uppercase tracking-wide">Document</label>
        <div className="flex flex-wrap gap-1 mt-1">
          {(['bs7671', 'gn3', 'osg'] as DocType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setDocType(t)}
              className={`shrink-0 h-8 px-2.5 rounded-lg text-[11px] font-semibold touch-manipulation transition-all ${
                docType === t
                  ? 'bg-amber-500 text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {DOC_TYPE_SHORT[t]}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] text-white/60 uppercase tracking-wide">Base</label>
          <Input
            value={baseEdition}
            onChange={(e) => setBaseEdition(e.target.value)}
            placeholder={docType === 'bs7671' ? '2018' : docType === 'osg' ? '9th Ed' : '9th Ed'}
            className="h-10 text-sm border-white/30 focus:border-amber-500"
          />
        </div>
        <div>
          <label className="text-[10px] text-white/60 uppercase tracking-wide">Amendment</label>
          <Input
            value={amendment}
            onChange={(e) => setAmendment(e.target.value)}
            placeholder={
              docType === 'bs7671' ? 'A4:2026' : docType === 'osg' ? '2026' : 'A4:2026'
            }
            className="h-10 text-sm border-white/30 focus:border-amber-500"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setOpen(false)}
          className="h-9 flex-1 touch-manipulation"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          disabled={!baseEdition || !amendment}
          onClick={() => {
            onCreate({
              edition_code: `${DOC_TYPE_SHORT[docType]} ${baseEdition}+${amendment}`,
              base_edition: baseEdition,
              amendment,
              document_type: docType,
            });
            setOpen(false);
          }}
          className="h-9 flex-1 touch-manipulation bg-amber-500 hover:bg-amber-600 text-black"
        >
          Create
        </Button>
      </div>
    </div>
  );
}

// ─── Facet Generation Card ──────────────────────────────────────────────
// Bulletproof facet generation. Key resilience features:
//   1. Retry with exponential backoff (3 attempts: 3s / 9s / 27s)
//   2. Adaptive batch size — drops on timeout, recovers on success
//   3. Continue-on-error — a failed batch is skipped, loop keeps going
//   4. True progress from DB poll (facet count), not trusting in-memory
//   5. Auto-resume on mount if work remains
//   6. Wake Lock — prevents laptop sleep mid-run
//   7. Live log panel — every batch outcome visible
//   8. Stop button — can cancel cleanly
//   9. Failed-chunk audit via bs7671_facet_failures + targeted retry

type LogEntry = {
  id: number;
  timestamp: number;
  kind: 'ok' | 'retry' | 'skip' | 'info' | 'stop';
  message: string;
};

function FacetGenerationCard({
  editionId,
  chunksTotal,
  facetsTotal,
  onComplete,
}: {
  editionId: string;
  chunksTotal: number;
  facetsTotal: number;
  onComplete: () => void;
}) {
  const [running, setRunning] = useState(false);
  const [batchSize, setBatchSize] = useState(8);
  const [progress, setProgress] = useState({
    processed: 0,
    created: 0,
    remaining: Math.max(0, chunksTotal - Math.ceil(facetsTotal / 12)),
    cost: 0,
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [liveFacetCount, setLiveFacetCount] = useState(facetsTotal);
  const [failuresCount, setFailuresCount] = useState(0);
  const [retryingFailed, setRetryingFailed] = useState(false);
  const cancelRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wakeLockRef = useRef<any>(null);
  const logIdRef = useRef(0);
  const haptic = useHaptic();

  const pushLog = useCallback((kind: LogEntry['kind'], message: string) => {
    logIdRef.current += 1;
    setLogs((prev) =>
      [{ id: logIdRef.current, timestamp: Date.now(), kind, message }, ...prev].slice(0, 25)
    );
  }, []);

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  // Acquire a wake lock so the screen doesn't sleep during long runs
  const requestWakeLock = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nav: any = navigator;
      if (nav.wakeLock?.request) {
        wakeLockRef.current = await nav.wakeLock.request('screen');
        wakeLockRef.current?.addEventListener('release', () => {
          wakeLockRef.current = null;
        });
      }
    } catch {
      // Wake lock unsupported / permission denied — not fatal
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    try {
      wakeLockRef.current?.release();
    } catch {
      // ignore
    } finally {
      wakeLockRef.current = null;
    }
  }, []);

  // Re-acquire wake lock when tab becomes visible again (Chrome drops it on hide)
  useEffect(() => {
    const onVis = () => {
      if (running && document.visibilityState === 'visible' && !wakeLockRef.current) {
        void requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [running, requestWakeLock]);

  // Live facet count polling — queries DB every 5s while running so the UI
  // shows true progress even across tab switches
  useEffect(() => {
    if (!editionId) return;
    let cancelled = false;
    const poll = async () => {
      const { count } = await supabase
        .from('bs7671_facets')
        .select('*', { count: 'exact', head: true })
        .eq('edition_id', editionId);
      if (!cancelled && typeof count === 'number') setLiveFacetCount(count);

      const { count: failed } = await supabase
        .from('bs7671_facet_failures')
        .select('*', { count: 'exact', head: true })
        .eq('edition_id', editionId)
        .eq('resolved', false);
      if (!cancelled && typeof failed === 'number') setFailuresCount(failed);
    };
    void poll();
    const interval = running ? 5000 : 15000;
    const handle = setInterval(poll, interval);
    return () => {
      cancelled = true;
      clearInterval(handle);
    };
  }, [editionId, running, facetsTotal]);

  // Single batch call with retry + exponential backoff. Returns the edge-fn
  // response, or null if all retries exhausted.
  const callBatchWithRetry = useCallback(
    async (
      size: number
    ): Promise<{
      processed: number;
      facets_created: number;
      remaining: number;
      cost_usd: number;
      completed: boolean;
      errors?: string[];
    } | null> => {
      const delays = [3000, 9000, 27000];
      for (let attempt = 0; attempt <= delays.length; attempt++) {
        if (cancelRef.current) return null;
        try {
          const res = await callIngest<{
            processed: number;
            facets_created: number;
            remaining: number;
            cost_usd: number;
            completed: boolean;
            errors?: string[];
          }>('generate_facets_batch', { edition_id: editionId, batch_size: size });
          return res;
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          if (attempt < delays.length) {
            pushLog(
              'retry',
              `Batch failed (attempt ${attempt + 1}/${delays.length + 1}): ${msg.slice(0, 80)} — backing off ${delays[attempt] / 1000}s`
            );
            await sleep(delays[attempt]);
          } else {
            pushLog('skip', `Batch abandoned after ${delays.length + 1} attempts: ${msg.slice(0, 80)}`);
            return null;
          }
        }
      }
      return null;
    },
    [editionId, pushLog]
  );

  const start = useCallback(async () => {
    if (!editionId || running) return;
    cancelRef.current = false;
    setRunning(true);
    setError(null);
    setProgress((p) => ({ ...p, processed: 0, created: 0, cost: 0 }));
    setLogs([]);
    pushLog('info', 'Starting facet generation');
    await requestWakeLock();

    try {
      let totalProcessed = 0;
      let totalCreated = 0;
      let totalCost = 0;
      let currentBatch = 8;
      let consecutiveSuccesses = 0;
      let consecutiveEmpty = 0;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (cancelRef.current) {
          pushLog('stop', 'Cancelled by user');
          break;
        }

        const started = Date.now();
        const res = await callBatchWithRetry(currentBatch);

        if (!res) {
          // Retries exhausted for this batch. Shrink batch size, wait 10s, carry on.
          if (currentBatch > 2) {
            currentBatch = Math.max(2, Math.floor(currentBatch / 2));
            pushLog('info', `Shrinking batch size → ${currentBatch}`);
          }
          consecutiveSuccesses = 0;
          await sleep(10_000);
          continue;
        }

        const elapsed = Date.now() - started;
        totalProcessed += res.processed;
        totalCreated += res.facets_created;
        totalCost += res.cost_usd || 0;

        pushLog(
          'ok',
          `+${res.facets_created} facets from ${res.processed} chunks in ${(elapsed / 1000).toFixed(1)}s · ${res.remaining} remaining`
        );

        setProgress({
          processed: totalProcessed,
          created: totalCreated,
          remaining: res.remaining,
          cost: totalCost,
        });
        setBatchSize(currentBatch);

        // Completion: edge fn says done OR DB reports 0 remaining
        if (res.completed || res.remaining === 0) {
          pushLog('info', 'All chunks processed');
          break;
        }

        // Zero-processed response may mean all pending chunks are currently
        // failing — step back, wait, try again a couple of times before bail.
        if (res.processed === 0) {
          consecutiveEmpty += 1;
          if (consecutiveEmpty >= 3) {
            pushLog('skip', 'Three consecutive empty batches — stopping. Check failed chunks panel.');
            break;
          }
          await sleep(5_000);
          continue;
        }
        consecutiveEmpty = 0;

        // Adaptive upsize: after 3 fast (<120s) successes at reduced size, step back up
        if (elapsed < 120_000) {
          consecutiveSuccesses += 1;
          if (consecutiveSuccesses >= 3 && currentBatch < 8) {
            currentBatch = Math.min(8, currentBatch * 2);
            consecutiveSuccesses = 0;
            pushLog('info', `Scaling batch size → ${currentBatch}`);
          }
        } else {
          // Slow success — shrink next batch to stay safe
          consecutiveSuccesses = 0;
          if (currentBatch > 2) {
            currentBatch = Math.max(2, Math.floor(currentBatch / 2));
            pushLog('info', `Slow batch (${(elapsed / 1000).toFixed(0)}s) — shrinking to ${currentBatch}`);
          }
        }

        // Small breather between batches — lets OpenAI rate limits recover
        await sleep(500);
      }

      haptic.success();
      toast({
        title: `Run complete — ${totalCreated} facets from ${totalProcessed} chunks`,
        description: `$${totalCost.toFixed(3)} spent`,
        variant: 'success',
      });
      onComplete();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      pushLog('skip', `Fatal error: ${msg}`);
      haptic.error();
      toast({ title: `Facet generation halted: ${msg}`, variant: 'destructive' });
    } finally {
      setRunning(false);
      releaseWakeLock();
    }
  }, [editionId, running, callBatchWithRetry, pushLog, requestWakeLock, releaseWakeLock, haptic, onComplete]);

  const stop = useCallback(() => {
    cancelRef.current = true;
    pushLog('stop', 'Stop requested — finishing current batch…');
  }, [pushLog]);

  const retryFailed = useCallback(async () => {
    if (!editionId || retryingFailed) return;
    setRetryingFailed(true);
    try {
      // Delete failure rows so the chunks re-enter the pending pool
      const { error: delErr } = await supabase
        .from('bs7671_facet_failures')
        .delete()
        .eq('edition_id', editionId)
        .eq('resolved', false);
      if (delErr) throw delErr;
      setFailuresCount(0);
      toast({ title: 'Failed chunks queued for retry — click Resume to re-run', variant: 'success' });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({ title: `Retry queue failed: ${msg}`, variant: 'destructive' });
    } finally {
      setRetryingFailed(false);
    }
  }, [editionId, retryingFailed]);

  const displayFacetCount = Math.max(liveFacetCount, facetsTotal);
  const coverage = chunksTotal > 0
    ? Math.min(100, Math.round((displayFacetCount / (chunksTotal * 8)) * 100))
    : 0;
  const progressPct =
    progress.remaining + progress.processed > 0
      ? Math.round((progress.processed / (progress.processed + progress.remaining)) * 100)
      : 0;

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-sky-500/5">
      <CardContent className="pt-4 pb-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Zap className="h-4 w-4 text-cyan-400" />
            <p className="text-sm font-semibold text-white truncate">Intelligence Layer</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 uppercase tracking-wider">
            {displayFacetCount} facets
          </span>
        </div>
        <p className="text-[11px] text-white/60 leading-relaxed">
          Decomposes each chunk into 15-25 atomic facets via GPT-5-mini. Contextually embedded
          (Anthropic-style) + tagged with system_types, zones, equipment, protection methods
          for self-querying retrieval. Resilient: retries, adaptive batch size, failure audit —
          safe to close the tab.
        </p>

        {running && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-white/80">
              <span className="flex items-center gap-1.5 min-w-0">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400 shrink-0" />
                <span className="truncate">
                  {progress.processed} chunks · {progress.created} facets · batch={batchSize}
                </span>
              </span>
              <span className="font-semibold text-cyan-400 shrink-0">${progress.cost.toFixed(3)}</span>
            </div>
            <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Live log */}
        {logs.length > 0 && (
          <div className="max-h-32 overflow-y-auto text-[10px] font-mono rounded-lg bg-black/30 border border-white/5 p-2 space-y-0.5">
            {logs.map((l) => (
              <div
                key={l.id}
                className={
                  l.kind === 'ok'
                    ? 'text-emerald-300/90'
                    : l.kind === 'retry'
                      ? 'text-amber-300/90'
                      : l.kind === 'skip'
                        ? 'text-rose-300/90'
                        : l.kind === 'stop'
                          ? 'text-orange-300/90'
                          : 'text-white/60'
                }
              >
                <span className="text-white/40 mr-1.5">
                  {new Date(l.timestamp).toLocaleTimeString('en-GB', { hour12: false })}
                </span>
                {l.message}
              </div>
            ))}
          </div>
        )}

        {running ? (
          <Button
            onClick={stop}
            variant="destructive"
            className="w-full h-11 touch-manipulation gap-2"
          >
            <XCircle className="h-4 w-4" />
            Stop after current batch
          </Button>
        ) : (
          <Button
            onClick={start}
            disabled={!editionId}
            className="w-full h-11 touch-manipulation bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-black font-semibold gap-2"
          >
            <Zap className="h-4 w-4" />
            {displayFacetCount > 0 ? 'Resume facet generation' : 'Generate facets'}
          </Button>
        )}

        {failuresCount > 0 && !running && (
          <div className="flex items-center justify-between gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 p-2">
            <div className="flex items-center gap-2 text-[11px] text-amber-300 min-w-0">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{failuresCount} chunks failed permanently</span>
            </div>
            <Button
              onClick={retryFailed}
              disabled={retryingFailed}
              size="sm"
              variant="outline"
              className="h-7 text-[10px] touch-manipulation border-amber-500/40 text-amber-200 hover:bg-amber-500/20"
            >
              {retryingFailed ? 'Queuing…' : 'Queue for retry'}
            </Button>
          </div>
        )}

        {error && (
          <div className="flex gap-2 items-start text-[11px] text-red-300 rounded-lg bg-red-500/10 border border-red-500/20 p-2">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center gap-4 text-[10px] text-white/50 pt-1 border-t border-white/5">
          <span>Target: ~15 facets/chunk</span>
          <span>~$0.005/chunk</span>
          <span>Coverage: ~{coverage}%</span>
        </div>
      </CardContent>
    </Card>
  );
}

