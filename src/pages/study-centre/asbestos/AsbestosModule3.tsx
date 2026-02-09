import { ArrowLeft, Search, Layers, Paintbrush, Zap, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Common ACMs — Boards & Sheets",
    icon: Layers,
    description: "Asbestos insulating board and asbestos cement — identification, properties, locations, and risk levels",
  },
  {
    id: 2,
    title: "Common ACMs — Insulation & Coatings",
    icon: Paintbrush,
    description: "Pipe lagging, sprayed coatings, textured decorative coatings (Artex), rope seals, and millboard",
  },
  {
    id: 3,
    title: "ACMs in Electrical Installations",
    icon: Zap,
    description: "Flash guards, cable trenching, switchgear, fuse carriers, and electrical backing boards",
  },
  {
    id: 4,
    title: "Presuming, Sampling & Analysis",
    icon: FlaskConical,
    description: "The presumption approach, when to sample, PLM analysis, UKAS-accredited laboratories, and costs",
  },
];

export default function AsbestosModule3() {
  useSEO({
    title: "Module 3: Identifying Asbestos-Containing Materials | Asbestos Awareness",
    description: "Identifying common ACMs in boards, insulation, coatings, and electrical installations. Sampling, analysis, and the presumption approach.",
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
              <Link to="../asbestos-awareness-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Asbestos Awareness
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3">
              <span className="text-orange-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Identifying Asbestos-Containing Materials
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              How to recognise common ACMs in buildings and electrical installations, and the process of sampling and analysis
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../asbestos-awareness-module-3-section-${section.id}`}
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
