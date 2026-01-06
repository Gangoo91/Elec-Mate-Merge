
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Zap,
  Briefcase,
  BadgeCheck,
  Gift,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Check,
  X
} from 'lucide-react';
import { storeConsent } from '@/services/consentService';
import { cn } from '@/lib/utils';

// Password requirements for security
const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'One number', test: (p: string) => /[0-9]/.test(p) },
];

type OnboardingStep = 'account' | 'profile' | 'elec-id' | 'consent' | 'complete';

interface UserProfile {
  role: 'apprentice' | 'electrician' | 'employer' | '';
  yearsExperience: string;
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
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    role: '',
    yearsExperience: '',
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

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const roleOptions = [
    {
      value: 'apprentice',
      label: 'Apprentice',
      description: 'Currently training',
      icon: GraduationCap
    },
    {
      value: 'electrician',
      label: 'Electrician',
      description: 'Qualified professional',
      icon: Zap
    },
    {
      value: 'employer',
      label: 'Employer',
      description: 'Business owner',
      icon: Briefcase
    }
  ];

  const ecsCardTypes = [
    { value: 'none', label: "No ECS card yet" },
    { value: 'apprentice', label: 'Apprentice' },
    { value: 'trainee', label: 'Trainee' },
    { value: 'installation', label: 'Installation Electrician' },
    { value: 'approved', label: 'Approved Electrician' },
    { value: 'technician', label: 'Technician' }
  ];

  // Password strength calculation
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
    // Validate required consents
    if (!consent.termsAccepted || !consent.privacyAccepted || !consent.dataProcessingAccepted) {
      setError('Please accept the required terms to continue');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Record consent timestamp
    const consentWithTimestamp = {
      ...consent,
      timestamp: new Date().toISOString()
    };

    try {
      const { error } = await signUp(email, password, fullName);

      if (error) {
        setError(error.message);
        setIsSubmitting(false);
        return;
      }

      // Store all data including GDPR consent
      localStorage.setItem('elec-mate-onboarding', JSON.stringify({
        ...profile,
        consent: consentWithTimestamp,
        completedAt: new Date().toISOString()
      }));

      // Store consent separately for GDPR audit trail (local backup)
      localStorage.setItem('elec-mate-consent', JSON.stringify({
        email,
        fullName,
        ...consentWithTimestamp
      }));

      // Store consent in database for GDPR compliance
      await storeConsent({
        email,
        full_name: fullName,
        terms_accepted: consent.termsAccepted,
        privacy_accepted: consent.privacyAccepted,
        data_processing_accepted: consent.dataProcessingAccepted,
        marketing_opt_in: consent.marketingOptIn,
        consent_timestamp: consentWithTimestamp.timestamp
      });

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

  // Completion screen
  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-card rounded-full blur-[120px] opacity-30 pointer-events-none" />

        <div className="relative w-full max-w-sm text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-white">Welcome to Elec-Mate!</h1>
          <p className="text-gray-400 mb-6">
            Check your email to verify your account.
          </p>

          <Card className="border-green-500/30 bg-card mb-4 transition-all duration-300 hover:border-green-500/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-sm text-white">7-Day Free Trial Active</p>
                  <p className="text-xs text-gray-400">Full access, no card required</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {profile.createElecId && (
            <Card className="border-yellow-400/30 bg-yellow-400/5 mb-6 transition-all duration-300 hover:border-yellow-400/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-sm text-white">Elec-ID Requested</p>
                    <p className="text-xs text-gray-400">Ready after verification</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button asChild className="w-full h-12 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold transition-all duration-200 hover:scale-[1.02]">
            <Link to="/auth/signin">
              Continue to Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

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
        <div className="w-full max-w-sm md:max-w-md">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-1 mb-6 animate-fade-in">
            {['account', 'profile', 'elec-id', 'consent'].map((s, index) => {
              const steps = ['account', 'profile', 'elec-id', 'consent'];
              const stepIndex = steps.indexOf(step);
              const isActive = s === step;
              const isCompleted = stepIndex > index;

              return (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isCompleted
                        ? 'bg-yellow-400 text-black scale-100'
                        : isActive
                          ? 'bg-yellow-400 text-black scale-110'
                          : 'bg-white/10 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" /> : index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`w-6 sm:w-8 h-0.5 mx-0.5 sm:mx-1 transition-all duration-300 ${isCompleted ? 'bg-yellow-400' : 'bg-white/10'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Free trial badge */}
          <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-medium transition-all hover:bg-yellow-400/20">
              <Gift className="h-3.5 w-3.5" />
              7-Day Free Trial
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-card border border-red-500/30 animate-fade-in">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Step 1: Account */}
          {step === 'account' && (
            <Card className="border-white/10 bg-neutral-900 shadow-xl transition-all duration-300 hover:border-yellow-400/20 animate-fade-in">
              <CardContent className="pt-6 md:pt-8 md:pb-2 md:px-8">
                <div className="text-center mb-6 md:mb-8">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-white">Create Account</h1>
                  <p className="text-sm md:text-base text-gray-400">Start your free trial</p>
                </div>

                <form onSubmit={handleAccountSubmit} className="space-y-4 md:space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm text-gray-300">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-yellow-400 z-10 pointer-events-none" />
                      <Input
                        id="fullName"
                        placeholder="John Smith"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-11 h-12 text-base bg-black border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all duration-200"
                        autoComplete="name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-gray-300">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-yellow-400 z-10 pointer-events-none" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-11 h-12 text-base bg-black border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all duration-200"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm text-gray-300">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-yellow-400 z-10 pointer-events-none" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-11 pr-12 h-12 text-base bg-black border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all duration-200"
                        autoComplete="new-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5 z-10"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Password strength indicator */}
                    {password && (
                      <div className="space-y-2 animate-fade-in">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full transition-all duration-300",
                                passwordStrength.color
                              )}
                              style={{ width: `${(passwordStrength.level / 4) * 100}%` }}
                            />
                          </div>
                          {passwordStrength.label && (
                            <span className={cn(
                              "text-xs font-medium",
                              passwordStrength.level <= 1 && "text-red-400",
                              passwordStrength.level === 2 && "text-orange-400",
                              passwordStrength.level === 3 && "text-yellow-400",
                              passwordStrength.level === 4 && "text-green-400"
                            )}>
                              {passwordStrength.label}
                            </span>
                          )}
                        </div>

                        {/* Requirements list */}
                        <div className="grid grid-cols-2 gap-1">
                          {PASSWORD_REQUIREMENTS.map((req) => {
                            const passed = req.test(password);
                            return (
                              <div
                                key={req.id}
                                className={cn(
                                  "flex items-center gap-1 text-xs transition-colors",
                                  passed ? "text-green-400" : "text-gray-500"
                                )}
                              >
                                {passed ? (
                                  <Check className="h-3 w-3" />
                                ) : (
                                  <X className="h-3 w-3" />
                                )}
                                {req.label}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm text-gray-300">Confirm Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-yellow-400 z-10 pointer-events-none" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={cn(
                          "pl-11 h-12 text-base bg-black border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all duration-200",
                          confirmPassword && password !== confirmPassword && "border-red-500/50"
                        )}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-400 animate-fade-in">Passwords don't match</p>
                    )}
                    {confirmPassword && password === confirmPassword && allPasswordRequirementsMet && (
                      <p className="text-xs text-green-400 animate-fade-in flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Passwords match
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full h-12 md:h-14 text-base md:text-lg font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 hover:scale-[1.02]">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </form>

                <div className="mt-5 md:mt-6 text-center text-sm md:text-base text-gray-400">
                  Already have an account?{' '}
                  <Link to="/auth/signin" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Profile */}
          {step === 'profile' && (
            <div className="animate-fade-in">
              <div className="text-center mb-6 md:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-white">What's your role?</h1>
                <p className="text-sm md:text-base text-gray-400">We'll personalise your experience</p>
              </div>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setProfile({ ...profile, role: option.value as any })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.01] ${
                      profile.role === option.value
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : 'border-white/10 bg-neutral-900 hover:border-yellow-400/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        profile.role === option.value ? 'bg-yellow-400/20 scale-110' : 'bg-white/5'
                      }`}>
                        <option.icon className={`h-5 w-5 transition-colors ${
                          profile.role === option.value ? 'text-yellow-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white">{option.label}</p>
                        <p className="text-xs text-gray-400">{option.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        profile.role === option.value ? 'border-yellow-400 bg-yellow-400' : 'border-gray-600'
                      }`}>
                        {profile.role === option.value && (
                          <CheckCircle2 className="h-3 w-3 text-black" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={goBack} className="h-12 md:h-14 px-4 md:px-5 border-white/20 text-white hover:bg-white/5 transition-all duration-200">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  onClick={handleProfileSubmit}
                  className="flex-1 h-12 md:h-14 text-base md:text-lg font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 hover:scale-[1.02]"
                  disabled={!profile.role}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Elec-ID */}
          {step === 'elec-id' && (
            <div className="animate-fade-in">
              <div className="text-center mb-6 md:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-white">Get Your Elec-ID</h1>
                <p className="text-sm md:text-base text-gray-400">Your digital professional credential</p>
              </div>

              {/* Elec-ID card preview */}
              <Card className="border-yellow-400/30 bg-gradient-to-br from-neutral-900 to-yellow-400/5 mb-5 transition-all duration-300 hover:border-yellow-400/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                      <BadgeCheck className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Elec-ID</p>
                      <p className="text-xs text-gray-400">Portable credential</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['Qualifications', 'Training', 'Work history', 'Shareable QR'].map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-gray-300">
                        <CheckCircle2 className="h-3 w-3 text-yellow-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Opt-in checkbox */}
              <button
                type="button"
                onClick={() => setProfile({ ...profile, createElecId: !profile.createElecId })}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 mb-4 hover:scale-[1.01] ${
                  profile.createElecId
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-white/10 bg-neutral-900 hover:border-yellow-400/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox checked={profile.createElecId} className="h-5 w-5 border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black" />
                  <div className="flex-1">
                    <p className="font-medium text-white">Yes, create my Elec-ID</p>
                    <p className="text-xs text-gray-400">Recommended - set up your credential now</p>
                  </div>
                </div>
              </button>

              {/* ECS card type selection */}
              {profile.createElecId && (
                <div className="mb-5 animate-fade-in">
                  <Label className="text-sm mb-2 block text-gray-300">ECS Card Type (optional)</Label>
                  <select
                    value={profile.ecsCardType}
                    onChange={(e) => setProfile({ ...profile, ecsCardType: e.target.value })}
                    className="w-full h-12 px-3 rounded-lg border border-white/10 bg-black text-white text-base focus:border-yellow-400/50 focus:outline-none transition-all duration-200"
                  >
                    <option value="">Select card type...</option>
                    {ecsCardTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={goBack} className="h-12 md:h-14 px-4 md:px-5 border-white/20 text-white hover:bg-white/5 transition-all duration-200">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  onClick={handleElecIdSubmit}
                  className="flex-1 h-12 md:h-14 text-base md:text-lg font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 hover:scale-[1.02]"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: GDPR Consent */}
          {step === 'consent' && (
            <div className="animate-fade-in">
              <div className="text-center mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-yellow-400/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Shield className="h-6 w-6 md:h-7 md:w-7 text-yellow-400" />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-white">Your Data, Your Control</h1>
                <p className="text-sm md:text-base text-gray-400">We take your privacy seriously</p>
              </div>

              {/* Data we collect info */}
              <Card className="border-white/10 bg-neutral-900/50 mb-5">
                <CardContent className="p-4">
                  <p className="text-xs text-gray-400 mb-3">We collect and process:</p>
                  <div className="space-y-1.5 text-xs text-gray-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Account info (name, email) to provide our services</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Your role and experience to tailor your dashboard</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Progress data to track your learning journey</span>
                    </div>
                    {profile.createElecId && (
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 text-yellow-400 mt-0.5 shrink-0" />
                        <span>Elec-ID credentials to verify your qualifications</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Consent checkboxes */}
              <div className="space-y-3 mb-6">
                {/* Terms & Conditions - Required */}
                <button
                  type="button"
                  onClick={() => setConsent({ ...consent, termsAccepted: !consent.termsAccepted })}
                  className={`w-full p-3 rounded-xl border text-left transition-all duration-200 hover:scale-[1.01] ${
                    consent.termsAccepted
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-white/10 bg-neutral-900 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={consent.termsAccepted}
                      className="h-4 w-4 mt-0.5 border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        I accept the <Link to="/terms" className="text-yellow-400 hover:text-yellow-300 transition-colors">Terms of Service</Link>
                        <span className="text-red-400 ml-1">*</span>
                      </p>
                    </div>
                  </div>
                </button>

                {/* Privacy Policy - Required */}
                <button
                  type="button"
                  onClick={() => setConsent({ ...consent, privacyAccepted: !consent.privacyAccepted })}
                  className={`w-full p-3 rounded-xl border text-left transition-all duration-200 hover:scale-[1.01] ${
                    consent.privacyAccepted
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-white/10 bg-neutral-900 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={consent.privacyAccepted}
                      className="h-4 w-4 mt-0.5 border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        I have read and accept the <Link to="/privacy" className="text-yellow-400 hover:text-yellow-300 transition-colors">Privacy Policy</Link>
                        <span className="text-red-400 ml-1">*</span>
                      </p>
                    </div>
                  </div>
                </button>

                {/* Data Processing - Required */}
                <button
                  type="button"
                  onClick={() => setConsent({ ...consent, dataProcessingAccepted: !consent.dataProcessingAccepted })}
                  className={`w-full p-3 rounded-xl border text-left transition-all duration-200 hover:scale-[1.01] ${
                    consent.dataProcessingAccepted
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-white/10 bg-neutral-900 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={consent.dataProcessingAccepted}
                      className="h-4 w-4 mt-0.5 border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        I consent to processing of my data as described above
                        <span className="text-red-400 ml-1">*</span>
                      </p>
                    </div>
                  </div>
                </button>

                {/* Marketing - Optional */}
                <button
                  type="button"
                  onClick={() => setConsent({ ...consent, marketingOptIn: !consent.marketingOptIn })}
                  className={`w-full p-3 rounded-xl border text-left transition-all duration-200 hover:scale-[1.01] ${
                    consent.marketingOptIn
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-white/10 bg-neutral-900 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={consent.marketingOptIn}
                      className="h-4 w-4 mt-0.5 border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-white">Send me updates, tips, and special offers</p>
                      <p className="text-xs text-gray-500">Optional - you can unsubscribe anytime</p>
                    </div>
                  </div>
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                <span className="text-red-400">*</span> Required fields. You can withdraw consent or request data deletion at any time by contacting us.
              </p>

              <div className="flex gap-3">
                <Button variant="outline" onClick={goBack} className="h-12 md:h-14 px-4 md:px-5 border-white/20 text-white hover:bg-white/5 transition-all duration-200">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting || !consent.termsAccepted || !consent.privacyAccepted || !consent.dataProcessingAccepted}
                  className="flex-1 h-12 md:h-14 text-base md:text-lg font-semibold bg-yellow-400 hover:bg-yellow-300 text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

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

      {/* Footer trust indicators */}
      <footer className="relative px-4 pb-6">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 transition-colors hover:text-gray-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              Secure
            </span>
            <span className="transition-colors hover:text-gray-400">BS7671 compliant</span>
            <span className="transition-colors hover:text-gray-400">UK based</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
