import { ArrowLeft, Settings, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const IndustrialElectricalCourse = () => {
  const modules: Array<{
    id: number | string;
    title: string;
    duration: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    isExam?: boolean;
  }> = [
    {
      id: 1,
      title: "Overview of Industrial Electrical Distribution",
      duration: "50 mins",
      icon: Settings
    },
    {
      id: 2,
      title: "Motors, Starters, and Control Gear",
      duration: "65 mins",
      icon: Settings
    },
    {
      id: 3,
      title: "Industrial Panel Assembly and Layout",
      duration: "60 mins",
      icon: Settings
    },
    {
      id: 4,
      title: "PLC Basics and System Integration",
      duration: "70 mins",
      icon: Settings
    },
    {
      id: 5,
      title: "Industrial Fault Finding and Troubleshooting",
      duration: "65 mins",
      icon: Settings
    },
    {
      id: 6,
      title: "Cable Types, Containment, and Routing",
      duration: "55 mins",
      icon: Settings
    },
    {
      id: 7,
      title: "Power Factor Correction and Harmonics",
      duration: "60 mins",
      icon: Settings
    },
    {
      id: 8,
      title: "Industrial Safety, Isolation, and Lock-off",
      duration: "45 mins",
      icon: Settings
    },
    {
      id: "exam",
      title: "Mock Exam",
      duration: "120 mins",
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
            Industrial Electrical Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            High voltage systems, motor control, and industrial automation
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../industrial-electrical-mock-exam` : `../industrial-electrical-module-${module.id}`}
              moduleNumber={typeof module.id === 'number' ? module.id : 0}
              title={module.title}
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

export default IndustrialElectricalCourse;
