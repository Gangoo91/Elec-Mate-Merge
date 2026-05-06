/**
 * UnifiedJobCard — editorial list-row job card.
 *
 * Layout fixes from screenshot review:
 *  • Drops the briefcase-icon avatar block on the left (the briefcase repeats
 *    everywhere — adds noise without information). Replaced with a small
 *    company-initials brand mark, suppressed entirely when the company is
 *    "Unknown" or missing.
 *  • Hides the "Unknown" company label cleanly — falls back to the source
 *    name (Reed, Adzuna, etc.) so the card never looks anonymous.
 *  • Drops the blue View button + green salary chip for editorial elec-yellow
 *    chrome; employer (direct) jobs still get an emerald accent line at the
 *    top so they read as differentiated without coloured chrome elsewhere.
 *  • Tightens the meta row — single line: location · type · posted · source.
 *  • Salary moves to footer-left as tabular-num text (no chip), with a
 *    "Salary negotiable" fallback in muted white.
 */

import { cn } from '@/lib/utils';
import {
  MapPin,
  ChevronRight,
  Bookmark,
  BadgeCheck,
  Clock,
} from 'lucide-react';
import type { UnifiedJobListing, JobSourceType } from '@/types/unified-jobs';

interface UnifiedJobCardProps {
  job: UnifiedJobListing;
  onSelect: (job: UnifiedJobListing) => void;
  onSave?: (jobId: string) => void;
  onApply?: (job: UnifiedJobListing) => void;
  isSaved?: boolean;
  matchScore?: number;
  className?: string;
}

const isCompanyKnown = (company: string | null | undefined): boolean => {
  if (!company) return false;
  const normalized = company.trim().toLowerCase();
  return normalized !== '' && normalized !== 'unknown' && normalized !== 'n/a';
};

const initialsOf = (company: string): string =>
  company
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();

const formatSalary = (salary: string | null): string | null => {
  if (!salary) return null;
  const rangeMatch = salary.match(
    /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*-\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/
  );
  if (rangeMatch) {
    const low = Math.round(parseFloat(rangeMatch[1].replace(/,/g, '')) / 1000);
    const high = Math.round(parseFloat(rangeMatch[2].replace(/,/g, '')) / 1000);
    return `£${low}-${high}k`;
  }
  const match = salary.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  if (!match) return salary.length < 15 ? salary : null;
  const amount = parseFloat(match[1].replace(/,/g, ''));
  if (amount >= 1000) return `£${Math.round(amount / 1000)}k`;
  return `£${amount}`;
};

const formatCompany = (company: string): string =>
  company.replace(/\s*(Recruitment|Ltd|Limited|PLC|Inc|Group|Agency)\.?$/gi, '').trim() || company;

const formatLocation = (location: string): string => location.split(',')[0].trim();

const formatPostedDate = (date: string): string => {
  const posted = new Date(date);
  const diffDays = Math.floor((Date.now() - posted.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return posted.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const isJobFresh = (postedDate: string): boolean =>
  new Date(postedDate) > new Date(Date.now() - 24 * 60 * 60 * 1000);

const sourceLabels: Record<JobSourceType, string> = {
  employer: 'Direct',
  reed: 'Reed',
  indeed: 'Indeed',
  totaljobs: 'TotalJobs',
  cvlibrary: 'CV Library',
  jobscouk: 'Jobs.co.uk',
  adzuna: 'Adzuna',
  gov_apprenticeships: 'Apprenticeships',
};

const UnifiedJobCard = ({
  job,
  onSelect,
  onApply,
  isSaved = false,
  className,
}: UnifiedJobCardProps) => {
  const isEmployer = job.is_internal;
  const isFresh = isJobFresh(job.posted_date);
  const salary = formatSalary(job.salary);
  const knownCompany = isCompanyKnown(job.company);
  const company = knownCompany ? formatCompany(job.company) : null;
  const location = formatLocation(job.location);
  const sourceLabel = sourceLabels[job.source] || (job.source as string);

  // Brand mark — only when company is real
  const initials = company ? initialsOf(company) : null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(job)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(job);
        }
      }}
      className={cn(
        'relative w-full text-left rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden cursor-pointer transition-colors touch-manipulation active:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/40',
        isEmployer
          ? 'border-emerald-500/30 hover:border-emerald-500/50'
          : 'border-white/[0.10] hover:border-elec-yellow/40',
        className
      )}
    >
      {/* Accent line for direct employer jobs */}
      {isEmployer && (
        <div
          className="absolute inset-x-0 top-0 h-[2px] bg-emerald-500/80"
          aria-hidden
        />
      )}

      <div className="p-4 sm:p-5">
        {/* Top row: brand mark (only when company is known) + title block + saved indicator */}
        <div className="flex items-start gap-3">
          {initials && (
            <div
              className={cn(
                'w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border',
                isEmployer
                  ? 'bg-emerald-500/[0.08] border-emerald-500/30'
                  : 'bg-elec-yellow/[0.08] border-elec-yellow/30'
              )}
            >
              <span
                className={cn(
                  'text-[10px] font-semibold tabular-nums',
                  isEmployer ? 'text-emerald-300' : 'text-elec-yellow'
                )}
              >
                {initials}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-[14.5px] sm:text-[15px] leading-snug line-clamp-2">
              {job.title}
            </h3>
            <p
              className={cn(
                'mt-0.5 text-[11.5px] truncate inline-flex items-center gap-1',
                isEmployer ? 'text-emerald-300' : 'text-elec-yellow'
              )}
            >
              {company || `${sourceLabel} listing`}
              {isEmployer && <BadgeCheck className="h-3 w-3 shrink-0" aria-hidden />}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isFresh && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300 border border-amber-500/40 bg-amber-500/[0.08] rounded-md px-1.5 py-0.5">
                New
              </span>
            )}
            {isSaved && (
              <Bookmark
                className={cn(
                  'h-4 w-4 fill-current',
                  isEmployer ? 'text-emerald-300' : 'text-elec-yellow'
                )}
                aria-hidden
              />
            )}
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/85">
          <span className="inline-flex items-center gap-1 truncate">
            <MapPin className="h-3 w-3 text-white/65 shrink-0" aria-hidden />
            <span className="truncate">{location}</span>
          </span>
          <span className="text-[10.5px] uppercase tracking-[0.12em] font-semibold text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
            {job.type}
          </span>
          <span className="inline-flex items-center gap-1 ml-auto tabular-nums">
            <Clock className="h-3 w-3 text-white/65" aria-hidden />
            {formatPostedDate(job.posted_date)}
            {!isEmployer && (
              <>
                <span className="text-white/40 mx-0.5">·</span>
                <span className="uppercase tracking-[0.12em] text-[9.5px] font-semibold text-white/65">
                  via {sourceLabel}
                </span>
              </>
            )}
          </span>
        </div>

        {/* Applied badge */}
        {isEmployer && job.has_applied && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-emerald-500/40 bg-emerald-500/[0.08]">
            <BadgeCheck className="h-3 w-3 text-emerald-300" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-emerald-300">
              Application submitted
            </span>
          </div>
        )}

        {/* Footer — salary + CTA */}
        <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            {salary ? (
              <>
                <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
                  Salary
                </span>
                <div className="text-[15px] font-semibold tabular-nums text-white truncate">
                  {salary}
                </div>
              </>
            ) : (
              <span className="text-[12px] text-white/65">Salary negotiable</span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (isEmployer && !job.has_applied && onApply) {
                onApply(job);
              } else {
                onSelect(job);
              }
            }}
            className={cn(
              'shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] rounded-full px-3 py-1.5 min-h-[32px] touch-manipulation transition-colors',
              isEmployer
                ? job.has_applied
                  ? 'text-white/85 border border-white/15 hover:border-white/30'
                  : 'text-black bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-300/90'
                : 'text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85'
            )}
          >
            {isEmployer && !job.has_applied ? 'Apply' : 'View'}
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnifiedJobCard;
