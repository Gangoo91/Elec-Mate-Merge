import { ArrowLeft, Cloud, Thermometer, Droplets, Sun, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Understanding External Influences (BS 7671 Overview)",
    description: "Introduction to external influences in electrical installations",
    icon: Cloud,
    href: "5-1"
  },
  {
    number: "Subsection 2", 
    title: "IP Ratings and Water/Dust Protection",
    description: "Ingress protection ratings and their applications",
    icon: Thermometer,
    href: "5-2"
  },
  {
    number: "Subsection 3",
    title: "UV, Temperature, and Mechanical Damage Risks",
    description: "Environmental factors that can damage electrical installations",
    icon: Droplets,
    href: "5-3"
  },
  {
    number: "Subsection 4",
    title: "Selecting Materials for Corrosive or Damp Areas",
    description: "Choosing appropriate materials for harsh environments",
    icon: Sun,
    href: "5-4"
  },
  {
    number: "Subsection 5",
    title: "Working in Special Locations (Bathrooms, Outdoors – Basic Awareness)",
    description: "Basic considerations for special location installations",
    icon: Shield,
    href: "5-5"
  }
];

const Section5 = () => {
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
            Section 5: Environmental Considerations and External Influences
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Environmental factors affecting electrical installations and protective measures
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

export default Section5;