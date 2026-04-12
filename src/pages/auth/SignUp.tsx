import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  Eye,
  EyeOff,
  Gift,
  GraduationCap,
  Loader2,
  Wrench,
} from 'lucide-react';
import { storeConsent } from '@/services/consentService';
import TrialExpiredPaywall from '@/components/auth/TrialExpiredPaywall';
import { supabase } from '@/integrations/supabase/client';
import { useUserCount } from '@/hooks/useUserCount';
import { storageSetSync, storageGetSync, storageRemoveSync } from '@/utils/storage';
import { cn } from '@/lib/utils';
import { addBreadcrumb } from '@/lib/sentry';
import { isPasswordBreached } from '@/utils/passwordCheck';

const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: '8+', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'A-Z', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'a-z', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: '0-9', test: (p: string) => /[0-9]/.test(p) },
];

type OnboardingStep = 'account' | 'profile' | 'consent';

const STEPS: OnboardingStep[] = ['account', 'profile', 'consent'];
const STEP_LABELS = ['Account', 'Role', 'Trial'];

const ROLE_OPTIONS = [
  {
    value: 'electrician',
    label: 'Electrician',
    subtitle: 'Everything you need on and off site.',
    icon: Wrench,
    features: [
      'Certificates, RAMS and reports',
      'Quotes and invoices',
      'AI tools and calculators',
      'Job tracking and study tools',
    ],
  },
  {
    value: 'apprentice',
    label: 'Apprentice',
    subtitle: 'Your complete training companion.',
    icon: GraduationCap,
    features: [
      'Level 2 and 3 courses',
      'AM2 support and mock exams',
      'Progress tracking and revision tools',
      'Calculators and study resources',
    ],
  },
];

/* ─── Shared sub-components ─── */

const StepBar = ({ currentIndex }: { currentIndex: number }) => (
  <div className="mb-5 lg:mb-7">
    <div className="flex gap-2">
      {STEPS.map((s, i) => (
        <div key={s} className="flex-1">
          <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.10]">
            <motion.div
              className="h-full rounded-full bg-yellow-400"
              initial={false}
              animate={{ width: i < currentIndex ? '100%' : i === currentIndex ? '50%' : '0%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <span
            className={cn(
              'mt-1.5 block text-center text-[12px] font-medium transition-colors lg:text-[13px]',
              i === currentIndex ? 'text-yellow-400' : 'text-white'
            )}
          >
            {STEP_LABELS[i]}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  field,
  focusedField,
  setFocusedField,
  showToggle,
  isVisible,
  onToggle,
  showSuccess,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  field: string;
  focusedField: string | null;
  setFocusedField: (f: string | null) => void;
  showToggle?: boolean;
  isVisible?: boolean;
  onToggle?: () => void;
  showSuccess?: boolean;
}) => {
  const resolvedType = type === 'password' ? (isVisible ? 'text' : 'password') : type;
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-white">{label}</label>
      <div className="relative">
        <input
          type={resolvedType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
          placeholder={placeholder}
          autoComplete={type === 'email' ? 'email' : type === 'password' ? 'new-password' : 'name'}
          autoCapitalize={type === 'email' || type === 'password' ? 'none' : 'words'}
          className={cn(
            'h-12 w-full touch-manipulation rounded-2xl border bg-white/[0.04] px-5 pr-12 text-[16px] text-white placeholder:text-white/40 outline-none transition-all duration-150 [color-scheme:dark] focus:outline-none lg:h-14',
            focusedField === field
              ? 'border-yellow-400/70 bg-white/[0.06] ring-2 ring-yellow-400/20'
              : 'border-white/[0.12] hover:border-white/[0.22]'
          )}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-lg text-white transition-colors hover:bg-white/[0.06]"
            aria-label={isVisible ? 'Hide password' : 'Show password'}
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
        {showSuccess && !showToggle && (
          <CheckCircle2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-400" />
        )}
      </div>
    </div>
  );
};

/* ─── Main component ─── */

const SignUp = () => {
  const [step, setStep] = useState<OnboardingStep>('account');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [profileForm, setProfileForm] = useState({ role: '' as string });
  const [consent, setConsent] = useState({
    termsAccepted: false,
    privacyAccepted: false,
    marketingOptIn: false,
    dataProcessingAccepted: false,
  });
  const userCount = useUserCount();

  const { signUp, user, profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [offerCode, setOfferCode] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  const currentStepIndex = STEPS.indexOf(step);
  const allPasswordRequirementsMet = PASSWORD_REQUIREMENTS.every((r) => r.test(password));
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const allRequiredAccepted =
    consent.termsAccepted && consent.privacyAccepted && consent.dataProcessingAccepted;

  // If a logged-in subscribed user lands here, send them straight to the app.
  useEffect(() => {
    if (!user || !profile) return;
    if (profile.subscribed || profile.free_access_granted) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, profile, navigate]);

  useEffect(() => {
    const code = searchParams.get('offer');
    if (code) {
      storageSetSync('elec-mate-offer-code', code);
      setOfferCode(code);
    }
  }, [searchParams]);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      storageSetSync('elec-mate-referral-code', ref);
      setReferralCode(ref);
    } else {
      const stored = storageGetSync('elec-mate-referral-code');
      if (stored) setReferralCode(stored);
    }
  }, [searchParams]);

  // ─── Handlers (business logic unchanged) ───

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !fullName) {
      setError('Please fill in all fields');
      return;
    }
    if (!allPasswordRequirementsMet) {
      setError('Password needs: 8+ chars, uppercase, lowercase, number');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Note: we intentionally do NOT pre-check for a duplicate email here.
    // `profiles.email` is not a public column (RLS + schema), so that query
    // always returned a 400. Supabase's `signUp()` call on the final step
    // surfaces duplicate-email errors correctly anyway.
    setError(null);
    addBreadcrumb('Signup step: account completed', 'signup', { email });
    setStep('profile');
  };

  const handleProfileSubmit = () => {
    if (!profileForm.role) {
      setError('Please select your role');
      return;
    }
    setError(null);
    addBreadcrumb('Signup step: profile completed', 'signup', { role: profileForm.role });
    setStep('consent');
  };

  const ROLE_TO_PRICE: Record<string, { planId: string; priceId: string }> = {
    electrician: { planId: 'electrician-monthly', priceId: 'price_1TKlA12RKw5t5RAmdhZyhX1I' },
    apprentice: { planId: 'apprentice-monthly', priceId: 'price_1TKlA22RKw5t5RAmpvhojy0b' },
  };

  const handleFinalSubmit = async () => {
    if (!allRequiredAccepted) {
      setError('Please accept the required terms');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    addBreadcrumb('Signup step: consent completed, submitting', 'signup', {
      marketingOptIn: consent.marketingOptIn,
    });
    try {
      // Pre-check password against HaveIBeenPwned BEFORE calling Supabase signUp.
      // This prevents Supabase from creating a zombie user when it rejects the password.
      const breached = await isPasswordBreached(password);
      if (breached) {
        setError(
          "This password has appeared in a known data breach and cannot be used. Please go back and choose a different password that you haven't used on other sites."
        );
        setStep('account');
        setIsSubmitting(false);
        return;
      }

      const { error, data } = await signUp(email, password, fullName);
      if (error) {
        const lowerMsg = (error.message || '').toLowerCase();
        const isWeakPassword = lowerMsg.includes('password') && lowerMsg.includes('weak');

        if (isWeakPassword) {
          // Send user back to account step to change password
          setError(
            "This password cannot be used — please choose a different one that you haven't used on other sites."
          );
          setStep('account');
        } else {
          setError(error.message);
        }
        setIsSubmitting(false);
        return;
      }

      const userId = data?.user?.id;

      if (userId) {
        storageSetSync('elec-mate-profile-role', profileForm.role);
        const saveRole = async (retries = 3): Promise<boolean> => {
          const payload: Record<string, unknown> = {
            role: profileForm.role,
            onboarding_completed: false,
            updated_at: new Date().toISOString(),
          };
          const storedRef = storageGetSync('elec-mate-referral-code');
          if (storedRef) {
            try {
              const { data: refData } = await supabase
                .from('referral_codes')
                .select('user_id')
                .eq('code', storedRef)
                .eq('is_active', true)
                .maybeSingle();
              if (refData?.user_id) {
                payload.referred_by = refData.user_id;
                await supabase.from('referrals').insert({
                  referrer_id: refData.user_id,
                  referred_id: userId,
                  referred_email: email,
                  referral_code: storedRef,
                  status: 'signed_up',
                  source: (searchParams.get('src') as string) || 'link',
                });
              }
            } catch {
              /* non-critical */
            }
          }
          const { error: profileErr } = await supabase
            .from('profiles')
            .update(payload)
            .eq('id', userId);
          if (profileErr) {
            if (retries > 0) {
              await new Promise((r) => setTimeout(r, 500));
              return saveRole(retries - 1);
            }
            return false;
          }
          return true;
        };
        await saveRole();
      }

      await storeConsent({
        email,
        full_name: fullName,
        terms_accepted: consent.termsAccepted,
        privacy_accepted: consent.privacyAccepted,
        data_processing_accepted: consent.dataProcessingAccepted,
        marketing_opt_in: consent.marketingOptIn,
        consent_timestamp: new Date().toISOString(),
      }).catch(() => {});

      supabase.functions
        .invoke('send-welcome-email', { body: { userId, email, fullName } })
        .catch(() => {});

      const rp = ROLE_TO_PRICE[profileForm.role];
      if (rp) {
        storageSetSync('elec-mate-checkout-planId', rp.planId);
        storageSetSync('elec-mate-checkout-priceId', rp.priceId);
      }
      storageRemoveSync('elec-mate-offer-code');
      storageRemoveSync('elec-mate-onboarding-data');
      navigate('/checkout-trial');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setError(null);
    if (step === 'profile') setStep('account');
    else if (step === 'consent') setStep('profile');
  };

  // ─── Render ───

  // Logged-in but not subscribed — they already have an account and abandoned
  // Stripe checkout (or their trial ended). Show the paywall instead of the
  // signup form so they can't get stuck with "email already exists" on re-try.
  // Paywall has Subscribe Now → /subscriptions and Sign Out → clean slate.
  if (user && profile && !profile.subscribed && !profile.free_access_granted) {
    return <TrialExpiredPaywall />;
  }

  return (
    <div className="min-h-[100svh] bg-black">
      <div className="mx-auto grid min-h-[100svh] max-w-[1120px] items-stretch px-6 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[env(safe-area-inset-top)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-8">
        <div className="hidden lg:flex lg:flex-col lg:justify-between lg:py-10">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Elec-Mate" className="h-11 w-11 rounded-xl object-cover" />
              <span className="text-[22px] font-bold tracking-tight text-white">
                Elec-<span className="text-yellow-400">Mate</span>
              </span>
            </Link>

            <div className="mt-16 max-w-[30rem]">
              <h1 className="text-[4rem] font-bold leading-[1.02] tracking-[-0.045em] text-white">
                Three steps.
                <br />
                <span className="text-yellow-400">Seven free days.</span>
              </h1>
              <p className="mt-6 max-w-[26rem] text-lg leading-[1.65] text-white">
                Create your account, pick your role, and start running real work through the
                platform. No charge until day 8.
              </p>
            </div>
          </div>

          <div className="grid gap-4 text-[14px] leading-[1.7] text-white">
            <div>{userCount} electricians already live on Elec-Mate.</div>
            <div>You will not be charged for 7 days.</div>
            <div>Cancelling before the trial ends takes a couple of clicks.</div>
          </div>
        </div>

        <div className="flex flex-col justify-start py-3 lg:justify-center lg:py-10">
          <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col">
          {/* Top bar: back + logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-1 flex items-center justify-between py-2"
          >
            {step === 'account' ? (
              <Link
                to="/"
                className="flex items-center gap-1 text-white hover:text-white transition-colors p-1 -ml-1 touch-manipulation"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="text-[13px] font-medium">Back</span>
              </Link>
            ) : (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-white hover:text-white transition-colors p-1 -ml-1 touch-manipulation"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="text-[13px] font-medium">Back</span>
              </button>
            )}
            <div className="flex items-center gap-2 lg:hidden">
              <img src="/logo.jpg" alt="" className="w-7 h-7 rounded-lg object-cover" />
              <span className="text-[14px] font-bold tracking-tight">
                <span className="text-elec-yellow">Elec-</span>
                <span className="text-white">Mate</span>
              </span>
            </div>
            <div className="w-14" />
          </motion.div>

          {/* Step indicator */}
          <StepBar currentIndex={currentStepIndex} />

          {/* Step content */}
          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {/* ─── STEP 1: Account ─── */}
              {step === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                  {/* Banners */}
                  {referralCode && !offerCode && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl border border-yellow-500/25 bg-yellow-500/[0.08] px-4 py-3">
                      <Gift className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                      <div>
                        <p className="text-[13px] font-semibold text-yellow-400">
                          Referred by a Mate
                        </p>
                        <p className="text-[12px] text-white">Your first month's on us.</p>
                      </div>
                    </div>
                  )}
                  {offerCode && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-500/25 bg-green-500/[0.08] px-4 py-3">
                      <Gift className="h-5 w-5 flex-shrink-0 text-green-400" />
                      <div>
                        <p className="text-[13px] font-semibold text-green-400">Offer applied</p>
                        <p className="text-[12px] text-white">Discount applied at checkout.</p>
                      </div>
                    </div>
                  )}
                  <h1 className="mb-2 text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.25rem] lg:text-[2.5rem]">
                    Create your <span className="text-yellow-400">account.</span>
                  </h1>
                  <p className="mb-3 text-[14px] leading-[1.6] text-white lg:text-[15px]">
                    Name, email, password — that's it. No charge for 7 days.
                  </p>
                  <div className="mb-5 flex items-center gap-2 text-[12px] text-white lg:mb-6 lg:text-[13px]">
                    <span>No charge for 7 days</span>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span>{userCount} electricians live</span>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-hidden"
                      >
                        <p className="rounded-2xl border border-red-500/25 bg-red-500/[0.08] px-4 py-3 text-[13px] text-red-400">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleAccountSubmit} className="flex-1 space-y-3">
                    <InputField
                      label="Full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Smith"
                      field="name"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                    />
                    <InputField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      field="email"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      showSuccess={isEmailValid && email.length > 0}
                    />
                    <div>
                      <InputField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create password"
                        field="password"
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        showToggle
                        isVisible={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                      />
                      {password && (
                        <>
                          <div className="flex gap-1.5 mt-2">
                            {PASSWORD_REQUIREMENTS.map((req) => (
                              <div
                                key={req.id}
                                className={cn(
                                  'flex-1 py-1 rounded text-center text-[10px] font-semibold transition-all duration-150',
                                  req.test(password)
                                    ? 'bg-green-500/10 text-green-400/80'
                                    : 'bg-white/[0.03] text-white'
                                )}
                              >
                                {req.label}
                              </div>
                            ))}
                          </div>
                          {allPasswordRequirementsMet && (
                            <p className="text-[10px] text-white mt-1.5">
                              Avoid passwords you've used on other sites — they may be rejected if
                              found in a data breach
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    <InputField
                      label="Confirm password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      field="confirmPassword"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      showToggle
                      isVisible={showConfirmPassword}
                      onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                      showSuccess={passwordsMatch}
                    />

                    <div className="pt-3">
                      <Button
                        type="submit"
                        className="h-12 w-full touch-manipulation rounded-2xl text-[15px] font-semibold bg-yellow-500 hover:bg-yellow-400 text-black active:scale-[0.98] lg:h-14 disabled:opacity-50 transition-all duration-150"
                      >
                        Continue
                      </Button>
                    </div>
                  </form>

                  <p className="mt-4 text-center text-[13px] text-white lg:mt-5">
                    Already have an account?{' '}
                    <Link
                      to="/auth/signin"
                      className="font-semibold text-yellow-400 hover:text-yellow-300"
                    >
                      Sign in
                    </Link>
                  </p>
                </motion.div>
              )}

              {/* ─── STEP 2: Role ─── */}
              {step === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="mb-7">
                    <h1 className="mb-3 text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.5rem]">
                      Which one <span className="text-yellow-400">sounds like you?</span>
                    </h1>
                    <p className="text-[15px] leading-[1.7] text-white">
                      This tunes the first version of the platform you land in.
                    </p>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-hidden"
                      >
                        <p className="rounded-2xl border border-red-500/25 bg-red-500/[0.08] px-4 py-3 text-[13px] text-red-400">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex-1 space-y-4">
                    {ROLE_OPTIONS.map((option, index) => {
                      const selected = profileForm.role === option.value;
                      const Icon = option.icon;
                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + index * 0.1 }}
                          onClick={() => setProfileForm({ ...profileForm, role: option.value })}
                          className={cn(
                            'w-full touch-manipulation rounded-[1.8rem] border p-5 text-left transition-all duration-200 lg:p-6',
                            selected
                              ? 'border-yellow-400/60 bg-gradient-to-br from-yellow-500/[0.12] via-amber-500/[0.05] to-white/[0.02] shadow-[0_0_40px_rgba(250,204,21,0.1)]'
                              : 'border-white/[0.12] bg-white/[0.03] hover:border-yellow-400/30 hover:bg-white/[0.04]'
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={cn(
                                'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border transition-colors',
                                selected
                                  ? 'border-yellow-400/40 bg-yellow-500/[0.18]'
                                  : 'border-yellow-500/25 bg-yellow-500/[0.12]'
                              )}
                            >
                              <Icon className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-[18px] font-bold tracking-[-0.01em] text-white">
                                {option.label}
                              </h3>
                              <p className="mt-1 text-[13px] text-white">{option.subtitle}</p>
                            </div>
                            <div
                              className={cn(
                                'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-150',
                                selected
                                  ? 'bg-yellow-400 shadow-[0_0_16px_rgba(250,204,21,0.4)]'
                                  : 'border-2 border-white/25'
                              )}
                            >
                              {selected && <Check className="h-4 w-4 text-black" strokeWidth={3} />}
                            </div>
                          </div>

                          <div
                            className={cn(
                              'mt-5 space-y-2.5 border-t pt-4',
                              selected ? 'border-yellow-400/20' : 'border-white/[0.08]'
                            )}
                          >
                            {option.features.map((feature) => (
                              <div
                                key={feature}
                                className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-white"
                              >
                                <div className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-yellow-400" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="pt-5">
                    <Button
                      onClick={handleProfileSubmit}
                      disabled={!profileForm.role}
                      className="h-12 w-full touch-manipulation rounded-2xl text-[15px] font-semibold bg-yellow-500 hover:bg-yellow-400 text-black active:scale-[0.98] lg:h-14 disabled:opacity-30 transition-all duration-150"
                    >
                      Continue
                    </Button>

                    {/* Trial note */}
                    <div className="mt-4 text-center text-[11px] text-white">
                      No charge for 7 days · Cancel in a couple of clicks
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── STEP 3: Consent ─── */}
              {step === 'consent' && (
                <motion.div
                  key="consent"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="mb-7">
                    <h1 className="mb-3 text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.5rem]">
                      One last <span className="text-yellow-400">thing.</span>
                    </h1>
                    <p className="text-[15px] leading-[1.7] text-white">
                      Confirm the essentials, then we'll take you to checkout.
                    </p>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-hidden"
                      >
                        <p className="rounded-2xl border border-red-500/25 bg-red-500/[0.08] px-4 py-3 text-[13px] text-red-400">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Accept all */}
                  {!allRequiredAccepted && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() =>
                        setConsent((p) => ({
                          ...p,
                          termsAccepted: true,
                          privacyAccepted: true,
                          dataProcessingAccepted: true,
                        }))
                      }
                      className="mb-5 h-12 w-full touch-manipulation rounded-2xl border border-yellow-500/25 bg-yellow-500/[0.08] text-[14px] font-semibold text-yellow-400 transition-colors hover:bg-yellow-500/[0.12]"
                    >
                      Accept all required
                    </motion.button>
                  )}

                  <div className="space-y-3 flex-1">
                    {[
                      {
                        key: 'termsAccepted',
                        label: 'Terms of Service',
                        desc: 'Our rules for using the platform',
                        req: true,
                      },
                      {
                        key: 'privacyAccepted',
                        label: 'Privacy Policy',
                        desc: 'How we protect your information',
                        req: true,
                      },
                      {
                        key: 'dataProcessingAccepted',
                        label: 'Data Processing (GDPR)',
                        desc: 'Required for UK data compliance',
                        req: true,
                      },
                      {
                        key: 'marketingOptIn',
                        label: 'Updates & offers',
                        desc: 'Tips, new features & occasional deals',
                        req: false,
                      },
                    ].map((item, i) => {
                      const checked = consent[item.key as keyof typeof consent];
                      return (
                        <motion.button
                          key={item.key}
                          type="button"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.03 + i * 0.05 }}
                          onClick={() => setConsent({ ...consent, [item.key]: !checked })}
                          className={cn(
                            'w-full p-4 rounded-xl text-left flex items-center gap-3.5 transition-all duration-200 touch-manipulation border-2',
                            checked
                              ? 'bg-green-500/[0.06] border-green-500/25'
                              : 'bg-white/[0.03] border-white/15 hover:border-elec-yellow/20'
                          )}
                        >
                          <div
                            aria-hidden
                            className={cn(
                              'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors',
                              checked
                                ? 'border-green-500 bg-green-500'
                                : 'border-white/25 bg-transparent'
                            )}
                          >
                            {checked && <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[14px] text-white font-medium block">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-white block mt-0.5">{item.desc}</span>
                          </div>
                          {item.req && (
                            <span
                              className={cn(
                                'text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0',
                                checked
                                  ? 'bg-green-500/15 text-green-400'
                                  : 'bg-elec-yellow/10 text-elec-yellow'
                              )}
                            >
                              {checked ? '✓' : 'Required'}
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="pt-6">
                    <Button
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting || !allRequiredAccepted}
                      className="h-12 w-full touch-manipulation rounded-2xl text-[15px] font-semibold bg-yellow-500 hover:bg-yellow-400 text-black active:scale-[0.98] lg:h-14 disabled:opacity-30 transition-all duration-150"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                        </>
                      ) : (
                        'Create account'
                      )}
                    </Button>

                    {/* Trial + trust note */}
                    <div className="mt-4 text-center text-[11px] text-white">
                      7-day free trial · No charge for 7 days · Cancel in a couple of clicks
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
