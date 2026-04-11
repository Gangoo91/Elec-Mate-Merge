import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Folder,
  Search,
  X,
  Plus,
  ChevronRight,
  ChevronLeft,
  Image as ImageIcon,
  HardDrive,
  FolderOpen,
  Camera,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import {
  usePhotoProjects,
  PhotoProject,
  PHOTO_TYPES,
  WORKFLOW_PHASES,
  getPhotoTypeColour,
} from '@/hooks/usePhotoProjects';
import { useSafetyPhotos } from '@/hooks/useSafetyPhotos';
import { formatDistanceToNow } from 'date-fns';
import CreateProjectSheet from './CreateProjectSheet';

interface ProjectsTabProps {
  onSelectProject: (project: PhotoProject) => void;
  onViewAllPhotos?: () => void;
  totalPhotoCount?: number;
  totalBytes?: number;
  projectCount?: number;
  onBack?: () => void;
  backLabel?: string;
}

type StatusTab = 'active' | 'completed' | 'archived';

const formatBytes = (bytes: number): string => {
  if (!bytes || bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

// Workflow progress mini-bar
function WorkflowProgressBar({ typeCounts }: { typeCounts?: Record<string, number> }) {
  if (!typeCounts || Object.keys(typeCounts).length === 0) return null;

  const total = Object.values(typeCounts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const phaseProgress = WORKFLOW_PHASES.map((phase) => {
    const count = phase.photoTypes.reduce((sum, type) => sum + (typeCounts[type] || 0), 0);
    return { ...phase, count, percentage: (count / total) * 100 };
  }).filter((p) => p.count > 0);

  return (
    <div className="flex gap-0.5 h-1 rounded-full overflow-hidden bg-white/5">
      {phaseProgress.map((phase) => (
        <div
          key={phase.id}
          className={`${phase.dotColour} rounded-full`}
          style={{ width: `${phase.percentage}%`, minWidth: '4px' }}
        />
      ))}
    </div>
  );
}

export default function ProjectsTab({
  onSelectProject,
  onViewAllPhotos,
  totalPhotoCount = 0,
  totalBytes = 0,
  projectCount = 0,
  onBack,
  backLabel,
}: ProjectsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState<StatusTab>('active');
  const [createOpen, setCreateOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { projects, isLoading, refetch } = usePhotoProjects(statusTab);
  const { photos: allPhotos } = useSafetyPhotos();
  const unorganisedCount = useMemo(
    () => allPhotos.filter((p) => !p.project_reference && !p.project_id).length,
    [allPhotos]
  );

  // Recent photos for the strip (last 10)
  const recentPhotos = useMemo(() => {
    return [...allPhotos]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10);
  }, [allPhotos]);

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

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
    (project?: PhotoProject) => {
      if (project) onSelectProject(project);
      refetch();
    },
    [onSelectProject, refetch]
  );

  return (
    <>
      <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
        <div className="flex flex-col h-full bg-background momentum-scroll-y scrollbar-hide pb-24">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-white/[0.06]">
            <div className="flex items-center gap-1 px-2 pt-2 pb-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="h-11 w-11 flex items-center justify-center rounded-lg active:bg-white/5 touch-manipulation"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
              )}
              <h1 className="text-lg font-bold text-white flex-1">Photo Docs</h1>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="h-11 w-11 flex items-center justify-center rounded-lg active:bg-white/5 touch-manipulation"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={() => setCreateOpen(true)}
                className="h-11 px-3 rounded-lg bg-elec-yellow text-black text-sm font-semibold flex items-center gap-1.5 touch-manipulation active:bg-yellow-400"
              >
                <Plus className="h-4 w-4" />
                New
              </button>
            </div>

            {/* Search bar (collapsible) */}
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-3 pb-2"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                  <Input
                    placeholder="Search projects, customers, addresses..."
                    className="pl-9 h-11 bg-white/5 border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-xl text-white placeholder:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center active:bg-white/10 rounded-full touch-manipulation"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-3.5 w-3.5 text-white" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Stats Strip */}
          <div className="px-3 pt-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-3 text-center">
                <div className="text-lg font-bold text-white">{totalPhotoCount}</div>
                <div className="text-[10px] text-white uppercase tracking-wide mt-0.5 flex items-center justify-center gap-1">
                  <Camera className="h-3 w-3" />
                  Photos
                </div>
              </div>
              <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-3 text-center">
                <div className="text-lg font-bold text-white">{projectCount}</div>
                <div className="text-[10px] text-white uppercase tracking-wide mt-0.5 flex items-center justify-center gap-1">
                  <FolderOpen className="h-3 w-3" />
                  Projects
                </div>
              </div>
              <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-3 text-center">
                <div className="text-lg font-bold text-white">{formatBytes(totalBytes)}</div>
                <div className="text-[10px] text-white uppercase tracking-wide mt-0.5 flex items-center justify-center gap-1">
                  <HardDrive className="h-3 w-3" />
                  Storage
                </div>
              </div>
            </div>
          </div>

          {/* Recent Photos Strip */}
          {recentPhotos.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between px-4 mb-2">
                <h2 className="text-sm font-semibold text-white">Recent</h2>
                {onViewAllPhotos && (
                  <button
                    onClick={onViewAllPhotos}
                    className="text-xs text-elec-yellow font-medium touch-manipulation active:opacity-70"
                  >
                    View All
                  </button>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide px-3 pb-1">
                {recentPhotos.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10"
                  >
                    <img
                      src={photo.thumbnail_url || photo.file_url}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          <div className="mt-4 px-3">
            {/* Section header + status tabs */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Projects</h2>
            </div>

            {/* Segmented status control */}
            <div className="flex bg-white/[0.04] rounded-xl p-0.5 mb-3 border border-white/[0.06]">
              {(['active', 'completed', 'archived'] as StatusTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusTab(tab)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all touch-manipulation capitalize ${
                    statusTab === tab
                      ? 'bg-elec-yellow text-black shadow-sm'
                      : 'text-white active:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Empty state */}
            {!isLoading && projects.length === 0 && statusTab === 'active' && (
              <div className="flex flex-col items-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center mb-3">
                  <Folder className="h-8 w-8 text-elec-yellow" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">No projects yet</h3>
                <p className="text-xs text-white text-center max-w-[240px] mb-4">
                  Create a project to organise your job photos by customer and workflow phase.
                </p>
                <button
                  onClick={() => setCreateOpen(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-elec-yellow text-black font-semibold touch-manipulation active:scale-[0.98] transition-all"
                >
                  <Plus className="h-5 w-5" />
                  <span>New Project</span>
                </button>
              </div>
            )}

            {/* Loading skeletons */}
            {isLoading && projects.length === 0 && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.06] animate-pulse"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-white/[0.06]" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-white/[0.06] rounded w-2/3" />
                        <div className="h-3 bg-white/[0.04] rounded w-1/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No search results */}
            {!isLoading && filteredProjects.length === 0 && projects.length > 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-white">No projects match your search</p>
              </div>
            )}

            {/* Project cards */}
            <div className="space-y-2.5">
              {filteredProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => onSelectProject(project)}
                  className="w-full text-left p-3.5 bg-white/[0.03] rounded-2xl border border-white/[0.06] active:scale-[0.99] active:bg-white/[0.05] transition-all touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    {/* Thumbnail or folder icon */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      {project.thumbnail_urls && project.thumbnail_urls.length > 0 ? (
                        <div className="grid grid-cols-2 gap-px w-full h-full bg-white/10 rounded-xl overflow-hidden">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-[#1e1e1e] overflow-hidden">
                              {project.thumbnail_urls![i] ? (
                                <img
                                  src={project.thumbnail_urls![i]}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full bg-white/[0.03]" />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-elec-yellow/15 to-amber-600/10 border border-elec-yellow/20 flex items-center justify-center">
                          <Folder className="h-6 w-6 text-elec-yellow" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white truncate">{project.name}</p>
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full capitalize flex-shrink-0 ${
                            project.status === 'active'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                              : project.status === 'completed'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                                : 'bg-white/10 text-white border border-white/10'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-white">
                        {project.customer_name && (
                          <>
                            <span className="truncate">{project.customer_name}</span>
                            <span className="text-white">·</span>
                          </>
                        )}
                        <span className="flex-shrink-0">{project.photo_count || 0} photos</span>
                      </div>

                      {/* Workflow progress */}
                      <div className="mt-2">
                        <WorkflowProgressBar typeCounts={project.type_counts} />
                      </div>

                      {/* Last updated */}
                      <div className="mt-1 text-[10px] text-white">
                        {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Unorganised photos card */}
            {statusTab === 'active' && unorganisedCount > 0 && (
              <div className="mt-3 w-full flex items-center gap-3 p-3.5 bg-orange-500/5 rounded-2xl border border-dashed border-orange-500/20">
                <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 flex-shrink-0">
                  <ImageIcon className="h-5 w-5 text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">Unorganised</p>
                  <p className="text-xs text-white mt-0.5">
                    {unorganisedCount} photo{unorganisedCount !== 1 ? 's' : ''} not in a project
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
              </div>
            )}
          </div>
        </div>
      </PullToRefresh>

      {/* Create Project Sheet */}
      <CreateProjectSheet
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={handleProjectCreated}
      />
    </>
  );
}
