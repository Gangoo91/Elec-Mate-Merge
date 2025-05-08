
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
        <div className="bg-gray-900 rounded-lg p-6 flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-2">Job Listings Automation</h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400">Total Job Listings</span>
                <span className="text-3xl font-bold text-amber-400">
                  {/* Dynamic number */}
                  <span className="animate-pulse">Live</span>
                </span>
              </div>
            </div>
            
            <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10">
              Update Now
            </Button>
          </div>
          
          <p className="text-sm text-gray-400 mt-auto">
            Jobs are automatically updated daily with the latest opportunities
          </p>
        </div>
      </div>
    </div>
  );
};

// Import Button for the component
const Button = ({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) => {
  return (
    <button className={`px-4 py-2 rounded-md ${className}`}>
      {children}
    </button>
  );
};

export default TopSection;
