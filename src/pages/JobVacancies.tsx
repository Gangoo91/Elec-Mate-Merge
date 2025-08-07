
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  MapPin, 
  Brain, 
  Star, 
  Settings,
  Loader2,
  Sparkles
} from "lucide-react";
import BasicJobSearch from "@/components/job-vacancies/BasicJobSearch";
import ModernJobCard from "@/components/job-vacancies/ModernJobCard";
import { useJobListings } from "@/hooks/job-vacancies/useJobListings";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  experience: string;
  skills: string[];
  certifications: string[];
  preferredLocation: string;
  preferredSalary: string;
  jobTypes: string[];
  workMode: string[];
}

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
  aiMatchScore?: number;
}

const JobVacancies = () => {
  const { 
    jobs, 
    isLoading, 
    handleApply
  } = useJobListings();
  
  const [aiEnhancedJobs, setAiEnhancedJobs] = useState<JobListing[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    experience: "",
    skills: [],
    certifications: [],
    preferredLocation: "",
    preferredSalary: "",
    jobTypes: [],
    workMode: []
  });
  const [isMatching, setIsMatching] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showAIProfile, setShowAIProfile] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const commonSkills = [
    "Electrical Installation",
    "Testing & Inspection", 
    "18th Edition",
    "PAT Testing",
    "EICR",
    "Solar Installation",
    "EV Charging",
    "Commercial Electrical",
    "Domestic Electrical",
    "Industrial Electrical",
    "Maintenance",
    "Fault Finding"
  ];

  const handleGenerateMatches = async () => {
    if (!jobs.length) {
      toast({
        title: "No jobs available",
        description: "Search for jobs first to get AI matches",
        variant: "destructive"
      });
      return;
    }

    if (!userProfile.skills.length && !userProfile.experience) {
      toast({
        title: "Profile incomplete",
        description: "Please add some skills or experience for better matching",
        variant: "destructive"
      });
      return;
    }

    setIsMatching(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-job-aggregator', {
        body: {
          jobs: jobs.slice(0, 20), // Limit for better performance
          userPreferences: userProfile,
          searchQuery: `${userProfile.skills.join(', ')} ${userProfile.experience}`
        }
      });

      if (error) throw error;

      const enhancedJobs = data.enhancedJobs || [];
      
      // Sort by match score
      const sortedJobs = enhancedJobs
        .filter((job: any) => job.relevanceScore && job.relevanceScore > 50)
        .sort((a: any, b: any) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
        .map((job: any) => ({
          ...job,
          aiMatchScore: job.relevanceScore
        }));

      setAiEnhancedJobs(sortedJobs);
      
      toast({
        title: "AI Matching Complete",
        description: `Found ${sortedJobs.length} jobs that match your profile`,
        variant: "success"
      });

    } catch (error) {
      console.error('AI matching error:', error);
      toast({
        title: "AI Matching Failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsMatching(false);
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !userProfile.skills.includes(skillInput.trim())) {
      setUserProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skill: string) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Job Vacancies - AI-Enhanced Job Search</title>
        <meta name="description" content="Find electrical jobs with AI-powered matching and personalised recommendations" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Brain className="h-8 w-8 text-elec-yellow" />
            Job Vacancies
          </h1>
          <p className="text-muted-foreground">
            Find electrical jobs with AI-powered matching and personalised recommendations
          </p>
        </div>

        {/* AI Profile Setup */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-elec-yellow" />
                AI Job Matching
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIProfile(!showAIProfile)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showAIProfile && (
              <div className="space-y-4 mb-6 p-4 border border-elec-yellow/20 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-elec-yellow">Experience Level</label>
                    <Input
                      placeholder="e.g. 5 years commercial electrical"
                      value={userProfile.experience}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, experience: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-elec-yellow">Preferred Location</label>
                    <Input
                      placeholder="e.g. London, Birmingham"
                      value={userProfile.preferredLocation}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, preferredLocation: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-elec-yellow">Skills</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Add a skill..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd()}
                    />
                    <Button onClick={handleSkillAdd} variant="outline" size="sm">
                      Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {commonSkills.map(skill => (
                      <Badge
                        key={skill}
                        variant={userProfile.skills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (userProfile.skills.includes(skill)) {
                            handleSkillRemove(skill);
                          } else {
                            setUserProfile(prev => ({ ...prev, skills: [...prev.skills, skill] }));
                          }
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {userProfile.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {userProfile.skills.map(skill => (
                        <Badge
                          key={skill}
                          className="bg-elec-yellow text-elec-dark"
                        >
                          {skill}
                          <button
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-2 text-xs hover:text-red-600"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button 
              onClick={handleGenerateMatches}
              disabled={isMatching}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              {isMatching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating AI Matches...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Generate AI Job Matches
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Enhanced Jobs */}
        {aiEnhancedJobs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-elec-light flex items-center gap-2">
              <Star className="h-5 w-5 text-elec-yellow" />
              Your AI Matched Jobs ({aiEnhancedJobs.length})
            </h3>
            <div className="grid gap-4">
              {aiEnhancedJobs.map((job) => (
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

        {/* Regular Job Search */}
        <BasicJobSearch />
      </div>
    </div>
  );
};

export default JobVacancies;
