import { ArrowLeft, Cog, Layers, Package, Wrench, CheckCircle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Surface vs Concealed Wiring Installations",
    description: "Differences between surface and concealed installation methods",
    icon: Cog,
    href: "4-1"
  },
  {
    number: "Subsection 2", 
    title: "First Fix and Second Fix Explained",
    description: "Understanding the stages of electrical installation work",
    icon: Layers,
    href: "4-2"
  },
  {
    number: "Subsection 3",
    title: "Terminating Cables: Sleeving, Ferrules, and Crimps",
    description: "Proper methods for cable termination and identification",
    icon: Package,
    href: "4-3"
  },
  {
    number: "Subsection 4",
    title: "Jointing and Glanding Techniques",
    description: "Methods for joining cables and cable entry techniques",
    icon: Wrench,
    href: "4-4"
  },
  {
    number: "Subsection 5",
    title: "Supporting and Securing Cables",
    description: "Techniques for properly supporting cable runs",
    icon: CheckCircle,
    href: "4-5"
  },
  {
    number: "Subsection 6",
    title: "Installing Accessories (Sockets, Switches, FCUs)",
    description: "Installation of common electrical accessories",
    icon: Cog,
    href: "4-6"
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
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 4: Installation Methods and Techniques
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Practical installation methods and techniques for electrical systems
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