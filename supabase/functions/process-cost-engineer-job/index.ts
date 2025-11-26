import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateCostEstimate } from '../_agents/cost-engineer-core.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { jobId } = await req.json();

    console.log(`[PROCESS-COST] Starting job: ${jobId}`);

    // Fetch job details
    const { data: job, error: fetchError } = await supabase
      .from('cost_engineer_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      console.error('[PROCESS-COST] Job not found:', jobId);
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update status to processing
    await supabase
      .from('cost_engineer_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        progress: 5,
        current_step: 'Initializing cost analysis...'
      })
      .eq('id', jobId);

    try {
      // Progress: 25% - Gathering market data
      await supabase
        .from('cost_engineer_jobs')
        .update({
          progress: 25,
          current_step: 'Gathering regional pricing data...'
        })
        .eq('id', jobId);

      // Call the core cost estimation logic directly
      console.log('[PROCESS-COST] Generating cost estimate...');
      const result = await generateCostEstimate(supabase, {
        query: job.query,
        region: job.region,
        projectContext: job.project_context,
        businessSettings: job.business_settings
      });

      // Progress: 70% - Analyzing results
      await supabase
        .from('cost_engineer_jobs')
        .update({
          progress: 70,
          current_step: 'Analyzing cost breakdown...'
        })
        .eq('id', jobId);

      // Format response to match expected structure
      const outputData = {
        originalQuery: job.query,
        structuredData: result,
        response: formatTextSummary(result)
      };

      // Progress: 100% - Complete
      await supabase
        .from('cost_engineer_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Cost analysis complete',
          output_data: outputData,
          raw_response: result,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      console.log(`[PROCESS-COST] ✅ Job completed: ${jobId}`);

      return new Response(
        JSON.stringify({ success: true, jobId }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (processingError: any) {
      console.error('[PROCESS-COST] Error processing job:', processingError);

      // Update job with error
      await supabase
        .from('cost_engineer_jobs')
        .update({
          status: 'failed',
          error_message: processingError.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      return new Response(
        JSON.stringify({ error: processingError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error: any) {
    console.error('[PROCESS-COST] Fatal error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Format structured data into text summary
 */
function formatTextSummary(result: any): string {
  let text = '# COST ESTIMATE\n\n';
  
  text += '## MATERIALS\n';
  result.materials.items.forEach((item: any) => {
    text += `• ${item.description} (${item.quantity} ${item.unit}) - £${item.total.toFixed(2)} from ${item.supplier}\n`;
  });
  text += `\nSubtotal Materials: £${result.materials.subtotal.toFixed(2)}\n\n`;
  
  text += '## LABOUR\n';
  result.labour.tasks.forEach((task: any) => {
    text += `• ${task.description} - ${task.hours} hours @ £${task.rate}/hr = £${task.total.toFixed(2)}\n`;
  });
  text += `\nSubtotal Labour: £${result.labour.subtotal.toFixed(2)}\n\n`;
  
  text += '## PROJECT TOTAL\n';
  text += `Materials: £${result.summary.materialsSubtotal.toFixed(2)}\n`;
  text += `Labour: £${result.summary.labourSubtotal.toFixed(2)}\n`;
  text += `Subtotal: £${result.summary.subtotal.toFixed(2)}\n`;
  text += `VAT (20%): £${result.summary.vat.toFixed(2)}\n`;
  text += `**FINAL QUOTE: £${result.summary.grandTotal.toFixed(2)}**\n`;
  
  return text;
}
