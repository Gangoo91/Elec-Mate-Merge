import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { addDays, isAfter, isBefore } from "date-fns";

export interface EmployerDashboardStats {
  // Counts
  activeEmployees: number;
  activeJobs: number;
  expiringCertifications: number;
  availableTalent: number;
  pendingExpenses: number;
  openVacancies: number;

  // Revenue
  currentRevenue: number;
  targetRevenue: number;
  revenueGrowthPercent: number;

  // Compliance
  safetyScore: number;

  // Deadlines (upcoming expirations)
  upcomingDeadlines: {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    urgent: boolean;
  }[];

  // Recent activity
  recentActivities: {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'employee' | 'job' | 'certification' | 'invoice' | 'expense';
  }[];
}

interface UseEmployerDashboardStatsReturn {
  stats: EmployerDashboardStats;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const DEFAULT_STATS: EmployerDashboardStats = {
  activeEmployees: 0,
  activeJobs: 0,
  expiringCertifications: 0,
  availableTalent: 0,
  pendingExpenses: 0,
  openVacancies: 0,
  currentRevenue: 0,
  targetRevenue: 250000, // Default annual target
  revenueGrowthPercent: 0,
  safetyScore: 100,
  upcomingDeadlines: [],
  recentActivities: [],
};

export function useEmployerDashboardStats(): UseEmployerDashboardStatsReturn {
  const [stats, setStats] = useState<EmployerDashboardStats>(DEFAULT_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Timeout to prevent infinite loading on slow mobile networks
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      console.warn('Employer dashboard stats timed out after 8s');
    }, 8000);

    try {
      const now = new Date();
      const thirtyDaysFromNow = addDays(now, 30);
      const sixtyDaysFromNow = addDays(now, 60);

      // Run all queries in parallel for performance
      const [
        employeesResult,
        jobsResult,
        certificationsResult,
        talentPoolResult,
        expensesResult,
        vacanciesResult,
        invoicesResult,
      ] = await Promise.all([
        // Active employees count
        supabase
          .from("employer_employees")
          .select("id, status")
          .eq("status", "Active"),

        // Active jobs count
        supabase
          .from("employer_jobs")
          .select("id, status, value, title, client, end_date")
          .eq("status", "Active"),

        // Certifications with expiry status
        supabase
          .from("employer_certifications")
          .select("id, name, expiry_date, status, employee_id")
          .not("expiry_date", "is", null),

        // Available talent in talent pool
        supabase
          .from("employer_elec_id_profiles")
          .select("id")
          .eq("opt_out", false)
          .eq("available_for_hire", true)
          .in("profile_visibility", ["public", "employers_only"]),

        // Pending expense claims
        supabase
          .from("employer_expense_claims")
          .select("id, status")
          .eq("status", "Pending"),

        // Open vacancies
        supabase
          .from("employer_vacancies")
          .select("id, status")
          .eq("status", "Open"),

        // Invoices for revenue calculation (paid this year)
        supabase
          .from("employer_invoices")
          .select("id, amount, status, paid_date")
          .eq("status", "Paid")
          .gte("paid_date", `${now.getFullYear()}-01-01`),
      ]);

      // Process employee stats
      const activeEmployees = employeesResult.data?.length || 0;

      // Process jobs stats
      const activeJobs = jobsResult.data?.length || 0;

      // Process certifications - count expiring (within 60 days) or expired
      const certifications = certificationsResult.data || [];
      const expiringCerts = certifications.filter((cert) => {
        if (!cert.expiry_date) return false;
        const expiryDate = new Date(cert.expiry_date);
        return isBefore(expiryDate, sixtyDaysFromNow);
      });

      // Process talent pool
      const availableTalent = talentPoolResult.data?.length || 0;

      // Process expenses
      const pendingExpenses = expensesResult.data?.length || 0;

      // Process vacancies
      const openVacancies = vacanciesResult.data?.length || 0;

      // Calculate revenue
      const paidInvoices = invoicesResult.data || [];
      const currentRevenue = paidInvoices.reduce(
        (sum, inv) => sum + (parseFloat(inv.amount) || 0),
        0
      );

      // Calculate revenue growth (compare to same period last year - simplified)
      // In production, you'd fetch last year's data too
      const revenueGrowthPercent = currentRevenue > 0 ? 16 : 0; // Placeholder

      // Build upcoming deadlines from certifications
      const upcomingDeadlines = expiringCerts
        .slice(0, 5)
        .map((cert) => {
          const expiryDate = new Date(cert.expiry_date);
          const isExpired = isBefore(expiryDate, now);
          const isUrgent = isBefore(expiryDate, thirtyDaysFromNow);

          const daysUntil = Math.ceil(
            (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );

          return {
            id: cert.id,
            title: cert.name,
            subtitle: `Certificate #${cert.id.slice(0, 8)}`,
            date: isExpired
              ? "Overdue"
              : daysUntil === 0
              ? "Today"
              : `${daysUntil} days`,
            urgent: isUrgent || isExpired,
          };
        })
        .sort((a, b) => {
          if (a.date === "Overdue") return -1;
          if (b.date === "Overdue") return 1;
          return 0;
        });

      // Calculate safety score based on compliance
      const totalCerts = certifications.length;
      const validCerts = certifications.filter((cert) => {
        if (!cert.expiry_date) return true;
        return isAfter(new Date(cert.expiry_date), now);
      }).length;
      const safetyScore = totalCerts > 0 ? Math.round((validCerts / totalCerts) * 100) : 100;

      // Build recent activities (would need activity log table in production)
      const recentActivities: EmployerDashboardStats['recentActivities'] = [];

      // Add job-based activities
      if (jobsResult.data) {
        jobsResult.data.slice(0, 2).forEach((job) => {
          recentActivities.push({
            id: job.id,
            title: "Job in progress",
            description: `${job.title} - ${job.client}`,
            time: "Recently",
            type: 'job',
          });
        });
      }

      setStats({
        activeEmployees,
        activeJobs,
        expiringCertifications: expiringCerts.length,
        availableTalent,
        pendingExpenses,
        openVacancies,
        currentRevenue,
        targetRevenue: 250000, // Could come from settings
        revenueGrowthPercent,
        safetyScore,
        upcomingDeadlines,
        recentActivities,
      });
    } catch (err) {
      console.error("Error fetching employer dashboard stats:", err);
      setError("Failed to load dashboard statistics");
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Real-time subscriptions for key tables
  useEffect(() => {
    const channel = supabase
      .channel("employer-dashboard-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employer_employees" },
        () => fetchStats()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employer_jobs" },
        () => fetchStats()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employer_certifications" },
        () => fetchStats()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employer_expense_claims" },
        () => fetchStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
}
