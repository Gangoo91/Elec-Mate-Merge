import { ArrowLeft, Award, Droplets, Zap, Leaf, Users, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule6Section3 = () => {
  useSEO(
    "BREEAM Assessment - HNC Module 6 Section 3 | Sustainability",
    "Master BREEAM methodology: assessment categories, credit achievement, evidence requirements, pre-assessment and certification for sustainable buildings."
  );

  const subsections = [
    {
      number: "3.1",
      title: "BREEAM Overview",
      description: "BREEAM schemes, rating levels, weightings, assessment process and the role of the assessor",
      icon: Award,
      href: "../h-n-c-module6-section3-1"
    },
    {
      number: "3.2",
      title: "Water Category",
      description: "Water consumption targets, efficient fittings, metering, leak detection and water recycling systems",
      icon: Droplets,
      href: "../h-n-c-module6-section3-2"
    },
    {
      number: "3.3",
      title: "Energy Category",
      description: "Energy performance, sub-metering, external lighting, low carbon technologies and energy modelling",
      icon: Zap,
      href: "../h-n-c-module6-section3-3"
    },
    {
      number: "3.4",
      title: "Materials and Waste",
      description: "Responsible sourcing, life cycle impacts, construction waste, operational waste and circular economy",
      icon: Leaf,
      href: "../h-n-c-module6-section3-4"
    },
    {
      number: "3.5",
      title: "Health and Wellbeing",
      description: "Daylighting, artificial lighting quality, indoor air quality, thermal comfort and acoustic performance",
      icon: Users,
      href: "../h-n-c-module6-section3-5"
    },
    {
      number: "3.6",
      title: "Evidence and Certification",
      description: "Documentation requirements, credit evidence, design stage vs post-construction and achieving certification",
      icon: FileCheck,
      href: "../h-n-c-module6-section3-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 3: BREEAM Assessment
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understand BREEAM assessment methodology and how building services contribute to certification
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the Building Research Establishment Environmental Assessment Method (BREEAM), the world's leading sustainability assessment method for buildings. You'll learn about assessment categories, credit requirements and how electrical installations contribute to BREEAM certification.
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

export default HNCModule6Section3;
