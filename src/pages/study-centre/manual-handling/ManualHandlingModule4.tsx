import { ArrowLeft, Cable, HardHat, DoorOpen, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Electrical Materials & Cable Drums",
    icon: Cable,
    description:
      "Cable drums, cable trays, distribution boards, transformers, and heavy electrical equipment",
  },
  {
    id: 2,
    title: "Working in Construction Environments",
    icon: HardHat,
    description:
      "Site conditions, PPE constraints, weather effects, and uneven ground",
  },
  {
    id: 3,
    title: "Handling in Confined & Restricted Spaces",
    icon: DoorOpen,
    description:
      "Loft work, ceiling voids, under-floor access, risers, and restricted headroom",
  },
  {
    id: 4,
    title: "Repetitive Handling & Cumulative Risk",
    icon: RefreshCw,
    description:
      "Repetitive strain, fatigue management, job rotation, and micro-breaks",
  },
];

export default function ManualHandlingModule4() {
  useSEO({
    title: "Module 4: Workplace-Specific Handling | Manual Handling",
    description:
      "Handling electrical materials, construction environments, confined spaces, and managing repetitive handling and cumulative risk.",
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
              <Link to="../manual-handling-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Manual Handling
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <span className="text-emerald-400 text-xs font-semibold">
                MODULE 4
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Workplace-Specific Handling
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Handling electrical materials, construction site conditions,
              confined spaces, and managing repetitive handling risks
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../manual-handling-module-4-section-${section.id}`}
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
