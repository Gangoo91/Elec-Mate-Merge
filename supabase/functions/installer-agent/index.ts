import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { 
  CABLE_SUPPORT_INTERVALS, 
  SAFE_ZONES, 
  FIRE_RATED_SUPPORT,
  TERMINATION_GUIDANCE
} from '../shared/bs7671InstallationMethods.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context, jobScale = 'commercial' } = await req.json();
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    // RAG - Get installation knowledge from database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const userMessage = messages[messages.length - 1]?.content || '';
    const ragQuery = `${userMessage} cable installation methods safe zones support intervals termination practical guidance`;
    
    console.log(`🔍 RAG: Searching installation + design knowledge for: ${ragQuery}`);
    
    // Generate embedding for installation knowledge search
    const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: ragQuery,
      }),
    });

    let installationKnowledge = '';
    let designKnowledge = '';
    
    if (embeddingResponse.ok) {
      const embeddingDataRes = await embeddingResponse.json();
      const embedding = embeddingDataRes.data[0].embedding;
      
      // Search installation knowledge
      const { data: knowledge, error: ragError } = await supabase.rpc('search_installation_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 8
      });

      if (!ragError && knowledge && knowledge.length > 0) {
        installationKnowledge = knowledge.map((k: any) => 
          `${k.topic} (${k.source}): ${k.content}`
        ).join('\n\n');
        console.log(`✅ Found ${knowledge.length} installation guides`);
      }
      
      // Search design knowledge for installation-relevant content
      const { data: designDocs, error: designError } = await supabase.rpc('search_design_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 5
      });

      if (!designError && designDocs && designDocs.length > 0) {
        designKnowledge = designDocs.map((d: any) => 
          `${d.topic} (${d.source}): ${d.content}`
        ).join('\n\n');
        console.log(`✅ Found ${designDocs.length} design documents`);
      }
    }

    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasDesigner = previousAgents.includes('designer');
    
    const getScaleSpecificInstallerPrompt = (scale: 'domestic' | 'commercial' | 'industrial') => {
      const basePrompt = `You are an installation supervisor breaking down work into LOGICAL PHASES.

THINK IN MAJOR WORK STAGES, NOT MICRO-STEPS.

❌ BAD (too granular):
1. Pick up cable drum
2. Measure first cable run
3. Cut cable to length
4. Strip 10mm from cable end
5. Insert cable into MCB terminal
6. Tighten terminal screw

✅ GOOD (logical phases):
1. PREPARATION & SETUP (15 mins)
   - Confirm isolation and lock-off
   - Set up access equipment
   - Prepare tools and materials
   
2. CABLE ROUTING (45 mins)
   - Route cable from DB to first outlet via [route description]
   - Fix at intervals per BS 7671 Table 4A2 (300mm horizontal)
   - Maintain safe zones 150mm from corners
   
3. TERMINATIONS (30 mins)
   - Consumer unit terminations with [torque settings]
   - Outlet terminations following manufacturer specs
   - Label circuits clearly

4. INSPECTION & TESTING (30 mins)
   - Visual inspection per GN3 Section 10
   - Continuity and IR testing
   - Complete EIC Schedule of Test Results

EACH PHASE MUST:
- Represent a complete, logical chunk of work
- Include the "why" not just "what"
- Reference relevant BS 7671 regulations
- Note critical safety/quality checkpoints
- List required tools/materials for that phase

AVOID:
❌ Individual screw-tightening steps
❌ Picking up individual tools
❌ Walking between locations
❌ Opening packaging

INCLUDE:
✅ Major work stages with clear boundaries
✅ Critical decision points
✅ Quality checkpoints
✅ Safety-critical procedures
✅ Regulation compliance steps

${CABLE_SUPPORT_INTERVALS.map(s => `${s.cableType} ${s.orientation}: clips every ${s.maxSpacing}mm (Reg 522.8.5)`).join('\n')}

SAFE ZONES (Reg 522.6.202):
${SAFE_ZONES.map(z => `${z.zoneType}: ${z.description}`).join('\n')}

TERMINATIONS (Section 526):
${TERMINATION_GUIDANCE.slice(0, 2).map(t => `${t.conductorType}: Torque ${t.torqueSettings}, strip ${t.stripLength}`).join('\n')}

${installationKnowledge ? `
INSTALLATION KNOWLEDGE (from database):
${installationKnowledge}
` : ''}

${designKnowledge ? `
DESIGN GUIDANCE (relevant to installation):
${designKnowledge}
` : ''}`;

      if (scale === 'domestic') {
        return basePrompt + `

🏠 DOMESTIC SCALE - GRANULARITY GUIDANCE:

**TARGET: 4-6 MAJOR PHASES** for typical single circuit job

TYPICAL STRUCTURE:
1. PREPARATION (10-15 mins) - Isolation, customer brief, area protection
2. FIRST FIX (30-60 mins) - Cable routing, fixing, containment
3. TERMINATIONS (20-30 mins) - CU connections, accessories
4. TESTING & HANDOVER (20-30 mins) - Testing, customer demonstration

**DOMESTIC-SPECIFIC STEPS TO INCLUDE:**
- Customer communication (explain isolation, duration, noise)
- Property protection (dustsheets, floor coverings)
- Minimising disruption (tidy as you go, vacuum dust)
- Customer handover (demonstrate operation, provide cert)

**PHASE DURATION:** 10-60 mins per phase
**TOTAL JOB TIME:** 2-4 hours typical for single circuit

EXAMPLE PHASES:
✓ "CUSTOMER BRIEFING & ISOLATION (15 mins)"
✓ "CABLE ROUTING & FIXING (45 mins)"
✓ "TERMINATIONS & LABELLING (30 mins)"
✓ "TESTING & CUSTOMER DEMONSTRATION (30 mins)"`;
      }

      if (scale === 'commercial') {
        return basePrompt + `

🏢 COMMERCIAL SCALE - GRANULARITY GUIDANCE:

**TARGET: 6-10 MAJOR PHASES** for typical commercial project

TYPICAL STRUCTURE:
1. SITE COORDINATION (30 mins) - Building manager liaison, access, permits
2. PREPARATION & ISOLATION (45 mins) - Multi-circuit isolation, signage
3. FIRST FIX - ZONE 1 (2-3 hours) - Phased installation by area
4. FIRST FIX - ZONE 2 (2-3 hours) - Maintain business continuity
5. TERMINATIONS & LABELLING (1-2 hours) - Systematic, documented
6. TESTING & COMMISSIONING (2-3 hours) - Witnessed tests, handover docs
7. ENERGISATION & MONITORING (1 hour) - Phased re-energisation, checks

**COMMERCIAL-SPECIFIC STEPS TO INCLUDE:**
- Stakeholder coordination (building manager, tenants, security)
- Out-of-hours working (evening/weekend scheduling)
- Business continuity (phased isolation, temporary supplies)
- Fire alarm coordination (testing windows, notification)
- Handover documentation (O&M manuals, as-built drawings)

**PHASE DURATION:** 30 mins - 3 hours per phase
**TOTAL JOB TIME:** 1-3 days typical for multi-circuit installation

EXAMPLE PHASES:
✓ "SITE COORDINATION & PERMIT TO WORK (45 mins)"
✓ "PHASED ISOLATION - NORTH WING (1 hour)"
✓ "CABLE INSTALLATION - FLOOR 1 DISTRIBUTION (3 hours)"
✓ "DB TERMINATIONS & LABELLING (2 hours)"
✓ "TESTING & CERTIFICATION (3 hours)"
✓ "PHASED ENERGISATION & HANDOVER (1.5 hours)"`;
      }

      if (scale === 'industrial') {
        return basePrompt + `

🏭 INDUSTRIAL SCALE - GRANULARITY GUIDANCE:

**TARGET: 8-15 MAJOR PHASES** for typical industrial project

TYPICAL STRUCTURE:
1. PRE-WORK COORDINATION (1 day) - Permits, toolbox talks, shutdown planning
2. ISOLATION & PROVING (2-4 hours) - Multi-source isolation, HV switching
3. CABLE INSTALLATION - MAIN ROUTES (1-2 days) - Tray, ladder, conduit
4. CABLE INSTALLATION - FINAL CIRCUITS (1-2 days) - Equipment connections
5. TERMINATIONS - DISTRIBUTION (1 day) - Switchgear, DBs
6. TERMINATIONS - EQUIPMENT (1 day) - Motors, controls, instrumentation
7. TESTING & INSPECTION (2-3 days) - Phased, witnessed, documented
8. PRE-COMMISSIONING CHECKS (1 day) - Dry runs, interlock checks
9. COMMISSIONING & HANDOVER (1-2 days) - Energisation, load testing, training

**INDUSTRIAL-SPECIFIC STEPS TO INCLUDE:**
- Permit to Work systems (isolation certificates, hot work, confined space)
- Production coordination (planned shutdowns, critical path)
- Multi-trade interface (mechanical, process, instrumentation)
- Environmental controls (ATEX compliance, spillage containment)
- Commissioning procedures (load testing, sequence verification)
- Operator training and handover
- As-built documentation and O&M manuals

**PHASE DURATION:** 2 hours - 2 days per phase
**TOTAL JOB TIME:** 1-4 weeks typical for major installation

EXAMPLE PHASES:
✓ "PRE-WORK COORDINATION & PERMIT TO WORK (1 day)"
✓ "HV ISOLATION & PROVING PROCEDURES (4 hours)"
✓ "CABLE TRAY INSTALLATION - MAIN ROUTES (2 days)"
✓ "MOTOR CIRCUIT INSTALLATION & TERMINATION (1.5 days)"
✓ "CONTROL PANEL INTEGRATION (1 day)"
✓ "TESTING & INSPECTION - POWER CIRCUITS (1.5 days)"
✓ "COMMISSIONING & LOAD TESTING (2 days)"
✓ "OPERATOR TRAINING & HANDOVER (1 day)"`;
      }

      return basePrompt;
    };

    let systemPrompt = getScaleSpecificInstallerPrompt(jobScale);

    if (hasDesigner) {
      systemPrompt += `\n\n📋 The Designer's already done the circuit calculations, so YOU focus on:
- HOW to route the cable (safe zones, support intervals)
- WHAT fixing methods to use (steel clips for fire rating)
- Termination procedure (strip lengths, torque settings)
- Common installation MISTAKES to avoid`;
    }

    systemPrompt += `\n\n💬 Guide them step-by-step like you're walking an apprentice through their first install.`;

    // Use structured tool calling for consistent method statement output
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${lovableApiKey}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt }, 
          ...messages,
          ...(context?.structuredKnowledge ? [{
            role: 'system',
            content: context.structuredKnowledge
          }] : [])
        ],
        tools: [{
          type: "function",
          function: {
            name: "create_method_statement",
            description: "Create detailed installation method statement",
            parameters: {
              type: "object",
              properties: {
                response: { type: "string", description: "Natural language installation guidance" },
                installationSteps: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      stepNumber: { type: "number" },
                      phase: { type: "string", description: "Major work phase name (e.g., PREPARATION & SETUP)" },
                      title: { type: "string" },
                      description: { type: "string", description: "What's done in this phase and why" },
                      safetyRequirements: { type: "array", items: { type: "string" }, description: "Specific safety controls for this phase" },
                      equipmentNeeded: { type: "array", items: { type: "string" }, description: "Tools and materials needed" },
                      qualifications: { type: "array", items: { type: "string" }, description: "Required competencies" },
                      estimatedDuration: { type: "string", description: "e.g., '30-45 mins' or '2 days'" },
                      criticalPoints: { 
                        type: "array", 
                        items: { type: "string" },
                        description: "Key things that could go wrong or must be checked"
                      },
                      regulationReferences: { 
                        type: "array", 
                        items: { type: "string" },
                        description: "BS 7671, HSE, or other regulation references"
                      },
                      riskLevel: { type: "string", enum: ["low", "medium", "high"] }
                    },
                    required: ["stepNumber", "phase", "title", "description", "safetyRequirements", "equipmentNeeded", "criticalPoints", "riskLevel"]
                  }
                },
                supportIntervals: { type: "string" },
                specialRequirements: { type: "array", items: { type: "string" } },
                confidence: { type: "number" }
              },
              required: ["response", "installationSteps", "confidence"],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "create_method_statement" } },
        max_completion_tokens: calculateTokenLimit(extractCircuitCount(userMessage))
      }),
    });

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No tool call from installer agent');
    }

    const structuredData = JSON.parse(toolCall.function.arguments);
    
    return new Response(JSON.stringify({
      response: structuredData.response || 'Installation guidance complete.',
      structuredData: {
        installationSteps: structuredData.installationSteps || [],
        supportIntervals: structuredData.supportIntervals || "",
        specialRequirements: structuredData.specialRequirements || []
      },
      confidence: structuredData.confidence || 0.90
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Installer agent error:', error);
    return new Response(JSON.stringify({ 
      response: 'Unable to provide installation guidance.', 
      confidence: 0.3 
    }), {
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Phase 4: Adaptive Token Limits
function calculateTokenLimit(circuitCount: number): number {
  const baseTokens = 2000;
  const perCircuitTokens = 400;
  return Math.min(baseTokens + (circuitCount * perCircuitTokens), 10000);
}

function extractCircuitCount(message: string): number {
  const wayMatch = message.match(/(\d+)[\s-]?way/i);
  if (wayMatch) return parseInt(wayMatch[1]);
  
  const circuitMatch = message.match(/(\d+)\s+circuits?/i);
  if (circuitMatch) return parseInt(circuitMatch[1]);
  
  return 6;
}
