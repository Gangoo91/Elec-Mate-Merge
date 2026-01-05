import { ArrowLeft, CheckCircle, Settings, Calculator, Users, FileCheck } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "6.1",
    title: "Checking Compliance with BS 7671 Design Requirements",
    description: "Verifying design compliance with BS7671 wiring regulations",
    icon: CheckCircle,
    href: "../level3-module6-section6-6-1",
  },
  {
    number: "6.2", 
    title: "Coordination of Protective Devices",
    description: "Ensuring proper coordination and selectivity of protective devices",
    icon: Settings,
    href: "../level3-module6-section6-6-2",
  },
  {
    number: "6.3",
    title: "Assessing Volt Drop, Fault Levels, and Disconnection Times",
    description: "Verifying voltage drop, fault current levels and protection disconnection times",
    icon: Calculator,
    href: "../level3-module6-section6-6-3",
  },
  {
    number: "6.4",
    title: "Peer Review of Design Work",
    description: "Conducting and participating in peer review processes for design verification",
    icon: Users,
    href: "../level3-module6-section6-6-4",
  },
  {
    number: "6.5",
    title: "Pre-installation Design Approval and Sign-off",
    description: "Obtaining necessary approvals and sign-offs before installation commences",
    icon: FileCheck,
    href: "../level3-module6-section6-6-5",
  },
];

const Level3Module6Section6 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 6 - Verification of Design
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Checking and verifying electrical system designs for compliance and performance
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

export default Level3Module6Section6;