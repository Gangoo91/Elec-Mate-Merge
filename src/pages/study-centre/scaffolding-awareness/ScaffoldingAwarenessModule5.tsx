import { ArrowLeft, ShieldCheck, AlertTriangle, Wind, HardHat } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Safe Working on Scaffolds",
    icon: ShieldCheck,
    description:
      "Access and egress, maintaining 3 points of contact, keeping platforms clear, load limits, and not overreaching",
  },
  {
    id: 2,
    title: "Common Scaffold Hazards",
    icon: AlertTriangle,
    description:
      "Falls from height, falling objects, scaffold collapse, electrocution from overhead lines, slips/trips, and crushing",
  },
  {
    id: 3,
    title: "Weather & Environmental Conditions",
    icon: Wind,
    description:
      "Wind speed limits, ice and frost, rain, lightning, and when to stop work on scaffolds",
  },
  {
    id: 4,
    title: "Loading, Storage & Prohibited Actions",
    icon: HardHat,
    description:
      "Maximum bay loads, material storage rules, never modify scaffolds, prohibited activities, and scaffold user responsibilities",
  },
];

export default function ScaffoldingAwarenessModule5() {
  useSEO({
    title: "Module 5: Safe Use & Hazard Awareness | Scaffolding Awareness",
    description:
      "Learn how to work safely on scaffolds, identify common hazards, understand weather limits, and follow loading and storage rules.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../scaffolding-awareness-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Scaffolding Awareness
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3">
              <span className="text-slate-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Safe Use & Hazard Awareness
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Learn how to work safely on scaffolds, identify the most common scaffold hazards,
              understand the impact of weather and environmental conditions, and follow the rules
              for loading, storage, and prohibited actions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../scaffolding-awareness-module-5-section-${section.id}`}
                sectionNumber={section.id}
                title={section.title}
                description={section.description}
                icon={section.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
