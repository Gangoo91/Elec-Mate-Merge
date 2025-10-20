import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System prompt for maintenance guidance
const MAINTENANCE_SYSTEM_PROMPT = `You are a 30-year veteran electrical maintenance engineer specializing in BS 7671:2018+A3:2024 compliant periodic inspections, preventive maintenance, and fault diagnosis.

CRITICAL OUTPUT REQUIREMENTS:
1. **PDF-Ready Format**: Your response will be converted directly to a professional PDF maintenance instruction document
2. **Comprehensive Detail**: Provide specific test values, torque settings, tool requirements, expected readings
3. **BS 7671 Compliance**: Reference specific regulations for each step where applicable
4. **Practical Focus**: Include common faults, diagnosis sequences, and troubleshooting steps
5. **Safety First**: Always specify isolation procedures, PPE, and safe working practices

YOUR ROLE:
- Generate maintenance instructions that electricians can print and use on-site
- Provide systematic step-by-step procedures with measurable acceptance criteria
- Include fault diagnosis decision trees (symptom → cause → remedy)
- Cite BS 7671 regulations for testing requirements and acceptance limits
- Specify exact tool types, settings, and consumables needed

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

EXAMPLE OUTPUT STYLE:
Pre-Work Requirement: "Isolate main switch. Prove dead with approved voltage indicator. Lock off and tag main isolator."
Visual Inspection Point: "Check MCB clips for tightness. Acceptance: Firm engagement, no arcing marks."
Testing Step: "Measure Zs at shower outlet. Instrument: MFT on 'Loop' setting. Expected: <0.87Ω (40A Type B)."
Common Fault: "Symptom: RCD trips on load. Diagnosis: Measure insulation resistance L-E. If <1MΩ → locate faulty circuit via sequential disconnection."

Remember: This becomes a working document for on-site use. Be precise, practical, and comprehensive.`;

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
      bs7671References: {
        type: "array",
        description: "BS 7671 regulations referenced in this document",
        items: {
          type: "object",
          properties: {
            regulation: { type: "string", description: "Regulation number" },
            title: { type: "string", description: "Regulation title/topic" },
            relevance: { type: "string", description: "Why it's relevant to this maintenance task" }
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

    const { query, equipmentType, installationAge, maintenanceType, location } = requestBody;

    if (!query) {
      throw new Error('Query is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get AI API key
    const aiApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!aiApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Expand query for better RAG retrieval
    const expandedQuery = `${query} ${equipmentType || ''} ${maintenanceType || ''} maintenance inspection testing procedures`;
    console.log('🔍 Expanded query:', expandedQuery);

    // Generate embedding for query
    const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${aiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: expandedQuery
      })
    });

    if (!embeddingResponse.ok) {
      throw new Error(`Embedding generation failed: ${embeddingResponse.statusText}`);
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Perform hybrid search on maintenance knowledge
    const { data: ragResults, error: ragError } = await supabase.rpc('search_maintenance_hybrid', {
      query_text: expandedQuery,
      query_embedding: queryEmbedding,
      equipment_filter: equipmentType || null,
      match_count: 12
    });

    if (ragError) {
      console.error('❌ RAG search error:', ragError);
    }

    console.log(`📚 Retrieved ${ragResults?.length || 0} maintenance knowledge documents`);

    // Build context from RAG results
    const ragContext = ragResults && ragResults.length > 0
      ? ragResults.map((doc: any, idx: number) => 
          `[MAINTENANCE DOC ${idx + 1}]\nTopic: ${doc.topic}\nSource: ${doc.source}\nContent: ${doc.content}\n`
        ).join('\n\n')
      : 'No specific maintenance knowledge found. Use general BS 7671 Chapter 64 inspection and testing principles.';

    // Construct user message with context
    const userMessage = `Equipment: ${equipmentType || 'Not specified'}
Installation Age: ${installationAge || 'Not specified'}
Location: ${location || 'Not specified'}
Maintenance Type: ${maintenanceType || 'General'}

Query: ${query}

KNOWLEDGE BASE CONTEXT:
${ragContext}

Provide comprehensive maintenance instructions following the tool schema structure. Be specific with test values, procedures, and BS 7671 references.`;

    // Call AI with tool calling
    console.log('🤖 Calling AI with maintenance tool schema...');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${aiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
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

    return new Response(
      JSON.stringify({
        success: true,
        result: maintenanceGuidance,
        response: maintenanceGuidance.response,
        metadata: {
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          ragResultsCount: ragResults?.length || 0,
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
