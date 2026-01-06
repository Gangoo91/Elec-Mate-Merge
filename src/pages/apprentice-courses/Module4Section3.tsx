import { ArrowLeft, Wrench, FileText, Package, CheckCircle, Ruler } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Types of Bends and When to Use Them",
    description: "Different bend types and their applications",
    icon: Wrench,
    href: "3-1"
  },
  {
    number: "Subsection 2", 
    title: "Using Conduit Bending Machines (PVC and Metal)",
    description: "Operating bending machines for different conduit types",
    icon: FileText,
    href: "3-2"
  },
  {
    number: "Subsection 3",
    title: "Manual Bending Tools and Techniques",
    description: "Hand bending methods and tool usage",
    icon: Package,
    href: "3-3"
  },
  {
    number: "Subsection 4",
    title: "Cutting, Deburring, and Preparing Conduit Ends",
    description: "Proper preparation of conduit ends for installation",
    icon: CheckCircle,
    href: "3-4"
  },
  {
    number: "Subsection 5",
    title: "Common Bending Faults and How to Correct Them",
    description: "Identifying and fixing common bending problems",
    icon: Ruler,
    href: "3-5"
  }
];

const Section3 = () => {
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
            Section 3: Bending and Forming Conduit and Trunking
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Techniques for bending and shaping containment systems
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

export default Section3;