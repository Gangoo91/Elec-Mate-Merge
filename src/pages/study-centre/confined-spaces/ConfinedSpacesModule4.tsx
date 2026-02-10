import { ArrowLeft, CheckCircle, Shield, Wrench, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Pre-Entry Procedures",
    icon: CheckCircle,
    description:
      "Mechanical, electrical, and piping isolation techniques, purging the atmosphere, pre-entry atmospheric testing, and issuing the entry permit",
  },
  {
    id: 2,
    title: "Personal Protective Equipment",
    icon: Shield,
    description:
      "Selecting between breathing apparatus and respiratory protective equipment, harnesses and lanyards, tripod rescue systems, communication equipment, and lighting",
  },
  {
    id: 3,
    title: "Working Inside Confined Spaces",
    icon: Wrench,
    description:
      "Communication systems between entrant and top person, top-person duties and responsibilities, time limits, personnel rotation, and continuous atmospheric monitoring",
  },
  {
    id: 4,
    title: "Electrical Work in Confined Spaces",
    icon: Zap,
    description:
      "Reduced voltage requirements at 110V, 25V, and 12V, residual current devices, battery-powered tools, hot work permit requirements, and safe cable routing",
  },
];

export default function ConfinedSpacesModule4() {
  useSEO({
    title: "Module 4: Safe Entry & Working Procedures | Confined Spaces Awareness",
    description:
      "Learn pre-entry procedures, PPE selection, safe working practices inside confined spaces, and the special requirements for electrical work.",
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
              <Link to="../confined-spaces-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Confined Spaces
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
              <span className="text-cyan-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Safe Entry & Working Procedures
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Master every step of safe confined-space entry from isolation and purging through to
              working inside, selecting the right PPE, and meeting the special electrical
              requirements that apply in enclosed environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../confined-spaces-module-4-section-${section.id}`}
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
