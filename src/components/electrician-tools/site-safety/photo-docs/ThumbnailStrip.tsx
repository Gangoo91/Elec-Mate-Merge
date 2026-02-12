import { useRef, useEffect } from 'react';
import { SafetyPhoto, getCategoryColor } from '@/hooks/useSafetyPhotos';

interface ThumbnailStripProps {
  photos: SafetyPhoto[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function ThumbnailStrip({ photos, currentIndex, onSelect }: ThumbnailStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to keep active thumbnail visible
  useEffect(() => {
    if (scrollRef.current) {
      const activeThumb = scrollRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentIndex]);

  if (photos.length <= 1) return null;

  return (
    <div className="w-full bg-black/60 backdrop-blur-sm py-2 px-1">
      <div
        ref={scrollRef}
        className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide px-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => onSelect(index)}
            className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all duration-150 touch-manipulation ${
              index === currentIndex
                ? 'ring-2 ring-elec-yellow scale-110 z-10'
                : 'opacity-50 hover:opacity-80 active:opacity-80'
            }`}
            style={{ scrollSnapAlign: 'center' }}
          >
            <img
              src={photo.file_url}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className={`absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full ${getCategoryColor(photo.category)} ring-1 ring-black/50`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
