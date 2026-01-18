import React from 'react';
import { ArrowLeft, BookOpen, Zap, Calculator, Shield, BarChart, Wrench, Award, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const EVChargingCourse = () => {
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
      title: "Introduction to EV Charging Infrastructure",
      description: "EV charging fundamentals and infrastructure basics",
      duration: "40 mins",
      icon: BookOpen
    },
    {
      id: 2,
      title: "EVSE Types, Modes, and Standards",
      description: "Charging equipment types and international standards",
      duration: "50 mins",
      icon: Zap
    },
    {
      id: 3,
      title: "Electrical Design and Load Calculation",
      description: "Designing electrical installations for EV charging",
      duration: "55 mins",
      icon: Calculator
    },
    {
      id: 4,
      title: "Earthing and Protection Considerations",
      description: "Earthing and protection requirements for EV charging",
      duration: "45 mins",
      icon: Shield
    },
    {
      id: 5,
      title: "Load Management and Diversity in EV Systems",
      description: "Load management and system integration strategies",
      duration: "50 mins",
      icon: BarChart
    },
    {
      id: 6,
      title: "Installation, Inspection, and Testing Procedures",
      description: "Professional installation and testing practices",
      duration: "60 mins",
      icon: Wrench
    },
    {
      id: 7,
      title: "Government Incentives and Certification (OZEV, etc.)",
      description: "Grants, certification, and compliance requirements",
      duration: "35 mins",
      icon: Award
    },
    {
      id: 8,
      title: "Mock Examination",
      description: "Test your knowledge",
      duration: "90 mins",
      icon: FileCheck,
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
            EV Charging Installation
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            EV charging infrastructure installation, maintenance, and safety protocols
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../ev-charging-mock-exam` : `../ev-charging-module-${module.id}`}
              moduleNumber={typeof module.id === 'number' ? module.id : 8}
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

export default EVChargingCourse;
