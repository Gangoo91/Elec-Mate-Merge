import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, ChevronRight, Search, X, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { useSafetyPhotos, SafetyPhoto, getCategoryColor } from "@/hooks/useSafetyPhotos";
import { formatDistanceToNow } from "date-fns";
import PhotoViewer from "./PhotoViewer";

interface Project {
  name: string;
  count: number;
  lastUpdated: string;
}

export default function ProjectsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<SafetyPhoto | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { photos, projects, isLoading, refetch, deletePhoto, isDeleting } = useSafetyPhotos(
    selectedProject ? { project: selectedProject } : undefined
  );

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  // Filter projects by search
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get photos for selected project
  const projectPhotos = selectedProject
    ? photos.filter((p) => p.project_reference === selectedProject)
    : [];

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
      : Math.min(projectPhotos.length - 1, selectedIndex + 1);
    setSelectedIndex(newIndex);
    setSelectedPhoto(projectPhotos[newIndex]);
  }, [selectedIndex, projectPhotos]);

  const handleDelete = useCallback((photo: SafetyPhoto) => {
    deletePhoto(photo);
    setSelectedPhoto(null);
  }, [deletePhoto]);

  // Empty state
  if (!isLoading && projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black px-4">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
          <Folder className="h-8 w-8 text-white/30" />
        </div>
        <h3 className="text-base font-semibold text-white mb-1">No projects yet</h3>
        <p className="text-xs text-white/50 text-center max-w-[200px] mb-4">
          Add a project reference when uploading to organise photos
        </p>
      </div>
    );
  }

  // Project list view
  if (!selectedProject) {
    return (
      <div className="flex flex-col h-full bg-black">
        {/* Compact search */}
        <div className="sticky top-0 bg-black z-10 px-2 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search..."
              className="pl-8 h-9 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3.5 w-3.5 text-white/40" />
              </button>
            )}
          </div>
        </div>

        {/* Projects list - compact rows */}
        <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
          <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide divide-y divide-white/5">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-white/50">No projects found</p>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.button
                  key={project.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => setSelectedProject(project.name)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 active:bg-white/5 transition-colors touch-manipulation"
                >
                  <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                    <Folder className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-white truncate">{project.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-white/50">{project.count} photos</span>
                      <span className="text-[10px] text-white/40">{formatDistanceToNow(new Date(project.lastUpdated), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/20 flex-shrink-0" />
                </motion.button>
              ))
            )}

            {/* Unorganised photos */}
            {photos.filter((p) => !p.project_reference).length > 0 && (
              <button
                onClick={() => setSelectedProject("__unorganised__")}
                className="w-full flex items-center gap-3 px-3 py-2.5 active:bg-white/5 transition-colors touch-manipulation"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-dashed border-white/10">
                  <ImageIcon className="h-5 w-5 text-white/40" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-white/60">Unorganised</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{photos.filter((p) => !p.project_reference).length} photos</p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/20 flex-shrink-0" />
              </button>
            )}
          </div>
        </PullToRefresh>
      </div>
    );
  }

  // Project detail view - edge to edge grid
  const displayPhotos = selectedProject === "__unorganised__"
    ? photos.filter((p) => !p.project_reference)
    : projectPhotos;

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Compact header */}
      <div className="sticky top-0 bg-black z-10 px-2 py-2 flex items-center gap-2">
        <button
          onClick={() => setSelectedProject(null)}
          className="p-1.5 rounded-lg hover:bg-white/5 transition-colors touch-manipulation"
        >
          <ChevronRight className="h-5 w-5 text-white/60 rotate-180" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-medium text-white truncate">
            {selectedProject === "__unorganised__" ? "Unorganised" : selectedProject}
          </h2>
          <p className="text-[10px] text-white/50">{displayPhotos.length} photos</p>
        </div>
      </div>

      {/* Edge-to-edge photo grid */}
      <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
        <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide">
          {displayPhotos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-white/50">No photos</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-[1px] bg-white/5">
              {displayPhotos.map((photo, index) => (
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
