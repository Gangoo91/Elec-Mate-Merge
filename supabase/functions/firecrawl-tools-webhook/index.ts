import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CATEGORY_MAPPING: Record<string, string> = {
  'Hand Tools - Screwfix': 'Hand Tools',
  'Hand Tools - Toolstation': 'Hand Tools',
  'Test Equipment - Screwfix': 'Test Equipment',
  'Test Equipment - Toolstation': 'Test Equipment',
  'Power Tools - Screwfix': 'Power Tools',
  'Power Tools - Toolstation': 'Power Tools',
  'PPE - Screwfix': 'PPE',
  'PPE - Toolstation': 'PPE',
  'Specialist Tools - Screwfix': 'Specialist Tools',
  'Specialist Tools - Toolstation': 'Specialist Tools',
  'Tool Storage - Screwfix': 'Tool Storage',
  'Tool Storage - Toolstation': 'Tool Storage',
  'Safety Tools - Screwfix': 'Safety Tools',
  'Safety Tools - Toolstation': 'Safety Tools',
  'Access Tools & Equipment - Screwfix': 'Access Tools & Equipment',
  'Access Tools & Equipment - Toolstation': 'Access Tools & Equipment',
};

function intelligentlyCategorize(toolName: string, toolDescription: string, category: string, batchCategory: string): string {
  const name = toolName.toLowerCase();
  const cat = category.toLowerCase();
  const desc = (toolDescription || '').toLowerCase();
  
  if (name.includes('multimeter') || name.includes('tester') || name.includes('test lead') || 
      name.includes('meter') || name.includes('clamp meter') || name.includes('voltage') ||
      name.includes('socket tester') || name.includes('proving unit') || name.includes('test lamp') || cat.includes("test")) {
    return 'Test Equipment';
  }
  
  if (name.includes('plier') || name.includes('screwdriver') || name.includes('wire stripper') ||
      name.includes('cable cutter') || name.includes('spanner') || name.includes('wrench') ||
      name.includes('crimper') || name.includes('vde') || name.includes('side cutter') ||
      name.includes('stripping') || name.includes('snips') || name.includes('knife') || cat.includes("hand")) {
    return 'Hand Tools';
  }
  
  if (name.includes('drill') || name.includes('cordless') || name.includes('18v') || 
      name.includes('impact driver') || name.includes('grinder') || name.includes('saw') ||
      name.includes('sds') || name.includes('battery pack') || name.includes('combi') ||
      name.includes('makita') || name.includes('dewalt') || name.includes('brushless') || cat.includes("power")) {
    return 'Power Tools';
  }
  
  if (name.includes('tool bag') || name.includes('tool box') || name.includes('case') ||
      name.includes('storage') || name.includes('organiser') || name.includes('toughsystem') ||
      name.includes('key safe') || name.includes('with wheels') || name.includes('toolbox') ||
      name.includes('tote') || name.includes('organizer') || cat.includes("storage")) {
    return 'Tool Storage';
  }
  
  if (name.includes('helmet') || name.includes('gloves') || name.includes('safety') ||
      name.includes('protective') || name.includes('harness') || name.includes('glasses') ||
      name.includes('boots') || name.includes('hi-vis') || name.includes('vest') || cat.includes("safety")) {
    return 'Safety Tools';
  }

  if (name.includes('helmet') || name.includes('gloves') || name.includes('workwear') ||
      name.includes('glasses') ||
      name.includes('boots') || name.includes('vest') || name.includes('personal protective equipment') || cat.includes("PPE")) {
    return 'Safety Tools';
  }
  
  if (name.includes('ladder') || name.includes('steps') || name.includes('platform') ||
      name.includes('scaffold') || name.includes('stepladder') || name.includes('extension ladder') || cat.includes("access")) {
    return 'Access Tools & Equipment';
  }
  
  if (name.includes('cable puller') || name.includes('fish tape') || name.includes('bender') ||
      name.includes('cable rod') || name.includes('conduit') || name.includes('knockout') || cat.includes("specialist")) {
    return 'Specialist Tools';
  }
  
  return batchCategory;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const webhook = await req.json();
    
    console.log('🔔 Webhook received:', webhook);

    if (webhook.status !== 'completed') {
      console.log(`⏳ Job status: ${webhook.status}`);
      return new Response(JSON.stringify({ success: true, status: webhook.status }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Find the queue entry for this job
    const { data: queueEntry, error: queueError } = await supabase
      .from('tools_scrape_queue')
      .select('*')
      .eq('firecrawl_job_id', webhook.id)
      .single();

    if (queueError || !queueEntry) {
      console.error('❌ Queue entry not found for job:', webhook.id);
      return new Response(JSON.stringify({ success: false, error: 'Queue entry not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`✅ Processing completed batch ${queueEntry.batch_number}`);

    const urls = queueEntry.urls;
    const batchNumber = queueEntry.batch_number;

    // Group tools by intelligently categorized categories
    const toolsByCategory: Record<string, any[]> = {};
    
    webhook.data?.forEach((result: any, index: number) => {
      const urlName = urls[index]?.name || 'Unknown';
      const batchCategory = CATEGORY_MAPPING[urlName] || urlName;
      const products = result.extract?.products || [];

      console.log(`📦 URL ${index + 1} (${urlName}): ${products.length} products`);

      products.forEach((product: any) => {
        const intelligentCategory = intelligentlyCategorize(
          product.name || '', 
          product.description || '',
          product.category || '',
          batchCategory
        );

        if (!toolsByCategory[intelligentCategory]) {
          toolsByCategory[intelligentCategory] = [];
        }

        toolsByCategory[intelligentCategory].push({
          ...product,
          category: intelligentCategory,
          supplier: urlName.includes('Screwfix') ? 'Screwfix' : 'Toolstation',
          view_product_url: product.view_product_url || product.productUrl,
          id: Math.floor(Math.random() * 1000000)
        });
      });
    });

    // Store each category in tools_weekly_cache (merge with existing)
    let totalTools = 0;
    const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    for (const [category, tools] of Object.entries(toolsByCategory)) {
      const { data: existing } = await supabase
        .from('tools_weekly_cache')
        .select('tools_data')
        .eq('category', category)
        .single();

      const existingTools = existing?.tools_data || [];
      const mergedTools = [...existingTools, ...tools];

      const uniqueTools = mergedTools.reduce((acc: any[], tool: any) => {
        const exists = acc.find((t: any) => t.view_product_url === tool.view_product_url);
        if (!exists) {
          acc.push(tool);
        }
        return acc;
      }, []);

      await supabase.from('tools_weekly_cache').upsert({
        category,
        tools_data: uniqueTools,
        total_products: uniqueTools.length,
        expires_at: expiresAt,
        update_status: 'completed',
        last_updated: new Date().toISOString()
      }, { onConflict: 'category' });

      totalTools += tools.length;
      console.log(`💾 Stored ${tools.length} tools for ${category} (Total: ${uniqueTools.length} unique)`);
    }

    // Update queue status
    await supabase.from('tools_scrape_queue')
      .update({
        status: 'completed',
        tools_found: totalTools,
        completed_at: new Date().toISOString()
      })
      .eq('firecrawl_job_id', webhook.id);

    console.log(`✅ Batch ${batchNumber} complete: ${totalTools} tools stored`);

    // Auto-trigger next batch if not the last one
    if (batchNumber < 4) {
      console.log(`🚀 Auto-triggering batch ${batchNumber + 1}...`);
      
      await fetch(`${SUPABASE_URL}/functions/v1/firecrawl-v2-tools-batch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ batchNumber: batchNumber + 1 })
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      toolsStored: totalTools,
      batchNumber 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
