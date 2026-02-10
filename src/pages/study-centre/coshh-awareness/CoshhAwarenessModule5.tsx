import { ArrowLeft, Activity, Stethoscope, Siren, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Workplace Monitoring",
    icon: Activity,
    description: "Air monitoring techniques, surface sampling, biological monitoring, and interpreting results against WELs",
  },
  {
    id: 2,
    title: "Health Surveillance",
    icon: Stethoscope,
    description: "When health surveillance is required, types of surveillance, medical questionnaires, and record-keeping obligations",
  },
  {
    id: 3,
    title: "Emergency Procedures",
    icon: Siren,
    description: "Spill and leak response, first aid for chemical exposure, decontamination procedures, and emergency planning",
  },
  {
    id: 4,
    title: "Training, Record Keeping & Review",
    icon: BookOpen,
    description: "COSHH training requirements, assessment review cycles, documentation standards, and continuous improvement",
  },
];

export default function CoshhAwarenessModule5() {
  useSEO({
    title: "Module 5: Monitoring, Surveillance & Emergencies | COSHH Awareness",
    description: "Learn about workplace monitoring, health surveillance programmes, emergency procedures for chemical incidents, and COSHH training and record-keeping requirements.",
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
              <span className="text-violet-400 text-xs font-semibold">MODULE 5</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Monitoring, Surveillance & Emergencies
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              How to monitor workplace exposure, when health surveillance is needed, how to respond to chemical emergencies, and the training and record-keeping duties under COSHH
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../coshh-awareness-module-5-section-${section.id}`}
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
