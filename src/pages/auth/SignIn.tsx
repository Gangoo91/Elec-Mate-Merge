import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, Zap, Mail, Lock, ArrowRight, CheckCircle2, ChevronLeft, Sparkles, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Pre-fill email from URL param (used by founder signup flow)
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam && !email) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

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
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-elec-yellow/20 blur-[150px]"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full px-4 pt-[env(safe-area-inset-top)] pb-1 z-10"
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link
            to="/"
            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors p-2 -ml-2 rounded-xl"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-[15px] font-medium">Back</span>
          </Link>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
          >
            <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center shadow-lg shadow-elec-yellow/30">
              <Zap className="h-5 w-5 text-black" />
            </div>
          </motion.div>

          <div className="w-16" />
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col justify-start sm:justify-center px-5 py-4 sm:py-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Welcome text */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[28px] font-bold text-white tracking-tight mb-2"
            >
              Welcome back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[15px] text-white/50"
            >
              Sign in to continue to Elec-Mate
            </motion.p>
          </div>

          {/* Success overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                    >
                      <CheckCircle2 className="h-10 w-10 text-green-400" />
                    </motion.div>
                  </div>
                  <p className="text-lg text-white font-semibold">Welcome back!</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error state */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <p className="text-[14px] text-amber-400 font-medium">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
            autoComplete="off"
          >
            {/* Email field */}
            <div className="space-y-2">
              <label className="block text-[13px] font-medium text-white/70 ml-1">
                Email address
              </label>
              <div className="relative">
                <div className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
                  focusedField === 'email' ? "text-elec-yellow" : "text-white/40"
                )}>
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  autoComplete="off"
                  name="login-email"
                  data-form-type="other"
                  className={cn(
                    "w-full h-14 pl-12 pr-12 rounded-2xl",
                    "bg-white/[0.06] border-2 text-white placeholder:text-white/30",
                    "text-[16px] outline-none transition-all duration-200",
                    focusedField === 'email'
                      ? "border-elec-yellow/50 bg-white/[0.08] shadow-[0_0_0_4px_rgba(255,209,0,0.1)]"
                      : "border-white/10 hover:border-white/20"
                  )}
                />
                {/* Success indicator */}
                <AnimatePresence>
                  {isEmailValid && email.length > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="block text-[13px] font-medium text-white/70 ml-1">
                Password
              </label>
              <div className="relative">
                <div className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
                  focusedField === 'password' ? "text-elec-yellow" : "text-white/40"
                )}>
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  autoComplete="off"
                  name="login-password"
                  data-form-type="other"
                  className={cn(
                    "w-full h-14 pl-12 pr-12 rounded-2xl",
                    "bg-white/[0.06] border-2 text-white placeholder:text-white/30",
                    "text-[16px] outline-none transition-all duration-200",
                    focusedField === 'password'
                      ? "border-elec-yellow/50 bg-white/[0.08] shadow-[0_0_0_4px_rgba(255,209,0,0.1)]"
                      : "border-white/10 hover:border-white/20"
                  )}
                />
                {/* Password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 active:text-white transition-colors h-11 w-11 flex items-center justify-center touch-manipulation rounded-xl"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-elec-yellow font-medium hover:text-elec-yellow/80 active:text-elec-yellow/70 transition-colors py-2 px-3 -mr-2 rounded-xl touch-manipulation min-h-[44px] flex items-center"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign in button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting || showSuccess}
                className={cn(
                  "w-full h-14 rounded-2xl text-[16px] font-semibold",
                  "bg-elec-yellow hover:bg-elec-yellow/90 text-black",
                  "shadow-lg shadow-elec-yellow/25 transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 my-5 sm:my-8"
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[12px] text-white/30 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Sign up prompt */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <p className="text-[14px] text-white/40 mb-4">
              Don't have an account?
            </p>
            <Link to="/auth/signup" className="block">
              <Button
                variant="outline"
                className={cn(
                  "w-full h-13 rounded-2xl text-[15px] font-semibold",
                  "bg-transparent border-2 border-white/10 text-white",
                  "hover:bg-white/5 hover:border-white/20 transition-all duration-200"
                )}
              >
                <span className="flex items-center gap-2">
                  Create Account
                  <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] bg-elec-yellow/20 text-elec-yellow rounded-full font-semibold">
                    <Sparkles className="h-3 w-3" />
                    Free Trial
                  </span>
                </span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative px-6 pb-6 z-10"
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 text-[11px] text-white/30">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500/70" />
              Secure Login
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>BS7671 Compliant</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>UK Based</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default SignIn;
