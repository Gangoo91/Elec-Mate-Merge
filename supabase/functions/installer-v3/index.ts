import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  corsHeaders,
  createLogger,
  generateRequestId,
  handleError,
  ValidationError,
  createClient,
  generateEmbeddingWithRetry,
  callLovableAIWithTimeout,
  parseJsonWithRepair
} from '../_shared/v3-core.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.method === 'GET') {
    const requestId = generateRequestId();
    return new Response(
      JSON.stringify({ status: 'healthy', function: 'installer-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'installer-v3' });

  try {
    const body = await req.json();
    const { query, cableType, installationMethod, location, messages, previousAgentOutputs } = body;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }
    if (cableType && typeof cableType !== 'string') {
      throw new ValidationError('cableType must be a string');
    }
    if (installationMethod && typeof installationMethod !== 'string') {
      throw new ValidationError('installationMethod must be a string');
    }
    if (location && typeof location !== 'string') {
      throw new ValidationError('location must be a string');
    }

    logger.info('Installer V3 request received', { query: query.substring(0, 50), installationMethod });

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Generate embedding for installation knowledge search (with retry)
    logger.debug('Generating query embedding');
    const embeddingStart = Date.now();
    const queryEmbedding = await generateEmbeddingWithRetry(
      `${query} ${installationMethod || ''} cable installation practical guidance`,
      OPENAI_API_KEY
    );
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

    // Step 2: Search installation knowledge database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    logger.debug('Searching installation knowledge');

    const { data: installKnowledge, error: installError } = await supabase.rpc('search_installation_knowledge', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 8
    });

    if (installError) {
      logger.warn('Installation search failed', { error: installError });
    }

    // Step 3: Build installation context
    const installContext = installKnowledge && installKnowledge.length > 0
      ? installKnowledge.map((inst: any) => 
          `${inst.topic}: ${inst.content}`
        ).join('\n\n')
      : 'Apply general BS 7671 installation methods and best practices.';

    // Build conversation context with PREVIOUS WORK SUMMARY
    let contextSection = '';
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      const costOutput = previousAgentOutputs.find((o: any) => o.agent === 'cost-engineer');
      
      contextSection += '\n\nPREVIOUS SPECIALIST OUTPUTS:\n';
      if (designerOutput?.response?.structuredData) {
        const d = designerOutput.response.structuredData;
        contextSection += `DESIGNER: ${d.cableSize} cable, ${d.circuitBreaker} breaker, ${d.installationMethod}\n`;
      }
      if (costOutput?.response?.structuredData) {
        const c = costOutput.response.structuredData;
        contextSection += `COST ENGINEER: Total £${c.totalCost}, ${c.materials?.length || 0} materials\n`;
      }
      contextSection += '\n\nFULL DATA:\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }

    const systemPrompt = `You are an expert ONSITE INSTALLATION SPECIALIST with years of practical electrical experience.

Write all responses in UK English (British spelling and terminology). Do not use American spellings.

YOUR UNIQUE VALUE: You translate design into PRACTICAL onsite work
- Follow the onsite installation guides in the knowledge base EXACTLY
- Apply the safety notes from installation knowledge (not generic advice)
- Reference specific BS 7671 Table 4A2 support spacing from RAG
- Include the field tips and "lessons learned" from the installation knowledge
- Anticipate practical problems (access, existing services, cable routing challenges)
- Provide apprentice-friendly guidance with clear measurements and sequences

Your task is to provide step-by-step installation guidance for UK electrical work.

CURRENT DATE: September 2025

INSTALLATION BEST PRACTICES DATABASE (YOU MUST APPLY THESE):
${installContext}

🔴 CRITICAL INSTRUCTIONS FOR INSTALLATION GUIDANCE:
1. EXTRACT specific values from knowledge base:
   ✓ If database says "Clip spacing for 16mm² horizontal: every 400mm", use 400mm in your steps
   ✗ Don't say "regular intervals" - be specific!
   
2. REFERENCE installation methods by name:
   Example: "Per Method E (cables clipped direct to non-metallic surface), derating factor Ca = 0.94..."
   
3. INCLUDE practical tips from knowledge base in safetyNotes:
   Example from database: "Avoid sharp bends - minimum bending radius is 4× cable diameter"
   Your step: {"safetyNotes": ["Maintain 4× cable diameter bending radius (64mm for 16mm² cable)"]}
   
4. CROSS-REFERENCE with designer's installation method:
   ${previousAgentOutputs?.find((o: any) => o.agent === 'designer')?.response?.structuredData?.installationMethod || 'Check designer output'}
   
5. APPLY BS 7671 Table 4A2 support spacing requirements exactly as stated in knowledge base

6. ADD quality checkpoints at each stage (photograph cable routes, test continuity before covering)

7. INCLUDE specific tool sizes (e.g., "4mm masonry bit", "100mm hole saw", "3-in-1 cable stripper")

8. PROVIDE time estimates to help apprentices pace themselves

⚠️ STEP FORMATTING RULES (CRITICAL):
   ✅ CORRECT: Each step MUST be a structured JSON object:
   {
     "step": 1,
     "title": "Connect to the Shower",
     "description": "Follow manufacturer's instructions for connecting the supply cable to the shower unit terminals. Ensure correct polarity and tight connections.",
     "tools": ["Wire strippers", "Terminal screwdriver"],
     "materials": ["Cable"],
     "safetyNotes": ["Verify isolation before touching terminals"],
     "estimatedTime": 15
   }
   
   ❌ WRONG: NEVER use plain strings like this:
   "installationSteps": [
     "Connect to the Shower:",
     "Follow manufacturer's instructions...",
     "Test the Circuit:",
     "Perform continuity and insulation resistance tests..."
   ]
   
   🎯 HOW TO STRUCTURE STEPS:
   - Section headings (e.g., "Connect to the Shower") → Use as step.title
   - Detailed instructions → Use as step.description
   - Keep titles concise (3-6 words)
   - Put full details in description field
   - Always include all 7 required fields per step

The installation knowledge contains ${installKnowledge?.length || 0} verified practices. Apply them!

${contextSection}

CRITICAL: Respond ONLY with valid JSON. Follow these rules strictly:
1. All strings must use double quotes, not single quotes
2. No trailing commas after last array/object element
3. No line breaks inside string values - use \\n for new lines
4. Escape special characters: " becomes \\"
5. All property names must be double-quoted
6. No comments in JSON

Respond in this exact format:
{
  "response": "DETAILED installation method statement (250-350 words) covering: Site preparation and access requirements, step-by-step physical installation process with sequence order, fixing methods and support spacing per BS 7671 Table 4A2 (cable cleats every Xm), penetration sealing methods and fire barrier requirements, practical tips from field experience (e.g., labelling before termination, testing continuity at each stage), common mistakes to avoid (over-tightening terminals, inadequate bending radius), quality checkpoints at each stage, special considerations for installation environment (tray/conduit/buried). Include specific torque settings and tool requirements.",
  "installationSteps": [
    {
      "step": 1,
      "title": "Preparation",
      "description": "Detailed step description",
      "tools": ["Tool 1", "Tool 2"],
      "materials": ["Material 1"],
      "safetyNotes": ["Safety point"],
      "estimatedTime": 30
    }
  ],
  "practicalTips": [
    "Practical tip from field experience with specific actionable advice"
  ],
  "commonMistakes": [
    "Common mistake to avoid with explanation of consequences"
  ],
  "toolsRequired": ["Specific tool 1 with size/spec", "Specific tool 2"],
  "materialsRequired": ["Material 1 with exact spec", "Material 2"],
  "totalEstimatedTime": 120,
  "difficultyLevel": "Intermediate",
  "compliance": {
    "regulations": ["BS 7671:2018+A2:2022 Section XXX", "Specific regulation reference"],
    "inspectionPoints": ["Specific test/check required", "Verification method"]
  },
  "suggestedNextAgents": [
    {"agent": "health-safety", "reason": "Create risk assessment and method statement for this installation", "priority": "high"},
    {"agent": "commissioning", "reason": "Prepare testing and commissioning schedule", "priority": "medium"}
  ]
}

⚠️ REMEMBER: installationSteps MUST be an array of objects with all 7 fields (step, title, description, tools, materials, safetyNotes, estimatedTime). NEVER use plain strings!`;

    const userPrompt = `Provide detailed installation guidance for:
${query}

${cableType ? `Cable Type: ${cableType}` : ''}
${installationMethod ? `Installation Method: ${installationMethod}` : ''}
${location ? `Location: ${location}` : ''}

Include step-by-step instructions, practical tips, and things to avoid.`;

    // Step 4: Call Lovable AI (with timeout)
    logger.debug('Calling Lovable AI');
    const aiStart = Date.now();
    const aiResponse = await callLovableAIWithTimeout(systemPrompt, userPrompt, LOVABLE_API_KEY, {
      responseFormat: 'json_object',
      timeoutMs: 55000
    });
    logger.debug('AI response received', { duration: Date.now() - aiStart });

    // Use shared JSON parser with repair
    const installResult = parseJsonWithRepair(aiResponse, logger, 'installer');

    // Validate installationSteps structure - convert any strings to objects
    if (installResult.installationSteps && Array.isArray(installResult.installationSteps)) {
      const hasStringSteps = installResult.installationSteps.some((step: any) => typeof step === 'string');
      
      if (hasStringSteps) {
        logger.warn('Detected string steps in response - converting to structured objects');
        
        const structuredSteps: any[] = [];
        let currentStep: any = null;
        let stepNumber = 1;
        
        for (const item of installResult.installationSteps) {
          if (typeof item === 'string') {
            // If string ends with ":", it's a new step title
            if (item.trim().endsWith(':')) {
              if (currentStep) {
                structuredSteps.push(currentStep);
                stepNumber++;
              }
              currentStep = {
                step: stepNumber,
                title: item.replace(':', '').trim(),
                description: '',
                tools: [],
                materials: [],
                safetyNotes: [],
                estimatedTime: 15
              };
            } else if (currentStep) {
              // Append to description
              currentStep.description += (currentStep.description ? ' ' : '') + item.trim();
            }
          } else {
            // Already an object, use it directly
            if (currentStep) {
              structuredSteps.push(currentStep);
              stepNumber++;
            }
            structuredSteps.push({ ...item, step: stepNumber });
            currentStep = null;
            stepNumber++;
          }
        }
        
        if (currentStep) {
          structuredSteps.push(currentStep);
        }
        
        installResult.installationSteps = structuredSteps;
        logger.info('Converted string steps to structured format', { stepsCount: structuredSteps.length });
      }
    }

    logger.info('Installation guidance completed', {
      stepsCount: installResult.installationSteps?.length,
      estimatedTime: installResult.totalEstimatedTime
    });

    // Step 5: Return response
    return new Response(
      JSON.stringify({
        success: true,
        result: installResult,
        metadata: {
          requestId,
          knowledgeItemsUsed: installKnowledge?.length || 0,
          timestamp: new Date().toISOString()
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Installer V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});
