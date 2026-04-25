import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { openExternalUrl } from '@/utils/open-external-url';
import { motion } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { useRevenueCat } from '@/hooks/useRevenueCat';
import { useToast } from '@/hooks/use-toast';
import StripeConnectSetup from '@/components/electrician/settings/StripeConnectSetup';
import {
  ListCard,
  ListRow,
  SectionHeader,
  Eyebrow,
  TextAction,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';

const STRIPE_BILLING_PORTAL_URL = import.meta.env.VITE_STRIPE_BILLING_PORTAL_URL;
if (!STRIPE_BILLING_PORTAL_URL && import.meta.env.PROD) {
  console.error(
    '[BillingTab] VITE_STRIPE_BILLING_PORTAL_URL is not set — billing portal will not work in production. Set this env var in Vercel.'
  );
}

const BillingTab = () => {
  const { isSubscribed, subscriptionTier, user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNative = Capacitor.isNativePlatform();
  const { restorePurchases } = useRevenueCat(user?.id);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleRestorePurchases = async () => {
    setIsRestoring(true);
    try {
      const restored = await restorePurchases();
      toast({
        title: restored ? 'Purchases Restored' : 'Nothing to Restore',
        description: restored
          ? 'Your subscription has been restored successfully.'
          : 'No previous purchases found for this Apple ID.',
        variant: restored ? 'success' : 'default',
      });
    } catch {
      toast({
        title: 'Restore Failed',
        description: 'Could not restore purchases. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRestoring(false);
    }
  };

  const proFeatures = [
    'Unlimited certificates and reports',
    'AI-powered tools and assistants',
    'Priority customer support',
    'Advanced analytics dashboard',
    'Custom branding options',
    'Cloud backup and sync',
  ];

  const freeFeatures = [
    'Basic certificate creation',
    'Limited AI features',
    'Community support',
    'Standard templates',
  ];

  const features = isSubscribed ? proFeatures : freeFeatures;
  const tierLabel = isSubscribed ? subscriptionTier || 'Pro' : 'Free';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* ── CURRENT PLAN ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="01" title="Current Plan" />

        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          {isSubscribed && (
            <div className="h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70 opacity-70" />
          )}
          <div className="p-5 sm:p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Eyebrow>Plan</Eyebrow>
                <div className="mt-1 flex items-center gap-2">
                  <h3 className="text-2xl sm:text-[26px] font-semibold text-white tracking-tight">
                    {tierLabel}
                  </h3>
                  <span
                    className={cn(
                      'text-[11px] font-medium uppercase tracking-[0.15em]',
                      isSubscribed ? 'text-elec-yellow' : 'text-blue-400'
                    )}
                  >
                    {isSubscribed ? 'Active' : 'Free'}
                  </span>
                </div>
                <p className="mt-2 text-[13px] text-white max-w-md leading-relaxed">
                  {isSubscribed
                    ? 'Full access to all premium features.'
                    : 'Upgrade to unlock all features.'}
                </p>
              </div>
            </div>

            {isSubscribed && (
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#0a0a0a] border border-white/[0.06]">
                <Eyebrow>Next Billing</Eyebrow>
                <span className="text-[13px] font-medium text-white tabular-nums">
                  {profile?.subscription_end
                    ? new Date(profile.subscription_end).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Check your subscription settings'}
                </span>
              </div>
            )}

            <div>
              <Eyebrow>
                {isSubscribed ? 'Your Premium Features' : 'Current Features'}
              </Eyebrow>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-[13px] text-white"
                  >
                    <span
                      aria-hidden
                      className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${
                        isSubscribed ? 'bg-green-400' : 'bg-white/40'
                      }`}
                    />
                    <span className="truncate">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              {!isSubscribed ? (
                <Button
                  onClick={() => navigate('/subscriptions')}
                  className="h-11 px-5 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
                >
                  Upgrade to Pro
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/subscriptions')}
                  className="h-11 px-5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium touch-manipulation"
                >
                  View Plans →
                </Button>
              )}
              {isNative && (
                <TextAction onClick={handleRestorePurchases}>
                  {isRestoring ? 'Restoring…' : 'Restore Purchases'}
                </TextAction>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── STRIPE CONNECT (plumbing preserved) ── */}
      <motion.section variants={itemVariants}>
        <StripeConnectSetup />
      </motion.section>

      {/* ── MANAGE SUBSCRIPTION ── */}
      {isSubscribed && (
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader eyebrow="02" title="Manage Subscription" />
          <ListCard>
            {isNative ? (
              <ListRow
                title="Manage Subscription"
                subtitle={
                  Capacitor.getPlatform() === 'ios'
                    ? 'Manage via Apple ID Settings'
                    : 'Manage via Google Play'
                }
                onClick={() => {
                  const url =
                    Capacitor.getPlatform() === 'android'
                      ? 'https://play.google.com/store/account/subscriptions'
                      : 'https://apps.apple.com/account/subscriptions';
                  openExternalUrl(url);
                }}
                trailing={
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-blue-400">
                    External
                  </span>
                }
                accent="yellow"
              />
            ) : (
              <>
                <ListRow
                  title="Billing History"
                  subtitle="View invoices and receipts"
                  onClick={() =>
                    STRIPE_BILLING_PORTAL_URL && openExternalUrl(STRIPE_BILLING_PORTAL_URL)
                  }
                  trailing={
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                      Stripe
                    </span>
                  }
                  accent="green"
                />
                <ListRow
                  title="Payment Method"
                  subtitle="Update card or billing details"
                  onClick={() =>
                    STRIPE_BILLING_PORTAL_URL && openExternalUrl(STRIPE_BILLING_PORTAL_URL)
                  }
                  trailing={
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-blue-400">
                      Stripe
                    </span>
                  }
                  accent="blue"
                />
              </>
            )}
          </ListCard>
        </motion.section>
      )}

      {/* ── SECURITY BADGE ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow={isSubscribed ? '03' : '02'} title="Security" />
        <ListCard>
          <ListRow
            title={
              isNative
                ? Capacitor.getPlatform() === 'ios'
                  ? 'Secured by Apple'
                  : 'Secured by Google'
                : 'Secured by Stripe'
            }
            subtitle="Bank-level encryption protects all transactions"
            trailing={
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-blue-400">
                Encrypted
              </span>
            }
            accent="blue"
          />
        </ListCard>
      </motion.section>

      {/* ── SUPPORT ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow={isSubscribed ? '04' : '03'} title="Billing Support" />
        <ListCard>
          <ListRow
            title="Contact Billing"
            subtitle="info@elec-mate.com"
            onClick={() => openExternalUrl('mailto:info@elec-mate.com')}
            trailing={
              <span aria-hidden className="text-[13px] font-medium text-elec-yellow/90">
                {'\u2192'}
              </span>
            }
            accent="yellow"
          />
        </ListCard>
      </motion.section>
    </motion.div>
  );
};

export default BillingTab;
