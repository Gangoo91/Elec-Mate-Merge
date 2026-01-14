import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, subMonths, endOfMonth, isAfter, isBefore } from "date-fns";

// Types
export interface BusinessMetrics {
  revenue: {
    current: number;
    previous: number;
    target: number;
  };
  profit: {
    current: number;
    previous: number;
    target: number;
  };
  activeJobs: number;
  completedJobs: number;
  pendingJobs: number;
  totalJobs: number;
  employees: number;
  certifications: number;
  expiringSoonCertifications: number;
  expiredCertifications: number;
  complianceRate: number;
  safetyScore: number;
}

export interface InvoiceSummary {
  id: string;
  client: string;
  project: string | null;
  amount: number;
  status: string;
  dueDate: string | null;
  paidDate: string | null;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  target: number;
}

export interface TopPerformer {
  name: string;
  jobs: number;
  revenue: number;
}

export interface JobsByStatus {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

// Fetch business metrics aggregated from real data
export function useBusinessMetrics() {
  return useQuery({
    queryKey: ['business-metrics'],
    queryFn: async (): Promise<BusinessMetrics> => {
      const now = new Date();
      const currentMonthStart = startOfMonth(now);
      const previousMonthStart = startOfMonth(subMonths(now, 1));
      const previousMonthEnd = endOfMonth(subMonths(now, 1));

      // Fetch invoices for revenue calculation
      const { data: invoices, error: invoicesError } = await supabase
        .from('employer_invoices')
        .select('amount, status, paid_date, created_at');

      if (invoicesError) throw invoicesError;

      // Calculate current month revenue (paid invoices this month)
      const currentMonthPaid = (invoices || [])
        .filter(inv => {
          if (!inv.paid_date) return false;
          const paidDate = new Date(inv.paid_date);
          return isAfter(paidDate, currentMonthStart) || paidDate.getTime() === currentMonthStart.getTime();
        })
        .reduce((sum, inv) => sum + Number(inv.amount), 0);

      // Calculate previous month revenue
      const previousMonthPaid = (invoices || [])
        .filter(inv => {
          if (!inv.paid_date) return false;
          const paidDate = new Date(inv.paid_date);
          return (isAfter(paidDate, previousMonthStart) || paidDate.getTime() === previousMonthStart.getTime()) &&
                 (isBefore(paidDate, previousMonthEnd) || paidDate.getTime() === previousMonthEnd.getTime());
        })
        .reduce((sum, inv) => sum + Number(inv.amount), 0);

      // Estimate profit as 30% of revenue (can be refined later)
      const profitMargin = 0.30;
      const currentProfit = currentMonthPaid * profitMargin;
      const previousProfit = previousMonthPaid * profitMargin;

      // Target is 10% higher than previous month or minimum £50k
      const revenueTarget = Math.max(previousMonthPaid * 1.1, 50000);
      const profitTarget = revenueTarget * profitMargin;

      // Fetch jobs for job counts
      const { data: jobs, error: jobsError } = await supabase
        .from('employer_jobs')
        .select('status')
        .is('archived_at', null)
        .eq('is_template', false);

      if (jobsError) throw jobsError;

      const jobCounts = {
        active: 0,
        completed: 0,
        pending: 0,
        onHold: 0,
        cancelled: 0,
      };

      (jobs || []).forEach(job => {
        switch (job.status) {
          case 'Active': jobCounts.active++; break;
          case 'Completed': jobCounts.completed++; break;
          case 'Pending': jobCounts.pending++; break;
          case 'On Hold': jobCounts.onHold++; break;
          case 'Cancelled': jobCounts.cancelled++; break;
        }
      });

      // Fetch employees count
      const { count: employeeCount, error: empError } = await supabase
        .from('employer_employees')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Active');

      if (empError) throw empError;

      // Fetch certifications for compliance
      const { data: certifications, error: certError } = await supabase
        .from('employer_certifications')
        .select('status, expiry_date');

      if (certError) throw certError;

      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      let validCerts = 0;
      let expiringSoon = 0;
      let expired = 0;

      (certifications || []).forEach(cert => {
        if (cert.status === 'Expired' || (cert.expiry_date && new Date(cert.expiry_date) < now)) {
          expired++;
        } else if (cert.expiry_date && new Date(cert.expiry_date) < thirtyDaysFromNow) {
          expiringSoon++;
        } else {
          validCerts++;
        }
      });

      const totalCerts = validCerts + expiringSoon + expired;
      const complianceRate = totalCerts > 0 ? Math.round((validCerts / totalCerts) * 100) : 100;

      // Fetch incidents for safety score (no incidents = 100, each incident reduces score)
      const { count: incidentCount, error: incError } = await supabase
        .from('employer_incidents')
        .select('*', { count: 'exact', head: true })
        .gte('reported_at', subMonths(now, 3).toISOString());

      // Table may not exist - default to perfect score
      const safetyScore = incError ? 100 : Math.max(100 - (incidentCount || 0) * 5, 0);

      return {
        revenue: {
          current: currentMonthPaid,
          previous: previousMonthPaid,
          target: revenueTarget,
        },
        profit: {
          current: currentProfit,
          previous: previousProfit,
          target: profitTarget,
        },
        activeJobs: jobCounts.active,
        completedJobs: jobCounts.completed,
        pendingJobs: jobCounts.pending,
        totalJobs: (jobs || []).length,
        employees: employeeCount || 0,
        certifications: totalCerts,
        expiringSoonCertifications: expiringSoon,
        expiredCertifications: expired,
        complianceRate,
        safetyScore,
      };
    },
  });
}

// Fetch invoices for the Outstanding Payments section
export function useInvoiceSummaries() {
  return useQuery({
    queryKey: ['invoice-summaries'],
    queryFn: async (): Promise<InvoiceSummary[]> => {
      const { data, error } = await supabase
        .from('employer_invoices')
        .select('id, invoice_number, client, project, amount, status, due_date, paid_date')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(inv => ({
        id: inv.invoice_number || inv.id,
        client: inv.client,
        project: inv.project,
        amount: Number(inv.amount),
        status: inv.status,
        dueDate: inv.due_date,
        paidDate: inv.paid_date,
      }));
    },
  });
}

// Fetch monthly revenue data for charts (last 6 months)
export function useMonthlyRevenue() {
  return useQuery({
    queryKey: ['monthly-revenue'],
    queryFn: async (): Promise<MonthlyRevenue[]> => {
      const now = new Date();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      // Get invoices from the last 6 months
      const sixMonthsAgo = subMonths(now, 6);

      const { data: invoices, error } = await supabase
        .from('employer_invoices')
        .select('amount, paid_date')
        .eq('status', 'Paid')
        .gte('paid_date', sixMonthsAgo.toISOString().split('T')[0]);

      if (error) throw error;

      // Initialize monthly data for last 6 months
      const monthlyData: Map<string, number> = new Map();
      for (let i = 5; i >= 0; i--) {
        const monthDate = subMonths(now, i);
        const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`;
        monthlyData.set(monthKey, 0);
      }

      // Aggregate invoice amounts by month
      (invoices || []).forEach(inv => {
        if (inv.paid_date) {
          const paidDate = new Date(inv.paid_date);
          const monthKey = `${paidDate.getFullYear()}-${String(paidDate.getMonth() + 1).padStart(2, '0')}`;
          if (monthlyData.has(monthKey)) {
            monthlyData.set(monthKey, (monthlyData.get(monthKey) || 0) + Number(inv.amount));
          }
        }
      });

      // Convert to array format for charts
      const result: MonthlyRevenue[] = [];
      monthlyData.forEach((revenue, monthKey) => {
        const [year, month] = monthKey.split('-');
        const monthIndex = parseInt(month) - 1;
        result.push({
          month: monthNames[monthIndex],
          revenue: Math.round(revenue / 1000), // Convert to thousands for chart
          target: Math.round(50), // Default target, can be made configurable
        });
      });

      return result;
    },
  });
}

// Fetch jobs by status for the pie/bar charts
export function useJobsByStatus() {
  return useQuery({
    queryKey: ['jobs-by-status'],
    queryFn: async (): Promise<JobsByStatus[]> => {
      const { data: jobs, error } = await supabase
        .from('employer_jobs')
        .select('status')
        .is('archived_at', null)
        .eq('is_template', false);

      if (error) throw error;

      const statusCounts: Record<string, number> = {
        'Completed': 0,
        'Active': 0,
        'Pending': 0,
        'On Hold': 0,
      };

      const statusColors: Record<string, string> = {
        'Completed': 'hsl(var(--success))',
        'Active': 'hsl(var(--primary))',
        'Pending': 'hsl(var(--muted-foreground))',
        'On Hold': 'hsl(var(--warning))',
      };

      (jobs || []).forEach(job => {
        if (job.status in statusCounts) {
          statusCounts[job.status]++;
        }
      });

      const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

      return Object.entries(statusCounts)
        .filter(([_, count]) => count > 0)
        .map(([status, count]) => ({
          status,
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
          color: statusColors[status] || 'hsl(var(--muted))',
        }));
    },
  });
}

// Fetch compliance data for pie chart (certification status)
export function useComplianceData() {
  return useQuery({
    queryKey: ['compliance-data'],
    queryFn: async () => {
      const now = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const { data: certifications, error } = await supabase
        .from('employer_certifications')
        .select('status, expiry_date');

      if (error) throw error;

      let valid = 0;
      let expiring = 0;
      let expired = 0;

      (certifications || []).forEach(cert => {
        if (cert.status === 'Expired' || (cert.expiry_date && new Date(cert.expiry_date) < now)) {
          expired++;
        } else if (cert.expiry_date && new Date(cert.expiry_date) < thirtyDaysFromNow) {
          expiring++;
        } else {
          valid++;
        }
      });

      const total = valid + expiring + expired;

      return [
        { name: 'Valid', value: total > 0 ? Math.round((valid / total) * 100) : 100, color: 'hsl(var(--success))' },
        { name: 'Expiring', value: total > 0 ? Math.round((expiring / total) * 100) : 0, color: 'hsl(var(--warning))' },
        { name: 'Expired', value: total > 0 ? Math.round((expired / total) * 100) : 0, color: 'hsl(var(--destructive))' },
      ];
    },
  });
}

// Fetch top performers (employees by job assignments and invoice values)
export function useTopPerformers() {
  return useQuery({
    queryKey: ['top-performers'],
    queryFn: async (): Promise<TopPerformer[]> => {
      // Get job assignments with employee names and job values
      const { data: assignments, error: assignError } = await supabase
        .from('employer_job_assignments')
        .select(`
          employee_id,
          job_id,
          employer_employees (name),
          employer_jobs (value)
        `)
        .eq('status', 'assigned');

      if (assignError) throw assignError;

      // Aggregate by employee
      const performerMap = new Map<string, { name: string; jobs: number; revenue: number }>();

      (assignments || []).forEach((assignment: any) => {
        const empId = assignment.employee_id;
        const empName = assignment.employer_employees?.name || 'Unknown';
        const jobValue = Number(assignment.employer_jobs?.value || 0);

        if (performerMap.has(empId)) {
          const existing = performerMap.get(empId)!;
          existing.jobs++;
          existing.revenue += jobValue;
        } else {
          performerMap.set(empId, { name: empName, jobs: 1, revenue: jobValue });
        }
      });

      // Sort by revenue and take top 4
      const sorted = Array.from(performerMap.values())
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 4);

      // If no real data, return placeholder message
      if (sorted.length === 0) {
        // Get employees as fallback
        const { data: employees } = await supabase
          .from('employer_employees')
          .select('name')
          .eq('status', 'Active')
          .limit(4);

        return (employees || []).map(emp => ({
          name: emp.name,
          jobs: 0,
          revenue: 0,
        }));
      }

      return sorted;
    },
  });
}

// Payment summary stats
export function usePaymentSummary() {
  return useQuery({
    queryKey: ['payment-summary'],
    queryFn: async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: invoices, error } = await supabase
        .from('employer_invoices')
        .select('amount, status, paid_date, due_date');

      if (error) throw error;

      const now = new Date();
      let paidLast30Days = 0;
      let pending = 0;
      let overdue = 0;

      (invoices || []).forEach(inv => {
        if (inv.status === 'Paid') {
          if (inv.paid_date && new Date(inv.paid_date) >= thirtyDaysAgo) {
            paidLast30Days += Number(inv.amount);
          }
        } else if (inv.status === 'Overdue' || (inv.due_date && new Date(inv.due_date) < now && inv.status !== 'Paid')) {
          overdue += Number(inv.amount);
        } else if (inv.status === 'Pending' || inv.status === 'Sent') {
          pending += Number(inv.amount);
        }
      });

      return {
        paidLast30Days,
        pending,
        overdue,
      };
    },
  });
}
