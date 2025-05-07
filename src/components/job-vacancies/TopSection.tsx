
import React from "react";
import JobVacancyHeader from "./JobVacancyHeader";
import CVBuilderBox from "@/components/electrician-tools/CVBuilderBox";
import JobListingsFetcher from "@/components/electrician-tools/JobListingsFetcher";

const TopSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <JobVacancyHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* AI CV Builder Box */}
        <CVBuilderBox />
        
        {/* Job Listings Fetcher component */}
        <JobListingsFetcher />
      </div>
    </div>
  );
};

export default TopSection;
