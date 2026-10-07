import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   AI quote (ELE-1990) — client side of the employer-ai-quote edge function.

   The function drafts lines from a job: materials from the firm's own price
   book first (its real sell prices), anything else an "AI estimate" to check,
   labour hours informed by the firm's own history for the job type and by
   practical_work_intelligence timings. It writes nothing to `quotes`; the
   hub saves the draft through createQuote (normal numbering) and opens it in
   the quote builder.
   ========================================================================== */

/** Where a line's price came from. Shown on every line so nobody sends a guess. */
export type LineSource = 'price_book' | 'ai_estimate' | 'firm_rate' | 'default_rate' | 'edited';

const LINE_SOURCES: readonly LineSource[] = ['price_book', 'ai_estimate', 'firm_rate', 'default_rate', 'edited'];

export const isLineSource = (v: unknown): v is LineSource =>
  typeof v === 'string' && (LINE_SOURCES as readonly string[]).includes(v);

/** Lines that still need a human to look at the price. */
export const needsCheck = (s: LineSource | undefined | null) =>
  s === 'ai_estimate' || s === 'default_rate';

export interface AIQuoteMaterial {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  source: 'price_book' | 'ai_estimate';
  priceBookItemId: string | null;
  note: string;
}

export interface AIQuoteLabour {
  id: string;
  description: string;
  hours: number;
  rate: number;
  total: number;
  source: 'firm_rate' | 'default_rate';
  basis: string;
}

export interface AIQuoteHistory {
  job_type: string;
  count: number;
  avg_hours: number | null;
  avg_quoted_hours: number | null;
  quoted_count: number;
  jobs: Array<{ title: string; hours: number; quoted_hours: number | null }>;
}

export interface AIQuoteResult {
  success: true;
  cached: boolean;
  runId: string | null;
  createdAt: string;
  model: string;
  draft: {
    jobTitle: string;
    scope: string;
    materials: AIQuoteMaterial[];
    labour: AIQuoteLabour[];
    labourHours: number;
    assumptions: string[];
    siteChecks: string[];
    matchedFromBook: number;
  };
  benchmarks: Array<{ task: string; minutes: number }>;
  context: {
    firm: {
      companyName: string | null;
      vatRegistered: boolean;
      reverseCharge: boolean;
      cisEnabled: boolean;
      validityDays: number;
      depositPercentage: number | null;
    };
    job: {
      id: string;
      title: string | null;
      client: string | null;
      client_email: string | null;
      client_phone: string | null;
      location: string | null;
      description: string | null;
      job_type: string | null;
      quoted_hours: number | null;
    } | null;
    jobType: string | null;
    history: AIQuoteHistory | null;
    labourRate: number;
    labourRateSource: 'firm_rate' | 'default_rate';
    priceBookCount: number;
  };
}

export interface AIQuoteRequest {
  firmId: string;
  jobId?: string | null;
  description: string;
  jobType?: string | null;
  notes?: string | null;
  /** Ignore a cached run with the same inputs and pay for a fresh one. */
  refresh?: boolean;
}

export async function draftAIQuote(req: AIQuoteRequest): Promise<AIQuoteResult> {
  const { data, error } = await supabase.functions.invoke('employer-ai-quote', { body: req });
  if (error) {
    // FunctionsHttpError carries the function's own JSON message in context.
    let message = error.message;
    try {
      const ctx = (error as { context?: Response }).context;
      if (ctx && typeof ctx.json === 'function') {
        const body = (await ctx.json()) as { error?: string };
        if (body?.error) message = body.error;
      }
    } catch {
      /* keep the generic message */
    }
    if (/Failed to send a request|404|not found/i.test(message)) {
      message = 'AI quotes are not switched on yet. Build this quote by hand for now.';
    }
    throw new Error(message);
  }
  const res = data as AIQuoteResult | { success: false; error: string };
  if (!res || !('success' in res) || !res.success) {
    throw new Error((res as { error?: string })?.error || 'The AI draft failed. Try again.');
  }
  return res;
}

/** Firm VAT position → the rate a new quote uses. Not registered = 0%. */
export function firmVatRate(firm: { vatRegistered: boolean }): number {
  return firm.vatRegistered ? 20 : 0;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Lines in the shape both hubs read: the Employer Hub's `type`/`total`, plus
 * the Electrical Hub's `category`/`totalPrice`, plus where the price came from.
 */
export function aiDraftToLineItems(
  labour: AIQuoteLabour[],
  materials: AIQuoteMaterial[]
): Array<Record<string, unknown>> {
  return [
    ...labour.map((l) => ({
      id: l.id,
      description: l.description,
      quantity: l.hours,
      unit: 'hour',
      unitPrice: l.rate,
      total: round2(l.hours * l.rate),
      totalPrice: round2(l.hours * l.rate),
      type: 'labour',
      category: 'labour',
      source: l.source,
      basis: l.basis || undefined,
    })),
    ...materials.map((m) => ({
      id: m.id,
      description: m.description,
      quantity: m.quantity,
      unit: m.unit,
      unitPrice: m.unitPrice,
      total: round2(m.quantity * m.unitPrice),
      totalPrice: round2(m.quantity * m.unitPrice),
      type: 'material',
      category: 'materials',
      source: m.source,
      priceBookItemId: m.priceBookItemId ?? undefined,
      notes: m.note || undefined,
    })),
  ];
}

/** Settings stamp on an AI-drafted quote, read back by the quote builder. */
export interface AIQuoteStamp {
  runId: string | null;
  generatedAt: string;
  model: string;
  jobType: string | null;
  fromPriceBook: number;
  estimated: number;
  labourHours: number;
  historyAvgHours: number | null;
  historyCount: number;
  assumptions: string[];
  siteChecks: string[];
}
