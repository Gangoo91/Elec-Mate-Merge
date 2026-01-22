import { ArrowLeft, Heart, UserCheck, AlertTriangle, Scale, Users, GraduationCap, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "6.1",
    title: "Duty of care (legal and moral)",
    description: "Understanding legal and moral obligations to protect others in the workplace",
    icon: Heart,
    href: "../level3-module1-section6-1",
  },
  {
    number: "6.2",
    title: "Accountability for safe working practices",
    description: "Personal and professional accountability for maintaining safe working practices",
    icon: UserCheck,
    href: "../level3-module1-section6-2",
  },
  {
    number: "6.3",
    title: "Disciplinary actions for non-compliance",
    description: "Consequences and disciplinary procedures for safety non-compliance",
    icon: AlertTriangle,
    href: "../level3-module1-section6-3",
  },
  {
    number: "6.4",
    title: "Ethical responsibilities in protecting others",
    description: "Ethical obligations and moral responsibilities in workplace safety",
    icon: Scale,
    href: "../level3-module1-section6-4",
  },
  {
    number: "6.5",
    title: "Role of safety representatives and trade unions",
    description: "Functions and responsibilities of safety representatives and union involvement",
    icon: Users,
    href: "../level3-module1-section6-5",
  },
  {
    number: "6.6",
    title: "CPD (Continuing Professional Development) in health and safety",
    description: "Ongoing professional development requirements in health and safety practices",
    icon: GraduationCap,
    href: "../level3-module1-section6-6",
  },
];

const Level3Module1Section6 = () => {
  useSEO(
    "Section 6: Professional Responsibilities - Level 3 Module 1",
    "Ethical obligations, professional standards and duty of care in electrical work"
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

export default Level3Module1Section6;
