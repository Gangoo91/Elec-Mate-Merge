import {
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  BookOpen,
  Wrench,
  Sparkles,
  Loader2,
  MessageSquare,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Plan display info
const planInfo: Record<
  string,
  { name: string; icon: React.ElementType; color: string; features: string[] }
> = {
  'electrician-monthly': {
    name: 'Electrician Pro',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    features: [
      'Unlimited certificates',
      '8 AI specialist agents',
      'Quote & invoice builder',
      'Inspection & testing suite',
    ],
  },
  'electrician-annual': {
    name: 'Electrician Pro',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    features: [
      'Unlimited certificates',
      '8 AI specialist agents',
      'Quote & invoice builder',
      'Inspection & testing suite',
    ],
  },
  'apprentice-monthly': {
    name: 'Apprentice',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    features: [
      '2,000+ practice questions',
      'AM2 & City & Guilds exam prep',
      'BS 7671 study guides',
      '50+ electrical calculators',
    ],
  },
  'apprentice-annual': {
    name: 'Apprentice',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    features: [
      '2,000+ practice questions',
      'AM2 & City & Guilds exam prep',
      'BS 7671 study guides',
      '50+ electrical calculators',
    ],
  },
  'business-ai-monthly': {
    name: 'Business AI',
    icon: MessageSquare,
    color: 'from-amber-500 to-orange-500',
    features: [
      'Mate — your WhatsApp AI assistant',
      'Morning briefings & day planner',
      'Automated invoice chasing',
      'Email lead monitoring',
    ],
  },
  'business-ai-yearly': {
    name: 'Business AI',
    icon: MessageSquare,
    color: 'from-amber-500 to-orange-500',
    features: [
      'Mate — your WhatsApp AI assistant',
      'Morning briefings & day planner',
      'Automated invoice chasing',
      'Email lead monitoring',
    ],
  },
  'employer-monthly': {
    name: 'Employer',
    icon: Users,
    color: 'from-violet-500 to-purple-500',
    features: [
      'Team GPS & job tracking',
      'Job packs & assignments',
      'Timesheets & scheduling',
      'Everything in Business AI',
    ],
  },
  'employer-yearly': {
    name: 'Employer',
    icon: Users,
    color: 'from-violet-500 to-purple-500',
    features: [
      'Team GPS & job tracking',
      'Job packs & assignments',
      'Timesheets & scheduling',
      'Everything in Business AI',
    ],
  },
  'contractor-monthly': {
    name: 'Contractor',
    icon: Wrench,
    color: 'from-purple-500 to-pink-500',
    features: ['Team management', 'Multi-user access', 'Advanced reporting', 'Priority support'],
  },
  'contractor-annual': {
    name: 'Contractor',
    icon: Wrench,
    color: 'from-purple-500 to-pink-500',
    features: ['Team management', 'Multi-user access', 'Advanced reporting', 'Priority support'],
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

  // Calculate trial end date (7 days from now)
  const trialEndDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Derive role from planId so Dashboard doesn't redirect to complete-profile
  const roleFromPlan = planId.startsWith('apprentice')
    ? 'apprentice'
    : planId.startsWith('employer')
      ? 'employer'
      : 'electrician';

  // Ensure profile has a role set — fills the gap if webhook didn't set one
  const ensureRole = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (freshProfile: any) => {
      if (!user?.id || freshProfile?.role) return;
      try {
        await supabase
          .from('profiles')
          .update({
            role: roleFromPlan,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        // Re-fetch so AuthContext has the updated role
        await fetchProfile(user.id);
      } catch {
        // Non-fatal — Dashboard complete-profile page is the fallback
      }
    },
    [user?.id, roleFromPlan, fetchProfile]
  );

  const isBusinessAIPlan = planId.startsWith('business-ai') || planId.startsWith('employer');

  const handleGoToDashboard = useCallback(() => {
    if (autoNavRef.current) clearTimeout(autoNavRef.current);
    navigate(isBusinessAIPlan ? '/electrician/business-ai' : '/dashboard');
  }, [navigate, isBusinessAIPlan]);

  // Poll fetchProfile until subscription is confirmed, then auto-navigate
  useEffect(() => {
    if (!user?.id) return;

    let attempts = 0;
    const MAX_ATTEMPTS = 30;

    const poll = () => {
      pollRef.current = setInterval(async () => {
        attempts++;
        const freshProfile = await fetchProfile(user.id);

        if (freshProfile?.subscribed) {
          // Subscription confirmed — stop polling
          if (pollRef.current) clearInterval(pollRef.current);

          // Ensure role is set before navigating to dashboard
          await ensureRole(freshProfile);
          setActivationSlow(false);
          setIsReady(true);

          // Auto-navigate after 2s so user sees the success screen
          autoNavRef.current = setTimeout(() => {
            navigate(isBusinessAIPlan ? '/electrician/business-ai' : '/dashboard');
          }, 2000);
          return;
        }

        if (attempts >= MAX_ATTEMPTS) {
          // Timed out — enable button but warn user activation is slow
          if (pollRef.current) clearInterval(pollRef.current);
          await ensureRole(freshProfile);
          setActivationSlow(true);
          setIsReady(true);
        }
      }, 2000);
    };

    // Start polling immediately (no delay — webhook may already be done)
    poll();

    // Enable button after 10s regardless of polling state
    const earlyReadyTimer = setTimeout(() => {
      setIsReady(true);
    }, 10000);

    // Delay content reveal for animation
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearTimeout(earlyReadyTimer);
      clearTimeout(contentTimer);
      if (pollRef.current) clearInterval(pollRef.current);
      if (autoNavRef.current) clearTimeout(autoNavRef.current);
    };
  }, [user?.id, fetchProfile, navigate, ensureRole, isBusinessAIPlan]);

  // If profile already shows subscribed (e.g. fast webhook), mark ready immediately
  useEffect(() => {
    if (profile?.subscribed && !isReady) {
      setIsReady(true);
      if (pollRef.current) clearInterval(pollRef.current);
    }
  }, [profile?.subscribed, isReady]);

  return (
    <div
      className="min-h-screen flex flex-col pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 50% 20%, rgba(250,204,21,0.07) 0%, transparent 50%), #0a0a0a',
      }}
    >
      <div className="flex-1 flex items-center justify-center p-5 relative z-10">
        <div className="w-full max-w-[400px]">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.4 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 rounded-full bg-elec-yellow/15 ring-1 ring-elec-yellow/30 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-elec-yellow" strokeWidth={2} />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 12 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-[26px] font-bold text-white tracking-tight mb-2">
              {isTrial ? 'Welcome to Elec-Mate' : `${plan.name} is live`}
            </h1>
            <p className="text-[15px] text-white/70">
              {isTrial ? (
                <>
                  Your 7-day free trial starts now. No charge until{' '}
                  <span className="text-white font-medium">{trialEndDate}</span>.
                </>
              ) : (
                <>Your {plan.name} subscription is active</>
              )}
            </p>
          </motion.div>

          {/* Plan card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 12 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-elec-yellow/20 bg-white/[0.03] p-5 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                <PlanIcon className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white">{plan.name}</h3>
                <p className="text-[12px] text-elec-yellow flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  {isTrial ? '7-day free trial active' : 'Subscription active'}
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-[13px] text-white">
                  <div className="w-5 h-5 rounded-full bg-elec-yellow/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-3 w-3 text-elec-yellow" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 12 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Button
              onClick={handleGoToDashboard}
              disabled={!isReady}
              className={cn(
                'w-full h-14 rounded-2xl text-[16px] font-bold touch-manipulation transition-all',
                isReady
                  ? 'bg-[#FFD700] hover:bg-[#FFD700]/90 text-black shadow-[0_2px_24px_rgba(255,215,0,0.2)] active:scale-[0.98]'
                  : 'bg-white/10 text-white/60'
              )}
            >
              {!isReady ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Setting up your account...
                </>
              ) : (
                <>
                  {isBusinessAIPlan ? 'Set Up Mate' : 'Go to Dashboard'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Status + help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 text-center space-y-3"
          >
            {activationSlow && (
              <p className="text-[12px] text-amber-400">
                Taking longer than usual — you can still proceed
              </p>
            )}
            <p className="text-[11px] text-white">
              Cancel anytime in Settings. Need help?{' '}
              <a href="mailto:support@elec-mate.com" className="text-white/50 underline">
                support@elec-mate.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
