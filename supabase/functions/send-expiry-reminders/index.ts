/**
 * Certificate Expiry Reminder Emails
 * Sends escalating reminders for certificates approaching expiry:
 * - 30 days: Informational notice
 * - 14 days: Reminder
 * - 7 days: Urgent warning
 *
 * Run via pg_cron daily or manually triggered
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface ExpiryReminder {
  id: string;
  user_id: string;
  report_id: string;
  certificate_number: string;
  client_name: string | null;
  installation_address: string | null;
  inspection_date: string | null;
  expiry_date: string;
  reminder_status: string;
  contacted_at: string | null;
  notes: string | null;
  // Joined from reports
  report_type: string | null;
  property_type: string | null;
  // Email tracking fields (added by this migration context)
  email_30_day_sent_at: string | null;
  email_14_day_sent_at: string | null;
  email_7_day_sent_at: string | null;
}

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

    // Calculate the date thresholds
    const in30Days = new Date(today);
    in30Days.setDate(in30Days.getDate() + 30);

    const in14Days = new Date(today);
    in14Days.setDate(in14Days.getDate() + 14);

    const in7Days = new Date(today);
    in7Days.setDate(in7Days.getDate() + 7);

    // Find certificates expiring within 30 days that have not been completed/cancelled
    // Join with reports to get report_type and property_type
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
        contacted_at,
        notes,
        email_30_day_sent_at,
        email_14_day_sent_at,
        email_7_day_sent_at,
        reports!inner (
          report_type,
          property_type
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

    let emailsSent = 0;
    let skipped = 0;
    const results: any[] = [];

    for (const cert of expiringCerts) {
      // Extract joined report data
      const reportData = (cert as any).reports;
      const reportType = reportData?.report_type || 'eicr';
      const propertyType = reportData?.property_type || 'domestic';

      const expiryDate = new Date(cert.expiry_date);
      const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      // Determine which tier of reminder to send
      let reminderTier: '30-day' | '14-day' | '7-day' | null = null;
      let sentAtField: string | null = null;

      if (daysUntilExpiry <= 7 && !cert.email_7_day_sent_at) {
        reminderTier = '7-day';
        sentAtField = 'email_7_day_sent_at';
      } else if (daysUntilExpiry <= 14 && !cert.email_14_day_sent_at) {
        reminderTier = '14-day';
        sentAtField = 'email_14_day_sent_at';
      } else if (daysUntilExpiry <= 30 && !cert.email_30_day_sent_at) {
        reminderTier = '30-day';
        sentAtField = 'email_30_day_sent_at';
      }

      if (!reminderTier || !sentAtField) {
        skipped++;
        results.push({
          certificate: cert.certificate_number,
          status: 'skipped',
          reason: 'already reminded at this tier'
        });
        continue;
      }

      // Rate limit: check the most recent email sent timestamp across all tiers
      const lastSentTimestamps = [
        cert.email_30_day_sent_at,
        cert.email_14_day_sent_at,
        cert.email_7_day_sent_at,
      ].filter(Boolean).map(ts => new Date(ts as string).getTime());

      if (lastSentTimestamps.length > 0) {
        const mostRecentSend = Math.max(...lastSentTimestamps);
        const hoursSinceLastEmail = (today.getTime() - mostRecentSend) / (1000 * 60 * 60);
        if (hoursSinceLastEmail < 24) {
          skipped++;
          results.push({
            certificate: cert.certificate_number,
            status: 'skipped',
            reason: 'rate limited (24h)'
          });
          continue;
        }
      }

      // Get the electrician's company profile (the user who owns the certificate)
      let companyName = 'Your Electrician';
      let companyEmail = 'info@elec-mate.com';
      let engineerName = 'Your Electrician';

      const { data: company } = await supabase
        .from('company_profiles')
        .select('company_name, company_email, email, full_name')
        .eq('user_id', cert.user_id)
        .single();

      if (company) {
        companyName = company.company_name || 'Your Electrician';
        companyEmail = company.company_email || company.email || 'info@elec-mate.com';
        engineerName = company.full_name || company.company_name || 'Your Electrician';
      }

      // The expiry reminder email is sent TO the electrician (the certificate owner),
      // not the client. This is a business intelligence feature for the engineer.
      const recipientEmail = companyEmail;
      const clientName = cert.client_name || 'Unknown Client';
      const address = cert.installation_address || 'Address not recorded';
      const certLabel = CERT_TYPE_LABELS[reportType] || reportType.toUpperCase();

      // Generate email content
      const emailContent = generateExpiryReminderEmail(
        reminderTier,
        engineerName,
        clientName,
        address,
        cert.certificate_number,
        certLabel,
        reportType,
        daysUntilExpiry,
        cert.expiry_date,
        cert.inspection_date || 'N/A',
        companyName
      );

      // Send email via Resend
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: `ElecMate Reminders <founder@elec-mate.com>`,
            reply_to: 'support@elec-mate.com',
            to: recipientEmail,
            subject: emailContent.subject,
            html: emailContent.html,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to send expiry reminder for ${cert.certificate_number}:`, errorText);
          results.push({
            certificate: cert.certificate_number,
            status: 'failed',
            reason: errorText
          });
          continue;
        }

        // Update the reminder record with the sent timestamp
        const updatePayload: Record<string, any> = {
          [sentAtField]: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        await supabase
          .from('certificate_expiry_reminders')
          .update(updatePayload)
          .eq('id', cert.id);

        emailsSent++;
        results.push({
          certificate: cert.certificate_number,
          status: 'sent',
          tier: reminderTier,
          daysUntilExpiry,
          reportType
        });

        console.log(`Sent ${reminderTier} expiry reminder for ${cert.certificate_number} (${certLabel}) to ${recipientEmail}`);

      } catch (emailError: any) {
        console.error(`Error sending expiry reminder for ${cert.certificate_number}:`, emailError);
        results.push({
          certificate: cert.certificate_number,
          status: 'error',
          reason: emailError.message
        });
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
    console.error('Certificate expiry reminders error:', error);
    await captureException(error, {
      functionName: 'send-expiry-reminders',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateExpiryReminderEmail(
  tier: '30-day' | '14-day' | '7-day',
  engineerName: string,
  clientName: string,
  address: string,
  certificateNumber: string,
  certTypeLabel: string,
  reportType: string,
  daysUntilExpiry: number,
  expiryDate: string,
  inspectionDate: string,
  companyName: string
): { subject: string; html: string } {
  const formattedExpiry = new Date(expiryDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedInspection = inspectionDate !== 'N/A'
    ? new Date(inspectionDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  const configs = {
    '30-day': {
      emoji: '📋',
      subject: `Certificate Expiry Notice: ${certificateNumber} expires in ${daysUntilExpiry} days`,
      title: 'Certificate Expiring Soon',
      titleColor: '#3b82f6',
      borderColor: 'rgba(59, 130, 246, 0.2)',
      bgGradient: 'rgba(59, 130, 246, 0.1)',
      badgeColor: '#3b82f6',
      badgeBg: 'rgba(59, 130, 246, 0.15)',
      badgeBorder: 'rgba(59, 130, 246, 0.3)',
      message: `A certificate you issued is approaching its expiry date. This is a good time to reach out to your client and schedule a re-inspection.`,
      cta: 'We recommend contacting the client within the next couple of weeks to arrange the re-inspection before it becomes urgent.',
      urgency: ''
    },
    '14-day': {
      emoji: '⚠️',
      subject: `Reminder: ${certificateNumber} expires in ${daysUntilExpiry} days - contact client`,
      title: 'Certificate Expiry Reminder',
      titleColor: '#f59e0b',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      bgGradient: 'rgba(245, 158, 11, 0.1)',
      badgeColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeBorder: 'rgba(245, 158, 11, 0.3)',
      message: `This certificate is expiring within two weeks. If you haven't already, now is the time to contact your client about scheduling a re-inspection.`,
      cta: 'Reaching out promptly helps maintain your client relationships and ensures continued compliance.',
      urgency: 'Time is running short to arrange a convenient re-inspection date.'
    },
    '7-day': {
      emoji: '🚨',
      subject: `URGENT: ${certificateNumber} expires in ${daysUntilExpiry} days!`,
      title: 'Urgent: Certificate About to Expire',
      titleColor: '#ef4444',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      bgGradient: 'rgba(239, 68, 68, 0.15)',
      badgeColor: '#ef4444',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      badgeBorder: 'rgba(239, 68, 68, 0.3)',
      message: `This certificate expires in less than a week. If a re-inspection hasn't been booked yet, the installation will soon be non-compliant.`,
      cta: 'Please contact the client urgently to arrange immediate re-inspection and maintain compliance.',
      urgency: 'Once expired, the installation will no longer have a valid certificate.'
    }
  };

  const config = configs[tier];

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

            <!-- Main Card -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 420px; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid ${config.borderColor};">

              <!-- Header Emoji -->
              <tr>
                <td align="center" style="padding: 48px 32px 20px 32px;">
                  <span style="font-size: 64px; line-height: 1;">${config.emoji}</span>
                </td>
              </tr>

              <!-- Title -->
              <tr>
                <td align="center" style="padding: 0 32px 12px 32px;">
                  <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: ${config.titleColor}; line-height: 1.3;">${config.title}</h1>
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

              <!-- Certificate Number Badge -->
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

              <!-- Expiry Countdown Card -->
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

              <!-- Certificate Details Card -->
              <tr>
                <td style="padding: 0 24px 24px 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(148, 163, 184, 0.06); border-radius: 16px; border: 1px solid rgba(148, 163, 184, 0.1);">
                    <tr>
                      <td style="padding: 20px 24px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding: 0 0 12px 0;">
                              <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Client</p>
                              <p style="margin: 0; font-size: 16px; color: #e2e8f0; font-weight: 600;">${clientName}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 12px 0; border-top: 1px solid rgba(148, 163, 184, 0.08);">
                              <p style="margin: 12px 0 4px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Installation Address</p>
                              <p style="margin: 0; font-size: 15px; color: #cbd5e1; line-height: 1.5;">${address}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0; border-top: 1px solid rgba(148, 163, 184, 0.08);">
                              <p style="margin: 12px 0 4px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Last Inspected</p>
                              <p style="margin: 0; font-size: 15px; color: #cbd5e1;">${formattedInspection}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Message -->
              <tr>
                <td style="padding: 0 32px 24px 32px;">
                  <p style="margin: 0; font-size: 17px; color: #e2e8f0; line-height: 1.6;">Hi ${engineerName},</p>
                  <p style="margin: 20px 0 0 0; font-size: 16px; color: #94a3b8; line-height: 1.7;">${config.message}</p>
                  <p style="margin: 16px 0 0 0; font-size: 16px; color: #94a3b8; line-height: 1.7;">${config.cta}</p>
                  ${config.urgency ? `<p style="margin: 16px 0 0 0; font-size: 15px; color: ${config.titleColor}; font-weight: 600;">${config.urgency}</p>` : ''}
                </td>
              </tr>

              <!-- Action Tip Box -->
              <tr>
                <td style="padding: 0 24px 40px 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(250, 204, 21, 0.08); border-radius: 16px; border: 1px solid rgba(250, 204, 21, 0.15);">
                    <tr>
                      <td style="padding: 20px 24px;">
                        <p style="margin: 0; font-size: 15px; color: #fbbf24;"><strong>Tip:</strong> Open ElecMate to update the reminder status and track your client outreach.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 28px 32px; border-top: 1px solid rgba(148, 163, 184, 0.1);">
                  <p style="margin: 0; font-size: 13px; color: #64748b; text-align: center;">Sent by ElecMate for ${companyName}</p>
                  <p style="margin: 8px 0 0 0; font-size: 12px; color: #475569; text-align: center;">Powered by ElecMate Professional Suite</p>
                  <p style="margin: 12px 0 0 0; font-size: 11px; color: #334155; text-align: center;">You received this because you have certificate expiry reminders enabled in ElecMate.</p>
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
