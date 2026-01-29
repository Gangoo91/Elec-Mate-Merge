import { ArrowLeft, Calculator, Percent, Activity, Waves, TrendingUp, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule4Section1 = () => {
  useSEO(
    "Electrical Load Assessment - HNC Module 4 Section 1 | Building Services Design",
    "Master electrical load assessment: maximum demand calculations, diversity factors, power factor, harmonics, future load allowances and building services load profiles."
  );

  const subsections = [
    {
      number: "1.1",
      title: "Maximum Demand Calculations",
      description: "Assessment methods, load profiles, measurement techniques and demand estimation for building services installations",
      icon: Calculator,
      href: "../h-n-c-module4-section1-1"
    },
    {
      number: "1.2",
      title: "Diversity Factors",
      description: "Application of diversity, typical values for different loads, BS 7671 guidance and industry practice",
      icon: Percent,
      href: "../h-n-c-module4-section1-2"
    },
    {
      number: "1.3",
      title: "Power Factor Considerations",
      description: "Impact on system design, reactive power, correction requirements and capacitor bank sizing",
      icon: Activity,
      href: "../h-n-c-module4-section1-3"
    },
    {
      number: "1.4",
      title: "Harmonic Assessment",
      description: "Total harmonic distortion (THD), effects on equipment, neutral currents and filter requirements",
      icon: Waves,
      href: "../h-n-c-module4-section1-4"
    },
    {
      number: "1.5",
      title: "Future Load Allowances",
      description: "Capacity planning, expansion provision, spare ways and infrastructure for future growth",
      icon: TrendingUp,
      href: "../h-n-c-module4-section1-5"
    },
    {
      number: "1.6",
      title: "Building Services Load Profiles",
      description: "HVAC loading patterns, lighting loads, small power demands and time-based load variations",
      icon: Building2,
      href: "../h-n-c-module4-section1-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 1: Electrical Load Assessment
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Accurately assess electrical loads to ensure building services installations are correctly sized and future-proofed
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the essential techniques for determining maximum demand, applying diversity factors, and accounting for power quality issues in building services design. These skills are fundamental to producing cost-effective yet adequately sized electrical installations.
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

export default HNCModule4Section1;
