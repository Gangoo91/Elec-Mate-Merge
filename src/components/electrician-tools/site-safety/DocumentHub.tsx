import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  FileText,
  Download,
  Loader2,
  Check,
  X,
  AlertTriangle,
  Users,
  FolderOpen,
  CheckCircle,
  FileCheck,
  Upload,
  Sparkles,
  FileUp,
  Edit3,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  useAllSafetyDocuments,
  type DocumentType,
  type SafetyDocument,
} from '@/hooks/useAllSafetyDocuments';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { RAMSAmendDialog } from './ai-rams/RAMSAmendDialog';
import { RAMSQuickEditDialog } from './ai-rams/RAMSQuickEditDialog';
import { UserRAMSUpload } from './UserRAMSUpload';
import { cn } from '@/lib/utils';

interface DocumentHubProps {
  onBack: () => void;
}

const TYPE_CONFIG: Record<
  DocumentType,
  { colour: string; bg: string; border: string; icon: typeof FileText }
> = {
  Permit: {
    colour: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: FileText,
  },
  COSHH: {
    colour: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: FileText,
  },
  Inspection: {
    colour: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    icon: FileText,
  },
  Accident: {
    colour: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: FileText,
  },
  'Near Miss': {
    colour: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    icon: AlertTriangle,
  },
  Observation: {
    colour: 'text-lime-400',
    bg: 'bg-lime-500/10',
    border: 'border-lime-500/20',
    icon: FileText,
  },
  'Site Diary': {
    colour: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    icon: FileText,
  },
  Isolation: {
    colour: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    icon: FileText,
  },
  'Fire Watch': {
    colour: 'text-orange-300',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
    icon: FileText,
  },
  Equipment: {
    colour: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: FileText,
  },
  RAMS: {
    colour: 'text-amber-300',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    icon: FileText,
  },
  Briefing: {
    colour: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    icon: Users,
  },
};

// Status badge styles
const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-amber-500/15', text: 'text-amber-400', label: 'Draft' },
  open: { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'Open' },
  active: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Active' },
  in_progress: { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'In Progress' },
  submitted: { bg: 'bg-indigo-500/15', text: 'text-indigo-400', label: 'Submitted' },
  approved: { bg: 'bg-green-500/15', text: 'text-green-400', label: 'Approved' },
  reviewed: { bg: 'bg-green-500/15', text: 'text-green-400', label: 'Reviewed' },
  completed: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Completed' },
  closed: { bg: 'bg-white/10', text: 'text-white', label: 'Closed' },
  cancelled: { bg: 'bg-red-500/15', text: 'text-red-400', label: 'Cancelled' },
  expired: { bg: 'bg-red-500/15', text: 'text-red-400', label: 'Expired' },
  recorded: { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'Recorded' },
  scheduled: { bg: 'bg-purple-500/15', text: 'text-purple-400', label: 'Scheduled' },
  isolated: { bg: 'bg-orange-500/15', text: 'text-orange-400', label: 'Isolated' },
  re_energised: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Re-energised' },
};

// Table mapping for status updates — only tables that exist
const TABLE_MAP: Partial<Record<DocumentType, string>> = {
  'Near Miss': 'near_miss_reports',
  RAMS: 'rams_documents',
  Briefing: 'team_briefings',
};

// Approval transitions per document type
const STATUS_TRANSITIONS: Partial<
  Record<DocumentType, { from: string; to: string; label: string }[]>
> = {
  'Near Miss': [
    { from: 'open', to: 'in_progress', label: 'Mark In Progress' },
    { from: 'in_progress', to: 'closed', label: 'Close' },
    { from: 'open', to: 'closed', label: 'Close' },
  ],
  RAMS: [{ from: 'draft', to: 'approved', label: 'Approve' }],
};

// Only types with existing tables
const ALL_TYPES: (DocumentType | 'All')[] = ['All', 'RAMS', 'Near Miss', 'Briefing'];

type RAMSSourceFilter = 'all' | 'ai-generated' | 'user-uploaded';

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

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
  const [activeFilter, setActiveFilter] = useState<DocumentType | 'All'>('All');
  const [approvalDoc, setApprovalDoc] = useState<SafetyDocument | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // RAMS-specific state
  const [ramsSourceFilter, setRamsSourceFilter] = useState<RAMSSourceFilter>('all');
  const [uploadSheetOpen, setUploadSheetOpen] = useState(false);
  const [amendDialogOpen, setAmendDialogOpen] = useState(false);
  const [quickEditDialogOpen, setQuickEditDialogOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // Fetch RAMS source data for source tabs
  const [ramsSourceData, setRamsSourceData] = useState<Record<string, string>>({});
  const [ramsSourceLoaded, setRamsSourceLoaded] = useState(false);

  // Load RAMS source data when RAMS filter is active
  useEffect(() => {
    if (activeFilter !== 'RAMS' || ramsSourceLoaded) return;
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
  }, [activeFilter, ramsSourceLoaded]);

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

  // RAMS source counts
  const ramsDocuments = useMemo(() => documents.filter((d) => d.type === 'RAMS'), [documents]);
  const aiGeneratedCount = useMemo(
    () =>
      ramsDocuments.filter((d) => {
        const source = ramsSourceData[d.id] || 'ai-generated';
        return source === 'ai-generated';
      }).length,
    [ramsDocuments, ramsSourceData]
  );
  const uploadedCount = useMemo(
    () => ramsDocuments.filter((d) => ramsSourceData[d.id] === 'user-uploaded').length,
    [ramsDocuments, ramsSourceData]
  );

  const filtered = useMemo(() => {
    let result = documents;

    if (activeFilter !== 'All') {
      result = result.filter((d) => d.type === activeFilter);
    }

    // RAMS source filter
    if (activeFilter === 'RAMS' && ramsSourceFilter !== 'all') {
      result = result.filter((d) => {
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

    return result;
  }, [documents, activeFilter, searchTerm, ramsSourceFilter, ramsSourceData]);

  const handleExport = (doc: SafetyDocument) => {
    if (doc.hasPDF && doc.pdfType) {
      exportPDF(doc.pdfType as Parameters<typeof exportPDF>[0], doc.sourceId);
    }
  };

  const isRamsFilterActive = activeFilter === 'RAMS';

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
        </div>

        {/* Title + search */}
        <div className="px-4 pb-3 space-y-3">
          <div className="relative overflow-hidden glass-premium rounded-xl p-4">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="relative flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                <FolderOpen className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-white">Documents</h1>
                <p className="text-xs text-white mt-0.5">
                  {documents.length} document{documents.length !== 1 ? 's' : ''} across all modules
                </p>
              </div>
              {/* Upload RAMS button — visible when RAMS filter active */}
              {isRamsFilterActive && (
                <button
                  onClick={() => setUploadSheetOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow text-xs font-semibold touch-manipulation active:scale-[0.97] transition-all"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Upload
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 text-base touch-manipulation bg-white/[0.05] border-white/10 focus:border-elec-yellow focus:ring-elec-yellow"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-white/10 touch-manipulation"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Filter chips */}
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {ALL_TYPES.map((type) => {
              const isActive = activeFilter === type;
              return (
                <button
                  key={type}
                  onClick={() => {
                    setActiveFilter(type);
                    if (type !== 'RAMS') setRamsSourceFilter('all');
                  }}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all touch-manipulation active:scale-[0.97] ${
                    isActive
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white border border-white/10'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* RAMS source tabs — only when RAMS filter active */}
        {isRamsFilterActive && (
          <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              <button
                onClick={() => setRamsSourceFilter('all')}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all touch-manipulation active:scale-[0.97]',
                  ramsSourceFilter === 'all'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/[0.06] text-white border border-white/10'
                )}
              >
                All ({ramsDocuments.length})
              </button>
              <button
                onClick={() => setRamsSourceFilter('ai-generated')}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all touch-manipulation active:scale-[0.97] flex items-center gap-1',
                  ramsSourceFilter === 'ai-generated'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/[0.06] text-white border border-white/10'
                )}
              >
                <Sparkles className="h-3 w-3" />
                AI ({aiGeneratedCount})
              </button>
              <button
                onClick={() => setRamsSourceFilter('user-uploaded')}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all touch-manipulation active:scale-[0.97] flex items-center gap-1',
                  ramsSourceFilter === 'user-uploaded'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/[0.06] text-white border border-white/10'
                )}
              >
                <FileUp className="h-3 w-3" />
                Uploaded ({uploadedCount})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
            <p className="text-sm text-white">Loading documents...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">
              {searchTerm ? 'No Results' : 'No Documents'}
            </h3>
            <p className="text-sm text-white text-center max-w-xs">
              {searchTerm
                ? `No documents match "${searchTerm}"`
                : activeFilter !== 'All'
                  ? `No ${activeFilter} documents found. Create one from the tools above.`
                  : 'Your safety documents will appear here as you create them.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((doc, index) => {
              const config = TYPE_CONFIG[doc.type];
              const Icon = config.icon;
              const isThisExporting = isExporting && exportingId === doc.sourceId;
              const isRAMS = doc.type === 'RAMS';

              return (
                <motion.div
                  key={`${doc.type}-${doc.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Math.min(index * 0.02, 0.3),
                    duration: 0.15,
                  }}
                  className="glass-premium rounded-xl active:bg-white/[0.02] transition-colors touch-manipulation overflow-hidden"
                >
                  {/* Coloured top accent */}
                  <div className={`h-[2px] ${config.bg.replace('/10', '/40')}`} />

                  <div className="p-4 space-y-3">
                    {/* Top row: icon + title */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}
                      >
                        <Icon className={`h-5 w-5 ${config.colour}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-white leading-snug line-clamp-2">{doc.title}</h3>
                      </div>
                    </div>

                    {/* Middle: badges */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${config.bg} ${config.colour}`}>
                        {doc.type}
                      </span>
                      {(() => {
                        const statusStyle = STATUS_STYLES[doc.status] || {
                          bg: 'bg-white/10',
                          text: 'text-white',
                          label: doc.status,
                        };
                        return (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                            {statusStyle.label}
                          </span>
                        );
                      })()}
                      {doc.hasSignature && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400">
                          <Check className="h-3 w-3" />
                          Signed
                        </span>
                      )}
                    </div>

                    {/* Bottom row: metadata left, actions right */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[11px] text-white flex-shrink-0">
                          {formatRelativeDate(doc.updatedAt)}
                        </span>
                        {doc.siteAddress && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                            <span className="text-[11px] text-white truncate">
                              {doc.siteAddress}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        {isRAMS && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDocumentId(doc.sourceId);
                              setAmendDialogOpen(true);
                            }}
                            className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center touch-manipulation active:scale-[0.95] transition-all"
                          >
                            <Edit3 className="h-4 w-4 text-blue-400" />
                          </button>
                        )}
                        {getAvailableTransitions(doc).length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setApprovalDoc(doc);
                            }}
                            className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center touch-manipulation active:scale-[0.95] transition-all"
                          >
                            <FileCheck className="h-4 w-4 text-emerald-400" />
                          </button>
                        )}
                        {doc.hasPDF && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExport(doc);
                            }}
                            disabled={isThisExporting}
                            className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center touch-manipulation active:scale-[0.95] active:bg-white/[0.10] transition-all disabled:opacity-50"
                          >
                            {isThisExporting ? (
                              <Loader2 className="h-4 w-4 text-white animate-spin" />
                            ) : (
                              <Download className="h-4 w-4 text-white" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Approval bottom sheet */}
      <Sheet open={!!approvalDoc} onOpenChange={() => setApprovalDoc(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl bg-background border-white/10">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-white text-left">Update Status</SheetTitle>
          </SheetHeader>
          {approvalDoc && (
            <div className="space-y-3 pb-6">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-sm font-semibold text-white">{approvalDoc.title}</p>
                <p className="text-xs text-white mt-1">
                  {approvalDoc.type} — Currently:{' '}
                  {STATUS_STYLES[approvalDoc.status]?.label || approvalDoc.status}
                </p>
              </div>
              {getAvailableTransitions(approvalDoc).map((transition) => (
                <Button
                  key={transition.to}
                  onClick={() => handleStatusUpdate(approvalDoc, transition.to)}
                  disabled={isUpdating}
                  className="w-full h-12 text-base touch-manipulation bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  {transition.label}
                </Button>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* RAMS Upload Sheet */}
      <UserRAMSUpload
        open={uploadSheetOpen}
        onOpenChange={setUploadSheetOpen}
        onUploadComplete={() => {
          queryClient.invalidateQueries({ queryKey: ['all-safety-documents'] });
          setRamsSourceLoaded(false);
        }}
      />

      {/* RAMS Amend Dialogs */}
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
    </div>
  );
}

export default DocumentHub;
