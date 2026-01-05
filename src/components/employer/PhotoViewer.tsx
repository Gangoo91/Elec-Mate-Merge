import { useState, useRef, useCallback, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Download, 
  Share2, 
  MapPin, 
  Clock, 
  User,
  Check,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Camera
} from "lucide-react";
import { PhotoCategory } from "@/data/employerMockData";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Photo {
  id: string;
  jobId: string;
  jobTitle: string;
  uploadedBy: string;
  uploadedById: string;
  filename: string;
  category: PhotoCategory;
  timestamp: string;
  location?: { lat: number; lng: number; address: string };
  approved: boolean;
  sharedWithClient: boolean;
  notes: string;
  progressLogId?: string;
}

interface PhotoViewerProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onToggleApproval?: (photoId: string) => void;
  onToggleSharing?: (photoId: string) => void;
}

const categoryColors: Record<PhotoCategory, string> = {
  Before: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  During: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  After: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completion: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Issue: "bg-red-500/20 text-red-400 border-red-500/30"
};

export function PhotoViewer({ 
  photos, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNavigate,
  onToggleApproval,
  onToggleSharing
}: PhotoViewerProps) {
  const isMobile = useIsMobile();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);
  
  // Touch handling refs
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const lastTouchRef = useRef({ x: 0, y: 0 });
  const initialPinchDistance = useRef<number | null>(null);
  const initialScale = useRef(1);
  const isSwipingRef = useRef(false);
  const swipeStartX = useRef(0);
  const swipeStartTime = useRef(0);
  const lastTapTime = useRef(0);

  // All hooks must be called before any conditional returns

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") onClose();
  }, [handlePrev, handleNext, onClose]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.5, 4));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  }, []);

  // Get distance between two touch points
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      initialPinchDistance.current = getTouchDistance(e.touches);
      initialScale.current = scale;
    } else if (e.touches.length === 1) {
      // Single touch - could be swipe or pan
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      swipeStartX.current = e.touches[0].clientX;
      swipeStartTime.current = Date.now();
      isSwipingRef.current = scale === 1; // Only swipe when not zoomed
    }
  }, [scale]);

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance.current) {
      // Pinch zoom
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      const pinchScale = currentDistance / initialPinchDistance.current;
      const newScale = Math.min(Math.max(initialScale.current * pinchScale, 1), 4);
      setScale(newScale);
      
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - lastTouchRef.current.x;
      const deltaY = e.touches[0].clientY - lastTouchRef.current.y;
      
      if (scale > 1) {
        // Pan when zoomed
        e.preventDefault();
        setPosition(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));
      }
      
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, [scale]);

  // Handle touch end
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0 && isSwipingRef.current && scale === 1) {
      // Check for swipe gesture
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - swipeStartX.current;
      const deltaTime = Date.now() - swipeStartTime.current;
      const velocity = Math.abs(deltaX) / deltaTime;
      
      // Swipe threshold: at least 50px and fast enough, or at least 100px
      if ((Math.abs(deltaX) > 50 && velocity > 0.3) || Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
          handlePrev();
        } else {
          handleNext();
        }
      }
    }
    
    initialPinchDistance.current = null;
    isSwipingRef.current = false;
  }, [scale, handlePrev, handleNext]);

  // Double tap to zoom
  const handleDoubleTap = useCallback((e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTapTime.current < 300) {
      e.preventDefault();
      if (scale > 1) {
        resetZoom();
      } else {
        setScale(2);
      }
    }
    lastTapTime.current = now;
  }, [scale, resetZoom]);

  // Toggle controls visibility on tap (mobile)
  const handleTap = useCallback(() => {
    if (isMobile) {
      setShowControls(prev => !prev);
    }
  }, [isMobile]);

  // Reset zoom when changing photos
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Early returns after all hooks
  if (!photos.length) return null;
  
  const photo = photos[currentIndex];
  if (!photo) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "max-w-5xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/50",
          isMobile && "max-w-full h-full rounded-none border-0"
        )}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div 
          className={cn(
            "absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-background/90 to-transparent transition-opacity duration-200",
            isMobile && !showControls && "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className={categoryColors[photo.category]}>
                {photo.category}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {photos.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Zoom controls - desktop */}
              {!isMobile && (
                <>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomOut} disabled={scale <= 1}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomIn} disabled={scale >= 4}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  {scale > 1 && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetZoom}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Image Area */}
        <div 
          ref={containerRef}
          className={cn(
            "relative h-full flex items-center justify-center overflow-hidden touch-none",
            isMobile ? "p-0" : "p-12"
          )}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={(e) => {
            handleTouchEnd(e);
            handleDoubleTap(e);
          }}
          onClick={handleTap}
        >
          {/* Navigation Arrows - Desktop or when controls visible */}
          {(!isMobile || showControls) && currentIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80 z-10 transition-opacity",
                isMobile ? "h-10 w-10" : "h-12 w-12"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft className={isMobile ? "h-5 w-5" : "h-6 w-6"} />
            </Button>
          )}
          
          {(!isMobile || showControls) && currentIndex < photos.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80 z-10 transition-opacity",
                isMobile ? "h-10 w-10" : "h-12 w-12"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className={isMobile ? "h-5 w-5" : "h-6 w-6"} />
            </Button>
          )}

          {/* Image with zoom and pan */}
          <div 
            className={cn(
              "w-full max-w-3xl aspect-video rounded-lg overflow-hidden flex items-center justify-center transition-transform",
              isMobile && "max-w-full h-full rounded-none",
              scale === 1 && "duration-200"
            )}
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            }}
          >
            {/* CompanyCam-style photo placeholder with gradient background */}
            <div className={cn(
              "w-full h-full flex flex-col items-center justify-center relative",
              "bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20"
            )}>
              {/* Photo icon with glow effect */}
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-elec-yellow/20 blur-xl rounded-full scale-150" />
                <div className="relative h-20 w-20 rounded-2xl bg-elec-gray/80 backdrop-blur border border-border/50 flex items-center justify-center">
                  <Camera className="h-10 w-10 text-elec-yellow" />
                </div>
              </div>
              
              {/* Photo info */}
              <p className="text-foreground font-semibold text-lg mb-1">{photo.filename}</p>
              <p className="text-muted-foreground text-sm">{photo.jobTitle}</p>
              
              {/* Category indicator at bottom */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <Badge className={cn("text-sm px-4 py-1", categoryColors[photo.category])}>
                  {photo.category} Photo
                </Badge>
              </div>
            </div>
          </div>

          {/* Zoom level indicator - Mobile */}
          {isMobile && scale > 1 && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-xs text-foreground z-10">
              {Math.round(scale * 100)}%
            </div>
          )}

          {/* Swipe hint - Mobile */}
          {isMobile && scale === 1 && photos.length > 1 && showControls && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 flex items-center gap-2">
              <ChevronLeft className="h-3 w-3" />
              Swipe to navigate
              <ChevronRight className="h-3 w-3" />
            </div>
          )}

          {/* Photo dots indicator - Mobile */}
          {isMobile && photos.length > 1 && (
            <div className={cn(
              "absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-1.5 transition-opacity duration-200",
              !showControls && "opacity-0"
            )}>
              {photos.slice(Math.max(0, currentIndex - 3), Math.min(photos.length, currentIndex + 4)).map((_, i) => {
                const actualIndex = Math.max(0, currentIndex - 3) + i;
                return (
                  <div
                    key={actualIndex}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      actualIndex === currentIndex 
                        ? "w-4 bg-elec-yellow" 
                        : "w-1.5 bg-muted-foreground/40"
                    )}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/95 to-transparent transition-opacity duration-200",
            isMobile && !showControls && "opacity-0 pointer-events-none"
          )}
        >
          <div className="max-w-3xl mx-auto space-y-3">
            {/* Notes */}
            {photo.notes && (
              <p className="text-sm text-foreground">{photo.notes}</p>
            )}
            
            {/* Metadata */}
            <div className={cn(
              "flex flex-wrap items-center gap-4 text-xs text-muted-foreground",
              isMobile && "gap-2"
            )}>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {photo.uploadedBy}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(photo.timestamp)}
              </span>
              {!isMobile && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {photo.location.address}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              {onToggleApproval && (
                <Button
                  variant={photo.approved ? "default" : "outline"}
                  size={isMobile ? "lg" : "sm"}
                  onClick={() => onToggleApproval(photo.id)}
                  className={cn("gap-1.5", isMobile && "flex-1 h-11")}
                >
                  <Check className="h-3.5 w-3.5" />
                  {photo.approved ? "Approved" : "Approve"}
                </Button>
              )}
              {onToggleSharing && (
                <Button
                  variant={photo.sharedWithClient ? "default" : "outline"}
                  size={isMobile ? "lg" : "sm"}
                  onClick={() => onToggleSharing(photo.id)}
                  className={cn("gap-1.5", isMobile && "flex-1 h-11")}
                >
                  {photo.sharedWithClient ? (
                    <>
                      <Eye className="h-3.5 w-3.5" />
                      {isMobile ? "Shared" : "Shared with Client"}
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      {isMobile ? "Share" : "Share with Client"}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
