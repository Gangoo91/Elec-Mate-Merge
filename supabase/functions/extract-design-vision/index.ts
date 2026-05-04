/**
 * extract-design-vision — Phase 4c vision input.
 *
 * Single edge function, four extraction kinds:
 *   floor-plan   · spatial extraction → rooms with accessory counts + special locations
 *   bom          · bill of materials / quantities → itemised list
 *   schedule     · existing circuit schedule → circuit list with cable + protection + load
 *   photo        · site photo / enclosure / board → findings + observations
 *
 * The frontend uploads a base64-encoded image (or a PDF — vision API accepts
 * both) along with a `kind`. We pin a structured tool-call schema per kind so
 * the response is a clean JSON shape the wizard can drop straight into the
 * design pipeline. No prose, no markdown.
 *
 * Auth: Supabase JWT required.
 * Model: gpt-5.4-mini (vision-capable, cite-or-die compatible).
 * Cost: ~$0.01-0.03 per image (single call, structured output).
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

type ExtractionKind = 'floor-plan' | 'bom' | 'schedule' | 'photo' | 'scope';

interface ExtractRequestBody {
  kind: ExtractionKind;
  /** data URL (`data:image/...;base64,...`) OR raw base64 with `mimeType`. Required for image kinds. */
  fileBase64?: string;
  mimeType?: string;
  /** Free-text input — required for the 'scope' kind, ignored for image kinds. */
  text?: string;
  /** Optional context the user supplies (e.g. "this is a 1980s house, single-storey"). */
  contextHint?: string;
}

const PROMPTS: Record<ExtractionKind, { system: string; toolDescription: string; tool: any }> = {
  // ──────────────────────────────────────────────────────────────────────
  'floor-plan': {
    system: `You are a UK electrical estimator reading a floor plan. Identify every room, its approximate area in m², and accessories visible on the plan (sockets, switches, lighting points, cooker outlets, towel rails, etc.). Flag any room that's a special location per BS 7671 Section 7xx (bathroom 701, kitchen with sink, swimming pool 702, sauna 703, agricultural 705, medical 710).

CRITICAL — beyond accessories, identify:
1. The intake / cut-out / consumer-unit position if shown (or a sensible suggestion if not). Cable runs estimate from this point — without it the cost engineer guesses.
2. The number of floors / storeys covered by this plan.
3. For each room, an approximate cable run estimate (in metres) from the proposed CU to the room's centre — this is what makes downstream sizing honest.

Return ONLY via the extract_floor_plan tool — no prose.

Rules:
- One row per room. If you can't read a room name, label it by position ("front-left bedroom").
- Areas in m² (estimate from drawing scale; if no scale, infer from typical UK room sizes).
- accessory.count: how many of that kind are visible. If ambiguous, give your best estimate and set note="estimated".
- specialLocation values: 'bathroom' | 'kitchen' | 'swimming-pool' | 'sauna' | 'agricultural' | 'medical' | 'none'.
- cableRunEstimateM: straight-line + 25% routing factor (joists / partitions). Be realistic.
- Don't invent rooms not on the plan.
- UK English (metre, colour, centre).`,
    toolDescription:
      'Extract every room from a UK floor plan with accessory counts, special-location classification, CU position and per-room cable run estimates.',
    tool: {
      type: 'function',
      function: {
        name: 'extract_floor_plan',
        description:
          'Return rooms identified on the floor plan with their accessories, special-location classification, intake/CU position, floor count and per-room cable run estimates.',
        parameters: {
          type: 'object',
          properties: {
            buildingType: {
              type: 'string',
              description:
                'Best-guess building type: "house", "flat", "office", "shop", "industrial", "mixed", "other".',
            },
            floors: {
              type: 'integer',
              minimum: 1,
              description:
                'Number of storeys this plan covers (1 = single storey, 2 = ground+first, etc.). If unclear from a single sheet, return 1.',
            },
            totalAreaM2: {
              type: 'number',
              description: 'Sum of room areas in m².',
            },
            cuPosition: {
              type: 'object',
              description:
                'Intake / consumer-unit position. If not labelled on the plan, give the most sensible location (typically near the cut-out, hallway, or utility room).',
              properties: {
                roomName: {
                  type: 'string',
                  description: 'Room or zone the CU sits in (e.g. "Hallway", "Utility Room").',
                },
                inferred: {
                  type: 'boolean',
                  description: 'true if not actually shown on the plan, just a suggestion.',
                },
                note: { type: 'string' },
              },
              required: ['roomName'],
            },
            rooms: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Room name as labelled, or positional if unlabelled.',
                  },
                  areaM2: { type: 'number' },
                  floor: {
                    type: 'integer',
                    description:
                      'Storey number this room is on (0 = ground, 1 = first, -1 = basement). Optional.',
                  },
                  cableRunEstimateM: {
                    type: 'number',
                    description:
                      'Estimated cable run from the CU to this room\'s centre (metres) including 25% routing factor.',
                  },
                  specialLocation: {
                    type: 'string',
                    enum: [
                      'bathroom',
                      'kitchen',
                      'swimming-pool',
                      'sauna',
                      'agricultural',
                      'medical',
                      'none',
                    ],
                  },
                  accessories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        kind: {
                          type: 'string',
                          enum: [
                            'socket-single',
                            'socket-double',
                            'socket-usb',
                            'switch-1g',
                            'switch-2g',
                            'switch-dimmer',
                            'light-pendant',
                            'light-downlight',
                            'light-batten',
                            'light-external',
                            'cooker-outlet',
                            'cooker-switch',
                            'shower-isolator',
                            'fcu',
                            'towel-rail',
                            'tv-aerial',
                            'data-point',
                            'doorbell',
                            'smoke-detector',
                            'heat-detector',
                            'co-detector',
                            'ev-charger',
                            'extractor-fan',
                            'other',
                          ],
                        },
                        count: { type: 'integer', minimum: 0 },
                        note: { type: 'string' },
                      },
                      required: ['kind', 'count'],
                    },
                  },
                },
                required: ['name', 'specialLocation', 'accessories'],
              },
            },
            notes: {
              type: 'string',
              description:
                'Anything the estimator should know that isn\'t captured above (scale unclear, partial plan, unusual layouts, etc.).',
            },
          },
          required: ['rooms'],
        },
      },
    },
  },

  // ──────────────────────────────────────────────────────────────────────
  bom: {
    system: `You are a UK electrical estimator reading a bill of materials / quantities. Extract every line item with its description, quantity, and unit. Categorise each item against UK electrical wholesaler conventions (cables, accessories, protection, etc.).

Return ONLY via the extract_bom tool — no prose. UK English.`,
    toolDescription: 'Extract a bill of materials / quantities into structured line items.',
    tool: {
      type: 'function',
      function: {
        name: 'extract_bom',
        description: 'Return BoM line items.',
        parameters: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  description: { type: 'string' },
                  quantity: { type: 'number' },
                  unit: {
                    type: 'string',
                    enum: ['item', 'metre', 'm²', 'hour', 'circuit', 'point', 'roll', 'box'],
                  },
                  category: {
                    type: 'string',
                    enum: [
                      'cables',
                      'consumer-units',
                      'circuit-protection',
                      'wiring-accessories',
                      'lighting',
                      'containment',
                      'earthing',
                      'fire-security',
                      'ev-charging',
                      'data-networking',
                      'fixings',
                      'hvac',
                      'other',
                    ],
                  },
                  note: { type: 'string' },
                },
                required: ['description', 'quantity', 'unit'],
              },
            },
            totalLines: { type: 'integer' },
            notes: { type: 'string' },
          },
          required: ['items'],
        },
      },
    },
  },

  // ──────────────────────────────────────────────────────────────────────
  schedule: {
    system: `You are a UK electrical engineer reading an existing schedule of circuits (often a Schedule of Test Results from an EIC / EICR, or a circuit schedule on a board). Extract every circuit row with cable size, cable type, protective device, rating, and load description.

Return ONLY via the extract_schedule tool — no prose. UK English.

Rules:
- Cable sizes in mm² (numeric).
- protectionType: MCB / RCBO / MCCB / Fuse / RCD-only / Other.
- Map "Type B/C/D" to protectionCurve.
- If a column shows phase (1φ / 3φ / TP+N), set phases accordingly.
- Don't invent values you can't see — use null.`,
    toolDescription: 'Extract circuits from an existing schedule.',
    tool: {
      type: 'function',
      function: {
        name: 'extract_schedule',
        description: 'Return circuit rows from a schedule.',
        parameters: {
          type: 'object',
          properties: {
            boardReference: {
              type: 'string',
              description: 'Board ref / name shown on the schedule (e.g. "DB-01", "Main CU").',
            },
            mainSwitchRating: { type: 'number' },
            supplyVoltage: { type: 'number' },
            supplyPhases: { type: 'string', enum: ['single', 'three'] },
            ze: { type: 'number', description: 'Earth-fault loop impedance Ze (Ω) if shown.' },
            circuits: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  wayNumber: { type: 'integer' },
                  name: { type: 'string', description: 'Circuit description / name.' },
                  cableSize: { type: 'number', description: 'mm² (live conductor).' },
                  cpcSize: { type: 'number' },
                  cableType: {
                    type: 'string',
                    description: 'T&E, SWA, FP200, LSZH, etc. as shown.',
                  },
                  cableLengthM: { type: 'number' },
                  protectionType: {
                    type: 'string',
                    enum: ['MCB', 'RCBO', 'MCCB', 'Fuse', 'RCD-only', 'Other'],
                  },
                  protectionCurve: {
                    type: 'string',
                    enum: ['B', 'C', 'D', 'gG', 'unknown'],
                  },
                  protectionRating: { type: 'number' },
                  phases: { type: 'string', enum: ['single', 'three'] },
                  loadType: {
                    type: 'string',
                    description:
                      'lighting / sockets / cooker / shower / immersion / heating / EV / motor / general',
                  },
                  rcdProtected: { type: 'boolean' },
                  note: { type: 'string' },
                },
                required: ['name'],
              },
            },
            notes: { type: 'string' },
          },
          required: ['circuits'],
        },
      },
    },
  },

  // ──────────────────────────────────────────────────────────────────────
  scope: {
    system: `You are a UK electrical estimator reading a written scope of works. Convert the scope into a list of FINAL CIRCUITS the designer can size — one row per circuit. The user will edit this list before generation; aim for sensible defaults that a real UK electrician would put in.

Rules:
- One row per circuit. If the scope says "rewire the kitchen" expand into the typical kitchen circuits (cooker, ring, lighting, FCU for hood etc.) — don't merge.
- Use UK domestic / commercial conventions:
    Lighting: 1.5 mm² T&E, 6A or 10A Type B MCB, ~25 m run typical
    Sockets ring: 2.5 mm² T&E, 32A RCBO, ring topology, ~30 m run
    Sockets radial: 2.5 / 4 mm² T&E, 20A / 32A RCBO, radial topology
    Cooker: 6 mm² T&E, 32A RCBO, ~4 m run
    Shower: 10 mm² T&E, 40A or 45A RCBO, ~6 m run, bathroom special location
    Immersion: 2.5 mm² T&E, 16A or 20A RCBO
    EV charger: 6 mm² T&E (or SWA outdoor), 32A Type A/B RCBO, outdoor special location
    Smoke alarms: 1.5 mm² T&E, 6A MCB
    FCU / Towel rail / Boiler: 2.5 mm² T&E, 16A RCBO
- For three-phase loads (large EV, motors, heat pumps, workshop machinery) set phases='three'.
- specialLocation values: 'bathroom' | 'outdoor' | 'underground' | 'kitchen' | 'none'.
- loadType values: 'socket' | 'lighting' | 'cooker' | 'shower' | 'ev-charger' | 'immersion' | 'heating' | 'smoke-alarm' | 'garage' | 'outdoor' | 'office-sockets' | 'emergency-lighting' | 'hvac' | 'server-room' | 'kitchen-equipment' | 'signage' | 'fire-alarm' | 'access-control' | 'cctv' | 'data-cabinet' | 'three-phase-motor' | 'machine-tool' | 'welding' | 'conveyor' | 'extraction' | 'control-panel' | 'overhead-lighting' | 'workshop-sockets' | 'compressor' | 'production-line' | 'motor' | 'other'.
- circuitTopology: 'ring' for sockets unless the scope says "radial", 'radial' for everything else.
- loadPower in W — realistic for the load (lighting 500–1000 W typical, sockets 7200 W for ring, cooker 7400 W, shower 9500 W).
- cableLength in metres — sensible for a normal UK property.
- If something can't be inferred, leave the field out and let the AI designer fill it.

Return ONLY via the parse_scope tool — no prose. UK English.`,
    toolDescription:
      'Parse a written scope of works into a list of final circuits with sensible UK defaults.',
    tool: {
      type: 'function',
      function: {
        name: 'parse_scope',
        description:
          'Return a list of circuits inferred from the scope. The user reviews + edits before design generation.',
        parameters: {
          type: 'object',
          properties: {
            installationType: {
              type: 'string',
              enum: ['domestic', 'commercial', 'industrial'],
              description:
                'Best-guess installation type from the scope. Used as a hint only.',
            },
            circuits: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string', description: 'Circuit description, e.g. "Kitchen ring", "Bathroom lights".' },
                  loadType: { type: 'string' },
                  loadPower: { type: 'number', description: 'Estimated load in watts.' },
                  phases: { type: 'string', enum: ['single', 'three'] },
                  cableLength: { type: 'number', description: 'Estimated run in metres.' },
                  circuitTopology: { type: 'string', enum: ['ring', 'radial', 'auto'] },
                  specialLocation: {
                    type: 'string',
                    enum: ['bathroom', 'outdoor', 'underground', 'kitchen', 'none'],
                  },
                  protectionType: {
                    type: 'string',
                    enum: ['auto', 'MCB', 'RCBO', 'RCBO-TypeA', 'RCBO-TypeB'],
                  },
                  notes: { type: 'string' },
                },
                required: ['name', 'loadType', 'phases'],
              },
            },
            assumptions: {
              type: 'string',
              description:
                'Brief note on assumptions made (e.g. "scope didn\'t mention shower — added based on typical 3-bed semi"). The user sees this so they can correct.',
            },
          },
          required: ['circuits'],
        },
      },
    },
  },

  // ──────────────────────────────────────────────────────────────────────
  photo: {
    system: `You are a UK electrical engineer assessing a site photo (consumer unit / distribution board / installation). Identify findings: brand & age of equipment, RCD/RCBO grouping, SPD presence, labelling quality, condition concerns, BS 7671 compliance flags (plastic CU = pre-A2 2018, metal-clad = A2+ compliant).

Return ONLY via the assess_photo tool — no prose. UK English.`,
    toolDescription: 'Assess a site photo of a consumer unit, distribution board, or installation.',
    tool: {
      type: 'function',
      function: {
        name: 'assess_photo',
        description: 'Return findings from a site photo.',
        parameters: {
          type: 'object',
          properties: {
            equipmentType: {
              type: 'string',
              description:
                '"consumer-unit", "distribution-board", "main-switch", "installation-overview", "wiring", "fault", "other".',
            },
            brand: { type: 'string' },
            estimatedAge: { type: 'string', description: 'e.g. "2010-2015", "pre-2008", "modern".' },
            findings: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  kind: {
                    type: 'string',
                    enum: [
                      'observation',
                      'defect',
                      'compliance-concern',
                      'recommendation',
                      'positive',
                    ],
                  },
                  detail: { type: 'string' },
                  reg: {
                    type: 'string',
                    description: 'BS 7671 reg number if applicable, e.g. "421.1.201".',
                  },
                },
                required: ['kind', 'detail'],
              },
            },
            notes: { type: 'string' },
          },
          required: ['findings'],
        },
      },
    },
  },
};

Deno.serve(async (req) => {
  // CORS preflight — return 200 'ok' with the headers (some clients reject
  // 204 / null-body preflight responses).
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

    const body = (await req.json().catch(() => ({}))) as ExtractRequestBody;
    const { kind, fileBase64, mimeType, text, contextHint } = body;

    if (!kind || !PROMPTS[kind]) {
      return json({ error: `Unknown extraction kind: ${kind}` }, 400);
    }

    const isTextKind = kind === 'scope';
    if (isTextKind) {
      if (!text || !String(text).trim()) {
        return json({ error: 'text is required for the scope kind' }, 400);
      }
    } else {
      if (!fileBase64) return json({ error: 'fileBase64 is required' }, 400);
    }

    // Normalise to data URL — OpenAI accepts both data URLs and HTTP URLs.
    let dataUrl: string | null = null;
    if (!isTextKind && fileBase64) {
      if (fileBase64.startsWith('data:')) {
        dataUrl = fileBase64;
      } else {
        const mt = mimeType || 'image/jpeg';
        dataUrl = `data:${mt};base64,${fileBase64}`;
      }
    }

    const promptDef = PROMPTS[kind];
    const userMessage = contextHint
      ? `Context from the user: ${contextHint}\n\nExtract per the tool schema.`
      : 'Extract per the tool schema.';

    // For the scope kind we send the scope text as the user message; no image.
    const userContent: any = isTextKind
      ? `${userMessage}\n\nScope of works:\n"""\n${String(text).slice(0, 6000)}\n"""`
      : [
          { type: 'text', text: userMessage },
          { type: 'image_url', image_url: { url: dataUrl, detail: 'high' } },
        ];

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) return json({ error: 'OPENAI_API_KEY not configured' }, 500);

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
          { role: 'system', content: promptDef.system },
          { role: 'user', content: userContent },
        ],
        tools: [promptDef.tool],
        tool_choice: { type: 'function', function: { name: promptDef.tool.function.name } },
        max_completion_tokens: 8000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[extract-design-vision] OpenAI error', response.status, errText);
      return json({ error: 'Vision extraction failed', detail: errText }, 502);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return json({ error: 'No tool call in response', raw: data }, 502);
    }

    let parsed: any;
    try {
      parsed = JSON.parse(toolCall.function.arguments || '{}');
    } catch (e) {
      return json({ error: 'Failed to parse tool arguments', raw: toolCall.function.arguments }, 502);
    }

    const result = {
      kind,
      extraction: parsed,
      durationMs: Date.now() - startedAt,
      model: 'gpt-5.4-mini-2026-03-17',
      usage: data.usage ?? null,
    };

    return json(result, 200);
  } catch (err: any) {
    console.error('[extract-design-vision] Unexpected error', err);
    return json({ error: err?.message ?? 'Unknown error' }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
