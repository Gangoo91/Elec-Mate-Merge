
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle, Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailNotConfirmedError, setIsEmailNotConfirmedError] = useState(false);

  const { signIn } = useAuth();
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
          {/* Welcome text */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Welcome back</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Sign in to continue your training and work
            </p>
          </div>

          {/* Sign in card */}
          <Card className="border-white/10 bg-neutral-900 shadow-xl transition-all duration-300 hover:border-yellow-400/20">
            <CardContent className="pt-6">
              {/* Error states */}
              {isEmailNotConfirmedError && (
                <div className="mb-5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 animate-fade-in">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-500 text-sm">Email not confirmed</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Check your inbox and click the confirmation link.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error && !isEmailNotConfirmedError && (
                <div className="mb-5 p-3 rounded-lg bg-card border border-red-500/30 animate-fade-in">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email</Label>
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
                    <Link
                      to="/auth/forgot-password"
                      className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-yellow-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 text-base bg-black border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all duration-200"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
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

          {/* Sign up prompt */}
          <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
            <p className="text-sm text-gray-400 mb-3">
              New to Elec-Mate?
            </p>
            <Link to="/auth/signup">
              <Button variant="outline" className="w-full h-11 border-yellow-400/30 hover:bg-yellow-400/10 text-white transition-all duration-200 hover:scale-[1.02] hover:border-yellow-400/50">
                <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />
                Create Account
                <span className="ml-2 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                  7 days free
                </span>
              </Button>
            </Link>
          </div>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-yellow-400 transition-colors duration-200"
            >
              Back to home
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
              Secure login
            </span>
            <span className="transition-colors hover:text-gray-400">BS7671 compliant</span>
            <span className="transition-colors hover:text-gray-400">UK based</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
