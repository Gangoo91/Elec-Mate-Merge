import { useMemo, useRef, useState, type DragEvent } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegeHeading,
  CollegePageHeader,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import { TeachingScreen } from '@/components/college/teaching/TeachingKit';
import { cn } from '@/lib/utils';
import {
  useCollegeResources,
  type CollegeResource,
  type ResourceKind,
} from '@/hooks/useCollegeResources';
import { AddResourceLinkDialog } from '@/components/college/dialogs/AddResourceLinkDialog';
import { EditResourceDialog } from '@/components/college/dialogs/EditResourceDialog';
import { ResourcePreviewSheet } from '@/components/college/sheets/ResourcePreviewSheet';
import { ResourceLinksPanel } from '@/components/college/ui/ResourceLinksPanel';

/**
 * Teaching resources — the materials library a college manages: upload,
 * link, tag, preview, delete. Renders CONTENT ONLY under the CollegeDashboard
 * masthead: quick start (Upload files is the one solid volt card) → KPI row
 * → filters → work-list rows. The whole list is a drop target on desktop.
 */

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

const CHIP =
  'inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-[12.5px] font-medium transition-colors touch-manipulation';
const CHIP_ON = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const CHIP_OFF = 'border-white/[0.12] bg-white/[0.06] text-white hover:border-white/[0.3]';
const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';
const LIST_CARD = COLLEGE_LIST;

const HELP: PageHelpContent = {
  id: 'college-teaching-resources',
  title: 'Teaching resources',
  what: 'The college\'s shared library of slides, handouts, videos and links. Anything here can be attached to a lesson and mapped to the assessment criteria it covers.',
  steps: [
    { title: 'Add to the library', body: 'Upload files (or drag them onto the list on a computer), or add a link to a video or web page.' },
    { title: 'Tag and map', body: 'Open a resource to give it tags and map it to the assessment criteria it teaches.' },
    { title: 'Use it in lessons', body: 'Search by title or tag and attach it to a lesson plan, so learners see it with the lesson.' },
  ],
  notes: [{ title: 'Who sees what', body: 'Everything here is shared with staff at your college.' }],
};

function prettyBytes(n: number | null | undefined): string {
  if (n === null || n === undefined || n <= 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v < 10 && i > 0 ? v.toFixed(1) : Math.round(v)} ${units[i]}`;
}

function prettyDuration(sec: number | null | undefined): string {
  if (!sec) return '';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function hostFromUrl(url: string | null): string {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url.slice(0, 30);
  }
}

export function TeachingResourcesSection() {
  const {
    resources,
    loading,
    uploads,
    uploadMany,
    deleteResource,
    signedUrl,
    clearFinishedUploads,
    addLink,
  } = useCollegeResources();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterKind, setFilterKind] = useState<ResourceKind | 'all'>('all');
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewResource, setPreviewResource] = useState<CollegeResource | null>(null);
  const [editResource, setEditResource] = useState<CollegeResource | null>(null);

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
      const matchesKind = filterKind === 'all' || r.kind === filterKind;
      const matchesSearch =
        q === '' ||
        r.title.toLowerCase().includes(q) ||
        (r.description ?? '').toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchesKind && matchesSearch;
    });
  }, [resources, filterKind, searchQuery]);

  const handleFilesChosen = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    uploadMany(Array.from(list));
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setDragOver(false);
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files ?? []);
    if (files.length > 0) uploadMany(files);
  };

  const pickFiles = () => fileInputRef.current?.click();

  const inProgressUploads = uploads.filter((u) => u.status !== 'done');
  const hasResources = resources.length > 0;
  const linkCount = resources.filter((r) => r.kind === 'link').length;
  const taggedCount = resources.filter((r) => (r.ac_count ?? 0) > 0).length;

  return (
    <TeachingScreen>
      <CollegePageHeader
        eyebrow="Resources"
        title="Teaching resources"
        description="Slides, handouts, videos and links, shared across the college and mapped to the criteria they teach."
        help={HELP}
        actions={
          <>
            <button type="button" className={COLLEGE_BTN} onClick={() => setLinkDialogOpen(true)}>
              Add a link
            </button>
            <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={pickFiles}>
              Upload files
            </button>
          </>
        }
      />

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFilesChosen(e.target.files);
          e.target.value = '';
        }}
      />

      {hasResources && (
        <CollegeStats
          items={[
            { label: 'Resources', value: String(resources.length), sub: linkCount > 0 ? `${linkCount} of them links` : 'shared across the college' },
            {
              label: 'Mapped to criteria',
              value: String(taggedCount),
              sub: taggedCount === resources.length ? 'every resource mapped' : `${resources.length - taggedCount} not yet mapped`,
              warn: taggedCount < resources.length,
            },
            { label: 'Types', value: String(kinds.length), sub: kinds.slice(0, 2).map((k) => KIND_LABEL[k.kind].toLowerCase()).join(', ') || 'none yet' },
            { label: 'Uploading', value: String(inProgressUploads.length), sub: inProgressUploads.length > 0 ? 'in progress now' : 'nothing in flight' },
          ]}
        />
      )}

      {/* Upload in-flight panel */}
      {uploads.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <CollegeHeading>Uploads</CollegeHeading>
            {inProgressUploads.length === 0 ? (
              <button
                type="button"
                onClick={clearFinishedUploads}
                className="-my-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
              >
                Dismiss
              </button>
            ) : (
              <span className="text-[11px] font-semibold tabular-nums text-elec-yellow">
                {inProgressUploads.length} in progress
              </span>
            )}
          </motion.div>
          <motion.div variants={itemVariants} className={LIST_CARD}>
            <ul className="divide-y divide-white/[0.06]">
              {uploads.map((u) => {
                const isActive = u.status === 'uploading' || u.status === 'saving';
                const pct =
                  u.status === 'done' || u.status === 'saving'
                    ? 100
                    : Math.max(Math.round(u.progress * 100), isActive ? 6 : 0);
                return (
                  <li key={u.token} className="space-y-2 px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-3">
                      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-white">
                        {u.file.name}
                      </span>
                      <span className="hidden shrink-0 text-[12px] tabular-nums text-white sm:inline">
                        {(u.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-[12px] font-semibold tabular-nums',
                          u.status === 'error'
                            ? 'text-orange-400'
                            : u.status === 'done'
                              ? 'text-emerald-300'
                              : 'text-white'
                        )}
                        title={u.status === 'error' ? u.error : undefined}
                      >
                        {u.status === 'done'
                          ? 'Uploaded'
                          : u.status === 'error'
                            ? 'Failed'
                            : u.status === 'uploading'
                              ? `${Math.round(u.progress * 100)}%`
                              : u.status === 'saving'
                                ? 'Saving…'
                                : 'Queued'}
                      </span>
                    </div>
                    {u.status !== 'error' && (
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.10]">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            u.status === 'done' ? 'bg-emerald-400' : 'bg-elec-yellow'
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                    {u.status === 'error' && u.error && (
                      <p className="text-[11.5px] leading-snug text-orange-400">{u.error}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.section>
      )}

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <CollegeHeading>Library</CollegeHeading>
          {!loading && hasResources && (
            <span className="text-[11px] font-semibold tabular-nums text-white">
              {filtered.length === resources.length
                ? `${resources.length} item${resources.length === 1 ? '' : 's'}`
                : `${filtered.length} of ${resources.length}`}
            </span>
          )}
        </motion.div>

        {hasResources && (
          <>
            <motion.div variants={itemVariants}>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, description or tags"
                aria-label="Search resources"
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

        {/* Drop zone wraps the list so files can be dropped anywhere on it.
            The border switches to solid volt while a drag is over it — a line,
            never a wash. */}
        <motion.div
          variants={itemVariants}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            'relative',
            dragOver && '[&>*:first-child]:border-elec-yellow'
          )}
        >
          {dragOver && (
            <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center sm:flex">
              <div className="rounded-full bg-elec-yellow px-5 py-2.5 text-[13px] font-semibold text-black">
                Drop to upload
              </div>
            </div>
          )}

          {loading && !hasResources ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : !hasResources ? (
            <CollegeEmpty
              title="No teaching resources yet"
              body="Upload files or add a link. Drag and drop works on a computer. Everything is searchable by tag and can be mapped to assessment criteria."
              action={
                <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={pickFiles}>
                  Upload files
                </button>
              }
            />
          ) : (
            <div className={LIST_CARD}>
              {filtered.length === 0 ? (
                <p className="px-5 py-6 text-[13.5px] text-white sm:px-6">
                  Nothing matches. Clear the search or pick another type.
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.06]">
                  {filtered.map((r) => (
                    <ResourceRow
                      key={r.id}
                      resource={r}
                      onOpen={() => setPreviewResource(r)}
                      onEdit={() => setEditResource(r)}
                      onDelete={() => deleteResource(r.id)}
                    />
                  ))}
                </ul>
              )}
            </div>
          )}
        </motion.div>
      </motion.section>

      <AddResourceLinkDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        onSave={async (input) => {
          await addLink(input);
        }}
      />

      <ResourcePreviewSheet
        open={previewResource !== null}
        onOpenChange={(v) => !v && setPreviewResource(null)}
        resource={previewResource}
        signedUrl={signedUrl}
        onEdit={(r) => {
          setEditResource(r);
          setPreviewResource(null);
        }}
        onDelete={async (r) => {
          await deleteResource(r.id);
          setPreviewResource(null);
        }}
        linksSlot={
          previewResource ? <ResourceLinksPanel resourceId={previewResource.id} /> : null
        }
      />

      <EditResourceDialog
        open={editResource !== null}
        onOpenChange={(v) => !v && setEditResource(null)}
        resource={editResource}
        onSaved={() => {
          // The hook already refreshes on load; the row will pick up changes
          // on next refetch. Close and clear.
          setEditResource(null);
        }}
      />
    </TeachingScreen>
  );
}

function ResourceRow({
  resource,
  onOpen,
  onEdit,
  onDelete,
}: {
  resource: CollegeResource;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const acCount = resource.ac_count ?? 0;
  const tagging = Boolean(resource.ai_tagging);
  const reason = [
    KIND_ONE[resource.kind],
    resource.kind === 'link'
      ? hostFromUrl(resource.external_url)
      : [prettyBytes(resource.size_bytes), prettyDuration(resource.duration_seconds)]
          .filter(Boolean)
          .join(' · '),
    resource.uploader_name,
    resource.tags.length > 0 ? resource.tags.slice(0, 3).join(', ') : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <li className="flex items-center gap-1 pr-2 sm:pr-3">
      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span aria-hidden="true" className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {resource.title}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {reason}
          </span>
        </span>
        <span
          className={cn(
            'shrink-0 text-[13px] font-semibold tabular-nums',
            tagging ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {tagging ? 'Tagging…' : acCount > 0 ? `${acCount} AC${acCount === 1 ? '' : 's'}` : ''}
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
        <DropdownMenuContent align="end" className="min-w-[170px]">
          <DropdownMenuItem className="h-11 touch-manipulation" onClick={onOpen}>
            {resource.kind === 'link' ? 'Open link' : 'Preview / download'}
          </DropdownMenuItem>
          <DropdownMenuItem className="h-11 touch-manipulation" onClick={onEdit}>
            Edit details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="h-11 touch-manipulation text-red-400 focus:text-red-300"
            onClick={onDelete}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}

export type { ResourceKind };
