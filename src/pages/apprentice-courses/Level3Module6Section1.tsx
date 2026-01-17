import { ArrowLeft, Target, BookOpen, Users, Shield, Leaf, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

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
  useSEO(
    "Section 1: Design Principles and Requirements - Level 3 Module 6",
    "Understanding fundamental design principles, compliance requirements and client specifications"
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
            <Link to="/study-centre/apprentice/level3-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
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
            Design Principles and Requirements
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Understanding fundamental design principles, compliance requirements and client specifications
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers design principles including purpose of design,
              BS7671 and Building Regulations compliance, client requirements,
              safety and reliability principles, and energy efficiency considerations.
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

export default Level3Module6Section1;
