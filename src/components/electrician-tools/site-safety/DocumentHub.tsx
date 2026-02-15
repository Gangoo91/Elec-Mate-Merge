import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  useAllSafetyDocuments,
  type DocumentType,
  type SafetyDocument,
} from '@/hooks/useAllSafetyDocuments';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<DocumentType | 'All'>('All');

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
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge
                          className={`${config.bg} ${config.colour} ${config.border} border text-[9px] px-1.5 py-0`}
                        >
                          {doc.type}
                        </Badge>
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

                    {/* Export button */}
                    {doc.hasPDF && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExport(doc);
                        }}
                        disabled={isThisExporting}
                        className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center touch-manipulation active:scale-[0.95] active:bg-white/[0.1] transition-all disabled:opacity-50"
                      >
                        {isThisExporting ? (
                          <Loader2 className="h-4 w-4 text-white animate-spin" />
                        ) : (
                          <Download className="h-4 w-4 text-white" />
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentHub;
