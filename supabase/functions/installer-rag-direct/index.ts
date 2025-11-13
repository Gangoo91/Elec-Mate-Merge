// AI Installation Specialist - Fixed v2.0
// Aligned with installer-v3 architecture for reliability & speed

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { installerV3ToolSchema } from '../_shared/installer-v3-schema.ts';

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

  try {
    const { 
      query, 
      projectDetails, 
      currentDesign,
      selectedCircuits,
      sharedRegulations 
    } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🚀 v2.0 started:', query.substring(0, 80));
    
    // Extract keywords from query (first 50 words, clean special chars)
    const keywords = query
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3)
      .slice(0, 15)
      .join(' ');
    
    console.log('🔍 Keywords extracted:', keywords.substring(0, 100));

    // Phase 7: Timeout Protection
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Generation timeout after 350s')), 350000);
    });

    const executionPromise = (async () => {
      // Connect to Supabase
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const ragStartTime = Date.now();

      // Phase 1: Direct SQL RAG (Fast & Reliable)
      
      // RAG 1: Practical Work Intelligence - Direct SQL Query
      const { data: pwData, error: pwError } = await supabase
        .from('practical_work_intelligence')
        .select('primary_topic, installation_method, tools_required, materials_needed, bs7671_regulations, confidence_score')
        .or(`primary_topic.ilike.%${keywords}%,installation_method.ilike.%${keywords}%,equipment_category.ilike.%${keywords}%`)
        .order('confidence_score', { ascending: false })
        .limit(25);

      const practicalDocs = pwData?.filter((d: any) => d.primary_topic) || [];
      if (pwError || practicalDocs.length === 0) {
        console.warn('⚠️ Limited practical work data:', pwError?.message || 'No results');
      }

      // RAG 2: Regulations Intelligence - Direct SQL Query
      let regulationsDocs = [];

      if (sharedRegulations && sharedRegulations.length > 0) {
        console.log('📚 Reusing shared regulations from designer:', sharedRegulations.length);
        regulationsDocs = sharedRegulations.map((reg: any) => ({
          regulation_text: reg.primary_topic || reg.regulation_text || '',
          regulation_number: reg.regulation_number || reg.number,
          primary_topic: reg.primary_topic || '',
          keywords: reg.keywords || []
        }));
      } else {
        const { data: regData, error: regError } = await supabase
          .from('regulations_intelligence')
          .select('regulation_number, primary_topic, keywords')
          .or(`primary_topic.ilike.%${keywords}%,keywords.cs.{installation,cable,protection}`)
          .order('regulation_number', { ascending: true })
          .limit(15);

        regulationsDocs = regData || [];
        if (regError || regulationsDocs.length === 0) {
          console.warn('⚠️ Limited regulations data:', regError?.message || 'No results');
        }
      }

      const ragTime = Date.now() - ragStartTime;
      console.log(`⚡ RAG: ${practicalDocs.length} procedures, ${regulationsDocs.length} regs (${ragTime}ms)`);

      // Build AI context (simplified from installer-v3)
      const installContext = [
        ...practicalDocs.map((doc: any, i: number) => 
          `[Procedure ${i + 1}] ${doc.primary_topic}\n${doc.installation_method || ''}\nTools: ${doc.tools_required?.join(', ') || 'N/A'}\nMaterials: ${doc.materials_needed?.join(', ') || 'N/A'}`
        ),
        ...regulationsDocs.map((doc: any, i: number) => 
          `[Regulation ${i + 1}] ${doc.regulation_number}: ${doc.primary_topic}`
        )
      ].join('\n\n');

      const installKnowledge = [...practicalDocs, ...regulationsDocs];

      // Build circuit context if available
      const circuitContext = selectedCircuits?.length > 0 
        ? `\n**CIRCUITS**: ${selectedCircuits.map((c: any) => `${c.circuitType} (${c.cable?.size || 'TBD'})`).join(', ')}`
        : currentDesign ? `\n**DESIGN**: ${currentDesign.cable?.size || 'TBD'}, ${currentDesign.protection?.rating || 'TBD'}` : '';

      // Phase 5: Simplified System Prompt (150 lines from 400+)
      const systemPrompt = `You are a UK electrical installation specialist creating BS 7671:2018+A3:2024 compliant method statements.

**CORE RULES**:
1. UK English ONLY (metres, earthing, consumer unit, colours, authorised, realise)
2. Extract tools & materials from knowledge base - DON'T GUESS
3. Each step: 100-200 words, numbered sub-tasks, measurements, regulatory refs
4. Safety-critical steps MUST have minimum 3 specific tools
5. Testing: provide 3 essential tests (continuity, insulation, Zs)
6. Competency: specify qualifications (18th Edition, 2391)

**KNOWLEDGE BASE (${installKnowledge.length} procedures)**:
${installContext}

${circuitContext}

**EXTRACTION RULES**:
- ALWAYS extract tools from knowledge base tool lists
- Safety steps MUST include: Voltage indicator (GS38), Proving unit, Lock-off kit
- Testing steps MUST include: Insulation resistance tester, Multimeter
- Materials: Extract from knowledge base with quantities (e.g., "10mm² T&E cable", "32A MCB")
- Regulations: ONLY cite regulations from knowledge base - NO hallucination

**GENERATE**:
- 5-8 installation steps with detailed descriptions
- Each step: specific tools, materials, safety notes, linked hazards
- 3 essential testing procedures (BS 7671 compliant)
- Competency requirements
- Regulatory citations linked to specific steps

Extract from knowledge base data provided above. Be practical and field-ready.`;

      const aiStartTime = Date.now();

      // Phase 2: Tool-Based Schema (from installer-v3-schema.ts)
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query }
          ],
          tools: [installerV3ToolSchema],
          tool_choice: { type: 'function', function: { name: 'provide_installation_guidance' } },
          max_completion_tokens: 16000,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ OpenAI error:', response.status, errorText);
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const aiData = await response.json();
      const aiTime = Date.now() - aiStartTime;

      // Phase 3: Fix Field Mapping
      const toolCall = aiData.choices[0].message.tool_calls?.[0];
      if (!toolCall) {
        throw new Error('No tool call returned from AI');
      }

      const installResult = JSON.parse(toolCall.function.arguments);

      // Correctly map installationSteps (not 'steps')
      const steps = installResult.installationSteps || [];
      console.log(`🤖 AI generation: ${steps.length} steps (${aiTime}ms)`);

      // Phase 4: Calculate Quality Metrics (simplified)
      const toolsExtracted = steps.reduce((sum: number, s: any) => sum + (s.tools?.length || 0), 0);
      const materialsExtracted = steps.reduce((sum: number, s: any) => sum + (s.materials?.length || 0), 0);
      const regulationsReferenced = installResult.regulatoryCitations?.length || 0;

      const overallScore = Math.min(100, Math.round(
        (installKnowledge.length / 40 * 40) + (toolsExtracted / (steps.length * 3) * 30) + (regulationsReferenced / 5 * 30)
      ));

      console.log(`📊 Quality: ${overallScore}%, Tools: ${toolsExtracted}, Materials: ${materialsExtracted}, Regs: ${regulationsReferenced}`);

      // Build response with correct field names
      const responseData = {
        success: true,
        data: {
          steps: steps.map((s: any, i: number) => ({
            id: `step-${i + 1}`,
            stepNumber: s.step || (i + 1),
            title: s.title || `Step ${i + 1}`,
            description: s.description || '',
            safetyRequirements: s.safetyNotes || [],
            equipmentNeeded: s.tools || [], // ✅ Map 'tools' to 'equipmentNeeded'
            materialsNeeded: s.materials || [], // ✅ Map 'materials' to 'materialsNeeded'
            qualifications: s.qualifications || [],
            linkedHazards: s.linkedHazards || [],
            estimatedDuration: s.estimatedTime ? `${s.estimatedTime} min` : 'TBD',
            riskLevel: (s.linkedHazards?.length || 0) > 3 ? 'high' : 
                       (s.linkedHazards?.length || 0) > 1 ? 'medium' : 'low',
            isCompleted: false
          })),
          toolsRequired: [...new Set(steps.flatMap((s: any) => s.tools || []))],
          materialsRequired: [...new Set(steps.flatMap((s: any) => s.materials || []))],
          practicalTips: installResult.practicalTips || [],
          commonMistakes: installResult.commonMistakes || [],
          testingProcedures: installResult.testingProcedures || [],
          competencyRequirements: installResult.competencyRequirements || {
            minimumQualifications: ['18th Edition BS 7671', '2391 Inspection & Testing']
          },
          siteLogistics: installResult.siteLogistics || null,
          regulatoryCitations: installResult.regulatoryCitations || []
        },
        metadata: {
          generationTimeMs: Date.now() - startTime,
          stepCount: steps.length,
          totalEstimatedTime: `${steps.reduce((sum: number, s: any) => sum + (s.estimatedTime || 30), 0)} min`,
          difficultyLevel: steps.length > 8 ? 'Complex' : steps.length > 5 ? 'Moderate' : 'Standard',
          ragTimeMs: ragTime,
          aiTimeMs: aiTime
        },
        qualityMetrics: {
          overallScore,
          ragDataUsed: {
            regulations: regulationsDocs.length,
            practicalProcedures: practicalDocs.length,
            totalDocs: installKnowledge.length
          },
          extractionBreakdown: {
            toolsExtracted,
            materialsExtracted,
            regulationsReferenced
          }
        }
      };

      console.log(`✅ Completed in ${Date.now() - startTime}ms`);
      return responseData;
    })();

    // Race between execution and timeout
    const result = await Promise.race([executionPromise, timeoutPromise]);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ installer-rag-direct error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error',
        metadata: {
          generationTimeMs: Date.now() - startTime
        }
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
