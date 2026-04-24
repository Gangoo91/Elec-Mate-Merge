import { useMemo, useRef, useState, type DragEvent } from 'react';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  FilterBar,
  EmptyState,
  itemVariants,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import {
  useCollegeResources,
  type CollegeResource,
  type ResourceKind,
} from '@/hooks/useCollegeResources';
import { AddResourceLinkDialog } from '@/components/college/dialogs/AddResourceLinkDialog';
import { EditResourceDialog } from '@/components/college/dialogs/EditResourceDialog';
import { ResourceCard } from '@/components/college/ui/ResourceCard';
import { ResourcePreviewSheet } from '@/components/college/sheets/ResourcePreviewSheet';
import { ResourceLinksPanel } from '@/components/college/ui/ResourceLinksPanel';

const KIND_TABS: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'document', label: 'Documents' },
  { value: 'video', label: 'Videos' },
  { value: 'slide', label: 'Slides' },
  { value: 'sheet', label: 'Sheets' },
  { value: 'image', label: 'Images' },
  { value: 'audio', label: 'Audio' },
  { value: 'link', label: 'Links' },
];

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
  const [filterKind, setFilterKind] = useState<string>('all');
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewResource, setPreviewResource] = useState<CollegeResource | null>(null);
  const [editResource, setEditResource] = useState<CollegeResource | null>(null);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesKind = filterKind === 'all' || r.kind === filterKind;
      const q = searchQuery.toLowerCase();
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

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum · Teaching Resources"
          title="Materials library"
          description="Slides, handouts, videos, sheets and links — shared across courses and cohorts."
          tone="amber"
          actions={
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLinkDialogOpen(true)}
                className="text-[12.5px] font-medium text-white/85 hover:text-white transition-colors touch-manipulation whitespace-nowrap"
              >
                + Link
              </button>
              <button
                onClick={pickFiles}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Upload resource →
              </button>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={KIND_TABS}
          activeTab={filterKind}
          onTabChange={setFilterKind}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search resources…"
        />
      </motion.div>

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

      {/* Upload in-flight panel */}
      {uploads.length > 0 && (
        <motion.div variants={itemVariants}>
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between gap-3">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">
                Uploads ·{' '}
                {inProgressUploads.length > 0
                  ? `${inProgressUploads.length} in progress`
                  : `${uploads.length} completed`}
              </div>
              {inProgressUploads.length === 0 && uploads.length > 0 && (
                <button
                  onClick={clearFinishedUploads}
                  className="text-[11.5px] text-white/65 hover:text-white transition-colors"
                >
                  Dismiss
                </button>
              )}
            </div>
            <ul className="divide-y divide-white/[0.06]">
              {uploads.map((u) => (
                <li
                  key={u.token}
                  className="px-4 sm:px-5 py-3 flex items-center gap-3 text-[12.5px] min-w-0"
                >
                  <span className="flex-1 min-w-0 truncate text-white">
                    {u.file.name}
                  </span>
                  <span className="hidden sm:inline text-white/55 tabular-nums shrink-0">
                    {(u.file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <span
                    className={cn(
                      'text-[11px] shrink-0 truncate max-w-[40%] sm:max-w-none',
                      u.status === 'done' && 'text-emerald-300',
                      u.status === 'error' && 'text-red-300',
                      u.status === 'uploading' && 'text-elec-yellow/85',
                      u.status === 'queued' && 'text-white/55'
                    )}
                    title={u.status === 'error' ? u.error : undefined}
                  >
                    {u.status === 'done'
                      ? 'Uploaded'
                      : u.status === 'error'
                        ? 'Failed'
                        : u.status === 'uploading'
                          ? 'Uploading…'
                          : 'Queued'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Drop zone + grid */}
      <motion.div variants={itemVariants}>
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            'relative rounded-2xl border transition-colors',
            dragOver
              ? 'border-elec-yellow/60 bg-elec-yellow/[0.05]'
              : 'border-white/[0.06] bg-transparent'
          )}
        >
          {dragOver && (
            <div className="hidden sm:flex absolute inset-0 z-10 items-center justify-center pointer-events-none rounded-2xl bg-elec-yellow/[0.03]">
              <div className="text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
                  Drop to upload
                </div>
                <div className="mt-1 text-[13px] text-white/85">
                  Release your files anywhere in the library
                </div>
              </div>
            </div>
          )}

          {loading && !hasResources ? (
            <div className="px-6 py-16 text-center text-[12.5px] text-white/60">
              Loading library…
            </div>
          ) : !hasResources ? (
            <EmptyState
              title="No teaching resources yet"
              description="Drag and drop files here, pick them from your device, or paste an external link. They'll be organised by course and searchable by tag."
              action="Upload files"
              onAction={pickFiles}
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="Nothing matches"
              description="Try adjusting the filter or clearing the search."
            />
          ) : (
            <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filtered.map((r) => (
                <ResourceCardCell
                  key={r.id}
                  resource={r}
                  onOpen={() => setPreviewResource(r)}
                  onDelete={() => deleteResource(r.id)}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

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
          // The hook already refreshes on load; the card will pick up changes
          // on next refetch. Close and clear.
          setEditResource(null);
        }}
      />
    </PageFrame>
  );
}

function ResourceCardCell({
  resource,
  onOpen,
  onDelete,
}: {
  resource: CollegeResource;
  onOpen: () => void | Promise<void>;
  onDelete: () => void;
}) {
  return <ResourceCard resource={resource} onOpen={onOpen} onDelete={onDelete} />;
}

export type { ResourceKind };
