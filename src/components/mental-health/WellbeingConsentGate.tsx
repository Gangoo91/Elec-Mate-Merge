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
    <div className="mx-auto max-w-[36rem] px-5 pb-12 pt-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
        Wellbeing · before you start
      </p>
      <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-[-0.02em] text-white">
        This space is private to you
      </h1>
      <p className="mt-3 text-[16px] leading-relaxed text-white">
        Mood check-ins, your journal, sleep log and safety plan are about your health, so the law
        asks us to get your clear yes before we store them.
      </p>

      <ul className="mt-5 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {[
          'Only you can see what you enter. Your employer and college can’t.',
          'Peer support messages are seen by the supporter you choose to talk to.',
          'We never use it for adverts, statistics or to train AI.',
          'Delete any entry, or everything, whenever you like — it’s also removed if you delete your account.',
        ].map((t) => (
          <li key={t} className="py-3 text-[15px] leading-snug text-white">
            {t}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[13.5px] leading-relaxed text-white">
        You can withdraw your consent at any time by deleting your entries. More in our{' '}
        <Link to="/privacy" className="font-semibold text-elec-yellow underline underline-offset-2">
          privacy notice
        </Link>
        .
      </p>

      {error && (
        <p role="alert" className="mt-4 text-[13.5px] font-medium text-red-300">
          {error}
        </p>
      )}

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={cn(buttonSecondaryCn, 'flex-1')}
        >
          Not now
        </button>
        <button
          type="button"
          onClick={() => void agree()}
          disabled={saving}
          className={cn(buttonPrimaryCn, 'flex flex-1 items-center justify-center font-bold')}
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'I agree, continue'}
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-white/[0.12] bg-[hsl(0_0%_11%)] p-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
          Need help now?
        </p>
        <p className="mt-1.5 text-[15px] leading-relaxed text-white">
          In danger, call <strong>999</strong>. Samaritans: <strong>116 123</strong> (free, 24
          hours). Text <strong>SHOUT</strong> to <strong>85258</strong>. Electrical Industries
          Charity: <strong>0800 652 1618</strong> (weekdays 9–5).
        </p>
      </div>
    </div>
  );
}
