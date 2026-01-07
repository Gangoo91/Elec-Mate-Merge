/**
 * Smart Sorting Utilities for Quotes and Invoices
 *
 * Sorts items by business priority to surface actionable items first.
 */

import type { Quote, Invoice } from "@/services/financeService";

// Quote Priority Levels
// 1 = Highest priority (needs immediate action)
// Higher numbers = lower priority
const getQuotePriority = (quote: Quote): number => {
  const daysUntilExpiry = quote.valid_until
    ? Math.ceil((new Date(quote.valid_until).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 7;
  const isExpired = daysUntilExpiry !== null && daysUntilExpiry < 0;

  // Priority 1: Needs immediate action
  if (quote.status === "Client Declined") return 1;
  if (isExpiringSoon && quote.status === "Sent") return 2;
  if (quote.status === "Draft") return 3;

  // Priority 2: Awaiting response
  if (quote.status === "Sent") return 4;
  if (quote.status === "Client Accepted") return 5;

  // Priority 3: Completed/Archived
  if (quote.status === "Approved") return 6;
  if (quote.status === "Rejected") return 7;
  if (isExpired) return 8;

  return 9;
};

// Invoice Priority Levels
const getInvoicePriority = (invoice: Invoice): number => {
  const daysUntilDue = invoice.due_date
    ? Math.ceil((new Date(invoice.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isOverdue = daysUntilDue !== null && daysUntilDue < 0 && invoice.status !== "Paid";
  const isDueSoon = daysUntilDue !== null && daysUntilDue >= 0 && daysUntilDue <= 7;

  // Priority 1: Urgent - money owed
  if (isOverdue || invoice.status === "Overdue") return 1;
  if (isDueSoon && invoice.status !== "Paid") return 2;

  // Priority 2: Awaiting payment
  if (invoice.status === "Pending" || invoice.status === "Sent") return 3;
  if (invoice.status === "Draft") return 4;

  // Priority 3: Completed
  if (invoice.status === "Paid") return 5;

  return 6;
};

/**
 * Sort quotes by business priority
 *
 * Priority order:
 * 1. Client Declined (needs follow-up)
 * 2. Expiring Soon (sent, <=7 days left)
 * 3. Draft (incomplete work)
 * 4. Sent (awaiting response)
 * 5. Client Accepted (ready to invoice)
 * 6. Approved
 * 7. Rejected
 * 8. Expired
 */
export const sortQuotes = (quotes: Quote[]): Quote[] => {
  return [...quotes].sort((a, b) => {
    const priorityA = getQuotePriority(a);
    const priorityB = getQuotePriority(b);

    // Different priority - sort by priority
    if (priorityA !== priorityB) return priorityA - priorityB;

    // Same priority - sort by date (newest first for most categories)
    // For "Sent" quotes, sort oldest first (follow up on older ones)
    if (a.status === "Sent" && b.status === "Sent") {
      const dateA = a.sent_date ? new Date(a.sent_date).getTime() : 0;
      const dateB = b.sent_date ? new Date(b.sent_date).getTime() : 0;
      return dateA - dateB; // Oldest first
    }

    // Default: newest first
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
};

/**
 * Sort invoices by business priority
 *
 * Priority order:
 * 1. Overdue (sorted by days overdue, most overdue first)
 * 2. Due Soon (<=7 days, sorted by due date)
 * 3. Pending/Sent (awaiting payment, largest amounts first)
 * 4. Draft (needs to be sent)
 * 5. Paid (most recently paid first)
 */
export const sortInvoices = (invoices: Invoice[]): Invoice[] => {
  return [...invoices].sort((a, b) => {
    const priorityA = getInvoicePriority(a);
    const priorityB = getInvoicePriority(b);

    // Different priority - sort by priority
    if (priorityA !== priorityB) return priorityA - priorityB;

    // Same priority level - apply secondary sorting

    // Overdue: sort by days overdue (most overdue first)
    if (priorityA === 1) {
      const daysOverdueA = a.due_date
        ? Math.abs(Math.ceil((Date.now() - new Date(a.due_date).getTime()) / (1000 * 60 * 60 * 24)))
        : 0;
      const daysOverdueB = b.due_date
        ? Math.abs(Math.ceil((Date.now() - new Date(b.due_date).getTime()) / (1000 * 60 * 60 * 24)))
        : 0;
      if (daysOverdueA !== daysOverdueB) return daysOverdueB - daysOverdueA;
      // If same days overdue, largest amount first
      return Number(b.amount) - Number(a.amount);
    }

    // Due soon: sort by due date (soonest first)
    if (priorityA === 2) {
      const dueA = a.due_date ? new Date(a.due_date).getTime() : Infinity;
      const dueB = b.due_date ? new Date(b.due_date).getTime() : Infinity;
      return dueA - dueB;
    }

    // Pending/Sent: largest amounts first (more revenue impact)
    if (priorityA === 3) {
      return Number(b.amount) - Number(a.amount);
    }

    // Paid: most recently paid first
    if (a.status === "Paid" && b.status === "Paid") {
      const paidA = a.paid_date ? new Date(a.paid_date).getTime() : 0;
      const paidB = b.paid_date ? new Date(b.paid_date).getTime() : 0;
      return paidB - paidA;
    }

    // Default: newest first
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
};

/**
 * Get priority badge info for a quote
 */
export const getQuotePriorityBadge = (quote: Quote): {
  label: string;
  variant: "destructive" | "warning" | "default" | "secondary" | "success";
  icon?: string;
} | null => {
  const daysUntilExpiry = quote.valid_until
    ? Math.ceil((new Date(quote.valid_until).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  if (quote.status === "Client Declined") {
    return { label: "Declined", variant: "destructive" };
  }

  if (daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 7 && quote.status === "Sent") {
    return { label: `Expires in ${daysUntilExpiry}d`, variant: "warning" };
  }

  if (quote.status === "Draft") {
    return { label: "Draft", variant: "secondary" };
  }

  if (quote.status === "Sent") {
    return { label: "Awaiting Response", variant: "default" };
  }

  if (quote.status === "Client Accepted" || quote.status === "Approved") {
    return { label: "Ready to Invoice", variant: "success" };
  }

  if (daysUntilExpiry !== null && daysUntilExpiry < 0) {
    return { label: "Expired", variant: "secondary" };
  }

  return null;
};

/**
 * Get priority badge info for an invoice
 */
export const getInvoicePriorityBadge = (invoice: Invoice): {
  label: string;
  variant: "destructive" | "warning" | "default" | "secondary" | "success";
  urgent?: boolean;
} | null => {
  const daysUntilDue = invoice.due_date
    ? Math.ceil((new Date(invoice.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  if (invoice.status === "Paid") {
    return { label: "Paid", variant: "success" };
  }

  if (invoice.status === "Overdue" || (daysUntilDue !== null && daysUntilDue < 0)) {
    const daysOverdue = daysUntilDue !== null ? Math.abs(daysUntilDue) : 0;
    return { label: `${daysOverdue}d overdue`, variant: "destructive", urgent: true };
  }

  if (daysUntilDue !== null && daysUntilDue >= 0 && daysUntilDue <= 7) {
    return { label: `Due in ${daysUntilDue}d`, variant: "warning" };
  }

  if (invoice.status === "Pending" || invoice.status === "Sent") {
    return { label: "Awaiting Payment", variant: "default" };
  }

  if (invoice.status === "Draft") {
    return { label: "Draft", variant: "secondary" };
  }

  return null;
};
