import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { containerVariants, itemVariants, LoadingState } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import {
  TEACH_BTN,
  TEACH_BTN_PRIMARY,
  TEACH_LIST,
  TeachingEmpty as CollegeEmpty,
  TeachingHeader,
  TeachingScreen,
  plural,
  TeachTabs,
} from '@/components/college/teaching/TeachingKit';
import { ResourcePreviewSheet } from '@/components/college/sheets/ResourcePreviewSheet';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  useCollegeResources,
  type CollegeResource,
  type ResourceKind,
} from '@/hooks/useCollegeResources';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

/* ==========================================================================
   DocumentLibrarySection — read-focused browser of the same `college_resources`
   that TeachingResourcesSection manages.

   Filters are the resource KINDS that actually exist in the library (with
   live counts) — the old "PDFs / Docs / Slides" tab strip used values
   ('pdf', 'doc', 'slides') that no row ever carries (the column is
   document/slide/sheet/image/video/audio/link/other), so three of its seven
   tabs always filtered to nothing. Upload routes to Teaching Resources so
   there is one upload flow.

   Renders CONTENT ONLY under the CollegeDashboard masthead.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-document-library',
  title: 'Document library',
  what: 'Every document, slide deck, video and link the college has shared, in one place to search and open.',
  steps: [
    {
      title: 'Find it',
      body: 'Search by title, description or tag, or pick a type to narrow the list.',
    },
    { title: 'Open it', body: 'Tap a document to preview it here without leaving the app.' },
    {
      title: 'Add more',
      body: 'Upload goes to Teaching resources, so there is one place to add and tag files.',
    },
  ],
  notes: [
    {
      title: 'Storage',
      body: 'The college has 5 GB. When it is nearly full the figure turns orange; delete old files to make room.',
    },
  ],
};

interface DocumentLibrarySectionProps {
  onNavigate?: (section: CollegeSection) => void;
}

const KIND_LABEL: Record<ResourceKind, string> = {
  document: 'Documents',
  slide: 'Slides',
  sheet: 'Spreadsheets',
  image: 'Images',
  video: 'Videos',
  audio: 'Audio',
  link: 'Links',
  other: 'Other',
};

const KIND_ONE: Record<ResourceKind, string> = {
  document: 'Document',
  slide: 'Slides',
  sheet: 'Spreadsheet',
  image: 'Image',
  video: 'Video',
  audio: 'Audio',
  link: 'Link',
  other: 'File',
};

const STORAGE_QUOTA_BYTES = 5 * 1024 * 1024 * 1024;
const PAGE = 24;

const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';
const LIST_CARD = TEACH_LIST;

function formatFileSize(bytes?: number | null): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function DocumentLibrarySection({ onNavigate }: DocumentLibrarySectionProps) {
  const { resources, loading, error, deleteResource, signedUrl, refresh } = useCollegeResources();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterKind, setFilterKind] = useState<ResourceKind | 'all'>('all');
  const [deleting, setDeleting] = useState<CollegeResource | null>(null);
  const [preview, setPreview] = useState<CollegeResource | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE);

  // Kinds present in the library, most common first, with live counts.
  const kinds = useMemo(() => {
    const counts = new Map<ResourceKind, number>();
    for (const r of resources) counts.set(r.kind, (counts.get(r.kind) ?? 0) + 1);
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([kind, count]) => ({ kind, count }));
  }, [resources]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return resources.filter((r) => {
      const haystack =
        `${r.title} ${r.description ?? ''} ${(r.tags ?? []).join(' ')}`.toLowerCase();
      const matchesSearch = !q || haystack.includes(q);
      const matchesKind = filterKind === 'all' || r.kind === filterKind;
      return matchesSearch && matchesKind;
    });
  }, [resources, searchQuery, filterKind]);

  const usedStorage = useMemo(
    () => resources.reduce((sum, r) => sum + (r.size_bytes ?? 0), 0),
    [resources]
  );
  const storagePercent = Math.min(Math.round((usedStorage / STORAGE_QUOTA_BYTES) * 100), 100);

  // Reset the page size whenever the filtered set changes so a new filter
  // doesn't inherit a huge previous "load more" count.
  useEffect(() => {
    setVisibleCount(PAGE);
  }, [searchQuery, filterKind]);

  const shown = filtered.slice(0, visibleCount);
  const hidden = filtered.length - shown.length;

  // Open the in-app preview sheet (image / PDF / video / audio / link) rather
  // than bouncing to a new browser tab.
  const openResource = (resource: CollegeResource) => {
    if (!resource.external_url && !resource.file_path) {
      toast({
        title: 'Nothing to open',
        description: 'This resource has no file or URL attached.',
        variant: 'destructive',
      });
      return;
    }
    setPreview(resource);
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    const target = deleting;
    try {
      await deleteResource(target.id);
      toast({ title: 'Resource deleted', description: target.title });
      setDeleting(null);
    } catch (e) {
      toast({
        title: 'Could not delete',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const goUpload = () => onNavigate?.('teachingresources');

  const addedThisMonth = resources.filter((r) => {
    const d = new Date(r.created_at);
    const n = new Date();
    return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
  }).length;

  return (
    <TeachingScreen>
      <TeachingHeader
        eyebrow="Resources"
        title="Document library"
        help={HELP}
        summary={
          loading
            ? 'Loading the library…'
            : error
              ? 'Search and open everything the college has shared.'
              : resources.length === 0
                ? 'Nothing has been shared yet. Files and links added in Teaching resources appear here for everyone at the college.'
                : `${plural(resources.length, 'document')} shared across the college${addedThisMonth > 0 ? `, ${addedThisMonth} added this month` : ''}.`
        }
        sub={
          !loading && !error && resources.length > 0 ? (
            <span className={cn(storagePercent >= 80 && 'font-semibold text-orange-400')}>
              {formatFileSize(usedStorage)} of 5 GB storage used
              {storagePercent >= 80 ? ', nearly full: clear old files' : ''}
            </span>
          ) : undefined
        }
        actions={
          <button
            type="button"
            onClick={goUpload}
            className={cn(TEACH_BTN_PRIMARY, 'w-full sm:w-auto')}
          >
            Add a document
          </button>
        }
      />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <CollegeHeading>Library</CollegeHeading>
          {!loading && !error && (
            <span className="text-[12px] font-semibold tabular-nums text-white">
              {filtered.length === resources.length
                ? `${resources.length} item${resources.length === 1 ? '' : 's'}`
                : `${filtered.length} of ${resources.length}`}
            </span>
          )}
        </motion.div>

        {resources.length > 0 && (
          <>
            <motion.div variants={itemVariants}>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, description or tags"
                aria-label="Search documents"
                className={SEARCH}
              />
            </motion.div>

            {kinds.length > 1 && (
              <motion.div variants={itemVariants}>
                <TeachTabs
                  label="Type"
                  value={filterKind}
                  onChange={setFilterKind}
                  tabs={[
                    { value: 'all', label: 'All', count: resources.length },
                    ...kinds.map(({ kind, count }) => ({
                      value: kind,
                      label: KIND_LABEL[kind],
                      count,
                    })),
                  ]}
                />
              </motion.div>
            )}
          </>
        )}

        {error ? (
          <CollegeEmpty
            title="Could not load documents"
            body={error}
            action={
              <button type="button" className={TEACH_BTN} onClick={refresh}>
                Try again
              </button>
            }
          />
        ) : loading ? (
          <LoadingState />
        ) : resources.length === 0 ? (
          <CollegeEmpty
            title="No documents yet"
            body="Upload teaching resources and they appear here for everyone at the college."
            action={
              <button type="button" className={TEACH_BTN} onClick={goUpload}>
                Open Teaching resources
              </button>
            }
          />
        ) : (
          <motion.div variants={itemVariants} className={LIST_CARD}>
            {filtered.length === 0 ? (
              <p className="px-4 py-5 text-[12.5px] text-white sm:px-5">
                Nothing matches. Clear the search or pick another type.
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.06]">
                {shown.map((resource) => (
                  <li key={resource.id} className="flex items-center gap-1 pr-2 sm:pr-3">
                    <button
                      type="button"
                      onClick={() => openResource(resource)}
                      className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {resource.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {[
                            KIND_ONE[resource.kind],
                            resource.uploader_name,
                            fmtDate(resource.created_at),
                            resource.ac_count
                              ? `${resource.ac_count} AC${resource.ac_count === 1 ? '' : 's'}`
                              : null,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      </span>
                      <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                        {resource.kind === 'link' ? 'Link' : formatFileSize(resource.size_bytes)}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label={`Options for ${resource.title}`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                        >
                          <span className="text-[18px] leading-none">⋯</span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="h-11 touch-manipulation"
                          onClick={() => openResource(resource)}
                        >
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="h-11 touch-manipulation text-red-400 focus:text-red-300"
                          onClick={() => setDeleting(resource)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                ))}
              </ul>
            )}
            {hidden > 0 && (
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE)}
                className="flex h-11 w-full items-center justify-center border-t border-white/[0.10] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
              >
                {hidden} more
              </button>
            )}
          </motion.div>
        )}
      </motion.section>

      <ResourcePreviewSheet
        open={preview != null}
        onOpenChange={(v) => {
          if (!v) setPreview(null);
        }}
        resource={preview}
        signedUrl={signedUrl}
        onDelete={(r) => {
          setPreview(null);
          setDeleting(r);
        }}
      />

      <ConfirmationDialog
        open={!!deleting}
        onOpenChange={(v) => {
          if (!v) setDeleting(null);
        }}
        title="Delete document?"
        description={
          deleting ? `"${deleting.title}" will be permanently removed. This cannot be undone.` : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </TeachingScreen>
  );
}
