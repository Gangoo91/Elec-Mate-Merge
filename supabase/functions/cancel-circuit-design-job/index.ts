import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[CANCEL-CIRCUIT-DESIGN] Function started');

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.id) throw new Error("User not authenticated");

    console.log('[CANCEL-CIRCUIT-DESIGN] User authenticated:', user.id);

    // Create authenticated client for RLS-protected queries
    const authenticatedClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader }
        }
      }
    );

    // Get the job ID from the request body
    const body = await req.json();
    const jobId = body.jobId;
    if (!jobId) throw new Error("No job ID provided");

    console.log('[CANCEL-CIRCUIT-DESIGN] Cancelling job:', jobId);

    // Verify user owns the job (use authenticated client for RLS)
    const { data: job, error: jobError } = await authenticatedClient
      .from('circuit_design_jobs')
      .select('id, user_id, status')
      .eq('id', jobId)
      .single();

    if (jobError || !job) {
      throw new Error("Job not found");
    }

    if (job.user_id !== user.id) {
      throw new Error("Unauthorized: You do not own this job");
    }

    // Check if job can be cancelled
    if (job.status === 'complete') {
      return new Response(JSON.stringify({ 
        success: false,
        message: "Job already completed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (job.status === 'failed') {
      return new Response(JSON.stringify({ 
        success: false,
        message: "Job already failed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (job.status === 'cancelled') {
      return new Response(JSON.stringify({ 
        success: false,
        message: "Job already cancelled" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Cancel the job (use authenticated client)
    const { error: updateError } = await authenticatedClient
      .from('circuit_design_jobs')
      .update({
        status: 'cancelled',
        completed_at: new Date().toISOString(),
        current_step: 'Generation cancelled by user',
        error_message: 'User cancelled generation'
      })
      .eq('id', jobId);

    if (updateError) {
      throw new Error(`Failed to cancel job: ${updateError.message}`);
    }

    console.log('[CANCEL-CIRCUIT-DESIGN] Job cancelled successfully:', jobId);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Job cancelled successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[CANCEL-CIRCUIT-DESIGN] ERROR:', errorMessage);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: errorMessage
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
