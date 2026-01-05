import { ArrowLeft, Briefcase, Shield, Users, GraduationCap, TrendingUp } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "The Electrical Industry and Career Pathways",
    description: "Understanding industry roles, career progression routes and professional pathways",
    icon: Briefcase,
    href: "../level3-module7-section1",
  },
  {
    number: "Section 2", 
    title: "Professional Standards and Responsibilities",
    description: "Professional ethics, standards and responsibilities in electrical work",
    icon: Shield,
    href: "../level3-module7-section2",
  },
  {
    number: "Section 3",
    title: "Communication and Teamworking",
    description: "Effective communication skills and collaborative working practices",
    icon: Users,
    href: "../level3-module7-section3",
  },
  {
    number: "Section 4",
    title: "Continuing Professional Development (CPD)",
    description: "Lifelong learning, skills development and staying current with industry changes",
    icon: GraduationCap,
    href: "../level3-module7-section4",
  },
  {
    number: "Section 5",
    title: "Employment and Business Awareness",
    description: "Employment skills, self-employment options and business development",
    icon: TrendingUp,
    href: "../level3-module7-section5",
  },
];

const Level3Module7 = () => {
  useSEO(
    "Level 3 Module 7 - Career Awareness & Professional Development",
    "Develop career awareness, professional skills and business knowledge for the electrical industry"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 7 - Career Awareness & Professional Development
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Develop essential career skills, professional awareness and business knowledge for success in the electrical industry
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};

export default Level3Module7;