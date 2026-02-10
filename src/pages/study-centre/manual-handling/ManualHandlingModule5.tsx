import { ArrowLeft, HeartPulse, Activity, ClipboardList, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Musculoskeletal Disorders",
    icon: HeartPulse,
    description:
      "Types of MSDs, symptoms, early reporting, treatment, and return-to-work programmes",
  },
  {
    id: 2,
    title: "Fitness, Fatigue & Personal Factors",
    icon: Activity,
    description:
      "Physical fitness, age considerations, pregnancy, medication, and fatigue management",
  },
  {
    id: 3,
    title: "Incident Reporting & Investigation",
    icon: ClipboardList,
    description:
      "RIDDOR requirements for manual handling injuries, investigation process, and corrective actions",
  },
  {
    id: 4,
    title: "Roles, Responsibilities & Training",
    icon: GraduationCap,
    description:
      "Employer and employee duties, competent person, training requirements, and refresher schedules",
  },
];

export default function ManualHandlingModule5() {
  useSEO({
    title: "Module 5: Health, Welfare & Responsibilities | Manual Handling",
    description:
      "Musculoskeletal disorders, fitness and fatigue, RIDDOR reporting, and employer/employee roles and training requirements.",
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
                MODULE 5
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Health, Welfare & Responsibilities
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Musculoskeletal disorders, fitness and fatigue, RIDDOR reporting,
              and employer/employee roles and training requirements
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../manual-handling-module-5-section-${section.id}`}
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
