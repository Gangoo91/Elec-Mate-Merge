/**
 * calculator-result-email — emails a saved calculation back to the person who ran it.
 *
 * WHY: the public calculators pull 74,443 impressions a month and convert at 1.48%,
 * against 10.63% for the mock exams. The difference is not traffic quality — the
 * exams ask for an email at the moment of peak value (your score, your weak areas)
 * and the calculators ask for nothing. Someone who has just sized a CPC has a result
 * worth keeping for a job file. That is the ask.
 *
 * ⚠️ CONTRACT NOTES (these bite — mirror mock-result-email.ts exactly):
 *   - `renderEmailShell` needs `subject`, `preheader`, `company`, `greeting`,
 *     `body`, `hero`, `card`, `cta`, `signoff`. It is the branded house shell.
 *   - `body` is wrapped in the shell's own <p>. Inline content ONLY — a nested
 *     <p> auto-closes and breaks the card layout below it.
 *   - `signoff` is injected where table ROWS go. It must be a <tr>, not loose
 *     content, or it escapes the card entirely.
 *   - `renderHero` takes { label, value, sub } — not a title/body pair.
 *
 * Everything here arrives from an UNAUTHENTICATED public page. Nothing is trusted:
 * the caller sanitises first (sanitiseCalculatorResult in newsletter-subscribe).
 */
import { Resend } from './mailer.ts';
import { renderEmailShell, renderHero, renderButton, renderCard } from './email-template.ts';

const ELEC_MATE_YELLOW = '#facc15';
const INK = '#0f172a';
const MUTED = '#475569';

/** One labelled figure from the calculation — either an input or an output. */
export interface CalculatorResultRow {
  label: string;
  value: string;
}

export interface CalculatorResultPayload {
  calculatorName: string;
  /** Absolute URL back to the tool — origin forced by the caller's sanitiser. */
  calculatorUrl: string;
  /** The headline answer, e.g. "4 mm²". */
  headline: string;
  /** Short qualifier under the headline, e.g. "minimum CPC". */
  headlineLabel?: string;
  inputs: CalculatorResultRow[];
  outputs: CalculatorResultRow[];
  /** Standards note, e.g. "S = √(I²t) / k — BS 7671:2018+A4:2026". */
  basis?: string;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Two-column figure rows. A table, not flex — Outlook ignores flex entirely and
 * the values would stack under their labels.
 */
function renderRows(rows: CalculatorResultRow[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    ${rows
      .map(
        (r, i) => `
      <tr>
        <td style="padding:9px 0;font-size:14.5px;color:${MUTED};${
          i ? 'border-top:1px solid #e2e8f0;' : ''
        }">${escapeHtml(r.label)}</td>
        <td style="padding:9px 0;font-size:14.5px;font-weight:700;color:${INK};text-align:right;white-space:nowrap;${
          i ? 'border-top:1px solid #e2e8f0;' : ''
        }">${escapeHtml(r.value)}</td>
      </tr>`
      )
      .join('')}
  </table>`;
}

export async function sendCalculatorResultEmail(
  email: string,
  result: CalculatorResultPayload
): Promise<void> {
  const apiKey = Deno.env.get('BREVO_API_KEY');
  if (!apiKey) return;

  const name = escapeHtml(result.calculatorName);
  // encodeURI so a stray space or bracket in a path cannot break the anchor.
  const url = encodeURI(result.calculatorUrl);
  const signupUrl =
    'https://www.elec-mate.com/auth/signup?utm_source=email&utm_medium=calculator_result&utm_campaign=calc_result';

  const resultCard = result.outputs.length
    ? renderCard({ label: 'Result', body: renderRows(result.outputs) })
    : '';

  const inputsCard = result.inputs.length
    ? renderCard({
        label: 'What you entered',
        body: `${renderRows(result.inputs)}${
          result.basis
            ? `<p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:${MUTED};">${escapeHtml(
                result.basis
              )}</p>`
            : ''
        }`,
      })
    : '';

  const subject = `${result.calculatorName} — ${result.headline}`;

  const html = renderEmailShell({
    subject,
    preheader: `${result.headlineLabel ? `${result.headlineLabel}: ` : ''}${
      result.headline
    } — with your inputs, ready for the job file.`,
    company: {
      name: 'Elec-Mate',
      primaryColor: ELEC_MATE_YELLOW,
      email: 'info@elec-mate.com',
      website: 'https://www.elec-mate.com',
    },
    greeting: 'Hi mate,',
    // Inline only — the shell wraps this in its own <p>.
    body: `Here's your <strong>${name}</strong> result, with the figures you entered underneath it so it stands as a record rather than a number with no working.`,
    hero: renderHero({
      label: result.headlineLabel || 'Result',
      value: result.headline,
      sub: result.basis,
    }),
    card: `${resultCard}${inputsCard}`,
    // The CTA is the APP, not the calculator — they have the answer already.
    // The calculator link goes in the sign-off, where it reads as a courtesy
    // rather than competing with the thing we actually want them to do.
    cta: renderButton({
      label: 'Try Elec-Mate free for 7 days',
      href: signupUrl,
      background: ELEC_MATE_YELLOW,
      microcopy: '70+ calculators · certificates · saved against every job',
    }),
    // Must be a <tr>. Loose content here escapes the card.
    signoff: `<tr><td style="padding:8px 36px 36px;">
      <p style="margin:0;font-size:15.5px;line-height:1.65;color:${INK};">
        A calculation on its own isn't a record. In <strong>Elec-Mate</strong> every figure
        you work out is saved against the job and carries straight through to the certificate
        you issue — so the sizing, the test results and the paperwork all agree with each
        other, and you're not retyping the same numbers three times.
      </p>
      <p style="margin:16px 0 0;font-size:15.5px;line-height:1.65;color:${INK};">
        The calculator stays free either way —
        <a href="${url}" style="color:#b45309;text-decoration:underline;">run it again here</a>.
      </p>
      <p style="margin:18px 0 0;font-size:15.5px;line-height:1.5;color:${INK};">— Andrew</p>
      <p style="margin:2px 0 0;font-size:13px;color:${MUTED};">Founder, Elec-Mate</p>
    </td></tr>`,
  });

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      to: [email],
      subject,
      html,
    });
    if (error) {
      console.warn('[newsletter-subscribe] calculator result email send failed', error);
    }
  } catch (err) {
    console.error('[calculator-result-email] send threw', err);
  }
}
