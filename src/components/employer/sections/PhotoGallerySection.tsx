import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PhotoViewer } from "@/components/employer/PhotoViewer";
import { PhotoTimeline, type TimelinePhoto } from "@/components/employer/PhotoTimeline";
import { PhotoMapView, type MapPhoto } from "@/components/employer/PhotoMapView";
import { PhotoCompareSlider, type ComparePhoto } from "@/components/employer/PhotoCompareSlider";
import { PhotoGalleryHeader } from "@/components/employer/PhotoGalleryHeader";
import { PhotoFilterSheet } from "@/components/employer/PhotoFilterSheet";
import { PhotoViewModeSheet } from "@/components/employer/PhotoViewModeSheet";
import { UploadPhotoSheet } from "@/components/employer/dialogs/UploadPhotoSheet";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { useJobPhotos, useTogglePhotoApproval, useTogglePhotoSharing, type PhotoCategory } from "@/hooks/useJobPhotos";
import { useJobs } from "@/hooks/useJobs";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { cn } from "@/lib/utils";
import { 
  Camera, 
  Check,
  Eye,
  User,
  Clock,
  Plus
} from "lucide-react";

const categoryColors: Record<PhotoCategory, string> = {
  Before: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  During: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  After: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completion: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Issue: "bg-red-500/20 text-red-400 border-red-500/30"
};

interface FilterState {
  categories: string[];
  jobs: string[];
  showApproved: boolean | null;
  showShared: boolean | null;
}

export function PhotoGallerySection() {
  const isMobile = useIsMobile();
  const { data: photosData = [], isLoading, refetch } = useJobPhotos();
  const { data: jobs = [] } = useJobs();
  const toggleApproval = useTogglePhotoApproval();
  const toggleSharing = useTogglePhotoSharing();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    jobs: [],
    showApproved: null,
    showShared: null
  });
  const [viewMode, setViewMode] = useState<"grid" | "list" | "timeline" | "map">("grid");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [compareOpen, setCompareOpen] = useState(false);
  const [comparePhotos, setComparePhotos] = useState<{ before: ComparePhoto; after: ComparePhoto } | null>(null);

  // Sheet states
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [viewModeSheetOpen, setViewModeSheetOpen] = useState(false);
  const [uploadSheetOpen, setUploadSheetOpen] = useState(false);

  // Use photos from database
  const photos = photosData;

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: "Photos refreshed" });
  }, [refetch]);

  // Get unique jobs from photos
  const uniqueJobs = useMemo(() =>
    Array.from(new Set(photos.map(p => p.jobId)))
      .filter(jobId => jobId) // Filter out empty job IDs
      .map(jobId => {
        const job = jobs.find(j => j.id === jobId);
        return {
          value: jobId,
          label: job?.title || photos.find(p => p.jobId === jobId)?.jobTitle || "Unknown",
          count: photos.filter(p => p.jobId === jobId).length
        };
      }),
    [photos, jobs]
  );

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    photos.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [photos]);

  // Filter photos
  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesSearch = 
        photo.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(photo.category);
      const matchesJob = filters.jobs.length === 0 || filters.jobs.includes(photo.jobId);
      const matchesApproved = filters.showApproved === null || photo.approved === filters.showApproved;
      const matchesShared = filters.showShared === null || photo.sharedWithClient === filters.showShared;
      
      return matchesSearch && matchesCategory && matchesJob && matchesApproved && matchesShared;
    });
  }, [photos, searchQuery, filters]);

  // Convert to timeline format
  const timelinePhotos: TimelinePhoto[] = useMemo(() => 
    filteredPhotos.map(p => ({
      id: p.id,
      jobId: p.jobId,
      jobTitle: p.jobTitle,
      uploadedBy: p.uploadedBy,
      uploadedByInitials: p.uploadedBy.split(' ').map(n => n[0]).join('').toUpperCase(),
      category: p.category.toLowerCase() as TimelinePhoto['category'],
      timestamp: p.timestamp,
      location: p.location?.address,
      lat: p.location?.lat,
      lng: p.location?.lng,
      isApproved: p.approved,
      isShared: p.sharedWithClient,
      notes: p.notes,
      filename: p.filename
    })),
    [filteredPhotos]
  );

  // Convert to map format
  const mapPhotos: MapPhoto[] = useMemo(() => 
    filteredPhotos.map(p => ({
      id: p.id,
      jobId: p.jobId,
      jobTitle: p.jobTitle,
      uploadedBy: p.uploadedBy,
      category: p.category.toLowerCase() as MapPhoto['category'],
      timestamp: p.timestamp,
      location: p.location?.address,
      lat: p.location?.lat,
      lng: p.location?.lng,
      isApproved: p.approved,
      isShared: p.sharedWithClient
    })),
    [filteredPhotos]
  );

  // Stats
  const stats = useMemo(() => ({
    total: photos.length,
    approved: photos.filter(p => p.approved).length,
    shared: photos.filter(p => p.sharedWithClient).length,
    issues: photos.filter(p => p.category === "Issue").length
  }), [photos]);

  const hasActiveFilters = filters.categories.length > 0 || 
    filters.jobs.length > 0 || 
    filters.showApproved !== null || 
    filters.showShared !== null;

  const handlePhotoClick = (index: number) => {
    setCurrentPhotoIndex(index);
    setViewerOpen(true);
  };

  const handleTimelinePhotoClick = (photo: TimelinePhoto) => {
    const photoIndex = filteredPhotos.findIndex(p => p.id === photo.id);
    if (photoIndex !== -1) {
      setCurrentPhotoIndex(photoIndex);
      setViewerOpen(true);
    }
  };

  const handleMapPhotoClick = (photo: MapPhoto) => {
    const photoIndex = filteredPhotos.findIndex(p => p.id === photo.id);
    if (photoIndex !== -1) {
      setCurrentPhotoIndex(photoIndex);
      setViewerOpen(true);
    }
  };

  const handleToggleApproval = (photoId: string) => {
    toggleApproval.mutate(photoId, {
      onSuccess: () => toast({ title: "Photo approval updated" }),
    });
  };

  const handleToggleSharing = (photoId: string) => {
    toggleSharing.mutate(photoId, {
      onSuccess: () => toast({ title: "Photo sharing updated" }),
    });
  };

  const handleCompareClick = () => {
    const beforePhotos = filteredPhotos.filter(p => p.category === "Before");
    const afterPhotos = filteredPhotos.filter(p => p.category === "After" || p.category === "Completion");
    
    if (beforePhotos.length > 0 && afterPhotos.length > 0) {
      let beforePhoto = beforePhotos[0];
      let afterPhoto = afterPhotos.find(a => a.jobId === beforePhoto.jobId) || afterPhotos[0];
      
      setComparePhotos({
        before: {
          id: beforePhoto.id,
          category: beforePhoto.category,
          jobTitle: beforePhoto.jobTitle,
          timestamp: beforePhoto.timestamp
        },
        after: {
          id: afterPhoto.id,
          category: afterPhoto.category,
          jobTitle: afterPhoto.jobTitle,
          timestamp: afterPhoto.timestamp
        }
      });
      setCompareOpen(true);
    } else {
      toast({ 
        title: "No comparison available", 
        description: "Need both Before and After photos to compare" 
      });
    }
  };

  const handleUploadClick = () => {
    setUploadSheetOpen(true);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4 pb-20">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const content = (
    <div className="space-y-4 pb-20">
      {/* Compact Header */}
      <PhotoGalleryHeader
        stats={stats}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterClick={() => setFilterSheetOpen(true)}
        onViewModeClick={() => setViewModeSheetOpen(true)}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Active Filters Pills - Only show when filters are active */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map(cat => (
            <Badge 
              key={cat} 
              variant="secondary" 
              className={cn("gap-1", categoryColors[cat as PhotoCategory])}
              onClick={() => setFilters(prev => ({
                ...prev,
                categories: prev.categories.filter(c => c !== cat)
              }))}
            >
              {cat}
              <span className="ml-1 opacity-60">×</span>
            </Badge>
          ))}
          {filters.jobs.map(jobId => {
            const job = uniqueJobs.find(j => j.value === jobId);
            return (
              <Badge 
                key={jobId} 
                variant="secondary"
                onClick={() => setFilters(prev => ({
                  ...prev,
                  jobs: prev.jobs.filter(j => j !== jobId)
                }))}
              >
                {job?.label || "Unknown"}
                <span className="ml-1 opacity-60">×</span>
              </Badge>
            );
          })}
          {filters.showApproved && (
            <Badge 
              variant="secondary" 
              className="gap-1 bg-success/20 text-success"
              onClick={() => setFilters(prev => ({ ...prev, showApproved: null }))}
            >
              <Check className="h-3 w-3" />
              Approved
              <span className="ml-1 opacity-60">×</span>
            </Badge>
          )}
          {filters.showShared && (
            <Badge 
              variant="secondary" 
              className="gap-1 bg-info/20 text-info"
              onClick={() => setFilters(prev => ({ ...prev, showShared: null }))}
            >
              <Eye className="h-3 w-3" />
              Shared
              <span className="ml-1 opacity-60">×</span>
            </Badge>
          )}
        </div>
      )}

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <PhotoTimeline
          photos={timelinePhotos}
          onPhotoClick={handleTimelinePhotoClick}
          onToggleApproval={handleToggleApproval}
          onToggleSharing={handleToggleSharing}
        />
      )}

      {/* Map View */}
      {viewMode === "map" && (
        <PhotoMapView
          photos={mapPhotos}
          onPhotoClick={handleMapPhotoClick}
          onToggleApproval={handleToggleApproval}
          onToggleSharing={handleToggleSharing}
        />
      )}

      {/* Photo Grid - Optimised for mobile */}
      {viewMode === "grid" && (
        <div className={cn(
          "grid gap-2",
          isMobile ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        )}>
          {filteredPhotos.map((photo, index) => (
            <Card 
              key={photo.id} 
              className="group cursor-pointer overflow-hidden bg-elec-gray border-border/30 touch-feedback"
              onClick={() => handlePhotoClick(index)}
            >
              <div className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                <Camera className="h-8 w-8 text-muted-foreground/40" />
                
                {/* Category dot indicator - subtle */}
                <div className={cn(
                  "absolute top-1.5 left-1.5 h-2.5 w-2.5 rounded-full",
                  photo.category === "Before" && "bg-blue-400",
                  photo.category === "During" && "bg-amber-400",
                  photo.category === "After" && "bg-emerald-400",
                  photo.category === "Completion" && "bg-purple-400",
                  photo.category === "Issue" && "bg-red-400"
                )} />

                {/* Status indicators - corner */}
                <div className="absolute top-1.5 right-1.5 flex gap-0.5">
                  {photo.approved && (
                    <div className="h-4 w-4 rounded-full bg-success/80 flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-foreground" />
                    </div>
                  )}
                  {photo.sharedWithClient && (
                    <div className="h-4 w-4 rounded-full bg-info/80 flex items-center justify-center">
                      <Eye className="h-2.5 w-2.5 text-foreground" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Minimal info - only on larger screens */}
              {!isMobile && (
                <CardContent className="p-2">
                  <p className="text-xs font-medium truncate text-foreground">{photo.jobTitle}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{photo.uploadedBy}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-2">
          {filteredPhotos.map((photo, index) => (
            <Card 
              key={photo.id} 
              className="cursor-pointer bg-elec-gray/50 border-border/30 touch-feedback"
              onClick={() => handlePhotoClick(index)}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center flex-shrink-0 relative">
                  <Camera className="h-6 w-6 text-muted-foreground/40" />
                  <div className={cn(
                    "absolute top-1 left-1 h-2 w-2 rounded-full",
                    photo.category === "Before" && "bg-blue-400",
                    photo.category === "During" && "bg-amber-400",
                    photo.category === "After" && "bg-emerald-400",
                    photo.category === "Completion" && "bg-purple-400",
                    photo.category === "Issue" && "bg-red-400"
                  )} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-foreground truncate">{photo.jobTitle}</span>
                    <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0", categoryColors[photo.category])}>
                      {photo.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{photo.notes}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-2.5 w-2.5" />
                      {photo.uploadedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {formatDate(photo.timestamp)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 flex-shrink-0">
                  {photo.approved && (
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-success" />
                    </div>
                  )}
                  {photo.sharedWithClient && (
                    <div className="h-5 w-5 rounded-full bg-info/20 flex items-center justify-center">
                      <Eye className="h-3 w-3 text-info" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredPhotos.length === 0 && (viewMode === "grid" || viewMode === "list") && (
        <Card className="bg-elec-gray/50 border-border/30">
          <CardContent className="p-12 text-center">
            <Camera className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-medium">No photos found</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Try adjusting your filters</p>
          </CardContent>
        </Card>
      )}

      {/* Photo Viewer */}
      <PhotoViewer
        photos={filteredPhotos}
        currentIndex={currentPhotoIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onNavigate={setCurrentPhotoIndex}
        onToggleApproval={handleToggleApproval}
        onToggleSharing={handleToggleSharing}
      />

      {/* Compare Slider */}
      {comparePhotos && (
        <PhotoCompareSlider
          beforePhoto={comparePhotos.before}
          afterPhoto={comparePhotos.after}
          isOpen={compareOpen}
          onClose={() => setCompareOpen(false)}
        />
      )}

      {/* Filter Sheet */}
      <PhotoFilterSheet
        isOpen={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        jobOptions={uniqueJobs}
        categoryCounts={categoryCounts}
      />

      {/* View Mode Sheet */}
      <PhotoViewModeSheet
        isOpen={viewModeSheetOpen}
        onClose={() => setViewModeSheetOpen(false)}
        currentMode={viewMode}
        onModeChange={setViewMode}
        onCompareClick={handleCompareClick}
      />

      {/* Upload Photo Sheet */}
      <UploadPhotoSheet
        open={uploadSheetOpen}
        onOpenChange={setUploadSheetOpen}
      />

      {/* Floating Action Button for Upload */}
      {isMobile && (
        <FloatingActionButton
          icon={<Plus className="h-6 w-6" />}
          onClick={handleUploadClick}
          label="Upload Photo"
        />
      )}
    </div>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : content;
}
