
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobFiltersProps {
  locationFilter: string;
  jobTypeFilter: string;
  locations: string[];
  jobTypes: string[];
  isLoading: boolean;
  handleLocationChange: (value: string) => void;
  handleJobTypeChange: (value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  locationFilter,
  jobTypeFilter,
  locations,
  jobTypes,
  isLoading,
  handleLocationChange,
  handleJobTypeChange,
  applyFilters,
  resetFilters,
}) => {
  return (
    <div className="border p-6 rounded-lg bg-elec-gray border-elec-yellow/20 mb-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-foreground">Looking for qualified electricians</h2>
        <p className="text-muted-foreground leading-relaxed">
          Browse our curated list of electrical jobs from trusted employers across the UK. 
          New positions are added daily, so check back often for the latest opportunities.
        </p>
      </div>
      
      <div className="border-t border-elec-yellow/10 pt-6">
        <h3 className="text-lg font-medium mb-4 text-foreground">Advanced Filters</h3>
        
        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Location</label>
            <Select value={locationFilter} onValueChange={handleLocationChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Job Type</label>
            <Select value={jobTypeFilter} onValueChange={handleJobTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {jobTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="border-t border-elec-yellow/10 pt-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <Button 
                onClick={applyFilters} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors duration-200 w-full sm:w-auto min-w-[140px]"
                disabled={isLoading}
              >
                <Filter className="h-4 w-4 mr-2" />
                {isLoading ? "Filtering..." : "Apply Filters"}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="border-elec-yellow/30 hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-colors duration-200 w-full sm:w-auto"
                disabled={isLoading}
              >
                Reset Filters
              </Button>
            </div>
            
            {/* Active Filters Indicator */}
            {(locationFilter !== "all" || jobTypeFilter !== "all") && (
              <div className="text-sm text-muted-foreground">
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-elec-yellow/10 text-elec-yellow font-medium">
                  {[
                    locationFilter !== "all" && "Location",
                    jobTypeFilter !== "all" && "Type"
                  ].filter(Boolean).length} filter{[
                    locationFilter !== "all" && "Location",
                    jobTypeFilter !== "all" && "Type"
                  ].filter(Boolean).length !== 1 ? "s" : ""} active
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
