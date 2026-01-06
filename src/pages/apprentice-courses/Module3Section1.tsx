import { ArrowLeft, Cable, FileText, Zap, Shield, Package } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Overview of Common Wiring Systems",
    description: "Introduction to different types of electrical wiring systems",
    icon: Cable,
    href: "1-1"
  },
  {
    number: "Subsection 2", 
    title: "Twin and Earth (Flat PVC Sheathed Cable)",
    description: "Understanding twin and earth cable construction and applications",
    icon: FileText,
    href: "1-2"
  },
  {
    number: "Subsection 3",
    title: "Singles in Conduit or Trunking",
    description: "Single core cables used in containment systems",
    icon: Zap,
    href: "1-3"
  },
  {
    number: "Subsection 4",
    title: "Steel Wire Armoured (SWA) Cables",
    description: "Construction and applications of SWA cables",
    icon: Shield,
    href: "1-4"
  },
  {
    number: "Subsection 5",
    title: "Flexible Cords and Flex Outlets",
    description: "Flexible cables and their connection points",
    icon: Package,
    href: "1-5"
  },
  {
    number: "Subsection 6",
    title: "Data, Signal, and Low Voltage Cabling (Basic Awareness)",
    description: "Introduction to data and low voltage cable systems",
    icon: Cable,
    href: "1-6"
  },
  {
    number: "Subsection 7",
    title: "Selecting Cables Based on Application and Environment",
    description: "Criteria for choosing appropriate cables for different installations",
    icon: FileText,
    href: "1-7"
  }
];

const Section1 = () => {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 1: Types of Wiring Systems and Cable Types
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Overview of different wiring systems, cable classifications and their applications
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

export default Section1;