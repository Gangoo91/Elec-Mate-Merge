import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { equipmentDescription, equipmentType, location, ageYears } = await req.json();

    if (!equipmentDescription || !equipmentType || !location) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('🔍 Generating maintenance schedule for:', equipmentType);

    // Step 1: Generate embedding for equipment description
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: `${equipmentType}: ${equipmentDescription}`,
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error('Failed to generate embedding');
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Step 2: Search maintenance_knowledge using RAG
    const { data: maintenanceKnowledge, error: ragError } = await supabase.rpc(
      'search_maintenance_hybrid',
      {
        query_text: `${equipmentType} ${equipmentDescription} maintenance schedule intervals testing`,
        query_embedding: queryEmbedding,
        equipment_filter: equipmentType || null,
        match_count: 8
      }
    );

    if (ragError) {
      console.error('RAG search error:', ragError);
      throw new Error('Failed to retrieve maintenance knowledge');
    }

    console.log(`📚 Retrieved ${maintenanceKnowledge?.length || 0} maintenance knowledge chunks`);

    // Step 3: Build context from RAG results
    const ragContext = maintenanceKnowledge
      ?.map((item: any) => `[${item.topic}] ${item.content} (Source: ${item.source})`)
      .join('\n\n') || '';

    // Step 4: Generate maintenance schedule with GPT-4
    const systemPrompt = `You are a UK electrical maintenance advisor specializing in BS 7671 and GN3 (Guidance Note 3: Inspection & Testing) compliance.

Generate a comprehensive maintenance schedule based on:
- Equipment type and description
- Age of installation
- GN3 periodic inspection intervals
- BS 7671 requirements
- Manufacturer recommendations

Use the following maintenance knowledge from GN3 and industry standards:

${ragContext}

Return ONLY a valid JSON object (no markdown, no code blocks) with this structure:
{
  "equipmentType": "string",
  "location": "string", 
  "ageYears": number,
  "schedule": [
    {
      "interval": "string (e.g., 'Monthly', '6 Months', '1 Year')",
      "task": "string (specific maintenance task)",
      "regulation": "string (BS 7671 or GN3 reference if applicable)",
      "priority": "high" | "medium" | "low"
    }
  ],
  "recommendations": ["string (additional recommendations)"],
  "ragSources": [
    {
      "topic": "string",
      "source": "string",
      "relevance": number (0-1)
    }
  ]
}`;

    const userPrompt = `Generate a maintenance schedule for:

Equipment Type: ${equipmentType}
Description: ${equipmentDescription}
Location: ${location}
Age: ${ageYears} years

Include:
1. Routine inspection tasks (visual checks, testing)
2. Periodic testing intervals per GN3
3. Component-specific maintenance
4. Compliance requirements
5. Safety-critical tasks marked as high priority`;

    const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!completionResponse.ok) {
      const errorText = await completionResponse.text();
      console.error('OpenAI API error:', errorText);
      throw new Error('Failed to generate maintenance schedule');
    }

    const completionData = await completionResponse.json();
    const rawResponse = completionData.choices[0].message.content.trim();
    
    // Clean response (remove markdown if present)
    const cleanedResponse = rawResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const schedule = JSON.parse(cleanedResponse);

    console.log('✅ Maintenance schedule generated:', schedule.schedule.length, 'tasks');

    return new Response(
      JSON.stringify({
        success: true,
        schedule,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Maintenance plan generator error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
