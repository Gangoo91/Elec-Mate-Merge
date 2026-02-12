import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SafetyPhoto, getCategoryLabel } from '@/hooks/useSafetyPhotos';
import { format } from 'date-fns';

interface BeforeAfterCompareProps {
  photos: SafetyPhoto[];
  onClose: () => void;
  initialBefore?: SafetyPhoto;
  initialAfter?: SafetyPhoto;
}

type SelectionStep = 'select-before' | 'select-after' | 'comparing';

export default function BeforeAfterCompare({
  photos,
  onClose,
  initialBefore,
  initialAfter,
}: BeforeAfterCompareProps) {
  const [step, setStep] = useState<SelectionStep>(
    initialBefore && initialAfter ? 'comparing' : 'select-before'
  );
  const [beforePhoto, setBeforePhoto] = useState<SafetyPhoto | null>(initialBefore || null);
  const [afterPhoto, setAfterPhoto] = useState<SafetyPhoto | null>(initialAfter || null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleSliderMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      handleSliderMove(e.touches[0].clientX);
    },
    [handleSliderMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleSliderMove(e.clientX);
    },
    [handleSliderMove]
  );

  const handleSelectPhoto = useCallback(
    (photo: SafetyPhoto) => {
      if (step === 'select-before') {
        setBeforePhoto(photo);
        setStep('select-after');
      } else if (step === 'select-after') {
        setAfterPhoto(photo);
        setStep('comparing');
      }
    },
    [step]
  );

  const handleSwap = useCallback(() => {
    const temp = beforePhoto;
    setBeforePhoto(afterPhoto);
    setAfterPhoto(temp);
  }, [beforePhoto, afterPhoto]);

  // Photo selection grid
  if (step === 'select-before' || step === 'select-after') {
    const isSelectingBefore = step === 'select-before';

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex flex-col"
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-black/95 border-b border-white/10 px-3 py-3 pt-[env(safe-area-inset-top)]">
          <div className="flex items-center justify-between">
            <button
              onClick={isSelectingBefore ? onClose : () => setStep('select-before')}
              className="p-2 -ml-1 rounded-lg active:bg-white/10 touch-manipulation"
            >
              {isSelectingBefore ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-white" />
              )}
            </button>
            <div className="text-center">
              <h3 className="text-sm font-semibold text-white">
                {isSelectingBefore ? "Select 'Before' Photo" : "Select 'After' Photo"}
              </h3>
              <p className="text-[10px] text-white/50 mt-0.5">
                Step {isSelectingBefore ? '1' : '2'} of 2
              </p>
            </div>
            <div className="w-9" />
          </div>

          {/* Progress bar */}
          <div className="flex gap-1 mt-2">
            <div
              className={`flex-1 h-1 rounded-full ${isSelectingBefore ? 'bg-elec-yellow' : 'bg-elec-yellow'}`}
            />
            <div
              className={`flex-1 h-1 rounded-full ${isSelectingBefore ? 'bg-white/10' : 'bg-elec-yellow'}`}
            />
          </div>
        </div>

        {/* Selected before preview */}
        {!isSelectingBefore && beforePhoto && (
          <div className="flex-shrink-0 px-3 py-2 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <img
                src={beforePhoto.file_url}
                alt=""
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-blue-400 font-medium uppercase">Before</span>
                <p className="text-xs text-white/70 truncate">{beforePhoto.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Photo grid */}
        <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide p-3">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {photos.map((photo) => {
              const isSelected = photo.id === beforePhoto?.id;
              return (
                <button
                  key={photo.id}
                  onClick={() => handleSelectPhoto(photo)}
                  disabled={isSelected}
                  className={`relative aspect-square rounded-xl overflow-hidden touch-manipulation transition-all ${
                    isSelected ? 'ring-2 ring-blue-500 opacity-50' : 'active:scale-[0.97]'
                  }`}
                >
                  <img
                    src={photo.file_url}
                    alt={photo.description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                    <p className="text-[9px] text-white line-clamp-1">{photo.description}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-white bg-blue-500 px-2 py-0.5 rounded-full">
                        BEFORE
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  // Comparison view with slider
  if (!beforePhoto || !afterPhoto) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between px-3 py-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full active:bg-white/10 touch-manipulation"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <h3 className="text-sm font-semibold text-white">Before / After</h3>
          <button
            onClick={handleSwap}
            className="p-2 rounded-full active:bg-white/10 touch-manipulation"
            title="Swap photos"
          >
            <ArrowLeftRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Comparison slider */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden cursor-col-resize"
        onMouseDown={() => {
          isDragging.current = true;
        }}
        onMouseUp={() => {
          isDragging.current = false;
        }}
        onMouseLeave={() => {
          isDragging.current = false;
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={() => {
          isDragging.current = true;
        }}
        onTouchEnd={() => {
          isDragging.current = false;
        }}
        onTouchMove={handleTouchMove}
      >
        {/* After photo (full width, behind) */}
        <img
          src={afterPhoto.file_url}
          alt={afterPhoto.description}
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Before photo (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
          <img
            src={beforePhoto.file_url}
            alt={beforePhoto.description}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ minWidth: containerRef.current?.offsetWidth || '100vw' }}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="flex items-center gap-0.5">
              <ChevronLeft className="h-3 w-3 text-black" />
              <ChevronRight className="h-3 w-3 text-black" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-16 left-3 z-10">
          <span className="px-2 py-1 rounded-full bg-blue-500/80 backdrop-blur-sm text-[10px] font-bold text-white uppercase">
            Before
          </span>
        </div>
        <div className="absolute top-16 right-3 z-10">
          <span className="px-2 py-1 rounded-full bg-green-500/80 backdrop-blur-sm text-[10px] font-bold text-white uppercase">
            After
          </span>
        </div>
      </div>

      {/* Bottom info */}
      <div className="flex-shrink-0 bg-black/90 backdrop-blur-sm border-t border-white/10">
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <div className="p-3">
            <span className="text-[10px] text-blue-400 font-medium uppercase">Before</span>
            <p className="text-xs text-white mt-0.5 line-clamp-1">{beforePhoto.description}</p>
            <p className="text-[10px] text-white/40 mt-0.5">
              {format(new Date(beforePhoto.created_at), 'd MMM yyyy')}
            </p>
          </div>
          <div className="p-3">
            <span className="text-[10px] text-green-400 font-medium uppercase">After</span>
            <p className="text-xs text-white mt-0.5 line-clamp-1">{afterPhoto.description}</p>
            <p className="text-[10px] text-white/40 mt-0.5">
              {format(new Date(afterPhoto.created_at), 'd MMM yyyy')}
            </p>
          </div>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </motion.div>
  );
}
