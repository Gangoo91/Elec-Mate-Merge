import { useState } from 'react';
import { Loader2, ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { trackLead } from '@/lib/marketing-pixels';
import { getStoredAttribution, fireServerCapi } from '@/lib/attribution';
import { storageSetSync } from '@/utils/storage';

type Source = 'landing_form' | 'exit_intent' | 'lead_magnet_cheatsheet' | 'footer' | 'other';

interface Props {
  source: Source;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  onSuccess?: (result: { downloadUrl: string | null }) => void;
  includeName?: boolean;
  className?: string;
  compact?: boolean;
}

export function EmailCaptureForm({
  source,
  placeholder = 'you@example.com',
  buttonLabel = 'Get it',
  successMessage = "You're on the list — check your email.",
  onSuccess,
  includeName = false,
  className,
  compact = false,
}: Props) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || status === 'loading') return;
    setStatus('loading');
    setErrorMsg(null);

    const eventId = trackLead({ source, value: 0 });
    const attribution = getStoredAttribution();

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: {
          email,
          first_name: firstName || undefined,
          source,
          event_id: eventId,
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

      setStatus('success');
      onSuccess?.({
        downloadUrl: (data as { download_url?: string | null })?.download_url ?? null,
      });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/[0.08] p-4 text-green-300',
          className
        )}
      >
        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm sm:text-base">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn('space-y-3', className)}>
      {includeName && (
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="h-12 text-base text-white touch-manipulation border-white/30 bg-white/[0.04] placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500"
          autoComplete="given-name"
        />
      )}
      <div className={cn('flex gap-2', compact ? 'flex-row' : 'flex-col sm:flex-row')}>
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="h-12 w-full pl-10 text-base text-white touch-manipulation border-white/30 bg-white/[0.04] placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500"
            autoComplete="email"
            inputMode="email"
          />
        </div>
        <Button
          type="submit"
          disabled={!isValid || status === 'loading'}
          className="h-12 touch-manipulation rounded-xl bg-yellow-400 px-6 text-base font-semibold text-black hover:bg-yellow-500 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {buttonLabel}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
      <p className="text-xs text-white">We'll email it once. No spam — unsubscribe any time.</p>
    </form>
  );
}
