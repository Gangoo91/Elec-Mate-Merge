import { useState, useMemo, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  useAllSafetyDocuments,
  type DocumentType,
  type SafetyDocument,
} from '@/hooks/useAllSafetyDocuments';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useShowMore } from '@/hooks/useShowMore';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

import { Sheet, SheetContent } from '@/components/ui/sheet';

import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingState,
  ListCard,
  ListRow,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  type Tone,
} from '@/components/college/primitives';

import { SafetyModuleShell } from './common/SafetyModuleShell';
import { LoadMoreButton } from './common/LoadMoreButton';
import { RAMSAmendDialog } from './ai-rams/RAMSAmendDialog';
import { RAMSQuickEditDialog } from './ai-rams/RAMSQuickEditDialog';
import { UserRAMSUpload } from './UserRAMSUpload';

interface DocumentHubProps {
  onBack?: () => void;
}

/* ────────────────────────────────────────────────────────
   Families — collapse the 12-colour per-type palette into
   three meaningful groups. Colour never rides on family; it
   rides on status only (see statusTone below).
   ──────────────────────────────────────────────────────── */

type Family = 'generate' | 'record' | 'reference';

const FAMILY_OF: Record<DocumentType, Family> = {
  // Things you produce / author
  RAMS: 'generate',
  COSHH: 'generate',
  // Things you log as they happen
  'Near Miss': 'record',
  Accident: 'record',
  Observation: 'record',
  'Site Diary': 'record',
  Inspection: 'record',
  Isolation: 'record',
  'Fire Watch': 'record',
  Permit: 'record',
  Equipment: 'record',
  // Things you brief from / refer to
  Briefing: 'reference',
};

const FAMILY_LABEL: Record<Family, string> = {
  generate: 'Generate',
  record: 'Record',
  reference: 'Reference',
};

/* ────────────────────────────────────────────────────────
   Status — the single colour dimension
   ──────────────────────────────────────────────────────── */

// Map every status to a tone + display label.
const STATUS_TONE: Record<string, Tone | 'neutral'> = {
  draft: 'amber',
  open: 'blue',
  active: 'green',
  in_progress: 'blue',
  submitted: 'indigo',
  approved: 'green',
  reviewed: 'green',
  completed: 'green',
  closed: 'neutral',
  cancelled: 'red',
  expired: 'red',
  recorded: 'blue',
  scheduled: 'purple',
  isolated: 'orange',
  re_energised: 'green',
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
};

const STATUS_PILL: Record<Tone | 'neutral', string> = {
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
  yellow: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
  neutral: 'bg-white/[0.05] text-white/55 border-white/10',
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

const TABLE_MAP: Partial<Record<DocumentType, string>> = {
  'Near Miss': 'near_miss_reports',
  RAMS: 'rams_documents',
  Briefing: 'team_briefings',
};

const STATUS_TRANSITIONS: Partial<
  Record<DocumentType, { from: string; to: string; label: string }[]>
> = {
  'Near Miss': [
    { from: 'open', to: 'in_progress', label: 'Mark in progress' },
    { from: 'in_progress', to: 'closed', label: 'Close' },
    { from: 'open', to: 'closed', label: 'Close' },
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

export function DocumentHub({ onBack }: DocumentHubProps) {
  const { data: documents = [], isLoading } = useAllSafetyDocuments();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFamily, setActiveFamily] = useState<Family | 'all'>('all');
  const [approvalDoc, setApprovalDoc] = useState<SafetyDocument | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // RAMS-specific state
  const [ramsSourceFilter, setRamsSourceFilter] = useState<RAMSSourceFilter>('all');
  const [uploadSheetOpen, setUploadSheetOpen] = useState(false);
  const [amendDialogOpen, setAmendDialogOpen] = useState(false);
  const [quickEditDialogOpen, setQuickEditDialogOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // RAMS source map (ai-generated vs user-uploaded)
  const [ramsSourceData, setRamsSourceData] = useState<Record<string, string>>({});
  const [ramsSourceLoaded, setRamsSourceLoaded] = useState(false);

  const isGenerateFamily = activeFamily === 'generate';

  useEffect(() => {
    if (!isGenerateFamily || ramsSourceLoaded) return;
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
  }, [isGenerateFamily, ramsSourceLoaded]);

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
        toast({ title: 'Status updated', description: `Document marked as ${newStatus}` });
        setApprovalDoc(null);
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

  // ─── Family counts ───
  const familyCounts = useMemo(() => {
    const c: Record<Family, number> = { generate: 0, record: 0, reference: 0 };
    for (const d of documents) c[FAMILY_OF[d.type]] += 1;
    return c;
  }, [documents]);

  // ─── RAMS source counts (within Generate) ───
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

    if (activeFamily !== 'all') {
      result = result.filter((d) => FAMILY_OF[d.type] === activeFamily);
    }

    // RAMS source filter (only meaningful within Generate)
    if (isGenerateFamily && ramsSourceFilter !== 'all') {
      result = result.filter((d) => {
        if (d.type !== 'RAMS') return false;
        const source = ramsSourceData[d.id] || 'ai-generated';
        return source === ramsSourceFilter;
      });
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(term) ||
          d.type.toLowerCase().includes(term) ||
          d.siteAddress?.toLowerCase().includes(term)
      );
    }

    // Urgent / live first, then by recency.
    return [...result].sort((a, b) => {
      const ua = URGENT_STATUSES.has(a.status) ? 0 : 1;
      const ub = URGENT_STATUSES.has(b.status) ? 0 : 1;
      if (ua !== ub) return ua - ub;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [documents, activeFamily, isGenerateFamily, ramsSourceFilter, ramsSourceData, searchTerm]);

  const { visible, hasMore, remaining, loadMore } = useShowMore(filtered);

  const handleExport = (doc: SafetyDocument) => {
    if (doc.hasPDF && doc.pdfType) {
      exportPDF(doc.pdfType as Parameters<typeof exportPDF>[0], doc.sourceId);
    }
  };

  const openAmend = (sourceId: string) => {
    setSelectedDocumentId(sourceId);
    setAmendDialogOpen(true);
  };

  // ─── Render ───
  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => undefined)}
      moduleName="Document Hub"
      trailing={
        documents.length > 0 ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border bg-white/[0.05] text-white/55 border-white/10 tabular-nums">
            {documents.length}
          </span>
        ) : undefined
      }
      hero={
        <PageHero
          eyebrow="Document Hub"
          title="Every safety document in one place"
          description="Records you log, documents you generate and references you brief from — grouped, searchable and ready to export or hand over."
          tone="amber"
          actions={
            isGenerateFamily ? (
              <PrimaryButton onClick={() => setUploadSheetOpen(true)}>Upload RAMS</PrimaryButton>
            ) : undefined
          }
        />
      }
      stats={
        documents.length > 0 ? (
          <StatStrip
            columns={4}
            stats={[
              {
                value: familyCounts.generate,
                label: 'Generate',
                onClick: () => {
                  setActiveFamily('generate');
                  setRamsSourceFilter('all');
                },
              },
              {
                value: familyCounts.record,
                label: 'Record',
                accent: true,
                onClick: () => setActiveFamily('record'),
              },
              {
                value: familyCounts.reference,
                label: 'Reference',
                onClick: () => setActiveFamily('reference'),
              },
              { value: documents.length, label: 'Total', onClick: () => setActiveFamily('all') },
            ]}
          />
        ) : undefined
      }
      filter={
        documents.length > 0 ? (
          <div className="space-y-3">
            <FilterBar
              tabs={[
                { value: 'all', label: 'All', count: documents.length },
                { value: 'generate', label: 'Generate', count: familyCounts.generate },
                { value: 'record', label: 'Record', count: familyCounts.record },
                { value: 'reference', label: 'Reference', count: familyCounts.reference },
              ]}
              activeTab={activeFamily}
              onTabChange={(v) => {
                setActiveFamily(v as Family | 'all');
                if (v !== 'generate') setRamsSourceFilter('all');
              }}
              search={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search documents…"
            />

            {/* RAMS source sub-filter — only within Generate */}
            {isGenerateFamily && ramsDocuments.length > 0 && (
              <FilterBar
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
      ) : documents.length === 0 ? (
        <EmptyState
          title="No documents yet"
          description="Your safety records, RAMS and briefings will appear here as you create them across the Site Safety tools."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={searchTerm ? 'No documents match your search' : 'Nothing in this group yet'}
          description={
            searchTerm
              ? `No documents match “${searchTerm}”.`
              : activeFamily !== 'all'
                ? `No ${FAMILY_LABEL[activeFamily as Family]} documents found. Create one from the Site Safety tools.`
                : 'Try a different group or clear your search.'
          }
        />
      ) : (
        <div className="space-y-3">
          <ListCard>
            {visible.map((doc) => {
              const family = FAMILY_OF[doc.type];
              const transitions = getAvailableTransitions(doc);
              const isRAMS = doc.type === 'RAMS';
              const isThisExporting = isExporting && exportingId === doc.sourceId;
              return (
                <ListRow
                  key={`${doc.type}-${doc.id}`}
                  accent={statusTone(doc.status)}
                  title={doc.title}
                  subtitle={
                    <span className="inline-flex items-center gap-1.5">
                      <span className="uppercase tracking-[0.1em] text-[10.5px] text-white/45">
                        {FAMILY_LABEL[family]}
                      </span>
                      <span className="text-white/25" aria-hidden>
                        ·
                      </span>
                      <span>{doc.type}</span>
                      {doc.siteAddress && (
                        <>
                          <span className="text-white/25" aria-hidden>
                            ·
                          </span>
                          <span className="truncate">{doc.siteAddress}</span>
                        </>
                      )}
                      <span className="text-white/25" aria-hidden>
                        ·
                      </span>
                      <span className="tabular-nums text-white/45">{fmtRelative(doc.updatedAt)}</span>
                    </span>
                  }
                  trailing={
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-1.5">
                        {doc.hasSignature && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border bg-emerald-500/10 text-emerald-400 border-emerald-500/25">
                            Signed
                          </span>
                        )}
                        <StatusPill status={doc.status} />
                      </div>
                      <div className="flex items-center gap-3">
                        {isRAMS && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openAmend(doc.sourceId);
                            }}
                            className="text-[11.5px] font-medium text-white/55 hover:text-elec-yellow transition-colors touch-manipulation"
                          >
                            Amend
                          </button>
                        )}
                        {transitions.length > 0 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setApprovalDoc(doc);
                            }}
                            className="text-[11.5px] font-medium text-emerald-400/85 hover:text-emerald-400 transition-colors touch-manipulation"
                          >
                            {transitions[0].label}
                          </button>
                        )}
                        {doc.hasPDF && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExport(doc);
                            }}
                            disabled={isThisExporting}
                            className="text-[11.5px] font-semibold text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation disabled:opacity-50"
                          >
                            {isThisExporting ? 'Exporting…' : 'PDF'}
                          </button>
                        )}
                      </div>
                    </div>
                  }
                />
              );
            })}
          </ListCard>
          {hasMore && <LoadMoreButton onLoadMore={loadMore} remaining={remaining} />}
        </div>
      )}

      {/* ─── Status update sheet ─── */}
      <Sheet open={!!approvalDoc} onOpenChange={(o) => !o && setApprovalDoc(null)}>
        <SheetContent side="bottom" className="h-auto max-h-[80vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          {approvalDoc && (
            <SheetShell
              eyebrow={`${FAMILY_LABEL[FAMILY_OF[approvalDoc.type]]} · ${approvalDoc.type}`}
              title="Update status"
              description={
                <span className="inline-flex items-center gap-2">
                  <span>Currently</span>
                  <StatusPill status={approvalDoc.status} />
                </span>
              }
            >
              <div className="text-[13px] text-white/85">{approvalDoc.title}</div>
              <div className="space-y-2 pt-1">
                {getAvailableTransitions(approvalDoc).map((transition) => (
                  <PrimaryButton
                    key={transition.to}
                    fullWidth
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate(approvalDoc, transition.to)}
                  >
                    {isUpdating ? 'Saving…' : transition.label}
                  </PrimaryButton>
                ))}
                <SecondaryButton fullWidth onClick={() => setApprovalDoc(null)}>
                  Cancel
                </SecondaryButton>
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

      {/* ─── RAMS amend / quick-edit ─── */}
      {selectedDocumentId && (
        <>
          <RAMSAmendDialog
            documentId={selectedDocumentId}
            isOpen={amendDialogOpen}
            onClose={() => {
              setAmendDialogOpen(false);
              setSelectedDocumentId(null);
            }}
            onQuickEdit={() => {
              setAmendDialogOpen(false);
              setQuickEditDialogOpen(true);
            }}
          />
          <RAMSQuickEditDialog
            documentId={selectedDocumentId}
            isOpen={quickEditDialogOpen}
            onClose={() => {
              setQuickEditDialogOpen(false);
              setSelectedDocumentId(null);
              queryClient.invalidateQueries({ queryKey: ['all-safety-documents'] });
            }}
          />
        </>
      )}
    </SafetyModuleShell>
  );
}

export default DocumentHub;
