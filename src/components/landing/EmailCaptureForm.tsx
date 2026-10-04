import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { inputCn, labelCn, buttonPrimaryCn } from '@/components/forms/fieldStyles';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { trackLead, hasMarketingConsent } from '@/lib/marketing-pixels';
import { getStoredAttribution, fireServerCapi } from '@/lib/attribution';
import { trackEmailCaptured } from '@/lib/analytics-events';
import { storageSetSync } from '@/utils/storage';

export type Source =
  | 'landing_form'
  | 'exit_intent'
  | 'lead_magnet_cheatsheet'
  | 'lead_magnet_symbols_chart'
  | 'lead_magnet_zs_ze_reference'
  | 'lead_magnet_plug_in_solar'
  | 'mock_exam_result'
  | 'footer'
  | 'other';

interface Props {
  source: Source;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  onSuccess?: (result: { downloadUrl: string | null }) => void;
  /** Fired when the subscribe call fails, so a caller gating an asset behind
   *  this form can still hand the asset over rather than leaving the visitor
   *  with an error and nothing to show for their address. */
  onError?: () => void;
  includeName?: boolean;
  className?: string;
  compact?: boolean;
  /**
   * Extra body fields merged into the edge-function payload. Used by the
   * mock exam results block to attach `mock_result` so the breakdown email
   * has something to render. Sanitised server-side — never trusted there.
   */
  extraPayload?: Record<string, unknown>;
  /** Replaces the default "we'll email it once" reassurance line. */
  footnote?: string;
}

export function EmailCaptureForm({
  source,
  placeholder = 'you@example.com',
  buttonLabel = 'Get it',
  successMessage = "You're on the list — check your email.",
  onSuccess,
  onError,
  includeName = false,
  className,
  compact = false,
  extraPayload,
  footnote,
}: Props) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    // Validate on submit, not by greying the button out — a dead button
    // gives no reason; a message does.
    if (!isValid) {
      setStatus('error');
      setErrorMsg('Enter a valid email address.');
      return;
    }
    setStatus('loading');
    setErrorMsg(null);

    const eventId = trackLead({ source, value: 0 });
    const attribution = getStoredAttribution();

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: {
          ...extraPayload,
          email,
          first_name: firstName || undefined,
          source,
          event_id: eventId,
          ad_tracking_consent: hasMarketingConsent(),
          page_url: window.location.pathname,
          utm: {
            utm_source: attribution.utm_source,
            utm_medium: attribution.utm_medium,
            utm_campaign: attribution.utm_campaign,
            gclid: attribution.gclid,
            fbclid: attribution.fbclid,
          },
        },
      });

      if (error) throw new Error(error.message);
      if ((data as { error?: string })?.error) {
        throw new Error((data as { error: string }).error);
      }

      // Belt and braces: fire server-side Lead through the main CAPI path too
      // so the event reaches Meta even if the Brevo call later rate-limits.
      fireServerCapi({
        event_name: 'Lead',
        event_id: eventId,
        email,
        first_name: firstName || undefined,
        content_name: source,
      });

      // Flag that we've captured — used by ExitIntentModal to skip itself so
      // we don't ask the same person for their email twice in one session.
      storageSetSync('elec-mate-email-captured', String(Date.now()));

      // Only fired on a confirmed success, so the count matches leads that
      // actually reached Brevo rather than every submit attempt.
      trackEmailCaptured({ source });

      setStatus('success');
      onSuccess?.({
        downloadUrl: (data as { download_url?: string | null })?.download_url ?? null,
      });
    } catch (err) {
      onError?.();
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  };

  // Volt (4 Oct 2026): the cert form's underline field and solid volt
  // button, no icons; success is a ruled note, not a green wash.
  if (status === 'success') {
    return (
      <div
        role="status"
        className={cn(
          'rounded-2xl border border-elec-yellow/50 bg-[hsl(0_0%_11%)] px-4 py-3.5',
          className
        )}
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
          Sent
        </p>
        <p className="mt-1 text-[15px] font-medium leading-snug text-white">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={cn('space-y-4', className)}>
      {includeName && (
        <div>
          <label htmlFor={`${source}-name`} className={labelCn}>
            First name
          </label>
          <input
            id={`${source}-name`}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            autoComplete="given-name"
            className={inputCn}
          />
        </div>
      )}
      <div
        className={cn(
          'flex flex-col gap-3',
          // Side by side only when asked: the default sits in narrow columns
          // (the PDF card's 320px) where a row squeezed the field.
          compact && 'sm:flex-row sm:items-end'
        )}
      >
        <div className="min-w-0 flex-1">
          <label htmlFor={`${source}-email`} className={labelCn}>
            Your email
          </label>
          <input
            id={`${source}-email`}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') {
                setStatus('idle');
                setErrorMsg(null);
              }
            }}
            placeholder={placeholder}
            required
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            inputMode="email"
            enterKeyHint="send"
            className={inputCn}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            buttonPrimaryCn,
            'flex items-center justify-center px-6 font-bold',
            compact ? 'w-full sm:w-auto' : 'w-full'
          )}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
            </>
          ) : (
            buttonLabel
          )}
        </button>
      </div>
      {errorMsg && (
        <p role="alert" className="text-[13.5px] font-medium text-red-300">
          {errorMsg}
        </p>
      )}
      <p className="text-[12.5px] leading-relaxed text-white">
        {footnote ?? "We'll email it once. No spam — unsubscribe any time."}
      </p>
    </form>
  );
}
