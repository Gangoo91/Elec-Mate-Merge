import { useRef } from 'react';
import { Camera, ImagePlus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Photo capture for a report that carries no test results — the picture is the
 * evidence. Shared by the maintenance observations and the thermal findings,
 * which need it for different reasons and from different places.
 *
 * 🔴 `source` IS THE POINT OF THIS COMPONENT.
 *
 * A thermogram does not come from the phone's camera. No phone has a thermal
 * sensor: the image is produced by a FLIR / InfiRay / Topdon attachment and
 * lands in the manufacturer's own app or the camera roll. `capture="environment"`
 * forces the system camera and, on iOS, removes the option to choose an
 * existing image at all — which would have made it impossible to attach a
 * thermal image to a thermal report.
 *
 * So: `source="camera"` for things photographed on the spot, `source="library"`
 * for anything imported. The library variant omits `capture` entirely, which is
 * what lets the picker offer the photo library.
 */

/** Inline in the report row, so every autosave rewrites them. Hence a cap. */
export const MAX_PHOTOS = 6;

interface Props {
  photos: string[];
  onChange: (photos: string[]) => void;
  source: 'camera' | 'library';
  label: string;
  /** Distinguishes the two strips on a thermal finding for screen readers. */
  altPrefix: string;
  className?: string;
}

export default function PhotoStrip({
  photos,
  onChange,
  source,
  label,
  altPrefix,
  className,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  /*
   * Each FileReader.onload fires on its own tick with a stale closure over
   * `photos`. Two images picked at once would both see the original array and
   * the second would silently drop the first.
   *
   * 🔴 A ref that is only refreshed during render does NOT fix this on its own —
   * that is the subtle part. It closes the gap between renders, but two
   * callbacks landing before React has re-rendered still read the same value.
   * The write below therefore CLAIMS THE SLOT on the ref immediately, before
   * handing the new array up. Correct regardless of when React chooses to
   * re-render, which is not something this component should have to reason about.
   */
  const photosRef = useRef(photos);
  photosRef.current = photos;

  const full = photos.length >= MAX_PHOTOS;

  /*
   * Compressed to 1000px / JPEG 75 before it ever reaches state, matching the
   * visual condition report and the danger notice. Full-resolution phone
   * photos would blow both the PDFMonkey payload and the autosave row.
   */
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    e.target.value = '';
    if (!files) return;
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const MAX_EDGE = 1000;
          const scale = img.width > MAX_EDGE ? MAX_EDGE / img.width : 1;
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const current = photosRef.current;
          if (current.length >= MAX_PHOTOS) return;
          const next = [...current, canvas.toDataURL('image/jpeg', 0.75)];
          photosRef.current = next; // claim it now — see the note on the ref
          onChange(next);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const Icon = source === 'camera' ? Camera : ImagePlus;

  return (
    <div className={cn('space-y-2', className)}>
      <button
        type="button"
        disabled={full}
        onClick={() => fileRef.current?.click()}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.06] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.12] touch-manipulation active:scale-[0.98] disabled:opacity-50"
      >
        <Icon className="h-4 w-4" />
        {full
          ? `${MAX_PHOTOS} images — limit reached`
          : photos.length
            ? `${label} — ${photos.length} added`
            : label}
      </button>

      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {photos.map((src, i) => (
            <div key={i} className="relative">
              <img
                src={src}
                alt={`${altPrefix} ${i + 1}`}
                className="h-16 w-16 rounded-lg border border-white/[0.14] object-cover"
              />
              {/*
                ⚠️ The HIT AREA is 44px, the visible badge is not. A 24px
                delete button next to a 64px thumbnail is a miss-tap away from
                destroying evidence.
              */}
              <button
                type="button"
                onClick={() => onChange(photos.filter((_, n) => n !== i))}
                aria-label={`Remove ${altPrefix} ${i + 1}`}
                className="absolute -right-3.5 -top-3.5 flex h-11 w-11 items-center justify-center touch-manipulation"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.2] bg-black/85 text-white">
                  <X className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        /* 🔴 See the header — omitted on purpose for imported thermal images. */
        {...(source === 'camera' ? { capture: 'environment' as const } : {})}
        multiple
        onChange={onPick}
        className="hidden"
      />
    </div>
  );
}
