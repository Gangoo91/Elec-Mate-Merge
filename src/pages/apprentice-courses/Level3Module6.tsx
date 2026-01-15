import { ArrowLeft, PenTool, Calculator, Settings, MapPin, FileText, CheckCircle, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "Design Principles and Requirements",
    description: "Understanding fundamental design principles, compliance requirements and client specifications",
    icon: PenTool,
    href: "../level3-module6-section1",
  },
  {
    number: "Section 2",
    title: "Circuit Design Calculations",
    description: "Essential calculations for circuit design including current ratings, cable sizing and protection",
    icon: Calculator,
    href: "../level3-module6-section2",
  },
  {
    number: "Section 3",
    title: "Selection of Protective Devices and Equipment",
    description: "Choosing appropriate protective devices, equipment and accessories for electrical installations",
    icon: Settings,
    href: "../level3-module6-section3",
  },
  {
    number: "Section 4",
    title: "Designing for Special Installations and Locations",
    description: "Design considerations for special locations and installations with specific requirements",
    icon: MapPin,
    href: "../level3-module6-section4",
  },
  {
    number: "Section 5",
    title: "System Documentation and Drawings",
    description: "Creating comprehensive design documentation, drawings and specifications",
    icon: FileText,
    href: "../level3-module6-section5",
  },
  {
    number: "Section 6",
    title: "Verification of Design",
    description: "Checking and verifying electrical system designs for compliance and performance",
    icon: CheckCircle,
    href: "../level3-module6-section6",
  },
];

const learningOutcomes = [
  "Understand fundamental electrical design principles and compliance requirements",
  "Perform circuit design calculations for cable sizing and protection",
  "Select appropriate protective devices and equipment for installations",
  "Design electrical systems for special locations and requirements",
  "Create comprehensive design documentation and drawings",
  "Verify electrical designs for compliance with BS7671",
];

const Level3Module6 = () => {
  useSEO(
    "Module 6: Electrical Systems Design - Level 3 Electrical Course",
    "Master electrical systems design principles, calculations and compliance with BS7671"
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
            <Link to="../level3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
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
            <span>Module 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Systems Design
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Master the principles and practices of electrical systems design from initial concepts through to final verification and approval
          </p>
        </header>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {learningOutcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

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

export default Level3Module6;
