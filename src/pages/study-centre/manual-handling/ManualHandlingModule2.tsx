import { ArrowLeft, Dumbbell, MoveHorizontal, Users, Boxes } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "The Kinetic Lifting Technique",
    icon: Dumbbell,
    description:
      "The eight-step safe lift, base of support, centre of gravity, and smooth controlled movements",
  },
  {
    id: 2,
    title: "Pushing, Pulling & Carrying",
    icon: MoveHorizontal,
    description:
      "Force requirements, body positioning, reducing friction, and safe carrying techniques",
  },
  {
    id: 3,
    title: "Team Handling & Communication",
    icon: Users,
    description:
      "Coordinated lifts, verbal signals, planning team lifts, and maximum team sizes",
  },
  {
    id: 4,
    title: "Awkward Loads & Restricted Spaces",
    icon: Boxes,
    description:
      "Long loads, uneven loads, hot or sharp items, and handling in confined areas",
  },
];

export default function ManualHandlingModule2() {
  useSEO({
    title: "Module 2: Principles of Safe Lifting | Manual Handling",
    description:
      "The kinetic lifting technique, pushing, pulling, carrying, team handling, and managing awkward loads in restricted spaces.",
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
                MODULE 2
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Principles of Safe Lifting
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              The kinetic lifting technique, pushing, pulling, carrying, team
              handling, and managing awkward loads
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../manual-handling-module-2-section-${section.id}`}
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
