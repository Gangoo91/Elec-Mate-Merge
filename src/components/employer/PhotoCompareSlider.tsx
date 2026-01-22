import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, ChevronLeft, ChevronRight, RotateCcw, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ComparePhoto {
  id: string;
  category: string;
  jobTitle: string;
  timestamp: string;
  filename?: string;
}

interface PhotoCompareSliderProps {
  beforePhoto: ComparePhoto;
  afterPhoto: ComparePhoto;
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoCompareSlider = ({
  beforePhoto,
  afterPhoto,
  isOpen,
  onClose,
}: PhotoCompareSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let position: number;

      if (isVertical) {
        position = ((clientY - rect.top) / rect.height) * 100;
      } else {
        position = ((clientX - rect.left) / rect.width) * 100;
      }

      setSliderPosition(Math.max(0, Math.min(100, position)));
    },
    [isVertical]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      // Use passive: true to avoid blocking scroll on Android
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove]);

  const resetSlider = () => {
    setSliderPosition(50);
    setZoom(1);
  };

  const toggleOrientation = () => {
    setIsVertical(!isVertical);
    setSliderPosition(50);
  };

  // Photo placeholder component
  const PhotoPlaceholder = ({ label, category }: { label: string; category: string }) => (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex flex-col items-center justify-center">
      <Camera className="h-16 w-16 text-slate-400 mb-2" />
      <span className="text-slate-300 font-medium">{label}</span>
      <Badge variant="outline" className="mt-2 text-xs capitalize">
        {category}
      </Badge>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 bg-black/95 border-border/50">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-blue-400 font-medium">Before</span>
              <span className="text-muted-foreground mx-2">vs</span>
              <span className="text-green-400 font-medium">After</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {beforePhoto.jobTitle}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-foreground/70 hover:text-foreground"
              onClick={toggleOrientation}
              title={isVertical ? "Horizontal split" : "Vertical split"}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-foreground/70 hover:text-foreground"
              onClick={resetSlider}
              title="Reset"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-foreground/70 hover:text-foreground"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Comparison container */}
        <div
          ref={containerRef}
          className="relative w-full h-full overflow-hidden cursor-col-resize select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ transform: `scale(${zoom})` }}
        >
          {/* After photo (full, underneath) */}
          <div className="absolute inset-0">
            <PhotoPlaceholder label="After" category={afterPhoto.category} />
          </div>

          {/* Before photo (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={
              isVertical
                ? { clipPath: `inset(0 0 ${100 - sliderPosition}% 0)` }
                : { clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }
            }
          >
            <PhotoPlaceholder label="Before" category={beforePhoto.category} />
          </div>

          {/* Slider line and handle */}
          <div
            className={cn(
              "absolute z-10",
              isVertical
                ? "left-0 right-0 h-1 -translate-y-1/2"
                : "top-0 bottom-0 w-1 -translate-x-1/2"
            )}
            style={
              isVertical
                ? { top: `${sliderPosition}%` }
                : { left: `${sliderPosition}%` }
            }
          >
            {/* Line */}
            <div
              className={cn(
                "absolute bg-white/80 shadow-lg",
                isVertical ? "inset-x-0 h-0.5" : "inset-y-0 w-0.5"
              )}
            />

            {/* Handle */}
            <div
              className={cn(
                "absolute z-10 flex items-center justify-center bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing",
                isVertical
                  ? "left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-8"
                  : "top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12"
              )}
            >
              {isVertical ? (
                <div className="flex flex-col gap-0.5">
                  <ChevronLeft className="h-3 w-3 text-slate-600 rotate-90" />
                  <ChevronRight className="h-3 w-3 text-slate-600 rotate-90" />
                </div>
              ) : (
                <div className="flex gap-0.5">
                  <ChevronLeft className="h-3 w-3 text-slate-600" />
                  <ChevronRight className="h-3 w-3 text-slate-600" />
                </div>
              )}
            </div>
          </div>

          {/* Labels */}
          <div
            className={cn(
              "absolute z-10 px-3 py-1.5 rounded-full bg-blue-500/90 text-foreground text-xs font-medium",
              isVertical ? "top-4 left-4" : "top-4 left-4"
            )}
          >
            Before
          </div>
          <div
            className={cn(
              "absolute z-10 px-3 py-1.5 rounded-full bg-green-500/90 text-foreground text-xs font-medium",
              isVertical ? "bottom-4 right-4" : "top-4 right-4"
            )}
          >
            After
          </div>
        </div>

        {/* Footer with info */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-xs text-foreground/60">
            Drag the slider to compare before and after photos
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
