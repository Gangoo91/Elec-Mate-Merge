
import { useState } from "react";
import JobVacancyHeader from "@/components/job-vacancies/JobVacancyHeader";
import BasicJobSearch from "@/components/job-vacancies/BasicJobSearch";
import CVBuilderBox from "@/components/electrician-tools/CVBuilderBox";
import { useJobListings } from "@/hooks/job-vacancies/useJobListings";

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
  const { handleApply } = useJobListings();

  return (
    <div className="space-y-6 animate-fade-in">
      <JobVacancyHeader />

      {/* CV Builder - Full width at top */}
      <div className="w-full">
        <CVBuilderBox />
      </div>

      {/* Basic Job Search - Simplified version */}
      <div className="w-full">
        <BasicJobSearch />
      </div>
    </div>
  );
};

export default JobVacancies;
