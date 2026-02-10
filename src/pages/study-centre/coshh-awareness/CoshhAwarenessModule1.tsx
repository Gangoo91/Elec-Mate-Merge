import { ArrowLeft, FlaskConical, Layers, Route, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "What Is COSHH?",
    icon: FlaskConical,
    description: "COSHH Regulations 2002 definition, scope, workplace statistics, and why controlling hazardous substances matters",
  },
  {
    id: 2,
    title: "Types of Hazardous Substances",
    icon: Layers,
    description: "Chemicals, dusts, fumes, gases, biological agents, and GHS classification of hazardous substances",
  },
  {
    id: 3,
    title: "Routes of Exposure",
    icon: Route,
    description: "Inhalation, ingestion, skin absorption, injection, and understanding workplace exposure limits (WELs)",
  },
  {
    id: 4,
    title: "Health Effects of Hazardous Substances",
    icon: HeartPulse,
    description: "Acute vs chronic health effects, occupational diseases, target organs, and long-term consequences of exposure",
  },
];

export default function CoshhAwarenessModule1() {
  useSEO({
    title: "Module 1: Understanding COSHH | COSHH Awareness",
    description: "Learn what COSHH means, the types of hazardous substances, routes of exposure, and the health effects of working with dangerous chemicals and materials.",
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
              <span className="text-violet-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding COSHH
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              The fundamentals of the Control of Substances Hazardous to Health — what COSHH covers, the substances involved, how they enter the body, and the damage they can cause
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../coshh-awareness-module-1-section-${section.id}`}
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
