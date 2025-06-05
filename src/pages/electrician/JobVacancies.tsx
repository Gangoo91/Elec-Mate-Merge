
import { useState } from "react";
import JobVacancyHeader from "@/components/job-vacancies/JobVacancyHeader";
import SimpleJobSearch from "@/components/job-vacancies/SimpleJobSearch";
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - Job Search */}
        <div className="lg:col-span-3">
          <SimpleJobSearch />
        </div>

        {/* Sidebar - CV Builder */}
        <div className="lg:col-span-1">
          <CVBuilderBox />
        </div>
      </div>
    </div>
  );
};

export default JobVacancies;
