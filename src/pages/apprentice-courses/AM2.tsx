import { ArrowLeft, BookOpen, Shield, Wrench, TestTube, Search, Monitor, Trophy, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CourseCard } from "@/components/apprentice-courses/CourseCard";
import useSEO from "@/hooks/useSEO";

const AM2 = () => {
  useSEO(
    "AM2 Preparation & Guidance Course - Electrical Training",
    "Comprehensive AM2 assessment preparation covering installation, testing, fault diagnosis and exam strategy for electrical qualifications"
  );

  const modules = [
    {
      id: 1,
      number: "Module 1",
      title: "Introduction to the AM2",
      description: "Purpose, structure, marking criteria and common failure reasons",
      icon: BookOpen,
      path: "module1"
    },
    {
      id: 2,
      number: "Module 2",
      title: "Health, Safety and Documentation",
      description: "Safe isolation, RAMS, drawings, paperwork and critical safety procedures",
      icon: Shield,
      path: "module2"
    },
    {
      id: 3,
      number: "Module 3",
      title: "Installation Tasks",
      description: "Cable selection, power circuits, lighting, special installations and time management",
      icon: Wrench,
      path: "module3"
    },
    {
      id: 4,
      number: "Module 4",
      title: "Inspection and Testing",
      description: "Test sequences, instruments, certification, functional testing and compliance",
      icon: TestTube,
      path: "module4"
    },
    {
      id: 5,
      number: "Module 5",
      title: "Fault Diagnosis and Rectification",
      description: "Typical faults, logical processes, test equipment and re-testing procedures",
      icon: Search,
      path: "module5"
    },
    {
      id: 6,
      number: "Module 6",
      title: "Online Knowledge Test",
      description: "Format, core topics, practice questions and time management strategies",
      icon: Monitor,
      path: "module6"
    },
    {
      id: 7,
      number: "Module 7",
      title: "Exam Strategy and Success Tips",
      description: "Time management, pressure handling, safety approach and common mistakes",
      icon: Trophy,
      path: "module7"
    },
    {
      id: 8,
      number: "Module 8",
      title: "Full Mock AM2 Assessment",
      description: "Simulated tasks, practice runs, exam conditions and improvement planning",
      icon: Award,
      path: "module8"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
            AM2 Preparation & Guidance Course
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive preparation for the AM2 assessment covering installation tasks, inspection & testing, fault diagnosis, and exam strategy to maximise your chances of success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module) => (
            <CourseCard
              key={module.id}
              title={module.title}
              description={module.description}
              icon={module.icon}
              href={module.path}
              number={module.number}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AM2;