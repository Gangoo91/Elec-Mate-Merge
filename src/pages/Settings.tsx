import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  PageFrame,
  Eyebrow,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';

// Tab components
import AccountTab from '@/components/settings/AccountTab';
import ElecIdTab from '@/components/settings/ElecIdTab';
import BusinessTab from '@/components/settings/BusinessTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import PreferencesTab from '@/components/settings/PreferencesTab';
import PrivacyTab from '@/components/settings/PrivacyTab';
import BillingTab from '@/components/settings/BillingTab';
import ReferralsTab from '@/components/settings/ReferralsTab';
import SettingsNavGrid from '@/components/settings/SettingsNavGrid';
import SettingsReadiness from '@/components/settings/SettingsReadiness';

const SETTINGS_TABS = [
  { id: 'account', label: 'Account', component: AccountTab },
  { id: 'elec-id', label: 'Elec-ID', component: ElecIdTab },
  { id: 'business', label: 'Business', component: BusinessTab },
  { id: 'notifications', label: 'Notifications', component: NotificationsTab },
  { id: 'preferences', label: 'App', component: PreferencesTab },
  { id: 'privacy', label: 'Privacy', component: PrivacyTab },
  { id: 'billing', label: 'Billing', component: BillingTab },
  { id: 'referrals', label: 'Refer a Mate', component: ReferralsTab },
];

const SettingsPage = () => {
  const { user, profile, signOut, isSubscribed, subscriptionTier } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  useSEO({
    title: 'Settings',
    description: 'Manage your Elec-Mate account, billing, notifications, and preferences',
    noindex: true,
  });

  // Handle Stripe Connect return
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

  // Tab routing — null = show grid on mobile; desktop always defaults to account
  const tabParam = searchParams.get('tab');
  const selectedTab = isMobile ? tabParam : tabParam || 'account';
  const activeDesktopTab = tabParam || 'account';

  const setSelectedTab = (tab: string | null) => {
    if (tab) {
      setSearchParams({ tab }, { replace: false });
    } else {
      searchParams.delete('tab');
      setSearchParams(searchParams, { replace: false });
    }
  };
  const setActiveDesktopTab = (tab: string) => setSearchParams({ tab }, { replace: false });

  const activeTabConfig = SETTINGS_TABS.find(
    (tab) => tab.id === (isMobile ? selectedTab : activeDesktopTab)
  );
  const TabComponent = activeTabConfig?.component || AccountTab;

  const handleSignOut = async () => {
    await signOut();
    window.location.replace('/');
  };

  const handleMobileTabSelect = (tabId: string) => {
    setSelectedTab(tabId);
    setActiveDesktopTab(tabId);
  };

  const handleMobileBack = () => setSelectedTab(null);

  const handleDesktopTabSelect = (tabId: string) => {
    setActiveDesktopTab(tabId);
    setSelectedTab(tabId);
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || '';
  const tierLabel = isSubscribed ? subscriptionTier || 'Pro' : 'Free';

  /* ────────────────────────────────────────────
     Mobile view
     ──────────────────────────────────────────── */
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <AnimatePresence mode="wait" initial={false}>
          {selectedTab === null ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            >
              {/* Back button */}
              <div className="px-5 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                  className="-ml-2 h-11 text-white hover:text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <span className="mr-2">{'\u2190'}</span>
                  Back to Dashboard
                </Button>
              </div>

              {/* Hero */}
              <div className="relative px-5 pt-4 pb-6">
                <Eyebrow>Account</Eyebrow>
                <h1 className="mt-1.5 text-3xl font-semibold text-white tracking-[-0.02em] leading-[1.05]">
                  Settings
                </h1>
                <div className="mt-4 flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-white/[0.06] border border-white/[0.08] shrink-0 flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-[15px] font-semibold text-white">
                        {(displayName || user?.email || '?').charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[14px] font-semibold text-white tracking-tight truncate">
                        {displayName || 'Your account'}
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded border',
                          isSubscribed
                            ? 'text-elec-yellow border-elec-yellow/30'
                            : 'text-white/70 border-white/[0.12]'
                        )}
                      >
                        {tierLabel}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[12px] text-white/60 truncate">
                      {user?.email || 'user@example.com'}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  {!isSubscribed && (
                    <Button
                      onClick={() => navigate('/subscriptions')}
                      className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-full px-5"
                    >
                      Upgrade
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="h-11 text-white hover:text-white hover:bg-white/[0.05] touch-manipulation rounded-full px-5"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>

              {/* Business readiness — electricians and employers only */}
              {(profile?.role === 'electrician' || profile?.role === 'employer') && (
                <div className="px-5 pb-5">
                  <SettingsReadiness
                    onOpenBusiness={(sheet) => setSearchParams({ tab: 'business', sheet })}
                  />
                </div>
              )}

              {/* Grid */}
              <div className="px-5 pb-20">
                <SettingsNavGrid onSelect={handleMobileTabSelect} isSubscribed={isSubscribed} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            >
              {/* Sticky detail header */}
              <div className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/[0.06]">
                <div className="px-5 py-3 flex items-center gap-3">
                  <Button
                    variant="ghost"
                    onClick={handleMobileBack}
                    className="-ml-2 h-11 text-white hover:text-white hover:bg-white/[0.05] touch-manipulation"
                  >
                    <span className="mr-2">{'\u2190'}</span>
                    Back
                  </Button>
                  <div className="flex-1 min-w-0 text-center">
                    <h1 className="text-[15px] font-semibold text-white truncate">
                      {activeTabConfig?.label || 'Settings'}
                    </h1>
                  </div>
                  <div className="w-[72px]" />
                </div>

                {/* Segmented scrollable pill bar (mobile tabs) */}
                <div className="px-3 pb-3 overflow-x-auto hide-scrollbar">
                  <div className="flex items-center gap-1.5">
                    {SETTINGS_TABS.map((tab) => {
                      const isActive = tab.id === selectedTab;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedTab(tab.id)}
                          className={cn(
                            'px-3.5 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation',
                            isActive
                              ? 'bg-elec-yellow text-black'
                              : 'bg-white/[0.04] text-white hover:text-white'
                          )}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-5 py-6 pb-20"
              >
                <motion.div variants={itemVariants}>
                  <TabComponent />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ────────────────────────────────────────────
     Desktop view
     ──────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="px-6 sm:px-8 pt-4 mx-auto max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="-ml-2 h-11 text-white hover:text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <span className="mr-2">{'\u2190'}</span>
          Back to Dashboard
        </Button>
      </div>

      <PageFrame className="px-6 sm:px-8">
        {/* Hero */}
        <div className="relative pt-6 sm:pt-8 lg:pt-10 pb-6 flex items-end justify-between gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <Eyebrow>Account</Eyebrow>
            <h1 className="mt-1.5 text-3xl sm:text-4xl lg:text-[44px] font-semibold text-white tracking-[-0.02em] leading-[1.05]">
              Settings
            </h1>
            <div className="mt-4 flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-white/[0.06] border border-white/[0.08] shrink-0 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-[15px] font-semibold text-white">
                    {(displayName || user?.email || '?').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[14px] font-semibold text-white tracking-tight truncate">
                    {displayName || 'Your account'}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded border',
                      isSubscribed
                        ? 'text-elec-yellow border-elec-yellow/30'
                        : 'text-white/70 border-white/[0.12]'
                    )}
                  >
                    {tierLabel}
                  </span>
                </div>
                <div className="mt-0.5 text-[12.5px] text-white/60 truncate">
                  {user?.email || 'user@example.com'}
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 pb-1">
            {!isSubscribed && (
              <Button
                onClick={() => navigate('/subscriptions')}
                className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-full px-5 touch-manipulation"
              >
                Upgrade
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="h-11 rounded-full px-5 bg-transparent border-white/[0.12] text-white hover:bg-white/[0.06] hover:text-white font-medium touch-manipulation"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Business readiness — electricians and employers only */}
        {(profile?.role === 'electrician' || profile?.role === 'employer') && (
          <SettingsReadiness
            className="mb-6"
            onOpenBusiness={(sheet) => setSearchParams({ tab: 'business', sheet })}
          />
        )}

        {/* Desktop tabs — underline style, sticky so long tabs keep their bearings */}
        <div className="sticky top-0 z-30 -mx-6 sm:-mx-8 px-6 sm:px-8 bg-[#0a0a0a]/90 backdrop-blur border-b border-white/[0.06]">
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar -mb-px">
            {SETTINGS_TABS.map((tab) => {
              const isActive = tab.id === activeDesktopTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleDesktopTabSelect(tab.id)}
                  className={cn(
                    'relative px-4 py-3.5 text-[13px] whitespace-nowrap transition-colors touch-manipulation min-h-[44px] tracking-tight',
                    'border-b-2',
                    isActive
                      ? 'text-white font-semibold border-elec-yellow'
                      : 'text-white/60 font-medium border-transparent hover:text-white'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeDesktopTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <TabComponent />
        </motion.div>
      </PageFrame>
    </div>
  );
};

export default SettingsPage;
