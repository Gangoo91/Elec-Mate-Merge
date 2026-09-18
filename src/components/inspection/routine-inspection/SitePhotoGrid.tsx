import { useRef, useState } from 'react';
import { Camera, FolderOpen, ImagePlus, X } from 'lucide-react';
import { JobPhotoImportSheet } from '@/components/inspection/site-photos/JobPhotoImportSheet';
import { Input } from '@/components/ui/input';
import { inputCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import type { RoutineSitePhoto } from '@/types/routine-inspection';

/**
 * Photographs of the installation as a whole — the board as found, the meter
 * position, an alarm head, a label, damage the tenant reported.
 *
 * 🔴 WHY NOT `SitePhotosSection`, WHICH THE EICR ALREADY HAS.
 * That one is storage-backed, and its own header states that its photos DO NOT
 * PRINT: no formatter emits a non-defect photo, because printing them broke
 * generation and delivery on photo-heavy certificates. On a report that carries
 * no test results, a picture that does not print is not evidence of anything.
 * So these are inline and they print — and the cost of that is bounded by the
 * byte budget rather than ignored.
 *
 * ⚠️ CAPTIONS ARE THE POINT, not decoration. A landlord opening this in six
 * months cannot tell one white consumer unit from another. An uncaptioned
 * photograph is a picture; a captioned one is a record.
 */

/** A cap on top of the byte budget: past this the appendix stops being read. */
export const MAX_SITE_PHOTOS = 8;

/**
 * The compression both routes share.
 *
 * 🔴 It has to be ONE function. A photo taken here and the same photo pulled in
 * from a job must land on the report at the same size and quality — otherwise
 * the byte budget means two different things depending on which button was
 * pressed, and the appendix prints at two different qualities.
 *
 * 900px / q0.72: these are context shots — "this is the board, this is where
 * the meter is" — and nobody zooms into one to judge a scorch mark. Measured
 * through this exact path, a detail-heavy frame lands near 400 KB of base64
 * against roughly 505 KB at the finding settings. Finding photos keep the
 * higher quality because there the detail IS the evidence.
 */
function compressToDataUrl(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve(null);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => resolve(null);
      img.onload = () => {
        const MAX_EDGE = 900;
        const scale = img.width > MAX_EDGE ? MAX_EDGE / img.width : 1;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

interface Props {
  photos: RoutineSitePhoto[];
  onChange: (photos: RoutineSitePhoto[]) => void;
  /** Set when the report's photo budget is spent — blocks adding, explains why. */
  budgetBlockedReason?: string;
  /** Customer on the report, so their jobs are offered first in the picker. */
  customerId?: string | null;
}

export default function SitePhotoGrid({
  photos,
  onChange,
  budgetBlockedReason,
  customerId,
}: Props) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const libraryRef = useRef<HTMLInputElement>(null);
  const [importOpen, setImportOpen] = useState(false);

  /*
   * 🔴 The same trap `PhotoStrip` documents: each FileReader.onload fires on its
   * own tick over a stale `photos`, so two images picked at once would both see
   * the original array and the second would drop the first. The ref CLAIMS the
   * slot immediately rather than waiting for React to re-render.
   */
  const photosRef = useRef(photos);
  photosRef.current = photos;

  const full = photos.length >= MAX_SITE_PHOTOS;
  const blocked = full || !!budgetBlockedReason;

  /** Adds one compressed image, or refuses when the per-report cap is reached. */
  const append = (src: string): boolean => {
    const current = photosRef.current;
    if (current.length >= MAX_SITE_PHOTOS) return false;
    const next = [...current, { id: crypto.randomUUID(), src, caption: '' }];
    photosRef.current = next; // claim the slot now — see the note on the ref
    onChange(next);
    return true;
  };

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    e.target.value = '';
    if (!files) return;
    for (const file of Array.from(files)) {
      const src = await compressToDataUrl(file);
      if (src) append(src);
    }
  };

  /*
   * ⚠️ MUST resolve false when the photo did not land — the sheet counts what
   * it imported from this return value, and its own header warns that a caller
   * assuming success reports photos it never added. Both real failure modes
   * return false here: a file that cannot be decoded, and the per-report cap.
   */
  const onImportFromJob = async (file: File): Promise<boolean> => {
    const src = await compressToDataUrl(file);
    return src ? append(src) : false;
  };

  const setCaption = (id: string, caption: string) =>
    onChange(photos.map((p) => (p.id === id ? { ...p, caption } : p)));

  return (
    <div className="space-y-3">
      {/*
        ⚠️ The camera goes full width on a phone and shares the row from `sm` up.
        Three equal buttons across a 360px screen leaves about 110px each, which
        wraps every label onto two lines and breaks the 44px row height. Taking
        a photo is also the common action — it earns the whole width.
      */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={blocked}
          onClick={() => cameraRef.current?.click()}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.06] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.12] touch-manipulation active:scale-[0.98] disabled:opacity-50 sm:w-auto sm:flex-1"
        >
          <Camera className="h-4 w-4" />
          Take a photo
        </button>
        <button
          type="button"
          disabled={blocked}
          onClick={() => setImportOpen(true)}
          className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.06] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.12] touch-manipulation active:scale-[0.98] disabled:opacity-50"
        >
          <FolderOpen className="h-4 w-4 flex-shrink-0" />
          From a job
        </button>
        <button
          type="button"
          disabled={blocked}
          onClick={() => libraryRef.current?.click()}
          className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.06] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.12] touch-manipulation active:scale-[0.98] disabled:opacity-50"
        >
          <ImagePlus className="h-4 w-4 flex-shrink-0" />
          From the library
        </button>
      </div>

      {budgetBlockedReason ? (
        <p className="text-[12px] leading-snug text-elec-yellow">{budgetBlockedReason}</p>
      ) : full ? (
        <p className="text-[12px] leading-snug text-white">
          {MAX_SITE_PHOTOS} photos — the limit for one report. Remove one to add another.
        </p>
      ) : null}

      {photos.length > 0 && (
        <div className="space-y-3">
          {photos.map((p, i) => (
            <div
              key={p.id}
              className="flex gap-3 rounded-xl border border-white/[0.14] bg-white/[0.04] p-3"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={p.src}
                  alt={p.caption || `Site photo ${i + 1}`}
                  className="h-20 w-20 rounded-lg border border-white/[0.14] object-cover"
                />
                {/*
                  ⚠️ 44px hit area behind a 24px badge — same reasoning as
                  PhotoStrip. A small delete control beside a thumbnail is one
                  mis-tap away from destroying evidence.
                */}
                <button
                  type="button"
                  onClick={() => onChange(photos.filter((x) => x.id !== p.id))}
                  aria-label={`Remove site photo ${i + 1}`}
                  className="absolute -right-3.5 -top-3.5 flex h-11 w-11 items-center justify-center touch-manipulation"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.2] bg-black/85 text-white">
                    <X className="h-3.5 w-3.5" />
                  </span>
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <Input
                  value={p.caption}
                  onChange={(e) => setCaption(p.id, e.target.value)}
                  className={cn(inputCn, 'h-11')}
                  placeholder="What is this? e.g. Consumer unit as found"
                  aria-label={`Caption for site photo ${i + 1}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={onPick}
        className="hidden"
      />
      {/*
        🔴 No `capture` here, deliberately — the same reason PhotoStrip splits
        its two inputs. On iOS `capture` removes the option to choose an
        existing image at all, and an electrician who photographed the board an
        hour ago and is writing the report in the van has nothing to attach.
      */}
      <input
        ref={libraryRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onPick}
        className="hidden"
      />

      {/*
        The same picker the EICR uses (ELE-1729): an electrician photographs the
        board on site against the job, then writes the report in the van or at
        home. Without this the photos are stranded on the job and the report is
        written from memory.

        ⚠️ The EICR COPIES the file into its own storage so the certificate
        stands alone if the job is deleted. This report inlines it into the
        report row, which stands alone for the same reason and with no second
        copy to keep.
      */}
      <JobPhotoImportSheet
        open={importOpen}
        onOpenChange={setImportOpen}
        customerId={customerId}
        onImport={onImportFromJob}
      />
    </div>
  );
}
