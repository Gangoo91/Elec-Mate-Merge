import { serve, corsHeaders } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';
import { AIProviderError } from '../_shared/ai-providers.ts';

const VERSION = 'v1.1.0';

/**
 * The vision model for reading a plan.
 *
 * ⚠️ Kept on Flash deliberately. Reading a hand-drawn plan is spatial work that
 * a Pro-tier model would very likely do better, and that is worth revisiting —
 * but `gemini-3.5-pro` returns 404 on this API version, and the rest of the
 * codebase runs Flash in 45 places. Changing this needs the available model
 * list checked against the live key first, not a guess at a name.
 */
const PHOTO_MODEL = 'gemini-3.5-flash';

/**
 * Headroom for a whole floor.
 *
 * Measured: a six-room plan returns ~1,500 tokens. A care-home floor of 25-30
 * rooms lands near 7,500, which the previous 8,000 ceiling would clip.
 */
const PHOTO_MAX_OUTPUT_TOKENS = 32000;

/**
 * Raised when the model's answer was cut short by the token ceiling.
 *
 * Deliberately an `AIProviderError` with `retryable: false` — `withRetry` only
 * skips a retry for that type, and retrying here is pure waste: the same plan
 * overflows every time, so three attempts just make the user wait longer for
 * the same answer.
 */
const planTooLargeError = () =>
  new AIProviderError(
    'That plan has more on it than we can read in one go. Try photographing one floor at a time, or crop to the area you are working on.',
    'gemini',
    undefined,
    false
  );

/**
 * The shape the model must return.
 *
 * Supplying a schema constrains decoding rather than merely requesting JSON, so
 * the model cannot omit `rooms`, rename a key or stop half way through an
 * object. That is the failure the markdown-stripping and JSON-repair code
 * downstream exists to survive; with this it should not arise.
 */
const FLOOR_PLAN_SCHEMA = {
  type: 'object',
  properties: {
    rooms: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          room: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              dimensions: {
                type: 'object',
                properties: {
                  width: { type: 'number' },
                  height: { type: 'number' },
                  unit: { type: 'string' },
                },
                required: ['width', 'height'],
              },
              origin: {
                type: 'object',
                properties: { x: { type: 'number' }, y: { type: 'number' } },
                required: ['x', 'y'],
              },
            },
            required: ['name', 'dimensions', 'origin'],
          },
          walls: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', enum: ['north', 'east', 'south', 'west'] },
                length: { type: 'number' },
                features: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: { type: 'string' },
                      position: { type: 'string' },
                      width: { type: 'number' },
                    },
                    required: ['type'],
                  },
                },
              },
              required: ['id', 'length'],
            },
          },
          symbols: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  description: 'One of the listed symbol IDs, exactly as given, with no suffix.',
                },
                wall: {
                  type: 'string',
                  enum: ['north', 'east', 'south', 'west'],
                  description:
                    'The wall this accessory is mounted on. Omit for ceiling-mounted items.',
                },
                /*
                 * Described precisely, because a bare `type: string` is not
                 * enough guidance.
                 *
                 * Left undescribed, the model began returning coordinate pairs
                 * ("0.8, 1.4"). Those are not wrong in themselves, but they
                 * lift sockets and switches off the walls they belong on and
                 * scatter them across the room — a worse drawing than the
                 * along-the-wall placement this asks for.
                 */
                position: {
                  type: 'string',
                  description:
                    'Either the single number of metres along the named wall, measured from its start, for example "2.4" — or the word "center" for a ceiling-mounted item. Never a coordinate pair, and never two numbers.',
                },
                heightFromFloor: {
                  type: 'number',
                  description: 'Metres above finished floor level.',
                },
              },
              required: ['type', 'position'],
            },
          },
        },
        required: ['room', 'walls', 'symbols'],
      },
    },
  },
  required: ['rooms'],
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description, image_base64 } = await req.json();

    if (!description && !image_base64) {
      throw new Error('Room description or photo is required');
    }

    const isPhotoMode = !!image_base64;
    console.log(`🏠 Generating room diagram from: ${isPhotoMode ? 'photo' : 'description'}`);

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) throw new Error('GEMINI_API_KEY not configured');

    /*
     * ELE-1745 — a photo is a FLOOR, not "a room".
     *
     * This said "Analyse this photo of a room" and the schema below allowed
     * exactly one room with four walls, so a hand-drawn multi-room plan (the
     * nursing home Patrick uploaded) was squeezed into a single rectangle:
     * "it will only show one room and not the floor".
     *
     * The prompt now asks for every room on the plan, positioned relative to
     * each other, so the result is the floor that was photographed.
     */
    const photoPrompt = isPhotoMode
      ? `Analyse this photo of a floor plan. It may be hand-drawn.

Identify EVERY room on the plan — not just one. Typical plans include several rooms plus corridors, halls, stairwells and WCs. For each room:
  - read its name from the drawing where one is written, otherwise infer it (Kitchen, Bedroom 1, Corridor, WC...)
  - estimate its dimensions in metres, using any figures written on the plan; if none are given, estimate from the relative proportions of the drawing
  - give its position as "origin" — the x,y offset in metres of the room's top-left corner from the top-left of the whole floor — so the rooms can be laid out as they appear on the plan, not stacked on top of each other
  - identify doors and windows on each wall
  - suggest a complete electrical layout appropriate to that room type for a UK installation

If the plan is genuinely a single room, return a single entry. Never merge several rooms into one.`
      : '';

    const prompt = `You are an expert electrical diagram generator for UK electricians. ${isPhotoMode ? 'Analyse the provided photo and' : 'Parse the user\'s natural language room description and'} convert it to a structured JSON format for canvas rendering.

${isPhotoMode ? photoPrompt : `USER DESCRIPTION:\n${description}`}

IMPORTANT PARSING RULES:
1. Extract a name for EVERY room on the plan, and give each one an "origin" so they sit where the drawing shows them
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

HALLWAY/LANDING/CORRIDOR:
- 2-way switching (switch-2way) for lights (switch at each end / top and bottom of stairs)
- Smoke detector required (smoke-detector)
- Emergency lighting if commercial (light-emergency)

LONG ROOMS AND CORRIDORS — SPACE THE LIGHTING OUT:
- A single fitting at the centre of a long room leaves most of it dark. Any room
  longer than 5m gets multiple lighting points spread along its length, each with
  its own "position" in metres, roughly one every 3-4m.
- The same applies to emergency lighting and detection on an escape route: space
  them along the corridor rather than placing one in the middle.
- A 20m corridor should have around 5-6 lighting points, not one.

ALL ROOMS:
- Smoke detector required in habitable rooms and escape routes
- CO detector required where there is a combustion appliance
- Consider switch position relative to door opening direction

Return ONLY valid JSON in this exact format. "rooms" is an ARRAY — include one entry per room on the plan:
{
  "rooms": [
    {
      "room": {
        "name": "Kitchen",
        "dimensions": { "width": 4, "height": 3, "unit": "m" },
        "origin": { "x": 0, "y": 0 }
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
    },
    {
      "room": {
        "name": "Hallway",
        "dimensions": { "width": 6, "height": 1.2, "unit": "m" },
        "origin": { "x": 0, "y": 3 }
      },
      "walls": [
        { "id": "north", "length": 6, "features": [] },
        { "id": "east", "length": 1.2, "features": [] },
        { "id": "south", "length": 6, "features": [{ "type": "door", "position": "left", "width": 0.9 }] },
        { "id": "west", "length": 1.2, "features": [] }
      ],
      "symbols": [
        { "type": "light-ceiling", "position": "center" },
        { "type": "switch-2way", "wall": "west", "position": 0.3, "heightFromFloor": 1.2 },
        { "type": "smoke-detector", "position": "center" }
      ]
    }
  ]
}

"origin" is in metres from the top-left of the whole floor, and is what keeps the rooms in the right places relative to one another. Rooms that share a wall should have touching origins rather than overlapping ones.

CRITICAL: Return ONLY the JSON object, no markdown, no explanations, no code blocks. Use ONLY the exact symbol IDs listed above — never append suffixes like -bs7671.`;

    // Import Gemini provider
    const { callGemini, withRetry } = await import('../_shared/ai-providers.ts');

    const result = await withRetry(
      async () => {
        // For photo mode, call Gemini directly with vision parts
        let response;
        if (isPhotoMode) {
          /*
           * Keep the real image type instead of asserting JPEG.
           *
           * The data URI states what the bytes actually are, and this threw
           * that away and told Gemini `image/jpeg` regardless. iPhones shoot
           * HEIC by default and a screenshot of a plan is a PNG, so the type
           * was frequently a lie — which is one of the reasons Photo-to-Plan
           * "randomly works" (ELE-1745). The client now compresses to JPEG
           * before sending, so this is the belt to that braces: any caller
           * sending something else is still described honestly.
           */
          const dataUriMatch = image_base64.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
          const mimeType = dataUriMatch?.[1] ?? 'image/jpeg';
          const rawBase64 = image_base64.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '');

          const visionBody = {
            contents: [{
              role: 'user',
              parts: [
                { inlineData: { mimeType, data: rawBase64 } },
                { text: prompt },
              ],
            }],
            systemInstruction: {
              parts: [{ text: 'You are an expert electrical diagram parser. Return only valid JSON, no markdown formatting.' }],
            },
            generationConfig: {
              temperature: 0.3,
              /*
               * A whole floor needs far more room than one room did.
               *
               * The six-room test plan came back at ~1,500 tokens. A care home
               * floor of 25-30 rooms lands around 6,000-7,500 — right on the
               * old 8,000 ceiling. Going over does not fail cleanly: the JSON
               * is cut off mid-object, `JSON.parse` throws, all three retries
               * burn, and the user sees a generic error for what is really
               * "your plan is bigger than we allowed for". Which is exactly the
               * complaint this whole ticket started from.
               */
              maxOutputTokens: PHOTO_MAX_OUTPUT_TOKENS,
              responseMimeType: 'application/json',
              /*
               * A schema, not just "please return JSON".
               *
               * `responseMimeType` alone asks politely; a `responseSchema`
               * constrains decoding, so the model cannot omit `rooms`, invent a
               * key or emit a half-formed object. That removes the class of
               * failure the markdown-stripping and JSON-repair code below was
               * written to paper over.
               */
              responseSchema: FLOOR_PLAN_SCHEMA,
            },
          };

          const visionRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${PHOTO_MODEL}:generateContent?key=${geminiKey}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(visionBody) }
          );

          if (!visionRes.ok) {
            const errText = await visionRes.text();
            throw new Error(`Gemini vision error: ${visionRes.status} - ${errText}`);
          }

          const visionData = await visionRes.json();
          const candidate = visionData?.candidates?.[0];

          /*
           * Say so when the plan was too big, rather than failing as bad JSON.
           *
           * `MAX_TOKENS` means the answer was cut off. Retrying is pointless —
           * the same plan will overflow again — so this throws a message the
           * user can act on instead of spending three attempts to say
           * "something went wrong".
           */
          if (candidate?.finishReason === 'MAX_TOKENS') {
            throw planTooLargeError();
          }

          const content = candidate?.content?.parts?.[0]?.text;
          if (!content) throw new Error('No response from Gemini vision');
          response = { content };
        } else {
          response = await callGemini(
            {
              messages: [
                {
                  role: 'system',
                  content:
                    'You are an expert electrical diagram parser. Return only valid JSON, no markdown formatting.',
                },
                { role: 'user', content: prompt },
              ],
              model: 'gemini-3.5-flash',
              temperature: 0.3,
              max_tokens: 8000,
              response_format: { type: 'json_object' },
            },
            geminiKey
          );
        }

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

        const parsed = JSON.parse(cleanedContent);

        // Validate structure INSIDE the retry — a parseable-but-incomplete
        // response (missing room/walls/symbols) is a transient AI miss, so
        // throwing here lets withRetry try again instead of hard-failing the
        // request. Sentry: JAVASCRIPT-REACT-15 (285 occurrences).
        /*
         * Accept both shapes.
         *
         * Photo mode now returns `rooms: [...]` (ELE-1745). Description mode,
         * and any client still on the old build, use the flat
         * `{ room, walls, symbols }`. A single-room response is normalised into
         * the array so everything downstream has one shape to handle, and an
         * older app that gets an array still finds the first room where it
         * expects it.
         */
        const normaliseRoom = (r: unknown) => {
          const room = r as { room?: unknown; walls?: unknown; symbols?: unknown };
          return !!room?.room && Array.isArray(room.walls) && Array.isArray(room.symbols);
        };

        if (Array.isArray(parsed.rooms)) {
          if (parsed.rooms.length === 0 || !parsed.rooms.every(normaliseRoom)) {
            throw new Error('Invalid room data structure returned by AI');
          }
          // Back-compat: expose the first room at the top level too.
          return { ...parsed, ...parsed.rooms[0] };
        }

        if (!normaliseRoom(parsed)) {
          throw new Error('Invalid room data structure returned by AI');
        }

        return { ...parsed, rooms: [{ room: parsed.room, walls: parsed.walls, symbols: parsed.symbols }] };
      },
      { maxAttempts: 3, backoff: [1000, 2000, 4000] }
    );

    console.log('✅ Room parsed:', JSON.stringify(result, null, 2));

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
    await captureException(error, { functionName: 'room-diagram-generator', requestUrl: req.url, requestMethod: req.method });
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
