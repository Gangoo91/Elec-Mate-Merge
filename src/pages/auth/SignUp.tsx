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
  Sparkles,
  AlertTriangle,
  Eye,
  EyeOff
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

// InputField component - MUST be outside SignUp to prevent re-creation on every render
interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  field: string;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  showToggle?: boolean;
  isVisible?: boolean;
  onToggle?: () => void;
  showSuccess?: boolean;
}

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  field,
  focusedField,
  setFocusedField,
  showToggle = false,
  isVisible = false,
  onToggle = () => {},
  showSuccess = false
}: InputFieldProps) => (
  <div className="space-y-2">
    <label className="block text-[13px] font-medium text-white/70 ml-1">{label}</label>
    <div className="relative">
      <div className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
        focusedField === field ? "text-elec-yellow" : "text-white/40"
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <input
        type={showToggle ? (isVisible ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(field)}
        onBlur={() => setFocusedField(null)}
        placeholder={placeholder}
        autoComplete={type === "email" ? "email" : type === "password" ? "new-password" : "off"}
        className={cn(
          "w-full h-14 pl-14 pr-12 rounded-2xl",
          "bg-white/[0.06] border-2 text-white placeholder:text-white/30",
          "text-[16px] outline-none transition-all duration-200",
          focusedField === field
            ? "border-elec-yellow/50 bg-white/[0.08] shadow-[0_0_0_4px_rgba(255,209,0,0.1)]"
            : "border-white/10 hover:border-white/20"
        )}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 active:text-white transition-colors h-11 w-11 flex items-center justify-center touch-manipulation rounded-xl"
        >
          {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
      {showSuccess && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
          </div>
        </motion.div>
      )}
    </div>
  </div>
);

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

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [offerCode, setOfferCode] = useState<string | null>(null);

  // Capture offer code from URL
  useEffect(() => {
    const code = searchParams.get('offer');
    if (code) {
      localStorage.setItem('elec-mate-offer-code', code);
      setOfferCode(code);
      console.log('Offer code captured:', code);
    }
  }, [searchParams]);

  // Note: 'employer' role requires a paid subscription and is not available at free signup
  // Employers must subscribe through the employer pricing page to get access
  const roleOptions = [
    { value: 'electrician', label: 'Electrician', icon: Zap },
    { value: 'apprentice', label: 'Apprentice', icon: GraduationCap },
  ];

  const allPasswordRequirementsMet = PASSWORD_REQUIREMENTS.every(req => req.test(password));
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const [checkingEmail, setCheckingEmail] = useState(false);

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

    // Check if email already exists
    setCheckingEmail(true);
    setError(null);
    try {
      const { data: existingUsers, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.warn('Email check error:', checkError);
        // Continue anyway - signup will catch duplicates
      } else if (existingUsers) {
        setError('An account with this email already exists. Please sign in instead.');
        setCheckingEmail(false);
        return;
      }
    } catch (err) {
      console.warn('Email check failed:', err);
      // Continue anyway - signup will catch duplicates
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

  // Stripe price IDs mapped by role
  const ROLE_TO_PRICE: Record<string, { planId: string; priceId: string }> = {
    electrician: { planId: 'electrician-monthly', priceId: 'price_1SqJVr2RKw5t5RAmaiTGelLN' },
    apprentice: { planId: 'apprentice-monthly', priceId: 'price_1SmUef2RKw5t5RAmRIMTWTqU' },
  };

  const handleFinalSubmit = async () => {
    if (!consent.termsAccepted || !consent.privacyAccepted || !consent.dataProcessingAccepted) {
      setError('Please accept the required terms');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    addBreadcrumb('Signup step: consent completed, submitting', 'signup', { marketingOptIn: consent.marketingOptIn });

    try {
      const { error, data } = await signUp(email, password, fullName);
      if (error) {
        setError(error.message);
        setIsSubmitting(false);
        return;
      }

      // Save role to database with onboarding_completed = false (they haven't paid yet)
      if (data?.user?.id) {
        const { error: profileError } = await supabase.from('profiles').update({
          role: profile.role,
          onboarding_completed: false,
          updated_at: new Date().toISOString(),
        }).eq('id', data.user.id);

        if (profileError) {
          console.error('Error saving profile during signup:', profileError);
          localStorage.setItem('elec-mate-profile-role', profile.role);
        } else {
          console.log('Profile role saved immediately during signup');
        }
      }

      // Store consent (GDPR compliance) - non-blocking
      const consentResult = await storeConsent({
        email,
        full_name: fullName,
        terms_accepted: consent.termsAccepted,
        privacy_accepted: consent.privacyAccepted,
        data_processing_accepted: consent.dataProcessingAccepted,
        marketing_opt_in: consent.marketingOptIn,
        consent_timestamp: new Date().toISOString()
      });

      if (!consentResult.success) {
        console.warn('Consent DB storage failed (non-critical):', consentResult.error);
      }

      // Send welcome email (non-blocking)
      supabase.functions.invoke('send-welcome-email', {
        body: {
          userId: data?.user?.id,
          email: email,
          fullName: fullName,
        },
      }).catch((emailErr) => {
        console.warn('Welcome email failed (non-critical):', emailErr);
      });

      // Store planId + priceId for checkout page based on role
      const rolePrice = ROLE_TO_PRICE[profile.role];
      if (rolePrice) {
        localStorage.setItem('elec-mate-checkout-planId', rolePrice.planId);
        localStorage.setItem('elec-mate-checkout-priceId', rolePrice.priceId);
      }

      // Clean up localStorage items used during onboarding
      localStorage.removeItem('elec-mate-offer-code');
      localStorage.removeItem('elec-mate-onboarding-data');
      localStorage.removeItem('elec-mate-profile-role');

      // Redirect to checkout trial page to collect card details
      navigate('/checkout-trial');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setError(null);
    if (step === 'profile') setStep('account');
    else if (step === 'consent') setStep('profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col overflow-auto">

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
        transition={{ duration: 0.4 }}
        className="relative w-full px-4 pt-[calc(env(safe-area-inset-top)+16px)] pb-1 z-10"
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          {step === 'account' ? (
            <Link to="/" className="flex items-center gap-1 text-white/70 hover:text-white transition-colors p-2 -ml-2 rounded-xl">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-[15px] font-medium">Back</span>
            </Link>
          ) : (
            <button onClick={goBack} className="flex items-center gap-1 text-white/70 hover:text-white transition-colors p-2 -ml-2 rounded-xl">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-[15px] font-medium">Back</span>
            </button>
          )}

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center shadow-lg shadow-elec-yellow/30">
              <Zap className="h-5 w-5 text-black" />
            </div>
          </motion.div>

          <div className="w-16" />
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col justify-start px-5 py-2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md mx-auto"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Account */}
            {step === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Offer Banner */}
                {offerCode && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Gift className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-400">Special Offer Applied</p>
                        <p className="text-xs text-white/60">Your discount will be applied at checkout</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Title */}
                <div className="text-center mb-4">
                  <motion.h1 className="text-[26px] font-bold text-white tracking-tight mb-1">
                    Create Account
                  </motion.h1>
                  <p className="text-[14px] text-white/50">Start your 7-day free trial</p>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20"
                    >
                      <div className="flex gap-3 items-center">
                        <AlertTriangle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                        <p className="text-[14px] text-elec-yellow font-medium">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleAccountSubmit} className="space-y-3">
                  <InputField
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Smith"
                    icon={User}
                    field="name"
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                  />

                  <InputField
                    label="Email address"
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
                      <div className="space-y-2 mt-2">
                        <div className="flex gap-1.5">
                          {PASSWORD_REQUIREMENTS.map((req) => (
                            <div key={req.id} className={cn(
                              "flex-1 py-1.5 rounded-lg text-center text-[11px] font-medium transition-all",
                              req.test(password) ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/40"
                            )}>
                              {req.label}
                            </div>
                          ))}
                        </div>
                        {allPasswordRequirementsMet && (
                          <p className="text-[11px] text-white/40 text-center">
                            Avoid common passwords like "Password123"
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <InputField
                    label="Confirm Password"
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

                  <Button
                    type="submit"
                    disabled={checkingEmail}
                    className={cn(
                      "w-full h-14 rounded-2xl text-[16px] font-semibold",
                      "bg-elec-yellow hover:bg-elec-yellow/90 text-black",
                      "shadow-lg shadow-elec-yellow/25 transition-all duration-200",
                      "disabled:opacity-50"
                    )}
                  >
                    {checkingEmail ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Checking...</>
                    ) : (
                      <>Continue <ArrowRight className="ml-2 h-5 w-5" /></>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[12px] text-white/30 uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Sign in link */}
                <div className="text-center">
                  <p className="text-[14px] text-white/40 mb-2">Already have an account?</p>
                  <Link to="/auth/signin">
                    <Button variant="outline" className="w-full h-13 rounded-2xl text-[15px] font-semibold bg-transparent border-2 border-white/10 text-white hover:bg-white/5">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Step 2: Role */}
            {step === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-6">
                  <h1 className="text-[28px] font-bold text-white tracking-tight mb-2">What's your role?</h1>
                  <p className="text-[15px] text-white/50">We'll personalise your experience</p>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20"
                    >
                      <div className="flex gap-3 items-center">
                        <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                        <p className="text-[14px] text-elec-yellow font-medium">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-3 mb-6">
                  {roleOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setProfile({ ...profile, role: option.value })}
                      className={cn(
                        "w-full p-4 rounded-2xl border-2 text-left transition-all touch-manipulation",
                        profile.role === option.value
                          ? "border-elec-yellow bg-elec-yellow/10 shadow-[0_0_0_4px_rgba(255,209,0,0.1)]"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          profile.role === option.value ? "bg-elec-yellow/20" : "bg-white/10"
                        )}>
                          <option.icon className={cn("h-6 w-6", profile.role === option.value ? "text-elec-yellow" : "text-white/50")} />
                        </div>
                        <span className="font-semibold text-white text-[16px]">{option.label}</span>
                        {profile.role === option.value && <Check className="h-5 w-5 text-elec-yellow ml-auto" />}
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleProfileSubmit}
                  disabled={!profile.role}
                  className="w-full h-14 rounded-2xl text-[16px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-lg shadow-elec-yellow/25 disabled:opacity-50"
                >
                  Continue <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}

            {/* Step 3: Consent */}
            {step === 'consent' && (
              <motion.div
                key="consent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-7 w-7 text-green-400" />
                  </div>
                  <h1 className="text-[28px] font-bold text-white tracking-tight mb-2">Almost there!</h1>
                  <p className="text-[15px] text-white/50">Your data, your control</p>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20"
                    >
                      <div className="flex gap-3 items-center">
                        <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                        <p className="text-[14px] text-elec-yellow font-medium">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2 mb-4">
                  {[
                    { key: 'termsAccepted', label: 'Terms of Service', required: true },
                    { key: 'privacyAccepted', label: 'Privacy Policy', required: true },
                    { key: 'dataProcessingAccepted', label: 'Data processing', required: true },
                    { key: 'marketingOptIn', label: 'Updates & offers', required: false }
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setConsent({ ...consent, [item.key]: !consent[item.key as keyof typeof consent] })}
                      className={cn(
                        "w-full p-4 rounded-2xl border-2 text-left transition-all touch-manipulation flex items-center gap-3",
                        consent[item.key as keyof typeof consent]
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20"
                      )}
                    >
                      <Checkbox
                        checked={consent[item.key as keyof typeof consent]}
                        className="h-6 w-6 border-2 border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                      />
                      <span className="text-[15px] text-white">{item.label}</span>
                      {item.required && <span className="text-elec-yellow text-[12px] ml-auto">Required</span>}
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting || !consent.termsAccepted || !consent.privacyAccepted || !consent.dataProcessingAccepted}
                  className="w-full h-14 rounded-2xl text-[16px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-lg shadow-elec-yellow/25 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating Account...</>
                  ) : (
                    <>Create Account <ArrowRight className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
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
        className="relative px-6 pb-4 pt-2 z-10"
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

export default SignUp;
