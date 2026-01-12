import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
// Note: Claude/Anthropic removed - using Gemini + OpenAI only

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
  live_conductor_size_mm2: number | null;
  cpc_size_mm2: number | null;
  pictograms: Array<{ type: string; confidence: number }>;
  phase: '1P' | '3P';
  phases?: string[];
  confidence: 'high' | 'medium' | 'low';
  evidence: string;
  notes: string;
  source_model: string;
}

interface BoardStructure {
  brand: string;
  model: string;
  main_switch_rating: number | null;
  spd_status: 'green_ok' | 'yellow_check' | 'red_replace' | 'not_present' | 'unknown';
  board_layout: '1P' | '3P-vertical' | '3P-horizontal';
  estimated_total_ways: number;
  ways_per_circuit: number;
  evidence: string;
}

interface AnalysisResult {
  circuits: DetectedCircuit[];
  board: BoardStructure;
  metadata: {
    boardSize: number;
    analysisTime: number;
    modelsUsed: string[];
    imageCount: number;
  };
  warnings: string[];
  decisions: string[];
}

// ============================================================================
// UTILITIES
// ============================================================================

const parseAIResponse = (content: string, context: string = 'AI response'): any => {
  if (!content || content.trim() === '') {
    throw new Error(`${context} is empty`);
  }

  // Try direct JSON parse first
  try {
    return JSON.parse(content);
  } catch {
    // Continue with extraction patterns
  }

  // Extraction patterns
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
// AI MODEL CALLS
// ============================================================================

/**
 * Stage 1: Gemini Vision - Board Structure Analysis
 * OPTIMIZED: Focused prompt, fewer tokens, faster response
 */
async function analyzeWithGemini(images: string[], hints: BoardReadRequest['hints']): Promise<{
  board: Partial<BoardStructure>;
  circuits: Partial<DetectedCircuit>[];
}> {
  console.log('Stage 1: Gemini Vision - Board Structure Analysis');

  // OPTIMIZED PROMPT - Concise but comprehensive
  const systemPrompt = `UK electrician: Analyse consumer unit photo. Return JSON only.

BOARD: brand, model, main_switch_rating (amps), spd_status (green_ok/yellow_check/red_replace/not_present), board_layout (1P/3P-vertical/3P-horizontal), estimated_total_ways, evidence.

THREE-PHASE DETECTION:
- 3P boards: L1/L2/L3 busbar labels, 3 rows of MCBs, phase colour coding (brown/black/grey or red/yellow/blue)
- 3-pole MCBs: 3 adjacent positions with linked toggles, same rating, wider device
- Mark 3P circuits with phase:"3P", phases:["L1","L2","L3"]
- Common 3P loads: cookers 32A+, EV chargers, motors, HVAC

CIRCUITS (left→right, top→bottom for 3P):
- index (position 1,2,3...)
- label_text (exact text, expand abbreviations: "K Skt"→"Kitchen Sockets")
- device.category (MCB/RCBO/RCD/AFDD/Isolator), device.type (B32/C20 etc), device.rating_amps, device.curve (B/C/D)
- phase (1P or 3P)
- confidence (high/medium/low)
- pictograms [{type, confidence}] - types: SOCKET,LIGHTING,COOKER_OVEN,HOB,SHOWER,IMMERSION,GARAGE,SMOKE_ALARM,BOILER,FREEZER,FRIDGE,WASHING_MACHINE,DISHWASHER,EV_CHARGER,OUTDOOR,RING_MAIN

JSON format:
{"board":{...},"circuits":[{...}],"three_phase_groups":[{"circuit_indices":[5,6,7],"description":"Cooker 3P","rating":32}]}`;

  const parts: any[] = [{ text: systemPrompt }];

  // Add images
  for (const imageUrl of images.slice(0, 4)) {
    const { mimeType, data } = await urlToBase64(imageUrl);
    parts.push({ inlineData: { mimeType, data } });
  }

  // Add hints if provided
  if (hints) {
    parts[0].text += `\n\nHINTS FROM USER:
- Main switch side: ${hints.main_switch_side || 'unknown'}
- Expected ways: ${hints.expected_ways || 'unknown'}
- Board type: ${hints.board_type || 'domestic'}
- Three phase: ${hints.is_three_phase || 'unknown'}`;
  }

  const response = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiApiKey}`,
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
    const errorText = await response.text();
    console.error('Gemini error:', errorText);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.find((p: any) => p.text)?.text;

  if (!text) {
    throw new Error('No response from Gemini');
  }

  const result = parseAIResponse(text, 'Gemini response');
  console.log(`Gemini detected ${result.circuits?.length || 0} circuits`);

  return {
    board: result.board || {},
    circuits: (result.circuits || []).map((c: any) => ({ ...c, source_model: 'gemini' }))
  };
}

/**
 * Stage 3: OpenAI - Component Rating Verification
 * OPTIMIZED: Shorter prompt, only return corrections
 */
async function verifyWithOpenAI(images: string[], circuits: Partial<DetectedCircuit>[]): Promise<{
  deviceCorrections: Map<number, Partial<DetectedCircuit['device']>>;
}> {
  if (!openaiApiKey) {
    console.log('Stage 3: Skipped (no OpenAI API key)');
    return { deviceCorrections: new Map() };
  }

  console.log('Stage 3: OpenAI - Component Verification');

  // OPTIMIZED: Concise prompt, only return corrections
  const systemPrompt = `Electrical device specialist: Verify MCB/RCBO ratings in UK consumer unit. Return JSON only.

Verify these detections:
${circuits.slice(0, 20).map(c => `${c.index}:${c.device?.category || '?'} ${c.device?.rating_amps || '?'}A`).join(', ')}

Device ID: MCB=no test button. RCBO=small test button (red/white). RCD=2 modules, large test button. AFDD=marked "AFDD"/"Arc". 3-pole MCB=3 linked toggles, triple width.

Ratings: 6,10,16,20,32,40,50,63A. Curves: B(domestic), C(motors), D(high inrush).

THREE-PHASE: Look for 3-pole linked devices (20-63A typical), L1/L2/L3 busbar connections.

Return ONLY corrections (skip verified): {"device_verifications":[{"position":3,"verified":false,"corrections":{"category":"RCBO","rating_amps":16,"curve":"B"},"reason":"Test button visible"}]}`;

  const imageContents = await Promise.all(
    images.slice(0, 2).map(async (url) => {
      const { mimeType, data } = await urlToBase64(url);
      return {
        type: "image_url" as const,
        image_url: {
          url: `data:${mimeType};base64,${data}`
        }
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
          content: [
            ...imageContents,
            { type: 'text', text: systemPrompt }
          ]
        }],
        response_format: { type: 'json_object' }
      }),
    },
    30000
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI error:', errorText);
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
      }
    }

    console.log(`OpenAI verification: ${deviceCorrections.size} device corrections`);
    return { deviceCorrections };

  } catch (e) {
    console.error('OpenAI parse error:', e);
    return { deviceCorrections: new Map() };
  }
}

// ============================================================================
// RESULT MERGING
// ============================================================================

function mergeResults(
  geminiResult: { board: Partial<BoardStructure>; circuits: Partial<DetectedCircuit>[] },
  openaiResult: { deviceCorrections: Map<number, Partial<DetectedCircuit['device']>> },
  hints: BoardReadRequest['hints']
): AnalysisResult {
  const decisions: string[] = [];
  const warnings: string[] = [];
  const modelsUsed: string[] = ['gemini'];

  if (openaiResult.deviceCorrections.size > 0) modelsUsed.push('openai-verify');

  // Merge circuits
  const circuitMap = new Map<number, DetectedCircuit>();

  // Start with Gemini results
  for (const circuit of geminiResult.circuits) {
    const index = circuit.index || 0;
    circuitMap.set(index, {
      index,
      label_text: circuit.label_text || `Circuit ${index}`,
      device: {
        category: circuit.device?.category || 'MCB',
        type: circuit.device?.type || '',
        rating_amps: circuit.device?.rating_amps || null,
        curve: circuit.device?.curve || null,
        breaking_capacity_kA: circuit.device?.breaking_capacity_kA || null
      },
      live_conductor_size_mm2: circuit.live_conductor_size_mm2 || null,
      cpc_size_mm2: circuit.cpc_size_mm2 || null,
      pictograms: circuit.pictograms || [],
      phase: circuit.phase || '1P',
      phases: circuit.phases,
      confidence: circuit.confidence || 'medium',
      evidence: circuit.evidence || '',
      notes: circuit.notes || '',
      source_model: 'gemini'
    });
  }

  // Apply OpenAI device corrections
  for (const [index, deviceCorrection] of openaiResult.deviceCorrections) {
    const circuit = circuitMap.get(index);
    if (circuit && deviceCorrection) {
      const oldDevice = `${circuit.device.category} ${circuit.device.rating_amps || '?'}A`;
      circuit.device = { ...circuit.device, ...deviceCorrection };
      const newDevice = `${circuit.device.category} ${circuit.device.rating_amps || '?'}A`;
      if (oldDevice !== newDevice) {
        decisions.push(`Position ${index}: Device updated from ${oldDevice} to ${newDevice} (OpenAI verify)`);
        circuit.source_model = 'gemini+openai';
      }
    }
  }

  // Sort circuits by index
  const circuits = Array.from(circuitMap.values()).sort((a, b) => a.index - b.index);

  // Build board structure
  const board: BoardStructure = {
    brand: geminiResult.board.brand || 'Unknown',
    model: geminiResult.board.model || '',
    main_switch_rating: geminiResult.board.main_switch_rating || null,
    spd_status: geminiResult.board.spd_status || 'unknown',
    board_layout: geminiResult.board.board_layout || '1P',
    estimated_total_ways: geminiResult.board.estimated_total_ways || circuits.length,
    ways_per_circuit: geminiResult.board.ways_per_circuit || 1,
    evidence: geminiResult.board.evidence || ''
  };

  // Detect three-phase circuits
  const threePhaseCircuits = circuits.filter(c => c.phase === '3P');
  if (threePhaseCircuits.length > 0) {
    decisions.push(`Detected ${threePhaseCircuits.length} three-phase circuit group(s)`);
    if (board.board_layout === '1P') {
      board.board_layout = '3P-vertical';
      decisions.push('Board layout updated to 3P based on circuit detection');
    }
  }

  // Check for missing circuits
  if (hints?.expected_ways && circuits.length < hints.expected_ways * 0.9) {
    warnings.push(`Expected ${hints.expected_ways} ways but only detected ${circuits.length}. Some circuits may be missing.`);
  }

  // Check confidence levels
  const lowConfidenceCount = circuits.filter(c => c.confidence === 'low').length;
  if (lowConfidenceCount > circuits.length * 0.3) {
    warnings.push(`${lowConfidenceCount} circuits have low confidence. Consider retaking photos with better lighting.`);
  }

  return {
    circuits,
    board,
    metadata: {
      boardSize: board.estimated_total_ways,
      analysisTime: 0, // Will be set by caller
      modelsUsed,
      imageCount: 0 // Will be set by caller
    },
    warnings,
    decisions
  };
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  console.log('board-read-enhanced | Multi-model ensemble | ' + new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const { images, hints, options }: BoardReadRequest = await req.json();

    if (!images || images.length === 0) {
      throw new Error('At least one image is required');
    }

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    console.log(`Processing ${images.length} image(s)`, {
      hints,
      options,
      fastMode: options?.fast_mode
    });

    // Stage 1: Gemini - Board Structure (always runs)
    const geminiResult = await analyzeWithGemini(images, hints);

    // Stage 2: OpenAI Verification (optional enhancement)
    let openaiResult = { deviceCorrections: new Map<number, Partial<DetectedCircuit['device']>>() };

    if (!options?.fast_mode && options?.use_openai_components !== false && openaiApiKey) {
      console.log('Running OpenAI device verification...');
      try {
        openaiResult = await verifyWithOpenAI(images, geminiResult.circuits);
      } catch (e) {
        console.error('OpenAI verification error:', e);
      }
    }

    // Merge results
    const result = mergeResults(geminiResult, openaiResult, hints);

    // Add metadata
    result.metadata.analysisTime = Date.now() - startTime;
    result.metadata.imageCount = images.length;

    console.log(`Analysis complete in ${result.metadata.analysisTime}ms:`, {
      circuits: result.circuits.length,
      modelsUsed: result.metadata.modelsUsed,
      decisions: result.decisions.length,
      warnings: result.warnings.length
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Error after ${duration}ms:`, error);

    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error',
      circuits: [],
      warnings: ['Analysis failed. Please try again.'],
      metadata: {
        analysisTime: duration,
        modelsUsed: [],
        imageCount: 0
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
