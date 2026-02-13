import {
  Building,
  FileText,
  ClipboardList,
  Zap,
  TestTube,
  BookOpen,
} from "lucide-react";
import InstallationGuidePageShell from "@/components/apprentice/installation-guides/InstallationGuidePageShell";
import type { ToggleCardDef } from "@/types/installation-guides";
import CommercialOverviewCards from "@/components/apprentice/installation-guides/commercial/CommercialOverviewCards";
import CommercialPlanningSection from "@/components/apprentice/installation-guides/commercial/CommercialPlanningSection";
import CommercialCircuitGuide from "@/components/apprentice/installation-guides/commercial/CommercialCircuitGuide";
import CommercialTestingGuide from "@/components/apprentice/installation-guides/commercial/CommercialTestingGuide";
import CommercialReferenceGuide from "@/components/apprentice/installation-guides/commercial/CommercialReferenceGuide";

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
      return <CommercialOverviewCards />;
    case "planning":
      return <CommercialPlanningSection />;
    case "circuits":
      return <CommercialCircuitGuide />;
    case "testing":
      return <CommercialTestingGuide />;
    case "reference":
      return <CommercialReferenceGuide />;
    default:
      return null;
  }
};

const CommercialInstallations = () => (
  <InstallationGuidePageShell
    title="Commercial Installations"
    icon={Building}
    cards={cards}
    renderPanel={renderPanel}
    safetyNotice={{
      title: "Commercial Installation Requirements",
      points: [
        {
          title: "Emergency Systems",
          content:
            "Emergency lighting and fire alarm systems must be installed to current British Standards and tested regularly.",
        },
        {
          title: "Three-Phase Supplies",
          content:
            "Ensure proper phase rotation and balanced loading. Use appropriate protection devices for motor circuits.",
        },
        {
          title: "Maintenance Requirements",
          content:
            "Establish regular testing schedules and provide comprehensive documentation for building management.",
        },
      ],
    }}
  />
);

export default CommercialInstallations;
