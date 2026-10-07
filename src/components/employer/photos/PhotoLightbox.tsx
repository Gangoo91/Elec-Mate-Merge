import { useEffect, useState, type ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface LightboxPhoto {
  key: string;
  url: string | null;
  title?: string | null;
  caption?: string | null;
  meta?: string | null;
}

/**
 * Full-screen photo viewer shared by the site diary, Issues and the gallery.
 * Swipe or use the arrows; `actions` renders under the photo for the one on
 * screen (approve, share, annotate, open the record it came from).
 */
export function PhotoLightbox({
  photos,
  index,
  open,
  onOpenChange,
  onIndexChange,
  actions,
}: {
  photos: LightboxPhoto[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
  actions?: (photo: LightboxPhoto, index: number) => ReactNode;
}) {
  const count = photos.length;
  const safe = count ? Math.min(Math.max(index, 0), count - 1) : 0;
  const photo = photos[safe];
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const go = (d: number) => {
    if (!count) return;
    onIndexChange((safe + d + count) % count);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, safe, count]);

  const swipe = useSwipeable({
    onSwipedLeft: () => go(1),
    onSwipedRight: () => go(-1),
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  const broken = !photo?.url || failed[photo.key];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/95" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[101] flex flex-col bg-black text-white outline-none"
          aria-describedby={undefined}
        >
          <div
            className="flex shrink-0 items-center justify-between gap-3 px-4 pb-2"
            style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
          >
            <div className="min-w-0">
              <DialogPrimitive.Title className="truncate text-[15px] font-semibold text-white">
                {photo?.title || 'Photo'}
              </DialogPrimitive.Title>
              {photo?.meta && <p className="truncate text-[12px] text-white">{photo.meta}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {count > 1 && (
                <span className="text-[12px] tabular-nums text-white">
                  {safe + 1} of {count}
                </span>
              )}
              <DialogPrimitive.Close
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.1] touch-manipulation"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </DialogPrimitive.Close>
            </div>
          </div>

          <div {...swipe} className="relative flex min-h-0 flex-1 items-center justify-center px-2">
            {photo && !broken ? (
              <img
                key={photo.key}
                src={photo.url ?? undefined}
                alt={photo.title || 'Photo'}
                onError={() => setFailed((f) => ({ ...f, [photo.key]: true }))}
                className="max-h-full max-w-full select-none object-contain"
                draggable={false}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 px-6 text-center">
                <ImageOff className="h-8 w-8 text-white" aria-hidden />
                <p className="text-[15px] font-semibold text-white">Photo unavailable</p>
                <p className="max-w-xs text-[13px] text-white">
                  The file for this photo could not be found. Ask whoever took it to add it again.
                </p>
              </div>
            )}
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.12] touch-manipulation sm:flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.12] touch-manipulation sm:flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div
            className="shrink-0 space-y-3 px-4 pt-3"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            {photo?.caption && (
              <p className="line-clamp-3 text-[13px] leading-snug text-white">{photo.caption}</p>
            )}
            {photo && actions && (
              <div className={cn('flex flex-wrap gap-2')}>{actions(photo, safe)}</div>
            )}
            {count > 1 && (
              <p className="text-center text-[11px] text-white sm:hidden">Swipe for the next photo</p>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}
