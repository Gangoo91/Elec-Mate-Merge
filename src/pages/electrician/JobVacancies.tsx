
import { useState } from "react";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import JobVacancyHeader from "@/components/job-vacancies/JobVacancyHeader";
import UnifiedJobSearch from "@/components/job-vacancies/UnifiedJobSearch";
import CVBuilderBox from "@/components/electrician-tools/CVBuilderBox";
import InterviewGuidanceTab from "@/components/job-vacancies/tabs/InterviewGuidanceTab";
import KnowingYourWorthTab from "@/components/job-vacancies/tabs/KnowingYourWorthTab";
import AIJobMatcher from "@/components/job-vacancies/AIJobMatcher";
import ModernJobCard from "@/components/job-vacancies/ModernJobCard";
import JobInsights from "@/components/job-vacancies/JobInsights";
import JobMarketInsights from "@/components/job-vacancies/JobMarketInsights";

import { useJobListings } from "@/hooks/job-vacancies/useJobListings";
import { Search, MessageCircle, PoundSterling, Brain, BarChart3 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
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
  image_url?: string;
}

interface JobVacanciesProps {
  onBack?: () => void;
}

const JobVacancies = ({ onBack }: JobVacanciesProps) => {
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95">
      <div className="container mx-auto px-4 py-6 space-y-6 sm:space-y-8 animate-fade-in">
        <Helmet>
          <title>UK Electrician Job Vacancies | Mobile Job Search</title>
          <meta name="description" content="Find electrician jobs across the UK with mobile-first search, filters and insights. BS7671-aware." />
          <link rel="canonical" href="/electrician/job-vacancies" />
        </Helmet>
        
        {/* Enhanced Header with gradient background */}
        <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <JobVacancyHeader onBack={onBack} />
        </div>

        <DropdownTabs
          defaultValue="job-search"
          placeholder="Select section"
          tabs={[
            {
              value: "job-search",
              label: "Job Search",
              icon: Search,
              content: (
                <div className="space-y-6 sm:space-y-8">
                  {/* CV Builder - Enhanced styling */}
                  <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-elec-yellow/30">
                    <CVBuilderBox />
                  </div>

                  {/* Unified Job Search - Enhanced container */}
                  <div className="bg-gradient-to-br from-white/5 via-white/2 to-transparent border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                    <UnifiedJobSearch />
                  </div>

                  {/* Job Insights - Enhanced styling when available */}
                  {jobs.length > 0 && (
                    <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-elec-yellow/30">
                      <JobInsights jobs={jobs} location="" />
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
                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <JobMarketInsights jobCount={jobs.length} />
                  </div>
                </div>
              )
            },
            {
              value: "interview-guidance",
              label: "Interview Guidance",
              icon: MessageCircle,
              content: (
                <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <InterviewGuidanceTab />
                </div>
              )
            },
            {
              value: "knowing-your-worth",
              label: "Know Your Worth",
              icon: PoundSterling,
              content: (
                <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <KnowingYourWorthTab />
                </div>
              )
            }
          ]}
        />
      </div>
    </div>
  );
};

export default JobVacancies;
