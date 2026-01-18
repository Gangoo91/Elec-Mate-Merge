import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Zap, Mail, CheckCircle2, RefreshCw } from 'lucide-react';

const CheckEmail = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [fullName, setFullName] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Get email from localStorage (set during signup)
    const storedEmail = localStorage.getItem('elec-mate-pending-email');
    const storedName = localStorage.getItem('elec-mate-pending-name');

    if (!storedEmail) {
      // No pending email, redirect to signup
      navigate('/auth/signup');
      return;
    }

    setEmail(storedEmail);
    setFullName(storedName);
  }, [navigate]);

  useEffect(() => {
    // Countdown timer for resend cooldown
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    if (!email || resendCooldown > 0) return;

    setIsResending(true);
    setResendSuccess(false);

    try {
      const { error } = await supabase.functions.invoke('send-confirmation-email', {
        body: { email, fullName: fullName || '' },
      });

      if (error) {
        console.error('Resend error:', error);
      } else {
        setResendSuccess(true);
        setResendCooldown(60); // 60 second cooldown
      }
    } catch (err) {
      console.error('Resend exception:', err);
    } finally {
      setIsResending(false);
    }
  };

  // Mask email for display
  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    if (local.length <= 2) return email;
    const masked = local[0] + '*'.repeat(Math.min(local.length - 2, 5)) + local[local.length - 1];
    return `${masked}@${domain}`;
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
          {/* Header text */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
              Check your inbox
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              We've sent you a confirmation email
            </p>
          </div>

          {/* Card */}
          <Card className="border-white/10 bg-neutral-900 shadow-xl">
            <CardContent className="pt-6 pb-6">
              <div className="text-center py-4">
                {/* Mail Icon */}
                <div className="w-20 h-20 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-10 w-10 text-yellow-400" />
                </div>

                {/* Email display */}
                {email && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-1">We sent an email to</p>
                    <p className="text-white font-medium text-lg">{maskEmail(email)}</p>
                  </div>
                )}

                {/* Instructions */}
                <div className="space-y-3 text-sm text-gray-300 mb-6">
                  <p>Click the link in the email to confirm your account.</p>
                  <p className="text-gray-400">
                    Can't find it? Check your spam folder.
                  </p>
                </div>

                {/* Resend button */}
                {resendSuccess ? (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 mb-5 animate-fade-in">
                    <div className="flex items-center gap-2 justify-center text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Email sent! Check your inbox.</span>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={handleResendEmail}
                    disabled={isResending || resendCooldown > 0}
                    variant="outline"
                    className="w-full h-12 text-base font-medium border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-white/30 transition-all duration-200 disabled:opacity-50 mb-5"
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
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Resend email
                      </>
                    )}
                  </Button>
                )}

                {/* Alternative actions */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <Link
                    to="/auth/signin"
                    className="block text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
                  >
                    Already confirmed? Sign in
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="block text-sm text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    Use a different email
                  </Link>
                </div>
              </div>
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
              Secure signup
            </span>
            <span>·</span>
            <span>BS7671 compliant</span>
            <span>·</span>
            <span>UK based</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckEmail;
