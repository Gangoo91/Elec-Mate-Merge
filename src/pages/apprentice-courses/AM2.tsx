import { BookOpen, Shield, Wrench, TestTube, Search, Monitor, Trophy, Award, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CourseCard } from "@/components/apprentice-courses/CourseCard";
import useSEO from "@/hooks/useSEO";
import { cn } from "@/lib/utils";

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
    <div className="bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 safe-top">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'min-h-[44px] min-w-[44px] p-2 -ml-2',
                'text-white/70 hover:text-white hover:bg-white/5',
                'touch-manipulation active:scale-[0.98] transition-all duration-ios-normal ease-ios-ease'
              )}
              asChild
            >
              <Link to="/study-centre/apprentice">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <span className="text-ios-footnote text-white/50">Study Centre</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-4 safe-bottom">
        <div className="max-w-7xl mx-auto">
          {/* Modules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </main>
    </div>
  );
};

export default AM2;
