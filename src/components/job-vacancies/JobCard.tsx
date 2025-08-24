
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, ArrowUpRight, Clock, GraduationCap, Briefcase, MapPin } from "lucide-react";
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

interface JobCardProps {
  job: JobListing;
  selectedJob: string | null;
  handleApply: (jobId: string, url: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, selectedJob, handleApply }) => {
  const isSelected = selectedJob === job.id;
  
  // Format the job description to limit its length
  const formatDescription = (description: string) => {
    // Strip HTML tags
    const strippedDescription = description.replace(/<[^>]*>?/gm, '');
    return strippedDescription.length > 200
      ? strippedDescription.substring(0, 200) + "..."
      : strippedDescription;
  };
  
  // Format the posted date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return "Recently";
    }
  };
  
  // Format salary to use £ instead of $ if applicable
  const formattedSalary = job.salary ? job.salary.replace('$', '£') : null;
  
  return (
    <div
      id={`job-${job.id}`}
      className={cn(
        "border p-3 sm:p-4 md:p-5 rounded-lg transition-all",
        isSelected
          ? "border-elec-yellow bg-elec-yellow/5 shadow-md"
          : "border-gray-200 hover:border-elec-yellow/50 hover:bg-elec-yellow/5"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="mb-2">
          <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{job.title}</h3>
        </div>
        
        <div className="mb-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm">
          <div className="flex items-center gap-1 text-foreground">
            <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{job.company}</span>
          </div>
          
          <div className="flex items-center gap-1 text-foreground">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{job.is_remote ? "Remote" : job.location}</span>
          </div>
        </div>
        
        {formattedSalary && (
          <div className="mb-2 text-sm">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <Badge variant="secondary">{formattedSalary}</Badge>
              <Badge variant="outline">{job.type}</Badge>
            </div>
          </div>
        )}
        
        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          {formatDescription(job.description)}
        </p>
        
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 xs:gap-0 mt-auto">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Posted {formatDate(job.posted_date)}</span>
          </div>
          
          <Button 
            size="sm" 
            onClick={() => handleApply(job.id, job.external_url)}
            className="w-full xs:w-auto min-h-[44px] xs:min-h-0"
          >
            Apply <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
