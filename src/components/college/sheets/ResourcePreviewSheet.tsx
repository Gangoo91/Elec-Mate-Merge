import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { CollegeResource } from '@/hooks/useCollegeResources';
import { recordResourceEvent } from '@/hooks/useResourceAnalytics';

/* ==========================================================================
   ResourcePreviewSheet — inline viewer for any college resource.
   Images  → <img>
   PDFs    → <iframe> (browser native PDF)
   Video   → <video>
   Audio   → <audio>
   Link    → preview card + open-in-new-tab
   Other   → download prompt
   ========================================================================== */

export interface ResourcePreviewSheetProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  resource: CollegeResource | null;
  signedUrl: (filePath: string) => Promise<string>;
  onEdit?: (r: CollegeResource) => void;
  onDelete?: (r: CollegeResource) => void;
  /** Slot for linked-items blocks (ACs / lessons) rendered in the meta panel. */
  linksSlot?: React.ReactNode;
}

export function ResourcePreviewSheet({
  open,
  onOpenChange,
  resource,
  signedUrl,
  onEdit,
  onDelete,
  linksSlot,
}: ResourcePreviewSheetProps) {
  const { toast } = useToast();
  const [viewUrl, setViewUrl] = useState<string | null>(null);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    if (!open || !resource) return;
    if (resource.external_url) {
      setViewUrl(resource.external_url);
      return;
    }
    if (!resource.file_path) return;
    let cancelled = false;
    setResolving(true);
    signedUrl(resource.file_path)
      .then((url) => {
        if (!cancelled) setViewUrl(url);
      })
      .catch((e) => {
        if (!cancelled)
          toast({
            title: 'Could not load resource',
            description: (e as Error).message,
            variant: 'destructive',
          });
      })
      .finally(() => {
        if (!cancelled) setResolving(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, resource, signedUrl, toast]);

  // Record a view (or open_link) once each time the sheet opens for a resource,
  // so Resource Analytics actually populates (ELE-1101). Keyed on the resource
  // id so re-renders don't double-count.
  useEffect(() => {
    if (!open || !resource) return;
    void recordResourceEvent({
      resourceId: resource.id,
      eventKind: resource.external_url ? 'open_link' : 'view',
      context: 'resource_library',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, resource?.id]);

  const download = useCallback(async () => {
    if (!resource?.file_path) return;
    try {
      const { data } = await supabase.storage
        .from('college-resources')
        .createSignedUrl(resource.file_path, 60 * 10, {
          download: resource.title,
        });
      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank', 'noopener');
        void recordResourceEvent({
          resourceId: resource.id,
          eventKind: 'download',
          context: 'resource_library',
        });
      }
    } catch (e) {
      toast({
        title: 'Download failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  }, [resource, toast]);

  const kindLabel = useMemo(() => {
    if (!resource) return '';
    const map: Record<string, string> = {
      document: 'Document',
      slide: 'Slide deck',
      sheet: 'Spreadsheet',
      image: 'Image',
      video: 'Video',
      audio: 'Audio',
      link: 'External link',
      other: 'File',
    };
    return map[resource.kind] ?? 'File';
  }, [resource]);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={kindLabel || 'Resource'}
      title={<span className="block truncate">{resource?.title ?? 'Resource'}</span>}
      description={resource?.description || undefined}
      headerTrailing={
        resource && onEdit ? (
          <button
            type="button"
            onClick={() => onEdit(resource)}
            className="h-9 rounded-full border border-white/[0.14] px-3.5 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow"
          >
            Edit
          </button>
        ) : undefined
      }
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,1fr)_340px]"
      footer={
        resource ? (
          <div
            className={cn(
              'grid gap-2.5',
              onDelete && (resource.external_url || resource.file_path)
                ? 'grid-cols-2'
                : 'grid-cols-1'
            )}
          >
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(resource)}
                className="h-12 rounded-xl border border-red-500/30 bg-white/[0.04] text-[14px] font-medium text-red-300 transition-colors touch-manipulation hover:bg-red-500/10"
              >
                Delete
              </button>
            )}
            {resource.external_url ? (
              <a
                href={resource.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonPrimaryCn, 'inline-flex items-center justify-center')}
              >
                Open link
              </a>
            ) : resource.file_path ? (
              <button type="button" onClick={download} className={buttonPrimaryCn}>
                Download
              </button>
            ) : null}
          </div>
        ) : undefined
      }
    >
      {resource && (
        <>
          <div className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-2xl sm:border sm:border-white/[0.08]">
            <PreviewSurface resource={resource} url={viewUrl} resolving={resolving} />
          </div>

          <aside className="space-y-5">
            <div>
              <h3 className="text-[13px] font-semibold text-white">Details</h3>
              <dl className="mt-2 divide-y divide-white/[0.06] border-y border-white/[0.06] text-[13px] text-white">
                <MetaRow label="Type">{kindLabel}</MetaRow>
                {resource.size_bytes ? (
                  <MetaRow label="Size">{prettyBytes(resource.size_bytes)}</MetaRow>
                ) : null}
                {resource.duration_seconds ? (
                  <MetaRow label="Length">{prettyDuration(resource.duration_seconds)}</MetaRow>
                ) : null}
                {resource.mime_type && (
                  <MetaRow label="Format">
                    <span className="font-mono text-[12px]">{resource.mime_type}</span>
                  </MetaRow>
                )}
                <MetaRow label="Uploaded">
                  {new Date(resource.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {resource.uploader_name ? ` by ${resource.uploader_name}` : ''}
                </MetaRow>
              </dl>
            </div>

            {resource.tags.length > 0 && (
              <div>
                <h3 className="text-[13px] font-semibold text-white">Tags</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {resource.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.12] bg-white/[0.06] px-2.5 py-0.5 text-[12px] text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Download stays reachable for a linked file that also has a URL */}
            {resource.external_url && resource.file_path && (
              <button type="button" onClick={download} className={cn(buttonSecondaryCn, 'w-full')}>
                Download file
              </button>
            )}

            {/* Links slot — AC + lesson links rendered here by parent */}
            {linksSlot}
          </aside>
        </>
      )}
    </FormSheet>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-white">{label}</dt>
      <dd className="min-w-0 text-right font-medium tabular-nums text-white">{children}</dd>
    </div>
  );
}

/* ==========================================================================
   PreviewSurface — renders the right viewer per kind
   ========================================================================== */

function PreviewSurface({
  resource,
  url,
  resolving,
}: {
  resource: CollegeResource;
  url: string | null;
  resolving: boolean;
}) {
  if (resolving && !url) {
    return (
      <div className="h-[320px] sm:h-[420px] flex items-center justify-center bg-[hsl(0_0%_9%)]">
        <div className="h-4 w-4 rounded-full border-2 border-white/15 border-t-elec-yellow animate-spin" />
      </div>
    );
  }
  if (!url) {
    return (
      <div className="h-[200px] flex items-center justify-center bg-[hsl(0_0%_9%)] text-[12.5px] text-white">
        Preview unavailable.
      </div>
    );
  }

  if (resource.kind === 'image') {
    return (
      <div className="bg-[hsl(0_0%_9%)] max-h-[70vh] flex items-center justify-center p-4">
        <img
          src={url}
          alt={resource.title}
          className="max-h-[60vh] max-w-full object-contain rounded"
        />
      </div>
    );
  }

  if (resource.kind === 'video') {
    return (
      <div className="bg-black">
        <video
          src={url}
          controls
          preload="metadata"
          className="w-full max-h-[65vh] object-contain"
        />
      </div>
    );
  }

  if (resource.kind === 'audio') {
    return (
      <div className="bg-[hsl(0_0%_9%)] p-6">
        <div className="max-w-xl mx-auto">
          <div className="mb-3 text-center text-[13px] font-semibold text-white">Audio</div>
          <audio src={url} controls className="w-full" preload="metadata" />
        </div>
      </div>
    );
  }

  if (resource.kind === 'document' && resource.mime_type === 'application/pdf') {
    return (
      <iframe
        src={url}
        className="w-full h-[60vh] sm:h-[70vh] bg-[hsl(0_0%_9%)]"
        title={resource.title}
      />
    );
  }

  if (resource.kind === 'link' && resource.external_url) {
    return (
      <div className="bg-[hsl(0_0%_9%)] px-6 py-8 text-center">
        <div className="mb-2 text-[13px] font-semibold text-white">External link</div>
        <div className="text-[13px] text-white font-mono break-all">{resource.external_url}</div>
        <p className="mt-3 text-[12px] text-white">Use Open link below to view it in a new tab.</p>
      </div>
    );
  }

  return (
    <div className="bg-[hsl(0_0%_9%)] px-6 py-10 text-center text-[12.5px] text-white">
      This file type can't be previewed here. Use Download to open it.
    </div>
  );
}

function prettyBytes(n: number | null): string {
  if (n === null || n === undefined) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v < 10 && i > 0 ? v.toFixed(1) : Math.round(v)} ${units[i]}`;
}

function prettyDuration(sec: number | null): string {
  if (!sec) return '';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
