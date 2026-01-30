/**
 * Cost Engineer V3 - Simplified Edge Function
 * Pattern: Same as installation-method-agent (JSON response, no SSE)
 * Business logic in: _agents/cost-engineer-core.ts
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateCostEstimate } from '../_agents/cost-engineer-core.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Authenticate user
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

    // Parse request body
    const { 
      query, 
      region, 
      projectContext, 
      businessSettings, 
      skipProfitability 
    } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('💷 Cost Engineer called', {
      userId: user.id,
      query: query.substring(0, 100),
      region,
      projectType: projectContext?.projectType
    });

    // Generate cost estimate using core logic
    const result = await generateCostEstimate(supabase, {
      query,
      region,
      projectContext,
      businessSettings,
      skipProfitability
    });

    console.log('✅ Cost estimate generated', {
      materials: result.materials.items.length,
      labourTasks: result.labour.tasks.length,
      totalCost: result.summary.grandTotal
    });

    // Return JSON response (no SSE)
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          originalQuery: query,
          structuredData: result,
          response: formatTextSummary(result)
        }
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('❌ Error in cost-engineer-v3:', error);

    // Capture to Sentry
    await captureException(error, {
      functionName: 'cost-engineer-v3',
      requestUrl: req.url,
      requestMethod: req.method
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        details: error.stack
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Format structured data into text summary for backwards compatibility
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
