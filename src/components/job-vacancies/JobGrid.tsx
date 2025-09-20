
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import JobCard from "./JobCard";

interface JobListing {
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
  image_url?: string;
}

interface JobGridProps {
  jobs: JobListing[];
  selectedJob: string | null;
  handleApply: (jobId: string, url: string) => void;
  resetFilters: () => void;
  isLoading: boolean;
}

const JobGrid: React.FC<JobGridProps> = ({ 
  jobs, 
  selectedJob, 
  handleApply, 
  resetFilters,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-white/5 via-white/2 to-transparent border border-white/10 rounded-xl p-8 backdrop-blur-sm">
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-elec-yellow border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/5 via-white/2 to-transparent border border-white/10 rounded-xl p-8 text-center backdrop-blur-sm">
        <FileText className="h-16 w-16 text-white/40 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">No matching jobs found</h3>
        <p className="text-white/80 mt-1">Try adjusting your filters or check back later for new opportunities</p>
        <Button 
          onClick={resetFilters} 
          variant="outline" 
          className="mt-4 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
        >
          View All Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
      {jobs.map(job => (
        <JobCard
          key={job.id}
          job={job}
          selectedJob={selectedJob}
          handleApply={handleApply}
        />
      ))}
    </div>
  );
};

export default JobGrid;
