import { ArrowLeft, CheckCircle, Settings, Calculator, Users, FileCheck, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "6.1",
    title: "Checking Compliance with BS 7671 Design Requirements",
    description: "Verifying design compliance with BS7671 wiring regulations",
    icon: CheckCircle,
    href: "../level3-module6-section6-1",
  },
  {
    number: "6.2",
    title: "Coordination of Protective Devices",
    description: "Ensuring proper coordination and selectivity of protective devices",
    icon: Settings,
    href: "../level3-module6-section6-2",
  },
  {
    number: "6.3",
    title: "Assessing Volt Drop, Fault Levels, and Disconnection Times",
    description: "Verifying voltage drop, fault current levels and protection disconnection times",
    icon: Calculator,
    href: "../level3-module6-section6-3",
  },
  {
    number: "6.4",
    title: "Peer Review of Design Work",
    description: "Conducting and participating in peer review processes for design verification",
    icon: Users,
    href: "../level3-module6-section6-4",
  },
  {
    number: "6.5",
    title: "Pre-installation Design Approval and Sign-off",
    description: "Obtaining necessary approvals and sign-offs before installation commences",
    icon: FileCheck,
    href: "../level3-module6-section6-5",
  },
];

const Level3Module6Section6 = () => {
  useSEO(
    "Section 6: Verification of Design - Level 3 Module 6",
    "Checking and verifying electrical system designs for compliance and performance"
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
            <Link to="/study-centre/apprentice/level3-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
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

export default Level3Module6Section6;
