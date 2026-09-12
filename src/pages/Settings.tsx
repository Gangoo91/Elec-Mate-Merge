/**
 * Settings — rebuilt on the shared hub shell.
 *
 * This page was the last one still drawing its own frame: a `#0a0a0a` page
 * inside a 10%-lightness app shell (which is what painted the visible black
 * rectangle on desktop), a 44px hero, the college `PageFrame`, a sticky
 * underline tab bar on desktop and a separate grid-then-detail flow on
 * phones. Three dialects on one screen, none of them the one the Electrician,
 * Business and Apprentice hubs use.
 *
 * Now it is the same stack as every other hub:
 *
 *   overview  — HubMasthead → identity row → search → alert (only if the
 *               business setup has something outstanding) → tool grids
 *   sub-page  — HubMasthead (Back returns to the overview) → the tab
 *
 * One layout for phone and desktop. The `?tab=` and `?tab=…&sheet=` deep
 * links used across the app (36 call sites) keep working unchanged; the
 * legacy `company` and `profiles` ids are mapped to their current tabs.
 */
import React, { Suspense, lazy, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { LoadingState, itemVariants } from '@/components/college/primitives';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubAlertLine,
  HubToolGrid,
  type HubTool,
} from '@/components/hub/HubPrimitives';
import { CARD_BASE, CARD_NEUTRAL, CARD_PRIMARY } from '@/components/ui/card-recipe';

// Tabs load on demand. Statically importing all eight pulled the Elec-ID
// suite, the twelve business sheets and the security section into the
// overview's bundle before a single card rendered.
const AccountTab = lazy(() => import('@/components/settings/AccountTab'));
const ElecIdTab = lazy(() => import('@/components/settings/ElecIdTab'));
const BusinessTab = lazy(() => import('@/components/settings/BusinessTab'));
const NotificationsTab = lazy(() => import('@/components/settings/NotificationsTab'));
const PreferencesTab = lazy(() => import('@/components/settings/PreferencesTab'));
const PrivacyTab = lazy(() => import('@/components/settings/PrivacyTab'));
const BillingTab = lazy(() => import('@/components/settings/BillingTab'));
const ReferralsTab = lazy(() => import('@/components/settings/ReferralsTab'));
import SettingsReadiness, { useBusinessReadiness } from '@/components/settings/SettingsReadiness';
import SettingsSearch from '@/components/settings/SettingsSearch';

interface SettingsTab {
  id: string;
  label: string;
  description: string;
  component: React.ComponentType;
}

const SETTINGS_TABS: SettingsTab[] = [
  { id: 'account', label: 'Account', description: 'Profile, sign-in and security', component: AccountTab },
  { id: 'elec-id', label: 'Elec-ID', description: 'Your digital identity card', component: ElecIdTab },
  { id: 'business', label: 'Business', description: 'Company, rates, instruments and branding', component: BusinessTab },
  { id: 'billing', label: 'Billing', description: 'Subscription and payments', component: BillingTab },
  { id: 'notifications', label: 'Notifications', description: 'Push alerts, categories and quiet hours', component: NotificationsTab },
  { id: 'preferences', label: 'App', description: 'Dashboard hubs and certificate defaults', component: PreferencesTab },
  { id: 'privacy', label: 'Privacy', description: 'Data controls and analytics', component: PrivacyTab },
  { id: 'referrals', label: 'Refer a Mate', description: 'A free month for you and your mate', component: ReferralsTab },
];

const TIER_NAMES: Record<string, string> = {
  apprentice: 'Apprentice',
  apprentice_yearly: 'Apprentice',
  electrician: 'Electrician',
  electrician_yearly: 'Electrician',
  employer: 'Employer',
  employer_yearly: 'Employer',
  pro: 'Pro',
};

// Old links still in the wild point at ids this page no longer has.
const TAB_ALIASES: Record<string, string> = { company: 'business', profiles: 'account' };

const SettingsPage = () => {
  const { user, profile, signOut, isSubscribed, subscriptionTier } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  useSEO({
    title: 'Settings',
    description: 'Manage your Elec-Mate account, billing, notifications, and preferences',
    noindex: true,
  });

  // Stripe Connect returns here with ?stripe=success|refresh.
  useEffect(() => {
    const stripeParam = searchParams.get('stripe');
    if (stripeParam === 'success') {
      toast.success('Stripe Connected Successfully', {
        description: 'You can now accept card payments on invoices.',
        duration: 5000,
      });
      searchParams.delete('stripe');
      setSearchParams(searchParams, { replace: true });
      queryClient.invalidateQueries({ queryKey: ['stripe-connect-status'] });
    }
    if (stripeParam === 'refresh') {
      toast.info('Please complete Stripe setup to accept payments.');
      searchParams.delete('stripe');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, queryClient]);

  const rawTab = searchParams.get('tab');
  const tabId = rawTab ? TAB_ALIASES[rawTab] ?? rawTab : null;
  const activeTab = tabId ? SETTINGS_TABS.find((t) => t.id === tabId) ?? null : null;

  const openTab = (id: string) => setSearchParams({ tab: id }, { replace: false });
  const backToOverview = () => {
    searchParams.delete('tab');
    searchParams.delete('sheet');
    setSearchParams(searchParams, { replace: false });
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.replace('/');
  };

  const isBusinessRole = profile?.role === 'electrician' || profile?.role === 'employer';
  const readiness = useBusinessReadiness(isBusinessRole);
  const { isActivated: elecIdActive, isLoading: elecIdLoading } = useElecIdProfile();

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Your account';
  // Tier ids are storage values ('electrician_yearly', 'employer'); show a name.
  const tierLabel = isSubscribed ? TIER_NAMES[subscriptionTier ?? ''] ?? 'Pro' : 'Free';

  const profileCards = useMemo<HubTool[]>(() => {
    const warn = readiness.outstanding.find((i) => i.warn);
    const businessMeta = readiness.loading
      ? undefined
      : readiness.outstanding.length === 0
        ? 'Fully set up'
        : `${readiness.doneCount} of ${readiness.total} set up`;
    return [
      { id: 'account', title: 'Account', description: 'Profile, sign-in and security', onClick: () => openTab('account') },
      {
        id: 'elec-id',
        title: 'Elec-ID',
        description: 'Your digital identity card',
        meta: elecIdLoading ? undefined : elecIdActive ? 'Card active' : 'Not set up yet',
        alert: !elecIdLoading && !elecIdActive,
        onClick: () => openTab('elec-id'),
      },
      {
        id: 'business',
        title: 'Business',
        description: 'Company, rates, instruments and branding',
        meta: isBusinessRole ? (warn ? warn.warn : businessMeta) : undefined,
        alert: Boolean(warn),
        onClick: () => openTab('business'),
      },
      {
        id: 'billing',
        title: 'Billing',
        description: 'Subscription and payments',
        meta: isSubscribed ? `${tierLabel} plan` : 'Free plan',
        onClick: () => openTab('billing'),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readiness.loading, readiness.doneCount, readiness.total, readiness.outstanding, isBusinessRole, isSubscribed, tierLabel, elecIdActive, elecIdLoading]);

  const appCards: HubTool[] = [
    { id: 'notifications', title: 'Notifications', description: 'Push alerts, categories and quiet hours', onClick: () => openTab('notifications') },
    { id: 'preferences', title: 'App', description: 'Dashboard hubs and certificate defaults', onClick: () => openTab('preferences') },
    { id: 'privacy', title: 'Privacy', description: 'Data controls and analytics', onClick: () => openTab('privacy') },
    { id: 'referrals', title: 'Refer a Mate', description: 'A free month for you and your mate', onClick: () => openTab('referrals') },
  ];

  /* ── Sub-page ─────────────────────────────────────────────────────── */
  if (activeTab) {
    const TabComponent = activeTab.component;
    return (
      <HubPage>
        <HubMasthead section="Settings" title={activeTab.label} onBack={backToOverview} />
        <HubBody pushContext="Get notified about quotes, invoices, tasks and messages">
          <p className="-mb-4 max-w-prose text-[13px] leading-relaxed text-white sm:-mb-6">
            {activeTab.description}
          </p>
          {activeTab.id === 'business' && isBusinessRole && (
            <SettingsReadiness
              onOpenBusiness={(sheet) => setSearchParams({ tab: 'business', sheet }, { replace: true })}
            />
          )}
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Suspense fallback={<LoadingState />}>
              <TabComponent />
            </Suspense>
          </motion.div>
        </HubBody>
      </HubPage>
    );
  }

  /* ── Overview ─────────────────────────────────────────────────────── */
  const outstandingWarn = readiness.outstanding.find((i) => i.warn);
  const alertText = readiness.loading
    ? null
    : outstandingWarn
      ? `Business setup: ${outstandingWarn.warn.charAt(0).toLowerCase()}${outstandingWarn.warn.slice(1)}`
      : readiness.outstanding.length > 0
        ? `Business setup ${readiness.doneCount} of ${readiness.total}: ${readiness.outstanding[0].label.toLowerCase()} still needed`
        : null;

  return (
    <HubPage>
      <HubMasthead section="Account" title="Settings" backTo="/dashboard" />
      <HubBody pushContext="Get notified about quotes, invoices, tasks and messages">
        {/* Identity row — who is signed in, on what plan. A row, not a hero. */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-elec-yellow/35 bg-white/[0.06]">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-[17px] font-semibold text-white">
                  {(displayName || user?.email || '?').charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate text-[16px] font-semibold tracking-tight text-white">
                  {displayName}
                </span>
                <span
                  className={cn(
                    'shrink-0 rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]',
                    isSubscribed
                      ? 'border-elec-yellow/35 text-elec-yellow'
                      : 'border-white/[0.14] text-white'
                  )}
                >
                  {tierLabel}
                </span>
              </div>
              <div className="mt-0.5 truncate text-[12.5px] text-white">{user?.email}</div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!isSubscribed && (
              <button
                type="button"
                onClick={() => navigate('/subscriptions')}
                className={cn(
                  CARD_BASE,
                  CARD_PRIMARY,
                  'h-11 flex-row items-center justify-center rounded-full px-5 text-[13px] font-semibold text-black'
                )}
              >
                Upgrade
              </button>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className={cn(
                CARD_BASE,
                CARD_NEUTRAL,
                'h-11 flex-row items-center justify-center rounded-full px-5 text-[13px] font-semibold text-white'
              )}
            >
              Sign out
            </button>
          </div>
        </motion.div>

        <SettingsSearch className="-mt-2 w-full sm:-mt-4 sm:max-w-md" />

        {alertText && (
          <HubAlertLine text={alertText} action="Finish" onClick={() => openTab('business')} />
        )}

        <HubToolGrid label="Profile and business" cards={profileCards} columns="four" />
        <HubToolGrid label="App" cards={appCards} columns="four" />
      </HubBody>
    </HubPage>
  );
};

export default SettingsPage;
