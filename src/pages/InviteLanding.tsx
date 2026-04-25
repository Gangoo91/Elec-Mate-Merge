import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Copy, Gift, Smartphone, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { storageSetSync } from '@/utils/storage';
import { trackReferralClicked } from '@/lib/analytics-events';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from '@/hooks/use-toast';

const IOS_APP_URL = 'https://apps.apple.com/gb/app/elec-mate/id6758948665';
const ANDROID_APP_URL =
  'https://play.google.com/store/apps/details?id=com.elecmate.app&referrer=ref_code%3D';

/**
 * Branded invite landing at /r/:code.
 *
 * Handles all referral traffic — short memorable URLs for WhatsApp sharing,
 * stores the code to localStorage so signup picks it up even if the user
 * navigates away and comes back. Detects platform and surfaces the right
 * install path (iOS App Store / Google Play / web signup).
 *
 * If the user is on iOS/Android and already has the app installed, Apple
 * Universal Links / Android App Links open the native app directly (this
 * page is bypassed entirely) — configured via /public/.well-known/.
 */
export default function InviteLanding() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inviterName, setInviterName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
  const isAndroid = /android/i.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid;
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    if (!code) return;
    const normalised = code.trim().toUpperCase();

    storageSetSync('elec-mate-referral-code', normalised);
    trackReferralClicked({ code: normalised, source: 'invite_landing' });

    // In the native app, skip the marketing page and jump straight to signup
    if (isNative) {
      navigate(`/auth/signup?ref=${normalised}&src=deeplink`, { replace: true });
      return;
    }

    // Fetch inviter name for the "Your mate X gave you..." social proof
    const fetchInviter = async () => {
      const { data } = await supabase
        .from('referral_codes')
        .select('user_id, profiles:user_id(full_name)')
        .eq('code', normalised)
        .eq('is_active', true)
        .maybeSingle();
      const name = (data as { profiles?: { full_name?: string } } | null)?.profiles?.full_name;
      if (name) setInviterName(name.split(/\s+/)[0]); // first name only
    };
    fetchInviter();
  }, [code, isNative, navigate]);

  const handleCopyCode = async () => {
    if (!code) return;
    try {
      await copyToClipboard(code.toUpperCase());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Copy failed', description: 'Try again.', variant: 'destructive' });
    }
  };

  const normalisedCode = (code || '').toUpperCase();
  const androidUrlWithReferrer = `${ANDROID_APP_URL}${encodeURIComponent(normalisedCode)}`;

  return (
    <div className="min-h-[100svh] bg-[#0a0a0a] text-white">
      <Helmet>
        <title>
          {inviterName ? `${inviterName} invited you` : 'Your mate invited you'} — Elec-Mate
        </title>
        <meta
          name="description"
          content="Get a free month of Elec-Mate — certificates, AI tools, quotes, and more. For UK electricians."
        />
      </Helmet>

      <div className="mx-auto flex min-h-[100svh] max-w-lg flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/* Top nav */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-sm text-white hover:text-white">
            ← Elec-Mate
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1"
        >
          {/* Hero */}
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-yellow-300">
            <Gift className="h-3 w-3" />
            You've been invited
          </div>
          <h1 className="mb-3 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
            {inviterName ? (
              <>
                {inviterName} gave you a <span className="text-yellow-400">free month</span> of
                Elec-Mate
              </>
            ) : (
              <>
                You've got a <span className="text-yellow-400">free month</span> of Elec-Mate
              </>
            )}
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-white sm:text-base">
            The complete platform for UK electricians — certificates, AI assistants, voice quotes,
            60+ calculators. Sign up with this code to claim your free month on top of the standard
            7-day trial.
          </p>

          {/* Code display */}
          <div className="mb-6 rounded-2xl border border-white/10 bg-[#111] p-5">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-white/50">
              Your invite code
            </p>
            <div className="flex items-center justify-between gap-3">
              <code className="select-all text-2xl font-bold tracking-widest text-yellow-400">
                {normalisedCode}
              </code>
              <Button
                onClick={handleCopyCode}
                size="sm"
                className="h-9 touch-manipulation bg-white/[0.08] text-sm text-white hover:bg-white/[0.15]"
              >
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-3.5 w-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                  </>
                )}
              </Button>
            </div>
            <p className="mt-3 text-[11px] text-white">
              We've saved this automatically — it will apply when you sign up.
            </p>
          </div>

          {/* Primary CTA — always sign up on web first */}
          <Link to={`/auth/signup?ref=${normalisedCode}&src=invite`} className="block">
            <Button className="mb-3 h-14 w-full touch-manipulation rounded-2xl bg-yellow-400 text-base font-semibold text-black hover:bg-yellow-500">
              Claim my free month
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          {/* Mobile: also offer native app install */}
          {isMobile && (
            <div className="mb-4">
              <p className="mb-2 text-center text-[11px] uppercase tracking-wider text-white">
                or get the app
              </p>
              <div className="grid grid-cols-1 gap-2">
                {isIOS && (
                  <a
                    href={IOS_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-white hover:bg-white/[0.08]"
                  >
                    <Smartphone className="h-4 w-4" />
                    Install on iOS
                  </a>
                )}
                {isAndroid && (
                  <a
                    href={androidUrlWithReferrer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-white hover:bg-white/[0.08]"
                  >
                    <Smartphone className="h-4 w-4" />
                    Install on Android
                  </a>
                )}
              </div>
              <p className="mt-3 text-center text-[11px] text-white/50">
                After installing, open the app and sign up with code{' '}
                <strong className="text-yellow-400">{normalisedCode}</strong>
              </p>
            </div>
          )}

          {/* Social proof */}
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: Zap, label: '17+ certs' },
              { icon: Sparkles, label: '5 AI specialists' },
              { icon: Check, label: '7-day trial' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <Icon className="mx-auto mb-1 h-4 w-4 text-yellow-400" />
                <p className="text-[11px] text-white">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="mt-6 text-center text-[11px] text-white/30">Elec-Mate Ltd · Made in the UK</p>
      </div>
    </div>
  );
}
