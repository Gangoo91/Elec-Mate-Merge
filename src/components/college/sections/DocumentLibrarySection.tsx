import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCollege } from '@/contexts/CollegeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  HubGrid,
  ListCard,
  FilterBar,
  EmptyState,
  itemVariants,
  toneDot,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

const mockFolders: { id: string; name: string; itemCount: number; tone: Tone }[] = [
  { id: 'folder-1', name: 'Course Materials', itemCount: 24, tone: 'blue' },
  { id: 'folder-2', name: 'Assessment Templates', itemCount: 12, tone: 'amber' },
  { id: 'folder-3', name: 'Student Resources', itemCount: 18, tone: 'yellow' },
  { id: 'folder-4', name: 'Staff Documents', itemCount: 8, tone: 'cyan' },
  { id: 'folder-5', name: 'Policies & Procedures', itemCount: 15, tone: 'purple' },
];

const typeTone = (type: string): Tone =>
  type === 'document'
    ? 'blue'
    : type === 'video'
      ? 'red'
      : type === 'image'
        ? 'green'
        : type === 'presentation'
          ? 'orange'
          : type === 'spreadsheet'
            ? 'emerald'
            : type === 'link'
              ? 'purple'
              : 'yellow';

export function DocumentLibrarySection() {
  const { teachingResources, staff } = useCollege();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredResources = teachingResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getUploaderName = (uploadedBy: string) =>
    staff.find((s) => s.id === uploadedBy)?.name || 'Unknown';

  const totalStorage = 5 * 1024 * 1024 * 1024;
  const usedStorage = teachingResources.reduce((sum, r) => sum + (r.fileSize || 0), 0);
  const storagePercent = Math.min(Math.round((usedStorage / totalStorage) * 100), 100);

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum · Document Library"
          title="Shared documents"
          description={`${teachingResources.length} document${teachingResources.length === 1 ? '' : 's'} · ${formatFileSize(usedStorage)} used.`}
          tone="purple"
          actions={
            <button className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap">
              Upload →
            </button>
          }
        />
      </motion.div>

      {/* Storage */}
      <motion.div variants={itemVariants}>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
          <div className="flex items-baseline justify-between">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Storage
            </div>
            <div className="text-[12px] tabular-nums text-white">
              {formatFileSize(usedStorage)} / 5 GB
            </div>
          </div>
          <div className="mt-3 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full transition-all rounded-full',
                storagePercent > 80
                  ? 'bg-red-500/80'
                  : storagePercent > 60
                    ? 'bg-amber-400/80'
                    : 'bg-elec-yellow/80'
              )}
              style={{ width: `${storagePercent}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Folders */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Folders" title="Browse by folder" />
        <HubGrid columns={4}>
          {mockFolders.map((folder, i) => (
            <button
              key={folder.id}
              className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 text-left touch-manipulation flex flex-col min-h-[140px]"
            >
              <div
                className={cn(
                  'absolute inset-x-0 top-0 h-px opacity-70 group-hover:opacity-100 transition-opacity',
                  toneDot[folder.tone]
                )}
              />
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {String(i + 1).padStart(2, '0')} · Folder
              </div>
              <h3 className="mt-3 text-base font-semibold text-white tracking-tight">
                {folder.name}
              </h3>
              <div className="flex-grow" />
              <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11.5px] text-white/75 tabular-nums">
                {folder.itemCount} items
              </div>
            </button>
          ))}
        </HubGrid>
      </motion.section>

      {/* Filter */}
      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All' },
            { value: 'document', label: 'Documents' },
            { value: 'video', label: 'Videos' },
            { value: 'presentation', label: 'Slides' },
            { value: 'spreadsheet', label: 'Sheets' },
            { value: 'image', label: 'Images' },
          ]}
          activeTab={filterType}
          onTabChange={setFilterType}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search documents…"
          actions={
            <div className="flex items-center gap-0 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'px-3 py-1 text-[11.5px] font-medium rounded-full transition-colors touch-manipulation',
                  viewMode === 'grid' ? 'bg-elec-yellow text-black' : 'text-white/70 hover:text-white'
                )}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'px-3 py-1 text-[11.5px] font-medium rounded-full transition-colors touch-manipulation',
                  viewMode === 'list' ? 'bg-elec-yellow text-black' : 'text-white/70 hover:text-white'
                )}
              >
                List
              </button>
            </div>
          }
        />
      </motion.div>

      {/* Recent */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Recent" title="Recent documents" />
        {filteredResources.length === 0 ? (
          <EmptyState title="No documents found" description="Try adjusting filters or upload a new file." />
        ) : viewMode === 'grid' ? (
          <HubGrid columns={4}>
            {filteredResources.slice(0, 12).map((resource, i) => (
              <div
                key={resource.id}
                className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-4 flex flex-col min-h-[140px]"
              >
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-px opacity-70',
                    toneDot[typeTone(resource.type)]
                  )}
                />
                <div className="flex items-start justify-between">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    {String(i + 1).padStart(2, '0')} · {resource.type}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="text-white/75 hover:text-white text-[16px] leading-none px-1 touch-manipulation"
                        aria-label="Options"
                      >
                        ⋯
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="h-11">Preview</DropdownMenuItem>
                      <DropdownMenuItem className="h-11">Download</DropdownMenuItem>
                      <DropdownMenuItem className="h-11">Share</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="h-11 text-red-400">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h4 className="mt-3 text-[13.5px] font-medium text-white line-clamp-2">
                  {resource.title}
                </h4>
                <div className="flex-grow" />
                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-white/75 tabular-nums">
                  {formatFileSize(resource.fileSize)}
                </div>
              </div>
            ))}
          </HubGrid>
        ) : (
          <ListCard>
            {filteredResources.slice(0, 20).map((resource) => (
              <div
                key={resource.id}
                className="flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-[hsl(0_0%_15%)] transition-colors"
              >
                <span
                  aria-hidden
                  className={cn('h-1.5 w-1.5 rounded-full shrink-0', toneDot[typeTone(resource.type)])}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-white truncate">{resource.title}</div>
                  <div className="mt-0.5 flex items-center gap-3 text-[11.5px] text-white/75">
                    <span className="tabular-nums">{formatFileSize(resource.fileSize)}</span>
                    <span>{getUploaderName(resource.uploadedBy)}</span>
                    <span className="tabular-nums">
                      {new Date(resource.uploadedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="text-white/75 hover:text-white text-[16px] leading-none px-1 touch-manipulation shrink-0"
                      aria-label="Options"
                    >
                      ⋯
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="h-11">Preview</DropdownMenuItem>
                    <DropdownMenuItem className="h-11">Download</DropdownMenuItem>
                    <DropdownMenuItem className="h-11">Share</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="h-11 text-red-400">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </ListCard>
        )}
      </motion.section>
    </PageFrame>
  );
}
