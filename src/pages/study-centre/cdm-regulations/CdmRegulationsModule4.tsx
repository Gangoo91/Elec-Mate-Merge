import { ArrowLeft, PenTool, AlertTriangle, Wrench, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Designers' Duties",
    icon: PenTool,
    description:
      "The general principles of prevention as applied to design, the duty to eliminate hazards and reduce risks, and how designers must provide information about residual risks",
  },
  {
    id: 2,
    title: "Risk Assessment in Design",
    icon: AlertTriangle,
    description:
      "How to identify foreseeable risks at the design stage, the hierarchy of risk control in design decisions, and practical examples of designing out hazards on construction projects",
  },
  {
    id: 3,
    title: "Buildability & Maintainability",
    icon: Wrench,
    description:
      "Designing for safe construction, safe maintenance, safe cleaning, and eventual demolition, considering the whole lifecycle of the structure from build through to end of life",
  },
  {
    id: 4,
    title: "Coordination & Cooperation",
    icon: Handshake,
    description:
      "The duty on all duty holders to cooperate and coordinate their work, sharing information about risks and ensuring designs do not create hazards for other trades or future users",
  },
];

export default function CdmRegulationsModule4() {
  useSEO({
    title: "Module 4: Design & Risk Management | CDM Regulations Awareness",
    description:
      "Learn about designers' duties, risk assessment in design, buildability and maintainability, and coordination and cooperation under CDM 2015.",
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
              <span className="text-blue-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Design & Risk Management
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Explore how design decisions affect health and safety on construction projects. Learn
              about designers' legal duties, risk assessment at the design stage, designing for
              buildability and maintainability, and the importance of coordination between all parties.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cdm-regulations-module-4-section-${section.id}`}
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
