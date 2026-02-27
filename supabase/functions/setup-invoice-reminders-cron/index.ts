/**
 * One-shot setup function: registers the daily-invoice-reminders pg_cron job.
 * Call once after deployment. Safe to call multiple times (unschedules first).
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    );

    // Unschedule existing job (safe if not present)
    await supabase.rpc('unschedule_invoice_reminders_cron').maybeSingle();

    // Schedule daily at 9am UTC
    const { data, error } = await supabase.rpc('schedule_invoice_reminders_cron');

    if (error) {
      // Fall back to direct SQL via pg_net approach
      const { error: sqlError } = await supabase.from('_cron_setup').select('*').limit(1);

      // Last resort: return instructions
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          instructions: 'Run this SQL in the Supabase dashboard SQL editor:\n\n' +
            "SELECT cron.unschedule('daily-invoice-reminders') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'daily-invoice-reminders');\n" +
            "SELECT cron.schedule('daily-invoice-reminders', '0 9 * * *', $$select net.http_post(url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/automated-invoice-reminders', headers:='{\"Content-Type\": \"application/json\", \"Authorization\": \"Bearer " + Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') + "\"}'::jsonb, body:='{}'::jsonb);$$);"
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'daily-invoice-reminders cron job active', data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
