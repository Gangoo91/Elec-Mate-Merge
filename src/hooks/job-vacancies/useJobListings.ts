
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
}

export const useJobListings = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all");
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    fetchJobListings();
  }, []);

  const fetchJobListings = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from("job_listings")
        .select("*")
        .order("posted_date", { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setJobs(data);
        
        // Extract unique locations and job types for filters
        const uniqueLocations = Array.from(new Set(data.map(job => job.location)));
        const uniqueJobTypes = Array.from(new Set(data.map(job => job.type)));
        
        setLocations(uniqueLocations);
        setJobTypes(uniqueJobTypes);
      }
    } catch (error) {
      console.error("Error fetching job listings:", error);
      toast({
        title: "Error",
        description: "Failed to load job listings. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (jobId: string, url: string) => {
    setSelectedJob(jobId);
    // Open external application URL in new tab
    window.open(url, '_blank');
    toast({
      title: "Application Started",
      description: "You've been redirected to the employer's application page.",
    });
  };

  const applyFilters = async () => {
    setIsLoading(true);
    
    try {
      let query = supabase
        .from("job_listings")
        .select("*");
      
      if (locationFilter !== "all") {
        query = query.eq("location", locationFilter);
      }
      
      if (jobTypeFilter !== "all") {
        query = query.eq("type", jobTypeFilter);
      }
      
      const { data, error } = await query.order("posted_date", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setJobs(data || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering job listings:", error);
      toast({
        title: "Error",
        description: "Failed to filter job listings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setLocationFilter("all");
    setJobTypeFilter("all");
    fetchJobListings();
    setCurrentPage(1);
  };

  const handleLocationChange = (value: string) => {
    setLocationFilter(value);
  };

  const handleJobTypeChange = (value: string) => {
    setJobTypeFilter(value);
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  
  return {
    jobs,
    currentJobs,
    isLoading,
    selectedJob, 
    locationFilter,
    jobTypeFilter,
    locations,
    jobTypes,
    currentPage,
    totalPages,
    handleApply,
    handleLocationChange,
    handleJobTypeChange,
    applyFilters,
    resetFilters,
    paginate
  };
};
