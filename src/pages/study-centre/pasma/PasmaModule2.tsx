import { ArrowLeft, Layers, Wrench, Shield, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Tower Classifications",
    icon: Layers,
    description: "Standard, linked, bridge, high clearance, stairway towers, aluminium vs GRP",
  },
  {
    id: 2,
    title: "Structural Components",
    icon: Wrench,
    description: "End frames, braces, platforms, castors, base plates, spigots, adjustable legs",
  },
  {
    id: 3,
    title: "Safety Components",
    icon: Shield,
    description: "Guardrails 950mm, mid-rails 470mm, toeboards 150mm, stabilisers, outriggers",
  },
  {
    id: 4,
    title: "Tower Selection & Planning",
    icon: ClipboardList,
    description: "Indoor vs outdoor, single vs double width, height, environmental factors",
  },
];

export default function PasmaModule2() {
  useSEO({
    title: "Module 2: Tower Types & Components | PASMA Towers for Users",
    description: "Tower classifications, structural and safety components, and tower selection principles for mobile access tower work.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../pasma-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to PASMA Course
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Module Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
              <span className="text-elec-yellow text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Tower Types & Components
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Tower classifications, structural and safety components, and how to select the right tower for the task
            </p>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../pasma-module-2-section-${section.id}`}
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
