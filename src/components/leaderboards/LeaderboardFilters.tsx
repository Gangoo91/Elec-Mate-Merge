
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, CalendarCheck, LayoutList, LayoutGrid } from "lucide-react";
import { TimeframeOption } from "@/hooks/leaderboards/filters";

interface LeaderboardFiltersProps {
  timeframe: TimeframeOption;
  setTimeframe: (value: TimeframeOption) => void;
  levelFilter: string;
  setLevelFilter: (value: string) => void;
  badgeFilter: string;
  setBadgeFilter: (value: string) => void;
  viewMode: 'card' | 'table';
  setViewMode: (value: 'card' | 'table') => void;
  uniqueLevels: string[];
  uniqueBadges: string[];
  isMobile: boolean;
}

export const LeaderboardFilters = ({
  timeframe,
  setTimeframe,
  levelFilter,
  setLevelFilter,
  badgeFilter,
  setBadgeFilter,
  viewMode,
  setViewMode,
  uniqueLevels,
  uniqueBadges,
  isMobile
}: LeaderboardFiltersProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Leaderboards</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            See how you rank against other electrical professionals in the community.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            <Select value={timeframe} onValueChange={(value) => setTimeframe(value as TimeframeOption)}>
              <SelectTrigger className={`${isMobile ? 'w-full' : 'w-[160px]'}`}>
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="alltime">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {!isMobile && (
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                <Button 
                  variant={viewMode === 'card' ? "secondary" : "outline"} 
                  size="sm" 
                  onClick={() => setViewMode('card')}
                  className="h-9"
                >
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Card
                </Button>
                <Button 
                  variant={viewMode === 'table' ? "secondary" : "outline"} 
                  size="sm" 
                  onClick={() => setViewMode('table')}
                  className="h-9"
                >
                  <LayoutList className="h-4 w-4 mr-2" />
                  Table
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Filters */}
      {!isMobile ? (
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Level:</span>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {uniqueLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Badge:</span>
            <Select value={badgeFilter} onValueChange={setBadgeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by Badge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Badges</SelectItem>
                {uniqueBadges.map(badge => (
                  <SelectItem key={badge} value={badge}>{badge}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {uniqueLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={badgeFilter} onValueChange={setBadgeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Badge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Badges</SelectItem>
              {uniqueBadges.map(badge => (
                <SelectItem key={badge} value={badge}>{badge}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-2 mt-1">
            <Button 
              variant={viewMode === 'card' ? "secondary" : "outline"} 
              size="sm" 
              onClick={() => setViewMode('card')}
              className="flex-1 h-9"
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Card View
            </Button>
            <Button 
              variant={viewMode === 'table' ? "secondary" : "outline"} 
              size="sm" 
              onClick={() => setViewMode('table')}
              className="flex-1 h-9"
            >
              <LayoutList className="h-4 w-4 mr-2" />
              Table View
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
