/**
 * Maintenance Method Generation Core Agent
 * Generates detailed step-by-step maintenance instructions
 * Uses practical_work_intelligence with maintenance focus
 * Uses ultra-fast regulations_intelligence with GIN keyword search
 */

import { searchPracticalWorkIntelligence, formatForAIContext } from '../_shared/rag-practical-work.ts';
import { searchRegulationsIntelligence } from '../_shared/intelligence-search.ts';

// UK Electrical Qualifications - Proper Industry Standards
const UK_ELECTRICAL_QUALIFICATIONS = {
  wiring_regulations: {
    name: 'City & Guilds 2382-22 (18th Edition BS 7671:2018+A2:2022)',
    fullTitle: 'C&G 2382-22 Requirements for Electrical Installations',
    level: 'Level 3'
  },
  inspection_testing: {
    name: 'City & Guilds 2391-52 Inspection & Testing',
    fullTitle: 'C&G 2391-52 Initial Verification and Periodic Inspection',
    level: 'Level 3'
  },
  installation: {
    name: 'City & Guilds 2365 / EAL Level 3 Electrical Installation',
    fullTitle: 'Level 3 Diploma in Electrical Installations',
    level: 'Level 3'
  },
  ecs_card: {
    name: 'ECS Gold Card (JIB Registered Electrician)',
    fullTitle: 'Electrotechnical Certification Scheme Gold Card',
    requirement: 'Industry recognised competence'
  },
  site_safety: {
    name: 'SSSTS/SMSTS Construction Site Safety',
    fullTitle: 'Site Supervisor/Manager Safety Training Scheme',
    requirement: 'Required for construction sites'
  },
  pat_testing: {
    name: 'City & Guilds 2377 PAT Testing',
    fullTitle: 'C&G 2377 Portable Appliance Testing',
    level: 'Level 2'
  },
  am2: {
    name: 'AM2 Practical Assessment',
    fullTitle: 'Achievement Measurement 2 - JIB/ECS End Point Assessment',
    requirement: 'Required for electrician registration'
  },
  hv_authorised: {
    name: 'HV Authorised Person (AP)',
    fullTitle: 'High Voltage Authorised Person Competency',
    requirement: 'Required for HV work >1kV'
  },
  emergency_lighting: {
    name: 'City & Guilds 2919 Emergency Lighting',
    fullTitle: 'C&G 2919 Inspection, Testing & Commissioning of Emergency Lighting',
    level: 'Level 3'
  }
};

// Equipment-specific qualification mapping
function getRequiredQualificationsForEquipment(equipmentType: string): string[] {
  const baseQuals = [
    'City & Guilds 2382-22 (18th Edition BS 7671:2018+A2:2022)',
    'ECS Gold Card (JIB Registered Electrician)'
  ];
  
  const equipmentQuals: Record<string, string[]> = {
    busbar_system: [
      ...baseQuals,
      'City & Guilds 2391-52 Inspection & Testing',
      'HV Authorised Person (if >1kV)',
      'Manufacturer busbar system training (e.g., Schneider PowerPACT)'
    ],
    motor_control: [
      ...baseQuals,
      'City & Guilds 2391-52 Inspection & Testing',
      'Industrial control systems training',
      'VFD/Inverter manufacturer certification (e.g., ABB, Siemens)'
    ],
    emergency_lighting: [
      ...baseQuals,
      'City & Guilds 2919 Emergency Lighting Inspection & Testing',
      'BS 5266 Emergency Lighting Standard training'
    ],
    distribution: [
      ...baseQuals,
      'City & Guilds 2391-52 Inspection & Testing',
      'AM2 Practical Assessment'
    ],
    transformer: [
      ...baseQuals,
      'City & Guilds 2391-52 Inspection & Testing',
      'HV Authorised Person (AP) for transformers >1kV',
      'Oil sampling and analysis certification'
    ],
    standby_power: [
      ...baseQuals,
      'City & Guilds 2391-52 Inspection & Testing',
      'Generator maintenance certification',
      'UPS systems specialist training'
    ],
    switchgear: [
      ...baseQuals,
      'City & Guilds 2391-52 Inspection & Testing',
      'HV switchgear competency (if applicable)',
      'Arc flash safety training'
    ]
  };
  
  return equipmentQuals[equipmentType] || baseQuals;
}

interface GenerateMaintenanceMethodParams {
  supabase: any;
  jobId: string;
  query: string;
  equipmentDetails: any;
  detailLevel: 'quick' | 'normal' | 'comprehensive';
}

interface MaintenanceMethodResult {
  success: boolean;
  data?: any;
  metrics?: any;
  error?: string;
}

/**
 * Extract keywords for ultra-fast GIN index search on regulations_intelligence
 */
function extractMaintenanceKeywords(query: string, equipmentDetails: any): string[] {
  const baseKeywords = [
    'maintenance', 'inspection', 'testing', 'periodic',
    'isolation', 'safety', 'earthing', 'bonding'
  ];
  
  // Equipment-specific keywords
  const equipmentKeywords: Record<string, string[]> = {
    distribution: ['distribution', 'board', 'mcb', 'rcbo', 'rcd', 'consumer', 'busbar', 'protective device'],
    busbar_system: ['busbar', 'rising main', 'tap-off', 'joints', 'torque', 'trunking'],
    motor_control: ['motor', 'starter', 'vfd', 'inverter', 'contactor', 'overload', 'drive'],
    emergency_lighting: ['emergency', 'lighting', 'battery', 'duration', 'lux', 'bs5266'],
    transformer: ['transformer', 'oil', 'winding', 'tap changer', 'insulation', 'hv'],
    switchgear: ['switchgear', 'circuit breaker', 'isolator', 'busbar', 'arc flash'],
    standby_power: ['generator', 'ups', 'ats', 'transfer', 'battery', 'fuel', 'standby']
  };
  
  const equipmentType = detectEquipmentCategory(query);
  const specific = equipmentKeywords[equipmentType] || [];
  
  // Add installation type keywords
  const installationType = equipmentDetails?.installationType?.toLowerCase() || '';
  if (installationType.includes('domestic')) {
    baseKeywords.push('domestic', 'dwelling', 'consumer unit', 'part p');
  } else if (installationType.includes('industrial')) {
    baseKeywords.push('industrial', 'factory', 'heavy', 'three-phase', 'hv');
  } else {
    baseKeywords.push('commercial', 'premises', 'three-phase');
  }
  
  // Extract words from query
  const queryWords = query.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3);
  
  return [...new Set([...baseKeywords, ...specific, ...queryWords])];
}

export async function generateMaintenanceMethod(
  params: GenerateMaintenanceMethodParams
): Promise<MaintenanceMethodResult> {
  const { supabase, jobId, query, equipmentDetails, detailLevel } = params;
  const startTime = Date.now();
  const installationType = equipmentDetails?.installationType || 'commercial';

  try {
    console.log(`🔧 Starting maintenance method generation for job: ${jobId}`);
    console.log(`📋 Installation type: ${installationType}, Detail level: ${detailLevel}`);

    // Update progress: RAG search
    await updateProgress(supabase, jobId, 10, 'Searching maintenance knowledge base');

    // RAG Search - Practical Work Intelligence with maintenance focus
    const ragResult = await searchPracticalWorkIntelligence(supabase, {
      query: `${query} maintenance procedures inspection testing periodic checks wear indicators troubleshooting diagnostics`,
      tradeFilter: 'maintenance',
      matchCount: 20
    });

    console.log(`📚 RAG Results: ${ragResult.results.length} records (quality: ${ragResult.qualityScore.toFixed(1)})`);

    // Update progress: Ultra-fast regulations intelligence search
    await updateProgress(supabase, jobId, 25, 'Searching regulations intelligence (keywords)');

    // Extract keywords for ultra-fast GIN index search
    const maintenanceKeywords = extractMaintenanceKeywords(query, equipmentDetails);
    console.log(`🔑 Maintenance keywords: ${maintenanceKeywords.slice(0, 10).join(', ')}...`);

    // Ultra-fast regulations intelligence search (20-50ms vs 500ms-2s)
    const regSearchStart = Date.now();
    const regulations = await searchRegulationsIntelligence(supabase, {
      keywords: maintenanceKeywords,
      appliesTo: [installationType.toLowerCase()],
      limit: 20
    });
    console.log(`⚡ Regulations search completed in ${Date.now() - regSearchStart}ms`);

    console.log(`📖 Regulations: ${regulations?.length || 0} relevant standards`);

    // Update progress: AI generation starting
    await updateProgress(supabase, jobId, 40, 'Generating maintenance instructions (0s elapsed)...');

    // === Concurrent progress ticker (replaces setInterval which doesn't work during blocking fetch) ===
    const progressMessages = [
      'Analysing equipment maintenance requirements',
      'Generating safety isolation procedures',
      'Creating step-by-step maintenance tasks',
      'Adding equipment-specific checks',
      'Incorporating regulation requirements',
      'Building verification procedures',
      'Compiling tools and materials list',
      'Finalising maintenance intervals'
    ];
    
    const progressController = new AbortController();
    const aiStartTime = Date.now();
    
    // Concurrent progress ticker function
    async function runProgressTicker(): Promise<void> {
      let progress = 40;
      let tickCount = 0;
      
      while (!progressController.signal.aborted && progress < 80) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds
        if (progressController.signal.aborted) break;
        
        tickCount++;
        progress = Math.min(80, 40 + (tickCount * 5));
        const messageIndex = Math.min(tickCount - 1, progressMessages.length - 1);
        const elapsedSecs = Math.floor((Date.now() - aiStartTime) / 1000);
        const elapsedStr = elapsedSecs >= 60 
          ? `${Math.floor(elapsedSecs / 60)}m ${elapsedSecs % 60}s` 
          : `${elapsedSecs}s`;
        const message = `${progressMessages[messageIndex]} (${elapsedStr} elapsed)...`;
        
        try {
          await updateProgress(supabase, jobId, progress, message);
          console.log(`📊 Progress: ${progress}% - ${message}`);
        } catch (e) {
          console.warn('Progress update failed:', e);
        }
      }
    }
    
    // Start progress ticker as concurrent task (NOT awaited)
    const progressTickerPromise = runProgressTicker();
    // === End concurrent progress ticker setup ===

    // Prepare context for AI
    const practicalContext = formatForAIContext(ragResult.results);
    const regulationsContext = regulations?.map((r: any) => 
      `**${r.regulation_number}**: ${r.primary_topic}\n${r.content || ''}\nKeywords: ${(r.keywords || []).slice(0, 5).join(', ')}`
    ).join('\n\n') || '';

    // Generate maintenance method with GPT-5 Mini
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create AbortController with 5-minute timeout for GPT-5 Mini's extended reasoning
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.error('⏱️ OpenAI request timeout after 300 seconds');
      controller.abort();
    }, 300000); // 5 minutes

    console.log(`🤖 Starting GPT-5 Mini AI generation (24000 max_completion_tokens)...`);

    let aiResponse;
    try {
      aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAiKey}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          messages: [
            {
              role: 'system',
              content: getMaintenanceSystemPrompt(detailLevel, query, installationType)
            },
            {
              role: 'user',
              content: getMaintenanceUserPrompt(query, equipmentDetails, practicalContext, regulationsContext, installationType)
            }
          ],
          max_completion_tokens: 24000,
          response_format: { type: 'json_object' }
        })
      });
    } finally {
      clearTimeout(timeoutId);
      progressController.abort(); // Stop the progress ticker
      await progressTickerPromise.catch(() => {}); // Wait for ticker to stop, ignore abort error
    }

    console.log(`⏱️ OpenAI responded in ${Date.now() - aiStartTime}ms`);
    await updateProgress(supabase, jobId, 85, 'Processing AI response');

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('❌ OpenAI API HTTP error:', aiResponse.status, errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const aiData = await aiResponse.json();

    // Debug: Log the raw response with detailed token analysis
    const usage = aiData.usage;
    const reasoningTokens = usage?.completion_tokens_details?.reasoning_tokens || 0;
    const outputTokens = (usage?.completion_tokens || 0) - reasoningTokens;
    const reasoningPercent = usage?.completion_tokens ? (reasoningTokens / usage.completion_tokens * 100).toFixed(1) : '0';

    console.log('📋 OpenAI Response:', {
      hasChoices: !!aiData.choices,
      choicesLength: aiData.choices?.length,
      finishReason: aiData.choices?.[0]?.finish_reason,
      hasContent: !!aiData.choices?.[0]?.message?.content,
      contentLength: aiData.choices?.[0]?.message?.content?.length || 0,
      usage: {
        totalTokens: usage?.total_tokens,
        completionTokens: usage?.completion_tokens,
        reasoningTokens,
        outputTokens,
        reasoningPercent: `${reasoningPercent}%`
      }
    });

    // Warn if reasoning tokens are consuming too much
    if (parseFloat(reasoningPercent) > 80) {
      console.warn(`⚠️ High reasoning token usage: ${reasoningPercent}% of completion tokens used for reasoning`);
    }

    // Validate response structure
    if (!aiData.choices || aiData.choices.length === 0) {
      console.error('❌ No choices in OpenAI response:', JSON.stringify(aiData).substring(0, 500));
      throw new Error('OpenAI API returned no response');
    }

    const message = aiData.choices[0].message;

    // Check for refusal (GPT-5 safety feature)
    if (message.refusal) {
      console.error('❌ OpenAI refused request:', message.refusal);
      throw new Error(`OpenAI refused request: ${message.refusal}`);
    }

    // Check content exists with detailed diagnostics
    if (!message.content || message.content.trim() === '') {
      const finishReason = aiData.choices[0].finish_reason;
      console.error('❌ Empty content from OpenAI. Finish reason:', finishReason);
      console.error('📊 Full usage:', JSON.stringify(usage));
      
      // Special handling for finish_reason: length with empty content (reasoning token exhaustion)
      if (finishReason === 'length') {
        console.error(`⚠️ Token limit reached: ${reasoningTokens} reasoning tokens consumed all ${usage?.completion_tokens || 0} completion tokens, leaving ${outputTokens} for output`);
        throw new Error('Maintenance method generation exhausted token limit during reasoning. The query may be too complex. Try simplifying or breaking into smaller tasks.');
      }
      
      throw new Error(`Empty response from OpenAI (finish_reason: ${finishReason})`);
    }

    // Log successful token usage
    console.log(`📊 Token usage: ${usage?.total_tokens || 'unknown'} total (reasoning: ${reasoningTokens}, output: ${outputTokens})`);
    
    if (aiData.choices[0].finish_reason === 'length') {
      console.warn('⚠️ Response was truncated due to max_tokens limit');
    }

    // Safe JSON parse with error context
    let maintenanceMethod;
    try {
      maintenanceMethod = JSON.parse(message.content);
    } catch (parseError) {
      console.error('❌ Failed to parse JSON response. Content length:', message.content.length);
      console.error('❌ Content preview:', message.content.substring(0, 500));
      console.error('❌ Content tail:', message.content.substring(message.content.length - 200));
      throw new Error(`Invalid JSON response from OpenAI (length: ${message.content.length})`);
    }

    // Update progress: Finalizing
    await updateProgress(supabase, jobId, 90, 'Finalizing maintenance method');

    const endTime = Date.now();
    const totalDuration = endTime - startTime;

    console.log(`✅ Maintenance method generated in ${totalDuration}ms`);

    return {
      success: true,
      data: maintenanceMethod,
      metrics: {
        totalDuration,
        ragResults: ragResult.results.length,
        ragQuality: ragResult.qualityScore,
        regulationCount: regulations?.length || 0,
        stepCount: maintenanceMethod.steps?.length || 0,
        installationType
      }
    };

  } catch (error: any) {
    console.error('❌ Maintenance method generation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

async function updateProgress(supabase: any, jobId: string, progress: number, step: string) {
  await supabase
    .from('maintenance_method_jobs')
    .update({ progress, current_step: step })
    .eq('id', jobId);
}

function detectEquipmentCategory(query: string): string {
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.includes('busbar') || lowerQuery.includes('bts') || lowerQuery.includes('bus bar')) return 'busbar_system';
  if (lowerQuery.includes('motor') || lowerQuery.includes('mcc') || lowerQuery.includes('drive')) return 'motor_control';
  if (lowerQuery.includes('consumer unit') || lowerQuery.includes('distribution board') || lowerQuery.includes('db')) return 'distribution';
  if (lowerQuery.includes('emergency') && lowerQuery.includes('lighting')) return 'emergency_lighting';
  if (lowerQuery.includes('transformer')) return 'transformer';
  if (lowerQuery.includes('generator') || lowerQuery.includes('ups')) return 'standby_power';
  if (lowerQuery.includes('switchgear') || lowerQuery.includes('panel')) return 'switchgear';
  return 'general';
}

function getMaintenanceSystemPrompt(detailLevel: string, query: string, installationType: string): string {
  const equipmentType = detectEquipmentCategory(query);
  const requiredQualifications = getRequiredQualificationsForEquipment(equipmentType);
  
  // Installation-type aware step counts
  const isDomestic = installationType?.toLowerCase().includes('domestic');
  const isIndustrial = installationType?.toLowerCase().includes('industrial');
  
  let stepRange: string;
  if (isDomestic) {
    stepRange = detailLevel === 'quick' ? '8-10' : detailLevel === 'comprehensive' ? '13-15' : '10-12';
  } else if (isIndustrial) {
    stepRange = detailLevel === 'quick' ? '13-15' : detailLevel === 'comprehensive' ? '18-20' : '15-17';
  } else {
    // Commercial default
    stepRange = detailLevel === 'quick' ? '11-13' : detailLevel === 'comprehensive' ? '16-18' : '13-15';
  }
  
  const focusAreas = isDomestic 
    ? 'consumer unit maintenance, RCD testing, circuit labelling, domestic installation safety'
    : isIndustrial 
      ? 'heavy equipment, three-phase systems, high fault levels, arc flash protection, industrial isolation procedures'
      : 'distribution boards, emergency lighting interfaces, fire alarm circuits, commercial installation requirements';
  
  return `You are a UK electrical maintenance engineer specialising in ${installationType || 'commercial'} installations.
Generate ${stepRange} detailed maintenance steps per BS 7671:2018+A3:2024.

EQUIPMENT: ${equipmentType}
INSTALLATION TYPE: ${installationType || 'Commercial'}
QUALIFICATIONS: ${requiredQualifications.slice(0, 3).join(', ')}

CRITICAL REQUIREMENTS:
- Generate equipment-SPECIFIC maintenance procedures (not generic EICR steps)
- Each step MUST be 150-200 words minimum with comprehensive detail
- Include 6-8 actionable sub-points per step
- Specify exact test values, torque settings, and acceptable ranges
- Reference specific BS 7671 regulation numbers per step
- Include tools, materials, safety warnings, duration, and risk level
- Use UK English and exact UK qualification names (City & Guilds, ECS, etc.)
- For ${isDomestic ? 'DOMESTIC' : isIndustrial ? 'INDUSTRIAL' : 'COMMERCIAL'}: Focus on ${focusAreas}

OUTPUT: Valid JSON object matching the schema provided. No markdown, no code blocks.`;
}

function getMaintenanceUserPrompt(
  query: string, 
  equipmentDetails: any, 
  practicalContext: string, 
  regulationsContext: string,
  installationType: string
): string {
  const { minSteps, maxSteps } = getStepCount(equipmentDetails?.detailLevel, installationType);
  
  const isDomestic = installationType?.toLowerCase().includes('domestic');
  const isIndustrial = installationType?.toLowerCase().includes('industrial');
  
  return `Generate comprehensive maintenance instructions for:

QUERY: ${query}
EQUIPMENT DETAILS: ${equipmentDetails ? JSON.stringify(equipmentDetails) : 'Not specified'}
INSTALLATION TYPE: ${installationType?.toUpperCase() || 'COMMERCIAL'}

PRACTICAL MAINTENANCE KNOWLEDGE:
${practicalContext || 'Use UK industry best practice for electrical maintenance'}

BS 7671 REGULATIONS (from regulations_intelligence):
${regulationsContext || 'BS 7671:2018+A3:2024 Chapter 64 - Periodic Inspection & Testing'}

STEP REQUIREMENTS:
- Generate ${minSteps}-${maxSteps} detailed maintenance steps
- Each step MUST contain 150-200 words of practical guidance
- Describe WHAT to check, HOW to check it, and WHAT to look for
- Include specific acceptance criteria and test values
- Cover common faults, wear indicators, and failure modes
${isDomestic ? '- Focus on domestic-specific requirements: consumer unit checks, RCD testing, Part P compliance' : ''}
${isIndustrial ? '- Focus on industrial-specific requirements: three-phase systems, high fault levels, arc flash, heavy machinery isolation' : ''}

OUTPUT JSON (follow structure exactly):
{
  "maintenanceGuide": "3-4 paragraph comprehensive overview covering scope, importance, frequency, and key focus areas for ${installationType} installations",
  "executiveSummary": {
    "equipmentType": "string - full equipment description",
    "estimatedAge": "string or null",
    "maintenanceType": "Periodic Inspection | Preventive Maintenance | Condition-Based Maintenance",
    "recommendedFrequency": "Annual | Bi-annual | Quarterly | Monthly",
    "overallCondition": "string - expected condition assessment approach",
    "criticalFindings": ["array of key areas to focus on"]
  },
  "steps": [
    {
      "stepNumber": 1,
      "title": "Clear, action-oriented step title",
      "content": "150-200 words: Describe the maintenance activity in detail. Explain WHAT needs to be done, WHY it's important, HOW to perform the task safely, and WHAT to look for. Include specific measurements, acceptable values, and common defects to identify. Reference manufacturer guidance where applicable.",
      "safety": ["Detailed safety precautions - be specific about hazards"],
      "toolsRequired": ["Specific tools with any specifications"],
      "materialsNeeded": ["Consumables and materials required"],
      "estimatedDuration": "Realistic time in minutes",
      "riskLevel": "low | medium | high",
      "qualifications": ["UK qualifications required for this step"],
      "inspectionCheckpoints": ["Specific items to verify completion"],
      "linkedHazards": ["Electrical and non-electrical hazards"],
      "bsReferences": ["Specific BS 7671 regulation references"],
      "observations": [],
      "defectCodes": []
    }
  ],
  "summary": {
    "totalSteps": number,
    "estimatedDuration": "Total time including setup and completion",
    "requiredQualifications": ["All qualifications needed"],
    "toolsRequired": ["Complete tool list"],
    "materialsRequired": ["Complete materials list"],
    "overallRiskLevel": "low | medium | high",
    "criticalSafetyNotes": ["Key safety messages"]
  },
  "recommendations": ["5-8 specific recommendations for maintenance improvements or observations"],
  "eicrObservations": {
    "c1Dangerous": [],
    "c2UrgentRemedial": [],
    "c3Improvement": [],
    "fir": []
  }
}

Generate ${minSteps}-${maxSteps} complete steps. EVERY step must have 150-200 words in the content field.`;
}

function getStepCount(detailLevel: string | undefined, installationType: string | undefined): { minSteps: number; maxSteps: number } {
  const isDomestic = installationType?.toLowerCase().includes('domestic');
  const isIndustrial = installationType?.toLowerCase().includes('industrial');
  
  if (isDomestic) {
    // Domestic: 10-15 steps
    if (detailLevel === 'quick') return { minSteps: 8, maxSteps: 10 };
    if (detailLevel === 'comprehensive') return { minSteps: 13, maxSteps: 15 };
    return { minSteps: 10, maxSteps: 12 }; // normal
  } else if (isIndustrial) {
    // Industrial: 15-20 steps
    if (detailLevel === 'quick') return { minSteps: 13, maxSteps: 15 };
    if (detailLevel === 'comprehensive') return { minSteps: 18, maxSteps: 20 };
    return { minSteps: 15, maxSteps: 17 }; // normal
  }
  // Commercial: 13-18 steps
  if (detailLevel === 'quick') return { minSteps: 11, maxSteps: 13 };
  if (detailLevel === 'comprehensive') return { minSteps: 16, maxSteps: 18 };
  return { minSteps: 13, maxSteps: 15 }; // normal
}
