import { ArrowLeft, PowerOff, Lock, AlertTriangle, Zap, TestTube, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 3: Electrical Safety in the Workplace
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Workplace electrical safety protocols, procedures and emergency response
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};

export default Level3Module1Section3;