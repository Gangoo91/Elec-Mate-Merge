import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  EmptyState,
  LoadingBlocks,
  FilterBar,
  IconButton,
  Pill,
  Eyebrow,
  Divider,
} from '@/components/admin/editorial';
import {
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
  Zap,
  RefreshCw,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

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

// pdfjs detaches buffers on load — keep the live doc proxy for reuse.
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

export default function AdminIETKnowledge() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedEditionId, setSelectedEditionId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

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

  const { data: editions, refetch: refetchEditions, isLoading: editionsLoading } = useQuery<Edition[]>({
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

  const runPipeline = useCallback(
    async (file: File) => {
      if (!effectiveEditionId) {
        toast({ title: 'Pick an edition first', variant: 'destructive' });
        return;
      }

      try {
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

        const parseRes = await callIngest<{
          regulations_created: number;
          chunks_staged: number;
        }>('parse_and_stage', { job_id, full_text: fullText, page_map: pageMap });

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
          5,
          async (pageNum) => {
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

        setUploadState((s) => ({
          ...s,
          stage: 'embedding',
          message:
            'Embedding chunks (text + visual context) via OpenAI text-embedding-3-large...',
          progress: { current: 0, total: parseRes.chunks_staged },
        }));

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
            throw new Error('Embedding batch returned 0 but still have remaining chunks');
          }
        }

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

  const busy = ['uploading', 'extracting', 'parsing', 'embedding', 'finalising'].includes(
    uploadState.stage
  );

  const refresh = async () => {
    await Promise.all([refetchEditions(), refetchJobs(), refetchCounts()]);
  };

  // Derived job status buckets for filter bar + stats.
  const jobStatusBuckets = useMemo(() => {
    const all = jobs ?? [];
    const embedded = all.filter((j) => j.status === 'completed');
    const processing = all.filter((j) =>
      ['pending', 'parsing', 'embedding', 'finalising'].includes(j.status)
    );
    const failed = all.filter((j) => ['failed', 'cancelled'].includes(j.status));
    return { all, embedded, processing, failed };
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const pool =
      activeTab === 'embedded'
        ? jobStatusBuckets.embedded
        : activeTab === 'processing'
          ? jobStatusBuckets.processing
          : activeTab === 'failed'
            ? jobStatusBuckets.failed
            : jobStatusBuckets.all;
    if (!searchText.trim()) return pool;
    const q = searchText.trim().toLowerCase();
    return pool.filter((j) => {
      const ed = editions?.find((e) => e.id === j.edition_id);
      const hay = [ed?.edition_code, ed?.amendment, j.status, j.id].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [activeTab, searchText, jobStatusBuckets, editions]);

  if (editionsLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="RAG"
          title="IET Knowledge"
          description="BS 7671 and guidance documents indexed for the assistant."
          tone="yellow"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PullToRefresh onRefresh={refresh}>
      <PageFrame>
        <PageHero
          eyebrow="RAG"
          title="IET Knowledge"
          description="BS 7671 and guidance documents indexed for the assistant."
          tone="yellow"
          actions={
            <IconButton onClick={refresh} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Documents', value: editions?.length ?? 0 },
            {
              label: 'Embedded',
              value: jobStatusBuckets.embedded.length,
              tone: 'emerald',
            },
            {
              label: 'Processing',
              value: jobStatusBuckets.processing.length,
              tone: 'orange',
            },
            {
              label: 'Failed',
              value: jobStatusBuckets.failed.length,
              tone: 'red',
            },
          ]}
        />

        {/* Edition picker */}
        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Edition"
            meta={
              activeEdition ? (
                <Pill tone={activeEdition.document_type === 'bs7671' ? 'yellow' : 'cyan'}>
                  {DOC_TYPE_SHORT[activeEdition.document_type] ?? activeEdition.document_type}
                </Pill>
              ) : undefined
            }
          />
          <div className="px-5 sm:px-6 py-4 space-y-3">
            <Select value={effectiveEditionId} onValueChange={setSelectedEditionId}>
              <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-white focus:border-elec-yellow">
                <SelectValue placeholder="Pick an edition" />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-[hsl(0_0%_10%)] border-white/[0.08] text-white">
                {editions?.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    <span className="inline-flex items-center gap-2">
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/[0.06] text-white uppercase tracking-wider">
                        {DOC_TYPE_SHORT[e.document_type] || e.document_type}
                      </span>
                      <span className="text-white">{e.edition_code}</span>
                      {e.is_active && (
                        <span className="text-[10px] text-elec-yellow">· active</span>
                      )}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {activeEdition && activeEdition.id !== effectiveEditionId && (
              <button
                onClick={() => setActiveEditionMutation.mutate(effectiveEditionId)}
                disabled={setActiveEditionMutation.isPending}
                className="h-10 w-full touch-manipulation rounded-full text-[12.5px] font-medium text-elec-yellow border border-elec-yellow/40 hover:bg-elec-yellow/10 transition-colors disabled:opacity-50"
              >
                Make this the active edition
              </button>
            )}
            <NewEditionForm onCreate={(p) => createEditionMutation.mutate(p)} />
          </div>
        </ListCard>

        {/* Counts */}
        {counts && (
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title="Knowledge base"
              meta={<Pill tone="yellow">{counts.chunks.toLocaleString()} chunks</Pill>}
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-white/[0.06]">
              {[
                { label: 'Regs', value: counts.regulations },
                { label: 'Chunks', value: counts.chunks },
                { label: 'Facets', value: counts.facets },
                { label: 'Pages', value: counts.pages },
                { label: 'Tables', value: counts.tables },
                { label: 'Figures', value: counts.figures },
                { label: 'Cross-refs', value: counts.crossRefs },
              ].map((c) => (
                <div
                  key={c.label}
                  className="bg-[hsl(0_0%_12%)] px-4 py-4 flex flex-col items-start"
                >
                  <Eyebrow>{c.label}</Eyebrow>
                  <span className="mt-2 text-2xl sm:text-3xl font-semibold text-white tabular-nums tracking-tight leading-none">
                    {c.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </ListCard>
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

        {/* Table Intelligence — vision-based table row decomposition */}
        {counts && counts.tables > 0 && (
          <TableFacetGenerationCard
            editionId={effectiveEditionId}
            onComplete={() => {
              refetchCounts();
            }}
          />
        )}

        {/* Resume banner */}
        {incompleteJob && uploadState.stage === 'idle' && (
          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Incomplete ingest found"
              meta={<Pill tone="blue">{incompleteJob.status}</Pill>}
            />
            <div className="px-5 sm:px-6 py-4 space-y-3">
              <p className="text-[12.5px] text-white leading-relaxed">
                Pages captioned:{' '}
                <strong>{incompleteJob.pages_captioned}</strong> · Chunks staged:{' '}
                <strong>{incompleteJob.chunks_staged}</strong> · Chunks embedded:{' '}
                <strong>{incompleteJob.chunks_embedded}</strong>
                {incompleteJob.pendingStaged > 0 && (
                  <>
                    {' '}
                    · <strong>{incompleteJob.pendingStaged} pending embed</strong>
                  </>
                )}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {incompleteJob.pendingStaged > 0 ? (
                  <button
                    onClick={() =>
                      resumeIngest(
                        incompleteJob.id,
                        incompleteJob.edition_id,
                        incompleteJob.pendingStaged
                      )
                    }
                    className="h-11 touch-manipulation rounded-full bg-elec-yellow text-black font-semibold text-[13px] inline-flex items-center justify-center gap-2"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    Resume embed
                  </button>
                ) : (
                  <div className="h-11 flex items-center justify-center text-[11.5px] text-white rounded-full border border-white/[0.08] px-2 text-center">
                    Re-upload PDF to continue
                  </div>
                )}
                <button
                  onClick={() => cancelJobMutation.mutate(incompleteJob.id)}
                  disabled={cancelJobMutation.isPending}
                  className="h-11 touch-manipulation rounded-full border border-white/[0.08] text-white text-[13px] inline-flex items-center justify-center gap-2 hover:bg-white/[0.04] disabled:opacity-50"
                >
                  {cancelJobMutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5" />
                  )}
                  Cancel job
                </button>
              </div>
            </div>
          </ListCard>
        )}

        {/* Upload drop zone */}
        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Upload document"
            meta={
              editions?.find((e) => e.id === effectiveEditionId) ? (
                <Pill tone="yellow">
                  {DOC_TYPE_SHORT[
                    editions.find((e) => e.id === effectiveEditionId)!.document_type
                  ] ?? 'doc'}
                </Pill>
              ) : undefined
            }
          />
          <div className="p-5 sm:p-6 space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileSelect}
              disabled={busy}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={busy || !effectiveEditionId}
              className="w-full border-2 border-dashed border-white/[0.1] rounded-2xl py-10 sm:py-14 px-6 text-center hover:border-elec-yellow/40 hover:bg-white/[0.02] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex flex-col items-center justify-center gap-3"
            >
              {busy ? (
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              ) : (
                <Upload className="h-8 w-8 text-white" />
              )}
              <div className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                {busy ? 'Working…' : 'Drop files to upload'}
              </div>
              <div className="text-[12px] text-white max-w-md leading-relaxed">
                PDF only, OCR'd first with <code>ocrmypdf</code>. Text extracted browser-side,
                chunked and embedded via OpenAI text-embedding-3-large server-side.
              </div>
            </button>

            {uploadState.stage !== 'idle' && (
              <div className="rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  {uploadState.stage === 'done' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : uploadState.stage === 'error' ? (
                    <XCircle className="h-4 w-4 text-red-400" />
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                  )}
                  <span className="text-white font-semibold uppercase tracking-wider">
                    {uploadState.stage}
                  </span>
                  <span className="text-white truncate">{uploadState.message}</span>
                </div>
                {uploadState.progress.total > 0 && (
                  <>
                    <div className="flex justify-between text-[11px] text-white tabular-nums">
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
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-elec-yellow transition-all"
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
                  <div className="grid grid-cols-5 gap-px bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.06]">
                    {[
                      { label: 'Regs', value: uploadState.stats.regulations },
                      { label: 'Pages', value: uploadState.stats.pagesCaptioned },
                      { label: 'Chunks', value: uploadState.stats.chunksEmbedded },
                      { label: 'Refs', value: uploadState.stats.crossRefs },
                      {
                        label: 'Vision $',
                        value: Number(uploadState.stats.visionCostUsd.toFixed(2)),
                      },
                    ].map((ms) => (
                      <div
                        key={ms.label}
                        className="bg-[hsl(0_0%_12%)] px-2 py-3 text-center"
                      >
                        <div className="text-sm font-semibold text-white tabular-nums leading-none">
                          {ms.value}
                        </div>
                        <div className="mt-1.5 text-[9px] uppercase tracking-wider text-white">
                          {ms.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {uploadState.stage === 'error' && (
                  <div className="flex gap-2 items-start text-[11.5px] text-red-400">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>{uploadState.message}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </ListCard>

        {/* Filters + Document/Job list */}
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: jobStatusBuckets.all.length },
            { value: 'embedded', label: 'Embedded', count: jobStatusBuckets.embedded.length },
            { value: 'processing', label: 'Processing', count: jobStatusBuckets.processing.length },
            { value: 'failed', label: 'Failed', count: jobStatusBuckets.failed.length },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          search={searchText}
          onSearchChange={setSearchText}
          searchPlaceholder="Search ingests…"
        />

        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Documents"
            meta={<Pill>{filteredJobs.length}</Pill>}
          />
          {filteredJobs.length === 0 ? (
            <div className="p-4">
              <EmptyState
                title="No documents yet"
                description="Upload a PDF to start indexing."
                action="Upload"
                onAction={() => fileInputRef.current?.click()}
              />
            </div>
          ) : (
            <ListBody>
              {filteredJobs.map((j) => {
                const ed = editions?.find((e) => e.id === j.edition_id);
                const statusTone: 'emerald' | 'red' | 'blue' | 'orange' =
                  j.status === 'completed'
                    ? 'emerald'
                    : j.status === 'failed' || j.status === 'cancelled'
                      ? 'red'
                      : ['embedding', 'parsing', 'finalising'].includes(j.status)
                        ? 'orange'
                        : 'blue';
                const totalPages = j.total_pages ?? 0;
                const sizeLabel = totalPages > 0 ? `${totalPages} pp` : '—';
                const subtitleBits: string[] = [];
                subtitleBits.push(
                  formatDistanceToNow(parseISO(j.started_at), { addSuffix: true })
                );
                subtitleBits.push(`${j.regulations_created} regs`);
                subtitleBits.push(
                  `${j.chunks_embedded}/${j.chunks_staged} chunks`
                );
                if (ed) {
                  subtitleBits.unshift(
                    `${DOC_TYPE_SHORT[ed.document_type] ?? ed.document_type} · ${ed.amendment}`
                  );
                }
                return (
                  <ListRow
                    key={j.id}
                    lead={
                      <div className="h-9 w-9 rounded-lg border border-white/[0.08] bg-white/[0.04] flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                    }
                    title={ed?.edition_code ?? 'Unknown edition'}
                    subtitle={subtitleBits.join(' · ')}
                    trailing={
                      <>
                        <Pill tone={statusTone}>{j.status}</Pill>
                        <span className="text-[11px] text-white tabular-nums">{sizeLabel}</span>
                      </>
                    }
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>

        {/* Embedding / chunking settings */}
        <ListCard>
          <ListCardHeader tone="yellow" title="Embedding settings" />
          <ListBody>
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
              <div className="min-w-0">
                <div className="text-[14px] font-medium text-white">Embedding model</div>
                <div className="mt-0.5 text-[11.5px] text-white">OpenAI text-embedding-3-large</div>
              </div>
              <Pill tone="yellow">3072-d</Pill>
            </div>
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
              <div className="min-w-0">
                <div className="text-[14px] font-medium text-white">Vision captioning</div>
                <div className="mt-0.5 text-[11.5px] text-white">GPT-5-mini · 150 DPI page render</div>
              </div>
              <Pill>per-page</Pill>
            </div>
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
              <div className="min-w-0">
                <div className="text-[14px] font-medium text-white">Parse concurrency</div>
                <div className="mt-0.5 text-[11.5px] text-white">5 parallel page renderers</div>
              </div>
              <Pill>5×</Pill>
            </div>
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5">
              <div className="min-w-0">
                <div className="text-[14px] font-medium text-white">Storage bucket</div>
                <div className="mt-0.5 text-[11.5px] text-white">iet-docs / page-images</div>
              </div>
              <Pill>supabase</Pill>
            </div>
          </ListBody>
        </ListCard>
      </PageFrame>
    </PullToRefresh>
  );
}

/* ───────────────────────── Sub-components ───────────────────────── */

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
      <button
        onClick={() => setOpen(true)}
        className="h-10 w-full touch-manipulation text-[12.5px] font-medium text-elec-yellow hover:text-elec-yellow hover:bg-white/[0.04] rounded-full border border-white/[0.08] transition-colors inline-flex items-center justify-center gap-2"
      >
        <FileText className="h-3.5 w-3.5" />
        New edition
      </button>
    );
  }

  return (
    <div className="space-y-3 p-4 rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.06]">
      <div>
        <Eyebrow>Document</Eyebrow>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {(['bs7671', 'gn3', 'osg'] as DocType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setDocType(t)}
              className={`h-9 px-3 rounded-full text-[11.5px] font-semibold touch-manipulation transition-colors ${
                docType === t
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/[0.04] text-white hover:bg-white/[0.08]'
              }`}
            >
              {DOC_TYPE_SHORT[t]}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Eyebrow>Base</Eyebrow>
          <Input
            value={baseEdition}
            onChange={(e) => setBaseEdition(e.target.value)}
            placeholder={docType === 'bs7671' ? '2018' : '9th Ed'}
            className="mt-2 h-10 text-sm text-white bg-[hsl(0_0%_12%)] border-white/[0.08] focus:border-elec-yellow touch-manipulation"
          />
        </div>
        <div>
          <Eyebrow>Amendment</Eyebrow>
          <Input
            value={amendment}
            onChange={(e) => setAmendment(e.target.value)}
            placeholder={docType === 'bs7671' ? 'A4:2026' : '2026'}
            className="mt-2 h-10 text-sm text-white bg-[hsl(0_0%_12%)] border-white/[0.08] focus:border-elec-yellow touch-manipulation"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setOpen(false)}
          className="h-10 flex-1 touch-manipulation rounded-full border border-white/[0.08] text-[12.5px] font-medium text-white hover:bg-white/[0.04] transition-colors"
        >
          Cancel
        </button>
        <button
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
          className="h-10 flex-1 touch-manipulation rounded-full bg-elec-yellow text-black text-[12.5px] font-semibold disabled:opacity-50"
        >
          Create
        </button>
      </div>
    </div>
  );
}

/* ─── Facet Generation Card ─────────────────────────────────
   Resilient: retries + exponential backoff, adaptive batch size,
   continue-on-error, live DB-poll progress, wake lock, stop button. */

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
    setLogs((prev) => {
      logIdRef.current += 1;
      return [
        { id: logIdRef.current, timestamp: Date.now(), kind, message },
        ...prev,
      ].slice(0, 25);
    });
  }, []);

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

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
      /* unsupported */
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    try {
      wakeLockRef.current?.release();
    } catch {
      /* ignore */
    } finally {
      wakeLockRef.current = null;
    }
  }, []);

  useEffect(() => {
    const onVis = () => {
      if (running && document.visibilityState === 'visible' && !wakeLockRef.current) {
        void requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [running, requestWakeLock]);

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

        if (res.completed || res.remaining === 0) {
          pushLog('info', 'All chunks processed');
          break;
        }

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

        if (elapsed < 120_000) {
          consecutiveSuccesses += 1;
          if (consecutiveSuccesses >= 3 && currentBatch < 8) {
            currentBatch = Math.min(8, currentBatch * 2);
            consecutiveSuccesses = 0;
            pushLog('info', `Scaling batch size → ${currentBatch}`);
          }
        } else {
          consecutiveSuccesses = 0;
          if (currentBatch > 2) {
            currentBatch = Math.max(2, Math.floor(currentBatch / 2));
            pushLog('info', `Slow batch (${(elapsed / 1000).toFixed(0)}s) — shrinking to ${currentBatch}`);
          }
        }

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
    <ListCard>
      <ListCardHeader
        tone="cyan"
        title="Intelligence layer"
        meta={<Pill tone="cyan">{displayFacetCount.toLocaleString()} facets</Pill>}
      />
      <div className="p-5 sm:p-6 space-y-4">
        <p className="text-[12.5px] text-white leading-relaxed">
          Decomposes each chunk into 15–25 atomic facets via GPT-5-mini. Contextually embedded
          and tagged with system_types, zones, equipment, protection methods for self-querying
          retrieval. Resilient: retries, adaptive batch size, failure audit — safe to close the tab.
        </p>

        {running && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11.5px] text-white">
              <span className="flex items-center gap-2 min-w-0">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-elec-yellow shrink-0" />
                <span className="truncate">
                  {progress.processed} chunks · {progress.created} facets · batch={batchSize}
                </span>
              </span>
              <span className="font-semibold text-elec-yellow shrink-0 tabular-nums">
                ${progress.cost.toFixed(3)}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {logs.length > 0 && (
          <div className="max-h-32 overflow-y-auto text-[10px] font-mono rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-3 space-y-0.5">
            {logs.map((l) => (
              <div
                key={l.id}
                className={
                  l.kind === 'ok'
                    ? 'text-emerald-400'
                    : l.kind === 'retry'
                      ? 'text-amber-400'
                      : l.kind === 'skip'
                        ? 'text-red-400'
                        : l.kind === 'stop'
                          ? 'text-orange-400'
                          : 'text-white'
                }
              >
                <span className="text-white mr-1.5">
                  {new Date(l.timestamp).toLocaleTimeString('en-GB', { hour12: false })}
                </span>
                {l.message}
              </div>
            ))}
          </div>
        )}

        {running ? (
          <button
            onClick={stop}
            className="w-full h-11 touch-manipulation rounded-full border border-red-400/40 text-red-400 font-semibold text-[13px] inline-flex items-center justify-center gap-2 hover:bg-red-400/10 transition-colors"
          >
            <XCircle className="h-4 w-4" />
            Stop after current batch
          </button>
        ) : (
          <button
            onClick={start}
            disabled={!editionId}
            className="w-full h-11 touch-manipulation rounded-full bg-elec-yellow text-black font-semibold text-[13px] inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Zap className="h-4 w-4" />
            {displayFacetCount > 0 ? 'Resume facet generation' : 'Generate facets'}
          </button>
        )}

        {failuresCount > 0 && !running && (
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-3">
            <div className="flex items-center gap-2 text-[11.5px] text-white min-w-0">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span className="truncate">{failuresCount} chunks failed permanently</span>
            </div>
            <button
              onClick={retryFailed}
              disabled={retryingFailed}
              className="h-9 px-4 text-[11.5px] font-medium text-white rounded-full border border-white/[0.08] hover:bg-white/[0.04] touch-manipulation disabled:opacity-50"
            >
              {retryingFailed ? 'Queuing…' : 'Queue for retry'}
            </button>
          </div>
        )}

        {error && (
          <div className="flex gap-2 items-start text-[11.5px] text-red-400 rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-3">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <Divider />
        <div className="flex items-center flex-wrap gap-x-5 gap-y-1 text-[11px] text-white">
          <span>Target: ~15 facets/chunk</span>
          <span>~$0.005/chunk</span>
          <span>Coverage: ~{coverage}%</span>
        </div>
      </div>
    </ListCard>
  );
}

/* ─── Table Facet Generation Card ─────────────────────────────
   Vision-based table-row decomposition — sends page images to
   GPT-5-mini and emits one facet per cell × dimension. */

function TableFacetGenerationCard({
  editionId,
  onComplete,
}: {
  editionId: string;
  onComplete: () => void;
}) {
  const [running, setRunning] = useState(false);
  const [batchSize, setBatchSize] = useState(4);
  const [progress, setProgress] = useState<{
    total_tables: number;
    eligible_tables: number;
    tables_with_facets: number;
    tables_remaining: number;
    total_table_facets: number;
  } | null>(null);
  const [runStats, setRunStats] = useState({ processed: 0, created: 0, cost: 0 });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const cancelRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wakeLockRef = useRef<any>(null);
  const logIdRef = useRef(0);
  const haptic = useHaptic();

  const pushLog = useCallback((kind: LogEntry['kind'], message: string) => {
    setLogs((prev) => {
      logIdRef.current += 1;
      return [
        { id: logIdRef.current, timestamp: Date.now(), kind, message },
        ...prev,
      ].slice(0, 25);
    });
  }, []);

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  useEffect(() => {
    if (!editionId) return;
    let cancelled = false;
    const poll = async () => {
      const { data } = await supabase.rpc('get_table_facet_progress', {
        p_edition_id: editionId,
      });
      if (!cancelled && data && data[0]) setProgress(data[0]);
    };
    void poll();
    const interval = running ? 5000 : 20000;
    const handle = setInterval(poll, interval);
    return () => {
      cancelled = true;
      clearInterval(handle);
    };
  }, [editionId, running]);

  const requestWakeLock = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nav: any = navigator;
      if (nav.wakeLock?.request) {
        wakeLockRef.current = await nav.wakeLock.request('screen');
      }
    } catch {
      /* unsupported */
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    try {
      wakeLockRef.current?.release();
    } catch {
      /* ignore */
    } finally {
      wakeLockRef.current = null;
    }
  }, []);

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
          return await callIngest<{
            processed: number;
            facets_created: number;
            remaining: number;
            cost_usd: number;
            completed: boolean;
            errors?: string[];
          }>('generate_table_facets_batch', { edition_id: editionId, batch_size: size });
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          if (attempt < delays.length) {
            pushLog(
              'retry',
              `Batch failed (attempt ${attempt + 1}/${delays.length + 1}): ${msg.slice(0, 80)} — backing off ${delays[attempt] / 1000}s`
            );
            await sleep(delays[attempt]);
          } else {
            pushLog('skip', `Batch abandoned: ${msg.slice(0, 80)}`);
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
    setRunStats({ processed: 0, created: 0, cost: 0 });
    setLogs([]);
    pushLog('info', 'Starting table vision extraction');
    await requestWakeLock();

    try {
      let currentBatch = 4;
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
          if (currentBatch > 1) {
            currentBatch = Math.max(1, Math.floor(currentBatch / 2));
            pushLog('info', `Shrinking batch → ${currentBatch}`);
          }
          consecutiveSuccesses = 0;
          await sleep(10_000);
          continue;
        }

        const elapsed = Date.now() - started;
        setRunStats((s) => ({
          processed: s.processed + res.processed,
          created: s.created + res.facets_created,
          cost: s.cost + (res.cost_usd || 0),
        }));
        setBatchSize(currentBatch);

        pushLog(
          'ok',
          `+${res.facets_created} facets from ${res.processed} tables in ${(elapsed / 1000).toFixed(1)}s · ${res.remaining} remaining`
        );

        if (res.errors && res.errors.length > 0) {
          for (const err of res.errors) pushLog('skip', `Table error: ${err}`);
        }

        if (res.completed || res.remaining === 0) {
          pushLog('info', 'All eligible tables processed');
          break;
        }

        if (res.processed === 0) {
          consecutiveEmpty += 1;
          if (consecutiveEmpty >= 3) {
            pushLog('skip', 'Three consecutive empty batches — stopping. Check error log above.');
            break;
          }
          await sleep(5_000);
          continue;
        }
        consecutiveEmpty = 0;

        if (elapsed < 100_000) {
          consecutiveSuccesses += 1;
          if (consecutiveSuccesses >= 3 && currentBatch < 4) {
            currentBatch = Math.min(4, currentBatch + 1);
            consecutiveSuccesses = 0;
            pushLog('info', `Scaling batch → ${currentBatch}`);
          }
        } else if (elapsed > 130_000 && currentBatch > 1) {
          currentBatch = Math.max(1, currentBatch - 1);
          consecutiveSuccesses = 0;
          pushLog('info', `Slow batch (${(elapsed / 1000).toFixed(0)}s) — shrinking to ${currentBatch}`);
        }

        await sleep(500);
      }

      haptic.success();
      toast({
        title: `Run complete — vision-extracted table rows into facets`,
        variant: 'success',
      });
      onComplete();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      pushLog('skip', `Fatal: ${msg}`);
      haptic.error();
      toast({ title: `Table extraction halted: ${msg}`, variant: 'destructive' });
    } finally {
      setRunning(false);
      releaseWakeLock();
    }
  }, [editionId, running, callBatchWithRetry, pushLog, requestWakeLock, releaseWakeLock, haptic, onComplete]);

  const stop = useCallback(() => {
    cancelRef.current = true;
    pushLog('stop', 'Stop requested — finishing current batch…');
  }, [pushLog]);

  const eligibleDone =
    progress && progress.eligible_tables > 0
      ? Math.round((progress.tables_with_facets / progress.eligible_tables) * 100)
      : 0;

  return (
    <ListCard>
      <ListCardHeader
        tone="purple"
        title="Table intelligence"
        meta={<Pill tone="purple">{(progress?.total_table_facets ?? 0).toLocaleString()} facets</Pill>}
      />
      <div className="p-5 sm:p-6 space-y-4">
        <p className="text-[12.5px] text-white leading-relaxed">
          Sends each table's page image to GPT-5-mini vision. Reads the table directly from the
          PDF (bypassing garbled OCR) and decomposes every cell into atomic facts — conductor ×
          size × temperature × k-value, device × rating × Zs, etc. Each row becomes a retrievable
          compliance fact.
        </p>

        {progress && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { label: 'Total', value: progress.total_tables, tone: undefined as undefined | 'purple' | 'emerald' | 'amber' },
              { label: 'Eligible', value: progress.eligible_tables, tone: 'purple' as const },
              { label: 'Done', value: progress.tables_with_facets, tone: 'emerald' as const },
              { label: 'Remaining', value: progress.tables_remaining, tone: 'amber' as const },
            ].map((cell) => (
              <div key={cell.label} className="bg-[hsl(0_0%_12%)] px-4 py-4 flex flex-col items-start">
                <Eyebrow>{cell.label}</Eyebrow>
                <span
                  className={`mt-2 text-2xl font-semibold tabular-nums tracking-tight leading-none ${
                    cell.tone === 'purple'
                      ? 'text-purple-400'
                      : cell.tone === 'emerald'
                        ? 'text-emerald-400'
                        : cell.tone === 'amber'
                          ? 'text-amber-400'
                          : 'text-white'
                  }`}
                >
                  {cell.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {running && (
          <div className="flex items-center justify-between text-[11.5px] text-white">
            <span className="flex items-center gap-2 min-w-0">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-purple-400 shrink-0" />
              <span className="truncate">
                {runStats.processed} tables · {runStats.created} facets · batch={batchSize}
              </span>
            </span>
            <span className="font-semibold text-purple-400 shrink-0 tabular-nums">
              ${runStats.cost.toFixed(3)}
            </span>
          </div>
        )}

        {logs.length > 0 && (
          <div className="max-h-32 overflow-y-auto text-[10px] font-mono rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-3 space-y-0.5">
            {logs.map((l) => (
              <div
                key={l.id}
                className={
                  l.kind === 'ok'
                    ? 'text-emerald-400'
                    : l.kind === 'retry'
                      ? 'text-amber-400'
                      : l.kind === 'skip'
                        ? 'text-red-400'
                        : l.kind === 'stop'
                          ? 'text-orange-400'
                          : 'text-white'
                }
              >
                <span className="text-white mr-1.5">
                  {new Date(l.timestamp).toLocaleTimeString('en-GB', { hour12: false })}
                </span>
                {l.message}
              </div>
            ))}
          </div>
        )}

        {running ? (
          <button
            onClick={stop}
            className="w-full h-11 touch-manipulation rounded-full border border-red-400/40 text-red-400 font-semibold text-[13px] inline-flex items-center justify-center gap-2 hover:bg-red-400/10 transition-colors"
          >
            <XCircle className="h-4 w-4" />
            Stop after current batch
          </button>
        ) : (
          <button
            onClick={start}
            disabled={!editionId || !progress || progress.tables_remaining === 0}
            className="w-full h-11 touch-manipulation rounded-full bg-elec-yellow text-black font-semibold text-[13px] inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Zap className="h-4 w-4" />
            {progress && progress.tables_with_facets > 0
              ? 'Resume table extraction'
              : 'Extract tables to facets'}
          </button>
        )}

        {error && (
          <div className="flex gap-2 items-start text-[11.5px] text-red-400 rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-3">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <Divider />
        <div className="flex items-center flex-wrap gap-x-5 gap-y-1 text-[11px] text-white">
          <span>GPT-5-mini vision</span>
          <span>~$0.003/table</span>
          <span>Coverage: {eligibleDone}%</span>
        </div>
      </div>
    </ListCard>
  );
}

export { DOC_TYPE_LABEL };
