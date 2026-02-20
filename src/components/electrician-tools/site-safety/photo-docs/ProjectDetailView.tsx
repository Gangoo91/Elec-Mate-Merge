import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronDown,
  Camera,
  Share2,
  Download,
  MoreVertical,
  Grid3X3,
  Calendar,
  Plus,
  Check,
  Archive,
  Trash2,
  Edit3,
  Loader2,
  Sparkles,
  ArrowLeftRight,
  Play,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  PhotoProject,
  usePhotoProjects,
  PHOTO_TYPES,
  WORKFLOW_PHASES,
  getPhotoTypeColour,
} from '@/hooks/usePhotoProjects';
import { SafetyPhoto } from '@/hooks/useSafetyPhotos';
import { format, isToday, isYesterday } from 'date-fns';
import CameraTab from './CameraTab';
import PhotoDetailSheet from './PhotoDetailSheet';
import ProjectExportSheet from './ProjectExportSheet';
import { usePhotoAI, ProjectSummary } from '@/hooks/usePhotoAI';

interface ProjectDetailViewProps {
  project: PhotoProject;
  onBack: () => void;
  onShare: (project: PhotoProject, photos: SafetyPhoto[]) => void;
  onOpenCamera?: () => void;
}

type ViewMode = 'phases' | 'timeline';

// Skeleton loader for photo grid
function PhotoGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg bg-white/[0.03] border border-white/[0.06] animate-pulse"
        />
      ))}
    </div>
  );
}

export default function ProjectDetailView({
  project,
  onBack,
  onShare,
  onOpenCamera,
}: ProjectDetailViewProps) {
  const { getProjectWithPhotos, updateProject, archiveProject, deleteProject } = usePhotoProjects();

  const [photos, setPhotos] = useState<SafetyPhoto[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('phases');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [detailPhoto, setDetailPhoto] = useState<SafetyPhoto | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState<ProjectSummary | null>(null);
  const { summariseProject, isSummarising } = usePhotoAI();

  // Track which phases are open (all open by default)
  const [openPhases, setOpenPhases] = useState<Set<string>>(
    new Set(WORKFLOW_PHASES.map((p) => p.id))
  );

  const togglePhase = useCallback((phaseId: string) => {
    setOpenPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) next.delete(phaseId);
      else next.add(phaseId);
      return next;
    });
  }, []);

  // Load photos
  const loadPhotos = useCallback(async () => {
    setIsLoadingPhotos(true);
    const result = await getProjectWithPhotos(project.id);
    if (result) {
      setPhotos(result.photos);
    }
    setIsLoadingPhotos(false);
  }, [project.id, getProjectWithPhotos]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  // Group photos by workflow phase
  const phaseGroups = useMemo(() => {
    return WORKFLOW_PHASES.map((phase) => {
      const phasePhotos = photos.filter((p) => {
        const type = p.photo_type || 'general';
        return phase.photoTypes.includes(type);
      });
      return { ...phase, photos: phasePhotos };
    });
  }, [photos]);

  // Check if before/after compare is possible
  const canCompare = useMemo(() => {
    const beforePhase = phaseGroups.find((p) => p.id === 'before');
    const afterPhase = phaseGroups.find((p) => p.id === 'completion');
    return (beforePhase?.photos.length || 0) > 0 && (afterPhase?.photos.length || 0) > 0;
  }, [phaseGroups]);

  // Timeline grouping
  const timelineGroups = useMemo(() => {
    if (viewMode !== 'timeline') return [];

    const groups = new Map<
      string,
      { date: Date; label: string; entries: Map<string, SafetyPhoto[]> }
    >();

    photos.forEach((photo) => {
      const date = new Date(photo.created_at);
      const dateKey = format(date, 'yyyy-MM-dd');

      if (!groups.has(dateKey)) {
        let label = format(date, 'd MMM yyyy');
        if (isToday(date)) label = 'Today';
        else if (isYesterday(date)) label = 'Yesterday';
        groups.set(dateKey, { date, label, entries: new Map() });
      }

      const group = groups.get(dateKey)!;
      const type = photo.photo_type || 'general';
      if (!group.entries.has(type)) group.entries.set(type, []);
      group.entries.get(type)!.push(photo);
    });

    return Array.from(groups.values()).sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [photos, viewMode]);

  const handleRefresh = useCallback(async () => {
    await loadPhotos();
  }, [loadPhotos]);

  const handlePhotoClick = useCallback(
    (photo: SafetyPhoto) => {
      if (batchMode) {
        setSelectedPhotos((prev) => {
          const next = new Set(prev);
          if (next.has(photo.id)) next.delete(photo.id);
          else next.add(photo.id);
          return next;
        });
        return;
      }
      setDetailPhoto(photo);
      setDetailOpen(true);
    },
    [batchMode]
  );

  const handleLongPress = useCallback((photo: SafetyPhoto) => {
    setBatchMode(true);
    setSelectedPhotos(new Set([photo.id]));
  }, []);

  const handlePhotoUploaded = useCallback(() => {
    loadPhotos();
    setCameraOpen(false);
  }, [loadPhotos]);

  const handleStatusChange = useCallback(
    (newStatus: 'active' | 'completed' | 'archived') => {
      if (newStatus === 'archived') {
        archiveProject(project.id);
      } else {
        updateProject({ id: project.id, updates: { status: newStatus } });
      }
      setMenuOpen(false);
    },
    [project.id, archiveProject, updateProject]
  );

  // Calculate project storage
  const projectBytes = useMemo(() => {
    return photos.reduce((sum, p) => sum + (p.file_size || 0), 0);
  }, [photos]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const statusBadgeColour =
    project.status === 'active'
      ? 'bg-green-500/20 text-green-400'
      : project.status === 'completed'
        ? 'bg-blue-500/20 text-blue-400'
        : 'bg-white/10 text-white';

  return (
    <>
      <div className="flex flex-col h-full bg-background relative">
        {/* Header */}
        <div className="flex-shrink-0 bg-background z-10 border-b border-white/10">
          {/* Row 1: Back + Title + Menu */}
          <div className="flex items-center gap-1 px-2 pt-2">
            <button
              onClick={onBack}
              className="h-11 w-11 flex items-center justify-center rounded-lg active:bg-white/5 transition-colors touch-manipulation"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <h2 className="flex-1 text-base font-semibold text-white truncate">{project.name}</h2>
            <button
              onClick={() => setMenuOpen(true)}
              className="h-11 w-11 flex items-center justify-center rounded-lg active:bg-white/5 touch-manipulation"
            >
              <MoreVertical className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Row 2: Customer + Address subtitle */}
          {(project.customer_name || project.address) && (
            <div className="flex items-center gap-1.5 px-4 ml-10 -mt-0.5 text-xs text-white">
              {project.customer_name && <span>{project.customer_name}</span>}
              {project.customer_name && project.address && <span>·</span>}
              {project.address && <span className="truncate">{project.address}</span>}
            </div>
          )}

          {/* Row 3: Badges + Action buttons */}
          <div className="flex items-center gap-2 px-4 ml-10 py-2">
            {project.job_reference && (
              <span className="text-[10px] text-white font-mono bg-white/5 px-2 py-0.5 rounded">
                {project.job_reference}
              </span>
            )}
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusBadgeColour}`}
            >
              {project.status}
            </span>
            {!isLoadingPhotos && photos.length > 0 && (
              <span className="text-[10px] text-white font-mono bg-white/5 px-2 py-0.5 rounded">
                {photos.length} · {formatBytes(projectBytes)}
              </span>
            )}

            <div className="flex-1" />

            {/* Export */}
            <button
              onClick={() => setExportOpen(true)}
              className="h-9 px-3 flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 touch-manipulation active:bg-white/10"
            >
              <Download className="h-3.5 w-3.5 text-white" />
              <span className="text-xs text-white font-medium">Export</span>
            </button>

            {/* View toggle */}
            <button
              onClick={() => setViewMode((v) => (v === 'phases' ? 'timeline' : 'phases'))}
              className="h-9 px-3 flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 touch-manipulation active:bg-white/10"
            >
              {viewMode === 'phases' ? (
                <>
                  <Calendar className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs text-white font-medium">Timeline</span>
                </>
              ) : (
                <>
                  <Grid3X3 className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs text-white font-medium">Phases</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Batch select bar */}
        {batchMode && (
          <div className="flex-shrink-0 px-3 py-2 bg-elec-yellow/10 border-b border-elec-yellow/20 flex items-center gap-2">
            <span className="text-xs font-medium text-white flex-1">
              {selectedPhotos.size} selected
            </span>
            <button
              onClick={() => {
                setBatchMode(false);
                setSelectedPhotos(new Set());
              }}
              className="h-11 px-4 rounded-lg bg-white/10 text-xs text-white touch-manipulation"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Content */}
        <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoadingPhotos}>
          <div className="flex-1 momentum-scroll-y scrollbar-hide p-3 pb-24">
            {/* AI Summary Card */}
            {aiSummary && (
              <div className="mb-3 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">
                    AI Summary
                  </span>
                </div>
                <p className="text-sm text-white leading-relaxed">{aiSummary.summary}</p>
              </div>
            )}

            {/* Action row: AI Summary + Before/After Compare */}
            {!isLoadingPhotos && photos.length >= 2 && (
              <div className="flex gap-2 mb-3">
                {!aiSummary && (
                  <button
                    onClick={async () => {
                      const result = await summariseProject(project.id);
                      if (result) setAiSummary(result);
                    }}
                    disabled={isSummarising}
                    className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 touch-manipulation active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSummarising ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Summarising...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        AI Summary
                      </>
                    )}
                  </button>
                )}
                {canCompare && (
                  <button className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/10">
                    <ArrowLeftRight className="h-4 w-4" />
                    Before / After
                  </button>
                )}
              </div>
            )}

            {isLoadingPhotos ? (
              /* Skeleton loader */
              <div className="space-y-4">
                {WORKFLOW_PHASES.map((phase) => (
                  <div key={phase.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-20 h-4 rounded bg-white/[0.06] animate-pulse" />
                    </div>
                    <PhotoGridSkeleton />
                  </div>
                ))}
              </div>
            ) : viewMode === 'phases' ? (
              /* Phase-based view */
              <div className="space-y-3">
                {phaseGroups.map((phase) => (
                  <Collapsible
                    key={phase.id}
                    open={openPhases.has(phase.id)}
                    onOpenChange={() => togglePhase(phase.id)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center gap-2.5 py-2 touch-manipulation">
                        <span className={`w-2.5 h-2.5 rounded-full ${phase.dotColour}`} />
                        <span className="text-sm font-semibold text-white flex-1 text-left">
                          {phase.label}
                        </span>
                        <span className="text-xs text-white">{phase.photos.length}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-white transition-transform ${
                            openPhases.has(phase.id) ? 'rotate-0' : '-rotate-90'
                          }`}
                        />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {phase.photos.length === 0 ? (
                        /* Empty phase - dashed placeholder */
                        <button
                          onClick={() => setCameraOpen(true)}
                          className="w-full h-24 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1.5 mb-2 touch-manipulation active:border-white/20 active:bg-white/[0.02] transition-colors"
                        >
                          <Plus className="h-5 w-5 text-white" />
                          <span className="text-xs text-white">Add {phase.label} Photos</span>
                        </button>
                      ) : (
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          {phase.photos.map((photo, index) => (
                            <motion.div
                              key={photo.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.02 }}
                              style={{ contentVisibility: 'auto', containIntrinsicSize: '0 150px' }}
                              className={`relative aspect-square rounded-lg overflow-hidden bg-[#1e1e1e] border cursor-pointer group ${
                                batchMode && selectedPhotos.has(photo.id)
                                  ? 'border-elec-yellow ring-2 ring-elec-yellow/50'
                                  : 'border-white/10'
                              }`}
                              onClick={() => handlePhotoClick(photo)}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                handleLongPress(photo);
                              }}
                            >
                              <img
                                src={photo.thumbnail_url || photo.file_url}
                                alt={photo.description}
                                className="w-full h-full object-cover transition-transform duration-150 group-active:scale-[0.98]"
                                loading="lazy"
                              />
                              {/* Video play overlay */}
                              {photo.mime_type?.startsWith('video/') && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                                    <Play className="h-5 w-5 text-white ml-0.5" />
                                  </div>
                                </div>
                              )}
                              {/* Type dot */}
                              <div
                                className={`absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full ${getPhotoTypeColour(photo.photo_type || 'general')} ring-2 ring-black/50`}
                              />
                              {/* Batch select check */}
                              {batchMode && (
                                <div
                                  className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center ${
                                    selectedPhotos.has(photo.id)
                                      ? 'bg-elec-yellow'
                                      : 'bg-black/50 border border-white/30'
                                  }`}
                                >
                                  {selectedPhotos.has(photo.id) && (
                                    <Check className="h-3 w-3 text-black" />
                                  )}
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            ) : (
              /* Timeline view */
              <div className="relative">
                <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-white/10" />

                {timelineGroups.map((group, gi) => (
                  <div key={group.label} className="mb-6">
                    <div className="flex items-center gap-3 mb-3 ml-4">
                      <div className="text-sm font-semibold text-white">{group.label}</div>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {Array.from(group.entries.entries()).map(([type, typePhotos]) => (
                      <div key={type} className="relative mb-4 ml-0">
                        <div
                          className={`absolute left-0 top-1 w-3 h-3 rounded-full ${getPhotoTypeColour(type)} ring-2 ring-background z-10`}
                        />
                        <div className="ml-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`w-2 h-2 rounded-full ${getPhotoTypeColour(type)}`} />
                            <span className="text-xs font-medium text-white capitalize">
                              {PHOTO_TYPES.find((t) => t.value === type)?.label || type}
                            </span>
                          </div>
                          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                            {typePhotos.map((photo, pi) => (
                              <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: gi * 0.05 + pi * 0.02,
                                }}
                                className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-[#1e1e1e] border border-white/10 cursor-pointer"
                                onClick={() => handlePhotoClick(photo)}
                              >
                                <img
                                  src={photo.thumbnail_url || photo.file_url}
                                  alt={photo.description}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                {photo.mime_type?.startsWith('video/') && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center">
                                      <Play className="h-3 w-3 text-white ml-px" />
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                          {typePhotos[0]?.notes && (
                            <p className="text-xs text-white mt-1.5 line-clamp-2">
                              {typePhotos[0].notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </PullToRefresh>

        {/* Sticky bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-white/[0.06] p-3 flex gap-2">
          <button
            onClick={() => setCameraOpen(true)}
            className="flex-1 h-11 rounded-xl bg-elec-yellow text-sm font-semibold text-black flex items-center justify-center gap-2 touch-manipulation active:bg-yellow-400 transition-all"
          >
            <Camera className="h-4 w-4" />
            <span>Add Photos</span>
          </button>
          <button
            onClick={() => onShare(project, photos)}
            className="flex-1 h-11 rounded-xl bg-white/10 border border-white/10 text-sm font-medium text-white flex items-center justify-center gap-2 touch-manipulation active:bg-white/15 transition-all"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Camera Sheet */}
      <Sheet open={cameraOpen} onOpenChange={setCameraOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
          <CameraTab
            onPhotoUploaded={handlePhotoUploaded}
            projectReference={project.name}
            projectId={project.id}
            onClose={() => setCameraOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Export Sheet */}
      <ProjectExportSheet
        open={exportOpen}
        onOpenChange={setExportOpen}
        project={project}
        photos={photos}
      />

      {/* Menu Sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="bottom"
          className="h-auto p-0 rounded-t-2xl overflow-hidden bg-background border-white/10"
        >
          <div className="pt-3 px-4">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
          </div>
          <div className="px-2 pb-4 space-y-1">
            {project.status !== 'completed' && (
              <button
                onClick={() => handleStatusChange('completed')}
                className="w-full flex items-center gap-3 px-4 h-12 rounded-xl text-white active:bg-white/5 touch-manipulation"
              >
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">Mark as Completed</span>
              </button>
            )}
            {project.status === 'completed' && (
              <button
                onClick={() => handleStatusChange('active')}
                className="w-full flex items-center gap-3 px-4 h-12 rounded-xl text-white active:bg-white/5 touch-manipulation"
              >
                <Edit3 className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">Reopen Project</span>
              </button>
            )}
            <button
              onClick={() => handleStatusChange('archived')}
              className="w-full flex items-center gap-3 px-4 h-12 rounded-xl text-white active:bg-white/5 touch-manipulation"
            >
              <Archive className="h-5 w-5 text-orange-400" />
              <span className="text-sm font-medium">Archive Project</span>
            </button>
            <button
              onClick={() => {
                deleteProject(project.id);
                setMenuOpen(false);
                onBack();
              }}
              className="w-full flex items-center gap-3 px-4 h-12 rounded-xl text-white active:bg-red-500/10 touch-manipulation"
            >
              <Trash2 className="h-5 w-5 text-red-400" />
              <span className="text-sm font-medium text-red-400">Delete Project</span>
            </button>
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>

      {/* Photo detail sheet */}
      <PhotoDetailSheet
        open={detailOpen}
        onOpenChange={setDetailOpen}
        photo={detailPhoto}
        photos={photos}
        onNavigate={(photo) => setDetailPhoto(photo)}
        onDeleted={() => {
          setDetailOpen(false);
          setDetailPhoto(null);
          loadPhotos();
        }}
      />
    </>
  );
}
