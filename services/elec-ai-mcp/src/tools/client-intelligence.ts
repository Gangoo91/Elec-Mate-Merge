/**
 * Client Intelligence — deep dive insights + milestone tracking
 */

import type { UserContext } from '../auth.js';

// ─── Client Insights (Deep Dive) ──────────────────────────────────────────

export async function getClientInsights(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const clientId = args.client_id as string;
  if (!clientId) return { error: 'client_id is required' };

  const [clientRes, invoicesRes, quotesRes, certsRes] = await Promise.all([
    supabase
      .from('customers')
      .select('id, name, email, phone, address, type, notes, created_at')
      .eq('id', clientId)
      .single(),
    supabase
      .from('invoices')
      .select(
        'id, total, status, created_at, paid_at, sent_at, line_items, invoice_number, client_data'
      )
      .or(`client_data->>id.eq.${clientId},client_data->>name.ilike.%`),
    supabase
      .from('quotes')
      .select('id, total, status, created_at, items, quote_number, client_data')
      .or(`client_data->>id.eq.${clientId}`),
    supabase
      .from('reports')
      .select('id, report_type, expiry_date, installation_address, created_at, status')
      .eq('customer_id', clientId),
  ]);

  const client = clientRes.data;
  if (!client) return { error: 'Client not found' };

  // Filter invoices/quotes by client name match (fallback since client_data->>id may not always be set)
  const clientName = client.name as string;
  let invoices = invoicesRes.data || [];
  invoices = invoices.filter((i) => {
    const cd = i.client_data as Record<string, unknown> | undefined;
    return (
      cd &&
      ((cd.id as string) === clientId ||
        (cd.name as string)?.toLowerCase() === clientName.toLowerCase())
    );
  });
  let quotes = quotesRes.data || [];
  quotes = quotes.filter((q) => {
    const cd = (q as Record<string, unknown>).client_data as Record<string, unknown> | undefined;
    return (
      cd &&
      ((cd.id as string) === clientId ||
        (cd.name as string)?.toLowerCase() === clientName.toLowerCase())
    );
  });
  const certs = certsRes.data || [];

  // Lifetime value
  const paidInvoices = invoices.filter((i) => i.status === 'paid');
  const ltv = paidInvoices.reduce((s, i) => s + Number(i.total || 0), 0);

  // Payment behaviour
  const paymentDays = paidInvoices
    .filter((i) => i.sent_at && i.paid_at)
    .map(
      (i) =>
        (new Date(i.paid_at as string).getTime() - new Date(i.sent_at as string).getTime()) /
        86400000
    );

  const sortedDays = [...paymentDays].sort((a, b) => a - b);
  const avgDays =
    paymentDays.length > 0 ? paymentDays.reduce((s, v) => s + v, 0) / paymentDays.length : 0;
  const medianDays =
    sortedDays.length > 0
      ? sortedDays.length % 2 === 0
        ? (sortedDays[sortedDays.length / 2 - 1] + sortedDays[sortedDays.length / 2]) / 2
        : sortedDays[Math.floor(sortedDays.length / 2)]
      : 0;
  const latePercent =
    paymentDays.length > 0
      ? (paymentDays.filter((d) => d > 30).length / paymentDays.length) * 100
      : 0;

  let paymentVerdict: string = 'no_data';
  if (paymentDays.length > 0) {
    if (avgDays < 14) paymentVerdict = 'excellent';
    else if (avgDays < 30) paymentVerdict = 'good';
    else if (avgDays < 60) paymentVerdict = 'slow';
    else paymentVerdict = 'problematic';
  }

  // RFM scoring (1-5 each)
  const now = new Date();
  const lastPaidDate =
    paidInvoices.length > 0
      ? new Date(
          paidInvoices.sort(
            (a, b) =>
              new Date(b.paid_at as string).getTime() - new Date(a.paid_at as string).getTime()
          )[0].paid_at as string
        )
      : null;
  const daysSinceLastPaid = lastPaidDate
    ? (now.getTime() - lastPaidDate.getTime()) / 86400000
    : 999;

  const recency =
    daysSinceLastPaid < 30
      ? 5
      : daysSinceLastPaid < 90
        ? 4
        : daysSinceLastPaid < 180
          ? 3
          : daysSinceLastPaid < 365
            ? 2
            : 1;
  const frequency =
    paidInvoices.length >= 10
      ? 5
      : paidInvoices.length >= 5
        ? 4
        : paidInvoices.length >= 3
          ? 3
          : paidInvoices.length >= 1
            ? 2
            : 1;
  const monetary = ltv >= 5000 ? 5 : ltv >= 2000 ? 4 : ltv >= 1000 ? 3 : ltv >= 300 ? 2 : 1;
  const churnRisk = recency <= 2 ? 'high' : recency <= 3 ? 'medium' : 'low';

  // Services used
  const certTypes = [...new Set(certs.map((c) => c.report_type as string))];
  const services = [...certTypes];

  // Recommended actions
  const actions: Array<{ action: string; reason: string; priority: string }> = [];
  const expiringCerts = certs.filter((c) => {
    const exp = c.expiry_date ? new Date(c.expiry_date as string) : null;
    return exp && exp > now && exp < new Date(now.getTime() + 90 * 86400000);
  });
  if (expiringCerts.length > 0)
    actions.push({
      action: `Send renewal reminder for ${(expiringCerts[0] as Record<string, unknown>).report_type} at ${(expiringCerts[0] as Record<string, unknown>).installation_address}`,
      reason: 'Certificate expiring within 90 days',
      priority: 'high',
    });
  if (churnRisk === 'high' && ltv > 500)
    actions.push({
      action: 'Send a win-back message — this is a high-value dormant client',
      reason: `${Math.round(daysSinceLastPaid)} days since last job, £${Math.round(ltv)} lifetime value`,
      priority: 'high',
    });
  if (paidInvoices.length >= 3)
    actions.push({
      action: 'Ask for a Google review',
      reason: `${paidInvoices.length} completed jobs — they know your work`,
      priority: 'medium',
    });
  if (certTypes.includes('eicr') && !certTypes.includes('pat-testing'))
    actions.push({
      action: 'Offer PAT testing — they have an EICR but no PAT',
      reason: 'Cross-sell opportunity worth £150-250',
      priority: 'medium',
    });
  if (paymentVerdict === 'slow' || paymentVerdict === 'problematic')
    actions.push({
      action: 'Consider requesting deposits or upfront payment',
      reason: `Average ${Math.round(avgDays)} days to pay`,
      priority: 'medium',
    });
  if (actions.length === 0)
    actions.push({
      action: 'Maintain the relationship — send a seasonal check-in',
      reason: 'No urgent action needed',
      priority: 'low',
    });

  return {
    success: true,
    client: {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      type: client.type,
      created_at: client.created_at,
    },
    lifetime_value: Math.round(ltv),
    total_invoices: invoices.length,
    total_quotes: quotes.length,
    total_certificates: certs.length,
    payment_behaviour: {
      avg_days_to_pay: Math.round(avgDays),
      median_days_to_pay: Math.round(medianDays),
      late_payment_percent: Math.round(latePercent),
      fastest_days: sortedDays.length > 0 ? Math.round(sortedDays[0]) : null,
      slowest_days: sortedDays.length > 0 ? Math.round(sortedDays[sortedDays.length - 1]) : null,
      verdict: paymentVerdict,
    },
    rfm_score: { recency, frequency, monetary, combined: recency + frequency + monetary },
    churn_risk: churnRisk,
    services_used: services,
    certificates: certs
      .slice(0, 10)
      .map((c) => ({
        type: c.report_type,
        address: c.installation_address,
        expiry: c.expiry_date,
        status: c.status,
      })),
    recommended_actions: actions,
    currency: 'GBP',
  };
}

// ─── Client Milestones ────────────────────────────────────────────────────

export async function getClientMilestones(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();

  // Get all customers
  const { data: customers } = await supabase
    .from('customers')
    .select('id, name, phone, email, created_at');

  const milestones: Array<{
    client_id: string;
    client_name: string;
    type: string;
    message: string;
    date: string;
    draft_message: string;
    priority: string;
  }> = [];

  for (const c of customers || []) {
    const createdAt = new Date(c.created_at as string);
    const daysSinceCreated = (now.getTime() - createdAt.getTime()) / 86400000;

    // 1-year anniversary (within 7 days)
    const anniversaryDay = new Date(createdAt);
    anniversaryDay.setFullYear(now.getFullYear());
    const daysUntilAnniversary = (anniversaryDay.getTime() - now.getTime()) / 86400000;

    if (daysUntilAnniversary >= -3 && daysUntilAnniversary <= 7 && daysSinceCreated > 350) {
      const years = Math.round(daysSinceCreated / 365);
      milestones.push({
        client_id: c.id as string,
        client_name: c.name as string,
        type: 'anniversary',
        message: `${years} year${years > 1 ? 's' : ''} since ${c.name} became a client`,
        date: anniversaryDay.toISOString().slice(0, 10),
        draft_message: `Hi ${c.name}, just wanted to say thanks — it's been ${years} year${years > 1 ? 's' : ''} since we first worked together! If you need anything, you know where I am. Cheers!`,
        priority: 'medium',
      });
    }
  }

  // Also find clients with recent big jobs (milestone: £1k+ single invoice)
  const { data: bigInvoices } = await supabase
    .from('invoices')
    .select('client_data, total, paid_at')
    .eq('status', 'paid')
    .gte('total', 1000)
    .gte('paid_at', new Date(now.getTime() - 14 * 86400000).toISOString())
    .order('paid_at', { ascending: false })
    .limit(5);

  for (const inv of bigInvoices || []) {
    const cd = inv.client_data as Record<string, unknown>;
    const name = (cd?.name as string) || 'Client';
    milestones.push({
      client_id: (cd?.id as string) || '',
      client_name: name,
      type: 'big_job_completed',
      message: `${name} just paid £${Number(inv.total).toFixed(0)} — great time to ask for a review`,
      date: ((inv.paid_at as string) || '').slice(0, 10),
      draft_message: `Hi ${name}, really glad the work's all done and dusted. If you've got 30 seconds, a quick Google review would mean the world — helps other people find us. Thanks a million!`,
      priority: 'high',
    });
  }

  return {
    success: true,
    milestones: milestones.sort((a, b) => (a.priority === 'high' ? -1 : 1)),
    total: milestones.length,
    note: 'Use draft_message or send_approved_message to send these.',
  };
}
