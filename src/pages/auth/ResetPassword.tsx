import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';
import { AuthFrame, AuthHeading } from '@/components/auth/AuthFrame';
import { inputCn, labelCn, buttonPrimaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { isAndroidNative } from '@/lib/textEntry';

type TokenState = 'verifying' | 'valid' | 'invalid';

const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: '8+ characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'upper case', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'lower case', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'a number', test: (p: string) => /[0-9]/.test(p) },
];

// Turn Supabase's raw auth errors into plain, reassuring guidance. The breached
// -password check (HaveIBeenPwned) fires server-side even when every chip above
// is green, so the message must explain *why* rather than read as a failure.
const friendlyResetError = (message: string): string => {
  const m = (message || '').toLowerCase();
  if (
    m.includes('weak') ||
    m.includes('pwned') ||
    m.includes('breach') ||
    m.includes('compromis')
  ) {
    return "This password has appeared in a known online data breach, so it isn't safe to use. Please choose one you haven't used anywhere else.";
  }
  if (
    m.includes('should be different') ||
    m.includes('same as') ||
    m.includes('new password should')
  ) {
    return 'Your new password needs to be different from your old one.';
  }
  if (
    m.includes('expired') ||
    m.includes('invalid') ||
    m.includes('session') ||
    m.includes('jwt') ||
    m.includes('not authenticated') ||
    m.includes('auth session missing')
  ) {
    return 'Your reset link has expired. Please request a new one and try again.';
  }
  return message || 'Something went wrong. Please request a new reset link and try again.';
};

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenState, setTokenState] = useState<TokenState>('verifying');
  const [tokenError, setTokenError] = useState<string | null>(null);
  const haptic = useHaptic();

  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  useEffect(() => {
    const verifyToken = async () => {
      if (!tokenHash || type !== 'recovery') {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setTokenState('valid');
          return;
        }
        setTokenState('invalid');
        setTokenError('Invalid or missing reset link. Please request a new password reset.');
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery',
        });

        if (error) {
          setTokenState('invalid');
          setTokenError(
            error.message.includes('expired')
              ? 'This reset link has expired. Please request a new one.'
              : 'Invalid reset link. Please request a new one.'
          );
          return;
        }
        setTokenState('valid');
      } catch {
        setTokenState('invalid');
        setTokenError('An error occurred. Please request a new password reset.');
      }
    };

    verifyToken();
  }, [tokenHash, type]);

  const allRequirementsMet = PASSWORD_REQUIREMENTS.every((req) => req.test(password));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet) {
      setError(
        'Your password needs 8+ characters, an upper-case letter, a lower-case letter and a number.'
      );
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const { error } = await updatePassword(password);
      if (error) {
        setError(friendlyResetError(error.message));
      } else {
        setIsSuccess(true);
        setTimeout(() => navigate('/auth/signin'), 2500);
      }
    } catch (err: unknown) {
      setError(friendlyResetError(err instanceof Error ? err.message : ''));
    } finally {
      setIsSubmitting(false);
    }
  };

  const expiredError = !!error && error.toLowerCase().includes('expired');

  return (
    <AuthFrame back="/auth/signin">
      {tokenState === 'verifying' && (
        <div className="space-y-5">
          <AuthHeading title="Checking your link" />
          <p className="text-[14px] text-white">One moment while we check your reset link.</p>
          <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.12]">
            <motion.div
              className="h-full w-1/3 rounded-full bg-elec-yellow"
              animate={{ x: ['-100%', '300%'] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}

      {tokenState === 'invalid' && (
        <div className="space-y-5">
          <AuthHeading title="This reset link can't be used" />
          <p className="text-[14px] leading-relaxed text-white">{tokenError}</p>
          <p className="text-[13px] text-white">
            Reset links only work once. Request a new one and use the latest email.
          </p>
          <Link
            to="/auth/forgot-password"
            className={cn(buttonPrimaryCn, 'flex w-full items-center justify-center')}
          >
            Request a new link
          </Link>
        </div>
      )}

      {tokenState === 'valid' && isSuccess && (
        <div className="space-y-5">
          <AuthHeading title="Password updated" />
          <p className="text-[14px] leading-relaxed text-white">
            You can sign in with your new password now. Taking you there…
          </p>
          <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.12]">
            <motion.div
              className="h-full rounded-full bg-elec-yellow"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'linear' }}
            />
          </div>
          <Link
            to="/auth/signin"
            className={cn(buttonPrimaryCn, 'flex w-full items-center justify-center')}
          >
            Sign in now
          </Link>
        </div>
      )}

      {tokenState === 'valid' && !isSuccess && (
        <div className="space-y-5">
          <AuthHeading title="Choose a new password" />
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-400/40 bg-red-500/[0.10] px-4 py-3"
            >
              <p className="text-[13.5px] font-medium text-red-200">{error}</p>
              {expiredError && (
                <Link
                  to="/auth/forgot-password"
                  className="mt-1 inline-flex h-11 items-center text-[14px] font-semibold text-elec-yellow"
                >
                  Request a new link
                </Link>
              )}
            </div>
          )}
          <form id="reset-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="new-password" className={labelCn}>
              New password
            </label>
            <div className="relative">
              {/* type="text" + pw-masked, not type="password": the dots
                    misbehaved on iOS Safari (14be2738e). Keep it — except on
                    native Android, where a masked text field would let Gboard
                    learn the password as a word (ELE-1802). */}
              <input
                id="new-password"
                type={isAndroidNative && !showPassword ? 'password' : 'text'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a new password"
                autoComplete="new-password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="done"
                className={cn(inputCn, 'pr-16', !showPassword && !isAndroidNative && 'pw-masked')}
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
            <p className="mt-2 text-[12px] leading-relaxed text-white" aria-live="polite">
              {PASSWORD_REQUIREMENTS.map((req, i) => (
                <span key={req.id}>
                  {i > 0 && ' · '}
                  <span
                    className={cn(
                      'transition-colors',
                      req.test(password) ? 'font-semibold text-elec-yellow' : 'text-white'
                    )}
                  >
                    {req.label}
                  </span>
                </span>
              ))}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => haptic.light()}
              className={cn(buttonPrimaryCn, 'mt-5 flex w-full items-center justify-center')}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating password
                </>
              ) : (
                'Update password'
              )}
            </button>
          </form>
          <p className="text-[13px] leading-relaxed text-white">
            We also check new passwords against known data breaches, so pick one you haven't used
            anywhere else.
          </p>
        </div>
      )}
    </AuthFrame>
  );
};

export default ResetPassword;
