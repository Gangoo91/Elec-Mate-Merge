import { ArrowLeft, Construction, DoorOpen, Flame, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Excavations & Underground Services",
    icon: Construction,
    description:
      "Excavation hazards, shoring and battering, service detection (CAT and Genny), and safe digging practices",
  },
  {
    id: 2,
    title: "Confined Spaces & Fire Safety",
    icon: DoorOpen,
    description:
      "Confined space identification, safe entry procedures, fire prevention, evacuation routes, and fire extinguisher types",
  },
  {
    id: 3,
    title: "Electrical Safety on Site",
    icon: Zap,
    description:
      "Electrical hazards, 110V reduced voltage, PAT testing, overhead power lines, and underground cables",
  },
  {
    id: 4,
    title: "Demolition & Emergency Procedures",
    icon: Flame,
    description:
      "Demolition risks, exclusion zones, first aid arrangements, emergency procedures, and site evacuation",
  },
];

export default function CscsCardModule5() {
  useSEO({
    title: "Module 5: Specialist Knowledge & Site Safety | CSCS Card Preparation",
    description:
      "Learn about excavations, confined spaces, fire safety, electrical safety, demolition, and emergency procedures for the CSCS HS&E test.",
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
              <Link to="../cscs-card-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to CSCS Card Preparation
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3">
              <span className="text-green-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Specialist Knowledge &amp; Site Safety
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Explore specialist site safety topics including excavations, confined spaces, fire
              safety, electrical safety on site, demolition risks, and emergency procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cscs-card-module-5-section-${section.id}`}
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
