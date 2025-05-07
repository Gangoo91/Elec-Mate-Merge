
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, ArrowLeft, FileText, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import CVBuilderBox from "@/components/electrician-tools/CVBuilderBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

// Job data would typically come from a database
const jobsData = [
  {
    id: 1,
    title: "Senior Electrical Engineer",
    company: "PowerTech Solutions",
    location: "London, UK",
    salary: "£45,000 - £55,000",
    type: "Full-time",
    description: "Looking for an experienced electrical engineer to join our growing team working on commercial projects.",
    applicationUrl: "https://powertech-solutions.co.uk/careers/senior-electrical-engineer",
    posted: "2025-05-01"
  },
  {
    id: 2,
    title: "Maintenance Electrician",
    company: "Industrial Facilities Ltd",
    location: "Manchester, UK",
    salary: "£32,000 - £38,000",
    type: "Full-time",
    description: "Maintenance role for qualified electrician with industrial experience. Regular hours with on-call rotation.",
    applicationUrl: "https://ind-facilities.co.uk/jobs/maintenance-electrician",
    posted: "2025-04-28"
  },
  {
    id: 3,
    title: "Electrical Apprentice",
    company: "City Sparks Electric",
    location: "Birmingham, UK",
    salary: "£18,000 - £22,000",
    type: "Apprenticeship",
    description: "Great opportunity for someone looking to start their career in the electrical trade with full training provided.",
    applicationUrl: "https://citysparkselectric.co.uk/apprenticeships",
    posted: "2025-05-03"
  },
  {
    id: 4,
    title: "Electrical Contracts Manager",
    company: "BuildRight Construction",
    location: "Bristol, UK",
    salary: "£58,000 - £65,000",
    type: "Full-time",
    description: "Experienced contracts manager needed to oversee multiple electrical installation projects across the southwest.",
    applicationUrl: "https://buildright-construction.co.uk/careers/electrical-contracts-manager",
    posted: "2025-04-15"
  },
  {
    id: 5,
    title: "Commercial Electrician",
    company: "Metro Electrical Services",
    location: "Leeds, UK",
    salary: "£35,000 - £40,000",
    type: "Full-time",
    description: "Commercial electrician needed for various projects throughout Leeds and surrounding areas. Must have experience with commercial installations.",
    applicationUrl: "https://metroelectrical.co.uk/jobs/commercial-electrician",
    posted: "2025-05-05"
  },
  {
    id: 6,
    title: "Electrical Testing Engineer",
    company: "SafetyFirst Electrical",
    location: "Glasgow, UK",
    salary: "£38,000 - £42,000",
    type: "Full-time",
    description: "Seeking qualified testing engineer to perform EICR and other electrical testing services for commercial and domestic properties.",
    applicationUrl: "https://safetyfirst-electrical.co.uk/careers/testing-engineer",
    posted: "2025-05-02"
  }
];

const JobVacancies = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all");
  const [jobs, setJobs] = useState(jobsData);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique locations for filter
  const locations = Array.from(new Set(jobsData.map(job => job.location)));
  
  // Get unique job types for filter
  const jobTypes = Array.from(new Set(jobsData.map(job => job.type)));

  const handleApply = (jobId: number, url: string) => {
    setSelectedJob(jobId);
    // Open external application URL in new tab
    window.open(url, '_blank');
    toast({
      title: "Application Started",
      description: "You've been redirected to the employer's application page.",
    });
  };

  const applyFilters = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      let filteredJobs = jobsData.filter(job => {
        const matchesLocation = locationFilter === "all" || job.location === locationFilter;
        const matchesType = jobTypeFilter === "all" || job.type === jobTypeFilter;
        return matchesLocation && matchesType;
      });
      
      setJobs(filteredJobs);
      setIsLoading(false);
    }, 500);
  };

  const resetFilters = () => {
    setLocationFilter("all");
    setJobTypeFilter("all");
    setJobs(jobsData);
  };

  const handleLocationChange = (value: string) => {
    setLocationFilter(value);
  };

  const handleJobTypeChange = (value: string) => {
    setJobTypeFilter(value);
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
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.length > 0 ? (
            jobs.map(job => (
              <Card key={job.id} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <div>
                      <div className="text-xl">{job.title}</div>
                      <div className="text-sm font-normal text-muted-foreground mt-1">{job.company}</div>
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
                      <div>{job.salary}</div>
                      <div className="font-medium">Posted:</div>
                      <div>{new Date(job.posted).toLocaleDateString()}</div>
                    </div>
                    <p className="text-sm">{job.description}</p>
                  </div>
                  <Button 
                    className={`w-full ${selectedJob === job.id ? "bg-green-700 hover:bg-green-600" : ""}`}
                    onClick={() => handleApply(job.id, job.applicationUrl)}
                  >
                    {selectedJob === job.id ? "Application Started" : "Apply Now"}
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

        <div className="flex justify-center mt-6">
          <Button variant="outline">Load More Jobs</Button>
        </div>
      </div>
    </div>
  );
};

export default JobVacancies;
