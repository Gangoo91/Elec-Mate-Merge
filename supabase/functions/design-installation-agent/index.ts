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

    // STEP 3: Generate circuit-specific installation guidance
    const aiStart = Date.now();
    
    // Initial progress update
    await supabase
      .from('circuit_design_jobs')
      .update({ 
        installation_agent_progress: 50,
        current_step: 'Generating circuit-specific installation guidance...'
      })
      .eq('id', jobId);
    
    const installationGuidance = await generateInstallationGuidance(
      designedCircuits,
      supply,
      projectInfo,
      practicalWorkResult.results,
      regulations
    );
    const aiTime = Date.now() - aiStart;

    console.log(`✅ Circuit-specific guidance complete in ${aiTime}ms`);

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

// Filter RAG results by circuit relevance
function filterRagForCircuit(items: any[], circuit: any): any[] {
  const cableSize = circuit.cableSize || extractCableSizeFromType(circuit.cableType);
  const loadType = (circuit.loadType || '').toLowerCase();
  const circuitName = (circuit.name || '').toLowerCase();
  
  return items.filter((item: any) => {
    const keywords = item.keywords || [];
    const content = (item.content || item.primary_topic || item.description || '').toLowerCase();
    
    // Check cable size relevance
    const cableSizeMatch = content.includes(`${cableSize}mm`) || 
                           keywords.some(k => k.includes(`${cableSize}mm`));
    
    // Check load type relevance
    const loadTypeMatch = content.includes(loadType) || 
                          keywords.some(k => k.toLowerCase().includes(loadType));
    
    // Check circuit name relevance
    const nameMatch = content.includes(circuitName) || 
                      keywords.some(k => k.toLowerCase().includes(circuitName));
    
    return cableSizeMatch || loadTypeMatch || nameMatch;
  });
}

function extractCableSizeFromType(cableType: string | undefined): number {
  if (!cableType) return 0;
  const match = cableType.match(/(\d+(?:\.\d+)?)\s*mm/);
  return match ? parseFloat(match[1]) : 0;
}

async function generateInstallationGuidancePerCircuit(
  circuit: any,
  circuitIndex: number,
  supply: any,
  projectInfo: any,
  allPracticalWork: any[],
  allRegulations: any[]
) {
  // Filter RAG results for this specific circuit
  const relevantPracticalWork = filterRagForCircuit(allPracticalWork, circuit).slice(0, 8);
  const relevantRegulations = filterRagForCircuit(allRegulations, circuit).slice(0, 6);
  
  const protectionStr = circuit.protectionDevice 
    ? `${circuit.protectionDevice.rating}A Type ${circuit.protectionDevice.curve} ${circuit.protectionDevice.type}`
    : 'Not specified';
  
  const cableSpec = circuit.cableType || `${circuit.cableSize}mm² cable`;
  
  const systemPrompt = `You are an expert Installation Guidance Specialist for UK electrical installations.

## CRITICAL LANGUAGE REQUIREMENTS
- Use UK English spelling and terminology throughout
- Use "earthing" not "grounding"  
- Use "metres" not "meters"
- Use "centre" not "center"
- Use "utilise" not "utilize"
- Use "colour" not "color"
- British terms: "consumer unit", "earthing conductor", "protective conductor"

## SINGLE CIRCUIT TO INSTALL

**Circuit:** ${circuit.name}
**Designed Cable:** ${cableSpec} (ACTUAL designed specification)
**Designed Protection:** ${protectionStr} (ACTUAL designed device)
**Installation Method:** ${circuit.installationMethod || 'Method C - clipped direct'}
**Cable Length:** ${circuit.cableLength}m
**Load:** ${circuit.loadDetails?.totalPower || circuit.loadPower}W
**Location:** ${circuit.location || circuit.specialLocation || 'Not specified'}

## Supply System
- Voltage: ${supply?.voltage || '230'}V
- Phases: ${supply?.phases || 'Single'}
- Earthing: ${supply?.earthingSystem || 'TN-S'}

## FILTERED KNOWLEDGE BASE (relevant to ${cableSpec} and ${circuit.loadType})
- ${relevantPracticalWork.length} relevant practical procedures
- ${relevantRegulations.length} relevant BS 7671 regulations

## PRACTICAL WORK KNOWLEDGE:
${relevantPracticalWork.map((pw: any) => 
  `- ${pw.primary_topic}: ${pw.procedure_summary || pw.description || ''}`
).join('\n')}

## BS 7671 REGULATIONS:
${relevantRegulations.map((reg: any) => 
  `- ${reg.regulation_number}: ${(reg.content || reg.primary_topic || '').slice(0, 120)}`
).join('\n')}

## OUTPUT STRUCTURE (JSON):
{
  "executiveSummary": "2-3 paragraph overview SPECIFIC to this ${cableSpec} circuit installation",
  "safetyConsiderations": [
    {
      "consideration": "Safety requirement specific to this cable size/circuit",
      "toolsRequired": ["tool1", "tool2"],
      "bsReference": "BS 7671 regulation",
      "priority": "critical" | "high" | "medium"
    }
  ],
  "materialsRequired": [
    {
      "item": "Material name (EXACT ${cableSpec} specifications)",
      "specification": "Detailed spec",
      "quantity": "Quantity for ${circuit.cableLength}m run",
      "source": "UK supplier"
    }
  ],
  "toolsRequired": [
    {
      "tool": "Tool name",
      "purpose": "Why needed for ${cableSpec}",
      "category": "hand tool" | "test equipment" | "power tool"
    }
  ],
  "cableRouting": [
    {
      "step": "Routing instruction for ${cableSpec}",
      "cableType": "${cableSpec}",
      "method": "${circuit.installationMethod || 'Method C'}",
      "bsReference": "BS 7671 reference",
      "notes": "Bending radius, support spacing for ${cableSpec}"
    }
  ],
  "terminationRequirements": [
    {
      "location": "Where to terminate",
      "procedure": "Detailed termination for ${cableSpec} (stripping length, torque)",
      "toolsNeeded": ["tool1", "tool2"],
      "torqueSettings": "EXACT torque for ${cableSpec} (e.g., 1.5mm²: 1.2Nm, 10mm²: 3.5Nm)",
      "bsReference": "BS 7671 reference"
    }
  ],
  "installationProcedure": [
    {
      "stepNumber": 1,
      "title": "Step title for ${cableSpec}",
      "description": "Hands-on technical procedure SPECIFIC to ${cableSpec} (120-180 words with exact measurements, torques, stripping lengths)",
      "toolsForStep": ["tool1", "tool2"],
      "materialsForStep": ["${cableSpec}"],
      "bsReferences": ["regulation1"]
    }
  ]
}

## CRITICAL REQUIREMENTS:
- Generate 6-10 installation steps SPECIFIC to ${cableSpec}
- Include EXACT torque settings for this cable gauge
- Include EXACT cable stripping lengths for ${cableSpec}
- Include specific bending radius for this cable diameter
- Provide hands-on technical details an installer needs on-site
- Use ONLY UK English spelling and British electrical terminology
- DO NOT include testing requirements (handled separately)
- Materials, tools, and procedures must be specific to ${cableSpec}, not generic`;

  const userPrompt = `Generate detailed installation guidance for this single ${cableSpec} circuit using UK English.`;

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
      max_tokens: 3000
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API failed for circuit ${circuitIndex + 1}: ${response.status} ${errorText}`);
  }

  const aiResponse = await response.json();
  const content = aiResponse.choices[0].message.content;
  
  return JSON.parse(content);
}

async function generateInstallationGuidance(
  designedCircuits: any[],
  supply: any,
  projectInfo: any,
  practicalWork: any[],
  regulations: any[]
) {
  const circuitGuidance: any = {};
  
  console.log(`🔄 Generating circuit-specific guidance for ${designedCircuits.length} circuits...`);
  
  // Generate guidance for each circuit individually
  for (let i = 0; i < designedCircuits.length; i++) {
    const circuit = designedCircuits[i];
    
    console.log(`  📍 Circuit ${i + 1}/${designedCircuits.length}: ${circuit.name} (${circuit.cableType || circuit.cableSize + 'mm²'})`);
    
    try {
      const guidance = await generateInstallationGuidancePerCircuit(
        circuit,
        i,
        supply,
        projectInfo,
        practicalWork,
        regulations
      );
      
      circuitGuidance[`circuit_${i}`] = {
        circuitName: circuit.name,
        cableSpec: circuit.cableType || `${circuit.cableSize}mm²`,
        protection: circuit.protectionDevice,
        guidance: guidance
      };
      
      console.log(`  ✅ Circuit ${i + 1} guidance generated`);
    } catch (error: any) {
      console.error(`  ❌ Failed to generate guidance for circuit ${i + 1}:`, error);
      circuitGuidance[`circuit_${i}`] = {
        circuitName: circuit.name,
        cableSpec: circuit.cableType || `${circuit.cableSize}mm²`,
        protection: circuit.protectionDevice,
        error: error.message
      };
    }
  }
  
  return circuitGuidance;
}
