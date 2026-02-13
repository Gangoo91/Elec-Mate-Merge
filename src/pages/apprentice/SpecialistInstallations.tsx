import {
  Sparkles,
  FileText,
  MapPin,
  Sun,
  Car,
  Waves,
  Zap,
  TestTube,
  Shield,
  BookOpen,
} from "lucide-react";
import InstallationGuidePageShell from "@/components/apprentice/installation-guides/InstallationGuidePageShell";
import type { ToggleCardDef } from "@/types/installation-guides";
import SpecialistOverviewCards from "@/components/apprentice/installation-guides/specialist/SpecialistOverviewCards";
import SpecialLocationsGuide from "@/components/apprentice/installation-guides/specialist/SpecialLocationsGuide";
import SolarPVGuide from "@/components/apprentice/installation-guides/specialist/SolarPVGuide";
import EVChargingGuide from "@/components/apprentice/installation-guides/specialist/EVChargingGuide";
import SwimmingPoolGuide from "@/components/apprentice/installation-guides/specialist/SwimmingPoolGuide";
import SpecialistCircuitsPanel from "@/components/apprentice/installation-guides/specialist/SpecialistCircuitsPanel";
import SpecialistTestingGuide from "@/components/apprentice/installation-guides/specialist/SpecialistTestingGuide";
import SpecialistCompliancePanel from "@/components/apprentice/installation-guides/specialist/SpecialistCompliancePanel";
import SpecialistReferenceGuide from "@/components/apprentice/installation-guides/specialist/SpecialistReferenceGuide";

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
    id: "locations",
    label: "Locations",
    icon: MapPin,
    colour: "cyan",
    borderColour: "border-cyan-500",
    bgColour: "bg-cyan-500/20",
    textColour: "text-cyan-400",
    ringColour: "ring-cyan-500/40",
  },
  {
    id: "solar",
    label: "Solar PV",
    icon: Sun,
    colour: "amber",
    borderColour: "border-amber-500",
    bgColour: "bg-amber-500/20",
    textColour: "text-amber-400",
    ringColour: "ring-amber-500/40",
  },
  {
    id: "ev",
    label: "EV Charging",
    icon: Car,
    colour: "lime",
    borderColour: "border-lime-500",
    bgColour: "bg-lime-500/20",
    textColour: "text-lime-400",
    ringColour: "ring-lime-500/40",
  },
  {
    id: "pools",
    label: "Pools",
    icon: Waves,
    colour: "blue",
    borderColour: "border-blue-500",
    bgColour: "bg-blue-500/20",
    textColour: "text-blue-400",
    ringColour: "ring-blue-500/40",
  },
  {
    id: "circuits",
    label: "Circuits",
    icon: Zap,
    colour: "orange",
    borderColour: "border-orange-500",
    bgColour: "bg-orange-500/20",
    textColour: "text-orange-400",
    ringColour: "ring-orange-500/40",
  },
  {
    id: "testing",
    label: "Testing",
    icon: TestTube,
    colour: "green",
    borderColour: "border-green-500",
    bgColour: "bg-green-500/20",
    textColour: "text-green-400",
    ringColour: "ring-green-500/40",
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: Shield,
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
      return <SpecialistOverviewCards />;
    case "locations":
      return <SpecialLocationsGuide />;
    case "solar":
      return <SolarPVGuide />;
    case "ev":
      return <EVChargingGuide />;
    case "pools":
      return <SwimmingPoolGuide />;
    case "circuits":
      return <SpecialistCircuitsPanel />;
    case "testing":
      return <SpecialistTestingGuide />;
    case "compliance":
      return <SpecialistCompliancePanel />;
    case "reference":
      return <SpecialistReferenceGuide />;
    default:
      return null;
  }
};

const SpecialistInstallations = () => (
  <InstallationGuidePageShell
    title="Specialist Installations"
    icon={Sparkles}
    cards={cards}
    renderPanel={renderPanel}
    safetyNotice={{
      title: "Critical Special Location Safety Requirements",
      points: [
        {
          title: "Part 7 Compliance is Mandatory",
          content:
            "Where BS 7671 Part 7 requirements apply, they MUST be followed. Part 7 requirements supplement and take precedence over general requirements.",
        },
        {
          title: "Specialist Training Required",
          content:
            "Many special locations require additional training and certification (e.g., MCS for solar, medical locations training for hospitals). Never attempt specialist work without proper qualifications.",
        },
        {
          title: "Enhanced Protection Measures",
          content:
            "Special locations have enhanced protection requirements including SELV systems, enhanced bonding, specific RCD types, and stricter disconnection times.",
        },
        {
          title: "Consult IET Guidance Note 7",
          content:
            "IET Guidance Note 7 provides essential detailed guidance on all Part 7 special locations. It is an essential reference for any specialist installation work.",
        },
      ],
    }}
  />
);

export default SpecialistInstallations;
