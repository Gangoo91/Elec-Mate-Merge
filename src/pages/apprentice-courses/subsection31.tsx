import { ArrowLeft, Calculator, Triangle, Zap, Power, Battery, AlertTriangle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "2.1",
    title: "Introduction to Ohm's Law (V = IR)",
    description: "Understanding the fundamental relationship between voltage, current, and resistance",
    icon: Calculator,
    href: "2-1"
  },
  {
    number: "2.2", 
    title: "Using Triangle Methods to Rearrange Formulas",
    description: "Visual methods for rearranging electrical formulas and calculations",
    icon: Triangle,
    href: "2-2"
  },
  {
    number: "2.3",
    title: "Calculating Voltage, Current, or Resistance",
    description: "Practical application of Ohm's Law in electrical calculations",
    icon: Zap,
    href: "2-3"
  },
  {
    number: "2.4",
    title: "Power Calculations (P = VI, P = I²R, P = V²/R)",
    description: "Understanding and calculating electrical power using different formulas",
    icon: Power,
    href: "2-4"
  },
  {
    number: "2.5",
    title: "Energy Calculations (E = Pt, kilowatt-hours)",
    description: "Calculating energy consumption and understanding kilowatt-hours",
    icon: Battery,
    href: "2-5"
  },
  {
    number: "2.6",
    title: "Common Mistakes and How to Avoid Them",
    description: "Identifying and preventing typical errors in electrical calculations",
    icon: AlertTriangle,
    href: "2-6"
  },
];

const Module2Section2_2 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
            Section 2.2 – Ohm's Law and Electrical Calculations
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Application of Ohm's Law for calculating voltage, current, and resistance relationships
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

export default Module2Section2_2;