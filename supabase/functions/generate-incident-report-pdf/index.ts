// generate-incident-report-pdf (ELE-1945)
//
// Body: { incidentId: string, kind?: 'incident' | 'riddor' }
// Returns: { success, url } — a 1-hour signed URL to a private file.
//
// Firm-only: the caller must manage the firm that owns the incident
// (my_employer_scope). Incident reports carry injury details about named
// people, so they are never written to a public bucket.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { riddorTemplate } from '../_shared/safety-templates/riddor.ts';
import {
  employerIncidentTemplate,
  riddorDeadline,
  RIDDOR_CATEGORY_LABEL,
  isRiddorReportable,
} from '../_shared/safety-templates/employer-incident.ts';
import { htmlToPdf } from '../_shared/safety-pdf-renderer.ts';
import type { Branding } from '../_shared/safety-html-base.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-request-id',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ success: false, error: 'Sign in again to download this report.' }, 401);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const admin = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
    } = await userClient.auth.getUser();
    if (!user) return json({ success: false, error: 'Sign in again to download this report.' }, 401);

    const { incidentId, kind = 'incident' } = await req.json().catch(() => ({}));
    if (!incidentId || !UUID_RE.test(String(incidentId))) {
      return json({ success: false, error: 'Missing incident.' }, 400);
    }
    if (kind !== 'incident' && kind !== 'riddor') {
      return json({ success: false, error: 'Unknown report type.' }, 400);
    }

    const { data: incident } = await admin
      .from('employer_incidents')
      .select('*')
      .eq('id', incidentId)
      .maybeSingle();
    if (!incident) return json({ success: false, error: 'Incident not found.' }, 404);

    // Firm managers only (owner + co-admins). A worker can read their own
    // report in the app, but the firm's formal record is the firm's to issue.
    const { data: scope, error: scopeError } = await userClient.rpc('my_employer_scope');
    if (scopeError) throw scopeError;
    const scopeIds = (Array.isArray(scope) ? scope : [scope])
      .map((s: unknown) => (typeof s === 'string' ? s : (s as Record<string, string>)?.my_employer_scope))
      .filter(Boolean);
    if (!scopeIds.includes(incident.employer_id)) {
      return json({ success: false, error: 'Only the firm can download this report.' }, 403);
    }

    if (kind === 'riddor' && !isRiddorReportable(incident.riddor_category)) {
      return json(
        { success: false, error: 'Record the RIDDOR decision as reportable first.' },
        400
      );
    }

    // ── Names and context ───────────────────────────────────────────────
    const { data: profileRows } = await admin
      .from('company_profiles')
      .select(
        'company_name, company_address, company_postcode, company_phone, company_email, company_website, company_registration, vat_number, logo_data_url, logo_url, primary_color, secondary_color, scheme_logo_data_url, registration_scheme'
      )
      .eq('user_id', incident.employer_id)
      .limit(1);
    const branding: Branding = profileRows?.[0] ?? {};

    let reporterName = 'Not recorded';
    if (incident.reported_by) {
      if (UUID_RE.test(incident.reported_by)) {
        const { data: emp } = await admin
          .from('employer_employees')
          .select('name')
          .eq('id', incident.reported_by)
          .maybeSingle();
        reporterName = emp?.name || 'Team member';
      } else {
        reporterName = incident.reported_by;
      }
    }

    const nameOf = async (uid?: string | null) => {
      if (!uid) return null;
      const { data } = await admin.from('profiles').select('full_name').eq('id', uid).maybeSingle();
      return (data?.full_name as string | undefined) || null;
    };
    const [closedByName, acknowledgedByName] = await Promise.all([
      nameOf(incident.closed_by),
      nameOf(incident.acknowledged_by),
    ]);

    let injuredRole: string | null = null;
    if (incident.injured_employee_id) {
      const { data: injured } = await admin
        .from('employer_employees')
        .select('role, team_role')
        .eq('id', incident.injured_employee_id)
        .maybeSingle();
      injuredRole = (injured?.role as string | null) || (injured?.team_role as string | null) || null;
    }

    let jobTitle: string | null = null;
    if (incident.job_id) {
      const { data: job } = await admin
        .from('employer_jobs')
        .select('title')
        .eq('id', incident.job_id)
        .maybeSingle();
      jobTitle = job?.title ?? null;
    }

    // Photos live in the private visual-uploads bucket; sign them long
    // enough for the renderer to fetch them.
    const photoUrls: string[] = [];
    for (const path of (incident.photos ?? []) as string[]) {
      if (/^https?:\/\//.test(path)) {
        photoUrls.push(path);
        continue;
      }
      const { data: signed } = await admin.storage.from('visual-uploads').createSignedUrl(path, 600);
      if (signed?.signedUrl) photoUrls.push(signed.signedUrl);
    }

    // ── Build ───────────────────────────────────────────────────────────
    let html: string;
    if (kind === 'riddor') {
      const occurred = new Date(incident.reported_at);
      const actions = Array.isArray(incident.corrective_actions) ? incident.corrective_actions : [];
      const correctiveText = [
        incident.root_cause ? `Root cause: ${incident.root_cause}` : null,
        ...actions.map(
          (a: { action?: string; owner_name?: string; due_date?: string; done_at?: string }) =>
            `${a.action ?? ''}${a.owner_name ? ` (${a.owner_name})` : ''}${
              a.done_at
                ? ', done'
                : a.due_date
                  ? `, due ${new Date(a.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                  : ''
            }`
        ),
      ]
        .filter(Boolean)
        .join('; ');

      html = riddorTemplate(
        {
          id: String(incident.id).slice(0, 8).toUpperCase(),
          riddor_reported: !!incident.riddor_reported_at,
          riddor_reported_date: incident.riddor_reported_at,
          riddor_category: RIDDOR_CATEGORY_LABEL[incident.riddor_category] ?? incident.riddor_category,
          riddor_reference: incident.riddor_reference,
          riddor_deadline: riddorDeadline(incident.riddor_category, incident.reported_at)?.toISOString() ?? null,
          severity: incident.severity,
          hospital_visit: incident.hospital_visit,
          injured_name: incident.injured_person,
          injured_role: injuredRole,
          injured_employer: branding.company_name ?? null,
          incident_date: incident.reported_at,
          incident_time: occurred.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/London',
          }),
          location: [incident.location, jobTitle].filter(Boolean).join(' · '),
          injury_type: incident.injuries_sustained,
          incident_description: incident.description,
          witnesses: incident.witnesses,
          first_aid_given: incident.first_aid_given,
          time_off_work: (incident.days_off ?? 0) > 0,
          days_off: incident.days_off,
          corrective_actions: correctiveText || null,
          recorded_by: reporterName,
          created_at: incident.created_at,
        },
        branding
      );
    } else {
      html = employerIncidentTemplate(
        { incident, reporterName, jobTitle, closedByName, acknowledgedByName, photoUrls },
        branding
      );
    }

    const pdfBytes = await htmlToPdf(html);

    const path = `${incident.employer_id}/${incident.id}/${kind}-${Date.now()}.pdf`;
    const { error: uploadError } = await admin.storage
      .from('incident-reports')
      .upload(path, pdfBytes, { contentType: 'application/pdf', upsert: false });
    if (uploadError) throw uploadError;

    const { data: signed, error: signError } = await admin.storage
      .from('incident-reports')
      .createSignedUrl(path, 3600, {
        download: `${kind === 'riddor' ? 'RIDDOR' : 'Incident'}-${String(incident.id).slice(0, 8)}.pdf`,
      });
    if (signError || !signed?.signedUrl) throw signError ?? new Error('Could not sign the report');

    return json({ success: true, url: signed.signedUrl });
  } catch (error) {
    await captureException(error, {
      functionName: 'generate-incident-report-pdf',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('[generate-incident-report-pdf]', error);
    return json({ success: false, error: 'The report could not be built. Try again.' }, 500);
  }
});
