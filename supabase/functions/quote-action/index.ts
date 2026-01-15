/**
 * Quote Action Handler - One-Click Accept/Reject
 * Handles seamless quote acceptance/rejection from email buttons
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const action = url.searchParams.get('action');

    // Validate parameters
    if (!token || !action) {
      return errorPage('Invalid Link', 'This link appears to be incomplete or invalid.');
    }

    if (action !== 'accept' && action !== 'reject') {
      return errorPage('Invalid Action', 'The requested action is not supported.');
    }

    // Initialize Supabase with service role for admin access
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    );

    // Validate token and get quote
    const { data: quoteView, error: viewError } = await supabase
      .from('quote_views')
      .select('quote_id, is_active, expires_at')
      .eq('public_token', token)
      .single();

    if (viewError || !quoteView) {
      console.error('❌ Token validation failed:', {
        token: token.substring(0, 8) + '...',
        error: viewError?.message,
        found: !!quoteView,
        timestamp: new Date().toISOString()
      });
      return errorPage('Invalid Link', 'This quote link is invalid or has expired.');
    }

    console.log(`✅ Token validated successfully:`, {
      quoteId: quoteView.quote_id,
      isActive: quoteView.is_active,
      expiresAt: quoteView.expires_at,
      timestamp: new Date().toISOString()
    });

    // Check if token already used
    if (!quoteView.is_active) {
      return errorPage('Link Already Used', 'This quote has already been responded to. If you need to make changes, please contact us directly.');
    }

    // Check if expired (warn but still allow)
    const isExpired = new Date(quoteView.expires_at) < new Date();
    
    // Fetch quote details
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select('*, user_id')
      .eq('id', quoteView.quote_id)
      .single();

    if (quoteError || !quote) {
      console.error('Quote fetch failed:', quoteError);
      return errorPage('Quote Not Found', 'Unable to find the requested quote.');
    }

    // Check if already actioned
    if (quote.acceptance_status === 'accepted' || quote.acceptance_status === 'rejected') {
      const previousAction = quote.acceptance_status === 'accepted' ? 'accepted' : 'declined';
      return errorPage(
        'Already Responded', 
        `This quote has already been ${previousAction}. If you need to make changes, please contact us directly.`
      );
    }

    // Parse client data
    const clientData = typeof quote.client_data === 'string' 
      ? JSON.parse(quote.client_data) 
      : quote.client_data;

    const clientName = clientData?.name || 'Client';
    const clientEmail = clientData?.email || '';

    // Get request metadata for audit trail
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'Unknown';

    // Update quote status
    const newStatus = action === 'accept' ? 'approved' : 'rejected';
    const acceptanceStatus = action === 'accept' ? 'accepted' : 'rejected';

    const { error: updateError } = await supabase
      .from('quotes')
      .update({
        status: newStatus,
        acceptance_status: acceptanceStatus,
        acceptance_method: 'one_click_email',
        accepted_at: new Date().toISOString(),
        accepted_by_name: clientName,
        accepted_by_email: clientEmail,
        accepted_ip: clientIp,
        accepted_user_agent: userAgent,
        updated_at: new Date().toISOString()
      })
      .eq('id', quoteView.quote_id);

    if (updateError) {
      console.error('Quote update failed:', updateError);
      return errorPage('Update Failed', 'Unable to process your response. Please try again or contact us directly.');
    }

    // Mark token as used (one-time use protection)
    await supabase
      .from('quote_views')
      .update({ 
        is_active: false,
        last_viewed_at: new Date().toISOString()
      })
      .eq('public_token', token);

    // Create in-app notification for the electrician
    const notificationTitle = action === 'accept' 
      ? `Quote ${quote.quote_number} Accepted!`
      : `Quote ${quote.quote_number} Declined`;
    
    const notificationMessage = action === 'accept'
      ? `${clientName} accepted your quote for £${(quote.total || 0).toFixed(2)}`
      : `${clientName} declined quote ${quote.quote_number}`;

    await supabase
      .from('ojt_notifications')
      .insert({
        user_id: quote.user_id,
        type: 'quote_action',
        title: notificationTitle,
        message: notificationMessage,
        data: {
          quote_id: quote.id,
          quote_number: quote.quote_number,
          action: action,
          client_name: clientName,
          total: quote.total
        },
        priority: 'high',
        is_read: false
      });

    console.log(`✅ Quote ${quote.quote_number} ${action}ed by ${clientName}`);

    // Send email notification to electrician
    try {
      await sendEmailNotification(supabase, quote, action, clientName, clientEmail);
    } catch (emailError) {
      console.error('Email notification failed (non-critical):', emailError);
      // Don't fail the request if email fails
    }

    // Send follow-up email to client
    try {
      if (action === 'accept') {
        await sendAcceptanceConfirmationEmail(quote, clientEmail, clientName);
      } else {
        await sendRejectionThankYouEmail(quote, clientEmail, clientName);
      }
    } catch (clientEmailError) {
      console.error('Client follow-up email failed (non-critical):', clientEmailError);
      // Don't fail the request if email fails
    }

    // Return success page to customer
    if (action === 'accept') {
      return acceptSuccessPage(quote.quote_number, clientName, isExpired);
    } else {
      return rejectSuccessPage(quote.quote_number, clientName);
    }

  } catch (error: any) {
    console.error('Quote action error:', error);
    return errorPage('Something Went Wrong', 'An unexpected error occurred. Please contact us directly to confirm your response.');
  }
};

/**
 * Send email notification to the electrician
 */
async function sendEmailNotification(
  supabase: any,
  quote: any,
  action: string,
  clientName: string,
  clientEmail: string
) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured, skipping email notification');
    return;
  }

  // Fetch company profile for sender info
  const { data: company } = await supabase
    .from('company_profiles')
    .select('company_name, email')
    .eq('user_id', quote.user_id)
    .single();

  const companyName = company?.company_name || 'ElecMate';
  const toEmail = company?.email || quote.user_email || 'support@elec-mate.com';

  const subject = action === 'accept'
    ? `✓ Quote ${quote.quote_number} Accepted - ${clientName}`
    : `Quote ${quote.quote_number} Declined - ${clientName}`;

  const html = action === 'accept' ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, system-ui, sans-serif; background: #f9fafb; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center;">
          <div style="width: 80px; height: 80px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 40px;">✓</div>
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">Quote Accepted!</h1>
        </div>
        <div style="padding: 40px;">
          <p style="font-size: 16px; color: #1f2937; margin: 0 0 24px;">Good news! <strong>${clientName}</strong> has accepted your quote.</p>
          
          <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 6px; margin: 24px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="color: #6b7280; font-size: 14px;">Quote Number:</span>
              <span style="color: #1f2937; font-weight: 600; font-size: 14px;">${quote.quote_number}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="color: #6b7280; font-size: 14px;">Amount:</span>
              <span style="color: #1f2937; font-weight: 600; font-size: 14px;">£${(quote.total || 0).toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="color: #6b7280; font-size: 14px;">Client:</span>
              <span style="color: #1f2937; font-weight: 600; font-size: 14px;">${clientName}</span>
            </div>
            ${clientEmail ? `
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b7280; font-size: 14px;">Email:</span>
              <span style="color: #1f2937; font-weight: 600; font-size: 14px;">${clientEmail}</span>
            </div>
            ` : ''}
          </div>

          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 6px; margin: 24px 0;">
            <p style="margin: 0 0 12px; font-weight: 600; color: #92400e; font-size: 14px;">Next Steps:</p>
            <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 14px;">
              <li>Contact the client to schedule work</li>
              <li>Generate invoice when ready</li>
              <li>Update project timeline</li>
            </ul>
          </div>

          <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; text-align: center;">
            ⚡ Powered by ElecMate Professional Suite
          </p>
        </div>
      </div>
    </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, system-ui, sans-serif; background: #f9fafb; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
        <div style="background: #6b7280; padding: 40px; text-align: center;">
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">Quote Declined</h1>
        </div>
        <div style="padding: 40px;">
          <p style="font-size: 16px; color: #1f2937; margin: 0 0 24px;"><strong>${clientName}</strong> has declined quote ${quote.quote_number}.</p>
          
          <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; border-radius: 6px; margin: 24px 0;">
            <p style="margin: 0 0 12px; font-weight: 600; color: #991b1b; font-size: 14px;">Consider:</p>
            <ul style="margin: 0; padding-left: 20px; color: #7f1d1d; font-size: 14px;">
              <li>Follow up to understand their concerns</li>
              <li>Offer a revised quote if appropriate</li>
              <li>Update your records</li>
            </ul>
          </div>

          <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; text-align: center;">
            ⚡ Powered by ElecMate Professional Suite
          </p>
        </div>
      </div>
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
      from: 'ElecMate <Founder@elec-mate.com>',
      replyTo: clientEmail || 'support@elec-mate.com',
      to: [toEmail],
      subject: subject,
      html: html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend API error:', errorText);
    throw new Error('Failed to send email notification');
  }

  console.log('✅ Email notification sent to electrician');
}

/**
 * Send confirmation email to client after accepting quote
 */
async function sendAcceptanceConfirmationEmail(
  quote: any,
  clientEmail: string,
  clientName: string
) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured, skipping client confirmation email');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, system-ui, sans-serif; background: #f9fafb; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center;">
          <div style="width: 80px; height: 80px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 40px; color: #10b981;">✓</div>
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">Thank You for Accepting Our Quote!</h1>
        </div>
        <div style="padding: 40px;">
          <p style="font-size: 16px; color: #1f2937; margin: 0 0 24px;">Hi ${clientName},</p>
          <p style="font-size: 16px; color: #1f2937; margin: 0 0 24px;">This email confirms your acceptance of quote <strong>${quote.quote_number}</strong> for <strong>£${Number(quote.total).toFixed(2)}</strong>.</p>

          <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 6px; margin: 24px 0;">
            <h3 style="margin: 0 0 12px; color: #166534; font-size: 16px;">What Happens Next:</h3>
            <ol style="margin: 0; padding-left: 20px; color: #15803d; font-size: 14px; line-height: 1.8;">
              <li>Our team will contact you within 24 hours to schedule the work</li>
              <li>We'll confirm the start date and any site-specific requirements</li>
              <li>You'll receive a formal confirmation with project timeline</li>
            </ol>
          </div>

          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 6px; margin: 24px 0;">
            <p style="margin: 0; font-size: 14px; color: #92400e;"><strong>Questions?</strong><br>Reply to this email or call us directly. We're here to help!</p>
          </div>

          <p style="margin: 24px 0 0; font-size: 16px; color: #1f2937;">Looking forward to working with you!</p>

          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 13px; color: #9ca3af; text-align: center;">⚡ Powered by ElecMate Professional Suite</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ElecMate <Founder@elec-mate.com>',
        to: clientEmail,
        subject: `Quote Accepted - Next Steps | ${quote.quote_number}`,
        html: html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send acceptance confirmation:', errorText);
    } else {
      console.log('✅ Acceptance confirmation email sent to client');
    }
  } catch (error) {
    console.error('Error sending acceptance confirmation:', error);
  }
}

/**
 * Send thank you email to client after declining quote
 */
async function sendRejectionThankYouEmail(
  quote: any,
  clientEmail: string,
  clientName: string
) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured, skipping client thank you email');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, system-ui, sans-serif; background: #f9fafb; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
        <div style="background: #6b7280; padding: 40px; text-align: center;">
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">Thanks for Letting Us Know</h1>
        </div>
        <div style="padding: 40px;">
          <p style="font-size: 16px; color: #1f2937; margin: 0 0 24px;">Hi ${clientName},</p>
          <p style="font-size: 16px; color: #1f2937; margin: 0 0 24px;">Thank you for taking the time to review our quote <strong>${quote.quote_number}</strong>.</p>

          <p style="font-size: 16px; color: #1f2937; margin: 0 0 24px;">We understand that circumstances and requirements can vary, and we appreciate your honest feedback.</p>

          <div style="background: #f9fafb; border-left: 4px solid #9ca3af; padding: 20px; border-radius: 6px; margin: 24px 0;">
            <p style="margin: 0 0 12px; font-weight: 600; color: #374151; font-size: 15px;">Keep Us in Mind</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #4b5563;">If you need electrical work in the future, we'd love to hear from you. We're always here to help with:</p>
            <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.6;">
              <li>Free quotes and consultations</li>
              <li>Emergency electrical services</li>
              <li>Commercial and domestic projects</li>
            </ul>
          </div>

          <p style="margin: 24px 0 0; font-size: 16px; color: #1f2937;">Feel free to reach out anytime. We're just an email or phone call away!</p>

          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 13px; color: #9ca3af; text-align: center;">⚡ Powered by ElecMate Professional Suite</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ElecMate <Founder@elec-mate.com>',
        to: clientEmail,
        subject: `Thank You for Your Consideration | ${quote.quote_number}`,
        html: html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send rejection thank you:', errorText);
    } else {
      console.log('✅ Rejection thank you email sent to client');
    }
  } catch (error) {
    console.error('Error sending rejection thank you:', error);
  }
}

/**
 * Success page for accepted quotes
 */
function acceptSuccessPage(quoteNumber: string, clientName: string, isExpired: boolean): Response {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quote Accepted - ElecMate</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.container {
  background: white;
  border-radius: 24px;
  padding: 48px 32px;
  max-width: 560px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
  animation: slideUp 0.4s ease-out;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: scaleIn 0.5s ease-out 0.2s both;
}
@keyframes scaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
.checkmark {
  width: 40px;
  height: 40px;
  stroke: white;
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: draw 0.8s ease-out 0.4s both;
}
@keyframes draw {
  from { stroke-dasharray: 100; stroke-dashoffset: 100; }
  to { stroke-dasharray: 100; stroke-dashoffset: 0; }
}
h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}
.quote-number {
  display: inline-block;
  background: #f3f4f6;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 24px;
}
.message {
  font-size: 16px;
  line-height: 1.6;
  color: #6b7280;
  margin-bottom: 32px;
}
.info-box {
  background: #f0fdf4;
  border-left: 4px solid #10b981;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  margin-bottom: 32px;
}
.info-box strong {
  color: #166534;
  font-size: 15px;
  display: block;
  margin-bottom: 8px;
}
.note-box {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 16px;
  border-radius: 8px;
  text-align: left;
  margin-bottom: 24px;
  font-size: 14px;
  color: #92400e;
}
.button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
  cursor: pointer;
  font-size: 15px;
}
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102,126,234,0.4);
}
.footer {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  font-size: 14px;
  color: #9ca3af;
}
</style>
</head>
<body>
<div class="container">
  <div class="icon-circle">
    <svg class="checkmark" viewBox="0 0 52 52">
      <path d="M14 27l8 8 16-16" />
    </svg>
  </div>
  <h1>Quote Accepted!</h1>
  <div class="quote-number">${quoteNumber}</div>
  ${isExpired ? `<div class="note-box"><strong>Note:</strong> This quote had expired, but we've recorded your acceptance and will contact you to confirm details.</div>` : ''}
  <p class="message">
    Thank you for accepting our quote. We've sent you a confirmation email with all the details.<br><br>
    <strong>What happens next?</strong><br>
    Our team will be in touch within 24 hours to schedule the work and answer any questions you may have.
  </p>
  <button class="button" onclick="window.close(); return false;">
    Close Window
  </button>
  <div class="footer">
    ElecMate Professional Suite | A confirmation email has been sent
  </div>
</div>
<script>
  // Auto-close after 10 seconds
  setTimeout(() => window.close(), 10000);
</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      ...corsHeaders,
    },
  });
}

/**
 * Success page for rejected quotes
 */
function rejectSuccessPage(quoteNumber: string, clientName: string): Response {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quote Declined - ElecMate</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.container {
  background: white;
  border-radius: 24px;
  padding: 48px 32px;
  max-width: 560px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
  animation: slideUp 0.4s ease-out;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: scaleIn 0.5s ease-out 0.2s both;
}
@keyframes scaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
.icon {
  width: 40px;
  height: 40px;
  stroke: white;
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}
.quote-number {
  display: inline-block;
  background: #f3f4f6;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 24px;
}
.message {
  font-size: 16px;
  line-height: 1.6;
  color: #6b7280;
  margin-bottom: 32px;
}
.info-box {
  background: #f9fafb;
  border-left: 4px solid #9ca3af;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  margin-bottom: 32px;
}
.info-box strong {
  color: #374151;
  font-size: 15px;
  display: block;
  margin-bottom: 8px;
}
.info-box ul {
  margin: 12px 0 0 0;
  padding-left: 20px;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.6;
}
.button {
  display: inline-block;
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
  cursor: pointer;
  font-size: 15px;
}
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(107,114,128,0.4);
}
.footer {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  font-size: 14px;
  color: #9ca3af;
}
</style>
</head>
<body>
<div class="container">
  <div class="icon-circle">
    <svg class="icon" viewBox="0 0 52 52">
      <path d="M16 16l20 20M36 16l-20 20" />
    </svg>
  </div>
  <h1>Thanks for Letting Us Know</h1>
  <div class="quote-number">${quoteNumber}</div>
  <p class="message">
    We appreciate you taking the time to review our quote.<br><br>
    If circumstances change or you have any questions about our services, please don't hesitate to reach out. We'd love to help with any future projects.
  </p>
  <div class="info-box">
    <strong>Keep Us in Mind</strong>
    <p style="margin: 8px 0; font-size: 14px; color: #4b5563;">If you need electrical work in the future, we're always here to help with:</p>
    <ul>
      <li>Free quotes and consultations</li>
      <li>Emergency electrical services</li>
      <li>Commercial and domestic projects</li>
    </ul>
  </div>
  <button class="button" onclick="window.close(); return false;">
    Close Window
  </button>
  <div class="footer">
    ElecMate Professional Suite | Keep us in mind for future work
  </div>
</div>
<script>
  // Auto-close after 10 seconds
  setTimeout(() => window.close(), 10000);
</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      ...corsHeaders,
    },
  });
}

/**
 * Generic error page
 */
function errorPage(title: string, message: string): Response {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #f9fafb; padding: 60px 20px; margin: 0; -webkit-font-smoothing: antialiased;">
<div style="max-width: 500px; margin: 0 auto; background: white; padding: 48px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: center;">
<div style="width: 80px; height: 80px; background: #ef4444; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 36px; color: white;">!</div>
<h1 style="font-size: 28px; font-weight: 700; color: #0a0a0a; margin: 0 0 12px; letter-spacing: -0.5px;">${title}</h1>
<p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">${message}</p>
<div style="padding-top: 24px; border-top: 1px solid #e5e7eb;">
<p style="margin: 0; font-size: 13px; color: #9ca3af;">⚡ Powered by ElecMate Professional Suite</p>
</div>
</div>
</body>
</html>`;

  return new Response(html, {
    status: 400,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      ...corsHeaders,
    },
  });
}

serve(handler);
