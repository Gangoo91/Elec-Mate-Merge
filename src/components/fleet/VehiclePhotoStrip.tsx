/**
 * Thumbnails of walk-round photos from the private vehicle-check-photos
 * bucket (signed URLs, 1 hour). Tap one to see it full screen.
 */
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, X } from 'lucide-react';
import { useVehiclePhotoUrls } from '@/hooks/useFleetWalkround';

export function VehiclePhotoStrip({ paths, label }: { paths: string[]; label: string }) {
  const { data: urls, isLoading } = useVehiclePhotoUrls(paths);
  const [open, setOpen] = useState<string | null>(null);
  if (paths.length === 0) return null;
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {paths.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => urls?.[p] && setOpen(urls[p])}
            className="h-16 w-16 overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04] touch-manipulation"
            aria-label={`Open photo ${i + 1} of ${label}`}
          >
            {urls?.[p] ? (
              <img src={urls[p]} alt={`${label}, photo ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
            ) : isLoading ? (
              <span className="flex h-full items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              </span>
            ) : (
              <span className="flex h-full items-center justify-center text-[11px] text-white">Photo</span>
            )}
          </button>
        ))}
      </div>
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-label={`Photo of ${label}`}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setOpen(null)}
          >
            <img src={open} alt={label} className="max-h-full max-w-full rounded-xl object-contain" />
            <button
              type="button"
              aria-label="Close photo"
              onClick={() => setOpen(null)}
              className="absolute right-4 top-[max(16px,env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white touch-manipulation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
