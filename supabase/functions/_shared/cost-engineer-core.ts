/**
 * Cost Engineer core — two-stage pipeline.
 *
 * Stage A (deterministic, ~1.5s):
 *   1. Mini AI: parse brief + attachments into a list of item candidates
 *      with quantities, units and category hints.
 *   2. Parallel marketplace_products lookup → cheapest price per item with
 *      live supplier + scraped_at provenance.
 *   3. Practical work intelligence → labour hour benchmarks per task.
 *   4. Apply user_business_settings labour rate + materials markup.
 *   5. Apply regional_pricing multiplier from user-supplied region or
 *      auto-detected via postcode pattern.
 *   6. Write partials as each section completes so the frontend streams.
 *
 * Stage B (AI annotation, ~5s):
 *   1. Parallel: BS 7671 facets RAG, attachment ingest (PDFs + images),
 *      live marketplace deals + coupons.
 *   2. Slim AI prompt: skeleton + facets + attachments → structured
 *      annotations (compliance flags with regulation_refs, risk
 *      assessment, upsells, payment terms, narrative). AI never sets
 *      prices — pricing is locked from Stage A.
 *
 * Final: assemble + write to cost_engineer_jobs.output_data.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  cheapestForItemsBatch,
  getActiveDeals,
  getActiveCoupons,
  freshnessLabel,
  type MarketplaceMatch,
  type MarketplaceDeal,
  type MarketplaceCoupon,
} from './marketplace-pricing.ts';
import { searchFacets, formatFacetsForPrompt, type BS7671Facet } from './bs7671-facets-rag.ts';
import { searchPracticalWorkIntelligence } from './rag-practical-work.ts';
import { ingestAttachments, type IngestedAttachments, type AttachmentInput } from './attachment-ingest.ts';
import {
  readFloorplans,
  formatReadingForExtraction,
  type FloorplanReading,
} from './vision-floorplan.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const MODEL = 'gpt-5.4-mini-2026-03-17';

/* ─── Types ─────────────────────────────────────────────────────────── */

interface BusinessSettings {
  labourRateElectrician: number;
  labourRateApprentice: number;
  targetMarginPercent: number;
  minMarginPercent: number;
  maxMarginPercent: number;
  materialsMarkupPercent: number;
  perJobOverhead: number;
  vatRegistered: boolean;
}

interface RegionalRow {
  regionKey: string;
  label: string;
  multiplier: number;
}

interface ItemCandidate {
  /** Stable key for the partial-result map. */
  key: string;
  /**
   * Crucial: distinguishes a thing-you-buy (material) from work-you-do
   * (labour). The AI used to put both into one bucket which caused us
   * to price labour tasks as random marketplace products (e.g. "Install
   * 34m of cable" matched to a £251 cable drum × 34 = £8,554).
   */
  kind: 'material' | 'labour';
  /** Full descriptive name shown in the quote. */
  description: string;
  /** Short keywords for marketplace lookup — supplier-style, no filler. */
  searchQuery: string;
  quantity: number;
  unit: string;
  /** Hint for marketplace category filter (e.g. 'cables', 'lighting'). */
  category?: string | null;
  /** Title-cased labour task description (only set when kind='labour'). */
  labourTask?: string;
  /** Estimated hours per unit (only set when kind='labour'). */
  hoursPerUnit?: number;
  /**
   * Which job phase this labour falls into. Real estimators split work
   * across visits — first fix (carcass / cable runs / back boxes),
   * second fix (terminations / accessories / commissioning), then
   * test-and-cert. Defaults to 'second-fix' for ambiguous tasks.
   */
  phase?: 'first-fix' | 'second-fix' | 'test-and-cert';
}

interface PricedMaterial {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  supplier: string;
  /** Provenance so the UI can link out + show staleness. */
  source: {
    table: 'marketplace_products';
    id: string;
    productUrl: string;
    scrapedAt: string;
    freshness: string;
  } | {
    table: 'estimated';
    reason: string;
  };
  category: string | null;
}

interface LabourTask {
  description: string;
  hours: number;
  rate: number;
  total: number;
  workerType: string;
  /** Which visit this labour falls into. Drives the grouped UI. */
  phase: 'first-fix' | 'second-fix' | 'test-and-cert';
}

/* ─── Public API ────────────────────────────────────────────────────── */

/**
 * Top-level worker. Called from the cost-engineer edge function via
 * EdgeRuntime.waitUntil. Owns the full estimate lifecycle: progress
 * updates, partials, error handling, final output.
 */
export async function runEstimate(supabase: any, jobId: string): Promise<void> {
  const startedAt = Date.now();
  console.log(`[cost-engineer] ▶ job ${jobId}`);

  await updateProgress(supabase, jobId, {
    status: 'processing',
    progress: 5,
    current_step: 'Reading briefing',
    started_at: new Date().toISOString(),
  });

  let job: any;
  try {
    const { data, error } = await supabase
      .from('cost_engineer_jobs')
      .select('*')
      .eq('id', jobId)
      .single();
    if (error || !data) throw new Error(error?.message ?? 'Job row not found');
    job = data;
  } catch (err: any) {
    console.error('[cost-engineer] failed to load job:', err);
    await failJob(supabase, jobId, err.message);
    return;
  }

  const isRefinement = !!(job.refine_of && job.refine_mode);

  try {
    if (await isCancelled(supabase, jobId)) return;

    // ── Resolve settings + region + ingest attachments (parallel) ─
    // For refinements, we skip attachment ingest + vision — the parent
    // job's items already encode whatever was extracted from those, and
    // the refinement is a delta-style pass that doesn't need to re-read
    // the source documents. Saves ~3-5s on every refinement.
    const [settings, region, attachments] = await Promise.all([
      loadBusinessSettings(supabase, job.user_id),
      resolveRegion(supabase, job.region, job.project_context?.location),
      isRefinement
        ? Promise.resolve({ textBlocks: [], imageBlocks: [], errors: [] } as IngestedAttachments)
        : ingestAttachments(
            supabase,
            job.project_context?.attachments as AttachmentInput[] | undefined
          ),
    ]);

    if (await isCancelled(supabase, jobId)) return;

    // ── Stage A: skeleton ──────────────────────────────────────────
    let floorplan: FloorplanReading | null = null;
    if (!isRefinement && attachments.imageBlocks.length > 0) {
      await updateProgress(supabase, jobId, {
        progress: 8,
        current_step: 'Reading floor plan',
      });
      floorplan = await readFloorplans(attachments.imageBlocks, job.query ?? '');
      if (floorplan.hasUsableDrawing) {
        console.log(
          `[cost-engineer] floor-plan read: ${floorplan.totals.rooms} rooms · ${floorplan.totals.sockets} sockets · ${floorplan.totals.lights} lights · confidence ${floorplan.confidence}%`
        );
        await writePartial(supabase, jobId, 'floorplan', floorplan);
      }
    }

    if (await isCancelled(supabase, jobId)) return;

    // ── Refinement path ─────────────────────────────────────────────
    let aiCandidates: ItemCandidate[];
    if (isRefinement) {
      await updateProgress(supabase, jobId, {
        progress: 12,
        current_step: `Refining estimate (${job.refine_mode})`,
      });
      aiCandidates = await refineFromParent(supabase, job.refine_of!, job.refine_mode!);
    } else {
      await updateProgress(supabase, jobId, {
        progress: 12,
        current_step: 'Extracting items from briefing',
      });
      aiCandidates = await extractItems(job.query, settings, attachments, floorplan);
    }

    // Skip the completion-items top-up on refinements — the AI delta
    // pass already accounts for what's in the parent. We don't want to
    // re-add EICR / Part P / clips on every refinement cycle.
    const candidates = isRefinement
      ? aiCandidates
      : ensureCompletionItems(aiCandidates, job.query ?? '');

    await writePartial(supabase, jobId, 'extraction', {
      candidates,
      count: candidates.length,
      aiCount: aiCandidates.length,
      autoAdded: candidates.length - aiCandidates.length,
    });

    if (await isCancelled(supabase, jobId)) return;

    await updateProgress(supabase, jobId, { progress: 30, current_step: 'Pricing against UK supplier marketplace' });

    const [pricedMaterials, labourTasks] = await Promise.all([
      priceMaterials(supabase, candidates),
      estimateLabour(supabase, candidates, settings, job.query ?? ''),
    ]);
    await writePartial(supabase, jobId, 'materials', { items: pricedMaterials });
    await writePartial(supabase, jobId, 'labour', { tasks: labourTasks });

    if (await isCancelled(supabase, jobId)) return;

    await updateProgress(supabase, jobId, { progress: 55, current_step: 'Applying overheads and regional rates' });

    const skeleton = applyDeterministicMath({
      materials: pricedMaterials,
      labour: labourTasks,
      settings,
      region,
    });
    await writePartial(supabase, jobId, 'overheads', skeleton.overheadSummary);

    if (await isCancelled(supabase, jobId)) return;

    // ── Stage B: annotation ────────────────────────────────────────
    await updateProgress(supabase, jobId, { progress: 70, current_step: 'Grounding against BS 7671' });

    const [facets, deals, coupons] = await Promise.all([
      searchFacets(supabase, { query: facetQuery(job.query, candidates), matchCount: 5 }),
      getActiveDeals(supabase, { limit: 5 }),
      getActiveCoupons(supabase, { limit: 6 }),
    ]);
    await writePartial(supabase, jobId, 'compliance', {
      facets: facets.map((f) => ({
        regNumber: f.regNumber,
        primaryTopic: f.primaryTopic,
        documentType: f.documentType,
      })),
    });

    await updateProgress(supabase, jobId, { progress: 82, current_step: 'Generating compliance + risk annotations' });

    const annotations = await runAnnotationAI({
      query: job.query,
      projectContext: job.project_context,
      skeleton,
      facets,
      ingested: attachments,
      deals,
      coupons,
      settings,
    });

    // Backstop: any upsell that came back at £0 gets a marketplace
    // lookup. We'd rather show "+£185" than "+£0" next to a real idea.
    annotations.upsells = await backfillUpsellPrices(supabase, annotations.upsells);

    await writePartial(supabase, jobId, 'risk_upsells', annotations);

    if (await isCancelled(supabase, jobId)) return;

    // ── Finalise ───────────────────────────────────────────────────
    await updateProgress(supabase, jobId, { progress: 95, current_step: 'Finalising estimate' });

    const output = assembleOutput({
      query: job.query,
      skeleton,
      annotations,
      facets,
      deals,
      coupons,
      attachmentErrors: attachments.errors,
      floorplan,
    });

    await writePartial(supabase, jobId, 'finalise', { ready: true });

    await supabase
      .from('cost_engineer_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: 'Estimate complete',
        output_data: output,
        // raw_response is the AI narrative only, not the whole structured
        // payload — keeps the row light and matches the column's intent.
        raw_response: { narrative: output.response, generatedAt: new Date().toISOString() },
        completed_at: new Date().toISOString(),
      })
      .eq('id', jobId);

    const totalMs = Date.now() - startedAt;
    console.log(`[cost-engineer] ✅ job ${jobId} complete in ${totalMs}ms`);
  } catch (err: any) {
    console.error('[cost-engineer] ❌ job failed:', err);
    await failJob(supabase, jobId, err.message ?? 'Unknown error');
  }
}

/* ─── Stage A: deterministic skeleton ───────────────────────────────── */

async function loadBusinessSettings(supabase: any, userId: string): Promise<BusinessSettings> {
  const { data } = await supabase
    .from('user_business_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  return {
    labourRateElectrician: Number(data?.labour_rate_electrician ?? 50),
    labourRateApprentice: Number(data?.labour_rate_apprentice ?? 25),
    targetMarginPercent: Number(data?.target_margin_percent ?? 25),
    minMarginPercent: Number(data?.min_margin_percent ?? 10),
    maxMarginPercent: Number(data?.max_margin_percent ?? 40),
    materialsMarkupPercent: Number(data?.materials_markup_percent ?? 15),
    perJobOverhead: Number(data?.per_job_overhead ?? 35),
    vatRegistered: data?.vat_registered ?? true,
  };
}

async function resolveRegion(
  supabase: any,
  regionKey: string | null | undefined,
  location: string | null | undefined
): Promise<RegionalRow> {
  // 'other' is a "no preference" sentinel — fall through to postcode
  // auto-detect rather than locking the user to UK average when their
  // address tells us better.
  const explicit = regionKey && regionKey !== 'other' ? regionKey : null;

  // 1. Explicit region wins.
  if (explicit) {
    const { data } = await supabase
      .from('regional_pricing')
      .select('region_key, label, multiplier')
      .eq('region_key', explicit)
      .maybeSingle();
    if (data) return { regionKey: data.region_key, label: data.label, multiplier: Number(data.multiplier) };
  }

  // 2. Postcode auto-detect from location string.
  if (location) {
    const { data: rows } = await supabase
      .from('regional_pricing')
      .select('region_key, label, multiplier, postcode_pattern')
      .not('postcode_pattern', 'is', null);
    if (rows) {
      const upper = location.toUpperCase();
      for (const row of rows) {
        if (!row.postcode_pattern) continue;
        try {
          const re = new RegExp(row.postcode_pattern);
          if (re.test(upper)) {
            return {
              regionKey: row.region_key,
              label: row.label,
              multiplier: Number(row.multiplier),
            };
          }
        } catch {
          // Bad regex — skip silently.
        }
      }
    }
  }

  // 3. Fallback to UK average.
  return { regionKey: 'other', label: 'UK average', multiplier: 1.0 };
}

/**
 * Stage A AI extraction. Walks the brief like a real estimator and
 * emits one row per orderable material AND one row per distinct labour
 * task. The tricky bit is the `searchQuery` field — the AI tends to
 * write descriptive names like "18-way dual RCD consumer unit with
 * metal enclosure and blanks" which match no supplier catalogue. We
 * ask explicitly for a 3–5 keyword search query that mirrors how
 * Screwfix/Toolstation/CEF would name the product.
 *
 * Attachments are passed through so a user can upload a scope-of-works
 * PDF or floor plan instead of typing a brief — the extractor reads
 * those documents and images directly.
 */
async function extractItems(
  query: string,
  _settings: BusinessSettings,
  attachments: IngestedAttachments,
  floorplan: FloorplanReading | null
): Promise<ItemCandidate[]> {
  if (!OPENAI_API_KEY) {
    console.warn('[cost-engineer] no OPENAI_API_KEY for extraction; returning fallback');
    return fallbackExtraction(query);
  }

  const system = `You are a senior UK electrical estimator with 20+ years on the tools.

Your job: read a brief and produce a comprehensive, realistic itemised list of every material that must be ordered AND every distinct labour task — as if you were going to spec the job and put a man on it next week.

Think methodically:
- Walk the property/site mentally room-by-room or zone-by-zone. Don't skip the small stuff: back boxes, grommets, cable clips, clamps, terminations, sleeves, bushes, glands.
- Every cable is metres of cable AND minutes per metre to install. Every accessory is the accessory PLUS the back box PLUS the labour to fit it. Every circuit is the cable run PLUS the protection device PLUS the testing.
- Include consumables: cable ties, fixings, screws, sealant, marker pen, sleeving.
- Include certification labour if the brief mentions EIC, EICR, Minor Works, Part P notification.
- Include first-fix AND second-fix labour as separate tasks where the work is genuinely two visits.
- Where the brief is silent on quantity but a sensible estimator would assume one (e.g. main earthing conductor), include it once.

CRITICAL RULES — read carefully:
- Output strictly valid JSON. No markdown, no commentary outside JSON.
- Use UK English (metre not meter, colour, earthing, mains).
- Never invent prices or hours-without-thought; the hours you give are real benchmarks for a competent UK electrician.

SEPARATION OF MATERIALS AND LABOUR (this is the most important rule — get this wrong and the system mis-prices the entire job):

EVERY item has a "kind": "material" | "labour".

MATERIAL items:
- A NOUN — a product you buy from a supplier
- description is the product name only ("6mm² Twin and Earth Cable", "13A Double Socket White")
- NO action verbs ("install", "fit", "wire", "connect", "mount", "drill", "fish", "clip", "dress", "terminate", "isolate", "label", "route", "set out", "check", "test", "commission", "remove", "replace", "site survey")
- searchQuery is 3-5 supplier-style keywords ("6mm twin earth cable")
- labourTask MUST be omitted/null
- hoursPerUnit MUST be 0

LABOUR items:
- A VERB — work the electrician does
- description is the task ("Install and secure 34m EV charger supply cable")
- labourTask is set (Title Case)
- hoursPerUnit is realistic timing (~6 minutes per metre of T&E = 0.1; double socket fit ~1h; downlight fit ~0.5h; consumer unit changeover ~6h; commissioning EV charger ~1h)
- searchQuery should be "" — labour is not searched in any catalogue
- quantity should typically be 1, with unit "task" or "circuit" or "point" — NOT "metre" (that conflates with cable measurement)

❌ BAD — never do this: { kind: "material", description: "Install 34m cable", quantity: 34, unit: "metre", category: "cables" }  → would match a cable drum at £251 × 34 = £8,554. Disaster.
✅ GOOD — split it:
   { kind: "material", description: "6mm² Twin and Earth Cable", searchQuery: "6mm twin earth cable", quantity: 34, unit: "metre", category: "cables" }
   { kind: "labour", description: "Install and clip 34m T&E cable run", labourTask: "Install And Clip 34m T&E Cable Run", quantity: 1, unit: "task", hoursPerUnit: 3.5, phase: "first-fix" }

OTHER RULES:
- Title Case all labourTask values.
- One row per DISTINCT material. Don't merge ("12 sockets and 4 switches" → two rows).
- Skip overheads (travel, certification fees, Part P fee) — those are added later by the system. EIC/EICR labour for testing IS included.`;

  const briefText = query.trim();
  const attachmentText = attachments.textBlocks.join('\n').slice(0, 6000);
  const briefIsEmpty = briefText.length < 20;
  const floorplanBlock =
    floorplan && floorplan.hasUsableDrawing ? formatReadingForExtraction(floorplan) : '';

  const user = `Job briefing:
"""
${briefText || '[No text briefing supplied — read the attached scope of works / specification / floor plan carefully and use that as the brief.]'}
"""

${
  floorplanBlock
    ? `${floorplanBlock}\n\n`
    : ''
}${
  attachmentText
    ? `Attached documents (extracted text):\n"""\n${attachmentText}\n"""\n\n`
    : ''
}${
  attachments.imageBlocks.length > 0
    ? `[${attachments.imageBlocks.length} image attachment${attachments.imageBlocks.length === 1 ? ' is' : 's are'} attached as multimodal input — the floor-plan reading above is from these images, but you can still verify against them.]\n\n`
    : ''
}${
  briefIsEmpty
    ? 'IMPORTANT: the user did not type a brief. The attached documents/images ARE the brief. Extract every material and labour task from them in detail.\n\n'
    : ''
}Return JSON of shape:
{
  "items": [
    {
      "key": "unique-stable-id",
      "kind": "material" | "labour",
      "description": "MATERIAL: just the product name (no verbs). LABOUR: the task, e.g. 'Install Consumer Unit'.",
      "searchQuery": "MATERIAL only: 3-5 supplier-style keywords. LABOUR: empty string.",
      "quantity": number,
      "unit": "item|metre|m²|task|circuit|point",
      "category": "cables|consumer-units|circuit-protection|wiring-accessories|lighting|containment|earthing|fire-security|ev-charging|data-networking|fixings|hvac" or null,
      "labourTask": "LABOUR only: Title Case task. MATERIAL: omit/null.",
      "hoursPerUnit": "LABOUR: realistic hours per quantity-unit. MATERIAL: 0.",
      "phase": "first-fix | second-fix | test-and-cert" (LABOUR only)
    }
  ]
}

Phase guide:
- first-fix: carcass work — cable runs, chasing, back boxes, drilling, fishing through joists
- second-fix: terminations and accessories — sockets, switches, lights, the consumer unit dressing
- test-and-cert: dead/live testing, EIC/EICR, certification, Part P notification, final walkround

Examples of good searchQuery values:
- description: "2.5mm² Twin and Earth Cable, 100m Drum, Grey" → searchQuery: "2.5mm twin earth cable 100m"
- description: "13A Double Socket Outlet, White Moulded, Switched" → searchQuery: "13a double socket white"
- description: "Hager 12-Module 8-Way Dual RCD Type A Consumer Unit" → searchQuery: "consumer unit dual rcd 8 way"
- description: "32A Type B AFDD/RCBO" → searchQuery: "afdd rcbo 32a type b"
- description: "Fire-Rated LED Downlight 6W 4000K Dimmable Recessed" → searchQuery: "led downlight fire rated dimmable"

Be thorough. A typical kitchen rewire for example has 30–50 line items when you include every back box, clip, terminal and connector, plus 8–12 distinct labour tasks.`;

  const userMessage =
    attachments.imageBlocks.length > 0
      ? {
          role: 'user' as const,
          content: [
            { type: 'text', text: user },
            ...attachments.imageBlocks,
          ],
        }
      : { role: 'user' as const, content: user };

  const resp = await openaiChat(
    {
      model: MODEL,
      messages: [{ role: 'system', content: system }, userMessage],
      response_format: { type: 'json_object' },
      max_completion_tokens: 6000,
    },
    60_000
  );
  if (!resp.ok) {
    console.error('[cost-engineer] extraction call failed:', resp.status);
    return fallbackExtraction(query);
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return fallbackExtraction(query);

  try {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed.items)) return fallbackExtraction(query);
    return parsed.items
      .filter((it: any) => it?.description && it?.quantity > 0)
      .map((it: any, i: number) => {
        // Default to inferring kind when AI omits it — verb-led
        // descriptions or labour-task presence both signal labour.
        const inferredKind: 'material' | 'labour' =
          it.kind === 'labour' ||
          it.kind === 'material'
            ? it.kind
            : it.labourTask || (it.hoursPerUnit ?? 0) > 0 || isVerbLedDescription(String(it.description ?? ''))
              ? 'labour'
              : 'material';
        return {
          key: String(it.key ?? `item-${i + 1}`),
          kind: inferredKind,
          description: String(it.description).slice(0, 200),
          searchQuery: String(it.searchQuery ?? (inferredKind === 'material' ? it.description : '') ?? '').slice(0, 100),
          quantity: Math.max(0, Number(it.quantity)),
          unit: String(it.unit ?? 'item').slice(0, 20),
          category: it.category ?? null,
          labourTask:
            inferredKind === 'labour'
              ? it.labourTask
                ? toTitleCase(String(it.labourTask).slice(0, 100))
                : toTitleCase(String(it.description).slice(0, 100))
              : null,
          hoursPerUnit:
            inferredKind === 'labour' && it.hoursPerUnit !== undefined && it.hoursPerUnit !== null
              ? Number(it.hoursPerUnit)
              : inferredKind === 'labour'
                ? 1
                : undefined,
          phase: validPhase(it.phase),
        };
      });
  } catch (err) {
    console.error('[cost-engineer] extraction JSON parse failed:', err);
    return fallbackExtraction(query);
  }
}

/**
 * Top up the AI's extraction with the consumables, fees and certs that
 * are easy to miss. Each rule fires only when its preconditions are
 * met (e.g. cable clips only if there's cable; Part P only if domestic
 * with notifiable work). This is the "completion checklist" a senior
 * estimator runs at the end.
 */
function ensureCompletionItems(items: ItemCandidate[], brief: string): ItemCandidate[] {
  const haystack = (
    brief +
    ' ' +
    items.map((c) => `${c.description} ${c.labourTask ?? ''} ${c.category ?? ''}`).join(' ')
  ).toLowerCase();
  const has = (re: RegExp) => re.test(haystack);

  const present = (re: RegExp) =>
    items.some((c) =>
      re.test(`${c.description} ${c.searchQuery ?? ''} ${c.labourTask ?? ''}`.toLowerCase())
    );

  const cableMetres = items
    .filter((c) => /cable|t&e|twin\s+earth|swa/i.test(c.description) && /metre|m2|m²/i.test(c.unit))
    .reduce((sum, c) => sum + c.quantity, 0);

  const additions: ItemCandidate[] = [];
  const newKey = (slug: string) => `auto-${slug}-${Date.now().toString(36).slice(-4)}-${Math.random().toString(36).slice(2, 5)}`;
  const matBase = (overrides: Partial<ItemCandidate>): ItemCandidate => ({
    key: newKey('mat'),
    kind: 'material',
    description: '',
    searchQuery: '',
    quantity: 1,
    unit: 'item',
    category: null,
    labourTask: undefined,
    hoursPerUnit: 0,
    ...overrides,
  });
  const labBase = (overrides: Partial<ItemCandidate>): ItemCandidate => ({
    key: newKey('lab'),
    kind: 'labour',
    description: '',
    searchQuery: '',
    quantity: 1,
    unit: 'task',
    category: null,
    labourTask: undefined,
    hoursPerUnit: 1,
    ...overrides,
  });

  // Cable clips: ~1 per metre of T&E. Material only.
  if (cableMetres > 0 && !present(/cable\s*clip|p[- ]?clip/)) {
    additions.push(
      matBase({
        description: 'Cable clips for T&E (mixed sizes)',
        searchQuery: 'cable clip 2.5mm twin earth',
        quantity: Math.ceil(cableMetres),
        category: 'fixings',
      })
    );
  }

  // 5% cable waste allowance — material, priced as cable.
  if (cableMetres > 0 && !present(/wastage|cable\s+waste/)) {
    additions.push(
      matBase({
        description: 'Cable wastage allowance (5%)',
        searchQuery: '2.5mm twin earth cable',
        quantity: Math.max(1, Math.ceil(cableMetres * 0.05)),
        unit: 'metre',
        category: 'cables',
      })
    );
  }

  const isNewInstall = has(/(rewire|new\s+circuit|new\s+install|consumer\s+unit|ev\s+charger)/);
  const isInspectionOnly = !isNewInstall && has(/eicr|periodic\s+inspect|condition\s+report/);

  // EIC for new install — labour-only (cert is paperwork, no material).
  if (isNewInstall && !present(/(electrical\s+installation\s+certificate|eic\b|test\s+cert)/)) {
    additions.push(
      labBase({
        description: 'Carry Out EIC Testing and Certification',
        labourTask: 'Carry Out EIC Testing and Certification',
        hoursPerUnit: 1.5,
        phase: 'test-and-cert',
      })
    );
  } else if (isInspectionOnly && !present(/eicr/)) {
    additions.push(
      labBase({
        description: 'Carry Out EICR',
        labourTask: 'Carry Out EICR',
        hoursPerUnit: 4,
        phase: 'test-and-cert',
      })
    );
  }

  // Part P fee — material kind so it surfaces as a fixed cost. Will not
  // match the marketplace; renders as "Unmatched / Review" prompting
  // the user to add the £35-ish fee manually.
  const isDomestic = !has(/\b(commercial|industrial|factory|warehouse|office\s+fit)/);
  const isNotifiable =
    has(/consumer\s+unit/) ||
    has(/rewire/) ||
    has(/new\s+circuit/) ||
    has(/ev\s+charger/) ||
    (has(/bathroom|wet\s+room/) && has(/socket|spur|fan|extract/));
  if (isDomestic && isNotifiable && !present(/part\s*p/)) {
    additions.push(
      matBase({
        description: 'Part P Building Regulations notification fee',
        searchQuery: 'part p notification',
        category: 'testing-cert' as any,
      })
    );
  }

  // Smoke / heat alarms — split into material (the alarms) + labour
  // (install). Both rows so pricing flows correctly to each side.
  if (isDomestic && has(/rewire/) && !present(/(smoke|heat|co)\s*(alarm|detector)/)) {
    additions.push(
      matBase({
        description: 'Interlinked smoke + heat alarms (Grade D2 BS 5839-6)',
        searchQuery: 'interlinked smoke alarm grade d2',
        quantity: 3,
        category: 'fire-security',
      }),
      labBase({
        description: 'Install Interlinked Smoke + Heat Alarms',
        labourTask: 'Install Interlinked Smoke + Heat Alarms',
        hoursPerUnit: 2.25,
        phase: 'second-fix',
      })
    );
  }

  // Intumescent loft covers — material only, install effort rolled into
  // the downlight install labour.
  const hasDownlights = present(/downlight|recessed\s+light/);
  if (hasDownlights && has(/loft|attic|insulation/) && !present(/intumescent|loft\s+cover/)) {
    additions.push(
      matBase({
        description: 'Intumescent loft covers for downlights',
        searchQuery: 'intumescent downlight cover',
        quantity: 6,
        category: 'fire-security',
      })
    );
  }

  // Sleeving + grommets — cheap consumables. Material only.
  if (has(/rewire|new\s+circuit|first[- ]?fix/) && !present(/sleeving|grommet|earth\s+sleeve/)) {
    additions.push(
      matBase({
        description: 'Earth sleeving, grommets, terminal sleeving (consumables)',
        searchQuery: 'earth sleeve grommet pack',
        category: 'wiring-accessories',
      })
    );
  }

  if (additions.length > 0) {
    console.log(
      `[cost-engineer] auto-added ${additions.length} completion items: ${additions.map((a) => a.description).join('; ')}`
    );
  }

  return [...items, ...additions];
}

/**
 * Refinement: pull the parent job's structured items, ask the AI to
 * propose deltas (swaps / adds / removes) per the requested mode, then
 * return a new candidate list. Pricing + facets are re-run downstream
 * so the refined quote reflects current marketplace state.
 */
async function refineFromParent(
  supabase: any,
  parentJobId: string,
  mode: string
): Promise<ItemCandidate[]> {
  const { data: parent } = await supabase
    .from('cost_engineer_jobs')
    .select('output_data, query')
    .eq('id', parentJobId)
    .maybeSingle();

  // Materials & labour are stored as priced rows. We need to convert
  // them back to ItemCandidate-shape for the pricing pipeline.
  const parentMaterials = (parent?.output_data?.structuredData?.materials?.items ?? []) as any[];
  const parentLabour = (parent?.output_data?.structuredData?.labour?.tasks ?? []) as any[];
  const parentBrief = String(parent?.query ?? '').slice(0, 2000);

  if (parentMaterials.length === 0 && parentLabour.length === 0) {
    console.warn('[cost-engineer] refine: parent has no items, falling back to empty');
    return [];
  }

  const seedCandidates: ItemCandidate[] = parentMaterials.map((m: any, i: number) => ({
    key: `parent-mat-${i}`,
    kind: 'material',
    description: String(m.description ?? m.item ?? 'Material').slice(0, 200),
    searchQuery: String(m.description ?? '').slice(0, 100),
    quantity: Number(m.quantity ?? 1),
    unit: String(m.unit ?? 'item'),
    category: m.category ?? null,
    labourTask: undefined,
    hoursPerUnit: 0,
  }));

  // Add a row per labour task too (so they survive the refine).
  parentLabour.forEach((t: any, i: number) => {
    seedCandidates.push({
      key: `parent-lab-${i}`,
      kind: 'labour',
      description: String(t.description ?? 'Labour'),
      searchQuery: '',
      quantity: 1,
      unit: 'task',
      category: null,
      labourTask: String(t.description ?? ''),
      hoursPerUnit: Number(t.hours ?? 1),
      phase: validPhase(t.phase),
    });
  });

  if (!OPENAI_API_KEY) {
    console.warn('[cost-engineer] refine: no API key, returning seed unchanged');
    return seedCandidates;
  }

  const modeInstruction: Record<string, string> = {
    cheaper:
      'Reduce the total quote by ~10-15% via realistic swaps. Drop premium-brand items to value-grade equivalents, propose customer-supplied alternatives where reasonable, simplify spec where it does not affect compliance, drop genuinely optional items. Do NOT compromise BS 7671 compliance, safety, or required certs.',
    premium:
      'Upgrade the spec — premium accessories (MK Logic / brushed brass / dimmer everywhere), top-tier consumer unit + RCBOs throughout instead of dual RCD, add SPD, USB-C sockets, intelligent lighting, smart thermostat, full whole-house surge protection. Justify each upgrade with a benefit the client can feel.',
    phase:
      'Split the work across two visits to spread cost / VAT. First visit: critical safety + first-fix structural work. Second visit: second-fix accessories, finishing, certs. Mark each item with the visit number it belongs to via the labourTask description prefix.',
  };

  const system = `You are a UK electrical estimator's refinement layer. The user has an existing quote and wants it refined per a specific mode. You return DELTAS: keep / swap / remove / add.

Hard rules:
- Output strictly valid JSON. No markdown, no commentary outside JSON.
- UK English.
- Realistic UK trade product names in description and searchQuery (Screwfix-style).`;

  const user = `Original brief (for context):
"""
${parentBrief}
"""

Existing quote items (to refine — ${seedCandidates.length} total${seedCandidates.length > 80 ? ', showing first 80' : ''}):
${seedCandidates
  .slice(0, 80)
  .map(
    (c, i) =>
      `${i + 1}. ${c.description} × ${c.quantity} ${c.unit}${c.labourTask ? ` (LABOUR: ${c.labourTask}, ${c.hoursPerUnit}h, ${c.phase ?? 'second-fix'})` : ''}`
  )
  .join('\n')}

REFINEMENT MODE: ${mode}
${modeInstruction[mode] ?? ''}

Return JSON of shape:
{
  "items": [
    {
      "key": "string-unique-id",
      "description": "Full descriptive item name",
      "searchQuery": "Short supplier-style keywords (3-5 words)",
      "quantity": number,
      "unit": "item|metre|m²|hour|circuit|point",
      "category": "cables|consumer-units|circuit-protection|wiring-accessories|lighting|containment|earthing|fire-security|ev-charging|data-networking|fixings|hvac" or null,
      "labourTask": "Title Case verb-led labour, omit if materials-only",
      "hoursPerUnit": number,
      "phase": "first-fix | second-fix | test-and-cert" or null
    }
  ]
}

The "items" array should contain the FULL refined item list — keeps you wanted to retain unchanged, plus any swaps / additions you've made. Items the user doesn't want any more, just leave OUT.`;

  const resp = await openaiChat(
    {
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      response_format: { type: 'json_object' },
      max_completion_tokens: 8000,
    },
    60_000
  );

  if (!resp.ok) {
    console.error('[cost-engineer] refinement call failed:', resp.status);
    return seedCandidates;
  }

  try {
    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return seedCandidates;
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed.items)) return seedCandidates;
    return parsed.items
      .filter((it: any) => it?.description && it?.quantity > 0)
      .map((it: any, i: number) => {
        const inferredKind: 'material' | 'labour' =
          it.kind === 'labour' || it.kind === 'material'
            ? it.kind
            : it.labourTask || (it.hoursPerUnit ?? 0) > 0 || isVerbLedDescription(String(it.description ?? ''))
              ? 'labour'
              : 'material';
        return {
          key: String(it.key ?? `refined-${i + 1}`),
          kind: inferredKind,
          description: String(it.description).slice(0, 200),
          searchQuery: String(it.searchQuery ?? (inferredKind === 'material' ? it.description : '') ?? '').slice(0, 100),
          quantity: Math.max(0, Number(it.quantity)),
          unit: String(it.unit ?? 'item').slice(0, 20),
          category: it.category ?? null,
          labourTask:
            inferredKind === 'labour'
              ? it.labourTask
                ? toTitleCase(String(it.labourTask).slice(0, 100))
                : toTitleCase(String(it.description).slice(0, 100))
              : null,
          hoursPerUnit:
            inferredKind === 'labour' && it.hoursPerUnit !== undefined && it.hoursPerUnit !== null
              ? Number(it.hoursPerUnit)
              : inferredKind === 'labour'
                ? 1
                : undefined,
          phase: validPhase(it.phase),
        };
      });
  } catch (err) {
    console.error('[cost-engineer] refinement parse failed:', err);
    return seedCandidates;
  }
}

function fallbackExtraction(query: string): ItemCandidate[] {
  // Degraded fallback when the AI is unreachable. Single labour line so
  // the user sees something rather than a crashed pipeline.
  const desc = query.slice(0, 80) || 'Electrical work';
  return [
    {
      key: 'fallback-1',
      kind: 'labour',
      description: desc,
      searchQuery: '',
      quantity: 1,
      unit: 'task',
      category: null,
      labourTask: 'General Electrical Work',
      hoursPerUnit: 4,
    },
  ];
}

async function priceMaterials(
  supabase: any,
  candidates: ItemCandidate[]
): Promise<PricedMaterial[]> {
  // Only price MATERIAL candidates against the marketplace. Labour items
  // have no marketplace counterpart — pricing them produces nonsense
  // matches (e.g. "Install 34m cable" → £251 cable drum × 34 = £8.5K).
  const materialCandidates = candidates.filter((c) => c.kind === 'material');

  const matches = await cheapestForItemsBatch(
    supabase,
    materialCandidates.map((c) => ({
      key: c.key,
      query: c.searchQuery || c.description,
      category: c.category,
    }))
  );

  return materialCandidates.map((c) => {
    const m = matches[c.key];
    return m ? materialFromMatch(c, m) : materialFromEstimate(c);
  });
}

/**
 * Parse the matched product's container size from its name so we can
 * convert a drum/coil/pack price into a true per-unit price.
 *
 * Examples we need to handle (real strings from marketplace_products):
 *   "Prysmian 6242Y Grey 2.5mm² Twin & Earth Cable 50m Drum"      → 50  metres
 *   "Doncaster Cables Twin & Earth Cable (6242Y) 2.5mm2 Coil"     → 100 metres (default coil)
 *   "Vimark Grey Flat Single Twin & Earth Cable Clips 2.5mm 100 Pack" → 100 each
 *   "MK 13A Twin Switched Socket Outlet Pack of 5"                → 5 each
 *   "Earth Sleeving Green/Yellow 100m Roll"                       → 100 metres
 *   "Cable Ties 200mm Pack of 100"                                → 100 each
 *
 * Returns the multiplier we should DIVIDE the matched price by to
 * produce a sensible per-unit rate. Defaults to 1 when nothing parses
 * (i.e. the matched product is genuinely sold as a single unit).
 */
function parseContainerSize(name: string, candidateUnit: string): number {
  if (!name) return 1;
  const n = name.toLowerCase();
  const wantsMetres = /metre|meter|^m$/i.test(candidateUnit);

  // ── Length-based containers (cable / sleeving / conduit / tape) ──
  if (wantsMetres) {
    // "50m drum", "100m coil", "25m reel", "10m roll", "50m length"
    const m = n.match(/(\d{1,4})\s*m(?:tr|etre|eter|r)?\s*(?:drum|coil|reel|roll|length|pack|box|carton)?/);
    if (m) {
      const len = Number(m[1]);
      if (len >= 5 && len <= 1000) return len;
    }
    // Bare "drum" / "coil" with no length → industry default sizes
    if (/\bdrum\b/.test(n)) return 50;   // typical T&E drum
    if (/\bcoil\b/.test(n)) return 50;
    if (/\breel\b/.test(n)) return 50;
    return 1;
  }

  // ── Pack-based containers (clips, sockets, switches, screws, etc.) ──
  // "100 Pack", "Pack of 100", "100-pack", "100pcs", "100 pcs", "Box of 25"
  const patterns: RegExp[] = [
    /pack\s*of\s*(\d{1,4})\b/,
    /box\s*of\s*(\d{1,4})\b/,
    /bag\s*of\s*(\d{1,4})\b/,
    /case\s*of\s*(\d{1,4})\b/,
    /set\s*of\s*(\d{1,4})\b/,
    /(\d{1,4})\s*[-–]?\s*pack\b/,
    /(\d{1,4})\s*[-–]?\s*pk\b/,
    /(\d{1,4})\s*pcs?\b/,
    /(\d{1,4})\s*pieces?\b/,
    /(\d{1,4})\s*pair\b/,
    /(\d{1,4})\s*x\s*(?:single|double|gang|piece|qty)/, // "10 x Single" etc.
  ];
  for (const re of patterns) {
    const mm = n.match(re);
    if (mm) {
      const count = Number(mm[1]);
      if (count >= 2 && count <= 5000) return count;
    }
  }
  return 1;
}

/**
 * Sanity ranges per category (£ per ONE actual unit, post-container
 * normalisation). When the matched product yields an effective unit
 * price wildly outside these bands, we fall back to the typical price
 * and flag the row as estimated. Ranges are intentionally generous —
 * they only catch order-of-magnitude errors, not £-by-£ variation.
 */
const CATEGORY_PRICE_RANGES: Record<string, { min: number; max: number; typical: number; unit: string }> = {
  // Cables (per metre, T&E typical ranges)
  'cables.2.5':              { min: 0.30, max: 3.50,   typical: 1.10, unit: 'metre' },
  'cables.1.5':              { min: 0.20, max: 3.00,   typical: 0.90, unit: 'metre' },
  'cables.1.0':              { min: 0.30, max: 4.00,   typical: 1.20, unit: 'metre' },
  'cables.4.0':              { min: 0.80, max: 7.00,   typical: 2.20, unit: 'metre' },
  'cables.6.0':              { min: 1.50, max: 12.00,  typical: 3.50, unit: 'metre' },
  'cables.10':               { min: 3.00, max: 25.00,  typical: 8.50, unit: 'metre' },
  'cables.16':               { min: 6.00, max: 40.00,  typical: 14.0, unit: 'metre' },
  'cables.heat':             { min: 1.50, max: 15.00,  typical: 4.00, unit: 'metre' },
  'cables.3core':            { min: 0.80, max: 8.00,   typical: 2.50, unit: 'metre' },
  'cables.swa':              { min: 4.00, max: 60.00,  typical: 12.0, unit: 'metre' },
  // Wiring accessories (per item)
  'wiring-accessories.socket-double':  { min: 1.50, max: 35.00, typical: 4.50, unit: 'item' },
  'wiring-accessories.socket-single':  { min: 1.20, max: 25.00, typical: 3.50, unit: 'item' },
  'wiring-accessories.switch-1g':      { min: 0.80, max: 15.00, typical: 1.80, unit: 'item' },
  'wiring-accessories.switch-2g':      { min: 1.20, max: 18.00, typical: 2.50, unit: 'item' },
  'wiring-accessories.fcu':            { min: 4.00, max: 20.00, typical: 7.50, unit: 'item' },
  'wiring-accessories.cooker':         { min: 10.00, max: 35.00, typical: 16.0, unit: 'item' },
  'wiring-accessories.junction-box':   { min: 0.40, max: 6.00,  typical: 1.20, unit: 'item' },
  'wiring-accessories.back-box':       { min: 0.30, max: 3.00,  typical: 0.65, unit: 'item' },
  // Circuit protection
  'circuit-protection.rcbo':           { min: 8.00, max: 45.00, typical: 14.0, unit: 'item' },
  'circuit-protection.mcb':            { min: 3.00, max: 25.00, typical: 6.50, unit: 'item' },
  'circuit-protection.consumer-unit':  { min: 25.00, max: 250.0, typical: 75.0, unit: 'item' },
  // Earthing
  'earthing.bonding':                  { min: 0.80, max: 15.00, typical: 2.30, unit: 'metre' },
  'earthing.clamp':                    { min: 0.40, max: 5.00,  typical: 1.20, unit: 'item' },
  'earthing.sleeving':                 { min: 0.10, max: 2.00,  typical: 0.30, unit: 'metre' },
  // Containment
  'containment.conduit-20mm':          { min: 0.40, max: 5.00,  typical: 1.20, unit: 'metre' },
  'containment.conduit-25mm':          { min: 0.50, max: 6.00,  typical: 1.50, unit: 'metre' },
  'containment.fitting':               { min: 0.20, max: 3.00,  typical: 0.60, unit: 'item' },
  // Fixings (per item)
  'fixings.clip':                      { min: 0.005, max: 0.30, typical: 0.04, unit: 'item' },
  'fixings.grommet':                   { min: 0.01, max: 0.50,  typical: 0.05, unit: 'item' },
  'fixings.screw':                     { min: 0.005, max: 0.40, typical: 0.05, unit: 'item' },
  'fixings.cable-tie':                 { min: 0.005, max: 0.30, typical: 0.03, unit: 'item' },
  'fixings.connector':                 { min: 0.10, max: 3.00,  typical: 0.50, unit: 'item' },
  'fixings.tape':                      { min: 0.80, max: 8.00,  typical: 2.00, unit: 'item' },
  'fixings.sealant':                   { min: 3.00, max: 18.00, typical: 7.00, unit: 'item' },
  // Fire/security
  'fire-security.smoke-alarm':         { min: 12.00, max: 120.0, typical: 35.0, unit: 'item' },
  'fire-security.heat-alarm':          { min: 15.00, max: 130.0, typical: 40.0, unit: 'item' },
  'fire-security.intumescent':         { min: 4.00, max: 25.00, typical: 9.00, unit: 'item' },
  // Lighting
  'lighting.downlight':                { min: 2.50, max: 35.00, typical: 7.00, unit: 'item' },
  'lighting.batten':                   { min: 12.00, max: 80.00, typical: 28.0, unit: 'item' },
  'lighting.bulkhead':                 { min: 8.00, max: 80.00, typical: 22.0, unit: 'item' },
};

/**
 * Pick the best-fitting sanity range for a candidate. Falls back
 * gracefully if we can't classify it. Optionally considers the matched
 * product name as extra signal — useful when the candidate's category
 * is null or the description is sparse.
 */
function lookupPriceRange(
  c: ItemCandidate,
  productName?: string | null,
): { min: number; max: number; typical: number; unit: string } | null {
  const haystack = `${c.description ?? ''} ${productName ?? ''}`.toLowerCase();
  const desc = haystack;
  const cat = (c.category ?? '').toLowerCase();
  const has = (s: string) => desc.includes(s);

  // Cables — pick by mm² in description
  if (cat === 'cables' || has('cable') || has('t&e') || has('twin and earth') || has('twin & earth')) {
    if (has('swa') || has('armoured')) return CATEGORY_PRICE_RANGES['cables.swa'];
    if (has('heat resistant') || has('3093') || has('3094')) return CATEGORY_PRICE_RANGES['cables.heat'];
    if (has('three core') || has('3 core') || has('3-core')) return CATEGORY_PRICE_RANGES['cables.3core'];
    if (/\b16\s*mm/.test(desc)) return CATEGORY_PRICE_RANGES['cables.16'];
    if (/\b10\s*mm/.test(desc)) return CATEGORY_PRICE_RANGES['cables.10'];
    if (/\b6(\.0)?\s*mm/.test(desc)) return CATEGORY_PRICE_RANGES['cables.6.0'];
    if (/\b4(\.0)?\s*mm/.test(desc)) return CATEGORY_PRICE_RANGES['cables.4.0'];
    if (/\b2\.5\s*mm/.test(desc)) return CATEGORY_PRICE_RANGES['cables.2.5'];
    if (/\b1\.5\s*mm/.test(desc)) return CATEGORY_PRICE_RANGES['cables.1.5'];
    if (/\b1(\.0)?\s*mm/.test(desc)) return CATEGORY_PRICE_RANGES['cables.1.0'];
    return CATEGORY_PRICE_RANGES['cables.2.5'];
  }
  // The remaining checks use description-only matching so they fire
  // even when the AI's category guess is wrong or missing.

  if (has('rcbo')) return CATEGORY_PRICE_RANGES['circuit-protection.rcbo'];
  if (has(' mcb') || /\bmcb\b/.test(desc)) return CATEGORY_PRICE_RANGES['circuit-protection.mcb'];
  if (has('consumer unit') || has('distribution board')) return CATEGORY_PRICE_RANGES['circuit-protection.consumer-unit'];

  if (has('downlight')) return CATEGORY_PRICE_RANGES['lighting.downlight'];
  if (has('batten')) return CATEGORY_PRICE_RANGES['lighting.batten'];
  if (has('bulkhead') || (has('exterior') && has('light'))) return CATEGORY_PRICE_RANGES['lighting.bulkhead'];

  if (has('smoke alarm')) return CATEGORY_PRICE_RANGES['fire-security.smoke-alarm'];
  if (has('heat alarm')) return CATEGORY_PRICE_RANGES['fire-security.heat-alarm'];
  if (has('intumescent') || has('loft cover')) return CATEGORY_PRICE_RANGES['fire-security.intumescent'];

  if (has('double') && has('socket')) return CATEGORY_PRICE_RANGES['wiring-accessories.socket-double'];
  if (has('single') && has('socket')) return CATEGORY_PRICE_RANGES['wiring-accessories.socket-single'];
  if (has('cooker') && has('control')) return CATEGORY_PRICE_RANGES['wiring-accessories.cooker'];
  if (has('fcu') || has('fused connection') || has('spur')) return CATEGORY_PRICE_RANGES['wiring-accessories.fcu'];
  if ((has('2-gang') || has('2 gang') || has('two gang')) && has('switch')) return CATEGORY_PRICE_RANGES['wiring-accessories.switch-2g'];
  if ((has('intermediate') || has('1-gang') || has('1 gang') || has('bell press')) && has('switch')) return CATEGORY_PRICE_RANGES['wiring-accessories.switch-1g'];
  if (has('light switch') || (cat === 'wiring-accessories' && has('switch'))) return CATEGORY_PRICE_RANGES['wiring-accessories.switch-1g'];
  if (has('back box') || has('backbox') || (has('mounting box') && !has('weatherproof'))) return CATEGORY_PRICE_RANGES['wiring-accessories.back-box'];
  if (has('junction box')) return CATEGORY_PRICE_RANGES['wiring-accessories.junction-box'];

  if (has('cable clip') || (has('clip') && has('cable'))) return CATEGORY_PRICE_RANGES['fixings.clip'];
  if (has('grommet')) return CATEGORY_PRICE_RANGES['fixings.grommet'];
  if (has('cable tie')) return CATEGORY_PRICE_RANGES['fixings.cable-tie'];
  if (has('wago') || (has('connector') && !has('plug'))) return CATEGORY_PRICE_RANGES['fixings.connector'];
  if (has('insulation tape') || (has('tape') && cat === 'fixings')) return CATEGORY_PRICE_RANGES['fixings.tape'];
  if (has('sealant') || has('caulk')) return CATEGORY_PRICE_RANGES['fixings.sealant'];
  if ((has('screw') || has('rawl') || has('plug')) && cat === 'fixings') return CATEGORY_PRICE_RANGES['fixings.screw'];

  if (has('earth clamp') || (has('clamp') && (has('bonding') || has('earth')))) return CATEGORY_PRICE_RANGES['earthing.clamp'];
  if (has('earth sleeving') || has('green/yellow') || has('green and yellow')) return CATEGORY_PRICE_RANGES['earthing.sleeving'];
  if (has('main bonding') || (cat === 'earthing' && /\b\d+(\.\d+)?\s*mm/.test(desc))) return CATEGORY_PRICE_RANGES['earthing.bonding'];

  if (/\b25\s*mm/.test(desc) && has('conduit')) return CATEGORY_PRICE_RANGES['containment.conduit-25mm'];
  if (/\b20\s*mm/.test(desc) && has('conduit')) return CATEGORY_PRICE_RANGES['containment.conduit-20mm'];
  if (cat === 'containment') return CATEGORY_PRICE_RANGES['containment.fitting'];

  return null;
}

function materialFromMatch(c: ItemCandidate, m: MarketplaceMatch): PricedMaterial {
  // Step 1: reject obvious category-mismatches. Searching for a cable
  // sometimes returns a cable CLIP because of token overlap; pricing the
  // clip per metre crashes the line down to £0.22/m. Detect the mismatch
  // and fall through to estimated-from-typical.
  if (isCategoryMismatch(c, m)) {
    return materialFromEstimate(c, `Matched product "${m.name}" looks like a different category to "${c.description}".`);
  }

  // Step 2: parse the product name for drum length / pack size and divide
  // the price down to a true per-unit rate. £53.99 for a "50m Drum" of
  // 2.5mm T&E becomes £1.08/m, not £53.99 × 550 = £29,694.
  const containerSize = parseContainerSize(m.name ?? '', c.unit);
  let effectiveUnit = containerSize > 1 ? m.unitPrice / containerSize : m.unitPrice;

  // Step 3: sanity-check against typical UK trade ranges. We use a
  // narrow band — anything below the floor or above the ceiling is
  // swapped for the typical figure. The ranges are themselves wide
  // enough to cover legitimate variation; if we're outside them, the
  // match is almost certainly wrong (wrong product, wrong pack-size
  // parse, weird sale price, etc.).
  const range = lookupPriceRange(c, m.name);
  let unmatchedReason: string | null = null;
  if (range && (effectiveUnit < range.min || effectiveUnit > range.max)) {
    unmatchedReason = `Matched price £${m.unitPrice.toFixed(2)} (${m.name}) implausible for ${c.description} — using typical £${range.typical.toFixed(2)}/${range.unit}.`;
    effectiveUnit = range.typical;
  }

  const total = roundCurrency(effectiveUnit * c.quantity);
  return {
    description: c.description,
    quantity: c.quantity,
    unit: c.unit,
    unitPrice: roundCurrency(effectiveUnit),
    total,
    supplier: m.supplier,
    source: unmatchedReason
      ? { table: 'estimated', reason: unmatchedReason }
      : {
          table: 'marketplace_products',
          id: m.id,
          productUrl: m.productUrl,
          scrapedAt: m.scrapedAt,
          freshness: freshnessLabel(m.scrapedAt),
        },
    category: m.category ?? c.category ?? null,
  };
}

function materialFromEstimate(c: ItemCandidate, contextReason?: string): PricedMaterial {
  // No marketplace match (or match was rejected) — fall back to a
  // typical UK trade price so the line still has a sensible number.
  // Flag as estimated so the UI shows the user it isn't a live price.
  // Better than £0 (which silently under-quotes the job) or
  // hallucinating a precise figure.
  const range = lookupPriceRange(c);
  const unitPrice = range ? range.typical : 0;
  const baseReason = range
    ? `Using typical UK trade price £${range.typical.toFixed(2)}/${range.unit}.`
    : 'No marketplace match found — review manually.';
  return {
    description: c.description,
    quantity: c.quantity,
    unit: c.unit,
    unitPrice: roundCurrency(unitPrice),
    total: roundCurrency(unitPrice * c.quantity),
    supplier: 'Estimated',
    source: {
      table: 'estimated',
      reason: contextReason ? `${contextReason} ${baseReason}` : baseReason,
    },
    category: c.category ?? null,
  };
}

/**
 * Detect when the matched product is fundamentally a different kind of
 * thing to what the candidate asked for. This catches the most common
 * false positives:
 *   - search "2.5mm Twin and Earth Cable" → matches "2.5mm Cable Clip"
 *   - search "Smoke Alarm" → matches "Smoke Alarm Battery"
 *   - search "Consumer Unit" → matches "Consumer Unit Label Pack"
 *
 * Returns true when the candidate's description and the matched
 * product name describe categorically different things.
 */
function isCategoryMismatch(c: ItemCandidate, m: MarketplaceMatch): boolean {
  const desc = (c.description ?? '').toLowerCase();
  const prod = (m.name ?? '').toLowerCase();
  if (!desc || !prod) return false;

  const wantsCable = /\bcable\b/.test(desc) && !/\bclip|tie|grommet|gland|cleat|sleeve\b/.test(desc);
  const productIsAccessory = /\bclip|cable tie|grommet|gland|cleat|sleeve|label|sticker|marker\b/.test(prod) && !/\bcable\b\s*\d/.test(prod);
  if (wantsCable && productIsAccessory) return true;

  const wantsAlarm = /\b(smoke|heat|co|carbon)\s*alarm\b/.test(desc);
  const productIsBattery = /\bbattery\b/.test(prod) && !/\balarm\b/.test(prod.replace(/battery/g, ''));
  if (wantsAlarm && productIsBattery) return true;

  const wantsCU = /\bconsumer unit\b/.test(desc) && !/\b(label|sticker|blank|module|schedule)\b/.test(desc);
  const productIsCUAccessory = /\b(label|sticker|schedule)\b/.test(prod) && /\bconsumer unit\b/.test(prod);
  if (wantsCU && productIsCUAccessory) return true;

  const wantsSocket = /\bsocket\b/.test(desc) && !/\bcover|plate|insert|surround\b/.test(desc);
  const productIsSocketAccessory = /\b(cover plate|insert|blanking|surround)\b/.test(prod);
  if (wantsSocket && productIsSocketAccessory) return true;

  return false;
}

async function estimateLabour(
  supabase: any,
  candidates: ItemCandidate[],
  settings: BusinessSettings,
  brief: string
): Promise<LabourTask[]> {
  // Ask practical_work_intelligence for benchmarks once with a combined
  // query so we avoid N RPC calls. Then map per candidate.
  const benchmarkQuery = candidates
    .map((c) => c.labourTask ?? c.description)
    .slice(0, 8)
    .join(', ');

  const benchmark = await searchPracticalWorkIntelligence(supabase, {
    query: benchmarkQuery,
    tradeFilter: 'installer',
    matchCount: 20,
  }).catch(() => ({ results: [] as any[] }));

  // Detect install-method conditions across the brief + items so we can
  // adjust labour deterministically. Triggers are matched once globally
  // (e.g. "TT system, supplementary bonding") and once per item (e.g.
  // bathroom Zone 1 sockets get an IP-rated terminal premium).
  const globalContext = detectGlobalInstallContext(brief, candidates);

  const tasks: LabourTask[] = [];
  for (const c of candidates) {
    // Only labour candidates produce labour tasks. Material rows with
    // a stray hoursPerUnit are ignored — separation of concerns.
    if (c.kind !== 'labour') continue;
    if (!c.labourTask && !c.hoursPerUnit) continue;

    const benchHours = matchBenchmarkHours(c, benchmark.results);
    let hoursPerUnit = c.hoursPerUnit ?? benchHours ?? 1;

    // Apply install-method modifiers — these come from BS 7671 / OSG
    // install methods + special location rules. Multipliers are
    // deterministic; the AI doesn't override them.
    const itemMods = perItemModifiers(c, globalContext);
    hoursPerUnit *= itemMods.multiplier;

    const hours = roundHours(hoursPerUnit * c.quantity);
    if (hours <= 0) continue;

    const rate = settings.labourRateElectrician;
    const finalDescription = c.labourTask ?? toTitleCase(`Install ${c.description}`);
    tasks.push({
      description: finalDescription,
      hours,
      rate,
      total: roundCurrency(hours * rate),
      workerType: 'Qualified Electrician',
      phase: c.phase ?? inferPhase(c.labourTask, c.description),
    });
  }
  return tasks;
}

interface InstallContext {
  bathroomWork: boolean;
  outdoorWork: boolean;
  ttSystem: boolean;
  conduitInstall: boolean;
  loftAccess: boolean;
  preWar: boolean;
  threePhase: boolean;
  evCharger: boolean;
  fireRated: boolean;
  underfloorHeating: boolean;
}

/** Scan brief + items once for install-method triggers. */
function detectGlobalInstallContext(brief: string, candidates: ItemCandidate[]): InstallContext {
  const haystack = (
    brief +
    ' ' +
    candidates
      .map((c) => `${c.description} ${c.labourTask ?? ''} ${c.category ?? ''}`)
      .join(' ')
  ).toLowerCase();

  const has = (re: RegExp) => re.test(haystack);

  return {
    bathroomWork: has(/\bbathroom|en[- ]?suite|wet[- ]?room|shower\s+room/),
    outdoorWork: has(/\boutdoor|external|garden|outside|garage(?!\s*conversion)/),
    ttSystem: has(/\btt\s+system|tt\s+earthing|earth\s+rod|electrode\s+system/),
    conduitInstall: has(/\bconduit|trunking|method\s+e\b|in\s+(?:steel|metal)\s+conduit/),
    loftAccess: has(/\bloft|attic|roof\s+space|crawl\s+space|access\s+(?:tight|restricted)/),
    preWar: has(/\bvictorian|edwardian|georgian|pre[- ]?war|1900s|listed\s+building/),
    threePhase: has(/\b3[- ]?phase|three[- ]?phase|400v|tp&n/),
    evCharger: has(/\bev[- ]?charger|electric\s+vehicle|tesla|zappi|ohme/),
    fireRated: has(/\bfire[- ]?rated|fire\s+resistance|intumescent/),
    underfloorHeating: has(/\bunderfloor\s+heat|ufh|electric\s+floor\s+heat/),
  };
}

/**
 * Per-item labour multiplier. Each trigger contributes a small bump,
 * capped overall at +60% so we don't double-count. Returns the
 * multiplier and the list of triggers that applied (for diagnostics
 * — currently logged, not surfaced to the user).
 */
function perItemModifiers(
  c: ItemCandidate,
  ctx: InstallContext
): { multiplier: number; triggers: string[] } {
  const desc = `${c.description} ${c.labourTask ?? ''} ${c.category ?? ''}`.toLowerCase();
  const triggers: string[] = [];
  let mult = 1;

  // Bathroom Zone 1/2 sockets, lights, fans need IP-rated terminations.
  if (ctx.bathroomWork && /(socket|switch|light|fan|extract|shower)/.test(desc)) {
    mult *= 1.15;
    triggers.push('bathroom-zone');
  }

  // Outdoor work — weatherproof glands, potential SWA/buried.
  if (ctx.outdoorWork && /(socket|cable|run|circuit|isolator)/.test(desc)) {
    mult *= 1.2;
    triggers.push('outdoor');
  }

  // TT system supplementary bonding adds time per circuit.
  if (ctx.ttSystem && /(circuit|cable|consumer\s+unit)/.test(desc)) {
    mult *= 1.1;
    triggers.push('tt-supp-bonding');
  }

  // Conduit / trunking install method E — cable installation slower.
  if (ctx.conduitInstall && /(cable|conduit|trunking|circuit)/.test(desc)) {
    mult *= 1.3;
    triggers.push('conduit-method-e');
  }

  // Loft access tight — anything routed through the loft.
  if (ctx.loftAccess && /(cable|run|downlight|smoke|interconnect)/.test(desc)) {
    mult *= 1.15;
    triggers.push('loft-access');
  }

  // Pre-war property — chasing into solid walls, damaged plaster.
  if (ctx.preWar && /(socket|switch|chase|cable|first[- ]?fix)/.test(desc)) {
    mult *= 1.2;
    triggers.push('pre-war-build');
  }

  // 3-phase work — extra termination time, larger cable handling.
  if (ctx.threePhase && /(distribution|circuit|cable|isolator|machine)/.test(desc)) {
    mult *= 1.15;
    triggers.push('three-phase');
  }

  // EV charger commissioning + load management programming.
  if (ctx.evCharger && /(ev|charger|commission)/.test(desc)) {
    mult *= 1.2;
    triggers.push('ev-commissioning');
  }

  // Fire-rated installs need intumescent fitting and torch testing.
  if (ctx.fireRated && /(downlight|seal|opening)/.test(desc)) {
    mult *= 1.1;
    triggers.push('fire-rated');
  }

  // UFH grid bonding — extra termination plus testing.
  if (ctx.underfloorHeating && /(heating|ufh|bond|grid)/.test(desc)) {
    mult *= 1.15;
    triggers.push('ufh-grid-bond');
  }

  // Cap to +60% so a single item with many triggers doesn't blow up.
  if (mult > 1.6) mult = 1.6;

  if (triggers.length > 0) {
    console.log(
      `[cost-engineer] labour mod ×${mult.toFixed(2)} for "${c.description.slice(0, 40)}" (${triggers.join(', ')})`
    );
  }
  return { multiplier: mult, triggers };
}

function matchBenchmarkHours(c: ItemCandidate, benchmarks: any[]): number | null {
  if (benchmarks.length === 0) return null;
  const lowerTask = (c.labourTask ?? c.description).toLowerCase();
  for (const b of benchmarks) {
    const topic = (b.primary_topic ?? '').toLowerCase();
    if (topic && lowerTask.includes(topic.split(' ')[0])) {
      const mins = b.typical_duration_minutes;
      if (mins) return mins / 60;
    }
  }
  return null;
}

function applyDeterministicMath({
  materials,
  labour,
  settings,
  region,
}: {
  materials: PricedMaterial[];
  labour: LabourTask[];
  settings: BusinessSettings;
  region: RegionalRow;
}) {
  const materialsNet = roundCurrency(materials.reduce((s, m) => s + m.total, 0));
  const materialsMarkup = roundCurrency((materialsNet * settings.materialsMarkupPercent) / 100);
  const materialsTotal = roundCurrency(materialsNet + materialsMarkup);

  const labourSubtotal = roundCurrency(labour.reduce((s, t) => s + t.total, 0));
  const totalHours = labour.reduce((s, t) => s + t.hours, 0);

  // Job-level overheads
  const travel = settings.perJobOverhead;
  const wasteDisposal = roundCurrency(materialsNet * 0.02);
  const allocatedBusiness = roundCurrency(totalHours * 5);
  const overheadsTotal = roundCurrency(travel + wasteDisposal + allocatedBusiness);

  // Regional multiplier on the priced base (materials_total + labour + overheads)
  const preRegional = materialsTotal + labourSubtotal + overheadsTotal;
  const breakEven = roundCurrency(preRegional * region.multiplier);

  // Quote tiers driven by user-configured margin policy.
  // Floor enforcement: clamp each tier's effective margin to >= min and
  // <= 89% (anything 90%+ is the divide-by-zero edge). Belt-and-braces;
  // the DB CHECK already enforces min <= target <= max, but data can
  // drift if migrations skip the constraint, so we never trust it.
  const clampMargin = (m: number) => Math.max(0, Math.min(89, m));
  const safeMin = clampMargin(settings.minMarginPercent);
  const safeTarget = clampMargin(Math.max(settings.targetMarginPercent, settings.minMarginPercent));
  const safePremium = clampMargin(Math.max(settings.maxMarginPercent, safeTarget));

  const tierPrice = (marginPct: number) => roundCurrency(breakEven / (1 - marginPct / 100));
  const tierMin = tierPrice(safeMin);
  const tierTarget = tierPrice(safeTarget);
  const tierPremium = tierPrice(safePremium);

  // If the user's recommended margin would price below break-even (data
  // corruption / negative margin), force the quote up to the min tier
  // and flag it on the result for the UI to surface.
  const marginFloorEngaged = settings.targetMarginPercent < settings.minMarginPercent;
  const recommendedAmount = marginFloorEngaged ? tierMin : tierTarget;
  const subtotal = recommendedAmount;
  const vat = settings.vatRegistered ? roundCurrency(subtotal * 0.2) : 0;
  const grandTotal = roundCurrency(subtotal + vat);

  return {
    materials,
    labour,
    materialsNet,
    materialsMarkupPercent: settings.materialsMarkupPercent,
    materialsTotal,
    labourSubtotal,
    totalHours,
    region,
    overheads: {
      travel,
      permitsAndFees: 0,
      wasteDisposal,
      allocatedBusinessOverheads: allocatedBusiness,
      total: overheadsTotal,
    },
    overheadSummary: {
      travel,
      wasteDisposal,
      allocatedBusiness,
      total: overheadsTotal,
      regionMultiplier: region.multiplier,
      regionLabel: region.label,
    },
    breakEvenPoint: breakEven,
    tiers: {
      minimum: { price: tierMin, marginPercent: settings.minMarginPercent },
      target: { price: tierTarget, marginPercent: settings.targetMarginPercent },
      premium: { price: tierPremium, marginPercent: settings.maxMarginPercent },
    },
    recommendedTier: marginFloorEngaged ? 'minimum' : ('target' as const),
    recommendedAmount,
    marginFloorEngaged,
    summary: {
      materialsSubtotal: materialsTotal,
      labourSubtotal,
      subtotal,
      vat,
      grandTotal,
    },
    settings,
  };
}

/* ─── Stage B: AI annotation ────────────────────────────────────────── */

interface Annotations {
  complexity: { rating: number; label: string; factors: string[]; reasoning: string };
  risks: Array<{
    title: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    likelihood: 'low' | 'medium' | 'high';
    mitigation: string;
    contingencyPercent: number;
  }>;
  upsells: Array<{
    opportunity: string;
    price: number;
    winRate: number;
    isHot: boolean;
    timing: string;
    script: string;
  }>;
  paymentTerms: {
    depositPercent: number;
    depositAmount: number;
    balanceAmount: number;
    terms: string;
  };
  pipeline: Array<{
    opportunity: string;
    description: string;
    timeframe: string;
    estimatedValue: number;
    priority: string;
  }>;
  valueEngineering: string[];
  complianceFlags: Array<{ regulationRef: string; message: string }>;
  narrative: string;
  confidence: { materialsLevel: number; labourLevel: number };
}

async function runAnnotationAI(args: {
  query: string;
  projectContext: any;
  skeleton: ReturnType<typeof applyDeterministicMath>;
  facets: BS7671Facet[];
  ingested: IngestedAttachments;
  deals: MarketplaceDeal[];
  coupons: MarketplaceCoupon[];
  settings: BusinessSettings;
}): Promise<Annotations> {
  const { query, projectContext, skeleton, facets, ingested, deals, coupons, settings } = args;

  const fallback: Annotations = {
    complexity: { rating: 5, label: 'Moderate', factors: [], reasoning: '' },
    risks: [],
    upsells: [],
    paymentTerms: {
      depositPercent: 30,
      depositAmount: roundCurrency(skeleton.summary.grandTotal * 0.3),
      balanceAmount: roundCurrency(skeleton.summary.grandTotal * 0.7),
      terms: '30% deposit before work starts, balance on completion',
    },
    pipeline: [],
    valueEngineering: [],
    complianceFlags: [],
    narrative: '',
    confidence: { materialsLevel: 75, labourLevel: 70 },
  };

  if (!OPENAI_API_KEY) return fallback;

  const system = `You are a UK electrical estimator's annotation layer for the Cost Engineer.

Your responsibilities (in priority order):
1. Compliance — flag every relevant BS 7671:2018+A4:2026 obligation, citing only the regulation_refs provided in the facets block.
2. Risk — identify 3-7 realistic risks specific to THIS job (not generic templates).
3. Upsells — propose 3-5 commercially sensible add-ons the electrician could offer the client. EVERY upsell MUST include a realistic UK trade price.
4. Payment terms — match deposit/balance to the recommended quote amount.
5. Pipeline — 1-3 follow-up opportunities (return visits, future projects suggested by the brief).
6. Value engineering — 2-4 cost-reduction options for the client.
7. Narrative — a clear 2-3 sentence summary the electrician can read aloud to the client.

Pricing rules:
- DO NOT modify the quote skeleton. Pricing is locked from the marketplace.
- For UPSELLS specifically, use realistic UK trade prices (you may also reference the live marketplace deals/coupons supplied below). Examples of typical upsell pricing:
  · Type 2 SPD added to consumer unit: £150–220 fitted
  · Upgrade circuit to RCBO from MCB: £25–45 per circuit fitted
  · USB-A/C combo socket vs standard: +£18–28 per outlet fitted
  · Outdoor IP66 socket: £75–120 fitted
  · Smart thermostat install: £180–280 fitted
  · Whole-house surge protection package: £350–500 fitted
  · CO/smoke alarm interlinked Grade D2: £80–120 per alarm fitted
  · EICR for typical 3-bed: £180–280
  · Tesla/Zappi EV charger: £900–1,400 fitted (excl unit if customer-supplied)
- NEVER return price: 0 for an upsell. Pick a realistic mid-point in the range above. If the upsell is genuinely free (e.g. a repositioning during fitting), call it £0 explicitly and say so in the script.

Output rules:
- Output strictly valid JSON matching the schema below. No markdown, no commentary outside JSON.
- UK English (metre, colour, earthing, mains, tradesperson).
- Be specific to the job. Generic "always recommend RCD" advice without context is unhelpful.

Compliance flag rules:
- regulationRef is internal-only audit metadata — must come from the BS 7671 facets block (cite-or-die for integrity). Never invent a reg number.
- message is shown to the user. State the requirement DIRECTLY as plain English advice. Do NOT prefix with "Per Reg X.X", "According to BS 7671", "OSG states", or any source attribution. The user sees outcomes, not citations.
  ✗ Bad: "Per Reg 411.3.3, all socket circuits up to 32A in domestic premises must have AFDD protection."
  ✓ Good: "Socket circuits up to 32A in this domestic property need AFDD protection."`;

  const userPrompt = `BRIEFING
"""
${query.slice(0, 2500)}
"""

PROJECT CONTEXT
${JSON.stringify(projectContext ?? {}, null, 2).slice(0, 800)}

PRICED SKELETON (locked — do not modify)
- Materials net: £${skeleton.materialsNet}, total: £${skeleton.materialsTotal}
- Labour: ${skeleton.totalHours.toFixed(1)} hours @ £${settings.labourRateElectrician}/hr = £${skeleton.labourSubtotal}
- Overheads: £${skeleton.overheads.total}
- Region: ${skeleton.region.label} (×${skeleton.region.multiplier})
- Break-even: £${skeleton.breakEvenPoint}
- Recommended quote: £${skeleton.recommendedAmount} (target margin ${skeleton.tiers.target.marginPercent}%)

LINE ITEMS (${skeleton.materials.length} total${skeleton.materials.length > 50 ? ', showing first 50' : ''})
${skeleton.materials
  .slice(0, 50)
  .map((m, i) => `${i + 1}. ${m.description} × ${m.quantity} ${m.unit} — £${m.total} from ${m.supplier}`)
  .join('\n')}

LABOUR TASKS (${skeleton.labour.length} total${skeleton.labour.length > 25 ? ', showing first 25' : ''})
${skeleton.labour
  .slice(0, 25)
  .map((t, i) => `${i + 1}. ${t.description} — ${t.hours}h × £${t.rate} = £${t.total} [${t.phase}]`)
  .join('\n')}

BS 7671 FACETS (cite these regulation refs in compliance flags; do not invent others)
${formatFacetsForPrompt(facets)}

ATTACHMENT EXTRACT
${ingested.textBlocks.slice(0, 4).join('\n').slice(0, 2000) || '[none]'}

LIVE MARKETPLACE DEALS (you may suggest as upsells / value engineering)
${deals.map((d, i) => `${i + 1}. ${d.productName} — ${d.discountPercentage}% off at ${d.supplier}`).join('\n') || '[none]'}

LIVE COUPON CODES (mention in narrative if relevant)
${coupons.map((c) => `- ${c.code} (${c.supplier}): ${c.description ?? c.discountType}`).join('\n') || '[none]'}

OUTPUT
Return JSON of shape:
{
  "complexity": { "rating": 1-10, "label": "Low|Moderate|High|Very High", "factors": [string], "reasoning": string },
  "risks": [{ "title": string, "severity": "low|medium|high|critical", "likelihood": "low|medium|high", "mitigation": string, "contingencyPercent": 0-15 }],
  "upsells": [{ "opportunity": string, "price": number, "winRate": 0-100, "isHot": boolean, "timing": string, "script": string }],
  "paymentTerms": { "depositPercent": number, "depositAmount": number, "balanceAmount": number, "terms": string },
  "pipeline": [{ "opportunity": string, "description": string, "timeframe": string, "estimatedValue": number, "priority": "low|medium|high" }],
  "valueEngineering": [string],
  "complianceFlags": [{ "regulationRef": string, "message": string }],
  "narrative": string,
  "confidence": { "materialsLevel": 0-100, "labourLevel": 0-100 }
}

For complianceFlags, only include facets whose regulation_ref appears in the provided BS 7671 facets above.

REMINDERS:
- Every upsell MUST have a realistic non-zero price unless explicitly free.
- Risks must be specific to THIS job (mention property type, cable age, access, certs).
- Narrative is 2–3 sentences max — talk to the client, not about them.
- valueEngineering items are concrete swaps that save the client money (e.g. "Customer-supplied LED downlights would save £85 on materials" or "Phase work over two visits to spread VAT").`;

  // Multimodal user message if we have image attachments.
  const userMessage =
    ingested.imageBlocks.length > 0
      ? { role: 'user' as const, content: [{ type: 'text', text: userPrompt }, ...ingested.imageBlocks] }
      : { role: 'user' as const, content: userPrompt };

  const resp = await openaiChat(
    {
      model: MODEL,
      messages: [{ role: 'system', content: system }, userMessage],
      response_format: { type: 'json_object' },
      max_completion_tokens: 16000,
    },
    120_000
  );
  if (!resp.ok) {
    console.error('[cost-engineer] annotation call failed:', resp.status);
    return fallback;
  }

  try {
    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return fallback;
    const parsed = JSON.parse(content);
    return { ...fallback, ...parsed };
  } catch (err) {
    console.error('[cost-engineer] annotation parse failed:', err);
    return fallback;
  }
}

/**
 * Backstop pass: if the AI returned upsells with price 0, look them up
 * in the marketplace and back-fill with material + a typical fitting
 * markup. Better than showing the user £0 next to a real opportunity.
 */
async function backfillUpsellPrices(
  supabase: any,
  upsells: Annotations['upsells']
): Promise<Annotations['upsells']> {
  if (!upsells || upsells.length === 0) return upsells;

  const { cheapestForItem } = await import('./marketplace-pricing.ts');

  return Promise.all(
    upsells.map(async (u) => {
      if (u.price && u.price > 0) return u;
      try {
        const m = await cheapestForItem(supabase, { query: u.opportunity });
        if (m?.unitPrice) {
          // Materials cost + 30 min labour at £50 + ~25% margin.
          // Crude but better than zero — and only fires when the AI
          // forgot to set a price.
          return { ...u, price: Math.round((m.unitPrice + 25) * 1.25) };
        }
      } catch {
        // Keep the zero — the UI handles it.
      }
      return u;
    })
  );
}

/* ─── Final assembly ────────────────────────────────────────────────── */

function assembleOutput(args: {
  query: string;
  skeleton: ReturnType<typeof applyDeterministicMath>;
  annotations: Annotations;
  facets: BS7671Facet[];
  deals: MarketplaceDeal[];
  coupons: MarketplaceCoupon[];
  attachmentErrors: IngestedAttachments['errors'];
  floorplan: FloorplanReading | null;
}) {
  const { query, skeleton, annotations, facets, deals, coupons, attachmentErrors, floorplan } = args;

  return {
    originalQuery: query,
    response: annotations.narrative,
    structuredData: {
      summary: skeleton.summary,
      materials: {
        items: skeleton.materials,
        subtotal: skeleton.materialsNet,
        markup: skeleton.materialsMarkupPercent,
      },
      labour: {
        tasks: skeleton.labour,
        subtotal: skeleton.labourSubtotal,
        totalHours: skeleton.totalHours,
      },
      profitabilityAnalysis: {
        breakEvenPoint: skeleton.breakEvenPoint,
        jobOverheads: skeleton.overheads,
        quoteTiers: skeleton.tiers,
      },
      recommendedQuote: {
        tier: skeleton.recommendedTier,
        amount: skeleton.recommendedAmount,
        marginFloorEngaged: skeleton.marginFloorEngaged,
      },
      region: { key: skeleton.region.regionKey, label: skeleton.region.label, multiplier: skeleton.region.multiplier },
      complexity: annotations.complexity,
      riskAssessment: { risks: annotations.risks },
      upsells: annotations.upsells,
      paymentTerms: annotations.paymentTerms,
      pipeline: annotations.pipeline,
      valueEngineering: annotations.valueEngineering,
      complianceFlags: annotations.complianceFlags,
      bs7671Facets: facets.map((f) => ({
        regNumber: f.regNumber,
        primaryTopic: f.primaryTopic,
        documentType: f.documentType,
        retrievalSource: f.retrievalSource,
      })),
      liveDeals: deals,
      liveCoupons: coupons,
      confidence: {
        // Materials confidence is now grounded in real match data: out
        // of N items the AI extracted, how many got a marketplace_products
        // hit vs fell back to "Unmatched / review"? More matches = higher
        // confidence. Shown as a single chip in the UI.
        materials: {
          level: computeMaterialsConfidence(skeleton.materials),
          matched: skeleton.materials.filter(
            (m) => (m.source as any)?.table === 'marketplace_products'
          ).length,
          total: skeleton.materials.length,
        },
        // Labour confidence still comes from the AI — it knows when its
        // benchmarks were thin.
        labour: { level: annotations.confidence.labourLevel },
        contingency: { percentage: 5 },
      },
      attachmentErrors,
      floorplan: floorplan?.hasUsableDrawing ? floorplan : null,
      response: annotations.narrative,
    },
  };
}

/* ─── Helpers ───────────────────────────────────────────────────────── */

function facetQuery(query: string, candidates: ItemCandidate[]): string {
  const items = candidates
    .slice(0, 6)
    .map((c) => c.category ?? c.description)
    .join(', ');
  return `${query.slice(0, 200)} — items: ${items}`;
}

async function writePartial(supabase: any, jobId: string, stage: string, payload: any): Promise<void> {
  const { error } = await supabase
    .from('cost_engineer_partials')
    .upsert({ job_id: jobId, stage, payload, created_at: new Date().toISOString() }, { onConflict: 'job_id,stage' });
  if (error) console.warn(`[cost-engineer] writePartial(${stage}) failed:`, error.message);
}

async function updateProgress(
  supabase: any,
  jobId: string,
  patch: Record<string, any>
): Promise<void> {
  const { error } = await supabase.from('cost_engineer_jobs').update(patch).eq('id', jobId);
  if (error) console.warn('[cost-engineer] updateProgress failed:', error.message);
}

/**
 * Lightweight cancellation check. The cancel-cost-engineer-job function
 * sets status='cancelled' on the row; this poll catches that between
 * stages so the worker can bail without overwriting the user's
 * cancelled state with 'complete'. Cheap (single-row PK lookup).
 */
async function isCancelled(supabase: any, jobId: string): Promise<boolean> {
  const { data } = await supabase
    .from('cost_engineer_jobs')
    .select('status')
    .eq('id', jobId)
    .maybeSingle();
  if (data?.status === 'cancelled') {
    console.log(`[cost-engineer] ⏹ job ${jobId} cancelled — stopping worker.`);
    return true;
  }
  return false;
}

async function failJob(supabase: any, jobId: string, message: string): Promise<void> {
  await supabase
    .from('cost_engineer_jobs')
    .update({
      status: 'failed',
      error_message: message,
      completed_at: new Date().toISOString(),
    })
    .eq('id', jobId);
}

function roundCurrency(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

const VALID_PHASES = ['first-fix', 'second-fix', 'test-and-cert'] as const;
type Phase = (typeof VALID_PHASES)[number];

function validPhase(v: unknown): Phase | undefined {
  return typeof v === 'string' && (VALID_PHASES as readonly string[]).includes(v)
    ? (v as Phase)
    : undefined;
}

/**
 * Catch labour tasks the AI may have miscategorised as material. If the
 * description starts with a verb ("Install ...", "Fit ...", "Site survey
 * ..."), it's labour. Used as a backstop when the AI omits the kind
 * field or sets it wrong — without this we get £8K cable drums priced
 * for "Install 34m of cable" rows.
 */
const VERB_PREFIXES = [
  'install',
  'fit',
  'mount',
  'wire',
  'connect',
  'remove',
  'replace',
  'commission',
  'isolate',
  'label',
  'route',
  'set out',
  'check',
  'test',
  'site survey',
  'survey',
  'first fix',
  'first-fix',
  'second fix',
  'second-fix',
  'drill',
  'fish',
  'clip',
  'dress',
  'terminate',
  'functional',
  'insulation',
  'continuity',
  'polarity',
  'part p notification',
  'add',
  'fit ',
  'fitting',
  'repair',
];
function isVerbLedDescription(s: string): boolean {
  const lower = s.trim().toLowerCase();
  return VERB_PREFIXES.some((v) => lower.startsWith(v));
}

/** Best-guess phase from labour task description when AI didn't supply one. */
function inferPhase(labourTask: string | undefined, description: string): Phase {
  const t = `${labourTask ?? ''} ${description}`.toLowerCase();
  if (
    /\b(test|cert|eic|eicr|part\s*p|commission|handover|inspect)/.test(t)
  ) {
    return 'test-and-cert';
  }
  if (
    /\b(chase|drill|fish|first[- ]?fix|run\s+cable|back\s+box|cable\s+routing|carcass|joist)/.test(t)
  ) {
    return 'first-fix';
  }
  // Default to second-fix — the most common labour bucket.
  return 'second-fix';
}

/**
 * Materials confidence — penalised harder than a flat ratio because an
 * unmatched line is qualitatively worse than a matched-but-low-relevance
 * line: we know the price is missing entirely. Each unmatched item
 * costs ~12 points on top of the natural ratio drop, so a single
 * unmatched in 10 takes us from 100% to ~78% (not 90%).
 *
 * Bounded [0, 100]. Empty list returns 100 (nothing to be unsure of).
 */
function computeMaterialsConfidence(materials: PricedMaterial[]): number {
  if (materials.length === 0) return 100;
  const total = materials.length;
  const matched = materials.filter(
    (m) => (m.source as any)?.table === 'marketplace_products'
  ).length;
  const unmatched = total - matched;
  const baseRatio = (matched / total) * 100;
  const unmatchedPenalty = Math.min(unmatched * 12, 60);
  return Math.max(0, Math.min(100, Math.round(baseRatio - unmatchedPenalty)));
}

const roundHours = roundCurrency;

/**
 * Title-case a phrase, leaving short prepositions/articles lowercase
 * unless they're the first word. Used for labour task descriptions and
 * any other AI-emitted heading copy that arrives in lowercase.
 */
const SMALL_WORDS = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'but',
  'by',
  'for',
  'in',
  'of',
  'on',
  'or',
  'the',
  'to',
  'with',
]);
/** UK electrical acronyms to preserve in uppercase even after title-casing. */
const ACRONYMS = new Set([
  'RCD',
  'RCBO',
  'MCB',
  'AFDD',
  'SPD',
  'LED',
  'PIR',
  'EICR',
  'EIC',
  'PAT',
  'EV',
  'CU',
  'MCCB',
  'DP',
  'SP',
  'TPN',
  'BS',
  'SWA',
  'IP',
  'HMO',
  'CO',
  'USB',
  'CAT5',
  'CAT6',
  'TV',
  'UV',
  'AC',
  'DC',
  'OCPD',
  'PEN',
  'PME',
]);

function toTitleCase(s: string): string {
  return s
    .toLowerCase()
    .split(/(\s+)/)
    .map((token, i) => {
      if (/^\s+$/.test(token)) return token;
      if (i > 0 && SMALL_WORDS.has(token)) return token;
      // Reinstate known acronyms (since we lowercased first).
      const upper = token.toUpperCase();
      if (ACRONYMS.has(upper)) return upper;
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join('');
}

/**
 * Wrapper around OpenAI chat completions with an AbortController-based
 * timeout. Without this an upstream stall hangs the whole worker until
 * the edge runtime kills the request — which means the user sees the
 * stage indicator stuck on "Live" forever instead of a clean failure.
 */
async function openaiChat(body: Record<string, unknown>, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      console.error(`[cost-engineer] OpenAI call aborted after ${timeoutMs}ms`);
    }
    // Return a synthetic non-ok Response so callers can use their existing
    // fallback paths without special-casing fetch failure.
    return new Response(JSON.stringify({ error: err?.message ?? 'openai_failure' }), { status: 599 });
  } finally {
    clearTimeout(timer);
  }
}
