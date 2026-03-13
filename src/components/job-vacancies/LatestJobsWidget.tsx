import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Building2, Loader2, Zap, Briefcase } from 'lucide-react';
import { useLatestJobs, LatestJob } from '@/hooks/job-vacancies/useLatestJobs';
import { motion } from 'framer-motion';

// Accent colours for company avatars — cycles to add visual variety
const avatarAccents = [
  { bg: 'bg-elec-yellow/15', text: 'text-elec-yellow' },
  { bg: 'bg-purple-500/15', text: 'text-purple-400' },
  { bg: 'bg-blue-500/15', text: 'text-blue-400' },
  { bg: 'bg-amber-500/15', text: 'text-amber-400' },
  { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
];

const getInitials = (company: string): string => {
  const words = company.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return company.slice(0, 2).toUpperCase();
};

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

  return company.replace(/\s*(Recruitment|Ltd|Limited|PLC|Inc|Group)\.?$/gi, '').trim() || company;
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
  const accent = avatarAccents[index % avatarAccents.length];
  const initials = getInitials(company);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
    >
      <Link
        to={job.external_url || '/electrician/job-vacancies'}
        target={job.external_url ? '_blank' : undefined}
        rel={job.external_url ? 'noopener noreferrer' : undefined}
        className="block"
      >
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.06] active:scale-[0.98] transition-all">
          {/* Company initials avatar */}
          <div
            className={`w-11 h-11 rounded-xl ${accent.bg} flex items-center justify-center flex-shrink-0`}
          >
            <span className={`text-sm font-bold ${accent.text}`}>{initials}</span>
          </div>

          {/* Job details */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[14px] text-white leading-tight truncate">
              {job.title}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[12px] text-white truncate max-w-[100px]">{company}</span>
              <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
              <span className="text-[12px] text-white truncate">{location}</span>
            </div>
          </div>

          {/* Salary — right-aligned */}
          {salary && (
            <span className="text-sm font-bold text-green-400 flex-shrink-0">{salary}</span>
          )}
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
          <span className="text-xs text-white bg-white/[0.05] px-2.5 py-1 rounded-full">
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
            <Zap className="h-7 w-7 text-white" />
          </div>
          <p className="text-white text-sm mb-4">No electrical jobs found</p>
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
