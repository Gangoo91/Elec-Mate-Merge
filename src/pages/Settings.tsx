import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/components/notifications/NotificationProvider";

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

// Tab configuration
const ALL_TABS = [
  {
    id: "account",
    label: "Account",
    icon: User,
    component: AccountTab,
  },
  {
    id: "elec-id",
    label: "Elec-ID",
    icon: IdCard,
    component: ElecIdTab,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    component: NotificationsTab,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    component: SecurityTab,
  },
  {
    id: "company",
    label: "Company",
    icon: Building2,
    component: CompanyProfileSettings,
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    component: BillingTab,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    component: AppearanceTab,
  },
  {
    id: "help",
    label: "Help",
    icon: HelpCircle,
    component: HelpTab,
  },
  {
    id: "legal",
    label: "Legal",
    icon: FileText,
    component: LegalTab,
  },
];

const SettingsPage = () => {
  const { user, signOut, isSubscribed, subscriptionTier } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const activeTabConfig = ALL_TABS.find((tab) => tab.id === activeTab);
  const TabComponent = activeTabConfig?.component || AccountTab;

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

  const userInitials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : "EM";

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Compact Header */}
      <div className="border-b border-white/10 bg-elec-dark/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="px-4 md:px-6 lg:px-8 py-4 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between gap-4">
            {/* Left: User Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-elec-yellow to-elec-yellow/70 flex items-center justify-center text-elec-dark font-bold text-sm md:text-base flex-shrink-0">
                {userInitials}
              </div>
              <div className="min-w-0 hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-white truncate">
                  Settings
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground truncate">
                    {user?.email || "user@example.com"}
                  </span>
                  {isSubscribed ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-medium flex-shrink-0">
                      <Crown className="h-3 w-3" />
                      {subscriptionTier || "Pro"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-xs flex-shrink-0">
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-elec-dark via-elec-dark to-transparent"
              aria-label="Scroll tabs left"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
          )}

          {/* Tabs container */}
          <div
            ref={tabsRef}
            onScroll={checkScrollArrows}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-0 -mb-px"
          >
            {ALL_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0",
                    isActive
                      ? "text-elec-yellow border-elec-yellow"
                      : "text-white/60 border-transparent hover:text-white hover:border-white/30"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-elec-yellow" : ""
                    )}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right scroll arrow */}
          {showRightArrow && (
            <button
              onClick={() => scrollTabs("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-gradient-to-l from-elec-dark via-elec-dark to-transparent"
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
          <div className="sm:hidden mb-4 p-3 rounded-lg bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 flex items-center justify-between">
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
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <TabComponent />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
