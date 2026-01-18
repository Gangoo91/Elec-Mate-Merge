import React from 'react';
import { ArrowLeft, TrendingUp, Sun, Wind, Battery, Zap, GitBranch, Wrench, FileText, PoundSterling, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const RenewableEnergyCourse = () => {
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
      title: "Overview of Renewable Energy Technologies",
      description: "Introduction to renewable energy systems",
      duration: "45 mins",
      icon: TrendingUp
    },
    {
      id: 2,
      title: "Solar PV System Design and Operation",
      description: "Photovoltaic system design and operation",
      duration: "60 mins",
      icon: Sun
    },
    {
      id: 3,
      title: "Wind Turbines and Microgeneration Systems",
      description: "Wind energy and small-scale generation",
      duration: "55 mins",
      icon: Wind
    },
    {
      id: 4,
      title: "Battery Storage and Energy Management",
      description: "Storage systems and energy management",
      duration: "50 mins",
      icon: Battery
    },
    {
      id: 5,
      title: "Inverter Technology and Grid Integration",
      description: "Power conversion and grid connection",
      duration: "65 mins",
      icon: Zap
    },
    {
      id: 6,
      title: "Off-Grid vs Grid-Tied System Configuration",
      description: "System configurations and design",
      duration: "55 mins",
      icon: GitBranch
    },
    {
      id: 7,
      title: "Installation, Maintenance, and Troubleshooting",
      description: "Practical installation and maintenance",
      duration: "70 mins",
      icon: Wrench
    },
    {
      id: 8,
      title: "Regulations, Planning, and Compliance",
      description: "Regulatory requirements and compliance",
      duration: "45 mins",
      icon: FileText
    },
    {
      id: 9,
      title: "Incentives, Payback, and Financial Modelling",
      description: "Financial analysis and incentives",
      duration: "40 mins",
      icon: PoundSterling
    },
    {
      id: 10,
      title: "Mock Exam",
      description: "Test your knowledge",
      duration: "120 mins",
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
            Renewable Energy Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Solar, wind, and battery storage installation and maintenance procedures
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../renewable-energy-mock-exam` : `../renewable-energy-module-${module.id}`}
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

export default RenewableEnergyCourse;
