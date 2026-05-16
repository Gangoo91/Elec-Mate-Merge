/**
 * Client Certificate Expiry Reminder Emails
 * Sends escalating reminders to CLIENTS (not electricians) about expiring certificates:
 * - 30 days: Professional notice
 * - 14 days: Reminder
 * - 7 days: Urgent warning
 *
 * Only sends to clients where:
 * - customers.client_notifications_enabled = true
 * - Customer has an email address
 *
 * Tracks via client_email_* columns (separate from engineer tracking)
 * Run via pg_cron daily or manually triggered
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import {
  buildCertExpiryReminderEmail,
  type ExpiryTier,
} from '../_shared/email-templates/cert-expiry-reminder.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

/** Short cert-type display names used in subject/hero. */
const CERT_TYPE_SHORT: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'fire-alarm': 'Fire Alarm',
  'emergency-lighting': 'Emergency Lighting',
  'pat-testing': 'PAT Testing',
  'ev-charging': 'EV Charging',
  'solar-pv': 'Solar PV',
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

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const in30Days = new Date(today);
    in30Days.setDate(in30Days.getDate() + 30);

    // Fetch certificates expiring within 30 days
    const { data: expiringCerts, error: queryError } = await supabase
      .from('certificate_expiry_reminders')
      .select(
        `
        id,
        user_id,
        report_id,
        certificate_number,
        client_name,
        installation_address,
        inspection_date,
        expiry_date,
        reminder_status,
        client_email_30_day_sent_at,
        client_email_14_day_sent_at,
        client_email_7_day_sent_at,
        reports!inner (
          report_type,
          property_type,
          customer_id
        )
      `
      )
      .not('reminder_status', 'in', '("completed","cancelled")')
      .gte('expiry_date', today.toISOString().split('T')[0])
      .lte('expiry_date', in30Days.toISOString().split('T')[0]);

    if (queryError) {
      console.error('Error fetching expiring certificates:', queryError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch certificates', details: queryError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!expiringCerts || expiringCerts.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No certificates expiring within 30 days', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Collect unique customer IDs and check which have notifications enabled
    const customerIds = new Set<string>();
    for (const cert of expiringCerts) {
      const customerId = (cert as any).reports?.customer_id;
      if (customerId) customerIds.add(customerId);
    }

    if (customerIds.size === 0) {
      return new Response(
        JSON.stringify({ message: 'No certificates linked to customers', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch customers with notifications enabled and email present
    const { data: eligibleCustomers } = await supabase
      .from('customers')
      .select('id, name, email, client_notifications_enabled')
      .in('id', Array.from(customerIds))
      .eq('client_notifications_enabled', true)
      .not('email', 'is', null);

    if (!eligibleCustomers || eligibleCustomers.length === 0) {
      return new Response(
        JSON.stringify({
          message: 'No eligible customers (notifications disabled or no email)',
          processed: 0,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const customerMap = new Map(eligibleCustomers.map((c) => [c.id, c]));

    let emailsSent = 0;
    let skipped = 0;
    const results: any[] = [];

    for (const cert of expiringCerts) {
      const reportData = (cert as any).reports;
      const customerId = reportData?.customer_id;
      const customer = customerId ? customerMap.get(customerId) : null;

      if (!customer) {
        skipped++;
        continue;
      }

      const reportType = reportData?.report_type || 'eicr';
      const expiryDate = new Date(cert.expiry_date);
      const daysUntilExpiry = Math.floor(
        (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Determine reminder tier
      let reminderTier: '30-day' | '14-day' | '7-day' | null = null;
      let sentAtField: string | null = null;

      if (daysUntilExpiry <= 7 && !cert.client_email_7_day_sent_at) {
        reminderTier = '7-day';
        sentAtField = 'client_email_7_day_sent_at';
      } else if (daysUntilExpiry <= 14 && !cert.client_email_14_day_sent_at) {
        reminderTier = '14-day';
        sentAtField = 'client_email_14_day_sent_at';
      } else if (daysUntilExpiry <= 30 && !cert.client_email_30_day_sent_at) {
        reminderTier = '30-day';
        sentAtField = 'client_email_30_day_sent_at';
      }

      if (!reminderTier || !sentAtField) {
        skipped++;
        results.push({
          certificate: cert.certificate_number,
          status: 'skipped',
          reason: 'already reminded',
        });
        continue;
      }

      // Rate limit: 24h between emails per certificate
      const lastSentTimestamps = [
        cert.client_email_30_day_sent_at,
        cert.client_email_14_day_sent_at,
        cert.client_email_7_day_sent_at,
      ]
        .filter(Boolean)
        .map((ts) => new Date(ts as string).getTime());

      if (lastSentTimestamps.length > 0) {
        const mostRecentSend = Math.max(...lastSentTimestamps);
        const hoursSinceLastEmail = (today.getTime() - mostRecentSend) / (1000 * 60 * 60);
        if (hoursSinceLastEmail < 24) {
          skipped++;
          results.push({
            certificate: cert.certificate_number,
            status: 'skipped',
            reason: 'rate limited (24h)',
          });
          continue;
        }
      }

      // Get full electrician profile so the email is fully branded
      // (logo, primary colour, address, VAT, registration) — matches
      // every other client-facing email in the system.
      const { data: company } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', cert.user_id)
        .single();

      const companyName =
        company?.company_name || company?.full_name || 'Your Electrician';
      const companyEmail =
        company?.company_email || company?.email || '';

      const clientName = customer.name || cert.client_name || 'Valued Customer';
      const address = cert.installation_address || null;
      const certLabel = CERT_TYPE_SHORT[reportType] || reportType.toUpperCase();

      const emailContent = buildCertExpiryReminderEmail({
        company: {
          name: companyName,
          logoUrl: company?.logo_url || company?.logo_data_url || null,
          primaryColor: company?.primary_color || null,
          email: companyEmail || null,
          phone: company?.company_phone || company?.phone || null,
          website: company?.company_website || null,
          address: company?.company_address || null,
          vatNumber: company?.vat_number || null,
          registrationNumber: company?.company_registration || null,
        },
        clientName,
        certificateType: certLabel,
        certificateNumber: cert.certificate_number,
        installationAddress: address,
        expiryDate: cert.expiry_date,
        daysUntilExpiry,
        tier: reminderTier as ExpiryTier,
        bookingUrl: null,
      });

      try {
        // ELE-662 — DMARC-aligned sender via the shared helper.
        const resend = new Resend(resendApiKey);
        const sender = clientFacingSender({
          companyName,
          companyEmail: companyEmail || undefined,
        });
        const { error: emailError } = await resend.emails.send({
          ...sender,
          to: customer.email,
          subject: emailContent.subject,
          html: emailContent.html,
          text: htmlToPlainText(emailContent.html),
        });

        if (emailError) {
          console.error(
            `Failed to send client reminder for ${cert.certificate_number}:`,
            emailError.message
          );
          results.push({
            certificate: cert.certificate_number,
            status: 'failed',
            reason: emailError.message,
          });
          continue;
        }

        // Update tracking timestamp
        await supabase
          .from('certificate_expiry_reminders')
          .update({
            [sentAtField]: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', cert.id);

        emailsSent++;
        results.push({
          certificate: cert.certificate_number,
          status: 'sent',
          tier: reminderTier,
          daysUntilExpiry,
          recipient: customer.email,
        });

        console.log(
          `Sent client ${reminderTier} reminder for ${cert.certificate_number} to ${customer.email}`
        );
      } catch (emailError: any) {
        console.error(`Error sending client reminder for ${cert.certificate_number}:`, emailError);
        results.push({
          certificate: cert.certificate_number,
          status: 'error',
          reason: emailError.message,
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalExpiring: expiringCerts.length,
        emailsSent,
        skipped,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Client expiry reminders error:', error);
    await captureException(error, {
      functionName: 'send-client-expiry-reminders',
      requestUrl: req.url,
      requestMethod: req.method,
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=cert_expiry&id=${cert.id}`,
    });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
