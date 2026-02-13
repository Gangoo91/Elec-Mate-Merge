import { ArrowLeft, MessageCircle, ClipboardList, Ear, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Why Conversations Matter",
    icon: MessageCircle,
    description:
      "The power of a simple conversation, why people stay silent, and how reaching out saves lives",
  },
  {
    id: 2,
    title: "The ALGEE Action Plan",
    icon: ClipboardList,
    description:
      "Approach, Listen, Give support, Encourage professional help, Encourage other supports — the MHFA framework",
  },
  {
    id: 3,
    title: "Listening Without Judgement",
    icon: Ear,
    description:
      "Active listening techniques, body language, creating safe spaces, and letting someone talk at their own pace",
  },
  {
    id: 4,
    title: "What to Say and What Not to Say",
    icon: MessageSquare,
    description:
      "Helpful phrases, common mistakes, avoiding toxic positivity, and language that validates rather than dismisses",
  },
];

export default function MentalHealthModule3() {
  useSEO({
    title: "Module 3: Starting Conversations | Mental Health Awareness",
    description:
      "Why conversations matter, the ALGEE action plan, listening skills, and helpful language.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../mental-health-awareness">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Mental Health Awareness
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
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">4 Sections</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Starting Conversations
            </h1>
            <p className="text-white text-sm sm:text-base">
              Why conversations matter, the ALGEE action plan, listening without
              judgement, and choosing the right words
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../mental-health-module-3-section-${section.id}`}
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
