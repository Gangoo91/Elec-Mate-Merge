import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IOSInput } from '@/components/ui/ios-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  X,
  ChevronLeft,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { storeConsent } from '@/services/consentService';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

// Password requirements
const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: '8+ characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'Uppercase', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'Lowercase', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'Number', test: (p: string) => /[0-9]/.test(p) },
];

type OnboardingStep = 'account' | 'profile' | 'elec-id' | 'consent' | 'complete';

interface UserProfile {
  role: 'apprentice' | 'electrician' | 'employer' | '';
  ecsCardType: string;
  createElecId: boolean;
}

interface ConsentData {
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingOptIn: boolean;
  dataProcessingAccepted: boolean;
  timestamp: string;
}

const SignUp = () => {
  const [step, setStep] = useState<OnboardingStep>('account');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    role: '',
    ecsCardType: '',
    createElecId: false
  });
  const [consent, setConsent] = useState<ConsentData>({
    termsAccepted: false,
    privacyAccepted: false,
    marketingOptIn: false,
    dataProcessingAccepted: false,
    timestamp: ''
  });
  const [showElecIdConfirm, setShowElecIdConfirm] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'apprentice', label: 'Apprentice', description: 'Currently training', icon: GraduationCap, color: 'blue' },
    { value: 'electrician', label: 'Electrician', description: 'Qualified professional', icon: Zap, color: 'yellow' },
    { value: 'employer', label: 'Employer', description: 'Business owner', icon: Briefcase, color: 'purple' }
  ];

  const ecsCardTypes = [
    { value: 'none', label: "No ECS card yet" },
    { value: 'apprentice', label: 'Apprentice' },
    { value: 'installation', label: 'Installation Electrician' },
    { value: 'approved', label: 'Approved Electrician' }
  ];

  // Password strength
  const getPasswordStrength = (pwd: string) => {
    const passed = PASSWORD_REQUIREMENTS.filter(req => req.test(pwd)).length;
    if (passed === 0) return { level: 0, label: '', color: '' };
    if (passed === 1) return { level: 1, label: 'Weak', color: 'bg-red-500' };
    if (passed === 2) return { level: 2, label: 'Fair', color: 'bg-orange-500' };
    if (passed === 3) return { level: 3, label: 'Good', color: 'bg-yellow-500' };
    return { level: 4, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);
  const allPasswordRequirementsMet = PASSWORD_REQUIREMENTS.every(req => req.test(password));

  const stepIndexMap = { account: 0, profile: 1, 'elec-id': 2, consent: 3, complete: 4 };
  const currentStepIndex = stepIndexMap[step];

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !fullName) {
      setError('Please fill in all fields');
      return;
    }
    if (!allPasswordRequirementsMet) {
      setError('Please meet all password requirements');
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

    const consentWithTimestamp = { ...consent, timestamp: new Date().toISOString() };

    try {
      const { error, data } = await signUp(email, password, fullName);

      if (error) {
        setError(error.message);
        setIsSubmitting(false);
        return;
      }

      // Store onboarding data including Elec-ID preference
      const onboardingData = {
        ...profile,
        consent: consentWithTimestamp,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('elec-mate-onboarding', JSON.stringify(onboardingData));

      await storeConsent({
        email,
        full_name: fullName,
        terms_accepted: consent.termsAccepted,
        privacy_accepted: consent.privacyAccepted,
        data_processing_accepted: consent.dataProcessingAccepted,
        marketing_opt_in: consent.marketingOptIn,
        consent_timestamp: consentWithTimestamp.timestamp
      });

      // If user opted for Elec-ID, try to generate it now (will be created on first login if profile not ready)
      if (profile.createElecId && data?.user?.id) {
        try {
          await supabase.functions.invoke('generate-elec-id', {
            body: {
              user_id: data.user.id,
              ecs_card_type: profile.ecsCardType || null
            }
          });
        } catch (elecIdError) {
          // Store intent for later - will be picked up on first login
          localStorage.setItem('elec-mate-pending-elecid', JSON.stringify({
            createElecId: true,
            ecsCardType: profile.ecsCardType
          }));
          console.log('Elec-ID will be generated on first login');
        }
      }

      setStep('complete');
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

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.5, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    }
  };

  const errorShakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  // Completion screen
  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 safe-top safe-bottom overflow-hidden">
        {/* Animated celebration background */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-green-500/5 to-transparent"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-green-500/20 blur-[120px]"
          />
          {/* Celebration particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, x: Math.random() * 300 - 150 }}
              animate={{
                opacity: [0, 1, 0],
                y: -200,
                x: Math.random() * 200 - 100
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute bottom-1/4 left-1/2"
            >
              <Sparkles className="h-4 w-4 text-elec-yellow" />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-sm text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-500/30 to-green-600/20 flex items-center justify-center mx-auto shadow-lg shadow-green-500/20 border border-green-500/30"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
              >
                <CheckCircle2 className="h-12 w-12 text-green-400" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-[28px] font-bold text-white tracking-tight mb-2">
            Welcome to Elec-Mate!
          </motion.h1>
          <motion.p variants={itemVariants} className="text-ios-body text-white/60 mb-8">
            Your account is ready. Let's get started!
          </motion.p>

          <motion.div variants={itemVariants}>
            <Card variant="ios" className="mb-4 border-green-500/20 bg-white/[0.04]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-green-600/20 flex items-center justify-center">
                    <Gift className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-ios-headline font-semibold text-white">7-Day Free Trial Active</p>
                    <p className="text-ios-caption-1 text-white/50">Full access, no card required</p>
                  </div>
                  <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-ios-caption-2 font-medium">
                    Active
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {profile.createElecId && (
            <motion.div variants={itemVariants}>
              <Card variant="ios" className="border-elec-yellow/20 bg-white/[0.04] mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 flex items-center justify-center">
                      <BadgeCheck className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-ios-headline font-semibold text-white">Elec-ID Requested</p>
                      <p className="text-ios-caption-1 text-white/50">Ready after verification</p>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-elec-yellow/20 text-elec-yellow text-ios-caption-2 font-medium">
                      Pending
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Button asChild variant="ios-primary" size="ios-large" className="w-full h-[56px] shadow-lg shadow-elec-yellow/20">
              <Link to="/auth/signin">
                Continue to Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col safe-top safe-bottom overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-elec-yellow/8 via-elec-yellow/3 to-transparent"
        />
        {/* Animated orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.18, 0.12]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-elec-yellow/15 blur-[100px]"
        />
        {/* Secondary orb */}
        <motion.div
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[80px]"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full px-4 pt-4 pb-2 z-10"
      >
        <div className="flex items-center justify-between">
          {step === 'account' ? (
            <Link
              to="/"
              className="flex items-center gap-1 text-elec-yellow ios-pressable p-2 -ml-2 rounded-xl active:bg-white/5"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-ios-body font-medium">Home</span>
            </Link>
          ) : (
            <motion.button
              onClick={goBack}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-elec-yellow ios-pressable p-2 -ml-2 rounded-xl active:bg-white/5"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-ios-body font-medium">Back</span>
            </motion.button>
          )}

          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center shadow-lg shadow-elec-yellow/20">
              <Zap className="h-5 w-5 text-black" />
            </div>
          </motion.div>

          <div className="w-16" />
        </div>
      </motion.header>

      {/* Step indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 py-4 relative z-10"
      >
        <div className="max-w-sm mx-auto">
          {/* Step dots with progress bar */}
          <div className="relative flex items-center justify-between">
            {/* Progress bar background */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/10 rounded-full" />
            {/* Progress bar fill */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStepIndex / 3) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-elec-yellow to-elec-yellow/80 rounded-full"
            />
            {/* Step dots */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * i, type: "spring", stiffness: 400 }}
                className={cn(
                  "relative w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                  i < currentStepIndex
                    ? "bg-elec-yellow shadow-lg shadow-elec-yellow/30"
                    : i === currentStepIndex
                      ? "bg-elec-yellow/20 border-2 border-elec-yellow"
                      : "bg-white/10 border border-white/20"
                )}
              >
                {i < currentStepIndex ? (
                  <Check className="h-4 w-4 text-black" />
                ) : (
                  <span className={cn(
                    "text-ios-caption-1 font-semibold",
                    i === currentStepIndex ? "text-elec-yellow" : "text-white/40"
                  )}>
                    {i + 1}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          {/* Step labels */}
          <div className="flex justify-between mt-2">
            {['Account', 'Role', 'Elec-ID', 'Consent'].map((label, i) => (
              <span
                key={label}
                className={cn(
                  "text-ios-caption-2 w-16 text-center",
                  i <= currentStepIndex ? "text-white/70" : "text-white/30"
                )}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Free trial badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mb-4 relative z-10"
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-ios-footnote font-semibold shadow-lg shadow-elec-yellow/10">
          <Gift className="h-4 w-4" />
          7-Day Free Trial
          <Sparkles className="h-3 w-3 opacity-70" />
        </div>
      </motion.div>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col px-6 pb-8 z-10">
        <div className="w-full max-w-sm mx-auto flex-1 flex flex-col">
          {/* Error display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 overflow-hidden"
              >
                <motion.div
                  animate={error ? "shake" : ""}
                  variants={errorShakeVariants}
                  className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <p className="text-ios-subhead text-red-400 font-medium">{error}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* Step 1: Account */}
            {step === 'account' && (
              <motion.div
                key="account"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col"
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants} className="text-center mb-6">
                    <h1 className="text-[28px] font-bold text-white tracking-tight mb-1">Create Account</h1>
                    <p className="text-ios-body text-white/50">Start your free trial today</p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    {/* Card glow effect */}
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent rounded-[28px] opacity-50" />
                      <Card variant="ios-elevated" className="relative p-6 bg-white/[0.04] backdrop-blur-xl border-white/[0.08]">
                        <form onSubmit={handleAccountSubmit} className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                          >
                            <IOSInput
                              label="Full Name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="John Smith"
                              autoComplete="name"
                              icon={<User className="h-5 w-5" />}
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25, type: "spring", stiffness: 300 }}
                          >
                            <IOSInput
                              label="Email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              autoComplete="email"
                              icon={<Mail className="h-5 w-5" />}
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                          >
                            <IOSInput
                              label="Password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Create password"
                              autoComplete="new-password"
                              icon={<Lock className="h-5 w-5" />}
                            />

                            {/* Password strength */}
                            <AnimatePresence>
                              {password && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 space-y-2 overflow-hidden"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(passwordStrength.level / 4) * 100}%` }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className={cn("h-full transition-colors duration-300", passwordStrength.color)}
                                      />
                                    </div>
                                    {passwordStrength.label && (
                                      <span className={cn(
                                        "text-ios-caption-1 font-semibold",
                                        passwordStrength.level <= 1 && "text-red-400",
                                        passwordStrength.level === 2 && "text-orange-400",
                                        passwordStrength.level === 3 && "text-yellow-400",
                                        passwordStrength.level === 4 && "text-green-400"
                                      )}>
                                        {passwordStrength.label}
                                      </span>
                                    )}
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {PASSWORD_REQUIREMENTS.map((req) => {
                                      const passed = req.test(password);
                                      return (
                                        <motion.div
                                          key={req.id}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          className={cn(
                                            "flex items-center gap-1.5 text-ios-caption-1 p-1.5 rounded-lg transition-all",
                                            passed ? "text-green-400 bg-green-500/10" : "text-white/40"
                                          )}
                                        >
                                          {passed ? (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                          ) : (
                                            <X className="h-3.5 w-3.5" />
                                          )}
                                          {req.label}
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
                          >
                            <IOSInput
                              label="Confirm Password"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm password"
                              autoComplete="new-password"
                              icon={<Lock className="h-5 w-5" />}
                              error={confirmPassword && password !== confirmPassword ? "Passwords don't match" : undefined}
                              success={confirmPassword.length > 0 && password === confirmPassword}
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                            className="pt-2"
                          >
                            <Button type="submit" variant="ios-primary" size="ios-large" className="w-full h-[56px] shadow-lg shadow-elec-yellow/20">
                              Continue
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </motion.div>
                        </form>
                      </Card>
                    </div>
                  </motion.div>

                  <motion.p variants={itemVariants} className="text-center text-ios-footnote text-white/50 mt-6">
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-elec-yellow font-semibold">Sign in</Link>
                  </motion.p>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Profile/Role */}
            {step === 'profile' && (
              <motion.div
                key="profile"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col"
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants} className="text-center mb-6">
                    <h1 className="text-[28px] font-bold text-white tracking-tight mb-1">What's your role?</h1>
                    <p className="text-ios-body text-white/50">We'll personalise your experience</p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-3 mb-6 flex-1">
                    {roleOptions.map((option, index) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => setProfile({ ...profile, role: option.value as any })}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.08, type: "spring", stiffness: 300 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
                          profile.role === option.value
                            ? "border-elec-yellow bg-gradient-to-r from-elec-yellow/15 to-elec-yellow/5 shadow-lg shadow-elec-yellow/10"
                            : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/20"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200",
                            profile.role === option.value
                              ? option.color === 'blue' ? "bg-blue-500/20" : option.color === 'yellow' ? "bg-elec-yellow/20" : "bg-purple-500/20"
                              : "bg-white/10"
                          )}>
                            <option.icon className={cn(
                              "h-7 w-7 transition-colors duration-200",
                              profile.role === option.value
                                ? option.color === 'blue' ? "text-blue-400" : option.color === 'yellow' ? "text-elec-yellow" : "text-purple-400"
                                : "text-white/50"
                            )} />
                          </div>
                          <div className="flex-1">
                            <p className="text-ios-headline text-white font-semibold">{option.label}</p>
                            <p className="text-ios-caption-1 text-white/50">{option.description}</p>
                          </div>
                          <motion.div
                            initial={false}
                            animate={{
                              scale: profile.role === option.value ? 1 : 0.8,
                              opacity: profile.role === option.value ? 1 : 0.5
                            }}
                            className={cn(
                              "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                              profile.role === option.value
                                ? "border-elec-yellow bg-elec-yellow"
                                : "border-white/30"
                            )}
                          >
                            {profile.role === option.value && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <Check className="h-4 w-4 text-black" />
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      onClick={handleProfileSubmit}
                      variant="ios-primary"
                      size="ios-large"
                      className="w-full h-[56px] shadow-lg shadow-elec-yellow/20"
                      disabled={!profile.role}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Elec-ID */}
            {step === 'elec-id' && (
              <motion.div
                key="elec-id"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col"
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants} className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h1 className="text-[28px] font-bold text-white tracking-tight">Get Your Elec-ID</h1>
                      <span className="px-2 py-0.5 text-xs font-bold bg-green-500 text-white rounded-full animate-pulse">FREE</span>
                    </div>
                    <p className="text-ios-body text-white/50">Your digital credential - no cost, ever</p>
                  </motion.div>

                  {/* Elec-ID benefits card */}
                  <motion.div variants={itemVariants}>
                    <Card variant="ios" className="border-elec-yellow/30 mb-4 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl overflow-hidden">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 flex items-center justify-center shadow-lg shadow-elec-yellow/20">
                            <BadgeCheck className="h-7 w-7 text-elec-yellow" />
                          </div>
                          <div>
                            <p className="text-ios-headline text-white font-semibold">Elec-ID Benefits</p>
                            <p className="text-ios-caption-1 text-green-400 font-medium">100% Free - Always</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { text: 'Worker-owned professional identity', icon: '🔐' },
                            { text: 'Find work opportunities in Elec-Mate', icon: '💼' },
                            { text: 'Store all qualifications in one place', icon: '📜' },
                            { text: 'Share via QR code with employers', icon: '📱' },
                            { text: 'Verifiable digital credential', icon: '✅' },
                          ].map((item, idx) => (
                            <motion.div
                              key={item.text}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                              className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 text-ios-caption-1 text-white/80"
                            >
                              <span className="text-base">{item.icon}</span>
                              <span>{item.text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Opt-in toggle */}
                  <motion.button
                    variants={itemVariants}
                    type="button"
                    onClick={() => {
                      if (profile.createElecId) {
                        // User wants to uncheck - show confirmation
                        setShowElecIdConfirm(true);
                      } else {
                        setProfile({ ...profile, createElecId: true });
                        setShowElecIdConfirm(false);
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full p-4 rounded-2xl border-2 text-left mb-4 transition-all duration-200",
                      profile.createElecId
                        ? "border-elec-yellow bg-gradient-to-r from-elec-yellow/15 to-elec-yellow/5 shadow-lg shadow-elec-yellow/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={profile.createElecId}
                        className="h-6 w-6 border-2 border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-ios-headline font-semibold text-white">Yes, create my Elec-ID</p>
                          <Gift className="h-4 w-4 text-green-400" />
                        </div>
                        <p className="text-ios-caption-1 text-white/50">It's free - set up your credential now</p>
                      </div>
                    </div>
                  </motion.button>

                  {/* "Are you sure?" confirmation */}
                  <AnimatePresence>
                    {showElecIdConfirm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-hidden"
                      >
                        <div className="p-4 rounded-2xl border-2 border-orange-500/30 bg-orange-500/10">
                          <div className="flex items-start gap-3 mb-3">
                            <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-ios-headline font-semibold text-white mb-1">Are you sure?</p>
                              <p className="text-ios-caption-1 text-white/70">
                                Elec-ID is completely free and helps you:
                              </p>
                              <ul className="mt-2 space-y-1 text-ios-caption-1 text-white/60">
                                <li>• Stand out to employers with verified credentials</li>
                                <li>• Keep all your qualifications in one place</li>
                                <li>• Share your profile with a simple QR code</li>
                              </ul>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setProfile({ ...profile, createElecId: false });
                                setShowElecIdConfirm(false);
                              }}
                              className="flex-1 border-white/20 text-white hover:bg-white/10"
                            >
                              Skip for now
                            </Button>
                            <Button
                              type="button"
                              variant="ios-primary"
                              size="sm"
                              onClick={() => {
                                setProfile({ ...profile, createElecId: true });
                                setShowElecIdConfirm(false);
                              }}
                              className="flex-1"
                            >
                              Get my free Elec-ID
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ECS card type */}
                  <AnimatePresence>
                    {profile.createElecId && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-hidden"
                      >
                        <label className="text-ios-caption-1 text-white/60 mb-2 block">ECS Card Type (optional)</label>
                        <Select
                          value={profile.ecsCardType}
                          onValueChange={(value) => setProfile({ ...profile, ecsCardType: value })}
                        >
                          <SelectTrigger className="h-14 rounded-2xl border-2 border-white/10 bg-[#1a1a2e] text-white focus:border-elec-yellow/60 focus:ring-elec-yellow/20">
                            <SelectValue placeholder="Select card type..." />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1a2e] border-white/20 rounded-xl">
                            {ecsCardTypes.map((type) => (
                              <SelectItem
                                key={type.value}
                                value={type.value}
                                className="text-white hover:bg-white/10 focus:bg-elec-yellow/20 focus:text-white cursor-pointer"
                              >
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex-1" />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button onClick={handleElecIdSubmit} variant="ios-primary" size="ios-large" className="w-full h-[56px] shadow-lg shadow-elec-yellow/20">
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 4: Consent */}
            {step === 'consent' && (
              <motion.div
                key="consent"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col"
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants} className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/30 to-green-600/10 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20"
                    >
                      <Shield className="h-8 w-8 text-green-400" />
                    </motion.div>
                    <h1 className="text-[28px] font-bold text-white tracking-tight mb-1">Your Data, Your Control</h1>
                    <p className="text-ios-body text-white/50">We take privacy seriously</p>
                  </motion.div>

                  {/* Consent checkboxes */}
                  <motion.div variants={itemVariants} className="space-y-3 mb-4 flex-1">
                    {[
                      { key: 'termsAccepted', label: 'I accept the Terms of Service', link: '/terms', required: true },
                      { key: 'privacyAccepted', label: 'I accept the Privacy Policy', link: '/privacy', required: true },
                      { key: 'dataProcessingAccepted', label: 'I consent to data processing', required: true },
                      { key: 'marketingOptIn', label: 'Send me updates and offers', required: false }
                    ].map((item, idx) => (
                      <motion.button
                        key={item.key}
                        type="button"
                        onClick={() => setConsent({ ...consent, [item.key]: !consent[item.key as keyof ConsentData] })}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                          consent[item.key as keyof ConsentData]
                            ? "border-green-500/60 bg-green-500/10"
                            : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={consent[item.key as keyof ConsentData] as boolean}
                            className="h-5 w-5 mt-0.5 border-2 border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                          />
                          <div className="flex-1">
                            <p className="text-ios-subhead text-white">
                              {item.link ? (
                                <>
                                  {item.label.split(item.link ? 'the ' : '')[0]}
                                  <Link to={item.link} className="text-elec-yellow font-semibold" onClick={(e) => e.stopPropagation()}>
                                    {item.label.includes('Terms') ? 'Terms of Service' : 'Privacy Policy'}
                                  </Link>
                                </>
                              ) : item.label}
                              {item.required && <span className="text-red-400 ml-1">*</span>}
                            </p>
                            {!item.required && (
                              <p className="text-ios-caption-1 text-white/40 mt-0.5">Optional - unsubscribe anytime</p>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-ios-caption-1 text-white/40 mb-4"
                  >
                    <span className="text-red-400">*</span> Required. You can withdraw consent anytime.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={handleFinalSubmit}
                      variant="ios-primary"
                      size="ios-large"
                      className="w-full h-[56px] shadow-lg shadow-elec-yellow/20"
                      disabled={isSubmitting || !consent.termsAccepted || !consent.privacyAccepted || !consent.dataProcessingAccepted}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Creating Account...
                          </motion.div>
                        ) : (
                          <motion.div
                            key="submit"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            Create Account
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative px-6 pb-6 z-10"
      >
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-4 text-ios-caption-1 text-white/30">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500/70" />
              Secure
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>BS7671</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>UK based</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default SignUp;
