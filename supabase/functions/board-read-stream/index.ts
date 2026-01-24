import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// ============================================================================
// TYPES
// ============================================================================

interface BoardReadRequest {
  images: string[];
  hints?: {
    main_switch_side?: 'left' | 'right';
    expected_ways?: number;
    board_type?: 'domestic' | 'commercial' | 'industrial';
    is_three_phase?: boolean;
  };
  options?: {
    use_claude_ocr?: boolean;
    use_openai_components?: boolean;
    fast_mode?: boolean;
  };
}

interface DetectedCircuit {
  index: number;
  label_text: string;
  device: {
    category: string;
    type: string;
    rating_amps: number | null;
    curve: string | null;
    breaking_capacity_kA: number | null;
  };
  pictograms: Array<{ type: string; confidence: number }>;
  phase: '1P' | '3P';
  phase_assignment?: string | string[];
  confidence: 'high' | 'medium' | 'low';
  evidence: string;
  source_model: string;
}

interface BoardStructure {
  brand: string;
  model: string;
  main_switch_rating: number | null;
  main_switch_poles?: string;
  is_three_phase: boolean;
  spd_status: 'present' | 'not_present' | 'unknown';
  board_layout: 'single_row' | 'dual_row' | '3P-vertical' | '3P-horizontal';
  estimated_total_ways: number;
  circuits_per_phase?: { L1: number; L2: number; L3: number };
}

// SSE Event Types
type StreamEvent =
  | { type: 'stage'; stage: string; message: string }
  | { type: 'board'; data: BoardStructure }
  | { type: 'circuits_batch'; circuits: DetectedCircuit[] }
  | { type: 'circuit_update'; index: number; updates: Partial<DetectedCircuit> }
  | { type: 'warning'; message: string }
  | { type: 'decision'; message: string }
  | { type: 'complete'; metadata: any }
  | { type: 'error'; message: string };

// ============================================================================
// UNIFIED GEMINI PROMPT - Comprehensive single-pass analysis
// ============================================================================

const UNIFIED_BOARD_PROMPT = `You are an expert UK electrical installation analyst. Your job is to identify EVERY SINGLE circuit in this consumer unit.

## CRITICAL: CIRCUIT COUNTING METHODOLOGY
You MUST follow this exact process:

### STEP 1: COUNT TOTAL POSITIONS
First, count ALL DIN rail positions in the board:
- Look at the physical DIN rail(s)
- Count every single slot/position from LEFT to RIGHT
- Include the main switch position(s)
- Common sizes: 6, 8, 10, 12, 14, 16, 18, 20, 24 ways
- Write this count in estimated_total_ways

### STEP 2: IDENTIFY EVERY POSITION
For EVERY position you counted, you MUST identify what's there:
- Device installed (MCB, RCBO, RCD, etc.)
- Blank/cover plate ("Spare")
- Empty/unused slot ("Spare")
- Main switch or isolator

### STEP 3: VERIFY YOUR COUNT
Before responding, CHECK:
- Number of circuits in your JSON = estimated_total_ways (approximately)
- If you have 12 ways but only 8 circuits, you MISSED some - go back and look again
- Include ALL spares/blanks as entries with label_text: "Spare" and device: null

MISSING CIRCUITS IS UNACCEPTABLE. If in doubt, include it.

## BOARD DETECTION

Identify the board structure:
- brand: Manufacturer name (Hager, MK, Schneider, Wylex, Crabtree, Contactum, BG, Consumer Unit Direct, etc)
- model: Model number if visible, otherwise null
- main_switch_rating: Main isolator rating in amps (typical: 63, 80, 100A for domestic; 100-125A for commercial)
- main_switch_poles: "1P+N" | "3P" | "3P+N" | "4P"
- is_three_phase: true if board has L1/L2/L3 busbars, false for single phase
- spd_status: "present" (SPD module visible with green LED or SPD marking) | "not_present" | "unknown"
- board_layout: "single_row" | "dual_row" | "3P-vertical" (3 rows, one per phase) | "3P-horizontal" (single row, alternating phases)
- estimated_total_ways: Total physical DIN rail positions (common: 6, 8, 10, 12, 14, 16, 18, 20, 24)

For three-phase boards, also include:
- circuits_per_phase: { "L1": count, "L2": count, "L3": count }

## THREE-PHASE BOARD IDENTIFICATION

A board is THREE-PHASE if you see:
1. Main switch is 3-pole or 4-pole (3P+N)
2. Three busbars visible (L1, L2, L3) - may be colour-coded:
   - Modern: Brown (L1), Black (L2), Grey (L3)
   - Old: Red (L1), Yellow (L2), Blue (L3)
3. Multiple rows of MCBs (typically 3 rows in vertical layout)
4. Phase markers (P1/P2/P3 or L1/L2/L3) near circuit positions

## CIRCUIT DETECTION

Scan systematically LEFT to RIGHT, TOP to BOTTOM. For each occupied circuit position:

### 1. Position & Label
- index: Sequential position number (1, 2, 3...)
- label_text: Read the label EXACTLY, then expand common abbreviations:
  - K, Kit = Kitchen
  - Lts, Lgt, L = Lights/Lighting
  - Skt, Soc, S = Sockets
  - Dn, Dwn = Downstairs
  - Up, Upst = Upstairs
  - FF, 1F = First Floor
  - GF, G = Ground Floor
  - Ext, Out = External/Outside
  - Gar = Garage
  - Util, U = Utility
  - Smk, SD = Smoke Detectors
  - Imm, IH = Immersion Heater
  - CH, Blr = Central Heating/Boiler
  - WM = Washing Machine
  - DW = Dishwasher
  - TD = Tumble Dryer
  - Shwr = Shower
  - Ckr = Cooker
  - Ring = Ring Main
  - Use [?] suffix if text is genuinely unclear

### 2. Device Identification (CRITICAL - examine physical features)
- category: Identify by PHYSICAL appearance:
  - MCB: Simple toggle switch with NO test button, single module width
  - RCBO: Toggle PLUS small test button (red/white/blue), single module width, often "30mA" marking
  - RCD: TWO module width, LARGE test button, "30mA" or "100mA" marking
  - AFDD: Marked "AFDD" or "Arc Fault", may have small LCD screen
  - Isolator: No trip mechanism, often the main switch
  - Fuse: Rewirable carrier or cartridge fuse

- rating_amps: Read from device face. Standard UK values ONLY: 6, 10, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100A
- curve: Letter before rating - B (general domestic), C (motors, AC), D (high inrush), or null if not visible
- type: Combined designation e.g. "B16", "C32", "D40"

### 3. Phase Detection
- phase: "1P" for single-pole devices, "3P" for three-pole devices
- phase_assignment: Which phase the circuit is on:
  - For 1P circuits on 3P boards: "L1" | "L2" | "L3" (determine from row position or phase markers)
  - For 3P circuits: ["L1", "L2", "L3"]
  - For 1P circuits on 1P boards: omit or null

### 4. Three-Pole Device Identification
A device is THREE-POLE (3P) if:
- Three toggle handles linked together
- Device spans 3 module widths
- L1/L2/L3 markings on the device
- Common 3P loads: cookers (32-45A), EV chargers (32A), motors, HVAC, hot tubs

### 5. Pictogram Inference
Based on label and rating, infer circuit type:
- SOCKET: "sockets", "skt", ring main, 32A typical
- LIGHTING: "lights", "lts", 6-10A typical
- COOKER: "cooker", "oven", 32-45A
- HOB: "hob", 32A
- SHOWER: "shower", 32-50A
- EV_CHARGER: "EV", "charger", 32A typical
- FRIDGE_FREEZER: "fridge", "freezer", "FF"
- WASHING_MACHINE: "washing", "WM", 20A
- DISHWASHER: "DW", "dishwasher"
- BOILER: "boiler", "CH", central heating
- IMMERSION: "immersion", "imm", 16A
- SMOKE_ALARM: "smoke", "smk", 6A
- GARAGE: "garage", "gar"
- EXTERNAL: "external", "ext", "outside"
- RING_MAIN: "ring", 32A
- SPUR: "spur", "FCU"
- UNKNOWN: Cannot determine

### 6. Confidence Assessment
- confidence: "high" | "medium" | "low"
  - HIGH: Clear label visible + certain device type + visible rating
  - MEDIUM: Partially readable, logical inference
  - LOW: Unclear label OR uncertain if MCB/RCBO

## OUTPUT FORMAT

Return ONLY valid JSON in this exact structure:
{
  "board": {
    "brand": "string",
    "model": "string or null",
    "main_switch_rating": number,
    "main_switch_poles": "1P+N | 3P | 3P+N | 4P",
    "is_three_phase": boolean,
    "spd_status": "present | not_present | unknown",
    "board_layout": "single_row | dual_row | 3P-vertical | 3P-horizontal",
    "estimated_total_ways": number,
    "circuits_per_phase": { "L1": number, "L2": number, "L3": number } // only for 3P boards
  },
  "circuits": [
    {
      "index": number,
      "label_text": "string (expanded)",
      "device": {
        "category": "MCB | RCBO | RCD | AFDD | Isolator | Fuse",
        "rating_amps": number,
        "curve": "B | C | D | null",
        "type": "string e.g. B32"
      },
      "phase": "1P | 3P",
      "phase_assignment": "L1 | L2 | L3" or ["L1", "L2", "L3"],
      "pictograms": [{ "type": "SOCKET", "confidence": 0.9 }],
      "confidence": "high | medium | low",
      "evidence": "brief reason for detection"
    }
  ]
}

## IMPORTANT RULES

1. MCB vs RCBO: The most common error! MCBs have NO test button. RCBOs have a small test button (usually red, white, or blue).
2. Don't guess ratings - if unreadable, use null
3. Expand ALL abbreviations in label_text
4. ALWAYS include spare/blank positions with label_text: "Spare" and device: null - these are critical for accurate board documentation
5. For 3P boards, determine phase assignment for EVERY circuit
6. BE EXHAUSTIVE - scan the ENTIRE board systematically. If you see a device, include it. If there's a gap, include "Spare".
7. FINAL CHECK: Compare your circuit count to estimated_total_ways. They should be close. If not, you missed circuits.
8. When unsure if something is a circuit or not, INCLUDE IT with confidence: "low"

## UK BOARD SPECIFICS

### Common UK Consumer Unit Brands (recognise by logo/style):
- Hager: Blue/white modern units, "Hager" text
- MK Sentry: Grey/black, "MK" logo
- Schneider: Green/white, "Schneider Electric" text
- Wylex: Blue, older style, "Wylex" text
- Crabtree: Green/grey, "Crabtree" text
- BG: Orange/grey, "BG" logo
- Contactum: Grey, "Contactum" text
- Consumer Unit Direct (CUD): Budget brand
- Fusebox: "Fusebox" branding

### MCB vs RCBO - KEY VISUAL DIFFERENCES:
- **MCB**: Simple switch toggle, NO test button, narrow front face, rating printed (e.g., "B32")
- **RCBO**: Switch toggle + small TEST button (round, often red/white), "30mA" marking, rating + curve (e.g., "B32 30mA")
- **RCD**: WIDE device (2 modules), LARGE test button, "30mA" or "100mA" prominent

### Standard UK Circuit Ratings:
- Lighting: 6A (MCB B6)
- Smoke/Fire alarm: 6A (MCB B6)
- Immersion heater: 16A (MCB B16)
- Radial sockets: 20A (RCBO B20)
- Ring final: 32A (RCBO B32)
- Cooker: 32A or 40A (MCB B32/C32)
- Shower: 40A or 45A or 50A (RCBO B40/B45/B50)
- EV charger: 32A (RCBO B32)

### Type B vs Type C:
- Type B: Most domestic circuits (3-5x trip)
- Type C: Motors, inductive loads, garage doors (5-10x trip)
- Type D: Transformers, welders (10-20x trip)`;

// ============================================================================
// VALIDATION PROMPT - Second pass for uncertain circuits
// ============================================================================

const VALIDATION_PROMPT = `You are a UK electrical expert. Review these circuit detections and correct any errors.

Focus on:
1. MCB vs RCBO: Does it have a test button? MCB=NO, RCBO=YES
2. Rating: Is the amp rating clearly visible and correctly read?
3. Curve type: Is B/C/D correctly identified?
4. Label: Is the circuit description accurate?

For each circuit, either:
- CONFIRM: If detection is correct
- CORRECT: Provide fixed values with evidence

Return JSON:
{
  "validations": [
    {
      "index": number,
      "status": "confirmed" | "corrected",
      "corrections": {
        "device_category": "MCB | RCBO | RCD",
        "rating_amps": number,
        "curve": "B | C | D",
        "label_text": "string"
      },
      "evidence": "reason for correction"
    }
  ]
}`;

// ============================================================================
// UTILITIES
// ============================================================================

const parseAIResponse = (content: string, context: string = 'AI response'): any => {
  if (!content || content.trim() === '') {
    throw new Error(`${context} is empty`);
  }

  try {
    return JSON.parse(content);
  } catch {
    // Continue with extraction
  }

  const patterns = [
    /```json\s*\n([\s\S]*?)\n```/,
    /```\s*\n([\s\S]*?)\n```/,
    /({[\s\S]*})/
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      try {
        return JSON.parse((match[1] || match[0]).trim());
      } catch {
        continue;
      }
    }
  }

  throw new Error(`Could not parse ${context} as JSON`);
};

async function urlToBase64(url: string): Promise<{ mimeType: string; data: string }> {
  // Handle data URLs
  if (url.startsWith('data:')) {
    const match = url.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      return { mimeType: match[1], data: match[2] };
    }
    throw new Error('Invalid data URL format');
  }

  // Fetch external URLs
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = base64Encode(new Uint8Array(arrayBuffer));
  const contentType = response.headers.get('content-type') || 'image/jpeg';

  return { mimeType: contentType, data: base64 };
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function createSSEStream(): {
  stream: ReadableStream;
  sendEvent: (event: StreamEvent) => void;
  close: () => void;
} {
  let controller: ReadableStreamDefaultController<Uint8Array>;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(c) {
      controller = c;
    },
  });

  const sendEvent = (event: StreamEvent) => {
    const data = `data: ${JSON.stringify(event)}\n\n`;
    controller.enqueue(encoder.encode(data));
  };

  const close = () => {
    controller.close();
  };

  return { stream, sendEvent, close };
}

// ============================================================================
// MAIN ANALYSIS - Single Gemini Call
// ============================================================================

async function analyzeWithGemini(
  images: string[],
  hints: BoardReadRequest['hints'],
  sendEvent: (event: StreamEvent) => void
): Promise<{
  board: Partial<BoardStructure>;
  circuits: Partial<DetectedCircuit>[];
}> {
  sendEvent({ type: 'stage', stage: 'analyzing', message: 'Analysing board with AI...' });

  // Build prompt with hints
  let prompt = UNIFIED_BOARD_PROMPT;

  if (hints) {
    prompt += `\n\n## HINTS FROM USER
- Main switch side: ${hints.main_switch_side || 'not specified'}
- Expected ways: ${hints.expected_ways || 'not specified'}
- Board type: ${hints.board_type || 'domestic'}
- Is three phase: ${hints.is_three_phase === true ? 'YES - look for L1/L2/L3' : hints.is_three_phase === false ? 'NO - single phase' : 'not specified'}`;
  }

  // Prepare image parts
  const parts: any[] = [{ text: prompt }];

  for (const imageUrl of images.slice(0, 4)) {
    try {
      const { mimeType, data } = await urlToBase64(imageUrl);
      parts.push({ inlineData: { mimeType, data } });
    } catch (error) {
      console.error('Failed to process image:', error);
      sendEvent({ type: 'warning', message: `Could not process one image` });
    }
  }

  if (parts.length < 2) {
    throw new Error('No valid images to analyse');
  }

  sendEvent({ type: 'stage', stage: 'analyzing', message: 'Reading board labels and devices...' });

  const response = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: {
          maxOutputTokens: 8000,
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      }),
    },
    60000 // 60 second timeout for comprehensive analysis
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    throw new Error(`Analysis failed: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.find((p: any) => p.text)?.text;

  if (!text) {
    throw new Error('No response from AI');
  }

  const result = parseAIResponse(text, 'Board analysis');

  // Stream board info immediately
  if (result.board) {
    sendEvent({ type: 'board', data: result.board });

    const phaseType = result.board.is_three_phase ? 'three-phase' : 'single-phase';
    sendEvent({
      type: 'decision',
      message: `Detected ${result.board.brand || 'unknown'} ${phaseType} board with ${result.board.estimated_total_ways || '?'} ways`
    });
  }

  // Stream circuits in batches
  const circuits = result.circuits || [];
  const batchSize = 4;

  for (let i = 0; i < circuits.length; i += batchSize) {
    const batch = circuits.slice(i, i + batchSize).map((c: any) => ({
      ...c,
      source_model: 'gemini-2.0-flash'
    }));

    sendEvent({ type: 'circuits_batch', circuits: batch });

    // Small delay between batches for smooth UI animation
    if (i + batchSize < circuits.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Validation pass for uncertain circuits
  const uncertainCircuits = circuits.filter((c: any) => c.confidence !== 'high');

  if (uncertainCircuits.length > 0 && parts.length >= 2) {
    sendEvent({ type: 'stage', stage: 'validating', message: `Verifying ${uncertainCircuits.length} uncertain circuits...` });

    try {
      const validationParts = [
        { text: VALIDATION_PROMPT + '\n\nCircuits to validate:\n' + JSON.stringify(uncertainCircuits, null, 2) },
        ...parts.slice(1) // Include images for reference
      ];

      const validationResponse = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: validationParts }],
            generationConfig: {
              maxOutputTokens: 4000,
              temperature: 0.1, // Lower temp for more consistent corrections
              responseMimeType: 'application/json'
            }
          }),
        },
        30000 // 30 second timeout for validation
      );

      if (validationResponse.ok) {
        const validationData = await validationResponse.json();
        const validationText = validationData.candidates?.[0]?.content?.parts?.find((p: any) => p.text)?.text;

        if (validationText) {
          const validations = parseAIResponse(validationText, 'Validation');
          let correctedCount = 0;

          // Apply corrections
          for (const v of (validations.validations || [])) {
            if (v.status === 'corrected' && v.corrections) {
              const circuitIndex = circuits.findIndex((c: any) => c.index === v.index);
              if (circuitIndex >= 0) {
                const circuit = circuits[circuitIndex];

                // Apply corrections
                if (v.corrections.device_category) {
                  circuit.device.category = v.corrections.device_category;
                }
                if (v.corrections.rating_amps) {
                  circuit.device.rating_amps = v.corrections.rating_amps;
                }
                if (v.corrections.curve) {
                  circuit.device.curve = v.corrections.curve;
                  circuit.device.type = `${v.corrections.curve}${circuit.device.rating_amps || ''}`;
                }
                if (v.corrections.label_text) {
                  circuit.label_text = v.corrections.label_text;
                }

                circuit.confidence = 'high'; // Upgrade confidence after validation
                circuit.evidence = (circuit.evidence || '') + ' [Validated: ' + v.evidence + ']';
                correctedCount++;

                // Stream the correction
                sendEvent({ type: 'circuit_update', index: v.index, updates: circuit });
              }
            }
          }

          if (correctedCount > 0) {
            sendEvent({ type: 'decision', message: `Validation corrected ${correctedCount} circuits` });
          }
        }
      }
    } catch (validationError) {
      console.error('Validation pass failed:', validationError);
      sendEvent({ type: 'warning', message: 'Could not complete validation pass' });
    }
  }

  // Summary
  const highConfidence = circuits.filter((c: any) => c.confidence === 'high').length;
  const threePhaseCircuits = circuits.filter((c: any) => c.phase === '3P').length;
  const estimatedWays = result.board?.estimated_total_ways || 0;

  let summary = `Found ${circuits.length} circuits (${highConfidence} high confidence)`;
  if (threePhaseCircuits > 0) {
    summary += `, ${threePhaseCircuits} three-phase`;
  }

  sendEvent({ type: 'decision', message: summary });

  // Warn if circuit count doesn't match board size
  if (estimatedWays > 0 && circuits.length < estimatedWays - 2) {
    sendEvent({
      type: 'warning',
      message: `Board has ${estimatedWays} ways but only ${circuits.length} circuits detected - some may be missing`
    });
  }

  return {
    board: result.board || {},
    circuits: circuits.map((c: any) => ({ ...c, source_model: 'gemini-2.0-flash' }))
  };
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  console.log('board-read-stream | Simplified single-model analysis | ' + new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const { stream, sendEvent, close } = createSSEStream();

  // Start processing in background
  (async () => {
    try {
      const { images, hints }: BoardReadRequest = await req.json();

      if (!images || images.length === 0) {
        sendEvent({ type: 'error', message: 'At least one image is required' });
        close();
        return;
      }

      if (!geminiApiKey) {
        sendEvent({ type: 'error', message: 'Gemini API key not configured' });
        close();
        return;
      }

      sendEvent({ type: 'stage', stage: 'connecting', message: `Processing ${images.length} image(s)...` });

      // Single comprehensive Gemini analysis
      const result = await analyzeWithGemini(images, hints, sendEvent);

      // Send completion
      sendEvent({
        type: 'complete',
        metadata: {
          analysisTime: Date.now() - startTime,
          model: 'gemini-2.0-flash',
          imageCount: images.length,
          circuitCount: result.circuits.length,
          boardSize: result.board.estimated_total_ways || result.circuits.length,
          isThreePhase: result.board.is_three_phase || false
        }
      });

    } catch (error) {
      console.error('Stream error:', error);
      sendEvent({
        type: 'error',
        message: error instanceof Error ? error.message : 'Analysis failed'
      });
    } finally {
      close();
    }
  })();

  // Return streaming response immediately
  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
});
