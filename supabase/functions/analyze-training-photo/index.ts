import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ============================================================================
// TYPES
// ============================================================================

interface TrainingPhotoRequest {
  image_base64?: string;
  image_url?: string;
  reference_image_id?: string; // If analyzing an existing board_reference_images record
  save_to_db?: boolean;
}

interface TrainingAnalysisResult {
  board: {
    manufacturer: string;
    model_series: string | null;
    age_category: 'new' | 'recent' | 'aged' | 'legacy';
    total_ways: number;
    populated_ways: number;
    main_switch: {
      rating_amps: number;
      position: 'left' | 'right' | 'center' | 'top';
    };
  };

  phase_config: {
    is_three_phase: boolean;
    layout: 'single' | '3P-vertical' | '3P-horizontal';
    busbar_labels: string[];
  };

  structure: {
    is_split_load: boolean;
    split_point_way: number | null;
    rcd_protected_ways: number[];
  };

  devices: {
    mcbs: number;
    rcbos: number;
    rcds: number;
    afdds: number;
    spd: {
      present: boolean;
      status: 'green_ok' | 'yellow_check' | 'red_replace' | 'unknown';
    };
    isolators: number;
  };

  ratings: Record<string, number>;
  curves: Record<string, number>;

  labels: {
    has_handwritten: boolean;
    has_printed: boolean;
    has_pictograms: boolean;
    pictogram_types: string[];
    abbreviations_found: Record<string, string>;
  };

  image_quality: {
    lighting: 'excellent' | 'good' | 'moderate' | 'poor' | 'very_poor';
    clarity: 'sharp' | 'acceptable' | 'blurry' | 'very_blurry';
    board_visibility: 'full' | 'partial' | 'obscured';
    angle: 'straight_on' | 'slight_angle' | 'significant_angle';
  };

  circuits: Array<{
    position: number;
    device_type: string;
    rating_amps: number;
    curve: string;
    label_text: string | null;
    pictogram: string | null;
    phase: '1P' | '3P';
    confidence: number;
  }>;

  analysis_confidence: number;
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

// ============================================================================
// GEMINI ANALYSIS
// ============================================================================

async function analyzeTrainingPhoto(imageData: { mimeType: string; data: string }): Promise<TrainingAnalysisResult> {
  console.log('Analyzing training photo with Gemini...');

  const comprehensivePrompt = `You are a UK electrical expert analyzing a consumer unit/distribution board photo for training data purposes.

Analyze this photo COMPREHENSIVELY and extract EVERY detail visible. This data will be used to train AI systems.

Return a JSON object with this EXACT structure:

{
  "board": {
    "manufacturer": "string - board brand (Hager, MK, Schneider, Wylex, Contactum, Fusebox, etc.)",
    "model_series": "string or null - model name if visible",
    "age_category": "new|recent|aged|legacy - based on style, yellowing, wear",
    "total_ways": number - total physical ways/positions in the board,
    "populated_ways": number - ways with devices installed,
    "main_switch": {
      "rating_amps": number - main switch rating (typically 63, 80, 100A),
      "position": "left|right|center|top"
    }
  },

  "phase_config": {
    "is_three_phase": boolean - true if L1/L2/L3 visible or 3-row layout,
    "layout": "single|3P-vertical|3P-horizontal",
    "busbar_labels": ["L1", "L2", "L3"] or ["L", "N"] - visible busbar markings
  },

  "structure": {
    "is_split_load": boolean - true if board has RCD-protected and non-RCD sections,
    "split_point_way": number or null - position where split occurs,
    "rcd_protected_ways": [numbers] - which ways are RCD protected
  },

  "devices": {
    "mcbs": number - count of MCBs (no test button),
    "rcbos": number - count of RCBOs (small test button),
    "rcds": number - count of RCDs (2-module wide, large test button),
    "afdds": number - count of AFDDs,
    "spd": {
      "present": boolean,
      "status": "green_ok|yellow_check|red_replace|unknown"
    },
    "isolators": number - count of isolator/main switches
  },

  "ratings": {
    "6A": count,
    "10A": count,
    "16A": count,
    "20A": count,
    "32A": count,
    "40A": count,
    "50A": count,
    "63A": count
  },

  "curves": {
    "B": count - B curve MCBs (domestic),
    "C": count - C curve MCBs (motors),
    "D": count - D curve MCBs (high inrush)
  },

  "labels": {
    "has_handwritten": boolean - any handwritten labels,
    "has_printed": boolean - any printed/typed labels,
    "has_pictograms": boolean - any pictogram symbols,
    "pictogram_types": ["SOCKET", "LIGHTING", "COOKER", "SHOWER", etc.],
    "abbreviations_found": {"K Skt": "Kitchen Sockets", "D/S": "Downstairs", etc.}
  },

  "image_quality": {
    "lighting": "excellent|good|moderate|poor|very_poor",
    "clarity": "sharp|acceptable|blurry|very_blurry",
    "board_visibility": "full|partial|obscured",
    "angle": "straight_on|slight_angle|significant_angle"
  },

  "circuits": [
    {
      "position": 1,
      "device_type": "MCB|RCBO|RCD|AFDD|Isolator|Spare",
      "rating_amps": 16,
      "curve": "B|C|D|null",
      "label_text": "Kitchen Sockets" or null,
      "pictogram": "SOCKET" or null,
      "phase": "1P|3P",
      "confidence": 0.95
    }
  ],

  "analysis_confidence": 0.85
}

IMPORTANT GUIDELINES:
1. Count EVERY way position, even spare/blanked ones
2. For 3-phase boards, note which circuits span 3 positions
3. Identify device types by: MCB (no button), RCBO (small test button), RCD (2-wide, big button)
4. Note all visible label text exactly as written (including misspellings)
5. Common pictograms: socket outlet, light bulb, cooker/oven, shower head, immersion heater, garage, smoke alarm, boiler
6. Rate image quality honestly - this helps filter training data
7. Set confidence based on visibility/clarity (0.0 = guess, 1.0 = certain)

Return ONLY the JSON object, no other text.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [
            { text: comprehensivePrompt },
            { inlineData: imageData }
          ]
        }],
        generationConfig: {
          maxOutputTokens: 8000,
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      }),
    }
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

  return parseAIResponse(text, 'Training analysis');
}

// ============================================================================
// DATABASE OPERATIONS
// ============================================================================

async function saveAnalysisToDatabase(
  imageId: string | null,
  analysis: TrainingAnalysisResult
): Promise<string> {
  console.log('Saving analysis to database...');

  const insertData = {
    image_id: imageId,

    // Board identification
    manufacturer: analysis.board.manufacturer,
    model_series: analysis.board.model_series,
    board_age_category: analysis.board.age_category,

    // Board structure
    total_ways: analysis.board.total_ways,
    populated_ways: analysis.board.populated_ways,
    empty_ways: analysis.board.total_ways - analysis.board.populated_ways,
    main_switch_rating_amps: analysis.board.main_switch.rating_amps,
    main_switch_position: analysis.board.main_switch.position,

    // Phase configuration
    is_three_phase: analysis.phase_config.is_three_phase,
    phase_layout: analysis.phase_config.layout,
    busbar_labels: analysis.phase_config.busbar_labels,

    // Board type
    is_split_load: analysis.structure.is_split_load,
    rcd_count: analysis.devices.rcds,
    split_point_position: analysis.structure.split_point_way,

    // Devices detected
    mcb_count: analysis.devices.mcbs,
    rcbo_count: analysis.devices.rcbos,
    rcd_count_devices: analysis.devices.rcds,
    afdd_count: analysis.devices.afdds,
    spd_present: analysis.devices.spd.present,
    spd_status: analysis.devices.spd.present ? analysis.devices.spd.status : null,

    // Ratings breakdown
    ratings_distribution: analysis.ratings,
    curves_distribution: analysis.curves,

    // Labels & pictograms
    has_handwritten_labels: analysis.labels.has_handwritten,
    has_printed_labels: analysis.labels.has_printed,
    has_pictograms: analysis.labels.has_pictograms,
    pictogram_types: analysis.labels.pictogram_types,
    label_abbreviations: analysis.labels.abbreviations_found,

    // Image quality assessment
    lighting_conditions: analysis.image_quality.lighting,
    image_clarity: analysis.image_quality.clarity,
    board_visibility: analysis.image_quality.board_visibility,
    angle_quality: analysis.image_quality.angle,

    // Circuit-level data
    circuits: analysis.circuits,

    // Analysis metadata
    ai_model_used: 'gemini-3-flash-preview',
    analysis_confidence: analysis.analysis_confidence,
    analysis_timestamp: new Date().toISOString(),
    human_verified: false,
  };

  const { data, error } = await supabase
    .from('board_training_analysis')
    .insert(insertData)
    .select('id')
    .single();

  if (error) {
    console.error('Database insert error:', error);
    throw new Error(`Failed to save analysis: ${error.message}`);
  }

  console.log('Analysis saved with ID:', data.id);
  return data.id;
}

async function uploadImageAndCreateReference(
  imageBase64: string,
  mimeType: string,
  analysis: TrainingAnalysisResult
): Promise<string> {
  console.log('Uploading image to storage...');

  // Generate unique filename
  const ext = mimeType.includes('png') ? 'png' : 'jpg';
  const filename = `training/${crypto.randomUUID()}.${ext}`;

  // Decode base64 and upload
  const imageBytes = Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0));

  const { error: uploadError } = await supabase.storage
    .from('board-reference-images')
    .upload(filename, imageBytes, {
      contentType: mimeType,
      upsert: false,
    });

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('board-reference-images')
    .getPublicUrl(filename);

  // Create board_reference_images record
  const { data: refImage, error: refError } = await supabase
    .from('board_reference_images')
    .insert({
      manufacturer: analysis.board.manufacturer,
      model_series: analysis.board.model_series,
      image_type: 'in_situ_clean', // Default, can be updated
      image_url: publicUrl,
      storage_path: filename,
      source_type: 'user_contributed',
      description: `${analysis.board.manufacturer} ${analysis.board.total_ways}-way board`,
      device_types_shown: [
        ...(analysis.devices.mcbs > 0 ? ['MCB'] : []),
        ...(analysis.devices.rcbos > 0 ? ['RCBO'] : []),
        ...(analysis.devices.rcds > 0 ? ['RCD'] : []),
        ...(analysis.devices.afdds > 0 ? ['AFDD'] : []),
        ...(analysis.devices.spd.present ? ['SPD'] : []),
      ],
      ratings_visible: Object.keys(analysis.ratings).filter(r => analysis.ratings[r] > 0),
      lighting_conditions: analysis.image_quality.lighting,
      verified: false,
      metadata: {
        has_handwritten_labels: analysis.labels.has_handwritten,
        is_three_phase: analysis.phase_config.is_three_phase,
        has_pictograms: analysis.labels.has_pictograms,
        auto_analyzed: true,
      },
    })
    .select('id')
    .single();

  if (refError) {
    console.error('Reference image insert error:', refError);
    throw new Error(`Failed to create reference record: ${refError.message}`);
  }

  console.log('Created reference image:', refImage.id);
  return refImage.id;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  console.log('analyze-training-photo | ' + new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const body: TrainingPhotoRequest = await req.json();

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    let imageData: { mimeType: string; data: string };
    let existingImageId: string | null = null;

    // Get image data from one of the sources
    if (body.image_base64) {
      // Direct base64 upload
      const match = body.image_base64.match(/data:(.*?);base64,(.+)/);
      if (match) {
        imageData = { mimeType: match[1], data: match[2] };
      } else {
        // Assume it's raw base64 with JPEG
        imageData = { mimeType: 'image/jpeg', data: body.image_base64 };
      }
    } else if (body.image_url) {
      // URL provided
      imageData = await urlToBase64(body.image_url);
    } else if (body.reference_image_id) {
      // Analyze existing reference image
      const { data: refImage, error } = await supabase
        .from('board_reference_images')
        .select('id, image_url')
        .eq('id', body.reference_image_id)
        .single();

      if (error || !refImage) {
        throw new Error(`Reference image not found: ${body.reference_image_id}`);
      }

      existingImageId = refImage.id;
      imageData = await urlToBase64(refImage.image_url);
    } else {
      throw new Error('Must provide image_base64, image_url, or reference_image_id');
    }

    console.log('Image loaded, analyzing...');

    // Run comprehensive analysis
    const analysis = await analyzeTrainingPhoto(imageData);

    console.log('Analysis complete:', {
      manufacturer: analysis.board.manufacturer,
      ways: analysis.board.total_ways,
      circuits: analysis.circuits.length,
      confidence: analysis.analysis_confidence,
    });

    // Save to database if requested
    let savedImageId = existingImageId;
    let savedAnalysisId: string | null = null;

    if (body.save_to_db !== false) {
      // If we have direct upload (base64), create reference image first
      if (body.image_base64 && !existingImageId) {
        savedImageId = await uploadImageAndCreateReference(imageData.data, imageData.mimeType, analysis);
      }

      // Save the analysis
      savedAnalysisId = await saveAnalysisToDatabase(savedImageId, analysis);
    }

    const processingTime = Date.now() - startTime;
    console.log(`Processing complete in ${processingTime}ms`);

    return new Response(JSON.stringify({
      success: true,
      analysis,
      image_id: savedImageId,
      analysis_id: savedAnalysisId,
      processing_time_ms: processingTime,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Error after ${duration}ms:`, error);

    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      processing_time_ms: duration,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
