import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Grid3X3, List, LayoutGrid, X, MapPin, Folder, FolderOpen, ChevronRight, Image as ImageIcon, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { useSafetyPhotos, SafetyPhoto, PHOTO_CATEGORIES, getCategoryColor, getCategoryLabel, getCategoryIcon, PhotoFilters } from "@/hooks/useSafetyPhotos";
import { formatDistanceToNow, format } from "date-fns";
import PhotoViewer from "./PhotoViewer";

interface GalleryTabProps {
  onPhotoSelect?: (photo: SafetyPhoto) => void;
}

type ViewMode = "projects" | "grid" | "list";

interface ProjectGroup {
  name: string;
  photos: SafetyPhoto[];
  lastUpdated: Date;
  categories: string[];
}

export default function GalleryTab({ onPhotoSelect }: GalleryTabProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("projects");
  const [filters, setFilters] = useState<PhotoFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SafetyPhoto | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const { photos, isLoading, refetch, deletePhoto, isDeleting } = useSafetyPhotos(filters);

  // Group photos by project
  const projectGroups = useMemo(() => {
    const groups: Record<string, ProjectGroup> = {};

    photos.forEach((photo) => {
      const projectName = photo.project_reference || "__unorganised__";

      if (!groups[projectName]) {
        groups[projectName] = {
          name: projectName,
          photos: [],
          lastUpdated: new Date(photo.created_at),
          categories: [],
        };
      }

      groups[projectName].photos.push(photo);

      // Track categories in this project
      if (!groups[projectName].categories.includes(photo.category)) {
        groups[projectName].categories.push(photo.category);
      }

      // Update last updated if newer
      const photoDate = new Date(photo.created_at);
      if (photoDate > groups[projectName].lastUpdated) {
        groups[projectName].lastUpdated = photoDate;
      }
    });

    // Sort by last updated (most recent first), but keep unorganised at the end
    return Object.values(groups).sort((a, b) => {
      if (a.name === "__unorganised__") return 1;
      if (b.name === "__unorganised__") return -1;
      return b.lastUpdated.getTime() - a.lastUpdated.getTime();
    });
  }, [photos]);

  // Get photos for expanded project or all photos for flat views
  const displayPhotos = useMemo(() => {
    if (expandedProject) {
      return photos.filter((p) =>
        expandedProject === "__unorganised__"
          ? !p.project_reference
          : p.project_reference === expandedProject
      );
    }
    return photos;
  }, [photos, expandedProject]);

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value || undefined }));
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, category: value === "all" ? undefined : value }));
  }, []);

  const handlePhotoClick = useCallback((photo: SafetyPhoto, index: number, projectPhotos?: SafetyPhoto[]) => {
    const photoList = projectPhotos || displayPhotos;
    const actualIndex = projectPhotos ? index : photoList.findIndex(p => p.id === photo.id);
    setSelectedIndex(actualIndex);
    setSelectedPhoto(photo);
  }, [displayPhotos]);

  const handleCloseViewer = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const handleNavigate = useCallback((direction: "prev" | "next") => {
    const photoList = expandedProject
      ? displayPhotos
      : photos;
    const newIndex = direction === "prev"
      ? Math.max(0, selectedIndex - 1)
      : Math.min(photoList.length - 1, selectedIndex + 1);
    setSelectedIndex(newIndex);
    setSelectedPhoto(photoList[newIndex]);
  }, [selectedIndex, displayPhotos, photos, expandedProject]);

  const handleDelete = useCallback((photo: SafetyPhoto) => {
    deletePhoto(photo);
    setSelectedPhoto(null);
  }, [deletePhoto]);

  // Empty state
  if (!isLoading && photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-elec-dark px-4">
        <div className="w-16 h-16 rounded-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center mb-3">
          <Grid3X3 className="h-8 w-8 text-white/30" />
        </div>
        <h3 className="text-base font-semibold text-white mb-1">No photos yet</h3>
        <p className="text-xs text-white/50 text-center max-w-[200px]">
          Take photos in the Camera tab to get started
        </p>
      </div>
    );
  }

  // Expanded project view
  if (expandedProject) {
    const project = projectGroups.find(p => p.name === expandedProject);

    return (
      <div className="flex flex-col h-full bg-elec-dark">
        {/* Project header */}
        <div className="sticky top-0 bg-elec-dark z-10 px-3 py-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setExpandedProject(null)}
              className="p-2 -ml-1 rounded-lg hover:bg-white/5 transition-colors touch-manipulation"
            >
              <ChevronRight className="h-5 w-5 text-white/60 rotate-180" />
            </button>
            <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
              <FolderOpen className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-white truncate">
                {expandedProject === "__unorganised__" ? "Unorganised Photos" : expandedProject}
              </h2>
              <p className="text-xs text-white/50">{displayPhotos.length} photos</p>
            </div>
          </div>
        </div>

        {/* Photo grid */}
        <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
          <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide p-3">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {displayPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="relative aspect-square rounded-lg overflow-hidden bg-[#1e1e1e] border border-white/10 cursor-pointer group"
                  onClick={() => handlePhotoClick(photo, index, displayPhotos)}
                >
                  <img
                    src={photo.file_url}
                    alt={photo.description}
                    className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-105 group-active:scale-[0.98]"
                    loading="lazy"
                  />
                  <div className={`absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full ${getCategoryColor(photo.category)} ring-2 ring-black/50`} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white line-clamp-2">{photo.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </PullToRefresh>

        {/* Photo viewer */}
        <AnimatePresence>
          {selectedPhoto && (
            <PhotoViewer
              photo={selectedPhoto}
              photos={displayPhotos}
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

  return (
    <div className="flex flex-col h-full bg-elec-dark">
      {/* Search bar */}
      <div className="sticky top-0 bg-elec-dark z-10 px-3 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search photos..."
              className="pl-9 pr-8 h-10 bg-[#1e1e1e] border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
              value={filters.search || ""}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {filters.search && (
              <button
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded-full"
                onClick={() => handleSearch("")}
              >
                <X className="h-3.5 w-3.5 text-white/40" />
              </button>
            )}
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-[#1e1e1e] border border-white/10 rounded-lg p-0.5">
            <button
              className={`p-2 rounded-md transition-colors touch-manipulation ${viewMode === "projects" ? "bg-elec-yellow text-black" : "text-white/50 hover:text-white"}`}
              onClick={() => setViewMode("projects")}
              title="Project view"
            >
              <Folder className="h-4 w-4" />
            </button>
            <button
              className={`p-2 rounded-md transition-colors touch-manipulation ${viewMode === "grid" ? "bg-elec-yellow text-black" : "text-white/50 hover:text-white"}`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              className={`p-2 rounded-md transition-colors touch-manipulation ${viewMode === "list" ? "bg-elec-yellow text-black" : "text-white/50 hover:text-white"}`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <button
            className="p-2 rounded-lg bg-[#1e1e1e] border border-white/10 text-white/50 hover:text-white touch-manipulation"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>

        {/* Active filter chip */}
        {filters.category && (
          <div className="mt-2">
            <Badge
              className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 cursor-pointer text-xs h-7 px-2.5"
              onClick={() => handleCategoryChange("all")}
            >
              {getCategoryIcon(filters.category)} {getCategoryLabel(filters.category)}
              <X className="h-3 w-3 ml-1.5" />
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
        <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide">

          {/* Projects View - Cards grouped by project */}
          {viewMode === "projects" && (
            <div className="p-3 space-y-4">
              {projectGroups.map((project, groupIndex) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIndex * 0.05 }}
                  className="bg-[#1e1e1e] rounded-xl border border-white/10 overflow-hidden"
                >
                  {/* Project header */}
                  <button
                    onClick={() => setExpandedProject(project.name)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors touch-manipulation"
                  >
                    <div className={`p-2.5 rounded-lg ${project.name === "__unorganised__" ? "bg-white/5 border border-dashed border-white/20" : "bg-elec-yellow/10 border border-elec-yellow/20"}`}>
                      {project.name === "__unorganised__" ? (
                        <ImageIcon className="h-5 w-5 text-white/40" />
                      ) : (
                        <Folder className="h-5 w-5 text-elec-yellow" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {project.name === "__unorganised__" ? "Unorganised Photos" : project.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-white/50">{project.photos.length} photos</span>
                        <span className="text-xs text-white/30">•</span>
                        <span className="text-xs text-white/40 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(project.lastUpdated, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    {/* Category dots */}
                    <div className="flex items-center gap-1 mr-1">
                      {project.categories.slice(0, 4).map((cat) => (
                        <span key={cat} className={`w-2 h-2 rounded-full ${getCategoryColor(cat)}`} />
                      ))}
                      {project.categories.length > 4 && (
                        <span className="text-[10px] text-white/40">+{project.categories.length - 4}</span>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
                  </button>

                  {/* Photo preview grid */}
                  <div className="px-3 pb-3">
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-1.5">
                      {project.photos.slice(0, 8).map((photo, index) => (
                        <div
                          key={photo.id}
                          className="relative aspect-square rounded-lg overflow-hidden bg-black cursor-pointer group"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePhotoClick(photo, index, project.photos);
                          }}
                        >
                          <img
                            src={photo.file_url}
                            alt={photo.description}
                            className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-105 group-active:scale-[0.98]"
                            loading="lazy"
                          />
                          <div className={`absolute top-1 left-1 w-2 h-2 rounded-full ${getCategoryColor(photo.category)} ring-1 ring-black/50`} />
                        </div>
                      ))}
                      {project.photos.length > 8 && (
                        <button
                          onClick={() => setExpandedProject(project.name)}
                          className="aspect-square rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-colors touch-manipulation"
                        >
                          <span className="text-lg font-bold text-white/70">+{project.photos.length - 8}</span>
                          <span className="text-[10px] text-white/40">more</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Grid View - Flat grid of all photos */}
          {viewMode === "grid" && (
            <div className="p-3">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="relative aspect-square rounded-lg overflow-hidden bg-[#1e1e1e] border border-white/10 cursor-pointer group"
                    onClick={() => handlePhotoClick(photo, index)}
                  >
                    <img
                      src={photo.file_url}
                      alt={photo.description}
                      className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-105 group-active:scale-[0.98]"
                      loading="lazy"
                    />
                    <div className={`absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full ${getCategoryColor(photo.category)} ring-2 ring-black/50`} />
                    {photo.project_reference && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                        <span className="text-[9px] text-white/70 flex items-center gap-1">
                          <Folder className="h-2.5 w-2.5" />
                          {photo.project_reference}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="p-3 space-y-2">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-center gap-3 p-3 bg-[#1e1e1e] rounded-xl border border-white/10 cursor-pointer hover:bg-[#252525] active:scale-[0.99] transition-all touch-manipulation"
                  onClick={() => handlePhotoClick(photo, index)}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                    <img
                      src={photo.file_url}
                      alt={photo.description}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getCategoryColor(photo.category)}`} />
                      <span className="text-[10px] text-white/50 uppercase font-medium">{getCategoryLabel(photo.category)}</span>
                    </div>
                    <p className="text-sm text-white line-clamp-1 font-medium">{photo.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {photo.project_reference && (
                        <span className="flex items-center gap-1 text-xs text-white/40">
                          <Folder className="h-3 w-3" />
                          {photo.project_reference}
                        </span>
                      )}
                      {photo.location && (
                        <span className="flex items-center gap-1 text-xs text-white/40">
                          <MapPin className="h-3 w-3" />
                          {photo.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/20 flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </PullToRefresh>

      {/* Filter sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl p-0 bg-elec-dark border-white/10">
          <div className="p-4">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="text-base font-semibold text-white mb-4">Filter Photos</h3>

            {/* Category select */}
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide">Category</label>
            <Select value={filters.category || "all"} onValueChange={handleCategoryChange}>
              <SelectTrigger className="mt-2 h-11 text-sm bg-[#1e1e1e] border border-white/10 touch-manipulation">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e1e1e] border-white/10">
                <SelectItem value="all">All Categories</SelectItem>
                {PHOTO_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                      {cat.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Quick category grid */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {PHOTO_CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat.value}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all touch-manipulation ${
                    filters.category === cat.value
                      ? "bg-elec-yellow/20 ring-1 ring-elec-yellow"
                      : "bg-[#1e1e1e] border border-white/10 hover:bg-[#252525] active:bg-[#252525]"
                  }`}
                  onClick={() => {
                    handleCategoryChange(filters.category === cat.value ? "all" : cat.value);
                    setShowFilters(false);
                  }}
                >
                  <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span className="text-[10px] text-white/70 text-center leading-tight">{cat.label.split(' ')[0]}</span>
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
                className="w-full h-11 mt-4 rounded-xl bg-white/10 text-sm font-medium text-white/70 hover:bg-white/15 touch-manipulation active:bg-white/15"
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
            photos={expandedProject ? displayPhotos : photos}
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
