
import { ReactNode } from "react";
import ToolboxCard from "./ToolboxCard";
import { 
  Users, 
  Clock, 
  FolderOpen, 
  DollarSign, 
  MessageCircle, 
  BookOpen, 
  MessageSquare, 
  AlertCircle,
  Calculator,
  Wrench,
  FileCheck,
  Shield
} from "lucide-react";

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
      title: "What to Expect in Your Apprenticeship",
      icon: <Users className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/apprenticeship-expectations",
      description: "Day 1 preparation, site etiquette, chain of command, and year-by-year expectations"
    },
    {
      id: 2,
      title: "Off-the-Job Training Explained",
      icon: <Clock className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/off-job-training-guide",
      description: "What counts as off-the-job learning, how to log it, and sample templates"
    },
    {
      id: 3,
      title: "Building Your Work Portfolio",
      icon: <FolderOpen className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/portfolio-building",
      description: "How to document work properly, what assessors look for, and common pitfalls to avoid"
    },
    {
      id: 4,
      title: "Apprenticeship Rights & Pay",
      icon: <DollarSign className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/rights-and-pay",
      description: "National wage tiers, your rights on site, and support channels when things go wrong"
    },
    {
      id: 5,
      title: "Communication Skills",
      icon: <MessageCircle className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/communication-skills",
      description: "How to speak with supervisors, report problems, and take feedback professionally"
    },
    {
      id: 6,
      title: "Study Tips for Electrical Apprentices",
      icon: <BookOpen className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/study-tips",
      description: "Revision strategies for 18th Edition and Level 3 exams, plus free resources"
    },
    {
      id: 7,
      title: "Site Slang & Jargon Decoder",
      icon: <MessageSquare className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/site-jargon",
      description: "Translate real-world terms and regional slang to help you fit in on site"
    },
    {
      id: 8,
      title: "Mistakes You're Allowed to Make",
      icon: <AlertCircle className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/learning-from-mistakes",
      description: "Safe screw-ups vs dangerous errors - build confidence and reduce imposter syndrome"
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
      title: "Cable Sizing Calculator",
      icon: <Calculator className="h-5 w-5 text-elec-yellow" />,
      description: "Calculate appropriate cable sizes based on current and voltage drop",
      onSelect: () => onToolSelection("cableSizing")
    },
    {
      id: 11,
      title: "Basic Tools Guide",
      icon: <Wrench className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/tools-guide",
      description: "Essential tools you should own (not borrow) and building your toolkit"
    },
    {
      id: 12,
      title: "Exam Preparation",
      icon: <FileCheck className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/exam-prep",
      description: "Practice tests and revision materials for your assessments"
    },
    {
      id: 13,
      title: "Safety Fundamentals",
      icon: <Shield className="h-5 w-5 text-elec-yellow" />,
      link: "/apprentice/safety-fundamentals",
      description: "Critical safety information for electrical work - your top priority"
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
