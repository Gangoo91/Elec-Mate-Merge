
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

export interface TimeEntriesFilterProps {
  onSearchChange: (search: string) => void;
  onActivityFilter: (activity: string) => void;
  onDateRangeFilter: (range: string) => void;
  onTypeFilter: (type: string) => void;
  searchValue: string;
  activityFilter: string;
  dateRangeFilter: string;
  typeFilter: string;
  availableActivities: string[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const TimeEntriesFilter = ({
  onSearchChange,
  onActivityFilter,
  onDateRangeFilter,
  onTypeFilter,
  searchValue,
  activityFilter,
  dateRangeFilter,
  typeFilter,
  availableActivities,
  onClearFilters,
  hasActiveFilters
}: TimeEntriesFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-elec-gray/30 border-elec-yellow/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search entries..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-elec-dark border-elec-yellow/30"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="border-elec-yellow/30"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-white"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={activityFilter} onValueChange={onActivityFilter}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                <SelectValue placeholder="Filter by activity" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="all">All Activities</SelectItem>
                {availableActivities.map((activity) => (
                  <SelectItem key={activity} value={activity}>
                    {activity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateRangeFilter} onValueChange={onDateRangeFilter}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={onTypeFilter}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="automatic">Automatic</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeEntriesFilter;
