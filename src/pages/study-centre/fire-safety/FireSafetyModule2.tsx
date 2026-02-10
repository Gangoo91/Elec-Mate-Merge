import { ArrowLeft, Scale, Users, ClipboardCheck, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "The Regulatory Reform (Fire Safety) Order 2005",
    icon: Scale,
    description:
      "The primary fire safety legislation in England and Wales, replacing over 70 pieces of previous fire law with a single risk-based framework",
  },
  {
    id: 2,
    title: "The Responsible Person",
    icon: Users,
    description:
      "Who is the responsible person, their legal duties, and the consequences of non-compliance including criminal prosecution",
  },
  {
    id: 3,
    title: "Fire Risk Assessment",
    icon: ClipboardCheck,
    description:
      "The five-step fire risk assessment process: identify hazards, identify people at risk, evaluate and act, record and plan, review and update",
  },
  {
    id: 4,
    title: "Supporting Legislation & Standards",
    icon: BookOpen,
    description:
      "Health and Safety at Work Act 1974, Management Regulations 1999, Building Regulations Part B, and BS 5839 fire detection standards",
  },
];

export default function FireSafetyModule2() {
  useSEO({
    title: "Module 2: Fire Safety Legislation | Fire Safety & Fire Marshal",
    description:
      "Learn about the Regulatory Reform (Fire Safety) Order 2005, the responsible person, fire risk assessments, and supporting legislation.",
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
              <Link to="../fire-safety-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Fire Safety
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Fire Safety Legislation
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand the legal framework governing fire safety in England and Wales, the duties
              of the responsible person, the fire risk assessment process, and the key supporting
              legislation and British Standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../fire-safety-module-2-section-${section.id}`}
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
