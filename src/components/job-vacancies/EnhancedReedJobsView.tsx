
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import EnhancedJobCard from "./EnhancedJobCard";
import JobPagination from "./JobPagination";
import EnhancedJobSearch from "./EnhancedJobSearch";
import AIJobInsights from "./AIJobInsights";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, TrendingUp } from "lucide-react";

interface EnhancedJobListing {
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
  // AI enhancements
  relevanceScore?: number;
  aiTags?: string[];
  skillsRequired?: string[];
  experienceLevel?: string;
  salaryCompetitiveness?: 'low' | 'average' | 'high';
  careerProgression?: string;
  estimatedSalaryMin?: number;
  estimatedSalaryMax?: number;
}

interface SearchFilters {
  keywords: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: string;
  salaryMax: string;
  skills: string[];
  aiEnhanced: boolean;
}

interface EnhancedReedJobsViewProps {
  handleApply: (jobId: string, url: string) => void;
}

const EnhancedReedJobsView: React.FC<EnhancedReedJobsViewProps> = ({ handleApply }) => {
  const [jobs, setJobs] = useState<EnhancedJobListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [suggestedSkills] = useState([
    "18th Edition", "PAT Testing", "EICR", "NICEIC", "JIB Card",
    "Emergency Lighting", "Fire Alarms", "Solar PV", "EV Charging",
    "Industrial Wiring", "Domestic Installation", "Commercial"
  ]);

  const fetchReedJobs = async (filters: SearchFilters, page: number = 1) => {
    setIsLoading(true);
    setAiInsights(null);
    
    try {
      // Build Reed API request
      const reedRequest = {
        keywords: filters.keywords,
        location: filters.location,
        page,
        permanent: filters.jobType === 'full-time' || !filters.jobType,
        temp: filters.jobType === 'contract',
        fullTime: filters.jobType === 'full-time' || !filters.jobType,
        partTime: filters.jobType === 'part-time'
      };
      
      const { data, error } = await supabase.functions.invoke('reed-job-listings', {
        body: reedRequest,
      });
      
      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);
      
      let fetchedJobs = data.jobs;
      setTotalResults(data.totalResults);
      setTotalPages(Math.ceil(data.totalResults / 100));
      setCurrentPage(data.currentPage);
      
      // Apply client-side filtering for advanced filters
      if (filters.salaryMin || filters.salaryMax || filters.skills.length > 0) {
        fetchedJobs = fetchedJobs.filter((job: any) => {
          // Salary filtering
          if (filters.salaryMin || filters.salaryMax) {
            const salaryText = job.salary || '';
            const salaryNumbers = salaryText.match(/\d+/g);
            if (salaryNumbers && salaryNumbers.length > 0) {
              const minSalary = parseInt(salaryNumbers[0]);
              if (filters.salaryMin && minSalary < parseInt(filters.salaryMin)) return false;
              if (filters.salaryMax && minSalary > parseInt(filters.salaryMax)) return false;
            }
          }
          
          // Skills filtering
          if (filters.skills.length > 0) {
            const jobText = (job.title + ' ' + job.description).toLowerCase();
            return filters.skills.some(skill => 
              jobText.includes(skill.toLowerCase())
            );
          }
          
          return true;
        });
      }
      
      setJobs(fetchedJobs);
      
      // AI Enhancement
      if (filters.aiEnhanced && fetchedJobs.length > 0) {
        setIsAIProcessing(true);
        try {
          const aiResponse = await supabase.functions.invoke('ai-job-aggregator', {
            body: {
              jobs: fetchedJobs,
              userPreferences: {
                experienceLevel: filters.experienceLevel,
                skills: filters.skills,
                jobType: filters.jobType
              },
              searchQuery: filters.keywords
            },
          });
          
          if (aiResponse.data && !aiResponse.error) {
            setJobs(aiResponse.data.enhancedJobs || fetchedJobs);
            setAiInsights(aiResponse.data.aiInsights);
            
            toast({
              title: "AI Enhancement Complete",
              description: `Enhanced ${aiResponse.data.enhancedJobs?.length || 0} jobs with AI insights`,
            });
          }
        } catch (aiError) {
          console.warn('AI enhancement failed:', aiError);
          toast({
            title: "AI Enhancement Unavailable",
            description: "Showing standard job listings",
            variant: "destructive",
          });
        } finally {
          setIsAIProcessing(false);
        }
      }
      
      if (fetchedJobs.length === 0) {
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
    // Initial load with default search
    fetchReedJobs({
      keywords: "electrical,electrician,electrical engineer",
      location: "",
      jobType: "",
      experienceLevel: "",
      salaryMin: "",
      salaryMax: "",
      skills: [],
      aiEnhanced: true
    });
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    setCurrentPage(1);
    fetchReedJobs(filters, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Re-run search with current filters for the new page
    const currentFilters = {
      keywords: "electrical,electrician,electrical engineer",
      location: "",
      jobType: "",
      experienceLevel: "",
      salaryMin: "",
      salaryMax: "",
      skills: [],
      aiEnhanced: true
    };
    fetchReedJobs(currentFilters, page);
    window.scrollTo(0, 0);
  };

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    const jobElement = document.getElementById(`job-${jobId}`);
    if (jobElement) {
      jobElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Search */}
      <EnhancedJobSearch 
        onSearch={handleSearch}
        isLoading={isLoading}
        suggestedSkills={suggestedSkills}
        totalResults={totalResults}
      />

      {/* AI Processing Indicator */}
      {isAIProcessing && (
        <Card className="border-elec-yellow/20 bg-elec-yellow/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-elec-yellow">
              <Brain className="h-5 w-5 animate-pulse" />
              <div>
                <p className="font-medium">AI Enhancement in Progress</p>
                <p className="text-sm text-muted-foreground">
                  Analyzing jobs and generating insights...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      {aiInsights && (
        <AIJobInsights insights={aiInsights} isLoading={isAIProcessing} />
      )}

      {/* Job Listings */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <EnhancedJobCard
              key={job.id}
              job={job}
              selectedJob={selectedJob}
              handleApply={(jobId, url) => {
                handleJobSelect(jobId);
                handleApply(jobId, url);
              }}
              isAIEnhanced={!!job.relevanceScore}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center border-dashed border-elec-yellow/20">
          <Zap className="h-12 w-12 text-elec-yellow/50 mx-auto mb-3" />
          <h3 className="text-lg font-medium">No jobs found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search criteria or check back later for new opportunities
          </p>
        </Card>
      )}

      {/* Pagination */}
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

export default EnhancedReedJobsView;
