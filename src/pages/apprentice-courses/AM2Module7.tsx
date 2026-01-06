import { ArrowLeft, Clock, Heart, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const AM2Module7 = () => {
  useSEO(
    "Module 7: Exam Strategy and Success Tips - AM2 Preparation Course",
    "Essential strategies for AM2 success including time management, pressure handling and avoiding common mistakes"
  );

  const sections = [
    {
      id: 1,
      number: "Section 1",
      title: "Managing time in each section of the AM2",
      description: "Effective time allocation and management strategies",
      icon: Clock,
      path: "section1"
    },
    {
      id: 2,
      number: "Section 2",
      title: "Coping with nerves and pressure",
      description: "Techniques for managing exam stress and anxiety",
      icon: Heart,
      path: "section2"
    },
    {
      id: 3,
      number: "Section 3",
      title: "Safety-first approach – 'show the assessor you're safe'",
      description: "Demonstrating safety competence throughout the assessment",
      icon: Shield,
      path: "section3"
    },
    {
      id: 4,
      number: "Section 4",
      title: "Avoiding common mistakes",
      description: "Typical errors and how to prevent them",
      icon: AlertTriangle,
      path: "section4"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-card/50">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4">
          <Button variant="ghost" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
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
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Module 7: Exam Strategy and Success Tips
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

export default AM2Module7;