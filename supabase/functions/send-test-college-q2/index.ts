// One-shot test sender for the Q2 2026 College Hub outreach.
// Hits Brevo via the shared mailer shim. Delete after the campaign goes live.
//
// GET /functions/v1/send-test-college-q2?to=founder@elec-mate.com&first=Andrew

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { Resend } from '../_shared/mailer.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const SUBJECT = "What's now in Elec-Mate's College Hub";

// Mirrors send-outreach-campaign HMAC token format so the same
// outreach-unsubscribe edge fn can verify it.
const textEncoder = new TextEncoder();
function base64UrlEncode(bytes: Uint8Array): string {
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function buildUnsubLink(email: string, campaignId: string): Promise<string> {
  const secret =
    Deno.env.get('OUTREACH_UNSUB_SECRET') ||
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ||
    '';
  const lower = email.trim().toLowerCase();
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, textEncoder.encode(lower));
  const payload = base64UrlEncode(textEncoder.encode(lower));
  const signature = base64UrlEncode(new Uint8Array(sig));
  const token = `${payload}.${signature}`;
  const baseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  return `${baseUrl}/functions/v1/outreach-unsubscribe?token=${encodeURIComponent(token)}&campaign=${encodeURIComponent(campaignId)}`;
}

function buildHtml(firstName: string, unsubUrl: string): string {
  const fn = firstName || 'there';
  const safeUnsub = unsubUrl
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>Elec-Mate</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#000;color:#f4f4f5;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;color:transparent;height:0;width:0;opacity:0">A quick update on what's now live in the College Hub — built with UK tutors, IQAs and heads of department.</div>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#000"><tr><td align="center">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;background:#000">
<tr><td style="height:40px;line-height:40px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 32px">
<img src="https://www.elec-mate.com/images/elec-mate-logo-512.png" alt="Elec-Mate" width="84" height="84" style="display:block;border-radius:18px">
</td></tr>
<tr><td style="height:24px;line-height:24px;font-size:0">&nbsp;</td></tr>

<!-- HOOK -->
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:800;color:#ffffff;line-height:1.15;letter-spacing:-0.6px">What&apos;s now in Elec-Mate&apos;s<br><span style="color:#fbbf24">College Hub</span></h1>
</td></tr>
<tr><td style="height:18px;line-height:18px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px">
<p style="margin:0;font-size:16px;color:#f4f4f5;line-height:1.6">Hi ${fn} &mdash; quick update on Elec-Mate. We&apos;ve built out the college side properly, alongside the apprentice app you may have already seen. This is a snapshot of where it is now.</p>
</td></tr>

<tr><td style="height:30px;line-height:30px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:30px;line-height:30px;font-size:0">&nbsp;</td></tr>

<!-- OTJ CHAIN DEMO -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.6px;font-weight:800">A 4-minute OTJ chain</p>
<p style="margin:0 0 18px;font-size:22px;color:#ffffff;font-weight:800;line-height:1.25;letter-spacing:-0.4px">Apprentice photographs the work &rarr; tutor sees it signed off four minutes later</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px"><tr><td style="padding:18px 22px">
<p style="margin:0 0 6px;font-size:13px;color:#fbbf24;font-weight:700;letter-spacing:0.4px">4:00pm &middot; on site</p>
<p style="margin:0 0 14px;font-size:14px;color:#f4f4f5;line-height:1.55">Apprentice finishes a final-circuit termination. Photo + 2-line description in the Site Diary.</p>
<p style="margin:0 0 6px;font-size:13px;color:#fbbf24;font-weight:700;letter-spacing:0.4px">4:01pm &middot; on the phone</p>
<p style="margin:0 0 14px;font-size:14px;color:#f4f4f5;line-height:1.55">Smart features read the photo + text, suggest matching LOs &amp; ACs across all 9 electrical quals with confidence scores. They review and confirm.</p>
<p style="margin:0 0 6px;font-size:13px;color:#fbbf24;font-weight:700;letter-spacing:0.4px">4:02pm &middot; supervisor</p>
<p style="margin:0 0 14px;font-size:14px;color:#f4f4f5;line-height:1.55">One tap shares to their qualified supervisor via a magic link. They sign the AC met from a job site, no login.</p>
<p style="margin:0 0 6px;font-size:13px;color:#fbbf24;font-weight:700;letter-spacing:0.4px">4:03pm &middot; college side</p>
<p style="margin:0 0 14px;font-size:14px;color:#f4f4f5;line-height:1.55">Tutor sees a fresh portfolio entry in the Unified Inbox with the matched ACs and supervisor sign-off attached.</p>
<p style="margin:0 0 6px;font-size:13px;color:#fbbf24;font-weight:700;letter-spacing:0.4px">4:04pm &middot; IQA</p>
<p style="margin:0;font-size:14px;color:#f4f4f5;line-height:1.55">Sample plan auto-flags the entry for IQA review. AC Coverage Matrix updates. Done &mdash; no chasing, no spreadsheets.</p>
</td></tr></table>
</td></tr>

<tr><td style="height:30px;line-height:30px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:30px;line-height:30px;font-size:0">&nbsp;</td></tr>

<!-- COLLEGE HUB - 4 BUCKETS -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.6px;font-weight:800">For your team</p>
<p style="margin:0 0 22px;font-size:22px;color:#ffffff;font-weight:800;line-height:1.2;letter-spacing:-0.4px">The College Hub &mdash; in four parts</p>

<!-- TEACH -->
<p style="margin:0 0 8px;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">1. Teach</p>
<p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#ffffff;line-height:1.3">Lesson plans, slide decks &amp; resources drafted by the system</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.6">Schemes of Work, Lesson Plans with cohort-aware inclusion drafting, full slide-deck generator (with PPTX export, regen, themes, AC chips), Live Lesson presenter mode, materials library with auto AC tagging, Tutor Today daily brief.</p>

<!-- ASSESS -->
<p style="margin:0 0 8px;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">2. Assess</p>
<p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#ffffff;line-height:1.3">AC Coverage Matrix with bulk sign-off + Marking Copilot</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.6">Per-student AC matrix, smart-judged first pass on free-response answers (tutor overrides), CreateQuiz with KSB-aware authoring, multi-question kinds (MCQ, free-text, image, audio), cohort + per-quiz CSV export, Document upload &rarr; AI parse to draft a quiz from the page.</p>

<!-- RUN -->
<p style="margin:0 0 8px;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">3. Run</p>
<p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#ffffff;line-height:1.3">Student 360, IQA fan-out &amp; the work queue that runs itself</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.6">Student 360 with risk engine + AI 1-2-1 agenda + EPA readiness verdicts, IQA sampling plans with verdict UI, AI-tailored ILPs with goal sheet, Tutor cohort dashboards, Unified Inbox (portfolio comments + OTJ + IQA + messages), notifications bell, attendance heatmap.</p>

<!-- STAY COMPLIANT -->
<p style="margin:0 0 8px;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">4. Stay compliant</p>
<p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#ffffff;line-height:1.3">Compliance Pulse + AI policy authoring + audit pack</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.6">Staff vault (DBS, qualifications, CPD), policies + IP-stamped acknowledgements, daily status-normalize cron, alert engine for expiring records, audit-pack export. AI policy authoring with templates library so a new policy is a 10-minute job, not a week.</p>
</td></tr>

<tr><td style="height:30px;line-height:30px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:30px;line-height:30px;font-size:0">&nbsp;</td></tr>

<!-- APPRENTICE HUB -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.6px;font-weight:800">What the apprentice sees on their phone</p>
<p style="margin:0 0 22px;font-size:22px;color:#ffffff;font-weight:800;line-height:1.2;letter-spacing:-0.4px">The Apprentice Hub</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">Portfolio with smart LO/AC mapping</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> the retrospective KSB scramble at end of year is over &mdash; coverage builds itself.</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">Site Diary + weekly AI coach</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> tutors get a real picture of what the apprentice did each week, not just a tickbox.</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">EPA Simulator that reads their portfolio</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> rehearsal against their actual evidence, not generic question banks &mdash; pass &amp; distinction descriptors per question.</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">AM2 Simulator + Inspection &amp; Testing Hub</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> safe-isolation, fault-finding and testing dry runs &mdash; college time on the AM2 rig actually counts.</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">Study Centre &mdash; 46 courses, mock exams, flash cards</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> consistent off-job content for the cohort, scaffolded around the EAL / City &amp; Guilds units.</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">Daily quiz on assigned KSBs</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> a 60-second loop that pulls from what their tutor actually set this week.</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">My College Plan card &mdash; tutor goals, ILP, replies</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> the apprentice sees what their tutor has set, can reply to goals, and acknowledges they&apos;ve seen them &mdash; closes the loop.</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">Supervisor / employer magic-link sign-off</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> employer sign-off on portfolio in seconds &mdash; no login, no chasing, no PDF email round-trip.</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">Mental Health Hub with quiet pattern flags</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> tutors get a gentle nudge if mood data is drifting &mdash; pastoral support catches them earlier.</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">Pre-EPA brief generated for them</p>
<p style="margin:0 0 18px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> a personalised pre-EPA pack from their portfolio &mdash; calibrated against the tutor&apos;s readiness verdict.</p>

<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff">Activity feed: what their tutor did this week</p>
<p style="margin:0 0 4px;font-size:14px;color:#d4d4d8;line-height:1.55"><span style="color:#fbbf24;font-weight:700">Why it matters:</span> apprentices see comments, sign-offs, ILP edits and messages in one feed &mdash; visibility goes both ways.</p>
</td></tr>

<tr><td style="height:30px;line-height:30px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:30px;line-height:30px;font-size:0">&nbsp;</td></tr>

<!-- TWO-SIDED CLOSE -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.3);border-radius:16px"><tr><td style="padding:24px 26px">
<p style="margin:0 0 10px;font-size:13px;color:#fbbf24;font-weight:800;text-transform:uppercase;letter-spacing:1.4px">Two-sided is the point</p>
<p style="margin:0;font-size:16px;color:#ffffff;line-height:1.55">The apprentice uses Elec-Mate every day on site. The tutor sees every photo, every sign-off, every quiz score, every ILP reply, every wellbeing flag, in one place. No more &quot;send me what you did&quot;. No more retrospective portfolio panic. Same data, two views, real time.</p>
</td></tr></table>
</td></tr>

<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<!-- CTA: FORM -->
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 18px;font-size:16px;color:#f4f4f5;line-height:1.6">If any of this is useful for your college, fill in the form and we&apos;ll come back to you.</p>
<a href="https://www.elec-mate.com/for-colleges.html?utm_source=brevo&amp;utm_medium=email&amp;utm_campaign=edu_q2_2026" style="display:inline-block;padding:16px 42px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:14px;font-size:16px;font-weight:700;color:#000;text-decoration:none;letter-spacing:-0.2px;box-shadow:0 4px 20px rgba(251,191,36,0.25)">Fill in the form &rarr;</a>
</td></tr>
<tr><td style="height:18px;line-height:18px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 32px">
<p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.6">Any questions, email me directly: <a href="mailto:founder@elec-mate.com" style="color:#fbbf24;text-decoration:none">founder@elec-mate.com</a></p>
</td></tr>

<tr><td style="height:40px;line-height:40px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<img src="https://www.elec-mate.com/images/andrew-moore.jpeg" alt="Andrew Moore, Founder" width="80" height="80" style="display:block;margin:0 auto;border-radius:50%;border:3px solid #fbbf24">
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px">
<p style="margin:0;font-size:15px;color:#f4f4f5;line-height:1.7;text-align:center">Cheers,<br><span style="color:#fbbf24;font-weight:700">Andrew</span><br>Founder, Elec-Mate</p>
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 32px 44px">
<p style="margin:0 0 10px;font-size:12px;color:#71717a;line-height:1.6">&copy; 2026 Elec-Mate Ltd &middot; United Kingdom</p>
<p style="margin:0;font-size:12px;color:#a1a1aa;line-height:1.5"><a href="${safeUnsub}" style="color:#a1a1aa;text-decoration:underline">Unsubscribe</a> &middot; or reply <strong style="color:#a1a1aa">STOP</strong> &middot; <a href="mailto:founder@elec-mate.com" style="color:#a1a1aa;text-decoration:underline">founder@elec-mate.com</a></p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const url = new URL(req.url);
  const to = (url.searchParams.get('to') || 'founder@elec-mate.com').trim().toLowerCase();
  const first = (url.searchParams.get('first') || 'Andrew').trim();

  const resend = new Resend(Deno.env.get('BREVO_API_KEY'));
  const unsubUrl = await buildUnsubLink(to, 'edu_q2_2026_test');
  const html = buildHtml(first, unsubUrl);

  const { data, error } = await resend.emails.send({
    from: 'Andrew from Elec-Mate <founder@elec-mate.com>',
    to: [to],
    replyTo: 'founder@elec-mate.com',
    subject: `[TEST] ${SUBJECT}`,
    html,
    headers: { 'List-Unsubscribe': '<mailto:founder@elec-mate.com?subject=unsubscribe>' },
    tags: [{ name: 'campaign', value: 'edu_q2_2026_test' }],
  });

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true, to, id: data?.id }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
