import { useState } from "react";
import TopSection from "@/components/job-vacancies/TopSection";
import JobFilters from "@/components/job-vacancies/JobFilters";
import JobTableView from "@/components/job-vacancies/JobTableView";
import { useJobListings } from "@/hooks/job-vacancies/useJobListings";
import { useLocationFilter } from "@/hooks/job-vacancies/useLocationFilter";
import GoogleMapsLoader from "@/components/job-vacancies/GoogleMapsLoader";
import LocationSearchBox from "@/components/job-vacancies/LocationSearchBox";
import JobListingContent from "@/components/job-vacancies/JobListingContent";
import ReedJobsView from "@/components/job-vacancies/ReedJobsView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define a consistent JobListing interface to avoid type conflicts
export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  type: string;
  description: string;
  external_url: string;
  posted_date: string;
  source: string | null;
}

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
  } = useLocationFilter(jobs as JobListing[]);

  // Use location-filtered jobs when user location is set, otherwise use pagination from useJobListings
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [activeTab, setActiveTab] = useState<"database" | "reed">("database");

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

  return (
    <div className="space-y-6 animate-fade-in">
      <TopSection />

      <Tabs 
        defaultValue="database" 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "database" | "reed")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="database">Collected Listings</TabsTrigger>
          <TabsTrigger value="reed">Live Reed Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="database" className="mt-0">
          <GoogleMapsLoader>
            {/* Location-based search */}
            <LocationSearchBox 
              userLocation={userLocation}
              setUserLocation={setUserLocation}
              searchRadius={searchRadius}
              setSearchRadius={setSearchRadius}
              calculateJobDistances={calculateJobDistances}
              showMap={showMap}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

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

              <JobListingContent 
                userLocation={userLocation}
                showMap={showMap}
                viewMode={viewMode}
                setViewMode={setViewMode}
                currentJobs={currentJobs}
                selectedJob={selectedJob}
                handleApply={handleApply}
                resetFilters={() => {
                  resetFilters();
                  setCurrentPage(1);
                }}
                isLoading={isLoading}
                isCalculating={isCalculating}
                filteredJobs={filteredJobs}
                handleJobSelect={handleJobSelect}
                searchRadius={searchRadius}
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />

              {/* Table view for large screens */}
              <JobTableView 
                jobs={filteredJobs as JobListing[]} 
                selectedJob={selectedJob} 
                handleApply={handleApply} 
              />
            </div>
          </GoogleMapsLoader>
        </TabsContent>

        <TabsContent value="reed" className="mt-0">
          <ReedJobsView handleApply={handleApply} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobVacancies;
