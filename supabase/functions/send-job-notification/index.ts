/**
 * send-job-notification — emails a worker when they're assigned to a job.
 *
 * Recreated in-repo from deployed v83 (which was founder-branded and called
 * Resend directly). Same request contract and function-level behaviour:
 *   - POST { employee_id, job_id, job_title, job_location, start_date, end_date?, notes? }
 *   - worker without an email → success (skip), email service unconfigured → success (skip)
 * Changes vs v83:
 *   - Sends via Brevo through _shared/mailer.ts (Resend was domain-banned, ELE-765)
 *   - Branded with the EMPLOYER'S company profile (company_name, falling back
 *     to the employer's profile name) instead of hardcoded founder branding
 *   - DMARC-aligned From via clientFacingSender; Reply-To = employer's email
 *   - Shared CORS headers incl. x-request-id
 */
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { sendEmail, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildJobAssignedEmail, teamCompany, firstNameOf } from '../_shared/email-templates/team.ts';

import { withSentry } from '../_shared/sentry.ts';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface JobNotificationRequest {
  employee_id: string;
  job_id: string;
  job_title: string;
  job_location: string;
  start_date: string;
  end_date?: string;
  notes?: string;
}

const escapeHtml = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// RFC 5545 TEXT escaping — backslash, semicolon, comma and newlines must be
// escaped or a job title like "First fix, Unit 3; Bay 2" (or multi-line
// notes) produces a malformed VEVENT that calendar apps reject.
const escapeICSText = (s: unknown) =>
  String(s ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');

// Generate ICS calendar file content
function generateICS(job: {
  title: string;
  location: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  organiser: string;
}): string {
  const formatDateForICS = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDateICS = formatDateForICS(job.startDate);
  const endDateICS = job.endDate
    ? formatDateForICS(job.endDate)
    : formatDateForICS(
        new Date(new Date(job.startDate).getTime() + 8 * 60 * 60 * 1000).toISOString()
      );
  const stamp = formatDateForICS(new Date().toISOString());
  const uid = `${Date.now()}@elecmate.app`;

  // CRLF line endings + DTSTAMP are both REQUIRED by RFC 5545 — Outlook in
  // particular refuses events without them.
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${escapeICSText(job.organiser)}//Job Assignment//EN`,
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${startDateICS}`,
    `DTEND:${endDateICS}`,
    `SUMMARY:${escapeICSText(job.title)}`,
    `LOCATION:${escapeICSText(job.location)}`,
    `DESCRIPTION:${escapeICSText(job.notes || `You have been assigned to ${job.title}`)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

// btoa() throws on any character outside Latin-1 (smart quotes, é, emoji in a
// job title would kill the whole send) — encode the UTF-8 bytes instead.
const base64EncodeUtf8 = (s: string): string => {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const emailKey = Deno.env.get('BREVO_API_KEY') || Deno.env.get('RESEND_API_KEY');

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Auth: only the employee's own employer may trigger this notification
    // (deployed v83 had no auth at all — open email-trigger endpoint).
    const authHeader = req.headers.get('Authorization') ?? '';
    const {
      data: { user },
    } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const {
      employee_id,
      job_id,
      job_title,
      job_location,
      start_date,
      end_date,
      notes,
    }: JobNotificationRequest = await req.json();

    console.log(`Processing job notification for employee ${employee_id} on job ${job_id}`);

    // Fetch employee details (employer_id gives us whose firm to brand as)
    const { data: employee, error: employeeError } = await supabase
      .from('employer_employees')
      .select('name, email, phone, employer_id')
      .eq('id', employee_id)
      .single();

    // Companies the caller may act for: their own account plus any firm where
    // they hold an active co-admin seat. Resolved explicitly (rather than via
    // my_employer_scope) because this function holds a service-role client, not
    // a caller-scoped one. An ordinary owner resolves to just [user.id], so
    // behaviour is unchanged for them.
    const { data: coAdminRows } = await supabase
      .from('employer_admins')
      .select('employer_id')
      .eq('user_id', user.id)
      .eq('status', 'active');
    const allowedEmployerIds = [
      user.id,
      ...((coAdminRows ?? []) as Array<{ employer_id: string }>).map((r) => r.employer_id),
    ];

    if (!employeeError && employee && !allowedEmployerIds.includes(employee.employer_id)) {
      return new Response(JSON.stringify({ error: 'Not your team member' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (employeeError || !employee) {
      console.error('Error fetching employee:', employeeError);
      return new Response(JSON.stringify({ error: 'Employee not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // The job must be the same firm's, or the email would link a worker to
    // another company's job.
    if (job_id) {
      const { data: job } = await supabase
        .from('employer_jobs')
        .select('user_id')
        .eq('id', job_id)
        .maybeSingle();
      if (!job || job.user_id !== employee.employer_id) {
        return new Response(JSON.stringify({ error: 'Job not found for this firm' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    if (!employee.email) {
      console.log(`No email address for employee ${employee.name}, skipping email notification`);
      return new Response(
        JSON.stringify({ success: true, message: 'No email address, skipping email' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!emailKey) {
      console.log('No email API key configured, skipping email notification');
      return new Response(
        JSON.stringify({ success: true, message: 'Email service not configured' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Brand with the employer's company profile (ELE-2013: the house shell —
    // firm logo/colour, one hero, one button — not a generic gradient).
    let companyProfile: Record<string, unknown> | null = null;
    let fallbackName = 'Your employer';
    if (employee.employer_id) {
      const { data: company } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', employee.employer_id)
        .maybeSingle();
      companyProfile = company ?? null;
      if (!company?.company_name) {
        const { data: employerProfile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', employee.employer_id)
          .maybeSingle();
        fallbackName = employerProfile?.full_name || fallbackName;
      }
    }
    const company = teamCompany(companyProfile, fallbackName);
    const displayName = company.name;
    const companyEmail = (companyProfile?.company_email as string | undefined) ?? null;

    // Who else is on the job, and anything to sign before starting.
    const { data: crewRows } = await supabase
      .from('employer_job_assignments')
      .select('employee:employer_employees(name)')
      .eq('job_id', job_id)
      .neq('employee_id', employee_id);
    const crew = ((crewRows ?? []) as Array<{ employee: { name?: string } | null }>)
      .map((r) => firstNameOf(r.employee?.name))
      .filter((n) => n && n !== 'there');
    const { data: packs } = await supabase
      .from('employer_job_packs')
      .select('id')
      .eq('job_id', job_id);
    let toSign: string | null = null;
    if (packs?.length) {
      const { data: acks } = await supabase
        .from('employer_job_pack_acknowledgements')
        .select('job_pack_id')
        .eq('employee_id', employee_id)
        .in('job_pack_id', packs.map((p: { id: string }) => p.id));
      const unsigned = packs.length - (acks?.length ?? 0);
      if (unsigned > 0) toSign = `${unsigned} safety pack${unsigned === 1 ? '' : 's'}`;
    }

    const icsContent = generateICS({
      title: job_title,
      location: job_location,
      startDate: start_date,
      endDate: end_date,
      notes: notes,
      organiser: displayName,
    });

    const email = buildJobAssignedEmail({
      company,
      recipientName: employee.name,
      jobId: job_id,
      jobTitle: job_title,
      location: job_location,
      start: start_date,
      end: end_date ?? null,
      notes: notes ?? null,
      crew,
      toSign,
    });
    const html = email.html;

    // DMARC-aligned sender: From displays the employer's company name,
    // Reply-To goes to the employer's own email (never founder@).
    const sender = clientFacingSender({
      companyName: displayName,
      companyEmail,
    });

    const { data: emailData, error: emailError } = await sendEmail({
      ...sender,
      to: [employee.email],
      subject: email.subject,
      html,
      text: htmlToPlainText(html),
      attachments: [
        {
          filename: 'job-assignment.ics',
          content: base64EncodeUtf8(icsContent),
        },
      ],
    });

    if (emailError) {
      console.error('Email send error:', emailError);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: emailError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Email sent successfully:', emailData?.id);

    return new Response(JSON.stringify({ success: true, emailId: emailData?.id || null }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in send-job-notification:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(withSentry('send-job-notification', handler));
