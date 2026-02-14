import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// ============================================================================
// OpenAI helper (gpt-5-mini, no temperature, max_completion_tokens)
// ============================================================================

async function callOpenAI(messages: unknown[], tools?: unknown[], toolChoice?: unknown) {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const body: Record<string, unknown> = {
    model: 'gpt-5-mini-2025-08-07',
    messages,
    max_completion_tokens: 2000,
  };

  if (tools && tools.length > 0) {
    body.tools = tools;
    if (toolChoice) body.tool_choice = toolChoice;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI error: ${error}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    toolCalls: data.choices[0].message.tool_calls,
  };
}

// ============================================================================
// Tool calling schema for structured output
// ============================================================================

const classifyPhotoTool = {
  type: 'function',
  function: {
    name: 'classify_photo',
    description: 'Classify an electrical work site photo and detect any safety issues',
    parameters: {
      type: 'object',
      properties: {
        photoType: {
          type: 'string',
          enum: ['safety', 'job_progress', 'completion', 'snagging', 'before', 'after', 'general'],
          description: 'The most appropriate type classification for this photo',
        },
        description: {
          type: 'string',
          description: 'A concise professional description of what the photo shows (1-2 sentences)',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Relevant BS 7671 category tags (e.g. "Earthing", "Consumer Unit", "Cable Routes", "Testing")',
        },
        confidence: {
          type: 'number',
          description: 'Confidence level 0-1 for the classification',
        },
        issues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              description: {
                type: 'string',
                description: 'Description of the safety issue or non-compliance',
              },
              severity: {
                type: 'string',
                enum: ['low', 'medium', 'high', 'critical'],
                description: 'Severity of the issue',
              },
              regulation: {
                type: 'string',
                description: 'Relevant BS 7671 regulation number if applicable',
              },
            },
            required: ['description', 'severity'],
          },
          description:
            'Any visible electrical safety issues, non-compliance with BS 7671, or hazards. Empty array if none detected.',
        },
      },
      required: ['photoType', 'description', 'tags', 'confidence', 'issues'],
      additionalProperties: false,
    },
  },
};

// ============================================================================
// MAIN HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  console.log('classify-photo | Started:', new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Validate environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    if (!supabaseUrl || !supabaseAnonKey) throw new Error('Database service not configured.');

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Please log in.');

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const jwt = authHeader.replace('Bearer ', '').trim();
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(jwt);
    if (userError || !user) throw new Error('Session expired. Please log in again.');

    // Parse request
    const { photoId, imageUrl } = await req.json();
    if (!photoId && !imageUrl) throw new Error('photoId or imageUrl is required.');

    // If photoId provided, fetch the photo URL
    let url = imageUrl;
    if (photoId && !url) {
      const { data: photo } = await supabaseClient
        .from('safety_photos')
        .select('file_url, storage_path')
        .eq('id', photoId)
        .eq('user_id', user.id)
        .single();

      if (!photo) throw new Error('Photo not found.');

      // Generate a signed URL for better access
      if (photo.storage_path) {
        const { data: signedData } = await supabaseClient.storage
          .from('safety-photos')
          .createSignedUrl(photo.storage_path, 300);
        url = signedData?.signedUrl || photo.file_url;
      } else {
        url = photo.file_url;
      }
    }

    if (!url) throw new Error('Could not resolve photo URL.');

    // Call GPT-5-mini vision
    const result = await callOpenAI(
      [
        {
          role: 'system',
          content: `You are an expert UK electrician with deep knowledge of BS 7671:2018+A2:2022 (18th Edition Wiring Regulations).
You classify electrical work site photos and detect safety issues.

Guidelines:
- Photo types: safety (PPE, site conditions), job_progress (ongoing work), completion (finished work), snagging (defects/issues), before (pre-work state), after (post-work state), general (other)
- Tags should be relevant BS 7671 categories: Earthing, Consumer Unit, Cable Routes, Testing, Distribution, Lighting, Power, Fire Alarm, Data/Comms, Solar PV, EV Charging, Containment, Accessories
- For safety issues: only flag genuine visible concerns, not assumptions. Reference specific regulations where possible.
- Be concise and professional in descriptions.`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Classify this electrical work photo. Identify the photo type, write a brief description, suggest relevant tags, and flag any visible safety issues or non-compliance.',
            },
            {
              type: 'image_url',
              image_url: { url, detail: 'low' },
            },
          ],
        },
      ],
      [classifyPhotoTool],
      { type: 'function', function: { name: 'classify_photo' } }
    );

    // Parse structured response
    let classification;
    if (result.toolCalls && result.toolCalls.length > 0) {
      classification = JSON.parse(result.toolCalls[0].function.arguments);
    } else {
      // Fallback: try parsing content directly
      classification = JSON.parse(result.content);
    }

    console.log('Classification:', JSON.stringify(classification));

    // If photoId provided, optionally update the photo record with AI suggestions
    // (Don't auto-apply — return for user to accept/edit)

    return new Response(
      JSON.stringify({
        success: true,
        classification,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('classify-photo error:', error);
    const message = error instanceof Error ? error.message : 'Failed to classify photo';

    return new Response(
      JSON.stringify({
        success: false,
        message,
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
