import { serve, corsHeaders } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';
import { AIProviderError } from '../_shared/ai-providers.ts';
import { createClient } from '../_shared/deps.ts';
import { readPlan, describePlan, type PlanPage, type PlanProgress } from './plan-reader.ts';
import { ELECTRICAL_RULES } from './electrical-rules.ts';

const VERSION = 'v1.2.0';

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




/**
 * What the browser is told. Our own messages ("No rooms found on the plan")
 * are written for the user and pass through; anything from upstream — a
 * provider's raw error body, a network error quoting a URL — is replaced with
 * a plain sentence. The detail still goes to the logs and Sentry.
 */
function clientMessage(err: unknown, fallback: string): string {
  const msg = err instanceof Error ? err.message : '';
  if (!msg || /gemini|google|https?:\/\/|api[_-]?key|error sending request|\{|\bstatus\b/i.test(msg)) {
    return 'The plan reader is busy or unavailable. Please try again in a minute.';
  }
  return msg.length > 300 ? fallback : msg;
}

/** An answer about the plan itself — asking again gives the same answer. */
function isFinalAnswer(err: unknown): boolean {
  return /no (readable )?rooms|not a (floor )?plan|too (large|big)/i.test(err instanceof Error ? err.message : '');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    /*
     * Signed-in users only. This function spends Gemini credit on every call
     * and was deployed with verify_jwt off and no check of its own, so anyone
     * who found the URL could run it. The app always calls it with the user's
     * session, so requiring one costs a real user nothing.
     */
    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: auth } = await supabase.auth.getUser(authHeader.replace(/^Bearer\s+/i, ''));
    if (!auth?.user) {
      return new Response(JSON.stringify({ success: false, error: 'Please sign in again.' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Eight pages at 2,400 px is a few MB; anything far past that is a mistake
    // and would only fail slowly further on. Say so at once (the client does
    // not retry a 4xx).
    const declared = Number(req.headers.get('content-length') ?? 0);
    if (declared > 25 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ success: false, error: 'That plan is too large to send. Upload fewer pages, or a smaller export.' }),
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const body = await req.json();
    const { description, image_base64, image_width, image_height, notes } = body;
    /*
     * `pages` carries a multi-page PDF (one floor per page is common in an
     * architect's pack); `image_base64` is the single-image shape every older
     * build sends.
     */
    const pagesIn: { image_base64: string; width?: number; height?: number }[] = Array.isArray(body.pages)
      ? body.pages.slice(0, 8)
      : image_base64
        ? [{ image_base64, width: image_width, height: image_height }]
        : [];

    if (!description && pagesIn.length === 0) {
      throw new Error('Room description or photo is required');
    }

    const isPhotoMode = pagesIn.length > 0;
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

${ELECTRICAL_RULES}

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

    /*
     * A drawn plan goes through the two-stage reader (plan-reader.ts): find
     * every room first, then design the electrics in batches. The single-call
     * path below found 6-9 of ~32 rooms on a real care-home CAD sheet. It stays
     * as the fallback — a partial floor beats an error.
     */
    const toPages = (): PlanPage[] =>
      pagesIn.map((p) => ({
        mimeType: p.image_base64.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/)?.[1] ?? 'image/jpeg',
        base64: p.image_base64.replace(/^data:[^;]+;base64,/, ''),
        width: Number(p.width) || undefined,
        height: Number(p.height) || undefined,
      }));

    /*
     * Live progress (opt-in with `stream: true`). The response is one JSON
     * object per line: progress events as the read goes, then a final
     * `{ stage: 'done', result }` or `{ stage: 'error', error }`. Builds that do
     * not ask for it get the plain JSON below, unchanged. A streamed read that
     * fails does not try the single-call fallback — the client simply asks
     * again without `stream`, which does.
     */
    if (body.stream === true) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const send = (obj: unknown) => controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'));
          const onProgress = (p: PlanProgress) => send(p);
          try {
            const plan = isPhotoMode
              ? await readPlan(toPages(), geminiKey, ELECTRICAL_RULES, typeof notes === 'string' ? notes : undefined, onProgress)
              : await describePlan(String(description), geminiKey, ELECTRICAL_RULES, onProgress);
            send({
              stage: 'done',
              result: {
                success: true,
                roomData: { ...plan.rooms[0], rooms: plan.rooms, floors: plan.floors, scale: plan.scale, underlays: plan.underlays },
                version: VERSION,
              },
            });
          } catch (err) {
            await captureException(err, { functionName: 'room-diagram-generator', requestUrl: req.url, requestMethod: req.method });
            send({
              stage: 'error',
              error: clientMessage(err, 'Failed to read the plan'),
              retryable: !(err instanceof AIProviderError && !err.retryable) && !isFinalAnswer(err),
            });
          } finally {
            controller.close();
          }
        },
      });
      return new Response(stream, {
        headers: { ...corsHeaders, 'Content-Type': 'application/x-ndjson', 'Cache-Control': 'no-cache' },
      });
    }

    const respond = (roomData: unknown) =>
      new Response(JSON.stringify({ success: true, roomData, version: VERSION }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    if (isPhotoMode) {
      const pages = toPages();
      try {
        const plan = await readPlan(pages, geminiKey, ELECTRICAL_RULES, typeof notes === 'string' ? notes : undefined);
        console.log(`✅ Plan read: ${plan.rooms.length} rooms, floors=${JSON.stringify(plan.floors)}, scale=${plan.scale.basis}`);
        // First room also at the top level, for builds that predate `rooms`.
        return respond({ ...plan.rooms[0], rooms: plan.rooms, floors: plan.floors, scale: plan.scale, underlays: plan.underlays });
      } catch (planErr) {
        if (planErr instanceof AIProviderError && !planErr.retryable) throw planErr;
        if (pages.length > 1) throw planErr; // the single-call fallback reads one image only
        console.warn('⚠️ Two-stage plan read failed, falling back to single call:', String(planErr));
      }
    } else {
      /*
       * A description can be a whole property now — "three-bed semi, kitchen
       * at the back, en-suite off the main bedroom" — not just one room. The
       * single-room path below stays as the fallback.
       */
      try {
        const plan = await describePlan(String(description), geminiKey, ELECTRICAL_RULES);
        console.log(`✅ Described plan: ${plan.rooms.length} rooms, floors=${JSON.stringify(plan.floors)}`);
        return respond({ ...plan.rooms[0], rooms: plan.rooms, floors: plan.floors });
      } catch (descErr) {
        console.warn('⚠️ Described layout failed, falling back to single room:', String(descErr));
      }
    }

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
          const firstImage = pagesIn[0].image_base64;
          const dataUriMatch = firstImage.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
          const mimeType = dataUriMatch?.[1] ?? 'image/jpeg';
          const rawBase64 = firstImage.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '');

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
            `https://generativelanguage.googleapis.com/v1beta/models/${PHOTO_MODEL}:generateContent`,
            {
              method: 'POST',
              // Key in a header, not the URL (see plan-reader.ts).
              headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiKey },
              body: JSON.stringify(visionBody),
            }
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
        error: clientMessage(error, 'Failed to generate room diagram'),
        version: VERSION,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
