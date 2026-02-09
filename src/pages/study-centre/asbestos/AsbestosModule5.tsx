import { ArrowLeft, Siren, ShieldAlert, Trash2, HeartPulse, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Accidental Disturbance Procedures",
    icon: ShieldAlert,
    description: "STOP, SEAL, SIGN, SUMMON — the 4-S emergency response, immediate actions, and incident recording",
  },
  {
    id: 2,
    title: "Decontamination & Waste Disposal",
    icon: Trash2,
    description: "Personal and area decontamination, double-bagging, consignment notes, and licensed waste carriers",
  },
  {
    id: 3,
    title: "Health Surveillance & Medical Monitoring",
    icon: HeartPulse,
    description: "Medical examinations, lung function tests, screening schedules, record keeping, and compensation",
  },
  {
    id: 4,
    title: "Roles, Responsibilities & Your Legal Duties",
    icon: Users,
    description: "Employer, employee, dutyholder, and HSE responsibilities, enforcement, and whistleblowing rights",
  },
];

export default function AsbestosModule5() {
  useSEO({
    title: "Module 5: Emergency Procedures & Responsibilities | Asbestos Awareness",
    description: "Accidental disturbance response, decontamination, waste disposal, health surveillance, and legal responsibilities for asbestos work.",
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
              <Link to="../asbestos-awareness-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Asbestos Awareness
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3">
              <span className="text-orange-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Emergency Procedures & Responsibilities
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              What to do if asbestos is disturbed, how to decontaminate, health monitoring, and your legal duties
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../asbestos-awareness-module-5-section-${section.id}`}
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
