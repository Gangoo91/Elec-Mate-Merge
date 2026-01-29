import { ArrowLeft, Calculator, Zap, GitBranch, Shuffle, Activity, Target, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section1 = () => {
  useSEO(
    "DC Circuit Theory - HNC Module 3 Section 1 | Electrical Engineering",
    "Master DC circuit analysis: Ohm's Law, Kirchhoff's Laws, series/parallel circuits, network theorems. Applied to building services electrical systems."
  );

  const subsections = [
    {
      number: "1.1",
      title: "Voltage, Current, Resistance and Power",
      description: "Fundamental electrical quantities, SI units, and power calculations applied to building services loads",
      icon: Zap,
      href: "../h-n-c-module3-section1-1"
    },
    {
      number: "1.2",
      title: "Ohm's Law",
      description: "V = IR relationships, linear and non-linear resistors, cable sizing and voltage drop calculations",
      icon: Calculator,
      href: "../h-n-c-module3-section1-2"
    },
    {
      number: "1.3",
      title: "Series Circuits",
      description: "Series resistance, voltage dividers, and applications in emergency lighting and control circuits",
      icon: GitBranch,
      href: "../h-n-c-module3-section1-3"
    },
    {
      number: "1.4",
      title: "Parallel Circuits",
      description: "Parallel resistance, current division, lighting circuits and distribution board analysis",
      icon: Shuffle,
      href: "../h-n-c-module3-section1-4"
    },
    {
      number: "1.5",
      title: "Kirchhoff's Laws",
      description: "KCL and KVL for complex circuit analysis, distribution boards and fault current paths",
      icon: Target,
      href: "../h-n-c-module3-section1-5"
    },
    {
      number: "1.6",
      title: "Network Theorems",
      description: "Superposition, Thevenin and Norton equivalents for multi-source building power systems",
      icon: Activity,
      href: "../h-n-c-module3-section1-6"
    },
    {
      number: "1.7",
      title: "Building Services Applications",
      description: "Practical DC circuit analysis for emergency systems, BMS controls and standby power",
      icon: Settings,
      href: "../h-n-c-module3-section1-7"
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
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 1: DC Circuit Theory
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Apply understanding of fundamental electrical quantities to evaluate circuits with constant voltages and currents
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers essential DC circuit analysis techniques used daily in building services engineering - from sizing cables and calculating voltage drops to analysing distribution systems and emergency power supplies.
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

export default HNCModule3Section1;