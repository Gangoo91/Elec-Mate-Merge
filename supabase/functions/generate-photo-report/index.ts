import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// ============================================================================
// PHOTO TYPE DEFINITIONS
// ============================================================================

const PHOTO_TYPE_LABELS: Record<string, string> = {
  safety: 'Safety',
  job_progress: 'Job Progress',
  completion: 'Completion',
  snagging: 'Snagging',
  before: 'Before',
  after: 'After',
  general: 'General',
};

const PHOTO_TYPE_COLOURS: Record<string, string> = {
  safety: '#22c55e',
  job_progress: '#3b82f6',
  completion: '#10b981',
  snagging: '#f97316',
  before: '#6366f1',
  after: '#a855f7',
  general: '#6b7280',
};

/** Ordered list of photo type keys for consistent section ordering */
const PHOTO_TYPE_ORDER = [
  'safety',
  'job_progress',
  'completion',
  'snagging',
  'before',
  'after',
  'general',
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Extract storage path from a public Supabase URL
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
 * Escape HTML to prevent XSS in rendered content
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Format a date string into a readable UK format
 */
function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Format a date string into a short UK format for photo timestamps
 */
function formatDateTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

// ============================================================================
// INTERFACES
// ============================================================================

interface PhotoRecord {
  id: string;
  caption?: string;
  description?: string;
  title?: string;
  notes?: string;
  photo_type?: string;
  location?: string;
  storage_path?: string;
  file_path?: string;
  file_url?: string;
  created_at: string;
}

interface ResolvedPhoto {
  id: string;
  caption: string;
  notes: string;
  photoType: string;
  location: string;
  signedUrl: string;
  createdAt: string;
}

// ============================================================================
// HTML BUILDER
// ============================================================================

function buildReportHtml(
  project: Record<string, unknown>,
  groupedPhotos: Map<string, ResolvedPhoto[]>,
  companyName: string,
  companyLogoUrl: string | null,
  companyPhone: string,
  companyEmail: string,
  totalPhotoCount: number,
  dateRange: { earliest: string; latest: string }
): string {
  // -- Cover section details --
  const safeProjectName = escapeHtml(project.name || 'Untitled Project');
  const safeCustomerName = project.customer_name ? escapeHtml(project.customer_name) : '';
  const safeAddress = project.address ? escapeHtml(project.address) : '';
  const safeJobReference = project.job_reference ? escapeHtml(project.job_reference) : '';
  const safeCompanyName = escapeHtml(companyName);

  // -- Build photo sections --
  let photoSectionsHtml = '';

  for (const typeKey of PHOTO_TYPE_ORDER) {
    const photos = groupedPhotos.get(typeKey);
    if (!photos || photos.length === 0) continue;

    const typeLabel = PHOTO_TYPE_LABELS[typeKey] || typeKey;
    const typeColour = PHOTO_TYPE_COLOURS[typeKey] || '#6b7280';

    let photosHtml = '';
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const safeCaption = photo.caption ? escapeHtml(photo.caption) : '';
      const safeNotes = photo.notes ? escapeHtml(photo.notes) : '';
      const safeLocation = photo.location ? escapeHtml(photo.location) : '';

      photosHtml += `
        <div class="photo-card">
          <div class="photo-timeline-dot" style="background-color: ${typeColour};"></div>
          <div class="photo-timeline-line" style="background-color: ${typeColour}40;"></div>
          <div class="photo-content">
            <div class="photo-image-wrapper">
              <img src="${photo.signedUrl}" alt="${safeCaption || `Photo ${i + 1}`}" class="photo-image" />
            </div>
            <div class="photo-details">
              ${safeCaption ? `<p class="photo-caption">${safeCaption}</p>` : ''}
              ${safeNotes ? `<p class="photo-notes">${safeNotes}</p>` : ''}
              <div class="photo-meta">
                <span class="photo-date">${formatDateTime(photo.createdAt)}</span>
                ${safeLocation ? `<span class="photo-location">${safeLocation}</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    photoSectionsHtml += `
      <div class="type-section">
        <div class="type-header" style="background-color: ${typeColour};">
          <h2 class="type-title">${escapeHtml(typeLabel)}</h2>
          <span class="type-count">${photos.length} photo${photos.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="type-photos">
          ${photosHtml}
        </div>
      </div>
    `;
  }

  // -- Build full HTML document --
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Photo Report - ${safeProjectName}</title>
  <style>
    /* ================================================================
       BASE STYLES
       ================================================================ */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-colour: #f8fafc;
      background-color: #f8fafc;
      color: #1f2937;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    /* ================================================================
       A4 PAGE SIZING
       ================================================================ */
    .page-container {
      max-width: 210mm;
      margin: 0 auto;
      padding: 20px;
    }

    /* ================================================================
       HEADER / TOOLBAR
       ================================================================ */
    .report-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: centre;
      align-items: center;
      padding: 16px 24px;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border-radius: 12px;
      margin-bottom: 24px;
    }

    .toolbar-brand {
      display: flex;
      align-items: centre;
      align-items: center;
      gap: 16px;
    }

    .toolbar-logo {
      max-height: 48px;
      max-width: 160px;
    }

    .toolbar-title {
      color: #fbbf24;
      font-size: 20px;
      font-weight: 700;
    }

    .toolbar-subtitle {
      color: #9ca3af;
      font-size: 13px;
    }

    .print-btn {
      background: #fbbf24;
      color: #1a1a1a;
      border: none;
      padding: 10px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .print-btn:hover {
      background: #f59e0b;
    }

    /* ================================================================
       COVER SECTION
       ================================================================ */
    .cover-section {
      background: #ffffff;
      border-radius: 12px;
      border: 2px solid #e5e7eb;
      overflow: hidden;
      margin-bottom: 32px;
      page-break-after: always;
    }

    .cover-header {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      padding: 48px 32px;
      text-align: centre;
      text-align: center;
    }

    .cover-company-logo {
      max-height: 80px;
      max-width: 240px;
      margin-bottom: 24px;
    }

    .cover-company-name {
      color: #fbbf24;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .cover-report-label {
      color: #9ca3af;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .cover-body {
      padding: 40px 32px;
    }

    .cover-project-name {
      font-size: 32px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 24px;
      border-bottom: 3px solid #fbbf24;
      padding-bottom: 16px;
    }

    .cover-details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .cover-detail-item {
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .cover-detail-label {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }

    .cover-detail-value {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }

    /* ================================================================
       TYPE SECTIONS
       ================================================================ */
    .type-section {
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      overflow: hidden;
      margin-bottom: 24px;
    }

    .type-header {
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: centre;
      align-items: center;
    }

    .type-title {
      color: #ffffff;
      font-size: 18px;
      font-weight: 700;
    }

    .type-count {
      color: rgba(255, 255, 255, 0.85);
      font-size: 14px;
      font-weight: 500;
    }

    .type-photos {
      padding: 24px;
    }

    /* ================================================================
       PHOTO CARDS (TIMELINE)
       ================================================================ */
    .photo-card {
      position: relative;
      padding-left: 32px;
      margin-bottom: 32px;
    }

    .photo-card:last-child {
      margin-bottom: 0;
    }

    .photo-card:last-child .photo-timeline-line {
      display: none;
    }

    .photo-timeline-dot {
      position: absolute;
      left: 0;
      top: 8px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 3px solid #ffffff;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
      z-index: 1;
    }

    .photo-timeline-line {
      position: absolute;
      left: 6px;
      top: 26px;
      bottom: -32px;
      width: 2px;
    }

    .photo-content {
      background: #f8fafc;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      overflow: hidden;
    }

    .photo-image-wrapper {
      width: 100%;
      overflow: hidden;
    }

    .photo-image {
      width: 100%;
      display: block;
      object-fit: contain;
      max-height: 600px;
    }

    .photo-details {
      padding: 16px 20px;
    }

    .photo-caption {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 6px;
    }

    .photo-notes {
      font-size: 14px;
      color: #4b5563;
      margin-bottom: 10px;
      line-height: 1.5;
    }

    .photo-meta {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      font-size: 13px;
      color: #6b7280;
    }

    .photo-date::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 4px;
      vertical-align: middle;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236b7280'%3E%3Cpath fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clip-rule='evenodd'/%3E%3C/svg%3E");
      background-size: contain;
    }

    .photo-location::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 4px;
      vertical-align: middle;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236b7280'%3E%3Cpath fill-rule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clip-rule='evenodd'/%3E%3C/svg%3E");
      background-size: contain;
    }

    /* ================================================================
       FOOTER
       ================================================================ */
    .report-footer {
      background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
      border-radius: 12px;
      padding: 32px;
      text-align: centre;
      text-align: center;
      margin-top: 32px;
    }

    .footer-company {
      color: #ffffff;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .footer-contact {
      color: #9ca3af;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .footer-powered {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #374151;
    }

    .footer-powered-text {
      color: #fbbf24;
      font-size: 14px;
      font-weight: 600;
    }

    .footer-powered-sub {
      color: #6b7280;
      font-size: 12px;
      margin-top: 4px;
    }

    /* ================================================================
       PRINT STYLES
       ================================================================ */
    @media print {
      body {
        background: #ffffff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .page-container {
        max-width: none;
        padding: 0;
        margin: 0;
      }

      .report-toolbar {
        display: none !important;
      }

      .print-btn {
        display: none !important;
      }

      .cover-section {
        border: none;
        page-break-after: always;
      }

      .type-section {
        page-break-inside: avoid;
        border: none;
        box-shadow: none;
      }

      .photo-card {
        page-break-inside: avoid;
      }

      .photo-image {
        max-height: 400px;
      }

      .report-footer {
        page-break-before: always;
      }
    }

    @page {
      size: A4;
      margin: 15mm;
    }
  </style>
</head>
<body>
  <div class="page-container">

    <!-- Toolbar (hidden on print) -->
    <div class="report-toolbar">
      <div class="toolbar-brand">
        ${companyLogoUrl ? `<img src="${companyLogoUrl}" alt="${safeCompanyName}" class="toolbar-logo" />` : ''}
        <div>
          <div class="toolbar-title">${safeCompanyName}</div>
          <div class="toolbar-subtitle">Photo Report</div>
        </div>
      </div>
      <button class="print-btn" onclick="window.print()">Print Report</button>
    </div>

    <!-- Cover Section -->
    <div class="cover-section">
      <div class="cover-header">
        ${companyLogoUrl ? `<img src="${companyLogoUrl}" alt="${safeCompanyName}" class="cover-company-logo" /><br />` : ''}
        <div class="cover-company-name">${safeCompanyName}</div>
        <div class="cover-report-label">Photo Report</div>
      </div>
      <div class="cover-body">
        <h1 class="cover-project-name">${safeProjectName}</h1>
        <div class="cover-details-grid">
          ${
            safeCustomerName
              ? `
          <div class="cover-detail-item">
            <div class="cover-detail-label">Customer</div>
            <div class="cover-detail-value">${safeCustomerName}</div>
          </div>
          `
              : ''
          }
          ${
            safeAddress
              ? `
          <div class="cover-detail-item">
            <div class="cover-detail-label">Address</div>
            <div class="cover-detail-value">${safeAddress}</div>
          </div>
          `
              : ''
          }
          ${
            safeJobReference
              ? `
          <div class="cover-detail-item">
            <div class="cover-detail-label">Job Reference</div>
            <div class="cover-detail-value">${safeJobReference}</div>
          </div>
          `
              : ''
          }
          <div class="cover-detail-item">
            <div class="cover-detail-label">Total Photos</div>
            <div class="cover-detail-value">${totalPhotoCount}</div>
          </div>
          <div class="cover-detail-item">
            <div class="cover-detail-label">Date Range</div>
            <div class="cover-detail-value">${formatDate(dateRange.earliest)} &mdash; ${formatDate(dateRange.latest)}</div>
          </div>
          <div class="cover-detail-item">
            <div class="cover-detail-label">Generated</div>
            <div class="cover-detail-value">${formatDate(new Date().toISOString())}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Photo Sections -->
    ${photoSectionsHtml}

    <!-- Footer -->
    <div class="report-footer">
      <div class="footer-company">${safeCompanyName}</div>
      ${companyPhone ? `<div class="footer-contact">${escapeHtml(companyPhone)}</div>` : ''}
      ${companyEmail ? `<div class="footer-contact">${escapeHtml(companyEmail)}</div>` : ''}
      <div class="footer-powered">
        <div class="footer-powered-text">Powered by Elec-Mate</div>
        <div class="footer-powered-sub">Professional electrical contracting tools</div>
      </div>
    </div>

  </div>
</body>
</html>`;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  const startTime = Date.now();
  console.log('Photo Report | Started:', new Date().toISOString());

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ========================================================================
    // STEP 1: Validate environment
    // ========================================================================
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables missing');
      throw new Error('Database service not configured. Please contact support.');
    }

    console.log('Environment validated');

    // ========================================================================
    // STEP 2: Authenticate user
    // ========================================================================
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No Authorization header found');
      throw new Error('Please log in to generate a report.');
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
    let body: { projectId: string };
    try {
      body = await req.json();
    } catch (e) {
      console.error('Failed to parse request body:', e);
      throw new Error('Invalid request format.');
    }

    const { projectId } = body;

    if (!projectId || typeof projectId !== 'string') {
      throw new Error('Project ID is required.');
    }

    console.log('Request validated - projectId:', projectId);

    // ========================================================================
    // STEP 4: Fetch the project (ensuring user ownership)
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

    console.log('Project fetched:', project.name || 'Untitled');

    // ========================================================================
    // STEP 5: Fetch all photos for this project
    // ========================================================================
    const { data: photos, error: photosError } = await supabaseClient
      .from('safety_photos')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (photosError) {
      console.error('Database error fetching photos:', photosError);
      throw new Error('Could not fetch photos for this project.');
    }

    if (!photos || photos.length === 0) {
      throw new Error('No photos found for this project.');
    }

    console.log(`Fetched ${photos.length} photo(s)`);

    // ========================================================================
    // STEP 6: Fetch company profile for branding
    // ========================================================================
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'ElecMate';
    const companyEmail = companyProfile?.company_email || '';
    const companyPhone = companyProfile?.company_phone || '';
    const companyLogoUrl = companyProfile?.logo_url || null;
    console.log('Company:', companyName);

    // ========================================================================
    // STEP 7: Generate signed URLs for each photo (1hr expiry)
    // ========================================================================
    const resolvedPhotos: ResolvedPhoto[] = [];

    for (const photo of photos as PhotoRecord[]) {
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

      resolvedPhotos.push({
        id: photo.id,
        caption: photo.caption || photo.description || photo.title || '',
        notes: photo.notes || '',
        photoType: photo.photo_type || 'general',
        location: photo.location || '',
        signedUrl: signedUrlData.signedUrl,
        createdAt: photo.created_at,
      });
    }

    if (resolvedPhotos.length === 0) {
      throw new Error('Could not generate download links for any photos. Please try again.');
    }

    console.log(`Generated signed URLs for ${resolvedPhotos.length} photo(s)`);

    // ========================================================================
    // STEP 8: Group photos by type
    // ========================================================================
    const groupedPhotos = new Map<string, ResolvedPhoto[]>();

    for (const photo of resolvedPhotos) {
      const typeKey = photo.photoType.toLowerCase().replace(/\s+/g, '_');
      const normalised = PHOTO_TYPE_LABELS[typeKey] ? typeKey : 'general';

      if (!groupedPhotos.has(normalised)) {
        groupedPhotos.set(normalised, []);
      }
      groupedPhotos.get(normalised)!.push(photo);
    }

    // ========================================================================
    // STEP 9: Calculate date range
    // ========================================================================
    const dates = resolvedPhotos.map((p) => new Date(p.createdAt).getTime());
    const dateRange = {
      earliest: new Date(Math.min(...dates)).toISOString(),
      latest: new Date(Math.max(...dates)).toISOString(),
    };

    // ========================================================================
    // STEP 10: Build HTML report
    // ========================================================================
    const reportHtml = buildReportHtml(
      project,
      groupedPhotos,
      companyName,
      companyLogoUrl,
      companyPhone,
      companyEmail,
      resolvedPhotos.length,
      dateRange
    );

    // ========================================================================
    // STEP 11: Return HTML response
    // ========================================================================
    const duration = Date.now() - startTime;
    console.log(`Report generated in ${duration}ms | ${resolvedPhotos.length} photos`);

    return new Response(reportHtml, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error: unknown) {
    const duration = Date.now() - startTime;
    console.error(`Error after ${duration}ms:`, error);
    const message = error instanceof Error ? error.message : 'Failed to generate photo report';

    // Capture to Sentry
    await captureException(error, {
      functionName: 'generate-photo-report',
      requestUrl: req.url,
      requestMethod: req.method,
      extra: { duration },
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
