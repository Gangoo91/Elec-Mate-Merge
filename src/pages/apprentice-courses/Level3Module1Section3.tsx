import { ArrowLeft, PowerOff, Lock, AlertTriangle, Zap, TestTube, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "3.1",
    title: "Safe isolation procedures (tools, proving dead, test instruments)",
    description: "Step-by-step procedures for safely isolating electrical systems and proving dead",
    icon: PowerOff,
    href: "../level3-module1-section3-1",
  },
  {
    number: "3.2",
    title: "Lock-off and tagging methods",
    description: "Physical isolation techniques and identification systems for electrical safety",
    icon: Lock,
    href: "../level3-module1-section3-2",
  },
  {
    number: "3.3",
    title: "Live working restrictions & when it is permitted",
    description: "Legal requirements and circumstances for working on live electrical systems",
    icon: AlertTriangle,
    href: "../level3-module1-section3-3",
  },
  {
    number: "3.4",
    title: "Earthing & bonding in temporary works",
    description: "Temporary earthing and bonding arrangements for safe electrical work",
    icon: Zap,
    href: "../level3-module1-section3-4",
  },
  {
    number: "3.5",
    title: "Electrical test equipment safety requirements (GS38 standards)",
    description: "Safety standards and requirements for electrical test equipment and probes",
    icon: TestTube,
    href: "../level3-module1-section3-5",
  },
  {
    number: "3.6",
    title: "Residual current devices (RCDs) and protection systems in practice",
    description: "Application and testing of RCD protection in workplace electrical systems",
    icon: Shield,
    href: "../level3-module1-section3-6",
  },
];

const Level3Module1Section3 = () => {
  useSEO(
    "Section 3: Electrical Safety in the Workplace - Level 3 Module 1",
    "Workplace electrical safety protocols, procedures and emergency response"
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
            <Link to="/study-centre/apprentice/level3-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Safety in the Workplace
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Workplace electrical safety protocols, procedures and emergency response
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers essential electrical safety procedures including safe isolation techniques,
              lock-off and tagging methods, restrictions on live working, temporary earthing and bonding,
              GS38 test equipment standards, and the practical application of RCD protection systems.
            </p>
          </div>
        </section>

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

export default Level3Module1Section3;
