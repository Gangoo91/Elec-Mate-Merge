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

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

/** Human-readable certificate type labels */
const CERT_TYPE_LABELS: Record<string, string> = {
  'eicr': 'Electrical Installation Condition Report (EICR)',
  'eic': 'Electrical Installation Certificate (EIC)',
  'minor-works': 'Minor Electrical Installation Works Certificate',
  'fire-alarm': 'Fire Alarm Certificate',
  'emergency-lighting': 'Emergency Lighting Certificate',
  'pat-testing': 'PAT Testing Certificate',
  'ev-charging': 'EV Charging Installation Certificate',
  'solar-pv': 'Solar PV Installation Certificate',
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
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const in30Days = new Date(today);
    in30Days.setDate(in30Days.getDate() + 30);

    // Fetch certificates expiring within 30 days
    const { data: expiringCerts, error: queryError } = await supabase
      .from('certificate_expiry_reminders')
      .select(`
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
      `)
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
        JSON.stringify({ message: 'No eligible customers (notifications disabled or no email)', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const customerMap = new Map(eligibleCustomers.map(c => [c.id, c]));

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
      const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

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
        results.push({ certificate: cert.certificate_number, status: 'skipped', reason: 'already reminded' });
        continue;
      }

      // Rate limit: 24h between emails per certificate
      const lastSentTimestamps = [
        cert.client_email_30_day_sent_at,
        cert.client_email_14_day_sent_at,
        cert.client_email_7_day_sent_at,
      ].filter(Boolean).map(ts => new Date(ts as string).getTime());

      if (lastSentTimestamps.length > 0) {
        const mostRecentSend = Math.max(...lastSentTimestamps);
        const hoursSinceLastEmail = (today.getTime() - mostRecentSend) / (1000 * 60 * 60);
        if (hoursSinceLastEmail < 24) {
          skipped++;
          results.push({ certificate: cert.certificate_number, status: 'skipped', reason: 'rate limited (24h)' });
          continue;
        }
      }

      // Get electrician's company details for the "contact us" section
      let companyName = 'Your Electrician';
      let companyPhone = '';
      let companyEmail = '';

      const { data: company } = await supabase
        .from('company_profiles')
        .select('company_name, company_email, email, company_phone, phone, full_name')
        .eq('user_id', cert.user_id)
        .single();

      if (company) {
        companyName = company.company_name || company.full_name || 'Your Electrician';
        companyEmail = company.company_email || company.email || '';
        companyPhone = company.company_phone || company.phone || '';
      }

      const clientName = customer.name || cert.client_name || 'Valued Customer';
      const address = cert.installation_address || 'your property';
      const certLabel = CERT_TYPE_LABELS[reportType] || reportType.toUpperCase();

      const emailContent = generateClientExpiryEmail(
        reminderTier,
        clientName,
        address,
        cert.certificate_number,
        certLabel,
        daysUntilExpiry,
        cert.expiry_date,
        companyName,
        companyEmail,
        companyPhone
      );

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: `ElecMate <founder@elec-mate.com>`,
            reply_to: companyEmail || 'support@elec-mate.com',
            to: customer.email,
            subject: emailContent.subject,
            html: emailContent.html,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to send client reminder for ${cert.certificate_number}:`, errorText);
          results.push({ certificate: cert.certificate_number, status: 'failed', reason: errorText });
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
          recipient: customer.email
        });

        console.log(`Sent client ${reminderTier} reminder for ${cert.certificate_number} to ${customer.email}`);

      } catch (emailError: any) {
        console.error(`Error sending client reminder for ${cert.certificate_number}:`, emailError);
        results.push({ certificate: cert.certificate_number, status: 'error', reason: emailError.message });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalExpiring: expiringCerts.length,
        emailsSent,
        skipped,
        results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Client expiry reminders error:', error);
    await captureException(error, {
      functionName: 'send-client-expiry-reminders',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateClientExpiryEmail(
  tier: '30-day' | '14-day' | '7-day',
  clientName: string,
  address: string,
  certificateNumber: string,
  certTypeLabel: string,
  daysUntilExpiry: number,
  expiryDate: string,
  companyName: string,
  companyEmail: string,
  companyPhone: string
): { subject: string; html: string } {
  const formattedExpiry = new Date(expiryDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const configs = {
    '30-day': {
      subject: `Your ${certTypeLabel} is due for renewal`,
      title: 'Certificate Renewal Notice',
      titleColor: '#3b82f6',
      borderColor: 'rgba(59, 130, 246, 0.2)',
      bgGradient: 'rgba(59, 130, 246, 0.1)',
      badgeColor: '#3b82f6',
      badgeBg: 'rgba(59, 130, 246, 0.15)',
      badgeBorder: 'rgba(59, 130, 246, 0.3)',
      message: `Your electrical certificate for <strong>${address}</strong> is approaching its expiry date. To maintain compliance and ensure the continued safety of your installation, a re-inspection will be needed before it expires.`,
      cta: 'There is no need for immediate action, but we recommend getting in touch with your electrician in the coming weeks to arrange a convenient date.',
    },
    '14-day': {
      subject: `Reminder: Your ${certTypeLabel} expires in ${daysUntilExpiry} days`,
      title: 'Certificate Expiry Reminder',
      titleColor: '#f59e0b',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      bgGradient: 'rgba(245, 158, 11, 0.1)',
      badgeColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeBorder: 'rgba(245, 158, 11, 0.3)',
      message: `Your electrical certificate for <strong>${address}</strong> expires in just two weeks. A re-inspection is needed to keep your installation compliant and safe.`,
      cta: 'We recommend contacting your electrician soon to book your re-inspection before the certificate expires.',
    },
    '7-day': {
      subject: `Urgent: Your ${certTypeLabel} expires in ${daysUntilExpiry} days`,
      title: 'Urgent: Certificate Expiring Soon',
      titleColor: '#ef4444',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      bgGradient: 'rgba(239, 68, 68, 0.15)',
      badgeColor: '#ef4444',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      badgeBorder: 'rgba(239, 68, 68, 0.3)',
      message: `Your electrical certificate for <strong>${address}</strong> expires in less than a week. Once expired, your installation will no longer have a valid certificate.`,
      cta: 'Please contact your electrician as soon as possible to arrange an immediate re-inspection.',
    }
  };

  const config = configs[tier];

  // Build contact section
  let contactSection = '';
  if (companyEmail || companyPhone) {
    const contactLines = [];
    if (companyPhone) contactLines.push(`<p style="margin: 4px 0; font-size: 15px; color: #cbd5e1;">Phone: <a href="tel:${companyPhone}" style="color: #facc15; text-decoration: none;">${companyPhone}</a></p>`);
    if (companyEmail) contactLines.push(`<p style="margin: 4px 0; font-size: 15px; color: #cbd5e1;">Email: <a href="mailto:${companyEmail}" style="color: #facc15; text-decoration: none;">${companyEmail}</a></p>`);
    contactSection = `
      <tr>
        <td style="padding: 0 24px 32px 24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(250, 204, 21, 0.08); border-radius: 16px; border: 1px solid rgba(250, 204, 21, 0.15);">
            <tr>
              <td style="padding: 20px 24px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Contact Your Electrician</p>
                <p style="margin: 0 0 4px 0; font-size: 16px; color: #e2e8f0; font-weight: 600;">${companyName}</p>
                ${contactLines.join('')}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f172a;">
        <tr>
          <td align="center" style="padding: 48px 16px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 420px; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid ${config.borderColor};">

              <!-- Title -->
              <tr>
                <td align="center" style="padding: 48px 32px 12px 32px;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: ${config.titleColor}; line-height: 1.3;">${config.title}</h1>
                </td>
              </tr>

              <!-- Certificate Type Badge -->
              <tr>
                <td align="center" style="padding: 0 32px 12px 32px;">
                  <table role="presentation" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="background: ${config.badgeBg}; border: 1px solid ${config.badgeBorder}; border-radius: 12px; padding: 10px 20px;">
                        <span style="font-size: 14px; font-weight: 600; color: ${config.badgeColor};">${certTypeLabel}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Certificate Number -->
              <tr>
                <td align="center" style="padding: 0 32px 32px 32px;">
                  <table role="presentation" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="background: rgba(250, 204, 21, 0.15); border: 1px solid rgba(250, 204, 21, 0.3); border-radius: 12px; padding: 12px 24px;">
                        <span style="font-size: 15px; font-weight: 600; color: #facc15;">${certificateNumber}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Expiry Countdown -->
              <tr>
                <td style="padding: 0 24px 24px 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: ${config.bgGradient}; border-radius: 20px; border: 1px solid ${config.borderColor};">
                    <tr>
                      <td align="center" style="padding: 24px;">
                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px;">Expires In</p>
                        <p style="margin: 0; font-size: 42px; font-weight: 700; color: ${config.titleColor};">${daysUntilExpiry}</p>
                        <p style="margin: 4px 0 0 0; font-size: 16px; color: #94a3b8; font-weight: 500;">day${daysUntilExpiry === 1 ? '' : 's'}</p>
                        <p style="margin: 16px 0 0 0; font-size: 14px; color: #64748b;">${formattedExpiry}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Message -->
              <tr>
                <td style="padding: 0 32px 24px 32px;">
                  <p style="margin: 0; font-size: 17px; color: #e2e8f0; line-height: 1.6;">Dear ${clientName},</p>
                  <p style="margin: 20px 0 0 0; font-size: 16px; color: #94a3b8; line-height: 1.7;">${config.message}</p>
                  <p style="margin: 16px 0 0 0; font-size: 16px; color: #94a3b8; line-height: 1.7;">${config.cta}</p>
                </td>
              </tr>

              <!-- Contact Section -->
              ${contactSection}

              <!-- Reassurance -->
              <tr>
                <td style="padding: 0 32px 32px 32px;">
                  <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6;">
                    Regular electrical inspections help keep your property safe and ensure your installation meets current regulations. Your electrician will be happy to discuss the process and answer any questions.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 28px 32px; border-top: 1px solid rgba(148, 163, 184, 0.1);">
                  <p style="margin: 0; font-size: 13px; color: #64748b; text-align: center;">Sent on behalf of ${companyName}</p>
                  <p style="margin: 8px 0 0 0; font-size: 12px; color: #475569; text-align: center;">Powered by ElecMate</p>
                  <p style="margin: 12px 0 0 0; font-size: 11px; color: #334155; text-align: center;">You received this because your electrician has enabled certificate expiry reminders for you. If you believe this was sent in error, please contact your electrician directly.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return { subject: config.subject, html };
}
