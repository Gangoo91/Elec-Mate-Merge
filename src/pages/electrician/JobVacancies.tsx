
import { useState } from "react";
import JobVacancyHeader from "@/components/job-vacancies/JobVacancyHeader";
import JobListingsFetcher from "@/components/electrician-tools/JobListingsFetcher";
import CVBuilderBox from "@/components/electrician-tools/CVBuilderBox";
import JobFilters from "@/components/job-vacancies/JobFilters";
import JobGrid from "@/components/job-vacancies/JobGrid";
import JobTableView from "@/components/job-vacancies/JobTableView";
import JobPagination from "@/components/job-vacancies/JobPagination";
import { useJobListings } from "@/hooks/job-vacancies/useJobListings";

const JobVacancies = () => {
  const { 
    jobs,
    currentJobs,
    isLoading,
    selectedJob, 
    locationFilter,
    jobTypeFilter,
    locations,
    jobTypes,
    currentPage,
    totalPages,
    handleApply,
    handleLocationChange,
    handleJobTypeChange,
    applyFilters,
    resetFilters,
    paginate
  } = useJobListings();

  return (
    <div className="space-y-6 animate-fade-in">
      <JobVacancyHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* AI CV Builder Box */}
        <CVBuilderBox />
        
        {/* Job Listings Fetcher component */}
        <JobListingsFetcher />
      </div>

      <div className="space-y-5 mt-2">
        <JobFilters
          locationFilter={locationFilter}
          jobTypeFilter={jobTypeFilter}
          locations={locations}
          jobTypes={jobTypes}
          isLoading={isLoading}
          handleLocationChange={handleLocationChange}
          handleJobTypeChange={handleJobTypeChange}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />

        {/* Job listings grid */}
        <JobGrid 
          jobs={currentJobs}
          selectedJob={selectedJob}
          handleApply={handleApply}
          resetFilters={resetFilters}
          isLoading={isLoading}
        />

        {/* Pagination */}
        <JobPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />

        {/* Table view for large screens */}
        <JobTableView 
          jobs={jobs} 
          selectedJob={selectedJob} 
          handleApply={handleApply} 
        />
      </div>
    </div>
  );
};

export default JobVacancies;
