/**
 * Business intelligence analytics tools (13)
 * Gives the agent data-driven insights for morning briefings and business reviews.
 *
 * Existing (5):
 *   - get_revenue_summary — monthly/weekly revenue, average job value
 *   - get_outstanding_payments — total owed, aging breakdown
 *   - get_business_snapshot — active jobs, pending quotes, overdue invoices, expiring certs
 *   - get_top_clients — clients ranked by revenue/activity
 *   - get_inactive_clients — dormant clients
 *
 * New (8):
 *   - get_quote_analytics — conversion rates, pipeline value, time to convert
 *   - get_pricing_analysis — average values, markup, VAT recovery
 *   - get_revenue_forecast — trends + pipeline prediction
 *   - get_seasonal_trends — monthly patterns + YoY comparison
 *   - get_client_lifetime_value — LTV, repeat rate, acquisition timeline
 *   - get_profitability_analysis — revenue - expenses = net profit
 *   - get_cash_flow_forecast — DSO, expected inflows/outflows
 *   - get_at_risk_alerts — overdue invoices, expiring quotes, VIP churn
 */

import type { UserContext } from '../auth.js';

export async function getRevenueSummary(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const period = typeof args.period === 'string' ? args.period : 'month';

  const now = new Date();
  let dateFrom: Date;

  if (period === 'week') {
    dateFrom = new Date(now);
    dateFrom.setDate(dateFrom.getDate() - 7);
  } else if (period === 'quarter') {
    dateFrom = new Date(now);
    dateFrom.setMonth(dateFrom.getMonth() - 3);
  } else if (period === 'year') {
    dateFrom = new Date(now);
    dateFrom.setFullYear(dateFrom.getFullYear() - 1);
  } else {
    // Default: month
    dateFrom = new Date(now);
    dateFrom.setMonth(dateFrom.getMonth() - 1);
  }

  // Paid invoices in the period
  const { data: paidInvoices, error } = await supabase
    .from('invoices')
    .select('id, total, paid_at, created_at, client_data')
    .eq('status', 'paid')
    .gte('paid_at', dateFrom.toISOString());

  if (error) throw new Error(`Failed to get revenue summary: ${error.message}`);

  const invoices = paidInvoices || [];
  const totalRevenue = invoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);
  const avgJobValue = invoices.length > 0 ? Math.round(totalRevenue / invoices.length) : 0;

  // Compare with previous period
  const prevFrom = new Date(dateFrom);
  const periodDays = Math.round((now.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24));
  prevFrom.setDate(prevFrom.getDate() - periodDays);

  const { data: prevInvoices } = await supabase
    .from('invoices')
    .select('total')
    .eq('status', 'paid')
    .gte('paid_at', prevFrom.toISOString())
    .lt('paid_at', dateFrom.toISOString());

  const prevRevenue = (prevInvoices || []).reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);
  const growthPercent =
    prevRevenue > 0 ? Math.round(((totalRevenue - prevRevenue) / prevRevenue) * 100) : null;

  return {
    period,
    date_from: dateFrom.toISOString().split('T')[0],
    date_to: now.toISOString().split('T')[0],
    total_revenue: totalRevenue,
    invoice_count: invoices.length,
    average_job_value: avgJobValue,
    previous_period_revenue: prevRevenue,
    growth_percent: growthPercent,
    currency: 'GBP',
  };
}

export async function getOutstandingPayments(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  // All unpaid invoices (sent but not paid)
  const { data: unpaid, error } = await supabase
    .from('invoices')
    .select('id, total, due_date, created_at, client_data, status')
    .neq('status', 'paid')
    .neq('status', 'draft');

  if (error) throw new Error(`Failed to get outstanding payments: ${error.message}`);

  const invoices = unpaid || [];
  const now = new Date();
  const totalOwed = invoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);

  // Aging breakdown
  const aging = {
    within_7_days: 0,
    within_14_days: 0,
    within_30_days: 0,
    over_30_days: 0,
    over_60_days: 0,
  };
  const agingInvoices: Record<string, typeof invoices> = {
    within_7_days: [],
    within_14_days: [],
    within_30_days: [],
    over_30_days: [],
    over_60_days: [],
  };

  for (const inv of invoices) {
    const dueDate = inv.due_date
      ? new Date(inv.due_date as string)
      : new Date(inv.created_at as string);
    const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    const amount = Number(inv.total) || 0;

    if (daysOverdue > 60) {
      aging.over_60_days += amount;
      agingInvoices.over_60_days.push(inv);
    } else if (daysOverdue > 30) {
      aging.over_30_days += amount;
      agingInvoices.over_30_days.push(inv);
    } else if (daysOverdue > 14) {
      aging.within_30_days += amount;
      agingInvoices.within_30_days.push(inv);
    } else if (daysOverdue > 7) {
      aging.within_14_days += amount;
      agingInvoices.within_14_days.push(inv);
    } else {
      aging.within_7_days += amount;
      agingInvoices.within_7_days.push(inv);
    }
  }

  return {
    total_outstanding: totalOwed,
    unpaid_invoice_count: invoices.length,
    aging_breakdown: aging,
    oldest_unpaid: invoices.length > 0 ? invoices[invoices.length - 1] : null,
    currency: 'GBP',
  };
}

export async function getBusinessSnapshot(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();
  const sevenDaysAhead = new Date(now);
  sevenDaysAhead.setDate(sevenDaysAhead.getDate() + 7);

  // Run all queries in parallel
  const [
    { count: openTasks },
    { count: overdueTasks },
    { count: pendingQuotes },
    { count: activeProjects },
    overdueInvoicesResult,
    expiringCertsResult,
    todayEventsResult,
  ] = await Promise.all([
    // Open tasks
    supabase.from('spark_tasks').select('id', { count: 'exact', head: true }).eq('status', 'open'),

    // Overdue tasks
    supabase
      .from('spark_tasks')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'open')
      .lt('due_at', now.toISOString()),

    // Pending quotes (sent, not accepted/declined)
    supabase
      .from('quotes')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'sent')
      .eq('invoice_raised', false),

    // Active projects
    supabase
      .from('spark_projects')
      .select('id', { count: 'exact', head: true })
      .in('status', ['open', 'active']),

    // Overdue invoices
    supabase
      .from('invoices')
      .select('id, total, client_data, due_date')
      .neq('status', 'paid')
      .neq('status', 'draft')
      .lt('due_date', now.toISOString()),

    // Expiring certificates (next 30 days)
    supabase
      .from('reports')
      .select('id, report_type, installation_address, expiry_date')
      .not('expiry_date', 'is', null)
      .lte('expiry_date', sevenDaysAhead.toISOString())
      .gte('expiry_date', now.toISOString()),

    // Today's calendar events
    supabase
      .from('calendar_events')
      .select('id, title, start_time, event_type')
      .gte('start_time', new Date(now.setHours(0, 0, 0, 0)).toISOString())
      .lt('start_time', new Date(now.setHours(23, 59, 59, 999)).toISOString())
      .order('start_time', { ascending: true }),
  ]);

  const overdueInvoices = overdueInvoicesResult.data || [];
  const overdueInvoiceTotal = overdueInvoices.reduce(
    (sum, inv) => sum + (Number(inv.total) || 0),
    0
  );

  return {
    open_tasks: openTasks || 0,
    overdue_tasks: overdueTasks || 0,
    active_projects: activeProjects || 0,
    pending_quotes: pendingQuotes || 0,
    overdue_invoices: overdueInvoices.length,
    overdue_invoice_total: overdueInvoiceTotal,
    expiring_certificates: (expiringCertsResult.data || []).length,
    expiring_certs_detail: expiringCertsResult.data || [],
    today_events: todayEventsResult.data || [],
    currency: 'GBP',
  };
}

export async function getInactiveClients(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const monthsInactive =
    typeof args.months_inactive === 'number' && args.months_inactive > 0 ? args.months_inactive : 6;
  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 10;

  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - monthsInactive);

  // Get all clients
  const { data: allClients, error: clientError } = await supabase
    .from('customers')
    .select('id, name, email, phone, address, created_at');

  if (clientError) throw new Error(`Failed to get clients: ${clientError.message}`);
  if (!allClients || allClients.length === 0) return { clients: [], total: 0 };

  // Get recent activity per client: quotes/invoices since cutoff
  const { data: recentQuotes } = await supabase
    .from('quotes')
    .select('customer_id, created_at, total, invoice_raised')
    .gte('created_at', cutoffDate.toISOString());

  // Get recent certs per client (by address match — certs don't have customer_id)
  const { data: recentCerts } = await supabase
    .from('reports')
    .select('id, installation_address, created_at')
    .gte('created_at', cutoffDate.toISOString());

  // Build a set of recently-active customer IDs
  const activeClientIds = new Set<string>();
  for (const q of recentQuotes || []) {
    if (q.customer_id) activeClientIds.add(q.customer_id as string);
  }

  // Get all-time revenue per client for context
  const { data: allQuotes } = await supabase
    .from('quotes')
    .select('customer_id, total, created_at, invoice_raised')
    .eq('invoice_raised', true)
    .eq('invoice_status', 'paid');

  const clientRevenue: Record<string, { total: number; last_activity: string; last_type: string }> =
    {};
  for (const q of allQuotes || []) {
    const cid = q.customer_id as string;
    if (!cid) continue;
    if (!clientRevenue[cid]) {
      clientRevenue[cid] = { total: 0, last_activity: '', last_type: '' };
    }
    clientRevenue[cid].total += Number(q.total) || 0;
    const createdAt = q.created_at as string;
    if (createdAt > clientRevenue[cid].last_activity) {
      clientRevenue[cid].last_activity = createdAt;
      clientRevenue[cid].last_type = 'invoice_paid';
    }
  }

  // Also check most recent quote (sent or otherwise) for last activity
  const { data: allClientQuotes } = await supabase
    .from('quotes')
    .select('customer_id, created_at, status')
    .order('created_at', { ascending: false });

  for (const q of allClientQuotes || []) {
    const cid = q.customer_id as string;
    if (!cid) continue;
    if (!clientRevenue[cid]) {
      clientRevenue[cid] = { total: 0, last_activity: '', last_type: '' };
    }
    const createdAt = q.created_at as string;
    if (createdAt > clientRevenue[cid].last_activity) {
      clientRevenue[cid].last_activity = createdAt;
      clientRevenue[cid].last_type = `quote_${q.status}`;
    }
  }

  // Filter to inactive clients only
  const inactiveClients = (allClients || [])
    .filter((c) => !activeClientIds.has(c.id))
    .map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      address: c.address,
      last_activity: clientRevenue[c.id]?.last_activity || c.created_at,
      last_activity_type: clientRevenue[c.id]?.last_type || 'client_created',
      total_revenue: clientRevenue[c.id]?.total || 0,
    }))
    .sort((a, b) => b.total_revenue - a.total_revenue)
    .slice(0, limit);

  return {
    clients: inactiveClients,
    total: inactiveClients.length,
    months_inactive: monthsInactive,
    currency: 'GBP',
  };
}

export async function getTopClients(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 20) : 10;
  const period = typeof args.period === 'string' ? args.period : 'year';

  const now = new Date();
  let dateFrom: Date;

  if (period === 'month') {
    dateFrom = new Date(now);
    dateFrom.setMonth(dateFrom.getMonth() - 1);
  } else if (period === 'quarter') {
    dateFrom = new Date(now);
    dateFrom.setMonth(dateFrom.getMonth() - 3);
  } else {
    dateFrom = new Date(now);
    dateFrom.setFullYear(dateFrom.getFullYear() - 1);
  }

  // Get all paid invoices with customer data
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('total, client_data, paid_at')
    .eq('status', 'paid')
    .gte('paid_at', dateFrom.toISOString());

  if (error) throw new Error(`Failed to get top clients: ${error.message}`);

  // Aggregate by customer (keyed by client_data.id or client_data.name)
  const clientMap: Record<
    string,
    { name: string; customer_id: string | null; total_revenue: number; job_count: number }
  > = {};

  for (const inv of invoices || []) {
    const clientData = inv.client_data as Record<string, unknown> | null;
    const key = (clientData?.id as string) || (clientData?.name as string) || 'Unknown';
    if (!clientMap[key]) {
      clientMap[key] = {
        name: (clientData?.name as string) || key,
        customer_id: (clientData?.id as string) || null,
        total_revenue: 0,
        job_count: 0,
      };
    }
    clientMap[key].total_revenue += Number(inv.total) || 0;
    clientMap[key].job_count += 1;
  }

  const ranked = Object.values(clientMap)
    .sort((a, b) => b.total_revenue - a.total_revenue)
    .slice(0, limit);

  return {
    period,
    top_clients: ranked,
    total_clients: Object.keys(clientMap).length,
    currency: 'GBP',
  };
}

// ─── NEW ANALYTICS TOOLS (8) ───────────────────────────────────────────

/** Helper: parse period arg to date range */
function parsePeriod(period: string): { from: Date; to: Date } {
  const to = new Date();
  const from = new Date();
  if (period === 'week') from.setDate(from.getDate() - 7);
  else if (period === 'quarter') from.setMonth(from.getMonth() - 3);
  else if (period === 'year') from.setFullYear(from.getFullYear() - 1);
  else from.setMonth(from.getMonth() - 1); // default month
  return { from, to };
}

export async function getQuoteAnalytics(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const { from } = parsePeriod(typeof args.period === 'string' ? args.period : 'quarter');

  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('id, status, total, created_at, expiry_date, invoice_raised')
    .gte('created_at', from.toISOString());

  if (error) throw new Error(`Failed to get quote analytics: ${error.message}`);

  const all = quotes || [];
  const total = all.length;
  const sent = all.filter((q) => q.status !== 'draft').length;
  const approved = all.filter((q) => q.status === 'approved' || q.invoice_raised === true).length;
  const rejected = all.filter((q) => q.status === 'rejected').length;
  const draft = all.filter((q) => q.status === 'draft').length;

  // Pipeline value: sent quotes not yet expired
  const now = new Date();
  const pipeline = all.filter(
    (q) => q.status === 'sent' && (!q.expiry_date || new Date(q.expiry_date as string) > now)
  );
  const pipelineValue = pipeline.reduce((sum, q) => sum + (Number(q.total) || 0), 0);

  // Conversion rate
  const conversionRate = sent > 0 ? Math.round((approved / sent) * 100) : 0;
  const rejectionRate = sent > 0 ? Math.round((rejected / sent) * 100) : 0;

  // Price range buckets
  const buckets: Record<string, { total: number; approved: number }> = {
    under_500: { total: 0, approved: 0 },
    '500_to_1000': { total: 0, approved: 0 },
    '1000_to_5000': { total: 0, approved: 0 },
    over_5000: { total: 0, approved: 0 },
  };

  for (const q of all) {
    const amt = Number(q.total) || 0;
    const isApproved = q.status === 'approved' || q.invoice_raised === true;
    const bucket =
      amt < 500
        ? 'under_500'
        : amt < 1000
          ? '500_to_1000'
          : amt < 5000
            ? '1000_to_5000'
            : 'over_5000';
    buckets[bucket].total++;
    if (isApproved) buckets[bucket].approved++;
  }

  const priceRangeConversion = Object.entries(buckets).map(([range, data]) => ({
    range: range
      .replace(/_/g, ' ')
      .replace('under', '<£')
      .replace('over', '>£')
      .replace('to', '-£'),
    quotes: data.total,
    approved: data.approved,
    conversion_rate: data.total > 0 ? Math.round((data.approved / data.total) * 100) : 0,
  }));

  return {
    total_quotes: total,
    by_status: { draft, sent: sent - approved - rejected, approved, rejected },
    conversion_rate_percent: conversionRate,
    rejection_rate_percent: rejectionRate,
    pipeline_value: Math.round(pipelineValue * 100) / 100,
    pipeline_count: pipeline.length,
    price_range_conversion: priceRangeConversion,
    currency: 'GBP',
  };
}

export async function getPricingAnalysis(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const { from } = parsePeriod(typeof args.period === 'string' ? args.period : 'year');

  const [quotesRes, invoicesRes] = await Promise.all([
    supabase
      .from('quotes')
      .select('id, total, vat_amount, settings, created_at')
      .gte('created_at', from.toISOString()),
    supabase
      .from('invoices')
      .select('id, total, vat_amount, subtotal, quote_id, settings, created_at')
      .gte('created_at', from.toISOString()),
  ]);

  const quotes = quotesRes.data || [];
  const invoices = invoicesRes.data || [];

  const avgQuote =
    quotes.length > 0
      ? Math.round(quotes.reduce((s, q) => s + (Number(q.total) || 0), 0) / quotes.length)
      : 0;
  const avgInvoice =
    invoices.length > 0
      ? Math.round(invoices.reduce((s, i) => s + (Number(i.total) || 0), 0) / invoices.length)
      : 0;

  // VAT recovery
  const totalVatCharged = invoices.reduce((s, i) => s + (Number(i.vat_amount) || 0), 0);

  // Monthly breakdown
  const monthlyQuotes: Record<string, { count: number; total: number }> = {};
  const monthlyInvoices: Record<string, { count: number; total: number }> = {};

  for (const q of quotes) {
    const month = (q.created_at as string).substring(0, 7);
    if (!monthlyQuotes[month]) monthlyQuotes[month] = { count: 0, total: 0 };
    monthlyQuotes[month].count++;
    monthlyQuotes[month].total += Number(q.total) || 0;
  }

  for (const i of invoices) {
    const month = (i.created_at as string).substring(0, 7);
    if (!monthlyInvoices[month]) monthlyInvoices[month] = { count: 0, total: 0 };
    monthlyInvoices[month].count++;
    monthlyInvoices[month].total += Number(i.total) || 0;
  }

  return {
    average_quote_value: avgQuote,
    average_invoice_value: avgInvoice,
    total_vat_charged: Math.round(totalVatCharged * 100) / 100,
    quote_count: quotes.length,
    invoice_count: invoices.length,
    monthly_quotes: Object.entries(monthlyQuotes)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month,
        count: data.count,
        average: data.count > 0 ? Math.round(data.total / data.count) : 0,
      })),
    monthly_invoices: Object.entries(monthlyInvoices)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month,
        count: data.count,
        average: data.count > 0 ? Math.round(data.total / data.count) : 0,
      })),
    currency: 'GBP',
  };
}

export async function getRevenueForecast(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();
  const twelveMonthsAgo = new Date(now);
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);

  const [paidRes, pipelineRes] = await Promise.all([
    supabase
      .from('invoices')
      .select('total, paid_at')
      .eq('status', 'paid')
      .gte('paid_at', twelveMonthsAgo.toISOString()),
    supabase
      .from('quotes')
      .select('total, status, expiry_date')
      .eq('status', 'sent')
      .gte('expiry_date', now.toISOString()),
  ]);

  const paid = paidRes.data || [];
  const pipeline = pipelineRes.data || [];

  // Monthly revenue trend
  const monthlyRevenue: Record<string, number> = {};
  for (const inv of paid) {
    const month = (inv.paid_at as string).substring(0, 7);
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (Number(inv.total) || 0);
  }

  const months = Object.entries(monthlyRevenue)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, revenue]) => ({ month, revenue: Math.round(revenue * 100) / 100 }));

  // 3-month trend for prediction
  const recentMonths = months.slice(-3);
  let predictedNextMonth = 0;
  if (recentMonths.length >= 2) {
    const avg = recentMonths.reduce((s, m) => s + m.revenue, 0) / recentMonths.length;
    const trend =
      recentMonths.length >= 2
        ? (recentMonths[recentMonths.length - 1].revenue - recentMonths[0].revenue) /
          (recentMonths.length - 1)
        : 0;
    predictedNextMonth = Math.round(Math.max(0, avg + trend) * 100) / 100;
  }

  // Pipeline forecast (sent quotes weighted by historical conversion rate)
  // Use a rough 50% conversion if we can't compute it
  const pipelineValue = pipeline.reduce((s, q) => s + (Number(q.total) || 0), 0);

  // Historical conversion rate from last 6 months
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const { data: recentQuotes } = await supabase
    .from('quotes')
    .select('status, invoice_raised')
    .gte('created_at', sixMonthsAgo.toISOString())
    .neq('status', 'draft');

  const recentSent = (recentQuotes || []).length;
  const recentConverted = (recentQuotes || []).filter(
    (q) => q.status === 'approved' || q.invoice_raised === true
  ).length;
  const conversionRate = recentSent > 0 ? recentConverted / recentSent : 0.5;
  const pipelineForecast = Math.round(pipelineValue * conversionRate * 100) / 100;

  // Cash expected (sent invoices by due date)
  const { data: sentInvoices } = await supabase
    .from('invoices')
    .select('total, due_date')
    .eq('status', 'sent');

  const cashExpected30 = (sentInvoices || [])
    .filter((i) => {
      const due = new Date(i.due_date as string);
      const days = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return days >= 0 && days <= 30;
    })
    .reduce((s, i) => s + (Number(i.total) || 0), 0);

  // Same month last year
  const thisMonth = now.toISOString().substring(5, 7);
  const lastYearMonth = `${now.getFullYear() - 1}-${thisMonth}`;
  const sameMonthLastYear = monthlyRevenue[lastYearMonth] || null;

  return {
    monthly_trend: months,
    predicted_next_month: predictedNextMonth,
    pipeline_value: Math.round(pipelineValue * 100) / 100,
    pipeline_conversion_rate: Math.round(conversionRate * 100),
    pipeline_forecast: pipelineForecast,
    cash_expected_30_days: Math.round(cashExpected30 * 100) / 100,
    same_month_last_year: sameMonthLastYear ? Math.round(sameMonthLastYear * 100) / 100 : null,
    currency: 'GBP',
  };
}

export async function getSeasonalTrends(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  // Get all invoices to build monthly data
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('total, invoice_date, paid_at, created_at')
    .not('total', 'is', null);

  if (error) throw new Error(`Failed to get seasonal trends: ${error.message}`);

  const all = invoices || [];

  // Group by YYYY-MM
  const monthlyData: Record<string, { revenue: number; count: number }> = {};
  for (const inv of all) {
    const date = (inv.paid_at || inv.invoice_date || inv.created_at) as string;
    const month = date.substring(0, 7);
    if (!monthlyData[month]) monthlyData[month] = { revenue: 0, count: 0 };
    monthlyData[month].revenue += Number(inv.total) || 0;
    monthlyData[month].count++;
  }

  const months = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      revenue: Math.round(data.revenue * 100) / 100,
      invoice_count: data.count,
      avg_job_value: data.count > 0 ? Math.round(data.revenue / data.count) : 0,
    }));

  // Find busiest and quietest
  const sorted = [...months].sort((a, b) => b.revenue - a.revenue);
  const busiest = sorted.slice(0, 3).map((m) => m.month);
  const quietest = sorted.slice(-3).map((m) => m.month);

  // Year-on-year comparison
  const yoyComparison: Array<{
    month: string;
    this_year: number;
    last_year: number;
    change_percent: number | null;
  }> = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const thisMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const lastYear = `${d.getFullYear() - 1}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const thisVal = monthlyData[thisMonth]?.revenue || 0;
    const lastVal = monthlyData[lastYear]?.revenue || 0;
    if (thisVal > 0 || lastVal > 0) {
      yoyComparison.push({
        month: thisMonth,
        this_year: Math.round(thisVal * 100) / 100,
        last_year: Math.round(lastVal * 100) / 100,
        change_percent: lastVal > 0 ? Math.round(((thisVal - lastVal) / lastVal) * 100) : null,
      });
    }
  }

  return {
    monthly_breakdown: months,
    busiest_months: busiest,
    quietest_months: quietest,
    yoy_comparison: yoyComparison.reverse(),
    currency: 'GBP',
  };
}

export async function getClientLifetimeValue(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 20) : 10;

  // Get all paid invoices — client_data JSONB has name/id
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('total, client_data, paid_at, created_at')
    .eq('status', 'paid');

  if (error) throw new Error(`Failed to get client lifetime value: ${error.message}`);

  const all = invoices || [];

  // Aggregate per customer (keyed by client_data.id or client_data.name)
  const clientMap: Record<
    string,
    {
      name: string;
      total_revenue: number;
      invoice_count: number;
      first_invoice: string;
      last_invoice: string;
    }
  > = {};

  for (const inv of all) {
    const clientData = inv.client_data as Record<string, unknown> | null;
    const key = (clientData?.id as string) || (clientData?.name as string) || 'Unknown';
    if (!clientMap[key]) {
      clientMap[key] = {
        name: (clientData?.name as string) || key,
        total_revenue: 0,
        invoice_count: 0,
        first_invoice: (inv.paid_at || inv.created_at) as string,
        last_invoice: (inv.paid_at || inv.created_at) as string,
      };
    }
    clientMap[key].total_revenue += Number(inv.total) || 0;
    clientMap[key].invoice_count++;
    const date = (inv.paid_at || inv.created_at) as string;
    if (date < clientMap[key].first_invoice) clientMap[key].first_invoice = date;
    if (date > clientMap[key].last_invoice) clientMap[key].last_invoice = date;
  }

  const clients = Object.values(clientMap)
    .sort((a, b) => b.total_revenue - a.total_revenue)
    .slice(0, limit)
    .map((c) => ({
      ...c,
      total_revenue: Math.round(c.total_revenue * 100) / 100,
      avg_order_value: c.invoice_count > 0 ? Math.round(c.total_revenue / c.invoice_count) : 0,
      first_invoice: c.first_invoice.split('T')[0],
      last_invoice: c.last_invoice.split('T')[0],
    }));

  // Repeat rate
  const totalClients = Object.keys(clientMap).length;
  const repeatClients = Object.values(clientMap).filter((c) => c.invoice_count >= 2).length;
  const repeatRate = totalClients > 0 ? Math.round((repeatClients / totalClients) * 100) : 0;

  return {
    top_clients: clients,
    total_unique_clients: totalClients,
    repeat_clients: repeatClients,
    repeat_rate_percent: repeatRate,
    currency: 'GBP',
  };
}

export async function getProfitabilityAnalysis(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const { from, to } = parsePeriod(typeof args.period === 'string' ? args.period : 'month');

  const [revenueRes, expenseRes] = await Promise.all([
    supabase
      .from('invoices')
      .select('total, paid_at')
      .eq('status', 'paid')
      .gte('paid_at', from.toISOString())
      .lte('paid_at', to.toISOString()),
    supabase
      .from('sole_trader_expenses')
      .select('amount, category, date')
      .gte('date', from.toISOString().split('T')[0])
      .lte('date', to.toISOString().split('T')[0]),
  ]);

  const revenue = (revenueRes.data || []).reduce((s, i) => s + (Number(i.total) || 0), 0);
  const expenses = expenseRes.data || [];
  const totalExpenses = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const netProfit = revenue - totalExpenses;
  const profitMargin = revenue > 0 ? Math.round((netProfit / revenue) * 100) : 0;
  const expenseToRevenueRatio = revenue > 0 ? Math.round((totalExpenses / revenue) * 100) : 0;

  // Expense breakdown by category
  const categoryBreakdown: Record<string, number> = {};
  for (const e of expenses) {
    const cat = (e.category as string) || 'other';
    categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + (Number(e.amount) || 0);
  }

  // Month-on-month profit trend (last 6 months)
  const monthlyProfit: Record<string, { revenue: number; expenses: number }> = {};
  for (const inv of revenueRes.data || []) {
    const month = (inv.paid_at as string).substring(0, 7);
    if (!monthlyProfit[month]) monthlyProfit[month] = { revenue: 0, expenses: 0 };
    monthlyProfit[month].revenue += Number(inv.total) || 0;
  }
  for (const exp of expenses) {
    const month = (exp.date as string).substring(0, 7);
    if (!monthlyProfit[month]) monthlyProfit[month] = { revenue: 0, expenses: 0 };
    monthlyProfit[month].expenses += Number(exp.amount) || 0;
  }

  const profitTrend = Object.entries(monthlyProfit)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      revenue: Math.round(data.revenue * 100) / 100,
      expenses: Math.round(data.expenses * 100) / 100,
      profit: Math.round((data.revenue - data.expenses) * 100) / 100,
    }));

  return {
    gross_revenue: Math.round(revenue * 100) / 100,
    total_expenses: Math.round(totalExpenses * 100) / 100,
    net_profit: Math.round(netProfit * 100) / 100,
    profit_margin_percent: profitMargin,
    expense_to_revenue_ratio_percent: expenseToRevenueRatio,
    expense_breakdown: Object.entries(categoryBreakdown)
      .sort(([, a], [, b]) => b - a)
      .map(([category, amount]) => ({ category, amount: Math.round(amount * 100) / 100 })),
    monthly_profit_trend: profitTrend,
    currency: 'GBP',
  };
}

export async function getCashFlowForecast(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();

  // DSO: average days from invoice sent to paid
  const { data: paidInvoices } = await supabase
    .from('invoices')
    .select('sent_at, paid_at')
    .eq('status', 'paid')
    .not('sent_at', 'is', null)
    .not('paid_at', 'is', null);

  let dso = 0;
  if (paidInvoices && paidInvoices.length > 0) {
    const totalDays = paidInvoices.reduce((sum, inv) => {
      const sent = new Date(inv.sent_at as string);
      const paid = new Date(inv.paid_at as string);
      return sum + Math.max(0, (paid.getTime() - sent.getTime()) / (1000 * 60 * 60 * 24));
    }, 0);
    dso = Math.round(totalDays / paidInvoices.length);
  }

  // Expected inflows: sent invoices grouped by due_date buckets
  const { data: sentInvoices } = await supabase
    .from('invoices')
    .select('id, total, due_date, client_data, invoice_number')
    .eq('status', 'sent');

  const inflows = { next_30: 0, next_60: 0, next_90: 0 };
  const atRiskInvoices: Array<Record<string, unknown>> = [];

  for (const inv of sentInvoices || []) {
    const dueDate = new Date(inv.due_date as string);
    const daysUntilDue = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    const amount = Number(inv.total) || 0;

    if (daysUntilDue < -30) {
      atRiskInvoices.push({
        invoice_number: inv.invoice_number,
        client: inv.client_data,
        amount,
        days_overdue: Math.abs(Math.round(daysUntilDue)),
      });
    }

    if (daysUntilDue <= 30) inflows.next_30 += amount;
    if (daysUntilDue <= 60) inflows.next_60 += amount;
    if (daysUntilDue <= 90) inflows.next_90 += amount;
  }

  // Recurring expense patterns (last 3 months average weekly outflow)
  const threeMonthsAgo = new Date(now);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const { data: recentExpenses } = await supabase
    .from('sole_trader_expenses')
    .select('amount, date')
    .gte('date', threeMonthsAgo.toISOString().split('T')[0]);

  const totalExpenses = (recentExpenses || []).reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const weeksInPeriod = 13; // ~3 months
  const avgWeeklyOutflow = Math.round((totalExpenses / weeksInPeriod) * 100) / 100;

  return {
    days_sales_outstanding: dso,
    expected_inflows: {
      next_30_days: Math.round(inflows.next_30 * 100) / 100,
      next_60_days: Math.round(inflows.next_60 * 100) / 100,
      next_90_days: Math.round(inflows.next_90 * 100) / 100,
    },
    avg_weekly_outflow: avgWeeklyOutflow,
    at_risk_invoices: atRiskInvoices.sort(
      (a, b) => (b.days_overdue as number) - (a.days_overdue as number)
    ),
    at_risk_count: atRiskInvoices.length,
    currency: 'GBP',
  };
}

export async function getAtRiskAlerts(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();

  // Run all alert queries in parallel
  const [overdueRes, expiringQuotesRes, topClientsRes, expiringCertsRes, expensesRes, revenueRes] =
    await Promise.all([
      // 1. Overdue invoices > 14 days
      supabase
        .from('invoices')
        .select('id, total, due_date, client_data, invoice_number')
        .eq('status', 'sent')
        .lt('due_date', new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString()),

      // 2. High-value quotes expiring within 3 days
      supabase
        .from('quotes')
        .select('id, total, expiry_date, client_data, quote_number')
        .eq('status', 'sent')
        .gte('expiry_date', now.toISOString())
        .lte('expiry_date', new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString()),

      // 3. All paid invoices for VIP detection (top 20% by LTV)
      supabase.from('invoices').select('total, client_data, paid_at').eq('status', 'paid'),

      // 4. Certificates expiring this week
      supabase
        .from('reports')
        .select('id, report_type, installation_address, expiry_date, client_data')
        .not('expiry_date', 'is', null)
        .gte('expiry_date', now.toISOString())
        .lte('expiry_date', new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()),

      // 5. This month's expenses
      supabase
        .from('sole_trader_expenses')
        .select('amount')
        .gte('date', `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`),

      // 6. This month's revenue
      supabase
        .from('invoices')
        .select('total')
        .eq('status', 'paid')
        .gte(
          'paid_at',
          `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01T00:00:00Z`
        ),
    ]);

  const alerts: Array<{
    type: string;
    severity: 'high' | 'medium' | 'low';
    message: string;
    data?: unknown;
  }> = [];

  // 1. Overdue invoices
  const overdueInvoices = (overdueRes.data || []).map((inv) => ({
    invoice_number: inv.invoice_number,
    client: inv.client_data,
    amount: inv.total,
    days_overdue: Math.ceil(
      (now.getTime() - new Date(inv.due_date as string).getTime()) / (1000 * 60 * 60 * 24)
    ),
  }));

  for (const inv of overdueInvoices) {
    alerts.push({
      type: 'overdue_invoice',
      severity: inv.days_overdue > 30 ? 'high' : 'medium',
      message: `Invoice ${inv.invoice_number} (£${inv.amount}) is ${inv.days_overdue} days overdue`,
      data: inv,
    });
  }

  // 2. Expiring quotes
  for (const q of expiringQuotesRes.data || []) {
    const daysLeft = Math.ceil(
      (new Date(q.expiry_date as string).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    alerts.push({
      type: 'expiring_quote',
      severity: Number(q.total) > 1000 ? 'high' : 'medium',
      message: `Quote ${q.quote_number} (£${q.total}) expires in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
      data: {
        quote_number: q.quote_number,
        total: q.total,
        days_left: daysLeft,
        client: q.client_data,
      },
    });
  }

  // 3. VIP clients gone quiet
  const paidInvoices = topClientsRes.data || [];
  const clientRevenue: Record<string, { total: number; name: string; last_paid: string }> = {};
  for (const inv of paidInvoices) {
    const key =
      ((inv.client_data as Record<string, unknown>)?.id as string) ||
      ((inv.client_data as Record<string, unknown>)?.name as string) ||
      'Unknown';
    if (!clientRevenue[key]) {
      clientRevenue[key] = {
        total: 0,
        name: ((inv.client_data as Record<string, unknown>)?.name as string) || key,
        last_paid: '',
      };
    }
    clientRevenue[key].total += Number(inv.total) || 0;
    const paid = inv.paid_at as string;
    if (paid > clientRevenue[key].last_paid) clientRevenue[key].last_paid = paid;
  }

  const sortedClients = Object.values(clientRevenue).sort((a, b) => b.total - a.total);
  const top20Percent = Math.max(1, Math.ceil(sortedClients.length * 0.2));
  const vipClients = sortedClients.slice(0, top20Percent);
  const twoMonthsAgo = new Date(now);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  for (const vip of vipClients) {
    if (vip.last_paid && new Date(vip.last_paid) < twoMonthsAgo) {
      const monthsQuiet = Math.floor(
        (now.getTime() - new Date(vip.last_paid).getTime()) / (1000 * 60 * 60 * 24 * 30)
      );
      alerts.push({
        type: 'vip_client_quiet',
        severity: 'medium',
        message: `VIP client ${vip.name} (£${Math.round(vip.total)} lifetime) hasn't had work in ${monthsQuiet} months`,
        data: { name: vip.name, lifetime_value: Math.round(vip.total), months_quiet: monthsQuiet },
      });
    }
  }

  // 4. Expiring certificates
  for (const cert of expiringCertsRes.data || []) {
    const daysLeft = Math.ceil(
      (new Date(cert.expiry_date as string).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    alerts.push({
      type: 'expiring_certificate',
      severity: daysLeft <= 2 ? 'high' : 'low',
      message: `${cert.report_type} at ${cert.installation_address || 'unknown address'} expires in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
      data: cert,
    });
  }

  // 5. Negative cash flow warning
  const monthRevenue = (revenueRes.data || []).reduce((s, i) => s + (Number(i.total) || 0), 0);
  const monthExpenses = (expensesRes.data || []).reduce((s, e) => s + (Number(e.amount) || 0), 0);
  if (monthExpenses > monthRevenue && monthExpenses > 0) {
    alerts.push({
      type: 'negative_cash_flow',
      severity: 'high',
      message: `Expenses (£${Math.round(monthExpenses)}) exceed revenue (£${Math.round(monthRevenue)}) this month`,
      data: { revenue: Math.round(monthRevenue), expenses: Math.round(monthExpenses) },
    });
  }

  // Sort by severity
  const severityOrder = { high: 0, medium: 1, low: 2 };
  alerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return {
    alerts,
    alert_count: alerts.length,
    high_count: alerts.filter((a) => a.severity === 'high').length,
    medium_count: alerts.filter((a) => a.severity === 'medium').length,
    low_count: alerts.filter((a) => a.severity === 'low').length,
  };
}
