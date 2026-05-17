/**
 * Mate Business Brain — cash awareness + pricing intelligence.
 *
 * Two surfaces:
 *   - getBusinessSnapshot / formatSnapshotForPrompt  → cash brain.
 *     Always-on awareness of outstanding £, overdue £, paid this month,
 *     win rate, draft pipeline. Injected into the system context on every
 *     chat turn so Mate reasons WITH the business state, not blind to it.
 *
 *   - findPastPricing                                 → pricing brain.
 *     Pulls line items from this user's past quotes that match a job
 *     keyword. Returns median + range per line description so Mate can
 *     anchor on the user's real rates rather than inventing prices.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseClient = any;

function safeJson(v: unknown): Record<string, unknown> | null {
  if (!v) return null;
  if (typeof v === 'object') return v as Record<string, unknown>;
  if (typeof v === 'string') {
    try {
      return JSON.parse(v);
    } catch {
      return null;
    }
  }
  return null;
}

function num(v: unknown): number {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
  return isFinite(n) ? n : 0;
}

function fmt(n: number): string {
  return `£${n.toFixed(2)}`;
}

// ─────────────────────────────────────────────────────────────────────────
// CASH BRAIN
// ─────────────────────────────────────────────────────────────────────────

export interface BusinessSnapshot {
  outstandingTotal: number;
  overdueTotal: number;
  overdueCount: number;
  paidThisMonth: number;
  paidThisMonthCount: number;
  draftQuotesCount: number;
  draftQuotesValue: number;
  draftInvoicesCount: number;
  sentQuotesAwaitingResponseCount: number;
  sentQuotesAwaitingResponseValue: number;
  /** Quotes accepted / quotes sent in last 90 days, as a 0-1 ratio. Null if no decisions yet. */
  winRate90d: number | null;
  winRateSampleSize: number;
  topCustomer90d: { name: string; revenue: number } | null;
  /** ISO timestamp at which this snapshot was taken. */
  takenAt: string;
}

export async function getBusinessSnapshot(
  supabase: SupabaseClient,
  userId: string | null
): Promise<BusinessSnapshot | null> {
  if (!userId) return null;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 86400000).toISOString();

  try {
    const [
      unpaidInvoicesRes,
      paidThisMonthRes,
      draftQuotesRes,
      draftInvoicesRes,
      sentQuotesRes,
      quoteDecisionsRes,
      acceptedQuotes90dRes,
    ] = await Promise.all([
      // Unpaid (outstanding + overdue)
      supabase
        .from('invoices')
        .select('total, due_date, status, paid_at')
        .eq('user_id', userId)
        .is('paid_at', null)
        .not('status', 'in', '("paid","Paid","cancelled","Cancelled","draft")'),
      // Paid this month
      supabase
        .from('invoices')
        .select('total, paid_at, client_data')
        .eq('user_id', userId)
        .not('paid_at', 'is', null)
        .gte('paid_at', monthStart),
      // Draft quotes
      supabase
        .from('quotes')
        .select('total')
        .eq('user_id', userId)
        .eq('status', 'draft'),
      // Draft invoices
      supabase
        .from('invoices')
        .select('total')
        .eq('user_id', userId)
        .eq('status', 'draft'),
      // Sent quotes still awaiting decision
      supabase
        .from('quotes')
        .select('total')
        .eq('user_id', userId)
        .in('status', ['sent', 'Sent']),
      // Win rate: decisions made in last 90 days (accepted + declined)
      supabase
        .from('quotes')
        .select('status')
        .eq('user_id', userId)
        .gte('updated_at', ninetyDaysAgo)
        .in('status', ['accepted', 'Accepted', 'declined', 'Declined']),
      // Top customer by accepted-quote value last 90d (proxy for revenue)
      supabase
        .from('quotes')
        .select('total, client_data')
        .eq('user_id', userId)
        .gte('updated_at', ninetyDaysAgo)
        .in('status', ['accepted', 'Accepted']),
    ]);

    // Outstanding + overdue
    let outstandingTotal = 0;
    let overdueTotal = 0;
    let overdueCount = 0;
    for (const r of unpaidInvoicesRes.data || []) {
      const t = num(r.total);
      outstandingTotal += t;
      if (r.due_date && new Date(r.due_date).getTime() < now.getTime()) {
        overdueTotal += t;
        overdueCount += 1;
      }
    }

    // Paid this month
    const paidRows = paidThisMonthRes.data || [];
    const paidThisMonth = paidRows.reduce((s: number, r: any) => s + num(r.total), 0);

    // Drafts
    const draftQuotes = draftQuotesRes.data || [];
    const draftQuotesValue = draftQuotes.reduce((s: number, r: any) => s + num(r.total), 0);
    const draftInvoices = draftInvoicesRes.data || [];

    // Sent quotes awaiting response
    const sentQuotes = sentQuotesRes.data || [];
    const sentQuotesAwaitingResponseValue = sentQuotes.reduce(
      (s: number, r: any) => s + num(r.total),
      0
    );

    // Win rate
    const decisions = quoteDecisionsRes.data || [];
    let winRate90d: number | null = null;
    if (decisions.length > 0) {
      const accepted = decisions.filter((d: any) =>
        ['accepted', 'Accepted'].includes(d.status)
      ).length;
      winRate90d = accepted / decisions.length;
    }

    // Top customer
    const customerRevenue = new Map<string, number>();
    for (const r of acceptedQuotes90dRes.data || []) {
      const client = safeJson(r.client_data);
      const name = (client?.name as string) || '';
      if (!name) continue;
      customerRevenue.set(name, (customerRevenue.get(name) || 0) + num(r.total));
    }
    let topCustomer90d: { name: string; revenue: number } | null = null;
    for (const [name, revenue] of customerRevenue.entries()) {
      if (!topCustomer90d || revenue > topCustomer90d.revenue) {
        topCustomer90d = { name, revenue };
      }
    }

    return {
      outstandingTotal: Math.round(outstandingTotal * 100) / 100,
      overdueTotal: Math.round(overdueTotal * 100) / 100,
      overdueCount,
      paidThisMonth: Math.round(paidThisMonth * 100) / 100,
      paidThisMonthCount: paidRows.length,
      draftQuotesCount: draftQuotes.length,
      draftQuotesValue: Math.round(draftQuotesValue * 100) / 100,
      draftInvoicesCount: draftInvoices.length,
      sentQuotesAwaitingResponseCount: sentQuotes.length,
      sentQuotesAwaitingResponseValue:
        Math.round(sentQuotesAwaitingResponseValue * 100) / 100,
      winRate90d,
      winRateSampleSize: decisions.length,
      topCustomer90d,
      takenAt: now.toISOString(),
    };
  } catch (err) {
    console.error('[mate-business-brain] snapshot failed', err);
    return null;
  }
}

/**
 * Format the snapshot as a compact context block for the system prompt.
 * Mate uses this to volunteer cash-flow context without being asked.
 */
export function formatSnapshotForPrompt(snapshot: BusinessSnapshot | null): string {
  if (!snapshot) return 'BUSINESS STATE: unavailable (no user or query failed).';

  const lines: string[] = ['BUSINESS STATE (live, this turn):'];

  // Headline numbers
  if (snapshot.outstandingTotal > 0) {
    const overduePart =
      snapshot.overdueTotal > 0
        ? ` (of which ${fmt(snapshot.overdueTotal)} is OVERDUE across ${snapshot.overdueCount} invoice${snapshot.overdueCount === 1 ? '' : 's'})`
        : '';
    lines.push(`- Outstanding: ${fmt(snapshot.outstandingTotal)}${overduePart}`);
  } else {
    lines.push(`- Outstanding: nothing — books are clean.`);
  }

  lines.push(
    `- Paid this month: ${fmt(snapshot.paidThisMonth)} across ${snapshot.paidThisMonthCount} invoice${snapshot.paidThisMonthCount === 1 ? '' : 's'}.`
  );

  if (snapshot.sentQuotesAwaitingResponseCount > 0) {
    lines.push(
      `- ${snapshot.sentQuotesAwaitingResponseCount} sent quote${snapshot.sentQuotesAwaitingResponseCount === 1 ? '' : 's'} awaiting a decision (${fmt(snapshot.sentQuotesAwaitingResponseValue)} in pipeline).`
    );
  }
  if (snapshot.draftQuotesCount > 0) {
    lines.push(
      `- ${snapshot.draftQuotesCount} draft quote${snapshot.draftQuotesCount === 1 ? '' : 's'} (${fmt(snapshot.draftQuotesValue)}) not yet sent.`
    );
  }
  if (snapshot.draftInvoicesCount > 0) {
    lines.push(
      `- ${snapshot.draftInvoicesCount} draft invoice${snapshot.draftInvoicesCount === 1 ? '' : 's'} not yet sent.`
    );
  }

  if (snapshot.winRate90d !== null) {
    const pct = Math.round(snapshot.winRate90d * 100);
    lines.push(
      `- Quote win rate (last 90d): ${pct}% (sample size ${snapshot.winRateSampleSize}).`
    );
  }
  if (snapshot.topCustomer90d) {
    lines.push(
      `- Top customer (90d, by accepted quotes): ${snapshot.topCustomer90d.name} — ${fmt(snapshot.topCustomer90d.revenue)}.`
    );
  }

  lines.push(
    '',
    'How to use this state:',
    "- If the user is drafting a new quote/invoice and they're sitting on overdue, volunteer ONE pointed nudge — e.g. \"While we draft this, want me to chase the ${fmt(overdue)} overdue at the same time?\" Don't lecture; one line.",
    "- If the user asks 'how am I doing', synthesise from this snapshot — don't ask them to wait while you fetch.",
    "- If outstanding is high relative to monthly intake, suggest tightening terms on the new doc (e.g. 50% upfront)."
  );

  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────
// PRICING BRAIN
// ─────────────────────────────────────────────────────────────────────────

export interface PastPricingArgs {
  /** Job keyword to match against quote.job_details.title / description. */
  job_type: string;
  /** Max past quotes to scan. Default 12. */
  limit?: number;
}

/**
 * Aggregate line items from past quotes that match a job keyword.
 * For each distinct line description (normalised), returns the median
 * unitPrice, range and frequency — so Mate can anchor on real numbers
 * when drafting new lines.
 */
export async function findPastPricing(
  supabase: SupabaseClient,
  userId: string | null,
  args: PastPricingArgs
): Promise<string> {
  if (!userId) return 'Pricing lookup unavailable — no user.';
  const jobType = (args.job_type || '').trim();
  if (!jobType) return 'Pricing lookup requires a job_type keyword.';
  const limit = args.limit && args.limit > 0 ? Math.min(args.limit, 30) : 12;

  // Pull recent quotes — accepted first, then sent, then any.
  const { data, error } = await supabase
    .from('quotes')
    .select('id, quote_number, status, total, subtotal, job_details, items, created_at')
    .eq('user_id', userId)
    .or(
      `job_details->>title.ilike.%${jobType}%,job_details->>description.ilike.%${jobType}%`
    )
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[mate-business-brain] pricing query error', error);
    return `Pricing lookup failed: ${error.message}`;
  }
  const rows = data || [];
  if (rows.length === 0) {
    return `No past quotes found matching "${jobType}". Drafting line items will need to start fresh — be transparent about that with the user.`;
  }

  // Aggregate
  const totals: number[] = [];
  const byLine: Map<
    string,
    { description: string; quantities: number[]; prices: number[]; quoteIds: Set<string> }
  > = new Map();

  for (const r of rows) {
    const t = num(r.total);
    if (t > 0) totals.push(t);
    const items = Array.isArray(r.items) ? r.items : safeJson(r.items);
    if (!Array.isArray(items)) continue;
    for (const it of items) {
      if (!it || !it.description) continue;
      const key = String(it.description).trim().toLowerCase();
      if (!key) continue;
      const qty = num(it.quantity);
      const price = num(it.unitPrice ?? it.unit_price ?? it.price);
      if (qty <= 0 || price <= 0) continue;
      const entry = byLine.get(key) || {
        description: String(it.description).trim(),
        quantities: [],
        prices: [],
        quoteIds: new Set<string>(),
      };
      entry.quantities.push(qty);
      entry.prices.push(price);
      entry.quoteIds.add(String(r.id));
      byLine.set(key, entry);
    }
  }

  const median = (xs: number[]): number => {
    if (!xs.length) return 0;
    const sorted = [...xs].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  };

  // Sort lines by frequency (most-used first)
  const lineSummaries = Array.from(byLine.values())
    .sort((a, b) => b.quoteIds.size - a.quoteIds.size)
    .slice(0, 15)
    .map((l) => {
      const medianPrice = median(l.prices);
      const medianQty = median(l.quantities);
      const min = Math.min(...l.prices);
      const max = Math.max(...l.prices);
      const range = min === max ? fmt(min) : `${fmt(min)}–${fmt(max)}`;
      return `  - "${l.description}" · used in ${l.quoteIds.size}/${rows.length} quotes · median qty ${medianQty} · median rate ${fmt(medianPrice)} · range ${range}`;
    });

  const medianTotal = median(totals);
  const minTotal = totals.length ? Math.min(...totals) : 0;
  const maxTotal = totals.length ? Math.max(...totals) : 0;
  const totalRange = minTotal === maxTotal ? fmt(minTotal) : `${fmt(minTotal)}–${fmt(maxTotal)}`;

  return [
    `PAST PRICING — "${jobType}" (${rows.length} past quote${rows.length === 1 ? '' : 's'}):`,
    `  Median quote total: ${fmt(medianTotal)} · range ${totalRange}`,
    ``,
    `Common line items (most-used first):`,
    ...(lineSummaries.length ? lineSummaries : ['  (no recurring line items detected)']),
    ``,
    `Use these as the anchor when drafting new lines. If your proposed unit price diverges from the median by >15%, flag it to the user ("usual rate £X — proposing £Y because …"). Never copy a single past quote blindly — pick the lines that fit THIS job's scope.`,
  ].join('\n');
}
