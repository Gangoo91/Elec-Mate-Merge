
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  PoundSterling, 
  Building2, 
  ExternalLink,
  Calendar
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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
}

const EnhancedJobCard = ({ job, selectedJob, handleApply }: EnhancedJobCardProps) => {
  const isSelected = selectedJob === job.id;
  
  return (
    <Card 
      id={`job-${job.id}`}
      className={`border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all ${
        isSelected ? 'ring-2 ring-elec-yellow/50 border-elec-yellow' : ''
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-lg mb-1 line-clamp-2">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">{job.company}</span>
            </div>
          </div>
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 ml-2">
            {job.source}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          
          {job.salary && (
            <div className="flex items-center gap-2 text-gray-300">
              <PoundSterling className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{job.salary}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{job.type}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>
            Posted {formatDistanceToNow(new Date(job.posted_date), { addSuffix: true })}
          </span>
        </div>

        {job.description && (
          <p className="text-sm text-gray-300 line-clamp-3">
            {job.description.replace(/<[^>]*>/g, '').substring(0, 200)}
            {job.description.length > 200 ? '...' : ''}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button
            onClick={() => handleApply(job.id, job.external_url)}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex-1 mr-2"
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
