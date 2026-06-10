// Renewable Design Suite — AI intake.
//
// The electrician describes the job in plain English; GPT proposes a structured
// design (technology + state for that designer), choosing kit ONLY from the
// catalogue the client sends (ids from the app's panel/inverter/charger
// databases — single source of truth stays in src/data). The deterministic
// design engine then verifies every number client-side, so the AI suggests and
// the engine proves. The AI never does compliance arithmetic.

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

// Per-user rate limit — in-memory, per instance (defence-in-depth on top of
// auth; the AI call is the expensive thing being protected).
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10 * 60_000;
const recentCalls = new Map<string, number[]>();
function rateLimited(userId: string): boolean {
  const now = Date.now();
  const calls = (recentCalls.get(userId) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (calls.length >= RATE_LIMIT) return true;
  calls.push(now);
  recentCalls.set(userId, calls);
  return false;
}

const MAX_BODY_BYTES = 120_000;

interface CatalogueItem {
  id: string;
  label: string; // "Make Model — key specs", compact one-liner
}

interface IntakeRequest {
  description: string;
  panels: CatalogueItem[];
  inverters: CatalogueItem[];
  chargers: CatalogueItem[];
}

const PROPOSAL_TOOL = {
  type: 'function',
  function: {
    name: 'propose_design',
    description:
      'Propose a renewable design for a UK electrician from their job description. Pick kit ONLY from the supplied catalogues by id.',
    parameters: {
      type: 'object',
      properties: {
        technology: {
          type: 'string',
          enum: ['solar', 'battery', 'ev', 'heat-pump'],
          description: 'The dominant technology in the job description.',
        },
        notes: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Short assumptions you made (max 4), e.g. "Assumed single-phase supply — not stated".',
        },
        solar: {
          type: 'object',
          properties: {
            panelId: { type: 'string', description: 'id from the panels catalogue' },
            inverterId: { type: 'string', description: 'id from the inverters catalogue' },
            targetKwp: { type: 'number' },
            dcRunM: { type: 'number', description: 'one-way DC run estimate, metres' },
            acRunM: { type: 'number' },
            batteryKw: { type: 'number', description: '0 if no battery mentioned' },
            dnoExportKw: { type: 'number', description: 'default 3.68 unless stated' },
            systemCost: { type: 'number', description: '0 unless a budget is stated' },
            specificYield: {
              type: 'number',
              description: 'kWh/kWp/yr — 920 north UK, 950 typical, 1000 south coast',
            },
          },
          required: ['panelId', 'inverterId', 'targetKwp'],
        },
        battery: {
          type: 'object',
          properties: {
            batteryMake: { type: 'string' },
            batteryModel: { type: 'string' },
            usableKwh: { type: 'number' },
            maxChargeKw: { type: 'number' },
            coupling: { type: 'string', enum: ['ac', 'dc-hybrid'] },
            inverterKw: { type: 'number' },
            dailyUsageKwh: { type: 'number' },
            pvInverterKw: { type: 'number', description: '0 if no co-located PV' },
            phases: { type: 'number', enum: [1, 3] },
          },
          required: ['usableKwh', 'inverterKw', 'coupling', 'dailyUsageKwh', 'phases'],
        },
        ev: {
          type: 'object',
          properties: {
            chargerId: { type: 'string', description: 'id from the chargers catalogue' },
            chargerKw: { type: 'number' },
            numChargers: { type: 'number' },
            diversityPct: { type: 'number' },
            spareKw: { type: 'number' },
            earthing: {
              type: 'string',
              enum: ['pme-od', 'matt-e', 'tt', ''],
              description: 'Only set when the description implies it; else empty string.',
            },
          },
          required: ['chargerId', 'chargerKw', 'numChargers'],
        },
        heatPump: {
          type: 'object',
          properties: {
            floorArea: { type: 'number' },
            heatLossFactor: {
              type: 'number',
              description: 'W/m² — ~40 new build, ~50 modern, ~65 older, 80+ solid wall',
            },
            dhwKw: { type: 'number' },
            scop: { type: 'number' },
            phases: { type: 'number', enum: [1, 3] },
          },
          required: ['floorArea', 'heatLossFactor'],
        },
      },
      required: ['technology', 'notes'],
    },
  },
};

const SYSTEM_PROMPT = `You are the design intake for Elec-Mate's Renewable Design Suite, used by UK electricians.

Read the job description and propose ONE design via the propose_design tool:
- Pick the dominant technology. A solar job that "might add a battery later" is solar (set batteryKw if a battery inverter is planned now).
- For solar: choose a panel and inverter FROM THE CATALOGUE ONLY, by id. Match the inverter to the target size (DC:AC ratio 1.1–1.3 is the sweet spot) and the stated phase. Prefer popular, current kit when the description doesn't constrain the choice.
- For EV: choose a charger from the catalogue by id. Domestic single point → 7.4 kW, 100% diversity.
- UK defaults when unstated: single-phase 230 V, DNO export 3.68 kW, specific yield 950 kWh/kWp, design temps are handled by the app.
- Never invent kit, prices, or regulations. Put every assumption in notes (max 4, short).
- Fill ONLY the object for the chosen technology.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // Auth — signed-in users only.
    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return json({ error: 'Not authenticated' }, 401);
    if (rateLimited(user.id)) {
      return json(
        { error: 'Steady on — a few designs a minute is plenty. Try again shortly.' },
        429
      );
    }

    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ error: 'Request too large.' }, 400);
    }
    const body = JSON.parse(raw) as IntakeRequest;
    const description = (body.description ?? '').trim();
    if (description.length < 10) {
      return json({ error: 'Describe the job in a sentence or two first.' }, 400);
    }
    if (description.length > 2000) {
      return json({ error: 'Keep the description under 2,000 characters.' }, 400);
    }

    // Cap item count AND field lengths — labels are user-supplied bytes that
    // go straight into the prompt.
    const catalogue = (items: CatalogueItem[] | undefined, cap: number) =>
      (items ?? [])
        .slice(0, cap)
        .map((i) => `${String(i.id).slice(0, 80)} :: ${String(i.label).slice(0, 160)}`)
        .join('\n');

    // Static catalogues FIRST, variable description LAST — keeps a stable
    // prompt prefix so OpenAI's automatic prompt caching engages.
    const userMessage = [
      `PANEL CATALOGUE (id :: spec):\n${catalogue(body.panels, 80)}`,
      `\nINVERTER CATALOGUE (id :: spec):\n${catalogue(body.inverters, 90)}`,
      `\nCHARGER CATALOGUE (id :: spec):\n${catalogue(body.chargers, 60)}`,
      `\nJOB DESCRIPTION:\n${description}`,
    ].join('\n');

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) throw new Error('OPENAI_API_KEY not set');

    const ai = await callOpenAI(
      {
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        model: 'gpt-5.4-mini-2026-03-17',
        tools: [PROPOSAL_TOOL],
        tool_choice: { type: 'function', function: { name: 'propose_design' } },
        // Reasoning tokens count against this budget on gpt-5.x — the tool
        // call itself is small, the headroom is for reasoning.
        max_tokens: 8000,
      },
      openAiKey,
      60000
    );

    const call = ai.toolCalls?.[0];
    if (!call?.function?.arguments) throw new Error('Model returned no proposal');
    const proposal = JSON.parse(call.function.arguments);

    // Sanitise model output before it leaves the function: technology must be
    // one of ours, notes are bounded display strings.
    if (!['solar', 'battery', 'ev', 'heat-pump'].includes(proposal.technology)) {
      return json(
        { error: 'Could not work out the technology — try describing the job differently.' },
        422
      );
    }
    proposal.notes = (Array.isArray(proposal.notes) ? proposal.notes : [])
      .slice(0, 4)
      .map((n: unknown) => String(n).slice(0, 200));

    // Guard: ids must exist in the supplied catalogues — the client treats a
    // missing id as "no pick", never a fabricated product.
    const panelIds = new Set((body.panels ?? []).map((p) => p.id));
    const inverterIds = new Set((body.inverters ?? []).map((p) => p.id));
    const chargerIds = new Set((body.chargers ?? []).map((p) => p.id));
    if (proposal.solar) {
      if (!panelIds.has(proposal.solar.panelId)) proposal.solar.panelId = null;
      if (!inverterIds.has(proposal.solar.inverterId)) proposal.solar.inverterId = null;
    }
    if (proposal.ev && !chargerIds.has(proposal.ev.chargerId)) proposal.ev.chargerId = null;

    return json({ proposal });
  } catch (err) {
    // Real detail goes to Sentry/logs; callers get a fixed message — provider
    // error bodies and internal strings must not leave the function.
    captureException(err, { functionName: 'renewable-design-intake' });
    console.error('[renewable-design-intake]', err);
    return json({ error: 'Could not propose a design — try again in a moment.' }, 500);
  }
});
