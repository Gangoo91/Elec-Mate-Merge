import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Fingerprint,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { addBreadcrumb } from '@/lib/sentry';
import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import BiometricPromptSheet from '@/components/auth/BiometricPromptSheet';
import { supabase } from '@/integrations/supabase/client';

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
  const [userCount, setUserCount] = useState('500+');

  const pendingCredentials = useRef<{ email: string; password: string } | null>(null);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const biometric = useBiometricAuth();

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .then(({ count }) => {
        if (count && count > 0) setUserCount(`${Math.floor(count / 10) * 10}+`);
      });
  }, []);

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
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
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
      const { error } = await signIn(credentials.email, credentials.password);
      if (error) {
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
    <div className="min-h-[100svh] bg-black flex flex-col">
      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black/95 z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-[17px] text-white font-semibold">Welcome back</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content — vertically centred */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 pt-[calc(env(safe-area-inset-top)+48px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
        <div className="w-full max-w-[340px] mx-auto">
          {/* Logo + wordmark */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <img src="/logo.jpg" alt="" className="w-10 h-10 rounded-xl object-cover" />
            <span className="text-[20px] font-bold tracking-tight">
              <span className="text-elec-yellow">Elec-</span>
              <span className="text-white">Mate</span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="mb-8"
          >
            <h1 className="text-[24px] font-semibold text-white tracking-tight text-center">
              Sign in to your account
            </h1>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 overflow-hidden"
              >
                <p className="text-[13px] text-red-400 bg-red-500/8 border border-red-500/15 rounded-lg px-3.5 py-2.5 text-center">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Biometric */}
          {biometric.isAvailable && biometric.isEnabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <button
                type="button"
                onClick={handleBiometricLogin}
                disabled={isBiometricLoggingIn || isSubmitting}
                className="w-full h-12 rounded-xl text-[14px] font-medium bg-white/[0.05] border border-white/[0.08] text-white hover:bg-white/[0.10] transition-all duration-150 touch-manipulation flex items-center justify-center gap-2 mb-4"
              >
                {isBiometricLoggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                  </>
                ) : (
                  <>
                    <Fingerprint className="h-4.5 w-4.5 text-elec-yellow" /> Sign in with{' '}
                    {biometric.biometricType}
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/[0.10]" />
                <span className="text-[11px] text-white uppercase tracking-widest font-medium">
                  or
                </span>
                <div className="flex-1 h-px bg-white/[0.10]" />
              </div>
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-white mb-1.5 ml-0.5 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail
                  className={cn(
                    'absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] transition-colors duration-150',
                    focusedField === 'email' ? 'text-elec-yellow' : 'text-white'
                  )}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={cn(
                    'w-full h-12 pl-11 pr-10 rounded-xl text-[15px] text-white placeholder:text-white',
                    'bg-white/[0.10] outline-none transition-all duration-150 [color-scheme:dark]',
                    focusedField === 'email'
                      ? 'ring-1 ring-elec-yellow/40 bg-white/[0.10]'
                      : 'ring-1 ring-white/20 hover:ring-white/30'
                  )}
                />
                {isEmailValid && email.length > 0 && (
                  <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-green-400/70" />
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-0.5">
                <label className="block text-[12px] font-medium text-white uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-[12px] text-elec-yellow/70 hover:text-elec-yellow font-medium transition-colors touch-manipulation"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  className={cn(
                    'absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] transition-colors duration-150',
                    focusedField === 'password' ? 'text-elec-yellow' : 'text-white'
                  )}
                />
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className={cn(
                    'w-full h-12 pl-11 pr-11 rounded-xl text-[15px] text-white placeholder:text-white',
                    'bg-white/[0.10] outline-none transition-all duration-150 [color-scheme:dark]',
                    !showPassword && 'pw-masked',
                    focusedField === 'password'
                      ? 'ring-1 ring-elec-yellow/40 bg-white/[0.10]'
                      : 'ring-1 ring-white/20 hover:ring-white/30'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-lg text-white hover:text-white transition-colors touch-manipulation"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting || showSuccess}
                className={cn(
                  'w-full h-12 rounded-xl text-[15px] font-semibold',
                  'bg-elec-yellow hover:bg-elec-yellow/90 text-black',
                  'shadow-[0_1px_20px_rgba(250,204,21,0.15)] transition-all duration-150',
                  'active:scale-[0.98] disabled:opacity-50'
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    Sign in <ArrowRight className="ml-1.5 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.form>

          {/* Separator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 mb-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/[0.10]" />
              <span className="text-[11px] text-white uppercase tracking-widest font-medium">
                new here?
              </span>
              <div className="flex-1 h-px bg-white/[0.10]" />
            </div>
          </motion.div>

          {/* Sign up link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <Link to="/auth/signup" className="block">
              <button className="w-full h-12 rounded-xl text-[14px] font-medium bg-transparent border border-white/[0.08] text-white hover:bg-white/[0.10] transition-all duration-150 touch-manipulation flex items-center justify-center gap-2">
                Create an account
                <span className="text-[10px] font-semibold text-elec-yellow bg-elec-yellow/10 px-2 py-0.5 rounded-full">
                  7 days free
                </span>
              </button>
            </Link>
          </motion.div>

          {/* Social proof — subtle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[11px] text-white text-center mt-6 flex items-center justify-center gap-1.5"
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500/50" />
            {userCount} electricians use Elec-Mate
          </motion.p>
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
