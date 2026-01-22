import { ArrowLeft, FileCheck, TestTube, Zap, Settings, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "Principles of Inspection and Testing",
    description: "Understanding the fundamental principles, requirements and procedures for electrical inspection and testing",
    icon: FileCheck,
    href: "../level3-module5-section1",
  },
  {
    number: "Section 2",
    title: "Inspection Procedures",
    description: "Detailed visual inspection procedures for electrical installations and systems",
    icon: TestTube,
    href: "../level3-module5-section2",
  },
  {
    number: "Section 3",
    title: "Testing Procedures",
    description: "Comprehensive testing procedures for electrical installations including continuity, insulation and RCD testing",
    icon: Zap,
    href: "../level3-module5-section3",
  },
  {
    number: "Section 4",
    title: "Commissioning of Installations",
    description: "Safe energisation, functional testing and commissioning procedures for electrical installations",
    icon: Settings,
    href: "../level3-module5-section4",
  },
  {
    number: "Section 5",
    title: "Certification and Reporting",
    description: "Certification requirements, documentation and legal responsibilities for electrical work",
    icon: FileText,
    href: "../level3-module5-section5",
  },
  {
    number: "Section 6",
    title: "Faults Found During Testing",
    description: "Procedures for dealing with faults discovered during testing and inspection",
    icon: AlertTriangle,
    href: "../level3-module5-section6",
  },
];

const learningOutcomes = [
  "Understand the principles and requirements for electrical inspection and testing",
  "Conduct thorough visual inspections of electrical installations",
  "Perform comprehensive testing procedures to BS7671 standards",
  "Commission electrical installations safely and effectively",
  "Complete certification and documentation requirements correctly",
  "Identify and address faults discovered during testing",
];

const Level3Module5 = () => {
  useSEO(
    "Module 5: Inspection, Testing & Commissioning - Level 3 Electrical Course",
    "Master electrical inspection, testing and commissioning procedures for compliance with BS7671"
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
            <Link to="/study-centre/apprentice/level3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

        

        {/* Sections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Module Sections</h2>
          <div className="grid grid-cols-1 gap-4">
            {sections.map((section, index) => (
              <ModuleCard
                key={index}
                number={section.number}
                title={section.title}
                description={section.description}
                icon={section.icon}
                href={section.href}
              />
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module5;
