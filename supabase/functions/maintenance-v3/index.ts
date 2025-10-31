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
        description: "BS 7671 regulations referenced in this document",
        items: {
          type: "object",
          properties: {
            regulation: { type: "string", description: "Regulation number" },
            title: { type: "string", description: "Regulation title/topic" },
            relevance: { type: "string", description: "Why it's relevant to this maintenance task" },
            category: { type: "string", description: "Regulation category (from intelligence data)" },
            practicalApplication: { type: "string", description: "Practical application guidance" }
          },
          required: ["regulation", "title", "relevance"]
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

    // Generate embedding for query
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

    if (!embeddingResponse.ok) {
      throw new Error(`Embedding generation failed: ${embeddingResponse.statusText}`);
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Parallel RAG: Maintenance Knowledge + BS 7671 Intelligence
    const [ragResults, bs7671Intelligence] = await Promise.all([
      supabase.rpc('search_maintenance_hybrid', {
        query_text: expandedQuery,
        query_embedding: queryEmbedding,
        equipment_filter: equipmentType || null,
        match_count: 12
      }),
      // ✅ PHASE 1: Add timeout protection for intelligence search
      Promise.race([
        supabase.rpc('search_bs7671_intelligence_hybrid', {
          query_text: `${expandedQuery} testing inspection certification`,
          match_count: 12
        }),
        new Promise((resolve) => 
          setTimeout(() => resolve({ data: null, error: { message: 'Intelligence search timeout (8s)' } }), 8000)
        )
      ]).catch((err) => {
        console.error('⚠️ Intelligence search failed, falling back to maintenance KB only:', err);
        return { data: null, error: err };
      })
    ]);

    const { data: maintenanceData, error: ragError } = ragResults;
    const { data: bs7671Data, error: bs7671Error } = bs7671Intelligence;

    if (ragError) console.error('❌ Maintenance RAG error:', ragError);
    if (bs7671Error) console.error('❌ BS 7671 Intelligence error:', bs7671Error);

    // ✅ PHASE 1: Enhanced logging with intelligence status
    console.log(`📚 Retrieved ${maintenanceData?.length || 0} maintenance docs, ${bs7671Data?.length || 0} BS 7671 regs (intelligence ${bs7671Data ? 'OK' : 'FAILED'})`);

    // Build enriched context from both sources
    const maintenanceContext = maintenanceData?.map((doc: any, idx: number) => 
      `[MAINTENANCE DOC ${idx + 1}]\nTopic: ${doc.topic}\nSource: ${doc.source}\nContent: ${doc.content}\n`
    ).join('\n\n') || '';

    const bs7671Context = bs7671Data?.map((reg: any, idx: number) => 
      `[BS 7671 REG ${idx + 1}] ${reg.regulation_number}\nTopic: ${reg.primary_topic || 'N/A'}\nCategory: ${reg.category || 'N/A'}\nKeywords: ${reg.keywords?.join(', ') || 'N/A'}\nApplication: ${reg.practical_application || 'N/A'}\nContent: ${reg.content}\n`
    ).join('\n\n') || '';

    // ✅ PHASE 1: Enhanced fallback message when intelligence search fails
    const ragContext = maintenanceContext || bs7671Context
      ? `=== MAINTENANCE KNOWLEDGE ===\n${maintenanceContext}\n\n=== BS 7671 REGULATIONS ${bs7671Data ? '(INTELLIGENCE)' : '(FALLBACK: Use Chapter 64 principles)'} ===\n${bs7671Context || 'Intelligence search unavailable. Apply BS 7671 Chapter 64 inspection and testing requirements.'}`
      : 'No specific knowledge found. Use general BS 7671 Chapter 64 principles.';

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
        model: 'gpt-5-mini-2025-08-07',
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
      throw new Error('No tool call in AI response');
    }

    const maintenanceGuidance = JSON.parse(toolCall.function.arguments);

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
          schedule: maintenanceGuidance.maintenanceSchedule || [],
          recommendations: maintenanceGuidance.recommendations || [],
          regulations: maintenanceGuidance.bs7671References || [],
          riskScore: maintenanceGuidance.equipmentSummary?.overallRiskLevel === 'critical' ? 90 : 
                     maintenanceGuidance.equipmentSummary?.overallRiskLevel === 'high' ? 70 :
                     maintenanceGuidance.equipmentSummary?.overallRiskLevel === 'medium' ? 40 : 20,
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
