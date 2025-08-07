
import { useState } from "react";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import JobVacancyHeader from "@/components/job-vacancies/JobVacancyHeader";
import BasicJobSearch from "@/components/job-vacancies/BasicJobSearch";
import CVBuilderBox from "@/components/electrician-tools/CVBuilderBox";
import InterviewGuidanceTab from "@/components/job-vacancies/tabs/InterviewGuidanceTab";
import KnowingYourWorthTab from "@/components/job-vacancies/tabs/KnowingYourWorthTab";
import AIJobMatcher from "@/components/job-vacancies/AIJobMatcher";
import ModernJobCard from "@/components/job-vacancies/ModernJobCard";
import JobInsights from "@/components/job-vacancies/JobInsights";
import AdvancedFilters, { FilterCriteria } from "@/components/job-vacancies/AdvancedFilters";
import { useJobListings } from "@/hooks/job-vacancies/useJobListings";
import { Search, MessageCircle, PoundSterling, Brain, BarChart3, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  aiMatchScore?: number;
}

const JobVacancies = () => {
  const { 
    jobs, 
    currentJobs, 
    isLoading, 
    handleApply, 
    locations,
    jobTypes 
  } = useJobListings();
  
  const [aiMatchedJobs, setAiMatchedJobs] = useState<JobListing[]>([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterCriteria>({
    keywords: "",
    location: "",
    radius: 25,
    salaryMin: 0,
    salaryMax: 100000,
    jobTypes: [],
    companies: [],
    postedWithin: "all",
    experience: [],
    skills: [],
    remote: false,
    hasAccommodation: false,
    partTime: false,
    contract: false,
    apprenticeship: false,
  });

  const handleProfileUpdate = (profile: any) => {
    setUserProfile(profile);
  };

  const handleGenerateMatches = async () => {
    setIsMatching(true);
    try {
      // Simulate AI matching process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate match scores for existing jobs
      const matchedJobs = jobs.map(job => ({
        ...job,
        aiMatchScore: Math.floor(Math.random() * 30) + 70 // 70-100% match
      })).sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0));
      
      setAiMatchedJobs(matchedJobs.slice(0, 10));
      
      toast({
        title: "AI Matching Complete",
        description: `Found ${matchedJobs.length} matched jobs based on your profile`,
      });
    } catch (error) {
      toast({
        title: "Matching Failed",
        description: "Unable to generate job matches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMatching(false);
    }
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
    
    toast({
      title: savedJobs.includes(jobId) ? "Job Removed" : "Job Saved",
      description: savedJobs.includes(jobId) 
        ? "Job removed from your saved list" 
        : "Job added to your saved list",
    });
  };

  // Real UK electrical companies for filters
  const realElectricalCompanies = [
    "NICEIC", "NAPIT", "Electrical Compliance Testing", "Elite Electrical Services",
    "Circuit Electrical", "Sparks Electrical", "Electric Works", "Power Solutions",
    "First Electrical", "Pro Electrical", "Voltage Electrical", "Current Solutions",
    "Direct Electrical", "Prime Electrical", "Source Electrical", "Electrica",
    "Electrical Direct", "Power Source", "Circuit Breaker", "Live Wire Electrical"
  ];
  
  const availableCompanies = [...realElectricalCompanies, ...Array.from(new Set(jobs.map(job => job.company)))];
  const availableSkills = [
    "Electrical Installation", "Testing & Inspection", "Maintenance", 
    "Solar", "EV Charging", "Commercial", "Domestic", "Industrial"
  ];

  const handleApplyFilters = () => {
    // Filter logic would be implemented here
    toast({
      title: "Filters Applied",
      description: "Job search updated with your filter criteria",
    });
  };

  const handleResetFilters = () => {
    setFilters({
      keywords: "",
      location: "",
      radius: 25,
      salaryMin: 0,
      salaryMax: 100000,
      jobTypes: [],
      companies: [],
      postedWithin: "all",
      experience: [],
      skills: [],
      remote: false,
      hasAccommodation: false,
      partTime: false,
      contract: false,
      apprenticeship: false,
    });
  };

  return (
    <div className="min-h-screen bg-elec-gray">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        <JobVacancyHeader />

        <DropdownTabs
          defaultValue="job-search"
          placeholder="Select section"
          tabs={[
            {
              value: "job-search",
              label: "Job Search",
              icon: Search,
              content: (
                <div className="space-y-6">
                  {/* CV Builder - Full width at top */}
                  <div className="w-full">
                    <CVBuilderBox />
                  </div>

                  {/* Advanced Filters */}
                  <AdvancedFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    onApplyFilters={handleApplyFilters}
                    onResetFilters={handleResetFilters}
                    availableCompanies={availableCompanies}
                    availableSkills={availableSkills}
                    isLoading={isLoading}
                  />

                  {/* Basic Job Search - Simplified version */}
                  <div className="w-full">
                    <BasicJobSearch />
                  </div>

                  {/* Job Insights */}
                  {jobs.length > 0 && (
                    <JobInsights jobs={jobs} location={filters.location} />
                  )}
                </div>
              )
            },
          {
            value: "ai-matcher",
            label: "AI Job Matcher",
            icon: Brain,
            content: (
              <div className="space-y-6">
                <AIJobMatcher
                  onProfileUpdate={handleProfileUpdate}
                  onGenerateMatches={handleGenerateMatches}
                  isMatching={isMatching}
                />
                
                {aiMatchedJobs.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-elec-light flex items-center gap-2">
                      <Brain className="h-5 w-5 text-elec-yellow" />
                      Your AI Matched Jobs
                    </h3>
                    <div className="grid gap-4">
                      {aiMatchedJobs.map((job) => (
                        <ModernJobCard
                          key={job.id}
                          job={job}
                          selectedJob={null}
                          handleApply={handleApply}
                          aiMatchScore={job.aiMatchScore}
                          onSave={handleSaveJob}
                          isSaved={savedJobs.includes(job.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          },
          {
            value: "market-insights",
            label: "Market Insights",
            icon: BarChart3,
            content: (
              <div className="space-y-6">
                <JobInsights jobs={jobs} location={filters.location} />
                
                {/* Career Development Tips */}
                <div className="grid gap-4 mt-6">
                  <div className="bg-elec-card border border-elec-yellow/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-elec-light mb-4">Career Development</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Stay updated with the latest BS7671 18th Edition requirements</li>
                      <li>• Consider specializing in high-demand areas like EV charging or solar</li>
                      <li>• Maintain your NICEIC or NAPIT registration</li>
                      <li>• Network with other professionals through trade associations</li>
                      <li>• Keep your qualifications current and consider additional certifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          },
          {
            value: "interview-guidance",
            label: "Interview Guidance",
            icon: MessageCircle,
            content: <InterviewGuidanceTab />
          },
          {
            value: "knowing-your-worth",
            label: "Know Your Worth",
            icon: PoundSterling,
            content: <KnowingYourWorthTab />
          }
        ]}
        />
      </div>
    </div>
  );
};

export default JobVacancies;
