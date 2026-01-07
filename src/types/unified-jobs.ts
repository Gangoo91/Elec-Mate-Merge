/**
 * Unified Job Types
 * Combines employer jobs and external job board listings into a single type system
 */

// Job source identifiers
export type JobSourceType =
  | 'employer'    // Direct employer posting
  | 'reed'        // Reed.co.uk
  | 'indeed'      // Indeed
  | 'totaljobs'   // TotalJobs
  | 'cvlibrary'   // CV Library
  | 'jobscouk';   // Jobs.co.uk

// Unified job listing that works for both employer and external jobs
export interface UnifiedJobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  type: string;                     // Full-time, Part-time, Contract
  description: string;
  url: string | null;               // External URL (null for employer jobs)
  posted_date: string;
  source: JobSourceType;
  is_internal: boolean;             // true = employer job, false = external

  // Employer job specific fields
  employer_id?: string;
  employer_logo?: string;
  requirements?: string[];
  benefits?: string[];
  salary_min?: number | null;
  salary_max?: number | null;
  salary_period?: 'annual' | 'hourly';
  closing_date?: string | null;
  views?: number;

  // Application status
  has_applied?: boolean;

  // External job specific
  is_fresh?: boolean;               // Recently posted
  image_url?: string;
}

// Employer-specific vacancy data (from database)
export interface EmployerVacancy {
  id: string;
  title: string;
  location: string;
  type: string;
  status: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_period: string;
  description: string;
  requirements: string[];
  benefits: string[];
  closing_date: string | null;
  views: number;
  created_at: string;
  employer_id: string;
  employer?: {
    id: string;
    company_name: string;
    logo_url: string | null;
  };
  has_applied?: boolean;
}

// External job from aggregator
export interface ExternalJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  type: string;
  description: string;
  external_url: string;
  posted_date: string;
  source: string;
  updated_at?: string;
  is_fresh?: boolean;
  image_url?: string;
}

// Helper to convert employer vacancy to unified format
export function employerVacancyToUnified(vacancy: EmployerVacancy): UnifiedJobListing {
  const formatSalary = (): string | null => {
    if (!vacancy.salary_min && !vacancy.salary_max) return null;

    const period = vacancy.salary_period === 'annual' ? '/yr' : '/hr';

    if (vacancy.salary_min && vacancy.salary_max) {
      const min = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_min / 1000).toFixed(0)}k`
        : `£${vacancy.salary_min}`;
      const max = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_max / 1000).toFixed(0)}k`
        : `£${vacancy.salary_max}`;
      return `${min} - ${max}${period}`;
    }

    if (vacancy.salary_min) {
      const val = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_min / 1000).toFixed(0)}k`
        : `£${vacancy.salary_min}`;
      return `From ${val}${period}`;
    }

    return null;
  };

  return {
    id: vacancy.id,
    title: vacancy.title,
    company: vacancy.employer?.company_name || 'Unknown Company',
    location: vacancy.location,
    salary: formatSalary(),
    type: vacancy.type || 'Full-time',
    description: vacancy.description,
    url: null, // Employer jobs don't have external URLs
    posted_date: vacancy.created_at,
    source: 'employer',
    is_internal: true,
    employer_id: vacancy.employer_id,
    employer_logo: vacancy.employer?.logo_url || undefined,
    requirements: vacancy.requirements,
    benefits: vacancy.benefits,
    salary_min: vacancy.salary_min,
    salary_max: vacancy.salary_max,
    salary_period: vacancy.salary_period as 'annual' | 'hourly',
    closing_date: vacancy.closing_date,
    views: vacancy.views,
    has_applied: vacancy.has_applied,
  };
}

// Helper to convert external job to unified format
export function externalJobToUnified(job: ExternalJob): UnifiedJobListing {
  // Map source string to JobSourceType
  const mapSource = (source: string): JobSourceType => {
    const sourceMap: Record<string, JobSourceType> = {
      'Reed': 'reed',
      'Indeed': 'indeed',
      'TotalJobs': 'totaljobs',
      'CV Library': 'cvlibrary',
      'Jobs.co.uk': 'jobscouk',
    };
    return sourceMap[source] || 'reed';
  };

  return {
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    salary: job.salary,
    type: job.type || 'Full-time',
    description: job.description,
    url: job.external_url,
    posted_date: job.posted_date,
    source: mapSource(job.source),
    is_internal: false,
    is_fresh: job.is_fresh,
    image_url: job.image_url,
  };
}

// Source display information
export const JOB_SOURCE_INFO: Record<JobSourceType, { label: string; color: string }> = {
  employer: { label: 'Direct Employer', color: 'emerald' },
  reed: { label: 'Reed', color: 'blue' },
  indeed: { label: 'Indeed', color: 'purple' },
  totaljobs: { label: 'TotalJobs', color: 'orange' },
  cvlibrary: { label: 'CV Library', color: 'teal' },
  jobscouk: { label: 'Jobs.co.uk', color: 'pink' },
};
