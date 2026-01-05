import { ArrowLeft, Heart, UserCheck, AlertTriangle, Scale, Users, GraduationCap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "6.1",
    title: "Duty of care (legal and moral)",
    description: "Understanding legal and moral obligations to protect others in the workplace",
    icon: Heart,
    href: "../level3-module1-section6-6-1",
  },
  {
    number: "6.2", 
    title: "Accountability for safe working practices",
    description: "Personal and professional accountability for maintaining safe working practices",
    icon: UserCheck,
    href: "../level3-module1-section6-6-2",
  },
  {
    number: "6.3",
    title: "Disciplinary actions for non-compliance", 
    description: "Consequences and disciplinary procedures for safety non-compliance",
    icon: AlertTriangle,
    href: "../level3-module1-section6-6-3",
  },
  {
    number: "6.4",
    title: "Ethical responsibilities in protecting others",
    description: "Ethical obligations and moral responsibilities in workplace safety",
    icon: Scale,
    href: "../level3-module1-section6-6-4",
  },
  {
    number: "6.5",
    title: "Role of safety representatives and trade unions",
    description: "Functions and responsibilities of safety representatives and union involvement",
    icon: Users,
    href: "../level3-module1-section6-6-5",
  },
  {
    number: "6.6", 
    title: "CPD (Continuing Professional Development) in health and safety",
    description: "Ongoing professional development requirements in health and safety practices",
    icon: GraduationCap,
    href: "../level3-module1-section6-6-6",
  },
];

const Level3Module1Section6 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 6: Professional Responsibilities
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Ethical obligations, professional standards and duty of care in electrical work
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

export default Level3Module1Section6;