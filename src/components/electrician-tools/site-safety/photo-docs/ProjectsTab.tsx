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
import { safetyInputCn } from '../common/SafetyDocField';
import { cn } from '@/lib/utils';

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
function WorkflowPhases({ typeCounts }: { typeCounts?: Record<string, number> }) {
  if (!typeCounts || Object.keys(typeCounts).length === 0) return null;
  const present = WORKFLOW_PHASES.map((phase) => ({
    ...phase,
    count: phase.photoTypes.reduce((sum, type) => sum + (typeCounts[type] || 0), 0),
  })).filter((p) => p.count > 0);
  if (present.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {present.map((phase) => (
        <span
          key={phase.id}
          className="rounded border border-white/[0.12] bg-white/[0.06] px-1.5 py-0.5 text-[10.5px] font-medium text-white"
        >
          {phase.label} {phase.count}
        </span>
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
                    className={cn(safetyInputCn, 'pl-9')}
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

          {/* Stats — one surface split into cells rather than three boxes with
              three borders and three icons competing for the same glance. */}
          <div className="px-3 pt-3">
            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04]">
              <div className="px-3 py-3.5 sm:px-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  Photos
                </p>
                <p className="mt-1 text-[20px] font-bold leading-none tracking-tight tabular-nums text-white">
                  {totalPhotoCount}
                </p>
              </div>
              <div className="border-l border-white/[0.10] px-3 py-3.5 sm:px-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  Projects
                </p>
                <p className="mt-1 text-[20px] font-bold leading-none tracking-tight tabular-nums text-white">
                  {projectCount}
                </p>
              </div>
              <div className="border-l border-white/[0.10] px-3 py-3.5 sm:px-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  Storage
                </p>
                <p className="mt-1 text-[20px] font-bold leading-none tracking-tight tabular-nums text-white">
                  {formatBytes(totalBytes)}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Photos Strip */}
          {recentPhotos.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between px-4 mb-2">
                <h2 className="text-[13px] font-semibold tracking-tight text-white">Recent</h2>
                {onViewAllPhotos && (
                  <button
                    onClick={onViewAllPhotos}
                    className="flex h-11 items-center px-2 text-[12.5px] font-medium text-elec-yellow touch-manipulation active:opacity-70"
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
                    className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/[0.12] bg-[#1e1e1e] sm:h-24 sm:w-24"
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
              <h2 className="text-[13px] font-semibold tracking-tight text-white">Projects</h2>
            </div>

            {/* Segmented status control */}
            <div className="flex bg-white/[0.04] rounded-xl p-0.5 mb-3 border border-white/[0.06]">
              {(['active', 'completed', 'archived'] as StatusTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusTab(tab)}
                  className={`flex h-11 flex-1 items-center justify-center rounded-lg text-[13px] font-semibold capitalize transition-colors touch-manipulation ${
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
            {/* Every tab gets an empty state. Gated on 'active' only, Completed
                and Archived rendered a blank void — no heading, no explanation,
                nothing to click. */}
            {!isLoading && projects.length === 0 && (
              <div className="flex flex-col items-center rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] px-6 py-12">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.06]">
                  <Folder className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-[15px] font-semibold text-white">
                  {statusTab === 'active'
                    ? 'No projects yet'
                    : statusTab === 'completed'
                      ? 'Nothing completed yet'
                      : 'Nothing archived'}
                </h3>
                <p className="mt-1 max-w-[280px] text-center text-[12.5px] text-white">
                  {statusTab === 'active'
                    ? 'Group a job\u2019s photos in one place \u2014 before, progress, completion \u2014 so the whole record is together when you need it.'
                    : statusTab === 'completed'
                      ? 'Projects you mark as complete land here, so finished work stops cluttering your active list.'
                      : 'Archived projects are kept but hidden. Nothing here yet.'}
                </p>
                {statusTab === 'active' && (
                  <button
                    onClick={() => setCreateOpen(true)}
                    className="mt-4 flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-5 font-semibold text-black transition-colors hover:brightness-110 touch-manipulation"
                  >
                    <Plus className="h-5 w-5" />
                    <span>New project</span>
                  </button>
                )}
                {statusTab !== 'active' && (
                  <button
                    onClick={() => setStatusTab('active')}
                    className="mt-4 flex h-11 items-center rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.10] touch-manipulation"
                  >
                    Back to active
                  </button>
                )}
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
            {/* Two/three up from md: — one column of rows on a wide screen
                left two thirds of the display empty. */}
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => onSelectProject(project)}
                  className="h-full w-full rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-3.5 text-left transition-colors active:bg-white/[0.08] touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    {/* Thumbnail or folder icon */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
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
                        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.18] bg-white/[0.03]">
                          <Folder className="h-5 w-5 text-white" />
                          <span className="mt-0.5 text-[9px] font-medium text-white">Empty</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <p className="line-clamp-2 min-w-0 flex-1 text-[14px] font-semibold leading-snug text-white">
                          {project.name}
                        </p>
                        <span
                          className={`flex-shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold capitalize ${
                            project.status === 'active'
                              ? 'bg-elec-yellow text-black'
                              : project.status === 'completed'
                                ? 'bg-white/[0.14] text-white'
                                : 'bg-white/[0.08] text-white'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-white">
                        {project.customer_name && (
                          <>
                            <span className="truncate">{project.customer_name}</span>
                            <span className="text-white">·</span>
                          </>
                        )}
                        <span className="flex-shrink-0">{project.photo_count || 0} photos</span>
                      </div>

                      {(project.photo_count || 0) > 0 && (
                        <div className="mt-2">
                          <WorkflowPhases typeCounts={project.type_counts} />
                        </div>
                      )}

                      {/* Last updated */}
                      <div className="mt-1 text-[11.5px] text-white">
                        {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Unorganised photos card */}
            {statusTab === 'active' && unorganisedCount > 0 && (
              /* Was a plain div carrying a chevron — it looked tappable and did
                 nothing. It now opens the photo library, which is where those
                 photos actually live. */
              <button
                type="button"
                onClick={onViewAllPhotos}
                disabled={!onViewAllPhotos}
                className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-dashed border-white/[0.18] bg-white/[0.03] p-3.5 text-left transition-colors hover:bg-white/[0.06] disabled:cursor-default touch-manipulation"
              >
                <div className="flex-shrink-0 rounded-xl border border-white/[0.12] bg-white/[0.06] p-2.5">
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-white">Unorganised</p>
                  <p className="mt-0.5 text-[12px] text-white">
                    {unorganisedCount} photo{unorganisedCount !== 1 ? 's' : ''} not in a project
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-white" />
              </button>
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
