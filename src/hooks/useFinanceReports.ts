import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo } from "react";

// Types
export interface ProfitabilitySummary {
  totalRevenue: number;
  totalCosts: number;
  grossProfit: number;
  profitMargin: number;
  totalInvoiced: number;
  totalPaid: number;
  outstandingAmount: number;
  avgJobProfit: number;
  jobCount: number;
}

export interface CashFlowSummary {
  invoicedThisMonth: number;
  paidThisMonth: number;
  overdueAmount: number;
  overdueCount: number;
  dueThisWeek: number;
  dueThisWeekCount: number;
  avgDaysToPayment: number;
  totalOutstanding: number;
}

export interface ExpenseTrend {
  period: string;
  total: number;
  categories: Record<string, number>;
}

export interface ExpenseCategorySummary {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

export interface JobProfitability {
  jobId: string;
  jobTitle: string;
  client: string;
  budgetTotal: number;
  actualTotal: number;
  invoiced: number;
  paid: number;
  profit: number;
  margin: number;
  status: string;
}

export interface MonthlyFinancials {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

// Fetch invoices for cash flow analysis
async function fetchInvoices() {
  const { data, error } = await supabase
    .from("employer_invoices")
    .select("id, invoice_number, client, amount, status, due_date, paid_date, job_id, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// Fetch expenses for trends
async function fetchExpenses() {
  const { data, error } = await supabase
    .from("employer_expense_claims")
    .select("id, amount, category, status, submitted_date, paid_date")
    .order("submitted_date", { ascending: false });

  if (error) throw error;
  return data || [];
}

// Fetch job financials for profitability
async function fetchJobFinancials() {
  const { data, error } = await supabase
    .from("employer_job_financials")
    .select(`
      *,
      job:employer_jobs(id, title, client, status)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// Main hook for finance reports data
export function useFinanceData() {
  const invoicesQuery = useQuery({
    queryKey: ["finance-reports", "invoices"],
    queryFn: fetchInvoices,
  });

  const expensesQuery = useQuery({
    queryKey: ["finance-reports", "expenses"],
    queryFn: fetchExpenses,
  });

  const jobFinancialsQuery = useQuery({
    queryKey: ["finance-reports", "job-financials"],
    queryFn: fetchJobFinancials,
  });

  return {
    invoices: invoicesQuery.data || [],
    expenses: expensesQuery.data || [],
    jobFinancials: jobFinancialsQuery.data || [],
    isLoading: invoicesQuery.isLoading || expensesQuery.isLoading || jobFinancialsQuery.isLoading,
    error: invoicesQuery.error || expensesQuery.error || jobFinancialsQuery.error,
    refetch: () => {
      invoicesQuery.refetch();
      expensesQuery.refetch();
      jobFinancialsQuery.refetch();
    },
  };
}

// Profitability summary hook
export function useProfitabilitySummary() {
  const { jobFinancials, invoices, isLoading, error } = useFinanceData();

  const summary = useMemo((): ProfitabilitySummary => {
    if (!jobFinancials.length) {
      return {
        totalRevenue: 0,
        totalCosts: 0,
        grossProfit: 0,
        profitMargin: 0,
        totalInvoiced: 0,
        totalPaid: 0,
        outstandingAmount: 0,
        avgJobProfit: 0,
        jobCount: 0,
      };
    }

    const totalBudget = jobFinancials.reduce((sum, j) => sum + Number(j.budget_total || 0), 0);
    const totalActual = jobFinancials.reduce((sum, j) => sum + Number(j.actual_total || 0), 0);
    const totalInvoiced = jobFinancials.reduce((sum, j) => sum + Number(j.invoiced || 0), 0);
    const totalPaid = jobFinancials.reduce((sum, j) => sum + Number(j.paid || 0), 0);

    // Also sum from invoices table for more accuracy
    const invoicedFromInvoices = invoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
    const paidFromInvoices = invoices
      .filter((inv) => inv.status === "Paid")
      .reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

    const effectiveInvoiced = Math.max(totalInvoiced, invoicedFromInvoices);
    const effectivePaid = Math.max(totalPaid, paidFromInvoices);

    const grossProfit = effectiveInvoiced - totalActual;
    const profitMargin = effectiveInvoiced > 0 ? (grossProfit / effectiveInvoiced) * 100 : 0;

    return {
      totalRevenue: effectiveInvoiced,
      totalCosts: totalActual,
      grossProfit,
      profitMargin,
      totalInvoiced: effectiveInvoiced,
      totalPaid: effectivePaid,
      outstandingAmount: effectiveInvoiced - effectivePaid,
      avgJobProfit: jobFinancials.length > 0 ? grossProfit / jobFinancials.length : 0,
      jobCount: jobFinancials.length,
    };
  }, [jobFinancials, invoices]);

  return { data: summary, isLoading, error };
}

// Cash flow summary hook
export function useCashFlowSummary() {
  const { invoices, isLoading, error } = useFinanceData();

  const summary = useMemo((): CashFlowSummary => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfWeek = new Date(now);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    // Invoiced this month
    const invoicedThisMonth = invoices
      .filter((inv) => new Date(inv.created_at) >= startOfMonth)
      .reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

    // Paid this month
    const paidThisMonth = invoices
      .filter((inv) => inv.paid_date && new Date(inv.paid_date) >= startOfMonth)
      .reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

    // Overdue
    const overdueInvoices = invoices.filter(
      (inv) => inv.status !== "Paid" && inv.due_date && new Date(inv.due_date) < now
    );
    const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

    // Due this week
    const dueThisWeekInvoices = invoices.filter(
      (inv) =>
        inv.status !== "Paid" &&
        inv.due_date &&
        new Date(inv.due_date) >= now &&
        new Date(inv.due_date) <= endOfWeek
    );
    const dueThisWeek = dueThisWeekInvoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

    // Average days to payment
    const paidInvoices = invoices.filter((inv) => inv.paid_date && inv.created_at);
    const avgDaysToPayment =
      paidInvoices.length > 0
        ? paidInvoices.reduce((sum, inv) => {
            const created = new Date(inv.created_at);
            const paid = new Date(inv.paid_date!);
            return sum + Math.ceil((paid.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
          }, 0) / paidInvoices.length
        : 0;

    // Total outstanding
    const totalOutstanding = invoices
      .filter((inv) => inv.status !== "Paid")
      .reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

    return {
      invoicedThisMonth,
      paidThisMonth,
      overdueAmount,
      overdueCount: overdueInvoices.length,
      dueThisWeek,
      dueThisWeekCount: dueThisWeekInvoices.length,
      avgDaysToPayment: Math.round(avgDaysToPayment),
      totalOutstanding,
    };
  }, [invoices]);

  return { data: summary, isLoading, error };
}

// Expense trends by month
export function useExpenseTrends(months: number = 6) {
  const { expenses, isLoading, error } = useFinanceData();

  const trends = useMemo((): ExpenseTrend[] => {
    const now = new Date();
    const result: ExpenseTrend[] = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const monthLabel = date.toLocaleDateString("en-GB", { month: "short", year: "2-digit" });

      const monthExpenses = expenses.filter((exp) => {
        const expDate = new Date(exp.submitted_date);
        return expDate >= date && expDate <= monthEnd;
      });

      const categories: Record<string, number> = {};
      let total = 0;

      monthExpenses.forEach((exp) => {
        const amount = Number(exp.amount || 0);
        total += amount;
        const cat = exp.category || "Other";
        categories[cat] = (categories[cat] || 0) + amount;
      });

      result.push({ period: monthLabel, total, categories });
    }

    return result;
  }, [expenses, months]);

  return { data: trends, isLoading, error };
}

// Expense by category summary
export function useExpensesByCategory() {
  const { expenses, isLoading, error } = useFinanceData();

  const categories = useMemo((): ExpenseCategorySummary[] => {
    const categoryMap: Record<string, { total: number; count: number }> = {};
    let grandTotal = 0;

    expenses.forEach((exp) => {
      const amount = Number(exp.amount || 0);
      const cat = exp.category || "Other";
      grandTotal += amount;

      if (!categoryMap[cat]) {
        categoryMap[cat] = { total: 0, count: 0 };
      }
      categoryMap[cat].total += amount;
      categoryMap[cat].count += 1;
    });

    return Object.entries(categoryMap)
      .map(([category, data]) => ({
        category,
        total: data.total,
        count: data.count,
        percentage: grandTotal > 0 ? (data.total / grandTotal) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);
  }, [expenses]);

  return { data: categories, isLoading, error };
}

// Job profitability ranking
export function useJobProfitability() {
  const { jobFinancials, isLoading, error } = useFinanceData();

  const jobs = useMemo((): JobProfitability[] => {
    return jobFinancials
      .filter((jf) => jf.job)
      .map((jf) => {
        const budgetTotal = Number(jf.budget_total || 0);
        const actualTotal = Number(jf.actual_total || 0);
        const invoiced = Number(jf.invoiced || 0);
        const paid = Number(jf.paid || 0);
        const profit = invoiced - actualTotal;
        const margin = invoiced > 0 ? (profit / invoiced) * 100 : 0;

        return {
          jobId: jf.job_id,
          jobTitle: jf.job?.title || "Unknown Job",
          client: jf.job?.client || "Unknown Client",
          budgetTotal,
          actualTotal,
          invoiced,
          paid,
          profit,
          margin,
          status: jf.status || "Unknown",
        };
      })
      .sort((a, b) => b.profit - a.profit);
  }, [jobFinancials]);

  return { data: jobs, isLoading, error };
}

// Monthly financials for charts
export function useMonthlyFinancials(months: number = 12) {
  const { invoices, expenses, isLoading, error } = useFinanceData();

  const monthly = useMemo((): MonthlyFinancials[] => {
    const now = new Date();
    const result: MonthlyFinancials[] = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const monthLabel = date.toLocaleDateString("en-GB", { month: "short", year: "2-digit" });

      // Revenue from paid invoices
      const revenue = invoices
        .filter((inv) => {
          const paidDate = inv.paid_date ? new Date(inv.paid_date) : null;
          return paidDate && paidDate >= date && paidDate <= monthEnd;
        })
        .reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

      // Expenses paid
      const expenseTotal = expenses
        .filter((exp) => {
          const expDate = new Date(exp.submitted_date);
          return expDate >= date && expDate <= monthEnd && exp.status === "Paid";
        })
        .reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

      result.push({
        month: monthLabel,
        revenue,
        expenses: expenseTotal,
        profit: revenue - expenseTotal,
      });
    }

    return result;
  }, [invoices, expenses, months]);

  return { data: monthly, isLoading, error };
}

// Quick stats for dashboard cards
export function useFinanceQuickStats() {
  const { data: profitability, isLoading: profitLoading } = useProfitabilitySummary();
  const { data: cashFlow, isLoading: cashLoading } = useCashFlowSummary();
  const { data: expenseCategories, isLoading: expLoading } = useExpensesByCategory();

  const isLoading = profitLoading || cashLoading || expLoading;

  const topExpenseCategory = expenseCategories.length > 0 ? expenseCategories[0] : null;

  return {
    isLoading,
    profitMargin: profitability.profitMargin,
    totalRevenue: profitability.totalRevenue,
    totalCosts: profitability.totalCosts,
    outstandingAmount: cashFlow.totalOutstanding,
    overdueAmount: cashFlow.overdueAmount,
    overdueCount: cashFlow.overdueCount,
    avgDaysToPayment: cashFlow.avgDaysToPayment,
    topExpenseCategory: topExpenseCategory?.category || "N/A",
    topExpenseAmount: topExpenseCategory?.total || 0,
  };
}

// Format currency helper (UK pounds)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format percentage helper
export function formatPercentage(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}
