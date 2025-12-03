/**
 * Maintenance Method Generation Core Agent
 * Generates detailed step-by-step maintenance instructions (15+ steps)
 * Uses practical_work_intelligence with maintenance focus
 */

import { searchPracticalWorkIntelligence, formatForAIContext } from '../_shared/rag-practical-work.ts';

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

export async function generateMaintenanceMethod(
  params: GenerateMaintenanceMethodParams
): Promise<MaintenanceMethodResult> {
  const { supabase, jobId, query, equipmentDetails, detailLevel } = params;
  const startTime = Date.now();

  try {
    console.log(`🔧 Starting maintenance method generation for job: ${jobId}`);

    // Update progress: RAG search
    await updateProgress(supabase, jobId, 10, 'Searching maintenance knowledge base');

    // RAG Search - Practical Work Intelligence with maintenance focus
    const ragResult = await searchPracticalWorkIntelligence(supabase, {
      query: `${query} maintenance procedures inspection testing periodic checks wear indicators troubleshooting diagnostics`,
      tradeFilter: 'maintenance',
      matchCount: 20
    });

    console.log(`📚 RAG Results: ${ragResult.results.length} records (quality: ${ragResult.qualityScore.toFixed(1)})`);

    // Update progress: Regulation search
    await updateProgress(supabase, jobId, 25, 'Searching BS 7671 regulations');

    // BS 7671 Regulations - Simplified search for better results
    const { data: regulations, error: regError } = await supabase.rpc('search_bs7671_intelligence_hybrid', {
      query_text: query,
      match_count: 15
    });

    if (regError) {
      console.error('⚠️ BS 7671 search failed:', regError);
    }

    console.log(`📖 Regulations: ${regulations?.length || 0} relevant standards`);

    // Update progress: AI generation
    await updateProgress(supabase, jobId, 40, 'Generating maintenance instructions with AI');

    // Prepare context for AI
    const practicalContext = formatForAIContext(ragResult.results);
    const regulationsContext = regulations?.map((r: any) => 
      `**${r.regulation_number}**: ${r.primary_topic}\n${r.content || ''}`
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

    console.log(`🤖 Starting GPT-5 Mini AI generation (16000 max_completion_tokens)...`);
    const aiStartTime = Date.now();

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
              content: getMaintenanceSystemPrompt(detailLevel, query)
            },
            {
              role: 'user',
              content: getMaintenanceUserPrompt(query, equipmentDetails, practicalContext, regulationsContext)
            }
          ],
          max_completion_tokens: 16000,
          response_format: { type: 'json_object' }
        })
      });
    } finally {
      clearTimeout(timeoutId);
    }

    console.log(`⏱️ OpenAI responded in ${Date.now() - aiStartTime}ms`);

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
        stepCount: maintenanceMethod.steps?.length || 0
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

function getMaintenanceSystemPrompt(detailLevel: string, query: string): string {
  const stepCount = detailLevel === 'quick' ? '10-12' : detailLevel === 'comprehensive' ? '18-20' : '15-17';
  const equipmentType = detectEquipmentCategory(query);
  const requiredQualifications = getRequiredQualificationsForEquipment(equipmentType);
  
  return `You are a UK electrical maintenance engineer. Generate ${stepCount} detailed maintenance steps per BS 7671:2018+A3:2024.

EQUIPMENT: ${equipmentType}
QUALIFICATIONS: ${requiredQualifications.slice(0, 3).join(', ')}

REQUIREMENTS:
- Generate equipment-SPECIFIC steps (not generic EICR steps)
- Each step: 100-150 words, 5-7 sub-steps, specific test values
- Reference BS 7671 regulations per step
- Include tools, materials, safety, duration, risk level
- Use UK English and exact UK qualification names

OUTPUT: Valid JSON object matching the schema provided. No markdown.`;
}

function getMaintenanceUserPrompt(
  query: string, 
  equipmentDetails: any, 
  practicalContext: string, 
  regulationsContext: string
): string {
  const stepCount = getStepCount(equipmentDetails?.detailLevel);
  
  return `Generate maintenance instructions for:

QUERY: ${query}
DETAILS: ${equipmentDetails ? JSON.stringify(equipmentDetails) : 'Not specified'}

PRACTICAL KNOWLEDGE:
${practicalContext || 'Use industry best practice'}

BS 7671 REGULATIONS:
${regulationsContext || 'BS 7671:2018+A3:2024 Chapter 64'}

OUTPUT JSON (follow exactly):
{
  "maintenanceGuide": "2-3 paragraph overview",
  "executiveSummary": {
    "equipmentType": "string",
    "estimatedAge": "string or null",
    "maintenanceType": "Periodic Inspection | Preventive Maintenance | Condition-Based Maintenance",
    "recommendedFrequency": "Annual | Bi-annual | Quarterly",
    "overallCondition": "string",
    "criticalFindings": ["array of strings"]
  },
  "steps": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "content": "100-150 words detailed procedure",
      "safety": ["Safety notes array"],
      "toolsRequired": ["Tools array"],
      "materialsNeeded": ["Materials array"],
      "estimatedDuration": "15-20 minutes",
      "riskLevel": "low | medium | high",
      "qualifications": ["UK qualification names"],
      "inspectionCheckpoints": ["Checkpoints array"],
      "linkedHazards": ["Hazards array"],
      "bsReferences": ["BS 7671 regulation refs"],
      "observations": [],
      "defectCodes": []
    }
  ],
  "summary": {
    "totalSteps": ${stepCount},
    "estimatedDuration": "string",
    "requiredQualifications": ["array"],
    "toolsRequired": ["array"],
    "materialsRequired": ["array"],
    "overallRiskLevel": "low | medium | high",
    "criticalSafetyNotes": ["array"]
  },
  "recommendations": ["array of strings"],
  "eicrObservations": {
    "c1Dangerous": [],
    "c2UrgentRemedial": [],
    "c3Improvement": [],
    "fir": []
  }
}

Generate ${stepCount} complete steps. Each step must have all fields populated.`;
}

function getStepCount(detailLevel: string | undefined): number {
  if (detailLevel === 'quick') return 12;
  if (detailLevel === 'comprehensive') return 18;
  return 15;
}
