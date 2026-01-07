import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IOSInput } from '@/components/ui/ios-input';
import { Loader2, AlertTriangle, Zap, Mail, Lock, ArrowRight, CheckCircle2, RefreshCw, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailNotConfirmedError, setIsEmailNotConfirmedError] = useState(false);

  const { signIn, resendConfirmationEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsEmailNotConfirmedError(false);
      return;
    }

    setError(null);
    setIsEmailNotConfirmedError(false);
    setIsSubmitting(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        if (error.message && error.message.toLowerCase().includes('email not confirmed')) {
          setIsEmailNotConfirmedError(true);
        } else {
          setError(error.message);
        }
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setIsResending(true);
    setResendSuccess(false);

    try {
      const { error } = await resendConfirmationEmail(email);
      if (!error) {
        setResendSuccess(true);
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col safe-top safe-bottom">
      {/* Background effects - subtle */}
      <div className="fixed inset-0 bg-gradient-to-b from-elec-yellow/5 via-transparent to-transparent pointer-events-none" />

      {/* Header - iOS style with back button */}
      <header className="relative w-full px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          {/* Back button */}
          <Link
            to="/"
            className="flex items-center gap-1 text-elec-yellow ios-pressable p-2 -ml-2 rounded-xl"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-ios-body font-medium">Home</span>
          </Link>

          {/* Logo - centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-elec-yellow flex items-center justify-center">
              <Zap className="h-4 w-4 text-black" />
            </div>
          </div>

          {/* Spacer for alignment */}
          <div className="w-16" />
        </div>
      </header>

      {/* Main content - vertically centered */}
      <main className="relative flex-1 flex flex-col justify-center px-6 py-8">
        <div className="w-full max-w-sm mx-auto ios-stagger-children">
          {/* Welcome text - iOS style */}
          <div className="text-center mb-8">
            <h1 className="text-ios-title-1 text-white mb-2">Welcome back</h1>
            <p className="text-ios-body text-white/60">Sign in to continue</p>
          </div>

          {/* Form card - iOS elevated style */}
          <Card variant="ios-elevated" className="p-6">
            <CardContent className="p-0">
              {/* Error states */}
              {isEmailNotConfirmedError && (
                <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 animate-ios-scale-in">
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-amber-400 text-ios-subhead">Email not confirmed</p>
                      <p className="text-ios-caption-1 text-white/50 mt-1 mb-3">
                        Check your inbox and click the confirmation link.
                      </p>
                      {resendSuccess ? (
                        <p className="text-ios-caption-1 text-green-400 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Confirmation email sent!
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendConfirmation}
                          disabled={isResending}
                          className="text-ios-caption-1 text-elec-yellow flex items-center gap-2 disabled:opacity-50 font-medium ios-pressable"
                        >
                          {isResending ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4" />
                              Resend confirmation
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {error && !isEmailNotConfirmedError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 animate-ios-scale-in">
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20 flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <p className="text-ios-subhead text-red-400 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Form - iOS style with left-aligned labels */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <IOSInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  icon={<Mail className="h-5 w-5" />}
                />

                <IOSInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  icon={<Lock className="h-5 w-5" />}
                />

                {/* Forgot password link */}
                <div className="flex justify-end">
                  <Link
                    to="/auth/forgot-password"
                    className="text-ios-footnote text-elec-yellow font-medium ios-pressable"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign in button */}
                <Button
                  type="submit"
                  variant="ios-primary"
                  size="ios-large"
                  className="w-full mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sign up prompt - iOS style */}
          <div className="mt-8 text-center">
            <p className="text-ios-footnote text-white/50 mb-4">
              New to Elec-Mate?
            </p>
            <Link to="/auth/signup" className="block">
              <Button
                variant="ios-secondary"
                size="ios-default"
                className="w-full"
              >
                Create Account
                <span className="ml-2 px-2 py-0.5 text-ios-caption-2 bg-elec-yellow/20 text-elec-yellow rounded-full">
                  7 days free
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer - keeping it, iOS style */}
      <footer className="relative px-6 pb-6">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-4 text-ios-caption-1 text-white/40">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              Secure
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>BS7671</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>UK based</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
