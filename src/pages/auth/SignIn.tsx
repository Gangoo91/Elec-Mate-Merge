import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle, Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Premium Floating Input Component
interface FloatingInputProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  autoComplete?: string;
  required?: boolean;
  rightElement?: React.ReactNode;
}

const FloatingInput = ({
  id,
  type,
  label,
  value,
  onChange,
  icon,
  autoComplete,
  required,
  rightElement,
}: FloatingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;

  return (
    <div
      className={cn(
        "relative group cursor-text",
        "transition-all duration-300 ease-out"
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Glow effect on focus */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-2xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-yellow-400/20 blur-sm",
          isFocused && "opacity-100"
        )}
      />

      {/* Main container */}
      <div
        className={cn(
          "relative flex items-center gap-3 px-4 py-4 rounded-xl",
          "bg-neutral-900/80 backdrop-blur-sm",
          "border-2 transition-all duration-300 ease-out",
          isFocused
            ? "border-yellow-400/60 shadow-lg shadow-yellow-400/10"
            : "border-white/10 hover:border-white/20"
        )}
      >
        {/* Icon container */}
        <div
          className={cn(
            "flex items-center justify-center w-11 h-11 rounded-xl",
            "transition-all duration-300 ease-out flex-shrink-0",
            isActive
              ? "bg-yellow-400/15 text-yellow-400"
              : "bg-white/5 text-gray-500 group-hover:text-gray-400"
          )}
        >
          {icon}
        </div>

        {/* Input wrapper */}
        <div className="flex-1 relative min-h-[44px] flex items-center">
          {/* Floating label */}
          <label
            htmlFor={id}
            className={cn(
              "absolute left-0 transition-all duration-300 ease-out pointer-events-none",
              "font-medium",
              isActive
                ? "top-0 text-xs text-yellow-400"
                : "top-1/2 -translate-y-1/2 text-base text-gray-500"
            )}
          >
            {label}
          </label>

          {/* Input */}
          <input
            ref={inputRef}
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete={autoComplete}
            required={required}
            className={cn(
              "w-full bg-transparent outline-none text-white text-lg",
              "transition-all duration-300",
              isActive ? "pt-4" : "pt-0",
              "placeholder:text-transparent"
            )}
            placeholder={label}
          />
        </div>

        {/* Right element (e.g., show/hide password) */}
        {rightElement && (
          <div className="flex-shrink-0">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-black flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[300px] bg-yellow-400/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative w-full px-4 pt-6 pb-4 sm:pt-8">
        <Link to="/" className="flex items-center justify-center gap-2 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg shadow-yellow-400/20">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            Elec-<span className="text-yellow-400">Mate</span>
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="w-full max-w-sm md:max-w-md animate-fade-in">
          {/* Welcome text */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl">
              Sign in to continue your journey
            </p>
          </div>

          {/* Sign in card */}
          <Card className="border-white/10 bg-neutral-900/50 backdrop-blur-xl shadow-2xl shadow-black/50 transition-all duration-500 hover:border-yellow-400/20 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              {/* Error states */}
              {isEmailNotConfirmedError && (
                <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 animate-fade-in">
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/20 flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-amber-500">Email not confirmed</p>
                      <p className="text-sm text-gray-400 mt-1 mb-3">
                        Check your inbox and click the confirmation link.
                      </p>
                      {resendSuccess ? (
                        <p className="text-sm text-green-400 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Confirmation email sent! Check your inbox.
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendConfirmation}
                          disabled={isResending}
                          className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2 disabled:opacity-50 font-medium"
                        >
                          {isResending ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4" />
                              Resend confirmation email
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {error && !isEmailNotConfirmedError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 animate-fade-in">
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/20 flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <p className="text-sm text-red-400 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <FloatingInput
                  id="email"
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={setEmail}
                  icon={<Mail className="h-5 w-5" />}
                  autoComplete="email"
                  required
                />

                <div className="space-y-2">
                  <FloatingInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    icon={<Lock className="h-5 w-5" />}
                    autoComplete="current-password"
                    required
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-lg",
                          "text-gray-500 hover:text-white hover:bg-white/10",
                          "transition-all duration-200"
                        )}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    }
                  />
                  <div className="flex justify-end px-1">
                    <Link
                      to="/auth/forgot-password"
                      className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  className={cn(
                    "w-full h-14 md:h-16 text-lg md:text-xl font-bold",
                    "bg-gradient-to-r from-yellow-400 to-yellow-500",
                    "hover:from-yellow-300 hover:to-yellow-400",
                    "text-black rounded-xl",
                    "transition-all duration-300",
                    "hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-400/25",
                    "active:scale-[0.98]",
                    "disabled:opacity-50 disabled:hover:scale-100"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sign up prompt */}
          <div className="mt-8 md:mt-10 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
            <p className="text-base md:text-lg text-gray-400 mb-4">
              New to Elec-Mate?
            </p>
            <Link to="/auth/signup">
              <Button
                variant="outline"
                className={cn(
                  "w-full h-14 md:h-16 rounded-xl",
                  "border-2 border-yellow-400/30 hover:border-yellow-400/60",
                  "bg-yellow-400/5 hover:bg-yellow-400/10",
                  "text-white text-lg font-semibold",
                  "transition-all duration-300",
                  "hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-400/10"
                )}
              >
                <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
                Create Account
                <span className="ml-3 text-sm text-yellow-400 bg-yellow-400/15 px-3 py-1 rounded-full font-medium">
                  7 days free
                </span>
              </Button>
            </Link>
          </div>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-base text-gray-500 hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative px-4 pb-8">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2 transition-colors hover:text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Secure login
            </span>
            <span className="transition-colors hover:text-gray-400">BS7671</span>
            <span className="transition-colors hover:text-gray-400">UK based</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
