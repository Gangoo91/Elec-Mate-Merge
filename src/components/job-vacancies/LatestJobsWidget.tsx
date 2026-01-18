import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronRight, MapPin, Building2, PoundSterling, Loader2 } from "lucide-react";
import { useLatestJobs, LatestJob } from "@/hooks/job-vacancies/useLatestJobs";

// Format salary for display - convert "45059.00 GBP Annual" to "£45k"
const formatSalary = (salary: string | undefined): string | null => {
  if (!salary) return null;

  // Extract numeric value
  const match = salary.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  if (!match) return salary.length < 15 ? salary : null;

  const amount = parseFloat(match[1].replace(/,/g, ''));

  if (amount >= 1000) {
    const k = Math.round(amount / 1000);
    return `£${k}k`;
  }

  return `£${amount}`;
};

// Clean up company name - remove "Recruitment" suffix clutter
const formatCompany = (company: string | undefined): string => {
  if (!company) return 'Company';

  return company
    .replace(/\s*(Recruitment|Ltd|Limited|PLC|Inc|Group)\.?$/gi, '')
    .trim() || company;
};

// Clean up location - extract key area
const formatLocation = (location: string | undefined): string => {
  if (!location) return 'UK';

  // Take first part before comma or just clean up
  const parts = location.split(',');
  return parts[0].trim();
};

const JobRow = ({ job, isLast }: { job: LatestJob; isLast: boolean }) => {
  const salary = formatSalary(job.salary);
  const company = formatCompany(job.company);
  const location = formatLocation(job.location);

  return (
    <Link
      to={job.external_url || "/electrician/job-vacancies"}
      target={job.external_url ? "_blank" : undefined}
      rel={job.external_url ? "noopener noreferrer" : undefined}
      className="block"
    >
      <div
        className={`flex items-center gap-3 py-3 px-1 -mx-1 rounded-lg touch-manipulation active:bg-white/5 transition-colors ${
          !isLast ? 'border-b border-white/10' : ''
        }`}
      >
        {/* Job icon */}
        <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
          <Briefcase className="h-5 w-5 text-elec-yellow" />
        </div>

        {/* Job details - left aligned */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-white truncate leading-tight">
            {job.title}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-white/60 truncate">
              <Building2 className="h-3 w-3 flex-shrink-0" />
              {company}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/60 flex-shrink-0">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
          </div>
        </div>

        {/* Salary badge - right aligned */}
        {salary && (
          <div className="flex-shrink-0 bg-green-500/15 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full">
            {salary}
          </div>
        )}

        <ChevronRight className="h-4 w-4 text-white/30 flex-shrink-0" />
      </div>
    </Link>
  );
};

export const LatestJobsWidget = () => {
  const { data: jobs, isLoading, error } = useLatestJobs(5);

  if (error) {
    return null;
  }

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 via-card/80 to-card/60 overflow-hidden">
      {/* Header */}
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-elec-yellow" />
          </div>
          <span className="text-white font-semibold">Latest Jobs</span>
          {jobs && jobs.length > 0 && (
            <span className="ml-auto text-xs text-white/50 font-normal">
              {jobs.length} new
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-1 pb-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
          </div>
        ) : jobs && jobs.length > 0 ? (
          <div>
            {jobs.map((job, index) => (
              <JobRow
                key={job.id}
                job={job}
                isLast={index === jobs.length - 1}
              />
            ))}

            <Link to="/electrician/job-vacancies" className="block mt-3">
              <Button
                variant="ghost"
                className="w-full h-12 touch-manipulation active:scale-[0.98] transition-all bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow hover:text-elec-yellow rounded-xl font-medium"
              >
                View All Jobs
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
              <Briefcase className="h-6 w-6 text-white/40" />
            </div>
            <p className="text-white/60 text-sm mb-4">No jobs available right now</p>
            <Link to="/electrician/job-vacancies">
              <Button
                variant="outline"
                className="h-12 px-6 touch-manipulation active:scale-[0.98] transition-all border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10 rounded-xl"
              >
                Browse Job Board
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
