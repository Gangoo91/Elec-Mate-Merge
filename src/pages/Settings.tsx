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
import PreferencesTab from '@/components/settings/PreferencesTab';
import PrivacyTab from '@/components/settings/PrivacyTab';
import BillingTab from '@/components/settings/BillingTab';
import ReferralsTab from '@/components/settings/ReferralsTab';
import SettingsNavGrid from '@/components/settings/SettingsNavGrid';

const SETTINGS_TABS = [
  { id: 'account', label: 'Account', component: AccountTab },
  { id: 'elec-id', label: 'Elec-ID', component: ElecIdTab },
  { id: 'business', label: 'Business', component: BusinessTab },
  { id: 'preferences', label: 'Preferences', component: PreferencesTab },
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
  const tierToneClass = isSubscribed ? 'text-elec-yellow' : 'text-blue-400';

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
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/40 to-transparent" />
                <Eyebrow>Account</Eyebrow>
                <h1 className="mt-1.5 text-3xl font-semibold text-white tracking-tight leading-[1.05]">
                  Settings
                </h1>
                <div className="mt-3 flex items-center flex-wrap gap-2">
                  <span className="text-[13px] text-white truncate">
                    {displayName || 'Your account'}
                  </span>
                  <span className={cn('text-[11px] font-medium uppercase tracking-[0.15em]', tierToneClass)}>
                    {tierLabel}
                  </span>
                </div>
                <div className="mt-1 text-[12px] text-white/65 truncate">
                  {user?.email || 'user@example.com'}
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
                              : 'bg-white/[0.04] text-white/70 hover:text-white'
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
        <div className="relative pt-6 sm:pt-8 lg:pt-10 pb-2 flex items-end justify-between gap-4 sm:gap-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/40 to-transparent" />
          <div className="min-w-0 flex-1">
            <Eyebrow>Account</Eyebrow>
            <h1 className="mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
              Settings
            </h1>
            <div className="mt-3 flex items-center flex-wrap gap-2">
              <span className="text-[13px] sm:text-sm text-white truncate">
                {displayName || 'Your account'}
              </span>
              <span className={cn('text-[11px] font-medium uppercase tracking-[0.15em]', tierToneClass)}>
                {tierLabel}
              </span>
            </div>
            <div className="mt-1 text-[12px] sm:text-[13px] text-white/65 truncate">
              {user?.email || 'user@example.com'}
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            {!isSubscribed && (
              <Button
                onClick={() => navigate('/subscriptions')}
                className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-full px-5 touch-manipulation"
              >
                Upgrade
              </Button>
            )}
            <Button
              onClick={handleSignOut}
              className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-full px-5 touch-manipulation"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Desktop tabs — underline style */}
        <div className="border-b border-white/[0.06]">
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar -mb-px">
            {SETTINGS_TABS.map((tab) => {
              const isActive = tab.id === activeDesktopTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleDesktopTabSelect(tab.id)}
                  className={cn(
                    'relative px-4 py-3 text-[13px] font-medium whitespace-nowrap transition-colors touch-manipulation min-h-[44px]',
                    'border-b-2',
                    isActive
                      ? 'text-elec-yellow border-elec-yellow'
                      : 'text-white/55 border-transparent hover:text-white'
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
