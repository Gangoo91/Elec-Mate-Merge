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
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  containerVariants,
  itemVariants,
  EmptyState,
  LoadingState,
} from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
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

const CHIP =
  'inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-[12.5px] font-medium transition-colors touch-manipulation';
const CHIP_ON = 'border-white bg-white text-black';
const CHIP_OFF = 'border-white/[0.14] text-white hover:bg-white/[0.06]';
const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';
const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[filter,transform] touch-manipulation hover:brightness-105 active:scale-[0.98] sm:w-auto';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);

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
      const haystack = `${r.title} ${r.description ?? ''} ${(r.tags ?? []).join(' ')}`.toLowerCase();
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

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {!loading && !error && resources.length > 0 && (
          <HubKpiRow>
            <HubKpi
              accent
              label="Documents"
              value={String(resources.length)}
              verdict="Shared across the college"
              context={
                kinds.length > 0
                  ? `${kinds.length} type${kinds.length === 1 ? '' : 's'}`
                  : undefined
              }
            />
            <HubKpi
              label="Storage used"
              value={formatFileSize(usedStorage)}
              sentiment={storagePercent >= 80 ? 'bad' : 'neutral'}
              verdict={
                storagePercent >= 80
                  ? 'Nearly full — clear old files'
                  : `${storagePercent}% of 5 GB`
              }
            />
            <HubKpi
              label="Added this month"
              value={String(
                resources.filter((r) => {
                  const d = new Date(r.created_at);
                  const n = new Date();
                  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
                }).length
              )}
              verdict="New this calendar month"
            />
          </HubKpiRow>
        )}

        <motion.div variants={itemVariants}>
          <button type="button" onClick={goUpload} className={PRIMARY}>
            Upload a document
          </button>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Library</HubSectionHeading>
          {!loading && !error && (
            <span className="text-[11px] font-semibold tabular-nums text-white">
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
              <motion.div
                variants={itemVariants}
                className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:flex-wrap sm:px-0"
              >
                <button
                  type="button"
                  onClick={() => setFilterKind('all')}
                  className={cn(CHIP, filterKind === 'all' ? CHIP_ON : CHIP_OFF)}
                >
                  All
                  <span className="text-[11px] tabular-nums opacity-70">{resources.length}</span>
                </button>
                {kinds.map(({ kind, count }) => (
                  <button
                    key={kind}
                    type="button"
                    onClick={() => setFilterKind(kind)}
                    className={cn(CHIP, filterKind === kind ? CHIP_ON : CHIP_OFF)}
                  >
                    {KIND_LABEL[kind]}
                    <span className="text-[11px] tabular-nums opacity-70">{count}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </>
        )}

        {error ? (
          <motion.div variants={itemVariants}>
            <EmptyState
              title="Could not load documents"
              description={error}
              action="Retry"
              onAction={refresh}
            />
          </motion.div>
        ) : loading ? (
          <LoadingState />
        ) : resources.length === 0 ? (
          <motion.div variants={itemVariants}>
            <EmptyState
              title="No documents yet"
              description="Upload teaching resources and they appear here for everyone at the college."
              action="Open Teaching Resources"
              onAction={goUpload}
            />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className={LIST_CARD}>
            {filtered.length === 0 ? (
              <p className="px-4 py-5 text-[12.5px] text-white sm:px-5">
                Nothing matches — clear the search or pick another type.
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.10]">
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
                            resource.ac_count ? `${resource.ac_count} AC${resource.ac_count === 1 ? '' : 's'}` : null,
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
          deleting
            ? `"${deleting.title}" will be permanently removed. This cannot be undone.`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </>
  );
}
