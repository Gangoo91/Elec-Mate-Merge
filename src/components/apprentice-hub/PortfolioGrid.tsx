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
  NotebookPen,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
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
import { getEvidenceReadiness } from '@/lib/portfolioReadiness';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';
import { PortfolioDetailSheet } from './PortfolioDetailSheet';
import PortfolioEntryForm from '@/components/apprentice/portfolio/PortfolioEntryForm';

interface PortfolioGridProps {
  onCapture: () => void;
}

type ViewMode = 'grid' | 'list';
type StatusFilter = 'all' | 'draft' | 'in-progress' | 'completed' | 'reviewed';
type SortOption = 'newest' | 'oldest' | 'name';

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'reviewed', label: 'Reviewed' },
];

export function PortfolioGrid({ onCapture }: PortfolioGridProps) {
  const { entries, categories, isLoading, updateEntry } = usePortfolioData();
  const { getCommentsForEvidence } = usePortfolioComments();
  const { qualificationCode } = useStudentQualification();
  const { tree } = useQualificationACs(qualificationCode);

  // Build filter chips. With a qualification, chips are units and filter by the
  // unit code referenced in each entry's assessment criteria (entries are saved
  // under a generic category, so the AC codes are the real unit link). Without
  // one, chips fall back to category names.
  const dynamicCategories = useMemo<{ key: string; label: string }[]>(() => {
    if (tree.units.length === 0) {
      return [
        { key: 'all', label: 'All' },
        { key: 'cat:Practical Skills', label: 'Practical Skills' },
        { key: 'cat:Health & Safety', label: 'Health & Safety' },
        { key: 'cat:Testing & Inspection', label: 'Testing & Inspection' },
        { key: 'cat:Technical Knowledge', label: 'Technical Knowledge' },
        { key: 'cat:Workplace Practice', label: 'Workplace Practice' },
      ];
    }
    return [
      { key: 'all', label: 'All' },
      ...tree.units.map((u) => ({
        key: `unit:${u.unitCode}`,
        label: `Unit ${u.unitCode}: ${u.unitTitle}`,
      })),
    ];
  }, [tree.units]);

  // View and filter state
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Detail sheet state
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [editEntry, setEditEntry] = useState<any>(null);

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

    // Category filter — unit chips match the unit code in an entry's ACs;
    // fallback category chips match the entry's category name.
    if (categoryFilter !== 'all') {
      if (categoryFilter.startsWith('unit:')) {
        const code = categoryFilter.slice(5);
        const re = new RegExp(`(^|[^0-9A-Za-z])${escapeRegExp(code)}([^0-9A-Za-z]|$)`);
        filtered = filtered.filter((e) =>
          (e.assessmentCriteria || []).some((ac: string) => re.test(ac))
        );
      } else if (categoryFilter.startsWith('cat:')) {
        const name = categoryFilter.slice(4);
        filtered = filtered.filter((e) => {
          const cn = typeof e.category === 'object' ? e.category?.name : e.category;
          return cn === name;
        });
      }
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

  // Portfolio-at-a-glance counts for the summary strip (unfiltered totals).
  const stats = useMemo(() => {
    const all = entries || [];
    const acSet = new Set<string>();
    all.forEach((e) => (e.assessmentCriteria || []).forEach((c) => acSet.add(c)));
    return {
      total: all.length,
      verified: all.filter((e) => e.isVerified).length,
      drafts: all.filter((e) => (e.status || 'draft') === 'draft').length,
      acs: acSet.size,
    };
  }, [entries]);

  const handleEntryClick = (entry: any) => {
    setSelectedEntry(entry);
    setShowDetail(true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || categoryFilter !== 'all';

  if (isLoading) {
    return (
      <div className="py-6 space-y-4">
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
    <div className="py-6 space-y-5">
      {/* Summary strip — portfolio at a glance (assessor-relevant context) */}
      {stats.total > 0 && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px]">
          <SummaryStat n={stats.total} label={stats.total === 1 ? 'item' : 'items'} />
          <span className="h-3 w-px bg-white/10" aria-hidden />
          <SummaryStat n={stats.verified} label="verified" accent />
          <SummaryStat n={stats.drafts} label="drafts" />
          {stats.acs > 0 && <SummaryStat n={stats.acs} label="criteria covered" />}
        </div>
      )}

      {/* Search and Controls */}
      <div className="space-y-3">
        {/* Search Bar — icon stays clear of the text at every breakpoint
            (md:pl-10 beats the Input base's md:px-3). */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none z-10" />
          <Input
            placeholder="Search evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-card border-border pl-10 md:pl-10 pr-10 md:pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 touch-manipulation z-10"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          )}
        </div>

        {/* Filter Controls — clean row: view toggle + two dropdowns (no
            horizontal chip scroll) */}
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center border border-border rounded-lg p-1 bg-card shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={cn('h-11 w-11 flex items-center justify-center rounded touch-manipulation active:scale-95',
                viewMode === 'grid' ? 'bg-elec-yellow/10 text-elec-yellow' : 'text-white/70'
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List view"
              className={cn('h-11 w-11 flex items-center justify-center rounded touch-manipulation active:scale-95',
                viewMode === 'list' ? 'bg-elec-yellow/10 text-elec-yellow' : 'text-white/70'
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'shrink-0 h-11 touch-manipulation',
                  statusFilter !== 'all' && 'border-elec-yellow/40 text-elec-yellow'
                )}
              >
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

          {/* Unit Filter — replaces the old horizontally-scrolling chip strip */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'h-11 touch-manipulation min-w-0 flex-1 sm:flex-none sm:max-w-[240px] justify-start',
                  categoryFilter !== 'all' && 'border-elec-yellow/40 text-elec-yellow'
                )}
              >
                <BookOpen className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                <span className="truncate">
                  {categoryFilter === 'all'
                    ? 'All units'
                    : (dynamicCategories.find((c) => c.key === categoryFilter)?.label ?? 'Unit')}
                </span>
                <ChevronDown className="h-3.5 w-3.5 ml-auto pl-1.5 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-[60vh] overflow-y-auto">
              <DropdownMenuLabel>Filter by unit</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {dynamicCategories.map((cat) => (
                <DropdownMenuItem
                  key={cat.key}
                  onClick={() => setCategoryFilter(cat.key)}
                  className={cn('max-w-[280px]', categoryFilter === cat.key && 'bg-accent')}
                >
                  <span className="truncate">
                    {cat.key === 'all' ? 'All units' : cat.label}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-white">
              {filteredEntries.length} result{filteredEntries.length !== 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-10 text-xs text-white hover:text-foreground touch-manipulation"
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
            <FileCheck className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">
              {hasActiveFilters ? 'No matching evidence' : 'No evidence yet'}
            </p>
            <p className="text-sm text-white">
              {hasActiveFilters
                ? 'Try adjusting your filters'
                : 'Start building your portfolio by adding evidence'}
            </p>
          </div>
          {!hasActiveFilters && (
            <Button
              onClick={onCapture}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-11 touch-manipulation active:scale-95"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Evidence
            </Button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
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
        onEdit={(entry) => {
          setShowDetail(false);
          setEditEntry(entry);
        }}
      />

      {/* Edit Form (renders its own Dialog) */}
      {editEntry && (
        <PortfolioEntryForm
          categories={categories}
          initialData={editEntry}
          onSubmit={async (data) => {
            await updateEntry(editEntry.id, data);
            setEditEntry(null);
          }}
          onCancel={() => setEditEntry(null)}
        />
      )}
    </div>
  );
}

// Summary strip stat — mono number + muted label
function SummaryStat({ n, label, accent }: { n: number; label: string; accent?: boolean }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span
        className={cn(
          'font-mono font-semibold tabular-nums',
          accent ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {n}
      </span>
      <span className="text-white/45">{label}</span>
    </span>
  );
}

const STATUS_META: Record<string, { label: string; cls: string; dot: string }> = {
  draft: { label: 'Draft', cls: 'text-white/55', dot: 'bg-white/30' },
  'in-progress': { label: 'In progress', cls: 'text-blue-300', dot: 'bg-blue-400' },
  completed: { label: 'Completed', cls: 'text-emerald-300', dot: 'bg-emerald-400' },
  reviewed: { label: 'Verified', cls: 'text-elec-yellow', dot: 'bg-elec-yellow' },
};

function StatusPill({ status }: { status: string }) {
  const meta = STATUS_META[status] || STATUS_META.draft;
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium">
      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', meta.dot)} />
      <span className={meta.cls}>{meta.label}</span>
    </span>
  );
}

// Grid card — media on top, readable content strip below (no text over the photo)
function GridCard({
  entry,
  onClick,
  commentCount,
}: {
  entry: any;
  onClick: () => void;
  commentCount: number;
}) {
  const hasImage = entry.evidenceFiles?.some(
    (f: any) => f.type?.startsWith('image/') || f.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );

  const getFileIcon = () => {
    if (hasImage) return ImageIcon;
    if (entry.evidenceFiles?.some((f: any) => f.type?.startsWith('video/'))) return Video;
    if (entry.evidenceFiles?.some((f: any) => f.url?.startsWith('http'))) return Link2;
    return FileText;
  };
  const FileIcon = getFileIcon();

  const isDiary =
    entry.category?.id === 'site-diary-evidence' || entry.category === 'site-diary-evidence';
  const status = entry.status || 'draft';
  const acCount = entry.assessmentCriteria?.length || 0;
  const photoCount = entry.evidenceFiles?.length || 0;
  const assessorReady = getEvidenceReadiness(entry).ready;
  const dateLabel = entry.dateCreated
    ? new Date(entry.dateCreated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    : '';

  return (
    <button
      onClick={onClick}
      className="group flex flex-col rounded-xl bg-card border border-border overflow-hidden text-left hover:border-white/20 active:scale-[0.98] transition-all touch-manipulation"
    >
      {/* Media */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {hasImage && entry.evidenceFiles?.[0]?.url ? (
          <img
            src={entry.evidenceFiles[0].url}
            alt={entry.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileIcon className="h-9 w-9 text-white/40" />
          </div>
        )}

        {/* Diary source — top-left */}
        {isDiary && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/55 backdrop-blur-sm text-white text-[10px] font-medium">
            <NotebookPen className="h-3 w-3" />
            Diary
          </span>
        )}

        {/* Verified — top-right */}
        {entry.isVerified && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-elec-yellow text-black text-[10px] font-semibold">
            <ShieldCheck className="h-3 w-3" />
            Verified
          </span>
        )}
      </div>

      {/* Content strip */}
      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-[13px] font-medium text-white leading-snug line-clamp-2 min-h-[34px]">
          {entry.title}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <StatusPill status={status} />
          {dateLabel && (
            <span className="text-[11px] text-white/45 font-mono tabular-nums shrink-0">
              {dateLabel}
            </span>
          )}
        </div>

        {(acCount > 0 || photoCount > 0 || commentCount > 0 || assessorReady) && (
          <div className="flex items-center gap-3 text-[10.5px] text-white/55 font-mono">
            {assessorReady && (
              <span className="inline-flex items-center gap-1 text-elec-yellow" title="Assessor-ready (VACSR complete)">
                <CheckCircle2 className="h-3 w-3" />
                Ready
              </span>
            )}
            {acCount > 0 && (
              <span className="inline-flex items-center gap-1">
                <FileCheck className="h-3 w-3" />
                {acCount} AC
              </span>
            )}
            {photoCount > 0 && (
              <span className="inline-flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                {photoCount}
              </span>
            )}
            {commentCount > 0 && (
              <span className="inline-flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {commentCount}
              </span>
            )}
          </div>
        )}
      </div>
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
    draft: 'bg-muted text-white',
    'in-progress': 'bg-white/[0.02] text-white/85',
    completed: 'bg-white/[0.02] text-white/85',
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
          <img src={entry.evidenceFiles[0].url} alt="" className="w-full h-full object-cover" />
        ) : (
          <FileText className="h-6 w-6 text-white" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground truncate">{entry.title}</h3>
        <p className="text-xs text-white truncate">
          {typeof entry.category === 'object' ? entry.category?.name : entry.category || 'N/A'}
        </p>
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
        <span className="text-[10px] text-white">
          {new Date(entry.dateCreated).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
          })}
        </span>
        {commentCount > 0 && (
          <div className="flex items-center gap-1 text-white">
            <MessageSquare className="h-3 w-3" />
            <span className="text-[10px]">{commentCount}</span>
          </div>
        )}
        {(entry.category?.id === 'site-diary-evidence' ||
          entry.category === 'site-diary-evidence') && (
          <div className="flex items-center gap-0.5 text-white/85">
            <NotebookPen className="h-3 w-3" />
            <span className="text-[10px] font-medium">Diary</span>
          </div>
        )}
        {entry.isVerified && (
          <div className="flex items-center gap-0.5 text-white/85">
            <ShieldCheck className="h-3 w-3" />
            <span className="text-[10px] font-medium">Verified</span>
          </div>
        )}
      </div>
    </button>
  );
}

export default PortfolioGrid;
