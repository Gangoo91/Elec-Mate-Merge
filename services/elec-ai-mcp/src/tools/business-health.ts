/**
 * Business Health — health score, weekly summary, tax estimate
 */

import type { UserContext } from '../auth.js';

// ─── Business Health Score ─────────────────────────────────────────────────

export async function getBusinessHealthScore(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();
  const threeMonthsAgo = new Date(now);
  threeMonthsAgo.setMonth(now.getMonth() - 3);
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  const twelveMonthsAgo = new Date(now);
  twelveMonthsAgo.setFullYear(now.getFullYear() - 1);

  const [
    recentInvoices,
    olderInvoices,
    allUnpaid,
    allCustomers,
    recentQuotes,
    olderQuotes,
    allCerts,
    recentExpenses,
  ] = await Promise.all([
    supabase
      .from('invoices')
      .select('total, paid_at, sent_at, created_at, status')
      .eq('status', 'paid')
      .gte('paid_at', threeMonthsAgo.toISOString()),
    supabase
      .from('invoices')
      .select('total, paid_at, status')
      .eq('status', 'paid')
      .gte('paid_at', sixMonthsAgo.toISOString())
      .lt('paid_at', threeMonthsAgo.toISOString()),
    supabase
      .from('invoices')
      .select('total, due_date, status, sent_at, paid_at')
      .neq('status', 'paid')
      .neq('status', 'draft'),
    supabase.from('customers').select('id, created_at'),
    supabase
      .from('quotes')
      .select('total, status, created_at')
      .gte('created_at', threeMonthsAgo.toISOString()),
    supabase
      .from('quotes')
      .select('total, status, created_at')
      .gte('created_at', sixMonthsAgo.toISOString())
      .lt('created_at', threeMonthsAgo.toISOString()),
    supabase
      .from('reports')
      .select('expiry_date, report_type, created_at')
      .not('expiry_date', 'is', null),
    supabase
      .from('sole_trader_expenses')
      .select('amount, date')
      .gte('date', threeMonthsAgo.toISOString()),
  ]);

  const recent = recentInvoices.data || [];
  const older = olderInvoices.data || [];
  const unpaid = allUnpaid.data || [];
  const customers = allCustomers.data || [];
  const rQuotes = recentQuotes.data || [];
  const oQuotes = olderQuotes.data || [];
  const certs = allCerts.data || [];

  // Revenue Health (25%)
  const recentRev = recent.reduce((s, i) => s + Number(i.total || 0), 0);
  const olderRev = older.reduce((s, i) => s + Number(i.total || 0), 0);
  const revGrowth =
    olderRev > 0 ? ((recentRev - olderRev) / olderRev) * 100 : recentRev > 0 ? 100 : 0;
  let revenueScore = 50;
  if (revGrowth > 20) revenueScore = 95;
  else if (revGrowth > 10) revenueScore = 85;
  else if (revGrowth > 0) revenueScore = 70;
  else if (revGrowth > -10) revenueScore = 50;
  else revenueScore = 25;

  // Cash Flow (20%)
  const paidInvoices = recent.filter((i) => i.sent_at && i.paid_at);
  const dsoValues = paidInvoices.map(
    (i) =>
      (new Date(i.paid_at as string).getTime() - new Date(i.sent_at as string).getTime()) / 86400000
  );
  const avgDso =
    dsoValues.length > 0 ? dsoValues.reduce((s, v) => s + v, 0) / dsoValues.length : 30;
  const overdueCount = unpaid.filter(
    (i) => i.due_date && new Date(i.due_date as string) < now
  ).length;
  const overduePercent = unpaid.length > 0 ? (overdueCount / unpaid.length) * 100 : 0;
  let cashFlowScore = 50;
  if (avgDso < 14) cashFlowScore = 95;
  else if (avgDso < 30) cashFlowScore = 70;
  else if (avgDso < 60) cashFlowScore = 40;
  else cashFlowScore = 15;
  if (overduePercent > 50) cashFlowScore = Math.max(cashFlowScore - 30, 10);
  else if (overduePercent > 25) cashFlowScore = Math.max(cashFlowScore - 15, 15);

  // Client Base (20%)
  const recentCustomers = customers.filter(
    (c) => new Date(c.created_at as string) > threeMonthsAgo
  ).length;
  const olderCustomers = customers.filter((c) => {
    const d = new Date(c.created_at as string);
    return d > sixMonthsAgo && d <= threeMonthsAgo;
  }).length;
  const clientGrowth =
    olderCustomers > 0
      ? ((recentCustomers - olderCustomers) / olderCustomers) * 100
      : recentCustomers > 0
        ? 50
        : 0;
  let clientScore = 50;
  if (clientGrowth > 20) clientScore = 90;
  else if (clientGrowth > 0) clientScore = 70;
  else if (customers.length > 10) clientScore = 55;
  else clientScore = 35;

  // Pipeline (15%)
  const quotesAccepted = rQuotes.filter(
    (q) => q.status === 'accepted' || q.status === 'approved'
  ).length;
  const quotesSent = rQuotes.filter((q) => q.status !== 'draft').length;
  const conversionRate = quotesSent > 0 ? (quotesAccepted / quotesSent) * 100 : 0;
  let pipelineScore = 50;
  if (conversionRate > 70) pipelineScore = 95;
  else if (conversionRate > 50) pipelineScore = 75;
  else if (conversionRate > 30) pipelineScore = 55;
  else if (quotesSent === 0) pipelineScore = 30;
  else pipelineScore = 35;

  // Compliance (10%)
  const expiringCerts = certs.filter((c) => {
    const exp = new Date(c.expiry_date as string);
    return exp > now && exp < new Date(now.getTime() + 90 * 86400000);
  }).length;
  const expiredCerts = certs.filter((c) => new Date(c.expiry_date as string) < now).length;
  let complianceScore = 90;
  if (expiredCerts > 0) complianceScore -= expiredCerts * 15;
  if (expiringCerts > 3) complianceScore -= 10;
  complianceScore = Math.max(complianceScore, 10);

  // Marketing (10%) — proxy: activity + client growth
  const jobsRecent = recent.length;
  let marketingScore = 40;
  if (jobsRecent > 10 && recentCustomers > 2) marketingScore = 85;
  else if (jobsRecent > 5) marketingScore = 65;
  else if (jobsRecent > 2) marketingScore = 50;

  // Overall (weighted)
  const overall = Math.round(
    revenueScore * 0.25 +
      cashFlowScore * 0.2 +
      clientScore * 0.2 +
      pipelineScore * 0.15 +
      complianceScore * 0.1 +
      marketingScore * 0.1
  );
  const grade =
    overall >= 80 ? 'A' : overall >= 60 ? 'B' : overall >= 40 ? 'C' : overall >= 20 ? 'D' : 'F';

  // Top 3 actions
  const actions: Array<{ dimension: string; action: string; impact: string }> = [];
  const dims = [
    { name: 'cash_flow', score: cashFlowScore },
    { name: 'revenue', score: revenueScore },
    { name: 'pipeline', score: pipelineScore },
    { name: 'client_base', score: clientScore },
    { name: 'compliance', score: complianceScore },
    { name: 'marketing', score: marketingScore },
  ].sort((a, b) => a.score - b.score);

  for (const d of dims.slice(0, 3)) {
    if (d.name === 'cash_flow' && overdueCount > 0)
      actions.push({
        dimension: d.name,
        action: `Chase ${overdueCount} overdue invoices totalling £${unpaid
          .filter((i) => i.due_date && new Date(i.due_date as string) < now)
          .reduce((s, i) => s + Number(i.total || 0), 0)
          .toFixed(0)}`,
        impact: '+' + Math.min(15, overdueCount * 5) + ' points',
      });
    else if (d.name === 'revenue')
      actions.push({
        dimension: d.name,
        action: 'Send more quotes — your pipeline needs volume to grow revenue',
        impact: '+10 points',
      });
    else if (d.name === 'pipeline')
      actions.push({
        dimension: d.name,
        action: `Follow up pending quotes within 48 hours to improve your ${conversionRate.toFixed(0)}% conversion rate`,
        impact: '+12 points',
      });
    else if (d.name === 'client_base')
      actions.push({
        dimension: d.name,
        action: 'Ask recent clients for referrals — each new client improves your score',
        impact: '+8 points',
      });
    else if (d.name === 'compliance' && expiredCerts > 0)
      actions.push({
        dimension: d.name,
        action: `${expiredCerts} expired certificates need renewal immediately`,
        impact: '+' + Math.min(20, expiredCerts * 10) + ' points',
      });
    else if (d.name === 'marketing')
      actions.push({
        dimension: d.name,
        action:
          'Post a before/after of your latest job on social media and ask 3 clients for Google reviews',
        impact: '+10 points',
      });
  }

  return {
    success: true,
    overall_score: overall,
    grade,
    dimensions: {
      revenue_health: {
        score: revenueScore,
        detail: `£${recentRev.toFixed(0)} last 3 months (${revGrowth > 0 ? '+' : ''}${revGrowth.toFixed(0)}% vs prior period)`,
      },
      cash_flow: {
        score: cashFlowScore,
        detail: `Avg ${avgDso.toFixed(0)} days to get paid, ${overdueCount} overdue invoices`,
      },
      client_base: {
        score: clientScore,
        detail: `${customers.length} total clients, ${recentCustomers} new in last 3 months`,
      },
      pipeline: {
        score: pipelineScore,
        detail: `${quotesSent} quotes sent, ${conversionRate.toFixed(0)}% conversion rate`,
      },
      compliance: {
        score: complianceScore,
        detail: `${expiredCerts} expired certs, ${expiringCerts} expiring in 90 days`,
      },
      marketing: {
        score: marketingScore,
        detail: `${jobsRecent} jobs completed recently, ${recentCustomers} new clients acquired`,
      },
    },
    top_3_actions: actions.slice(0, 3),
    currency: 'GBP',
  };
}

// ─── Weekly Summary ────────────────────────────────────────────────────────

export async function getWeeklySummary(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();

  // Calculate week boundaries (Monday-Sunday)
  let weekEnd: Date;
  if (typeof args.week_ending === 'string') {
    weekEnd = new Date(args.week_ending);
  } else {
    weekEnd = new Date(now);
    const dayOfWeek = weekEnd.getDay();
    const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    weekEnd.setDate(weekEnd.getDate() + daysToSunday);
  }
  weekEnd.setHours(23, 59, 59, 999);
  const weekStart = new Date(weekEnd);
  weekStart.setDate(weekStart.getDate() - 6);
  weekStart.setHours(0, 0, 0, 0);

  const nextMonday = new Date(weekEnd);
  nextMonday.setDate(nextMonday.getDate() + 1);
  const nextFriday = new Date(nextMonday);
  nextFriday.setDate(nextFriday.getDate() + 4);

  const ws = weekStart.toISOString();
  const we = weekEnd.toISOString();

  const [
    paidRes,
    sentRes,
    outstandingRes,
    quotesSentRes,
    quotesAcceptedRes,
    certsRes,
    nextWeekRes,
  ] = await Promise.all([
    supabase
      .from('invoices')
      .select('total, client_data, paid_at, sent_at, invoice_number')
      .eq('status', 'paid')
      .gte('paid_at', ws)
      .lte('paid_at', we),
    supabase
      .from('invoices')
      .select('total, invoice_number')
      .gte('created_at', ws)
      .lte('created_at', we)
      .neq('status', 'draft'),
    supabase.from('invoices').select('total, status').neq('status', 'paid').neq('status', 'draft'),
    supabase
      .from('quotes')
      .select('total, status')
      .gte('created_at', ws)
      .lte('created_at', we)
      .neq('status', 'draft'),
    supabase
      .from('quotes')
      .select('total, client_data')
      .in('status', ['accepted', 'approved'])
      .gte('updated_at', ws)
      .lte('updated_at', we),
    supabase.from('reports').select('report_type').gte('created_at', ws).lte('created_at', we),
    supabase
      .from('calendar_events')
      .select('title, start_at')
      .gte('start_at', nextMonday.toISOString())
      .lte('start_at', nextFriday.toISOString())
      .order('start_at', { ascending: true })
      .limit(10),
  ]);

  const paid = paidRes.data || [];
  const sent = sentRes.data || [];
  const outstanding = outstandingRes.data || [];
  const qSent = quotesSentRes.data || [];
  const qAccepted = quotesAcceptedRes.data || [];
  const certsList = certsRes.data || [];
  const nextWeek = nextWeekRes.data || [];

  const earnedThisWeek = paid.reduce((s, i) => s + Number(i.total || 0), 0);
  const totalOutstanding = outstanding.reduce((s, i) => s + Number(i.total || 0), 0);
  const overdueCount = outstanding.filter((i) => i.status === 'overdue').length;

  // Win of the week
  let win = { type: 'activity', message: 'You showed up and did the work — that counts.' };
  if (paid.length > 0) {
    const biggest = paid.sort((a, b) => Number(b.total) - Number(a.total))[0];
    const clientName = (biggest.client_data as Record<string, unknown>)?.name || 'a client';
    win = {
      type: 'biggest_job',
      message: `Biggest earner: £${Number(biggest.total).toFixed(0)} from ${clientName}`,
    };
  }
  if (paid.length > 0) {
    const fastest = paid
      .filter((i) => i.sent_at && i.paid_at)
      .sort((a, b) => {
        const dA =
          new Date(a.paid_at as string).getTime() - new Date(a.sent_at as string).getTime();
        const dB =
          new Date(b.paid_at as string).getTime() - new Date(b.sent_at as string).getTime();
        return dA - dB;
      })[0];
    if (fastest && fastest.sent_at) {
      const hrs = Math.round(
        (new Date(fastest.paid_at as string).getTime() -
          new Date(fastest.sent_at as string).getTime()) /
          3600000
      );
      if (hrs < 48) {
        const cn = (fastest.client_data as Record<string, unknown>)?.name || 'a client';
        win = { type: 'fastest_payer', message: `Speed king: ${cn} paid in ${hrs} hours` };
      }
    }
  }
  if (qSent.length > 0 && qAccepted.length > 0) {
    const rate = (qAccepted.length / qSent.length) * 100;
    if (rate > 75)
      win = {
        type: 'conversion_machine',
        message: `Quote machine: ${qAccepted.length}/${qSent.length} accepted (${rate.toFixed(0)}%)`,
      };
  }

  return {
    success: true,
    week: { start: weekStart.toISOString().slice(0, 10), end: weekEnd.toISOString().slice(0, 10) },
    revenue: {
      earned: earnedThisWeek,
      invoices_paid: paid.length,
      avg_job_value: paid.length > 0 ? Math.round(earnedThisWeek / paid.length) : 0,
    },
    invoices: { sent: sent.length, sent_value: sent.reduce((s, i) => s + Number(i.total || 0), 0) },
    quotes: {
      sent: qSent.length,
      accepted: qAccepted.length,
      conversion_rate: qSent.length > 0 ? Math.round((qAccepted.length / qSent.length) * 100) : 0,
      total_quoted: qSent.reduce((s, q) => s + Number(q.total || 0), 0),
    },
    outstanding: { total_owed: totalOutstanding, overdue_count: overdueCount },
    certificates: {
      issued: certsList.length,
      types: [...new Set(certsList.map((c) => c.report_type))],
    },
    next_week: nextWeek.map((e) => ({ title: e.title, date: (e.start_at as string).slice(0, 10) })),
    win_of_the_week: win,
    currency: 'GBP',
  };
}

// ─── Tax Estimate ──────────────────────────────────────────────────────────

export async function getTaxEstimate(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const taxYear = (args.tax_year as string) || `${new Date().getFullYear()}`;
  const yearStart = new Date(`${taxYear}-04-06`);
  const yearEnd = new Date(`${parseInt(taxYear) + 1}-04-05`);

  const [revenueRes, expensesRes, vatRes] = await Promise.all([
    supabase
      .from('invoices')
      .select('total, vat_amount, paid_at, status')
      .eq('status', 'paid')
      .gte('paid_at', yearStart.toISOString())
      .lte('paid_at', yearEnd.toISOString()),
    supabase
      .from('sole_trader_expenses')
      .select('amount, category, date, vat_amount')
      .gte('date', yearStart.toISOString())
      .lte('date', yearEnd.toISOString()),
    supabase
      .from('invoices')
      .select('vat_amount, paid_at')
      .eq('status', 'paid')
      .gte('paid_at', yearStart.toISOString())
      .lte('paid_at', yearEnd.toISOString()),
  ]);

  const invoices = revenueRes.data || [];
  const expenses = expensesRes.data || [];

  const grossRevenue = invoices.reduce((s, i) => s + Number(i.total || 0), 0);
  const vatCollected = invoices.reduce((s, i) => s + Number(i.vat_amount || 0), 0);
  const netRevenue = grossRevenue - vatCollected;
  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const vatOnExpenses = expenses.reduce((s, e) => s + Number(e.vat_amount || 0), 0);
  const taxableProfit = netRevenue - totalExpenses;

  // UK 2025/26 tax bands (simplified)
  const personalAllowance = 12570;
  const basicRate = 0.2;
  const higherRate = 0.4;
  const basicBand = 50270;

  let incomeTax = 0;
  if (taxableProfit > personalAllowance) {
    const taxable = taxableProfit - personalAllowance;
    if (taxable <= basicBand - personalAllowance) {
      incomeTax = taxable * basicRate;
    } else {
      incomeTax =
        (basicBand - personalAllowance) * basicRate +
        (taxable - (basicBand - personalAllowance)) * higherRate;
    }
  }

  // Class 2 NIC (flat rate £3.45/week if profit > £12,570)
  const class2Nic = taxableProfit > personalAllowance ? 3.45 * 52 : 0;
  // Class 4 NIC (9% on £12,570-£50,270, 2% above)
  let class4Nic = 0;
  if (taxableProfit > personalAllowance) {
    const band1 = Math.min(taxableProfit, basicBand) - personalAllowance;
    class4Nic = band1 * 0.09;
    if (taxableProfit > basicBand) {
      class4Nic += (taxableProfit - basicBand) * 0.02;
    }
  }

  const vatOwed = vatCollected - vatOnExpenses;
  const totalTaxBill = incomeTax + class2Nic + class4Nic;

  // Months elapsed in tax year
  const now = new Date();
  const monthsElapsed = Math.max(
    1,
    Math.min(12, (now.getTime() - yearStart.getTime()) / (30 * 86400000))
  );
  const projectedAnnual = taxableProfit * (12 / monthsElapsed);

  return {
    success: true,
    tax_year: `${taxYear}/${parseInt(taxYear) + 1}`,
    months_elapsed: Math.round(monthsElapsed),
    revenue: {
      gross: Math.round(grossRevenue),
      vat_collected: Math.round(vatCollected),
      net: Math.round(netRevenue),
    },
    expenses: { total: Math.round(totalExpenses), vat_reclaimable: Math.round(vatOnExpenses) },
    profit: { taxable: Math.round(taxableProfit), projected_annual: Math.round(projectedAnnual) },
    tax_estimate: {
      income_tax: Math.round(incomeTax),
      class_2_nic: Math.round(class2Nic),
      class_4_nic: Math.round(class4Nic),
      total_tax: Math.round(totalTaxBill),
      vat_owed: Math.round(vatOwed),
      total_including_vat: Math.round(totalTaxBill + vatOwed),
    },
    monthly_set_aside: Math.round((totalTaxBill + vatOwed) / 12),
    note: 'This is an estimate only — not financial advice. Speak to an accountant for accurate tax returns.',
    currency: 'GBP',
  };
}
