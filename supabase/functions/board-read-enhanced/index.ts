import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { captureException } from "../_shared/sentry.ts";

// API keys from environment variables (set in Supabase Dashboard > Edge Functions > Secrets)
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

// NOTE: Supabase client is created inside the request handler to ensure
// environment variables are available (they may not be during cold start)

// ============================================================================
// OCR PREPROCESSING TYPES
// ============================================================================

interface CircuitOCRHint {
  position_index: number;
  detected_label: string | null;
  detected_rating: string | null;
  detected_curve: string | null;
  detected_device_marking: string | null;
  raw_texts: string[];
}

interface OCRResult {
  success: boolean;
  circuit_hints: CircuitOCRHint[];
  board_hints: {
    detected_brand: string | null;
    detected_model: string | null;
    detected_main_switch: string | null;
    all_ratings_found: string[];
    all_labels_found: string[];
  };
  raw_full_text: string;
  processing_time_ms: number;
}

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
// OCR PREPROCESSING
// ============================================================================

/**
 * Call OCR preprocessor to extract text from board images
 * Runs Google Cloud Vision API for high-accuracy text detection
 */
async function runOCRPreprocessing(images: string[], supabaseUrl: string, supabaseServiceKey: string): Promise<OCRResult | null> {
  try {
    console.log('Running OCR preprocessing on images...');

    const response = await fetchWithTimeout(
      `${supabaseUrl}/functions/v1/board-ocr-preprocess`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({ images }),
      },
      15000 // 15 second timeout for OCR
    );

    if (!response.ok) {
      console.warn('OCR preprocessing failed:', response.status);
      return null;
    }

    const result: OCRResult = await response.json();

    if (result.success) {
      console.log(`OCR completed in ${result.processing_time_ms}ms:`, {
        circuitHints: result.circuit_hints.length,
        ratingsFound: result.board_hints.all_ratings_found.length,
        labelsFound: result.board_hints.all_labels_found.length,
        detectedBrand: result.board_hints.detected_brand,
      });
    }

    return result;
  } catch (error) {
    console.error('OCR preprocessing error:', error);
    return null;
  }
}

/**
 * Build OCR hints section for Gemini prompt
 */
function buildOCRHintsPrompt(ocrResult: OCRResult | null): string {
  if (!ocrResult || !ocrResult.success) {
    return '';
  }

  let prompt = `

### OCR PRE-SCAN RESULTS (High-Confidence Text Detection)

**Detected Text Labels:** ${ocrResult.board_hints.all_labels_found.slice(0, 20).join(', ') || 'None detected'}

**Detected Ratings:** ${ocrResult.board_hints.all_ratings_found.join(', ') || 'None detected'}

**Raw Text Extracted:**
${ocrResult.raw_full_text.slice(0, 500)}

`;

  // Add circuit-specific hints if available
  if (ocrResult.circuit_hints.length > 0) {
    prompt += `**Per-Position OCR Hints:**
`;
    for (const hint of ocrResult.circuit_hints.slice(0, 15)) {
      const parts = [];
      if (hint.detected_label) parts.push(`label:"${hint.detected_label}"`);
      if (hint.detected_rating) parts.push(`rating:${hint.detected_rating}`);
      if (hint.detected_curve) parts.push(`curve:${hint.detected_curve}`);
      if (hint.detected_device_marking) parts.push(`device:${hint.detected_device_marking}`);

      if (parts.length > 0) {
        prompt += `Position ${hint.position_index}: ${parts.join(', ')}
`;
      }
    }
  }

  prompt += `
IMPORTANT: Use the OCR hints above to verify text that may be difficult to read in the image. The OCR has higher accuracy for small/faded text.
`;

  return prompt;
}

// ============================================================================
// RAG: MANUFACTURER KNOWLEDGE BASE
// ============================================================================

interface ManufacturerKnowledge {
  manufacturer: string;
  model_pattern: string | null;
  visual_cues: any;
  circuit_numbering: string;
  main_switch_position: string;
  mcb_features: string | null;
  rcbo_features: string | null;
  rcd_features: string | null;
  afdd_features: string | null;
  abbreviations: any;
  three_phase_layout: any;
  content: string;
}

/**
 * Query manufacturer knowledge base for brand-specific information
 */
async function getManufacturerKnowledge(brand: string, supabase: any): Promise<ManufacturerKnowledge | null> {
  try {
    const { data, error } = await supabase
      .from('board_manufacturer_knowledge')
      .select('*')
      .ilike('manufacturer', `%${brand}%`)
      .limit(1)
      .single();

    if (error || !data) {
      console.log(`No manufacturer knowledge found for: ${brand}`);
      return null;
    }

    console.log(`Found manufacturer knowledge for: ${data.manufacturer}`);
    return data as ManufacturerKnowledge;
  } catch (e) {
    console.error('Error querying manufacturer knowledge:', e);
    return null;
  }
}

/**
 * Fetch reference images for a brand to use as few-shot examples
 * Returns up to 2 verified reference images for the detected brand
 */
async function getReferenceImages(brand: string, supabase: any): Promise<string[]> {
  try {
    // Get verified reference images for this brand (prioritize dirty/real-world)
    const { data, error } = await supabase
      .from('board_reference_images')
      .select('image_url')
      .ilike('manufacturer', `%${brand}%`)
      .eq('verified', true)
      .in('image_type', ['in_situ_dirty', 'in_situ_clean', 'product_catalogue'])
      .order('image_type', { ascending: true }) // dirty first
      .limit(2);

    if (error || !data || data.length === 0) {
      console.log(`No reference images found for: ${brand}`);
      return [];
    }

    console.log(`Found ${data.length} reference images for: ${brand}`);
    return data.map(d => d.image_url).filter(Boolean);
  } catch (e) {
    console.error('Error fetching reference images:', e);
    return [];
  }
}

interface TrainingExample {
  image_url: string;
  circuits: any[];
  ratings_distribution: Record<string, number>;
  total_ways: number;
  devices: {
    mcbs: number;
    rcbos: number;
    rcds: number;
  };
}

/**
 * Fetch verified training examples with full analysis context
 * Returns up to 2 examples with circuit details for few-shot learning
 */
async function getTrainingExamples(brand: string, supabase: any): Promise<TrainingExample[]> {
  try {
    const { data, error } = await supabase
      .from('board_training_analysis')
      .select(`
        circuits,
        ratings_distribution,
        total_ways,
        mcb_count,
        rcbo_count,
        rcd_count_devices,
        image_id,
        board_reference_images!inner(image_url)
      `)
      .ilike('manufacturer', `%${brand}%`)
      .eq('human_verified', true)
      .not('circuits', 'is', null)
      .limit(2);

    if (error || !data || data.length === 0) {
      console.log(`No training examples found for: ${brand}`);
      return [];
    }

    console.log(`Found ${data.length} training examples for: ${brand}`);

    return data.map(d => ({
      image_url: (d.board_reference_images as any)?.image_url || '',
      circuits: d.circuits || [],
      ratings_distribution: d.ratings_distribution || {},
      total_ways: d.total_ways || 0,
      devices: {
        mcbs: d.mcb_count || 0,
        rcbos: d.rcbo_count || 0,
        rcds: d.rcd_count_devices || 0,
      },
    })).filter(e => e.image_url);
  } catch (e) {
    console.error('Error fetching training examples:', e);
    return [];
  }
}

/**
 * Build training examples context for Gemini prompt
 */
function buildTrainingExamplesPrompt(examples: TrainingExample[]): string {
  if (examples.length === 0) return '';

  let prompt = `\n\n### VERIFIED TRAINING EXAMPLES (same brand)\n`;

  for (let i = 0; i < examples.length; i++) {
    const ex = examples[i];
    prompt += `\nExample ${i + 1}: ${ex.total_ways}-way board\n`;
    prompt += `- Devices: ${ex.devices.mcbs} MCBs, ${ex.devices.rcbos} RCBOs, ${ex.devices.rcds} RCDs\n`;

    const ratings = Object.entries(ex.ratings_distribution || {})
      .filter(([_, count]) => count > 0)
      .map(([rating, count]) => `${rating}x${count}`)
      .join(', ');
    if (ratings) {
      prompt += `- Ratings seen: ${ratings}\n`;
    }

    // Show first few circuits as examples
    if (ex.circuits && ex.circuits.length > 0) {
      prompt += `- Sample circuits:\n`;
      for (const circuit of ex.circuits.slice(0, 5)) {
        const label = circuit.label_text ? ` "${circuit.label_text}"` : '';
        prompt += `  * Pos ${circuit.position}: ${circuit.device_type} ${circuit.curve || ''}${circuit.rating_amps || '?'}A${label}\n`;
      }
    }
  }

  prompt += `\nUse these examples to understand typical circuit layouts and labelling patterns for this brand.\n`;
  return prompt;
}

/**
 * Build enhanced prompt with manufacturer-specific context
 */
function buildEnhancedPrompt(knowledge: ManufacturerKnowledge | null): string {
  if (!knowledge) {
    return '';
  }

  let prompt = `

### MANUFACTURER CONTEXT: ${knowledge.manufacturer.toUpperCase()}

**Visual Identification:**
${knowledge.visual_cues?.distinctive || 'Standard board design'}

**Circuit Numbering:** ${knowledge.circuit_numbering} from ${knowledge.main_switch_position} side

**Device Identification for ${knowledge.manufacturer}:**
- MCB: ${knowledge.mcb_features || 'Standard MCB features'}
- RCBO: ${knowledge.rcbo_features || 'Has test button, combined RCD+MCB'}
- RCD: ${knowledge.rcd_features || 'Two module width, large test button'}
${knowledge.afdd_features ? `- AFDD: ${knowledge.afdd_features}` : ''}

**Label Abbreviations (${knowledge.manufacturer} boards):**
${Object.entries(knowledge.abbreviations || {}).map(([abbr, full]) => `- "${abbr}" = "${full}"`).join('\n')}

**Three-Phase Layout:**
${knowledge.three_phase_layout?.vertical_layout ? 'Vertical: L1 top, L2 middle, L3 bottom' : 'Check busbar labels for phase order'}
`;

  return prompt;
}

/**
 * Quick brand detection pass using Gemini
 */
async function detectBrand(images: string[]): Promise<string | null> {
  console.log('Running quick brand detection pass...');

  const parts: any[] = [{
    text: `Identify the manufacturer/brand of this UK consumer unit/distribution board. Return ONLY the brand name (e.g., "Hager", "MK", "Schneider", "Wylex", "Crabtree", "Contactum"). Look for logo, distinctive colours, or text. Return "Unknown" if unsure. Just the brand name, nothing else.`
  }];

  // Add first image only for quick detection
  const { mimeType, data } = await urlToBase64(images[0]);
  parts.push({ inlineData: { mimeType, data } });

  try {
    const response = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts }],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.1,
          }
        }),
      },
      20000 // 20 second timeout for brand detection
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Brand detection failed:', {
        status: response.status,
        body: errorText.slice(0, 200)
      });
      return null;
    }

    const responseData = await response.json();
    // Filter for text parts only (handle Gemini 3 thinking blocks)
    const textParts = responseData.candidates?.[0]?.content?.parts?.filter((p: any) => p.text);
    const text = textParts?.[0]?.text;

    if (text) {
      const brand = text.trim().replace(/["\n]/g, '');
      console.log(`Detected brand: ${brand}`);
      return brand === 'Unknown' ? null : brand;
    }
  } catch (e) {
    console.error('Brand detection error:', e);
  }

  return null;
}

// ============================================================================
// AI MODEL CALLS
// ============================================================================

/**
 * Stage 1: Gemini Vision - Board Structure Analysis
 * ENHANCED: Includes manufacturer-specific RAG context + OCR hints + reference images + training examples
 */
async function analyzeWithGemini(
  images: string[],
  hints: BoardReadRequest['hints'],
  manufacturerKnowledge: ManufacturerKnowledge | null = null,
  ocrResult: OCRResult | null = null,
  referenceImageUrls: string[] = [],
  trainingExamples: TrainingExample[] = []
): Promise<{
  board: Partial<BoardStructure>;
  circuits: Partial<DetectedCircuit>[];
}> {
  console.log('Stage 1: Gemini Vision - Board Structure Analysis');
  if (referenceImageUrls.length > 0) {
    console.log(`Including ${referenceImageUrls.length} reference images for few-shot learning`);
  }
  if (trainingExamples.length > 0) {
    console.log(`Including ${trainingExamples.length} training examples with circuit context`);
  }

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

  // Build enhanced prompt with manufacturer-specific RAG context + OCR hints + training examples
  const ragContext = buildEnhancedPrompt(manufacturerKnowledge);
  const ocrHints = buildOCRHintsPrompt(ocrResult);
  const trainingContext = buildTrainingExamplesPrompt(trainingExamples);
  const fullPrompt = systemPrompt + ragContext + trainingContext + ocrHints;

  const parts: any[] = [{ text: fullPrompt }];

  // Add user's images to analyze
  for (const imageUrl of images.slice(0, 4)) {
    const { mimeType, data } = await urlToBase64(imageUrl);
    parts.push({ inlineData: { mimeType, data } });
  }

  // Add reference images as few-shot examples (if available)
  if (referenceImageUrls.length > 0) {
    parts.push({ text: '\n\n### REFERENCE EXAMPLES (same brand - use as visual guide):' });
    for (const refUrl of referenceImageUrls.slice(0, 2)) {
      try {
        const { mimeType, data } = await urlToBase64(refUrl);
        parts.push({ inlineData: { mimeType, data } });
      } catch (e) {
        console.log('Failed to load reference image:', refUrl);
      }
    }
    parts.push({ text: 'Use the reference images above to help identify device types and label styles for this brand.\n' });
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
          maxOutputTokens: 8000,
          temperature: 0.2,
          responseMimeType: 'application/json'
        }
      }),
    },
    120000  // 120 second timeout for Gemini (3-phase boards with many circuits need time)
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error details:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText.slice(0, 500)
    });
    throw new Error(`Gemini API error: ${response.status} - ${errorText.slice(0, 200)}`);
  }

  const data = await response.json();

  // Log response structure for debugging
  console.log('Gemini response structure:', {
    hasCandidates: !!data.candidates,
    candidatesLength: data.candidates?.length,
    hasContent: !!data.candidates?.[0]?.content,
    partsLength: data.candidates?.[0]?.content?.parts?.length,
    partTypes: data.candidates?.[0]?.content?.parts?.map((p: any) => Object.keys(p)).flat()
  });

  // Handle potential Gemini 3 thinking output - filter for text parts only
  const textParts = data.candidates?.[0]?.content?.parts?.filter((p: any) => p.text);
  const text = textParts?.map((p: any) => p.text).join('\n');

  if (!text) {
    console.error('No text in Gemini response. Full response:', JSON.stringify(data).slice(0, 1000));
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

    // DIAGNOSTIC: Log masked API key to verify which key is active
    console.log('GEMINI_API_KEY check:', geminiApiKey.slice(0, 12) + '...' + geminiApiKey.slice(-4));

    // Initialize Supabase client inside request handler (env vars may not be available at module init)
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }

    console.log('Environment check:', {
      hasGeminiKey: !!geminiApiKey,
      hasOpenaiKey: !!openaiApiKey,
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
    });

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Processing ${images.length} image(s)`, {
      hints,
      options,
      fastMode: options?.fast_mode
    });

    // Stage 0: Run OCR + Brand Detection in parallel
    console.log('[STAGE 0] Starting OCR + Brand Detection...');
    let detectedBrand: string | null = null;
    let manufacturerKnowledge: ManufacturerKnowledge | null = null;
    let ocrResult: OCRResult | null = null;

    if (!options?.fast_mode) {
      // Run OCR and brand detection in parallel for speed
      console.log('[STAGE 0] Running OCR and brand detection in parallel...');
      const [ocrRes, brandRes] = await Promise.all([
        runOCRPreprocessing(images, supabaseUrl, supabaseServiceKey),
        detectBrand(images),
      ]);
      console.log('[STAGE 0] OCR and brand detection completed');

      ocrResult = ocrRes;
      detectedBrand = brandRes;

      // If OCR detected brand but Gemini didn't, use OCR's brand
      if (!detectedBrand && ocrResult?.board_hints.detected_brand) {
        detectedBrand = ocrResult.board_hints.detected_brand;
        console.log(`Using OCR-detected brand: ${detectedBrand}`);
      }

      if (detectedBrand) {
        console.log(`[STAGE 0] Fetching manufacturer knowledge for: ${detectedBrand}`);
        manufacturerKnowledge = await getManufacturerKnowledge(detectedBrand, supabase);
        console.log(`[STAGE 0] Manufacturer knowledge: ${manufacturerKnowledge ? 'found' : 'not found'}`);
      }
    }

    // Fetch reference images and training examples for few-shot learning (if brand detected)
    let referenceImageUrls: string[] = [];
    let trainingExamples: TrainingExample[] = [];
    if (detectedBrand && !options?.fast_mode) {
      console.log('[STAGE 0] Fetching reference images and training examples...');
      // Fetch both in parallel for speed
      const [refImages, trainExamples] = await Promise.all([
        getReferenceImages(detectedBrand, supabase),
        getTrainingExamples(detectedBrand, supabase),
      ]);
      referenceImageUrls = refImages;
      trainingExamples = trainExamples;
      console.log(`[STAGE 0] Reference images: ${referenceImageUrls.length}, Training examples: ${trainingExamples.length}`);
    }

    // Stage 1: Gemini - Board Structure (with RAG context + OCR hints + reference images + training examples)
    console.log('[STAGE 1] Starting Gemini analysis...');
    const geminiResult = await analyzeWithGemini(images, hints, manufacturerKnowledge, ocrResult, referenceImageUrls, trainingExamples);
    console.log(`[STAGE 1] Gemini completed, detected ${geminiResult.circuits?.length || 0} circuits`);

    // Stage 2: OpenAI Verification
    console.log('[STAGE 2] Starting OpenAI verification...');
    const openaiResult = await verifyWithOpenAI(images, geminiResult.circuits || []);
    console.log(`[STAGE 2] OpenAI completed, ${openaiResult.deviceCorrections.size} corrections`);

    // Merge results
    const result = mergeResults(geminiResult, openaiResult, hints);

    // Add metadata
    result.metadata.analysisTime = Date.now() - startTime;
    result.metadata.imageCount = images.length;
    (result.metadata as any).detectedBrand = detectedBrand;
    (result.metadata as any).ragUsed = manufacturerKnowledge !== null;
    (result.metadata as any).referenceImagesUsed = referenceImageUrls.length;
    (result.metadata as any).trainingExamplesUsed = trainingExamples.length;
    (result.metadata as any).ocrUsed = ocrResult?.success === true;
    (result.metadata as any).ocrProcessingTimeMs = ocrResult?.processing_time_ms || 0;

    // Add processing decisions
    if (ocrResult?.success) {
      result.decisions.unshift(`OCR preprocessing extracted ${ocrResult.board_hints.all_ratings_found.length} ratings, ${ocrResult.board_hints.all_labels_found.length} labels`);
    }
    if (trainingExamples.length > 0) {
      result.decisions.unshift(`Using ${trainingExamples.length} verified training examples with circuit context`);
    }
    if (referenceImageUrls.length > 0) {
      result.decisions.unshift(`Using ${referenceImageUrls.length} reference images for few-shot learning`);
    }
    if (detectedBrand && manufacturerKnowledge) {
      result.decisions.unshift(`Detected ${detectedBrand} board - using manufacturer-specific identification rules`);
    }

    console.log(`Analysis complete in ${result.metadata.analysisTime}ms:`, {
      circuits: result.circuits.length,
      modelsUsed: result.metadata.modelsUsed,
      detectedBrand,
      ragUsed: manufacturerKnowledge !== null,
      referenceImagesUsed: referenceImageUrls.length,
      trainingExamplesUsed: trainingExamples.length,
      ocrUsed: ocrResult?.success === true,
      ocrRatings: ocrResult?.board_hints.all_ratings_found.length || 0,
      decisions: result.decisions.length,
      warnings: result.warnings.length
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Error after ${duration}ms:`, error);

    // Capture error to Sentry for monitoring
    await captureException(error, {
      functionName: 'board-read-enhanced',
      requestUrl: req.url,
      requestMethod: req.method,
      extra: {
        duration,
        hasGeminiKey: !!geminiApiKey,
        hasOpenaiKey: !!openaiApiKey,
      }
    });

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
