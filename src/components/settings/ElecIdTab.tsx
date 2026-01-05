import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  IdCard,
  GraduationCap,
  Briefcase,
  Wrench,
  AlertTriangle,
  Share2,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import ElecIdOverview from "./elec-id/ElecIdOverview";
import ElecIdQualifications from "./elec-id/ElecIdQualifications";
import ElecIdExperience from "./elec-id/ElecIdExperience";
import ElecIdSkills from "./elec-id/ElecIdSkills";
import ElecIdCompliance from "./elec-id/ElecIdCompliance";
import ElecIdShare from "./elec-id/ElecIdShare";

const ELEC_ID_TABS = [
  {
    id: "overview",
    label: "Overview",
    icon: IdCard,
    component: ElecIdOverview,
    description: "Your Elec-ID card",
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

interface ElecIdTabProps {
  hasElecId?: boolean;
}

const ElecIdTab = ({ hasElecId = true }: ElecIdTabProps) => {
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const activeConfig = ELEC_ID_TABS.find((tab) => tab.id === activeSubTab);
  const SubTabComponent = activeConfig?.component || ElecIdOverview;

  // If user does not have Elec-ID, show setup prompt
  if (!hasElecId) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-elec-yellow to-elec-yellow/70 flex items-center justify-center mb-6">
          <IdCard className="h-10 w-10 text-elec-dark" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Create Your Elec-ID
        </h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Your Elec-ID is your portable professional identity. It stores your
          qualifications, experience, and skills - all owned and controlled by you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate My Elec-ID
          </Button>
          <Button variant="outline" className="border-white/20">
            Learn More
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <GraduationCap className="h-6 w-6 text-elec-yellow mb-2" />
            <h4 className="font-medium text-foreground text-sm">Track Qualifications</h4>
            <p className="text-xs text-muted-foreground mt-1">
              All your certs in one place with expiry alerts
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <Briefcase className="h-6 w-6 text-elec-yellow mb-2" />
            <h4 className="font-medium text-foreground text-sm">Portable History</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Your experience follows you, not your employer
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <Share2 className="h-6 w-6 text-elec-yellow mb-2" />
            <h4 className="font-medium text-foreground text-sm">Share Instantly</h4>
            <p className="text-xs text-muted-foreground mt-1">
              QR code and links to share with employers
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Sub-Tab Navigation - Scrollable pill tabs */}
      <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
        {/* Gradient fade indicators for scroll */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-elec-dark to-transparent z-10 pointer-events-none md:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-elec-dark to-transparent z-10 pointer-events-none md:hidden" />

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
