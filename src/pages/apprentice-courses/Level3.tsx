import { ArrowLeft, Shield, Leaf, Zap, Search, TestTube, DraftingCompass, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const modules = [
  {
    number: "Module 1",
    title: "Health and Safety in Building Services Engineering",
    description: "Advanced health and safety practices for complex electrical work environments",
    icon: Shield,
    href: "../level3-module1",
  },
  {
    number: "Module 2", 
    title: "Environmental Technology Systems",
    description: "Energy-efficient systems, renewable technologies and environmental compliance",
    icon: Leaf,
    href: "../level3-module2",
  },
  {
    number: "Module 3",
    title: "Electrical Science Principles", 
    description: "Advanced electrical theory, AC/DC circuits, and complex electrical calculations",
    icon: Zap,
    href: "../level3-module3",
  },
  {
    number: "Module 4",
    title: "Fault Diagnosis & Rectification",
    description: "Advanced fault finding techniques and systematic problem-solving methods",
    icon: Search,
    href: "../level3-module4",
  },
  {
    number: "Module 5",
    title: "Inspection, Testing & Commissioning",
    description: "Comprehensive testing procedures, commissioning protocols and compliance verification",
    icon: TestTube,
    href: "../level3-module5",
  },
  {
    number: "Module 6", 
    title: "Electrical Systems Design",
    description: "Design principles, load calculations, and electrical system specification",
    icon: DraftingCompass,
    href: "../level3-module6",
  },
  {
    number: "Module 7",
    title: "Career Awareness & Professional Development", 
    description: "Professional standards, career progression and continuing professional development",
    icon: Users,
    href: "../level3-module7",
  },
  {
    number: "Module 8",
    title: "Mock Exams",
    description: "Comprehensive mock examinations and assessment preparation for Level 3 qualification",
    icon: TestTube,
    href: "../level3-module8",
  },
];

const Level3 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Study Centre
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Level 3 Electrical Installation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Advanced electrical installation techniques and professional development modules
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={index}
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

export default Level3;