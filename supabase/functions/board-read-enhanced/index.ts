import 'https://deno.land/x/xhr@0.1.0/mod.ts';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { encode as base64Encode } from 'https://deno.land/std@0.168.0/encoding/base64.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';

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
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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
  way_number?: number;
  phase_designation?: string;
  board_side?: 'left' | 'right';
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
  total_ways?: number;
  ways_per_side?: number;
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
  const patterns = [/```json\s*\n([\s\S]*?)\n```/, /```\s*\n([\s\S]*?)\n```/, /({[\s\S]*})/];

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

const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> => {
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

/**
 * Fetch with retry — exponential backoff for transient errors (429, 500, 503)
 */
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  timeoutMs: number,
  maxRetries: number = 1
): Promise<Response> => {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options, timeoutMs);
      if (response.ok || (response.status !== 429 && response.status !== 500 && response.status !== 503)) {
        return response;
      }
      const retryAfter = response.headers.get('Retry-After');
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000 * Math.pow(2, attempt);
      console.warn(`[RETRY] ${response.status} on attempt ${attempt + 1}/${maxRetries + 1}, waiting ${delay}ms`);
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, delay));
      } else {
        return response;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries) {
        const delay = 2000 * Math.pow(2, attempt);
        console.warn(`[RETRY] Error on attempt ${attempt + 1}: ${lastError.message}, retrying in ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastError || new Error('fetchWithRetry exhausted retries');
};

// ============================================================================
// OCR PREPROCESSING
// ============================================================================

/**
 * Call OCR preprocessor to extract text from board images
 * Runs Google Cloud Vision API for high-accuracy text detection
 */
async function runOCRPreprocessing(
  images: string[],
  supabaseUrl: string,
  supabaseServiceKey: string
): Promise<OCRResult | null> {
  try {
    console.log('Running OCR preprocessing on images...');

    const response = await fetchWithTimeout(
      `${supabaseUrl}/functions/v1/board-ocr-preprocess`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseServiceKey}`,
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
async function getManufacturerKnowledge(
  brand: string,
  supabase: any
): Promise<ManufacturerKnowledge | null> {
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
    // Get reference images for this brand — prefer verified, fall back to unverified
    const { data, error } = await supabase
      .from('board_reference_images')
      .select('image_url')
      .ilike('manufacturer', `%${brand}%`)
      .in('image_type', ['in_situ_dirty', 'in_situ_clean', 'product_catalogue'])
      .order('verified', { ascending: false }) // verified first
      .order('image_type', { ascending: true }) // dirty first
      .limit(2);

    if (error || !data || data.length === 0) {
      console.log(`No reference images found for: ${brand}`);
      return [];
    }

    console.log(`Found ${data.length} reference images for: ${brand}`);
    return data.map((d) => d.image_url).filter(Boolean);
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
      .select(
        `
        circuits,
        ratings_distribution,
        total_ways,
        mcb_count,
        rcbo_count,
        rcd_count_devices,
        image_id,
        board_reference_images!inner(image_url)
      `
      )
      .ilike('manufacturer', `%${brand}%`)
      .not('circuits', 'is', null)
      .order('human_verified', { ascending: false }) // verified first
      .limit(2);

    if (error || !data || data.length === 0) {
      console.log(`No training examples found for: ${brand}`);
      return [];
    }

    console.log(`Found ${data.length} training examples for: ${brand}`);

    return data
      .map((d) => ({
        image_url: (d.board_reference_images as any)?.image_url || '',
        circuits: d.circuits || [],
        ratings_distribution: d.ratings_distribution || {},
        total_ways: d.total_ways || 0,
        devices: {
          mcbs: d.mcb_count || 0,
          rcbos: d.rcbo_count || 0,
          rcds: d.rcd_count_devices || 0,
        },
      }))
      .filter((e) => e.image_url);
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
 * Training Correction Layer
 * Reads user corrections from board_scanner_training and applies
 * statistically significant patterns (3+ occurrences) as post-processing.
 */
interface CorrectionPattern {
  field: 'device' | 'rating' | 'curve';
  aiValue: string;
  correctValue: string;
  count: number;
  brand: string | null;
}

async function getTrainingCorrections(
  supabase: any,
  brand: string | null
): Promise<CorrectionPattern[]> {
  try {
    const { data, error } = await supabase
      .from('board_scanner_training')
      .select('ai_device_type, correct_device_type, ai_rating, correct_rating, ai_curve, correct_curve, board_brand');

    if (error || !data || data.length === 0) return [];

    // Aggregate correction patterns in memory (faster than SQL GROUP BY for <500 rows)
    const patterns = new Map<string, CorrectionPattern>();

    for (const row of data) {
      // Device type corrections
      if (row.ai_device_type && row.correct_device_type && row.ai_device_type !== row.correct_device_type) {
        const key = `device:${row.ai_device_type}→${row.correct_device_type}:${row.board_brand || '*'}`;
        const existing = patterns.get(key);
        if (existing) {
          existing.count++;
        } else {
          patterns.set(key, {
            field: 'device',
            aiValue: row.ai_device_type,
            correctValue: row.correct_device_type,
            count: 1,
            brand: row.board_brand,
          });
        }
      }

      // Rating corrections
      if (row.ai_rating && row.correct_rating && row.ai_rating !== row.correct_rating) {
        const key = `rating:${row.ai_rating}→${row.correct_rating}:${row.board_brand || '*'}`;
        const existing = patterns.get(key);
        if (existing) {
          existing.count++;
        } else {
          patterns.set(key, {
            field: 'rating',
            aiValue: row.ai_rating,
            correctValue: row.correct_rating,
            count: 1,
            brand: row.board_brand,
          });
        }
      }

      // Curve corrections
      if (row.ai_curve && row.correct_curve && row.ai_curve !== row.correct_curve) {
        const key = `curve:${row.ai_curve}→${row.correct_curve}:${row.board_brand || '*'}`;
        const existing = patterns.get(key);
        if (existing) {
          existing.count++;
        } else {
          patterns.set(key, {
            field: 'curve',
            aiValue: row.ai_curve,
            correctValue: row.correct_curve,
            count: 1,
            brand: row.board_brand,
          });
        }
      }
    }

    // Filter to statistically significant patterns (3+ occurrences)
    const significant = [...patterns.values()].filter((p) => p.count >= 3);

    // Sort: brand-specific first, then by count descending
    significant.sort((a, b) => {
      if (a.brand && !b.brand) return -1;
      if (!a.brand && b.brand) return 1;
      return b.count - a.count;
    });

    console.log(`[CORRECTIONS] Found ${significant.length} significant patterns from ${data.length} training records`);
    return significant;
  } catch (err) {
    console.error('[CORRECTIONS] Failed to load training corrections:', err);
    return [];
  }
}

function applyTrainingCorrections(
  circuits: any[],
  corrections: CorrectionPattern[],
  brand: string | null
): { count: number; details: string[] } {
  let count = 0;
  const details: string[] = [];

  for (const circuit of circuits) {
    for (const rule of corrections) {
      // Brand-specific rules only apply to matching brand
      if (rule.brand && brand && rule.brand.toLowerCase() !== brand.toLowerCase()) continue;

      if (rule.field === 'device') {
        const deviceType = circuit.device?.category || circuit.device_type || '';
        if (deviceType.toLowerCase() === rule.aiValue.toLowerCase()) {
          const old = deviceType;
          if (circuit.device) circuit.device.category = rule.correctValue;
          circuit.device_type = rule.correctValue;
          details.push(`Circuit ${circuit.position}: device ${old}→${rule.correctValue} (${rule.count} corrections)`);
          count++;
          break; // One correction per circuit per field
        }
      }

      if (rule.field === 'rating') {
        const rating = String(circuit.device?.rating_amps || circuit.rating_amps || '');
        if (rating === rule.aiValue) {
          const old = rating;
          if (circuit.device) circuit.device.rating_amps = parseInt(rule.correctValue);
          circuit.rating_amps = parseInt(rule.correctValue);
          details.push(`Circuit ${circuit.position}: rating ${old}A→${rule.correctValue}A (${rule.count} corrections)`);
          count++;
          break;
        }
      }

      if (rule.field === 'curve') {
        const curve = circuit.device?.curve || circuit.curve || '';
        if (curve.toLowerCase() === rule.aiValue.toLowerCase()) {
          const old = curve;
          if (circuit.device) circuit.device.curve = rule.correctValue;
          circuit.curve = rule.correctValue;
          details.push(`Circuit ${circuit.position}: curve ${old}→${rule.correctValue} (${rule.count} corrections)`);
          count++;
          break;
        }
      }
    }
  }

  return { count, details };
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
${Object.entries(knowledge.abbreviations || {})
  .map(([abbr, full]) => `- "${abbr}" = "${full}"`)
  .join('\n')}

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

  const parts: any[] = [
    {
      text: `Identify the manufacturer/brand of this UK consumer unit/distribution board. Return ONLY the brand name (e.g., "Hager", "MK", "Schneider", "Wylex", "Crabtree", "Contactum"). Look for logo, distinctive colours, or text. Return "Unknown" if unsure. Just the brand name, nothing else.`,
    },
  ];

  // Add first image only for quick detection
  const { mimeType, data } = await urlToBase64(images[0]);
  parts.push({ inlineData: { mimeType, data } });

  try {
    // No retry for brand — fail fast, not critical
    const response = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts }],
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.1,
          },
        }),
      },
      10000 // 10s brand detection — fail fast, not critical
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Brand detection failed:', {
        status: response.status,
        body: errorText.slice(0, 200),
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

  // OPTIMIZED PROMPT - Balanced: concise but with strong 3P detection rules
  const systemPrompt = `UK electrician: Analyse UK distribution board photo. Return JSON only. Do NOT include empty/spare positions.

BOARD: brand, model, main_switch_rating (amps), spd_status (green_ok/yellow_check/red_replace/not_present), board_layout (1P/3P-vertical/3P-horizontal), estimated_total_ways, ways_per_side, evidence.

THREE-PHASE DETECTION (CRITICAL):
- "DANGER 400 VOLTS" or "400V" visible = three-phase board. Set board_layout:"3P-vertical"
- TP&N boards have LEFT side + RIGHT side. List LEFT circuits first (top→bottom), then RIGHT (top→bottom)
- 3-POLE devices — mark phase:"3P" if: triple width device, linked toggles, rotary switch/isolator, L1+L2+L3 labels together, or 32A+ on 400V board. Common 3P loads: VMX/VSD/VFD, TMS, UPS, AHU, HVAC, compressor, chiller, motor, pump, fan, roller door, hoist, lift, crane, conveyor, welder, CNC, oven, cold room, DB2/DB3, generator, EV charger
- Single-pole on 3P board: mark phase:"1P", read printed L1/L2/L3 label next to it → phase_designation
- The board chart prints L1,L2,L3 next to each circuit. READ these labels — do not guess.

CIRCUITS (only populated positions, no spares):
- index, label_text (expand abbreviations: "K Skt"→"Kitchen Sockets")
- board_side ("left"/"right" for 3P boards)
- device.category (MCB/RCBO/RCD/AFDD/Isolator/MCCB), device.rating_amps, device.curve (B/C/D)
- phase ("1P" or "3P"), phase_designation ("L1"/"L2"/"L3" or "L1,L2,L3" for 3-pole)
- confidence (high/medium/low)

JSON: {"board":{...},"circuits":[{...}]}`;

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
    parts.push({
      text: 'Use the reference images above to help identify device types and label styles for this brand.\n',
    });
  }

  // Add hints if provided
  if (hints) {
    parts[0].text += `\n\nHINTS FROM USER:
- Main switch side: ${hints.main_switch_side || 'unknown'}
- Expected ways: ${hints.expected_ways || 'unknown'}
- Board type: ${hints.board_type || 'domestic'}
- Three phase: ${hints.is_three_phase || 'unknown'}`;
  }

  // No retry for main analysis — Supabase edge functions cap at 150s wall clock
  const response = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: {
          maxOutputTokens: 9600,
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    },
    140000 // 140s — push close to Supabase 150s limit for complex 3P boards
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error details:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText.slice(0, 500),
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
    partTypes: data.candidates?.[0]?.content?.parts?.map((p: any) => Object.keys(p)).flat(),
  });

  // Handle potential Gemini 3 thinking output - filter for text parts only
  const textParts = data.candidates?.[0]?.content?.parts?.filter((p: any) => p.text);
  const text = textParts?.map((p: any) => p.text).join('\n');

  if (!text) {
    console.error(
      'No text in Gemini response. Full response:',
      JSON.stringify(data).slice(0, 1000)
    );
    throw new Error('No response from Gemini');
  }

  const result = parseAIResponse(text, 'Gemini response');
  console.log(`Gemini detected ${result.circuits?.length || 0} circuits`);

  return {
    board: result.board || {},
    circuits: (result.circuits || []).map((c: any) => ({ ...c, source_model: 'gemini' })),
    threePhaseGroups: result.three_phase_groups || [],
  };
}

/**
 * Stage 3: OpenAI - Component Rating Verification
 * OPTIMIZED: Shorter prompt, only return corrections
 */
async function verifyWithOpenAI(
  images: string[],
  circuits: Partial<DetectedCircuit>[]
): Promise<{
  deviceCorrections: Map<number, Partial<DetectedCircuit['device']>>;
}> {
  if (!openaiApiKey) {
    console.log('Stage 3: Skipped (no OpenAI API key)');
    return { deviceCorrections: new Map() };
  }

  console.log('Stage 3: OpenAI - Component Verification');

  // OPTIMIZED: Concise prompt, only return corrections
  const systemPrompt = `Electrical device specialist: Verify MCB/RCBO ratings in UK distribution board (consumer unit or TP&N panel). Return JSON only.

Verify these detections:
${circuits
  .slice(0, 30)
  .map((c) => `${c.index}:${c.device?.category || '?'} ${c.device?.rating_amps || '?'}A${c.way_number ? ` W${c.way_number}${c.phase_designation || ''}` : ''}`)
  .join(', ')}

Device ID: MCB=no test button. RCBO=small test button (red/white). RCD=2 modules, large test button. AFDD=marked "AFDD"/"Arc". 3-pole MCB/MCCB=3 linked toggles, triple width. Isolator/Rotary Switch=no overload protection, on/off only.

Ratings: 6,10,16,20,25,32,40,50,63,80,100,125A. Curves: B(domestic), C(motors/commercial), D(high inrush).

THREE-PHASE TP&N BOARDS:
- "DANGER 400 VOLTS" = three-phase board
- Left side circuits = Ways 1 to N, right side = Ways N+1 to 2N
- Each way has L1, L2, L3 positions — READ the printed phase labels on the board chart
- 3-pole devices (linked toggles, rotary switches): occupy full way L1,L2,L3
- Single-pole: sits on one phase — verify the printed L1/L2/L3 marker is correct
- Include spares (empty positions)

Return ONLY corrections (skip verified): {"device_verifications":[{"position":3,"verified":false,"corrections":{"category":"RCBO","rating_amps":16,"curve":"B"},"reason":"Test button visible"}]}`;

  const imageContents = await Promise.all(
    images.slice(0, 2).map(async (url) => {
      const { mimeType, data } = await urlToBase64(url);
      return {
        type: 'image_url' as const,
        image_url: {
          url: `data:${mimeType};base64,${data}`,
        },
      };
    })
  );

  const response = await fetchWithRetry(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 2400,
        temperature: 0.2,
        messages: [
          {
            role: 'user',
            content: [...imageContents, { type: 'text', text: systemPrompt }],
          },
        ],
        response_format: { type: 'json_object' },
      }),
    },
    30000 // 30s OpenAI verification
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
  geminiResult: { board: Partial<BoardStructure>; circuits: Partial<DetectedCircuit>[]; threePhaseGroups?: any[] },
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
        breaking_capacity_kA: circuit.device?.breaking_capacity_kA || null,
      },
      live_conductor_size_mm2: circuit.live_conductor_size_mm2 || null,
      cpc_size_mm2: circuit.cpc_size_mm2 || null,
      pictograms: circuit.pictograms || [],
      phase: circuit.phase || '1P',
      phases: circuit.phases,
      way_number: circuit.way_number || undefined,
      phase_designation: circuit.phase_designation || undefined,
      board_side: circuit.board_side || undefined,
      confidence: circuit.confidence || 'medium',
      evidence: circuit.evidence || '',
      notes: circuit.notes || '',
      source_model: 'gemini',
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
        decisions.push(
          `Position ${index}: Device updated from ${oldDevice} to ${newDevice} (OpenAI verify)`
        );
        circuit.source_model = 'gemini+openai';
      }
    }
  }

  // Sort circuits by index
  let circuits = Array.from(circuitMap.values()).sort((a, b) => a.index - b.index);

  // Merge three-phase groups: combine 3 individual ways into 1 three-phase circuit
  const threePhaseGroups = geminiResult.threePhaseGroups || [];
  if (threePhaseGroups.length > 0) {
    const indicesToRemove = new Set<number>();
    const mergedCircuits: DetectedCircuit[] = [];

    for (const group of threePhaseGroups) {
      const indices: number[] = group.circuit_indices || [];
      if (indices.length < 2) continue;

      // Find the grouped circuits
      const groupedCircuits = circuits.filter((c) => indices.includes(c.index));
      if (groupedCircuits.length === 0) continue;

      // Use first circuit as base, enrich with group info
      const base = { ...groupedCircuits[0] };
      base.label_text = group.description || base.label_text || 'Three-Phase Load';
      base.phase = '3P';
      base.phases = ['L1', 'L2', 'L3'];
      if (group.rating) {
        base.device = { ...base.device, rating_amps: group.rating };
      }
      base.notes = `3-pole device, Ways ${Math.min(...indices)}-${Math.max(...indices)} (L1,L2,L3)`;

      mergedCircuits.push(base);
      indices.forEach((i) => indicesToRemove.add(i));
    }

    // Remove grouped individual circuits, add merged ones
    circuits = circuits.filter((c) => !indicesToRemove.has(c.index));
    circuits.push(...mergedCircuits);
    circuits.sort((a, b) => a.index - b.index);

    // Renumber positions sequentially
    circuits.forEach((c, i) => {
      c.index = i + 1;
      c.position = i + 1;
    });

    decisions.push(`Merged ${threePhaseGroups.length} three-phase group(s) — ${indicesToRemove.size} ways → ${mergedCircuits.length} circuit(s)`);
  }

  // Build board structure
  const board: BoardStructure = {
    brand: geminiResult.board.brand || 'Unknown',
    model: geminiResult.board.model || '',
    main_switch_rating: geminiResult.board.main_switch_rating || null,
    spd_status: geminiResult.board.spd_status || 'unknown',
    board_layout: geminiResult.board.board_layout || '1P',
    estimated_total_ways: geminiResult.board.estimated_total_ways || circuits.length,
    total_ways: geminiResult.board.total_ways || geminiResult.board.estimated_total_ways || undefined,
    ways_per_side: geminiResult.board.ways_per_side || undefined,
    ways_per_circuit: geminiResult.board.ways_per_circuit || 1,
    evidence: geminiResult.board.evidence || '',
  };

  // Detect three-phase circuits
  const threePhaseCircuits = circuits.filter((c) => c.phase === '3P');
  if (threePhaseCircuits.length > 0) {
    decisions.push(`Detected ${threePhaseCircuits.length} three-phase circuit group(s)`);
    if (board.board_layout === '1P') {
      board.board_layout = '3P-vertical';
      decisions.push('Board layout updated to 3P based on circuit detection');
    }
  }

  // Post-process: TP&N way/phase numbering with LEFT/RIGHT side split
  if (board.board_layout.startsWith('3P')) {
    const waysPerSide = board.ways_per_side || Math.ceil(board.estimated_total_ways / 2) || 8;
    const phaseLabels: string[] = ['L1', 'L2', 'L3'];

    // Helper: number a group of circuits starting from a given way
    function numberGroup(group: DetectedCircuit[], startWay: number, side: 'left' | 'right') {
      let way = startWay;
      let phaseIdx = 0;
      for (const c of group) {
        if (c.phase === '3P') {
          // 3-pole — occupies full way
          if (phaseIdx > 0) { way++; phaseIdx = 0; } // finish partial way first
          c.way_number = way;
          c.phase_designation = 'L1,L2,L3';
          c.board_side = side;
          way++;
          phaseIdx = 0;
        } else {
          // Single-pole — assign to current phase position
          c.way_number = way;
          c.phase_designation = c.phase_designation || phaseLabels[phaseIdx];
          c.board_side = side;
          phaseIdx++;
          if (phaseIdx >= 3) { phaseIdx = 0; way++; }
        }
      }
    }

    // Split circuits into left and right groups
    // Count physical positions (1P=1, 3P=3) to find where left side fills up
    const maxLeftPositions = waysPerSide * 3;
    let leftPositionCount = 0;
    let splitIdx = circuits.length; // default: all on left

    for (let i = 0; i < circuits.length; i++) {
      const positionsUsed = circuits[i].phase === '3P' ? 3 : 1;
      if (leftPositionCount + positionsUsed > maxLeftPositions) {
        splitIdx = i;
        break;
      }
      leftPositionCount += positionsUsed;
    }

    const leftCircuits = circuits.slice(0, splitIdx);
    const rightCircuits = circuits.slice(splitIdx);

    // Number each side independently
    numberGroup(leftCircuits, 1, 'left');
    numberGroup(rightCircuits, waysPerSide + 1, 'right');

    board.ways_per_side = waysPerSide;
    board.total_ways = waysPerSide * 2;

    decisions.push(`TP&N split: ${leftCircuits.length} circuits left (Ways 1-${waysPerSide}), ${rightCircuits.length} right (Ways ${waysPerSide + 1}-${board.total_ways})`);

    // Sort by way then phase, renumber sequentially
    const phaseOrder: Record<string, number> = { 'L1': 0, 'L2': 1, 'L3': 2, 'L1,L2,L3': 0 };
    circuits.sort((a, b) => {
      const wayDiff = (a.way_number || 0) - (b.way_number || 0);
      if (wayDiff !== 0) return wayDiff;
      return (phaseOrder[a.phase_designation || 'L1'] || 0) - (phaseOrder[b.phase_designation || 'L1'] || 0);
    });
    circuits.forEach((c, i) => { c.index = i + 1; c.position = i + 1; });

    decisions.push(`TP&N: ${circuits.length} circuits detected (${board.total_ways} ways, ${waysPerSide} per side)`);
  }

  // Check for missing circuits
  if (hints?.expected_ways && circuits.length < hints.expected_ways * 0.9) {
    warnings.push(
      `Expected ${hints.expected_ways} ways but only detected ${circuits.length}. Some circuits may be missing.`
    );
  }

  // Check confidence levels
  const lowConfidenceCount = circuits.filter((c) => c.confidence === 'low').length;
  if (lowConfidenceCount > circuits.length * 0.3) {
    warnings.push(
      `${lowConfidenceCount} circuits have low confidence. Consider retaking photos with better lighting.`
    );
  }

  return {
    circuits,
    board,
    metadata: {
      boardSize: board.estimated_total_ways,
      analysisTime: 0, // Will be set by caller
      modelsUsed,
      imageCount: 0, // Will be set by caller
    },
    warnings,
    decisions,
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
    console.log(
      'GEMINI_API_KEY check:',
      geminiApiKey.slice(0, 12) + '...' + geminiApiKey.slice(-4)
    );

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
      fastMode: options?.fast_mode,
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
        console.log(
          `[STAGE 0] Manufacturer knowledge: ${manufacturerKnowledge ? 'found' : 'not found'}`
        );
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
      console.log(
        `[STAGE 0] Reference images: ${referenceImageUrls.length}, Training examples: ${trainingExamples.length}`
      );
    }

    // Stage 1: Gemini - Board Structure (with RAG context + OCR hints + reference images + training examples)
    console.log('[STAGE 1] Starting Gemini analysis...');
    let geminiResult;
    try {
    geminiResult = await analyzeWithGemini(
      images,
      hints,
      manufacturerKnowledge,
      ocrResult,
      referenceImageUrls,
      trainingExamples
    );
    console.log(
      `[STAGE 1] Gemini completed, detected ${geminiResult.circuits?.length || 0} circuits`
    );
    } catch (geminiError) {
      console.error('[STAGE 1] Gemini failed after retries:', geminiError);
      return new Response(
        JSON.stringify({
          error: 'Board analysis timed out — three-phase boards take longer. Please try again.',
          circuits: [],
          warnings: ['AI analysis timed out. Try again with good lighting and a clear photo.'],
          metadata: { analysisTime: Date.now() - startTime, modelsUsed: [], imageCount: images.length },
        }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Stage 2: OpenAI Verification — skip for 3P boards to stay within 150s Supabase limit
    const is3PBoard = geminiResult.board?.board_layout?.startsWith('3P') ||
      geminiResult.circuits?.some((c: any) => c.phase === '3P');
    let openaiResult: { deviceCorrections: Map<number, any> } = { deviceCorrections: new Map() };
    if (!is3PBoard) {
      console.log('[STAGE 2] Starting OpenAI verification...');
      openaiResult = await verifyWithOpenAI(images, geminiResult.circuits || []);
      console.log(`[STAGE 2] OpenAI completed, ${openaiResult.deviceCorrections.size} corrections`);
    } else {
      console.log('[STAGE 2] Skipped OpenAI — 3P board, using time budget for Gemini + training corrections');
    }

    // Merge results
    const result = mergeResults(geminiResult, openaiResult, hints);

    // Stage 3: Apply training corrections from user feedback
    console.log('[STAGE 3] Loading training corrections...');
    const corrections = await getTrainingCorrections(supabase, detectedBrand);
    if (corrections.length > 0) {
      const { count: correctionCount, details: correctionDetails } = applyTrainingCorrections(
        result.circuits,
        corrections,
        detectedBrand
      );
      if (correctionCount > 0) {
        result.decisions.push(
          `Applied ${correctionCount} training corrections from ${corrections.length} patterns`
        );
        correctionDetails.forEach((d) => console.log(`[CORRECTION] ${d}`));
      }
    }

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
      result.decisions.unshift(
        `OCR preprocessing extracted ${ocrResult.board_hints.all_ratings_found.length} ratings, ${ocrResult.board_hints.all_labels_found.length} labels`
      );
    }
    if (trainingExamples.length > 0) {
      result.decisions.unshift(
        `Using ${trainingExamples.length} verified training examples with circuit context`
      );
    }
    if (referenceImageUrls.length > 0) {
      result.decisions.unshift(
        `Using ${referenceImageUrls.length} reference images for few-shot learning`
      );
    }
    if (detectedBrand && manufacturerKnowledge) {
      result.decisions.unshift(
        `Detected ${detectedBrand} board - using manufacturer-specific identification rules`
      );
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
      warnings: result.warnings.length,
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
      },
    });

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        circuits: [],
        warnings: ['Analysis failed. Please try again.'],
        metadata: {
          analysisTime: duration,
          modelsUsed: [],
          imageCount: 0,
        },
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
