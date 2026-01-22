import { ArrowLeft, Link2, Shield, RotateCcw, Target, TestTube, Power, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "3.1",
    title: "Continuity of Protective Conductors and Ring Circuits",
    description: "Testing procedures for protective conductor continuity and ring circuit integrity",
    icon: Link2,
    href: "../level3-module5-section3-1",
  },
  {
    number: "3.2",
    title: "Insulation Resistance Testing",
    description: "Comprehensive insulation resistance testing procedures and acceptance criteria",
    icon: Shield,
    href: "../level3-module5-section3-2",
  },
  {
    number: "3.3",
    title: "Polarity Testing",
    description: "Verification of correct polarity in electrical circuits and installations",
    icon: RotateCcw,
    href: "../level3-module5-section3-3",
  },
  {
    number: "3.4",
    title: "Earth Fault Loop Impedance Testing",
    description: "Testing earth fault loop impedance to verify protective device effectiveness",
    icon: Target,
    href: "../level3-module5-section3-4",
  },
  {
    number: "3.5",
    title: "RCD and RCBO Testing",
    description: "Testing procedures for residual current devices and RCBOs",
    icon: TestTube,
    href: "../level3-module5-section3-5",
  },
  {
    number: "3.6",
    title: "Prospective Fault Current and Verification of Protective Devices",
    description: "Testing prospective fault current and verifying protective device coordination",
    icon: Power,
    href: "../level3-module5-section3-6",
  },
];

const Level3Module5Section3 = () => {
  useSEO(
    "Section 3: Testing Procedures - Level 3 Module 5",
    "Comprehensive testing procedures for electrical installations including continuity, insulation and RCD testing"
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 gap-4">
            {subsections.map((subsection, index) => (
              <ModuleCard
                key={index}
                number={subsection.number}
                title={subsection.title}
                description={subsection.description}
                icon={subsection.icon}
                href={subsection.href}
              />
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module5Section3;
