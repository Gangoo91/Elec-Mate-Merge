import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from 'npm:resend@2.0.0';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface SendPhotosRequest {
  projectId: string;
  photoIds?: string[];
  recipientEmail: string;
  recipientName?: string;
  message?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Validate email format
 */
function isValidEmail(email: string | null | undefined): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Extract storage path from a public Supabase URL
 * e.g. https://xxx.supabase.co/storage/v1/object/public/safety-photos/user-id/file.jpg
 * → user-id/file.jpg
 */
function extractStoragePath(publicUrl: string): string | null {
  try {
    const marker = '/storage/v1/object/public/safety-photos/';
    const idx = publicUrl.indexOf(marker);
    if (idx !== -1) return publicUrl.slice(idx + marker.length);
    return null;
  } catch {
    return null;
  }
}

/**
 * Escape HTML to prevent XSS in email content
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  const startTime = Date.now();
  console.log('📸 Send Photos via Resend | Started:', new Date().toISOString());

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ========================================================================
    // STEP 1: Validate environment
    // ========================================================================
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      throw new Error('Email service not configured. Please contact support.');
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables missing');
      throw new Error('Database service not configured. Please contact support.');
    }

    const resend = new Resend(resendApiKey);
    console.log('Environment validated');

    // ========================================================================
    // STEP 2: Authenticate user
    // ========================================================================
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No Authorization header found');
      throw new Error('Please log in to send photos.');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const jwt = authHeader.replace('Bearer ', '').trim();
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(jwt);

    if (userError || !user) {
      console.error('User authentication error:', userError);
      throw new Error('Session expired. Please log in again.');
    }

    console.log('User authenticated:', user.id);

    // ========================================================================
    // STEP 3: Parse and validate request
    // ========================================================================
    let body: SendPhotosRequest;
    try {
      body = await req.json();
    } catch (e) {
      console.error('Failed to parse request body:', e);
      throw new Error('Invalid request format.');
    }

    const { projectId, photoIds, recipientEmail, recipientName, message } = body;

    if (!projectId || typeof projectId !== 'string') {
      throw new Error('Project ID is required.');
    }

    if (!recipientEmail || typeof recipientEmail !== 'string') {
      throw new Error('Recipient email is required.');
    }

    if (!isValidEmail(recipientEmail)) {
      throw new Error(`Invalid recipient email address: "${recipientEmail}".`);
    }

    console.log('Request validated - projectId:', projectId, 'recipientEmail:', recipientEmail);

    // ========================================================================
    // STEP 4: Fetch the project
    // ========================================================================
    const { data: project, error: projectError } = await supabaseClient
      .from('photo_projects')
      .select('*')
      .eq('id', projectId)
      .eq('user_id', user.id)
      .single();

    if (projectError || !project) {
      console.error('Database error fetching project:', projectError);
      throw new Error(
        'Could not find this project. It may have been deleted or you do not have permission.'
      );
    }

    const projectName = project.name || 'Untitled Project';
    const projectDescription = project.description || '';
    console.log('Project fetched:', projectName);

    // ========================================================================
    // STEP 5: Fetch photos
    // ========================================================================
    let photosQuery = supabaseClient
      .from('safety_photos')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (photoIds && Array.isArray(photoIds) && photoIds.length > 0) {
      photosQuery = photosQuery.in('id', photoIds);
    }

    const { data: photos, error: photosError } = await photosQuery;

    if (photosError) {
      console.error('Database error fetching photos:', photosError);
      throw new Error('Could not fetch photos for this project.');
    }

    if (!photos || photos.length === 0) {
      throw new Error('No photos found for this project.');
    }

    console.log(`Fetched ${photos.length} photo(s)`);

    // ========================================================================
    // STEP 6: Generate signed URLs for each photo (1hr expiry)
    // ========================================================================
    const photoData: Array<{
      id: string;
      caption: string;
      signedUrl: string;
      thumbnailUrl: string;
      createdAt: string;
    }> = [];

    for (const photo of photos) {
      const storagePath =
        photo.storage_path || photo.file_path || extractStoragePath(photo.file_url || '');
      if (!storagePath) {
        console.warn('Photo missing storage path, skipping:', photo.id);
        continue;
      }

      const { data: signedUrlData, error: signedUrlError } = await supabaseClient.storage
        .from('safety-photos')
        .createSignedUrl(storagePath, 3600);

      if (signedUrlError || !signedUrlData?.signedUrl) {
        console.warn('Failed to generate signed URL for photo:', photo.id, signedUrlError);
        continue;
      }

      // Use the same signed URL for thumbnail; Supabase Storage transform can resize
      // but we'll use the full URL and control size via HTML width/height
      photoData.push({
        id: photo.id,
        caption: photo.caption || photo.description || photo.title || '',
        signedUrl: signedUrlData.signedUrl,
        thumbnailUrl: signedUrlData.signedUrl,
        createdAt: photo.created_at,
      });
    }

    if (photoData.length === 0) {
      throw new Error('Could not generate download links for any photos. Please try again.');
    }

    console.log(`Generated signed URLs for ${photoData.length} photo(s)`);

    // ========================================================================
    // STEP 7: Fetch company profile for branding
    // ========================================================================
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'ElecMate';
    const companyEmail = companyProfile?.company_email || '';
    const companyPhone = companyProfile?.company_phone || '';
    console.log('Company:', companyName);

    // ========================================================================
    // STEP 8: Build photo grid HTML
    // ========================================================================
    const photoGridHtml = photoData
      .map((photo, index) => {
        const captionHtml = photo.caption
          ? `<p style="margin: 8px 0 0; font-size: 13px; color: #6b7280; line-height: 1.4;">${escapeHtml(photo.caption)}</p>`
          : '';

        return `
        <tr>
          <td style="padding: 8px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <tr>
                <td style="padding: 0; text-align: center;">
                  <a href="${photo.signedUrl}" target="_blank" style="display: block; text-decoration: none;">
                    <img
                      src="${photo.thumbnailUrl}"
                      alt="${escapeHtml(photo.caption || `Photo ${index + 1}`)}"
                      width="520"
                      style="display: block; width: 100%; max-width: 520px; height: auto; border: 0; border-radius: 8px 8px 0 0;"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 16px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td>
                        <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">Photo ${index + 1}</p>
                        ${captionHtml}
                      </td>
                      <td style="text-align: right; vertical-align: top; white-space: nowrap; padding-left: 12px;">
                        <a href="${photo.signedUrl}" target="_blank" style="display: inline-block; background: #fbbf24; color: #1f2937; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600;">
                          View Full Size
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        `;
      })
      .join('');

    // ========================================================================
    // STEP 9: Build full email HTML
    // ========================================================================
    const safeRecipientName = recipientName ? escapeHtml(recipientName) : '';
    const safeMessage = message ? escapeHtml(message) : '';
    const safeProjectName = escapeHtml(projectName);
    const safeProjectDescription = projectDescription ? escapeHtml(projectDescription) : '';

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>Project Photos from ${escapeHtml(companyName)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              ${companyProfile?.logo_url ? `<img src="${companyProfile.logo_url}" alt="${escapeHtml(companyName)}" style="max-height: 60px; max-width: 200px; margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;" />` : ''}
              <h1 style="margin: 0; color: #fbbf24; font-size: 24px; font-weight: 700;">${escapeHtml(companyName)}</h1>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">Project Photos</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 32px 24px 0;">
              ${safeRecipientName ? `<p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">Dear <strong style="color: #1f2937;">${safeRecipientName}</strong>,</p>` : ''}
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                Please find the project photos attached below from <strong style="color: #1f2937;">${escapeHtml(companyName)}</strong>.
              </p>
            </td>
          </tr>

          <!-- Custom Message -->
          ${
            safeMessage
              ? `
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #fffbeb; border-left: 4px solid #fbbf24; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 8px; font-size: 13px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #78350f;">${safeMessage}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `
              : ''
          }

          <!-- Project Info Card -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; border: 2px solid #e5e7eb;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #1f2937;">${safeProjectName}</h2>
                    ${safeProjectDescription ? `<p style="margin: 0 0 12px; font-size: 14px; line-height: 1.6; color: #6b7280;">${safeProjectDescription}</p>` : ''}
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Photos included:</td>
                        <td style="text-align: right; font-size: 14px; color: #1f2937; font-weight: 600;">${photoData.length}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Photo Grid -->
          <tr>
            <td style="padding: 0 16px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                ${photoGridHtml}
              </table>
            </td>
          </tr>

          <!-- Download Notice -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px; text-align: center;">
                    <p style="margin: 0; font-size: 13px; color: #0369a1; line-height: 1.5;">
                      Photo links are valid for <strong>1 hour</strong>. Click "View Full Size" to download each photo.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer - Contact -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #374151;">
                If you have any questions about these photos, please don't hesitate to contact us.
              </p>
              <p style="margin: 0; font-size: 16px; font-weight: 700; color: #1f2937;">${escapeHtml(companyName)}</p>
              ${companyPhone ? `<p style="margin: 8px 0 0; font-size: 14px; color: #6b7280;"><a href="tel:${escapeHtml(companyPhone)}" style="color: #1f2937; text-decoration: none;">${escapeHtml(companyPhone)}</a></p>` : ''}
              ${companyEmail ? `<p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;"><a href="mailto:${escapeHtml(companyEmail)}" style="color: #1f2937; text-decoration: none;">${escapeHtml(companyEmail)}</a></p>` : ''}
            </td>
          </tr>

          <!-- Branding Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); padding: 28px 24px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #fbbf24;">Powered by Elec-Mate</p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">Professional electrical contracting tools</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `;

    // ========================================================================
    // STEP 10: Send email via Resend
    // ========================================================================
    const replyToEmail = companyEmail || 'info@elec-mate.com';
    const subject = `Project Photos: ${projectName} - ${companyName}`;

    console.log(`Sending to: ${recipientEmail}`);
    console.log(`Reply-to: ${replyToEmail}`);

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `${companyName} <founder@elec-mate.com>`,
      reply_to: replyToEmail,
      to: [recipientEmail.trim()],
      subject: subject,
      html: emailHtml,
    });

    if (emailError) {
      console.error('Resend API error:', emailError);
      throw new Error(`Failed to send email: ${emailError.message || 'Unknown error'}`);
    }

    console.log('Email sent:', emailData?.id);

    // ========================================================================
    // STEP 11: Return success response
    // ========================================================================
    const duration = Date.now() - startTime;
    console.log(`Complete in ${duration}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Photos sent successfully to ${recipientEmail}`,
        emailId: emailData?.id,
        photoCount: photoData.length,
        duration: `${duration}ms`,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const duration = Date.now() - startTime;
    console.error(`Error after ${duration}ms:`, error);
    const message = error instanceof Error ? error.message : 'Failed to send photos';

    // Capture to Sentry
    await captureException(error, {
      functionName: 'send-photos-resend',
      requestUrl: req.url,
      requestMethod: req.method,
      extra: { duration, hasResendKey: !!Deno.env.get('RESEND_API_KEY') },
    });

    return new Response(
      JSON.stringify({
        success: false,
        message,
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
