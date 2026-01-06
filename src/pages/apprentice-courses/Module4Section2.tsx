import { ArrowLeft, Ruler, FileText, Wrench, Package, CheckCircle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Using Measurement Tools and Marking Equipment",
    description: "Proper use of measuring and marking tools for accuracy",
    icon: Ruler,
    href: "2-1"
  },
  {
    number: "Subsection 2", 
    title: "Setting Out for Conduit, Trunking, and Accessories",
    description: "Layout techniques for containment systems and accessories",
    icon: FileText,
    href: "2-2"
  },
  {
    number: "Subsection 3",
    title: "Following Dimensions, Levels, and Tolerances",
    description: "Working to specified dimensions and tolerances",
    icon: Wrench,
    href: "2-3"
  },
  {
    number: "Subsection 4",
    title: "Avoiding Common Errors in Measurement and Positioning",
    description: "Preventing typical measurement and positioning mistakes",
    icon: Package,
    href: "2-4"
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
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 2: Measuring, Marking, and Setting Out
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Accurate measurement and marking techniques for installations
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