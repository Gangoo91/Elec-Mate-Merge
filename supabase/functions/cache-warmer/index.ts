/**
 * Cache Warmer - Predictive cache population
 * Runs periodically to warm cache with common queries
 */

import { serve } from '../_shared/deps.ts';
import { createClient } from '../_shared/deps.ts';
import { corsHeaders } from '../_shared/v3-core.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('🔥 Cache warmer started...');

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Top 50 most common queries (from analytics)
  const COMMON_QUERIES = [
    "9.5kW shower 15m from board",
    "Consumer unit change 10 way",
    "Socket circuit ring final",
    "Bathroom lighting IP rating",
    "EV charger 7kW installation",
    "Cable sizing for 10kW cooker",
    "RCD requirements domestic",
    "Earth bonding regulations",
    "Voltage drop calculation",
    "MCB selection guide",
    "Three phase installation",
    "Outdoor socket requirements",
    "Garage supply regulations",
    "Kitchen ring circuit",
    "Smoke alarm requirements",
    "Periodic inspection intervals",
    "EICR codes explained",
    "Testing procedures sequence",
    "Zs values for MCBs",
    "Cable colours new regulations"
  ];

  let warmed = 0;
  let failed = 0;

  for (const query of COMMON_QUERIES) {
    try {
      console.log(`Warming cache for: ${query}`);
      
      // Call designer agent to populate cache
      const { error } = await supabase.functions.invoke('designer-v3', {
        body: { 
          query, 
          systemContext: { cacheWarming: true } 
        }
      });

      if (error) {
        console.error(`Failed: ${query}`, error);
        failed++;
      } else {
        warmed++;
      }

      // Rate limit: 1 request per second
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`Error warming cache for: ${query}`, error);
      failed++;
    }
  }

  console.log(`✅ Cache warming complete: ${warmed} warmed, ${failed} failed`);

  return new Response(
    JSON.stringify({ 
      success: true,
      warmed, 
      failed,
      total: COMMON_QUERIES.length
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
