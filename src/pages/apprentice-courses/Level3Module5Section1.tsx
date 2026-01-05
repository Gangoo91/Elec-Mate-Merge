import { ArrowLeft, FileCheck, BookOpen, List, Shield, FileText } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "1.1",
    title: "Purpose of Inspection and Testing",
    description: "Initial verification vs periodic inspection and their respective purposes",
    icon: FileCheck,
    href: "../level3-module5-section1-1-1",
  },
  {
    number: "1.2", 
    title: "BS 7671 Requirements and Part 6",
    description: "Understanding the regulatory requirements for inspection and testing under BS7671",
    icon: BookOpen,
    href: "../level3-module5-section1-1-2",
  },
  {
    number: "1.3",
    title: "Sequence of Inspection and Testing (GN3 Guidance)",
    description: "Following the correct sequence for inspection and testing as outlined in Guidance Note 3",
    icon: List,
    href: "../level3-module5-section1-1-3",
  },
  {
    number: "1.4",
    title: "Safety Precautions and Risk Assessment Before Testing",
    description: "Essential safety procedures and risk assessments required before testing begins",
    icon: Shield,
    href: "../level3-module5-section1-1-4",
  },
  {
    number: "1.5",
    title: "Documentation and Certification Requirements",
    description: "Understanding the documentation and certification requirements for inspection and testing",
    icon: FileText,
    href: "../level3-module5-section1-1-5",
  },
];

const Level3Module5Section1 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 1 - Principles of Inspection and Testing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Understanding the fundamental principles, requirements and procedures for electrical inspection and testing
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

export default Level3Module5Section1;