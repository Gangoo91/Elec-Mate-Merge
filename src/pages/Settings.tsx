import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  IdCard,
  Bell,
  Shield,
  Building2,
  CreditCard,
  Palette,
  HelpCircle,
  FileText,
  LogOut,
  Crown,
  Zap,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Mic,
  Lock,
  Settings as SettingsIcon,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Import all tab components
import AccountTab from "@/components/settings/AccountTab";
import ElecIdTab from "@/components/settings/ElecIdTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import SecurityTab from "@/components/settings/SecurityTab";
import { CompanyProfileSettings } from "@/components/settings/CompanyProfileSettings";
import BillingTab from "@/components/settings/BillingTab";
import AppearanceTab from "@/components/settings/AppearanceTab";
import HelpTab from "@/components/settings/HelpSupportTab";
import LegalTab from "@/components/settings/LegalTab";
import VoiceSettingsTab from "@/components/settings/VoiceSettingsTab";
import PrivacyTab from "@/components/settings/PrivacyTab";
import SettingsNavGrid from "@/components/settings/SettingsNavGrid";

// Tab configuration
const ALL_TABS = [
  { id: "elec-id", label: "Elec-ID", icon: IdCard, component: ElecIdTab },
  { id: "account", label: "Account", icon: User, component: AccountTab },
  { id: "notifications", label: "Notifications", icon: Bell, component: NotificationsTab },
  { id: "security", label: "Security", icon: Shield, component: SecurityTab },
  { id: "company", label: "Company", icon: Building2, component: CompanyProfileSettings },
  { id: "voice", label: "Voice", icon: Mic, component: VoiceSettingsTab },
  { id: "billing", label: "Billing", icon: CreditCard, component: BillingTab },
  { id: "appearance", label: "Appearance", icon: Palette, component: AppearanceTab },
  { id: "privacy", label: "Privacy", icon: Lock, component: PrivacyTab },
  { id: "help", label: "Help", icon: HelpCircle, component: HelpTab },
  { id: "legal", label: "Legal", icon: FileText, component: LegalTab },
];

const SettingsPage = () => {
  const { user, signOut, isSubscribed, subscriptionTier } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();

  // Check company profile completeness for red dot indicators
  const { data: companyStatus } = useQuery({
    queryKey: ['company-profile-completeness'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('company_profiles')
        .select('company_name, bank_details, company_email')
        .eq('user_id', user.id)
        .single();

      return {
        companyIncomplete: !data?.company_name || !data?.company_email,
        bankDetailsIncomplete: !data?.bank_details?.accountNumber,
      };
    },
  });

  // Get tab from URL - null means show grid on mobile
  const tabParam = searchParams.get("tab");

  // Mobile: null = show grid, string = show detail
  // Desktop: always show tabs (default to elec-id)
  const selectedTab = isMobile ? tabParam : (tabParam || "elec-id");
  const activeDesktopTab = tabParam || "elec-id";

  const setSelectedTab = (tab: string | null) => {
    if (tab) {
      setSearchParams({ tab }, { replace: false });
    } else {
      searchParams.delete("tab");
      setSearchParams(searchParams, { replace: false });
    }
  };
  const setActiveDesktopTab = (tab: string) => setSearchParams({ tab }, { replace: false });

  const tabsRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // URL-based state handles mobile/desktop sync automatically

  const activeTabConfig = ALL_TABS.find(
    (tab) => tab.id === (isMobile ? selectedTab : activeDesktopTab)
  );
  const TabComponent = activeTabConfig?.component || ElecIdTab;
  const TabIcon = activeTabConfig?.icon || IdCard;

  // Check scroll position for arrow visibility
  const checkScrollArrows = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollArrows();
    window.addEventListener("resize", checkScrollArrows);
    return () => window.removeEventListener("resize", checkScrollArrows);
  }, []);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    addNotification({
      title: "Signed Out",
      message: "You have been successfully signed out.",
      type: "info",
    });
  };

  const handleMobileTabSelect = (tabId: string) => {
    setSelectedTab(tabId);
    setActiveDesktopTab(tabId);
  };

  const handleMobileBack = () => {
    setSelectedTab(null);
  };

  const handleDesktopTabSelect = (tabId: string) => {
    setActiveDesktopTab(tabId);
    setSelectedTab(tabId);
  };

  const userInitials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : "EM";

  // Mobile View
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-dark to-elec-dark/95 momentum-scroll-y">
        <AnimatePresence mode="wait" initial={false}>
          {selectedTab === null ? (
            // Mobile Grid View (List)
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="min-h-screen"
            >
              {/* Mobile Header */}
              <div className="sticky top-0 z-20 bg-elec-dark/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-elec-yellow to-elec-yellow/70 flex items-center justify-center text-elec-dark font-bold text-base shadow-lg shadow-elec-yellow/20">
                        {userInitials}
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-white">Settings</h1>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/50 truncate max-w-[140px]">
                            {user?.email || "user@example.com"}
                          </span>
                          {isSubscribed ? (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-elec-yellow/20 text-elec-yellow text-[10px] font-semibold">
                              <Crown className="h-2.5 w-2.5" />
                              {subscriptionTier || "Pro"}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-white/10 text-white/50 text-[10px]">
                              Free
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Sign Out */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 rounded-xl text-white/50 hover:text-white hover:bg-white/10 touch-manipulation active:scale-95"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Content */}
              <div className="px-4 py-6">
                {/* Upgrade Banner */}
                {!isSubscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-elec-yellow/20 via-elec-yellow/10 to-transparent border border-elec-yellow/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Go Premium</p>
                          <p className="text-xs text-white/50">Unlock all features</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => navigate("/subscriptions")}
                        size="sm"
                        className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
                      >
                        Upgrade
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Settings Grid */}
                <SettingsNavGrid
                  onSelect={handleMobileTabSelect}
                  isSubscribed={isSubscribed}
                  incompleteItems={{
                    company: companyStatus?.companyIncomplete || companyStatus?.bankDetailsIncomplete || false,
                  }}
                />
              </div>
            </motion.div>
          ) : (
            // Mobile Detail View
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="min-h-screen"
            >
              {/* Detail Header */}
              <div className="sticky top-0 z-20 bg-elec-dark/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleMobileBack}
                      className="h-11 w-11 rounded-xl text-white/70 hover:text-white hover:bg-white/10 touch-manipulation active:scale-95"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <TabIcon className="h-5 w-5 text-elec-yellow" />
                      <h1 className="text-lg font-semibold text-white">
                        {activeTabConfig?.label || "Settings"}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Content */}
              <div className="px-4 py-6 momentum-scroll-y">
                <TabComponent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop View
  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-dark to-elec-dark/95 animate-fade-in">
      {/* Desktop Header */}
      <div className="border-b border-white/[0.06] bg-elec-dark/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="px-4 md:px-6 lg:px-8 py-4 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between gap-4">
            {/* Left: User Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-elec-yellow to-elec-yellow/70 flex items-center justify-center text-elec-dark font-bold text-sm md:text-base shadow-lg shadow-elec-yellow/20">
                {userInitials}
              </div>
              <div className="min-w-0 hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-white truncate">
                  Settings
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/50 truncate">
                    {user?.email || "user@example.com"}
                  </span>
                  {isSubscribed ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-elec-yellow/20 text-elec-yellow text-xs font-medium flex-shrink-0">
                      <Crown className="h-3 w-3" />
                      {subscriptionTier || "Pro"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/10 text-white/50 text-xs flex-shrink-0">
                      Free
                    </span>
                  )}
                </div>
              </div>
              <h1 className="text-lg font-bold text-white sm:hidden">Settings</h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {!isSubscribed && (
                <Button
                  onClick={() => navigate("/subscriptions")}
                  size="sm"
                  className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold hidden sm:flex"
                >
                  <Zap className="h-4 w-4 mr-1.5" />
                  Upgrade
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 hover:bg-white/10"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Horizontal Tab Navigation */}
        <div className="relative px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
          {/* Left scroll arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scrollTabs("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full flex items-center justify-center bg-gradient-to-r from-elec-dark via-elec-dark/90 to-transparent"
              aria-label="Scroll tabs left"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
          )}

          {/* Tabs container */}
          <div
            ref={tabsRef}
            onScroll={checkScrollArrows}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-0 -mb-px momentum-scroll-x"
          >
            {ALL_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeDesktopTab === tab.id;
              const hasIncompleteData = tab.id === 'company' && (companyStatus?.companyIncomplete || companyStatus?.bankDetailsIncomplete);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleDesktopTabSelect(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0",
                    "touch-manipulation active:scale-[0.98] min-h-[48px]",
                    isActive
                      ? "text-elec-yellow border-elec-yellow"
                      : "text-white/50 border-transparent hover:text-white hover:border-white/20"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-elec-yellow" : "")} />
                  <span>{tab.label}</span>
                  {hasIncompleteData && (
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right scroll arrow */}
          {showRightArrow && (
            <button
              onClick={() => scrollTabs("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full flex items-center justify-center bg-gradient-to-l from-elec-dark via-elec-dark/90 to-transparent"
              aria-label="Scroll tabs right"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-[1600px] mx-auto">
        {/* Mobile upgrade banner */}
        {!isSubscribed && (
          <div className="sm:hidden mb-4 p-3 rounded-xl bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium text-white">Go Premium</span>
            </div>
            <Button
              onClick={() => navigate("/subscriptions")}
              size="sm"
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold h-7 text-xs"
            >
              Upgrade
            </Button>
          </div>
        )}

        {/* Tab Content */}
        <motion.div
          key={activeDesktopTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TabComponent />
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
