import { ArrowLeft, ShieldCheck, FileText, HardHat, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Risk Assessment & Method Statements",
    icon: ShieldCheck,
    description:
      "The 5-step risk assessment process, RAMS preparation, hierarchy of controls, and dynamic risk assessment on site",
  },
  {
    id: 2,
    title: "Personal Protective Equipment",
    icon: FileText,
    description:
      "PPE types, selection, fitting, maintenance, storage, and employer/employee duties under the PPE Regulations 2022",
  },
  {
    id: 3,
    title: "Workplace Welfare & Site Safety",
    icon: HardHat,
    description:
      "Welfare facilities, site inductions, housekeeping, traffic management, and safety signage requirements",
  },
  {
    id: 4,
    title: "Accident Reporting & RIDDOR",
    icon: AlertTriangle,
    description:
      "Accident books, RIDDOR reporting requirements, near-miss reporting, and investigation procedures",
  },
];

export default function CscsCardModule2() {
  useSEO({
    title: "Module 2: General Health & Safety | CSCS Card Preparation",
    description:
      "Learn about risk assessment, PPE, workplace welfare, accident reporting, and RIDDOR requirements for the CSCS HS&E test.",
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
              <Link to="../cscs-card-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to CSCS Card Preparation
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3">
              <span className="text-green-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              General Health &amp; Safety
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand risk assessment processes, personal protective equipment requirements,
              workplace welfare standards, and accident reporting obligations including RIDDOR.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cscs-card-module-2-section-${section.id}`}
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
