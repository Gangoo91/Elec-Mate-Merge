// trial-sequence — the first week, day by day, shaped by what each person
// came for and what they have actually done.
//
// Why (retention plan, 20 Sep 2026): the activation metric is three active
// days in the first seven. Electricians who manage that are retained at 50%;
// those who open the app on one day or fewer, 22%. Nearly half of carded
// electricians are in the second group, and the trial used to send nothing
// on days 2–4. Each day below is a reason to come back, chosen from what
// they have NOT done yet, and worded around what they HAVE done.
//
// Two tracks, sent at two different times of day:
//   electricians  07:15 UTC — read in the van before the first job
//   apprentices   17:30 UTC — after college / after work, when they study
//
// Electricians (day = whole days since signup)
//   1  the thing they said they came for (certificate / quotes / diary)
//   2  scanned a board but no cert → finish that cert; else → scan a board
//   3  quoted but not invoiced → invoice that quote; else → quote the next job
//   4  made something → your customers' reminders + diary; else → an invoice
//   5–6  receipt_48h from send-trial-reminders (their numbers + extension)
// Apprentices
//   1  one section of THEIR course + ask the AI
//   2  sat no mock → sit one for their level; sat one → study the weak topics
//   3  never asked the AI → ask it; else → flashcards for the streak
//   4  fewer than 3 active days → keep the streak; else → mock again
// Both, day ≥ 5, web only: renewal switched off → "you've still got N days"
//
// Cohort from public.get_trial_sequence_cohort(). Every send is recorded in
// trial_emails_sent (email_type = touch key) so nothing repeats. A push goes
// with each email through send-push-notification.
//
// Safety: POST without `{ "send": true }` is a DRY RUN. `{ "role": "..." }`
// limits to one track. `{ "test": true, "email", "name", "day" }` previews.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend, htmlToPlainText } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const FROM = 'Andrew at Elec-Mate <founder@elec-mate.com>';
const SITE = 'https://www.elec-mate.com';
const MOBILE = '07507 241303';

type Role = 'electrician' | 'apprentice';

interface Person {
  id: string;
  role: Role;
  full_name: string | null;
  email: string;
  created_at: string;
  trial_end: string;
  source: string | null;
  stripe_customer_id: string | null;
  day_index: number;
  course: string | null;
  level: string | null;
  year: number | null;
  intent: string | null;
  last_feature: string | null;
  certs: number;
  certs_pdf: number;
  quotes: number;
  invoices: number;
  calendar: number;
  scans: number;
  ai_chats: number;
  study: number;
  mocks: number;
  active_days: number;
  sent: string[];
}

interface Touch {
  key: string;
  subject: string;
  html: string;
  push: { title: string; body: string; url: string };
}

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Plain, short, from Andrew. The plain style gets about three times the clicks of the designed one. */
function shell(paragraphs: string[], cta: { url: string; label: string }): string {
  const ps = paragraphs.map((p) => `<p style="margin:0 0 14px;">${p}</p>`).join('\n');
  return `
    <div style="font-family: -apple-system, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 8px 4px; color:#1a1a1a; font-size:15px; line-height:1.65;">
      ${ps}
      <p style="margin:0 0 14px;"><a href="${cta.url}" style="color:#1a1a1a;">${cta.url}</a></p>
      <p style="margin:0 0 22px;"><a href="${cta.url}" style="display:inline-block;padding:14px 26px;background:#F3B70A;color:#0C1B2A;text-decoration:none;font-weight:700;border-radius:10px;">${esc(cta.label)}</a></p>
      <p style="margin:0 0 14px;">Anything awkward, reply to this or WhatsApp me on ${MOBILE}. I read every one.</p>
      <p style="margin:0;">Andrew</p>
    </div>`;
}

const link = (path: string, key: string) =>
  `${SITE}${path}?utm_source=email&utm_medium=lifecycle&utm_campaign=trial_${key}`;

const make = (
  key: string,
  subject: string,
  paragraphs: string[],
  path: string,
  label: string,
  push: { title: string; body: string }
): Touch => ({
  key,
  subject,
  html: shell(paragraphs, { url: link(path, key), label }),
  push: { ...push, url: path },
});

/** "your Level 3 course" / "your AM2 prep" / "your course" — from what the profile knows. */
function courseName(p: Person): string {
  const raw = `${p.course ?? ''} ${p.level ?? ''}`.toLowerCase();
  if (raw.includes('am2')) return 'your AM2 prep';
  if (raw.includes('18th')) return 'your 18th Edition course';
  if (raw.includes('level 3') || raw.includes('l3') || p.level === '3')
    return 'your Level 3 course';
  if (raw.includes('level 2') || raw.includes('l2') || p.level === '2')
    return 'your Level 2 course';
  if (raw.includes('hnc')) return 'your HNC';
  if (raw.includes('2391')) return 'your 2391';
  return 'your course';
}

function mockName(p: Person): string {
  const c = courseName(p);
  return c === 'your course' ? 'a mock exam for your level' : `a ${c.replace('your ', '')} mock`;
}

// ── Electricians ─────────────────────────────────────────────────────────
function electricianTouch(p: Person, n: string): Touch | null {
  const sent = new Set(p.sent);
  const d = p.day_index;
  const made = p.certs + p.quotes + p.invoices > 0;

  if (d === 1 && !sent.has('day1_electrician') && !sent.has('welcome_24h') && !made) {
    const intent = (p.intent ?? '').toLowerCase();
    if (intent.startsWith('quote')) {
      return make(
        'day1_electrician',
        `${n}, quote one job today`,
        [
          `Hi ${esc(n)},`,
          `It's Andrew, I built Elec-Mate. You said you came for quotes, so let's do one. Whatever's next in your diary: customer, a few lines, your price, and it goes out as a branded PDF they can accept on their phone.`,
          `Sixty seconds, and when they say yes the job's already in your diary and the invoice is half written.`,
        ],
        '/electrician/quote-builder/create',
        'Quote a job',
        {
          title: 'Quote one job today',
          body: 'Sixty seconds. Branded PDF they can accept on their phone.',
        }
      );
    }
    if (intent.includes('job') || intent.includes('diary') || intent.includes('calendar')) {
      return make(
        'day1_electrician',
        `${n}, put this week in the diary`,
        [
          `Hi ${esc(n)},`,
          `It's Andrew, I built Elec-Mate. You said you came to get the jobs organised, so start there: put this week's jobs in the diary and connect your Google Calendar under Business. From then on, everything lands in your own calendar.`,
          `Each job carries its own site visit, photos, cert and invoice, so the paperwork follows the job instead of you chasing it.`,
        ],
        '/electrician/business/calendar',
        'Open the diary',
        {
          title: 'Put this week in the diary',
          body: 'Connect Google Calendar and every job lands in your own calendar.',
        }
      );
    }
    return make(
      'day1_electrician',
      `${n}, your first cert in ninety seconds`,
      [
        `Hi ${esc(n)},`,
        `It's Andrew, I'm the electrician who built Elec-Mate, and I ring or write to everyone who starts a trial. Don't try to see all of it today. Do one thing: make one certificate and send the PDF to yourself.`,
        `Ninety seconds. Your logo goes on it if you've added one under Business. Once you've seen your own name on a PDF, the rest of the app makes sense.`,
      ],
      '/electrician/inspection-testing',
      'Make a certificate',
      {
        title: 'Your first cert in ninety seconds',
        body: 'Make one certificate and send the PDF to yourself. The rest makes sense after that.',
      }
    );
  }

  if (d === 2 && !sent.has('day2_scanner') && !sent.has('day2_finish_cert')) {
    if (p.scans > 0 && p.certs_pdf === 0) {
      return make(
        'day2_finish_cert',
        `${n}, that board you scanned`,
        [
          `Hi ${esc(n)},`,
          `Day two. I can see you scanned a board yesterday and the schedule filled in. The cert it belongs to is sitting there half done. Finish it and send the PDF to yourself, so you've seen the whole thing end to end.`,
          `That's the loop: scan, cert, PDF to the customer before you've left the drive.`,
        ],
        '/electrician/inspection-testing',
        'Finish that cert',
        {
          title: 'That board you scanned',
          body: 'The cert is half done. Finish it and send the PDF to yourself.',
        }
      );
    }
    if (p.scans === 0) {
      return make(
        'day2_scanner',
        `${n}, point your phone at a board`,
        [
          `Hi ${esc(n)},`,
          `Day two. Today's the one people don't believe until they've done it: photograph a consumer unit and the schedule of tests fills itself in. Circuits, breakers, cable sizes, the lot.`,
          `Do it on the next board you're stood in front of, or on a photo you've already got on your phone. It takes about a minute.`,
        ],
        '/tools/board-scanner',
        'Scan a board',
        {
          title: 'Point your phone at a board',
          body: 'Photograph a consumer unit and the schedule of tests fills itself in.',
        }
      );
    }
  }

  // Day 2 for the person who has already scanned AND finished a cert: the
  // most engaged trialist must not be the one who hears nothing. Bring the
  // quote forward.
  if (d === 2 && p.scans > 0 && p.certs_pdf > 0 && p.quotes === 0 && !sent.has('day3_quote')) {
    return make(
      'day3_quote',
      `${n}, a quote in sixty seconds`,
      [
        `Hi ${esc(n)},`,
        `You've scanned a board and sent a cert already, which puts you ahead of most people in their first week. Next: quote whatever's next in your diary. Customer, a few lines, your price, and it goes out as a branded PDF with a link they can accept on their phone.`,
        `When they accept, the job's already in your diary and the invoice is half written.`,
      ],
      '/electrician/quote-builder/create',
      'Quote the next job',
      {
        title: 'A quote in sixty seconds',
        body: 'Quote the next job and send it as a branded PDF they can accept on their phone.',
      }
    );
  }

  if (d === 3 && !sent.has('day3_quote') && !sent.has('day3_invoice_that')) {
    if (p.quotes > 0 && p.invoices === 0) {
      return make(
        'day3_invoice_that',
        `${n}, invoice that quote`,
        [
          `Hi ${esc(n)},`,
          `Day three. You've got a quote in the app. When the job's done, the invoice is one tap from it: same customer, same lines, pay-by-card link on the bottom, and it chases itself if it goes unpaid.`,
          `Do it for that job, or for one you finished this week. Getting paid from the van is the bit that pays for the app.`,
        ],
        '/electrician/invoices',
        'Raise the invoice',
        {
          title: 'Invoice that quote',
          body: 'One tap from the quote. Pay-by-card link, chases itself if unpaid.',
        }
      );
    }
    if (p.quotes === 0) {
      return make(
        'day3_quote',
        `${n}, a quote in sixty seconds`,
        [
          `Hi ${esc(n)},`,
          `Day three. Whatever's next in your diary, quote it here. Customer, a few lines, your price, and it goes out as a branded PDF with a link they can accept on their phone.`,
          `When they accept, the job's already in your diary and the invoice is half written. That's the bit that saves the evenings.`,
        ],
        '/electrician/quote-builder/create',
        'Quote the next job',
        {
          title: 'A quote in sixty seconds',
          body: 'Quote the next job and send it as a branded PDF they can accept on their phone.',
        }
      );
    }
  }

  // Day 3 for the person who has quoted AND invoiced: bring day 4 forward.
  if (d === 3 && p.quotes > 0 && p.invoices > 0 && !sent.has('day4_reminders')) {
    return make(
      'day4_reminders',
      `${n}, the repeat work comes back on its own`,
      [
        `Hi ${esc(n)},`,
        `Quote, job, invoice, all in three days. Here's the bit that pays off for years: every cert you issue carries its next-inspection date, and the app reminds your customer, from you, when it's due.`,
        `Connect your Google Calendar under Business and put the next job in. From then on your diary, your certs and your invoices live in one place.`,
      ],
      '/electrician/business/calendar',
      'Open the diary',
      {
        title: 'The repeat work comes back on its own',
        body: 'Every cert carries its next-inspection date. Your customers get reminded, from you.',
      }
    );
  }

  if (d === 4 && !sent.has('day4_invoice') && !sent.has('day4_reminders')) {
    if (made) {
      return make(
        'day4_reminders',
        `${n}, the repeat work comes back on its own`,
        [
          `Hi ${esc(n)},`,
          `Day four. You've made something real in here now, so this is the bit that pays off for years: every cert you issue carries its next-inspection date, and the app reminds your customer, from you, when it's due. EICRs, landlord certs, fire alarm logs.`,
          `Connect your Google Calendar under Business and put the next job in. From then on your diary, your certs and your invoices live in one place.`,
        ],
        '/electrician/business/calendar',
        'Open the diary',
        {
          title: 'The repeat work comes back on its own',
          body: 'Every cert carries its next-inspection date. Your customers get reminded, from you.',
        }
      );
    }
    return make(
      'day4_invoice',
      `${n}, get paid from the van`,
      [
        `Hi ${esc(n)},`,
        `Day four. Raise an invoice for a job you've just done. It goes with a pay-by-card link, and if it's not paid on time the app chases it for you, politely, so you don't have to.`,
        `While you're in there, connect your Google Calendar under Business, and your jobs and site visits land in your own diary from now on.`,
      ],
      '/electrician/invoices',
      'Raise an invoice',
      {
        title: 'Get paid from the van',
        body: 'Raise an invoice with a pay-by-card link. It chases itself if it goes unpaid.',
      }
    );
  }
  return null;
}

// ── Apprentices ──────────────────────────────────────────────────────────
function apprenticeTouch(p: Person, n: string): Touch | null {
  const sent = new Set(p.sent);
  const d = p.day_index;
  const course = courseName(p);

  if (d === 1 && !sent.has('day1_apprentice') && p.study === 0) {
    return make(
      'day1_apprentice',
      `${n}, ten minutes today`,
      [
        `Hi ${esc(n)},`,
        `It's Andrew, I built Elec-Mate. You signed up yesterday. Don't try to see all of it, just do one thing today: open ${esc(course)} and finish one section. About ten minutes.`,
        `Then ask the AI mentor anything you got stuck on at college this week. It answers like a tutor who's got time, which is the whole point of it.`,
      ],
      '/study-centre/apprentice',
      'Do one section',
      {
        title: 'Ten minutes today',
        body: `Open ${course} and finish one section. Then ask the AI mentor anything you got stuck on.`,
      }
    );
  }

  if (d === 2 && !sent.has('day2_mock') && !sent.has('day2_weak_topics')) {
    if (p.mocks > 0) {
      return make(
        'day2_weak_topics',
        `${n}, the topics that cost you marks`,
        [
          `Hi ${esc(n)},`,
          `Day two. You sat a mock yesterday. At the bottom of the result is a list of the topics that cost you marks. That list is your study plan for the week, in order.`,
          `Open the first one on the list, do that section, then ask the AI mentor to explain it back to you in plain English. That's how it sticks.`,
        ],
        '/study-centre/apprentice',
        'Study the weak topics',
        {
          title: 'The topics that cost you marks',
          body: 'Your mock result is your study plan. Open the first weak topic.',
        }
      );
    }
    return make(
      'day2_mock',
      `${n}, sit one mock and see where you are`,
      [
        `Hi ${esc(n)},`,
        `Day two. Sit ${esc(mockName(p))}. Twenty minutes, real exam style, and at the end it tells you exactly which topics are costing you marks.`,
        `That list is what you study next. It's the fastest way to stop wasting evenings on stuff you already know.`,
      ],
      '/study-centre/mock-exams',
      'Sit a mock',
      {
        title: 'Sit one mock and see where you are',
        body: 'Twenty minutes, and it tells you exactly which topics are costing you marks.',
      }
    );
  }

  if (d === 3 && !sent.has('day3_mentor') && !sent.has('day3_flashcards')) {
    if (p.ai_chats > 0) {
      return make(
        'day3_flashcards',
        `${n}, five minutes of flashcards`,
        [
          `Hi ${esc(n)},`,
          `Day three. You've used the AI mentor already, which is more than most manage in a week. Today, five minutes of flashcards on the bus or at dinner. They're built for the exam and they keep your streak alive.`,
          `Three days in your first week is what makes this stick. You're nearly there.`,
        ],
        '/study-centre/apprentice',
        'Do the flashcards',
        {
          title: 'Five minutes of flashcards',
          body: 'Built for the exam, and they keep your streak alive.',
        }
      );
    }
    return make(
      'day3_mentor',
      `${n}, ask it the thing you didn't ask at college`,
      [
        `Hi ${esc(n)},`,
        `Day three. There's always one thing from the week you nodded along to and didn't actually get. Ask the AI mentor that. Zs, ring finals, diversity, whatever it was.`,
        `It knows BS 7671 inside out and it never makes you feel daft for asking. Apprentices who ask it something in their first week are the ones who stay, by a long way.`,
      ],
      '/study-centre/apprentice',
      'Ask the mentor',
      {
        title: "Ask it the thing you didn't ask at college",
        body: 'The AI mentor knows BS 7671 inside out and never makes you feel daft for asking.',
      }
    );
  }

  if (d === 4 && !sent.has('day4_streak') && !sent.has('day4_mock_again')) {
    if (p.active_days >= 3) {
      return make(
        'day4_mock_again',
        `${n}, sit it again and watch the score move`,
        [
          `Hi ${esc(n)},`,
          `Day four. You've been in three days running, which is exactly the habit. Sit ${esc(mockName(p))} again today and compare the score with the first one. It will have moved.`,
          `That number going up is the whole reason this works. Keep it going.`,
        ],
        '/study-centre/mock-exams',
        'Sit it again',
        {
          title: 'Sit it again and watch the score move',
          body: 'Three days running. Sit the mock again and compare.',
        }
      );
    }
    return make(
      'day4_streak',
      `${n}, keep it going`,
      [
        `Hi ${esc(n)},`,
        `Day four. One section or one set of flashcards today keeps your streak alive, and the leaderboard is watching.`,
        `Ten minutes a day beats a three-hour panic the night before. That's the whole trick, and the streak is there to make it easy.`,
      ],
      '/study-centre/apprentice',
      'Keep the streak',
      {
        title: 'Keep it going',
        body: 'One section or one set of flashcards today keeps your streak alive.',
      }
    );
  }
  return null;
}

function resumeTouch(n: string, daysLeft: number): Touch {
  const left = `${daysLeft} more day${daysLeft === 1 ? '' : 's'}`;
  return {
    key: 'day6_resume',
    subject: `${n}, you've still got the rest of the week`,
    html: shell(
      [
        `Hi ${esc(n)},`,
        `I can see you turned the renewal off early on. No problem, and I'm not going to argue with you. Your access runs to the end of the trial either way, ${left}.`,
        `If you turned it off just so you couldn't be charged by accident: I email everyone the day before any charge, always, so there was never a risk of that. If you'd rather keep it, one tap turns it back on and nothing changes until the trial ends.`,
        `And if it's a no, tell me why. One line back is genuinely useful.`,
      ],
      { url: `${SITE}/subscriptions?resume=1`, label: 'Turn it back on' }
    ),
    push: {
      title: "You've still got the rest of the week",
      body: 'Your access runs to the end of the trial. One tap turns renewal back on if you want it.',
      url: '/subscriptions?resume=1',
    },
  };
}

async function sendPush(
  supabaseUrl: string,
  serviceKey: string,
  userId: string,
  push: Touch['push']
) {
  try {
    await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
      body: JSON.stringify({
        userId,
        title: push.title,
        body: push.body,
        type: 'trial_sequence',
        // `deep_link` is the key the service worker and the native tap handler
        // honour for a generic destination; `url` kept for anything else.
        data: { deep_link: push.url, url: push.url },
      }),
    });
  } catch (e) {
    console.warn(`[trial-sequence] push failed for ${userId}: ${String(e)}`);
  }
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const authHeader = req.headers.get('Authorization') ?? '';
    if (!serviceKey || authHeader !== `Bearer ${serviceKey}`) {
      return new Response(JSON.stringify({ error: 'Not authorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    let body: {
      send?: boolean;
      role?: Role;
      test?: boolean;
      email?: string;
      name?: string;
      day?: string;
    } = {};
    try {
      body = await req.json();
    } catch {
      // dry run
    }
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    if (body.test && body.email) {
      // Preview any touch by simulating the state that produces it.
      const n = body.name ?? 'Andrew';
      const base: Person = {
        id: 'test',
        role: 'electrician',
        full_name: n,
        email: body.email,
        created_at: '',
        trial_end: '',
        source: 'stripe',
        stripe_customer_id: null,
        day_index: 1,
        course: 'Level 3',
        level: '3',
        year: 2,
        intent: null,
        last_feature: null,
        certs: 0,
        certs_pdf: 0,
        quotes: 0,
        invoices: 0,
        calendar: 0,
        scans: 0,
        ai_chats: 0,
        study: 0,
        mocks: 0,
        active_days: 1,
        sent: [],
      };
      const sims: Record<string, Partial<Person>> = {
        day1_electrician: { day_index: 1 },
        day1_electrician_quotes: { day_index: 1, intent: 'quotes' },
        day2_scanner: { day_index: 2 },
        day2_finish_cert: { day_index: 2, scans: 1 },
        day3_quote: { day_index: 3 },
        day3_invoice_that: { day_index: 3, quotes: 1 },
        day4_invoice: { day_index: 4 },
        day4_reminders: { day_index: 4, certs: 1 },
        day1_apprentice: { role: 'apprentice', day_index: 1 },
        day2_mock: { role: 'apprentice', day_index: 2 },
        day2_weak_topics: { role: 'apprentice', day_index: 2, mocks: 1 },
        day3_mentor: { role: 'apprentice', day_index: 3 },
        day3_flashcards: { role: 'apprentice', day_index: 3, ai_chats: 1 },
        day4_streak: { role: 'apprentice', day_index: 4 },
        day4_mock_again: { role: 'apprentice', day_index: 4, active_days: 3 },
      };
      const key = body.day ?? 'day1_electrician';
      const t =
        key === 'day6_resume'
          ? resumeTouch(n, 3)
          : (() => {
              const p = { ...base, ...(sims[key] ?? {}) } as Person;
              return p.role === 'apprentice' ? apprenticeTouch(p, n) : electricianTouch(p, n);
            })();
      if (!t) throw new Error(`no touch for ${key}`);
      const { error } = await resend.emails.send({
        from: FROM,
        to: body.email,
        subject: `[TEST ${t.key}] ${t.subject}`,
        html: t.html,
        text: htmlToPlainText(t.html),
      });
      if (error) throw new Error(error.message);
      return new Response(JSON.stringify({ success: true, test: t.key }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
    const { data: cohort, error: cErr } = await db.rpc('get_trial_sequence_cohort');
    if (cErr) throw cErr;
    let people = (cohort ?? []) as Person[];
    if (body.role) people = people.filter((p) => p.role === body.role);

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: '2023-10-16' }) : null;

    const plan: Array<{ p: Person; touch: Touch }> = [];
    for (const p of people) {
      const n = (p.full_name ?? '').trim().split(/\s+/)[0] || 'mate';
      const t = p.role === 'apprentice' ? apprenticeTouch(p, n) : electricianTouch(p, n);
      if (t) {
        plan.push({ p, touch: t });
        continue;
      }
      if (
        stripe &&
        p.day_index >= 5 &&
        p.stripe_customer_id &&
        (p.source === 'stripe' || p.source === null) &&
        !p.sent.includes('day6_resume')
      ) {
        try {
          const subs = await stripe.subscriptions.list({
            customer: p.stripe_customer_id,
            status: 'trialing',
            limit: 3,
          });
          if (subs.data.find((s: Stripe.Subscription) => s.cancel_at_period_end)) {
            const daysLeft = Math.max(
              1,
              Math.ceil((new Date(p.trial_end).getTime() - Date.now()) / 86_400_000)
            );
            plan.push({ p, touch: resumeTouch(n, daysLeft) });
          }
        } catch (e) {
          console.warn(`[trial-sequence] stripe check failed for ${p.id}: ${String(e)}`);
        }
      }
    }

    if (!body.send) {
      return new Response(
        JSON.stringify({
          success: true,
          dry_run: true,
          role: body.role ?? 'both',
          live_trialists: people.length,
          would_send: plan.length,
          by_touch: plan.reduce<Record<string, number>>((acc, x) => {
            acc[x.touch.key] = (acc[x.touch.key] ?? 0) + 1;
            return acc;
          }, {}),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let sent = 0;
    let failed = 0;
    for (const { p, touch } of plan) {
      // Record first: the unique (user_id, email_type) index is the lock, so a
      // retry or a second run the same day cannot double-send. A failed send
      // deletes the record so tomorrow can try again.
      const { error: recErr } = await db
        .from('trial_emails_sent')
        .insert({ user_id: p.id, email_type: touch.key });
      if (recErr) {
        console.warn(`[trial-sequence] ${touch.key} already recorded for ${p.id}, skipping`);
        continue;
      }
      const { error } = await resend.emails.send({
        from: FROM,
        to: p.email,
        subject: touch.subject,
        html: touch.html,
        text: htmlToPlainText(touch.html),
      });
      if (error) {
        failed++;
        console.warn(`[trial-sequence] ${touch.key} failed for ${p.id}: ${error.message}`);
        await db.from('trial_emails_sent').delete().eq('user_id', p.id).eq('email_type', touch.key);
        continue;
      }
      await sendPush(supabaseUrl, serviceKey, p.id, touch.push);
      sent++;
    }
    console.log(
      `[trial-sequence] role=${body.role ?? 'both'} sent=${sent} failed=${failed} of ${plan.length}`
    );
    return new Response(JSON.stringify({ success: true, sent, failed, planned: plan.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'trial-sequence',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'trial-sequence failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
