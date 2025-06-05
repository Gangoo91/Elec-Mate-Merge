
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  MapPin, 
  Briefcase, 
  Star,
  TrendingUp,
  Zap,
  Brain
} from "lucide-react";
import { cn } from "@/lib/utils";

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

interface EnhancedJobCardProps {
  job: EnhancedJobListing;
  selectedJob: string | null;
  handleApply: (jobId: string, url: string) => void;
  isAIEnhanced?: boolean;
}

const EnhancedJobCard: React.FC<EnhancedJobCardProps> = ({ 
  job, 
  selectedJob, 
  handleApply,
  isAIEnhanced = false 
}) => {
  const isSelected = selectedJob === job.id;
  
  const formatDescription = (description: string) => {
    const strippedDescription = description.replace(/<[^>]*>?/gm, '');
    return strippedDescription.length > 200
      ? strippedDescription.substring(0, 200) + "..."
      : strippedDescription;
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return "Recently";
    }
  };
  
  const formattedSalary = job.salary ? job.salary.replace('$', '£') : null;
  
  const getRelevanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };
  
  const getSalaryCompetitivenessIcon = (level: string) => {
    switch (level) {
      case 'high': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'average': return <div className="h-3 w-3 rounded-full bg-yellow-500" />;
      case 'low': return <div className="h-3 w-3 rounded-full bg-gray-400" />;
      default: return null;
    }
  };
  
  return (
    <Card
      id={`job-${job.id}`}
      className={cn(
        "relative transition-all duration-200 hover:shadow-lg",
        isSelected
          ? "border-elec-yellow bg-elec-yellow/5 shadow-md"
          : "border-gray-200 hover:border-elec-yellow/50 hover:bg-elec-yellow/5"
      )}
    >
      {isAIEnhanced && (
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <Brain className="h-4 w-4 text-elec-yellow" />
          <span className="text-xs font-medium text-elec-yellow">AI Enhanced</span>
        </div>
      )}
      
      <CardContent className="p-5">
        <div className="flex flex-col h-full">
          {/* Job Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold line-clamp-2 flex-1">{job.title}</h3>
              {job.relevanceScore && (
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getRelevanceColor(job.relevanceScore))}
                >
                  {job.relevanceScore}% match
                </Badge>
              )}
            </div>
          </div>
          
          {/* Company & Location */}
          <div className="mb-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
            <div className="flex items-center gap-1 text-foreground">
              <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{job.company}</span>
            </div>
            
            <div className="flex items-center gap-1 text-foreground">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{job.is_remote ? "Remote" : job.location}</span>
            </div>
          </div>
          
          {/* Salary & Type */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {formattedSalary && (
              <div className="flex items-center gap-1">
                <Badge variant="secondary">{formattedSalary}</Badge>
                {job.salaryCompetitiveness && getSalaryCompetitivenessIcon(job.salaryCompetitiveness)}
              </div>
            )}
            <Badge variant="outline">{job.type}</Badge>
            {job.experienceLevel && (
              <Badge variant="outline" className="text-xs">
                {job.experienceLevel}
              </Badge>
            )}
          </div>
          
          {/* AI Tags */}
          {job.aiTags && job.aiTags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {job.aiTags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                  <Zap className="h-2 w-2 mr-1" />
                  {tag}
                </Badge>
              ))}
              {job.aiTags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{job.aiTags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          {/* Skills Required */}
          {job.skillsRequired && job.skillsRequired.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1">Key Skills:</p>
              <div className="flex flex-wrap gap-1">
                {job.skillsRequired.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 flex-grow">
            {formatDescription(job.description)}
          </p>
          
          {/* Career Progression Insight */}
          {job.careerProgression && (
            <div className="mb-3 p-2 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-xs text-blue-700">
                <Star className="h-3 w-3 inline mr-1" />
                {job.careerProgression}
              </p>
            </div>
          )}
          
          {/* Footer */}
          <div className="flex justify-between items-center mt-auto">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Posted {formatDate(job.posted_date)}</span>
              {job.source && (
                <Badge variant="outline" className="text-xs ml-2">
                  {job.source}
                </Badge>
              )}
            </div>
            
            <Button 
              size="sm" 
              onClick={() => handleApply(job.id, job.external_url)}
              className="ml-auto bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Apply <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedJobCard;
