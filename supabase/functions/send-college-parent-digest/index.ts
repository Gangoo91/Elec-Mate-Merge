// send-college-parent-digest — weekly parent/guardian digest email.
// ELE-932 (J3). Iterates opted-in parent contacts for college students,
// builds a short digest (attendance, recent activity, concerns) and sends
// via Brevo. Idempotent per (parent_contact_id, iso_week).
//
// Modes:
//   POST { mode: 'cron' }                       → all-eligible (called from pg_cron)
//   POST { mode: 'single', parent_contact_id }  → one parent (testing / on-demand)
//   POST { mode: 'preview', parent_contact_id } → returns the rendered digest without sending

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface DigestPayload {
  student_name: string;
  college_name: string;
  iso_week: string;
  greeting: string;
  attendance_pct: number | null;
  attendance_status_line: string;
  highlights: string[];
  concerns: string[];
  upcoming: string[];
  view_url: string;
  unsubscribe_url: string;
}

function isoWeekKey(d: Date = new Date()): string {
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((target.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

function randomToken(): string {
  const arr = new Uint8Array(24);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}

function renderHtml(p: DigestPayload): string {
  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0F172A">
<h1 style="font-size:20px;margin:0 0 4px">${escape(p.student_name)} — weekly update</h1>
<p style="margin:0 0 16px;color:#475569;font-size:14px">${escape(p.college_name)} · ${p.iso_week}</p>
<p>${escape(p.greeting)}</p>
${p.attendance_pct !== null ? `<p><strong>Attendance:</strong> ${p.attendance_pct}% — ${escape(p.attendance_status_line)}</p>` : ''}
${p.highlights.length ? `<h3 style="font-size:14px;margin:16px 0 4px">Highlights</h3><ul>${p.highlights.map((h) => `<li>${escape(h)}</li>`).join('')}</ul>` : ''}
${p.concerns.length ? `<h3 style="font-size:14px;margin:16px 0 4px">Things to follow up</h3><ul>${p.concerns.map((h) => `<li>${escape(h)}</li>`).join('')}</ul>` : ''}
${p.upcoming.length ? `<h3 style="font-size:14px;margin:16px 0 4px">What's coming up</h3><ul>${p.upcoming.map((h) => `<li>${escape(h)}</li>`).join('')}</ul>` : ''}
<p style="margin-top:24px"><a href="${p.view_url}" style="background:#FACC15;color:#000;text-decoration:none;padding:10px 18px;border-radius:8px;display:inline-block">View full update</a></p>
<p style="margin-top:32px;color:#94A3B8;font-size:12px">Sent by your apprentice's college via Elec-Mate. <a href="${p.unsubscribe_url}" style="color:#64748B">Stop receiving these</a>.</p>
</body></html>`;
}

function escape(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendBrevo(opts: {
  to: { email: string; name: string };
  subject: string;
  html: string;
}): Promise<{ messageId?: string; ok: boolean; error?: string }> {
  const key = Deno.env.get('BREVO_API_KEY');
  if (!key) return { ok: false, error: 'no_brevo_key' };
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({
      sender: { name: 'Elec-Mate · College', email: 'no-reply@elec-mate.com' },
      to: [opts.to],
      subject: opts.subject,
      htmlContent: opts.html,
    }),
  });
  if (!res.ok) {
    return { ok: false, error: `${res.status} ${await res.text()}` };
  }
  const json = await res.json();
  return { ok: true, messageId: json.messageId };
}

interface ParentContext {
  contactId: string;
  parentName: string;
  parentEmail: string;
  studentId: string;
  studentName: string;
  collegeId: string;
  collegeName: string;
}

async function buildDigest(
  sb: ReturnType<typeof createClient>,
  ctx: ParentContext,
  appOrigin: string
): Promise<DigestPayload> {
  const sinceIso = new Date(Date.now() - 7 * 86_400_000).toISOString().slice(0, 10);

  const [attendanceRes, otjRes, gradesRes, lessonsRes] = await Promise.all([
    sb
      .from('college_attendance')
      .select('status')
      .eq('student_id', ctx.studentId)
      .gte('date', sinceIso),
    sb
      .from('college_otj_entries')
      .select('id, duration_minutes, title, verification_status, created_at')
      .eq('student_id', ctx.studentId)
      .gte('created_at', sinceIso + 'T00:00:00Z'),
    sb
      .from('college_grades')
      .select('grade, unit_name, assessed_at')
      .eq('student_id', ctx.studentId)
      .gte('assessed_at', sinceIso + 'T00:00:00Z'),
    sb
      .from('college_lesson_plans')
      .select('title, scheduled_date')
      .gte('scheduled_date', new Date().toISOString().slice(0, 10))
      .lte(
        'scheduled_date',
        new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10)
      ),
  ]);

  const attendance = (attendanceRes.data ?? []) as Array<{ status: string }>;
  const otj = (otjRes.data ?? []) as Array<{ duration_minutes: number; title: string; verification_status?: string }>;
  const grades = (gradesRes.data ?? []) as Array<{ grade: string; unit_name: string }>;
  const lessons = (lessonsRes.data ?? []) as Array<{ title: string; scheduled_date: string }>;

  const present = attendance.filter((a) => a.status === 'Present' || a.status === 'Authorised').length;
  const attendancePct = attendance.length
    ? Math.round((present / attendance.length) * 100)
    : null;
  const attendanceStatusLine =
    attendancePct === null
      ? 'no register entries yet this week'
      : attendancePct >= 95
        ? 'excellent — keep it up'
        : attendancePct >= 85
          ? 'on track'
          : attendancePct >= 70
            ? 'below college expectations — please remind them'
            : 'significant absence this week — please speak to their tutor';

  const highlights: string[] = [];
  if (otj.length > 0) {
    const hrs =
      Math.round((otj.reduce((a, e) => a + (e.duration_minutes ?? 0), 0) / 60) * 10) / 10;
    highlights.push(`Logged ${hrs}h of off-the-job training (${otj.length} entries).`);
  }
  for (const g of grades.slice(0, 3)) {
    highlights.push(`Assessed: ${g.unit_name} — ${g.grade}`);
  }

  const concerns: string[] = [];
  if (attendancePct !== null && attendancePct < 85) {
    concerns.push(`Attendance is ${attendancePct}% this week.`);
  }

  const upcoming = lessons.slice(0, 3).map(
    (l) => `${new Date(l.scheduled_date).toLocaleDateString('en-GB')}: ${l.title}`
  );

  // Magic-link token
  const token = randomToken();
  const validUntil = new Date(Date.now() + 30 * 86_400_000).toISOString();
  await sb.from('college_parent_tokens').insert({
    parent_contact_id: ctx.contactId,
    token,
    purpose: 'digest_view',
    expires_at: validUntil,
  });
  const unsubToken = randomToken();
  await sb.from('college_parent_tokens').insert({
    parent_contact_id: ctx.contactId,
    token: unsubToken,
    purpose: 'opt_out',
    expires_at: validUntil,
  });

  const viewUrl = `${appOrigin}/p/${token}`;
  const unsubUrl = `${appOrigin}/p/unsubscribe/${unsubToken}`;

  return {
    student_name: ctx.studentName,
    college_name: ctx.collegeName,
    iso_week: isoWeekKey(),
    greeting: `Hi ${ctx.parentName.split(' ')[0] || 'there'}, here's a quick weekly update on ${ctx.studentName}'s apprenticeship.`,
    attendance_pct: attendancePct,
    attendance_status_line: attendanceStatusLine,
    highlights,
    concerns,
    upcoming,
    view_url: viewUrl,
    unsubscribe_url: unsubUrl,
  };
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
  const APP_ORIGIN = Deno.env.get('APP_ORIGIN') || 'https://app.elec-mate.com';
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: { mode?: 'cron' | 'single' | 'preview'; parent_contact_id?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    body = { mode: 'cron' };
  }
  const mode = body.mode ?? 'cron';

  // Build query for the parent contacts to process
  let parentQ = sb
    .from('college_parent_contacts')
    .select('id, name, email, student_id, college_id, digest_frequency')
    .is('opted_out_at', null)
    .not('opted_in_at', 'is', null);
  if (mode !== 'cron' && body.parent_contact_id) {
    parentQ = parentQ.eq('id', body.parent_contact_id);
  } else {
    parentQ = parentQ.in('digest_frequency', ['weekly']);
  }

  const { data: parents, error: pErr } = await parentQ;
  if (pErr) {
    return new Response(JSON.stringify({ error: pErr.message }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const week = isoWeekKey();
  const results: Array<{ contact_id: string; status: string }> = [];

  for (const parent of (parents ?? []) as Array<any>) {
    // Idempotency
    if (mode === 'cron') {
      const { data: exists } = await sb
        .from('college_parent_digest_log')
        .select('id')
        .eq('parent_contact_id', parent.id)
        .eq('iso_week', week)
        .maybeSingle();
      if (exists) {
        results.push({ contact_id: parent.id, status: 'already_sent' });
        continue;
      }
    }

    const { data: student } = await sb
      .from('college_students')
      .select('id, name, college_id')
      .eq('id', parent.student_id)
      .maybeSingle();
    if (!student) {
      results.push({ contact_id: parent.id, status: 'student_missing' });
      continue;
    }
    const { data: college } = await sb
      .from('colleges')
      .select('id, name')
      .eq('id', student.college_id)
      .maybeSingle();

    const ctx: ParentContext = {
      contactId: parent.id,
      parentName: parent.name,
      parentEmail: parent.email,
      studentId: student.id,
      studentName: student.name,
      collegeId: student.college_id,
      collegeName: college?.name ?? 'Your apprentice',
    };

    const payload = await buildDigest(sb, ctx, APP_ORIGIN);

    if (mode === 'preview') {
      results.push({ contact_id: parent.id, status: 'previewed' });
      // For preview mode, also surface the payload in the response
      return new Response(JSON.stringify({ payload, html: renderHtml(payload) }), {
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const send = await sendBrevo({
      to: { email: ctx.parentEmail, name: ctx.parentName },
      subject: `${ctx.studentName} — weekly update`,
      html: renderHtml(payload),
    });

    await sb.from('college_parent_digest_log').insert({
      parent_contact_id: parent.id,
      student_id: parent.student_id,
      iso_week: week,
      payload,
      brevo_message_id: send.messageId ?? null,
      status: send.ok ? 'sent' : 'failed',
    });
    if (send.ok) {
      await sb
        .from('college_parent_contacts')
        .update({ digest_last_sent_at: new Date().toISOString() })
        .eq('id', parent.id);
    }
    results.push({ contact_id: parent.id, status: send.ok ? 'sent' : 'failed' });
  }

  return new Response(JSON.stringify({ results }), {
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });
});
