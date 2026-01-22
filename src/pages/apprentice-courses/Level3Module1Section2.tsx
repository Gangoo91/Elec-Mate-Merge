import { ArrowLeft, Eye, FileText, Shield, Activity, Lock, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

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
  useSEO(
    "Section 2: Risk Assessment and Method Statements - Level 3 Module 1",
    "Advanced risk assessment techniques and comprehensive method statement development"
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 gap-4">
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
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module1Section2;
