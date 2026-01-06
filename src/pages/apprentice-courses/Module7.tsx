import { ArrowLeft, AlertTriangle, Search, Stethoscope, TestTube, Shield, FileText, Wrench, ArrowRight } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Understanding Electrical Faults",
    description: "Fundamental concepts of electrical faults and their characteristics",
    icon: AlertTriangle,
    href: "section1"
  },
  {
    number: "Section 2",
    title: "Common Fault Types in Electrical Installations",
    description: "Identifying different types of electrical faults and their causes",
    icon: Search,
    href: "section2"
  },
  {
    number: "Section 3", 
    title: "Signs and Symptoms of Fault Conditions",
    description: "Recognising indicators of electrical fault conditions",
    icon: Stethoscope,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "Basic Fault-Finding Process and Logical Testing",
    description: "Systematic approach to electrical fault diagnosis",
    icon: TestTube,
    href: "section4"
  },
  {
    number: "Section 5",
    title: "Using Tools and Equipment Safely When Fault-Finding",
    description: "Safe practices and equipment use during fault finding",
    icon: Shield,
    href: "section5"
  },
  {
    number: "Section 6",
    title: "Recording, Reporting, and Rectifying Faults",
    description: "Documentation and remedial procedures for electrical faults",
    icon: FileText,
    href: "section6"
  },
];

const Module7 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10 bg-background/80 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Module 7: Electrical Fault Finding and Diagnosis
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Learn to identify, diagnose, and safely resolve electrical faults in installations
          </p>
        </div>


        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module7;