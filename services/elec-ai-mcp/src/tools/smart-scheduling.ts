/**
 * Smart Scheduling — job scheduling, end-of-day summary, competitor pricing
 */

import type { UserContext } from '../auth.js';

// ─── Schedule Jobs ────────────────────────────────────────────────────────

export async function scheduleJobs(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const startDate = (args.start_date as string) || new Date().toISOString().slice(0, 10);
  const daysAhead = typeof args.days_ahead === 'number' ? args.days_ahead : 5;

  // Get accepted quotes not yet scheduled
  const { data: acceptedQuotes } = await supabase
    .from('quotes')
    .select('id, total, client_data, items, notes, quote_number')
    .in('status', ['accepted', 'approved'])
    .eq('invoice_raised', false)
    .order('created_at', { ascending: true })
    .limit(20);

  // Get existing calendar events for the scheduling window
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + daysAhead);

  const { data: existingEvents } = await supabase
    .from('calendar_events')
    .select('title, start_at, end_at, event_type')
    .gte('start_at', startDate)
    .lte('start_at', endDate.toISOString())
    .order('start_at', { ascending: true });

  const quotes = acceptedQuotes || [];
  const events = existingEvents || [];

  if (quotes.length === 0) {
    return { success: true, message: 'No accepted quotes waiting to be scheduled.', scheduled: [] };
  }

  // Find free slots (simple: 8am-5pm, skip days with 2+ events already)
  const daySlots: Array<{ date: string; free: boolean; events: number }> = [];
  for (let d = 0; d < daysAhead; d++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + d);
    if (date.getDay() === 0 || date.getDay() === 6) continue; // Skip weekends
    const dateStr = date.toISOString().slice(0, 10);
    const dayEvents = events.filter((e) => (e.start_at as string).startsWith(dateStr));
    daySlots.push({ date: dateStr, free: dayEvents.length < 2, events: dayEvents.length });
  }

  const freeSlots = daySlots.filter((s) => s.free);

  // Assign quotes to free days
  const scheduled: Array<{
    quote_number: string;
    client: string;
    value: number;
    suggested_date: string;
    time: string;
  }> = [];
  for (let i = 0; i < Math.min(quotes.length, freeSlots.length); i++) {
    const q = quotes[i];
    const cd = q.client_data as Record<string, unknown>;
    scheduled.push({
      quote_number: q.quote_number as string,
      client: (cd?.name as string) || 'Unknown',
      value: Number(q.total || 0),
      suggested_date: freeSlots[i].date,
      time: freeSlots[i].events === 0 ? '09:00' : '13:00', // Morning if free, afternoon if one event already
    });
  }

  return {
    success: true,
    unscheduled_quotes: quotes.length,
    available_days: freeSlots.length,
    scheduled,
    unscheduled_remaining: Math.max(0, quotes.length - freeSlots.length),
    note: 'Use create_calendar_event to confirm each booking. These are suggestions based on your availability.',
    currency: 'GBP',
  };
}

// ─── End of Day Summary ───────────────────────────────────────────────────

export async function getEndOfDaySummary(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  const ts = todayStart.toISOString();
  const te = todayEnd.toISOString();

  const [eventsRes, invoicesPaidRes, invoicesSentRes, quotesRes, tasksRes, completedJobsRes] =
    await Promise.all([
      supabase
        .from('calendar_events')
        .select('title, start_at, event_type, client_id, job_id')
        .gte('start_at', ts)
        .lte('start_at', te),
      supabase
        .from('invoices')
        .select('total, client_data, invoice_number')
        .eq('status', 'paid')
        .gte('paid_at', ts)
        .lte('paid_at', te),
      supabase
        .from('invoices')
        .select('total, client_data, invoice_number')
        .gte('created_at', ts)
        .lte('created_at', te)
        .neq('status', 'draft'),
      supabase
        .from('quotes')
        .select('total, client_data, quote_number, status')
        .gte('created_at', ts)
        .lte('created_at', te),
      supabase
        .from('spark_tasks')
        .select('title, status, project_id')
        .eq('status', 'done')
        .gte('updated_at', ts)
        .lte('updated_at', te),
      // Jobs completed today
      supabase
        .from('employer_jobs')
        .select('title, client, location, value, status')
        .eq('status', 'Completed')
        .gte('end_date', ts)
        .lte('end_date', te),
    ]);

  const events = eventsRes.data || [];
  const paidToday = invoicesPaidRes.data || [];
  const sentToday = invoicesSentRes.data || [];
  const quotesToday = quotesRes.data || [];
  const tasksCompleted = tasksRes.data || [];
  const jobsCompleted = completedJobsRes.data || [];

  const revenueToday = paidToday.reduce((s, i) => s + Number(i.total || 0), 0);

  // Jobs done but not invoiced
  const uninvoiced: Array<{
    title: string;
    client: string;
    location: string;
    estimated_value: number;
  }> = [];
  for (const job of jobsCompleted) {
    const clientName = (job.client as string) || '';
    // Check if there's an invoice for this client today
    const hasInvoice = sentToday.some(
      (i) =>
        (((i.client_data as Record<string, unknown>)?.name as string) || '').toLowerCase() ===
        clientName.toLowerCase()
    );
    if (!hasInvoice && clientName) {
      uninvoiced.push({
        title: job.title as string,
        client: clientName,
        location: job.location as string,
        estimated_value: Number(job.value || 0),
      });
    }
  }

  // Tomorrow preview
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStart = new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate(),
    0,
    0,
    0
  );
  const tomorrowEnd = new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate(),
    23,
    59,
    59
  );
  const { data: tomorrowEvents } = await supabase
    .from('calendar_events')
    .select('title, start_at, location')
    .gte('start_at', tomorrowStart.toISOString())
    .lte('start_at', tomorrowEnd.toISOString())
    .order('start_at', { ascending: true });

  return {
    success: true,
    date: now.toISOString().slice(0, 10),
    today: {
      jobs_on_calendar: events.length,
      revenue_received: revenueToday,
      invoices_sent: sentToday.length,
      quotes_sent: quotesToday.length,
      tasks_completed: tasksCompleted.length,
      jobs_completed: jobsCompleted.length,
    },
    uninvoiced_jobs: uninvoiced,
    uninvoiced_value: uninvoiced.reduce((s, j) => s + j.estimated_value, 0),
    tomorrow: (tomorrowEvents || []).map((e) => ({
      title: e.title,
      time: (e.start_at as string).slice(11, 16),
      location: e.location,
    })),
    suggested_actions: [
      ...(uninvoiced.length > 0
        ? [
            `Create invoices for ${uninvoiced.length} completed job(s) worth ~£${uninvoiced.reduce((s, j) => s + j.estimated_value, 0)}`,
          ]
        : []),
      ...(paidToday.length > 0 ? [`Great day — £${revenueToday.toFixed(0)} received`] : []),
      ...(quotesToday.filter((q) => q.status === 'sent').length > 0
        ? [
            `Follow up on ${quotesToday.filter((q) => q.status === 'sent').length} quote(s) sent today`,
          ]
        : []),
    ],
    currency: 'GBP',
  };
}

// ─── Competitor Pricing ───────────────────────────────────────────────────

export async function getCompetitorPricing(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const jobType = args.job_type as string;
  const location = (args.location as string) || 'UK';

  if (!jobType)
    return { error: 'job_type is required (e.g. "EICR", "consumer unit change", "full rewire")' };

  // Get user's own pricing
  const { data: ownInvoices } = await supabase
    .from('invoices')
    .select('total, line_items')
    .eq('status', 'paid')
    .order('paid_at', { ascending: false })
    .limit(50);

  const searchTerm = jobType.toLowerCase();
  const ownPrices = (ownInvoices || [])
    .filter((i) =>
      JSON.stringify(i.line_items || '')
        .toLowerCase()
        .includes(searchTerm)
    )
    .map((i) => Number(i.total || 0))
    .filter((v) => v > 0);

  const ownAvg =
    ownPrices.length > 0
      ? Math.round(ownPrices.reduce((s, v) => s + v, 0) / ownPrices.length)
      : null;

  // Search Perplexity for current market rates
  const perplexityKey = process.env.PERPLEXITY_API_KEY;
  let marketData: { answer: string; citations: string[] } | null = null;

  if (perplexityKey) {
    try {
      const res = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${perplexityKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'sonar',
          messages: [
            {
              role: 'system',
              content:
                'You are a UK electrical trade pricing researcher. Give specific current prices in GBP. Be concise.',
            },
            {
              role: 'user',
              content: `What is the current average price for ${jobType} in ${location}? Give specific price ranges in GBP.`,
            },
          ],
          max_tokens: 512,
          return_citations: true,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          choices: Array<{ message: { content: string } }>;
          citations?: string[];
        };
        marketData = {
          answer: data.choices?.[0]?.message?.content || '',
          citations: (data.citations || []).slice(0, 3),
        };
      }
    } catch {
      /* non-critical */
    }
  }

  // Also check RAG pricing data
  const { data: ragData } = await supabase
    .from('pricing_embeddings')
    .select('content')
    .textSearch('content', searchTerm.replace(/\s+/g, ' & '))
    .limit(3);

  let verdict = 'no_data';
  if (ownAvg && marketData?.answer) {
    // Try to extract a price from the market data
    const priceMatch = marketData.answer.match(/£(\d[\d,]*)/);
    if (priceMatch) {
      const marketPrice = parseInt(priceMatch[1].replace(/,/g, ''));
      if (ownAvg < marketPrice * 0.8) verdict = 'below_market';
      else if (ownAvg > marketPrice * 1.2) verdict = 'above_market';
      else verdict = 'competitive';
    }
  }

  return {
    success: true,
    job_type: jobType,
    location,
    your_pricing: ownAvg
      ? {
          average: ownAvg,
          sample_size: ownPrices.length,
          min: Math.min(...ownPrices),
          max: Math.max(...ownPrices),
        }
      : null,
    market_research: marketData,
    rag_pricing: (ragData || []).map((r) => ((r.content as string) || '').slice(0, 200)),
    verdict,
    advice:
      verdict === 'below_market'
        ? 'You may be undercharging. Consider raising prices gradually — your experience justifies it.'
        : verdict === 'above_market'
          ? 'You are above market rate. This is fine if your reviews and reputation support it.'
          : verdict === 'competitive'
            ? 'Your pricing is competitive with the market. Good position.'
            : 'Not enough data to compare. Check Checkatrade or MyBuilder for local rates.',
    currency: 'GBP',
  };
}
