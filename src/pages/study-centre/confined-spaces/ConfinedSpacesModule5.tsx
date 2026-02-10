import { ArrowLeft, Siren, Heart, HeartPulse, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Emergency Planning",
    icon: Siren,
    description:
      "Regulation 5 of the Confined Spaces Regulations 1997, rescue plan requirements before entry, rescue team competence standards, and the importance of regular rehearsals",
  },
  {
    id: 2,
    title: "Rescue Equipment & Techniques",
    icon: Heart,
    description:
      "Tripods and winches, davit systems, confined-space stretchers, breathing apparatus sets, first aid provisions, and lowering and raising procedures",
  },
  {
    id: 3,
    title: "Casualty Retrieval",
    icon: HeartPulse,
    description:
      "Non-entry rescue as the preferred method, entry rescue as a last resort, self-rescue procedures, and the communication failure protocol",
  },
  {
    id: 4,
    title: "Incident Reporting & Lessons Learned",
    icon: BookOpen,
    description:
      "RIDDOR reporting requirements, incident investigation processes, building a near-miss reporting culture, post-incident debriefing, and continuous improvement",
  },
];

export default function ConfinedSpacesModule5() {
  useSEO({
    title: "Module 5: Emergency & Rescue Procedures | Confined Spaces Awareness",
    description:
      "Study emergency planning, rescue equipment and techniques, casualty retrieval methods, and incident reporting for confined space work.",
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
              <Link to="../confined-spaces-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Confined Spaces
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
              <span className="text-cyan-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Emergency & Rescue Procedures
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Learn how to plan for emergencies before anyone enters a confined space, select and use
              rescue equipment, retrieve a casualty safely, and report incidents to drive continuous
              improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../confined-spaces-module-5-section-${section.id}`}
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
