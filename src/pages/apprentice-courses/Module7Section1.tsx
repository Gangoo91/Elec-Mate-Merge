import { ArrowLeft, AlertTriangle, Zap, Search, TestTube, Eye } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "What Is a Fault?",
    description: "Basic definition and understanding of electrical faults",
    icon: AlertTriangle,
    href: "1-1"
  },
  {
    number: "Subsection 2", 
    title: "Why Faults Occur in Electrical Installations",
    description: "Understanding the root causes of electrical faults",
    icon: Zap,
    href: "1-2"
  },
  {
    number: "Subsection 3",
    title: "Risks and Consequences of Electrical Faults",
    description: "Impact and potential dangers of electrical fault conditions",
    icon: Search,
    href: "1-3"
  },
  {
    number: "Subsection 4",
    title: "Overview of Fault Categories (Design, Installation, Deterioration, External Damage)",
    description: "Classifying electrical faults by their origin and cause",
    icon: TestTube,
    href: "1-4"
  },
  {
    number: "Subsection 5",
    title: "Legal and Safety Responsibilities When Dealing with Faults",
    description: "Understanding obligations and responsibilities in fault situations",
    icon: Eye,
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
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 1: Understanding Electrical Faults
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Fundamental concepts of electrical faults and their characteristics
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