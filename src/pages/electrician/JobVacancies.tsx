
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobVacancyHeader from "@/components/job-vacancies/JobVacancyHeader";
import BasicJobSearch from "@/components/job-vacancies/BasicJobSearch";
import CVBuilderBox from "@/components/electrician-tools/CVBuilderBox";
import InterviewGuidanceTab from "@/components/job-vacancies/tabs/InterviewGuidanceTab";
import KnowingYourWorthTab from "@/components/job-vacancies/tabs/KnowingYourWorthTab";
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

      <Tabs defaultValue="job-search" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-elec-gray border-elec-yellow/20">
          <TabsTrigger 
            value="job-search" 
            className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            Job Search
          </TabsTrigger>
          <TabsTrigger 
            value="interview-guidance"
            className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            Interview Guidance
          </TabsTrigger>
          <TabsTrigger 
            value="knowing-your-worth"
            className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            Know Your Worth
          </TabsTrigger>
        </TabsList>

        <TabsContent value="job-search" className="space-y-6 mt-6">
          {/* CV Builder - Full width at top */}
          <div className="w-full">
            <CVBuilderBox />
          </div>

          {/* Basic Job Search - Simplified version */}
          <div className="w-full">
            <BasicJobSearch />
          </div>
        </TabsContent>

        <TabsContent value="interview-guidance" className="mt-6">
          <InterviewGuidanceTab />
        </TabsContent>

        <TabsContent value="knowing-your-worth" className="mt-6">
          <KnowingYourWorthTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobVacancies;
