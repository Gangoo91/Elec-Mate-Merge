import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import BiometricPromptSheet from '@/components/auth/BiometricPromptSheet';
import { useAuth } from '@/contexts/AuthContext';
import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import { useUserCount } from '@/hooks/useUserCount';
import { cn } from '@/lib/utils';
import { addBreadcrumb } from '@/lib/sentry';

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showBiometricPrompt, setShowBiometricPrompt] = useState(false);
  const [isBiometricLoggingIn, setIsBiometricLoggingIn] = useState(false);
  const userCount = useUserCount();

  const pendingCredentials = useRef<{ email: string; password: string } | null>(null);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const biometric = useBiometricAuth();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam && !email) setEmail(emailParam);
  }, [searchParams, email]);

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
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message);
      } else if (biometric.isAvailable && !biometric.isEnabled && !biometric.isChecking) {
        pendingCredentials.current = { email, password };
        setShowBiometricPrompt(true);
      } else {
        setShowSuccess(true);
        setTimeout(() => navigate('/dashboard'), 800);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBiometricEnable = async () => {
    if (pendingCredentials.current) {
      await biometric.enableBiometric(
        pendingCredentials.current.email,
        pendingCredentials.current.password
      );
    }
    setShowBiometricPrompt(false);
    pendingCredentials.current = null;
    setShowSuccess(true);
    setTimeout(() => navigate('/dashboard'), 800);
  };

  const handleBiometricSkip = () => {
    setShowBiometricPrompt(false);
    pendingCredentials.current = null;
    setShowSuccess(true);
    setTimeout(() => navigate('/dashboard'), 800);
  };

  const handleBiometricLogin = async () => {
    setError(null);
    setIsBiometricLoggingIn(true);
    addBreadcrumb('Biometric login attempt', 'auth');
    try {
      const credentials = await biometric.authenticateWithBiometric();
      if (!credentials) {
        setIsBiometricLoggingIn(false);
        return;
      }
      const { error: signInError } = await signIn(credentials.email, credentials.password);
      if (signInError) {
        await biometric.disableBiometric();
        setError('Saved credentials are no longer valid. Please sign in with your password.');
      } else {
        setShowSuccess(true);
        setTimeout(() => navigate('/dashboard'), 800);
      }
    } catch {
      setError('Biometric sign-in failed. Please use your password.');
    } finally {
      setIsBiometricLoggingIn(false);
    }
  };

  return (
    <div className="min-h-[100svh] bg-black">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
            style={{
              paddingTop: 'env(safe-area-inset-top, 0px)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            <div className="flex flex-col items-center gap-7">
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full bg-green-500/40 blur-3xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-500 shadow-[0_0_40px_rgba(34,197,94,0.5)]">
                  <Check className="h-12 w-12 text-white" strokeWidth={3} />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-[26px] font-bold tracking-tight text-white">Welcome back</p>
                <p className="mt-1.5 text-sm text-white">Loading your dashboard…</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto grid min-h-[100svh] max-w-[1120px] items-stretch px-6 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[env(safe-area-inset-top)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-8">
        <div className="hidden lg:flex lg:flex-col lg:justify-between lg:py-10">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Elec-Mate" className="h-11 w-11 rounded-xl object-cover" />
              <span className="text-[22px] font-bold tracking-tight text-white">
                Elec-<span className="text-yellow-400">Mate</span>
              </span>
            </Link>

            <div className="mt-16 max-w-[30rem]">
              <h1 className="text-[4rem] font-bold leading-[1.02] tracking-[-0.045em] text-white">
                Welcome <span className="text-yellow-400">back.</span>
              </h1>
              <p className="mt-6 max-w-[24rem] text-lg leading-[1.65] text-white/68">
                Quotes, certificates, training, AI and every core workflow are already waiting in
                the same place.
              </p>
            </div>
          </div>

          <div className="grid gap-5 border-t border-white/10 pt-6 text-sm leading-7 text-white/68">
            <div>{userCount} electricians already live on Elec-Mate.</div>
            <div>Secure sign-in with password, with biometric sign-in where available.</div>
            <div>Need an account? Start a 7-day free trial with no charge for 7 days.</div>
          </div>
        </div>

        <div className="flex flex-col justify-start py-5 lg:justify-center lg:py-10">
          <div className="mx-auto w-full max-w-[430px]">
            <div className="mb-6 flex items-center justify-center gap-3 lg:mb-10 lg:hidden">
              <img src="/logo.jpg" alt="" className="h-10 w-10 rounded-xl object-cover" />
              <span className="text-[20px] font-bold tracking-tight text-white">
                Elec-<span className="text-yellow-400">Mate</span>
              </span>
            </div>

            <div>
              <h2 className="text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.25rem] lg:text-[2.75rem]">
                Sign in and <span className="text-yellow-400">carry on.</span>
              </h2>
              <p className="mt-3 max-w-[26rem] text-[14px] leading-[1.6] text-white lg:mt-4 lg:text-[15px] lg:leading-[1.7]">
                No clutter. Just the fastest route back into your account.
              </p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-7 overflow-hidden"
                >
                  <p className="border-y border-red-500/15 bg-red-500/8 px-3 py-3 text-[13px] text-red-400">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {biometric.isAvailable && biometric.isEnabled && (
              <button
                type="button"
                onClick={handleBiometricLogin}
                disabled={isBiometricLoggingIn || isSubmitting}
                className="mt-6 h-12 w-full touch-manipulation rounded-2xl border border-white/[0.12] bg-white/[0.04] px-5 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] lg:mt-8"
              >
                {isBiometricLoggingIn ? 'Verifying...' : `Sign in with ${biometric.biometricType}`}
              </button>
            )}

            {biometric.isAvailable && biometric.isEnabled && (
              <div className="my-5 flex items-center gap-3 lg:my-6">
                <div className="h-px flex-1 bg-white/[0.10]" />
                <span className="text-[13px] font-medium text-white">or</span>
                <div className="h-px flex-1 bg-white/[0.10]" />
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 lg:mt-8 lg:space-y-5">
              <div>
                <label className="block text-[13px] font-medium text-white">Email</label>
                <div className="relative mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={cn(
                      'h-12 w-full touch-manipulation rounded-2xl border bg-white/[0.04] px-5 pr-11 text-[16px] text-white placeholder:text-white/38 outline-none transition-all duration-150 [color-scheme:dark] focus:outline-none lg:h-14',
                      focusedField === 'email'
                        ? 'border-yellow-400/70 bg-white/[0.06] ring-2 ring-yellow-400/20'
                        : 'border-white/[0.12] hover:border-white/[0.22]'
                    )}
                  />
                  {isEmailValid && email.length > 0 && (
                    <CheckCircle2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-400" />
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-[13px] font-medium text-white">Password</label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-[13px] font-medium text-yellow-400 transition-colors hover:text-yellow-300"
                  >
                    Forgot password
                  </Link>
                </div>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className={cn(
                      'h-12 w-full touch-manipulation rounded-2xl border bg-white/[0.04] px-5 pr-12 text-[16px] text-white placeholder:text-white/38 outline-none transition-all duration-150 [color-scheme:dark] focus:outline-none lg:h-14',
                      focusedField === 'password'
                        ? 'border-yellow-400/70 bg-white/[0.06] ring-2 ring-yellow-400/20'
                        : 'border-white/[0.12] hover:border-white/[0.22]'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-lg text-white transition-colors hover:bg-white/[0.06] hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || showSuccess}
                className="mt-2 h-12 w-full touch-manipulation rounded-2xl bg-yellow-500 text-[15px] font-semibold text-black transition-all duration-150 hover:bg-yellow-400 disabled:opacity-50 lg:mt-3 lg:h-14"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[12px] text-white lg:mt-8">
              <span>
                <span className="font-semibold text-yellow-400">{userCount}</span> electricians live
              </span>
              <span>No charge for 7 days on new accounts</span>
            </div>

            <div className="mt-4 text-center lg:mt-5 lg:text-left">
              <Link
                to="/auth/signup"
                className="text-[14px] font-medium text-white transition-colors hover:text-yellow-400"
              >
                Need an account?{' '}
                <span className="font-semibold text-yellow-400">Start a 7-day free trial.</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BiometricPromptSheet
        open={showBiometricPrompt}
        biometricType={biometric.biometricType}
        onEnable={handleBiometricEnable}
        onSkip={handleBiometricSkip}
      />
    </div>
  );
};

export default SignIn;
