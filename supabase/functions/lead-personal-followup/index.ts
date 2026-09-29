// lead-personal-followup — one plain-text email from Andrew to SEO / lead-magnet leads.
//
// Someone leaves their email on a mock exam, the cheatsheet, the symbols chart,
// a calculator or the exit pop-up. newsletter-subscribe sends them what they
// asked for straight away. Two days later, if they still have no account, this
// sends ONE personal note: 7 days free, then 25% off the first 6 months.
//
// Deliberately unbranded, from founder@ — simple HTML with a text fallback, it should read like
// Andrew typed it. Replies land in his inbox.
//
// Who is eligible lives in SQL (`lead_followup_candidates`); this function only
// claims, sends and records. Claim-first: the row in `lead_followup_sends` is
// written BEFORE the send, so nobody can ever get it twice. No retry on failure.
//
// Cron: hourly, 25 per run.
// Dry run: POST { "dry_run": true }            → who would be sent, nothing sent
// Test:    POST { "test": true, "email": "you@x", "source": "mock_exam_result" }

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from '../_shared/mailer.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { buildUnsubscribeUrl, buildUnsubscribeHeaders } from '../_shared/unsubscribe-link.ts';
import { captureException } from '../_shared/sentry.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const FROM = 'Andrew Moore <founder@elec-mate.com>';
const REPLY_TO = 'founder@elec-mate.com';
const SUBJECT = 'Quick one from Andrew at Elec-Mate';
const PER_RUN = 25;

const UTM = 'utm_source=email&utm_medium=andrew_personal&utm_campaign=lead_followup_firstgo25';
const LINK_ELEC = `https://www.elec-mate.com/auth/signup?offer=FIRSTGO25&${UTM}`;
const LINK_APP = `https://www.elec-mate.com/auth/signup?offer=FIRSTGO25APP&${UTM}`;

function openingLine(source: string | null): string {
  switch (source) {
    case 'mock_exam_result':
      return "You had a go at one of our mock exams recently, so I thought I'd drop you a line.";
    case 'lead_magnet_cheatsheet':
      return "You grabbed our cheatsheet recently, so I thought I'd drop you a line.";
    case 'lead_magnet_symbols_chart':
      return "You downloaded our electrical symbols chart recently, so I thought I'd drop you a line.";
    default:
      return (source ?? '').startsWith('lead_magnet')
        ? "You downloaded one of our guides recently, so I thought I'd drop you a line."
        : "You left your email with us recently, so I thought I'd drop you a line.";
  }
}

// Prices: £6.99 / £19.99 a month (stripePrices.ts, verified in Stripe 29 Sep
// 2026) less 25% = £5.24 / £14.99. Weekly = monthly × 12 ÷ 52. If the list
// price changes, these lines must change with it.
interface Plan {
  heading: string;
  price: string;
  items: string[];
  cta: string;
  link: string;
}

const APPRENTICE: Plan = {
  heading: "If you're an apprentice",
  price: '£5.24 a month, about £1.21 a week',
  items: [
    '35+ mock exam papers and 20,000+ practice questions for Level 2, Level 3 and AM2',
    '45 courses, plus flashcards that keep bringing back the ones you get wrong',
    'Your OJT logbook and portfolio on your phone, ready for your assessor',
    'Ask Dave, an AI mentor you can ask anything, any time',
  ],
  cta: 'Start your free week as an apprentice',
  link: LINK_APP,
};

const ELECTRICIAN: Plan = {
  heading: "If you're qualified",
  price: '£14.99 a month, about £3.46 a week',
  items: [
    '24 certificate types, including EICR, EIC and Minor Works, done on your phone',
    'A board scanner that picks up the circuits from a photo',
    'Quotes, invoices and your customers all in one place',
    'Elec-AI: like ChatGPT, but for electricians. It knows BS 7671, the On-Site Guide, GN3, the fire alarm standard and all our courses',
    '75 calculators, plus AI help with RAMS, circuit design and costing',
  ],
  cta: 'Start your free week as an electrician',
  link: LINK_ELEC,
};

// Mock exam takers are mostly apprentices, so they see their plan first.
const plansFor = (source: string | null): Plan[] =>
  source === 'mock_exam_result' ? [APPRENTICE, ELECTRICIAN] : [ELECTRICIAN, APPRENTICE];

const INTRO =
  "Would you like to try the full app for 7 days, free? It costs £0 today, and if it's not for you, cancel in a couple of clicks before the week's up and you won't pay a penny. If you stay, I'll take 25% off your first 6 months.";
const WHY =
  "I built it as a working electrician, and it'll genuinely help you, whether that's getting through your exams or getting your paperwork done before you leave site.";
const AFTER =
  'After the 6 months it goes back to the normal price (£6.99 or £19.99 a month), and you can still cancel any time.';
const REPLY = "If anything's in the way, just reply. I read every one.";

function bodyText(source: string | null, unsubscribeUrl: string): string {
  const blocks = plansFor(source)
    .map(
      (p) =>
        `${p.heading.toUpperCase()}\n${p.price}\n${p.items.map((i) => `• ${i}`).join('\n')}\n${p.cta}: ${p.link}`
    )
    .join('\n\n');

  return `Hi there,

Andrew here, the electrician who built Elec-Mate. ${openingLine(source)}

${INTRO}

Here's what you're missing:

${blocks}

${WHY}

${AFTER}

${REPLY}

Cheers,
Andrew

--
Rather not hear from me? ${unsubscribeUrl}`;
}

// Deliberately looks like a normal email from a person: no logo, no colour
// blocks, no images. Just enough structure to read well on a phone.
const P = 'margin:0 0 16px;';
function bodyHtml(source: string | null, unsubscribeUrl: string): string {
  const plans = plansFor(source)
    .map(
      (p) => `
<p style="margin:24px 0 2px;font-weight:700;">${p.heading}</p>
<p style="margin:0 0 8px;">${p.price}</p>
<ul style="margin:0 0 12px;padding-left:20px;">
${p.items.map((i) => `<li style="margin:0 0 6px;">${i}</li>`).join('\n')}
</ul>
<p style="${P}"><a href="${p.link}" style="color:#1a0dab;font-weight:700;">${p.cta} &rarr;</a></p>`
    )
    .join('\n');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;">
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#222;max-width:560px;padding:8px 4px;">
<p style="${P}">Hi there,</p>
<p style="${P}">Andrew here, the electrician who built Elec-Mate. ${openingLine(source)}</p>
<p style="${P}">${INTRO}</p>
<p style="margin:0;">Here's what you're missing:</p>
${plans}
<p style="margin:24px 0 16px;">${WHY}</p>
<p style="${P}">${AFTER}</p>
<p style="${P}">${REPLY}</p>
<p style="margin:0 0 32px;">Cheers,<br>Andrew</p>
<p style="margin:0;font-size:12px;color:#888;">Rather not hear from me? <a href="${unsubscribeUrl}" style="color:#888;">Unsubscribe</a></p>
</div>
</body></html>`;
}

async function sendOne(
  resend: Resend,
  email: string,
  source: string | null
): Promise<{ ok: boolean; error?: string }> {
  try {
    const unsub = await buildUnsubscribeUrl(email);
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: SUBJECT,
      html: bodyHtml(source, unsub),
      text: bodyText(source, unsub),
      headers: buildUnsubscribeHeaders(unsub),
      tags: ['lead-personal-followup'],
    });
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  // Cron-only. The gateway accepts the public anon key as a valid JWT, so
  // without this anyone could fire test mode at any address.
  if (req.headers.get('Authorization') !== `Bearer ${SERVICE_KEY}`) {
    return json({ error: 'unauthorised' }, 401);
  }

  try {
    const body = await req.json().catch(() => ({}));
    const resend = new Resend();

    if (body?.test === true) {
      if (!body.email) return json({ error: 'test mode needs an "email"' }, 400);
      const r = await sendOne(resend, String(body.email), body.source ?? 'mock_exam_result');
      return json({ tested: true, to: body.email, ...r }, r.ok ? 200 : 500);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data: candidates, error } = await supabase.rpc('lead_followup_candidates', {
      p_limit: PER_RUN,
    });
    if (error) throw error;

    const rows = (candidates ?? []) as { email: string; source: string | null; first_at: string }[];
    if (body?.dry_run === true) return json({ dry_run: true, count: rows.length, rows });

    let sent = 0;
    let failed = 0;
    let skipped = 0;
    for (const row of rows) {
      // Claim first. A conflict means another run got there — skip.
      const { error: claimErr } = await supabase.from('lead_followup_sends').insert({
        email: row.email,
        source: row.source,
        first_captured_at: row.first_at,
      });
      if (claimErr) {
        skipped++;
        continue;
      }

      const r = await sendOne(resend, row.email, row.source);
      await supabase
        .from('lead_followup_sends')
        .update(
          r.ok
            ? { status: 'sent', sent_at: new Date().toISOString() }
            : { status: 'failed', error: (r.error ?? '').slice(0, 500) }
        )
        .eq('email', row.email);
      if (r.ok) sent++;
      else failed++;
    }

    return json({ eligible: rows.length, sent, failed, skipped });
  } catch (e) {
    captureException(e, { functionName: 'lead-personal-followup' });
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
