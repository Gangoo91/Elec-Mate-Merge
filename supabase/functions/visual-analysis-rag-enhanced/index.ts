import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, userContext, mode } = await req.json();

    if (!imageBase64 || !userContext || !mode) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: imageBase64, userContext, mode' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAiKey = Deno.env.get('OPENAI_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log(`🔍 RAG-Enhanced Analysis - Mode: ${mode}`);
    console.log(`📝 User Context: ${userContext.substring(0, 100)}...`);

    // Step 1: Generate embedding for user context
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: userContext,
      }),
    });

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0].embedding;

    // Step 2: Dual RAG Search
    console.log('🔎 Performing dual RAG search (Maintenance + BS 7671)...');

    // Search maintenance knowledge (GN3 inspection guidance)
    const { data: maintenanceResults, error: maintenanceError } = await supabase.rpc(
      'search_maintenance_hybrid',
      {
        query_text: userContext,
        query_embedding: embedding,
        match_count: 6
      }
    );

    if (maintenanceError) {
      console.error('Maintenance RAG error:', maintenanceError);
    }

    // Search BS 7671 regulations
    const { data: bs7671Results, error: bs7671Error } = await supabase.rpc(
      'search_bs7671_hybrid_cached',
      {
        query_text: userContext,
        query_embedding: embedding,
        match_count: 6
      }
    );

    if (bs7671Error) {
      console.error('BS 7671 RAG error:', bs7671Error);
    }

    console.log(`✅ Retrieved ${maintenanceResults?.length || 0} maintenance results`);
    console.log(`✅ Retrieved ${bs7671Results?.length || 0} BS 7671 results`);

    // Step 3: Build enriched context for Vision AI
    let enrichedContext = `USER CONTEXT:\n${userContext}\n\n`;

    if (maintenanceResults && maintenanceResults.length > 0) {
      enrichedContext += `INSPECTION GUIDANCE (BS 7671 Guidance Note 3):\n`;
      maintenanceResults.forEach((result: any, idx: number) => {
        enrichedContext += `\n${idx + 1}. ${result.topic}\n`;
        enrichedContext += `${result.content.substring(0, 400)}...\n`;
        enrichedContext += `Source: ${result.source}\n`;
      });
      enrichedContext += '\n';
    }

    if (bs7671Results && bs7671Results.length > 0) {
      enrichedContext += `REGULATORY REQUIREMENTS (BS 7671:2018+A3:2024):\n`;
      bs7671Results.forEach((result: any, idx: number) => {
        enrichedContext += `\n${idx + 1}. Regulation ${result.regulation_number} (${result.section})\n`;
        enrichedContext += `${result.content.substring(0, 400)}...\n`;
      });
    }

    console.log(`📄 Enriched context length: ${enrichedContext.length} chars`);

    // Step 4: Call OpenAI Vision API with enriched context
    const systemPrompts: Record<string, string> = {
      fault_diagnosis: `You are an expert electrical fault diagnosis AI assistant trained on BS 7671:2018+A3:2024 and BS 7671 Guidance Note 3.

CRITICAL INSTRUCTIONS:
- Use ONLY the provided Inspection Guidance (GN3) and Regulatory Requirements (BS 7671) to inform your analysis
- Cite specific regulation numbers and GN3 sections in your findings
- Classify faults using EICR codes (C1/C2/C3/FI) with proper justification
- Separate maintenance/inspection criteria from regulatory violations
- Be specific about what you can and cannot see in the image

ANALYSIS FORMAT:
1. Visual Findings: What you observe in the image
2. Inspection Criteria (GN3): Relevant maintenance/testing guidance
3. Regulatory Assessment (BS 7671): Compliance with regulations
4. EICR Classification: Code with full justification
5. Recommendations: Immediate actions and further testing required`,

      component_identify: `You are an expert electrical equipment identification AI trained on UK electrical standards.

Use the provided maintenance knowledge to identify:
- Equipment type, manufacturer, and age
- Expected lifespan and common failure modes
- Current compliance status with BS 7671
- Inspection requirements from GN3
- Upgrade recommendations if applicable

Be specific and cite the provided knowledge sources.`,

      installation_verify: `You are an expert electrical installation inspector trained on BS 7671 and GN3.

Verify installations against:
- Inspection checklists from GN3
- BS 7671 regulatory requirements
- Safe isolation procedures
- Testing requirements

Provide structured verification with clear pass/fail/testing-required status for each item.`,

      wiring_instruction: `You are an expert electrical wiring instructor.

Provide clear, safe wiring instructions based on:
- BS 7671 requirements provided
- GN3 installation best practices
- Safe working procedures

Include cable sizing, protection requirements, and testing procedures.`
    };

    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompts[mode] || systemPrompts.fault_diagnosis
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: enrichedContext },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0.3
      }),
    });

    const visionData = await visionResponse.json();

    if (!visionResponse.ok) {
      console.error('Vision API error:', visionData);
      throw new Error(`Vision API error: ${visionData.error?.message || 'Unknown error'}`);
    }

    const analysis = visionData.choices[0].message.content;

    console.log('✅ Analysis complete');

    // Step 5: Return comprehensive result with RAG sources
    return new Response(
      JSON.stringify({
        success: true,
        analysis,
        ragSources: {
          maintenanceKnowledge: maintenanceResults?.map((r: any) => ({
            topic: r.topic,
            content: r.content,
            source: r.source,
            score: r.hybrid_score
          })) || [],
          bs7671Regulations: bs7671Results?.map((r: any) => ({
            regulation: r.regulation_number,
            section: r.section,
            content: r.content,
            score: r.hybrid_score
          })) || []
        },
        verified: (maintenanceResults?.length > 0 || bs7671Results?.length > 0),
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in visual-analysis-rag-enhanced:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
