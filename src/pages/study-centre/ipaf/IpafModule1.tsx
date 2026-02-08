import { ArrowLeft, Scale, BookOpen, FileText, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Work at Height Regulations 2005",
    icon: Scale,
    description: "Hierarchy of control, duty to plan and supervise, Schedule 5 scaffolding requirements",
  },
  {
    id: 2,
    title: "HSWA 1974 & CDM 2015",
    icon: BookOpen,
    description: "General duties, CDM duty holders, how CDM applies to mobile tower scaffold work",
  },
  {
    id: 3,
    title: "BS EN 1004-1:2020 & Related Standards",
    icon: FileText,
    description: "Load classes, max heights, marking requirements, design loads and safety factors",
  },
  {
    id: 4,
    title: "PASMA & Competence Requirements",
    icon: Award,
    description: "Towers for Users course, competence vs qualification, card types and renewal cycles",
  },
];

export default function IpafModule1() {
  useSEO({
    title: "Module 1: Legislation & Responsibilities | IPAF Mobile Scaffold",
    description: "Work at Height Regulations 2005, HSWA 1974, CDM 2015, BS EN 1004, and PASMA competence requirements for mobile access tower work.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../ipaf-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to IPAF Course
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Module Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
              <span className="text-elec-yellow text-xs font-semibold">MODULE 1</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Legislation & Responsibilities
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Legal duties, key regulations, standards, and competence requirements for mobile access tower work
            </p>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../ipaf-module-1-section-${section.id}`}
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
