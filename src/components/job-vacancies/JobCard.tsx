
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <div>
            <div className="text-xl">{job.title}</div>
            <div className="text-sm font-normal text-muted-foreground mt-1">
              {job.company}
              {job.source && (
                <span className="ml-2 text-xs text-elec-yellow">via {job.source}</span>
              )}
            </div>
          </div>
          <span className="text-sm bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
            {job.type}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div className="font-medium">Location:</div>
            <div>{job.location}</div>
            <div className="font-medium">Salary:</div>
            <div>{job.salary || "Not specified"}</div>
            <div className="font-medium">Posted:</div>
            <div>{new Date(job.posted_date).toLocaleDateString()}</div>
          </div>
          <p className="text-sm">{job.description}</p>
        </div>
        <Button 
          className={`w-full flex items-center justify-center gap-2 ${selectedJob === job.id ? "bg-green-700 hover:bg-green-600" : ""}`}
          onClick={() => handleApply(job.id, job.external_url)}
        >
          {selectedJob === job.id ? "Application Started" : "Apply Now"}
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
