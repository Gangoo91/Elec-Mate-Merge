import { ArrowLeft, Clipboard, TestTube, Settings, RotateCcw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule5Section5 = () => {
  useSEO(
    "Section 5.5: Testing and Calibration of Systems - MOET Module 5",
    "Calibration procedures, test instruments, adjustments and documentation"
  );

  const subsections = [
    {
      number: "5.5.1",
      title: "Calibration Procedures and Standards",
      description: "Calibration methodologies, standards and traceability requirements",
      icon: Clipboard,
      href: "../m-o-e-t-module5-section5-1"
    },
    {
      number: "5.5.2",
      title: "Test Instruments for Control Systems",
      description: "Selection and use of calibration and test equipment",
      icon: TestTube,
      href: "../m-o-e-t-module5-section5-2"
    },
    {
      number: "5.5.3",
      title: "Zero, Span and Linearity Adjustments",
      description: "Calibration adjustments and accuracy verification procedures",
      icon: Settings,
      href: "../m-o-e-t-module5-section5-3"
    },
    {
      number: "5.5.4",
      title: "Functional Testing of Loops",
      description: "End-to-end testing of control loops and system verification",
      icon: RotateCcw,
      href: "../m-o-e-t-module5-section5-4"
    },
    {
      number: "5.5.5",
      title: "Documenting Calibration Results",
      description: "Record keeping, certificates and calibration documentation",
      icon: FileText,
      href: "../m-o-e-t-module5-section5-5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module5">
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
            Section 5.5: Testing and Calibration of Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Calibration procedures, test instruments, adjustments and documentation.
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

export default MOETModule5Section5;