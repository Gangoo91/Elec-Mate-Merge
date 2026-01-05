import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Clock, Target, BarChart3 } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "Mock Exams",
    description: "Complete practice examinations that simulate the real Level 3 electrical installation exam conditions and timing.",
    icon: FileText,
    href: "../level3-module8-section1"
  },
  {
    number: "Section 2", 
    title: "Practical Help and Guidance",
    description: "Step-by-step guidance for practical assessments, wiring techniques, and hands-on electrical installation skills.",
    icon: Target,
    href: "../level3-module8-section2"
  },
  {
    number: "Section 3",
    title: "How to Pass Exams – Tips and Techniques",
    description: "Essential exam strategies, time management techniques, and proven methods to maximise your examination performance.",
    icon: Clock,
    href: "../level3-module8-section3"
  },
  {
    number: "Section 4",
    title: "Reviewing Results and Targeted Revision",
    description: "Analyse your performance, identify knowledge gaps, and create focused revision plans for exam success.",
    icon: BarChart3,
    href: "../level3-module8-section4"
  }
];

const Level3Module8 = () => {
  useSEO(
    "Level 3 Module 8: Mock Examinations | Electrical Training",
    "Comprehensive mock examinations, practical guidance, and exam techniques for Level 3 electrical installation qualifications. Test your knowledge and prepare for success."
  );

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="../.." 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Level 3 Overview
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Module 8: Mock Examinations & Assessment
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <ModuleCard
              key={section.number}
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

export default Level3Module8;