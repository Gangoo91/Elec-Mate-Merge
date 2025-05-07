
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
    <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 mb-6">
      <h2 className="text-xl font-medium mb-2">Looking for qualified electricians</h2>
      <p>
        Browse our curated list of electrical jobs from trusted employers across the UK. 
        New positions are added daily, so check back often for the latest opportunities.
      </p>
      
      {/* Filters */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Location</label>
          <Select value={locationFilter} onValueChange={handleLocationChange}>
            <SelectTrigger>
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
        
        <div>
          <label className="block text-sm mb-1">Job Type</label>
          <Select value={jobTypeFilter} onValueChange={handleJobTypeChange}>
            <SelectTrigger>
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
        
        <div className="flex items-end gap-2">
          <Button 
            onClick={applyFilters} 
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            disabled={isLoading}
          >
            <Filter className="h-4 w-4 mr-2" />
            {isLoading ? "Filtering..." : "Apply Filters"}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="border-elec-yellow/20"
            disabled={isLoading}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
