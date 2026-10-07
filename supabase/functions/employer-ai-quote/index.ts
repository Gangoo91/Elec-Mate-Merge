/**
 * employer-ai-quote — ELE-1990: a real AI quote from a job.
 * ────────────────────────────────────────────────────────────────────────
 * The Employer Hub's old "AI Quote" called no AI: it totalled what was typed,
 * fixed VAT at 20% and saved a .txt. This drafts the lines for real:
 *
 *   materials  the firm's OWN price book first (sell prices, chosen by id and
 *              re-priced here from the book so the model can never invent a
 *              book price); anything not in the book is an AI estimate the
 *              office must check, priced from the Cost Engineer's trade-price
 *              table + pricing_embeddings RAG, plus the firm's markup.
 *   labour     hours per task, informed by the firm's own last five finished
 *              jobs of this type (get_ai_quote_context) and by
 *              practical_work_intelligence task timings; priced at the firm's
 *              charge-out rate.
 *
 * It returns a DRAFT; nothing is written to `quotes` here. The client saves it
 * through the normal createQuote path (numbering unchanged, ELE-1947) and opens
 * it in the quote builder.
 *
 * Who: owner, admin and office managers of the firm (get_ai_quote_context
 * enforces it as the caller). Firm data is read AS THE CALLER, so an office
 * manager's run never sees buy prices or markup; the markup is applied here
 * server-side and only sell prices leave this function.
 *
 * Cost: every run is stored in employer_ai_quote_runs keyed by a hash of its
 * inputs, so the same job with the same price book is served from cache, and
 * a firm is capped at DAILY_RUN_CAP fresh runs a day.
 */
import Anthropic from 'npm:@anthropic-ai/sdk@0.131.0';
import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';
import { captureException } from '../_shared/sentry.ts';
import { recordAnthropicUsage } from '../_shared/ai-cost.ts';
import { generateEmbedding } from '../_shared/ai-providers.ts';
import { searchPricingKnowledge } from '../_shared/rag-cost-engineer.ts';
import { createLogger } from '../_shared/logger.ts';
import { formatTradePricingPrompt } from '../_shared/uk-trade-pricing-2025.ts';

const FN = 'employer-ai-quote';
const MODEL = 'claude-sonnet-5';
/** Bump when the prompt or post-processing changes, so old cached drafts are not reused. */
const PROMPT_VERSION = 'v1-2026-10-07';
const CACHE_DAYS = 14;
const DAILY_RUN_CAP = 25;
const DEFAULT_LABOUR_RATE = 45;
/** ELE-1991 decision: the company markup, else 30%. */
const DEFAULT_MARKUP = 30;
const MAX_BOOK_ITEMS_IN_PROMPT = 220;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

// ── Types ────────────────────────────────────────────────────────────────────

interface PriceBookRow {
  item_id: string;
  name: string;
  unit: string;
  category: string | null;
  sell_price: number | null;
  labour_hours: number | null;
}

interface QuoteContext {
  role: string;
  money_visible: boolean;
  firm: {
    company_name?: string | null;
    hourly_rate?: number | null;
    vat_registered?: boolean;
    reverse_charge?: boolean;
    cis_enabled?: boolean;
    validity_days?: number;
    deposit_percentage?: number | null;
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
    access_notes: string | null;
  } | null;
  job_type: string | null;
  history: {
    job_type: string;
    count: number;
    avg_hours: number | null;
    avg_quoted_hours: number | null;
    quoted_count: number;
    jobs: Array<{ title: string; hours: number; quoted_hours: number | null }>;
  } | null;
  job_types: string[];
}

interface ModelDraft {
  job_title: string;
  scope: string;
  materials: Array<{
    description: string;
    quantity: number;
    unit: string;
    price_book_ref: string;
    estimated_trade_price: number;
    note: string;
  }>;
  labour: Array<{ description: string; hours: number; basis: string }>;
  assumptions: string[];
  site_checks: string[];
}

// ── Structured output schema (Anthropic json_schema: additionalProperties false everywhere) ──

const DRAFT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['job_title', 'scope', 'materials', 'labour', 'assumptions', 'site_checks'],
  properties: {
    job_title: { type: 'string', description: 'Short quote title, e.g. "Consumer unit replacement"' },
    scope: {
      type: 'string',
      description: 'Scope of works for the customer, 2 to 4 plain sentences, UK English',
    },
    materials: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['description', 'quantity', 'unit', 'price_book_ref', 'estimated_trade_price', 'note'],
        properties: {
          description: { type: 'string' },
          quantity: { type: 'number' },
          unit: { type: 'string' },
          price_book_ref: {
            type: 'string',
            description: 'The P-number of the matching price book item (e.g. "P12"), or "" when nothing in the book is the same product',
          },
          estimated_trade_price: {
            type: 'number',
            description: 'Trade (buy) price per unit ex VAT in GBP. Only used when price_book_ref is "". Use 0 when a book item is chosen.',
          },
          note: { type: 'string', description: 'Optional short note, "" if none' },
        },
      },
    },
    labour: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['description', 'hours', 'basis'],
        properties: {
          description: { type: 'string' },
          hours: { type: 'number' },
          basis: { type: 'string', description: 'One short line on how the hours were judged' },
        },
      },
    },
    assumptions: { type: 'array', items: { type: 'string' } },
    site_checks: { type: 'array', items: { type: 'string' } },
  },
} as const;

// Stable across runs (no per-request values) so the prompt cache can reuse it.
const SYSTEM_PROMPT = `You draft first-pass quotes for a UK electrical contracting firm. A manager in the office reviews and edits every draft before it is sent, so be accurate and plain rather than impressive.

How to build the draft:
1. Materials. The firm's own price book is listed with references P1, P2 and so on. When an item in the book is the same product the job needs, use its reference in price_book_ref and set estimated_trade_price to 0. Only pick a book item when it really is the same product (rating, size and type); a near miss is not a match. When nothing in the book fits, leave price_book_ref empty and give a realistic UK trade (buy) price per unit, ex VAT, from the trade price guide below or the pricing references supplied. Never invent a P reference.
2. Quantities. Realistic quantities for the job as described, including sensible cable allowances. Use units such as each, m, pack, box, roll, set.
3. Labour. Break the work into a few clear tasks (for example first fix, consumer unit change, testing and certification). Give hours per task for one qualified electrician, rounded to the nearest quarter hour. When the firm's own history for this job type is supplied, treat it as the strongest guide to total hours and say so in basis. Use the practical work timings as a cross-check for individual tasks.
4. Do not add VAT, markup, profit, contingency or rates. The firm's system prices everything; you give quantities, hours and trade prices only.
5. Include certification and testing time where the work needs it (BS 7671). Do not quote regulation numbers.
6. assumptions: what the price assumes (access, existing wiring condition, number of circuits). site_checks: what to confirm on site before the price is final. Keep each to short single sentences, at most five each.
7. UK English. No dashes used as punctuation in sentences; write full sentences.

TRADE PRICE GUIDE (buy prices, use only for items not in the price book):
${formatTradePricingPrompt()}`;

// ── Helpers ──────────────────────────────────────────────────────────────────

const round2 = (n: number) => Math.round(n * 100) / 100;
const quarter = (n: number) => Math.max(0.25, Math.round(n * 4) / 4);

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const STOP = new Set([
  'the', 'and', 'for', 'with', 'from', 'into', 'new', 'old', 'existing', 'replace', 'install',
  'fit', 'supply', 'job', 'work', 'works', 'house', 'property', 'customer', 'client', 'all', 'any',
  'each', 'per', 'test', 'demo',
]);

function tokens(text: string): string[] {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9.\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 2 && !STOP.has(w))
    )
  );
}

/** The book items most likely to be wanted, so a big book still fits the prompt. */
function pickCandidates(book: PriceBookRow[], query: string): PriceBookRow[] {
  const priced = book.filter((i) => i.sell_price != null && Number(i.sell_price) > 0);
  if (priced.length <= MAX_BOOK_ITEMS_IN_PROMPT) return priced;
  const q = tokens(query);
  const scored = priced.map((item) => {
    const hay = `${item.name} ${item.category ?? ''}`.toLowerCase();
    const score = q.reduce((s, t) => s + (hay.includes(t) ? (t.length > 3 ? 2 : 1) : 0), 0);
    return { item, score };
  });
  scored.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
  return scored.slice(0, MAX_BOOK_ITEMS_IN_PROMPT).map((s) => s.item);
}

async function practicalTimings(
  admin: SupabaseClient,
  query: string
): Promise<Array<{ task: string; minutes: number; team: number }>> {
  try {
    const { data } = await admin.rpc('search_practical_work_fast', {
      query_text: query.slice(0, 300),
      match_count: 10,
    });
    const ids = ((data ?? []) as Array<{ id: string }>).map((r) => r.id).filter(Boolean);
    if (!ids.length) return [];
    const { data: rows } = await admin
      .from('practical_work_intelligence')
      .select('id, primary_topic, typical_duration_minutes, team_size')
      .in('id', ids);
    return ((rows ?? []) as Array<{
      primary_topic: string | null;
      typical_duration_minutes: number | null;
      team_size: number | null;
    }>)
      .filter((r) => r.primary_topic && r.typical_duration_minutes)
      .map((r) => ({
        task: String(r.primary_topic).replace(/\s+/g, ' ').slice(0, 160),
        minutes: Number(r.typical_duration_minutes),
        team: Number(r.team_size) || 1,
      }));
  } catch (e) {
    console.warn(`[${FN}] practical work timings unavailable`, e);
    return [];
  }
}

async function pricingReferences(
  admin: SupabaseClient,
  query: string
): Promise<Array<{ item: string; price: number; supplier: string }>> {
  const key = Deno.env.get('OPENAI_API_KEY');
  if (!key) return [];
  try {
    const embedding = await generateEmbedding(query.slice(0, 2000), key);
    const rows = await searchPricingKnowledge(query, embedding, admin, createLogger(FN));
    return (rows as Array<{ item_name?: string; base_cost?: number; wholesaler?: string }>)
      .filter((r) => r.item_name && Number(r.base_cost) > 0)
      .slice(0, 12)
      .map((r) => ({
        item: String(r.item_name).slice(0, 120),
        price: Number(r.base_cost),
        supplier: r.wholesaler ?? '',
      }));
  } catch (e) {
    console.warn(`[${FN}] pricing RAG unavailable`, e);
    return [];
  }
}

// ── Handler ──────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return json({ success: false, error: 'POST only' }, 405);

  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'user') return deny(corsHeaders);

  let body: {
    firmId?: string;
    jobId?: string | null;
    description?: string;
    jobType?: string | null;
    notes?: string | null;
    refresh?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return json({ success: false, error: 'Bad request' }, 400);
  }

  const firmId = String(body.firmId ?? '').trim();
  const jobId = body.jobId ? String(body.jobId) : null;
  const description = String(body.description ?? '').trim().slice(0, 4000);
  const notes = String(body.notes ?? '').trim().slice(0, 1500);
  if (!/^[0-9a-f-]{36}$/i.test(firmId)) return json({ success: false, error: 'Missing firm' }, 400);
  if (jobId && !/^[0-9a-f-]{36}$/i.test(jobId)) return json({ success: false, error: 'Bad job' }, 400);
  if (description.length < 8 && !jobId) {
    return json({ success: false, error: 'Describe the work in a sentence or two.' }, 400);
  }

  const url = Deno.env.get('SUPABASE_URL')!;
  // As the caller: the database decides what this person may see.
  const asCaller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    auth: { persistSession: false },
  });
  // Service role: RAG tables, the run cache and the firm markup only.
  const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false },
  });

  try {
    const { data: ctxData, error: ctxErr } = await asCaller.rpc('get_ai_quote_context', {
      p_firm: firmId,
      p_job: jobId,
      p_job_type: body.jobType ? String(body.jobType).slice(0, 80) : null,
    });
    if (ctxErr) {
      const denied = ctxErr.code === '42501';
      return json(
        { success: false, error: denied ? 'Only the owner and office managers can draft quotes.' : ctxErr.message },
        denied ? 403 : ctxErr.code === 'P0002' ? 404 : 400
      );
    }
    const ctx = ctxData as QuoteContext;

    const { data: bookData, error: bookErr } = await asCaller.rpc('get_firm_price_book', {
      p_firm: firmId,
    });
    if (bookErr) throw new Error(`Price book: ${bookErr.message}`);
    const book = ((bookData ?? []) as PriceBookRow[]).map((r) => ({
      ...r,
      sell_price: r.sell_price == null ? null : Number(r.sell_price),
    }));

    const { data: cp } = await admin
      .from('company_profiles')
      .select('markup')
      .eq('user_id', firmId)
      .maybeSingle();
    const markup = Number((cp as { markup?: number | null } | null)?.markup) > 0
      ? Number((cp as { markup: number }).markup)
      : DEFAULT_MARKUP;

    const labourRate = Number(ctx.firm?.hourly_rate) > 0 ? Number(ctx.firm.hourly_rate) : DEFAULT_LABOUR_RATE;
    const labourRateSource = Number(ctx.firm?.hourly_rate) > 0 ? 'firm_rate' : 'default_rate';

    const workText = [
      ctx.job?.title ?? '',
      description || ctx.job?.description || '',
      ctx.job_type ?? '',
    ]
      .filter(Boolean)
      .join('. ');

    const candidates = pickCandidates(book, `${workText} ${notes}`);
    const bookSig = await sha256(
      candidates.map((c) => `${c.item_id}|${c.name}|${c.sell_price}|${c.unit}`).join('\n')
    );

    const inputs = {
      v: PROMPT_VERSION,
      model: MODEL,
      firmId,
      jobId,
      description: description || ctx.job?.description || '',
      jobType: ctx.job_type,
      notes,
      labourRate,
      markup,
      bookSig,
      history: ctx.history ? [ctx.history.count, ctx.history.avg_hours, ctx.history.avg_quoted_hours] : null,
    };
    const inputHash = await sha256(JSON.stringify(inputs));

    const contextOut = {
      firm: {
        companyName: ctx.firm?.company_name ?? null,
        vatRegistered: !!ctx.firm?.vat_registered,
        reverseCharge: !!ctx.firm?.reverse_charge,
        cisEnabled: !!ctx.firm?.cis_enabled,
        validityDays: Number(ctx.firm?.validity_days) || 30,
        depositPercentage: ctx.firm?.deposit_percentage ?? null,
      },
      job: ctx.job,
      jobType: ctx.job_type,
      history: ctx.history,
      labourRate,
      labourRateSource,
      priceBookCount: book.filter((b) => b.sell_price != null).length,
    };

    // ── Cache: the same inputs are never paid for twice ──
    if (!body.refresh) {
      const since = new Date(Date.now() - CACHE_DAYS * 86_400_000).toISOString();
      const { data: hit } = await admin
        .from('employer_ai_quote_runs')
        .select('id, result, created_at, model')
        .eq('employer_id', firmId)
        .eq('input_hash', inputHash)
        .eq('status', 'complete')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (hit?.result) {
        return json({
          success: true,
          cached: true,
          runId: hit.id,
          createdAt: hit.created_at,
          model: hit.model,
          ...(hit.result as Record<string, unknown>),
          context: contextOut,
        });
      }
    }

    // ── Daily cap per firm (fresh runs only) ──
    const { count: todays } = await admin
      .from('employer_ai_quote_runs')
      .select('id', { count: 'exact', head: true })
      .eq('employer_id', firmId)
      .gte('created_at', new Date(Date.now() - 86_400_000).toISOString());
    if ((todays ?? 0) >= DAILY_RUN_CAP) {
      return json(
        {
          success: false,
          error: `Your firm has drafted ${DAILY_RUN_CAP} AI quotes in the last 24 hours. Build this one by hand, or try again tomorrow.`,
        },
        429
      );
    }

    const [pricing, timings] = await Promise.all([
      pricingReferences(admin, workText),
      practicalTimings(admin, workText),
    ]);

    // P-references keep ids out of the model's hands; mapped back below.
    const refMap = new Map<string, PriceBookRow>();
    const bookLines = candidates.map((c, i) => {
      const ref = `P${i + 1}`;
      refMap.set(ref, c);
      return `${ref} | ${c.name} | per ${c.unit}${c.category ? ` | ${c.category}` : ''}`;
    });

    const h = ctx.history;
    const historyText =
      h && h.count > 0
        ? `The firm's last ${h.count} finished "${h.job_type}" job${h.count === 1 ? '' : 's'} took ${h.avg_hours} hours on average (approved timesheets)` +
          (h.avg_quoted_hours != null ? `, against ${h.avg_quoted_hours} hours quoted.` : '.') +
          `\n` +
          h.jobs.map((j) => `- ${j.title}: ${j.hours} hrs${j.quoted_hours != null ? ` (quoted ${j.quoted_hours})` : ''}`).join('\n')
        : 'No finished jobs of this type in the firm\'s own records yet.';

    const userPrompt = [
      `THE JOB`,
      ctx.job?.title ? `Title: ${ctx.job.title}` : null,
      ctx.job_type ? `Job type: ${ctx.job_type}` : null,
      ctx.job?.location ? `Location: ${ctx.job.location}` : null,
      `Work required: ${description || ctx.job?.description || ctx.job?.title || ''}`,
      ctx.job?.access_notes ? `Access: ${ctx.job.access_notes}` : null,
      notes ? `Extra notes from the office: ${notes}` : null,
      '',
      `THE FIRM'S OWN HOURS FOR THIS KIND OF JOB`,
      historyText,
      '',
      `PRACTICAL WORK TIMINGS (task level, minutes, one person unless stated)`,
      timings.length
        ? timings.map((t) => `- ${t.task}: ${t.minutes} min${t.team > 1 ? ` (${t.team} people)` : ''}`).join('\n')
        : 'None found.',
      '',
      `PRICING REFERENCES (list prices from merchants; trade is about 80% of these)`,
      pricing.length
        ? pricing.map((p) => `- ${p.item}: £${p.price.toFixed(2)}${p.supplier ? ` (${p.supplier})` : ''}`).join('\n')
        : 'None found.',
      '',
      `THE FIRM'S PRICE BOOK (${candidates.length} items; reference | name | unit | category)`,
      bookLines.length ? bookLines.join('\n') : 'The price book is empty.',
    ]
      .filter((l) => l !== null)
      .join('\n');

    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
      timeout: 120_000,
      maxRetries: 1,
    });

    const started = Date.now();
    const response = await anthropic.beta.messages.create({
      model: MODEL,
      max_tokens: 12000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      thinking: { type: 'adaptive' },
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: DRAFT_SCHEMA },
      },
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: userPrompt }],
    });

    const usage = {
      inputTokens: response.usage?.input_tokens ?? 0,
      outputTokens: response.usage?.output_tokens ?? 0,
      cacheReadTokens: response.usage?.cache_read_input_tokens ?? 0,
      cacheWriteTokens: response.usage?.cache_creation_input_tokens ?? 0,
    };
    await recordAnthropicUsage(admin, caller.userId, response.model || MODEL, FN, usage);

    if (response.stop_reason === 'refusal') throw new Error('The AI declined this request.');
    if (response.stop_reason === 'max_tokens') throw new Error('The draft was too long. Describe a smaller piece of work.');
    const text = response.content.find((b) => b.type === 'text')?.text ?? '';
    let draft: ModelDraft;
    try {
      draft = JSON.parse(text) as ModelDraft;
    } catch {
      throw new Error('The AI returned a draft we could not read. Try again.');
    }

    // ── Post-process: the book's own prices, the firm's own rate ──
    let matched = 0;
    const materials = (draft.materials ?? [])
      .filter((m) => m && String(m.description ?? '').trim() && Number(m.quantity) > 0)
      .slice(0, 60)
      .map((m) => {
        const quantity = round2(Number(m.quantity));
        const hit = m.price_book_ref ? refMap.get(String(m.price_book_ref).trim().toUpperCase()) : undefined;
        if (hit && hit.sell_price != null) {
          matched++;
          const unitPrice = round2(Number(hit.sell_price));
          return {
            id: crypto.randomUUID(),
            description: hit.name,
            quantity,
            unit: hit.unit || m.unit || 'each',
            unitPrice,
            total: round2(unitPrice * quantity),
            source: 'price_book' as const,
            priceBookItemId: hit.item_id,
            note: String(m.note ?? '').slice(0, 200),
          };
        }
        const trade = Math.max(0, Number(m.estimated_trade_price) || 0);
        const unitPrice = round2(trade * (1 + markup / 100));
        return {
          id: crypto.randomUUID(),
          description: String(m.description).slice(0, 200),
          quantity,
          unit: String(m.unit || 'each').slice(0, 20),
          unitPrice,
          total: round2(unitPrice * quantity),
          source: 'ai_estimate' as const,
          priceBookItemId: null,
          note: String(m.note ?? '').slice(0, 200),
        };
      });

    const labour = (draft.labour ?? [])
      .filter((l) => l && String(l.description ?? '').trim() && Number(l.hours) > 0)
      .slice(0, 20)
      .map((l) => {
        const hours = quarter(Number(l.hours));
        return {
          id: crypto.randomUUID(),
          description: String(l.description).slice(0, 200),
          hours,
          rate: labourRate,
          total: round2(hours * labourRate),
          source: labourRateSource,
          basis: String(l.basis ?? '').slice(0, 240),
        };
      });

    if (!materials.length && !labour.length) {
      throw new Error('The AI could not draft any lines from that description. Add more detail.');
    }

    const result = {
      draft: {
        jobTitle: String(draft.job_title ?? '').slice(0, 120) || ctx.job?.title || 'Electrical works',
        scope: String(draft.scope ?? '').slice(0, 1500),
        materials,
        labour,
        labourHours: round2(labour.reduce((s, l) => s + l.hours, 0)),
        assumptions: (draft.assumptions ?? []).slice(0, 5).map((s) => String(s).slice(0, 240)),
        siteChecks: (draft.site_checks ?? []).slice(0, 5).map((s) => String(s).slice(0, 240)),
        matchedFromBook: matched,
      },
      benchmarks: timings.slice(0, 6).map((t) => ({ task: t.task, minutes: t.minutes })),
      durationMs: Date.now() - started,
    };

    const { data: run, error: runErr } = await admin
      .from('employer_ai_quote_runs')
      .insert({
        employer_id: firmId,
        created_by: caller.userId,
        employer_job_id: jobId,
        input_hash: inputHash,
        input: { ...inputs, bookItems: candidates.length },
        result,
        model: response.model || MODEL,
        usage,
        status: 'complete',
      })
      .select('id, created_at')
      .single();
    if (runErr) console.error(`[${FN}] run not cached`, runErr.message);

    return json({
      success: true,
      cached: false,
      runId: run?.id ?? null,
      createdAt: run?.created_at ?? new Date().toISOString(),
      model: response.model || MODEL,
      ...result,
      context: contextOut,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[${FN}]`, message);
    await captureException(error, { functionName: FN, requestUrl: req.url, requestMethod: req.method });
    // Failed runs count towards the daily cap too (they cost tokens).
    await admin
      .from('employer_ai_quote_runs')
      .insert({
        employer_id: firmId,
        created_by: caller.userId,
        employer_job_id: jobId,
        input_hash: 'failed',
        status: 'failed',
        error: message.slice(0, 500),
      })
      .then(() => undefined, () => undefined);
    return json({ success: false, error: message || 'The AI draft failed. Try again.' }, 500);
  }
});
