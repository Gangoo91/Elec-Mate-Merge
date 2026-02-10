import { ArrowLeft, FileText, ClipboardList, FolderOpen, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Pre-Construction Information",
    icon: FileText,
    description:
      "What pre-construction information is, who must provide it, what it should contain, and how it informs the design and planning of the construction phase",
  },
  {
    id: 2,
    title: "Construction Phase Plan",
    icon: ClipboardList,
    description:
      "The construction phase plan requirements, who produces it, when it must be in place, and the essential content including site rules, emergency procedures, and risk management arrangements",
  },
  {
    id: 3,
    title: "Health & Safety File",
    icon: FolderOpen,
    description:
      "The purpose of the health and safety file, what information it should contain, who is responsible for preparing and maintaining it, and how it is used during the life of the structure",
  },
  {
    id: 4,
    title: "Notification to HSE (F10)",
    icon: Send,
    description:
      "When a project must be notified to the Health and Safety Executive, the F10 notification process, required information, and the thresholds that trigger notification",
  },
];

export default function CdmRegulationsModule3() {
  useSEO({
    title: "Module 3: Pre-Construction & Planning | CDM Regulations Awareness",
    description:
      "Learn about pre-construction information, construction phase plans, health and safety files, and HSE notification requirements under CDM 2015.",
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
              <Link to="../cdm-regulations-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to CDM Regulations
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
              <span className="text-blue-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Pre-Construction & Planning
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand the key documentation and planning requirements under CDM 2015: pre-construction
              information, the construction phase plan, the health and safety file, and when and how to
              notify the HSE using the F10 form.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cdm-regulations-module-3-section-${section.id}`}
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
