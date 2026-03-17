import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Loader2,
  Sparkles,
  CheckCircle,
  Rocket,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { PhoneVerificationStep } from './PhoneVerificationStep';
import { useBusinessAIProfile } from './useBusinessAIProfile';
import { openExternalUrl } from '@/utils/open-external-url';
import { MATE_PHONE_DISPLAY, MATE_WHATSAPP_LINK } from '@/constants/mate';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export function BusinessAIOnboardingView() {
  const { user, fetchProfile } = useAuth();
  const { phoneVerified, whatsappNumber } = useBusinessAIProfile();
  const { toast } = useToast();
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);

  // Derive current step from profile state
  const step = activated ? 3 : phoneVerified ? 2 : 1;

  const handlePhoneComplete = useCallback(async () => {
    // Refetch profile so we pick up the new phone number
    if (user && fetchProfile) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  const handleActivate = async () => {
    if (!user) return;

    setActivating(true);
    try {
      const { data, error } = await supabase.functions.invoke('provision-business-ai');

      if (error) throw new Error(error.message);

      if (data?.error) throw new Error(data.error);

      // Show success screen — do NOT refetch profile yet,
      // otherwise the parent (BusinessAIPage) will immediately swap to DashboardView
      // and the user will never see the success screen.
      setActivated(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Please try again or contact support.';
      toast({
        title: 'Activation failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setActivating(false);
    }
  };

  // Auto-transition to dashboard after 10 seconds on success screen.
  // Calling fetchProfile sets agent_status='active' in React state,
  // which causes the parent BusinessAIPage to render DashboardView.
  const transitionToDashboard = useCallback(async () => {
    if (user && fetchProfile) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (!activated) return;
    const timer = setTimeout(transitionToDashboard, 10000);
    return () => clearTimeout(timer);
  }, [activated, transitionToDashboard]);

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto pb-24 space-y-6"
      >
        {/* Back button — hidden on success screen */}
        {step < 3 && (
          <motion.div variants={itemVariants} className="px-4 pt-4">
            <Link to="/electrician">
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Header */}
        {step < 3 && (
          <motion.div variants={itemVariants} className="text-center px-4">
            <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 mb-4">
              <Sparkles className="h-10 w-10 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Set Up Your AI Agent</h1>
            <p className="text-sm text-white">Two quick steps to get Mate running</p>
          </motion.div>
        )}

        {/* Progress indicator */}
        {step < 3 && (
          <motion.div variants={itemVariants} className="px-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                    step > 1 ? 'bg-green-500 text-black' : 'bg-amber-500 text-black'
                  }`}
                >
                  {step > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
                </div>
                <span className="text-sm font-medium text-white">WhatsApp</span>
              </div>
              <div className="h-px flex-1 bg-white/10" />
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                    step === 2 ? 'bg-amber-500 text-black' : 'bg-white/10 text-white'
                  }`}
                >
                  2
                </div>
                <span className="text-sm font-medium text-white">Activate</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step content */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="glass-premium rounded-2xl p-5">
            {step === 1 ? (
              <PhoneVerificationStep
                onComplete={handlePhoneComplete}
                currentNumber={whatsappNumber}
              />
            ) : step === 2 ? (
              <div className="space-y-4 text-center">
                <div className="inline-flex p-3 rounded-2xl bg-amber-500/10">
                  <Rocket className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Activate Your AI Agent</h3>
                <p className="text-sm text-white">
                  Mate will be connected to your WhatsApp at{' '}
                  <span className="font-mono text-amber-400">{whatsappNumber}</span>. You can start
                  messaging straight away.
                </p>
                <Button
                  onClick={handleActivate}
                  disabled={activating}
                  className="w-full h-11 touch-manipulation bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-600 text-black font-semibold rounded-xl"
                >
                  {activating ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Activating Mate...
                    </span>
                  ) : (
                    'Activate Mate'
                  )}
                </Button>
              </div>
            ) : (
              /* Step 3: Activation success */
              <div className="space-y-5 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6, bounce: 0.4 }}
                >
                  <div className="inline-flex p-4 rounded-2xl bg-green-500/10">
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Mate is ready!</h3>
                  <p className="text-sm text-white">
                    Your AI agent is live on WhatsApp. Send a message to get started.
                  </p>
                </div>

                {/* Mate's WhatsApp number */}
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-4 space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-400" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Message Mate on WhatsApp
                    </span>
                  </div>
                  <div className="text-lg font-mono font-bold text-white">{MATE_PHONE_DISPLAY}</div>
                  <button
                    type="button"
                    onClick={() => openExternalUrl(MATE_WHATSAPP_LINK)}
                    className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm touch-manipulation transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Open WhatsApp
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* What to try first */}
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-white uppercase tracking-wider">
                    What to try first
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {[
                      'Give me a morning briefing',
                      "Who hasn't paid?",
                      "What's on today?",
                      'Draft a quote for a rewire',
                    ].map((prompt) => (
                      <span
                        key={prompt}
                        className="inline-block text-[11px] text-white bg-white/[0.06] border border-white/[0.08] rounded-full px-2.5 py-1 leading-tight"
                      >
                        "{prompt}"
                      </span>
                    ))}
                  </div>
                </div>

                {/* Go to dashboard */}
                <Button
                  onClick={transitionToDashboard}
                  variant="outline"
                  className="w-full h-11 touch-manipulation bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white rounded-xl"
                >
                  Go to Dashboard
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
