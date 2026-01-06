import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Zap, Mail, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        setError(error.message);
      } else {
        setIsSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
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
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Reset password</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {isSuccess
                ? "Check your email for the reset link"
                : "Enter your email and we'll send you a reset link"
              }
            </p>
          </div>

          {/* Card */}
          <Card className="border-white/10 bg-neutral-900 shadow-xl transition-all duration-300 hover:border-yellow-400/20">
            <CardContent className="pt-6">
              {isSuccess ? (
                <div className="text-center py-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Check your inbox</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    We've sent a password reset link to <span className="text-white">{email}</span>
                  </p>
                  <p className="text-gray-500 text-xs mb-4">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSuccess(false)}
                    className="w-full h-11 border-white/20 hover:bg-white/5 text-white"
                  >
                    Try another email
                  </Button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-5 p-3 rounded-lg bg-card border border-red-500/30 animate-fade-in">
                      <div className="flex gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email address</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-yellow-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12 text-base bg-black border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all duration-200"
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 hover:scale-[1.02]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send reset link'
                      )}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>

          {/* Back to sign in */}
          <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
            <Link
              to="/auth/signin"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative px-4 pb-6">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 transition-colors hover:text-gray-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              Secure reset
            </span>
            <span className="transition-colors hover:text-gray-400">BS7671 compliant</span>
            <span className="transition-colors hover:text-gray-400">UK based</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPassword;
