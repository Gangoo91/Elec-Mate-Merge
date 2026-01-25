/**
 * Parse Expense Receipt Edge Function
 * Uses Gemini Vision for receipt OCR - extracts vendor, amount, date, category
 */

import { serve, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, ExternalAPIError, handleError } from "../_shared/errors.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

interface ParseExpenseRequest {
  image_base64: string;
  image_type: string; // "image/jpeg" | "image/png" | "image/heic"
}

interface ParseExpenseResponse {
  success: boolean;
  vendor: string | null;
  amount: string | null;
  date: string | null;
  category: string | null;
  vat_amount: string | null;
  description: string | null;
  confidence: number;
  raw_text?: string;
  requestId: string;
  error?: string;
}

// Expense categories for sole traders
const EXPENSE_CATEGORIES = [
  'fuel', 'tools', 'ppe', 'materials', 'hotels', 'mileage',
  'training', 'vehicle', 'insurance', 'subscriptions', 'meals', 'other'
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'parse-expense-receipt' });

  try {
    const { image_base64, image_type }: ParseExpenseRequest = await req.json();

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

    logger.info('Processing expense receipt', {
      imageType: image_type,
      estimatedSizeMB: estimatedSizeMB.toFixed(2)
    });

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) {
      throw new Error('GEMINI_API_KEY environment variable not configured');
    }

    // Build the system prompt for expense receipt extraction
    const systemPrompt = `You are a specialist OCR system for reading expense receipts. Extract key expense details with maximum accuracy.

## YOUR TASK
Read the receipt image and extract expense details into structured JSON for a sole trader's expense tracking.

## EXTRACTION FIELDS

### 1. VENDOR/STORE NAME (vendor)
- Look for store name at top of receipt
- Common examples: "Shell", "BP", "Screwfix", "Toolstation", "Premier Inn", "Costa Coffee"
- Extract the business name exactly as shown

### 2. TOTAL AMOUNT (amount)
- Find the TOTAL or GRAND TOTAL amount
- Look for labels: "TOTAL", "GRAND TOTAL", "AMOUNT DUE", "TO PAY"
- This is typically at the bottom of the receipt
- Return as a number with 2 decimal places (e.g., "45.99")
- Do NOT include currency symbols in the value

### 3. DATE (date)
- Find the transaction date
- Convert to ISO format: YYYY-MM-DD
- Common formats on receipts: "15/01/2024", "15 JAN 2024", "2024-01-15"

### 4. CATEGORY (category)
Classify the expense into one of these categories:
- "fuel" - Petrol, diesel, fuel stations (Shell, BP, Esso, Texaco)
- "tools" - Hardware stores, tool purchases (Screwfix, Toolstation, B&Q)
- "ppe" - Safety equipment, workwear
- "materials" - Electrical supplies, building materials
- "hotels" - Accommodation (Premier Inn, Travelodge, hotels)
- "training" - Courses, training, certifications
- "vehicle" - Vehicle repairs, servicing, MOT
- "insurance" - Insurance premiums
- "subscriptions" - Software, memberships
- "meals" - Food & drink for work (Limited tax deduction)
- "other" - Anything that doesn't fit above

### 5. VAT AMOUNT (vat_amount)
- Look for "VAT", "VAT @", or VAT breakdown
- Return as a number with 2 decimal places
- null if not visible

### 6. DESCRIPTION (description)
- Brief description of what was purchased
- e.g., "Diesel fuel", "Hand tools", "Coffee and sandwich"

## OUTPUT FORMAT

Return ONLY valid JSON:
{
  "vendor": "Store name",
  "amount": "45.99",
  "date": "2024-01-15",
  "category": "fuel",
  "vat_amount": "7.66",
  "description": "Diesel fuel",
  "confidence": 0.85
}

## CONFIDENCE SCORING
Rate your confidence (0.0 to 1.0) based on:
- 0.9-1.0: Very clear receipt, all fields readable
- 0.7-0.9: Most fields clear, some uncertainty
- 0.5-0.7: Partial data extracted, some guessing
- 0.0-0.5: Poor quality, significant guessing

## EXAMPLES

### Fuel Receipt
{
  "vendor": "Shell Service Station",
  "amount": "62.50",
  "date": "2024-01-20",
  "category": "fuel",
  "vat_amount": "10.42",
  "description": "Diesel 45L",
  "confidence": 0.92
}

### Tool Store Receipt
{
  "vendor": "Screwfix",
  "amount": "89.99",
  "date": "2024-01-18",
  "category": "tools",
  "vat_amount": "15.00",
  "description": "Power drill and drill bits",
  "confidence": 0.88
}

### Hotel Receipt
{
  "vendor": "Premier Inn",
  "amount": "79.00",
  "date": "2024-01-15",
  "category": "hotels",
  "vat_amount": null,
  "description": "1 night accommodation",
  "confidence": 0.95
}

## CRITICAL RULES
- Return null for any field you cannot find
- Amount must be the TOTAL, not a line item
- Use UK date format understanding (DD/MM/YYYY → YYYY-MM-DD)
- Be conservative with confidence scores`;

    // Call Gemini Vision API
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
                  text: `Extract expense details from this receipt. Return JSON only.`
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
              maxOutputTokens: 2000,
              temperature: 0.1 // Low temperature for accuracy
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
          vendor: null,
          amount: null,
          date: null,
          category: null,
          vat_amount: null,
          description: null,
          confidence: 0,
          requestId,
          error: 'Could not extract details from receipt. Please try a clearer photo.'
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
          vendor: null,
          amount: null,
          date: null,
          category: null,
          vat_amount: null,
          description: null,
          confidence: 0,
          requestId,
          error: 'Failed to parse receipt data. Please try a clearer photo.'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    // Validate and sanitize data
    const validCategory = EXPENSE_CATEGORIES.includes(parsedData.category?.toLowerCase())
      ? parsedData.category.toLowerCase()
      : null;

    // Parse and validate amount
    let validAmount: string | null = null;
    if (parsedData.amount) {
      const amountNum = parseFloat(String(parsedData.amount).replace(/[£$€,]/g, ''));
      if (!isNaN(amountNum) && amountNum > 0) {
        validAmount = amountNum.toFixed(2);
      }
    }

    // Parse and validate VAT
    let validVat: string | null = null;
    if (parsedData.vat_amount) {
      const vatNum = parseFloat(String(parsedData.vat_amount).replace(/[£$€,]/g, ''));
      if (!isNaN(vatNum) && vatNum > 0) {
        validVat = vatNum.toFixed(2);
      }
    }

    // Validate date format (YYYY-MM-DD)
    let validDate: string | null = null;
    if (parsedData.date) {
      const dateStr = String(parsedData.date);
      const dateMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (dateMatch) {
        validDate = dateStr;
      }
    }

    const confidence = typeof parsedData.confidence === 'number'
      ? Math.min(1, Math.max(0, parsedData.confidence))
      : 0.5;

    logger.info('Receipt parsed successfully', {
      vendor: parsedData.vendor,
      amount: validAmount,
      category: validCategory,
      confidence
    });

    const result: ParseExpenseResponse = {
      success: true,
      vendor: parsedData.vendor ? String(parsedData.vendor).trim() : null,
      amount: validAmount,
      date: validDate,
      category: validCategory,
      vat_amount: validVat,
      description: parsedData.description ? String(parsedData.description).trim() : null,
      confidence,
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
    logger.error('Failed to parse expense receipt', { error });
    return handleError(error);
  }
});
