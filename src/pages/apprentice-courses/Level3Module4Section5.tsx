import { ArrowLeft, Wrench, CheckCircle, FileText, TestTube, Shield, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "5.1",
    title: "Selecting Correct Repair Methods",
    description: "Choosing appropriate repair techniques: replacement, re-termination, re-insulation",
    icon: Wrench,
    href: "../level3-module4-section5-1",
  },
  {
    number: "5.2",
    title: "Ensuring Compliance with BS7671 After Repair",
    description: "Maintaining regulatory compliance during and after rectification work",
    icon: CheckCircle,
    href: "../level3-module4-section5-2",
  },
  {
    number: "5.3",
    title: "Recording Remedial Works",
    description: "Proper documentation and recording of all remedial work undertaken",
    icon: FileText,
    href: "../level3-module4-section5-3",
  },
  {
    number: "5.4",
    title: "Re-testing and Certification",
    description: "Post-repair testing procedures and certification requirements",
    icon: TestTube,
    href: "../level3-module4-section5-4",
  },
  {
    number: "5.5",
    title: "Preventative Maintenance Strategies",
    description: "Implementing maintenance strategies to prevent future faults",
    icon: Shield,
    href: "../level3-module4-section5-5",
  },
];

const Level3Module4Section5 = () => {
  useSEO(
    "Section 5: Rectification and Verification - Level 3 Module 4",
    "Repair methods, BS7671 compliance, recording works and preventative maintenance"
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
            <Link to="/study-centre/apprentice/level3-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
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
            <span>Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Rectification and Verification
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Learn proper rectification methods, compliance verification and documentation for electrical fault repairs
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers rectification and verification including repair methods,
              BS7671 compliance, recording remedial works, re-testing and certification,
              and preventative maintenance strategies.
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

export default Level3Module4Section5;
