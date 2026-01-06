import { ArrowLeft, TestTube, Eye, Wrench, Zap, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Why Electrical Installations Must Be Inspected and Tested",
    description: "Understanding the fundamental need for electrical inspection and testing",
    icon: TestTube,
    href: "1-1"
  },
  {
    number: "Subsection 2", 
    title: "Legal and Safety Reasons (EAWR, BS 7671 Principles)",
    description: "Legal requirements under EAWR and BS 7671 standards",
    icon: Eye,
    href: "1-2"
  },
  {
    number: "Subsection 3",
    title: "When Testing Is Required (New Work, Alterations, Faults)",
    description: "Circumstances that require electrical testing and inspection",
    icon: Wrench,
    href: "1-3"
  },
  {
    number: "Subsection 4",
    title: "Difference Between Inspection and Testing",
    description: "Understanding the distinction between visual inspection and testing",
    icon: Zap,
    href: "1-4"
  },
  {
    number: "Subsection 5",
    title: "What Level 2 Learners Are Expected to Know and Do",
    description: "Scope of knowledge and practical requirements for Level 2",
    icon: Shield,
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
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 1: Purpose of Inspection and Testing
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Understanding why inspection and testing are essential for electrical safety
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