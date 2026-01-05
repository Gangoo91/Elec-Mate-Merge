import { ArrowLeft, Eye, Thermometer, Zap, TestTube, DropletIcon, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule4Section2 = () => {
  useSEO(
    "Section 4.2: Condition Monitoring Techniques - MOET Module 4",
    "Visual inspection, thermal imaging, vibration analysis, insulation testing and predictive maintenance"
  );

  const subsections = [
    {
      number: "4.2.1",
      title: "Visual and Sensory Inspection",
      description: "Systematic visual inspection techniques and sensory monitoring methods",
      icon: Eye,
      href: "../m-o-e-t-module4-section2-1"
    },
    {
      number: "4.2.2",
      title: "Thermal Imaging",
      description: "Infrared thermography principles, equipment and interpretation of thermal images",
      icon: Thermometer,
      href: "../m-o-e-t-module4-section2-2"
    },
    {
      number: "4.2.3",
      title: "Vibration Analysis",
      description: "Vibration monitoring techniques, measurement methods and fault identification",
      icon: Zap,
      href: "../m-o-e-t-module4-section2-3"
    },
    {
      number: "4.2.4",
      title: "Insulation Resistance Testing",
      description: "Insulation testing methods, equipment and interpretation of results",
      icon: TestTube,
      href: "../m-o-e-t-module4-section2-4"
    },
    {
      number: "4.2.5",
      title: "Oil and Fluid Analysis (where relevant)",
      description: "Analysis of lubricating oils and hydraulic fluids for condition monitoring",
      icon: DropletIcon,
      href: "../m-o-e-t-module4-section2-5"
    },
    {
      number: "4.2.6",
      title: "Trend Analysis and Predictive Maintenance",
      description: "Data analysis techniques and predictive maintenance strategies",
      icon: TrendingUp,
      href: "../m-o-e-t-module4-section2-6"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module4">
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
            Section 4.2: Condition Monitoring Techniques
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Visual inspection, thermal imaging, vibration analysis, insulation testing and predictive maintenance.
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

export default MOETModule4Section2;