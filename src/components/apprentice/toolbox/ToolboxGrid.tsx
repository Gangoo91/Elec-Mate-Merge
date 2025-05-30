
import { ReactNode } from "react";
import ToolboxCard from "./ToolboxCard";
import { MessageSquare, Wrench, Shield, GraduationCap, Calculator } from "lucide-react";

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
      id: 1,
      title: "Chat",
      icon: <MessageSquare className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/chat",
      description: "Get help and answers to your electrical questions"
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
      title: "Safety Fundamentals",
      icon: <Shield className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/safety-fundamentals",
      description: "Critical safety information for electrical work"
    },
    {
      id: 6,
      title: "Qualification Pathway",
      icon: <GraduationCap className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/career-progression",
      description: "Explore your career progression options"
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
