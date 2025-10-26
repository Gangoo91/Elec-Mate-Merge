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

    // Return 1x1 transparent GIF (tracking pixel) instead of HTML page
    // This prevents new browser tabs and raw HTML display in email clients
    const transparentGif = new Uint8Array([
      0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
      0x80, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x21,
      0xF9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2C, 0x00, 0x00,
      0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
      0x01, 0x00, 0x3B
    ]);

    return new Response(transparentGif, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...corsHeaders,
      },
    });

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
  const toEmail = company?.email || 'andrewgangoo91@gmail.com';

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
      from: 'ElecMate <onboarding@resend.dev>',
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
 * Success page for accepted quotes
 */
function acceptSuccessPage(quoteNumber: string, clientName: string, isExpired: boolean): Response {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quote Accepted</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #ffffff; padding: 60px 20px; margin: 0; -webkit-font-smoothing: antialiased; }
.container { max-width: 500px; margin: 0 auto; background: white; padding: 48px; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center; }
.icon { width: 80px; height: 80px; background: #10b981; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; }
h1 { font-size: 28px; font-weight: 700; color: #0a0a0a; margin: 0 0 12px; letter-spacing: -0.5px; }
p { color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 32px; }
.note-box { background: #fef3c7; border-left: 3px solid #f59e0b; padding: 16px; border-radius: 6px; text-align: left; margin-bottom: 24px; }
.info-box { background: #f0fdf4; border-left: 3px solid #10b981; padding: 20px; border-radius: 6px; text-align: left; margin-bottom: 32px; }
.footer { padding-top: 24px; border-top: 1px solid #e5e7eb; }
</style>
</head>
<body>
<div class="container">
<div class="icon">
<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
</div>
<h1>Quote Accepted!</h1>
<p>Thank you for accepting quote <strong style="color: #1f2937;">${quoteNumber}</strong>. We've notified our team and will be in touch shortly to schedule the work.</p>
${isExpired ? `<div class="note-box"><p style="margin: 0; font-size: 14px; color: #92400e;"><strong>Note:</strong> This quote had expired, but we've still recorded your acceptance. We'll contact you to confirm details.</p></div>` : ''}
<div class="info-box">
<p style="margin: 0 0 8px; font-size: 15px; font-weight: 600; color: #166534;">Next Steps:</p>
<p style="margin: 0; font-size: 14px; color: #15803d; line-height: 1.6;">You'll receive a confirmation email shortly with project details and scheduling information.</p>
</div>
<div class="footer">
<p style="margin: 0; font-size: 13px; color: #9ca3af;">⚡ Powered by ElecMate Professional Suite</p>
</div>
</div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
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
<title>Quote Declined</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #ffffff; padding: 60px 20px; margin: 0; -webkit-font-smoothing: antialiased; }
.container { max-width: 500px; margin: 0 auto; background: white; padding: 48px; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center; }
.icon { width: 80px; height: 80px; background: #6b7280; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 32px; color: white; }
h1 { font-size: 28px; font-weight: 700; color: #0a0a0a; margin: 0 0 12px; letter-spacing: -0.5px; }
p { color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 32px; }
.info-box { background: #f9fafb; border-left: 3px solid #9ca3af; padding: 20px; border-radius: 6px; text-align: left; margin-bottom: 32px; }
.footer { padding-top: 24px; border-top: 1px solid #e5e7eb; }
</style>
</head>
<body>
<div class="container">
<div class="icon">✕</div>
<h1>Quote Declined</h1>
<p>Thank you for letting us know about quote <strong style="color: #1f2937;">${quoteNumber}</strong>. We appreciate your consideration and hope to work with you in the future.</p>
<div class="info-box">
<p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.6;">If you'd like to discuss alternative options or have any questions, please don't hesitate to contact us.</p>
</div>
<div class="footer">
<p style="margin: 0; font-size: 13px; color: #9ca3af;">⚡ Powered by ElecMate Professional Suite</p>
</div>
</div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      ...corsHeaders,
    },
  });
}

/**
 * Generic error page
 */
function errorPage(title: string, message: string): Response {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #f9fafb; padding: 60px 20px; margin: 0; -webkit-font-smoothing: antialiased;">
    <div style="max-width: 500px; margin: 0 auto; background: white; padding: 48px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: center;">
        <div style="width: 80px; height: 80px; background: #ef4444; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 36px; color: white;">
            !
        </div>
        <h1 style="font-size: 28px; font-weight: 700; color: #0a0a0a; margin: 0 0 12px; letter-spacing: -0.5px;">${title}</h1>
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">
            ${message}
        </p>
        
        <div style="padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                ⚡ Powered by ElecMate Professional Suite
            </p>
        </div>
    </div>
</body>
</html>
  `;

  return new Response(html, {
    status: 400,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      ...corsHeaders,
    },
  });
}

serve(handler);
