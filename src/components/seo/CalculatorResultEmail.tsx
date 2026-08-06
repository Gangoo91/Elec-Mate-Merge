/**
 * CalculatorResultEmail — "email me this calculation" capture, shown under a
 * calculator once it has produced a result.
 *
 * WHY IT SITS HERE
 * The public calculators pull 74,443 impressions a month and convert at 1.48%,
 * against 10.63% for the mock exams. The difference is not traffic quality — it
 * is that the exams ask for an email at the moment of peak value (your score,
 * your weak areas) and the calculators ask for nothing at all. Someone who has
 * just sized a CPC has a result worth keeping for a job file, so give them a
 * reason to hand an address over rather than a generic newsletter box.
 *
 * DESIGN
 * Follows the same surface language as the mock exam results: edge-to-edge on
 * mobile, hairline rules, full text-white (never low-opacity grey), 44px targets.
 * No icons, no emoji — hierarchy from type weight and spacing.
 *
 * CONTRACT
 * Renders NOTHING until `result` is non-null, so a calculator can mount it
 * unconditionally and let its own state decide when it appears. Every field is
 * re-sanitised server-side; nothing here is trusted by the edge function.
 */
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PANEL, LABEL } from '@/components/seo/seoSurface';

export interface CalculatorResultRow {
  label: string;
  value: string;
}

export interface CalculatorResultSummary {
  /** Human name of the tool, e.g. "Adiabatic Equation Calculator". */
  calculatorName: string;
  /**
   * Absolute path of this calculator on our site, e.g. "/tools/adiabatic-equation-calculator".
   * A full PATH, not a slug — two calculators live outside /tools/, so assuming
   * that prefix produced a dead link for them. The origin is forced server-side.
   */
  calculatorPath: string;
  /** The headline answer alone, e.g. "4 mm²". */
  headline: string;
  /** Short qualifier shown under it, e.g. "minimum CPC". */
  headlineLabel?: string;
  inputs: CalculatorResultRow[];
  outputs: CalculatorResultRow[];
  /** Optional standards note, e.g. "BS 7671:2018+A4:2026 Table 54.7". */
  basis?: string;
}

interface Props {
  /** Null until the calculator has a result worth emailing. */
  result: CalculatorResultSummary | null;
}

export function CalculatorResultEmail({ result }: Props) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!result || state === 'sending') return;

      const address = email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
        setState('error');
        setMessage('That does not look like an email address.');
        return;
      }

      setState('sending');
      try {
        const { error } = await supabase.functions.invoke('newsletter-subscribe', {
          body: {
            email: address,
            source: 'calculator_result',
            calculator_result: result,
          },
        });
        if (error) throw error;
        setState('sent');
      } catch {
        // Don't leave them staring at a spinner if Brevo or the function is down.
        setState('error');
        setMessage('Could not send just now. Try again in a moment.');
      }
    },
    [email, result, state]
  );

  if (!result) return null;

  if (state === 'sent') {
    return (
      <section className={`${PANEL} mt-6 px-4 py-5 sm:px-5`}>
        <h2 className={`${LABEL} mb-2 text-white`}>Sent</h2>
        <p className="text-[14.5px] leading-relaxed text-white">
          Your {result.calculatorName.toLowerCase()} result is on its way to {email}. It
          includes what you entered, so it stands up as a record against the job.
        </p>
      </section>
    );
  }

  return (
    <section className={`${PANEL} mt-6 px-4 py-5 sm:px-5`} aria-labelledby="calc-email-heading">
      <h2 id="calc-email-heading" className={`${LABEL} mb-2 text-white`}>
        Email me this calculation
      </h2>
      <p className="mb-4 text-[14.5px] leading-relaxed text-white">
        We&rsquo;ll send the result and the figures you entered, so you have a record for the
        job file.
      </p>

      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="calc-email" className="sr-only">
          Email address
        </label>
        <input
          id="calc-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') setState('idle');
          }}
          placeholder="you@example.com"
          className="h-12 flex-1 touch-manipulation rounded-xl border border-white/[0.14] bg-white/[0.04] px-4 text-base text-white placeholder:text-white/40 caret-elec-yellow transition-colors focus:border-elec-yellow focus:outline-none focus:ring-0 [color-scheme:dark]"
          required
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="h-12 touch-manipulation rounded-xl bg-elec-yellow px-6 text-[15px] font-bold text-black transition-colors hover:brightness-95 disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending…' : 'Send it'}
        </button>
      </form>

      {state === 'error' && (
        <p className="mt-3 text-[13.5px] text-orange-300" role="alert">
          {message}
        </p>
      )}
      <p className="mt-3 text-[13px] text-white">
        One email with your result. We&rsquo;ll also send occasional BS 7671 updates — unsubscribe
        any time.
      </p>
    </section>
  );
}

export default CalculatorResultEmail;
