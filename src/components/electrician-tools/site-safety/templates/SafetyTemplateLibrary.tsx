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

      <div className="px-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Safety Templates</h2>
          <p className="text-sm text-white">
            UK electrical safety document templates ready to adopt and customise
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
          <button
            onClick={() => setTab('browse')}
            className={`flex-1 h-10 rounded-lg text-sm font-semibold touch-manipulation transition-all flex items-center justify-center gap-2 ${
              tab === 'browse' ? 'bg-elec-yellow text-black' : 'text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Browse
          </button>
          <button
            onClick={() => setTab('my-docs')}
            className={`flex-1 h-10 rounded-lg text-sm font-semibold touch-manipulation transition-all flex items-center justify-center gap-2 ${
              tab === 'my-docs' ? 'bg-elec-yellow text-black' : 'text-white'
            }`}
          >
            <FolderOpen className="h-4 w-4" />
            My Documents
            {(userDocs ?? []).length > 0 && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  tab === 'my-docs' ? 'bg-black/20 text-black' : 'bg-white/[0.1] text-white'
                }`}
              >
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
              <div className="space-y-2 pb-8">
                {filtered.map((template) => {
                  const catConfig = CATEGORIES.find((c) => c.key === template.category);
                  const CatIcon = catConfig?.icon ?? FileText;
                  const isAdopted = adoptedTemplateIds.has(template.id);
                  const stats = getTemplateStats(template.structured_content);

                  return (
                    <motion.button
                      key={template.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewingTemplate(template)}
                      className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] transition-colors touch-manipulation"
                    >
                      <div className="p-3 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                            <CatIcon className={`h-5 w-5 ${catConfig?.colour ?? 'text-white'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-[13px] font-semibold text-white truncate">
                                {template.name}
                              </h3>
                              {isAdopted && (
                                <span className="text-[9px] font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                  Adopted
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-white truncate">
                              {template.category}
                              {template.subcategory ? ` · ${template.subcategory}` : ''}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                        </div>

                        {/* Summary */}
                        {template.summary && (
                          <p className="text-[11px] text-white line-clamp-2 pl-[52px]">
                            {template.summary}
                          </p>
                        )}

                        {/* Stats + regulation badges */}
                        {(stats.sections > 0 || template.regulatory_references.length > 0) && (
                          <div className="flex items-center gap-1.5 pl-[52px] flex-wrap">
                            <StatChip icon={AlertTriangle} label="Hazards" value={stats.hazards} />
                            <StatChip icon={Footprints} label="Steps" value={stats.steps} />
                            <StatChip
                              icon={ListChecks}
                              label="Check items"
                              value={stats.checkItems}
                            />
                            {template.regulatory_references.slice(0, 3).map((ref) => (
                              <span
                                key={ref}
                                className="text-[9px] font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-full"
                              >
                                {ref}
                              </span>
                            ))}
                            {template.regulatory_references.length > 3 && (
                              <span className="text-[9px] text-white">
                                +{template.regulatory_references.length - 3}
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
              <div className="space-y-2 pb-8">
                {filteredDocs.map((doc) => {
                  const stats = getTemplateStats(doc.structured_content);
                  const reviewWarning = reviewDateWarning(doc.review_date);

                  return (
                    <motion.div
                      key={doc.id}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors touch-manipulation"
                    >
                      <button
                        onClick={() => setEditingDocument(doc)}
                        className="w-full text-left p-3 space-y-2"
                      >
                        {/* Top row: icon + title + status */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-elec-yellow" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-[13px] font-semibold text-white truncate">
                                {doc.name}
                              </h3>
                              <Badge
                                className={`border-none text-[9px] font-bold flex-shrink-0 ${
                                  STATUS_COLOUR[doc.status] ?? STATUS_COLOUR.Draft
                                }`}
                              >
                                {doc.status}
                              </Badge>
                            </div>
                            {/* Meta row: company + last edited */}
                            <div className="flex items-center gap-2 mt-0.5">
                              {doc.company_name && (
                                <span className="text-[10px] text-white truncate">
                                  {doc.company_name}
                                </span>
                              )}
                              {doc.company_name && doc.updated_at && (
                                <span className="text-[10px] text-white">·</span>
                              )}
                              {doc.updated_at && (
                                <span className="text-[10px] text-white flex items-center gap-0.5 flex-shrink-0">
                                  <Clock className="h-2.5 w-2.5" />
                                  {relativeDate(doc.updated_at)}
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                        </div>

                        {/* Stats + review date row */}
                        <div className="flex items-center gap-1.5 pl-[52px] flex-wrap">
                          {stats.sections > 0 && (
                            <StatChip icon={Layers} label="Sections" value={stats.sections} />
                          )}
                          <StatChip icon={AlertTriangle} label="Hazards" value={stats.hazards} />
                          <StatChip icon={Footprints} label="Steps" value={stats.steps} />
                          <StatChip
                            icon={ListChecks}
                            label="Check items"
                            value={stats.checkItems}
                          />
                          {reviewWarning === 'overdue' && (
                            <span className="text-[9px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                              <Calendar className="h-2.5 w-2.5" />
                              Overdue
                            </span>
                          )}
                          {reviewWarning === 'soon' && (
                            <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                              <Calendar className="h-2.5 w-2.5" />
                              Review due
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Action buttons row */}
                      <div className="flex items-center gap-2 px-3 pb-3 pt-0 pl-[52px]">
                        <button
                          onClick={() => setEditingDocument(doc)}
                          className="h-9 px-3 rounded-lg bg-white/[0.06] text-white text-[11px] font-semibold flex items-center gap-1.5 touch-manipulation active:bg-white/[0.1] transition-colors"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSharingDocument(doc);
                          }}
                          className="h-9 px-3 rounded-lg bg-white/[0.06] text-white text-[11px] font-semibold flex items-center gap-1.5 touch-manipulation active:bg-white/[0.1] transition-colors"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                          Share
                        </button>
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
