import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildPhotosSendEmail } from '../_shared/email-templates/photos-send.ts';
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
    console.log('Company:', companyName);

    // ========================================================================
    // STEP 8: Build email via shared template
    // ========================================================================
    const photosPayload = buildPhotosSendEmail({
      company: {
        name: companyName,
        logoUrl: companyProfile?.logo_url || companyProfile?.logo_data_url || null,
        primaryColor: companyProfile?.primary_color || null,
        email: companyEmail || null,
        phone: companyProfile?.company_phone || null,
        website: companyProfile?.company_website || null,
        address: companyProfile?.company_address || null,
        vatNumber: companyProfile?.vat_number || null,
        registrationNumber: companyProfile?.company_registration || null,
      },
      recipientName: recipientName || 'there',
      projectName,
      message: message || null,
      photos: photoData.map((p) => ({
        thumbnailUrl: p.thumbnailUrl,
        fullSizeUrl: p.signedUrl,
        caption: p.caption || null,
      })),
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=photos_send&id=${projectId}`,
    });
    const emailHtml = photosPayload.html;

    // ========================================================================
    // STEP 10: Send email via Resend
    // ========================================================================
    // ELE-662 — centralised sender. See _shared/mailer.ts:clientFacingSender.
    const sender = clientFacingSender({
      companyName,
      companyEmail,
      userEmail: user.email,
    });
    const subject = photosPayload.subject;

    console.log(`Sending to: ${recipientEmail}`);
    console.log(`From: ${sender.from}`);
    console.log(`Reply-to: ${sender.replyTo || '(none)'}`);

    const { data: emailData, error: emailError } = await resend.emails.send({
      ...sender,
      to: [recipientEmail.trim()],
      subject: subject,
      html: emailHtml,
      text: htmlToPlainText(emailHtml),
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
