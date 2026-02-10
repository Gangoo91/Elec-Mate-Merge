import { ArrowLeft, HardHat, GraduationCap, ShieldCheck, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Managing the Construction Phase",
    icon: HardHat,
    description:
      "How the principal contractor plans, manages, monitors, and coordinates the construction phase, including implementing the construction phase plan and managing subcontractors",
  },
  {
    id: 2,
    title: "Site Inductions & Competence",
    icon: GraduationCap,
    description:
      "Requirements for site-specific inductions, ensuring workers have the skills, knowledge, training, and experience to carry out their tasks safely, and the role of CSCS cards",
  },
  {
    id: 3,
    title: "Welfare Facilities",
    icon: ShieldCheck,
    description:
      "The minimum welfare facility requirements under Schedule 2 of CDM 2015 including sanitary conveniences, washing facilities, drinking water, rest facilities, and changing rooms",
  },
  {
    id: 4,
    title: "Monitoring, Review & Enforcement",
    icon: Scale,
    description:
      "How the HSE enforces CDM 2015, the powers of inspectors, improvement and prohibition notices, penalties for non-compliance, and the importance of ongoing monitoring and review",
  },
];

export default function CdmRegulationsModule5() {
  useSEO({
    title: "Module 5: Construction Phase & Compliance | CDM Regulations Awareness",
    description:
      "Learn about managing the construction phase, site inductions and competence, welfare facilities, and monitoring, review and enforcement under CDM 2015.",
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
              <span className="text-blue-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Construction Phase & Compliance
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand how to manage the construction phase safely, the requirements for site
              inductions and worker competence, minimum welfare facility standards, and how the HSE
              monitors, reviews, and enforces CDM 2015 compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cdm-regulations-module-5-section-${section.id}`}
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
