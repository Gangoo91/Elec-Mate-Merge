/**
 * Finance Export Utilities
 *
 * Provides CSV export functionality for finance data including
 * expenses, invoices, job financials, and comprehensive reports.
 */

import { format } from "date-fns";

// Generic CSV export function
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  columns: { key: keyof T | string; header: string; format?: (value: any, row: T) => string }[],
  filename: string
): void {
  if (data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // Create CSV header
  const headers = columns.map((col) => `"${col.header}"`).join(",");

  // Create CSV rows
  const rows = data.map((row) => {
    return columns
      .map((col) => {
        const key = col.key as string;
        const value = key.includes(".")
          ? key.split(".").reduce((obj, k) => obj?.[k], row as any)
          : row[key];

        const formatted = col.format ? col.format(value, row) : value;

        // Handle different value types
        if (formatted === null || formatted === undefined) {
          return '""';
        }
        if (typeof formatted === "string") {
          // Escape quotes and wrap in quotes
          return `"${formatted.replace(/"/g, '""')}"`;
        }
        if (typeof formatted === "number") {
          return formatted.toString();
        }
        return `"${String(formatted).replace(/"/g, '""')}"`;
      })
      .join(",");
  });

  // Combine and create blob
  const csv = [headers, ...rows].join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });

  // Create download link
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${format(new Date(), "yyyy-MM-dd")}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Format currency for export
export function formatCurrencyForExport(amount: number | string | null | undefined): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (num === null || num === undefined || isNaN(num)) return "0.00";
  return num.toFixed(2);
}

// Format date for export
export function formatDateForExport(date: string | Date | null | undefined): string {
  if (!date) return "";
  try {
    return format(new Date(date), "dd/MM/yyyy");
  } catch {
    return "";
  }
}

// Export expenses to CSV
interface ExpenseExportData {
  id: string;
  description?: string;
  amount: number | string;
  category?: string;
  submitted_date: string;
  status: string;
  employee_id: string;
  employees?: { name: string };
  job_id?: string;
  jobs?: { title: string };
  has_receipt?: boolean;
  approved_by?: string;
  approved_date?: string;
  notes?: string;
}

export function exportExpenses(expenses: ExpenseExportData[], filename = "expenses"): void {
  exportToCSV(
    expenses,
    [
      { key: "submitted_date", header: "Date", format: (v) => formatDateForExport(v) },
      { key: "employees.name", header: "Employee", format: (v) => v || "Unknown" },
      { key: "description", header: "Description", format: (v) => v || "" },
      { key: "category", header: "Category", format: (v) => v || "" },
      { key: "amount", header: "Amount (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "status", header: "Status", format: (v) => v || "" },
      { key: "jobs.title", header: "Job", format: (v) => v || "" },
      { key: "has_receipt", header: "Receipt", format: (v) => (v ? "Yes" : "No") },
      { key: "approved_by", header: "Approved By", format: (v) => v || "" },
      { key: "approved_date", header: "Approved Date", format: (v) => formatDateForExport(v) },
      { key: "notes", header: "Notes", format: (v) => v || "" },
    ],
    filename
  );
}

// Export invoices to CSV
interface InvoiceExportData {
  id: string;
  invoice_number?: string;
  client_name?: string;
  amount: number | string;
  status: string;
  issue_date?: string;
  due_date?: string;
  paid_date?: string;
  job_id?: string;
  jobs?: { title: string };
  description?: string;
}

export function exportInvoices(invoices: InvoiceExportData[], filename = "invoices"): void {
  exportToCSV(
    invoices,
    [
      { key: "invoice_number", header: "Invoice No.", format: (v) => v || "" },
      { key: "issue_date", header: "Issue Date", format: (v) => formatDateForExport(v) },
      { key: "client_name", header: "Client", format: (v) => v || "" },
      { key: "description", header: "Description", format: (v) => v || "" },
      { key: "amount", header: "Amount (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "status", header: "Status", format: (v) => v || "" },
      { key: "due_date", header: "Due Date", format: (v) => formatDateForExport(v) },
      { key: "paid_date", header: "Paid Date", format: (v) => formatDateForExport(v) },
      { key: "jobs.title", header: "Job", format: (v) => v || "" },
    ],
    filename
  );
}

// Export job financials to CSV
interface JobFinancialExportData {
  id: string;
  job_id: string;
  jobs?: { title: string; client?: string };
  budget_total: number | string;
  actual_total: number | string;
  invoiced_total: number | string;
  paid_total: number | string;
  budget_labour?: number | string;
  budget_materials?: number | string;
  budget_equipment?: number | string;
  budget_overheads?: number | string;
  budget_profit?: number | string;
  actual_labour?: number | string;
  actual_materials?: number | string;
  actual_equipment?: number | string;
  actual_overheads?: number | string;
}

export function exportJobFinancials(
  financials: JobFinancialExportData[],
  filename = "job-financials"
): void {
  exportToCSV(
    financials,
    [
      { key: "jobs.title", header: "Job Title", format: (v) => v || "Untitled Job" },
      { key: "jobs.client", header: "Client", format: (v) => v || "" },
      { key: "budget_total", header: "Budget Total (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "actual_total", header: "Actual Total (£)", format: (v) => formatCurrencyForExport(v) },
      {
        key: "variance",
        header: "Variance (£)",
        format: (_, row) => {
          const budget = parseFloat(String(row.budget_total)) || 0;
          const actual = parseFloat(String(row.actual_total)) || 0;
          return formatCurrencyForExport(budget - actual);
        },
      },
      { key: "invoiced_total", header: "Invoiced (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "paid_total", header: "Paid (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "budget_labour", header: "Budget Labour (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "budget_materials", header: "Budget Materials (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "budget_equipment", header: "Budget Equipment (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "budget_overheads", header: "Budget Overheads (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "budget_profit", header: "Budget Profit (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "actual_labour", header: "Actual Labour (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "actual_materials", header: "Actual Materials (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "actual_equipment", header: "Actual Equipment (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "actual_overheads", header: "Actual Overheads (£)", format: (v) => formatCurrencyForExport(v) },
    ],
    filename
  );
}

// Export variation orders to CSV
interface VariationOrderExportData {
  id: string;
  job_id: string;
  jobs?: { title: string };
  description: string;
  value: number | string;
  status: string;
  created_at: string;
  approved_by?: string;
  approved_date?: string;
  notes?: string;
}

export function exportVariationOrders(
  orders: VariationOrderExportData[],
  filename = "variation-orders"
): void {
  exportToCSV(
    orders,
    [
      { key: "created_at", header: "Date", format: (v) => formatDateForExport(v) },
      { key: "jobs.title", header: "Job", format: (v) => v || "" },
      { key: "description", header: "Description", format: (v) => v || "" },
      { key: "value", header: "Value (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "status", header: "Status", format: (v) => v || "" },
      { key: "approved_by", header: "Approved By", format: (v) => v || "" },
      { key: "approved_date", header: "Approved Date", format: (v) => formatDateForExport(v) },
      { key: "notes", header: "Notes", format: (v) => v || "" },
    ],
    filename
  );
}

// Export profitability report to CSV
interface ProfitabilityExportData {
  jobId: string;
  title: string;
  client?: string;
  revenue: number;
  costs: number;
  profit: number;
  margin: number;
}

export function exportProfitabilityReport(
  data: ProfitabilityExportData[],
  filename = "profitability-report"
): void {
  exportToCSV(
    data,
    [
      { key: "title", header: "Job Title", format: (v) => v || "Untitled" },
      { key: "client", header: "Client", format: (v) => v || "" },
      { key: "revenue", header: "Revenue (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "costs", header: "Costs (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "profit", header: "Profit (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "margin", header: "Margin (%)", format: (v) => (v as number).toFixed(1) },
    ],
    filename
  );
}

// Export expense by category summary to CSV
interface ExpenseByCategoryData {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

export function exportExpensesByCategory(
  data: ExpenseByCategoryData[],
  filename = "expenses-by-category"
): void {
  exportToCSV(
    data,
    [
      { key: "category", header: "Category", format: (v) => v || "" },
      { key: "count", header: "Number of Expenses", format: (v) => String(v || 0) },
      { key: "total", header: "Total (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "percentage", header: "Percentage (%)", format: (v) => (v as number).toFixed(1) },
    ],
    filename
  );
}

// Export monthly financial summary to CSV
interface MonthlyFinancialData {
  month: string;
  revenue: number;
  costs: number;
  profit: number;
  expenses: number;
  invoiced: number;
}

export function exportMonthlyFinancials(
  data: MonthlyFinancialData[],
  filename = "monthly-financials"
): void {
  exportToCSV(
    data,
    [
      { key: "month", header: "Month", format: (v) => v || "" },
      { key: "revenue", header: "Revenue (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "costs", header: "Costs (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "profit", header: "Profit (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "expenses", header: "Expenses (£)", format: (v) => formatCurrencyForExport(v) },
      { key: "invoiced", header: "Invoiced (£)", format: (v) => formatCurrencyForExport(v) },
    ],
    filename
  );
}

// Generate comprehensive finance summary report
interface FinanceSummaryInput {
  profitability?: {
    totalRevenue: number;
    totalCosts: number;
    netProfit: number;
    profitMargin: number;
  };
  cashFlow?: {
    totalPaid: number;
    totalOutstanding: number;
    totalOverdue: number;
    invoicesPaid: number;
    invoicesOutstanding: number;
    invoicesOverdue: number;
    collectionRate: number;
    averageDaysToPayment: number;
  };
  expensesByCategory?: ExpenseByCategoryData[];
  jobProfitability?: ProfitabilityExportData[];
  dateRange?: { from: Date; to: Date };
}

export function generateFinanceSummaryCSV(
  input: FinanceSummaryInput,
  filename = "finance-summary"
): void {
  const lines: string[] = [];
  const dateFrom = input.dateRange?.from
    ? format(input.dateRange.from, "dd/MM/yyyy")
    : "All time";
  const dateTo = input.dateRange?.to ? format(input.dateRange.to, "dd/MM/yyyy") : "Present";

  // Header
  lines.push(`"Finance Summary Report"`);
  lines.push(`"Generated","${format(new Date(), "dd/MM/yyyy HH:mm")}"`);
  lines.push(`"Period","${dateFrom} - ${dateTo}"`);
  lines.push("");

  // Profitability Section
  if (input.profitability) {
    lines.push(`"PROFITABILITY SUMMARY"`);
    lines.push(`"Total Revenue","£${formatCurrencyForExport(input.profitability.totalRevenue)}"`);
    lines.push(`"Total Costs","£${formatCurrencyForExport(input.profitability.totalCosts)}"`);
    lines.push(`"Net Profit","£${formatCurrencyForExport(input.profitability.netProfit)}"`);
    lines.push(`"Profit Margin","${input.profitability.profitMargin.toFixed(1)}%"`);
    lines.push("");
  }

  // Cash Flow Section
  if (input.cashFlow) {
    lines.push(`"CASH FLOW SUMMARY"`);
    lines.push(`"Total Paid","£${formatCurrencyForExport(input.cashFlow.totalPaid)}"`);
    lines.push(`"Total Outstanding","£${formatCurrencyForExport(input.cashFlow.totalOutstanding)}"`);
    lines.push(`"Total Overdue","£${formatCurrencyForExport(input.cashFlow.totalOverdue)}"`);
    lines.push(`"Invoices Paid","${input.cashFlow.invoicesPaid}"`);
    lines.push(`"Invoices Outstanding","${input.cashFlow.invoicesOutstanding}"`);
    lines.push(`"Invoices Overdue","${input.cashFlow.invoicesOverdue}"`);
    lines.push(`"Collection Rate","${input.cashFlow.collectionRate.toFixed(1)}%"`);
    lines.push(`"Average Days to Payment","${input.cashFlow.averageDaysToPayment}"`);
    lines.push("");
  }

  // Expenses by Category Section
  if (input.expensesByCategory && input.expensesByCategory.length > 0) {
    lines.push(`"EXPENSES BY CATEGORY"`);
    lines.push(`"Category","Count","Total","Percentage"`);
    input.expensesByCategory.forEach((cat) => {
      lines.push(
        `"${cat.category}","${cat.count}","£${formatCurrencyForExport(cat.total)}","${cat.percentage.toFixed(1)}%"`
      );
    });
    lines.push("");
  }

  // Job Profitability Section
  if (input.jobProfitability && input.jobProfitability.length > 0) {
    lines.push(`"JOB PROFITABILITY (Top 10)"`);
    lines.push(`"Job","Client","Revenue","Costs","Profit","Margin"`);
    input.jobProfitability.slice(0, 10).forEach((job) => {
      lines.push(
        `"${job.title}","${job.client || ""}","£${formatCurrencyForExport(job.revenue)}","£${formatCurrencyForExport(job.costs)}","£${formatCurrencyForExport(job.profit)}","${job.margin.toFixed(1)}%"`
      );
    });
  }

  // Create and download
  const csv = lines.join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${format(new Date(), "yyyy-MM-dd")}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
