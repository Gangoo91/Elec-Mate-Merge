import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IOSInput } from '@/components/ui/ios-input';
import { IOSStepIndicator } from '@/components/ui/ios-step-indicator';
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
  Shield,
  Check,
  X,
  ChevronLeft
} from 'lucide-react';
import { storeConsent } from '@/services/consentService';
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

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'apprentice', label: 'Apprentice', description: 'Currently training', icon: GraduationCap },
    { value: 'electrician', label: 'Electrician', description: 'Qualified professional', icon: Zap },
    { value: 'employer', label: 'Employer', description: 'Business owner', icon: Briefcase }
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
      const { error } = await signUp(email, password, fullName);

      if (error) {
        setError(error.message);
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem('elec-mate-onboarding', JSON.stringify({
        ...profile,
        consent: consentWithTimestamp,
        completedAt: new Date().toISOString()
      }));

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
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 safe-top safe-bottom">
        <div className="fixed inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative w-full max-w-sm text-center ios-stagger-children">
          <div className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-ios-pop">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-ios-title-1 text-white mb-2">Welcome to Elec-Mate!</h1>
          <p className="text-ios-body text-white/60 mb-8">
            Your account is ready. Let's get started!
          </p>

          <Card variant="ios" className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-left">
                  <p className="text-ios-subhead font-semibold text-white">7-Day Free Trial Active</p>
                  <p className="text-ios-caption-1 text-white/50">Full access, no card required</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {profile.createElecId && (
            <Card variant="ios" className="border-elec-yellow/30 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                    <BadgeCheck className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="text-left">
                    <p className="text-ios-subhead font-semibold text-white">Elec-ID Requested</p>
                    <p className="text-ios-caption-1 text-white/50">Ready after verification</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button asChild variant="ios-primary" size="ios-large" className="w-full">
            <Link to="/auth/signin">
              Continue to Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col safe-top safe-bottom">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-elec-yellow/5 via-transparent to-transparent pointer-events-none" />

      {/* Header - iOS style */}
      <header className="relative w-full px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          {step === 'account' ? (
            <Link to="/" className="flex items-center gap-1 text-elec-yellow ios-pressable p-2 -ml-2 rounded-xl">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-ios-body font-medium">Home</span>
            </Link>
          ) : (
            <button onClick={goBack} className="flex items-center gap-1 text-elec-yellow ios-pressable p-2 -ml-2 rounded-xl">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-ios-body font-medium">Back</span>
            </button>
          )}

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-elec-yellow flex items-center justify-center">
              <Zap className="h-4 w-4 text-black" />
            </div>
          </div>

          <div className="w-16" />
        </div>
      </header>

      {/* Step indicator */}
      <div className="px-6 py-4">
        <IOSStepIndicator steps={4} currentStep={currentStepIndex} />
      </div>

      {/* Free trial badge */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-ios-caption-1 font-medium">
          <Gift className="h-3.5 w-3.5" />
          7-Day Free Trial
        </div>
      </div>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col px-6 pb-8">
        <div className="w-full max-w-sm mx-auto flex-1 flex flex-col">
          {/* Error display */}
          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 animate-ios-scale-in">
              <p className="text-ios-subhead text-red-400">{error}</p>
            </div>
          )}

          {/* Step 1: Account */}
          {step === 'account' && (
            <div className="animate-ios-slide-up flex-1 flex flex-col">
              <div className="text-center mb-6">
                <h1 className="text-ios-title-2 text-white mb-1">Create Account</h1>
                <p className="text-ios-body text-white/60">Start your free trial</p>
              </div>

              <Card variant="ios-elevated" className="p-6 flex-1">
                <form onSubmit={handleAccountSubmit} className="space-y-4 h-full flex flex-col">
                  <IOSInput
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Smith"
                    autoComplete="name"
                    icon={<User className="h-5 w-5" />}
                  />

                  <IOSInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    icon={<Mail className="h-5 w-5" />}
                  />

                  <div>
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
                    {password && (
                      <div className="mt-3 space-y-2 animate-ios-fade-in">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={cn("h-full transition-all duration-ios-normal", passwordStrength.color)}
                              style={{ width: `${(passwordStrength.level / 4) * 100}%` }}
                            />
                          </div>
                          {passwordStrength.label && (
                            <span className={cn(
                              "text-ios-caption-2 font-medium",
                              passwordStrength.level <= 1 && "text-red-400",
                              passwordStrength.level === 2 && "text-orange-400",
                              passwordStrength.level === 3 && "text-yellow-400",
                              passwordStrength.level === 4 && "text-green-400"
                            )}>
                              {passwordStrength.label}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {PASSWORD_REQUIREMENTS.map((req) => {
                            const passed = req.test(password);
                            return (
                              <div key={req.id} className={cn(
                                "flex items-center gap-1 text-ios-caption-2",
                                passed ? "text-green-400" : "text-white/40"
                              )}>
                                {passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                {req.label}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <IOSInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    icon={<Lock className="h-5 w-5" />}
                    error={confirmPassword && password !== confirmPassword ? "Passwords don't match" : undefined}
                  />

                  <div className="flex-1" />

                  <Button type="submit" variant="ios-primary" size="ios-large" className="w-full">
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-center text-ios-footnote text-white/50">
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-elec-yellow font-medium">Sign in</Link>
                  </p>
                </form>
              </Card>
            </div>
          )}

          {/* Step 2: Profile/Role */}
          {step === 'profile' && (
            <div className="animate-ios-slide-up flex-1 flex flex-col">
              <div className="text-center mb-6">
                <h1 className="text-ios-title-2 text-white mb-1">What's your role?</h1>
                <p className="text-ios-body text-white/60">We'll personalise your experience</p>
              </div>

              <div className="space-y-3 mb-6 flex-1">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setProfile({ ...profile, role: option.value as any })}
                    className={cn(
                      "w-full p-4 rounded-2xl border-2 text-left ios-card-tap",
                      profile.role === option.value
                        ? "border-elec-yellow bg-elec-yellow/10"
                        : "border-white/10 bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-ios-fast",
                        profile.role === option.value ? "bg-elec-yellow/20" : "bg-white/10"
                      )}>
                        <option.icon className={cn(
                          "h-6 w-6",
                          profile.role === option.value ? "text-elec-yellow" : "text-white/60"
                        )} />
                      </div>
                      <div className="flex-1">
                        <p className="text-ios-headline text-white">{option.label}</p>
                        <p className="text-ios-caption-1 text-white/50">{option.description}</p>
                      </div>
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                        profile.role === option.value
                          ? "border-elec-yellow bg-elec-yellow"
                          : "border-white/30"
                      )}>
                        {profile.role === option.value && <Check className="h-4 w-4 text-black" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleProfileSubmit}
                variant="ios-primary"
                size="ios-large"
                className="w-full"
                disabled={!profile.role}
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 3: Elec-ID */}
          {step === 'elec-id' && (
            <div className="animate-ios-slide-up flex-1 flex flex-col">
              <div className="text-center mb-6">
                <h1 className="text-ios-title-2 text-white mb-1">Get Your Elec-ID</h1>
                <p className="text-ios-body text-white/60">Your digital credential</p>
              </div>

              {/* Elec-ID card preview */}
              <Card variant="ios" className="border-elec-yellow/30 mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                      <BadgeCheck className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <div>
                      <p className="text-ios-headline text-white">Elec-ID</p>
                      <p className="text-ios-caption-1 text-white/50">Portable credential</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-ios-caption-1">
                    {['Qualifications', 'Training', 'Work history', 'Shareable QR'].map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-white/70">
                        <CheckCircle2 className="h-3 w-3 text-elec-yellow" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Opt-in toggle */}
              <button
                type="button"
                onClick={() => setProfile({ ...profile, createElecId: !profile.createElecId })}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-left mb-4 ios-card-tap",
                  profile.createElecId
                    ? "border-elec-yellow bg-elec-yellow/10"
                    : "border-white/10 bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={profile.createElecId}
                    className="h-5 w-5 border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                  />
                  <div className="flex-1">
                    <p className="text-ios-subhead font-medium text-white">Yes, create my Elec-ID</p>
                    <p className="text-ios-caption-1 text-white/50">Set up your credential now</p>
                  </div>
                </div>
              </button>

              {/* ECS card type */}
              {profile.createElecId && (
                <div className="mb-4 animate-ios-scale-in">
                  <label className="text-ios-caption-1 text-white/60 mb-2 block">ECS Card Type (optional)</label>
                  <select
                    value={profile.ecsCardType}
                    onChange={(e) => setProfile({ ...profile, ecsCardType: e.target.value })}
                    className="w-full h-[50px] px-4 rounded-xl border-2 border-white/10 bg-white/5 text-white text-ios-body focus:border-elec-yellow/60 focus:outline-none"
                  >
                    <option value="">Select card type...</option>
                    {ecsCardTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex-1" />

              <Button onClick={handleElecIdSubmit} variant="ios-primary" size="ios-large" className="w-full">
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 4: Consent */}
          {step === 'consent' && (
            <div className="animate-ios-slide-up flex-1 flex flex-col">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-elec-yellow/20 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-7 w-7 text-elec-yellow" />
                </div>
                <h1 className="text-ios-title-2 text-white mb-1">Your Data, Your Control</h1>
                <p className="text-ios-body text-white/60">We take privacy seriously</p>
              </div>

              {/* Consent checkboxes */}
              <div className="space-y-3 mb-4 flex-1">
                {[
                  { key: 'termsAccepted', label: 'I accept the Terms of Service', link: '/terms', required: true },
                  { key: 'privacyAccepted', label: 'I accept the Privacy Policy', link: '/privacy', required: true },
                  { key: 'dataProcessingAccepted', label: 'I consent to data processing', required: true },
                  { key: 'marketingOptIn', label: 'Send me updates and offers', required: false }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setConsent({ ...consent, [item.key]: !consent[item.key as keyof ConsentData] })}
                    className={cn(
                      "w-full p-4 rounded-xl border text-left ios-card-tap",
                      consent[item.key as keyof ConsentData]
                        ? "border-elec-yellow bg-elec-yellow/10"
                        : "border-white/10 bg-white/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={consent[item.key as keyof ConsentData] as boolean}
                        className="h-5 w-5 mt-0.5 border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                      />
                      <div className="flex-1">
                        <p className="text-ios-subhead text-white">
                          {item.link ? (
                            <>
                              {item.label.split(item.link ? 'the ' : '')[0]}
                              <Link to={item.link} className="text-elec-yellow" onClick={(e) => e.stopPropagation()}>
                                {item.label.includes('Terms') ? 'Terms of Service' : 'Privacy Policy'}
                              </Link>
                            </>
                          ) : item.label}
                          {item.required && <span className="text-red-400 ml-1">*</span>}
                        </p>
                        {!item.required && (
                          <p className="text-ios-caption-1 text-white/40">Optional - unsubscribe anytime</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-ios-caption-1 text-white/40 mb-4">
                <span className="text-red-400">*</span> Required. You can withdraw consent anytime.
              </p>

              <Button
                onClick={handleFinalSubmit}
                variant="ios-primary"
                size="ios-large"
                className="w-full"
                disabled={isSubmitting || !consent.termsAccepted || !consent.privacyAccepted || !consent.dataProcessingAccepted}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative px-6 pb-6">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-4 text-ios-caption-1 text-white/40">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              Secure
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>BS7671</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>UK based</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
