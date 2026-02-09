import { ArrowLeft, Microscope, Clock3, FlaskConical, MapPin, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "History, Properties & Why It Was Used",
    icon: Clock3,
    description: "Natural mineral fibre, six types, fireproof properties, peak UK use, and the timeline of discovery",
  },
  {
    id: 2,
    title: "Types of Asbestos Fibres",
    icon: FlaskConical,
    description: "Chrysotile, amosite, crocidolite — serpentine vs amphibole, properties, and relative dangers",
  },
  {
    id: 3,
    title: "Where Asbestos Is Found",
    icon: MapPin,
    description: "Common locations in pre-2000 buildings — roofs, walls, floors, services, and domestic properties",
  },
  {
    id: 4,
    title: "Health Effects of Asbestos Exposure",
    icon: HeartPulse,
    description: "Mesothelioma, lung cancer, asbestosis, pleural disease — latency periods and the single-fibre theory",
  },
];

export default function AsbestosModule1() {
  useSEO({
    title: "Module 1: What Is Asbestos? | Asbestos Awareness",
    description: "History, fibre types, where asbestos is found in buildings, and the health effects of exposure including mesothelioma and asbestosis.",
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
              <span className="text-orange-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              What Is Asbestos?
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              The history, properties, types, locations, and devastating health effects of this once widely-used mineral fibre
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../asbestos-awareness-module-1-section-${section.id}`}
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
