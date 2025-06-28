
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import OnTheJobToolsBox from "@/components/apprentice/OnTheJobToolsBox";
import { Settings, HardHat, MessageSquare, HelpCircle, BookOpen, ClipboardList } from "lucide-react";

const OnJobTools = () => {
  const onJobTools = [
    {
      id: 2,
      title: "Site Assessment Tools",
      icon: Settings,
      description: "Checklists and guides for job site evaluations",
      link: "/apprentice/on-job-tools/assessment"
    },
    {
      id: 3,
      title: "Interactive Safety Case Studies",
      icon: HardHat,
      description: "Learn from real-life safety scenarios with interactive decision making",
      link: "/apprentice/on-job-tools/safety-cases"
    },
    {
      id: 4,
      title: "Workplace Language & Culture",
      icon: MessageSquare,
      description: "Navigate workplace communication, culture and relationships effectively",
      link: "/apprentice/on-job-tools/workplace-culture"
    },
    {
      id: 5,
      title: "Ask a Supervisor",
      icon: HelpCircle,
      description: "Knowledge bank with FAQs from real-world site questions and expert answers",
      link: "/apprentice/on-job-tools/supervisor-knowledge"
    },
    {
      id: 6,
      title: "Flashcards & Microlearning",
      icon: BookOpen,
      description: "Quick-fire revision flashcards for cable colors, regulations, EICR codes, and more",
      link: "/apprentice/on-job-tools/flashcards"
    },
    {
      id: 7,
      title: "Incident Logging Tool",
      icon: ClipboardList,
      description: "Log near misses, unsafe practices, and faulty equipment with secure storage",
      link: "/apprentice/on-job-tools/incident-logging"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">On the Job Tools</h1>
        <Link to="/apprentice" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apprentice Hub
          </Button>
        </Link>
      </div>

      <OnTheJobToolsBox tools={onJobTools} />
    </div>
  );
};

export default OnJobTools;
