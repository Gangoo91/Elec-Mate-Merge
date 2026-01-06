import { ArrowLeft, Package, FileText, Lightbulb, MapPin, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Estimating Materials from Drawings or Site Walkthroughs",
    description: "Calculating material requirements from plans and site visits",
    icon: Package,
    href: "4-1"
  },
  {
    number: "Subsection 2", 
    title: "Ordering Materials and Managing Deliveries",
    description: "Procurement and delivery coordination for electrical materials",
    icon: FileText,
    href: "4-2"
  },
  {
    number: "Subsection 3",
    title: "Tool Selection and Availability",
    description: "Choosing and ensuring availability of required tools",
    icon: Lightbulb,
    href: "4-3"
  },
  {
    number: "Subsection 4",
    title: "Managing Wastage and Shortages",
    description: "Controlling material waste and dealing with shortages",
    icon: MapPin,
    href: "4-4"
  },
  {
    number: "Subsection 5",
    title: "Coordinating Equipment with Team Requirements",
    description: "Managing equipment needs across the installation team",
    icon: Users,
    href: "4-5"
  }
];

const Section4 = () => {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 4: Materials, Tools, and Resource Planning
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Planning and managing resources for electrical installations
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

export default Section4;