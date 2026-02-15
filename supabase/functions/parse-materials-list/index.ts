import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';

interface ParsedItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  estimated_price?: number;
  supplier?: string;
  product_url?: string;
  image_url?: string;
  matched: boolean;
  added_at: string;
  original_text: string;
  confidence: number;
}

/**
 * Parse free-text materials list into structured items with product matching.
 *
 * Input:  { text: "10x 2.5mm T&E 100m\n5x double sockets\n..." }
 * Output: { items: ParsedItem[] }
 *
 * Strategy:
 * 1. Split by newlines
 * 2. Extract quantity via regex
 * 3. For each line, search marketplace_products for a fuzzy match
 * 4. If regex fails to extract structured data, use OpenAI for extraction
 */
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Auth check
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));
    const { text, parse_only } = body;

    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing text field' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Split into lines and filter empties
    const lines = text
      .split(/\n/)
      .map((l: string) => l.trim())
      .filter((l: string) => l.length > 0);

    if (lines.length === 0) {
      return new Response(JSON.stringify({ items: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract quantity and description from each line via regex
    const regexParsed = lines.map((line: string) => {
      // Patterns: "10x item", "item x10", "10 x item", "10 item"
      const prefixMatch = line.match(/^(\d+)\s*x?\s+(.+)$/i);
      const suffixMatch = line.match(/^(.+?)\s+x\s*(\d+)$/i);

      let quantity = 1;
      let description = line;

      if (prefixMatch) {
        quantity = parseInt(prefixMatch[1], 10);
        description = prefixMatch[2].trim();
      } else if (suffixMatch) {
        quantity = parseInt(suffixMatch[2], 10);
        description = suffixMatch[1].trim();
      }

      return { original_text: line, quantity, description };
    });

    // Search marketplace for each item (skip if parse_only mode)
    const items: ParsedItem[] = [];

    if (parse_only) {
      // parse_only mode: return just the parsed items without marketplace search
      for (const parsed of regexParsed) {
        items.push({
          id: crypto.randomUUID(),
          name: parsed.description,
          quantity: parsed.quantity,
          unit: 'each',
          matched: false,
          added_at: new Date().toISOString(),
          original_text: parsed.original_text,
          confidence: 0.5,
        });
      }
    } else {
      for (const parsed of regexParsed) {
        try {
          // Use the marketplace-search edge function for fuzzy matching
          const { data: searchResult } = await supabase.functions.invoke('marketplace-search', {
            body: {
              query: parsed.description,
              pageSize: 1,
              page: 1,
            },
          });

          const topMatch = searchResult?.products?.[0];
          const hasGoodMatch = topMatch && topMatch.name;

          items.push({
            id: crypto.randomUUID(),
            name: hasGoodMatch ? topMatch.name : parsed.description,
            quantity: parsed.quantity,
            unit: 'each',
            estimated_price: hasGoodMatch ? topMatch.current_price : undefined,
            supplier: hasGoodMatch ? topMatch.supplier_name : undefined,
            product_url: hasGoodMatch ? topMatch.product_url : undefined,
            image_url: hasGoodMatch ? topMatch.image_url : undefined,
            matched: !!hasGoodMatch,
            added_at: new Date().toISOString(),
            original_text: parsed.original_text,
            confidence: hasGoodMatch ? 0.7 : 0.3,
          });
        } catch (searchErr) {
          console.error(`Search failed for "${parsed.description}":`, searchErr);
          // Still add the item as unmatched
          items.push({
            id: crypto.randomUUID(),
            name: parsed.description,
            quantity: parsed.quantity,
            unit: 'each',
            matched: false,
            added_at: new Date().toISOString(),
            original_text: parsed.original_text,
            confidence: 0.2,
          });
        }
      }
    }

    // If any items had low confidence, try OpenAI for better extraction
    const lowConfidenceItems = items.filter((i) => !i.matched);
    if (lowConfidenceItems.length > 0) {
      try {
        const openAiKey = Deno.env.get('OPENAI_API_KEY');
        if (openAiKey) {
          const aiResult = await enhanceWithOpenAI(
            openAiKey,
            lowConfidenceItems.map((i) => i.original_text)
          );

          // Merge AI results back
          for (const enhanced of aiResult) {
            const idx = items.findIndex((i) => i.original_text === enhanced.original_text);
            if (idx >= 0 && enhanced.product_name) {
              items[idx].name = enhanced.product_name;
              items[idx].quantity = enhanced.quantity || items[idx].quantity;
              items[idx].unit = enhanced.unit || items[idx].unit;
              items[idx].confidence = 0.5;
            }
          }
        }
      } catch (aiErr) {
        console.error('OpenAI enhancement failed (non-fatal):', aiErr);
      }
    }

    return new Response(JSON.stringify({ items }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('parse-materials-list error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to parse materials list', details: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

/**
 * Use OpenAI tool calling to extract structured product data from ambiguous lines.
 * Model: gpt-5-mini-2025-08-07, no temperature, max_completion_tokens.
 */
async function enhanceWithOpenAI(
  apiKey: string,
  lines: string[]
): Promise<Array<{ original_text: string; product_name: string; quantity: number; unit: string }>> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5-mini-2025-08-07',
      max_completion_tokens: 1024,
      messages: [
        {
          role: 'system',
          content:
            'You are an expert UK electrical trade materials parser. Given lines from a materials list, extract structured product information. Use standard UK electrical trade terminology.',
        },
        {
          role: 'user',
          content: `Parse these materials list lines into structured data:\n\n${lines.map((l, i) => `${i + 1}. ${l}`).join('\n')}`,
        },
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'parse_materials',
            description: 'Parse materials list lines into structured items',
            parameters: {
              type: 'object',
              properties: {
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      original_text: { type: 'string', description: 'The original line text' },
                      product_name: {
                        type: 'string',
                        description: 'Standardised product name for search',
                      },
                      quantity: { type: 'number', description: 'Quantity needed' },
                      unit: {
                        type: 'string',
                        enum: ['each', 'm', 'roll', 'box', 'pack', 'pair', 'set'],
                        description: 'Unit of measurement',
                      },
                    },
                    required: ['original_text', 'product_name', 'quantity', 'unit'],
                  },
                },
              },
              required: ['items'],
            },
          },
        },
      ],
      tool_choice: { type: 'function', function: { name: 'parse_materials' } },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

  if (!toolCall?.function?.arguments) {
    return [];
  }

  const parsed = JSON.parse(toolCall.function.arguments);
  return parsed.items || [];
}
