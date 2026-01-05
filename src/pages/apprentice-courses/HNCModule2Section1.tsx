import { ArrowLeft, Zap, FileX, Calculator, Link2, Home, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section1 = () => {
  useSEO(
    "Heat Transfer Principles - HNC Module 2",
    "Conduction, convection, radiation, thermal properties and comfort conditions"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "Modes of heat transfer: conduction, convection, radiation",
      description: "Understanding the three fundamental methods of heat transfer",
      icon: Zap,
      href: "../h-n-c-module2-section1-1-1"
    },
    {
      number: "Subsection 2", 
      title: "Thermal conductivity and resistivity of materials",
      description: "Material thermal properties and selection criteria",
      icon: FileX,
      href: "../h-n-c-module2-section1-1-2"
    },
    {
      number: "Subsection 3",
      title: "U-values and thermal transmittance calculations", 
      description: "Heat loss calculations through building elements",
      icon: Calculator,
      href: "../h-n-c-module2-section1-1-3"
    },
    {
      number: "Subsection 4",
      title: "Thermal bridging in buildings",
      description: "Cold bridges and their impact on building performance",
      icon: Link2,
      href: "../h-n-c-module2-section1-1-4"
    },
    {
      number: "Subsection 5",
      title: "Heat gains and losses in building envelopes",
      description: "Building fabric heat transfer analysis",
      icon: Home,
      href: "../h-n-c-module2-section1-1-5"
    },
    {
      number: "Subsection 6",
      title: "Insulation materials and methods",
      description: "Insulation types, installation and performance",
      icon: Shield,
      href: "../h-n-c-module2-section1-1-6"
    },
    {
      number: "Subsection 7",
      title: "Comfort conditions (temperature, humidity, air movement, clothing/activity)",
      description: "Human thermal comfort factors and standards",
      icon: User,
      href: "../h-n-c-module2-section1-1-7"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
            2.1 Heat Transfer Principles
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Conduction, convection, radiation, thermal properties and comfort conditions in building services.
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

export default HNCModule2Section1;