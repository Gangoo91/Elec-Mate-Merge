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

    if (!employeeError && employee && employee.employer_id !== user.id) {
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

    // Brand with the employer's company profile; fall back to their profile name
    let companyName: string | null = null;
    let companyEmail: string | null = null;
    if (employee.employer_id) {
      const { data: company } = await supabase
        .from('company_profiles')
        .select('company_name, company_email')
        .eq('user_id', employee.employer_id)
        .maybeSingle();
      companyName = company?.company_name || null;
      companyEmail = company?.company_email || null;

      if (!companyName) {
        const { data: employerProfile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', employee.employer_id)
          .maybeSingle();
        companyName = employerProfile?.full_name || null;
      }
    }
    const displayName = companyName || 'Your Employer';

    const icsContent = generateICS({
      title: job_title,
      location: job_location,
      startDate: start_date,
      endDate: end_date,
      notes: notes,
      organiser: displayName,
    });

    const formatDate = (dateStr: string) => {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #FACC15 0%, #F59E0B 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #1a1a1a; margin: 0; font-size: 24px;">New Job Assignment</h1>
          <p style="color: #1a1a1a; opacity: 0.8; margin: 5px 0 0 0;">${escapeHtml(displayName)}</p>
        </div>

        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="margin: 0 0 20px 0;">Hi ${escapeHtml(employee.name)},</p>

          <p style="margin: 0 0 20px 0;">You have been assigned to a new job:</p>

          <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
            <h2 style="margin: 0 0 15px 0; color: #1a1a1a; font-size: 20px;">${escapeHtml(job_title)}</h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 100px;">Location:</td>
                <td style="padding: 8px 0; font-weight: 500;">${escapeHtml(job_location)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Start Date:</td>
                <td style="padding: 8px 0; font-weight: 500;">${formatDate(start_date)}</td>
              </tr>
              ${
                end_date
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #666;">End Date:</td>
                <td style="padding: 8px 0; font-weight: 500;">${formatDate(end_date)}</td>
              </tr>
              `
                  : ''
              }
              ${
                notes
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top;">Notes:</td>
                <td style="padding: 8px 0;">${escapeHtml(notes)}</td>
              </tr>
              `
                  : ''
              }
            </table>
          </div>

          <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">
            A calendar event is attached to this email. Open it to add this job to your calendar.
          </p>

          <p style="margin: 20px 0 0 0; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px;">
            Best regards,<br>
            <strong>${escapeHtml(displayName)}</strong>
          </p>
        </div>
      </body>
      </html>
    `;

    // DMARC-aligned sender: From displays the employer's company name,
    // Reply-To goes to the employer's own email (never founder@).
    const sender = clientFacingSender({
      companyName: displayName,
      companyEmail,
    });

    const { data: emailData, error: emailError } = await sendEmail({
      ...sender,
      to: [employee.email],
      subject: `New Job Assignment: ${job_title}`,
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

serve(handler);
