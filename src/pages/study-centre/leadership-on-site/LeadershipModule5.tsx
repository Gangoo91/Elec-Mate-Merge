import { ArrowLeft, CalendarDays, Network, Shield, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Planning and Organising the Work",
    icon: CalendarDays,
    description:
      "Programming tasks, managing resources, coordinating timelines, and keeping the job on track",
  },
  {
    id: 2,
    title: "Managing Subcontractors and Other Trades",
    icon: Network,
    description:
      "Coordinating with other trades, setting expectations, and maintaining standards across teams",
  },
  {
    id: 3,
    title: "Health, Safety, and Welfare as a Leader",
    icon: Shield,
    description:
      "Your legal duties, leading by example, site inductions, and creating a positive safety culture",
  },
  {
    id: 4,
    title: "Supporting Apprentices and New Starters",
    icon: GraduationCap,
    description:
      "Mentoring effectively, setting development goals, and helping the next generation succeed on site",
  },
];

export default function LeadershipModule5() {
  useSEO({
    title: "Module 5: Leading on Site | Leadership on Site",
    description:
      "Planning work, managing subcontractors, health and safety leadership, and supporting apprentices.",
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
                MODULE 5
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Leading on Site
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Planning and organising work, coordinating trades, leading on
              safety, and developing apprentices and new starters
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../leadership-module-5-section-${section.id}`}
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
