import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Building2, Loader2, Zap } from "lucide-react";
import { useLatestJobs, LatestJob } from "@/hooks/job-vacancies/useLatestJobs";
import { motion } from "framer-motion";

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

const JobRow = ({ job, index }: { job: LatestJob; index: number }) => {
  const salary = formatSalary(job.salary);
  const company = formatCompany(job.company);
  const location = formatLocation(job.location);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
    >
      <Link
        to={job.external_url || "/electrician/job-vacancies"}
        target={job.external_url ? "_blank" : undefined}
        rel={job.external_url ? "noopener noreferrer" : undefined}
        className="block"
      >
        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.06] active:scale-[0.98] transition-all">
          {/* Job icon */}
          <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
            <Zap className="h-5 w-5 text-black" />
          </div>

          {/* Job details - stacked layout */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <p className="font-semibold text-[14px] text-white leading-tight">
              {job.title}
            </p>

            {/* Company & Location */}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="flex items-center gap-1 text-[12px] text-white/80">
                <Building2 className="h-3 w-3 flex-shrink-0 text-white/60" />
                <span className="truncate max-w-[120px]">{company}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="flex items-center gap-1 text-[12px] text-white/80">
                <MapPin className="h-3 w-3 flex-shrink-0 text-white/60" />
                {location}
              </span>
            </div>

            {/* Salary badge - stacked below */}
            {salary && (
              <div className="inline-flex mt-2 bg-green-500/20 text-green-400 text-[12px] font-bold px-2.5 py-1 rounded-lg">
                {salary}
              </div>
            )}
          </div>

          {/* Arrow */}
          <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0 mt-2" />
        </div>
      </Link>
    </motion.div>
  );
};

export const LatestJobsWidget = () => {
  const { data: jobs, isLoading, error } = useLatestJobs(5);

  if (error) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
          <h2 className="text-base font-bold text-white">Latest Electrical Jobs</h2>
        </div>
        {jobs && jobs.length > 0 && (
          <span className="text-xs text-white/60 bg-white/[0.05] px-2.5 py-1 rounded-full">
            {jobs.length} new
          </span>
        )}
      </div>

      {/* Jobs List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        </div>
      ) : jobs && jobs.length > 0 ? (
        <div className="space-y-2">
          {jobs.map((job, index) => (
            <JobRow key={job.id} job={job} index={index} />
          ))}

          <Link to="/electrician/job-vacancies" className="block mt-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 touch-manipulation flex items-center justify-center gap-2 bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow rounded-xl font-medium text-[14px] border border-elec-yellow/20 transition-colors"
            >
              View All Electrical Jobs
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      ) : (
        <div className="text-center py-10 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
            <Zap className="h-7 w-7 text-white/40" />
          </div>
          <p className="text-white/70 text-sm mb-4">No electrical jobs found</p>
          <Link to="/electrician/job-vacancies">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="h-11 px-6 touch-manipulation inline-flex items-center justify-center gap-2 bg-elec-yellow text-black rounded-xl font-semibold text-[14px] transition-colors"
            >
              Browse Job Board
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      )}
    </div>
  );
};
