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
import { supabase } from '@/integrations/supabase/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // ── Which billing channels could be charging this person? ────────────────
  // Answered from what we KNOW bills them, never from the device in their hand.
  //
  // subscription_source alone is not enough: 638 profiles have it null and 300
  // of those still have a Stripe customer id (audit, 2026-07-27). So Stripe is
  // offered whenever either signal is present.
  const source = (profile as { subscription_source?: string } | null)?.subscription_source;
  const stripeCustomerId = (profile as { stripe_customer_id?: string } | null)
    ?.stripe_customer_id;

  const showStripeBilling = !!stripeCustomerId || source === 'stripe';
  // On a phone we always offer the store too. A store subscription can exist
  // that our database has no record of — it is bought outside our system — and
  // an extra link costs nothing, whereas a missing one costs a customer money.
  const showStoreBilling = isNative || source === 'app_store' || source === 'play_store';
  const hasBillingRelationship = showStripeBilling || showStoreBilling || isSubscribed;

  // A missing portal URL must surface as an error, never as a dead tap. The
  // silent `url && open(url)` no-op is what made "I've tried several times"
  // literally true for Vitaliy Dmytrenko (ELE-1413).
  const openBillingPortal = () => {
    if (!STRIPE_BILLING_PORTAL_URL) {
      toast({
        title: 'Billing portal unavailable',
        description:
          'We could not open the billing portal. You can still cancel below, or email info@elec-mate.com and we will sort it.',
        variant: 'destructive',
      });
      return;
    }
    openExternalUrl(STRIPE_BILLING_PORTAL_URL);
  };

  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    try {
      // No subscription id is sent: the server resolves the caller's own
      // subscriptions. The client should not be able to name a target.
      const { data, error } = await supabase.functions.invoke('cancel-subscription', { body: {} });
      if (error) throw new Error(error.message);
      if (data?.error === 'no_subscription') {
        toast({
          title: 'No Stripe subscription found',
          description: isNative
            ? 'You may have subscribed through the App Store — use Manage Subscription above.'
            : 'There is nothing to cancel on this account.',
        });
        return;
      }
      if (data?.success === false) throw new Error(data?.message || 'Cancellation failed');
      toast({
        title: 'Subscription cancelled',
        description: 'No further payments will be taken. A confirmation is on its way.',
        variant: 'success',
      });
      setShowCancelConfirm(false);
    } catch (err) {
      // Never leave someone believing they cancelled when they have not, and
      // always leave a human route out.
      toast({
        title: 'Could not cancel',
        description: `${err instanceof Error ? err.message : 'Please try again.'} If this keeps happening, email info@elec-mate.com and we will cancel it for you.`,
        variant: 'destructive',
      });
    } finally {
      setIsCancelling(false);
    }
  };

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

      {/* ── MANAGE SUBSCRIPTION ──
          Rendered whenever a billing relationship COULD exist — never gated on
          isSubscribed. check-subscription revokes access on the first failed
          payment (past_due is not "active"), so gating this on isSubscribed
          removed the cancel screen at the exact moment someone was locked out
          but still being charged. That is how Mathew Bayley ended up emailing
          Andrew instead: by then Settings offered him nothing at all.
          Anyone we can still bill must be able to stop us. */}
      {hasBillingRelationship && (
        <motion.section variants={itemVariants} className="h-full">
          <SettingsCard eyebrow="02" title="Manage Subscription">
            {/* Channels are shown by what could be CHARGING them, not by which
                device they happen to be holding. Mathew was an iOS user billed
                by Stripe: the old device-based branch sent him to Apple, he
                cancelled the Apple sub, and Stripe carried on taking money.
                Where both could apply we show both — hiding one is the bug. */}
            {showStoreBilling && (
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
            )}

            {showStripeBilling && (
              <>
                <ListRow
                  title="Billing History"
                  subtitle="View invoices and receipts"
                  onClick={openBillingPortal}
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
                  onClick={openBillingPortal}
                  trailing={
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-blue-400">
                      Stripe
                    </span>
                  }
                  accent="blue"
                />
                {/* The cancel path deliberately does NOT depend on the billing
                    portal, or on any build-time variable. It calls the server
                    directly, so a missing env var can delay a card update but
                    can never trap someone in a subscription. */}
                <ListRow
                  title="Cancel Subscription"
                  subtitle="Stop future payments — keep access until the period ends"
                  onClick={() => setShowCancelConfirm(true)}
                  trailing={
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-red-400">
                      Stripe
                    </span>
                  }
                  accent="red"
                />
              </>
            )}

            <div className="px-5 sm:px-6 py-4">
              {/* Shown when both channels are offered — the exact situation that
                  caught Mathew out. Naming it is what stops someone cancelling
                  one and assuming they are done. */}
              {showStripeBilling && showStoreBilling && (
                <div className="mb-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300 mb-1">
                    You may have two subscriptions
                  </p>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    This account has billing set up through both{' '}
                    {Capacitor.getPlatform() === 'android' ? 'Google Play' : 'the App Store'} and
                    Stripe. Cancelling one does not cancel the other — check both, or email
                    info@elec-mate.com and we will make sure everything is stopped.
                  </p>
                </div>
              )}
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

      {/* Cancellation confirm. Plain about what happens and what does not —
          a cancellation screen that overstates its reach is how someone ends up
          believing every subscription is stopped when one still is not. */}
      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel your subscription?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 text-left">
                <p>
                  We&apos;ll stop taking payments straight away. You keep access until the end of
                  the period you&apos;ve already paid for.
                </p>
                {showStoreBilling && (
                  <p className="text-amber-300">
                    This cancels your Stripe billing only. If you also subscribed through{' '}
                    {Capacitor.getPlatform() === 'android' ? 'Google Play' : 'the App Store'},
                    cancel that separately using Manage Subscription.
                  </p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                // Keep the dialog open while the request is in flight so the
                // outcome is never ambiguous.
                e.preventDefault();
                handleCancelSubscription();
              }}
              disabled={isCancelling}
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-500/90 text-white"
            >
              {isCancelling ? 'Cancelling…' : 'Yes, cancel'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default BillingTab;
