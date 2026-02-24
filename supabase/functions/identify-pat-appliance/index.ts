/**
 * Identify PAT Appliance Edge Function
 * Uses Gemini Flash for vision-based appliance identification
 * Takes a photo of an appliance and returns: description, make, model,
 * category, class, and any visible serial/asset numbers.
 */

import { serve, corsHeaders } from '../_shared/deps.ts';

interface IdentifyRequest {
  image_base64: string;
  image_type: string;
}

interface ApplianceInfo {
  description: string;
  make: string;
  model: string;
  serial_number: string;
  asset_number: string;
  category: 'IT' | 'portable' | 'moveable' | 'stationary' | 'fixed' | 'hand-held';
  appliance_class: 'I' | 'II' | 'III';
  confidence: 'high' | 'medium' | 'low';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image_base64, image_type }: IdentifyRequest = await req.json();

    if (!image_base64 || typeof image_base64 !== 'string') {
      return new Response(JSON.stringify({ success: false, error: 'image_base64 is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'GEMINI_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an expert electrical engineer identifying appliances for UK PAT (Portable Appliance Testing) certificates.

## YOUR TASK
Look at the photo and identify the electrical appliance. Extract as much information as possible.

## FIELDS TO EXTRACT

1. **description**: What the appliance is (e.g., "Kettle", "Desktop Monitor", "Desk Lamp", "Laptop Charger", "Extension Lead 4-gang", "Microwave Oven", "Drill", "Angle Grinder")
2. **make**: The manufacturer/brand visible on the appliance (e.g., "Russell Hobbs", "Dell", "Bosch", "Makita"). Empty string if not visible.
3. **model**: The model name/number if visible (e.g., "KE1234", "Latitude 5520"). Empty string if not visible.
4. **serial_number**: Serial number if visible on a label. Empty string if not visible.
5. **asset_number**: Asset/PAT tag number if a sticker/label is visible. Empty string if not visible.
6. **category**: One of these IET Code of Practice categories:
   - "hand-held" — held in the hand during use (drills, hair dryers, irons)
   - "portable" — can be moved while connected or <18kg (kettles, toasters, fans, desk lamps)
   - "moveable" — >18kg but can be moved (fridges, washing machines on castors)
   - "stationary" — >18kg, not designed to be moved (large photocopiers, vending machines)
   - "fixed" — permanently connected (hand dryers, storage heaters)
   - "IT" — information technology equipment (computers, monitors, printers, servers)
7. **appliance_class**: Electrical safety class:
   - "I" — earthed (metal casing with earth wire, 3-pin plug) — most appliances
   - "II" — double insulated (marked with ⬜⬜ symbol, plastic casing, 2-core cable, may have 3-pin plug but earth not connected)
   - "III" — extra-low voltage (runs on <50V AC, e.g., laptop via charger, phone charger output)
8. **confidence**: How confident you are overall — "high", "medium", or "low"

## RULES
- If you can clearly see the appliance, provide your best identification
- For make/model, only fill in what you can actually READ from labels/branding — do not guess
- For category and class, use your electrical knowledge to determine the most likely values
- Most kitchen appliances with metal bodies are Class I
- Most phone/laptop chargers are Class II (double insulated)
- Extension leads are Class I and category "portable"
- If the image is unclear or not an appliance, set confidence to "low"

## OUTPUT FORMAT
Return ONLY valid JSON matching this schema:
{
  "description": "string",
  "make": "string",
  "model": "string",
  "serial_number": "string",
  "asset_number": "string",
  "category": "hand-held" | "portable" | "moveable" | "stationary" | "fixed" | "IT",
  "appliance_class": "I" | "II" | "III",
  "confidence": "high" | "medium" | "low"
}`;

    const mimeType = ['image/jpeg', 'image/png', 'image/heic', 'image/webp'].includes(image_type)
      ? image_type
      : 'image/jpeg';

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Identify this electrical appliance for a UK PAT testing certificate. Extract all visible information including make, model, serial number, and determine the IET category and electrical class.',
                },
                {
                  inline_data: {
                    mime_type: mimeType,
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
            maxOutputTokens: 1000,
            temperature: 0.1,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(
        JSON.stringify({ success: false, error: `Gemini API error: ${response.status}` }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiData = await response.json();
    const candidate = geminiData.candidates?.[0];
    if (!candidate?.content?.parts?.[0]?.text) {
      return new Response(JSON.stringify({ success: false, error: 'No response from Gemini' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawText = candidate.content.parts[0].text;

    let parsed: ApplianceInfo;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to parse AI response' }),
          { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        appliance: {
          description: parsed.description || '',
          make: parsed.make || '',
          model: parsed.model || '',
          serial_number: parsed.serial_number || '',
          asset_number: parsed.asset_number || '',
          category: parsed.category || 'portable',
          appliance_class: parsed.appliance_class || 'I',
          confidence: parsed.confidence || 'low',
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error identifying appliance:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
