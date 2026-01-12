import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

interface TokenRequest {
  agentId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agentId }: TokenRequest = await req.json();

    if (!agentId) {
      return new Response(
        JSON.stringify({ error: 'Agent ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get API key from environment (Supabase secrets)
    const apiKey = Deno.env.get('ELEVENLABS_API_KEY');

    if (!apiKey) {
      console.error('ELEVENLABS_API_KEY not configured in Supabase secrets');
      return new Response(
        JSON.stringify({ error: 'ElevenLabs API key not configured. Please contact administrator.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Requesting conversation token for agent: ${agentId}`);

    // Call ElevenLabs API to get conversation token
    const response = await fetch(
      `${ELEVENLABS_API_BASE}/convai/conversation/token?agent_id=${encodeURIComponent(agentId)}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error: ${response.status} - ${errorText}`);

      // Handle specific error cases
      if (response.status === 401) {
        return new Response(
          JSON.stringify({ error: 'Invalid ElevenLabs API key' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (response.status === 404) {
        return new Response(
          JSON.stringify({ error: 'Agent not found. Please check the agent ID.' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: `Failed to get conversation token: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    if (!data.token) {
      console.error('No token in ElevenLabs response:', data);
      return new Response(
        JSON.stringify({ error: 'No token received from ElevenLabs' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully obtained conversation token');

    return new Response(
      JSON.stringify({ token: data.token }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in elevenlabs-conversation-token function:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
