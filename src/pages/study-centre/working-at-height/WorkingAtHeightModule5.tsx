import {
  ArrowLeft,
  Siren,
  ClipboardList,
  Users,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Emergency Procedures & Rescue",
    icon: Siren,
    description:
      "Suspension trauma, immediate rescue priority, first aid for falls, spinal protocol, and post-rescue positioning",
  },
  {
    id: 2,
    title: "Incident Reporting & Investigation",
    icon: ClipboardList,
    description:
      "RIDDOR requirements, investigation process, root cause analysis, and near-miss reporting culture",
  },
  {
    id: 3,
    title: "Roles, Responsibilities & Competence",
    icon: Users,
    description:
      "Employer, employee, contractor, and client duties under CDM 2015, competent person definition, and training",
  },
  {
    id: 4,
    title: "Inspection Regimes & Record Keeping",
    icon: CalendarDays,
    description:
      "Pre-use checks, 7-day scaffold inspections, LOLER 6-monthly, record keeping, and legal retention periods",
  },
];

export default function WorkingAtHeightModule5() {
  useSEO({
    title: "Module 5: Incident Response & Responsibilities | Working at Height",
    description:
      "Emergency procedures, incident reporting, roles and responsibilities, and inspection regimes for working at height.",
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
              <Link to="../working-at-height-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Working at Height
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
              <span className="text-amber-400 text-xs font-semibold">
                MODULE 5
              </span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Incident Response & Responsibilities
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Emergency procedures, incident reporting, roles and
              responsibilities, and inspection regimes for working at height
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../working-at-height-module-5-section-${section.id}`}
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
