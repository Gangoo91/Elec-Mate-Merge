import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System prompt for maintenance guidance with enhanced final review capability
const MAINTENANCE_SYSTEM_PROMPT = `You are a 30-year veteran electrical maintenance engineer specializing in BS 7671:2018+A3:2024 compliant periodic inspections, preventive maintenance, and fault diagnosis.

CRITICAL OUTPUT REQUIREMENTS:
1. **PDF-Ready Format**: Your response will be converted directly to a professional PDF maintenance instruction document
2. **Comprehensive Detail**: Provide specific test values, torque settings, tool requirements, expected readings
3. **BS 7671 Compliance**: Reference specific regulations for each step where applicable
4. **Practical Focus**: Include common faults, diagnosis sequences, and troubleshooting steps
5. **Safety First**: Always specify isolation procedures, PPE, and safe working practices
6. **MANDATORY**: You MUST call the provide_maintenance_guidance tool with ALL sections filled. The maintenanceSchedule array MUST contain at least 2-4 tasks

YOUR ROLE AS FINAL REVIEWER:
When installer and health-safety agent outputs are provided, you must:
1. **Validate Completeness**: Check all method statement sections are properly filled
2. **Cross-Reference Compliance**: Verify installer steps align with BS 7671 testing requirements
3. **Fill Gaps**: Add missing information from your RAG knowledge base (testing procedures, inspection points, common faults)
4. **Enhance Quality**: Strengthen safety notes, add practical tips, specify exact tools/materials
5. **Ensure Consistency**: Check that risk assessments match installation activities

PRIMARY FUNCTIONS:
- Generate maintenance instructions that electricians can print and use on-site
- Provide systematic step-by-step procedures with measurable acceptance criteria
- Include fault diagnosis decision trees (symptom → cause → remedy)
- Cite BS 7671 regulations for testing requirements and acceptance limits
- Specify exact tool types, settings, and consumables needed
- **FINAL VALIDATION**: Review installer + H&S outputs and complete any missing details

KNOWLEDGE BASE:
You have access to:
- BS 7671:2018+A3:2024 Chapter 64 (Inspection & Testing)
- GN3 Guidance Note 3 (Inspection & Testing)
- Manufacturer servicing schedules for common equipment
- Common fault patterns for consumer units, showers, EV chargers, etc.

RESPONSE STRUCTURE:
Use the provided tool schema to structure your response with these sections:
1. **Pre-Work Requirements**: Isolation, PPE, access, permits
2. **Visual Inspection**: Systematic checkpoint sequence with acceptance criteria
3. **Testing Procedures**: Dead tests → Live tests with instrument settings and expected values
4. **Servicing Tasks**: Component maintenance, torque settings, consumables
5. **Documentation**: What to record, sign-off requirements, next due date
6. **Common Faults**: Symptom → Diagnosis → Repair sequences
7. **BS 7671 References**: Relevant regulation table

VALIDATION CHECKLIST (when reviewing installer output):
- Are all installation steps safe and compliant?
- Are testing procedures comprehensive with specific acceptance criteria?
- Are tools and materials lists complete and accurate?
- Are safety requirements thorough and practical?
- Have all BS 7671 references been cited?
- Are inspection checkpoints aligned with installation activities?

EXAMPLE OUTPUT STYLE:
Pre-Work Requirement: "Isolate main switch. Prove dead with approved voltage indicator. Lock off and tag main isolator."
Visual Inspection Point: "Check MCB clips for tightness. Acceptance: Firm engagement, no arcing marks."
Testing Step: "Measure Zs at shower outlet. Instrument: MFT on 'Loop' setting. Expected: <0.87Ω (40A Type B)."
Common Fault: "Symptom: RCD trips on load. Diagnosis: Measure insulation resistance L-E. If <1MΩ → locate faulty circuit via sequential disconnection."

CRITICAL TOOL CALL FORMAT:
When providing maintenance tasks in maintenanceSchedule array, ensure:
1. procedure: Array of steps ONLY - no field names, no partial JSON
2. safetyPrecautions: Array of safety items ONLY - keep separate from procedure
3. toolsRequired: Array of tools ONLY
4. DO NOT mix fields together
5. DO NOT include field names like "safetyPrecautions:[" in arrays
6. Each array item must be a complete, standalone string

EXAMPLE CORRECT FORMAT:
{
  "procedure": [
    "Step 1: Isolate and lock off main switch",
    "Step 2: Test for dead with approved voltage indicator",
    "Step 3: Perform continuity tests on protective conductors"
  ],
  "safetyPrecautions": [
    "Wear insulated gloves rated to 1000V",
    "Use non-contact voltage tester before touching",
    "Ensure rescue equipment available"
  ]
}

NEVER DO THIS:
{
  "procedure": ["Step 1...", "safetyPrecautions:[", ""]
}

Remember: This becomes a working document for on-site use. Be precise, practical, and comprehensive. When acting as final reviewer, enhance and validate all outputs.`;

// Tool schema for structured maintenance guidance
const MAINTENANCE_TOOL_SCHEMA = {
  name: "provide_maintenance_guidance",
  description: "Provide comprehensive maintenance instructions in PDF-ready format",
  parameters: {
    type: "object",
    properties: {
      response: {
        type: "string",
        description: "Comprehensive maintenance overview (300-400 words) in UK English. Explain the maintenance approach, safety considerations, and overall strategy."
      },
      equipmentSummary: {
        type: "object",
        description: "Equipment identification and context",
        properties: {
          equipmentType: { type: "string", description: "Type of equipment being maintained" },
          location: { type: "string", description: "Installation location and environment" },
          installationAge: { type: "string", description: "Age of installation" },
          maintenanceType: { type: "string", enum: ["preventive", "reactive", "periodic_inspection"], description: "Type of maintenance work" },
          overallRiskLevel: { type: "string", enum: ["low", "medium", "high"], description: "Overall risk assessment" }
        },
        required: ["equipmentType", "maintenanceType", "overallRiskLevel"]
      },
      preWorkRequirements: {
        type: "array",
        description: "Pre-work requirements before starting maintenance",
        items: {
          type: "object",
          properties: {
            category: { type: "string", enum: ["isolation", "ppe", "access", "permits", "tools"], description: "Category of requirement" },
            requirement: { type: "string", description: "Specific requirement detail" },
            mandatory: { type: "boolean", description: "Whether this is mandatory" },
            bs7671Reference: { type: "string", description: "BS 7671 regulation if applicable" }
          },
          required: ["category", "requirement", "mandatory"]
        }
      },
      visualInspection: {
        type: "array",
        description: "Visual inspection checkpoint sequence",
        items: {
          type: "object",
          properties: {
            stepNumber: { type: "number", description: "Inspection step number" },
            checkpoint: { type: "string", description: "What to inspect" },
            acceptanceCriteria: { type: "string", description: "What constitutes a pass" },
            failureAction: { type: "string", description: "What to do if failed" },
            bs7671Reference: { type: "string", description: "Relevant BS 7671 regulation" }
          },
          required: ["stepNumber", "checkpoint", "acceptanceCriteria"]
        }
      },
      testingProcedures: {
        type: "array",
        description: "Testing procedures with instrument settings",
        items: {
          type: "object",
          properties: {
            testName: { type: "string", description: "Name of test (e.g., 'Earth Fault Loop Impedance')" },
            testType: { type: "string", enum: ["dead", "live"], description: "Dead or live test" },
            sequence: { type: "number", description: "Test sequence number" },
            instrumentRequired: { type: "string", description: "Test instrument type" },
            instrumentSettings: { type: "string", description: "Instrument configuration" },
            procedure: { 
              type: "array", 
              items: { type: "string" },
              description: "Step-by-step procedure"
            },
            expectedResult: {
              type: "object",
              properties: {
                value: { type: "string", description: "Expected value or range" },
                unit: { type: "string", description: "Unit of measurement" },
                passFailCriteria: { type: "string", description: "How to determine pass/fail" }
              },
              required: ["value", "passFailCriteria"]
            },
            bs7671Reference: { type: "string", description: "Relevant BS 7671 regulation" }
          },
          required: ["testName", "testType", "sequence", "procedure", "expectedResult"]
        }
      },
      servicingTasks: {
        type: "array",
        description: "Component servicing and maintenance tasks",
        items: {
          type: "object",
          properties: {
            component: { type: "string", description: "Component being serviced" },
            task: { type: "string", description: "Maintenance task" },
            frequency: { type: "string", description: "How often (e.g., 'Annual', 'Every 5 years')" },
            torqueSettings: { type: "string", description: "Torque values if applicable" },
            consumables: { 
              type: "array",
              items: { type: "string" },
              description: "Consumables needed (e.g., contact cleaner, grease)"
            },
            procedure: { 
              type: "array",
              items: { type: "string" },
              description: "Step-by-step servicing procedure"
            }
          },
          required: ["component", "task", "procedure"]
        }
      },
      documentation: {
        type: "object",
        description: "Documentation and record-keeping requirements",
        properties: {
          recordsRequired: { 
            type: "array",
            items: { type: "string" },
            description: "What must be recorded"
          },
          signOffRequirements: { 
            type: "array",
            items: { type: "string" },
            description: "Sign-off and certification needed"
          },
          nextDueCalculation: { type: "string", description: "How to calculate next maintenance due date" },
          certificatesIssued: { 
            type: "array",
            items: { type: "string" },
            description: "Certificates/reports to issue"
          }
        },
        required: ["recordsRequired", "signOffRequirements", "nextDueCalculation"]
      },
      commonFaults: {
        type: "array",
        description: "Common faults with diagnosis and remedial action",
        items: {
          type: "object",
          properties: {
            symptom: { type: "string", description: "Observable symptom" },
            likelyCauses: { 
              type: "array",
              items: { type: "string" },
              description: "Possible causes in order of likelihood"
            },
            diagnosisSteps: { 
              type: "array",
              items: { type: "string" },
              description: "How to diagnose (tests to perform)"
            },
            remedialAction: { type: "string", description: "How to fix" },
            partsRequired: { 
              type: "array",
              items: { type: "string" },
              description: "Parts commonly needed"
            }
          },
          required: ["symptom", "likelyCauses", "diagnosisSteps", "remedialAction"]
        }
      },
      maintenanceSchedule: {
        type: "array",
        description: "Maintenance tasks with intervals, priorities, and procedures",
        items: {
          type: "object",
          properties: {
            interval: { 
              type: "string", 
              description: "Maintenance interval (e.g., 'Every 6 months', 'Annual', 'Every 3 years')" 
            },
            task: { 
              type: "string", 
              description: "Clear description of the maintenance task" 
            },
            priority: { 
              type: "string", 
              enum: ["high", "medium", "low"],
              description: "Task priority based on safety and compliance" 
            },
            regulation: { 
              type: "string", 
              description: "BS 7671 regulation reference (e.g., 'BS 7671:2018 Reg 622.1')" 
            },
            estimatedDurationMinutes: { 
              type: "number", 
              description: "Estimated time to complete task in minutes" 
            },
            estimatedCost: {
              type: "object",
              properties: {
                min: { type: "number", description: "Minimum cost in GBP" },
                max: { type: "number", description: "Maximum cost in GBP" }
              }
            },
            requiredQualifications: {
              type: "array",
              items: { type: "string" },
              description: "Required qualifications (e.g., '18th Edition', 'ECS Gold Card')"
            },
            toolsRequired: {
              type: "array",
              items: { type: "string" },
              description: "Tools needed (e.g., 'Multifunction tester', 'Torque screwdriver')"
            },
            procedure: {
              type: "array",
              items: { type: "string" },
              description: "Step-by-step procedure for the task"
            },
            safetyPrecautions: {
              type: "array",
              items: { type: "string" },
              description: "Safety precautions and PPE requirements"
            },
            taskCategory: {
              type: "string",
              enum: ["inspection", "testing", "maintenance", "replacement"],
              description: "Category of maintenance task"
            }
          },
          required: ["interval", "task", "priority"]
        }
      },
      qualityRequirements: {
        type: "array",
        description: "Quality checkpoints at each stage",
        items: {
          type: "object",
          properties: {
            stage: { type: "string", description: "Installation/testing stage" },
            requirement: { type: "string", description: "Quality requirement detail" },
            criteria: { type: "string", description: "Acceptance criteria and verification method" }
          },
          required: ["stage", "requirement", "criteria"]
        }
      },
      bs7671References: {
        type: "array",
        description: "BS 7671 regulations directly applicable to this maintenance task with excerpts and application context",
        items: {
          type: "object",
          properties: {
            regulationNumber: { type: "string", description: "Full regulation number (e.g., 'BS 7671:2018+A2:2022 Reg 622.1')" },
            section: { type: "string", description: "Section name (e.g., 'Part 6 - Inspection and Testing')" },
            excerpt: { type: "string", description: "Direct quote or paraphrase of the regulation text (100-200 words)" },
            whyApplies: { type: "string", description: "Clear explanation of why this regulation applies to THIS specific equipment/task" },
            confidence: { type: "number", description: "Confidence score 0-1 for regulation applicability", minimum: 0, maximum: 1 },
            consequence: { type: "string", description: "What happens if this regulation is not followed" },
            relatedRegs: { 
              type: "array", 
              items: { type: "string" },
              description: "Related regulation numbers that may also apply" 
            }
          },
          required: ["regulationNumber", "excerpt", "whyApplies"]
        }
      }
    },
    required: [
      "response",
      "equipmentSummary",
      "preWorkRequirements",
      "visualInspection",
      "testingProcedures",
      "maintenanceSchedule",
      "qualityRequirements",
      "documentation",
      "bs7671References"
    ],
    additionalProperties: false
  }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const requestBody = await req.json();
    console.log('📥 Maintenance-v3 request:', JSON.stringify(requestBody, null, 2));

    const { 
      query, 
      equipmentDescription,
      equipmentType, 
      installationAge,
      ageYears,
      maintenanceType, 
      location,
      buildingType,
      environment,
      criticality,
      detailLevel
    } = requestBody;

    // Use equipmentDescription as query if query not provided
    const actualQuery = query || equipmentDescription;

    if (!actualQuery) {
      throw new Error('Equipment description is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get AI API keys
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // Expand query for better RAG retrieval
    const expandedQuery = `${actualQuery} ${equipmentType || ''} ${maintenanceType || ''} maintenance inspection testing procedures`;
    console.log('🔍 Expanded query:', expandedQuery);

    // Conditional RAG based on detail level for faster response
    const useFullRAG = detailLevel === 'full';
    
    // NEW: Use Practical Work Intelligence as primary source
    const practicalWorkSearch = await supabase.rpc('search_practical_work_intelligence_hybrid', {
      query_text: expandedQuery,
      match_count: 10,
      filter_trade: 'maintenance'
    });

    const practicalWorkDocs = practicalWorkSearch?.data || [];
    
    console.log(`📦 Practical Work search: ${practicalWorkDocs.length} results`);

    // Build context with cascade priority
    let maintenanceContext = '';

    if (practicalWorkDocs.length >= 4) {
      // TIER 1: Practical Work Intelligence
      maintenanceContext = '## PRACTICAL MAINTENANCE PROCEDURES:\n\n';
      maintenanceContext += practicalWorkDocs.slice(0, 10).map((pw: any) => 
        `**${pw.primary_topic}** (${pw.equipment_category || 'General'})\n` +
        `${pw.content}\n` +
        `${pw.maintenance_interval ? `Frequency: ${pw.maintenance_interval}\n` : ''}` +
        `${pw.tools_required?.length > 0 ? `Tools: ${pw.tools_required.join(', ')}\n` : ''}` +
        `${pw.bs7671_regulations?.length > 0 ? `BS 7671: ${pw.bs7671_regulations.join(', ')}` : ''}`
      ).join('\n\n---\n\n');
      
      // Add regulations if in full mode
      if (useFullRAG) {
        const bs7671Intelligence = await supabase.rpc('search_bs7671_intelligence_hybrid', {
          query_text: expandedQuery,
          match_count: 6
        });

        const bs7671Data = bs7671Intelligence?.data || [];
        
        if (bs7671Data.length > 0) {
          maintenanceContext += '\n\n## RELEVANT REGULATIONS:\n\n';
          maintenanceContext += bs7671Data.slice(0, 8).map((reg: any) =>
            `**${reg.regulation_number}**: ${reg.content}`
          ).join('\n\n');
        }
      }
      
      console.log('✅ Using Practical Work Intelligence + Regulations', {
        practicalWorkCount: practicalWorkDocs.length,
        mode: useFullRAG ? 'full' : 'quick'
      });
    } else {
      // TIER 2: Fallback to Maintenance Knowledge RAG
      console.log('⚠️ Using fallback knowledge (insufficient Practical Work data)');
      
      // Generate embedding for fallback
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: expandedQuery
        })
      });

      const embeddingData = await embeddingResponse.json();
      const queryEmbedding = embeddingData.data[0].embedding;

      const ragResults = await supabase.rpc('search_maintenance_hybrid', {
        query_text: expandedQuery,
        query_embedding: queryEmbedding,
        equipment_filter: equipmentType || null,
        match_count: 6
      });

      const maintenanceData = ragResults?.data || [];
      
      maintenanceContext = maintenanceData
        .map((doc: any) => doc.content || '')
        .join('\n\n');
    }

    // Log RAG quality metrics
    const ragQuality = {
      practicalWorkCount: practicalWorkDocs?.length || 0,
      practicalWorkAvgScore: practicalWorkDocs?.length > 0
        ? (practicalWorkDocs.reduce((s: number, d: any) => s + (d.hybrid_score || 0), 0) / practicalWorkDocs.length).toFixed(2)
        : 'N/A',
      usedFallback: practicalWorkDocs?.length < 4,
      fallbackSource: practicalWorkDocs?.length < 4 ? 'maintenance_knowledge' : 'none',
      mode: detailLevel
    };

    console.log('📊 RAG Quality Metrics:', ragQuality);

    // ✅ PHASE 1: Enhanced context already built in maintenanceContext variable above
    const ragContext = maintenanceContext || 'No specific knowledge found. Use general BS 7671 Chapter 64 principles.';

    // Construct user message with context
    const userMessage = `Equipment: ${equipmentType || 'Not specified'}
Installation Age: ${ageYears || installationAge || 'Not specified'}
Location: ${location || 'Not specified'}
Building Type: ${buildingType || 'Not specified'}
Environment: ${environment || 'indoor'}
Criticality: ${criticality || 'standard'}
Detail Level: ${detailLevel || 'quick'}

Query: ${actualQuery}

KNOWLEDGE BASE CONTEXT:
${ragContext}

Provide comprehensive maintenance instructions following the tool schema structure. Be specific with test values, procedures, and BS 7671 references.`;

    // Call AI with tool calling
    console.log('🤖 Calling AI with maintenance tool schema...');

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',  // Upgraded for better structured output
        messages: [
          { role: 'system', content: MAINTENANCE_SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        tools: [{ type: 'function', function: MAINTENANCE_TOOL_SCHEMA }],
        tool_choice: { type: 'function', function: { name: 'provide_maintenance_guidance' } }
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`AI request failed: ${aiResponse.status} - ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log('✅ AI response received');

    // Extract tool call result
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      console.error('❌ No tool call in AI response. Full response:', JSON.stringify(aiData, null, 2));
      throw new Error('No tool call in AI response');
    }

    console.log('🔍 Tool call arguments preview:', toolCall.function.arguments.substring(0, 500));
    
    let maintenanceGuidance;
    try {
      maintenanceGuidance = JSON.parse(toolCall.function.arguments);
      console.log('✅ Parsed tool arguments successfully');
      console.log('📊 Guidance structure:', {
        hasResponse: !!maintenanceGuidance.response,
        hasEquipmentSummary: !!maintenanceGuidance.equipmentSummary,
        preWorkCount: maintenanceGuidance.preWorkRequirements?.length || 0,
        visualInspectionCount: maintenanceGuidance.visualInspection?.length || 0,
        testingCount: maintenanceGuidance.testingProcedures?.length || 0,
        scheduleCount: maintenanceGuidance.maintenanceSchedule?.length || 0,
      });
    } catch (parseError) {
      console.error('❌ Failed to parse tool arguments:', parseError);
      console.error('Raw arguments:', toolCall.function.arguments);
      throw new Error('Failed to parse AI tool response');
    }

    // ✅ PHASE 1: Validate response structure before returning
    if (!maintenanceGuidance || typeof maintenanceGuidance !== 'object') {
      console.error('❌ Invalid AI response structure:', maintenanceGuidance);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'AI returned invalid response structure',
          code: 'INVALID_AI_RESPONSE'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // ✅ PHASE 1: Ensure required properties exist
    if (!maintenanceGuidance.preWorkRequirements) {
      maintenanceGuidance.preWorkRequirements = [];
    }
    if (!maintenanceGuidance.visualInspection) {
      maintenanceGuidance.visualInspection = [];
    }
    if (!maintenanceGuidance.testingProcedures) {
      maintenanceGuidance.testingProcedures = [];
    }
    if (!maintenanceGuidance.maintenanceSchedule) {
      maintenanceGuidance.maintenanceSchedule = [];
    }
    if (!maintenanceGuidance.qualityRequirements) {
      maintenanceGuidance.qualityRequirements = [];
    }
    if (!maintenanceGuidance.bs7671References) {
      maintenanceGuidance.bs7671References = [];
    }

    // Check if response is partial
    const missingSections = [];
    if (maintenanceGuidance.preWorkRequirements.length === 0) missingSections.push('preWorkRequirements');
    if (maintenanceGuidance.visualInspection.length === 0) missingSections.push('visualInspection');
    if (maintenanceGuidance.testingProcedures.length === 0) missingSections.push('testingProcedures');
    
    if (missingSections.length > 0) {
      maintenanceGuidance.partial = true;
      maintenanceGuidance.missingSections = missingSections;
      console.warn(`⚠️ Partial response detected, missing: ${missingSections.join(', ')}`);
    }

    // ============= SUMMARY CALCULATION HELPERS =============
    
    // Convert interval string to annual frequency multiplier
    const parseFrequency = (interval: string): number => {
      if (/month/i.test(interval)) {
        const months = parseInt(interval.match(/\d+/)?.[0] || '12');
        return 12 / months;
      }
      if (/year/i.test(interval)) {
        const years = parseInt(interval.match(/\d+/)?.[0] || '1');
        return 1 / years;
      }
      if (/week/i.test(interval)) {
        const weeks = parseInt(interval.match(/\d+/)?.[0] || '1');
        return 52 / weeks;
      }
      return 1; // Default: annual
    };

    // Calculate compliance status based on risk and age
    const calculateComplianceStatus = (riskLevel: string, ageYears: number): string => {
      if (riskLevel === 'critical' || ageYears > 15) return 'non-compliant';
      if (riskLevel === 'high' || ageYears > 10) return 'attention-needed';
      return 'compliant';
    };

    // Calculate annual cost from maintenance schedule
    const calculateAnnualCost = (schedule: any[]): { min: number; max: number } => {
      let minTotal = 0, maxTotal = 0;
      
      for (const task of schedule) {
        if (task.estimatedCost) {
          const frequency = parseFrequency(task.interval || 'annual');
          minTotal += (task.estimatedCost.min || 0) * frequency;
          maxTotal += (task.estimatedCost.max || 0) * frequency;
        }
      }
      
      return { min: Math.round(minTotal), max: Math.round(maxTotal) };
    };

    // Calculate total annual hours
    const calculateAnnualHours = (schedule: any[]): number => {
      let totalMinutes = 0;
      
      for (const task of schedule) {
        if (task.estimatedDurationMinutes) {
          const frequency = parseFrequency(task.interval || 'annual');
          totalMinutes += task.estimatedDurationMinutes * frequency;
        }
      }
      
      return Math.round(totalMinutes / 60 * 10) / 10; // Round to 1 decimal
    };

    // Calculate next EICR due date
    const calculateNextEICR = (buildingType: string, ageYears: number): string => {
      const now = new Date();
      let yearsUntilEICR = 10; // Default
      
      if (buildingType === 'domestic') {
        yearsUntilEICR = 10;
      } else if (buildingType === 'commercial') {
        yearsUntilEICR = 5;
      } else if (buildingType === 'industrial') {
        yearsUntilEICR = 3;
      }
      
      // If equipment is old, suggest sooner EICR
      if (ageYears > 10) yearsUntilEICR = Math.min(yearsUntilEICR, 3);
      
      const dueDate = new Date(now);
      dueDate.setFullYear(now.getFullYear() + yearsUntilEICR);
      
      return dueDate.toLocaleDateString('en-GB');
    };

    // Calculate all summary metrics
    let calculatedSchedule = maintenanceGuidance.maintenanceSchedule || [];
    
    // ✅ Add fallback tasks if schedule is empty
    if (calculatedSchedule.length === 0) {
      console.warn('⚠️ AI returned empty schedule. Adding fallback tasks.');
      calculatedSchedule.push({
        taskName: 'Visual Inspection',
        description: 'Perform thorough visual inspection of equipment condition, connections, and enclosure integrity',
        frequency: 'quarterly',
        estimatedDuration: 0.5,
        priority: 'high',
        requiredTools: ['Torch', 'Visual inspection checklist'],
        safetyRequirements: 'Ensure equipment is de-energized and locked out',
        acceptanceCriteria: 'No visible damage, corrosion, or loose connections',
        bs7671Reference: 'BS 7671:2018+A3:2024 Reg 641.1'
      });
      calculatedSchedule.push({
        taskName: 'Periodic Testing',
        description: 'Conduct electrical safety testing including insulation resistance and earth continuity',
        frequency: 'annually',
        estimatedDuration: 1.0,
        priority: 'high',
        requiredTools: ['Insulation resistance tester', 'Earth continuity tester', 'Multimeter'],
        safetyRequirements: 'Follow safe isolation procedures, use appropriate PPE',
        acceptanceCriteria: 'Test results within acceptable limits per BS 7671',
        bs7671Reference: 'BS 7671:2018+A3:2024 Chapter 64'
      });
    }
    
    const riskLevel = maintenanceGuidance.equipmentSummary?.overallRiskLevel || 'medium';
    const riskScoreValue = riskLevel === 'critical' ? 90 : 
                           riskLevel === 'high' ? 70 :
                           riskLevel === 'medium' ? 40 : 20;

    const totalExecutionTime = Date.now() - startTime;
    console.log(`✅ Total execution time: ${totalExecutionTime}ms (${(totalExecutionTime / 1000).toFixed(2)}s)`);
    console.log(`📋 Final schedule: ${calculatedSchedule.length} tasks`);
    console.log(`📋 Raw AI schedule:`, JSON.stringify(calculatedSchedule.slice(0, 2), null, 2));

    // Sanitize maintenance schedule data
    const sanitizeSchedule = (tasks: any[]) => {
      return tasks.map(task => {
        // Clean procedure array - remove malformed entries
        let cleanProcedure = task.procedure || [];
        if (Array.isArray(cleanProcedure)) {
          cleanProcedure = cleanProcedure.filter((step: string) => {
            // Remove entries that look like field names or are empty
            const isFieldName = /^(safetyPrecautions|toolsRequired|procedure)[\s\[\{:]/.test(step);
            const isEmpty = !step || step.trim().length === 0;
            return !isFieldName && !isEmpty;
          });
        }
        
        // Clean safety precautions array
        let cleanSafety = task.safetyPrecautions || task.safetyRequirements || [];
        if (Array.isArray(cleanSafety)) {
          cleanSafety = cleanSafety.filter((item: string) => {
            const isFieldName = /^(safetyPrecautions|toolsRequired|procedure)[\s\[\{:]/.test(item);
            const isEmpty = !item || item.trim().length === 0;
            return !isFieldName && !isEmpty;
          });
        }
        
        // If safety precautions are empty, add default
        if (cleanSafety.length === 0) {
          cleanSafety = ['Ensure safe isolation before starting work', 'Wear appropriate PPE', 'Follow permit to work procedures'];
        }
        
        // If procedure is empty, add placeholder
        if (cleanProcedure.length === 0) {
          cleanProcedure = ['Follow BS 7671 Chapter 64 inspection and testing procedures'];
        }
        
        return {
          ...task,
          procedure: cleanProcedure,
          safetyPrecautions: cleanSafety
        };
      });
    };

    // Sanitize the schedule
    calculatedSchedule = sanitizeSchedule(calculatedSchedule);
    console.log(`📋 Cleaned schedule:`, JSON.stringify(calculatedSchedule.slice(0, 2), null, 2));

    // Transform schedule to match frontend interface
    const transformedSchedule = calculatedSchedule.map(task => ({
      interval: task.frequency || task.interval,
      task: task.taskName || task.description || task.task,
      regulation: task.bs7671Reference || task.regulation || 'Industry standard',
      priority: task.priority,
      estimatedDurationMinutes: task.estimatedDuration 
        ? (typeof task.estimatedDuration === 'number' 
            ? Math.round(task.estimatedDuration * 60) 
            : parseInt(task.estimatedDuration) || 0)
        : task.estimatedDurationMinutes,
      estimatedCost: task.estimatedCost,
      requiredQualifications: task.requiredQualifications,
      toolsRequired: task.requiredTools || task.toolsRequired,
      procedure: task.procedure,
      safetyPrecautions: task.safetyRequirements || task.safetyPrecautions,
      taskCategory: task.taskCategory,
      nextDue: task.nextDue
    }));

    console.log(`📋 Transformed schedule:`, JSON.stringify(transformedSchedule.slice(0, 2), null, 2));

    return new Response(
      JSON.stringify({
        success: true,
        result: maintenanceGuidance,
        response: maintenanceGuidance.response,
        schedule: {
          equipmentType: maintenanceGuidance.equipmentSummary?.equipmentType || equipmentType,
          location: maintenanceGuidance.equipmentSummary?.location || location,
          ageYears: ageYears,
          buildingType: buildingType,
          schedule: transformedSchedule,
          recommendations: maintenanceGuidance.recommendations || [],
          regulations: maintenanceGuidance.bs7671References || [],
          
          // Summary metrics
          riskScore: riskScoreValue,
          riskLevel: riskLevel,
          complianceStatus: calculateComplianceStatus(riskLevel, ageYears || 0),
          annualCostEstimate: calculateAnnualCost(calculatedSchedule),
          totalEstimatedHours: calculateAnnualHours(calculatedSchedule),
          nextEICRDue: calculateNextEICR(buildingType || 'domestic', ageYears || 0),
          
          partial: maintenanceGuidance.partial || false,
          missingSections: maintenanceGuidance.missingSections || []
        },
        metadata: {
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          ragResultsCount: maintenanceData?.length || 0,
          bs7671Count: bs7671Data?.length || 0,
          intelligenceStatus: bs7671Data ? 'OK' : 'FAILED',
          equipmentType,
          maintenanceType
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Maintenance-v3 error:', error);
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
