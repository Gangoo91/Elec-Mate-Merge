import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting state
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string, config: { maxRequests: number; windowMs: number }): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(identifier);
  if (existing && now > existing.resetTime) rateLimitStore.delete(identifier);
  const current = rateLimitStore.get(identifier);
  if (!current) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + config.windowMs });
    return { allowed: true, remaining: config.maxRequests - 1, resetTime: now + config.windowMs };
  }
  if (current.count >= config.maxRequests) return { allowed: false, remaining: 0, resetTime: current.resetTime };
  current.count++;
  return { allowed: true, remaining: config.maxRequests - current.count, resetTime: current.resetTime };
}

function validateRequestSize(body: string | null, maxSizeBytes: number): { valid: boolean; error?: string } {
  if (!body) return { valid: true };
  const size = new TextEncoder().encode(body).length;
  if (size > maxSizeBytes) return { valid: false, error: `Request body too large. Maximum ${Math.floor(maxSizeBytes / 1024)}KB allowed.` };
  return { valid: true };
}

const AISearchRequestSchema = z.object({
  query: z.string().min(1, "Query cannot be empty").max(500, "Query must be less than 500 characters"),
  includeExplanations: z.boolean().optional().default(true),
  maxResults: z.number().min(1).max(50).optional().default(10),
});

const RATE_LIMITS = { AI_SEARCH: { maxRequests: 20, windowMs: 60000 } };
const SIZE_LIMITS = { AI_SEARCH: 100 * 1024 };

const REGULATION_CONTEXT = `BS7671 Electrical Installation Regulations provide comprehensive guidance for electrical installations in the UK.
Key areas: Part 1-7 covering scope, definitions, assessment, protection, equipment, inspection/testing, special locations.
Common topics: Earth fault loop impedance, RCD protection, cable sizing, isolation/switching, fire protection, special locations, testing procedures.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) throw new Error('OpenAI API key not configured');

    const authHeader = req.headers.get('authorization');
    const userId = authHeader?.split('Bearer ')[1]?.substring(0, 36) || 'anonymous';
    const rateLimit = checkRateLimit(userId, RATE_LIMITS.AI_SEARCH);
    
    if (!rateLimit.allowed) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded', retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000) }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 });
    }

    const bodyText = await req.text();
    const sizeCheck = validateRequestSize(bodyText, SIZE_LIMITS.AI_SEARCH);
    if (!sizeCheck.valid) return new Response(JSON.stringify({ error: sizeCheck.error }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 413 });

    let requestData;
    try { requestData = JSON.parse(bodyText); } catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }); }

    const validationResult = AISearchRequestSchema.safeParse(requestData);
    if (!validationResult.success) return new Response(JSON.stringify({ error: 'Invalid request', details: validationResult.error.errors }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });

    const { query } = validationResult.data;
    console.log('AI search query:', query);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${openAIApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: 'You are an expert BS7671 electrical regulations assistant. Always respond with valid JSON only.' },
          { role: 'user', content: `Context: ${REGULATION_CONTEXT}\n\nUser Query: "${query}"\n\nProvide relevant regulations, explanations, and tips in JSON format: {"regulations": [{"number": "", "title": "", "description": "", "relevanceScore": 0.95, "aiExplanation": ""}], "aiSummary": "", "suggestedQueries": [], "contextualTips": []}` }
        ],
        max_completion_tokens: 2000,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`);
    const aiResponse = await response.json();
    const content = aiResponse.choices[0].message.content;
    let aiSearchResult;
    try { aiSearchResult = JSON.parse(content); } catch { aiSearchResult = { regulations: [], aiSummary: "Error parsing response", suggestedQueries: [], contextualTips: [] }; }

    return new Response(JSON.stringify(aiSearchResult), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process AI search', details: (error as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});