import { ArrowLeft, PackageOpen, Scale, Search, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "What Is Manual Handling?",
    icon: PackageOpen,
    description:
      "MHOR 1992 definition, injury statistics, common manual handling activities, and why it matters for electricians",
  },
  {
    id: 2,
    title: "The Legal Framework",
    icon: Scale,
    description:
      "MHOR 1992, HASAWA 1974, Management Regs 1999, and employer/employee duties",
  },
  {
    id: 3,
    title: "Manual Handling Risk Assessment",
    icon: Search,
    description:
      "The TILE framework — Task, Individual, Load, Environment — and the five-step assessment process",
  },
  {
    id: 4,
    title: "Anatomy & Injury Mechanisms",
    icon: HeartPulse,
    description:
      "Spinal structure, intervertebral discs, herniation, and how manual handling injuries occur",
  },
];

export default function ManualHandlingModule1() {
  useSEO({
    title: "Module 1: Understanding Manual Handling | Manual Handling",
    description:
      "MHOR 1992 definition, the legal framework, TILE risk assessment process, and anatomy of manual handling injuries.",
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
              <Link to="../manual-handling-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Manual Handling
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <span className="text-emerald-400 text-xs font-semibold">
                MODULE 1
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Understanding Manual Handling
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              The regulations, legal duties, TILE risk assessment process, and
              anatomy of manual handling injuries
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../manual-handling-module-1-section-${section.id}`}
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
