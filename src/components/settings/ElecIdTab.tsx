import React, { useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import {
  IdCard,
  GraduationCap,
  Briefcase,
  Wrench,
  AlertTriangle,
  Share2,
  FileCheck,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ElecIdOverview from "./elec-id/ElecIdOverview";
import ElecIdQualifications from "./elec-id/ElecIdQualifications";
import ElecIdExperience from "./elec-id/ElecIdExperience";
import ElecIdSkills from "./elec-id/ElecIdSkills";
import ElecIdCompliance from "./elec-id/ElecIdCompliance";
import ElecIdShare from "./elec-id/ElecIdShare";
import DocumentUploader from "./elec-id/DocumentUploader";
import ElecIdOnboarding, { type OnboardingFormData } from "./elec-id/ElecIdOnboarding";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { useIsMobile } from "@/hooks/use-mobile";

const ELEC_ID_TABS = [
  {
    id: "overview",
    label: "Overview",
    shortLabel: "ID",
    icon: IdCard,
    component: ElecIdOverview,
    description: "Your Elec-ID card",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "documents",
    label: "Documents",
    shortLabel: "Docs",
    icon: FileCheck,
    component: DocumentUploader,
    description: "Verify credentials",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "qualifications",
    label: "Qualifications",
    shortLabel: "Quals",
    icon: GraduationCap,
    component: ElecIdQualifications,
    description: "Certs & training",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "experience",
    label: "Experience",
    shortLabel: "Work",
    icon: Briefcase,
    component: ElecIdExperience,
    description: "Work history",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "skills",
    label: "Skills",
    shortLabel: "Skills",
    icon: Wrench,
    component: ElecIdSkills,
    description: "Competencies",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "compliance",
    label: "Compliance",
    shortLabel: "Expiry",
    icon: AlertTriangle,
    component: ElecIdCompliance,
    description: "Expiry tracking",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "share",
    label: "Share",
    shortLabel: "Share",
    icon: Share2,
    component: ElecIdShare,
    description: "Export & links",
    color: "from-indigo-500 to-purple-500",
  },
];

const ElecIdTab = () => {
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const { profile, isLoading, isActivated, activateProfile, refetch } = useElecIdProfile();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const activeIndex = ELEC_ID_TABS.findIndex((tab) => tab.id === activeSubTab);
  const activeConfig = ELEC_ID_TABS[activeIndex];
  const SubTabComponent = activeConfig?.component || ElecIdOverview;

  // Handle scroll arrows visibility
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  // Scroll to active tab
  const scrollToTab = useCallback((index: number) => {
    if (scrollRef.current) {
      const tabs = scrollRef.current.querySelectorAll('[data-tab]');
      const tab = tabs[index] as HTMLElement;
      if (tab) {
        const scrollLeft = tab.offsetLeft - scrollRef.current.clientWidth / 2 + tab.clientWidth / 2;
        scrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, []);

  // Navigate to adjacent tab
  const navigateTab = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? Math.min(activeIndex + 1, ELEC_ID_TABS.length - 1)
      : Math.max(activeIndex - 1, 0);
    setActiveSubTab(ELEC_ID_TABS[newIndex].id);
    scrollToTab(newIndex);
  }, [activeIndex, scrollToTab]);

  // Handle swipe gestures
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold && activeIndex > 0) {
      navigateTab('prev');
    } else if (info.offset.x < -threshold && activeIndex < ELEC_ID_TABS.length - 1) {
      navigateTab('next');
    }
  }, [activeIndex, navigateTab]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-16 h-16 mx-auto mb-4">
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-2 rounded-xl bg-elec-dark flex items-center justify-center">
              <IdCard className="h-6 w-6 text-elec-yellow" />
            </div>
          </div>
          <p className="text-muted-foreground text-sm">Loading your Elec-ID...</p>
        </motion.div>
      </div>
    );
  }

  // Show onboarding if not activated
  if (!isActivated) {
    const handleOnboardingComplete = async (data: OnboardingFormData) => {
      await activateProfile({
        ecs_card_type: data.ecsCardType,
        ecs_card_number: data.ecsCardNumber || null,
        ecs_expiry_date: data.ecsCardExpiry,
        bio: data.jobTitle,
      });
      await refetch();
    };

    const handleSkip = () => {};

    return (
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <ElecIdOnboarding
            onComplete={handleOnboardingComplete}
            onSkip={handleSkip}
          />
        </CardContent>
      </Card>
    );
  }

  // Activated - show full Elec-ID interface
  return (
    <div className="space-y-4">
      {/* iOS-Style Navigation Bar */}
      <div className="sticky top-0 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static">
        <div className="relative bg-background/80 backdrop-blur-xl sm:bg-transparent sm:backdrop-blur-none rounded-2xl sm:rounded-none">
          {/* Mobile: Compact horizontal scroll with active indicator */}
          <div className="sm:hidden">
            {/* Current tab header */}
            <div className="flex items-center justify-between px-2 py-3 border-b border-white/5">
              <button
                onClick={() => navigateTab('prev')}
                disabled={activeIndex === 0}
                className={cn(
                  "p-2 rounded-xl transition-all active:scale-95",
                  activeIndex === 0
                    ? "opacity-30"
                    : "bg-white/5 active:bg-white/10"
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <motion.div
                key={activeSubTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <div className={cn(
                  "p-2 rounded-xl bg-gradient-to-br",
                  activeConfig?.color || "from-elec-yellow to-elec-yellow/70"
                )}>
                  {activeConfig && <activeConfig.icon className="h-5 w-5 text-white" />}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{activeConfig?.label}</p>
                  <p className="text-xs text-muted-foreground">{activeConfig?.description}</p>
                </div>
              </motion.div>

              <button
                onClick={() => navigateTab('next')}
                disabled={activeIndex === ELEC_ID_TABS.length - 1}
                className={cn(
                  "p-2 rounded-xl transition-all active:scale-95",
                  activeIndex === ELEC_ID_TABS.length - 1
                    ? "opacity-30"
                    : "bg-white/5 active:bg-white/10"
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Tab pills - horizontally scrollable */}
            <div className="relative">
              {showLeftArrow && (
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              )}
              {showRightArrow && (
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              )}

              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex items-center gap-2 px-2 py-3 overflow-x-auto scrollbar-hide"
              >
                {ELEC_ID_TABS.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = activeSubTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      data-tab={tab.id}
                      onClick={() => {
                        setActiveSubTab(tab.id);
                        scrollToTab(index);
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex-shrink-0",
                        isActive
                          ? "bg-elec-yellow text-elec-dark shadow-lg shadow-elec-yellow/25"
                          : "bg-white/5 text-foreground/60 active:bg-white/10"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.shortLabel}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-1 pb-2">
              {ELEC_ID_TABS.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSubTab(tab.id);
                    scrollToTab(index);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    activeSubTab === tab.id
                      ? "w-6 bg-elec-yellow"
                      : "w-1.5 bg-white/20 active:bg-white/40"
                  )}
                  aria-label={tab.label}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Full tabs */}
          <div className="hidden sm:block">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
              {ELEC_ID_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-elec-yellow text-elec-dark shadow-lg shadow-elec-yellow/20"
                        : "text-foreground/70 hover:text-foreground hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{tab.label}</span>
                    <span className="lg:hidden">{tab.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tab Content with swipe support */}
      <motion.div
        key={activeSubTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="touch-pan-y"
      >
        <SubTabComponent onNavigate={(tabId: string) => {
          setActiveSubTab(tabId);
          const index = ELEC_ID_TABS.findIndex(t => t.id === tabId);
          if (index >= 0) scrollToTab(index);
        }} />
      </motion.div>
    </div>
  );
};

export default ElecIdTab;
