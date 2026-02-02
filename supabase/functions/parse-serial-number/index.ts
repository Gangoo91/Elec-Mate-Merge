/**
 * Parse Serial Number Edge Function
 * Uses Gemini Flash 3.0 Preview for vision-based serial number extraction
 * Optimized for fire alarm panel labels, equipment nameplates, etc.
 */

import { serve, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, ExternalAPIError, handleError } from "../_shared/errors.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

interface ParseSerialRequest {
  image_base64: string;
  image_type: string; // "image/jpeg" | "image/png" | "image/heic"
}

interface ParseSerialResponse {
  success: boolean;
  serial_number: string | null;
  confidence: 'high' | 'medium' | 'low';
  all_text_found: string[];
  requestId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'parse-serial-number' });

  try {
    const { image_base64, image_type }: ParseSerialRequest = await req.json();

    // Input validation
    if (!image_base64 || typeof image_base64 !== 'string') {
      throw new ValidationError('image_base64 is required and must be a string');
    }

    if (!image_type || !['image/jpeg', 'image/png', 'image/heic', 'image/webp'].includes(image_type)) {
      throw new ValidationError('image_type must be one of: image/jpeg, image/png, image/heic, image/webp');
    }

    // Check image size (rough estimate - base64 is ~4/3 of original size)
    const estimatedSizeMB = (image_base64.length * 0.75) / (1024 * 1024);
    if (estimatedSizeMB > 10) {
      throw new ValidationError('Image size exceeds 10MB limit');
    }

    logger.info('Processing serial number photo', {
      imageType: image_type,
      estimatedSizeMB: estimatedSizeMB.toFixed(2)
    });

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) {
      throw new Error('GEMINI_API_KEY environment variable not configured');
    }

    // System prompt for serial number extraction
    const systemPrompt = `You are a specialist OCR system for reading serial numbers from equipment labels and nameplates.

## YOUR TASK
Read the image and extract the SERIAL NUMBER from the equipment label. This is typically for:
- Fire alarm control panels
- Electrical equipment
- Industrial machinery
- Building services equipment

## WHAT IS A SERIAL NUMBER?
Serial numbers are unique identifiers, typically:
- Alphanumeric codes (letters and numbers)
- Often prefixed with "S/N:", "Serial:", "SN:", "Serial No:", or similar
- Usually 6-20 characters
- May include dashes, slashes, or spaces

## COMMON PATTERNS
- "SN: ABC123456"
- "Serial: FA-2024-00123"
- "S/N 12345678"
- "Serial Number: XYZ-001234"
- Just a code near "Serial" label: "AP-FA-2024-1234"

## WHAT TO IGNORE
- Model numbers (usually labeled "Model", "Part No", "Type")
- Barcodes (unless the number below is labeled as serial)
- Date codes
- Lot numbers
- MAC addresses (XX:XX:XX:XX:XX:XX format)

## OUTPUT FORMAT
Return ONLY valid JSON:
{
  "serial_number": "THE_SERIAL_NUMBER" or null,
  "confidence": "high" | "medium" | "low",
  "all_text_found": ["array", "of", "all", "text", "visible"]
}

## CONFIDENCE LEVELS
- high: Clear "Serial" label with readable number
- medium: Number found but label partially visible or ambiguous
- low: Best guess, no clear serial label visible

## IMPORTANT
- Extract the EXACT characters visible - no guessing
- Include any dashes, spaces, or special characters as shown
- If multiple serial-like numbers visible, pick the one most clearly labeled as "Serial"
- null if genuinely no serial number visible`;

    // Call Gemini Flash 3.0 Preview for vision extraction
    const geminiResponse = await logger.time('Gemini Vision API call', async () => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                {
                  text: `Extract the serial number from this equipment label/nameplate. Be precise - extract the exact characters visible.`
                },
                {
                  inline_data: {
                    mime_type: image_type,
                    data: image_base64
                  }
                }
              ]
            }],
            systemInstruction: {
              parts: [{
                text: systemPrompt
              }]
            },
            generationConfig: {
              responseMimeType: 'application/json',
              maxOutputTokens: 1000,
              temperature: 0.05 // Very low temperature for maximum accuracy
            }
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new ExternalAPIError('Gemini', {
          status: response.status,
          error: errorText
        });
      }

      return response.json();
    });

    // Parse Gemini response
    const candidate = geminiResponse.candidates?.[0];
    if (!candidate?.content?.parts?.[0]?.text) {
      throw new Error('No response from Gemini Vision API');
    }

    const rawText = candidate.content.parts[0].text;
    logger.info('Raw Gemini response', { rawText: rawText.substring(0, 500) });

    // Parse JSON response
    let parsed: { serial_number: string | null; confidence: string; all_text_found: string[] };
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Try to extract JSON from response if wrapped in markdown
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse Gemini response as JSON');
      }
    }

    // Clean up serial number (trim whitespace, normalize)
    let serialNumber = parsed.serial_number;
    if (serialNumber) {
      serialNumber = serialNumber.trim();
      // Remove common prefixes if accidentally included
      serialNumber = serialNumber.replace(/^(S\/N:?|Serial:?|SN:?)\s*/i, '').trim();
    }

    const result: ParseSerialResponse = {
      success: true,
      serial_number: serialNumber || null,
      confidence: (parsed.confidence as 'high' | 'medium' | 'low') || 'low',
      all_text_found: parsed.all_text_found || [],
      requestId
    };

    logger.info('Serial number extraction complete', {
      found: !!result.serial_number,
      confidence: result.confidence
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return handleError(error, requestId);
  }
});
