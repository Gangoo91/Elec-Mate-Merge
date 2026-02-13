import {
  Factory,
  FileText,
  ClipboardList,
  Zap,
  TestTube,
  ShieldAlert,
  BookOpen,
} from "lucide-react";
import InstallationGuidePageShell from "@/components/apprentice/installation-guides/InstallationGuidePageShell";
import type { ToggleCardDef } from "@/types/installation-guides";
import IndustrialOverviewCards from "@/components/apprentice/installation-guides/industrial/IndustrialOverviewCards";
import IndustrialPlanningSection from "@/components/apprentice/installation-guides/industrial/IndustrialPlanningSection";
import IndustrialCircuitGuide from "@/components/apprentice/installation-guides/industrial/IndustrialCircuitGuide";
import IndustrialTestingGuide from "@/components/apprentice/installation-guides/industrial/IndustrialTestingGuide";
import IndustrialRiskManagement from "@/components/apprentice/installation-guides/industrial/IndustrialRiskManagement";
import IndustrialReferenceGuide from "@/components/apprentice/installation-guides/industrial/IndustrialReferenceGuide";

const cards: ToggleCardDef[] = [
  {
    id: "overview",
    label: "Overview",
    icon: FileText,
    colour: "blue",
    borderColour: "border-blue-500",
    bgColour: "bg-blue-500/20",
    textColour: "text-blue-400",
    ringColour: "ring-blue-500/40",
  },
  {
    id: "planning",
    label: "Planning",
    icon: ClipboardList,
    colour: "green",
    borderColour: "border-green-500",
    bgColour: "bg-green-500/20",
    textColour: "text-green-400",
    ringColour: "ring-green-500/40",
  },
  {
    id: "circuits",
    label: "Circuits",
    icon: Zap,
    colour: "amber",
    borderColour: "border-amber-500",
    bgColour: "bg-amber-500/20",
    textColour: "text-amber-400",
    ringColour: "ring-amber-500/40",
  },
  {
    id: "testing",
    label: "Testing",
    icon: TestTube,
    colour: "cyan",
    borderColour: "border-cyan-500",
    bgColour: "bg-cyan-500/20",
    textColour: "text-cyan-400",
    ringColour: "ring-cyan-500/40",
  },
  {
    id: "safety",
    label: "Safety",
    icon: ShieldAlert,
    colour: "red",
    borderColour: "border-red-500",
    bgColour: "bg-red-500/20",
    textColour: "text-red-400",
    ringColour: "ring-red-500/40",
  },
  {
    id: "reference",
    label: "Reference",
    icon: BookOpen,
    colour: "purple",
    borderColour: "border-purple-500",
    bgColour: "bg-purple-500/20",
    textColour: "text-purple-400",
    ringColour: "ring-purple-500/40",
  },
];

const renderPanel = (cardId: string) => {
  switch (cardId) {
    case "overview":
      return <IndustrialOverviewCards />;
    case "planning":
      return <IndustrialPlanningSection />;
    case "circuits":
      return <IndustrialCircuitGuide />;
    case "testing":
      return <IndustrialTestingGuide />;
    case "safety":
      return <IndustrialRiskManagement />;
    case "reference":
      return <IndustrialReferenceGuide />;
    default:
      return null;
  }
};

const IndustrialInstallations = () => (
  <InstallationGuidePageShell
    title="Industrial Installations"
    icon={Factory}
    cards={cards}
    renderPanel={renderPanel}
    safetyNotice={{
      title: "Critical Industrial Safety Requirements",
      points: [
        {
          title: "ATEX Compliance",
          content:
            "All equipment in explosive atmospheres must have appropriate ATEX certification. Zone classifications must be verified and equipment temperature ratings must not exceed auto-ignition temperatures.",
        },
        {
          title: "Arc Flash Protection",
          content:
            "High voltage industrial systems present significant arc flash risks. Appropriate PPE, risk assessments, and safety procedures must be implemented for all electrical work.",
        },
        {
          title: "Machinery Safety Integration",
          content:
            "All electrical installations must integrate with emergency stop systems and safety interlocks. Compliance with BS EN 60204-1 and machinery safety directives is mandatory.",
        },
      ],
    }}
  />
);

export default IndustrialInstallations;
