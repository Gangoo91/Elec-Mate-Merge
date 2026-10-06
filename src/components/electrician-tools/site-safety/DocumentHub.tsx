import { useState, useMemo, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  useAllSafetyDocuments,
  type DocumentType,
  type SafetyDocument,
} from '@/hooks/useAllSafetyDocuments';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useShowMore } from '@/hooks/useShowMore';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

import { Sheet, SheetContent } from '@/components/ui/sheet';

import {
  FilterBar,
  EmptyState,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  toneDot,
  type Tone,
} from '@/components/college/primitives';

import { SafetyModuleShell } from './common/SafetyModuleShell';
import { LoadMoreButton } from './common/LoadMoreButton';
import { RAMSQuickEditDialog } from './ai-rams/RAMSQuickEditDialog';
import { UserRAMSUpload } from './UserRAMSUpload';
import { SafetyListCard } from './common/SafetyList';
import { SafetyPageHeader } from './common/SafetyPageHeader';
import { useSparkProjects } from '@/hooks/useSparkProjects';

interface DocumentHubProps {
  onBack?: () => void;
}

/* ────────────────────────────────────────────────────────
   Record types. The hub used to group these into three
   "families" (Generate / Record / Reference) — internal
   vocabulary no electrician searches by. People look for
   "the isolation on Tuesday" or "that permit", so the
   filter is the record type itself, in plain words.
   Colour never rides on type; it rides on status only.
   ──────────────────────────────────────────────────────── */

const TYPE_LABEL: Record<DocumentType, string> = {
  RAMS: 'RAMS',
  COSHH: 'COSHH',
  'Near Miss': 'Near miss',
  Accident: 'Accident book',
  Observation: 'Observation',
  'Site Diary': 'Site diary',
  Inspection: 'Inspection',
  Isolation: 'Safe isolation',
  'Fire Watch': 'Fire watch',
  Permit: 'Permit to work',
  Equipment: 'Equipment',
  'Pre-Use Check': 'Pre-use check',
  Briefing: 'Briefing',
};

/** The Site Safety tool that holds each record type (`?tool=` id). */
const TOOL_FOR_TYPE: Partial<Record<DocumentType, string>> = {
  COSHH: 'coshh',
  'Near Miss': 'near-miss',
  Accident: 'accident-book',
  Observation: 'safety-observations',
  'Site Diary': 'site-diary',
  Inspection: 'inspection-checklists',
  Isolation: 'safe-isolation',
  'Fire Watch': 'fire-watch',
  Permit: 'permit-to-work',
  Equipment: 'equipment',
  'Pre-Use Check': 'pre-use-checks',
  Briefing: 'team-briefing',
};

/* ────────────────────────────────────────────────────────
   Status — the single colour dimension
   ──────────────────────────────────────────────────────── */

// Map every status to a tone + display label.
/**
 * Sixteen statuses, and they used to wear eight hues between them — amber,
 * blue, green, indigo, purple, orange, red, neutral. Nobody learns eight
 * status colours, and indigo/purple carry no meaning a reader could guess:
 * there is nothing about "submitted" that is more indigo than blue.
 *
 * Collapsed to the vocabulary the rest of the hub already uses, so the colour
 * answers one question — what does this need from me?
 *
 *   amber   → waiting on you (draft, in progress, submitted, scheduled)
 *   green   → done, or safe (active, approved, reviewed, completed)
 *   red     → dead or void (cancelled, expired)
 *   blue    → on the record, no action (open, recorded)
 *   neutral → finished with (closed)
 *
 * `isolated` and `re_energised` keep their existing tones deliberately. Those
 * are safe-isolation states with real electrical meaning and re-colouring them
 * is a domain decision, not a design one — left alone pending Andrew.
 */
const STATUS_TONE: Record<string, Tone | 'neutral'> = {
  draft: 'amber',
  open: 'blue',
  active: 'green',
  in_progress: 'amber',
  submitted: 'amber',
  approved: 'green',
  reviewed: 'green',
  completed: 'green',
  closed: 'neutral',
  cancelled: 'red',
  expired: 'red',
  recorded: 'blue',
  scheduled: 'amber',
  isolated: 'orange',
  re_energised: 'green',
  // Inspections and pre-use checks report a verdict rather than a lifecycle
  // stage. A failed check is the one thing on this page that needs acting on
  // today, so it takes red.
  pass: 'green',
  fail: 'red',
};

const STATUS_LABEL: Record<string, string> = {
  draft: 'Draft',
  open: 'Open',
  active: 'Active',
  in_progress: 'In progress',
  submitted: 'Submitted',
  approved: 'Approved',
  reviewed: 'Reviewed',
  completed: 'Completed',
  closed: 'Closed',
  cancelled: 'Cancelled',
  expired: 'Expired',
  recorded: 'Recorded',
  scheduled: 'Scheduled',
  isolated: 'Isolated',
  re_energised: 'Re-energised',
  pass: 'Pass',
  fail: 'Fail',
};

/*
 * One surface, coloured text.
 *
 * Permit to Work, Safe Isolation and Fire Watch were moved to a neutral pill
 * with a coloured label; this file — the shared Document Hub, which lists the
 * records those very modules produce — was still tinting the pill itself. The
 * same permit therefore wore one pill in its own module and a different one in
 * the hub, which is worse than either convention applied consistently.
 *
 * Tinted washes are also the weaker choice on this ground: at 10% over
 * near-black the hues muddy and converge, so six statuses that are meant to be
 * distinguishable end up as six similar brown-greys. The text carries the
 * meaning; the surface stays out of the way.
 */
const STATUS_PILL: Record<Tone | 'neutral', string> = {
  amber: 'bg-white/[0.05] text-amber-400 border-white/10',
  green: 'bg-white/[0.05] text-emerald-400 border-white/10',
  emerald: 'bg-white/[0.05] text-emerald-400 border-white/10',
  red: 'bg-white/[0.05] text-red-400 border-white/10',
  // Blue is not in the palette. "Done, nothing outstanding" reads as plain
  // white, the same call made in the three modules above.
  blue: 'bg-white/[0.05] text-white border-white/10',
  orange: 'bg-white/[0.05] text-orange-400 border-white/10',
  // purple / indigo / cyan are unreachable now that no status maps to them,
  // but Tone still declares them, so the record has to stay total. They point
  // at the nearest surviving tone rather than reintroducing a hue.
  purple: 'bg-white/[0.05] text-amber-400 border-white/10',
  indigo: 'bg-white/[0.05] text-amber-400 border-white/10',
  cyan: 'bg-white/[0.05] text-white border-white/10',
  // Volt is a LINE and TEXT colour here, never a fill — a translucent yellow
  // wash goes muddy brown against near-black.
  yellow: 'text-elec-yellow border-elec-yellow/35',
  neutral: 'bg-white/[0.05] text-white border-white/10',
  grey: 'bg-white/[0.06] text-white border-white/[0.12]',
};

function statusTone(status: string): Tone | undefined {
  const t = STATUS_TONE[status];
  return t && t !== 'neutral' ? t : undefined;
}

function StatusPill({ status }: { status: string }) {
  const key = STATUS_TONE[status] ?? 'neutral';
  const label = STATUS_LABEL[status] || status;
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        STATUS_PILL[key]
      )}
    >
      {label}
    </span>
  );
}

// An open/active status sorts above settled ones so live work stays on top.
const URGENT_STATUSES = new Set([
  'open',
  'active',
  'in_progress',
  'draft',
  'submitted',
  'scheduled',
  'isolated',
  'expired',
]);

/* ────────────────────────────────────────────────────────
   Status update plumbing — preserved verbatim from the
   previous implementation (tables, transitions, mutation).
   ──────────────────────────────────────────────────────── */

// `satisfies` rather than a `string`-valued annotation: typed as string, the
// table name widened and `supabase.from(table)` collapsed to `never`, so the
// whole status-update call was unchecked — TypeScript could not tell you that
// `status` exists on the table or that `id` is a real column. Keeping the
// literals lets the client resolve each table properly.
const TABLE_MAP = {
  'Near Miss': 'near_miss_reports',
  RAMS: 'rams_documents',
  Briefing: 'team_briefings',
} as const satisfies Partial<Record<DocumentType, string>>;

const STATUS_TRANSITIONS: Partial<
  Record<DocumentType, { from: string; to: string; label: string }[]>
> = {
  'Near Miss': [
    { from: 'open', to: 'in_progress', label: 'Mark in progress' },
    { from: 'in_progress', to: 'closed', label: 'Mark as closed' },
    { from: 'open', to: 'closed', label: 'Mark as closed' },
  ],
  RAMS: [{ from: 'draft', to: 'approved', label: 'Approve' }],
};

type RAMSSourceFilter = 'all' | 'ai-generated' | 'user-uploaded';

function fmtRelative(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

type TypeFilter = DocumentType | 'all' | 'action';

function needsAction(doc: SafetyDocument): boolean {
  return URGENT_STATUSES.has(doc.status) || doc.status === 'fail';
}

function fmtFullDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function DocumentHub({ onBack }: DocumentHubProps) {
  const { data: documents = [], isLoading, isError, refetch } = useAllSafetyDocuments();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  // Job names and numbers, so a record can be found by the job it is filed against.
  const { projects: allJobs = [] } = useSparkProjects('all');
  const jobLabel = useMemo(() => {
    const m = new Map<string, string>();
    for (const j of allJobs) {
      m.set(j.id, [j.jobNumber, j.title].filter(Boolean).join(' · '));
    }
    return m;
  }, [allJobs]);
  const [activeType, setActiveType] = useState<TypeFilter>('all');
  const [openDoc, setOpenDoc] = useState<SafetyDocument | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // RAMS-specific state
  const [ramsSourceFilter, setRamsSourceFilter] = useState<RAMSSourceFilter>('all');
  const [uploadSheetOpen, setUploadSheetOpen] = useState(false);
  const [quickEditDialogOpen, setQuickEditDialogOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // RAMS source map (ai-generated vs user-uploaded)
  const [ramsSourceData, setRamsSourceData] = useState<Record<string, string>>({});
  const [ramsSourceLoaded, setRamsSourceLoaded] = useState(false);

  const isRamsFilter = activeType === 'RAMS';

  useEffect(() => {
    if (!isRamsFilter || ramsSourceLoaded) return;
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('rams_documents')
        .select('id, source')
        .eq('user_id', user.id);
      if (data) {
        const sourceMap: Record<string, string> = {};
        for (const row of data) {
          sourceMap[row.id] = row.source || 'ai-generated';
        }
        setRamsSourceData(sourceMap);
        setRamsSourceLoaded(true);
      }
    };
    load();
  }, [isRamsFilter, ramsSourceLoaded]);

  const handleStatusUpdate = useCallback(
    async (doc: SafetyDocument, newStatus: string) => {
      const table = TABLE_MAP[doc.type];
      if (!table) return;
      setIsUpdating(true);
      try {
        const { error } = await supabase
          .from(table)
          .update({ status: newStatus })
          .eq('id', doc.sourceId);
        if (error) throw error;
        queryClient.invalidateQueries({ queryKey: ['all-safety-documents'] });
        toast({
          title: 'Status updated',
          description: `Marked as ${(STATUS_LABEL[newStatus] || newStatus).toLowerCase()}`,
        });
        setOpenDoc(null);
      } catch (err) {
        toast({
          title: 'Update failed',
          description: (err as Error).message,
          variant: 'destructive',
        });
      } finally {
        setIsUpdating(false);
      }
    },
    [queryClient]
  );

  const getAvailableTransitions = useCallback((doc: SafetyDocument) => {
    const transitions = STATUS_TRANSITIONS[doc.type];
    if (!transitions) return [];
    return transitions.filter((t) => t.from === doc.status);
  }, []);

  // ─── Type counts — only types the user actually has get a chip ───
  const typeCounts = useMemo(() => {
    const c = new Map<DocumentType, number>();
    for (const d of documents) c.set(d.type, (c.get(d.type) ?? 0) + 1);
    return [...c.entries()].sort((a, b) => b[1] - a[1]);
  }, [documents]);

  const actionCount = useMemo(() => documents.filter(needsAction).length, [documents]);

  // ─── RAMS source counts (within RAMS) ───
  const ramsDocuments = useMemo(() => documents.filter((d) => d.type === 'RAMS'), [documents]);
  const aiGeneratedCount = useMemo(
    () =>
      ramsDocuments.filter((d) => (ramsSourceData[d.id] || 'ai-generated') === 'ai-generated')
        .length,
    [ramsDocuments, ramsSourceData]
  );
  const uploadedCount = useMemo(
    () => ramsDocuments.filter((d) => ramsSourceData[d.id] === 'user-uploaded').length,
    [ramsDocuments, ramsSourceData]
  );

  // ─── Filter + sort ───
  const filtered = useMemo(() => {
    let result = documents;

    if (activeType === 'action') {
      result = result.filter(needsAction);
    } else if (activeType !== 'all') {
      result = result.filter((d) => d.type === activeType);
    }

    // RAMS source filter (only meaningful within RAMS)
    if (isRamsFilter && ramsSourceFilter !== 'all') {
      result = result.filter((d) => {
        const source = ramsSourceData[d.id] || 'ai-generated';
        return source === ramsSourceFilter;
      });
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(term) ||
          d.type.toLowerCase().includes(term) ||
          TYPE_LABEL[d.type].toLowerCase().includes(term) ||
          (STATUS_LABEL[d.status] || d.status).toLowerCase().includes(term) ||
          d.siteAddress?.toLowerCase().includes(term) ||
          (d.jobId ? (jobLabel.get(d.jobId) ?? '').toLowerCase().includes(term) : false)
      );
    }

    // Urgent / live first, then by recency.
    return [...result].sort((a, b) => {
      const ua = needsAction(a) ? 0 : 1;
      const ub = needsAction(b) ? 0 : 1;
      if (ua !== ub) return ua - ub;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [documents, activeType, isRamsFilter, ramsSourceFilter, ramsSourceData, searchTerm, jobLabel]);

  const { visible, hasMore, remaining, loadMore } = useShowMore(filtered);

  const handleExport = (doc: SafetyDocument) => {
    if (doc.hasPDF && doc.pdfType) {
      exportPDF(doc.pdfType as Parameters<typeof exportPDF>[0], doc.sourceId);
    }
  };

  // Amend goes straight into the editable results view (no intermediate dialog).
  const openAmend = (sourceId: string) => {
    setOpenDoc(null);
    setSelectedDocumentId(sourceId);
    setQuickEditDialogOpen(true);
  };

  const openTool = (doc: SafetyDocument) => {
    const tool = TOOL_FOR_TYPE[doc.type];
    if (!tool) return;
    setOpenDoc(null);
    setSearchParams({ tool });
    window.scrollTo(0, 0);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveType('all');
    setRamsSourceFilter('all');
  };

  // ─── Render ───
  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => undefined)}
      moduleName="Documents"
      hero={
        <SafetyPageHeader
          eyebrow="Documents"
          title="Find any record you've saved"
          description="Records you log, documents you generate and briefings you give — searchable and ready to export or hand over."
          tone="amber"
          actions={
            isRamsFilter ? (
              <PrimaryButton onClick={() => setUploadSheetOpen(true)}>Upload RAMS</PrimaryButton>
            ) : undefined
          }
        />
      }
      filter={
        documents.length > 0 ? (
          <div className="space-y-3">
            <FilterBar
              touch
              tabs={[
                { value: 'all', label: 'All', count: documents.length },
                ...(actionCount > 0
                  ? [{ value: 'action', label: 'Needs action', count: actionCount }]
                  : []),
                ...typeCounts.map(([type, count]) => ({
                  value: type,
                  label: TYPE_LABEL[type],
                  count,
                })),
              ]}
              activeTab={activeType}
              onTabChange={(v) => {
                setActiveType(v as TypeFilter);
                if (v !== 'RAMS') setRamsSourceFilter('all');
              }}
              search={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search by job, site, type or status"
            />

            {/* RAMS source sub-filter — only within RAMS */}
            {isRamsFilter && ramsDocuments.length > 0 && (
              <FilterBar
                touch
                tabs={[
                  { value: 'all', label: 'All sources', count: ramsDocuments.length },
                  { value: 'ai-generated', label: 'Generated', count: aiGeneratedCount },
                  { value: 'user-uploaded', label: 'Uploaded', count: uploadedCount },
                ]}
                activeTab={ramsSourceFilter}
                onTabChange={(v) => setRamsSourceFilter(v as RAMSSourceFilter)}
              />
            )}
          </div>
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <EmptyState
          touch
          title="Couldn't load your documents"
          description="Check your connection and try again. Nothing has been lost — your records are saved."
          action="Try again"
          onAction={() => refetch()}
        />
      ) : documents.length === 0 ? (
        <EmptyState
          touch
          title="No documents yet"
          description="Every permit, isolation, briefing, RAMS and check you save in Site Safety lands here, so you can find it by job or site and send the PDF in seconds."
          action="Back to Site Safety"
          onAction={onBack}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          touch
          title={searchTerm ? 'No documents match your search' : 'Nothing here yet'}
          description={
            searchTerm
              ? `Nothing matches “${searchTerm}”. Try a job name, site address or record type.`
              : 'No documents of this kind yet.'
          }
          action="Show everything"
          onAction={clearFilters}
        />
      ) : (
        <div className="space-y-3">
          <p className="text-[12px] text-white tabular-nums" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'document' : 'documents'}
            {activeType === 'all' && actionCount > 0 && ' · needing action listed first'}
          </p>
          <SafetyListCard
            className={cn(
              '-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x',
              'border-elec-yellow/35 bg-none divide-white/[0.08]',
              CARD_SURFACE,
              '[&>*]:bg-transparent'
            )}
          >
            {visible.map((doc) => {
              const isThisExporting = isExporting && exportingId === doc.sourceId;
              const tone = statusTone(doc.status);
              return (
                <div
                  key={`${doc.type}-${doc.id}`}
                  className="flex items-stretch transition-colors hover:bg-white/[0.04]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenDoc(doc)}
                    className="flex min-w-0 flex-1 items-start gap-3 px-4 py-3.5 text-left touch-manipulation [-webkit-tap-highlight-color:transparent] active:bg-white/[0.08] sm:px-6 sm:py-4"
                  >
                    {tone && (
                      <span
                        aria-hidden
                        className={cn('mt-1 h-9 w-[3px] shrink-0 rounded-full', toneDot[tone])}
                      />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-[14px] font-medium leading-snug text-white sm:text-[15px]">
                        {doc.title}
                      </span>
                      <span className="mt-1 block truncate text-[12px] text-white">
                        {TYPE_LABEL[doc.type]}
                        {doc.jobId && jobLabel.get(doc.jobId)
                          ? ` · ${jobLabel.get(doc.jobId)}`
                          : doc.siteAddress
                            ? ` · ${doc.siteAddress}`
                            : ''}
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <StatusPill status={doc.status} />
                        {doc.hasSignature && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border bg-white/[0.05] text-emerald-400 border-white/10">
                            Signed
                          </span>
                        )}
                        <span className="text-[11.5px] tabular-nums text-white">
                          {fmtRelative(doc.updatedAt)}
                        </span>
                      </span>
                    </span>
                  </button>
                  {doc.hasPDF && (
                    <button
                      type="button"
                      onClick={() => handleExport(doc)}
                      disabled={isThisExporting}
                      aria-label={`Download PDF of ${doc.title}`}
                      className="flex w-16 shrink-0 items-center justify-center border-l border-white/[0.06] text-[12px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.05] active:bg-white/[0.08] disabled:opacity-50"
                    >
                      {isThisExporting ? '…' : 'PDF'}
                    </button>
                  )}
                </div>
              );
            })}
          </SafetyListCard>
          {hasMore && <LoadMoreButton onLoadMore={loadMore} remaining={remaining} />}
        </div>
      )}

      {/* ─── Record sheet — what it is, and everything you can do with it ─── */}
      <Sheet open={!!openDoc} onOpenChange={(o) => !o && setOpenDoc(null)}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]"
        >
          {openDoc && (
            <SheetShell
              eyebrow={TYPE_LABEL[openDoc.type]}
              title={openDoc.title}
              description={
                <span className="inline-flex flex-wrap items-center gap-2">
                  <StatusPill status={openDoc.status} />
                  {openDoc.hasSignature && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border bg-white/[0.05] text-emerald-400 border-white/10">
                      Signed
                    </span>
                  )}
                </span>
              }
            >
              <dl className="space-y-2 text-[13px]">
                {openDoc.jobId && jobLabel.get(openDoc.jobId) && (
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 text-white">Job</dt>
                    <dd className="min-w-0 flex-1 font-medium text-white">
                      {jobLabel.get(openDoc.jobId)}
                    </dd>
                  </div>
                )}
                {openDoc.siteAddress && (
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 text-white">Site</dt>
                    <dd className="min-w-0 flex-1 font-medium text-white">{openDoc.siteAddress}</dd>
                  </div>
                )}
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-white">Created</dt>
                  <dd className="font-medium tabular-nums text-white">
                    {fmtFullDate(openDoc.createdAt)}
                  </dd>
                </div>
                {openDoc.updatedAt !== openDoc.createdAt && (
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 text-white">Updated</dt>
                    <dd className="font-medium tabular-nums text-white">
                      {fmtFullDate(openDoc.updatedAt)}
                    </dd>
                  </div>
                )}
              </dl>
              <div className="space-y-2 pt-1">
                {openDoc.hasPDF && (
                  <PrimaryButton
                    fullWidth
                    disabled={isExporting && exportingId === openDoc.sourceId}
                    onClick={() => handleExport(openDoc)}
                  >
                    {isExporting && exportingId === openDoc.sourceId
                      ? 'Preparing PDF…'
                      : 'Download PDF'}
                  </PrimaryButton>
                )}
                {openDoc.type === 'RAMS' && (
                  <SecondaryButton fullWidth onClick={() => openAmend(openDoc.sourceId)}>
                    Amend RAMS
                  </SecondaryButton>
                )}
                {getAvailableTransitions(openDoc).map((transition) => (
                  <SecondaryButton
                    key={transition.to}
                    fullWidth
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate(openDoc, transition.to)}
                  >
                    {isUpdating ? 'Saving…' : transition.label}
                  </SecondaryButton>
                ))}
                {TOOL_FOR_TYPE[openDoc.type] && (
                  <SecondaryButton fullWidth onClick={() => openTool(openDoc)}>
                    Go to {TYPE_LABEL[openDoc.type].toLowerCase()} records
                  </SecondaryButton>
                )}
              </div>
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      {/* ─── RAMS upload ─── */}
      <UserRAMSUpload
        open={uploadSheetOpen}
        onOpenChange={setUploadSheetOpen}
        onUploadComplete={() => {
          queryClient.invalidateQueries({ queryKey: ['all-safety-documents'] });
          setRamsSourceLoaded(false);
        }}
      />

      {/* ─── RAMS amend → editable results view ─── */}
      {selectedDocumentId && (
        <RAMSQuickEditDialog
          documentId={selectedDocumentId}
          isOpen={quickEditDialogOpen}
          onClose={() => {
            setQuickEditDialogOpen(false);
            setSelectedDocumentId(null);
            queryClient.invalidateQueries({ queryKey: ['all-safety-documents'] });
          }}
        />
      )}
    </SafetyModuleShell>
  );
}

export default DocumentHub;
