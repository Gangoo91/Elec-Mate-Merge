
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  PoundSterling, 
  Building2, 
  ExternalLink,
  Calendar,
  Briefcase,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface Job {
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
}

interface EnhancedJobCardProps {
  job: Job;
  selectedJob: string | null;
  handleApply: (jobId: string, url: string) => void;
  isAIEnhanced?: boolean;
  aiMatchScore?: number;
  aiInsights?: string[];
}

const EnhancedJobCard = ({ job, selectedJob, handleApply, isAIEnhanced = false, aiMatchScore, aiInsights = [] }: EnhancedJobCardProps) => {
  const isSelected = selectedJob === job.id;
  
  const formatDescription = (description: string) => {
    const strippedDescription = description.replace(/<[^>]*>?/gm, '');
    return strippedDescription.length > 150
      ? strippedDescription.substring(0, 150) + "..."
      : strippedDescription;
  };
  
  const formatDate = (dateString: string) => {
    try {
      let date: Date;
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else {
        date = new Date(dateString);
      }
      
      if (isNaN(date.getTime())) {
        return 'recently';
      }
      
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };
  
  return (
    <Card
      id={`job-${job.id}`}
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]",
        "bg-gradient-to-br from-elec-card to-elec-card/80 border-elec-yellow/20",
        "hover:border-elec-yellow/50 hover:shadow-elec-yellow/10",
        isSelected && "ring-2 ring-elec-yellow shadow-lg"
      )}
    >
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-elec-light line-clamp-2 group-hover:text-elec-yellow transition-colors">
              {job.title}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="text-sm text-muted-foreground truncate">{job.company}</span>
              </div>
              {job.source && (
                <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow w-fit">
                  {job.source}
                </Badge>
              )}
            </div>
            
            {isAIEnhanced && aiMatchScore !== undefined && (
              <Badge 
                className={`text-xs font-medium mt-2 w-fit ${
                  aiMatchScore >= 80 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : aiMatchScore >= 60 
                    ? 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30'
                    : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                }`}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {aiMatchScore}% Match
              </Badge>
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-2 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Briefcase className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              <span className="truncate">{job.type}</span>
            </div>
          </div>

          {job.salary && (
            <div className="flex items-center gap-1 text-sm">
              <PoundSterling className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              <Badge variant="secondary" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                {job.salary}
              </Badge>
            </div>
          )}
        </div>

        {/* AI Insights */}
        {isAIEnhanced && aiInsights && aiInsights.length > 0 && (
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-3 mb-4 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium text-elec-yellow">AI Insights</span>
            </div>
            <div className="space-y-1">
              {aiInsights.map((insight, index) => (
                <p key={index} className="text-xs text-elec-light/90">{insight}</p>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {formatDescription(job.description)}
        </p>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span>Posted {formatDate(job.posted_date)}</span>
          </div>
          
          <Button 
            size="sm" 
            onClick={() => handleApply(job.id, job.external_url)}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 transition-all duration-200 w-full sm:w-auto"
          >
            Apply <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};

export default EnhancedJobCard;
