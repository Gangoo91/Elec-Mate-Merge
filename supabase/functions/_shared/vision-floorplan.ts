/**
 * Floor-plan / drawing vision pass.
 *
 * Run BEFORE extraction whenever the user uploaded image attachments.
 * Returns a structured payload that grounds the extractor in what the
 * drawing actually shows: rooms detected, socket/light counts, cable-run
 * estimates, access notes. Without this the model "kinda looks at the
 * picture" — with it, every extracted line item is anchored to a real
 * count from the drawing.
 *
 * Cost: one extra OpenAI call (~3-5s, ~£0.005 per estimate). Worth it.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const MODEL = 'gpt-5.4-mini-2026-03-17';

export interface RoomCount {
  name: string;
  type:
    | 'kitchen'
    | 'bathroom'
    | 'bedroom'
    | 'living'
    | 'dining'
    | 'hallway'
    | 'utility'
    | 'garage'
    | 'office'
    | 'other';
  approxAreaM2?: number;
  sockets?: number;
  lights?: number;
  switches?: number;
  notes?: string;
}

export interface FloorplanReading {
  hasUsableDrawing: boolean;
  /** Confidence 0-100 in the overall reading. Below 40 means the AI couldn't see enough. */
  confidence: number;
  /** Rooms detected in the drawing(s). */
  rooms: RoomCount[];
  /** Aggregate counts across all rooms, useful for top-of-quote summary. */
  totals: {
    rooms: number;
    sockets: number;
    lights: number;
    switches: number;
    estimatedCableRunMetres?: number;
  };
  /** Plain-text observations that don't fit the structured fields. */
  observations: string[];
  /** Access / install constraints noted on the drawing (loft, shafts, etc). */
  accessNotes: string[];
  /** Any electrical equipment or symbols detected (CU position, smoke alarms, EV charger pad). */
  equipmentDetected: string[];
}

const EMPTY_READING: FloorplanReading = {
  hasUsableDrawing: false,
  confidence: 0,
  rooms: [],
  totals: { rooms: 0, sockets: 0, lights: 0, switches: 0 },
  observations: [],
  accessNotes: [],
  equipmentDetected: [],
};

/**
 * Run the vision pass on whatever image attachments the user uploaded.
 * Returns an empty reading when there are no images, no API key, or the
 * call fails — never throws.
 */
export async function readFloorplans(
  imageBlocks: Array<{ type: 'image_url'; image_url: { url: string; detail: 'low' | 'high' } }>,
  briefContext: string
): Promise<FloorplanReading> {
  if (!imageBlocks || imageBlocks.length === 0) return EMPTY_READING;
  if (!OPENAI_API_KEY) return EMPTY_READING;

  const system = `You are a UK electrician's floor-plan reader. You analyse architectural drawings and site photos to extract the structured electrical scope a senior estimator would derive on a walk-around.

Read carefully. Count, don't approximate. Return ONLY valid JSON.

Symbols you'll commonly see on UK domestic drawings:
- Sockets: small filled circles or rectangles, sometimes with "13A" or "DSO" labels.
- Lights: open circles, sometimes "L" inside.
- Switches: small rectangles with number indicating gangs (1G, 2G), often near doors.
- Smoke alarms: triangle or "SD" label.
- Fans: circle with cross or "EF".
- Consumer unit: rectangle marked "CU" or "Distribution Board" / "DB".
- Doorways: gap with arc.

When counting:
- Distinguish existing fittings from proposed (often shown by line style — proposed is typically dashed or marked with a key).
- If you genuinely cannot see a count, leave the field undefined rather than guessing. Set a low confidence.

Cable run estimation (rough):
- Use the scale legend if visible. Otherwise default to typical UK domestic: ~3m per socket from CU/distribution, ~4m per light, +20% for routing.
- Provide a single estimatedCableRunMetres total — order of magnitude only.

Be conservative. If the drawing is unreadable, return hasUsableDrawing:false with an observation explaining what you saw.`;

  const userText = `BRIEF (for context only — do not let it override what you see in the drawings):
"""
${briefContext.slice(0, 2000)}
"""

Analyse the attached drawings and return:

{
  "hasUsableDrawing": boolean,
  "confidence": 0-100,
  "rooms": [
    { "name": string, "type": "kitchen|bathroom|bedroom|living|dining|hallway|utility|garage|office|other", "approxAreaM2": number | null, "sockets": number, "lights": number, "switches": number, "notes": string | null }
  ],
  "totals": {
    "rooms": number,
    "sockets": number,
    "lights": number,
    "switches": number,
    "estimatedCableRunMetres": number | null
  },
  "observations": [string],
  "accessNotes": [string],
  "equipmentDetected": [string]
}

Examples of useful observations:
- "Open-plan kitchen/diner across NE corner"
- "Consumer unit shown in cupboard under stairs"
- "EV charger pad indicated on driveway"
- "Loft hatch in main hallway"

Examples of useful accessNotes:
- "Restricted loft access, hatch ~500mm wide"
- "Solid masonry walls between rooms — chasing required"
- "Cavity walls on external — easier cable runs"`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 45_000);

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: system },
          {
            role: 'user',
            content: [
              { type: 'text', text: userText },
              ...imageBlocks,
            ],
          },
        ],
        response_format: { type: 'json_object' },
        max_completion_tokens: 4000,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!resp.ok) {
      console.warn(`[vision-floorplan] non-OK ${resp.status}; returning empty reading`);
      return EMPTY_READING;
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return EMPTY_READING;

    const parsed = JSON.parse(content);
    return normaliseReading(parsed);
  } catch (err: any) {
    console.warn('[vision-floorplan] failed:', err?.message ?? err);
    return EMPTY_READING;
  }
}

/**
 * Format a floor-plan reading as a compact prompt block for the
 * extractor. Keeps the AI grounded in real counts rather than vague
 * descriptions.
 */
export function formatReadingForExtraction(reading: FloorplanReading): string {
  if (!reading.hasUsableDrawing || reading.confidence < 30) return '';

  const lines: string[] = [];
  lines.push('FLOOR-PLAN READING (treat as ground truth — counts are from the drawing):');
  lines.push(
    `Total: ${reading.totals.rooms} rooms · ${reading.totals.sockets} sockets · ${reading.totals.lights} lights · ${reading.totals.switches} switches${
      reading.totals.estimatedCableRunMetres
        ? ` · ~${reading.totals.estimatedCableRunMetres}m cable run`
        : ''
    }`
  );

  if (reading.rooms.length > 0) {
    lines.push('');
    lines.push('Rooms:');
    reading.rooms.forEach((r) => {
      const parts: string[] = [`${r.name} (${r.type})`];
      if (r.approxAreaM2) parts.push(`${r.approxAreaM2}m²`);
      if (r.sockets !== undefined) parts.push(`${r.sockets} sockets`);
      if (r.lights !== undefined) parts.push(`${r.lights} lights`);
      if (r.switches !== undefined) parts.push(`${r.switches} switches`);
      if (r.notes) parts.push(`notes: ${r.notes}`);
      lines.push(`  • ${parts.join(' · ')}`);
    });
  }

  if (reading.equipmentDetected.length > 0) {
    lines.push('');
    lines.push(`Equipment detected: ${reading.equipmentDetected.join('; ')}`);
  }
  if (reading.observations.length > 0) {
    lines.push('');
    lines.push('Observations:');
    reading.observations.forEach((o) => lines.push(`  • ${o}`));
  }
  if (reading.accessNotes.length > 0) {
    lines.push('');
    lines.push('Access notes:');
    reading.accessNotes.forEach((n) => lines.push(`  • ${n}`));
  }
  return lines.join('\n');
}

function normaliseReading(raw: any): FloorplanReading {
  const rooms = Array.isArray(raw?.rooms) ? raw.rooms : [];
  return {
    hasUsableDrawing: !!raw?.hasUsableDrawing,
    confidence: clamp(Number(raw?.confidence ?? 0), 0, 100),
    rooms: rooms.map((r: any) => ({
      name: String(r?.name ?? 'Room').slice(0, 60),
      type: validRoomType(r?.type),
      approxAreaM2: optNumber(r?.approxAreaM2),
      sockets: optNumber(r?.sockets),
      lights: optNumber(r?.lights),
      switches: optNumber(r?.switches),
      notes: r?.notes ? String(r.notes).slice(0, 200) : undefined,
    })),
    totals: {
      rooms: optNumber(raw?.totals?.rooms) ?? rooms.length,
      sockets: optNumber(raw?.totals?.sockets) ?? 0,
      lights: optNumber(raw?.totals?.lights) ?? 0,
      switches: optNumber(raw?.totals?.switches) ?? 0,
      estimatedCableRunMetres: optNumber(raw?.totals?.estimatedCableRunMetres),
    },
    observations: arrStr(raw?.observations).slice(0, 8),
    accessNotes: arrStr(raw?.accessNotes).slice(0, 6),
    equipmentDetected: arrStr(raw?.equipmentDetected).slice(0, 12),
  };
}

const VALID_ROOM_TYPES: RoomCount['type'][] = [
  'kitchen',
  'bathroom',
  'bedroom',
  'living',
  'dining',
  'hallway',
  'utility',
  'garage',
  'office',
  'other',
];
function validRoomType(t: any): RoomCount['type'] {
  return VALID_ROOM_TYPES.includes(t) ? t : 'other';
}

function optNumber(v: any): number | undefined {
  if (v === null || v === undefined || v === '') return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function arrStr(v: any): string[] {
  return Array.isArray(v) ? v.filter((x) => typeof x === 'string').slice(0, 16) : [];
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}
