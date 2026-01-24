/**
 * Quote Acceptance Confirmation Email
 * Sends a thank you email to clients after they accept a quote
 * Sends FROM the electrician's company (like other quote emails)
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quoteId, quoteNumber, clientEmail, clientName, total } = await req.json();

    if (!clientEmail || !quoteNumber) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase to fetch company profile
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    );

    // Fetch quote to get user_id
    let companyName = 'Your Electrician';
    let replyToEmail = 'info@elec-mate.com';

    if (quoteId) {
      const { data: quote } = await supabase
        .from('quotes')
        .select('user_id')
        .eq('id', quoteId)
        .single();

      if (quote?.user_id) {
        const { data: company } = await supabase
          .from('company_profiles')
          .select('company_name, company_email, email')
          .eq('user_id', quote.user_id)
          .single();

        if (company) {
          companyName = company.company_name || 'Your Electrician';
          replyToEmail = company.company_email || company.email || 'info@elec-mate.com';
        }
      }
    }

    const formattedTotal = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(total || 0);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f172a;">
          <tr>
            <td align="center" style="padding: 48px 16px;">

              <!-- Main Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 420px; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(250, 204, 21, 0.2);">

                <!-- Success Tick Emoji -->
                <tr>
                  <td align="center" style="padding: 56px 32px 24px 32px;">
                    <span style="font-size: 72px; line-height: 1;">✅</span>
                  </td>
                </tr>

                <!-- Title -->
                <tr>
                  <td align="center" style="padding: 0 32px 12px 32px;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.3;">Quote Accepted!</h1>
                  </td>
                </tr>

                <!-- Quote Badge -->
                <tr>
                  <td align="center" style="padding: 0 32px 40px 32px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background: rgba(250, 204, 21, 0.15); border: 1px solid rgba(250, 204, 21, 0.3); border-radius: 12px; padding: 12px 24px;">
                          <span style="font-size: 15px; font-weight: 600; color: #facc15;">${quoteNumber}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Amount Card -->
                <tr>
                  <td style="padding: 0 24px 40px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(250, 204, 21, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%); border-radius: 20px; border: 1px solid rgba(250, 204, 21, 0.2);">
                      <tr>
                        <td align="center" style="padding: 28px;">
                          <p style="margin: 0 0 8px 0; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px;">Total Amount</p>
                          <p style="margin: 0; font-size: 40px; font-weight: 700; color: #facc15;">${formattedTotal}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Greeting -->
                <tr>
                  <td style="padding: 0 32px 32px 32px;">
                    <p style="margin: 0; font-size: 17px; color: #e2e8f0; line-height: 1.6;">Hi ${clientName || 'there'},</p>
                    <p style="margin: 20px 0 0 0; font-size: 16px; color: #94a3b8; line-height: 1.7;">Thank you for accepting our quote. We're excited to get started on your project!</p>
                  </td>
                </tr>

                <!-- What Happens Next -->
                <tr>
                  <td style="padding: 0 24px 32px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(16, 185, 129, 0.08); border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.15);">
                      <tr>
                        <td style="padding: 28px;">
                          <p style="margin: 0 0 20px 0; font-size: 13px; font-weight: 600; color: #10b981; text-transform: uppercase; letter-spacing: 1px;">What Happens Next</p>

                          <!-- Step 1 -->
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                            <tr>
                              <td width="36" valign="top">
                                <div style="width: 28px; height: 28px; background: #10b981; border-radius: 50%; text-align: center; line-height: 28px; font-size: 13px; font-weight: 700; color: white;">1</div>
                              </td>
                              <td style="padding-left: 14px; padding-top: 4px;">
                                <p style="margin: 0; font-size: 15px; color: #e2e8f0; line-height: 1.5;">We'll contact you within <strong style="color: #10b981;">24 hours</strong> to schedule</p>
                              </td>
                            </tr>
                          </table>

                          <!-- Step 2 -->
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                            <tr>
                              <td width="36" valign="top">
                                <div style="width: 28px; height: 28px; background: #10b981; border-radius: 50%; text-align: center; line-height: 28px; font-size: 13px; font-weight: 700; color: white;">2</div>
                              </td>
                              <td style="padding-left: 14px; padding-top: 4px;">
                                <p style="margin: 0; font-size: 15px; color: #e2e8f0; line-height: 1.5;">Confirm start date and site requirements</p>
                              </td>
                            </tr>
                          </table>

                          <!-- Step 3 -->
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="36" valign="top">
                                <div style="width: 28px; height: 28px; background: #10b981; border-radius: 50%; text-align: center; line-height: 28px; font-size: 13px; font-weight: 700; color: white;">3</div>
                              </td>
                              <td style="padding-left: 14px; padding-top: 4px;">
                                <p style="margin: 0; font-size: 15px; color: #e2e8f0; line-height: 1.5;">Receive formal confirmation with timeline</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Questions Box -->
                <tr>
                  <td style="padding: 0 24px 40px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(250, 204, 21, 0.08); border-radius: 16px; border: 1px solid rgba(250, 204, 21, 0.15);">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <p style="margin: 0; font-size: 15px; color: #fbbf24;"><strong>Questions?</strong> Just reply to this email - we're here to help!</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 28px 32px; border-top: 1px solid rgba(148, 163, 184, 0.1);">
                    <p style="margin: 0; font-size: 13px; color: #64748b; text-align: center;">Powered by ElecMate Professional Suite</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${companyName} <founder@elec-mate.com>`,
        reply_to: replyToEmail,
        to: clientEmail,
        subject: `Quote Accepted - Next Steps | ${quoteNumber}`,
        html: html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();
    console.log(`✅ Acceptance confirmation sent to ${clientEmail} for quote ${quoteNumber} from ${companyName}`);

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Quote acceptance confirmation error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
