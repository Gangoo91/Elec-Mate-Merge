import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Folder, Search, X, Camera, Plus, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  usePhotoProjects,
  PhotoProject,
  PHOTO_TYPES,
  getPhotoTypeColour,
} from '@/hooks/usePhotoProjects';
import { SafetyPhoto, useSafetyPhotos } from '@/hooks/useSafetyPhotos';
import { formatDistanceToNow } from 'date-fns';
import CameraTab from './CameraTab';
import CreateProjectSheet from './CreateProjectSheet';
import ProjectDetailView from './ProjectDetailView';
import ShareProjectSheet from './ShareProjectSheet';

type StatusTab = 'active' | 'completed' | 'archived';

export default function ProjectsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState<StatusTab>('active');
  const [selectedProject, setSelectedProject] = useState<PhotoProject | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareProject, setShareProject] = useState<PhotoProject | null>(null);
  const [sharePhotos, setSharePhotos] = useState<SafetyPhoto[]>([]);

  const { projects, isLoading, refetch } = usePhotoProjects(statusTab);
  // Also fetch legacy unorganised photos
  const { photos: allPhotos } = useSafetyPhotos();
  const unorganisedCount = useMemo(
    () => allPhotos.filter((p) => !p.project_reference && !p.project_id).length,
    [allPhotos]
  );

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  // Filter projects by search
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.customer_name?.toLowerCase().includes(q) ||
        p.job_reference?.toLowerCase().includes(q) ||
        p.address?.toLowerCase().includes(q)
    );
  }, [projects, searchQuery]);

  const handleProjectCreated = useCallback(
    (project: PhotoProject) => {
      setSelectedProject(project);
      refetch();
    },
    [refetch]
  );

  const handleShare = useCallback((project: PhotoProject, photos: SafetyPhoto[]) => {
    setShareProject(project);
    setSharePhotos(photos);
    setShareOpen(true);
  }, []);

  const handlePhotoUploaded = useCallback(() => {
    refetch();
    setCameraOpen(false);
  }, [refetch]);

  // If a project is selected, show the detail view
  if (selectedProject) {
    return (
      <ProjectDetailView
        project={selectedProject}
        onBack={() => {
          setSelectedProject(null);
          refetch();
        }}
        onShare={handleShare}
      />
    );
  }

  // Empty state
  if (!isLoading && projects.length === 0 && statusTab === 'active') {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full bg-elec-dark px-4">
          <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-4">
            <Folder className="h-10 w-10 text-elec-yellow" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Create your first project</h3>
          <p className="text-sm text-white text-center max-w-[280px] mb-6">
            Organise your photos into projects linked to customers. Track progress with photo types.
          </p>
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-elec-yellow text-black font-semibold touch-manipulation active:scale-[0.98] transition-all"
          >
            <Plus className="h-5 w-5" />
            <span>New Project</span>
          </button>
        </div>

        <CreateProjectSheet
          open={createOpen}
          onOpenChange={setCreateOpen}
          onCreated={handleProjectCreated}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full bg-elec-dark relative">
        {/* Header: search + new button */}
        <div className="sticky top-0 bg-elec-dark z-10 px-3 py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
              <Input
                placeholder="Search projects..."
                className="pl-9 h-10 bg-[#1e1e1e] border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 active:bg-white/10 rounded-full touch-manipulation"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-3.5 w-3.5 text-white" />
                </button>
              )}
            </div>
            <button
              onClick={() => setCreateOpen(true)}
              className="h-11 px-3 rounded-lg bg-elec-yellow text-black text-sm font-semibold flex items-center gap-1.5 touch-manipulation active:bg-yellow-400"
            >
              <Plus className="h-4 w-4" />
              New
            </button>
          </div>

          {/* Status tabs */}
          <div className="flex gap-2 mt-2">
            {(['active', 'completed', 'archived'] as StatusTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors touch-manipulation capitalize ${
                  statusTab === tab
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-white'
                    : 'bg-white/5 border border-white/10 text-white active:bg-white/10'
                }`}
              >
                {tab}
                {statusTab === tab && tab === 'active' ? ' ✓' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Projects list */}
        <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
          <div className="flex-1 momentum-scroll-y scrollbar-hide p-3 space-y-3 pb-20">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-white">No projects found</p>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => setSelectedProject(project)}
                  className="w-full text-left p-3 bg-white/[0.03] rounded-2xl border border-white/[0.08] active:scale-[0.99] transition-transform touch-manipulation"
                >
                  {/* Top row: icon, name, status, chevron */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
                      <Folder className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white truncate">{project.name}</p>
                        <span
                          className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full capitalize flex-shrink-0 ${
                            project.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : project.status === 'completed'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-white/10 text-white'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-white">
                        {project.customer_name && <span>{project.customer_name}</span>}
                        {project.customer_name && <span className="text-white">·</span>}
                        <span>{project.photo_count || 0} photos</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white flex-shrink-0" />
                  </div>

                  {/* Last updated */}
                  <div className="ml-[52px] mt-1 text-[10px] text-white">
                    Last updated:{' '}
                    {formatDistanceToNow(new Date(project.updated_at), {
                      addSuffix: true,
                    })}
                  </div>

                  {/* Thumbnail strip */}
                  {project.thumbnail_urls && project.thumbnail_urls.length > 0 && (
                    <div className="flex gap-1.5 mt-2 ml-[52px]">
                      {project.thumbnail_urls.slice(0, 4).map((url, i) => (
                        <div
                          key={i}
                          className="w-12 h-12 rounded-lg overflow-hidden bg-[#1e1e1e] border border-white/10 flex-shrink-0"
                        >
                          <img
                            src={url}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                      {(project.photo_count || 0) > 4 && (
                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-semibold text-white">
                            +{(project.photo_count || 0) - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Type badges */}
                  {project.type_counts && Object.keys(project.type_counts).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 ml-[52px]">
                      {Object.entries(project.type_counts).map(([type, count]) => {
                        const typeInfo = PHOTO_TYPES.find((t) => t.value === type);
                        if (!typeInfo) return null;
                        return (
                          <span
                            key={type}
                            className="inline-flex items-center gap-1 text-[10px] text-white"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${typeInfo.dotColour}`} />
                            {typeInfo.label}:{count}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </motion.button>
              ))
            )}

            {/* Unorganised photos (legacy) */}
            {statusTab === 'active' && unorganisedCount > 0 && (
              <div className="w-full flex items-center gap-3 p-3 bg-[#1e1e1e] rounded-xl border border-dashed border-white/20">
                <div className="p-2.5 rounded-lg bg-white/5 border border-dashed border-white/20 flex-shrink-0">
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">Unorganised Photos</p>
                  <p className="text-xs text-white mt-0.5">
                    {unorganisedCount} photos without a project
                  </p>
                </div>
              </div>
            )}
          </div>
        </PullToRefresh>

        {/* FAB - Camera */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          onClick={() => setCameraOpen(true)}
          className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-elec-yellow shadow-lg shadow-elec-yellow/30 flex items-center justify-center touch-manipulation active:scale-95 transition-transform z-10"
          aria-label="Take photo"
        >
          <Camera className="h-6 w-6 text-black" />
        </motion.button>
      </div>

      {/* Create Project Sheet */}
      <CreateProjectSheet
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={handleProjectCreated}
      />

      {/* Camera Sheet */}
      <Sheet open={cameraOpen} onOpenChange={setCameraOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
          <CameraTab onPhotoUploaded={handlePhotoUploaded} onClose={() => setCameraOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Share Sheet */}
      {shareProject && (
        <ShareProjectSheet
          open={shareOpen}
          onOpenChange={setShareOpen}
          projectReference={shareProject.name}
          projectId={shareProject.id}
          photos={sharePhotos}
        />
      )}
    </>
  );
}
