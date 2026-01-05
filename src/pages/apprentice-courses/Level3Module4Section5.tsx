import { ArrowLeft, Wrench, CheckCircle, FileText, TestTube, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "5.1",
    title: "Selecting Correct Repair Methods",
    description: "Choosing appropriate repair techniques: replacement, re-termination, re-insulation",
    icon: Wrench,
    href: "../level3-module4-section5-5-1",
  },
  {
    number: "5.2", 
    title: "Ensuring Compliance with BS7671 After Repair",
    description: "Maintaining regulatory compliance during and after rectification work",
    icon: CheckCircle,
    href: "../level3-module4-section5-5-2",
  },
  {
    number: "5.3",
    title: "Recording Remedial Works",
    description: "Proper documentation and recording of all remedial work undertaken",
    icon: FileText,
    href: "../level3-module4-section5-5-3",
  },
  {
    number: "5.4",
    title: "Re-testing and Certification",
    description: "Post-repair testing procedures and certification requirements",
    icon: TestTube,
    href: "../level3-module4-section5-5-4",
  },
  {
    number: "5.5",
    title: "Preventative Maintenance Strategies",
    description: "Implementing maintenance strategies to prevent future faults",
    icon: Shield,
    href: "../level3-module4-section5-5-5",
  },
];

const Level3Module4Section5 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 5 - Rectification and Verification
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Learn proper rectification methods, compliance verification and documentation for electrical fault repairs
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

export default Level3Module4Section5;