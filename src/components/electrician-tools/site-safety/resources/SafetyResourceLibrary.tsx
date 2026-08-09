/**
 * SafetyResourceLibrary — guidance notes and HSE publications.
 *
 * ⚠️ DATA NOTE (verified 2026-08-09): the 13 live rows in `safety_resources`
 * are the demo payload from `electrician/safety-shares/SampleDataLoader.tsx`,
 * and two of their columns are fabricated:
 *
 *  - `file_size` is a literal in the seed script. The row for INDG231 claims
 *    "1.8 MB"; the file it links to is 294,110 bytes (~287 KB). Every size is
 *    invented.
 *  - `download_count` is seeded (2341, 1876, …) and NOTHING in the app ever
 *    increments it — `openExternalUrl` sends the user to hse.gov.uk and we
 *    never see the result. It was a counter of nothing, printed as fact.
 *
 * Both are therefore no longer rendered. Inventing engagement figures in a
 * safety library is the kind of small dishonesty that costs you the user's
 * trust in the accurate parts, so the fix is to stop displaying them rather
 * than to display them more prettily.
 *
 * Several `file_url`s in that seed data are also dead or mismatched (e.g.
 * "Arc Flash Protection Chart" points at INDG372, which is *Electrical
 * switchgear safety*; "RCD Testing and Maintenance Procedures" points at
 * INDG370, which is *Controlling fire and explosion risks / DSEAR*). Those are
 * row-level data defects and have been reported separately — they cannot be
 * corrected from this component.
 *
 * `file_bucket` is 'safety-resources' on every row while `file_path` is null,
 * so nothing is actually served from storage; every resource is an external
 * link. The UI says "Open", not "Download", because nothing downloads.
 */

import { useMemo, useState } from 'react';
import { BookOpen, ExternalLink, FileSpreadsheet, FileText } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';
import { cn } from '@/lib/utils';
import { useSafetyResources, type SafetyResource } from '@/hooks/useSafetyResources';
import { SafetyModuleShell } from '../common/SafetyModuleShell';
import { SafetyListCard } from '../common/SafetyList';
import { FilterBar, EmptyState, LoadingState } from '@/components/college/primitives';
import { SafetyPageHeader } from '../common/SafetyPageHeader';

interface SafetyResourceLibraryProps {
  onBack: () => void;
}

const FILE_ICONS: Record<string, React.ElementType> = {
  pdf: FileText,
  document: BookOpen,
  spreadsheet: FileSpreadsheet,
  xlsx: FileSpreadsheet,
};

/** `file_type` is 'PDF' / 'XLSX' in the data but the map was keyed lowercase. */
const iconFor = (fileType: string | null | undefined) =>
  FILE_ICONS[(fileType ?? '').toLowerCase()] ?? FileText;

export function SafetyResourceLibrary({ onBack }: SafetyResourceLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  /**
   * Fetch EVERYTHING and filter in the browser, rather than passing the
   * selected category to the hook.
   *
   * The previous version called `useSafetyResources(selectedCategory)`, which
   * filters server-side, and then derived the category chips from that same
   * response. So the moment you picked "Testing", the response contained only
   * Testing rows, the chip row collapsed to `All | Testing`, and there was no
   * way to move to another category without going back through "All" first.
   * The list of categories has to come from the unfiltered set or it eats
   * itself. 13 rows — there is nothing to gain from filtering server-side.
   */
  const { data: resources, isLoading } = useSafetyResources();

  const allResources = useMemo(() => resources ?? [], [resources]);

  const categories = useMemo(
    () => Array.from(new Set(allResources.map((r) => r.category).filter(Boolean))).sort(),
    [allResources]
  );

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return allResources.filter((r) => {
      if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
      if (!q) return true;
      return r.title.toLowerCase().includes(q) || (r.summary ?? '').toLowerCase().includes(q);
    });
  }, [allResources, selectedCategory, searchTerm]);

  const open = (resource: SafetyResource) => {
    if (resource.file_url) void openExternalUrl(resource.file_url);
  };

  return (
    <SafetyModuleShell
      onBack={onBack}
      moduleName="Safety Resources"
      hero={
        <SafetyPageHeader
          eyebrow="Resources"
          title="Guidance notes and HSE publications"
          description="Reference material for site safety. Every item opens the publisher's own copy, so you are always reading the current edition rather than a snapshot we took."
          tone="yellow"
        />
      }
      filter={
        allResources.length > 0 ? (
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: allResources.length },
              ...categories.map((c) => ({
                value: c,
                label: c,
                count: allResources.filter((r) => r.category === c).length,
              })),
            ]}
            activeTab={selectedCategory}
            onTabChange={(v) => setSelectedCategory(v)}
            search={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search resources…"
          />
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : allResources.length === 0 ? (
        <EmptyState
          title="No resources published"
          description="There are no safety resources in the library yet."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No resources match"
          description={
            searchTerm ? `Nothing matches “${searchTerm}”.` : 'Nothing in this category yet.'
          }
          action="Show all resources"
          onAction={() => {
            setSelectedCategory('all');
            setSearchTerm('');
          }}
        />
      ) : (
        <SafetyListCard>
          {filtered.map((resource) => {
            const FileIcon = iconFor(resource.file_type);

            return (
              <button
                key={resource.id}
                type="button"
                onClick={() => open(resource)}
                className={cn(
                  'flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5',
                  'touch-manipulation [-webkit-tap-highlight-color:transparent]',
                  // Brighten under the thumb; never dim, and never a flat
                  // opaque fill that would erase the card's gradient.
                  'transition-[background-color,transform] duration-150',
                  'hover:bg-white/[0.05] active:scale-[0.99] active:bg-white/[0.08]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60'
                )}
              >
                {/* Neutral surface + volt line. The blue-tinted tile it
                    replaces was the only blue on the page and carried no
                    meaning — file type is already stated by the glyph. */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-elec-yellow/35 bg-white/[0.05]">
                  <FileIcon className="h-5 w-5 text-elec-yellow" aria-hidden />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-white sm:text-[15px]">
                    {resource.title}
                  </div>
                  {resource.summary && (
                    <div className="mt-0.5 line-clamp-1 text-[11.5px] text-white">
                      {resource.summary}
                    </div>
                  )}
                  {resource.category && (
                    <span className="mt-1.5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                      {resource.category}
                    </span>
                  )}
                </div>

                <ExternalLink className="h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
                <span className="sr-only">Opens in a new window</span>
              </button>
            );
          })}
        </SafetyListCard>
      )}
    </SafetyModuleShell>
  );
}

export default SafetyResourceLibrary;
