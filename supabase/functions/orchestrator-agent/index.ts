import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OrchestratorRequest {
  messages: Message[];
  currentDesign?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, currentDesign } = await req.json() as OrchestratorRequest;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('🎯 Orchestrator: Analyzing user query');

    const latestMessage = messages[messages.length - 1]?.content || '';
    
    // Intent classification using keyword matching
    const intents = classifyIntent(latestMessage);
    console.log('📊 Detected intents:', intents);

    // Create Supabase client for invoking specialist agents
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Route to specialist agents based on intents
    const agentPromises = [];
    const activeAgents: string[] = [];

    if (intents.design) {
      activeAgents.push('designer');
      agentPromises.push(
        supabase.functions.invoke('designer-agent', {
          body: { messages, currentDesign }
        })
      );
    }

    if (intents.cost) {
      activeAgents.push('cost-engineer');
      agentPromises.push(
        supabase.functions.invoke('cost-engineer-agent', {
          body: { messages, currentDesign }
        })
      );
    }

    if (intents.installation) {
      activeAgents.push('installer');
      agentPromises.push(
        supabase.functions.invoke('installer-agent', {
          body: { messages, currentDesign }
        })
      );
    }

    if (intents.commissioning) {
      activeAgents.push('commissioning');
      agentPromises.push(
        supabase.functions.invoke('commissioning-agent', {
          body: { messages, currentDesign }
        })
      );
    }

    console.log('🚀 Invoking agents:', activeAgents);

    // Execute all agent calls in parallel
    const agentResults = await Promise.all(agentPromises);

    // Extract responses
    const agentResponses = agentResults.map((result, idx) => ({
      agent: activeAgents[idx],
      data: result.data,
      error: result.error
    }));

    console.log('✅ Agent responses received:', agentResponses.length);

    // Smart coordination: Analyze and aggregate responses
    const aggregatedResponse = await aggregateResponses(
      agentResponses,
      latestMessage,
      openAIApiKey
    );

    return new Response(JSON.stringify({
      response: aggregatedResponse.response,
      activeAgents,
      citations: aggregatedResponse.citations,
      costUpdates: aggregatedResponse.costUpdates,
      toolCalls: aggregatedResponse.toolCalls,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in orchestrator-agent:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Orchestrator failed',
      response: 'I encountered an error processing your request. Please try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function classifyIntent(message: string): {
  design: boolean;
  cost: boolean;
  installation: boolean;
  commissioning: boolean;
} {
  const lowerMessage = message.toLowerCase();

  const designKeywords = ['cable', 'size', 'protection', 'mcb', 'rcbo', 'voltage drop', 'calculate', 'regulation', 'amp', 'circuit', 'design', 'earth', 'fault', 'loop'];
  const costKeywords = ['price', 'cost', 'cheap', 'wholesaler', 'screwfix', 'cef', 'toolstation', 'budget', 'estimate', 'quote', 'materials'];
  const installationKeywords = ['install', 'how to', 'method', 'steps', 'practical', 'fix', 'mount', 'route', 'clip', 'location'];
  const commissioningKeywords = ['test', 'certificate', 'eic', 'verify', 'inspect', 'commission', 'ir test', 'continuity', 'zs'];

  return {
    design: designKeywords.some(keyword => lowerMessage.includes(keyword)),
    cost: costKeywords.some(keyword => lowerMessage.includes(keyword)),
    installation: installationKeywords.some(keyword => lowerMessage.includes(keyword)),
    commissioning: commissioningKeywords.some(keyword => lowerMessage.includes(keyword))
  };
}

async function aggregateResponses(
  agentResponses: any[],
  userQuery: string,
  openAIApiKey: string
): Promise<{
  response: string;
  citations: any[];
  costUpdates: any;
  toolCalls: any[];
}> {
  // Collect all agent outputs
  const sections: string[] = [];
  const allCitations: any[] = [];
  let costUpdates: any = null;
  const allToolCalls: any[] = [];

  const emojiMap: Record<string, string> = {
    'designer': '🎨',
    'cost-engineer': '💰',
    'installer': '🔧',
    'commissioning': '✅'
  };

  for (const agentResult of agentResponses) {
    if (agentResult.error) {
      console.error(`Agent ${agentResult.agent} error:`, agentResult.error);
      continue;
    }

    const header = emojiMap[agentResult.agent] || agentResult.agent.toUpperCase();
    const content = agentResult.data?.response || '';
    
    if (content) {
      sections.push(`${header}\n\n${content}`);
    }

    if (agentResult.data?.citations) {
      allCitations.push(...agentResult.data.citations);
    }

    if (agentResult.data?.costUpdates) {
      costUpdates = agentResult.data.costUpdates;
    }

    if (agentResult.data?.toolCalls) {
      allToolCalls.push(...agentResult.data.toolCalls);
    }
  }

  // If no agents responded, provide fallback
  if (sections.length === 0) {
    return {
      response: 'I need more specific information to help you. Could you clarify your question about the electrical installation?',
      citations: [],
      costUpdates: null,
      toolCalls: []
    };
  }

  // Use GPT-4o to refine and connect the sections if needed
  const combinedSections = sections.join('\n\n---\n\n');

  // Smart coordination: Merge responses naturally
  const refinementPrompt = `You're coordinating specialist electricians chatting with a colleague. Merge their responses into ONE natural conversation - like texting a mate about the job.

The user asked: "${userQuery}"

Specialist responses:
${combinedSections}

Rules for merging:
- NO markdown (**, ##, bullets, lists)
- NO formal sections or headers
- Use emojis naturally within the flow (🎨 for design stuff, 💰 for costs, 🔧 for installation, ✅ for testing)
- Keep regulation citations but make them flow naturally in sentences
- Sound like an experienced spark texting back, not a textbook
- Write in paragraphs, not lists
- Be conversational but professional - like you're helping a mate out

Merge everything into a single friendly chat response that covers design, cost, installation, and testing naturally.`;

  const refinementResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an experienced electrician chatting with a colleague. Keep responses natural and conversational, no markdown formatting.' },
        { role: 'user', content: refinementPrompt }
      ],
      max_tokens: 2000,
      temperature: 0.3
    }),
  });

  if (!refinementResponse.ok) {
    console.error('Refinement API error:', await refinementResponse.text());
    // Fallback to combined sections
    return {
      response: combinedSections,
      citations: allCitations,
      costUpdates,
      toolCalls: allToolCalls
    };
  }

  const refinementData = await refinementResponse.json();
  const refinedResponse = refinementData.choices[0]?.message?.content || combinedSections;

  return {
    response: refinedResponse,
    citations: allCitations,
    costUpdates,
    toolCalls: allToolCalls
  };
}
