import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const googleCloudApiKey = Deno.env.get('GOOGLE_CLOUD_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ============================================================================
// TYPES
// ============================================================================

interface OCRRequest {
  images: string[]; // Base64 encoded images or URLs
}

interface TextAnnotation {
  description: string;
  boundingPoly: {
    vertices: Array<{ x: number; y: number }>;
  };
}

interface ExtractedText {
  text: string;
  confidence: number;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  type: 'rating' | 'label' | 'brand' | 'device_marking' | 'other';
}

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
  extracted_texts: ExtractedText[];
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

// ============================================================================
// OCR PARSING UTILITIES
// ============================================================================

// UK electrical ratings patterns
const RATING_PATTERNS = [
  /\b(\d{1,3})\s*[Aa]\b/,           // "32A", "32 A", "6a"
  /\b[Bb](\d{1,3})\b/,              // "B32", "B6"
  /\b[Cc](\d{1,3})\b/,              // "C32", "C16"
  /\b[Dd](\d{1,3})\b/,              // "D63"
  /\b(\d{1,3})\s*[Aa][Mm][Pp][Ss]?\b/, // "32 Amps"
];

// Curve type patterns
const CURVE_PATTERNS = [
  /\b[Bb]\s*\d/,                    // "B32"
  /\b[Cc]\s*\d/,                    // "C16"
  /\b[Dd]\s*\d/,                    // "D63"
  /\bType\s*[BCD]\b/i,             // "Type B"
];

// Common circuit label patterns
const LABEL_PATTERNS = [
  /\b(lights?|lighting)\b/i,
  /\b(sockets?|socket\s*outlet)\b/i,
  /\b(cooker|oven|hob)\b/i,
  /\b(shower)\b/i,
  /\b(immersion|imm)\b/i,
  /\b(boiler|ch|central\s*heating)\b/i,
  /\b(garage)\b/i,
  /\b(garden|outdoor)\b/i,
  /\b(upstairs|downstairs|ground|first)\b/i,
  /\b(kitchen|bathroom|bedroom|lounge|hall)\b/i,
  /\b(fridge|freezer|ff|f\/f)\b/i,
  /\b(washing\s*machine|wm|w\/m)\b/i,
  /\b(dishwasher|dw|d\/w)\b/i,
  /\b(tumble\s*dryer|td|t\/d)\b/i,
  /\b(ev|electric\s*vehicle|car\s*charger)\b/i,
  /\b(alarm|security)\b/i,
  /\b(smoke|fire)\b/i,
  /\b(ring|radial|spur)\b/i,
  /\b(spare)\b/i,
];

// UK board brand patterns
const BRAND_PATTERNS = [
  /\b(hager|HAG\d+)\b/i,
  /\b(mk|mk\s*electric)\b/i,
  /\b(schneider|acti\s*9)\b/i,
  /\b(wylex)\b/i,
  /\b(crabtree)\b/i,
  /\b(contactum)\b/i,
  /\b(british\s*general|bg)\b/i,
  /\b(europa)\b/i,
  /\b(lewden)\b/i,
  /\b(fusebox)\b/i,
  /\b(eaton)\b/i,
  /\b(siemens)\b/i,
  /\b(abb)\b/i,
  /\b(legrand)\b/i,
  /\b(mem)\b/i,
  /\b(square\s*d)\b/i,
  /\b(chint)\b/i,
];

// Device marking patterns (on the device itself)
const DEVICE_MARKING_PATTERNS = [
  /\b(MCB|RCBO|RCD|AFDD|SPD)\b/i,
  /\b(\d+)\s*kA\b/i,                // Breaking capacity "6kA"
  /\b(\d+)\s*mA\b/i,                // RCD sensitivity "30mA"
  /\bI[Δ∆]n\s*=?\s*(\d+)\s*mA\b/i, // RCD marking "IΔn=30mA"
  /\bIn\s*=?\s*(\d+)\s*A\b/i,      // Rated current
];

function classifyText(text: string): ExtractedText['type'] {
  const normalised = text.trim();

  // Check for ratings first (most specific)
  for (const pattern of RATING_PATTERNS) {
    if (pattern.test(normalised)) return 'rating';
  }

  // Check for brand names
  for (const pattern of BRAND_PATTERNS) {
    if (pattern.test(normalised)) return 'brand';
  }

  // Check for device markings
  for (const pattern of DEVICE_MARKING_PATTERNS) {
    if (pattern.test(normalised)) return 'device_marking';
  }

  // Check for labels
  for (const pattern of LABEL_PATTERNS) {
    if (pattern.test(normalised)) return 'label';
  }

  return 'other';
}

function extractRating(text: string): string | null {
  for (const pattern of RATING_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      // Normalize to just the number
      const num = match[1] || match[0].replace(/[^\d]/g, '');
      return num + 'A';
    }
  }
  return null;
}

function extractCurve(text: string): string | null {
  const curveMatch = text.match(/\b([BCD])\d/i);
  if (curveMatch) {
    return curveMatch[1].toUpperCase();
  }
  const typeMatch = text.match(/\bType\s*([BCD])\b/i);
  if (typeMatch) {
    return typeMatch[1].toUpperCase();
  }
  return null;
}

function extractBrand(text: string): string | null {
  for (const pattern of BRAND_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      // Normalize brand names
      const brand = match[0].toLowerCase();
      if (brand.includes('hager')) return 'Hager';
      if (brand === 'mk' || brand.includes('mk electric')) return 'MK';
      if (brand.includes('schneider') || brand.includes('acti')) return 'Schneider';
      if (brand.includes('wylex')) return 'Wylex';
      if (brand.includes('crabtree')) return 'Crabtree';
      if (brand.includes('contactum')) return 'Contactum';
      if (brand.includes('british') || brand === 'bg') return 'British General';
      if (brand.includes('europa')) return 'Europa';
      if (brand.includes('lewden')) return 'Lewden';
      if (brand.includes('fusebox')) return 'Fusebox';
      if (brand.includes('eaton')) return 'Eaton';
      if (brand.includes('siemens')) return 'Siemens';
      if (brand.includes('abb')) return 'ABB';
      if (brand.includes('legrand')) return 'Legrand';
      if (brand.includes('mem')) return 'MEM';
      if (brand.includes('square')) return 'Square D';
      if (brand.includes('chint')) return 'Chint';
      return match[0];
    }
  }
  return null;
}

function groupTextsByPosition(texts: ExtractedText[]): CircuitOCRHint[] {
  // Sort texts by x position (left to right represents circuit positions)
  const sortedTexts = [...texts].sort((a, b) => a.position.x - b.position.x);

  // Group texts into vertical columns (circuits are typically arranged vertically)
  const columns: ExtractedText[][] = [];
  let currentColumn: ExtractedText[] = [];
  let lastX = -1;
  const COLUMN_THRESHOLD = 50; // pixels

  for (const text of sortedTexts) {
    if (lastX === -1 || Math.abs(text.position.x - lastX) > COLUMN_THRESHOLD) {
      if (currentColumn.length > 0) {
        columns.push(currentColumn);
      }
      currentColumn = [text];
      lastX = text.position.x;
    } else {
      currentColumn.push(text);
    }
  }
  if (currentColumn.length > 0) {
    columns.push(currentColumn);
  }

  // Convert columns to circuit hints
  return columns.map((column, index) => {
    const rawTexts = column.map(t => t.text);
    const fullText = rawTexts.join(' ');

    // Find label (look for descriptive text)
    const labelTexts = column.filter(t => t.type === 'label');
    const detectedLabel = labelTexts.length > 0 ? labelTexts[0].text : null;

    // Find rating
    const ratingTexts = column.filter(t => t.type === 'rating');
    const detectedRating = ratingTexts.length > 0 ? extractRating(ratingTexts[0].text) : extractRating(fullText);

    // Find curve
    const detectedCurve = extractCurve(fullText);

    // Find device marking
    const deviceTexts = column.filter(t => t.type === 'device_marking');
    const detectedDeviceMarking = deviceTexts.length > 0 ? deviceTexts[0].text : null;

    return {
      position_index: index + 1,
      detected_label: detectedLabel,
      detected_rating: detectedRating,
      detected_curve: detectedCurve,
      detected_device_marking: detectedDeviceMarking,
      raw_texts: rawTexts,
    };
  });
}

// ============================================================================
// GOOGLE CLOUD VISION API
// ============================================================================

async function callGoogleVisionOCR(imageBase64: string): Promise<TextAnnotation[]> {
  if (!googleCloudApiKey) {
    console.warn('Google Cloud API key not configured, OCR disabled');
    return [];
  }

  // Remove data URI prefix if present
  const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

  const requestBody = {
    requests: [
      {
        image: {
          content: base64Data,
        },
        features: [
          {
            type: 'TEXT_DETECTION',
            maxResults: 100,
          },
        ],
        imageContext: {
          languageHints: ['en'],
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${googleCloudApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Vision API error:', errorText);
      return [];
    }

    const result = await response.json();

    if (result.responses?.[0]?.error) {
      console.error('Google Vision API returned error:', result.responses[0].error);
      return [];
    }

    return result.responses?.[0]?.textAnnotations || [];
  } catch (error) {
    console.error('Error calling Google Vision API:', error);
    return [];
  }
}

function parseVisionAnnotations(annotations: TextAnnotation[]): ExtractedText[] {
  if (annotations.length === 0) return [];

  // First annotation is the full text, skip it
  const individualAnnotations = annotations.slice(1);

  return individualAnnotations.map(annotation => {
    const vertices = annotation.boundingPoly?.vertices || [];
    const x = Math.min(...vertices.map(v => v.x || 0));
    const y = Math.min(...vertices.map(v => v.y || 0));
    const maxX = Math.max(...vertices.map(v => v.x || 0));
    const maxY = Math.max(...vertices.map(v => v.y || 0));

    return {
      text: annotation.description,
      confidence: 0.9, // Google Vision doesn't return confidence for TEXT_DETECTION
      position: {
        x,
        y,
        width: maxX - x,
        height: maxY - y,
      },
      type: classifyText(annotation.description),
    };
  });
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const { images }: OCRRequest = await req.json();

    if (!images || images.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No images provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${images.length} images for OCR`);

    // Process all images in parallel
    const allAnnotations: TextAnnotation[][] = await Promise.all(
      images.map(image => callGoogleVisionOCR(image))
    );

    // Combine and parse all annotations
    let allExtractedTexts: ExtractedText[] = [];
    let fullText = '';

    for (const annotations of allAnnotations) {
      if (annotations.length > 0) {
        // First annotation is full text
        fullText += (annotations[0]?.description || '') + '\n';
        allExtractedTexts = allExtractedTexts.concat(parseVisionAnnotations(annotations));
      }
    }

    // Extract board-level hints
    const allRatings = new Set<string>();
    const allLabels = new Set<string>();
    let detectedBrand: string | null = null;
    let detectedModel: string | null = null;
    let detectedMainSwitch: string | null = null;

    for (const text of allExtractedTexts) {
      if (text.type === 'rating') {
        const rating = extractRating(text.text);
        if (rating) allRatings.add(rating);
      }
      if (text.type === 'label') {
        allLabels.add(text.text);
      }
      if (text.type === 'brand' && !detectedBrand) {
        detectedBrand = extractBrand(text.text);
      }
    }

    // Look for main switch rating (typically higher values like 63A, 80A, 100A)
    const mainSwitchCandidates = ['100A', '80A', '63A'];
    for (const candidate of mainSwitchCandidates) {
      if (allRatings.has(candidate)) {
        detectedMainSwitch = candidate;
        break;
      }
    }

    // Group texts into circuit hints
    const circuitHints = groupTextsByPosition(allExtractedTexts);

    const result: OCRResult = {
      success: true,
      extracted_texts: allExtractedTexts,
      circuit_hints: circuitHints,
      board_hints: {
        detected_brand: detectedBrand,
        detected_model: detectedModel,
        all_ratings_found: Array.from(allRatings),
        all_labels_found: Array.from(allLabels),
        detected_main_switch: detectedMainSwitch,
      },
      raw_full_text: fullText.trim(),
      processing_time_ms: Date.now() - startTime,
    };

    console.log(`OCR completed in ${result.processing_time_ms}ms. Found ${allExtractedTexts.length} text elements.`);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('OCR processing error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        extracted_texts: [],
        circuit_hints: [],
        board_hints: {
          detected_brand: null,
          detected_model: null,
          all_ratings_found: [],
          all_labels_found: [],
          detected_main_switch: null,
        },
        raw_full_text: '',
        processing_time_ms: Date.now() - startTime,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
