import { useState, useCallback, useMemo } from 'react';
import { PhotoViewer } from '@/components/employer/PhotoViewer';
import { PhotoTimeline, type TimelinePhoto } from '@/components/employer/PhotoTimeline';
import { PhotoMapView, type MapPhoto } from '@/components/employer/PhotoMapView';
import { PhotoCompareSlider, type ComparePhoto } from '@/components/employer/PhotoCompareSlider';
import { PhotoFilterSheet } from '@/components/employer/PhotoFilterSheet';
import { UploadPhotoSheet } from '@/components/employer/dialogs/UploadPhotoSheet';
import {
  useJobPhotos,
  useTogglePhotoApproval,
  useTogglePhotoSharing,
  type PhotoCategory,
} from '@/hooks/useJobPhotos';
import { useJobs } from '@/hooks/useJobs';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { cn } from '@/lib/utils';
import { Camera, Check, Eye, RefreshCw, SlidersHorizontal } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  EmptyState,
  LoadingBlocks,
  IconButton,
  Pill,
  Dot,
  Avatar,
  GroupHeader,
  PrimaryButton,
  type Tone,
} from '@/components/employer/editorial';

const categoryTone: Record<PhotoCategory, Tone> = {
  Before: 'blue',
  During: 'amber',
  After: 'emerald',
  Completion: 'purple',
  Issue: 'red',
};

interface FilterState {
  categories: string[];
  jobs: string[];
  showApproved: boolean | null;
  showShared: boolean | null;
}

type ViewMode = 'grid' | 'timeline' | 'map' | 'compare';

export function PhotoGallerySection() {
  const isMobile = useIsMobile();
  const { data: photosData = [], isLoading, refetch } = useJobPhotos();
  const { data: jobs = [] } = useJobs();
  const toggleApproval = useTogglePhotoApproval();
  const toggleSharing = useTogglePhotoSharing();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    jobs: [],
    showApproved: null,
    showShared: null,
  });
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [compareOpen, setCompareOpen] = useState(false);
  const [comparePhotos, setComparePhotos] = useState<{
    before: ComparePhoto;
    after: ComparePhoto;
  } | null>(null);
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});

  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [uploadSheetOpen, setUploadSheetOpen] = useState(false);

  const photos = photosData;

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: 'Photos refreshed' });
  }, [refetch]);

  const uniqueJobs = useMemo(
    () =>
      Array.from(new Set(photos.map((p) => p.jobId)))
        .filter((jobId) => jobId)
        .map((jobId) => {
          const job = jobs.find((j) => j.id === jobId);
          return {
            value: jobId,
            label: job?.title || photos.find((p) => p.jobId === jobId)?.jobTitle || 'Unknown',
            count: photos.filter((p) => p.jobId === jobId).length,
          };
        }),
    [photos, jobs]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    photos.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesSearch =
        photo.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(photo.category);
      const matchesJob = filters.jobs.length === 0 || filters.jobs.includes(photo.jobId);
      const matchesApproved =
        filters.showApproved === null || photo.approved === filters.showApproved;
      const matchesShared =
        filters.showShared === null || photo.sharedWithClient === filters.showShared;

      return matchesSearch && matchesCategory && matchesJob && matchesApproved && matchesShared;
    });
  }, [photos, searchQuery, filters]);

  const timelinePhotos: TimelinePhoto[] = useMemo(
    () =>
      filteredPhotos.map((p) => ({
        id: p.id,
        jobId: p.jobId,
        jobTitle: p.jobTitle,
        uploadedBy: p.uploadedBy,
        uploadedByInitials: p.uploadedBy
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase(),
        category: p.category.toLowerCase() as TimelinePhoto['category'],
        timestamp: p.timestamp,
        location: p.location?.address,
        lat: p.location?.lat,
        lng: p.location?.lng,
        isApproved: p.approved,
        isShared: p.sharedWithClient,
        notes: p.notes,
        filename: p.filename,
      })),
    [filteredPhotos]
  );

  const mapPhotos: MapPhoto[] = useMemo(
    () =>
      filteredPhotos.map((p) => ({
        id: p.id,
        jobId: p.jobId,
        jobTitle: p.jobTitle,
        uploadedBy: p.uploadedBy,
        category: p.category.toLowerCase() as MapPhoto['category'],
        timestamp: p.timestamp,
        location: p.location?.address,
        lat: p.location?.lat,
        lng: p.location?.lng,
        isApproved: p.approved,
        isShared: p.sharedWithClient,
      })),
    [filteredPhotos]
  );

  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return {
      total: photos.length,
      thisWeek: photos.filter((p) => new Date(p.timestamp) >= weekAgo).length,
      jobsCovered: new Set(photos.map((p) => p.jobId).filter(Boolean)).size,
      geoTagged: photos.filter((p) => p.location?.lat && p.location?.lng).length,
    };
  }, [photos]);

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.jobs.length > 0 ||
    filters.showApproved !== null ||
    filters.showShared !== null;

  const handlePhotoClick = (index: number) => {
    setCurrentPhotoIndex(index);
    setViewerOpen(true);
  };

  const handleTimelinePhotoClick = (photo: TimelinePhoto) => {
    const photoIndex = filteredPhotos.findIndex((p) => p.id === photo.id);
    if (photoIndex !== -1) {
      setCurrentPhotoIndex(photoIndex);
      setViewerOpen(true);
    }
  };

  const handleMapPhotoClick = (photo: MapPhoto) => {
    const photoIndex = filteredPhotos.findIndex((p) => p.id === photo.id);
    if (photoIndex !== -1) {
      setCurrentPhotoIndex(photoIndex);
      setViewerOpen(true);
    }
  };

  const handleToggleApproval = (photoId: string) => {
    toggleApproval.mutate(photoId, {
      onSuccess: () => toast({ title: 'Photo approval updated' }),
    });
  };

  const handleToggleSharing = (photoId: string) => {
    toggleSharing.mutate(photoId, {
      onSuccess: () => toast({ title: 'Photo sharing updated' }),
    });
  };

  const handleCompareClick = useCallback(() => {
    const beforePhotos = filteredPhotos.filter((p) => p.category === 'Before');
    const afterPhotos = filteredPhotos.filter(
      (p) => p.category === 'After' || p.category === 'Completion'
    );

    if (beforePhotos.length > 0 && afterPhotos.length > 0) {
      const beforePhoto = beforePhotos[0];
      const afterPhoto = afterPhotos.find((a) => a.jobId === beforePhoto.jobId) || afterPhotos[0];

      setComparePhotos({
        before: {
          id: beforePhoto.id,
          category: beforePhoto.category,
          jobTitle: beforePhoto.jobTitle,
          timestamp: beforePhoto.timestamp,
        },
        after: {
          id: afterPhoto.id,
          category: afterPhoto.category,
          jobTitle: afterPhoto.jobTitle,
          timestamp: afterPhoto.timestamp,
        },
      });
      setCompareOpen(true);
    } else {
      toast({
        title: 'No comparison available',
        description: 'Need both Before and After photos to compare',
      });
    }
  }, [filteredPhotos]);

  const handleUploadClick = () => {
    setUploadSheetOpen(true);
  };

  const handleViewModeChange = (value: string) => {
    const next = value as ViewMode;
    setViewMode(next);
    if (next === 'compare') {
      handleCompareClick();
    }
  };

  const formatDayKey = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const photosByDay = useMemo(() => {
    const groups = new Map<string, typeof filteredPhotos>();
    filteredPhotos
      .slice()
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .forEach((photo) => {
        const key = formatDayKey(photo.timestamp);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(photo);
      });
    return Array.from(groups.entries());
  }, [filteredPhotos]);

  const toggleDay = (key: string) =>
    setOpenDays((prev) => ({ ...prev, [key]: prev[key] === false ? true : !prev[key] }));

  const heroActions = (
    <>
      <PrimaryButton onClick={handleUploadClick}>Upload</PrimaryButton>
      <IconButton onClick={handleRefresh} aria-label="Refresh photos">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Photo Gallery"
          description="Every photo from every job — timeline, map and before/after."
          tone="cyan"
          actions={heroActions}
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const filterPills = hasActiveFilters && (
    <div className="flex flex-wrap items-center gap-2">
      {filters.categories.map((cat) => (
        <button
          key={cat}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              categories: prev.categories.filter((c) => c !== cat),
            }))
          }
          className="touch-manipulation"
        >
          <Pill tone={categoryTone[cat as PhotoCategory] ?? 'yellow'}>
            {cat}
            <span className="ml-1.5 text-white">×</span>
          </Pill>
        </button>
      ))}
      {filters.jobs.map((jobId) => {
        const job = uniqueJobs.find((j) => j.value === jobId);
        return (
          <button
            key={jobId}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                jobs: prev.jobs.filter((j) => j !== jobId),
              }))
            }
            className="touch-manipulation"
          >
            <Pill tone="cyan">
              {job?.label || 'Unknown'}
              <span className="ml-1.5 text-white">×</span>
            </Pill>
          </button>
        );
      })}
      {filters.showApproved && (
        <button
          onClick={() => setFilters((prev) => ({ ...prev, showApproved: null }))}
          className="touch-manipulation"
        >
          <Pill tone="emerald">
            <Check className="h-3 w-3 mr-1" />
            Approved
            <span className="ml-1.5 text-white">×</span>
          </Pill>
        </button>
      )}
      {filters.showShared && (
        <button
          onClick={() => setFilters((prev) => ({ ...prev, showShared: null }))}
          className="touch-manipulation"
        >
          <Pill tone="blue">
            <Eye className="h-3 w-3 mr-1" />
            Shared
            <span className="ml-1.5 text-white">×</span>
          </Pill>
        </button>
      )}
    </div>
  );

  const content = (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Photo Gallery"
        description="Every photo from every job — timeline, map and before/after."
        tone="cyan"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Photos', value: stats.total, tone: 'cyan' },
          { label: 'This week', value: stats.thisWeek, tone: 'blue' },
          { label: 'Jobs covered', value: stats.jobsCovered },
          { label: 'Geo-tagged', value: stats.geoTagged, tone: 'emerald' },
        ]}
      />

      <FilterBar
        tabs={[
          { value: 'grid', label: 'Grid' },
          { value: 'timeline', label: 'Timeline' },
          { value: 'map', label: 'Map' },
          { value: 'compare', label: 'Compare' },
        ]}
        activeTab={viewMode}
        onTabChange={handleViewModeChange}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search photos, jobs, notes…"
        actions={
          <IconButton
            onClick={() => setFilterSheetOpen(true)}
            aria-label="Filter photos"
            className={cn(hasActiveFilters && 'border-elec-yellow/60 text-elec-yellow')}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </IconButton>
        }
      />

      {filterPills}

      {viewMode === 'grid' && (
        <ListCard>
          <ListCardHeader
            tone="cyan"
            title="All photos"
            meta={<Pill tone="cyan">{filteredPhotos.length}</Pill>}
          />
          {filteredPhotos.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="No photos found"
                description={
                  hasActiveFilters
                    ? 'Try adjusting your filters or search.'
                    : 'Upload your first photo to start building the gallery.'
                }
                action="Upload photo"
                onAction={handleUploadClick}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
              {filteredPhotos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => handlePhotoClick(index)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-[hsl(0_0%_10%)] border border-white/[0.06] hover:border-white/[0.12] transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Dot tone={categoryTone[photo.category]} />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    {photo.approved && (
                      <span className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-black" />
                      </span>
                    )}
                    {photo.sharedWithClient && (
                      <span className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                        <Eye className="h-2.5 w-2.5 text-black" />
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="text-[10px] font-medium text-white truncate">
                      {photo.jobTitle}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ListCard>
      )}

      {viewMode === 'timeline' && (
        <ListCard>
          <ListCardHeader
            tone="cyan"
            title="Timeline"
            meta={<Pill tone="cyan">{filteredPhotos.length}</Pill>}
          />
          {filteredPhotos.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="No photos found"
                description="Try adjusting your filters or search."
              />
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {photosByDay.map(([day, dayPhotos]) => {
                const isOpen = openDays[day] !== false;
                return (
                  <div key={day}>
                    <GroupHeader
                      tone="cyan"
                      label={day}
                      count={dayPhotos.length}
                      open={isOpen}
                      onClick={() => toggleDay(day)}
                    />
                    {isOpen && (
                      <ListBody>
                        {dayPhotos.map((photo) => {
                          const index = filteredPhotos.findIndex((p) => p.id === photo.id);
                          return (
                            <ListRow
                              key={photo.id}
                              accent={categoryTone[photo.category]}
                              lead={
                                <Avatar
                                  initials={photo.uploadedBy
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()
                                    .slice(0, 2)}
                                />
                              }
                              title={photo.jobTitle}
                              subtitle={`${photo.uploadedBy} · ${formatTime(photo.timestamp)}${
                                photo.notes ? ` · ${photo.notes}` : ''
                              }`}
                              trailing={
                                <>
                                  <Pill tone={categoryTone[photo.category]}>{photo.category}</Pill>
                                  {photo.approved && <Pill tone="emerald">Approved</Pill>}
                                  {photo.sharedWithClient && <Pill tone="blue">Shared</Pill>}
                                </>
                              }
                              onClick={() => handlePhotoClick(index)}
                            />
                          );
                        })}
                      </ListBody>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </ListCard>
      )}

      {viewMode === 'map' && (
        <ListCard>
          <ListCardHeader
            tone="cyan"
            title="Map"
            meta={<Pill tone="cyan">{stats.geoTagged} geo-tagged</Pill>}
          />
          <div className="p-4">
            <div className="rounded-xl overflow-hidden border border-white/[0.06]">
              <PhotoMapView
                photos={mapPhotos}
                onPhotoClick={handleMapPhotoClick}
                onToggleApproval={handleToggleApproval}
                onToggleSharing={handleToggleSharing}
              />
            </div>
          </div>
        </ListCard>
      )}

      {viewMode === 'compare' && (
        <ListCard>
          <ListCardHeader tone="cyan" title="Before & after" />
          <div className="p-4">
            {comparePhotos ? (
              <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                <PhotoTimeline
                  photos={timelinePhotos.filter(
                    (p) => p.category === 'before' || p.category === 'after' || p.category === 'completion'
                  )}
                  onPhotoClick={handleTimelinePhotoClick}
                  onToggleApproval={handleToggleApproval}
                  onToggleSharing={handleToggleSharing}
                />
              </div>
            ) : (
              <EmptyState
                title="No comparison ready"
                description="Need both Before and After photos in the same job to launch the slider."
                action="Open compare slider"
                onAction={handleCompareClick}
              />
            )}
          </div>
        </ListCard>
      )}

      <PhotoViewer
        photos={filteredPhotos}
        currentIndex={currentPhotoIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onNavigate={setCurrentPhotoIndex}
        onToggleApproval={handleToggleApproval}
        onToggleSharing={handleToggleSharing}
      />

      {comparePhotos && (
        <PhotoCompareSlider
          beforePhoto={comparePhotos.before}
          afterPhoto={comparePhotos.after}
          isOpen={compareOpen}
          onClose={() => setCompareOpen(false)}
        />
      )}

      <PhotoFilterSheet
        isOpen={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        jobOptions={uniqueJobs}
        categoryCounts={categoryCounts}
      />

      <UploadPhotoSheet open={uploadSheetOpen} onOpenChange={setUploadSheetOpen} />
    </PageFrame>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : (
    content
  );
}
