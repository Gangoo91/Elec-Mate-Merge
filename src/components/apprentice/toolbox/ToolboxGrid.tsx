
import { ReactNode } from "react";
import ToolboxCard from "./ToolboxCard";
import { Wrench, Shield, GraduationCap, Calculator, BookOpen, FileCheck, AlertTriangle, Lightbulb } from "lucide-react";

interface ToolboxCategory {
  id: number;
  title: string;
  icon: ReactNode;
  link?: string;
  description?: string;
  onSelect?: () => void;
}

interface ToolboxGridProps {
  onToolSelection: (tool: string | null) => void;
}

const ToolboxGrid = ({ onToolSelection }: ToolboxGridProps) => {
  const toolboxCategories: ToolboxCategory[] = [
    {
      id: 2,
      title: "Safety Fundamentals",
      icon: <Shield className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/safety-fundamentals",
      description: "Critical safety information for electrical work"
    },
    {
      id: 3,
      title: "Basic Tools Guide",
      icon: <Wrench className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/tools-guide",
      description: "Learn about the essential tools for electrical work"
    },
    {
      id: 4,
      title: "Study Resources",
      icon: <BookOpen className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/study",
      description: "Access study materials, mock exams, and course content"
    },
    {
      id: 5,
      title: "Qualification Pathway",
      icon: <GraduationCap className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/career-progression",
      description: "Explore your career progression options"
    },
    {
      id: 7,
      title: "Troubleshooting Guide",
      icon: <AlertTriangle className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/troubleshooting",
      description: "Common electrical problems and their solutions"
    },
    {
      id: 9,
      title: "Power Factor Calculator",
      icon: <Calculator className="h-5 w-5 text-elec-yellow" />,
      description: "Calculate power factor and understand its implications",
      onSelect: () => onToolSelection("powerCalculator")
    },
    {
      id: 10,
      title: "Cable Sizing",
      icon: <Calculator className="h-5 w-5 text-elec-yellow" />,
      description: "Calculate appropriate cable sizes based on current and voltage drop",
      onSelect: () => onToolSelection("cableSizing")
    },
    {
      id: 12,
      title: "Exam Preparation",
      icon: <FileCheck className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/exam-prep",
      description: "Practice tests and revision materials for your assessments"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {toolboxCategories.map((category) => (
        <ToolboxCard
          key={category.id}
          title={category.title}
          icon={category.icon}
          link={category.link}
          description={category.description}
          onSelect={
            category.onSelect 
              ? () => category.onSelect?.() 
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default ToolboxGrid;
