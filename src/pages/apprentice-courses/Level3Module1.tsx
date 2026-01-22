import { ArrowLeft, FileText, ClipboardCheck, Shield, AlertTriangle, Settings, UserCheck, CheckCircle, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "Legislation and Regulations",
    description: "Key legislation, regulations and standards governing electrical work and building services",
    icon: FileText,
    href: "../level3-module1-section1",
  },
  {
    number: "Section 2",
    title: "Risk Assessment and Method Statements",
    description: "Advanced risk assessment techniques and comprehensive method statement development",
    icon: ClipboardCheck,
    href: "../level3-module1-section2",
  },
  {
    number: "Section 3",
    title: "Electrical Safety in the Workplace",
    description: "Workplace electrical safety protocols, procedures and emergency response",
    icon: Shield,
    href: "../level3-module1-section3",
  },
  {
    number: "Section 4",
    title: "Hazard Identification and Control",
    description: "Systematic hazard identification, evaluation and implementation of control measures",
    icon: AlertTriangle,
    href: "../level3-module1-section4",
  },
  {
    number: "Section 5",
    title: "Safety Management Systems",
    description: "Development and implementation of comprehensive safety management systems",
    icon: Settings,
    href: "../level3-module1-section5",
  },
  {
    number: "Section 6",
    title: "Professional Responsibilities",
    description: "Ethical obligations, professional standards and duty of care in electrical work",
    icon: UserCheck,
    href: "../level3-module1-section6",
  },
];

const learningOutcomes = [
  "Understand key health and safety legislation including HASAWA 1974 and EAWR 1989",
  "Apply risk assessment techniques and develop comprehensive method statements",
  "Implement safe isolation procedures and electrical safety protocols",
  "Identify workplace hazards and apply appropriate control measures",
  "Understand safety management systems and their implementation",
  "Recognise professional responsibilities and duty of care requirements",
];

const Level3Module1 = () => {
  useSEO(
    "Module 1: Health and Safety - Level 3 Electrical Course",
    "Advanced health and safety practices for complex electrical work environments including legislation, risk assessment and safety management"
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
            <Link to="/study-centre/apprentice/level3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

        

        {/* Sections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Module Sections</h2>
          <div className="grid grid-cols-1 gap-4">
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
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module1;
