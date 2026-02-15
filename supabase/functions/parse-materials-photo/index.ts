/**
 * Parse Materials Photo Edge Function
 * Uses Gemini 3 Flash Preview for vision-based materials list extraction
 * Recognises UK electrical trade abbreviations (T&E, SWA, CU, RCBO, MCB)
 */

import { serve, corsHeaders } from '../_shared/deps.ts';
import { ValidationError, ExternalAPIError, handleError } from '../_shared/errors.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

interface ParseMaterialsPhotoRequest {
  image_base64: string;
  image_type: string;
}

interface ExtractedMaterial {
  name: string;
  quantity: number;
  unit: string;
  original_text: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'parse-materials-photo' });

  try {
    const { image_base64, image_type }: ParseMaterialsPhotoRequest = await req.json();

    if (!image_base64 || typeof image_base64 !== 'string') {
      throw new ValidationError('image_base64 is required and must be a string');
    }

    if (
      !image_type ||
      !['image/jpeg', 'image/png', 'image/heic', 'image/webp'].includes(image_type)
    ) {
      throw new ValidationError(
        'image_type must be one of: image/jpeg, image/png, image/heic, image/webp'
      );
    }

    const estimatedSizeMB = (image_base64.length * 0.75) / (1024 * 1024);
    if (estimatedSizeMB > 20) {
      throw new ValidationError('Image size exceeds 20MB limit');
    }

    logger.info('Processing materials photo', {
      imageType: image_type,
      estimatedSizeMB: estimatedSizeMB.toFixed(2),
    });

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) {
      throw new Error('GEMINI_API_KEY environment variable not configured');
    }

    const systemPrompt = `You are a specialist OCR system for reading UK electrical trade materials lists. You can read handwritten notes, printed lists, screenshots, and photos of materials schedules.

## YOUR TASK
Read the image and extract EVERY materials item into structured JSON. One entry per distinct material.

## UK ELECTRICAL TRADE KNOWLEDGE

### Common Abbreviations
- T&E = Twin and Earth cable (6242Y)
- SWA = Steel Wire Armoured cable
- CU = Consumer Unit
- RCBO = Residual Current Breaker with Overcurrent protection
- MCB = Miniature Circuit Breaker
- RCD = Residual Current Device
- RCCD = Residual Current Circuit Device
- SPD = Surge Protection Device
- DB = Distribution Board
- CPC = Circuit Protective Conductor
- XLPE = Cross-Linked Polyethylene
- LSF = Low Smoke and Fume
- FP = Fire Performance
- PIR = Passive Infrared (sensor)

### Cable Sizes
- Common: 1.0mm, 1.5mm, 2.5mm, 4mm, 6mm, 10mm, 16mm, 25mm
- Format: "2.5mm T&E" or "6242Y 2.5mm 100m"

### Supplier SKU Formats
- Screwfix: alphanumeric (e.g., "7936D")
- Toolstation: numeric (e.g., "84321")
- CEF: alphanumeric with dashes

## EXTRACTION RULES

1. Extract quantity from patterns like "10x", "x10", "Qty: 10", or numbers before items
2. Default quantity to 1 if not shown
3. Use full product descriptions, expand abbreviations where helpful
4. Determine unit: each, m (metres), roll, box, pack, pair, set
5. Include the original text exactly as written

## OUTPUT FORMAT

Return ONLY valid JSON:
{
  "source_type": "handwritten" | "printed" | "screenshot",
  "items": [
    {
      "name": "2.5mm Twin and Earth Cable 100m",
      "quantity": 10,
      "unit": "each",
      "original_text": "10x 2.5mm T&E 100m"
    }
  ]
}

## CRITICAL
- Extract EVERY item visible
- Never skip items
- Expand common abbreviations in the name field
- Keep original_text exactly as written
- Default unit to "each" if unclear`;

    const geminiResponse = await logger.time('Gemini Vision API call', async () => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: 'Extract all materials items from this image. This is a UK electrical trade materials list. Return JSON only.',
                  },
                  {
                    inline_data: {
                      mime_type: image_type,
                      data: image_base64,
                    },
                  },
                ],
              },
            ],
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            generationConfig: {
              responseMimeType: 'application/json',
              maxOutputTokens: 8000,
              temperature: 0.05,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new ExternalAPIError('Gemini', {
          status: response.status,
          error: errorText,
        });
      }

      return response.json();
    });

    const candidate = geminiResponse.candidates?.[0];

    if (!candidate?.content?.parts?.[0]?.text) {
      logger.warn('Empty response from Gemini', {
        finishReason: candidate?.finishReason,
      });

      return new Response(
        JSON.stringify({
          success: false,
          text: '',
          items: [],
          source_type: null,
          requestId,
          error: 'Could not extract materials from image. Please try a clearer photo.',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    const extractedText = candidate.content.parts[0].text;

    let parsedData: { source_type?: string; items?: ExtractedMaterial[] };
    try {
      parsedData = JSON.parse(extractedText);
    } catch {
      logger.error('Failed to parse Gemini JSON response', {
        rawResponse: extractedText.substring(0, 500),
      });

      return new Response(
        JSON.stringify({
          success: false,
          text: extractedText,
          items: [],
          source_type: null,
          requestId,
          error: 'Failed to parse materials data. Please try a clearer photo.',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    const validatedItems: ExtractedMaterial[] = (parsedData.items || [])
      .filter((item) => item && item.name)
      .map((item) => ({
        name: String(item.name).trim(),
        quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
        unit: ['each', 'm', 'roll', 'box', 'pack', 'pair', 'set'].includes(item.unit)
          ? item.unit
          : 'each',
        original_text: item.original_text ? String(item.original_text).trim() : String(item.name).trim(),
      }));

    // Build text representation for downstream use
    const textRepresentation = validatedItems
      .map((item) => `${item.quantity} x ${item.name}`)
      .join('\n');

    logger.info('Materials photo parsed successfully', {
      sourceType: parsedData.source_type,
      itemCount: validatedItems.length,
    });

    return new Response(
      JSON.stringify({
        success: true,
        text: textRepresentation,
        items: validatedItems,
        source_type: parsedData.source_type || null,
        requestId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    logger.error('Failed to parse materials photo', { error });
    return handleError(error);
  }
});
