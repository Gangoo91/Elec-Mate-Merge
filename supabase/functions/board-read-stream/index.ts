import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

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
  phases?: string[];
  confidence: 'high' | 'medium' | 'low';
  evidence: string;
  source_model: string;
}

interface BoardStructure {
  brand: string;
  model: string;
  main_switch_rating: number | null;
  spd_status: 'green_ok' | 'yellow_check' | 'red_replace' | 'not_present' | 'unknown';
  board_layout: '1P' | '3P-vertical' | '3P-horizontal';
  estimated_total_ways: number;
  evidence: string;
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

const urlToBase64 = async (url: string): Promise<{ mimeType: string; data: string }> => {
  if (url.startsWith('data:image')) {
    const match = url.match(/data:(.*?);base64,(.+)/);
    if (!match) throw new Error('Invalid data URL format');
    return { mimeType: match[1], data: match[2] };
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${response.status}`);

  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const arrayBuffer = await response.arrayBuffer();
  const base64Data = base64Encode(new Uint8Array(arrayBuffer));

  return { mimeType: contentType, data: base64Data };
};

const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs: number): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// ============================================================================
// STREAMING RESPONSE HELPER
// ============================================================================

function createSSEStream() {
  const encoder = new TextEncoder();
  let controller: ReadableStreamDefaultController<Uint8Array>;

  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      controller = c;
    }
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
// AI MODEL CALLS
// ============================================================================

async function analyzeWithGemini(
  images: string[],
  hints: BoardReadRequest['hints'],
  sendEvent: (event: StreamEvent) => void
): Promise<{
  board: Partial<BoardStructure>;
  circuits: Partial<DetectedCircuit>[];
}> {
  sendEvent({ type: 'stage', stage: 'gemini', message: 'Analysing board structure...' });

  // OPTIMIZED PROMPT - Concise but comprehensive
  const systemPrompt = `UK electrician: Analyse consumer unit photo. Return JSON only.

BOARD: brand, model, main_switch_rating (amps), spd_status (green_ok/yellow_check/red_replace/not_present), board_layout (1P/3P-vertical/3P-horizontal), estimated_total_ways, evidence.

THREE-PHASE DETECTION:
- 3P boards: L1/L2/L3 busbar labels, 3 rows of MCBs, phase colour coding (brown/black/grey or red/yellow/blue)
- 3-pole MCBs: 3 adjacent positions with linked toggles, same rating, wider device
- Mark 3P circuits with phase:"3P", phases:["L1","L2","L3"]
- Common 3P loads: cookers 32A+, EV chargers, motors, HVAC

CIRCUITS (left→right, top→bottom for 3P):
- index, label_text (expand abbreviations), device.category/type/rating_amps/curve
- phase (1P or 3P), confidence (high/medium/low)
- pictograms [{type, confidence}] - types: SOCKET,LIGHTING,COOKER_OVEN,HOB,SHOWER,IMMERSION,GARAGE,BOILER,EV_CHARGER

JSON: {"board":{...},"circuits":[{...}]}`;

  const parts: any[] = [{ text: systemPrompt }];

  for (const imageUrl of images.slice(0, 4)) {
    const { mimeType, data } = await urlToBase64(imageUrl);
    parts.push({ inlineData: { mimeType, data } });
  }

  if (hints) {
    parts[0].text += `\n\nHINTS:
- Main switch side: ${hints.main_switch_side || 'unknown'}
- Expected ways: ${hints.expected_ways || 'unknown'}
- Board type: ${hints.board_type || 'domestic'}
- Three phase: ${hints.is_three_phase || 'unknown'}`;
  }

  const response = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: {
          maxOutputTokens: 4000,
          temperature: 0.2,
          responseMimeType: 'application/json'
        }
      }),
    },
    45000
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.find((p: any) => p.text)?.text;

  if (!text) {
    throw new Error('No response from Gemini');
  }

  const result = parseAIResponse(text, 'Gemini response');

  // Stream board info immediately
  if (result.board) {
    sendEvent({ type: 'board', data: result.board });
    sendEvent({ type: 'decision', message: `Detected ${result.board.brand || 'unknown'} board with ${result.board.estimated_total_ways || '?'} ways` });
  }

  // Stream circuits in batches for smooth UI
  const circuits = result.circuits || [];
  const batchSize = 4;

  for (let i = 0; i < circuits.length; i += batchSize) {
    const batch = circuits.slice(i, i + batchSize).map((c: any) => ({
      ...c,
      source_model: 'gemini'
    }));

    sendEvent({ type: 'circuits_batch', circuits: batch });

    // Small delay between batches for visual effect
    if (i + batchSize < circuits.length) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  sendEvent({ type: 'stage', stage: 'gemini_complete', message: `Found ${circuits.length} circuits` });

  return {
    board: result.board || {},
    circuits: circuits.map((c: any) => ({ ...c, source_model: 'gemini' }))
  };
}

async function analyzeWithClaude(
  images: string[],
  geminiCircuits: Partial<DetectedCircuit>[],
  sendEvent: (event: StreamEvent) => void
): Promise<{
  labelCorrections: Map<number, string>;
  additionalCircuits: Partial<DetectedCircuit>[];
}> {
  if (!anthropicApiKey) {
    return { labelCorrections: new Map(), additionalCircuits: [] };
  }

  sendEvent({ type: 'stage', stage: 'claude', message: 'Enhancing label OCR...' });

  // OPTIMIZED: Concise prompt
  const systemPrompt = `OCR specialist: Read circuit labels in UK consumer unit. Fix errors, expand abbreviations. Return JSON only.

Current: ${geminiCircuits.slice(0, 20).map(c => `${c.index}:"${c.label_text || '?'}"`).join(', ')}

Abbreviations: K=Kitchen, Lts=Lights, Skt=Sockets, Dn=Down, Up=Upstairs, FF=First Floor, GF=Ground Floor, Ext=External

Return: {"label_readings":[{"position":1,"text_read":"Label","confidence":0.9}],"corrections":[{"position":3,"original":"K Skt","corrected":"Kitchen Sockets"}],"missed_circuits":[{"position":12,"text_read":"Garage"}]}`;

  const imageContents = await Promise.all(
    images.slice(0, 2).map(async (url) => {
      const { mimeType, data } = await urlToBase64(url);
      return {
        type: "image" as const,
        source: { type: "base64" as const, media_type: mimeType, data }
      };
    })
  );

  const response = await fetchWithTimeout(
    'https://api.anthropic.com/v1/messages',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: [...imageContents, { type: 'text', text: systemPrompt }]
        }]
      }),
    },
    30000
  );

  if (!response.ok) {
    sendEvent({ type: 'warning', message: 'Claude OCR unavailable, using Gemini results only' });
    return { labelCorrections: new Map(), additionalCircuits: [] };
  }

  const data = await response.json();
  const text = data.content?.find((c: any) => c.type === 'text')?.text;

  if (!text) {
    return { labelCorrections: new Map(), additionalCircuits: [] };
  }

  try {
    const result = parseAIResponse(text, 'Claude OCR response');

    const corrections = new Map<number, string>();

    // Apply corrections and stream updates
    for (const correction of result.corrections || []) {
      corrections.set(correction.position, correction.corrected);
      sendEvent({
        type: 'circuit_update',
        index: correction.position,
        updates: { label_text: correction.corrected, source_model: 'gemini+claude' }
      });
      sendEvent({ type: 'decision', message: `Position ${correction.position}: "${correction.original}" → "${correction.corrected}"` });
    }

    // High confidence readings
    for (const reading of result.label_readings || []) {
      if (reading.confidence > 0.85 && reading.text_read && !corrections.has(reading.position)) {
        corrections.set(reading.position, reading.text_read);
        sendEvent({
          type: 'circuit_update',
          index: reading.position,
          updates: { label_text: reading.text_read }
        });
      }
    }

    // Missed circuits
    const additionalCircuits = (result.missed_circuits || []).map((c: any) => {
      sendEvent({
        type: 'circuits_batch',
        circuits: [{
          index: c.position,
          label_text: c.text_read,
          device: { category: 'MCB', type: '', rating_amps: null, curve: null, breaking_capacity_kA: null },
          pictograms: [],
          phase: '1P',
          confidence: 'low',
          evidence: 'Detected by Claude OCR',
          source_model: 'claude-ocr'
        }]
      });

      return {
        index: c.position,
        label_text: c.text_read,
        confidence: 'medium' as const,
        source_model: 'claude-ocr'
      };
    });

    if (corrections.size > 0 || additionalCircuits.length > 0) {
      sendEvent({ type: 'stage', stage: 'claude_complete', message: `${corrections.size} labels refined, ${additionalCircuits.length} new circuits found` });
    }

    return { labelCorrections: corrections, additionalCircuits };

  } catch (e) {
    console.error('Claude OCR parse error:', e);
    return { labelCorrections: new Map(), additionalCircuits: [] };
  }
}

async function verifyWithOpenAI(
  images: string[],
  circuits: Partial<DetectedCircuit>[],
  sendEvent: (event: StreamEvent) => void
): Promise<{
  deviceCorrections: Map<number, Partial<DetectedCircuit['device']>>;
}> {
  if (!openaiApiKey) {
    return { deviceCorrections: new Map() };
  }

  sendEvent({ type: 'stage', stage: 'openai', message: 'Verifying device ratings...' });

  // OPTIMIZED: Concise prompt
  const systemPrompt = `Electrical device specialist: Verify MCB/RCBO ratings. Return JSON only.

Verify: ${circuits.slice(0, 20).map(c => `${c.index}:${c.device?.category || '?'} ${c.device?.rating_amps || '?'}A`).join(', ')}

Device ID: MCB=no test button. RCBO=small test button. RCD=2 modules. 3-pole MCB=linked toggles, triple width.

Return ONLY corrections: {"device_verifications":[{"position":3,"verified":false,"corrections":{"category":"RCBO","rating_amps":16,"curve":"B"},"reason":"Test button visible"}]}`;

  const imageContents = await Promise.all(
    images.slice(0, 2).map(async (url) => {
      const { mimeType, data } = await urlToBase64(url);
      return {
        type: "image_url" as const,
        image_url: { url: `data:${mimeType};base64,${data}` }
      };
    })
  );

  const response = await fetchWithTimeout(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 2000,
        temperature: 0.2,
        messages: [{
          role: 'user',
          content: [...imageContents, { type: 'text', text: systemPrompt }]
        }],
        response_format: { type: 'json_object' }
      }),
    },
    30000
  );

  if (!response.ok) {
    sendEvent({ type: 'warning', message: 'OpenAI verification unavailable' });
    return { deviceCorrections: new Map() };
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    return { deviceCorrections: new Map() };
  }

  try {
    const result = parseAIResponse(text, 'OpenAI verification response');

    const deviceCorrections = new Map<number, Partial<DetectedCircuit['device']>>();

    for (const verification of result.device_verifications || []) {
      if (!verification.verified && verification.corrections) {
        deviceCorrections.set(verification.position, verification.corrections);

        // Stream the update
        sendEvent({
          type: 'circuit_update',
          index: verification.position,
          updates: { device: verification.corrections }
        });

        if (verification.reason) {
          sendEvent({ type: 'decision', message: `Position ${verification.position}: ${verification.reason}` });
        }
      }
    }

    if (deviceCorrections.size > 0) {
      sendEvent({ type: 'stage', stage: 'openai_complete', message: `${deviceCorrections.size} device corrections` });
    }

    return { deviceCorrections };

  } catch (e) {
    console.error('OpenAI parse error:', e);
    return { deviceCorrections: new Map() };
  }
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  console.log('board-read-stream | Streaming multi-model ensemble | ' + new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const { stream, sendEvent, close } = createSSEStream();

  // Start processing in background
  (async () => {
    try {
      const { images, hints, options }: BoardReadRequest = await req.json();

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

      sendEvent({ type: 'stage', stage: 'start', message: `Processing ${images.length} image(s)...` });

      // Stage 1: Gemini
      const geminiResult = await analyzeWithGemini(images, hints, sendEvent);

      // Stage 2: Claude OCR (unless fast mode)
      let claudeResult = { labelCorrections: new Map<number, string>(), additionalCircuits: [] as Partial<DetectedCircuit>[] };
      if (!options?.fast_mode && options?.use_claude_ocr !== false) {
        claudeResult = await analyzeWithClaude(images, geminiResult.circuits, sendEvent);
      }

      // Stage 3: OpenAI Verification (unless fast mode)
      let openaiResult = { deviceCorrections: new Map<number, Partial<DetectedCircuit['device']>>() };
      if (!options?.fast_mode && options?.use_openai_components !== false) {
        openaiResult = await verifyWithOpenAI(images, geminiResult.circuits, sendEvent);
      }

      // Build models used list
      const modelsUsed: string[] = ['gemini'];
      if (claudeResult.labelCorrections.size > 0) modelsUsed.push('claude-ocr');
      if (openaiResult.deviceCorrections.size > 0) modelsUsed.push('openai-verify');

      // Send completion
      sendEvent({
        type: 'complete',
        metadata: {
          analysisTime: Date.now() - startTime,
          modelsUsed,
          imageCount: images.length,
          circuitCount: geminiResult.circuits.length + claudeResult.additionalCircuits.length,
          boardSize: geminiResult.board.estimated_total_ways || geminiResult.circuits.length
        }
      });

    } catch (error) {
      console.error('Stream error:', error);
      sendEvent({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
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
