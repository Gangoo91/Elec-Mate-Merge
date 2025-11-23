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

    const { jobId, designedCircuits, supply, projectInfo } = await req.json();

    if (!jobId || !designedCircuits) {
      return new Response(
        JSON.stringify({ error: 'jobId and designedCircuits are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔧 Design Installation Agent START', { 
      jobId,
      circuitCount: designedCircuits.length,
      receivedActualSpecs: true 
    });

    // Update job: Installation agent starting
    await supabase
      .from('circuit_design_jobs')
      .update({
        installation_agent_status: 'processing',
        installation_agent_progress: 5,
        current_step: 'Generating installation guidance...'
      })
      .eq('id', jobId);

    // STEP 1: Extract keywords from DESIGNED circuits (actual specs)
    const keywords = extractDesignKeywords(designedCircuits, supply, projectInfo);
    console.log(`📝 Extracted ${keywords.size} keywords from DESIGNED circuits`);

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

    // STEP 3: Generate installation guidance using OpenAI with DESIGNED circuits
    const aiStart = Date.now();
    const installationGuidance = await generateInstallationGuidance(
      designedCircuits,
      supply,
      projectInfo,
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

    // STEP 4: Save to database and mark ENTIRE job complete
    await supabase
      .from('circuit_design_jobs')
      .update({
        installation_agent_status: 'complete',
        installation_agent_progress: 100,
        installation_guidance: installationGuidance,
        status: 'complete', // Mark entire job complete (both phases done)
        progress: 100,
        current_step: 'Design and installation guidance complete!',
        completed_at: new Date().toISOString()
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

function extractDesignKeywords(designedCircuits: any[], supply: any, projectInfo: any): Set<string> {
  const keywords = new Set<string>();
  
  // Base installation keywords
  const baseKeywords = [
    'installation', 'install', 'mounting', 'fixing', 'routing', 'cable',
    'termination', 'connection', 'testing', 'inspection', 'commissioning',
    'safety', 'protection', 'earthing', 'bonding', 'isolation'
  ];
  
  baseKeywords.forEach(kw => keywords.add(kw));

  // Extract from DESIGNED circuit specifications (actual specs, not input requirements)
  designedCircuits.forEach((circuit: any) => {
    // Circuit name and type
    if (circuit.name) keywords.add(circuit.name.toLowerCase());
    if (circuit.loadType) keywords.add(circuit.loadType.toLowerCase());
    if (circuit.location) keywords.add(circuit.location.toLowerCase());
    
    // ACTUAL designed cable specification (from cableType field)
    if (circuit.cableType) {
      keywords.add(circuit.cableType.toLowerCase());
      const cableSizeMatch = circuit.cableType.match(/(\d+(?:\.\d+)?)\s*mm/);
      if (cableSizeMatch) {
        keywords.add(`${cableSizeMatch[1]}mm cable`);
        keywords.add(`${cableSizeMatch[1]}mm² cable`);
      }
    }
    
    // Add cable size if available
    if (circuit.cableSize) {
      keywords.add(`${circuit.cableSize}mm cable`);
      keywords.add(`${circuit.cableSize}mm² cable`);
    }
    
    // ACTUAL protection device (from protectionDevice object)
    if (circuit.protectionDevice) {
      const device = circuit.protectionDevice;
      if (device.rating) {
        keywords.add(`${device.rating}A protection`);
        keywords.add(`${device.rating} amp`);
      }
      if (device.type) {
        keywords.add(device.type.toLowerCase());
      }
      if (device.curve) {
        keywords.add(`type ${device.curve}`.toLowerCase());
      }
    }
    
    // Installation method
    if (circuit.installationMethod) {
      keywords.add(circuit.installationMethod.toLowerCase());
    }
    
    // Load details
    if (circuit.loadDetails?.totalPower) {
      keywords.add(`${circuit.loadDetails.totalPower}W load`);
      keywords.add(`${Math.round(circuit.loadDetails.totalPower / 1000)}kW load`);
    }
  });

  // Add supply system keywords
  if (supply?.voltage) {
    keywords.add(`${supply.voltage}V`);
  }
  if (supply?.phases) {
    keywords.add(`${supply.phases} phase`);
    keywords.add(`${supply.phases}-phase`);
  }
  if (supply?.earthingSystem) {
    keywords.add(supply.earthingSystem.toLowerCase());
  }

  // Add project context
  if (projectInfo?.type) {
    keywords.add(projectInfo.type.toLowerCase());
  }

  return keywords;
}

async function generateInstallationGuidance(
  designedCircuits: any[],
  supply: any,
  projectInfo: any,
  practicalWork: any[],
  regulations: any[]
) {
  // Build detailed circuit specifications for AI
  const circuitSpecs = designedCircuits.map((circuit: any, i: number) => {
    const protectionStr = circuit.protectionDevice 
      ? `${circuit.protectionDevice.rating}A Type ${circuit.protectionDevice.curve} ${circuit.protectionDevice.type}`
      : 'Not specified';
    
    return `
### Circuit ${i + 1}: ${circuit.name}
- **Designed Cable**: ${circuit.cableType || `${circuit.cableSize}mm²`} (ACTUAL designed specification)
- **Designed Protection**: ${protectionStr} (ACTUAL designed device)
- **Installation Method**: ${circuit.installationMethod || 'Not specified'}
- **Cable Length**: ${circuit.cableLength}m
- **Load**: ${circuit.loadDetails?.totalPower || circuit.loadPower}W
- **Location**: ${circuit.location || 'Not specified'}

⚠️ CRITICAL: Use these EXACT specifications. Do not suggest alternatives or different cable sizes.
`;
  }).join('\n');

  const systemPrompt = `You are an expert Installation Guidance Specialist for electrical installations.

Generate comprehensive installation guidance based on the ACTUAL DESIGNED circuit specifications and BS 7671:2018+A2:2024.

## DESIGNED CIRCUIT SPECIFICATIONS (USE THESE EXACT SPECS)

${circuitSpecs}

## Supply System
- Voltage: ${supply?.voltage || '230'}V
- Phases: ${supply?.phases || 'Single'}
- Earthing: ${supply?.earthingSystem || 'TN-S'}

## Project Context
- Type: ${projectInfo?.type || 'Residential'}
- Location: ${projectInfo?.location || 'General'}

## KNOWLEDGE BASE PROVIDED
- ${practicalWork.length} practical work intelligence results
- ${regulations.length} BS 7671 regulations

## PRACTICAL WORK KNOWLEDGE:
${practicalWork.slice(0, 10).map((pw: any) => 
  `- ${pw.primary_topic}: ${pw.procedure_summary || pw.description || ''}`
).join('\n')}

## BS 7671 REGULATIONS:
${regulations.slice(0, 8).map((reg: any) => 
  `- ${reg.regulation_number}: ${(reg.content || reg.primary_topic || '').slice(0, 150)}`
).join('\n')}

## OUTPUT STRUCTURE (JSON):
{
  "executiveSummary": "2-3 paragraph overview of installation requirements based on DESIGNED specs",
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
      "item": "Material name (using EXACT designed cable sizes)",
      "specification": "Detailed spec matching designed specs",
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
      "step": "Routing instruction for designed cable size",
      "cableType": "Cable type from designed specs",
      "method": "Installation method from designed specs",
      "bsReference": "BS 7671 reference",
      "notes": "Additional notes"
    }
  ],
  "terminationRequirements": [
    {
      "location": "Where to terminate",
      "procedure": "How to terminate (specific to designed cable size)",
      "toolsNeeded": ["tool1", "tool2"],
      "torqueSettings": "Torque requirements for this cable size",
      "bsReference": "BS 7671 reference"
    }
  ],
  "installationProcedure": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "description": "Detailed step description using DESIGNED specifications (100-150 words)",
      "toolsForStep": ["tool1", "tool2"],
      "materialsForStep": ["material1 with designed specs"],
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
        "expectedReading": "Expected result based on designed specs",
        "acceptanceCriteria": "Pass criteria",
        "toolsRequired": ["test equipment"]
      }
    ],
    "recordingNote": "How to record results"
  }
}

## CRITICAL REQUIREMENTS:
- Generate 8-12 installation procedure steps
- Keep step descriptions 100-150 words
- Include specific BS 7671 references
- Use ONLY the designed cable sizes and protection devices specified above
- DO NOT suggest alternative cable sizes or protection ratings
- Materials list must match the DESIGNED specifications exactly
- Termination procedures must be specific to the DESIGNED cable sizes
- Testing criteria must be based on the DESIGNED protection device ratings`;

  const userPrompt = `Generate complete installation guidance for these electrical circuits using the EXACT designed specifications provided above.`;

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
