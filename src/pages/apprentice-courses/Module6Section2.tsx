import { ArrowLeft, Eye, TestTube, Wrench, Zap, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "What to Look for During Visual Checks",
    description: "Key elements to examine during visual inspection",
    icon: Eye,
    href: "2-1"
  },
  {
    number: "Subsection 2", 
    title: "Signs of Damage, Wear, or Incorrect Installation",
    description: "Identifying physical defects and installation errors",
    icon: TestTube,
    href: "2-2"
  },
  {
    number: "Subsection 3",
    title: "Checking Cable Routes, Depths, and Zones",
    description: "Verifying cable installation meets zone requirements",
    icon: Wrench,
    href: "2-3"
  },
  {
    number: "Subsection 4",
    title: "Verifying Correct Terminations and Polarity",
    description: "Ensuring proper electrical connections and polarity",
    icon: Zap,
    href: "2-4"
  },
  {
    number: "Subsection 5",
    title: "Confirming Circuit Labelling and Identification",
    description: "Checking circuit identification and labelling systems",
    icon: Shield,
    href: "2-5"
  },
  {
    number: "Subsection 6",
    title: "Visual Inspection Checklist and Record-Keeping",
    description: "Systematic approach to visual inspection documentation",
    icon: TestTube,
    href: "2-6"
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
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 2: Visual Inspection of Electrical Installations
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Systematic visual inspection techniques for electrical systems
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