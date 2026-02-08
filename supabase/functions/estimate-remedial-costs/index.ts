// ESTIMATE REMEDIAL COSTS - AI-powered defect-to-quote items via RAG
// Batch processes EICR defects using pricing_embeddings + practical_work_intelligence
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { searchPricingKnowledge, formatPricingContext } from '../_shared/rag-cost-engineer.ts';
import { searchPracticalWorkIntelligence, formatForAIContext } from '../_shared/rag-practical-work.ts';

// Attempt to repair truncated JSON (e.g. from finish_reason: 'length')
function repairJSON(str: string): any {
  try { return JSON.parse(str); } catch {}
  let s = str.trim();
  s = s.replace(/,?\s*"[^"]*":\s*"[^"]*$/, '');
  s = s.replace(/,?\s*\{[^}]*$/, '');
  const opens = (s.match(/\{/g) || []).length;
  const closes = (s.match(/\}/g) || []).length;
  const openBrackets = (s.match(/\[/g) || []).length;
  const closeBrackets = (s.match(/\]/g) || []).length;
  s = s.replace(/,\s*$/, '');
  for (let i = 0; i < openBrackets - closeBrackets; i++) s += ']';
  for (let i = 0; i < opens - closes; i++) s += '}';
  try { return JSON.parse(s); } catch {}
  const match = s.match(/\{[\s\S]*\}/);
  if (match) { try { return JSON.parse(match[0]); } catch {} }
  return null;
}

// Tool schema for structured output from gpt-5-mini
const estimateRemedialCostsTool = {
  type: 'function',
  function: {
    name: 'provide_remedial_cost_estimate',
    description: 'Provide itemised remedial cost estimate for EICR defects with materials and labour',
    parameters: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              description: { type: 'string', description: 'Item description' },
              quantity: { type: 'number', description: 'Quantity needed' },
              unit: { type: 'string', enum: ['units', 'metres', 'hours'], description: 'Unit of measurement' },
              unitPrice: { type: 'number', description: 'Price per unit in GBP' },
              totalPrice: { type: 'number', description: 'Total price (quantity * unitPrice)' },
              category: { type: 'string', enum: ['materials', 'labour'], description: 'Cost category' },
              subcategory: { type: 'string', description: 'e.g. Protection Devices, Cables, Accessories' },
              defectCode: { type: 'string', description: 'C1, C2, C3 or FI' },
              defectDescription: { type: 'string', description: 'Brief original defect observation text (e.g. "Lack of earthing to gas/water pipework")' },
              labourHours: { type: 'number', description: 'Labour hours (for labour items)' },
            },
            required: ['description', 'quantity', 'unit', 'unitPrice', 'totalPrice', 'category', 'defectCode', 'defectDescription'],
          },
          description: 'Array of quote line items for materials and labour',
        },
        scopeOfWorks: {
          type: 'string',
          description: 'Brief professional summary (3-5 sentences) of all remedial works to be carried out. Suitable for a quote scope of works section. UK English.',
        },
      },
      required: ['items', 'scopeOfWorks'],
    },
  },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ success: false, error: 'Missing authorisation header' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user
    const userSupabase = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user }, error: userError } = await userSupabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorised' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { defects, region, labourRate } = await req.json();

    if (!defects || !Array.isArray(defects) || defects.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'At least one defect is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Cap at 30 defects to prevent prompt overflow
    if (defects.length > 30) {
      return new Response(JSON.stringify({ success: false, error: 'Maximum 30 defects per request' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('💰 Estimating remedial costs for', defects.length, 'defects', '| labourRate from request:', labourRate);

    // Fetch company profile for labour rate if not provided
    let effectiveLabourRate = labourRate;
    if (!effectiveLabourRate) {
      const { data: companyProfile } = await supabase
        .from('company_profiles')
        .select('hourly_rate')
        .eq('user_id', user.id)
        .single();
      effectiveLabourRate = companyProfile?.hourly_rate || 55;
      console.log('💰 Labour rate from company_profiles:', companyProfile?.hourly_rate, '| effective:', effectiveLabourRate);
    }

    // Build combined description for efficient single-embedding RAG search
    const combinedDescription = defects
      .map((d: any) => `${d.code}: ${d.description}${d.location ? ` at ${d.location}` : ''}`)
      .join('. ');

    const pricingQuery = `electrical remedial materials: ${combinedDescription}`;

    // Generate embedding for pricing search
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: pricingQuery.substring(0, 2000),
      }),
    });

    if (!embeddingResponse.ok) {
      const embError = await embeddingResponse.text();
      console.error('Embedding error:', embeddingResponse.status, embError);
      throw new Error(`Failed to generate embedding (${embeddingResponse.status}): ${embError.substring(0, 200)}`);
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data?.[0]?.embedding;

    if (!embedding) {
      throw new Error('No embedding returned');
    }

    // Parallel RAG: pricing knowledge + practical work intelligence
    // Wrap each in try/catch so RAG failures don't block the AI call
    const [pricingResults, practicalResults] = await Promise.all([
      searchPricingKnowledge(
        pricingQuery,
        embedding,
        supabase,
        { info: console.log, debug: console.log, warn: console.warn, error: console.error },
        'eicr-remedial'
      ).catch((err: any) => {
        console.warn('Pricing RAG failed, continuing without:', err?.message);
        return [] as any[];
      }),
      searchPracticalWorkIntelligence(supabase, {
        query: `remedial work ${combinedDescription.substring(0, 150)}`,
        matchCount: 4,
      }),
    ]);

    // Format RAG context for AI — keep minimal to reduce token usage
    const pricingContext = formatPricingContext(Array.isArray(pricingResults) ? pricingResults.slice(0, 10) : []);
    // Only use topic names from practical results (full content is too verbose for cost estimation)
    const practicalSummary = practicalResults.results.slice(0, 4)
      .map((pw: any) => pw.primary_topic || pw.content?.substring(0, 80))
      .filter(Boolean)
      .join('; ');

    // Build defect list for the prompt
    const defectList = defects.map((d: any, i: number) =>
      `${i + 1}. [${d.code}] ${d.description}${d.location ? ` — Location: ${d.location}` : ''}${d.circuitRef ? ` — Circuit: ${d.circuitRef}` : ''}`
    ).join('\n');

    const systemPrompt = `UK electrical remedial cost estimator. Quote items for EICR defects.

LABOUR: £${effectiveLabourRate}/hr EXACTLY. No other rate.
TIMES: Be realistic — replace MCB: 0.25h, bonding: 0.5h, socket swap: 0.25h, cable run: 0.5-2h, DB change: 4-6h, PFC calc: 0.1h, labelling: 0.25h. Err LOW.
MATERIALS: 15% markup on trade prices. Use DB prices below where available.
TESTING: ONE combined item for the whole job (not per defect).
COMBINE: Same location/circuit = combine labour. Making good = ONE item.
DESCRIPTIONS: Keep concise. defectDescription = original observation text.

${pricingContext}
${practicalSummary ? `\nRELATED: ${practicalSummary}` : ''}

DEFECTS:
${defectList}`;

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate remedial quote items for the ${defects.length} defects listed above.` },
        ],
        max_completion_tokens: 6000,
        tools: [estimateRemedialCostsTool],
        tool_choice: { type: 'function', function: { name: 'provide_remedial_cost_estimate' } },
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('OpenAI error:', aiResponse.status, errorText);
      throw new Error(`AI cost estimation failed (${aiResponse.status}): ${errorText.substring(0, 200)}`);
    }

    const aiData = await aiResponse.json();

    const choice = aiData.choices?.[0];
    const finishReason = choice?.finish_reason;
    console.log('AI response:', { finishReason, hasToolCalls: !!choice?.message?.tool_calls, hasContent: !!choice?.message?.content });

    // Extract from tool call — with JSON repair for truncated responses
    let parsed: any = null;
    const toolCall = choice?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      parsed = repairJSON(toolCall.function.arguments);
      if (!parsed) {
        console.error('Failed to parse/repair tool call args:', toolCall.function.arguments.substring(0, 500));
      }
    }

    // Fallback: try message content
    if (!parsed) {
      const content = choice?.message?.content || '';
      if (content) {
        parsed = repairJSON(content);
      }
    }

    if (!parsed) {
      console.error('No parseable AI response. finish_reason:', finishReason, 'raw:', JSON.stringify(choice || aiData).substring(0, 500));
      throw new Error(`AI returned no parseable response (finish_reason: ${finishReason})`);
    }

    // Validate and format items
    const items = (parsed.items || []).map((item: any, i: number) => ({
      id: crypto.randomUUID(),
      description: String(item.description || '').substring(0, 200),
      quantity: Math.max(Number(item.quantity) || 1, 0),
      unit: String(item.unit || 'units'),
      unitPrice: Math.max(Number(item.unitPrice) || 0, 0),
      totalPrice: Math.max(Number(item.totalPrice) || 0, 0),
      category: item.category === 'labour' ? 'labour' : 'materials',
      subcategory: String(item.subcategory || ''),
      notes: item.defectDescription ? `${item.defectCode || ''} defect: ${item.defectDescription}` : undefined,
      source: 'eicr-defect' as const,
      defectCode: String(item.defectCode || ''),
      defectDescription: String(item.defectDescription || ''),
      labourHours: item.category === 'labour' ? Number(item.labourHours || item.quantity) || 0 : undefined,
    }));

    // Calculate summary
    const totalMaterials = items
      .filter((i: any) => i.category === 'materials')
      .reduce((sum: number, i: any) => sum + i.totalPrice, 0);
    const totalLabour = items
      .filter((i: any) => i.category === 'labour')
      .reduce((sum: number, i: any) => sum + i.totalPrice, 0);

    const response = {
      success: true,
      items,
      scopeOfWorks: String(parsed.scopeOfWorks || '').substring(0, 1000),
      summary: {
        totalMaterials: Math.round(totalMaterials * 100) / 100,
        totalLabour: Math.round(totalLabour * 100) / 100,
        totalExVat: Math.round((totalMaterials + totalLabour) * 100) / 100,
        defectsProcessed: defects.length,
      },
    };

    console.log('✅ Remedial costs estimated', {
      itemCount: items.length,
      totalExVat: response.summary.totalExVat,
      defectsProcessed: defects.length,
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('❌ Error in estimate-remedial-costs:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to estimate remedial costs',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
