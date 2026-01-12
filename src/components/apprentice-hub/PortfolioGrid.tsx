/**
 * PortfolioGrid
 *
 * Full portfolio view with grid/list toggle and filtering.
 * Shows all evidence with thumbnails, KSB badges, status indicators.
 */

import { useState, useMemo } from 'react';
import {
  Search,
  Grid3X3,
  List,
  Filter,
  Plus,
  FileCheck,
  Clock,
  MessageSquare,
  ChevronDown,
  X,
  Image as ImageIcon,
  FileText,
  Video,
  Link2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { PortfolioDetailSheet } from './PortfolioDetailSheet';
import { CourseRequirementsPanel } from './CourseRequirementsPanel';

interface PortfolioGridProps {
  onCapture: () => void;
}

type ViewMode = 'grid' | 'list';
type StatusFilter = 'all' | 'draft' | 'in-progress' | 'completed' | 'reviewed';
type SortOption = 'newest' | 'oldest' | 'name';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'reviewed', label: 'Reviewed' },
];

const CATEGORIES = [
  'All',
  'Practical Skills',
  'Health & Safety',
  'Testing & Inspection',
  'Customer Service',
  'Technical Knowledge',
  'Workplace Practice',
];

export function PortfolioGrid({ onCapture }: PortfolioGridProps) {
  const { entries, categories, isLoading } = usePortfolioData();
  const { getCommentsForEvidence } = usePortfolioComments();

  // View and filter state
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Detail sheet state
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Filter and sort entries
  const filteredEntries = useMemo(() => {
    if (!entries) return [];

    let filtered = [...entries];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title?.toLowerCase().includes(query) ||
          e.description?.toLowerCase().includes(query) ||
          e.skills?.some((s: string) => s.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((e) => e.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter((e) => e.category === categoryFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        case 'oldest':
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        case 'name':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [entries, searchQuery, statusFilter, categoryFilter, sortBy]);

  const handleEntryClick = (entry: any) => {
    setSelectedEntry(entry);
    setShowDetail(true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('All');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || categoryFilter !== 'All';

  if (isLoading) {
    return (
      <div className="px-4 py-6 space-y-4 lg:px-6">
        <div className="h-10 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-4 lg:px-6">
      {/* Course Requirements (collapsible) */}
      <CourseRequirementsPanel />

      {/* Search and Controls */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 touch-manipulation"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {/* View Toggle */}
          <div className="flex items-center border border-border rounded-lg p-1 bg-card shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2.5 rounded touch-manipulation',
                viewMode === 'grid' ? 'bg-elec-yellow/10 text-elec-yellow' : 'text-muted-foreground'
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2.5 rounded touch-manipulation',
                viewMode === 'list' ? 'bg-elec-yellow/10 text-elec-yellow' : 'text-muted-foreground'
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="shrink-0 h-11 touch-manipulation">
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                {STATUS_OPTIONS.find((s) => s.value === statusFilter)?.label}
                <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {STATUS_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={statusFilter === option.value ? 'bg-accent' : ''}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category Chips */}
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                'px-4 h-9 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 touch-manipulation',
                categoryFilter === cat
                  ? 'bg-elec-yellow text-black'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {filteredEntries.length} result{filteredEntries.length !== 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-6 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Grid/List View */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <div className="p-4 rounded-full bg-muted inline-block">
            <FileCheck className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">
              {hasActiveFilters ? 'No matching evidence' : 'No evidence yet'}
            </p>
            <p className="text-sm text-muted-foreground">
              {hasActiveFilters
                ? 'Try adjusting your filters'
                : 'Start building your portfolio by adding evidence'}
            </p>
          </div>
          {!hasActiveFilters && (
            <Button onClick={onCapture} className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-11 touch-manipulation active:scale-95">
              <Plus className="h-4 w-4 mr-2" />
              Add First Evidence
            </Button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredEntries.map((entry) => (
            <GridCard
              key={entry.id}
              entry={entry}
              onClick={() => handleEntryClick(entry)}
              commentCount={getCommentsForEvidence(entry.id)?.length || 0}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredEntries.map((entry) => (
            <ListItem
              key={entry.id}
              entry={entry}
              onClick={() => handleEntryClick(entry)}
              commentCount={getCommentsForEvidence(entry.id)?.length || 0}
            />
          ))}
        </div>
      )}

      {/* Detail Sheet */}
      <PortfolioDetailSheet
        entry={selectedEntry}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </div>
  );
}

// Grid card component
function GridCard({
  entry,
  onClick,
  commentCount,
}: {
  entry: any;
  onClick: () => void;
  commentCount: number;
}) {
  const hasImage = entry.evidenceFiles?.some((f: any) =>
    f.type?.startsWith('image/') || f.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );

  const getFileIcon = () => {
    if (hasImage) return ImageIcon;
    if (entry.evidenceFiles?.some((f: any) => f.type?.startsWith('video/'))) return Video;
    if (entry.evidenceFiles?.some((f: any) => f.url?.startsWith('http'))) return Link2;
    return FileText;
  };

  const FileIcon = getFileIcon();

  const statusColors: Record<string, string> = {
    draft: 'bg-muted text-muted-foreground',
    'in-progress': 'bg-blue-500/10 text-blue-500',
    completed: 'bg-green-500/10 text-green-500',
    reviewed: 'bg-elec-yellow/10 text-elec-yellow',
  };

  return (
    <button
      onClick={onClick}
      className="group relative aspect-square rounded-xl bg-card border border-border overflow-hidden text-left active:scale-[0.98] transition-transform touch-manipulation"
    >
      {/* Thumbnail or Icon */}
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        {hasImage && entry.evidenceFiles?.[0]?.url ? (
          <img
            src={entry.evidenceFiles[0].url}
            alt={entry.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileIcon className="h-10 w-10 text-muted-foreground/50" />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-3 space-y-1.5">
        <h3 className="text-sm font-medium text-white line-clamp-2">{entry.title}</h3>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge className={cn('text-[10px]', statusColors[entry.status] || statusColors.draft)}>
            {entry.status || 'draft'}
          </Badge>
          {entry.skills?.slice(0, 2).map((skill: string, i: number) => (
            <Badge key={i} variant="outline" className="text-[10px] border-white/30 text-white/80">
              {skill.substring(0, 3)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Comment indicator */}
      {commentCount > 0 && (
        <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/50 text-white text-[10px]">
          <MessageSquare className="h-3 w-3" />
          {commentCount}
        </div>
      )}
    </button>
  );
}

// List item component
function ListItem({
  entry,
  onClick,
  commentCount,
}: {
  entry: any;
  onClick: () => void;
  commentCount: number;
}) {
  const statusColors: Record<string, string> = {
    draft: 'bg-muted text-muted-foreground',
    'in-progress': 'bg-blue-500/10 text-blue-500',
    completed: 'bg-green-500/10 text-green-500',
    reviewed: 'bg-elec-yellow/10 text-elec-yellow',
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border text-left active:scale-[0.99] transition-transform touch-manipulation"
    >
      {/* Thumbnail */}
      <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
        {entry.evidenceFiles?.[0]?.url ? (
          <img
            src={entry.evidenceFiles[0].url}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <FileText className="h-6 w-6 text-muted-foreground/50" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground truncate">{entry.title}</h3>
        <p className="text-xs text-muted-foreground truncate">{entry.category}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <Badge className={cn('text-[10px]', statusColors[entry.status] || statusColors.draft)}>
            {entry.status || 'draft'}
          </Badge>
          {entry.skills?.slice(0, 2).map((skill: string, i: number) => (
            <Badge key={i} variant="outline" className="text-[10px]">
              {skill.substring(0, 3)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-[10px] text-muted-foreground">
          {new Date(entry.dateCreated).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
          })}
        </span>
        {commentCount > 0 && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-3 w-3" />
            <span className="text-[10px]">{commentCount}</span>
          </div>
        )}
      </div>
    </button>
  );
}

export default PortfolioGrid;
