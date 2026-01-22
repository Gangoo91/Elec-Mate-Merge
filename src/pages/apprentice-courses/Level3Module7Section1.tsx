import { ArrowLeft, Briefcase, Users, Award, GraduationCap, TrendingUp, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "1.1",
    title: "Roles Within the Electrical Industry",
    description: "Understanding different roles: installer, tester, designer, inspector and their responsibilities",
    icon: Briefcase,
    href: "../level3-module7-section1-1",
  },
  {
    number: "1.2",
    title: "Self-employment vs Employment Routes",
    description: "Comparing employed and self-employed career paths in the electrical industry",
    icon: Users,
    href: "../level3-module7-section1-2",
  },
  {
    number: "1.3",
    title: "Trade Bodies and Registration (NICEIC, NAPIT, ECA, JIB)",
    description: "Understanding professional trade bodies and registration requirements",
    icon: Award,
    href: "../level3-module7-section1-3",
  },
  {
    number: "1.4",
    title: "Apprenticeships, NVQs, and AM2 Assessment",
    description: "Overview of training routes including apprenticeships, NVQs and assessment methods",
    icon: GraduationCap,
    href: "../level3-module7-section1-4",
  },
  {
    number: "1.5",
    title: "Progression into Higher Qualifications (HNC, degree routes)",
    description: "Pathways to advanced qualifications and career progression opportunities",
    icon: TrendingUp,
    href: "../level3-module7-section1-5",
  },
];

const Level3Module7Section1 = () => {
  useSEO(
    "Section 1: The Electrical Industry and Career Pathways - Level 3 Module 7",
    "Understanding industry roles, career progression routes and professional pathways"
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
            <Link to="/study-centre/apprentice/level3-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
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

export default Level3Module7Section1;
