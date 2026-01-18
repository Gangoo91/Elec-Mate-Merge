import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Zap,
  Briefcase,
  BadgeCheck,
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

const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: '8+', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'A-Z', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'a-z', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: '0-9', test: (p: string) => /[0-9]/.test(p) },
];

type OnboardingStep = 'account' | 'profile' | 'elec-id' | 'consent' | 'complete';

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
  const [profile, setProfile] = useState({ role: '' as string, ecsCardType: '', createElecId: true });
  const [consent, setConsent] = useState({
    termsAccepted: false,
    privacyAccepted: false,
    marketingOptIn: false,
    dataProcessingAccepted: false,
  });
  const [generatedElecId, setGeneratedElecId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'apprentice', label: 'Apprentice', icon: GraduationCap },
    { value: 'electrician', label: 'Electrician', icon: Zap },
    { value: 'employer', label: 'Employer', icon: Briefcase }
  ];

  const allPasswordRequirementsMet = PASSWORD_REQUIREMENTS.every(req => req.test(password));
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleAccountSubmit = (e: React.FormEvent) => {
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
    setError(null);
    setStep('profile');
  };

  const handleProfileSubmit = () => {
    if (!profile.role) {
      setError('Please select your role');
      return;
    }
    setError(null);
    setStep('elec-id');
  };

  const handleElecIdSubmit = () => {
    setError(null);
    setStep('consent');
  };

  const handleFinalSubmit = async () => {
    if (!consent.termsAccepted || !consent.privacyAccepted || !consent.dataProcessingAccepted) {
      setError('Please accept the required terms');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      const { error, data } = await signUp(email, password, fullName);
      if (error) {
        setError(error.message);
        setIsSubmitting(false);
        return;
      }

      // Store onboarding data for later sync
      localStorage.setItem('elec-mate-onboarding', JSON.stringify({
        ...profile,
        consent: { ...consent, timestamp: new Date().toISOString() },
        completedAt: new Date().toISOString()
      }));

      // Store email and name for the check-email page
      localStorage.setItem('elec-mate-pending-email', email);
      localStorage.setItem('elec-mate-pending-name', fullName);

      await storeConsent({
        email,
        full_name: fullName,
        terms_accepted: consent.termsAccepted,
        privacy_accepted: consent.privacyAccepted,
        data_processing_accepted: consent.dataProcessingAccepted,
        marketing_opt_in: consent.marketingOptIn,
        consent_timestamp: new Date().toISOString()
      });

      // Store Elec-ID preference for later (after email confirmation)
      if (profile.createElecId && data?.user?.id) {
        localStorage.setItem('elec-mate-pending-elecid', JSON.stringify({
          createElecId: true,
          ecsCardType: profile.ecsCardType,
          userId: data.user.id
        }));
      }

      // Send branded confirmation email via Resend
      try {
        await supabase.functions.invoke('send-confirmation-email', {
          body: { email, fullName },
        });
        console.log('Confirmation email sent');
      } catch (emailErr) {
        console.warn('Confirmation email failed (non-critical):', emailErr);
      }

      // Redirect to check-email page instead of dashboard
      navigate('/auth/check-email');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setError(null);
    if (step === 'profile') setStep('account');
    else if (step === 'elec-id') setStep('profile');
    else if (step === 'consent') setStep('elec-id');
  };

  useEffect(() => {
    if (step === 'complete') {
      const timer = setTimeout(() => navigate('/dashboard'), 3000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  // Success overlay
  const SuccessOverlay = () => (
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
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
            <p className="text-lg text-white font-semibold">Welcome to Elec-Mate!</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Completion screen
  if (step === 'complete') {
    return (
      <div className="bg-gradient-to-b from-zinc-900 via-black to-black flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to Elec-Mate!</h1>
          <p className="text-white/60 mb-6">Taking you to your dashboard...</p>
          {generatedElecId && (
            <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
              <p className="text-sm text-white/70 mb-1">Your Elec-ID</p>
              <p className="text-xl font-bold text-elec-yellow">{generatedElecId}</p>
            </div>
          )}
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow mx-auto" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col safe-top safe-bottom overflow-hidden">
      <SuccessOverlay />

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
        className="relative w-full px-4 pt-4 pb-2 z-10"
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
      <main className="relative flex-1 flex flex-col justify-center px-5 py-4 z-10">
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
                {/* Title */}
                <div className="text-center mb-6">
                  <motion.h1 className="text-[28px] font-bold text-white tracking-tight mb-2">
                    Create Account
                  </motion.h1>
                  <p className="text-[15px] text-white/50">Start your 7-day free trial</p>
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

                <form onSubmit={handleAccountSubmit} className="space-y-4">
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
                      <div className="flex gap-1.5 mt-2">
                        {PASSWORD_REQUIREMENTS.map((req) => (
                          <div key={req.id} className={cn(
                            "flex-1 py-1.5 rounded-lg text-center text-[11px] font-medium transition-all",
                            req.test(password) ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/40"
                          )}>
                            {req.label}
                          </div>
                        ))}
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
                    className={cn(
                      "w-full h-14 rounded-2xl text-[16px] font-semibold",
                      "bg-elec-yellow hover:bg-elec-yellow/90 text-black",
                      "shadow-lg shadow-elec-yellow/25 transition-all duration-200"
                    )}
                  >
                    Continue <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[12px] text-white/30 uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Sign in link */}
                <div className="text-center">
                  <p className="text-[14px] text-white/40 mb-3">Already have an account?</p>
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

            {/* Step 3: Elec-ID */}
            {step === 'elec-id' && (
              <motion.div
                key="elec-id"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h1 className="text-[28px] font-bold text-white tracking-tight">Get Your Elec-ID</h1>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500 text-white rounded-full">FREE</span>
                  </div>
                  <p className="text-[15px] text-white/50">Your digital credential - no cost, ever</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    {['Store qualifications', 'Share via QR', 'Find work', 'Verifiable credential'].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[13px] text-white/70">
                        <Check className="h-4 w-4 text-green-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, createElecId: !profile.createElecId })}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 text-left transition-all touch-manipulation mb-4",
                    profile.createElecId
                      ? "border-elec-yellow bg-elec-yellow/10 shadow-[0_0_0_4px_rgba(255,209,0,0.1)]"
                      : "border-white/10 bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={profile.createElecId} className="h-6 w-6 border-2 border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black" />
                    <div>
                      <p className="font-semibold text-white text-[16px]">Yes, create my Elec-ID</p>
                      <p className="text-[13px] text-white/50">It's free forever</p>
                    </div>
                  </div>
                </button>

                {profile.createElecId && (
                  <div className="mb-6">
                    <label className="block text-[13px] font-medium text-white/70 ml-1 mb-2">ECS Card Type (optional)</label>
                    <MobileSelectPicker
                      value={profile.ecsCardType}
                      onValueChange={(value) => setProfile({ ...profile, ecsCardType: value })}
                      options={[
                        { value: 'none', label: 'No ECS card yet' },
                        { value: 'apprentice', label: 'Apprentice' },
                        { value: 'installation', label: 'Installation Electrician' },
                        { value: 'approved', label: 'Approved Electrician' }
                      ]}
                      placeholder="Select card type..."
                      title="ECS Card Type"
                    />
                  </div>
                )}

                <Button
                  onClick={handleElecIdSubmit}
                  className="w-full h-14 rounded-2xl text-[16px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-lg shadow-elec-yellow/25"
                >
                  Continue <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}

            {/* Step 4: Consent */}
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

export default SignUp;
