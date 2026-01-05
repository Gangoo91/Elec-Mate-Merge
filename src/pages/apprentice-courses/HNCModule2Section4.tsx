import { ArrowLeft, Sun, Lightbulb, Calculator, Volume2, Building, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section4 = () => {
  useSEO(
    "Lighting and Acoustics Fundamentals - HNC Module 2",
    "Illumination, sound transmission and building performance standards"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "Natural vs artificial lighting in buildings",
      description: "Daylight and artificial lighting integration strategies",
      icon: Sun,
      href: "../h-n-c-module2-section4-4-1"
    },
    {
      number: "Subsection 2", 
      title: "Luminous flux, luminous intensity, illuminance and luminance",
      description: "Fundamental lighting quantities and units",
      icon: Lightbulb,
      href: "../h-n-c-module2-section4-4-2"
    },
    {
      number: "Subsection 3",
      title: "Daylighting calculations and daylight factors", 
      description: "Natural lighting assessment and calculations",
      icon: Calculator,
      href: "../h-n-c-module2-section4-4-3"
    },
    {
      number: "Subsection 4",
      title: "Principles of sound transmission and absorption",
      description: "Acoustic principles in building design",
      icon: Volume2,
      href: "../h-n-c-module2-section4-4-4"
    },
    {
      number: "Subsection 5",
      title: "Acoustic performance of building materials",
      description: "Sound insulation and absorption properties",
      icon: Building,
      href: "../h-n-c-module2-section4-4-5"
    },
    {
      number: "Subsection 6",
      title: "Human comfort in lighting and acoustics",
      description: "Occupant comfort and performance standards",
      icon: User,
      href: "../h-n-c-module2-section4-4-6"
    },
    {
      number: "Subsection 7",
      title: "Standards and guidelines (CIBSE, BS, EN codes)",
      description: "Industry standards and compliance requirements",
      icon: FileText,
      href: "../h-n-c-module2-section4-4-7"
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
            2.4 Lighting and Acoustics Fundamentals
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Illumination, sound transmission and building performance standards.
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

export default HNCModule2Section4;