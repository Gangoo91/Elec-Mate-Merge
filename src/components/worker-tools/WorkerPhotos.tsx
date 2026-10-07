/**
 * Photos for Worker Tools pages (ELE-1999 / ELE-2003).
 *
 * WorkerPhotoPicker — big camera button for gloved hands; each photo is
 * compressed on the phone (poor signal on site) and uploaded straight away to
 * the private visual-uploads bucket via uploadReportPhoto. The parent only
 * ever holds storage PATHS, never public URLs.
 *
 * WorkerPhotoStrip — thumbnails for stored paths (signed URLs, batch-signed),
 * tap to view full screen.
 */
import { useEffect, useRef, useState } from 'react';
import { Camera, Loader2, X, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { uploadReportPhoto } from '@/hooks/useWorkerSelfService';
import { compressImageForUpload } from '@/utils/imageUploadUtils';
import { useStorageUrls } from '@/utils/storageUrls';

interface PickedPhoto {
  key: string;
  /** Storage path once uploaded. */
  path: string | null;
  /** Local preview (object URL) or null for photos that were already saved. */
  preview: string | null;
  uploading: boolean;
  failed: boolean;
  /** Uploaded in this session — removing it also deletes the file. */
  fresh: boolean;
}

export function WorkerPhotoPicker({
  jobId,
  initialPaths = [],
  onChange,
  onBusyChange,
  max = 6,
  label = 'Add photos',
  disabled,
}: {
  jobId: string;
  initialPaths?: string[];
  onChange: (paths: string[]) => void;
  onBusyChange?: (busy: boolean) => void;
  max?: number;
  label?: string;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<PickedPhoto[]>(() =>
    initialPaths.map((p) => ({
      key: p,
      path: p,
      preview: null,
      uploading: false,
      failed: false,
      fresh: false,
    }))
  );

  const savedPaths = items.filter((i) => !i.preview && i.path).map((i) => i.path as string);
  const { urls: savedUrls } = useStorageUrls('visual-uploads', savedPaths);

  const busy = items.some((i) => i.uploading);
  useEffect(() => {
    onChange(items.filter((i) => i.path && !i.failed).map((i) => i.path as string));
    onBusyChange?.(busy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // Release object URLs when the picker goes away.
  const itemsRef = useRef(items);
  itemsRef.current = items;
  useEffect(
    () => () => {
      itemsRef.current.forEach((i) => i.preview && URL.revokeObjectURL(i.preview));
    },
    []
  );

  const upload = async (key: string, file: File) => {
    try {
      const small = await compressImageForUpload(file).catch(() => file);
      const path = await uploadReportPhoto(jobId, small, 'notes');
      setItems((prev) =>
        prev.map((i) => (i.key === key ? { ...i, path, uploading: false, failed: false } : i))
      );
    } catch (e) {
      setItems((prev) =>
        prev.map((i) => (i.key === key ? { ...i, uploading: false, failed: true } : i))
      );
      const msg = (e as Error)?.message || '';
      toast.error(
        /fetch|network/i.test(msg)
          ? 'Photo didn’t upload. No signal. Tap it to try again.'
          : msg || 'Photo didn’t upload'
      );
    }
  };

  const filesRef = useRef(new Map<string, File>());

  const onPick = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const room = max - items.length;
    const files = Array.from(list).slice(0, Math.max(0, room));
    if (list.length > room) toast.info(`Up to ${max} photos`);
    const added: PickedPhoto[] = files.map((f) => {
      const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      filesRef.current.set(key, f);
      return {
        key,
        path: null,
        preview: URL.createObjectURL(f),
        uploading: true,
        failed: false,
        fresh: true,
      };
    });
    setItems((prev) => [...prev, ...added]);
    added.forEach((a) => upload(a.key, filesRef.current.get(a.key)!));
  };

  const retry = (key: string) => {
    const f = filesRef.current.get(key);
    if (!f) return;
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, uploading: true, failed: false } : i)));
    upload(key, f);
  };

  const remove = (key: string) => {
    const item = items.find((i) => i.key === key);
    setItems((prev) => prev.filter((i) => i.key !== key));
    if (item?.preview) URL.revokeObjectURL(item.preview);
    filesRef.current.delete(key);
    // A photo uploaded in this session and never saved anywhere — tidy it up.
    if (item?.fresh && item.path) {
      supabase.storage.from('visual-uploads').remove([item.path]).catch(() => undefined);
    }
  };

  const full = items.length >= max;

  return (
    <div className="space-y-3">
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {items.map((i) => {
            const src = i.preview ?? (i.path ? savedUrls[i.path] : undefined);
            return (
              <div
                key={i.key}
                className="relative aspect-square overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04]"
              >
                {src && <img src={src} alt="" className="h-full w-full object-cover" />}
                {i.uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                )}
                {i.failed && (
                  <button
                    type="button"
                    onClick={() => retry(i.key)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/70 text-[12px] font-semibold text-white touch-manipulation"
                  >
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    Tap to retry
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(i.key)}
                  aria-label="Remove photo"
                  className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center touch-manipulation"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/75 text-white">
                    <X className="h-4 w-4" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          onPick(e.target.files);
          e.target.value = '';
        }}
      />
      <button
        type="button"
        disabled={disabled || full}
        onClick={() => inputRef.current?.click()}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.18] bg-white/[0.06] text-[15px] font-semibold text-white touch-manipulation active:scale-[0.99] disabled:opacity-50"
      >
        <Camera className="h-5 w-5 text-elec-yellow" />
        {full ? `${max} photos added` : items.length > 0 ? 'Add another photo' : label}
      </button>
    </div>
  );
}

export function WorkerPhotoStrip({
  bucket,
  paths,
  className,
  columns = 3,
}: {
  bucket: 'visual-uploads' | 'job-photos';
  paths: string[];
  className?: string;
  columns?: 3 | 4;
}) {
  const { urls } = useStorageUrls(bucket, paths);
  const [open, setOpen] = useState<string | null>(null);
  if (paths.length === 0) return null;
  return (
    <>
      <div className={cn('grid gap-2', columns === 4 ? 'grid-cols-4' : 'grid-cols-3', className)}>
        {paths.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => urls[p] && setOpen(urls[p])}
            className="aspect-square overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04] touch-manipulation"
            aria-label="View photo"
          >
            {urls[p] ? (
              <img src={urls[p]} alt="" loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <span className="block h-full w-full animate-pulse bg-white/[0.06]" />
            )}
          </button>
        ))}
      </div>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex flex-col bg-black"
          onClick={() => setOpen(null)}
        >
          <div className="flex justify-end p-2 pt-[max(0.5rem,env(safe-area-inset-top))]">
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="flex h-12 items-center gap-2 rounded-xl bg-white/[0.12] px-4 text-[15px] font-semibold text-white touch-manipulation"
            >
              <X className="h-5 w-5" />
              Close
            </button>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center p-2">
            <img src={open} alt="" className="max-h-full max-w-full object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
