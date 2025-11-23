import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';
import { searchRegulationsIntelligence } from '../_shared/intelligence-search.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { jobId, circuitDesignContext } = await req.json();

    if (!jobId) {
      return new Response(
        JSON.stringify({ error: 'jobId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔧 Design Installation Agent START', { jobId });

    // Update job: Installation agent starting
    await supabase
      .from('circuit_design_jobs')
      .update({
        installation_agent_status: 'processing',
        installation_agent_progress: 5,
        current_step: 'Generating installation guidance...'
      })
      .eq('id', jobId);

    // STEP 1: Extract keywords from circuit design context
    const keywords = extractDesignKeywords(circuitDesignContext);
    console.log(`📝 Extracted ${keywords.size} keywords for RAG search`);

    // Update progress
    await supabase
      .from('circuit_design_jobs')
      .update({ installation_agent_progress: 15 })
      .eq('id', jobId);

    // STEP 2: Fast parallel RAG search (proven RAMS pattern)
    const ragStart = Date.now();
    const [practicalWorkResult, regulations] = await Promise.all([
      searchPracticalWorkIntelligence(supabase, {
        query: Array.from(keywords).slice(0, 30).join(' '),
        tradeFilter: 'installer',
        matchCount: 20
      }),
      searchRegulationsIntelligence(supabase, {
        keywords: Array.from(keywords),
        appliesTo: ['all installations', 'installation work'],
        categories: ['installation', 'testing', 'inspection', 'earthing', 'protection'],
        limit: 15
      })
    ]);

    const ragTime = Date.now() - ragStart;
    console.log(`⚡ RAG complete in ${ragTime}ms:`, {
      practicalWork: practicalWorkResult.results.length,
      regulations: regulations.length,
      quality: practicalWorkResult.qualityScore.toFixed(1)
    });

    // Update progress
    await supabase
      .from('circuit_design_jobs')
      .update({ 
        installation_agent_progress: 40,
        current_step: 'Analyzing installation requirements...'
      })
      .eq('id', jobId);

    // STEP 3: Generate installation guidance using OpenAI
    const aiStart = Date.now();
    const installationGuidance = await generateInstallationGuidance(
      circuitDesignContext,
      practicalWorkResult.results,
      regulations
    );
    const aiTime = Date.now() - aiStart;

    console.log(`✅ AI generation complete in ${aiTime}ms`);

    // Update progress
    await supabase
      .from('circuit_design_jobs')
      .update({ installation_agent_progress: 90 })
      .eq('id', jobId);

    // STEP 4: Save to database
    await supabase
      .from('circuit_design_jobs')
      .update({
        installation_agent_status: 'complete',
        installation_agent_progress: 100,
        installation_guidance: installationGuidance,
        current_step: 'Installation guidance complete'
      })
      .eq('id', jobId);

    console.log('✅ Design Installation Agent COMPLETE', { 
      jobId,
      totalTime: Date.now() - ragStart,
      ragTime,
      aiTime
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        installationGuidance,
        metadata: {
          ragTime,
          aiTime,
          totalTime: Date.now() - ragStart
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Design Installation Agent failed:', error);
    
    // Update job with failure
    try {
      const { jobId } = await req.json();
      if (jobId) {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        
        await supabase
          .from('circuit_design_jobs')
          .update({
            installation_agent_status: 'failed',
            current_step: `Installation guidance failed: ${error.message}`
          })
          .eq('id', jobId);
      }
    } catch (updateError) {
      console.error('Failed to update job with error:', updateError);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractDesignKeywords(circuitContext: any): Set<string> {
  const keywords = new Set<string>();
  
  // Base installation keywords
  const baseKeywords = [
    'installation', 'install', 'mounting', 'fixing', 'routing', 'cable',
    'termination', 'connection', 'testing', 'inspection', 'commissioning',
    'safety', 'protection', 'earthing', 'bonding', 'isolation'
  ];
  
  baseKeywords.forEach(kw => keywords.add(kw));

  if (!circuitContext?.circuits) return keywords;

  // Extract from circuit data
  circuitContext.circuits.forEach((circuit: any) => {
    if (circuit.loadType) keywords.add(circuit.loadType.toLowerCase());
    if (circuit.location) keywords.add(circuit.location.toLowerCase());
    if (circuit.cableType) keywords.add(circuit.cableType.toLowerCase());
    if (circuit.cableSize) keywords.add(`${circuit.cableSize}mm`);
    if (circuit.protectionDevice) keywords.add(circuit.protectionDevice.toLowerCase());
  });

  // Add supply system keywords
  if (circuitContext.supply?.earthingSystem) {
    keywords.add(circuitContext.supply.earthingSystem.toLowerCase());
  }

  return keywords;
}

async function generateInstallationGuidance(
  circuitContext: any,
  practicalWork: any[],
  regulations: any[]
) {
  const systemPrompt = `You are an expert Installation Guidance Specialist for electrical installations.

Generate comprehensive installation guidance based on the circuit design and BS 7671:2018+A2:2024.

KNOWLEDGE BASE PROVIDED:
- ${practicalWork.length} practical work intelligence results
- ${regulations.length} BS 7671 regulations
- ${circuitContext.circuits?.length || 0} designed circuits

CIRCUIT CONTEXT:
${JSON.stringify(circuitContext, null, 2).slice(0, 2000)}

PRACTICAL WORK KNOWLEDGE:
${practicalWork.slice(0, 10).map((pw: any) => 
  `- ${pw.primary_topic}: ${pw.procedure_summary || pw.description || ''}`
).join('\n')}

BS 7671 REGULATIONS:
${regulations.slice(0, 8).map((reg: any) => 
  `- ${reg.regulation_number}: ${(reg.content || reg.primary_topic || '').slice(0, 150)}`
).join('\n')}

OUTPUT STRUCTURE (JSON):
{
  "executiveSummary": "2-3 paragraph overview of installation requirements",
  "safetyConsiderations": [
    {
      "consideration": "Safety requirement",
      "toolsRequired": ["tool1", "tool2"],
      "bsReference": "BS 7671 regulation",
      "priority": "critical" | "high" | "medium"
    }
  ],
  "materialsRequired": [
    {
      "item": "Material name",
      "specification": "Detailed spec",
      "quantity": "Quantity needed",
      "source": "Where to get it"
    }
  ],
  "toolsRequired": [
    {
      "tool": "Tool name",
      "purpose": "Why needed",
      "category": "hand tool" | "test equipment" | "power tool"
    }
  ],
  "cableRouting": [
    {
      "step": "Routing instruction",
      "cableType": "Cable type",
      "method": "Installation method",
      "bsReference": "BS 7671 reference",
      "notes": "Additional notes"
    }
  ],
  "terminationRequirements": [
    {
      "location": "Where to terminate",
      "procedure": "How to terminate",
      "toolsNeeded": ["tool1", "tool2"],
      "torqueSettings": "Torque requirements",
      "bsReference": "BS 7671 reference"
    }
  ],
  "installationProcedure": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "description": "Detailed step description (100-150 words)",
      "toolsForStep": ["tool1", "tool2"],
      "materialsForStep": ["material1"],
      "bsReferences": ["regulation1"]
    }
  ],
  "testingRequirements": {
    "intro": "Testing overview",
    "tests": [
      {
        "testName": "Test name",
        "regulation": "BS 7671 regulation",
        "procedure": "How to perform",
        "expectedReading": "Expected result",
        "acceptanceCriteria": "Pass criteria",
        "toolsRequired": ["test equipment"]
      }
    ],
    "recordingNote": "How to record results"
  }
}

IMPORTANT:
- Generate 8-12 installation procedure steps
- Keep step descriptions 100-150 words
- Include specific BS 7671 references
- Focus on practical, actionable guidance
- Consider the actual cable sizes and protection devices from the design`;

  const userPrompt = `Generate complete installation guidance for this electrical design.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 4000
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API failed: ${response.status} ${errorText}`);
  }

  const aiResponse = await response.json();
  const content = aiResponse.choices[0].message.content;
  
  return JSON.parse(content);
}
