/**
 * Explicit consent before the wellbeing features (ELE-1812, 4 Oct 2026).
 *
 * Mood check-ins, the journal, sleep log, safety plan and peer support hold
 * information about someone's health — special category data under UK GDPR
 * Article 9 — so we need their explicit consent before storing any of it.
 * Shown once per account (profiles.wellbeing_consent_at). Crisis numbers are
 * on the screen whether or not they agree: nobody should have to consent to
 * see how to get help.
 *
 * Volt: no icons, plain words, two equal buttons.
 */
import { useEffect, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';

export function WellbeingConsentGate({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState<'loading' | 'needed' | 'given'>('loading');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    supabase
      .from('profiles')
      .select('wellbeing_consent_at')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const at = (data as { wellbeing_consent_at?: string | null } | null)?.wellbeing_consent_at;
        setState(at ? 'given' : 'needed');
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const agree = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);
    const { error: e } = await supabase
      .from('profiles')
      .update({ wellbeing_consent_at: new Date().toISOString() } as never)
      .eq('id', user.id);
    setSaving(false);
    if (e) {
      setError('That didn’t save — check your signal and try again.');
      return;
    }
    setState('given');
  };

  if (state === 'given') return <>{children}</>;
  if (state === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    // Wide on a desktop (10 Oct): the promise on the left, help-now on the
    // right; one column on a phone with help-now last.
    <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-4 pb-12 pt-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start lg:gap-10 lg:px-8 lg:pt-10">
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-elec-yellow">Wellbeing · before you start</p>
        <h1 className="mt-1.5 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
          This space is private to you
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-white">
          Mood check-ins, your journal, sleep log and safety plan are about your health, so the law
          asks us to get your clear yes before we store them.
        </p>

        <ul className="-mx-4 mt-5 divide-y divide-white/[0.08] border-y border-white/[0.08] sm:mx-0">
          {[
            'Only you can see what you enter. Your employer and college can’t.',
            'Peer support messages are seen by the supporter you choose to talk to.',
            'We never use it for adverts, statistics or to train AI.',
            'Delete any entry, or everything, whenever you like — it’s also removed if you delete your account.',
          ].map((t) => (
            <li key={t} className="px-4 py-3 text-[15px] leading-snug text-white sm:px-0">
              {t}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[13.5px] leading-relaxed text-white">
          You can withdraw your consent at any time by deleting your entries. More in our{' '}
          <Link
            to="/privacy"
            className="font-semibold text-elec-yellow underline underline-offset-2"
          >
            privacy notice
          </Link>
          .
        </p>

        {error && (
          <p role="alert" className="mt-4 text-[13.5px] font-medium text-red-300">
            {error}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:max-w-md">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={cn(buttonSecondaryCn, 'sm:flex-1')}
          >
            Not now
          </button>
          <button
            type="button"
            onClick={() => void agree()}
            disabled={saving}
            className={cn(buttonPrimaryCn, 'flex items-center justify-center font-bold sm:flex-1')}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'I agree, continue'}
          </button>
        </div>
      </div>

      {/* Crisis numbers whether or not they agree — and one tap to dial. */}
      <div className="-mx-4 card-surface !border-red-400/40 p-5 max-sm:!rounded-none max-sm:!border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
        <p className="text-[15px] font-semibold text-red-300">Need help now?</p>
        <p className="mt-1 text-[14px] leading-relaxed text-white">
          Free and confidential. Electrical Industries Charity is weekdays 9 to 5.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {[
            { href: 'tel:999', label: 'In danger: 999', urgent: true },
            { href: 'tel:116123', label: 'Samaritans 116 123', urgent: true },
            { href: 'sms:85258?body=SHOUT', label: 'Text SHOUT to 85258', urgent: false },
            { href: 'tel:08006521618', label: 'EIC 0800 652 1618', urgent: false },
          ].map((c) => (
            <a
              key={c.href}
              href={c.href}
              className={cn(
                'inline-flex h-11 items-center justify-center rounded-xl border px-3 text-[14px] font-semibold tabular-nums touch-manipulation active:bg-white/[0.06]',
                c.urgent ? 'border-red-400/50 text-red-300' : 'border-white/[0.14] text-white'
              )}
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
