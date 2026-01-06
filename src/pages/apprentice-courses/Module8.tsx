import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Clock, Target, BarChart3, CheckCircle, AlertTriangle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";

const sections = [
  {
    number: "Section 1",
    title: "Mock Exams",
    description: "Complete practice examinations that simulate the real Level 2 electrical installation exam conditions and timing.",
    icon: FileText,
    href: "section1"
  },
  {
    number: "Section 2",
    title: "How to Pass Exams – Tips and Techniques",
    description: "Essential exam strategies, time management techniques, and proven methods to maximise your examination performance.",
    icon: Clock,
    href: "section2"
  },
];

const Module8 = () => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to=".." 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Level 2 Overview
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Module 8: Mock Examinations & Assessment
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

export default Module8;