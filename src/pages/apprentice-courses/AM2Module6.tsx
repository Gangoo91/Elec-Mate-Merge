import { ArrowLeft, Monitor, BookOpen, FileQuestion, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const AM2Module6 = () => {
  useSEO(
    "Module 6: Online Knowledge Test - AM2 Preparation Course",
    "Comprehensive preparation for the AM2 online knowledge test including practice questions and strategies"
  );

  const sections = [
    {
      id: 1,
      number: "Section 1",
      title: "Format and structure of the online test",
      description: "Understanding the online test layout and requirements",
      icon: Monitor,
      path: "section1"
    },
    {
      id: 2,
      number: "Section 2",
      title: "Core topics covered (regs, science, safety)",
      description: "Key subject areas in the knowledge test",
      icon: BookOpen,
      path: "section2"
    },
    {
      id: 3,
      number: "Section 3",
      title: "Time management strategies",
      description: "Effective techniques for managing test time",
      icon: Clock,
      path: "section3"
    },
    {
      id: 4,
      number: "Section 4",
      title: "Exam Techniques and Mindset",
      description: "Mental preparation and effective exam strategies",
      icon: FileQuestion,
      path: "section4"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AM2 Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Module 6: Online Knowledge Test
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <ModuleCard
              key={section.id}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AM2Module6;