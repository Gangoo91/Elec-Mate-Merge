
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import OnTheJobToolsBox from "@/components/apprentice/OnTheJobToolsBox";
import { Calculator, FileText, Settings, HardHat, MessageSquare, TestTube, HelpCircle, BookOpen, ClipboardList, CheckSquare } from "lucide-react";

const OnJobTools = () => {
  const onJobTools = [
    {
      id: 1,
      title: "Electrical Calculations",
      icon: Calculator,
      description: "Cable sizing, load calculations, voltage drop, and more",
      link: "/apprentice/on-job-tools/calculations"
    },
    {
      id: 2,
      title: "Documentation Templates",
      icon: FileText,
      description: "Forms, certificates, and reports for on-site documentation",
      link: "/apprentice/on-job-tools/documents"
    },
    {
      id: 3,
      title: "Site Assessment Tools",
      icon: Settings,
      description: "Checklists and guides for job site evaluations",
      link: "/apprentice/on-job-tools/assessment"
    },
    {
      id: 4,
      title: "Interactive Safety Case Studies",
      icon: HardHat,
      description: "Learn from real-life safety scenarios with interactive decision making",
      link: "/apprentice/on-job-tools/safety-cases"
    },
    {
      id: 5,
      title: "Workplace Language & Culture",
      icon: MessageSquare,
      description: "Navigate workplace communication, culture and relationships effectively",
      link: "/apprentice/on-job-tools/workplace-culture"
    },
    {
      id: 6,
      title: "Testing Procedures (Mini Toolkit)",
      icon: TestTube,
      description: "R1+R2, IR, Zs, polarity testing with step-by-step guides and diagrams",
      link: "/apprentice/on-job-tools/testing-procedures"
    },
    {
      id: 7,
      title: "BS7671 Inspection & Testing Run-Through",
      icon: CheckSquare,
      description: "Complete step-by-step inspection and testing process for apprentices",
      link: "/apprentice/on-job-tools/bs7671-runthrough"
    },
    {
      id: 8,
      title: "Ask a Supervisor",
      icon: HelpCircle,
      description: "Knowledge bank with FAQs from real-world site questions and expert answers",
      link: "/apprentice/on-job-tools/supervisor-knowledge"
    },
    {
      id: 9,
      title: "Flashcards & Microlearning",
      icon: BookOpen,
      description: "Quick-fire revision flashcards for cable colors, regulations, EICR codes, and more",
      link: "/apprentice/on-job-tools/flashcards"
    },
    {
      id: 10,
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
