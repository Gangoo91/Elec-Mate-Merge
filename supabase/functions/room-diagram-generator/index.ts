import { serve, corsHeaders } from '../_shared/deps.ts';

const VERSION = 'v1.0.0';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description } = await req.json();
    
    if (!description) {
      throw new Error('Room description is required');
    }

    console.log('🏠 Generating room diagram from:', description);

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) throw new Error('GEMINI_API_KEY not configured');

    const prompt = `You are an expert electrical diagram generator for UK electricians. Parse the user's natural language room description and convert it to a structured JSON format for canvas rendering.

USER DESCRIPTION:
${description}

IMPORTANT PARSING RULES:
1. Extract room name
2. Parse wall dimensions (in metres) - identify north, south, east, west walls
3. Identify features on each wall (doors, windows)
4. Extract electrical components (sockets, switches, lights) with positions
5. Place sockets at realistic heights (0.3m above floor = 150mm above skirting)
6. Place switches at realistic heights (1.2m above floor)
7. Place ceiling lights at room center unless specified otherwise
8. If wall orientation not specified, assume: top=north, right=east, bottom=south, left=west

SOCKET TYPES (use exact IDs):
- "socket-single-13a-bs7671" for single sockets
- "socket-double-13a-bs7671" for double sockets
- "socket-rcd-bs7671" for RCD sockets
- "socket-cooker-45a-bs7671" for cooker outlets

SWITCH TYPES:
- "switch-1way-bs7671" for 1-way switches
- "switch-2way-bs7671" for 2-way switches
- "switch-dimmer-bs7671" for dimmers
- "switch-pullcord-bs7671" for pull cords

LIGHT TYPES:
- "light-ceiling-bs7671" for ceiling lights
- "light-wall-bs7671" for wall lights
- "light-downlight-bs7671" for downlights

Return ONLY valid JSON in this exact format:
{
  "room": {
    "name": "Kitchen",
    "dimensions": { "width": 4, "height": 3, "unit": "m" }
  },
  "walls": [
    { "id": "north", "length": 4, "features": [{ "type": "window", "position": "center", "width": 1.5 }] },
    { "id": "east", "length": 3, "features": [{ "type": "door", "position": "right", "width": 0.9 }] },
    { "id": "south", "length": 4, "features": [] },
    { "id": "west", "length": 3, "features": [] }
  ],
  "symbols": [
    { "type": "socket-double-13a-bs7671", "wall": "south", "position": 1, "heightFromFloor": 0.3 },
    { "type": "socket-double-13a-bs7671", "wall": "south", "position": 2.5, "heightFromFloor": 0.3 },
    { "type": "switch-1way-bs7671", "wall": "west", "position": 0.3, "heightFromFloor": 1.2 },
    { "type": "light-ceiling-bs7671", "position": "center" }
  ]
}

CRITICAL: Return ONLY the JSON object, no markdown, no explanations, no code blocks.`;

    // Import Gemini provider
    const { callGemini, withRetry } = await import('../_shared/ai-providers.ts');

    const result = await withRetry(async () => {
      const response = await callGemini({
        messages: [
          { role: 'system', content: 'You are an expert electrical diagram parser. Return only valid JSON, no markdown formatting.' },
          { role: 'user', content: prompt }
        ],
        model: 'gemini-2.5-flash',
        temperature: 0.3,
        max_tokens: 8000,  // Increased to handle detailed room JSON with multiple symbols
        response_format: { type: 'json_object' }
      }, geminiKey);

      // Clean response (remove markdown code blocks if present)
      let cleanedContent = response.content.trim();
      if (cleanedContent.startsWith('```json')) {
        cleanedContent = cleanedContent.replace(/```json\n?/g, '').replace(/```\n?$/g, '').trim();
      } else if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.replace(/```\n?/g, '').trim();
      }

      return JSON.parse(cleanedContent);
    }, 3, 2000);

    console.log('✅ Room parsed:', JSON.stringify(result, null, 2));

    // Validate structure
    if (!result.room || !result.walls || !result.symbols) {
      throw new Error('Invalid room data structure returned by AI');
    }

    return new Response(JSON.stringify({ 
      success: true,
      roomData: result,
      version: VERSION
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Room generation error:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate room diagram',
      version: VERSION
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
