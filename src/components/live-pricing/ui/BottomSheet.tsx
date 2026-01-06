import { useEffect, useRef, useState, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

const BottomSheet = ({
  isOpen,
  onClose,
  title,
  children,
  className
}: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentY(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart === null) return;
    const diff = e.touches[0].clientY - dragStart;
    if (diff > 0) {
      setCurrentY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (currentY > 100) {
      onClose();
    }
    setCurrentY(0);
    setDragStart(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Higher z-index to cover tab bar */}
      <div
        className={cn(
          "fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sheet - Higher z-index to be above everything */}
      <div
        ref={sheetRef}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[101]",
          "bg-neutral-900 border-t border-white/10 rounded-t-3xl shadow-2xl",
          "shadow-2xl shadow-black/50",
          !isDragging && "transition-transform duration-300 ease-out",
          className
        )}
        style={{
          transform: `translateY(${currentY}px)`,
          maxHeight: '85vh'
        }}
      >
        {/* Drag Handle */}
        <div
          className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing touch-manipulation"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 bg-white/30 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 pb-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all touch-manipulation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto px-5 py-5 overscroll-contain" style={{ maxHeight: 'calc(85vh - 80px)' }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
