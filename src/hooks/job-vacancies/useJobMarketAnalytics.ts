import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface RegionStats {
  region: string;
  jobCount: number;
  avgSalary: number;
}

export interface JobTypeStats {
  type: string;
  count: number;
  percentage: number;
}

export interface SalaryBand {
  range: string;
  count: number;
  percentage: number;
}

export interface TopCompany {
  company: string;
  jobCount: number;
}

export interface JobMarketAnalytics {
  totalJobs: number;
  averageSalary: number;
  medianSalary: number;
  newJobsToday: number;
  newJobsThisWeek: number;
  regionStats: RegionStats[];
  jobTypeStats: JobTypeStats[];
  salaryBands: SalaryBand[];
  topCompanies: TopCompany[];
  lastUpdated: string | null;
}

// Parse salary string to number
const parseSalary = (salary: string | null): number => {
  if (!salary) return 0;
  const match = salary.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  if (!match) return 0;
  return parseFloat(match[1].replace(/,/g, ''));
};

// Extract region from location string
const extractRegion = (location: string): string => {
  const loc = location.toLowerCase();

  if (loc.includes('london') || loc.includes('central london')) return 'London';
  if (loc.includes('manchester') || loc.includes('salford')) return 'Manchester';
  if (loc.includes('birmingham') || loc.includes('west midlands')) return 'Birmingham';
  if (loc.includes('leeds') || loc.includes('bradford') || loc.includes('wakefield')) return 'Leeds';
  if (loc.includes('glasgow') || loc.includes('edinburgh') || loc.includes('scotland')) return 'Scotland';
  if (loc.includes('liverpool') || loc.includes('merseyside')) return 'Liverpool';
  if (loc.includes('bristol') || loc.includes('bath')) return 'Bristol';
  if (loc.includes('sheffield') || loc.includes('south yorkshire')) return 'Sheffield';
  if (loc.includes('newcastle') || loc.includes('tyne') || loc.includes('sunderland')) return 'Newcastle';
  if (loc.includes('nottingham')) return 'Nottingham';
  if (loc.includes('cardiff') || loc.includes('wales') || loc.includes('swansea')) return 'Wales';
  if (loc.includes('brighton') || loc.includes('sussex')) return 'Brighton';
  if (loc.includes('cambridge') || loc.includes('east anglia')) return 'Cambridge';
  if (loc.includes('oxford') || loc.includes('oxfordshire')) return 'Oxford';
  if (loc.includes('reading') || loc.includes('berkshire')) return 'Reading';
  if (loc.includes('southampton') || loc.includes('portsmouth') || loc.includes('hampshire')) return 'Southampton';
  if (loc.includes('leicester') || loc.includes('leicestershire')) return 'Leicester';
  if (loc.includes('coventry') || loc.includes('warwickshire')) return 'Coventry';
  if (loc.includes('plymouth') || loc.includes('devon') || loc.includes('cornwall')) return 'Southwest';
  if (loc.includes('norwich') || loc.includes('norfolk')) return 'Norwich';

  // Check for broader regions
  if (loc.includes('north west') || loc.includes('northwest')) return 'Northwest';
  if (loc.includes('north east') || loc.includes('northeast')) return 'Northeast';
  if (loc.includes('south east') || loc.includes('southeast')) return 'Southeast';
  if (loc.includes('south west') || loc.includes('southwest')) return 'Southwest';
  if (loc.includes('midlands')) return 'Midlands';
  if (loc.includes('yorkshire')) return 'Yorkshire';

  return 'Other UK';
};

// Normalise job type
const normaliseJobType = (type: string | null): string => {
  if (!type) return 'Permanent';
  const t = type.toLowerCase();
  if (t.includes('perm') || t.includes('full')) return 'Permanent';
  if (t.includes('contract')) return 'Contract';
  if (t.includes('temp')) return 'Temporary';
  if (t.includes('part')) return 'Part-time';
  if (t.includes('apprentice')) return 'Apprenticeship';
  return 'Permanent';
};

export const useJobMarketAnalytics = () => {
  return useQuery({
    queryKey: ['job-market-analytics'],
    queryFn: async (): Promise<JobMarketAnalytics> => {
      const { data: jobs, error } = await supabase
        .from('job_listings')
        .select('title, company, location, salary, type, posted_date, updated_at')
        .order('posted_date', { ascending: false });

      if (error) {
        console.error('Error fetching job analytics:', error);
        throw error;
      }

      if (!jobs || jobs.length === 0) {
        return {
          totalJobs: 0,
          averageSalary: 0,
          medianSalary: 0,
          newJobsToday: 0,
          newJobsThisWeek: 0,
          regionStats: [],
          jobTypeStats: [],
          salaryBands: [],
          topCompanies: [],
          lastUpdated: null,
        };
      }

      // Basic stats
      const totalJobs = jobs.length;
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const newJobsToday = jobs.filter(j => new Date(j.posted_date) >= today).length;
      const newJobsThisWeek = jobs.filter(j => new Date(j.posted_date) >= weekAgo).length;

      // Salary analysis
      const salaries = jobs.map(j => parseSalary(j.salary)).filter(s => s > 10000 && s < 200000);
      const averageSalary = salaries.length > 0
        ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length)
        : 0;
      const sortedSalaries = [...salaries].sort((a, b) => a - b);
      const medianSalary = sortedSalaries.length > 0
        ? sortedSalaries[Math.floor(sortedSalaries.length / 2)]
        : 0;

      // Region stats
      const regionMap = new Map<string, { count: number; salarySum: number; salaryCount: number }>();
      jobs.forEach(job => {
        const region = extractRegion(job.location || '');
        const salary = parseSalary(job.salary);
        const existing = regionMap.get(region) || { count: 0, salarySum: 0, salaryCount: 0 };
        existing.count++;
        if (salary > 10000 && salary < 200000) {
          existing.salarySum += salary;
          existing.salaryCount++;
        }
        regionMap.set(region, existing);
      });

      const regionStats: RegionStats[] = Array.from(regionMap.entries())
        .map(([region, stats]) => ({
          region,
          jobCount: stats.count,
          avgSalary: stats.salaryCount > 0 ? Math.round(stats.salarySum / stats.salaryCount) : 0,
        }))
        .sort((a, b) => b.jobCount - a.jobCount)
        .slice(0, 10);

      // Job type stats
      const typeMap = new Map<string, number>();
      jobs.forEach(job => {
        const type = normaliseJobType(job.type);
        typeMap.set(type, (typeMap.get(type) || 0) + 1);
      });

      const jobTypeStats: JobTypeStats[] = Array.from(typeMap.entries())
        .map(([type, count]) => ({
          type,
          count,
          percentage: Math.round((count / totalJobs) * 100),
        }))
        .sort((a, b) => b.count - a.count);

      // Salary bands
      const bands = [
        { range: '£20-30k', min: 20000, max: 30000 },
        { range: '£30-35k', min: 30000, max: 35000 },
        { range: '£35-40k', min: 35000, max: 40000 },
        { range: '£40-45k', min: 40000, max: 45000 },
        { range: '£45-50k', min: 45000, max: 50000 },
        { range: '£50k+', min: 50000, max: Infinity },
      ];

      const salaryBands: SalaryBand[] = bands.map(band => {
        const count = salaries.filter(s => s >= band.min && s < band.max).length;
        return {
          range: band.range,
          count,
          percentage: salaries.length > 0 ? Math.round((count / salaries.length) * 100) : 0,
        };
      });

      // Top companies
      const companyMap = new Map<string, number>();
      jobs.forEach(job => {
        const company = job.company
          .replace(/\s*(Recruitment|Ltd|Limited|PLC|Inc|Group|Agency)\.?$/gi, '')
          .trim();
        if (company) {
          companyMap.set(company, (companyMap.get(company) || 0) + 1);
        }
      });

      const topCompanies: TopCompany[] = Array.from(companyMap.entries())
        .map(([company, jobCount]) => ({ company, jobCount }))
        .sort((a, b) => b.jobCount - a.jobCount)
        .slice(0, 8);

      // Last updated
      const lastUpdated = jobs[0]?.updated_at || jobs[0]?.posted_date || null;

      return {
        totalJobs,
        averageSalary,
        medianSalary,
        newJobsToday,
        newJobsThisWeek,
        regionStats,
        jobTypeStats,
        salaryBands,
        topCompanies,
        lastUpdated,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
