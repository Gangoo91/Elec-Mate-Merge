import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Grid3X3, List, LayoutGrid, X, MapPin, Folder } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { useSafetyPhotos, SafetyPhoto, PHOTO_CATEGORIES, getCategoryColor, getCategoryLabel, getCategoryIcon, PhotoFilters } from "@/hooks/useSafetyPhotos";
import PhotoViewer from "./PhotoViewer";

interface GalleryTabProps {
  onPhotoSelect?: (photo: SafetyPhoto) => void;
}

type ViewMode = "grid" | "list" | "large";

export default function GalleryTab({ onPhotoSelect }: GalleryTabProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState<PhotoFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SafetyPhoto | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { photos, isLoading, refetch, deletePhoto, isDeleting } = useSafetyPhotos(filters);

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value || undefined }));
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, category: value === "all" ? undefined : value }));
  }, []);

  const handlePhotoClick = useCallback((photo: SafetyPhoto, index: number) => {
    setSelectedIndex(index);
    setSelectedPhoto(photo);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const handleNavigate = useCallback((direction: "prev" | "next") => {
    const newIndex = direction === "prev"
      ? Math.max(0, selectedIndex - 1)
      : Math.min(photos.length - 1, selectedIndex + 1);
    setSelectedIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  }, [selectedIndex, photos]);

  const handleDelete = useCallback((photo: SafetyPhoto) => {
    deletePhoto(photo);
    setSelectedPhoto(null);
  }, [deletePhoto]);

  // Empty state
  if (!isLoading && photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black px-4">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
          <Grid3X3 className="h-8 w-8 text-white/30" />
        </div>
        <h3 className="text-base font-semibold text-white mb-1">No photos yet</h3>
        <p className="text-xs text-white/50 text-center max-w-[200px]">
          Take photos in the Camera tab to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Compact search bar */}
      <div className="sticky top-0 bg-black z-10 px-2 py-2 flex items-center gap-1.5">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            placeholder="Search..."
            className="pl-8 pr-8 h-9 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
            value={filters.search || ""}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {filters.search && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded-full"
              onClick={() => handleSearch("")}
            >
              <X className="h-3.5 w-3.5 text-white/40" />
            </button>
          )}
        </div>

        {/* Compact view toggle */}
        <div className="flex items-center bg-white/5 rounded-lg p-0.5">
          <button
            className={`p-1.5 rounded transition-colors touch-manipulation ${viewMode === "grid" ? "bg-elec-yellow text-black" : "text-white/50"}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            className={`p-1.5 rounded transition-colors touch-manipulation ${viewMode === "large" ? "bg-elec-yellow text-black" : "text-white/50"}`}
            onClick={() => setViewMode("large")}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            className={`p-1.5 rounded transition-colors touch-manipulation ${viewMode === "list" ? "bg-elec-yellow text-black" : "text-white/50"}`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        <button
          className="p-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white touch-manipulation"
          onClick={() => setShowFilters(true)}
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* Active filter chip - inline */}
      {filters.category && (
        <div className="px-2 pb-1.5">
          <Badge
            className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 cursor-pointer text-xs h-6"
            onClick={() => handleCategoryChange("all")}
          >
            {getCategoryIcon(filters.category)} {getCategoryLabel(filters.category)}
            <X className="h-3 w-3 ml-1" />
          </Badge>
        </div>
      )}

      {/* Photo grid - edge to edge, minimal gaps */}
      <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
        <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide">
          {viewMode === "grid" && (
            <div className="grid grid-cols-3 gap-[1px] bg-white/5">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="relative aspect-square bg-black cursor-pointer group"
                  onClick={() => handlePhotoClick(photo, index)}
                >
                  <img
                    src={photo.file_url}
                    alt={photo.description}
                    className="w-full h-full object-cover transition-transform duration-150 group-active:scale-[0.98]"
                    loading="lazy"
                  />
                  <div className={`absolute top-1.5 left-1.5 w-2 h-2 rounded-full ${getCategoryColor(photo.category)} ring-1 ring-black/30`} />
                </motion.div>
              ))}
            </div>
          )}

          {viewMode === "large" && (
            <div className="grid grid-cols-2 gap-[1px] bg-white/5">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="relative bg-black cursor-pointer group"
                  onClick={() => handlePhotoClick(photo, index)}
                >
                  <div className="aspect-square">
                    <img
                      src={photo.file_url}
                      alt={photo.description}
                      className="w-full h-full object-cover transition-transform duration-150 group-active:scale-[0.98]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${getCategoryColor(photo.category)}`} />
                      <span className="text-[10px] text-white/70 uppercase tracking-wide">{getCategoryLabel(photo.category)}</span>
                    </div>
                    <p className="text-xs text-white line-clamp-1 mt-0.5">{photo.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {viewMode === "list" && (
            <div className="divide-y divide-white/5">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-center gap-3 px-3 py-2.5 cursor-pointer active:bg-white/5 transition-colors touch-manipulation"
                  onClick={() => handlePhotoClick(photo, index)}
                >
                  <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 bg-black">
                    <img
                      src={photo.file_url}
                      alt={photo.description}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${getCategoryColor(photo.category)}`} />
                      <span className="text-[10px] text-white/50 uppercase">{getCategoryLabel(photo.category)}</span>
                    </div>
                    <p className="text-sm text-white line-clamp-1">{photo.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {photo.location && (
                        <span className="flex items-center gap-0.5 text-[10px] text-white/40">
                          <MapPin className="h-2.5 w-2.5" />
                          {photo.location}
                        </span>
                      )}
                      {photo.project_reference && (
                        <span className="flex items-center gap-0.5 text-[10px] text-white/40">
                          <Folder className="h-2.5 w-2.5" />
                          {photo.project_reference}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </PullToRefresh>

      {/* Filter sheet - compact */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl p-0">
          <div className="p-3">
            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white mb-3">Filter Photos</h3>

            {/* Category select */}
            <Select value={filters.category || "all"} onValueChange={handleCategoryChange}>
              <SelectTrigger className="h-10 text-sm bg-white/5 border-0 touch-manipulation mb-3">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {PHOTO_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Quick category grid */}
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {PHOTO_CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat.value}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors touch-manipulation ${
                    filters.category === cat.value
                      ? "bg-elec-yellow/20 ring-1 ring-elec-yellow"
                      : "bg-white/5 active:bg-white/10"
                  }`}
                  onClick={() => {
                    handleCategoryChange(filters.category === cat.value ? "all" : cat.value);
                    setShowFilters(false);
                  }}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                  <span className="text-[9px] text-white/70 text-center leading-tight">{cat.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Clear filters */}
            {(filters.category || filters.search) && (
              <button
                onClick={() => {
                  setFilters({});
                  setShowFilters(false);
                }}
                className="w-full h-10 rounded-lg bg-white/5 text-sm text-white/70 touch-manipulation active:bg-white/10"
              >
                Clear Filters
              </button>
            )}
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>

      {/* Photo viewer */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoViewer
            photo={selectedPhoto}
            photos={photos}
            currentIndex={selectedIndex}
            onClose={handleCloseViewer}
            onNavigate={handleNavigate}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
