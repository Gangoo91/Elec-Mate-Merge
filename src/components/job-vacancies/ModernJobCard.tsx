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
  Building2,
  BanknoteIcon,
  Star,
  Briefcase,
  Eye,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

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
}

interface ModernJobCardProps {
  job: JobListing;
  selectedJob: string | null;
  handleApply: (jobId: string, url: string) => void;
  aiMatchScore?: number;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

const ModernJobCard: React.FC<ModernJobCardProps> = ({ 
  job, 
  selectedJob, 
  handleApply,
  aiMatchScore,
  onSave,
  isSaved = false
}) => {
  const isSelected = selectedJob === job.id;
  
  const formatDescription = (description: string, isMobile = false) => {
    const strippedDescription = description.replace(/<[^>]*>?/gm, '');
    const maxLength = isMobile ? 100 : 150;
    return strippedDescription.length > maxLength
      ? strippedDescription.substring(0, maxLength) + "..."
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
  
  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-elec-yellow";
    return "text-orange-400";
  };

  const getMatchScoreBg = (score: number) => {
    if (score >= 85) return "bg-green-400/10 border-green-400/30";
    if (score >= 70) return "bg-elec-yellow/10 border-elec-yellow/30";
    return "bg-orange-400/10 border-orange-400/30";
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
      {/* AI Match Score Badge */}
      {aiMatchScore && (
        <div className={cn(
          "absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 rounded-full border text-xs font-medium",
          "flex items-center gap-1",
          getMatchScoreBg(aiMatchScore)
        )}>
          <Star className={cn("h-3 w-3", getMatchScoreColor(aiMatchScore))} />
          <span className={cn("hidden xs:inline", getMatchScoreColor(aiMatchScore))}>{aiMatchScore}% match</span>
          <span className={cn("xs:hidden", getMatchScoreColor(aiMatchScore))}>{aiMatchScore}%</span>
        </div>
      )}

      <CardContent className="p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-elec-light line-clamp-2 group-hover:text-elec-yellow transition-colors">
              {job.title}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-muted-foreground">{job.company}</span>
              </div>
              {job.source && (
                <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow w-fit">
                  {job.source}
                </Badge>
              )}
            </div>
          </div>

          {/* Save Button */}
          {onSave && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSave(job.id)}
              className={cn(
                "h-10 w-10 sm:h-8 sm:w-8 p-0 transition-colors self-start",
                isSaved ? "text-red-400 hover:text-red-300" : "text-muted-foreground hover:text-elec-yellow"
              )}
            >
              <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
            </Button>
          )}
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-elec-yellow" />
              <span className="text-muted-foreground">
                {job.is_remote ? "Remote" : job.location}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-elec-yellow" />
              <span className="text-muted-foreground">{job.type}</span>
            </div>
          </div>

          {formattedSalary && (
            <div className="flex items-center gap-1 text-sm">
              <BanknoteIcon className="h-4 w-4 text-elec-yellow" />
              <Badge variant="secondary" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                {formattedSalary}
              </Badge>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 sm:line-clamp-3">
          {formatDescription(job.description)}
        </p>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Posted {formatDate(job.posted_date)}</span>
            </div>
            
            {job.expires_at && (
              <div className="text-xs text-orange-400 flex items-center gap-1">
                <span>Expires soon</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-elec-yellow h-10 sm:h-8 w-10 sm:w-8 p-0"
            >
              <Eye className="h-4 w-4" />
            </Button>
            
            <Button 
              size="sm" 
              onClick={() => handleApply(job.id, job.external_url)}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 transition-all duration-200 flex-1 sm:flex-none min-h-[44px] sm:min-h-0"
            >
              Apply <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};

export default ModernJobCard;