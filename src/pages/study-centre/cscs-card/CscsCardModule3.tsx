import { ArrowLeft, ArrowUpFromLine, Wrench, PackageOpen, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Working at Height Regulations",
    icon: ArrowUpFromLine,
    description:
      "The Work at Height Regulations 2005, hierarchy of controls, duty holders, and when work at height applies",
  },
  {
    id: 2,
    title: "Access Equipment",
    icon: Wrench,
    description:
      "Ladders, stepladders, scaffolding, mobile towers, MEWPs, podium steps, and selection criteria for each",
  },
  {
    id: 3,
    title: "Manual Handling Assessment",
    icon: PackageOpen,
    description:
      "The Manual Handling Operations Regulations 1992, TILEO factors, ergonomic risk assessment, and reducing risk",
  },
  {
    id: 4,
    title: "Fall Protection & Safe Lifting",
    icon: Shield,
    description:
      "Guard rails, personal fall protection, fragile surfaces, safe lifting techniques, and team handling",
  },
];

export default function CscsCardModule3() {
  useSEO({
    title: "Module 3: Working at Height & Manual Handling | CSCS Card Preparation",
    description:
      "Learn about working at height regulations, access equipment, manual handling assessment, and fall protection for the CSCS HS&E test.",
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
              <span className="text-green-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Working at Height &amp; Manual Handling
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand the Work at Height Regulations, select appropriate access equipment,
              carry out manual handling assessments, and apply fall protection and safe lifting
              techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../cscs-card-module-3-section-${section.id}`}
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
