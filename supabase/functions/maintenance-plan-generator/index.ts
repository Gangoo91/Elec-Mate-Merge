import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { safeAll } from '../_shared/safe-parallel.ts';

// Type definitions
interface MaintenanceRequest {
  equipmentDescription: string;
  equipmentType: string;
  location: string;
  ageYears?: number;
  buildingType?: string;
  environment?: string;
  criticality?: string;
  manufacturer?: string;
  modelNumber?: string;
  lastInspectionDate?: string;
  currentIssues?: string;
  clientName?: string;
  siteAddress?: string;
  assessorName?: string;
  companyName?: string;
  detailLevel?: 'quick' | 'full';
}

interface TaskOutline {
  interval: string;
  task: string;
  regulation?: string;
  priority: 'high' | 'medium' | 'low';
  taskCategory?: 'inspection' | 'testing' | 'maintenance' | 'replacement';
}

interface FailureMode {
  failure: string;
  probability: number;
  earlyWarnings?: string[];
  preventiveMeasures?: string[];
}

interface RegulationCitation {
  regulationNumber: string;
  section?: string;
  title?: string;
  excerpt: string;
  whyApplies?: string;
  consequence?: string;
}

// Risk scoring
const calculateRiskScore = (params: {
  ageYears: number;
  environment: string;
  criticality: string;
  currentIssues: string;
  lastInspectionDate?: string;
}): { score: number; level: string; factors: string[] } => {
  let score = 0;
  const factors: string[] = [];

  // Age risk
  if (params.ageYears > 20) {
    score += 30;
    factors.push(`Installation is ${params.ageYears} years old`);
  } else if (params.ageYears > 15) {
    score += 25;
    factors.push(`Installation age: ${params.ageYears} years`);
  } else if (params.ageYears > 10) {
    score += 15;
  } else if (params.ageYears > 5) {
    score += 5;
  }

  // Environment risk
  const envRisk: Record<string, number> = { indoor: 0, outdoor: 10, damp: 15, corrosive: 20 };
  score += envRisk[params.environment] || 0;
  if (params.environment !== 'indoor') {
    factors.push(`Exposed to ${params.environment} environment`);
  }

  // Criticality risk
  const critRisk: Record<string, number> = { standard: 0, critical: 10, 'life-safety': 15 };
  score += critRisk[params.criticality] || 0;
  if (params.criticality !== 'standard') {
    factors.push(`${params.criticality} criticality installation`);
  }

  // Current issues
  if (params.currentIssues && params.currentIssues.length > 10) {
    score += 15;
    factors.push('Known issues reported');
  }

  // Last inspection
  if (params.lastInspectionDate) {
    const daysSince = Math.floor((Date.now() - new Date(params.lastInspectionDate).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince > 1825) {
      score += 20;
      factors.push('No inspection in over 5 years');
    } else if (daysSince > 730) {
      score += 10;
      factors.push('Last inspected over 2 years ago');
    }
  }

  const level = score >= 75 ? 'critical' : score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low';
  return { score, level, factors };
};

// AI call wrapper
const callOpenAI = async (
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number,
  timeout: number = Timeouts.AI_CALL
) => {
  return await withTimeout(
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: maxTokens,
      }),
    }),
    timeout,
    'OpenAI API call'
  );
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: MaintenanceRequest = await req.json();
    
    const { 
      equipmentDescription, 
      equipmentType, 
      location, 
      ageYears = 0,
      buildingType,
      environment = 'indoor',
      criticality = 'standard',
      manufacturer,
      modelNumber,
      lastInspectionDate,
      currentIssues = '',
      clientName,
      siteAddress,
      assessorName,
      companyName,
      detailLevel = 'quick'
    } = requestData;

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

    console.log(`🔧 Generating ${detailLevel} maintenance plan for: ${equipmentType}`);

    // Calculate risk
    const riskAssessment = calculateRiskScore({
      ageYears,
      environment,
      criticality,
      currentIssues,
      lastInspectionDate
    });

    console.log(`⚠️ Risk: ${riskAssessment.level} (${riskAssessment.score}/100)`);

    // Generate embedding for RAG
    const embeddingResponse = await withTimeout(
      fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: `${equipmentType} ${buildingType || ''} ${environment}: ${equipmentDescription}`,
        }),
      }),
      Timeouts.QUICK,
      'Embedding generation'
    );

    if (!embeddingResponse.ok) throw new Error('Failed to generate embedding');
    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Parallel RAG retrieval
    const [maintenanceKnowledge, bs7671Regs, failureModes] = await Promise.all([
      supabase.rpc('search_maintenance_hybrid', {
        query_text: `${equipmentType} maintenance schedule procedures testing`,
        query_embedding: queryEmbedding,
        equipment_filter: equipmentType,
        match_count: detailLevel === 'quick' ? 6 : 12
      }),
      supabase.rpc('search_bs7671_hybrid_cached', {
        query_text: `${equipmentType} periodic inspection testing maintenance`,
        query_embedding: queryEmbedding,
        match_count: detailLevel === 'quick' ? 4 : 10
      }),
      supabase.rpc('search_maintenance_hybrid', {
        query_text: `${equipmentType} failures defects problems ${environment}`,
        query_embedding: queryEmbedding,
        equipment_filter: equipmentType,
        match_count: detailLevel === 'quick' ? 4 : 8
      })
    ]);

    console.log(`📚 RAG: ${maintenanceKnowledge.data?.length || 0} maintenance, ${bs7671Regs.data?.length || 0} regs, ${failureModes.data?.length || 0} failures`);

    // Build expert knowledge context
    const expertKnowledge = `
=== EXPERT KNOWLEDGE (UK ENGLISH ONLY) ===

MAINTENANCE PROCEDURES:
${maintenanceKnowledge.data?.map((item: any) => `• ${item.topic}: ${item.content.substring(0, 200)}`).join('\n') || 'Standard practices'}

BS 7671:2018+A3:2024 REGULATIONS:
${bs7671Regs.data?.map((reg: any) => `• Reg ${reg.regulation_number}: ${reg.content.substring(0, detailLevel === 'quick' ? 150 : 300)}`).join('\n') || 'General requirements'}

COMMON FAILURES:
${failureModes.data?.map((item: any) => `• ${item.topic}: ${item.content.substring(0, 150)}`).join('\n') || 'Age-related wear'}
`;

    const baseSystemPrompt = `You are a UK electrical maintenance expert with 20+ years experience. You know BS 7671:2018+A3:2024 regulations intimately.

CRITICAL: Use ONLY UK English spelling (analyse, organise, colour, metre, centre, etc.)

${expertKnowledge}

INSTRUCTIONS:
- Present ALL knowledge as your own professional experience (never mention "sources" or "databases")
- Write for professional electricians working to 18th Edition standards
- All procedures must be field-ready and actionable
- Use authoritative language: "Based on BS 7671..." not "According to data..."`;

    const missingSections: string[] = [];
    let schedule: any;

    if (detailLevel === 'quick') {
      // ===== QUICK MODE: 2 parallel calls =====
      console.log('🚀 Quick mode: 2 parallel AI calls');

      const quickResults = await safeAll([
        {
          name: 'outline-and-tasks',
          execute: async () => {
            const response = await callOpenAI(
              openAIApiKey,
              baseSystemPrompt,
              `Generate a concise maintenance plan for ${equipmentType} (${equipmentDescription}) at ${location}.

Age: ${ageYears} years | Environment: ${environment} | Criticality: ${criticality}
Risk: ${riskAssessment.level} (${riskAssessment.score}/100)

Return JSON with:
{
  "equipmentType": "${equipmentType}",
  "location": "${location}",
  "ageYears": ${ageYears},
  "buildingType": "${buildingType || 'not specified'}",
  "riskScore": ${riskAssessment.score},
  "riskLevel": "${riskAssessment.level}",
  "riskFactors": ${JSON.stringify(riskAssessment.factors)},
  "complianceStatus": "compliant|attention-needed|non-compliant",
  "nextEICRDue": "ISO date",
  "schedule": [
    {
      "interval": "string",
      "task": "string",
      "regulation": "BS 7671 ref",
      "priority": "high|medium|low",
      "estimatedDurationMinutes": number,
      "estimatedCost": {"min": number, "max": number},
      "requiredQualifications": ["string"],
      "toolsRequired": ["string"],
      "nextDue": "ISO date",
      "taskCategory": "inspection|testing|maintenance|replacement"
    }
  ],
  "annualCostEstimate": {"min": number, "max": number},
  "totalEstimatedHours": number,
  "recommendations": ["string"]
}

Generate ${buildingType === 'domestic' ? '3-5' : '5-7'} essential tasks. Keep concise.`,
              2200,
              Timeouts.LONG
            );

            if (!response.ok) {
              const errorText = await response.text();
              console.error('Tasks call failed:', errorText);
              throw new Error('Failed to generate tasks');
            }

            const data = await response.json();
            let content = data.choices[0].message.content.trim();
            
            // Remove code fences if present
            if (content.includes('```')) {
              content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            }
            
            try {
              return JSON.parse(content);
            } catch (parseError) {
              console.error('JSON parse failed (outline-and-tasks):', parseError);
              throw new Error('PARSE_ERROR: Invalid JSON from AI');
            }
          }
        },
        {
          name: 'failures-and-regulations',
          execute: async () => {
            const response = await callOpenAI(
              openAIApiKey,
              baseSystemPrompt,
              `For ${equipmentType} (age: ${ageYears}y, environment: ${environment}), provide:

Return JSON with:
{
  "commonFailureModes": [
    {
      "failure": "string",
      "probability": number (0-100),
      "earlyWarnings": ["string"],
      "preventiveMeasures": ["string"]
    }
  ],
  "regulations": [
    {
      "regulationNumber": "BS 7671 Reg X.X.X",
      "section": "Part/Chapter",
      "title": "Title",
      "excerpt": "40-80 words of regulation text",
      "whyApplies": "Plain English explanation",
      "consequence": "Safety/legal consequence"
    }
  ]
}

Generate 3-4 failure modes and 3-5 key regulations. Be concise but professional.`,
              1600,
              Timeouts.LONG
            );

            if (!response.ok) {
              const errorText = await response.text();
              console.error('Failures call failed:', errorText);
              throw new Error('Failed to generate failures');
            }

            const data = await response.json();
            let content = data.choices[0].message.content.trim();
            
            // Remove code fences if present
            if (content.includes('```')) {
              content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            }
            
            try {
              return JSON.parse(content);
            } catch (parseError) {
              console.error('JSON parse failed (failures-and-regulations):', parseError);
              throw new Error('PARSE_ERROR: Invalid JSON from AI');
            }
          }
        }
      ]);

      // Merge results with better partial handling
      if (quickResults.successes.length === 0) {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: 'Quick mode failed to generate plan. Please try Full Detail mode or simplify your request.',
            code: 'QUICK_FAILED'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const outlineSuccess = quickResults.successes.find(s => s.name === 'outline-and-tasks');
      const failuresSuccess = quickResults.successes.find(s => s.name === 'failures-and-regulations');

      if (outlineSuccess) {
        schedule = outlineSuccess.result;
        
        if (failuresSuccess) {
          // Both succeeded - full merge
          schedule.commonFailureModes = failuresSuccess.result.commonFailureModes || [];
          schedule.regulations = failuresSuccess.result.regulations || [];
        } else {
          // Only outline - partial
          schedule.commonFailureModes = [];
          schedule.regulations = [];
          missingSections.push('failure modes', 'regulations');
        }
      } else if (failuresSuccess) {
        // Only failures succeeded - minimal shell
        schedule = {
          equipmentType,
          location,
          ageYears,
          buildingType: buildingType || 'not specified',
          riskScore: riskAssessment.score,
          riskLevel: riskAssessment.level,
          riskFactors: riskAssessment.factors,
          schedule: [],
          recommendations: ['Complete full assessment for detailed maintenance plan'],
          commonFailureModes: failuresSuccess.result.commonFailureModes || [],
          regulations: failuresSuccess.result.regulations || []
        };
        missingSections.push('schedule', 'recommendations');
      }

      if (quickResults.failures.length > 0) {
        console.warn(`⚠️ ${quickResults.failures.length} quick calls failed:`, quickResults.failures.map(f => f.name));
      }

    } else {
      // ===== FULL MODE: Multi-stage pipeline =====
      console.log('📚 Full mode: Multi-stage AI pipeline');

      // Stage 1: Outline + skeleton
      const outlineResponse = await callOpenAI(
        openAIApiKey,
        baseSystemPrompt,
        `Generate comprehensive maintenance plan outline for ${equipmentType} (${equipmentDescription}) at ${location}.

Age: ${ageYears} years | Building: ${buildingType || 'unspecified'} | Environment: ${environment} | Criticality: ${criticality}
Risk: ${riskAssessment.level} (${riskAssessment.score}/100) - Factors: ${riskAssessment.factors.join('; ')}

Return JSON with:
{
  "equipmentType": "${equipmentType}",
  "location": "${location}",
  "ageYears": ${ageYears},
  "buildingType": "${buildingType || 'not specified'}",
  "riskScore": ${riskAssessment.score},
  "riskLevel": "${riskAssessment.level}",
  "riskFactors": ${JSON.stringify(riskAssessment.factors)},
  "complianceStatus": "compliant|attention-needed|non-compliant",
  "complianceWarnings": ["string array if issues"],
  "nextEICRDue": "ISO date",
  "schedule": [
    {
      "interval": "string",
      "task": "detailed task name",
      "regulation": "BS 7671 Reg X.X.X",
      "priority": "high|medium|low",
      "estimatedDurationMinutes": number,
      "estimatedCost": {"min": number, "max": number},
      "requiredQualifications": ["string"],
      "toolsRequired": ["specific tools"],
      "nextDue": "ISO date",
      "taskCategory": "inspection|testing|maintenance|replacement"
    }
  ],
  "annualCostEstimate": {"min": number, "max": number},
  "totalEstimatedHours": number,
  "recommendations": ["string"]
}

Generate ${buildingType === 'domestic' ? '5-7' : '8-12'} detailed tasks.`,
        1800,
        Timeouts.EXTENDED
      );

      if (!outlineResponse.ok) {
        const errorText = await outlineResponse.text();
        console.error('Outline call failed:', errorText);
        throw new Error('Failed to generate outline');
      }

      const outlineData = await outlineResponse.json();
      schedule = JSON.parse(outlineData.choices[0].message.content.trim());

      console.log(`✅ Stage 1 complete: ${schedule.schedule.length} tasks outlined`);

      // Stage 2: Parallel expansion (tasks, failures, regulations)
      const stage2Results = await safeAll([
        {
          name: 'expand-tasks',
          execute: async () => {
            // Expand first 4 tasks in detail
            const tasksToExpand = schedule.schedule.slice(0, Math.min(4, schedule.schedule.length));
            
            const response = await callOpenAI(
              openAIApiKey,
              baseSystemPrompt,
              `Expand these ${tasksToExpand.length} tasks with detailed procedures for ${equipmentType}:

${tasksToExpand.map((t: any, i: number) => `${i + 1}. ${t.task} (${t.interval})`).join('\n')}

Return JSON array with each task having:
{
  "taskIndex": number (0-based index matching above),
  "procedure": ["Step 1: specific action...", "Step 2: ...", "Step 3: ...", "Step 4: ...", "Step 5: ..."],
  "safetyPrecautions": ["PPE item 1", "Safety measure 2", "Isolation requirement 3"],
  "recordKeeping": "What to document"
}

Each task MUST have 5-8 detailed procedural steps with specific tools, test voltages, and pass/fail criteria.`,
              1800,
              Timeouts.EXTENDED
            );

            if (!response.ok) throw new Error('Task expansion failed');
            const data = await response.json();
            return JSON.parse(data.choices[0].message.content.trim());
          }
        },
        {
          name: 'failure-analysis',
          execute: async () => {
            const response = await callOpenAI(
              openAIApiKey,
              baseSystemPrompt,
              `For ${equipmentType} (age: ${ageYears}y, ${environment} environment), analyse failure modes:

Return JSON:
{
  "commonFailureModes": [
    {
      "failure": "specific failure mode",
      "probability": number (0-100% based on age/environment),
      "earlyWarnings": ["observable sign 1", "symptom 2", "indicator 3"],
      "preventiveMeasures": ["action 1", "action 2", "action 3"]
    }
  ]
}

Generate 4-6 failure modes with specific probabilities and comprehensive prevention advice.`,
              1200,
              Timeouts.STANDARD
            );

            if (!response.ok) throw new Error('Failure analysis failed');
            const data = await response.json();
            return JSON.parse(data.choices[0].message.content.trim());
          }
        },
        {
          name: 'regulations-detailed',
          execute: async () => {
            const response = await callOpenAI(
              openAIApiKey,
              baseSystemPrompt,
              `For ${equipmentType} maintenance, provide detailed BS 7671:2018+A3:2024 regulations:

Return JSON:
{
  "regulations": [
    {
      "regulationNumber": "BS 7671 Reg X.X.X",
      "section": "Part/Chapter name",
      "title": "Regulation title",
      "excerpt": "80-110 words of actual regulation text",
      "whyApplies": "Plain English explanation for this installation",
      "consequence": "Safety/legal consequence of non-compliance",
      "relatedRegs": ["Reg A.B.C", "Reg D.E.F"]
    }
  ],
  "complianceChecklist": [
    {
      "requirement": "specific requirement",
      "regulation": "BS 7671 Reg X.X.X",
      "status": "compliant|unknown|non-compliant",
      "action": "required action if non-compliant"
    }
  ]
}

Generate 6-10 regulations with excerpts and 5-8 compliance checklist items.`,
              1800,
              Timeouts.EXTENDED
            );

            if (!response.ok) throw new Error('Regulations call failed');
            const data = await response.json();
            return JSON.parse(data.choices[0].message.content.trim());
          }
        }
      ]);

      // Merge Stage 2 results
      if (stage2Results.successes.length > 0) {
        for (const success of stage2Results.successes) {
          if (success.name === 'expand-tasks' && Array.isArray(success.result)) {
            // Merge expanded task procedures
            for (const expansion of success.result) {
              const taskIdx = expansion.taskIndex;
              if (schedule.schedule[taskIdx]) {
                schedule.schedule[taskIdx].procedure = expansion.procedure;
                schedule.schedule[taskIdx].safetyPrecautions = expansion.safetyPrecautions;
                schedule.schedule[taskIdx].recordKeeping = expansion.recordKeeping;
              }
            }
          } else if (success.name === 'failure-analysis') {
            schedule.commonFailureModes = success.result.commonFailureModes || [];
          } else if (success.name === 'regulations-detailed') {
            schedule.regulations = success.result.regulations || [];
            schedule.complianceChecklist = success.result.complianceChecklist || [];
          }
        }
      }

      // Track missing sections
      const successNames = stage2Results.successes.map(s => s.name);
      if (!successNames.includes('expand-tasks')) missingSections.push('detailed-procedures');
      if (!successNames.includes('failure-analysis')) missingSections.push('failure-modes');
      if (!successNames.includes('regulations-detailed')) missingSections.push('regulations');

      if (stage2Results.failures.length > 0) {
        console.warn(`⚠️ ${stage2Results.failures.length} full mode calls failed:`, stage2Results.failures.map(f => f.name));
      }

      console.log(`✅ Full mode complete: ${missingSections.length === 0 ? 'All sections' : `Missing: ${missingSections.join(', ')}`}`);
    }

    // Validate minimum quality
    if (!schedule.schedule || schedule.schedule.length < (detailLevel === 'quick' ? 2 : 3)) {
      throw new Error(`Insufficient tasks generated: ${schedule.schedule?.length || 0}`);
    }

    // Clean up response (remove RAG traces)
    delete schedule.ragSources;
    delete schedule.knowledgeBase;
    delete schedule.retrievedData;

    // Add partial flag if needed
    if (missingSections.length > 0) {
      schedule.partial = true;
      schedule.missingSections = missingSections;
    }

    console.log(`✅ ${detailLevel.toUpperCase()} plan generated: ${schedule.schedule.length} tasks${schedule.partial ? ' (partial)' : ''}`);

    return new Response(
      JSON.stringify({ success: true, schedule }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('❌ Maintenance plan error:', err);
    
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    let friendlyMessage = 'Failed to generate maintenance plan. Please try again.';
    let errorCode = 'INTERNAL';

    if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
      friendlyMessage = 'Generation timed out. Try Quick mode or simplify the equipment description.';
      errorCode = 'TIMEOUT';
    } else if (errorMessage.includes('max_completion_tokens') || errorMessage.includes('token limit')) {
      friendlyMessage = 'Plan too detailed. Try Quick mode or reduce equipment complexity.';
      errorCode = 'TOKEN_LIMIT';
    } else if (errorMessage.includes('PARSE_ERROR')) {
      friendlyMessage = 'AI response format issue. Please try again.';
      errorCode = 'PARSE_ERROR';
    } else if (errorMessage.includes('QUICK_FAILED')) {
      friendlyMessage = 'Quick mode failed. Try Full Detail mode.';
      errorCode = 'QUICK_FAILED';
    }

    // Always return 200 with success:false so client can handle gracefully
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: friendlyMessage,
        code: errorCode,
        details: errorMessage 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
