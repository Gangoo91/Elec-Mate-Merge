import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  Grid3X3,
  ChevronDown,
  CheckSquare,
  ArrowLeftRight,
  ArrowUpDown,
  MoreVertical,
  Folder,
  Play,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import {
  useSafetyPhotos,
  SafetyPhoto,
  PHOTO_CATEGORIES,
  getCategoryColor,
  getCategoryLabel,
  getCategoryIcon,
  PhotoFilters,
} from '@/hooks/useSafetyPhotos';
import PhotoDetailSheet from './PhotoDetailSheet';
import GalleryStats from './GalleryStats';
import BatchSelectBar from './BatchSelectBar';
import BeforeAfterCompare from './BeforeAfterCompare';
import { toast } from '@/hooks/use-toast';
import { usePhotoProjects } from '@/hooks/usePhotoProjects';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { format } from 'date-fns';

type SortMode = 'newest' | 'oldest';
type GroupMode = 'project' | 'category' | 'date';

interface PhotoGroup {
  key: string;
  label: string;
  colour?: string;
  photos: SafetyPhoto[];
}

// Skeleton loader for photo grid
function PhotoGridSkeleton() {
  return (
    <div className="p-3 space-y-4">
      {Array.from({ length: 3 }).map((_, gi) => (
        <div key={gi}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-white/[0.06] animate-pulse" />
            <div className="w-24 h-4 rounded bg-white/[0.06] animate-pulse" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-white/[0.03] border border-white/[0.06] animate-pulse"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Large photo grid using CSS contentVisibility for performance */
function LargePhotoGrid({
  photos,
  selectedPhotos,
  batchMode,
  onPhotoClick,
}: {
  photos: SafetyPhoto[];
  selectedPhotos: Set<string>;
  batchMode: boolean;
  onPhotoClick: (photo: SafetyPhoto) => void;
}) {
  return (
    <div className="p-3">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {photos.map((photo) => {
          const isSelected = selectedPhotos.has(photo.id);
          const isVideo = photo.mime_type?.startsWith('video/');
          return (
            <div
              key={photo.id}
              style={{ contentVisibility: 'auto', containIntrinsicSize: '0 150px' }}
              className={`relative aspect-square rounded-lg overflow-hidden bg-[#1e1e1e] border cursor-pointer group ${
                isSelected ? 'border-elec-yellow ring-2 ring-elec-yellow/50' : 'border-white/10'
              }`}
              onClick={() => onPhotoClick(photo)}
            >
              <img
                src={photo.thumbnail_url || photo.file_url}
                alt={photo.description}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  </div>
                </div>
              )}
              {batchMode && (
                <div
                  className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-md flex items-center justify-center ${
                    isSelected ? 'bg-elec-yellow' : 'bg-black/50 border border-white/30'
                  }`}
                >
                  {isSelected && <span className="text-black text-[10px] font-bold">✓</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AllPhotosTab() {
  const [sortMode, setSortMode] = useState<SortMode>('newest');
  const [groupMode, setGroupMode] = useState<GroupMode>('project');
  const [filters, setFilters] = useState<PhotoFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  // Batch select
  const [batchMode, setBatchMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [showMoveSheet, setShowMoveSheet] = useState(false);
  const [moveProject, setMoveProject] = useState('');

  // Bulk assign unorganised
  const [showAssignAll, setShowAssignAll] = useState(false);

  // Before/after compare
  const [showCompare, setShowCompare] = useState(false);

  // Photo detail sheet
  const [detailPhoto, setDetailPhoto] = useState<SafetyPhoto | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Overflow menu
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);

  const { photos, isLoading, refetch, deletePhoto, isDeleting, updatePhoto, stats } =
    useSafetyPhotos(filters);
  const { projects: allProjects } = usePhotoProjects();

  // Collapsible groups — track closed ones (empty = all open)
  const [closedGroups, setClosedGroups] = useState<Set<string>>(new Set());

  // Reset open state when group mode changes
  useEffect(() => {
    setClosedGroups(new Set());
  }, [groupMode]);

  const toggleGroup = useCallback((key: string) => {
    setClosedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // Sort photos
  const sortedPhotos = useMemo(() => {
    const sorted = [...photos];
    if (sortMode === 'oldest') {
      sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }
    return sorted;
  }, [photos, sortMode]);

  // Group photos by category
  const categoryGroups = useMemo((): PhotoGroup[] => {
    return PHOTO_CATEGORIES.map((cat) => ({
      key: cat.value,
      label: cat.label,
      colour: cat.color,
      photos: sortedPhotos.filter((p) => p.category === cat.value),
    })).filter((g) => g.photos.length > 0);
  }, [sortedPhotos]);

  // Group photos by project
  const projectGroups = useMemo((): PhotoGroup[] => {
    const groupMap = new Map<string, { label: string; photos: SafetyPhoto[] }>();

    sortedPhotos.forEach((photo) => {
      let key: string;
      let label: string;

      if (photo.project_id) {
        key = photo.project_id;
        const proj = allProjects.find((p) => p.id === photo.project_id);
        label = proj?.name || photo.project_reference || 'Unknown Project';
      } else if (photo.project_reference) {
        key = `ref:${photo.project_reference}`;
        label = photo.project_reference;
      } else {
        key = 'unorganised';
        label = 'Unorganised';
      }

      const existing = groupMap.get(key);
      if (existing) {
        existing.photos.push(photo);
      } else {
        groupMap.set(key, { label, photos: [photo] });
      }
    });

    // Put "Unorganised" last
    const groups = Array.from(groupMap.entries()).map(([key, val]) => ({
      key,
      label: val.label,
      photos: val.photos,
    }));
    groups.sort((a, b) => {
      if (a.key === 'unorganised') return 1;
      if (b.key === 'unorganised') return -1;
      return 0;
    });
    return groups;
  }, [sortedPhotos, allProjects]);

  // Group photos by date
  const dateGroups = useMemo((): PhotoGroup[] => {
    const groupMap = new Map<string, SafetyPhoto[]>();

    sortedPhotos.forEach((photo) => {
      const date = format(new Date(photo.created_at), 'd MMM yyyy');
      const existing = groupMap.get(date);
      if (existing) {
        existing.push(photo);
      } else {
        groupMap.set(date, [photo]);
      }
    });

    return Array.from(groupMap.entries()).map(([date, photos]) => ({
      key: date,
      label: date,
      photos,
    }));
  }, [sortedPhotos]);

  // Active groups based on mode
  const activeGroups =
    groupMode === 'project' ? projectGroups : groupMode === 'date' ? dateGroups : categoryGroups;

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value || undefined }));
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      category: value === 'all' ? undefined : value,
    }));
  }, []);

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

  // Batch operations
  const handleBatchDelete = useCallback(() => {
    if (selectedPhotos.size === 0) return;
    const photosToDelete = photos.filter((p) => selectedPhotos.has(p.id));
    photosToDelete.forEach((p) => deletePhoto(p));
    setSelectedPhotos(new Set());
    setBatchMode(false);
    toast({ title: `${photosToDelete.length} photos deleted` });
  }, [selectedPhotos, photos, deletePhoto]);

  const handleBatchMove = useCallback(() => {
    if (!moveProject.trim() || selectedPhotos.size === 0) return;
    selectedPhotos.forEach((id) => {
      updatePhoto({ id, updates: { project_reference: moveProject.trim() } });
    });
    const count = selectedPhotos.size;
    setSelectedPhotos(new Set());
    setBatchMode(false);
    setShowMoveSheet(false);
    setMoveProject('');
    toast({ title: `Moved ${count} photos to ${moveProject.trim()}` });
  }, [selectedPhotos, moveProject, updatePhoto]);

  const handleSelectAll = useCallback(() => {
    setSelectedPhotos(new Set(sortedPhotos.map((p) => p.id)));
  }, [sortedPhotos]);

  // Bulk assign all unorganised photos to a project
  const handleAssignAllUnorganised = useCallback(
    (projectId: string) => {
      if (!projectId) return;
      const unorganisedGroup = projectGroups.find((g) => g.key === 'unorganised');
      if (!unorganisedGroup) return;

      const proj = allProjects.find((p) => p.id === projectId);
      unorganisedGroup.photos.forEach((photo) => {
        updatePhoto({
          id: photo.id,
          updates: {
            project_id: projectId,
            project_reference: proj?.name || null,
          },
        });
      });

      toast({
        title: `${unorganisedGroup.photos.length} photos assigned`,
        description: `Moved to ${proj?.name || 'project'}`,
      });
      setShowAssignAll(false);
    },
    [projectGroups, allProjects, updatePhoto]
  );

  // Empty state
  if (!isLoading && photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-background px-4">
        <div className="w-16 h-16 rounded-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center mb-3">
          <Grid3X3 className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-base font-semibold text-white mb-1">No photos yet</h3>
        <p className="text-xs text-white text-center max-w-[200px]">
          Take photos in the Camera tab to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Stats dashboard */}
      <GalleryStats
        total={stats.total}
        byCategory={stats.byCategory}
        totalBytes={stats.totalBytes}
      />

      {/* Toolbar */}
      <div className="sticky top-0 bg-background z-10 px-3 py-2 border-b border-white/10 space-y-2">
        {/* Search row */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            <Input
              placeholder="Search photos..."
              className="pl-9 pr-8 h-11 bg-[#1e1e1e] border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-xl"
              value={filters.search || ''}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {filters.search && (
              <button
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center active:bg-white/10 rounded-full touch-manipulation"
                onClick={() => handleSearch('')}
              >
                <X className="h-3.5 w-3.5 text-white" />
              </button>
            )}
          </div>

          {/* Overflow menu button */}
          <button
            onClick={() => setShowOverflowMenu(true)}
            className="h-11 w-11 flex items-center justify-center rounded-xl bg-[#1e1e1e] border border-white/10 text-white touch-manipulation active:bg-white/10 flex-shrink-0"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        {/* Category filter chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`flex-shrink-0 h-8 px-3 rounded-full text-xs font-medium transition-colors touch-manipulation ${
              !filters.category
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-white'
                : 'bg-white/5 border border-white/10 text-white active:bg-white/10'
            }`}
          >
            All
          </button>
          {PHOTO_CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                handleCategoryChange(filters.category === cat.value ? 'all' : cat.value)
              }
              className={`flex-shrink-0 flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium transition-colors touch-manipulation ${
                filters.category === cat.value
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-white'
                  : 'bg-white/5 border border-white/10 text-white active:bg-white/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${cat.color}`} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active sort/group/batch indicators */}
        {(sortMode !== 'newest' || groupMode !== 'project' || batchMode) && (
          <div className="flex items-center gap-2 flex-wrap">
            {groupMode !== 'project' && (
              <Badge
                className="bg-white/5 text-white border-white/10 text-[10px] h-6 px-2 cursor-pointer"
                onClick={() => setGroupMode('project')}
              >
                Group: {groupMode} <X className="h-2.5 w-2.5 ml-1" />
              </Badge>
            )}
            {sortMode !== 'newest' && (
              <Badge
                className="bg-white/5 text-white border-white/10 text-[10px] h-6 px-2 cursor-pointer"
                onClick={() => setSortMode('newest')}
              >
                Sort: {sortMode} <X className="h-2.5 w-2.5 ml-1" />
              </Badge>
            )}
            {batchMode && (
              <Badge
                className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 text-[10px] h-6 px-2 cursor-pointer"
                onClick={() => {
                  setBatchMode(false);
                  setSelectedPhotos(new Set());
                }}
              >
                Batch mode <X className="h-2.5 w-2.5 ml-1" />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Content — grouped by category */}
      <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
        <div className="flex-1 momentum-scroll-y scrollbar-hide pb-20">
          {isLoading && photos.length === 0 ? (
            <PhotoGridSkeleton />
          ) : filters.category ? (
            /* Filtered view — flat grid for a single category */
            sortedPhotos.length > 100 ? (
              /* CSS contentVisibility for large collections */
              <LargePhotoGrid
                photos={sortedPhotos}
                selectedPhotos={selectedPhotos}
                batchMode={batchMode}
                onPhotoClick={handlePhotoClick}
              />
            ) : (
              <div className="p-3">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {sortedPhotos.map((photo, index) => {
                    const isSelected = selectedPhotos.has(photo.id);
                    const isVideo = photo.mime_type?.startsWith('video/');
                    return (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: Math.min(index * 0.02, 0.3) }}
                        className={`relative aspect-square rounded-lg overflow-hidden bg-[#1e1e1e] border cursor-pointer group ${
                          isSelected
                            ? 'border-elec-yellow ring-2 ring-elec-yellow/50'
                            : 'border-white/10'
                        }`}
                        onClick={() => handlePhotoClick(photo)}
                      >
                        <img
                          src={photo.thumbnail_url || photo.file_url}
                          alt={photo.description}
                          className="w-full h-full object-cover transition-transform duration-150 group-active:scale-[0.98]"
                          loading="lazy"
                        />
                        {isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                              <Play className="h-5 w-5 text-white ml-0.5" />
                            </div>
                          </div>
                        )}
                        {batchMode && (
                          <div
                            className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-md flex items-center justify-center ${
                              isSelected ? 'bg-elec-yellow' : 'bg-black/50 border border-white/30'
                            }`}
                          >
                            {isSelected && (
                              <span className="text-black text-[10px] font-bold">✓</span>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )
          ) : (
            /* Grouped view — collapsible sections */
            <div className="p-3 space-y-3">
              {activeGroups.map((group) => (
                <Collapsible
                  key={group.key}
                  open={!closedGroups.has(group.key)}
                  onOpenChange={() => toggleGroup(group.key)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center gap-2.5 py-2 touch-manipulation">
                      {group.colour ? (
                        <span className={`w-3 h-3 rounded-full ${group.colour}`} />
                      ) : groupMode === 'project' ? (
                        <Folder className="h-3.5 w-3.5 text-elec-yellow" />
                      ) : (
                        <CalendarIcon className="h-3.5 w-3.5 text-white" />
                      )}
                      <span className="text-sm font-semibold text-white flex-1 text-left">
                        {group.label}
                      </span>
                      {/* Assign All button for unorganised group */}
                      {groupMode === 'project' &&
                        group.key === 'unorganised' &&
                        allProjects.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowAssignAll(true);
                            }}
                            className="text-[10px] font-semibold text-elec-yellow bg-elec-yellow/10 px-2.5 py-1 rounded-full touch-manipulation active:bg-elec-yellow/20 mr-1"
                          >
                            Assign All
                          </button>
                        )}
                      <span className="text-xs text-white mr-1">{group.photos.length}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-white transition-transform ${
                          !closedGroups.has(group.key) ? 'rotate-0' : '-rotate-90'
                        }`}
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-1">
                      {group.photos.map((photo, index) => {
                        const isSelected = selectedPhotos.has(photo.id);
                        const isVideo = photo.mime_type?.startsWith('video/');
                        return (
                          <motion.div
                            key={photo.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: Math.min(index * 0.02, 0.3),
                            }}
                            style={{ contentVisibility: 'auto', containIntrinsicSize: '0 150px' }}
                            className={`relative aspect-square rounded-lg overflow-hidden bg-[#1e1e1e] border cursor-pointer group ${
                              isSelected
                                ? 'border-elec-yellow ring-2 ring-elec-yellow/50'
                                : 'border-white/10'
                            }`}
                            onClick={() => handlePhotoClick(photo)}
                          >
                            <img
                              src={photo.thumbnail_url || photo.file_url}
                              alt={photo.description}
                              className="w-full h-full object-cover transition-transform duration-150 group-active:scale-[0.98]"
                              loading="lazy"
                            />
                            {isVideo && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                                  <Play className="h-5 w-5 text-white ml-0.5" />
                                </div>
                              </div>
                            )}
                            {batchMode && (
                              <div
                                className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-md flex items-center justify-center ${
                                  isSelected
                                    ? 'bg-elec-yellow'
                                    : 'bg-black/50 border border-white/30'
                                }`}
                              >
                                {isSelected && (
                                  <span className="text-black text-[10px] font-bold">✓</span>
                                )}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          )}
        </div>
      </PullToRefresh>

      {/* Batch select bar */}
      <AnimatePresence>
        {batchMode && selectedPhotos.size > 0 && (
          <BatchSelectBar
            selectedPhotos={selectedPhotos}
            totalPhotos={sortedPhotos.length}
            onSelectAll={handleSelectAll}
            onClearSelection={() => {
              setSelectedPhotos(new Set());
              setBatchMode(false);
            }}
            onDelete={handleBatchDelete}
            onMoveToProject={() => setShowMoveSheet(true)}
            onExport={() =>
              toast({
                title: 'Export selected',
                description: 'Open a project to export photos',
              })
            }
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>

      {/* Overflow menu */}
      <Sheet open={showOverflowMenu} onOpenChange={setShowOverflowMenu}>
        <SheetContent
          side="bottom"
          className="h-auto rounded-t-2xl p-0 bg-background border-white/10"
        >
          <div className="pt-3 px-4">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
          </div>
          <div className="px-2 pb-4 space-y-1">
            {/* Sort options */}
            <p className="px-4 pt-1 pb-2 text-[10px] font-medium text-white uppercase tracking-wider">
              Sort by
            </p>
            {(['newest', 'oldest'] as SortMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setSortMode(mode);
                  setShowOverflowMenu(false);
                }}
                className={`w-full flex items-center gap-3 px-4 h-12 rounded-xl touch-manipulation transition-colors ${
                  sortMode === mode
                    ? 'bg-elec-yellow/10 text-elec-yellow'
                    : 'text-white active:bg-white/5'
                }`}
              >
                <ArrowUpDown className="h-4 w-4" />
                <span className="text-sm font-medium capitalize">{mode}</span>
                {sortMode === mode && (
                  <span className="ml-auto text-xs text-elec-yellow">Active</span>
                )}
              </button>
            ))}

            <div className="h-px bg-white/10 mx-4 my-2" />

            {/* Group by */}
            <p className="px-4 pt-1 pb-2 text-[10px] font-medium text-white uppercase tracking-wider">
              Group by
            </p>
            {(['project', 'category', 'date'] as GroupMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setGroupMode(mode);
                  setShowOverflowMenu(false);
                }}
                className={`w-full flex items-center gap-3 px-4 h-12 rounded-xl touch-manipulation transition-colors ${
                  groupMode === mode
                    ? 'bg-elec-yellow/10 text-elec-yellow'
                    : 'text-white active:bg-white/5'
                }`}
              >
                {mode === 'project' ? (
                  <Folder className="h-4 w-4" />
                ) : mode === 'date' ? (
                  <CalendarIcon className="h-4 w-4" />
                ) : (
                  <Grid3X3 className="h-4 w-4" />
                )}
                <span className="text-sm font-medium capitalize">{mode}</span>
                {groupMode === mode && (
                  <span className="ml-auto text-xs text-elec-yellow">Active</span>
                )}
              </button>
            ))}

            <div className="h-px bg-white/10 mx-4 my-2" />

            {/* Filter */}
            <button
              onClick={() => {
                setShowOverflowMenu(false);
                setShowFilters(true);
              }}
              className="w-full flex items-center gap-3 px-4 h-12 rounded-xl text-white active:bg-white/5 touch-manipulation"
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by category</span>
              {filters.category && (
                <span className="ml-auto text-xs text-elec-yellow">
                  {getCategoryLabel(filters.category)}
                </span>
              )}
            </button>

            {/* Batch select */}
            <button
              onClick={() => {
                setBatchMode(!batchMode);
                setSelectedPhotos(new Set());
                setShowOverflowMenu(false);
              }}
              className={`w-full flex items-center gap-3 px-4 h-12 rounded-xl touch-manipulation ${
                batchMode ? 'bg-elec-yellow/10 text-elec-yellow' : 'text-white active:bg-white/5'
              }`}
            >
              <CheckSquare className="h-4 w-4" />
              <span className="text-sm font-medium">Batch select</span>
              {batchMode && <span className="ml-auto text-xs text-elec-yellow">On</span>}
            </button>

            {/* Compare */}
            {photos.length >= 2 && (
              <button
                onClick={() => {
                  setShowOverflowMenu(false);
                  setShowCompare(true);
                }}
                className="w-full flex items-center gap-3 px-4 h-12 rounded-xl text-white active:bg-white/5 touch-manipulation"
              >
                <ArrowLeftRight className="h-4 w-4" />
                <span className="text-sm font-medium">Compare (before/after)</span>
              </button>
            )}
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>

      {/* Filter sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent
          side="bottom"
          className="h-auto rounded-t-2xl p-0 bg-background border-white/10"
        >
          <div className="p-4">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="text-base font-semibold text-white mb-4">Filter Photos</h3>
            <div className="grid grid-cols-4 gap-2">
              {PHOTO_CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat.value}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all touch-manipulation ${
                    filters.category === cat.value
                      ? 'bg-elec-yellow/20 ring-1 ring-elec-yellow'
                      : 'bg-[#1e1e1e] border border-white/10 active:bg-[#252525]'
                  }`}
                  onClick={() => {
                    handleCategoryChange(filters.category === cat.value ? 'all' : cat.value);
                    setShowFilters(false);
                  }}
                >
                  <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span className="text-[10px] text-white text-center leading-tight">
                    {cat.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
            {(filters.category || filters.search) && (
              <button
                onClick={() => {
                  setFilters({});
                  setShowFilters(false);
                }}
                className="w-full h-11 mt-4 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
              >
                Clear Filters
              </button>
            )}
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>

      {/* Move to project sheet */}
      <Sheet open={showMoveSheet} onOpenChange={setShowMoveSheet}>
        <SheetContent
          side="bottom"
          className="h-auto rounded-t-2xl p-0 bg-background border-white/10"
        >
          <div className="p-4">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="text-base font-semibold text-white mb-3">
              Move {selectedPhotos.size} Photos
            </h3>
            <Input
              placeholder="Project name or reference..."
              value={moveProject}
              onChange={(e) => setMoveProject(e.target.value)}
              autoFocus
              className="h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-elec-yellow/50 text-sm touch-manipulation mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowMoveSheet(false)}
                className="flex-1 h-11 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
              >
                Cancel
              </button>
              <button
                onClick={handleBatchMove}
                disabled={!moveProject.trim()}
                className="flex-1 h-11 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:bg-yellow-400 disabled:opacity-50"
              >
                Move
              </button>
            </div>
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>

      {/* Assign all unorganised to project sheet */}
      <Sheet open={showAssignAll} onOpenChange={setShowAssignAll}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[70vh] rounded-t-2xl p-0 bg-background border-white/10"
        >
          <div className="p-4">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="text-base font-semibold text-white mb-1">
              Assign All Unorganised Photos
            </h3>
            <p className="text-xs text-white mb-4">
              Choose a project to move{' '}
              {projectGroups.find((g) => g.key === 'unorganised')?.photos.length || 0} photos into
            </p>
            <div className="space-y-1.5 overflow-y-auto max-h-[40vh] scrollbar-hide">
              {allProjects
                .filter((p) => p.status === 'active')
                .map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleAssignAllUnorganised(project.id)}
                    className="w-full flex items-center gap-3 px-4 h-14 rounded-xl bg-white/5 border border-transparent text-left touch-manipulation active:bg-white/10 active:scale-[0.98] transition-all"
                  >
                    <Folder className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-white truncate">
                        {project.name}
                      </span>
                      {project.job_reference && (
                        <span className="text-[10px] text-white truncate">
                          {project.job_reference}
                        </span>
                      )}
                    </div>
                    <span className="ml-auto text-xs text-white flex-shrink-0">
                      {project.photo_count || 0} photos
                    </span>
                  </button>
                ))}
              {allProjects.filter((p) => p.status === 'active').length === 0 && (
                <p className="text-sm text-white text-center py-6">
                  No active projects. Create a project first.
                </p>
              )}
            </div>
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>

      {/* Before/After Compare */}
      <AnimatePresence>
        {showCompare && (
          <BeforeAfterCompare photos={sortedPhotos} onClose={() => setShowCompare(false)} />
        )}
      </AnimatePresence>

      {/* Photo detail sheet */}
      <PhotoDetailSheet
        open={detailOpen}
        onOpenChange={setDetailOpen}
        photo={detailPhoto}
        photos={sortedPhotos}
        onNavigate={(photo) => setDetailPhoto(photo)}
        onDeleted={() => {
          setDetailOpen(false);
          setDetailPhoto(null);
          refetch();
        }}
      />
    </div>
  );
}
