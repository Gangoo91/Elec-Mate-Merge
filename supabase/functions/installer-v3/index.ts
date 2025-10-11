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
  callLovableAIWithTimeout
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
    const { query, cableType, installationMethod, location } = body;

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

    const systemPrompt = `You are an expert installation specialist with years of practical electrical experience.

Your task is to provide step-by-step installation guidance for UK electrical work.

CURRENT DATE: September 2025

RELEVANT INSTALLATION KNOWLEDGE:
${installContext}

Respond ONLY with valid JSON in this exact format:
{
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
    "Practical tip from experience"
  ],
  "commonMistakes": [
    "Common mistake to avoid"
  ],
  "toolsRequired": ["Complete tool list"],
  "materialsRequired": ["Complete materials list"],
  "totalEstimatedTime": 120,
  "difficultyLevel": "Intermediate",
  "compliance": {
    "regulations": ["BS 7671 references"],
    "inspectionPoints": ["What to check"]
  }
}`;

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

    const installResult = JSON.parse(aiResponse);

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
