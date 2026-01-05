import { ArrowLeft, FileText, Zap, Sun, Leaf, Settings, Recycle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Environmental Legislation and Standards",
    description: "Environmental laws, regulations and standards affecting electrical installations",
    icon: FileText,
    href: "../level3-module2-section1",
  },
  {
    number: "Section 2", 
    title: "Energy Efficiency in Electrical Installations",
    description: "Techniques and technologies for improving energy efficiency in electrical systems",
    icon: Zap,
    href: "../level3-module2-section2",
  },
  {
    number: "Section 3",
    title: "Renewable Energy Systems", 
    description: "Solar, wind and other renewable energy technologies and their applications",
    icon: Sun,
    href: "../level3-module2-section3",
  },
  {
    number: "Section 4",
    title: "Low Carbon Technologies",
    description: "Carbon reduction technologies and their integration in building services",
    icon: Leaf,
    href: "../level3-module2-section4",
  },
  {
    number: "Section 5",
    title: "Integration with Electrical Installations",
    description: "Incorporating environmental technologies into conventional electrical systems",
    icon: Settings,
    href: "../level3-module2-section5",
  },
  {
    number: "Section 6", 
    title: "Sustainable Working Practices",
    description: "Environmentally responsible working methods and waste management practices",
    icon: Recycle,
    href: "../level3-module2-section6",
  },
];

const Level3Module2 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 2: Environmental Technology Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Energy-efficient systems, renewable technologies and environmental compliance
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Level3Module2;