import { ArrowLeft, HardHat, FileText, Wrench, Package, CheckCircle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Reading Installation Drawings and Specifications",
    description: "Understanding technical drawings and installation specifications",
    icon: HardHat,
    href: "1-1"
  },
  {
    number: "Subsection 2", 
    title: "Identifying Cable Routes and Fixing Points",
    description: "Planning cable routing and identifying fixing positions",
    icon: FileText,
    href: "1-2"
  },
  {
    number: "Subsection 3",
    title: "Selecting Materials, Tools, and PPE",
    description: "Choosing appropriate materials, tools and personal protective equipment",
    icon: Wrench,
    href: "1-3"
  },
  {
    number: "Subsection 4",
    title: "Planning Workflow and Sequencing Tasks",
    description: "Organising work sequence for efficient installation",
    icon: Package,
    href: "1-4"
  },
  {
    number: "Subsection 5",
    title: "Preparing the Work Area (Access, Safety, Lighting)",
    description: "Setting up safe and accessible working conditions",
    icon: CheckCircle,
    href: "1-5"
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
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 1: Preparing to Install Wiring Systems
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Planning and preparation for electrical installation work
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