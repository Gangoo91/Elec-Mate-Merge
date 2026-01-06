import { ArrowLeft, Briefcase, Users, Award, GraduationCap, TrendingUp } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 1 - The Electrical Industry and Career Pathways
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Understanding industry roles, career progression routes and professional pathways
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

export default Level3Module7Section1;