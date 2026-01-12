import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

const UNIFIED_BOARD_PROMPT = `You are an expert UK electrical installation analyst. Analyse the consumer unit photo(s) with precision and return complete JSON.

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

1. MCB vs RCBO: The most common error! MCBs have NO test button. RCBOs have a small test button.
2. Don't guess ratings - if unreadable, use null
3. Expand ALL abbreviations in label_text
4. Include spare/blank positions with label_text: "Spare" and device: null
5. For 3P boards, determine phase assignment for EVERY circuit
6. Be thorough - don't miss any circuits`;

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
          temperature: 0.2,
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

  // Summary
  const highConfidence = circuits.filter((c: any) => c.confidence === 'high').length;
  const threePhaseCircuits = circuits.filter((c: any) => c.phase === '3P').length;

  let summary = `Found ${circuits.length} circuits (${highConfidence} high confidence)`;
  if (threePhaseCircuits > 0) {
    summary += `, ${threePhaseCircuits} three-phase`;
  }

  sendEvent({ type: 'decision', message: summary });

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
