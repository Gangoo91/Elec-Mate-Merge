import { ArrowLeft, Search, Wrench, AlertTriangle, Target, CheckCircle, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Principles of Fault Diagnosis",
    description: "Types of faults, symptoms, diagnostic sequence, safety considerations and documentation",
    icon: Search,
    href: "../level3-module4-section1",
  },
  {
    number: "Section 2", 
    title: "Diagnostic Tools and Equipment",
    description: "Multimeters, testers, clamp meters, thermal imaging and safe instrument use",
    icon: Wrench,
    href: "../level3-module4-section2",
  },
  {
    number: "Section 3",
    title: "Common Faults in Electrical Systems", 
    description: "Ring/radial circuits, lighting, protective devices, earthing and equipment faults",
    icon: AlertTriangle,
    href: "../level3-module4-section3",
  },
  {
    number: "Section 4",
    title: "Systematic Fault-Finding Techniques",
    description: "Visual inspection, testing procedures, polarity checks and functional testing",
    icon: Target,
    href: "../level3-module4-section4",
  },
  {
    number: "Section 5",
    title: "Rectification and Verification",
    description: "Repair methods, BS7671 compliance, recording works and preventative maintenance",
    icon: CheckCircle,
    href: "../level3-module4-section5",
  },
  {
    number: "Section 6", 
    title: "Professional Practice in Fault Work",
    description: "Client communication, working under pressure, costing and professional standards",
    icon: Users,
    href: "../level3-module4-section6",
  },
];

const Level3Module4 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 4 - Fault Diagnosis & Rectification
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Advanced fault finding techniques and systematic problem-solving methods for electrical installations
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

export default Level3Module4;