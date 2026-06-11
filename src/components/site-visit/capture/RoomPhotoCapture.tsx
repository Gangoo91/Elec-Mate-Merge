import React, { useRef, useState } from 'react';
import { Camera, X, PenTool, CloudOff, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PhotoAnnotationCanvas } from './PhotoAnnotationCanvas';
import { uploadSiteVisitPhotoNow } from '@/utils/siteVisitPhotoUpload';
import type { SiteVisitPhoto, PhotoPhase } from '@/types/siteVisit';

interface RoomPhotoCaptureProps {
  photos: SiteVisitPhoto[];
  roomId: string;
  photoPhase: PhotoPhase;
  /** The visit's id — needed to upload photos to storage immediately on capture */
  visitId?: string;
  onAddPhoto: (photoUrl: string, description?: string) => string | void;
  onRemovePhoto: (photoId: string) => void;
  onUpdatePhotoUrl?: (photoId: string, newUrl: string, storagePath?: string) => void;
}

export const RoomPhotoCapture = ({
  photos,
  roomId,
  photoPhase,
  visitId,
  onAddPhoto,
  onRemovePhoto,
  onUpdatePhotoUrl,
}: RoomPhotoCaptureProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [annotatingPhotoId, setAnnotatingPhotoId] = useState<string | null>(null);
  const [failedUploadIds, setFailedUploadIds] = useState<Set<string>>(new Set());

  const roomPhotos = photos.filter((p) => p.roomId === roomId && p.photoPhase === photoPhase);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      // Instant blob preview, then upload to storage straight away —
      // blob URLs die when Android kills the backgrounded WebView (ELE-1069),
      // so a photo only counts as safe once it has a storage URL.
      const url = URL.createObjectURL(file);
      const photoId = onAddPhoto(url, file.name);

      if (visitId && photoId && onUpdatePhotoUrl) {
        void uploadSiteVisitPhotoNow(file, visitId).then((uploaded) => {
          if (uploaded) {
            onUpdatePhotoUrl(photoId, uploaded.publicUrl, uploaded.storagePath);
            URL.revokeObjectURL(url);
            setFailedUploadIds((prev) => {
              if (!prev.has(photoId)) return prev;
              const next = new Set(prev);
              next.delete(photoId);
              return next;
            });
          } else {
            // Keep the blob for preview; the Generate step retries the upload
            setFailedUploadIds((prev) => new Set(prev).add(photoId));
          }
        });
      }
    }

    // Reset input so same file can be re-selected
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-white">
          {photoPhase === 'before' ? 'Before Photos' : 'After Photos'}
        </h4>
        <span className="text-xs text-white">
          {roomPhotos.length} photo{roomPhotos.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Photo grid — 2-up so the overlay buttons have room to be tappable */}
      {roomPhotos.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {roomPhotos.map((photo) => {
            const isPending = photo.photoUrl.startsWith('blob:');
            const hasFailed = failedUploadIds.has(photo.id);
            return (
              <div
                key={photo.id}
                className="relative aspect-square overflow-hidden rounded-lg bg-elec-gray"
              >
                <img
                  src={photo.photoUrl}
                  alt={photo.description || 'Site photo'}
                  className="h-full w-full object-cover"
                />
                {/* Upload state — a photo is only safe once it's in the cloud */}
                <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] font-medium">
                  {hasFailed ? (
                    <>
                      <CloudOff className="h-3 w-3 text-amber-400" />
                      <span className="text-amber-300">on device only</span>
                    </>
                  ) : isPending ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin text-white/80" />
                      <span className="text-white/80">saving…</span>
                    </>
                  ) : (
                    <Check className="h-3 w-3 text-emerald-400" />
                  )}
                </span>
                <button
                  onClick={() => onRemovePhoto(photo.id)}
                  className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 touch-manipulation active:scale-95"
                  aria-label="Delete photo"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
                {onUpdatePhotoUrl && (
                  <button
                    onClick={() => setAnnotatingPhotoId(photo.id)}
                    className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 touch-manipulation active:scale-95"
                    aria-label="Annotate photo"
                  >
                    <PenTool className="h-4 w-4 text-elec-yellow" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Photo annotation canvas */}
      {onUpdatePhotoUrl && annotatingPhotoId && (
        <PhotoAnnotationCanvas
          photoUrl={roomPhotos.find((p) => p.id === annotatingPhotoId)?.photoUrl || ''}
          open={!!annotatingPhotoId}
          onClose={() => setAnnotatingPhotoId(null)}
          onSave={(annotatedUrl) => {
            onUpdatePhotoUrl(annotatingPhotoId, annotatedUrl);
            setAnnotatingPhotoId(null);
          }}
        />
      )}

      {/* Capture button */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={handleCapture}
        className="hidden"
      />
      <Button
        onClick={() => inputRef.current?.click()}
        variant="outline"
        className="h-11 w-full touch-manipulation border-dashed border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow"
      >
        <Camera className="mr-2 h-4 w-4" />
        Take Photo
      </Button>
    </div>
  );
};
