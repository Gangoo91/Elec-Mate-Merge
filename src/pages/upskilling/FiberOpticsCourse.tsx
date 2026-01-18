import React from 'react';
import { ArrowLeft, Cable, BookOpen, Layers, Package, Wrench, FileCheck, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const FiberOpticsCourse = () => {
  const modules: Array<{
    id: number | string;
    title: string;
    description: string;
    duration: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    isExam?: boolean;
  }> = [
    {
      id: 1,
      title: "Introduction to Fibre Optics",
      description: "Fundamentals of fiber optic technology",
      duration: "45 mins",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Fibre Types and Connectors",
      description: "Understanding fiber types and connections",
      duration: "50 mins",
      icon: Layers
    },
    {
      id: 3,
      title: "Fibre Optic Cables and Installation",
      description: "Cable types and installation methods",
      duration: "55 mins",
      icon: Cable
    },
    {
      id: 4,
      title: "Termination and Splicing Techniques",
      description: "Professional splicing and termination",
      duration: "60 mins",
      icon: Wrench
    },
    {
      id: 5,
      title: "Fibre Testing and Certification",
      description: "Testing methods and certification",
      duration: "50 mins",
      icon: FileCheck
    },
    {
      id: 6,
      title: "Standards and Network Design Principles",
      description: "Design standards and architecture",
      duration: "45 mins",
      icon: MapPin
    },
    {
      id: 7,
      title: "Fault Finding, Maintenance, and Upgrades",
      description: "Troubleshooting and maintenance",
      duration: "55 mins",
      icon: Package
    },
    {
      id: 8,
      title: "Mock Exam",
      description: "Test your knowledge",
      duration: "90 mins",
      icon: GraduationCap,
      isExam: true
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Fiber Optics Technology
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Optical fiber installation, fusion splicing, and OTDR testing procedures
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../fiber-optics-mock-exam` : `../fiber-optics-module-${module.id}`}
              moduleNumber={typeof module.id === 'number' ? module.id : index + 1}
              title={module.title}
              description={module.description}
              duration={module.duration}
              icon={module.icon}
              isExam={module.isExam}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiberOpticsCourse;
