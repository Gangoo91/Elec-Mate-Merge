
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

interface JobTableViewProps {
  jobs: JobListing[];
  selectedJob: string | null;
  handleApply: (jobId: string, url: string) => void;
}

const JobTableView: React.FC<JobTableViewProps> = ({ jobs, selectedJob, handleApply }) => {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:block mt-8 overflow-hidden">
      <h2 className="text-xl font-medium mb-4">All Available Positions</h2>
      <div className="border rounded-lg border-elec-yellow/20 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map(job => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.salary || "Not specified"}</TableCell>
                <TableCell>{new Date(job.posted_date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    className={`${selectedJob === job.id ? "bg-green-700 hover:bg-green-600" : ""}`}
                    onClick={() => handleApply(job.id, job.external_url)}
                  >
                    {selectedJob === job.id ? "Started" : "Apply"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobTableView;
