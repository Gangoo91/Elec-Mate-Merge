import { useState } from 'react';
import { Search, BookOpen, Loader2, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
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
import { SafetyModuleShell } from '../common/SafetyModuleShell';
import { SafetyPageHeader } from '../common/SafetyPageHeader';
import { isFirmScope, useSafetyScope } from '../common/SafetyScope';

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

/**
 * Status is the one colour dimension — carried by the TEXT on a neutral
 * surface. The tinted washes (amber/10, green/10) went muddy on this ground and
 * did not match the pills in Documents, which list the same kind of record.
 */
const STATUS_COLOUR: Record<string, string> = {
  Draft: 'text-amber-400 bg-white/[0.05] border border-white/10',
  Active: 'text-emerald-400 bg-white/[0.05] border border-white/10',
  'Review Due': 'text-orange-400 bg-white/[0.05] border border-white/10',
  Archived: 'text-white bg-white/[0.05] border border-white/10',
};

/** Mobile edge-to-edge, inset and rounded from sm: up. */
const CARD_BLEED =
  '-mx-4 w-[calc(100%+2rem)] rounded-none border-x-0 sm:mx-0 sm:w-full sm:rounded-2xl sm:border-x';

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
  // Employer Hub (firm scope): browse and read only. "My documents" are the
  // person's own adopted copies, so they never show in the firm's hub.
  const browseOnly = isFirmScope(useSafetyScope());
  const [tab, setTab] = useState<Tab>('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewingTemplate, setViewingTemplate] = useState<SafetyTemplate | null>(null);
  const [editingDocument, setEditingDocument] = useState<UserSafetyDocument | null>(null);
  const [sharingDocument, setSharingDocument] = useState<UserSafetyDocument | null>(null);

  const { data: templates, isLoading } = useSafetyTemplates(selectedCategory ?? undefined);
  const { data: ownDocs, isLoading: userDocsLoading } = useUserSafetyDocuments();
  const userDocs = browseOnly ? [] : ownDocs;

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
        browseOnly={browseOnly}
      />
    );
  }

  const adoptedCount = (userDocs ?? []).length;

  return (
    <SafetyModuleShell
      onBack={onBack}
      moduleName="Safety Templates"
      hero={
        <SafetyPageHeader
          title="Ready-made documents to adopt and edit"
          description="Adopt a template, add your company details and edit it to suit the job."
        />
      }
    >
      <div className="space-y-5">
        {/* The three-figure strip (Available / Adopted / Unfinished) was
            removed: it took the first phone screen to repeat numbers the tabs
            already carry. The one figure worth acting on — unfinished drafts —
            now sits on the "My documents" tab itself. */}
        {/* Editorial tab switcher — underline style */}
        <div
          className={cn('grid grid-cols-2 border-b border-white/[0.08]', browseOnly && 'hidden')}
        >
          <button
            type="button"
            onClick={() => setTab('browse')}
            className={`h-12 border-b-2 transition-colors touch-manipulation text-[13px] font-semibold inline-flex items-center justify-center gap-2 ${
              tab === 'browse'
                ? 'border-elec-yellow text-elec-yellow'
                : 'border-transparent text-white hover:text-white'
            }`}
          >
            Templates
            {(templates ?? []).length > 0 && (
              <span className="text-[11px] font-medium tabular-nums">
                {(templates ?? []).length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setTab('my-docs')}
            className={`h-12 border-b-2 transition-colors touch-manipulation text-[13px] font-semibold inline-flex items-center justify-center gap-2 ${
              tab === 'my-docs'
                ? 'border-elec-yellow text-elec-yellow'
                : 'border-transparent text-white hover:text-white'
            }`}
          >
            My documents
            {adoptedCount > 0 && (
              <span className="text-[11px] font-medium tabular-nums">{adoptedCount}</span>
            )}
            {draftCount > 0 && (
              <span className="text-[11px] font-medium text-amber-400">
                · {draftCount} unfinished
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
                a 44px target, matching every other touch target in the app. */}
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
                      'h-11 shrink-0 whitespace-nowrap rounded-full px-4 text-[13px] font-semibold transition-colors touch-manipulation',
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
                heading="No templates found"
                description={
                  searchTerm
                    ? `Nothing matches "${searchTerm}". Try a job type such as "consumer unit" or "isolation".`
                    : 'No templates in this category yet.'
                }
                ctaLabel={searchTerm || selectedCategory ? 'Show all templates' : undefined}
                onCta={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
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
                      className={cn(CARD_BASE, CARD_NEUTRAL, CARD_BLEED)}
                    >
                      <div className="space-y-2 p-4 sm:p-5">
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

                        {/* One meta line: what's inside, then the regulations it
                            cites. Was a stats row plus a ruled-off row of
                            regulation pills — two extra rows on every card made
                            the list fifteen phone screens long. The full
                            reference list is in the template itself. */}
                        {(hazardCount > 0 || stepCount > 0 || stats.ppeItems > 0) && (
                          <p className="text-[12px] text-white tabular-nums">
                            {[
                              hazardCount > 0 && `${hazardCount} hazards`,
                              stepCount > 0 && `${stepCount} steps`,
                              stats.ppeItems > 0 && `${stats.ppeItems} PPE items`,
                            ]
                              .filter(Boolean)
                              .join(' · ')}
                          </p>
                        )}
                        {template.regulatory_references.length > 0 && (
                          <p className="truncate text-[12px] text-white">
                            {template.regulatory_references.join(' · ')}
                          </p>
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
                heading={searchTerm ? 'No documents found' : 'No documents yet'}
                description={
                  searchTerm
                    ? `Nothing matches "${searchTerm}".`
                    : 'Adopt a template and it becomes your own document here — with your company details, ready to edit and share as a PDF.'
                }
                ctaLabel={searchTerm ? undefined : 'Browse templates'}
                onCta={() => setTab('browse')}
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
                      className={cn(
                        CARD_BASE,
                        CARD_NEUTRAL,
                        CARD_BLEED,
                        'cursor-default active:scale-100'
                      )}
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
                            <span className="inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] border border-white/10 bg-white/[0.05] text-red-400">
                              Review overdue
                            </span>
                          )}
                          {reviewWarning === 'soon' && (
                            <span className="inline-flex items-center h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] border border-white/10 bg-white/[0.05] text-amber-400">
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
                      <div className="flex items-center gap-2 border-t border-white/[0.06] px-2 py-1 sm:px-3">
                        <button
                          type="button"
                          onClick={() => setEditingDocument(doc)}
                          className="h-11 rounded-lg px-3 text-[13px] font-semibold text-elec-yellow hover:bg-white/[0.05] transition-colors touch-manipulation"
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
                            className="h-11 rounded-lg px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.05] touch-manipulation"
                          >
                            Share PDF
                          </button>
                        ) : (
                          /* Only reached when the document genuinely holds no
                             content to draw. The emoji is gone — the house
                             language carries warnings in colour and words. */
                          <span className="px-3 text-[12px] font-medium text-amber-400">
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
    </SafetyModuleShell>
  );
}

export default SafetyTemplateLibrary;
