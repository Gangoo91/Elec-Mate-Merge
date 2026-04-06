import { serve, corsHeaders } from '../_shared/deps.ts';

const VERSION = 'v1.0.0';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description } = await req.json();

    if (!description) {
      throw new Error('Room description is required');
    }

    console.log('🏠 Generating room diagram from:', description);

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) throw new Error('GEMINI_API_KEY not configured');

    const prompt = `You are an expert electrical diagram generator for UK electricians. Parse the user's natural language room description and convert it to a structured JSON format for canvas rendering.

USER DESCRIPTION:
${description}

IMPORTANT PARSING RULES:
1. Extract room name
2. Parse wall dimensions (in metres) - identify north, south, east, west walls
3. Identify features on each wall (doors, windows)
4. Extract electrical components (sockets, switches, lights) with positions
5. Place sockets at realistic heights (0.3m above floor = 150mm above skirting)
6. Place switches at realistic heights (1.2m above floor)
7. Place ceiling lights at room center unless specified otherwise
8. If wall orientation not specified, assume: top=north, right=east, bottom=south, left=west

VALID SYMBOL IDs (use ONLY these exact IDs, no suffixes):
Lighting: light-ceiling, light-wall, light-downlight, light-emergency, light-fluorescent, light-pendant, light-bulkhead, light-pir, light-outside, light-led-strip, light-exit-sign, light-twin-emergency, light-high-bay
Sockets: socket-single-13a, socket-double-13a, socket-fused-spur, socket-switched-fused-spur, socket-unswitched-spur, socket-cooker-45a, socket-floor, socket-outdoor, socket-usb, socket-ev-charger, socket-tv-aerial, socket-data, socket-telephone, socket-shaver, socket-comms-cabinet
Switches: switch-1way, switch-2way, switch-intermediate, switch-dimmer, switch-pull-cord, switch-double, switch-pir, switch-timer, switch-isolator, switch-emergency-stop, switch-fan-isolator, switch-key, switch-heater
Distribution: consumer-unit, mcb, rcd, rcbo, main-isolator, distribution-board, spd, meter, mccb, contactor, changeover-switch, generator-changeover, busbar-chamber, sub-main-board
Safety: smoke-detector, co-detector, heat-detector, fire-alarm, bell, junction-box, thermostat, extractor-fan, cctv, door-entry, emergency-call-point, disabled-alarm, sounder-beacon, access-control, door-release, motion-detector, break-glass

ROOM-SPECIFIC UK WIRING REGULATIONS:

BATHROOM (BS 7671 Section 701):
- NO 13A socket outlets (except shaver sockets to BS EN 61558-2-5)
- Light switches MUST be pull-cord type (not plate switches) — use switch-pull-cord
- All circuits must be 30mA RCD protected
- Use IP-rated downlights (light-downlight)
- Include extractor-fan
- Include shaver socket (socket-shaver)
- NEVER place socket-single-13a or socket-double-13a in bathrooms

KITCHEN:
- Minimum 4 double sockets on worktop ring final circuit at 1.15m height
- Dedicated 45A cooker circuit (socket-cooker-45a)
- FCU for extractor (socket-fused-spur or socket-switched-fused-spur)
- RCD protection for sockets within 1m of sink
- Place worktop sockets above worktop height (1.15m)

GARAGE/WORKSHOP:
- Consider consumer-unit or sub-main-board
- Outdoor IP66 sockets (socket-outdoor)
- Fluorescent or high-bay lighting (light-fluorescent or light-high-bay)
- RCD protection on all circuits

HALLWAY/LANDING:
- 2-way switching (switch-2way) for lights (switch at each end / top and bottom of stairs)
- Smoke detector required (smoke-detector)
- Emergency lighting if commercial (light-emergency)

ALL ROOMS:
- Smoke detector required in habitable rooms and escape routes
- CO detector required where there is a combustion appliance
- Consider switch position relative to door opening direction

Return ONLY valid JSON in this exact format:
{
  "room": {
    "name": "Kitchen",
    "dimensions": { "width": 4, "height": 3, "unit": "m" }
  },
  "walls": [
    { "id": "north", "length": 4, "features": [{ "type": "window", "position": "center", "width": 1.5 }] },
    { "id": "east", "length": 3, "features": [{ "type": "door", "position": "right", "width": 0.9 }] },
    { "id": "south", "length": 4, "features": [] },
    { "id": "west", "length": 3, "features": [] }
  ],
  "symbols": [
    { "type": "socket-double-13a", "wall": "south", "position": 1, "heightFromFloor": 0.3 },
    { "type": "socket-double-13a", "wall": "south", "position": 2.5, "heightFromFloor": 0.3 },
    { "type": "switch-1way", "wall": "west", "position": 0.3, "heightFromFloor": 1.2 },
    { "type": "light-ceiling", "position": "center" }
  ]
}

CRITICAL: Return ONLY the JSON object, no markdown, no explanations, no code blocks. Use ONLY the exact symbol IDs listed above — never append suffixes like -bs7671.`;

    // Import Gemini provider
    const { callGemini, withRetry } = await import('../_shared/ai-providers.ts');

    const result = await withRetry(
      async () => {
        const response = await callGemini(
          {
            messages: [
              {
                role: 'system',
                content:
                  'You are an expert electrical diagram parser. Return only valid JSON, no markdown formatting.',
              },
              { role: 'user', content: prompt },
            ],
            model: 'gemini-2.5-flash',
            temperature: 0.3,
            max_tokens: 8000, // Increased to handle detailed room JSON with multiple symbols
            response_format: { type: 'json_object' },
          },
          geminiKey
        );

        // Clean response (remove markdown code blocks if present)
        let cleanedContent = response.content.trim();
        if (cleanedContent.startsWith('```json')) {
          cleanedContent = cleanedContent
            .replace(/```json\n?/g, '')
            .replace(/```\n?$/g, '')
            .trim();
        } else if (cleanedContent.startsWith('```')) {
          cleanedContent = cleanedContent.replace(/```\n?/g, '').trim();
        }

        return JSON.parse(cleanedContent);
      },
      3,
      2000
    );

    console.log('✅ Room parsed:', JSON.stringify(result, null, 2));

    // Validate structure
    if (!result.room || !result.walls || !result.symbols) {
      throw new Error('Invalid room data structure returned by AI');
    }

    return new Response(
      JSON.stringify({
        success: true,
        roomData: result,
        version: VERSION,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Room generation error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate room diagram',
        version: VERSION,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
