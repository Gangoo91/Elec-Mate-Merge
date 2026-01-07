import { ArrowLeft, FileCheck, BookOpen, List, Shield, FileText, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "1.1",
    title: "Purpose of Inspection and Testing",
    description: "Initial verification vs periodic inspection and their respective purposes",
    icon: FileCheck,
    href: "../level3-module5-section1-1",
  },
  {
    number: "1.2",
    title: "BS 7671 Requirements and Part 6",
    description: "Understanding the regulatory requirements for inspection and testing under BS7671",
    icon: BookOpen,
    href: "../level3-module5-section1-2",
  },
  {
    number: "1.3",
    title: "Sequence of Inspection and Testing (GN3 Guidance)",
    description: "Following the correct sequence for inspection and testing as outlined in Guidance Note 3",
    icon: List,
    href: "../level3-module5-section1-3",
  },
  {
    number: "1.4",
    title: "Safety Precautions and Risk Assessment Before Testing",
    description: "Essential safety procedures and risk assessments required before testing begins",
    icon: Shield,
    href: "../level3-module5-section1-4",
  },
  {
    number: "1.5",
    title: "Documentation and Certification Requirements",
    description: "Understanding the documentation and certification requirements for inspection and testing",
    icon: FileText,
    href: "../level3-module5-section1-5",
  },
];

const Level3Module5Section1 = () => {
  useSEO(
    "Section 1: Principles of Inspection and Testing - Level 3 Module 5",
    "Understanding the fundamental principles, requirements and procedures for electrical inspection and testing"
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principles of Inspection and Testing
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Understanding the fundamental principles, requirements and procedures for electrical inspection and testing
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers the principles of inspection and testing including purpose and types,
              BS7671 requirements, correct testing sequences, safety precautions,
              and documentation requirements.
            </p>
          </div>
        </section>

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
  );
};

export default Level3Module5Section1;
