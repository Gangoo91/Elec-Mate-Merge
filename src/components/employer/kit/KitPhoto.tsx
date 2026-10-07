import { useState } from 'react';
import { X } from 'lucide-react';
import { useStorageUrls } from '@/utils/storageUrls';

/** A fault photo from the private kit-photos bucket (signed URL), tap to enlarge. */
export function KitPhoto({ path, alt = 'Photo of the fault' }: { path: string; alt?: string }) {
  const { urls } = useStorageUrls('kit-photos', [path]);
  const [big, setBig] = useState(false);
  const url = urls[path];
  if (!url) return <div className="h-24 w-24 animate-pulse rounded-xl bg-white/[0.06]" aria-hidden />;
  return (
    <>
      <button
        type="button"
        onClick={() => setBig(true)}
        className="h-24 w-24 overflow-hidden rounded-xl border border-white/[0.14] touch-manipulation"
        aria-label="Open the photo"
      >
        <img src={url} alt={alt} className="h-full w-full object-cover" />
      </button>
      {big && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4" onClick={() => setBig(false)}>
          <button
            type="button"
            onClick={() => setBig(false)}
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.12] text-white touch-manipulation"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={url} alt={alt} className="max-h-full max-w-full rounded-xl object-contain" />
        </div>
      )}
    </>
  );
}
