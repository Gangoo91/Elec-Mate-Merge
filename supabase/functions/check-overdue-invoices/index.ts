// Check Overdue Invoices Edge Function
// Runs daily via pg_cron to check for overdue invoices and send notifications
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const today = new Date().toISOString().split('T')[0];

    // Find invoices that are overdue (due_date < today and not paid)
    const { data: overdueInvoices, error: queryError } = await supabase
      .from('invoices')
      .select('id, invoice_number, client, amount, due_date, status, created_by')
      .lt('due_date', today)
      .neq('status', 'Paid')
      .neq('status', 'Cancelled');

    if (queryError) {
      console.error('Error fetching overdue invoices:', queryError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch invoices' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!overdueInvoices || overdueInvoices.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No overdue invoices found', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let notificationsSent = 0;
    let statusesUpdated = 0;

    for (const invoice of overdueInvoices) {
      // Update status to Overdue if not already
      if (invoice.status !== 'Overdue') {
        await supabase
          .from('invoices')
          .update({ status: 'Overdue', updated_at: new Date().toISOString() })
          .eq('id', invoice.id);
        statusesUpdated++;
      }

      // Send push notification to invoice creator
      if (invoice.created_by) {
        // Calculate days overdue
        const dueDate = new Date(invoice.due_date);
        const todayDate = new Date(today);
        const daysOverdue = Math.floor((todayDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

        const daysText = daysOverdue === 1 ? '1 day' : `${daysOverdue} days`;

        try {
          // Check if we've already notified about this invoice today
          // to avoid spam (using a simple approach - check notification_logs if exists)
          const { data: recentNotification } = await supabase
            .from('notification_logs')
            .select('id')
            .eq('invoice_id', invoice.id)
            .eq('notification_type', 'overdue')
            .gte('created_at', today)
            .maybeSingle();

          // Skip if already notified today
          if (recentNotification) {
            continue;
          }

          // Send the push notification
          await supabase.functions.invoke('send-push-notification', {
            body: {
              userId: invoice.created_by,
              title: '⚠️ Invoice Overdue',
              body: `Invoice #${invoice.invoice_number} for ${invoice.client} (£${typeof invoice.amount === 'number' && !isNaN(invoice.amount) ? invoice.amount.toFixed(2) : '0.00'}) is ${daysText} overdue`,
              type: 'invoice',
              data: {
                invoiceId: invoice.id,
                status: 'overdue',
                daysOverdue,
              },
            },
          });

          // Log the notification (if table exists)
          await supabase
            .from('notification_logs')
            .insert({
              invoice_id: invoice.id,
              notification_type: 'overdue',
              user_id: invoice.created_by,
            })
            .catch(() => {
              // Table might not exist, that's fine
            });

          notificationsSent++;
        } catch (notifyError) {
          console.error(`Failed to notify for invoice ${invoice.id}:`, notifyError);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        overdueCount: overdueInvoices.length,
        statusesUpdated,
        notificationsSent,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Check overdue invoices error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
