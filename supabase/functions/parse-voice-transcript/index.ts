import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const SYSTEM_PROMPT = `You are a UK electrical site survey assistant. Parse the spoken transcript into structured rooms and items.

Rules:
- Group items by the room they belong to.
- Use UK electrical terminology (e.g. "socket" not "outlet", "consumer unit" not "breaker panel").
- Default quantity to 1 if not specified.
- Units: use "each" for individual items (sockets, switches, lights, detectors, etc.), "metres" for cable runs and LED strip only. Do NOT use "nr".
- If the speaker mentions a room name, start grouping subsequent items under that room.
- If items are mentioned without a room, put them under "General".
- Normalise room names to common UK terms (e.g. "lounge" and "front room" both become "Living Room").
- Be generous with interpretation — "6 doubles" means 6 double sockets, "cooker switch" is 1 cooker switch, etc.

IMPORTANT — For item descriptions, you MUST use one of these exact accessory IDs:
Sockets: single_socket, double_socket, usb_socket, switched_fused_spur, unswitched_fused_spur, shaver_socket, floor_socket
Lighting: ceiling_pendant, led_downlight, led_strip, wall_light, spotlight_bar, under_cabinet_light, outdoor_light, pir_sensor_light, emergency_light, bathroom_light
Switches: single_switch, double_switch, two_way_switch, intermediate_switch, dimmer_switch, pull_cord_switch, smart_switch
Appliances: cooker_outlet, cooker_switch, hob_outlet, extractor_fan, towel_rail_spur, immersion_heater, waste_disposal
Safety: smoke_detector, heat_detector, co_detector
Data: cat6_outlet, tv_outlet, bt_outlet
Heating: storage_heater, panel_heater, thermostat, underfloor_heating
EV/Outdoor: ev_charger, outside_socket, garden_spike_light
Other: consumer_unit, distribution_board, cable_run, custom_item

If the spoken item doesn't match any of these, use "custom_item" and put the original spoken description in a "notes" field.`;

const PARSE_TOOL = {
  type: 'function' as const,
  function: {
    name: 'parse_site_visit_transcript',
    description: 'Parse a spoken site visit transcript into structured rooms and items',
    parameters: {
      type: 'object',
      properties: {
        rooms: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              roomName: {
                type: 'string',
                description: 'Name of the room (e.g. Kitchen, Hallway, Bedroom 1)',
              },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    description: {
                      type: 'string',
                      description: 'Accessory ID from the catalogue (e.g. double_socket, led_downlight, cooker_switch). Use custom_item if no match.',
                    },
                    quantity: {
                      type: 'number',
                      description: 'Number of items (default 1)',
                    },
                    unit: {
                      type: 'string',
                      enum: ['each', 'metres', 'm²'],
                      description: 'Unit of measurement',
                    },
                    notes: {
                      type: 'string',
                      description: 'Original spoken description if custom_item, or any extra detail',
                    },
                  },
                  required: ['description', 'quantity', 'unit'],
                },
              },
            },
            required: ['roomName', 'items'],
          },
        },
      },
      required: ['rooms'],
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Auth check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { transcript, propertyType, existingRooms } = await req.json();

    if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'transcript is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // Build user message with context
    let userMessage = `Transcript: "${transcript.trim()}"`;
    if (propertyType) {
      userMessage += `\nProperty type: ${propertyType}`;
    }
    if (existingRooms && existingRooms.length > 0) {
      userMessage += `\nExisting rooms already on this visit: ${existingRooms.join(', ')}`;
    }

    console.log(`[PARSE-VOICE] Parsing transcript for user ${user.id} (${transcript.length} chars)`);

    const result = await callOpenAI(
      {
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 2048,
        tools: [PARSE_TOOL],
        tool_choice: { type: 'function', function: { name: 'parse_site_visit_transcript' } },
      },
      openAiKey,
      30000 // 30s timeout — transcript parsing is fast
    );

    // Parse the tool call result
    let parsed: { rooms: Array<{ roomName: string; items: Array<{ description: string; quantity: number; unit: string }> }> };

    if (result.toolCalls && result.toolCalls.length > 0) {
      const args = result.toolCalls[0].function?.arguments || result.content;
      parsed = JSON.parse(args);
    } else {
      parsed = JSON.parse(result.content);
    }

    // Validate structure
    if (!parsed.rooms || !Array.isArray(parsed.rooms)) {
      throw new Error('Invalid response structure: missing rooms array');
    }

    console.log(
      `[PARSE-VOICE] Parsed ${parsed.rooms.length} rooms, ${parsed.rooms.reduce((s, r) => s + r.items.length, 0)} items`
    );

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[PARSE-VOICE] Error:', error);

    await captureException(error, {
      functionName: 'parse-voice-transcript',
      requestUrl: req.url,
      requestMethod: req.method,
    });

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to parse transcript',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
