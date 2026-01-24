import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

// Tools we want to KEEP
const TOOLS_TO_KEEP = ['fill_eicr', 'fill_eic', 'fill_minor_works'];

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

    console.log('Starting cleanup of ALL ElevenLabs tools...');

    // Get all tools
    const toolsResponse = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
      headers: { 'xi-api-key': apiKey },
    });

    if (!toolsResponse.ok) {
      throw new Error(`Failed to fetch tools: ${toolsResponse.status}`);
    }

    const toolsData = await toolsResponse.json();
    const allTools = toolsData.tools || [];

    console.log(`Found ${allTools.length} total tools in account`);

    // Filter tools to delete (exclude the 3 we want to keep)
    const toolsToDelete = allTools.filter((t: { tool_config?: { name?: string } }) => {
      const name = t.tool_config?.name || '';
      return !TOOLS_TO_KEEP.includes(name);
    });

    console.log(`Will delete ${toolsToDelete.length} tools (keeping: ${TOOLS_TO_KEEP.join(', ')})`);

    // Delete them all
    let deletedCount = 0;
    const errors: string[] = [];

    for (const tool of toolsToDelete) {
      const toolId = tool.id;
      const toolName = tool.tool_config?.name || 'unnamed';

      try {
        const deleteResponse = await fetch(`${ELEVENLABS_API_BASE}/convai/tools/${toolId}`, {
          method: 'DELETE',
          headers: { 'xi-api-key': apiKey },
        });

        if (deleteResponse.ok || deleteResponse.status === 404) {
          deletedCount++;
          console.log(`Deleted ${deletedCount}/${toolsToDelete.length}: ${toolName}`);
        } else {
          const errorText = await deleteResponse.text();
          errors.push(`${toolName}: ${deleteResponse.status} - ${errorText}`);
          console.log(`Failed to delete ${toolName}: ${deleteResponse.status}`);
        }
      } catch (e) {
        errors.push(`${toolName}: ${e}`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Verify remaining tools
    const verifyResponse = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
      headers: { 'xi-api-key': apiKey },
    });
    const verifyData = await verifyResponse.json();
    const remainingTools = verifyData.tools || [];

    return new Response(
      JSON.stringify({
        success: true,
        originalCount: allTools.length,
        deletedCount,
        errorCount: errors.length,
        errors: errors.slice(0, 10), // First 10 errors
        remainingCount: remainingTools.length,
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
