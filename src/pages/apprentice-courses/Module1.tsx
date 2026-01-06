import { ArrowLeft, Scale, AlertTriangle, FileCheck, Shield, Power, Phone } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "UK Health & Safety Legislation",
    description: "Overview of key health and safety laws and regulations governing electrical work",
    icon: Scale,
    href: "section1"
  },
  {
    number: "Section 2",
    title: "Common Electrical Hazards",
    description: "Identification and understanding of typical electrical risks and dangers in the workplace",
    icon: AlertTriangle,
    href: "section2"
  },
  {
    number: "Section 3",
    title: "Risk Assessment and Method Statements (RAMS)",
    description: "Planning and documenting safe working procedures for electrical installations",
    icon: FileCheck,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "Personal Protective Equipment (PPE) and Safe Working Practices",
    description: "Selection, use and maintenance of protective equipment and safe working methods",
    icon: Shield,
    href: "section4"
  },
  {
    number: "Section 5",
    title: "Safe Isolation Procedures",
    description: "Step-by-step procedures for safely isolating electrical circuits before work",
    icon: Power,
    href: "section5"
  },
  {
    number: "Section 6",
    title: "Accidents, Reporting and Emergency Response",
    description: "Procedures for dealing with electrical accidents and emergency situations",
    icon: Phone,
    href: "section6"
  },
];

const Module1 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/80 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Module 1: Health and Safety in Building Services Engineering
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-3xl">
            Essential health and safety practices for electrical work environments
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
              comingSoon={section.comingSoon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module1;