import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

// Tools we want to KEEP
const TOOLS_TO_KEEP = ['fill_eicr', 'fill_eic', 'fill_minor_works'];

// Get all agents in the account
async function getAllAgents(apiKey: string): Promise<Array<{ agent_id: string; name: string }>> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/agents`, {
    headers: { 'xi-api-key': apiKey },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch agents: ${response.status}`);
  }

  const data = await response.json();
  return data.agents || [];
}

// Clear all tools from an agent
async function clearAgentTools(apiKey: string, agentId: string): Promise<boolean> {
  try {
    const response = await fetch(`${ELEVENLABS_API_BASE}/convai/agents/${agentId}`, {
      method: 'PATCH',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_config: {
          agent: {
            prompt: {
              tool_ids: [],
            },
          },
        },
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

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

    console.log('=== NUCLEAR CLEANUP STARTING ===');

    // Step 1: Get all agents
    console.log('Step 1: Getting all agents...');
    const agents = await getAllAgents(apiKey);
    console.log(`Found ${agents.length} agents`);

    // Step 2: Clear tools from ALL agents
    console.log('Step 2: Clearing tools from all agents...');
    const clearedAgents: string[] = [];
    for (const agent of agents) {
      console.log(`Clearing tools from: ${agent.name} (${agent.agent_id})`);
      const success = await clearAgentTools(apiKey, agent.agent_id);
      if (success) {
        clearedAgents.push(agent.name);
      }
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    console.log(`Cleared ${clearedAgents.length} agents`);

    // Wait for changes to propagate
    console.log('Waiting for changes to propagate...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 3: Get all tools
    console.log('Step 3: Getting all tools...');
    const toolsResponse = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
      headers: { 'xi-api-key': apiKey },
    });

    if (!toolsResponse.ok) {
      throw new Error(`Failed to fetch tools: ${toolsResponse.status}`);
    }

    const toolsData = await toolsResponse.json();
    const allTools = toolsData.tools || [];
    console.log(`Found ${allTools.length} tools`);

    // Step 4: Delete ALL tools (we'll recreate the ones we need)
    console.log('Step 4: Deleting all tools...');
    let deletedCount = 0;
    const errors: string[] = [];

    for (const tool of allTools) {
      const toolId = tool.id;
      const toolName = tool.tool_config?.name || 'unnamed';

      try {
        const deleteResponse = await fetch(`${ELEVENLABS_API_BASE}/convai/tools/${toolId}`, {
          method: 'DELETE',
          headers: { 'xi-api-key': apiKey },
        });

        if (deleteResponse.ok || deleteResponse.status === 404) {
          deletedCount++;
          if (deletedCount % 20 === 0) {
            console.log(`Deleted ${deletedCount}/${allTools.length} tools...`);
          }
        } else {
          const errorText = await deleteResponse.text();
          errors.push(`${toolName}: ${deleteResponse.status} - ${errorText.substring(0, 100)}`);
        }
      } catch (e) {
        errors.push(`${toolName}: ${e}`);
      }

      await new Promise(resolve => setTimeout(resolve, 50));
    }

    console.log(`Deleted ${deletedCount} tools, ${errors.length} errors`);

    // Step 5: Verify
    console.log('Step 5: Verifying...');
    const verifyResponse = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
      headers: { 'xi-api-key': apiKey },
    });
    const verifyData = await verifyResponse.json();
    const remainingTools = verifyData.tools || [];

    console.log('=== CLEANUP COMPLETE ===');

    return new Response(
      JSON.stringify({
        success: true,
        steps: {
          agentsFound: agents.length,
          agentsCleared: clearedAgents.length,
          toolsFound: allTools.length,
          toolsDeleted: deletedCount,
          errors: errors.length,
          remaining: remainingTools.length,
        },
        clearedAgents,
        firstErrors: errors.slice(0, 5),
        remainingTools: remainingTools.map((t: { id: string; tool_config?: { name?: string } }) => ({
          id: t.id,
          name: t.tool_config?.name,
        })),
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
