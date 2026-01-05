import { ArrowLeft, Shield, TestTube, Eye, Zap, AlertTriangle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Selection of Test Equipment for Basic Fault-Finding",
    description: "Choosing appropriate testing instruments for fault diagnosis",
    icon: Shield,
    href: "5-1"
  },
  {
    number: "Subsection 2", 
    title: "Checking Instruments for Safety and Accuracy",
    description: "Verifying test equipment condition before use",
    icon: TestTube,
    href: "5-2"
  },
  {
    number: "Subsection 3",
    title: "GS38-Compliant Testing Practices",
    description: "Following GS38 safety requirements for electrical testing",
    icon: Eye,
    href: "5-3"
  },
  {
    number: "Subsection 4",
    title: "PPE and Environmental Precautions During Fault Investigation",
    description: "Personal protection and environmental safety during fault finding",
    icon: Zap,
    href: "5-4"
  },
  {
    number: "Subsection 5",
    title: "Avoiding Live Testing Where Possible",
    description: "Safe isolation practices and minimising live working",
    icon: AlertTriangle,
    href: "5-5"
  }
];

const Section5 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 5: Using Tools and Equipment Safely When Fault-Finding
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Safe practices and equipment use during fault finding
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

export default Section5;