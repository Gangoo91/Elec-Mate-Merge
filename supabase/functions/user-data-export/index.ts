// ELE-400, ELE-401, ELE-405, ELE-408
// User Data Export — GDPR Art. 15 (Right of Access) & Art. 20 (Data Portability)
// Exports all personal data, writes audit log, sends confirmation email

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from '../_shared/mailer.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Helper: fetch from a table by user_id, return [] on any error
async function fetchTable(
  supabase: ReturnType<typeof createClient>,
  table: string,
  userId: string,
  userIdColumn = 'user_id'
): Promise<unknown[]> {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq(userIdColumn, userId);
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    // Authenticate the requesting user
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = userData.user.id;
    const userEmail = userData.user.email ?? '';
    const exportedAt = new Date().toISOString();

    console.log(`📦 GDPR data export started for user ${userId}`);

    // --- Collect all personal data ---
    const [
      profiles,
      certificates,
      inspectionReports,
      quotes,
      invoices,
      customers,
      projects,
      priceBookItems,
      timeEntries,
      siteAssessments,
      tasks,
      userSettings,
      quizAttempts,
      studyProgress,
      safeIsolationRecords,
      preUseChecks,
      portfolioItems,
      siteVisits,
      userSafetyDocuments,
      elecIdProfiles,
      elecIdEmployerProfiles,
    ] = await Promise.all([
      fetchTable(supabaseAdmin, 'profiles', userId, 'id'),
      fetchTable(supabaseAdmin, 'certificates', userId),
      fetchTable(supabaseAdmin, 'inspection_reports', userId),
      fetchTable(supabaseAdmin, 'quotes', userId),
      fetchTable(supabaseAdmin, 'invoices', userId),
      fetchTable(supabaseAdmin, 'customers', userId),
      fetchTable(supabaseAdmin, 'projects', userId),
      fetchTable(supabaseAdmin, 'price_book_items', userId),
      fetchTable(supabaseAdmin, 'time_entries', userId),
      fetchTable(supabaseAdmin, 'site_assessments', userId),
      fetchTable(supabaseAdmin, 'tasks', userId),
      fetchTable(supabaseAdmin, 'user_settings', userId),
      fetchTable(supabaseAdmin, 'quiz_attempts', userId),
      fetchTable(supabaseAdmin, 'study_progress', userId),
      fetchTable(supabaseAdmin, 'safe_isolation_records', userId),
      fetchTable(supabaseAdmin, 'pre_use_checks', userId),
      fetchTable(supabaseAdmin, 'portfolio_items', userId),
      fetchTable(supabaseAdmin, 'site_visits', userId),
      fetchTable(supabaseAdmin, 'user_safety_documents', userId),
      fetchTable(supabaseAdmin, 'elec_id_profiles', userId),
      fetchTable(supabaseAdmin, 'employer_elec_id_profiles', userId),
    ]);

    // Build export object — only include sections that have data
    const exportData: Record<string, unknown> = {};

    if (profiles.length > 0) exportData.profile = profiles[0];
    if (certificates.length > 0) exportData.certificates = certificates;
    if (inspectionReports.length > 0) exportData.inspectionReports = inspectionReports;
    if (quotes.length > 0) exportData.quotes = quotes;
    if (invoices.length > 0) exportData.invoices = invoices;
    if (customers.length > 0) exportData.customers = customers;
    if (projects.length > 0) exportData.projects = projects;
    if (priceBookItems.length > 0) exportData.priceBookItems = priceBookItems;
    if (timeEntries.length > 0) exportData.timeEntries = timeEntries;
    if (siteAssessments.length > 0) exportData.siteAssessments = siteAssessments;
    if (tasks.length > 0) exportData.tasks = tasks;
    if (userSettings.length > 0) exportData.settings = userSettings;
    if (quizAttempts.length > 0) exportData.quizAttempts = quizAttempts;
    if (studyProgress.length > 0) exportData.studyProgress = studyProgress;
    if (safeIsolationRecords.length > 0) exportData.safeIsolationRecords = safeIsolationRecords;
    if (preUseChecks.length > 0) exportData.preUseChecks = preUseChecks;
    if (portfolioItems.length > 0) exportData.portfolioItems = portfolioItems;
    if (siteVisits.length > 0) exportData.siteVisits = siteVisits;
    if (userSafetyDocuments.length > 0) exportData.safetyDocuments = userSafetyDocuments;
    if (elecIdProfiles.length > 0) exportData.elecIdProfile = elecIdProfiles[0];
    if (elecIdEmployerProfiles.length > 0) exportData.elecIdEmployerProfile = elecIdEmployerProfiles[0];

    const fullExport = {
      exportedAt,
      exportVersion: '2.0',
      userId,
      dataController: {
        name: 'Elec-Mate Ltd',
        icoRegistration: 'ZB935897',
        contact: 'privacy@elec-mate.com',
      },
      gdprNote:
        'This export fulfils your right of access (UK GDPR Article 15) and right to data portability (Article 20). Data is provided in machine-readable JSON format.',
      data: exportData,
    };

    // --- Write audit log (non-blocking — failure does not fail the export) ---
    supabaseAdmin
      .from('security_audit_log')
      .insert({
        user_id: userId,
        action: 'gdpr_data_export',
        table_name: 'all',
        record_id: userId,
        metadata: {
          exportedAt,
          sectionsExported: Object.keys(exportData),
          totalSections: Object.keys(exportData).length,
        },
      })
      .then(({ error }) => {
        if (error) console.warn('Audit log write failed (non-critical):', error.message);
      });

    // --- Send confirmation email (non-blocking) ---
    if (userEmail) {
      resend.emails
        .send({
          from: 'Elec-Mate <noreply@elec-mate.com>',
          to: [userEmail],
          subject: 'Your Elec-Mate data export',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 12px;">
              <div style="margin-bottom: 24px;">
                <span style="background: #FACC15; color: #000; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 14px;">⚡ Elec-Mate</span>
              </div>
              <h2 style="color: #fff; margin-bottom: 8px;">Your data export is ready</h2>
              <p style="color: #aaa; margin-bottom: 24px;">
                Your data export was requested on <strong style="color: #fff;">${new Date(exportedAt).toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'long', timeStyle: 'short' })}</strong>.
              </p>
              <p style="color: #aaa;">
                This export contains all personal data we hold about you, fulfilling your right of access under UK GDPR Article 15.
              </p>
              <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin: 24px 0;">
                <p style="color: #FACC15; margin: 0 0 8px; font-weight: bold;">⚠️ Security notice</p>
                <p style="color: #aaa; margin: 0; font-size: 14px;">
                  If you did not request this data export, please contact us immediately at 
                  <a href="mailto:privacy@elec-mate.com" style="color: #FACC15;">privacy@elec-mate.com</a>.
                  Your account may be at risk.
                </p>
              </div>
              <p style="color: #666; font-size: 12px; margin-top: 32px;">
                Elec-Mate Ltd · ICO Registration: ZB935897 · privacy@elec-mate.com
              </p>
            </div>
          `,
        })
        .catch((err: unknown) => console.warn('Confirmation email failed (non-critical):', err));
    }

    console.log(`✅ GDPR data export completed for user ${userId} — ${Object.keys(exportData).length} sections`);

    return new Response(JSON.stringify(fullExport), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Data export error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Export failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
