import { ArrowLeft, Power, Settings, CheckCircle, Users, FileText } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "4.1",
    title: "Safe Energisation of Circuits",
    description: "Safe procedures for energising electrical circuits during commissioning",
    icon: Power,
    href: "../level3-module5-section4-4-1",
  },
  {
    number: "4.2", 
    title: "Functional Testing of Equipment and Systems",
    description: "Testing the operational functionality of electrical equipment and systems",
    icon: Settings,
    href: "../level3-module5-section4-4-2",
  },
  {
    number: "4.3",
    title: "Confirming Compliance with Design Specification",
    description: "Verifying that installations meet the original design specifications",
    icon: CheckCircle,
    href: "../level3-module5-section4-4-3",
  },
  {
    number: "4.4",
    title: "Client Handover and Demonstration of Systems",
    description: "Procedures for client handover and demonstration of installed systems",
    icon: Users,
    href: "../level3-module5-section4-4-4",
  },
  {
    number: "4.5",
    title: "Producing Commissioning Reports",
    description: "Creating comprehensive commissioning reports and documentation",
    icon: FileText,
    href: "../level3-module5-section4-4-5",
  },
];

const Level3Module5Section4 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 4 - Commissioning of Installations
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Safe energisation, functional testing and commissioning procedures for electrical installations
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

export default Level3Module5Section4;