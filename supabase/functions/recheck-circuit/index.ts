/**
 * recheck-circuit — single-circuit AI recheck with three modes.
 *
 *   recheck       · re-design this circuit from scratch with current inputs
 *                   (cable size / type / length, protection, install method).
 *                   Returns ONE redesign with a fresh rationale.
 *
 *   alternatives  · return 2-3 alternative designs that hit the same load
 *                   safely but with different cable/protection/topology
 *                   trade-offs (e.g. smaller cable + Type C, larger cable +
 *                   cheaper MCB, RCBO vs MCB+RCD). User picks one to apply.
 *
 *   make-pass     · circuit currently fails compliance — find a non-obvious
 *                   route to PASS using any legitimate BS 7671 path:
 *                   cable upsize, CPC upsize, parallel earth, curve relax,
 *                   protection downsize, redistribute load. Returns ONE design.
 *
 * Auth: Supabase JWT.
 * Model: gpt-5.4-mini-2026-03-17 with structured tool output.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Max-Age': '86400',
};

type Mode = 'recheck' | 'alternatives' | 'make-pass';

interface RecheckRequest {
  mode: Mode;
  /** Current circuit state (with any user edits applied + derived calcs). */
  circuit: any;
  /** Supply context — voltage, phases, Ze, earthingSystem, mainSwitchRating. */
  supply: any;
  /** Installation type — domestic / commercial / industrial. Drives diversity + load assumptions. */
  installType?: string;
  /** Board Zdb (Ω) when this circuit is on a submain. Frontend computes. */
  boardZdb?: number;
  /** Optional user note — "I want this on a smaller cable", "needs to handle EV charging" etc. */
  reason?: string;
}

const SHARED_SYSTEM_PROMPT = `You are a UK BS 7671:2018+A4:2026 electrical circuit designer. You're being asked to look at ONE circuit at a time, with the supply context provided. Apply Appendix 4 cable tables, Table 41.3/41.4 max-Zs, Section 314.1 dispersal, Section 443.4 SPD assessment, Section 411.4.5 Open-PEN where relevant.

Critical rules:
- UK English (metre, colour, centre).
- Cite BS 7671 regulation numbers and table references directly. Never mention "RAG".
- Cable sizes from Appendix 4 (1.0 / 1.5 / 2.5 / 4 / 6 / 10 / 16 / 25 / 35 / 50 / 70 / 95 / 120 mm²).
- CPC sizing per Table 54.7 (T&E typically half live; SWA armour or equal-size copper).
- Protection: MCB Type B/C/D, RCBO, MCCB, BS88. RCBO Type A or B for EV / heat pump per A4:2026.
- Phase-to-earth fault loop Zs = Ze + R1 + R2 (or Zdb + R1+R2 if on a submain — chain is provided in input).
- Vd ≤ 5% for general circuits, 3% for lighting (BS 7671 Section A1).
- For socket rings use 2.5 mm² T&E + 32 A RCBO with ring topology.
- For showers use 10 mm² T&E + 40 A or 45 A RCBO, bathroom special location 701.

Output the design via the provided tool — never as prose.`;

const MODE_PROMPTS: Record<Mode, { user: string; tool: any }> = {
  recheck: {
    user: `Re-design this single circuit from scratch.

Look at the load (loadType, loadPower), the supply (voltage, phases, Ze), the cable run (length, install method), and any special location flags. Pick the right cable size, CPC size, cable type, protection device + rating + curve, and verify Iz / Vd / Zs comply. Return your design with a clear rationale citing BS 7671 regs and tables.

If the user has supplied a "reason" string, take that into account.

Use the redesign_circuit tool to return your design.`,
    tool: {
      type: 'function',
      function: {
        name: 'redesign_circuit',
        description: 'Return a freshly redesigned single circuit with rationale.',
        parameters: {
          type: 'object',
          properties: {
            cableSize: { type: 'number' },
            cpcSize: { type: 'number' },
            cableType: { type: 'string' },
            cableLength: { type: 'number' },
            protectionDevice: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['MCB', 'RCBO', 'MCCB', 'BS88', 'RCD', 'BS1361', 'BS3036'],
                },
                rating: { type: 'number' },
                curve: { type: 'string', enum: ['B', 'C', 'D', 'gG', 'aM'] },
                kaRating: { type: 'number' },
                rcdRating: { type: 'number' },
              },
              required: ['type', 'rating'],
            },
            installationMethod: { type: 'string' },
            calculations: {
              type: 'object',
              properties: {
                Ib: { type: 'number' },
                Iz: { type: 'number' },
                In: { type: 'number' },
                voltageDrop: {
                  type: 'object',
                  properties: {
                    volts: { type: 'number' },
                    percent: { type: 'number' },
                    limit: { type: 'number' },
                    compliant: { type: 'boolean' },
                  },
                },
                zs: { type: 'number' },
                maxZs: { type: 'number' },
                zsCompliant: { type: 'boolean' },
              },
            },
            rationale: {
              type: 'string',
              description:
                'One paragraph explaining the cable + protection choice and citing BS 7671 regulations / tables.',
            },
            regulation_refs: {
              type: 'array',
              items: { type: 'string' },
              description: 'BS 7671 regulation numbers and table references applied.',
            },
          },
          required: ['cableSize', 'protectionDevice', 'rationale'],
        },
      },
    },
  },

  alternatives: {
    user: `Provide 2-3 ALTERNATIVE viable designs for this single circuit. Each alternative should be technically compliant but with different trade-offs. Tailor your three options to the install type the user provided in the input:

DOMESTIC installations:
  - Option A — Cost-optimal: smallest compliant cable + lowest cost RCBO that meets 41.3 disconnection times.
  - Option B — Future-proof: one size up on cable, generous protection, room for an EV charger or heat pump add-on.
  - Option C — A4:2026-aware: AFDD where the load type warrants it, Type A/B RCBO for EV / heat pump, longer service life.

COMMERCIAL installations:
  - Option A — Cost-optimal: smallest compliant cable + standard MCB / RCBO that meets 41.3.
  - Option B — Resilient: oversized for redundancy + reduced thermal stress on long-running circuits, MCCB at submain rather than MCB if applicable.
  - Option C — Compliance-loaded: BS 5266 / 5839 / 60898-aware. Type B/C MCB or RCBO depending on load, FP200 / LSZH where escape routes / public spaces demand it.

INDUSTRIAL installations:
  - Option A — Cost-optimal: SWA Cu sized to Iz + protection rating, Type C for routine motor inrush.
  - Option B — High-availability: parallel cables / MCCB selectivity, Type D MCB for heavy starting transients, oversized cpc for parallel earth.
  - Option C — Specialist: variable-frequency-drive considerations, soft-start where I_st > 10×In, harmonics filtering, Section 706 conducting-locations protection.

For each alternative, state the rationale (with BS 7671 reg cites), the trade-off (what the user gains and gives up) and full design specs.

Use the alternatives_circuit tool.`,
    tool: {
      type: 'function',
      function: {
        name: 'alternatives_circuit',
        description: 'Return 2-3 alternative designs with rationale + trade-off.',
        parameters: {
          type: 'object',
          properties: {
            alternatives: {
              type: 'array',
              minItems: 2,
              maxItems: 3,
              items: {
                type: 'object',
                properties: {
                  label: {
                    type: 'string',
                    description:
                      'Short headline e.g. "Cost-optimal", "Future-proof", "Type C for inrush".',
                  },
                  rationale: {
                    type: 'string',
                    description:
                      'Why this option works — cite BS 7671 regs / tables.',
                  },
                  tradeOff: {
                    type: 'string',
                    description:
                      'What the user gives up to gain — e.g. "lower cost but no headroom for future loads".',
                  },
                  cableSize: { type: 'number' },
                  cpcSize: { type: 'number' },
                  cableType: { type: 'string' },
                  cableLength: { type: 'number' },
                  protectionDevice: {
                    type: 'object',
                    properties: {
                      type: { type: 'string' },
                      rating: { type: 'number' },
                      curve: { type: 'string' },
                      kaRating: { type: 'number' },
                      rcdRating: { type: 'number' },
                    },
                  },
                  calculations: {
                    type: 'object',
                    properties: {
                      Iz: { type: 'number' },
                      voltageDrop: {
                        type: 'object',
                        properties: {
                          percent: { type: 'number' },
                          compliant: { type: 'boolean' },
                        },
                      },
                      zs: { type: 'number' },
                      maxZs: { type: 'number' },
                      zsCompliant: { type: 'boolean' },
                    },
                  },
                  regulation_refs: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
                required: ['label', 'rationale', 'tradeOff', 'cableSize', 'protectionDevice'],
              },
            },
          },
          required: ['alternatives'],
        },
      },
    },
  },

  'make-pass': {
    user: `This circuit currently FAILS compliance. Find a route to PASS using any legitimate BS 7671 compliant path. Try in order:

  1. Upsize CPC (lowers R2 directly, which lowers Zs).
  2. Upsize cable (lowers R1+R2, also helps Vd and Iz headroom).
  3. Relax MCB curve (B → C → D allows higher Zs but may affect inrush handling).
  4. Downsize protection rating (only if Ib still fits below the new In).
  5. Suggest a parallel earth conductor (Reg 543.1.3) if a single CPC change isn't enough.
  6. Suggest splitting the circuit (radial → two radials) if length is the issue.

Return the redesigned circuit + a clear rationale of WHICH path you took and why. If nothing legitimate works (genuinely impossible), return a redesign with .compliance_pass = false and explain why the user must change the supply / route / location.

Use the redesign_circuit tool.`,
    tool: {
      type: 'function',
      function: {
        name: 'redesign_circuit',
        description: 'Return a redesign engineered to bring the circuit into compliance.',
        parameters: {
          type: 'object',
          properties: {
            cableSize: { type: 'number' },
            cpcSize: { type: 'number' },
            cableType: { type: 'string' },
            cableLength: { type: 'number' },
            protectionDevice: {
              type: 'object',
              properties: {
                type: { type: 'string' },
                rating: { type: 'number' },
                curve: { type: 'string' },
                kaRating: { type: 'number' },
                rcdRating: { type: 'number' },
              },
              required: ['type', 'rating'],
            },
            installationMethod: { type: 'string' },
            calculations: {
              type: 'object',
              properties: {
                Iz: { type: 'number' },
                voltageDrop: {
                  type: 'object',
                  properties: {
                    percent: { type: 'number' },
                    compliant: { type: 'boolean' },
                  },
                },
                zs: { type: 'number' },
                maxZs: { type: 'number' },
                zsCompliant: { type: 'boolean' },
              },
            },
            compliance_pass: { type: 'boolean' },
            additionalAction: {
              type: 'string',
              description:
                'If a parallel earth, redistribute, supplementary bonding etc. is needed beyond the cable/protection redesign, describe it here. Empty if no extra action.',
            },
            rationale: {
              type: 'string',
              description: 'Which path was taken to bring the circuit into compliance, with reg cites.',
            },
            regulation_refs: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          required: ['cableSize', 'protectionDevice', 'rationale'],
        },
      },
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'No authorization header' }, 401);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) return json({ error: 'Unauthorized' }, 401);

    const body = (await req.json().catch(() => ({}))) as RecheckRequest;
    const { mode, circuit, supply, installType, boardZdb, reason } = body;

    if (!mode || !MODE_PROMPTS[mode]) return json({ error: `Unknown mode: ${mode}` }, 400);
    if (!circuit) return json({ error: 'circuit is required' }, 400);

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) return json({ error: 'OPENAI_API_KEY not configured' }, 500);

    const promptDef = MODE_PROMPTS[mode];

    // Bundle the input the AI needs to make a real decision.
    const userInput = {
      mode,
      circuit: {
        name: circuit?.name,
        loadType: circuit?.loadType,
        loadPower: circuit?.loadPower,
        phases: circuit?.phases,
        voltage: circuit?.voltage ?? supply?.voltage ?? 230,
        cableLength: circuit?.cableLength,
        cableSize: circuit?.cableSize,
        cpcSize: circuit?.cpcSize,
        cableType: circuit?.cableType,
        installMethod: circuit?.installMethod ?? circuit?.installationMethod,
        circuitTopology: circuit?.circuitTopology,
        specialLocation: circuit?.specialLocation,
        protectionDevice: circuit?.protectionDevice,
        calculations: circuit?.calculations,
      },
      supply: {
        voltage: supply?.voltage ?? 230,
        phases: supply?.phases ?? 'single',
        ze: supply?.ze ?? supply?.Ze ?? 0.35,
        earthingSystem: supply?.earthingSystem ?? 'TN-C-S',
        mainSwitchRating: supply?.mainSwitchRating,
      },
      installType: installType ?? 'domestic',
      boardZdb: boardZdb ?? null,
      userReason: reason ?? null,
    };

    const startedAt = Date.now();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5.4-mini-2026-03-17',
        messages: [
          { role: 'system', content: SHARED_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `${promptDef.user}\n\nInputs:\n${JSON.stringify(userInput, null, 2)}`,
          },
        ],
        tools: [promptDef.tool],
        tool_choice: { type: 'function', function: { name: promptDef.tool.function.name } },
        max_completion_tokens: 8000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[recheck-circuit] OpenAI error', response.status, errText);
      return json({ error: 'Recheck failed', detail: errText }, 502);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) return json({ error: 'No tool call', raw: data }, 502);

    let parsed: any;
    try {
      parsed = JSON.parse(toolCall.function.arguments || '{}');
    } catch (_e) {
      return json({ error: 'Failed to parse tool args', raw: toolCall.function.arguments }, 502);
    }

    return json(
      {
        mode,
        result: parsed,
        durationMs: Date.now() - startedAt,
        model: 'gpt-5.4-mini-2026-03-17',
        usage: data.usage ?? null,
      },
      200
    );
  } catch (err: any) {
    console.error('[recheck-circuit] Unexpected error', err);
    return json({ error: err?.message ?? 'Unknown error' }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
