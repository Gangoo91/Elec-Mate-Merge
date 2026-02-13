import { ArrowLeft, Megaphone, Ear, ShieldAlert, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Running Toolbox Talks and Site Briefings",
    icon: Megaphone,
    description:
      "Planning, delivering, and recording effective toolbox talks that keep your team engaged and informed",
  },
  {
    id: 2,
    title: "Active Listening and Asking Questions",
    icon: Ear,
    description:
      "How to really hear what your team is telling you, open vs closed questions, and reading between the lines",
  },
  {
    id: 3,
    title: "Having Difficult Conversations",
    icon: ShieldAlert,
    description:
      "Addressing poor performance, challenging behaviour, and sensitive issues with confidence and fairness",
  },
  {
    id: 4,
    title: "Written Communication — Emails, Reports, Records",
    icon: PenLine,
    description:
      "Writing clear site reports, professional emails, and keeping records that protect you and your team",
  },
];

export default function LeadershipModule3() {
  useSEO({
    title: "Module 3: Communication for Leaders | Leadership on Site",
    description:
      "Running toolbox talks, active listening, difficult conversations, and written communication for site leaders.",
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
                MODULE 3
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Communication for Leaders
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Toolbox talks, active listening, handling difficult conversations,
              and writing clear reports and records
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../leadership-module-3-section-${section.id}`}
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
