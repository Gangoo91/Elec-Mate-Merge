import { ArrowLeft, Eye, FileText, Shield, Activity, Lock } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "2.1",
    title: "Five steps to risk assessment (identify, evaluate, control, record, review)",
    description: "Systematic approach to conducting comprehensive risk assessments",
    icon: Eye,
    href: "../level3-module1-section2-1",
  },
  {
    number: "2.2", 
    title: "Writing and interpreting Method Statements (RAMS)",
    description: "Development and analysis of Risk Assessment and Method Statements",
    icon: FileText,
    href: "../level3-module1-section2-2",
  },
  {
    number: "2.3",
    title: "Hierarchy of controls (eliminate, substitute, engineering, admin, PPE)", 
    description: "Priority order for implementing effective risk control measures",
    icon: Shield,
    href: "../level3-module1-section2-3",
  },
  {
    number: "2.4",
    title: "Dynamic risk assessments on site",
    description: "Real-time risk assessment techniques for changing work environments",
    icon: Activity,
    href: "../level3-module1-section2-4",
  },
  {
    number: "2.5",
    title: "Safe systems of work (PTWs, lock-off/tag-out)",
    description: "Permit to work systems and secure isolation procedures",
    icon: Lock,
    href: "../level3-module1-section2-5",
  },
];

const Level3Module1Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 2: Risk Assessment and Method Statements
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Advanced risk assessment techniques and comprehensive method statement development
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

export default Level3Module1Section2;