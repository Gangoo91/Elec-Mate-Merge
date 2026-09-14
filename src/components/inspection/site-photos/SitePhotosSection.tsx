/**
 * Site photos on a certificate.
 * ────────────────────────────────────────────────────────────────────────
 * ELE-1729. Photographs of the installation as found — board, meter position,
 * test results, anything worth keeping with the report that is not tied to a
 * single observation.
 *
 * Photos against an OBSERVATION already had a home (`DefectObservationsSection`
 * writes `inspection_photos` keyed by `observation_id`). There was nowhere to
 * put a photo that belongs to the job as a whole, and no way at all to reuse a
 * photo already taken on site against the job — which is what an electrician
 * actually does: photograph the readings, then write the certificate at home.
 *
 * This reuses `useInspectionPhotos` rather than inventing a store, so upload,
 * compression, deletion and the ELE-1536 loading contract all come for free.
 *
 * 🔴 THESE DO NOT PRINT ON THE CERTIFICATE, AND THE HEADING SAYS SO.
 * Every formatter attaches photos to a DEFECT and nothing else — `eicrJsonFormatter`
 * matches `observation_id === defect.id` (or the defect's `inspectionItemId`),
 * `eicJsonFormatter` matches `observation_id === obs.id`, and no formatter emits a
 * non-defect photo array. A site photo has a null `observation_id`, so it is fetched
 * and then dropped. That is deliberate rather than a gap to paper over: photo-heavy
 * EICRs already took 45-57s to render and timed out, and ELE-1189 had to shrink
 * images to keep PDFs under Brevo's attachment limit (one hit 4.4MB). A live job in
 * the data carries 47 photos — importing those into a certificate that printed them
 * all would break generation, or delivery, or both.
 *
 * If they are ever to print, it needs a deliberate cap and template work across all
 * eight certificate types, not a quiet change here.
 */

import { useRef, useState } from 'react';
import { Camera, ImagePlus, Loader2, Trash2 } from 'lucide-react';

import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import { JobPhotoImportSheet } from './JobPhotoImportSheet';

/**
 * Photos here belong to the report rather than to any one inspection line, so
 * they need a stable `item_id` of their own. Changing this string orphans every
 * site photo already taken.
 */
export const SITE_PHOTOS_ITEM_ID = 'site-photos';

interface SitePhotosSectionProps {
  /** Empty until the certificate has been saved once — the section says so. */
  reportId?: string | null;
  reportType: string;
  /** Customer on the certificate, used to offer their jobs first. */
  customerId?: string | null;
}

export function SitePhotosSection({ reportId, reportType, customerId }: SitePhotosSectionProps) {
  const { photos, isLoadingPhotos, isUploading, uploadPhoto, deletePhoto } = useInspectionPhotos({
    reportId: reportId ?? '',
    reportType,
    itemId: SITE_PHOTOS_ITEM_ID,
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const [importOpen, setImportOpen] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    for (const file of Array.from(files)) {
      await uploadPhoto(file);
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <section className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <h2 className="mb-1 text-[15px] font-semibold tracking-tight text-white">
        Site photos — your reference
      </h2>
      <p className="mb-3 text-[12px] text-white">
        Kept with this certificate so you can work from them while you fill it in — readings, board
        shots, anything you photographed on site.{' '}
        <strong className="font-semibold">
          These do not print on the client&rsquo;s certificate.
        </strong>{' '}
        To show a photo to the client, add it to an observation.
      </p>

      {!reportId && (
        <p className="py-3 text-[13px] text-white">
          Photos attach to the saved certificate — fill in the details and save, then add them here.
        </p>
      )}

      {reportId && (
        <div className="mb-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={isUploading}
            className="flex h-11 touch-manipulation items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-semibold text-white disabled:opacity-60"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4 text-elec-yellow" />
            )}
            Add photos
          </button>

          <button
            type="button"
            onClick={() => setImportOpen(true)}
            disabled={isUploading}
            className="flex h-11 touch-manipulation items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-semibold text-white disabled:opacity-60"
          >
            <ImagePlus className="h-4 w-4 text-elec-yellow" />
            From a job
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {isLoadingPhotos && (
        <div className="flex items-center gap-2 py-4 text-[13px] text-white">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading photos…
        </div>
      )}

      {reportId && !isLoadingPhotos && photos.length === 0 && (
        <p className="py-3 text-[13px] text-white">
          No site photos yet. Take them here, or pull in shots you already took against the job.
        </p>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square overflow-hidden rounded-lg border border-white/[0.12]"
            >
              {photo.url && (
                <img
                  src={photo.url}
                  alt="Site photo"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )}
              <button
                type="button"
                onClick={() => deletePhoto(photo.id)}
                aria-label="Delete photo"
                className="absolute right-1 top-1 flex h-8 w-8 touch-manipulation items-center justify-center rounded-full bg-black/70"
              >
                <Trash2 className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <JobPhotoImportSheet
        open={importOpen}
        onOpenChange={setImportOpen}
        customerId={customerId}
        // `uploadPhoto` resolves the stored photo, or undefined when it failed
        // (it toasts and swallows). Pass that truth back to the sheet.
        onImport={async (file) => Boolean(await uploadPhoto(file))}
      />
    </section>
  );
}
