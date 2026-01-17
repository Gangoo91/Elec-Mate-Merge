import { ArrowLeft, Zap, Eye, Search, Shield, FileText } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "1.1",
    title: "Types of Faults",
    description: "Open circuit, short circuit, earth faults, high resistance and other common fault types",
    icon: Zap,
    href: "../level3-module4-section1-1",
  },
  {
    number: "1.2",
    title: "Symptoms and Fault Indicators",
    description: "Recognising signs of electrical faults and understanding fault indicators",
    icon: Eye,
    href: "../level3-module4-section1-2",
  },
  {
    number: "1.3",
    title: "Diagnostic Sequence and Logical Problem-Solving",
    description: "Systematic approach to fault diagnosis and logical troubleshooting methods",
    icon: Search,
    href: "../level3-module4-section1-3",
  },
  {
    number: "1.4",
    title: "Safety Considerations Before and During Fault Finding",
    description: "Safe working practices and risk assessment for fault diagnosis work",
    icon: Shield,
    href: "../level3-module4-section1-4",
  },
  {
    number: "1.5",
    title: "Documentation of Findings",
    description: "Recording fault diagnosis results and maintaining accurate documentation",
    icon: FileText,
    href: "../level3-module4-section1-5",
  },
];

const Level3Module4Section1 = () => {
  useSEO(
    "Section 1: Principles of Fault Diagnosis - Level 3 Module 4",
    "Types of faults, symptoms, diagnostic sequence, safety considerations and documentation"
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principles of Fault Diagnosis
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Learn the fundamental principles of electrical fault diagnosis, including fault types, symptoms, systematic approaches and safety considerations
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers the fundamental principles of fault diagnosis including types of faults,
              symptoms and indicators, diagnostic sequences, safety considerations,
              and proper documentation of findings.
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

export default Level3Module4Section1;
