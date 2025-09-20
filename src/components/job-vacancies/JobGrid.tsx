
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
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-elec-yellow border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-elec-yellow/20 rounded-lg">
        <FileText className="h-12 w-12 text-elec-yellow/50 mx-auto mb-3" />
        <h3 className="text-lg font-medium">No matching jobs found</h3>
        <p className="text-muted-foreground mt-1">Try adjusting your filters or check back later for new opportunities</p>
        <Button onClick={resetFilters} variant="outline" className="mt-4">
          View All Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
