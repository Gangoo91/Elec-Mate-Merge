import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import ElecIdOverview from './elec-id/ElecIdOverview';
import ElecIdQualifications from './elec-id/ElecIdQualifications';
import ElecIdExperience from './elec-id/ElecIdExperience';
import ElecIdSkills from './elec-id/ElecIdSkills';
import ElecIdCompliance from './elec-id/ElecIdCompliance';
import ElecIdShare from './elec-id/ElecIdShare';
import DocumentUploader from './elec-id/DocumentUploader';
import ElecIdCVTab from './elec-id/ElecIdCVTab';
import ElecIdOnboarding, { type OnboardingFormData } from './elec-id/ElecIdOnboarding';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingState } from '@/components/college/primitives';

interface ElecIdSubTab {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  component: React.ComponentType<{ onNavigate?: (tabId: string) => void }>;
}

const ELEC_ID_TABS: ElecIdSubTab[] = [
  {
    id: 'overview',
    label: 'Overview',
    shortLabel: 'ID',
    description: 'Your Elec-ID card',
    component: ElecIdOverview,
  },
  {
    id: 'documents',
    label: 'Documents',
    shortLabel: 'Docs',
    description: 'Verify credentials',
    component: DocumentUploader,
  },
  {
    id: 'qualifications',
    label: 'Qualifications',
    shortLabel: 'Quals',
    description: 'Certs and training',
    component: ElecIdQualifications,
  },
  {
    id: 'experience',
    label: 'Experience',
    shortLabel: 'Work',
    description: 'Work history',
    component: ElecIdExperience,
  },
  {
    id: 'skills',
    label: 'Skills',
    shortLabel: 'Skills',
    description: 'Competencies',
    component: ElecIdSkills,
  },
  {
    id: 'cv',
    label: 'My CV',
    shortLabel: 'CV',
    description: 'Manage your CV',
    component: ElecIdCVTab,
  },
  {
    id: 'compliance',
    label: 'Compliance',
    shortLabel: 'Expiry',
    description: 'Expiry tracking',
    component: ElecIdCompliance,
  },
  {
    id: 'share',
    label: 'Share',
    shortLabel: 'Share',
    description: 'Export and links',
    component: ElecIdShare,
  },
];

const ElecIdTab = () => {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const { profile, isLoading, isActivated, activateProfile, refetch } = useElecIdProfile();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [generatedElecId, setGeneratedElecId] = useState<string | null>(null);

  const activeIndex = ELEC_ID_TABS.findIndex((tab) => tab.id === activeSubTab);
  const activeConfig = ELEC_ID_TABS[activeIndex];
  const SubTabComponent = activeConfig?.component || ElecIdOverview;

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

  const navigateTab = useCallback(
    (direction: 'prev' | 'next') => {
      const newIndex =
        direction === 'next'
          ? Math.min(activeIndex + 1, ELEC_ID_TABS.length - 1)
          : Math.max(activeIndex - 1, 0);
      setActiveSubTab(ELEC_ID_TABS[newIndex].id);
      scrollToTab(newIndex);
    },
    [activeIndex, scrollToTab]
  );

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.x > threshold && activeIndex > 0) {
        navigateTab('prev');
      } else if (info.offset.x < -threshold && activeIndex < ELEC_ID_TABS.length - 1) {
        navigateTab('next');
      }
    },
    [activeIndex, navigateTab]
  );

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Onboarding
  if (!isActivated) {
    const needsRecovery = profile !== null && !profile.elec_id_number;

    const handleOnboardingComplete = async (
      data: OnboardingFormData,
      preGeneratedElecId?: string
    ) => {
      const result = await activateProfile(
        {
          ecs_card_type: data.ecsCardType,
          ecs_card_number: data.ecsCardNumber || null,
          ecs_expiry_date: data.ecsCardExpiry,
          bio: data.jobTitle,
        },
        preGeneratedElecId
      );

      if (result.success && result.elecIdNumber) {
        setGeneratedElecId(result.elecIdNumber);
      } else if (!result.success) {
        toast({
          title: 'Error',
          description: result.error || 'Failed to activate Elec-ID. Please try again.',
          variant: 'destructive',
        });
      }
      await refetch();
    };

    const handleSkip = async () => {
      const result = await activateProfile({});
      if (result.success) {
        if (result.elecIdNumber) setGeneratedElecId(result.elecIdNumber);
        toast({
          title: 'Elec-ID Activated',
          description: 'You can complete your profile details anytime from this page.',
        });
        await refetch();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to activate Elec-ID. Please try again.',
          variant: 'destructive',
        });
      }
    };

    const handleRecoveryComplete = async (elecIdNumber: string) => {
      setGeneratedElecId(elecIdNumber);
      await refetch();
    };

    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="p-5 sm:p-6">
          <ElecIdOnboarding
            onComplete={handleOnboardingComplete}
            onSkip={handleSkip}
            elecIdNumber={generatedElecId || profile?.elec_id_number}
            userId={user?.id}
            needsRecovery={needsRecovery}
            ecsCardType={profile?.ecs_card_type || undefined}
            onRecoveryComplete={handleRecoveryComplete}
          />
        </div>
      </div>
    );
  }

  // Activated — full interface
  return (
    <div className="space-y-5">
      {/* Tab navigation */}
      <div className="space-y-3">
        {/* Mobile: title + prev/next + segmented pills */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => navigateTab('prev')}
              disabled={activeIndex === 0}
              className={cn(
                'h-11 min-w-[64px] rounded-full text-[13px] font-medium touch-manipulation transition-colors',
                activeIndex === 0
                  ? 'text-white'
                  : 'text-white hover:text-white bg-white/[0.04]'
              )}
            >
              {'\u2190'} Prev
            </button>
            <div className="min-w-0 text-center">
              <div className="text-[15px] font-semibold text-white truncate">
                {activeConfig?.label}
              </div>
              <div className="text-[11px] text-white/65 truncate">
                {activeConfig?.description}
              </div>
            </div>
            <button
              onClick={() => navigateTab('next')}
              disabled={activeIndex === ELEC_ID_TABS.length - 1}
              className={cn(
                'h-11 min-w-[64px] rounded-full text-[13px] font-medium touch-manipulation transition-colors',
                activeIndex === ELEC_ID_TABS.length - 1
                  ? 'text-white'
                  : 'text-white hover:text-white bg-white/[0.04]'
              )}
            >
              Next {'\u2192'}
            </button>
          </div>

          <div
            ref={scrollRef}
            className="mt-3 flex items-center gap-1.5 overflow-x-auto hide-scrollbar"
          >
            {ELEC_ID_TABS.map((tab, index) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => {
                    setActiveSubTab(tab.id);
                    scrollToTab(index);
                  }}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation',
                    isActive
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.04] text-white/65 hover:text-white'
                  )}
                >
                  {tab.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Progress */}
          <div className="mt-3 px-1">
            <div className="flex items-center gap-1">
              {ELEC_ID_TABS.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSubTab(tab.id);
                    scrollToTab(index);
                  }}
                  className={cn(
                    'flex-1 h-1 rounded-full transition-colors touch-manipulation',
                    index <= activeIndex ? 'bg-elec-yellow' : 'bg-white/10'
                  )}
                  aria-label={tab.label}
                />
              ))}
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[11px] text-white tabular-nums">
                {activeIndex + 1} of {ELEC_ID_TABS.length}
              </span>
              <span className="text-[11px] font-medium text-elec-yellow tabular-nums">
                {Math.round(((activeIndex + 1) / ELEC_ID_TABS.length) * 100)}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Desktop: underline tabs */}
        <div className="hidden sm:block border-b border-white/[0.06]">
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar -mb-px">
            {ELEC_ID_TABS.map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={cn(
                    'relative px-4 py-3 text-[13px] font-medium whitespace-nowrap transition-colors touch-manipulation min-h-[44px] border-b-2',
                    isActive
                      ? 'text-elec-yellow border-elec-yellow'
                      : 'text-white border-transparent hover:text-white'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sub-tab content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSubTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          drag={isMobile ? 'x' : false}
          dragDirectionLock
          dragConstraints={isMobile ? { left: 0, right: 0 } : undefined}
          dragElastic={isMobile ? 0.2 : undefined}
          onDragEnd={isMobile ? handleDragEnd : undefined}
          className="touch-pan-y overflow-visible"
        >
          <SubTabComponent
            onNavigate={(tabId: string) => {
              setActiveSubTab(tabId);
              const index = ELEC_ID_TABS.findIndex((t) => t.id === tabId);
              if (index >= 0) scrollToTab(index);
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ElecIdTab;
