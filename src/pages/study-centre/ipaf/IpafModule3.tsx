import { ArrowLeft, Wrench, ClipboardList, Layers, ArrowDownToLine, HardHat } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Planning & Preparation",
    icon: ClipboardList,
    description: "Site survey requirements, ground assessment, overhead hazards, exclusion zones, and PPE requirements",
  },
  {
    id: 2,
    title: "3T Method (Through The Trap)",
    icon: Layers,
    description: "Step-by-step 3T assembly sequence, safe climbing positions, and guardrail installation from protected positions",
  },
  {
    id: 3,
    title: "AGR Method (Advance Guard Rail)",
    icon: HardHat,
    description: "How AGR frames work, automatic guardrails, advantages over 3T, and step-by-step AGR assembly sequence",
  },
  {
    id: 4,
    title: "Dismantling & Safe Lowering",
    icon: ArrowDownToLine,
    description: "Reverse sequence dismantling, safe lowering of components, minimum crew requirements, and site clearance",
  },
];

export default function IpafModule3() {
  useSEO({
    title: "Module 3: Assembly & Dismantling | IPAF Mobile Scaffold",
    description: "3T and AGR assembly methods, planning, preparation, and safe dismantling procedures for mobile access towers.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../ipaf-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to IPAF Course
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Module Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
              <span className="text-elec-yellow text-xs font-semibold">MODULE 3</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">40 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Assembly & Dismantling
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              3T and AGR assembly methods, planning, preparation, and safe dismantling procedures for mobile access towers
            </p>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../ipaf-module-3-section-${section.id}`}
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
