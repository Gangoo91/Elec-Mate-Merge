import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  required: boolean;
  description: string;
  enumValues?: string[];
}

interface VoiceTool {
  name: string;
  description: string;
  category: string;
  parameters: ToolParameter[];
  waitForResponse: boolean;
  disableInterruptions: boolean;
  executionMode?: 'immediate' | 'wait';
}

interface SyncRequest {
  apiKey: string;
  agentId: string;
  tools: VoiceTool[];
  systemPrompt?: string;
}

// Convert our tool format to ElevenLabs API format
function convertToElevenLabsFormat(tool: VoiceTool): object {
  // Build parameters object in JSON Schema format
  const properties: Record<string, object> = {};
  const required: string[] = [];

  for (const param of tool.parameters) {
    const propDef: Record<string, unknown> = {
      type: param.type === 'array' ? 'array' : param.type,
      description: param.description,
    };

    if (param.enumValues && param.enumValues.length > 0) {
      propDef.enum = param.enumValues;
    }

    properties[param.name] = propDef;

    if (param.required) {
      required.push(param.name);
    }
  }

  return {
    tool_config: {
      type: 'client',
      name: tool.name,
      description: tool.description,
      parameters: {
        type: 'object',
        properties,
        required,
      },
      expects_response: tool.waitForResponse,
      disable_interruptions: tool.disableInterruptions,
    },
  };
}

// Fetch existing tools from ElevenLabs
async function getExistingTools(apiKey: string): Promise<Map<string, string>> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
    headers: {
      'xi-api-key': apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch existing tools: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const toolMap = new Map<string, string>();

  // Map tool names to their IDs
  if (data.tools && Array.isArray(data.tools)) {
    for (const tool of data.tools) {
      if (tool.tool_config?.name && tool.id) {
        toolMap.set(tool.tool_config.name, tool.id);
      }
    }
  }

  return toolMap;
}

// Create a tool in ElevenLabs
async function createTool(apiKey: string, toolConfig: object): Promise<{ id: string; name: string }> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toolConfig),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create tool: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return { id: data.id, name: (toolConfig as any).tool_config.name };
}

// Update agent with tool IDs
async function updateAgentTools(apiKey: string, agentId: string, toolIds: string[]): Promise<void> {
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
            tool_ids: toolIds,
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update agent: ${response.status} - ${error}`);
  }
}

// Update agent system prompt
async function updateAgentPrompt(apiKey: string, agentId: string, systemPrompt: string): Promise<void> {
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
            prompt: systemPrompt,
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update agent prompt: ${response.status} - ${error}`);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { apiKey, agentId, tools, systemPrompt }: SyncRequest = await req.json();

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!agentId) {
      return new Response(
        JSON.stringify({ error: 'Agent ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!tools || !Array.isArray(tools) || tools.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Tools array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Starting sync of ${tools.length} tools to agent ${agentId}`);

    // Step 1: Get existing tools
    console.log('Fetching existing tools...');
    const existingTools = await getExistingTools(apiKey);
    console.log(`Found ${existingTools.size} existing tools`);

    // Step 2: Create new tools and collect all tool IDs
    const results = {
      created: [] as string[],
      skipped: [] as string[],
      failed: [] as { name: string; error: string }[],
      totalToolIds: [] as string[],
    };

    for (const tool of tools) {
      try {
        // Check if tool already exists
        const existingId = existingTools.get(tool.name);

        if (existingId) {
          console.log(`Tool "${tool.name}" already exists (ID: ${existingId}), skipping`);
          results.skipped.push(tool.name);
          results.totalToolIds.push(existingId);
        } else {
          // Create new tool
          const elevenLabsFormat = convertToElevenLabsFormat(tool);
          console.log(`Creating tool: ${tool.name}`);
          const created = await createTool(apiKey, elevenLabsFormat);
          results.created.push(tool.name);
          results.totalToolIds.push(created.id);
          console.log(`Created tool "${tool.name}" with ID: ${created.id}`);

          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`Failed to create tool "${tool.name}":`, error);
        results.failed.push({
          name: tool.name,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // Step 3: Update agent with all tool IDs
    if (results.totalToolIds.length > 0) {
      console.log(`Updating agent with ${results.totalToolIds.length} tool IDs...`);
      await updateAgentTools(apiKey, agentId, results.totalToolIds);
      console.log('Agent updated successfully');
    }

    // Step 4: Update system prompt if provided
    if (systemPrompt) {
      console.log('Updating agent system prompt...');
      await updateAgentPrompt(apiKey, agentId, systemPrompt);
      console.log('System prompt updated successfully');
    }

    const summary = {
      success: true,
      message: `Sync completed: ${results.created.length} created, ${results.skipped.length} already existed, ${results.failed.length} failed`,
      created: results.created.length,
      skipped: results.skipped.length,
      failed: results.failed.length,
      totalAssigned: results.totalToolIds.length,
      details: {
        createdTools: results.created,
        skippedTools: results.skipped,
        failedTools: results.failed,
      },
      systemPromptUpdated: !!systemPrompt,
    };

    console.log('Sync completed:', summary.message);

    return new Response(
      JSON.stringify(summary),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in sync-elevenlabs-tools function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
