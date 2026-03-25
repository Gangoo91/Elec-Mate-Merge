import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
      if (error) setError(error.message);
      else setIsSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100svh] bg-black flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 pt-[calc(env(safe-area-inset-top)+48px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
        <div className="w-full max-w-[340px] mx-auto">
          {/* Back link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <Link
              to="/auth/signin"
              className="inline-flex items-center gap-1 text-white hover:text-white transition-colors p-1 -ml-1 touch-manipulation"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-[13px] font-medium">Back to sign in</span>
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Icon + heading */}
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.10] ring-1 ring-white/20 flex items-center justify-center mb-5">
                    <Mail className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <h1 className="text-[24px] font-semibold text-white tracking-tight mb-1">
                    Reset your password
                  </h1>
                  <p className="text-[13px] text-white">We'll send a reset link to your email</p>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-5 overflow-hidden"
                    >
                      <p className="text-[13px] text-red-400 bg-red-500/8 border border-red-500/15 rounded-lg px-3.5 py-2.5 text-center">
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[12px] font-medium text-white mb-1.5 ml-0.5 uppercase tracking-wider">
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        className={cn(
                          'absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] transition-colors duration-150',
                          focusedField === 'email' ? 'text-elec-yellow' : 'text-white'
                        )}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={cn(
                          'w-full h-12 pl-11 pr-4 rounded-xl text-[15px] text-white placeholder:text-white',
                          'bg-white/[0.10] outline-none transition-all duration-150 [color-scheme:dark]',
                          focusedField === 'email'
                            ? 'ring-1 ring-elec-yellow/40 bg-white/[0.10]'
                            : 'ring-1 ring-white/20 hover:ring-white/30'
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl text-[15px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-[0_1px_20px_rgba(250,204,21,0.15)] active:scale-[0.98] disabled:opacity-50 transition-all duration-150"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send reset link <ArrowRight className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Success state */}
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-14 h-14 rounded-full bg-green-500/10 ring-1 ring-green-500/15 flex items-center justify-center mb-5"
                >
                  <CheckCircle2 className="h-7 w-7 text-green-400" />
                </motion.div>

                <h2 className="text-[22px] font-semibold text-white tracking-tight mb-1">
                  Check your inbox
                </h2>
                <p className="text-[13px] text-white mb-1">We've sent a reset link to</p>
                <p className="text-[14px] text-white font-medium mb-8">{email}</p>

                <p className="text-[11px] text-white mb-6">
                  Didn't receive it? Check spam, or try again.
                </p>

                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setEmail('');
                      setError(null);
                    }}
                    className="w-full h-12 rounded-xl text-[14px] font-medium bg-white/[0.10] ring-1 ring-white/20 text-white hover:bg-white/[0.10] transition-all duration-150 touch-manipulation"
                  >
                    Try another email
                  </button>
                  <Link to="/auth/signin" className="block">
                    <button className="w-full h-12 rounded-xl text-[14px] font-medium text-elec-yellow/70 hover:text-elec-yellow transition-colors touch-manipulation">
                      Back to sign in
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
