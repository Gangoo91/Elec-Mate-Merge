// Check Overdue Invoices Edge Function
// Runs daily via pg_cron to mark overdue invoices in the invoices table.
// Push notifications for overdue invoices are handled by daily-notification-digest
// to avoid duplicate notifications.
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const today = new Date().toISOString().split('T')[0];

    // Find invoices that are overdue and not yet marked as such.
    // Uses correct column names for the invoices table:
    //   user_id (not created_by), client_data jsonb (not client), total (not amount)
    const { data: overdueInvoices, error: queryError } = await supabase
      .from('invoices')
      .select('id, invoice_number, client_data, total, due_date, status, user_id')
      .lt('due_date', today)
      .not('status', 'in', '("Paid","paid","Cancelled","cancelled","Overdue","overdue")');

    if (queryError) {
      console.error('Error fetching overdue invoices:', queryError);
      return new Response(JSON.stringify({ error: 'Failed to fetch invoices' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!overdueInvoices || overdueInvoices.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No invoices to mark overdue', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let statusesUpdated = 0;

    for (const invoice of overdueInvoices) {
      // Mark as Overdue — push notifications are sent by daily-notification-digest
      const { error: updateError } = await supabase
        .from('invoices')
        .update({ status: 'Overdue', updated_at: new Date().toISOString() })
        .eq('id', invoice.id);

      if (updateError) {
        console.error(`Failed to update invoice ${invoice.id}:`, updateError);
      } else {
        statusesUpdated++;
      }
    }

    console.log(`[check-overdue-invoices] Marked ${statusesUpdated} invoices as Overdue`);

    return new Response(
      JSON.stringify({
        success: true,
        overdueFound: overdueInvoices.length,
        statusesUpdated,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Check overdue invoices error:', error);
    await captureException(error instanceof Error ? error : new Error(String(error)), {
      functionName: 'check-overdue-invoices',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
