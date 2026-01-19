import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Zap, CheckCircle2, AlertTriangle, Mail, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

type VerificationState = 'verifying' | 'success' | 'error';

const ConfirmEmail = () => {
  const [state, setState] = useState<VerificationState>('verifying');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [generatedElecId, setGeneratedElecId] = useState<string | null>(null);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  // Countdown timer for resend cooldown (same as CheckEmail)
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Cleanup redirect timeout on unmount
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!tokenHash || type !== 'signup') {
        setState('error');
        setErrorMessage('Invalid or missing confirmation link. Please request a new one.');
        return;
      }

      try {
        // Verify the signup token
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'signup',
        });

        if (error) {
          console.error('Email verification error:', error);
          setState('error');
          if (error.message.includes('expired')) {
            setErrorMessage('This confirmation link has expired. Please request a new one.');
          } else if (error.message.includes('already')) {
            setErrorMessage('This email has already been confirmed. You can sign in now.');
          } else {
            setErrorMessage(error.message || 'Verification failed. Please try again.');
          }
          return;
        }

        // Email verified successfully!
        setState('success');

        // Run post-confirmation tasks in background
        if (data?.user) {
          runPostConfirmationTasks(data.user.id, data.user.email || '');
        }

        // Show "Continue" button after 2s for users who want to proceed immediately
        setTimeout(() => {
          setShowContinueButton(true);
        }, 2000);

        // Auto-redirect to dashboard after 5s (extended from 3.5s)
        redirectTimeoutRef.current = setTimeout(() => {
          // Clear localStorage items
          localStorage.removeItem('elec-mate-pending-email');
          localStorage.removeItem('elec-mate-pending-name');
          navigate('/dashboard');
        }, 5000);
      } catch (err: any) {
        console.error('Email verification exception:', err);
        setState('error');
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    };

    verifyEmail();
  }, [tokenHash, type, navigate]);

  // Handler for manual navigation (Continue button)
  const handleContinueToDashboard = () => {
    // Cancel the auto-redirect timeout
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
    // Clear localStorage items
    localStorage.removeItem('elec-mate-pending-email');
    localStorage.removeItem('elec-mate-pending-name');
    navigate('/dashboard');
  };

  const runPostConfirmationTasks = async (userId: string, email: string) => {
    try {
      // 1. Get stored onboarding data (with safe JSON parse)
      const onboardingDataRaw = localStorage.getItem('elec-mate-onboarding');
      const pendingElecIdRaw = localStorage.getItem('elec-mate-pending-elecid');
      const fullName = localStorage.getItem('elec-mate-pending-name') || '';

      // 2. Apply onboarding data to profile (with safe JSON.parse)
      if (onboardingDataRaw) {
        let parsed = null;
        try {
          parsed = JSON.parse(onboardingDataRaw);
        } catch (parseError) {
          console.error('Corrupted onboarding data, clearing:', parseError);
          localStorage.removeItem('elec-mate-onboarding');
        }

        if (parsed) {
          try {
            await supabase
              .from('profiles')
              .update({
                role: parsed.role,
                ecs_card_type: parsed.ecsCardType || null,
                elec_id_enabled: parsed.createElecId || false,
                onboarding_completed: true,
                updated_at: new Date().toISOString(),
              })
              .eq('id', userId);

            console.log('Profile updated with onboarding data');
            localStorage.removeItem('elec-mate-onboarding');
          } catch (updateError) {
            console.error('Error updating profile:', updateError);
          }
        }
      }

      // 3. Generate Elec-ID if user opted for it (with safe JSON.parse)
      if (pendingElecIdRaw) {
        let elecIdData = null;
        try {
          elecIdData = JSON.parse(pendingElecIdRaw);
        } catch (parseError) {
          console.error('Corrupted elec-id data, clearing:', parseError);
          localStorage.removeItem('elec-mate-pending-elecid');
        }

        if (elecIdData?.createElecId) {
          try {
            const { data: elecIdResult } = await supabase.functions.invoke('generate-elec-id', {
              body: {
                user_id: userId,
                ecs_card_type: elecIdData.ecsCardType || null
              }
            });
            if (elecIdResult?.elec_id_number) {
              setGeneratedElecId(elecIdResult.elec_id_number);
              console.log('Elec-ID generated:', elecIdResult.elec_id_number);
            }
          } catch (elecIdError) {
            console.error('Error generating Elec-ID:', elecIdError);
          }
        }
        localStorage.removeItem('elec-mate-pending-elecid');
      }

      // 4. Send welcome email (non-blocking)
      supabase.functions.invoke('send-welcome-email', {
        body: {
          userId: userId,
          email: email,
          fullName: fullName,
        },
      }).then(() => {
        console.log('Welcome email sent');
      }).catch((emailErr) => {
        console.warn('Welcome email failed (non-critical):', emailErr);
      });

    } catch (error) {
      console.error('Error in post-confirmation tasks:', error);
    }
  };

  const handleResendEmail = async () => {
    // Prevent resend if cooldown is active
    if (resendCooldown > 0) return;

    const email = localStorage.getItem('elec-mate-pending-email');
    const fullName = localStorage.getItem('elec-mate-pending-name');

    if (!email) {
      setErrorMessage('Please sign up again to receive a new confirmation email.');
      return;
    }

    setIsResending(true);
    try {
      const { error } = await supabase.functions.invoke('send-confirmation-email', {
        body: { email, fullName: fullName || '' },
      });

      if (error) {
        setErrorMessage('Failed to resend email. Please try again.');
      } else {
        setResendSuccess(true);
        setResendCooldown(60); // 60 second cooldown (same as CheckEmail)
      }
    } catch {
      setErrorMessage('Failed to resend email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col pt-safe pb-safe">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-card rounded-full blur-[120px] opacity-30 pointer-events-none" />

      {/* Header */}
      <header className="relative w-full px-4 pt-6 pb-4 sm:pt-8">
        <Link to="/" className="flex items-center justify-center gap-2 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-400 flex items-center justify-center transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            Elec-<span className="text-yellow-400">Mate</span>
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Card */}
          <Card className="border-white/10 bg-neutral-900 shadow-xl">
            <CardContent className="pt-6 pb-6">
              {/* Verifying State */}
              {state === 'verifying' && (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-5">
                    <Loader2 className="h-10 w-10 animate-spin text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Verifying your email...</h3>
                  <p className="text-gray-300 text-sm">
                    Please wait while we confirm your account
                  </p>
                </div>
              )}

              {/* Success State */}
              {state === 'success' && (
                <div className="text-center py-6 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Email confirmed!</h3>
                  <p className="text-gray-300 text-sm mb-5">
                    Your account is now active. Welcome to Elec-Mate!
                  </p>

                  {/* Show Elec-ID if generated */}
                  {generatedElecId && (
                    <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30 mb-5 animate-fade-in">
                      <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-medium">Your Elec-ID is ready!</span>
                      </div>
                      <p className="text-xl font-bold text-yellow-400">{generatedElecId}</p>
                    </div>
                  )}

                  {/* Continue button (appears after 2s) or auto-redirect indicator */}
                  {showContinueButton ? (
                    <Button
                      onClick={handleContinueToDashboard}
                      className="w-full h-12 text-base font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 hover:scale-[1.02]"
                    >
                      Continue to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  ) : (
                    <>
                      <p className="text-gray-400 text-sm mb-4">
                        Redirecting to your dashboard...
                      </p>
                      <div className="flex justify-center">
                        <Loader2 className="h-5 w-5 animate-spin text-yellow-400" />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Error State */}
              {state === 'error' && (
                <div className="text-center py-6 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
                    <AlertTriangle className="h-10 w-10 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Verification failed</h3>
                  <p className="text-gray-300 text-sm mb-6">
                    {errorMessage}
                  </p>

                  {resendSuccess ? (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 mb-5 animate-fade-in">
                      <div className="flex items-center gap-2 justify-center text-green-400">
                        <Mail className="h-5 w-5" />
                        <span className="text-sm font-medium">New email sent! Check your inbox.</span>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={handleResendEmail}
                      disabled={isResending || resendCooldown > 0}
                      className="w-full h-12 text-base font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 mb-5"
                    >
                      {isResending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : resendCooldown > 0 ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Resend in {resendCooldown}s
                        </>
                      ) : (
                        'Resend confirmation email'
                      )}
                    </Button>
                  )}

                  <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                    <Link
                      to="/auth/signup"
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      Sign up again
                    </Link>
                    <Link
                      to="/auth/signin"
                      className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
                    >
                      Already confirmed? Sign in
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative px-4 pb-6">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              Secure verification
            </span>
            <span>·</span>
            <span>UK based</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConfirmEmail;
