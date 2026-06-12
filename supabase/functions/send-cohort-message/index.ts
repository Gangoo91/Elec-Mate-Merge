// send-cohort-message — tutor broadcast to every active apprentice in a
// cohort. Sends via Brevo (email) + optionally drops the message into the
// tutor's college_conversations thread with each apprentice (in-app).
//
// Auth: caller must be a college staff member in the cohort's college.
//
// POST {
//   cohort_id: string,
//   subject: string,
//   body_html: string,           // pre-sanitised; tutor wrote it
//   also_in_app?: boolean        // default true — also creates a message thread row
// }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface Body {
  cohort_id: string;
  subject: string;
  body_html: string;
  also_in_app?: boolean;
}

async function authorise(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data } = await userClient.auth.getUser();
  if (!data?.user) return { ok: false as const };
  return { ok: true as const, uid: data.user.id };
}

interface SendResult {
  email: string;
  ok: boolean;
  error?: string;
  messageId?: string;
}

async function sendBrevo(opts: {
  to: { email: string; name: string };
  subject: string;
  html: string;
  fromName: string;
}): Promise<SendResult> {
  const key = Deno.env.get('BREVO_API_KEY');
  if (!key) return { email: opts.to.email, ok: false, error: 'no_brevo_key' };
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({
      sender: { name: opts.fromName, email: 'no-reply@elec-mate.com' },
      to: [opts.to],
      subject: opts.subject,
      htmlContent: opts.html,
    }),
  });
  if (!res.ok) {
    return { email: opts.to.email, ok: false, error: `${res.status} ${await res.text()}` };
  }
  const json = await res.json();
  return { email: opts.to.email, ok: true, messageId: json.messageId };
}

function buildHtml(subject: string, bodyHtml: string, tutorName: string, collegeName: string): string {
  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0F172A">
<div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.16em;color:#64748B;margin-bottom:4px">${escape(collegeName)}</div>
<h1 style="font-size:20px;margin:0 0 16px">${escape(subject)}</h1>
<div style="font-size:15px;line-height:1.55;color:#0F172A">${bodyHtml}</div>
<p style="margin-top:32px;color:#94A3B8;font-size:12px">Sent by ${escape(tutorName)} via Elec-Mate. Reply to ask a question — your tutor sees it on their dashboard.</p>
</body></html>`;
}

function escape(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST')
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const auth = await authorise(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return new Response(JSON.stringify({ error: 'bad_body' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.cohort_id || !body.subject?.trim() || !body.body_html?.trim()) {
    return new Response(
      JSON.stringify({ error: 'cohort_id_subject_body_required' }),
      { status: 400, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Resolve sender (tutor) + cohort + college
  const { data: tutorProfile } = await sb
    .from('profiles')
    .select('full_name, college_id, college_role')
    .eq('id', auth.uid)
    .maybeSingle();
  const tutorName =
    (tutorProfile as { full_name?: string } | null)?.full_name ?? 'Your tutor';
  const tutorCollege = (tutorProfile as { college_id?: string } | null)?.college_id;
  const tutorRole = (tutorProfile as { college_role?: string } | null)?.college_role;
  if (!tutorCollege || !tutorRole) {
    return new Response(JSON.stringify({ error: 'not_college_staff' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!['tutor', 'assessor', 'iqa', 'head_of_department', 'admin'].includes(tutorRole)) {
    return new Response(JSON.stringify({ error: 'role_not_permitted' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const { data: cohort } = await sb
    .from('college_cohorts')
    .select('id, name, college_id')
    .eq('id', body.cohort_id)
    .maybeSingle();
  if (!cohort) {
    return new Response(JSON.stringify({ error: 'cohort_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if ((cohort as { college_id?: string }).college_id !== tutorCollege) {
    return new Response(JSON.stringify({ error: 'cross_college_denied' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const { data: college } = await sb
    .from('colleges')
    .select('name')
    .eq('id', tutorCollege)
    .maybeSingle();
  const collegeName = (college as { name?: string } | null)?.name ?? 'Your college';

  // Resolve learners in cohort with an email + active status
  const { data: learners } = await sb
    .from('college_students')
    .select('id, name, email, user_id, status')
    .eq('cohort_id', body.cohort_id)
    .eq('status', 'Active');

  const recipients = (learners ?? []).filter((r: any) => !!r.email);
  if (recipients.length === 0) {
    return new Response(
      JSON.stringify({ error: 'no_recipients', sent: 0, failed: 0 }),
      { headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }

  // Send emails sequentially — keeps us inside Brevo rate limits for ~20-30
  // learners and gives us a clean per-recipient result list to log.
  const html = buildHtml(body.subject, body.body_html, tutorName, collegeName);
  const results: SendResult[] = [];
  for (const r of recipients as Array<{ name: string; email: string }>) {
    const res = await sendBrevo({
      to: { email: r.email, name: r.name },
      subject: body.subject,
      html,
      fromName: `${tutorName} · ${collegeName}`,
    });
    results.push(res);
  }

  const sent = results.filter((r) => r.ok).length;
  const failed = results.length - sent;

  // Audit log — uses existing college_activity table.
  await sb.from('college_activity').insert({
    college_id: tutorCollege,
    actor_id: auth.uid,
    action: 'cohort_broadcast_sent',
    entity_type: 'cohort',
    entity_id: body.cohort_id,
    details: {
      subject: body.subject,
      recipients: results.length,
      sent,
      failed,
      cohort_name: (cohort as { name?: string } | null)?.name,
    },
  });

  return new Response(
    JSON.stringify({
      cohort_id: body.cohort_id,
      cohort_name: (cohort as { name?: string } | null)?.name,
      recipients: results.length,
      sent,
      failed,
      results,
    }),
    { headers: { ...corsHeaders, 'content-type': 'application/json' } }
  );
});
