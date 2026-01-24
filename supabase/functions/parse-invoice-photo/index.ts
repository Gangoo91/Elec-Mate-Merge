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

    // Build the system prompt for invoice extraction - generic for any supplier
    const systemPrompt = `You are a specialist OCR system for reading invoices and receipts. Extract EVERY line item with maximum accuracy.

## YOUR TASK
Read the invoice/receipt image and extract all purchasable line items into structured JSON.

## COMMON INVOICE FORMATS

### Screwfix
- Format: "CODE x QTY    DESCRIPTION    £PRICE"
- Example: "7936D x 2    Erbauer Hex Shank Impact Nut Driver    £10.78"
- The "x 2" is QUANTITY, the £10.78 is LINE TOTAL

### Toolstation
- Format: CODE, DESCRIPTION, QTY, PRICE columns
- May have multi-line descriptions

### Trade Suppliers (CEF, Edmundson, Rexel)
- Tabular format with columns
- Product codes and detailed descriptions

### General Receipts
- Simple list: ITEM - PRICE or ITEM x QTY - PRICE

## EXTRACTION RULES

### 1. QUANTITIES
- Look for "x 2", "x 3", "Qty: 2", or numbers in QTY column
- Default to 1 if no quantity shown

### 2. PRICES (CRITICAL)
- The price on the RIGHT is usually the LINE TOTAL
- UNIT PRICE = LINE TOTAL ÷ QUANTITY
- Example: "Item x 3 ... £9.00" → unit_price = 9.00 ÷ 3 = 3.00
- DO NOT modify prices - extract exactly as shown, then calculate unit price

### 3. DESCRIPTIONS
- Extract the FULL product name/description
- Include sizes, quantities, colors, specifications
- Don't truncate or abbreviate

### 4. PRODUCT CODES
- Often alphanumeric (e.g., "7936D", "ABC123")
- May be near barcode or at start of line
- null if not visible

## OUTPUT FORMAT

Return ONLY valid JSON:
{
  "supplier_name": "Supplier name or null",
  "invoice_number": "Invoice/receipt number or null",
  "invoice_date": "YYYY-MM-DD or null",
  "items": [
    {
      "description": "Full product description",
      "quantity": 2,
      "unit_price": 5.39,
      "total_price": 10.78,
      "product_code": "ABC123" or null,
      "category": "other"
    }
  ]
}

## WORKED EXAMPLES

Line: "7936D x 2    Erbauer Hex Shank Impact Nut Driver 10mmx65mm    £10.78"
→ quantity: 2, unit_price: 5.39, total_price: 10.78

Line: "398PR x 3    Titan Wood Drill Bit 4mm    £5.67"
→ quantity: 3, unit_price: 1.89, total_price: 5.67

Line: "Milk 2L    £1.50"
→ quantity: 1, unit_price: 1.50, total_price: 1.50

## CRITICAL
- Extract EVERY line item visible
- Never skip items
- Calculate unit_price = total_price ÷ quantity
- Use "other" for category
- Ignore VAT lines, subtotals, delivery, payment info`;

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
                  text: `Extract all line items from this invoice/receipt. Be thorough - scan the entire image. Return JSON only.`
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
              maxOutputTokens: 8000,
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
