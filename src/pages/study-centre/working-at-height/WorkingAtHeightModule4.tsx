import {
  ArrowLeft,
  CalendarCheck,
  FileCheck,
  FileText,
  Cloud,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Planning & Organising",
    icon: CalendarCheck,
    description:
      "Competent person requirements, weather limits, task duration, supervision, and equipment condition checks",
  },
  {
    id: 2,
    title: "Permit-to-Work Systems",
    icon: FileCheck,
    description:
      "When PTW is required, permit content, issuer/holder roles, and the permit lifecycle",
  },
  {
    id: 3,
    title: "Method Statements & Rescue Plans",
    icon: FileText,
    description:
      "Method statement content, rescue plan requirements, self/assisted/technical rescue, and practice drills",
  },
  {
    id: 4,
    title: "Weather, Environment & Site Conditions",
    icon: Cloud,
    description:
      "Beaufort scale thresholds, rain, ice, lightning, ground conditions, overhead power lines, and public protection",
  },
];

export default function WorkingAtHeightModule4() {
  useSEO({
    title: "Module 4: Safe Systems of Work | Working at Height",
    description:
      "Planning, permit-to-work systems, method statements, rescue plans, and weather considerations for safe working at height.",
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
              <Link to="../working-at-height-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Working at Height
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
              <span className="text-amber-400 text-xs font-semibold">
                MODULE 4
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Safe Systems of Work
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Planning, permit-to-work systems, method statements, rescue plans,
              and environmental considerations for safe working at height
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../working-at-height-module-4-section-${section.id}`}
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
