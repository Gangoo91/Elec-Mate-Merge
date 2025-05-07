
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, Building, ExternalLink } from "lucide-react";

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
}

interface JobCardProps {
  job: JobListing;
  selectedJob: string | null;
  handleApply: (jobId: string, url: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, selectedJob, handleApply }) => {
  // Format posted date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const isSelected = selectedJob === job.id;

  return (
    <Card 
      id={`job-${job.id}`}
      className={`bg-elec-card border-elec-yellow/20 transition-shadow hover:shadow-md ${
        isSelected ? 'ring-2 ring-elec-yellow' : ''
      }`}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-elec-light line-clamp-2">
              {job.title}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Building className="h-3.5 w-3.5 mr-1" />
              <span className="truncate">{job.company}</span>
            </div>
          </div>
          {job.source && (
            <div className="bg-elec-gray/40 px-2 py-1 rounded text-xs font-medium">
              {job.source}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-3">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>{formatDate(job.posted_date)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow text-xs px-2 py-0.5 rounded-full">
                {job.type}
              </span>
              {job.salary && (
                <span className="bg-elec-gray/40 text-xs px-2 py-0.5 rounded-full">
                  {job.salary}
                </span>
              )}
            </div>
          
            <p className="text-muted-foreground text-sm line-clamp-3">
              {job.description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-1">
        <Button 
          onClick={() => handleApply(job.id, job.external_url)} 
          className="w-full bg-elec-gray hover:bg-elec-yellow/20 text-elec-light border border-elec-yellow/30"
        >
          Apply Now <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
