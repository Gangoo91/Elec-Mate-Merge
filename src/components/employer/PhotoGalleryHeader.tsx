import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Camera,
  Check,
  Share2,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { inputClass } from './editorial';

interface PhotoStats {
  total: number;
  approved: number;
  shared: number;
  issues: number;
}

interface PhotoGalleryHeaderProps {
  stats: PhotoStats;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  onViewModeClick: () => void;
  hasActiveFilters: boolean;
}

export function PhotoGalleryHeader({
  stats,
  searchQuery,
  onSearchChange,
  onFilterClick,
  onViewModeClick,
  hasActiveFilters,
}: PhotoGalleryHeaderProps) {
  const [statsExpanded, setStatsExpanded] = useState(false);

  return (
    <div className="space-y-3">
      {/* Title Row - Clean and minimal */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Photo Gallery</h1>
      </div>

      {/* Collapsible Stats Bar */}
      <button
        onClick={() => setStatsExpanded(!statsExpanded)}
        className="w-full bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl px-4 py-2.5 flex items-center justify-between hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
      >
        {statsExpanded ? (
          <div className="flex items-center justify-around w-full gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{stats.total}</div>
              <div className="text-[10px] text-white uppercase tracking-wide">Total</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-400">{stats.approved}</div>
              <div className="text-[10px] text-white uppercase tracking-wide">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">{stats.shared}</div>
              <div className="text-[10px] text-white uppercase tracking-wide">Shared</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-400">{stats.issues}</div>
              <div className="text-[10px] text-white uppercase tracking-wide">Issues</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-white">
              <Camera className="h-3.5 w-3.5 text-white" />
              <span className="font-medium">{stats.total}</span>
              <span className="text-white">photos</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Check className="h-3 w-3" />
              {stats.approved}
            </span>
            {stats.issues > 0 && (
              <>
                <span className="text-white/30">•</span>
                <span className="flex items-center gap-1 text-red-400">
                  <AlertTriangle className="h-3 w-3" />
                  {stats.issues}
                </span>
              </>
            )}
          </div>
        )}
        {statsExpanded ? (
          <ChevronUp className="h-4 w-4 text-white flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white flex-shrink-0" />
        )}
      </button>

      {/* Search + Filter Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none z-10" />
          )}
          <Input
            placeholder="Search photos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(inputClass, !searchQuery && 'pl-9')}
          />
        </div>

        <button
          type="button"
          className={cn(
            'h-11 w-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] touch-manipulation',
            hasActiveFilters && 'border-elec-yellow bg-elec-yellow/10'
          )}
          onClick={onFilterClick}
        >
          <Filter className={cn('h-4 w-4', hasActiveFilters && 'text-elec-yellow')} />
        </button>

        <button
          type="button"
          className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] touch-manipulation"
          onClick={onViewModeClick}
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
