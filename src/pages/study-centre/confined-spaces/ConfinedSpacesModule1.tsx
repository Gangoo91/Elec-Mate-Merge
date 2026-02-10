import { ArrowLeft, DoorOpen, MapPin, AlertTriangle, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "What Is a Confined Space?",
    icon: DoorOpen,
    description:
      "Legal definition under the Confined Spaces Regulations 1997, key characteristics: enclosed, limited access, not designed for continuous occupancy, and foreseeable risk of serious injury",
  },
  {
    id: 2,
    title: "Common Confined Space Examples",
    icon: MapPin,
    description:
      "Tanks, vessels, silos, pits, chambers, ducts, sewers, manholes, ceiling voids, and cable tunnels found in construction and electrical work",
  },
  {
    id: 3,
    title: "Why Confined Spaces Kill",
    icon: AlertTriangle,
    description:
      "Statistics showing approximately 15 deaths per year in the UK with 60% being rescuers, rapid atmospheric changes, and human behaviour factors",
  },
  {
    id: 4,
    title: "Confined Spaces in Electrical Work",
    icon: Zap,
    description:
      "Cable ducts, transformer chambers, substations, plant rooms, risers, and ceiling voids encountered by electricians",
  },
];

export default function ConfinedSpacesModule1() {
  useSEO({
    title: "Module 1: Understanding Confined Spaces | Confined Spaces Awareness",
    description:
      "Learn the legal definition of confined spaces, common examples, fatality statistics, and how confined spaces affect electrical work.",
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
              <Link to="../confined-spaces-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Confined Spaces
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
              <span className="text-cyan-400 text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Confined Spaces
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Learn what legally defines a confined space, explore common examples across the
              construction industry, understand why they are so dangerous, and discover the specific
              confined-space hazards faced by electricians.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../confined-spaces-module-1-section-${section.id}`}
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
