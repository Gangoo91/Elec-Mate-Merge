import { ArrowLeft, Shield, Zap, Wrench, HardHat, FileText, TestTube, AlertTriangle, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const modules = [
  {
    number: "Module 1",
    title: "Health and Safety in Building Services Engineering",
    description: "Essential health and safety practices for electrical work environments",
    icon: Shield,
    href: "module1",
  },
  {
    number: "Module 2", 
    title: "Principles of Electrical Science",
    description: "Fundamental electrical theory, voltage, current, resistance and power calculations",
    icon: Zap,
    href: "module2",
  },
  {
    number: "Module 3",
    title: "Electrical Installation Methods & Technology", 
    description: "Wiring systems, containment methods, tools and materials for electrical installations",
    icon: Wrench,
    href: "module3",
  },
  {
    number: "Module 4",
    title: "Installing Wiring Systems & Enclosures",
    description: "Hands-on installation techniques for PVC, trunking, conduit and cable tray systems",
    icon: HardHat,
    href: "module4",
  },
  {
    number: "Module 5",
    title: "Design, Planning & Communication",
    description: "Project planning, technical documentation and effective team communication",
    icon: FileText,
    href: "module5",
  },
  {
    number: "Module 6", 
    title: "Inspection, Testing & Certification",
    description: "Safe isolation procedures, continuity testing, insulation resistance and certification",
    icon: TestTube,
    href: "module6",
  },
  {
    number: "Module 7",
    title: "Electrical Fault Finding and Diagnosis", 
    description: "Learn to identify, diagnose, and safely resolve electrical faults in installations",
    icon: AlertTriangle,
    href: "module7",
  },
  {
    number: "Module 8",
    title: "Mock Examinations & Assessment",
    description: "Test your knowledge and exam readiness with comprehensive mock examinations and practice questions",
    icon: TestTube,
    href: "module8",
  },
];

const Level2 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10 bg-background/80 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Back to Study Centre</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Level 2 Electrical Installation
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Foundation electrical installation skills and safety training modules
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

export default Level2;