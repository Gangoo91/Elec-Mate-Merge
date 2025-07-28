
import { useState } from "react";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import JobVacancyHeader from "@/components/job-vacancies/JobVacancyHeader";
import BasicJobSearch from "@/components/job-vacancies/BasicJobSearch";
import CVBuilderBox from "@/components/electrician-tools/CVBuilderBox";
import InterviewGuidanceTab from "@/components/job-vacancies/tabs/InterviewGuidanceTab";
import KnowingYourWorthTab from "@/components/job-vacancies/tabs/KnowingYourWorthTab";
import { useJobListings } from "@/hooks/job-vacancies/useJobListings";
import { Search, MessageCircle, PoundSterling } from "lucide-react";

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

      <DropdownTabs
        defaultValue="job-search"
        placeholder="Select section"
        tabs={[
          {
            value: "job-search",
            label: "Job Search",
            icon: Search,
            content: (
              <div className="space-y-6">
                {/* CV Builder - Full width at top */}
                <div className="w-full">
                  <CVBuilderBox />
                </div>

                {/* Basic Job Search - Simplified version */}
                <div className="w-full">
                  <BasicJobSearch />
                </div>
              </div>
            )
          },
          {
            value: "interview-guidance",
            label: "Interview Guidance",
            icon: MessageCircle,
            content: <InterviewGuidanceTab />
          },
          {
            value: "knowing-your-worth",
            label: "Know Your Worth",
            icon: PoundSterling,
            content: <KnowingYourWorthTab />
          }
        ]}
      />
    </div>
  );
};

export default JobVacancies;
