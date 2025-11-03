import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  let ragStartTime = startTime;
  let aiStartTime = 0;

  try {
    const { query, projectDetails } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🚀 installer-rag-direct started', { query: query.substring(0, 100) });

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // DIRECT RAG CALLS - NO GATING, NO THRESHOLDS
    console.log('📚 Starting direct RAG retrieval...');
    ragStartTime = Date.now();

    const [pwResult, regsResult] = await Promise.all([
      supabase.rpc('search_practical_work_intelligence_hybrid', {
        query_text: query,
        match_count: 95,
        filter_trade: 'installer'
      }),
      supabase.rpc('search_bs7671_intelligence_hybrid', {
        query_text: query,
        match_count: 85
      })
    ]);

    const ragTime = Date.now() - ragStartTime;

    const practicalWork = pwResult.data || [];
    const regulations = regsResult.data || [];

    console.log('✅ RAG retrieved', {
      practicalCount: practicalWork.length,
      regsCount: regulations.length,
      ragMs: ragTime
    });

    // Smart fallback if RAG fails
    let ragContext = '';
    if (practicalWork.length === 0 && regulations.length === 0) {
      console.warn('⚠️ RAG returned no results - using general UK electrical guidance');
      ragContext = `[FALLBACK MODE - General UK Electrical Installation Guidance]
- Follow BS 7671:2018+A2:2022 (18th Edition) requirements throughout
- Select cable sizes using Appendix 4 current-carrying capacity tables
- Install appropriate protective devices (MCBs Type B/C, RCDs 30mA for sockets)
- Ensure proper earthing and bonding per Sections 411 and 544
- Test and certify per GN3 (Inspection & Testing)
- Use safe isolation procedures (lock-off/tag-out)`;
    }

    // Build compact RAG context - take top results, no filtering
    const pwContext = practicalWork
      .slice(0, 12)
      .map((pw: any, idx: number) => {
        const tools = pw.tools_required ? `\nTools: ${pw.tools_required.join(', ')}` : '';
        const regs = pw.bs7671_regulations ? `\nBS 7671: ${pw.bs7671_regulations.join(', ')}` : '';
        return `[PW${idx + 1}] ${pw.primary_topic || 'Installation Guidance'}\n${pw.content}${tools}${regs}`;
      })
      .join('\n\n');

    const regsContext = regulations
      .slice(0, 12)
      .map((reg: any, idx: number) => {
        return `[REG${idx + 1}] ${reg.regulation_number}: ${reg.content}`;
      })
      .join('\n\n');

    // Construct strict JSON schema for OpenAI
    const jsonSchema = {
      type: "object",
      properties: {
        success: { type: "boolean" },
        steps: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              detail: { type: "string" },
              tools: { type: "array", items: { type: "string" } },
              materials: { type: "array", items: { type: "string" } }
            },
            required: [],
            additionalProperties: false
          }
        },
        tips: { type: "array", items: { type: "string" } },
        materials: { type: "array", items: { type: "string" } },
        testingProcedures: { type: "array", items: { type: "string" } },
        equipmentSchedule: {
          type: "array",
          items: {
            type: "object",
            properties: {
              item: { type: "string" },
              spec: { type: "string" },
              qty: { type: "string" }
            },
            required: ["item", "spec"],
            additionalProperties: false
          }
        },
        siteLogistics: {
          type: "object",
          properties: {
            access: { type: "string" },
            isolation: { type: "string" },
            permits: { type: "string" }
          },
          additionalProperties: false
        },
        competencyRequirements: {
          type: "object",
          properties: {
            roles: { type: "array", items: { type: "string" } },
            trainingRequired: { type: "array", items: { type: "string" } }
          },
          required: ["roles"],
          additionalProperties: false
        },
        citations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              source: { type: "string", enum: ["practical", "bs7671"] },
              id: { type: "string" },
              label: { type: "string" }
            },
            required: ["source", "id", "label"],
            additionalProperties: false
          }
        }
      },
      required: ["success", "steps", "competencyRequirements", "citations"],
      additionalProperties: false
    };

    const systemPrompt = `You are an expert UK electrician creating Method Statements for installation work.

**CRITICAL RULES:**
- Use ONLY UK English spelling and terminology
- Be concise and practical - this is for electricians on-site
- Generate at least 6 detailed installation steps
- Include specific tools, materials, and BS 7671 regulation references
- ONLY cite regulations provided in the context - NEVER hallucinate regulation numbers
- Return ONLY valid JSON matching the exact schema provided

**AVAILABLE CONTEXT:**

PRACTICAL WORK INTELLIGENCE:
${pwContext || 'No practical work data available'}

BS 7671 REGULATIONS:
${regsContext || 'No regulations data available'}

**PROJECT DETAILS:**
${projectDetails ? JSON.stringify(projectDetails, null, 2) : 'No project details provided'}

Generate a comprehensive Method Statement in the exact JSON format specified.`;

    const userPrompt = `Create a detailed Method Statement for: ${query}

Include:
- 6+ step-by-step installation procedures
- Required tools and materials for each step
- Testing procedures
- Equipment schedule with specifications
- Site logistics (access, isolation, permits)
- Competency requirements (roles and training needed)
- Citations to the practical work and BS 7671 regulations provided above

Use the RAG context above to ensure accuracy. Return ONLY the JSON object.`;

    console.log('🤖 Calling OpenAI ChatGPT Mini 5.0 with strict JSON schema...');
    aiStartTime = Date.now();
    let lastHeartbeat = aiStartTime;

    let response;
    try {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "method_statement",
              strict: true,
              schema: jsonSchema
            }
          },
          max_completion_tokens: 4000
        }),
      });
    } catch (fetchError) {
      console.error('❌ OpenAI fetch failed:', fetchError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to connect to OpenAI API',
        diagnostics: {
          pwCount: practicalWork.length,
          regsCount: regulations.length,
          ragMs: ragTime,
          fetchError: fetchError instanceof Error ? fetchError.message : String(fetchError)
        }
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const aiTime = Date.now() - aiStartTime;
    console.log('✅ OpenAI response received', { aiMs: aiTime });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI error:', response.status, errorText);
      
      return new Response(
        JSON.stringify({
          success: false,
          error: `OpenAI API error: ${response.status}`,
          diagnostics: {
            pwCount: practicalWork.length,
            regsCount: regulations.length,
            ragMs: ragTime,
            errorPreview: errorText.substring(0, 500)
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await response.json();
    const content = aiData.choices[0].message.content;

    let parsedResult;
    try {
      parsedResult = JSON.parse(content);
    } catch (parseError) {
      console.error('❌ JSON parse failed, attempting repair pass...', parseError);

      // REPAIR PASS - try to fix malformed JSON
      const repairResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          messages: [
            {
              role: 'system',
              content: 'Convert the following text to valid JSON matching the exact schema. Fix any malformed JSON.'
            },
            {
              role: 'user',
              content: content
            }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "method_statement",
              strict: true,
              schema: jsonSchema
            }
          },
          max_completion_tokens: 4000
        }),
      });

      if (repairResponse.ok) {
        const repairData = await repairResponse.json();
        parsedResult = JSON.parse(repairData.choices[0].message.content);
        console.log('✅ Repair pass succeeded');
      } else {
        console.error('❌ Repair pass failed');
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to generate valid structured data',
            diagnostics: {
              pwCount: practicalWork.length,
              regsCount: regulations.length,
              ragMs: ragTime,
              aiMs: aiTime,
              rawPreview: content.substring(0, 1000)
            }
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Normalize output
    const normalizedResult = {
      ...parsedResult,
      success: true,
      steps: parsedResult.steps || [],
      tips: parsedResult.tips || [],
      materials: parsedResult.materials || [],
      testingProcedures: parsedResult.testingProcedures || [],
      equipmentSchedule: parsedResult.equipmentSchedule || [],
      siteLogistics: parsedResult.siteLogistics || { access: '', isolation: '', permits: '' },
      competencyRequirements: {
        roles: parsedResult.competencyRequirements?.roles || [],
        trainingRequired: parsedResult.competencyRequirements?.trainingRequired || []
      },
      citations: parsedResult.citations || []
    };

    const totalTime = Date.now() - startTime;

    console.log('✅ Method Statement generated', {
      totalMs: totalTime,
      ragMs: ragTime,
      aiMs: aiTime,
      stepsCount: normalizedResult.steps.length,
      citationsCount: normalizedResult.citations.length
    });

    // Calculate average scores
    const avgPwScore = practicalWork.length > 0
      ? practicalWork.reduce((sum: number, pw: any) => sum + (pw.hybrid_score || 0), 0) / practicalWork.length
      : 0;
    const avgRegScore = regulations.length > 0
      ? regulations.reduce((sum: number, reg: any) => sum + (reg.hybrid_score || 0), 0) / regulations.length
      : 0;

    return new Response(
      JSON.stringify({
        ...normalizedResult,
        diagnostics: {
          pwCount: practicalWork.length,
          regsCount: regulations.length,
          avgPwScore: avgPwScore.toFixed(2),
          avgRegScore: avgRegScore.toFixed(2),
          ragMs: ragTime,
          aiMs: aiTime,
          totalMs: totalTime
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ installer-rag-direct error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        diagnostics: {
          totalMs: Date.now() - startTime
        }
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
