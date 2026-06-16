/**
 * LatestJobsWidget — same hairline-grid DNA as EditorialHubGrid.
 *
 * Each job is a cell in a `gap-px bg-white/[0.06] border` grid. Yellow hairline
 * along the top. Cells have `bg-[hsl(0_0%_10%)]` with hover lift to
 * `bg-elec-yellow/[0.04]`. Layout per cell:
 *   index · POSTED-AGO        title (18-22px)
 *   description (company · location · salary)
 *   meta-line: source · Open →
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLatestJobs, LatestJob } from '@/hooks/job-vacancies/useLatestJobs';

// ────────────────────────────────────────────────────────────────────────
// Formatters
// ────────────────────────────────────────────────────────────────────────

const formatSalary = (salary: string | undefined): string | null => {
  if (!salary) return null;
  const match = salary.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  if (!match) return salary.length < 15 ? salary : null;
  const amount = parseFloat(match[1].replace(/,/g, ''));
  if (amount >= 1000) {
    const k = Math.round(amount / 1000);
    return `£${k}k`;
  }
  return `£${amount}`;
};

const formatCompany = (company: string | undefined): string => {
  if (!company) return 'Company';
  return (
    company.replace(/\s*(Recruitment|Ltd|Limited|PLC|Inc|Group)\.?$/gi, '').trim() || company
  );
};

const formatLocation = (location: string | undefined): string => {
  if (!location) return 'UK';
  const head = location.split(',')[0].trim();
  return head.length > 28 ? head.slice(0, 28).trim() + '…' : head;
};

const formatPostedDate = (dateStr: string | undefined): string => {
  if (!dateStr) return 'New';
  const posted = new Date(dateStr);
  if (Number.isNaN(posted.getTime())) return 'New';
  const diffDays = Math.floor((Date.now() - posted.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1d ago';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
};

// ────────────────────────────────────────────────────────────────────────
// Hairline grid wrapper — same pattern as EditorialHubGrid
// ────────────────────────────────────────────────────────────────────────

const HairlineGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="relative grid auto-rows-[220px] sm:auto-rows-[240px] gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
    {children}
  </div>
);

// ────────────────────────────────────────────────────────────────────────
// Job cell
// ────────────────────────────────────────────────────────────────────────

const JobCell = ({ job, index }: { job: LatestJob; index: number }) => {
  const company = formatCompany(job.company);
  const location = formatLocation(job.location);
  const salary = formatSalary(job.salary);
  const posted = formatPostedDate(job.posted_date);

  const internalHref = `/electrician/job-vacancies/${job.id}`;
  const target = job.external_url || internalHref;
  const isExternal = !!job.external_url;

  const Body = (
    <div className="group relative bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 sm:p-6 lg:p-7 text-left flex flex-col h-full cursor-pointer touch-manipulation">
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            · Job
          </span>
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45 tabular-nums whitespace-nowrap">
          {posted}
        </span>
      </div>

      <h3 className="mt-3 sm:mt-4 text-[18px] sm:text-[20px] lg:text-[22px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors line-clamp-2">
        {job.title}
      </h3>

      <p className="mt-2 text-[12.5px] leading-relaxed text-white/60 max-w-[34ch] line-clamp-2">
        {company} · {location}
        {salary ? ` · ` : ''}
        {salary && (
          <span className="text-elec-yellow tabular-nums font-medium">{salary}</span>
        )}
      </p>

      <div className="flex-grow" />

      <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
        <span className="text-[11px] text-white/55 truncate uppercase tracking-[0.14em]">
          {job.source || 'Trade board'}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow shrink-0">
          {isExternal ? 'View' : 'Open'}
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );

  return isExternal ? (
    <a href={target} target="_blank" rel="noopener noreferrer" className="block">
      {Body}
    </a>
  ) : (
    <Link to={target} className="block">
      {Body}
    </Link>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Skeleton (matches grid)
// ────────────────────────────────────────────────────────────────────────

const Skeleton = () => (
  <HairlineGrid>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }}
        className="bg-[hsl(0_0%_10%)] p-5 sm:p-6 lg:p-7 h-full flex flex-col"
      >
        <div className="flex items-baseline justify-between gap-2">
          <div className="h-2.5 w-20 rounded-full bg-white/[0.06]" />
          <div className="h-2.5 w-12 rounded-full bg-white/[0.04]" />
        </div>
        <div className="mt-4 h-5 w-3/4 rounded-full bg-white/[0.06]" />
        <div className="mt-3 space-y-2">
          <div className="h-3 w-2/3 rounded-full bg-white/[0.04]" />
          <div className="h-3 w-1/2 rounded-full bg-white/[0.04]" />
        </div>
      </motion.div>
    ))}
  </HairlineGrid>
);

// ────────────────────────────────────────────────────────────────────────
// Empty
// ────────────────────────────────────────────────────────────────────────

const EmptyState = () => (
  <div className="relative bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl px-6 py-10 text-center overflow-hidden">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
    <p className="text-[13px] text-white/65 leading-relaxed max-w-md mx-auto">
      No electrical jobs in your feed right now. Trade boards refresh daily.
    </p>
    <Link
      to="/electrician/job-vacancies"
      className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-medium text-elec-yellow hover:text-elec-yellow/85 transition-colors touch-manipulation"
    >
      Browse all listings
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  </div>
);

// ────────────────────────────────────────────────────────────────────────
// Main widget
// ────────────────────────────────────────────────────────────────────────

export const LatestJobsWidget = () => {
  const { data: jobs, isLoading, error } = useLatestJobs(6);

  if (error) return null;
  if (isLoading) return <Skeleton />;
  if (!jobs || jobs.length === 0) return <EmptyState />;

  return (
    <HairlineGrid>
      {jobs.map((job, index) => (
        <JobCell key={job.id} job={job} index={index} />
      ))}
    </HairlineGrid>
  );
};
