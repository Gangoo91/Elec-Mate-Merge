import { ArrowLeft, BookOpen, Wrench, Shield, TestTube } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "2.1",
    title: "Practical Assessment Guide",
    description: "Comprehensive guide to practical assessment requirements and expectations",
    icon: BookOpen,
    href: "../level3-module8-section2-1",
  },
  {
    number: "2.2",
    title: "Wiring Techniques Review",
    description: "Review of essential wiring techniques required for practical assessments",
    icon: Wrench,
    href: "../level3-module8-section2-2",
  },
  {
    number: "2.3",
    title: "Safe Isolation Practice",
    description: "Step-by-step safe isolation procedures for practical exam scenarios",
    icon: Shield,
    href: "../level3-module8-section2-3",
  },
  {
    number: "2.4",
    title: "Testing Procedures Guide",
    description: "Complete guide to testing procedures and sequence for practical assessments",
    icon: TestTube,
    href: "../level3-module8-section2-4",
  },
];

const Level3Module8Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 2 - Practical Help
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Essential guidance and review materials for practical assessment preparation
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

export default Level3Module8Section2;
