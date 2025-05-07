
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import JobGrid from "./JobGrid";
import JobPagination from "./JobPagination";
import MapViewContent from "./MapViewContent";
import { JobListing } from "@/pages/electrician/JobVacancies";

interface JobListingContentProps {
  userLocation: string | null;
  showMap: boolean;
  viewMode: "list" | "map";
  setViewMode: (mode: "list" | "map") => void;
  currentJobs: JobListing[];
  selectedJob: string | null;
  handleApply: (jobId: string, url: string) => void;
  resetFilters: () => void;
  isLoading: boolean;
  isCalculating: boolean;
  filteredJobs: JobListing[];
  handleJobSelect: (jobId: string) => void;
  searchRadius: number;
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const JobListingContent: React.FC<JobListingContentProps> = ({
  userLocation,
  showMap,
  viewMode,
  setViewMode,
  currentJobs,
  selectedJob,
  handleApply,
  resetFilters,
  isLoading,
  isCalculating,
  filteredJobs,
  handleJobSelect,
  searchRadius,
  currentPage,
  totalPages,
  paginate
}) => {
  if (userLocation && showMap) {
    return (
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "map")} className="w-full">
        <TabsContent value="list" className="mt-0">
          {/* Job listings grid */}
          <JobGrid 
            jobs={currentJobs}
            selectedJob={selectedJob}
            handleApply={handleApply}
            resetFilters={resetFilters}
            isLoading={isLoading || isCalculating}
          />

          {/* Pagination */}
          <JobPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </TabsContent>
        <TabsContent value="map" className="mt-0">
          <MapViewContent 
            filteredJobs={filteredJobs}
            selectedJob={selectedJob}
            handleJobSelect={handleJobSelect}
            userLocation={userLocation}
            isLoading={isLoading}
            isCalculating={isCalculating}
            searchRadius={searchRadius}
            setViewMode={setViewMode}
          />
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <>
      {/* Standard Job Listings Grid (when not using location search) */}
      <JobGrid 
        jobs={currentJobs}
        selectedJob={selectedJob}
        handleApply={handleApply}
        resetFilters={resetFilters}
        isLoading={isLoading || isCalculating}
      />

      {/* Pagination */}
      <JobPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </>
  );
};

export default JobListingContent;
