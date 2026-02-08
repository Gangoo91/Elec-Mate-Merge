import { ArrowLeft, Scale, BookOpen, FileText, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Work at Height Regs & HSWA 1974",
    icon: Scale,
    description: "WAHR 2005 hierarchy of control, HSWA Sections 2/3/7/8, Schedule 5 inspection requirements",
  },
  {
    id: 2,
    title: "EN 1004:2020 & BS 1139-6",
    icon: BookOpen,
    description: "EN 1004:2020 changes, load classes 2 & 3, max heights, BS 1139-6 scope, compliance marking",
  },
  {
    id: 3,
    title: "PASMA Code of Practice",
    icon: FileText,
    description: "What PASMA is, Code of Practice scope, course types, digital certification, card validity",
  },
  {
    id: 4,
    title: "CDM 2015 & Duty Holders",
    icon: Award,
    description: "5 CDM duty holders, construction phase plan, pre-construction information, practical scenarios",
  },
];

export default function PasmaModule1() {
  useSEO({
    title: "Module 1: Legislation & PASMA Standards | PASMA Towers for Users",
    description: "Work at Height Regulations 2005, HSWA 1974, EN 1004:2020, PASMA Code of Practice, and CDM 2015 duty holders for mobile tower scaffold work.",
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
              <Link to="../pasma-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to PASMA Course
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
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Legislation & PASMA Standards
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Key legislation, European and British standards, the PASMA Code of Practice, and CDM 2015 duty holder responsibilities
            </p>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../pasma-module-1-section-${section.id}`}
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
