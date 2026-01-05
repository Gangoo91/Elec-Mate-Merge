import { ArrowLeft, HelpCircle, Clock, MessageSquare, Search, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule7Section1 = () => {
  useSEO(
    "Section 7.1: Knowledge Test Practice - MOET Module 7",
    "Multiple-choice questions, mock tests, feedback and exam techniques"
  );

  const subsections = [
    {
      number: "7.1.1",
      title: "Multiple-Choice Question Banks",
      description: "Practice question banks covering all module topics and learning outcomes",
      icon: HelpCircle,
      href: "../m-o-e-t-module7-section1-1"
    },
    {
      number: "7.1.2",
      title: "Timed Mock Tests",
      description: "Full-length practice tests under exam conditions with time constraints",
      icon: Clock,
      href: "../m-o-e-t-module7-section1-2"
    },
    {
      number: "7.1.3",
      title: "Feedback and Explanations",
      description: "Detailed explanations for answers and performance feedback",
      icon: MessageSquare,
      href: "../m-o-e-t-module7-section1-3"
    },
    {
      number: "7.1.4",
      title: "Identifying Knowledge Gaps",
      description: "Self-assessment techniques and identifying areas for improvement",
      icon: Search,
      href: "../m-o-e-t-module7-section1-4"
    },
    {
      number: "7.1.5",
      title: "Exam Techniques and Strategies",
      description: "Test-taking strategies, time management and approach techniques",
      icon: Target,
      href: "../m-o-e-t-module7-section1-5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 7.1: Knowledge Test Practice
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Multiple-choice questions, mock tests, feedback and exam techniques.
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subsections.map((subsection, index) => (
            <ModuleCard
              key={index}
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

export default MOETModule7Section1;