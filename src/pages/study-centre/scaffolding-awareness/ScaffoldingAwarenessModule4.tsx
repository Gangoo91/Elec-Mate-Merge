import { ArrowLeft, ClipboardCheck, Search, Tag, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "When to Inspect",
    icon: ClipboardCheck,
    description:
      "Before first use, every 7 days, after weather events, after alteration, after any event affecting stability, and who must inspect",
  },
  {
    id: 2,
    title: "The Inspection Process",
    icon: Search,
    description:
      "Systematic inspection method, what to check (foundations, standards, ledgers, bracing, ties, platforms, guardrails), defect identification",
  },
  {
    id: 3,
    title: "Scaffold Tags & Status",
    icon: Tag,
    description:
      "Green tag (safe to use), yellow tag (restrictions), red tag (do not use), tag information, advanced scaffolding inspection scheme",
  },
  {
    id: 4,
    title: "Inspection Records & Reporting",
    icon: Calendar,
    description:
      "Written inspection reports, record retention, who sees the reports, reporting defects, and enforcement",
  },
];

export default function ScaffoldingAwarenessModule4() {
  useSEO({
    title: "Module 4: Scaffold Inspection & Tagging | Scaffolding Awareness",
    description:
      "Learn when and how to inspect scaffolds, the scaffold tag system, inspection records, and reporting requirements.",
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
              <span className="text-slate-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Scaffold Inspection & Tagging
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand the statutory inspection requirements for scaffolds, learn the systematic
              inspection process, master the green/yellow/red tag system, and know how to complete
              and maintain inspection records.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../scaffolding-awareness-module-4-section-${section.id}`}
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
