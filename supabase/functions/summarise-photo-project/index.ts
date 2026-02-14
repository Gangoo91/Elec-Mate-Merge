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

async function callOpenAI(messages: unknown[]) {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const body: Record<string, unknown> = {
    model: 'gpt-5-mini-2025-08-07',
    messages,
    max_completion_tokens: 3000,
  };

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
  return data.choices[0].message.content;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  console.log('summarise-photo-project | Started:', new Date().toISOString());

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
    const { projectId } = await req.json();
    if (!projectId) throw new Error('projectId is required.');

    // Fetch project
    const { data: project, error: projectError } = await supabaseClient
      .from('photo_projects')
      .select('*')
      .eq('id', projectId)
      .eq('user_id', user.id)
      .single();

    if (projectError || !project) throw new Error('Project not found.');

    // Fetch all photos for this project
    const { data: photos, error: photosError } = await supabaseClient
      .from('safety_photos')
      .select('description, photo_type, notes, location, created_at, category')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (photosError) throw new Error('Could not fetch photos.');
    if (!photos || photos.length === 0) throw new Error('No photos found for this project.');

    // Build photo context for AI
    const photoSummaries = photos
      .map((p, i) => {
        const parts = [`Photo ${i + 1}`];
        if (p.photo_type) parts.push(`Type: ${p.photo_type}`);
        if (p.description) parts.push(`Description: ${p.description}`);
        if (p.notes) parts.push(`Notes: ${p.notes}`);
        if (p.location) parts.push(`Location: ${p.location}`);
        if (p.category) parts.push(`Category: ${p.category}`);
        if (p.created_at) {
          const date = new Date(p.created_at);
          parts.push(
            `Date: ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
          );
        }
        return parts.join(' | ');
      })
      .join('\n');

    // Count types
    const typeCounts: Record<string, number> = {};
    photos.forEach((p) => {
      const t = p.photo_type || 'general';
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    });

    const typeBreakdown = Object.entries(typeCounts)
      .map(([type, count]) => `${type}: ${count}`)
      .join(', ');

    // Call GPT-5-mini
    const summary = await callOpenAI([
      {
        role: 'system',
        content: `You are an expert UK electrician writing a concise project summary.
Write in professional but accessible language. Use UK English.
The summary should read like a brief progress report a contractor would send to a client.
Include: what work was done, key milestones, any notable items from photo notes, and current status.
Keep it to 3-5 sentences maximum.`,
      },
      {
        role: 'user',
        content: `Write a project summary for this electrical project:

Project: ${project.name}
${project.customer_name ? `Customer: ${project.customer_name}` : ''}
${project.address ? `Address: ${project.address}` : ''}
${project.job_reference ? `Job Reference: ${project.job_reference}` : ''}
Status: ${project.status}
Total Photos: ${photos.length} (${typeBreakdown})

Photo details:
${photoSummaries}`,
      },
    ]);

    console.log('Summary generated, length:', summary?.length);

    return new Response(
      JSON.stringify({
        success: true,
        summary: summary || 'No summary could be generated.',
        photoCount: photos.length,
        typeCounts,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('summarise-photo-project error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate summary';

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
