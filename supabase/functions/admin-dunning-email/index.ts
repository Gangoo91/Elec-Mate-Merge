/**
 * Admin Dunning Email — Manual email sends + resolve
 *
 * Actions:
 *   send_next  — Send next dunning email for a record, bypassing timing gates
 *   resolve    — Mark a record as resolved
 *
 * Auth: JWT → profiles.admin_role check
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend } from '../_shared/mailer.ts';
import { renderDunningEmail } from '../_shared/email-templates/dunning.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// ─── Email 1 — Immediate "Payment Issue" ─────────────────────────────────────

function generateEmail1Html(name: string, amount: string, hostedInvoiceUrl: string): string {
  return renderDunningEmail({ name, amount, payUrl: hostedInvoiceUrl, tone: 'failed' }).html;
}

// ─── Email 2 — 3-day "Payment Overdue" ───────────────────────────────────────

function generateEmail2Html(name: string, amount: string, hostedInvoiceUrl: string): string {
  return renderDunningEmail({ name, amount, payUrl: hostedInvoiceUrl, tone: 'overdue' }).html;
}

// ─── Email 3 — 7-day "Final Notice" ──────────────────────────────────────────

function generateEmail3Html(name: string, amount: string, hostedInvoiceUrl: string): string {
  return renderDunningEmail({ name, amount, payUrl: hostedInvoiceUrl, tone: 'final' }).html;
}

// ─── Email subjects ──────────────────────────────────────────────────────────

const EMAIL_SUBJECTS: Record<number, string> = {
  1: "Your Elec-Mate payment didn't go through",
  2: 'Your Elec-Mate payment is overdue',
  3: 'Final notice — your Elec-Mate subscription',
};

const EMAIL_GENERATORS: Record<number, (name: string, amount: string, url: string) => string> = {
  1: generateEmail1Html,
  2: generateEmail2Html,
  3: generateEmail3Html,
};

// ─── Main handler ────────────────────────────────────────────────────────────

serve(async (req: Request) => {
  const requestId = req.headers.get('x-request-id') || generateRequestId();
  const logger = createLogger(requestId, { function: 'admin-dunning-email' });

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

    // ── Verify admin auth ──────────────────────────────────────────────────
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create an anon client to verify the user's JWT
    const supabaseAnon = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY') as string, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabaseAnon.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check admin role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: adminProfile } = await supabase
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();

    if (!adminProfile?.admin_role) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Parse body ─────────────────────────────────────────────────────────
    const body = await req.json();
    const { action, recordId } = body as { action: string; recordId: string };

    if (!action || !recordId) {
      return new Response(JSON.stringify({ error: 'Missing action or recordId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Action: resolve ────────────────────────────────────────────────────
    if (action === 'resolve') {
      const { data: updated, error: resolveError } = await supabase
        .from('failed_payment_emails')
        .update({ resolved: true, resolved_at: new Date().toISOString() })
        .eq('id', recordId)
        .select()
        .single();

      if (resolveError) {
        logger.error('Failed to resolve record', { recordId, error: resolveError.message });
        return new Response(
          JSON.stringify({ error: 'Failed to resolve', details: resolveError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      logger.info('Record resolved by admin', { recordId, adminUserId: user.id });

      return new Response(JSON.stringify({ success: true, record: updated }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId },
      });
    }

    // ── Action: send_next ──────────────────────────────────────────────────
    if (action === 'send_next') {
      // Fetch current record
      const { data: record, error: fetchError } = await supabase
        .from('failed_payment_emails')
        .select('*')
        .eq('id', recordId)
        .single();

      if (fetchError || !record) {
        return new Response(JSON.stringify({ error: 'Record not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (record.resolved) {
        return new Response(JSON.stringify({ error: 'Record is already resolved' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (record.emails_sent >= 3) {
        return new Response(JSON.stringify({ error: 'All 3 emails already sent' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const nextEmailNumber = (record.emails_sent as number) + 1;

      // Optimistic lock: prevent race with cron job
      const { data: locked, error: lockError } = await supabase
        .from('failed_payment_emails')
        .update({ emails_sent: nextEmailNumber })
        .eq('id', recordId)
        .eq('emails_sent', record.emails_sent)
        .select()
        .single();

      if (lockError || !locked) {
        return new Response(
          JSON.stringify({ error: 'Record was modified concurrently — please refresh and retry' }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get user email
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(
        record.user_id
      );

      if (userError || !userData?.user?.email) {
        logger.error('Could not get user email', {
          userId: record.user_id,
          error: userError?.message,
        });
        // Roll back emails_sent
        await supabase
          .from('failed_payment_emails')
          .update({ emails_sent: record.emails_sent })
          .eq('id', recordId);

        return new Response(JSON.stringify({ error: 'Could not find user email' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Get user name from profiles
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', record.user_id)
        .single();

      const userName =
        userProfile?.full_name ||
        userData.user.user_metadata?.full_name ||
        userData.user.user_metadata?.name ||
        userData.user.email!.split('@')[0];

      // Format amount
      const amountFormatted = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format((record.amount_due || 0) / 100);

      const payUrl = record.hosted_invoice_url || 'https://www.elec-mate.com/subscriptions';

      // Send email via Resend
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        // Roll back
        await supabase
          .from('failed_payment_emails')
          .update({ emails_sent: record.emails_sent })
          .eq('id', recordId);

        return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const resend = new Resend(resendApiKey);

      const htmlGenerator = EMAIL_GENERATORS[nextEmailNumber];
      const subject = EMAIL_SUBJECTS[nextEmailNumber];

      const { error: sendError } = await resend.emails.send({
        from: 'ElecMate <founder@elec-mate.com>',
        replyTo: 'founder@elec-mate.com',
        to: [userData.user.email!],
        subject,
        html: htmlGenerator(userName, amountFormatted, payUrl),
      });

      if (sendError) {
        logger.error('Resend send failed', {
          recordId,
          emailNumber: nextEmailNumber,
          error: JSON.stringify(sendError),
        });
        // Roll back
        await supabase
          .from('failed_payment_emails')
          .update({ emails_sent: record.emails_sent })
          .eq('id', recordId);

        return new Response(JSON.stringify({ error: 'Failed to send email', details: sendError }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Set sent_at timestamp
      const timestampField = `email_${nextEmailNumber}_sent_at`;
      await supabase
        .from('failed_payment_emails')
        .update({ [timestampField]: new Date().toISOString() })
        .eq('id', recordId);

      // Re-fetch the fully updated record
      const { data: updatedRecord } = await supabase
        .from('failed_payment_emails')
        .select('*')
        .eq('id', recordId)
        .single();

      logger.info('Admin dunning email sent', {
        recordId,
        emailNumber: nextEmailNumber,
        adminUserId: user.id,
        recipientEmail: userData.user.email,
      });

      return new Response(
        JSON.stringify({ success: true, emailNumber: nextEmailNumber, record: updatedRecord }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'x-request-id': requestId,
          },
        }
      );
    }

    // ── Unknown action ─────────────────────────────────────────────────────
    return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    logger.error('Admin dunning email error', { error: (error as Error).message });
    await captureException(error, {
      functionName: 'admin-dunning-email',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId },
    });
  }
});
