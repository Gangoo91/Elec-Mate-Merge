import { ArrowLeft, Building, BarChart3, Calculator, Zap, Link2, FileText, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section6 = () => {
  useSEO(
    "Applied Building Services Science - HNC Module 2",
    "Load estimation, energy analysis and modelling tools"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "Building fabric performance analysis",
      description: "Evaluating building envelope thermal performance",
      icon: Building,
      href: "../h-n-c-module2-section6-6-1"
    },
    {
      number: "Subsection 2", 
      title: "Energy balances in building systems",
      description: "Energy flow analysis and conservation principles",
      icon: BarChart3,
      href: "../h-n-c-module2-section6-6-2"
    },
    {
      number: "Subsection 3",
      title: "HVAC load estimation methods", 
      description: "Heating and cooling load calculation procedures",
      icon: Calculator,
      href: "../h-n-c-module2-section6-6-3"
    },
    {
      number: "Subsection 4",
      title: "Impact of environmental factors on electrical load profiles",
      description: "Environmental effects on electrical system demands",
      icon: Zap,
      href: "../h-n-c-module2-section6-6-4"
    },
    {
      number: "Subsection 5",
      title: "Integration of science principles into BS7671 design calcs",
      description: "Applying building science to electrical installation design",
      icon: Link2,
      href: "../h-n-c-module2-section6-6-5"
    },
    {
      number: "Subsection 6",
      title: "Case studies: applying science to real building projects",
      description: "Practical applications and real-world examples",
      icon: FileText,
      href: "../h-n-c-module2-section6-6-6"
    },
    {
      number: "Subsection 7",
      title: "Using modelling tools (IESVE, TAS, DesignBuilder)",
      description: "Building performance simulation software applications",
      icon: Monitor,
      href: "../h-n-c-module2-section6-6-7"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            2.6 Applied Building Services Science
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Load estimation, energy analysis and modelling tools for building services applications.
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

export default HNCModule2Section6;