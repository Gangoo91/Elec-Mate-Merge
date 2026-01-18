import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Zap, Lock, Eye, EyeOff, CheckCircle2, AlertTriangle, Shield, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type TokenState = 'verifying' | 'valid' | 'invalid';

const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: '8+', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'A-Z', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'a-z', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: '0-9', test: (p: string) => /[0-9]/.test(p) },
];

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenState, setTokenState] = useState<TokenState>('verifying');
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  useEffect(() => {
    const verifyToken = async () => {
      if (!tokenHash || type !== 'recovery') {
        const { data: { session } } = await supabase.auth.getSession();
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
          setTokenError(error.message.includes('expired')
            ? 'This reset link has expired. Please request a new one.'
            : 'Invalid reset link. Please request a new one.');
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

  const allRequirementsMet = PASSWORD_REQUIREMENTS.every(req => req.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet || password !== confirmPassword) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const { error } = await updatePassword(password);
      if (error) {
        setError(error.message);
      } else {
        setIsSuccess(true);
        setTimeout(() => navigate('/auth/signin'), 2500);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col safe-top safe-bottom overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-elec-yellow/20 blur-[150px]"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full px-4 pt-4 pb-2 z-10"
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link to="/auth/signin" className="flex items-center gap-1 text-white/70 hover:text-white transition-colors p-2 -ml-2 rounded-xl touch-manipulation">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-[15px] font-medium">Back</span>
          </Link>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center shadow-lg shadow-elec-yellow/30">
              <Zap className="h-5 w-5 text-black" />
            </div>
          </motion.div>

          <div className="w-16" />
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col justify-center px-5 py-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md mx-auto"
        >
          <AnimatePresence mode="wait">
            {/* Verifying State */}
            {tokenState === 'verifying' && (
              <motion.div
                key="verifying"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 rounded-full bg-elec-yellow/10 flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="h-12 w-12 animate-spin text-elec-yellow" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Verifying link...</h1>
                <p className="text-white/50">Please wait while we verify your reset link</p>
              </motion.div>
            )}

            {/* Invalid Token State */}
            {tokenState === 'invalid' && (
              <motion.div
                key="invalid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8"
              >
                <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-12 w-12 text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-3">Link expired</h1>
                <p className="text-white/60 mb-8 px-4">{tokenError}</p>

                <Link to="/auth/forgot-password">
                  <Button className="w-full h-14 rounded-2xl text-[16px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-lg shadow-elec-yellow/25">
                    Request new link
                  </Button>
                </Link>

                <Link
                  to="/auth/signin"
                  className="block mt-5 text-[15px] text-white/50 hover:text-white transition-colors"
                >
                  Back to sign in
                </Link>
              </motion.div>
            )}

            {/* Success State */}
            {tokenState === 'valid' && isSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </motion.div>
                <h1 className="text-2xl font-bold text-white mb-2">Password updated!</h1>
                <p className="text-white/60 mb-6">Your password has been changed successfully</p>
                <div className="flex items-center justify-center gap-2 text-white/40">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Redirecting to sign in...</span>
                </div>
              </motion.div>
            )}

            {/* Password Form */}
            {tokenState === 'valid' && !isSuccess && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Title */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-elec-yellow/10 flex items-center justify-center mx-auto mb-5">
                    <Shield className="h-8 w-8 text-elec-yellow" />
                  </div>
                  <h1 className="text-[28px] font-bold text-white tracking-tight mb-2">
                    Set new password
                  </h1>
                  <p className="text-[15px] text-white/50">Create a strong password to secure your account</p>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
                    >
                      <div className="flex gap-3 items-center">
                        <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <p className="text-[14px] text-red-400 font-medium">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="block text-[13px] font-medium text-white/70 ml-1">New password</label>
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
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        className={cn(
                          "w-full h-14 pl-14 pr-14 rounded-2xl",
                          "bg-white/[0.06] border-2 text-white placeholder:text-white/30",
                          "text-[16px] outline-none transition-all duration-200",
                          focusedField === 'password'
                            ? "border-elec-yellow/50 bg-white/[0.08] shadow-[0_0_0_4px_rgba(255,209,0,0.1)]"
                            : "border-white/10 hover:border-white/20"
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 active:text-white transition-colors h-11 w-11 flex items-center justify-center touch-manipulation rounded-xl"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Password requirements - compact chips */}
                    {password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex gap-1.5 mt-3"
                      >
                        {PASSWORD_REQUIREMENTS.map((req) => (
                          <div key={req.id} className={cn(
                            "flex-1 py-2 rounded-xl text-center text-[12px] font-semibold transition-all",
                            req.test(password)
                              ? "bg-green-500/20 text-green-400"
                              : "bg-white/5 text-white/40"
                          )}>
                            {req.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="block text-[13px] font-medium text-white/70 ml-1">Confirm password</label>
                    <div className="relative">
                      <div className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
                        focusedField === 'confirm' ? "text-elec-yellow" : "text-white/40"
                      )}>
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setFocusedField('confirm')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        className={cn(
                          "w-full h-14 pl-14 pr-14 rounded-2xl",
                          "bg-white/[0.06] border-2 text-white placeholder:text-white/30",
                          "text-[16px] outline-none transition-all duration-200",
                          focusedField === 'confirm'
                            ? "border-elec-yellow/50 bg-white/[0.08] shadow-[0_0_0_4px_rgba(255,209,0,0.1)]"
                            : confirmPassword && !passwordsMatch
                              ? "border-red-500/50 bg-white/[0.06]"
                              : "border-white/10 hover:border-white/20"
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 active:text-white transition-colors h-11 w-11 flex items-center justify-center touch-manipulation rounded-xl"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>

                      {/* Match indicator */}
                      {confirmPassword && passwordsMatch && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-14 top-1/2 -translate-y-1/2"
                        >
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                    {confirmPassword && !passwordsMatch && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[13px] text-red-400 ml-1"
                      >
                        Passwords don't match
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !allRequirementsMet || !passwordsMatch}
                    className={cn(
                      "w-full h-14 rounded-2xl text-[16px] font-semibold mt-2",
                      "bg-elec-yellow hover:bg-elec-yellow/90 text-black",
                      "shadow-lg shadow-elec-yellow/25 transition-all duration-200",
                      "disabled:opacity-50 disabled:shadow-none"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Updating password...
                      </>
                    ) : (
                      'Update password'
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
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
              Secure
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

export default ResetPassword;
