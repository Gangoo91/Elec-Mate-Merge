import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import BiometricPromptSheet from '@/components/auth/BiometricPromptSheet';
import { AuthFrame, AuthHeading } from '@/components/auth/AuthFrame';
import { useAuth } from '@/contexts/AuthContext';
import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import { useHaptic } from '@/hooks/useHaptic';

import { storageGetSync, storageSetSync } from '@/utils/storage';
import { supabase } from '@/integrations/supabase/client';
import {
  inputCn,
  labelCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { addBreadcrumb, captureError } from '@/lib/sentry';

const LAST_EMAIL_KEY = 'elec-mate-last-email';

/** Supabase's raw auth messages, in words a person can act on. */
const friendlySignInError = (message: string) => {
  const m = (message || '').toLowerCase();
  if (m.includes('invalid login') || m.includes('invalid credentials')) {
    return "That email and password don't match. Check them, or reset your password.";
  }
  if (m.includes('email not confirmed')) {
    return 'Confirm your email first — check your inbox for the link we sent.';
  }
  if (m.includes('rate') || m.includes('too many')) {
    return 'Too many attempts. Wait a minute, then try again.';
  }
  return message || 'Something went wrong signing in. Please try again.';
};

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const haptic = useHaptic();
  const [showBiometricPrompt, setShowBiometricPrompt] = useState(false);
  const [isBiometricLoggingIn, setIsBiometricLoggingIn] = useState(false);

  const pendingCredentials = useRef<{ email: string; password: string } | null>(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // ProtectedRoute sends "/subscriptions?extend=1" here as state.from; the
  // trial emails rely on landing back on it after sign-in. Anything else
  // still goes to the dashboard.
  const from = (location.state as { from?: { pathname?: string; search?: string } } | null)?.from;
  const destination =
    from?.pathname && from.pathname.startsWith('/') && from.pathname !== '/auth/signin'
      ? `${from.pathname}${from.search ?? ''}`
      : '/dashboard';
  const biometric = useBiometricAuth();

  /**
   * Where to land after signing in. College STAFF who are not also a learner
   * go straight to the College Hub — a tutor who lands on the electrician home
   * page (certificates, quotes, invoices) has no idea what the app is for.
   * Anyone else, and anything with an explicit `from`, keeps the old behaviour.
   */
  const landing = async (): Promise<string> => {
    if (destination !== '/dashboard') return destination;
    try {
      const { data } = await supabase.rpc('get_my_college_context');
      const ctx = (data ?? {}) as { staff?: unknown; learner?: unknown };
      if (ctx.staff && !ctx.learner) return '/college';
      // An invited independent assessor with no subscription of their own
      // works in /assessor; the dashboard would show them the paywall.
      const { data: auth } = await supabase.auth.getUser();
      if (auth.user) {
        const [{ count }, { data: prof }] = await Promise.all([
          supabase
            .from('portfolio_assessor_links' as never)
            .select('id', { count: 'exact', head: true })
            .eq('assessor_user_id', auth.user.id)
            .eq('status', 'active'),
          supabase.from('profiles').select('subscribed, free_access_granted').eq('id', auth.user.id).maybeSingle(),
        ]);
        const paid = !!(prof as { subscribed?: boolean; free_access_granted?: boolean } | null)?.subscribed ||
          !!(prof as { free_access_granted?: boolean } | null)?.free_access_granted;
        if ((count ?? 0) > 0 && !paid) return '/assessor';
      }
    } catch {
      /* fall through to the dashboard */
    }
    return destination;
  };
  const goAfterSignIn = () => {
    void landing().then((d) => setTimeout(() => navigate(d), 800));
  };

  // ?email= wins (links from emails, "Sign in instead"); otherwise the address
  // last used to sign in on this device, so returning users only type a password.
  const prefilledRef = useRef(false);
  useEffect(() => {
    if (prefilledRef.current) return;
    prefilledRef.current = true;
    const emailParam = searchParams.get('email');
    const remembered = storageGetSync(LAST_EMAIL_KEY);
    if (emailParam) setEmail(emailParam);
    else if (remembered) setEmail(remembered);
  }, [searchParams]);

  // Biometric-first for returning users: prompt Face ID / fingerprint as soon
  // as the page opens, the way banking apps do. Fires once; cancelling simply
  // leaves the user on the form with the biometric button still available.
  const autoPromptedRef = useRef(false);
  useEffect(() => {
    if (
      !autoPromptedRef.current &&
      !biometric.isChecking &&
      biometric.isAvailable &&
      biometric.isEnabled
    ) {
      autoPromptedRef.current = true;
      handleBiometricLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [biometric.isChecking, biometric.isAvailable, biometric.isEnabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    addBreadcrumb('Login attempt', 'auth', { email });

    try {
      const { error: signInError } = await signIn(email.trim(), password);
      if (signInError) {
        setError(friendlySignInError(signInError.message));
        return;
      }
      storageSetSync(LAST_EMAIL_KEY, email.trim());
      if (biometric.isAvailable && !biometric.isEnabled && !biometric.isChecking) {
        pendingCredentials.current = { email: email.trim(), password };
        setShowBiometricPrompt(true);
      } else {
        setShowSuccess(true);
        goAfterSignIn();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBiometricEnable = async () => {
    if (pendingCredentials.current) {
      // ELE-1677 — the user is already signed in at this point. If the secure
      // store refuses the write (Sentry GK: "KeychainError error 0" as an
      // unhandled rejection on this page), record it and carry on to the
      // dashboard rather than leaving the sign-in stuck behind a rejected
      // promise. Settings → Security offers the toggle again.
      try {
        await biometric.enableBiometric(
          pendingCredentials.current.email,
          pendingCredentials.current.password
        );
      } catch (err) {
        captureError(err, { context: 'biometric-enable-after-signin' });
      }
    }
    setShowBiometricPrompt(false);
    pendingCredentials.current = null;
    setShowSuccess(true);
    goAfterSignIn();
  };

  const handleBiometricSkip = () => {
    setShowBiometricPrompt(false);
    pendingCredentials.current = null;
    setShowSuccess(true);
    goAfterSignIn();
  };

  const handleBiometricLogin = async () => {
    setError(null);
    setIsBiometricLoggingIn(true);
    addBreadcrumb('Biometric login attempt', 'auth');
    try {
      const result = await biometric.authenticateWithBiometric();
      if (!result.credentials) {
        if (result.reason === 'credentials_lost') {
          // Typically after an iOS update: identity verified, Keychain entry
          // gone. Biometrics are now off; the next password sign-in offers to
          // turn them back on (ELE-1677).
          setError(
            `${biometric.biometricType} needs setting up again after your phone update. Sign in with your password once and we'll turn it back on.`
          );
        }
        setIsBiometricLoggingIn(false);
        return;
      }
      const credentials = result.credentials;
      const { error: signInError } = await signIn(credentials.email, credentials.password);
      if (signInError) {
        await biometric.disableBiometric();
        setError('Saved credentials are no longer valid. Please sign in with your password.');
      } else {
        setShowSuccess(true);
        goAfterSignIn();
      }
    } catch {
      setError('Biometric sign-in failed. Please use your password.');
    } finally {
      setIsBiometricLoggingIn(false);
    }
  };

  const biometricReady = biometric.isAvailable && biometric.isEnabled;

  return (
    <>
      {/* Signed in — a beat of confirmation, then the dashboard. */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background px-6"
          >
            <div className="w-full max-w-[280px] text-center">
              <p className="text-[28px] font-bold tracking-tight text-white">Welcome back</p>
              <p className="mt-1 text-[14px] text-white">Loading your dashboard</p>
              <div className="mt-6 h-[3px] overflow-hidden rounded-full bg-white/[0.12]">
                <motion.div
                  className="h-full rounded-full bg-elec-yellow"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthFrame>
        <div className="flex flex-1 flex-col lg:flex-none">
          <div className="space-y-5 pt-[6vh] lg:pt-0">
            <AuthHeading title="Welcome back" sub="Sign in to carry on where you left off." />
            {biometricReady && (
              <>
                {/* Biometric is the primary action for returning users — the
                  password form below is the fallback */}
                <button
                  type="button"
                  onClick={() => {
                    haptic.light();
                    void handleBiometricLogin();
                  }}
                  disabled={isBiometricLoggingIn || isSubmitting}
                  className={cn(buttonPrimaryCn, 'flex w-full items-center justify-center')}
                >
                  {isBiometricLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying
                    </>
                  ) : (
                    `Sign in with ${biometric.biometricType}`
                  )}
                </button>
                <p className="text-center text-[13px] text-white">or use your password</p>
              </>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/40 bg-red-500/[0.10] px-4 py-3"
              >
                <p className="text-[13.5px] font-medium text-red-200">{error}</p>
                {error.includes('reset your password') && (
                  <Link
                    to={`/auth/forgot-password?email=${encodeURIComponent(email)}`}
                    className="mt-1 inline-flex h-11 items-center text-[14px] font-semibold text-elec-yellow"
                  >
                    Reset your password
                  </Link>
                )}
              </div>
            )}

            <form id="signin-form" onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="email" className={labelCn}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  inputMode="email"
                  enterKeyHint="next"
                  className={inputCn}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className={cn(labelCn, 'mb-0')}>
                    Password
                  </label>
                  <Link
                    to={`/auth/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                    className="-my-3 py-3 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    autoComplete="current-password"
                    autoCapitalize="none"
                    enterKeyHint="go"
                    className={cn(inputCn, 'pr-16')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-0 top-0 h-11 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || showSuccess}
                onClick={() => haptic.light()}
                className={cn(buttonPrimaryCn, 'flex w-full items-center justify-center')}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>

          <div className="mt-auto space-y-4 pt-10 lg:mt-0 lg:pt-6">
            <div className="flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-white/[0.10]" />
              <span className="text-[12px] font-medium text-white">New to Elec-Mate?</span>
              <span className="h-px flex-1 bg-white/[0.10]" />
            </div>
            <Link
              to="/auth/signup"
              className={cn(buttonSecondaryCn, 'flex w-full items-center justify-center')}
            >
              Create an account
            </Link>
          </div>
        </div>
      </AuthFrame>

      <BiometricPromptSheet
        open={showBiometricPrompt}
        biometricType={biometric.biometricType}
        onEnable={handleBiometricEnable}
        onSkip={handleBiometricSkip}
      />
    </>
  );
};

export default SignIn;
