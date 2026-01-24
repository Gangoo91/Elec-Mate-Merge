import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';
const TESTING_AGENT_ID = 'agent_9901ke9rd48cf6jva60jd90sgx1y';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('ELEVENLABS_API_KEY');

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'ELEVENLABS_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get all tools at account level
    const toolsResponse = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
      headers: { 'xi-api-key': apiKey },
    });

    if (!toolsResponse.ok) {
      throw new Error(`Failed to fetch tools: ${toolsResponse.status}`);
    }

    const toolsData = await toolsResponse.json();

    // Get agent details
    const agentResponse = await fetch(`${ELEVENLABS_API_BASE}/convai/agents/${TESTING_AGENT_ID}`, {
      headers: { 'xi-api-key': apiKey },
    });

    let agentData = null;
    if (agentResponse.ok) {
      agentData = await agentResponse.json();
    }

    // Extract tool info
    const allTools = toolsData.tools?.map((t: { id: string; tool_config?: { name?: string; type?: string } }) => ({
      id: t.id,
      name: t.tool_config?.name || 'unnamed',
      type: t.tool_config?.type || 'unknown',
    })) || [];

    // Get agent's assigned tools
    const agentToolIds = agentData?.conversation_config?.agent?.prompt?.tool_ids || [];

    return new Response(
      JSON.stringify({
        totalToolsInAccount: allTools.length,
        allTools,
        agentId: TESTING_AGENT_ID,
        agentName: agentData?.name || 'unknown',
        agentToolIds,
        agentToolCount: agentToolIds.length,
      }, null, 2),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
