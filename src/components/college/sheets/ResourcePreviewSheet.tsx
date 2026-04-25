import { useCallback, useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { CollegeResource } from '@/hooks/useCollegeResources';

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
  const isMobile = useIsMobile();
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

  const download = useCallback(async () => {
    if (!resource?.file_path) return;
    try {
      const { data } = await supabase.storage
        .from('college-resources')
        .createSignedUrl(resource.file_path, 60 * 10, {
          download: resource.title,
        });
      if (data?.signedUrl) window.open(data.signedUrl, '_blank', 'noopener');
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

  const side = isMobile ? 'bottom' : 'right';
  const classes = cn(
    'bg-[hsl(0_0%_10%)] border-white/[0.08] p-0 flex flex-col',
    isMobile ? 'h-[92vh] rounded-t-2xl' : 'w-[min(100vw,720px)] h-full'
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className={classes}>
        <SheetHeader className="border-b border-white/[0.06] px-5 sm:px-6 py-4 shrink-0 text-left">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
                {kindLabel}
              </div>
              <SheetTitle className="mt-1 text-[17px] sm:text-[18px] font-semibold text-white tracking-tight truncate max-w-full">
                {resource?.title}
              </SheetTitle>
              {resource?.description && (
                <p className="mt-1 text-[12.5px] text-white leading-relaxed line-clamp-2">
                  {resource.description}
                </p>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {resource && (
            <>
              <PreviewSurface
                resource={resource}
                url={viewUrl}
                resolving={resolving}
              />

              <div className="px-5 sm:px-6 py-4 space-y-4">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-white">
                  {resource.size_bytes && (
                    <span className="tabular-nums">
                      {prettyBytes(resource.size_bytes)}
                    </span>
                  )}
                  {resource.duration_seconds && (
                    <span className="tabular-nums">
                      {prettyDuration(resource.duration_seconds)}
                    </span>
                  )}
                  {resource.mime_type && (
                    <span className="font-mono text-white">
                      {resource.mime_type}
                    </span>
                  )}
                  <span className="tabular-nums">
                    Uploaded{' '}
                    {new Date(resource.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  {resource.uploader_name && <span>by {resource.uploader_name}</span>}
                </div>

                {/* Tags */}
                {resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {resource.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] text-white bg-white/[0.04] border border-white/[0.06] rounded-full px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links slot — AC + lesson links rendered here by parent */}
                {linksSlot}
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {resource && (
          <div className="border-t border-white/[0.06] px-5 sm:px-6 py-3 flex items-center justify-between gap-2 shrink-0 flex-wrap">
            <div className="flex items-center gap-2">
              {resource.external_url && (
                <a
                  href={resource.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-4 inline-flex items-center rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[12.5px] font-medium transition-colors"
                >
                  Open link →
                </a>
              )}
              {resource.file_path && (
                <button
                  type="button"
                  onClick={download}
                  className="h-10 px-4 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[12.5px] font-medium transition-colors"
                >
                  Download
                </button>
              )}
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(resource)}
                  className="h-10 px-4 rounded-full border border-white/[0.12] text-[12.5px] font-medium text-white hover:bg-white/[0.06] transition-colors"
                >
                  Edit
                </button>
              )}
            </div>
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(resource)}
                className="h-10 px-4 rounded-full border border-red-500/25 text-[12.5px] font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
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
      <div className="h-[320px] sm:h-[420px] flex items-center justify-center bg-[hsl(0_0%_9%)] border-b border-white/[0.06]">
        <div className="h-4 w-4 rounded-full border-2 border-white/15 border-t-elec-yellow animate-spin" />
      </div>
    );
  }
  if (!url) {
    return (
      <div className="h-[200px] flex items-center justify-center bg-[hsl(0_0%_9%)] border-b border-white/[0.06] text-[12.5px] text-white">
        Preview unavailable.
      </div>
    );
  }

  if (resource.kind === 'image') {
    return (
      <div className="bg-[hsl(0_0%_9%)] border-b border-white/[0.06] max-h-[70vh] flex items-center justify-center p-4">
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
      <div className="bg-black border-b border-white/[0.06]">
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
      <div className="bg-[hsl(0_0%_9%)] border-b border-white/[0.06] p-6">
        <div className="max-w-xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white mb-3 text-center">
            Audio
          </div>
          <audio src={url} controls className="w-full" preload="metadata" />
        </div>
      </div>
    );
  }

  if (resource.kind === 'document' && resource.mime_type === 'application/pdf') {
    return (
      <iframe
        src={url}
        className="w-full h-[60vh] sm:h-[70vh] bg-[hsl(0_0%_9%)] border-b border-white/[0.06]"
        title={resource.title}
      />
    );
  }

  if (resource.kind === 'link' && resource.external_url) {
    return (
      <div className="bg-[hsl(0_0%_9%)] border-b border-white/[0.06] px-6 py-8 text-center">
        <div className="text-[10px] uppercase tracking-[0.22em] text-white mb-2">
          External link
        </div>
        <div className="text-[13px] text-white font-mono break-all">
          {resource.external_url}
        </div>
        <p className="mt-3 text-[12px] text-white">
          Use "Open link →" below to view in a new tab.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[hsl(0_0%_9%)] border-b border-white/[0.06] px-6 py-10 text-center text-[12.5px] text-white">
      This file type doesn't support inline preview — use Download to open it.
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
