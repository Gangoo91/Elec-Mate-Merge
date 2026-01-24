/**
 * Parse Invoice Photo Edge Function
 * Uses Gemini 3 Flash Preview for vision-based invoice line item extraction
 */

import { serve, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, ExternalAPIError, handleError } from "../_shared/errors.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

interface ParseInvoiceRequest {
  image_base64: string;
  image_type: string; // "image/jpeg" | "image/png" | "image/heic"
}

interface ExtractedItem {
  description: string;
  quantity: number;
  unit_price: number | null;
  total_price: number | null;
  product_code: string | null;
  category: string;
}

interface ParseInvoiceResponse {
  success: boolean;
  supplier_name: string | null;
  invoice_number: string | null;
  invoice_date: string | null;
  items: ExtractedItem[];
  requestId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'parse-invoice-photo' });

  try {
    const { image_base64, image_type }: ParseInvoiceRequest = await req.json();

    // Input validation
    if (!image_base64 || typeof image_base64 !== 'string') {
      throw new ValidationError('image_base64 is required and must be a string');
    }

    if (!image_type || !['image/jpeg', 'image/png', 'image/heic', 'image/webp'].includes(image_type)) {
      throw new ValidationError('image_type must be one of: image/jpeg, image/png, image/heic, image/webp');
    }

    // Check image size (rough estimate - base64 is ~4/3 of original size)
    const estimatedSizeMB = (image_base64.length * 0.75) / (1024 * 1024);
    if (estimatedSizeMB > 20) {
      throw new ValidationError('Image size exceeds 20MB limit');
    }

    logger.info('Processing invoice photo', {
      imageType: image_type,
      estimatedSizeMB: estimatedSizeMB.toFixed(2)
    });

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) {
      throw new Error('GEMINI_API_KEY environment variable not configured');
    }

    // Call Gemini 3 Flash Preview for vision extraction
    const geminiResponse = await logger.time('Gemini Vision API call', async () => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                {
                  text: 'Extract all line items from this UK electrical supplier invoice or receipt. Return valid JSON only, no markdown.'
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
                text: `You are an expert at reading UK electrical supplier invoices and receipts from suppliers like Screwfix, Toolstation, CEF, Edmundson, Rexel, and independent electrical wholesalers.

Extract ALL line items from the invoice image and return JSON with this exact structure:
{
  "supplier_name": "string or null - the supplier/shop name if visible",
  "invoice_number": "string or null - invoice/receipt number if visible",
  "invoice_date": "string or null - date in YYYY-MM-DD format if visible",
  "items": [
    {
      "description": "exact product name/description from the invoice",
      "quantity": number (default to 1 if unclear),
      "unit_price": number or null (price per unit excluding VAT, in GBP),
      "total_price": number or null (line total if shown),
      "product_code": "SKU/product code if visible, otherwise null",
      "category": "one of: cables|accessories|distribution|lighting|containment|heating|fire-safety|security|ev-charging|renewable-energy|industrial|data-comms|specialist|other"
    }
  ]
}

Important guidelines:
- Extract EVERY line item, even if quality is poor
- For prices, extract the ex-VAT price if both are shown
- If only total with VAT shown, divide by 1.2 for ex-VAT price
- Guess the category based on electrical product knowledge
- Common patterns: T&E = cables, MCB/RCD = distribution, socket/switch = accessories
- If description is partially visible, include what you can read
- Return empty items array if no line items found
- Always return valid JSON, never markdown code blocks`
              }]
            },
            generationConfig: {
              responseMimeType: 'application/json',
              maxOutputTokens: 6000,
              temperature: 0.1 // Low temperature for accurate extraction
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
      logger.warn('Empty response from Gemini', {
        finishReason: candidate?.finishReason,
        safetyRatings: candidate?.safetyRatings
      });

      return new Response(
        JSON.stringify({
          success: false,
          supplier_name: null,
          invoice_number: null,
          invoice_date: null,
          items: [],
          requestId,
          error: 'Could not extract items from image. Please try a clearer photo.'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    const extractedText = candidate.content.parts[0].text;

    // Parse JSON response
    let parsedData: any;
    try {
      parsedData = JSON.parse(extractedText);
    } catch (parseError) {
      logger.error('Failed to parse Gemini JSON response', {
        rawResponse: extractedText.substring(0, 500)
      });

      return new Response(
        JSON.stringify({
          success: false,
          supplier_name: null,
          invoice_number: null,
          invoice_date: null,
          items: [],
          requestId,
          error: 'Failed to parse invoice data. Please try a clearer photo.'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    // Validate and sanitize items
    const validatedItems: ExtractedItem[] = (parsedData.items || [])
      .filter((item: any) => item && item.description)
      .map((item: any) => ({
        description: String(item.description).trim(),
        quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
        unit_price: typeof item.unit_price === 'number' ? Math.round(item.unit_price * 100) / 100 : null,
        total_price: typeof item.total_price === 'number' ? Math.round(item.total_price * 100) / 100 : null,
        product_code: item.product_code ? String(item.product_code).trim() : null,
        category: validateCategory(item.category)
      }));

    logger.info('Invoice parsed successfully', {
      supplierName: parsedData.supplier_name,
      itemCount: validatedItems.length
    });

    const result: ParseInvoiceResponse = {
      success: true,
      supplier_name: parsedData.supplier_name || null,
      invoice_number: parsedData.invoice_number || null,
      invoice_date: parsedData.invoice_date || null,
      items: validatedItems,
      requestId
    };

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    logger.error('Failed to parse invoice photo', { error });
    return handleError(error);
  }
});

/**
 * Validate category against allowed values
 */
function validateCategory(category: unknown): string {
  const validCategories = [
    'cables', 'accessories', 'distribution', 'lighting', 'containment',
    'heating', 'fire-safety', 'security', 'ev-charging', 'renewable-energy',
    'industrial', 'data-comms', 'specialist', 'other'
  ];

  if (typeof category === 'string' && validCategories.includes(category.toLowerCase())) {
    return category.toLowerCase();
  }

  return 'other';
}
