import { ArrowLeft, FileCheck, TestTube, Zap, Settings, FileText, AlertTriangle } from "lucide-react";
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

const Level3Module5 = () => {
  useSEO(
    "Level 3 Module 5 - Inspection, Testing & Commissioning",
    "Master electrical inspection, testing and commissioning procedures for compliance with BS7671"
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Module 5 - Inspection, Testing & Commissioning
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Master the principles and practices of electrical inspection, testing and commissioning to ensure installations comply with BS7671 and operate safely
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};

export default Level3Module5;