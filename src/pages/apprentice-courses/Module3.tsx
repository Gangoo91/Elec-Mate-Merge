import { ArrowLeft, Cable, Package, Wrench, Cog, Cloud, CheckCircle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Types of Wiring Systems and Cable Types",
    description: "Overview of different wiring systems, cable classifications and their applications",
    icon: Cable,
    href: "section1"
  },
  {
    number: "Section 2",
    title: "Cable Containment Systems",
    description: "Methods and systems for containing, protecting and supporting electrical cables",
    icon: Package,
    href: "section2"
  },
  {
    number: "Section 3",
    title: "Electrical Tools and Equipment",
    description: "Essential tools, equipment and testing instruments for electrical installation work",
    icon: Wrench,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "Installation Methods and Techniques",
    description: "Practical installation methods and techniques for electrical systems",
    icon: Cog,
    href: "section4"
  },
  {
    number: "Section 5",
    title: "Environmental Considerations and External Influences",
    description: "Environmental factors affecting electrical installations and protective measures",
    icon: Cloud,
    href: "section5"
  },
  {
    number: "Section 6",
    title: "Installation Standards and Best Practice",
    description: "Industry standards, regulations and best practice guidelines for electrical work",
    icon: CheckCircle,
    href: "section6"
  },
];

const Module3 = () => {
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
            Module 3: Electrical Installation Methods & Technology
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-3xl">
            Wiring systems, containment methods, tools and materials for electrical installations
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module3;