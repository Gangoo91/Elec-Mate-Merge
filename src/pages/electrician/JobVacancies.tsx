import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, ArrowLeft, FileText, Filter, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import CVBuilderBox from "@/components/electrician-tools/CVBuilderBox";
import JobListingsFetcher from "@/components/electrician-tools/JobListingsFetcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

const JobVacancies = () => {
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

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-elec-yellow" />
            Job Vacancies
          </h1>
          <p className="text-muted-foreground">
            Find the latest electrical job opportunities
          </p>
        </div>
        <Link to="/electrician/toolbox-talk">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
          </Button>
        </Link>
      </div>

      {/* Add the Job Listings Fetcher component */}
      <JobListingsFetcher />

      {/* AI CV Builder Box */}
      <CVBuilderBox />

      <div className="space-y-4">
        <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 mb-6">
          <h2 className="text-xl font-medium mb-2">Looking for qualified electricians</h2>
          <p>
            Browse our curated list of electrical jobs from trusted employers across the UK. 
            New positions are added daily, so check back often for the latest opportunities.
          </p>
          
          {/* Filters */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Location</label>
              <Select value={locationFilter} onValueChange={handleLocationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Job Type</label>
              <Select value={jobTypeFilter} onValueChange={handleJobTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {jobTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end gap-2">
              <Button 
                onClick={applyFilters} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={isLoading}
              >
                <Filter className="h-4 w-4 mr-2" />
                {isLoading ? "Filtering..." : "Apply Filters"}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="border-elec-yellow/20"
                disabled={isLoading}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-elec-yellow border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* Job listings grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentJobs.length > 0 ? (
              currentJobs.map(job => (
                <Card key={job.id} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <div>
                        <div className="text-xl">{job.title}</div>
                        <div className="text-sm font-normal text-muted-foreground mt-1">
                          {job.company}
                          {job.source && (
                            <span className="ml-2 text-xs text-elec-yellow">via {job.source}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
                        {job.type}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div className="font-medium">Location:</div>
                        <div>{job.location}</div>
                        <div className="font-medium">Salary:</div>
                        <div>{job.salary || "Not specified"}</div>
                        <div className="font-medium">Posted:</div>
                        <div>{new Date(job.posted_date).toLocaleDateString()}</div>
                      </div>
                      <p className="text-sm">{job.description}</p>
                    </div>
                    <Button 
                      className={`w-full flex items-center justify-center gap-2 ${selectedJob === job.id ? "bg-green-700 hover:bg-green-600" : ""}`}
                      onClick={() => handleApply(job.id, job.external_url)}
                    >
                      {selectedJob === job.id ? "Application Started" : "Apply Now"}
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 p-8 text-center border border-dashed border-elec-yellow/20 rounded-lg">
                <FileText className="h-12 w-12 text-elec-yellow/50 mx-auto mb-3" />
                <h3 className="text-lg font-medium">No matching jobs found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters or check back later for new opportunities</p>
                <Button onClick={resetFilters} variant="outline" className="mt-4">
                  View All Jobs
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && jobs.length > jobsPerPage && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                
                // Show first page, current page, last page, and one page before and after current
                if (
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink 
                        isActive={currentPage === pageNum}
                        onClick={() => paginate(pageNum)}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                
                // Show ellipsis for gaps
                if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return (
                    <PaginationItem key={`ellipsis-${pageNum}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* Table view for large screens */}
        <div className="hidden lg:block mt-8 overflow-hidden">
          <h2 className="text-xl font-medium mb-4">All Available Positions</h2>
          <div className="border rounded-lg border-elec-yellow/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.length > 0 ? (
                  jobs.map(job => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>{job.salary || "Not specified"}</TableCell>
                      <TableCell>{new Date(job.posted_date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          className={`${selectedJob === job.id ? "bg-green-700 hover:bg-green-600" : ""}`}
                          onClick={() => handleApply(job.id, job.external_url)}
                        >
                          {selectedJob === job.id ? "Started" : "Apply"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No job listings found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobVacancies;
