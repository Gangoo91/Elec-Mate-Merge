import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateInstallationMethod } from '../_agents/installation-method-core.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { query, projectDetails, designerContext } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔧 Installation Method Agent called', {
      userId: user.id,
      query: query.substring(0, 100),
      hasProjectDetails: !!projectDetails,
      hasDesignerContext: !!designerContext
    });

    // Generate installation method using ultra-fast RAG
    const result = await generateInstallationMethod(supabase, {
      query,
      projectDetails,
      designerContext
    });

    console.log('✅ Installation method generated', {
      totalSteps: result.installationMethod.steps?.length || 0,
      totalTime: result.metadata.totalTime,
      qualityScore: result.metadata.qualityScore
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: result.installationMethod,
        metadata: result.metadata
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('❌ Error in installation-method-agent:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
