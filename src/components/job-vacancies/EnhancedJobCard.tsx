
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Building2, 
  Banknote,
  Star,
  TrendingUp,
  Award,
  CheckCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JobResult {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  type: string;
  description: string;
  external_url: string;
  posted_date: string;
  source: string;
  // AI enhancement fields
  relevanceScore?: number;
  aiTags?: string[];
  skillsRequired?: string[];
  experienceLevel?: string;
  salaryCompetitiveness?: 'low' | 'average' | 'high';
  careerProgression?: string;
}

interface EnhancedJobCardProps {
  job: JobResult;
  selectedJob: string | null;
  handleApply: (jobId: string, url: string) => void;
  isAIEnhanced?: boolean;
}

const EnhancedJobCard: React.FC<EnhancedJobCardProps> = ({
  job,
  selectedJob,
  handleApply,
  isAIEnhanced = false,
}) => {
  const formatPostedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "Recently posted";
    }
  };

  const getSalaryCompetitivenessColor = (competitiveness?: string) => {
    switch (competitiveness) {
      case 'high': return 'text-green-400 bg-green-950 border-green-800';
      case 'low': return 'text-red-400 bg-red-950 border-red-800';
      default: return 'text-blue-400 bg-blue-950 border-blue-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'reed': return 'bg-blue-950 text-blue-300 border-blue-800';
      case 'adzuna': return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'indeed': return 'bg-green-950 text-green-300 border-green-800';
      default: return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  const truncateDescription = (description: string, maxLength: number = 200) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + "...";
  };

  const isSelected = selectedJob === job.id;

  return (
    <Card 
      id={`job-${job.id}`}
      className={`transition-all duration-200 hover:shadow-lg border-l-4 bg-elec-dark border-gray-700 ${
        isSelected 
          ? 'border-l-elec-yellow bg-elec-yellow/5 shadow-md' 
          : 'border-l-gray-600 hover:border-l-elec-yellow/50'
      } ${isAIEnhanced ? 'ring-1 ring-elec-yellow/20' : ''}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white truncate">
                {job.title}
              </h3>
              {isAIEnhanced && job.relevanceScore && job.relevanceScore > 0.8 && (
                <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                  <Star className="h-3 w-3 mr-1" />
                  High Match
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span className="font-medium text-gray-300">{job.company}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600">
                {job.type}
              </Badge>
              
              <Badge 
                variant="outline" 
                className={`border ${getSourceColor(job.source)}`}
              >
                {job.source}
              </Badge>

              {job.experienceLevel && (
                <Badge variant="outline" className="bg-blue-950 text-blue-300 border-blue-800">
                  {job.experienceLevel}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {job.salary && (
              <div className={`px-3 py-1 rounded-md border text-sm font-medium ${
                job.salaryCompetitiveness ? getSalaryCompetitivenessColor(job.salaryCompetitiveness) : 'bg-gray-800 text-gray-300 border-gray-600'
              }`}>
                <div className="flex items-center gap-1">
                  <Banknote className="h-3 w-3" />
                  {job.salary}
                </div>
                {job.salaryCompetitiveness && (
                  <div className="text-xs capitalize mt-1">
                    {job.salaryCompetitiveness} rate
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              {formatPostedDate(job.posted_date)}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* AI Tags */}
        {job.aiTags && job.aiTags.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-1 mb-2 text-xs text-gray-400">
              <Award className="h-3 w-3" />
              <span>Key Skills</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {job.aiTags.slice(0, 4).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20"
                >
                  {tag}
                </Badge>
              ))}
              {job.aiTags.length > 4 && (
                <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-400">
                  +{job.aiTags.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Job Description */}
        <div className="mb-4">
          <p className="text-sm text-gray-300 leading-relaxed">
            {truncateDescription(job.description)}
          </p>
        </div>

        {/* Career Progression */}
        {job.careerProgression && (
          <div className="mb-4 p-3 bg-green-950 border border-green-800 rounded-md">
            <div className="flex items-center gap-1 mb-1 text-xs text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span>Career Progression</span>
            </div>
            <p className="text-xs text-green-300">{job.careerProgression}</p>
          </div>
        )}

        {/* Skills Required */}
        {job.skillsRequired && job.skillsRequired.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2 text-xs text-gray-400">
              <CheckCircle className="h-3 w-3" />
              <span>Requirements</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {job.skillsRequired.slice(0, 3).map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-gray-800 text-gray-300 border-gray-600"
                >
                  {skill}
                </Badge>
              ))}
              {job.skillsRequired.length > 3 && (
                <Badge variant="outline" className="text-xs bg-gray-800 text-gray-400">
                  +{job.skillsRequired.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isAIEnhanced && job.relevanceScore && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="h-3 w-3" />
                <span>{Math.round(job.relevanceScore * 100)}% match</span>
              </div>
            )}
          </div>
          
          <Button
            onClick={() => handleApply(job.id, job.external_url)}
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedJobCard;
