import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  FileText,
  Download,
  Loader2,
  Check,
  X,
  Shield,
  FlaskConical,
  ClipboardCheck,
  BookOpen,
  AlertTriangle,
  Eye,
  CalendarDays,
  Zap,
  Flame,
  Wrench,
  Users,
  FolderOpen,
  ChevronRight,
  CheckCircle,
  Clock,
  FileCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
    icon: Shield,
  },
  COSHH: {
    colour: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: FlaskConical,
  },
  Inspection: {
    colour: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    icon: ClipboardCheck,
  },
  Accident: {
    colour: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: BookOpen,
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
    icon: Eye,
  },
  'Site Diary': {
    colour: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    icon: CalendarDays,
  },
  Isolation: {
    colour: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    icon: Zap,
  },
  'Fire Watch': {
    colour: 'text-orange-300',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
    icon: Flame,
  },
  Equipment: {
    colour: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: Wrench,
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

// Table mapping for status updates
const TABLE_MAP: Partial<Record<DocumentType, string>> = {
  Permit: 'permits_to_work',
  COSHH: 'coshh_assessments',
  Inspection: 'inspection_checklists',
  Accident: 'accident_records',
  'Near Miss': 'near_miss_reports',
  Observation: 'safety_observations',
  'Site Diary': 'electrician_site_diary',
  Isolation: 'safe_isolation_records',
  'Fire Watch': 'fire_watch_records',
  Equipment: 'safety_equipment',
  RAMS: 'rams_documents',
  Briefing: 'team_briefings',
};

// Approval transitions per document type
const STATUS_TRANSITIONS: Partial<Record<DocumentType, { from: string; to: string; label: string }[]>> = {
  Permit: [
    { from: 'active', to: 'closed', label: 'Close Permit' },
  ],
  COSHH: [
    { from: 'draft', to: 'reviewed', label: 'Mark Reviewed' },
  ],
  Inspection: [
    { from: 'draft', to: 'reviewed', label: 'Mark Reviewed' },
  ],
  'Near Miss': [
    { from: 'open', to: 'in_progress', label: 'Mark In Progress' },
    { from: 'in_progress', to: 'closed', label: 'Close' },
    { from: 'open', to: 'closed', label: 'Close' },
  ],
  Observation: [
    { from: 'open', to: 'in_progress', label: 'Mark In Progress' },
    { from: 'in_progress', to: 'closed', label: 'Close' },
    { from: 'open', to: 'closed', label: 'Close' },
  ],
  RAMS: [
    { from: 'draft', to: 'approved', label: 'Approve' },
  ],
  Accident: [
    { from: 'recorded', to: 'closed', label: 'Close Record' },
  ],
};

const ALL_TYPES: (DocumentType | 'All')[] = [
  'All',
  'Permit',
  'COSHH',
  'Inspection',
  'Accident',
  'Near Miss',
  'Observation',
  'Site Diary',
  'Isolation',
  'Fire Watch',
  'Equipment',
  'RAMS',
  'Briefing',
];

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

  const filtered = useMemo(() => {
    let result = documents;

    if (activeFilter !== 'All') {
      result = result.filter((d) => d.type === activeFilter);
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
  }, [documents, activeFilter, searchTerm]);

  const handleExport = (doc: SafetyDocument) => {
    if (doc.hasPDF && doc.pdfType) {
      exportPDF(doc.pdfType as Parameters<typeof exportPDF>[0], doc.sourceId);
    }
  };

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
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <FolderOpen className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Documents</h1>
              <p className="text-xs text-white">
                {documents.length} document{documents.length !== 1 ? 's' : ''} across all modules
              </p>
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
                  onClick={() => setActiveFilter(type)}
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
          <div className="space-y-2">
            {filtered.map((doc, index) => {
              const config = TYPE_CONFIG[doc.type];
              const Icon = config.icon;
              const isThisExporting = isExporting && exportingId === doc.sourceId;

              return (
                <motion.div
                  key={`${doc.type}-${doc.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Math.min(index * 0.02, 0.3),
                    duration: 0.15,
                  }}
                  className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 active:bg-white/[0.06] transition-colors touch-manipulation"
                >
                  <div className="flex items-start gap-3">
                    {/* Type icon */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl ${config.bg} ${config.border} border flex items-center justify-center`}
                    >
                      <Icon className={`h-4 w-4 ${config.colour}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <Badge
                          className={`${config.bg} ${config.colour} ${config.border} border text-[9px] px-1.5 py-0`}
                        >
                          {doc.type}
                        </Badge>
                        {(() => {
                          const statusStyle = STATUS_STYLES[doc.status] || {
                            bg: 'bg-white/10',
                            text: 'text-white',
                            label: doc.status,
                          };
                          return (
                            <Badge
                              className={`${statusStyle.bg} ${statusStyle.text} text-[9px] px-1.5 py-0 border-0`}
                            >
                              {statusStyle.label}
                            </Badge>
                          );
                        })()}
                        {doc.hasSignature && (
                          <Check className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-white truncate">{doc.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[11px] text-white">
                          {formatRelativeDate(doc.updatedAt)}
                        </span>
                        {doc.siteAddress && (
                          <span className="text-[11px] text-white truncate max-w-[140px]">
                            {doc.siteAddress}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      {/* Approval button */}
                      {getAvailableTransitions(doc).length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setApprovalDoc(doc);
                          }}
                          className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center touch-manipulation active:scale-[0.95] transition-all"
                        >
                          <FileCheck className="h-4 w-4 text-emerald-400" />
                        </button>
                      )}

                      {/* Export button */}
                      {doc.hasPDF && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExport(doc);
                          }}
                          disabled={isThisExporting}
                          className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center touch-manipulation active:scale-[0.95] active:bg-white/[0.1] transition-all disabled:opacity-50"
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
    </div>
  );
}

export default DocumentHub;
