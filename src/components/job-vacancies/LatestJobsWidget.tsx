/**
 * LatestJobsWidget — job cards in the shared hub card language.
 *
 * This was the last block on the Electrician Hub still drawn in the old
 * editorial dialect: a hairline grid of 220–240px cells, each numbered
 * `01 · JOB`, over text-white/45–60. Once the rest of the page moved to the
 * hub primitives it was the only thing on screen that looked like a different
 * product — which is exactly the drift HubPrimitives exists to prevent.
 *
 * Now: the same card recipe as every other tool card, intrinsic heights, and
 * the numbering gone. The index was decoration — job 03 is not more or less
 * than job 02, and the posted date already orders them.
 *
 * Per card: title, company · location, then salary and how long ago it landed.
 * Salary is the one thing anyone scans a job list for, so it is the figure on
 * the card rather than a fragment inside a sentence.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
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
// Grid — identical shape to HubToolGrid so the section lines up with the
// tool grids above it: two-up on phones, auto-fit from sm.
// ────────────────────────────────────────────────────────────────────────

const JobsGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:gap-3">
    {children}
  </div>
);

// ────────────────────────────────────────────────────────────────────────
// Job cell
// ────────────────────────────────────────────────────────────────────────

const JobCell = ({ job }: { job: LatestJob }) => {
  const company = formatCompany(job.company);
  const location = formatLocation(job.location);
  const salary = formatSalary(job.salary);
  const posted = formatPostedDate(job.posted_date);

  const internalHref = `/electrician/job-vacancies/${job.id}`;
  const target = job.external_url || internalHref;
  const isExternal = !!job.external_url;

  const Body = (
    <div className={cn(CARD_BASE, CARD_NEUTRAL, 'h-full min-h-[104px] p-3.5 sm:p-4', 'lg:hover:-translate-y-0.5')}>
      <span className="flex items-start justify-between gap-2">
        <span className="line-clamp-2 text-[13.5px] font-medium leading-tight text-white transition-colors group-hover:text-elec-yellow">
          {job.title}
        </span>
        {isExternal && (
          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
        )}
      </span>

      <span className="mt-1.5 line-clamp-1 text-[12px] leading-snug text-white">
        {company} · {location}
      </span>

      <span className="flex-grow" />

      <span className="mt-2.5 flex items-baseline justify-between gap-2">
        {salary ? (
          <span className="text-[17px] font-semibold leading-none tabular-nums tracking-tight text-white">
            {salary}
          </span>
        ) : (
          <span className="text-[12px] leading-none text-white">Salary not listed</span>
        )}
        <span className="shrink-0 text-[11px] tabular-nums text-white">{posted}</span>
      </span>
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
  <JobsGrid>
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }}
        className={cn(CARD_BASE, CARD_NEUTRAL, 'min-h-[104px] p-3.5 sm:p-4')}
      >
        <div className="h-3 w-3/4 rounded-full bg-white/[0.08]" />
        <div className="mt-2 h-2.5 w-1/2 rounded-full bg-white/[0.05]" />
        <div className="flex-grow" />
        <div className="mt-3 h-4 w-16 rounded-full bg-white/[0.08]" />
      </motion.div>
    ))}
  </JobsGrid>
);

// ────────────────────────────────────────────────────────────────────────
// Empty
// ────────────────────────────────────────────────────────────────────────

const EmptyState = () => (
  <div className={cn(CARD_BASE, CARD_NEUTRAL, 'items-center px-6 py-8 text-center')}>
    <p className="max-w-md text-[13px] leading-relaxed text-white">
      No electrical jobs in your feed right now. Trade boards refresh daily.
    </p>
    <Link
      to="/electrician/job-vacancies"
      className="mt-3 inline-flex h-11 items-center text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
    >
      Browse all listings →
    </Link>
  </div>
);

// ────────────────────────────────────────────────────────────────────────
// Main widget
// ────────────────────────────────────────────────────────────────────────

export const LatestJobsWidget = () => {
  // Four, not six. The grid is auto-fit at four tracks like every other on the
  // page, so six wrapped to 4 + 2 and left a hole on the end — the same orphan
  // the tool groups were regrouped to avoid. "See all" is right there.
  const { data: jobs, isLoading, error } = useLatestJobs(4);

  if (error) return null;
  if (isLoading) return <Skeleton />;
  if (!jobs || jobs.length === 0) return <EmptyState />;

  return (
    <JobsGrid>
      {jobs.map((job) => (
        <JobCell key={job.id} job={job} />
      ))}
    </JobsGrid>
  );
};
