import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

interface ProjectPhase {
  phaseName: string;
  circuits: Array<{
    name: string;
    loadType: string;
    load: number;
    voltage: number;
    phases: 'single' | 'three';
    quantity: number;
  }>;
  dependencies: string[];
  estimatedDuration: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

interface ProjectBreakdown {
  projectName: string;
  totalCircuits: number;
  phases: ProjectPhase[];
  estimatedTotalDuration: string;
  keyRisks: string[];
  recommendations: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'project-manager-agent' });

  try {
    const { userInput, bulkData } = await req.json();
    
    logger.info('Project Manager Agent processing', { userInput, bulkDataLength: bulkData?.length });

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new ValidationError('OPENAI_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate RAG query from user input and bulk data
    const ragQuery = bulkData && bulkData.length > 0
      ? `Project phasing ${bulkData.length} circuits dependencies resource planning critical path scheduling electrical installation`
      : `${userInput} electrical project management phasing dependencies scheduling risk identification resource planning`;

    logger.debug('RAG query', { query: ragQuery });

    // Get embedding for RAG search with retry + timeout
    const embeddingResponse = await logger.time(
      'OpenAI embedding generation',
      () => withRetry(
        () => withTimeout(
          fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'text-embedding-3-small',
              input: ragQuery,
            }),
          }),
          Timeouts.STANDARD,
          'OpenAI embedding generation'
        ),
        RetryPresets.STANDARD
      )
    );

    if (!embeddingResponse.ok) {
      logger.error('Embedding generation failed', { status: embeddingResponse.status });
      throw new ValidationError('Failed to generate embedding');
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0].embedding;

    // Search project management knowledge base with timeout
    const { data: pmKnowledge, error: ragError } = await logger.time(
      'Project management vector search',
      () => withTimeout(
        supabase.rpc('search_project_mgmt', {
          query_embedding: embedding,
          match_threshold: 0.7,
          match_count: 10
        }),
        Timeouts.STANDARD,
        'Project management vector search'
      )
    );

    let ragContext = '';
    if (!ragError && pmKnowledge && pmKnowledge.length > 0) {
      ragContext = `\n\nRELEVANT PROJECT MANAGEMENT KNOWLEDGE FROM 784 REAL PROJECTS:\n${pmKnowledge.map((k: any) => 
        `• ${k.topic} (${k.source}): ${k.content}`
      ).join('\n')}`;
      logger.info('Found project management guides', { count: pmKnowledge.length, topSimilarity: pmKnowledge[0]?.similarity?.toFixed(2) });
    } else {
      logger.warn('No project management knowledge found', { ragError });
    }

    // System prompt for Project Manager Agent
    const systemPrompt = `You are a senior electrical project manager with 20+ years experience in large-scale installations (factories, commercial buildings, industrial estates).

Your role is to:
1. Break down complex projects into manageable phases
2. Identify dependencies between circuits/systems
3. Prioritise work based on critical path
4. Flag compliance requirements and special considerations
5. Provide realistic timelines

Key skills:
- Phasing strategy (power first, then lighting, then data)
- Load grouping (similar circuits together for efficiency)
- Risk identification (supply constraints, access issues, coordination)
- Resource planning (team size, specialist requirements)

Output a structured project breakdown with phases, dependencies, and timelines.
Always consider BS 7671 Part 5 (selection and erection) and Part 7 (special locations).${ragContext}

IMPORTANT: Use the real-world project knowledge above to inform your phasing strategy, dependency mapping, risk identification, and timeline estimates. Reference specific patterns from the knowledge base when relevant.`;

    // Build the analysis prompt
    let analysisPrompt = '';
    if (bulkData && bulkData.length > 0) {
      analysisPrompt = `Bulk load data provided:\n${JSON.stringify(bulkData, null, 2)}\n\nBreak this into logical installation phases.`;
    } else {
      analysisPrompt = `Project description: ${userInput}\n\nBreak this project into logical installation phases with dependencies and timelines.`;
    }

    // Call OpenAI with structured output
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: analysisPrompt }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'create_project_breakdown',
              description: 'Break down a complex electrical project into phases',
              parameters: {
                type: 'object',
                properties: {
                  projectName: { type: 'string', description: 'Name of the project' },
                  totalCircuits: { type: 'number', description: 'Total number of circuits' },
                  phases: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        phaseName: { type: 'string' },
                        circuits: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              name: { type: 'string' },
                              loadType: { type: 'string' },
                              load: { type: 'number' },
                              voltage: { type: 'number' },
                              phases: { type: 'string', enum: ['single', 'three'] },
                              quantity: { type: 'number' }
                            },
                            required: ['name', 'loadType', 'load', 'voltage', 'phases', 'quantity']
                          }
                        },
                        dependencies: { type: 'array', items: { type: 'string' } },
                        estimatedDuration: { type: 'string' },
                        priority: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] }
                      },
                      required: ['phaseName', 'circuits', 'dependencies', 'estimatedDuration', 'priority']
                    }
                  },
                  estimatedTotalDuration: { type: 'string' },
                  keyRisks: { type: 'array', items: { type: 'string' } },
                  recommendations: { type: 'array', items: { type: 'string' } }
                },
                required: ['projectName', 'totalCircuits', 'phases', 'estimatedTotalDuration', 'keyRisks', 'recommendations']
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'create_project_breakdown' } },
        max_completion_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[PROJECT-MANAGER] OpenAI error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('[PROJECT-MANAGER] OpenAI response:', JSON.stringify(data, null, 2));

    const toolCall = data.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('No tool call in response');
    }

    const projectBreakdown: ProjectBreakdown = JSON.parse(toolCall.function.arguments);

    // Generate natural language summary
    const summaryPrompt = `Based on this project breakdown:\n${JSON.stringify(projectBreakdown, null, 2)}\n\nWrite a brief project summary for the electrician (2-3 paragraphs, conversational tone, mention key phases and timelines).`;

    const summaryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: 'You are a helpful project manager explaining a project breakdown to an electrician.' },
          { role: 'user', content: summaryPrompt }
        ],
        max_completion_tokens: 500
      }),
    });

    const summaryData = await summaryResponse.json();
    const naturalLanguageResponse = summaryData.choices[0]?.message?.content || 'Project breakdown complete.';

    console.log('[PROJECT-MANAGER] Analysis complete');

    return new Response(
      JSON.stringify({
        agent: 'project-manager',
        response: naturalLanguageResponse,
        projectBreakdown,
        activeAgents: ['project-manager']
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('[PROJECT-MANAGER] Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        agent: 'project-manager'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
