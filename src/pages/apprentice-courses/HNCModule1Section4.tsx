import { ArrowLeft, Shield, GraduationCap, Users, Scale, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule1Section4 = () => {
  useSEO(
    "Professional Responsibilities - HNC Module 1 Section 4 | Building Services Engineering",
    "Master professional responsibilities: duty of care, competence frameworks, safety representatives, ethical responsibilities and CPD requirements."
  );

  const subsections = [
    {
      number: "4.1",
      title: "Duty of Care and Accountability",
      description: "Legal duties, negligence principles, corporate responsibility and personal accountability",
      icon: Shield,
      href: "../h-n-c-module1-section4-1"
    },
    {
      number: "4.2",
      title: "Competence and Training",
      description: "Competency frameworks, training needs analysis, verification methods and record keeping",
      icon: GraduationCap,
      href: "../h-n-c-module1-section4-2"
    },
    {
      number: "4.3",
      title: "Safety Representatives",
      description: "Roles and responsibilities, legal rights, consultation requirements and safety committees",
      icon: Users,
      href: "../h-n-c-module1-section4-3"
    },
    {
      number: "4.4",
      title: "Ethical Responsibilities",
      description: "Professional ethics, whistleblowing procedures, conflicts of interest and integrity",
      icon: Scale,
      href: "../h-n-c-module1-section4-4"
    },
    {
      number: "4.5",
      title: "Continuous Professional Development",
      description: "Health and safety CPD, professional qualifications, keeping knowledge current",
      icon: BookOpen,
      href: "../h-n-c-module1-section4-5"
    }
  ];

  return (
    <div className="bg-background">
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
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 4: Professional Responsibilities
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understand the professional and ethical responsibilities of building services engineers regarding health and safety
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the professional obligations that building services engineers must uphold - from legal duties of care and maintaining competence, through to understanding the role of safety representatives, acting ethically, and committing to continuous professional development in health and safety matters.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsections.map((subsection) => (
            <ModuleCard
              key={subsection.number}
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

export default HNCModule1Section4;
