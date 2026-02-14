import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Camera,
  Share2,
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
} from 'lucide-react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  PhotoProject,
  usePhotoProjects,
  PHOTO_TYPES,
  getPhotoTypeColour,
} from '@/hooks/usePhotoProjects';
import { SafetyPhoto } from '@/hooks/useSafetyPhotos';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import CameraTab from './CameraTab';
import PhotoViewer from './PhotoViewer';
import PhotoDetailSheet from './PhotoDetailSheet';
import { usePhotoAI, ProjectSummary } from '@/hooks/usePhotoAI';

interface ProjectDetailViewProps {
  project: PhotoProject;
  onBack: () => void;
  onShare: (project: PhotoProject, photos: SafetyPhoto[]) => void;
  onPhotoDetail?: (photo: SafetyPhoto, photos: SafetyPhoto[]) => void;
}

type ViewMode = 'grid' | 'timeline';

export default function ProjectDetailView({
  project,
  onBack,
  onShare,
  onPhotoDetail,
}: ProjectDetailViewProps) {
  const { getProjectWithPhotos, updateProject, archiveProject, deleteProject } = usePhotoProjects();

  const [photos, setPhotos] = useState<SafetyPhoto[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SafetyPhoto | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [batchMode, setBatchMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [detailPhoto, setDetailPhoto] = useState<SafetyPhoto | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState<ProjectSummary | null>(null);
  const { summariseProject, isSummarising } = usePhotoAI();

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

  // Filter photos by type
  const filteredPhotos = useMemo(() => {
    if (selectedType === 'all') return photos;
    return photos.filter((p) => (p.photo_type || 'general') === selectedType);
  }, [photos, selectedType]);

  // Type counts
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: photos.length };
    photos.forEach((p) => {
      const type = p.photo_type || 'general';
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  }, [photos]);

  // Timeline grouping
  const timelineGroups = useMemo(() => {
    if (viewMode !== 'timeline') return [];

    const groups = new Map<
      string,
      { date: Date; label: string; entries: Map<string, SafetyPhoto[]> }
    >();

    filteredPhotos.forEach((photo) => {
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
      if (!group.entries.has(type)) {
        group.entries.set(type, []);
      }
      group.entries.get(type)!.push(photo);
    });

    return Array.from(groups.values()).sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [filteredPhotos, viewMode]);

  const handleRefresh = useCallback(async () => {
    await loadPhotos();
  }, [loadPhotos]);

  const handlePhotoClick = useCallback(
    (photo: SafetyPhoto, index: number) => {
      if (batchMode) {
        setSelectedPhotos((prev) => {
          const next = new Set(prev);
          if (next.has(photo.id)) {
            next.delete(photo.id);
          } else {
            next.add(photo.id);
          }
          return next;
        });
        return;
      }

      if (onPhotoDetail) {
        onPhotoDetail(photo, filteredPhotos);
      } else {
        setDetailPhoto(photo);
        setDetailOpen(true);
      }
    },
    [batchMode, onPhotoDetail, filteredPhotos]
  );

  const handleLongPress = useCallback((photo: SafetyPhoto) => {
    setBatchMode(true);
    setSelectedPhotos(new Set([photo.id]));
  }, []);

  const handleCloseViewer = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      const newIndex =
        direction === 'prev'
          ? Math.max(0, selectedIndex - 1)
          : Math.min(filteredPhotos.length - 1, selectedIndex + 1);
      setSelectedIndex(newIndex);
      setSelectedPhoto(filteredPhotos[newIndex]);
    },
    [selectedIndex, filteredPhotos]
  );

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

  const statusBadgeColour =
    project.status === 'active'
      ? 'bg-green-500/20 text-green-400'
      : project.status === 'completed'
        ? 'bg-blue-500/20 text-blue-400'
        : 'bg-white/10 text-white';

  return (
    <>
      <div className="flex flex-col h-full bg-elec-dark relative">
        {/* Header */}
        <div className="flex-shrink-0 bg-elec-dark z-10 px-3 py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-2 -ml-1 rounded-lg active:bg-white/5 transition-colors touch-manipulation"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-white truncate">{project.name}</h2>
              <div className="flex items-center gap-2 text-xs text-white">
                {project.customer_name && <span>{project.customer_name}</span>}
                {project.customer_name && project.address && <span>·</span>}
                {project.address && <span>{project.address}</span>}
              </div>
            </div>

            {/* View toggle */}
            <button
              onClick={() => setViewMode((v) => (v === 'grid' ? 'timeline' : 'grid'))}
              className="p-2 rounded-lg bg-white/5 border border-white/10 touch-manipulation active:bg-white/10"
            >
              {viewMode === 'grid' ? (
                <Calendar className="h-4 w-4 text-white" />
              ) : (
                <Grid3X3 className="h-4 w-4 text-white" />
              )}
            </button>

            {/* Menu */}
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-lg active:bg-white/5 touch-manipulation"
            >
              <MoreVertical className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Job ref + status */}
          {(project.job_reference || project.status) && (
            <div className="flex items-center gap-2 mt-1 ml-9">
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
            </div>
          )}
        </div>

        {/* Photo type filter pills */}
        <div className="flex-shrink-0 px-3 py-2 border-b border-white/[0.06]">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {/* All pill */}
            <button
              onClick={() => setSelectedType('all')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors touch-manipulation ${
                selectedType === 'all'
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-white'
                  : 'bg-white/5 border border-white/10 text-white active:bg-white/10'
              }`}
            >
              All ({typeCounts.all || 0})
            </button>

            {PHOTO_TYPES.map((type) => {
              const count = typeCounts[type.value] || 0;
              if (count === 0 && selectedType !== type.value) return null;
              const isActive = selectedType === type.value;
              return (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors touch-manipulation ${
                    isActive
                      ? `${type.colour}/20 border border-current text-white`
                      : 'bg-white/5 border border-white/10 text-white active:bg-white/10'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${type.dotColour}`} />
                  {type.label} ({count})
                </button>
              );
            })}
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
              className="px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white touch-manipulation"
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

            {/* Generate Summary button (show when photos exist, no summary yet) */}
            {!aiSummary && photos.length >= 2 && !isLoadingPhotos && (
              <button
                onClick={async () => {
                  const result = await summariseProject(project.id);
                  if (result) setAiSummary(result);
                }}
                disabled={isSummarising}
                className="mb-3 w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 touch-manipulation active:scale-[0.98] disabled:opacity-50"
              >
                {isSummarising ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating summary...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate AI Summary
                  </>
                )}
              </button>
            )}

            {isLoadingPhotos ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            ) : filteredPhotos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-white">
                  {selectedType === 'all' ? 'No photos yet' : 'No photos of this type'}
                </p>
                <button
                  onClick={() => setCameraOpen(true)}
                  className="mt-3 px-4 py-2 rounded-lg bg-elec-yellow text-black text-sm font-medium touch-manipulation"
                >
                  Add Photos
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid view */
              <div className="grid grid-cols-3 gap-2">
                {filteredPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className={`relative aspect-square rounded-lg overflow-hidden bg-[#1e1e1e] border cursor-pointer group ${
                      batchMode && selectedPhotos.has(photo.id)
                        ? 'border-elec-yellow ring-2 ring-elec-yellow/50'
                        : 'border-white/10'
                    }`}
                    onClick={() => handlePhotoClick(photo, index)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleLongPress(photo);
                    }}
                  >
                    <img
                      src={photo.file_url}
                      alt={photo.description}
                      className="w-full h-full object-cover transition-transform duration-150 group-active:scale-[0.98]"
                      loading="lazy"
                    />
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
                        {selectedPhotos.has(photo.id) && <Check className="h-3 w-3 text-black" />}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Timeline view */
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-white/10" />

                {timelineGroups.map((group, gi) => (
                  <div key={group.label} className="mb-6">
                    {/* Date header */}
                    <div className="flex items-center gap-3 mb-3 ml-4">
                      <div className="text-sm font-semibold text-white">{group.label}</div>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {Array.from(group.entries.entries()).map(([type, typePhotos]) => (
                      <div key={type} className="relative mb-4 ml-0">
                        {/* Timeline dot */}
                        <div
                          className={`absolute left-0 top-1 w-3 h-3 rounded-full ${getPhotoTypeColour(type)} ring-2 ring-elec-dark z-10`}
                        />

                        <div className="ml-6">
                          {/* Type badge */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`w-2 h-2 rounded-full ${getPhotoTypeColour(type)}`} />
                            <span className="text-xs font-medium text-white capitalize">
                              {PHOTO_TYPES.find((t) => t.value === type)?.label || type}
                            </span>
                          </div>

                          {/* Photo strip */}
                          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                            {typePhotos.map((photo, pi) => (
                              <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: gi * 0.05 + pi * 0.02,
                                }}
                                className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-[#1e1e1e] border border-white/10 cursor-pointer"
                                onClick={() =>
                                  handlePhotoClick(photo, filteredPhotos.indexOf(photo))
                                }
                              >
                                <img
                                  src={photo.file_url}
                                  alt={photo.description}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </motion.div>
                            ))}
                          </div>

                          {/* Notes from first photo */}
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
        <div className="absolute bottom-0 left-0 right-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] p-3 flex gap-2">
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

      {/* Menu Sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="bottom"
          className="h-auto p-0 rounded-t-2xl overflow-hidden bg-elec-dark border-white/10"
        >
          <div className="pt-3 px-4">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
          </div>
          <div className="px-2 pb-4 space-y-1">
            {project.status !== 'completed' && (
              <button
                onClick={() => handleStatusChange('completed')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white active:bg-white/5 touch-manipulation"
              >
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">Mark as Completed</span>
              </button>
            )}
            {project.status === 'completed' && (
              <button
                onClick={() => handleStatusChange('active')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white active:bg-white/5 touch-manipulation"
              >
                <Edit3 className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">Reopen Project</span>
              </button>
            )}
            <button
              onClick={() => handleStatusChange('archived')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white active:bg-white/5 touch-manipulation"
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white active:bg-red-500/10 touch-manipulation"
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
        photos={filteredPhotos}
        onNavigate={(photo) => setDetailPhoto(photo)}
        onDeleted={() => {
          setDetailOpen(false);
          setDetailPhoto(null);
          loadPhotos();
        }}
      />

      {/* Photo viewer */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoViewer
            photo={selectedPhoto}
            photos={filteredPhotos}
            currentIndex={selectedIndex}
            onClose={handleCloseViewer}
            onNavigate={handleNavigate}
            onDelete={() => {
              setSelectedPhoto(null);
              loadPhotos();
            }}
            onEdit={() => loadPhotos()}
            isDeleting={false}
          />
        )}
      </AnimatePresence>
    </>
  );
}
