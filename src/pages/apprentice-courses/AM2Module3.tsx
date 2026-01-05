import { ArrowLeft, Cable, Zap, Lightbulb, Settings, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const AM2Module3 = () => {
  useSEO(
    "Module 3: Installation Tasks - AM2 Preparation Course",
    "Comprehensive coverage of installation techniques, circuits, containment and compliance for AM2 assessment"
  );

  const sections = [
    {
      id: 1,
      number: "Section 1",
      title: "Cable selection and containment (trunking, conduit, tray)",
      description: "Choosing appropriate cables and containment systems",
      icon: Cable,
      path: "section1"
    },
    {
      id: 2,
      number: "Section 2",
      title: "Power circuits – ring, radial, cooker, motor",
      description: "Installation of various power circuit types",
      icon: Zap,
      path: "section2"
    },
    {
      id: 3,
      number: "Section 3",
      title: "Lighting circuits and control systems",
      description: "Lighting installation and switching arrangements",
      icon: Lightbulb,
      path: "section3"
    },
    {
      id: 4,
      number: "Section 4",
      title: "Termination, Connections, and Circuit Labelling",
      description: "Professional workmanship standards and compliance requirements",
      icon: Settings,
      path: "section4"
    },
    {
      id: 5,
      number: "Section 5",
      title: "Accuracy, neatness, and compliance with BS 7671",
      description: "Meeting installation standards and regulatory requirements",
      icon: CheckCircle,
      path: "section5"
    },
    {
      id: 6,
      number: "Section 6",
      title: "Managing time during installation",
      description: "Efficient installation techniques under time pressure",
      icon: Clock,
      path: "section6"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AM2 Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Module 3: Installation Tasks
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <ModuleCard
              key={section.id}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AM2Module3;