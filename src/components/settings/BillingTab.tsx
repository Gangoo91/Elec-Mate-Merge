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
import { stripePriceData } from '@/data/stripePrices';
import {
  ListRow,
  Eyebrow,
  TextAction,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';
import { SettingsCard } from '@/components/settings/rows';

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

  // Real plan catalogue — names, descriptions and features per tier.
  // Prices are deliberately not shown here: grandfathered, founders and
  // App Store subscribers all pay different amounts to today's list price.
  const tierPlan = subscriptionTier
    ? stripePriceData.monthly.find((p) => p.id === `${subscriptionTier.replace('_', '-')}-monthly`)
    : undefined;

  const freeFeatures = [
    'Browse tools and calculators',
    'Preview the study centre',
    'Set up your Elec-ID profile',
    'Community support',
  ];

  const features = isSubscribed
    ? (tierPlan?.features || []).slice(0, 8)
    : freeFeatures;
  const inheritsFrom = isSubscribed ? tierPlan?.inheritsFrom : undefined;
  const tierLabel = isSubscribed ? tierPlan?.name || subscriptionTier || 'Pro' : 'Free';
  const tierDescription = isSubscribed
    ? tierPlan?.description || 'Full access to all premium features.'
    : 'Upgrade to unlock all features.';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
    >
      {/* ── CURRENT PLAN ── */}
      <motion.section variants={itemVariants} className="h-full">
        <SettingsCard eyebrow="01" title="Current Plan">
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
                  {tierDescription}
                </p>
              </div>
            </div>

            {isSubscribed && (
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/[0.10]">
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
              {inheritsFrom && (
                <p className="mt-2 text-[12px] text-white/70">
                  Everything in {inheritsFrom}, plus:
                </p>
              )}
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
                  Upgrade
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
        </SettingsCard>
      </motion.section>

      {/* ── STRIPE CONNECT (plumbing preserved) ── */}
      <motion.section variants={itemVariants} className="flex h-full flex-col [&>*]:flex-1">
        <StripeConnectSetup />
      </motion.section>

      {/* ── MANAGE SUBSCRIPTION ── */}
      {isSubscribed && (
        <motion.section variants={itemVariants} className="h-full">
          <SettingsCard eyebrow="02" title="Manage Subscription">
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

            <div className="px-5 sm:px-6 py-4">
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-300 mb-1">
                  Manage your subscription where you bought it
                </p>
                <p className="text-[13px] text-white/80 leading-relaxed">
                  Apple and Google require subscriptions purchased through their stores to be managed in their settings, and Stripe subscriptions can only be managed via the web. If you bought on the web and signed in on the iOS app, you'll need to cancel or change your plan from a browser — not in the app. Same the other way around.
                </p>
              </div>
            </div>
          </SettingsCard>
        </motion.section>
      )}

      {/* ── SECURITY BADGE ── */}
      <motion.section variants={itemVariants} className="h-full">
        <SettingsCard eyebrow={isSubscribed ? '03' : '02'} title="Security">
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
        </SettingsCard>
      </motion.section>

      {/* ── SUPPORT ── */}
      <motion.section variants={itemVariants} className="h-full">
        <SettingsCard eyebrow={isSubscribed ? '04' : '03'} title="Billing Support">
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
        </SettingsCard>
      </motion.section>
    </motion.div>
  );
};

export default BillingTab;
