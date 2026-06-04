import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  FileText,
  Shield,
  ClipboardCheck,
  Wrench,
  BookOpen,
  ChevronRight,
  Loader2,
  FolderOpen,
  Edit3,
  AlertTriangle,
  ListChecks,
  Footprints,
  Share2,
  Clock,
  Calendar,
  Layers,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  useSafetyTemplates,
  useUserSafetyDocuments,
  type SafetyTemplate,
  type UserSafetyDocument,
} from '@/hooks/useSafetyTemplates';
import { getTemplateStats } from '@/utils/safety-template-renderer';
import { SafetyTemplateViewer } from './SafetyTemplateViewer';
import { SafetyTemplateEditor } from './SafetyTemplateEditor';
import { SafetyEmptyState } from '../common/SafetyEmptyState';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';

interface SafetyTemplateLibraryProps {
  onBack: () => void;
}

type Tab = 'browse' | 'my-docs';

const CATEGORIES = [
  { key: 'Risk Assessment', icon: Shield, colour: 'text-red-400' },
  { key: 'Method Statement', icon: FileText, colour: 'text-blue-400' },
  { key: 'Safe System of Work', icon: Wrench, colour: 'text-amber-400' },
  { key: 'Checklist', icon: ClipboardCheck, colour: 'text-green-400' },
];

const STATUS_COLOUR: Record<string, string> = {
  Draft: 'text-amber-400 bg-amber-500/10',
  Active: 'text-green-400 bg-green-500/10',
  'Review Due': 'text-orange-400 bg-orange-500/10',
  Archived: 'text-white bg-white/[0.06]',
};

function StatChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  if (value === 0) return null;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] text-white bg-white/[0.06] px-1.5 py-0.5 rounded"
      title={label}
    >
      <Icon className="h-3 w-3" />
      {value}
    </span>
  );
}

function relativeDate(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${Math.floor(diffMonths / 12)}y ago`;
}

function reviewDateWarning(reviewDate: string | null): 'overdue' | 'soon' | null {
  if (!reviewDate) return null;
  const now = Date.now();
  const review = new Date(reviewDate).getTime();
  if (review < now) return 'overdue';
  if (review - now < 30 * 24 * 60 * 60 * 1000) return 'soon';
  return null;
}

export function SafetyTemplateLibrary({ onBack }: SafetyTemplateLibraryProps) {
  const [tab, setTab] = useState<Tab>('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewingTemplate, setViewingTemplate] = useState<SafetyTemplate | null>(null);
  const [editingDocument, setEditingDocument] = useState<UserSafetyDocument | null>(null);
  const [sharingDocument, setSharingDocument] = useState<UserSafetyDocument | null>(null);

  const { data: templates, isLoading } = useSafetyTemplates(selectedCategory ?? undefined);
  const { data: userDocs, isLoading: userDocsLoading } = useUserSafetyDocuments();

  const filtered = (templates ?? []).filter((t) =>
    searchTerm
      ? t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const filteredDocs = (userDocs ?? []).filter((d) =>
    searchTerm ? d.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  const adoptedTemplateIds = new Set((userDocs ?? []).map((d) => d.template_id).filter(Boolean));

  if (viewingTemplate) {
    return (
      <SafetyTemplateViewer
        template={viewingTemplate}
        onBack={() => setViewingTemplate(null)}
        isAdopted={adoptedTemplateIds.has(viewingTemplate.id)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
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
      </div>

      <div className="px-4 space-y-6">
        {/* Editorial hero */}
        <div className="space-y-2 pt-2">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Safety templates
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-tight leading-[1.05] text-white">
            Skip the writing.
          </h1>
          <p className="text-[13.5px] text-white/65 leading-relaxed max-w-xl">
            UK electrical safety documents grounded in BS 7671 + HSE guidance. Adopt, fill your
            company details, and you've got an inspector-ready document — no writing from scratch.
          </p>
        </div>

        {/* 3-stat value strip */}
        <div className="-mx-4 sm:mx-0 grid grid-cols-3 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-5 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Available
            </div>
            <div className="mt-2 text-[24px] sm:text-[28px] font-semibold tabular-nums tracking-tight leading-none text-elec-yellow">
              {(templates ?? []).length}
            </div>
          </div>
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-5 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Adopted
            </div>
            <div className="mt-2 text-[24px] sm:text-[28px] font-semibold tabular-nums tracking-tight leading-none text-emerald-400">
              {(userDocs ?? []).length}
            </div>
          </div>
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-5 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Time saved
            </div>
            <div className="mt-2 text-[24px] sm:text-[28px] font-semibold tabular-nums tracking-tight leading-none text-white">
              ~{(userDocs ?? []).length * 4}h
            </div>
          </div>
        </div>

        {/* Editorial tab switcher — underline style */}
        <div className="grid grid-cols-2 border-b border-white/[0.08]">
          <button
            type="button"
            onClick={() => setTab('browse')}
            className={`h-12 border-b-2 transition-colors touch-manipulation text-[12px] font-semibold uppercase tracking-[0.18em] ${
              tab === 'browse'
                ? 'border-elec-yellow text-elec-yellow'
                : 'border-transparent text-white/55 hover:text-white'
            }`}
          >
            Browse
          </button>
          <button
            type="button"
            onClick={() => setTab('my-docs')}
            className={`h-12 border-b-2 transition-colors touch-manipulation text-[12px] font-semibold uppercase tracking-[0.18em] inline-flex items-center justify-center gap-2 ${
              tab === 'my-docs'
                ? 'border-elec-yellow text-elec-yellow'
                : 'border-transparent text-white/55 hover:text-white'
            }`}
          >
            Your adopted
            {(userDocs ?? []).length > 0 && (
              <span className="text-[11px] font-medium tabular-nums text-white/55">
                {(userDocs ?? []).length}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          <Input
            placeholder={tab === 'browse' ? 'Search templates...' : 'Search my documents...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white"
          />
        </div>

        {tab === 'browse' ? (
          <>
            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap touch-manipulation transition-all ${
                  selectedCategory === null
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.06] text-white border border-white/[0.08]'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(selectedCategory === cat.key ? null : cat.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap touch-manipulation transition-all ${
                    selectedCategory === cat.key
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white border border-white/[0.08]'
                  }`}
                >
                  {cat.key}
                </button>
              ))}
            </div>

            {/* Templates list */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            ) : filtered.length === 0 ? (
              <SafetyEmptyState
                icon={BookOpen}
                heading="No Templates Found"
                description={
                  searchTerm
                    ? `No templates match "${searchTerm}"`
                    : 'No templates available in this category'
                }
              />
            ) : (
              <div className="space-y-3 pb-8">
                {filtered.map((template) => {
                  const isAdopted = adoptedTemplateIds.has(template.id);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const v2: any = (template as any).structured_content_v2;
                  const hasV2 = !!v2 && (template.version >= 2 || Array.isArray(v2.hazards));
                  const v2Hazards = hasV2 && Array.isArray(v2.hazards) ? v2.hazards.length : 0;
                  const v2Steps =
                    hasV2 && Array.isArray(v2.method_steps) ? v2.method_steps.length : 0;
                  const stats = getTemplateStats(template.structured_content);
                  const hazardCount = v2Hazards > 0 ? v2Hazards : stats.hazards;
                  const stepCount = v2Steps > 0 ? v2Steps : stats.steps;

                  return (
                    <motion.button
                      key={template.id}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setViewingTemplate(template)}
                      className="w-full text-left bg-[hsl(0_0%_10%)] border border-white/[0.08] sm:rounded-2xl hover:border-white/15 active:bg-[hsl(0_0%_12%)] transition-colors touch-manipulation"
                    >
                      <div className="p-4 sm:p-5 space-y-3">
                        {/* Pills row */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] bg-white/[0.05] text-white/85">
                            {template.category}
                          </span>
                          {hasV2 && (
                            <span className="inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] bg-elec-yellow/15 text-elec-yellow">
                              BS 7671 compliant
                            </span>
                          )}
                          {isAdopted && (
                            <span className="inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] bg-emerald-500/15 text-emerald-400">
                              Adopted
                            </span>
                          )}
                          {template.work_type && (
                            <span className="inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-medium uppercase tracking-[0.12em] text-white/45">
                              {template.work_type}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white leading-snug">
                          {template.name}
                        </h3>

                        {/* Summary */}
                        {template.summary && (
                          <p className="text-[13px] text-white/65 leading-relaxed line-clamp-2">
                            {template.summary}
                          </p>
                        )}

                        {/* Stats row (editorial, monochrome) */}
                        {(hazardCount > 0 || stepCount > 0) && (
                          <div className="flex items-baseline gap-4 text-[11.5px] text-white/55 tabular-nums">
                            {hazardCount > 0 && (
                              <span>
                                <span className="text-white">{hazardCount}</span> hazards
                              </span>
                            )}
                            {stepCount > 0 && (
                              <span>
                                <span className="text-white">{stepCount}</span> steps
                              </span>
                            )}
                            {stats.ppeItems > 0 && (
                              <span>
                                <span className="text-white">{stats.ppeItems}</span> PPE items
                              </span>
                            )}
                          </div>
                        )}

                        {/* Regulation pills — editorial, monochrome */}
                        {template.regulatory_references.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/[0.06]">
                            {template.regulatory_references.slice(0, 4).map((ref) => (
                              <span
                                key={ref}
                                className="inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-medium tabular-nums bg-[hsl(0_0%_13%)] border border-white/[0.10] text-white/85"
                              >
                                {ref}
                              </span>
                            ))}
                            {template.regulatory_references.length > 4 && (
                              <span className="text-[10.5px] text-white/45 tabular-nums">
                                +{template.regulatory_references.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* My Documents tab */
          <>
            {userDocsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            ) : filteredDocs.length === 0 ? (
              <SafetyEmptyState
                icon={FolderOpen}
                heading={searchTerm ? 'No Documents Found' : 'No Documents Yet'}
                description={
                  searchTerm
                    ? `No documents match "${searchTerm}"`
                    : 'Adopt a template from the Browse tab to create your first safety document.'
                }
              />
            ) : (
              <div className="space-y-3 pb-8">
                {filteredDocs.map((doc) => {
                  const stats = getTemplateStats(doc.structured_content);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const v2: any = (doc as any).structured_content_v2;
                  const isV2Doc =
                    !!v2 && (doc.version === 2 || Array.isArray(v2.hazards));
                  const v2H = isV2Doc && Array.isArray(v2.hazards) ? v2.hazards.length : 0;
                  const v2S =
                    isV2Doc && Array.isArray(v2.method_steps) ? v2.method_steps.length : 0;
                  const hazardCount = v2H > 0 ? v2H : stats.hazards;
                  const stepCount = v2S > 0 ? v2S : stats.steps;
                  const reviewWarning = reviewDateWarning(doc.review_date);

                  return (
                    <motion.div
                      key={doc.id}
                      whileTap={{ scale: 0.99 }}
                      className="bg-[hsl(0_0%_10%)] border border-white/[0.08] sm:rounded-2xl hover:border-white/15 transition-colors touch-manipulation"
                    >
                      <button
                        onClick={() => setEditingDocument(doc)}
                        className="w-full text-left p-4 sm:p-5 space-y-3"
                      >
                        {/* Pills row */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] ${
                              STATUS_COLOUR[doc.status] ?? STATUS_COLOUR.Draft
                            }`}
                          >
                            {doc.status}
                          </span>
                          {isV2Doc && (
                            <span className="inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] bg-elec-yellow/15 text-elec-yellow">
                              BS 7671 compliant
                            </span>
                          )}
                          {reviewWarning === 'overdue' && (
                            <span className="inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] bg-red-500/15 text-red-400">
                              Review overdue
                            </span>
                          )}
                          {reviewWarning === 'soon' && (
                            <span className="inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] bg-amber-500/15 text-amber-400">
                              Review due
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white leading-snug">
                          {doc.name}
                        </h3>

                        {/* Meta row: company + last edited */}
                        <div className="flex items-baseline gap-2 text-[11.5px] text-white/55 tabular-nums">
                          {doc.company_name && (
                            <span className="truncate">{doc.company_name}</span>
                          )}
                          {doc.company_name && doc.updated_at && (
                            <span className="text-white/30">·</span>
                          )}
                          {doc.updated_at && (
                            <span className="shrink-0">{relativeDate(doc.updated_at)}</span>
                          )}
                        </div>

                        {/* Stats row */}
                        {(hazardCount > 0 || stepCount > 0 || stats.checkItems > 0) && (
                          <div className="flex items-baseline gap-4 pt-2 border-t border-white/[0.06] text-[11.5px] text-white/55 tabular-nums">
                            {hazardCount > 0 && (
                              <span>
                                <span className="text-white">{hazardCount}</span> hazards
                              </span>
                            )}
                            {stepCount > 0 && (
                              <span>
                                <span className="text-white">{stepCount}</span> steps
                              </span>
                            )}
                            {stats.checkItems > 0 && (
                              <span>
                                <span className="text-white">{stats.checkItems}</span> checks
                              </span>
                            )}
                          </div>
                        )}
                      </button>

                      {/* Action buttons row — editorial text links */}
                      <div className="flex items-center gap-5 px-4 sm:px-5 pb-4 border-t border-white/[0.06] pt-3">
                        <button
                          type="button"
                          onClick={() => setEditingDocument(doc)}
                          className="text-[12px] font-semibold text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation"
                        >
                          Edit
                        </button>
                        {isV2Doc ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSharingDocument(doc);
                            }}
                            className="text-[12px] font-medium text-white/55 hover:text-white transition-colors touch-manipulation"
                          >
                            Share
                          </button>
                        ) : (
                          <span
                            className="text-[11px] font-medium text-amber-400/80"
                            title="Re-adopt this template from the library to enable PDF generation"
                          >
                            ⚠️ Re-adopt to unlock PDF
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Editor sheet */}
      {editingDocument && (
        <SafetyTemplateEditor
          open={!!editingDocument}
          onOpenChange={(open) => {
            if (!open) setEditingDocument(null);
          }}
          document={editingDocument}
          onSaved={() => setEditingDocument(null)}
        />
      )}

      {/* Share sheet */}
      {sharingDocument && (
        <SafetyDocumentShare
          open={!!sharingDocument}
          onClose={() => setSharingDocument(null)}
          pdfType="safety-document"
          recordId={sharingDocument.id}
          documentTitle={sharingDocument.name}
        />
      )}
    </div>
  );
}

export default SafetyTemplateLibrary;
