import { ArrowLeft, Package, Wrench, Shield, Layers, Cog } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Purpose of Containment in Electrical Installations",
    description: "Understanding why containment systems are essential",
    icon: Package,
    href: "2-1"
  },
  {
    number: "Subsection 2", 
    title: "PVC and Metal Conduit (Surface/Recessed)",
    description: "Types of conduit systems and installation methods",
    icon: Wrench,
    href: "2-2"
  },
  {
    number: "Subsection 3",
    title: "Plastic and Steel Trunking Systems",
    description: "Trunking systems for cable containment and protection",
    icon: Shield,
    href: "2-3"
  },
  {
    number: "Subsection 4",
    title: "Cable Tray, Basket, and Ladder Systems",
    description: "Open containment systems for larger installations",
    icon: Layers,
    href: "2-4"
  },
  {
    number: "Subsection 5",
    title: "Underfloor Trunking and Dado Trunking",
    description: "Specialised trunking systems for concealed installations",
    icon: Cog,
    href: "2-5"
  },
  {
    number: "Subsection 6",
    title: "Fixings, Clips, and Cable Ties",
    description: "Hardware for securing containment and cables",
    icon: Package,
    href: "2-6"
  },
  {
    number: "Subsection 7",
    title: "Good Practice for Installing Containment",
    description: "Best practices and techniques for containment installation",
    icon: Wrench,
    href: "2-7"
  }
];

const Section2 = () => {
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
            Section 2: Cable Containment Systems
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Methods and systems for containing, protecting and supporting electrical cables
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

export default Section2;