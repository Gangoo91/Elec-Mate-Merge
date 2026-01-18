import { ArrowLeft, Square, Shield, Zap, Star, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule5Section3 = () => {
  useSEO(
    "Section 5.3: Safety Circuits and Interlocks - MOET Module 5",
    "Emergency stops, interlocking devices, safety relays and functional safety principles"
  );

  const subsections = [
    {
      number: "5.3.1",
      title: "Emergency Stop Circuits",
      description: "E-stop requirements, wiring methods and testing procedures",
      icon: Square,
      href: "../m-o-e-t-module5-section3-1"
    },
    {
      number: "5.3.2",
      title: "Guarding and Interlocking Devices",
      description: "Safety switches, light curtains and guard interlocking systems",
      icon: Shield,
      href: "../m-o-e-t-module5-section3-2"
    },
    {
      number: "5.3.3",
      title: "Safety Relays and Controllers",
      description: "Safety relay modules, monitoring relays and safety controllers",
      icon: Zap,
      href: "../m-o-e-t-module5-section3-3"
    },
    {
      number: "5.3.4",
      title: "Category and Performance Levels (ISO 13849)",
      description: "Safety categories, performance levels and risk assessment",
      icon: Star,
      href: "../m-o-e-t-module5-section3-4"
    },
    {
      number: "5.3.5",
      title: "Functional Safety Principles",
      description: "SIL levels, safety lifecycle and functional safety management",
      icon: AlertTriangle,
      href: "../m-o-e-t-module5-section3-5"
    }
  ];

  return (
    <div className="bg-background">
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
            Section 5.3: Safety Circuits and Interlocks
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Emergency stops, interlocking devices, safety relays and functional safety principles.
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

export default MOETModule5Section3;