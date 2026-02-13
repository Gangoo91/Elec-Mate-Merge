import { ArrowLeft, Gauge, Wrench, Swords, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Making Decisions Under Pressure",
    icon: Gauge,
    description:
      "Frameworks for quick thinking, balancing speed with accuracy, and owning your calls on site",
  },
  {
    id: 2,
    title: "Problem-Solving on Site",
    icon: Wrench,
    description:
      "Root cause analysis, the 5 Whys, systematic troubleshooting, and thinking beyond the obvious fix",
  },
  {
    id: 3,
    title: "Managing Conflict",
    icon: Swords,
    description:
      "De-escalation techniques, mediating between team members, and turning disagreements into progress",
  },
  {
    id: 4,
    title: "Taking Responsibility and Accountability",
    icon: Scale,
    description:
      "Owning mistakes, holding others accountable fairly, and building a culture of responsibility",
  },
];

export default function LeadershipModule4() {
  useSEO({
    title: "Module 4: Decision-Making & Problem-Solving | Leadership on Site",
    description:
      "Making decisions under pressure, problem-solving on site, managing conflict, and taking responsibility.",
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
              <Link to="../leadership-on-site">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Leadership on Site
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 4
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Decision-Making & Problem-Solving
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Making calls under pressure, systematic problem-solving, managing
              conflict, and owning your responsibilities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../leadership-module-4-section-${section.id}`}
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
