import { ArrowLeft, HandHeart, GitBranch, Rocket, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Building Trust and Earning Respect",
    icon: HandHeart,
    description:
      "Why trust is the foundation of leadership, how to earn it on site, and what destroys it",
  },
  {
    id: 2,
    title: "Delegating Effectively",
    icon: GitBranch,
    description:
      "Matching tasks to people, setting clear expectations, and letting go without losing control",
  },
  {
    id: 3,
    title: "Motivating Your Team",
    icon: Rocket,
    description:
      "What drives people at work, recognising effort, and keeping morale high on difficult jobs",
  },
  {
    id: 4,
    title: "Giving Feedback That Sticks",
    icon: MessageSquare,
    description:
      "Constructive feedback techniques, the SBI model, and having praise land as well as criticism",
  },
];

export default function LeadershipModule2() {
  useSEO({
    title: "Module 2: Leading Your Team | Leadership on Site",
    description:
      "Building trust, delegating effectively, motivating your team, and giving feedback that sticks.",
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
                MODULE 2
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Leading Your Team
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Building trust, delegating work, keeping your team motivated, and
              giving feedback that actually makes a difference
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../leadership-module-2-section-${section.id}`}
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
