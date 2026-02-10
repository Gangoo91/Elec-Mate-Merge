import { ArrowLeft, Scale, FileText, ShieldCheck, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Work at Height Regulations 2005",
    icon: Scale,
    description:
      "Legal framework for scaffolding, hierarchy of controls, duty holders, and inspection requirements",
  },
  {
    id: 2,
    title: "NASC Guidance & TG20",
    icon: FileText,
    description:
      "National Access and Scaffolding Confederation, TG20 compliance system, design configurations, and when a scaffold design is needed",
  },
  {
    id: 3,
    title: "BS EN 12811 & Other Standards",
    icon: ShieldCheck,
    description:
      "British and European scaffold standards, load classes, performance requirements, and width categories",
  },
  {
    id: 4,
    title: "CDM 2015 & Scaffold Design",
    icon: BookOpen,
    description:
      "Construction Design and Management duties, temporary works coordination, design review, and handover",
  },
];

export default function ScaffoldingAwarenessModule2() {
  useSEO({
    title: "Module 2: Scaffold Regulations & Standards | Scaffolding Awareness",
    description:
      "Learn about the Work at Height Regulations 2005, NASC guidance, TG20, BS EN 12811, and CDM 2015 scaffold design requirements.",
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
              <Link to="../scaffolding-awareness-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Scaffolding Awareness
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3">
              <span className="text-slate-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Scaffold Regulations & Standards
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand the legal framework governing scaffolding in the UK, including the Work at
              Height Regulations 2005, NASC guidance notes, the TG20 compliance system, British and
              European standards, and CDM 2015 duties.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../scaffolding-awareness-module-2-section-${section.id}`}
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
