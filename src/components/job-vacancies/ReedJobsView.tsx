
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobGrid from "./JobGrid";
import JobPagination from "./JobPagination";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Search, MapPin } from "lucide-react";
import { JobListing } from "@/pages/electrician/JobVacancies";
import SearchError from "@/components/mental-health/crisis/components/SearchError";

interface ReedJobsViewProps {
  handleApply: (jobId: string, url: string) => void;
}

const ReedJobsView: React.FC<ReedJobsViewProps> = ({ handleApply }) => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [keywords, setKeywords] = useState("electrical,electrician,electrical engineer");
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchReedJobs = async (page: number = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('reed-job-listings', {
        body: { 
          keywords,
          location,
          page,
          permanent: true,
          fullTime: true
        },
      });
      
      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);
      
      setJobs(data.jobs);
      setTotalResults(data.totalResults);
      setTotalPages(Math.ceil(data.totalResults / 100));
      setCurrentPage(data.currentPage);
      
      if (data.jobs.length === 0) {
        toast({
          title: "No jobs found",
          description: "Try adjusting your search criteria",
        });
      } else {
        toast({
          title: "Jobs loaded",
          description: `Found ${data.totalResults} electrical jobs`,
        });
      }
      
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(error instanceof Error ? error.message : "Failed to get job listings");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get job listings",
        variant: "destructive",
      });
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReedJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchReedJobs(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchReedJobs(page);
    window.scrollTo(0, 0);
  };

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    // Scroll job into view if not visible
    const jobElement = document.getElementById(`job-${jobId}`);
    if (jobElement) {
      jobElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-elec-gray p-4 rounded-lg shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Job keywords (e.g., Electrician, Engineer, Technician)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="pl-10"
              aria-label="Search keywords"
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Location (e.g., London, Manchester)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
              aria-label="Search location"
            />
          </div>
          <Button 
            type="submit" 
            className="md:w-auto flex-shrink-0" 
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search Jobs"}
          </Button>
        </form>
      </div>

      {error && <SearchError error={error} />}

      {totalResults > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {jobs.length} of {totalResults} jobs
            {location && ` in ${location}`}
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setKeywords("electrical,electrician,electrical engineer");
              setLocation("");
              setCurrentPage(1);
              fetchReedJobs(1);
            }}
            className="text-xs"
          >
            Reset Search
          </Button>
        </div>
      )}

      <JobGrid 
        jobs={jobs} 
        selectedJob={selectedJob} 
        handleApply={(jobId, url) => {
          handleJobSelect(jobId);
          handleApply(jobId, url);
        }}
        resetFilters={() => {
          setKeywords("electrical,electrician,electrical engineer");
          setLocation("");
          setCurrentPage(1);
          fetchReedJobs(1);
        }}
        isLoading={isLoading}
      />

      {totalPages > 1 && (
        <JobPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={handlePageChange}
        />
      )}
    </div>
  );
};

export default ReedJobsView;
