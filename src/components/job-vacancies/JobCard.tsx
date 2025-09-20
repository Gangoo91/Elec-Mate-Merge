
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, ArrowUpRight, Clock, GraduationCap, Briefcase, MapPin, Building } from "lucide-react";
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
    return strippedDescription.length > 150
      ? strippedDescription.substring(0, 150) + "..."
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
  
  // Get placeholder image based on job type or industry
  const getPlaceholderImage = () => {
    const jobTypeKeywords = job.title.toLowerCase() + ' ' + job.description.toLowerCase();
    
    if (jobTypeKeywords.includes('electrician') || jobTypeKeywords.includes('electrical')) {
      return 'https://images.unsplash.com/photo-1558618667-fcd25c85cd64?w=400&h=240&fit=crop&crop=center';
    } else if (jobTypeKeywords.includes('engineer') || jobTypeKeywords.includes('engineering')) {
      return 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=240&fit=crop&crop=center';
    } else if (jobTypeKeywords.includes('manager') || jobTypeKeywords.includes('management')) {
      return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop&crop=center';
    } else if (jobTypeKeywords.includes('apprentice') || jobTypeKeywords.includes('trainee')) {
      return 'https://images.unsplash.com/photo-1507537362848-9c7e70b7b5c1?w=400&h=240&fit=crop&crop=center';
    } else if (jobTypeKeywords.includes('maintenance') || jobTypeKeywords.includes('service')) {
      return 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=240&fit=crop&crop=center';
    } else {
      return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=240&fit=crop&crop=center';
    }
  };
  
  return (
    <div
      id={`job-${job.id}`}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/40 bg-gradient-to-br from-background/95 via-background/90 to-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-elec-yellow/50",
        isSelected && "ring-2 ring-elec-yellow/50 border-elec-yellow"
      )}
    >
      {/* Image Header */}
      <div className="relative h-32 sm:h-36 overflow-hidden">
        <img
          src={getPlaceholderImage()}
          alt={`${job.title} at ${job.company}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=240&fit=crop&crop=center';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Job Type Badge */}
        <div className="absolute top-2 left-2">
          <Badge 
            variant="secondary" 
            className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
          >
            {job.type}
          </Badge>
        </div>
        
        {/* Salary Badge */}
        {formattedSalary && (
          <div className="absolute top-2 right-2">
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/20 text-white border-elec-yellow/30 backdrop-blur-sm"
            >
              {formattedSalary}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-[calc(100%-8rem)] sm:h-[calc(100%-9rem)]">
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-elec-yellow transition-colors">
          {job.title}
        </h3>
        
        {/* Company and Location */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Building className="h-4 w-4" />
            <span className="font-medium">{job.company}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{job.is_remote ? "Remote" : job.location}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 flex-grow mb-4">
          {formatDescription(job.description)}
        </p>
        
        {/* Footer */}
        <div className="border-t border-border/40 pt-3 mt-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Posted {formatDate(job.posted_date)}</span>
            </div>
            
            <Button 
              size="sm" 
              onClick={() => handleApply(job.id, job.external_url)}
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
            >
              Apply <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
