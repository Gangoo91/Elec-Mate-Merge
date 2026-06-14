import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  HubGrid,
  ListCard,
  FilterBar,
  EmptyState,
  IconButton,
  SecondaryButton,
  itemVariants,
  toneDot,
  type Tone,
} from '@/components/college/primitives';
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
   that TeachingResourcesSection manages. Was 100% mock (mockFolders +
   useCollege() returning hardcoded arrays); now wired to the real hook.

   "Folders" are derived from `kind` (Documents, Videos, Images, Links, Notes)
   so the taxonomy is honest — no fake counts. Upload routes to the
   TeachingResources section to avoid duplicating the upload flow.
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

const KIND_TONE: Record<ResourceKind, Tone> = {
  document: 'blue',
  slide: 'orange',
  sheet: 'yellow',
  image: 'emerald',
  video: 'red',
  audio: 'amber',
  link: 'purple',
  other: 'cyan',
};

// Folder definitions — derived dynamically from the resources we have.
interface DerivedFolder {
  id: string;
  label: string;
  kinds: ResourceKind[];
  count: number;
  tone: Tone;
}

function buildFolders(resources: CollegeResource[]): DerivedFolder[] {
  // Group by display label so pdf+doc both fall under "Documents"
  const counts = new Map<string, { kinds: Set<ResourceKind>; count: number }>();
  for (const r of resources) {
    const label = KIND_LABEL[r.kind];
    const entry = counts.get(label) ?? { kinds: new Set(), count: 0 };
    entry.kinds.add(r.kind);
    entry.count += 1;
    counts.set(label, entry);
  }
  return Array.from(counts.entries())
    .filter(([, e]) => e.count > 0)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([label, e]) => {
      const firstKind = Array.from(e.kinds)[0];
      return {
        id: label.toLowerCase(),
        label,
        kinds: Array.from(e.kinds),
        count: e.count,
        tone: KIND_TONE[firstKind],
      };
    });
}

const STORAGE_QUOTA_BYTES = 5 * 1024 * 1024 * 1024;

function formatFileSize(bytes?: number | null): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function DocumentLibrarySection({ onNavigate }: DocumentLibrarySectionProps) {
  const { resources, loading, error, deleteResource, signedUrl, refresh } = useCollegeResources();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterFolder, setFilterFolder] = useState<string>('all');
  const [filterKind, setFilterKind] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deleting, setDeleting] = useState<CollegeResource | null>(null);
  const [preview, setPreview] = useState<CollegeResource | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);

  const folders = useMemo(() => buildFolders(resources), [resources]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return resources.filter((r) => {
      const haystack = `${r.title} ${r.description ?? ''} ${(r.tags ?? []).join(' ')}`.toLowerCase();
      const matchesSearch = !q || haystack.includes(q);
      const matchesKind = filterKind === 'all' || r.kind === filterKind;
      const folder = folders.find((f) => f.id === filterFolder);
      const matchesFolder = filterFolder === 'all' || (folder && folder.kinds.includes(r.kind));
      return matchesSearch && matchesKind && matchesFolder;
    });
  }, [resources, searchQuery, filterKind, filterFolder, folders]);

  const usedStorage = useMemo(
    () => resources.reduce((sum, r) => sum + (r.size_bytes ?? 0), 0),
    [resources]
  );
  const storagePercent = Math.min(Math.round((usedStorage / STORAGE_QUOTA_BYTES) * 100), 100);

  // Reset the page size whenever the filtered set changes so a new filter
  // doesn't inherit a huge previous "load more" count.
  useEffect(() => {
    setVisibleCount(24);
  }, [searchQuery, filterFolder, filterKind, viewMode]);

  const shown = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

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

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum · Document Library"
          title="Shared documents"
          description={
            loading
              ? 'Loading documents…'
              : `${resources.length} document${resources.length === 1 ? '' : 's'} · ${formatFileSize(usedStorage)} used.`
          }
          tone="purple"
          actions={
            <button
              onClick={() => onNavigate?.('teachingresources')}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Upload →
            </button>
          }
        />
      </motion.div>

      {/* Storage bar — real bytes from real resources. */}
      <motion.div variants={itemVariants}>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
          <div className="flex items-baseline justify-between">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
              Storage
            </div>
            <div className="text-[12px] tabular-nums text-white">
              {formatFileSize(usedStorage)} / 5 GB
            </div>
          </div>
          <div className="mt-3 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full transition-all rounded-full',
                storagePercent > 80
                  ? 'bg-red-500/80'
                  : storagePercent > 60
                    ? 'bg-amber-400/80'
                    : 'bg-elec-yellow/80'
              )}
              style={{ width: `${storagePercent}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Folders — derived from real kinds, no fake counts. */}
      {folders.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-5">
          <SectionHeader eyebrow="Folders" title="Browse by type" />
          <HubGrid columns={4}>
            <button
              onClick={() => setFilterFolder('all')}
              className={cn(
                'group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 text-left touch-manipulation flex flex-col min-h-[140px] rounded-2xl border',
                filterFolder === 'all'
                  ? 'border-elec-yellow/60'
                  : 'border-white/[0.06]'
              )}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70 opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                All
              </div>
              <h3 className="mt-3 text-base font-semibold text-white tracking-tight">
                Everything
              </h3>
              <div className="flex-grow" />
              <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11.5px] text-white/70 tabular-nums">
                {resources.length} item{resources.length === 1 ? '' : 's'}
              </div>
            </button>
            {folders.map((folder, i) => (
              <button
                key={folder.id}
                onClick={() => setFilterFolder(folder.id)}
                className={cn(
                  'group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 text-left touch-manipulation flex flex-col min-h-[140px] rounded-2xl border',
                  filterFolder === folder.id
                    ? 'border-elec-yellow/60'
                    : 'border-white/[0.06]'
                )}
              >
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-px opacity-70 group-hover:opacity-100 transition-opacity',
                    toneDot[folder.tone]
                  )}
                />
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                  {String(i + 1).padStart(2, '0')} · Folder
                </div>
                <h3 className="mt-3 text-base font-semibold text-white tracking-tight">
                  {folder.label}
                </h3>
                <div className="flex-grow" />
                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11.5px] text-white/70 tabular-nums">
                  {folder.count} item{folder.count === 1 ? '' : 's'}
                </div>
              </button>
            ))}
          </HubGrid>
        </motion.section>
      )}

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All' },
            { value: 'pdf', label: 'PDFs' },
            { value: 'doc', label: 'Docs' },
            { value: 'slides', label: 'Slides' },
            { value: 'video', label: 'Videos' },
            { value: 'image', label: 'Images' },
            { value: 'link', label: 'Links' },
          ]}
          activeTab={filterKind}
          onTabChange={setFilterKind}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search documents…"
          actions={
            <div className="flex items-center gap-0 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'px-3 py-1 text-[11.5px] font-medium rounded-full transition-colors touch-manipulation',
                  viewMode === 'grid'
                    ? 'bg-elec-yellow text-black'
                    : 'text-white hover:text-white'
                )}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'px-3 py-1 text-[11.5px] font-medium rounded-full transition-colors touch-manipulation',
                  viewMode === 'list'
                    ? 'bg-elec-yellow text-black'
                    : 'text-white hover:text-white'
                )}
              >
                List
              </button>
            </div>
          }
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow={loading ? 'Loading…' : 'Documents'}
          title={
            loading
              ? '—'
              : hasMore
                ? `Showing ${shown.length} of ${filtered.length}`
                : `${filtered.length} item${filtered.length === 1 ? '' : 's'}`
          }
        />

        {error ? (
          <EmptyState
            title="Could not load documents"
            description={error}
            action="Retry"
            onAction={refresh}
          />
        ) : loading ? (
          <HubGrid columns={4}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[140px] bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl animate-pulse"
              />
            ))}
          </HubGrid>
        ) : filtered.length === 0 ? (
          <EmptyState
            title={resources.length === 0 ? 'No documents yet' : 'No matches'}
            description={
              resources.length === 0
                ? 'Upload teaching resources from the Teaching Resources section to see them here.'
                : 'Try adjusting your filters or search query.'
            }
            action={resources.length === 0 ? 'Open Teaching Resources' : undefined}
            onAction={
              resources.length === 0
                ? () => onNavigate?.('teachingresources')
                : undefined
            }
          />
        ) : viewMode === 'grid' ? (
          <HubGrid columns={4}>
            {shown.map((resource, i) => (
              <button
                key={resource.id}
                type="button"
                onClick={() => openResource(resource)}
                className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-4 flex flex-col min-h-[140px] rounded-2xl border border-white/[0.06] text-left touch-manipulation focus:outline-none focus:ring-2 focus:ring-elec-yellow/40"
              >
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-px opacity-70',
                    toneDot[KIND_TONE[resource.kind]]
                  )}
                />
                <div className="flex items-start justify-between">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                    {String(i + 1).padStart(2, '0')} · {KIND_LABEL[resource.kind]}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconButton
                        aria-label="Options"
                        onClick={(e) => e.stopPropagation()}
                        className="-mt-1 -mr-1 shrink-0"
                      >
                        <span className="text-[18px] leading-none">⋯</span>
                      </IconButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenuItem
                        className="h-11"
                        onClick={() => openResource(resource)}
                      >
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="h-11 text-red-400 focus:text-red-300"
                        onClick={() => setDeleting(resource)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h4 className="mt-3 text-[13.5px] font-medium text-white line-clamp-2">
                  {resource.title}
                </h4>
                <div className="flex-grow" />
                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-white/70 tabular-nums">
                  {formatFileSize(resource.size_bytes)}
                </div>
              </button>
            ))}
          </HubGrid>
        ) : (
          <ListCard>
            {shown.map((resource) => (
              <button
                key={resource.id}
                type="button"
                onClick={() => openResource(resource)}
                className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-[hsl(0_0%_15%)] transition-colors text-left touch-manipulation"
              >
                <span
                  aria-hidden
                  className={cn(
                    'h-1.5 w-1.5 rounded-full shrink-0',
                    toneDot[KIND_TONE[resource.kind]]
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-white truncate">
                    {resource.title}
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-[11.5px] text-white/70">
                    <span className="tabular-nums">
                      {formatFileSize(resource.size_bytes)}
                    </span>
                    {resource.uploader_name && <span>{resource.uploader_name}</span>}
                    <span className="tabular-nums">
                      {new Date(resource.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconButton
                      aria-label="Options"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0"
                    >
                      <span className="text-[18px] leading-none">⋯</span>
                    </IconButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem
                      className="h-11"
                      onClick={() => openResource(resource)}
                    >
                      Open
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="h-11 text-red-400 focus:text-red-300"
                      onClick={() => setDeleting(resource)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </button>
            ))}
          </ListCard>
        )}

        {!loading && !error && hasMore && (
          <div className="flex justify-center">
            <SecondaryButton onClick={() => setVisibleCount((c) => c + 24)}>
              Load more · {filtered.length - visibleCount} left
            </SecondaryButton>
          </div>
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
    </PageFrame>
  );
}
