/**
 * Send Invoice Smart
 * Sends invoices using user's connected email account (Gmail/Outlook)
 * Includes rate limiting, token refresh, retry logic
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, RateLimitError, ExternalAPIError } from '../_shared/errors.ts';
import { decryptToken } from '../_shared/encryption.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

const DAILY_RATE_LIMIT = 100;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, body, attachmentBase64, attachmentFilename } = await req.json();

    // Validate inputs
    if (!to || !subject || !body) {
      throw new ValidationError('to, subject, and body are required');
    }

    if (!isValidEmail(to)) {
      throw new ValidationError('Invalid email address');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Get active email config
    const { data: configs, error: configError } = await supabase
      .from('user_email_configs')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('updated_at', { ascending: false });

    if (configError || !configs || configs.length === 0) {
      throw new ValidationError('No email account connected. Please connect Gmail or Outlook in Settings.');
    }

    const config = configs[0];

    // Check rate limit
    const now = new Date();
    const resetAt = new Date(config.rate_limit_reset_at || now);

    if (now >= resetAt) {
      // Reset daily counter
      await supabase
        .from('user_email_configs')
        .update({
          daily_sent_count: 0,
          rate_limit_reset_at: new Date(now.setHours(24, 0, 0, 0)).toISOString(),
        })
        .eq('id', config.id);
      
      config.daily_sent_count = 0;
    }

    if (config.daily_sent_count >= DAILY_RATE_LIMIT) {
      throw new RateLimitError(`Daily email limit reached (${DAILY_RATE_LIMIT}/day). Resets at midnight UTC.`);
    }

    // Check if token needs refresh (within 5 minutes of expiry)
    const tokenExpiresAt = new Date(config.token_expires_at);
    const needsRefresh = tokenExpiresAt.getTime() - Date.now() < 5 * 60 * 1000;

    if (needsRefresh) {
      console.log('🔄 Token expiring soon, refreshing...');
      
      const refreshResponse = await supabase.functions.invoke('refresh-email-token', {
        body: { configId: config.id },
      });

      if (refreshResponse.error) {
        throw new ValidationError('Failed to refresh token. Please reconnect your email account.');
      }

      // Refetch updated config
      const { data: updatedConfig } = await supabase
        .from('user_email_configs')
        .select('*')
        .eq('id', config.id)
        .single();

      if (updatedConfig) {
        config.encrypted_access_token = updatedConfig.encrypted_access_token;
      }
    }

    // Decrypt access token
    const accessToken = await decryptToken(config.encrypted_access_token!);

    // Send email based on provider
    if (config.email_provider === 'gmail') {
      await withRetry(
        () => withTimeout(
          sendGmailEmail(accessToken, to, subject, body, attachmentBase64, attachmentFilename),
          Timeouts.STANDARD,
          'Gmail send'
        ),
        RetryPresets.STANDARD
      );
    } else {
      await withRetry(
        () => withTimeout(
          sendOutlookEmail(accessToken, to, subject, body, attachmentBase64, attachmentFilename),
          Timeouts.STANDARD,
          'Outlook send'
        ),
        RetryPresets.STANDARD
      );
    }

    // Update counters
    await supabase
      .from('user_email_configs')
      .update({
        daily_sent_count: (config.daily_sent_count || 0) + 1,
        total_sent_count: (config.total_sent_count || 0) + 1,
        last_sent_at: new Date().toISOString(),
      })
      .eq('id', config.id);

    console.log(`✅ Email sent successfully`, {
      user_id: user.id,
      provider: config.email_provider,
      to,
      count: config.daily_sent_count + 1,
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        dailyCount: config.daily_sent_count + 1,
        dailyLimit: DAILY_RATE_LIMIT,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});

async function sendGmailEmail(
  accessToken: string,
  to: string,
  subject: string,
  body: string,
  attachmentBase64?: string,
  attachmentFilename?: string
) {
  const email = createRFC822Email(to, subject, body, attachmentBase64, attachmentFilename);
  const base64Email = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: base64Email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ExternalAPIError('Gmail', error);
  }

  return await response.json();
}

async function sendOutlookEmail(
  accessToken: string,
  to: string,
  subject: string,
  body: string,
  attachmentBase64?: string,
  attachmentFilename?: string
) {
  const message: any = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: body,
      },
      toRecipients: [{ emailAddress: { address: to } }],
    },
  };

  if (attachmentBase64 && attachmentFilename) {
    message.message.attachments = [{
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: attachmentFilename,
      contentBytes: attachmentBase64,
    }];
  }

  const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ExternalAPIError('Outlook', error);
  }
}

function createRFC822Email(
  to: string,
  subject: string,
  body: string,
  attachmentBase64?: string,
  attachmentFilename?: string
): string {
  const boundary = '----=_Part_' + Date.now();
  
  let email = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
  ];

  if (attachmentBase64 && attachmentFilename) {
    email.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
    email.push('');
    email.push(`--${boundary}`);
    email.push('Content-Type: text/html; charset=UTF-8');
    email.push('');
    email.push(body);
    email.push('');
    email.push(`--${boundary}`);
    email.push(`Content-Type: application/pdf; name="${attachmentFilename}"`);
    email.push('Content-Transfer-Encoding: base64');
    email.push(`Content-Disposition: attachment; filename="${attachmentFilename}"`);
    email.push('');
    email.push(attachmentBase64);
    email.push(`--${boundary}--`);
  } else {
    email.push('Content-Type: text/html; charset=UTF-8');
    email.push('');
    email.push(body);
  }

  return email.join('\r\n');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
