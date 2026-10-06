import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useHaptic } from '@/hooks/useHaptic';
import { useKeyboardOpen } from '@/hooks/useKeyboardOpen';
import { CARD_BASE, CARD_NEUTRAL, CARD_PRIMARY } from '@/components/ui/card-recipe';
import { Section, PlanRows, ShellFooter } from '@/components/auth/SignupShell';
import { AuthFrame, AuthHeading } from '@/components/auth/AuthFrame';
import {
  PLANS,
  PLAN_ORDER,
  JOURNEY,
  gbp,
  offerPrice,
  offerLabel,
  type Plan,
} from '@/components/auth/signupPlans';
import {
  inputCn,
  labelCn,
  checkRowCn,
  checkboxCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { storeConsent } from '@/services/consentService';
import TrialExpiredPaywall from '@/components/auth/TrialExpiredPaywall';
import { supabase } from '@/integrations/supabase/client';
import { useSignupOffer, offerForPlan } from '@/hooks/useSignupOffer';
import { storageSetSync, storageGetSync, storageRemoveSync } from '@/utils/storage';
import { cn } from '@/lib/utils';
import { addBreadcrumb, captureCriticalError } from '@/lib/sentry';
import { normaliseReferralSource } from '@/lib/referralSource';
import { isPasswordBreached } from '@/utils/passwordCheck';
import { trackLead, trackCompleteRegistration } from '@/lib/marketing-pixels';
import {
  trackSignupCompleted,
  trackSignupPageViewed,
  trackSignupStarted,
} from '@/lib/analytics-events';
import {
  persistAttributionToProfile,
  fireServerCapi,
  getStoredAttribution,
} from '@/lib/attribution';

const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: '8+ characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'upper case', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'lower case', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'a number', test: (p: string) => /[0-9]/.test(p) },
];

/*
 * Built from the app's own parts — the certificate form shell (Back + title +
 * tabs, section cards, underline fields, fixed Back/Continue footer) and the
 * hub card recipe for the plan choice. Andrew, 2 Oct 2026: "we use the volt
 * design in the app… how the forms are used in the certs". No icons, and volt
 * is only ever a solid fill, a line or text — never a wash (it goes brown).
 *
 * Two steps: details + plan, then check and agree.
 */
type Step = 'details' | 'confirm';
const STEPS: Step[] = ['details', 'confirm'];

const OFFER_SAVED_AT_KEY = 'elec-mate-offer-code-at';
const OFFER_KEEP_MS = 30 * 24 * 60 * 60 * 1000;

/** One line of red under the field it belongs to. */
const FieldError = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <p id={id} role="alert" className="mt-1.5 text-[13px] font-medium text-red-300">
    {children}
  </p>
);

/** Referral code fallback — for people who installed without a link. */
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
      <p className="text-[13px] font-semibold text-elec-yellow">
        Referral code applied — your first month's on us.
      </p>
    );
  }
  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="-ml-1 h-11 touch-manipulation px-1 text-[13px] font-semibold text-elec-yellow"
      >
        Got a referral code?
      </button>
    );
  }
  return (
    <div className="flex items-end gap-3">
      <div className="flex-1">
        <label htmlFor="ref" className={labelCn}>
          Referral code
        </label>
        <input
          id="ref"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          placeholder="MATE-ABC123"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          className={cn(inputCn, 'tracking-wider')}
        />
      </div>
      <button type="button" onClick={apply} className={cn(buttonSecondaryCn, 'px-5')}>
        Apply
      </button>
    </div>
  );
};

/* ─── Main component ─── */

const SignUp = () => {
  const [step, setStep] = useState<Step>('details');
  // Set when signup fails because the email already has a real account —
  // renders a direct "Sign in instead" escape next to the error
  const [existingAccount, setExistingAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signupStartedRef = useRef(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  /*
   * One agreement tick (Andrew, 2 Oct 2026) covering Terms, Privacy and Data
   * Processing — all three are still recorded. Marketing stays separate and
   * unticked: under UK GDPR it is the one that needs its own consent.
   */
  const [agreed, setAgreed] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  // Footer slides away only while an on-screen keyboard is really up.
  const keyboardOpen = useKeyboardOpen();
  // Inline errors appear only after a Continue attempt, never while typing.
  const [triedContinue, setTriedContinue] = useState(false);
  const haptic = useHaptic();

  const { signUp, user, profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [offerCode, setOfferCode] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const { offer, loading: offerLoading } = useSignupOffer(offerCode);
  const terms = offerForPlan(offer, plan);

  const currentStepIndex = STEPS.indexOf(step);
  const allPasswordRequirementsMet = PASSWORD_REQUIREMENTS.every((r) => r.test(password));
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const fieldErrors = {
    plan: !plan ? 'Choose Electrician or Apprentice.' : null,
    name: !fullName.trim() ? 'Enter your full name.' : null,
    email: !email.trim()
      ? 'Enter your email address.'
      : !isEmailValid
        ? "That email doesn't look right — check for a typo."
        : null,
    password: !allPasswordRequirementsMet
      ? 'Needs 8+ characters, upper and lower case, and a number.'
      : null,
  };
  const shownError = (k: keyof typeof fieldErrors) => (triedContinue ? fieldErrors[k] : null);

  /*
    Count the page render itself, once per mount.

    `trackSignupStarted` only fires on first field focus, so anyone who arrived
    and left without touching the form registered nowhere — which made email
    campaigns impossible to read below the click. With this, the funnel finally
    has its first rung: page viewed → started → completed → paid, each carrying
    the campaign from stored attribution.
  */
  const pageViewTrackedRef = useRef(false);
  useEffect(() => {
    if (pageViewTrackedRef.current) return;
    pageViewTrackedRef.current = true;
    trackSignupPageViewed({ referrer: document.referrer || undefined });
  }, []);

  // If a logged-in subscribed user lands here, send them straight to the app.
  useEffect(() => {
    if (!user || !profile) return;
    if (profile.subscribed || profile.free_access_granted) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, profile, navigate]);

  useEffect(() => {
    // Codes are stored upper-case in promo_offers and looked up exactly, so a
    // tutor pasting bet50 into a WhatsApp group must still land the discount.
    const code = searchParams.get('offer')?.trim().toUpperCase();
    if (code) {
      storageSetSync('elec-mate-offer-code', code);
      storageSetSync(OFFER_SAVED_AT_KEY, String(Date.now()));
      setOfferCode(code);
    } else {
      // Came back without the link (browsed the site first) — checkout still
      // applies the saved code, so the page must show it too. Only for a
      // month: an offer link opened weeks ago shouldn't follow someone into
      // sign-up indefinitely. (A code saved before the stamp existed gets
      // stamped now rather than silently dropped.)
      const saved = storageGetSync('elec-mate-offer-code');
      if (saved) {
        const at = Number(storageGetSync(OFFER_SAVED_AT_KEY));
        if (!at) storageSetSync(OFFER_SAVED_AT_KEY, String(Date.now()));
        if (at && Date.now() - at > OFFER_KEEP_MS) {
          storageRemoveSync('elec-mate-offer-code');
          storageRemoveSync(OFFER_SAVED_AT_KEY);
        } else {
          setOfferCode(saved);
        }
      }
    }
    // ?role=apprentice|electrician pre-selects the plan from a link.
    const r = searchParams.get('role');
    if (r === 'electrician' || r === 'apprentice') setPlan(r);
  }, [searchParams]);

  // An offer link says which plan it's for — start there unless they chose.
  useEffect(() => {
    if (offer && !plan) setPlan(offer.main.planId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer]);

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

  // ─── Handlers ───

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTriedContinue(true);
    // Take them to the first thing that needs fixing — on a phone the
    // Continue button is a screen away from the field that's wrong.
    const firstBad = (['plan', 'name', 'email', 'password'] as const).find((k) => fieldErrors[k]);
    if (firstBad) {
      haptic.error();
      const el = document.getElementById(firstBad === 'plan' ? 'plan-choice' : firstBad);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (firstBad !== 'plan') (el as HTMLInputElement | null)?.focus({ preventScroll: true });
      return;
    }
    setEmail(email.trim());
    // Note: we intentionally do NOT pre-check for a duplicate email here.
    // `profiles.email` is not a public column (RLS + schema), so that query
    // always returned a 400. Supabase's `signUp()` call on the final step
    // surfaces duplicate-email errors correctly anyway.
    setError(null);
    addBreadcrumb('Signup step: details completed', 'signup', { email, role: plan });
    setStep('confirm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    if (!agreed) {
      setError('Tick the box to agree to the terms.');
      return;
    }
    if (!plan) {
      setStep('details');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    addBreadcrumb('Signup step: confirm completed, submitting', 'signup', {
      marketingOptIn,
    });
    try {
      // Pre-check password against HaveIBeenPwned BEFORE calling Supabase signUp.
      // This prevents Supabase from creating a zombie user when it rejects the password.
      const breached = await isPasswordBreached(password);
      if (breached) {
        setError(
          "This password has appeared in a known data breach and can't be used. Choose one you haven't used on other sites."
        );
        setStep('details');
        setIsSubmitting(false);
        return;
      }

      const { error, data } = await signUp(email.trim(), password, fullName.trim());
      if (error) {
        const lowerMsg = (error.message || '').toLowerCase();
        const isWeakPassword = lowerMsg.includes('password') && lowerMsg.includes('weak');

        if (isWeakPassword) {
          setError("This password can't be used — choose one you haven't used on other sites.");
          setStep('details');
        } else if (
          lowerMsg.includes('already registered') ||
          lowerMsg.includes('already been registered')
        ) {
          // Real existing account (zombie cleanup already tried) — give them
          // a direct way out instead of a dead-end error
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
        storageSetSync('elec-mate-profile-role', plan);
        const saveRole = async (retries = 3): Promise<boolean> => {
          const payload: Record<string, unknown> = {
            role: plan,
            onboarding_completed: false,
            updated_at: new Date().toISOString(),
          };
          const storedRef = storageGetSync('elec-mate-referral-code');
          if (storedRef) {
            try {
              // Token-style lookup: one code's owner, not the whole table.
              const { data: refRows } = await supabase.rpc(
                'resolve_referral_code' as never,
                { p_code: storedRef } as never
              );
              const refData =
                ((refRows as unknown as { user_id: string }[] | null) ?? [])[0] ?? null;
              if (refData?.user_id) {
                payload.referred_by = refData.user_id;
                // This row is the ONLY thing that pays the referrer — both
                // reward paths (stripe-subscription-webhook and
                // process-referral-reward) look it up by referred_id. If the
                // insert fails there is no second chance, so the error is
                // logged rather than swallowed, and `source` is normalised
                // against referrals_source_check: an unrecognised ?src= used to
                // fail the CHECK and silently cost the referrer their month.
                const { error: referralErr } = await supabase.from('referrals').insert({
                  referrer_id: refData.user_id,
                  referred_id: userId,
                  referred_email: email,
                  referral_code: storedRef,
                  status: 'signed_up',
                  source: normaliseReferralSource(searchParams.get('src')),
                });
                if (referralErr) {
                  console.error('[signup] referral row insert failed', referralErr);
                  captureCriticalError(referralErr, {
                    context: 'signup_referral_insert',
                    referralCode: storedRef,
                    referrerId: refData.user_id,
                    referredId: userId,
                  });
                }
              }
            } catch (err) {
              console.error('[signup] referral attribution threw', err);
              captureCriticalError(err, { context: 'signup_referral_attribution' });
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
        terms_accepted: agreed,
        privacy_accepted: agreed,
        data_processing_accepted: agreed,
        marketing_opt_in: marketingOptIn,
        consent_timestamp: new Date().toISOString(),
      }).catch(() => {});

      // Marketing attribution — persist UTM/gclid/fbclid to profile + fire
      // CompleteRegistration via both browser Pixel and server CAPI (same
      // event_id for dedup) so the conversion attributes to the ad channel.
      if (userId) {
        const regEventId = trackCompleteRegistration({ method: plan });
        // Cookieless funnel event (Vercel + PostHog) — the pixel/CAPI calls here
        // are consent-gated; this one counts every signup in the Vercel dashboard.
        trackSignupCompleted({ method: plan });
        const [firstName, ...rest] = fullName.trim().split(/\s+/);
        fireServerCapi({
          event_name: 'CompleteRegistration',
          event_id: regEventId,
          email,
          user_id: userId,
          first_name: firstName,
          last_name: rest.join(' ') || undefined,
          content_name: plan,
        });
        persistAttributionToProfile(userId).catch(() => {});

        // Add to Brevo newsletter list if the user ticked marketing opt-in.
        // Keeps consent lawful — we only add people who explicitly agreed.
        if (marketingOptIn) {
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

      storageSetSync('elec-mate-checkout-planId', PLANS[plan].planId);
      storageSetSync('elec-mate-checkout-priceId', PLANS[plan].priceId);
      // Carry the code that fits the chosen plan (the partner code if they
      // switched) so checkout applies the price this page promised.
      if (terms) storageSetSync('elec-mate-offer-code', terms.code);
      storageRemoveSync('elec-mate-onboarding-data');

      // ELE-1282: buyers arriving from a Stripe payment link have ALREADY
      // paid — never route them to the trial checkout (they'd be asked to
      // pay twice). check-subscription's orphan-adoption links their Stripe
      // sub by email on first dashboard load.
      if (searchParams.get('from') === 'payment') {
        navigate('/dashboard', { replace: true });
        return;
      }

      // Both platforms land on the CheckoutTrial interstitial (ELE-1268/1270):
      // plan summary and trial terms first, card form only on click.
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
    setStep('details');
  };

  // Logged-in but not subscribed — they already have an account and abandoned
  // Stripe checkout (or their trial ended). Show the paywall instead of the
  // signup form so they can't get stuck with "email already exists" on re-try.
  if (user && profile && !profile.subscribed && !profile.free_access_granted) {
    return <TrialExpiredPaywall />;
  }

  const goToConfirm = () => {
    haptic.light();
    handleDetailsSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  const footer = (
    <ShellFooter hidden={keyboardOpen}>
      {step === 'confirm' && (
        <button type="button" onClick={goBack} className={cn(buttonSecondaryCn, 'flex-1')}>
          Back
        </button>
      )}
      {step === 'details' ? (
        <button type="button" onClick={goToConfirm} className={cn(buttonPrimaryCn, 'flex-[2]')}>
          Continue
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            haptic.light();
            void handleFinalSubmit();
          }}
          disabled={isSubmitting || !agreed}
          className={cn(buttonPrimaryCn, 'flex flex-[2] items-center justify-center')}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating your account
            </>
          ) : (
            'Create account'
          )}
        </button>
      )}
    </ShellFooter>
  );

  // A value, not a component: an inline component remounts on every render.
  const errorBox = error ? (
    <div role="alert" className="rounded-xl border border-red-400/40 bg-red-500/[0.10] px-4 py-3">
      <p className="text-[13.5px] font-medium text-red-200">{error}</p>
      {existingAccount && (
        <Link
          to={`/auth/signin?email=${encodeURIComponent(email)}`}
          className="mt-1 inline-flex h-11 items-center text-[14px] font-semibold text-elec-yellow"
        >
          Sign in instead
        </Link>
      )}
    </div>
  ) : null;

  return (
    <AuthFrame
      back={step === 'details' ? '/' : goBack}
      step={{ current: currentStepIndex, total: JOURNEY.length }}
      panel={{
        headline: (
          <>
            Seven days free. <span className="text-elec-yellow">£0 today.</span>
          </>
        ),
      }}
      footer={footer}
    >
      {step === 'details' && (
        <form
          id="signup-details"
          onSubmit={handleDetailsSubmit}
          onFocusCapture={() => {
            // Fires once per visit on first field focus — separates
            // "form scared them off" from "never engaged at all".
            if (!signupStartedRef.current) {
              signupStartedRef.current = true;
              trackSignupStarted();
            }
          }}
          noValidate
          className="space-y-6"
        >
          <AuthHeading
            title="Create your account"
            sub={
              <>
                <span className="font-semibold text-elec-yellow">£0 today</span> · 7 days free ·
                cancel any time
              </>
            }
          />
          {/* ELE-1282: arrival from a Stripe payment link — they've
                already paid; the account email must match the payment
                email for the subscription to link automatically. */}
          {searchParams.get('from') === 'payment' && (
            <p className="rounded-xl border border-green-400/40 bg-green-500/[0.08] px-4 py-3 text-[13.5px] font-medium text-green-200">
              Payment received. Use the same email you paid with and your subscription connects
              automatically.
            </p>
          )}

          <Section title="Choose your plan">
            {offerLoading && <div className="h-5 w-2/3 animate-pulse rounded bg-white/[0.08]" />}
            {offer && (
              <p className="text-[13.5px] font-semibold leading-snug text-elec-yellow">
                {offerLabel(terms ?? offer.main)}
              </p>
            )}
            {referralCode && !offerCode && (
              <p className="text-[13.5px] font-semibold text-elec-yellow">
                Referred by a mate · your first month's on us
              </p>
            )}

            <div
              id="plan-choice"
              role="radiogroup"
              aria-label="Plan"
              aria-invalid={!!shownError('plan')}
              className="grid scroll-mt-24 grid-cols-2 gap-2.5 sm:gap-3"
            >
              {PLAN_ORDER.map((key) => {
                const p = PLANS[key];
                const t = offerForPlan(offer, key);
                const selected = plan === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      haptic.light();
                      setPlan(key);
                      setError(null);
                    }}
                    className={cn(
                      CARD_BASE,
                      selected ? CARD_PRIMARY : CARD_NEUTRAL,
                      'relative min-h-[132px] overflow-hidden p-3.5 sm:p-4'
                    )}
                  >
                    {!selected && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
                      />
                    )}
                    <span
                      className={cn(
                        'text-[16px] font-bold leading-tight tracking-tight sm:text-[17px]',
                        selected ? 'text-black' : 'text-white group-hover:text-elec-yellow'
                      )}
                    >
                      {p.label}
                    </span>
                    <span
                      className={cn(
                        'mt-1 text-[11.5px] leading-snug',
                        selected ? 'text-black' : 'text-white'
                      )}
                    >
                      {p.blurb}
                    </span>
                    <span className="flex-grow" />
                    <span
                      className={cn(
                        'mt-3 text-[19px] font-bold leading-none tabular-nums tracking-tight',
                        selected ? 'text-black' : 'text-white'
                      )}
                    >
                      {t ? offerPrice(key, t) : gbp(p.list)}
                      <span className="text-[12px] font-semibold"> /mo</span>
                    </span>
                    {t && (
                      <span
                        className={cn(
                          'mt-1 text-[11.5px] font-medium line-through',
                          selected ? 'text-black' : 'text-white'
                        )}
                      >
                        {gbp(p.list)}/mo
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {shownError('plan') && <FieldError id="plan-error">{shownError('plan')}</FieldError>}

            {plan ? (
              <>
                {offer && !terms && (
                  <p className="text-[13px] text-white">
                    This offer is for{' '}
                    {offer.main.planId === 'electrician' ? 'electricians' : 'apprentices'}.{' '}
                    {PLANS[plan].label} is {gbp(PLANS[plan].list)}/mo after your free week.
                  </p>
                )}
                {/* One line here; the full breakdown is on the next step. */}
                <p className="text-[13.5px] leading-snug text-white">
                  <span className="font-semibold text-elec-yellow">£0 today</span>, then{' '}
                  <span className="font-semibold">
                    {terms ? offerPrice(plan, terms) : gbp(PLANS[plan].list)}/mo
                  </span>
                  {terms?.months ? ` for ${terms.months} months` : ''} after your free week. Cancel
                  any time.
                </p>
              </>
            ) : (
              <p className="text-[13px] text-white">
                Both start with 7 days free. Nothing is charged today.
              </p>
            )}
          </Section>

          <Section title="Your details">
            <div>
              <label htmlFor="name" className={labelCn}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                aria-invalid={!!shownError('name')}
                aria-describedby={shownError('name') ? 'name-error' : undefined}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. John Smith"
                autoComplete="name"
                autoCapitalize="words"
                enterKeyHint="next"
                className={cn(inputCn, 'scroll-mt-24', shownError('name') && '!border-red-400')}
              />
              {shownError('name') && <FieldError id="name-error">{shownError('name')}</FieldError>}
            </div>
            <div>
              <label htmlFor="email" className={labelCn}>
                Email
              </label>
              <input
                id="email"
                name="email"
                aria-invalid={!!shownError('email')}
                aria-describedby={shownError('email') ? 'email-error' : undefined}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlurCapture={() => setEmail((v) => v.trim())}
                placeholder="you@example.com"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                inputMode="email"
                enterKeyHint="next"
                className={cn(inputCn, 'scroll-mt-24', shownError('email') && '!border-red-400')}
              />
              {shownError('email') && (
                <FieldError id="email-error">{shownError('email')}</FieldError>
              )}
            </div>
            <div>
              <label htmlFor="password" className={labelCn}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  aria-invalid={!!shownError('password')}
                  aria-describedby={shownError('password') ? 'password-error' : undefined}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  autoCapitalize="none"
                  enterKeyHint="go"
                  className={cn(
                    inputCn,
                    'scroll-mt-24 pr-16',
                    shownError('password') && '!border-red-400'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-0 top-0 h-11 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-white" aria-live="polite">
                {PASSWORD_REQUIREMENTS.map((req, i) => (
                  <span key={req.id}>
                    {i > 0 && ' · '}
                    <span
                      className={cn(
                        'transition-colors',
                        req.test(password) ? 'font-semibold text-elec-yellow' : 'text-white'
                      )}
                    >
                      {req.label}
                    </span>
                  </span>
                ))}
              </p>
              {shownError('password') && (
                <FieldError id="password-error">{shownError('password')}</FieldError>
              )}
            </div>

            {!referralCode && !offerCode && (
              <ReferralCodeField
                onApply={(code) => {
                  setReferralCode(code);
                  storageSetSync('elec-mate-referral-code', code);
                }}
              />
            )}

            <p className="border-t border-white/[0.08] pt-3 text-[13px] text-white">
              Already have an account?{' '}
              <Link
                to="/auth/signin"
                className="inline-flex h-11 items-center font-semibold text-elec-yellow"
              >
                Sign in
              </Link>
            </p>
          </Section>

          {errorBox}
          {/* Enter key submits the form; the visible button lives in the footer. */}
          <button type="submit" className="sr-only" tabIndex={-1} aria-hidden>
            Continue
          </button>
        </form>
      )}

      {step === 'confirm' && plan && (
        <div className="space-y-6">
          <AuthHeading title="Check and confirm" sub="One tick and you're in." />
          <Section title="Your plan">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[19px] font-bold tracking-tight text-white">{PLANS[plan].label}</p>
              {terms && (
                <span className="text-[13px] font-semibold text-elec-yellow">
                  {terms.code} · {terms.percentOff}% off
                </span>
              )}
            </div>
            <PlanRows plan={plan} terms={terms} />
            <p className="text-[13px] text-white">
              Signing up as <span className="font-semibold">{email}</span>{' '}
              <button
                type="button"
                onClick={goBack}
                className="h-11 px-1 font-semibold text-elec-yellow touch-manipulation"
              >
                Change
              </button>
            </p>
          </Section>

          <Section title="Agreement">
            <label htmlFor="agree" className={cn(checkRowCn, 'items-start')}>
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(v) => {
                  haptic.light();
                  setAgreed(v === true);
                  setError(null);
                }}
                className={cn(checkboxCn, 'mt-0.5')}
              />
              <span className="text-[14px] leading-[1.55] text-white">
                I agree to the{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-semibold text-elec-yellow underline underline-offset-2"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="/dpa"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-semibold text-elec-yellow underline underline-offset-2"
                >
                  Data Processing Agreement
                </a>
                , and I&rsquo;ve read the{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-semibold text-elec-yellow underline underline-offset-2"
                >
                  Privacy notice
                </a>
                .
              </span>
            </label>
            <label htmlFor="marketing" className={cn(checkRowCn, 'items-start')}>
              <Checkbox
                id="marketing"
                checked={marketingOptIn}
                onCheckedChange={(v) => {
                  haptic.light();
                  setMarketingOptIn(v === true);
                }}
                className={cn(checkboxCn, 'mt-0.5')}
              />
              <span className="text-[14px] leading-[1.55] text-white">
                Send me tips, new features and offers. Optional, unsubscribe any time.
              </span>
            </label>
            <p className="text-[13px] text-white">
              Next: start your free week at secure checkout. Nothing is charged today.
            </p>
          </Section>

          {errorBox}
        </div>
      )}
    </AuthFrame>
  );
};

export default SignUp;
