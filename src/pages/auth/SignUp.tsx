import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Zap,
  Gift,
  User,
  Mail,
  Lock,
  Shield,
  Check,
  ChevronLeft,
  Eye,
  EyeOff,
  FileCheck,
  Calculator,
  Bot,
  BarChart3,
  BookOpen,
  Brain,
  Award,
  ClipboardCheck,
} from 'lucide-react';
import { storeConsent } from '@/services/consentService';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { addBreadcrumb } from '@/lib/sentry';

const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: '8+', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'A-Z', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'a-z', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: '0-9', test: (p: string) => /[0-9]/.test(p) },
];

type OnboardingStep = 'account' | 'profile' | 'consent';

const STEPS: OnboardingStep[] = ['account', 'profile', 'consent'];
const STEP_LABELS = ['Account', 'Role', 'Terms'];

const ROLE_OPTIONS = [
  {
    value: 'electrician',
    label: 'Electrician',
    subtitle: 'Everything you need on and off site',
    icon: Zap,
    features: [
      { icon: FileCheck, text: 'Certs, RAMS & reports' },
      { icon: Calculator, text: 'Quotes & invoices' },
      { icon: Bot, text: 'AI-powered tools' },
      { icon: BookOpen, text: 'Regs & calculators' },
      { icon: BarChart3, text: 'Job tracking & diary' },
      { icon: BookOpen, text: 'Study centre' },
      { icon: ClipboardCheck, text: 'Site safety tools' },
      { icon: Brain, text: 'Mental health hub' },
    ],
  },
  {
    value: 'apprentice',
    label: 'Apprentice',
    subtitle: 'Your complete training companion',
    icon: GraduationCap,
    features: [
      { icon: BookOpen, text: 'Level 2 & 3 courses' },
      { icon: Brain, text: 'AI tutor & quizzes' },
      { icon: Award, text: 'AM2 exam simulator' },
      { icon: ClipboardCheck, text: 'Portfolio & logbook' },
      { icon: Calculator, text: 'Regs & calculators' },
      { icon: FileCheck, text: 'Progress tracking' },
      { icon: Brain, text: 'Mental health hub' },
      { icon: Award, text: 'Study centre' },
    ],
  },
];

/* ─── Shared sub-components ─── */

const StepBar = ({ currentIndex }: { currentIndex: number }) => (
  <div className="mb-8">
    <div className="flex gap-2">
      {STEPS.map((s, i) => (
        <div key={s} className="flex-1">
          <div className="h-[2px] rounded-full bg-white/[0.10] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-elec-yellow"
              initial={false}
              animate={{ width: i < currentIndex ? '100%' : i === currentIndex ? '50%' : '0%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <span
            className={cn(
              'text-[10px] font-medium uppercase tracking-wider block text-center mt-1.5 transition-colors',
              i <= currentIndex ? 'text-white' : 'text-white'
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
  icon: Icon,
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
  icon: React.ComponentType<{ className?: string }>;
  field: string;
  focusedField: string | null;
  setFocusedField: (f: string | null) => void;
  showToggle?: boolean;
  isVisible?: boolean;
  onToggle?: () => void;
  showSuccess?: boolean;
}) => (
  <div>
    <label className="block text-[12px] font-medium text-white mb-1.5 ml-0.5 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <Icon
        className={cn(
          'absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] transition-colors duration-150',
          focusedField === field ? 'text-elec-yellow' : 'text-white'
        )}
      />
      <input
        type={type === 'password' ? 'text' : type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(field)}
        onBlur={() => setFocusedField(null)}
        placeholder={placeholder}
        autoComplete={type === 'email' ? 'email' : type === 'password' ? 'new-password' : 'name'}
        autoCapitalize={type === 'email' || type === 'password' ? 'none' : 'words'}
        className={cn(
          'w-full h-12 pl-11 pr-10 rounded-xl text-[15px] text-white placeholder:text-white',
          'bg-white/[0.10] outline-none transition-all duration-150 [color-scheme:dark]',
          type === 'password' && !isVisible && 'pw-masked',
          focusedField === field
            ? 'ring-1 ring-elec-yellow/40 bg-white/[0.10]'
            : 'ring-1 ring-white/20 hover:ring-white/30'
        )}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-lg text-white hover:text-white transition-colors touch-manipulation"
        >
          {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}
      {showSuccess && !showToggle && (
        <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-green-400/70" />
      )}
    </div>
  </div>
);

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
  const [profile, setProfile] = useState({ role: '' as string });
  const [consent, setConsent] = useState({
    termsAccepted: false,
    privacyAccepted: false,
    marketingOptIn: false,
    dataProcessingAccepted: false,
  });
  const [userCount, setUserCount] = useState('500+');
  const [checkingEmail, setCheckingEmail] = useState(false);

  const { signUp } = useAuth();
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

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .then(({ count }) => {
        if (count && count > 0) setUserCount(`${Math.floor(count / 10) * 10}+`);
      });
  }, []);

  useEffect(() => {
    const code = searchParams.get('offer');
    if (code) {
      localStorage.setItem('elec-mate-offer-code', code);
      setOfferCode(code);
    }
  }, [searchParams]);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem('elec-mate-referral-code', ref);
      setReferralCode(ref);
    } else {
      const stored = localStorage.getItem('elec-mate-referral-code');
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
    setCheckingEmail(true);
    setError(null);
    try {
      const { data: existing, error: checkErr } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();
      if (checkErr && checkErr.code !== 'PGRST116') {
        /* ignore */
      } else if (existing) {
        setError('An account with this email already exists. Please sign in instead.');
        setCheckingEmail(false);
        return;
      }
    } catch {
      /* ignore */
    }
    setCheckingEmail(false);
    setError(null);
    addBreadcrumb('Signup step: account completed', 'signup', { email });
    setStep('profile');
  };

  const handleProfileSubmit = () => {
    if (!profile.role) {
      setError('Please select your role');
      return;
    }
    setError(null);
    addBreadcrumb('Signup step: profile completed', 'signup', { role: profile.role });
    setStep('consent');
  };

  const ROLE_TO_PRICE: Record<string, { planId: string; priceId: string }> = {
    electrician: { planId: 'electrician-monthly', priceId: 'price_1SqJVr2RKw5t5RAmaiTGelLN' },
    apprentice: { planId: 'apprentice-monthly', priceId: 'price_1SmUef2RKw5t5RAmRIMTWTqU' },
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
      const { error, data } = await signUp(email, password, fullName);
      if (error) {
        setError(error.message);
        setIsSubmitting(false);
        return;
      }
      if (data?.user?.id) {
        localStorage.setItem('elec-mate-profile-role', profile.role);
        const saveRole = async (retries = 3): Promise<boolean> => {
          const payload: Record<string, unknown> = {
            role: profile.role,
            onboarding_completed: false,
            updated_at: new Date().toISOString(),
          };
          const storedRef = localStorage.getItem('elec-mate-referral-code');
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
                  referred_id: data.user!.id,
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
            .eq('id', data.user!.id);
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
        .invoke('send-welcome-email', { body: { userId: data?.user?.id, email, fullName } })
        .catch(() => {});
      const rp = ROLE_TO_PRICE[profile.role];
      if (rp) {
        localStorage.setItem('elec-mate-checkout-planId', rp.planId);
        localStorage.setItem('elec-mate-checkout-priceId', rp.priceId);
      }
      localStorage.removeItem('elec-mate-offer-code');
      localStorage.removeItem('elec-mate-onboarding-data');
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

  return (
    <div className="min-h-[100svh] bg-black flex flex-col">
      <div className="flex-1 flex flex-col px-6 pt-[calc(env(safe-area-inset-top)+12px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
        <div className="w-full max-w-[380px] mx-auto flex-1 flex flex-col">
          {/* Top bar: back + logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between py-3 mb-2"
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
            <div className="flex items-center gap-2">
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
                    <div className="mb-4 p-3 rounded-xl bg-elec-yellow/[0.06] border border-elec-yellow/15 flex items-center gap-3">
                      <Gift className="h-4.5 w-4.5 text-elec-yellow flex-shrink-0" />
                      <div>
                        <p className="text-[12px] font-semibold text-elec-yellow">
                          Referred by a Mate
                        </p>
                        <p className="text-[11px] text-white">Your first month's on us</p>
                      </div>
                    </div>
                  )}
                  {offerCode && (
                    <div className="mb-4 p-3 rounded-xl bg-green-500/[0.06] border border-green-500/15 flex items-center gap-3">
                      <Gift className="h-4.5 w-4.5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-[12px] font-semibold text-green-400">Offer applied</p>
                        <p className="text-[11px] text-white">Discount applied at checkout</p>
                      </div>
                    </div>
                  )}

                  <h1 className="text-[22px] font-semibold text-white tracking-tight mb-1">
                    Create your account
                  </h1>
                  <div className="flex items-center gap-2 mb-6">
                    <p className="text-[13px] text-white">7-day free trial</p>
                    <span className="text-[11px] text-white">·</span>
                    <span className="text-[11px] text-white flex items-center gap-1">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500/50" />
                      {userCount} members
                    </span>
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
                        <p className="text-[13px] text-red-400 bg-red-500/8 border border-red-500/15 rounded-lg px-3.5 py-2.5 text-center">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleAccountSubmit} className="space-y-3.5 flex-1">
                    <InputField
                      label="Full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Smith"
                      icon={User}
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
                      icon={Mail}
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
                        icon={Lock}
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
                      icon={Lock}
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
                        disabled={checkingEmail}
                        className="w-full h-12 rounded-xl text-[15px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-[0_1px_20px_rgba(250,204,21,0.15)] active:scale-[0.98] disabled:opacity-50 transition-all duration-150"
                      >
                        {checkingEmail ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...
                          </>
                        ) : (
                          <>
                            Continue <ArrowRight className="ml-1.5 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>

                  <p className="text-[11px] text-white text-center mt-5">
                    Already have an account?{' '}
                    <Link
                      to="/auth/signin"
                      className="text-elec-yellow/70 hover:text-elec-yellow font-medium"
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
                  <div className="text-center mb-6">
                    <h1 className="text-[22px] font-semibold text-white tracking-tight mb-1">
                      I am an...
                    </h1>
                    <p className="text-[13px] text-white">
                      Select your role to personalise your experience
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
                        <p className="text-[13px] text-red-400 bg-red-500/8 border border-red-500/15 rounded-lg px-3.5 py-2.5 text-center">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-4 flex-1">
                    {ROLE_OPTIONS.map((option, index) => {
                      const selected = profile.role === option.value;
                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + index * 0.1 }}
                          onClick={() => setProfile({ ...profile, role: option.value })}
                          className={cn(
                            'w-full rounded-2xl text-left transition-all duration-200 touch-manipulation p-5',
                            selected
                              ? 'bg-gradient-to-br from-elec-yellow/[0.12] to-amber-500/[0.06] border-2 border-elec-yellow shadow-[0_0_30px_rgba(250,204,21,0.12)]'
                              : 'bg-white/[0.04] border-2 border-white/15 hover:border-elec-yellow/30 hover:bg-elec-yellow/[0.02]'
                          )}
                        >
                          {/* Header row */}
                          <div className="flex items-center gap-4 mb-4">
                            <div
                              className={cn(
                                'w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200',
                                selected
                                  ? 'bg-elec-yellow/20 ring-2 ring-elec-yellow'
                                  : 'bg-elec-yellow/[0.08] ring-2 ring-elec-yellow/20'
                              )}
                            >
                              <option.icon className="h-7 w-7 text-elec-yellow" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-white text-[18px] block">
                                {option.label}
                              </span>
                              <span className="text-[12px] text-elec-yellow block mt-0.5">
                                {option.subtitle}
                              </span>
                            </div>
                            <div
                              className={cn(
                                'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150',
                                selected ? 'bg-elec-yellow' : 'border-2 border-elec-yellow/30'
                              )}
                            >
                              {selected && <Check className="h-3.5 w-3.5 text-black" />}
                            </div>
                          </div>

                          {/* Features grid */}
                          <div
                            className={cn(
                              'border-t pt-4',
                              selected ? 'border-elec-yellow/20' : 'border-white/10'
                            )}
                          >
                            <div className="grid grid-cols-2 gap-3">
                              {option.features.map((f) => (
                                <div key={f.text} className="flex items-center gap-2.5">
                                  <div
                                    className={cn(
                                      'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
                                      selected ? 'bg-elec-yellow/15' : 'bg-elec-yellow/[0.06]'
                                    )}
                                  >
                                    <f.icon className="h-3.5 w-3.5 text-elec-yellow" />
                                  </div>
                                  <span className="text-[12px] text-white leading-tight">
                                    {f.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="pt-5">
                    <Button
                      onClick={handleProfileSubmit}
                      disabled={!profile.role}
                      className="w-full h-12 rounded-xl text-[15px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-[0_1px_20px_rgba(250,204,21,0.15)] active:scale-[0.98] disabled:opacity-30 transition-all duration-150"
                    >
                      Continue <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>

                    {/* Trial note */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Shield className="h-3.5 w-3.5 text-elec-yellow" />
                      <span className="text-[11px] text-white">
                        7-day free trial · No charge today · Cancel anytime
                      </span>
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
                  {/* Header with icon */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="w-14 h-14 rounded-2xl bg-elec-yellow/10 ring-2 ring-elec-yellow/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <Shield className="h-7 w-7 text-elec-yellow" />
                    </motion.div>
                    <h1 className="text-[22px] font-semibold text-white tracking-tight mb-1">
                      One last step
                    </h1>
                    <p className="text-[13px] text-white">We take your privacy seriously</p>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-hidden"
                      >
                        <p className="text-[13px] text-red-400 bg-red-500/8 border border-red-500/15 rounded-lg px-3.5 py-2.5 text-center">
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
                      className="w-full mb-5 py-3 rounded-xl bg-elec-yellow/[0.08] border-2 border-elec-yellow/20 text-[14px] font-semibold text-elec-yellow flex items-center justify-center gap-2 touch-manipulation hover:bg-elec-yellow/[0.12] transition-colors"
                    >
                      <Check className="h-4 w-4" /> Accept all required
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
                          <Checkbox
                            checked={checked}
                            className="h-5 w-5 rounded border-white/25 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 flex-shrink-0"
                          />
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
                      className="w-full h-12 rounded-xl text-[15px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-[0_1px_20px_rgba(250,204,21,0.15)] active:scale-[0.98] disabled:opacity-30 transition-all duration-150"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                        </>
                      ) : (
                        <>
                          Create account <ArrowRight className="ml-1.5 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {/* Trial + trust note */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Shield className="h-3.5 w-3.5 text-elec-yellow" />
                      <span className="text-[11px] text-white">
                        7-day free trial · No charge today · Cancel anytime
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
