import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import { AuthFrame, AuthHeading } from '@/components/auth/AuthFrame';
import {
  inputCn,
  labelCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';

/**
 * Forgot password — on the sign-up shell (Volt certificate shell, no icons).
 * Sign-in passes ?email= so nobody types their address twice.
 */
const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const haptic = useHaptic();

  const { resetPassword } = useAuth();

  const send = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter the email address you signed up with.');
      return false;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        setError(error.message);
        return false;
      }
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await send()) setIsSuccess(true);
  };

  const errorBox = error ? (
    <div role="alert" className="rounded-xl border border-red-400/40 bg-red-500/[0.10] px-4 py-3">
      <p className="text-[13.5px] font-medium text-red-200">{error}</p>
    </div>
  ) : null;

  return (
    <AuthFrame back="/auth/signin">
      {!isSuccess ? (
        <div className="space-y-5">
          <AuthHeading
            title="Reset your password"
            sub="Enter the email you use for Elec-Mate and we'll send you a link to set a new one."
          />
          {errorBox}
          <form id="forgot-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="email" className={labelCn}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              inputMode="email"
              enterKeyHint="send"
              className={inputCn}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => haptic.light()}
              className={cn(buttonPrimaryCn, 'mt-5 flex w-full items-center justify-center')}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
                </>
              ) : (
                'Send reset link'
              )}
            </button>
          </form>
          <p className="border-t border-white/[0.08] pt-3 text-[13px] text-white">
            Remembered it?{' '}
            <Link
              to="/auth/signin"
              className="inline-flex h-11 items-center font-semibold text-elec-yellow"
            >
              Sign in
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <AuthHeading title="Check your inbox" />
          <p className="text-[14px] leading-relaxed text-white">
            We've sent a reset link to{' '}
            <span className="font-semibold text-elec-yellow">{email}</span>. Open it to set a new
            password.
          </p>
          <p className="text-[13px] text-white">
            Nothing after a few minutes? Check your spam or junk folder.
          </p>
          {errorBox}
          <div className="flex gap-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={async () => {
                haptic.light();
                if (await send()) setResent(true);
              }}
              className={cn(buttonSecondaryCn, 'flex-1')}
            >
              {resent ? 'Sent again' : 'Resend link'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setResent(false);
                setError(null);
              }}
              className={cn(buttonSecondaryCn, 'flex-1')}
            >
              Use a different email
            </button>
          </div>
          <Link
            to="/auth/signin"
            className={cn(buttonPrimaryCn, 'flex w-full items-center justify-center')}
          >
            Back to sign in
          </Link>
        </div>
      )}
    </AuthFrame>
  );
};

export default ForgotPassword;
