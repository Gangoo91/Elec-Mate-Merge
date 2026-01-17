import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Camera,
  Check,
  Share2,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  hasActiveFilters
}: PhotoGalleryHeaderProps) {
  const [statsExpanded, setStatsExpanded] = useState(false);

  return (
    <div className="space-y-3">
      {/* Title Row - Clean and minimal */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Photo Gallery</h1>
      </div>

      {/* Collapsible Stats Bar */}
      <button
        onClick={() => setStatsExpanded(!statsExpanded)}
        className="w-full bg-elec-gray/50 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors touch-feedback"
      >
        {statsExpanded ? (
          <div className="flex items-center justify-around w-full gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{stats.total}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Total</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-success">{stats.approved}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-info">{stats.shared}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Shared</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-destructive">{stats.issues}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Issues</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-foreground">
              <Camera className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium">{stats.total}</span>
              <span className="text-muted-foreground">photos</span>
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1 text-success">
              <Check className="h-3 w-3" />
              {stats.approved}
            </span>
            {stats.issues > 0 && (
              <>
                <span className="text-border">•</span>
                <span className="flex items-center gap-1 text-destructive">
                  <AlertTriangle className="h-3 w-3" />
                  {stats.issues}
                </span>
              </>
            )}
          </div>
        )}
        {statsExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {/* Search + Filter Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search photos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn("bg-elec-gray/80 h-11 border-border/50", !searchQuery && "pl-9")}
          />
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className={cn(
            "h-11 w-11 border-border/50",
            hasActiveFilters && "border-elec-yellow bg-elec-yellow/10"
          )}
          onClick={onFilterClick}
        >
          <Filter className={cn(
            "h-4 w-4",
            hasActiveFilters && "text-elec-yellow"
          )} />
        </Button>

        <Button 
          variant="outline" 
          size="icon" 
          className="h-11 w-11 border-border/50"
          onClick={onViewModeClick}
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
