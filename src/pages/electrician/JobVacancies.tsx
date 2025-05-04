
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JobVacancies = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Electrical Engineer",
      company: "PowerTech Solutions",
      location: "London, UK",
      salary: "£45,000 - £55,000",
      type: "Full-time",
      description: "Looking for an experienced electrical engineer to join our growing team working on commercial projects."
    },
    {
      id: 2,
      title: "Maintenance Electrician",
      company: "Industrial Facilities Ltd",
      location: "Manchester, UK",
      salary: "£32,000 - £38,000",
      type: "Full-time",
      description: "Maintenance role for qualified electrician with industrial experience. Regular hours with on-call rotation."
    },
    {
      id: 3,
      title: "Electrical Apprentice",
      company: "City Sparks Electric",
      location: "Birmingham, UK",
      salary: "£18,000 - £22,000",
      type: "Apprenticeship",
      description: "Great opportunity for someone looking to start their career in the electrical trade with full training provided."
    },
    {
      id: 4,
      title: "Electrical Contracts Manager",
      company: "BuildRight Construction",
      location: "Bristol, UK",
      salary: "£58,000 - £65,000",
      type: "Full-time",
      description: "Experienced contracts manager needed to oversee multiple electrical installation projects across the southwest."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-elec-yellow" />
            Job Vacancies
          </h1>
          <p className="text-muted-foreground">
            Find the latest electrical job opportunities
          </p>
        </div>
        <Link to="/electrician/toolbox-talk">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 mb-6">
          <h2 className="text-xl font-medium mb-2">Looking for qualified electricians</h2>
          <p>
            Browse our curated list of electrical jobs from trusted employers across the UK. 
            New positions are added daily, so check back often for the latest opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <Card key={job.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <div>
                    <div className="text-xl">{job.title}</div>
                    <div className="text-sm font-normal text-muted-foreground mt-1">{job.company}</div>
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
                    <div>{job.salary}</div>
                  </div>
                  <p className="text-sm">{job.description}</p>
                </div>
                <Button className="w-full">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="outline">Load More Jobs</Button>
        </div>
      </div>
    </div>
  );
};

export default JobVacancies;
