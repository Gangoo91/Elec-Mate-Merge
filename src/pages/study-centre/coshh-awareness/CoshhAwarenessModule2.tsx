import { ArrowLeft, Scale, ClipboardCheck, FileText, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "The COSHH Regulations 2002",
    icon: Scale,
    description: "Legal framework, employer and employee duties, Approved Codes of Practice, and related health and safety legislation",
  },
  {
    id: 2,
    title: "COSHH Risk Assessment",
    icon: ClipboardCheck,
    description: "The 8-step assessment process, identifying hazards, evaluating exposure, and recording findings",
  },
  {
    id: 3,
    title: "Safety Data Sheets",
    icon: FileText,
    description: "The 16 SDS sections, GHS pictograms, hazard and precautionary statements, and how to interpret them",
  },
  {
    id: 4,
    title: "Workplace Exposure Limits",
    icon: Gauge,
    description: "WELs explained, EH40 guidance document, monitoring methods, and biological monitoring requirements",
  },
];

export default function CoshhAwarenessModule2() {
  useSEO({
    title: "Module 2: Legislation & Risk Assessment | COSHH Awareness",
    description: "Understand the COSHH Regulations 2002, how to carry out a COSHH risk assessment, read safety data sheets, and interpret workplace exposure limits.",
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
              <Link to="../coshh-awareness-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to COSHH Awareness
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3">
              <span className="text-violet-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Legislation & Risk Assessment
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              The legal framework behind COSHH, how to carry out and record risk assessments, read safety data sheets, and understand workplace exposure limits
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../coshh-awareness-module-2-section-${section.id}`}
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
