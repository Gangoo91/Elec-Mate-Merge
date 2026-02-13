import { Home, FileText, ClipboardList, Zap, TestTube, BookOpen } from "lucide-react";
import InstallationGuidePageShell from "@/components/apprentice/installation-guides/InstallationGuidePageShell";
import type { ToggleCardDef } from "@/types/installation-guides";
import DomesticOverviewCards from "@/components/apprentice/installation-guides/domestic/DomesticOverviewCards";
import DomesticPlanningSection from "@/components/apprentice/installation-guides/domestic/DomesticPlanningSection";
import DomesticCircuitGuide from "@/components/apprentice/installation-guides/domestic/DomesticCircuitGuide";
import DomesticTestingGuide from "@/components/apprentice/installation-guides/domestic/DomesticTestingGuide";
import DomesticReferenceGuide from "@/components/apprentice/installation-guides/domestic/DomesticReferenceGuide";

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
      return <DomesticOverviewCards />;
    case "planning":
      return <DomesticPlanningSection />;
    case "circuits":
      return <DomesticCircuitGuide />;
    case "testing":
      return <DomesticTestingGuide />;
    case "reference":
      return <DomesticReferenceGuide />;
    default:
      return null;
  }
};

const DomesticInstallations = () => (
  <InstallationGuidePageShell
    title="Domestic Installations"
    icon={Home}
    cards={cards}
    renderPanel={renderPanel}
    safetyNotice={{
      title: "Critical Safety Requirements",
      points: [
        {
          title: "Part P Building Regulations Compliance",
          content:
            "Most domestic electrical work is notifiable under Part P. Use a registered competent person scheme or notify Building Control before starting work.",
        },
        {
          title: "RCD Protection Requirements",
          content:
            "All domestic socket outlets must have 30mA RCD protection as per BS 7671:2018+A3:2024. Bathroom circuits require additional protection measures.",
        },
        {
          title: "Testing and Certification Mandatory",
          content:
            "Complete inspection and testing is legally required. Provide appropriate certification upon completion with detailed test results.",
        },
        {
          title: "Competence and Registration",
          content:
            "Only qualified and registered electricians should carry out domestic electrical work. Ensure appropriate competent person scheme membership.",
        },
      ],
    }}
  />
);

export default DomesticInstallations;
