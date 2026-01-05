import { useState, useMemo } from "react";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { Camera, Check, Share2, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type PhotoCategory = 'before' | 'during' | 'after' | 'issue' | 'completion' | 'safety';

export interface TimelinePhoto {
  id: string;
  jobId: string;
  jobTitle: string;
  uploadedBy: string;
  uploadedByInitials: string;
  category: PhotoCategory;
  timestamp: string;
  location?: string;
  lat?: number;
  lng?: number;
  isApproved: boolean;
  isShared: boolean;
  notes?: string;
  filename?: string;
}

interface PhotoTimelineProps {
  photos: TimelinePhoto[];
  onPhotoClick: (photo: TimelinePhoto, index: number) => void;
  onToggleApproval: (photoId: string) => void;
  onToggleSharing: (photoId: string) => void;
}

const categoryColors: Record<PhotoCategory, string> = {
  before: "bg-blue-400",
  during: "bg-amber-400",
  after: "bg-emerald-400",
  issue: "bg-red-400",
  completion: "bg-purple-400",
  safety: "bg-violet-400",
};

const formatDateHeader = (dateStr: string): string => {
  const date = parseISO(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEE, d MMM");
};

const formatTime = (timestamp: string): string => {
  return format(parseISO(timestamp), "HH:mm");
};

export const PhotoTimeline = ({
  photos,
  onPhotoClick,
  onToggleApproval,
  onToggleSharing,
}: PhotoTimelineProps) => {
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  // Group photos by date
  const groupedPhotos = useMemo(() => {
    const groups: Record<string, TimelinePhoto[]> = {};
    
    const sortedPhotos = [...photos].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    sortedPhotos.forEach((photo) => {
      const dateKey = format(parseISO(photo.timestamp), "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(photo);
    });

    return groups;
  }, [photos]);

  const dateKeys = Object.keys(groupedPhotos).sort((a, b) => b.localeCompare(a));

  const toggleDate = (dateKey: string) => {
    setExpandedDates((prev) => {
      const next = new Set(prev);
      if (next.has(dateKey)) {
        next.delete(dateKey);
      } else {
        next.add(dateKey);
      }
      return next;
    });
  };

  const isExpanded = (dateKey: string) => {
    const index = dateKeys.indexOf(dateKey);
    if (index < 3 && !expandedDates.has(dateKey)) return true;
    return expandedDates.has(dateKey);
  };

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Camera className="h-12 w-12 mb-4 opacity-30" />
        <p className="text-lg font-medium">No photos yet</p>
        <p className="text-sm opacity-60">Photos will appear here in chronological order</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-1">
        {dateKeys.map((dateKey) => {
          const datePhotos = groupedPhotos[dateKey];
          const expanded = isExpanded(dateKey);
          
          return (
            <div key={dateKey}>
              {/* Sticky date header - more compact */}
              <button
                onClick={() => toggleDate(dateKey)}
                className="sticky top-0 z-10 w-full flex items-center justify-between py-2.5 px-3 bg-background/95 backdrop-blur-sm border-b border-border/30 hover:bg-muted/30 transition-colors touch-feedback"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-elec-yellow/70" />
                  <span className="font-semibold text-foreground text-sm">
                    {formatDateHeader(datePhotos[0].timestamp)}
                  </span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-muted/50">
                    {datePhotos.length}
                  </Badge>
                </div>
                {expanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {/* Timeline entries - tighter spacing */}
              {expanded && (
                <div className="relative pl-5 border-l-2 border-border/30 ml-4 mt-1 mb-3 space-y-2">
                  {datePhotos.map((photo, idx) => {
                    const globalIndex = photos.findIndex((p) => p.id === photo.id);
                    
                    return (
                      <div key={photo.id} className="relative group">
                        {/* Timeline dot */}
                        <div className={cn(
                          "absolute -left-[21px] top-4 h-2.5 w-2.5 rounded-full transition-colors",
                          categoryColors[photo.category]
                        )} />

                        {/* Photo card - more compact */}
                        <div 
                          className="bg-elec-gray/50 border border-border/30 rounded-lg overflow-hidden touch-feedback"
                          onClick={() => onPhotoClick(photo, globalIndex)}
                        >
                          <div className="flex gap-3 p-3">
                            {/* Photo thumbnail */}
                            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                              <Camera className="h-6 w-6 text-muted-foreground/40" />
                            </div>

                            {/* Photo details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <h4 className="font-medium text-foreground text-sm truncate">
                                    {photo.jobTitle}
                                  </h4>
                                  <span className="inline-block text-[10px] px-1.5 py-0.5 rounded capitalize mt-0.5 bg-muted/50 text-muted-foreground">
                                    {photo.category}
                                  </span>
                                </div>
                                <span className="text-[10px] text-muted-foreground flex items-center gap-1 flex-shrink-0">
                                  <Clock className="h-3 w-3" />
                                  {formatTime(photo.timestamp)}
                                </span>
                              </div>

                              <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Avatar className="h-3.5 w-3.5">
                                    <AvatarFallback className="text-[6px] bg-elec-yellow/20 text-elec-yellow">
                                      {photo.uploadedByInitials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="truncate max-w-[80px]">{photo.uploadedBy}</span>
                                </span>
                                {photo.location && (
                                  <span className="flex items-center gap-1 truncate">
                                    <MapPin className="h-3 w-3 flex-shrink-0" />
                                    <span className="truncate">{photo.location}</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Status indicators */}
                            <div className="flex flex-col gap-1 flex-shrink-0">
                              {photo.isApproved && (
                                <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                                  <Check className="h-3 w-3 text-success" />
                                </div>
                              )}
                              {photo.isShared && (
                                <div className="h-5 w-5 rounded-full bg-info/20 flex items-center justify-center">
                                  <Share2 className="h-3 w-3 text-info" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Quick actions - only on desktop */}
                          <div className="hidden md:flex items-center justify-end gap-2 px-3 py-2 bg-muted/20 border-t border-border/20">
                            <Button
                              size="sm"
                              variant={photo.isApproved ? "default" : "ghost"}
                              className="h-7 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleApproval(photo.id);
                              }}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              {photo.isApproved ? "Approved" : "Approve"}
                            </Button>
                            <Button
                              size="sm"
                              variant={photo.isShared ? "default" : "ghost"}
                              className="h-7 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleSharing(photo.id);
                              }}
                            >
                              <Share2 className="h-3 w-3 mr-1" />
                              {photo.isShared ? "Shared" : "Share"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
