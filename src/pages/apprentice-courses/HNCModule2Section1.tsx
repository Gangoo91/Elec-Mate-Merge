import { ArrowLeft, Thermometer, Flame, Sun, Calculator, Link2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section1 = () => {
  useSEO(
    "Heat Transfer Principles - HNC Module 2 Section 1 | Building Services Engineering",
    "Master heat transfer fundamentals: conduction, convection, radiation, U-values, thermal bridging and heat loss calculations for building services applications."
  );

  const subsections = [
    {
      number: "1.1",
      title: "Conduction",
      description: "Fourier's Law, thermal conductivity, material properties, composite walls",
      icon: Thermometer,
      href: "../h-n-c-module2-section1-1"
    },
    {
      number: "1.2",
      title: "Convection",
      description: "Natural and forced convection, heat transfer coefficients, surface conditions",
      icon: Flame,
      href: "../h-n-c-module2-section1-2"
    },
    {
      number: "1.3",
      title: "Radiation",
      description: "Stefan-Boltzmann law, emissivity, radiative exchange, surface temperatures",
      icon: Sun,
      href: "../h-n-c-module2-section1-3"
    },
    {
      number: "1.4",
      title: "U-Values and Thermal Resistance",
      description: "Calculation methods, R-values, Part L requirements",
      icon: Calculator,
      href: "../h-n-c-module2-section1-4"
    },
    {
      number: "1.5",
      title: "Thermal Bridging",
      description: "Linear and point bridges, psi values, condensation risk",
      icon: Link2,
      href: "../h-n-c-module2-section1-5"
    },
    {
      number: "1.6",
      title: "Heat Loss Calculations",
      description: "Fabric losses, ventilation losses, building heat load",
      icon: Home,
      href: "../h-n-c-module2-section1-6"
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
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 1: Heat Transfer Principles
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understand the fundamental mechanisms of heat transfer and their application to building fabric performance
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the three modes of heat transfer - conduction, convection and radiation - and their practical application in calculating U-values, identifying thermal bridges, and determining building heat loads to CIBSE and Part L standards.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsections.map((subsection) => (
            <ModuleCard
              key={subsection.number}
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
