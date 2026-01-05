import { ArrowLeft, Shield, Beaker, Zap, Building2, FolderKanban, Leaf, Lightbulb, Wind } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const modules = [
  {
    number: "Module 1",
    title: "Health, Safety and Risk Management in Engineering",
    description: "Comprehensive health and safety protocols and risk assessment procedures for engineering environments",
    icon: Shield,
    href: "../h-n-c-module1",
  },
  {
    number: "Module 2", 
    title: "Building Services Science",
    description: "Scientific principles underlying building services systems and their applications",
    icon: Beaker,
    href: "../h-n-c-module2",
  },
  {
    number: "Module 3",
    title: "Electrical Principles in Building Services", 
    description: "Core electrical concepts and their practical application in building services engineering",
    icon: Zap,
    href: "../h-n-c-module3",
  },
  {
    number: "Module 4",
    title: "Design Principles for Building Services",
    description: "Fundamental design methodologies and considerations for building services systems",
    icon: Building2,
    href: "../h-n-c-module4",
  },
  {
    number: "Module 5",
    title: "Project Management in Building Services",
    description: "Project planning, execution, and management techniques specific to building services projects",
    icon: FolderKanban,
    href: "../h-n-c-module5",
  },
  {
    number: "Module 6",
    title: "Sustainability and Environmental Engineering",
    description: "Environmental considerations and sustainable practices in building services design and operation",
    icon: Leaf,
    href: "../h-n-c-module6",
  },
  {
    number: "Module 7",
    title: "Power and Lighting Systems",
    description: "Design, installation, and maintenance of electrical power distribution and lighting systems",
    icon: Lightbulb,
    href: "../h-n-c-module7",
  },
  {
    number: "Module 8",
    title: "Heating, Ventilation and Air Conditioning (HVAC) Systems",
    description: "HVAC system design, operation, and integration with electrical building services",
    icon: Wind,
    href: "../h-n-c-module8",
  },
];

const HNC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/study-centre/apprentice">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            HNC Electrical Engineering
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl">
            Higher National Certificate in Electrical and Electronic Engineering - comprehensive modules covering building services engineering principles, design, and management
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <ModuleCard
              key={module.number}
              number={module.number}
              title={module.title}
              description={module.description}
              icon={module.icon}
              href={module.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HNC;