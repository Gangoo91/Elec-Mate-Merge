import { ArrowLeft, Calculator, Sun, Target, Eye, Grid3X3, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule7Section3 = () => {
  useSEO(
    "Lighting Design Calculations - HNC Module 7 Section 3 | Lighting Systems",
    "Master lighting calculations: lumen method, point-by-point, glare rating, uniformity ratios and compliance with CIBSE Lighting Guides."
  );

  const subsections = [
    {
      number: "3.1",
      title: "Lighting Fundamentals",
      description: "Luminous flux, illuminance, luminance, efficacy, colour temperature and colour rendering",
      icon: Calculator,
      href: "../h-n-c-module7-section3-1"
    },
    {
      number: "3.2",
      title: "Lumen Method Calculations",
      description: "Room index, utilisation factors, maintenance factors and average illuminance calculations",
      icon: Sun,
      href: "../h-n-c-module7-section3-2"
    },
    {
      number: "3.3",
      title: "Point-by-Point Method",
      description: "Inverse square law, cosine corrections, point calculations and computer-aided design",
      icon: Target,
      href: "../h-n-c-module7-section3-3"
    },
    {
      number: "3.4",
      title: "Glare Assessment",
      description: "Unified Glare Rating, glare sources, shielding angles and compliance with UGR limits",
      icon: Eye,
      href: "../h-n-c-module7-section3-4"
    },
    {
      number: "3.5",
      title: "Uniformity and Quality",
      description: "Uniformity ratios, diversity, modelling, cylindrical illuminance and visual comfort",
      icon: Grid3X3,
      href: "../h-n-c-module7-section3-5"
    },
    {
      number: "3.6",
      title: "CIBSE Standards",
      description: "Lighting Guide requirements, workplace standards, task lighting and SLL recommendations",
      icon: FileText,
      href: "../h-n-c-module7-section3-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 3: Lighting Design Calculations
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Perform lighting calculations to achieve compliant and high-quality lighting installations
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the fundamental calculations required for lighting design. You'll learn about the lumen method, point-by-point calculations, glare assessment, uniformity requirements and how to achieve compliance with CIBSE Lighting Guides for different applications.
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

export default HNCModule7Section3;
