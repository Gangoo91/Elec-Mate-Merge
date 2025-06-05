
import { useState } from "react";
import TopSection from "@/components/job-vacancies/TopSection";
import JobFilters from "@/components/job-vacancies/JobFilters";
import JobTableView from "@/components/job-vacancies/JobTableView";
import { useJobListings } from "@/hooks/job-vacancies/useJobListings";
import { useLocationFilter } from "@/hooks/job-vacancies/useLocationFilter";
import GoogleMapsLoader from "@/components/job-vacancies/GoogleMapsLoader";
import LocationSearchBox from "@/components/job-vacancies/LocationSearchBox";
import JobListingContent from "@/components/job-vacancies/JobListingContent";
import EnhancedReedJobsView from "@/components/job-vacancies/EnhancedReedJobsView";
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
  expires_at?: string | null;
  is_remote?: boolean;
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
  const [activeTab, setActiveTab] = useState<"live" | "database">("live");

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
        defaultValue="live" 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "live" | "database")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="live" className="text-base py-3">
            ⚡ Rapid Live Job Search
          </TabsTrigger>
          <TabsTrigger value="database" className="text-base py-3">
            📊 Saved Job Listings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-0">
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 mb-1">🇬🇧 UK-Focused Job Search</h3>
            <p className="text-xs text-green-700">
              Rapid search across UK electrical jobs with AI-powered insights and instant results
            </p>
          </div>
          <EnhancedReedJobsView handleApply={handleApply} />
        </TabsContent>

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
      </Tabs>
    </div>
  );
};

export default JobVacancies;
