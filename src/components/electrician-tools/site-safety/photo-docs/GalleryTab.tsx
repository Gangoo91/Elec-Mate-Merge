import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  X,
  MapPin,
  Folder,
  FolderOpen,
  ChevronRight,
  Image as ImageIcon,
  Calendar,
  ArrowUpDown,
  CheckSquare,
  Square,
  ArrowLeftRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { formatDistanceToNow, format } from 'date-fns';
import PhotoViewer from './PhotoViewer';
import GalleryStats from './GalleryStats';
import BatchSelectBar from './BatchSelectBar';
import BeforeAfterCompare from './BeforeAfterCompare';
import { toast } from '@/hooks/use-toast';

interface GalleryTabProps {
  onPhotoSelect?: (photo: SafetyPhoto) => void;
}

type ViewMode = 'projects' | 'grid' | 'list';
type SortMode = 'newest' | 'oldest' | 'category' | 'project';

interface ProjectGroup {
  name: string;
  photos: SafetyPhoto[];
  lastUpdated: Date;
  categories: string[];
}

export default function GalleryTab({ onPhotoSelect }: GalleryTabProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('projects');
  const [sortMode, setSortMode] = useState<SortMode>('newest');
  const [filters, setFilters] = useState<PhotoFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SafetyPhoto | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Batch select
  const [batchMode, setBatchMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [showMoveSheet, setShowMoveSheet] = useState(false);
  const [moveProject, setMoveProject] = useState('');

  // Before/after compare
  const [showCompare, setShowCompare] = useState(false);

  const { photos, isLoading, refetch, deletePhoto, isDeleting, updatePhoto, stats } =
    useSafetyPhotos(filters);

  // Sort photos
  const sortedPhotos = useMemo(() => {
    const sorted = [...photos];
    switch (sortMode) {
      case 'oldest':
        sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'category':
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'project':
        sorted.sort((a, b) =>
          (a.project_reference || 'zzz').localeCompare(b.project_reference || 'zzz')
        );
        break;
      default: // newest
        break;
    }
    return sorted;
  }, [photos, sortMode]);

  // Group photos by project
  const projectGroups = useMemo(() => {
    const groups: Record<string, ProjectGroup> = {};
    sortedPhotos.forEach((photo) => {
      const projectName = photo.project_reference || '__unorganised__';
      if (!groups[projectName]) {
        groups[projectName] = {
          name: projectName,
          photos: [],
          lastUpdated: new Date(photo.created_at),
          categories: [],
        };
      }
      groups[projectName].photos.push(photo);
      if (!groups[projectName].categories.includes(photo.category)) {
        groups[projectName].categories.push(photo.category);
      }
      const photoDate = new Date(photo.created_at);
      if (photoDate > groups[projectName].lastUpdated) {
        groups[projectName].lastUpdated = photoDate;
      }
    });
    return Object.values(groups).sort((a, b) => {
      if (a.name === '__unorganised__') return 1;
      if (b.name === '__unorganised__') return -1;
      return b.lastUpdated.getTime() - a.lastUpdated.getTime();
    });
  }, [sortedPhotos]);

  const displayPhotos = useMemo(() => {
    if (expandedProject) {
      return sortedPhotos.filter((p) =>
        expandedProject === '__unorganised__'
          ? !p.project_reference
          : p.project_reference === expandedProject
      );
    }
    return sortedPhotos;
  }, [sortedPhotos, expandedProject]);

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);
  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value || undefined }));
  }, []);
  const handleCategoryChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, category: value === 'all' ? undefined : value }));
  }, []);

  const handlePhotoClick = useCallback(
    (photo: SafetyPhoto, index: number, projectPhotos?: SafetyPhoto[]) => {
      if (batchMode) {
        setSelectedPhotos((prev) => {
          const next = new Set(prev);
          if (next.has(photo.id)) next.delete(photo.id);
          else next.add(photo.id);
          return next;
        });
        return;
      }
      const photoList = projectPhotos || displayPhotos;
      const actualIndex = projectPhotos ? index : photoList.findIndex((p) => p.id === photo.id);
      setSelectedIndex(actualIndex);
      setSelectedPhoto(photo);
    },
    [displayPhotos, batchMode]
  );

  const handleCloseViewer = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      const photoList = expandedProject ? displayPhotos : sortedPhotos;
      const newIndex =
        direction === 'prev'
          ? Math.max(0, selectedIndex - 1)
          : Math.min(photoList.length - 1, selectedIndex + 1);
      setSelectedIndex(newIndex);
      setSelectedPhoto(photoList[newIndex]);
    },
    [selectedIndex, displayPhotos, sortedPhotos, expandedProject]
  );

  const handleDelete = useCallback(
    (photo: SafetyPhoto) => {
      deletePhoto(photo);
      setSelectedPhoto(null);
    },
    [deletePhoto]
  );

  const handleEdit = useCallback(
    (photo: SafetyPhoto, updates: Partial<SafetyPhoto>) => {
      updatePhoto({ id: photo.id, updates });
      setSelectedPhoto((prev) => (prev ? { ...prev, ...updates } : null));
    },
    [updatePhoto]
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
    setSelectedPhotos(new Set());
    setBatchMode(false);
    setShowMoveSheet(false);
    setMoveProject('');
    toast({ title: `Moved ${selectedPhotos.size} photos to ${moveProject.trim()}` });
  }, [selectedPhotos, moveProject, updatePhoto]);

  const handleSelectAll = useCallback(() => {
    setSelectedPhotos(new Set(displayPhotos.map((p) => p.id)));
  }, [displayPhotos]);

  // Photo rendering helper
  const renderPhotoTile = (photo: SafetyPhoto, index: number, photoList?: SafetyPhoto[]) => {
    const isSelected = selectedPhotos.has(photo.id);
    return (
      <motion.div
        key={photo.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: Math.min(index * 0.02, 0.3) }}
        className={`relative aspect-square rounded-lg overflow-hidden bg-[#1e1e1e] border cursor-pointer group ${
          isSelected ? 'border-elec-yellow ring-2 ring-elec-yellow/50' : 'border-white/10'
        }`}
        onClick={() => handlePhotoClick(photo, index, photoList)}
      >
        <img
          src={photo.file_url}
          alt={photo.description}
          className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-105 group-active:scale-[0.98]"
          loading="lazy"
        />
        <div
          className={`absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full ${getCategoryColor(photo.category)} ring-2 ring-black/50`}
        />
        {batchMode && (
          <div
            className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-md flex items-center justify-center ${isSelected ? 'bg-elec-yellow' : 'bg-black/50 border border-white/30'}`}
          >
            {isSelected && <span className="text-black text-[10px] font-bold">✓</span>}
          </div>
        )}
        {!batchMode && photo.project_reference && viewMode === 'grid' && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
            <span className="text-[9px] text-white flex items-center gap-1">
              <Folder className="h-2.5 w-2.5" />
              {photo.project_reference}
            </span>
          </div>
        )}
      </motion.div>
    );
  };

  // Empty state
  if (!isLoading && photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-elec-dark px-4">
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

  // Expanded project view
  if (expandedProject) {
    return (
      <div className="flex flex-col h-full bg-elec-dark">
        <div className="sticky top-0 bg-elec-dark z-10 px-3 py-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setExpandedProject(null);
                setBatchMode(false);
                setSelectedPhotos(new Set());
              }}
              className="p-2 -ml-1 rounded-lg hover:bg-white/5 transition-colors touch-manipulation"
            >
              <ChevronRight className="h-5 w-5 text-white rotate-180" />
            </button>
            <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
              <FolderOpen className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-white truncate">
                {expandedProject === '__unorganised__' ? 'Unorganised Photos' : expandedProject}
              </h2>
              <p className="text-xs text-white">{displayPhotos.length} photos</p>
            </div>
            <button
              onClick={() => {
                setBatchMode(!batchMode);
                setSelectedPhotos(new Set());
              }}
              className={`p-2 rounded-lg touch-manipulation ${batchMode ? 'bg-elec-yellow/20 text-elec-yellow' : 'text-white active:bg-white/5'}`}
            >
              <CheckSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
          <div className="flex-1 momentum-scroll-y scrollbar-hide p-3 pb-20">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {displayPhotos.map((photo, index) => renderPhotoTile(photo, index, displayPhotos))}
            </div>
          </div>
        </PullToRefresh>

        <AnimatePresence>
          {batchMode && selectedPhotos.size > 0 && (
            <BatchSelectBar
              selectedPhotos={selectedPhotos}
              totalPhotos={displayPhotos.length}
              onSelectAll={handleSelectAll}
              onClearSelection={() => {
                setSelectedPhotos(new Set());
                setBatchMode(false);
              }}
              onDelete={handleBatchDelete}
              onMoveToProject={() => setShowMoveSheet(true)}
              onExport={() =>
                toast({ title: 'Export selected', description: 'Switch to Export tab to export' })
              }
              isDeleting={isDeleting}
            />
          )}
        </AnimatePresence>

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

        {/* Move to project sheet */}
        <Sheet open={showMoveSheet} onOpenChange={setShowMoveSheet}>
          <SheetContent
            side="bottom"
            className="h-auto rounded-t-2xl p-0 bg-elec-dark border-white/10"
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
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-elec-dark">
      {/* Stats dashboard */}
      <GalleryStats total={stats.total} byCategory={stats.byCategory} />

      {/* Search bar */}
      <div className="sticky top-0 bg-elec-dark z-10 px-3 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            <Input
              placeholder="Search photos..."
              className="pl-9 pr-8 h-10 bg-[#1e1e1e] border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
              value={filters.search || ''}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {filters.search && (
              <button
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded-full"
                onClick={() => handleSearch('')}
              >
                <X className="h-3.5 w-3.5 text-white" />
              </button>
            )}
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-[#1e1e1e] border border-white/10 rounded-lg p-0.5">
            <button
              className={`p-2 rounded-md transition-colors touch-manipulation ${viewMode === 'projects' ? 'bg-elec-yellow text-black' : 'text-white hover:text-white'}`}
              onClick={() => setViewMode('projects')}
            >
              <Folder className="h-4 w-4" />
            </button>
            <button
              className={`p-2 rounded-md transition-colors touch-manipulation ${viewMode === 'grid' ? 'bg-elec-yellow text-black' : 'text-white hover:text-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              className={`p-2 rounded-md transition-colors touch-manipulation ${viewMode === 'list' ? 'bg-elec-yellow text-black' : 'text-white hover:text-white'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Sort */}
          <button
            className="p-2 rounded-lg bg-[#1e1e1e] border border-white/10 text-white hover:text-white touch-manipulation"
            onClick={() =>
              setSortMode((prev) => {
                const modes: SortMode[] = ['newest', 'oldest', 'category', 'project'];
                return modes[(modes.indexOf(prev) + 1) % modes.length];
              })
            }
            title={`Sort: ${sortMode}`}
          >
            <ArrowUpDown className="h-4 w-4" />
          </button>

          {/* Filter */}
          <button
            className="p-2 rounded-lg bg-[#1e1e1e] border border-white/10 text-white hover:text-white touch-manipulation"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4" />
          </button>

          {/* Batch select */}
          <button
            onClick={() => {
              setBatchMode(!batchMode);
              setSelectedPhotos(new Set());
            }}
            className={`p-2 rounded-lg border touch-manipulation ${batchMode ? 'bg-elec-yellow/20 border-elec-yellow/30 text-elec-yellow' : 'bg-[#1e1e1e] border-white/10 text-white'}`}
          >
            <CheckSquare className="h-4 w-4" />
          </button>
        </div>

        {/* Active chips */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {sortMode !== 'newest' && (
            <Badge
              className="bg-white/5 text-white border-white/10 text-[10px] h-6 px-2"
              onClick={() => setSortMode('newest')}
            >
              Sort: {sortMode} <X className="h-2.5 w-2.5 ml-1" />
            </Badge>
          )}
          {filters.category && (
            <Badge
              className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 cursor-pointer text-xs h-7 px-2.5"
              onClick={() => handleCategoryChange('all')}
            >
              {getCategoryIcon(filters.category)} {getCategoryLabel(filters.category)}
              <X className="h-3 w-3 ml-1.5" />
            </Badge>
          )}
          {/* Before/after compare shortcut */}
          {photos.length >= 2 && !batchMode && (
            <button
              onClick={() => setShowCompare(true)}
              className="flex items-center gap-1 h-6 px-2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-medium touch-manipulation active:bg-blue-500/20"
            >
              <ArrowLeftRight className="h-3 w-3" />
              Compare
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <PullToRefresh onRefresh={handleRefresh} isRefreshing={isLoading}>
        <div className="flex-1 momentum-scroll-y scrollbar-hide pb-20">
          {/* Projects View */}
          {viewMode === 'projects' && (
            <div className="p-3 space-y-4">
              {projectGroups.map((project, groupIndex) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIndex * 0.05 }}
                  className="bg-white/[0.03] rounded-2xl border border-white/[0.08] overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedProject(project.name)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-white/5 active:bg-white/[0.08] transition-colors touch-manipulation"
                  >
                    <div
                      className={`p-2.5 rounded-xl ${project.name === '__unorganised__' ? 'bg-white/[0.05] border border-dashed border-white/20' : 'bg-elec-yellow flex items-center justify-center'}`}
                    >
                      {project.name === '__unorganised__' ? (
                        <ImageIcon className="h-5 w-5 text-white" />
                      ) : (
                        <Folder className="h-5 w-5 text-black" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="text-[14px] font-semibold text-white truncate">
                        {project.name === '__unorganised__' ? 'Unorganised Photos' : project.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[12px] text-white">
                          {project.photos.length} photos
                        </span>
                        <span className="text-[12px] text-white">•</span>
                        <span className="text-[12px] text-white flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(project.lastUpdated, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mr-1">
                      {project.categories.slice(0, 4).map((cat) => (
                        <span
                          key={cat}
                          className={`w-2 h-2 rounded-full ${getCategoryColor(cat)}`}
                        />
                      ))}
                      {project.categories.length > 4 && (
                        <span className="text-[10px] text-white">
                          +{project.categories.length - 4}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 text-white flex-shrink-0" />
                  </button>
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
                          <div
                            className={`absolute top-1 left-1 w-2 h-2 rounded-full ${getCategoryColor(photo.category)} ring-1 ring-black/50`}
                          />
                        </div>
                      ))}
                      {project.photos.length > 8 && (
                        <button
                          onClick={() => setExpandedProject(project.name)}
                          className="aspect-square rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-colors touch-manipulation"
                        >
                          <span className="text-lg font-bold text-white">
                            +{project.photos.length - 8}
                          </span>
                          <span className="text-[10px] text-white">more</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="p-3">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {sortedPhotos.map((photo, index) => renderPhotoTile(photo, index))}
              </div>
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="p-3 space-y-2">
              {sortedPhotos.map((photo, index) => {
                const isSelected = selectedPhotos.has(photo.id);
                return (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min(index * 0.02, 0.3) }}
                    className={`flex items-center gap-3 p-3 bg-[#1e1e1e] rounded-xl border cursor-pointer hover:bg-[#252525] active:scale-[0.99] transition-all touch-manipulation ${
                      isSelected ? 'border-elec-yellow' : 'border-white/10'
                    }`}
                    onClick={() => handlePhotoClick(photo, index)}
                  >
                    {batchMode && (
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-elec-yellow' : 'border border-white/30'}`}
                      >
                        {isSelected && <span className="text-black text-[10px] font-bold">✓</span>}
                      </div>
                    )}
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
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${getCategoryColor(photo.category)}`}
                        />
                        <span className="text-[10px] text-white uppercase font-medium">
                          {getCategoryLabel(photo.category)}
                        </span>
                      </div>
                      <p className="text-sm text-white line-clamp-1 font-medium">
                        {photo.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        {photo.project_reference && (
                          <span className="flex items-center gap-1 text-xs text-white">
                            <Folder className="h-3 w-3" />
                            {photo.project_reference}
                          </span>
                        )}
                        {photo.location && (
                          <span className="flex items-center gap-1 text-xs text-white">
                            <MapPin className="h-3 w-3" />
                            {photo.location}
                          </span>
                        )}
                      </div>
                    </div>
                    {!batchMode && <ChevronRight className="h-5 w-5 text-white flex-shrink-0" />}
                  </motion.div>
                );
              })}
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
              toast({ title: 'Export selected', description: 'Switch to Export tab to export' })
            }
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>

      {/* Filter sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent
          side="bottom"
          className="h-auto rounded-t-2xl p-0 bg-elec-dark border-white/10"
        >
          <div className="p-4">
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="text-base font-semibold text-white mb-4">Filter Photos</h3>
            <label className="text-xs font-medium text-white uppercase tracking-wide">
              Category
            </label>
            <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
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
            <div className="grid grid-cols-4 gap-2 mt-4">
              {PHOTO_CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat.value}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all touch-manipulation ${
                    filters.category === cat.value
                      ? 'bg-elec-yellow/20 ring-1 ring-elec-yellow'
                      : 'bg-[#1e1e1e] border border-white/10 hover:bg-[#252525] active:bg-[#252525]'
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
                className="w-full h-11 mt-4 rounded-xl bg-white/10 text-sm font-medium text-white hover:bg-white/15 touch-manipulation active:bg-white/15"
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
          className="h-auto rounded-t-2xl p-0 bg-elec-dark border-white/10"
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

      {/* Before/After Compare */}
      <AnimatePresence>
        {showCompare && (
          <BeforeAfterCompare photos={sortedPhotos} onClose={() => setShowCompare(false)} />
        )}
      </AnimatePresence>

      {/* Photo viewer */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoViewer
            photo={selectedPhoto}
            photos={expandedProject ? displayPhotos : sortedPhotos}
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
  );
}
