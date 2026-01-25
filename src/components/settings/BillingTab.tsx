import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  CreditCard,
  Zap,
  Receipt,
  Calendar,
  ExternalLink,
  Crown,
  ChevronRight,
  Shield,
  Clock,
  CheckCircle,
  Mail,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import StripeConnectSetup from '@/components/electrician/settings/StripeConnectSetup';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' }
  }
};

const BillingTab = () => {
  const { isSubscribed, subscriptionTier } = useAuth();
  const navigate = useNavigate();

  const proFeatures = [
    'Unlimited certificates & reports',
    'AI-powered tools & assistants',
    'Priority customer support',
    'Advanced analytics dashboard',
    'Custom branding options',
    'Cloud backup & sync',
  ];

  const freeFeatures = [
    'Basic certificate creation',
    'Limited AI features',
    'Community support',
    'Standard templates',
  ];

  const features = isSubscribed ? proFeatures : freeFeatures;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Current Plan Card */}
      <motion.div
        variants={itemVariants}
        className={`rounded-2xl overflow-hidden ${
          isSubscribed
            ? 'bg-gradient-to-br from-elec-yellow/20 via-amber-500/10 to-orange-500/5 border border-elec-yellow/30'
            : 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10'
        }`}
      >
        <div className="p-5">
          {/* Plan Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isSubscribed
                  ? 'bg-elec-yellow/20 ring-2 ring-elec-yellow/30'
                  : 'bg-white/10'
              }`}>
                {isSubscribed ? (
                  <Crown className="h-7 w-7 text-elec-yellow" />
                ) : (
                  <Zap className="h-7 w-7 text-foreground/50" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {isSubscribed ? (subscriptionTier || 'Pro') : 'Free'} Plan
                  </h3>
                  {isSubscribed && (
                    <BadgeCheck className="h-5 w-5 text-elec-yellow" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {isSubscribed ? 'Full access to all premium features' : 'Upgrade to unlock all features'}
                </p>
              </div>
            </div>
          </div>

          {/* Renewal Info for Subscribers */}
          {isSubscribed && (
            <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-black/20">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm text-foreground/80">
                Next billing date: <span className="font-medium text-foreground">1st February 2026</span>
              </span>
            </div>
          )}

          {/* Features Grid */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {isSubscribed ? 'Your Premium Features' : 'Current Features'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isSubscribed ? 'bg-green-500/20' : 'bg-white/10'
                  }`}>
                    <CheckCircle className={`h-3.5 w-3.5 ${
                      isSubscribed ? 'text-green-400' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <span className="text-foreground/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isSubscribed ? (
              <Button
                onClick={() => navigate('/subscriptions')}
                className="flex-1 h-12 touch-manipulation active:scale-[0.98] bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold text-base rounded-xl"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/subscriptions')}
                className="flex-1 h-12 touch-manipulation active:scale-[0.98] border-elec-yellow/30 hover:bg-elec-yellow/10 text-foreground font-medium rounded-xl"
              >
                View Plans
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stripe Connect */}
      <motion.div variants={itemVariants}>
        <StripeConnectSetup />
      </motion.div>

      {/* Billing Management */}
      {isSubscribed && (
        <motion.div variants={itemVariants} className="rounded-2xl bg-elec-gray/50 border border-white/10 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-elec-yellow" />
              Manage Subscription
            </h3>
          </div>
          <div className="p-3 space-y-2">
            <button
              onClick={() => window.open('https://billing.stripe.com/p/login/test_8wM6pY7xJ4j2bks000', '_blank')}
              className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Receipt className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Billing History</p>
                  <p className="text-xs text-muted-foreground">View invoices and receipts</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </button>

            <button
              onClick={() => window.open('https://billing.stripe.com/p/login/test_8wM6pY7xJ4j2bks000', '_blank')}
              className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Payment Method</p>
                  <p className="text-xs text-muted-foreground">Update card or billing details</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Security Badge */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/20 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <Shield className="h-5 w-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Secured by Stripe</p>
            <p className="text-xs text-muted-foreground">
              Bank-level encryption protects all transactions
            </p>
          </div>
        </div>
      </motion.div>

      {/* Support Contact */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl bg-white/[0.02] border border-white/10 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
            <Mail className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Need billing help?</p>
            <a
              href="mailto:info@elec-mate.com"
              className="text-sm text-elec-yellow hover:underline"
            >
              info@elec-mate.com
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BillingTab;
