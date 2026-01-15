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
  Info,
} from "lucide-react";
import StripeConnectSetup from '@/components/electrician/settings/StripeConnectSetup';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 28 }
  }
};

const BillingTab = () => {
  const { isSubscribed, subscriptionTier } = useAuth();
  const navigate = useNavigate();

  const features = isSubscribed ? [
    'Unlimited certificates',
    'Priority support',
    'Advanced analytics',
    'Custom branding',
  ] : [
    'Basic certificate creation',
    'Community support',
    'Standard features',
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Current Plan Overview */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                isSubscribed ? 'bg-elec-yellow/10' : 'bg-white/10'
              }`}>
                {isSubscribed ? (
                  <Crown className="h-7 w-7 text-elec-yellow" />
                ) : (
                  <Zap className="h-7 w-7 text-foreground/60" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {isSubscribed ? (subscriptionTier || 'Pro') + ' Plan' : 'Free Plan'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isSubscribed ? 'Full access to all features' : 'Limited access to basic features'}
                </p>
                {isSubscribed && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Renews on 1st Feb 2026
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {!isSubscribed && (
                <Button
                  onClick={() => navigate('/subscriptions')}
                  className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade Now
                </Button>
              )}
              {isSubscribed && (
                <Button
                  variant="outline"
                  onClick={() => navigate('/subscriptions')}
                  className="border-white/20 hover:bg-white/5"
                >
                  Change Plan
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Plan Features */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm font-medium text-foreground mb-3">Your plan includes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stripe Connect - Accept Card Payments */}
      <motion.div variants={itemVariants}>
        <StripeConnectSetup />
      </motion.div>

      {/* Billing Actions */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground">Billing & Payments</h3>
        </div>
        <div className="p-4 md:p-6 space-y-3">
          <button
            onClick={() => navigate('/subscriptions')}
            className="w-full flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">View Plans & Pricing</p>
                <p className="text-xs text-muted-foreground">Compare all available subscription plans</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          {isSubscribed && (
            <>
              <button
                onClick={() => window.open('https://billing.stripe.com/p/login/test_8wM6pY7xJ4j2bks000', '_blank')}
                className="w-full flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">View Invoices</p>
                    <p className="text-xs text-muted-foreground">Access your billing history and receipts</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>

              <button
                onClick={() => window.open('https://billing.stripe.com/p/login/test_8wM6pY7xJ4j2bks000', '_blank')}
                className="w-full flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Update Payment Method</p>
                    <p className="text-xs text-muted-foreground">Change your card or billing details</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Payment Security Notice */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Secure Payment Processing</p>
              <p className="text-sm text-muted-foreground">
                All payments are securely processed through Stripe. Your payment information is encrypted and never stored on our servers. You can manage your subscription, update payment methods, and view invoices through the Stripe customer portal.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Help Notice */}
      <motion.div variants={itemVariants} className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-start gap-3">
        <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Need help with billing? Contact our support team at{' '}
          <a href="mailto:support@elec-mate.com" className="text-elec-yellow hover:underline">
            support@elec-mate.com
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BillingTab;
