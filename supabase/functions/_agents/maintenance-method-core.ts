/**
 * Maintenance Method Generation Core Agent
 * Generates detailed step-by-step maintenance instructions (15+ steps)
 * Uses practical_work_intelligence with maintenance focus
 */

import { searchPracticalWorkIntelligence, formatForAIContext } from '../_shared/rag-practical-work.ts';

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

    // BS 7671 Regulations - Focus on Chapter 64 (Inspection & Testing) and Part 7
    const { data: regulations } = await supabase.rpc('search_bs7671_intelligence_hybrid', {
      query_text: `${query} Chapter 64 inspection testing verification periodic maintenance Part 7 special locations`,
      match_count: 15
    });

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
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: getMaintenanceSystemPrompt(detailLevel)
          },
          {
            role: 'user',
            content: getMaintenanceUserPrompt(query, equipmentDetails, practicalContext, regulationsContext)
          }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const maintenanceMethod = JSON.parse(aiData.choices[0].message.content);

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

function getMaintenanceSystemPrompt(detailLevel: string): string {
  const stepCount = detailLevel === 'quick' ? '10-12' : detailLevel === 'comprehensive' ? '18-20' : '15-17';
  
  return `You are an expert electrical maintenance engineer specialising in UK BS 7671 periodic inspection and preventive maintenance.

Generate detailed maintenance instructions with ${stepCount} comprehensive steps covering the complete maintenance lifecycle.

CRITICAL OUTPUT REQUIREMENTS:
- Generate a valid JSON object (no markdown, no code blocks)
- Follow the exact schema structure provided
- Each step MUST be 100-150 words minimum with specific procedures
- Each step MUST reference 2-3 BS 7671 regulations (e.g., "BS 7671:2018+A3:2024 Reg 612.3; Chapter 64; Table 61")
- Include GN3 (Guidance Note 3: Inspection & Testing) references where relevant
- Include IET Guidance Note and HSE/CDM regulations for safety-critical tasks

STEP STRUCTURE (${stepCount} steps):
1-2: Pre-inspection safety checks & isolation procedures
3-5: Visual inspection phases (external condition, internal components, terminations)
6-9: Testing procedures (continuity, insulation resistance, earth loop impedance, RCD)
10-12: Functional checks, thermal imaging, connection torque verification
13-15: Component assessment, wear analysis, replacement recommendations
16+: Remedial actions, documentation, EICR observations (if comprehensive)

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
      "qualifications": ["18th Edition Wiring Regulations", "Competent Person status"],
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
      "18th Edition Wiring Regulations (BS 7671:2018+A3:2024)",
      "C&G 2391-52 Inspection & Testing",
      "Competent Person (as defined by BS 7671)"
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
