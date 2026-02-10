import { ArrowLeft, Construction, Zap, Wind, Bug } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Common Construction Hazards",
    icon: Construction,
    description: "Cement, silica dust, wood dust, solvents, adhesives, and other hazardous substances found on construction sites",
  },
  {
    id: 2,
    title: "Electrical Trade Hazards",
    icon: Zap,
    description: "Cable lubricants, PVC fumes from hot work, soldering flux, cleaning agents, resins, and encapsulants",
  },
  {
    id: 3,
    title: "Dust & Fume Control",
    icon: Wind,
    description: "Local exhaust ventilation, RPE selection, wet cutting techniques, H-class vacuums, and on-tool extraction",
  },
  {
    id: 4,
    title: "Biological & Environmental Hazards",
    icon: Bug,
    description: "Weil's disease, legionella, mould, sewage exposure, and other biological risks on construction sites",
  },
];

export default function CoshhAwarenessModule3() {
  useSEO({
    title: "Module 3: Hazardous Substances on Site | COSHH Awareness",
    description: "Identify hazardous substances commonly found on construction sites and in the electrical trade, including dust, fumes, chemicals, and biological hazards.",
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
              <Link to="../coshh-awareness-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to COSHH Awareness
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3">
              <span className="text-violet-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Hazardous Substances on Site
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              The real-world hazardous substances you will encounter on construction sites and in the electrical trade — and how to control dust, fumes, and biological risks
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../coshh-awareness-module-3-section-${section.id}`}
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
