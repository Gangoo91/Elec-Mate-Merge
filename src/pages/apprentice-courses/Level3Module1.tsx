import { ArrowLeft, FileText, ClipboardCheck, Shield, AlertTriangle, Settings, UserCheck } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Legislation and Regulations",
    description: "Key legislation, regulations and standards governing electrical work and building services",
    icon: FileText,
    href: "../level3-module1-section1",
  },
  {
    number: "Section 2", 
    title: "Risk Assessment and Method Statements",
    description: "Advanced risk assessment techniques and comprehensive method statement development",
    icon: ClipboardCheck,
    href: "../level3-module1-section2",
  },
  {
    number: "Section 3",
    title: "Electrical Safety in the Workplace", 
    description: "Workplace electrical safety protocols, procedures and emergency response",
    icon: Shield,
    href: "../level3-module1-section3",
  },
  {
    number: "Section 4",
    title: "Hazard Identification and Control",
    description: "Systematic hazard identification, evaluation and implementation of control measures",
    icon: AlertTriangle,
    href: "../level3-module1-section4",
  },
  {
    number: "Section 5",
    title: "Safety Management Systems",
    description: "Development and implementation of comprehensive safety management systems",
    icon: Settings,
    href: "../level3-module1-section5",
  },
  {
    number: "Section 6", 
    title: "Professional Responsibilities",
    description: "Ethical obligations, professional standards and duty of care in electrical work",
    icon: UserCheck,
    href: "../level3-module1-section6",
  },
];

const Level3Module1 = () => {
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
            Module 1: Health and Safety in Building Services Engineering
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Advanced health and safety practices for complex electrical work environments
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

export default Level3Module1;