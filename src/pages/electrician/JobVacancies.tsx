
import { useState } from "react";
import JobVacancyHeader from "@/components/job-vacancies/JobVacancyHeader";
import JobListingsFetcher from "@/components/electrician-tools/JobListingsFetcher";
import CVBuilderBox from "@/components/electrician-tools/CVBuilderBox";
import JobFilters from "@/components/job-vacancies/JobFilters";
import JobGrid from "@/components/job-vacancies/JobGrid";
import JobTableView from "@/components/job-vacancies/JobTableView";
import JobPagination from "@/components/job-vacancies/JobPagination";
import { useJobListings } from "@/hooks/job-vacancies/useJobListings";
import { useLocationFilter } from "@/hooks/job-vacancies/useLocationFilter";
import UserLocationInput from "@/components/job-vacancies/UserLocationInput";
import JobMap from "@/components/job-vacancies/JobMap";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, List } from "lucide-react";

const JobVacancies = () => {
  const { 
    jobs,
    isLoading,
    selectedJob, 
    locationFilter,
    jobTypeFilter,
    locations,
    jobTypes,
    handleApply,
    handleLocationChange,
    handleJobTypeChange,
    applyFilters,
    resetFilters,
    setSelectedJob
  } = useJobListings();

  const {
    userLocation,
    setUserLocation,
    searchRadius,
    setSearchRadius,
    filteredJobs,
    isCalculating,
    showMap,
    setShowMap,
    calculateJobDistances
  } = useLocationFilter(jobs);

  // Use location-filtered jobs when user location is set, otherwise use pagination from useJobListings
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    // Scroll job into view if not visible
    const jobElement = document.getElementById(`job-${jobId}`);
    if (jobElement) {
      jobElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // Reset pagination when filters change
  const handleFiltersApplied = () => {
    setCurrentPage(1);
    applyFilters();
  };

  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  return (
    <div className="space-y-6 animate-fade-in">
      <JobVacancyHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* AI CV Builder Box */}
        <CVBuilderBox />
        
        {/* Job Listings Fetcher component */}
        <JobListingsFetcher />
      </div>

      {/* Location-based search */}
      <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20">
        <h2 className="text-xl font-medium mb-3">Find Jobs Near You</h2>
        <UserLocationInput 
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          searchRadius={searchRadius}
          setSearchRadius={setSearchRadius}
          onLocationConfirmed={calculateJobDistances}
        />
        {userLocation && showMap && (
          <div className="mt-3 flex justify-end">
            <div className="inline-flex rounded-md border border-elec-yellow/20 overflow-hidden">
              <Button 
                variant="ghost" 
                className={`px-3 py-1 ${viewMode === "list" ? "bg-elec-yellow/10" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-2" />
                List View
              </Button>
              <Button 
                variant="ghost" 
                className={`px-3 py-1 ${viewMode === "map" ? "bg-elec-yellow/10" : ""}`}
                onClick={() => setViewMode("map")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Map View
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Standard job filters */}
      <div className="space-y-5">
        <JobFilters
          locationFilter={locationFilter}
          jobTypeFilter={jobTypeFilter}
          locations={locations}
          jobTypes={jobTypes}
          isLoading={isLoading || isCalculating}
          handleLocationChange={handleLocationChange}
          handleJobTypeChange={handleJobTypeChange}
          applyFilters={handleFiltersApplied}
          resetFilters={() => {
            resetFilters();
            setCurrentPage(1);
          }}
        />

        {/* View Tabs (only shown when location search is active) */}
        {userLocation && showMap ? (
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "map")} className="w-full">
            <TabsContent value="list" className="mt-0">
              {/* Job listings grid */}
              <JobGrid 
                jobs={currentJobs}
                selectedJob={selectedJob}
                handleApply={handleApply}
                resetFilters={() => {
                  resetFilters();
                  setCurrentPage(1);
                }}
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
              {/* Map View */}
              <JobMap 
                jobs={filteredJobs}
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
            </TabsContent>
          </Tabs>
        ) : (
          <>
            {/* Standard Job Listings Grid (when not using location search) */}
            <JobGrid 
              jobs={currentJobs}
              selectedJob={selectedJob}
              handleApply={handleApply}
              resetFilters={() => {
                resetFilters();
                setCurrentPage(1);
              }}
              isLoading={isLoading || isCalculating}
            />

            {/* Pagination */}
            <JobPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          </>
        )}

        {/* Table view for large screens */}
        <JobTableView 
          jobs={filteredJobs} 
          selectedJob={selectedJob} 
          handleApply={handleApply} 
        />
      </div>
    </div>
  );
};

export default JobVacancies;
