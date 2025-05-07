
import React from "react";
import { Button } from "@/components/ui/button";
import JobMap from "./JobMap";
import { JobListing } from "@/pages/electrician/JobVacancies";

interface MapViewContentProps {
  filteredJobs: JobListing[];
  selectedJob: string | null;
  handleJobSelect: (jobId: string) => void;
  userLocation: string | null;
  isLoading: boolean;
  isCalculating: boolean;
  searchRadius: number;
  setViewMode: (mode: "list" | "map") => void;
}

const MapViewContent: React.FC<MapViewContentProps> = ({
  filteredJobs,
  selectedJob,
  handleJobSelect,
  userLocation,
  isLoading,
  isCalculating,
  searchRadius,
  setViewMode
}) => {
  return (
    <>
      <JobMap 
        jobs={filteredJobs as unknown as { id: string; title: string; company: string; location: string; external_url: string; }[]}
        selectedJob={selectedJob}
        handleJobSelect={handleJobSelect}
        userLocation={userLocation}
        isLoading={isLoading || isCalculating}
      />

      {/* Small list of jobs below map */}
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">
          {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Within {searchRadius} Miles
        </h3>
        <div className="max-h-[300px] overflow-y-auto pr-1">
          {filteredJobs.slice(0, 5).map(job => (
            <div 
              key={job.id} 
              id={`job-${job.id}`}
              className={`p-3 mb-2 rounded-md cursor-pointer ${
                job.id === selectedJob 
                  ? "bg-elec-yellow/10 border border-elec-yellow/30" 
                  : "border border-elec-yellow/20 hover:bg-elec-gray/80"
              }`}
              onClick={() => handleJobSelect(job.id)}
            >
              <div className="font-medium text-elec-light">{job.title}</div>
              <div className="text-sm text-muted-foreground">{job.company} • {job.location}</div>
            </div>
          ))}
          {filteredJobs.length > 5 && (
            <Button 
              variant="outline" 
              className="w-full mt-2 border-elec-yellow/20"
              onClick={() => setViewMode("list")}
            >
              View All {filteredJobs.length} Jobs
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MapViewContent;
