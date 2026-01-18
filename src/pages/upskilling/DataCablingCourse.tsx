import React from 'react';
import { ArrowLeft, Cable, BookOpen, Wifi, Package, Wrench, FileCheck, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const DataCablingCourse = () => {
  const modules: Array<{
    id: number;
    title: string;
    description: string;
    duration: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    isExam?: boolean;
  }> = [
    {
      id: 1,
      title: "Introduction to Structured Cabling Systems",
      description: "Network infrastructure fundamentals",
      duration: "45 mins",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Copper Cabling Standards (Cat5e, Cat6, etc.)",
      description: "Copper cable types and performance",
      duration: "50 mins",
      icon: Cable
    },
    {
      id: 3,
      title: "Fibre Optics: Types, Termination, and Testing",
      description: "Fibre optic systems and installation",
      duration: "60 mins",
      icon: Wifi
    },
    {
      id: 4,
      title: "Containment, Labelling, and Installation Best Practices",
      description: "Cable management and standards",
      duration: "55 mins",
      icon: Package
    },
    {
      id: 5,
      title: "Termination and Certification Procedures",
      description: "Testing and certification processes",
      duration: "50 mins",
      icon: Wrench
    },
    {
      id: 6,
      title: "TIA/EIA and ISO Cabling Standards Explained",
      description: "Industry standards and compliance",
      duration: "40 mins",
      icon: FileCheck
    },
    {
      id: 7,
      title: "Mock Exam",
      description: "Test your knowledge",
      duration: "75 mins",
      icon: GraduationCap,
      isExam: true
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
            Data & Communications Cabling
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Structured cabling systems, fiber optics, and network infrastructure
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../data-cabling-mock-exam` : `../data-cabling-module-${module.id}`}
              moduleNumber={module.id}
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

export default DataCablingCourse;
