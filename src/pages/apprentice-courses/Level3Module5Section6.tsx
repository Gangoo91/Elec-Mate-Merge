import { ArrowLeft, AlertTriangle, Search, Wrench, RefreshCw } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "6.1",
    title: "Dealing with Unexpected Results",
    description: "Procedures for handling unexpected test results and anomalies",
    icon: AlertTriangle,
    href: "../level3-module5-section6-6-1",
  },
  {
    number: "6.2", 
    title: "Investigating Faults Identified During Testing",
    description: "Methods for investigating and diagnosing faults discovered during testing",
    icon: Search,
    href: "../level3-module5-section6-6-2",
  },
  {
    number: "6.3",
    title: "Rectification Procedures",
    description: "Procedures for rectifying faults and defects found during inspection and testing",
    icon: Wrench,
    href: "../level3-module5-section6-6-3",
  },
  {
    number: "6.4",
    title: "Re-testing and Updating Records",
    description: "Re-testing procedures after rectification and updating documentation",
    icon: RefreshCw,
    href: "../level3-module5-section6-6-4",
  },
];

const Level3Module5Section6 = () => {
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
            Section 6 - Faults Found During Testing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Procedures for dealing with faults discovered during testing and inspection
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

export default Level3Module5Section6;