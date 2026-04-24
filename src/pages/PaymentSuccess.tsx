import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Loader2,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const planInfo: Record<
  string,
  { name: string; icon: React.ElementType; features: string[]; nextSteps: string[] }
> = {
  'electrician-monthly': {
    name: 'Electrician Pro',
    icon: Zap,
    features: [
      'Certificates, quotes and invoices',
      'AI tools, design tools and RAMS workflows',
      'Calculators and regs support on demand',
    ],
    nextSteps: ['Open your dashboard', 'Start a job flow', 'Use the platform on real work this week'],
  },
  'electrician-annual': {
    name: 'Electrician Pro',
    icon: Zap,
    features: [
      'Certificates, quotes and invoices',
      'AI tools, design tools and RAMS workflows',
      'Calculators and regs support on demand',
    ],
    nextSteps: ['Open your dashboard', 'Start a job flow', 'Use the platform on real work this week'],
  },
  'apprentice-monthly': {
    name: 'Apprentice',
    icon: BookOpen,
    features: ['Study Centre and mock exams', 'AM2 and BS 7671 support', 'Calculators and revision tools'],
    nextSteps: ['Open your dashboard', 'Pick up your study plan', 'Start using the platform every day'],
  },
  'apprentice-annual': {
    name: 'Apprentice',
    icon: BookOpen,
    features: ['Study Centre and mock exams', 'AM2 and BS 7671 support', 'Calculators and revision tools'],
    nextSteps: ['Open your dashboard', 'Pick up your study plan', 'Start using the platform every day'],
  },
  'business-ai-monthly': {
    name: 'Business AI',
    icon: MessageSquare,
    features: ['Mate on WhatsApp', 'Automated follow-up workflows', 'Business-side AI support'],
    nextSteps: ['Open Business AI', 'Connect your workflow', 'Start using Mate daily'],
  },
  'business-ai-yearly': {
    name: 'Business AI',
    icon: MessageSquare,
    features: ['Mate on WhatsApp', 'Automated follow-up workflows', 'Business-side AI support'],
    nextSteps: ['Open Business AI', 'Connect your workflow', 'Start using Mate daily'],
  },
  'employer-monthly': {
    name: 'Employer',
    icon: Users,
    features: ['Team and compliance visibility', 'Scheduling and shared workflows', 'Employer-wide oversight'],
    nextSteps: ['Open your dashboard', 'Review team activity', 'Set up your first workflow'],
  },
  'employer-yearly': {
    name: 'Employer',
    icon: Users,
    features: ['Team and compliance visibility', 'Scheduling and shared workflows', 'Employer-wide oversight'],
    nextSteps: ['Open your dashboard', 'Review team activity', 'Set up your first workflow'],
  },
  'contractor-monthly': {
    name: 'Contractor',
    icon: Wrench,
    features: ['Team access', 'Advanced reporting', 'Priority support'],
    nextSteps: ['Open your dashboard', 'Set up your workflow', 'Bring the team in'],
  },
  'contractor-annual': {
    name: 'Contractor',
    icon: Wrench,
    features: ['Team access', 'Advanced reporting', 'Priority support'],
    nextSteps: ['Open your dashboard', 'Set up your workflow', 'Bring the team in'],
  },
};

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get('plan') || 'electrician-monthly';
  const isTrial = searchParams.get('trial') === 'true';
  const { fetchProfile, profile, user } = useAuth();
  const [showContent, setShowContent] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [activationSlow, setActivationSlow] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoNavRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const plan = planInfo[planId] || planInfo['electrician-monthly'];
  const PlanIcon = plan.icon;
  const trialEndDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const roleFromPlan = planId.startsWith('apprentice')
    ? 'apprentice'
    : planId.startsWith('employer')
      ? 'employer'
      : 'electrician';

  const ensureRole = useCallback(
    async (freshProfile: unknown) => {
      const typedProfile = freshProfile as { role?: string } | null;
      if (!user?.id || typedProfile?.role) return;
      try {
        await supabase
          .from('profiles')
          .update({ role: roleFromPlan, updated_at: new Date().toISOString() })
          .eq('id', user.id);
        await fetchProfile(user.id);
      } catch {
        return;
      }
    },
    [fetchProfile, roleFromPlan, user?.id]
  );

  const isBusinessAIPlan = planId.startsWith('business-ai') || planId.startsWith('employer');

  const handleGoToDashboard = useCallback(() => {
    if (autoNavRef.current) clearTimeout(autoNavRef.current);
    navigate(isBusinessAIPlan ? '/electrician/business-ai' : '/dashboard');
  }, [isBusinessAIPlan, navigate]);

  useEffect(() => {
    if (!user?.id) return;

    let attempts = 0;
    const maxAttempts = 30;

    pollRef.current = setInterval(async () => {
      attempts++;
      const freshProfile = await fetchProfile(user.id);

      if (freshProfile?.subscribed) {
        if (pollRef.current) clearInterval(pollRef.current);
        await ensureRole(freshProfile);
        setActivationSlow(false);
        setIsReady(true);
        autoNavRef.current = setTimeout(() => {
          navigate(isBusinessAIPlan ? '/electrician/business-ai' : '/dashboard');
        }, 2200);
        return;
      }

      if (attempts >= maxAttempts) {
        if (pollRef.current) clearInterval(pollRef.current);
        await ensureRole(freshProfile);
        setActivationSlow(true);
        setIsReady(true);
      }
    }, 2000);

    const earlyReadyTimer = setTimeout(() => {
      setIsReady(true);
    }, 10000);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 250);

    return () => {
      clearTimeout(earlyReadyTimer);
      clearTimeout(contentTimer);
      if (pollRef.current) clearInterval(pollRef.current);
      if (autoNavRef.current) clearTimeout(autoNavRef.current);
    };
  }, [ensureRole, fetchProfile, isBusinessAIPlan, navigate, user?.id]);

  useEffect(() => {
    if (profile?.subscribed && !isReady) {
      setIsReady(true);
      if (pollRef.current) clearInterval(pollRef.current);
    }
  }, [isReady, profile?.subscribed]);

  return (
    <div
      className="min-h-[100svh] bg-[#0a0a0a]"
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 50% 18%, rgba(250,204,21,0.07) 0%, transparent 50%), #0a0a0a',
      }}
    >
      <div className="mx-auto grid min-h-[100svh] max-w-[1100px] items-stretch px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-[calc(env(safe-area-inset-top)+24px)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:px-8">
        <div className="hidden lg:flex lg:flex-col lg:justify-between lg:py-10">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Elec-Mate" className="h-11 w-11 rounded-xl object-cover" />
              <span className="text-[22px] font-bold tracking-tight text-white">
                Elec-<span className="text-yellow-400">Mate</span>
              </span>
            </Link>

            <div className="mt-14 max-w-[30rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-yellow-300">
                <Sparkles className="h-3.5 w-3.5" />
                You are in
              </div>
              <h1 className="mt-6 text-[4rem] font-bold leading-[0.95] tracking-[-0.05em] text-white">
                The platform is ready for your first real week.
              </h1>
              <p className="mt-5 max-w-[26rem] text-base leading-8 text-white/72">
                The next job of this screen is simple: confirm the trial, show what is live, and
                move you into the dashboard fast.
              </p>
            </div>
          </div>

          <div className="grid gap-4 border-t border-white/10 pt-6 text-sm leading-7 text-white/72">
            <div>{plan.name} is active</div>
            <div>{isTrial ? `No charge until ${trialEndDate}` : 'Subscription active'}</div>
            <div>Next stop: {isBusinessAIPlan ? 'Business AI' : 'Dashboard'}</div>
          </div>
        </div>

        <div className="flex flex-col justify-center py-8 lg:py-10">
          <div className="mx-auto w-full max-w-[440px]">
            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <img src="/logo.jpg" alt="" className="h-10 w-10 rounded-xl object-cover" />
              <span className="text-[20px] font-bold tracking-tight text-white">
                Elec-<span className="text-yellow-400">Mate</span>
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 12 }}
              transition={{ duration: 0.35 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-8"
            >
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-elec-yellow/15 ring-1 ring-elec-yellow/30">
                  <CheckCircle className="h-10 w-10 text-elec-yellow" strokeWidth={2} />
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-yellow-300/78">
                  Success
                </p>
                <h1 className="mt-3 text-[30px] font-bold tracking-[-0.04em] text-white">
                  {isTrial ? 'Your free trial is live' : `${plan.name} is live`}
                </h1>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  {isTrial ? (
                    <>
                      You will not be charged until <span className="font-medium text-white">{trialEndDate}</span>.
                    </>
                  ) : (
                    <>Your subscription is active and ready to use.</>
                  )}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-elec-yellow/20 bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-elec-yellow/15">
                    <PlanIcon className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white">{plan.name}</h3>
                    <p className="flex items-center gap-1 text-[12px] text-elec-yellow">
                      <Shield className="h-3 w-3" />
                      {isTrial ? '7-day free trial active' : 'Subscription active'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 text-[13px] text-white">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-elec-yellow/15">
                        <CheckCircle className="h-3 w-3 text-elec-yellow" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/52">
                  What happens next
                </p>
                <div className="mt-3 space-y-3">
                  {plan.nextSteps.map((step, index) => (
                    <div key={step} className="flex items-start gap-3 text-[14px] text-white/82">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[12px] font-semibold text-yellow-300">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGoToDashboard}
                disabled={!isReady}
                className={cn(
                  'mt-8 h-14 w-full rounded-2xl text-[16px] font-bold transition-all',
                  isReady
                    ? 'bg-[#FFD700] text-black shadow-[0_2px_24px_rgba(255,215,0,0.2)] hover:bg-[#FFD700]/90'
                    : 'bg-white/10 text-white/60'
                )}
              >
                {!isReady ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Finishing setup...
                  </>
                ) : (
                  <>
                    {isBusinessAIPlan ? 'Open Business AI' : 'Go to Dashboard'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <div className="mt-6 text-center">
                {activationSlow && (
                  <p className="mb-2 text-[12px] text-amber-400">
                    Activation is taking longer than usual, but you can still proceed.
                  </p>
                )}
                <p className="text-[11px] text-white/58">
                  Cancel anytime in Settings. Need help?{' '}
                  <a href="mailto:info@elec-mate.com" className="underline">
                    info@elec-mate.com
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
