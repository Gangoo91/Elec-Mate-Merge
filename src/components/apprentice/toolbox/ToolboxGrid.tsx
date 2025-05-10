
import { ReactNode } from "react";
import ToolboxCard from "./ToolboxCard";
import { MessageSquare, Wrench, Shield, GraduationCap, LightbulbIcon, BookOpen, Calculator } from "lucide-react";

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
      icon: <MessageSquare className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/chat"
    },
    {
      id: 3,
      title: "Basic Tools Guide",
      icon: <Wrench className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/tools-guide"
    },
    {
      id: 4,
      title: "Safety Fundamentals",
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/safety-fundamentals"
    },
    {
      id: 6,
      title: "Qualification Pathway",
      icon: <GraduationCap className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/career-progression"
    },
    {
      id: 7,
      title: "Study Planner",
      icon: <LightbulbIcon className="h-6 w-6 text-elec-yellow" />,
      description: "Create personalized study plans for your apprenticeship",
      onSelect: () => onToolSelection("studyPlanner")
    },
    {
      id: 8,
      title: "Concept Explainer",
      icon: <BookOpen className="h-6 w-6 text-elec-yellow" />,
      description: "Get explanations for complex electrical concepts",
      onSelect: () => onToolSelection("conceptExplainer")
    },
    {
      id: 9,
      title: "Power Factor Calculator",
      icon: <Calculator className="h-6 w-6 text-elec-yellow" />,
      description: "Calculate power factor and understand its implications",
      onSelect: () => onToolSelection("powerCalculator")
    },
    {
      id: 10,
      title: "Cable Sizing",
      icon: <Calculator className="h-6 w-6 text-elec-yellow" />,
      description: "Calculate appropriate cable sizes based on current and voltage drop",
      onSelect: () => onToolSelection("cableSizing")
    },
    {
      id: 11,
      title: "BS7671 Search",
      icon: <BookOpen className="h-6 w-6 text-elec-yellow" />,
      description: "Look up regulations and standards information",
      onSelect: () => onToolSelection("regulations")
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
