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

    // Generate maintenance method with GPT-4o-mini
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json'
      },
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
  
  return `You are an expert electrical maintenance engineer specialising in UK BS 7671 periodic inspection and preventive maintenance.

Generate detailed maintenance instructions with ${stepCount} comprehensive steps covering the complete maintenance lifecycle.

⚡ CRITICAL: EQUIPMENT-SPECIFIC STEPS REQUIRED ⚡
Equipment Type Detected: ${equipmentType}

REQUIRED QUALIFICATIONS FOR THIS EQUIPMENT:
${requiredQualifications.map(q => `- ${q}`).join('\n')}
Use these EXACT qualification names in your output. DO NOT use generic terms.

You MUST generate steps that are SPECIFIC and UNIQUE to this equipment type.
DO NOT generate generic EICR-style inspection steps unless the query explicitly asks for an EICR.
The practical maintenance knowledge provided contains equipment-specific procedures - YOU MUST USE THEM.

STEP GENERATION APPROACH:
- Derive steps DIRECTLY from the equipment-specific RAG context provided below
- Each step must be UNIQUE to the equipment being maintained
- DO NOT use the same generic sequence for every equipment type
- Adapt step count to equipment complexity (${stepCount} steps)
- If RAG context mentions specific procedures (e.g., "busbar torque checks", "thermal imaging of joints", "contactor wear inspection"), these MUST appear as distinct steps

EQUIPMENT-SPECIFIC EXAMPLES:
• Busbar Systems: Joint torque verification, thermal imaging of connections, IP rating verification, phase-to-phase insulation resistance, dust/contamination inspection
• Motor Control Centres: Contactor wear inspection, overload relay testing, DOL/Star-Delta functional checks, auxiliary contact verification, control circuit testing
• Consumer Units: MCB/RCBO operation testing, busbar torque verification, RCD ramp testing, discrimination verification, surge protection device inspection
• Emergency Lighting: Battery condition assessment, 3-hour duration test, charge circuit verification, lamp/LED function test, self-test facility check
• Transformers: Oil quality testing, winding resistance measurement, turns ratio verification, temperature monitoring, cooling system inspection

CRITICAL OUTPUT REQUIREMENTS:
- Generate a valid JSON object (no markdown, no code blocks)
- Follow the exact schema structure provided
- Each step MUST be 100-150 words minimum with specific procedures
- Each step MUST reference 2-3 BS 7671 regulations (e.g., "BS 7671:2018+A3:2024 Reg 612.3; Chapter 64; Table 61")
- Include GN3 (Guidance Note 3: Inspection & Testing) references where relevant
- Include IET Guidance Note and HSE/CDM regulations for safety-critical tasks

PROCEDURE STEP REQUIREMENTS:
- 5-7 detailed sub-steps per main step
- Specific test instrument settings (e.g., "Set MFT to 500V IR test, confirm >1MΩ")
- Expected values with units (e.g., "Zs should be <0.87Ω for 32A Type B MCB per Table 41.3")
- Pass/fail criteria with exact thresholds
- Documentation requirements per step

SAFETY REQUIREMENTS:
- Specific isolation procedures per Reg 132.10
- Lockout/tagout requirements
- PPE specifications (Arc-rated gloves, face shields)
- Permit-to-work requirements for live testing

TOOLS & EQUIPMENT:
- Exact model specifications (e.g., "Megger MFT1835 or equivalent GS38-compliant")
- Calibration requirements (e.g., "Within 12-month calibration certificate")
- Test lead specifications per GS38

UK ELECTRICAL QUALIFICATIONS - USE EXACT NAMES:
When specifying qualifications, use SPECIFIC UK industry qualifications:
✅ CORRECT:
- "City & Guilds 2382-22 (18th Edition BS 7671:2018+A2:2022)" NOT "18th Edition trained"
- "City & Guilds 2391-52 Inspection & Testing" NOT "Inspection qualified"
- "ECS Gold Card (JIB Registered Electrician)" NOT "Competent Person"
- "AM2 Practical Assessment" for installation competence
- "City & Guilds 2377 PAT Testing" for portable appliance testing
- "SSSTS Construction Site Safety" for site work
- "City & Guilds 2365 / EAL Level 3 Electrical Installation"

❌ AVOID GENERIC TERMS:
- "18th Edition trained" → Use "City & Guilds 2382-22"
- "Competent Person" → Use "ECS Gold Card (JIB Registered)"
- "Inspection qualified" → Use "City & Guilds 2391-52"

EQUIPMENT-SPECIFIC QUALIFICATIONS:
- Emergency Lighting: "City & Guilds 2919 Emergency Lighting"
- HV Work: "HV Authorised Person (AP)" for equipment >1kV
- Control Systems: Include manufacturer training (e.g., "Siemens PLC certification")
- PAT Testing: "City & Guilds 2377 PAT Testing"

UK ENGLISH: Use British English spelling and electrical terminology throughout.`;
}

function getMaintenanceUserPrompt(
  query: string, 
  equipmentDetails: any, 
  practicalContext: string, 
  regulationsContext: string
): string {
  return `Generate comprehensive maintenance instructions for the following:

**EQUIPMENT QUERY:**
${query}

**EQUIPMENT DETAILS:**
${equipmentDetails ? JSON.stringify(equipmentDetails, null, 2) : 'Not specified'}

**PRACTICAL MAINTENANCE KNOWLEDGE:**
${practicalContext || 'No specific maintenance procedures found - use industry best practice'}

**RELEVANT BS 7671 REGULATIONS:**
${regulationsContext || 'BS 7671:2018+A3:2024 - General Requirements for Periodic Inspection (Chapter 64)'}

**OUTPUT JSON SCHEMA:**
{
  "maintenanceGuide": "2-3 paragraph executive overview of maintenance requirements",
  "executiveSummary": {
    "equipmentType": "Specific equipment name",
    "estimatedAge": "Approximate age if known",
    "maintenanceType": "Periodic Inspection | Preventive Maintenance | Condition-Based Maintenance",
    "recommendedFrequency": "Annual | Bi-annual | Quarterly",
    "overallCondition": "Assessment category",
    "criticalFindings": ["Key issues requiring immediate attention"]
  },
  "steps": [
    {
      "stepNumber": 1,
      "title": "Pre-Inspection Safety Isolation",
      "content": "100-150 word detailed procedure with specific actions, test values, and acceptance criteria",
      "safety": [
        "Isolation procedure per BS 7671 Reg 132.10",
        "Prove dead with GS38-compliant voltage indicator",
        "Apply safety locks and warning labels per HSE guidance"
      ],
      "toolsRequired": [
        "Megger MFT1835 multifunction tester (calibrated within 12 months)",
        "Fluke T6-1000 voltage indicator",
        "Proving unit for voltage indicator verification"
      ],
      "materialsNeeded": [
        "Isolation padlocks (minimum 3)",
        "Electrical danger warning labels",
        "Test record sheets"
      ],
      "estimatedDuration": "15-20 minutes",
      "riskLevel": "high",
      "qualifications": [
        "City & Guilds 2382-22 (18th Edition BS 7671:2018+A2:2022)",
        "City & Guilds 2391-52 Inspection & Testing",
        "ECS Gold Card (JIB Registered Electrician)"
      ],
      "inspectionCheckpoints": [
        "Supply successfully isolated at main switch",
        "Voltage absence proven on all phases",
        "Adjacent circuits identified and protected"
      ],
      "linkedHazards": [
        "Electric shock from live parts",
        "Arc flash if isolation incomplete"
      ],
      "bsReferences": [
        "BS 7671:2018+A3:2024 Reg 132.10 - Isolation and switching",
        "BS 7671 Chapter 53 - Protection, isolation and switching",
        "GS38 - Electrical test equipment for use by electricians"
      ],
      "observations": [],
      "defectCodes": []
    }
    // ... continue for all ${getStepCount(equipmentDetails?.detailLevel)} steps
  ],
  "summary": {
    "totalSteps": ${getStepCount(equipmentDetails?.detailLevel)},
    "estimatedDuration": "3-5 hours",
    "requiredQualifications": [
      "City & Guilds 2382-22 (18th Edition BS 7671:2018+A2:2022)",
      "City & Guilds 2391-52 Inspection & Testing",
      "ECS Gold Card (JIB Registered Electrician)",
      "AM2 Practical Assessment",
      "SSSTS Construction Site Safety (if construction site)"
    ],
    "toolsRequired": [
      "Multifunction tester (MFT)",
      "Thermal imaging camera",
      "Torque screwdriver set",
      "Earth electrode tester"
    ],
    "materialsRequired": [
      "Electrical certificates (EICR)",
      "Warning labels",
      "Isolation equipment"
    ],
    "overallRiskLevel": "medium",
    "criticalSafetyNotes": [
      "All work must be carried out in accordance with BS 7671:2018+A3:2024",
      "Dead testing preferred; live testing only when absolutely necessary under controlled conditions"
    ]
  },
  "recommendations": [
    "Specific remedial actions required",
    "Preventive measures to extend equipment life",
    "Future maintenance scheduling based on findings"
  ],
  "eicrObservations": {
    "c1Dangerous": [],
    "c2UrgentRemedial": [],
    "c3Improvement": [],
    "fir": []
  }
}

Generate the complete maintenance method following this exact schema. Ensure all steps are detailed, practical, and compliant with BS 7671:2018+A3:2024 and related UK electrical standards.`;
}

function getStepCount(detailLevel: string | undefined): number {
  if (detailLevel === 'quick') return 12;
  if (detailLevel === 'comprehensive') return 18;
  return 15;
}
