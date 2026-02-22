import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

/**
 * Build the system prompt dynamically from the provided catalogues.
 * No hard-coded accessory IDs — the client sends them fresh each time.
 */
function buildSystemPrompt(
  accessories: Array<{ id: string; label: string; category: string }>,
  prompts: Array<{ key: string; question: string; options?: string[]; inputType: string }>
): string {
  // Compact accessory catalogue: "category: id (label), id (label), ..."
  const grouped: Record<string, string[]> = {};
  for (const a of accessories) {
    if (!grouped[a.category]) grouped[a.category] = [];
    grouped[a.category].push(`${a.id} (${a.label})`);
  }
  const catalogueBlock = Object.entries(grouped)
    .map(([cat, items]) => `${cat}: ${items.join(', ')}`)
    .join('\n');

  // Compact prompt catalogue: "key: question [options]"
  const promptBlock = prompts
    .map((p) => {
      const opts = p.options
        ? ` [${p.options.join(' | ')}]`
        : p.inputType === 'yes_no'
          ? ' [Yes | No]'
          : ' (free text)';
      return `${p.key}: ${p.question}${opts}`;
    })
    .join('\n');

  return `You are a UK electrical site survey assistant. Parse the spoken transcript into structured rooms, items, prompt responses, and corrections. You handle domestic, commercial, and industrial sites.

ITEM MATCHING RULES:
- Match spoken items to the closest accessory from this catalogue. Use the \`id\` field exactly.
- Group items by the room they belong to.
- Default quantity to 1 if not specified.
- Units: use "each" for individual items, "metres" for cable/trunking/conduit runs and LED strip, "m²" for underfloor heating. Do NOT use "nr".
- If the speaker mentions a room name, start grouping subsequent items under that room.
- Items mentioned without a room go under the active room from context (or "General" if none).
- Normalise room names to common UK terms (e.g. "lounge" → "Living Room").
- Be GENEROUS with interpretation. Always try to match to a catalogue item before falling back to custom_item.
- Only use "custom_item" as a last resort — put the original spoken description in "notes".

COMMON SPEECH SHORTCUTS (match these):
- "doubles" / "double sockets" / "twin sockets" = double_socket
- "singles" / "single sockets" = single_socket
- "downlights" / "spots" / "spotlights" = led_downlight
- "pendants" / "ceiling lights" = ceiling_pendant
- "panels" / "LED panels" / "600 by 600" / "ceiling tiles" = led_panel
- "battens" / "strip lights" = led_batten
- "high bays" = high_bay_light
- "low bays" = low_bay_light
- "floodlights" / "floods" = floodlight
- "bulkheads" = bulkhead_light
- "exit signs" / "running man" = emergency_exit_sign
- "emergency lights" / "emergency fittings" = emergency_light
- "data points" / "data outlets" / "cat6" / "network points" = cat6_outlet
- "floor boxes" = floor_box
- "desk modules" / "desk units" / "power modules" = desk_power_module
- "dado" / "dado trunking" / "power track" = powertrack or dado_trunking
- "DB" / "board" / "distribution board" / "panel board" = distribution_board or panel_board
- "sub board" / "sub DB" / "sub main" = sub_distribution_board
- "MCCB" / "MCCB panel" = mccb_panel
- "busbar" / "busbar trunking" = busbar_trunking
- "tap off" / "tap off unit" = tap_off_unit
- "ATS" / "automatic transfer" = ats_panel
- "isolator" / "switch disconnector" = isolator
- "rotary isolator" = rotary_isolator
- "commando" / "commando socket" / "CEE socket" = commando_socket
- "3 phase socket" / "three phase" = three_phase_socket
- "16 amp socket" / "16A" = industrial_socket_16a
- "32 amp socket" / "32A" = industrial_socket_32a
- "63 amp" = industrial_socket_63a
- "fire alarm" / "call point" / "break glass" = fire_alarm_call_point
- "sounder" / "bell" = fire_alarm_sounder
- "beacon" / "sounder beacon" = sounder_beacon
- "fire panel" / "fire alarm panel" = fire_alarm_panel
- "fire detector" / "optical detector" = fire_alarm_detector
- "door holder" / "fire door holder" = fire_door_holder
- "access control" / "card reader" / "fob reader" = access_control_reader
- "door entry" / "intercom" = door_entry_panel
- "mag lock" / "magnetic lock" = magnetic_lock
- "CCTV" / "camera" = cctv_camera
- "NVR" / "DVR" / "recorder" = nvr_dvr
- "intruder alarm" / "alarm panel" = intruder_alarm_panel
- "emergency stop" / "e-stop" = emergency_stop
- "AC" / "air con" / "air conditioning" = ac_unit or ac_isolator (use isolator if "isolator" mentioned)
- "hand dryer" / "dryer" = hand_dryer
- "BMS" / "controls" = bms_controller
- "ventilation" / "MVHR" = ventilation_unit
- "fan isolator" = fan_isolator
- "water heater" / "boiler supply" = water_heater
- "pump" / "pump supply" = pump_supply
- "patch panel" = patch_panel
- "data cabinet" / "server rack" / "comms cab" = data_cabinet
- "Wi-Fi" / "WAP" / "access point" = wifi_access_point
- "network switch" = network_switch
- "fibre" / "fibre outlet" = fibre_outlet
- "PIR" / "occupancy sensor" = occupancy_sensor
- "trunking" = cable_trunking (or mini_trunking / dado_trunking if specified)
- "conduit" = pvc_conduit (or steel_conduit if "steel" / "galv" mentioned)
- "cable tray" = cable_tray
- "cable basket" = cable_basket
- "spur" / "fused spur" = switched_fused_spur
- "USB sockets" = usb_socket
- "dimmer" / "dimmers" = dimmer_switch
- "pull cord" = pull_cord_switch
- "smoke alarm" / "smoke detector" = smoke_detector
- "heat detector" = heat_detector
- "CO detector" / "carbon monoxide" = co_detector
- "TV point" = tv_outlet
- "cooker switch" / "cooker" = cooker_switch
- "hob" = hob_outlet
- "extractor" / "extract fan" = extractor_fan
- "consumer unit" / "CU" / "fuse box" / "fuse board" = consumer_unit
- "track lighting" / "track light" = track_light

ACCESSORY CATALOGUE:
${catalogueBlock}

PROMPT RESPONSE EXTRACTION:
- Extract property assessment details as prompt_responses using the prompt catalogue below.
- Match to the closest valid option. Common spoken equivalents:
  - "metal clad" / "metal consumer unit" → cu_type = "Metal clad (BS EN 61439-3)"
  - "plastic board" / "old fuse box" → cu_type = "Plastic (existing — to be replaced)"
  - "RCBO board" / "all RCBOs" → cu_type = "RCBO board"
  - "PME" / "combined neutral earth" → earthing_arrangement = "TN-C-S (PME)"
  - "TN-S" / "separate earth" → earthing_arrangement = "TN-S"
  - "TT" / "earth rod" → earthing_arrangement = "TT"
  - "bonding is in" / "bonding present" → bathroom_bonding = "Yes"
  - "ring final" / "ring circuit" → kitchen_circuit_type = "Ring final circuit"
  - "radial" → kitchen_circuit_type = "Radial (existing)"
  - Shower ratings: "9.5 kilowatt shower" → shower_kw = "9.5 kW"
- Only return a prompt_response if the speaker clearly mentions it. Do NOT guess.

PROMPT CATALOGUE:
${promptBlock}

CORRECTIONS:
- If the speaker corrects a previous item (e.g. "actually make that 8 doubles", "remove the cooker switch"), return it as a correction.
- "update_quantity" — changes the quantity of an existing item in a room.
- "remove" — removes an item from a room entirely.

ROOM SWITCHING:
- If the speaker says "moving to [room]", "now in [room]", or just "[room]" as a transition, return active_room_switch with the room name.
- Items after a room switch go under the new room.`;
}

const PARSE_TOOL = {
  type: 'function' as const,
  function: {
    name: 'parse_site_visit_transcript',
    description:
      'Parse a spoken site visit transcript into structured rooms, items, prompt responses, and corrections',
    parameters: {
      type: 'object',
      properties: {
        rooms: {
          type: 'array',
          description: 'Rooms and their items extracted from the transcript',
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
                    accessory_id: {
                      type: 'string',
                      description:
                        'Accessory ID from the catalogue (e.g. double_socket, led_downlight). Use custom_item if no match.',
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
                      description:
                        'Original spoken description if custom_item, or any extra detail mentioned',
                    },
                  },
                  required: ['accessory_id', 'quantity', 'unit'],
                },
              },
            },
            required: ['roomName', 'items'],
          },
        },
        prompt_responses: {
          type: 'array',
          description:
            'Property assessment prompt answers extracted from the transcript. Only include if clearly mentioned.',
          items: {
            type: 'object',
            properties: {
              prompt_key: {
                type: 'string',
                description:
                  'The prompt key from the catalogue (e.g. cu_type, earthing_arrangement)',
              },
              value: {
                type: 'string',
                description: 'The matched option value or free-text answer',
              },
              room_name: {
                type: 'string',
                description:
                  'Room name if this is a room-scoped prompt (e.g. bathroom_bonding). Omit for global prompts.',
              },
            },
            required: ['prompt_key', 'value'],
          },
        },
        corrections: {
          type: 'array',
          description:
            'Corrections to previously captured items (e.g. "actually 8 doubles", "remove the cooker switch")',
          items: {
            type: 'object',
            properties: {
              action: {
                type: 'string',
                enum: ['update_quantity', 'remove'],
                description: 'The type of correction',
              },
              room_name: {
                type: 'string',
                description: 'The room the correction applies to',
              },
              accessory_id: {
                type: 'string',
                description: 'The accessory ID being corrected',
              },
              new_quantity: {
                type: 'number',
                description: 'New quantity (only for update_quantity)',
              },
            },
            required: ['action', 'room_name', 'accessory_id'],
          },
        },
        active_room_switch: {
          type: 'string',
          description:
            'If the speaker switches to a new room (e.g. "moving to hallway"), the new room name',
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

    const { transcript, propertyType, existingRooms, activeRoom, accessories, prompts } =
      await req.json();

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

    // Build system prompt from dynamic catalogues (or fallback to minimal prompt)
    const systemPrompt =
      accessories && accessories.length > 0
        ? buildSystemPrompt(accessories, prompts || [])
        : buildSystemPrompt([], []);

    // Build user message with context
    let userMessage = `Transcript: "${transcript.trim()}"`;
    if (propertyType) {
      userMessage += `\nProperty type: ${propertyType}`;
    }
    if (existingRooms && existingRooms.length > 0) {
      userMessage += `\nExisting rooms already on this visit: ${existingRooms.join(', ')}`;
    }
    if (activeRoom) {
      userMessage += `\nCurrently active room: ${activeRoom}`;
    }

    console.log(
      `[PARSE-VOICE] Parsing transcript for user ${user.id} (${transcript.length} chars, ${accessories?.length || 0} accessories, ${prompts?.length || 0} prompts)`
    );

    const result = await callOpenAI(
      {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 4096,
        tools: [PARSE_TOOL],
        tool_choice: { type: 'function', function: { name: 'parse_site_visit_transcript' } },
      },
      openAiKey,
      30000
    );

    // Parse the tool call result
    let parsed: {
      rooms: Array<{
        roomName: string;
        items: Array<{ accessory_id: string; quantity: number; unit: string; notes?: string }>;
      }>;
      prompt_responses?: Array<{ prompt_key: string; value: string; room_name?: string }>;
      corrections?: Array<{
        action: 'update_quantity' | 'remove';
        room_name: string;
        accessory_id: string;
        new_quantity?: number;
      }>;
      active_room_switch?: string;
    };

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

    // Default empty arrays for optional fields
    if (!parsed.prompt_responses) parsed.prompt_responses = [];
    if (!parsed.corrections) parsed.corrections = [];

    const totalItems = parsed.rooms.reduce((s, r) => s + r.items.length, 0);
    console.log(
      `[PARSE-VOICE] Parsed ${parsed.rooms.length} rooms, ${totalItems} items, ${parsed.prompt_responses.length} prompt responses, ${parsed.corrections.length} corrections${parsed.active_room_switch ? `, room switch → ${parsed.active_room_switch}` : ''}`
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
