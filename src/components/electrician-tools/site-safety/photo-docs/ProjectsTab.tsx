import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FolderOpen, ChevronRight, Search, X, Image as ImageIcon, Calendar, Plus, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSafetyPhotos, SafetyPhoto, getCategoryColor } from "@/hooks/useSafetyPhotos";
import { formatDistanceToNow } from "date-fns";
import PhotoViewer from "./PhotoViewer";
import CameraTab from "./CameraTab";

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
  const [cameraOpen, setCameraOpen] = useState(false);
  const [captureForProject, setCaptureForProject] = useState<string | null>(null);

  const { photos, projects, isLoading, refetch, deletePhoto, isDeleting, updatePhoto } = useSafetyPhotos(
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

  const handleEdit = useCallback((photo: SafetyPhoto, updates: Partial<SafetyPhoto>) => {
    updatePhoto({ id: photo.id, updates });
    // Update the selected photo state to reflect changes immediately
    setSelectedPhoto(prev => prev ? { ...prev, ...updates } : null);
  }, [updatePhoto]);

  // Camera handlers
  const handleOpenCamera = useCallback((projectName?: string) => {
    setCaptureForProject(projectName || null);
    setCameraOpen(true);
  }, []);

  const handleCloseCamera = useCallback(() => {
    setCameraOpen(false);
    setCaptureForProject(null);
  }, []);

  const handlePhotoUploaded = useCallback(() => {
    refetch();
    handleCloseCamera();
  }, [refetch, handleCloseCamera]);

  // Empty state
  if (!isLoading && projects.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full bg-elec-dark px-4">
          <div className="w-20 h-20 rounded-2xl bg-[#1e1e1e] border border-white/10 flex items-center justify-center mb-4">
            <Folder className="h-10 w-10 text-white/30" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-sm text-white/50 text-center max-w-[250px] mb-6">
            Take your first photo or add a project reference when uploading photos to organise them into folders
          </p>
          <button
            onClick={() => handleOpenCamera()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-elec-yellow text-black font-semibold touch-manipulation hover:bg-yellow-400 active:scale-[0.98] transition-all"
          >
            <Camera className="h-5 w-5" />
            <span>Take First Photo</span>
          </button>
        </div>

        {/* Camera Sheet */}
        <Sheet open={cameraOpen} onOpenChange={setCameraOpen}>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
            <CameraTab
              onPhotoUploaded={handlePhotoUploaded}
              projectReference={captureForProject || undefined}
              onClose={handleCloseCamera}
            />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Project list view
  if (!selectedProject) {
    return (
      <>
        <div className="flex flex-col h-full bg-elec-dark">
          {/* Search header */}
          <div className="sticky top-0 bg-elec-dark z-10 px-3 py-2 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search projects..."
                className="pl-9 h-10 bg-[#1e1e1e] border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded-full"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3.5 w-3.5 text-white/40" />
                </button>
              )}
            </div>
          </div>

          {/* Projects list */}
          <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
            <div className="flex-1 momentum-scroll-y scrollbar-hide p-3 space-y-2">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-white/50">No projects found</p>
                </div>
              ) : (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="w-full flex items-center gap-3 p-3 bg-[#1e1e1e] rounded-xl border border-white/10 hover:bg-[#252525] transition-all"
                  >
                    <button
                      onClick={() => setSelectedProject(project.name)}
                      className="flex-1 flex items-center gap-3 touch-manipulation active:scale-[0.99] transition-transform"
                    >
                      <div className="p-2.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
                        <Folder className="h-5 w-5 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-semibold text-white truncate">{project.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-white/50">{project.count} photos</span>
                          <span className="text-xs text-white/30">•</span>
                          <span className="text-xs text-white/40 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(project.lastUpdated), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCamera(project.name);
                      }}
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-elec-yellow/20 hover:border-elec-yellow/30 transition-colors touch-manipulation active:scale-95"
                      aria-label={`Add photo to ${project.name}`}
                    >
                      <Camera className="h-4 w-4 text-white/60 hover:text-elec-yellow" />
                    </button>
                    <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
                  </motion.div>
                ))
              )}

              {/* Unorganised photos */}
              {photos.filter((p) => !p.project_reference).length > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: filteredProjects.length * 0.03 }}
                  onClick={() => setSelectedProject("__unorganised__")}
                  className="w-full flex items-center gap-3 p-3 bg-[#1e1e1e] rounded-xl border border-dashed border-white/20 hover:bg-[#252525] active:scale-[0.99] transition-all touch-manipulation"
                >
                  <div className="p-2.5 rounded-lg bg-white/5 border border-dashed border-white/20 flex-shrink-0">
                    <ImageIcon className="h-5 w-5 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-white/60">Unorganised Photos</p>
                    <p className="text-xs text-white/40 mt-0.5">
                      {photos.filter((p) => !p.project_reference).length} photos without a project
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/20 flex-shrink-0" />
                </motion.button>
              )}
            </div>
          </PullToRefresh>
        </div>

        {/* Camera Sheet */}
        <Sheet open={cameraOpen} onOpenChange={setCameraOpen}>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
            <CameraTab
              onPhotoUploaded={handlePhotoUploaded}
              projectReference={captureForProject || undefined}
              onClose={handleCloseCamera}
            />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Project detail view
  const displayPhotos = selectedProject === "__unorganised__"
    ? photos.filter((p) => !p.project_reference)
    : projectPhotos;

  return (
    <>
      <div className="flex flex-col h-full bg-elec-dark relative">
        {/* Project header */}
        <div className="sticky top-0 bg-elec-dark z-10 px-3 py-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedProject(null)}
              className="p-2 -ml-1 rounded-lg hover:bg-white/5 transition-colors touch-manipulation"
            >
              <ChevronRight className="h-5 w-5 text-white/60 rotate-180" />
            </button>
            <div className={`p-2 rounded-lg ${selectedProject === "__unorganised__" ? "bg-white/5 border border-dashed border-white/20" : "bg-elec-yellow/10 border border-elec-yellow/20"}`}>
              {selectedProject === "__unorganised__" ? (
                <ImageIcon className="h-5 w-5 text-white/40" />
              ) : (
                <FolderOpen className="h-5 w-5 text-elec-yellow" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-white truncate">
                {selectedProject === "__unorganised__" ? "Unorganised Photos" : selectedProject}
              </h2>
              <p className="text-xs text-white/50">{displayPhotos.length} photos</p>
            </div>
          </div>
        </div>

        {/* Photo grid */}
        <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
          <div className="flex-1 momentum-scroll-y scrollbar-hide p-3 pb-20">
            {displayPhotos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-white/50">No photos in this project</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {displayPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
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
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] text-white line-clamp-2">{photo.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </PullToRefresh>

        {/* FAB - Add Photo Button (only for real projects, not unorganised) */}
        {selectedProject !== "__unorganised__" && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            onClick={() => handleOpenCamera(selectedProject || undefined)}
            className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-elec-yellow shadow-lg shadow-elec-yellow/30 flex items-center justify-center touch-manipulation active:scale-95 transition-transform z-10"
            aria-label="Add photo"
          >
            <Camera className="h-6 w-6 text-black" />
            <Plus className="h-3 w-3 text-black absolute top-3 right-3" />
          </motion.button>
        )}

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
              onEdit={handleEdit}
              isDeleting={isDeleting}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Camera Sheet */}
      <Sheet open={cameraOpen} onOpenChange={setCameraOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
          <CameraTab
            onPhotoUploaded={handlePhotoUploaded}
            projectReference={captureForProject || undefined}
            onClose={handleCloseCamera}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
