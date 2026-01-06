import { ArrowLeft, Target, BookOpen, Users, Shield, Leaf } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "1.1",
    title: "Purpose of Electrical System Design",
    description: "Understanding the fundamental purpose and objectives of electrical system design",
    icon: Target,
    href: "../level3-module6-section1-1",
  },
  {
    number: "1.2", 
    title: "Compliance with BS 7671 and Building Regulations",
    description: "Ensuring designs comply with BS7671 wiring regulations and relevant building regulations",
    icon: BookOpen,
    href: "../level3-module6-section1-2",
  },
  {
    number: "1.3",
    title: "Client Requirements and Design Specifications",
    description: "Understanding and interpreting client requirements to create appropriate design specifications",
    icon: Users,
    href: "../level3-module6-section1-3",
  },
  {
    number: "1.4",
    title: "Designing for Safety, Reliability, and Usability",
    description: "Incorporating safety, reliability and usability principles into electrical system design",
    icon: Shield,
    href: "../level3-module6-section1-4",
  },
  {
    number: "1.5",
    title: "Designing for Energy Efficiency and Sustainability",
    description: "Creating energy-efficient and sustainable electrical system designs",
    icon: Leaf,
    href: "../level3-module6-section1-5",
  },
];

const Level3Module6Section1 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 1 - Design Principles and Requirements
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Understanding fundamental design principles, compliance requirements and client specifications
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

export default Level3Module6Section1;