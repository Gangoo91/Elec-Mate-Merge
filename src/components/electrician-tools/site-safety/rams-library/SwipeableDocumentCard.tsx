import React, { useRef, useState } from 'react';
import { FileText, Download, Trash2, ChevronRight, Loader2, Sparkles, FileUp } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface SavedRAMS {
  id: string;
  project_name: string;
  location: string;
  status: string;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
  source?: string;
  original_filename?: string;
}

interface SwipeableDocumentCardProps {
  doc: SavedRAMS;
  index: number;
  editMode: boolean;
  selected: boolean;
  isDownloading: boolean;
  isDeleting: boolean;
  onToggleSelect: () => void;
  onDownload: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

// Human-friendly date formatting
const formatRelativeDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return '1 week ago';
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return format(date, 'dd MMM');
};

// Status indicator dot
const StatusDot = ({ status }: { status: string }) => {
  const colorMap: Record<string, string> = {
    draft: 'bg-yellow-500',
    approved: 'bg-green-500',
    pending: 'bg-blue-500',
  };

  return (
    <div className={cn(
      "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-elec-dark",
      colorMap[status] || 'bg-gray-500'
    )} />
  );
};

export const SwipeableDocumentCard: React.FC<SwipeableDocumentCardProps> = ({
  doc,
  index,
  editMode,
  selected,
  isDownloading,
  isDeleting,
  onToggleSelect,
  onDownload,
  onDelete,
  onEdit,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [swipeX, setSwipeX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const SWIPE_THRESHOLD = 80;
  const MAX_SWIPE = 100;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (editMode) return;
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = swipeX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || editMode) return;
    const diff = e.touches[0].clientX - startXRef.current;
    const newX = Math.max(-MAX_SWIPE, Math.min(MAX_SWIPE, currentXRef.current + diff));
    setSwipeX(newX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Snap to action or reset
    if (swipeX > SWIPE_THRESHOLD) {
      // Swiped right - download
      setSwipeX(0);
      onDownload();
    } else if (swipeX < -SWIPE_THRESHOLD) {
      // Swiped left - delete
      setSwipeX(0);
      onDelete();
    } else {
      // Reset
      setSwipeX(0);
    }
  };

  const handleClick = () => {
    if (editMode) {
      onToggleSelect();
    } else if (swipeX === 0) {
      onEdit();
    }
  };

  return (
    <div
      className="animate-fade-in-up"
      style={{
        animationDelay: `${index * 50}ms`,
        opacity: 0,
      }}
    >
      <div className="relative overflow-hidden rounded-2xl">
        {/* Left action (download) - revealed on swipe right */}
        <div
          className={cn(
            "absolute left-0 inset-y-0 w-24 bg-elec-yellow flex items-center justify-center transition-opacity",
            swipeX > 20 ? "opacity-100" : "opacity-0"
          )}
        >
          {isDownloading ? (
            <Loader2 className="h-6 w-6 text-black animate-spin" />
          ) : (
            <Download className="h-6 w-6 text-black" />
          )}
        </div>

        {/* Right action (delete) - revealed on swipe left */}
        <div
          className={cn(
            "absolute right-0 inset-y-0 w-24 bg-red-500 flex items-center justify-center transition-opacity",
            swipeX < -20 ? "opacity-100" : "opacity-0"
          )}
        >
          {isDeleting ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : (
            <Trash2 className="h-6 w-6 text-white" />
          )}
        </div>

        {/* Main card content */}
        <div
          ref={cardRef}
          className={cn(
            "relative bg-white/[0.03] border p-4 transition-all duration-200 cursor-pointer",
            "active:scale-[0.98]",
            selected
              ? "border-elec-yellow/50 bg-elec-yellow/5"
              : "border-white/[0.06] hover:border-white/[0.1]",
            isDragging ? "transition-none" : "transition-transform"
          )}
          style={{ transform: `translateX(${swipeX}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleClick}
        >
          <div className="flex items-center gap-3">
            {/* Edit mode checkbox */}
            {editMode && (
              <div
                className="animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selected}
                  onCheckedChange={onToggleSelect}
                  className="h-5 w-5 border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                />
              </div>
            )}

            {/* Status indicator on icon */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-elec-yellow" />
              </div>
              <StatusDot status={doc.status} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white truncate text-[15px]">
                  {doc.project_name}
                </h3>
                {/* Source badge */}
                {doc.source === 'user-uploaded' ? (
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] px-1.5 py-0 h-5 shrink-0">
                    <FileUp className="h-2.5 w-2.5 mr-0.5" />
                    Uploaded
                  </Badge>
                ) : (
                  <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 text-[10px] px-1.5 py-0 h-5 shrink-0">
                    <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                    AI
                  </Badge>
                )}
              </div>
              <p className="text-sm text-white/50 truncate mt-0.5">
                {doc.location}
              </p>
            </div>

            {/* Date + chevron */}
            <div className="text-right shrink-0">
              <span className="text-xs text-white/40 block">
                {formatRelativeDate(doc.created_at)}
              </span>
              {!editMode && (
                <ChevronRight className="h-5 w-5 text-white/30 mt-1 ml-auto" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeableDocumentCard;
