import {
  ArrowLeft,
  ShieldCheck,
  User,
  AlertTriangle,
  ClipboardCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Collective Fall Prevention",
    icon: ShieldCheck,
    description:
      "Guard rails, edge protection, safety netting, safety decking, airbags, and catch platforms",
  },
  {
    id: 2,
    title: "Personal Fall Protection Systems",
    icon: User,
    description:
      "Full body harnesses, lanyards, shock absorbers, inertia reels, anchor points, and fall arrest vs restraint",
  },
  {
    id: 3,
    title: "Fragile Surfaces & Roof Work",
    icon: AlertTriangle,
    description:
      "Fragile surface definition, common materials, controls, crawling boards, staging, and HSG33",
  },
  {
    id: 4,
    title: "Harness Inspection & Equipment Checks",
    icon: ClipboardCheck,
    description:
      "Pre-use visual checks, 6-monthly thorough examination, when to discard, and correct storage",
  },
];

export default function WorkingAtHeightModule3() {
  useSEO({
    title: "Module 3: Fall Protection & Prevention | Working at Height",
    description:
      "Collective fall prevention, personal fall protection systems, fragile surfaces, and harness inspection for safe working at height.",
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
                MODULE 3
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Fall Protection & Prevention
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Collective and personal fall protection, fragile surface hazards,
              and harness inspection for working at height
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../working-at-height-module-3-section-${section.id}`}
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
