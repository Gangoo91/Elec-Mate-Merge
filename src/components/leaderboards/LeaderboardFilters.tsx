
import { Filter, Table, Grid3X3, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TimeframeOption } from "@/hooks/leaderboards/filters/types";

interface LeaderboardFiltersProps {
  timeframe: TimeframeOption;
  setTimeframe: (timeframe: TimeframeOption) => void;
  levelFilter: string;
  setLevelFilter: (level: string) => void;
  badgeFilter: string; 
  setBadgeFilter: (badge: string) => void;
  viewMode: 'card' | 'table';
  setViewMode: (viewMode: 'card' | 'table') => void;
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
    <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-6">
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <Tabs defaultValue={timeframe} value={timeframe} onValueChange={(v) => setTimeframe(v as TimeframeOption)} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-3 h-8 bg-elec-dark">
            <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
            <TabsTrigger value="alltime" className="text-xs">All-Time</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Mobile View: Filters in a Sheet */}
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-elec-yellow/20 flex items-center gap-2">
                <Filter className="h-3.5 w-3.5" />
                <span>Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-elec-gray h-auto rounded-t-xl">
              <SheetHeader className="pb-4">
                <SheetTitle>Filter Leaderboard</SheetTitle>
                <SheetDescription>
                  Filter leaderboard by level and badge
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile-level-filter">Level</Label>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger id="mobile-level-filter" className="bg-elec-dark/30 border-elec-yellow/20">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-yellow/20">
                      <SelectItem value="all">All Levels</SelectItem>
                      {uniqueLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile-badge-filter">Badge</Label>
                  <Select value={badgeFilter} onValueChange={setBadgeFilter}>
                    <SelectTrigger id="mobile-badge-filter" className="bg-elec-dark/30 border-elec-yellow/20">
                      <SelectValue placeholder="All Badges" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-yellow/20">
                      <SelectItem value="all">All Badges</SelectItem>
                      {uniqueBadges.map(badge => (
                        <SelectItem key={badge} value={badge}>{badge}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          /* Desktop View: Inline Filters */
          <div className="flex gap-3">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="h-8 w-[110px] text-xs border-elec-yellow/20 bg-elec-dark/30">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/20">
                <SelectItem value="all">All Levels</SelectItem>
                {uniqueLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={badgeFilter} onValueChange={setBadgeFilter}>
              <SelectTrigger className="h-8 w-[110px] text-xs border-elec-yellow/20 bg-elec-dark/30">
                <SelectValue placeholder="Badge" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/20">
                <SelectItem value="all">All Badges</SelectItem>
                {uniqueBadges.map(badge => (
                  <SelectItem key={badge} value={badge}>{badge}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* View Mode Toggle */}
      <div>
        <div className="flex items-center h-8 rounded-md bg-elec-dark border-elec-yellow/20 border">
          <Button
            variant="ghost"
            size="sm"
            className={`h-7 w-8 rounded-none ${viewMode === 'card' ? 'bg-elec-yellow/10' : ''}`}
            onClick={() => setViewMode('card')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost" 
            size="sm"
            className={`h-7 w-8 rounded-none ${viewMode === 'table' ? 'bg-elec-yellow/10' : ''}`}
            onClick={() => setViewMode('table')}
          >
            <Table className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardFilters;
