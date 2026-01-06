import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IdCard,
  GraduationCap,
  Briefcase,
  Wrench,
  AlertTriangle,
  Share2,
  FileCheck,
  Loader2,
} from "lucide-react";
import ElecIdOverview from "./elec-id/ElecIdOverview";
import ElecIdQualifications from "./elec-id/ElecIdQualifications";
import ElecIdExperience from "./elec-id/ElecIdExperience";
import ElecIdSkills from "./elec-id/ElecIdSkills";
import ElecIdCompliance from "./elec-id/ElecIdCompliance";
import ElecIdShare from "./elec-id/ElecIdShare";
import DocumentUploader from "./elec-id/DocumentUploader";
import ElecIdOnboarding from "./elec-id/ElecIdOnboarding";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";

const ELEC_ID_TABS = [
  {
    id: "overview",
    label: "Overview",
    icon: IdCard,
    component: ElecIdOverview,
    description: "Your Elec-ID card",
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileCheck,
    component: DocumentUploader,
    description: "Verify credentials",
  },
  {
    id: "qualifications",
    label: "Qualifications",
    icon: GraduationCap,
    component: ElecIdQualifications,
    description: "Certs & training",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    component: ElecIdExperience,
    description: "Work history",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Wrench,
    component: ElecIdSkills,
    description: "Competencies",
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: AlertTriangle,
    component: ElecIdCompliance,
    description: "Expiry tracking",
  },
  {
    id: "share",
    label: "Share",
    icon: Share2,
    component: ElecIdShare,
    description: "Export & links",
  },
];

const ElecIdTab = () => {
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const { profile, isLoading, isActivated, activateProfile, refetch } = useElecIdProfile();

  const activeConfig = ELEC_ID_TABS.find((tab) => tab.id === activeSubTab);
  const SubTabComponent = activeConfig?.component || ElecIdOverview;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-elec-yellow animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your Elec-ID...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if not activated
  if (!isActivated) {
    const handleOnboardingComplete = async () => {
      // The onboarding component will have collected the data
      // For now, just activate with basic info
      await activateProfile({});
      await refetch();
    };

    const handleSkip = () => {
      // User can skip - they'll see the onboarding again next time
      // Or we could show a minimal "create later" state
    };

    return (
      <Card className="border-border">
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
    <div className="space-y-4 md:space-y-6">
      {/* Sub-Tab Navigation - Scrollable pill tabs */}
      <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
        {/* Gradient fade indicators for scroll */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />

        {/* Scrollable tabs container */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex items-center gap-1.5 md:gap-2 p-1 rounded-xl bg-white/5 border border-white/10 w-max md:w-full">
            {ELEC_ID_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0",
                    isActive
                      ? "bg-elec-yellow text-elec-dark shadow-lg shadow-elec-yellow/20"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active tab indicator for mobile */}
      <div className="md:hidden flex items-center justify-center gap-1.5">
        {ELEC_ID_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              activeSubTab === tab.id
                ? "bg-elec-yellow w-6"
                : "bg-white/20 hover:bg-white/40"
            )}
            aria-label={tab.label}
          />
        ))}
      </div>

      {/* Sub-Tab Content */}
      <SubTabComponent onNavigate={setActiveSubTab} />
    </div>
  );
};

export default ElecIdTab;
