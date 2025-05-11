
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, BookOpen, Lightbulb, Wrench, FlaskConical } from "lucide-react";

const InstallationMethodContent = () => {
  // Simplified units data with no links to existing data structures
  const units = [
    {
      id: "unit-1",
      code: "ELEC2/01",
      title: "Health and Safety in Electrical Installation",
      description: "Understanding safety regulations and practices in electrical work",
      icon: Shield
    },
    {
      id: "unit-2",
      code: "ELEC2/04",
      title: "Electrical Installation Theory and Technology",
      description: "Core theoretical knowledge for electrical installation work",
      icon: Lightbulb
    },
    {
      id: "unit-3",
      code: "ELEC2/05A",
      title: "Electrical Installation Methods, Procedures and Requirements",
      description: "Standard methods and procedures for electrical installations",
      icon: BookOpen
    },
    {
      id: "unit-4",
      code: "ELEC2/05B",
      title: "Electrical Installation Craft Skills",
      description: "Practical skills for electrical installation work",
      icon: Wrench
    },
    {
      id: "unit-5",
      code: "ELEC2/08",
      title: "Electrical Science and Principles",
      description: "Scientific principles underlying electrical systems",
      icon: FlaskConical
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">EAL Level 2 Units</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Core units for the EAL Level 2 Diploma in Electrical Installation
          </p>
        </div>
        <Button 
          variant="outline" 
          className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => {
          const Icon = unit.icon;
          
          return (
            <Card 
              key={unit.id}
              className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
                <Icon className="h-10 w-10 text-elec-yellow mb-4 opacity-80" />
                <p className="text-elec-yellow text-sm mb-2">{unit.code}</p>
                <h3 className="text-lg font-medium mb-2">{unit.title}</h3>
                <p className="text-sm text-muted-foreground">{unit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InstallationMethodContent;
