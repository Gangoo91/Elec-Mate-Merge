import { Resend } from './mailer.ts';
import { renderEmailShell, renderHero, renderButton, renderCard } from './email-template.ts';

/**
 * Send the "here's what you got wrong" mock exam breakdown.
 *
 * Sits behind the email-capture block on the public /mock-exams pages: the
 * visitor sits the exam free and sees their score on-screen either way, then
 * optionally asks for the breakdown by email. The breakdown IS the product —
 * every question they missed with the right answer and the worked explanation
 * — so it has to earn its place before it pitches anything.
 *
 * Composed from the shared email primitives in `email-template.ts` (light
 * slate body, white card, brand ribbon, one dominant CTA) so it matches every
 * other user-facing email we send. An earlier version of this file was a
 * bespoke dark template copied from the cheatsheet email — that is the older
 * house style, since superseded (compare winback v12 → v13).
 *
 * ⚠️ The result payload arrives from an unauthenticated public page, so every
 * field is attacker-controllable. The shell's own helpers escape what they
 * render, and everything we interpolate into raw HTML here goes through
 * escapeHtml(). The caller bounds the array lengths. Never interpolate a raw
 * field into this template.
 *
 * Fire-and-forget from the caller — never throws.
 */

export interface MockResultMissedQuestion {
  question: string;
  correctAnswer: string;
  explanation?: string;
}

export interface MockResultPayload {
  examName: string;
  examUrl: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  passThreshold: number;
  weakAreas: Array<{ name: string; correct: number; total: number }>;
  missed: MockResultMissedQuestion[];
  /** Total missed count before truncation — drives the "and N more" line. */
  missedTotal: number;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const ELEC_MATE_YELLOW = '#facc15';
const INK = '#0f172a';
const MUTED = '#475569';
const RULE = '#e2e8f0';

export async function sendMockResultEmail(
  email: string,
  result: MockResultPayload
): Promise<void> {
  const apiKey = Deno.env.get('BREVO_API_KEY');
  if (!apiKey) return;

  const examName = escapeHtml(result.examName);
  const examUrl = encodeURI(result.examUrl);
  const signupUrl =
    'https://www.elec-mate.com/auth/signup?utm_source=email&utm_medium=mock_exam_result&utm_campaign=exam_breakdown';

  // Weak areas — a compact table inside the standard info card.
  const weakAreasCard =
    result.weakAreas.length > 0
      ? renderCard({
          label: 'Where the marks went',
          body: `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${result.weakAreas
              .map(
                (w) => `<tr>
                <td style="padding:7px 0;border-bottom:1px solid ${RULE};font-size:14.5px;color:${INK};">${escapeHtml(w.name)}</td>
                <td align="right" style="padding:7px 0;border-bottom:1px solid ${RULE};font-size:14.5px;font-weight:600;color:${INK};white-space:nowrap;">${w.correct}/${w.total}</td>
              </tr>`
              )
              .join('')}
          </table>`,
        })
      : '';

  // The missed questions — the actual reason they handed over an email.
  const missedCard =
    result.missed.length > 0
      ? renderCard({
          label: 'The ones you missed',
          body: `<p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:${MUTED};">
           Right answer and the reasoning on each. Read these once and they tend to stick.
         </p>
         ${result.missed
           .map(
             (q, i) => `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="margin-bottom:14px;background:#f8fafc;border:1px solid ${RULE};border-radius:12px;">
               <tr><td style="padding:16px 18px;">
                 <p style="margin:0 0 10px;font-size:14.5px;font-weight:600;line-height:1.5;color:${INK};">
                   ${i + 1}. ${escapeHtml(q.question)}
                 </p>
                 <p style="margin:0;font-size:14px;line-height:1.55;color:#15803d;font-weight:600;">
                   ${escapeHtml(q.correctAnswer)}
                 </p>
                 ${
                   q.explanation
                     ? `<p style="margin:10px 0 0;font-size:13.5px;line-height:1.6;color:${MUTED};">${escapeHtml(q.explanation)}</p>`
                     : ''
                 }
               </td></tr>
             </table>`
           )
           .join('')}
         ${
           result.missedTotal > result.missed.length
             ? `<p style="margin:0;font-size:13.5px;line-height:1.6;color:${MUTED};">
                  Plus ${result.missedTotal - result.missed.length} more from this attempt — the app keeps the full list and builds your practice from it.
                </p>`
             : ''
         }`,
        })
      : '';

  const html = renderEmailShell({
    subject: `Your ${result.examName} breakdown — ${result.percentage}%`,
    preheader: `${result.score} of ${result.total} correct. Here are the ones you missed, with the reasoning.`,
    company: {
      name: 'Elec-Mate',
      primaryColor: ELEC_MATE_YELLOW,
      email: 'info@elec-mate.com',
      website: 'https://www.elec-mate.com',
    },
    greeting: 'Hi mate,',
    // NOTE: the shell wraps `body` in its own <p>. Pass inline content only —
    // a nested <p> auto-closes and breaks the card layout.
    body: `You just sat the <strong>${examName}</strong>. Here's the full breakdown.`,
    hero: renderHero({
      label: result.passed ? 'Pass' : 'Not yet',
      value: `${result.percentage}%`,
      sub: `${result.score} of ${result.total} correct · pass mark ${result.passThreshold}%`,
    }),
    card: `${weakAreasCard}${missedCard}`,
    cta: renderButton({
      label: 'Practise your weak topics',
      href: signupUrl,
      background: ELEC_MATE_YELLOW,
      microcopy:
        'Full question bank · every wrong answer explained · progress tracked across attempts',
    }),
    // `signoff` is injected where table ROWS go — it must be a <tr>, not bare
    // content. Passing loose <p>/<table> here escapes the card entirely.
    signoff: `<tr><td style="padding:8px 36px 36px;">
      <p style="margin:0;font-size:15.5px;line-height:1.65;color:${INK};">
        The mock itself stays free and you can retake it as often as you like —
        <a href="${examUrl}" style="color:#b45309;text-decoration:underline;">it's right here</a>.
        Different questions every time.
      </p>
      <p style="margin:18px 0 0;font-size:15.5px;line-height:1.5;color:${INK};">— Andrew</p>
      <p style="margin:2px 0 0;font-size:13px;color:${MUTED};">Founder, Elec-Mate</p>
    </td></tr>`,
  });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      replyTo: 'founder@elec-mate.com',
      to: [email],
      subject: `Your ${result.examName} breakdown — ${result.percentage}%`,
      html,
    });
    if (error) {
      console.warn('[newsletter-subscribe] mock result email send failed', error);
    } else {
      console.log('[newsletter-subscribe] mock result email sent to', email);
    }
  } catch (err) {
    console.warn('[newsletter-subscribe] mock result email threw', err);
  }
}
