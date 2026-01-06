import { ArrowLeft, Building, Target, FileCheck, Award, MapPin } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "1.1",
    title: "Building Regulations Part L (conservation of fuel and power)",
    description: "Legal requirements for energy conservation and fuel efficiency in building design",
    icon: Building,
    href: "../level3-module2-section1-1",
  },
  {
    number: "1.2", 
    title: "UK Net Zero targets & impact on electrical work",
    description: "Government net zero commitments and their implications for electrical installations",
    icon: Target,
    href: "../level3-module2-section1-2",
  },
  {
    number: "1.3",
    title: "BS7671 sustainability considerations", 
    description: "IET Wiring Regulations requirements for sustainable electrical installations",
    icon: FileCheck,
    href: "../level3-module2-section1-3",
  },
  {
    number: "1.4",
    title: "Energy Performance Certificates (EPCs) and compliance",
    description: "Understanding EPCs and their role in building energy efficiency compliance",
    icon: Award,
    href: "../level3-module2-section1-4",
  },
  {
    number: "1.5",
    title: "Role of local authorities and planning permissions",
    description: "Local authority requirements and planning considerations for electrical installations",
    icon: MapPin,
    href: "../level3-module2-section1-5",
  },
];

const Level3Module2Section1 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 1: Environmental Legislation and Standards
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Environmental laws, regulations and standards affecting electrical installations
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

export default Level3Module2Section1;