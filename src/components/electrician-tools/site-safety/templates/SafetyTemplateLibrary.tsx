import { useState } from 'react';
import { ArrowLeft, Search, BookOpen, Loader2, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
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

/**
 * Categories are filter labels, nothing more. They previously carried an icon
 * and a colour each — red/blue/amber/green — which spent four hues on a
 * dimension that is not status. In this hub colour means one thing: how urgent
 * a record is. A document's category is not urgency, so it is set in type.
 */
const CATEGORIES = ['Risk Assessment', 'Method Statement', 'Safe System of Work', 'Checklist'];

const STATUS_COLOUR: Record<string, string> = {
  Draft: 'text-amber-400 bg-amber-500/10',
  Active: 'text-green-400 bg-green-500/10',
  'Review Due': 'text-orange-400 bg-orange-500/10',
  Archived: 'text-white bg-white/[0.06]',
};

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

  /** Adopted but never taken past Draft — the number the strip reports. */
  const draftCount = (userDocs ?? []).filter((d) => d.status === 'Draft').length;

  /**
   * Whether work type distinguishes anything. Today every template is
   * 'commercial', so printing it on each card tells the reader nothing; the
   * pill earns its place only once domestic or industrial templates land.
   */
  const workTypesVary = new Set((templates ?? []).map((t) => t.work_type).filter(Boolean)).size > 1;

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
          <p className="text-[13.5px] text-white leading-relaxed max-w-xl">
            UK electrical safety documents grounded in BS 7671 + HSE guidance. Adopt, fill your
            company details, and you've got an inspector-ready document — no writing from scratch.
          </p>
        </div>

        {/* 3-stat strip.
            The third cell used to read "Time saved ~Nh", computed as adopted × 4.
            That four hours was invented — no measurement anywhere backs it — and
            it sat in the largest type on the page. It is replaced by the number
            that is both true and worth acting on: how many adopted documents are
            still unfinished. It goes amber only when there are some. */}
        <div className="-mx-4 grid grid-cols-3 gap-px border-y border-white/[0.06] bg-black sm:mx-0 sm:overflow-hidden sm:rounded-2xl sm:border sm:border-elec-yellow/35">
          <div className={cn('px-4 py-4 sm:px-5 sm:py-5', CARD_SURFACE)}>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
              Available
            </div>
            <div className="mt-2 text-[24px] font-semibold leading-none tracking-tight tabular-nums text-elec-yellow sm:text-[28px]">
              {(templates ?? []).length}
            </div>
          </div>
          <div className={cn('px-4 py-4 sm:px-5 sm:py-5', CARD_SURFACE)}>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
              Adopted
            </div>
            <div className="mt-2 text-[24px] font-semibold leading-none tracking-tight tabular-nums text-white sm:text-[28px]">
              {(userDocs ?? []).length}
            </div>
          </div>
          <div className={cn('px-4 py-4 sm:px-5 sm:py-5', CARD_SURFACE)}>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
              Unfinished
            </div>
            <div
              className={cn(
                'mt-2 text-[24px] font-semibold leading-none tracking-tight tabular-nums sm:text-[28px]',
                draftCount > 0 ? 'text-amber-400' : 'text-white'
              )}
            >
              {draftCount}
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
                : 'border-transparent text-white hover:text-white'
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
                : 'border-transparent text-white hover:text-white'
            }`}
          >
            Your adopted
            {(userDocs ?? []).length > 0 && (
              <span className="text-[11px] font-medium tabular-nums text-white">
                {(userDocs ?? []).length}
              </span>
            )}
          </button>
        </div>

        {/* Search — underline, not a box. Was a filled, bordered input, which is
            the superseded form language; fields are a bottom rule on transparent
            with the caret and border carrying focus. */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
          <input
            type="search"
            placeholder={tab === 'browse' ? 'Search templates' : 'Search my documents'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label={tab === 'browse' ? 'Search templates' : 'Search my documents'}
            className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-6 pr-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/25 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation [color-scheme:dark]"
          />
        </div>

        {tab === 'browse' ? (
          <>
            {/* Category filter. Selected is a SOLID volt fill with black text —
                the only sanctioned way to fill with volt. h-9 so the row clears
                a 36px target without the pills turning into slabs. */}
            <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
              {[null, ...CATEGORIES].map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat ?? 'all'}
                    type="button"
                    onClick={() => setSelectedCategory(active ? null : cat)}
                    aria-pressed={active}
                    className={cn(
                      'h-9 shrink-0 whitespace-nowrap rounded-full px-3.5 text-xs font-semibold transition-colors touch-manipulation',
                      '[-webkit-tap-highlight-color:transparent] active:scale-[0.97]',
                      active
                        ? 'bg-elec-yellow text-black'
                        : 'border border-elec-yellow/35 bg-white/[0.04] text-white hover:border-elec-yellow/60'
                    )}
                  >
                    {cat ?? 'All'}
                  </button>
                );
              })}
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
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setViewingTemplate(template)}
                      className={cn(CARD_BASE, CARD_NEUTRAL, 'w-full')}
                    >
                      <div className="space-y-3 p-4 sm:p-5">
                        {/* Pills row.
                            Two pills were dropped here because neither carried
                            information: every template in the library has v2
                            content, so "BS 7671 compliant" was printed on all of
                            them, and every template is work_type 'commercial', so
                            that was printed on all of them too. A badge that is
                            always on is decoration. Work type returns as soon as
                            the library holds more than one — see workTypesVary. */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex h-6 items-center rounded-md bg-white/[0.05] px-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white">
                            {template.category}
                          </span>
                          {workTypesVary && template.work_type && (
                            <span className="inline-flex h-6 items-center rounded-md px-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-white">
                              {template.work_type}
                            </span>
                          )}
                          {isAdopted && (
                            <span className="inline-flex h-6 items-center rounded-md border border-elec-yellow/35 px-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
                              Adopted
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white leading-snug">
                          {template.name}
                        </h3>

                        {/* Summary */}
                        {template.summary && (
                          <p className="text-[13px] text-white leading-relaxed line-clamp-2">
                            {template.summary}
                          </p>
                        )}

                        {/* Stats row (editorial, monochrome) */}
                        {(hazardCount > 0 || stepCount > 0) && (
                          <div className="flex items-baseline gap-4 text-[11.5px] text-white tabular-nums">
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
                                className="inline-flex h-6 items-center rounded-md border border-white/[0.10] bg-white/[0.05] px-2 text-[10.5px] font-medium tabular-nums text-white"
                              >
                                {ref}
                              </span>
                            ))}
                            {template.regulatory_references.length > 4 && (
                              <span className="text-[10.5px] text-white tabular-nums">
                                +{template.regulatory_references.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
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
                  const isV2Doc = !!v2 && (doc.version === 2 || Array.isArray(v2.hazards));
                  const v2H = isV2Doc && Array.isArray(v2.hazards) ? v2.hazards.length : 0;
                  const v2S =
                    isV2Doc && Array.isArray(v2.method_steps) ? v2.method_steps.length : 0;
                  const hazardCount = v2H > 0 ? v2H : stats.hazards;
                  const stepCount = v2S > 0 ? v2S : stats.steps;
                  const reviewWarning = reviewDateWarning(doc.review_date);
                  /**
                   * Whether this document can produce a PDF.
                   *
                   * Was `isV2Doc` alone, which blocked export on every v1
                   * document. The edge function has carried a full v1 renderer
                   * all along and only fails when there is no structured
                   * content at all — so the gate was refusing documents the
                   * backend could already draw. It now asks the real question.
                   */
                  const canExport = isV2Doc || (doc.structured_content?.sections?.length ?? 0) > 0;

                  return (
                    <div
                      key={doc.id}
                      className={cn(CARD_BASE, CARD_NEUTRAL, 'cursor-default active:scale-100')}
                    >
                      <button
                        type="button"
                        onClick={() => setEditingDocument(doc)}
                        className="w-full space-y-3 p-4 text-left sm:p-5"
                      >
                        {/* Pills row — status is the one colour dimension, so it
                            keeps its hue. The always-on compliance badge is gone
                            for the same reason it went from the browse card. */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] ${
                              STATUS_COLOUR[doc.status] ?? STATUS_COLOUR.Draft
                            }`}
                          >
                            {doc.status}
                          </span>
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
                        <div className="flex items-baseline gap-2 text-[11.5px] text-white tabular-nums">
                          {doc.company_name && <span className="truncate">{doc.company_name}</span>}
                          {doc.company_name && doc.updated_at && (
                            <span className="text-white">·</span>
                          )}
                          {doc.updated_at && (
                            <span className="shrink-0">{relativeDate(doc.updated_at)}</span>
                          )}
                        </div>

                        {/* Stats row */}
                        {(hazardCount > 0 || stepCount > 0 || stats.checkItems > 0) && (
                          <div className="flex items-baseline gap-4 pt-2 border-t border-white/[0.06] text-[11.5px] text-white tabular-nums">
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
                        {canExport ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSharingDocument(doc);
                            }}
                            className="text-[12px] font-medium text-white transition-colors hover:text-white touch-manipulation"
                          >
                            Share
                          </button>
                        ) : (
                          /* Only reached when the document genuinely holds no
                             content to draw. The emoji is gone — the house
                             language carries warnings in colour and words. */
                          <span className="text-[11.5px] font-medium text-amber-400">
                            Re-adopt to enable PDF
                          </span>
                        )}
                      </div>
                    </div>
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
