import React, { useRef } from 'react';
import { Camera, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SiteVisitPhoto, PhotoPhase } from '@/types/siteVisit';

interface RoomPhotoCaptureProps {
  photos: SiteVisitPhoto[];
  roomId: string;
  photoPhase: PhotoPhase;
  onAddPhoto: (photoUrl: string, description?: string) => void;
  onRemovePhoto: (photoId: string) => void;
}

export const RoomPhotoCapture = ({
  photos,
  roomId,
  photoPhase,
  onAddPhoto,
  onRemovePhoto,
}: RoomPhotoCaptureProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const roomPhotos = photos.filter((p) => p.roomId === roomId && p.photoPhase === photoPhase);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      const url = URL.createObjectURL(file);
      onAddPhoto(url, file.name);
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

      {/* Photo grid */}
      {roomPhotos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {roomPhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square rounded-lg overflow-hidden bg-elec-gray"
            >
              <img
                src={photo.photoUrl}
                alt={photo.description || 'Site photo'}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onRemovePhoto(photo.id)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/60 touch-manipulation"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
        </div>
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
        className="w-full h-11 touch-manipulation border-dashed border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow"
      >
        <Camera className="h-4 w-4 mr-2" />
        Take Photo
      </Button>
    </div>
  );
};
