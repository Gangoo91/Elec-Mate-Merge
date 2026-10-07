/**
 * Team comms attachments (ELE-1959): photos as thumbnails, PDFs as tappable
 * cards, all opened through short-lived signed URLs from the private
 * `team-comms` bucket.
 */
import { FileText, ImageOff, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isImageAttachment, type CommsAttachment } from '@/services/teamCommsService';

const sizeLabel = (bytes: number | null) => {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function AttachmentGrid({
  attachments,
  urls,
  tone = 'dark',
}: {
  attachments: CommsAttachment[];
  urls: Record<string, string>;
  /** 'light' when sitting on a yellow (own) bubble. */
  tone?: 'dark' | 'light';
}) {
  if (!attachments.length) return null;
  const images = attachments.filter(isImageAttachment);
  const files = attachments.filter((a) => !isImageAttachment(a));

  return (
    <div className="space-y-2">
      {images.length > 0 && (
        <div className={cn('grid gap-1.5', images.length === 1 ? 'grid-cols-1' : 'grid-cols-2')}>
          {images.map((a) => {
            const url = urls[a.path];
            return url ? (
              <a
                key={a.path}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-xl bg-black/30 touch-manipulation"
                aria-label={`Open ${a.name}`}
              >
                <img
                  src={url}
                  alt={a.name}
                  loading="lazy"
                  className={cn(
                    'w-full object-cover',
                    images.length === 1 ? 'max-h-72' : 'h-32'
                  )}
                />
              </a>
            ) : (
              <div
                key={a.path}
                className="flex h-32 items-center justify-center rounded-xl bg-black/30"
              >
                <ImageOff className="h-5 w-5 text-white" aria-label="Photo unavailable" />
              </div>
            );
          })}
        </div>
      )}
      {files.map((a) => {
        const url = urls[a.path];
        const body = (
          <>
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                tone === 'light' ? 'bg-black/15' : 'bg-red-500/15'
              )}
            >
              <FileText className={cn('h-4 w-4', tone === 'light' ? 'text-black' : 'text-red-300')} />
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  'block truncate text-[13px] font-medium',
                  tone === 'light' ? 'text-black' : 'text-white'
                )}
              >
                {a.name}
              </span>
              <span
                className={cn('block text-[11px]', tone === 'light' ? 'text-black' : 'text-white')}
              >
                PDF{a.size ? ` · ${sizeLabel(a.size)}` : ''}
                {url ? ' · Tap to open' : ''}
              </span>
            </span>
          </>
        );
        const cls = cn(
          'flex min-h-[44px] items-center gap-3 rounded-xl px-2.5 py-2 touch-manipulation',
          tone === 'light' ? 'bg-black/10' : 'bg-white/[0.06] border border-white/[0.08]'
        );
        return url ? (
          <a key={a.path} href={url} target="_blank" rel="noreferrer" className={cls}>
            {body}
          </a>
        ) : (
          <div key={a.path} className={cls}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

/** Chips for files picked in the composer but not yet sent. */
export function PendingAttachments({
  items,
  onRemove,
}: {
  items: Array<{ key: string; name: string; uploading: boolean; error?: string }>;
  onRemove: (key: string) => void;
}) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 pb-2">
      {items.map((it) => (
        <span
          key={it.key}
          className={cn(
            'inline-flex h-9 max-w-[220px] items-center gap-1.5 rounded-full border pl-3 pr-1 text-[12.5px] text-white',
            it.error ? 'border-red-500/50 bg-red-500/10' : 'border-white/[0.12] bg-white/[0.06]'
          )}
        >
          {it.uploading && <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-white" />}
          <span className="truncate">{it.error ? `${it.name} — ${it.error}` : it.name}</span>
          <button
            type="button"
            onClick={() => onRemove(it.key)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full touch-manipulation hover:bg-white/[0.08]"
            aria-label={`Remove ${it.name}`}
          >
            <X className="h-3.5 w-3.5 text-white" />
          </button>
        </span>
      ))}
    </div>
  );
}
