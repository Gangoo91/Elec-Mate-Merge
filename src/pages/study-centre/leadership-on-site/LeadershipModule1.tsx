import { ArrowLeft, Compass, Palette, Eye, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Leadership vs Management",
    icon: Compass,
    description:
      "The key differences between leading and managing, why both matter on site, and where you fit in",
  },
  {
    id: 2,
    title: "Leadership Styles — Finding Your Approach",
    icon: Palette,
    description:
      "Autocratic, democratic, laissez-faire, and situational styles — when to use each on site",
  },
  {
    id: 3,
    title: "Self-Awareness and Knowing Your Strengths",
    icon: Eye,
    description:
      "Understanding your natural tendencies, recognising blind spots, and building on what you do well",
  },
  {
    id: 4,
    title: "The Mate-to-Manager Transition",
    icon: ArrowUpRight,
    description:
      "Navigating the shift from working alongside your mates to being responsible for them",
  },
];

export default function LeadershipModule1() {
  useSEO({
    title: "Module 1: What Makes a Leader? | Leadership on Site",
    description:
      "Leadership vs management, leadership styles, self-awareness, and the mate-to-manager transition.",
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
                MODULE 1
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              What Makes a Leader?
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Leadership vs management, finding your style, knowing your
              strengths, and making the transition from mate to manager
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../leadership-module-1-section-${section.id}`}
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
