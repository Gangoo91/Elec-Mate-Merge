
import { useState } from "react";
import JobVacancyHeader from "@/components/job-vacancies/JobVacancyHeader";
import IntelligentJobSearch from "@/components/job-vacancies/IntelligentJobSearch";
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

      <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
        <h3 className="text-sm font-medium text-green-800 mb-1 flex items-center gap-2">
          🚀 AI-Powered Multi-Site Job Search
        </h3>
        <p className="text-xs text-green-700">
          Search across Reed, Indeed, Totaljobs and more with AI-generated queries and smart matching
        </p>
      </div>

      <IntelligentJobSearch />
    </div>
  );
};

export default JobVacancies;
