import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Check,
  CheckCircle2,
  ChevronLeft,
  Database,
  Eye,
  EyeOff,
  FileText,
  Gift,
  GraduationCap,
  Loader2,
  ShieldCheck,
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
import { useCookieConsent } from '@/components/CookieConsent';
import { trackLead, trackCompleteRegistration } from '@/lib/marketing-pixels';
import { trackSignupCompleted, trackSignupStarted } from '@/lib/analytics-events';
import {
  persistAttributionToProfile,
  fireServerCapi,
  getStoredAttribution,
} from '@/lib/attribution';

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
    value: 'apprentice',
    label: 'Apprentice',
    subtitle: 'Training, AM2 prep, portfolio and revision.',
    icon: GraduationCap,
    monthly: '£6.99',
  },
  {
    value: 'electrician',
    label: 'Electrician',
    subtitle: 'Certs, quotes, invoices and every tool.',
    icon: Wrench,
    monthly: '£19.99',
  },
];

/* ─── Shared sub-components ─── */

const StepBar = ({ currentIndex }: { currentIndex: number }) => (
  <div className="mx-auto mb-5 w-full max-w-[440px] lg:mb-7">
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
          id={field}
          name={field}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
          placeholder={placeholder}
          autoComplete={type === 'email' ? 'email' : type === 'password' ? 'new-password' : 'name'}
          autoCapitalize={type === 'email' || type === 'password' ? 'none' : 'words'}
          autoCorrect={type === 'email' ? 'off' : undefined}
          spellCheck={type === 'email' ? false : undefined}
          inputMode={type === 'email' ? 'email' : undefined}
          enterKeyHint="next"
          className={cn(
            'h-12 w-full touch-manipulation rounded-2xl border bg-white/[0.04] px-5 pr-12 text-[16px] text-white placeholder:text-white outline-none transition-all duration-150 [color-scheme:dark] focus:outline-none lg:h-14',
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

/* ─── Referral code fallback (collapsible — for users who installed without a link) ─── */
const ReferralCodeField = ({ onApply }: { onApply: (code: string) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState('');
  const [applied, setApplied] = useState(false);

  const apply = () => {
    const code = value.trim().toUpperCase();
    if (!/^[A-Z0-9_-]{3,}$/.test(code)) return;
    onApply(code);
    setApplied(true);
  };

  if (applied) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-yellow-500/25 bg-yellow-500/[0.08] px-4 py-3">
        <Gift className="h-4 w-4 flex-shrink-0 text-yellow-400" />
        <p className="text-[13px] text-yellow-300">Code applied.</p>
      </div>
    );
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="flex items-center gap-2 py-1 text-[13px] text-white/50 transition-colors hover:text-white"
      >
        <Gift className="h-3.5 w-3.5" />
        Got a referral code?
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.toUpperCase())}
        placeholder="MATE-ABC123"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        className="h-11 flex-1 touch-manipulation rounded-xl border border-white/30 bg-transparent px-4 text-base font-medium tracking-wider text-white placeholder:text-white/30 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
      />
      <button
        type="button"
        onClick={apply}
        className="h-11 touch-manipulation rounded-xl bg-white/[0.08] px-4 text-sm font-semibold text-white transition-colors hover:bg-white/[0.15]"
      >
        Apply
      </button>
    </div>
  );
};

/* ─── Main component ─── */

const SignUp = () => {
  const [step, setStep] = useState<OnboardingStep>('account');
  // Set when signup fails because the email already has a real account —
  // renders a direct "Sign in instead" escape next to the error
  const [existingAccount, setExistingAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const signupStartedRef = useRef(false);
  const [profileForm, setProfileForm] = useState({ role: '' as string });
  const [consent, setConsent] = useState({
    termsAccepted: false,
    privacyAccepted: false,
    marketingOptIn: false,
    dataProcessingAccepted: false,
  });
  const userCount = useUserCount();
  // Cookie banner clearance — see container className below
  const { hasConsented } = useCookieConsent();

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

  // Fire Meta Pixel `Lead` once when the user enters a valid email — signals
  // intent before account creation so we can still attribute if they bounce.
  const [leadFired, setLeadFired] = useState(false);
  useEffect(() => {
    if (leadFired || !isEmailValid) return;
    const eventId = trackLead({ source: 'signup_form', value: 0 });
    // Also send server-side so the event survives ad blockers / ITP.
    fireServerCapi({
      event_name: 'Lead',
      event_id: eventId,
      email,
      content_name: 'signup_form',
    });
    setLeadFired(true);
  }, [email, isEmailValid, leadFired]);

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
    electrician: { planId: 'electrician-monthly', priceId: 'price_1TnbOh2RKw5t5RAmsf2KcHT6' },
    apprentice: { planId: 'apprentice-monthly', priceId: 'price_1TnbOk2RKw5t5RAmiOCTkqS3' },
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
        } else if (
          lowerMsg.includes('already registered') ||
          lowerMsg.includes('already been registered')
        ) {
          // Real existing account (zombie cleanup already tried) — give them
          // a direct way out instead of a dead-end error after 3 steps
          setError('Looks like you already have an account with this email.');
          setExistingAccount(true);
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

      // Marketing attribution — persist UTM/gclid/fbclid to profile + fire
      // CompleteRegistration via both browser Pixel and server CAPI (same
      // event_id for dedup) so the conversion attributes to the ad channel.
      if (userId) {
        const regEventId = trackCompleteRegistration({
          method: profileForm.role,
        });
        // Cookieless funnel event (Vercel + PostHog) — the pixel/CAPI calls here
        // are consent-gated; this one counts every signup in the Vercel dashboard.
        trackSignupCompleted({ method: profileForm.role });
        const [firstName, ...rest] = fullName.trim().split(/\s+/);
        fireServerCapi({
          event_name: 'CompleteRegistration',
          event_id: regEventId,
          email,
          user_id: userId,
          first_name: firstName,
          last_name: rest.join(' ') || undefined,
          content_name: profileForm.role,
        });
        persistAttributionToProfile(userId).catch(() => {});

        // Add to Brevo newsletter list if the user ticked marketing opt-in.
        // Keeps consent lawful — we only add people who explicitly agreed.
        if (consent.marketingOptIn) {
          const attribution = getStoredAttribution();
          supabase.functions
            .invoke('newsletter-subscribe', {
              body: {
                email,
                first_name: firstName,
                last_name: rest.join(' ') || undefined,
                source: 'other',
                event_id: `signup_newsletter_${userId}`,
                utm: {
                  utm_source: attribution.utm_source,
                  utm_medium: attribution.utm_medium,
                  utm_campaign: attribution.utm_campaign,
                  gclid: attribution.gclid,
                  fbclid: attribution.fbclid,
                },
              },
            })
            .catch(() => {
              /* non-critical — user is signed up either way */
            });
        }
      }

      supabase.functions
        .invoke('send-welcome-email', { body: { userId, email, fullName } })
        .catch(() => {});

      const rp = ROLE_TO_PRICE[profileForm.role];
      if (rp) {
        storageSetSync('elec-mate-checkout-planId', rp.planId);
        storageSetSync('elec-mate-checkout-priceId', rp.priceId);
      }
      storageRemoveSync('elec-mate-onboarding-data');

      // Both platforms land on the CheckoutTrial interstitial. Web previously
      // auto-created a Stripe session here and bounced the user cold onto the
      // card form — 54 of the 56 abandoners in the last 30 days never came
      // back (ELE-1268/1270). Now every user sees the plan summary, "£0 today"
      // and trial terms first; CheckoutTrial.startCheckout fires the identical
      // create-checkout call (offer/referral codes and tracking included) on
      // click. Native unchanged: the same page triggers the RevenueCat IAP.
      navigate('/checkout-trial');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setError(null);
    setExistingAccount(false);
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
      <div
        className={cn(
          'mx-auto grid min-h-[100svh] max-w-[1120px] items-stretch px-6 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[env(safe-area-inset-top)] lg:gap-12 lg:px-8',
          // The role step becomes a full-width side-by-side chooser on desktop
          // (no scrolling to see the second option); the other steps keep the
          // marketing panel + narrow form layout.
          step === 'profile' ? 'lg:grid-cols-1' : 'lg:grid-cols-[0.95fr_1.05fr]',
          // The fixed cookie banner overlaps the Continue button at the bottom
          // on mobile until consent is answered — it intercepted the tap in
          // testing. Clear it while the banner is up.
          !hasConsented && 'pb-36'
        )}
      >
        <div
          className={cn(
            'hidden lg:flex-col lg:justify-between lg:py-10',
            step !== 'profile' && 'lg:flex'
          )}
        >
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
                platform. £0 today — nothing is charged until day 8.
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
          <div
            className={cn(
              'mx-auto flex w-full flex-1 flex-col',
              step === 'profile' ? 'max-w-[440px] lg:max-w-[960px]' : 'max-w-[440px]'
            )}
          >
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
                      Name, email, password — that's it.
                    </p>
                    <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-white lg:mb-6 lg:text-[13px]">
                      <span className="font-semibold text-yellow-400">£0 today</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span>7 days free</span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span>{userCount} electricians in</span>
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

                    <form
                      onSubmit={handleAccountSubmit}
                      onFocusCapture={() => {
                        // Fires once per visit on first field focus — separates
                        // "form scared them off" from "never engaged at all".
                        if (!signupStartedRef.current) {
                          signupStartedRef.current = true;
                          trackSignupStarted();
                        }
                      }}
                      className="flex-1 space-y-3"
                    >
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

                      {/* Referral code fallback — for users who installed without a link.
                        Pre-filled + hidden when a ref was captured from URL / deep link. */}
                      {!referralCode && !offerCode && (
                        <ReferralCodeField
                          onApply={(code) => {
                            setReferralCode(code);
                            storageSetSync('elec-mate-referral-code', code);
                          }}
                        />
                      )}

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
                    <div className="mb-7 lg:mb-9 lg:text-center">
                      <h1 className="mb-3 text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.5rem]">
                        Which one <span className="text-yellow-400">sounds like you?</span>
                      </h1>
                      <p className="mx-auto max-w-[36rem] text-[15px] leading-[1.7] text-white">
                        This tunes what you land in first. Both plans are £0 today — everything
                        unlocked for 7 days.
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

                    <div className="flex-1 space-y-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5 lg:space-y-0">
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
                              'relative w-full touch-manipulation overflow-hidden rounded-[1.8rem] border p-5 text-left transition-all duration-200 lg:p-6',
                              selected
                                ? 'border-yellow-400/60 bg-gradient-to-br from-yellow-500/[0.14] via-amber-500/[0.06] to-white/[0.03] shadow-[0_0_40px_rgba(250,204,21,0.12)]'
                                : 'border-white/[0.16] bg-gradient-to-b from-white/[0.07] to-white/[0.03] hover:border-yellow-400/40 hover:from-white/[0.09]'
                            )}
                          >
                            <div
                              aria-hidden
                              className={cn(
                                'absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 to-elec-yellow/0 transition-opacity',
                                selected ? 'via-elec-yellow/80' : 'via-elec-yellow/30'
                              )}
                            />
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  'flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border transition-colors',
                                  selected
                                    ? 'border-yellow-400/40 bg-yellow-500/[0.18]'
                                    : 'border-yellow-500/25 bg-yellow-500/[0.12]'
                                )}
                              >
                                <Icon className="h-6 w-6 text-yellow-400" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-[19px] font-bold tracking-[-0.01em] text-white">
                                  {option.label}
                                </h3>
                                <p className="mt-0.5 text-[13px] leading-snug text-white/65">
                                  {option.subtitle}
                                </p>
                              </div>
                              <div
                                className={cn(
                                  'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-150',
                                  selected
                                    ? 'bg-yellow-400 shadow-[0_0_16px_rgba(250,204,21,0.4)]'
                                    : 'border-2 border-white/25'
                                )}
                              >
                                {selected && (
                                  <Check className="h-4 w-4 text-black" strokeWidth={3} />
                                )}
                              </div>
                            </div>

                            <div
                              className={cn(
                                'mt-5 flex items-baseline justify-between gap-3 border-t pt-4',
                                selected ? 'border-yellow-400/20' : 'border-white/[0.08]'
                              )}
                            >
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-[22px] font-bold leading-none text-white tabular-nums">
                                  {option.monthly}
                                </span>
                                <span className="text-[12.5px] text-white/60">
                                  /mo after your free week
                                </span>
                              </div>
                              <span
                                className={cn(
                                  'rounded-full px-2.5 py-1 text-[11px] font-bold',
                                  selected
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-yellow-500/[0.12] text-yellow-400'
                                )}
                              >
                                £0 today
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="mx-auto w-full pt-5 lg:max-w-[440px] lg:pt-7">
                      <Button
                        onClick={handleProfileSubmit}
                        disabled={!profileForm.role}
                        className="h-12 w-full touch-manipulation rounded-2xl text-[15px] font-semibold bg-yellow-500 hover:bg-yellow-400 text-black active:scale-[0.98] lg:h-14 disabled:opacity-30 transition-all duration-150"
                      >
                        Continue
                      </Button>

                      {/* Trial note */}
                      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white">
                        <Gift className="h-3.5 w-3.5 text-yellow-400" />
                        <span>£0 today · Cancel in a couple of clicks</span>
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
                        Confirm the essentials and your free week starts —{' '}
                        <span className="font-semibold text-yellow-400">£0 today</span>, first
                        charge on day 8 only if you keep it. Cancel any time before in a couple of
                        clicks.
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
                          <div className="rounded-2xl border border-red-500/25 bg-red-500/[0.08] px-4 py-3">
                            <p className="text-[13px] text-red-400">{error}</p>
                            {existingAccount && (
                              <Link
                                to={`/auth/signin?email=${encodeURIComponent(email)}`}
                                className="mt-2 inline-block text-[13px] font-semibold text-elec-yellow"
                              >
                                Sign in instead →
                              </Link>
                            )}
                          </div>
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
                          icon: FileText,
                          label: 'Terms of Service',
                          desc: 'Our rules for using the platform',
                          req: true,
                        },
                        {
                          key: 'privacyAccepted',
                          icon: ShieldCheck,
                          label: 'Privacy Policy',
                          desc: 'How we protect your information',
                          req: true,
                        },
                        {
                          key: 'dataProcessingAccepted',
                          icon: Database,
                          label: 'Data Processing (GDPR)',
                          desc: 'Required for UK data compliance',
                          req: true,
                        },
                        {
                          key: 'marketingOptIn',
                          icon: Bell,
                          label: 'Updates & offers',
                          desc: 'Tips, new features & occasional deals — optional',
                          req: false,
                        },
                      ].map((item, i) => {
                        const checked = consent[item.key as keyof typeof consent];
                        const ItemIcon = item.icon;
                        return (
                          <motion.button
                            key={item.key}
                            type="button"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.03 + i * 0.05 }}
                            onClick={() => setConsent({ ...consent, [item.key]: !checked })}
                            aria-pressed={!!checked}
                            className={cn(
                              'flex w-full touch-manipulation items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200',
                              checked
                                ? 'border-yellow-400/50 bg-gradient-to-br from-yellow-500/[0.10] to-white/[0.02]'
                                : 'border-white/[0.12] bg-white/[0.03] hover:border-yellow-400/30 hover:bg-white/[0.04]'
                            )}
                          >
                            <div
                              className={cn(
                                'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border transition-colors',
                                checked
                                  ? 'border-yellow-400/40 bg-yellow-500/[0.18]'
                                  : 'border-yellow-500/25 bg-yellow-500/[0.10]'
                              )}
                            >
                              <ItemIcon className="h-[18px] w-[18px] text-yellow-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] font-semibold text-white">
                                  {item.label}
                                </span>
                                {item.req && !checked && (
                                  <span className="rounded-full bg-elec-yellow/10 px-2 py-0.5 text-[10px] font-semibold text-elec-yellow">
                                    Required
                                  </span>
                                )}
                              </div>
                              <span className="mt-0.5 block text-[11.5px] text-white/60">
                                {item.desc}
                              </span>
                            </div>
                            <div
                              aria-hidden
                              className={cn(
                                'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-150',
                                checked
                                  ? 'bg-yellow-400 shadow-[0_0_16px_rgba(250,204,21,0.4)]'
                                  : 'border-2 border-white/25'
                              )}
                            >
                              {checked && <Check className="h-4 w-4 text-black" strokeWidth={3} />}
                            </div>
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
                        £0 today · 7-day free trial · Cancel in a couple of clicks
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
